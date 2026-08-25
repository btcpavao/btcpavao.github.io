import { StrictMode } from "react"
import { renderToString } from "react-dom/server"

import App from "./App.tsx"
import { BitcoinCoreCurriculumPage } from "./bitcoin-core-curriculum.tsx"
import { BitcoinCoreCurriculumEnPage } from "./bitcoin-core-curriculum-en.tsx"
import { BitcoinCoreStartPage } from "./bitcoin-core-start.tsx"
import { BitcoinCoreWalletGuidePage } from "./bitcoin-core-wallet-guide.tsx"
import bitcoinCoreArticleEnglishSource from "./bitcoin-core-article-en.txt?raw"
import bitcoinCoreArticleSource from "./bitcoin-core-article.txt?raw"
import bip39ArticleSource from "./bip39-wrong-thing-human-readable.md?raw"
import { ThemeProvider } from "./components/theme-provider.tsx"
import { Homepage } from "./homepage.tsx"
import { SupportThankYouPage } from "./support-thank-you.tsx"
import { SupportPage } from "./support.tsx"
import { NotFoundPage } from "./not-found.tsx"
import longRoadArticleSource from "./long-road-back-to-bitcoin-core.md?raw"
import {
  BITCOIN_CORE_CURRICULUM_PATH,
  BITCOIN_CORE_WALLET_GUIDE_PATH,
  EN_BITCOIN_CORE_CURRICULUM_PATH,
  EN_BITCOIN_CORE_ENTROPY_ARTICLE_PATH,
  needsBitcoinCoreArticleSource,
  needsLongRoadArticleSource,
  needsBip39ArticleSource,
  normalizePath,
  START_HERE_PATH,
  SUPPORT_PATH,
  SUPPORT_THANK_YOU_PATH,
  NOT_FOUND_PATH,
} from "./routes.ts"

export function renderPage(pathname: string) {
  const initialPath = normalizePath(pathname)
  const page =
    initialPath === "/" ? (
      <Homepage />
    ) : initialPath === BITCOIN_CORE_CURRICULUM_PATH ? (
      <BitcoinCoreCurriculumPage />
    ) : initialPath === EN_BITCOIN_CORE_CURRICULUM_PATH ? (
      <BitcoinCoreCurriculumEnPage />
    ) : initialPath === START_HERE_PATH ? (
      <BitcoinCoreStartPage />
    ) : initialPath === BITCOIN_CORE_WALLET_GUIDE_PATH ? (
      <BitcoinCoreWalletGuidePage />
    ) : initialPath === SUPPORT_THANK_YOU_PATH ? (
      <SupportThankYouPage />
    ) : initialPath === SUPPORT_PATH ? (
      <SupportPage />
    ) : initialPath === NOT_FOUND_PATH ? (
      <NotFoundPage />
    ) : (
      <App
        initialPath={initialPath}
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
        initialBip39ArticleSource={
          needsBip39ArticleSource(initialPath) ? bip39ArticleSource : ""
        }
      />
    )

  return renderToString(
    <StrictMode>
      <ThemeProvider>{page}</ThemeProvider>
    </StrictMode>
  )
}
