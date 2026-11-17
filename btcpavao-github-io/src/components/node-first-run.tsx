import { MessageCircle } from "lucide-react"
import { captures } from "@/curriculum/practice-captures"
import { SignedDownloadCheck } from "./signed-download-check"
import { ZoomableImage } from "./zoomable-image"

export function NodeFirstRun() {
  const sync = captures["node-synced"]
  const backup = captures["node-backup"]
  return (
    <section id="node-setup" className="vault-first-run" aria-labelledby="node-setup-heading">
      <h2 id="node-setup-heading">Set up a dedicated Bitcoin Core Node</h2>
      <p>Use the reproducible Node test image on a spare 64-bit Intel or AMD computer with a disk you can erase. <strong>Installation erases the entire selected disk.</strong> Unplug your backup drives before you begin.</p>
      <SignedDownloadCheck product="Node" />
      <div className="first-run-row my-6">
        <div>
          <h3 className="text-xl font-semibold">Connect Node and open its guide</h3>
          <p className="my-3">After installation, remove the USB and restart. Plug in Ethernet or join Wi-Fi under <strong>Network Status</strong>. Open <strong>Node Guide</strong> on the desktop. Its first chapter shows how the public wallet and payment files move between the computers.</p>
          <a href="#pair-wallets">Follow the watch-only wallet setup</a>
        </div>
        <figure className="first-run-shot">
          <ZoomableImage src="/software/screenshots/node/v0.1.0-rc.2/guide.webp" width={1280} height={800}
            alt="Node Guide opens to Start here: Node &amp; Vault, with steps to pair the public wallet, prepare a payment, sign offline and broadcast online."
            loading="lazy" decoding="async" />
          <figcaption>The built-in guide as it appeared on Node RC2.</figcaption>
        </figure>
      </div>
      <div id="node-status" className="scroll-mt-24 border-t border-border pt-5">
        <h3 className="text-xl font-semibold">Check synchronization and choose what to back up</h3>
        <div className="iso-node-shots">
          <figure>
            <h4>Bitcoin Core Status</h4>
            <ZoomableImage src={sync.src} width={sync.width} height={sync.height} alt={sync.alt} loading="lazy" decoding="async" />
            <figcaption>Look for connected peers and the number of validated blocks. In this RC2 screenshot, Node has caught up with all 112 blocks on a private practice network. Your mainnet Node will show the Bitcoin blockchain’s own height.</figcaption>
          </figure>
          <figure>
            <h4>Backup and Restore</h4>
            <ZoomableImage src={backup.src} width={backup.width} height={backup.height} alt={backup.alt} loading="lazy" decoding="async" />
            <figcaption>The RC2 screenshot shows the backup categories for the watch-only wallet, blockchain data and settings. Keep the signing wallet’s encrypted backup with your offline Vault recovery materials.</figcaption>
          </figure>
        </div>
      </div>
      <nav className="first-run-links" aria-label="Continue from Node setup">
        <a href="#practice-without-funds">Try a payment with both computers</a>
        <a href="#ask-node-setup"><MessageCircle size={18} aria-hidden="true" /> Ask Pavao about Node</a>
      </nav>
    </section>
  )
}
