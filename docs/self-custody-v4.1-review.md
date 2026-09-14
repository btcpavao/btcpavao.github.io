# Self-custody v4.1 — refinement and verification

Review date: 14 September 2026. Baseline: `b47e447eae7c8fd5e39c6b5c454340d7944974a2`, the latest fetched `main` and `origin/main` when work began. The working tree was clean. The existing three parts and v4 editorial decisions are retained. Scope: the English curriculum, its progress/navigation UI, tests and review records. Part I and Part III content is unchanged. No unrelated site content or hosting configuration was changed; `unslop` was not used or restored.

## Learning sequence

Part II now begins with **one dedicated generic Debian computer and one Core wallet**. The learner authenticates Debian and Core, selects Signet, creates and names a wallet, learns passphrase generation, encrypts and backs up, receives and sends, studies coin control and fees, restores and spends again, changes the passphrase and restores again. Repetition explicitly covers:

**CREATE → ENCRYPT → BACK UP → RECEIVE → SPEND → RESTORE → CHANGE PASSWORD → RESTORE AGAIN.**

The receive/send exercise now precedes restoration: the old order asked for a received transaction record before teaching the first receipt. Initial payment confirmation uses the GUI; the unnecessary `listunspent` console step was removed. Restoration checks the recorded receiving transaction rather than promising that receive-request history or labels created after the backup reappear during a rescan.

Backup files, wallet directories, privacy, separate media, old snapshots and loss of the disposable local copy are taught on the same computer. The local-copy drill uses quarantine or recoverable Trash after a clean shutdown; it never requires irreversible deletion. Physical replacement is explicitly reserved for the later offline-recovery exercise.

The new **“Mastery checkpoint — I can operate one Core wallet”**, ID/slug `one-wallet-mastery`, has twelve observable outcomes: authenticated installation; creation/naming without a tutorial; address verification; Signet receipt/spend; encryption; passphrase protection limits; locking/unlocking; passphrase change; backup; restoration and signing; old-backup contents/password state; recovery without the local working copy or one backup medium.

Only after this checkpoint does `architecture-choice` introduce the second dedicated Debian computer. It describes a decomposition of familiar work: the online node verifies history, maintains the wallet view, constructs transactions and broadcasts; the offline signer holds private keys and signs. Fresh practice keys are generated after isolation, because moving formerly online keys cannot erase their prior exposure. The subsequent steps teach public descriptors, watch-only coordination, PSBT transfer/review/signing/finalization/broadcast, and replacement recovery. Every required Stage B lesson has the new checkpoint as an ancestor.

The complete before/after position table is below. Existing IDs and URL slugs are preserved, including the architecture-choice bookmark.

## KeePassXC default and verified implementation

The default is **KeePassXC on the clean dedicated Debian environment**, using its bundled large list directly. The normal generator does not require creating a password database. GUI steps: Tools → Password Generator → Passphrase → `(SYSTEM) eff_large.wordlist` → eight words → lower case → one space → Generate. A password database is optional storage with its own recovery dependency.

Verified target: Debian 13 Stable (trixie), amd64, **`keepassxc-minimal 2.7.10+dfsg1-1`**, linked to **`libbotan-2-19 2.19.5+dfsg-4`**. Debian's `keepassxc` package is transitional; the explicitly selected minimal package includes the generator without the optional integration plugins. The earlier v4 macOS 2.7.12 inspection is not mislabeled as verification of the Debian version.

Downloaded and extracted the official Debian source and binary packages, inspected their packaging patches, the generator implementation, Qt GUI source, the packaged wordlist, Botan's generated build header and the library's identifying strings. The upstream 2.7.10 `Random.cpp`, `PassphraseGenerator.cpp` and wordlist were separately downloaded and found byte-identical to the inspected Debian source files. [Machine-readable package hashes and calculations](self-custody-v4.1-keepassxc-evidence.json) record this evidence.

### Separate post-draft claim check

| Published claim | Primary evidence checked after drafting | Result and boundary |
|---|---|---|
| The supported Stable package is 2.7.10+dfsg1-1 | [Debian package](https://packages.debian.org/trixie/keepassxc-minimal), extracted source and amd64 binary | Confirmed for this review date; maintained future updates need their own exact-version comparison. |
| KeePassXC uses Botan's system RNG in this build | [Random.cpp, tag 2.7.10](https://github.com/keepassxreboot/keepassxc/blob/2.7.10/src/crypto/Random.cpp), Debian Botan `build.h` | `BOTAN_HAS_SYSTEM_RNG` selects `Botan::System_RNG`. This is not a claim about every platform/build. |
| This Debian Botan build reads `/dev/urandom` | [Botan 2.19.5 source](https://github.com/randombit/botan/blob/2.19.5/src/lib/rng/system_rng/system_rng.cpp), [Debian library](https://packages.debian.org/trixie/libbotan-2-19), extracted build header and library strings | `BOTAN_TARGET_OS_HAS_DEV_RANDOM` and `BOTAN_SYSTEM_RNG_DEVICE "/dev/urandom"`; no `BOTAN_TARGET_OS_HAS_GETRANDOM`. The library contains `/dev/urandom` and the device-read failure strings. Source/configuration inspection, not a Linux runtime syscall trace. |
| Linux supplies cryptographic pseudorandom bytes seeded from collected entropy | [Linux random(4)](https://man7.org/linux/man-pages/man4/random.4.html) | The lesson assumes normally booted physical Debian with initialized kernel randomness. The device path does not itself wait for initial seeding like `getrandom`; the early-boot limitation is explicit in technical details. |
| Word selection is uniform given uniform input bytes | [PassphraseGenerator.cpp](https://github.com/keepassxreboot/keepassxc/blob/2.7.10/src/core/PassphraseGenerator.cpp), `Random::randomUInt` | A new index is drawn for each word, with replacement. The upper tail of a 32-bit draw is rejected before modulo reduction: 4,294,962,640 accepted values, 552,620 per index, 4,656 rejected. Arithmetic rechecked independently in Python and JavaScript. |
| The bundled list has 7,772 distinct words | [Tagged wordlist](https://github.com/keepassxreboot/keepassxc/blob/2.7.10/share/wordlists/eff_large.wordlist), actual `/usr/share/keepassxc/wordlists/eff_large.wordlist` extracted from the Debian package | 7,772 lines, 7,772 distinct entries, still 7,772 after lowercase conversion; source and binary-package bytes match. SHA-256 `df895130803573b14caa684e8cba982a9ed21f4898c98c711f204acf600efedd`. |
| The stated GUI controls exist in the supported version | Debian source `MainWindow.ui`, `PasswordGeneratorWidget.cpp/.ui` | Generator, Passphrase, `(SYSTEM)` list prefix, case/word-count/separator and generation controls inspected. The source default is seven words; the course explicitly selects eight. No physical Debian GUI execution is claimed. |
| Eight words are a default, not a cryptographic minimum | Course recommendation, with transparent arithmetic and attack assumptions | An editorial/economic choice, not a measured universal threshold. More words increase search space but can add recovery cost after the practical margin is already enormous. |
| Dice are optional and can be strong when correctly used | [EFF dice guidance](https://www.eff.org/dice), [original EFF list](https://www.eff.org/files/2016/07/18/eff_large_wordlist.txt) | Five ordered six-sided readings select one of 7,776 words. Eight words need 40 readings. The recommendation against routine dice concerns operational cost, not a claim that fair dice are insecure. |
| Old encrypted backups retain their own password state and restored keys can sign | Unchanged official Core 31.1 laboratory rerun for v4.1 | Actual isolated Regtest operations. These do not certify a physical air gap or a funded Signet/mainnet exercise. |

The simple CSPRNG explanation is part of the required passphrase reading, not only the optional technical disclosure. The first-principles recommendation is explicit: Core already depends on trustworthy computer-generated randomness for wallet keys. A reviewed generator on the same prepared system uses that existing foundation with fewer manual operations. Dice do not repair a malicious operating system. Physical inspection and all other v4 boundaries remain intact.

## Entropy and economic intuition

All default calculations now use `n × log2(7772)` and `7772 ** n`. The original EFF count remains available explicitly for the optional dice path.

| Independent words | Bits, recalculated | UI rounded value |
|---:|---:|---:|
| 1 | 12.924070185585345 | 12.92 |
| 5 | 64.62035092792672 | 64.62 |
| 6 | 77.54442111351207 | 77.54 |
| 8 | 103.39256148468276 | 103.39 |

The original EFF list yields 103.39850002884624 bits for eight words, a difference of about **0.00594 bits**. No custom download/import is required to obtain that negligible difference. The table and calculator offer one, five, six and eight words; twelve/twenty-four remain additional calculator comparisons. Very short illustrative times are displayed in seconds. Fixed separators add no entropy.

The copy describes compute, energy, equipment/time and opportunity cost; average versus full search and electricity versus rental remain separate. Defaults are hypothetical, not a Core cracking benchmark. A $100,000/$101,000 comparison is explicitly rejected as an inadequate margin. Future purchasing power, compute and attack-tool changes motivate review. The calculator teaches intuition, not fear-driven maximum word counts.

The new `optional-dice` lesson explains legitimate unusual threats or educational/research purposes, ordered rolls, lookup and recording, transcription costs, and test restoration. It is placed with optional extensions and cannot block any required milestone. Tails, VeraCrypt, pruning detail, mainnet exercises and all Part III policies remain outside required completion.

Maintenance asks about BTC balance/purchasing power, changed threats, compute and attack tools, recovery difficulty, whether the margin remains very large, readable backups and demonstrated restoration. A justified passphrase change includes new backups, restoration/signing tests and review of old snapshots. There is no calendar-driven password churn.

## Ten milestones and preserved progress

Part I retains its three chapters as milestones; Part II has seven:

1. Begin with the threat — 4 required steps.
2. Verify for yourself — 6.
3. Choose the foundation — 8.
4. Prepare Debian and Core — 6 (pruning detail is optional).
5. Operate one Core wallet — 12.
6. Prove backup and recovery — 7, including the new one-wallet checkpoint.
7. Separate node and signer — 6.
8. Complete an offline payment — 2.
9. Recover without the originals — 3.
10. Maintain the setup — 3.

The overview and desktop/mobile navigation primarily display **milestones completed out of ten**, with expandable step counts inside each. No lessons were removed. Total content is 87 lessons (18 / 50 / 19), with 57 required steps. Part III adds zero required milestones. At the final checkpoint, the learner is explicitly told that a tested single-sig setup covering their actual threats can be the finished system. The completion message requires all required steps, so retained historical credit alone does not announce v4.1 completion.

Storage keys and existing v4 check IDs remain. A frozen manifest records the 85 v4 lessons' actual prerequisites and checks. On the first v4.1 visit, only completion backed by those checks receives retained credit; bare legacy marks do not. New visitors receive an empty migration snapshot. The old evidence is revalidated whenever a result is withdrawn. No existing completion marks, checks or last-lesson bookmarks are erased by migration.

A fully completed v4 fixture retains 80 immediately effective lesson completions. Five revised lessons require additional evidence: `architecture-choice`, `passphrase-strength`, `brute-force-economics` (new reading), `generate-passphrase` (new bundled KeePassXC action), and `repetition-drills` (the complete repeated lifecycle). Existing checks within those lessons remain. The new one-wallet checkpoint is not automatically certified. Previously completed later work stays credited while the resume action points to the earliest missing required step. Retained lessons with new prerequisites explain that the earlier work is saved.

All 85 existing English slugs and IDs and 64 retired Croatian bookmark redirects are covered by automated checks. The live course remains English-only.

## Verification and practical limits

- Existing baseline: 17 curriculum checks passed before edits.
- v4.1: 22 automated checks cover sequencing, all URLs, gates, optional paths, ten-milestone accounting, partial/full progress, retained-v4 evidence, revocation, source/review boundaries and entropy/cost arithmetic.
- `npm run lint`, TypeScript/production client build, SSR/static route build and `npm run verify:assets` pass. The existing SSR mixed-import warnings remain non-fatal.
- The unchanged Core 31.1 Regtest laboratory was rerun with explicit temporary directories and no peer networking. All **52 checks passed**: [v4.1 Regtest results](self-custody-v4.1-regtest-results.json).
- Browser review covers expanded/collapsed milestones, selecting a lesson, saved v4 reading credit after reload, disabled prerequisite gates, calculator one/eight-word selection and optional navigation. Desktop 1440×1000, mobile 390×844 and narrow 320×780 are checked. Escape closes the mobile drawer and restores focus. The visual review fixed inherited `min-height: 100%` on nested roadmap buttons; step rows now use 24 px desktop and 16 px mobile padding.
- Package/source inspection establishes the reviewed implementation and packaged wordlist, not a physical Debian installation, hardware RNG attestation, desktop seeding audit, funded Signet/mainnet transaction or long-term media lifespan. The previous v4 review remains the source for the original 16 advanced command-block replays; those unchanged blocks were not separately replayed in this refinement.

## Publication

The production destination remains [btcpavao.com/en/bitcoin-core/self-custody/](https://btcpavao.com/en/bitcoin-core/self-custody/), through the existing `main` → Deploy Pages workflow. Deployment and live checks are completed after the final production artifact review; the final handoff supplies the resulting commit/run.

## Exact Part II position map

Position changes caused by inserting/reordering lessons are listed even when their content is otherwise retained.

| Lesson ID | v4 position | v4.1 position | Milestone / group |
|---|---:|---:|---|
| `real-device` | 2 | 1 | Prepare Debian and Core |
| `debian-setup` | 3 | 2 | Prepare Debian and Core |
| `signet-install-verify` | 4 | 3 | Prepare Debian and Core |
| `signet-why` | 5 | 4 | Prepare Debian and Core |
| `signet-vs-mainnet` | 6 | 5 | Prepare Debian and Core |
| `signet-start` | 7 | 6 | Prepare Debian and Core |
| `2.3` | 8 | 7 | Prepare Debian and Core |
| `signet-first-wallet` | 9 | 8 | Operate one Core wallet |
| `passphrase-strength` | 10 | 9 | Operate one Core wallet |
| `brute-force-economics` | 11 | 10 | Operate one Core wallet |
| `generate-passphrase` | 12 | 11 | Operate one Core wallet |
| `signet-encrypt-new-backup` | 13 | 12 | Operate one Core wallet |
| `signet-receive-send` | 16 | 13 | Operate one Core wallet |
| `coin-control-fees` | 17 | 14 | Operate one Core wallet |
| `signet-restore` | 15 | 15 | Operate one Core wallet |
| `signet-transact-again` | 18 | 16 | Operate one Core wallet |
| `wallet-lock-change` | 14 | 17 | Operate one Core wallet |
| `repetition-drills` | 19 | 18 | Operate one Core wallet |
| `signet-readiness` | 20 | 19 | Operate one Core wallet |
| `2.6` | 21 | 20 | Prove backup and recovery |
| `backup-redundancy-freshness` | 22 | 21 | Prove backup and recovery |
| `encrypted-backup-privacy` | 23 | 22 | Prove backup and recovery |
| `backup-media` | 24 | 23 | Prove backup and recovery |
| `recovery-failure-drills` | 26 | 24 | Prove backup and recovery |
| `backup-mastery` | 27 | 25 | Prove backup and recovery |
| `one-wallet-mastery` | New | 26 | Prove backup and recovery |
| `architecture-choice` | 1 | 27 | Separate node and signer |
| `2.4` | 28 | 28 | Separate node and signer |
| `2.8` | 29 | 29 | Separate node and signer |
| `ops-malware` | 30 | 30 | Separate node and signer |
| `ops-physical` | 31 | 31 | Separate node and signer |
| `offline-device` | 32 | 32 | Separate node and signer |
| `watch-only-setup` | 33 | 33 | Complete an offline payment |
| `offline-psbt` | 34 | 34 | Complete an offline payment |
| `offline-recovery` | 35 | 35 | Recover without the originals |
| `ops-documentation` | 36 | 36 | Recover without the originals |
| `offline-mastery` | 37 | 37 | Recover without the originals |
| `ops-routine` | 38 | 38 | Maintain the setup |
| `ops-inheritance` | 39 | 39 | Maintain the setup |
| `single-sig-mastery` | 40 | 40 | Maintain the setup |
| `optional-dice` | New | 41 | Optional extensions |
| `optional-veracrypt` | 25 | 42 | Optional extensions |
| `mainnet-separate-wallet` | 41 | 43 | Optional extensions |
| `real-encryption` | 42 | 44 | Optional extensions |
| `real-restore` | 43 | 45 | Optional extensions |
| `mainnet-readiness` | 44 | 46 | Optional extensions |
| `mainnet-small-test` | 45 | 47 | Optional extensions |
| `node-migration` | 46 | 48 | Optional extensions |
| `optional-tails` | 47 | 49 | Optional extensions |
| `architecture-path-a` | 48 | 50 | Optional extensions |

## Changed files

- `btcpavao-github-io/scripts/verify-curriculum.mjs`
- `btcpavao-github-io/src/bitcoin-core-curriculum-en.tsx`
- `btcpavao-github-io/src/bitcoin-core-curriculum-player-en-data.ts`
- `btcpavao-github-io/src/components/curriculum-explorers.tsx`
- `btcpavao-github-io/src/components/curriculum-lesson.tsx`
- `btcpavao-github-io/src/components/curriculum-overview.tsx`
- `btcpavao-github-io/src/curriculum-learning.ts`
- `btcpavao-github-io/src/curriculum-math.ts`
- `btcpavao-github-io/src/curriculum-milestones.ts`
- `btcpavao-github-io/src/curriculum-progress-migration.ts`
- `btcpavao-github-io/src/curriculum/part-2.ts`
- `btcpavao-github-io/src/curriculum/v4-progress-manifest.json`
- `btcpavao-github-io/src/index.css`
- `docs/self-custody-v4-audit.md`
- `docs/self-custody-v4-review.md`
- `docs/self-custody-v4.1-keepassxc-evidence.json`
- `docs/self-custody-v4.1-regtest-results.json`
- `docs/self-custody-v4.1-review.md`
