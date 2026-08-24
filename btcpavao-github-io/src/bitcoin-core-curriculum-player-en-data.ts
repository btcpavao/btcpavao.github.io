import {
  curriculumModules as legacyModules,
  type CurriculumCodeBlock,
  type CurriculumLesson,
  type CurriculumSource,
  type CurriculumStatus,
} from "@/bitcoin-core-curriculum-en-data"

export const CURRICULUM_VERSION = "2.1"
export const CORE_REFERENCE_VERSION = "Bitcoin Core 31.1"
export const SPARROW_REFERENCE_VERSION = "Sparrow 2.5.2"
export const ELECTRUM_REFERENCE_VERSION = "Electrum 4.8.0"
export const LAST_TECHNICAL_REVIEW = "2026-08-10"

export type LessonVerification = "verified" | "review-required" | "planned"
export type LessonCalloutKind =
  | "important"
  | "warning"
  | "mental-model"
  | "verify"

export type LessonCallout = {
  kind: LessonCalloutKind
  title: string
  body: string
  url?: string
}

export type PlayerLesson = Omit<CurriculumLesson, "status"> & {
  status: CurriculumStatus
  slug: string
  objective: string
  estimatedTime: string
  verification: LessonVerification
  referenceVersion: string
  lastReviewed?: string
  optional?: boolean
  reviewNote?: string
  explanation?: string[]
  walkthrough?: {
    title: string
    intro?: string
    steps: string[]
  }
  callouts?: LessonCallout[]
  commonMistakes?: string[]
  communityQuestions?: string[]
  origin?: string
}

export type CurriculumPhase = {
  id: string
  slug: string
  shortTitle: string
  title: string
  summary: string
  outcome: string
  status: CurriculumStatus
  estimatedTime: string
  lessons: PlayerLesson[]
}

export type { CurriculumCodeBlock, CurriculumSource, CurriculumStatus }

const coreRelease: CurriculumSource = {
  label: "Bitcoin Core 31.1 — release notes",
  url: "https://bitcoincore.org/en/releases/31.1/",
}

const coreDownload: CurriculumSource = {
  label: "Bitcoin Core 31.1 — Official Download and Verification Guide",
  url: "https://bitcoincore.org/en/download/",
}

const coreRepository: CurriculumSource = {
  label: "Bitcoin Core — Source Code and Development Process",
  url: "https://github.com/bitcoin/bitcoin/tree/v31.1",
}

const managingWallets: CurriculumSource = {
  label: "Bitcoin Core 31.1 — Managing the wallet",
  url: "https://github.com/bitcoin/bitcoin/blob/v31.1/doc/managing-wallets.md",
}

const coreFiles: CurriculumSource = {
  label: "Bitcoin Core 31.1 — Files and Data Directories",
  url: "https://github.com/bitcoin/bitcoin/blob/v31.1/doc/files.md",
}

const descriptors: CurriculumSource = {
  label: "Bitcoin Core 31.1 — Output Descriptors",
  url: "https://github.com/bitcoin/bitcoin/blob/v31.1/doc/descriptors.md",
}

const offlineSigning: CurriculumSource = {
  label: "Bitcoin Core 31.1 — Offline Signing Tutorial",
  url: "https://github.com/bitcoin/bitcoin/blob/v31.1/doc/offline-signing-tutorial.md",
}

const psbt: CurriculumSource = {
  label: "Bitcoin Core 31.1 — PSBT documentation",
  url: "https://github.com/bitcoin/bitcoin/blob/v31.1/doc/psbt.md",
}

const multisigTutorial: CurriculumSource = {
  label: "Bitcoin Core 31.1 — Multisig Tutorial",
  url: "https://github.com/bitcoin/bitcoin/blob/v31.1/doc/multisig-tutorial.md",
}

const bip39: CurriculumSource = {
  label: "BIP 39 — mnemonic code for deterministic keys",
  url: "https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki",
}

const bip39Editorial: CurriculumSource = {
  label: "Why BIP39 made the wrong thing human-readable",
  url: "/en/bitcoin-core/bip39-made-the-wrong-thing-human-readable/",
}

const bip325: CurriculumSource = {
  label: "BIP 325 — Signet",
  url: "https://github.com/bitcoin/bips/blob/master/bip-0325.mediawiki",
}

const coreRandom: CurriculumSource = {
  label: "Bitcoin Core 31.1 — RNG implementation",
  url: "https://github.com/bitcoin/bitcoin/blob/v31.1/src/random.cpp",
}

const coreKeyGeneration: CurriculumSource = {
  label: "Bitcoin Core 31.1 — Private Key Generation",
  url: "https://github.com/bitcoin/bitcoin/blob/v31.1/src/key.cpp#L162-L168",
}

const sparrowQuickStart: CurriculumSource = {
  label: "Sparrow wallet — Official Quick Start Guide",
  url: "https://www.sparrowwallet.com/docs/quick-start.html",
}

const sparrowRelease: CurriculumSource = {
  label: "Sparrow 2.5.2 — Official Release",
  url: "https://github.com/sparrowwallet/sparrow/releases/tag/2.5.2",
}

const electrumDocs: CurriculumSource = {
  label: "Electrum 4 — Official documentation",
  url: "https://electrum.readthedocs.io/en/latest/",
}

const electrumRelease: CurriculumSource = {
  label: "Electrum 4.8.0 — release notes",
  url: "https://github.com/spesmilo/electrum/blob/master/RELEASE-NOTES",
}

const hwi: CurriculumSource = {
  label: "Bitcoin Core HWI project",
  url: "https://github.com/bitcoin-core/HWI",
}

const legacyLessons = new Map(
  legacyModules.flatMap((module) =>
    module.lessons.map((lesson) => [lesson.id, lesson] as const)
  )
)

function retainLesson(
  id: string,
  config: {
    slug: string
    objective?: string
    estimatedTime?: string
    status?: CurriculumStatus
    verification?: LessonVerification
    referenceVersion?: string
    reviewNote?: string
    sources?: CurriculumSource[]
    explanation?: string[]
    callouts?: LessonCallout[]
    origin?: string
    optional?: boolean
    lastReviewed?: string
  }
): PlayerLesson {
  const legacy = legacyLessons.get(id)
  if (!legacy) throw new Error(`Missing legacy lesson ${id}`)

  return {
    ...legacy,
    status: config.status ?? legacy.status,
    slug: config.slug,
    objective: config.objective ?? legacy.what ?? legacy.summary,
    estimatedTime: config.estimatedTime ?? "8–12 min",
    verification:
      config.verification ??
      (legacy.status === "published" ? "verified" : "review-required"),
    referenceVersion: config.referenceVersion ?? CORE_REFERENCE_VERSION,
    lastReviewed:
      (config.verification ??
        (legacy.status === "published" ? "verified" : "review-required")) ===
      "verified"
        ? (config.lastReviewed ?? LAST_TECHNICAL_REVIEW)
        : undefined,
    reviewNote: config.reviewNote,
    sources: config.sources ?? legacy.sources,
    explanation: config.explanation,
    callouts: config.callouts,
    origin: config.origin ?? `Moved from legacy module ${id.split(".")[0]}`,
    optional: config.optional,
  }
}

function outlineLesson(config: {
  id: string
  slug: string
  title: string
  summary: string
  objective: string
  estimatedTime?: string
  status?: CurriculumStatus
  verification?: LessonVerification
  referenceVersion?: string
  reviewNote?: string
  explanation?: string[]
  concepts?: string[]
  warnings?: string[]
  checklist?: string[]
  sources?: CurriculumSource[]
  codeBlocks?: CurriculumCodeBlock[]
  callouts?: LessonCallout[]
  walkthrough?: PlayerLesson["walkthrough"]
  origin?: string
  optional?: boolean
  lastReviewed?: string
}): PlayerLesson {
  return {
    id: config.id,
    slug: config.slug,
    title: config.title,
    summary: config.summary,
    objective: config.objective,
    estimatedTime: config.estimatedTime ?? "10–15 min",
    status: config.status ?? "in-progress",
    verification: config.verification ?? "review-required",
    referenceVersion: config.referenceVersion ?? CORE_REFERENCE_VERSION,
    lastReviewed:
      (config.verification ?? "review-required") === "verified"
        ? (config.lastReviewed ?? LAST_TECHNICAL_REVIEW)
        : undefined,
    reviewNote: config.reviewNote,
    explanation: config.explanation,
    concepts: config.concepts,
    warnings: config.warnings,
    checklist: config.checklist,
    sources: config.sources,
    codeBlocks: config.codeBlocks,
    callouts: config.callouts,
    walkthrough: config.walkthrough,
    videoUrl: null,
    origin: config.origin ?? "New curriculum v2 lesson",
    optional: config.optional,
  }
}

const standardReviewNote =
  "Operational steps and screenshots must be reproduced with that version before the lesson is published."

const curriculumPhasesV2: CurriculumPhase[] = [
  {
    id: "0",
    slug: "zasto-self-custody",
    shortTitle: "Why self-custody?",
    title: "Why self-custody?",
    summary:
      "First, we define what you are protecting, what you are protecting it from, and why keys are only one part of the system.",
    outcome:
      "You will be able to map your self-custody system and identify its actual failure modes.",
    status: "published",
    estimatedTime: "35 min",
    lessons: [
      retainLesson("0.1", {
        slug: "sto-self-custody-stvarno-znaci",
        objective:
          "Distinguish control of the keys from verification, backup, signing, and recovery.",
      }),
      retainLesson("0.2", {
        slug: "threat-model-prije-alata",
        objective:
          "Create a threat model that compares probability, impact, and the cost of protection.",
      }),
      retainLesson("0.3", {
        slug: "sigurnost-je-proces",
        objective:
          "Recognize operational errors that good cryptography itself cannot prevent.",
        callouts: [
          {
            kind: "mental-model",
            title: "Every protection must have a purpose.",
            body: "Before adding an offline laptop, another backup, or multisig, ask: Which specific failure mode does this reduce, and what new complexity does it introduce?",
          },
        ],
      }),
    ],
  },
  {
    id: "1",
    slug: "zasto-bitcoin-core",
    shortTitle: "Why Bitcoin Core?",
    title: "Why this curriculum stays with Bitcoin Core",
    summary:
      "The production path uses one verifiable stack: Bitcoin Core for validation, wallet management, signing, backup, and recovery.",
    outcome:
      "You will understand why Sparrow, Electrum, hardware wallets, and BIP39 are comparison points rather than parts of the taught production architecture.",
    status: "published",
    estimatedTime: "90 min",
    lessons: [
      retainLesson("1.5", {
        slug: "core-kao-alat-ne-kao-identitet",
        objective:
          "Explain why a narrow initial flow can reduce the number of security decisions a beginner must make before understanding them.",
        explanation: [
          "Bitcoin Core is not an end in itself. We use it as a conservative tool for building systems that you can verify, back up, restore, and gradually improve.",
          "A simpler initial workflow does not eliminate malware, physical risks, or human error. It gives you more attention for the decisions you genuinely need to understand.",
        ],
        sources: [managingWallets, coreRelease],
      }),
      retainLesson("2.1", {
        slug: "sto-je-bitcoin-core",
        objective:
          "Separate the node that validates the blockchain from the wallet that monitors funds and signs transactions.",
        sources: [coreRepository, coreRelease],
      }),
      outlineLesson({
        id: "own-node",
        slug: "tvoj-node-je-prije-svega-vazan-tebi",
        title: "Your node is valuable first and foremost to you",
        summary:
          "Your own node lets you verify the rules, transactions, and wallet state without relying on someone else's node or service.",
        objective:
          "Explain the personal security value of running your own node without relying on vague claims about helping the network.",
        status: "published",
        verification: "verified",
        explanation: [
          "When your wallet uses your node, you do not have to accept a remote service's view of the chain and transaction history.",
          "This does not mean that every node must be a public server, an archival node, or a computer running 24/7. The function you need determines the resources and operating model.",
        ],
        concepts: [
          "Rules validation and storage of private keys are separate functions.",
          "A pruned node still validates blocks, although it does not store the entire history on disk.",
          "Your own node reduces the need to reveal wallet queries to a third party or accept that party's view of the chain.",
        ],
        sources: [coreRepository, coreFiles],
        callouts: [
          {
            kind: "mental-model",
            title: "Verify, don't trust.",
            body: "Bitcoin Core is not an authority you trust simply because it is popular. Its value is that it lets you run a publicly verifiable set of rules and verify the network independently.",
          },
        ],
      }),
      outlineLesson({
        id: "core-development",
        slug: "battle-tested-ne-znaci-bez-bugova",
        title: "Battle-tested does not mean without bugs",
        summary:
          "Its long development history, public review, and economic importance support measured confidence in the process—not a guarantee of perfection.",
        objective:
          "Distinguish confidence in a transparent development process from a blind authority argument.",
        status: "published",
        verification: "verified",
        explanation: [
          "Bitcoin Core is developed in public: changes go through review, automated testing, and published release cycles. Its behavior affects important infrastructure, so regressions have serious consequences and attract many motivated reviewers.",
          "This strengthens confidence in the process, but it does not eliminate bugs, misconfiguration, or poor operational decisions.",
        ],
        sources: [coreRepository, coreRelease],
      }),
      retainLesson("1.2", {
        slug: "sparrow-flow-i-sigurnosne-pretpostavke",
        objective:
          "Use Sparrow as a comparison point for coordinator complexity without adopting it in the production architecture taught here.",
        status: "in-progress",
        verification: "review-required",
        referenceVersion: SPARROW_REFERENCE_VERSION,
        reviewNote:
          "Official Quick Start confirms the policy, script and keystore decisions. All GUI flow and mnemonic behavior still need to be reproduced on Sparrow 2.5.2 before publication.",
        sources: [sparrowQuickStart, sparrowRelease],
      }),
      retainLesson("1.3", {
        slug: "electrum-flow-i-sigurnosne-pretpostavke",
        objective:
          "Use Electrum as a comparison point for lightweight-wallet and mnemonic tradeoffs without adding it to the taught stack.",
        status: "in-progress",
        verification: "review-required",
        referenceVersion: ELECTRUM_REFERENCE_VERSION,
        reviewNote:
          "The seed system and official instructions are documented, but the screenshots and full creation flow still need to be reproduced on Electrum 4.8.0.",
        sources: [electrumDocs, electrumRelease],
      }),
      retainLesson("1.1", {
        slug: "hardware-wallet-kao-tradeoff",
        objective:
          "Explain the additional dependencies introduced by commercial hardware wallets and why this curriculum instead uses a dedicated generic computer with Bitcoin Core.",
        sources: [hwi],
      }),
      retainLesson("1.4", {
        slug: "bip39-kriptografija-i-backup-model",
        objective:
          "Separate BIP39 entropy quality from its human-readable bearer-secret recovery model and explain why the taught Core workflow does not create a mnemonic.",
        referenceVersion: "BIP 39",
        sources: [bip39],
        callouts: [
          {
            kind: "important",
            title: "The objection is operational, not about entropy",
            body: "A securely generated BIP39 mnemonic can contain strong entropy. This curriculum avoids the portable, human-readable bearer-secret recovery model and the operational dependencies it introduces.",
          },
        ],
      }),
    ],
  },
  {
    id: "2",
    slug: "sigurno-igraliste",
    shortTitle: "Safe playground",
    title: "Safe playground: everything starts on Signet",
    summary:
      "Repeat wallet operations with test bitcoin that has no market value until the procedure feels familiar and routine.",
    outcome:
      "You will complete the full create → receive → send → back up → remove → restore cycle without real financial risk.",
    status: "in-progress",
    estimatedTime: "2-3 h",
    lessons: [
      outlineLesson({
        id: "signet-why",
        slug: "prvo-nauci-s-bitcoinima-bez-vrijednosti",
        title: "First learn with bitcoins that have no value",
        summary:
          "Your first self-custody attempt should not happen when real money is already at stake.",
        objective:
          "Explain why a repeatable test cycle is a safety feature, not just an exercise for beginners.",
        status: "published",
        verification: "verified",
        referenceVersion: "BIP 325 / Bitcoin Core 31.1",
        explanation: [
          "Signet is a Bitcoin test network whose coins have no real-world monetary value. Its rules and wallet concepts are similar enough to mainnet for you to practice using addresses, making transactions, paying fees, backing up, restoring, and signing without risking real funds.",
          "The goal is not to click through the workflow once. The goal is to repeat it, explain it, and recognize when something deviates from the expected result.",
        ],
        sources: [bip325, offlineSigning],
        callouts: [
          {
            kind: "warning",
            title: "Signet is not a private environment",
            body: "Coins have no market value, but addresses and transactions are still public on the test chain. Do not use real secrets or mainnet seeds.",
          },
        ],
        checklist: [
          "I understand why Signet coins are not mainnet bitcoin.",
          "I know that a test network does not justify introducing real secrets.",
          "I accept that I must repeat recovery before using real funds.",
        ],
      }),
      outlineLesson({
        id: "signet-vs-mainnet",
        slug: "mainnet-vs-signet",
        title: "Mainnet vs. Signet",
        summary:
          "The same mental models apply, but the chains, data directories, addresses, and coin values are entirely separate.",
        objective:
          "Reliably identify which network you are using before any wallet or RPC operation.",
        status: "published",
        verification: "verified",
        referenceVersion: "BIP 325 / Bitcoin Core 31.1",
        concepts: [
          "Signet uses a separate chain and separate subdirectories of data.",
          "Signet and mainnet addresses are not interchangeable destinations.",
          "The wallet name is not sufficient to prove the network; check the active chain context.",
        ],
        sources: [bip325, coreFiles],
      }),
      outlineLesson({
        id: "signet-start",
        slug: "pokretanje-bitcoin-corea-na-signetu",
        title: "Starting Bitcoin Core on Signet",
        summary:
          "Install Bitcoin Core, verify the download, and separate the Signet profile before the first wallet operation.",
        objective:
          "Run a verified version of Bitcoin Core on Signet without loading mainnet wallets.",
        reviewNote: standardReviewNote,
        sources: [coreRelease, bip325],
      }),
      outlineLesson({
        id: "signet-first-wallet",
        slug: "prvi-signet-wallet-i-adresa",
        title: "First Signet wallet and receiving address",
        summary:
          "Make an obvious test wallet, record the network, and generate the first address.",
        objective:
          "Understand which wallet and node were created and where their data are stored.",
        reviewNote: standardReviewNote,
        sources: [managingWallets, coreFiles],
      }),
      outlineLesson({
        id: "signet-receive-send",
        slug: "prvi-receive-i-send-na-signetu",
        title: "First Signet receive and send",
        summary:
          "Obtain test coins, confirm receipt, choose an amount, and send a Signet transaction.",
        objective:
          "Follow the complete workflow from generating an address to confirming receipt and sending a controlled test transaction.",
        reviewNote:
          "The faucet, current GUI, and fee and coin-selection workflow should be checked immediately before publication.",
        sources: [bip325],
      }),
      outlineLesson({
        id: "signet-restore",
        slug: "backup-unisti-testno-okruzenje-i-restore",
        title: "Back up, remove the test wallet, and restore it",
        summary:
          "The test ends only when a fresh setup restores the expected addresses from backup and can use the wallet.",
        objective:
          "Prove that the backup and passphrase together enable repeatable recovery, not just a sense of security.",
        reviewNote: standardReviewNote,
        sources: [managingWallets],
      }),
      outlineLesson({
        id: "muscle-memory",
        slug: "self-custody-muscle-memory",
        title: "Self-custody muscle memory",
        summary:
          "The system you haven't touched in years becomes stressful just when you need it most.",
        objective:
          "Establish a periodic recovery drill that keeps the procedure familiar, verifiable, and documented.",
        status: "published",
        verification: "verified",
        referenceVersion: "Operational model v1",
        explanation: [
          "A common pattern is a small test, a large transfer, relief, and then a year without practice. During that time, devices, software, and your own memory may change.",
          "On Signet you can regularly repeat receiving, sending, backup, restore, and signing without moving real savings. Routine reduces psychological friction and reveals outdated instructions before the consequences are financial.",
        ],
        checklist: [
          "I set a recurring recovery-drill schedule.",
          "I know what result to expect after a restore.",
          "I will record the software version and date of each drill.",
        ],
        callouts: [
          {
            kind: "mental-model",
            title: "Don't set it and forget it",
            body: "A good self-custody system is not one you never touch. It is one you can verify without endangering real funds.",
          },
        ],
      }),
    ],
  },
  {
    id: "3",
    slug: "prvi-stvarni-core-wallet",
    shortTitle: "First real wallet",
    title: "Your first real Core wallet",
    summary:
      "Only after a repeatable Signet restore should you design the computer, encryption, backup, and recovery plan for real funds.",
    outcome:
      "You will have a documented single-sig system that you have proven through recovery testing before using mainnet.",
    status: "in-progress",
    estimatedTime: "3-5 h",
    lessons: [
      outlineLesson({
        id: "real-device",
        slug: "odabir-racunala-i-malware-threat-model",
        title: "Choosing a computer and defining the malware threat model",
        summary:
          "General-purpose hardware can be a reasonable signer or wallet device when you understand the risks introduced by combining or separating roles.",
        objective:
          "Choose the device's role based on your threat model, not its product label.",
        sources: [offlineSigning],
        reviewNote: standardReviewNote,
      }),
      outlineLesson({
        id: "real-create",
        slug: "kreiranje-stvarnog-walleta",
        title: "Create your first mainnet wallet",
        summary:
          "Create a new descriptor wallet only after the device, network, and recovery plan have been defined.",
        objective:
          "Create the wallet and document its version, location, and purpose.",
        sources: [managingWallets],
        reviewNote: standardReviewNote,
      }),
      outlineLesson({
        id: "real-encryption",
        slug: "enkripcija-i-passphrase",
        title: "Encryption and passphrase",
        summary:
          "A passphrase protects private keys in the wallet file, but it does not hide all metadata or stop a keylogger.",
        objective:
          "Explain what wallet encryption protects, what it does not protect, and how losing the passphrase changes recovery.",
        sources: [managingWallets],
        reviewNote: standardReviewNote,
      }),
      outlineLesson({
        id: "real-backup",
        slug: "wallet-backup-i-redundancija",
        title: "Wallet backup and redundancy",
        summary:
          "Use the built-in backup procedure, maintain multiple reliable copies, and keep the wallet separate from its passphrase.",
        objective:
          "Create a backup system in which losing one medium or location is not the end of recovery.",
        sources: [managingWallets],
        reviewNote: standardReviewNote,
      }),
      outlineLesson({
        id: "real-restore",
        slug: "restore-na-cistom-testnom-okruzenju",
        title: "Restore in a clean test environment",
        summary:
          "A backup becomes evidence only when you load it, check the addresses, and confirm that the passphrase works.",
        objective:
          "Complete the full creation → encryption → backup → restore → verification cycle.",
        sources: [managingWallets],
        reviewNote: standardReviewNote,
      }),
      outlineLesson({
        id: "real-verify",
        slug: "verification-prije-prvog-mainnet-deposita",
        title: "Verification before the first mainnet deposit",
        summary:
          "The first real deposit comes only after verifying addresses, the backup, the passphrase, and the documented recovery procedure.",
        objective:
          "Make an informed decision about whether the system is ready for a small mainnet test.",
        reviewNote: standardReviewNote,
        sources: [managingWallets],
      }),
    ],
  },
  {
    id: "4",
    slug: "node-bez-mitologije",
    shortTitle: "Node without mythology",
    title: "Node without mythology",
    summary:
      "Separate wallets, IBD, pruning, storage, and migration so that a 2 TB drive and a dedicated server do not become false prerequisites.",
    outcome:
      "You will know which Bitcoin Core functions your setup needs and what resources each one actually requires.",
    status: "in-progress",
    estimatedTime: "70 min",
    lessons: [
      retainLesson("2.2", {
        slug: "node-wallet-i-blockchain-nisu-ista-stvar",
        objective:
          "Distinguish chain synchronization from wallet creation, backup, and signing.",
        sources: [coreRepository, coreFiles],
      }),
      retainLesson("2.3", {
        slug: "full-vs-pruned-node",
        objective:
          "Explain how a pruned node fully validates blocks but does not keep them permanently after validation.",
        sources: [coreFiles, coreRelease],
      }),
      outlineLesson({
        id: "ibd-separation",
        slug: "ibd-nije-prepreka-za-ucenje-walleta",
        title: "IBD is not an obstacle to learning wallet operations",
        summary:
          "Full synchronization is required for a current, independently validated view of the chain — but wallet creation, backup, restore, and signing are separate concepts.",
        objective:
          "Separate what you can learn offline from what requires a synchronized node.",
        status: "published",
        verification: "verified",
        explanation: [
          "Initial Block Download retrieves and validates the history the node needs to calculate the current state. Without it, the node does not have a fully synchronized view for checking receipts and broadcasts.",
          "The wallet file, descriptors, backups, and signing are not the same as the blockchain database. This curriculum therefore separates wallet exercises from network operations.",
        ],
        sources: [coreFiles, offlineSigning],
      }),
      retainLesson("2.6", {
        slug: "wallet-backup-vs-node-podaci",
        objective:
          "Distinguish wallet backups from block, chainstate, and other node data, and avoid copying active files unsafely.",
        sources: [coreFiles, managingWallets],
      }),
      outlineLesson({
        id: "node-migration",
        slug: "migracija-node-podataka-ili-nova-validacija",
        title: "Migrate node data or validate from scratch",
        summary:
          "Copying verified data may save time, but it requires a clean shutdown and a documented procedure.",
        objective:
          "Assess the tradeoffs between migrating node data and performing a fresh synchronization without confusing either process with wallet recovery.",
        reviewNote: standardReviewNote,
        sources: [coreFiles],
      }),
      outlineLesson({
        id: "core-not-server",
        slug: "core-nije-ili-server-ili-beskoristan",
        title: "Bitcoin Core is neither a 24/7 server nor useless",
        summary:
          "An archival node, a pruned node, an online coordinator, and an offline signer are different roles with different requirements.",
        objective:
          "Choose the simplest Core architecture that solves your specific problem.",
        status: "published",
        verification: "verified",
        concepts: [
          "An archival node preserves the entire block history.",
          "A pruned node validates blocks but limits permanent storage of old block data.",
          "An offline signer does not need the blockchain or a network connection for its narrow function.",
        ],
        sources: [coreFiles, offlineSigning],
      }),
    ],
  },
  {
    id: "5",
    slug: "offline-signing",
    shortTitle: "Offline signing",
    title: "Offline signing",
    summary:
      "The online node knows the chain state and prepares the transaction; the offline signer holds the keys and signs the PSBT.",
    outcome:
      "On Signet, you will prepare, review, sign, finalize, and broadcast a transaction without exposing private keys online.",
    status: "in-progress",
    estimatedTime: "3-4 h",
    lessons: [
      retainLesson("2.4", {
        slug: "online-node-i-offline-signer",
        objective:
          "Divide the system into online verification and offline signing authority.",
        sources: [offlineSigning, psbt],
      }),
      retainLesson("2.5", {
        slug: "zasto-signer-ne-treba-blockchain",
        objective:
          "Explain which PSBT data is transferred and why the signer does not need to synchronize the chain.",
        sources: [offlineSigning, psbt],
      }),
      retainLesson("2.8", {
        slug: "hot-watch-only-i-signing-wallet",
        objective:
          "Distinguish the capabilities and privacy consequences of hot, watch-only, and offline wallets.",
        sources: [offlineSigning, descriptors],
      }),
      outlineLesson({
        id: "offline-device",
        slug: "priprema-offline-signera",
        title: "Preparing an offline signer",
        summary:
          "A general-purpose computer is assigned one documented role and remains disconnected from the network.",
        objective:
          "Prepare a signer without treating the air gap as a magical security guarantee.",
        reviewNote: standardReviewNote,
        sources: [offlineSigning],
      }),
      outlineLesson({
        id: "offline-psbt",
        slug: "prva-offline-potpisana-transakcija",
        title: "First offline signed transaction",
        summary:
          "The unsigned PSBT goes offline; the signed result returns online for finalization and broadcast.",
        objective:
          "Complete the full PSBT workflow on Signet, verifying the amount, destination, fee, and change.",
        reviewNote:
          "The official tutorial is a reference, but the entire walkthrough should be reproduced from scratch in Bitcoin Core 31.1 before publication.",
        sources: [offlineSigning, psbt],
      }),
      outlineLesson({
        id: "offline-recovery",
        slug: "recovery-drill-bez-originalnog-koordinatora",
        title: "Recovery drill without the original coordinator",
        summary:
          "An offline system is not complete until both the watch-only coordinator and signer can be restored from documented artifacts.",
        objective:
          "Prove that every role can be recovered without relying on the original online computer.",
        reviewNote: standardReviewNote,
        sources: [offlineSigning, managingWallets, descriptors],
      }),
    ],
  },
  {
    id: "6",
    slug: "operativna-sigurnost",
    shortTitle: "Operational security",
    title: "Operational security over time",
    summary:
      "A setup remains safe only if its procedures, devices, documentation, and people remain dependable over time.",
    outcome:
      "You'll have a maintenance rhythm, a recovery drill, and documentation that does not reveal secrets.",
    status: "in-progress",
    estimatedTime: "2 h",
    lessons: [
      outlineLesson({
        id: "ops-routine",
        slug: "redovni-testovi-i-godisnji-recovery-drill",
        title: "Regular tests and annual recovery drill",
        summary:
          "Check your backup media, passphrase access, software version, and recovery results before an emergency occurs.",
        objective:
          "Turn recovery from a theory into a periodic, measurable procedure.",
        reviewNote: standardReviewNote,
        sources: [managingWallets],
      }),
      outlineLesson({
        id: "ops-malware",
        slug: "malware-usb-i-provjera-odredista",
        title: "Malware, USB, and destination verification",
        summary:
          "An air gap reduces network exposure, but portable media and an unverified PSBT still carry risk.",
        objective:
          "Define what you will verify before signing and which independent display you will use.",
        reviewNote: standardReviewNote,
        sources: [offlineSigning],
      }),
      outlineLesson({
        id: "ops-physical",
        slug: "fizicka-sigurnost-i-backup-mediji",
        title: "Physical safety and backup media",
        summary:
          "Paper, metal, and digital media have different failure modes; the threat model determines the combination.",
        objective:
          "Assess fire, water, theft, loss, corrosion, and availability without declaring one medium universally best.",
        reviewNote: standardReviewNote,
      }),
      outlineLesson({
        id: "ops-documentation",
        slug: "dokumentiraj-proceduru-bez-otkrivanja-tajni",
        title: "Document the procedure without exposing secrets",
        summary:
          "Recovery instructions should describe artifacts, sequence, and checks without copying every secret into one document.",
        objective:
          "Create an operational guide that survives forgotten details and changing devices.",
        reviewNote: standardReviewNote,
      }),
      outlineLesson({
        id: "ops-inheritance",
        slug: "inheritance-i-drugi-ljudi",
        title: "Inheritance and other people",
        summary:
          "The system must consider who can understand and implement recovery when you are not available.",
        objective:
          "Account for people and legal context without introducing technical complexity too early.",
        verification: "planned",
        status: "planned",
        referenceVersion: "Planned with professional legal review",
      }),
    ],
  },
  {
    id: "7",
    slug: "multisig",
    shortTitle: "Multisig",
    title: "Multisig when it solves a real problem",
    summary:
      "A 2-of-3 setup removes some single points of failure but adds descriptors, coordination, and new recovery obligations.",
    outcome:
      "On Signet, you will build and deliberately break a 2-of-3 setup before deciding whether you need one at all.",
    status: "in-progress",
    estimatedTime: "5-7 h",
    lessons: [
      outlineLesson({
        id: "multisig-why",
        slug: "zasto-i-kada-ne-multisig",
        title: "Why multisig — and when it does not make sense",
        summary:
          "Multisig is a response to specific failure modes, not a badge of sophistication.",
        objective:
          "Assess whether 2-of-3 improves your threat model enough to justify the added operational complexity.",
        sources: [multisigTutorial],
        reviewNote: standardReviewNote,
      }),
      outlineLesson({
        id: "multisig-signet",
        slug: "2-of-3-na-signetu",
        title: "2-of-3 on Signet",
        summary:
          "Three test signers and a watch-only coordinator build the first multisig policy without real funds.",
        objective:
          "Build a descriptor, confirm the same receiving addresses, and sign with any two signers.",
        sources: [multisigTutorial, descriptors, psbt],
        reviewNote: standardReviewNote,
      }),
      outlineLesson({
        id: "multisig-backup",
        slug: "kljucevi-nisu-cijeli-multisig-recovery",
        title: "Keys are not the whole multisig recovery package",
        summary:
          "Descriptors, derivation information, policies, and documentation may be necessary alongside private keys.",
        objective:
          "Describe all recovery artifacts for a verified 2-of-3 setup.",
        sources: [descriptors, multisigTutorial],
        reviewNote: standardReviewNote,
      }),
      outlineLesson({
        id: "multisig-failures",
        slug: "failure-simulacije",
        title: "Failure simulations",
        summary:
          "Deliberately lose access to the coordinator, one signer, and one location to prove the limits of the system.",
        objective:
          "Finish recovery without the original coordinator and with one unavailable signer.",
        sources: [multisigTutorial],
        reviewNote: standardReviewNote,
      }),
    ],
  },
  {
    id: "8",
    slug: "taproot-i-napredne-politike",
    shortTitle: "Taproot and policies",
    title: "Taproot and advanced policies",
    summary:
      "A more complex spending policy should not automatically produce a chaotic recovery system.",
    outcome:
      "You'll understand key-path spending, script-path spending, and the additional recovery artifacts before testing each branch on Signet.",
    status: "in-progress",
    estimatedTime: "To be estimated",
    lessons: [
      outlineLesson({
        id: "taproot-model",
        slug: "taproot-mentalni-model",
        title: "Taproot mental model",
        summary:
          "Key-path and script-path spending are different authorization methods, not just a new address format.",
        objective:
          "Explain what Taproot changes without assuming that it is automatically better for every setup.",
        sources: [descriptors],
        reviewNote: standardReviewNote,
      }),
      outlineLesson({
        id: "taproot-descriptors",
        slug: "taproot-descriptori-i-recovery-artefakti",
        title: "Taproot descriptors and recovery artifacts",
        summary:
          "Precisely defined policies determine what the wallet backup contains and what else you need to document.",
        objective:
          "Specify all artifacts required to recover a particular Taproot structure.",
        sources: [descriptors],
        reviewNote: standardReviewNote,
      }),
      outlineLesson({
        id: "complex-simple",
        slug: "complex-wallet-simple-recovery",
        title: "Complex wallet, simple recovery",
        summary:
          "Advanced policy can remain operationally understandable if each path is documented and regularly tested.",
        objective:
          "Reduce the psychological and operational costs of complexity through Signet practice and recovery drills.",
        reviewNote: standardReviewNote,
      }),
      outlineLesson({
        id: "taproot-path-tests",
        slug: "testiranje-svakog-recovery-patha",
        title: "Testing each recovery path",
        summary:
          "A path that exists only in the descriptor but has never been exercised on Signet has not yet been operationally proven.",
        objective:
          "Test and document each planned recovery branch before mainnet use.",
        sources: [descriptors, psbt],
        reviewNote: standardReviewNote,
      }),
    ],
  },
  {
    id: "9",
    slug: "laboratorij",
    shortTitle: "Laboratory",
    title: "Self-Custody Laboratory",
    summary:
      "Isolated experiments for RPC, descriptors, PSBT, multisig, Taproot, regtest, and failure scenarios.",
    outcome:
      "You'll be able to form a hypothesis, run an experiment without risking real funds, and record a verifiable result.",
    status: "in-progress",
    estimatedTime: "Ongoing",
    lessons: [
      outlineLesson({
        id: "lab-method",
        slug: "kako-voditi-self-custody-eksperiment",
        title: "How to run a self-custody experiment",
        summary:
          "Each experiment defines a network, preconditions, an expected result, an observed result, and a cleanup procedure.",
        objective:
          "Perform a repeatable test that cannot affect a wallet holding real funds.",
        reviewNote: standardReviewNote,
      }),
      outlineLesson({
        id: "lab-rpc",
        slug: "rpc-i-cli",
        title: "RPC and CLI",
        summary:
          "Accurate, versioned experiments that show the difference between the node and the wallet context.",
        objective:
          "Read the help for your current version instead of blindly copying an outdated command.",
        sources: [coreRelease, coreRepository],
        reviewNote: standardReviewNote,
      }),
      outlineLesson({
        id: "lab-descriptors",
        slug: "descriptor-eksperimenti",
        title: "Descriptor experiments",
        summary:
          "Watch-only wallets, checksums, and public metadata in a controlled test environment.",
        objective: "Explain each descriptor element before import.",
        sources: [descriptors],
        reviewNote: standardReviewNote,
      }),
      outlineLesson({
        id: "lab-psbt",
        slug: "psbt-debugging",
        title: "PSBT debugging",
        summary:
          "Analysis of missing signatures, UTXO data, fees, and change without real funds.",
        objective:
          "Recognize what a PSBT still needs before signing or finalizing.",
        sources: [psbt],
        reviewNote: standardReviewNote,
      }),
      outlineLesson({
        id: "lab-regtest",
        slug: "regtest-i-failure-scenariji",
        title: "Regtest and failure scenarios",
        summary:
          "A local chain for quick, repeatable tests and deliberately induced failures.",
        objective:
          "Isolate the experiment from public networks and control blocks and test UTXOs directly.",
        reviewNote: standardReviewNote,
      }),
      outlineLesson({
        id: "lab-community",
        slug: "community-pitanja-i-clarifications",
        title: "Community questions and clarifications",
        summary:
          "Real user questions become versioned clarifications tied to a specific lesson.",
        objective:
          "Distinguish the explanation from changing the procedure and tie it to the version and primary source.",
        verification: "planned",
        status: "planned",
        referenceVersion: "Living curriculum process",
      }),
    ],
  },
]

const v2Lessons = new Map(
  curriculumPhasesV2.flatMap((phase) =>
    phase.lessons.map((lesson) => [lesson.id, lesson] as const)
  )
)

function reuseV2Lesson(
  id: string,
  overrides: Partial<PlayerLesson> = {}
): PlayerLesson {
  const lesson = v2Lessons.get(id)
  if (!lesson) throw new Error(`Missing v2 lesson ${id}`)
  return { ...lesson, ...overrides }
}

const newBackupAfterEncryption = outlineLesson({
  id: "signet-encrypt-new-backup",
  slug: "enkriptiraj-signet-wallet-i-napravi-novi-backup",
  title: "Encrypt wallet and create a new backup",
  summary:
    "Encryption changes the wallet's recovery state: a pre-encryption backup is no longer the artifact you should rely on for new receipts.",
  objective:
    "Encrypt an unmistakably test-only wallet, immediately create a new backup, and explain why this order of operations matters.",
  status: "published",
  verification: "verified",
  referenceVersion: CORE_REFERENCE_VERSION,
  estimatedTime: "15-20 min",
  explanation: [
    "Wallet encryption protects private keys in the wallet file, but introduces a passphrase that cannot be reset if you lose it. It does not protect against keyloggers on a compromised computer and does not hide all public wallet data.",
    "After encryption, Bitcoin Core 31.1 empties the keypool and generates a new HD seed. A backup created before encryption therefore cannot recover bitcoin received at addresses derived from the new seed. The new backup is not administrative housekeeping; it is the new recovery foundation.",
  ],
  walkthrough: {
    title: "Create → encrypt → new backup",
    intro:
      "Use only `signet-training-wallet` and a test passphrase that is not used anywhere else.",
    steps: [
      "Confirm that the active chain is `signet` and that `signet-training-wallet` is loaded.",
      "Encrypt the wallet with a dedicated test passphrase.",
      "Read Core's message about the empty keypool, the new HD seed, and the mandatory new backup.",
      "Immediately create a new backup through `backupwallet` or the corresponding GUI action.",
      "Label the backup with the network, wallet, date, and Bitcoin Core version — without storing the passphrase with the same artifact.",
    ],
  },
  codeBlocks: [
    {
      id: "signet-encrypt-wallet",
      title: "Encrypt the test wallet",
      code: 'bitcoin-cli -signet -rpcwallet="signet-training-wallet" encryptwallet "TEST-PASSPHRASE-ONLY"',
      explanation:
        "The placeholder in this example is not a passphrase. Use a separate test passphrase that will never protect real funds.",
      warning:
        "After this step, do not continue generating receiving addresses until you create a new backup.",
    },
    {
      id: "signet-backup-after-encryption",
      title: "Create a new backup after encryption",
      code: 'bitcoin-cli -signet -rpcwallet="signet-training-wallet" backupwallet "/SAFE-PATH/signet-training-after-encryption.dat"',
      explanation:
        "Use the built-in `backupwallet` command to create a consistent wallet backup at a safe destination.",
    },
  ],
  callouts: [
    {
      kind: "warning",
      title: "Create a new backup after encryption",
      body: "After encryption, Bitcoin Core 31.1 empties the keypool and creates a new HD seed. Funds received to keys derived from the new seed cannot be recovered from the old pre-encryption backup. Create another new backup after changing the wallet passphrase, and back up every wallet produced by a legacy-wallet migration.",
    },
    {
      kind: "important",
      title: "Encryption is not complete privacy",
      body: "Private keys are encrypted. Transactions, public keys and other wallet data may remain visible to the person who accesses the file.",
    },
  ],
  checklist: [
    "The wallet is unmistakably a test wallet and runs on Signet",
    "The wallet is encrypted with a test passphrase",
    "A new backup was created after encryption",
    "I can explain why the old backup is not enough for a new seed",
  ],
  sources: [managingWallets, coreFiles],
  origin: "New practical milestone in curriculum v2.1",
})

const entropyDeepDive = outlineLesson({
  id: "signet-entropy-deep-dive",
  slug: "odakle-dolazi-privatni-kljuc",
  title: "Where does the private key come from?",
  summary:
    "A good key-generation flow removes people from the task of inventing randomness.",
  objective:
    "Explain entropy, the operating system's CSPRNG, and Bitcoin Core's RNG at a high level without trying to improve the process manually.",
  status: "published",
  verification: "verified",
  referenceVersion: CORE_REFERENCE_VERSION,
  estimatedTime: "12-18 min",
  optional: true,
  explanation: [
    "Entropy is the unpredictability used to generate a secret number. People are poor sources of such unpredictability: patterns, favorite words, keyboard paths, and attempts to make something look random are often predictable.",
    "Bitcoin Core calls its strong RNG when creating a key. In Bitcoin Core 31.1, this process uses the operating system's cryptographic generator, Bitcoin Core's internal RNG state, and additional sources that it mixes before validating the resulting bytes as a secp256k1 private key.",
    "Your job is not to invent words, type a few random-looking characters, or add a creative flourish. Your job is to use verified software on a healthy system and then protect the resulting recovery model.",
  ],
  concepts: [
    "The operating system's CSPRNG provides a system-level source of cryptographic randomness.",
    "Core's `GetStrongRandBytes` mixes fresh operating-system randomness with internal and additional sources on every call.",
    "`CKey::MakeNewKey` repeats generation until the resulting 32-byte number is a valid secp256k1 private key.",
  ],
  callouts: [
    {
      kind: "mental-model",
      title: "Do not try to outsmart the RNG",
      body: "If the software already uses quality CSPRNG, manual selection of 'random' words or characters usually introduces predictability rather than additional security.",
    },
  ],
  checklist: [
    "I can explain why a person is not a good RNG",
    "I can distinguish key generation from the later backup process",
    "I will not invent a seed phrase or private key by hand",
  ],
  sources: [coreRandom, coreKeyGeneration, coreRepository],
  origin: "Restored and expanded theme from old curriculum",
})

const backupFreshnessLesson = outlineLesson({
  id: "backup-redundancy-freshness",
  slug: "vise-kopija-nije-isto-sto-i-noviji-backup",
  title: "More copies are not the same as a current backup",
  summary:
    "Redundancy answers how many failures you can survive; freshness answers whether you have the right version of the wallet state.",
  objective:
    "Distinguish the number of copies from the events after which Core explicitly requires a new backup.",
  status: "published",
  verification: "verified",
  referenceVersion: CORE_REFERENCE_VERSION,
  estimatedTime: "12-16 min",
  explanation: [
    "Redundancy means keeping reliable copies on different media or in different locations. It protects against device loss, media failure, fire, theft, or one location becoming inaccessible.",
    "Freshness means that the backup corresponds to the current recovery state. With a modern HD wallet, you do not need a new backup after every receiving address merely to preserve spendable keys. However, Bitcoin Core 31.1 requires a new backup immediately after encryption or a passphrase change, and every wallet created by a legacy-wallet migration must also be backed up.",
    "A newer backup also stores newer metadata, such as labels. A blockchain rescan cannot reconstruct those data, so an older backup may recover funds while losing important operational context.",
  ],
  callouts: [
    {
      kind: "important",
      title: "Two separate checks",
      body: "Ask: Do I have enough independent copies — and do they represent the wallet state I need to restore? Three obsolete copies are not a current backup.",
    },
  ],
  concepts: [
    "Redundancy: number, media, locations and failure modes.",
    "Freshness: has an operation since the backup made a new one necessary?",
    "Metadata freshness: labels and other wallet data can be newer than the last copy.",
  ],
  checklist: [
    "I know how many independent copies I want to keep",
    "I know when encryption or a passphrase change requires a new backup",
    "After a migration, I will back up every newly created wallet",
    "In a recovery drill I also check metadata, not just the balance",
  ],
  sources: [managingWallets, coreFiles],
  origin: "New backup mental model in curriculum v2.1",
})

const cloudPrivacyLesson = outlineLesson({
  id: "encrypted-backup-privacy",
  slug: "digitalni-i-cloud-backup-privacy-model",
  title: "Digital and cloud backups: a privacy model",
  summary:
    "Encryption may make private-key theft harder, but it does not make a wallet backup free of privacy risk.",
  objective:
    "Evaluate digital or cloud backups in terms of asset theft, public wallet-data leakage, and passphrase strength.",
  status: "published",
  verification: "verified",
  referenceVersion: CORE_REFERENCE_VERSION,
  estimatedTime: "10-14 min",
  explanation: [
    "Bitcoin Core wallet encryption primarily protects private keys. The documentation explicitly states that transactions, public keys and other wallet data are not necessarily hidden.",
    "An attacker who obtains an encrypted backup may not be able to spend funds immediately, but could access public wallet metadata, link addresses and transactions, or learn about financial activity. A weak or reused passphrase further reduces protection.",
    "Cloud storage is therefore a tradeoff: it can improve redundancy and availability, but adds a third party, online exposure, and potential privacy leakage to the threat model. It is not a universal recommendation.",
  ],
  callouts: [
    {
      kind: "warning",
      title: "Encrypted does not mean private",
      body: "Assess separately whether an attacker could spend funds, what they could learn about the wallet, and how strong the passphrase is. Only then decide whether online storage is acceptable for your threat model.",
    },
  ],
  checklist: [
    "I can distinguish the risk of key theft from the risk of privacy leakage",
    "I do not treat cloud backups as a universal best practice",
    "I keep the wallet backup and its passphrase in separate trust domains",
  ],
  sources: [managingWallets, coreFiles],
  origin: "New privacy layer backup model in curriculum v2.1",
})

const signetReadinessChecklist = [
  "I created `signet-training-wallet`",
  "I encrypted the wallet with a test passphrase",
  "I made a new backup after encryption",
  "I received Signet coins",
  "I sent a Signet transaction",
  "I understand fees and change at least at a basic level",
  "I deliberately removed the active test wallet from the controlled environment",
  "I restored the wallet from the new backup",
  "I unlocked the wallet with the correct test passphrase",
  "I checked the expected addresses and the wallet state",
  "After recovery I signed and sent another Signet transaction",
]

const curriculumPhasesV21Draft: CurriculumPhase[] = [
  {
    id: "0",
    slug: "razumij-self-custody",
    shortTitle: "Understand self-custody",
    title: "Understand what you're really protecting",
    summary:
      "Keys are only the beginning; threat model, verification, and recovery make up the system.",
    outcome:
      "You'll be able to name the components of a self-custody system and the risk each safeguard is meant to reduce.",
    status: "published",
    estimatedTime: "25-35 min",
    lessons: [
      reuseV2Lesson("0.1"),
      reuseV2Lesson("0.2"),
      reuseV2Lesson("0.3", { optional: true }),
    ],
  },
  {
    id: "1",
    slug: "bitcoin-core-mentalni-model",
    shortTitle: "Why Bitcoin Core only",
    title: "Why this curriculum stays with Bitcoin Core",
    summary:
      "A focused mental model for building, testing, and recovering one coherent Bitcoin Core self-custody system.",
    outcome:
      "You'll understand why every production role in this curriculum stays inside Bitcoin Core—and why other capable tools are deliberately left out.",
    status: "published",
    estimatedTime: "25 min + Deep dives",
    lessons: [
      reuseV2Lesson("1.5", {
        title: "Why this curriculum stays with Bitcoin Core",
        summary:
          "One implementation, one descriptor model, one backup model, and one recovery language reduce avoidable transitions between tools.",
        objective:
          "Explain why a Bitcoin Core-only production stack makes the custody architecture easier to reason about and rehearse.",
        explanation: [
          "This curriculum does not use Bitcoin Core as a badge of identity. It uses Core because the node, online watch-only wallet, offline signer, descriptors, PSBT workflow, backups, and recovery procedure can remain inside one inspectable implementation.",
          "That continuity matters. Every additional production wallet introduces another release process, file format, recovery convention, and set of assumptions. Capable alternatives may be useful elsewhere, but they are unnecessary for the system taught here.",
          "The recommended stack is therefore explicit: Bitcoin Core on a clean Linux installation, Fedora as the practical example, and KeePassXC for generating a strong random passphrase. For meaningful savings, the stronger architecture separates an offline Core signer from a separate online Core node.",
        ],
        callouts: [
          {
            kind: "mental-model",
            title: "Core-only is an architectural boundary.",
            body: "It keeps validation, descriptors, PSBTs, signing, wallet backups, and recovery in one documented system. It is not a claim that every other wallet is incapable.",
          },
        ],
        checklist: [
          "I can explain why this curriculum uses one wallet implementation end to end.",
          "I know the recommended software stack and the role of each component.",
          "I understand that simpler tooling does not remove malware, physical, or human risk.",
        ],
      }),
      reuseV2Lesson("2.1"),
      reuseV2Lesson("own-node"),
      reuseV2Lesson("core-development", { optional: true }),
      reuseV2Lesson("1.2", {
        optional: true,
        title: "Why Sparrow is not part of the production stack",
        summary:
          "Sparrow is a capable interface for PSBTs, descriptors, watch-only wallets, and hardware signers, but none of those functions require it here.",
        objective:
          "Recognize Sparrow's strengths while keeping private keys and recovery artifacts out of a second wallet implementation.",
        explanation: [
          "Sparrow can coordinate PSBTs, descriptors, watch-only wallets, multisig policies, and hardware signers. Those are real capabilities, not shortcomings.",
          "Bitcoin Core already provides the PSBT, descriptor, watch-only, signing, and recovery functions used by this curriculum. Adding Sparrow would create another production dependency and another interface to understand without solving a missing requirement.",
          "For that reason, Sparrow may be studied as an optional comparison, but it is not used to create production private keys, store recovery material, coordinate the recommended architecture, or restore the wallet taught here.",
        ],
        warnings: [
          "Do not move a real private key or recovery secret into Sparrow for this curriculum.",
        ],
        checklist: [
          "I can name Sparrow's useful coordination features.",
          "I understand why those features do not require adding Sparrow to this system.",
          "I will keep production keys and recovery inside the documented Bitcoin Core workflow.",
        ],
      }),
      reuseV2Lesson("1.3", {
        optional: true,
        title: "Why Electrum is not part of the production stack",
        summary:
          "Electrum is a mature wallet with its own server, mnemonic, encryption, and recovery model—a different system from the one taught here.",
        objective:
          "Understand that Electrum's separate implementation and recovery conventions are unnecessary dependencies for this Core-only architecture.",
        explanation: [
          "Electrum is a capable lightweight wallet. It uses a different implementation, obtains blockchain data through an Electrum server model, and has its own mnemonic and wallet-encryption conventions.",
          "Those differences are legitimate design choices, but they create another recovery language and another set of operational assumptions. This curriculum does not mix them into a Bitcoin Core production system.",
          "Electrum may be studied comparatively. It is not used for production key generation, signing, backup, or recovery in the recommended architecture.",
        ],
        checklist: [
          "I understand that Electrum seeds and BIP39 mnemonics are not interchangeable assumptions.",
          "I know why a separate server and recovery model add unnecessary scope here.",
          "I will not use Electrum as a recovery shortcut for this Core wallet.",
        ],
      }),
      reuseV2Lesson("1.1", {
        optional: true,
        title: "Isolated signing without a commercial hardware wallet",
        summary:
          "The useful property is keeping signing keys off the network; a vendor-specific device is one possible implementation, not a requirement.",
        objective:
          "Separate the security benefit of isolated signing from the new dependencies introduced by specialized hardware wallets.",
        explanation: [
          "A hardware wallet can isolate signing keys and make self-custody more accessible. The isolation property is useful, but it does not require a commercial device.",
          "A dedicated generic computer with a clean Linux installation and Bitcoin Core can serve as the offline signer. A separate online Bitcoin Core node prepares PSBTs and broadcasts signed transactions, while private keys remain on the offline machine.",
          "Commercial hardware adds a specialized target, firmware and supply-chain assumptions, device attestation, vendor security practices, vendor-specific recovery paths, and frequent coupling to mnemonic backups. None of those dependencies is needed for the architecture taught here.",
        ],
        callouts: [
          {
            kind: "important",
            title: "Recommended for meaningful savings",
            body: "Use generic dedicated hardware, clean Linux, Bitcoin Core as the offline signer, and a separate online Bitcoin Core node. The curriculum does not use a commercial hardware wallet.",
          },
        ],
        checklist: [
          "I can explain the benefit of isolated signing without naming a product.",
          "I can identify the extra trust assumptions introduced by specialized hardware.",
          "I understand the two-computer Bitcoin Core architecture recommended here.",
        ],
      }),
      reuseV2Lesson("1.4", {
        optional: true,
        title: "Why this curriculum does not use BIP39 mnemonics",
        summary:
          "The objection is not weak entropy. It is turning the wallet's portable root bearer secret into words meant to be copied and handled by people.",
        objective:
          "Distinguish deterministic key derivation from a BIP39 recovery workflow and explain why this curriculum keeps recovery in an encrypted Core wallet backup.",
        explanation: [
          "BIP32 describes deterministic derivation: many keys can be derived from internal seed material. BIP39 adds a portable, human-readable mnemonic representation that can recreate the wallet's root secret. These are related ideas, but they are not the same requirement.",
          "Bitcoin Core descriptor wallets also use deterministic seed material internally. Core does not present that root as a BIP39 word backup. The recovery artifact in this curriculum is the Bitcoin Core wallet backup, which also preserves descriptors, labels, and other wallet metadata.",
          "The preferred separation is an encrypted wallet backup plus a strong passphrase stored in a different trust domain. The passphrase alone cannot recreate the wallet. The encrypted backup should not enable spending without the passphrase. The backup also preserves operational metadata that a mnemonic does not inherently carry.",
          "Therefore, do not generate, engrave, transcribe, or store a BIP39 mnemonic for the wallet built in this curriculum.",
        ],
        warnings: [
          "Do not create a BIP39 mnemonic as an additional backup for this Bitcoin Core wallet.",
        ],
        callouts: [
          {
            kind: "warning",
            title: "The wrong thing became human-readable",
            body: "A BIP39 mnemonic is a portable bearer secret. Anyone who obtains it can usually recreate the wallet. Read the full argument before adopting mnemonic recovery.",
            url: bip39Editorial.url,
          },
        ],
        concepts: [
          "BIP32 deterministic derivation does not require a user-facing BIP39 mnemonic.",
          "Bitcoin Core keeps deterministic seed material internal to the wallet.",
          "Encrypted wallet backup and passphrase are separate recovery components.",
          "A wallet backup preserves descriptors and metadata that words alone do not encode.",
        ],
        checklist: [
          "I can distinguish BIP32 derivation from BIP39 mnemonic recovery.",
          "I will not create or store a BIP39 mnemonic for this wallet.",
          "I will keep the encrypted Core backup and its passphrase separate.",
        ],
        sources: [bip39Editorial, bip39, managingWallets],
      }),
    ],
  },
  {
    id: "2",
    slug: "signet-training-cycle",
    shortTitle: "Signet training cycle",
    title: "Exercise the whole cycle without real money",
    summary:
      "Create → encrypt → back up → transact → remove → restore → transact again.",
    outcome:
      "You will create a wallet, encrypt it, back it up, use it, remove it, restore it, and use it again on Signet.",
    status: "in-progress",
    estimatedTime: "2-3 h",
    lessons: [
      reuseV2Lesson("signet-why"),
      reuseV2Lesson("signet-vs-mainnet"),
      outlineLesson({
        id: "signet-install-verify",
        slug: "instaliraj-i-provjeri-bitcoin-core",
        title: "Install and check Bitcoin Core",
        summary:
          "Verify the official package, checksum, and signatures before creating a wallet.",
        objective:
          "Download Core from the official source and verify the package before starting.",
        status: "published",
        verification: "verified",
        referenceVersion: CORE_REFERENCE_VERSION,
        estimatedTime: "15-25 min",
        explanation: [
          "Checking packages does not prove that the entire computer is trustworthy, but it removes an important class of error: running binaries other than those published by the project.",
          "Exact files, hashes, and signatures change with each release. This lesson therefore links to the current official download page instead of hard-coding a hash in the text.",
        ],
        walkthrough: {
          title: "Official package before wallet",
          steps: [
            "Confirm that you are downloading Bitcoin Core from the official bitcoincore.org website.",
            "Choose a package for your operating system and architecture.",
            "Download the current `SHA256SUMS` file and its associated signatures.",
            "Compare the package's local SHA-256 hash with the official list.",
            "Verify the signatures by following the official instructions before installation.",
          ],
        },
        checklist: [
          "Package version and platform match my device",
          "SHA-256 matches the official list",
          "I understand what the checksum verifies and what it does not verify",
        ],
        sources: [coreDownload, coreRelease],
        origin: "Checked on the official Bitcoin Core 31.1 arm64 macOS package",
      }),
      reuseV2Lesson("signet-start", {
        status: "published",
        verification: "verified",
        lastReviewed: LAST_TECHNICAL_REVIEW,
        explanation: [
          "Signet has a separate chain context and data subdirectory. This reduces the risk of mixing test actions with a mainnet wallet, but the wallet name should still make its test-only purpose obvious.",
        ],
        walkthrough: {
          title: "Run separate Signet context",
          steps: [
            "Start Bitcoin Core with `-signet` or select Signet before performing wallet operations.",
            "Run `getblockchaininfo` and confirm that the `chain` field says `signet`.",
            "Note that Signet uses a separate `signet/` subdirectory within the selected data directory.",
          ],
        },
        codeBlocks: [
          {
            id: "verify-signet-chain",
            title: "Check Active Network",
            code: "bitcoin-cli -signet getblockchaininfo",
            explanation:
              'Before each practical exercise, check that the output contains `"chain": "signet"`.',
          },
        ],
        sources: [bip325, coreFiles],
      }),
      reuseV2Lesson("signet-first-wallet", {
        status: "published",
        verification: "verified",
        lastReviewed: LAST_TECHNICAL_REVIEW,
        title: "Create the first Signet training wallet",
        summary:
          "Create an unmistakably test-only descriptor wallet, check its state, and stop before generating the first receiving address.",
        objective:
          "Create an unmistakably test-only descriptor wallet, fully separate from any future mainnet setup.",
        explanation: [
          "The name `signet-training-wallet` deliberately describes the network and purpose. This wallet exists only for training and must never become a mainnet wallet.",
        ],
        walkthrough: {
          title: "Create an unmistakably test-only wallet",
          steps: [
            "Confirm once more that the active chain is `signet`.",
            "Create a wallet named `signet-training-wallet`.",
            "Check `getwalletinfo`: descriptors should be enabled, private keys should be available, and the wallet format should match the current version.",
            "Do not generate a receiving address before learning about encryption and creating a new backup.",
          ],
        },
        codeBlocks: [
          {
            id: "create-signet-training-wallet",
            title: "Create Signet training wallet",
            code: 'bitcoin-cli -signet createwallet "signet-training-wallet"',
            explanation:
              "An explicit test-only name reduces the risk of confusing networks or recovery artifacts.",
          },
        ],
        callouts: [
          {
            kind: "warning",
            title: "Do not turn a Signet wallet into a mainnet wallet",
            body: "Mainnet gets a new network context, a new wallet, and new recovery artifacts. Signet exists to teach the procedure, not to become a real-funds wallet later.",
          },
        ],
        sources: [managingWallets, coreFiles],
      }),
      newBackupAfterEncryption,
      entropyDeepDive,
      reuseV2Lesson("signet-receive-send", {
        title: "Receive and send on Signet: fees and change",
        summary:
          "After creating the new backup, receive test coins, send a transaction, and review the destination, amount, fee, and change.",
        objective:
          "Complete the transaction part of the training cycle without real value.",
        reviewNote:
          "The faucet and current send/coin-selection flow should be reproduced on Bitcoin Core 31.1 before this lesson receives the Tested label.",
      }),
      reuseV2Lesson("signet-restore", {
        status: "published",
        verification: "verified",
        lastReviewed: LAST_TECHNICAL_REVIEW,
        title: "Remove the active wallet, restore it, and unlock it",
        summary:
          "Safely remove the loaded test wallet, restore it from the post-encryption backup, and verify the passphrase and expected state.",
        objective:
          "Prove that the new post-encryption backup restores a wallet you can unlock and verify.",
        explanation: [
          "Perform this destructive exercise only on the unmistakably test-only Signet wallet. First unload it, then move the active wallet directory to a controlled temporary location. Decide whether to remove that temporary copy only after a successful restore.",
          "After restoring, check the wallet format, descriptors, and expected addresses, then unlock it with the test passphrase. A balance alone is not sufficient proof that recovery is documented and understood.",
        ],
        walkthrough: {
          title: "Remove → restore → unlock → verify",
          steps: [
            "Record one or more expected Signet addresses and the current wallet state.",
            "Unload `signet-training-wallet`.",
            "Move its active test directory to a controlled temporary location; do not touch any other wallet or node data.",
            "Restore the new post-encryption backup as `signet-training-restored`.",
            "Unlock the restored wallet with the test passphrase.",
            "Check the expected addresses, descriptors, and `getwalletinfo`.",
          ],
        },
        codeBlocks: [
          {
            id: "restore-signet-wallet",
            title: "Restoration of the new backup",
            code: 'bitcoin-cli -signet restorewallet "signet-training-restored" "/SAFE-PATH/signet-training-after-encryption.dat"',
            explanation:
              "The restored wallet receives a new, unmistakably test-only name so it remains separate from the wallet you removed.",
          },
          {
            id: "unlock-restored-signet-wallet",
            title: "Temporarily unlock the restored wallet",
            code: 'bitcoin-cli -signet -rpcwallet="signet-training-restored" walletpassphrase "ENTER-TEST-PASSPHRASE" 120',
            explanation:
              "The timeout limits how long the decryption key remains in memory.",
          },
        ],
        sources: [managingWallets, coreFiles],
        origin:
          "Create/encrypt/back up/unload/restore/unlock flow reproduced on Bitcoin Core 31.1",
      }),
      outlineLesson({
        id: "signet-transact-again",
        slug: "ponovno-poslaji-nakon-signet-recoveryja",
        title: "Send again after recovery",
        summary:
          "Recovery is complete only when the restored wallet can authorize and send another Signet transaction.",
        objective:
          "Recheck the destination, amount, fee, and change after restoration.",
        reviewNote:
          "A funded Signet send-after-restore should be reproduced on Bitcoin Core 31.1 before this lesson receives the Tested label.",
        sources: [managingWallets, bip325],
      }),
      outlineLesson({
        id: "signet-readiness",
        slug: "mainnet-readiness-signet-checkpoint",
        title: "Mainnet readiness checkpoint",
        summary:
          "A checkpoint before a serious mainnet setup: you must be able to repeat the entire Signet cycle without guessing.",
        objective:
          "Honestly confirm operational readiness without technically locking up the following phases.",
        status: "published",
        verification: "verified",
        referenceVersion: CORE_REFERENCE_VERSION,
        estimatedTime: "5-10 min",
        explanation: [
          "This checkpoint does not unlock content or award a certificate. It separates theory you have read from a process you have actually performed.",
          "If you can't do this again without guessing, stay on Signet.",
        ],
        checklist: signetReadinessChecklist,
        callouts: [
          {
            kind: "mental-model",
            title: "First major milestone",
            body: "I created a wallet, encrypted it, backed it up, used it, deliberately removed it, restored it, and used it again — without real money.",
          },
        ],
        sources: [managingWallets, bip325],
        origin: "New checkpoint in curriculum v2.1",
      }),
    ],
  },
  {
    id: "3",
    slug: "node-bez-mitologije",
    shortTitle: "Node without mythology",
    title: "A minimal node model before mainnet",
    summary:
      "IBD, pruning, and the difference between a node and a wallet — without the myth that a large server is mandatory.",
    outcome:
      "You'll know what Bitcoin Core validates, what pruning deletes, and which parts of the system your setup actually needs.",
    status: "in-progress",
    estimatedTime: "45-60 min",
    lessons: [
      reuseV2Lesson("2.2"),
      reuseV2Lesson("ibd-separation"),
      reuseV2Lesson("2.3"),
      reuseV2Lesson("core-not-server"),
      reuseV2Lesson("2.6", { optional: true }),
      reuseV2Lesson("node-migration", { optional: true }),
    ],
  },
  {
    id: "4",
    slug: "odaberi-custody-arhitekturu",
    shortTitle: "Two Core architectures",
    title: "Choose one of two Bitcoin Core architectures",
    summary:
      "Both paths stay inside Bitcoin Core; the difference is whether signing keys share a device with network activity.",
    outcome:
      "You'll be able to choose the smallest architecture that addresses your actual failure modes.",
    status: "in-progress",
    estimatedTime: "45 min + practice",
    lessons: [
      outlineLesson({
        id: "architecture-choice",
        slug: "jednostavni-wallet-ili-offline-signer",
        title: "Simple wallet or offline signer?",
        summary:
          "Operational simplicity and isolated signing keys address different problems.",
        objective:
          "Choose Path A or Path B based on the amount, purpose, available devices, and your ability to maintain the setup.",
        status: "published",
        verification: "verified",
        referenceVersion: CORE_REFERENCE_VERSION,
        estimatedTime: "12-16 min",
        explanation: [
          "Path A is a simple online, encrypted Bitcoin Core wallet. It is reasonable for smaller amounts, a spending wallet, or a situation in which additional devices and transfers would increase the probability of human error.",
          "Path B uses an online Bitcoin Core node with a watch-only wallet and a separate offline Core signer. It addresses a specific failure mode: the compromise of a networked device that would otherwise hold private keys.",
          "Path B is the strong recommendation for meaningful savings because it removes private keys from the networked computer. It requires more discipline: two dedicated roles, descriptors, PSBT transport, and tested recovery procedures.",
        ],
        callouts: [
          {
            kind: "mental-model",
            title:
              "Path A is for limited-risk use; Path B is the savings architecture.",
            body: "Use Path A for learning, smaller amounts, or an everyday spending wallet. For meaningful long-term savings, use a separate offline Core signer and online Core node.",
          },
        ],
        checklist: [
          "I know what amount and purpose the wallet should support",
          "I can name the failure modes an offline signer would reduce",
          "I don't choose extra complexity just because it looks more advanced",
        ],
        sources: [offlineSigning, managingWallets],
        origin: "New architectural checkpoint in curriculum v2.1",
      }),
      outlineLesson({
        id: "architecture-path-a",
        slug: "path-a-online-encrypted-core-wallet",
        title: "Path A — Online encrypted Bitcoin Core wallet",
        summary: "One device, a clear backup, and fewer operational handoffs.",
        objective:
          "Recognize when a simpler hot wallet can be a safer overall system.",
        status: "published",
        verification: "verified",
        referenceVersion: CORE_REFERENCE_VERSION,
        estimatedTime: "8-12 min",
        explanation: [
          "Path A keeps private keys on a network-connected device. Encryption protects keys at rest, but it does not eliminate malware, keyloggers, or compromise of the active system.",
          "Its advantage is that it requires fewer components, transfers, and recovery artifacts. When operational simplicity reduces the overall risk of error, it is a legitimate choice.",
        ],
        sources: [managingWallets],
      }),
      reuseV2Lesson("2.4", {
        title: "Path B — Online node and offline signer",
        explanation: [
          "The online machine has a synchronized node and a watch-only wallet. It shows status, monitors receipts, prepares PSBTs, and broadcasts signed transactions.",
          "The offline machine has the wallet with private keys, no network connection, and no need for a copy of the blockchain. Its job is to display the PSBT and sign only what the user approves.",
        ],
        callouts: [
          {
            kind: "warning",
            title: "Public data can still be sensitive",
            body: "Watch-only descriptors are not private keys, but they can reveal a set of addresses, derivation paths, and financial links. Treat them as privacy-sensitive data.",
          },
        ],
        sources: [offlineSigning, descriptors, psbt],
      }),
      reuseV2Lesson("2.5"),
      reuseV2Lesson("2.8", {
        explanation: [
          "The watch-only wallet coordinates and tracks activity without private keys. The offline wallet signs. PSBTs carry the transaction and required metadata between the two roles.",
          "A USB drive or other transport medium is not automatically trusted simply because it connects the air-gapped system. Review the files, control the medium, and confirm the destination, amount, fee, and change on the signer.",
        ],
        sources: [offlineSigning, descriptors, psbt],
      }),
      reuseV2Lesson("offline-device", {
        explanation: [
          "Use a generic dedicated computer with a clean Linux installation, minimal software, and no continuing network role. Fedora Workstation is the practical example for modern hardware; Fedora Xfce is a lighter option for older machines.",
          "Install verified Bitcoin Core, create and retain the private-key wallet only on this offline signer, and use a separate online Bitcoin Core node with a watch-only wallet for synchronization, PSBT preparation, and broadcasting.",
          "The goal is a sterile, single-purpose signing environment—not a particular laptop brand. Document the hardware, operating system, Core version, transport method, and recovery procedure, then rehearse the full cycle on Signet.",
        ],
        callouts: [
          {
            kind: "mental-model",
            title: "Generic hardware, explicit roles",
            body: "The offline computer generates keys and signs. The online Core node synchronizes, prepares PSBTs, and broadcasts. Neither role needs a commercial hardware wallet or a second wallet application.",
          },
        ],
      }),
      reuseV2Lesson("offline-psbt"),
      reuseV2Lesson("offline-recovery"),
    ],
  },
  {
    id: "5",
    slug: "mainnet-odvojeni-setup",
    shortTitle: "Mainnet and a small test",
    title: "A new mainnet setup and small operational test",
    summary:
      "Signet proves the procedure; a small mainnet test proves the real network and the setup's configuration.",
    outcome:
      "You will keep the mainnet wallet separate from training, then test receiving and spending with an amount you can afford to lose.",
    status: "in-progress",
    estimatedTime: "2-4 h",
    lessons: [
      outlineLesson({
        id: "mainnet-separate-wallet",
        slug: "ne-pretvaraj-signet-wallet-u-mainnet-wallet",
        title: "Do not turn a Signet wallet into a mainnet wallet",
        summary:
          "Mainnet is a deliberately separate setup: a different chain context, a new wallet, and new recovery artifacts.",
        objective:
          "Separate the procedure you learned from all test keys, names, and files.",
        status: "published",
        verification: "verified",
        referenceVersion: CORE_REFERENCE_VERSION,
        estimatedTime: "6-10 min",
        explanation: [
          "The Signet wallet teaches the order of steps. A mainnet setup is not created by changing a flag or repurposing the test wallet, but by deliberately creating new keys and a new recovery system within the selected architecture.",
          "Clearly different names, locations, and documentation reduce the chance of confusing a test artifact with a real one or vice versa.",
        ],
        checklist: [
          "Signet and mainnet wallets have different names",
          "Mainnet gets new keys and a new backup",
          "The test passphrase is never used for real funds",
        ],
        sources: [coreFiles, managingWallets, bip325],
      }),
      reuseV2Lesson("real-device"),
      reuseV2Lesson("real-encryption", {
        reviewNote:
          "The mainnet create/encrypt flow should be completed on the selected real architecture; Bitcoin Core 31.1 documentation requires a new backup after encryption.",
        sources: [managingWallets],
      }),
      backupFreshnessLesson,
      cloudPrivacyLesson,
      reuseV2Lesson("real-restore"),
      outlineLesson({
        id: "mainnet-readiness",
        slug: "mainnet-readiness-prije-prvog-deposita",
        title: "Mainnet readiness before the first deposit",
        summary:
          "The new wallet should not receive a serious amount until the backup, passphrase, restore process, and selected architecture are clear.",
        objective:
          "Confirm that the same process can be repeated and you know why every step exists.",
        status: "published",
        verification: "verified",
        referenceVersion: CORE_REFERENCE_VERSION,
        estimatedTime: "8-12 min",
        explanation: [
          "The Signet checkpoint proves that you know the procedure. This checkpoint confirms that the new mainnet wallet has separate artifacts, that its backup reflects the post-encryption state, and that the architecture is one you actually want to maintain.",
          "If any answer depends on guessing, go back a step. Mainnet content remains accessible; this checkpoint supports a decision rather than enforcing one.",
        ],
        checklist: [
          "I've finished a full Signet training cycle",
          "The mainnet wallet and recovery artifacts are completely separate from Signet",
          "A new backup was created after encryption",
          "I know whether the backup restores all the keys, labels, and metadata I need",
          "I can explain why I chose Path A or Path B",
          "Recovery can be performed without the original active wallet",
        ],
        callouts: [
          {
            kind: "verify",
            title: "The result we're looking for",
            body: "I can repeat the same process and I know why every step exists.",
          },
        ],
        sources: [managingWallets, offlineSigning],
        origin: "New mainnet checkpoint in curriculum v2.1",
      }),
      outlineLesson({
        id: "mainnet-small-test",
        slug: "prvi-mali-mainnet-test",
        title: "The first small mainnet test",
        summary:
          "A small receive-and-spend cycle confirms that the real network and setup configuration work correctly.",
        objective:
          "Test the entire mainnet workflow with an amount you can afford to lose.",
        estimatedTime: "30-60 min + confirmations",
        walkthrough: {
          title: "First real, small-value cycle",
          steps: [
            "Check that the active chain says 'main' and that a new mainnet wallet has been loaded.",
            "Generate a receiving address and verify it using your documented procedure.",
            "Send an amount you can afford to lose; the curriculum does not prescribe a specific value.",
            "Verify the receipt through your own node.",
            "Make a small spend and check the destination, amount, fee, and change.",
            "Check again if the backup/recovery plan corresponds to the current wallet state.",
            "Only then should you consider using a larger amount.",
          ],
        },
        callouts: [
          {
            kind: "mental-model",
            title: "Signet and mainnet prove different things",
            body: "Signet proves the process. The small mainnet test proves that the real network and setup configuration work correctly.",
          },
        ],
        reviewNote:
          "The mainnet send/fee/change flow should be reproduced on Bitcoin Core 31.1 and the selected architecture before this lesson receives the Tested label.",
        sources: [managingWallets, psbt],
        origin: "New operational test in curriculum v2.1",
      }),
    ],
  },
  {
    ...curriculumPhasesV2[6],
    id: "6",
    slug: "odrzavanje-kroz-vrijeme",
    shortTitle: "Maintenance",
    title: "Maintenance, recovery drills, and inheritance",
  },
  curriculumPhasesV2[7],
  curriculumPhasesV2[8],
  curriculumPhasesV2[9],
]

const curriculumPhaseOrder = ["0", "1", "2", "4", "3", "5", "6", "7", "8", "9"]

export const curriculumPhases: CurriculumPhase[] = curriculumPhaseOrder.map(
  (originalId, index) => {
    const phase = curriculumPhasesV21Draft.find(
      (candidate) => candidate.id === originalId
    )
    if (!phase) throw new Error(`Missing curriculum phase ${originalId}`)
    return { ...phase, id: String(index) }
  }
)

export const curriculumLessons = curriculumPhases.flatMap((phase) =>
  phase.lessons.map((lesson, index) => ({
    phase,
    lesson,
    lessonNumber: `${phase.id}.${index + 1}`,
  }))
)

export function findLessonBySlug(slug: string | null | undefined) {
  if (!slug) return null
  return curriculumLessons.find(({ lesson }) => lesson.slug === slug) ?? null
}

export const publishedCurriculumLessons = curriculumLessons.filter(
  ({ lesson }) => lesson.status === "published"
)

export function isAvailableLesson(lesson: PlayerLesson) {
  return lesson.status === "published" && lesson.verification === "verified"
}

export const primaryCurriculumLessons = curriculumLessons.filter(
  ({ lesson }) => isAvailableLesson(lesson) && !lesson.optional
)

export const curriculumSources = {
  bip39,
  bip325,
  coreDownload,
  coreFiles,
  coreKeyGeneration,
  coreRandom,
  coreRelease,
  descriptors,
  electrumDocs,
  managingWallets,
  offlineSigning,
  psbt,
  sparrowQuickStart,
}
