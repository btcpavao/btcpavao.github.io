import { HardDrive, LockKeyhole, RadioTower } from "lucide-react"
import { captures } from "@/curriculum/practice-captures"
import { BITCOIN_CORE_WALLET_GUIDE_PATH, EN_BITCOIN_CORE_CURRICULUM_PATH } from "@/routes"
import { ZoomableImage } from "./zoomable-image"

const practiceLesson = (slug: string) => `${EN_BITCOIN_CORE_CURRICULUM_PATH}?setup=vault-node#lesson/${slug}`

const paymentSteps = [
  {
    title: "Node prepares the payment",
    icon: HardDrive,
    shot: captures["psbt-node-unsigned"],
    text: "Enter the recipient and amount in the watch-only wallet. Save the unsigned payment as a PSBT file on the transfer USB and take it to Vault.",
  },
  {
    title: "You approve it on Vault",
    icon: LockKeyhole,
    shot: captures["psbt-review"],
    text: "Open the PSBT. Compare the full address and amount with the recipient’s request. Check the fee and change. In this example, the recipient gets 0.25 test BTC and the fee is 282 satoshis. Choose Sign Tx, then Save… to keep the signed file under a new name on the USB.",
  },
  {
    title: "Node sends the payment",
    icon: RadioTower,
    shot: captures["psbt-broadcast"],
    text: "Bring the signed file back to Node, open it and choose Broadcast Tx. Use the transaction ID to find the payment in Bitcoin Core and track its confirmations.",
  },
]

type PracticeShot = Pick<(typeof captures)[keyof typeof captures], "src" | "width" | "height" | "alt"> & { fullSrc?: string }

function PracticePhoto({ shot: { src, fullSrc, width, height, alt }, label, caption }: { shot: PracticeShot; label: string; caption?: string }) {
  return (
    <figure className="mt-3 min-w-0">
      <ZoomableImage src={src} fullSrc={fullSrc} width={width} height={height} alt={alt}
        className="block h-auto max-w-full rounded-md border border-border" loading="lazy" decoding="async" />
      <figcaption className="mt-2 text-sm text-muted-foreground">
        {caption && <span>{caption} </span>}
        <a href={fullSrc ?? src} aria-label={`View full-size screenshot: ${label}`}>View full size</a>
      </figcaption>
    </figure>
  )
}

function WalletPairing() {
  return (
    <section id="pair-wallets" aria-labelledby="pair-wallets-heading" className="scroll-mt-24 border-t border-border py-6">
      <h3 id="pair-wallets-heading" className="mb-3 text-2xl font-bold tracking-tight">Pair the wallets once</h3>
      <p className="max-w-prose leading-7">Node needs a watch-only copy to track incoming payments and prepare transactions. The signing keys stay on Vault. You can pair an empty wallet using a transfer USB.</p>
      <ol role="list" className="my-5 grid list-none gap-6 md:grid-cols-2">
        <li className="flex min-w-0 flex-col">
          <h4 className="text-lg font-semibold">On Vault, export the watch-only copy</h4>
          <p className="mt-2 flex-1 leading-7">In Bitcoin Core, select your practice wallet and choose <strong>File → Export watch-only wallet</strong>. Choose the transfer USB. If Vault warns that the copy contains address-book or transaction data, check that you intend to share it and choose <strong>Export wallet</strong>. Choosing <strong>Cancel</strong> leaves the file off the USB. Keep the encrypted backup of your signing wallet on a separate drive, offline.</p>
          <PracticePhoto shot={captures["vault-watch-complete"]} label="Watch-only wallet export on Vault" caption={captures["vault-watch-complete"].caption} />
          <details className="signed-download-check">
            <summary>Read the export disclosure before sharing</summary>
            <div className="signed-download-check__body">
              <PracticePhoto shot={captures["vault-watch-disclosure"]} label="Watch-only export disclosure on Vault" caption={captures["vault-watch-disclosure"].caption} />
            </div>
          </details>
        </li>
        <li className="flex min-w-0 flex-col">
          <h4 className="text-lg font-semibold">On Node, open and check the copy</h4>
          <p className="mt-2 flex-1 leading-7">On the same Bitcoin network, choose <strong>File → Restore Wallet</strong> and open the exported file from the USB. In Core’s console, select the restored wallet and run <code>getwalletinfo</code>. Check the wallet name and look for <code>private_keys_enabled: false</code>.</p>
          <PracticePhoto shot={captures["node-public-proof"]} label="Watch-only wallet check on Node" caption={captures["node-public-proof"].caption} />
        </li>
      </ol>
      <p className="max-w-prose leading-7">Before using a receiving address from Node, check that Vault recognizes that exact address as its own.</p>
      <a className="inline-flex min-h-11 items-center text-sm font-semibold" href={practiceLesson("watch-only-setup")}>Verify a receiving address on Vault</a>
    </section>
  )
}

const recoverySteps = [
  {
    title: "Before shutdown",
    text: "Create a receiving address, give it a label and record it. Save the encrypted wallet backup to a separate drive.",
    shot: captures["vault-address-before"],
  },
  {
    title: "After restoring the backup",
    text: "Start a fresh session, decrypt the external backup in Private Workspace and restore it in Core. Compare the saved address and label.",
    shot: captures["vault-address-restored"],
  },
]

function OfflinePayment() {
  return (
    <section id="practice-without-funds" aria-labelledby="practice-payment-heading" className="scroll-mt-24 border-t border-border py-6">
      <h3 id="practice-payment-heading" className="mb-3 text-2xl font-bold tracking-tight">Follow a payment from proposal to broadcast</h3>
      <p className="max-w-prose leading-7">These earlier Bitcoin Core 32.1 screens follow one transaction on Regtest, a private network where you can practise with coins that have no monetary value. The transfer USB carries a partially signed Bitcoin transaction (PSBT) between the computers.</p>
      <ol role="list" className="my-5 grid list-none gap-6 lg:grid-cols-3">
        {paymentSteps.map(({ title, icon: Icon, shot, text }) => (
          <li key={title} className="flex min-w-0 flex-col">
            <h4 className="flex items-center gap-2 text-lg font-semibold"><Icon size={20} aria-hidden="true" className="shrink-0" />{title}</h4>
            <p className="mt-2 flex-1 leading-7">{text}</p>
            <PracticePhoto shot={shot} label={title} />
          </li>
        ))}
      </ol>
      <nav className="first-run-links" aria-label="Offline payment exercises">
        <a href="#first-run">Start with an empty practice wallet</a>
        <a href={practiceLesson("first-offline-signed-transaction")}>Practise this payment step by step</a>
      </nav>
    </section>
  )
}

export function WalletRecovery() {
  return (
    <section id="practice-recovery" aria-labelledby="practice-recovery-heading" className="scroll-mt-24 border-t border-border py-6">
      <h3 id="practice-recovery-heading" className="text-2xl font-bold tracking-tight">Recover the signing wallet in a fresh session</h3>
      <p className="mt-3 max-w-prose leading-7">Compare the same receiving address and label before and after recovery on Vault v0.9.0. This unfunded practice wallet was recovered from its encrypted backup in a fresh offline session.</p>
      <div className="my-5 grid gap-5 md:grid-cols-2">
        {recoverySteps.map(({ title, text, shot }) => (
          <div key={title} className="min-w-0">
            <h4 className="font-semibold">{title}</h4>
            <p className="mt-1 leading-7">{text}</p>
            <PracticePhoto shot={shot} label={title} />
          </div>
        ))}
      </div>
      <p className="max-w-prose leading-7">Recognizing an address is only the first check. Repeat the exercise with test coins and sign a new payment using the recovered wallet. This tests whether you can spend after losing the original setup.</p>
      <details className="my-4 max-w-3xl rounded-lg border border-border px-4">
        <summary className="cursor-pointer py-3 font-semibold">See the payment made after recovery</summary>
        <p className="leading-7">In a separate Bitcoin Core 32.1 Regtest exercise, the restored signer and a new watch-only wallet used fresh data directories. The recovered setup sent 0.05 test BTC. The transaction has six confirmations in the result below.</p>
        <div className="pb-4"><PracticePhoto shot={captures["restored-pair"]} label="Test payment from recovered wallets" /></div>
      </details>
      <nav className="first-run-links" aria-label="Wallet recovery exercises">
        <a href={`${BITCOIN_CORE_WALLET_GUIDE_PATH}?setup=vault`}>Make and restore an encrypted backup</a>
        <a href={practiceLesson("recovery-drill-without-original-coordinator")}>Practise with a replacement signer and node</a>
      </nav>
    </section>
  )
}

export function IsoPracticeWalkthrough() {
  return (
    <>
      <WalletPairing />
      <OfflinePayment />
    </>
  )
}
