const vaultRepo = "https://github.com/btcpavao/bitcoin-core-vault-releases"
const vaultTag = "v0.9.0"
const vaultRevision = "58f873fa727054f262b2f99bf742aff251cc5672"
const vaultIsoName = `bitcoin-core-vault-${vaultTag}-amd64.iso`
const vaultAssets = `${vaultRepo}/releases/download/${vaultTag}/`

export const vaultBuild = {
  tag: vaultTag,
  repo: vaultRepo,
  revision: vaultRevision,
  sha256: "615067c09f573a4476c7039adc90e58f75a46bdf20a028fd3c58f3e300c832fe",
  isoName: vaultIsoName,
  isoUrl: vaultAssets + vaultIsoName,
  releaseUrl: `${vaultRepo}/releases/tag/${vaultTag}`,
  signingKeyUrl: vaultAssets + "btcpavao-pgp.asc",
  manifestUrl: vaultAssets + "SHA256SUMS",
  signatureUrl: vaultAssets + "SHA256SUMS.asc",
  instructionsUrl: `${vaultRepo}/blob/${vaultRevision}/docs/REBUILD.md`,
  proofUrl: vaultAssets + "BUILD-PROVENANCE.json",
  sourceUrl: vaultAssets + `bitcoin-core-vault-${vaultTag}-source.tar.gz`,
  downloadSize: "1.13 GB",
} as const

const repo = "https://github.com/btcpavao/bitcoin-core-node-releases"
const revision = "dc82242379bc9c6f8c7d7c60d94a0dbb69bdd1e0"
const tag = "v0.1.0-rc.3"
const assetBase = repo + "/releases/download/" + tag + "/"
const isoName = "bitcoin-core-node-" + tag + "-core32.1-amd64.iso"

export const nodeBuild = {
  tag,
  revision,
  repo,
  isoName,
  downloadSize: "1.29 GB",
  sha256: "39e9b5b76dce7d9854989365d389caa50d55f0b0c5654602eafc7e12904b6675",
  isoUrl: assetBase + isoName,
  manifestUrl: assetBase + "SHA256SUMS",
  signatureUrl: assetBase + "SHA256SUMS.asc",
  releaseUrl: repo + "/releases/tag/" + tag,
  sourceUrl: assetBase + "bitcoin-core-node-" + tag + "-source.tar.gz",
  instructionsUrl: repo + "/blob/" + revision + "/docs/REBUILD.md",
  proofUrl: repo + "/actions/runs/44714236174/job/136224300463",
} as const
