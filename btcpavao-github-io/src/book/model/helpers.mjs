import {
  PARAMETERS,
  createHMapper,
  createDateMapper,
  powerLawPrice,
} from "./power-law.mjs"
import { addMonths } from "../decision-math.mjs"
export function hAtDate(dataset, date) {
  if (!dataset?.modelDates?.length) throw Error("Model data is unavailable.")
  if (
    !/^\d{4}-\d{2}-\d{2}$/.test(date) ||
    !Number.isFinite(Date.parse(date)) ||
    new Date(date).toISOString().slice(0, 10) !== date
  )
    throw Error("Please enter a valid date.")
  if (date < dataset.modelDates[0] || date > dataset.modelDates.at(-1))
    throw Error("Date is outside the model’s published calendar range.")
  return createHMapper(dataset)(date + "T00:00:00Z")
}
export function modelGrowth(dataset, date, years, marketPrice, currentH) {
  if (!Number.isFinite(marketPrice) || marketPrice <= 0)
    throw Error("Market price must be positive.")
  if (!Number.isFinite(years) || years <= 0 || years > 50)
    throw Error(
      "Please select a duration above zero and no longer than fifty years."
    )
  const futureDate = addMonths(date, Math.round(years * 12))
  const extrapolated = futureDate > dataset?.modelDates?.at(-1)
  let futureH
  if (extrapolated) {
    // Invert the original forward calendar mapper, which explicitly extends
    // its last anchor at the protocol's target ten-minute block interval.
    const dateForH = createDateMapper(dataset)
    let lo = (dataset.modelDates.length - 1) * PARAMETERS.series.stepH
    let hi = lo + 1
    while (dateForH(hi) < futureDate) hi += 1
    for (let i = 0; i < 60; i++) {
      const mid = (lo + hi) / 2
      if (dateForH(mid) < futureDate) lo = mid
      else hi = mid
    }
    futureH = (lo + hi) / 2
  } else futureH = hAtDate(dataset, futureDate)
  const h = currentH ?? hAtDate(dataset, date),
    current = powerLawPrice(h, 0),
    target = powerLawPrice(futureH, 0)
  if (current <= 0 || years <= 0)
    throw Error("Please select a date after genesis and a positive duration.")
  return {
    current,
    target,
    extrapolated,
    marketRate: (target / marketPrice) ** (1 / years) - 1,
    pathRate: (target / current) ** (1 / years) - 1,
  }
}
export function hTime(h) {
  const seconds = Math.floor((h - Math.floor(h)) * 86400 + 1e-8)
  return [
    Math.floor(seconds / 3600),
    Math.floor((seconds % 3600) / 60),
    seconds % 60,
  ]
    .map((x) => String(x).padStart(2, "0"))
    .join(":")
}
export function issuance(height) {
  if (!Number.isInteger(height) || height < 0)
    throw Error("Block height must be a non-negative integer.")
  let blocks = height + 1,
    supplySats = 0
  for (let epoch = 0; blocks > 0 && epoch < 33; epoch++) {
    const count = Math.min(blocks, PARAMETERS.blocksPerH)
    supplySats += count * Math.floor(5e9 / 2 ** epoch)
    blocks -= count
  }
  return {
    supply: supplySats / 1e8,
    subsidy:
      Math.floor(
        5e9 / 2 ** Math.min(33, Math.floor(height / PARAMETERS.blocksPerH))
      ) / 1e8,
  }
}
export function parseSnapshot(value, now = Date.now()) {
  const usd = value?.price?.value?.usd,
    eur = value?.price?.value?.eur,
    height = value?.chain?.value?.height,
    asOf = value?.price?.asOf
  if (!Number.isFinite(usd) || usd <= 0 || !Number.isFinite(Date.parse(asOf)))
    throw Error("Price source returned an invalid snapshot.")
  const age = now - Date.parse(asOf),
    fresh = value.price.status === "live" && age >= -60000 && age <= 15 * 60000
  const chainFresh =
    Number.isInteger(height) &&
    height > 0 &&
    value.chain.status === "live" &&
    now - Date.parse(value.chain.asOf) <= 15 * 60000 &&
    now - Date.parse(value.chain.asOf) >= -60000
  return {
    usd,
    eur: Number.isFinite(eur) && eur > 0 ? eur : null,
    height: chainFresh ? height : null,
    asOf,
    fresh,
  }
}
