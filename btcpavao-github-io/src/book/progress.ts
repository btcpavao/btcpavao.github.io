import { useSyncExternalStore } from "react"
const KEY = "btcpavao:bitcoin-as-money:v1"
type Progress = {
  completed?: string[]
  checks?: Record<string, boolean>
  last?: string
}
let memory = "{}",
  unavailable = false
const listeners = new Set<() => void>()
function read() {
  if (unavailable) return memory
  try {
    return localStorage.getItem(KEY) ?? memory
  } catch {
    return memory
  }
}
function subscribe(fn: () => void) {
  listeners.add(fn)
  window.addEventListener("storage", fn)
  return () => {
    listeners.delete(fn)
    window.removeEventListener("storage", fn)
  }
}
function parse(raw: string): Progress {
  try {
    const x = JSON.parse(raw)
    return {
      completed: Array.isArray(x.completed)
        ? x.completed.filter((v: unknown) => typeof v === "string")
        : [],
      checks:
        x.checks && typeof x.checks === "object"
          ? (Object.fromEntries(
              Object.entries(x.checks).filter(([, v]) => typeof v === "boolean")
            ) as Record<string, boolean>)
          : {},
      last: typeof x.last === "string" ? x.last : undefined,
    }
  } catch {
    return {}
  }
}
export function useBookProgress() {
  const raw = useSyncExternalStore(subscribe, read, () => "{}")
  const state = parse(raw)
  const save = (next: Progress) => {
    memory = JSON.stringify(next)
    try {
      localStorage.setItem(KEY, memory)
    } catch {
      unavailable = true
    }
    listeners.forEach((fn) => fn())
  }
  return { state, save, unavailable, reset: () => save({}) }
}
export function checkKey(slug: string, text: string) {
  let hash = 0
  for (const c of text) hash = (hash * 31 + c.charCodeAt(0)) | 0
  return `${slug}:${hash}`
}
