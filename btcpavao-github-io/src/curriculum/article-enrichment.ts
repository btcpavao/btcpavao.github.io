import type { PlayerLesson } from "../bitcoin-core-curriculum-player-en-data"

const essay = (slug: string) => `/en/bitcoin-core/${slug}/`
const sources = {
  economic: {
    label: "Hardware Wallets Are an Economic Security Failure",
    url: essay("hardware-wallets-are-an-economic-security-failure"),
  },
  simpler: {
    label: "Bitcoin Self-Custody Got Weird. It’s Time to Simplify It.",
    url: essay("bitcoin-self-custody-got-weird"),
  },
  authority: {
    label: "Single-Sig and Multisig from First Principles",
    url: essay("single-sig-and-multisig-from-first-principles"),
  },
  detour: {
    label: "The Hardware Wallet Detour",
    url: essay("the-hardware-wallet-detour"),
  },
  backup: {
    label: "We Made Bitcoin Self-Custody Harder Than It Had to Be",
    url: essay("we-made-bitcoin-self-custody-harder-than-it-had-to-be"),
  },
  gpg: {
    label: "GPG backup guide: independent layers and macOS graphical workflow",
    url: `${essay("wallet-setup-backup-recovery")}#optional-backup-protection`,
  },
  images: {
    label: "Coming soon: dedicated Debian images and curriculum integration",
    url: essay("debian-images"),
  },
}
type Addition = {
  notes?: string[]
  reading?: (keyof typeof sources)[]
  image?: string
}

// Additive reading revision: stable lesson IDs, practice steps and completion
// requirements remain intact. This is not a new practical-validation claim.
export const articleEnrichment: Record<string, Addition> = {
  "0.2": {
    notes: [
      "Separate the probability of becoming a target from the difficulty of compromising your chosen device. A product purchase, customer record or public disclosure may identify a likely Bitcoin owner before any technical attack begins. Ask what an attacker knows about you, how they learn it, and what gain makes the effort worthwhile.",
    ],
    reading: ["economic"],
  },
  "0.3": {
    notes: [
      "Count attention as well as equipment. Three unfamiliar update procedures, three backup formats and a recovery process you avoid rehearsing consume a finite maintenance budget. Compare the extra threat covered by a layer with the extra opportunities for mistakes over the whole life of the setup.",
    ],
    reading: ["authority", "detour"],
  },
  "custody-economics": {
    notes: [
      "A useful simplified attacker model is expected recoverable reward multiplied by probability of success, minus the cost of the attempt. The reward is what that attack could actually reach, not automatically the total value stored by every customer. A product category that concentrates likely targets can change the calculation. This is a way to reason about incentives, not a measured forecast of any particular attack.",
    ],
    reading: ["economic"],
  },
  "1.1": {
    notes: [
      "Distinguish three questions: can an attacker identify likely Bitcoin users, can they get malicious hardware or software to those users, and can the recipient detect it? A clean firmware check answers a narrower question than physical inspection. For each proposed safeguard, name which of these questions it addresses; do not let a check in one layer stand in for all three.",
    ],
    reading: ["economic", "detour"],
  },
  "1.5": {
    image:
      "Three dedicated Debian images are in development: a minimal offline Core signer, Bitcoin Core Vault for wallet creation and GPG backups with optional independent layers, and a dedicated online node without a browser, email client or unrelated everyday applications. They will package the roles taught here; the current lessons continue to use verified Debian and Core installations. Download and verification links will be added here when released.",
    reading: ["simpler"],
  },
  "software-continuity": {
    notes: [
      "A prepared ISO is a convenience, not the only route back to your wallet. Keep the software versions, ordinary Core backup, required credentials and procedure understandable enough to recover on another supported Debian installation if this particular image stops being maintained.",
    ],
    reading: ["backup", "images"],
  },
  "core-development": {
    notes: [
      "Code being public makes inspection possible. It does not tell you who reviewed the relevant path, which release they reviewed or whether a reproducible build matches the image in front of you. Ask for the scope and result of a review. Bitcoin Core's long history is a reason to build on its work, not evidence that every component is infallible.",
    ],
    reading: ["simpler", "detour"],
  },
  "debian-setup": {
    image:
      "Prepared minimal Debian ISOs are coming for the offline signer, Bitcoin Core Vault and online node. The signer is live RAM only; Vault can run live or install its operating system while keeping its private working session in RAM. The online node retains its chain and watch-only data. Until the downloads are available, follow the Debian installation below. The image page explains the software, storage boundaries and independent verification plan.",
  },
  "generate-passphrase": {
    image:
      "The current Bitcoin Core Vault build includes KeePassXC for this job. The forthcoming image does not change the passphrase procedure: select the intended word count and list, generate locally in the prepared offline environment, preserve the exact result separately and prove recovery. The ISO link will be added here when released.",
    reading: ["detour"],
  },
  "backup-redundancy-freshness": {
    notes: [
      "A second encrypted file copy changes redundancy without changing who can authorize a payment. A second required signature changes authorization. Write those two properties on separate lines in your recovery plan. Adding a backup location is not the same decision as adding an independent authority.",
    ],
    reading: ["authority", "backup"],
  },
  "encrypted-backup-privacy": {
    notes: [
      "Treat the wallet file, Core passphrase and every GPG passphrase as distinct recovery objects. I recommend one symmetric GPG layer to protect the entire backup, with additional independent layers only when useful. The encrypted payload hides wallet metadata and internal filenames; the outer filename, size and storage timestamps remain visible. Test all layers and Core restoration on a trusted replacement before relying on them.",
    ],
    reading: ["backup", "gpg"],
    image:
      "The upcoming Bitcoin Core Vault Debian ISO is being redesigned around GnuPG, TAR, Core and KeePassXC. One GPG layer is the default; extra layers use independent passphrases. TAR packages files before encryption, and the design targets authenticated AES-256 OCB with private RAM working storage. The released image will document the tested GnuPG profile and independent recovery. You can practise now with the linked GPG wallet guide.",
  },
  "backup-media": {
    image:
      "The current Vault configuration includes Thunar for files and removable media, Brasero for optical media, and local printing support. Choose media for the failures you need to survive and verify the recorded copy. Tool availability is not a guarantee of media lifetime. Release links and the exact package manifest will be added when ready.",
  },
  "architecture-choice": {
    notes: [
      "The word dedicated refers to what the computer is allowed to do. A general-purpose laptop reserved for Core is different from the same laptop used for browsing, email and arbitrary downloads. The forthcoming node and signer images make that intended separation explicit; they do not create separation if you later mix the roles again.",
    ],
    reading: ["simpler", "images"],
  },
  "2.4": {
    image:
      "A dedicated online-node Debian image is planned for validation, the watch-only wallet, PSBT preparation and broadcast, without a browser, email client or unrelated applications. The separate offline images hold signing keys. The download and verification link for each role will appear here on release.",
  },
  "offline-device": {
    image:
      "The minimal Core offline-signer image will run exclusively as a live RAM session. Bitcoin Core Vault can run live or be installed, but its private home and wallet workspace remain in RAM in both modes. These prepared environments therefore differ from the persistent generic Debian installation below. Export encrypted backups and signed PSBTs to removable media before ending the session, and prove recovery. The image page explains the storage boundaries; ISO links will be inserted here on release.",
  },
  "ops-documentation": {
    notes: [
      "Write which program opens each artifact and in what order: GPG layers in reverse order if used, TAR extraction when present, Core wallet backup, separately recovered Core passphrase, public descriptors for the online watch-only wallet. Record image and software versions, but also describe the ordinary GnuPG/TAR/Core recovery route and every required passphrase. A relative should not have to reconstruct the plan from a pile of devices.",
    ],
    reading: ["backup"],
  },
  "ops-routine": {
    notes: [
      "Review what changed in authority as well as equipment. Has another person become responsible? Can one person now reach several supposed independent signers? Does a new customer-data leak or public disclosure change targetedness? Change the architecture for a concrete reason, rather than treating a price increase alone as a command to add keys.",
    ],
    reading: ["authority", "economic"],
  },
  "real-encryption": {
    image:
      "The planned Bitcoin Core Vault release brings Core, KeePassXC, GnuPG and TAR into an offline environment with a RAM-only private workspace, whether run live or with its operating system installed. Export the encrypted wallet and any other files you need to removable media before shutdown; unsaved session data does not persist. The image is still forthcoming. Release links will appear here alongside the creation, encryption and backup instructions; the empty-wallet restore and small-payment tests remain necessary.",
  },
  "multisig-why": {
    notes: [
      "For two independent owners, 2-of-2 gives either owner a veto: both must approve, and either unavailable key blocks spending. Changing that arrangement to 2-of-3 means any pair can authorize, including the other owner together with the third signer. It removes the original individual's unilateral veto. Choose that change only if it is the authority you intend.",
      "Two copies of the same private key are backups of one authority. Two different keys held by the same person can distribute devices, but do not by themselves create independent human approval. State both the cryptographic threshold and the people who can satisfy it.",
    ],
    reading: ["authority"],
  },
  "multi-vendor-cost": {
    notes: [
      "Do not multiply compromise probabilities as though the signers necessarily fail independently. Shared custody staff, one coordinator, one compromised setup computer, common libraries or overlapping customer records can create correlated failures. Different vendor logos do not establish independence. Name the failure you diversify and the dependencies that remain shared.",
    ],
    reading: ["economic", "detour"],
  },
  "complex-simple": {
    notes: [
      "Compare 'any two of A, B and C' with 'A and B, or A and C'. The first allows B+C to spend without A; the second does not. A plain 2-of-3 threshold cannot express an indispensable A. Write every allowed and forbidden combination before choosing an expression that Core actually supports, and test that expression in Regtest. A diagram of an organization is not yet a tested Bitcoin policy.",
    ],
    reading: ["authority"],
  },
  "multisig-failures": {
    notes: [
      "A+B, A+C and B+C succeeding is also a governance result: any of those pairs can cooperate without the remaining signer. Explain whether that is intended before testing recovery. Losing one signer and distrusting one signer are different events, even when both leave two available keys.",
    ],
    reading: ["authority"],
  },
  "complexity-after-the-lab": {
    notes: [
      "Include the psychological cost in the comparison: do you postpone recovery because the procedure feels intimidating, or depend on one expert to remember its hidden assumptions? Simplicity earns its place when it makes competent operation and recovery repeatable. Complexity earns its place when the additional authority or failure resistance is worth maintaining.",
    ],
    reading: ["authority", "detour"],
  },
}

export function enrichFromArticles(lessons: PlayerLesson[]): PlayerLesson[] {
  return lessons.map((lesson) => {
    const addition = articleEnrichment[lesson.id]
    if (!addition) return lesson
    const readings = [
      ...(addition.reading ?? []),
      ...(addition.image ? ["images" as const] : []),
    ]
    return {
      ...lesson,
      contentUpdated:
        ["1.5", "encrypted-backup-privacy", "ops-documentation", "real-encryption"].includes(lesson.id)
          ? "2026-10-16"
          : lesson.contentUpdated && lesson.contentUpdated > "2026-10-12"
          ? lesson.contentUpdated
          : "2026-10-12",
      notes: [...(lesson.notes ?? []), ...(addition.notes ?? [])],
      sources: [
        ...(lesson.sources ?? []),
        ...Array.from(new Set(readings)).map((key) => sources[key]),
      ],
      callouts: [
        ...(lesson.callouts ?? []),
        ...(addition.image
          ? [
              {
                kind: "important" as const,
                title: "Dedicated Debian images — coming soon",
                body: addition.image,
                url: sources.images.url,
              },
            ]
          : []),
      ],
    }
  })
}
