// Public illustrative assumptions only. This module never accepts a passphrase.
export const EFF_WORD_COUNT = 7776
// Debian Stable KeePassXC 2.7.10+dfsg1-1: actual bundled eff_large.wordlist.
export const KEEPASS_WORD_COUNT = 7772
export const SECONDS_PER_YEAR = 365.25 * 24 * 60 * 60
// Published RTX 4090 / Hashcat 7.0.0 mode 11300 result; not every wallet's rate.
export const WALLET_BENCHMARK_RATE = 32880
// Illustrative rental input, based on Runpod's headline rate checked 2026-10-14.
export const GPU_RENTAL_PER_HOUR = 0.89

export function fullNumber(value: number) {
  return Number(value.toPrecision(3)).toLocaleString("en-US", {
    notation: "standard",
    maximumSignificantDigits: 3,
  })
}

export function namedNumber(value: number) {
  // Pick the unit after rounding, so 999,999 becomes one million.
  value = Number(value.toPrecision(3))
  const units = [
    [1e54, "septendecillion"],
    [1e51, "sexdecillion"],
    [1e48, "quindecillion"],
    [1e45, "quattuordecillion"],
    [1e42, "tredecillion"],
    [1e39, "duodecillion"],
    [1e36, "undecillion"],
    [1e33, "decillion"],
    [1e30, "nonillion"],
    [1e27, "octillion"],
    [1e24, "septillion"],
    [1e21, "sextillion"],
    [1e18, "quintillion"],
    [1e15, "quadrillion"],
    [1e12, "trillion"],
    [1e9, "billion"],
    [1e6, "million"],
    [1e3, "thousand"],
  ] as const
  const unit = units.find(([scale]) => value >= scale)
  const scaled = Number((unit ? value / unit[0] : value).toPrecision(3))
  const small = [
    "zero",
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
    "ten",
    "eleven",
    "twelve",
    "thirteen",
    "fourteen",
    "fifteen",
    "sixteen",
    "seventeen",
    "eighteen",
    "nineteen",
  ]
  const tens = [
    "",
    "",
    "twenty",
    "thirty",
    "forty",
    "fifty",
    "sixty",
    "seventy",
    "eighty",
    "ninety",
  ]
  const speak = (n: number): string => {
    if (n < 20) return small[n]
    if (n < 100)
      return tens[Math.floor(n / 10)] + (n % 10 ? `-${small[n % 10]}` : "")
    if (n < 1000)
      return (
        `${small[Math.floor(n / 100)]} hundred` +
        (n % 100 ? ` ${speak(n % 100)}` : "")
      )
    return fullNumber(n)
  }
  const [whole, fraction] = scaled
    .toLocaleString("en-US", {
      notation: "standard",
      useGrouping: false,
      maximumSignificantDigits: 3,
    })
    .split(".")
  const words =
    speak(Number(whole)) +
    (fraction
      ? ` point ${[...fraction].map((n) => small[Number(n)]).join(" ")}`
      : "")
  return unit ? `${words} ${unit[1]}` : words
}
export function wordEntropy(words: number, listSize = KEEPASS_WORD_COUNT) {
  if (
    !Number.isInteger(words) ||
    words < 1 ||
    words > 24 ||
    !Number.isInteger(listSize) ||
    listSize < 2
  )
    throw new RangeError("Invalid word count or list size")
  return { bits: words * Math.log2(listSize), possibilities: listSize ** words }
}
export function attackModel(
  words: number,
  guessesPerSecond: number,
  powerKw: number,
  electricityPerKwh: number,
  computePerHour: number
) {
  if (
    ![guessesPerSecond, powerKw, electricityPerKwh, computePerHour].every(
      Number.isFinite
    ) ||
    guessesPerSecond <= 0 ||
    powerKw < 0 ||
    electricityPerKwh < 0 ||
    computePerHour < 0
  )
    throw new RangeError("Use positive guess rates and non-negative costs")
  const { bits, possibilities } = wordEntropy(words)
  const fullSeconds = possibilities / guessesPerSecond
  const averageSeconds = fullSeconds / 2
  const averageHours = averageSeconds / 3600
  return {
    bits,
    possibilities,
    averageSeconds,
    fullSeconds,
    averageKwh: averageHours * powerKw,
    averageElectricityCost: averageHours * powerKw * electricityPerKwh,
    averageComputeCost: averageHours * computePerHour,
  }
}

// Ideal independent workers divide the search without duplicate guesses.
// All hardware inputs are per GPU; aggregate rates and costs scale together.
export function parallelAttackModel(
  words: number,
  gpuCount: number,
  guessesPerGpuSecond: number,
  powerPerGpuKw: number,
  electricityPerKwh: number,
  rentalPerGpuHour: number
) {
  if (!Number.isSafeInteger(gpuCount) || gpuCount < 1 || gpuCount > 1_000_000)
    throw new RangeError("Use a whole GPU count from 1 to 1,000,000")
  const single = attackModel(
    words,
    guessesPerGpuSecond,
    powerPerGpuKw,
    electricityPerKwh,
    rentalPerGpuHour
  )
  return {
    ...single,
    gpuCount,
    totalGuessesPerSecond: guessesPerGpuSecond * gpuCount,
    totalPowerKw: powerPerGpuKw * gpuCount,
    totalRentalPerHour: rentalPerGpuHour * gpuCount,
    averageSeconds: single.averageSeconds / gpuCount,
    fullSeconds: single.fullSeconds / gpuCount,
    averageGpuHours: single.averageSeconds / 3600,
    // Total work, energy and costs stay invariant under ideal linear scaling.
  }
}
