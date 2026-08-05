import { StrictMode } from "react"
import { createRoot, hydrateRoot } from "react-dom/client"

import "./index.css"
import App, { type ArticleDataModule } from "./App.tsx"
import { ThemeProvider } from "@/components/theme-provider.tsx"
import {
  needsBitcoinCoreArticleSource,
  needsArticleData,
  needsLearningArticleHtml,
  normalizePath,
} from "@/routes"

async function startApp() {
  const root = document.getElementById("root")!
  const initialPath = normalizePath(window.location.pathname)
  let initialArticleData: ArticleDataModule | null = null
  let initialLearningArticleHtml = ""
  let initialBitcoinCoreArticleSource = ""

  if (needsArticleData(initialPath)) {
    initialArticleData = await import("./article-data")
  }

  if (needsLearningArticleHtml(initialPath)) {
    initialLearningArticleHtml = (await import("./learning-article.html?raw"))
      .default
  }

  if (needsBitcoinCoreArticleSource(initialPath)) {
    initialBitcoinCoreArticleSource = (
      await import("./bitcoin-core-article.txt?raw")
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
