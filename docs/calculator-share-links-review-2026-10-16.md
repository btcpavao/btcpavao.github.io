# Calculator example links — 16 October 2026

Added “Copy example link” to the shared calculator in the wallet guide and the passphrase-strength and brute-force-economics curriculum lessons.

The versioned `calculator` query parameter includes word count, wordlist, GPU count, guesses per second per GPU, power per GPU, electricity price and hourly rental. The guide link targets the calculator directly; curriculum links retain their lesson route. Opening a valid example overrides remembered calculator settings and saves the example for use across the guide and curriculum. The parameter is then consumed with `replaceState` so later edits and Reset are not undone on refresh or remount. Other query parameters and the lesson hash are preserved. No course progress is changed.

Malformed, incomplete, duplicate and unsupported-version payloads are ignored atomically. Empty numeric drafts cannot be shared. Copy success is announced visibly and through a status region; clipboard failure exposes a selected, read-only link for manual copying. Calculations and educational recommendations are unchanged.

## Verification

- Build, targeted ESLint and whitespace checks pass.
- All 32 curriculum checks pass, including round-trip serialization, remembered-value precedence, reset/remount behavior, invalid payload rejection and blocked storage.
- Assets and links pass: entry JS remains 359,215 bytes; 2,563 internal links and 98 lesson destinations verified.
- Local IAB: copied an eight-word EFF example with 25 GPUs, 40,000 guesses/second, USD 1.25/hour, 0.8 kW and USD 0.2/kWh; reset stored settings and opened the copied link in a new tab. All seven values restored exactly. Reset survived reload.
- Local IAB: curriculum copy/open preserved the passphrase-strength lesson and eight-word setting. Copy works via Enter. Empty GPU input disables sharing and displays validation.
- All three placements inspected at desktop (1280 px) and mobile (390 px). No horizontal document overflow; calculator frame padding is 24 px desktop and 20 px mobile, action targets are at least 44 px high. Browser console had no errors.
- Screenshots saved in `../site-update-2026-10-16/` outside the repository: guide desktop/mobile and curriculum mobile.

The manual-copy fallback was reviewed in source; the test browser allowed clipboard writes, so denied-clipboard behavior was not forced in browser QA.

## Shared-link arrival follow-up

A valid shared example now scrolls directly to the calculator and moves keyboard focus to its heading after the curriculum finishes its lesson-opening effect. The lesson hash remains intact. Scrolling is immediate, with a 24 px calculator margin in addition to the site's 80 px fixed-header scroll padding. This applies to both curriculum lessons and the wallet guide.

An accessible status message above the slider reads “Settings loaded from shared link.” for eight seconds, or until settings are edited/reset. Arrival state is transient and never persisted. Ordinary page loads and malformed links do not trigger the message or calculator scroll. Immediate React development remounts preserve the same arrival; an old dismissal timer cannot clear a newer arrival.

Validation: all 32 curriculum checks, build, targeted ESLint, assets/internal links and whitespace checks pass. The existing shared-link test now also covers transient arrival state, immediate remount, editing, dismissal and stale-timer protection. IAB checks confirmed both curriculum lessons and the guide scroll to approximately 104 px below the viewport top, restore selected settings and focus the calculator heading. The message disappears without changing settings. A normal curriculum URL opens at scroll position 0 with focus on the lesson title and no arrival message. Desktop/mobile frame padding remains 24/20 px, with no horizontal overflow or console errors.

## Copy summary and link follow-up

Added “Copy summary + link” beside the existing link-only and reset buttons in all three calculator placements. It copies the selected word count, two-decimal entropy, wordlist, GPU count, per-GPU speed and rent, estimated average elapsed time, estimated average total GPU rental and the existing reproducible example URL. Amounts use the same full decimal numbers and English words as the UI; time conversion is now a shared helper used by both screen and clipboard. The summary identifies the result as an illustrative average under ideal parallel scaling. No calculation or recommendation changed.

Both copy buttons reject incomplete numeric drafts. Success is announced through the existing status region; if clipboard access fails, the full selected summary and URL are exposed in a read-only textarea for manual copying. This fallback was reviewed in source, not forced in the browser.

Validation: build, targeted ESLint, whitespace checks, assets and links pass; all 33 curriculum checks pass. The new check covers the known three-word EFF / 25-GPU example (38.77 bits, approximately 2.72 days and USD 2,040), preserved settings in the copied URL, unchanged total rent when GPU count alone increases, zero rent and extreme supported inputs without exponent notation. IAB clipboard inspection confirmed the full multiline text matches the displayed result, including the eight-word case with large totals; activating the button with Space also copied the changed result. Reset then opening the URL extracted from the summary restored the example. The link-only action still copies only a URL. Empty GPU input disables both copy actions. All three placements were inspected at 1280 px and 390 px; frame padding stays 24/20 px, targets exceed 44 px, and no horizontal overflow or console errors were observed. The entry bundle remains 359,215 bytes.
