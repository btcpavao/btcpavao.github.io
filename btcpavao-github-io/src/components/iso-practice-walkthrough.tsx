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
    text: "The watch-only wallet can see the funds. Save the unsigned payment file (PSBT) to the transfer USB and take it to Vault.",
  },
  {
    title: "You approve it on Vault",
    icon: LockKeyhole,
    shot: captures["psbt-review"],
    text: "Compare the full recipient address with the payment request. Here the recipient gets 0.25 test BTC and the fee is 282 satoshis. Check the change, choose Sign Tx, then save the signed file to the USB.",
  },
  {
    title: "Node sends the payment",
    icon: RadioTower,
    shot: captures["psbt-broadcast"],
    text: "Bring the signed file back to Node. Open it and choose Broadcast Tx. Bitcoin Core displays the transaction ID. The signing keys stayed on the offline computer.",
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
    <section id="pair-wallets" aria-labelledby="pair-wallets-heading" className="my-12 scroll-mt-24 border-t border-border pt-8">
      <h2 id="pair-wallets-heading">Let Node follow your Vault wallet</h2>
      <p className="max-w-prose leading-7">A watch-only copy lets your dedicated Node find incoming payments and prepare transactions. The keys that approve spending stay on Vault. You can try this with an empty wallet.</p>
      <ol className="my-5 grid list-none gap-6 md:grid-cols-2">
        <li className="flex min-w-0 flex-col">
          <h3 className="text-lg font-semibold">On Vault, export the watch-only copy</h3>
          <p className="mt-2 flex-1 leading-7">In Bitcoin Core, select your practice wallet and choose <strong>File → Export watch-only wallet</strong>. Save the file directly to the transfer USB. Keep the encrypted backup of your signing wallet on a separate drive, offline.</p>
          <PracticePhoto shot={{
            src: "/software/screenshots/vault/v0.7.0/watch-only-usb.webp", width: 544, height: 152,
            fullSrc: "/software/screenshots/vault/v0.7.0/watch-only-usb-full.webp",
            alt: "Vault’s Export Successful dialog names /media/vault/TRANSFER/Course files/watch only.dat.",
          }} label="Watch-only wallet export on Vault" caption="Vault v0.7.0 saved watch only.dat to the drive named TRANSFER." />
        </li>
        <li className="flex min-w-0 flex-col">
          <h3 className="text-lg font-semibold">On Node, open and check the copy</h3>
          <p className="mt-2 flex-1 leading-7">On the same Bitcoin network, choose <strong>File → Restore Wallet</strong> and open the exported file from the USB. In Core’s console, select the restored wallet and run <code>getwalletinfo</code>. Check the wallet name and look for <code>private_keys_enabled: false</code>.</p>
          <PracticePhoto shot={captures["node-public-proof"]} label="Watch-only wallet check on Node" caption="Node v0.1.0-rc.2 shows the practice wallet with private keys disabled." />
        </li>
      </ol>
      <p className="max-w-prose leading-7">Before using a receiving address from Node, check that Vault recognizes that exact address as its own. The walkthrough shows how to check the full address in the offline wallet.</p>
      <a className="mt-2 inline-block text-sm font-semibold" href={practiceLesson("watch-only-setup")}>Pair the wallets and verify a receiving address</a>
    </section>
  )
}

const vaultRecoveryPath = "/software/screenshots/curriculum/vault-v0.6.0/"
const recoverySteps = [
  {
    title: "Before shutdown",
    text: "Create a receiving address, give it a label and record it. Save the encrypted wallet backup to a separate drive.",
    shot: {
      src: vaultRecoveryPath + "stock-vault-guide-address-before.webp", width: 1280, height: 160,
      alt: "GuidePractice shows the label Recovery check and its receiving address before the wallet backup.",
    },
  },
  {
    title: "After restoring the backup",
    text: "Start a fresh session, decrypt the external backup in the private workspace and restore it in Core. Compare the saved address and label.",
    shot: {
      src: vaultRecoveryPath + "stock-vault-guide-address-restored.webp", width: 1280, height: 160,
      alt: "GuideRestored shows the same Recovery check label and address after the offline session restarted.",
    },
  },
]

function PaymentAndRecovery() {
  return (
    <section id="practice-without-funds" aria-labelledby="practice-payment-heading" className="my-12 scroll-mt-24 border-t border-border pt-8">
      <h2 id="practice-payment-heading">See how an offline payment works</h2>
      <p className="max-w-prose leading-7">These Bitcoin Core 32.1 screens show one payment on Regtest, a private practice network with coins that carry no value. Follow the same amount from the proposal to the signed payment.</p>
      <ol className="my-5 grid list-none gap-6 lg:grid-cols-3">
        {paymentSteps.map(({ title, icon: Icon, shot, text }) => (
          <li key={title} className="flex min-w-0 flex-col">
            <h3 className="flex items-center gap-2 text-lg font-semibold"><Icon size={20} aria-hidden="true" className="shrink-0" />{title}</h3>
            <p className="mt-2 flex-1 leading-7">{text}</p>
            <PracticePhoto shot={shot} label={title} />
          </li>
        ))}
      </ol>
      <div className="my-6 grid items-center gap-4 md:grid-cols-2">
        <div>
          <h3 className="text-lg font-semibold">Save the signed file on Vault</h3>
          <p className="mt-2 leading-7">In this separate Vault v0.7.0 demonstration, Bitcoin Core shows a green confirmation after signing a practice transaction offline. Choose <strong>Save…</strong> to write the signed file to the transfer USB for your Node.</p>
        </div>
        <PracticePhoto shot={{
          src: "/software/screenshots/vault/v0.7.0/signed-psbt.webp", width: 700, height: 148,
          fullSrc: "/software/screenshots/vault/v0.7.0/signed-psbt-full.webp",
          alt: "Vault’s PSBT Operations window reports a successful signature and shows the Save button.",
        }} label="Signed practice transaction on Vault" />
      </div>
      <p className="flex flex-wrap gap-x-5 gap-y-2 text-sm font-semibold">
        <a href="#first-run">Start with an empty practice wallet</a>
        <a href={practiceLesson("first-offline-signed-transaction")}>Practise this payment step by step</a>
      </p>
      <div id="practice-recovery" className="mt-10 scroll-mt-24">
        <h3 className="text-2xl font-bold tracking-tight">Can I recover if I lose the signing computer?</h3>
        <p className="mt-3 max-w-prose leading-7">Compare these two screenshots from an unfunded wallet on Vault v0.6.0. The test computer was restarted between them. Only the encrypted backup and its passphrases were needed to bring the wallet back.</p>
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
        <p className="flex flex-wrap gap-x-5 gap-y-2 text-sm font-semibold">
          <a href={`${BITCOIN_CORE_WALLET_GUIDE_PATH}?setup=vault`}>Make and restore an encrypted backup</a>
          <a href={practiceLesson("recovery-drill-without-original-coordinator")}>Practise with a replacement signer and node</a>
        </p>
      </div>
    </section>
  )
}

export function IsoPracticeWalkthrough() {
  return (
    <>
      <WalletPairing />
      <PaymentAndRecovery />
    </>
  )
}
