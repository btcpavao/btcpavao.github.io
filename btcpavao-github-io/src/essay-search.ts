export function normalizeEssaySearch(text: string) {
  return text.normalize("NFKD").replace(/\p{M}/gu, "").toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, " ").trim()
}

export function matchesEssay(text: string, query: string) {
  const normalized = normalizeEssaySearch(text)
  return normalizeEssaySearch(query).split(/\s+/).every(term => normalized.includes(term))
}
