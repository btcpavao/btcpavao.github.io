# Bitcoin as Money — implementation and migration

This review branch adds an open native-English interactive book under `/en/bitcoin-standard/`. It does not deploy to btcpavao.com. Merge and production deployment remain a separate review step.

## Authoritative material

- The current maintained Croatian chapters `00-predgovor.md` through `08-trideset-godina-kasnije.md` in `btcpavao/bitcoin-kao-novac-source`, fetched from upstream tree `396c92cfa7f78696fa79ee824c27cc29fb878e0e` on 18 September 2026. No older PDF or English draft was substituted.
- The supplied implementation brief governs the web structure, native-English adaptation and conceptual custody boundary.
- The fourteen supplied single-sig/multisig PNGs and their prompt/generation manifests govern the editorial illustration style. New illustrations are original generated assets; exact diagrams and all financial charts are coded.
- Existing btcpavao.com architecture and Core curriculum at base commit `3efa3da615f1b33e978c224d9146f413e17d9642` provide navigation, metadata, static rendering and cross-links.

## Mapping

| Current Croatian source | New English destination | Treatment |
| --- | --- | --- |
| `00-predgovor.md` | `start`, `put-it-into-practice` | Author's journey, intended readers, conviction-versus-system distinction, electricity-era responsibility analogy expressed as practical responsibility; sequence and final ordinary-hour action preserved. |
| `01-zasto-bitcoin-kao-novac.md` | `start`, parts of `living` | Money/wealth, salability, fiat credit, hard-money thesis, double spending, nodes/miners, issuance, proof of work, keys, UTXOs, change and fees, mempools, confirmations, monetary optionality and volatility consolidated. |
| `02-proracun.md` | `budget`, `living` | Zero-based budgeting, accounts/categories, tracking versus spendable funds, transactions, transfers, reconciliation, variable income, future costs, business separation, reports and review rhythms. Added explicit web teaching around free capital and conversion. |
| `03-dug.md` | `debt`, `living`, `long-term-trend` | Zero-debt standard includes mortgages/business/leases/family borrowing; selling assets including BTC; full housing/location transition; psychological/time costs; bank-credit money creation; repayment methods after asset review; focused cleanup. Trend/prepayment material moved out of debt for coherent sequencing. |
| `04-davanje.md` | `giving`, `put-it-into-practice` | After zero debt; actual money category at 10–20% of current total money, not income; planned/open directions; stock-versus-flow and replenishment taught explicitly; free-market value creation, boundaries, scams, gift/loan/work distinction, continuing usefulness and household agreement. |
| `05-ravnoteza-imovine.md` | `net-worth`, `living`, `spend-hold-invest` | Conservative net-worth map, three asset functions, mixed-use classification, home as consumption, illiquidity, business concentration, thirds as compass, durable quality and total ownership cost. |
| `06-bitcoin-kroz-vrijeme.md` | `long-term-trend`, `spend-hold-invest` | Price/trend/deviation, log versus source root scaling, block time, H, PL0, model limits, above/near/below questions, 1/60 decision threshold, Bitcoin return, investment thesis, scenarios, time cost, delegation and diversification. Own/rent and explicit path-dependence teaching expanded under user brief. |
| `07-skrbnistvo-i-sigurnost.md` | `custody-continuity` | Financial/operational layers, counterparty risk, map versus secrets, legal authority versus technical ability, business separation, family understanding, incapacity/death and review retained. Detailed technical implementation replaced by Core handoff. |
| `08-trideset-godina-kasnije.md` | `put-it-into-practice` | Ana's kitchen table; Marko/Ivana's family literacy and later debt-free home; Marin/Petra's robust workshop, restraint and mentoring; wider hopes around banking, food, land, education, science, energy, technology and institutions condensed into an explicitly possible future. First-hour ending retained. Added practical audit, 30/60/90-day sequence and written policy. |


## Content decisions

The ten chapters retain the household arcs and long-horizon ending. New prose is written for English rather than sentence-by-sentence translation. Overlapping source passages are consolidated. Later household passages that conflicted with the revised debt/giving chapters are reconciled: systematic giving follows zero debt; its 10–20% denominator is current total money. The thirds rule remains a compass (at least one third money; at most one third in each other category). The giving diagnostic and large-decision 1/60 threshold are explained separately.

Future price examples are explicitly hypothetical, with consistent currencies. Rent prepayment covers only its actual paid period. Technical custody implementation is replaced by direct Core links, including backup mastery and household continuity. Each structured chapter has stable section IDs, examples, checks, summary and `video: null`; no empty video placeholders are shown.

## Model migration and provenance

`src/book/model/power-law.mjs` is the original published model module from `https://bitcoin-savjetovanje.com/dugorocni-trend/graf/model.mjs`. Its SHA-256 is `40dc943dcfbe3b5ab112fba9281e2255065f15622908e6f1d09cb6c37deb3e26`. Chart curves, H/calendar conversion and decision-tool targets share this single source of model constants.

`public/bitcoin-as-money/model-data.json` is the original `bitcoin-wave-rootchart-v1.json` dataset from the same directory. SHA-256: `3f8ccff76fb77b786301bf8499abba1c685e1dbd60ab036397a2a7f2c6a4c93a`. It contains 6,035 historical observations and 4,800 model calendar entries, version `bitcoin-wave-rootchart-2026-07-15`, captured `2026-07-15T11:02:53.233Z` from Bitcoin Wave. The source provenance and hashes remain embedded. Early rounded-zero prices are recovered from the source root values for tabular display.

The native chart adds keyboard-accessible pan/zoom controls, PL levels, optional wave bands, date/H/height selection, H-clock, scheduled issuance, a paginated historical table and dated market/model comparisons. It preserves the original root scale (exponent 5.4), rather than mislabelling it logarithmic. One-, five-, ten- and thirty-year CAGR distinguishes market-to-model from model-only growth. Out-of-range selected calendar inputs fail explicitly. Forward CAGR targets beyond the published calendar use the original forward mapper’s target ten-minute block interval and are visibly marked as extrapolated; they never silently clamp to 2055.

The bundled market snapshot is a dated reference, never a live claim. Explicit quote refresh uses the existing public Bitcoin Savjetovanje JSON endpoint; no DOM scraping or personal inputs are sent. Price age is limited to 15 minutes before it is marked stale; stale chain heights are discarded. A new quote is an isolated chart point, not an invented continuation of the historical series. The original Bitcoin Savjetovanje site is untouched.

## Own or Rent generalization

`src/book/decision-math.mjs` adapts the existing September 2026 vehicle calculator and preserves its original eight regression checks in `tests/original-vehicle.test.mjs`. Car, home, equipment and custom presets share pure cash-flow functions. Purchase and ownership fields explicitly include applicable fees/costs; the revised book uses USD throughout. A single starting BTC/USD price now supplies both the BTC conversion and market-to-model growth calculation.

Both paths start with the same BTC balance. Upfront costs occur at time zero; recurring payments occur at month end; ownership ends with the entered resale proceeds. There is no borrowing or future salary contribution. Rent escalation compounds smoothly each month from its annual assumption. Residual value is not used to fund earlier bills. Funding failure suppresses final wealth instead of displaying negative BTC as money.

Outputs include nominal costs, opportunity costs, final wealth, minimum funded balances, break-even resale, a bounded break-even growth scan, rate sensitivity, residual ±20% sensitivity and equal-endpoint path comparison. One-month paths have no invented intermediate dip. Negative growth can make the 50% waypoint less severe than the smooth decline, so the explanation reflects the actual result. Break-even roots are mathematical boundaries, never expected returns.

## Architecture and privacy

Prose lives in `content/bitcoin-as-money/chapters/*.json`; reusable UI and pure math live in `src/book/`. Exercise code loads on approach, and decision/trend modules are split further. Responsive WebP illustrations have explicit dimensions and 800/1600px variants. The visual audit and per-section manifest are adjacent to this document.

Only chapter checkmarks, completion and last chapter use localStorage (`btcpavao:bitcoin-as-money:v1`). Financial figures and policy text are not persisted or sent to a server. Policy export is a local text download with a complete copyable-text fallback. Storage failure falls back to session memory. Completion states explicitly mean a reader's own assessment.

## Validation and review boundaries

- 26 unit/regression tests cover original car results, zero/custom growth, early drawdown, equal endpoints, funding limits, break-even values, upfront fees, recurring costs, escalation, date boundaries, model targets, missing data and stale snapshots.
- TypeScript, ESLint and the production build pass. Static generation produces 25 total site routes, including 11 book routes with canonical metadata and sitemap entries.
- Existing asset, curriculum, search and question-form contract checks pass; the book tests are added to the existing PR workflow.
- Browser review checks ten chapter layouts at 360, 430, 768, 1440 and 1920px, plus exercise behavior and persisted progress. Visual inspection corrected an interaction between book styles and the shared site header.

## Follow-up items

- Author review of the complete English adaptation and generated illustrations before production merge.
- The historical series remains the documented July 2026 snapshot. Updating the quote does not refresh the historical series; future data updates should retain their provenance and regression checks.
- The first decision tool intentionally omits financing, tax advice, stochastic returns and domain-specific income streams. Enter comparable all-in cash costs; follow-up domain presets can add tested fields without changing the underlying comparison.
- Browser interaction checks passed for keyboard budget allocation, completion after reload, reset, calculator underfunding/zero growth, chart zoom/H4 selection, historical tables, 30-year extrapolation and policy text disappearing after reload. Policy download could not be confirmed by the cloud browser’s download event; the complete copyable fallback was verified.
- The public quote endpoint returned a valid live JSON response from the build environment. Refresh was unavailable in the review browser; the dated fallback and failure label were verified. Confirm live refresh from the final public domain before merge.
- Future chapter videos can be added through existing metadata. Professional legal/tax implementation and physical custody testing remain outside this educational site's validation.

## Author-requested editorial revision

The September 18 review removes the author byline, applies Geist sans serif throughout the book, and uses US household names consistently: Emily; Michael and Sarah; David and Rachel; Jessica and James. Teaching amounts are now USD examples with the same arithmetic, rather than claimed historical exchange-rate conversions. Dollar formatting and calculator labels match. The duplicate market-price input and EUR/USD assumption are removed from the decision tool.

Repeated defensive disclaimers and generic advice warnings have been removed from prose and interactive copy. Concrete definitions, calculation inputs, funding failures, source dates and privacy behavior remain part of the explanation. Existing chapter/section URLs and saved chapter-completion identifiers are preserved.
