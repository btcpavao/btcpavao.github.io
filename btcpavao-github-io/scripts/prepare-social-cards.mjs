import { createHash } from "node:crypto"
import { copyFile, mkdir, readFile, rm, writeFile } from "node:fs/promises"
import path from "node:path"

const siteUrl = "https://btcpavao.com"
const publicDirectory = new URL("../public/", import.meta.url)
const generatedDirectory = new URL("../public/social-cards/", import.meta.url)
const cacheDirectory = new URL("../.cache/", import.meta.url)
const manifestUrl = new URL("social-card-manifest.json", cacheDirectory)

const sources = {
  homepage: "btcpavao-home-share-v3.jpg",
  default: "og-image-v2.jpg",
  bitcoinCore: "bitcoin-core-entropija-cover-v2-share.jpg",
  longRoad: "long-road-bitcoin-core-cover-share.jpg",
  walletGuide: "bitcoin-core-wallet-guide/10-backup-wallet-menu.webp",
  bip39: "bip39-wrong-thing-cover-share.jpg",
  multisig: "multisig-not-dollar-amount-cover.webp",
  support: "value-for-value-visual.webp",
  startHere: "start-here-bitcoin-core-card.png",
}

await rm(generatedDirectory, { recursive: true, force: true })
await mkdir(generatedDirectory, { recursive: true })
await mkdir(cacheDirectory, { recursive: true })

const assets = {}
const urls = {}

for (const [key, source] of Object.entries(sources)) {
  const sourceUrl = new URL(source, publicDirectory)
  const bytes = await readFile(sourceUrl)
  const hash = createHash("sha256").update(bytes).digest("hex").slice(0, 12)
  const extension = path.extname(source)
  const basename = path.basename(source, extension)
  const filename = `${basename}.${hash}${extension}`
  const publicPath = `/social-cards/${filename}`

  await copyFile(sourceUrl, new URL(filename, generatedDirectory))

  assets[key] = { source, hash, filename, publicPath }
  urls[key] = `${siteUrl}${publicPath}`
}

await writeFile(
  manifestUrl,
  `${JSON.stringify({ assets, urls }, null, 2)}\n`,
  "utf8"
)

console.log(
  `Prepared ${Object.keys(assets).length} fingerprinted social cards.`
)
