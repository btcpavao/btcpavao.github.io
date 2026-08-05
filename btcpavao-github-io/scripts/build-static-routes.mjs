import { mkdir, readFile, writeFile } from "node:fs/promises"

import { renderPage } from "../dist-ssr/entry-server.js"

const siteUrl = "https://btcpavao.com"
const personId = `${siteUrl}/#person`
const websiteId = `${siteUrl}/#website`
const hrUrl = `${siteUrl}/hr/`
const seriesUrl = `${siteUrl}/hr/ai-u-praksi/`
const seriesId = `${seriesUrl}#collection`
const bitcoinCoreSeriesUrl = `${siteUrl}/hr/bitcoin-core/`
const bitcoinCoreSeriesId = `${bitcoinCoreSeriesUrl}#collection`
const enBitcoinCoreSeriesUrl = `${siteUrl}/en/bitcoin-core/`
const enBitcoinCoreSeriesId = `${enBitcoinCoreSeriesUrl}#collection`
const enBitcoinCoreArticleUrl = `${enBitcoinCoreSeriesUrl}how-bitcoin-core-generates-entropy-when-you-create-a-new-wallet/`
const longRoadArticleUrl = `${enBitcoinCoreSeriesUrl}the-long-road-back-to-bitcoin-core/`

const homeRoute = {
  appPath: "/",
  routeUrl: `${siteUrl}/`,
}

const routes = [
  {
    appPath: "/hr/",
    routePath: "hr",
    routeUrl: hrUrl,
    title: "Hrvatski tekstovi | Pavao Pahljina",
    collectionName: "Hrvatski tekstovi",
    description:
      "Hrvatski tekstovi Pavaoa Pahljine o Bitcoinu, Bitcoin Coreu i praktičnoj primjeni umjetne inteligencije.",
    ogDescription:
      "Hrvatski tekstovi o Bitcoinu, Bitcoin Coreu i praktičnoj primjeni umjetne inteligencije.",
    type: "website",
    image: `${siteUrl}/og-image-v2.jpg`,
    imageAlt: "Pavao Pahljina, Bitcoin Standard Advisor",
    imageWidth: 1200,
    imageHeight: 630,
    breadcrumbParents: [],
    about: ["Bitcoin", "Bitcoin Core", "Umjetna inteligencija"],
  },
  {
    appPath: "/hr/ai-u-praksi/",
    routePath: "hr/ai-u-praksi",
    routeUrl: seriesUrl,
    title: "AI u praksi | Pavao Pahljina",
    description:
      "Osobne bilješke o tome kako koristim AI za pisanje, knjige, web stranice, agente, automatizaciju i svakodnevni rad.",
    ogDescription:
      "Kako jedan generalist koristi AI da ideje pretvori u tekstove, knjige, web stranice i stvarne poslovne sustave.",
    type: "website",
    image: `${siteUrl}/og-image-v2.jpg`,
    imageAlt: "Pavao Pahljina, Bitcoin Standard Advisor",
    imageWidth: 1200,
    imageHeight: 630,
    collectionName: "AI u praksi",
    breadcrumbParents: [{ name: "Hrvatski tekstovi", item: hrUrl }],
    about: ["Umjetna inteligencija", "AI workflow", "Codex", "ChatGPT"],
  },
  {
    appPath: "/hr/ai-u-praksi/jedan-covjek-ai-i-dva-mjeseca-rada/",
    routePath: "hr/ai-u-praksi/jedan-covjek-ai-i-dva-mjeseca-rada",
    routeUrl: `${siteUrl}/hr/ai-u-praksi/jedan-covjek-ai-i-dva-mjeseca-rada/`,
    title: "Jedan čovjek, AI i dva mjeseca rada",
    headline: "Jedan čovjek, AI i dva mjeseca rada",
    description:
      "Osobni osvrt na to kako sam uz diktiranje, ChatGPT i Codex u manje od dva mjeseca dovršio knjigu, podigao web stranice i promijenio vlastiti način rada.",
    ogDescription:
      "Kako AI u praksi mijenja rad jednog generalista: od diktiranja u šetnji do knjige, web stranica, agenata i automatizacije.",
    type: "article",
    publishedDate: "2026-06-12",
    sectionName: "AI u praksi",
    sectionId: seriesId,
    articleTag: "AI workflow",
    breadcrumbParents: [
      { name: "Hrvatski tekstovi", item: hrUrl },
      { name: "AI u praksi", item: seriesUrl },
    ],
    image: `${siteUrl}/ai-workflow-og.jpg`,
    imageAlt:
      "Laptop, mobitel, bilježnica i rukopis na radnom stolu prikazuju AI workflow.",
    imageWidth: 1200,
    imageHeight: 630,
  },
  {
    appPath: "/hr/ai-u-praksi/od-diktata-do-objavljene-stranice/",
    routePath: "hr/ai-u-praksi/od-diktata-do-objavljene-stranice",
    routeUrl: `${siteUrl}/hr/ai-u-praksi/od-diktata-do-objavljene-stranice/`,
    title: "Moj AI workflow: od diktata do objavljene stranice",
    headline: "Moj AI workflow: od diktata do objavljene stranice",
    description:
      "Kako koristim diktiranje, transkripciju, ChatGPT i Codex da ideju pretvorim u članak, vodič, knjigu ili web stranicu.",
    ogDescription:
      "Praktičan prikaz procesa od ideje izgovorene u šetnji do sadržaja ili stranice spremne za objavu.",
    type: "article",
    publishedDate: "2026-06-25",
    sectionName: "AI u praksi",
    sectionId: seriesId,
    articleTag: "AI workflow",
    breadcrumbParents: [
      { name: "Hrvatski tekstovi", item: hrUrl },
      { name: "AI u praksi", item: seriesUrl },
    ],
    image: `${siteUrl}/ai-workflow-og.jpg`,
    imageAlt:
      "Laptop, mobitel, bilježnica i rukopis na radnom stolu prikazuju AI workflow.",
    imageWidth: 1200,
    imageHeight: 630,
  },
  {
    appPath: "/hr/ai-u-praksi/kako-sam-uz-ai-naucio-matematiku-bitcoin-trenda/",
    routePath: "hr/ai-u-praksi/kako-sam-uz-ai-naucio-matematiku-bitcoin-trenda",
    routeUrl: `${siteUrl}/hr/ai-u-praksi/kako-sam-uz-ai-naucio-matematiku-bitcoin-trenda/`,
    title: "Kako sam uz AI naučio matematiku Bitcoinova dugoročnog trenda",
    headline: "Kako sam uz AI naučio matematiku Bitcoinova dugoročnog trenda",
    description:
      "Kako sam uz AI korak po korak naučio matematiku Bitcoin Wave Modela, provjerio njegove granice i znanje pretvorio u graf i H-time kalkulator.",
    ogDescription:
      "Od PDF-a koji nisam razumio do javnog grafa i H-time kalkulatora: konkretan primjer AI-a kao učitelja, istraživača i alata za izgradnju.",
    type: "article",
    publishedDate: "2026-07-17",
    sectionName: "AI u praksi",
    sectionId: seriesId,
    articleTag: "AI učenje",
    breadcrumbParents: [
      { name: "Hrvatski tekstovi", item: hrUrl },
      { name: "AI u praksi", item: seriesUrl },
    ],
    image: `${siteUrl}/ai-ucenje-bitcoin-model-hero.webp`,
    imageType: "image/webp",
    imageWidth: 1672,
    imageHeight: 941,
    imageAlt:
      "Radni stol s matematičkim bilješkama, grafovima, bilježnicom i laptopom s prikazom Bitcoinove cijene",
    heroImage: "/ai-ucenje-bitcoin-model-hero.webp",
    heroImageSrcSet:
      "/ai-ucenje-bitcoin-model-hero-840.webp 840w, /ai-ucenje-bitcoin-model-hero.webp 1672w",
    keywords: [
      "AI učenje",
      "Bitcoin Wave Model",
      "Bitcoin matematika",
      "ChatGPT",
      "Codex",
    ],
  },
  {
    appPath: "/hr/bitcoin-core/",
    routePath: "hr/bitcoin-core",
    routeUrl: bitcoinCoreSeriesUrl,
    title: "Bitcoin Core | Pavao Pahljina",
    collectionName: "Bitcoin Core",
    description:
      "Hrvatski tekstovi o Bitcoin Coreu, walletima, validaciji i sigurnosnim temeljima Bitcoin sustava.",
    ogDescription:
      "Hrvatski tekstovi o Bitcoin Coreu, walletima, validaciji i sigurnosnim temeljima Bitcoin sustava.",
    type: "website",
    image: `${siteUrl}/bitcoin-core-entropija-og.jpg`,
    imageAlt:
      "Kriptografski proces nastanka Bitcoin Core walleta u mediteranskom okruženju.",
    imageWidth: 1200,
    imageHeight: 630,
    breadcrumbParents: [{ name: "Hrvatski tekstovi", item: hrUrl }],
    about: ["Bitcoin Core", "Bitcoin wallet", "Bitcoin sigurnost"],
    alternates: {
      hr: bitcoinCoreSeriesUrl,
      en: enBitcoinCoreSeriesUrl,
      xDefault: enBitcoinCoreSeriesUrl,
    },
  },
  {
    appPath:
      "/hr/bitcoin-core/kako-bitcoin-core-generira-entropiju-kada-napravimo-novi-wallet/",
    routePath:
      "hr/bitcoin-core/kako-bitcoin-core-generira-entropiju-kada-napravimo-novi-wallet",
    routeUrl: `${bitcoinCoreSeriesUrl}kako-bitcoin-core-generira-entropiju-kada-napravimo-novi-wallet/`,
    title: "Kako Bitcoin Core generira entropiju kada napravimo novi wallet",
    headline: "Kako Bitcoin Core generira entropiju kada napravimo novi wallet",
    description:
      "Kako Bitcoin Core prikuplja i kriptografski miješa entropiju, provjerava privatni ključ i iz njega gradi BIP32 wallet.",
    ogDescription:
      "Kako Bitcoin Core stvara visokokvalitetan privatni korijen iz više izvora entropije i iz njega gradi cijeli wallet.",
    type: "article",
    publishedDate: "2026-08-05",
    sectionName: "Bitcoin Core",
    sectionId: bitcoinCoreSeriesId,
    articleTag: "Bitcoin Core entropija",
    breadcrumbParents: [
      { name: "Hrvatski tekstovi", item: hrUrl },
      { name: "Bitcoin Core", item: bitcoinCoreSeriesUrl },
    ],
    image: `${siteUrl}/bitcoin-core-entropija-og.jpg`,
    imageAlt:
      "Kriptografski proces nastanka Bitcoin Core walleta u mediteranskom okruženju.",
    imageWidth: 1200,
    imageHeight: 630,
    heroImage: "/bitcoin-core-entropija-hero.webp",
    heroImageSrcSet:
      "/bitcoin-core-entropija-hero-840.webp 840w, /bitcoin-core-entropija-hero.webp 1200w",
    keywords: [
      "Bitcoin Core",
      "entropija",
      "privatni ključ",
      "BIP32",
      "kriptografski RNG",
      "Bitcoin wallet",
    ],
    alternates: {
      hr: `${bitcoinCoreSeriesUrl}kako-bitcoin-core-generira-entropiju-kada-napravimo-novi-wallet/`,
      en: enBitcoinCoreArticleUrl,
      xDefault: enBitcoinCoreArticleUrl,
    },
  },
  {
    appPath: "/en/bitcoin-core/",
    routePath: "en/bitcoin-core",
    routeUrl: enBitcoinCoreSeriesUrl,
    title: "Bitcoin Core | Pavao Pahljina",
    collectionName: "Bitcoin Core",
    description:
      "English essays about Bitcoin Core, wallets, validation, and the security foundations of the Bitcoin system.",
    ogDescription:
      "English essays about Bitcoin Core, wallets, validation, and the security foundations of the Bitcoin system.",
    type: "website",
    language: "en-US",
    image: `${siteUrl}/bitcoin-core-entropija-og.jpg`,
    imageAlt:
      "The cryptographic process of creating a Bitcoin Core wallet in a Mediterranean setting.",
    imageWidth: 1200,
    imageHeight: 630,
    breadcrumbParents: [],
    about: ["Bitcoin Core", "Bitcoin wallet", "Bitcoin security"],
    alternates: {
      hr: bitcoinCoreSeriesUrl,
      en: enBitcoinCoreSeriesUrl,
      xDefault: enBitcoinCoreSeriesUrl,
    },
  },
  {
    appPath:
      "/en/bitcoin-core/how-bitcoin-core-generates-entropy-when-you-create-a-new-wallet/",
    routePath:
      "en/bitcoin-core/how-bitcoin-core-generates-entropy-when-you-create-a-new-wallet",
    routeUrl: enBitcoinCoreArticleUrl,
    title: "How Bitcoin Core Generates Entropy When You Create a New Wallet",
    headline:
      "How Bitcoin Core Generates Entropy When You Create a New Wallet",
    description:
      "How Bitcoin Core gathers and cryptographically mixes entropy, validates a private key, and builds a BIP32 wallet from it.",
    ogDescription:
      "How Bitcoin Core creates a high-quality private root from multiple entropy sources and uses it to build an entire wallet.",
    type: "article",
    language: "en-US",
    publishedDate: "2026-08-05",
    sectionName: "Bitcoin Core",
    sectionId: enBitcoinCoreSeriesId,
    articleTag: "Bitcoin Core entropy",
    breadcrumbParents: [
      { name: "Bitcoin Core", item: enBitcoinCoreSeriesUrl },
    ],
    image: `${siteUrl}/bitcoin-core-entropija-og.jpg`,
    imageAlt:
      "The cryptographic process of creating a Bitcoin Core wallet in a Mediterranean setting.",
    imageWidth: 1200,
    imageHeight: 630,
    heroImage: "/bitcoin-core-entropija-hero.webp",
    heroImageSrcSet:
      "/bitcoin-core-entropija-hero-840.webp 840w, /bitcoin-core-entropija-hero.webp 1200w",
    keywords: [
      "Bitcoin Core",
      "entropy",
      "private key",
      "BIP32",
      "cryptographic RNG",
      "Bitcoin wallet",
    ],
    alternates: {
      hr: `${bitcoinCoreSeriesUrl}kako-bitcoin-core-generira-entropiju-kada-napravimo-novi-wallet/`,
      en: enBitcoinCoreArticleUrl,
      xDefault: enBitcoinCoreArticleUrl,
    },
  },
  {
    appPath: "/en/bitcoin-core/the-long-road-back-to-bitcoin-core/",
    routePath: "en/bitcoin-core/the-long-road-back-to-bitcoin-core",
    routeUrl: longRoadArticleUrl,
    title: "The Long Road Back to Bitcoin Core",
    headline: "The Long Road Back to Bitcoin Core",
    description:
      "How a hardware-wallet controversy, an entropy rabbit hole, and a few simple restore tests ended my search for the \u201cperfect\u201d Bitcoin wallet",
    ogDescription:
      "How a hardware-wallet controversy, an entropy rabbit hole, and a few simple restore tests ended my search for the \u201cperfect\u201d Bitcoin wallet",
    type: "article",
    language: "en-US",
    publishedDate: "2026-08-05",
    sectionName: "Bitcoin Core",
    sectionId: enBitcoinCoreSeriesId,
    articleTag: "Bitcoin Core wallet security",
    breadcrumbParents: [{ name: "Bitcoin Core", item: enBitcoinCoreSeriesUrl }],
    image: `${siteUrl}/long-road-bitcoin-core-og.jpg`,
    imageAlt:
      "A person stands in a Mediterranean maze of Bitcoin wallets and backups, facing a simple illuminated doorway.",
    imageWidth: 1200,
    imageHeight: 630,
    textHero: true,
    keywords: [
      "Bitcoin Core",
      "Bitcoin wallet",
      "hardware wallet",
      "BIP39",
      "descriptor wallet",
      "pruned node",
      "offline signing",
    ],
  },
]

const distIndexUrl = new URL("../dist/index.html", import.meta.url)

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
}

function replaceFirst(html, pattern, replacement) {
  if (!pattern.test(html)) {
    throw new Error(`Could not find pattern: ${pattern}`)
  }

  return html.replace(pattern, () => replacement)
}

function breadcrumbItems(route) {
  const items = [
    {
      "@type": "ListItem",
      position: 1,
      name: "Pavao Pahljina",
      item: `${siteUrl}/`,
    },
  ]

  for (const parent of route.breadcrumbParents ?? []) {
    items.push({
      "@type": "ListItem",
      position: items.length + 1,
      name: parent.name,
      item: parent.item,
    })
  }

  items.push({
    "@type": "ListItem",
    position: items.length + 1,
    name: route.headline ?? route.collectionName ?? route.title,
    item: route.routeUrl,
  })

  return items
}

function structuredData(route) {
  const language = route.language ?? "hr-HR"
  const breadcrumb = {
    "@type": "BreadcrumbList",
    "@id": `${route.routeUrl}#breadcrumb`,
    itemListElement: breadcrumbItems(route),
  }

  if (route.type === "article") {
    return {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "BlogPosting",
          "@id": `${route.routeUrl}#article`,
          url: route.routeUrl,
          headline: route.headline,
          description: route.description,
          inLanguage: language,
          datePublished: route.publishedDate,
          dateModified: route.publishedDate,
          articleSection: route.sectionName,
          isAccessibleForFree: true,
          image: {
            "@type": "ImageObject",
            url: route.image,
            width: route.imageWidth,
            height: route.imageHeight,
          },
          thumbnailUrl: route.image,
          mainEntityOfPage: {
            "@type": "WebPage",
            "@id": route.routeUrl,
          },
          author: { "@id": personId },
          publisher: { "@id": personId },
          isPartOf: { "@id": route.sectionId },
          keywords: route.keywords ?? [route.sectionName],
        },
        breadcrumb,
      ],
    }
  }

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${route.routeUrl}#collection`,
        name: route.collectionName,
        description: route.description,
        inLanguage: language,
        url: route.routeUrl,
        isPartOf: { "@id": websiteId },
        author: { "@id": personId },
        about: route.about,
      },
      breadcrumb,
    ],
  }
}

function routeHeadMeta(route) {
  const heroImage = route.heroImage ?? "/ai-workflow-hero.webp"
  const heroImageSrcSet =
    route.heroImageSrcSet ??
    "/ai-workflow-hero-840.webp 840w, /ai-workflow-hero.webp 1672w"
  const heroPreload = route.textHero
    ? ""
    : `    <link rel="preload" as="image" href="${heroImage}" type="image/webp" imagesrcset="${heroImageSrcSet}" imagesizes="(max-width: 760px) 100vw, 60vw" fetchpriority="high" />
`
  const articleMeta =
    route.type === "article"
      ? `    <meta property="article:published_time" content="${route.publishedDate}" />
    <meta property="article:modified_time" content="${route.publishedDate}" />
    <meta property="article:section" content="${escapeHtml(route.sectionName)}" />
    <meta property="article:tag" content="${escapeHtml(route.articleTag)}" />
${heroPreload}`
      : ""
  const alternateLinks = route.alternates
    ? `    <link rel="alternate" hreflang="hr" href="${route.alternates.hr}" />
    <link rel="alternate" hreflang="en" href="${route.alternates.en}" />
    <link rel="alternate" hreflang="x-default" href="${route.alternates.xDefault}" />
`
    : ""

  return `${articleMeta}${alternateLinks}    <script type="application/ld+json">
      ${JSON.stringify(structuredData(route), null, 8)}
    </script>
`
}

function renderRoot(html, appPath) {
  return replaceFirst(
    html,
    /<div id="root"><\/div>/,
    `<div id="root">${renderPage(appPath)}</div>`
  )
}

function renderRoute(baseHtml, route) {
  let html = baseHtml
  const isEnglish = (route.language ?? "hr-HR").startsWith("en")

  html = replaceFirst(
    html,
    /<html lang="en">/,
    `<html lang="${isEnglish ? "en" : "hr"}">`
  )
  html = replaceFirst(
    html,
    /<title>.*?<\/title>/,
    `<title>${escapeHtml(route.title)}</title>`
  )
  html = replaceFirst(
    html,
    /<meta\s+name="description"[^>]*>/,
    `<meta name="description" content="${escapeHtml(route.description)}" />`
  )
  html = replaceFirst(
    html,
    /<link rel="canonical" href="[^"]*"\s*\/>/,
    `<link rel="canonical" href="${route.routeUrl}" />`
  )
  html = replaceFirst(
    html,
    /<meta\s+property="og:type"[^>]*>/,
    `<meta property="og:type" content="${route.type}" />`
  )
  html = replaceFirst(
    html,
    /<meta\s+property="og:locale"[^>]*>/,
    `<meta property="og:locale" content="${isEnglish ? "en_US" : "hr_HR"}" />`
  )
  html = replaceFirst(
    html,
    /<meta\s+property="og:locale:alternate"[^>]*>/,
    `<meta property="og:locale:alternate" content="${isEnglish ? "hr_HR" : "en_US"}" />`
  )
  html = replaceFirst(
    html,
    /<meta\s+property="og:title"[^>]*>/,
    `<meta property="og:title" content="${escapeHtml(route.headline ?? route.title)}" />`
  )
  html = replaceFirst(
    html,
    /<meta\s+property="og:description"[^>]*>/,
    `<meta property="og:description" content="${escapeHtml(route.ogDescription)}" />`
  )
  html = replaceFirst(
    html,
    /<meta\s+property="og:url"[^>]*>/,
    `<meta property="og:url" content="${route.routeUrl}" />`
  )
  html = replaceFirst(
    html,
    /<meta\s+property="og:image"[^>]*>/,
    `<meta property="og:image" content="${route.image}" />`
  )
  html = replaceFirst(
    html,
    /<meta\s+property="og:image:type"[^>]*>/,
    `<meta property="og:image:type" content="${route.imageType ?? "image/jpeg"}" />`
  )
  html = replaceFirst(
    html,
    /<meta\s+property="og:image:width"[^>]*>/,
    `<meta property="og:image:width" content="${route.imageWidth}" />`
  )
  html = replaceFirst(
    html,
    /<meta\s+property="og:image:height"[^>]*>/,
    `<meta property="og:image:height" content="${route.imageHeight}" />`
  )
  html = replaceFirst(
    html,
    /<meta\s+property="og:image:alt"[^>]*>/,
    `<meta property="og:image:alt" content="${escapeHtml(route.imageAlt)}" />`
  )
  html = replaceFirst(
    html,
    /<meta\s+name="twitter:title"[^>]*>/,
    `<meta name="twitter:title" content="${escapeHtml(route.headline ?? route.title)}" />`
  )
  html = replaceFirst(
    html,
    /<meta\s+name="twitter:description"[^>]*>/,
    `<meta name="twitter:description" content="${escapeHtml(route.ogDescription)}" />`
  )
  html = replaceFirst(
    html,
    /<meta\s+name="twitter:image"[^>]*>/,
    `<meta name="twitter:image" content="${route.image}" />`
  )
  html = replaceFirst(
    html,
    /<meta\s+name="twitter:image:alt"[^>]*>/,
    `<meta name="twitter:image:alt" content="${escapeHtml(route.imageAlt)}" />`
  )
  html = replaceFirst(html, /<\/head>/, `${routeHeadMeta(route)}  </head>`)

  return renderRoot(html, route.appPath)
}

const baseHtml = await readFile(distIndexUrl, "utf8")
await writeFile(distIndexUrl, renderRoot(baseHtml, homeRoute.appPath))

for (const route of routes) {
  const routeDirectoryUrl = new URL(
    `../dist/${route.routePath}/`,
    import.meta.url
  )
  const routeIndexUrl = new URL("index.html", routeDirectoryUrl)

  await mkdir(routeDirectoryUrl, { recursive: true })
  await writeFile(routeIndexUrl, renderRoute(baseHtml, route))
}

console.log(`Prerendered ${routes.length + 1} routes with crawlable HTML.`)
