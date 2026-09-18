export interface ModelDataset {
  version: string
  provenance: { sourceUrl: string; capturedAt: string }
  observations: [number, number, number][]
  modelDates: string[]
  yearMarks: [number, number][]
}
export const PARAMETERS: {
  blocksPerH: number
  rootExponent: number
  finalHalving: number
  powerLaw: { interceptLog10: number; slope: number }
  wave: { decayBase: number }
  series: { startH: number; endH: number; stepH: number }
}
export const POWER_LAW_LEVELS: readonly number[]
export const WAVE_BANDS: readonly number[]
export function priceToRoot(price: number): number
export function rootToPrice(root: number): number
export function powerLawPrice(h: number, level: number): number
export function wavePrice(h: number, band: number): number
export function validateDataset(value: unknown): ModelDataset
export function createDateMapper(dataset: ModelDataset): (h: number) => string
export function createHMapper(
  dataset: ModelDataset
): (date: string) => number | null
