# Free self-custody course entry page

Route: `/en/bitcoin-core/course/`. The existing `/en/bitcoin-core/self-custody/` route and lesson hashes remain intact.

## Direction

This is an extension of the incumbent BTC Pavao brand, in Persuade mode. Retain Geist, limestone surfaces, existing semantic gold tokens and the curriculum blue `#0d3153`. The first viewport introduces a free self-custody course with a direct lesson CTA and original Mediterranean artwork. The signature interaction shows the five consequences of duplication, encryption and separation; the full syllabus is progressive disclosure from canonical data. The source of lesson titles, chapters, count, links and publication states is `curriculumPhases`, never a second syllabus.

## Subscription integration

No newsletter provider or newsletter credentials existed in the inspected repository. Do not collect email in a decorative form. The page offers the real X profile and writing RSS feed until `VITE_COURSE_SUBSCRIBE_URL` is set to an HTTPS hosted subscription page. Set the `COURSE_SUBSCRIBE_URL` GitHub repository variable to enable it in production. The hosted provider owns validation, consent, double opt-in, unsubscribe and storage. Verify those settings and complete a test subscription before enabling. Never put a provider API secret in a Vite variable. Empty, malformed and non-HTTPS configuration keeps the honest fallback.

## Measurement

No analytics service was found. `course-events.ts` emits an in-memory `btcpavao:course` CustomEvent; it sends nothing, stores nothing, and has no user IDs. A consent-aware first-party adapter can subscribe to it later. Do not report collected conversion metrics until a collector exists.

Events: start_click (CTA placement), curriculum_click, syllabus_open (phase), demo, share, subscribe_open, lesson_open (actual player), lesson_complete (confirmed check). A CTA click is not a course start. Count lesson_open for the first lesson as activation, then lesson_complete and later lesson_open as progression. React development mode may replay mount events; production aggregation should still deduplicate by its own privacy policy. Newsletter completion belongs to the configured provider, not subscribe_open.

## Content and release truth

Debian availability uses the existing `DebianImagesNotice`; no new download is advertised. The first lesson preview reads the actual explanation/checklist and does not modify progress. Returning learners read the existing last-lesson key and reuse its validity check. The page has no passphrase generator and accepts no wallet files or secrets. Entropy is calculated as n × log2(7776), with exact BigInt combinations; it does not claim a safe dollar threshold or cracking duration. The vault and attacker examples are explanatory models, not security scores.

## Artwork

Original hero and social art produced using the built-in image generation tool, guided by the existing `homepage-hero-v2-840.webp`. WebP variants are optimized delivery copies. Exact prompts live beside the assets in `public/course/provenance.json`. Other illustrations and the authentic portrait reuse existing assets.

## Design evidence checked

This is a code-led extension of the existing identity requested in the supplied implementation brief. The incumbent source remains `btcpavao-github-io/src/index.css`; page-specific composition lives in `src/course-landing.css`. This record does not establish a replacement brand or global design system.

- **Font and hierarchy:** the global stylesheet loads local Geist Variable Latin and Latin Extended fonts at weights 100–900 with `font-display: swap`, maps both sans and display roles to Geist, and applies the sans role on `html`. The landing page inherits that family. Its hero uses weight 600, line-height 1.04 and `clamp(3.5rem, 5.3vw, 4.8rem)`; section headings use weight 600 and `clamp(2rem, 3.8vw, 3.25rem)`. Body paragraphs use line-height 1.75.
- **Palette and surfaces:** page text, limestone background, cards, secondary surfaces and dividers consume the existing semantic properties. The light background remains `oklch(0.984 0.008 90)`, foreground `oklch(0.24 0.018 58)`, and primary gold `oklch(0.69 0.16 72)`. Main CTAs use the existing separate `--primary-button` (`#a85100`), hover (`#934900`) and white label tokens. Page blue `#0d3153` and soft blue `#dceef8` match the incumbent curriculum values. Existing light/dark semantic definitions remain authoritative; fixed dark-blue teaching panels use their own light labels. The gold comparison symbol is flat, with no simulated metallic gradient.
- **Continuity and local exceptions:** the page imports the existing `SiteHeader` and `SiteFooter`; artwork provenance explicitly names the incumbent Mediterranean hero reference, and phase illustrations and Pavao's portrait retain existing asset paths. Rounded panels, pill actions, borders and tonal separation continue the incumbent vocabulary. The global stylesheet already repeats curriculum blues in several scopes and distinguishes decorative gold from CTA gold; that is preexisting implementation variety, not a reason to replace the palette. The new page likewise has local diagram colors and pale-gold dark-panel buttons, so it should not be described as entirely tokenized. No global stylesheet change is required by this documentation review.
- **Responsive rules:** the default wrapper is at most 1200px with 48px side space, reducing to 28px at 1050px and 20px at 760px. At 760px, the hero artwork becomes a separate 270px-tall image below the copy; story, demos, learning preview, instructor, FAQ and PSBT flow stack. The mobile start action accounts for the safe-area inset and is shown only after the hero leaves view and while the final CTA is out of view. At 1500px the hero gains height and the artwork shifts right. These are source-verified rules, separate from the browser checks below.
- **Interaction and motion:** page focus uses a 3px primary outline with a 5px offset. Disclosure content uses native `details`/`summary`. The entropy comparison uses paired linear bars with a previous-to-new ratio of exactly `1/7776`; its text explains why the smaller bar is effectively invisible. Changing the word count replays the growth animation. The page's reduced-motion query disables animation and transitions, while the incumbent global reduced-motion rule disables smooth scrolling on `html`.
- **Content authority:** `src/course-manifest.ts` reads the generated `.cache/course-manifest.json`; `scripts/prepare-course-manifest.mjs` derives that file from the canonical curriculum. It is a delivery projection, not a separately maintained syllabus. Lesson names, links, availability and the first lesson preview therefore follow existing course data. `.agents/product-marketing-context.md` supplies the established calm, practical voice; the user brief supplies this page's first-principles positioning. Asset prompts remain in `public/course/provenance.json` rather than becoming global visual rules.

## Verification

Production build, asset/link verification, curriculum regression tests (33), search tests (11), questions tests (7), and the new landing verification pass. All 98 canonical lesson destinations appear in prerendered HTML. Initial entry JavaScript is 208,733 bytes (uncompressed); marketing metadata is generated from the canonical syllabus before dev/build instead of importing the complete lesson body bundle. The course CSS is included in the prerender head.

Browser checks covered the five-stage story, copy counter, entropy slider, vault controls, attacker assumptions, all three expandable syllabus phases, FAQ disclosure, PSBT workflow, direct first-lesson navigation, and returning-learner link after reload. Responsive iframe widths 320, 390 and 768 pixels had no horizontal overflow; desktop was reviewed at 1363 pixels. These are browser viewport checks, not physical-device testing. The original curriculum and lesson URLs remain unchanged.

The private review deployment contains the static production build. The public btcpavao.com deployment remains governed by the repository's main-branch GitHub Pages workflow. No newsletter or analytics provider was fabricated or activated.
