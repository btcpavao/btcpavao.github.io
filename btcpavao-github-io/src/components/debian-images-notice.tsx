export const DEBIAN_IMAGES_PATH = "/en/bitcoin-core/debian-images/"

export function DebianImagesNotice({ compact = false }: { compact?: boolean }) {
  return (
    <aside
      id="debian-images"
      className={`debian-images-notice ${compact ? "debian-images-notice--compact" : ""}`}
    >
      <div className="debian-images-notice__copy">
        <p className="debian-images-eyebrow">In development · Coming soon</p>
        <h2>Dedicated Debian images for Bitcoin Core.</h2>
        <p>
          A minimal offline signer, Bitcoin Core Vault for wallet creation and
          encrypted backups, and a dedicated online node. Each environment has a
          specific job.
        </p>
        <p>
          ISO download links and verification instructions will be added here
          and to the relevant curriculum lessons when the images are released.
        </p>
        <a href={DEBIAN_IMAGES_PATH}>See what is coming →</a>
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
