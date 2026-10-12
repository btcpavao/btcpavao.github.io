import { ConsultingInvitation } from "@/components/consulting-invitation"
import { useEffect } from "react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ValueForValueCard } from "@/components/value-for-value"

const lesson = (slug: string) => `/en/bitcoin-core/self-custody/#lesson/${slug}`

export function DebianImagesPage() {
  useEffect(() => {
    document.documentElement.lang = "en"
    document.title =
      "Dedicated Debian Images for Bitcoin Core — Coming Soon | BTC Pavao"
  }, [])
  return (
    <div className="min-h-screen bg-background text-foreground">
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <SiteHeader />
      <main id="main-content" className="debian-images-page">
        <header>
          <a href="/en/bitcoin-core/">← Bitcoin Core</a>
          <p className="debian-images-eyebrow">In development · Coming soon</p>
          <h1>
            Ordinary hardware.
            <br />A dedicated environment.
          </h1>
          <p className="debian-images-lede">
            I am preparing stripped-down Debian ISO images for three Bitcoin
            Core roles: offline signing, wallet creation and backup, and running
            an online node.
          </p>
          <p>
            Keep the software each role needs. Leave browsing, email and
            unrelated everyday applications on another computer.
          </p>
        </header>
        <div className="debian-role-grid">
          <section id="offline-signer">
            <p className="debian-images-eyebrow">01 · Offline</p>
            <h2>Bitcoin Core offline signer</h2>
            <p>
              A minimal Debian environment for loading or creating a Core
              wallet, reviewing a PSBT and signing it offline. The online node
              does the chain validation and broadcasts the signed transaction.
            </p>
            <p>
              The signer is intended to stay disconnected. No browser, email
              client or general office suite. The offline signing role does not
              need a synchronized blockchain.
            </p>
            <a href={lesson("prepare-offline-signer")}>
              Learn the offline-signer workflow →
            </a>
          </section>
          <section id="vault">
            <p className="debian-images-eyebrow">
              02 · Offline wallet workshop
            </p>
            <h2>Bitcoin Core Vault</h2>
            <p>
              An offline environment for creating, encrypting, backing up and
              restoring Bitcoin Core wallets, with a small set of tools for the
              work around them.
            </p>
            <ul>
              <li>
                <strong>Bitcoin Core</strong> for wallet operations and PSBT
                signing.
              </li>
              <li>
                <strong>KeePassXC</strong> for generating passwords and
                passphrases and managing a password database.
              </li>
              <li>
                <strong>7-Zip and Arqiver</strong> for encrypted backup
                archives, including an outer encryption layer around a wallet
                backup.
              </li>
              <li>
                <strong>Thunar</strong> for files and removable backup media.
              </li>
              <li>
                <strong>Mousepad</strong> for local notes and recovery
                instructions.
              </li>
              <li>
                <strong>Brasero</strong> for optical backup media.
              </li>
              <li>
                <strong>CUPS and printer tools</strong> for locally printed
                recovery material.
              </li>
            </ul>
            <p className="debian-detail">
              These tools are present in the current Vault build configuration.
              The release manifest will document the exact contents of each
              published image.
            </p>
            <a href={lesson("more-copies-do-not-mean-a-current-backup")}>
              Learn the backup and recovery workflow →
            </a>
          </section>
          <section id="online-node">
            <p className="debian-images-eyebrow">03 · Online</p>
            <h2>Dedicated Bitcoin Core node</h2>
            <p>
              A separate minimal Debian image for running an online Bitcoin Core
              node: validating the chain, maintaining the watch-only wallet,
              constructing PSBTs and broadcasting signed transactions.
            </p>
            <p>
              Planned without a browser, email client or unrelated desktop
              applications. Networking serves the node and its deliberate
              maintenance. In the offline-signing architecture, the private
              signing keys stay on the offline machine.
            </p>
            <a href={lesson("online-node-and-offline-signer")}>
              Understand the two-machine architecture →
            </a>
          </section>
        </div>
        <section className="debian-release-plan" id="release-status">
          <p className="debian-images-eyebrow">
            Release status · October 12, 2026
          </p>
          <h2>The images are coming. The learning path is already open.</h2>
          <p>
            The new ISO downloads are not available on this page yet. When
            released, each image will have its own download link, version
            information, checksums and verification instructions. The same links
            will be placed in the curriculum where you prepare the operating
            system, set up the signer or node, and practice wallet backup and
            recovery.
          </p>
          <p>
            You can follow the existing Debian and Bitcoin Core lessons now. The
            prepared images are intended to reduce setup work; understanding the
            environment and proving recovery remain part of the process.
          </p>
          <p>
            These are independent BTC Pavao projects built around Debian and
            Bitcoin Core, not official releases of either project. The release
            documentation will distinguish the live-session and installation
            workflows and state what persists after shutdown.
          </p>
          <a href="/en/bitcoin-core/self-custody/">
            Start the Bitcoin Core curriculum →
          </a>
        </section>
        <ConsultingInvitation
          className="mt-14"
          question="What would a simpler custody setup look like for you?"
          detail="We can work through your threat model, Bitcoin Core workflow, backup and recovery plan, or the authority your spending policy needs to express."
        />
        <ValueForValueCard language="en" className="mt-14" />
      </main>
      <SiteFooter />
    </div>
  )
}
