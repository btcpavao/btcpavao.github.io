import { MessageCircle } from "lucide-react"
import { captures } from "@/curriculum/practice-captures"
import { SignedDownloadCheck } from "./signed-download-check"
import { ZoomableImage } from "./zoomable-image"

export function NodeFirstRun() {
  const sync = captures["node-synced"]
  const backup = captures["node-backup"]
  return (
    <section id="node-setup" className="vault-first-run" aria-labelledby="node-setup-heading">
      <h3 id="node-setup-heading" className="text-xl font-semibold">What you need for the Node test release</h3>
      <ul className="my-3 max-w-prose list-disc space-y-1 pl-5 leading-7">
        <li>A spare <strong>64-bit Intel or AMD computer</strong> with Ethernet or compatible Wi-Fi.</li>
        <li>A <strong>USB stick you can erase</strong> to prepare the installer on a Windows, macOS or Debian computer.</li>
        <li>A <strong>dedicated destination disk</strong>. Installation erases that entire disk. Disconnect backup drives before starting.</li>
      </ul>
      <SignedDownloadCheck product="Node" />
      <div className="first-run-row my-6">
        <div>
          <h3 className="text-xl font-semibold">Open Bitcoin Core and start syncing</h3>
          <p className="my-3">On the installed Node, connect to the internet and open <strong>Bitcoin Core</strong>. It will download and validate blocks. While it syncs, open <strong>Node Guide</strong> on the desktop to learn how to pair a watch-only wallet.</p>
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
        <h3 className="text-xl font-semibold">Check synchronization and backups</h3>
        <div className="iso-node-shots">
          <figure>
            <h4>Earlier synchronization example</h4>
            <ZoomableImage src={sync.src} width={sync.width} height={sync.height} alt={sync.alt} loading="lazy" decoding="async" />
            <figcaption>This historical RC2 screen shows 112 blocks on a private practice network. On the current Node, check synchronization in Bitcoin Core; its desktop does not include this separate status panel.</figcaption>
          </figure>
          <figure>
            <h4>Backup and Restore</h4>
            <ZoomableImage src={backup.src} width={backup.width} height={backup.height} alt={backup.alt} loading="lazy" decoding="async" />
            <figcaption>This earlier RC2 screen illustrates wallet, blockchain and settings backups. On the current Node, open Settings → Backup and Restore. Keep the signing wallet’s encrypted backup with the offline Vault recovery materials.</figcaption>
          </figure>
        </div>
      </div>
      <nav className="first-run-links" aria-label="Continue from Node setup">
        <a href="#practice-without-funds">See a payment signed with both computers</a>
        <a href="#ask-node-setup"><MessageCircle size={18} aria-hidden="true" /> Ask Pavao about Node</a>
      </nav>
    </section>
  )
}
