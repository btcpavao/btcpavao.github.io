// Preserve functional query parameters, fragments and clean URLs byte-for-byte.
export function cleanArticleUrl(href: string) {
  const hashAt = href.indexOf("#")
  const fragment = hashAt < 0 ? "" : href.slice(hashAt)
  const base = hashAt < 0 ? href : href.slice(0, hashAt)
  const queryAt = base.indexOf("?")
  if (queryAt < 0) return href
  const decode = (value: string) => {
    try {
      return decodeURIComponent(value.replace(/\+/g, " "))
    } catch {
      return value
    }
  }
  const params = base.slice(queryAt + 1).split("&")
  const isUtm = (param: string) => /^utm_/i.test(decode(param.split("=", 1)[0]))
  const fromChatGPT = params.some(
    (param) =>
      isUtm(param) &&
      /chatgpt|chat\.openai\.com/i.test(
        decode(param.slice(param.indexOf("=") + 1))
      )
  )
  if (!fromChatGPT) return href
  const query = params.filter((param) => !isUtm(param)).join("&")
  return base.slice(0, queryAt) + (query ? `?${query}` : "") + fragment
}

export function articleLinkProps(href: string) {
  return {
    href: cleanArticleUrl(href),
    target: "_blank",
    rel: "noopener noreferrer",
  } as const
}

// Presentation of trusted, repository-owned article HTML, not an HTML sanitizer.
export function formatArticleHtml(html: string) {
  return html.replace(/<a\b[^>]*>/gi, (tag) => {
    const href = tag.match(/\bhref\s*=\s*(["'])(.*?)\1/i)
    if (!href) return tag
    const cleaned = cleanArticleUrl(href[2].replace(/&amp;/gi, "&"))
      .replace(/&/g, "&amp;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;")
    return tag
      .replace(href[0], `href="${cleaned}"`)
      .replace(/\s+(?:target|rel)\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+)/gi, "")
      .replace(/>$/, ' target="_blank" rel="noopener noreferrer">')
  })
}
