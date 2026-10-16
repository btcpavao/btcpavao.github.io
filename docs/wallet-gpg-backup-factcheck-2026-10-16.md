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
