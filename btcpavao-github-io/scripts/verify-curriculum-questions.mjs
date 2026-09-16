import assert from "node:assert/strict"
import { mkdtemp, rm } from "node:fs/promises"
import { tmpdir } from "node:os"
import path from "node:path"
import { pathToFileURL } from "node:url"
import { build } from "esbuild"
const temporary = await mkdtemp(path.join(tmpdir(), "curriculum-questions-"))
try {
  const outfile = path.join(temporary, "questions.mjs")
  await build({
    entryPoints: ["src/curriculum-questions.ts"],
    outfile,
    bundle: true,
    platform: "node",
    format: "esm",
    logLevel: "silent",
  })
  const { validateQuestion, questionPayload, sendCurriculumQuestion } =
    await import(pathToFileURL(outfile).href)
  let checks = 0
  async function check(title, fn) {
    await fn()
    checks++
    console.log(`✓ ${title}`)
  }
  const fields = { question: "What does this step mean?", name: "", email: "" }
  const context = {
    section: "First Principles",
    lesson: "Threat model",
    slug: "threat-model-before-tools",
  }
  await check("Only question is required; whitespace is rejected", () => {
    assert.deepEqual(validateQuestion(fields), {})
    assert.ok(validateQuestion({ ...fields, question: "  " }).question)
    assert.ok(
      validateQuestion({ ...fields, question: "x".repeat(5001) }).question
    )
  })
  await check("Email is validated only when provided", () => {
    assert.ok(validateQuestion({ ...fields, email: "invalid" }).email)
    assert.deepEqual(
      validateQuestion({ ...fields, email: " person@example.com " }),
      {}
    )
    assert.deepEqual(validateQuestion({ ...fields, email: "   " }), {})
  })
  await check(
    "Anonymous payload omits identity fields and contains only explicit public context",
    () => {
      const payload = questionPayload(fields, {
        ...context,
        query: "secret",
        history: "private",
        url: "https://example.com/?token=private",
      })
      assert.deepEqual(
        Object.keys(payload).sort(),
        [
          "companyWebsite",
          "locale",
          "pageUrl",
          "question",
          "sectionTitle",
          "lessonTitle",
          "turnstileToken",
        ].sort()
      )
      assert.equal(payload.sectionTitle, context.section)
      assert.equal(payload.lessonTitle, context.lesson)
      assert.equal(
        payload.pageUrl,
        "https://btcpavao.com/en/bitcoin-core/self-custody/#lesson/threat-model-before-tools"
      )
      assert.ok(!JSON.stringify(payload).includes("private"))
    }
  )
  await check("Explicit search context is bounded and never copied into the page URL", () => {
    const payload = questionPayload(fields, { section: "Curriculum search", searchQuery: "x".repeat(300) })
    assert.equal(payload.searchQuery.length, 200)
    assert.equal(new URL(payload.pageUrl).search, "")
  })
  await check(
    "Optional identity values are trimmed; URLs encode the lesson slug",
    () => {
      const payload = questionPayload(
        { ...fields, name: " Name ", email: " person@example.com " },
        { section: "Search" }
      )
      assert.equal(payload.name, "Name")
      assert.equal(payload.email, "person@example.com")
      assert.equal(
        payload.pageUrl,
        "https://btcpavao.com/en/bitcoin-core/self-custody/"
      )
      assert.ok(
        questionPayload(fields, {
          section: "Test",
          slug: "a?b",
        }).pageUrl.endsWith("#lesson/a%3Fb")
      )
    }
  )
  await check(
    "Transport sends anonymous questions without cookies or referrer and waits for confirmed receipt",
    async () => {
      await sendCurriculumQuestion(
        "https://example.com/questions",
        questionPayload(fields, context),
        async (url, options) => {
          assert.equal(url, "https://example.com/questions")
          assert.equal(options.method, "POST")
          assert.equal(options.credentials, "omit")
          assert.equal(options.referrerPolicy, "no-referrer")
          assert.equal(JSON.parse(options.body).email, undefined)
          assert.ok(options.signal)
          return new Response(JSON.stringify({ ok: true }), { status: 200 })
        }
      )
    }
  )
  await check(
    "HTTP, unconfirmed JSON, malformed response and network errors never count as success",
    async () => {
      for (const response of [
        new Response("error", { status: 500 }),
        new Response(JSON.stringify({ ok: false })),
        new Response("not json"),
      ])
        await assert.rejects(
          sendCurriculumQuestion(
            "https://example.com",
            questionPayload(fields, context),
            async () => response
          )
        )
      await assert.rejects(
        sendCurriculumQuestion(
          "https://example.com",
          questionPayload(fields, context),
          async () => {
            throw new Error("offline")
          }
        )
      )
    }
  )
  console.log(
    `\n${checks} question form contract checks passed. These use test responses; no external message was sent.`
  )
} finally {
  await rm(temporary, { recursive: true, force: true })
}
