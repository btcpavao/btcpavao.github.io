# Bitcoin as Money — visual audit

The supplied fourteen-image single-sig/multisig set is the primary visual reference. Its warm opaque paper, thin charcoal contours, muted natural colours, dignified figures, generous negative space and clear spatial relationships belong in this book. Its dense embedded typography does not: the new brief requires important text, exact values and relationships to be accessible HTML or coded SVG. The user’s explicit ImageGen direction overrides the older source-book black-and-white/SVG-only rule for editorial illustration.

## Visual decisions

Each module receives a concept-bearing editorial opening illustration. These are not scenic headers: every one shows a particular household responsibility. The trend and spend/hold/invest illustrations are lower priority because the exact charts and calculators carry more of their teaching. Illustration prompts and alt text are in `bitcoin-as-money-visual-manifest.json`.

| Module | Visual idea | Exact teaching treatment |
| --- | --- | --- |
| Start | A household arranges a usable money system | Rule/ownership explanation; exact illustrative UTXO split if kept; readable journey navigation |
| Budget | Current money receives jobs | Account/category diagram; editable allocations; known-expense monthly provision; explicit free-capital flow |
| Debt | Closing debt restores uncommitted future time | Debt inventory and payoff arithmetic; asset-sale example in HTML; no imaginary future-return chart |
| Giving | A prepared envelope moves toward a real human need | Money-layer denominator, zero-debt gate and 10–20% range calculated in code |
| Living | Everyday payments connect to long-term money | Fiat/conversion/savings layers; timing of known obligations; no implication that all money should sit on an exchange |
| Net worth | Different objects serve different functions | Classification interaction; money/consumption/productive thirds; liquidity examples; exact percentages in code |
| Long-term trend | A map and actual terrain are distinct | Real model chart, market/model comparison, H-time/calendar, implied CAGR and scenario assumptions |
| Spend, hold or invest | Three competing uses have equal visual weight | Decision tree, Bitcoin-denominated returns, own/rent math, same-endpoint/different-path comparison |
| Custody and continuity | Another person can follow the household plan | Custody layers, roles and contingency map; direct Core handoff, no wallet setup tutorial |
| Put it into practice | Written rules become a recurring habit | 30/60/90 plan, self-audit and printable/copyable local policy; checklists remain real controls |

## Guardrails for concept accuracy

- A budget allocation does not change where money is held. Account transfers must not appear as new income or category spending.
- Zero-based means zero unassigned money, not a bank balance of zero. Future pay is not added to today’s available balance.
- Rebudgeting moves a finite amount between jobs. It must not create new money or hide a negative category.
- Known expenses need provision before their due dates. A forecast does not guarantee income will arrive to fund them.
- Free capital is what remains after applicable commitments and reserves. Giving is part of the debt-free system, not a parallel programme started before debt is eliminated.
- Giving’s denominator is the current money layer, not annual income, this month’s salary or the unassigned remainder. Its 1/60 context is separate from the optional large-decision review threshold.
- Debt diagrams must not imply that a sale erases a loan without transaction costs, release arrangements and sufficient proceeds. Numerical examples should expose those assumptions.
- The rule of thirds is a directional balance-sheet discipline: money at least one third; consumption and productive assets each at most one third. Do not render three mandatory equal slices or imply periodic forced selling solely to hit exact equality.
- A home can be valuable while remaining illiquid and consumed by its household. A productive asset is classified by what it actually does, not its owner’s aspirations.
- A model curve and market-price curve must be distinguishable by labels and line style, not colour alone. Mark current/historical snapshots with dates and freshness information.
- A strong purchasing-power period is context for an already justified expense. It is not an automatic buy/sell signal. An advance-payment example must include counterparty risk and liquidity lost.
- Path dependence requires identical start and end prices and different intermediate paths. Show recurring satoshi use as exact calculations; do not use a generated line drawing.
- Both options in own/rent comparisons need all configured costs, remaining BTC and terminal asset value. Insolvency must remain visible; negative BTC cannot masquerade as available wealth.
- A positive fiat return can be a negative BTC return. Show both denominators beside each other and explain the conversion before the formula.
- A custody map is not a secret store. Do not put private keys, passphrases or recovery secrets in policy fields or continuity illustrations.
- Continuity must retain the distinction between practical access and legal authority. The chosen person understanding the plan is necessary but does not by itself determine inheritance law.

## Density and accessibility

All images use intrinsic dimensions and full-composition fitting; no image text is essential to understanding. Captions belong outside the image. Short diagrams should reflow into stacked cards on narrow screens. Longer exact tables may use an explicitly labelled horizontal scroll container, without making the page itself scroll sideways. Every chart needs a textual state summary and a data/table alternative. Illustration colours carry atmosphere rather than sole semantic meaning.

No additional illustration is required beside short personal narrative, caveats, summaries or completion controls. Real controls and concise examples already provide reading rhythm. The visual manifest records these intentional no-visual decisions as well as the selected assets.

## Implementation review boundaries

This audit supplies production briefs and concept checks. A brief-ready asset is not evidence of successful image generation, and a section mapped to a component is not evidence of a passed browser test. The parent implementation pass must update asset paths/status after generation, validate all section references and confirm phone-to-desktop readability in the actual preview.
