import { BIP39_WRONG_THING_ARTICLE_PATH } from "@/routes"
import "./iso-origin-story.css"

const illustration = "/software/illustrations/origin/what-the-objects-reveal"

const reports = [
  {
    date: "2026-07-30", month: "30 July", title: "Weak seeds in COLDCARD firmware",
    text: "Coinkite confirmed that a flaw in how some firmware generated wallet seeds let thieves recover spending keys and take funds.",
    url: "https://blog.coinkite.com/coldcard-mk3-seed-generation-warning/",
  },
  {
    date: "2026-08-13", month: "13 August", title: "Trezor buyers’ shipping data exposed",
    text: "A breach at fulfillment provider ShipMonk exposed customer names and contact details, including delivery addresses.",
    url: "https://trezor.io/blog/news/recent-customer-data-exposed-in-shipping-provider-incident",
  },
  {
    date: "2026-09-10", month: "10 September", title: "Phishing from a real mailing list",
    text: "A fake security alert sent through Trezor’s newsletter provider directed readers to an app that asked for their wallet backup.",
    url: "https://trezor.io/blog/news/security-incident-at-brevo-our-third-party-email-provider",
  },
  {
    date: "2026-10-15", month: "15 October", title: "Genuine Ledger devices altered in distribution",
    text: "Ledger reported that tampered devices sold through a Southeast Asian reseller channel captured recovery phrases during setup.",
    url: "https://support.ledger.com/article/Ledger-s-Response-to-the-Hardware-Implant-Attack",
  },
  {
    date: "2026-11-12", month: "12 November", title: "Three altered Trezor Safe 5 devices",
    text: "Trezor traced the three devices to the reseller CryptoBilis. At publication, none of the owners had reported losing funds.",
    url: "https://trezor.io/blog/news/our-cryptobilis-investigation-what-we-found-and-what-weve-changed",
  },
]

export function IsoOriginStory() {
  return (
    <section className="iso-origin" id="why-two-computers" aria-labelledby="origin-heading">
      <div className="iso-origin-intro">
        <h2 id="origin-heading">Why I turned a spare computer into a Bitcoin signer</h2>
        <div className="iso-origin-prose">
          <p>Early Bitcoin users ran the original Bitcoin client or Electrum on the same computer they used for email and downloads. By 2011, researchers had found malware that stole Bitcoin wallet files. On an infected desktop, a thief could get to the keys that authorized payments.</p>
          <p>In 2014, Trezor released the first hardware wallet. The little device generated the keys and signed payments while the everyday computer handled the network. I wanted that same separation. What I questioned was the need to buy a specially manufactured signer when a spare laptop could do the job.</p>
          <p className="iso-origin-links"><a href="/en/bitcoin-core/the-hardware-wallet-detour/">Read The Hardware Wallet Detour</a><a href="https://community.broadcom.com/symantecenterprise/viewdocument/all-your-bitcoins-are-ours?CommunityKey=1ecf5f55-9545-44d6-b0f4-4e4a7f5f5e68">The 2011 malware report</a></p>
        </div>
      </div>
      <div className="iso-origin-comparison">
        <figure>
          <img
            src={illustration + ".webp"}
            srcSet={illustration + "-640.webp 640w, " + illustration + ".webp 1200w"}
            sizes="(min-width: 1120px) 504px, (min-width: 780px) 47vw, calc(100vw - 40px)"
            width={1200} height={800} loading="lazy" decoding="async"
            alt="A hardware wallet beside an optical disc and a handwritten slip with five words."
          />
          <figcaption>A hardware wallet suggests what its owner uses it for. An unlabelled disc and five words on paper could each have many uses.</figcaption>
        </figure>
        <div className="iso-origin-prose">
          <h3>What a purchase reveals</h3>
          <p>A shipment of 1,000 hardware wallets contains 1,000 devices designed to secure cryptocurrency. A shipment of 1,000 ordinary laptops could end up running shops, doing homework or signing payments. The order list gives little away. Microsoft alone counted over 1.4 billion active Windows 10 and 11 devices in 2022. Reusing a computer you already own also leaves no new hardware-wallet order tied to your address.</p>
          <p className="iso-origin-links"><a href="/en/bitcoin-core/hardware-wallets-are-an-economic-security-failure/">The economics of targeting wallet buyers</a><a href="https://www.microsoft.com/investor/reports/ar22/index.html">Microsoft’s device count</a></p>
        </div>
      </div>
      <div className="iso-origin-reports">
        <div>
          <h3>What manufacturers reported in 2026</h3>
          <p>From July through November, the manufacturers documented theft, exposure of buyer information and tampering in reseller channels.</p>
        </div>
        <ul>
          {reports.map((report) => (
            <li key={report.date}>
              <time dateTime={report.date}>{report.month}</time>
              <div>
                <a href={report.url}>{report.title}</a>
                <p>{report.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="iso-origin-backup">
        <h3>Why I chose a wallet file over seed words</h3>
        <div className="iso-origin-prose">
          <p>With a typical single-signature BIP39 wallet, a person who finds the recovery words on paper or steel can recreate its spending keys unless a separate BIP39 passphrase protects it. Making another copy of those words creates another place where someone could find them. The words also leave out wallet details such as address labels.</p>
          <p>Bitcoin Core never adopted BIP39 for its native wallet backups. When I back up a Core wallet, I get a file containing its keys, addresses and labels. I can encrypt it, make copies and practise restoring the whole wallet. That is the recovery model I wanted to put on an ordinary computer.</p>
          <a href={BIP39_WRONG_THING_ARTICLE_PATH}>Why I prefer a wallet file to recovery words</a>
        </div>
      </div>
    </section>
  )
}
