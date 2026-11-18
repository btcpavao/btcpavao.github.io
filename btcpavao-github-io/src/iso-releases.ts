const vaultRepo = "https://github.com/btcpavao/bitcoin-core-vault-releases"
const vaultTag = "v0.8.0"
const vaultRevision = "d0bc35aa9a64d45d5c24a226aa9ba2ec2a315ebf"
const vaultIsoName = `bitcoin-core-vault-${vaultTag}-amd64.iso`
const vaultAssets = `${vaultRepo}/releases/download/${vaultTag}/`

export const vaultBuild = {
  tag: vaultTag,
  repo: vaultRepo,
  revision: vaultRevision,
  sha256: "0bc142508a35172ea92f645decc31be1373b05956e9a17d0ad01cee9bab84857",
  isoName: vaultIsoName,
  isoUrl: vaultAssets + vaultIsoName,
  releaseUrl: `${vaultRepo}/releases/tag/${vaultTag}`,
  signingKeyUrl: vaultAssets + "btcpavao-pgp.asc",
  manifestUrl: vaultAssets + "SHA256SUMS",
  signatureUrl: vaultAssets + "SHA256SUMS.asc",
  instructionsUrl: `${vaultRepo}/blob/${vaultRevision}/docs/REBUILD.md`,
  proofUrl: vaultRepo + "/actions/runs/44328053285/job/134901484375",
  downloadSize: "714 MB",
} as const

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
  downloadSize: "1.28 GB",
  sha256: "8efaf0fb4f05a7a59554855575e24e178f07a3629cea5c9b9bbe6e5f498691b6",
  isoUrl: assetBase + isoName,
  manifestUrl: assetBase + "SHA256SUMS",
  signatureUrl: assetBase + "SHA256SUMS.asc",
  releaseUrl: repo + "/releases/tag/" + tag,
  sourceUrl: assetBase + "bitcoin-core-node-" + tag + "-source.tar.gz",
  instructionsUrl: repo + "/blob/" + revision + "/docs/REBUILD.md",
  proofUrl: repo + "/actions/runs/43015398147/job/130513786522",
} as const
