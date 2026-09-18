import test from "node:test"
import assert from "node:assert/strict"
import { readFileSync } from "node:fs"
import {
  compare,
  atRate,
  factorsForGrowth,
  addMonths,
  investmentReturn,
  breakEvenRates,
} from "../src/book/decision-math.mjs"
import {
  createDateMapper,
  powerLawPrice,
  priceToRoot,
  rootToPrice,
  validateDataset,
} from "../src/book/model/power-law.mjs"
import {
  hAtDate,
  modelGrowth,
  hTime,
  issuance,
  parseSnapshot,
} from "../src/book/model/helpers.mjs"
const dataset = validateDataset(
  JSON.parse(
    readFileSync(
      new URL("../public/bitcoin-as-money/model-data.json", import.meta.url)
    )
  )
)
const v = {
  purchase: 34490,
  rent: 745,
  ownership: 150,
  residual: 17245,
  upfront: 0,
  capital: 50000,
  months: 60,
  escalation: 0,
}
const near = (a, b, tolerance = 1e-6) =>
  assert.ok(Math.abs(a - b) < tolerance, `${a} != ${b}`)
test("rent escalation independently sums the monthly payments", () => {
  const x = atRate({ ...v, escalation: 12 }, 0)
  let cost = 0
  for (let i = 0; i < 60; i++) cost += 745 * 1.12 ** (i / 12)
  near(x.nominalRent, cost)
  near(x.requiredRent, cost)
})
test("one-month and fifty-year durations stay finite; one-month stress has no invented dip", () => {
  for (const months of [1, 12, 120, 600]) {
    const x = atRate({ ...v, months }, 0.1)
    assert.ok(Number.isFinite(x.requiredBuy))
  }
  assert.deepEqual(factorsForGrowth(1.1, 1, true), [1, 1.1])
})
test("invalid finite bounds and missing financial inputs reject", () => {
  for (const bad of [
    { months: 0 },
    { months: 601 },
    { purchase: Infinity },
    { rent: NaN },
    { capital: -1 },
    { escalation: -100 },
  ])
    assert.throws(() => atRate({ ...v, ...bad }, 0.1))
  assert.throws(() => compare(v, [1, 0]))
})
test("required balance funds all payments, tiny balance cannot borrow", () => {
  const a = atRate(v, 0.12)
  const b = atRate({ ...v, capital: a.requiredBuy }, 0.12)
  assert.notEqual(b.buyEnd, null)
  near(b.buyEnd, v.residual, 1e-5)
  const c = atRate({ ...v, capital: 0 }, 0.12)
  assert.equal(c.buyEnd, null)
  assert.equal(c.rentEnd, null)
  assert.ok(c.balances.every((x) => x.buy === null))
})
test("larger recurring costs independently worsen ownership", () => {
  const a = atRate(v, 0.1),
    b = atRate({ ...v, ownership: 250 }, 0.1)
  assert.ok(b.buyCost > a.buyCost)
  near(a.rentCost, b.rentCost)
})
test("resale break-even and rate break-even equalize costs", () => {
  const a = atRate(v, 0.2)
  near(atRate({ ...v, residual: a.residualBreak }, 0.2).advantage, 0, 1e-5)
  for (const r of breakEvenRates(v).roots) near(atRate(v, r).advantage, 0, 1e-5)
})
test("same endpoint does not mean same BTC withdrawals", () => {
  const a = compare(v, factorsForGrowth(2, 60)),
    b = compare(v, factorsForGrowth(2, 60, true))
  near(a.g, b.g)
  assert.ok(b.requiredRent > a.requiredRent)
  assert.ok(b.requiredBuy > a.requiredBuy)
})
test("calendar boundaries clamp month ends without accepting nonexistent dates", () => {
  assert.equal(addMonths("2028-02-29", 12), "2029-02-28")
  assert.equal(addMonths("2026-12-31", 2), "2027-02-28")
  assert.throws(() => addMonths("2026-02-31", 12))
})
test("a fiat gain can be a Bitcoin loss", () => {
  const x = investmentReturn(10000, 15000, 5, 0.1)
  near(x.fiat, 0.5)
  assert.ok(x.bitcoin < 0)
  near(x.hurdle, 16105.1)
  assert.throws(() => investmentReturn(0, 10, 5, 0.1))
})
test("migrated model matches the original published car target", () => {
  const future = powerLawPrice(hAtDate(dataset, "2031-09-10"), 0)
  near(future, 402970.24995830626, 0.001)
  near(
    powerLawPrice(hAtDate(dataset, "2026-09-10"), 0),
    108869.60038458397,
    0.001
  )
})
test("root-scale conversion roundtrips and H4 halving date is mapped", () => {
  for (const p of [0.01, 100, 1e5, 1e7])
    near(rootToPrice(priceToRoot(p)), p, 0.00001)
  const date = createDateMapper(dataset)(4)
  assert.ok(date.startsWith("2024-04"))
})
test("H-time and scheduled subsidy cross the halving boundary correctly", () => {
  assert.equal(hTime(4.5), "12:00:00")
  assert.equal(issuance(839999).subsidy, 6.25)
  assert.equal(issuance(840000).subsidy, 3.125)
  near(issuance(840000).supply - issuance(839999).supply, 3.125)
})
test("model rejects missing data and out-of-range dates instead of clamping silently", () => {
  assert.throws(() => hAtDate(null, "2030-01-01"))
  assert.throws(() => hAtDate(dataset, "2200-01-01"))
  assert.throws(() => hAtDate(dataset, "2008-01-01"))
  assert.throws(() => hAtDate(dataset, "2026-02-31"))
})
test("market-to-model and model-only CAGR differ with starting price", () => {
  const a = modelGrowth(dataset, "2026-09-10", 5, 78158),
    b = modelGrowth(dataset, "2026-09-10", 5, 300000)
  assert.ok(a.marketRate > b.marketRate)
  near(a.pathRate, b.pathRate)
  near(a.target, b.target)
})
test("stale snapshot cannot masquerade as live and stale chain height is discarded", () => {
  const now = Date.parse("2026-09-18T12:00:00Z"),
    s = {
      price: {
        value: { usd: 70000, eur: 65000 },
        asOf: "2026-09-18T11:59:00Z",
        status: "live",
      },
      chain: {
        value: { height: 967543 },
        asOf: "2026-09-18T10:00:00Z",
        status: "live",
      },
    }
  const a = parseSnapshot(s, now)
  assert.equal(a.fresh, true)
  assert.equal(a.height, null)
  assert.equal(parseSnapshot(s, now + 3600000).fresh, false)
  assert.throws(() => parseSnapshot({ price: { value: { usd: -1 } } }, now))
})

test("very small low-rate costs are not falsely indeterminate", () => {
  const result = breakEvenRates({
    purchase: 10000,
    rent: 0,
    ownership: 0,
    residual: 0,
    upfront: 0,
    capital: 20000,
    months: 360,
    escalation: 0,
  })
  assert.equal(result.indeterminate, false)
  assert.equal(result.roots.length, 0)
})
test("a deep falling endpoint can make the waypoint path consume less", () => {
  const a = compare(v, factorsForGrowth(0.00001, 60)),
    b = compare(v, factorsForGrowth(0.00001, 60, true))
  assert.ok(b.requiredRent < a.requiredRent)
})

test("thirty-year rates use labelled original-calendar extrapolation, never clamp", () => {
  const r = modelGrowth(dataset, "2026-09-18", 30, 78197)
  assert.equal(r.extrapolated, true)
  assert.ok(r.target > powerLawPrice(11.9975, 0))
  near((r.target / 78197) ** (1 / 30) - 1, r.marketRate)
  assert.equal(modelGrowth(dataset, "2026-09-18", 5, 78197).extrapolated, false)
  assert.equal(hTime(4.6), "14:24:00")
  assert.throws(() => modelGrowth(dataset, "2026-09-18", 51, 78197))
})
