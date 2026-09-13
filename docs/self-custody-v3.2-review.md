# Self-custody curriculum v3.2

English editorial review, 13 September 2026.

Baseline: `5945d9e8cb091a424ab0e35df115c7d493483828` (published v3.1).

## Editorial changes

Reviewed all 64 lessons across six phases, including all 76 guided steps, expandable explanations, help, expected results, checklists and review notes. Revised text in 57 lessons and 48 guided steps. The pass improves grammar, sentence flow, action titles and transitions, and uses consistent American English spelling.

Technical terms retain explanations close to where readers encounter them. Recovery instructions now distinguish the original computer from its replacement more clearly. References to later steps also match the player, which displays one step at a time. The overview and shared lesson controls use clearer English.

Three specific corrections:

- BIP32 describes deriving a family of keys from one starting secret. The earlier wording, “how many keys can be derived,” could be read as a statement about a numerical limit. [BIP32](https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki) describes this tree of keys.
- The Tails explanation separates session data discarded at shutdown from files deliberately retained in encrypted Persistent Storage. [Tails overview](https://tails.net/about/index.en.html) and [Persistent Storage documentation](https://tails.net/doc/persistent_storage/index.en.html) support that distinction.
- The optional node/wallet lesson already used `signet-training-restored` in its command, but its explanation, warning and parameter label still referred to `test-wallet`. All now identify the same restored wallet.

The visual review also increased desktop command-card spacing to 24 px and fixed the mobile copy control so its icon fits inside the button. The button retains its accessible name.

## Validation and limits

- Scoped Prettier, TypeScript, ESLint, production build and asset verification passed.
- All 14 curriculum checks passed, including prerequisites, completion gates and the retired Croatian bookmark mappings.
- A separate comparison with v3.1 confirmed unchanged lesson IDs, English slugs, kinds, optional flags, prerequisites, publication and verification status, historical review dates, guided-step IDs, commands, step warnings and checklist counts. It also checked the corrected restored-wallet annotations.
- Browser checks used 1440 × 1000 and 390 × 844 viewports. Reviewed the overview, phase navigation, PSBT steps, expanded node/wallet command explanations and the optional Tails lesson. Checked long titles, draft notices, controls and command cards. No page-level horizontal overflow or browser errors appeared in the checked views; long commands remain scrollable inside their code blocks.

This is an editorial update. No Bitcoin transactions or physical Debian/Tails installations were performed. Fourteen required exercises retain their pending practical-review status and cannot be marked complete. The curriculum remains English-only, with existing Croatian bookmarks redirected to English.

## Changed files

Paths are relative to the repository root.

| File | Change |
| --- | --- |
| `btcpavao-github-io/src/curriculum-beginner-language.ts` | Lesson prose, guided instructions, help and expected results. |
| `btcpavao-github-io/src/curriculum-custody-policy.ts` | English step titles and review notes. |
| `btcpavao-github-io/src/curriculum-revisions.ts` | Step titles, spelling and consistent restored-wallet annotations. |
| `btcpavao-github-io/src/bitcoin-core-curriculum-en-data.ts` | Command titles and surrounding English. |
| `btcpavao-github-io/src/bitcoin-core-curriculum-player-en-data.ts` | Version 3.2 and English review notes. |
| `btcpavao-github-io/src/bitcoin-core-curriculum-en.tsx` | Description spelling. |
| `btcpavao-github-io/src/components/curriculum-lesson.tsx` | Lesson controls, draft notices and mobile copy control. |
| `btcpavao-github-io/src/components/curriculum-overview.tsx` | Introduction and course metadata. |
| `btcpavao-github-io/src/index.css` | Desktop command-card spacing. |
| `btcpavao-github-io/content/content-registry.mjs` | Description spelling. |
| `btcpavao-github-io/scripts/verify-curriculum.mjs` | Expected curriculum version. |
| `docs/self-custody-v3.2-review.md` | This review. |
