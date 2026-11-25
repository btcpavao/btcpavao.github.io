import { vaultBuild } from "../iso-releases"
export const DEBIAN_IMAGES_PATH = "/en/bitcoin-core/debian-images/"

export function DebianImagesNotice({ compact = false }: { compact?: boolean }) {
  return (
    <aside
      id="debian-images"
      className={`debian-images-notice ${compact ? "debian-images-notice--compact" : ""}`}
    >
      <div className="debian-images-notice__copy">
        <p className="debian-images-eyebrow">Available now · Vault release and Node test image</p>
        <h2>Dedicated Debian images for Bitcoin Core.</h2>
        <p>
          Vault {vaultBuild.tag} keeps your wallet offline for signing and encrypted backups.
          The reproducible Node test image runs Bitcoin Core on a dedicated online computer to verify
          the blockchain, prepare payments and broadcast them after you sign on Vault.
        </p>
        <p>
          Both downloads have public rebuild instructions. Before writing your USB,
          verify the signature on the checksum list for your chosen release using Pavao’s confirmed key,
          then compare your ISO with its SHA-256 entry.
          Installing the online Node erases the selected disk. Start with a
          disposable wallet and prove a backup and restore before relying on it.
        </p>
        <div className="debian-notice-links">
          <a href={DEBIAN_IMAGES_PATH}>Downloads and verification →</a>
          <a href="/en/bitcoin-core/self-custody/?setup=vault-node#lesson/prepare-offline-signer">Follow the Vault and Node walkthrough →</a>
        </div>
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
