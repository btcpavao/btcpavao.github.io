# Self-custody curriculum v3.1

English language pass and retirement of the Croatian curriculum, 13 September 2026.

Baseline: `b92ca7190ef1090e076ab62d1252e7d81958c788`, “Update self-custody curriculum to threat-first Debian architecture”. This follow-up builds on the published v3.0 content. It does not establish new practical test dates.

## What changed

All 64 English lessons have revised titles, objectives and introductions. All 76 guided steps now explain the relevant terms alongside the action. Existing expandable explanations, callouts, notes and checklists were reviewed too; dense passages were rewritten where needed. The six phase descriptions and the shared two-computer diagram use simpler language.

Examples include private keys versus wallets and nodes; test coins versus mainnet; inputs, outputs, change, fees and confirmations; terminal versus Core console; checksums, signing keys and fingerprints; public descriptors and their JSON fields; PSBT preparation, signing and broadcast; and wallet backups versus blockchain data. Optional lessons introduce multisig, Taproot and local testing from first principles.

The curriculum is available only in English. The Croatian player and its two content files are removed. Its route is a small redirect, excluded from indexing and the content registry. All 64 old Croatian lesson slugs map to their English equivalents, and query strings are preserved. English metadata no longer advertises a Croatian translation. The Croatian Core article index links directly to the English curriculum; unrelated Croatian essays remain available.

## Structure and preserved behavior

Before: two language versions, six phases, 64 lessons, 30 required lessons and 76 guided steps.

After: one English version with the same six phases, 64 lessons, 30 required lessons and 76 guided steps. The sequence remains essentials, Signet practice, offline signing and recovery, mainnet preparation and small test, maintenance, then optional experiments.

Comparison with the baseline found no changes to lesson IDs, English slugs, kinds, optional flags, prerequisites, publication status, verification status, historical review dates, guided-step IDs, commands, step warnings or checklist counts. English browser storage keys are unchanged. Croatian progress is not merged into English progress. Guided completion still stops at unreviewed practical exercises.

## Separate technical review

The language pass keeps the v3.0 security decisions and qualifications. It explains them without changing the command sequence or treating copy review as hands-on verification.

| Clarification | Primary evidence |
| --- | --- |
| Core encryption creates a new starting secret and requires a fresh wallet backup. Older backups cannot recover funds sent to newly generated keys. | [Core encryptwallet](https://bitcoincore.org/en/doc/31.0.0/rpc/wallet/encryptwallet/) and the v3.0 review's Core 31.1 source check. |
| Public descriptor export defaults to excluding private keys. `next_index` identifies the next address position; `next` is a compatibility copy. Import retains receive/change roles, ranges and original timestamps. | [listdescriptors](https://bitcoincore.org/en/doc/31.0.0/rpc/wallet/listdescriptors/), [importdescriptors](https://bitcoincore.org/en/doc/31.0.0/rpc/wallet/importdescriptors/), [Core 31.1 descriptor documentation](https://github.com/bitcoin/bitcoin/blob/v31.1/doc/descriptors.md). |
| A locked encrypted wallet reports `unlocked_until: 0`; `private_keys_enabled: false` means the wallet cannot hold private keys. | [getwalletinfo](https://bitcoincore.org/en/doc/31.0.0/rpc/wallet/getwalletinfo/). |
| BIP39 recovery words and an optional additional passphrase derive a starting secret. This differs from the password encrypting a Core wallet file. | [BIP39](https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki). |
| A PSBT can be unsigned or incomplete. Finalizing assembles spending data; extraction produces a transaction for broadcast. | [Core 31.1 PSBT documentation](https://github.com/bitcoin/bitcoin/blob/v31.1/doc/psbt.md). |
| Taproot has key-path and script-path spending; a script-path spend supplies the selected script and related proof. | [BIP341](https://github.com/bitcoin/bips/blob/master/bip-0341.mediawiki). |

The [v3.0 review](self-custody-v3.0-review.md) records the primary-source checks for Debian, Tails, release verification, physical tampering, maintenance and backup cadence. The annual drill and 3–6 month media check remain course recommendations. A successful Signet exercise does not test a real mainnet backup or guarantee future security.

## Validation

- Scoped Prettier, `npm run typecheck` and `npm run lint` passed.
- `npm run verify:curriculum` passed all 14 checks, including retired bookmark mapping, prerequisite gates and review-status preservation.
- `npm run build` and `npm run verify:assets` passed. Static output includes 14 content routes and the separate retired-curriculum redirect.
- A separate baseline comparison confirmed unchanged identifiers, gates, commands, step warnings and positional checklist counts across all 64 lessons and 76 steps.
- Desktop and mobile checks used 1440 × 1000 and 390 × 844 viewports. Reviewed the overview, expanded architecture diagram, long PSBT instructions, step navigation and the Croatian article index. Mobile spot checks also covered the introductory, installation, maintenance, Taproot and command-line lessons. No horizontal overflow or browser errors were found in the checked views. The architecture cards retain 24 px padding on mobile; the main desktop progress card retains 32 px.
- Browser navigation from the retired Croatian PSBT bookmark reached the corresponding English lesson and retained its query string. The new curriculum link on the Croatian index points directly to English.
- The visual pass found an existing undefined `bg-bitcoin` class that made the index's Start Here link white on a transparent background. It now uses the site's primary button colors.

No Bitcoin transactions or physical Debian/Tails installations were performed for this language pass. Fourteen required exercises still await practical review, as their visible labels and completion gates state. Offline setup, actual signing, independent recovery, Tails persistence and mainnet tests retain their existing hands-on review requirements.

## Exact changed files

Paths are relative to the repository root.

| File | Change |
| --- | --- |
| `btcpavao-github-io/src/curriculum-beginner-language.ts` | New English introductions, guided instructions and background-copy revisions. |
| `btcpavao-github-io/src/curriculum-revisions.ts` | Apply the English language pass and simplify phase descriptions. |
| `btcpavao-github-io/src/bitcoin-core-curriculum-player-en-data.ts` | Curriculum version 3.1. |
| `btcpavao-github-io/src/bitcoin-core-curriculum-en.tsx` | Plain-language description and English-only metadata. |
| `btcpavao-github-io/src/components/curriculum-overview.tsx` | Beginner introduction and environment explanations. |
| `btcpavao-github-io/src/components/custody-architecture.tsx` | Explain the jobs in the shared diagram. |
| `btcpavao-github-io/src/bitcoin-core-curriculum.tsx` | Removed Croatian player. |
| `btcpavao-github-io/src/bitcoin-core-curriculum-player-data.ts` | Removed Croatian player data. |
| `btcpavao-github-io/src/bitcoin-core-curriculum-data.ts` | Removed Croatian legacy outline. |
| `btcpavao-github-io/content/curriculum-redirect.mjs` | Retired route and 64 lesson-slug mappings. |
| `btcpavao-github-io/content/curriculum-redirect.d.mts` | Redirect helper types. |
| `btcpavao-github-io/src/components/curriculum-redirect.tsx` | Client/development redirect and English fallback. |
| `btcpavao-github-io/content/content-registry.mjs` | Retire Croatian curriculum entry and translation metadata. |
| `btcpavao-github-io/src/App.tsx` | Retired route handling, English curriculum link and button-contrast fix. |
| `btcpavao-github-io/src/main.tsx` | Client routing to the redirect. |
| `btcpavao-github-io/src/entry-server.tsx` | Server routing to the redirect. |
| `btcpavao-github-io/scripts/build-static-routes.mjs` | Static bookmark-preserving redirect and translation metadata. |
| `btcpavao-github-io/scripts/verify-assets.mjs` | Retired-route and English-only metadata assertions. |
| `btcpavao-github-io/scripts/verify-curriculum.mjs` | English curriculum checks and retired bookmark coverage. |
| `docs/self-custody-v3.1-review.md` | This review. |
