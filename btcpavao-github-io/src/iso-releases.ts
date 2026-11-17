const repo = "https://github.com/btcpavao/bitcoin-core-node-releases"
const revision = "e6519d7e5e956aa62512294389a9db2cd0a60a96"
const tag = "rebuild-" + revision.slice(0, 12)
const assetBase = repo + "/releases/download/" + tag + "/"
const isoName = "bitcoin-core-node-" + tag + "-core32.1-amd64.iso"

export const nodeBuild = {
  tag,
  revision,
  repo,
  isoName,
  sha256: "8efaf0fb4f05a7a59554855575e24e178f07a3629cea5c9b9bbe6e5f498691b6",
  isoUrl: assetBase + isoName,
  manifestUrl: assetBase + "SHA256SUMS",
  signatureUrl: assetBase + "SHA256SUMS.asc",
  releaseUrl: repo + "/releases/tag/" + tag,
  sourceUrl: assetBase + "bitcoin-core-node-" + tag + "-source.tar.gz",
  instructionsUrl: repo + "/blob/" + revision + "/docs/REBUILD.md",
  proofUrl: repo + "/actions/runs/43015398147/job/130513786522",
} as const
