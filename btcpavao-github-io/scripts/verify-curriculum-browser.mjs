import assert from "node:assert/strict"
import { mkdtemp, mkdir, writeFile, rm } from "node:fs/promises"
import { tmpdir } from "node:os"
import path from "node:path"
import { pathToFileURL } from "node:url"
import { build } from "esbuild"
import { createServer } from "vite"
import { chromium } from "playwright"

const temp = await mkdtemp(path.join(tmpdir(), "curriculum-browser-"))
const screenshots = process.env.CURRICULUM_SCREENSHOTS
if (screenshots) await mkdir(screenshots, { recursive: true })
let server, browser
try {
  const outfile = path.join(temp, "data.mjs")
  await build({
    entryPoints: ["src/bitcoin-core-curriculum-player-en-data.ts"],
    outfile,
    bundle: true,
    platform: "node",
    format: "esm",
    logLevel: "silent",
  })
  const { curriculumLessons: entries } = await import(
    pathToFileURL(outfile).href
  )
  server = await createServer({ server: { host: "127.0.0.1", port: 0 } })
  await server.listen()
  const base = `http://127.0.0.1:${server.httpServer.address().port}/en/bitcoin-core/self-custody/`
  browser = await chromium.launch({
    headless: true,
    executablePath:
      process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH || undefined,
    args: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH
      ? [
          "--no-sandbox",
          "--disable-dev-shm-usage",
          "--no-zygote",
          "--single-process",
        ]
      : [],
  })
  const page = await browser.newPage({
    viewport: { width: 1440, height: 1000 },
  })
  await page.emulateMedia({ reducedMotion: "reduce" })
  await page.addInitScript(() => {
    Object.defineProperty(navigator, "clipboard", {
      value: {
        writeText: async (value) => {
          window.__curriculumCopiedLink = value
        },
      },
    })
  })
  const errors = [],
    overflows = []
  page.on("pageerror", (e) => errors.push(e.message))
  page.on("console", (m) => {
    if (m.type() === "error" && !m.text().includes("net::ERR"))
      errors.push(m.text())
  })
  async function lesson(index) {
    const l =
      typeof index === "number"
        ? entries[index].lesson
        : entries.find((e) => e.lesson.id === index).lesson
    await page.evaluate((slug) => {
      location.hash = `lesson/${slug}`
    }, l.slug)
    await page.waitForFunction(
      (title) => document.querySelector("h1")?.textContent === title,
      l.title
    )
    return l
  }
  async function answer(l, correct = true) {
    const i = correct
      ? l.understanding.correct
      : (l.understanding.correct + 1) % 3
    await page
      .locator(".concept-understanding input[type=radio]")
      .nth(i)
      .check()
    await page
      .getByRole("button", { name: "Check answer", exact: true })
      .click()
    const text = await page.locator(".concept-feedback").innerText()
    assert.ok(
      text.includes(correct ? "That’s right." : "Try the example again."),
      l.id
    )
  }
  await page.goto(base)
  await page
    .getByRole("button", { name: "Begin with first principles" })
    .click()
  assert.equal(await page.locator("h1").innerText(), entries[0].lesson.title)
  assert.equal(
    await page.locator(".concept-visual").count(),
    1,
    "No duplicate-key rendering"
  )
  assert.equal(
    await page
      .getByRole("button", { name: "Mark as read", exact: true })
      .isDisabled(),
    true
  )
  await answer(entries[0].lesson, false)
  for (let i = 0; i < entries[0].lesson.explanation.length; i++)
    await page
      .getByRole("button", {
        name:
          i === entries[0].lesson.explanation.length - 1
            ? "Confirm reading"
            : "Continue reading",
        exact: true,
      })
      .click()
  assert.equal(
    await page
      .getByRole("button", { name: "Mark as read", exact: true })
      .isDisabled(),
    true,
    "Wrong answer cannot unlock completion"
  )
  await answer(entries[0].lesson)
  await page.getByRole("button", { name: "Mark as read", exact: true }).click()
  await page.getByRole("button", { name: /Next concept/ }).click()
  assert.equal(await page.locator("h1").innerText(), entries[1].lesson.title)
  await page.evaluate((slug) => {
    location.hash = `lesson/${slug}`
  }, entries.at(-1).lesson.slug)
  await page.waitForFunction(() =>
    document.body.textContent.includes("Choose Open Curriculum")
  )
  assert.equal(
    await page.locator("h1").innerText(),
    entries[1].lesson.title,
    "Future deep link cannot bypass guided frontier"
  )
  await page
    .getByRole("button", { name: "Copy lesson link", exact: true })
    .click()
  assert.equal(
    await page.evaluate(() => new URL(window.__curriculumCopiedLink).hash),
    `#lesson/${entries[1].lesson.slug}`,
    "Copy shares the displayed guided lesson"
  )
  await page
    .getByRole("button", { name: "Open Curriculum", exact: true })
    .click()
  await page.waitForFunction(
    (title) => document.querySelector("h1")?.textContent === title,
    entries.at(-1).lesson.title
  )
  await lesson(0)
  await page
    .getByRole("button", { name: "Guided Learning · Recommended", exact: true })
    .click()
  await page.reload()
  await page.waitForFunction(() =>
    document
      .querySelector(".concept-feedback")
      ?.textContent.includes("completed")
  )
  assert.ok(
    (await page.locator(".guided-history").first().innerText()).includes(
      "1 completed"
    ),
    "Progress survives reload and switching"
  )
  console.log(
    "✓ Guided gate, wrong/correct feedback, deep links, reload and mode persistence"
  )
  await page
    .getByRole("button", { name: "Open Curriculum", exact: true })
    .click()
  await page.reload()
  await page.waitForFunction(
    () =>
      document.querySelector('.course-modes button[aria-pressed="true"]')
        ?.textContent === "Open Curriculum"
  )
  const visualKinds = new Set()
  for (const { lesson: l } of entries) {
    await lesson(l.id)
    assert.equal(await page.locator(".concept-visual").count(), 1, l.id)
    assert.equal(await page.locator(".concept-understanding").count(), 1, l.id)
    assert.equal(await page.locator(".concept-recording").count(), 1, l.id)
    await answer(l, false)
    await answer(l, true)
    await page.locator(".concept-diagram-labels summary").click()
    assert.ok(await page.locator(".concept-diagram-labels li").count(), l.id)
    await page.locator(".concept-recording summary").click()
    assert.equal(
      await page.locator(".concept-recording details").getAttribute("open"),
      ""
    )
    if (entries.findIndex((e) => e.lesson.id === l.id) % 32 === 31)
      console.log(
        `  Walked through ${entries.findIndex((e) => e.lesson.id === l.id) + 1}/${entries.length} lessons`
      )
    const svgOverflow = await page
      .locator(".concept-visual svg text")
      .evaluateAll((nodes) =>
        nodes.flatMap((n) => {
          const b = n.getBBox()
          return b.x < -1 ||
            b.x + b.width > 481 ||
            b.y < -1 ||
            b.y + b.height > 341
            ? [n.textContent]
            : []
        })
      )
    if (svgOverflow.length) overflows.push({ id: l.id, text: svgOverflow })
    if (!visualKinds.has(l.visual.kind)) {
      visualKinds.add(l.visual.kind)
      if (screenshots)
        await page.locator(".concept-visual").screenshot({
          path: path.join(screenshots, `${l.visual.kind}-desktop.png`),
        })
    }
  }
  if (screenshots)
    await writeFile(
      path.join(screenshots, "visual-overflow.json"),
      JSON.stringify(overflows, null, 2)
    )
  console.log(
    `✓ ${entries.length} lesson screens, comprehension feedback and narration disclosure`
  )
  await lesson("encrypt-an-encrypted-file")
  await page.getByLabel("GPG layers").fill("3")
  await page.getByLabel("Outermost layer words").fill("8")
  assert.ok(
    (await page.locator(".concept-visual").innerText()).includes(
      "Layer 3: 8 words"
    )
  )
  await lesson("independent-copies")
  await page.locator(".concept-visual select").selectOption("1000")
  await page
    .getByRole("button", { name: "Simulate losing one location" })
    .click()
  assert.ok(
    (await page.locator(".concept-visual").innerText()).includes("999 of 1,000")
  )
  await page.getByLabel("Independent locations").uncheck()
  assert.ok(
    (await page.locator(".concept-visual").innerText()).includes("0 of 1,000")
  )
  await lesson("vault-memory-and-backups")
  await page.getByRole("button", { name: "Simulate shutdown" }).click()
  assert.ok(
    (await page.locator(".concept-visual").innerText()).includes("Next session")
  )
  console.log(
    "✓ Layer controls, independent loss scenarios and volatile-session transition"
  )
  for (const width of [390, 320]) {
    await page.setViewportSize({ width, height: 844 })
    const seen = new Set()
    for (const { lesson: l } of entries) {
      await lesson(l.id)
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth > innerWidth + 1
      )
      assert.equal(overflow, false, `${l.id} overflows at ${width}px`)
      if (width === 390 && !seen.has(l.visual.kind)) {
        seen.add(l.visual.kind)
        if (screenshots)
          await page.locator(".concept-visual").screenshot({
            path: path.join(screenshots, `${l.visual.kind}-mobile.png`),
          })
      }
    }
    console.log(`✓ All ${entries.length} lessons fit the ${width}px viewport`)
  }
  await page.setViewportSize({ width: 1440, height: 1000 })
  await lesson("core-trust-evidence")
  await page.evaluate(() => document.documentElement.classList.add("dark"))
  if (screenshots)
    await page
      .locator(".concept-visual")
      .screenshot({ path: path.join(screenshots, "trust-dark.png") })
  assert.deepEqual(errors, [], "Browser console and runtime errors")
  if (screenshots)
    await writeFile(
      path.join(screenshots, "visual-overflow.json"),
      JSON.stringify(overflows, null, 2)
    )
  assert.deepEqual(overflows, [], "SVG labels must stay inside their viewBox")
  console.log(
    `✓ ${visualKinds.size} visual families; no console errors or overflowing SVG labels`
  )
} finally {
  await browser?.close()
  await server?.close()
  await rm(temp, { recursive: true, force: true })
}
