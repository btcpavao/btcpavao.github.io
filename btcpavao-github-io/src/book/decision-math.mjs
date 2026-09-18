// Adapted from the tested September 2026 car calculator. EUR cash flows;
// normalized BTC units valued at the initial EUR price. End-of-month payments.
export function validateInputs(v) {
  for (const [key, min, max] of [
    ["purchase", 1, 1e8],
    ["rent", 0, 1e7],
    ["ownership", 0, 1e7],
    ["residual", 0, 1e8],
    ["upfront", 0, 1e8],
    ["capital", 0, 1e10],
    ["months", 1, 600],
  ]) {
    if (!Number.isFinite(v[key]) || v[key] < min || v[key] > max)
      throw Error(
        "Please enter valid, non-negative amounts and a duration of 1–600 whole months."
      )
  }
  if (!Number.isInteger(v.months))
    throw Error("Please enter a whole number of months.")
  if (
    !Number.isFinite(v.escalation ?? 0) ||
    (v.escalation ?? 0) < -90 ||
    (v.escalation ?? 0) > 100
  )
    throw Error("Please enter annual rent escalation between −90% and 100%.")
}
export function factorsForGrowth(total, months, stress = false) {
  if (
    !Number.isFinite(total) ||
    total <= 0 ||
    !Number.isInteger(months) ||
    months < 1
  )
    throw Error("The price path needs a positive endpoint and whole months.")
  const dip = Math.min(12, Math.floor(months / 2))
  return Array.from({ length: months + 1 }, (_, m) =>
    !stress || dip === 0
      ? total ** (m / months)
      : m <= dip
        ? 0.5 ** (m / dip)
        : 0.5 * (total / 0.5) ** ((m - dip) / (months - dip))
  )
}
export function compare(v, factors) {
  validateInputs(v)
  if (
    factors.length !== v.months + 1 ||
    factors.some((f) => !Number.isFinite(f) || f <= 0) ||
    factors[0] !== 1
  )
    throw Error("Invalid price path.")
  const g = factors.at(-1)
  let buyUnits = v.capital - v.purchase,
    rentUnits = v.capital - v.upfront
  let requiredBuy = v.purchase,
    requiredRent = v.upfront,
    nominalRent = v.upfront
  let buyExhaustion = buyUnits < 0 ? 0 : null,
    rentExhaustion = rentUnits < 0 ? 0 : null
  const balances = [
    {
      month: 0,
      buy: buyUnits < 0 ? null : buyUnits,
      rent: rentUnits < 0 ? null : rentUnits,
    },
  ]
  for (let m = 1; m <= v.months; m++) {
    const rent = v.rent * (1 + (v.escalation ?? 0) / 100) ** ((m - 1) / 12)
    const b = v.ownership / factors[m],
      r = rent / factors[m]
    requiredBuy += b
    requiredRent += r
    nominalRent += rent
    buyUnits -= b
    rentUnits -= r
    if (buyUnits < -1e-7 && buyExhaustion === null) buyExhaustion = m
    if (rentUnits < -1e-7 && rentExhaustion === null) rentExhaustion = m
    balances.push({
      month: m,
      buy: buyExhaustion === null ? Math.max(0, buyUnits) : null,
      rent: rentExhaustion === null ? Math.max(0, rentUnits) : null,
    })
  }
  const buyCost = requiredBuy * g - v.residual,
    rentCost = requiredRent * g
  return {
    g,
    rate: g ** (12 / v.months) - 1,
    buyCost,
    rentCost,
    advantage: buyCost - rentCost,
    residualBreak: (requiredBuy - requiredRent) * g,
    requiredBuy,
    requiredRent,
    buyExhaustion,
    rentExhaustion,
    buyEnd:
      buyExhaustion === null ? Math.max(0, buyUnits) * g + v.residual : null,
    rentEnd: rentExhaustion === null ? Math.max(0, rentUnits) * g : null,
    nominalBuy: v.purchase + v.ownership * v.months - v.residual,
    nominalRent,
    balances,
  }
}
export function atRate(v, r) {
  if (!Number.isFinite(r) || r <= -1) throw Error("Growth must exceed −100%.")
  return compare(v, factorsForGrowth((1 + r) ** (v.months / 12), v.months))
}
export function breakEvenRates(v) {
  validateInputs(v)
  if (
    v.purchase === v.upfront &&
    v.ownership === v.rent &&
    (v.escalation ?? 0) === 0 &&
    v.residual === 0
  )
    return { indeterminate: true, roots: [] }
  const roots = []
  let a = -0.9,
    fa = atRate(v, a).advantage
  for (let k = 1; k <= 240; k++) {
    const b = Math.exp(Math.log(0.1) + (k / 240) * Math.log(60)) - 1,
      fb = atRate(v, b).advantage
    if (fa === 0) roots.push(a)
    if (fa * fb < 0) {
      let lo = a,
        hi = b,
        fl = fa
      for (let i = 0; i < 70; i++) {
        const mid = (lo + hi) / 2,
          fm = atRate(v, mid).advantage
        if (fl * fm <= 0) hi = mid
        else {
          lo = mid
          fl = fm
        }
      }
      roots.push((lo + hi) / 2)
    }
    a = b
    fa = fb
  }
  if (fa === 0) roots.push(a)
  return {
    indeterminate: false,
    roots: roots.filter((r, i, x) => i === 0 || Math.abs(r - x[i - 1]) > 1e-6),
  }
}
export function addMonths(iso, n) {
  const d = new Date(iso + "T00:00:00Z")
  if (
    !Number.isFinite(+d) ||
    d.toISOString().slice(0, 10) !== iso ||
    !Number.isInteger(n)
  )
    throw Error("Please enter a valid calendar date.")
  const year = d.getUTCFullYear(),
    month = d.getUTCMonth() + n
  return new Date(
    Date.UTC(
      year,
      month,
      Math.min(
        d.getUTCDate(),
        new Date(Date.UTC(year, month + 1, 0)).getUTCDate()
      )
    )
  )
    .toISOString()
    .slice(0, 10)
}
export function investmentReturn(initial, future, years, btcGrowth) {
  if (
    ![initial, future, years, btcGrowth].every(Number.isFinite) ||
    initial <= 0 ||
    future < 0 ||
    years <= 0 ||
    btcGrowth <= -1
  )
    throw Error(
      "Please use a positive initial value and duration, and non-negative future proceeds."
    )
  const fiat = future / initial - 1,
    bitcoin = future / initial / (1 + btcGrowth) ** years - 1
  return { fiat, bitcoin, hurdle: initial * (1 + btcGrowth) ** years }
}
