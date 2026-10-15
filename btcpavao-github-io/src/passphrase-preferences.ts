import {
  EFF_WORD_COUNT,
  GPU_RENTAL_PER_HOUR,
  KEEPASS_WORD_COUNT,
  WALLET_BENCHMARK_RATE,
} from "@/curriculum-math"

export const PASSPHRASE_PREFERENCES_KEY = "btcpavao:passphrase-calculator:v1"
export const DEFAULT_PASSPHRASE_PREFERENCES = {
  words: 6,
  listSize: KEEPASS_WORD_COUNT,
  gpus: "1",
  rate: String(WALLET_BENCHMARK_RATE),
  power: "0.55",
  energy: "0.15",
  compute: String(GPU_RENTAL_PER_HOUR),
}
export type PassphrasePreferences = typeof DEFAULT_PASSPHRASE_PREFERENCES

type PreferenceKey = keyof PassphrasePreferences
function isValidPreference(key: PreferenceKey, value: unknown) {
  if (key === "words")
    return (
      typeof value === "number" &&
      Number.isInteger(value) &&
      value >= 1 &&
      value <= 12
    )
  if (key === "listSize")
    return value === KEEPASS_WORD_COUNT || value === EFF_WORD_COUNT
  if (typeof value !== "string" || !value.trim() || value.length > 64)
    return false
  const number = Number(value)
  if (!Number.isFinite(number)) return false
  if (key === "gpus")
    return Number.isSafeInteger(number) && number >= 1 && number <= 1_000_000
  return number >= (key === "rate" ? 1 : 0) && number <= 1e12
}

export function parsePassphrasePreferences(
  raw: string | null
): PassphrasePreferences {
  const settings = { ...DEFAULT_PASSPHRASE_PREFERENCES }
  try {
    const stored = JSON.parse(raw ?? "null")
    if (
      stored?.version !== 1 ||
      !stored.settings ||
      typeof stored.settings !== "object"
    )
      return settings
    for (const key of Object.keys(settings) as PreferenceKey[]) {
      if (isValidPreference(key, stored.settings[key])) {
        Object.assign(settings, { [key]: stored.settings[key] })
      }
    }
  } catch {
    // A damaged or obsolete saved value must not break the calculator.
  }
  return settings
}

type Snapshot = { settings: PassphrasePreferences; storageAvailable: boolean }
export const DEFAULT_PASSPHRASE_SNAPSHOT: Snapshot = {
  settings: DEFAULT_PASSPHRASE_PREFERENCES,
  storageAvailable: true,
}
let snapshot = DEFAULT_PASSPHRASE_SNAPSHOT
let savedSettings = DEFAULT_PASSPHRASE_PREFERENCES
const listeners = new Set<() => void>()
function notify() {
  listeners.forEach((listener) => listener())
}

export function getPassphraseSnapshot() {
  return snapshot
}
export function getServerPassphraseSnapshot() {
  return DEFAULT_PASSPHRASE_SNAPSHOT
}

function refresh() {
  try {
    savedSettings = parsePassphrasePreferences(
      window.localStorage.getItem(PASSPHRASE_PREFERENCES_KEY)
    )
    snapshot = { settings: savedSettings, storageAvailable: true }
  } catch {
    snapshot = { ...snapshot, storageAvailable: false }
  }
  notify()
}
function onStorage(event: StorageEvent) {
  if (event.key === PASSPHRASE_PREFERENCES_KEY || event.key === null) refresh()
}
function onPageShow(event: PageTransitionEvent) {
  if (event.persisted) refresh()
}
export function subscribePassphrasePreferences(listener: () => void) {
  if (listeners.size === 0) {
    // Read after hydration, before any writes. This also refreshes on remount.
    refresh()
    window.addEventListener("storage", onStorage)
    window.addEventListener("pageshow", onPageShow)
  }
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
    if (listeners.size === 0) {
      window.removeEventListener("storage", onStorage)
      window.removeEventListener("pageshow", onPageShow)
    }
  }
}

export function updatePassphrasePreference<K extends PreferenceKey>(
  key: K,
  value: PassphrasePreferences[K]
) {
  const settings = { ...snapshot.settings, [key]: value }
  let storageAvailable = snapshot.storageAvailable
  if (isValidPreference(key, value)) {
    savedSettings = { ...savedSettings, [key]: value }
    try {
      window.localStorage.setItem(
        PASSPHRASE_PREFERENCES_KEY,
        JSON.stringify({ version: 1, settings: savedSettings })
      )
      storageAvailable = true
    } catch {
      // Keep the interactive calculator usable when browser storage is blocked.
      storageAvailable = false
    }
  }
  // Empty/incomplete number fields are editable drafts, never persisted.
  snapshot = { settings, storageAvailable }
  notify()
}

export function resetPassphrasePreferences() {
  savedSettings = { ...DEFAULT_PASSPHRASE_PREFERENCES }
  let storageAvailable = true
  try {
    window.localStorage.removeItem(PASSPHRASE_PREFERENCES_KEY)
  } catch {
    storageAvailable = false
  }
  snapshot = { settings: savedSettings, storageAvailable }
  notify()
}
