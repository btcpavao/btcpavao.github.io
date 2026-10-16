import { SectionIcon } from "@/components/section-icon"
import { articleLinkProps } from "@/article-links"
import { ImageViewer, type Gallery } from "@/components/zoomable-image"
import { PassphraseExplorer } from "@/components/passphrase-explorer"
import { findContentByPath } from "@/content-registry"
import { CustodyArchitecture } from "@/components/custody-architecture"
import { DEBIAN_IMAGES_PATH } from "@/components/debian-images-notice"
import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react"
import {
  ArrowLeft,
  Brain,
  Check,
  CheckCircle2,
  Copy,
  HardDrive,
  Maximize2,
  RefreshCcw,
  ShieldAlert,
  TriangleAlert,
  UserRoundX,
  Wifi,
  WifiOff,
  type LucideIcon,
} from "lucide-react"

import { SiteHeader } from "@/components/site-header"
import { ConsultingInvitation } from "@/components/consulting-invitation"
import { TutorialMetadata } from "@/components/tutorial-metadata"
import {
  ValueForValueCard,
  ValueForValueRail,
} from "@/components/value-for-value"
import {
  BITCOIN_CORE_WALLET_GUIDE_PATH,
  EN_BITCOIN_CORE_SERIES_PATH,
  EN_BITCOIN_CORE_CURRICULUM_PATH,
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
const DEBIAN_DOWNLOAD_URL = "https://www.debian.org/distrib/"
const TAILS_INSTALL_URL = "https://tails.net/install/"
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
      {...articleLinkProps(href)}
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
    summary: "Generate random words with KeePassXC and explore the cost of guessing them.",
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
          Download and install <ResourceLink href={KEEPASSXC_DOWNLOAD_URL}>KeePassXC</ResourceLink>{" "}
          for Windows, macOS or Linux, then open it. You can follow this practice
          exercise on the computer you already use, with an empty test wallet
          and a passphrase you will never reuse for real funds.
        </p>
        <p>
          Open Tools → Password Generator → Passphrase. Use the bundled EFF
          large wordlist, choose lower-case words separated by a single space,
          and let KeePassXC generate them. Keep the words in their generated
          order, including any repeats. You do not need to create a password
          database just to use the generator.
        </p>
        <p>
          <ResourceLink href="https://github.com/bitcoin/bitcoin/blob/v31.1/src/qt/askpassphrasedialog.cpp#L37">
            Bitcoin Core’s encryption dialog recommends eight or more words
          </ResourceLink>.
          Eight independently generated random words are a good starting point
          for this exercise and match the screenshots. Before deciding on eight,
          more or fewer, try the calculator below to see how the word count
          changes the estimated effort and cost of guessing the passphrase.
        </p>
        <p>
          Entropy describes how many possible combinations an attacker has to
          consider. With randomly generated words, more entropy means more
          possibilities to try. Brute force means testing those possibilities
          until one works: more guesses generally mean more computing time and
          a bigger bill. Entropy is not itself a price tag; the cost also depends
          on how quickly guesses can be tested and what the computing power costs.
        </p>
        <p>
          The calculator gives you a rough feel for that relationship. Under its
          starting assumptions, eight random words imply an enormous guessing
          cost — and so do seven and even six. Move the slider through six,
          seven and eight words and compare the numbers yourself. Fewer random
          words are generally easier to remember but offer less protection
          against guessing; more words offer more protection but are harder to
          remember. Explore the trade-off until those numbers mean something to
          you, rather than choosing a word count without understanding it.
        </p>
        <p>
          These are illustrations under the displayed assumptions, not a current
          market quote or a guarantee. Computing power and attack methods improve:
          an attack that looks prohibitively expensive today may cost less in a
          year, ten years or thirty years. That is why I leave an extra safety
          margin instead of choosing only what appears sufficient today. Whatever
          you choose, keep a separate recovery record rather than relying on
          memory alone. The calculations apply to independently generated random
          words, not a sentence you invent. For more detail, see the curriculum’s{" "}
          <a className="font-semibold underline underline-offset-4" {...articleLinkProps(`${EN_BITCOIN_CORE_CURRICULUM_PATH}#lesson/passphrase-strength`)}>entropy explanation</a>{" "}
          and <a className="font-semibold underline underline-offset-4" {...articleLinkProps(`${EN_BITCOIN_CORE_CURRICULUM_PATH}#lesson/brute-force-economics`)}>attack-economics exercise</a>.
        </p>
        <PassphraseExplorer guidance="guide" />
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
          For meaningful amounts, I do not recommend creating or unlocking a
          wallet on your daily computer. Browsers, extensions, email attachments
          and everyday software expose that machine to malware. An antivirus or
          anti-malware scan reporting “clean” does not establish that it is safe
          to handle wallet secrets. Even after cleanup, that residual risk is
          too high for serious savings in my view.
        </p>
        <p>
          Use a dedicated generic computer with a fresh Linux installation. My
          recommended foundation is{" "}
          <ResourceLink href={DEBIAN_DOWNLOAD_URL}>Debian Stable</ResourceLink>{" "}
          and{" "}
          <ResourceLink href={BITCOIN_CORE_DOWNLOAD_URL}>
            verified Bitcoin Core
          </ResourceLink>{" "}
          . First learn to create, encrypt, back up and restore one disposable
          wallet. The full curriculum later separates online coordination from
          offline signing, after the one-wallet mastery checkpoint.
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
          another computer, or geographically separated storage. For an
          additional cloud copy, first encrypt the complete backup locally using
          the <a {...articleLinkProps("#optional-backup-protection")} className="font-semibold text-primary underline underline-offset-4">GPG backup workflow below</a>.
          Upload only the final encrypted .gpg file, never the bare wallet file or its
          passphrases.
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
        If you used GPG, first decrypt every layer in your trusted recovery
        environment, starting with the outermost layer. Each layer needs its own
        passphrase. If the final payload is a TAR archive, extract it there too.
        Then choose <strong>File → Restore Wallet</strong>. Bitcoin Core restores
        the recovered wallet file, not the <code>.gpg</code> file or TAR archive.
        Restoring an encrypted
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
        Navigate to the backup location or your private extraction folder,
        select the wallet <code>.dat</code>
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
        Open <strong>Restore Wallet</strong> again, select the extracted or
        directly saved wallet backup (<code>archive.dat</code> in this
        screenshot), and complete the import. Confirm that the
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
          This is a conceptual walkthrough with a disposable wallet, not a
          complete deployment procedure. Use no real bitcoin here. Before
          committing meaningful funds, work through the full self-custody
          curriculum and prepare a dedicated computer with a fresh Linux
          installation. A practice wallet created on your daily computer should
          remain a practice wallet.
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
      "Use KeePassXC, enter the phrase twice, and keep its recovery record separate.",
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
          A <strong>restore test</strong> shows that Core can load the backup
          and recover its wallet data. Next, prove that the restored keys can
          sign a test payment while the original stays closed. Follow the
          complete one-wallet sequence in the{" "}
          <a
            {...articleLinkProps(EN_BITCOIN_CORE_CURRICULUM_PATH)}
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
        evidence. A confirmed test payment from the restored wallet proves
        signing capability. The curriculum teaches that first, then introduces
        the separate offline-signing workflow.
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
  "I understand why the curriculum later separates offline signing from online coordination.",
  "If I used GPG, I decrypted every layer, restored the wallet and backed up every required passphrase separately.",
  "Before meaningful funds, I will complete the self-custody curriculum and prepare a dedicated computer with fresh Linux, not reuse this practice wallet on my daily computer.",
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
    const { title, description } = findContentByPath("/en/bitcoin-core/wallet-setup-backup-recovery/")!
    const url = `${SITE_URL}${BITCOIN_CORE_WALLET_GUIDE_PATH}`
    const socialImage = SOCIAL_CARD_IMAGES.walletGuide

    document.documentElement.lang = "en"
    document.title = title
    setMetaContent("name", "description", description)
    setMetaContent("property", "og:type", "website")
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
      data-gallery-image
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

function OptionalBackupProtection({
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
    <section id="optional-backup-protection" aria-labelledby="backup-protection-title" className="mx-auto max-w-5xl scroll-mt-24 px-4 py-10 sm:px-6 sm:py-14">
      <div className="overflow-hidden rounded-[30px] bg-[#0d3153] text-white shadow-[var(--shadow-elevated)]">
        <div className="p-6 sm:p-9">
          <h2 id="backup-protection-title" className="learning-heading max-w-[23ch] font-display text-3xl leading-[1.08] font-bold tracking-[-0.03em] text-balance sm:text-5xl">
            <SectionIcon topic="encrypt backup" /><span>Encrypt the whole backup with GPG</span>
          </h2>
          <p className="mt-5 max-w-[70ch] text-base leading-8 text-white/80">
            Bitcoin Core’s wallet encryption protects private-key material.
            My recommendation for protecting the entire backup is GPG symmetric
            encryption: one layer by default, with additional independent layers
            when they serve a clear purpose. The encrypted payload hides wallet
            metadata and any filenames packaged inside it. Someone holding the
            file cannot simply browse its contents without decrypting it.
          </p>

          <div className="mt-8 max-w-[75ch] space-y-5 text-base leading-8 text-white/80 [&_strong]:text-white">
            <p>
              This is content privacy, not invisibility. The outer filename,
              size and storage timestamps remain visible, and the file can be
              recognized as encrypted OpenPGP data. GPG does not protect secrets
              while malware can read them on the computer doing the encryption
              or recovery.
            </p>
            <h3 className="learning-heading text-2xl leading-tight font-bold text-white"><SectionIcon topic="core" /><span>Coming soon: Bitcoin Core Vault on Debian</span></h3>
            <p>
              The upcoming <ResourceLink href={`${DEBIAN_IMAGES_PATH}#vault`} inverse>Bitcoin Core Vault Debian ISO</ResourceLink>{" "}
              is being prepared so you can follow this workflow with Bitcoin
              Core, GnuPG, TAR and KeePassXC already included. Its planned backup
              interface uses one GPG layer by default and lets you add independent
              layers as needed. TAR packages files and folders before encryption;
              the interface is intended to handle packaging and recovery for you.
            </p>
            <p>
              The redesign targets authenticated AES-256 OCB encryption, private
              RAM working storage and recovery with compatible standard GnuPG
              and TAR tools, without requiring the Vault interface. The ISO is
              still in development. Download links, verification instructions and
              the exact supported GnuPG profile will accompany the release.
            </p>

            <h3 className="learning-heading pt-4 text-2xl leading-tight font-bold text-white"><SectionIcon topic="setup" /><span>Install GPG for an independent practice session</span></h3>
            <p>
              You do not need to wait for the ISO to learn the basic workflow.
              GnuPG provides the <code>gpg</code> command. Install maintained
              software from official sources during preparation, before taking
              a dedicated signing environment offline.
            </p>
            <ul className="list-disc space-y-3 pl-6 [&_li]:pl-2">
              <li><strong>Debian / Ubuntu:</strong> use the authenticated package repositories:
                <code className="mt-2 block break-words rounded-xl bg-black/20 p-4 text-sm sm:p-6">sudo apt update<br />sudo apt install gnupg</code>
                For Debian, see the <ResourceLink href="https://packages.debian.org/trixie/gnupg" inverse>GnuPG package</ResourceLink>.
              </li>
              <li><strong>Other Linux distributions:</strong> install GnuPG through your distribution’s authenticated package manager.</li>
              <li><strong>Windows:</strong> install <ResourceLink href="https://gpg4win.org/download.html" inverse>Gpg4win</ResourceLink> from its official website and follow its installer-verification instructions. It includes GnuPG and the Kleopatra interface.</li>
              <li><strong>macOS:</strong> for a graphical workflow, I recommend <ResourceLink href="https://gpgtools.org/" inverse>GPG Suite</ResourceLink> and its <strong>GPG Services</strong> integration in Finder. Use the password-only steps below. If you prefer Terminal and already use Homebrew, run <code>brew install gnupg</code> using the <ResourceLink href="https://formulae.brew.sh/formula/gnupg" inverse>GnuPG formula</ResourceLink>. Other macOS distributions are listed on the <ResourceLink href={GNUPG_DOWNLOAD_URL} inverse>official GnuPG download page</ResourceLink>.</li>
            </ul>
            <p>
              Open Terminal (or PowerShell on Windows) and run <code>gpg --version</code>.
              These installation options let you practise on your operating
              system; they do not change my recommendation for serious funds:
              dedicated hardware with a fresh Linux installation.
            </p>

            <details className="border-t border-white/20 pt-4" id="macos-gpg-services">
              <summary className="cursor-pointer py-2 font-semibold text-white">macOS graphical workflow: GPG Suite in Finder</summary>
              <ol className="mt-4 list-decimal space-y-4 pl-6 [&_li]:pl-2">
                <li>Install the official GPG Suite release compatible with your macOS version. For file encryption you use GPG Services and MacGPG; GPG Mail is not needed.</li>
                <li>In Finder, select one disposable Core backup file, then choose <strong>Services → OpenPGP: Encrypt File</strong>. Enable <strong>Encrypt with Password</strong>, enter and confirm an independent passphrase, and leave recipient keys unselected. Turn off <strong>Sign</strong> and <strong>Add to Recipients</strong> so this is password-only encryption. You do not need to create or publish a GPG key.</li>
                <li>Encrypt, then keep the resulting encrypted file separate from its passphrase. For another layer, repeat on that encrypted output with a new passphrase. For this exercise select one file at a time; folder packaging in GPG Services differs from Vault’s TAR workflow.</li>
                <li>To recover, choose <strong>Services → OpenPGP: Decrypt File</strong> on the outer file. Repeat on each recovered inner file in reverse order. Use a separate recovery folder to avoid overwriting originals, check for errors, then restore the recovered wallet in Core.</li>
              </ol>
              <p className="mt-4">
                Keep the original and recovered files outside cloud sync. Avoid
                saving the layer secrets together in the Mac’s keychain. This
                interface uses its installed MacGPG settings; do not assume it
                creates or supports the Vault release’s exact OCB profile without
                a successful compatibility test. This is a macOS practice option;
                serious funds still call for dedicated hardware with fresh Linux.
              </p>
              <p className="mt-4 text-sm">
                Official instructions: <ResourceLink href="https://gpgtools.tenderapp.com/kb/gpg-services-faq/how-to-encrypt-and-sign-text-or-files-with-gpg-services" inverse>Finder encryption</ResourceLink>{" "}
                and <ResourceLink href="https://gpgtools.tenderapp.com/kb/gpg-services-faq/how-to-decrypt-and-verify-text-or-files-with-gpg-services" inverse>decryption</ResourceLink>.
              </p>
            </details>

            <h3 className="learning-heading pt-4 text-2xl leading-tight font-bold text-white"><SectionIcon topic="encrypt" /><span>Start with one GPG layer</span></h3>
            <ol className="list-decimal space-y-4 pl-6 marker:font-bold marker:text-white [&_li]:pl-2">
              <li>
                <strong>Make a consistent wallet backup.</strong> Use Core’s File → Backup Wallet
                after enabling wallet encryption. Work with that snapshot, not
                a file copied from a running wallet’s data directory. Keep the
                snapshot and recovery files outside cloud-synced folders.
              </li>
              <li>
                <strong>Generate an independent GPG passphrase.</strong> Use{" "}
                <ResourceLink href="https://keepassxc.org/" inverse>KeePassXC</ResourceLink>{" "}
                and the random-word procedure in step 4. Do not reuse the Core
                wallet passphrase. Symmetric encryption uses a passphrase; no
                public/private GPG key pair is required. Keep recoverable records
                of both secrets separately from the encrypted backup.
              </li>
              <li>
                <strong>Encrypt the entire saved file.</strong> In the folder
                containing your disposable backup, substitute its actual name
                for <code>practice-wallet.dat</code> in this command. Choose a new
                output filename and enter the secret only in GPG’s passphrase
                prompt, never as part of the command.
                <code className="mt-3 block break-words rounded-xl bg-black/20 p-4 text-sm sm:p-6 leading-7">gpg --no-symkey-cache --symmetric --cipher-algo AES256 --output backup.gpg practice-wallet.dat</code>
              </li>
              <li>
                <strong>Decrypt into a separate test file.</strong> Use a new
                output name so the original stays intact. GPG must finish
                successfully without integrity errors before you use its output.
                Never bypass an integrity warning.
                <code className="mt-3 block break-words rounded-xl bg-black/20 p-4 text-sm sm:p-6 leading-7">gpg --no-symkey-cache --output recovered-wallet.dat --decrypt backup.gpg</code>
                Restore <code>recovered-wallet.dat</code> through Core, compare
                addresses and labels, and prove signing with test coins through
                the curriculum. Core’s separate passphrase is still required to
                unlock the restored private keys.
              </li>
            </ol>
            <p>
              These are single-file practice commands using GnuPG’s default
              integrity-protected symmetric format with AES-256. They do not
              select the Vault’s planned OCB profile. For a Vault backup, use the
              release’s documented compatible GnuPG version and verify a complete
              recovery with that version before relying on it.
            </p>
            <p>
              Encryption leaves the source file in place, and decryption writes
              a recovered copy. For real custody, keep unwrapped snapshots,
              recovered files and any unencrypted TAR in verified private RAM
              storage or a carefully prepared environment that prevents plaintext
              persistence through swap, sync or temporary files. An ordinary
              folder on a daily computer is not equivalent. Keep originals until
              recovery is proven; deleting a file later does not reliably erase
              every disk, snapshot or synced copy.
            </p>

            <h3 className="learning-heading pt-4 text-2xl leading-tight font-bold text-white"><SectionIcon topic="encrypt" /><span>Add layers only when you need them</span></h3>
            <p>
              A second layer encrypts the first <code>.gpg</code> file using a
              different, independently generated passphrase. A third layer
              encrypts the second. Each layer must be removed to reach the wallet.
              This is not multisig: it controls access to the backup, not Bitcoin’s
              signing rules. More layers do not automatically make a setup safer.
            </p>
            <p>
              For a two-layer practice backup, first create <code>backup.gpg</code>
              above, then run this command and supply a new passphrase B:
            </p>
            <code className="block break-words rounded-xl bg-black/20 p-4 text-sm sm:p-6 leading-7">gpg --no-symkey-cache --symmetric --cipher-algo AES256 --output backup-outer.gpg backup.gpg</code>
            <p>
              Recover in reverse order: use B to recover the inner GPG file,
              then the original passphrase A to recover the wallet. Run each
              command separately and continue only after it succeeds:
            </p>
            <code className="block break-words rounded-xl bg-black/20 p-4 text-sm sm:p-6 leading-7">gpg --no-symkey-cache --output recovered-inner.gpg --decrypt backup-outer.gpg<br /><br />gpg --no-symkey-cache --output recovered-wallet-2.dat --decrypt recovered-inner.gpg</code>
            <p>
              Keep a recovery record of the layer order and expected final
              payload; a <code>.gpg</code> extension does not tell you how many
              layers exist. For several files, a standard TAR can package them
              before the first layer. TAR itself is not encryption. After all
              GPG layers are successfully decrypted, extract the expected TAR
              inside the trusted recovery workspace, then restore the wallet.
            </p>
            <p>
              For example, three layers can use passphrases A, B and C held at
              separate geographic locations. Recovery requires all three, plus
              the Core passphrase if the wallet itself is encrypted. Keep
              redundant recovery records for every required secret, with an
              inheritance plan that someone can actually follow. Losing the only
              copy of any required passphrase can make the backup unusable.
              Keeping all three immediately accessible in one password database
              defeats that geographical separation.
            </p>
            <p>
              The benefit comes from independent handling of secrets, not the
              number of encryption operations. Keep only the final outer file
              in distributed backup storage: retaining a reachable inner copy
              gives an attacker a route around the outer layers. Geographic
              separation can add logistical barriers to immediate coercion; it
              does not guarantee protection from continued coercion or malware
              present when all passphrases are entered.
            </p>

            <h3 className="learning-heading pt-4 text-2xl leading-tight font-bold text-white"><SectionIcon topic="backup" /><span>An additional cloud backup</span></h3>
            <p>
              With strong independent passphrases and a successful full recovery
              test, I consider the final encrypted <code>.gpg</code> file suitable
              for an additional cloud copy. Encrypt locally first and upload only
              the outermost file. Keep all passphrases away from that account and
              retain independent offline copies. Anyone holding the file can try
              password guesses offline; the provider can still see its outer
              metadata, and the account or file can be lost.
            </p>
            <p>
              Download a copy and test every decryption layer and wallet
              restoration in your trusted environment before counting it as a
              working backup. Never decrypt it in a browser or synced folder.
            </p>
            <p className="text-sm leading-7">
              Technical references: <ResourceLink href="https://gnupg.org/documentation/manuals/gnupg/Operational-GPG-Commands.html" inverse>GnuPG encryption and decryption</ResourceLink>{" "}
              and <ResourceLink href="https://gnupg.org/documentation/manuals/gnupg/OpenPGP-Options.html" inverse>OpenPGP integrity and OCB options</ResourceLink>.
            </p>

            <h3 className="learning-heading pt-4 text-2xl leading-tight font-bold text-white"><SectionIcon topic="privacy" /><span>Optional: Use a less revealing filename</span></h3>
            <p>
              A neutral filename such as <code>archive.bin</code> may be appropriate
              when your threat model includes a casual observer noticing a file
              named <code>bitcoin-wallet.dat</code>. Renaming changes no contents
              and adds no cryptographic protection; someone inspecting the file
              can still recognize its format. It is not a substitute for the
              GPG encryption before a cloud upload. You can give the final
              encrypted file a neutral name such as <code>backup.gpg</code> while
              keeping its extension for easier recovery.
            </p>
            <details className="border-t border-white/20 pt-4">
              <summary className="cursor-pointer py-2 font-semibold text-white">Optional filename example on macOS</summary>
              <p className="my-4">
                In Finder, use Get Info → Name &amp; Extension to rename a backup
                copy. If the restore dialog hides the <code>.bin</code> file,
                change its extension back to <code>.dat</code> before selecting it.
                These screenshots demonstrate renaming only.
              </p>
              <div className="grid gap-4 sm:grid-cols-2">
                {screenshots.map((screenshot, index) => (
                  <div key={screenshot.src} className={index === screenshots.length - 1 ? "sm:col-span-2" : undefined}>
                    <ScreenshotButton screenshot={screenshot} onOpen={onOpen} />
                  </div>
                ))}
              </div>
            </details>
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
              The curriculum's reference setup
            </p>
            <h2 className="mt-3 max-w-[19ch] font-display text-3xl leading-[1.05] font-bold tracking-[-0.04em] text-balance sm:text-4xl">
              Separate signing from network activity
            </h2>
          </div>
        </div>

        <p className="mt-6 max-w-3xl text-base leading-8 text-pretty text-muted-foreground">
          After you can operate and recover one wallet, the full curriculum
          teaches a second computer for offline signing. This later architecture
          uses two generic dedicated computers with
          <ResourceLink href={DEBIAN_DOWNLOAD_URL}>
            {" "}
            Debian Stable
          </ResourceLink>{" "}
          and Bitcoin Core. The persistent offline signer keeps the encrypted
          private-key wallet; the separate online node holds a watch-only
          savings wallet. Debian is the default for predictable long-term
          maintenance. Choose another maintained Linux distribution only if
          you can maintain and test the same procedure.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <div className="rounded-[22px] bg-background p-6 shadow-[var(--shadow-border)]">
            <WifiOff className="size-5 text-primary" aria-hidden="true" />
            <h3 className="mt-4 font-display text-xl font-bold">
              Offline signing computer
            </h3>
            <ul className="mt-4 grid gap-2 text-sm leading-6 text-muted-foreground">
              <li>Runs Debian Stable and verified Bitcoin Core.</li>
              <li>Stays offline; reserved for keys, recovery and signing.</li>
              <li>No blockchain synchronization and no private-key export.</li>
            </ul>
          </div>
          <div className="rounded-[22px] bg-background p-6 shadow-[var(--shadow-border)]">
            <Wifi className="size-5 text-primary" aria-hidden="true" />
            <h3 className="mt-4 font-display text-xl font-bold">
              Separate online node
            </h3>
            <ul className="mt-4 grid gap-2 text-sm leading-6 text-muted-foreground">
              <li>
                Runs Debian Stable and a synchronized Bitcoin Core full node.
              </li>
              <li>Prepares transactions and broadcasts signed transactions.</li>
              <li>Has a watch-only wallet and no savings private keys.</li>
            </ul>
          </div>
        </div>

        <p className="mt-6 text-sm leading-7 text-pretty text-muted-foreground">
          An advanced PSBT workflow prepares a transaction online, moves the
          unsigned PSBT to the offline signer, verifies and signs it there, then
          returns the signed transaction for broadcast. Transaction signing is
          outside this basic tutorial.
        </p>
        <p className="mt-4 text-sm leading-7 text-pretty text-muted-foreground">
          The installed OS and signer are replaceable. Keep independent
          encrypted Core wallet backups and separate passphrase recovery. A
          backup is not a backup until recovery has been tested.{" "}
          <ResourceLink href={TAILS_INSTALL_URL}>Tails</ResourceLink> remains an
          optional live environment when reducing persistent OS state benefits
          the threat model. It does not eliminate firmware, hardware or physical
          tampering risk.
        </p>
      </div>
    </section>
  )
}

function ArchitectureDiagram() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-16">
      <p className="text-[11px] font-bold tracking-[0.16em] text-primary uppercase">
        Later in the curriculum
      </p>
      <h2 className="learning-heading mt-4 max-w-[16ch] font-display text-3xl leading-[1.03] font-bold tracking-[-0.045em] text-balance sm:text-5xl">
        <SectionIcon topic="key" /><span>Private keys stay offline</span>
      </h2>

      <CustodyArchitecture />

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
  const [gallery, setGallery] = useState<Gallery | null>(null)
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
    const screenshots = [...(opener.closest("main")?.querySelectorAll<HTMLImageElement>("[data-gallery-image] img") ?? [])]
    const selected = opener.querySelector("img")
    setGallery({
      images: screenshots.length ? screenshots.map(item => ({ src: item.src, alt: item.alt })) : [selectedImage],
      startIndex: Math.max(0, selected ? screenshots.indexOf(selected) : 0),
    })
  }

  return (
    <div className="wallet-guide min-h-screen bg-background text-foreground antialiased">
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
            A conceptual walkthrough and hands-on exercise with a disposable
            Bitcoin Core wallet: creation, encryption, backup and restoration.
            Before committing meaningful funds, work through the threat model,
            hardware preparation, recovery tests and offline signing in the{" "}
            <a className="font-semibold underline underline-offset-4" {...articleLinkProps(EN_BITCOIN_CORE_CURRICULUM_PATH)}>full self-custody curriculum</a>.
          </p>

          <TutorialMetadata
            language="en"
            className="mt-10"
            goal="Create, encrypt, back up, restore, and verify a disposable Bitcoin Core wallet."
            difficulty="Beginner to intermediate"
            estimatedTime="60–90 minutes"
            realBitcoin="No. This is a disposable practice wallet. Complete the self-custody curriculum before preparing meaningful funds."
            softwareVersion="Bitcoin Core 31.1"
            operatingSystems="The screenshots use macOS; the workflow also applies to Windows and Linux."
            recommendedOs={
              <>
                A dedicated generic computer with a fresh Debian Stable
                installation. I do not recommend a daily computer for meaningful
                funds, even after a clean antivirus scan.
              </>
            }
            prerequisites="Bitcoin Core installed from an official source, an empty practice environment, and a separate place for passphrase notes."
            outcome="A restored practice wallet whose addresses and metadata match the original."
            lastReviewed="Technical walkthrough: 31 August 2026. Curriculum and passphrase alignment: 14 September 2026. GPG backup, layered encryption and upcoming Vault design: 16 October 2026; final ISO testing not claimed."
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
            Keep this wallet disposable. Use the curriculum to learn the full
            lifecycle with valueless test coins, then prove recovery before
            preparing fresh keys and credentials for real funds.
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
                      className="learning-heading guide-step-heading mt-5 font-display text-3xl font-bold"
                    >
                      <SectionIcon topic={step.title} /><span>{step.title}</span>
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
                    <div className="guide-step-prose mt-7 grid gap-4 text-base leading-8 text-pretty text-muted-foreground [&_code]:rounded-md [&_code]:bg-muted [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-[0.9em] [&_li]:pl-1 [&_strong]:font-semibold [&_strong]:text-foreground [&_ul]:grid [&_ul]:gap-2 [&_ul]:pl-5 [&_ul]:marker:text-primary">
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

              {step.number === 7 ? (
                <OptionalBackupProtection onOpen={openImage} />
              ) : null}
              {index < steps.length - 1 ? (
                <div className="mx-auto h-px max-w-5xl bg-border/70" />
              ) : null}
            </div>
          ))}
        </div>

        <SeriousColdStorage />
        <ArchitectureDiagram />

        <section className="mx-auto max-w-5xl px-4 pb-16 sm:px-6 sm:pb-20">
          <div className="rounded-[32px] bg-card p-6 shadow-[var(--shadow-border)] sm:p-9">
            <div className="flex flex-wrap items-start justify-between gap-5">
              <div>
                <p className="text-[11px] font-bold tracking-[0.16em] text-primary uppercase">
                  Final check
                </p>
                <h2 className="learning-heading mt-4 max-w-[18ch] font-display text-3xl leading-[1.03] font-bold tracking-[-0.045em] text-balance sm:text-5xl">
                  <SectionIcon topic="check" /><span>Before completing this practice</span>
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
                  ? "Checklist complete. Continue with the self-custody curriculum."
                  : "Complete the practice checks, then follow the curriculum before preparing real funds."}
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
          <h2 className="mb-4 text-2xl font-bold">Before you commit serious funds</h2>
          <p className="mb-6 max-w-3xl text-base leading-8 text-muted-foreground">
            Completing this exercise is a learning milestone. Before deploying
            meaningful savings, work through the full self-custody curriculum,
            rehearse recovery and prepare a dedicated computer with a fresh Linux
            installation. I would not use a daily computer for that job, even if
            antivirus or anti-malware software says it is clean. A scan cannot
            establish that wallet secrets will be safe on that machine.
          </p>
          <a className="mb-10 inline-flex min-h-12 items-center rounded-full bg-primary px-6 py-3 text-center text-sm font-semibold text-primary-foreground" {...articleLinkProps(EN_BITCOIN_CORE_CURRICULUM_PATH)}>
            Continue with the self-custody curriculum
          </a>
          <ConsultingInvitation
            question="Want to prove your own backup and recovery plan?"
            detail="Bring one question from this exercise: what to back up, how to separate credentials, or how to check a restore before using real funds."
            className="mb-10"
          />
          <ValueForValueCard language="en" />
        </div>
      </main>

      <footer className="border-t border-border/60 py-8 text-center text-xs leading-6 text-muted-foreground">
        <p>Educational material, not investment, legal, or tax advice.</p>
        <p>
          {SITE_URL.replace("https://", "")} · {BITCOIN_CORE_WALLET_GUIDE_PATH}
        </p>
      </footer>

      {gallery && <ImageViewer {...gallery} opener={lightboxOpener} onClose={() => setGallery(null)} />}
    </div>
  )
}
