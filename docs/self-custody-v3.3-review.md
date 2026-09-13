# Self-custody curriculum v3.3

Hardware targeting and wallet-backup rationale, 13 September 2026.

Baseline: `0389c3e684af95affffbf7893aaec639df61b9e6` (published v3.2).

## Editorial scope

Expanded three English reading lessons, identified here by their stable internal IDs:

- `1.5`: why ordinary, non-Bitcoin-specific computers are a deliberate custody choice, including the information a purchase reveals and the continuing vendor relationship.
- `1.1`: attacker incentives, customer targeting, costly hardware inspection, documented Coldcard/Ledger/Trezor incidents and an institutional custody example.
- `1.4`: BIP39's origins, limitations of seed-only recovery, and the scope and limits of a Core wallet-file backup.

The recommendation remains a dedicated Linux computer running an offline Core signer, with separate backups, password recovery and rehearsed restoration. It is an editorial conclusion for this workflow, not a measured universal ranking of all custody systems. Terms including firmware, supply-chain attack, backdoor, phishing, social engineering, entropy, derivation path, script type, multisig policy, descriptor and metadata are explained in the lessons.

Increased desktop callout padding to 24 px to accommodate the expanded examples. Mobile callouts retain at least 16 px of horizontal padding.

## Separate fact and citation review

The prose was drafted before this verification pass. Primary documentation, original incident reports and original technical research were then checked against the draft. Confidence is high for the bounded factual claims below. The economic targeting argument and preferred custody model are explicitly inferences and editorial judgments, not statistical findings.

| Claim or group of claims | Evidence and support | Treatment |
| --- | --- | --- |
| A retail wallet purchase indicates a likely cryptocurrency use; an ordinary computer has many possible uses. | Product purpose and the [Ledger incident report](https://www.ledger.com/blog/update-efforts-to-protect-your-data-and-prosecute-the-scammers) provide the premises. | Inference: a less specific purchase signal can increase target-selection effort. No quantified exploit-cost comparison. |
| A vendor relationship creates opportunities to approach customers after delivery. | [Ledger follow-up](https://www.ledger.com/blog/update-efforts-to-protect-your-data-and-prosecute-the-scammers) and [Trezor's initial report](https://forum.trezor.io/t/security-alert-update/15204). Direct support for the examples. | Explain phishing as impersonation and social engineering as manipulation of the owner; distinguish these from defeating key isolation. |
| Chip inspection may require expensive equipment, considerable time and destruction of the sample; some modifications evade optical inspection. | Becker, Regazzoni, Paar and Burleson, [Stealthy Dopant-Level Hardware Trojans, CHES 2013](https://www.iacr.org/archive/ches2013/80860203/80860203.pdf), especially pp. 1 and 4. Direct. | No claim that an identified retail wallet or laptop contains this backdoor. The inspection limitation applies to both categories. |
| A matching download fingerprint, visible seal, public code or device-authenticity check does not establish the absence of all hardware backdoors. | The inspection paper supplies background; limits follow from what each check examines. | Inference. Explicitly state that a file match does not establish benign software either. Firmware, supply-chain attack, backdoor and attestation use plain-language working definitions. |
| Public code permits review but does not establish that every relevant path or shipped device was thoroughly examined. | [Coldcard public repository and advisory](https://github.com/Coldcard/firmware); [original technical reconstruction](https://wizardsardine.com/blog/coldcard-vuln-deep-dive/). Direct example, narrower inference. | Review requires resources; no unsupported claim about why particular reviewers did or did not investigate. |
| Coinbase describes a custody architecture using proprietary software and hardware security modules. | [2025 Form 10-K, Custodial practices](https://www.sec.gov/Archives/edgar/data/1679788/000167978826000015/coin-20251231.htm). Direct. | One institutional example. No estimate of what most wealthy holders or custodians use, and no claim that private institutional work establishes retail review quality. |
| Coldcard's weak seed generation spanned 2021 to July 2026, despite public source. | [Coinkite advisory](https://blog.coinkite.com/coldcard-mk3-seed-generation-warning/) and [firmware repository](https://github.com/Coldcard/firmware). Direct. | Avoid conflicting fine-grained first-release details: the advisory names 4.0.1, while the technical analysis dates the introduction to 4.0.0. Both support the five-year period. |
| The affected firmware used predictable software output where hardware randomness was expected. | [Wizardsardine's original analysis, section 1.1](https://wizardsardine.com/blog/coldcard-vuln-deep-dive/). Direct. | Explain entropy as unpredictability. Describe a firmware integration defect, not a defective physical random-number generator. |
| Fixed firmware does not repair secrets generated earlier. | [Coinkite advisory](https://blog.coinkite.com/coldcard-mk3-seed-generation-warning/). Direct. | Link the advisory for affected versions, exceptions and migration; do not invent a replacement migration procedure. |
| Ledger disclosed a 2020 customer-data breach, including contact/order information, followed by phishing. | [Ledger's January 2021 follow-up](https://www.ledger.com/blog/update-efforts-to-protect-your-data-and-prosecute-the-scammers). Direct. | Customer-data exposure is distinguished from extraction of device keys. No unnecessary victim-count estimate. |
| Trezor's January 17, 2024 initial report says an intruder contacted 40 users through its support portal; at that point it had found no seed disclosures. | [Official initial alert](https://forum.trezor.io/t/security-alert-update/15204). Direct attribution. | Date and initial-report scope are explicit; this is not presented as a final count or a current incident. |
| BIP39 was introduced in 2013 by four authors, including Trezor's Palatinus and Rusnak, to make secret data easier to record and transfer. | [BIP39](https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki), metadata/motivation; [Trezor's origin account](https://trezor.io/learn/advanced/standards-proposals/what-is-bip-39-how-12-and-24-word-wallet-backups-work). Direct. | Hardware-wallet usability is part of the history; BIP39 is not described as hardware-only. |
| BIP32 derives a family of keys from starting secret data and does not require BIP39. | [BIP32](https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki), abstract and master-key generation. Direct. | Keep the distinction between key derivation and word-based transport. |
| Recovery may require path, script, account and multisig information beyond the seed. | [BIP380 motivation and key expressions](https://github.com/bitcoin/bips/blob/master/bip-0380.mediawiki); [BIP44 account/path conventions](https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki). Direct. | Define these terms and descriptors. Do not imply that all wallets use the same conventions. |
| A seed does not contain labels, unrelated imported keys or other participants' independent keys. | The data model in BIP32, BIP44 and BIP380 above. | Inference from the specified contents and derivation model. |
| Word formatting is not encryption; copied words plus any required passphrase permit derivation. | [BIP39, From mnemonic to seed](https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki). Direct mechanism. | Recognizability/photocopy risk is a threat-model judgment, not a quantified comparison of backup media. |
| The checksum is 4 bits for 12 words and 8 bits for 24; it detects some errors but does not correct them. | BIP39 generation table and shortcomings, linked above. Direct. | No claim of weak underlying entropy when generated correctly. |
| Passphrase typos can produce a valid but different wallet; wordlist translation changes the seed; no version/layout marker; arbitrary existing seeds cannot be converted to equivalent words. | BIP39 seed conversion and shortcomings, linked above. Direct. | Explain the practical recovery consequences without presenting BIP39 as a broken cryptographic primitive. |
| Core's wallet database contains keys and wallet records; its backup function makes a consistent copy. | [Core 31.1 files documentation](https://github.com/bitcoin/bitcoin/blob/v31.1/doc/files.md), wallet files/locking; [backupwallet RPC](https://bitcoincore.org/en/doc/31.0.0/rpc/wallet/backupwallet/). Direct. | A snapshot of that wallet, not the entire custody setup. Stored descriptors/metadata remain part of the wallet context. |
| Core encryption protects private key material but not all metadata; a forgotten passphrase can prevent recovery. | [Core 31.1 wallet management](https://github.com/bitcoin/bitcoin/blob/v31.1/doc/managing-wallets.md), encryption, backups and passphrase limitations. Direct. | Backup privacy and separate password recovery remain necessary. No claim of full-file encryption. |
| A snapshot cannot include later changes, outside records or secrets it never contained. Public blockchain data can be reacquired. | Core files and wallet-management documents above; snapshot scope is a logical limit. | Separate recovery guide, wallet backup and password; keep private backups offline. These are course instructions, not claims of externally certified safety. |
| Core's backup approach is longstanding, but wallet features and formats change. | [BIP32's historical motivation](https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki) and current Core files/migration documentation above. Direct background. | Maturity supports the editorial preference; it does not prove universal superiority. Test the actual wallet/version used. |

### Claims narrowed or not adopted

- No evidence establishes an across-the-board, “incomparably” higher cost of compromising generic hardware. The supported argument concerns purchase information, target selection and Bitcoin-specific dependencies.
- No representative evidence was found for what most large holders use. Coinbase supplies one documented example.
- The checked Coldcard sources do not establish that a lack of large balances or economic motivation caused the delay in discovery. Coinkite reports actual theft, so the curriculum does not claim nobody held meaningful funds.
- “Complete backup” means the stored state of one wallet at a point in time. It does not include an absent password, another participant's private keys, later changes or separate recovery instructions.
- The preference for Core is stated as the course's judgment for its dedicated offline workflow. Correctly implemented BIP39 can use strong entropy and can be supplemented with wallet descriptions; the course chooses not to add that recovery convention.

## Validation

- All 14 curriculum checks, TypeScript, ESLint and scoped Prettier passed.
- Production build and asset verification passed. Existing SSR mixed-import warnings remain non-fatal.
- A JSON-normalized comparison with v3.2 confirmed exactly three changed lessons, six unchanged phases, all 64 lesson identities and all 76 guided steps. All fields outside the intended prose/citation fields remain identical, including commands, prerequisites, checklists, practical-review gates and historical review dates.
- Browser checks of all three changed lessons used the final production build at 1440 × 1000 and 390 × 844. Expanded background and source panels, long headings, callouts, lists and prerequisite controls fit their containers. No page-level horizontal overflow or browser errors appeared. Desktop callouts have 24 px padding; mobile callouts have 20 px horizontal padding, and mobile prerequisite panels have 16 px. Temporary viewport overrides and the preview tab were cleared after inspection.

No physical devices, operating-system installations or Bitcoin transactions were tested during this editorial change. Existing procedures awaiting practical review retain their disabled completion gates.
