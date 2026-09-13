// Public illustrative assumptions only. This module never accepts a passphrase.
export const EFF_WORD_COUNT = 7776
export const SECONDS_PER_YEAR = 365.25 * 24 * 60 * 60
export function wordEntropy(words: number, listSize = EFF_WORD_COUNT) {
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
