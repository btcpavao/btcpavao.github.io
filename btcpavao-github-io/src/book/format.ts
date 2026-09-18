export const euro = (n: number) =>
  new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(n)
export const usd = (n: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n)
export const percent = (n: number) =>
  new Intl.NumberFormat("en-GB", {
    style: "percent",
    maximumFractionDigits: 2,
  }).format(n)
export const btc = (n: number) => `${n.toFixed(6)} BTC`
