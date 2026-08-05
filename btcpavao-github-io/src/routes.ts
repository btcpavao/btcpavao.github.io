export const AI_SERIES_PATH = "/hr/ai-u-praksi/"
export const HR_HOME_PATH = "/hr/"
export const BITCOIN_CORE_SERIES_PATH = "/hr/bitcoin-core/"
export const BITCOIN_CORE_ENTROPY_ARTICLE_PATH =
  "/hr/bitcoin-core/kako-bitcoin-core-generira-entropiju-kada-napravimo-novi-wallet/"
export const ARTICLE_PATH =
  "/hr/ai-u-praksi/jedan-covjek-ai-i-dva-mjeseca-rada/"
export const WORKFLOW_ARTICLE_PATH =
  "/hr/ai-u-praksi/od-diktata-do-objavljene-stranice/"
export const LEARNING_ARTICLE_PATH =
  "/hr/ai-u-praksi/kako-sam-uz-ai-naucio-matematiku-bitcoin-trenda/"

export function normalizePath(pathname: string) {
  if (pathname === "/") {
    return pathname
  }

  return pathname.endsWith("/") ? pathname : `${pathname}/`
}

export function needsArticleData(pathname: string) {
  const normalizedPath = normalizePath(pathname)
  return (
    normalizedPath === ARTICLE_PATH || normalizedPath === WORKFLOW_ARTICLE_PATH
  )
}

export function needsLearningArticleHtml(pathname: string) {
  return normalizePath(pathname) === LEARNING_ARTICLE_PATH
}

export function needsBitcoinCoreArticleSource(pathname: string) {
  return normalizePath(pathname) === BITCOIN_CORE_ENTROPY_ARTICLE_PATH
}
