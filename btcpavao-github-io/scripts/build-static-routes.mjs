import { mkdir, readFile, writeFile } from "node:fs/promises"

import {
  SITE_URL,
  contentRegistry,
  getPublishedContent,
} from "../content/content-registry.mjs"
import { renderPage } from "../dist-ssr/entry-server.js"

const distIndexUrl = new URL("../dist/index.html", import.meta.url)
const socialCards = JSON.parse(
  await readFile(
    new URL("../.cache/social-card-manifest.json", import.meta.url),
    "utf8"
  )
).urls

function escapeHtml(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
}

function escapeXml(value = "") {
  return escapeHtml(value).replaceAll("'", "&apos;")
}

function absolute(path) {
  return new URL(path, `${SITE_URL}/`).href
}

function replaceMeta(html, selector, replacement) {
  if (selector.test(html)) {
    return html.replace(selector, replacement)
  }

  return html.replace("</head>", `  ${replacement}\n  </head>`)
}

function cardFor(entry) {
  return socialCards[entry.socialCardKey] ?? socialCards.default
}

function alternatesFor(entry) {
  const alternates = [{ locale: entry.locale, path: entry.path }]
  if (entry.translationPath) {
    const translation = contentRegistry.find(
      (candidate) => candidate.path === entry.translationPath
    )
    if (translation) {
      alternates.push({ locale: translation.locale, path: translation.path })
    }
  }
  return alternates
}

function headExtras(entry) {
  const alternates = alternatesFor(entry)
  const alternateTags = alternates
    .map(
      ({ locale, path }) =>
        `<link rel="alternate" hreflang="${locale}" href="${absolute(path)}" />`
    )
    .join("\n    ")
  const xDefault =
    alternates.find(({ locale }) => locale === "en")?.path ?? entry.path
  const robots = entry.indexable
    ? "index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1"
    : "noindex,nofollow"
  const dates = entry.publishedAt
    ? `\n    <meta property="article:published_time" content="${entry.publishedAt}" />${
        entry.updatedAt
          ? `\n    <meta property="article:modified_time" content="${entry.updatedAt}" />`
          : ""
      }`
    : ""
  const articleSection =
    entry.contentType === "article"
      ? `\n    <meta property="article:section" content="${
          entry.section.startsWith("core") ? "Bitcoin Core" : "Writing"
        }" />`
      : ""

  return `
    <meta name="robots" content="${robots}" />
    ${alternateTags}
    <link rel="alternate" hreflang="x-default" href="${absolute(xDefault)}" />${dates}${articleSection}
    <script type="application/ld+json">${JSON.stringify({
      "@context": "https://schema.org",
      "@type": entry.contentType === "article" ? "Article" : "WebPage",
      headline: entry.title,
      description: entry.description,
      url: absolute(entry.path),
      inLanguage: entry.locale === "hr" ? "hr-HR" : "en-US",
      ...(entry.publishedAt ? { datePublished: entry.publishedAt } : {}),
      ...(entry.updatedAt ? { dateModified: entry.updatedAt } : {}),
      author: {
        "@type": "Person",
        name: "BTC Pavao",
        url: `${SITE_URL}/`,
      },
    }).replaceAll("<", "\\u003c")}</script>`
}

function renderRoot(html, path) {
  return html.replace(
    '<div id="root"></div>',
    `<div id="root">${renderPage(path)}</div>`
  )
}

function renderRoute(baseHtml, entry) {
  const image = cardFor(entry)
  const imageType = image.endsWith(".webp")
    ? "image/webp"
    : image.endsWith(".png")
      ? "image/png"
      : "image/jpeg"
  const type = entry.contentType === "article" ? "article" : "website"
  let html = renderRoot(baseHtml, entry.path)

  html = html.replace(/<html lang="[^"]*">/, `<html lang="${entry.locale}">`)
  html = html.replace(/<title>[^<]*<\/title>/, `<title>${escapeHtml(entry.title)}</title>`)
  html = replaceMeta(html, /<meta\s+name="description"[^>]*>/, `<meta name="description" content="${escapeHtml(entry.description)}" />`)
  html = replaceMeta(html, /<link\s+rel="canonical"[^>]*>/, `<link rel="canonical" href="${absolute(entry.path)}" />`)
  html = replaceMeta(html, /<meta\s+property="og:type"[^>]*>/, `<meta property="og:type" content="${type}" />`)
  html = replaceMeta(html, /<meta\s+property="og:title"[^>]*>/, `<meta property="og:title" content="${escapeHtml(entry.title)}" />`)
  html = replaceMeta(html, /<meta\s+property="og:description"[^>]*>/, `<meta property="og:description" content="${escapeHtml(entry.description)}" />`)
  html = replaceMeta(html, /<meta\s+property="og:url"[^>]*>/, `<meta property="og:url" content="${absolute(entry.path)}" />`)
  html = replaceMeta(
    html,
    /<meta\s+property="og:locale"[^>]*>/,
    `<meta property="og:locale" content="${entry.locale === "hr" ? "hr_HR" : "en_US"}" />`
  )
  html = replaceMeta(
    html,
    /<meta\s+property="og:locale:alternate"[^>]*>/,
    `<meta property="og:locale:alternate" content="${entry.locale === "hr" ? "en_US" : "hr_HR"}" />`
  )
  html = replaceMeta(html, /<meta\s+property="og:image"[^>]*>/, `<meta property="og:image" content="${image}" />`)
  html = replaceMeta(html, /<meta\s+property="og:image:type"[^>]*>/, `<meta property="og:image:type" content="${imageType}" />`)
  html = replaceMeta(html, /<meta\s+property="og:image:width"[^>]*>/, `<meta property="og:image:width" content="${entry.imageWidth}" />`)
  html = replaceMeta(html, /<meta\s+property="og:image:height"[^>]*>/, `<meta property="og:image:height" content="${entry.imageHeight}" />`)
  html = replaceMeta(html, /<meta\s+property="og:image:alt"[^>]*>/, `<meta property="og:image:alt" content="${escapeHtml(entry.imageAlt)}" />`)
  html = replaceMeta(html, /<meta\s+name="twitter:title"[^>]*>/, `<meta name="twitter:title" content="${escapeHtml(entry.title)}" />`)
  html = replaceMeta(html, /<meta\s+name="twitter:description"[^>]*>/, `<meta name="twitter:description" content="${escapeHtml(entry.description)}" />`)
  html = replaceMeta(html, /<meta\s+name="twitter:image"[^>]*>/, `<meta name="twitter:image" content="${image}" />`)
  html = replaceMeta(html, /<meta\s+name="twitter:image:alt"[^>]*>/, `<meta name="twitter:image:alt" content="${escapeHtml(entry.imageAlt)}" />`)
  html = html.replace(/\s*<meta\s+name="robots"[^>]*>/g, "")
  html = html.replace(/\s*<link\s+rel="alternate"\s+hreflang[^>]*>/g, "")
  return html.replace("</head>", `${headExtras(entry)}\n  </head>`)
}

function sitemapXml(entries) {
  const urls = entries.filter((entry) => entry.indexable).map((entry) => {
    const alternates = alternatesFor(entry).map(({ locale, path }) => `<xhtml:link rel="alternate" hreflang="${locale}" href="${escapeXml(absolute(path))}" />`).join("")
    const xDefault = alternatesFor(entry).find(({ locale }) => locale === "en")?.path ?? entry.path
    const image = entry.heroImage ? `<image:image><image:loc>${escapeXml(absolute(entry.heroImage))}</image:loc><image:caption>${escapeXml(entry.imageAlt)}</image:caption></image:image>` : ""
    return `<url><loc>${escapeXml(absolute(entry.path))}</loc>${entry.updatedAt ? `<lastmod>${entry.updatedAt}</lastmod>` : ""}${alternates}<xhtml:link rel="alternate" hreflang="x-default" href="${escapeXml(absolute(xDefault))}" />${image}</url>`
  }).join("")
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">${urls}</urlset>\n`
}

function rssXml(entries) {
  const items = entries.filter((entry) => entry.rss && entry.indexable).sort((a, b) => String(b.updatedAt ?? b.publishedAt ?? "").localeCompare(String(a.updatedAt ?? a.publishedAt ?? ""))).map((entry) => `<item><title>${escapeXml(entry.title)}</title><link>${escapeXml(absolute(entry.path))}</link><guid isPermaLink="true">${escapeXml(absolute(entry.path))}</guid><description>${escapeXml(entry.description)}</description>${entry.publishedAt ? `<pubDate>${new Date(`${entry.publishedAt}T12:00:00Z`).toUTCString()}</pubDate>` : ""}</item>`).join("")
  return `<?xml version="1.0" encoding="UTF-8"?>\n<rss version="2.0"><channel><title>BTC Pavao — Bitcoin Core, Bitcoin Standard and open writing</title><link>${SITE_URL}/</link><description>Practical Bitcoin Core education, Bitcoin Standard advisory and open writing.</description><language>en</language>${items}</channel></rss>\n`
}

const baseHtml = await readFile(distIndexUrl, "utf8")
const home = contentRegistry.find((entry) => entry.path === "/")
if (!home) throw new Error("The content registry is missing the homepage.")
await writeFile(distIndexUrl, renderRoute(baseHtml, home))

for (const entry of getPublishedContent().filter(({ path }) => path !== "/")) {
  const directoryUrl = new URL(`../dist${entry.path}`, import.meta.url)
  await mkdir(directoryUrl, { recursive: true })
  await writeFile(new URL("index.html", directoryUrl), renderRoute(baseHtml, entry))
}

const notFound = contentRegistry.find((entry) => entry.id === "not-found")
if (!notFound) throw new Error("The content registry is missing the 404 page.")
await writeFile(new URL("../dist/404.html", import.meta.url), renderRoute(baseHtml, notFound))
await writeFile(new URL("../dist/sitemap.xml", import.meta.url), sitemapXml(getPublishedContent()))
await writeFile(new URL("../dist/feed.xml", import.meta.url), rssXml(getPublishedContent()))

console.log(`Prerendered ${getPublishedContent().length} public routes, 404.html, sitemap.xml and feed.xml.`)
