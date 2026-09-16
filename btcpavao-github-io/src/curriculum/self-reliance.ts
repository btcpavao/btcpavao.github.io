import type { PlayerLesson } from "../bitcoin-core-curriculum-player-en-data"

const debian = {
  label: "Debian · choosing a maintained system",
  url: "https://www.debian.org/intro/why_debian",
}
const apt = {
  label: "Debian Stable · APT manual",
  url: "https://manpages.debian.org/trixie/apt/apt.8.en.html",
}
const xfce = {
  label: "Xfce · inspect settings with xfconf-query",
  url: "https://docs.xfce.org/xfce/xfconf/xfconf-query",
}
const core = {
  label: "Core 31.1 · wallet management",
  url: "https://github.com/bitcoin/bitcoin/blob/v31.1/doc/managing-wallets.md",
}

function lesson(
  input: Pick<
    PlayerLesson,
    | "id"
    | "title"
    | "summary"
    | "why"
    | "risk"
    | "explanation"
    | "takeaway"
    | "prerequisites"
  > &
    Partial<PlayerLesson>
): PlayerLesson {
  return {
    slug: input.id,
    objective: input.summary,
    what: input.summary,
    status: "published",
    verification: "source-reviewed",
    kind: "reading",
    estimatedTime: "4–6 min",
    optional: false,
    referenceVersion: "Debian 13 Stable / Bitcoin Core 31.1",
    contentUpdated: "2026-09-16",
    sourceReviewed: "2026-09-16",
    reviewNote:
      "Official documentation reviewed for this lesson. Learning exercises record the learner’s own results; no physical Debian installation or air-gap test is claimed.",
    chapter: "Learn to control your computer",
    sources: [debian],
    ...input,
  }
}

export const trustLesson = lesson({
  id: "trust-and-verification",
  title: "Make the remaining trust visible",
  summary: "Name an assumption, then name a check that can test it.",
  why: "You can reduce unnecessary trust without pretending that all trust disappears.",
  risk: "A reassuring label can conceal the people and software on which your setup depends.",
  prerequisites: ["0.2"],
  chapter: "Begin with the threat",
  sources: [core],
  explanation: [
    "Trust means depending on something you have not fully established yourself. Verification means performing a specific check and understanding its limits. Your threat model names the failures you want to withstand.",
    "Attack surface is the set of ways something can interact with or undermine your system: software, network services, files, devices and people. Operational complexity is the work needed to use, maintain and recover it correctly.",
    "Write one assumption from your threat model beside a check: “I depend on this backup being usable; I will restore and sign from it.” A familiar filename proves less. Ask what the check leaves untested too.",
  ],
  checklist: [
    "I can name one trust assumption, one check and the limit of that check.",
  ],
  takeaway: "Minimize unnecessary trust and make remaining trust visible.",
})

export const selfRelianceLessons: PlayerLesson[] = [
  lesson({
    id: "why-linux",
    title: "Linux is something you can learn",
    summary: "Learn enough to operate your own computer deliberately.",
    why: "Understanding the environment makes an unfamiliar wallet problem easier to investigate.",
    risk: "Believing that only programmers can use Linux keeps ordinary system decisions opaque.",
    prerequisites: ["core-development"],
    explanation: [
      "You do not need to become a Linux guru, programmer or system administrator. You need to find your files, install chosen software, read a result and know when to stop. Linux gives you room to learn those actions directly.",
      "If you can use a computer, search the web and ask good questions, modern AI tools can help you learn enough Linux to operate your Bitcoin system deliberately. They can explain an unfamiliar word or command while you work. AI is a tutor, not a root of trust.",
      "Choose one small thing you would like your computer to do differently. Keep that goal for the playground. We will practice on a spare machine before there are wallet secrets to protect.",
    ],
    takeaway:
      "You can learn a missing skill without first becoming an expert in the whole system.",
  }),
  lesson({
    id: "why-debian-stable",
    title: "Why Debian Stable",
    summary: "Choose a predictable foundation you can maintain.",
    why: "A dedicated Bitcoin computer benefits from continuity more than frequent novelty.",
    risk: "Chasing new software adds changes that someone must understand and maintain.",
    prerequisites: ["why-linux"],
    sources: [
      debian,
      {
        label: "Debian · Stable release and support",
        url: "https://www.debian.org/releases/stable/",
      },
    ],
    explanation: [
      "Debian has a long project history, a broad community and a large package ecosystem. Stable follows a conservative release model with maintained updates. That gives us an established place to obtain tools and a predictable base to document.",
      "This course uses Debian Stable for the dedicated online Core computer and the persistent offline signer. We are optimizing for understandable, boring and durable. That is a reason for the default, not a claim that Debian removes software or hardware trust.",
      "Fedora, NixOS and Arch are legitimate Linux systems with different maintenance choices. Tails remains an optional tool for a specific threat model. Start with Debian here so you can learn one coherent procedure before comparing alternatives.",
    ],
    takeaway:
      "Choose the maintained system whose changes and recovery you can explain.",
  }),
  lesson({
    id: "linux-playground",
    title: "Install Linux and make it yours",
    summary: "Use a spare computer to practice without wallet secrets.",
    why: "The first installation teaches you that you can do it.",
    risk: "Installing an operating system overwrites the selected destination; experimentation belongs away from savings.",
    prerequisites: ["why-debian-stable"],
    kind: "practice",
    estimatedTime: "45–90 min active + installation",
    sources: [
      debian,
      apt,
      {
        label: "Debian · installation guide",
        url: "https://www.debian.org/releases/stable/amd64/",
      },
      {
        label: "Debian · authenticate installation images",
        url: "https://www.debian.org/CD/verify",
      },
      {
        label: "Debian · installer accounts and sudo",
        url: "https://www.debian.org/releases/stable/amd64/ch06s03.en.html",
      },
      {
        label: "Xfce · lightweight desktop environment",
        url: "https://www.xfce.org/",
      },
    ],
    explanation: [
      "The goal is agency over your computer. A spare supported PC or older ThinkPad is enough to begin; check its actual hardware support. XFCE is a lightweight desktop option, especially useful on older equipment. A beautiful desktop is optional. Understanding a change is the exercise.",
    ],
    guidedSteps: [
      {
        id: "install",
        title: "Install Debian on the spare computer",
        instructions: [
          "Keep wallet files and real secrets off this machine. Back up unrelated files you need, check that those copies open elsewhere, and disconnect other storage before selecting an installation disk.",
          "Use the official Debian Stable installation and image-verification guides linked below. Authenticate the image, identify the destination by model and capacity, and install a desktop with standard utilities. XFCE is a useful first choice. For the sudo examples, the Debian installer grants the first user sudo access when the root password is left blank.",
          "Restart from the installed disk and test your keyboard and login. The detailed clean installation in Part II will revisit this process; this first installation is for learning.",
        ],
        expectedResult:
          "I installed Debian on the intended spare computer and can log in.",
        warning:
          "The installer erases the selected destination. Stop if the disk identity or your independent backup is uncertain.",
        help: "Use the hardware and installation sections of the official guide. Do not solve a boot problem by selecting an unknown disk or disabling checks at random.",
      },
      {
        id: "terminal",
        title: "Locate yourself in the terminal",
        instructions: [
          "Open Terminal. Run each line and compare the output with the file manager. pwd prints the current folder; ls lists its contents; cat displays this system’s release identification file. Nothing here changes a file.",
        ],
        command: "pwd\nls\ncat /etc/os-release",
        commandContext: "Debian system terminal · playground",
        expectedResult: "I can identify my current folder and Debian release.",
        help: "Paths and filenames are case-sensitive. Read an error before trying another command; it often identifies the missing path.",
      },
      {
        id: "packages",
        title: "Update and install one small application",
        instructions: [
          "Run the first two lines separately, reading the result and proposed changes. apt update refreshes package information; apt upgrade proposes installed-package updates. sudo grants administrator permission to that command.",
          "Inspect apt show htop before choosing apt install htop. This process viewer is a playground example, not a required custody tool. Read the package source and proposed dependencies. Run htop without sudo; press q to leave it.",
        ],
        command:
          "sudo apt update\nsudo apt upgrade\napt show htop\nsudo apt install htop\nhtop",
        commandContext: "Debian system terminal · online playground only",
        expectedResult:
          "I installed a package through Debian’s repositories and can explain what changed.",
        help: "Stop on authentication errors. If sudo is unavailable, consult Debian’s root-account setup; do not install a random fix script.",
      },
    ],
    takeaway:
      "I installed Linux myself, used the terminal and checked the result.",
  }),
  lesson({
    id: "ai-as-a-tutor",
    title: "AI is a tutor, not a root of trust",
    summary: "Use explanations to improve your judgment, not replace it.",
    why: "Immediate explanations can shorten the path from confusion to a testable next step.",
    risk: "Confidently wrong advice can expose secrets or change the wrong system.",
    prerequisites: ["linux-playground"],
    sources: [apt, core],
    explanation: [
      "Instead of piecing together old forum posts, ask: “What does this command do?” “Explain every flag before I run it.” “This command returned this output. What does it mean?” Include your system version and desired outcome, using a harmless example.",
      "Treat each suggestion as a hypothesis. Inspect the proposed command, ask which files and permissions it affects, and compare it with official documentation. Before an unfamiliar privileged command, understand the changes and how to undo them. Prefer distribution repositories to random scripts.",
      "Inspect the actual result. If it fails, use that failure as information: stop, read it and test the explanation. Blindly stacking more commands makes the system harder to understand. Do not replace blind trust in a hardware appliance with blind trust in an AI assistant.",
    ],
    warnings: [
      "Never paste seed words, private keys, xprv or wallet passphrases into AI. Never upload wallet.dat or secret backup material. Never reconnect an offline signer to use AI; ask from a separate computer using a disposable example.",
    ],
    notes: [
      "Logs, screenshots, public descriptors and transaction history can reveal private financial information too. Share the smallest sanitized example that demonstrates the problem. AI explanations are learning aids, not independent evidence that a command is safe.",
    ],
    checklist: [
      "I can ask for help without sharing wallet secrets and will check an unfamiliar command before running it.",
    ],
    takeaway:
      "The useful outcome is understanding why a suggestion should work and checking whether it did.",
  }),
  lesson({
    id: "linux-make-it-yours",
    title: "Make one change you understand",
    summary: "Describe a result, inspect a proposed change and test it.",
    why: "An explicit terminal action is transferable to Core RPC, logs and system configuration.",
    risk: "A command for a different desktop or login manager may change the wrong setting.",
    prerequisites: ["ai-as-a-tutor"],
    kind: "practice",
    estimatedTime: "20–40 min active",
    sources: [
      xfce,
      {
        label: "Xfce · keyboard preferences",
        url: "https://docs.xfce.org/xfce/xfce4-settings/keyboard",
      },
    ],
    explanation: [
      "The terminal is useful because it makes an action explicit and repeatable. You can still use a GUI when it explains the task better. Work only on your playground; you are learning how to investigate, not collecting commands to memorize.",
    ],
    guidedSteps: [
      {
        id: "desktop",
        title: "Change and reverse a desktop preference",
        instructions: [
          "In XFCE Settings → Appearance, try an installed theme or icon set. In Panel preferences, change the panel layout. Record the original setting and reverse one change. Use the installed options; downloading a theme script is unnecessary.",
          "If you chose another desktop, use its own documented preferences. Installing another desktop is optional playground work, not preparation required for Bitcoin.",
        ],
        expectedResult:
          "I can change a visible preference and return to the previous state.",
        help: "Do one change at a time. Built-in settings avoid introducing another software source just to experiment.",
      },
      {
        id: "inspect",
        title: "Inspect the setting behind the interface",
        instructions: [
          "On XFCE, list the panel channel’s properties with the command below. -c selects a settings channel; -l lists properties; -v also prints their values. This query does not change them.",
          "Open the file manager’s hidden-files view and inspect an existing configuration file under .config/xfce4/xfconf/xfce-perchannel-xml in your home folder as plain text. Do not edit it while the settings service is running. Compare an actual entry with the displayed preferences.",
        ],
        command: "xfconf-query -c xfce4-panel -l -v",
        commandContext: "XFCE session · playground terminal · read-only",
        expectedResult:
          "I can connect a visible preference with a named setting and saved configuration.",
        help: "If the channel or folder is absent, inspect your actual desktop and its documentation. Do not create a guessed setting or force this XFCE command onto another desktop.",
      },
      {
        id: "numlock",
        title: "Investigate “I want Num Lock enabled at login”",
        instructions: [
          "Describe whether you mean the login screen or your desktop after login; different components can control them. Tell AI your Debian version, desktop and session type. Ask it which component owns the setting before asking for a command.",
          "Inspect any proposed command and ask what every flag changes, why it needs its permissions and how to restore the previous value. Compare with the official desktop documentation. Apply only a change you understand on this playground.",
          "Save your work, sign out and sign back in to test the session. Inspect the actual result. If it differs, record the symptom and investigate that instead of stacking fixes. A keyboard preference is another valid goal if your keyboard has no Num Lock.",
        ],
        expectedResult:
          "I made and tested a small change, or identified exactly why the proposed solution did not apply.",
        help: "Login-screen behavior, desktop-session behavior and firmware defaults are different. Avoid restarting the display-manager service: it can end the whole session. Signing out is sufficient for this exercise.",
      },
      {
        id: "explain",
        title: "Explain it without the chat",
        instructions: [
          "Write the desired outcome, setting changed, command meaning, observed result and reversal. Repeat the successful change from your own notes.",
        ],
        expectedResult:
          "“I did not know how to do this ten minutes ago. Now I know how to investigate it.”",
        help: "If a step still feels magical, ask for a narrower explanation before trying another modification.",
      },
    ],
    takeaway: "You can learn a new operation, explain it, test it and undo it.",
  }),
  lesson({
    id: "software-responsibility",
    title: "Freedom creates responsibility",
    summary: "Every installation creates another trust relationship.",
    why: "The freedom to install almost anything makes selection part of security.",
    risk: "Unnecessary code and privileges give more things a chance to go wrong.",
    prerequisites: ["linux-make-it-yours"],
    sources: [
      apt,
      {
        label: "Debian · package authentication and trust",
        url: "https://www.debian.org/doc/manuals/debian-reference/ch02.en.html",
      },
    ],
    explanation: [
      "You just changed your computer yourself. You can install almost anything too. That means you are responsible for deciding what belongs there. Each addition brings code, maintainers, dependencies and possibly new attack surface.",
      "A Debian repository package, a GitHub repository, an arbitrary shell script and curl … | sh have different trust paths. A signed repository authenticates a distribution source; it does not prove every package harmless. A published repository makes inspection possible; its hosting site does not certify the code. Piping a download directly to a shell executes what arrives before you inspect it.",
      "Take the application you installed. Find its source and maintainer, explain its permissions and decide whether you still need it. Third-party software is not automatically malware. The habit is to justify the relationship you are adding.",
    ],
    notes: [
      "Before installing: Where did it come from? Who maintains it? Why do I need it? Is it in Debian’s repository? Can it be inspected or its build reproduced? What permissions does it need? Can less software do the job? Does this particular machine need it at all?",
    ],
    checklist: [
      "I can explain why a playground application may have no place on my future signer.",
    ],
    takeaway:
      "Being able to install something is only the beginning of deciding whether to trust it.",
  }),
  lesson({
    id: "start-clean",
    title: "Start clean",
    summary: "The playground is not the vault.",
    why: "A deliberate installation gives you a setup you can account for.",
    risk: "Installing Core over an experimental system carries its unknown changes into custody.",
    prerequisites: ["software-responsibility"],
    chapter: "Start clean and verify",
    kind: "checkpoint",
    explanation: [
      "Do not simply install Bitcoin Core on the experimental environment and call it your vault. Keep only the notes and unrelated files you actually need. Verify an independent copy before erasing the intended disk; do not carry over the playground’s system image, scripts or configuration wholesale.",
      "Part II starts by reinstalling authenticated Debian Stable, choosing a minimal configuration and justifying every package. Then you verify Core before running it. If later sandbox work adds experiments, repeat that clean preparation before production. Reinstallation does not repair compromised hardware or firmware.",
      "The first installation taught you that you can do it. The second installation teaches you that you do not need to do everything you can do.",
    ],
    checklist: [
      "I have identified the few files to preserve and checked an independent copy.",
      "I will reinstall the intended computer using the existing Debian setup lesson before installing Core; I will not reuse the playground environment.",
    ],
    takeaway:
      "Carry the understanding into the new setup. Rebuild the environment deliberately.",
  }),
  lesson({
    id: "what-verification-proves",
    title: "What exactly am I verifying?",
    summary: "Connect each check to the question it can actually answer.",
    why: "Verification becomes useful when you can interpret the result.",
    risk: "A checksum obtained with a substituted download can match an attacker’s file.",
    prerequisites: ["start-clean"],
    chapter: "Start clean and verify",
    sources: [
      {
        label: "Bitcoin Core · official download and verification procedure",
        url: "https://bitcoincore.org/en/download/",
      },
    ],
    explanation: [
      "Begin at the official Bitcoin Core download page. A SHA256 checksum tests whether your archive matches a particular digest. A signed checksum file connects that digest to signing keys. Comparing full signer fingerprints with independently authenticated information gives those keys an identity.",
      "A matching hash and valid signatures establish specific relationships between bytes and keys. They do not prove bug-free code, honest maintainers or a clean computer. Multiple identified builders and reproducible builds provide further evidence about how the bytes were produced.",
      "Part II already contains the complete download procedure. When you reach it, predict what each result means before running the next command. Explain which result would make you stop. That is the practical content of “Don’t trust, verify.”",
    ],
    takeaway:
      "You should be able to name both the evidence a check provides and the trust it leaves behind.",
  }),
]

export const basicRpcLesson = lesson({
  id: "basic-rpc",
  title: "See what the GUI is asking Core to do",
  summary: "Inspect your practice wallet with a few explicit requests.",
  why: "The GUI should simplify known operations, not hide unknown magic.",
  risk: "A command in the wrong wallet or network acts on the wrong context.",
  chapter: "Operate one Core wallet",
  prerequisites: ["wallet-lock-change"],
  kind: "practice",
  estimatedTime: "10–15 min active",
  sources: [
    core,
    {
      label: "Core 31.1 · RPC implementation",
      url: "https://github.com/bitcoin/bitcoin/tree/v31.1/src/rpc",
    },
    {
      label: "Core 31.1 · wallet RPC implementation",
      url: "https://github.com/bitcoin/bitcoin/tree/v31.1/src/wallet/rpc",
    },
  ],
  explanation: [
    "RPC is a named request to Core. The console inside Core accepts RPC names; bitcoin-cli sends requests from the system terminal. A GUI action uses the same underlying wallet capabilities, though not every click literally sends an RPC request. You only need enough understanding to see what the action does.",
  ],
  practicalReview: {
    date: "2026-09-16",
    scope:
      "Core 31.1 local Regtest: installed RPC help, getblockchaininfo, getwalletinfo, getnewaddress and getaddressinfo. GUI steps are source-reviewed; no physical Debian GUI or funded Signet test claimed.",
  },
  guidedSteps: [
    {
      id: "context",
      title: "Check the practice network",
      instructions: [
        "In Core open Window → Console. Run this read-only request and compare chain with the GUI Network field. Do not continue if chain is main: this exercise belongs on Signet.",
      ],
      command: "getblockchaininfo",
      commandContext: "Core GUI console · Signet practice node",
      expectedResult: "chain is signet; I can identify the node’s network.",
      help: "The system terminal does not understand a bare Core RPC name. In the GUI console do not paste shell variables, sudo or bitcoin-cli.",
    },
    {
      id: "wallet",
      title: "Inspect the selected wallet",
      instructions: [
        "Select your encrypted Signet practice wallet explicitly in the console’s wallet selector. Run getwalletinfo. Compare walletname with the intended wallet; private_keys_enabled describes whether this wallet has signing keys.",
      ],
      command: "getwalletinfo",
      commandContext: "Core GUI console · selected Signet practice wallet",
      expectedResult:
        "walletname matches my practice wallet; I can distinguish node information from wallet information.",
      help: "A wallet-not-selected error asks you to choose the wallet, not export keys or enter a passphrase. Check the selector before retrying.",
    },
    {
      id: "operations",
      title: "Read help for a familiar operation",
      instructions: [
        "Read help for createwallet without executing it. Connect the name and private-key options to the choices you made in File → Create Wallet. Help is read-only; this does not create another wallet.",
      ],
      command: "help createwallet",
      commandContext: "Core GUI console · read-only help",
      expectedResult:
        "I can relate a GUI choice to an explicit wallet operation.",
      help: "Read the installed version’s help. GUI labels and RPC argument names need not use identical wording.",
    },
    {
      id: "address",
      title: "Request one public test address",
      instructions: [
        "First enter help getnewaddress and read it. Then run the command below to generate one additional public Signet receiving address. This changes the wallet’s address position; it does not send money or export private keys.",
      ],
      command: "getnewaddress",
      commandContext: "Core GUI console · selected Signet practice wallet",
      expectedResult: "Core returns a new public address for this test wallet.",
      help: "An RPC-created address need not appear as a GUI receive request. Never paste an unlock credential or export private keys to solve an unfamiliar error.",
    },
    {
      id: "ownership",
      title: "Check the address belongs to this wallet",
      instructions: [
        "Enter getaddressinfo followed by the exact address you just received, enclosed in double quotes. Read ismine: it should be true. Compare the address character by character; do not use an example address from someone else.",
      ],
      expectedResult:
        "I checked that the selected wallet owns this exact public address.",
      help: "If ismine is false, check the wallet selection and copied address. Do not change networks or import private keys to make the result match.",
    },
  ],
  takeaway:
    "Read the operation, select the context, predict the result and inspect the response.",
})

export const productionLesson = lesson({
  id: "move-to-real-bitcoin",
  title: "Move to real Bitcoin — deliberately",
  summary: "A visible boundary between learning and protecting savings.",
  why: "Test skills must become a clean setup with its own recovery evidence.",
  risk: "A completed sandbox does not test a new mainnet wallet’s keys, password or backup.",
  chapter: "Move to real Bitcoin",
  prerequisites: [
    "single-sig-mastery",
    "foundations-checkpoint",
    "basic-rpc",
    "what-verification-proves",
  ],
  kind: "checkpoint",
  optional: true,
  sources: [core],
  explanation: [
    "Linux customization was your computer sandbox. Signet and Regtest are your Bitcoin sandboxes. Moving to real bitcoin is a separate decision; you can finish this course using only test coins.",
    "Use a clean, minimal Debian system and authenticated Core. If this machine accumulated experiments after the clean installation, reinstall it before creating savings keys. Preserve needed test records separately; never erase the only surviving backup. Prepare the signer’s software before disconnecting it, then keep it offline for fresh key creation.",
    "Continue with the existing mainnet lessons: new wallet and password, independent offline restore, watch-only address checks and a small recovery spend. A passing test supports that setup; it does not replace continued maintenance.",
  ],
  checklist: [
    "I understand my Linux environment, can use the terminal and can explain the remaining trust assumptions.",
    "I authenticated Bitcoin Core and completed the Signet wallet and offline PSBT workflows.",
    "I restored and signed from backups and can explain wallet encryption and separate passphrase recovery.",
    "I have chosen a clean production environment and will create fresh keys, passphrases and backups offline.",
  ],
  takeaway:
    "Proceed only when you understand the operations and can recover without the originals.",
})

export const complexityLesson = lesson({
  id: "complexity-after-the-lab",
  title: "Did the extra signers earn their place?",
  summary: "Compare the work you just did with your single-sig recovery.",
  why: "Complexity is a security cost you can now describe from experience.",
  risk: "Adding authority without maintaining the policy can make recovery fail when a signer disappears.",
  chapter: "Build and recover policies",
  prerequisites: ["single-sig-mastery", "multisig-failures"],
  kind: "practice",
  optional: true,
  estimatedTime: "10–20 min active",
  sources: [core],
  explanation: [
    "You have coordinated keys, descriptors, a PSBT, signatures, finalization, broadcast and recovery. Record the real work and the failures you encountered. Do not make the procedure harder to prove a point: even a well-designed 2-of-3 policy has more relationships to maintain.",
  ],
  guidedSteps: [
    {
      id: "cost",
      title: "Compare the two recovery procedures",
      instructions: [
        "Beside your single-sig notes, list the additional signer backups, separate password records, full public policy, surviving pairs, coordination and transaction-review steps needed for 2-of-3. Record time spent and any actual mistakes.",
        "Name the threat each addition solves. Geographical separation, independent decision makers, institutional controls, compromised-device assumptions and inheritance can justify threshold authority. There is no universal amount threshold.",
      ],
      expectedResult:
        "I can distinguish the authorization benefit from the work and new failures it creates.",
      help: "Several wallets on one lab host do not demonstrate separate people, devices or sites. Record those as untested operational requirements.",
    },
    {
      id: "decision",
      title: "Decide whether the simpler system already works",
      instructions: [
        "Write whether you would keep single-sig or investigate a particular policy further, and why. A well-executed single-sig setup can remain rational for substantial value when it covers the actual threats.",
        "For multisig, timelocks, Miniscript, decaying multisig or inheritance, ask: What threat does this solve? What new failures appear? What metadata must survive? What recovery must be tested? Who must understand it after I am gone? Can a simpler system solve it?",
      ],
      expectedResult:
        "My decision has a named threat, explicit recovery requirements and an explanation of the added cost.",
      help: "Choosing single-sig after this exercise is a successful result. Studying a more complex policy does not oblige you to adopt it.",
    },
  ],
  takeaway:
    "Every added signer or rule needs a benefit that survives comparison with its operational cost.",
})
