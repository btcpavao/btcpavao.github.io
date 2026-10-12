export const DEBIAN_IMAGES_PATH = "/en/bitcoin-core/debian-images/"

export function DebianImagesNotice({ compact = false }: { compact?: boolean }) {
  return (
    <aside
      className={`debian-images-notice ${compact ? "debian-images-notice--compact" : ""}`}
    >
      <p className="debian-images-eyebrow">In development · Coming soon</p>
      <h2>Dedicated Debian images for Bitcoin Core.</h2>
      <p>
        A minimal offline signer, Bitcoin Core Vault for wallet creation and
        encrypted backups, and a dedicated online node. Each environment has a
        specific job.
      </p>
      <p>
        ISO download links and verification instructions will be added here and
        to the relevant curriculum lessons when the images are released.
      </p>
      <a href={DEBIAN_IMAGES_PATH}>See what is coming →</a>
    </aside>
  )
}
