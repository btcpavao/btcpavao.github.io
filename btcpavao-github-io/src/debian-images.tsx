import { Archive, LockKeyhole } from "lucide-react"
import { ConsultingInvitation } from "@/components/consulting-invitation"
import { useEffect } from "react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ValueForValueCard } from "@/components/value-for-value"

const lesson = (slug: string) => `/en/bitcoin-core/self-custody/#lesson/${slug}`

const vaultRelease = "https://github.com/btcpavao/bitcoin-core-vault-releases/releases/tag/v0.5.0"
const nodeRelease = "https://github.com/btcpavao/bitcoin-core-node-releases/releases/tag/v0.1.0-rc.2"
const nodeIso = "https://github.com/btcpavao/bitcoin-core-node-releases/releases/download/v0.1.0-rc.2/bitcoin-core-node-v0.1.0-rc.2-core32.1-amd64.iso"
const vaultIso = "https://github.com/btcpavao/bitcoin-core-vault-releases/releases/download/v0.5.0/bitcoin-core-vault-32.1-practical-guide-20261110-amd64.iso"


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
    version: "v0.5.0",
    images: [
      { file: "home", title: "Your offline workspace", description: "Bitcoin Core, encrypted backup and recovery tools in one private workspace.", alt: "Bitcoin Core Vault home with Bitcoin Core, Wallet Backup, Decrypt Backup, KeePassXC and offline utilities" },
      { file: "guide", title: "Updated practical Vault Guide", description: "Start with the complete wallet, backup, watch-only Node and offline signing workflow.", alt: "Bitcoin Core Vault v0.5.0 installed Guide showing the Vault-to-Node flow and chapter navigation" },
      { file: "backup", title: "Wallet Backup", description: "Create and encrypt a backup using the dedicated wallet backup interface.", alt: "Bitcoin Core Vault wallet backup interface" },
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
  const basePath = `/software/screenshots/${product}${product === "vault" ? "/v0.5.0" : ""}`
  return (
    <div className="product-screenshots" aria-label={`${name} screenshots`}>
      <p className="product-screenshots-intro">Inside {name} · {version}. Open any image for the full-size screenshot.</p>
      <div className="product-screenshots-grid">
        {images.map(({ file, title, description, alt }) => (
          <figure key={file}>
            <a href={`${basePath}/${file}.png`} aria-label={`View full-size screenshot: ${title}`}>
              <img src={`${basePath}/${file}.webp`} alt={alt} width={product === "vault" && ["wallet", "components", "passphrase", "psbt"].includes(file) ? 1366 : 1280} height={product === "vault" && ["wallet", "components", "passphrase", "psbt"].includes(file) ? 768 : 800} loading="lazy" decoding="async" />
            </a>
            <figcaption><strong>{title}</strong><span>{description}</span></figcaption>
          </figure>
        ))}
      </div>
      <p className="product-screenshots-note">{product === "vault"
        ? "The v0.5.0 Guide overview was captured from the installed test image, while the Home and Wallet Backup screens carry over from v0.4.0 because their visible interfaces did not change. No personal wallets or funds are shown."
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
          <p className="debian-images-eyebrow">Vault v0.5.0 released · Node v0.1.0-rc.2 available for testing</p>
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
        <nav className="debian-product-nav" aria-label="Choose a Bitcoin Core environment">
          <a href="#vault">Vault · Offline wallet work</a>
          <a href="#online-node">Node · Online validation</a>
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
                Wallet Backup creates a checked Core wallet backup and can
                encrypt it with one or more GPG layers. Export the ciphertext
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
              Bitcoin Core Vault v0.5.0 is available now, with Bitcoin Core
              32.1, a matching source snapshot, tests and signed checksums.
              Verify both the downloaded bytes and the PGP signing key.
            </p>
            <div className="debian-download-panel">
              <p className="debian-images-eyebrow">Available · Vault v0.5.0</p>
              <h3>Download Bitcoin Core Vault</h3>
              <p>Offline wallet creation, encrypted backup and recovery, plus PSBT signing. Updated practical Vault Guide · Debian 13 · amd64 · Live RAM or installed.</p>
              <nav className="debian-release-links" aria-label="Bitcoin Core Vault download links">
                <a href={vaultIso}>Download Vault ISO</a>
                <a href={vaultRelease}>Checksums, signature &amp; source</a>
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
        <section className="debian-verification" id="verify-the-build">
          <p className="debian-images-eyebrow">
            Sources and independent verification
          </p>
          <h2>Trace the software. Inspect the preparation.</h2>
          <p>
            The images are prepared Debian environments built around existing
            open-source software. Debian packages come from the official Debian
            archive; Bitcoin Core uses the unmodified upstream release. The
            current Vault build also contains project configuration, helper
            programs and locally built or patched packages, including the Vault
            interface, Thunar and the installer. Those additions belong in the review too.
          </p>
          <p>
            Both published releases link to their exact ISO hashes, OpenPGP
            signature, package/build metadata and matching source snapshots:
            <a href={vaultRelease}> Vault v0.5.0</a> and
            <a href={nodeRelease}> Node v0.1.0-rc.2</a>.
            The goal is independent inspection. A matching source archive and
            signed hash alone do not establish a reproducible ISO.
          </p>
          <ol>
            <li>
              <strong>Authenticate the image.</strong> Compare its SHA-256
              checksum with the signed release checksums and verify the signing
              key through an independent trusted channel. This identifies the
              published image; it does not by itself prove the contents are
              safe.{" "}
              <a href="https://www.debian.org/CD/verify">
                Debian explains image verification.
              </a>
            </li>
            <li>
              <strong>Confirm the release signing key.</strong> Independently
              compare the public signing key fingerprint with the publisher’s
              stated fingerprint below before relying on the signature:
              <code className="debian-signing-fingerprint">787A 2AAF B0D1 19CA 0522 B2A5 B9C9 9AF8 5788 96D0</code>
              After importing <code>btcpavao-pgp.asc</code>, run
              <code>gpg --verify SHA256SUMS.asc SHA256SUMS</code> and
              <code>sha256sum -c SHA256SUMS</code>. Verify only a downloaded
              subset with <code>sha256sum -c SHA256SUMS --ignore-missing</code>.
            </li>
            <li>
              <strong>Verify the upstream software.</strong> Check Debian
              package provenance against signed archive metadata using{" "}
              <a href="https://manpages.debian.org/trixie/apt/apt-secure.8.en.html">
                APT’s trust chain
              </a>
              . Compare Core against its{" "}
              <a href="https://bitcoincore.org/en/download/">
                upstream hashes, signatures and independent build attestations
              </a>
              . For direct KeePassXC downloads, use its{" "}
              <a href="https://keepassxc.org/verifying-signatures/">
                signature-verification instructions
              </a>
              ; the Debian-packaged version is verified through Debian.
            </li>
            <li>
              <strong>Review every project addition.</strong> Read the package
              lists, boot settings, launchers, helper programs and local
              patches. Compare files inside the image with the documented
              inputs. A local patch must be disclosed and checked, even when its
              starting point was an official source.
            </li>
            <li>
              <strong>Build and compare independently.</strong> Rebuild from the
              recorded inputs in a separate environment and compare the output
              and contents. A claim of{" "}
              <a href="https://reproducible-builds.org/docs/definition/">
                byte-for-byte reproducibility
              </a>{" "}
              requires a matching independent build; it is not implied by
              publishing source code or a checksum. Reproducibility of these
              complete ISOs has not yet been established here.
            </li>
            <li>
              <strong>Check the session behavior.</strong> In a disposable test
              session, inspect the RAM mounts, confirm that swap is inactive,
              export a test wallet, shut down and prove recovery from the
              external backup. Source and image checks complement these runtime
              checks.
            </li>
          </ol>
        </section>
        <section className="debian-release-plan" id="release-status">
          <p className="debian-images-eyebrow">
            Release status · November 11, 2026
          </p>
          <h2>Download, verify, then test the recovery path.</h2>
          <p>
            Vault v0.5.0 is published and Node v0.1.0-rc.2 is available as a
            test release. Both offer ISO downloads, source snapshots and
            signed checksum files. These downloads are not an endorsement of untested
            hardware or a substitute for practicing recovery.
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
          <nav className="debian-release-links" aria-label="Available ISO releases">
            <a href={vaultRelease}>Vault v0.5.0 release</a>
            <a href={nodeRelease}>Node v0.1.0-rc.2 release</a>
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
