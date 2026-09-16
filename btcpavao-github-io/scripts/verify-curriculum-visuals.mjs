import assert from "node:assert/strict"
import { mkdtemp, readFile, access, rm } from "node:fs/promises"
import { tmpdir } from "node:os"
import path from "node:path"
import { pathToFileURL } from "node:url"
import { build } from "esbuild"
const temporary = await mkdtemp(path.join(tmpdir(), "curriculum-visuals-"))
try {
  async function bundle(entry, name) {
    const outfile = path.join(temporary, `${name}.mjs`)
    await build({
      entryPoints: [entry],
      outfile,
      bundle: true,
      platform: "node",
      format: "esm",
      jsx: "automatic",
      define: { "import.meta.env": "{}" },
      loader: { ".css": "empty" },
      banner: {
        js: "import { createRequire } from 'node:module'; const require = createRequire(import.meta.url);",
      },
      logLevel: "silent",
    })
    return import(pathToFileURL(outfile).href)
  }
  const { curriculumLessons } = await bundle(
    "src/bitcoin-core-curriculum-player-en-data.ts",
    "course"
  )
  const { visualCatalog, visualPlacements, visualsFor, exampleTransaction } =
    await bundle("src/curriculum/visuals.ts", "visuals")
  const decisions = JSON.parse(
    await readFile("../docs/curriculum-visuals/audit-decisions.json", "utf8")
  )
  const lessons = new Map(
    curriculumLessons.map(({ lesson }) => [lesson.id, lesson])
  )
  assert.equal(decisions.length, 99)
  assert.equal(decisions.filter((d) => d.auditDecision === "Yes").length, 49)
  assert.equal(decisions.filter((d) => d.auditDecision === "Maybe").length, 10)
  let placements = 0
  for (const d of decisions) {
    const lesson = lessons.get(d.lessonId)
    assert.ok(lesson, d.lessonId)
    assert.equal(lesson.slug, d.slug)
    const entries = visualPlacements[d.lessonId] ?? []
    if (d.auditDecision === "Yes")
      assert.ok(entries.length, `Missing Yes: ${d.lessonId}`)
    if (d.auditDecision === "No")
      assert.equal(entries.length, 0, `Unexpected art: ${d.lessonId}`)
    assert.deepEqual(
      d.implementation,
      entries,
      `Audit record stale: ${d.lessonId}`
    )
    const coreTargets = new Set()
    for (const p of entries) {
      placements++
      const def = visualCatalog[p.visual]
      assert.ok(def, `Missing asset: ${p.visual}`)
      assert.ok(def.caption && def.title)
      if (p.active !== undefined)
        assert.ok(
          def.states?.[p.active],
          `Missing active-state caption: ${p.id}`
        )
      assert.ok(visualsFor(d.lessonId, p.target).some((v) => v.id === p.id))
      if (p.target.kind === "reading") {
        assert.equal(lesson.kind, "reading")
        assert.equal(
          lesson.explanation.filter((s) => s === p.target.anchor).length,
          1,
          `Review changed paragraph: ${p.id}`
        )
      }
      if (p.target.kind === "step")
        assert.ok(
          lesson.guidedSteps.some((s) => s.id === p.target.stepId),
          p.id
        )
      if (p.target.kind === "checkpoint")
        assert.equal(lesson.kind, "checkpoint")
      if (p.display === "core") {
        const key = JSON.stringify(p.target)
        assert.ok(!coreTargets.has(key), `More than one core idea: ${p.id}`)
        coreTargets.add(key)
      }
      if (def.src) {
        assert.ok(def.alt)
        await access(path.join("public", def.src))
      }
    }
  }
  const lesson = lessons.get("2.4"),
    anchor = lesson.explanation[1]
  assert.equal(visualsFor("2.4", { kind: "reading", anchor }).length, 1)
  assert.equal(
    visualsFor("2.4", {
      kind: "reading",
      anchor: "Changed content needs review",
    }).length,
    0
  )
  assert.equal(
    visualsFor("2.4", { kind: "reading", anchor: lesson.explanation[0] })
      .length,
    0
  )
  assert.equal(
    visualsFor("offline-psbt", { kind: "step", stepId: "broadcast" })[0].active,
    3
  )
  assert.equal(
    visualsFor("offline-psbt", { kind: "step", stepId: "nonexistent" }).length,
    0
  )
  assert.equal(
    visualsFor("lab-method", { kind: "background" })[0].visual,
    "lab-host"
  )
  assert.equal(
    visualsFor("lab-method", { kind: "step", stepId: "scope-v4" }).length,
    0
  )
  assert.equal(exampleTransaction.fee, 1000)
  assert.equal(
    exampleTransaction.input,
    exampleTransaction.payment +
      exampleTransaction.change +
      exampleTransaction.fee
  )
  // Ensure no teaching asset is orphaned and all table rows preserve their dimensions.
  const used = new Set(
    Object.values(visualPlacements)
      .flat()
      .map((p) => p.visual)
  )
  for (const [id, d] of Object.entries(visualCatalog)) {
    assert.ok(used.has(id), `Orphan: ${id}`)
    if (d.layout === "table")
      d.rows.forEach((row) => assert.equal(row.length, d.headers.length, id))
  }
  const renderer = await bundle(
    "scripts/verify-curriculum-renderer.tsx",
    "renderer"
  )
  renderer.verifyRenderer()
  console.log(
    `Verified 99 audit decisions, ${placements} placements, ${used.size} visuals, exact reading anchors, guided IDs, one core idea per screen, assets and fee arithmetic.`
  )
} finally {
  await rm(temporary, { recursive: true, force: true })
}
