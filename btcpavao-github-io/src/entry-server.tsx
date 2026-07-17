import { StrictMode } from "react"
import { renderToString } from "react-dom/server"

import App from "./App.tsx"
import * as articleData from "./article-data.ts"
import { ThemeProvider } from "./components/theme-provider.tsx"
import learningArticleHtml from "./learning-article.html?raw"
import {
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
        />
      </ThemeProvider>
    </StrictMode>
  )
}
