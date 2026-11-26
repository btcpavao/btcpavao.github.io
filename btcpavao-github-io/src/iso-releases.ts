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

// Historical RC3 evidence belongs to that exact ISO, not the current download.
export const nodeRc3Build = {
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

const nodeTag = "v0.1.0-rc.4"
const nodeReleaseRevision = "83fee141e5c7b42351aa5dab46beeaa853c7f8c5"
const nodeAssets = `${repo}/releases/download/${nodeTag}/`
const nodeIsoName = `bitcoin-core-node-${nodeTag}-core32.1-amd64.iso`

export const nodeBuild = {
  tag: nodeTag,
  repo,
  revision: "8eae47cb3c2c67c7365dcfcc25af44cd5048baf3",
  releaseRevision: nodeReleaseRevision,
  isoName: nodeIsoName,
  bytes: 1800142848,
  downloadSize: "1.80 GB",
  sha256: "b25093180bb9b8f57adf2163634be3473fbc0f5163e9fcb05008651f2e0f6da7",
  signatureStatus: "signed" as "pending" | "signed",
  isoUrl: nodeAssets + nodeIsoName,
  manifestUrl: nodeAssets + "SHA256SUMS",
  signatureUrl: nodeAssets + "SHA256SUMS.asc",
  releaseUrl: `${repo}/releases/tag/${nodeTag}`,
  sourceUrl: nodeAssets + `bitcoin-core-node-${nodeTag}-source.tar.gz`,
  sourceSha256: "c629d565d6b2e999d5c229ccb4cc5fd3f0a1ee0160ce7fcb1655fd96b5defb49",
  sourceCommitUrl: nodeAssets + "SOURCE-COMMIT.txt",
  recipeUrl: nodeAssets + `bitcoin-core-node-${nodeTag}-recipe.tar.gz`,
  instructionsUrl: `${repo}/blob/39bea669788316bca1b1e9bce33e3944423184f1/README.md`,
  proofUrl: nodeAssets + "SOURCE-PROVENANCE.json",
  buildInfoUrl: nodeAssets + "BUILD-INFO.json",
  acceptanceUrl: nodeAssets + "ACCEPTANCE.json",
  limitsUrl: nodeAssets + "TEST-SCOPE-LIMITS.json",
} as const
