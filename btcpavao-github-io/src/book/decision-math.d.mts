export interface DecisionInputs {
  purchase: number
  rent: number
  ownership: number
  residual: number
  upfront: number
  capital: number
  months: number
  escalation?: number
}
export interface DecisionResult {
  g: number
  rate: number
  buyCost: number
  rentCost: number
  advantage: number
  residualBreak: number
  requiredBuy: number
  requiredRent: number
  buyExhaustion: number | null
  rentExhaustion: number | null
  buyEnd: number | null
  rentEnd: number | null
  nominalBuy: number
  nominalRent: number
  balances: { month: number; buy: number | null; rent: number | null }[]
}
export function validateInputs(v: DecisionInputs): void
export function factorsForGrowth(
  total: number,
  months: number,
  stress?: boolean
): number[]
export function compare(v: DecisionInputs, factors: number[]): DecisionResult
export function atRate(v: DecisionInputs, r: number): DecisionResult
export function breakEvenRates(v: DecisionInputs): {
  indeterminate: boolean
  roots: number[]
}
export function addMonths(iso: string, n: number): string
export function investmentReturn(
  initial: number,
  future: number,
  years: number,
  btcGrowth: number
): { fiat: number; bitcoin: number; hurdle: number }
