# Wallet GPG backup: separate verification pass

Scope: newly edited backup/privacy, practice-environment, restore, ISO announcement and checklist text in the English wallet setup guide. Existing unrelated content was not re-audited. Output follows the established docs/wallet-archive-backup-factcheck-2026-10-12.md location. The earlier report describes a superseded workflow.

Checked after the initial draft, 16 October 2026.

| Claim or instruction | Source / evidence | Finding |
| --- | --- | --- |
| Symmetric GPG encryption uses a passphrase and accepts AES256; no recipient key pair is needed. --no-symkey-cache prevents the symmetric passphrase cache. --output selects the recovered filename. | https://gnupg.org/documentation/manuals/gnupg/Operational-GPG-Commands.html | Confirmed, high confidence. Secrets are entered in the prompt, not command arguments. |
| Current GnuPG defaults provide integrity-protected symmetric encryption; OCB is a distinct selectable profile. | https://gnupg.org/documentation/manuals/gnupg/OpenPGP-Options.html | Confirmed, high confidence. Commands intentionally use the maintained installation's default mode and AES256. They do not claim to select Vault OCB. Release compatibility must be documented and tested. |
| Contents and embedded filenames are encrypted; outer filename, size and filesystem metadata remain exposed. | https://datatracker.ietf.org/doc/html/rfc4880 sections 5.9, 5.13 and 11.3; local synthetic encrypted file test | Confirmed for the described symmetric payload. No claim of hiding encrypted-file identity or providing anonymity. |
| Debian provides gnupg; Homebrew provides brew install gnupg; official Gpg4win includes GnuPG and Kleopatra. | https://packages.debian.org/trixie/gnupg ; https://formulae.brew.sh/formula/gnupg ; https://gpg4win.org/download.html ; https://gnupg.org/download/ | Confirmed, high confidence. Installation was not performed on these OSes during this task. |
| Nested encryption requires reverse-order decryption and each independent secret; keeping an inner copy bypasses outer layers. | Direct construction of nested ciphertext plus synthetic round-trip test | Confirmed, high confidence. Manual order is recorded; arbitrary passphrase ordering in the future GUI is not represented as a current CLI feature. |
| Core wallet encryption is separate from the external backup passphrases. | https://bitcoincore.org/en/doc/30.0.0/rpc/wallet/encryptwallet/ ; existing guide's Core warning screenshot | Confirmed. Loading and unlocking remain distinguished; metadata privacy comes from the external layer. |
| Vault will bundle Core/GnuPG/TAR/KeePassXC, target AES-256 OCB and private RAM, and provide standard-tool recovery. | User-provided “Complete GPG-Only Backup & Encryption Redesign” specification | Planned requirements only. No implementation, public availability or ISO verification claimed. |
| TAR packages files, while GPG encrypts them. | https://www.gnu.org/software/tar/manual/html_node/index.html ; supplied design | Confirmed, high confidence. Manual example uses one file without TAR. |
| Meaningful funds should use dedicated hardware with fresh Linux; a clean antivirus scan is insufficient reassurance. | Core's malware warning plus author's explicit recommendation | Editorial recommendation, not a quantified risk estimate or guarantee that fresh Linux excludes all compromise. Existing physical-tampering warning remains. |
| All layer secrets need recoverable independent backups; losing one can block recovery. Geographic separation adds logistical barriers but is not coercion-proof. Layers are not multisig. | Consequences of the stated nested-encryption construction and backup/signing distinction | Sound inference, explicitly bounded. No multiplication of security bits or claim of threshold recovery. |
| Final ciphertext can be an additional cloud copy; offline copies and independent secrets remain necessary. | Author's conditional recommendation from the encryption/storage architecture | Clearly opinion, with offline guessing, visible metadata and cloud loss disclosed. |
| Encryption leaves the source in place, recovery writes an output, deletion does not ensure erasure of snapshots/synced copies. | CLI behavior and storage-copy semantics | Confirmed mechanism. Production private-workspace requirements are separated from disposable practice commands. |

## Executed checks

- Synthetic data only, MacGPG 2.2.41, isolated temporary GnuPG home; no user wallet or keyring accessed.
- One-layer recovery: byte-identical to source.
- Two-layer recovery: byte-identical to source after B then A.
- Incorrect outer passphrase: nonzero exit, rejected.
- Modified ciphertext: nonzero exit, rejected.
- Initial sandbox run could not launch gpg-agent; isolated test passed after approved execution outside sandbox.
- Production build including TypeScript and static rendering passed; existing bundle-size/static-import warnings only.
- ESLint passed; internal-link verification passed (2,563 links, 98 lesson destinations).
- No Bitcoin Core restore, OCB profile, ISO boot or cross-platform installation test was performed. This work updates the website, not the Vault application.

Confidence: high for changed basic GPG mechanics; Vault statements are future requirements. Recommendation and operational inferences are labeled as such.

Visual QA: production preview inspected at 1280 × 900 and 390 × 844 in the separate Codex browser. No horizontal document overflow; GPG panel padding 36px desktop / 24px mobile. All command blocks fit their containers; inner padding 24px desktop / 16px mobile.

## Follow-up: curriculum, ISO page and macOS graphical workflow

Separate review after drafting the follow-up revision, 16 October 2026.

- The Debian page and curriculum enrichment no longer recommend 7-Zip or Arqiver. The retired VeraCrypt exercise now teaches one GPG layer and optional independent layers. Unused former-tool icons and their attribution files were removed together; generic Lucide pictograms represent GnuPG and TAR without posing as project logos.
- Old lesson URLs continue through an explicit alias. The internal historic lesson ID and frozen progress manifests remain for compatibility only. Every new GPG guided step has a new check ID, and the privacy checkpoint adds an explicit layer-separation check. Existing migration regression tests confirm old container-work completion cannot satisfy the new GPG exercise.
- GPG Suite includes GPG Services for Finder file encryption/decryption and MacGPG as its backend: https://gpgtools.org/ . GPG Mail is not part of the file workflow. No pricing or current OS-version promise was added.
- Finder menu paths were verified against https://gpgtools.tenderapp.com/kb/gpg-services-faq/how-to-encrypt-and-sign-text-or-files-with-gpg-services and https://gpgtools.tenderapp.com/kb/gpg-services-faq/how-to-decrypt-and-verify-text-or-files-with-gpg-services .
- Password-only encryption and confirmation are supported by the official implementation: https://github.com/GPGTools/GPGServices/blob/f014a8d43f76e88a2a0ae39d2b84c5c9bdba35c7/Source/RecipientWindowController.m and https://github.com/GPGTools/GPGServices/blob/f014a8d43f76e88a2a0ae39d2b84c5c9bdba35c7/Source/GPGServices.m . The code combines signing, recipient-key and symmetric modes independently. Therefore the instructions explicitly turn off signing and own-key recipient selection and leave all recipient keys unselected. The official release notes name the “Encrypt with Password” option: https://gpgtools.org/releases/gpgsuite/release-notes.html . Confidence: high for source behavior; no desktop GUI execution claimed.
- The same source encrypts a single regular file directly, but packages directories/multiple files as ZIP. The recommended GUI exercise therefore selects one file per operation and explicitly distinguishes its folder handling from Vault TAR packaging. Nested encryption is constructed by encrypting the encrypted output again, not by assuming an automatic layer-management feature.
- GPG Suite is recommended for macOS practice, without promising its installed defaults match the final Vault OCB profile. Final ISO compatibility and release verification remain pending. Dedicated fresh Linux remains the recommendation for meaningful funds.
- Existing basic CLI validation from the earlier pass applies to the identical commands reused in the lesson. No new GUI, ISO, OCB or funded wallet runtime test was performed.
- Checks: 33 curriculum checks, 11 search checks, ESLint, production build and 2,668 internal links passed. Mobile (390 × 844) and desktop (1280 × 900) views inspected for the ISO page, GPG lesson and expanded macOS guide. No document horizontal overflow. New text uses existing section padding; no edge contact found.
- Asset verification initially found a stale exact-title assertion from the previous guide wording. Updated it to the current GPG heading; the full asset/crawlable-route check passed, including 38 responsive image sets. This was a test expectation change, not a rendering defect.


## Step 4 simplification and step 5 editorial follow-up

- Bitcoin Core 31.1 source, `src/qt/askpassphrasedialog.cpp` line 37, confirms the encryption dialog recommends eight or more words (https://github.com/bitcoin/bitcoin/blob/v31.1/src/qt/askpassphrasedialog.cpp#L37). Checked independently after drafting.
- KeePassXC official download page lists Windows, macOS and Linux: https://keepassxc.org/download/. Removed Debian package/version prerequisites from the disposable practice step.
- Calculator mathematics remain unchanged. Its starting assumptions are 7,772 equiprobable words, 32,880 guesses/second per GPU and USD 0.89/hour. Average rental cost is list_size ** words / 2 / rate / 3600 * hourly_rent. Six, seven and eight words all produce enormous costs under those assumptions; the prose explicitly does not present these as current market quotations or forecasts.
- More random words increase search space; the explanation distinguishes entropy from price and retains uncertainty about future hardware and attacks, plus separate recovery records.
- Guide-only calculator labels reflect the eight-word Core recommendation without changing curriculum defaults or saved calculator settings. Removed the hardware-wallet comparison paragraph from step 5 at the author's request.

## Beginner-language pass across the wallet guide

- Reviewed the final guide after editing: steps 1–3 and 5–11 use concrete actions and explain signing as approving a payment. The recently agreed step 4 remains intact.
- Step 7 now distinguishes Core's protection of signing keys from GPG's protection of the entire backup. One GPG layer requires three recovery items: the encrypted file, the GPG passphrase and the Core passphrase. Each extra GPG layer adds one required passphrase. Redundant, separate records are explicit.
- Content privacy is expressed as hiding the wallet inside GPG; the text does not promise that context can never connect an artifact to Bitcoin. Random passphrases alone do not identify their purpose.
- Source verification: https://github.com/bitcoin/bitcoin/blob/v31.1/src/qt/bitcoingui.cpp confirms the private-key encryption description (line 291), Close Wallet action (322), and Restore Wallet's file-first/name-second sequence (399–423). https://bitcoincore.org/en/doc/31.0.0/rpc/wallet/restorewallet/ confirms restore loads a backup and requires a new wallet name parameter. No new native Core GUI test is claimed.
- https://gnupg.org/documentation/manuals/gnupg/Operational-GPG-Commands.html confirms passphrase-based symmetric encryption, decryption and the no-symkey-cache option. All five previously tested GPG commands are byte-for-byte unchanged.
- Removed implementation-specific Vault OCB/RAM/TAR detail from this beginner page; the linked ISO page remains the technical reference. No compatibility or released-ISO claim is introduced.
- Finder and Terminal workflows now open separately on demand, as do extra-layer commands and the later two-computer diagram. Preserved instruction to stop on GPG errors, separate secrets, keep original files until recovery succeeds and avoid cloud-sync folders while opening backups.
- Validation: lint, production build, asset verification (38 responsive image sets), internal-link verification (2667 links) passed. Desktop 1440px and mobile 390px render checks found no horizontal overflow; step spacing is 24px/16px respectively. Opened Terminal instructions and the optional architecture diagram to check hidden content. Checklist order/storage identifiers remain unchanged; edited labels retain their existing meanings.

## Curriculum consistency follow-up

- Compared all three curriculum parts and article-enrichment notes with the updated wallet guide. Clarified one GPG layer as three recovery items: one final encrypted file, its GPG passphrase and the separate Core passphrase. Two GPG layers require one final file and three passphrases. Each additional layer adds one required passphrase, not another Bitcoin signer.
- Aligned backup freshness, media, privacy, GPG practice, recovery drills, maintenance, documentation, inheritance, optional mainnet creation/restoration and multisig backup guidance. Redundancy now explicitly covers every required item; the file and each secret remain separately stored. Distributed backups use the final outermost file.
- Recovery runs from a copied file and separately retrieved records; GPG layers open last added first. Core then restores the recovered wallet, and the separate Core passphrase is used to prove signing. The mainnet test remains an empty-wallet rehearsal before funding.
- Clarified password-change boundaries: Core's Change Passphrase does not modify GPG layers. Replacing a GPG password means rebuilding that layer and any enclosing layers; older encrypted files still require their corresponding old passwords. These statements follow the unchanged nested-encryption commands and previously reviewed GnuPG operational documentation.
- Kept the optional CLI exercise, its existing tested commands, and all lesson/guided-step IDs. Technical Vault implementation detail remains in the curriculum's optional explanation and is explicitly planned, not claimed as tested or released. No new native GUI, physical-device or funded-wallet testing is claimed.
- Validation: lint and production build passed; all 33 curriculum checks, 11 search checks and 2667 internal links passed. Verified desktop (1440px) and mobile (390px) views of the privacy lesson and expanded optional GPG lesson; no horizontal overflow or edge contact observed. No lesson or guided-step identifier changed.
