# Word-count calculator review — 2026-10-15

The cost-of-guessing lesson now exposes a 1–12 word slider, initially six words. The main view contains the word count, entropy, average elapsed time, total GPU rental cost, and hypothetical million-dollar-house / billion-dollar-project equivalents. Attack settings, derivation, comparisons, sources and limitations are collapsed by default. No secret is requested or generated.

## Independent mathematical review

For a list of W distinct words and n independent uniform selections (repetition allowed), the space is W^n and entropy is n × log2(W). Approximate average work is half the space, while full search visits the whole space once. With G independent GPUs, rate R guesses per GPU-second and rent C USD per GPU-hour:

- Average seconds = W^n / (2 × G × R).
- Average GPU-hours = W^n / (2 × R × 3,600).
- Average rental = average GPU-hours × C.

More GPUs divide elapsed time and leave total work and rental unchanged under this ideal linear model. A faster per-GPU rate lowers time and cost; higher hourly rent increases cost. No rounding is applied until presentation.

Independent Python Decimal calculations with 60-digit precision, original EFF list W = 7,776, n = 3, R = 32,880 and C = USD 0.89:

- Entropy: 38.774437510817342721806084159217 bits.
- Average time with one GPU: 7,150,014.972262773722627737226277 seconds, approximately 82.8 days.
- Average time with 1,000 GPUs: 1.986115270072992700729927 hours.
- Average rental in either case: USD 1,767.642590364963503649635036496350; rendered as approximately USD 1,770.

The test suite compares all 1–12 word settings for both lists against integer search spaces computed using BigInt, at 1, 1,000 and 1,000,000 GPUs. It also checks the independent decimal reference, per-word growth, zero rental, invalid settings, rate/rental scaling and non-exponential dollar formatting.

## Source and claim review

- Original EFF list: https://www.eff.org/files/2016/07/18/eff_large_wordlist.txt — official file opened 2026-10-15; 7,776 entries. This is a wordlist reference, not a recommendation to use dice.
- Course default: KeePassXC 2.7.10 bundled list, 7,772 distinct entries, previously counted and hashed in `passphrase-choice-factcheck-2026-10-14.md`. This is version-specific, not a claim about every KeePassXC release.
- https://hashcat.net/forum/thread-13338-post-63594.html — the reported RTX 4090 / Hashcat 7 benchmark for mode 11300 is 32,880 H/s with 200,459 iterations. This is not a measured rate for the reader's wallet or every candidate length.
- https://www.runpod.io/gpu-models/rtx-4090 — the headline USD 0.89/hour remains a dated illustrative input; other text on the page lists a different rate. No claim of a cheapest price, available large fleet or live quotation is made.

The course retains six words as its baseline and eight when the extra memorization is comfortable. Labels describe course guidance, not a reproduction of KeePassXC's password-quality rating. An attacker budget is not a guarantee of safe funds, and a Core wallet benchmark does not estimate a .7z archive or a KeePassXC database.

Amounts use three significant digits, full decimal notation and English words. The main equivalent counts are compact; fractions below one thousandth of a reference item display “< 0.001” rather than long runs of zeros. Expanded details retain the formulas and fuller comparisons.

## Validation

- Build, targeted ESLint, 29 curriculum checks and 11 search checks pass.
- Asset and internal-link checks pass; the entry bundle remains 359,215 bytes.
- Codex in-app browser: verified range keyboard Home/End/arrows, pointer drag at a 390px mobile viewport, six/eight presets, list switching, 1,000 GPU preset, doubled rate/rent and invalid GPU recovery.
- Desktop 1,280px and mobile 390px: no document overflow; calculator padding 24px / 20px. Tested long twelve-word outputs and compact six-word outputs. Numeric groups wrap at commas and entropy uses the foreground text color.

## Shared placement follow-up

The identical calculator now appears in wallet-guide step 4 and the curriculum's `passphrase-strength` lesson, as well as `brute-force-economics`. It is extracted into `components/passphrase-explorer.tsx` and imported by each placement. The previous static six/eight-word comparison and separate entropy table were removed; recommendation prose remains in the guide and lesson. The calculator function body was checked byte-for-byte against the previously deployed implementation after its export rename.

Build, targeted ESLint, 29 curriculum checks, 11 search checks, assets and internal links pass. Both new placements were inspected in Codex's in-app browser at 1,280px and 390px widths, with no horizontal document overflow. Verified keyboard changes, six/eight presets, collapsed settings by default and the wallet-guide GPU presets. Calculator padding remains 24px desktop / 20px mobile; shared settings use 24px / 16px. The entry bundle remains 359,215 bytes.
