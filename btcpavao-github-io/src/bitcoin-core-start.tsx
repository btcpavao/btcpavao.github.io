import { findContentByPath } from "@/content-registry"
import { useEffect } from "react"
import { GuidePracticeSetup } from "@/components/guide-practice-setup"
import { PracticeFigures } from "@/components/image-practice"
import { DEBIAN_IMAGES_PATH } from "@/components/debian-images-notice"
import { useVaultSetup } from "@/use-vault-setup"
import {
  ArrowRight,
  BookOpen,
  Check,
  Download,
  FileCheck2,
  HardDrive,
  KeyRound,
  ShieldAlert,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { SiteHeader } from "@/components/site-header"
import { TutorialMetadata } from "@/components/tutorial-metadata"
import {
  BITCOIN_CORE_WALLET_GUIDE_PATH,
  EN_BITCOIN_CORE_CURRICULUM_PATH,
  EN_BITCOIN_CORE_ENTROPY_ARTICLE_PATH,
  START_HERE_PATH,
} from "@/routes"

const SITE_URL = "https://btcpavao.com"

const downloadUrl = "https://bitcoincore.org/en/download/"
const verifyVaultUrl = DEBIAN_IMAGES_PATH + "#verify-download"
const watchOnlyUrl = EN_BITCOIN_CORE_CURRICULUM_PATH + "?setup=vault-node#lesson/watch-only-setup"
const stepLinkClass = "mt-3 inline-flex min-h-10 items-center gap-2 text-sm font-semibold text-primary underline underline-offset-4"

const exerciseSteps = [
  {
    id: "environment",
    title: "Prepare your practice environment",
    desktop: "Use a fresh operating-system account or a spare computer for this empty wallet. Set aside a removable drive for the backup and a separate place to record its passphrase.",
    vault: "Set aside a compatible 64-bit Intel or AMD computer, a spare USB drive for starting Vault and a second drive for the backup. Have a separate place ready for your practice passphrases.",
    icon: HardDrive,
  },
  {
    id: "verification",
    title: "Verify the software before you open it",
    desktop: "Download the Bitcoin Core package for your operating system and processor. Follow the official verification instructions to check the signed checksum list and match the downloaded file to its listed SHA-256 hash.",
    vault: "On a separate computer, download the Vault ISO and its signed checksum list. Check the publisher’s full key fingerprint through a trusted channel, verify the signature and match the ISO’s SHA-256 hash. Write the verified image to the boot USB. Disconnect the practice computer from the network and choose Start Bitcoin Core Vault (Live RAM).",
    icon: Download,
  },
  {
    id: "create",
    title: "Create an empty wallet and record one address",
    desktop: "In Bitcoin Core, choose Create Wallet. Name it Practice Wallet, select Encrypt Wallet and set a fresh practice passphrase. On the Receive tab, enter the label Recovery check and create a receiving address. Record the full address and label for the restore exercise. Leave the address unfunded.",
    vault: "Open Bitcoin Core from Vault Home and choose Create Wallet. Name it Practice Wallet, select Encrypt Wallet and set a fresh practice passphrase. On the Receive tab, use the label Recovery check and create one address. Record the full address and label outside this RAM session. Leave the address unfunded.",
    icon: KeyRound,
  },
  {
    id: "backup",
    title: "Save the backup and find it again",
    desktop: "Choose File → Backup Wallet and save practice-wallet.dat on the removable drive. Open the drive in your file manager and check the file’s location. Keep the Core passphrase in its separate recovery record. The backup guide also shows how to encrypt the whole file with GPG.",
    vault: "Open Wallet Backup from Vault Home. Select Practice Wallet and protect the backup with a separate GPG passphrase. If the resulting .gpg file is in Private Workspace, use Files to copy it to the backup drive. Open the drive and check the file there before ejecting it or ending your session.",
    icon: FileCheck2,
  },
]

function setMeta(name: string, content: string) {
  const element = document.head.querySelector<HTMLMetaElement>(
    `meta[name="${name}"]`
  )
  if (element) element.content = content
}

export function BitcoinCoreStartPage() {
  const { vault, selectVault } = useVaultSetup()
  const walletGuide = BITCOIN_CORE_WALLET_GUIDE_PATH + (vault ? "?setup=vault" : "")

  useEffect(() => {
    const { title, description } = findContentByPath("/en/bitcoin-core/start-here/")!

    document.documentElement.lang = "en"
    document.title = title
    setMeta("description", description)
    setMeta("twitter:title", title)
    setMeta("twitter:description", description)
  }, [])

  return (
    <div className="min-h-screen bg-background text-foreground">
      <a className="skip-link" href="#lesson">
        Skip to lesson
      </a>
      <SiteHeader />

      <main id="lesson">
        <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-24">
          <div className="flex items-center gap-3">
            <img
              src="/software-stack/bitcoin-core.svg"
              alt="Bitcoin Core"
              width="190"
              height="40"
              className="h-8 w-auto shrink-0 outline-none"
              draggable="false"
            />
            <span className="h-5 w-px bg-border" aria-hidden="true" />
            <p className="text-[11px] font-semibold text-primary uppercase">
              Quick Core practice
            </p>
          </div>
          <h1 className="mt-5 max-w-[14ch] font-display text-5xl leading-[0.96] font-bold tracking-[-0.055em] sm:text-7xl">
            Your first exercise uses no real bitcoin.
          </h1>
          <p className="mt-7 max-w-3xl text-lg leading-9 text-muted-foreground sm:text-xl">
            Verify the software, create an empty Bitcoin (BTC) wallet and save a backup you can
            find again. You can generate a receiving address and practise recovery
            offline, even on a computer without a copy of the blockchain.
          </p>

          <GuidePracticeSetup vault={vault} selectVault={selectVault} />
          <TutorialMetadata
            language="en"
            className="mt-8"
            goal="Create an empty wallet and identify the files and passphrases you need to recover it."
            difficulty="Beginner"
            estimatedTime={vault ? "30–45 minutes once the verified Vault boot USB is ready." : "30–45 minutes for the wallet exercise. Allow extra time for downloading and verifying Core."}
            realBitcoin="Use an unfunded, disposable practice wallet."
            softwareVersion={vault ? "Bitcoin Core 32.1 in Vault v0.6.0" : "Bitcoin Core 32.1"}
            operatingSystems={vault ? "Vault runs Debian 13 on supported amd64 (64-bit Intel or AMD) computers." : "macOS 14 or later (Intel or Apple silicon), Windows 10 version 1903 or later, or a maintained Linux distribution."}
            recommendedOs={vault ? "Start Vault from USB in Live RAM mode for this exercise." : "Use a maintained operating system on a computer you already know."}
            prerequisites={vault ? "A Vault boot USB, a separate removable backup drive and separate passphrase records. Use the native macOS package for Core on an Apple silicon Mac." : "A separate practice environment, removable backup media and a separate passphrase record."}
            outcome="A backup outside the working session and a recorded address and label to compare when you restore it."
            lastReviewed={vault ? "11 November 2026. On Vault v0.5.0 we restored an encrypted backup from a virtual USB drive in a fresh offline session and matched the original address and label." : "Instructions reviewed against the Bitcoin Core 32.1 release on 11 November 2026. The focused guide labels each practical test by platform."}
          />

          <div className="mt-10 rounded-[28px] bg-card p-6 shadow-[var(--shadow-border)] sm:p-8">
            <div className="flex gap-4">
              <span className="grid size-11 shrink-0 place-items-center rounded-full bg-primary/12 text-primary">
                <ShieldAlert className="size-5" aria-hidden="true" />
              </span>
              <div>
                <h2 className="font-display text-xl font-bold">
                  Keep this exercise disposable.
                </h2>
                <p className="mt-2 max-w-3xl text-sm leading-7 text-muted-foreground">
                  Leave the practice address unfunded. If this computer already
                  holds a wallet, use a separate operating-system account or a
                  spare machine. Keep your existing wallets, data directories
                  and backups separate from this exercise.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-border/60 bg-card/48">
          <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-20">
            <p className="text-[11px] font-semibold text-primary uppercase">
              Four steps
            </p>
            <h2 className="mt-4 max-w-[18ch] font-display text-3xl leading-[1.02] font-bold tracking-[-0.045em] sm:text-5xl">
              Create and back up your first practice wallet.
            </h2>

            <ol className="mt-10 divide-y divide-border/70 border-y border-border/70">
              {exerciseSteps.map((step, index) => {
                const Icon = step.icon
                return (
                  <li
                    key={step.id}
                    className="grid gap-4 py-7 sm:grid-cols-[64px_minmax(0,1fr)] sm:py-9"
                  >
                    <span className="grid size-11 place-items-center rounded-full bg-background text-primary shadow-[var(--shadow-border)]">
                      <Icon className="size-5" aria-hidden="true" />
                    </span>
                    <div>
                      <p className="text-xs font-bold text-primary">
                        {String(index + 1).padStart(2, "0")}
                      </p>
                      <h3 className="mt-2 font-display text-2xl font-bold tracking-[-0.035em]">
                        {step.title}
                      </h3>
                      <p className="mt-3 max-w-2xl text-base leading-8 text-muted-foreground">
                        {vault ? step.vault : step.desktop}
                      </p>
                      {step.id === "verification" && (
                        <a className={stepLinkClass} href={vault ? verifyVaultUrl : downloadUrl}>
                          {vault ? "Verify the signed Vault ISO" : "Download and verify Bitcoin Core"}
                          <ArrowRight className="size-4" aria-hidden="true" />
                        </a>
                      )}
                      {step.id === "backup" && (
                        <>
                          {vault && (
                            <div className="mt-5 sm:[&_.practice-figures]:grid-cols-2">
                              <PracticeFigures slug="prepare-offline-signer" step="debian-datadir" />
                            </div>
                          )}
                          <a className={stepLinkClass} href={walletGuide + "#step-7"}>
                            Follow the wallet backup steps
                            <ArrowRight className="size-4" aria-hidden="true" />
                          </a>
                        </>
                      )}
                    </div>
                  </li>
                )
              })}
            </ol>

            <a className={stepLinkClass} href={EN_BITCOIN_CORE_ENTROPY_ARTICLE_PATH}>
              Read how Core creates a wallet
              <ArrowRight className="size-4" aria-hidden="true" />
            </a>
          </div>
        </section>

        <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-20">
          <div className="grid gap-8 rounded-[32px] bg-[#0d3153] p-7 text-white sm:p-10 lg:grid-cols-[minmax(0,1fr)_340px] lg:items-end">
            <div>
              <p className="text-[11px] font-semibold text-white/62 uppercase">
                Finish line
              </p>
              <h2 className="mt-4 font-display text-3xl font-bold tracking-[-0.04em]">
                Ready to test recovery?
              </h2>
              <ul className="mt-6 grid gap-3 text-sm leading-7 text-white/76">
                {[
                  "I know which software I downloaded and what I verified.",
                  "I know that this wallet contains no real funds.",
                  "I found the backup on the removable drive and kept the required passphrases separately.",
                  "I recorded the full receiving address and its label for comparison.",
                ].map((item) => (
                  <li key={item} className="flex gap-3">
                    <Check
                      className="mt-1 size-4 shrink-0 text-[#7cc9ff]"
                      aria-hidden="true"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col gap-3">
              <p className="text-[11px] font-semibold tracking-[0.16em] text-white/62 uppercase">
                Next step
              </p>
              <h3 className="font-display text-2xl leading-tight font-bold tracking-[-0.035em] text-balance">
                Open the backup in a fresh wallet.
              </h3>
              <p className="mb-2 text-sm leading-6 text-pretty text-white/72">
                Restore your practice copy under a new wallet name, then compare
                its receiving address and label with the ones you recorded.
              </p>
              <Button
                asChild
                className="h-auto min-h-12 max-w-full whitespace-normal rounded-full py-3 text-center bg-white px-5 text-[#0d3153] hover:bg-white/90 active:scale-[0.96]"
              >
                <a href={walletGuide + "#step-8"}>
                  <BookOpen className="size-4" aria-hidden="true" />
                  Restore your practice backup
                  <ArrowRight className="size-4" aria-hidden="true" />
                </a>
              </Button>
              <a
                href={watchOnlyUrl}
                className="inline-flex min-h-11 items-center justify-center text-center text-sm font-semibold text-white/74 hover:text-white"
              >
                Use Vault with a watch-only Node
              </a>
              <a
                href={EN_BITCOIN_CORE_CURRICULUM_PATH}
                className="inline-flex min-h-11 items-center justify-center text-center text-sm font-semibold text-white/74 hover:text-white"
              >
                Open the full self-custody curriculum
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border/60 py-8 text-center text-xs text-muted-foreground">
        <p>
          Practical education and guidance. Not investment, legal, or tax
          advice.
        </p>
        <p className="mt-2">
          {SITE_URL.replace("https://", "")} · {START_HERE_PATH}
        </p>
      </footer>
    </div>
  )
}
