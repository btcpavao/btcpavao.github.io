import { articles } from "./published-articles/data"
import entropy from "./bitcoin-core-article-en.txt?raw"
import bip39 from "./bip39-wrong-thing-human-readable.md?raw"
import longRoad from "./long-road-back-to-bitcoin-core.md?raw"
import multisig from "./multisig-is-not-a-dollar-amount.md?raw"
import {
  EN_BITCOIN_CORE_ENTROPY_ARTICLE_PATH,
  BIP39_WRONG_THING_ARTICLE_PATH,
  LONG_ROAD_BITCOIN_CORE_ARTICLE_PATH,
  MULTISIG_NOT_DOLLAR_AMOUNT_ARTICLE_PATH,
} from "./routes"

// Loaded on the first search, so article bodies stay out of the initial bundle.
export const essayBodies: Record<string, string> = {
  ...Object.fromEntries(articles.map(article => [article.path,
    article.blocks.map(block => block.html ?? block.caption ?? block.alt ?? "")
      .join(" ").replace(/<[^>]*>/g, " ").replace(/&[^;]+;/g, " "),
  ])),
  [EN_BITCOIN_CORE_ENTROPY_ARTICLE_PATH]: entropy,
  [BIP39_WRONG_THING_ARTICLE_PATH]: bip39,
  [LONG_ROAD_BITCOIN_CORE_ARTICLE_PATH]: longRoad,
  [MULTISIG_NOT_DOLLAR_AMOUNT_ARTICLE_PATH]: multisig,
}
