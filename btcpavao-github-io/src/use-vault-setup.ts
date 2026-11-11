import { useSyncExternalStore } from "react"

const changeEvent = "guide-practice-setup-changed"

function subscribeToSetup(onChange: () => void) {
  window.addEventListener("popstate", onChange)
  window.addEventListener(changeEvent, onChange)
  return () => {
    window.removeEventListener("popstate", onChange)
    window.removeEventListener(changeEvent, onChange)
  }
}

function vaultInUrl() {
  return new URLSearchParams(window.location.search).get("setup") === "vault"
}

function selectVault(vault: boolean) {
  const url = new URL(window.location.href)
  if (vault) url.searchParams.set("setup", "vault")
  else url.searchParams.delete("setup")
  window.history.replaceState(window.history.state, "", url)
  window.dispatchEvent(new Event(changeEvent))
}

export function useVaultSetup() {
  const vault = useSyncExternalStore(subscribeToSetup, vaultInUrl, () => false)
  return { vault, selectVault }
}
