export type CurriculumStatus = "published" | "in-progress" | "planned"
export type CurriculumLevel = "beginner" | "intermediate" | "advanced"

export type CurriculumSource = {
  label: string
  url: string
}

export type CurriculumCodeBlock = {
  id: string
  title: string
  code: string
  explanation: string
  parameters?: Array<{ name: string; explanation: string }>
  warning?: string
}

export type CurriculumLesson = {
  id: string
  title: string
  summary: string
  status: CurriculumStatus
  what?: string
  why?: string
  risk?: string
  concepts?: string[]
  warnings?: string[]
  notes?: string[]
  technicalDetails?: string
  checklist?: string[]
  codeBlocks?: CurriculumCodeBlock[]
  sources?: CurriculumSource[]
  videoUrl?: string | null
  image?: { src: string; alt: string }
  badges?: string[]
}

export type CurriculumModule = {
  id: string
  title: string
  subtitle: string
  level: CurriculumLevel
  status: CurriculumStatus
  estimatedTime: string
  prerequisites: string[]
  lessons: CurriculumLesson[]
  videoUrl: string | null
  warnings: string[]
  checklist: string[]
}

const coreRepository: CurriculumSource = {
  label: "Bitcoin Core source code and documentation",
  url: "https://github.com/bitcoin/bitcoin",
}

const managingWallets: CurriculumSource = {
  label: "Bitcoin Core: Managing the wallet",
  url: "https://github.com/bitcoin/bitcoin/blob/master/doc/managing-wallets.md",
}

const descriptors: CurriculumSource = {
  label: "Bitcoin Core: output descriptors",
  url: "https://github.com/bitcoin/bitcoin/blob/master/doc/descriptors.md",
}

const psbt: CurriculumSource = {
  label: "Bitcoin Core: PSBT Howto",
  url: "https://github.com/bitcoin/bitcoin/blob/master/doc/psbt.md",
}

const bitcoinWhitepaper: CurriculumSource = {
  label: "Bitcoin: A Peer-to-Peer Electronic Cash System",
  url: "https://bitcoincore.org/bitcoin.pdf",
}

function outlineLessons(
  moduleId: string,
  titles: string[],
  status: CurriculumStatus,
  summary: string
): CurriculumLesson[] {
  return titles.map((title, index) => ({
    id: `${moduleId}.${index + 1}`,
    title,
    summary,
    status,
    videoUrl: null,
  }))
}

export const curriculumModules: CurriculumModule[] = [
  {
    id: "0",
    title: "Before the software: what are we actually protecting?",
    subtitle:
      "Your security model comes before choosing a wallet, device, or backup method.",
    level: "beginner",
    status: "published",
    estimatedTime: "35 min",
    prerequisites: ["None"],
    videoUrl: null,
    warnings: [
      "This module requires no software installation or real bitcoin. The goal is to map the system and its risks first.",
    ],
    checklist: [
      "I can explain the difference between a private key, a wallet, and a node.",
      "I've written down three risks that are most important to me.",
      "I know which part of the system I still don't understand.",
    ],
    lessons: [
      {
        id: "0.1",
        title: "What is Bitcoin self-custody?",
        summary:
          "Self-custody means that you control the keys that authorize spending, but a reliable system also includes state verification, backup, and recovery.",
        status: "published",
        what: "We separate the roles of private keys, wallets, nodes, the blockchain, UTXOs, transaction signing, and transaction broadcasting.",
        why: "If you know what each component does, you can change or restore one part without guessing about the whole system.",
        risk: "Confusing a wallet with a node, or a backup with a passphrase, can create a false sense of security and an unusable recovery plan.",
        concepts: [
          "A private key authorizes the spending of a particular output.",
          "A wallet organizes keys, addresses, transactions, and related metadata.",
          "A node independently verifies Bitcoin's rules and the state of the blockchain.",
          "A UTXO is an unspent transaction output that a new input can spend.",
          "Signing creates cryptographic authorization; broadcasting sends a valid transaction to the network.",
        ],
        technicalDetails:
          "Holding keys and verifying the blockchain are two different security functions. An offline signer can store and use private keys without a copy of the blockchain, while an online node can verify and broadcast transactions without holding private keys.",
        checklist: [
          "I can explain in my own words what a private key does.",
          "I can explain why a wallet and a node are not the same thing.",
          "I can distinguish signing from broadcasting.",
        ],
        sources: [bitcoinWhitepaper, coreRepository],
        videoUrl: null,
      },
      {
        id: "0.2",
        title: "Threat model",
        summary:
          "A threat model is not a list of every possible disaster. It is a decision about which risks you will protect against, in what order, and at what cost.",
        status: "published",
        what: "We examine device loss, media failure, a forgotten passphrase, malware, a compromised online computer, supply-chain and firmware risk, physical theft, human error, and inadequate backups.",
        why: "There is no universally best setup. This curriculum is designed for long-term savings, clear understanding, less reliance on third parties, and repeatable recovery.",
        risk: "A system that protects against very rare attacks but increases the risk of everyday human error can be worse overall.",
        concepts: [
          "Probability: how realistic is the scenario in your environment?",
          "Consequence: what happens if the scenario occurs?",
          "Detection: how will you know that the problem occurred?",
          "Recovery: which tested procedure returns the system to a usable state?",
        ],
        notes: [
          "Your threat model changes with the amount secured, your circumstances and locations, the people involved in recovery, and the technology you use.",
        ],
        checklist: [
          "I wrote down the risk with the highest probability.",
          "I wrote down the risk with the greatest consequence.",
          "For both risks, I know how to test recovery.",
        ],
        sources: [managingWallets],
        videoUrl: null,
      },
      {
        id: "0.3",
        title: "Security is not just cryptography",
        summary:
          "Cryptography can be impeccable while the overall system remains fragile when users face unclear, unverified, or irreversible steps.",
        status: "published",
        what: "We look at the whole system: devices, people, procedures, labels, locations, verification habits, and decision-making methods.",
        why: "The most important protection is often not a new cryptographic feature, but a clear procedure that you can repeat under stress.",
        risk: "Too many secrets, unlabeled backups, undocumented derivation paths, and recovery procedures that exist only in someone's memory create single points of failure.",
        notes: [
          "Complexity is a security cost. Add it only when it solves a clearly identified problem.",
        ],
        checklist: [
          "I can identify an operational error that cryptography does not prevent.",
          "I know who, besides me, must understand the recovery procedure.",
        ],
        sources: [managingWallets],
        videoUrl: null,
      },
    ],
  },
  {
    id: "1",
    title: "Why does this guide start with Bitcoin Core?",
    subtitle:
      "A fair comparison of security philosophies, decision load, and operational tradeoffs.",
    level: "beginner",
    status: "published",
    estimatedTime: "55 min",
    prerequisites: ["Module 0"],
    videoUrl: null,
    warnings: [
      "This module does not claim that other wallets are insecure. It compares their user experience and assumptions for a specific threat model.",
    ],
    checklist: [
      "I understand why a purpose-built device can be part of a threat model.",
      "I can explain the strengths of hardware wallets, Sparrow, and Electrum.",
      "I know why this curriculum begins with fewer decisions.",
    ],
    lessons: [
      {
        id: "1.1",
        title: "The hardware wallet approach",
        summary:
          "A hardware wallet isolates signing keys and makes self-custody significantly easier for many users. At the same time, it introduces a specialized device, firmware, supply-chain risk, and dependence on the vendor's security practices into the threat model.",
        status: "published",
        what: "We separate the real advantages of an isolated signer from the dependencies and risks introduced by a targeted, specialized device.",
        why: "The choice does not begin with which product is 'the safest,' but with which risks we want to reduce and which new dependencies we are willing to accept.",
        risk: "The wrong conclusion would be that a hardware wallet is automatically insecure. This is about choosing an architecture, not making a universal judgment.",
        notes: [
          "A hardware wallet can be a very reasonable choice. This tutorial first teaches a system that can be built and restored without depending on a vendor-specific device.",
        ],
        sources: [
          {
            label: "Bitcoin Core HWI project",
            url: "https://github.com/bitcoin-core/HWI",
          },
          managingWallets,
        ],
        videoUrl: null,
      },
      {
        id: "1.2",
        title: "Sparrow Wallet",
        summary:
          "Sparrow is a powerful coordinator for hardware wallets, PSBTs, multisig, and descriptors. This flexibility gives experienced users control, but exposes beginners to more security-relevant decisions.",
        status: "published",
        what: "We treat the policy type, script type, keystore, mnemonic standard, and signer connection as separate decisions.",
        why: "Seeing each decision separately makes it clear why a flexible tool can be excellent at a later stage yet more demanding as a beginner's first mental model.",
        risk: "Manually choosing mnemonic words is not a reliable source of entropy. A trusted tool should generate the randomness; a person should not invent it.",
        warnings: [
          "Never enter real seed words into a web page, message, cloud note, or demonstration.",
        ],
        sources: [
          {
            label: "Sparrow wallet: Quick Start Guide",
            url: "https://sparrowwallet.com/docs/quick-start.html",
          },
        ],
        videoUrl: null,
      },
      {
        id: "1.3",
        title: "Electrum",
        summary:
          "Electrum is a mature lightweight wallet with its own mnemonic system. Its server model, seed backup, and password behavior differ from Bitcoin Core.",
        status: "published",
        what: "We separate the Electrum seed, local wallet-file encryption, and the way a lightweight wallet obtains blockchain data.",
        why: "The comparison shows that two high-quality tools can use different recovery models and require different knowledge from users.",
        risk: "Assuming that all mnemonic formats are inherently the same can complicate recovery. Electrum's seed system is not the same as a standard BIP39 workflow.",
        sources: [
          {
            label: "Electrum: Seed Version System",
            url: "https://electrum.readthedocs.io/en/latest/seedphrase.html",
          },
        ],
        videoUrl: null,
      },
      {
        id: "1.4",
        title: "Why doesn't this curriculum start with mnemonic words?",
        summary:
          "BIP39 is a standard for converting computer-generated entropy into a mnemonic phrase and then into a seed. Its main advantages are portability and broad compatibility.",
        status: "published",
        what: "We distinguish entropy, the mnemonic phrase, the optional BIP39 passphrase, and the seed from which the wallet derives keys.",
        why: "A mnemonic is an operational secret that must be stored safely and tested through recovery. This first path uses the Bitcoin Core wallet model instead.",
        risk: "BIP39 is not a method for a person to invent 'random enough' words. The BIP describes how computer-generated randomness is encoded in a human-readable form.",
        notes: [
          "This is not a claim that BIP39 is mathematically weak. It is a decision to begin with fewer secret types and fewer compatibility assumptions.",
        ],
        sources: [
          {
            label: "BIP 39: mnemonic code for generating deterministic keys",
            url: "https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki",
          },
        ],
        videoUrl: null,
      },
      {
        id: "1.5",
        title: "Core-first philosophy",
        summary:
          "The initial Core workflow is short: create a wallet, encrypt it, back it up, and restore it. Each step has a clear place in the recovery model.",
        status: "published",
        what: "First, we build a simple test system that we can explain from key creation through a verified restore.",
        why: "Fewer initial decisions leave more room to focus on what should not be skipped: encryption, backup, recovery, and documentation.",
        risk: "Simpler onboarding is not automatically complete security. Malware, compromised OS, physical security and bad procedure remain real risks.",
        technicalDetails:
          "Bitcoin Core creates descriptor wallets using its own secure RNG process, can encrypt private keys with a passphrase, create wallet backups, and restore them. File details, the Bitcoin Core version, and descriptors remain part of the documented recovery package.",
        checklist: [
          "I can name all four initial Core steps.",
          "I can explain what each step protects.",
          "I know I should use only the test wallet until I have verified recovery.",
        ],
        sources: [managingWallets],
        videoUrl: null,
      },
    ],
  },
  {
    id: "2",
    title: "Bitcoin Core: a fundamental mental model",
    subtitle:
      "The node, wallet, blockchain, and signer each receive a clear, separate role.",
    level: "beginner",
    status: "published",
    estimatedTime: "60 min",
    prerequisites: ["Module 0", "Module 1"],
    videoUrl: null,
    warnings: [
      "RPC examples in this module use Signet and a clearly test-only wallet name. Do not copy commands into a setup that holds real funds without understanding every parameter.",
    ],
    checklist: [
      "I can draw an online node and an offline signer as two separate roles.",
      "I understand why an offline signer does not need to sync the blockchain.",
      "I can distinguish a hot wallet, a watch-only wallet, and a signing wallet.",
    ],
    lessons: [
      {
        id: "2.1",
        title: "Bitcoin Core is not just a wallet",
        summary:
          "Bitcoin Core contains a node that verifies the rules and network state, plus optional wallets that monitor funds and sign transactions.",
        status: "published",
        what: "We separate consensus validation from key management.",
        why: "You can use a node without private keys, several wallets with the same node, or an offline wallet without an active node.",
        risk: "If you call everything a 'wallet,' it becomes unclear what to back up, what can safely remain online, and which component verifies the blockchain.",
        sources: [coreRepository],
        videoUrl: null,
      },
      {
        id: "2.2",
        title: "Node vs. wallet",
        summary:
          "The node answers questions about the chain and network. The wallet answers questions about your own descriptors, addresses, UTXOs, and signing options.",
        status: "published",
        what: "In the Signet environment, we compare node RPC and wallet RPC without using sensitive data.",
        why: "The different RPC contexts show that the node and wallet are not simply two views of the same interface, but separate responsibilities.",
        risk: "A command directed at the wrong wallet or network can produce misleading results. Before each action, check the selected network and active wallet.",
        badges: ["SIGN", "RPC", "TEST EXAMPLE"],
        codeBlocks: [
          {
            id: "node-info",
            title: "Check node on Signet",
            code: "bitcoin-cli -signet getblockchaininfo",
            explanation:
              "Reads information about the chain that the node is currently tracking. It does not access private keys.",
            parameters: [
              {
                name: "-signet",
                explanation:
                  "Selects the Signet test network instead of mainnet.",
              },
              {
                name: "getblockchaininfo",
                explanation:
                  "Returns the state of the chain and the node's synchronization status.",
              },
            ],
          },
          {
            id: "wallet-info",
            title: "Check an unmistakably test-only wallet",
            code: 'bitcoin-cli -signet -rpcwallet="test-wallet" getwalletinfo',
            explanation:
              "Reads information from the wallet named test-wallet in a Signet environment.",
            parameters: [
              {
                name: '-rpcwallet="test-wallet"',
                explanation:
                  "Selects the test wallet; the wallet name is not a secret.",
              },
              {
                name: "getwalletinfo",
                explanation:
                  "Returns status and properties of the selected wallet.",
              },
            ],
            warning:
              "If `test-wallet` does not exist or is not loaded, the command will return an error. Do not modify or delete an existing wallet.",
          },
        ],
        sources: [
          {
            label: "Bitcoin Core RPC documentation",
            url: "https://bitcoincore.org/en/doc/",
          },
        ],
        videoUrl: null,
      },
      {
        id: "2.3",
        title: "Full node vs. pruned node",
        summary:
          "Both models fully verify Bitcoin's rules. A pruned node deletes older blocks after validation and retains a limited data window.",
        status: "published",
        what: "We choose between long-term storage of entire block history and reduced disk consumption with full validation.",
        why: "Pruning enables independent verification on more modest hardware, but limits access to older blocks and some recovery rescanning scenarios.",
        risk: 'Pruned does not mean "light verification." The node still downloads and verifies the chain; the difference is how much historical block data remains on disk afterward.',
        sources: [
          {
            label: "Bitcoin Core: Running a full node",
            url: "https://bitcoin.org/en/full-node",
          },
        ],
        videoUrl: null,
      },
      {
        id: "2.4",
        title: "Online Core vs. fully offline Core",
        summary:
          "Online Bitcoin Core receives network data, verifies UTXO state, and broadcasts transactions. Offline Bitcoin Core can hold a descriptor wallet with private keys and sign PSBTs.",
        status: "published",
        what: "We split the system using the principle of least privilege: the online component knows the network state, while the offline component can sign.",
        why: "Private keys do not have to be exposed to a networked computer for you to use bitcoin securely.",
        risk: "An air gap is not magical protection. Malicious removable media, a deceptive PSBT, or an unverified destination address can carry risk across the boundary.",
        sources: [psbt],
        videoUrl: null,
      },
      {
        id: "2.5",
        title: "Why an offline signer does not need to sync the blockchain",
        summary:
          "A PSBT can carry an unsigned transaction and the data required for review and signing. The signer does not need to store the entire blockchain.",
        status: "published",
        what: "The online coordinator prepares the PSBT, the offline signer reviews it and adds signatures, and the online node finalizes and broadcasts the transaction.",
        why: "This separation allows the key-holding device to remain permanently offline and avoids the burden of initial blockchain download.",
        risk: "The signer must still provide enough information to verify amounts, destinations, fees, and change outputs.",
        sources: [psbt, descriptors],
        videoUrl: null,
      },
      {
        id: "2.6",
        title: "What is wallet.dat / wallet directory",
        summary:
          "A modern Bitcoin Core wallet lives in its own directory with database and supporting files; the historical name wallet.dat does not describe every version and configuration.",
        status: "published",
        what: "We learn how to locate the wallet directory and document what the built-in backup includes in the Bitcoin Core version we use.",
        why: "Recovery must be based on a verified backup procedure, not on memory of a historical filename.",
        risk: "Manually copying an active database or moving files at random can produce an unusable copy. Use the built-in backup process and test the restore.",
        sources: [
          {
            label: "Bitcoin Core: Files",
            url: "https://github.com/bitcoin/bitcoin/blob/master/doc/files.md",
          },
          managingWallets,
        ],
        videoUrl: null,
      },
      {
        id: "2.7",
        title: "Descriptor wallets",
        summary:
          "A descriptor clearly defines which scripts, keys, and derivation paths a wallet tracks. It becomes a readable map of what the wallet considers its own.",
        status: "published",
        what: "We treat a descriptor as a description of the spending and derivation model, not as a synonym for a private key.",
        why: "Descriptors make watch-only wallets, multisig, public-configuration backups, and precise recovery easier to manage.",
        risk: "A descriptor can contain sensitive private information if it includes an xpriv or WIF key. This tutorial will never ask you to enter either one on the website.",
        warnings: [
          "A public descriptor can reveal all derived wallet addresses and harm privacy. A private descriptor can enable theft. Handle each according to its sensitivity.",
        ],
        sources: [descriptors],
        videoUrl: null,
      },
      {
        id: "2.8",
        title: "Hot wallet, watch-only wallet, and offline signer",
        summary:
          "A hot wallet keeps keys online, a watch-only wallet tracks funds without private keys, and an offline signer keeps keys off the network and signs prepared transactions.",
        status: "published",
        what: "We only give each component the information and powers it needs.",
        why: "This separation limits the consequences of compromising a single device and makes the procedure easier to audit.",
        risk: "A watch-only wallet is not harmless simply because it cannot sign: its xpubs or descriptors can reveal transaction history and future addresses.",
        checklist: [
          "I can describe what a compromised hot wallet allows an attacker to do.",
          "I can describe what a compromised watch-only wallet reveals.",
          "I can explain what an offline signer must verify before signing.",
        ],
        sources: [managingWallets, descriptors, psbt],
        videoUrl: null,
      },
    ],
  },
  {
    id: "3",
    title: "Creating your first Bitcoin Core wallet",
    subtitle:
      "Practical walkthrough in a test environment, with no real funds.",
    level: "beginner",
    status: "in-progress",
    estimatedTime: "75 min",
    prerequisites: ["Modules 0-2", "Practice computer"],
    videoUrl: null,
    warnings: ["Do not use real bitcoin until you have completed the test."],
    checklist: ["I made a test wallet."],
    lessons: outlineLessons(
      "3",
      [
        "Bitcoin Core installation and verification",
        "Create wallet",
        "What's going on below the surface?",
        "Entropy, OS CSPRNG, and Bitcoin Core RNG",
        "Generate your first receiving address",
        "Understand the wallet file",
        "First test wallet",
      ],
      "in-progress",
      "These lessons will be published only after the workflow has been tested repeatedly on supported operating systems."
    ),
  },
  {
    id: "4",
    title: "Wallet encryption and passphrases",
    subtitle:
      "What encryption protects, what it does not protect, and how to preserve access.",
    level: "beginner",
    status: "in-progress",
    estimatedTime: "85 min",
    prerequisites: ["Module 3", "Empty test wallet"],
    videoUrl: null,
    warnings: [
      "If you lose the wallet passphrase, you can permanently lose access to your bitcoin.",
      "Never enter a real wallet passphrase or KeePassXC master password on this website.",
    ],
    checklist: [
      "I understand what encryption doesn't protect.",
      "I have separate backup plans for the wallet and its passphrase.",
      "I've only tested the procedure on an empty test wallet.",
    ],
    lessons: outlineLessons(
      "4",
      [
        "Encrypt wallet",
        "What encryption protects",
        "What encryption does not protect",
        "How to create a strong passphrase",
        "Why not invent a memorable phrase yourself?",
        "KeePassXC",
        "Generating a passphrase in KeePassXC",
        "KeePassXC database",
        "Master password",
        "Back up the KeePassXC database",
      ],
      "in-progress",
      "The lesson will undergo security and recovery review before publication."
    ),
  },
  {
    id: "5",
    title: "A backup that actually works",
    subtitle:
      "Redundancy, separation of secrets, and a plan that can survive a failure.",
    level: "beginner",
    status: "in-progress",
    estimatedTime: "100 min",
    prerequisites: ["Modules 3-4", "Empty test wallet"],
    videoUrl: null,
    warnings: ["One copy on one medium is not a backup system."],
    checklist: [
      "I have at least two wallet backups.",
      "They are stored on at least two physical media.",
      "They are not all in the same location.",
      "I have a secure backup of the passphrase.",
      "I know where every copy is.",
      "I have actually tested recovery.",
    ],
    lessons: outlineLessons(
      "5",
      [
        "BACKUPWALLET",
        "What the backup actually contains",
        "Why one copy is not a backup",
        "Redundant backups",
        "Different physical media",
        "Geographically separated copies",
        "Encrypted digital backups",
        "Why a wallet backup and passphrase must be stored separately",
        "Back up the KeePassXC database",
        "Documentation of your own recovery procedure",
      ],
      "in-progress",
      "The detailed backup scenario is being developed and will include a tested restore procedure."
    ),
  },
  {
    id: "6",
    title: "Restore — the most important test",
    subtitle: "A backup you've never restored is just an assumption.",
    level: "beginner",
    status: "in-progress",
    estimatedTime: "90 min",
    prerequisites: ["Module 5", "Test backup without real funds"],
    videoUrl: null,
    warnings: [
      "Perform the restore exercise without real funds and without overwriting an existing wallet or backup.",
    ],
    checklist: [
      "I found the backup.",
      "I've opened a copy.",
      "The wallet loaded successfully.",
      "The corresponding addresses are present.",
      "The passphrase works.",
      "The backup medium is readable.",
      "I created a new backup if necessary.",
    ],
    lessons: outlineLessons(
      "6",
      [
        "Wallet restoration",
        "Restoring on another computer",
        "Restoring in a clean environment",
        "Descriptor information check",
        "A restore test without real funds",
        "Annual recovery drill",
      ],
      "in-progress",
      "The recovery procedure is still being tested on multiple platforms."
    ),
  },
  {
    id: "7",
    title: "Bitcoin addresses and script type",
    subtitle:
      "Recognize the format, compatibility, costs, and tradeoffs of each address type.",
    level: "beginner",
    status: "in-progress",
    estimatedTime: "65 min",
    prerequisites: ["Module 2"],
    videoUrl: null,
    warnings: [
      "Address prefix is not a substitute for validating the destination address.",
    ],
    checklist: [
      "I can distinguish 1..., 3..., bc1q..., and bc1p... addresses.",
      "I know that compatibility and fees are not the only criteria.",
    ],
    lessons: outlineLessons(
      "7",
      [
        "Legacy addresses",
        "Nested SegWit",
        "Native SegWit",
        "Taproot",
        "How to identify an address",
        "Fee implications",
        "Privacy",
        "Compatibility",
        "What to use today and why",
      ],
      "in-progress",
      "The visual guide through the addresses and tradeoffs is currently being developed."
    ),
  },
  {
    id: "8",
    title: "Offline signer",
    subtitle: "One device, one function, and a verifiable data transfer.",
    level: "intermediate",
    status: "in-progress",
    estimatedTime: "120 min",
    prerequisites: ["Modules 0-7", "Tested backup and restore"],
    videoUrl: null,
    warnings: [
      "An air gap is not proof of security if the software, installation, or portable media have not been verified.",
    ],
    checklist: [
      "The signer was never connected to the network after preparation.",
      "The device has one documented function.",
      "I know how to verify data before signing.",
    ],
    lessons: outlineLessons(
      "8",
      [
        "Why use an offline computer",
        "Why a signer does not need the blockchain",
        "An old laptop as a dedicated signing device",
        "Linux",
        "Fedora, Debian, and lightweight desktops",
        "Install Bitcoin Core before creating the air gap",
        "Software validation",
        "Disconnecting the network",
        "Optional physical removal of Wi-Fi hardware",
        "One device, one function",
        "Why an old ThinkPad can be more than enough",
      ],
      "in-progress",
      "The offline-device guide is undergoing hardware and operational review."
    ),
  },
  {
    id: "9",
    title: "First offline signed transaction",
    subtitle:
      "A PSBT travels from the online coordinator to the offline signer and back.",
    level: "intermediate",
    status: "in-progress",
    estimatedTime: "120 min",
    prerequisites: [
      "Module 8",
      "Signet test funds",
      "A prepared offline signer",
    ],
    videoUrl: null,
    warnings: ["Do not use real bitcoin until you have completed the test."],
    checklist: [
      "I created an unsigned PSBT on Signet.",
      "I checked the amount, fee, and change before signing.",
      "I finalized and broadcast only a test transaction.",
    ],
    lessons: outlineLessons(
      "9",
      [
        "Create an unsigned transaction / PSBT",
        "Transfer the PSBT to offline Core",
        "Transaction review",
        "Signing",
        "Transfer the signed PSBT back to online Core",
        "Finalization",
        "Close or unload the temporary signing wallet",
        "Broadcast",
      ],
      "in-progress",
      "The entire PSBT walkthrough will be published after a repeat Signet test."
    ),
  },
  {
    id: "10",
    title: "Operational security",
    subtitle: "A secure system must remain secure during actual use.",
    level: "intermediate",
    status: "in-progress",
    estimatedTime: "90 min",
    prerequisites: ["Module 9"],
    videoUrl: null,
    warnings: [
      "Always test with a small amount first, and define in advance what you will verify.",
    ],
    checklist: [
      "I verify the address on an independent display.",
      "I verify the change and fee before signing.",
      "I have an annual maintenance appointment.",
      "I know what to do if the device stops working.",
    ],
    lessons: outlineLessons(
      "10",
      [
        "Malware",
        "Physical security",
        "Compromised USB",
        "Address verification",
        "Change address",
        "Fee sanity checks",
        "Testing with a small amount",
        "Documentation of the procedure",
        "Annual maintenance routine",
        "What to do if the device dies",
      ],
      "in-progress",
      "Operational procedures are currently turning into verifiable checklists."
    ),
  },
  {
    id: "11",
    title: "Introduction to multisig",
    subtitle: "First the concept, then descriptors and spending policies.",
    level: "intermediate",
    status: "in-progress",
    estimatedTime: "75 min",
    prerequisites: ["Modules 0-10", "Trusted single-sig recovery"],
    videoUrl: null,
    warnings: [
      "Multisig removes some single points of failure, but introduces new metadata, coordination, and recovery obligations.",
    ],
    checklist: [
      "I can explain 2-of-3 without referring to a specific product.",
      "I know what a descriptor adds to the recovery package.",
      "I have a clear reason to add multisig.",
    ],
    lessons: outlineLessons(
      "11",
      [
        "Why multisig",
        "What 2-of-3 means",
        "What multisig improves",
        "What multisig makes more complex",
        "Three independent keys",
        "Three independent signers",
        "Descriptor as a map of the wallet",
        "What must be backed up besides private keys",
      ],
      "in-progress",
      "Conceptual lessons pass recovery review before publication."
    ),
  },
  {
    id: "12",
    title: "2-of-3 SegWit multisig in Bitcoin Core",
    subtitle:
      "A first multisig setup with three signers and a watch-only coordinator.",
    level: "advanced",
    status: "in-progress",
    estimatedTime: "4 h",
    prerequisites: ["Module 11", "Three test signers", "Signet"],
    videoUrl: null,
    warnings: [
      "RPC commands will not be marked as published until the entire recovery walkthrough has been repeated from scratch.",
    ],
    checklist: [
      "All three coordinators derive the same receiving addresses.",
      "Two signers can complete a test transaction.",
      "The third signer can be unavailable without causing a loss of funds.",
    ],
    lessons: outlineLessons(
      "12",
      [
        "Generate three private-key signers",
        "Get the necessary public information",
        "Build the descriptor",
        "Checksum",
        "Descriptor import",
        "Watch-only coordinator",
        "Generate a receiving address",
        "Test deposit",
        "Create PSBT",
        "Signer A",
        "Signer B",
        "Finalization",
        "Broadcast",
        "Recovery",
      ],
      "in-progress",
      "This RPC lesson hasn't been published yet."
    ),
  },
  {
    id: "13",
    title: "Multisig backup and recovery",
    subtitle:
      "Keys are not the whole story: the wallet map must also be restorable.",
    level: "advanced",
    status: "in-progress",
    estimatedTime: "3 h",
    prerequisites: ["Module 12", "Test 2-of-3 setup"],
    videoUrl: null,
    warnings: [
      "Private keys without descriptors, derivation information, and documentation can make recovery very difficult or impossible.",
    ],
    checklist: [
      "I backed up all three test signer wallets.",
      "I backed up the descriptor and derivation information.",
      "Recovery documentation does not depend on my memory.",
      "I completed a recovery drill without the original coordinator.",
    ],
    lessons: outlineLessons(
      "13",
      [
        "Individual signer wallets",
        "Passphrase system",
        "Descriptor and checksum",
        "Derivation information",
        "Recovery documentation",
        "Complete 2-of-3 disaster recovery walkthrough",
      ],
      "in-progress",
      "The recovery guide has not yet been published because it is being tested for complete recovery without the original coordinator."
    ),
  },
  {
    id: "14",
    title: "Taproot",
    subtitle: "A growing module on key paths, script paths, and descriptors.",
    level: "advanced",
    status: "in-progress",
    estimatedTime: "To be estimated",
    prerequisites: ["Modules 0-13"],
    videoUrl: null,
    warnings: [
      "This module is not a finished guide. Don't assume that Taproot is automatically better for every setup.",
    ],
    checklist: [],
    lessons: outlineLessons(
      "14",
      [
        "What Taproot changes",
        "Key-path spending",
        "Script-path spending",
        "Privacy",
        "Efficiency",
        "Taproot descriptors",
        "When to use Taproot",
        "Tradeoffs",
      ],
      "in-progress",
      "The topic is in research and will not be marked as complete before full testing."
    ),
  },
  {
    id: "15",
    title: "Advanced self-custody",
    subtitle:
      "Spending policies for real needs that the simpler system does not solve.",
    level: "advanced",
    status: "planned",
    estimatedTime: "Planned",
    prerequisites: ["Reliable single-sig and multisig recovery"],
    videoUrl: null,
    warnings: ["Don't add complexity before you understand a simpler system."],
    checklist: [],
    lessons: outlineLessons(
      "15",
      [
        "Miniscript",
        "Timelocks",
        "Recovery paths",
        "Inheritance",
        "Business treasuries",
        "Family vaults",
        "Multi-location signing",
        "Taproot multisig construction",
        "MuSig2 where applicable",
        "Advanced spending policies",
        "Emergency recovery",
        "Geographically distributed signers",
      ],
      "planned",
      "This lesson is on the roadmap and does not yet include operational instructions."
    ),
  },
  {
    id: "16",
    title: "Laboratory",
    subtitle:
      "Isolated experiments for Signet, regtest, RPC, descriptors, and PSBT.",
    level: "intermediate",
    status: "in-progress",
    estimatedTime: "Ongoing",
    prerequisites: ["Depends on the experiment"],
    videoUrl: null,
    warnings: [
      "The lab uses Signet or regtest. Examples are not instructions for mainnet funds.",
    ],
    checklist: [
      "I know which network I'm running the experiment on.",
      "The experiment cannot access a wallet with real funds.",
      "I recorded the input, expected result, and actual result.",
    ],
    lessons: outlineLessons(
      "16",
      [
        "BEGINNER — First Signet RPC",
        "BEGINNER — Regtest blocks and test UTXOs",
        "INTERMEDIATE — Descriptor experiment",
        "INTERMEDIATE — Test multisig",
        "ADVANCED — PSBT debugging",
        "ADVANCED — New Bitcoin Core features",
      ],
      "in-progress",
      "The experiment is in preparation; its level will be confirmed when the prerequisites and procedure are published."
    ),
  },
  {
    id: "17",
    title: "References and further learning",
    subtitle:
      "Primary sources before summaries, tutorials, and other people's interpretations.",
    level: "beginner",
    status: "in-progress",
    estimatedTime: "Ongoing",
    prerequisites: ["None"],
    videoUrl: null,
    warnings: [
      "Confirm that the documentation matches your Bitcoin Core version before using an RPC example.",
    ],
    checklist: [
      "I know how to find RPC documentation for my Bitcoin Core version.",
      "I know how to find the original BIP instead of relying on a summary.",
      "I record source versions with my recovery documentation.",
    ],
    lessons: [
      {
        id: "17.1",
        title: "Bitcoin Core documentation and GitHub",
        summary:
          "Official instructions, source code, release notes, and RPC references.",
        status: "in-progress",
        sources: [
          coreRepository,
          {
            label: "Bitcoin Core RPC documentation",
            url: "https://bitcoincore.org/en/doc/",
          },
          {
            label: "Bitcoin Core Download and Verify",
            url: "https://bitcoincore.org/en/download/",
          },
        ],
        videoUrl: null,
      },
      {
        id: "17.2",
        title: "BIP repository",
        summary:
          "Original specifications for BIP39, PSBT, Taproot, descriptors, MuSig2, and related standards.",
        status: "in-progress",
        sources: [
          {
            label: "Bitcoin Improvement Proposals",
            url: "https://github.com/bitcoin/bips",
          },
        ],
        videoUrl: null,
      },
      {
        id: "17.3",
        title: "Reproducible builds and release verification",
        summary:
          "Checking binary files and understanding what signatures and reproductions really prove.",
        status: "in-progress",
        sources: [
          {
            label: "Bitcoin Core Download and Verify",
            url: "https://bitcoincore.org/en/download/",
          },
          {
            label: "Bitcoin Core Guix Signatures",
            url: "https://github.com/bitcoin-core/guix.sigs",
          },
        ],
        videoUrl: null,
      },
    ],
  },
]

export const roadmapStages = [
  { label: "Basics", modules: "0-2" },
  { label: "Single-sig", modules: "3-7" },
  { label: "Offline signing", modules: "8-10" },
  { label: "Multisig", modules: "11-13" },
  { label: "Taproot", modules: "14" },
  { label: "Advanced policies", modules: "15-17" },
]

export const curriculumSources = {
  descriptors,
  managingWallets,
  psbt,
}
