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
