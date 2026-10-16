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
