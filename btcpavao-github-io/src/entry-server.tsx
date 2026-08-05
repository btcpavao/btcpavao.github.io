import { StrictMode } from "react"
import { renderToString } from "react-dom/server"

import App from "./App.tsx"
import * as articleData from "./article-data.ts"
import bitcoinCoreArticleSource from "./bitcoin-core-article.txt?raw"
import { ThemeProvider } from "./components/theme-provider.tsx"
import learningArticleHtml from "./learning-article.html?raw"
import {
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
              ? bitcoinCoreArticleSource
              : ""
          }
        />
      </ThemeProvider>
    </StrictMode>
  )
}
