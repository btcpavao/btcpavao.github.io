# Self-custody curriculum v5.0

The course now starts with information, loss and copies, derives the need for encryption and independent secret recovery, and then develops privacy, attack economics, layered access, geography, computing foundations and spending authority. Thirty new lessons precede the existing foundations, single-wallet practice and advanced laboratory. The course has **128 lessons: 97 required and 31 optional**, in three parts and nineteen required-path milestones.

## Preservation and migration

All 98 existing lesson IDs, slugs, bodies, source notes, practical instructions, code blocks, widgets, prerequisites and verification evidence are preserved. `src/curriculum/v4.3-content-manifest.json` records a SHA-256 hash of the recursively sorted original fields of every lesson, captured from commit `16dc70f` before editing. The regression suite reconstructs those original fields and compares the hashes. Media, comprehension checks and conceptual cross-links extend the existing lessons without replacing their operational instructions.

The existing three-part structure remains. Thirty concepts are inserted before the first original lesson in Part I. The original 27 Part I lessons retain their relative order; the 51 Part II and 20 Part III lessons remain in place. Existing anchors continue to resolve, although displayed lesson numbers in Part I now reflect the expanded order. Existing article links, English learner text, downloadable Core laboratory, search, question form and calculator workflows remain available. (The course language remains English; Croatian legacy bookmarks continue to redirect.)

The v4/v4.1 progress migrations remain in place. A separate v5 snapshot recognizes earned pre-v5 completion without awarding new foundations. The same original completion and checklist keys are used in both modes; understanding checks add a versioned key per stable lesson ID. Mode preference and all progress remain in local storage. Nothing is sent to a server for progression.

## Learning modes

**Guided Learning** is the fresh-session default and is explicitly recommended, including to experienced users. It shows the active lesson and completed history without listing future lessons. Reading/practical confirmations and a correct understanding answer are required before the next required concept is offered. A deep link ahead of the frontier displays the current step and explains how to switch to Open Curriculum. Previously completed lessons remain available. Existing practical completion requirements still apply; a website confirmation is not a technical test of the learner’s wallet.

**Open Curriculum** provides the full existing outline, milestones, search and direct lesson navigation. It renders the same lesson objects and media. Reading paragraphs are available together, while practical exercises retain their established guided step interface. Related-concept links connect foundational reasoning to the actual tutorials and back. Switching modes preserves progress. Returning to Guided Learning resumes the first required concept whose work or understanding check is incomplete.

## Content and visual design

Editable React/SVG diagrams use the existing colors, type, surfaces and focus styles. Compact diagrams have synchronized, expandable text labels for normal-size reading on mobile. The light theme uses the existing stronger button accent for diagram strokes; the dark theme uses its brighter primary accent. Twenty-eight visual families cover copies and shared failures; files and secrets; disclosure; expected payoff; human guessing; entropy; owner burden; three independently adjustable encryption layers; retrieval geography; maintenance artifacts; gold scaling; targeting populations; dedicated environments; volatile sessions; validation; spending thresholds; release evidence; block retention; recovery; value flow; public descriptors; review cycles; distinct threat paths; deterrence; wallet query privacy; and the integrated node/signer/backup architecture. Each retained lesson configures a relevant family with its own procedure or concept path. Existing specialized entropy, attack-cost, backup-media and GPG explorers are preserved.

The layer model distinguishes secret-set entropy from sequential candidate work and shows each layer’s entropy separately. Candidate counts are illustrative and exclude format-specific derivation cost. The attack-payoff inputs are explicitly hypothetical. Wordlist selection distinguishes the requested 7,776-entry example from the previously reviewed 7,772-entry KeePassXC list. Geographic separation is logistical friction, not a Bitcoin-enforced timelock. Increased value changes incentives without increasing key size.

The new content distinguishes the **current GPG-only Vault source candidate** from the older published ISO and preserves the persistent Debian tutorial as its own workflow. The Node source has no accepted ISO at the review date. Neither source review nor successful website checks are described as physical acceptance testing.

## Recording support

Every lesson has a prepared visual sequence, spoken explanation, comprehension question and answer feedback. New concepts have authored demonstrations; retained procedures include recording directions for each actual guided step, expected result and stop condition. The existing `videoUrl` player remains the integration point for supplied recordings. No recordings were supplied or found in the existing lesson data, so the page says they are unavailable and exposes the prepared narration instead. Video playback never gates progress.

## Verification

- Production client/SSR builds and route prerendering.
- ESLint and TypeScript checks through the production build.
- 36 curriculum regressions, including exact preservation of all original lesson fields, schema/media coverage, guided gating, prerequisites, progress migrations, mathematical models and practical boundaries.
- Search, article browsing, question-form and Worker regressions; worker typecheck and deployment dry-run. No real question or email was sent.
- Static asset and internal-link validation across the published route set.
- Browser walkthrough of all 128 lesson screens, wrong/correct answer feedback, narration disclosure, direct links, guided unlocking, correct copying of the displayed lesson link, reload and mode persistence.
- Responsive browser checks at 390 and 320 CSS pixels, plus desktop at 1440; representative screenshots reviewed across every visual family and dark mode.
- Interactive checks for independent-copy loss, three separate layer controls and volatile-session shutdown. Diagram-label bounds and browser errors are checked automatically.

The pull-request workflow now also runs internal-link and browser checks. The browser suite is reproducible with `npm ci`, `npx playwright install chromium`, then `npm run verify:curriculum:browser`. It starts and stops its own Vite server. Optional `CURRICULUM_SCREENSHOTS` saves diagnostic images; `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH` selects an existing Chromium executable. These website tests do not run Core, install Debian, sign transactions or establish physical air-gap integrity. Existing per-lesson practical evidence is retained exactly.

## Remaining production inputs

Actual video recordings need to be produced and assigned to lesson URLs. The separate Vault/Node projects still require their own documented image and hardware acceptance work; this curriculum change does not perform or claim it. Real recovery results depend on the learner completing the preserved disposable exercises and observing their actual outcomes.

## Requirement coverage

| Requested sections | Implemented learning path |
| --- | --- |
| 2–3: pedagogy and navigation | First-principles opening; Guided Learning and Open Curriculum |
| 4–6: information, loss, copying, theft | First five new concepts, then retained wallet/recovery lessons |
| 7–9: encryption, separation, privacy | File-and-secret sequence; existing backup-privacy and GPG practice |
| 10–13: economics and passphrases | Payoff, human guessing, random choices and sufficient entropy; retained KeePassXC generator and cost explorers |
| 14–16: layered protection and recovery | Three layer concepts; existing complete GPG operation and recovery exercise |
| 17–20: deterrence, threats, distance, complexity | Four threat/economics concepts with configurable visuals |
| 21–24: scaling and computing choices | Gold scaling, target concentration, extraction context and dedicated environment; retained Linux and clean-install sequence |
| 25–27: Vault, Core and validation costs | Volatile workspace, release evidence, private local queries and validation friction; retained install/node/recovery tutorials |
| 28: spending authority | Access-versus-authorization concept and preserved multisig/Taproot laboratory |
| 29: actual procedures | Explicit concept-to-practice links; all original operational steps preserved |
| 30–34: visual, video, writing and content model | Shared lesson media model, interactive SVG, comprehension component and honest recording integration |
| 35–37: testing and delivery | Regression preservation manifest, browser walkthrough and this implementation record |

## New lesson inventory

| ID | Lesson | Visual |
| --- | --- | --- |
| `learn-from-first-principles` | Build understanding one idea at a time | learning |
| `bitcoin-is-information` | A copy of the keys is not a copy of the coins | gold |
| `one-file-can-disappear` | One working file is one point of failure | copies |
| `independent-copies` | A thousand copies can share one failure | copies |
| `copies-and-theft` | The copy that rescues you can also expose you | copies |
| `file-and-secret` | Encryption separates an object from its meaning | separation |
| `backup-every-secret` | Ten safes do not replace one lost key | separation |
| `separate-recovery-components` | Do not leave the key in the safe | separation |
| `privacy-of-artifacts` | What does finding the object reveal? | privacy |
| `attack-cost-and-payoff` | An attack has a budget | economics |
| `predictable-human-passwords` | Long does not mean unpredictable | guessing |
| `count-random-choices` | One extra random word multiplies the search | entropy |
| `enough-entropy` | Strength has an operational price | strength-cost |
| `encrypt-an-encrypted-file` | Put another lock around the protected file | layers |
| `layers-need-recovery` | Every new lock creates another loss condition | layers |
| `sequential-layer-attacks` | Two secrets do not guarantee one multiplied attack | layers |
| `privacy-and-deterrence` | An attack can end before it starts | deterrence |
| `theft-collusion-coercion` | Different threats cross different boundaries | threats |
| `distance-as-friction` | Distance can become retrieval time | geography |
| `cost-of-components` | Four artifacts or one thousand? | complexity |
| `gold-and-digital-scale` | More value need not mean a bigger container | scaling |
| `target-concentration` | The ocean and the fishing pond | hardware |
| `before-chip-security` | Identification comes before key extraction | hardware |
| `dedicated-environment` | Separate signing from everyday computing | isolation |
| `vault-memory-and-backups` | A RAM session makes backup explicit | vault |
| `core-trust-evidence` | Trust needs evidence you can inspect | trust |
| `validate-without-querying-wallet-service` | Verify locally without handing over the wallet map | wallet-privacy |
| `validation-cost-and-friction` | The wait buys independent verification | blockchain |
| `access-versus-authorization` | Protecting keys and dividing authority are different jobs | policy |
| `connect-reasoning-to-practice` | Now make the reasoning work on real tools | architecture |

## Retained lesson inventory

All rows retain the complete original educational and operational fields. Each receives an authored scenario/check, video directions and a topic-specific visual configuration.

| Part | Stable ID | Lesson | Visual added |
| --- | --- | --- | --- |
| 1 | `0.1` | Self-custody means control and understanding | threats |
| 1 | `0.2` | Write your threat model before choosing a solution | threats |
| 1 | `trust-and-verification` | Make the remaining trust visible | trust |
| 1 | `0.3` | Complexity has a security and economic cost | complexity |
| 1 | `custody-economics` | Bitcoin custody does not scale like a gold vault | economics |
| 1 | `2.1` | Bitcoin Core is a wallet and your own verifier | validation |
| 1 | `own-node` | Verification belongs inside the custody model | validation |
| 1 | `1.3` | Electrum: the trade for an instant start | validation |
| 1 | `ibd-separation` | Initial block download is a feature of sovereignty | blockchain |
| 1 | `core-not-server` | Keep the verification work you have already done | blockchain |
| 1 | `2.5` | One chain, several offline signers | validation |
| 1 | `1.1` | Why this course starts with general-purpose hardware | hardware |
| 1 | `1.5` | Generic hardware, dedicated Debian, Bitcoin Core | isolation |
| 1 | `1.4` | BIP39: a readable root secret and its backup consequences | separation |
| 1 | `signet-entropy-deep-dive` | Where Core gets its wallet secrets | entropy |
| 1 | `1.2` | Sparrow case study: a valid checksum is not good randomness | trust |
| 1 | `software-continuity` | Choose recovery dependencies for 20, 40 or 80 years | maintenance |
| 1 | `core-development` | What this foundation cannot do for you | trust |
| 1 | `why-linux` | Linux is something you can learn | isolation |
| 1 | `why-debian-stable` | Why Debian Stable | isolation |
| 1 | `linux-playground` | Install Linux and make it yours | isolation |
| 1 | `ai-as-a-tutor` | AI is a tutor, not a root of trust | trust |
| 1 | `linux-make-it-yours` | Make one change you understand | isolation |
| 1 | `software-responsibility` | Freedom creates responsibility | trust |
| 1 | `start-clean` | Start clean | isolation |
| 1 | `what-verification-proves` | What exactly am I verifying? | trust |
| 1 | `foundations-checkpoint` | Before practice: explain your chosen foundation | threats |
| 2 | `real-device` | Choose one dedicated computer for practice | hardware |
| 2 | `debian-setup` | Install a small, dedicated Debian system | isolation |
| 2 | `signet-install-verify` | Download Core and check that it is the intended release | trust |
| 2 | `signet-why` | Practice with test coins first | blockchain |
| 2 | `signet-vs-mainnet` | Check whether you are using test coins or real bitcoin | blockchain |
| 2 | `signet-start` | Open Core on the Signet practice network | blockchain |
| 2 | `2.3` | Keep every block or save disk space with pruning | blockchain |
| 2 | `signet-first-wallet` | Create a wallet used only for practice | separation |
| 2 | `passphrase-strength` | How strong does my wallet passphrase need to be? | entropy |
| 2 | `brute-force-economics` | Explore the cost of guessing | economics |
| 2 | `generate-passphrase` | Generate the passphrase with KeePassXC | entropy |
| 2 | `signet-encrypt-new-backup` | Protect the test wallet with a password and back it up | separation |
| 2 | `signet-receive-send` | Receive test coins and send a small payment to yourself | transaction |
| 2 | `coin-control-fees` | Choose coins, fees and the final transaction deliberately | transaction |
| 2 | `signet-restore` | Rebuild the test wallet from its backup | recovery |
| 2 | `signet-transact-again` | Prove that the restored wallet can send | recovery |
| 2 | `wallet-lock-change` | Lock, unlock and change the wallet passphrase | separation |
| 2 | `basic-rpc` | See what the GUI is asking Core to do | maintenance |
| 2 | `repetition-drills` | Repeat until the wallet lifecycle feels ordinary | maintenance |
| 2 | `signet-readiness` | Check that you completed the whole practice cycle | maintenance |
| 2 | `2.6` | Find the wallet data that needs a backup | separation |
| 2 | `backup-redundancy-freshness` | Keep backups separate and up to date | copies |
| 2 | `encrypted-backup-privacy` | Understand what an encrypted backup still reveals | privacy |
| 2 | `backup-media` | Choose backup media by failure mode | copies |
| 2 | `recovery-failure-drills` | Recover after losing the local wallet or a backup device | recovery |
| 2 | `backup-mastery` | Checkpoint — prove backup and recovery | recovery |
| 2 | `one-wallet-mastery` | Mastery checkpoint — I can operate one Core wallet | maintenance |
| 2 | `architecture-choice` | Separate the jobs you already know | validation |
| 2 | `2.4` | How the online computer and offline signer work together | validation |
| 2 | `2.8` | Three wallet roles you will encounter | validation |
| 2 | `ops-malware` | Transfer payment files safely between the computers | isolation |
| 2 | `ops-physical` | Know when physical tampering means you should stop | threats |
| 2 | `offline-device` | Prepare the offline signer and check it after shutdown | isolation |
| 2 | `watch-only-setup` | Connect the wallets using public descriptors | descriptor |
| 2 | `offline-psbt` | Build online, sign offline, return and broadcast | transaction |
| 2 | `offline-recovery` | Replace both computers and repeat the payment | recovery |
| 2 | `ops-documentation` | Write a recovery guide someone else can follow | maintenance |
| 2 | `offline-mastery` | Before maintenance: operate without the original signer | recovery |
| 2 | `ops-routine` | Review the custody system every year | maintenance |
| 2 | `ops-inheritance` | Make recovery understandable to another person | recovery |
| 2 | `single-sig-mastery` | Master the simple system before adding a spending policy | maintenance |
| 2 | `optional-veracrypt` | Practise GPG backup encryption and optional layers | layers |
| 2 | `move-to-real-bitcoin` | Move to real Bitcoin — deliberately | maintenance |
| 2 | `mainnet-separate-wallet` | Start a new wallet for real bitcoin | separation |
| 2 | `real-encryption` | Create the real wallet and its password offline | separation |
| 2 | `real-restore` | Restore the empty real wallet before depositing | recovery |
| 2 | `mainnet-readiness` | Check the setup before a small real-bitcoin test | maintenance |
| 2 | `mainnet-small-test` | Send a small real payment from the restored wallet | transaction |
| 2 | `node-migration` | Reuse your own block files and rebuild validation state | blockchain |
| 2 | `optional-tails` | Optional: use Tails as the offline operating system | isolation |
| 2 | `architecture-path-a` | Optional: keep a small spending wallet online | isolation |
| 3 | `multisig-why` | Multisig is a spending policy, not a backup strategy | policy |
| 3 | `multi-vendor-cost` | Count the cost of three vendor ecosystems | complexity |
| 3 | `complex-simple` | Write the policy in ordinary language first | policy |
| 3 | `lab-method` | Make a reproducible, disposable experiment | maintenance |
| 3 | `lab-regtest` | Run the Core 31.1 laboratory | blockchain |
| 3 | `lab-rpc` | Use RPC only when you need its precision | maintenance |
| 3 | `2.2` | Separate node state from wallet state in RPC | blockchain |
| 3 | `lab-descriptors` | Read and verify a descriptor | descriptor |
| 3 | `lab-psbt` | Inspect the PSBT before adding signatures | transaction |
| 3 | `multisig-signet` | Build and spend a 2-of-3 policy | policy |
| 3 | `multisig-backup` | Back up the policy as well as the keys | recovery |
| 3 | `multisig-failures` | Test the missing-signer cases | recovery |
| 3 | `complexity-after-the-lab` | Did the extra signers earn their place? | complexity |
| 3 | `taproot-model` | Taproot is an output format, not an automatic quorum | policy |
| 3 | `taproot-descriptors` | Inspect a Taproot descriptor and its actual spending authority | descriptor |
| 3 | `timelocked-recovery` | Add a delayed recovery path only when you mean it | policy |
| 3 | `taproot-path-tests` | Test every permitted path and every intended rejection | policy |
| 3 | `advanced-mastery` | Before adopting a policy: justify and recover it | policy |
| 3 | `core-explorer` | Optional: Core Explorer as an advanced interface | validation |
| 3 | `lab-community` | Ask a technical question without exposing a wallet | privacy |
