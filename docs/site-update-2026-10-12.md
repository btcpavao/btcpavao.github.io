# X articles, curriculum and Debian image announcement — 2026-10-12

## Scope and reconciliation

The published Articles view on @btcpavao contained seven articles. Five were absent from the site and have been republished in full, retaining the author’s argument and original illustrations. Two already had site editions and were not duplicated. Draft X articles were outside scope.

| Published article | X source | Website edition | Images |
| --- | --- | --- | --- |
| Hardware Wallets Are an Economic Security Failure | [Original](https://x.com/btcpavao/status/2109593016272834814) | [Read](https://btcpavao.com/en/bitcoin-core/hardware-wallets-are-an-economic-security-failure/) | 9 |
| Bitcoin Self-Custody Got Weird. It’s Time to Simplify It. | [Original](https://x.com/btcpavao/status/2103475521321365588) | [Read](https://btcpavao.com/en/bitcoin-core/bitcoin-self-custody-got-weird/) | 7 |
| Single-Sig and Multisig from First Principles | [Original](https://x.com/btcpavao/status/2102347005238333800) | [Read](https://btcpavao.com/en/bitcoin-core/single-sig-and-multisig-from-first-principles/) | 12 |
| The Hardware Wallet Detour | [Original](https://x.com/btcpavao/status/2100165007585538461) | [Read](https://btcpavao.com/en/bitcoin-core/the-hardware-wallet-detour/) | 10 |
| We Made Bitcoin Self-Custody Harder Than It Had to Be | [Original](https://x.com/btcpavao/status/2091818647840792941) | [Read](https://btcpavao.com/en/bitcoin-core/we-made-bitcoin-self-custody-harder-than-it-had-to-be/) | 10 |

Already present: **Multisig Is Not a Dollar Amount** ([X](https://x.com/btcpavao/status/2094715645376057371)) and **BIP39 Is Not a Wallet** ([X](https://x.com/btcpavao/status/2090834161221169501)), whose site edition is titled *BIP39 Made the Wrong Thing Human-Readable*.

Web adaptations include semantic headings, an essay contents list, original publication dates and X attribution, responsive local WebP images, source links, related reading, curriculum links, consulting invitations and Value for Value. There are 48 original illustrations, each with a full and smaller rendition (96 image files). Titles, metadata, canonical URLs, sitemap, RSS feed and social cards use the site registry. The homepage now shows the three newest essays.

## Editorial and source verification

This was a separate verification pass after importing the article text. Key incident, wallet and policy claims were checked below. It is not a new audit of every historical assertion in the full article archive. Arguments about attack incentives, targetedness, maintenance cost and the superiority of a particular architecture remain the author’s analysis; they are not presented as measured universal probabilities in the curriculum.

| Claim or boundary | Evidence and result |
| --- | --- |
| Core wallet encryption and backups | [Core 31.1 wallet documentation](https://github.com/bitcoin/bitcoin/blob/v31.1/doc/managing-wallets.md): encryption protects private keys, not all wallet metadata. Added practical context about fresh backups, separate credentials, restore testing and optional outer encryption. |
| Multisig thresholds and recovery | [Core 31.1 descriptors](https://github.com/bitcoin/bitcoin/blob/v31.1/doc/descriptors.md) and Core PSBT documentation support the policy/recovery distinctions. A plain 2-of-3 authorizes any pair, so it does not retain one participant’s unconditional veto. |
| BIP39 derivation and checksum | [BIP39](https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki) checked for entropy/checksum lengths and passphrase-derived wallets. |
| Coldcard entropy incident | [Vendor security status](https://coldcard.com/security/status) and [TRM investigation](https://www.trmlabs.com/resources/blog/the-largest-hardware-wallet-exploit-of-2026-inside-the-usd-116-million-coldcard-hack) support the dated incident account. Fixed the narrower licensing description using [the vendor’s license explanation](https://coldcard.com/about): publicly inspectable firmware under MIT plus Commons Clause. |
| Trezor shipping and email-provider incidents | [ShipMonk notice](https://trezor.io/blog/news/recent-customer-data-exposed-in-shipping-provider-incident) and [Brevo notice](https://trezor.io/blog/news/security-incident-at-brevo-our-third-party-email-provider) support customer-data exposure; that alone is not device or key compromise. |
| BitBox newsletter exposure | [Vendor notice](https://blog.bitbox.swiss/en/email-address-exposure-at-newsletter-provider-brevo/) supports newsletter email exposure, not a compromise of wallet devices. |
| Ledger / CryptoBilis investigation | [Ledger update](https://x.com/Ledger/status/2109331538072494364) and [Bitquery investigation](https://www.bitquery.io/investigations/ledger-cryptobilis-hack). Incident scope and attribution remain under investigation; the article retains suspected/attributed language and the original “over $86 million” lower figure, rather than treating an on-chain estimate as proof of every hardware claim. |
| Tata / iPhone supplier leak | The [Reuters URL](https://www.reuters.com/business/media-telecom/apple-iphone-18-pro-supplier-list-parts-photos-exposed-tata-data-leak-2026-06-29/) was traced through [MacRumors](https://www.macrumors.com/2026/06/29/apple-tata-leak-iphone-18-pro/). Reuters text could not be read because of access/device-verification restrictions. This item was corroborated secondarily, not verified against a readable Reuters body. |
| Mallers “Just use Bitcoin Core” quote | Checked the [video transcript at 1:02:04](https://www.youtube.com/watch?v=LpwGHzUTQ7A&t=3724). Replaced the ambiguous 1:02 timestamp. |
| Live Debian persistence | Clarified that no persistence applies to a live session without configured persistence; backups must survive outside that session. No claim was made that all Debian or all planned images behave identically. |

## Debian announcement

Added [/en/bitcoin-core/debian-images/](https://btcpavao.com/en/bitcoin-core/debian-images/), with three forthcoming roles: minimal offline Core signer; Bitcoin Core Vault for wallet creation/encryption/backup/recovery; and a dedicated online node without browser, email client or unrelated daily applications.

The current build package lists were read directly from the existing core-signer-os configuration. They include Bitcoin Core, KeePassXC, 7-Zip, Arqiver, Thunar, Mousepad, Brasero and CUPS/printer tools. These are described as current build contents, not a frozen release manifest. Installer/support packages are not presented as primary wallet features. No private machine details are published.

No new ISO was released in this change. The page clearly says coming soon and explains that download links, versions, checksums and verification instructions will be added both there and at the matching curriculum steps. The existing independent Core Vault experimental app and older ISO artifacts are not misrepresented as these forthcoming releases.

## Curriculum review matrix

All 99 lessons were reviewed for overlap and gaps against the published articles. Version 4.3 adds material to 23 lessons, including nine ISO callouts. IDs, order, prerequisites, hands-on steps and completion checks are unchanged. The 67-lesson main path and saved progress remain intact. The existing Core 31.1 reference and practical technical-review date were retained: this editorial revision did not rerun the physical labs.

| Lesson | Title | Result |
| --- | --- | --- |
| 1.1 | Self-custody means control and understanding | Reviewed; existing coverage retained |
| 1.2 | Write your threat model before choosing a solution | Added analysis, reading/source links |
| 1.3 | Make the remaining trust visible | Reviewed; existing coverage retained |
| 1.4 | Complexity has a security and economic cost | Added analysis, reading/source links |
| 1.5 | Bitcoin custody does not scale like a gold vault | Added analysis, reading/source links |
| 1.6 | Bitcoin Core is a wallet and your own verifier | Reviewed; existing coverage retained |
| 1.7 | Verification belongs inside the custody model | Reviewed; existing coverage retained |
| 1.8 | Electrum: the trade for an instant start | Reviewed; existing coverage retained |
| 1.9 | Initial block download is a feature of sovereignty | Reviewed; existing coverage retained |
| 1.10 | Keep the verification work you have already done | Reviewed; existing coverage retained |
| 1.11 | One chain, several offline signers | Reviewed; existing coverage retained |
| 1.12 | Why this course starts with general-purpose hardware | Added analysis, reading/source links |
| 1.13 | Generic hardware, dedicated Debian, Bitcoin Core | Added Debian announcement, reading/source links |
| 1.14 | BIP39: a readable root secret and its backup consequences | Reviewed; existing coverage retained |
| 1.15 | Where Core gets its wallet secrets | Reviewed; existing coverage retained |
| 1.16 | Sparrow case study: a valid checksum is not good randomness | Reviewed; existing coverage retained |
| 1.17 | Choose recovery dependencies for 20, 40 or 80 years | Added analysis, reading/source links |
| 1.18 | What this foundation cannot do for you | Added analysis, reading/source links |
| 1.19 | Linux is something you can learn | Reviewed; existing coverage retained |
| 1.20 | Why Debian Stable | Reviewed; existing coverage retained |
| 1.21 | Install Linux and make it yours | Reviewed; existing coverage retained |
| 1.22 | AI is a tutor, not a root of trust | Reviewed; existing coverage retained |
| 1.23 | Make one change you understand | Reviewed; existing coverage retained |
| 1.24 | Freedom creates responsibility | Reviewed; existing coverage retained |
| 1.25 | Start clean | Reviewed; existing coverage retained |
| 1.26 | What exactly am I verifying? | Reviewed; existing coverage retained |
| 1.27 | Before practice: explain your chosen foundation | Reviewed; existing coverage retained |
| 2.1 | Choose one dedicated computer for practice | Reviewed; existing coverage retained |
| 2.2 | Install a small, dedicated Debian system | Added Debian announcement, reading/source links |
| 2.3 | Download Core and check that it is the intended release | Reviewed; existing coverage retained |
| 2.4 | Practice with test coins first | Reviewed; existing coverage retained |
| 2.5 | Check whether you are using test coins or real bitcoin | Reviewed; existing coverage retained |
| 2.6 | Open Core on the Signet practice network | Reviewed; existing coverage retained |
| 2.7 | Keep every block or save disk space with pruning | Reviewed; existing coverage retained |
| 2.8 | Create a wallet used only for practice | Reviewed; existing coverage retained |
| 2.9 | How strong does my wallet passphrase need to be? | Reviewed; existing coverage retained |
| 2.10 | Explore the cost of guessing | Reviewed; existing coverage retained |
| 2.11 | Generate the passphrase with KeePassXC | Added Debian announcement, reading/source links |
| 2.12 | Protect the test wallet with a password and back it up | Reviewed; existing coverage retained |
| 2.13 | Receive test coins and send a small payment to yourself | Reviewed; existing coverage retained |
| 2.14 | Choose coins, fees and the final transaction deliberately | Reviewed; existing coverage retained |
| 2.15 | Rebuild the test wallet from its backup | Reviewed; existing coverage retained |
| 2.16 | Prove that the restored wallet can send | Reviewed; existing coverage retained |
| 2.17 | Lock, unlock and change the wallet passphrase | Reviewed; existing coverage retained |
| 2.18 | See what the GUI is asking Core to do | Reviewed; existing coverage retained |
| 2.19 | Repeat until the wallet lifecycle feels ordinary | Reviewed; existing coverage retained |
| 2.20 | Check that you completed the whole practice cycle | Reviewed; existing coverage retained |
| 2.21 | Find the wallet data that needs a backup | Reviewed; existing coverage retained |
| 2.22 | Keep backups separate and up to date | Added analysis, reading/source links |
| 2.23 | Understand what an encrypted backup still reveals | Added analysis, Debian announcement, reading/source links |
| 2.24 | Choose backup media by failure mode | Added Debian announcement, reading/source links |
| 2.25 | Recover after losing the local wallet or a backup device | Reviewed; existing coverage retained |
| 2.26 | Checkpoint — prove backup and recovery | Reviewed; existing coverage retained |
| 2.27 | Mastery checkpoint — I can operate one Core wallet | Reviewed; existing coverage retained |
| 2.28 | Separate the jobs you already know | Added analysis, reading/source links |
| 2.29 | How the online computer and offline signer work together | Added Debian announcement, reading/source links |
| 2.30 | Three wallet roles you will encounter | Reviewed; existing coverage retained |
| 2.31 | Transfer payment files safely between the computers | Reviewed; existing coverage retained |
| 2.32 | Know when physical tampering means you should stop | Reviewed; existing coverage retained |
| 2.33 | Prepare the offline signer and check it after shutdown | Added Debian announcement, reading/source links |
| 2.34 | Connect the wallets using public descriptors | Reviewed; existing coverage retained |
| 2.35 | Build online, sign offline, return and broadcast | Reviewed; existing coverage retained |
| 2.36 | Replace both computers and repeat the payment | Reviewed; existing coverage retained |
| 2.37 | Write a recovery guide someone else can follow | Added analysis, reading/source links |
| 2.38 | Before maintenance: operate without the original signer | Reviewed; existing coverage retained |
| 2.39 | Review the custody system every year | Added analysis, reading/source links |
| 2.40 | Make recovery understandable to another person | Reviewed; existing coverage retained |
| 2.41 | Master the simple system before adding a spending policy | Reviewed; existing coverage retained |
| 2.42 | Optional: generate the passphrase with physical dice | Reviewed; existing coverage retained |
| 2.43 | Optional: put the backup inside an encrypted container | Reviewed; existing coverage retained |
| 2.44 | Move to real Bitcoin — deliberately | Reviewed; existing coverage retained |
| 2.45 | Start a new wallet for real bitcoin | Reviewed; existing coverage retained |
| 2.46 | Create the real wallet and its password offline | Added Debian announcement, reading/source links |
| 2.47 | Restore the empty real wallet before depositing | Reviewed; existing coverage retained |
| 2.48 | Check the setup before a small real-bitcoin test | Reviewed; existing coverage retained |
| 2.49 | Send a small real payment from the restored wallet | Reviewed; existing coverage retained |
| 2.50 | Reuse your own block files and rebuild validation state | Reviewed; existing coverage retained |
| 2.51 | Optional: use Tails as the offline operating system | Reviewed; existing coverage retained |
| 2.52 | Optional: keep a small spending wallet online | Reviewed; existing coverage retained |
| 3.1 | Multisig is a spending policy, not a backup strategy | Added analysis, reading/source links |
| 3.2 | Count the cost of three vendor ecosystems | Added analysis, reading/source links |
| 3.3 | Write the policy in ordinary language first | Added analysis, reading/source links |
| 3.4 | Make a reproducible, disposable experiment | Reviewed; existing coverage retained |
| 3.5 | Run the Core 31.1 laboratory | Reviewed; existing coverage retained |
| 3.6 | Use RPC only when you need its precision | Reviewed; existing coverage retained |
| 3.7 | Separate node state from wallet state in RPC | Reviewed; existing coverage retained |
| 3.8 | Read and verify a descriptor | Reviewed; existing coverage retained |
| 3.9 | Inspect the PSBT before adding signatures | Reviewed; existing coverage retained |
| 3.10 | Build and spend a 2-of-3 policy | Reviewed; existing coverage retained |
| 3.11 | Back up the policy as well as the keys | Reviewed; existing coverage retained |
| 3.12 | Test the missing-signer cases | Added analysis, reading/source links |
| 3.13 | Did the extra signers earn their place? | Added analysis, reading/source links |
| 3.14 | Taproot is an output format, not an automatic quorum | Reviewed; existing coverage retained |
| 3.15 | Inspect a Taproot descriptor and its actual spending authority | Reviewed; existing coverage retained |
| 3.16 | Add a delayed recovery path only when you mean it | Reviewed; existing coverage retained |
| 3.17 | Test every permitted path and every intended rejection | Reviewed; existing coverage retained |
| 3.18 | Before adopting a policy: justify and recover it | Reviewed; existing coverage retained |
| 3.19 | Optional: Core Explorer as an advanced interface | Reviewed; existing coverage retained |
| 3.20 | Ask a technical question without exposing a wallet | Reviewed; existing coverage retained |

## Validation

- Production build, TypeScript and static prerender: 20 public routes plus 404, sitemap and feed.
- Site verification: 2,585 internal links, 99 lesson destinations, 26 HTML files and llms.txt; existing 38 responsive image sets.
- Additional asset check: all 48 imported illustrations and their 48 small variants exist and match declared dimensions; imported HTML is restricted to safe tags/attributes and URL schemes.
- Curriculum checks: 27 passed; search checks: 11 passed; question component checks: 7 passed. No question was sent.
- Before/after comparison of all 99 lessons confirms only additive notes, sources, callouts and content-update dates changed.
- Targeted ESLint and git diff whitespace checks passed.
- Desktop (1280 × 720) and mobile (390 × 844): five essays, Debian page, homepage, Core hub and curriculum overview fit the viewport without horizontal overflow. Checked direct lesson links, expanded new notes and ISO callouts. Article hydration was fixed and checked on fresh mobile loads.
- Existing source-reviewed/practical-validation labels retain their earlier meaning. This update does not certify the forthcoming ISO builds.
