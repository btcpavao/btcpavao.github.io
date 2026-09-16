import assert from "node:assert/strict"
import { mkdtemp, rm } from "node:fs/promises"
import { tmpdir } from "node:os"
import path from "node:path"
import { pathToFileURL } from "node:url"
import { build } from "esbuild"

const temp = await mkdtemp(path.join(tmpdir(), "curriculum-search-"))
try {
  async function bundle(source, name) {
    const outfile = path.join(temp, `${name}.mjs`)
    await build({
      entryPoints: [source],
      outfile,
      bundle: true,
      platform: "node",
      format: "esm",
      logLevel: "silent",
    })
    return import(pathToFileURL(outfile).href)
  }
  const { curriculumLessons } = await bundle(
    "src/bitcoin-core-curriculum-player-en-data.ts",
    "data"
  )
  const {
    buildCurriculumSearchIndex,
    searchCurriculum,
    curriculumLessonHref,
    normalizeSearch,
    isLabelTransferQuery,
  } = await bundle("src/curriculum-search.ts", "search")
  const index = buildCurriculumSearchIndex(curriculumLessons)
  const search = (q) => searchCurriculum(index, q)
  let count = 0
  function check(title, fn) {
    fn()
    count++
    console.log(`✓ ${title}`)
  }
  check("Every published exact title ranks its own lesson first", () => {
    for (const { lesson } of index)
      assert.equal(search(lesson.title)[0]?.lesson.id, lesson.id, lesson.title)
  })
  check("Case, accents, punctuation and partial terms are normalized", () => {
    assert.deepEqual(
      search("PSBT"),
      search("psbt").map((r) => ({
        ...r,
        href: curriculumLessonHref(r.lesson.slug, "PSBT"),
      }))
    )
    assert.equal(normalizeSearch("  LÍNUX—Debian! "), "linux debian")
    assert.ok(search("descrip").length)
  })
  check(
    "UTXO management and coin control find the real coin-control exercise first",
    () => {
      for (const q of ["utxo", "UTXO management", "coin control"])
        assert.equal(search(q)[0]?.lesson.id, "coin-control-fees", q)
    }
  )
  check(
    "Labels and labeling find label content; snippets quote existing passages",
    () => {
      for (const q of ["labels", "labeling"]) {
        assert.ok(search(q).some((r) => r.lesson.id === "coin-control-fees"))
        assert.ok(
          search(q).some((r) => r.lesson.id === "backup-redundancy-freshness")
        )
        assert.match(search(q)[0].excerpt, /label/i)
      }
    }
  )
  check(
    "Label transfer queries lead to backup guidance with an explicit coverage gap",
    () => {
      for (const q of ["export labels", "import labels", "backup labels"])
        assert.equal(search(q)[0]?.lesson.id, "backup-redundancy-freshness")
      assert.ok(isLabelTransferQuery("IMPORT LABELS"))
      assert.ok(!isLabelTransferQuery("import descriptors"))
    }
  )
  check("All requested core topics have searchable existing content", () => {
    for (const q of [
      "wallet backup",
      "descriptor",
      "multisig",
      "psbt",
      "recovery",
      "inheritance",
      "signet",
      "regtest",
      "rpc",
      "terminal",
      "linux",
      "debian",
      "verify",
      "signature",
      "checksum",
    ])
      assert.ok(search(q).length, q)
  })
  check("Sections and chapters are indexed", () => {
    assert.ok(
      search("Advanced Spending Policies").some((r) => r.phase.id === "2")
    )
    assert.ok(
      search("Prove backup and recovery").some(
        (r) => r.lesson.chapter === "Prove backup and recovery"
      )
    )
  })
  check("Empty, cleared and no-result queries return no results", () => {
    for (const q of ["", "   ", "!!!", "zzqnonexistenttopic922"])
      assert.deepEqual(search(q), [])
  })
  check(
    "Every result links to the existing precise lesson anchor and preserves a shareable query",
    () => {
      for (const r of search("recovery")) {
        const url = new URL(r.href, "https://btcpavao.com")
        assert.equal(url.pathname, "/en/bitcoin-core/self-custody/")
        assert.equal(decodeURIComponent(url.hash), `#lesson/${r.lesson.slug}`)
        assert.equal(url.searchParams.get("q"), "recovery")
      }
      assert.equal(
        new URL(
          curriculumLessonHref("test", "a & b"),
          "https://btcpavao.com"
        ).searchParams.get("q"),
        "a & b"
      )
    }
  )
  check(
    "Body, step instructions and commands are indexed; source-only metadata is excluded",
    () => {
      const entry = curriculumLessons[0]
      const fixture = buildCurriculumSearchIndex([
        {
          ...entry,
          lesson: {
            ...entry.lesson,
            title: "Needle title",
            summary: "Summary only",
            explanation: ["bodyneedle"],
            guidedSteps: [
              {
                id: "step",
                title: "Step",
                instructions: ["instructionneedle"],
                expectedResult: "resultneedle",
                command: "commandneedle",
              },
            ],
            sources: [
              { label: "sourceonlyneedle", url: "https://example.com" },
            ],
          },
        },
      ])
      for (const q of [
        "bodyneedle",
        "instructionneedle",
        "resultneedle",
        "commandneedle",
      ])
        assert.equal(searchCurriculum(fixture, q).length, 1)
      assert.equal(searchCurriculum(fixture, "sourceonlyneedle").length, 0)
    }
  )
  check("All query tokens must match; planned lessons are excluded", () => {
    assert.equal(search("linux zzqnonexistenttopic922").length, 0)
    assert.equal(
      buildCurriculumSearchIndex([
        {
          ...curriculumLessons[0],
          lesson: { ...curriculumLessons[0].lesson, status: "planned" },
        },
      ]).length,
      0
    )
  })
  console.log(
    `\n${count} curriculum search checks passed. Clear, keyboard, URL history and no-result rendering also require browser verification.`
  )
} finally {
  await rm(temp, { recursive: true, force: true })
}
