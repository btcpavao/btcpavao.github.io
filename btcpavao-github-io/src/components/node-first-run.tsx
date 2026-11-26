import { MessageCircle } from "lucide-react"
import { captures } from "@/curriculum/practice-captures"
import { SignedDownloadCheck } from "./signed-download-check"
import { ZoomableImage } from "./zoomable-image"

export function NodeFirstRun() {
  const guide = captures["node-guide"]
  const peers = captures["node-peers"]
  const settings = captures["node-settings"]
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
          <ZoomableImage src={guide.src} fullSrc={guide.fullSrc} width={guide.width} height={guide.height} alt={guide.alt} loading="lazy" decoding="async" />
          <figcaption>{guide.context}. {guide.caption}</figcaption>
        </figure>
      </div>
      <div id="node-status" className="scroll-mt-24 border-t border-border pt-5">
        <h3 className="text-xl font-semibold">Check Bitcoin Core and backups</h3>
        <div className="iso-node-shots">
          <figure>
            <h4>Read Core’s network state</h4>
            <ZoomableImage src={peers.src} fullSrc={peers.fullSrc} width={peers.width} height={peers.height} alt={peers.alt} loading="lazy" decoding="async" />
            <figcaption>{peers.context}. {peers.caption}</figcaption>
          </figure>
          <figure>
            <h4>Backup and Restore</h4>
            <ZoomableImage src={backup.src} fullSrc={backup.fullSrc} width={backup.width} height={backup.height} alt={backup.alt} loading="lazy" decoding="async" />
            <figcaption>{backup.context}. {backup.caption} Keep the signing wallet’s encrypted backup with the offline Vault recovery materials.</figcaption>
          </figure>
        </div>
        <details className="signed-download-check">
          <summary>Find Backup and Restore in Settings</summary>
          <div className="signed-download-check__body">
            <figure className="first-run-shot">
              <ZoomableImage src={settings.src} fullSrc={settings.fullSrc} width={settings.width} height={settings.height} alt={settings.alt} loading="lazy" decoding="async" />
              <figcaption>{settings.caption}</figcaption>
            </figure>
          </div>
        </details>
      </div>
      <nav className="first-run-links" aria-label="Continue from Node setup">
        <a href="#practice-without-funds">See a payment signed with both computers</a>
        <a href="#ask-node-setup"><MessageCircle size={18} aria-hidden="true" /> Ask Pavao about Node</a>
      </nav>
    </section>
  )
}
