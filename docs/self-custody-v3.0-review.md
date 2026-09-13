# Self-custody curriculum v3.0

Content and source review: 13 September 2026.

Baseline: `c9072026e334031a6a0b5cfa907ac8765cafa8b0`, “Fix curriculum controls and checklists, simplify site header”. The working tree was clean. `git pull --ff-only origin main` completed before edits and reported that main was up to date. The repository, including its existing v2.3 review, was the content baseline. Publication uses the existing main-to-GitHub-Pages workflow. Publishing this content does not change the practical-review status of its lessons.

The English and Croatian curriculum now starts with a threat model and an explicit custody philosophy. The production reference uses two generic dedicated computers with Debian Stable and Bitcoin Core. The online full node has a watch-only savings wallet. The persistent offline signer holds the encrypted private-key wallet and needs neither a blockchain nor network access to sign. Tails follows as an optional architecture.

## Exact changed files

Paths are relative to the repository root. No dependency or lock files changed.

| File | Change |
| --- | --- |
| `btcpavao-github-io/src/curriculum-custody-policy.ts` | New bilingual content revision for threat modelling, philosophy, Debian, verification, physical tampering, recovery and maintenance; primary sources and content-update metadata. |
| `btcpavao-github-io/src/curriculum-revisions.ts` | Required-path ordering, optional Tails lesson, Debian recovery/mainnet procedures and removal of conflicting default instructions. |
| `btcpavao-github-io/src/bitcoin-core-curriculum-player-data.ts` | v3.0, separate content-update field and Croatian base-content alignment. |
| `btcpavao-github-io/src/bitcoin-core-curriculum-player-en-data.ts` | v3.0 and removal of superseded English Tails/default overrides. |
| `btcpavao-github-io/src/bitcoin-core-curriculum-data.ts` | Align Croatian legacy outline with Debian Stable. |
| `btcpavao-github-io/src/bitcoin-core-curriculum-en-data.ts` | Align English legacy outline and sources with the new default. |
| `btcpavao-github-io/src/bitcoin-core-curriculum.tsx` | Croatian page metadata. |
| `btcpavao-github-io/src/bitcoin-core-curriculum-en.tsx` | English page metadata. |
| `btcpavao-github-io/src/components/custody-architecture.tsx` | New shared bilingual architecture diagram with a separate optional Tails disclosure. |
| `btcpavao-github-io/src/components/curriculum-overview.tsx` | Threat-first introduction, shared diagram and updated environment/review metadata. |
| `btcpavao-github-io/src/components/curriculum-lesson.tsx` | Diagram in the architecture lesson; content-update date separate from historical review metadata. |
| `btcpavao-github-io/src/bitcoin-core-wallet-guide.tsx` | Conflicting production recommendations and diagrams aligned; existing basic wallet walkthrough retained. |
| `btcpavao-github-io/src/homepage.tsx` | One conflicting custody recommendation aligned with Debian and optional Tails. |
| `btcpavao-github-io/src/index.css` | Shared diagram, card clearance and long-label navigation overflow fix. |
| `btcpavao-github-io/content/content-registry.mjs` | Curriculum descriptions and content dates; wallet-guide update date. |
| `btcpavao-github-io/scripts/verify-curriculum.mjs` | Retain nine behavioral checks and add four checks for the revised architecture, order, verification sequence and review status. |
| `docs/self-custody-v3.0-review.md` | This review and source ledger. |

`bitcoin-core-start.tsx` was inspected and had no conflicting Fedora/Tails default to replace. Unrelated essays and historical/personal articles remain unchanged.

## Structure before and after

All 63 existing lesson IDs and language-specific slugs survive. There are still six phases. One new optional lesson, `optional-tails`, raises the total to 64. Moving the custody philosophy onto the required path raises required lessons from 29 to 30. Existing browser progress behavior and Signet-first gates remain in place. Fourteen required practical exercises currently await technical review.

| Phase | v2.3 | v3.0 |
| --- | --- | --- |
| Essentials | Roles, two broad risks and Signet; philosophy optional. | Threat model immediately after orientation, then required custody philosophy and Signet. Detailed threats remain expandable. |
| Signet cycle | Verify, create, encrypt, back up, receive/send, restore and send again. | Same cycle, with ten verification steps covering missing Debian tools, contextual shell use, checksums, builder keys, fingerprints and signatures. |
| Offline architecture | Tails/Core persistence was the practical reference signer. | Debian Stable on both roles; physical-tampering response before signer setup; PSBT, independent replacement recovery and successor documentation. Optional Tails follows the default recovery path. |
| Mainnet | Separate keys/backups, empty-wallet recovery and a small operational spend. | Same gates, with persistent Debian paths, offline password-manager preparation and recovery independent of the original signer. |
| Maintenance | General backup, physical-access and recovery guidance. | A dated 3–6 month media check, annual full drill, optional twice-yearly drill, immediate testing after material changes, and separate OS/Core/data/wallet maintenance. Physical-tampering training moves earlier. |
| Optional experiments | Multisig, Taproot and laboratory work. | Retained after the basic recovery cycle. |

The main path continues to show one guided action, an expected result and a checkpoint. Longer explanations, troubleshooting, sources and optional architectures use disclosures. Required drafts remain readable but cannot be marked complete or skipped by guided Next/Resume. A new content date does not establish a new hands-on test.

## Security claims and source ledger

This ledger records a separate check of the drafted content against primary sources. Recommendations and threat-model judgments are identified as such; the sources do not prove that the chosen architecture is universally safest.

| Claim or decision | Type and evidence |
| --- | --- |
| Generic hardware, open-source Linux and Core-only wallet/node/signing software are the production choice. Hardware wallets remain outside this curriculum's production path. | Curriculum philosophy. Bitcoin-specific supply-chain, firmware, vendor, attestation and product assumptions motivate the choice. The description of a more targeted product category is threat-model reasoning, not a measured claim about compromise rates. Hardware wallets can offer useful isolation and simpler operation; a generic Linux computer has a larger general-purpose stack. [HWI](https://github.com/bitcoin-core/HWI) documents the separate hardware-wallet integration ecosystem, not comparative safety. |
| Debian Stable is the default for long-term operational predictability, not inherent or cryptographic superiority to Fedora. Other maintained distributions remain valid alternatives. | Recommendation based on Debian's stable release and support model. [Debian releases](https://www.debian.org/releases/) and [installation guide](https://www.debian.org/releases/stable/amd64/). No fixed Fedora/Core release-frequency claim was added. |
| The online watch-only node constructs the PSBT; the offline signer can review and sign without a blockchain. | Technical fact. [Core offline-signing tutorial, v31.1](https://github.com/bitcoin/bitcoin/blob/v31.1/doc/offline-signing-tutorial.md). The signer reviews transaction data supplied in the PSBT; it does not independently validate the chain or establish current spendability. Public descriptors have privacy implications, and private backups/passwords do not belong on routine PSBT media. |
| An archival node is optional; pruning preserves consensus validation but affects availability of old blocks needed for some rescans. | Technical fact. [Core initialization and pruning options](https://github.com/bitcoin/bitcoin/blob/v31.1/src/init.cpp), [block-manager options](https://github.com/bitcoin/bitcoin/blob/v31.1/src/node/blockmanager_args.cpp) and [functional pruning tests](https://github.com/bitcoin/bitcoin/blob/v31.1/test/functional/feature_pruning.py). A full archival copy is not required for safe wallet operation; document the recovery consequences of discarded history. |
| Hash comparison, signature verification and identification of the signing key are separate checks. Importing a key or seeing “Good signature” does not establish the owner's identity. | Technical fact. [Official Core download and verification instructions](https://bitcoincore.org/en/download/), [guix.sigs builder keys](https://github.com/bitcoin-core/guix.sigs) and [GnuPG Privacy Handbook](https://www.gnupg.org/gph/en/manual.html). Several independently identified builder signatures are checked. This authenticates release bytes relative to trusted keys; it does not prove bug-free software or a clean computer. |
| Minimal Debian may lack verification tools, including curl, git or GnuPG. Prepare authenticated packages while the computer has no wallet secrets. | Procedure grounded in [Debian package management](https://www.debian.org/doc/manuals/debian-reference/ch02.en.html), [Debian media verification](https://www.debian.org/CD/verify) and the [Debian KeePassXC package](https://packages.debian.org/stable/keepassxc). The guide explains a root-account fallback if sudo is absent. Physical reproduction is pending. |
| Tails can reduce persistent OS state but cannot repair malicious firmware, hardware implants or an untrusted computer. | Technical limitation documented in [Tails security warnings](https://tails.net/doc/about/warnings/index.en.html#untrusted_computer). [Offline Mode](https://tails.net/doc/first_steps/welcome_screen/index.en.html) and [Persistent Storage](https://tails.net/doc/persistent_storage/configure/index.en.html) support the optional procedure. Enabling persistence retains selected data; this is not a wholly amnesic wallet workflow. |
| Reasonable suspicion of signer tampering is a reason to stop using it, not to unlock the wallet on it for a test. Replace hardware/environment, restore known-good backups and verify the procedure. Potential key extraction calls for fresh keys and migration. | High-assurance operational recommendation derived from the compromised-environment threat model. The Tails warnings support the limits of software defenses; they do not prescribe this entire response plan. An unattended laptop is not automatically compromised. A compromised signer can capture secrets when unlocked, as also explained in [Core wallet guidance](https://github.com/bitcoin/bitcoin/blob/v31.1/doc/managing-wallets.md). |
| OS, Core executables, blockchain data and wallet data are separate. Normal updates reuse preserved data; migrations, corruption, configuration changes or reindexing can require further work. | Technical model and maintenance recommendation. [Core file layout](https://github.com/bitcoin/bitcoin/blob/v31.1/doc/files.md), [Core 31.1 upgrade notes](https://bitcoincore.org/en/releases/31.1/) and [Debian upgrade procedure](https://www.debian.org/releases/stable/release-notes/upgrading.en.html). The guide does not promise that reindexing or downloading missing blocks can never occur. A signer with keys stays offline during maintenance. |
| Wallet backups and the wallet passphrase are separate recovery requirements. Old backup files are not updated by changing the active wallet's passphrase, and a password change does not revoke extracted keys. | Technical fact. [Core wallet management](https://github.com/bitcoin/bitcoin/blob/v31.1/doc/managing-wallets.md) and [encryption RPC implementation](https://github.com/bitcoin/bitcoin/blob/v31.1/src/wallet/rpc/encrypt.cpp). Encryption of private-key material does not encrypt all wallet metadata. |
| Check media every 3–6 months; complete a recovery drill at least annually, consider twice yearly for high-value/complex setups, and repeat after material changes. | Curriculum recommendation, not an upstream-mandated interval. A filename or readable copy is not proof of full recovery. A drill restores and compares expected wallet data, accesses the passphrase, and completes construction, review, signing and broadcast. Signet exercises do not prove that the actual mainnet backup/password works; that needs separate offline recovery and the existing small-value mainnet test. |
| Recovery must work if the primary operator dies or becomes unavailable. | Curriculum recommendation. The required documentation exercise names a successor and rehearses instructions with Signet artifacts without sharing production secrets. Legal arrangements are outside this technical rehearsal. |

The Core verification commands were compared with the current official workflow: `sha256sum --ignore-missing --check SHA256SUMS`, `git clone https://github.com/bitcoin-core/guix.sigs`, `gpg --import guix.sigs/builder-keys/*` and `gpg --verify SHA256SUMS.asc`. `gpg --fingerprint` supplies the local fingerprints for independent identity checks. The worked archive is Core 31.1 for Linux x86-64; users are told to check the current release and not mix versions. The default signer uses an explicit data directory and both `-networkactive=0` and `-listen=0`, alongside actual OS/hardware disconnection. These Core flags alone do not isolate the operating system.

## Validation performed

Run from `btcpavao-github-io` against the final application changes:

| Command or check | Result |
| --- | --- |
| `npx prettier --write` with the changed TypeScript/TSX files explicitly listed | Passed. Formatting was scoped to changed files. |
| `npm run typecheck` | Passed. |
| `npm run lint` | Passed. |
| `npm run verify:curriculum` | All 13 checks passed. |
| `npm run build` | Passed; 15 public routes plus 404, sitemap and feed prerendered. Existing Vite mixed static/dynamic import warnings remain. |
| `npm run verify:assets` | Passed; 38 responsive image sets and a 336,316-byte entry bundle. |
| `git diff --check` | Passed. |
| Comparison with compiled baseline data in both languages | All 63 original IDs and slugs preserved; no original draft promoted to published or practically verified. |
| Targeted Fedora/Tails search of curriculum, revisions, shared components and adjacent onboarding | No Fedora default or mandatory/default Tails signer remains. Tails implementation details belong to the optional lesson; alternative/trade-off mentions remain intentional. |

The 13 checks include bilingual prerequisite order, optional/required agreement, old progress/checklist handling, practical completion, draft blocking, Next/Resume behavior, transitive invalidation, step keys/actions/results/help, independent recovery before mainnet, threat/philosophy order, default Debian/optional Tails boundaries, verification before execution and separate content/practical-review dates.

The production preview was inspected at 390 × 844 and 1440 × 1000. Reviewed curriculum views included the overview, threat model, release verification, online/offline architecture, Debian signer, physical tampering, recovery cadence and optional Tails in English, with Croatian counterparts for the principal changed procedures. The wallet guide and homepage recommendation were also inspected at both sizes. Every measured document had `scrollWidth === innerWidth`.

The review found and fixed a mobile Previous/Next overflow caused by a long physical-security lesson title. Navigation now remains inside the viewport. The shared diagram has 24px card padding, and desktop prerequisite/result/warning panels have 24px padding. Screenshots confirmed readable card/diagram spacing. Long shell commands scroll within their code block without widening the document. Browser interaction confirmed that draft steps can be read in sequence while completion stays disabled. Temporary viewport overrides were reset after testing.

## Hands-on review still required

These checks did not install Debian, run Bitcoin Core/GPG on the target machines, boot Tails or submit transactions. No lesson was awarded a fresh practical-verification date.

Before promoting the practical drafts:

1. Reproduce the full release-verification procedure on a minimal Debian Stable desktop, including missing packages, the sudo/root alternatives, matching checksums, independent builder identification and meaningful failure outputs.
2. Install and verify Debian on supported physical x86-64 hardware. Test Core/GUI dependencies, password-manager availability, network disconnection across reboot and the explicit Signet data directory before introducing savings keys.
3. Complete the Signet cycle, descriptor/address matching, PSBT review/sign/finalize/broadcast, full shutdown and cold boot. Record the exact software versions, GUI behavior and test transaction IDs.
4. Set aside the original signer and its installed disk. Restore on an independently prepared replacement from backup/password records alone, reproduce the signing workflow and rebuild the watch-only coordinator. Include the chosen pruning/recovery configuration.
5. Rehearse the offline update or replacement method and recovery from real mainnet backup material without connecting the signer. Then perform the existing authorized small-value mainnet deposit/spend exercise before meaningful savings.
6. Test optional Tails separately on supported hardware, including Core binary dependencies, Offline Mode, persistence, cold boot and independent recovery. Its inherited Core 31.1/Tails 7.11 target is not a new compatibility claim. A fully nonpersistent wallet procedure is not supplied by this revision.
7. Have a beginner and the designated successor follow the documented process. A Signet rehearsal should expose missing knowledge, inaccessible passwords and unclear media roles before these matter for recovery.

The upstream Core offline tutorial on the v31.1 tag still contains older version wording and a CLI finalization inconsistency noted in the v2.3 report. This revision retains the existing GUI-oriented PSBT sequence and does not treat the upstream tutorial as evidence of a completed hardware rehearsal.
