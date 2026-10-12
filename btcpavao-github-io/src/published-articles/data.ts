import articles from "./articles.json"

export { articles }

export function findPublishedArticle(path: string) {
  return articles.find((article) => article.path === path)
}
