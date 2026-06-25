import { mkdir, readFile, writeFile } from "node:fs/promises"

const routes = [
  {
    routePath: "hr/ai-u-praksi",
    routeUrl: "https://btcpavao.com/hr/ai-u-praksi/",
    title: "AI u praksi | Pavao Pahljina",
    description:
      "Osobne bilješke o tome kako koristim AI za pisanje, knjige, web stranice, agente, automatizaciju i svakodnevni rad.",
    ogDescription:
      "Kako jedan generalist koristi AI da ideje pretvori u tekstove, knjige, web stranice i stvarne poslovne sustave.",
    type: "website",
  },
  {
    routePath: "hr/ai-u-praksi/jedan-covjek-ai-i-dva-mjeseca-rada",
    routeUrl:
      "https://btcpavao.com/hr/ai-u-praksi/jedan-covjek-ai-i-dva-mjeseca-rada/",
    title: "Jedan čovjek, AI i dva mjeseca rada",
    description:
      "Osobni osvrt na to kako sam uz diktiranje, ChatGPT i Codex u manje od dva mjeseca dovršio knjigu, podigao web stranice i promijenio vlastiti način rada.",
    ogDescription:
      "Kako AI u praksi mijenja rad jednog generalista: od diktiranja u šetnji do knjige, web stranica, agenata i automatizacije.",
    type: "article",
    publishedDate: "2026-06-12",
  },
  {
    routePath: "hr/ai-u-praksi/od-diktata-do-objavljene-stranice",
    routeUrl:
      "https://btcpavao.com/hr/ai-u-praksi/od-diktata-do-objavljene-stranice/",
    title: "Moj AI workflow: od diktata do objavljene stranice",
    description:
      "Kako koristim diktiranje, transkripciju, ChatGPT i Codex da ideju pretvorim u članak, vodič, knjigu ili web stranicu.",
    ogDescription:
      "Praktičan prikaz procesa od ideje izgovorene u šetnji do sadržaja ili stranice spremne za objavu.",
    type: "article",
    publishedDate: "2026-06-25",
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

  return html.replace(pattern, replacement)
}

function structuredData(route) {
  if (route.type === "article") {
    return {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: route.title,
      description: route.description,
      inLanguage: "hr-HR",
      datePublished: route.publishedDate,
      dateModified: route.publishedDate,
      articleSection: "AI u praksi",
      mainEntityOfPage: route.routeUrl,
      author: {
        "@type": "Person",
        name: "Pavao Pahljina",
        url: "https://btcpavao.com/",
      },
      publisher: {
        "@type": "Person",
        name: "Pavao Pahljina",
        url: "https://btcpavao.com/",
      },
    }
  }

  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "AI u praksi",
    description: route.description,
    inLanguage: "hr-HR",
    url: route.routeUrl,
  }
}

function routeHeadMeta(route) {
  const articleMeta =
    route.type === "article"
      ? `    <meta property="article:published_time" content="${route.publishedDate}" />
    <meta property="article:modified_time" content="${route.publishedDate}" />
    <meta property="article:section" content="AI u praksi" />
    <meta property="article:tag" content="AI u praksi" />
`
      : ""

  return `    <meta property="og:locale" content="hr_HR" />
${articleMeta}    <script type="application/ld+json">
      ${JSON.stringify(structuredData(route), null, 8)}
    </script>
`
}

const baseHtml = await readFile(distIndexUrl, "utf8")

for (const route of routes) {
  const routeDirectoryUrl = new URL(`../dist/${route.routePath}/`, import.meta.url)
  const routeIndexUrl = new URL("index.html", routeDirectoryUrl)
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
    /<meta\s+property="og:title"[^>]*>/,
    `<meta property="og:title" content="${escapeHtml(route.title)}" />`
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
    /<meta\s+name="twitter:title"[^>]*>/,
    `<meta name="twitter:title" content="${escapeHtml(route.title)}" />`
  )
  html = replaceFirst(
    html,
    /<meta\s+name="twitter:description"[^>]*>/,
    `<meta name="twitter:description" content="${escapeHtml(route.ogDescription)}" />`
  )
  html = replaceFirst(html, /<\/head>/, `${routeHeadMeta(route)}  </head>`)

  await mkdir(routeDirectoryUrl, { recursive: true })
  await writeFile(routeIndexUrl, html)
}
