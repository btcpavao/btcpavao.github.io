import { ArrowUpRight, LockKeyhole, Network } from "lucide-react"
import { ZoomableImage } from "./zoomable-image"
import "./iso-system-roles.css"

export function IsoSystemRoles() {
  return (
    <section className="iso-system-roles" id="systems" aria-labelledby="systems-heading">
      <h2 id="systems-heading">Inside Vault and Node</h2>
      <p className="iso-roles-intro">
        I built both systems around Bitcoin Core, the reference implementation of the Bitcoin protocol,
        and Debian Stable, a Linux distribution long used on servers. I chose Debian for its
        conservative release cycle and security maintenance. Leaving out the browser and office
        suite keeps everyday downloads and documents off the machines that handle the wallet.
      </p>
      <div className="iso-roles-grid">
        <article className="iso-role-profile" aria-labelledby="vault-role-heading">
          <header>
            <p className="iso-role-mode"><LockKeyhole aria-hidden="true" /> Offline signer</p>
            <h3 id="vault-role-heading">Bitcoin Core Vault</h3>
          </header>
          <p className="iso-role-summary">
            Create the wallet on Vault. Its network services are disabled and its firewall
            blocks traffic to and from other computers.
          </p>
          <figure>
            <ZoomableImage src="/software/screenshots/vault/v0.7.0/encrypted-backup-usb-full.webp"
              alt="Vault’s Create Encrypted Backup window with a passphrase, an optional encryption layer and the TRANSFER USB selected as the destination."
              width={1280} height={800} loading="lazy" decoding="async" />
            <figcaption>Saving an encrypted wallet backup directly to USB on Vault v0.7.0.</figcaption>
          </figure>
          <dl>
            <div>
              <dt>Work in RAM</dt>
              <dd>Boot the live system from USB. The working wallet stays in memory and disappears
                at shutdown. An encrypted backup saved to a separate drive survives the session.</dd>
            </div>
            <div>
              <dt>Make a backup you can recover</dt>
              <dd>KeePassXC generates random passphrases. GnuPG encrypts the whole wallet backup.
                Use Brasero to write a copy to a disc, or write recovery notes in Mousepad and
                print them locally with CUPS.</dd>
            </div>
          </dl>
          <a className="iso-role-action" href="#first-run">Try Vault from USB <ArrowUpRight aria-hidden="true" /></a>
        </article>

        <article className="iso-role-profile" aria-labelledby="node-role-heading">
          <header>
            <p className="iso-role-mode"><Network aria-hidden="true" /> Online node</p>
            <h3 id="node-role-heading">Bitcoin Core Node</h3>
          </header>
          <p className="iso-role-summary">
            Connect over Ethernet or Wi-Fi. You can also import a WireGuard VPN configuration. Bitcoin Core
            validates blocks and uses a watch-only copy of your wallet to track payments.
          </p>
          <figure>
            <ZoomableImage src="/software/screenshots/curriculum/node-backup-categories.webp"
              alt="Node’s Backup and Restore window offers separate Backup and Restore buttons for the blockchain, watch-only wallets, Bitcoin Core configuration and Node configuration."
              width={1280} height={800} loading="lazy" decoding="async" />
            <figcaption>The four backup options in this earlier Node RC2 screenshot. Open Settings → Backup and Restore on the current Node.</figcaption>
          </figure>
          <dl>
            <div>
              <dt>Move a node to another computer</dt>
              <dd>Export the blocks and chainstate from your own synced Node. Restore that copy
                on the new Node and it downloads what arrived since the backup. A pruned backup
                contains the blocks you retained. You can also move watch-only wallets,
                Core preferences and portable Node settings.</dd>
            </div>
            <div>
              <dt>Keep transfer files temporary</dt>
              <dd>Private Workspace holds temporary files, including PSBTs, in RAM. Files saved there
                disappear at shutdown. The blockchain, watch-only wallet and settings remain on disk.</dd>
            </div>
          </dl>
          <a className="iso-role-action" href="#node-setup">Set up the online Node <ArrowUpRight aria-hidden="true" /></a>
        </article>
      </div>

      <div className="iso-payment-path" aria-labelledby="iso-payment-path-heading">
        <h3 id="iso-payment-path-heading">How a payment moves between them</h3>
        <p>Export the watch-only wallet from Vault once and open it on Node.
          Each payment then travels on USB as a partially signed Bitcoin transaction (PSBT).</p>
        <ol>
          <li><strong>Prepare on Node</strong><span>Enter the recipient and amount. Save the unsigned PSBT to the transfer USB.</span></li>
          <li><strong>Review and sign on Vault</strong><span>Check the full address, amount, change and fee. Save the signed file to the USB.</span></li>
          <li><strong>Broadcast on Node</strong><span>Open the signed file in Bitcoin Core and send it to the network.</span></li>
        </ol>
        <a className="iso-role-action" href="#practice-without-funds">Follow a real test payment on screen <ArrowUpRight aria-hidden="true" /></a>
      </div>
    </section>
  )
}
