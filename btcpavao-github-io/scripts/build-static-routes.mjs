import { mkdir, readFile, writeFile } from "node:fs/promises"

const routePath = "hr/ai-u-praksi/jedan-covjek-ai-i-dva-mjeseca-rada"
const routeUrl = `https://btcpavao.com/${routePath}/`
const title = "Jedan čovjek, AI i dva mjeseca rada"
const description =
  "Osobni osvrt na to kako sam uz diktiranje, ChatGPT i Codex u manje od dva mjeseca dovršio knjigu, podigao web stranice i promijenio vlastiti način rada."
const ogDescription =
  "Kako AI u praksi mijenja rad jednog generalista: od diktiranja u šetnji do knjige, web stranica, agenata i automatizacije."
const publishedDate = "2026-06-11"

const distIndexUrl = new URL("../dist/index.html", import.meta.url)
const routeDirectoryUrl = new URL(`../dist/${routePath}/`, import.meta.url)
const routeIndexUrl = new URL("index.html", routeDirectoryUrl)

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

function articleStructuredData() {
  return JSON.stringify(
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: title,
      description,
      inLanguage: "hr-HR",
      datePublished: publishedDate,
      dateModified: publishedDate,
      mainEntityOfPage: routeUrl,
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
    },
    null,
    8
  )
}

let html = await readFile(distIndexUrl, "utf8")

html = replaceFirst(html, /<html lang="en">/, '<html lang="hr">')
html = replaceFirst(
  html,
  /<title>.*?<\/title>/,
  `<title>${escapeHtml(title)}</title>`
)
html = replaceFirst(
  html,
  /<meta\s+name="description"[^>]*>/,
  `<meta name="description" content="${escapeHtml(description)}" />`
)
html = replaceFirst(
  html,
  /<link rel="canonical" href="[^"]*"\s*\/>/,
  `<link rel="canonical" href="${routeUrl}" />`
)
html = replaceFirst(
  html,
  /<meta\s+property="og:type"[^>]*>/,
  '<meta property="og:type" content="article" />'
)
html = replaceFirst(
  html,
  /<meta\s+property="og:title"[^>]*>/,
  `<meta property="og:title" content="${escapeHtml(title)}" />`
)
html = replaceFirst(
  html,
  /<meta\s+property="og:description"[^>]*>/,
  `<meta property="og:description" content="${escapeHtml(ogDescription)}" />`
)
html = replaceFirst(
  html,
  /<meta\s+property="og:url"[^>]*>/,
  `<meta property="og:url" content="${routeUrl}" />`
)
html = replaceFirst(
  html,
  /<meta\s+name="twitter:title"[^>]*>/,
  `<meta name="twitter:title" content="${escapeHtml(title)}" />`
)
html = replaceFirst(
  html,
  /<meta\s+name="twitter:description"[^>]*>/,
  `<meta name="twitter:description" content="${escapeHtml(ogDescription)}" />`
)

const articleMeta = `    <meta property="og:locale" content="hr_HR" />
    <meta property="article:published_time" content="${publishedDate}" />
    <meta property="article:modified_time" content="${publishedDate}" />
    <meta property="article:section" content="AI u praksi" />
    <meta property="article:tag" content="AI u praksi" />
    <script type="application/ld+json">
      ${articleStructuredData()}
    </script>
`

html = replaceFirst(html, /<\/head>/, `${articleMeta}  </head>`)

await mkdir(routeDirectoryUrl, { recursive: true })
await writeFile(routeIndexUrl, html)
