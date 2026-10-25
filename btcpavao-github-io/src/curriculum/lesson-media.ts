import type { PlayerLesson } from "../bitcoin-core-curriculum-player-en-data"
import type { ConceptVisual, LessonMedia } from "./concept-types"

// One scenario for each retained lesson. Existing lesson bodies and operations stay intact.
// Tuple: prediction, correct answer, plausible misconception, second misconception.
const scenarios: Record<string, [string, string, string, string]> = {
  "0.1": [
    "You own the suggested equipment but cannot recover without it. What is missing?",
    "A demonstrated recovery procedure and understanding of its dependencies.",
    "A more expensive case.",
    "A second brand logo.",
  ],
  "0.2": [
    "You add a component to your plan. What must you be able to explain?",
    "The failure it addresses and the new work it creates.",
    "Only its price.",
    "Only how popular it is.",
  ],
  "trust-and-verification": [
    "A check succeeds. What should you record?",
    "The claim it supports and the trust assumptions still remaining.",
    "That no trust remains anywhere.",
    "That all later checks can be skipped.",
  ],
  "0.3": [
    "A third application adds no named protection. What follows?",
    "Its maintenance and failure burden needs justification before adding it.",
    "More software always means more security.",
    "Its presence creates a new Bitcoin signature requirement.",
  ],
  "custody-economics": [
    "Your balance doubles under the same keys. What changes automatically?",
    "The value exposed; hardware capacity need not double.",
    "The required number of signers.",
    "The size of every private key.",
  ],
  "2.1": [
    "You have a signing key but rely on someone else for transaction status. Which job is missing locally?",
    "Independent validation.",
    "Key creation.",
    "Wallet naming.",
  ],
  "own-node": [
    "What does your own node establish for you?",
    "Which transactions and blocks satisfy the rules it enforces.",
    "Which rules every other user must enforce.",
    "That your private-key backups survive a fire.",
  ],
  "1.3": [
    "A wallet starts instantly using an external index server. What must you examine?",
    "Server trust, query privacy and the client’s verification model.",
    "Only its screen layout.",
    "Whether instant startup creates extra confirmations.",
  ],
  "ibd-separation": [
    "The node is still downloading history. What can you usefully do?",
    "Rehearse empty-wallet backup and preparation while waiting for a current view before payment exercises.",
    "Treat its balance as already current.",
    "Send real savings to avoid waiting.",
  ],
  "core-not-server": [
    "Your old node is pruned. What can its retained block files not provide?",
    "All of the historical blocks it already deleted.",
    "Any already validated block at all.",
    "A list of private-key passwords.",
  ],
  "2.5": [
    "The offline signer has no synchronized blockchain. Can it sign a suitably supplied PSBT?",
    "Yes; it reviews supplied transaction data while the online node provides current chain context.",
    "No; every signer needs its own full archive.",
    "Yes, so it knows independently that inputs remain unspent.",
  ],
  "1.1": [
    "Why choose a dedicated generic computer in this course?",
    "Reduce Bitcoin-specific targeting signals and vendor dependencies while controlling the environment.",
    "Prove every firmware chip harmless.",
    "Safely reuse everyday browser activity for signing.",
  ],
  "1.5": [
    "The same laptop is used for signing and arbitrary downloads. Which design property is lost?",
    "The narrow dedicated purpose.",
    "Its physical ability to run Linux.",
    "The maximum Bitcoin supply.",
  ],
  "1.4": [
    "A plain seed record is copied to another location. What trade-off appears?",
    "Another recovery copy also creates another place that can expose the readable root secret.",
    "Copying creates more coins.",
    "A checksum encrypts the new record.",
  ],
  "signet-entropy-deep-dive": [
    "You change Core’s encryption passphrase. What are you changing?",
    "Protection of wallet key material, not selecting a new human-invented Bitcoin root.",
    "The blockchain’s transaction history.",
    "Every recipient’s address.",
  ],
  "1.2": [
    "A public mnemonic test vector passes a checksum. Is it suitable for savings?",
    "No; syntactic validity does not make publicly known input secret.",
    "Yes; the checksum certifies randomness.",
    "Yes; twenty-four words always prove unpredictability.",
  ],
  "software-continuity": [
    "The original device vendor disappears. What should your recovery plan preserve?",
    "Usable backups, format knowledge, compatible software and instructions.",
    "Only the original product box.",
    "Only a login to the vendor’s website.",
  ],
  "core-development": [
    "You authenticate a Core release. What remains outside that check?",
    "Compromised hardware, operational mistakes and defects in authenticated code.",
    "Whether the archive matches its authenticated checksum.",
    "Whether a verified signature matches its signing key.",
  ],
  "why-linux": [
    "You do not yet understand a Linux operation. What is the useful next action?",
    "Learn and test its effect on disposable material.",
    "Run it as root to avoid learning it.",
    "Copy it into a savings signer immediately.",
  ],
  "why-debian-stable": [
    "Why does this course favor Debian Stable?",
    "Predictable maintenance and a controlled supported environment.",
    "The name guarantees no vulnerabilities.",
    "It removes the need to authenticate software.",
  ],
  "linux-playground": [
    "You want to experiment with desktop changes. Which environment fits?",
    "A disposable learning installation without wallet secrets.",
    "The only working savings signer.",
    "An unknown disk selected by guesswork.",
  ],
  "ai-as-a-tutor": [
    "AI proposes an administration command. What comes before execution?",
    "Explain its flags, scope, evidence and reversal; test in the playground.",
    "Assume fluent wording proves correctness.",
    "Give the model wallet secrets to personalize it.",
  ],
  "linux-make-it-yours": [
    "A desktop preference did not change as expected. What should you do?",
    "Identify the owning component and inspect the result before stacking fixes.",
    "Run every alternative fix at once.",
    "Restart unrelated services without saving work.",
  ],
  "software-responsibility": [
    "A GitHub repository is public. What does this establish?",
    "Inspection is possible, but the hosting location does not certify harmlessness.",
    "The code has automatically been audited.",
    "Every dependency is suitable for a signer.",
  ],
  "start-clean": [
    "You finished the experimental Linux playground. How do you prepare custody?",
    "Preserve needed files and rebuild a verified minimal environment deliberately.",
    "Rename the playground folder Vault.",
    "Install Core on top and assume experiments no longer matter.",
  ],
  "what-verification-proves": [
    "A signature is valid for an unknown key. What is still missing?",
    "Authentication of the signer identity you intend to trust.",
    "Another filename for the archive.",
    "A wallet private key for checking the signature.",
  ],
  "foundations-checkpoint": [
    "What makes the foundation checkpoint meaningful?",
    "Explaining choices and their remaining trust before practical work.",
    "Agreeing with the author without understanding.",
    "Owning all recommended devices.",
  ],
  "real-device": [
    "Which computer suits the first practice stage?",
    "One dedicated supported computer and separate backup storage.",
    "A mainnet signer already holding savings keys.",
    "Any daily machine solely because a scan is clean.",
  ],
  "debian-setup": [
    "You cannot confidently identify the installation destination disk. What next?",
    "Stop before writing and identify it by the actual hardware details.",
    "Select the first disk shown.",
    "Proceed because the installer is authenticated.",
  ],
  "signet-install-verify": [
    "The archive hash matches but the trusted signature fails. What next?",
    "Stop and resolve the authentication failure before running the program.",
    "Run it because one of the checks passed.",
    "Hide GPG warnings by trusting every imported key.",
  ],
  "signet-why": [
    "Why practice a complete payment and recovery cycle with Signet?",
    "Learn the workflow without exposing savings or reusing real secrets.",
    "Test coins guarantee software has no bugs.",
    "A successful exercise automatically tests a later mainnet backup.",
  ],
  "signet-vs-mainnet": [
    "The wallet is named test but chain reports main. Which fact determines the network?",
    "The chain value: this is mainnet.",
    "The wallet label: it must be Signet.",
    "The color of the USB drive.",
  ],
  "signet-start": [
    "When should you treat the online node’s payment view as current?",
    "After confirming the intended network and synchronization.",
    "As soon as a wallet window opens.",
    "Whenever the signer is disconnected.",
  ],
  "2.3": [
    "Does pruning avoid initial historical validation?",
    "No; it deletes older block files after validation.",
    "Yes; it trusts another node’s conclusion.",
    "Yes; it reconstructs private keys instead.",
  ],
  "signet-first-wallet": [
    "You create a practice wallet but have not encrypted and backed it up. What next?",
    "Complete the passphrase, encryption and fresh backup steps before the receipt exercise.",
    "Reuse the same keys for savings.",
    "Treat its local name as its receiving address.",
  ],
  "passphrase-strength": [
    "Which property justifies the random-word entropy calculation?",
    "Independent uniform selection from the specified list.",
    "A phrase being memorable and grammatical.",
    "Adding a familiar year to a quotation.",
  ],
  "brute-force-economics": [
    "You double GPUs under ideal parallel pricing. What happens?",
    "Elapsed time halves while total GPU-hours and rental cost remain approximately unchanged.",
    "Entropy doubles.",
    "The total search cost necessarily halves.",
  ],
  "generate-passphrase": [
    "KeePassXC repeats a word in a randomly generated phrase. What should you do?",
    "Keep the valid random result instead of editing it into a preferred pattern.",
    "Replace it with your favorite word.",
    "Assume repetition proves the generator failed.",
  ],
  "signet-encrypt-new-backup": [
    "After first-time wallet encryption, which backup do you need?",
    "A fresh Core-supported backup reflecting the encrypted wallet and new key state.",
    "Only the pre-encryption snapshot.",
    "A copy of an open database made without Core’s backup operation.",
  ],
  "signet-receive-send": [
    "You send test coins between your own addresses. Why does total balance fall?",
    "The transaction fee is paid even in a self-transfer.",
    "The change belongs to the faucet.",
    "Every output is an additional fee.",
  ],
  "coin-control-fees": [
    "What is the total transaction fee?",
    "Total input value minus total output value, including change.",
    "The value of the recipient payment.",
    "The number shown as fee rate without considering transaction size.",
  ],
  "signet-restore": [
    "The restored wallet shows a familiar balance. What has not yet been proved?",
    "That recovered signing keys and passphrase can authorize a new payment.",
    "That Core can display a balance.",
    "That the wallet has a local name.",
  ],
  "signet-transact-again": [
    "Which wallet must sign to demonstrate backup recovery?",
    "The restored wallet while the original remains unused.",
    "The original wallet because it is familiar.",
    "Any wallet showing the same balance.",
  ],
  "wallet-lock-change": [
    "After changing the active wallet passphrase, what about an older backup?",
    "It retains the old password state; create and test a current backup.",
    "Its password updates remotely.",
    "Its Bitcoin keys are automatically revoked.",
  ],
  "basic-rpc": [
    "Before a wallet RPC, what context must you verify?",
    "The network and explicitly selected wallet.",
    "Only the terminal font.",
    "Only which window was most recently visible.",
  ],
  "repetition-drills": [
    "You can follow a tutorial once but cannot explain a step. What next?",
    "Repeat with test material and resolve that step before relying on the procedure.",
    "Move directly to savings to learn faster.",
    "Add a signer to compensate for uncertainty.",
  ],
  "signet-readiness": [
    "What supports completion of the practice cycle?",
    "Observed creation, encryption, backup, restore and a new payment from recovery.",
    "A checked box without the exercise.",
    "Only obtaining a faucet payment.",
  ],
  "2.6": [
    "Which lost data cannot be replaced by downloading the public chain?",
    "Your private signing information and separately required secrets.",
    "Public block history.",
    "The current network height.",
  ],
  "backup-redundancy-freshness": [
    "You have ten copies made before importing new wallet keys. What is missing?",
    "Freshness: those copies may all lack the imported material.",
    "A larger number of the same old copies.",
    "A more descriptive desktop theme.",
  ],
  "encrypted-backup-privacy": [
    "Why put whole-file encryption around a Core-encrypted backup?",
    "Core protects signing secrets but wallet metadata may still be readable.",
    "Core encryption already hides every byte.",
    "GPG changes the wallet to multisig.",
  ],
  "backup-media": [
    "Two backups are on the same USB. Which failure do they share?",
    "Loss or failure of that USB.",
    "Every failure of all other USBs.",
    "A new Bitcoin consensus rule.",
  ],
  "recovery-failure-drills": [
    "What demonstrates surviving a failed backup device?",
    "Recovering and signing using another planned copy and independently retrieved secrets.",
    "Reading the filename from the failed device.",
    "Using an original wallet left secretly available.",
  ],
  "backup-mastery": [
    "Your drill depends on a password cached on the original machine. What is untested?",
    "Independent recovery of the required secret.",
    "Whether the original can use its cached password.",
    "Whether a filename can be renamed.",
  ],
  "one-wallet-mastery": [
    "Why master one wallet before separating online and offline roles?",
    "So the additional transfer and coordination steps build on understood operations.",
    "Because one wallet cannot be backed up.",
    "Because offline signing avoids understanding recovery.",
  ],
  "architecture-choice": [
    "Can moving an online-used key offline undo its past exposure?",
    "No; create fresh offline keys for the intended new savings setup.",
    "Yes; the file forgets its history.",
    "Yes; changing the filename removes copied keys.",
  ],
  "2.4": [
    "What normally crosses between online and offline roles?",
    "Public address information and PSBT proposals or signed results.",
    "Savings private-key backups and every passphrase.",
    "The offline signer’s entire disk image.",
  ],
  "2.8": [
    "A watch-only wallet is compromised. Which distinction matters?",
    "It may expose activity and manipulate proposals without having signing keys.",
    "It necessarily exposes every private key.",
    "It cannot reveal any financial information.",
  ],
  "ops-malware": [
    "A transfer USB contains an unexpected program. What next?",
    "Do not run it; keep transfers to expected data and investigate.",
    "Run it because the signer is offline.",
    "Install it if its filename mentions Core.",
  ],
  "ops-physical": [
    "You reasonably suspect signer tampering. What should you avoid?",
    "Unlocking on that machine just to test whether it still works.",
    "Preparing a verified replacement.",
    "Keeping known-good backups available.",
  ],
  "offline-device": [
    "The prepared signer needs a missing program after keys exist. What next?",
    "Prepare authenticated software separately or use a prepared replacement without reconnecting the key-holding signer.",
    "Reconnect it briefly because short connections do not count.",
    "Run arbitrary software from the payment USB.",
  ],
  "watch-only-setup": [
    "Which descriptor export belongs on the online coordinator?",
    "Public receive and change descriptors with needed fields, without private keys.",
    "A private descriptor export.",
    "The wallet backup plus its password.",
  ],
  "offline-psbt": [
    "The signer shows an unexplained output or cannot establish the fee. What next?",
    "Stop before signing and resolve every output and fee.",
    "Sign because the online computer prepared it.",
    "Approve if the total looks roughly right.",
  ],
  "offline-recovery": [
    "What makes replacement recovery independent?",
    "Neither original computer supplies a necessary file, secret or signature.",
    "Only renaming the original wallet.",
    "Using the original signer but hiding its window.",
  ],
  "ops-documentation": [
    "What belongs in a private recovery guide?",
    "The procedure and access map, with secrets separately protected.",
    "Every password next to its corresponding ciphertext.",
    "Only the phrase “use my laptop.”",
  ],
  "offline-mastery": [
    "What should you be able to do before maintenance?",
    "Operate and recover using replacement roles without the original signer.",
    "Only open the original application.",
    "Only remember the wallet name.",
  ],
  "ops-routine": [
    "A review finds that recovery works and the secret remains suitably strong. What follows?",
    "Keep the justified setup; unnecessary rotation can add error without solving a new problem.",
    "Rotate all passwords solely because a calendar date arrived.",
    "Stop maintaining backups permanently.",
  ],
  "ops-inheritance": [
    "How do you test whether another person can follow the plan?",
    "Have them recover and sign with disposable test material using the written instructions.",
    "Send them real secrets through this website.",
    "Assume they will infer missing steps later.",
  ],
  "single-sig-mastery": [
    "The tested simple system covers your actual threats. Must you add multisig?",
    "No; further policy complexity needs a specific justification.",
    "Yes, because expertise requires more signers.",
    "Yes, whenever the balance changes.",
  ],
  "optional-veracrypt": [
    "You used GPG A then GPG B around a Core backup. What is the recovery order?",
    "B, then A, then Core’s separate passphrase for signing.",
    "Core, then A, then B.",
    "Either GPG password alone replaces the Core passphrase.",
  ],
  "move-to-real-bitcoin": [
    "Does a successful test-wallet drill validate new savings credentials?",
    "No; the actual fresh setup needs its own independent recovery evidence.",
    "Yes; the software is the same.",
    "Yes; mainnet automatically inherits Signet progress.",
  ],
  "mainnet-separate-wallet": [
    "What distinguishes the new mainnet savings wallet from practice?",
    "Fresh keys, passphrases and backups with separately tested recovery.",
    "Only removing the word Signet from its label.",
    "Reusing the known test password.",
  ],
  "real-encryption": [
    "When should the real private keys be created?",
    "After preparation, in the verified offline environment, with fresh independent secrets.",
    "Before the daily computer is cleaned.",
    "On the public website’s calculator.",
  ],
  "real-restore": [
    "An empty restored wallet recognizes an address. What must also be checked?",
    "The recovered Core passphrase actually unlocks it; actual spending is tested later.",
    "Only its window title.",
    "Whether an online service accepts the private backup.",
  ],
  "mainnet-readiness": [
    "What does the readiness checkpoint permit?",
    "The planned small real-wallet test, not a claim that spending has already worked.",
    "Immediate funding without a recovery spend.",
    "Replacing address verification with a badge.",
  ],
  "mainnet-small-test": [
    "Which event completes the controlled recovery spend?",
    "A confirmed payment signed by the restored offline wallet with the original unused.",
    "Only depositing into the original wallet.",
    "Only exporting an unsigned proposal.",
  ],
  "node-migration": [
    "Can a pruned source supply deleted history for a complete local rebuild?",
    "No; obtain missing history from an appropriate source and validate it.",
    "Yes; chainstate contains every old block.",
    "Yes; wallet.dat stores the whole chain.",
  ],
  "optional-tails": [
    "This optional Tails workflow uses Persistent Storage. What does that mean?",
    "Selected files deliberately survive shutdown and still need independent backups.",
    "Every file disappears at shutdown.",
    "Firmware tampering is automatically removed.",
  ],
  "architecture-path-a": [
    "What risk does an online signing wallet retain when unlocked?",
    "Malware on the online host may misuse keys or capture secrets.",
    "The inability to create any signature.",
    "Mandatory approval by an offline signer.",
  ],
  "multisig-why": [
    "What does a 2-of-3 policy authorize?",
    "Any two designated keys can sign, including a pair excluding the third holder.",
    "Every payment needs all three keys.",
    "Only the original owner can choose which pair works.",
  ],
  "multi-vendor-cost": [
    "What does adding three vendors bring besides device diversity?",
    "Separate firmware, update, recovery and coordination dependencies to maintain.",
    "Automatic independence of every person and location.",
    "Elimination of descriptor backups.",
  ],
  "complex-simple": [
    "Before encoding a spending policy, what should you write?",
    "Who may authorize now and later, and the failures recovery must tolerate.",
    "Only a product shopping list.",
    "Only an assumed universal balance threshold.",
  ],
  "lab-method": [
    "Why make a disposable reproducible lab?",
    "To compare predictions with observed success and failure without real funds.",
    "To certify every production configuration automatically.",
    "To reuse its public test secrets for savings.",
  ],
  "lab-regtest": [
    "All lab signers run on one host. What has this not demonstrated?",
    "Independent physical devices, people and storage locations.",
    "The locally tested policy logic.",
    "That Regtest can generate blocks for testing.",
  ],
  "lab-rpc": [
    "Where do shell helpers and Python snippets in the laboratory belong?",
    "The system terminal, not the Core GUI RPC console.",
    "Any password field.",
    "A wallet receiving-address field.",
  ],
  "2.2": [
    "Which call describes a selected wallet rather than node chain state?",
    "getwalletinfo.",
    "getblockchaininfo.",
    "A public market-price query.",
  ],
  "lab-descriptors": [
    "A descriptor checksum is valid. What does that not establish?",
    "That its authority matches your intent or its keys are recoverable.",
    "That the expression has a checksum.",
    "That Core can parse the checked expression.",
  ],
  "lab-psbt": [
    "What is the distinction between signing and finalizing?",
    "Signing contributes authorization; finalizing assembles the completed spending data.",
    "Both necessarily broadcast immediately.",
    "Finalizing generates missing private keys.",
  ],
  "multisig-signet": [
    "One signature has been added to a 2-of-3 proposal. What is expected?",
    "The payment is not complete until a second required contribution is supplied.",
    "The policy silently becomes single-sig.",
    "The node accepts it because a file was saved.",
  ],
  "multisig-backup": [
    "You preserve two private keys but lose the full policy. What is the risk?",
    "Recovery may lack the descriptor, paths and other information needed to reconstruct spending.",
    "Every multisig wallet can always infer the missing policy.",
    "Passwords reconstruct all omitted public keys.",
  ],
  "multisig-failures": [
    "Which pairs should a 2-of-3 recovery drill test?",
    "A+B, A+C and B+C, plus intended failure cases.",
    "Only the most convenient pair.",
    "Only a single signature on each separate wallet.",
  ],
  "complexity-after-the-lab": [
    "How should extra signing complexity be judged?",
    "By the authority or failure resistance it buys against its observed operational cost.",
    "By how many devices can be displayed.",
    "By whether it makes recovery intimidating.",
  ],
  "taproot-model": [
    "Does a plain tr(KEY) descriptor automatically require several signers?",
    "No; it describes a key path, and all actual spending paths must be examined.",
    "Yes; Taproot always means multisig.",
    "Yes; its name imposes a threshold.",
  ],
  "taproot-descriptors": [
    "Why inspect a Taproot key path as well as any script paths?",
    "A usable key path can provide alternative authority that must be accounted for.",
    "Key paths can never spend.",
    "Only labels determine the spending policy.",
  ],
  "timelocked-recovery": [
    "A relative six-block recovery signature is complete before maturity. Can that alone make the spend acceptable?",
    "No; the input’s age and transaction settings must also satisfy the time condition.",
    "Yes; a signature overrides the delay.",
    "Yes; six blocks means six minutes after opening the wallet.",
  ],
  "taproot-path-tests": [
    "One branch works. What else should be tested?",
    "Every allowed path and intended rejection, including restored keys and any alternate key path.",
    "Nothing; one success proves all branches.",
    "Only whether the descriptor text fits on screen.",
  ],
  "advanced-mastery": [
    "What supports adopting an advanced policy?",
    "A named need, complete recovery records and demonstrated intended successes and failures.",
    "A higher signer count by itself.",
    "Assuming the lab tested arbitrary future policies.",
  ],
  "core-explorer": [
    "An optional interface uses Core as its backend. What follows?",
    "The interface remains additional software and its own review scope matters.",
    "Every request it sends is automatically safe.",
    "Its experimental status disappears.",
  ],
  "lab-community": [
    "How do you ask for help without exposing savings?",
    "Reproduce the issue with disposable data and include versions, expected and observed results.",
    "Upload the real wallet and its passphrase.",
    "Publish the full savings descriptor as a harmless identifier.",
  ],
}

// Topic-specific visual families are configured with each lesson's own operation path.
const visualGroups: [ConceptVisual["kind"], string[]][] = [
  ["threats", ["0.1", "0.2", "ops-physical", "foundations-checkpoint"]],
  [
    "trust",
    [
      "trust-and-verification",
      "core-development",
      "what-verification-proves",
      "signet-install-verify",
      "software-responsibility",
      "ai-as-a-tutor",
      "1.2",
    ],
  ],
  ["complexity", ["0.3", "multi-vendor-cost", "complexity-after-the-lab"]],
  ["economics", ["custody-economics", "brute-force-economics"]],
  [
    "validation",
    [
      "2.1",
      "own-node",
      "1.3",
      "2.5",
      "architecture-choice",
      "2.4",
      "2.8",
      "core-explorer",
    ],
  ],
  [
    "blockchain",
    [
      "ibd-separation",
      "core-not-server",
      "signet-start",
      "2.3",
      "node-migration",
      "2.2",
      "lab-regtest",
      "signet-vs-mainnet",
      "signet-why",
    ],
  ],
  ["hardware", ["1.1", "real-device"]],
  [
    "isolation",
    [
      "1.5",
      "why-linux",
      "why-debian-stable",
      "linux-playground",
      "linux-make-it-yours",
      "start-clean",
      "debian-setup",
      "offline-device",
      "ops-malware",
      "optional-tails",
      "architecture-path-a",
    ],
  ],
  [
    "entropy",
    ["signet-entropy-deep-dive", "passphrase-strength", "generate-passphrase"],
  ],
  ["privacy", ["encrypted-backup-privacy", "lab-community"]],
  [
    "separation",
    [
      "1.4",
      "signet-first-wallet",
      "signet-encrypt-new-backup",
      "wallet-lock-change",
      "2.6",
      "real-encryption",
      "mainnet-separate-wallet",
    ],
  ],
  ["copies", ["backup-redundancy-freshness", "backup-media"]],
  ["layers", ["optional-veracrypt"]],
  [
    "recovery",
    [
      "signet-restore",
      "signet-transact-again",
      "recovery-failure-drills",
      "backup-mastery",
      "offline-recovery",
      "offline-mastery",
      "real-restore",
      "multisig-backup",
      "multisig-failures",
      "ops-inheritance",
    ],
  ],
  [
    "transaction",
    [
      "signet-receive-send",
      "coin-control-fees",
      "offline-psbt",
      "lab-psbt",
      "mainnet-small-test",
    ],
  ],
  [
    "descriptor",
    ["watch-only-setup", "lab-descriptors", "taproot-descriptors"],
  ],
  [
    "policy",
    [
      "multisig-why",
      "complex-simple",
      "multisig-signet",
      "taproot-model",
      "timelocked-recovery",
      "taproot-path-tests",
      "advanced-mastery",
    ],
  ],
  [
    "maintenance",
    [
      "software-continuity",
      "ops-documentation",
      "ops-routine",
      "repetition-drills",
      "signet-readiness",
      "one-wallet-mastery",
      "single-sig-mastery",
      "move-to-real-bitcoin",
      "mainnet-readiness",
      "lab-method",
      "lab-rpc",
      "basic-rpc",
    ],
  ],
]
function visualKind(lesson: PlayerLesson): ConceptVisual["kind"] {
  const found = visualGroups.find(([, ids]) => ids.includes(lesson.id))
  if (!found) throw new Error(`Missing visual direction for ${lesson.id}`)
  return found[0]
}

export function addLessonMedia(
  lesson: PlayerLesson
): PlayerLesson & LessonMedia {
  if (lesson.visual && lesson.understanding && lesson.videoScript)
    return lesson as PlayerLesson & LessonMedia
  const scenario = scenarios[lesson.id]
  if (!scenario)
    throw new Error(`Missing authored lesson scenario: ${lesson.id}`)
  const [prompt, correct, wrongA, wrongB] = scenario
  const position = [...lesson.id].reduce((n, c) => n + c.charCodeAt(0), 0) % 3
  const answers = [wrongA, wrongB]
  answers.splice(position, 0, correct)
  const labels = lesson.guidedSteps?.map((step) => step.title) ?? [
    lesson.objective,
    lesson.takeaway ?? lesson.summary,
  ]
  return {
    ...lesson,
    visual: {
      kind: visualKind(lesson),
      title: lesson.title,
      caption: lesson.takeaway ?? lesson.summary,
      labels,
    },
    understanding: {
      prompt,
      correct: position,
      options: answers.map((text, i) => ({
        text,
        feedback:
          i === position
            ? correct
            : `Return to the demonstrated boundary: ${correct}`,
      })),
    },
    videoScript: [
      {
        scene:
          "Show the lesson visual in its initial state. Introduce the situation before any application steps.",
        narration: `Let us test this with a concrete situation. ${prompt} Pause before choosing an answer. Think about which information, authority or operation the question actually concerns. We want to understand the boundary, so that a familiar-looking screen does not lead us to the wrong conclusion.`,
      },
      {
        scene:
          "Trace the relevant information or operation in the visual. For practical lessons, demonstrate the existing guided steps with disposable material, including the stated stop conditions.",
        narration: `${correct} That is the distinction to keep in view. ${lesson.why ?? lesson.summary} Follow the information through the illustration and name what each part contributes. Before the next action, predict the result. If the observed result differs, investigate that difference rather than continuing by habit.`,
      },
      ...(lesson.guidedSteps ?? []).map((step) => ({
        scene: `Demonstrate: ${step.title}. ${step.instructions.join(" ")}${step.command ? ` Show the exact command in the stated context: ${step.commandContext ?? ""}. ${step.command}` : ""}`,
        narration: `Before moving on, look for this result: ${step.expectedResult} ${step.warning ?? step.help ?? "Compare what you actually observe with this result before recording the step as complete."}`,
      })),
      {
        scene:
          "Revisit the question, then show the final state and the exact expected result. Leave time for the learner to explain it.",
        narration: `Consider the tempting alternative: “${wrongA}” That would confuse what we have established with something we have not. Explain the correct result in your own words, and connect it to the failure you are trying to prevent. In a practical exercise, record only results you actually observed. The written lesson keeps the detailed procedure available when you need to repeat it.`,
      },
    ],
  }
}
