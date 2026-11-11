import type { useVaultSetup } from "@/use-vault-setup"

export function GuidePracticeSetup({ vault, selectVault }: ReturnType<typeof useVaultSetup>) {
  const labelClass = "flex min-h-12 cursor-pointer items-center gap-3 rounded-xl border border-border px-4 py-3 text-sm leading-6 has-checked:border-primary has-checked:bg-primary/8 has-checked:font-semibold has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-primary"
  return (
    <fieldset className="mt-8 max-w-3xl">
      <legend className="font-display text-lg font-bold">Choose your practice setup</legend>
      <div className="mt-3 grid gap-2 sm:grid-cols-2">
        <label className={labelClass}>
          <input type="radio" name="guide-practice-setup" className="size-4 shrink-0 accent-primary" checked={!vault} onChange={() => selectVault(false)} />
          Use Bitcoin Core on this computer
        </label>
        <label className={labelClass}>
          <input type="radio" name="guide-practice-setup" className="size-4 shrink-0 accent-primary" checked={vault} onChange={() => selectVault(true)} />
          Practise offline with Vault
        </label>
      </div>
    </fieldset>
  )
}
