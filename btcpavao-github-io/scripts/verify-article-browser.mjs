import assert from "node:assert/strict"
import { mkdtemp, readFile, rm } from "node:fs/promises"
import { tmpdir } from "node:os"
import path from "node:path"
import { pathToFileURL } from "node:url"
import { build } from "esbuild"
import { contentRegistry } from "../content/content-registry.mjs"

const temp = await mkdtemp(path.join(tmpdir(), "article-browser-"))
try {
  async function load(source, name) {
    const outfile = path.join(temp, `${name}.mjs`)
    await build({
      entryPoints: [source], outfile, bundle: true, platform: "node", format: "esm", logLevel: "silent",
      plugins: [{ name: "raw", setup(bundler) {
        bundler.onResolve({ filter: /\?raw$/ }, args => ({ path: path.resolve(args.resolveDir, args.path.slice(0, -4)), namespace: "raw" }))
        bundler.onLoad({ filter: /.*/, namespace: "raw" }, async args => ({ contents: await readFile(args.path, "utf8"), loader: "text" }))
      } }],
    })
    return import(pathToFileURL(outfile).href)
  }
  const { matchesEssay, normalizeEssaySearch } = await load("src/essay-search.ts", "search")
  const { essayBodies } = await load("src/essay-search-data.ts", "bodies")
  const { galleryIndex, swipeDirection } = await load("src/components/gallery-navigation.ts", "gallery")
  const { readingProgress } = await load("src/reading-progress.ts", "reading-progress")
  assert.equal(readingProgress(0, 80, 2080, 800), 0)
  assert.equal(readingProgress(680, 80, 2080, 800), 0.5)
  assert.equal(readingProgress(1280, 80, 2080, 800), 1, "Finish when the last article text enters the viewport, before the footer")
  assert.equal(readingProgress(3000, 80, 2080, 800), 1)
  assert.equal(readingProgress(-100, 80, 2080, 800), 0)
  assert.equal(readingProgress(100, 80, 500, 800), 1, "A short article must not produce NaN or a negative range")
  assert.equal(readingProgress(680, 80, 3280, 800), 0.25, "Recalculate when images expand the article")
  const { cleanArticleUrl, articleLinkProps, formatArticleHtml } = await load("src/article-links.ts", "links")
  assert.equal(cleanArticleUrl("https://example.com/a?chapter=2&utm_source=chatgpt.com&utm_medium=referral#backup"), "https://example.com/a?chapter=2#backup")
  assert.equal(cleanArticleUrl("/read?UTM_SOURCE=ChatGPT&keep=a%2Bb#part"), "/read?keep=a%2Bb#part")
  assert.equal(cleanArticleUrl("https://example.com/?utm_source=chat%2Eopenai%2Ecom#one"), "https://example.com/#one")
  assert.equal(cleanArticleUrl("https://example.com/?utm_source=newsletter&x=1#two"), "https://example.com/?utm_source=newsletter&x=1#two")
  assert.equal(cleanArticleUrl("#same-page"), "#same-page")
  assert.deepEqual(articleLinkProps("/article?utm_source=chatgpt.com"), { href: "/article", target: "_blank", rel: "noopener noreferrer" })
  const linkedHtml = '<strong>Keep this wording.</strong> <a href="https://example.com/?page=2&amp;utm_source=chatgpt.com#one" target="_self" rel="opener">Read more</a>'
  assert.equal(formatArticleHtml(linkedHtml), '<strong>Keep this wording.</strong> <a href="https://example.com/?page=2#one" target="_blank" rel="noopener noreferrer">Read more</a>')
  assert.equal(formatArticleHtml("Plain text &amp; <em>emphasis</em>."), "Plain text &amp; <em>emphasis</em>.")
  const essays = contentRegistry.filter(e => e.status === "published" && e.locale === "en" && e.section === "core-research")
  for (const essay of essays) {
    assert.ok(essayBodies[essay.path]?.length > 100, `Full text missing: ${essay.title}`)
    assert.ok(matchesEssay(`${essay.title} ${essay.description} ${essayBodies[essay.path]}`, essay.title))
  }
  assert.equal(normalizeEssaySearch("  SÍNGLE—SIG! "), "single sig")
  assert.ok(matchesEssay("Bitcoin Core: encrypted backups", "BACKUP core"))
  assert.ok(matchesEssay("Any essay", ""))
  assert.ok(!matchesEssay("Any essay", "zzqnonexistent"))
  assert.ok(Object.values(essayBodies).some(body => matchesEssay(body, "GetStrongRandBytes")), "Body-only term must be searchable")
  assert.equal(galleryIndex(0, -1, 7), 6)
  assert.equal(galleryIndex(6, 1, 7), 0)
  assert.equal(galleryIndex(0, 1, 1), 0)
  assert.equal(swipeDirection(-140, 12), 1)
  assert.equal(swipeDirection(140, -12), -1)
  assert.equal(swipeDirection(20, 4), 0, "Tap / short movement must not navigate")
  assert.equal(swipeDirection(70, 120), 0, "Vertical scrolling must not navigate")
  console.log(`Verified full-text coverage for ${essays.length} essays, query matching, gallery navigation, article links and reading-progress boundaries.`)
} finally {
  await rm(temp, { recursive: true, force: true })
}
