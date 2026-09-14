import assert from "node:assert/strict"
import { readFile, readdir, mkdtemp, rm, stat } from "node:fs/promises"
import path from "node:path"
import { tmpdir } from "node:os"
import { pathToFileURL } from "node:url"
import { build } from "esbuild"
import { contentRegistry, SITE_URL } from "../content/content-registry.mjs"

// Inspect the prerendered artifact crawlers receive, including bookmarks.
const dist = path.resolve("dist")
const decode = (s) => s.replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#x27;|&#39;/g, "'").replace(/&lt;/g, "<").replace(/&gt;/g, ">")
const attrs = (html, name) => [...html.matchAll(new RegExp(`\\b${name}="([^"]*)"`, "g"))].map((m) => decode(m[1]))
const htmlFiles = (await readdir(dist, { recursive: true })).filter((p) => p.endsWith(".html"))
const documents = new Map(await Promise.all(htmlFiles.map(async (p) => [p, await readFile(path.join(dist, p), "utf8")])))
const temporary = await mkdtemp(path.join(tmpdir(), "site-links-"))
try {
  const outfile = path.join(temporary, "curriculum.mjs")
  await build({ entryPoints: ["src/bitcoin-core-curriculum-player-en-data.ts"], outfile, bundle: true, platform: "node", format: "esm", logLevel: "silent" })
  const { curriculumLessons } = await import(pathToFileURL(outfile).href)
  const lessonSlugs = new Set(curriculumLessons.map((e) => e.lesson.slug))
  const failures = []
  let links = 0
  async function check(href, from) {
    if (!href || /^(mailto:|tel:|bitcoin:|lightning:|data:|javascript:)/i.test(href)) return
    const url = new URL(href, SITE_URL + from)
    const sourcePrefix = "https://github.com/btcpavao/btcpavao.github.io/blob/main/"
    if (url.href.startsWith(sourcePrefix)) {
      const source = decodeURIComponent(url.pathname.split("/blob/main/")[1])
      try { await stat(path.resolve("..", source)) }
      catch { failures.push(`${from} → ${href}: missing repository source`) }
    }
    if (url.origin !== SITE_URL) return
    // GitHub Pages serves this deliberate noindex canonical through 404.html.
    if (from === "/404.html" && url.pathname === "/404/") return
    links++
    const relative = decodeURIComponent(url.pathname).slice(1)
    let file = relative || "index.html"
    try {
      if ((await stat(path.join(dist, file))).isDirectory()) file = path.posix.join(file, "index.html")
      await stat(path.join(dist, file))
    } catch {
      failures.push(`${from} → ${href}: missing route/file`)
      return
    }
    const fragment = decodeURIComponent(url.hash.slice(1))
    if (!fragment) return
    if (url.pathname === "/en/bitcoin-core/self-custody/" && fragment.startsWith("lesson/")) {
      if (!lessonSlugs.has(fragment.slice(7))) failures.push(`${from} → ${href}: unknown lesson`)
    } else if (documents.has(file) && !attrs(documents.get(file), "id").includes(fragment)) {
      failures.push(`${from} → ${href}: missing anchor`)
    }
  }
  for (const [file, html] of documents) {
    const route = "/" + file.replace(/index\.html$/, "")
    for (const href of attrs(html, "href")) await check(href, route)
  }
  for (const href of [...(await readFile("dist/llms.txt", "utf8")).matchAll(/\]\(([^)]+)\)/g)].map((m) => m[1])) await check(href, "/llms.txt")
  // Lessons beyond the initial prerender are interactive; inspect their link data too.
  function collect(value) {
    if (typeof value === "string") {
      const links = [...value.matchAll(/\]\((\/[^)]+)\)/g)].map((m) => m[1])
      if (value.startsWith("/") && !value.includes(" ")) links.push(value)
      return links
    }
    if (value && typeof value === "object") return Object.values(value).flatMap(collect)
    return []
  }
  for (const href of collect(curriculumLessons)) await check(href, "/en/bitcoin-core/self-custody/")
  assert.deepEqual([...new Set(failures)], [], "Broken production links")

  const sitemap = await readFile("dist/sitemap.xml", "utf8")
  const published = contentRegistry.filter((e) => e.status === "published")
  for (const entry of published) {
    const html = documents.get(entry.path.slice(1) + "index.html")
    assert.ok(html, `Missing prerender: ${entry.path}`)
    assert.equal(decode(html.match(/<title>(.*?)<\/title>/s)?.[1] ?? ""), entry.title, entry.path)
    const meta = [...html.matchAll(/<meta\b[^>]*>/g)].map((m) => m[0])
    for (const key of ['name="description"', 'property="og:description"', 'name="twitter:description"']) {
      assert.equal(attrs(meta.find((tag) => tag.includes(key)) ?? "", "content")[0], entry.description, `${entry.path} ${key}`)
    }
    assert.ok(html.includes(`rel="canonical" href="${SITE_URL}${entry.path}"`), `Canonical: ${entry.path}`)
    if (entry.indexable) {
      const block = [...sitemap.matchAll(/<url>(.*?)<\/url>/gs)].find((m) => m[1].includes(`<loc>${SITE_URL}${entry.path}</loc>`))?.[1]
      assert.ok(block?.includes(`<lastmod>${entry.updatedAt}</lastmod>`), `Sitemap lastmod: ${entry.path}`)
    }
  }
  console.log(`Verified ${links} internal links across ${documents.size} HTML files and llms.txt, ${lessonSlugs.size} lesson destinations, and registry metadata/sitemap for ${published.length} public routes.`)
} finally {
  await rm(temporary, { recursive: true, force: true })
}
