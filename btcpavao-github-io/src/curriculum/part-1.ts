import type { PlayerLesson } from "../bitcoin-core-curriculum-player-en-data"

export const part1Lessons: PlayerLesson[] = [
  {
    id: "0.1",
    slug: "what-self-custody-really-means",
    title: "Start with the threat, then choose the tools",
    summary: "Understand the decisions this course will teach you to make.",
    objective: "Understand the decisions this course will teach you to make.",
    what: "Understand the decisions this course will teach you to make.",
    why: "Custody means keeping the ability to spend while preventing someone else from taking it.",
    risk: "Buying equipment before understanding failure modes can leave the important risks untouched.",
    status: "published",
    verification: "source-reviewed",
    referenceVersion: "Bitcoin Core 31.1",
    contentUpdated: "2026-09-13",
    estimatedTime: "8–12 min",
    kind: "reading",
    explanation: [
      "Do not begin with a product. Begin with a threat. A private key is a secret that lets you authorize a Bitcoin payment. Self-custody means you take responsibility for protecting that authority and recovering it when equipment fails.",
      "This course recommends Bitcoin Core on dedicated generic computers running Debian Stable. You will first understand why, then practice a simple encrypted single-sig wallet, and only then consider policies that need several signers. Single-sig means one signing key is sufficient for a particular payment.",
      "The main path needs no real bitcoin. You will use Signet, a public practice network whose coins have no intended monetary value. Some advanced exercises use Regtest, a private test chain on which you create your own blocks.",
      "You finish by being able to explain your choices and recover your wallet. A bigger collection of devices is not the goal. The goal is the simplest system that robustly covers your actual threats.",
    ],
    prerequisites: [],
    sources: [
      {
        label: "Bitcoin Core 31.1: wallet creation, backup and restoration",
        url: "https://github.com/bitcoin/bitcoin/blob/v31.1/doc/managing-wallets.md",
      },
    ],
    reviewNote:
      "Content and cited sources reviewed on 2026-09-13. Any hands-on evidence is listed separately. Source review is not a claim that every platform or physical procedure was tested.",
    origin: "First-principles curriculum v4",
    checklist: [
      "I can distinguish possession of a key from a tested custody system.",
    ],
    chapter: "Begin with the threat",
    optional: false,
    sourceReviewed: "2026-09-13",
    takeaway:
      "Self-custody protects your ability to authorize payments and recover after failure. Choosing equipment comes after identifying the threats.",
  },
  {
    id: "0.2",
    slug: "threat-model-before-tools",
    title: "Write your threat model before choosing a solution",
    summary:
      "Describe what you protect, what could go wrong and who needs to recover it.",
    objective:
      "Describe what you protect, what could go wrong and who needs to recover it.",
    what: "Describe what you protect, what could go wrong and who needs to recover it.",
    why: "A threat model is a short explanation of the failures your setup must withstand.",
    risk: "A plan that only imagines a remote hacker may overlook the lost password that actually defeats recovery.",
    status: "published",
    verification: "source-reviewed",
    referenceVersion: "Bitcoin Core 31.1",
    contentUpdated: "2026-09-13",
    estimatedTime: "20–40 min active",
    kind: "practice",
    explanation: [
      "An attacker is someone deliberately trying to steal your signing authority or mislead you into spending. Accidental loss needs no attacker: a broken drive, forgotten passphrase or mistaken deletion can have the same final result.",
      "Device compromise means an attacker controls enough of a computer to undermine its intended job. Malware is malicious software; physical access means someone can handle, replace or modify your machine or media. A supply-chain attack happens before you receive or install something, for example by substituting a modified device or download.",
      "Phishing is a deceptive message or website that asks you to reveal a secret or approve the wrong action. Vendor failure is the loss of a company or service you depend on. Software continuity risk is the possibility that, years later, the program, format knowledge or compatible equipment needed for recovery is difficult to obtain.",
      "Operational error is your own procedure going wrong: selecting the wrong wallet, losing track of an old backup or approving the wrong recipient. Inheritance and recovery risk concerns the person who must act if you are unavailable. Include fire, flood, theft and a long period without maintenance.",
    ],
    prerequisites: ["0.1"],
    sources: [
      {
        label: "Bitcoin Core 31.1: wallet creation, backup and restoration",
        url: "https://github.com/bitcoin/bitcoin/blob/v31.1/doc/managing-wallets.md",
      },
    ],
    reviewNote:
      "Content and cited sources reviewed on 2026-09-13. Any hands-on evidence is listed separately. Source review is not a claim that every platform or physical procedure was tested.",
    origin: "First-principles curriculum v4",
    guidedSteps: [
      {
        id: "assets-horizon",
        title: "Name the asset and the time horizon",
        instructions: [
          "Write the purpose of this wallet: practice, frequent payments or long-term savings. Choose a review horizon and identify who must recover it if you cannot. Do not record a balance, key or passphrase on this website.",
          "Write what failure you could tolerate: one lost computer, one destroyed location, an absent family member, or an attacker with temporary physical access.",
        ],
        expectedResult:
          "A short private record describes the wallet purpose, likely failures and recovery person.",
        help: "Use a concrete event, such as a broken disk or a lost password. If you cannot say which part of your plan survives it, write down that gap before choosing another device.",
      },
      {
        id: "rank-threats",
        title: "Rank the failures",
        instructions: [
          "List deliberate attacks separately from accidents. Include malware, physical access, supply-chain substitution, phishing, vendor disappearance, incompatible software, human error and inheritance.",
          "Select the few plausible failures your setup must survive. Beside each, write the control you propose and what new work that control creates.",
        ],
        expectedResult:
          "Every proposed protection has a named threat and an operational cost.",
        help: "Use a concrete event, such as a broken disk or a lost password. If you cannot say which part of your plan survives it, write down that gap before choosing another device.",
      },
      {
        id: "revisit",
        title: "Set the review trigger",
        instructions: [
          "Record an annual review date and earlier triggers: a major balance change, suspected compromise, relocation or a new recovery person.",
        ],
        expectedResult:
          "You know when to reassess the plan instead of collecting more equipment automatically.",
        help: "Use a concrete event, such as a broken disk or a lost password. If you cannot say which part of your plan survives it, write down that gap before choosing another device.",
      },
    ],
    chapter: "Begin with the threat",
    optional: false,
    sourceReviewed: "2026-09-13",
    takeaway:
      "Your threat model names the failures you need to survive, the people who might attack you and the people who must be able to recover.",
  },
  {
    id: "0.3",
    slug: "security-is-a-process",
    title: "Complexity has a security and economic cost",
    summary: "Add a component only when it solves a named problem.",
    objective: "Add a component only when it solves a named problem.",
    what: "Add a component only when it solves a named problem.",
    why: "Time, maintenance and correct recovery are scarce resources.",
    risk: "Extra steps can introduce more ways to make a mistake than they remove.",
    status: "published",
    verification: "source-reviewed",
    referenceVersion: "Bitcoin Core 31.1",
    contentUpdated: "2026-09-13",
    estimatedTime: "8–12 min",
    kind: "reading",
    explanation: [
      "Security complexity is a cost. Add complexity only when it solves a threat that actually exists. Another device needs storage and maintenance; another program needs verification and future compatibility; another secret needs its own recovery plan.",
      "Consider a second backup in another location. It addresses loss of the first location. Consider instead a second required signer: it changes who can authorize a payment. Those are different problems, even if both arrangements happen to involve two objects.",
      "For every proposed layer, finish this sentence: “I am adding this because it prevents ___, and I will maintain it by ___.” If you cannot complete both parts, leave it out until you can.",
    ],
    prerequisites: ["0.2"],
    sources: [
      {
        label: "Bitcoin Core 31.1: wallet creation, backup and restoration",
        url: "https://github.com/bitcoin/bitcoin/blob/v31.1/doc/managing-wallets.md",
      },
    ],
    reviewNote:
      "Content and cited sources reviewed on 2026-09-13. Any hands-on evidence is listed separately. Source review is not a claim that every platform or physical procedure was tested.",
    origin: "First-principles curriculum v4",
    checklist: [
      "I can name the threat addressed by every component in my proposed setup.",
    ],
    chapter: "Begin with the threat",
    optional: false,
    sourceReviewed: "2026-09-13",
    takeaway:
      "Each extra component brings work and possible failure. Add it only when it addresses a specific weakness in your existing plan.",
  },
  {
    id: "custody-economics",
    slug: "custody-economics",
    title: "Bitcoin custody does not scale like a gold vault",
    summary: "Separate the value at risk from the price of the equipment.",
    objective: "Separate the value at risk from the price of the equipment.",
    what: "Separate the value at risk from the price of the equipment.",
    why: "Protecting more value can change the adversary without requiring proportionally more machinery.",
    risk: "Expensive hardware can create confidence without addressing the actual attack.",
    status: "published",
    verification: "source-reviewed",
    referenceVersion: "Bitcoin Core 31.1",
    contentUpdated: "2026-09-13",
    estimatedTime: "8–12 min",
    kind: "reading",
    explanation: [
      "More physical gold can mean more space, heavier transport, stronger storage and additional people to guard or verify it. Its physical custody costs can grow with the quantity. Gold must also be assayed: tested to establish that it is what the seller claims.",
      "Bitcoin is controlled through information. An ordinary used computer can create signatures for a small balance or a large one; it does not need more computing power because the coins are worth more. The physical security of devices and backups still matters, but hardware cost does not need to grow in proportion to the balance.",
      "A larger balance may attract a more capable attacker, justify different physical arrangements or require shared authority. Revisit the threat model when value changes. Do not infer the number of signers or the price of a device directly from a BTC amount.",
    ],
    prerequisites: ["0.3"],
    sources: [
      {
        label: "Bitcoin Core 31.1: wallet creation, backup and restoration",
        url: "https://github.com/bitcoin/bitcoin/blob/v31.1/doc/managing-wallets.md",
      },
    ],
    reviewNote:
      "Content and cited sources reviewed on 2026-09-13. Any hands-on evidence is listed separately. Source review is not a claim that every platform or physical procedure was tested.",
    origin:
      "Author’s security and economic reasoning; no hardware price or attack-cost estimate asserted",
    chapter: "Begin with the threat",
    optional: false,
    sourceReviewed: "2026-09-13",
    takeaway:
      "A larger Bitcoin balance can change your threats without requiring proportionally more powerful or expensive signing hardware.",
  },
  {
    id: "2.1",
    slug: "what-is-bitcoin-core",
    title: "Bitcoin Core is a wallet and your own verifier",
    summary: "Understand the two jobs bundled in Bitcoin Core.",
    objective: "Understand the two jobs bundled in Bitcoin Core.",
    what: "Understand the two jobs bundled in Bitcoin Core.",
    why: "Controlling a key and independently checking a payment answer different questions.",
    risk: "A wallet can display information obtained from someone else without checking every consensus rule itself.",
    status: "published",
    verification: "source-reviewed",
    referenceVersion: "Bitcoin Core 31.1",
    contentUpdated: "2026-09-13",
    estimatedTime: "8–12 min",
    kind: "reading",
    explanation: [
      "The wallet keeps the information needed to receive and authorize payments. The node downloads Bitcoin data and checks it against consensus rules: the rules that determine which transactions and blocks it will accept.",
      "A full validating node checks the chain locally. Bitcoin Core therefore gives you a wallet and a verifier in the same maintained project. Its graphical application runs both; you do not need a separate server program just to use its windows and menus.",
      "The jobs can also be separated. An online computer can validate and prepare payments without having private keys. An offline computer can hold the keys and sign a prepared payment without downloading the blockchain.",
    ],
    prerequisites: ["custody-economics"],
    sources: [
      {
        label: "Bitcoin Core 31.1: wallet creation, backup and restoration",
        url: "https://github.com/bitcoin/bitcoin/blob/v31.1/doc/managing-wallets.md",
      },
      {
        label: "Bitcoin Core 31.1: data files",
        url: "https://github.com/bitcoin/bitcoin/blob/v31.1/doc/files.md",
      },
      {
        label: "Bitcoin Core 31.1: offline signing tutorial",
        url: "https://github.com/bitcoin/bitcoin/blob/v31.1/doc/offline-signing-tutorial.md",
      },
    ],
    reviewNote:
      "Content and cited sources reviewed on 2026-09-13. Any hands-on evidence is listed separately. Source review is not a claim that every platform or physical procedure was tested.",
    origin: "First-principles curriculum v4",
    chapter: "Verify for yourself",
    optional: false,
    sourceReviewed: "2026-09-13",
    takeaway:
      "Bitcoin Core combines wallet functions with your own verifier of Bitcoin’s rules.",
  },
  {
    id: "own-node",
    slug: "your-node-matters-first-to-you",
    title: "Verification belongs inside the custody model",
    summary: "Explain what your own node adds to control of a private key.",
    objective: "Explain what your own node adds to control of a private key.",
    what: "Explain what your own node adds to control of a private key.",
    why: "You need to establish that the payment you received satisfies the rules you enforce.",
    risk: "A third party can misreport your balance, omit information or tell you that an invalid payment is acceptable.",
    status: "published",
    verification: "source-reviewed",
    referenceVersion: "Bitcoin Core 31.1",
    contentUpdated: "2026-09-13",
    estimatedTime: "8–12 min",
    kind: "reading",
    explanation: [
      "If you received a gold bar, holding it would not establish its purity. With Bitcoin, holding a private key does not establish that someone has actually paid you. Your node is the tool that checks the payment against Bitcoin’s rules.",
      "This course treats independent verification as part of custody: I control the signing keys, and I verify the Bitcoin I receive. The online Core node checks the chain; the offline signer protects spending authority.",
      "Your node validates for you. It does not give you control over other people’s rules or create extra bitcoin. Its practical value is the independence of the information on which you act.",
    ],
    prerequisites: ["2.1"],
    sources: [
      {
        label: "Bitcoin whitepaper: verification and network rules",
        url: "https://bitcoincore.org/bitcoin.pdf",
      },
      {
        label: "Bitcoin Core 31.1: offline signing tutorial",
        url: "https://github.com/bitcoin/bitcoin/blob/v31.1/doc/offline-signing-tutorial.md",
      },
    ],
    reviewNote:
      "Content and cited sources reviewed on 2026-09-13. Any hands-on evidence is listed separately. Source review is not a claim that every platform or physical procedure was tested.",
    origin: "First-principles curriculum v4",
    chapter: "Verify for yourself",
    optional: false,
    sourceReviewed: "2026-09-13",
    takeaway:
      "Your node tells you what it has independently validated, instead of asking another wallet service to define your view of Bitcoin.",
  },
  {
    id: "1.3",
    slug: "electrum-workflow-and-security-assumptions",
    title: "Electrum: the trade for an instant start",
    summary:
      "Understand the convenience and dependencies of a server-assisted wallet.",
    objective:
      "Understand the convenience and dependencies of a server-assisted wallet.",
    what: "Understand the convenience and dependencies of a server-assisted wallet.",
    why: "A faster first screen can conceal a different verification model.",
    risk: "Server queries can reveal wallet-related activity; the client is not doing the same full validation as Core.",
    status: "published",
    verification: "source-reviewed",
    referenceVersion:
      "Electrum history and architecture; website checked 2026-09-13",
    contentUpdated: "2026-09-13",
    estimatedTime: "8–12 min",
    kind: "reading",
    explanation: [
      "Electrum was created by Thomas Voegtlin in November 2011. It offered a useful answer to a real inconvenience: people wanted to use a wallet without waiting for the reference client to download the chain.",
      "Electrum asks servers that index Bitcoin data for the information it needs. It checks headers and proofs that transactions are included in blocks, a method called simplified payment verification, or SPV. That is different from independently validating all of the chain’s transaction rules.",
      "The server can learn which addresses or related script identifiers the client asks about, depending on configuration and use. Running your own server backed by your own node changes those assumptions, but adds another service to operate.",
      "Electrum is capable software. The historical lesson here is the decision: immediacy was obtained by changing where information comes from and how it is checked. This course chooses patience and local verification as its starting point.",
    ],
    prerequisites: ["own-node"],
    sources: [
      {
        label: "Electrum: November 2011 origins and server architecture",
        url: "https://electrum.org/",
      },
      {
        label: "Electrum: server trust and privacy",
        url: "https://electrum.readthedocs.io/en/latest/faq.html",
      },
    ],
    reviewNote:
      "Content and cited sources reviewed on 2026-09-13. Any hands-on evidence is listed separately. Source review is not a claim that every platform or physical procedure was tested.",
    origin: "First-principles curriculum v4",
    chapter: "Verify for yourself",
    optional: false,
    sourceReviewed: "2026-09-13",
    takeaway:
      "Electrum’s quick start relies on servers and a different verification model. Convenience changes your dependencies and privacy exposure.",
  },
  {
    id: "ibd-separation",
    slug: "ibd-does-not-block-wallet-learning",
    title: "Initial block download is a feature of sovereignty",
    summary: "Put the initial wait in the context of decades of custody.",
    objective: "Put the initial wait in the context of decades of custody.",
    what: "Put the initial wait in the context of decades of custody.",
    why: "Independent verification has a startup cost that can be small compared with the life of the system.",
    risk: "Rushing to fund an unfamiliar wallet is more consequential than waiting for its node.",
    status: "published",
    verification: "source-reviewed",
    referenceVersion: "Bitcoin Core 31.1",
    contentUpdated: "2026-09-13",
    estimatedTime: "8–12 min",
    kind: "reading",
    explanation: [
      "Initial block download, or IBD, is the first process of downloading and validating the chain. Think of laying foundations for a house you intend to use for decades. The time spent establishing your own view of Bitcoin is part of what you are building.",
      "Bitcoin’s declining block subsidy extends issuance for more than a century after the genesis block. A custody plan can also outlast a career. Against that horizon, the hours or days your computer needs for its first synchronization deserve a different perspective from the wait for a shopping app.",
      "While the node works, write your threat model, create empty test wallets, understand encryption, rehearse backups and prepare an offline signer. Receiving and spending exercises wait for the online node to catch up. You do not need to put serious capital into the system to learn it.",
    ],
    prerequisites: ["1.3"],
    sources: [
      {
        label: "Bitcoin Core 31.1: data files",
        url: "https://github.com/bitcoin/bitcoin/blob/v31.1/doc/files.md",
      },
      {
        label: "Bitcoin Core 31.1: subsidy halving and eventual zero subsidy",
        url: "https://github.com/bitcoin/bitcoin/blob/v31.1/src/validation.cpp",
      },
    ],
    reviewNote:
      "Content and cited sources reviewed on 2026-09-13. Any hands-on evidence is listed separately. Source review is not a claim that every platform or physical procedure was tested.",
    origin: "First-principles curriculum v4",
    chapter: "Verify for yourself",
    optional: false,
    sourceReviewed: "2026-09-13",
    takeaway:
      "Initial block download is an investment in independent verification. Use that time to learn recovery and prepare the rest of your system.",
  },
  {
    id: "core-not-server",
    slug: "core-is-neither-a-server-nor-useless",
    title: "Keep the verification work you have already done",
    summary:
      "Understand why a new installation need not mean downloading every block again.",
    objective:
      "Understand why a new installation need not mean downloading every block again.",
    what: "Understand why a new installation need not mean downloading every block again.",
    why: "Your own checked block data can be reused when you move to replacement hardware.",
    risk: "Copying a whole data directory blindly also transfers trust in databases, settings and possibly wallets.",
    status: "published",
    verification: "source-reviewed",
    referenceVersion: "Bitcoin Core 31.1",
    contentUpdated: "2026-09-13",
    estimatedTime: "8–12 min",
    kind: "reading",
    explanation: [
      "Blocks are reusable data. When replacing a node, you can transfer your own block files and have a new Core installation rebuild its indexes and validation state. This trades local disk work for downloading the same data again.",
      "The migration exercise in Part II deliberately separates block files from wallet backups, configuration and chainstate. Chainstate is a database of the current spendable outputs. Copying it imports that state; rebuilding it from blocks establishes it again under the new installation’s validation process.",
      "A pruned node has deleted old block files after checking them. It cannot supply history it no longer has. The detailed exercise explains that limitation before you choose a migration method.",
    ],
    prerequisites: ["ibd-separation"],
    sources: [
      {
        label: "Bitcoin Core 31.1: data files",
        url: "https://github.com/bitcoin/bitcoin/blob/v31.1/doc/files.md",
      },
    ],
    reviewNote:
      "Content and cited sources reviewed on 2026-09-13. Any hands-on evidence is listed separately. Source review is not a claim that every platform or physical procedure was tested.",
    origin: "First-principles curriculum v4",
    chapter: "Verify for yourself",
    optional: false,
    sourceReviewed: "2026-09-13",
    takeaway:
      "The graphical Bitcoin Core application includes a node. Its validated block data can be reused when moving your own installations.",
  },
  {
    id: "2.5",
    slug: "why-the-signer-does-not-need-the-blockchain",
    title: "One chain, several offline signers",
    summary: "Explain why a signer needs no synchronized blockchain.",
    objective: "Explain why a signer needs no synchronized blockchain.",
    what: "Explain why a signer needs no synchronized blockchain.",
    why: "Signing authority and chain validation are separate jobs.",
    risk: "Requiring every signer to synchronize adds work and network exposure to a job that does not need either.",
    status: "published",
    verification: "source-reviewed",
    referenceVersion: "Bitcoin Core 31.1",
    contentUpdated: "2026-09-13",
    estimatedTime: "8–12 min",
    kind: "reading",
    explanation: [
      "An offline signer creates and holds private keys, then signs a prepared payment. A partially signed Bitcoin transaction, or PSBT, carries the transaction and supporting information between the online computer and the signer.",
      "The online node follows the chain, identifies spendable coins, prepares the transaction and broadcasts the completed result. The offline computer checks the PSBT and authorizes it. Five offline signers do not require five copies of the blockchain.",
      "Offline does not mean unable to check anything. The signer must review the recipient, amount, fee and change. Its software can check the supplied transaction data, but an isolated machine cannot independently know the latest chain tip. That current view belongs to your online node.",
    ],
    prerequisites: ["core-not-server"],
    sources: [
      {
        label: "Bitcoin Core 31.1: offline signing tutorial",
        url: "https://github.com/bitcoin/bitcoin/blob/v31.1/doc/offline-signing-tutorial.md",
      },
      {
        label: "Bitcoin Core 31.1: PSBT workflow",
        url: "https://github.com/bitcoin/bitcoin/blob/v31.1/doc/psbt.md",
      },
    ],
    reviewNote:
      "Content and cited sources reviewed on 2026-09-13. Any hands-on evidence is listed separately. Source review is not a claim that every platform or physical procedure was tested.",
    origin: "First-principles curriculum v4",
    chapter: "Verify for yourself",
    optional: false,
    sourceReviewed: "2026-09-13",
    takeaway:
      "A signer needs keys and transaction information, not a synchronized chain. The online node supplies and checks the chain context.",
  },
  {
    id: "1.1",
    title: "Why this course rejects Bitcoin-specific hardware wallets",
    summary:
      "Follow the category-level argument from the malware problem to the recommended alternative.",
    status: "published",
    notes: [
      "The five-year bug shows that publishing code is not enough to ensure a critical defect will be found. It does not, by itself, reveal why the defect escaped review. We need evidence of actual review work, including checks of how the device behaves as shipped.",
      "Our recommendation remains a dedicated offline Core signer on generic hardware, with separately recoverable backups and passwords. We prefer reducing Bitcoin-specific targeting and vendor dependencies to adding another wallet product to manage. That advantage must be combined with careful isolation and recovery; an ordinary computer used for everything would defeat the setup we are teaching.",
    ],
    sources: [
      {
        label: "Core 31.1 · Offline signing",
        url: "https://github.com/bitcoin/bitcoin/blob/v31.1/doc/offline-signing-tutorial.md",
      },
      {
        label: "Tails · Hardware and firmware limitations",
        url: "https://tails.net/doc/about/warnings/index.en.html#untrusted_computer",
      },
      {
        label: "Bitcoin Core · Hardware Wallet Interface",
        url: "https://github.com/bitcoin-core/HWI",
      },
      {
        label: "Coinkite · Coldcard seed-generation advisory (2026)",
        url: "https://blog.coinkite.com/coldcard-mk3-seed-generation-warning/",
      },
      {
        label: "Coldcard · Public firmware repository and security advisory",
        url: "https://github.com/Coldcard/firmware",
      },
      {
        label: "Wizardsardine · Coldcard entropy failure: technical analysis",
        url: "https://wizardsardine.com/blog/coldcard-vuln-deep-dive/",
      },
      {
        label: "Ledger · Customer-data breach and phishing follow-up",
        url: "https://www.ledger.com/blog/update-efforts-to-protect-your-data-and-prosecute-the-scammers",
      },
      {
        label: "Trezor · Support-portal incident, January 2024",
        url: "https://forum.trezor.io/t/security-alert-update/15204",
      },
      {
        label:
          "Becker et al. · Hardware Trojans and limits of chip inspection (CHES 2013)",
        url: "https://www.iacr.org/archive/ches2013/80860203/80860203.pdf",
      },
      {
        label:
          "Coinbase · 2025 Form 10-K: custody software and hardware security modules",
        url: "https://www.sec.gov/Archives/edgar/data/1679788/000167978826000015/coin-20251231.htm",
      },
      {
        label: "BitBox · ActiveCampaign data breach and phishing update, 2022",
        url: "https://blog.bitbox.swiss/en/data-breach-of-marketing-platform-activecampaign/",
      },
    ],
    videoUrl: null,
    slug: "hardware-wallet-as-a-tradeoff",
    objective:
      "Follow the category-level argument from the malware problem to the recommended alternative.",
    estimatedTime: "8–12 min",
    verification: "source-reviewed",
    referenceVersion: "Bitcoin Core 31.1",
    explanation: [
      "Hardware wallets addressed a real problem: private keys on everyday computers can be exposed to malware. The comparison in this course is between a specialized Bitcoin device and a dedicated generic computer with a clean Linux installation and Bitcoin Core.",
      "I recommend the second architecture. A Bitcoin-specific device makes its intended use legible to a seller, shipping provider or attacker who encounters it. A generic laptop is bought for many purposes. Its model alone gives much less evidence that its owner will store Bitcoin keys.",
      "That difference changes the economics of targeting. A list of wallet-device customers concentrates likely cryptocurrency users in one place. Finding a similarly relevant set of buyers among ordinary-computer customers takes additional information. This is an architectural judgment about target selection, not a measured claim that all attacks on generic hardware cost more.",
      "Even a perfectly manufactured hardware wallet retains that specialization. Its category also adds a manufacturer’s firmware, update process, component choices, recovery interface and continuity. Closed secure elements, where used, can make some physical attacks harder while limiting what an outsider can inspect. Checking software source cannot establish that a particular physical unit matches it.",
      "These are the reasons hardware wallets are outside the recommended path. The incident examples below illustrate separate failure classes; they are not the foundation of the argument. We criticize the architecture and incentives, not the people who use these devices.",
      "Hardware inspection is a separate problem. A backdoor is a hidden way to bypass the intended protection. Checking a downloaded program against a published fingerprint is cheap and repeatable. That establishes a file match, not the absence of malicious code. Establishing what every chip actually does can require specialist equipment and destructive examination. Research has demonstrated chip modifications that evade optical inspection. Reading published source code, checking a seal or using attestation, a device-authenticity check, cannot prove that all the hardware is free of backdoors. This limitation applies to ordinary computers too.",
      "Attack and review have different economics. A thief can profit directly from a weakness. Preventing that loss requires someone to fund skilled reviewers, equipment and time. Public source code makes review possible; it does not tell us whether the relevant code path and the shipped device were examined thoroughly. The Coldcard case below shows why we do not equate available source with completed security review.",
      "Some institutional custody systems use tools quite different from retail hardware wallets. Coinbase's 2025 annual report, for example, describes proprietary software and hardware security modules for cold-storage custody. A hardware security module is a specialized device for protecting cryptographic keys within a larger system. Security work on an institution's own system does not tell us how thoroughly a consumer product has been reviewed. A claim about review quality needs evidence of the work actually performed.",
    ],
    callouts: [
      {
        kind: "warning",
        title: "Coldcard: a five-year seed-generation failure",
        body: "Coinkite reports weak secret generation in firmware from 2021 to July 2026, despite publicly available source. Entropy means unpredictability: a wallet needs enough of it to make guessing its starting secret infeasible. Independent analysis traced a firmware integration error that used a predictable software generator where hardware randomness was expected. Fixed firmware became available, but updating does not repair secrets already generated by affected versions. The advisory explains the affected versions and migration requirements.",
        url: "https://blog.coinkite.com/coldcard-mk3-seed-generation-warning/",
      },
      {
        kind: "warning",
        title: "Ledger: customer records became targeting information",
        body: "Ledger disclosed a 2020 breach of its customer database and later reported sustained phishing against customers. The leaked information included contact and order details. This was a customer-data breach, separate from extracting keys from a device. It illustrates how buying a security product can create another route for attackers to reach its owner.",
        url: "https://www.ledger.com/blog/update-efforts-to-protect-your-data-and-prosecute-the-scammers",
      },
      {
        kind: "warning",
        title: "Trezor: an attacker impersonated support",
        body: "Trezor reported that its third-party support portal was accessed without authorization on 17 January 2024. Its initial report said the intruder contacted 40 users asking for recovery secrets; at that point, its review had found no secrets sent by those users. The incident concerned access to support conversations, not extraction of keys from a Trezor device.",
        url: "https://forum.trezor.io/t/security-alert-update/15204",
      },
      {
        kind: "warning",
        title: "BitBox: a marketing provider exposed a customer audience",
        body: "In July 2022, Shift Crypto disclosed an unauthorized download of email lists from ActiveCampaign, its marketing service. Exposed fields included email addresses, names or aliases and IP addresses. An August update reported phishing that it considered likely related. This was a third-party data breach, not a compromise of the BitBox02 device or BitBoxApp.",
        url: "https://blog.bitbox.swiss/en/data-breach-of-marketing-platform-activecampaign/",
      },
    ],
    origin: "Moved from legacy module 1",
    optional: false,
    kind: "reading",
    concepts: [],
    warnings: [],
    commonMistakes: [],
    checklist: [],
    codeBlocks: [],
    contentUpdated: "2026-09-13",
    why: "A real security problem does not establish that a particular product category is the best long-term solution.",
    risk: "Specialization identifies likely Bitcoin users and adds device, firmware and vendor dependencies.",
    chapter: "Choose the foundation",
    sourceReviewed: "2026-09-13",
    reviewNote:
      "Content and cited sources reviewed on 2026-09-13. Any hands-on evidence is listed separately. Source review is not a claim that every platform or physical procedure was tested.",
    takeaway:
      "Bitcoin-specific devices identify a likely use and add vendor dependencies. This course therefore chooses dedicated generic Linux hardware and Core.",
    prerequisites: ["2.5"],
  },
  {
    id: "1.5",
    title: "Generic hardware, dedicated Debian, Bitcoin Core",
    summary:
      "Choose the same simple foundation for the online node and offline signer.",
    status: "published",
    checklist: [],
    sources: [
      {
        label: "Core 31.1 · Wallet management",
        url: "https://github.com/bitcoin/bitcoin/blob/v31.1/doc/managing-wallets.md",
      },
      {
        label: "Core 31.1 · Offline signing",
        url: "https://github.com/bitcoin/bitcoin/blob/v31.1/doc/offline-signing-tutorial.md",
      },
      {
        label: "Tails · Hardware and firmware limitations",
        url: "https://tails.net/doc/about/warnings/index.en.html#untrusted_computer",
      },
      {
        label: "Bitcoin Core · Hardware Wallet Interface",
        url: "https://github.com/bitcoin-core/HWI",
      },
      {
        label: "Ledger · Customer-data breach and phishing follow-up",
        url: "https://www.ledger.com/blog/update-efforts-to-protect-your-data-and-prosecute-the-scammers",
      },
    ],
    videoUrl: null,
    slug: "core-as-a-tool-not-an-identity",
    objective:
      "Choose the same simple foundation for the online node and offline signer.",
    estimatedTime: "8–12 min",
    verification: "source-reviewed",
    referenceVersion: "Bitcoin Core 31.1",
    explanation: [
      "Use an ordinary supported laptop or desktop, reserve it for Bitcoin and install Debian Stable. Debian is the Linux distribution used throughout this course: an operating system maintained independently of a wallet-device vendor. Keep the installed software to what the task needs.",
      "The online machine runs Bitcoin Core to verify the chain and coordinate payments. The offline machine also runs Debian Stable and Bitcoin Core, but stays disconnected after preparation. It holds an encrypted wallet and signs transferred PSBT files.",
      "Buying generic hardware avoids declaring a Bitcoin-specific use through the product itself. This reduces a particular targeting signal; it is not a promise that an ordinary computer cannot be attacked. The bounded limitations lesson covers the remaining operating-system, firmware and physical risks.",
      "Tails is an optional live operating system started from USB. Consider it later if resetting operating-system state between sessions addresses a threat you actually have. The default signer in this course is a persistent Debian installation.",
    ],
    callouts: [],
    origin: "Moved from legacy module 1",
    optional: false,
    kind: "reading",
    notes: [
      "The economic argument concerns finding worthwhile targets. When a product already identifies likely cryptocurrency users, an attacker can spend less effort separating them from unrelated customers. A generic computer has many possible uses, so its purchase supplies less of that information. This can raise the effort needed to identify Bitcoin victims; it does not establish a universal cost advantage for every attack. Ordinary computers are also valuable targets for widespread malware.",
      "The risk continues after delivery. Customer records, branded support messages and update instructions can give criminals ways to approach the owner. Phishing means impersonating a trusted source to obtain a secret or induce a harmful action. Social engineering is the broader practice of manipulating a person into helping an attacker. A fake support agent asking for recovery words attacks the owner even when the device keeps its keys isolated.",
      "We therefore leave retail hardware wallets out of this curriculum's savings setup. Their dedicated signing controls can simplify use, but they do not remove the purchase signal, vendor relationship or hardware-verification problem. Our choice avoids those Bitcoin-specific dependencies while accepting the work of maintaining a dedicated Linux computer. Verify the software, keep the signer offline, control physical access and rehearse recovery.",
    ],
    concepts: [],
    warnings: [],
    commonMistakes: [],
    codeBlocks: [],
    prerequisites: ["1.1", "0.2"],
    contentUpdated: "2026-09-13",
    why: "An ordinary computer can be replaced without returning to a Bitcoin-device manufacturer.",
    risk: "Using the signer for unrelated daily activity defeats the point of a dedicated environment.",
    chapter: "Choose the foundation",
    sourceReviewed: "2026-09-13",
    reviewNote:
      "Content and cited sources reviewed on 2026-09-13. Any hands-on evidence is listed separately. Source review is not a claim that every platform or physical procedure was tested.",
    takeaway:
      "Generic hardware helps conceal the purpose of the purchase; dedicating it to Bitcoin keeps everyday applications outside the signing environment.",
  },
  {
    id: "1.4",
    title: "BIP39: a readable root secret and its backup consequences",
    summary: "Separate a root recovery secret from an encrypted wallet backup.",
    status: "published",
    what: "Words preserve secret material, but not the full instructions for using it. A derivation path identifies a route through the family of keys; a script type specifies the rules for spending. Recovery may also need account choices or a multisig policy, the rule identifying which participants must sign. BIP44 describes one set of account and path conventions. An output descriptor is a text description of addresses and spending rules that can preserve this information alongside the keys.",
    why: "More backup copies should not automatically mean more places holding an exposed spending secret.",
    risk: "Every readable, unencrypted copy of a seed phrase is another place where its root secret can be discovered.",
    notes: [
      "A complete wallet snapshot is not a backup of the entire custody setup. It does not supply a forgotten password, separate instructions, another participant's private keys, records kept in a different wallet, or changes made after the backup. Keep the recovery guide and password separately recoverable, refresh backups when the wallet changes, and test restoration. The node's public blockchain data can be downloaded again.",
      "Core's wallet encryption protects private key material; it does not encrypt all wallet metadata. Treat the backup as private financial information even when locked. A generic filename is not protection against someone who examines the file. Keep the private-key backup off the online computer and never upload it to this website.",
      "We favor Core's long-running wallet-backup approach and its public development and review process. File formats and wallet features have changed over time, so test restoration with the version and wallet you actually use. Correctly generated BIP39 words can have strong randomness. Our objection is to treating them as the whole recovery plan and adding a recovery-word workflow that this Core setup does not need.",
    ],
    sources: [
      {
        label: "Why BIP39 made the wrong thing human-readable",
        url: "/en/bitcoin-core/bip39-made-the-wrong-thing-human-readable/",
      },
      {
        label: "BIP 39 — mnemonic code for deterministic keys",
        url: "https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki",
      },
      {
        label: "Bitcoin Core 31.1 — Managing the wallet",
        url: "https://github.com/bitcoin/bitcoin/blob/v31.1/doc/managing-wallets.md",
      },
      {
        label: "Trezor · BIP39 origins and recovery-word usability",
        url: "https://trezor.io/learn/advanced/standards-proposals/what-is-bip-39-how-12-and-24-word-wallet-backups-work",
      },
      {
        label: "BIP32 · Deriving a family of keys",
        url: "https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki",
      },
      {
        label: "BIP44 · Account and derivation-path conventions",
        url: "https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki",
      },
      {
        label: "BIP380 · Output descriptors preserve spending information",
        url: "https://github.com/bitcoin/bips/blob/master/bip-0380.mediawiki",
      },
      {
        label: "Core 31.1 · Wallet files and their contents",
        url: "https://github.com/bitcoin/bitcoin/blob/v31.1/doc/files.md",
      },
      {
        label: "Bitcoin Core · backupwallet makes a safe wallet copy",
        url: "https://bitcoincore.org/en/doc/31.0.0/rpc/wallet/backupwallet/",
      },
      {
        label: "Trezor · Model One launch history (29 July 2014)",
        url: "https://trezor.io/blog/news/a-decade-of-pioneering-10-years-since-trezors-first-hardware-wallet-revolution",
      },
    ],
    videoUrl: null,
    slug: "bip39-cryptography-and-backup-model",
    objective:
      "Separate a root recovery secret from an encrypted wallet backup.",
    estimatedTime: "8–12 min",
    verification: "source-reviewed",
    referenceVersion: "BIP 39",
    explanation: [
      "BIP39 describes a way to encode wallet seed entropy as words plus a checksum, then derive a seed from those words and an optional passphrase. The proposal is dated 10 September 2013 and lists Marek Palatinus, Pavol Rusnak, Aaron Voisine and Sean Bowe as authors. Its history is connected to the early Trezor ecosystem and the need for human-readable recovery. Trezor dates the official launch of its Model One to 29 July 2014; the proposal predates that product launch.",
      "The cryptography is not “broken.” The custody question is what happens when the root secret becomes a readable backup. A plain copy on paper or metal improves recovery redundancy while creating another location at which that same secret can be exposed. A BIP39 passphrase can add protection, but also creates another essential recovery dependency.",
      "This course instead backs up the encrypted Bitcoin Core wallet file and keeps its encryption passphrase separately. The file includes wallet keys and descriptors—the instructions describing the wallet’s addresses and spending conditions—along with wallet metadata present when the backup was made. It is broader than a mnemonic root secret, but does not contain future edits or replace your recovery instructions.",
      "Redundancy and secret exposure should not have to be the same thing. Copies of an encrypted wallet can survive separate device or location failures without putting readable private keys at each location. Core encrypts private key material, not every piece of wallet metadata; the backup-privacy lesson explains that boundary.",
      "The recommendation follows the whole architecture: generic hardware, Linux, Core and tested encrypted file recovery. BIP39 is not the long-term recovery foundation taught here.",
    ],
    callouts: [
      {
        kind: "warning",
        title: "Recovery words are a secret",
        body: "Someone with BIP39 words and any required additional passphrase can derive the wallet's keys. Keep them out of messages, screenshots and websites. The linked essay explains why this course chooses file-based recovery.",
        url: "/en/bitcoin-core/bip39-made-the-wrong-thing-human-readable/",
      },
    ],
    origin: "Moved from legacy module 1",
    optional: false,
    warnings: [
      "Do not create a BIP39 mnemonic as an additional backup for this Bitcoin Core wallet.",
    ],
    concepts: [
      "BIP39's checksum, a short error-detection code, catches some transcription mistakes but cannot correct them. Twelve words have a 4-bit checksum; 24 words have 8 bits.",
      "Every BIP39 passphrase produces a valid seed. A typo can therefore open a different, empty wallet instead of producing an incorrect-password error.",
      "The words contain no version or wallet-layout marker. They depend on the chosen wordlist, and translating them changes the resulting seed. The conversion is one-way: an arbitrary existing Core starting secret cannot simply be written as equivalent BIP39 words.",
      "BIP32 key derivation does not require a BIP39 word list. Core's file backup and its encryption password are the recovery components used in this course.",
    ],
    checklist: [
      "I can distinguish BIP32 derivation from BIP39 mnemonic recovery.",
      "I will not create or store a BIP39 mnemonic for this wallet.",
      "I will keep the encrypted Core backup and its passphrase separate.",
    ],
    kind: "reading",
    contentUpdated: "2026-09-13",
    chapter: "Choose the foundation",
    sourceReviewed: "2026-09-13",
    reviewNote:
      "Content and cited sources reviewed on 2026-09-13. Any hands-on evidence is listed separately. Source review is not a claim that every platform or physical procedure was tested.",
    takeaway:
      "Recovery words represent a root secret. An encrypted Core wallet backup preserves broader wallet state while allowing separately protected password recovery.",
    prerequisites: ["1.5"],
  },
  {
    id: "signet-entropy-deep-dive",
    slug: "where-the-private-key-comes-from",
    title: "Where Core gets its wallet secrets",
    summary:
      "Understand generated randomness before choosing an encryption passphrase.",
    objective:
      "Understand generated randomness before choosing an encryption passphrase.",
    what: "Understand generated randomness before choosing an encryption passphrase.",
    why: "A secret is hard to guess when the process that made it gives an attacker little basis for predicting it.",
    risk: "A long or well-formed secret can still be predictable if a person invented it.",
    status: "published",
    verification: "source-reviewed",
    referenceVersion: "Bitcoin Core 31.1",
    contentUpdated: "2026-09-13",
    estimatedTime: "8–12 min",
    kind: "reading",
    explanation: [
      "People invent patterns: quotations, familiar words, repeated letters and meaningful dates. An attacker can try those patterns before searching every possible string. Entropy describes the uncertainty left for the attacker by the generation process; appearance alone does not establish it.",
      "For a new descriptor wallet, Core 31.1 calls GenerateRandomKey, which uses CKey::MakeNewKey and GetStrongRandBytes to obtain a valid 32-byte secret. Those bytes provide the seed input from which the wallet’s extended master key is derived. Thirty-two bytes contain 256 bits; that is the size of this seed input, not a claim of 256-bit security for every part of Bitcoin.",
      "GetStrongRandBytes uses Core’s cryptographically secure random-generation path and mixes operating-system randomness with other collected inputs. A CSPRNG is a generator designed to make its output unpredictable to an attacker when it has been securely seeded. Core does not ask you to invent or select the root secret.",
      "The encryption passphrase has a different job: it protects the generated private key material in the wallet file. Changing that passphrase does not replace the wallet’s Bitcoin keys.",
    ],
    prerequisites: ["1.4"],
    sources: [
      {
        label: "Bitcoin Core 31.1: wallet root generation",
        url: "https://github.com/bitcoin/bitcoin/blob/v31.1/src/wallet/wallet.cpp",
      },
      {
        label: "Bitcoin Core 31.1: random key generation",
        url: "https://github.com/bitcoin/bitcoin/blob/v31.1/src/key.cpp",
      },
      {
        label: "Bitcoin Core 31.1: operating-system randomness and CSPRNG",
        url: "https://github.com/bitcoin/bitcoin/blob/v31.1/src/random.cpp",
      },
    ],
    reviewNote:
      "Content and cited sources reviewed on 2026-09-13. Any hands-on evidence is listed separately. Source review is not a claim that every platform or physical procedure was tested.",
    origin: "First-principles curriculum v4",
    chapter: "Choose the foundation",
    optional: false,
    sourceReviewed: "2026-09-13",
    takeaway:
      "Core creates root key material through its cryptographically secure random-generation path. You do not invent that secret yourself.",
  },
  {
    id: "1.2",
    slug: "sparrow-workflow-and-security-assumptions",
    title: "Sparrow case study: a valid checksum is not good randomness",
    summary:
      "Distinguish an import screen accepting words from a secure secret-generation process.",
    objective:
      "Distinguish an import screen accepting words from a secure secret-generation process.",
    what: "Distinguish an import screen accepting words from a secure secret-generation process.",
    why: "Beginners can mistake acceptance by an application for evidence that a secret is safe.",
    risk: "A publicly known or deliberately patterned mnemonic can pass the same checksum as a randomly generated one.",
    status: "published",
    verification: "verified",
    referenceVersion: "Sparrow 2.5.4 / Bitcoin Core 31.1",
    contentUpdated: "2026-09-13",
    estimatedTime: "8–12 min",
    kind: "reading",
    explanation: [
      "A mnemonic checksum detects some transcription errors. It is calculated from the encoded data; it cannot tell whether a person, a secure generator or a published example chose that data.",
      "In Sparrow 2.5.4, we opened New Wallet → New or Imported Software Wallet → Mnemonic Words (BIP39) → Use 24 Words. Pasting a public test vector corresponding to all-zero entropy produced “Valid checksum”; Create Keystore and Import Keystore then accepted it. This used a disconnected Signet test profile, with no funds. The deterministic public input was not a secret, regardless of its valid format.",
      "This does not mean Sparrow’s Generate New produces weak randomness. Importing existing words is a legitimate recovery capability. The lesson is that syntactic acceptance does not certify how the words were created. Never invent a mnemonic or fund one from an example.",
      "Core’s normal create-wallet flow generates its own root key material and does not present a field for choosing root words. Secure defaults matter because a first-time user does not yet know which mistakes are fatal.",
    ],
    prerequisites: ["signet-entropy-deep-dive"],
    sources: [
      {
        label: "Sparrow 2.5.4: mnemonic import and checksum validation",
        url: "https://github.com/sparrowwallet/sparrow/blob/2.5.4/src/main/java/com/sparrowwallet/sparrow/control/MnemonicKeystoreImportPane.java",
      },
      {
        label: "Sparrow 2.5.4: official release",
        url: "https://github.com/sparrowwallet/sparrow/releases/tag/2.5.4",
      },
      {
        label: "BIP 39: authors, date, entropy and checksum",
        url: "https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki",
      },
    ],
    reviewNote:
      "Hands-on observation, 2026-09-13: official signed Sparrow 2.5.4 on macOS, isolated disconnected Signet profile. Public zero-entropy test vector accepted through Import Keystore. Generate New was not used or alleged to produce weak entropy.",
    origin: "First-principles curriculum v4",
    practicalReview: {
      date: "2026-09-13",
      scope:
        "Sparrow 2.5.4 on macOS: public mnemonic import, checksum acceptance and keystore result; disconnected test profile.",
    },
    chapter: "Choose the foundation",
    optional: false,
    sourceReviewed: "2026-09-13",
    takeaway:
      "A valid mnemonic checksum proves that the words fit a format. It does not prove that their creator used unpredictable randomness.",
  },
  {
    id: "software-continuity",
    slug: "software-continuity",
    title: "Choose recovery dependencies for 20, 40 or 80 years",
    summary:
      "Treat future software availability as part of today’s custody decision.",
    objective:
      "Treat future software availability as part of today’s custody decision.",
    what: "Treat future software availability as part of today’s custody decision.",
    why: "A recoverable file is only useful if someone can still understand and operate the required tools.",
    risk: "A manufacturer disappearing can turn a familiar recovery procedure into an unfamiliar migration.",
    status: "published",
    verification: "source-reviewed",
    referenceVersion: "Bitcoin Core 31.1",
    contentUpdated: "2026-09-13",
    estimatedTime: "8–12 min",
    kind: "reading",
    explanation: [
      "A computer eventually fails. A company may stop supporting a product. The long-term question is what remains necessary when the original equipment, staff or download site is gone.",
      "Bitcoin Core descends from Bitcoin’s original reference implementation and remains a central implementation of its node and wallet software. Its open source, documented descriptors and generic computing requirements give it a strong continuity case. That is a reasoned expectation, not a guarantee that one application or file format will work unchanged for eighty years.",
      "Which recovery dependency would you rather still need in 20, 40 or 80 years: a manufacturer-specific device and its companion stack, or Bitcoin’s reference implementation, generic computer hardware and documented wallet data? This course chooses the latter.",
      "Keep version information, verified installers where useful and understandable recovery instructions with your plan. Rehearse on maintained software while you are able to fix compatibility problems. Long-term custody is maintained continuity, not a file abandoned in a drawer.",
    ],
    prerequisites: ["1.2"],
    sources: [
      {
        label: "Bitcoin Core project and development history",
        url: "https://bitcoincore.org/en/about/",
      },
      {
        label: "Bitcoin Core 31.1: wallet creation, backup and restoration",
        url: "https://github.com/bitcoin/bitcoin/blob/v31.1/doc/managing-wallets.md",
      },
      {
        label: "Bitcoin Core 31.1: descriptors and Miniscript",
        url: "https://github.com/bitcoin/bitcoin/blob/v31.1/doc/descriptors.md",
      },
    ],
    reviewNote:
      "Content and cited sources reviewed on 2026-09-13. Any hands-on evidence is listed separately. Source review is not a claim that every platform or physical procedure was tested.",
    origin: "First-principles curriculum v4",
    chapter: "Choose the foundation",
    optional: false,
    sourceReviewed: "2026-09-13",
    takeaway:
      "Long-term recovery depends on maintained software, understandable records and regular restore tests, not a promise that one product will last forever.",
  },
  {
    id: "core-development",
    slug: "battle-tested-does-not-mean-bug-free",
    title: "What this foundation cannot do for you",
    summary: "Know the limits of the recommendation in one place.",
    objective: "Know the limits of the recommendation in one place.",
    what: "Know the limits of the recommendation in one place.",
    why: "A clear recommendation still needs a precise boundary.",
    risk: "A malicious operating system, weak passphrase or unusable backup can defeat the intended arrangement.",
    status: "published",
    verification: "source-reviewed",
    referenceVersion: "Bitcoin Core 31.1",
    contentUpdated: "2026-09-13",
    estimatedTime: "8–12 min",
    kind: "reading",
    explanation: [
      "Bitcoin Core does not make a compromised computer trustworthy. A malicious operating system can capture a passphrase or interfere with signing. Firmware and physical access remain relevant on generic hardware. An offline signer reduces routine network exposure, but transferred files and handling procedures still need discipline.",
      "Core cannot recover a forgotten strong passphrase for you. A backup can be lost, corrupted or too old to include a later wallet change. Encryption protects private key material; it does not hide all wallet metadata. Software downloads must be authenticated, and updates need a deliberate procedure.",
      "These are the boundaries of the model we recommend, not reasons to abandon it. The practical part addresses them through minimal installations, independent transaction review, separated passphrases, redundant current backups and demonstrated recovery.",
    ],
    prerequisites: ["software-continuity"],
    sources: [
      {
        label: "Bitcoin Core 31.1: wallet creation, backup and restoration",
        url: "https://github.com/bitcoin/bitcoin/blob/v31.1/doc/managing-wallets.md",
      },
      {
        label: "Bitcoin Core 31.1: passphrase derivation and AES encryption",
        url: "https://github.com/bitcoin/bitcoin/blob/v31.1/src/wallet/crypter.cpp",
      },
      {
        label: "Bitcoin Core 31.1: data files",
        url: "https://github.com/bitcoin/bitcoin/blob/v31.1/doc/files.md",
      },
    ],
    reviewNote:
      "Content and cited sources reviewed on 2026-09-13. Any hands-on evidence is listed separately. Source review is not a claim that every platform or physical procedure was tested.",
    origin: "First-principles curriculum v4",
    chapter: "Choose the foundation",
    optional: false,
    sourceReviewed: "2026-09-13",
    takeaway:
      "Core is the chosen foundation, but a compromised operating system, exposed passphrase or missing backup can still defeat the setup.",
  },
  {
    id: "foundations-checkpoint",
    slug: "foundations-checkpoint",
    title: "Before practice: explain your chosen foundation",
    summary: "Demonstrate the skills before adding the next building block.",
    objective: "Demonstrate the skills before adding the next building block.",
    what: "Demonstrate the skills before adding the next building block.",
    why: "A familiar-looking screen is not evidence that you can recover or operate the system.",
    risk: "Skipping a missing skill turns the next layer into something you cannot diagnose.",
    status: "published",
    verification: "source-reviewed",
    referenceVersion: "Bitcoin Core 31.1",
    contentUpdated: "2026-09-13",
    estimatedTime: "8–12 min",
    kind: "checkpoint",
    explanation: [
      "Do this without following the earlier lesson line by line. If you need the instructions, return to the exercise, repeat it, and try again later.",
      "Tick each outcome only after you have demonstrated it. These checks record your own assessment in this browser; they are not a certification or a substitute for the actual exercise.",
    ],
    prerequisites: [
      "core-development",
      "0.2",
      "0.3",
      "custody-economics",
      "2.1",
      "own-node",
      "1.3",
      "ibd-separation",
      "core-not-server",
      "2.5",
      "1.1",
      "1.5",
      "1.4",
      "signet-entropy-deep-dive",
      "1.2",
      "software-continuity",
    ],
    sources: [
      {
        label: "Bitcoin Core 31.1: wallet creation, backup and restoration",
        url: "https://github.com/bitcoin/bitcoin/blob/v31.1/doc/managing-wallets.md",
      },
    ],
    reviewNote:
      "Content and cited sources reviewed on 2026-09-13. Any hands-on evidence is listed separately. Source review is not a claim that every platform or physical procedure was tested.",
    origin: "First-principles curriculum v4",
    checklist: [
      "I can describe my actual threats and the costs of the controls I chose.",
      "I can explain why this course recommends generic hardware, Debian Stable and Bitcoin Core.",
      "I can explain what my own node verifies and why initial synchronization is useful work.",
      "I can distinguish an offline signer from an online node and explain why only the node needs the chain.",
      "I can distinguish a readable root secret from the passphrase protecting an encrypted wallet file.",
    ],
    chapter: "Choose the foundation",
    optional: false,
    sourceReviewed: "2026-09-13",
    takeaway:
      "You can now justify the recommended architecture by connecting each choice to a threat, a dependency and an operational cost.",
  },
]
