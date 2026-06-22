import { access, readFile, readdir, stat } from "node:fs/promises"
import path from "node:path"

const root = new URL("../", import.meta.url)
const appSourcePath = new URL("../src/App.tsx", import.meta.url)
const articleDataPath = new URL("../src/article-data.ts", import.meta.url)
const indexHtmlPath = new URL("../index.html", import.meta.url)
const distIndexPath = new URL("../dist/index.html", import.meta.url)

const imagePairs = [
  {
    fallback: "public/ai-workflow-hero.png",
    webp: "public/ai-workflow-hero.webp",
  },
  {
    fallback: "public/bitcoin-kao-novac-cover.png",
    webp: "public/bitcoin-kao-novac-cover.webp",
  },
  {
    fallback: "public/bitcoin-savjetovanje-screenshot.png",
    webp: "public/bitcoin-savjetovanje-screenshot.webp",
  },
  {
    fallback: "public/dvadesetjedan-screenshot.png",
    webp: "public/dvadesetjedan-screenshot.webp",
  },
]

const movedPublicAssets = [
  {
    oldPath: "public/background-subtle.jpg",
    sourcePath: "asset-sources/public-unused/background-subtle.jpg",
  },
  {
    oldPath: "public/vite.svg",
    sourcePath: "asset-sources/public-unused/vite.svg",
  },
]

async function exists(relativePath) {
  try {
    await access(new URL(relativePath, root))
    return true
  } catch {
    return false
  }
}

async function size(relativePath) {
  return (await stat(new URL(relativePath, root))).size
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message)
  }
}

function publicUrl(relativePath) {
  return `/${path.basename(relativePath)}`
}

const appSource = await readFile(appSourcePath, "utf8")
const articleDataSource = await readFile(articleDataPath, "utf8")
const sourceText = `${appSource}\n${articleDataSource}`
const indexHtml = await readFile(indexHtmlPath, "utf8")
const distIndexHtml = await readFile(distIndexPath, "utf8")

let totalFallbackBytes = 0
let totalWebpBytes = 0

for (const pair of imagePairs) {
  assert(await exists(pair.fallback), `Missing fallback image: ${pair.fallback}`)
  assert(await exists(pair.webp), `Missing WebP image: ${pair.webp}`)

  const fallbackBytes = await size(pair.fallback)
  const webpBytes = await size(pair.webp)
  totalFallbackBytes += fallbackBytes
  totalWebpBytes += webpBytes

  assert(
    webpBytes < fallbackBytes,
    `WebP is not smaller than fallback: ${pair.webp}`
  )
  assert(
    sourceText.includes(publicUrl(pair.fallback)),
    `Source does not reference fallback URL: ${publicUrl(pair.fallback)}`
  )
  assert(
    sourceText.includes(publicUrl(pair.webp)),
    `Source does not reference WebP URL: ${publicUrl(pair.webp)}`
  )
  assert(
    appSource.includes('type="image/webp"'),
    "App source does not include WebP source type"
  )
  assert(await exists(`dist/${path.basename(pair.fallback)}`), `Missing dist fallback: ${pair.fallback}`)
  assert(await exists(`dist/${path.basename(pair.webp)}`), `Missing dist WebP: ${pair.webp}`)
}

for (const asset of movedPublicAssets) {
  assert(
    !(await exists(asset.oldPath)),
    `Unused asset still exists in public: ${asset.oldPath}`
  )
  assert(
    await exists(asset.sourcePath),
    `Moved source asset is missing: ${asset.sourcePath}`
  )
  assert(
    !(await exists(`dist/${path.basename(asset.oldPath)}`)),
    `Unused asset still exists in dist: ${asset.oldPath}`
  )
}

assert(
  indexHtml.includes('rel="icon" type="image/svg+xml" href="/favicon.svg"'),
  "index.html does not prefer SVG favicon"
)
assert(
  indexHtml.includes('rel="alternate icon" type="image/png" href="/favicon.png"'),
  "index.html does not retain PNG favicon fallback"
)
assert(
  distIndexHtml.includes('rel="icon" type="image/svg+xml" href="/favicon.svg"'),
  "dist/index.html does not prefer SVG favicon"
)


const entryScriptMatch = distIndexHtml.match(
  /<script type="module" crossorigin src="([^"]+)"><\/script>/
)
assert(entryScriptMatch, "dist/index.html does not reference an entry script")

const entryScriptRelativePath = `dist${entryScriptMatch[1]}`
const entryScript = await readFile(new URL(entryScriptRelativePath, root), "utf8")
const jsAssetNames = (await readdir(new URL("../dist/assets/", import.meta.url)))
  .filter((name) => name.endsWith(".js"))
const lazyChunkSources = await Promise.all(
  jsAssetNames
    .filter((name) => !entryScriptRelativePath.endsWith(name))
    .map((name) => readFile(new URL(`../dist/assets/${name}`, import.meta.url), "utf8"))
)
const articleBodyProbe = "Postoji trenutak kada nova tehnologija"
assert(
  !entryScript.includes(articleBodyProbe),
  "Entry chunk still includes the article body content"
)
assert(
  lazyChunkSources.some((source) => source.includes(articleBodyProbe)),
  "Article body content was not found in a lazy chunk"
)

const savings = totalFallbackBytes - totalWebpBytes
console.log(
  `Verified ${imagePairs.length} WebP image pairs. Runtime image payload can drop from ${totalFallbackBytes} bytes to ${totalWebpBytes} bytes, saving ${savings} bytes when WebP is used.`
)
