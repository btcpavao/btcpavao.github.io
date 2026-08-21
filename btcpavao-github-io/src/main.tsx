import { StrictMode, type ReactNode } from "react"
import { createRoot, hydrateRoot } from "react-dom/client"

import "./index.css"
import App, { type ArticleDataModule } from "./App.tsx"
import { ThemeProvider } from "@/components/theme-provider.tsx"
import {
  BITCOIN_CORE_CURRICULUM_PATH,
  BITCOIN_CORE_WALLET_GUIDE_PATH,
  EN_BITCOIN_CORE_CURRICULUM_PATH,
  EN_BITCOIN_CORE_ENTROPY_ARTICLE_PATH,
  needsBitcoinCoreArticleSource,
  needsArticleData,
  needsLearningArticleHtml,
  needsLongRoadArticleSource,
  needsBip39ArticleSource,
  normalizePath,
  START_HERE_PATH,
} from "@/routes"

async function startApp() {
  const root = document.getElementById("root")!
  const initialPath = normalizePath(window.location.pathname)
  let initialArticleData: ArticleDataModule | null = null
  let initialLearningArticleHtml = ""
  let initialBitcoinCoreArticleSource = ""
  let initialLongRoadArticleSource = ""
  let initialBip39ArticleSource = ""

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

  if (needsBip39ArticleSource(initialPath)) {
    initialBip39ArticleSource = (
      await import("./bip39-wrong-thing-human-readable.md?raw")
    ).default
  }

  let routedPage: ReactNode
  if (initialPath === "/") {
    const { Homepage } = await import("./homepage")
    routedPage = <Homepage />
  } else if (initialPath === BITCOIN_CORE_CURRICULUM_PATH) {
    const { BitcoinCoreCurriculumPage } =
      await import("./bitcoin-core-curriculum")
    routedPage = <BitcoinCoreCurriculumPage />
  } else if (initialPath === EN_BITCOIN_CORE_CURRICULUM_PATH) {
    const { BitcoinCoreCurriculumEnPage } =
      await import("./bitcoin-core-curriculum-en")
    routedPage = <BitcoinCoreCurriculumEnPage />
  } else if (initialPath === START_HERE_PATH) {
    const { BitcoinCoreStartPage } = await import("./bitcoin-core-start")
    routedPage = <BitcoinCoreStartPage />
  } else if (initialPath === BITCOIN_CORE_WALLET_GUIDE_PATH) {
    const { BitcoinCoreWalletGuidePage } =
      await import("./bitcoin-core-wallet-guide")
    routedPage = <BitcoinCoreWalletGuidePage />
  } else {
    routedPage = (
      <App
        initialPath={initialPath}
        initialArticleData={initialArticleData}
        initialLearningArticleHtml={initialLearningArticleHtml}
        initialBitcoinCoreArticleSource={initialBitcoinCoreArticleSource}
        initialLongRoadArticleSource={initialLongRoadArticleSource}
        initialBip39ArticleSource={initialBip39ArticleSource}
      />
    )
  }

  const app = (
    <StrictMode>
      <ThemeProvider>{routedPage}</ThemeProvider>
    </StrictMode>
  )

  if (root.hasChildNodes()) {
    hydrateRoot(root, app)
    return
  }

  createRoot(root).render(app)
}

void startApp()
