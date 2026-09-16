import assert from "node:assert/strict"
import { mkdtemp, rm, readFile } from "node:fs/promises"
import { tmpdir } from "node:os"
import path from "node:path"
import { pathToFileURL } from "node:url"
import { build } from "esbuild"
const dir = await mkdtemp(path.join(tmpdir(), "ask-pavao-worker-"))
try {
  const outfile = path.join(dir, "worker.mjs")
  await build({
    entryPoints: ["worker/index.ts"],
    outfile,
    bundle: true,
    platform: "node",
    format: "esm",
    logLevel: "silent",
  })
  const { createAskPavaoHandler } = await import(pathToFileURL(outfile).href)
  const base = {
    question: "Does the backup preserve labels?",
    turnstileToken: "synthetic-test-token",
  }
  function setup(options = {}) {
    const calls = [],
      emails = [],
      requests = []
    const env = {
      APP_ORIGIN: "https://btcpavao.com",
      TURNSTILE_SECRET_KEY: "synthetic-secret-not-real",
      ASK_PAVAO_LIMITER: {
        limit: async (data) => {
          calls.push("rate")
          requests.push(data)
          if (options.rateError) throw Error("private internal detail")
          return { success: options.rate !== false }
        },
      },
      ASK_PAVAO_EMAIL: {
        send: async (email) => {
          calls.push("email")
          if (options.mailError) throw Error("private internal detail")
          emails.push(email)
          return { messageId: "mock" }
        },
      },
    }
    const handle = createAskPavaoHandler({
      siteverify: async (url, opts) => {
        calls.push("turnstile")
        assert.equal(
          url,
          "https://challenges.cloudflare.com/turnstile/v0/siteverify"
        )
        assert.deepEqual(Object.keys(JSON.parse(opts.body)).sort(), [
          "response",
          "secret",
        ])
        if (options.verifyError) throw Error("private internal detail")
        return Response.json(
          options.verification ?? {
            success: true,
            action: "ask_pavao",
            hostname: "btcpavao.com",
          }
        )
      },
    })
    const send = (body = base, overrides = {}) =>
      handle(
        new Request("https://btcpavao.com/api/ask-pavao", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Origin: env.APP_ORIGIN,
            "CF-Connecting-IP": "198.51.100.19",
            ...overrides.headers,
          },
          body: JSON.stringify(body),
          ...Object.fromEntries(
            Object.entries(overrides).filter(([k]) => k !== "headers")
          ),
        }),
        env
      )
    return { env, handle, send, calls, emails, requests }
  }
  let checks = 0
  async function check(name, fn) {
    await fn()
    checks++
    console.log(`✓ ${name}`)
  }
  await check(
    "Accepts question only, optional name/email combinations and lesson context",
    async () => {
      for (const extra of [
        {},
        { name: "Pavao" },
        { email: "reader@example.com" },
        { name: "Reader", email: "reader@example.com" },
        {
          lessonTitle: "Backup and recovery",
          sectionTitle: "Master the Simple System",
          pageUrl:
            "https://btcpavao.com/en/bitcoin-core/self-custody/#lesson/coin-control-fees",
          locale: "en",
        },
      ]) {
        const s = setup()
        assert.equal((await s.send({ ...base, ...extra })).status, 200)
        assert.equal(s.emails.length, 1)
        assert.deepEqual(s.calls, ["turnstile", "rate", "email"])
      }
    }
  )
  await check(
    "Strict validation rejects empty/short/overlong question, invalid email, types, locale and unknown fields",
    async () => {
      for (const extra of [
        { question: "  " },
        { question: "abc" },
        { question: "x".repeat(5001) },
        { email: "not-email" },
        { name: 123 },
        { name: null },
        { email: [] },
        { locale: "de" },
        { turnstileToken: "" },
        { turnstileToken: "t".repeat(2049) },
        { name: "x".repeat(151) },
        { sectionTitle: "x".repeat(121) },
        { question: null },
      ]) {
        const s = setup()
        assert.equal(
          (await s.send({ ...base, ...extra })).status,
          400,
          JSON.stringify(extra).slice(0, 80)
        )
        assert.equal(s.calls.length, 0)
      }
      for (const bad of [[], null, 42, "text"]) {
        const s = setup()
        assert.equal((await s.send(bad)).status, 400)
      }
    }
  )
  await check(
    "Visitor cannot control destination, sender, Reply-To headers or arbitrary properties",
    async () => {
      for (const extra of [
        { to: "attacker@example.com" },
        { destination: "attacker@example.com" },
        { from: "attacker@example.com" },
        { replyTo: "attacker@example.com" },
        { headers: { Bcc: "attacker@example.com" } },
      ]) {
        const s = setup()
        assert.equal((await s.send({ ...base, ...extra })).status, 400)
        assert.equal(s.emails.length, 0)
      }
      const s = setup()
      await s.send(base)
      assert.equal(s.emails[0].to, "pavao@hey.com")
      assert.equal(s.emails[0].from, "curriculum@btcpavao.com")
    }
  )
  await check(
    "CR/LF and control character injection rejected in identity and subject/context",
    async () => {
      for (const key of [
        "name",
        "email",
        "lessonTitle",
        "sectionTitle",
        "searchQuery",
      ]) {
        const s = setup()
        assert.equal(
          (await s.send({ ...base, [key]: "Name\r\nBcc: other@example.com" }))
            .status,
          400
        )
        assert.equal(s.emails.length, 0)
      }
    }
  )
  await check(
    "Anonymous email has no fabricated contact or Reply-To; body is plain text",
    async () => {
      const s = setup()
      await s.send({
        ...base,
        question: "<script>alert('test')</script>\nBcc: this remains body text",
        searchQuery: "backup labels",
      })
      const email = s.emails[0]
      assert.equal(email.replyTo, undefined)
      assert.equal(email.html, undefined)
      assert.match(email.text, /Name: Not provided\nEmail: Not provided/)
      assert.match(email.text, /<script>/)
      assert.match(email.text, /Search query: backup labels/)
      assert.ok(!email.subject.includes("backup labels"))
      for (const forbidden of [
        "198.51.100.19",
        "synthetic-test-token",
        "synthetic-secret-not-real",
        "user-agent",
        "cookie",
      ])
        assert.ok(!JSON.stringify(email).includes(forbidden))
    }
  )
  await check(
    "Validated visitor email appears only as contact and Reply-To, never From",
    async () => {
      const s = setup()
      await s.send({ ...base, email: " reader@example.com ", name: " Reader " })
      assert.equal(s.emails[0].replyTo, "reader@example.com")
      assert.match(s.emails[0].text, /Name: Reader/)
      assert.equal(s.emails[0].from, "curriculum@btcpavao.com")
    }
  )
  await check(
    "Context URL rejects other origins, credentials, queries, unrelated paths and unexpected hashes",
    async () => {
      for (const pageUrl of [
        "https://evil.example/",
        "https://btcpavao.com.evil.example/en/bitcoin-core/self-custody/",
        "https://user@btcpavao.com/en/bitcoin-core/self-custody/",
        "https://btcpavao.com/en/bitcoin-core/self-custody/?token=private",
        "https://btcpavao.com/private/",
        "https://btcpavao.com/en/bitcoin-core/self-custody/#other",
        "not a URL",
      ]) {
        const s = setup()
        assert.equal((await s.send({ ...base, pageUrl })).status, 400)
      }
    }
  )
  await check(
    "Turnstile rejection, expired/reused token, wrong action/host or malformed response never sends email",
    async () => {
      for (const verification of [
        { success: false, "error-codes": ["timeout-or-duplicate"] },
        { success: true, hostname: "btcpavao.com", action: "other" },
        { success: true, hostname: "evil.example", action: "ask_pavao" },
        { success: "true" },
        null,
      ]) {
        const s = setup({ verification: verification ?? {} })
        assert.equal((await s.send()).status, 400)
        assert.deepEqual(s.calls, ["turnstile"])
      }
      const s = setup({ verifyError: true })
      assert.equal((await s.send()).status, 503)
      assert.equal(s.emails.length, 0)
    }
  )
  await check(
    "Production rejects dummy secret and missing secret instead of bypassing verification",
    async () => {
      for (const secret of ["", "1x0000000000000000000000000000000AA"]) {
        const s = setup()
        s.env.TURNSTILE_SECRET_KEY = secret
        assert.equal((await s.send()).status, 503)
        assert.equal(s.calls.length, 0)
      }
    }
  )
  await check(
    "Rate limit runs after verification and rejects without email; IP is only the transient limiter key",
    async () => {
      const s = setup({ rate: false })
      const r = await s.send()
      assert.equal(r.status, 429)
      assert.equal(r.headers.get("Retry-After"), "60")
      assert.deepEqual(s.calls, ["turnstile", "rate"])
      assert.equal(s.requests[0].key, "ask-pavao:198.51.100.19")
      const failed = setup({ rateError: true })
      assert.equal((await failed.send()).status, 503)
    }
  )
  await check(
    "Honeypot suppresses delivery and verification without disclosing the filter",
    async () => {
      const s = setup()
      const r = await s.send({
        ...base,
        companyWebsite: "https://spam.example",
      })
      assert.deepEqual(await r.json(), { ok: true })
      assert.deepEqual(s.calls, [])
    }
  )
  await check(
    "Email failure returns safe retryable response, never internal data or success",
    async () => {
      const s = setup({ mailError: true })
      const r = await s.send()
      assert.equal(r.status, 502)
      assert.deepEqual(await r.json(), { ok: false, code: "delivery_failed" })
    }
  )
  await check(
    "Origin, method, content type, exact endpoint and malformed JSON are checked",
    async () => {
      const s = setup()
      assert.equal(
        (await s.send(base, { headers: { Origin: "https://evil.example" } }))
          .status,
        403
      )
      assert.equal(
        (await s.send(base, { headers: { Origin: "" } })).status,
        403
      )
      assert.equal(
        (await s.send(base, { headers: { "Content-Type": "text/plain" } }))
          .status,
        415
      )
      assert.equal((await s.send(base, { body: "{" })).status, 400)
      assert.equal(
        (
          await s.handle(
            new Request("https://btcpavao.com/api/ask-pavao"),
            s.env
          )
        ).status,
        405
      )
      assert.equal(
        (
          await s.handle(
            new Request("https://btcpavao.com/api/ask-pavao/other"),
            s.env
          )
        ).status,
        404
      )
      assert.equal(
        (await s.send(base, { headers: { "CF-Connecting-IP": "" } })).status,
        403
      )
    }
  )
  await check(
    "Body byte limit applies even without trustworthy Content-Length",
    async () => {
      const s = setup()
      assert.equal(
        (
          await s.send(base, {
            body: '{"question":"' + "x".repeat(34000) + '"}',
          })
        ).status,
        413
      )
      assert.equal(
        (await s.send(base, { headers: { "Content-Length": "40000" } })).status,
        413
      )
    }
  )
  await check(
    "No permissive CORS, response caching, application logging or database bindings",
    async () => {
      const s = setup()
      const r = await s.send()
      assert.equal(r.headers.get("Access-Control-Allow-Origin"), null)
      assert.equal(r.headers.get("Cache-Control"), "no-store")
      const source = await readFile("worker/index.ts", "utf8")
      assert.ok(!/console\./.test(source))
      const config = JSON.parse(await readFile("wrangler.jsonc", "utf8"))
      assert.equal(config.send_email[0].destination_address, "pavao@hey.com")
      assert.deepEqual(config.send_email[0].allowed_sender_addresses, [
        "curriculum@btcpavao.com",
      ])
      assert.equal(config.observability.enabled, false)
      assert.equal(config.kv_namespaces, undefined)
      assert.equal(config.d1_databases, undefined)
      const local = JSON.parse(await readFile("wrangler.local.jsonc", "utf8"))
      assert.equal(local.send_email, undefined)
      assert.notEqual(local.main, config.main)
    }
  )
  console.log(
    `\n${checks} Worker security and delivery checks passed. Siteverify, rate limiter and email are mocked; no real email sent.`
  )
} finally {
  await rm(dir, { recursive: true, force: true })
}
