import { nodeBuild, vaultBuild } from "./iso-releases"
import { LegacyVerificationLinks } from "./components/legacy-verification-links"
import { DEBIAN_IMAGE_VERIFICATION_PATH } from "./routes"
import { Archive, ArrowDownToLine, ArrowRight, BookOpen, ChevronDown, LockKeyhole, Monitor, RotateCcw, Usb } from "lucide-react"
import { NodeFirstRun } from "./components/node-first-run"
import { VaultFirstRun } from "./components/vault-first-run"
import { IsoPracticeWalkthrough, WalletRecovery } from "./components/iso-practice-walkthrough"
import { IsoCustodyQuestions } from "./components/iso-custody-questions"
import { IsoLandingHero } from "./components/iso-landing-hero"
import { IsoOriginStory } from "./components/iso-origin-story"
import { IsoSystemRoles } from "./components/iso-system-roles"
import { IsoBackupStory } from "./components/iso-backup-story"
import { useEffect } from "react"
import { captures } from "./curriculum/practice-captures"
import { ZoomableImage } from "./components/zoomable-image"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import "./iso-download-guide.css"

const lesson = (slug: string) => `/bitcoin-core/self-custody/#lesson/${slug}`

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
    version: "v0.9.0",
    images: [
      { shot: captures["vault-home"], title: "Your offline workspace", description: "Bitcoin Core, encrypted backup and recovery tools in one private session." },
      { shot: captures["vault-guide"], title: "Practical Vault Guide", description: "Follow the wallet, backup, watch-only Node and offline signing workflow." },
      { shot: captures["vault-backup-restore"], title: "Backup and Restore", description: "Find the encrypted backup, recovery and Core restore tools together." },
    ],
    note: "Captured from the published Vault v0.9.0 image in disposable offline live sessions. Practice wallets are unfunded.",
  },
  node: {
    name: "Bitcoin Core Node",
    version: "v0.1.0-rc.4",
    images: [
      { shot: captures["node-home"], title: "Your online workspace", description: "A dedicated home for Bitcoin Core, Private Workspace and the tools around them." },
      { shot: captures["node-settings"], title: "Settings in one place", description: "Open Network Connections, Backup and Restore, and the available device settings." },
      { shot: captures["node-guide"], title: "A guide beside your node", description: "Read the built-in guide while setting up the watch-only wallet and transfer workflow." },
    ],
    note: "Node RC4 interface shown in a disposable offline test VM. The synchronization examples report that VM’s observed state.",
  },
}

function ProductScreenshots({ product }: { product: keyof typeof productScreenshots }) {
  const { name, version, images, note } = productScreenshots[product]
  return (
    <div className="product-screenshots" aria-label={`${name} screenshots`}>
      <p className="product-screenshots-intro">Inside {name} · {version}. Open any image for the full-size screenshot.</p>
      <div className="product-screenshots-grid">
        {images.map(({ shot, title, description }) => (
          <figure key={shot.src}>
            <ZoomableImage src={shot.src} fullSrc={shot.fullSrc} alt={shot.alt} width={shot.width} height={shot.height} loading="lazy" decoding="async" />
            <figcaption><strong>{title}</strong><span>{description}</span></figcaption>
          </figure>
        ))}
      </div>
      <p className="product-screenshots-note">{note}</p>
    </div>
  )
}

function ReleaseDownloads() {
  return (
    <section id="try-the-isos" className="iso-try" aria-labelledby="download-heading">
      <div id="release-status">
        <h2 id="download-heading">Downloads and verification</h2>
      </div>
      <p id="verify-download">Both images include Bitcoin Core 32.1. Check the release’s signature status and compare your download with its published checksum before writing the ISO to USB.</p>
      <div className="iso-release-list">
        <article className="iso-release-row" aria-labelledby="vault-download-heading">
          <div>
            <h3 id="vault-download-heading">Bitcoin Core Vault</h3>
            <p>Signed release · {vaultBuild.tag} · Debian 13</p>
          </div>
          <a className="iso-file" href={vaultBuild.isoUrl}><ArrowDownToLine aria-hidden="true" /> Download Vault ISO <small>{vaultBuild.downloadSize}</small></a>
          <a className="iso-check" href="#verify-vault-download">Verify Vault <ArrowRight aria-hidden="true" /></a>
        </article>
        <article id="node-release" className="iso-release-row" aria-labelledby="node-download-heading">
          <div>
            <h3 id="node-download-heading">Bitcoin Core Node</h3>
            <p>Test release candidate · <code>{nodeBuild.tag}</code> · Debian 13 · {nodeBuild.signatureStatus === "signed" ? "PGP signed" : "PGP signature pending"}</p>
          </div>
          <a className="iso-file" href={nodeBuild.isoUrl}><ArrowDownToLine aria-hidden="true" /> Download Node ISO <small>{nodeBuild.downloadSize}</small></a>
          <a className="iso-check" href="#verify-node-download">Verify Node <ArrowRight aria-hidden="true" /></a>
        </article>
      </div>
      <details className="iso-release-evidence">
        <summary>Release files and build records</summary>
        <div className="iso-release-evidence-grid">
          <div>
            <h3>Vault {vaultBuild.tag}</h3>
            <p>This release includes the source, package inventory and records from local verification and hardware testing. A byte-identical independent rebuild has not yet been demonstrated for this ISO.</p>
            <ul>
              <li><a href={vaultBuild.releaseUrl}>Signed files, release notes and test results</a></li>
              <li><a href={vaultBuild.manifestUrl}>SHA256SUMS</a> and <a href={vaultBuild.signatureUrl}>OpenPGP signature</a></li>
              <li><a href={vaultBuild.instructionsUrl}>Vault source and build instructions</a></li>
              <li><a href={vaultBuild.proofUrl}>Build provenance and validation</a></li>
            </ul>
          </div>
          <div>
            <h3>Node {nodeBuild.tag}</h3>
            <p>This release publishes the approved local ISO, matching source and recorded build and validation evidence. A byte-identical independent rebuild of this ISO has not yet been demonstrated.</p>
            <ul>
              <li><a href={nodeBuild.releaseUrl}>Node release notes and files</a></li>
              <li><a href={nodeBuild.manifestUrl}>SHA256SUMS</a>{nodeBuild.signatureStatus === "signed" ? <> and <a href={nodeBuild.signatureUrl}>OpenPGP signature</a></> : " · PGP signature pending"}</li>
              {nodeBuild.signatureStatus === "signed" && <li><a href={nodeBuild.isoUrl + ".asc"}>PGP signature for the ISO itself</a></li>}
              <li><a href={nodeBuild.sourceUrl}>Matching Node source archive</a></li>
              <li><a href={nodeBuild.proofUrl}>Source and build provenance</a></li>
              <li><a href={nodeBuild.acceptanceUrl}>Validation records</a> and <a href={nodeBuild.limitsUrl}>test limits</a></li>
            </ul>
          </div>
        </div>
      </details>
      <a className="iso-rebuild-link" href={DEBIAN_IMAGE_VERIFICATION_PATH}>Inspect the software and rebuild an ISO <ArrowRight aria-hidden="true" /></a>
    </section>
  )
}

export function DebianImagesPage() {
  useEffect(() => {
    document.documentElement.lang = "en"
    document.title =
      "Bitcoin Core Vault and Node — Two Dedicated Debian Linux Systems | BTC Pavao"

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
      <main id="main-content" className="debian-images-page iso-landing">
        <IsoLandingHero />
        <LegacyVerificationLinks />
        <ReleaseDownloads />
        <section id="setup-guides" className="iso-guides-group" aria-labelledby="setup-guides-heading">
          <div className="iso-guides-heading">
            <h2 id="setup-guides-heading">Setup guides</h2>
            <a href="#ask-pavao">Ask Pavao a question</a>
          </div>
          <details name="iso-setup-guide" className="iso-reference-panel iso-guide">
            <summary><Usb aria-hidden="true" /><span>Start Vault and back up an empty wallet</span><ChevronDown aria-hidden="true" /></summary>
            <VaultFirstRun vaultIso={vaultBuild.isoUrl} />
          </details>
          <details name="iso-setup-guide" className="iso-reference-panel iso-guide">
            <summary><Monitor aria-hidden="true" /><span>Install Node and check synchronization</span><ChevronDown aria-hidden="true" /></summary>
            <NodeFirstRun />
          </details>
          <details name="iso-setup-guide" className="iso-reference-panel iso-guide">
            <summary><BookOpen aria-hidden="true" /><span>Pair the wallets and sign a practice payment</span><ChevronDown aria-hidden="true" /></summary>
            <IsoPracticeWalkthrough />
          </details>
          <details name="iso-setup-guide" className="iso-reference-panel iso-guide">
            <summary><RotateCcw aria-hidden="true" /><span>Restore a wallet from an encrypted backup</span><ChevronDown aria-hidden="true" /></summary>
            <WalletRecovery />
          </details>
        </section>
        <IsoSystemRoles />
        <IsoOriginStory />
        <IsoBackupStory />
        <details id="product-screenshots" className="iso-reference-panel iso-desktops">
          <summary><h2>Included software and current screenshots</h2></summary>
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
              <a href="/bitcoin-core/wallet-setup-backup-recovery/#optional-backup-protection">
                Practice GPG backup and recovery now →
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
              after reboot. Private Workspace is the RAM-only workspace for
              temporary files, including PSBTs. Backup and Restore can export a blockchain copy, public
              wallets and selected portable configuration to removable media.
            </p>
            <p>
              This Node build includes the updated practical guide for the
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
      </main>
      <SiteFooter />
    </div>
  )
}
