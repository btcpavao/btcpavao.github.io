import type { LearningRequirements } from "@/curriculum-learning"
import type {
  CurriculumCodeBlock,
  CurriculumLesson,
  CurriculumSource,
  CurriculumStatus,
} from "@/bitcoin-core-curriculum-en-data"
import { part1Lessons } from "@/curriculum/part-1"
import { part2Lessons } from "@/curriculum/part-2"
import { part3Lessons } from "@/curriculum/part-3"

export const CURRICULUM_VERSION = "4.2"
export const CORE_REFERENCE_VERSION = "Bitcoin Core 31.1"
export const SPARROW_REFERENCE_VERSION = "Sparrow 2.5.4"
export const ELECTRUM_REFERENCE_VERSION =
  "Electrum history and server architecture"
export const LAST_TECHNICAL_REVIEW = "2026-09-14"
export const CUSTODY_CONTENT_UPDATED = "2026-09-16"

export const legacyEnglishLessonSlugAliases: Record<string, string> = {
  "sto-self-custody-stvarno-znaci": "what-self-custody-really-means",
  "threat-model-prije-alata": "threat-model-before-tools",
  "sigurnost-je-proces": "security-is-a-process",
  "core-kao-alat-ne-kao-identitet": "core-as-a-tool-not-an-identity",
  "sto-je-bitcoin-core": "what-is-bitcoin-core",
  "tvoj-node-je-prije-svega-vazan-tebi": "your-node-matters-first-to-you",
  "battle-tested-ne-znaci-bez-bugova": "battle-tested-does-not-mean-bug-free",
  "sparrow-flow-i-sigurnosne-pretpostavke":
    "sparrow-workflow-and-security-assumptions",
  "electrum-flow-i-sigurnosne-pretpostavke":
    "electrum-workflow-and-security-assumptions",
  "hardware-wallet-kao-tradeoff": "hardware-wallet-as-a-tradeoff",
  "bip39-kriptografija-i-backup-model": "bip39-cryptography-and-backup-model",
  "prvo-nauci-s-bitcoinima-bez-vrijednosti":
    "learn-first-with-valueless-bitcoin",
  "pokretanje-bitcoin-corea-na-signetu": "start-bitcoin-core-on-signet",
  "prvi-signet-wallet-i-adresa": "first-signet-wallet-and-address",
  "prvi-receive-i-send-na-signetu": "first-signet-receive-and-send",
  "backup-unisti-testno-okruzenje-i-restore":
    "back-up-remove-test-wallet-and-restore",
  "odabir-racunala-i-malware-threat-model":
    "choose-a-computer-and-model-malware-risk",
  "kreiranje-stvarnog-walleta": "create-your-first-mainnet-wallet",
  "enkripcija-i-passphrase": "encryption-and-passphrase",
  "wallet-backup-i-redundancija": "wallet-backup-and-redundancy",
  "restore-na-cistom-testnom-okruzenju": "restore-in-a-clean-test-environment",
  "verification-prije-prvog-mainnet-deposita":
    "verification-before-first-mainnet-deposit",
  "node-wallet-i-blockchain-nisu-ista-stvar":
    "node-wallet-and-blockchain-are-not-the-same",
  "ibd-nije-prepreka-za-ucenje-walleta": "ibd-does-not-block-wallet-learning",
  "wallet-backup-vs-node-podaci": "wallet-backup-vs-node-data",
  "migracija-node-podataka-ili-nova-validacija":
    "migrate-node-data-or-validate-from-scratch",
  "core-nije-ili-server-ili-beskoristan":
    "core-is-neither-a-server-nor-useless",
  "online-node-i-offline-signer": "online-node-and-offline-signer",
  "zasto-signer-ne-treba-blockchain":
    "why-the-signer-does-not-need-the-blockchain",
  "hot-watch-only-i-signing-wallet": "hot-watch-only-and-signing-wallet",
  "priprema-offline-signera": "prepare-offline-signer",
  "prva-offline-potpisana-transakcija": "first-offline-signed-transaction",
  "recovery-drill-bez-originalnog-koordinatora":
    "recovery-drill-without-original-coordinator",
  "redovni-testovi-i-godisnji-recovery-drill":
    "regular-tests-and-annual-recovery-drill",
  "malware-usb-i-provjera-odredista":
    "malware-usb-and-destination-verification",
  "fizicka-sigurnost-i-backup-mediji": "physical-security-and-backup-media",
  "dokumentiraj-proceduru-bez-otkrivanja-tajni":
    "document-the-procedure-without-exposing-secrets",
  "inheritance-i-drugi-ljudi": "inheritance-and-other-people",
  "zasto-i-kada-ne-multisig": "why-multisig-and-when-not-to-use-it",
  "2-of-3-na-signetu": "2-of-3-on-signet",
  "kljucevi-nisu-cijeli-multisig-recovery":
    "keys-are-not-the-whole-multisig-recovery",
  "failure-simulacije": "failure-simulations",
  "taproot-descriptori-i-recovery-artefakti":
    "taproot-descriptors-and-recovery-artifacts",
  "taproot-mentalni-model": "taproot-mental-model",
  "testiranje-svakog-recovery-patha": "test-every-recovery-path",
  "kako-voditi-self-custody-eksperiment":
    "how-to-run-a-self-custody-experiment",
  "rpc-i-cli": "rpc-and-cli",
  "descriptor-eksperimenti": "descriptor-experiments",
  "regtest-i-failure-scenariji": "regtest-and-failure-scenarios",
  "community-pitanja-i-clarifications":
    "community-questions-and-clarifications",
  "enkriptiraj-signet-wallet-i-napravi-novi-backup":
    "encrypt-signet-wallet-and-create-new-backup",
  "odakle-dolazi-privatni-kljuc": "where-the-private-key-comes-from",
  "vise-kopija-nije-isto-sto-i-noviji-backup":
    "more-copies-do-not-mean-a-current-backup",
  "digitalni-i-cloud-backup-privacy-model":
    "digital-and-cloud-backup-privacy-model",
  "instaliraj-i-provjeri-bitcoin-core": "install-and-verify-bitcoin-core",
  "ponovno-poslaji-nakon-signet-recoveryja": "send-again-after-signet-recovery",
  "jednostavni-wallet-ili-offline-signer": "simple-wallet-or-offline-signer",
  "ne-pretvaraj-signet-wallet-u-mainnet-wallet":
    "do-not-turn-signet-wallet-into-mainnet-wallet",
  "mainnet-readiness-prije-prvog-deposita":
    "mainnet-readiness-before-first-deposit",
  "prvi-mali-mainnet-test": "first-small-mainnet-test",
}

export type LessonVerification =
  | "verified"
  | "source-reviewed"
  | "review-required"
  | "planned"
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

export type PlayerLesson = Omit<CurriculumLesson, "status"> &
  LearningRequirements & {
    status: CurriculumStatus
    slug: string
    objective: string
    estimatedTime: string
    verification: LessonVerification
    referenceVersion: string
    lastReviewed?: string
    contentUpdated?: string
    optional?: boolean
    chapter?: string
    takeaway?: string
    widget?: "entropy-table" | "brute-force" | "backup-media"
    sourceReviewed?: string
    practicalReview?: { date: string; scope: string }
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

export const curriculumPhases: CurriculumPhase[] = [
  {
    id: "0",
    slug: "first-principles",
    shortTitle: "First Principles",
    title: "First Principles",
    summary:
      "Understand trust, learn Linux through harmless experiments, then start clean. See why this course chooses Bitcoin Core on dedicated generic hardware.",
    outcome: "Why Bitcoin Core?",
    status: "published",
    estimatedTime: "Understand the foundation",
    lessons: part1Lessons,
  },
  {
    id: "1",
    slug: "master-the-simple-system",
    shortTitle: "Master the Simple System",
    title: "Master the Simple System",
    summary:
      "Practice the wallet lifecycle in the GUI and console, prove backup and offline recovery, then decide whether to move to real bitcoin.",
    outcome: "Single-sig Bitcoin Core",
    status: "published",
    estimatedTime: "Practice over several sessions",
    lessons: part2Lessons,
  },
  {
    id: "2",
    slug: "advanced-spending-policies",
    shortTitle: "Advanced Spending Policies",
    title: "Advanced Spending Policies",
    summary:
      "Experience the work of multisig and recovery in Regtest. Add signers or delayed spending paths only when their benefits justify the operational cost.",
    outcome: "Only when the threat model requires them",
    status: "published",
    estimatedTime: "Optional, after mastery",
    lessons: part3Lessons,
  },
]
export const curriculumLessons = curriculumPhases.flatMap((phase) =>
  phase.lessons.map((lesson, index) => ({
    phase,
    lesson,
    lessonNumber: `${Number(phase.id) + 1}.${index + 1}`,
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
  return (
    lesson.status === "published" &&
    (lesson.verification === "verified" ||
      lesson.verification === "source-reviewed")
  )
}
export const primaryCurriculumLessons = curriculumLessons.filter(
  ({ lesson }) => !lesson.optional
)
