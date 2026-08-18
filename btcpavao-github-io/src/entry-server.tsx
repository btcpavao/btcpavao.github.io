import { StrictMode } from "react"
import { renderToString } from "react-dom/server"

import App from "./App.tsx"
import * as articleData from "./article-data.ts"
import { BitcoinCoreCurriculumPage } from "./bitcoin-core-curriculum.tsx"
import { BitcoinCoreStartPage } from "./bitcoin-core-start.tsx"
import { BitcoinCoreWalletGuidePage } from "./bitcoin-core-wallet-guide.tsx"
import bitcoinCoreArticleEnglishSource from "./bitcoin-core-article-en.txt?raw"
import bitcoinCoreArticleSource from "./bitcoin-core-article.txt?raw"
import { ThemeProvider } from "./components/theme-provider.tsx"
import { Homepage } from "./homepage.tsx"
import learningArticleHtml from "./learning-article.html?raw"
import longRoadArticleSource from "./long-road-back-to-bitcoin-core.md?raw"
import {
  BITCOIN_CORE_CURRICULUM_PATH,
  BITCOIN_CORE_WALLET_GUIDE_PATH,
  EN_BITCOIN_CORE_ENTROPY_ARTICLE_PATH,
  needsBitcoinCoreArticleSource,
  needsArticleData,
  needsLearningArticleHtml,
  needsLongRoadArticleSource,
  normalizePath,
  START_HERE_PATH,
} from "./routes.ts"

export function renderPage(pathname: string) {
  const initialPath = normalizePath(pathname)
  const page =
    initialPath === "/" ? (
      <Homepage />
    ) : initialPath === BITCOIN_CORE_CURRICULUM_PATH ? (
      <BitcoinCoreCurriculumPage />
    ) : initialPath === START_HERE_PATH ? (
      <BitcoinCoreStartPage />
    ) : initialPath === BITCOIN_CORE_WALLET_GUIDE_PATH ? (
      <BitcoinCoreWalletGuidePage />
    ) : (
      <App
        initialPath={initialPath}
        initialArticleData={needsArticleData(initialPath) ? articleData : null}
        initialLearningArticleHtml={
          needsLearningArticleHtml(initialPath) ? learningArticleHtml : ""
        }
        initialBitcoinCoreArticleSource={
          needsBitcoinCoreArticleSource(initialPath)
            ? initialPath === EN_BITCOIN_CORE_ENTROPY_ARTICLE_PATH
              ? bitcoinCoreArticleEnglishSource
              : bitcoinCoreArticleSource
            : ""
        }
        initialLongRoadArticleSource={
          needsLongRoadArticleSource(initialPath) ? longRoadArticleSource : ""
        }
      />
    )

  return renderToString(
    <StrictMode>
      <ThemeProvider>{page}</ThemeProvider>
    </StrictMode>
  )
}
