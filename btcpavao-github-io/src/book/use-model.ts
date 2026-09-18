import { useEffect, useState } from "react"
import { validateDataset } from "./model/power-law.mjs"
import type { ModelDataset } from "./model/power-law.mjs"
import { parseSnapshot } from "./model/helpers.mjs"
import type { Snapshot } from "./model/helpers.mjs"
let modelPromise: Promise<ModelDataset> | undefined
export function useModel() {
  const [data, setData] = useState<ModelDataset | null>(null),
    [error, setError] = useState("")
  useEffect(() => {
    let active = true
    modelPromise ??= fetch("/bitcoin-as-money/model-data.json")
      .then((r) => {
        if (!r.ok) throw Error("Model data could not be loaded.")
        return r.json()
      })
      .then(validateDataset)
      .catch((e) => {
        modelPromise = undefined
        throw e
      })
    modelPromise
      .then((d) => {
        if (active) setData(d)
      })
      .catch(() => {
        if (active)
          setError(
            "Model data could not be loaded. Please reload this page to retry. The model is unavailable; no substitute values are being used."
          )
      })
    return () => {
      active = false
    }
  }, [])
  return { data, error }
}
export function useSnapshot() {
  const [snapshot, set] = useState<Snapshot | null>(null),
    [status, setStatus] = useState("Loading a dated reference snapshot…"),
    [busy, setBusy] = useState(false)
  useEffect(() => {
    let active = true
    fetch("/bitcoin-as-money/market-snapshot.json")
      .then((r) => r.json())
      .then((v) => {
        if (active) {
          set({ ...parseSnapshot(v), fresh: false })
          setStatus("Saved reference snapshot. This is not a live quote.")
        }
      })
      .catch(() => {
        if (active)
          setStatus(
            "Reference price unavailable. Please update the market quote or enter a scenario manually."
          )
      })
    return () => {
      active = false
    }
  }, [])
  async function refresh() {
    setBusy(true)
    try {
      const r = await fetch(
        "https://bitcoin-savjetovanje.com/api/bitcoin-snapshot",
        { cache: "no-store", signal: AbortSignal.timeout(12000) }
      )
      if (!r.ok) throw Error()
      const v = parseSnapshot(await r.json())
      set(v)
      setStatus(
        v.fresh
          ? "Updated market snapshot."
          : "The source returned a stale snapshot. It is not a current quote."
      )
    } catch {
      set((s) => (s ? { ...s, fresh: false } : s))
      setStatus(
        "Live update unavailable. Any displayed value is the last dated snapshot, not a current quote."
      )
    } finally {
      setBusy(false)
    }
  }
  return { snapshot, status, busy, refresh }
}
