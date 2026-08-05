import { StrictMode } from "react"
import { createRoot, hydrateRoot } from "react-dom/client"

import "./index.css"
import App, { type ArticleDataModule } from "./App.tsx"
import { ThemeProvider } from "@/components/theme-provider.tsx"
import {
  EN_BITCOIN_CORE_ENTROPY_ARTICLE_PATH,
  needsBitcoinCoreArticleSource,
  needsArticleData,
  needsLearningArticleHtml,
  needsLongRoadArticleSource,
  normalizePath,
} from "@/routes"

async function startApp() {
  const root = document.getElementById("root")!
  const initialPath = normalizePath(window.location.pathname)
  let initialArticleData: ArticleDataModule | null = null
  let initialLearningArticleHtml = ""
  let initialBitcoinCoreArticleSource = ""
  let initialLongRoadArticleSource = ""

  if (needsArticleData(initialPath)) {
    initialArticleData = await import("./article-data")
  }

  if (needsLearningArticleHtml(initialPath)) {
    initialLearningArticleHtml = (await import("./learning-article.html?raw"))
      .default
  }

  if (needsBitcoinCoreArticleSource(initialPath)) {
    initialBitcoinCoreArticleSource = (
      initialPath === EN_BITCOIN_CORE_ENTROPY_ARTICLE_PATH
        ? await import("./bitcoin-core-article-en.txt?raw")
        : await import("./bitcoin-core-article.txt?raw")
    ).default
  }

  if (needsLongRoadArticleSource(initialPath)) {
    initialLongRoadArticleSource = (
      await import("./long-road-back-to-bitcoin-core.md?raw")
    ).default
  }

  const app = (
    <StrictMode>
      <ThemeProvider>
        <App
          initialPath={initialPath}
          initialArticleData={initialArticleData}
          initialLearningArticleHtml={initialLearningArticleHtml}
          initialBitcoinCoreArticleSource={initialBitcoinCoreArticleSource}
          initialLongRoadArticleSource={initialLongRoadArticleSource}
        />
      </ThemeProvider>
    </StrictMode>
  )

  if (root.hasChildNodes()) {
    hydrateRoot(root, app)
    return
  }

  createRoot(root).render(app)
}

void startApp()
