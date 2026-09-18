export const PARAMETERS = Object.freeze({
  blocksPerH: 210_000,
  rootExponent: 5.4,
  finalHalving: 12,
  powerLaw: Object.freeze({
    interceptLog10: 1.47,
    slope: 5.38,
  }),
  wave: Object.freeze({
    decayBase: 0.79,
    delayThresholdH: 3.28,
    settledDelayH: 0.025,
    delayExponentBase: 0.3,
    delayExponentOffsetH: -0.05,
    delayCosineOffset: 1.05,
    delayCosineFrequency: 2.5,
    delayCosinePhaseH: 0.15,
    bandOffset: 5 / 6,
    minersFloor: -1,
  }),
  series: Object.freeze({
    startH: 0,
    endH: 12,
    stepH: 0.0025,
  }),
})

export const POWER_LAW_LEVELS = Object.freeze([5, 4, 3, 2, 1, 0, -1, -2, -3])
export const WAVE_BANDS = Object.freeze([2, 0, -2])

const MILLISECONDS_PER_DAY = 86_400_000
const TARGET_HALVING_DAYS = (PARAMETERS.blocksPerH * 10) / 60 / 24
const YEAR_STEPS = Object.freeze([1, 2, 5, 10, 20, 25, 50])

function powerLawName(level) {
  return `PL${level}`
}

function waveName(band) {
  return `W${band}`
}

function priceFromLog10(log10Price) {
  return log10Price === Number.NEGATIVE_INFINITY ? 0 : 10 ** log10Price
}

export function priceToRoot(priceUsd) {
  return priceUsd ** (1 / PARAMETERS.rootExponent)
}

export function rootToPrice(rootPrice) {
  return rootPrice ** PARAMETERS.rootExponent
}

export function powerLawPrice(h, level) {
  if (h === 0) return 0
  const base =
    PARAMETERS.powerLaw.interceptLog10 +
    PARAMETERS.powerLaw.slope * Math.log10(h)
  const decay = PARAMETERS.wave.decayBase ** (h + 1)
  return priceFromLog10(base + (level / 3) * decay)
}

function waveDelay(h) {
  const wave = PARAMETERS.wave
  if (h >= wave.delayThresholdH) return wave.settledDelayH
  const decay = wave.delayExponentBase ** (h + wave.delayExponentOffsetH)
  const oscillation =
    wave.delayCosineOffset +
    Math.cos(wave.delayCosineFrequency * (h + wave.delayCosinePhaseH))
  return wave.settledDelayH + decay * oscillation
}

function waveFactor(h, band) {
  const sine = Math.sin(2 * Math.PI * (h - waveDelay(h)))
  if (band === 2) return sine + PARAMETERS.wave.bandOffset
  if (band === -2)
    return Math.max(
      PARAMETERS.wave.minersFloor,
      sine - PARAMETERS.wave.bandOffset
    )
  return sine
}

export function wavePrice(h, band) {
  if (h === 0) return 0
  const base =
    PARAMETERS.powerLaw.interceptLog10 +
    PARAMETERS.powerLaw.slope * Math.log10(h)
  const decay = PARAMETERS.wave.decayBase ** (h + 1)
  return priceFromLog10(base + decay * waveFactor(h, band))
}

export function createModelSeries() {
  const { startH, endH, stepH } = PARAMETERS.series
  const pointCount = Math.ceil((endH - startH) / stepH)
  const h = Array.from(
    { length: pointCount },
    (_, index) => startH + index * stepH
  )
  const powerLaw = POWER_LAW_LEVELS.map((level) => ({
    name: powerLawName(level),
    level,
    priceUsd: new Array(pointCount),
    rootPrice: new Array(pointCount),
  }))
  const waves = WAVE_BANDS.map((band) => ({
    name: waveName(band),
    band,
    priceUsd: new Array(pointCount),
    rootPrice: new Array(pointCount),
  }))

  for (let index = 0; index < pointCount; index += 1) {
    const currentH = h[index]
    for (const series of powerLaw) {
      const priceUsd = powerLawPrice(currentH, series.level)
      series.priceUsd[index] = priceUsd
      series.rootPrice[index] = priceToRoot(priceUsd)
    }
    for (const series of waves) {
      const priceUsd = wavePrice(currentH, series.band)
      series.priceUsd[index] = priceUsd
      series.rootPrice[index] = priceToRoot(priceUsd)
    }
  }

  return { h, powerLaw, waves }
}

function isoDateTimestamp(value) {
  return Date.parse(`${value}T00:00:00Z`)
}

function formatIsoDate(timestamp) {
  return new Date(timestamp).toISOString().slice(0, 10)
}

export function validateDataset(value) {
  if (!value || typeof value !== "object")
    throw new Error("Neispravan Bitcoin Wave podatkovni zapis.")
  if (
    !Array.isArray(value.observations) ||
    value.observations.length !== 6035
  ) {
    throw new Error(
      "Podatkovna snimka modela Bitcoin Wave nema očekivanih 6.035 opažanja."
    )
  }
  if (!Array.isArray(value.modelDates) || value.modelDates.length !== 4800) {
    throw new Error(
      "Podatkovna snimka modela Bitcoin Wave nema očekivanu datumsku mrežu."
    )
  }
  if (!Array.isArray(value.yearMarks) || value.yearMarks.length === 0) {
    throw new Error(
      "Podatkovna snimka modela Bitcoin Wave nema godišnje oznake."
    )
  }

  let previousH = Number.NEGATIVE_INFINITY
  for (const observation of value.observations) {
    if (!Array.isArray(observation) || observation.length !== 3) {
      throw new Error("Bitcoin Wave opažanje nije ispravno.")
    }
    const [h, price, root] = observation
    if (![h, price, root].every(Number.isFinite) || h <= previousH) {
      throw new Error("Bitcoin Wave opažanja nisu pravilno poredana.")
    }
    previousH = h
  }

  return value
}

export function extendedYearMarks(dataset) {
  return dataset.yearMarks
    .filter(([, h]) => h <= PARAMETERS.finalHalving)
    .map(([year, h]) => [year, h])
}

export function createDateMapper(dataset) {
  const lastDateIndex = dataset.modelDates.length - 1
  const lastKnownH = lastDateIndex * PARAMETERS.series.stepH
  const futureAnchors = [
    {
      h: lastKnownH,
      timestamp: isoDateTimestamp(dataset.modelDates[lastDateIndex]),
    },
  ]

  for (const [year, h] of extendedYearMarks(dataset)) {
    if (h > lastKnownH)
      futureAnchors.push({ h, timestamp: Date.UTC(year, 0, 1) })
  }

  return function dateForH(rawH) {
    const h = Math.max(0, rawH)
    if (h <= lastKnownH) {
      const rawIndex = h / PARAMETERS.series.stepH
      const nearestIndex = Math.round(rawIndex)
      if (Math.abs(rawIndex - nearestIndex) < 0.0000001) {
        return dataset.modelDates[Math.min(lastDateIndex, nearestIndex)]
      }
      const leftIndex = Math.min(lastDateIndex, Math.floor(rawIndex))
      const rightIndex = Math.min(lastDateIndex, Math.ceil(rawIndex))
      if (leftIndex === rightIndex) return dataset.modelDates[leftIndex]
      const leftTimestamp = isoDateTimestamp(dataset.modelDates[leftIndex])
      const rightTimestamp = isoDateTimestamp(dataset.modelDates[rightIndex])
      const ratio = rawIndex - leftIndex
      return formatIsoDate(
        leftTimestamp + (rightTimestamp - leftTimestamp) * ratio
      )
    }

    let left = futureAnchors[0]
    for (let index = 1; index < futureAnchors.length; index += 1) {
      const right = futureAnchors[index]
      if (h <= right.h) {
        const ratio = (h - left.h) / (right.h - left.h)
        return formatIsoDate(
          left.timestamp + (right.timestamp - left.timestamp) * ratio
        )
      }
      left = right
    }

    return formatIsoDate(
      left.timestamp + (h - left.h) * TARGET_HALVING_DAYS * MILLISECONDS_PER_DAY
    )
  }
}

export function createHMapper(dataset) {
  const timestamps = dataset.modelDates.map(isoDateTimestamp)
  const lastIndex = timestamps.length - 1

  return function hForDate(value) {
    const target = Date.parse(value)
    if (!Number.isFinite(target)) return null
    if (target <= timestamps[0]) return 0
    if (target >= timestamps[lastIndex]) {
      return lastIndex * PARAMETERS.series.stepH
    }

    let low = 1
    let high = lastIndex
    while (low < high) {
      const middle = Math.floor((low + high) / 2)
      if (timestamps[middle] < target) low = middle + 1
      else high = middle
    }

    const rightIndex = low
    const leftIndex = rightIndex - 1
    const left = timestamps[leftIndex]
    const right = timestamps[rightIndex]
    const ratio = right === left ? 0 : (target - left) / (right - left)
    return (leftIndex + ratio) * PARAMETERS.series.stepH
  }
}

export function selectVisibleYears(marks, visibleRange, maxLabels) {
  const start = Math.min(...visibleRange)
  const end = Math.max(...visibleRange)
  const visible = marks.filter(([, h]) => h >= start && h <= end)
  if (visible.length <= maxLabels) return visible

  const firstYear = visible[0][0]
  const lastYear = visible.at(-1)[0]
  const step =
    YEAR_STEPS.find(
      (candidate) =>
        Math.floor(lastYear / candidate) -
          Math.ceil(firstYear / candidate) +
          1 <=
        maxLabels - 2
    ) ?? YEAR_STEPS.at(-1)
  const selected = visible.filter(([year]) => year % step === 0)
  const first = visible[0]
  const last = visible.at(-1)
  if (!selected.some(([year]) => year === first[0])) selected.unshift(first)
  if (!selected.some(([year]) => year === last[0])) selected.push(last)
  return selected
}
