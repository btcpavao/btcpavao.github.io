# Self-custody v4.0 — implementation and review

Review date: 13 September 2026. Baseline: `d26266e0e9a498565ae6d082d402aa36b01bc826`, deployed v3.3. Scope: the English self-custody curriculum only. The existing English URLs and all 64 retired Croatian bookmark redirects are preserved. The previously removed `unslop` skill was not used or restored.

## 1. Previous structure and audit

The previous curriculum had 64 lessons in six phases: essentials (13), Signet cycle (15), offline signing (13), mainnet preparation (7), maintenance (2), optional experiments (14). Thirty lessons were required; fourteen required exercises were gated as awaiting practical review. Much advanced content was an outline.

All resolved lessons, guided actions, references, navigation and progress rules were read before implementation. [The pre-implementation audit](self-custody-v4-audit.md) records the proposed architecture and maps every old ID and URL to its destination. Valuable recovery instructions and the earlier source audit were retained. Layered content overrides were replaced with one canonical content file per part.

## 2. Implemented structure

| Part | Purpose | Lessons | Required |
|---|---|---:|---:|
| Part 1 | First Principles — Why Bitcoin Core? | 18 | 18 |
| Part 2 | Master the Simple System — Single-sig Bitcoin Core | 48 | 38 |
| Part 3 | Advanced Spending Policies — Only when the threat model requires them | 19 | 0 |

Total: **85 lessons, 21 new, 56 on the main path**. Part II includes ten optional extensions. All Part III lessons are optional relative to the foundation and are sequenced after single-sig mastery. No mainnet deposit is required to learn advanced policies.

Part I develops threats, complexity costs, gold versus Bitcoin custody economics, independent verification, Electrum history, patience during IBD, node/signer separation, the hardware category argument, generic Debian hardware, BIP39, actual entropy behavior and software continuity.

Part II teaches Debian preparation and release authentication, the GUI wallet lifecycle, passphrase generation and attack economics, repeated restoration, backup-media choices, offline coordination/signing, documentation and maintenance. Optional extensions cover mainnet testing, block migration, Tails, VeraCrypt and a small online spending wallet.

Part III teaches distributed spending authority, operational costs, Core RPC and descriptors, PSBT inspection, real 2-of-3 signing, policy restoration, Taproot key-path signing and a tested delayed Miniscript branch. Core Explorer appears only after advanced mastery.

## 3. Added modules

| Part | Stable ID | Module |
|---|---|---|
| 1 | `custody-economics` | Bitcoin custody does not scale like a gold vault |
| 1 | `software-continuity` | Choose recovery dependencies for 20, 40 or 80 years |
| 1 | `foundations-checkpoint` | Before practice: explain your chosen foundation |
| 2 | `debian-setup` | Install a small, dedicated Debian system |
| 2 | `passphrase-strength` | How strong does my wallet passphrase need to be? |
| 2 | `brute-force-economics` | Explore the cost of guessing |
| 2 | `generate-passphrase` | Generate and record an encryption passphrase |
| 2 | `wallet-lock-change` | Lock, unlock and change the wallet passphrase |
| 2 | `coin-control-fees` | Choose coins, fees and the final transaction deliberately |
| 2 | `repetition-drills` | Repeat until the wallet lifecycle feels ordinary |
| 2 | `backup-media` | Choose backup media by failure mode |
| 2 | `optional-veracrypt` | Optional: put the backup inside an encrypted container |
| 2 | `recovery-failure-drills` | Recover after losing the local wallet or a backup device |
| 2 | `backup-mastery` | Before going offline: prove recovery |
| 2 | `watch-only-setup` | Connect the wallets using public descriptors |
| 2 | `offline-mastery` | Before maintenance: operate without the original signer |
| 2 | `single-sig-mastery` | Master the simple system before adding a spending policy |
| 3 | `multi-vendor-cost` | Count the cost of three vendor ecosystems |
| 3 | `timelocked-recovery` | Add a delayed recovery path only when you mean it |
| 3 | `advanced-mastery` | Before adopting a policy: justify and recover it |
| 3 | `core-explorer` | Optional: Core Explorer as an advanced interface |

## 4. Reused, moved and rewritten content

All 64 former lesson IDs and their English slugs are unchanged. The complete mapping is in the audit linked above. The substantial rewrites include:

- Philosophy and alternatives: threat-first reasoning, cost of complexity, full validation, Electrum, generic hardware, hardware-wallet incidents, BIP39 and Core continuity.
- Wallet practice: GUI-first creation, encryption, backup, restore, receive/send, fee and coin selection; explicit old-backup password behavior and repeated drills.
- Offline workflow: Debian as the signer default, public receive/change descriptors, PSBT review, signing and replacement-machine recovery. The reason for each necessary console operation is explained.
- Advanced outlines: executable Regtest experiments and commands with expected results. The legacy `2-of-3-on-signet` URL now leads to clearly labeled, repeatable Regtest teaching; no funded Signet test is claimed.
- Navigation: three visible parts, collapsible chapters, one reading page or guided action at a time, optional technical details and sources, concrete takeaways, mastery checks and mobile navigation.

## 5–6. Independently checked claims and security sources

The labels below distinguish source facts, observed behavior and the author’s recommendation. A published/source-reviewed lesson is readable and completable through the learner’s declared results. It does not imply that the author physically tested every device or platform. Practical evidence has a separate date and scope in the lesson.

| Claim or decision | Evidence and result | Boundary |
|---|---|---|
| Supported Core release is 31.1 | [Official download](https://bitcoincore.org/en/download/); official macOS ARM archives, manifests, signature verification and RPC version `310100` | Integration tests used that binary, not a mock or an older installed version. |
| Electrum originated in November 2011 under Thomas Voegtlin | [Project history](https://electrum.org/) | No invented precise first-release day. |
| Electrum uses server queries, SPV and exposes wallet-query relationships | [Official FAQ](https://electrum.readthedocs.io/en/latest/faq.html) | Different validation model; no claim that it sends private keys to servers. |
| Trezor Model One officially launched 29 July 2014 | [Trezor’s anniversary history](https://trezor.io/blog/news/a-decade-of-pioneering-10-years-since-trezors-first-hardware-wallet-revolution) | Attributed product-launch date, not an unsupported universal invention claim. |
| BIP39 date, four authors, seed derivation and checksum | [BIP39](https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki), [BIP32](https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki), [BIP380](https://github.com/bitcoin/bips/blob/master/bip-0380.mediawiki) | Correctly generated BIP39 is not called cryptographically broken. It is not the recommended recovery model. |
| Core descriptor-wallet root input is a valid 32-byte generated secret | Core 31.1 [wallet.cpp](https://github.com/bitcoin/bitcoin/blob/v31.1/src/wallet/wallet.cpp), [key.cpp](https://github.com/bitcoin/bitcoin/blob/v31.1/src/key.cpp), [random.cpp](https://github.com/bitcoin/bitcoin/blob/v31.1/src/random.cpp): `GenerateRandomKey` → `CKey::MakeNewKey` → `GetStrongRandBytes`, then extended-key seed derivation | 256 bits describes input size, not the security strength of every Bitcoin primitive. |
| Core uses salted, iterated SHA-512 derivation and AES-256-CBC for wallet encryption | [crypter.cpp](https://github.com/bitcoin/bitcoin/blob/v31.1/src/wallet/crypter.cpp) and [wallet.cpp](https://github.com/bitcoin/bitcoin/blob/v31.1/src/wallet/wallet.cpp); derivation iteration calibration inspected | The calculator does not pretend its guess rate is a measured Core benchmark. |
| First encryption replaces active roots; an old pre-encryption backup misses later addresses | Core source plus actual `encryptwallet`, `listdescriptors`, `restorewallet`, `getaddressinfo` tests | Earlier owned addresses remain owned. A new backup is required. |
| Password changes leave old snapshots protected by their old password | Actual old/new backup restoration, wrong-password rejection, correct unlock and signed payment | A password change does not revoke an already copied private key. |
| GUI passphrase hint and capabilities | [askpassphrasedialog.cpp](https://github.com/bitcoin/bitcoin/blob/v31.1/src/qt/askpassphrasedialog.cpp), [bitcoingui.cpp](https://github.com/bitcoin/bitcoin/blob/v31.1/src/qt/bitcoingui.cpp), actual 31.1 macOS dialogs | Hint: ten or more random characters, or eight or more words. No invented general Unlock Wallet menu. No claim the GUI proves entropy. |
| Current Sparrow import can accept a syntactically valid but predictable mnemonic | Official **Sparrow 2.5.4**, authenticated download; disconnected profile; public zero-entropy 24-word BIP39 test vector accepted through Create Keystore and Import Keystore; [tagged source](https://github.com/sparrowwallet/sparrow/blob/2.5.4/src/main/java/com/sparrowwallet/sparrow/control/MnemonicKeystoreImportPane.java) | Import/checksum case only. No attack on Sparrow’s Generate New randomness, no real funds, no seed vector recommended for use. |
| EFF list size and entropy math | [Original EFF large list](https://www.eff.org/files/2016/07/18/eff_large_wordlist.txt): programmatically counted **7,776 distinct words**; `n × log2(7776)` | 1/5/6/8 words give 12.9248125 / 64.6240625 / 77.5488750 / 103.3985000 bits, conditional on independent uniform selection. |
| KeePassXC’s named list is not byte-identical to original EFF | **2.7.12** official [bundled file](https://github.com/keepassxreboot/keepassxc/blob/2.7.12/share/wordlists/eff_large.wordlist) and installed resource both counted **7,772 distinct words**; generator UI observed; [loader source](https://github.com/keepassxreboot/keepassxc/blob/2.7.12/src/core/PassphraseGenerator.cpp) checked | Course explicitly selects the original EFF list for its 7,776-word calculations. No claim the saved UI word count is a factory default. |
| Core encrypted backup is broader than a root mnemonic but is not whole-file privacy | [Wallet management](https://github.com/bitcoin/bitcoin/blob/v31.1/doc/managing-wallets.md), [file contents](https://github.com/bitcoin/bitcoin/blob/v31.1/doc/files.md), tested backups | Descriptors and snapshot metadata are included; future edits, forgotten passwords and other signers’ secrets are not supplied. |
| Coldcard had affected seed-generation firmware during 2021–July 2026 | [Coinkite advisory](https://blog.coinkite.com/coldcard-mk3-seed-generation-warning/), [firmware repository](https://github.com/Coldcard/firmware), [original technical autopsy](https://wizardsardine.com/blog/coldcard-vuln-deep-dive/) | Firmware integration/randomness failure, not a claim every hardware RNG failed. Firmware updates do not repair already weak seeds. No invented motive for the discovery delay. |
| Ledger customer-data exposure enabled phishing | [Ledger disclosure and response](https://www.ledger.com/blog/update-efforts-to-protect-your-data-and-prosecute-the-scammers) | Customer records, not evidence of device key extraction. |
| Trezor support access on 17 January 2024 enabled direct impersonation | [Trezor’s initial report](https://forum.trezor.io/t/security-alert-update/15204) | Initial report: 40 contacts; no seeds found sent at that point. Not conflated with all later Trezor incidents. |
| BitBox’s marketing provider exposed an identifiable audience in 2022 | [Shift Crypto disclosure and August update](https://blog.bitbox.swiss/en/data-breach-of-marketing-platform-activecampaign/) | ActiveCampaign, not Mailchimp. Subsequent phishing described as likely related. No BitBox02/BitBoxApp compromise claim. |
| Physical inspection is a distinct, costly assurance problem | [Becker et al., CHES 2013](https://www.iacr.org/archive/ches2013/80860203/80860203.pdf) | Demonstrated limits of optical inspection; applies to generic hardware too. No quantitative universal compromise-cost multiplier. |
| One institutional example uses proprietary custody software and HSMs | [Coinbase 2025 Form 10-K, Custodial practices](https://www.sec.gov/Archives/edgar/data/1679788/000167978826000015/coin-20251231.htm) | One named example; does not establish what most large holders use or why a consumer product went unreviewed. |
| Debian installer authentication and first-user sudo behavior | [Media verification](https://www.debian.org/CD/verify), [installer users/passwords](https://www.debian.org/releases/stable/amd64/ch06s03.en.html) | Source review, not a physical installation on the reader’s hardware. |
| Offline signing requires no downloaded chain | [Core offline tutorial](https://github.com/bitcoin/bitcoin/blob/v31.1/doc/offline-signing-tutorial.md), [PSBT documentation](https://github.com/bitcoin/bitcoin/blob/v31.1/doc/psbt.md), actual zero-block signer tests | Network-isolated local processes prove software behavior, not physical isolation. |
| Core supports the taught descriptors and Miniscript policy | [31.1 descriptors](https://github.com/bitcoin/bitcoin/blob/v31.1/doc/descriptors.md), [BIP68](https://github.com/bitcoin/bips/blob/master/bip-0068.mediawiki), [BIP112](https://github.com/bitcoin/bips/blob/master/bip-0112.mediawiki), [Core’s own decay test](https://github.com/bitcoin/bitcoin/blob/v31.1/test/functional/wallet_miniscript_decaying_multisig_descriptor_psbt.py) plus executable tests | Actual 2-of-3, `tr(A)` key path and `wsh` Miniscript delayed recovery. Arbitrary Taproot script trees are not certified by these tests. |
| Own block files can rebuild validation state | [Core files](https://github.com/bitcoin/bitcoin/blob/v31.1/doc/files.md), actual copied-block Regtest reindex with `-assumevalid=0`, same final height/hash and zero peers | Retain `xor.dat`; do not copy wallets or assume a pruned archive contains missing history. |
| Tails and VeraCrypt have extra persistence/recovery dependencies | [Tails limitations](https://tails.net/doc/about/warnings/index.en.html#untrusted_computer), [Persistent Storage](https://tails.net/doc/persistent_storage/configure/index.en.html), [VeraCrypt backup guidance](https://veracrypt.io/en/How%20to%20Back%20Up%20Securely.html) | Optional, source-reviewed paths, not physical tests in this review. |
| Core Explorer is optional and experimental | Author’s local project documentation and authenticated repository-visibility query: private | No private repository URL is published as a working installation link; no audit or public release is claimed. |

The category recommendation, generic-hardware targeting argument, eight-word teaching default, low-time-preference framing and expectation of Core continuity are **authorial security/economic judgments**. They are kept explicit, without pretending to be universal measurements or guarantees.

Unsupported claims deliberately excluded: “nobody held significant funds on Coldcard,” “lack of economic incentive caused the five-year delay,” “all attacks on generic hardware are incomparably more expensive,” “BIP39 itself is cryptographically broken,” and “Core or a storage medium will certainly remain usable for 80 years.”

Link review: 65 unique source/download URLs. 63 returned successful HTTP responses. Trezor’s forum and the SEC returned bot-policy 403 responses to direct HEAD requests; both were retrieved through the research tool and their relevant text checked. These are not labeled dead links.

### Authentication and observed application evidence

The official Core ARM tar archive used for the CLI has SHA-256 `16a097c09fbd7eb78b240ce1dae123663ea2e5e377cfd6a951e71e227e23cf2f`; the GUI archive has `f6e7c185c4b81d5f53fb7471a438f58cc1b55c10c407095afef340e03289b504`. Manifest signature validity was checked for Ava Chow’s key `152812300785C96444D3334D17565732E08E5E41`. Other signer keys not imported in that local check are not counted as verified. The lesson’s stronger multi-builder identity procedure is not labeled as a fully executed local procedure.

Sparrow’s official ARM 2.5.4 DMG has SHA-256 `e8d8637a737480721bc820a1b96a79483fc4c73bc0095f6ce1cfb93637158173`; manifest signature validated against Craig Raw’s fingerprint `D4D0D3202FC06849A257B38DE94618334C674B40`, also checked in the project’s tagged release documentation. It ran in a separate disconnected training profile.

Core GUI observations covered Create Wallet options, encryption wording, Change Passphrase dialog, File backup/restore/PSBT actions, and an actual unsigned-PSBT load → output/fee review → unlock → Sign Tx → Broadcast Tx in private Regtest. Credentials and transactions were disposable public test material. GUI creation/password-change dialogs were inspected and canceled; actual encryption and password changes were tested through the isolated RPC lab. No production wallet was used.

## 7. Preview and visual review

The course retains the site’s visual language. Reading pages and practical steps expose one dominant item at a time; the explanations, errors, expected results and source records remain available without a giant document view.

Reviewed flows: three-part overview, first reading and completion, threat-model practice, passphrase calculator, all seven backup-media choices, mobile chapter drawer, direct link to an advanced gated lesson and long code blocks. Screenshots were inspected at desktop 1440 × 1000, mobile 390 × 844 and narrow 320 × 780. Page scroll width equaled viewport width. Code scrolls within its own block. Mobile explorer padding is 20 px; prerequisite padding is 16 px. Escape closes the drawer and restores focus. Browser console contained no errors or warnings.

Public previews after deployment:

- [Three-part overview](https://btcpavao.com/en/bitcoin-core/self-custody/)
- [First principles](https://btcpavao.com/en/bitcoin-core/self-custody/#lesson/what-self-custody-really-means)
- [Passphrase calculations](https://btcpavao.com/en/bitcoin-core/self-custody/#lesson/passphrase-strength)
- [Interactive attack economics](https://btcpavao.com/en/bitcoin-core/self-custody/#lesson/brute-force-economics)
- [Backup media](https://btcpavao.com/en/bitcoin-core/self-custody/#lesson/backup-media)
- [Executable Core laboratory](https://btcpavao.com/en/bitcoin-core/self-custody/#lesson/regtest-and-failure-scenarios)
- [Delayed recovery](https://btcpavao.com/en/bitcoin-core/self-custody/#lesson/timelocked-recovery)

## 8. Verification

- 17 automated curriculum checks cover all 85 lessons, old URLs, prerequisites, required versus optional paths, reading and practical completion, transitive revocation, versioned progress, source/practical review separation and entropy/cost arithmetic.
- **52 successful real Core integration checks** in the default laboratory run: [machine-readable results](self-custody-v4-regtest-results.json).
- The interactivity run also supplies a reviewed `session.sh`; 16 displayed shell-command blocks were replayed against its test wallets, including early timelock rejection and later accepted broadcast. No real-money network was used.
- `npm run lint`, production TypeScript/Vite/SSR build, and `npm run verify:assets` passed. Existing SSR mixed-import warnings are unchanged and non-fatal. The deployment workflow and production target are linked below; live verification is reported in the final handoff.

## 9. Remaining limits

No known unresolved curriculum build or progression defect remains. This review does **not** certify a physical Debian/Tails installation, physical radio isolation, tamper resistance, long-term media lifespan, funded Signet/mainnet operations or every possible spending policy. These limits are disclosed where the procedure’s review scope is shown. The calculator is an illustration, not a wallet cracking benchmark. Core Explorer has no public installation path at present.

## Required decisions — explicit confirmation

- [x] Debian Stable is the default Linux.
- [x] Debian Stable is also the default offline signer operating system.
- [x] Tails is optional and justified by the threat model.
- [x] Bitcoin Core is the recommended wallet and validating node.
- [x] Hardware wallets are outside the recommended path.
- [x] BIP39 is not the recommended long-term recovery model.
- [x] Single-sig operation and recovery come before multisig.
- [x] Backup redundancy is conceptually separate from distributed spending authority.
- [x] IBD is framed as an investment in sovereignty and verification.
- [x] Offline Core signing, without a synchronized signer, is taught and tested.
- [x] Advanced policies follow GUI fundamentals and mastery checkpoints.
- [x] Core Explorer appears only as an optional advanced interface.
- [x] Complexity is explicitly treated as both a security cost and an economic cost.

## 10. Exact changed files

- `btcpavao-github-io/public/curriculum-labs/core-31.1-regtest.py`
- `btcpavao-github-io/scripts/verify-curriculum.mjs`
- `btcpavao-github-io/src/bitcoin-core-curriculum-en-data.ts`
- `btcpavao-github-io/src/bitcoin-core-curriculum-en.tsx`
- `btcpavao-github-io/src/bitcoin-core-curriculum-player-en-data.ts`
- `btcpavao-github-io/src/components/curriculum-explorers.tsx`
- `btcpavao-github-io/src/components/curriculum-lesson.tsx`
- `btcpavao-github-io/src/components/curriculum-overview.tsx`
- `btcpavao-github-io/src/curriculum-beginner-language.ts` (removed; replaced by canonical part data)
- `btcpavao-github-io/src/curriculum-custody-policy.ts` (removed; replaced by canonical part data)
- `btcpavao-github-io/src/curriculum-learning.ts`
- `btcpavao-github-io/src/curriculum-math.ts`
- `btcpavao-github-io/src/curriculum-revisions.ts` (removed; replaced by canonical part data)
- `btcpavao-github-io/src/curriculum/part-1.ts`
- `btcpavao-github-io/src/curriculum/part-2.ts`
- `btcpavao-github-io/src/curriculum/part-3.ts`
- `btcpavao-github-io/src/index.css`
- `docs/self-custody-v4-audit.md`
- `docs/self-custody-v4-regtest-results.json`
- `docs/self-custody-v4-review.md`

## Deployment

Production target: [btcpavao.com/en/bitcoin-core/self-custody/](https://btcpavao.com/en/bitcoin-core/self-custody/). Publication uses the existing `main` → Deploy Pages workflow, without changing hosting configuration. [Deployment runs](https://github.com/btcpavao/btcpavao.github.io/actions/workflows/deploy.yml) provide the commit and job status; the final handoff confirms the observed live result.
