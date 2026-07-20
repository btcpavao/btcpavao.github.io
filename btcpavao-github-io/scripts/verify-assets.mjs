import { access, readFile, readdir, stat } from "node:fs/promises"
import path from "node:path"

const root = new URL("../", import.meta.url)

const responsiveImages = [
  {
    full: "public/ai-ucenje-bitcoin-model-hero.webp",
    small: "public/ai-ucenje-bitcoin-model-hero-840.webp",
  },
  {
    full: "public/ai-workflow-hero.webp",
    small: "public/ai-workflow-hero-840.webp",
  },
  ...[
    "step-1-idea",
    "step-2-dictation",
    "step-3-chatgpt-editor",
    "step-4-codex-task",
    "step-5-system-reading",
    "step-6-review",
    "step-7-iteration",
  ].map((name) => ({
    full: `public/ai-workflow-${name}.webp`,
    small: `public/ai-workflow-${name}-840.webp`,
  })),
  {
    full: "public/bitcoin-kao-novac-cover.webp",
    small: "public/bitcoin-kao-novac-cover-724.webp",
  },
  {
    full: "public/bitcoin-savjetovanje-screenshot.webp",
    small: "public/bitcoin-savjetovanje-screenshot-800.webp",
  },
  {
    full: "public/dvadesetjedan-screenshot.webp",
    small: "public/dvadesetjedan-screenshot-800.webp",
  },
]

const additionalPublicAssets = [
  "public/bitcoin-savjetovanje-screenshot-1600.webp",
  "public/dvadesetjedan-screenshot-1600.webp",
  "public/pavao-profile.webp",
  "public/ai-workflow-og.jpg",
  "public/og-image-v2.jpg",
  "public/favicon.png",
  "public/apple-touch-icon.png",
  "public/feed.xml",
  "public/sitemap.xml",
  "public/robots.txt",
  "public/manifest.webmanifest",
]

const projectLogoAssets = [
  "public/project-logos/saifedean.avif",
  "public/project-logos/the-saif-house.png",
  "public/project-logos/practical-bitcoin-standard.png",
  "public/project-logos/twentyone-world.svg",
]

const movedSourceAssets = [
  "ai-ucenje-bitcoin-model-hero.png",
  "ai-workflow-hero.png",
  "ai-workflow-step-1-idea.png",
  "ai-workflow-step-2-dictation.png",
  "ai-workflow-step-3-chatgpt-editor.png",
  "ai-workflow-step-4-codex-task.png",
  "ai-workflow-step-5-system-reading.png",
  "ai-workflow-step-6-review.png",
  "ai-workflow-step-7-iteration.png",
  "bitcoin-kao-novac-cover.png",
  "bitcoin-savjetovanje-screenshot.png",
  "dvadesetjedan-screenshot.png",
  "favicon.svg",
  "og-image.svg",
  "og-image.png",
  "ai-workflow-og.png",
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

const appSource = await readFile(
  new URL("../src/App.tsx", import.meta.url),
  "utf8"
)
const cssSource = await readFile(
  new URL("../src/index.css", import.meta.url),
  "utf8"
)
const articleDataSource = await readFile(
  new URL("../src/article-data.ts", import.meta.url),
  "utf8"
)
const packageSource = await readFile(
  new URL("../package.json", import.meta.url),
  "utf8"
)
const indexHtml = await readFile(
  new URL("../index.html", import.meta.url),
  "utf8"
)
const distIndexHtml = await readFile(
  new URL("../dist/index.html", import.meta.url),
  "utf8"
)
const articleRouteHtml = await readFile(
  new URL(
    "../dist/hr/ai-u-praksi/jedan-covjek-ai-i-dva-mjeseca-rada/index.html",
    import.meta.url
  ),
  "utf8"
)
const workflowRouteHtml = await readFile(
  new URL(
    "../dist/hr/ai-u-praksi/od-diktata-do-objavljene-stranice/index.html",
    import.meta.url
  ),
  "utf8"
)
const learningRouteHtml = await readFile(
  new URL(
    "../dist/hr/ai-u-praksi/kako-sam-uz-ai-naucio-matematiku-bitcoin-trenda/index.html",
    import.meta.url
  ),
  "utf8"
)
const sourceText = `${appSource}\n${articleDataSource}`

function assertStructuredDataIsValid(html, label) {
  const blocks = [
    ...html.matchAll(
      /<script type="application\/ld\+json">\s*([\s\S]*?)\s*<\/script>/g
    ),
  ]

  assert(blocks.length > 0, `${label} has no structured data`)

  for (const block of blocks) {
    JSON.parse(block[1])
  }
}

let responsiveSavings = 0

for (const image of responsiveImages) {
  assert(await exists(image.full), `Missing full image: ${image.full}`)
  assert(await exists(image.small), `Missing responsive image: ${image.small}`)
  assert(
    await exists(`dist/${path.basename(image.full)}`),
    `Missing dist image: ${image.full}`
  )
  assert(
    await exists(`dist/${path.basename(image.small)}`),
    `Missing responsive dist image: ${image.small}`
  )
  assert(
    sourceText.includes(publicUrl(image.full)),
    `Source does not reference image: ${publicUrl(image.full)}`
  )
  assert(
    sourceText.includes(publicUrl(image.small)),
    `Source does not reference responsive image: ${publicUrl(image.small)}`
  )

  const fullBytes = await size(image.full)
  const smallBytes = await size(image.small)
  assert(
    smallBytes < fullBytes,
    `Responsive image is not smaller: ${image.small}`
  )
  responsiveSavings += fullBytes - smallBytes
}

for (const asset of additionalPublicAssets) {
  assert(await exists(asset), `Missing public asset: ${asset}`)
  assert(
    await exists(`dist/${path.basename(asset)}`),
    `Missing dist asset: ${asset}`
  )
}

for (const asset of projectLogoAssets) {
  const deployedPath = asset.replace(/^public\//, "")

  assert(await exists(asset), `Missing project logo: ${asset}`)
  assert(
    await exists(`dist/${deployedPath}`),
    `Missing project logo in dist: ${asset}`
  )
  assert(
    sourceText.includes(`/${deployedPath}`),
    `Source does not reference project logo: /${deployedPath}`
  )
  assert((await size(asset)) < 50_000, `Project logo exceeds 50 KB: ${asset}`)
}

for (const name of movedSourceAssets) {
  assert(
    !(await exists(`public/${name}`)),
    `Source asset still deploys: public/${name}`
  )
  assert(
    await exists(`asset-sources/image-originals/${name}`),
    `Moved source asset is missing: ${name}`
  )
  assert(
    !(await exists(`dist/${name}`)),
    `Source asset still exists in dist: ${name}`
  )
}

assert((await size("public/favicon.png")) < 100_000, "Favicon exceeds 100 KB")
assert(
  (await size("public/pavao-profile.webp")) < 50_000,
  "Local profile image exceeds 50 KB"
)

for (const html of [indexHtml, distIndexHtml]) {
  assert(
    html.includes(
      'rel="icon" type="image/png" sizes="192x192" href="/favicon.png"'
    ),
    "HTML does not use the optimized profile favicon"
  )
  assert(
    !html.includes("/favicon.svg"),
    "HTML still references the SVG favicon"
  )
  assert(
    html.includes('type="application/rss+xml"'),
    "HTML does not advertise the RSS feed"
  )
}

assert(
  distIndexHtml.includes(
    "Practical guidance for living on a Bitcoin standard."
  ),
  "Homepage was not prerendered"
)
assert(
  articleRouteHtml.includes("Postoji trenutak kada nova tehnologija"),
  "First article body was not prerendered"
)
assert(
  workflowRouteHtml.includes("Najveća promjena koju mi je AI donio"),
  "Workflow article body was not prerendered"
)
assert(
  learningRouteHtml.includes("Nedavno sam otvorio PDF od 24 stranice"),
  "Learning article body was not prerendered"
)
assert(
  workflowRouteHtml.includes('"@type": "BlogPosting"'),
  "Workflow route is missing BlogPosting structured data"
)
assert(
  workflowRouteHtml.includes('"@type": "BreadcrumbList"'),
  "Workflow route is missing breadcrumb structured data"
)
assert(
  workflowRouteHtml.includes("/ai-workflow-og.jpg"),
  "Workflow route is missing its article-specific social image"
)
assert(
  learningRouteHtml.includes("/ai-ucenje-bitcoin-model-hero.webp"),
  "Learning route is missing its article-specific social image"
)
assert(
  learningRouteHtml.includes('property="og:image:type" content="image/webp"'),
  "Learning route has the wrong social image type"
)
assert(
  (workflowRouteHtml.match(/property="og:locale"/g) ?? []).length === 1 &&
    workflowRouteHtml.includes('property="og:locale" content="hr_HR"'),
  "Workflow route has incorrect or duplicate Open Graph locale metadata"
)

assertStructuredDataIsValid(distIndexHtml, "Homepage")
assertStructuredDataIsValid(articleRouteHtml, "First article")
assertStructuredDataIsValid(workflowRouteHtml, "Workflow article")
assertStructuredDataIsValid(learningRouteHtml, "Learning article")

const entryScriptMatch = distIndexHtml.match(
  /<script type="module" crossorigin src="([^"]+)"><\/script>/
)
assert(entryScriptMatch, "dist/index.html does not reference an entry script")

const entryScriptRelativePath = `dist${entryScriptMatch[1]}`
const entryScript = await readFile(
  new URL(entryScriptRelativePath, root),
  "utf8"
)
const entryScriptBytes = await size(entryScriptRelativePath)
const jsAssetNames = (
  await readdir(new URL("../dist/assets/", import.meta.url))
).filter((name) => name.endsWith(".js"))
const lazyChunkSources = await Promise.all(
  jsAssetNames
    .filter((name) => !entryScriptRelativePath.endsWith(name))
    .map((name) =>
      readFile(new URL(`../dist/assets/${name}`, import.meta.url), "utf8")
    )
)
const articleBodyProbe = "Postoji trenutak kada nova tehnologija"
const learningArticleBodyProbe = "Nedavno sam otvorio PDF od 24 stranice"

assert(
  entryScriptBytes < 300_000,
  `Entry bundle is too large: ${entryScriptBytes} bytes`
)
assert(
  !entryScript.includes(articleBodyProbe),
  "Entry chunk includes the article body"
)
assert(
  !entryScript.includes(learningArticleBodyProbe),
  "Entry chunk includes the learning article body"
)
assert(
  lazyChunkSources.some((source) => source.includes(articleBodyProbe)),
  "Article body was not found in a lazy chunk"
)
assert(
  lazyChunkSources.some((source) => source.includes(learningArticleBodyProbe)),
  "Learning article body was not found in a lazy chunk"
)
assert(
  !packageSource.includes('"motion"'),
  "Motion runtime remains in package.json"
)
assert(
  !packageSource.includes("motionwind"),
  "Motionwind remains in package.json"
)
assert(
  (appSource.match(/relative isolate min-h-screen/g) ?? []).length === 3,
  "A page shell is missing its isolated stacking context"
)
assert(
  /\.page-atmosphere\s*\{\s*z-index:\s*-1;/.test(cssSource) &&
    /\.page-grid\s*\{\s*z-index:\s*-1;/.test(cssSource),
  "Decorative page layers can cover page content"
)
assert(
  /aria-label="Back to top"[\s\S]{0,220}<ArrowUp/.test(appSource) &&
    appSource.includes("text-foreground shadow-soft hover:bg-card"),
  "Back-to-top control is missing a visible foreground icon"
)

console.log(
  `Verified crawlable routes, ${responsiveImages.length} responsive image sets, and a ${entryScriptBytes}-byte entry bundle. Small image variants save up to ${responsiveSavings} bytes per matching viewport.`
)
