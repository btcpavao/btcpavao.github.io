import { BIP39_WRONG_THING_ARTICLE_PATH, EN_BITCOIN_CORE_ENTROPY_ARTICLE_PATH } from "@/routes"
import "./iso-origin-story.css"

const illustration = "/software/illustrations/origin/what-the-objects-reveal"

const reports = [
  {
    date: "2026-07-30", month: "July 30", title: "Weak seeds in COLDCARD firmware",
    text: "Coinkite confirmed that a flaw in how some firmware generated wallet seeds let thieves recover spending keys and take funds.",
    url: "https://blog.coinkite.com/coldcard-mk3-seed-generation-warning/",
  },
  {
    date: "2026-08-13", month: "August 13", title: "Shipping records exposed for some Trezor buyers",
    text: "Trezor said a breach at ShipMonk, one of its shipping companies, exposed customers’ contact details. For some buyers, these included their delivery address.",
    url: "https://trezor.io/blog/news/recent-customer-data-exposed-in-shipping-provider-incident",
  },
  {
    date: "2026-09-10", month: "September 10", title: "Phishing through Trezor’s newsletter",
    text: "Trezor reported that someone used its account at Brevo, its newsletter provider, to send readers a fake alert. It led to an app that asked for their wallet backup.",
    url: "https://trezor.io/blog/news/security-incident-at-brevo-our-third-party-email-provider",
  },
  {
    date: "2026-10-15", month: "October 15", title: "Genuine Ledger devices altered in distribution",
    text: "Ledger reported that tampered devices sold through a Southeast Asian reseller channel captured recovery phrases during setup.",
    url: "https://support.ledger.com/article/Ledger-s-Response-to-the-Hardware-Implant-Attack",
  },
  {
    date: "2026-11-12", month: "November 12", title: "Three altered Trezor Safe 5 devices",
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
          <p className="iso-origin-links"><a href="/bitcoin-core/the-hardware-wallet-detour/">Read The Hardware Wallet Detour</a><a href="https://community.broadcom.com/symantecenterprise/viewdocument/all-your-bitcoins-are-ours?CommunityKey=1ecf5f55-9545-44d6-b0f4-4e4a7f5f5e68">The 2011 malware report</a></p>
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
          <figcaption>The device on the left identifies itself as a hardware wallet. Looking at the unlabeled CD tells you nothing about its contents. The words on the paper give no address or filename to connect them to.</figcaption>
        </figure>
        <div className="iso-origin-prose">
          <h3 id="privacy-and-security">Privacy is part of security</h3>
          <p>A shipment of 1,000 hardware wallets gives a thief a reason to want the delivery list. Each order connects a buyer to a device built to secure cryptocurrency. A shipment of 1,000 ordinary laptops could end up running shops, doing homework or signing payments. I can dedicate a computer I already own to Bitcoin without putting my home address on a wallet vendor’s order list.</p>
          <p>On Vault I can encrypt the entire wallet backup with GnuPG and burn it to an ordinary CD. Even someone who copies the file still needs the strong passphrase to read it. I can write that passphrase on paper and keep it somewhere else. Someone who finds the paper can read the words. The words alone tell them neither which file they unlock nor where to find it.</p>
          <p>That privacy carries through to the payment. My own Bitcoin Core node checks the blockchain locally for payments to my addresses. I sign offline on Vault, then my node sends the signed transaction directly to its Bitcoin peers. The confirmed transaction is public. My address list, balance queries and wallet labels never need to go to a third-party wallet server. That gives a thief fewer places to learn what I hold or where to look for it.</p>
          <p className="iso-origin-links"><a href="/bitcoin-core/hardware-wallets-are-an-economic-security-failure/">The economics of targeting wallet buyers</a><a href="https://bitcoin.org/en/bitcoin-core/features/privacy">How Bitcoin Core protects wallet privacy</a></p>
        </div>
      </div>
      <details className="iso-origin-reports">
        <summary>Five 2026 incident reports from Coinkite, Trezor and Ledger</summary>
        <p>The dates below are when a manufacturer published or updated its report.</p>
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
      </details>
      <div className="iso-origin-backup">
        <h3 id="wallet-file-and-entropy">Why I chose a wallet file over seed words</h3>
        <div className="iso-origin-prose">
          <p>A BIP39 wallet can start with weak entropy and still give you 24 words with a valid checksum. The checksum can catch a copying error. It tells you nothing about how hard the original input was to guess. A generator that accepts predictable input can turn it into a perfectly ordinary-looking recovery phrase.</p>
          <p>When I click Create Wallet in Bitcoin Core, I cannot supply my own words or substitute my own entropy. Core generates the seed internally with its cryptographic random-number generator, mixing in fresh randomness from the operating system. Choosing a predictable seed is one mistake the native wallet creation screen takes out of my hands.</p>
          <p>With a typical single-signature BIP39 wallet, a person who finds the recovery words on paper or steel can recreate its spending keys unless a separate BIP39 passphrase protects it. Making another copy of those words creates another place where someone could find them. The words also leave out wallet details such as address labels.</p>
          <p>Bitcoin Core never adopted BIP39 for its native wallet backups. When I back up a Core wallet, I get a file containing its keys, addresses and labels. I can encrypt it, make copies and practice restoring the whole wallet. That is the recovery model I wanted to put on an ordinary computer.</p>
          <p className="iso-origin-links"><a href={BIP39_WRONG_THING_ARTICLE_PATH}>Why I prefer a wallet file to recovery words</a><a href={EN_BITCOIN_CORE_ENTROPY_ARTICLE_PATH}>How Bitcoin Core generates wallet entropy</a><a href="https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki#generating-the-mnemonic">How BIP39 encodes entropy</a></p>
        </div>
      </div>
    </section>
  )
}
