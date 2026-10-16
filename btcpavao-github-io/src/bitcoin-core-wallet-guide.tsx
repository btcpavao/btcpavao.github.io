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
          Check <strong>Encrypt Wallet</strong>. This protects the secret keys
          that approve payments. You will need your wallet passphrase to use
          those keys to sign a transaction — in other words, to authorize spending.
        </p>
        <p>
          Someone with a copy of this wallet can still view its addresses,
          transaction history and balance. The passphrase protects spending;
          it does not hide the whole wallet. Step 7 adds GPG encryption for privacy.
        </p>
      </>
    ),
    noteKind: "note",
    note: (
      <>
        <strong>Opening is different from unlocking.</strong> Core can open a
        wallet without asking for its passphrase. That does not mean it can
        approve a new payment without the passphrase.
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
          The second warning is about malware: harmful software can steal your
          passphrase or interfere with a payment while you use the wallet.
          Encrypting a file does not make an infected computer safe.
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
          . For now, practise creating, encrypting, backing up and restoring an
          empty wallet. The curriculum covers preparing a computer for real funds.
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
          Keep this address unfunded. Its purpose here is to give you something
          to recognize when you restore the backup.
        </p>
      </>
    ),
    noteKind: "critical",
    note: (
      <>
        <strong>No real bitcoin is needed for this exercise.</strong> Learn the
        steps with an empty wallet; the curriculum later covers test payments.
      </>
    ),
  },
  {
    number: 10,
    title: "Back up the wallet",
    summary: "Save a copy, encrypt it with GPG and keep separate passphrase backups.",
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
          Choose <strong>File → Backup Wallet</strong> and save a copy, for
          example as <code>practice-wallet.dat</code>. Use a folder that is not
          automatically uploaded to cloud storage.
        </p>
        <p>
          The Core passphrase protects the keys that sign payments. Someone who
          gets this backup can still view the wallet’s addresses, transaction
          history and balance, but cannot use its locked keys to sign a new
          payment without the passphrase. My recommendation is to encrypt the
          entire backup file with GPG as well, using a different passphrase.
          That keeps the wallet’s contents private.
        </p>
        <p>
          With one GPG layer, you have <strong>three things to keep</strong>:
        </p>
        <ul>
          <li><strong>The GPG-encrypted file</strong> — the backup containing your wallet.</li>
          <li><strong>The GPG passphrase</strong> — opens that file.</li>
          <li><strong>The Bitcoin Core passphrase</strong> — unlocks the wallet’s keys to approve payments.</li>
        </ul>
        <p>
          Keep more than one copy of <strong>each</strong>, in separate locations.
          Keep the two passphrases separate from each other and from the encrypted
          file, so one theft or loss does not expose or destroy everything.
          Write down how to recover the wallet, and test the instructions.
        </p>
        <p>
          A random-word passphrase by itself does not say what it unlocks. A GPG
          file with a neutral name such as <code>backup.gpg</code> keeps the
          Bitcoin wallet inside it hidden from view. To add another layer,
          encrypt that GPG file again with a new passphrase. Each extra layer
          adds one more passphrase to back up separately.
        </p>
        <p>
          Follow the <a {...articleLinkProps("#optional-backup-protection")} className="font-semibold text-primary underline underline-offset-4">GPG steps below</a>,
          then continue to step 8 to restore your wallet.
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
        First use GPG to open your encrypted backup with its GPG passphrase.
        If you added more layers, open them in reverse order, last added first.
        You should end up with the wallet <code>.dat</code> file. In Bitcoin
        Core, close the original practice wallet with <strong>File → Close
        Wallet</strong>, then choose <strong>File → Restore Wallet</strong>.
        You will restore the recovered wallet file, not the <code>.gpg</code> file.
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
        Find the wallet file you recovered from GPG, select it, and choose
        <strong> Open</strong>. If you skipped GPG for this practice run, select
        the copy saved with <strong>Backup Wallet</strong>. Check the filename
        and folder so you restore the intended backup. When Core asks for a
        wallet name, use a new name such as <strong>Restored Practice</strong>.
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
        Finish the restore and check that the receiving address and label from
        step 6 are there. This practice wallet should still have a zero balance.
        The screenshot uses <code>archive.dat</code>; your file may have a
        different name. Core may open the wallet without asking for its
        passphrase. Its keys are still locked for spending.
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
          Install Bitcoin Core from its <ResourceLink href={BITCOIN_CORE_DOWNLOAD_URL}>official website</ResourceLink>{" "}
          for your operating system and open it. Start without a wallet loaded,
          as shown in the screenshot. Use a new, empty wallet for this exercise
          and keep your operating system up to date. Do not proceed if you suspect
          the computer has malware.
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
        Make sure you understand both warnings before confirming: a lost
        passphrase can mean lost funds, and encryption cannot make malware safe.
        Continue this exercise only with an empty practice wallet.
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
      "Check that your receiving address and label are back.",
    content: (
      <>
        {legacySteps[14].content}
        <p>
          You have now checked that the backup opens correctly. The next stage
          is to prove that the restored keys can approve a payment using
          valueless test coins. Follow that exercise in the{" "}
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
    title: "Check what you have learned",
    summary:
      "Check your backup, your separate passphrase records and your restore result.",
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
        Opening the backup is the first check. The curriculum then helps you
        practise a payment with valueless test coins, before preparing real funds.
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
  "My backup copies are in separate locations, so one loss does not destroy them all.",
  "I successfully restored the wallet from a backup.",
  "I understand that opening the wallet does not unlock it for spending.",
  "I understand that the passphrase is required for signing or spending.",
  "I have a plan to periodically test my backups.",
  "I understand that the curriculum later uses a separate offline computer to approve payments.",
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
            GPG puts the whole wallet backup inside an encrypted file. Think of
            it as a locked envelope: the GPG passphrase opens the envelope, and
            the separate Core passphrase unlocks the wallet inside for spending.
            Start with one GPG layer and practise opening it again.
          </p>

          <div className="mt-8 max-w-[75ch] space-y-5 text-base leading-8 text-white/80 [&_strong]:text-white">
            <h3 className="learning-heading text-2xl leading-tight font-bold text-white"><SectionIcon topic="core" /><span>Coming soon: Bitcoin Core Vault on Debian</span></h3>
            <p>
              The upcoming <ResourceLink href={`${DEBIAN_IMAGES_PATH}#vault`} inverse>Bitcoin Core Vault Debian ISO</ResourceLink>{" "}
              is a Linux system being prepared with the tools for this workflow
              already included. It is intended to guide you through GPG backup
              encryption and recovery, with extra layers when you need them.
              It is still in development. You can practise now with the tools below.
            </p>

            <h3 className="learning-heading pt-4 text-2xl leading-tight font-bold text-white"><SectionIcon topic="setup" /><span>Install GPG for an independent practice session</span></h3>
            <p>
              GnuPG is the software behind GPG encryption. Choose the download
              for your operating system. The macOS option includes a graphical
              interface; the Terminal instructions below work on all three systems.
            </p>
            <ul className="list-disc space-y-3 pl-6 [&_li]:pl-2">
              <li><strong>Debian / Ubuntu:</strong> open Terminal and install GnuPG:
                <code className="mt-2 block break-words rounded-xl bg-black/20 p-4 text-sm sm:p-6">sudo apt update<br />sudo apt install gnupg</code>
                For Debian, see the <ResourceLink href="https://packages.debian.org/trixie/gnupg" inverse>GnuPG package</ResourceLink>.
              </li>
              <li><strong>Other Linux distributions:</strong> install GnuPG using your distribution’s software manager.</li>
              <li><strong>Windows:</strong> install <ResourceLink href="https://gpg4win.org/download.html" inverse>Gpg4win</ResourceLink> from its official website and follow its installer-verification instructions. It includes GnuPG and the Kleopatra interface.</li>
              <li><strong>macOS:</strong> for a graphical workflow, I recommend <ResourceLink href="https://gpgtools.org/" inverse>GPG Suite</ResourceLink> and its <strong>GPG Services</strong> integration in Finder. Use the password-only steps below. If you prefer Terminal and already use Homebrew, run <code>brew install gnupg</code> using the <ResourceLink href="https://formulae.brew.sh/formula/gnupg" inverse>GnuPG formula</ResourceLink>. Other macOS distributions are listed on the <ResourceLink href={GNUPG_DOWNLOAD_URL} inverse>official GnuPG download page</ResourceLink>.</li>
            </ul>
            <p>
              Choose one method below: Finder on macOS, or Terminal on any of
              these systems. Both encrypt the same kind of backup file with a
              passphrase. For this first try, use one layer.
            </p>

            <details className="space-y-4 border-t border-white/20 pt-4" id="macos-gpg-services">
              <summary className="cursor-pointer py-2 font-semibold text-white">macOS graphical workflow: GPG Suite in Finder</summary>
              <ol className="mt-4 list-decimal space-y-4 pl-6 [&_li]:pl-2">
                <li>Install the official GPG Suite release compatible with your macOS version. For file encryption you use GPG Services and MacGPG; GPG Mail is not needed.</li>
                <li>In Finder, select one disposable Core backup file, then choose <strong>Services → OpenPGP: Encrypt File</strong>. Enable <strong>Encrypt with Password</strong>, enter and confirm an independent passphrase, and leave recipient keys unselected. Turn off <strong>Sign</strong> and <strong>Add to Recipients</strong> so this is password-only encryption. You do not need to create or publish a GPG key.</li>
                <li>Encrypt, then keep the resulting encrypted file separate from its passphrase. For another layer, repeat on that encrypted output with a new passphrase. For this exercise, select just your wallet backup file.</li>
                <li>To recover, choose <strong>Services → OpenPGP: Decrypt File</strong> on the outer file. Repeat on each recovered inner file in reverse order. Use a separate recovery folder to avoid overwriting originals, check for errors, then restore the recovered wallet in Core.</li>
              </ol>
              <p className="mt-4">
                Keep the original and recovered files outside folders that sync
                to the cloud. Keep separate records of your passphrases, and test
                recovery by entering them yourself. Do not rely only on passwords
                remembered by your Mac.
              </p>
              <p className="mt-4 text-sm">
                Official instructions: <ResourceLink href="https://gpgtools.tenderapp.com/kb/gpg-services-faq/how-to-encrypt-and-sign-text-or-files-with-gpg-services" inverse>Finder encryption</ResourceLink>{" "}
                and <ResourceLink href="https://gpgtools.tenderapp.com/kb/gpg-services-faq/how-to-decrypt-and-verify-text-or-files-with-gpg-services" inverse>decryption</ResourceLink>.
              </p>
            </details>

            <details className="space-y-4 border-t border-white/20 pt-4" id="gpg-terminal">
            <summary className="cursor-pointer py-2 font-semibold text-white">Terminal option: encrypt and open one GPG layer</summary>
            <p className="mt-4">
              Open Terminal, or PowerShell on Windows. Run <code>gpg --version</code>{" "}
              to check the installation. Then open a terminal in the folder where
              you saved your practice backup. Run each command separately.
            </p>
            <ol className="list-decimal space-y-4 pl-6 marker:font-bold marker:text-white [&_li]:pl-2">
              <li>
                <strong>Use the backup from step 7.</strong> Create it with Core’s
                File → Backup Wallet. Keep it outside cloud-synced folders.
              </li>
              <li>
                <strong>Generate an independent GPG passphrase.</strong> Use{" "}
                <ResourceLink href="https://keepassxc.org/" inverse>KeePassXC</ResourceLink>{" "}
                and the random-word procedure in step 4. Do not reuse the Core
                wallet passphrase. This method needs a password, not a GPG key
                pair. Keep a separate backup of each passphrase.
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
                output name so the original stays intact. If GPG reports an
                error or warns that the file may be damaged, stop and check it
                before continuing.
                <code className="mt-3 block break-words rounded-xl bg-black/20 p-4 text-sm sm:p-6 leading-7">gpg --no-symkey-cache --output recovered-wallet.dat --decrypt backup.gpg</code>
                You should now have <code>recovered-wallet.dat</code>. Continue
                to step 8 to restore it in Core.
              </li>
            </ol>
            </details>
            <p>
              <strong>Check before you copy.</strong> Encryption creates a new
              file and leaves the original in place. Copy the encrypted
              <code> .gpg</code> file to your backup locations, not the original
              wallet file. Keep your originals until you have proved that recovery
              works. Deleting a file later does not guarantee that every copy is gone.
            </p>

            <h3 className="learning-heading pt-4 text-2xl leading-tight font-bold text-white"><SectionIcon topic="encrypt" /><span>Add layers only when you need them</span></h3>
            <p>
              An extra layer is another locked envelope around the first. Encrypt
              the <code>.gpg</code> file again with a new, independently generated
              passphrase. To recover, open the last layer first, then the one
              inside. You need every layer’s passphrase, plus the Core passphrase
              to approve payments.
            </p>
            <details className="space-y-4 border-t border-white/20 pt-4">
            <summary className="cursor-pointer py-2 font-semibold text-white">Optional: try a second layer in Terminal</summary>
            <p className="mt-4">
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
            </details>
            <p>
              Keep more than one copy of every required passphrase, with the
              layer order written down. Store the passphrases separately from
              one another and from the encrypted file. For example, two GPG
              layers mean one final encrypted file and three passphrases to
              preserve: two for GPG and one for Core.
            </p>
            <p>
              Back up the final, outermost file. An earlier copy from before the
              extra layer was added does not have that extra protection. More
              layers also mean more things to keep track of: losing every copy
              of just one required passphrase can prevent recovery. Start with
              one layer until you can reliably complete the whole process.
            </p>

            <h3 className="learning-heading pt-4 text-2xl leading-tight font-bold text-white"><SectionIcon topic="backup" /><span>An additional cloud backup</span></h3>
            <p>
              After testing recovery, I recommend keeping an additional copy of
              the final GPG-encrypted file in cloud storage. Encrypt it on your
              computer before uploading it. Keep both passphrases out of that
              account and retain copies elsewhere, such as on separate USB drives.
              If you added extra layers, keep all of their passphrases separate too.
            </p>
            <p>
              Download the cloud copy into a folder that does not sync, open it
              with GPG, and restore the wallet in Core. That checks the copy you
              actually uploaded.
            </p>
            <p className="text-sm leading-7">
              Technical references: <ResourceLink href="https://gnupg.org/documentation/manuals/gnupg/Operational-GPG-Commands.html" inverse>GnuPG encryption and decryption</ResourceLink>{" "}
              and <ResourceLink href="https://gnupg.org/documentation/manuals/gnupg/OpenPGP-Options.html" inverse>GPG encryption options</ResourceLink>.
            </p>

            <h3 className="learning-heading pt-4 text-2xl leading-tight font-bold text-white"><SectionIcon topic="privacy" /><span>Optional: Use a less revealing filename</span></h3>
            <p>
              Name your encrypted file something neutral, such as
              <code> backup.gpg</code>. Keep the <code>.gpg</code> ending so it is
              easy to recognize as an encrypted file. GPG protects the contents;
              changing the filename alone does not encrypt anything.
            </p>
            <details className="space-y-4 border-t border-white/20 pt-4">
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

function ArchitectureDiagram() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-16">
      <p className="text-[11px] font-bold tracking-[0.16em] text-primary uppercase">
        Later in the curriculum
      </p>
      <h2 className="learning-heading mt-4 max-w-[16ch] font-display text-3xl leading-[1.03] font-bold tracking-[-0.045em] text-balance sm:text-5xl">
        <SectionIcon topic="key" /><span>Private keys stay offline</span>
      </h2>

      <p className="mt-5 max-w-3xl text-base leading-8 text-muted-foreground">
        You do not need a second computer for this practice exercise. Later,
        the curriculum shows how to use a dedicated offline computer to approve
        payments, while another computer handles the internet connection.
      </p>
      <details className="mt-6 rounded-[24px] bg-card p-6 shadow-[var(--shadow-border)] sm:p-8">
        <summary className="cursor-pointer py-2 font-semibold">Optional preview: the two-computer setup</summary>
        <CustodyArchitecture />
      </details>
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
            Learn how to create a Bitcoin Core wallet, protect it with a
            passphrase, save a backup and restore it. Try the steps on your
            own computer with an empty practice wallet. Before using real funds,
            work through the{" "}
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
                For this empty-wallet exercise: your existing Windows, macOS or
                Linux computer. For serious funds: a dedicated computer with a
                fresh Linux installation; I recommend Debian Stable.
              </>
            }
            prerequisites="Bitcoin Core installed from an official source, an empty practice environment, and a separate place for passphrase notes."
            outcome="A restored practice wallet with the same receiving address and label."
            lastReviewed="Beginner instructions, GPG backup and recovery: 16 October 2026. The Vault ISO is still in development."
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
            Keep this wallet for practice only. The curriculum shows you how to
            test payments and recovery before creating a new wallet for real funds.
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
            detail="Bring one question from this exercise: what to back up, where to keep passphrases, or how to check a restore before using real funds."
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
