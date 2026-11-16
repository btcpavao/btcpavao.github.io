import { HardDrive, LockKeyhole, RadioTower } from "lucide-react"
import { captures } from "@/curriculum/practice-captures"
import { BITCOIN_CORE_WALLET_GUIDE_PATH, EN_BITCOIN_CORE_CURRICULUM_PATH, START_HERE_PATH } from "@/routes"
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

type PracticeShot = Pick<(typeof captures)[keyof typeof captures], "src" | "width" | "height" | "alt">

function PracticePhoto({ shot: { src, width, height, alt }, label }: { shot: PracticeShot; label: string }) {
  return (
    <figure className="mt-3 min-w-0">
      <ZoomableImage src={src} width={width} height={height} alt={alt}
        className="block h-auto max-w-full rounded-md border border-border" loading="lazy" decoding="async" />
      <figcaption className="mt-2 text-sm text-muted-foreground">
        <a href={src} aria-label={`View full-size screenshot: ${label}`}>View full size</a>
      </figcaption>
    </figure>
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

export function IsoPracticeWalkthrough() {
  return (
    <section id="practice-without-funds" aria-labelledby="practice-payment-heading" className="my-12 scroll-mt-24 border-t border-border pt-8">
      <h2 id="practice-payment-heading">Follow a payment from Node to Vault and back</h2>
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
      <p className="flex flex-wrap gap-x-5 gap-y-2 text-sm font-semibold">
        <a href={`${START_HERE_PATH}?setup=vault`}>Start with an empty practice wallet</a>
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
