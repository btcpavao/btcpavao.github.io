# Self-custody v4: audit and information architecture

Baseline: `d26266e0e9a498565ae6d082d402aa36b01bc826`, main and origin/main, live v3.3. Existing deployment succeeded before work began. Audit read all 64 resolved lessons, their steps, references, progression logic and rendering. No unrelated site work.

## Before

Six phases: essentials (13), Signet cycle (15), offline signing (13), mainnet preparation (7), maintenance (2), optional experiments (14). Thirty required lessons; fourteen required exercises awaited practical review. Advanced material consisted mainly of outlines. Existing English URLs and 64 retired Croatian bookmark aliases remain valid.

## Proposed architecture, shown before implementation

### Part 1: First Principles — Why Bitcoin Core?

- Begin with the threat: What you will learn, Decide what you need to protect, Good security also depends on what you do, **NEW: custody-economics**.
- Verify for yourself: What Bitcoin Core does, What your own node checks for you, Why we do not mix Electrum and Core recovery methods, What you can practice while the node catches up, Your node does not have to run all day, Why the signer does not download the blockchain.
- Choose the foundation: Why Bitcoin-specific devices attract targeted attacks, Why this course uses ordinary computers and Bitcoin Core, Why your Core backup is a file, not a list of recovery words, How Core creates unpredictable private keys, Why this course uses Core for every wallet task, **NEW: software-continuity**, Widely reviewed software can still have bugs, **NEW: foundations-checkpoint**.

### Part 2: Master the Simple System — Single-sig Bitcoin Core

- Prepare the environment: Choose the two-computer setup used in this course, Choose the computers and label the storage devices, **NEW: debian-setup**, Download Core and check that it is the intended release, Practice with test coins first, Check whether you are using test coins or real bitcoin, Open Core on the Signet practice network, Keep every block or save disk space with pruning.
- Learn the wallet lifecycle: Create a wallet used only for practice, **NEW: passphrase-strength**, **NEW: brute-force-economics**, **NEW: generate-passphrase**, Protect the test wallet with a password and back it up, **NEW: wallet-lock-change**, Rebuild the test wallet from its backup, Receive test coins and send a small payment to yourself, **NEW: coin-control-fees**, Prove that the restored wallet can send, **NEW: repetition-drills**, Check that you completed the whole practice cycle.
- Build a recovery system: Find the wallet data that needs a backup, Keep backups separate and up to date, Understand what an encrypted backup still reveals, **NEW: backup-media**, **NEW: optional-veracrypt**, **NEW: recovery-failure-drills**, **NEW: backup-mastery**.
- Learn offline signing: How the online computer and offline signer work together, Three wallet roles you will encounter, Transfer payment files safely between the computers, Know when physical tampering means you should stop, Prepare the offline signer and check it after shutdown, **NEW: watch-only-setup**, Prepare a payment online and approve it offline, Replace both computers and repeat the payment, Write a recovery guide someone else can follow, **NEW: offline-mastery**.
- Maintain the system: Schedule backup checks and recovery practice, Make recovery possible when you cannot help, **NEW: single-sig-mastery**.
- Optional extensions: Start a new wallet for real bitcoin, Create the real wallet and its password offline, Restore the empty real wallet before depositing, Check the setup before a small real-bitcoin test, Send a small real payment from the restored wallet, Move a node to another computer, Optional: use Tails as the offline operating system, Optional: keep a small spending wallet online.

### Part 3: Advanced Spending Policies — Only when the threat model requires them

- Decide whether to add authority: When requiring several signatures helps, **NEW: multi-vendor-cost**, Make a complex wallet easier to recover.
- Learn the Core primitives: Run an experiment you can repeat, Understand Core's console and command-line tools, The node, wallet and blockchain are different things, Use a private test chain you can control, Read a wallet descriptor before importing it, Check what a payment file is still missing.
- Build and recover policies: Practice using a two-out-of-three wallet on Signet, Back up the rule as well as the multisig keys, Practice losing a multisig signer, What Taproot adds to a spending rule, Record every Taproot spending route, **NEW: timelocked-recovery**, Test every planned spending route, **NEW: advanced-mastery**.
- Optional interfaces and further work: **NEW: core-explorer**, Ask for help without sharing wallet secrets.

## Every existing lesson mapped

| ID | Existing URL slug | Previous phase | New part / chapter |
|---|---|---|---|
| 0.1 | `what-self-custody-really-means` | Start with the essentials | 1: Begin with the threat |
| 0.2 | `threat-model-before-tools` | Start with the essentials | 1: Begin with the threat |
| 0.3 | `security-is-a-process` | Start with the essentials | 1: Begin with the threat |
| 2.1 | `what-is-bitcoin-core` | Start with the essentials | 1: Verify for yourself |
| own-node | `your-node-matters-first-to-you` | Start with the essentials | 1: Verify for yourself |
| 1.3 | `electrum-workflow-and-security-assumptions` | Start with the essentials | 1: Verify for yourself |
| ibd-separation | `ibd-does-not-block-wallet-learning` | Complete the Signet cycle | 1: Verify for yourself |
| core-not-server | `core-is-neither-a-server-nor-useless` | Complete the Signet cycle | 1: Verify for yourself |
| 2.5 | `why-the-signer-does-not-need-the-blockchain` | Practice signing on an offline computer | 1: Verify for yourself |
| 1.1 | `hardware-wallet-as-a-tradeoff` | Start with the essentials | 1: Choose the foundation |
| 1.5 | `core-as-a-tool-not-an-identity` | Start with the essentials | 1: Choose the foundation |
| 1.4 | `bip39-cryptography-and-backup-model` | Start with the essentials | 1: Choose the foundation |
| signet-entropy-deep-dive | `where-the-private-key-comes-from` | Complete the Signet cycle | 1: Choose the foundation |
| 1.2 | `sparrow-workflow-and-security-assumptions` | Start with the essentials | 1: Choose the foundation |
| core-development | `battle-tested-does-not-mean-bug-free` | Start with the essentials | 1: Choose the foundation |
| architecture-choice | `simple-wallet-or-offline-signer` | Practice signing on an offline computer | 2: Prepare the environment |
| real-device | `choose-a-computer-and-model-malware-risk` | Practice signing on an offline computer | 2: Prepare the environment |
| signet-install-verify | `install-and-verify-bitcoin-core` | Complete the Signet cycle | 2: Prepare the environment |
| signet-why | `learn-first-with-valueless-bitcoin` | Start with the essentials | 2: Prepare the environment |
| signet-vs-mainnet | `mainnet-vs-signet` | Start with the essentials | 2: Prepare the environment |
| signet-start | `start-bitcoin-core-on-signet` | Complete the Signet cycle | 2: Prepare the environment |
| 2.3 | `full-vs-pruned-node` | Complete the Signet cycle | 2: Prepare the environment |
| signet-first-wallet | `first-signet-wallet-and-address` | Complete the Signet cycle | 2: Learn the wallet lifecycle |
| signet-encrypt-new-backup | `encrypt-signet-wallet-and-create-new-backup` | Complete the Signet cycle | 2: Learn the wallet lifecycle |
| signet-restore | `back-up-remove-test-wallet-and-restore` | Complete the Signet cycle | 2: Learn the wallet lifecycle |
| signet-receive-send | `first-signet-receive-and-send` | Complete the Signet cycle | 2: Learn the wallet lifecycle |
| signet-transact-again | `send-again-after-signet-recovery` | Complete the Signet cycle | 2: Learn the wallet lifecycle |
| signet-readiness | `mainnet-readiness-signet-checkpoint` | Complete the Signet cycle | 2: Learn the wallet lifecycle |
| 2.6 | `wallet-backup-vs-node-data` | Complete the Signet cycle | 2: Build a recovery system |
| backup-redundancy-freshness | `more-copies-do-not-mean-a-current-backup` | Prepare mainnet and test recovery | 2: Build a recovery system |
| encrypted-backup-privacy | `digital-and-cloud-backup-privacy-model` | Prepare mainnet and test recovery | 2: Build a recovery system |
| 2.4 | `online-node-and-offline-signer` | Practice signing on an offline computer | 2: Learn offline signing |
| 2.8 | `hot-watch-only-and-signing-wallet` | Practice signing on an offline computer | 2: Learn offline signing |
| ops-malware | `malware-usb-and-destination-verification` | Practice signing on an offline computer | 2: Learn offline signing |
| ops-physical | `physical-security-and-backup-media` | Practice signing on an offline computer | 2: Learn offline signing |
| offline-device | `prepare-offline-signer` | Practice signing on an offline computer | 2: Learn offline signing |
| offline-psbt | `first-offline-signed-transaction` | Practice signing on an offline computer | 2: Learn offline signing |
| offline-recovery | `recovery-drill-without-original-coordinator` | Practice signing on an offline computer | 2: Learn offline signing |
| ops-documentation | `document-the-procedure-without-exposing-secrets` | Practice signing on an offline computer | 2: Learn offline signing |
| ops-routine | `regular-tests-and-annual-recovery-drill` | Maintain the setup | 2: Maintain the system |
| ops-inheritance | `inheritance-and-other-people` | Maintain the setup | 2: Maintain the system |
| mainnet-separate-wallet | `do-not-turn-signet-wallet-into-mainnet-wallet` | Prepare mainnet and test recovery | 2: Optional extensions |
| real-encryption | `encryption-and-passphrase` | Prepare mainnet and test recovery | 2: Optional extensions |
| real-restore | `restore-in-a-clean-test-environment` | Prepare mainnet and test recovery | 2: Optional extensions |
| mainnet-readiness | `mainnet-readiness-before-first-deposit` | Prepare mainnet and test recovery | 2: Optional extensions |
| mainnet-small-test | `first-small-mainnet-test` | Prepare mainnet and test recovery | 2: Optional extensions |
| node-migration | `migrate-node-data-or-validate-from-scratch` | Complete the Signet cycle | 2: Optional extensions |
| optional-tails | `optional-tails-offline-environment` | Practice signing on an offline computer | 2: Optional extensions |
| architecture-path-a | `path-a-online-encrypted-core-wallet` | Practice signing on an offline computer | 2: Optional extensions |
| multisig-why | `why-multisig-and-when-not-to-use-it` | Optional experiments | 3: Decide whether to add authority |
| complex-simple | `complex-wallet-simple-recovery` | Optional experiments | 3: Decide whether to add authority |
| lab-method | `how-to-run-a-self-custody-experiment` | Optional experiments | 3: Learn the Core primitives |
| lab-rpc | `rpc-and-cli` | Optional experiments | 3: Learn the Core primitives |
| 2.2 | `node-wallet-and-blockchain-are-not-the-same` | Complete the Signet cycle | 3: Learn the Core primitives |
| lab-regtest | `regtest-and-failure-scenarios` | Optional experiments | 3: Learn the Core primitives |
| lab-descriptors | `descriptor-experiments` | Optional experiments | 3: Learn the Core primitives |
| lab-psbt | `psbt-debugging` | Optional experiments | 3: Learn the Core primitives |
| multisig-signet | `2-of-3-on-signet` | Optional experiments | 3: Build and recover policies |
| multisig-backup | `keys-are-not-the-whole-multisig-recovery` | Optional experiments | 3: Build and recover policies |
| multisig-failures | `failure-simulations` | Optional experiments | 3: Build and recover policies |
| taproot-model | `taproot-mental-model` | Optional experiments | 3: Build and recover policies |
| taproot-descriptors | `taproot-descriptors-and-recovery-artifacts` | Optional experiments | 3: Build and recover policies |
| taproot-path-tests | `test-every-recovery-path` | Optional experiments | 3: Build and recover policies |
| lab-community | `community-questions-and-clarifications` | Optional experiments | 3: Optional interfaces and further work |

## Duplicates and missing substance

- Consolidate overlapping introduction / Core-as-tool / comparison / risk summaries into one argument progression, preserving useful detailed sources. Repeated OS caveats move to the bounded Core limitations lesson; operational warnings stay next to the action they protect.
- Move node-versus-wallet console examples into Part III; keep the intuitive distinction in Part I. Split descriptor export/import from the GUI PSBT exercise, because Core has no equivalent descriptor-import GUI.
- Move backup freshness and privacy before the offline workflow, independently of real mainnet funding. Mainnet remains an optional application after test-coin mastery.
- Add custody economics, continuity, Debian installation, passphrase mathematics, illustrative attack economics, password generation, lock/change practice, coin control, repeated recovery drills, media comparison, optional VeraCrypt, timelocked policies and optional Core Explorer.
- Replace generic advanced outlines with version-specific runnable Regtest examples and recovery expectations.
- Correct stale Sparrow/Electrum version assumptions; verify entropy, KDF, passphrase UI and software behavior against release-pinned source plus isolated tests.

## Interaction and review model

- Three visible parts. Chapters group the longer second part; the active chapter is expanded. One guided task at a time, visible purpose and failure mode, optional technical detail.
- Outcome checklists and prerequisites gate completion. Browsing and inbound links remain available. No website can certify physical competence: completion is an explicit local learner declaration. New v4 checks invalidate obsolete confirmations.
- Separate publication, source review and hands-on evidence. A macOS Regtest test does not establish a physical Debian/Tails air gap, hardware boot compatibility, funded Signet or a mainnet payment.
- The passphrase calculator accepts public assumptions only, never a password or wallet. No secret-entry field, analytics or remote computation.
