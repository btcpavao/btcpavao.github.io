import { validateSubmission, type Submission } from "./validation"

// Server-only constants; the restricted binding independently enforces them.
const DESTINATION = "pavao@hey.com"
const SENDER = "curriculum@btcpavao.com"
const SITEVERIFY = "https://challenges.cloudflare.com/turnstile/v0/siteverify"
const MAX_BODY_BYTES = 32768

export function questionEmail(data: Submission): EmailMessageBuilder {
  return {
    to: DESTINATION,
    from: SENDER,
    subject: `[Curriculum Question] ${data.lessonTitle || "New question"}`,
    ...(data.email ? { replyTo: data.email } : {}),
    text: [
      "New Bitcoin Core curriculum question",
      "",
      "QUESTION",
      data.question,
      "",
      "CONTEXT",
      `Section: ${data.sectionTitle || "Not provided"}`,
      `Lesson: ${data.lessonTitle || "Not provided"}`,
      `Page: ${data.pageUrl || "Not provided"}`,
      ...(data.searchQuery ? [`Search query: ${data.searchQuery}`] : []),
      `Locale: ${data.locale || "Not provided"}`,
      "",
      "CONTACT",
      `Name: ${data.name || "Not provided"}`,
      `Email: ${data.email || "Not provided"}`,
      "",
      "---",
      "Submitted through the btcpavao.com curriculum.",
    ].join("\n"),
  }
}
function reply(status: number, code?: string) {
  return Response.json(code ? { ok: false, code } : { ok: true }, {
    status,
    headers: {
      "Cache-Control": "no-store",
      "X-Content-Type-Options": "nosniff",
      ...(status === 429 ? { "Retry-After": "60" } : {}),
      ...(status === 405 ? { Allow: "POST" } : {}),
    },
  })
}
async function readBody(request: Request): Promise<unknown> {
  if (Number(request.headers.get("content-length")) > MAX_BODY_BYTES)
    throw new RangeError()
  if (!request.body) throw new SyntaxError()
  const reader = request.body.getReader()
  let bytes = 0,
    text = ""
  const decoder = new TextDecoder()
  try {
    while (true) {
      const { value, done } = await reader.read()
      if (done) break
      bytes += value.byteLength
      if (bytes > MAX_BODY_BYTES) {
        await reader.cancel()
        throw new RangeError()
      }
      text += decoder.decode(value, { stream: true })
    }
    return JSON.parse(text + decoder.decode())
  } finally {
    reader.releaseLock()
  }
}

type Dependencies = {
  siteverify?: typeof fetch
  deliver?: (env: AskPavaoEnv, message: EmailMessageBuilder) => Promise<void>
  local?: boolean
}
export function createAskPavaoHandler(dependencies: Dependencies = {}) {
  return async function handle(
    request: Request,
    env: AskPavaoEnv
  ): Promise<Response> {
    if (new URL(request.url).pathname !== "/api/ask-pavao")
      return reply(404, "not_found")
    if (request.method !== "POST") return reply(405, "method_not_allowed")
    if (request.headers.get("Origin") !== env.APP_ORIGIN)
      return reply(403, "origin_rejected")
    if (
      request.headers
        .get("Content-Type")
        ?.split(";")[0]
        .trim()
        .toLowerCase() !== "application/json"
    )
      return reply(415, "invalid_payload")
    let input: unknown
    try {
      input = await readBody(request)
    } catch (e) {
      return reply(e instanceof RangeError ? 413 : 400, "invalid_payload")
    }
    const data = validateSubmission(input)
    if (!data) return reply(400, "invalid_payload")
    if (data.companyWebsite) return reply(200)
    if (
      !env.TURNSTILE_SECRET_KEY ||
      (!dependencies.local && /^[123]x0+AA$/.test(env.TURNSTILE_SECRET_KEY))
    )
      return reply(503, "unavailable")
    try {
      const response = await (dependencies.siteverify ?? fetch)(SITEVERIFY, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          secret: env.TURNSTILE_SECRET_KEY,
          response: data.turnstileToken,
        }),
        signal: AbortSignal.timeout(10000),
      })
      if (!response.ok) return reply(503, "verification_unavailable")
      const result: unknown = await response.json()
      if (
        !result ||
        typeof result !== "object" ||
        !("success" in result) ||
        result.success !== true ||
        !("action" in result) ||
        result.action !== "ask_pavao" ||
        !("hostname" in result) ||
        result.hostname !== new URL(env.APP_ORIGIN).hostname
      )
        return reply(400, "turnstile_failed")
    } catch {
      return reply(503, "verification_unavailable")
    }
    // Cloudflare supplies this header at the edge. It is used only as a transient
    // limiter key, never copied into emails, application storage or logs.
    const ip =
      request.headers.get("CF-Connecting-IP") ||
      (dependencies.local ? "local-preview" : "")
    if (!ip) return reply(403, "origin_rejected")
    try {
      if (
        !(await env.ASK_PAVAO_LIMITER.limit({ key: `ask-pavao:${ip}` })).success
      )
        return reply(429, "rate_limited")
    } catch {
      return reply(503, "unavailable")
    }
    try {
      const message = questionEmail(data)
      if (dependencies.deliver) await dependencies.deliver(env, message)
      else await env.ASK_PAVAO_EMAIL.send(message)
      return reply(200)
    } catch {
      return reply(502, "delivery_failed")
    }
  }
}
const handler = createAskPavaoHandler()
export default { fetch: handler } satisfies ExportedHandler<AskPavaoEnv>
