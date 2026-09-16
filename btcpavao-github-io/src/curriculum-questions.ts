import { SITE_URL } from "./site-config"

export type QuestionContext = {
  section: string
  lesson?: string
  slug?: string
  searchQuery?: string
}
export type QuestionFields = { question: string; name: string; email: string }
export type QuestionErrors = Partial<Record<keyof QuestionFields, string>>

export function validateQuestion(fields: QuestionFields): QuestionErrors {
  const errors: QuestionErrors = {}
  if (fields.question.trim().length < 5)
    errors.question = "Please enter a question of at least 5 characters."
  else if (fields.question.trim().length > 5000)
    errors.question = "Please keep your question within 5,000 characters."
  if (fields.name.trim().length > 150)
    errors.name = "Please keep your name within 150 characters."
  if (
    fields.email.trim() &&
    (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email.trim()) ||
      fields.email.trim().length > 254)
  )
    errors.email = "Please enter a valid email, or leave it blank."
  return errors
}

export function questionPayload(
  fields: QuestionFields,
  context: QuestionContext,
  honeypot = "",
  turnstileToken = ""
) {
  // Construct context from lesson data. Never copy query strings, browser state,
  // local progress, terminal output or arbitrary current-URL parameters.
  return {
    question: fields.question.trim(),
    ...(fields.name.trim() ? { name: fields.name.trim() } : {}),
    ...(fields.email.trim() ? { email: fields.email.trim() } : {}),
    sectionTitle: context.section,
    ...(context.lesson ? { lessonTitle: context.lesson } : {}),
    pageUrl: `${SITE_URL}/en/bitcoin-core/self-custody/${context.slug ? `#lesson/${encodeURIComponent(context.slug)}` : ""}`,
    locale: "en",
    ...(context.searchQuery
      ? { searchQuery: context.searchQuery.slice(0, 200) }
      : {}),
    companyWebsite: honeypot,
    turnstileToken,
  }
}

export async function sendCurriculumQuestion(
  endpoint: string,
  payload: ReturnType<typeof questionPayload>,
  fetcher: typeof fetch = fetch
) {
  const response = await fetcher(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "omit",
    referrerPolicy: "no-referrer",
    body: JSON.stringify(payload),
    signal: AbortSignal.timeout(20000),
  })
  const result = await response.json()
  if (!response.ok)
    throw new Error(
      typeof result?.code === "string" ? result.code : "unavailable"
    )
  if (result?.ok !== true) throw new Error("Receipt not confirmed")
}

export function questionErrorMessage(error: unknown) {
  const code = error instanceof Error ? error.message : ""
  if (code === "rate_limited")
    return "Please wait a minute before sending another question. Your text is still here."
  if (code === "turnstile_failed" || code === "verification_unavailable")
    return "Please complete the security check again, then retry. Your text is still here."
  if (code === "invalid_payload")
    return "Please check your question and optional email. Your text is still here."
  return "I couldn’t send your question right now. Please try again in a moment. Your text is still here."
}
