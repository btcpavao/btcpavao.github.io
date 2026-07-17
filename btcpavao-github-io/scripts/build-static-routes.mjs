import { mkdir, readFile, writeFile } from "node:fs/promises"

import { renderPage } from "../dist-ssr/entry-server.js"

const siteUrl = "https://btcpavao.com"
const personId = `${siteUrl}/#person`
const websiteId = `${siteUrl}/#website`
const seriesUrl = `${siteUrl}/hr/ai-u-praksi/`
const seriesId = `${seriesUrl}#collection`

const homeRoute = {
  appPath: "/",
  routeUrl: `${siteUrl}/`,
}

const routes = [
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
    {
      "@type": "ListItem",
      position: 2,
      name: "AI u praksi",
      item: seriesUrl,
    },
  ]

  if (route.type === "article") {
    items.push({
      "@type": "ListItem",
      position: 3,
      name: route.headline,
      item: route.routeUrl,
    })
  }

  return items
}

function structuredData(route) {
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
          inLanguage: "hr-HR",
          datePublished: route.publishedDate,
          dateModified: route.publishedDate,
          articleSection: "AI u praksi",
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
          isPartOf: { "@id": seriesId },
          keywords: route.keywords ?? [
            "AI workflow",
            "diktiranje",
            "ChatGPT",
            "Codex",
            "AI u praksi",
          ],
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
        "@id": seriesId,
        name: "AI u praksi",
        description: route.description,
        inLanguage: "hr-HR",
        url: route.routeUrl,
        isPartOf: { "@id": websiteId },
        author: { "@id": personId },
        about: ["Umjetna inteligencija", "AI workflow", "Codex", "ChatGPT"],
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
  const articleMeta =
    route.type === "article"
      ? `    <meta property="article:published_time" content="${route.publishedDate}" />
    <meta property="article:modified_time" content="${route.publishedDate}" />
    <meta property="article:section" content="AI u praksi" />
    <meta property="article:tag" content="AI workflow" />
    <link rel="preload" as="image" href="${heroImage}" type="image/webp" imagesrcset="${heroImageSrcSet}" imagesizes="(max-width: 760px) 100vw, 60vw" fetchpriority="high" />
`
      : ""

  return `${articleMeta}    <script type="application/ld+json">
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

  html = replaceFirst(html, /<html lang="en">/, '<html lang="hr">')
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
    '<meta property="og:locale" content="hr_HR" />'
  )
  html = replaceFirst(
    html,
    /<meta\s+property="og:locale:alternate"[^>]*>/,
    '<meta property="og:locale:alternate" content="en_US" />'
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
