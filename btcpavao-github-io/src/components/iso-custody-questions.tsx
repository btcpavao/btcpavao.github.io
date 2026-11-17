import { useEffect, useRef, useState } from "react"
import { CalendarDays, Mail, MessageCircle } from "lucide-react"
import { CurriculumQuestionForm } from "@/components/curriculum-question-form"
import { BITCOIN_CORE_WALLET_GUIDE_PATH, DEBIAN_IMAGE_VERIFICATION_PATH, EN_BITCOIN_CORE_CURRICULUM_PATH, START_HERE_PATH } from "@/routes"
import { BOOKING_URL, CONTACT_EMAIL, CONTACT_EMAIL_URL } from "@/site-config"

const imageLesson = (slug: string) => EN_BITCOIN_CORE_CURRICULUM_PATH + "?setup=vault-node#lesson/" + slug
const standardLesson = (slug: string) => EN_BITCOIN_CORE_CURRICULUM_PATH + "#lesson/" + slug

const questions = [
  {
    question: "Will these images run on my computer?",
    answer: "Both images are built for compatible 64-bit Intel and AMD computers. Apple Silicon Macs use a different processor. You can try Vault in Live RAM from a USB stick. Node RC2 is a test release that installs to a dedicated disk and erases its contents. Check the release notes for boot and hardware requirements.",
    links: [
      ["Vault release notes", "https://github.com/btcpavao/bitcoin-core-vault-releases/releases/tag/v0.7.0"],
      ["Node release notes", "https://github.com/btcpavao/bitcoin-core-node-releases/releases/tag/v0.1.0-rc.2"],
    ],
  },
  {
    question: "How do I know I downloaded the file Pavao published?",
    answer: "Before writing the USB, confirm Pavao’s public signing-key fingerprint through a separate channel you already trust. The guide then checks the signature on his list of file fingerprints and compares your ISO with its entry. A match means the downloaded bytes are the ones he signed for.",
    links: [
      ["Check my Vault download", "#verify-vault-download"],
      ["Check my Node download", "#verify-node-download"],
    ],
  },
  {
    question: "Can someone I trust inspect the code and rebuild the ISO?",
    answer: "Yes. The review guide identifies Pavao’s additions and links to the source for each release. Two builds run by this project matched the signed Vault v0.7.0 download byte for byte. For Node, the matching builds produced a separate unsigned comparison image. The signed Node RC2 download still has no demonstrated byte-for-byte rebuild.",
    links: [
      ["Inspect the code and build evidence", DEBIAN_IMAGE_VERIFICATION_PATH],
      ["Give the brief to my reviewer", DEBIAN_IMAGE_VERIFICATION_PATH + "#reviewer-brief"],
    ],
  },
  {
    question: "Are the words protecting my Vault backup a seed phrase?",
    answer: "They unlock a particular encrypted file. Someone holding only those words has no wallet keys or addresses from them. With BIP39, the recovery words generate a wallet seed. In a typical single-signature wallet, a holder of those words can recreate the signing keys unless you used an additional BIP39 passphrase.",
    links: [
      ["See what a Vault recovery needs", "#wallet-backup-plan"],
      ["Read the BIP39 specification", "https://bips.dev/39/"],
    ],
  },
  {
    question: "My BTC is on an exchange. How can I check my withdrawal address?",
    answer: "Choose the Bitcoin network for the withdrawal. Compare the full address on the exchange’s confirmation screen with the receiving address on Vault. If they differ, stop. After testing wallet recovery, try a small withdrawal. Then sign a small payment from the restored wallet and confirm it on Node.",
    links: [["Check the setup before your first deposit", imageLesson("mainnet-readiness-before-first-deposit")]],
  },
  {
    question: "What if someone takes my Node computer?",
    answer: "Someone who can read Node’s disk may see your addresses, balance and transaction history. The keys needed to spend stay on Vault. If someone tampers with Node, it could show a different address or propose a different payment. Check your receiving address on Vault. Before signing a payment, check the recipient, amount and fee on Vault too.",
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
    links: [["Give this release to my reviewer", DEBIAN_IMAGE_VERIFICATION_PATH + "#reviewer-brief"]],
  },
]

const vaultRelease = "Bitcoin Core Vault v0.7.0"
const contactTopics: Record<string, { section: string; lesson: string; prompt?: string }> = {
  "ask-pavao": { section: "Vault and Node download guide", lesson: "General question", prompt: "What would you like to know before trying Vault or Node?" },
  "ask-verify": { section: vaultRelease, lesson: "Checking the signed Vault download" },
  "ask-usb": { section: vaultRelease, lesson: "Writing the Vault USB" },
  "ask-boot": { section: vaultRelease, lesson: "Starting Vault in Live RAM" },
  "ask-wallet": { section: vaultRelease, lesson: "Creating an empty practice wallet" },
  "ask-feedback": { section: vaultRelease, lesson: "First-run feedback", prompt: "Which computer did you try, and how did it go?" },
  "ask-node-setup": { section: "Bitcoin Core Node v0.1.0-rc.2", lesson: "Setting up a dedicated Node", prompt: "What would you like to know about setting up or using Node?" },
  "ask-node-verify": { section: "Bitcoin Core Node v0.1.0-rc.2", lesson: "Checking the signed Node download" },
}

export function IsoCustodyQuestions() {
  const panel = useRef<HTMLDetailsElement>(null)
  const [showForm, setShowForm] = useState(false)
  const [topic, setTopic] = useState(contactTopics["ask-pavao"])
  const [focusRequest, setFocusRequest] = useState(0)

  useEffect(() => {
    function openFromHash() {
      const id = window.location.hash.slice(1)
      if (!Object.hasOwn(contactTopics, id) || !panel.current) return
      panel.current.open = true
      setTopic(contactTopics[id])
      setShowForm(true)
      setFocusRequest(n => n + 1)
    }

    // Following a second link to the current fragment doesn't fire hashchange.
    function repeatLink(event: MouseEvent) {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
      const link = event.target instanceof Element ? event.target.closest("a[href]") : null
      if (link instanceof HTMLAnchorElement && link.href === window.location.href) openFromHash()
    }

    openFromHash()
    window.addEventListener("hashchange", openFromHash)
    document.addEventListener("click", repeatLink)
    return () => {
      window.removeEventListener("hashchange", openFromHash)
      document.removeEventListener("click", repeatLink)
    }
  }, [])

  useEffect(() => {
    if (!focusRequest) return
    const frame = requestAnimationFrame(() => {
      const field = panel.current?.querySelector<HTMLElement>("textarea, .course-question__receipt")
      field?.focus({ preventScroll: true })
      panel.current?.scrollIntoView({ block: "start", behavior: "instant" })
    })
    return () => cancelAnimationFrame(frame)
  }, [focusRequest])

  return (
    <>
      <section className="iso-custody-section" id="custody-questions" aria-labelledby="iso-custody-title">
        <h2 id="iso-custody-title">Frequently asked questions</h2>
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
        {Object.keys(contactTopics).filter(id => id !== "ask-pavao").map(id => (
          <span className="iso-contact-anchor" key={id} id={id} aria-hidden="true" />
        ))}
        <h2 id="iso-contact-title">Ask Pavao about Vault or Node</h2>
        <p>You can ask a question without entering your name or email. Please include an email address if you would like a personal reply. Keep wallet files, addresses and passphrases private.</p>
        <details ref={panel} className="iso-contact-form course-question-panel" onToggle={(event) => { if (event.currentTarget.open) setShowForm(true) }}>
          <summary><MessageCircle aria-hidden="true" /> Write to Pavao</summary>
          {showForm && <CurriculumQuestionForm
            context={{ section: topic.section, lesson: topic.lesson, material: "download guide" }}
            questionLabel={topic.prompt ?? "What did you expect to see, and what appeared on your screen?"}
          />}
          <noscript>Please enable JavaScript to use the form, or email Pavao below.</noscript>
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
