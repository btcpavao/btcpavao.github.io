import { createHash } from "node:crypto"
import { access, readFile, readdir, stat } from "node:fs/promises"
import path from "node:path"

const root = new URL("../", import.meta.url)

const responsiveImages = [
  ...Array.from({ length: 9 }, (_, index) => {
    const number = String(index + 2).padStart(2, "0")

    return {
      full: `public/bip39-wrong-thing-${number}.webp`,
      small: `public/bip39-wrong-thing-${number}-840.webp`,
    }
  }),
  {
    full: "public/bip39-wrong-thing-cover.webp",
    small: "public/bip39-wrong-thing-cover-840.webp",
  },
  ...Array.from({ length: 11 }, (_, index) => {
    const number = String(index + 1).padStart(2, "0")

    return {
      full: `public/bitcoin-core-entropija-${number}.webp`,
      small: `public/bitcoin-core-entropija-${number}-840.webp`,
    }
  }),
  ...Array.from({ length: 13 }, (_, index) => {
    const number = String(index + 1).padStart(2, "0")

    return {
      full: `public/long-road-bitcoin-core-${number}.webp`,
      small: `public/long-road-bitcoin-core-${number}-840.webp`,
    }
  }),
  {
    full: "public/long-road-bitcoin-core-cover.webp",
    small: "public/long-road-bitcoin-core-cover-840.webp",
  },
  {
    full: "public/homepage-hero-v2.webp",
    small: "public/homepage-hero-v2-840.webp",
  },
  {
    full: "public/bitcoin-core-entropija-cover-v2.webp",
    small: "public/bitcoin-core-entropija-cover-v2-840.webp",
  },
  {
    full: "public/ai-ucenje-bitcoin-model-hero.webp",
    small: "public/ai-ucenje-bitcoin-model-hero-840.webp",
  },
  {
    full: "public/ai-workflow-hero.webp",
    small: "public/ai-workflow-hero-840.webp",
  },
  {
    full: "public/value-for-value-visual.webp",
    small: "public/value-for-value-visual-840.webp",
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
  "public/bip39-wrong-thing-cover-share.jpg",
  "public/bitcoin-logo.svg",
  "public/bitcoin-core-entropija-cover-v2-share.jpg",
  "public/long-road-bitcoin-core-cover-share.jpg",
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
  "public/project-logos/twentyone-world-v2.svg",
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

const bitcoinCoreSourceAssets = Array.from({ length: 11 }, (_, index) => {
  const number = String(index + 1).padStart(2, "0")
  return `asset-sources/image-originals/bitcoin-core-entropija/${number}-`
})

const longRoadSourceAssets = [
  "01-the-wallet-maze.png",
  "02-convenience-versus-simplicity.png",
  "03-entropy-mixing-chamber.png",
  "04-glass-cathedral-of-code-review.png",
  "05-learning-core-one-question-at-a-time.png",
  "06-one-backup-many-future-addresses.png",
  "07-one-root-four-script-families.png",
  "08-two-valid-recovery-philosophies.png",
  "09-validator-versus-archivist.png",
  "10-core-as-foundation-of-offline-signing.png",
  "11-the-backbone.png",
  "12-from-product-shopping-to-understanding.png",
  "13-the-anchor.png",
  "cover-the-long-road-back-to-bitcoin-core.png",
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
const homepageSource = await readFile(
  new URL("../src/homepage.tsx", import.meta.url),
  "utf8"
)
const valueForValueSource = await readFile(
  new URL("../src/components/value-for-value.tsx", import.meta.url),
  "utf8"
)
const supportThankYouSource = await readFile(
  new URL("../src/support-thank-you.tsx", import.meta.url),
  "utf8"
)
const bitcoinCoreStartSource = await readFile(
  new URL("../src/bitcoin-core-start.tsx", import.meta.url),
  "utf8"
)
const cssSource = await readFile(
  new URL("../src/index.css", import.meta.url),
  "utf8"
)
const twentyOneLogoSource = await readFile(
  new URL("../public/project-logos/twentyone-world-v2.svg", import.meta.url),
  "utf8"
)
const articleDataSource = await readFile(
  new URL("../src/article-data.ts", import.meta.url),
  "utf8"
)
const bitcoinCoreArticleSource = await readFile(
  new URL("../src/bitcoin-core-article.txt", import.meta.url),
  "utf8"
)
const bitcoinCoreEnglishArticleSource = await readFile(
  new URL("../src/bitcoin-core-article-en.txt", import.meta.url),
  "utf8"
)
const longRoadArticleSource = await readFile(
  new URL("../src/long-road-back-to-bitcoin-core.md", import.meta.url),
  "utf8"
)
const longRoadModuleSource = await readFile(
  new URL("../src/long-road-article.tsx", import.meta.url),
  "utf8"
)
const bip39ArticleSource = await readFile(
  new URL("../src/bip39-wrong-thing-human-readable.md", import.meta.url),
  "utf8"
)
const bip39ArticleModuleSource = await readFile(
  new URL("../src/bip39-article.tsx", import.meta.url),
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
const sitemapSource = await readFile(
  new URL("../public/sitemap.xml", import.meta.url),
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
const hrHomeRouteHtml = await readFile(
  new URL("../dist/hr/index.html", import.meta.url),
  "utf8"
)
const bitcoinCoreSeriesRouteHtml = await readFile(
  new URL("../dist/hr/bitcoin-core/index.html", import.meta.url),
  "utf8"
)
const bitcoinCoreArticleRouteHtml = await readFile(
  new URL(
    "../dist/hr/bitcoin-core/kako-bitcoin-core-generira-entropiju-kada-napravimo-novi-wallet/index.html",
    import.meta.url
  ),
  "utf8"
)
const enBitcoinCoreSeriesRouteHtml = await readFile(
  new URL("../dist/en/bitcoin-core/index.html", import.meta.url),
  "utf8"
)
const bitcoinCoreStartRouteHtml = await readFile(
  new URL("../dist/en/bitcoin-core/start-here/index.html", import.meta.url),
  "utf8"
)
const enBitcoinCoreArticleRouteHtml = await readFile(
  new URL(
    "../dist/en/bitcoin-core/how-bitcoin-core-generates-entropy-when-you-create-a-new-wallet/index.html",
    import.meta.url
  ),
  "utf8"
)
const longRoadArticleRouteHtml = await readFile(
  new URL(
    "../dist/en/bitcoin-core/the-long-road-back-to-bitcoin-core/index.html",
    import.meta.url
  ),
  "utf8"
)
const bip39ArticleRouteHtml = await readFile(
  new URL(
    "../dist/en/bitcoin-core/bip39-made-the-wrong-thing-human-readable/index.html",
    import.meta.url
  ),
  "utf8"
)
const supportThankYouRouteHtml = await readFile(
  new URL("../dist/support/thank-you/index.html", import.meta.url),
  "utf8"
)
const sourceText = `${appSource}\n${homepageSource}\n${bitcoinCoreStartSource}\n${articleDataSource}\n${bitcoinCoreArticleSource}\n${bitcoinCoreEnglishArticleSource}\n${longRoadModuleSource}\n${bip39ArticleModuleSource}\n${valueForValueSource}\n${supportThankYouSource}`
const bitcoinCoreArticleHash = createHash("sha256")
  .update(bitcoinCoreArticleSource)
  .digest("hex")

assert(
  bitcoinCoreArticleHash ===
    "fe05d12e74b074d0576da5880edddfdf863890c7455fc0bebccb9b6f4c27568f",
  "Bitcoin Core article source changed from the approved text with the requested visual list removed"
)

const bitcoinCoreEnglishArticleHash = createHash("sha256")
  .update(bitcoinCoreEnglishArticleSource)
  .digest("hex")

assert(
  bitcoinCoreEnglishArticleHash ===
    "25e66995320956fcdaaed4d9c6cc9b4a0064c013bd44bd7caa418f040e931696",
  "English Bitcoin Core article source changed from the approved translation"
)

const longRoadArticleHash = createHash("sha256")
  .update(longRoadArticleSource)
  .digest("hex")

assert(
  longRoadArticleHash ===
    "20202cff2cf066b4fc8bb2afce90400484bab5b683f09464bd8a47d786694c0e",
  "The Long Road article source changed from the approved text"
)
assert(
  (longRoadArticleSource.match(/\[VISUAL PLACEHOLDER \d{2} \u2014/g) ?? [])
    .length === 13,
  "The Long Road article source does not contain exactly 13 visual placeholders"
)
assert(
  (bip39ArticleSource.match(/^!\[/gm) ?? []).length === 10 &&
    bip39ArticleSource.includes("Today a client sent me his Bitcoin wallet.") &&
    !/\bfriend\b/i.test(bip39ArticleSource),
  "The BIP39 article source is incomplete or still uses friend"
)

function bitcoinCoreArticleStructure(source) {
  const [, , ...bodyLines] = source.replace(/\r\n?/g, "\n").trim().split("\n")

  return bodyLines
    .join("\n")
    .trim()
    .split(/\n\s*\n/)
    .map((chunk) => chunk.trim())
    .filter(Boolean)
    .map((chunk) => {
      const visualMatch = chunk.match(/^\[\[VIZUAL (\d+)\]\]$/)

      if (visualMatch) return `visual:${visualMatch[1]}`
      if (/^\d+\.\s/.test(chunk)) return `heading:${chunk.match(/^\d+/)[0]}`
      if (chunk === "Zaključak" || chunk === "Conclusion") return "conclusion"

      return `copy:${chunk.split("\n").length}`
    })
}

assert(
  JSON.stringify(bitcoinCoreArticleStructure(bitcoinCoreArticleSource)) ===
    JSON.stringify(
      bitcoinCoreArticleStructure(bitcoinCoreEnglishArticleSource)
    ),
  "English and Croatian Bitcoin Core articles do not share the same block structure"
)
assert(
  sitemapSource.includes(
    "https://btcpavao.com/en/bitcoin-core/how-bitcoin-core-generates-entropy-when-you-create-a-new-wallet/"
  ) && sitemapSource.includes("<image:title>The SHA-512 mixer</image:title>"),
  "Sitemap is missing the English Bitcoin Core article or its translated image titles"
)
assert(
  sitemapSource.includes(
    "https://btcpavao.com/en/bitcoin-core/the-long-road-back-to-bitcoin-core/"
  ) &&
    sitemapSource.includes(
      "https://btcpavao.com/long-road-bitcoin-core-cover.webp"
    ) &&
    Array.from({ length: 13 }, (_, index) =>
      sitemapSource.includes(
        `https://btcpavao.com/long-road-bitcoin-core-${String(index + 1).padStart(2, "0")}.webp`
      )
    ).every(Boolean),
  "Sitemap is missing The Long Road article, cover, or one of its 13 inline images"
)
assert(
  sitemapSource.includes(
    "https://btcpavao.com/en/bitcoin-core/bip39-made-the-wrong-thing-human-readable/"
  ) &&
    sitemapSource.includes(
      "https://btcpavao.com/bip39-wrong-thing-cover.webp"
    ) &&
    Array.from({ length: 9 }, (_, index) =>
      sitemapSource.includes(
        `https://btcpavao.com/bip39-wrong-thing-${String(index + 2).padStart(2, "0")}.webp`
      )
    ).every(Boolean),
  "Sitemap is missing the BIP39 article, cover, or one of its inline images"
)

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

const bitcoinCoreSourceNames = await readdir(
  new URL(
    "../asset-sources/image-originals/bitcoin-core-entropija/",
    import.meta.url
  )
)
assert(
  bitcoinCoreSourceNames.filter((name) => name.endsWith(".png")).length === 12,
  "Bitcoin Core source image count is not 12"
)
for (const prefix of bitcoinCoreSourceAssets) {
  const filePrefix = path.basename(prefix)
  assert(
    bitcoinCoreSourceNames.some((name) => name.startsWith(filePrefix)),
    `Missing Bitcoin Core source image: ${filePrefix}`
  )
}
assert(
  bitcoinCoreSourceNames.includes("cover-hero-v2.png"),
  "Missing Bitcoin Core entropy cover source image"
)

const longRoadSourceNames = await readdir(
  new URL(
    "../asset-sources/image-originals/long-road-back-to-bitcoin-core/",
    import.meta.url
  )
)
assert(
  longRoadSourceNames.filter((name) => name.endsWith(".png")).length === 14,
  "The Long Road source image count is not 14"
)
for (const name of longRoadSourceAssets) {
  assert(
    longRoadSourceNames.includes(name),
    `Missing The Long Road source image: ${name}`
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
  distIndexHtml.includes("Build your Bitcoin life from first principles.") &&
    distIndexHtml.includes('src="/homepage-hero-v2.webp"') &&
    distIndexHtml.includes("/homepage-hero-v2-840.webp"),
  "Homepage was not prerendered"
)
assert(
  !distIndexHtml.includes(
    "Kako Bitcoin Core generira entropiju kada napravimo novi wallet"
  ) &&
    !distIndexHtml.includes(
      "Kako sam uz AI naučio matematiku Bitcoinova dugoročnog trenda"
    ) &&
    !distIndexHtml.includes(
      "Moj AI workflow: od diktata do objavljene stranice"
    ),
  "Homepage still includes Croatian writing"
)
assert(
  distIndexHtml.includes("The Long Road Back to Bitcoin Core"),
  "Homepage is missing The Long Road article"
)
assert(
  distIndexHtml.includes("BIP39 Made the Wrong Thing Human-Readable"),
  "Homepage is missing the BIP39 article"
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
  hrHomeRouteHtml.includes("Hrvatski tekstovi") &&
    hrHomeRouteHtml.includes("Bitcoin Core"),
  "Croatian hub was not prerendered"
)
assert(
  bitcoinCoreSeriesRouteHtml.includes(
    "Kako Bitcoin Core generira entropiju kada napravimo novi wallet"
  ) && bitcoinCoreSeriesRouteHtml.includes('src="/bitcoin-logo.svg"'),
  "Bitcoin Core series page was not prerendered"
)
assert(
  bitcoinCoreArticleRouteHtml.includes(
    "Kad u Bitcoin Coreu napraviš novi wallet"
  ),
  "Bitcoin Core article body was not prerendered"
)
assert(
  enBitcoinCoreSeriesRouteHtml.includes(
    "How Bitcoin Core Generates Entropy When You Create a New Wallet"
  ) &&
    enBitcoinCoreSeriesRouteHtml.includes('src="/bitcoin-logo.svg"') &&
    enBitcoinCoreSeriesRouteHtml.includes(
      "The Long Road Back to Bitcoin Core"
    ) &&
    enBitcoinCoreSeriesRouteHtml.includes(
      "BIP39 Made the Wrong Thing Human-Readable"
    ) &&
    enBitcoinCoreSeriesRouteHtml.includes(
      "English essays about Bitcoin Core, wallets, validation, and the security foundations of the Bitcoin system."
    ),
  "English Bitcoin Core series page is incomplete"
)
assert(
  bitcoinCoreStartRouteHtml.includes(
    "Your first exercise uses no real bitcoin."
  ) &&
    bitcoinCoreStartRouteHtml.includes("Official download and verification") &&
    bitcoinCoreStartRouteHtml.includes(
      'rel="canonical" href="https://btcpavao.com/en/bitcoin-core/start-here/"'
    ),
  "Bitcoin Core start page was not prerendered or has incomplete metadata"
)
assert(
  enBitcoinCoreArticleRouteHtml.includes(
    "When you create a new wallet in Bitcoin Core"
  ) &&
    distIndexHtml.includes(
      "How Bitcoin Core Generates Entropy When You Create a New Wallet"
    ),
  "English Bitcoin Core article or homepage card was not prerendered"
)
assert(
  longRoadArticleRouteHtml.includes(
    "For years, I was quietly searching for a better Bitcoin wallet."
  ) &&
    longRoadArticleRouteHtml.includes('aria-label="Back to top"') &&
    longRoadArticleRouteHtml.includes(">Contents</p>") &&
    longRoadArticleRouteHtml.includes(
      "https://checkout.opennode.com/p/5d3032e8-dc66-4e0f-9fbe-e523ea62dc05"
    ),
  "The Long Road article body or English navigation was not prerendered"
)
assert(
  supportThankYouRouteHtml.includes("Thank you for returning value.") &&
    supportThankYouRouteHtml.includes("Schedule a Value for Value call") &&
    supportThankYouRouteHtml.includes(
      "https://cal.com/btcpavao/introductory-call"
    ) &&
    supportThankYouRouteHtml.includes("mailto:pavao@hey.com") &&
    supportThankYouRouteHtml.includes("/value-for-value-visual.webp") &&
    supportThankYouRouteHtml.includes(
      '<meta name="robots" content="noindex,nofollow,noarchive" />'
    ) &&
    supportThankYouRouteHtml.includes(
      'rel="canonical" href="https://btcpavao.com/support/thank-you/"'
    ) &&
    !supportThankYouRouteHtml.includes("<form"),
  "Value for Value thank-you page is incomplete, indexable, or collects form data"
)
for (const [label, html] of [
  ["The Long Road article", longRoadArticleRouteHtml],
  ["BIP39 article", bip39ArticleRouteHtml],
  ["English entropy article", enBitcoinCoreArticleRouteHtml],
]) {
  assert(
    html.includes("Did this help you?") &&
      html.includes("Return value") &&
      html.includes("/value-for-value-visual-840.webp") &&
      (html.match(/Did this help you\?/g) ?? []).length === 1,
    `${label} is missing the reusable Value for Value block or renders it more than once`
  )
}
assert(
  bip39ArticleRouteHtml.includes(
    "Today a client sent me his Bitcoin wallet."
  ) &&
    !/\bfriend\b/i.test(bip39ArticleRouteHtml) &&
    bip39ArticleRouteHtml.includes('aria-label="Back to top"') &&
    bip39ArticleRouteHtml.includes(">Contents</p>"),
  "The BIP39 article body or English navigation was not prerendered"
)
assert(
  bip39ArticleRouteHtml.includes('src="/bip39-wrong-thing-cover.webp"') &&
    bip39ArticleRouteHtml.includes("/bip39-wrong-thing-cover-840.webp") &&
    Array.from({ length: 9 }, (_, index) => {
      const number = String(index + 2).padStart(2, "0")
      return (
        bip39ArticleRouteHtml.includes(`/bip39-wrong-thing-${number}.webp`) &&
        bip39ArticleRouteHtml.includes(`/bip39-wrong-thing-${number}-840.webp`)
      )
    }).every(Boolean),
  "The BIP39 article is missing its responsive cover or inline images"
)
assert(
  longRoadArticleRouteHtml.includes(
    'src="/long-road-bitcoin-core-cover.webp"'
  ) &&
    longRoadArticleRouteHtml.includes(
      "/long-road-bitcoin-core-cover-840.webp"
    ) &&
    longRoadArticleRouteHtml.includes(
      'href="/en/bitcoin-core/how-bitcoin-core-generates-entropy-when-you-create-a-new-wallet/">Bitcoin Core’s entropy generation</a>'
    ),
  "The Long Road cover or its contextual entropy article link is missing"
)
assert(
  !longRoadArticleRouteHtml.includes("VISUAL PLACEHOLDER") &&
    !longRoadArticleRouteHtml.includes("Image-generation prompt") &&
    !longRoadArticleRouteHtml.includes("Concept:"),
  "The Long Road article exposes editorial visual instructions"
)
assert(
  (longRoadArticleRouteHtml.match(/bitcoin-core-section-pictogram/g) ?? [])
    .length === 17 &&
    (longRoadArticleRouteHtml.match(/bitcoin-core-list/g) ?? []).length === 5 &&
    (longRoadArticleRouteHtml.match(/long-road-article-quote/g) ?? [])
      .length === 2 &&
    (longRoadArticleRouteHtml.match(/long-road-article-separator/g) ?? [])
      .length === 25 &&
    (longRoadArticleRouteHtml.match(/<strong>/g) ?? []).length === 2,
  "The Long Road article headings, lists, quotes, separators, or bold text were not rendered completely"
)
assert(
  (bitcoinCoreArticleRouteHtml.match(/bitcoin-core-section-pictogram/g) ?? [])
    .length === 24 &&
    bitcoinCoreArticleRouteHtml.includes("bitcoin-core-list") &&
    bitcoinCoreArticleRouteHtml.includes('aria-label="Natrag na vrh"'),
  "Bitcoin Core article formatting or navigation controls are incomplete"
)
assert(
  (enBitcoinCoreArticleRouteHtml.match(/bitcoin-core-section-pictogram/g) ?? [])
    .length === 24 &&
    enBitcoinCoreArticleRouteHtml.includes("bitcoin-core-list") &&
    enBitcoinCoreArticleRouteHtml.includes('aria-label="Back to top"') &&
    enBitcoinCoreArticleRouteHtml.includes("Croatian version") &&
    !enBitcoinCoreArticleRouteHtml.includes(
      "Kratki popis svih vizuala za članak"
    ),
  "English Bitcoin Core article formatting, translation link, or navigation controls are incomplete"
)
assert(
  (bitcoinCoreArticleSource.match(/\[\[VIZUAL \d+\]\]/g) ?? []).length === 11 &&
    !bitcoinCoreArticleSource.includes("— prompt]") &&
    !bitcoinCoreArticleSource.includes("Prompt:"),
  "Bitcoin Core article source does not contain exactly 11 clean visual markers"
)
assert(
  (bitcoinCoreEnglishArticleSource.match(/\[\[VIZUAL \d+\]\]/g) ?? [])
    .length === 11 &&
    (bitcoinCoreEnglishArticleSource.match(/^\d+\.\s/gm) ?? []).length === 23 &&
    bitcoinCoreEnglishArticleSource.includes("\nConclusion\n") &&
    !bitcoinCoreEnglishArticleSource.includes("VISUAL PLACEHOLDER"),
  "English Bitcoin Core article source does not preserve the approved structure"
)
for (let index = 1; index <= 11; index += 1) {
  const number = String(index).padStart(2, "0")
  assert(
    bitcoinCoreArticleRouteHtml.includes(
      `/bitcoin-core-entropija-${number}.webp`
    ),
    `Bitcoin Core article is missing visual ${number}`
  )
  assert(
    enBitcoinCoreArticleRouteHtml.includes(
      `/bitcoin-core-entropija-${number}.webp`
    ),
    `English Bitcoin Core article is missing visual ${number}`
  )
}
for (let index = 1; index <= 13; index += 1) {
  const number = String(index).padStart(2, "0")
  assert(
    (
      longRoadArticleRouteHtml.match(
        new RegExp(`/long-road-bitcoin-core-${number}\\.webp`, "g")
      ) ?? []
    ).length === 2 &&
      longRoadArticleRouteHtml.includes(
        `/long-road-bitcoin-core-${number}-840.webp`
      ),
    `The Long Road article is missing responsive visual ${number} or repeats it`
  )
}
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
  bitcoinCoreArticleRouteHtml.includes(
    'rel="canonical" href="https://btcpavao.com/hr/bitcoin-core/kako-bitcoin-core-generira-entropiju-kada-napravimo-novi-wallet/"'
  ) &&
    bitcoinCoreArticleRouteHtml.includes(
      'property="article:section" content="Bitcoin Core"'
    ) &&
    bitcoinCoreArticleRouteHtml.includes(
      "/bitcoin-core-entropija-cover-v2-share.jpg"
    ) &&
    bitcoinCoreArticleRouteHtml.includes(
      "/bitcoin-core-entropija-cover-v2.webp"
    ),
  "Bitcoin Core article metadata is incomplete"
)
assert(
  enBitcoinCoreArticleRouteHtml.includes('<html lang="en">') &&
    enBitcoinCoreArticleRouteHtml.includes(
      'rel="canonical" href="https://btcpavao.com/en/bitcoin-core/how-bitcoin-core-generates-entropy-when-you-create-a-new-wallet/"'
    ) &&
    enBitcoinCoreArticleRouteHtml.includes(
      'property="og:locale" content="en_US"'
    ) &&
    enBitcoinCoreArticleRouteHtml.includes('"inLanguage": "en-US"') &&
    enBitcoinCoreArticleRouteHtml.includes(
      'hreflang="hr" href="https://btcpavao.com/hr/bitcoin-core/kako-bitcoin-core-generira-entropiju-kada-napravimo-novi-wallet/"'
    ) &&
    enBitcoinCoreArticleRouteHtml.includes(
      'hreflang="en" href="https://btcpavao.com/en/bitcoin-core/how-bitcoin-core-generates-entropy-when-you-create-a-new-wallet/"'
    ) &&
    enBitcoinCoreArticleRouteHtml.includes(
      'hreflang="x-default" href="https://btcpavao.com/en/bitcoin-core/how-bitcoin-core-generates-entropy-when-you-create-a-new-wallet/"'
    ) &&
    bitcoinCoreArticleRouteHtml.includes("English version"),
  "English Bitcoin Core article language metadata or reciprocal links are incomplete"
)
assert(
  longRoadArticleRouteHtml.includes('<html lang="en">') &&
    longRoadArticleRouteHtml.includes(
      'rel="canonical" href="https://btcpavao.com/en/bitcoin-core/the-long-road-back-to-bitcoin-core/"'
    ) &&
    longRoadArticleRouteHtml.includes('property="og:locale" content="en_US"') &&
    longRoadArticleRouteHtml.includes('"inLanguage": "en-US"') &&
    longRoadArticleRouteHtml.includes('"@type": "BlogPosting"') &&
    longRoadArticleRouteHtml.includes('"@type": "BreadcrumbList"') &&
    longRoadArticleRouteHtml.includes(
      "/long-road-bitcoin-core-cover-share.jpg"
    ) &&
    longRoadArticleRouteHtml.includes(
      'property="og:image:width" content="1774"'
    ) &&
    longRoadArticleRouteHtml.includes(
      'property="og:image:height" content="887"'
    ) &&
    !longRoadArticleRouteHtml.includes('rel="alternate" hreflang='),
  "The Long Road article metadata is incomplete or has an incorrect hreflang link"
)
assert(
  bip39ArticleRouteHtml.includes('<html lang="en">') &&
    bip39ArticleRouteHtml.includes(
      'rel="canonical" href="https://btcpavao.com/en/bitcoin-core/bip39-made-the-wrong-thing-human-readable/"'
    ) &&
    bip39ArticleRouteHtml.includes('property="og:locale" content="en_US"') &&
    bip39ArticleRouteHtml.includes('"inLanguage": "en-US"') &&
    bip39ArticleRouteHtml.includes('"@type": "BlogPosting"') &&
    bip39ArticleRouteHtml.includes('"@type": "BreadcrumbList"') &&
    bip39ArticleRouteHtml.includes(
      "/bip39-wrong-thing-cover-share.jpg?v=20260821"
    ) &&
    bip39ArticleRouteHtml.includes(
      'property="og:image:secure_url" content="https://btcpavao.com/bip39-wrong-thing-cover-share.jpg?v=20260821"'
    ) &&
    bip39ArticleRouteHtml.includes(
      'name="twitter:image:src" content="https://btcpavao.com/bip39-wrong-thing-cover-share.jpg?v=20260821"'
    ) &&
    bip39ArticleRouteHtml.includes(
      'property="og:image:width" content="1200"'
    ) &&
    bip39ArticleRouteHtml.includes('property="og:image:height" content="630"'),
  "The BIP39 article metadata is incomplete"
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
assertStructuredDataIsValid(hrHomeRouteHtml, "Croatian hub")
assertStructuredDataIsValid(bitcoinCoreSeriesRouteHtml, "Bitcoin Core series")
assertStructuredDataIsValid(bitcoinCoreArticleRouteHtml, "Bitcoin Core article")
assertStructuredDataIsValid(
  enBitcoinCoreSeriesRouteHtml,
  "English Bitcoin Core series"
)
assertStructuredDataIsValid(
  bitcoinCoreStartRouteHtml,
  "Bitcoin Core start page"
)
assertStructuredDataIsValid(
  enBitcoinCoreArticleRouteHtml,
  "English Bitcoin Core article"
)
assertStructuredDataIsValid(longRoadArticleRouteHtml, "The Long Road article")
assertStructuredDataIsValid(bip39ArticleRouteHtml, "The BIP39 article")

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
const bitcoinCoreArticleBodyProbe = "Kad u Bitcoin Coreu napraviš novi wallet"
const bitcoinCoreEnglishArticleBodyProbe =
  "When you create a new wallet in Bitcoin Core"
const longRoadArticleBodyProbe =
  "For years, I was quietly searching for a better Bitcoin wallet."
const bip39ArticleBodyProbe = "Today a client sent me his Bitcoin wallet."

assert(
  entryScriptBytes < 335_000,
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
  !entryScript.includes(bitcoinCoreArticleBodyProbe),
  "Entry chunk includes the Bitcoin Core article body"
)
assert(
  !entryScript.includes(bitcoinCoreEnglishArticleBodyProbe),
  "Entry chunk includes the English Bitcoin Core article body"
)
assert(
  !entryScript.includes(longRoadArticleBodyProbe),
  "Entry chunk includes The Long Road article body"
)
assert(
  !entryScript.includes(bip39ArticleBodyProbe),
  "Entry chunk includes the BIP39 article body"
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
  lazyChunkSources.some((source) =>
    source.includes(bitcoinCoreArticleBodyProbe)
  ),
  "Bitcoin Core article body was not found in a lazy chunk"
)
assert(
  lazyChunkSources.some((source) =>
    source.includes(bitcoinCoreEnglishArticleBodyProbe)
  ),
  "English Bitcoin Core article body was not found in a lazy chunk"
)
assert(
  lazyChunkSources.some((source) => source.includes(longRoadArticleBodyProbe)),
  "The Long Road article body was not found in a lazy chunk"
)
assert(
  lazyChunkSources.some((source) => source.includes(bip39ArticleBodyProbe)),
  "The BIP39 article body was not found in a lazy chunk"
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
  (appSource.match(/relative isolate min-h-screen/g) ?? []).length === 2 &&
    homepageSource.includes("home-page min-h-screen") &&
    bitcoinCoreStartSource.includes("min-h-screen bg-background"),
  "A page shell is missing its isolated stacking context"
)
assert(
  /\.page-atmosphere\s*\{\s*z-index:\s*-1;/.test(cssSource) &&
    /\.page-grid\s*\{\s*z-index:\s*-1;/.test(cssSource),
  "Decorative page layers can cover page content"
)
assert(
  /aria-label="Back to top"[\s\S]{0,240}<ArrowUp/.test(sourceText),
  "Back-to-top control is missing a visible foreground icon"
)
assert(
  homepageSource.includes("project-logos/saifedean.avif") &&
    homepageSource.includes("project-logos/twentyone-world-v2.svg"),
  "Homepage project logos are missing"
)
assert(
  !/<rect\b/.test(twentyOneLogoSource),
  "TwentyOne logo still contains its rectangular canvas"
)
assert(
  homepageSource.includes('src="/pavao-profile.webp"') &&
    homepageSource.includes('alt="Pavao"'),
  "Homepage profile image or alt text is missing"
)

console.log(
  `Verified crawlable routes, ${responsiveImages.length} responsive image sets, and a ${entryScriptBytes}-byte entry bundle. Small image variants save up to ${responsiveSavings} bytes per matching viewport.`
)
