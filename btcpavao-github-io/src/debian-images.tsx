import { DebianImageVerification } from "./debian-image-verification"
import { Archive, LockKeyhole } from "lucide-react"
import { ConsultingInvitation } from "@/components/consulting-invitation"
import { useEffect } from "react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ValueForValueCard } from "@/components/value-for-value"

const lesson = (slug: string) => `/en/bitcoin-core/self-custody/#lesson/${slug}`

const vaultRelease = "https://github.com/btcpavao/bitcoin-core-vault-releases/releases/tag/v0.6.0"
const nodeRelease = "https://github.com/btcpavao/bitcoin-core-node-releases/releases/tag/v0.1.0-rc.2"
const nodeIso = "https://github.com/btcpavao/bitcoin-core-node-releases/releases/download/v0.1.0-rc.2/bitcoin-core-node-v0.1.0-rc.2-core32.1-amd64.iso"
const vaultIso = "https://github.com/btcpavao/bitcoin-core-vault-releases/releases/download/v0.6.0/bitcoin-core-vault-v0.6.0-amd64.iso"


const software = {
  debian: {
    name: "Debian GNU/Linux",
    url: "https://www.debian.org/",
    logo: "/software/debian.svg",
  },
  core: {
    name: "Bitcoin Core",
    url: "https://bitcoincore.org/",
    logo: "/bitcoin-logo.svg",
  },
  keepassxc: {
    name: "KeePassXC",
    url: "https://keepassxc.org/",
    logo: "/software/keepassxc.png",
  },
  gnupg: {
    name: "GnuPG",
    url: "https://gnupg.org/",
  },
  tar: {
    name: "GNU TAR",
    url: "https://www.gnu.org/software/tar/",
  },
  thunar: {
    name: "Thunar",
    url: "https://docs.xfce.org/xfce/thunar/start",
    logo: "/software/thunar.png",
  },
  mousepad: {
    name: "Mousepad",
    url: "https://docs.xfce.org/apps/mousepad/start",
    logo: "/software/mousepad.png",
  },
  brasero: {
    name: "Brasero",
    url: "https://gitlab.gnome.org/GNOME/brasero",
    logo: "/software/brasero.png",
  },
  cups: {
    name: "CUPS",
    url: "https://openprinting.github.io/cups/",
    logo: "/software/cups.png",
  },
}
type SoftwareId = keyof typeof software

function SoftwareLink({ id }: { id: SoftwareId }) {
  return (
    <a href={software[id].url} target="_blank" rel="noopener noreferrer">
      {software[id].name}
    </a>
  )
}

function SoftwareRow({ ids, label }: { ids: SoftwareId[]; label: string }) {
  return (
    <nav className="debian-software-row" aria-label={label}>
      {ids.map((id) => (
        <a
          key={id}
          href={software[id].url}
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="debian-software-icon">
            {id === "gnupg" ? (
              <LockKeyhole className="size-8 text-[#0d3153]" aria-hidden="true" />
            ) : id === "tar" ? (
              <Archive className="size-8 text-[#0d3153]" aria-hidden="true" />
            ) : <img
              src={software[id].logo}
              alt=""
              width="48"
              height="48"
              loading="lazy"
              decoding="async"
            />}
          </span>
          <span>{software[id].name}</span>
        </a>
      ))}
    </nav>
  )
}

const productScreenshots = {
  vault: {
    name: "Bitcoin Core Vault",
    version: "v0.6.0",
    images: [
      { file: "v0.6.0/home", title: "Your offline workspace", description: "Bitcoin Core, encrypted backup and recovery tools in one private workspace.", alt: "Bitcoin Core Vault home with Bitcoin Core, Wallet Backup, Decrypt Backup, KeePassXC and offline utilities" },
      { file: "v0.5.0/guide", title: "Practical Vault Guide", description: "Start with the complete wallet, backup, watch-only Node and offline signing workflow.", alt: "Bitcoin Core Vault v0.5.0 installed Guide showing the Vault-to-Node flow and chapter navigation" },
      { file: "v0.6.0/backup", title: "Wallet Backup", description: "Choose Private Workspace or a connected USB drive under Save to.", alt: "Create Encrypted Backup in Vault with the Save to menu showing Private Workspace and the TRANSFER USB drive" },
    ],
  },
  node: {
    name: "Bitcoin Core Node",
    version: "v0.1.0-rc.1 (earlier interface preview)",
    images: [
      { file: "home", title: "Your node at a glance", description: "A dedicated home for Bitcoin Core and the tools around it.", alt: "Bitcoin Core Node home with node controls, workspace and utility launchers" },
      { file: "settings", title: "Settings in one place", description: "Manage the environment from the Node settings interface.", alt: "Bitcoin Core Node settings with its available configuration controls" },
      { file: "guide", title: "A guide beside your node", description: "Read the built-in guide while setting up and using the Node.", alt: "Bitcoin Core Node Guide with its navigation sidebar and setup instructions" },
    ],
  },
}

function ProductScreenshots({ product }: { product: keyof typeof productScreenshots }) {
  const { name, version, images } = productScreenshots[product]
  const basePath = `/software/screenshots/${product}`
  return (
    <div className="product-screenshots" aria-label={`${name} screenshots`}>
      <p className="product-screenshots-intro">Inside {name} · {version}. Open any image for the full-size screenshot.</p>
      <div className="product-screenshots-grid">
        {images.map(({ file, title, description, alt }) => (
          <figure key={file}>
            <a href={`${basePath}/${file}.png`} aria-label={`View full-size screenshot: ${title}`}>
              <img src={`${basePath}/${file}.webp`} alt={alt} width={1280} height={file === "v0.6.0/backup" ? 760 : 800} loading="lazy" decoding="async" />
            </a>
            <figcaption><strong>{title}</strong><span>{description}</span></figcaption>
          </figure>
        ))}
      </div>
      <p className="product-screenshots-note">{product === "vault"
        ? "Home shows the installed v0.6.0 release. Wallet Backup shows the same 0.7.5 backup application included in v0.6.0, using a test USB drive. The Guide overview was captured in v0.5.0."
        : "Captured from the released image in a demonstration session. No personal wallets or funds are shown. Node is shown without a network connection, with the optional Backup and Restore Home shortcut enabled."}</p>
    </div>
  )
}

export function DebianImagesPage() {
  useEffect(() => {
    document.documentElement.lang = "en"
    document.title =
      "Bitcoin Core Debian Images — Verified Downloads | BTC Pavao"
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
          <p className="debian-images-eyebrow">Vault v0.6.0 released · Node v0.1.0-rc.2 available for testing</p>
          <h1>
            Ordinary hardware.
            <br />A dedicated environment.
          </h1>
          <img
            className="debian-images-header-tux"
            src="/illustrations/tux-bitcoin.webp"
            alt="Tux, the Linux penguin, with the Bitcoin logo on its belly"
            width="600"
            height="670"
            decoding="async"
          />
          <p className="debian-images-lede">
            Download prepared Debian images for two distinct Bitcoin Core
            roles: Bitcoin Core Vault for offline wallet work and an installed
            Bitcoin Core Node for online validation.
          </p>
          <p>
            Keep the software each role needs. Leave browsing, email and
            unrelated everyday applications on another computer. For meaningful
            funds, I recommend dedicated hardware with a fresh Linux installation.
            A clean antivirus scan does not make a daily computer a trusted
            environment for wallet secrets.
          </p>
        </header>
        <nav className="debian-product-nav" aria-label="Debian images and verification">
          <a href="#vault">Vault · Offline wallet work</a>
          <a href="#online-node">Node · Online validation</a>
          <a href="#verify-the-build">Verify or rebuild an image</a>
        </nav>
        <div className="debian-role-grid">
          <section id="vault">
            <p className="debian-images-eyebrow">
              01 · Offline · Live RAM or installed
            </p>
            <h2>Bitcoin Core Vault</h2>
            <p>
              An offline environment for creating, encrypting, backing up and
              restoring Bitcoin Core wallets. Use it live in RAM, or install its
              operating system with{" "}
              <a href="https://calamares.io/">Calamares</a>. Both modes keep the
              Vault account’s home and private working data in RAM. An
              installation preserves Debian and the applications on the internal
              disk; the private session starts fresh.
            </p>
            <ProductScreenshots product="vault" />
            <SoftwareRow
              ids={[
                "debian",
                "core",
                "keepassxc",
                "gnupg",
                "tar",
                "thunar",
                "mousepad",
                "brasero",
                "cups",
              ]}
              label="Bitcoin Core Vault software — official projects"
            />
            <ul>
              <li>
                <strong>
                  <SoftwareLink id="core" />
                </strong>{" "}
                for wallet operations and PSBT signing.
              </li>
              <li>
                <strong>
                  <SoftwareLink id="keepassxc" />
                </strong>{" "}
                for generating passwords and passphrases and managing a password
                database.
              </li>
              <li>
                <strong>
                  <SoftwareLink id="gnupg" />
                </strong>{" "}
                for symmetric encryption of the whole backup: one GPG layer by
                default, with additional independently protected layers when needed.
              </li>
              <li>
                <strong><SoftwareLink id="tar" /></strong>{" "}
                for packaging files and folders before encryption. TAR is
                packaging, not encryption; Vault is intended to handle it for you.
              </li>
              <li>
                <strong>
                  <SoftwareLink id="thunar" />
                </strong>{" "}
                for files and removable backup media.
              </li>
              <li>
                <strong>
                  <SoftwareLink id="mousepad" />
                </strong>{" "}
                for local notes and recovery instructions.
              </li>
              <li>
                <strong>
                  <SoftwareLink id="brasero" />
                </strong>{" "}
                for optical backup media.
              </li>
              <li>
                <strong>
                  <SoftwareLink id="cups" /> and printer tools
                </strong>{" "}
                for locally printed recovery material.
              </li>
            </ul>
            <div className="debian-session-note">
              <h3>GPG backups, with independent layers when needed</h3>
              <p>
                The current Vault release uses standard OpenPGP encryption around
                a verified Core wallet snapshot or, for multiple files, a TAR
                archive. Its default symmetric AES-256 CFB+MDC format is
                compatible with standard GnuPG. Additional layers can use
                independent passphrases; the Core wallet passphrase remains a
                separate secret. Outer filenames, sizes and timestamps still
                reveal metadata.
              </p>
              <p>
                Multiple layers require every layer’s secret. Keep redundant
                recovery records and separate locations deliberately; storing all
                passphrases together defeats that separation. This protects backup
                access, not Bitcoin signing authority, and is not multisig. Only
                the final outermost file belongs in distributed backup storage.
              </p>
              <p>
                Recovery is designed to work without Vault: decrypt each layer
                with compatible standard GnuPG, extract TAR when present, then
                restore the wallet in Core. Follow the current release notes
                for the tested format and practice a full, independent recovery
                before relying on the backup.
              </p>
              <a href="/en/bitcoin-core/wallet-setup-backup-recovery/#optional-backup-protection">
                Practise GPG backup and recovery now →
              </a>
            </div>
            <div className="debian-session-note">
              <h3>A stateless private session</h3>
              <p>
                Wallets, password databases, settings and temporary working
                files stay in the RAM workspace. Swap, hibernation and
                persistent crash dumps are disabled in the current
                configuration, and session logs are volatile. Core’s launcher
                restricts writes to checked RAM locations.
              </p>
              <p>
                In Wallet Backup, use <strong>Save to</strong> to create an encrypted backup
                directly on a mounted USB drive. In Decrypt Backup, <strong>Recover to</strong> defaults
                to Private Workspace. Choosing USB leaves the recovered file on that drive
                without the backup’s outer GPG protection. Export the ciphertext
                to USB, optical or other removable media, along with any notes,
                KeePassXC databases or signed PSBT files you want to retain.
                Finish Private Session warns before discarding RAM; it does not
                prove you have a current, recoverable backup. Shutdown, restart
                or power loss loses anything left only in RAM.
              </p>
              <details>
                <summary>What “stateless” covers</summary>
                <p>
                  It describes the private working session, not every possible
                  write a user can make. Exported backups remain on their
                  destination media. Tools such as the file manager and text
                  editor can also write elsewhere if you deliberately choose
                  another destination; use Private Workspace for temporary
                  sensitive files. Ending the session does not erase old disk
                  contents or certify physical RAM sanitization.
                </p>
              </details>
            </div>
            <p className="debian-detail">
              Bitcoin Core Vault v0.6.0 is available now, with Bitcoin Core
              32.1, a matching source snapshot, tests and signed checksums.
              The release tag builds the same ISO available from the download button.
              Verify the signed checksum before flashing or comparing a local rebuild.
            </p>
            <div className="debian-download-panel">
              <p className="debian-images-eyebrow">Available · Vault v0.6.0</p>
              <h3>Download Bitcoin Core Vault</h3>
              <p>Offline wallet creation, encrypted backup and recovery, plus PSBT signing. Reproducible Debian 13.7 image · amd64 · Live RAM or installed.</p>
              <nav className="debian-release-links" aria-label="Bitcoin Core Vault download links">
                <a href={vaultIso}>Download Vault ISO</a>
                <a href={vaultRelease}>Checksums, signature &amp; source</a>
                <a href="#verify-download">How to verify this ISO</a>
              </nav>
            </div>
            <a href={lesson("more-copies-do-not-mean-a-current-backup")}>
              Learn the backup and recovery workflow →
            </a>
          </section>
          <section id="online-node">
            <p className="debian-images-eyebrow">02 · Online</p>
            <h2>Bitcoin Core Node</h2>
            <p>
              A separate minimal <a href="https://www.debian.org/">Debian</a>{" "}
              image for running an online <SoftwareLink id="core" /> node:
              validating the chain, maintaining the watch-only wallet,
              constructing PSBTs and broadcasting signed transactions.
            </p>
            <p>
              The release candidate provides a dedicated installed Node without
              a general-purpose browser or email client. Its networking serves
              Bitcoin validation and deliberate software maintenance. Private
              signing keys belong on a separate offline signer.
            </p>
            <p>
              Blockchain data, watch-only wallets and Node configuration persist
              after reboot. Private Workspace and the PSBT Transfer Folder are
              RAM-only. Backup and Restore can export a blockchain copy, public
              wallets and selected portable configuration to removable media.
            </p>
            <p>
              Node v0.1.0-rc.2 includes a practical 19-chapter guide for the
              watch-only wallet, PSBT signing and recovery workflow. Backups
              in all four Backup and Restore categories finish after writing
              and flushing, without a separate USB read-back pass. Restore
              checks remain enabled; periodically test a saved backup yourself.
            </p>
            <ProductScreenshots product="node" />
            <SoftwareRow
              ids={["debian", "core", "keepassxc", "gnupg", "thunar", "mousepad"]}
              label="Online node software — official projects"
            />
            <div className="debian-download-panel">
              <p className="debian-images-eyebrow">Test release · Node v0.1.0-rc.2</p>
              <h3>Download Bitcoin Core Node</h3>
              <p>Bitcoin Core 32.1 on Debian 13 · amd64. The installer erases
              the selected drive. Verify the signed checksum manifest before
              flashing, and test with disposable wallets first.</p>
              <nav className="debian-release-links" aria-label="Bitcoin Core Node release links">
                <a href={nodeIso}>Download Node ISO</a>
                <a href={nodeRelease}>Checksums, PGP signature &amp; source</a>
                <a href="#verify-download">How to verify this ISO</a>
              </nav>
              <p className="debian-detail">Preview release, not independently
                audited or reproducibility-certified. Apple Silicon, T2 Macs,
                Secure Boot and some Broadcom Wi-Fi adapters are not certified.</p>
            </div>
            <a href={lesson("online-node-and-offline-signer")}>
              Understand the two-machine architecture →
            </a>
          </section>
        </div>
        <DebianImageVerification />
        <section className="debian-release-plan" id="release-status">
          <p className="debian-images-eyebrow">
            Release status · November 13, 2026
          </p>
          <h2>Download, verify, then test the recovery path.</h2>
          <p>
            Vault v0.6.0 is published and Node v0.1.0-rc.2 is available as a
            test release. Both offer ISO downloads, source snapshots and
            signed checksum files. These downloads are not an endorsement of untested
            hardware or a substitute for practicing recovery.
          </p>
          <p>
            The illustrated curriculum follows a disposable signing wallet from its
            first offline backup through watch-only export, a test payment and
            recovery on two replacement computers.
          </p>
          <p>
            These are independent BTC Pavao projects built around Debian and
            Bitcoin Core, not official releases of either project. The release
            documentation explains how to install each system and which files
            persist after shutdown.
          </p>
          <nav className="debian-release-links" aria-label="Available ISO releases">
            <a href={vaultRelease}>Vault v0.6.0 release</a>
            <a href={nodeRelease}>Node v0.1.0-rc.2 release</a>
            <a href="/en/bitcoin-core/self-custody/?setup=vault-node#lesson/prepare-offline-signer">Follow the Vault and Node walkthrough</a>
            <a href="/en/bitcoin-core/self-custody/">Start the Bitcoin Core curriculum</a>
          </nav>
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
