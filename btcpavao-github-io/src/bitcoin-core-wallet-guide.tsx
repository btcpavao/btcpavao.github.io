import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type MutableRefObject,
  type ReactNode,
} from "react"
import {
  ArrowLeft,
  ArrowRightLeft,
  Brain,
  Check,
  CheckCircle2,
  Copy,
  FileCheck2,
  HardDrive,
  KeyRound,
  Maximize2,
  RefreshCcw,
  ShieldAlert,
  TriangleAlert,
  UserRoundX,
  Wifi,
  WifiOff,
  X,
  type LucideIcon,
} from "lucide-react"

import { SiteHeader } from "@/components/site-header"
import { TutorialMetadata } from "@/components/tutorial-metadata"
import {
  ValueForValueCard,
  ValueForValueRail,
} from "@/components/value-for-value"
import {
  BITCOIN_CORE_WALLET_GUIDE_PATH,
  EN_BITCOIN_CORE_SERIES_PATH,
} from "@/routes"
import { SOCIAL_CARD_IMAGES } from "@/social-card-images"

const SITE_URL = "https://btcpavao.com"
const STEP_STORAGE_KEY = "btcpavao-core-wallet-guide-steps-v2"
const CHECKLIST_STORAGE_KEY = "btcpavao-core-wallet-guide-checklist-v2"
const LEGACY_STEP_STORAGE_KEY = "btcpavao-core-wallet-guide-steps-v1"
const LEGACY_CHECKLIST_STORAGE_KEY = "btcpavao-core-wallet-guide-checklist-v1"
const IMAGE_ROOT = "/bitcoin-core-wallet-guide"
const BITCOIN_CORE_DOWNLOAD_URL = "https://bitcoincore.org/en/download/"
const KEEPASSXC_DOWNLOAD_URL = "https://keepassxc.org/download/"
const FEDORA_WORKSTATION_DOWNLOAD_URL =
  "https://fedoraproject.org/workstation/download/"
const FEDORA_XFCE_DOWNLOAD_URL =
  "https://fedoraproject.org/spins/xfce/download/"
const GNUPG_DOWNLOAD_URL = "https://gnupg.org/download/"

type GuideImage = {
  src: string
  alt: string
  width?: number
  height?: number
}

type GuideStep = {
  number: number
  title: string
  summary: string
  images: GuideImage[]
  content: ReactNode
  note?: ReactNode
  noteKind?: "note" | "warning" | "critical"
}

type GuideIconItem = {
  icon: LucideIcon
  title: ReactNode
  description?: ReactNode
}

function GuideIconList({
  items,
  tone = "neutral",
}: {
  items: GuideIconItem[]
  tone?: "neutral" | "warning" | "secure"
}) {
  const iconStyle =
    tone === "warning"
      ? "bg-[#f3b61f]/16 text-[#9a6500] dark:text-[#f6c95c]"
      : tone === "secure"
        ? "bg-[#0d3153] text-[#7cc9ff]"
        : "bg-primary/12 text-primary"

  return (
    <ul className="my-1 grid gap-3 sm:grid-cols-2">
      {items.map(({ icon: Icon, title, description }, index) => (
        <li
          key={index}
          className="flex min-w-0 gap-3.5 rounded-[20px] bg-background p-4 shadow-[var(--shadow-border)] sm:p-5"
        >
          <span
            className={`grid size-10 shrink-0 place-items-center rounded-full ${iconStyle}`}
          >
            <Icon className="size-[18px]" strokeWidth={2} aria-hidden="true" />
          </span>
          <div className="min-w-0 pt-0.5">
            <p className="text-sm leading-6 font-bold text-foreground">
              {title}
            </p>
            {description ? (
              <p className="mt-1 text-sm leading-6 text-pretty text-muted-foreground">
                {description}
              </p>
            ) : null}
          </div>
        </li>
      ))}
    </ul>
  )
}

function ResourceLink({
  href,
  children,
  inverse = false,
}: {
  href: string
  children: ReactNode
  inverse?: boolean
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={`font-semibold underline decoration-1 underline-offset-4 transition-[color,text-decoration-color] duration-200 ${
        inverse
          ? "text-white decoration-white/45 hover:text-[#7cc9ff] hover:decoration-[#7cc9ff]"
          : "text-foreground decoration-primary/45 hover:text-primary hover:decoration-primary"
      }`}
    >
      {children}
    </a>
  )
}

const image = (
  name: string,
  alt: string,
  height = 1125,
  width = 1800
): GuideImage => ({
  src: `${IMAGE_ROOT}/${name}.webp`,
  alt,
  width,
  height,
})

const legacySteps: GuideStep[] = [
  {
    number: 1,
    title: "Start with no wallet loaded",
    summary: "Begin from a clean Bitcoin Core wallet state.",
    images: [
      image(
        "01-no-wallet-loaded-crisp",
        "Bitcoin Core showing that no wallet has been loaded",
        992,
        1586
      ),
    ],
    content: (
      <p>
        Bitcoin Core can run and stay synchronized without a wallet loaded. In
        this exercise, we start from that state and create a new wallet from
        scratch.
      </p>
    ),
  },
  {
    number: 2,
    title: "Create a new wallet",
    summary: "Give the wallet a local, non-identifying name.",
    images: [
      image(
        "02-create-wallet-dialog",
        "Bitcoin Core Create Wallet dialog before a wallet name is entered",
        1069,
        1472
      ),
      image(
        "02-name-wallet-crisp",
        "Bitcoin Core Create Wallet dialog with Tutorial Wallet entered as the wallet name",
        1068,
        1472
      ),
    ],
    content: (
      <>
        <p>
          Select <strong>Create Wallet</strong> and enter a local name. The
          screenshots in this guide use disposable <strong>Test Wallet</strong>{" "}
          and <strong>Tutorial Wallet</strong> examples. A wallet name is only a
          local identifier; it does not need to reveal your identity or the
          purpose of the funds.
        </p>
        <p>
          Leave <strong>Disable Private Keys</strong>,{" "}
          <strong>Make Blank Wallet</strong>, and{" "}
          <strong>External signer</strong> unchanged for this basic setup.
        </p>
      </>
    ),
  },
  {
    number: 3,
    title: "Enable wallet encryption",
    summary: "Protect private-key use with a wallet passphrase.",
    images: [
      image(
        "03-enable-wallet-encryption",
        "Bitcoin Core Create Wallet dialog with Encrypt Wallet enabled",
        1068,
        1472
      ),
    ],
    content: (
      <>
        <p>
          Check <strong>Encrypt Wallet</strong>. Bitcoin Core encrypts the
          wallet's private-key material and requires the wallet passphrase when
          those keys must be unlocked for signing or spending.
        </p>
        <p>
          Encryption does not make the entire wallet invisible. When the wallet
          is loaded, addresses, balance, transaction history, labels, and other
          metadata may still be visible. Signing requires private keys;
          broadcasting an already signed transaction does not.
        </p>
      </>
    ),
    noteKind: "note",
    note: (
      <>
        <strong>Opening and unlocking are separate.</strong> Restoring or
        loading an encrypted wallet does not necessarily prompt for its
        passphrase. The passphrase is needed when private keys must be used.
      </>
    ),
  },
  {
    number: 4,
    title: "Generate a strong passphrase",
    summary: "Use a password manager to generate random words.",
    images: [
      image(
        "04-keepass-passphrase-generator-crisp",
        "KeePassXC Passphrase tab configured for eight random lower-case words",
        991,
        1587
      ),
    ],
    content: (
      <>
        <p>
          Bitcoin Core recommends ten or more random characters or eight or more
          words. For this exercise, use a password manager such as{" "}
          <ResourceLink href={KEEPASSXC_DOWNLOAD_URL}>KeePassXC</ResourceLink>{" "}
          to generate at least eight randomly selected words.
        </p>
        <GuideIconList
          tone="warning"
          items={[
            {
              icon: Brain,
              title: "Do not invent a memorable sentence.",
              description:
                "Use words selected randomly by a password manager instead of a phrase designed to feel clever or familiar.",
            },
            {
              icon: Copy,
              title: "Do not reuse a password.",
              description:
                "A breach of another service must not expose the passphrase that protects your wallet.",
            },
            {
              icon: UserRoundX,
              title: "Do not include personal information.",
              description:
                "Names, dates, quotations, and familiar patterns make a passphrase easier to predict.",
            },
            {
              icon: HardDrive,
              title: "Separate the two recovery components.",
              description:
                "Keep the real passphrase physically separate from every copy of the wallet backup.",
            },
          ]}
        />
      </>
    ),
    noteKind: "critical",
    note: (
      <>
        <strong>TEST WALLET / EXAMPLE PASSPHRASE.</strong> The phrase visible in
        these screenshots belongs only to a disposable test wallet. Never use it
        for real funds, and never publish screenshots containing the passphrase
        of a real wallet.
      </>
    ),
  },
  {
    number: 5,
    title: "Enter the passphrase",
    summary: "Enter the generated phrase twice and verify the match.",
    images: [
      image(
        "05-enter-passphrase-empty-crisp",
        "Bitcoin Core Encrypt wallet dialog with fields for entering and repeating a new passphrase",
        811,
        1940
      ),
    ],
    content: (
      <p>
        Enter the generated passphrase in both fields. The entries must match
        exactly. Verify the phrase carefully before continuing, then return it
        to its separate, deliberate backup location. A real wallet passphrase
        should not remain in your clipboard or in a screenshot.
      </p>
    ),
    noteKind: "warning",
    note: (
      <>
        The visible phrase elsewhere in this guide is an example only. Never
        reuse it, and never expose the passphrase of a funded wallet.
      </>
    ),
  },
  {
    number: 6,
    title: "Acknowledge the loss warning",
    summary: "Bitcoin Core cannot recover a forgotten passphrase.",
    images: [
      image(
        "06-loss-warning",
        "Bitcoin Core warning that losing the wallet passphrase means losing access to the bitcoin",
        801
      ),
    ],
    content: (
      <p>
        Bitcoin Core warns that losing the passphrase means losing the ability
        to use the encrypted private keys. There is no password reset service.
        Before meaningful funds are involved, create a deliberate passphrase
        backup strategy; do not rely on memory as the only copy.
      </p>
    ),
    noteKind: "critical",
    note: (
      <>
        <strong>Separate the two recovery components.</strong> Keep redundant
        passphrase copies if your threat model calls for them, and optionally
        memorize the phrase as an additional recovery method. Memory must not be
        the only copy. Never intentionally store the passphrase with a wallet
        backup on the same medium or in the same location; compromise or loss of
        one component should not automatically compromise or destroy the other.
      </>
    ),
  },
  {
    number: 7,
    title: "Understand the malware warning",
    summary: "Encryption protects data at rest, not a compromised signer.",
    images: [
      image(
        "07-malware-warning",
        "Bitcoin Core warning that wallet encryption cannot fully protect bitcoin from malware",
        801
      ),
    ],
    content: (
      <>
        <p>
          Bitcoin Core warns that wallet encryption cannot fully protect bitcoin
          from malware. The passphrase protects encrypted keys at rest. If the
          signing computer is malicious while the wallet is unlocked, the
          environment can observe secrets, alter transaction details, or misuse
          the keys. Encryption cannot make a compromised signer trustworthy.
        </p>
        <p>
          <strong>
            Before continuing, choose the environment deliberately.
          </strong>{" "}
          On a general-purpose computer, first install pending operating-system
          and security updates, then run a trusted antivirus or anti-malware
          scan. If the scan finds anything suspicious, stop, clean or replace
          the environment, and begin the wallet procedure again. A clean scan
          reduces obvious risk, but it is not proof that the computer is free of
          malware.
        </p>
        <p>
          For serious cold storage, the stronger approach is a dedicated signing
          computer with a clean{" "}
          <ResourceLink href={FEDORA_WORKSTATION_DOWNLOAD_URL}>
            Fedora Linux
          </ResourceLink>{" "}
          installation. Obtain and verify{" "}
          <ResourceLink href={BITCOIN_CORE_DOWNLOAD_URL}>
            Bitcoin Core
          </ResourceLink>{" "}
          before taking the computer offline, then keep that machine offline for
          wallet creation, key generation, and signing. Bitcoin Core does not
          need to synchronize a node on the signing computer for those
          private-key operations.
        </p>
        <GuideIconList
          tone="secure"
          items={[
            {
              icon: KeyRound,
              title: "Reserve the machine for keys and signatures.",
              description:
                "Do not turn the offline signer into another general-purpose computer.",
            },
            {
              icon: WifiOff,
              title: "Keep everyday network activity away.",
              description:
                "Do not use it for browsing, email, messaging, or daily work.",
            },
            {
              icon: ArrowRightLeft,
              title: "Use a separate online Bitcoin Core node.",
              description:
                "Move unsigned and signed PSBTs carefully between the online node and offline signer.",
            },
            {
              icon: FileCheck2,
              title: "Verify before signing.",
              description:
                "Confirm destinations, amounts, and fees on the offline signer before approving a signature.",
            },
          ]}
        />
        <p>
          This does not make the environment magically sterile, but it removes
          many common infection paths and sharply limits exposure. Pause before
          continuing: decide whether this practice wallet belongs on the current
          computer or whether your intended cold storage warrants a clean,
          dedicated offline signer.
        </p>
      </>
    ),
    noteKind: "warning",
    note: (
      <>
        <strong>Bitcoin Core's warning:</strong> encrypting your wallet cannot
        fully protect your bitcoin from malware infecting the computer.
      </>
    ),
  },
  {
    number: 8,
    title: "Confirm the wallet was created",
    summary: "The new encrypted wallet is now loaded.",
    images: [
      image(
        "08-wallet-created-crisp",
        "Bitcoin Core overview for a newly created encrypted test wallet",
        992,
        1586
      ),
    ],
    content: (
      <p>
        After the creation process finishes, Bitcoin Core loads the new wallet.
        The lock icon in the status area indicates that the wallet is encrypted
        and currently locked. The zero balance is expected for a new practice
        wallet.
      </p>
    ),
  },
  {
    number: 9,
    title: "Generate a receiving address",
    summary: "Create and label an address for the recovery test.",
    images: [
      image(
        "09-receive-screen-crisp",
        "Bitcoin Core Receive tab with a Test Transaction request in payment history",
        992,
        1586
      ),
    ],
    content: (
      <>
        <p>
          Open <strong>Receive</strong>, add a local label such as
          <strong> Test Transaction</strong>, and select
          <strong> Create new receiving address</strong>. Bitcoin Core displays
          the address and a QR code. Labels help you remember an address's
          purpose; the label itself is not written to the Bitcoin blockchain.
        </p>
        <p>
          Bitcoin can technically be sent to the generated address, but this
          exercise is not complete until the backup has been restored and
          checked.
        </p>
      </>
    ),
    noteKind: "critical",
    note: (
      <>
        <strong>
          Do not fund a new cold-storage setup with a meaningful amount
        </strong>{" "}
        until you have successfully tested the complete backup and restore
        procedure.
      </>
    ),
  },
  {
    number: 10,
    title: "Back up the wallet",
    summary: "Create a wallet backup file and store it deliberately.",
    images: [
      image(
        "10-backup-wallet-menu",
        "Bitcoin Core File menu with Backup Wallet selected"
      ),
      image(
        "10-save-wallet-backup",
        "macOS Save dialog for a Bitcoin Core wallet backup named Test Wallet"
      ),
    ],
    content: (
      <>
        <p>
          Choose <strong>File → Backup Wallet</strong>, select a destination,
          and save the wallet file. Because this backup was made after wallet
          encryption, its private-key material remains protected by the Bitcoin
          Core wallet passphrase. Do not assume that every item of wallet
          metadata is encrypted.
        </p>
        <p>
          One digital backup is not enough. Create redundant copies across more
          than one failure domain: USB drives, external drives, optical media,
          another computer, geographically separated storage, or encrypted cloud
          storage may all be appropriate depending on the threat model.
        </p>
      </>
    ),
    noteKind: "note",
    note: (
      <>
        <strong>Verify backups periodically.</strong> About once a year, confirm
        that each copy is readable and can still be restored in a safe
        environment. Checking only that a filename exists is not a recovery
        test.
      </>
    ),
  },
  {
    number: 11,
    title: "Open Restore Wallet",
    summary: "Start Bitcoin Core's wallet recovery workflow.",
    images: [
      image(
        "11-restore-wallet-menu",
        "Bitcoin Core File menu with Restore Wallet selected"
      ),
    ],
    content: (
      <p>
        Choose <strong>File → Restore Wallet</strong>. Restoring an encrypted
        wallet does not necessarily trigger a passphrase prompt. Bitcoin Core
        can load the wallet and show metadata while the private keys remain
        locked. The passphrase is required later when those keys must sign or
        spend.
      </p>
    ),
  },
  {
    number: 12,
    title: "Select the backup file",
    summary: "Choose the saved .dat file in the restore dialog.",
    images: [
      image(
        "12-select-wallet-backup",
        "macOS restore dialog with the Test Wallet.dat backup selected",
        1130
      ),
    ],
    content: (
      <p>
        Navigate to the backup location, select the wallet <code>.dat</code>
        file, and choose <strong>Open</strong>. For a real recovery test, use a
        safe environment and confirm that you selected the intended backup
        rather than an unrelated file with a similar name.
      </p>
    ),
  },
  {
    number: 13,
    title: "Notice why the renamed file is hidden",
    summary: "The macOS restore picker expects the wallet file type.",
    images: [
      image(
        "13-bin-hidden-in-restore",
        "Bitcoin Core restore dialog where archive.bin is not selectable as a normal wallet backup"
      ),
    ],
    content: (
      <p>
        In this macOS and Bitcoin Core workflow, the restore dialog looks for
        the expected wallet file type. After the backup is renamed to
        <code> archive.bin</code>, it is no longer presented as a normal wallet
        backup. The file has not been encrypted or damaged; only its name and
        extension changed.
      </p>
    ),
  },
  {
    number: 14,
    title: "Rename it back to .dat",
    summary: "Restore the expected extension without changing the bytes.",
    images: [
      image(
        "14-rename-back-dat",
        "macOS Get Info window changing archive.bin back to archive.dat"
      ),
      image(
        "14-confirm-dat",
        "macOS warning asking whether to use the .dat extension"
      ),
      image(
        "14-result-dat",
        "Finder showing the backup restored to the archive.dat filename"
      ),
    ],
    content: (
      <p>
        In Finder, open <strong>Get Info</strong>, change the extension from
        <code> .bin</code> back to <code>.dat</code>, and confirm
        <strong> Use .dat</strong>. The underlying file contents remain
        unchanged throughout the rename.
      </p>
    ),
  },
  {
    number: 15,
    title: "Restore and verify the wallet",
    summary: "Load the backup and confirm the recovery result.",
    images: [
      image(
        "15-restore-wallet-menu",
        "Bitcoin Core File menu opening Restore Wallet for the final recovery test"
      ),
      image(
        "15-select-restored-dat",
        "Bitcoin Core restore dialog with archive.dat selected"
      ),
      image(
        "08-wallet-created-crisp",
        "Bitcoin Core overview after an encrypted test wallet is loaded",
        992,
        1586
      ),
    ],
    content: (
      <p>
        Open <strong>Restore Wallet</strong> again, select
        <code> archive.dat</code>, and complete the import. Confirm that the
        expected wallet loads and that its labels, addresses, and history are
        present. If the backup was encrypted, that encryption remains in effect.
        Loading the wallet and unlocking its private keys are still two separate
        operations.
      </p>
    ),
    noteKind: "critical",
    note: (
      <>
        A successful restore is the evidence that matters. Do not treat a copy
        operation, a familiar filename, or the presence of a file as proof that
        recovery works.
      </>
    ),
  },
]

const steps: GuideStep[] = [
  {
    ...legacySteps[0],
    number: 1,
    title: "Prepare a safe practice environment",
    summary: "Begin with no wallet loaded and no meaningful funds at risk.",
    content: (
      <>
        <p>
          Use a disposable practice wallet first. Install Bitcoin Core from the
          official source, keep the operating system current, and pause if you
          have any reason to suspect malware. Bitcoin Core can run and stay
          synchronized without a wallet loaded, which is the clean state used at
          the start of this exercise.
        </p>
        <p>
          Do not send meaningful funds to this wallet until you have completed
          and tested the entire backup and recovery workflow.
        </p>
      </>
    ),
  },
  { ...legacySteps[1], number: 2 },
  { ...legacySteps[2], number: 3 },
  {
    ...legacySteps[3],
    number: 4,
    title: "Generate and enter a strong passphrase",
    summary:
      "Use a password manager, enter the phrase twice, and keep its backup separate.",
    images: [...legacySteps[3].images, ...legacySteps[4].images],
    content: (
      <>
        {legacySteps[3].content}
        {legacySteps[4].content}
      </>
    ),
    note: legacySteps[4].note,
    noteKind: legacySteps[4].noteKind,
  },
  {
    ...legacySteps[5],
    number: 5,
    title: "Acknowledge Bitcoin Core's warnings",
    summary:
      "Understand both permanent passphrase loss and the limits of encryption against malware.",
    images: [...legacySteps[5].images, ...legacySteps[6].images],
    content: (
      <>
        {legacySteps[5].content}
        {legacySteps[6].content}
      </>
    ),
    noteKind: "critical",
    note: (
      <>
        Losing the passphrase can make the encrypted private keys unusable.
        Encryption also cannot make a compromised signing computer trustworthy.
        Stop here until you understand both warnings and have chosen an
        appropriate signing environment.
      </>
    ),
  },
  {
    ...legacySteps[8],
    number: 6,
    title: "Generate a receiving address",
  },
  {
    ...legacySteps[9],
    number: 7,
    title: "Back up the encrypted wallet",
  },
  {
    ...legacySteps[10],
    number: 8,
    title: "Open Restore Wallet",
  },
  {
    ...legacySteps[11],
    number: 9,
    title: "Select the backup file",
    summary:
      "Choose the wallet backup you intend to test, regardless of its filename.",
  },
  {
    ...legacySteps[14],
    number: 10,
    title: "Restore and verify the wallet",
    summary:
      "Confirm the expected wallet data returns and the private keys remain protected.",
    content: (
      <>
        {legacySteps[14].content}
        <p>
          A <strong>restore test</strong> proves that Bitcoin Core can load the
          backup and recover the expected wallet data. It does not by itself
          prove that you can complete your full signing workflow. For meaningful
          savings, follow this with the operational Signet PSBT exercise in the
          <a
            href="/en/bitcoin-core/self-custody/#lesson/9.1"
            className="font-semibold text-primary underline decoration-primary/45 underline-offset-4"
          >
            self-custody curriculum
          </a>
          .
        </p>
      </>
    ),
  },
  {
    number: 11,
    title: "Complete the operational checklist",
    summary:
      "Verify separation, redundancy, recovery, and the limits of wallet encryption.",
    images: [
      image(
        "08-wallet-created-crisp",
        "Bitcoin Core overview after an encrypted test wallet is loaded",
        992,
        1586
      ),
    ],
    content: (
      <p>
        Review the checklist below before treating the exercise as complete. A
        backup strategy is only credible after you have restored it, understood
        when the passphrase is required, and separated the wallet backup from
        the passphrase backup.
      </p>
    ),
    noteKind: "warning",
    note: (
      <>
        A restored wallet with the correct labels and addresses is useful
        evidence. A completed Signet PSBT round trip is stronger operational
        evidence that your signing and transport process also works.
      </>
    ),
  },
]

const finalChecklist = [
  "I created the wallet on an environment I trust.",
  "The wallet is encrypted with a strong, unique passphrase.",
  "I have securely backed up the passphrase.",
  "The passphrase backup is separate from the wallet backup.",
  "I created multiple wallet backup copies.",
  "The backup copies are stored across more than one failure domain or location.",
  "I successfully restored the wallet from a backup.",
  "I understand that restoring or opening the wallet does not require unlocking the private keys.",
  "I understand that the passphrase is required for signing or spending.",
  "I have a plan to periodically test my backups.",
  "For serious cold storage, my private-key signer is kept offline.",
]

function readStoredBooleans(key: string, length: number) {
  try {
    const value = JSON.parse(localStorage.getItem(key) ?? "[]")
    if (!Array.isArray(value)) return Array(length).fill(false) as boolean[]
    return Array.from({ length }, (_, index) => value[index] === true)
  } catch {
    return Array(length).fill(false) as boolean[]
  }
}

function writeStoredBooleans(key: string, value: boolean[]) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // Progress remains available for the current session when storage is blocked.
  }
}

function migrateStepProgress() {
  if (localStorage.getItem(STEP_STORAGE_KEY) !== null) {
    return readStoredBooleans(STEP_STORAGE_KEY, steps.length)
  }

  const legacy = readStoredBooleans(LEGACY_STEP_STORAGE_KEY, legacySteps.length)
  const migrated = [
    legacy[0],
    legacy[1],
    legacy[2],
    legacy[3] || legacy[4],
    legacy[5] || legacy[6],
    legacy[8],
    legacy[9],
    legacy[10],
    legacy[11],
    legacy[14],
    false,
  ]
  writeStoredBooleans(STEP_STORAGE_KEY, migrated)
  return migrated
}

function migrateChecklistProgress() {
  if (localStorage.getItem(CHECKLIST_STORAGE_KEY) !== null) {
    return readStoredBooleans(CHECKLIST_STORAGE_KEY, finalChecklist.length)
  }

  const legacy = readStoredBooleans(
    LEGACY_CHECKLIST_STORAGE_KEY,
    finalChecklist.length + 1
  )
  const migrated = [...legacy.slice(0, 9), ...legacy.slice(10)].slice(
    0,
    finalChecklist.length
  )
  writeStoredBooleans(CHECKLIST_STORAGE_KEY, migrated)
  return migrated
}

function setMetaContent(
  attribute: "name" | "property",
  key: string,
  content: string
) {
  let meta = document.head.querySelector<HTMLMetaElement>(
    `meta[${attribute}="${key}"]`
  )

  if (!meta) {
    meta = document.createElement("meta")
    meta.setAttribute(attribute, key)
    document.head.append(meta)
  }

  meta.content = content
}

function useGuideMetadata() {
  useEffect(() => {
    const title =
      "Bitcoin Core Wallet: Basic Setup, Encryption, Backup & Recovery"
    const description =
      "A step-by-step guide to creating a basic encrypted Bitcoin Core wallet, making redundant backups, and testing recovery."
    const url = `${SITE_URL}${BITCOIN_CORE_WALLET_GUIDE_PATH}`
    const socialImage = SOCIAL_CARD_IMAGES.walletGuide

    document.documentElement.lang = "en"
    document.title = title
    setMetaContent("name", "description", description)
    setMetaContent("property", "og:type", "article")
    setMetaContent("property", "og:title", title)
    setMetaContent("property", "og:description", description)
    setMetaContent("property", "og:url", url)
    setMetaContent("property", "og:locale", "en_US")
    setMetaContent("property", "og:image", socialImage)
    setMetaContent("name", "twitter:title", title)
    setMetaContent("name", "twitter:description", description)
    setMetaContent("name", "twitter:image", socialImage)

    let canonical = document.head.querySelector<HTMLLinkElement>(
      'link[rel="canonical"]'
    )
    if (!canonical) {
      canonical = document.createElement("link")
      canonical.rel = "canonical"
      document.head.append(canonical)
    }
    canonical.href = url
  }, [])
}

function HeaderProgress({
  completed,
  total,
}: {
  completed: number
  total: number
}) {
  const percentage = total === 0 ? 0 : (completed / total) * 100
  const remaining = Math.max(total - completed, 0)

  return (
    <div
      className="inline-flex min-h-11 items-center gap-2.5 rounded-full bg-card py-1.5 pr-3.5 pl-1.5 shadow-[var(--shadow-border)]"
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={total}
      aria-valuenow={completed}
      aria-valuetext={`${completed} of ${total} tutorial steps completed; ${remaining} remaining`}
    >
      <span className="relative grid size-10 shrink-0 place-items-center">
        <svg
          className="absolute inset-0 size-10 -rotate-90"
          viewBox="0 0 40 40"
          aria-hidden="true"
        >
          <circle
            cx="20"
            cy="20"
            r="16"
            fill="none"
            stroke="currentColor"
            strokeWidth="4"
            className="text-muted"
          />
          <circle
            cx="20"
            cy="20"
            r="16"
            pathLength="100"
            fill="none"
            stroke="currentColor"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeDasharray="100"
            strokeDashoffset={100 - percentage}
            className="text-primary"
          />
        </svg>
        <span className="relative grid size-8 place-items-center rounded-full bg-primary text-[10px] leading-none font-extrabold text-white tabular-nums shadow-[0_1px_2px_rgba(0,0,0,0.16)]">
          {completed}/{total}
        </span>
      </span>
      <span className="hidden border-l border-border/70 pl-2.5 text-xs font-semibold whitespace-nowrap text-muted-foreground tabular-nums lg:inline">
        {remaining === 0 ? "Complete" : `${remaining} remaining`}
      </span>
    </div>
  )
}

function StepCheckbox({
  checked,
  number,
  title,
  onChange,
}: {
  checked: boolean
  number: number
  title: string
  onChange: () => void
}) {
  return (
    <label className="group inline-flex min-h-11 cursor-pointer items-center gap-3 rounded-full bg-background px-3.5 text-sm font-semibold text-muted-foreground shadow-[var(--shadow-border)] transition-[color,background-color,transform] duration-200 hover:text-foreground active:scale-[0.96]">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="peer sr-only"
        aria-label={`Mark step ${number}, ${title}, complete`}
      />
      <span className="grid size-5 place-items-center rounded-full bg-muted text-transparent shadow-[inset_0_0_0_1px_rgba(0,0,0,0.08)] transition-[background-color,color,transform] duration-200 peer-checked:bg-success peer-checked:text-success-foreground peer-focus-visible:outline-2 peer-focus-visible:outline-offset-3 peer-focus-visible:outline-success">
        <Check className="size-3.5" strokeWidth={3} aria-hidden="true" />
      </span>
      {checked ? "Completed" : "Mark complete"}
    </label>
  )
}

function GuideCallout({
  kind = "note",
  children,
}: {
  kind?: "note" | "warning" | "critical"
  children: ReactNode
}) {
  const Icon =
    kind === "note"
      ? CheckCircle2
      : kind === "warning"
        ? TriangleAlert
        : ShieldAlert
  const style =
    kind === "critical"
      ? "bg-[#7f1d1d] text-white"
      : kind === "warning"
        ? "bg-[#f3b61f]/14 text-foreground"
        : "bg-primary/9 text-foreground"

  return (
    <aside className={`mt-6 flex gap-4 rounded-[22px] p-5 sm:p-6 ${style}`}>
      <Icon className="mt-0.5 size-5 shrink-0" aria-hidden="true" />
      <div className="text-sm leading-7 text-pretty">{children}</div>
    </aside>
  )
}

function ScreenshotButton({
  screenshot,
  onOpen,
}: {
  screenshot: GuideImage
  onOpen: (image: GuideImage, opener: HTMLButtonElement) => void
}) {
  return (
    <button
      type="button"
      className="group relative block w-full overflow-hidden rounded-[20px] bg-muted shadow-[var(--shadow-border)] transition-[transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-[var(--shadow-elevated)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary active:scale-[0.96]"
      onClick={(event) => onOpen(screenshot, event.currentTarget)}
      aria-label={`Open larger image: ${screenshot.alt}`}
    >
      <img
        src={screenshot.src}
        alt={screenshot.alt}
        width={screenshot.width}
        height={screenshot.height}
        loading="lazy"
        decoding="async"
        className="block h-auto w-full outline -outline-offset-1 outline-black/10 dark:outline-white/10"
      />
      <span className="absolute right-3 bottom-3 grid size-10 place-items-center rounded-full bg-background/88 text-foreground opacity-0 shadow-lg backdrop-blur transition-[opacity,transform] duration-200 group-hover:opacity-100 group-focus-visible:opacity-100">
        <Maximize2 className="size-4" aria-hidden="true" />
      </span>
    </button>
  )
}

function Lightbox({
  image,
  onClose,
  returnFocus,
}: {
  image: GuideImage | null
  onClose: () => void
  returnFocus: MutableRefObject<HTMLButtonElement | null>
}) {
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!image) return undefined
    const opener = returnFocus.current
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    closeRef.current?.focus()

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose()
    }
    window.addEventListener("keydown", onKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener("keydown", onKeyDown)
      opener?.focus()
    }
  }, [image, onClose, returnFocus])

  if (!image) return null

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-[#06131f]/94 p-3 backdrop-blur-sm sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={image.alt}
      onMouseDown={(event) => {
        if (event.currentTarget === event.target) onClose()
      }}
    >
      <button
        ref={closeRef}
        type="button"
        className="absolute top-4 right-4 grid size-11 place-items-center rounded-full bg-white text-[#0d3153] shadow-xl transition-transform duration-200 active:scale-[0.96] sm:top-6 sm:right-6"
        onClick={onClose}
        aria-label="Close enlarged image"
      >
        <X className="size-5" aria-hidden="true" />
      </button>
      <img
        src={image.src}
        alt={image.alt}
        width={image.width}
        height={image.height}
        className="max-h-[88vh] max-w-full rounded-xl object-contain outline -outline-offset-1 outline-white/15"
      />
    </div>
  )
}

function OptionalObfuscation({
  onOpen,
}: {
  onOpen: (image: GuideImage, opener: HTMLButtonElement) => void
}) {
  const screenshots = [
    image(
      "obfuscation-wallet-dat",
      "Finder showing the original Test Wallet.dat backup"
    ),
    image(
      "obfuscation-get-info-menu",
      "Finder context menu with Get Info selected for Test Wallet.dat"
    ),
    image(
      "obfuscation-rename-bin",
      "macOS Get Info window renaming Test Wallet.dat to archive.bin"
    ),
    image(
      "obfuscation-confirm-bin",
      "macOS warning asking whether to use the .bin extension",
      1126
    ),
    image(
      "obfuscation-result-bin",
      "Finder showing the renamed generic archive.bin file"
    ),
  ]

  return (
    <section className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14">
      <div className="overflow-hidden rounded-[30px] bg-[#0d3153] text-white shadow-[var(--shadow-elevated)]">
        <div className="grid gap-8 p-6 sm:p-9 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
          <div className="lg:sticky lg:top-24">
            <span className="inline-flex min-h-10 items-center rounded-full bg-white/10 px-3 text-[11px] font-bold tracking-[0.16em] text-white/72 uppercase">
              Privacy layer
            </span>
            <h2 className="mt-5 max-w-[14ch] font-display text-3xl leading-[1.02] font-bold tracking-[-0.045em] text-balance sm:text-5xl">
              Optional: Make the backup less obvious
            </h2>
            <p className="mt-5 text-base leading-8 text-pretty text-white/74">
              A generic filename such as <code>archive.bin</code> makes the file
              less obvious to a casual observer. The underlying bytes do not
              change. This is obfuscation, not cryptographic security.
            </p>
            <p className="mt-4 text-sm leading-7 text-white/66">
              Avoid names such as <code>bitcoin-wallet.dat</code>,
              <code> cold-storage-wallet.dat</code>, or
              <code> life-savings.dat</code>. A technically capable observer may
              still identify the file format.
            </p>
            <p className="mt-4 text-sm leading-7 text-white/66">
              If the whole backup must remain confidential, place the already
              encrypted Bitcoin Core wallet inside an additional encrypted
              archive or container, such as{" "}
              <ResourceLink href={GNUPG_DOWNLOAD_URL} inverse>
                GPG/OpenPGP
              </ResourceLink>{" "}
              symmetric encryption, an AES-encrypted archive, or an encrypted
              container.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {screenshots.map((screenshot, index) => (
              <div
                key={screenshot.src}
                className={
                  index === screenshots.length - 1 ? "sm:col-span-2" : undefined
                }
              >
                <ScreenshotButton screenshot={screenshot} onOpen={onOpen} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function SeriousColdStorage() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14">
      <div className="rounded-[30px] bg-card p-6 shadow-[var(--shadow-border)] sm:p-9">
        <div className="flex gap-4">
          <span className="grid size-11 shrink-0 place-items-center rounded-full bg-primary/12 text-primary">
            <ShieldAlert className="size-5" aria-hidden="true" />
          </span>
          <div>
            <p className="text-[11px] font-bold tracking-[0.16em] text-primary uppercase">
              Best practice for serious cold storage
            </p>
            <h2 className="mt-3 max-w-[19ch] font-display text-3xl leading-[1.05] font-bold tracking-[-0.04em] text-balance sm:text-4xl">
              Separate signing from network activity
            </h2>
          </div>
        </div>

        <p className="mt-6 max-w-3xl text-base leading-8 text-pretty text-muted-foreground">
          For meaningful long-term cold storage, consider a dedicated signing
          computer: an older general-purpose laptop with a clean Linux
          installation,{" "}
          <ResourceLink href={BITCOIN_CORE_DOWNLOAD_URL}>
            Bitcoin Core
          </ResourceLink>
          , and{" "}
          <ResourceLink href={KEEPASSXC_DOWNLOAD_URL}>KeePassXC</ResourceLink>{" "}
          if needed.{" "}
          <ResourceLink href={FEDORA_WORKSTATION_DOWNLOAD_URL}>
            Fedora Workstation
          </ResourceLink>{" "}
          is a practical choice for modern hardware;{" "}
          <ResourceLink href={FEDORA_XFCE_DOWNLOAD_URL}>
            Fedora Xfce Spin
          </ResourceLink>{" "}
          or another lightweight desktop may suit older machines.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <div className="rounded-[22px] bg-background p-5 shadow-[var(--shadow-border)]">
            <WifiOff className="size-5 text-primary" aria-hidden="true" />
            <h3 className="mt-4 font-display text-xl font-bold">
              Offline signing computer
            </h3>
            <ul className="mt-4 grid gap-2 text-sm leading-6 text-muted-foreground">
              <li>Dedicated to key generation and signing.</li>
              <li>
                Kept offline; not used for browsing, email, or daily work.
              </li>
              <li>Software authenticity verified before installation.</li>
            </ul>
          </div>
          <div className="rounded-[22px] bg-background p-5 shadow-[var(--shadow-border)]">
            <Wifi className="size-5 text-primary" aria-hidden="true" />
            <h3 className="mt-4 font-display text-xl font-bold">
              Separate online node
            </h3>
            <ul className="mt-4 grid gap-2 text-sm leading-6 text-muted-foreground">
              <li>Runs a synchronized Bitcoin Core node.</li>
              <li>Prepares transactions and broadcasts signed transactions.</li>
              <li>Does not need to hold the private-key wallet.</li>
            </ul>
          </div>
        </div>

        <p className="mt-6 text-sm leading-7 text-pretty text-muted-foreground">
          An advanced PSBT workflow prepares a transaction online, moves the
          unsigned PSBT to the offline signer, verifies and signs it there, then
          returns the signed transaction for broadcast. Transaction signing is
          outside this basic tutorial.
        </p>
      </div>
    </section>
  )
}

function ArchitectureDiagram() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-16">
      <p className="text-[11px] font-bold tracking-[0.16em] text-primary uppercase">
        Recommended architecture
      </p>
      <h2 className="mt-4 max-w-[16ch] font-display text-3xl leading-[1.03] font-bold tracking-[-0.045em] text-balance sm:text-5xl">
        Private keys stay offline
      </h2>

      <div className="mt-8 grid gap-4 lg:grid-cols-[1fr_auto_1fr] lg:items-stretch">
        <div className="rounded-[26px] bg-card p-6 shadow-[var(--shadow-border)] sm:p-7">
          <span className="grid size-11 place-items-center rounded-full bg-primary/12 text-primary">
            <Wifi className="size-5" aria-hidden="true" />
          </span>
          <p className="mt-5 text-[11px] font-bold tracking-[0.14em] text-primary uppercase">
            Online node
          </p>
          <h3 className="mt-2 font-display text-2xl font-bold">
            Internet-connected computer
          </h3>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">
            Synced Bitcoin Core node → creates transactions → broadcasts signed
            transactions
          </p>
        </div>

        <div className="flex items-center justify-center gap-3 rounded-full bg-primary/10 px-5 py-3 text-xs font-bold tracking-[0.12em] text-primary uppercase lg:my-auto lg:flex-col lg:rounded-[22px] lg:px-4 lg:py-5">
          <ArrowRightLeft className="size-5 lg:rotate-90" aria-hidden="true" />
          PSBT data
        </div>

        <div className="rounded-[26px] bg-[#0d3153] p-6 text-white shadow-[var(--shadow-elevated)] sm:p-7">
          <span className="grid size-11 place-items-center rounded-full bg-white/12 text-[#7cc9ff]">
            <WifiOff className="size-5" aria-hidden="true" />
          </span>
          <p className="mt-5 text-[11px] font-bold tracking-[0.14em] text-[#7cc9ff] uppercase">
            Offline signer
          </p>
          <h3 className="mt-2 font-display text-2xl font-bold">
            Dedicated Linux laptop
          </h3>
          <p className="mt-3 text-sm leading-7 text-white/72">
            Bitcoin Core wallet → private keys → verifies and signs PSBT
          </p>
          <p className="mt-5 inline-flex min-h-10 items-center rounded-full bg-white/10 px-3 text-xs font-bold text-white">
            Private keys never move online
          </p>
        </div>
      </div>

      <p className="mt-5 max-w-3xl text-sm leading-7 text-muted-foreground">
        USB storage is one possible transport method, but using a USB device is
        not automatically safe. The transport method needs its own operational
        controls.
      </p>
    </section>
  )
}

export function BitcoinCoreWalletGuidePage() {
  useGuideMetadata()
  const [completedSteps, setCompletedSteps] = useState<boolean[]>(() =>
    Array(steps.length).fill(false)
  )
  const [checkedFinal, setCheckedFinal] = useState<boolean[]>(() =>
    Array(finalChecklist.length).fill(false)
  )
  const [storageReady, setStorageReady] = useState(false)
  const [lightboxImage, setLightboxImage] = useState<GuideImage | null>(null)
  const lightboxOpener = useRef<HTMLButtonElement | null>(null)

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setCompletedSteps(migrateStepProgress())
      setCheckedFinal(migrateChecklistProgress())
      setStorageReady(true)
    })

    return () => window.cancelAnimationFrame(frame)
  }, [])

  useEffect(() => {
    if (storageReady) writeStoredBooleans(STEP_STORAGE_KEY, completedSteps)
  }, [completedSteps, storageReady])

  useEffect(() => {
    if (storageReady) writeStoredBooleans(CHECKLIST_STORAGE_KEY, checkedFinal)
  }, [checkedFinal, storageReady])

  const completedCount = useMemo(
    () => completedSteps.filter(Boolean).length,
    [completedSteps]
  )
  const finalCompletedCount = useMemo(
    () => checkedFinal.filter(Boolean).length,
    [checkedFinal]
  )
  const progress = (completedCount / steps.length) * 100

  const openImage = (selectedImage: GuideImage, opener: HTMLButtonElement) => {
    lightboxOpener.current = opener
    setLightboxImage(selectedImage)
  }
  const closeLightbox = useCallback(() => setLightboxImage(null), [])

  return (
    <div className="min-h-screen bg-background text-foreground antialiased">
      <a className="skip-link" href="#guide">
        Skip to guide
      </a>
      <ValueForValueRail language="en" />

      <SiteHeader />
      <div className="border-b border-border/60 bg-background/92">
        <div className="mx-auto flex min-h-14 max-w-5xl items-center justify-between gap-3 px-4 sm:px-6">
          <HeaderProgress completed={completedCount} total={steps.length} />
          <a
            href={EN_BITCOIN_CORE_SERIES_PATH}
            aria-label="Back to Bitcoin Core guides"
            className="inline-flex min-h-11 items-center gap-2 rounded-full px-3 text-sm font-semibold text-muted-foreground transition-[color,background-color,transform] duration-200 hover:bg-card hover:text-foreground active:scale-[0.96] sm:px-4"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
            <span className="hidden sm:inline">Bitcoin Core</span>
          </a>
        </div>
      </div>

      <main id="guide">
        <section className="mx-auto max-w-5xl px-4 pt-14 pb-10 sm:px-6 sm:pt-20 sm:pb-14">
          <p className="text-[11px] font-bold tracking-[0.18em] text-primary uppercase">
            Bitcoin Core · Basic setup guide
          </p>
          <h1 className="mt-5 max-w-[15ch] font-display text-5xl leading-[0.96] font-bold tracking-[-0.058em] text-balance sm:text-7xl">
            Bitcoin Core Wallet: Basic Setup, Encryption, Backup & Recovery
          </h1>
          <p className="mt-7 max-w-3xl text-lg leading-8 text-pretty text-muted-foreground sm:text-xl sm:leading-9">
            A step-by-step guide to creating a basic encrypted Bitcoin Core
            wallet, making redundant backups, and restoring it when needed.
          </p>

          <TutorialMetadata
            language="en"
            className="mt-10"
            goal="Create, encrypt, back up, restore, and verify a disposable Bitcoin Core wallet."
            difficulty="Beginner to intermediate"
            estimatedTime="60–90 minutes"
            realBitcoin="No. Complete the full recovery test before considering funds."
            softwareVersion="Bitcoin Core 31.1"
            operatingSystems="The screenshots use macOS; the workflow also applies to Windows and Linux."
            recommendedOs={
              <>
                For a dedicated signer, use a clean installation such as{" "}
                <a href={FEDORA_WORKSTATION_DOWNLOAD_URL}>Fedora Workstation</a>{" "}
                or <a href={FEDORA_XFCE_DOWNLOAD_URL}>Fedora Xfce</a>.
              </>
            }
            prerequisites="Bitcoin Core installed from an official source, an empty practice environment, and a separate place for passphrase notes."
            outcome="A restored practice wallet whose addresses and metadata match the original."
            lastReviewed="24 August 2026"
          />

          <div className="mt-10 grid gap-4 rounded-[28px] bg-card p-5 shadow-[var(--shadow-border)] sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center sm:p-7">
            <div>
              <div className="flex items-end justify-between gap-4">
                <div>
                  <p className="text-[11px] font-bold tracking-[0.14em] text-primary uppercase">
                    Your progress
                  </p>
                  <p
                    className="mt-2 font-display text-2xl font-bold tracking-[-0.04em] tabular-nums"
                    aria-live="polite"
                  >
                    {completedCount} of {steps.length} steps completed
                  </p>
                </div>
                <span className="text-sm font-bold text-primary tabular-nums">
                  {Math.round(progress)}%
                </span>
              </div>
              <div
                className="mt-4 h-2 overflow-hidden rounded-full bg-muted"
                role="progressbar"
                aria-valuemin={0}
                aria-valuemax={steps.length}
                aria-valuenow={completedCount}
                aria-label="Guide progress"
              >
                <span
                  className="block h-full rounded-full bg-primary transition-[width] duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
            <button
              type="button"
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-4 text-sm font-semibold text-muted-foreground transition-[color,background-color,transform] duration-200 hover:bg-background hover:text-foreground active:scale-[0.96]"
              onClick={() => setCompletedSteps(Array(steps.length).fill(false))}
            >
              <RefreshCcw className="size-4" aria-hidden="true" />
              Reset progress
            </button>
          </div>

          <GuideCallout kind="note">
            This is a basic setup tutorial, not a complete security model for
            every threat scenario. Use no meaningful funds while learning, and
            adapt the process to your own threat model.
          </GuideCallout>
        </section>

        <div className="border-y border-border/60 bg-card/38">
          {steps.map((step, index) => (
            <div key={step.number}>
              <section
                id={`step-${step.number}`}
                className="mx-auto max-w-5xl scroll-mt-24 px-4 py-12 sm:px-6 sm:py-16"
                aria-labelledby={`step-title-${step.number}`}
              >
                <div className="grid gap-8 lg:grid-cols-[230px_minmax(0,1fr)] lg:gap-12">
                  <div className="lg:sticky lg:top-24 lg:self-start">
                    <div className="flex items-center gap-3">
                      <span className="grid size-11 place-items-center rounded-full bg-primary text-sm font-bold text-white tabular-nums">
                        {String(step.number).padStart(2, "0")}
                      </span>
                      <span className="text-[11px] font-bold tracking-[0.16em] text-muted-foreground uppercase">
                        Step {step.number}
                      </span>
                    </div>
                    <h2
                      id={`step-title-${step.number}`}
                      className="mt-5 font-display text-3xl leading-[1.03] font-bold tracking-[-0.045em] text-balance"
                    >
                      {step.title}
                    </h2>
                    <p className="mt-3 text-sm leading-6 text-pretty text-muted-foreground">
                      {step.summary}
                    </p>
                    <div className="mt-6">
                      <StepCheckbox
                        checked={completedSteps[index]}
                        number={step.number}
                        title={step.title}
                        onChange={() =>
                          setCompletedSteps((current) =>
                            current.map((value, itemIndex) =>
                              itemIndex === index ? !value : value
                            )
                          )
                        }
                      />
                    </div>
                  </div>

                  <div>
                    <div
                      className={`grid gap-4 ${step.images.length > 1 ? "sm:grid-cols-2" : ""}`}
                    >
                      {step.images.map((screenshot, imageIndex) => (
                        <div
                          key={screenshot.src}
                          className={
                            step.images.length === 3 && imageIndex === 2
                              ? "sm:col-span-2"
                              : undefined
                          }
                        >
                          <ScreenshotButton
                            screenshot={screenshot}
                            onOpen={openImage}
                          />
                        </div>
                      ))}
                    </div>
                    <div className="mt-7 grid gap-4 text-base leading-8 text-pretty text-muted-foreground [&_code]:rounded-md [&_code]:bg-muted [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-[0.9em] [&_li]:pl-1 [&_strong]:font-semibold [&_strong]:text-foreground [&_ul]:grid [&_ul]:gap-2 [&_ul]:pl-5 [&_ul]:marker:text-primary">
                      {step.content}
                    </div>
                    {step.note ? (
                      <GuideCallout kind={step.noteKind}>
                        {step.note}
                      </GuideCallout>
                    ) : null}
                  </div>
                </div>
              </section>

              {step.number === 5 ? <SeriousColdStorage /> : null}
              {step.number === 9 ? (
                <OptionalObfuscation onOpen={openImage} />
              ) : null}
              {index < steps.length - 1 ? (
                <div className="mx-auto h-px max-w-5xl bg-border/70" />
              ) : null}
            </div>
          ))}
        </div>

        <ArchitectureDiagram />

        <section className="mx-auto max-w-5xl px-4 pb-16 sm:px-6 sm:pb-20">
          <div className="rounded-[32px] bg-card p-6 shadow-[var(--shadow-border)] sm:p-9">
            <div className="flex flex-wrap items-start justify-between gap-5">
              <div>
                <p className="text-[11px] font-bold tracking-[0.16em] text-primary uppercase">
                  Final check
                </p>
                <h2 className="mt-4 max-w-[18ch] font-display text-3xl leading-[1.03] font-bold tracking-[-0.045em] text-balance sm:text-5xl">
                  Before putting meaningful bitcoin into this wallet
                </h2>
              </div>
              <span className="rounded-full bg-primary/10 px-4 py-2 text-sm font-bold text-primary tabular-nums">
                {finalCompletedCount}/{finalChecklist.length}
              </span>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {finalChecklist.map((item, index) => (
                <label
                  key={item}
                  className={`group flex min-h-14 cursor-pointer items-start gap-3 rounded-[18px] p-4 text-sm leading-6 shadow-[var(--shadow-border)] transition-[background-color,color,transform] duration-200 active:scale-[0.96] ${checkedFinal[index] ? "bg-success/10 text-foreground" : "bg-background text-muted-foreground hover:text-foreground"}`}
                >
                  <input
                    type="checkbox"
                    className="peer sr-only"
                    checked={checkedFinal[index]}
                    onChange={() =>
                      setCheckedFinal((current) =>
                        current.map((value, itemIndex) =>
                          itemIndex === index ? !value : value
                        )
                      )
                    }
                  />
                  <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-muted text-transparent transition-[background-color,color] duration-200 peer-checked:bg-success peer-checked:text-success-foreground peer-focus-visible:outline-2 peer-focus-visible:outline-offset-3 peer-focus-visible:outline-success">
                    <Check
                      className="size-3.5"
                      strokeWidth={3}
                      aria-hidden="true"
                    />
                  </span>
                  <span>{item}</span>
                </label>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
              <p className="text-sm text-muted-foreground" aria-live="polite">
                {finalCompletedCount === finalChecklist.length
                  ? "Checklist complete. Keep your recovery plan current."
                  : "Complete every item before moving meaningful funds."}
              </p>
              <button
                type="button"
                className="inline-flex min-h-11 items-center gap-2 rounded-full px-4 text-sm font-semibold text-muted-foreground transition-[color,background-color,transform] duration-200 hover:bg-background hover:text-foreground active:scale-[0.96]"
                onClick={() =>
                  setCheckedFinal(Array(finalChecklist.length).fill(false))
                }
              >
                <RefreshCcw className="size-4" aria-hidden="true" />
                Reset checklist
              </button>
            </div>
          </div>
        </section>

        <div className="mx-auto max-w-5xl px-4 pb-16 sm:px-6 sm:pb-20">
          <ValueForValueCard language="en" />
        </div>
      </main>

      <footer className="border-t border-border/60 py-8 text-center text-xs leading-6 text-muted-foreground">
        <p>Educational material, not investment, legal, or tax advice.</p>
        <p>
          {SITE_URL.replace("https://", "")} · {BITCOIN_CORE_WALLET_GUIDE_PATH}
        </p>
      </footer>

      <Lightbox
        image={lightboxImage}
        onClose={closeLightbox}
        returnFocus={lightboxOpener}
      />
    </div>
  )
}
