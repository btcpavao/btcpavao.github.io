# Six- and eight-word passphrases: verification, 2026-10-14

Scope: updated recommendation and comparison in the wallet guide, curriculum, and related article passages. Generation and verification were separate passes. Historical implementation evidence remains in `self-custody-v4.1-keepassxc-evidence.json`; no physical Debian installation or wallet cracking test was performed for this edit.

## Verified inputs

- KeePassXC 2.7.10 official `eff_large.wordlist`: 7,772 entries, all distinct after lowercase conversion. SHA-256 `df895130803573b14caa684e8cba982a9ed21f4898c98c711f204acf600efedd`, matching the repository's earlier Debian-package evidence. Re-fetched and counted independently in Python.
  Source: https://raw.githubusercontent.com/keepassxreboot/keepassxc/2.7.10/share/wordlists/eff_large.wordlist
- `PassphraseGenerator.cpp` selects a new random index per word, permitting repeats, and computes entropy as word count times log2(list size). `Random.cpp` uses rejection sampling before the remainder operation. The formula assumes independent uniform selections and a working random source, not human-selected phrases.
  Sources: https://github.com/keepassxreboot/keepassxc/blob/2.7.10/src/core/PassphraseGenerator.cpp and https://github.com/keepassxreboot/keepassxc/blob/2.7.10/src/crypto/Random.cpp
- A first-hand Hashcat 7.0.0 result posted August 6, 2025 reports 32,880 H/s for one RTX 4090, mode 11300 Bitcoin/Litecoin wallet.dat, reported iterations 200459. This is a published benchmark, not our measurement or a universal wallet rate. The post mentions optimized-kernel password-length limits and a reply notes possible CUDA speed improvements. The page explicitly qualifies extrapolation by wallet derivation settings, candidate length, software and hardware.
  Source: https://hashcat.net/forum/thread-13338-post-63594.html
- Runpod's RTX 4090 page headline showed USD 0.89/hour when checked October 14, 2026. The page also contains an inconsistent older lower-price mention. We use the headline only as a dated illustrative input, not a lowest-price claim, provider quote for cracking, or promise of availability. Actual prices can be lower or higher.
  Source: https://www.runpod.io/gpu-models/rtx-4090

## Independent calculations

Python integer search spaces and floating-point calculations were compared with the TypeScript model. Automated checks cover the ratio and formatted values.

| Words | Selection entropy | Mean years at 32,880 guesses/s | Mean GPU rental at USD 0.89/hour |
| --- | --- | --- | --- |
| 6 | 77.54442111351207 bits | 106,201,580,488.30782 | 828,557,118,558,850.6 dollars |
| 8 | 103.39256148468276 bits | 6,414,998,568,590,458,000 | 50,048,150,932,514,910,000,000 dollars |

Displayed values are approximate, rounded to three significant digits, using English short-scale names. There is no exponential notation for monetary values. Time uses 365.25 days/year. Average search assumes a uniformly distributed secret and non-repeating candidate enumeration: approximately half the space. Full-space search is twice that model average.

Two words add 25.84814037117069 bits and multiply the search space by 60,403,984. At an unchanged rate and price per guess, this multiplies time and cost by the same factor. Ideal linear parallelization reduces elapsed time without reducing total GPU rental expenditure. Real scaling can differ.

The million-dollar house and billion-dollar infrastructure project are explicitly hypothetical prices. Their equivalent quantities are cost divided by the stated price, not market valuations or claims that those quantities can exist or be purchased.

The separate interactive electricity view assumes 0.55 kW and USD 0.15/kWh. These are labeled assumptions, not measured benchmark power. Rental and electricity are alternatives, not summed. Rental totals omit storage, taxes, and other overhead. None of the immense time/cost projections are feasible spending plans or predictions of future technology. The benchmark applies to Core wallet guessing, not 7z or KeePassXC database encryption.

## Editorial decision and limits

Six words is the user's requested recommendation; eight is the extra-margin option when two more words are comfortable to memorize. Shorter phrasing reduces the number of words to handle; improved memorability for a particular person is not guaranteed or asserted as a measured research result. Both methods require KeePassXC on the prepared trusted computer and an independently protected recovery record. Additional entropy does not prevent malware, disclosure or backup loss.

Removed the dice lesson and all dice recommendations from the live curriculum and guide, plus inconsistent recommendation sentences in linked essays. The historical progress manifests remain immutable. Old dice lesson bookmarks resolve to the KeePassXC lesson. Existing screenshots illustrating eight words are explicitly labeled as the optional setting.

Confidence: high for source counts, formulae, arithmetic and transcription of the cited benchmark. The rental input is an explicit assumption with a dated source; projections are conditional, not a security guarantee. No new physical wallet or Linux-runtime certification is claimed.

## Parallel-GPU calculator verification

Rechecked after the parallel calculator edit with Python `Decimal` at 80-digit precision, separately from the TypeScript implementation. For GPU count G, per-GPU rate r, per-GPU hourly rental c, and search space N = 7,772^words:

- Average elapsed seconds = N / (2 × r × G).
- Full-search seconds = N / (r × G).
- Average GPU-hours = average elapsed seconds / 3,600 × G = N / (2 × r × 3,600).
- Average rental = average GPU-hours × c.
- Average electricity = average GPU-hours × per-GPU kW, including an assumed host share. Electricity-only cost multiplies this by USD/kWh.

The cancellation of G is intentional: with identical GPUs, fixed per-GPU rates and prices, and ideal linear scaling, total work and cost are unchanged. The implementation derives invariant totals from the single-GPU calculation so floating-point roundoff cannot make cost drift with GPU count. It divides elapsed time and multiplies aggregate throughput, hourly rental and power. Real coordination, duplicated work, rental minimums, hardware availability and other overheads are excluded and disclosed.

| Words | GPUs | Average years (high-precision reference) | Average rental, USD (reference rounded to cents) |
| --- | --- | --- | --- |
| 6 | 1 | 106,201,580,488.307815646693 | 828,557,118,558,850.62 |
| 6 | 1,000 | 106,201,580.488307815647 | 828,557,118,558,850.62 |
| 8 | 1 | 6,414,998,568,590,457,483.397772779973 | 50,048,150,932,514,915,766,523.74 |
| 8 | 1,000 | 6,414,998,568,590,457.483397772780 | 50,048,150,932,514,915,766,523.74 |

The earlier table used ordinary floating point; the insignificant last-digit differences above are resolved by high-precision arithmetic and do not affect any three-significant-digit public result. At 1,000 GPUs the public average times are 106,000,000 years and 6,410,000,000,000,000 years. Costs remain USD 829,000,000,000,000 and USD 50,000,000,000,000,000,000,000.

Automated checks cover counts 1, 10, 1,000 and 1,000,000 for both word counts; aggregate throughput/rental/power; half/full search; GPU-hours; invariant electricity/rental totals; the 60,403,984 ratio; invalid counts; very small decimal amounts; and rounding across named-number scale boundaries. GPU input accepts integers from 1 through 1,000,000. Other public inputs are capped at 1,000,000,000,000; all arithmetic runs before display rounding. No passphrase or wallet data is accepted or sent.

Local UI verification: calculator, passphrase-strength lesson and wallet guide inspected at 1280×720 and 390×844 in the Codex in-app browser. Document scroll width equals viewport width; comparison panels have 24px desktop and 20px mobile padding. Checked side-by-side/stacked results, pictograms and calculation steps. UI checks confirmed 1,000 and 1,000,000 GPU results, preset selection, keyboard increment, rejection of zero/fractional/empty counts, doubled rental when the per-GPU price doubles, and full-search/electricity details. Production build, ESLint, 28 curriculum checks, 11 search checks and asset/internal-link verification passed.
