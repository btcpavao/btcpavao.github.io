export type Submission = {
  question: string
  name: string
  email: string
  lessonTitle: string
  sectionTitle: string
  pageUrl: string
  locale: string
  searchQuery: string
  turnstileToken: string
  companyWebsite: string
}
const bounds: Record<keyof Submission, number> = {
  question: 5000,
  name: 150,
  email: 254,
  lessonTitle: 200,
  sectionTitle: 120,
  pageUrl: 500,
  locale: 2,
  searchQuery: 200,
  turnstileToken: 2048,
  companyWebsite: 200,
}
export function validateSubmission(input: unknown): Submission | null {
  if (!input || typeof input !== "object" || Array.isArray(input)) return null
  const record = input as Record<string, unknown>
  if (Object.keys(record).some((key) => !Object.hasOwn(bounds, key)))
    return null
  const values: Record<string, string> = {}
  for (const [key, max] of Object.entries(bounds)) {
    const value = record[key] === undefined ? "" : record[key]
    if (typeof value !== "string" || value.length > max) return null
    // Only the question may contain newlines. Never allow header controls.
    if (
      [...value].some((character) => {
        const code = character.charCodeAt(0)
        return (
          (code < 32 || code === 127) &&
          !(key === "question" && [9, 10, 13].includes(code))
        )
      })
    )
      return null
    values[key] = value.trim()
  }
  const data = values as Submission
  if (data.question.length < 5 || !data.turnstileToken) return null
  if (
    data.email &&
    !/^[A-Za-z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Za-z0-9](?:[A-Za-z0-9.-]*[A-Za-z0-9])?\.[A-Za-z]{2,63}$/.test(
      data.email
    )
  )
    return null
  if (data.locale && !["en", "hr"].includes(data.locale)) return null
  if (data.pageUrl) {
    try {
      const url = new URL(data.pageUrl)
      if (
        url.origin !== "https://btcpavao.com" ||
        url.username ||
        url.password ||
        url.search ||
        url.pathname !== "/en/bitcoin-core/self-custody/" ||
        (url.hash && !/^#lesson\/[a-z0-9-]+$/.test(url.hash))
      )
        return null
      data.pageUrl = url.href
    } catch {
      return null
    }
  }
  return data
}
