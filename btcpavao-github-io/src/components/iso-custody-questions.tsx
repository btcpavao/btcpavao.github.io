import { useState } from "react"
import { CalendarDays, Mail, MessageCircle } from "lucide-react"
import { CurriculumQuestionForm } from "@/components/curriculum-question-form"
import { BITCOIN_CORE_WALLET_GUIDE_PATH, EN_BITCOIN_CORE_CURRICULUM_PATH, START_HERE_PATH } from "@/routes"
import { BOOKING_URL, CONTACT_EMAIL, CONTACT_EMAIL_URL } from "@/site-config"

const imageLesson = (slug: string) => EN_BITCOIN_CORE_CURRICULUM_PATH + "?setup=vault-node#lesson/" + slug
const standardLesson = (slug: string) => EN_BITCOIN_CORE_CURRICULUM_PATH + "#lesson/" + slug

const questions = [
  {
    question: "Can I send shares of IBIT or FBTC to Vault?",
    answer: "A retail investor holds shares in a brokerage account. The fund’s bitcoin stays with its custodian. You cannot send those shares to a Bitcoin address. You can learn to receive, back up and spend test bitcoin while keeping your brokerage position as it is.",
    links: [
      ["iShares on IBIT", "https://www.ishares.com/us/products/digital-assets"],
      ["Fidelity’s fund questions", "https://www.fidelity.com/etfs/crypto-funds"],
    ],
  },
  {
    question: "My BTC is on an exchange. How can I check my withdrawal address?",
    answer: "When your exchange supports a withdrawal over the Bitcoin network, compare the entire destination address on its confirmation screen with the address from your own offline wallet. If they differ, stop. Once you have tested recovery, a small withdrawal and a confirmed payment signed from the restored wallet let you check both directions.",
    links: [["Check the setup before your first deposit", imageLesson("mainnet-readiness-before-first-deposit")]],
  },
  {
    question: "What could someone learn or spend if they took my online computer?",
    answer: "Your watch-only copy lets Node see addresses, balances and transaction history. Someone who can read its disk may learn those details. In this setup the keys needed to spend are on Vault. An untrusted Node could still show a misleading address or propose a different payment. Check the receiving address on Vault and read the recipient, amount and fee on its screen before signing.",
    links: [
      ["Review a payment offline", imageLesson("first-offline-signed-transaction")],
      ["Node RC2 storage and login details", "https://github.com/btcpavao/bitcoin-core-node-releases/releases/tag/v0.1.0-rc.2"],
    ],
  },
  {
    question: "Could my family recover the wallet if the laptop broke or Pavao became unavailable?",
    answer: "With a readable backup and every required passphrase, a family member can decrypt the backup with standard GnuPG and restore the wallet in Bitcoin Core on a different offline computer. Give them written instructions and disposable practice materials. Ask them to recover and sign a test payment without your help. A familiar address alone can also appear in a watch-only wallet.",
    links: [
      ["Recover without the original computers", imageLesson("recovery-drill-without-original-coordinator")],
      ["Write instructions another person can use", imageLesson("document-the-procedure-without-exposing-secrets")],
    ],
  },
  {
    question: "Our business needs two approvals. Does a second backup give us that?",
    answer: "A second backup helps you recover the same wallet. With a single signing key, one person who controls that key can still authorize a payment. If your family or business needs two people to approve spending, write down who can sign, build a policy that requires their signatures and rehearse what happens when a signer is unavailable.",
    links: [["Work through a spending policy", standardLesson("complex-wallet-simple-recovery")]],
  },
  {
    question: "Can I follow the same method with my own Debian installation?",
    answer: "Yes. Install Debian on dedicated compatible computers, verify Bitcoin Core directly and follow its two-computer signing guide. You or your specialist take responsibility for the offline settings, temporary storage, transfers and backup tools. The wallet and recovery lessons also work with standard Core and GnuPG.",
    links: [
      ["Set up dedicated Debian", standardLesson("debian-setup")],
      ["Bitcoin Core’s offline signing guide", "https://github.com/bitcoin/bitcoin/blob/v32.1/doc/offline-signing-tutorial.md"],
    ],
  },
  {
    question: "Does a review still apply after I update?",
    answer: "A review refers to a specific release and the digital fingerprint of its ISO. When you change versions, check the new signature, read what changed and ask which parts were checked again. If a finding relevant to your wallet remains open, you can keep evaluating with test funds or ask a reviewer you choose to examine it.",
    links: [["Give this release to my reviewer", "#reviewer-brief"]],
  },
]

export function IsoCustodyQuestions() {
  const [showForm, setShowForm] = useState(false)

  return (
    <>
      <section className="iso-custody-section" id="custody-questions" aria-labelledby="iso-custody-title">
        <h2 id="iso-custody-title">Questions before moving your bitcoin</h2>
        <div className="iso-custody-faq">
          {questions.map(({ question, answer, links }) => (
            <details key={question}>
              <summary>{question}</summary>
              <p>{answer}</p>
              <div className="iso-custody-links">
                {links.map(([label, href]) => <a key={href} href={href}>{label}</a>)}
              </div>
            </details>
          ))}
        </div>
      </section>

      <section className="iso-custody-section" id="before-moving-bitcoin" aria-labelledby="iso-readiness-title">
        <h2 id="iso-readiness-title">From an empty wallet to your first small payment</h2>
        <ol className="iso-readiness-steps">
          <li>
            <strong>Practise without putting savings at risk.</strong> Create an empty practice wallet, save an encrypted backup on a separate drive and keep its passphrases separately. Restore it on a clean offline computer. With coins on Bitcoin’s Signet test network, prove you can sign a payment from the restored wallet and confirm it on your online Node.
            <div className="iso-custody-links">
              <a href={START_HERE_PATH + "?setup=vault"}>Start with an empty wallet</a>
              <a href={BITCOIN_CORE_WALLET_GUIDE_PATH + "?setup=vault#optional-backup-protection"}>Make an encrypted backup</a>
              <a href={imageLesson("recovery-drill-without-original-coordinator")}>Practise the recovery and payment</a>
            </div>
          </li>
          <li>
            <strong>Create a fresh wallet for savings.</strong> When you choose to proceed, create new keys and passphrases offline, make your backups, then restore from one while the wallet is still empty. Check the recorded receiving address on the restored Vault and the watch-only copy on Node.
            <div className="iso-custody-links"><a href={imageLesson("restore-in-a-clean-test-environment")}>Restore the empty savings wallet</a></div>
          </li>
          <li>
            <strong>Test a small amount in both directions.</strong> Compare the full receiving address on Vault before sending. After the small deposit confirms, use the restored wallet to sign a small payment to another address you control. Check the recipient, amount and fee on Vault. Broadcast on Node and wait for confirmation before deciding whether to move more.
            <div className="iso-custody-links"><a href={imageLesson("first-small-mainnet-test")}>Follow the first small payment</a></div>
          </li>
        </ol>
      </section>

      <section className="iso-custody-section iso-contact" id="ask-pavao" aria-labelledby="iso-contact-title">
        <h2 id="iso-contact-title">Ask Pavao about Vault or Node</h2>
        <p>What would you like to check before using either system? You can describe the step that concerns you without sharing your balance, addresses, wallet files, private keys or passphrases.</p>
        <details className="iso-contact-form course-question-panel" onToggle={(event) => { if (event.currentTarget.open) setShowForm(true) }}>
          <summary><MessageCircle aria-hidden="true" /> Send a question without giving your name or email</summary>
          {showForm && <CurriculumQuestionForm material="download guide" context={{
            section: "Vault and Node download guide",
            lesson: "What exactly am I verifying?",
            slug: "what-verification-proves",
          }} />}
        </details>
        <div className="iso-contact-options">
          <div>
            <a href={CONTACT_EMAIL_URL}><Mail aria-hidden="true" /> Email Pavao</a>
            <p>For a personal reply, write to {CONTACT_EMAIL} or leave a reply address in the form.</p>
          </div>
          <div>
            <a href={BOOKING_URL}><CalendarDays aria-hidden="true" /> Book a 15-minute introduction</a>
            <p>Bring a question about your setup or invite the specialist reviewing it. If we arrange a longer session, you decide afterwards what it was worth to you.</p>
          </div>
        </div>
      </section>
    </>
  )
}
