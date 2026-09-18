import test from "node:test"
import assert from "node:assert/strict"
import {
  atRate,
  compare,
  factorsForGrowth,
  breakEvenRates,
  addMonths,
  validateInputs,
} from "../src/book/decision-math.mjs"
const v = {
  purchase: 34490,
  rent: 745,
  ownership: 150,
  residual: 17245,
  upfront: 0,
  capital: 50000,
  months: 60,
  km: 20000,
}
const close = (a, b) => assert.ok(Math.abs(a - b) < 0.02, `${a} != ${b}`)
test("zero growth equals ordinary cash costs", () => {
  const x = atRate(v, 0)
  close(x.buyCost, 26245)
  close(x.rentCost, 44700)
  close(x.advantage, -18455)
})
test("both article scenarios and residual thresholds", () => {
  const a = atRate(v, 0.3882251542149944)
  close(a.advantage, 71352.31577474739)
  close(a.buyEnd, 74717.7333409925)
  close(a.rentEnd, 146070.04911573988)
  close(a.residualBreak, 88597.31577474739)
  const b = atRate(v, (402970.24995830626 / 300000) ** 0.2 - 1)
  close(b.advantage, -12340.678521068112)
  close(b.residualBreak, 4904.321478931888)
})
test("break-even rate has zero final difference", () => {
  const x = breakEvenRates(v)
  assert.equal(x.roots.length, 1)
  close(x.roots[0], 0.14571240478382375)
  close(atRate(v, x.roots[0]).advantage, 0)
})
test("manual recurrence independently matches future-value comparison", () => {
  let buy = v.capital - v.purchase,
    rent = v.capital - v.upfront
  const q = 1.1 ** (1 / 12)
  for (let m = 1; m <= v.months; m++) {
    buy = buy * q - v.ownership
    rent = rent * q - v.rent
  }
  const x = atRate(v, 0.1)
  close(x.buyEnd, buy + v.residual)
  close(x.rentEnd, rent)
  close(x.advantage, rent - buy - v.residual)
})
test("same endpoint, early drawdown requires more initial BTC", () => {
  const g = 5.155841372070786
  const smooth = compare(v, factorsForGrowth(g, 60)),
    stress = compare(v, factorsForGrowth(g, 60, true))
  assert.ok(stress.requiredRent > smooth.requiredRent)
  assert.ok(stress.advantage < smooth.advantage)
})
test("underfunded balances are never presented as negative bitcoin holdings", () => {
  const x = atRate({ ...v, capital: 1000 }, 0.1)
  assert.equal(x.buyEnd, null)
  assert.equal(x.buyExhaustion, 0)
  assert.equal(x.rentEnd, null)
  assert.ok(x.rentExhaustion > 0)
})
test("upfront rent fee and residual affect difference once", () => {
  const x = atRate(v, 0.1),
    y = atRate({ ...v, upfront: 2000, residual: 18245 }, 0.1)
  close(x.advantage - y.advantage, 2000 * x.g + 1000)
})
test("calendar month clamping and validation", () => {
  assert.equal(addMonths("2028-02-29", 12), "2029-02-28")
  assert.equal(addMonths("2026-01-31", 1), "2026-02-28")
  assert.throws(() => validateInputs({ ...v, months: 60.5 }))
  assert.throws(() => validateInputs({ ...v, rent: NaN }))
})
