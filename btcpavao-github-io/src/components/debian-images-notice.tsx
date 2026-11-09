export const DEBIAN_IMAGES_PATH = "/en/bitcoin-core/debian-images/"

export function DebianImagesNotice({ compact = false }: { compact?: boolean }) {
  return (
    <aside
      id="debian-images"
      className={`debian-images-notice ${compact ? "debian-images-notice--compact" : ""}`}
    >
      <div className="debian-images-notice__copy">
        <p className="debian-images-eyebrow">Available now · Vault and Node test images</p>
        <h2>Dedicated Debian images for Bitcoin Core.</h2>
        <p>
          Bitcoin Core Vault v0.4.0 and the Bitcoin Core Node v0.1.0-rc.1
          test image are available with signed SHA-256 manifests and matching
          source snapshots. View screenshots of both environments and choose
          the one that fits the task.
        </p>
        <p>
          Verify the PGP signing key and ISO checksum before flashing.
          Installing the online Node erases the selected disk. Start with a
          disposable wallet and prove a backup and restore before relying on it.
        </p>
        <a href={DEBIAN_IMAGES_PATH}>Downloads and verification →</a>
      </div>
      <div className="debian-images-notice__art">
        <a
          className="debian-images-notice__debian"
          href="https://www.debian.org/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="debian-software-icon">
            <img src="/software/debian.svg" alt="" width="48" height="48" loading="lazy" decoding="async" />
          </span>
          <span>Debian GNU/Linux</span>
        </a>
        <img
          className="debian-images-notice__tux"
          src="/illustrations/tux-bitcoin.webp"
          alt="Linux Tux with the orange Bitcoin logo on his belly"
          width="600"
          height="670"
          loading="lazy"
          decoding="async"
        />
      </div>
    </aside>
  )
}
