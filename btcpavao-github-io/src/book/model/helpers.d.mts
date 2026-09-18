import type { ModelDataset } from "./power-law.mjs"
export function hAtDate(dataset: ModelDataset, date: string): number
export function modelGrowth(
  dataset: ModelDataset,
  date: string,
  years: number,
  marketPrice: number,
  currentH?: number
): {
  current: number
  target: number
  marketRate: number
  pathRate: number
  extrapolated: boolean
}
export function hTime(h: number): string
export function issuance(height: number): { supply: number; subsidy: number }
export interface Snapshot {
  usd: number
  eur: number | null
  height: number | null
  asOf: string
  fresh: boolean
}
export function parseSnapshot(value: unknown, now?: number): Snapshot
