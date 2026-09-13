import type { PlayerLesson } from "../bitcoin-core-curriculum-player-en-data"

export const part3Lessons: PlayerLesson[] = [
  {
    id: "multisig-why",
    slug: "why-multisig-and-when-not-to-use-it",
    title: "Multisig is a spending policy, not a backup strategy",
    summary:
      "Decide whether multiple independent approvals solve your actual problem.",
    objective:
      "Decide whether multiple independent approvals solve your actual problem.",
    what: "Decide whether multiple independent approvals solve your actual problem.",
    why: "Losing a backup and preventing unilateral spending are different threats.",
    risk: "Adding signers only to get more copies can buy complexity without addressing a new authorization requirement.",
    status: "published",
    verification: "source-reviewed",
    referenceVersion: "Bitcoin Core 31.1",
    contentUpdated: "2026-09-13",
    estimatedTime: "8–12 min",
    kind: "reading",
    explanation: [
      "A 2-of-3 policy requires signatures from any two of three designated keys. It changes who can authorize a payment. Saying “I use it so I can lose one key” describes a redundancy goal, but redundant encrypted single-sig backups can already survive loss of a device or location.",
      "Ask first: must several independent people approve? Does authority need organizational or geographic separation? Should no individual be able to spend alone? Does inheritance require a different signer or a delayed recovery branch?",
      "A company treasury requiring two officers, genuinely shared family ownership or geographically separated authority can justify multisig. These arrangements solve authorization problems. They still need backups, complete policy records and tested recovery.",
      "Single-sig is not inherently less serious. A large balance may change the threat model, but no BTC threshold mechanically determines the number of keys. If a tested single-sig system covers the actual threats, you can finish the course there.",
    ],
    prerequisites: ["single-sig-mastery"],
    sources: [
      {
        label: "Bitcoin Core 31.1: descriptors and Miniscript",
        url: "https://github.com/bitcoin/bitcoin/blob/v31.1/doc/descriptors.md",
      },
      {
        label: "Bitcoin Core 31.1: offline signing tutorial",
        url: "https://github.com/bitcoin/bitcoin/blob/v31.1/doc/offline-signing-tutorial.md",
      },
    ],
    reviewNote:
      "Content and cited sources reviewed on 2026-09-13. Any hands-on evidence is listed separately. Source review is not a claim that every platform or physical procedure was tested.",
    origin: "First-principles curriculum v4",
    chapter: "Decide whether to add authority",
    optional: true,
    sourceReviewed: "2026-09-13",
    takeaway:
      "Multisig distributes spending authority. Use it when that distribution solves a real problem, not simply to obtain redundant backups.",
  },
  {
    id: "multi-vendor-cost",
    slug: "multi-vendor-cost",
    title: "Count the cost of three vendor ecosystems",
    summary:
      "Evaluate a multi-vendor 2-of-3 setup as a complete operating system.",
    objective:
      "Evaluate a multi-vendor 2-of-3 setup as a complete operating system.",
    what: "Evaluate a multi-vendor 2-of-3 setup as a complete operating system.",
    why: "Different vendors can diversify one failure class while adding several others.",
    risk: "More components can make recovery and maintenance harder than the original threat justified.",
    status: "published",
    verification: "source-reviewed",
    referenceVersion: "Bitcoin Core 31.1",
    contentUpdated: "2026-09-13",
    estimatedTime: "8–12 min",
    kind: "reading",
    explanation: [
      "A 2-of-3 arrangement with three hardware-wallet vendors means three devices, firmware families, supply chains, recovery interfaces and continuity plans. A coordinator must understand the shared descriptor and interoperate correctly with each signer.",
      "Vendor diversity can reduce dependence on one implementation. It does not remove firmware, compatibility or supply-chain assumptions. Someone must still verify updates, track which device knows which policy, maintain backups and test every surviving pair.",
      "More components do not automatically equal more security. The course’s recommended foundation stays Bitcoin Core on dedicated generic Linux hardware. When multiple authorities are justified, learn the policy first and count the operational cost of implementing it.",
    ],
    prerequisites: ["single-sig-mastery", "multisig-why"],
    sources: [
      {
        label: "Bitcoin Core 31.1: descriptors and Miniscript",
        url: "https://github.com/bitcoin/bitcoin/blob/v31.1/doc/descriptors.md",
      },
      {
        label: "Bitcoin Core 31.1: offline signing tutorial",
        url: "https://github.com/bitcoin/bitcoin/blob/v31.1/doc/offline-signing-tutorial.md",
      },
    ],
    reviewNote:
      "Content and cited sources reviewed on 2026-09-13. Any hands-on evidence is listed separately. Source review is not a claim that every platform or physical procedure was tested.",
    origin:
      "Author’s architectural comparison; no claim that all multi-vendor configurations are unsafe",
    chapter: "Decide whether to add authority",
    optional: true,
    sourceReviewed: "2026-09-13",
    takeaway:
      "Different vendors may reduce some shared failures while adding software, compatibility and recovery work. Diversity needs an explicit justification.",
  },
  {
    id: "complex-simple",
    slug: "complex-wallet-simple-recovery",
    title: "Write the policy in ordinary language first",
    summary:
      "State who may spend and under which conditions before writing a descriptor.",
    objective:
      "State who may spend and under which conditions before writing a descriptor.",
    what: "State who may spend and under which conditions before writing a descriptor.",
    why: "A syntactically valid script can enforce the wrong human agreement perfectly.",
    risk: "An unintended alternate branch may let someone bypass the quorum you thought was required.",
    status: "published",
    verification: "source-reviewed",
    referenceVersion: "Bitcoin Core 31.1",
    contentUpdated: "2026-09-13",
    estimatedTime: "8–12 min",
    kind: "checkpoint",
    explanation: [
      "Write a sentence such as “any two of these three independent officers must approve.” Then write who controls each key, which failures you intend to tolerate and who must be unable to spend alone.",
      "For a delayed recovery path, specify exactly when authority changes and who gains it. Does the delay begin at a calendar date, a block height or when a particular output confirms? What happens to old coins that have already aged past the delay?",
      "Only after those decisions should the policy become a descriptor. If you cannot explain every branch and its recovery materials, return to the simple system.",
    ],
    prerequisites: ["single-sig-mastery", "multi-vendor-cost"],
    sources: [
      {
        label: "Bitcoin Core 31.1: descriptors and Miniscript",
        url: "https://github.com/bitcoin/bitcoin/blob/v31.1/doc/descriptors.md",
      },
      {
        label: "BIP 68: relative lock times",
        url: "https://github.com/bitcoin/bips/blob/master/bip-0068.mediawiki",
      },
    ],
    reviewNote:
      "Content and cited sources reviewed on 2026-09-13. Any hands-on evidence is listed separately. Source review is not a claim that every platform or physical procedure was tested.",
    origin: "First-principles curriculum v4",
    checklist: [
      "I have a concrete authorization problem that the simple backup system does not solve.",
      "I can explain every proposed spending branch without using script notation.",
    ],
    chapter: "Decide whether to add authority",
    optional: true,
    sourceReviewed: "2026-09-13",
    takeaway:
      "If a policy is justified, simplify how people operate and recover it. Removing needless steps is part of security work.",
  },
  {
    id: "lab-method",
    slug: "how-to-run-a-self-custody-experiment",
    title: "Make a reproducible, disposable experiment",
    summary: "Keep advanced practice separate from all real wallets.",
    objective: "Keep advanced practice separate from all real wallets.",
    what: "Keep advanced practice separate from all real wallets.",
    why: "A test is useful only when you can identify its starting conditions and reproduce the result.",
    risk: "An experiment on the wrong network or data directory can affect real money.",
    status: "published",
    verification: "source-reviewed",
    referenceVersion: "Bitcoin Core 31.1",
    contentUpdated: "2026-09-13",
    estimatedTime: "20–40 min active",
    kind: "practice",
    explanation: [
      "Regtest is a local Bitcoin test chain. You can create blocks immediately, control confirmations and test a rejection before a time condition is satisfied. It is well suited to repeated spending-policy experiments.",
      "The downloadable lab creates fresh temporary directories, generated test wallets and two Core processes with peer networking disabled. Both run on one host. That tests software behavior; it does not simulate physical isolation or independent human control.",
      "Read the Python lab before running it. It uses Core RPC for keys, descriptors, signing and validation; Python only orchestrates those calls. Python is an optional dependency for this advanced laboratory, not for the base custody setup.",
    ],
    prerequisites: ["single-sig-mastery", "complex-simple"],
    sources: [
      {
        label: "Bitcoin Core 31.1: descriptors and Miniscript",
        url: "https://github.com/bitcoin/bitcoin/blob/v31.1/doc/descriptors.md",
      },
      {
        label: "Bitcoin Core 31.1: PSBT workflow",
        url: "https://github.com/bitcoin/bitcoin/blob/v31.1/doc/psbt.md",
      },
      {
        label: "Download: readable Core 31.1 Regtest laboratory",
        url: "/curriculum-labs/core-31.1-regtest.py",
      },
    ],
    reviewNote:
      "Content and cited sources reviewed on 2026-09-13. Any hands-on evidence is listed separately. Source review is not a claim that every platform or physical procedure was tested.",
    origin: "First-principles curriculum v4",
    guidedSteps: [
      {
        id: "scope-v4",
        title: "State the experiment and its limits",
        instructions: [
          "Record Core 31.1, Regtest, the verified binary location and the expected success and failure cases. Keep all real wallet data outside the laboratory. Read the supplied script and confirm that every Core call selects an explicit Regtest directory.",
        ],
        expectedResult:
          "The lab cannot silently fall back to your default wallet directory.",
        help: "Stop at this step if the result differs. Recheck the selected network, wallet and files, then review the linked official documentation. Do not mark the result as confirmed until you can explain the difference.",
      },
    ],
    chapter: "Learn the Core primitives",
    optional: true,
    sourceReviewed: "2026-09-13",
    takeaway:
      "A useful experiment records a policy, expected results and failures in an isolated environment that you can recreate.",
  },
  {
    id: "lab-regtest",
    slug: "regtest-and-failure-scenarios",
    title: "Run the Core 31.1 laboratory",
    summary: "Start a repeatable chain and inspect the assertions it checks.",
    objective: "Start a repeatable chain and inspect the assertions it checks.",
    what: "Start a repeatable chain and inspect the assertions it checks.",
    why: "You can test recovery, quorum and timing without obtaining coins or waiting for public blocks.",
    risk: "A passing software test is not evidence that a physical signer is offline.",
    status: "published",
    verification: "source-reviewed",
    referenceVersion: "Bitcoin Core 31.1",
    contentUpdated: "2026-09-13",
    estimatedTime: "20–40 min active",
    kind: "practice",
    explanation: [
      "Download the linked Python script and inspect it locally. Pass the absolute path to the bin directory of your verified Core 31.1 release. The script makes its own temporary folders and selects unused localhost RPC ports.",
      "The script first runs the assertions. With --keep-running it then creates fresh practice PSBTs and leaves the two isolated processes available for the following lessons. It prints the location of session.sh, a small shell helper file containing only these explicit test commands and public test values.",
    ],
    prerequisites: ["single-sig-mastery", "lab-method"],
    sources: [
      {
        label: "Download: Core 31.1 lab source",
        url: "/curriculum-labs/core-31.1-regtest.py",
      },
      {
        label: "Bitcoin Core 31.1: data files",
        url: "https://github.com/bitcoin/bitcoin/blob/v31.1/doc/files.md",
      },
      {
        label: "Bitcoin Core 31.1: descriptors and Miniscript",
        url: "https://github.com/bitcoin/bitcoin/blob/v31.1/doc/descriptors.md",
      },
    ],
    reviewNote:
      "Core 31.1 source and RPC help reviewed; executable examples checked on isolated macOS Regtest. This verifies software behavior, not physical air gaps or organizational independence.",
    origin: "First-principles curriculum v4",
    guidedSteps: [
      {
        id: "run-v4",
        title: "Run the disposable lab",
        instructions: [
          "In the folder containing the reviewed script, run the command below with your actual verified bin path. Python 3.10 or later is sufficient; no additional Python packages are needed. Expect PASS lines for restoration, old-password behavior, offline signing, all three signer pairs, Taproot and time-locked recovery.",
        ],
        expectedResult:
          "The lab reports its checks and prints a temporary directory containing session.sh.",
        command:
          "python3 core-31.1-regtest.py --bin /absolute/path/to/bitcoin-31.1/bin --keep-running",
        commandContext: "System terminal · disposable Regtest laboratory",
        help: "Use Python 3.10 or later and the absolute bin path of Core 31.1. Read the failing PASS check or error and the temporary process.log. Do not replace an explicit Regtest data path with your normal Core directory.",
      },
      {
        id: "helpers-v4",
        title: "Inspect and load your test helpers",
        instructions: [
          "Open the printed session.sh file in a text editor. It defines online and offline as shortcuts for bitcoin-cli with the two explicit temporary Regtest directories and RPC ports. It also contains public keys and unfunded-or-test-only transaction data used below.",
          "In the same terminal, run source followed by the exact file path the script printed. Do not source a file supplied by a stranger. Here you are reviewing a file generated by your own test run.",
        ],
        expectedResult:
          "The online and offline helpers point only to the printed temporary directories.",
        command: "source /absolute/path/printed/by/the/lab/session.sh",
        commandContext: "Bash or Zsh · substitute the path printed by your run",
        help: "Use Python 3.10 or later and the absolute bin path of Core 31.1. Read the failing PASS check or error and the temporary process.log. Do not replace an explicit Regtest data path with your normal Core directory.",
      },
      {
        id: "identity-v4",
        title: "Confirm both test nodes independently",
        instructions: [
          "Run the commands below. For both nodes, getblockchaininfo must report chain as regtest. getnetworkinfo must report networkactive as false and connections as 0. The signer’s getblockcount should be 0.",
        ],
        expectedResult:
          "Two local Regtest nodes are identified; the signer has not synchronized a chain.",
        command:
          "online getblockchaininfo\nonline getnetworkinfo\noffline getblockchaininfo\noffline getnetworkinfo\noffline getblockcount",
        commandContext: "Same terminal · helpers from your reviewed session.sh",
        help: "Use Python 3.10 or later and the absolute bin path of Core 31.1. Read the failing PASS check or error and the temporary process.log. Do not replace an explicit Regtest data path with your normal Core directory.",
      },
      {
        id: "cleanup-plan-v4",
        title: "Know how to stop the lab",
        instructions: [
          "Keep this terminal open for the following exercises. When finished, use online stop and offline stop. These commands stop only the generated test nodes. The temporary data is retained for inspection; it is not a backup strategy.",
        ],
        expectedResult:
          "You can stop the test processes without touching another Core installation.",
        command:
          "# Run these after the following laboratory exercises:\n# online stop\n# offline stop",
        commandContext: "Same terminal · cleanup reminder",
        help: "Use Python 3.10 or later and the absolute bin path of Core 31.1. Read the failing PASS check or error and the temporary process.log. Do not replace an explicit Regtest data path with your normal Core directory.",
      },
    ],
    chapter: "Learn the Core primitives",
    optional: true,
    sourceReviewed: "2026-09-13",
    practicalReview: {
      date: "2026-09-13",
      scope:
        "Automated Core 31.1 Regtest integration: encrypted recovery, offline PSBT, all 2-of-3 pairs, Taproot key path and delayed Miniscript recovery. Physical distribution is outside this test.",
    },
    takeaway:
      "Regtest supplies controlled blocks and valueless funds for repeatable policy tests. Its results do not certify a physical air gap.",
  },
  {
    id: "lab-rpc",
    slug: "rpc-and-cli",
    title: "Use RPC only when you need its precision",
    summary: "Read a command’s help, choose the wallet and inspect the result.",
    objective:
      "Read a command’s help, choose the wallet and inspect the result.",
    what: "Read a command’s help, choose the wallet and inspect the result.",
    why: "The console exposes functions the ordinary GUI does not, including detailed policy setup.",
    risk: "A powerful command in the wrong wallet can disclose a secret or perform the wrong action.",
    status: "published",
    verification: "source-reviewed",
    referenceVersion: "Bitcoin Core 31.1",
    contentUpdated: "2026-09-13",
    estimatedTime: "20–40 min active",
    kind: "practice",
    explanation: [
      "RPC means remote procedure call: a named request to a running program. Core uses this interface for wallet and node operations. In this lab the request stays on your own computer and authenticates through Core’s local cookie file.",
      "The GUI’s console invokes the same underlying functions. bitcoin-cli is the command-line client. Shell helpers, variables and Python commands shown here belong in your system terminal, not in the Core console. Choose one context and follow its syntax.",
      "Help describes the arguments and result. A Boolean is true or false; a JSON array uses square brackets; a JSON object uses braces with named fields. You do not need to memorize the interface. You do need to identify the active network, wallet and consequence before running it.",
    ],
    prerequisites: ["single-sig-mastery", "lab-regtest"],
    sources: [
      {
        label: "Bitcoin Core 31.1: wallet creation, backup and restoration",
        url: "https://github.com/bitcoin/bitcoin/blob/v31.1/doc/managing-wallets.md",
      },
      {
        label: "Bitcoin Core 31.1: descriptors and Miniscript",
        url: "https://github.com/bitcoin/bitcoin/blob/v31.1/doc/descriptors.md",
      },
      {
        label: "Bitcoin Core 31.1: PSBT workflow",
        url: "https://github.com/bitcoin/bitcoin/blob/v31.1/doc/psbt.md",
      },
    ],
    reviewNote:
      "Core 31.1 source and RPC help reviewed; executable examples checked on isolated macOS Regtest. This verifies software behavior, not physical air gaps or organizational independence.",
    origin: "First-principles curriculum v4",
    guidedSteps: [
      {
        id: "help-v4",
        title: "Read the installed release’s help",
        instructions: [
          "Use the running lab from the previous lesson. Ask Core itself for the help of each operation before editing its arguments. The release pinned in this course is 31.1.",
        ],
        expectedResult:
          "The output explains getdescriptorinfo and walletprocesspsbt, including the finalize argument.",
        command:
          "online help getdescriptorinfo\noffline help walletprocesspsbt",
        commandContext: "System terminal · lab helpers",
        help: "Stop at this step if the result differs. Recheck the selected network, wallet and files, then review the linked official documentation. Do not mark the result as confirmed until you can explain the difference.",
      },
      {
        id: "wallet-v4",
        title: "Select the wallet explicitly",
        instructions: [
          "List the loaded wallets, then inspect the watch-only coordinator and one signer. -rpcwallet identifies the wallet on which a wallet command operates. It is not a name to infer from the last open window.",
        ],
        expectedResult:
          "The coordinator reports private_keys_enabled false; the signing wallet reports true and is encrypted.",
        command:
          "online listwallets\nonline -rpcwallet=multisig-watch getwalletinfo\noffline -rpcwallet=multisig-signer-0 getwalletinfo",
        commandContext: "System terminal · disposable lab wallets",
        help: "Stop at this step if the result differs. Recheck the selected network, wallet and files, then review the linked official documentation. Do not mark the result as confirmed until you can explain the difference.",
      },
    ],
    chapter: "Learn the Core primitives",
    optional: true,
    sourceReviewed: "2026-09-13",
    practicalReview: {
      date: "2026-09-13",
      scope:
        "Automated Core 31.1 Regtest integration: encrypted recovery, offline PSBT, all 2-of-3 pairs, Taproot key path and delayed Miniscript recovery. Physical distribution is outside this test.",
    },
    takeaway:
      "RPC calls request specific work from Core. Selecting the correct node and wallet is part of understanding every command.",
  },
  {
    id: "2.2",
    slug: "node-wallet-and-blockchain-are-not-the-same",
    title: "Separate node state from wallet state in RPC",
    summary:
      "Use the node and wallet inspection calls for their different jobs.",
    objective:
      "Use the node and wallet inspection calls for their different jobs.",
    what: "Use the node and wallet inspection calls for their different jobs.",
    why: "A healthy node can coexist with the wrong selected wallet, and an offline signer can have no blocks.",
    risk: "Confusing the node’s data with the wallet’s data can produce a useless recovery plan.",
    status: "published",
    verification: "source-reviewed",
    referenceVersion: "Bitcoin Core 31.1",
    contentUpdated: "2026-09-13",
    estimatedTime: "20–40 min active",
    kind: "practice",
    explanation: [
      "getblockchaininfo describes the chain known to a node. getwalletinfo describes a selected wallet: whether it has private keys, whether it uses descriptors and whether its encrypted keys are currently unlocked.",
      "The private keys and wallet configuration belong in the wallet backup. Downloaded blocks belong to the node and can be acquired again. The signer at height zero in this lab can still sign because the PSBT carries the transaction information it needs.",
    ],
    prerequisites: ["single-sig-mastery", "lab-rpc"],
    sources: [
      {
        label: "Bitcoin Core 31.1: data files",
        url: "https://github.com/bitcoin/bitcoin/blob/v31.1/doc/files.md",
      },
      {
        label: "Bitcoin Core 31.1: wallet creation, backup and restoration",
        url: "https://github.com/bitcoin/bitcoin/blob/v31.1/doc/managing-wallets.md",
      },
      {
        label: "Bitcoin Core 31.1: offline signing tutorial",
        url: "https://github.com/bitcoin/bitcoin/blob/v31.1/doc/offline-signing-tutorial.md",
      },
    ],
    reviewNote:
      "Core 31.1 source and RPC help reviewed; executable examples checked on isolated macOS Regtest. This verifies software behavior, not physical air gaps or organizational independence.",
    origin: "First-principles curriculum v4",
    guidedSteps: [
      {
        id: "inspect-v4",
        title: "Compare the two kinds of state",
        instructions: [
          "Run these read-only commands against the lab. Explain why the offline block count is zero while its restored signing wallet still exists.",
        ],
        expectedResult:
          "You can identify the recoverable wallet state separately from the node’s rebuildable chain data.",
        command:
          "online getblockchaininfo\noffline getblockcount\noffline -rpcwallet=replacement-signer getwalletinfo",
        commandContext: "System terminal · lab helpers",
        help: "Stop at this step if the result differs. Recheck the selected network, wallet and files, then review the linked official documentation. Do not mark the result as confirmed until you can explain the difference.",
      },
    ],
    chapter: "Learn the Core primitives",
    optional: true,
    sourceReviewed: "2026-09-13",
    practicalReview: {
      date: "2026-09-13",
      scope:
        "Automated Core 31.1 Regtest integration: encrypted recovery, offline PSBT, all 2-of-3 pairs, Taproot key path and delayed Miniscript recovery. Physical distribution is outside this test.",
    },
    takeaway:
      "Node state, wallet state and blockchain history answer different questions. Inspect the right one before diagnosing a problem.",
  },
  {
    id: "lab-descriptors",
    slug: "descriptor-experiments",
    title: "Read and verify a descriptor",
    summary: "Turn a policy description into reproducible addresses.",
    objective: "Turn a policy description into reproducible addresses.",
    what: "Turn a policy description into reproducible addresses.",
    why: "Keys alone do not describe every possible spending arrangement.",
    risk: "The wrong threshold, key order or derivation path can produce different addresses.",
    status: "published",
    verification: "source-reviewed",
    referenceVersion: "Bitcoin Core 31.1",
    contentUpdated: "2026-09-13",
    estimatedTime: "20–40 min active",
    kind: "practice",
    explanation: [
      "A descriptor tells Core how to construct an output. wsh wraps a witness script; sortedmulti(2, …) requires two signatures and sorts the public keys into a deterministic order. Each supplied extended public key plus path identifies a particular child key.",
      "getdescriptorinfo parses the expression and returns a normalized public descriptor with a checksum. That checksum catches many copying mistakes. It does not prove that the policy matches your intentions or that the private keys are recoverable.",
      "The laboratory uses fixed example paths. A real receiving wallet needs a carefully documented ranged receive descriptor and a change descriptor, with address indexes and backups maintained. A single derived test address is not a finished production wallet.",
    ],
    prerequisites: ["single-sig-mastery", "2.2"],
    sources: [
      {
        label: "Bitcoin Core 31.1: descriptors and Miniscript",
        url: "https://github.com/bitcoin/bitcoin/blob/v31.1/doc/descriptors.md",
      },
    ],
    reviewNote:
      "Core 31.1 source and RPC help reviewed; executable examples checked on isolated macOS Regtest. This verifies software behavior, not physical air gaps or organizational independence.",
    origin: "First-principles curriculum v4",
    guidedSteps: [
      {
        id: "parse-v4",
        title: "Inspect the 2-of-3 expression",
        instructions: [
          "PUB_A, PUB_B and PUB_C are public test keys loaded from your generated session.sh. The command stores only public descriptor information in POLICY_INFO.",
          "Read the threshold and all three keys. Confirm isrange is false for this fixed-address example and hasprivatekeys is false.",
        ],
        expectedResult:
          "Core returns a public descriptor ending in a checksum.",
        command:
          'POLICY_INFO=$(online getdescriptorinfo "wsh(sortedmulti(2,$PUB_A,$PUB_B,$PUB_C))")\nprintf \'%s\\n\' "$POLICY_INFO"',
        commandContext: "System terminal · public lab keys only",
        help: "Stop at this step if the result differs. Recheck the selected network, wallet and files, then review the linked official documentation. Do not mark the result as confirmed until you can explain the difference.",
      },
      {
        id: "derive-v4",
        title: "Derive the address from that exact policy",
        instructions: [
          "Extract the returned public descriptor and derive its address. Compare it with the laboratory coordinator’s listdescriptors output. Never shorten the descriptor in a recovery record.",
        ],
        expectedResult:
          "deriveaddresses returns the same Regtest policy address used by the lab.",
        command:
          'POLICY_DESC=$(printf \'%s\' "$POLICY_INFO" | python3 -c \'import json,sys; print(json.load(sys.stdin)["descriptor"])\')\nonline deriveaddresses "$POLICY_DESC"\nonline -rpcwallet=multisig-watch listdescriptors',
        commandContext: "System terminal · public descriptor inspection",
        help: "Stop at this step if the result differs. Recheck the selected network, wallet and files, then review the linked official documentation. Do not mark the result as confirmed until you can explain the difference.",
      },
    ],
    chapter: "Learn the Core primitives",
    optional: true,
    sourceReviewed: "2026-09-13",
    practicalReview: {
      date: "2026-09-13",
      scope:
        "Automated Core 31.1 Regtest integration: encrypted recovery, offline PSBT, all 2-of-3 pairs, Taproot key path and delayed Miniscript recovery. Physical distribution is outside this test.",
    },
    takeaway:
      "A descriptor records how keys and spending rules produce addresses. Its checksum detects transcription errors, not a safe policy design.",
  },
  {
    id: "lab-psbt",
    slug: "psbt-debugging",
    title: "Inspect the PSBT before adding signatures",
    summary: "Identify the proposed spend and the next required role.",
    objective: "Identify the proposed spend and the next required role.",
    what: "Identify the proposed spend and the next required role.",
    why: "A PSBT is a portable transaction package, not permission to sign whatever it contains.",
    risk: "Blind signing can authorize a different recipient, fee or spending branch from the one you intended.",
    status: "published",
    verification: "source-reviewed",
    referenceVersion: "Bitcoin Core 31.1",
    contentUpdated: "2026-09-13",
    estimatedTime: "20–40 min active",
    kind: "practice",
    explanation: [
      "decodepsbt exposes the transaction and attached information. analyzepsbt reports what is missing and which role should act next: for example, a signer or finalizer. Signing and finalization are different operations. Signing supplies authorization; finalization assembles the completed input witnesses.",
      "The fresh UNSIGNED_PSBT variable comes from the running laboratory. It is an unfunded-by-real-money Regtest transaction spending a 2-of-3 output. Inspect it before the next exercise.",
    ],
    prerequisites: ["single-sig-mastery", "lab-descriptors"],
    sources: [
      {
        label: "Bitcoin Core 31.1: PSBT workflow",
        url: "https://github.com/bitcoin/bitcoin/blob/v31.1/doc/psbt.md",
      },
    ],
    reviewNote:
      "Core 31.1 source and RPC help reviewed; executable examples checked on isolated macOS Regtest. This verifies software behavior, not physical air gaps or organizational independence.",
    origin: "First-principles curriculum v4",
    guidedSteps: [
      {
        id: "decode-v4",
        title: "Inspect and explain the proposed transaction",
        instructions: [
          "Read the transaction outputs, fee where provided and input metadata. Identify the recipient and change using your own lab records. analyzepsbt should still require signing.",
        ],
        expectedResult:
          "You can explain what this PSBT would spend and why it is not yet ready to broadcast.",
        command:
          'online decodepsbt "$UNSIGNED_PSBT"\nonline analyzepsbt "$UNSIGNED_PSBT"',
        commandContext: "System terminal · test PSBT from session.sh",
        help: "Stop at this step if the result differs. Recheck the selected network, wallet and files, then review the linked official documentation. Do not mark the result as confirmed until you can explain the difference.",
      },
    ],
    chapter: "Learn the Core primitives",
    optional: true,
    sourceReviewed: "2026-09-13",
    practicalReview: {
      date: "2026-09-13",
      scope:
        "Automated Core 31.1 Regtest integration: encrypted recovery, offline PSBT, all 2-of-3 pairs, Taproot key path and delayed Miniscript recovery. Physical distribution is outside this test.",
    },
    takeaway:
      "A PSBT records a transaction’s preparation and signing state. Inspect what is present and what the next participant still needs to supply.",
  },
  {
    id: "multisig-signet",
    slug: "2-of-3-on-signet",
    title: "Build and spend a 2-of-3 policy",
    summary:
      "Demonstrate that one signer is insufficient and each valid pair can authorize.",
    objective:
      "Demonstrate that one signer is insufficient and each valid pair can authorize.",
    what: "Demonstrate that one signer is insufficient and each valid pair can authorize.",
    why: "The quorum should be verified by a transaction that really passes Core’s checks.",
    risk: "An address label saying “multisig” does not establish the policy or independent key control.",
    status: "published",
    verification: "source-reviewed",
    referenceVersion: "Bitcoin Core 31.1",
    contentUpdated: "2026-09-13",
    estimatedTime: "20–40 min active",
    kind: "practice",
    explanation: [
      "Use Regtest for the first run so you can generate confirmations immediately. The old lesson URL is retained. The same descriptor and PSBT principles apply to Signet, where public test coins and confirmations must be obtained separately.",
      "The laboratory has three independent generated roots and a watch-only coordinator. It imports the full policy into each signer with only that signer’s private contribution. All processes run on this host: a real distributed-authority setup must separate the people and devices as its threat model requires.",
      "These commands use publicly documented disposable test passwords. They must never be adapted by placing a real wallet passphrase in shell history. In ordinary custody, use the GUI unlock prompt; this is an inspectable software laboratory.",
    ],
    prerequisites: ["single-sig-mastery", "lab-psbt"],
    sources: [
      {
        label: "Bitcoin Core 31.1: descriptors and Miniscript",
        url: "https://github.com/bitcoin/bitcoin/blob/v31.1/doc/descriptors.md",
      },
      {
        label: "Bitcoin Core 31.1: PSBT workflow",
        url: "https://github.com/bitcoin/bitcoin/blob/v31.1/doc/psbt.md",
      },
      {
        label: "Runnable lab and all three pair checks",
        url: "/curriculum-labs/core-31.1-regtest.py",
      },
    ],
    reviewNote:
      "Core 31.1 source and RPC help reviewed; executable examples checked on isolated macOS Regtest. This verifies software behavior, not physical air gaps or organizational independence.",
    origin: "First-principles curriculum v4",
    guidedSteps: [
      {
        id: "one-signature-v4",
        title: "Add one signature and check the missing quorum",
        instructions: [
          "Unlock the first test signer for a short time, process the PSBT with finalize=false, then lock it. Extract the returned PSBT. finalizepsbt with extract=false should report complete false.",
        ],
        expectedResult: "One signer cannot complete the 2-of-3 payment.",
        command:
          'offline -rpcwallet=multisig-signer-0 walletpassphrase PUBLIC-REGTEST-OLD-DO-NOT-USE 60\nFIRST=$(offline -rpcwallet=multisig-signer-0 walletprocesspsbt "$UNSIGNED_PSBT" true ALL true false)\noffline -rpcwallet=multisig-signer-0 walletlock\nPARTIAL=$(printf \'%s\' "$FIRST" | python3 -c \'import json,sys; print(json.load(sys.stdin)["psbt"])\')\nonline finalizepsbt "$PARTIAL" false',
        commandContext: "System terminal · disposable Regtest signer 0",
        help: "Stop at this step if the result differs. Recheck the selected network, wallet and files, then review the linked official documentation. Do not mark the result as confirmed until you can explain the difference.",
      },
      {
        id: "two-signatures-v4",
        title: "Add the second independent signature",
        instructions: [
          "Give the partly signed package to the second test signer. Review it, unlock briefly, sign and lock. Core should now be able to assemble a complete transaction.",
        ],
        expectedResult:
          "finalizepsbt returns complete true and a hex transaction.",
        command:
          'offline -rpcwallet=multisig-signer-1 walletpassphrase PUBLIC-REGTEST-OLD-DO-NOT-USE 60\nSECOND=$(offline -rpcwallet=multisig-signer-1 walletprocesspsbt "$PARTIAL" true ALL true false)\noffline -rpcwallet=multisig-signer-1 walletlock\nSIGNED=$(printf \'%s\' "$SECOND" | python3 -c \'import json,sys; print(json.load(sys.stdin)["psbt"])\')\nFINAL=$(online finalizepsbt "$SIGNED")\nprintf \'%s\\n\' "$FINAL"',
        commandContext: "System terminal · disposable Regtest signer 1",
        help: "Stop at this step if the result differs. Recheck the selected network, wallet and files, then review the linked official documentation. Do not mark the result as confirmed until you can explain the difference.",
      },
      {
        id: "verify-broadcast-v4",
        title: "Check acceptance and broadcast on Regtest",
        instructions: [
          "Extract the completed hex only after complete is true. testmempoolaccept checks whether this node would currently accept the transaction; it does not broadcast it. Verify allowed true.",
          "Then broadcast the test transaction and create a block. The scripted checks also exercise the other two pairs; rerun the lab for fresh outputs if you want to repeat each pair manually.",
        ],
        expectedResult:
          "The valid pair produces a confirmed Regtest spend; the one-signature case cannot.",
        command:
          'TX_HEX=$(printf \'%s\' "$FINAL" | python3 -c \'import json,sys; d=json.load(sys.stdin); assert d["complete"]; print(d["hex"])\')\nonline testmempoolaccept "[\\"$TX_HEX\\"]"\n# Continue only after allowed is true:\nonline sendrawtransaction "$TX_HEX"\nonline generatetoaddress 1 "$MINE_ADDRESS"',
        commandContext: "System terminal · generated local Regtest only",
        help: "Stop at this step if the result differs. Recheck the selected network, wallet and files, then review the linked official documentation. Do not mark the result as confirmed until you can explain the difference.",
      },
    ],
    chapter: "Build and recover policies",
    optional: true,
    sourceReviewed: "2026-09-13",
    practicalReview: {
      date: "2026-09-13",
      scope:
        "Automated Core 31.1 Regtest integration: encrypted recovery, offline PSBT, all 2-of-3 pairs, Taproot key path and delayed Miniscript recovery. Physical distribution is outside this test.",
    },
    takeaway:
      "In this tested 2-of-3 policy, one signature is insufficient and any of the three possible pairs can authorize spending.",
  },
  {
    id: "multisig-backup",
    slug: "keys-are-not-the-whole-multisig-recovery",
    title: "Back up the policy as well as the keys",
    summary:
      "Keep enough information to reconstruct the exact spending arrangement.",
    objective:
      "Keep enough information to reconstruct the exact spending arrangement.",
    what: "Keep enough information to reconstruct the exact spending arrangement.",
    why: "A surviving key is useful only with the correct script and the other required participants.",
    risk: "Three seeds without the full policy can leave recovery dependent on guesses about addresses and paths.",
    status: "published",
    verification: "source-reviewed",
    referenceVersion: "Bitcoin Core 31.1",
    contentUpdated: "2026-09-13",
    estimatedTime: "20–40 min active",
    kind: "practice",
    explanation: [
      "Keep the complete receive and change descriptors, threshold, key origins, derivation paths, network and wallet birth information. Public descriptors are sensitive financial information even though they do not directly authorize spending.",
      "Each signer needs a tested encrypted wallet backup containing its private contribution and the policy needed to use it. Protect each passphrase and preserve the coordinator’s public configuration. Test restoration of each permitted surviving pair.",
      "A key-export list is not automatically a complete wallet backup. The laboratory deliberately backs up and restores a policy wallet through Core’s backupwallet and restorewallet operations so that the descriptor and signing capability are tested together.",
    ],
    prerequisites: ["single-sig-mastery", "multisig-signet"],
    sources: [
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
      "Core 31.1 source and RPC help reviewed; executable examples checked on isolated macOS Regtest. This verifies software behavior, not physical air gaps or organizational independence.",
    origin: "First-principles curriculum v4",
    guidedSteps: [
      {
        id: "backup-policy-v4",
        title: "Inspect and back up a test signer",
        instructions: [
          "Inspect the signer’s public descriptors, then back up the encrypted policy wallet into the lab directory. Recover it under a new name and check its public descriptors. No private descriptor export is needed for this backup exercise.",
        ],
        expectedResult:
          "The restored policy wallet contains the same public policy and remains encrypted.",
        command:
          'offline -rpcwallet=multisig-signer-0 listdescriptors\noffline -rpcwallet=multisig-signer-0 backupwallet "$LAB_DIRECTORY/policy-backup.dat"\noffline restorewallet policy-restored "$LAB_DIRECTORY/policy-backup.dat"\noffline -rpcwallet=policy-restored getwalletinfo\noffline -rpcwallet=policy-restored listdescriptors',
        commandContext: "System terminal · disposable encrypted policy backup",
        help: "Stop at this step if the result differs. Recheck the selected network, wallet and files, then review the linked official documentation. Do not mark the result as confirmed until you can explain the difference.",
      },
    ],
    chapter: "Build and recover policies",
    optional: true,
    sourceReviewed: "2026-09-13",
    practicalReview: {
      date: "2026-09-13",
      scope:
        "Automated Core 31.1 Regtest integration: encrypted recovery, offline PSBT, all 2-of-3 pairs, Taproot key path and delayed Miniscript recovery. Physical distribution is outside this test.",
    },
    takeaway:
      "The signing keys and the complete policy are recovery requirements. A key alone may not describe how to find or spend the wallet’s outputs.",
  },
  {
    id: "multisig-failures",
    slug: "failure-simulations",
    title: "Test the missing-signer cases",
    summary: "Verify the failures your policy is supposed to tolerate.",
    objective: "Verify the failures your policy is supposed to tolerate.",
    what: "Verify the failures your policy is supposed to tolerate.",
    why: "The useful property is a working surviving quorum, not a reassuring diagram.",
    risk: "A lost signer can reveal that another signer is outdated, inaccessible or missing the policy.",
    status: "published",
    verification: "source-reviewed",
    referenceVersion: "Bitcoin Core 31.1",
    contentUpdated: "2026-09-13",
    estimatedTime: "20–40 min active",
    kind: "practice",
    explanation: [
      "Repeat the laboratory with fresh data and test A+B, A+C and B+C separately. The supplied script does this for actual Regtest spends and confirms that one signature cannot finalize the policy.",
      "Then restore one signer from its encrypted backup and repeat a spend with a surviving partner. In a real rehearsal, make the original device unavailable instead of quietly consulting it. Confirm what happens when a second signer is lost: a 2-of-3 policy cannot be spent with just one surviving key.",
      "If an unauthorized party may have a key, distinguish temporary recovery from restoring the intended separation of authority. A successful spend does not erase the leaked key from old outputs.",
    ],
    prerequisites: ["single-sig-mastery", "multisig-backup"],
    sources: [
      {
        label: "Bitcoin Core 31.1: descriptors and Miniscript",
        url: "https://github.com/bitcoin/bitcoin/blob/v31.1/doc/descriptors.md",
      },
      {
        label: "Bitcoin Core 31.1: PSBT workflow",
        url: "https://github.com/bitcoin/bitcoin/blob/v31.1/doc/psbt.md",
      },
    ],
    reviewNote:
      "Core 31.1 source and RPC help reviewed; executable examples checked on isolated macOS Regtest. This verifies software behavior, not physical air gaps or organizational independence.",
    origin: "First-principles curriculum v4",
    guidedSteps: [
      {
        id: "quorum-drill-v4",
        title: "Predict, run and explain each pair",
        instructions: [
          "Record the expected outcome for one signer, each two-signer pair and the restored-signer pair. Run the lab checks and inspect any discrepancy. Repeat the signing commands with a recovered signer on a fresh PSBT rather than using an already-spent transaction.",
        ],
        expectedResult:
          "Your written predictions match the observed threshold and recovery behavior.",
        help: "Stop at this step if the result differs. Recheck the selected network, wallet and files, then review the linked official documentation. Do not mark the result as confirmed until you can explain the difference.",
      },
    ],
    chapter: "Build and recover policies",
    optional: true,
    sourceReviewed: "2026-09-13",
    practicalReview: {
      date: "2026-09-13",
      scope:
        "Automated Core 31.1 Regtest integration: encrypted recovery, offline PSBT, all 2-of-3 pairs, Taproot key path and delayed Miniscript recovery. Physical distribution is outside this test.",
    },
    takeaway:
      "Test loss scenarios by proving which remaining participants can spend, rather than assuming a threshold label proves recovery.",
  },
  {
    id: "taproot-model",
    slug: "taproot-mental-model",
    title: "Taproot is an output format, not an automatic quorum",
    summary: "Understand key paths and script paths before writing a policy.",
    objective: "Understand key paths and script paths before writing a policy.",
    what: "Understand key paths and script paths before writing a policy.",
    why: "A Taproot output can permit more than one route to spending.",
    risk: "An overlooked key path can bypass a script policy that looks stricter.",
    status: "published",
    verification: "source-reviewed",
    referenceVersion: "Bitcoin Core 31.1",
    contentUpdated: "2026-09-13",
    estimatedTime: "8–12 min",
    kind: "reading",
    explanation: [
      "Taproot outputs can be spent through a key path, with a signature for the output key, or through a committed script path. A commitment fixes the permitted scripts without displaying all of them in advance.",
      "A plain tr(KEY) descriptor is a key-path single-sig example. Putting a 2-of-3 script inside tr does not itself disable the key path. If someone knows the relevant internal private key, that alternate authority must be accounted for.",
      "Core 31.1 supports tr, multi_a and sortedmulti_a in Taproot script trees, and supported Miniscript expressions inside wsh and tr. “Supported” does not mean every imaginable policy is accepted. Core checks expression and safety constraints; the test must also prove that the policy matches your intention.",
    ],
    prerequisites: ["single-sig-mastery", "multisig-failures"],
    sources: [
      {
        label: "Bitcoin Core 31.1: descriptors and Miniscript",
        url: "https://github.com/bitcoin/bitcoin/blob/v31.1/doc/descriptors.md",
      },
      {
        label: "BIP 341: Taproot rules and internal key considerations",
        url: "https://github.com/bitcoin/bips/blob/master/bip-0341.mediawiki",
      },
    ],
    reviewNote:
      "Content and cited sources reviewed on 2026-09-13. Any hands-on evidence is listed separately. Source review is not a claim that every platform or physical procedure was tested.",
    origin: "First-principles curriculum v4",
    chapter: "Build and recover policies",
    optional: true,
    sourceReviewed: "2026-09-13",
    takeaway:
      "Taproot can authorize through a key path or specified script paths. A Taproot address by itself does not mean multisig.",
  },
  {
    id: "taproot-descriptors",
    slug: "taproot-descriptors-and-recovery-artifacts",
    title: "Inspect a Taproot descriptor and its actual spending authority",
    summary: "Connect the notation to a tested key-path payment.",
    objective: "Connect the notation to a tested key-path payment.",
    what: "Connect the notation to a tested key-path payment.",
    why: "The name of an output type does not tell you who can spend.",
    risk: "Treating Taproot as synonymous with multisig can hide a single-key path.",
    status: "published",
    verification: "source-reviewed",
    referenceVersion: "Bitcoin Core 31.1",
    contentUpdated: "2026-09-13",
    estimatedTime: "20–40 min active",
    kind: "practice",
    explanation: [
      "The laboratory creates tr(PUB_A), imports it into a coordinator and signer, funds it and spends it through a PSBT. This tests the ordinary Taproot key path on Core 31.1.",
      "The following read-only commands show the public policy and derive its address. The corresponding signer wallet contains the matching private contribution. Recovery needs that key and the descriptor configuration; changing a display label cannot change authority.",
    ],
    prerequisites: ["single-sig-mastery", "taproot-model"],
    sources: [
      {
        label: "Bitcoin Core 31.1: descriptors and Miniscript",
        url: "https://github.com/bitcoin/bitcoin/blob/v31.1/doc/descriptors.md",
      },
      {
        label: "Bitcoin Core 31.1: PSBT workflow",
        url: "https://github.com/bitcoin/bitcoin/blob/v31.1/doc/psbt.md",
      },
    ],
    reviewNote:
      "Core 31.1 source and RPC help reviewed; executable examples checked on isolated macOS Regtest. This verifies software behavior, not physical air gaps or organizational independence.",
    origin: "First-principles curriculum v4",
    guidedSteps: [
      {
        id: "taproot-inspect-v4",
        title: "Check the actual policy",
        instructions: [
          "Read getdescriptorinfo and the lab’s public descriptor. Compare its single key with the 2-of-3 policy from the earlier exercise. Review the Taproot spend assertion in the runnable lab.",
        ],
        expectedResult:
          "You can explain why this Taproot example is single-sig.",
        command:
          'online getdescriptorinfo "tr($PUB_A)"\nonline -rpcwallet=taproot-watch listdescriptors',
        commandContext: "System terminal · public Taproot lab descriptor",
        help: "Stop at this step if the result differs. Recheck the selected network, wallet and files, then review the linked official documentation. Do not mark the result as confirmed until you can explain the difference.",
      },
    ],
    chapter: "Build and recover policies",
    optional: true,
    sourceReviewed: "2026-09-13",
    practicalReview: {
      date: "2026-09-13",
      scope:
        "Automated Core 31.1 Regtest integration: encrypted recovery, offline PSBT, all 2-of-3 pairs, Taproot key path and delayed Miniscript recovery. Physical distribution is outside this test.",
    },
    takeaway:
      "Preserve every intended spending path and test the implementation you use. A successful key-path test does not validate an arbitrary script tree.",
  },
  {
    id: "timelocked-recovery",
    slug: "timelocked-recovery",
    title: "Add a delayed recovery path only when you mean it",
    summary: "Test a real Miniscript policy before and after its delay.",
    objective: "Test a real Miniscript policy before and after its delay.",
    what: "Test a real Miniscript policy before and after its delay.",
    why: "A recovery branch changes who may spend as time passes.",
    risk: "A mature recovery key can become enough to spend even while the normal quorum still exists.",
    status: "published",
    verification: "source-reviewed",
    referenceVersion: "Bitcoin Core 31.1",
    contentUpdated: "2026-09-13",
    estimatedTime: "20–40 min active",
    kind: "practice",
    explanation: [
      "The laboratory policy allows two of three signers immediately, or a separate child key controlled by signer C after the output has aged six blocks. This is a deliberate reduction of required authority over time. Six blocks is a short testing parameter, not a recommendation for inheritance.",
      "Miniscript is a structured way to compose script conditions so software can reason about how to satisfy them. In this example, multi expresses the normal threshold, or_d offers the alternate branch, pk requires the recovery signature, and older(6) imposes a relative block delay. The recovery child key differs from C’s normal child key because Core rejects this expression with duplicated public keys.",
      "The delay relates to each output’s confirmation, not a countdown from opening the wallet. Spending the recovery path needs a transaction version and input sequence that meet BIP 68/112 rules. The lab explicitly sets sequence to 6. Old untouched outputs eventually remain eligible for the recovery branch; “decay” is not a background program changing your keys.",
      "Core also includes a documented functional test for a policy that decays at specified absolute block heights. That is a different clock. Do not substitute calendar dates, absolute heights and relative delays for each other.",
    ],
    prerequisites: ["single-sig-mastery", "taproot-descriptors"],
    sources: [
      {
        label: "Bitcoin Core 31.1: descriptors and Miniscript",
        url: "https://github.com/bitcoin/bitcoin/blob/v31.1/doc/descriptors.md",
      },
      {
        label: "BIP 68: relative lock times",
        url: "https://github.com/bitcoin/bips/blob/master/bip-0068.mediawiki",
      },
      {
        label: "BIP 112: CHECKSEQUENCEVERIFY",
        url: "https://github.com/bitcoin/bips/blob/master/bip-0112.mediawiki",
      },
      {
        label: "Bitcoin Core 31.1: executable decaying multisig example",
        url: "https://github.com/bitcoin/bitcoin/blob/v31.1/test/functional/wallet_miniscript_decaying_multisig_descriptor_psbt.py",
      },
    ],
    reviewNote:
      "Core 31.1 source and RPC help reviewed; executable examples checked on isolated macOS Regtest. This verifies software behavior, not physical air gaps or organizational independence.",
    origin: "First-principles curriculum v4",
    guidedSteps: [
      {
        id: "policy-v4",
        title: "Read the precise recovery condition",
        instructions: [
          "Parse the public expression below. Confirm that the normal branch requires two of A/B/C and that the delayed branch uses the distinct RECOVERY_C child key. Compare the returned descriptor with the lab wallet.",
        ],
        expectedResult:
          "The expression is accepted by Core and you can explain each branch.",
        command:
          'online getdescriptorinfo "wsh(or_d(multi(2,$PUB_A,$PUB_B,$PUB_C),and_v(v:pk($RECOVERY_C),older(6))))"\nonline -rpcwallet=recovery-watch listdescriptors',
        commandContext: "System terminal · generated public recovery keys",
        help: "Stop at this step if the result differs. Recheck the selected network, wallet and files, then review the linked official documentation. Do not mark the result as confirmed until you can explain the difference.",
      },
      {
        id: "sign-delayed-v4",
        title: "Sign before the time condition is satisfied",
        instructions: [
          "Use the fresh RECOVERY_PSBT from session.sh. It already includes the required sequence value. Sign only with C’s restored policy wallet and finalize. The existence of a complete signature does not make the transaction immediately acceptable.",
        ],
        expectedResult:
          "A complete signed transaction exists, but time validity must still be checked.",
        command:
          'offline -rpcwallet=restored-policy-signer walletpassphrase PUBLIC-REGTEST-OLD-DO-NOT-USE 60\nRECOVERY_SIGNED=$(offline -rpcwallet=restored-policy-signer walletprocesspsbt "$RECOVERY_PSBT" true ALL true false)\noffline -rpcwallet=restored-policy-signer walletlock\nRECOVERY_PART=$(printf \'%s\' "$RECOVERY_SIGNED" | python3 -c \'import json,sys; print(json.load(sys.stdin)["psbt"])\')\nRECOVERY_FINAL=$(online finalizepsbt "$RECOVERY_PART")\nRECOVERY_HEX=$(printf \'%s\' "$RECOVERY_FINAL" | python3 -c \'import json,sys; d=json.load(sys.stdin); assert d["complete"]; print(d["hex"])\')\nonline testmempoolaccept "[\\"$RECOVERY_HEX\\"]"',
        commandContext: "System terminal · disposable recovery transaction",
        help: "Stop at this step if the result differs. Recheck the selected network, wallet and files, then review the linked official documentation. Do not mark the result as confirmed until you can explain the difference.",
      },
      {
        id: "mature-v4",
        title: "Compare rejection and acceptance",
        instructions: [
          "Before enough new blocks, expect allowed false with a non-final sequence-related rejection. If you already mined enough blocks in other exercises, rerun the lab and use its fresh recovery PSBT to observe the early rejection.",
          "Mine six more Regtest blocks, check again and only then broadcast if allowed is true. The scripted lab separately proves the ordinary quorum path can spend without waiting.",
        ],
        expectedResult:
          "The recovery transaction changes from rejected to accepted as the output reaches the required age.",
        command:
          'online generatetoaddress 6 "$MINE_ADDRESS"\nonline testmempoolaccept "[\\"$RECOVERY_HEX\\"]"\n# Continue only after allowed is true:\nonline sendrawtransaction "$RECOVERY_HEX"\nonline generatetoaddress 1 "$MINE_ADDRESS"',
        commandContext: "System terminal · local Regtest timing exercise",
        help: "Stop at this step if the result differs. Recheck the selected network, wallet and files, then review the linked official documentation. Do not mark the result as confirmed until you can explain the difference.",
      },
    ],
    chapter: "Build and recover policies",
    optional: true,
    sourceReviewed: "2026-09-13",
    practicalReview: {
      date: "2026-09-13",
      scope:
        "Automated Core 31.1 Regtest integration: encrypted recovery, offline PSBT, all 2-of-3 pairs, Taproot key path and delayed Miniscript recovery. Physical distribution is outside this test.",
    },
    takeaway:
      "The recovery branch relaxes this policy only after its relative block delay. A valid signature can exist before the transaction is eligible to spend.",
  },
  {
    id: "taproot-path-tests",
    slug: "test-every-recovery-path",
    title: "Test every permitted path and every intended rejection",
    summary: "Review the whole policy before calling it a recovery plan.",
    objective: "Review the whole policy before calling it a recovery plan.",
    what: "Review the whole policy before calling it a recovery plan.",
    why: "A policy is only as restrictive as its easiest available spending path.",
    risk: "A forgotten key path, matured delay or missing backup can defeat the intended authority.",
    status: "published",
    verification: "source-reviewed",
    referenceVersion: "Bitcoin Core 31.1",
    contentUpdated: "2026-09-13",
    estimatedTime: "20–40 min active",
    kind: "practice",
    explanation: [
      "For every branch, name the keys, data, time condition and transaction settings needed to spend. Include any Taproot key path. Record who can satisfy each condition now and who can satisfy it later.",
      "Test one signature when two are required, the wrong signer, an immature timelock and a missing policy record. Then test the valid paths, including a restored wallet and a replacement coordinator. Success in one branch tells you little about the others.",
      "The runnable lab verifies a wsh Miniscript delayed branch and an ordinary Taproot key path. It does not claim that an arbitrary custom Taproot script tree or production inheritance design has been tested. A new policy needs its own tests and recovery review.",
    ],
    prerequisites: ["single-sig-mastery", "timelocked-recovery"],
    sources: [
      {
        label: "Bitcoin Core 31.1: descriptors and Miniscript",
        url: "https://github.com/bitcoin/bitcoin/blob/v31.1/doc/descriptors.md",
      },
      {
        label: "BIP 68: relative lock times",
        url: "https://github.com/bitcoin/bips/blob/master/bip-0068.mediawiki",
      },
      {
        label: "Bitcoin Core 31.1: PSBT workflow",
        url: "https://github.com/bitcoin/bitcoin/blob/v31.1/doc/psbt.md",
      },
    ],
    reviewNote:
      "Core 31.1 source and RPC help reviewed; executable examples checked on isolated macOS Regtest. This verifies software behavior, not physical air gaps or organizational independence.",
    origin: "First-principles curriculum v4",
    guidedSteps: [
      {
        id: "matrix-v4",
        title: "Write and execute the policy matrix",
        instructions: [
          "For the policy you are studying, record expected success and failure for each branch. Compare the result before and after any time condition. Stop the lab with online stop and offline stop when you finish.",
        ],
        expectedResult:
          "You know which authority exists now, which will exist later and what evidence supports that conclusion.",
        command: "online stop\noffline stop",
        commandContext: "System terminal · finish the disposable lab",
        help: "Stop at this step if the result differs. Recheck the selected network, wallet and files, then review the linked official documentation. Do not mark the result as confirmed until you can explain the difference.",
      },
    ],
    chapter: "Build and recover policies",
    optional: true,
    sourceReviewed: "2026-09-13",
    practicalReview: {
      date: "2026-09-13",
      scope:
        "Automated Core 31.1 Regtest integration: encrypted recovery, offline PSBT, all 2-of-3 pairs, Taproot key path and delayed Miniscript recovery. Physical distribution is outside this test.",
    },
    takeaway:
      "Every intended recovery route needs its own positive and negative tests, including restoration of the artifacts that route depends on.",
  },
  {
    id: "advanced-mastery",
    slug: "advanced-mastery",
    title: "Before adopting a policy: justify and recover it",
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
    prerequisites: ["single-sig-mastery", "taproot-path-tests"],
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
      "I can name the authorization threat that requires more than single-sig.",
      "I can explain all spending paths, including any Taproot key path and delayed recovery branch.",
      "I have observed both valid spends and the expected rejected attempts.",
      "I can restore the required signer wallets and complete public policy from backups.",
      "I can explain the added device, software, human and maintenance costs.",
      "I know which software tests I performed and which physical or organizational assumptions remain untested.",
    ],
    chapter: "Build and recover policies",
    optional: true,
    sourceReviewed: "2026-09-13",
    takeaway:
      "You can explain the added authority rules, demonstrate their failure cases and recover the tested policy from its saved artifacts.",
  },
  {
    id: "core-explorer",
    slug: "core-explorer",
    title: "Optional: Core Explorer as an advanced interface",
    summary:
      "Understand what an additional GUI changes and what it still depends on.",
    objective:
      "Understand what an additional GUI changes and what it still depends on.",
    what: "Understand what an additional GUI changes and what it still depends on.",
    why: "Core’s ordinary GUI does not expose every descriptor or spending-policy workflow.",
    risk: "A convenience layer can still ask Core to perform a harmful action if you do not review it.",
    status: "published",
    verification: "source-reviewed",
    referenceVersion:
      "Core Explorer project README reviewed 2026-09-13; no release compatibility certification",
    contentUpdated: "2026-09-13",
    estimatedTime: "8–12 min",
    kind: "reading",
    explanation: [
      "Core Explorer is an experimental desktop interface to Bitcoin Core’s JSON-RPC. Its stated scope includes descriptor inspection, coin selection, PSBT review, multisig policy construction and offline signing. Bitcoin Core remains the backend for keys, signing and validation.",
      "The interface is optional. The base course and the advanced laboratory work without it. Learn the underlying Core primitives first so that a friendly screen does not conceal what is being requested.",
      "Core Explorer is the author’s experimental, unaudited interface. Its repository is currently private, and this course provides no public installation path. Its documented testing is mainly macOS and Regtest; it is not a recommendation for meaningful mainnet funds. An additional interface is still additional software to verify and maintain: using Core for cryptography does not make every request from that interface harmless.",
    ],
    prerequisites: ["single-sig-mastery", "advanced-mastery"],
    sources: [
      {
        label:
          "Core 31.1 · Public descriptor primitives used by optional interfaces",
        url: "https://github.com/bitcoin/bitcoin/blob/v31.1/doc/descriptors.md",
      },
      {
        label: "Core 31.1 · PSBT workflow",
        url: "https://github.com/bitcoin/bitcoin/blob/v31.1/doc/psbt.md",
      },
    ],
    reviewNote:
      "Author’s local project documentation reviewed. Repository visibility checked: private. No public release, hands-on validation or security audit is claimed.",
    origin: "First-principles curriculum v4",
    chapter: "Optional interfaces and further work",
    optional: true,
    sourceReviewed: "2026-09-13",
    takeaway:
      "An optional interface can make Core’s primitives easier to use, while adding its own software to verify and maintain.",
  },
  {
    id: "lab-community",
    slug: "community-questions-and-clarifications",
    title: "Ask a technical question without exposing a wallet",
    summary: "Describe a reproducible problem using public test data.",
    objective: "Describe a reproducible problem using public test data.",
    what: "Describe a reproducible problem using public test data.",
    why: "A good question can be answered without giving another person your spending secrets.",
    risk: "Support impersonation and accidental disclosure can turn troubleshooting into theft.",
    status: "published",
    verification: "source-reviewed",
    referenceVersion: "Bitcoin Core 31.1",
    contentUpdated: "2026-09-13",
    estimatedTime: "8–12 min",
    kind: "reading",
    explanation: [
      "State the Core version, operating system, network, exact operation, expected result and observed result. Reproduce on a disposable Regtest wallet and include only the minimum public example needed.",
      "Do not publish a real wallet file, private descriptor, passphrase, seed, authentication cookie or complete personal transaction history. A public descriptor can expose a wallet’s activity even though it cannot spend. Replace real data with a fresh test reproduction.",
      "Use the project’s established public issue or discussion channels. A private message from someone claiming to be support is not evidence of identity. No legitimate troubleshooting step requires you to give a stranger the secrets needed to spend.",
    ],
    prerequisites: ["single-sig-mastery", "core-explorer"],
    sources: [
      {
        label: "Bitcoin Core contribution and issue guidance",
        url: "https://github.com/bitcoin/bitcoin/blob/v31.1/CONTRIBUTING.md",
      },
    ],
    reviewNote:
      "Content and cited sources reviewed on 2026-09-13. Any hands-on evidence is listed separately. Source review is not a claim that every platform or physical procedure was tested.",
    origin: "First-principles curriculum v4",
    checklist: [
      "I can describe the problem with versioned steps and disposable test data.",
    ],
    chapter: "Optional interfaces and further work",
    optional: true,
    sourceReviewed: "2026-09-13",
    takeaway:
      "A useful technical question includes public test conditions and observed results while keeping private wallet material out of the conversation.",
  },
]
