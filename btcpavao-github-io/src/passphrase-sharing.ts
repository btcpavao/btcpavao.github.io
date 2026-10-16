import {
  fullNumber,
  namedNumber,
  parallelAttackModel,
  searchDurationAmount,
  KEEPASS_WORD_COUNT,
} from "@/curriculum-math"
import {
  createPassphraseLink,
  type PassphrasePreferences,
} from "@/passphrase-preferences"

function costEquivalent(cost: number, price: number, unit: string) {
  const count = cost / price
  // Match the compact comparisons on screen, including very small amounts.
  return count > 0 && count < 0.001
    ? `< 0.001 ${unit}`
    : `≈ ${fullNumber(count)} ${unit} (${namedNumber(count)})`
}

export function createPassphraseSummary(
  href: string,
  settings: PassphrasePreferences
) {
  const link = createPassphraseLink(href, settings)
  const { words, listSize, gpus, rate, power, energy, compute } = settings
  const model = parallelAttackModel(
    words,
    Number(gpus),
    Number(rate),
    Number(power),
    Number(energy),
    Number(compute),
    listSize
  )
  const duration = searchDurationAmount(model.averageSeconds)
  const list = listSize === KEEPASS_WORD_COUNT ? "KeePassXC" : "EFF large"
  const assumption = (value: string) =>
    Number(value).toLocaleString("en-US", {
      notation: "standard",
      maximumSignificantDigits: 21,
    })
  return [
    "Bitcoin Core passphrase estimate",
    `${words} ${words === 1 ? "word" : "words"} · ${model.bits.toFixed(2)} bits · ${list} list (${listSize.toLocaleString("en-US")} words)`,
    `${assumption(gpus)} ${Number(gpus) === 1 ? "GPU" : "GPUs"} · ${assumption(rate)} guesses/second per GPU · USD ${assumption(compute)}/GPU-hour`,
    `Average time: ≈ ${fullNumber(duration.value)} ${duration.unit} (${namedNumber(duration.value)} ${duration.unit})`,
    `Average total GPU rental: ≈ USD ${fullNumber(model.averageComputeCost)} (${namedNumber(model.averageComputeCost)} dollars)`,
    "For scale (hypothetical prices):",
    `Houses at USD 1,000,000 (one million dollars) each: ${costEquivalent(model.averageComputeCost, 1_000_000, "houses")}`,
    `Projects at USD 1,000,000,000 (one billion dollars) each: ${costEquivalent(model.averageComputeCost, 1_000_000_000, "projects")}`,
    "Illustrative average for independently random words and ideal parallel scaling, not a guarantee.",
    "",
    link,
  ].join("\n")
}
