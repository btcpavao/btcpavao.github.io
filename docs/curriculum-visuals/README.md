# Educational visuals implementation — curriculum v4.2

Base: `3efa3da` (2026-09-16). The supplied audit and current source both contain 99 lessons, with matching lesson IDs and slugs. No curriculum text, ordering, prerequisite rules, completion logic, storage namespaces or existing progress keys were changed.

## Delivered

- All 49 **Yes** recommendations have an implementation in the applicable current lesson.
- One of ten **Maybe** recommendations is implemented: the coin-control input-linkage comparison, expanded only on request. Nine are omitted with individual reasons in `audit-decisions.json`.
- All 40 **No** decisions retain their original text, commands, checks and tools without new art.
- 61 placements across 50 lessons use 50 shared definitions: 46 semantic HTML/SVG diagram or comparison definitions and four generated editorial scenes. An additional overview reference reuses the architecture definition.
- PSBT, verification and replacement recovery share components with explicit current-focus states. The architecture formerly shown below the checklist now appears on reading screen R2 of `2.4`; the overview uses the same source.
- Reading targets match an exact, unique content anchor rather than a mutable array index. Guided targets use existing step IDs. A changed or missing reading anchor fails verification and requires placement review; it cannot silently move a visual to a different paragraph.
- Core diagrams are visible on their active screen. Advanced details use native `details`. Commands and warnings retain their existing order; visuals come before the expected result. No visual introduces an obligatory interaction or completion mark.
- Existing entropy, brute-force and backup-media tools remain unchanged.

## Files and maintenance

- `src/curriculum/visual-catalog.json`: editable English titles, captions, cards and tables.
- `src/curriculum/visual-placements.json`: lesson/step/content-anchor bindings and focused states.
- `src/curriculum/visuals.ts`: target types and matching logic; exact example transaction arithmetic.
- `src/components/curriculum-visual.tsx` and `.css`: shared semantic diagram renderer, responsive containers and existing site light/dark tokens.
- `public/curriculum-visuals/`: four 1200 × 675 WebP scenes. Each is under 120 KB, has explicit dimensions and descriptive alt text, and is lazily loaded only when its lesson is rendered. No collection of scene images is loaded on the overview.
- `audit-decisions.json`: all 99 decisions, original screen-by-screen scope, exact implemented bindings, omissions, verification and blockers. Repeated `visual` identifiers document reuse.
- `source-prompts.json`: all original audit production briefs. These are editorial references, not requests to generate labels or precise diagram relationships as bitmaps.
- `generated-scenes.json`: actual generation prompts, style reference, entropy correction and review notes. `assets.json` records dimensions, size and SHA256.

Small placement adaptations: the clean-start scene follows the complete three-paragraph checkpoint text so the closing thought remains together. The rescan reminder is included in the pruning comparison caption. Core node/wallet roles use the same simple model as the architecture, without adding a repeat-reference click on the next reading screen. The optional coin-control visual uses a merge relationship instead of literal envelopes. Tables remain semantic HTML with keyboard-accessible horizontal scrolling if necessary; the browser must still validate narrow-screen behavior.

The four selected scenes were visually inspected. The first entropy image introduced a Bitcoin logo despite the prompt; it was rejected and regenerated without that logo. The selected image represents abstract secret material. Illustrative screens are not presented as screenshots of Bitcoin Core or any other application.

## Technical review

The diagrams follow the existing Core 31.1 lessons and their source links. Additional primary-source checks used:

- [Core 31.1 PSBT workflow](https://github.com/bitcoin/bitcoin/blob/v31.1/doc/psbt.md): signing, combining, finalization and extraction are distinct roles; the GUI can combine roles.
- [Core 31.1 descriptors](https://github.com/bitcoin/bitcoin/blob/v31.1/doc/descriptors.md): public descriptions, receive/change derivation, multisig and alternative Taproot spending paths.
- [Core 31.1 wallet implementation](https://github.com/bitcoin/bitcoin/blob/v31.1/src/wallet/wallet.cpp): first encryption creates new active descriptors with a new seed for a nonblank wallet; this is different from changing a wallet passphrase. Older files are not rewritten retroactively.
- [BIP68](https://github.com/bitcoin/bips/blob/master/bip-0068.mediawiki): relative block delay belongs to the confirmed outpoint. For an output confirmed at h, older(6) permits inclusion no earlier than h + 6, with the required transaction version and sequence.

The visual transaction uses explicitly illustrative satoshi amounts. Its fee is computed as input minus outputs and tested; it is never drawn as a transaction output. The advanced diagrams preserve the existing 2-of-3 Regtest lab and distinguish its delayed `wsh` policy from the separate plain Taproot key-path test. Expected outcomes are separate from unrecorded observations.

## Executed verification

- Production build (client, SSR and 14 prerendered routes).
- TypeScript via the production build and the repository typecheck command.
- ESLint.
- All 27 existing curriculum checks, including v4/v4.1 saved-progress migration, prerequisites, completion, bookmarks and optional paths.
- `npm run verify:visuals`: all 99 audit decisions; 61 exact bindings; source asset existence; no art on No decisions; no duplicate core idea on an active screen; table dimensions; exact fee arithmetic.
- The same command renders **all 285 active states with the real `CurriculumLesson` component**, supplying saved-progress fixtures to select each reading/practice step. It asserts that the active section contains precisely the intended visuals. It also checks edited-anchor rejection, absent-step rejection, correct PSBT focus and background-only lab placement.
- Existing asset verification and `git diff --check`.

The visual checks are included in the existing pull-request curriculum workflow. No Bitcoin custody exercises were executed and no real wallets were used.

## Outstanding review gate

**Desktop/mobile browser QA is not completed.** The Cloud browser rejected both local HTTP preview URLs and the shared local file URL under its security policy. No alternate browser or policy bypass was attempted.

Consequently, this draft must remain a draft until a reviewer checks actual layout, every diagram family, mobile overflow, 200% text size, dark mode, keyboard focus, Previous/Continue, native details, the three existing interactive tools, direct links and progress reload in a supported preview. Static renderer and progress tests do not establish those browser behaviors. No fabricated screenshot evidence is included.

Implementation is present; browser validation is the remaining blocker. Nothing in this change merges or publishes the site.
