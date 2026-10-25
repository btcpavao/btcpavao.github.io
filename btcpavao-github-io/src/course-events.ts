// Provider-neutral, in-memory events. No identifiers, cookies, storage or network.
// A consent-aware analytics adapter may listen for `btcpavao:course`.
export function courseEvent(
  name: string,
  detail: Record<string, string | number> = {}
) {
  if (typeof window !== "undefined") {
    window.dispatchEvent(
      new CustomEvent("btcpavao:course", { detail: { name, ...detail } })
    )
  }
}
