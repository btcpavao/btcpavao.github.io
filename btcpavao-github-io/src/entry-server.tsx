import { StrictMode } from "react"
import { renderToString } from "react-dom/server"

import App from "./App.tsx"
import * as articleData from "./article-data.ts"
import bitcoinCoreArticleEnglishSource from "./bitcoin-core-article-en.txt?raw"
import bitcoinCoreArticleSource from "./bitcoin-core-article.txt?raw"
import { ThemeProvider } from "./components/theme-provider.tsx"
import learningArticleHtml from "./learning-article.html?raw"
import {
  EN_BITCOIN_CORE_ENTROPY_ARTICLE_PATH,
  needsBitcoinCoreArticleSource,
  needsArticleData,
  needsLearningArticleHtml,
  normalizePath,
} from "./routes.ts"

export function renderPage(pathname: string) {
  const initialPath = normalizePath(pathname)

  return renderToString(
    <StrictMode>
      <ThemeProvider>
        <App
          initialPath={initialPath}
          initialArticleData={
            needsArticleData(initialPath) ? articleData : null
          }
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
        />
      </ThemeProvider>
    </StrictMode>
  )
}
