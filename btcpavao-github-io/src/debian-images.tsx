import { ConsultingInvitation } from "@/components/consulting-invitation"
import { useEffect } from "react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ValueForValueCard } from "@/components/value-for-value"

const lesson = (slug: string) => `/en/bitcoin-core/self-custody/#lesson/${slug}`

const software = {
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
  sevenzip: {
    name: "7-Zip",
    url: "https://www.7-zip.org/",
    logo: "/software/7zip.png",
  },
  arqiver: {
    name: "Arqiver",
    url: "https://github.com/tsujan/Arqiver",
    logo: "/software/arqiver.svg",
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
            <img
              src={software[id].logo}
              alt=""
              width="48"
              height="48"
              loading="lazy"
              decoding="async"
            />
          </span>
          <span>{software[id].name}</span>
        </a>
      ))}
    </nav>
  )
}

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
            <p className="debian-images-eyebrow">
              01 · Offline · Live RAM only
            </p>
            <h2>Bitcoin Core offline signer</h2>
            <p>
              A minimal <a href="https://www.debian.org/">Debian</a> environment
              running <SoftwareLink id="core" /> exclusively as a live session
              in RAM. Boot from the image, create or load a wallet, review a
              PSBT and sign it offline. This signer profile is not installed on
              the internal disk. The online node validates the chain and
              broadcasts the signed transaction.
            </p>
            <p>
              The signer is intended to stay disconnected. No browser, email
              client or general office suite. The offline signing role does not
              need a synchronized blockchain.
            </p>
            <p>
              Export the wallet backups and signed transaction files you need to
              removable media before shutdown or restart. Unsaved session data
              is lost when the session ends.
            </p>
            <SoftwareRow
              ids={["core"]}
              label="Offline signer software — official project"
            />
            <a href={lesson("prepare-offline-signer")}>
              Learn the offline-signer workflow →
            </a>
          </section>
          <section id="vault">
            <p className="debian-images-eyebrow">
              02 · Offline · Live RAM or installed
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
            <SoftwareRow
              ids={[
                "core",
                "keepassxc",
                "sevenzip",
                "arqiver",
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
                  <SoftwareLink id="sevenzip" /> and{" "}
                  <SoftwareLink id="arqiver" />
                </strong>{" "}
                for encrypted backup archives, including an outer encryption
                layer around a wallet backup.
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
              <h3>A stateless private session</h3>
              <p>
                Wallets, password databases, settings and temporary working
                files stay in the RAM workspace. Swap, hibernation and
                persistent crash dumps are disabled in the current
                configuration, and session logs are volatile. Core’s launcher
                restricts writes to checked RAM locations.
              </p>
              <p>
                Use Wallet Backup to export an encrypted wallet archive to USB,
                optical or other removable media, and verify recovery. Export
                any password database, recovery notes or signed PSBT you want to
                keep too. Finish Private Session checks the wallets against
                verified exports before discarding the workspace. Shutdown,
                restart or power loss loses anything left only in RAM.
              </p>
              <details>
                <summary>What “stateless” covers</summary>
                <p>
                  It describes the private working session, not every possible
                  write a user can make. Exported backups remain on their
                  destination media. Tools such as the file manager and archive
                  manager can also write elsewhere if you deliberately choose
                  another destination; use Private Workspace for temporary
                  sensitive files. Ending the session does not erase old disk
                  contents or certify physical RAM sanitization.
                </p>
              </details>
            </div>
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
              A separate minimal <a href="https://www.debian.org/">Debian</a>{" "}
              image for running an online <SoftwareLink id="core" /> node:
              validating the chain, maintaining the watch-only wallet,
              constructing PSBTs and broadcasting signed transactions.
            </p>
            <p>
              Planned without a browser, email client or unrelated desktop
              applications. Networking serves the node and its deliberate
              maintenance. In the offline-signing architecture, the private
              signing keys stay on the offline machine.
            </p>
            <p>
              The node retains its blockchain and watch-only state between
              sessions. Its storage role is different from the volatile private
              workspace on the offline signer and Vault.
            </p>
            <SoftwareRow
              ids={["core"]}
              label="Online node software — official project"
            />
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
            programs and locally built or patched packages, including Arqiver,
            Thunar and the installer. Those additions belong in the review too.
          </p>
          <p>
            Each release will link to its exact package manifest, upstream
            versions, build configuration, local source code and patches,
            alongside the ISO and verification instructions. The aim is to let
            you check what was included and reproduce the preparation yourself.
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
