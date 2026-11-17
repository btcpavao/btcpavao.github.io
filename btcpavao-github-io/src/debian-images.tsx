import { LegacyVerificationLinks } from "./components/legacy-verification-links"
import { DEBIAN_IMAGE_VERIFICATION_PATH } from "./routes"
import { Archive, Download, LockKeyhole, Monitor } from "lucide-react"
import { NodeFirstRun } from "./components/node-first-run"
import { VaultFirstRun } from "./components/vault-first-run"
import { IsoPracticeWalkthrough } from "./components/iso-practice-walkthrough"
import { IsoCustodyQuestions } from "./components/iso-custody-questions"
import { ZoomableImage } from "./components/zoomable-image"
import { useEffect } from "react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ValueForValueCard } from "@/components/value-for-value"

const lesson = (slug: string) => `/en/bitcoin-core/self-custody/#lesson/${slug}`

const vaultRelease = "https://github.com/btcpavao/bitcoin-core-vault-releases/releases/tag/v0.7.0"
const nodeRelease = "https://github.com/btcpavao/bitcoin-core-node-releases/releases/tag/v0.1.0-rc.2"
const nodeIso = "https://github.com/btcpavao/bitcoin-core-node-releases/releases/download/v0.1.0-rc.2/bitcoin-core-node-v0.1.0-rc.2-core32.1-amd64.iso"
const vaultIso = "https://github.com/btcpavao/bitcoin-core-vault-releases/releases/download/v0.7.0/bitcoin-core-vault-v0.7.0-amd64.iso"


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
    version: "v0.6.0 screenshots",
    images: [
      { file: "v0.6.0/home", title: "Your offline workspace", description: "Bitcoin Core, encrypted backup and recovery tools in one private workspace.", alt: "Bitcoin Core Vault home with Bitcoin Core, Wallet Backup, Decrypt Backup, KeePassXC and offline utilities" },
      { file: "v0.6.0/guide", title: "Practical Vault Guide", description: "Start with the complete wallet, backup, watch-only Node and offline signing workflow.", alt: "Vault Guide with the Start here chapter open, showing how a watch-only wallet and a payment file move between Vault and Node." },
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
        ? "Home and Guide were captured in a Live RAM session. The Wallet Backup example uses a disposable USB drive in an installed Vault."
        : "Captured on Node v0.1.0-rc.1 with a disposable setup. Node is shown without a network connection, with the optional Backup and Restore Home shortcut enabled."}</p>
    </div>
  )
}

function ReleaseDownloads() {
  return (
    <details id="release-status" className="iso-reference-panel iso-releases">
      <summary id="verify-download"><h2 id="download-heading">Downloads and release details</h2></summary>
      <p>Each ISO is a file you can write to a USB stick to start a dedicated 64-bit Intel or AMD computer. I publish these Debian systems independently of the Debian and Bitcoin Core projects.</p>
      <div className="iso-download-grid">
        <article className="debian-download-panel" aria-labelledby="vault-download-heading">
          <p className="debian-images-eyebrow">Signed release · v0.7.0</p>
          <h3 id="vault-download-heading">Bitcoin Core Vault</h3>
          <p>Create, back up and sign with your wallet offline. Debian 13.7 and Bitcoin Core 32.1. Start a live session from USB or install the system.</p>
          <nav className="debian-release-links" aria-label="Vault download and verification">
            <a href={vaultIso}>Download Vault ISO</a>
            <a href="#verify-vault-download">Check my Vault download</a>
          </nav>
          <p><strong>Evidence for this file.</strong> Two builds run by this project on GitHub produced exactly the signed ISO above. An independent security review of this release has yet to be published.</p>
          <div className="iso-evidence-links">
            <a href={vaultRelease}>Signed files and test results</a>
            <a href="https://github.com/btcpavao/bitcoin-core-vault-releases/actions/runs/43864705133">Both build results</a>
            <a href="#vault">Vault software and earlier screens</a>
          </div>
        </article>
        <article id="node-release" className="debian-download-panel" aria-labelledby="node-download-heading">
          <p className="debian-images-eyebrow">Signed test release · v0.1.0-rc.2</p>
          <h3 id="node-download-heading">Bitcoin Core Node</h3>
          <p>Verify Bitcoin and prepare payments online with Bitcoin Core 32.1 on Debian 13. Installation erases the selected drive. Use a disposable wallet for testing.</p>
          <nav className="debian-release-links" aria-label="Node download and verification">
            <a href={nodeIso}>Download Node ISO</a>
            <a href="#verify-node-download">Check my Node download</a>
          </nav>
          <p><strong>Evidence for this file.</strong> You can verify its signature and compare project files with their published sources. A byte-for-byte rebuild of this signed RC2 has yet to be demonstrated. The recorded rebuild matches a separate, unsigned comparison image.</p>
          <div className="iso-evidence-links">
            <a href={nodeRelease}>Signed files and test results</a>
            <a href={DEBIAN_IMAGE_VERIFICATION_PATH + "#rebuild-tutorial"}>See which Node image was rebuilt</a>
            <a href="#online-node">Node software and earlier screens</a>
          </div>
        </article>
      </div>
      <nav className="iso-guide-nav" aria-label="Questions and technical instructions">
        <a href={DEBIAN_IMAGE_VERIFICATION_PATH}>Review the software and rebuild an ISO</a>
        <a href="#custody-questions">Questions before moving bitcoin</a>
        <a href="#ask-pavao">Ask Pavao</a>
      </nav>
    </details>
  )
}

export function DebianImagesPage() {
  useEffect(() => {
    document.documentElement.lang = "en"
    document.title =
      "Bitcoin Core Vault and Node — Downloads and Independent Verification | BTC Pavao"

    function revealLinkedPanel() {
      const target = document.getElementById(window.location.hash.slice(1))
      if (!target) return
      let opened = false
      for (let panel = target.closest("details"); panel; panel = panel.parentElement?.closest("details") ?? null) {
        if (panel.open) continue
        panel.open = true
        opened = true
      }
      if (opened) target.scrollIntoView({ block: "start", behavior: "instant" })
    }

    function followCurrentFragment(event: MouseEvent) {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.altKey || event.shiftKey) return
      const link = event.target instanceof Element ? event.target.closest("a[href]") : null
      if (link instanceof HTMLAnchorElement && link.hash && link.href === window.location.href) revealLinkedPanel()
    }

    revealLinkedPanel()
    window.addEventListener("hashchange", revealLinkedPanel)
    document.addEventListener("click", followCurrentFragment)
    return () => {
      window.removeEventListener("hashchange", revealLinkedPanel)
      document.removeEventListener("click", followCurrentFragment)
    }
  }, [])
  return (
    <div className="min-h-screen bg-background text-foreground">
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <SiteHeader />
      <main id="main-content" className="debian-images-page">
        <header className="iso-intro">
          <a href="/en/bitcoin-core/">← Bitcoin Core</a>
          <h1>Bitcoin Core Vault and Node</h1>
          <p className="iso-intro-summary">Use Vault to back up your wallet and sign payments offline. On a second, dedicated computer, Node runs Bitcoin Core to verify the blockchain, prepare payments and send them after you sign.</p>
          <nav className="iso-hero-actions" aria-label="Download the two Bitcoin Core systems">
            <a className="iso-primary-download" href={vaultIso}><Download aria-hidden="true" /> <span>Download Vault ISO</span><small>v0.7.0</small></a>
            <a className="iso-primary-download" href={nodeIso}><Download aria-hidden="true" /> <span>Download Node ISO</span><small>RC2 · test release</small></a>
          </nav>
          <div className="iso-intro-links">
            <a href="#verify-download">Verify either download</a>
            <a href="#pair-wallets">Pair Vault and Node</a>
            <a href="#ask-pavao">Ask Pavao a question</a>
          </div>
          <div className="iso-device-pair">
            <section aria-labelledby="vault-preview-heading">
              <h2 id="vault-preview-heading"><LockKeyhole aria-hidden="true" /> Vault · Offline wallet</h2>
              <figure>
                <ZoomableImage src="/software/screenshots/verification/vault-v070-desktop.webp"
                  alt="Vault’s offline desktop with launchers for Bitcoin Core, Wallet Backup and Decrypt Backup."
                  width={1280} height={800} fetchPriority="high" decoding="async" />
                <figcaption>Start Vault from USB to try an empty wallet. The private workspace runs in memory. Save an encrypted backup on a separate drive before shutting down.</figcaption>
              </figure>
              <nav className="iso-device-links" aria-label="Explore Vault">
                <a href="#first-run">Start Vault from USB</a>
                <a href="#backup-wallet">See wallet backup</a>
              </nav>
            </section>
            <section aria-labelledby="node-preview-heading">
              <h2 id="node-preview-heading"><Monitor aria-hidden="true" /> Node · Online Bitcoin Core</h2>
              <figure>
                <ZoomableImage src="/software/screenshots/node/v0.1.0-rc.2/desktop.webp"
                  alt="Node RC2 desktop with Bitcoin Core, Settings, Files and Node Guide. The status reads Bitcoin Core is offline on first boot."
                  width={1280} height={800} decoding="async" />
                <figcaption>Node RC2 on first boot, before connecting to the network. Once connected, it syncs Bitcoin Core and can follow your balance using a watch-only copy of the wallet.</figcaption>
              </figure>
              <nav className="iso-device-links" aria-label="Explore Node">
                <a href="#node-setup">Set up your dedicated Node</a>
                <a href="#node-status">See Node sync and backups</a>
              </nav>
            </section>
          </div>
          <a className="iso-review-link" href={DEBIAN_IMAGE_VERIFICATION_PATH}>What did Pavao add, and how can I check it?</a>
        </header>
        <LegacyVerificationLinks />
        <ReleaseDownloads />
        <VaultFirstRun vaultIso={vaultIso} />
        <NodeFirstRun />
        <IsoPracticeWalkthrough />
        <details className="iso-reference-panel iso-desktops">
          <summary><h2>Included software and earlier interface screenshots</h2></summary>
          <div className="debian-role-grid">
          <section id="vault">
            <p className="debian-images-eyebrow">
              Offline · Live RAM or installed
            </p>
            <h2>Bitcoin Core Vault</h2>
            <p>
              An offline environment for creating, encrypting, backing up and
              restoring Bitcoin Core wallets. Use it live in RAM, or install its
              operating system with{" "}
              <a href="https://calamares.io/">Calamares</a>. Both modes keep the
              Vault account’s home and private working data in RAM. An
              installation preserves Debian and the applications on the internal disk.
              If your only wallet copy is in the private workspace, shutting down loses it.
              An encrypted backup you deliberately save to USB stays on that USB.
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
                configuration, and session logs are volatile. To send a public file to Node,
                choose your mounted transfer USB in Core’s <strong>Save…</strong> dialog
                for a signed PSBT or in <strong>File → Export watch-only wallet</strong>.
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
            <a href={lesson("more-copies-do-not-mean-a-current-backup")}>
              Learn the backup and recovery workflow →
            </a>
          </section>
          <section id="online-node">
            <p className="debian-images-eyebrow">Online · Installed</p>
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
            <p className="debian-detail">This test release targets compatible 64-bit Intel and AMD computers. Apple Silicon is unsupported. See the release notes for Secure Boot, T2 Macs and Wi-Fi compatibility.</p>
            <a href={lesson("online-node-and-offline-signer")}>
              Understand the two-machine architecture →
            </a>
          </section>
          </div>
        </details>
        <IsoCustodyQuestions />
        <ValueForValueCard language="en" className="mt-14" />
      </main>
      <SiteFooter />
    </div>
  )
}
