import { basicRpcLesson, productionLesson } from "./self-reliance"
import type { PlayerLesson } from "../bitcoin-core-curriculum-player-en-data"

export const part2Lessons: PlayerLesson[] = [
  {
    id: "real-device",
    slug: "choose-a-computer-and-model-malware-risk",
    title: "Choose one dedicated computer for practice",
    summary: "Begin with one ordinary computer, Debian and one Core wallet.",
    objective:
      "Prepare a dedicated practice computer without adding another wallet role.",
    what: "Assign a clear job to each ordinary computer.",
    why: "A dedicated environment is easier to understand and maintain than a machine used for unrelated daily tasks.",
    risk: "Mixing daily browsing, signing and backup storage can make one compromise defeat several protections.",
    status: "published",
    verification: "source-reviewed",
    referenceVersion: "Bitcoin Core 31.1",
    contentUpdated: "2026-09-14",
    estimatedTime: "20–40 min active",
    kind: "practice",
    explanation: [
      "Start with one supported generic laptop or desktop reserved for this work. Install Debian Stable and Bitcoin Core, then learn the complete wallet lifecycle with Signet test coins. One computer and one wallet are enough for this stage.",
      "Choose working storage, enough memory and a drive suited to the node’s storage settings. Keep unrelated browsing, email, chat and remote-access software out of this environment. The purpose of dedicating the computer is to reduce unrelated software and activity around the wallet.",
    ],
    prerequisites: ["foundations-checkpoint"],
    sources: [
      {
        label: "Debian Stable: installation guide",
        url: "https://www.debian.org/releases/stable/amd64/",
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
      "Procedure and boundaries reviewed against official sources. Physical Debian setup, isolation and tamper resistance must be verified on your actual equipment; no hands-on hardware certification is claimed.",
    origin: "First-principles curriculum v4",
    guidedSteps: [
      {
        id: "assign-v4",
        title: "Assign the practice computer",
        instructions: [
          "Record which supported computer will run the Signet exercises. Reserve it for this course and confirm that a fresh installation will not erase files you still need.",
        ],
        expectedResult:
          "One dedicated practice computer has a clear purpose and installation plan.",
        help: "Stop at this step if the result differs. Recheck the selected network, wallet and files, then review the linked official documentation. Do not mark the result as confirmed until you can explain the difference.",
      },
      {
        id: "media-v4",
        title: "Choose separate backup storage",
        instructions: [
          "Keep wallet backups outside the working wallet folder. Have separate removable backup media ready for the later recovery exercises; two files on the same device do not survive loss of that device.",
        ],
        expectedResult:
          "The working disk will not hold the only recovery copy.",
        help: "Stop at this step if the result differs. Recheck the selected network, wallet and files, then review the linked official documentation. Do not mark the result as confirmed until you can explain the difference.",
      },
      {
        id: "prepare-v4",
        title: "Continue to the Debian installation",
        instructions: [
          "Back up any unrelated files that must survive and confirm the dedicated installation disk. Follow the next lesson to authenticate and install Debian. Do not create wallet keys until preparation is complete.",
        ],
        expectedResult:
          "You are ready to install a minimal operating system on the intended computer.",
        help: "Stop at this step if the result differs. Recheck the selected network, wallet and files, then review the linked official documentation. Do not mark the result as confirmed until you can explain the difference.",
      },
    ],
    chapter: "Prepare Debian and Core",
    optional: false,
    sourceReviewed: "2026-09-14",
    takeaway:
      "First make one Core wallet ordinary to operate and recover on one dedicated Debian computer.",
  },
  {
    id: "debian-setup",
    slug: "debian-setup",
    title: "Install a small, dedicated Debian system",
    summary: "Prepare the operating system before creating any wallet secrets.",
    objective:
      "Prepare the operating system before creating any wallet secrets.",
    what: "Prepare the operating system before creating any wallet secrets.",
    why: "Every extra application adds code and maintenance to a computer entrusted with signing.",
    risk: "An unverified installer or a mistaken disk selection can compromise the setup before Core is installed.",
    status: "published",
    verification: "source-reviewed",
    referenceVersion: "Debian Stable · amd64 installation guide",
    contentUpdated: "2026-09-14",
    estimatedTime: "20–40 min active",
    kind: "practice",
    explanation: [
      "This is the clean second installation after the Linux playground. Preserve only needed files on a checked independent backup; reinstall instead of carrying over the experimental environment. Use the current Debian Stable installer from debian.org for your processor. The main examples use amd64, the name Debian uses for ordinary 64-bit Intel and AMD computers. Check that your hardware is supported before erasing anything.",
      "Installation wipes the selected disk. This exercise is for a dedicated computer with no files you still need. Disconnect other storage devices and identify the destination by model and capacity. If that identification is uncertain, stop before the installer writes to disk.",
    ],
    prerequisites: ["real-device"],
    sources: [
      {
        label: "Debian Stable: installation guide",
        url: "https://www.debian.org/releases/stable/amd64/",
      },
      {
        label: "Debian: authenticating installation images",
        url: "https://www.debian.org/CD/verify",
      },
    ],
    reviewNote:
      "Debian installation procedure checked against official documentation. Physical installer boot, disk installation and this hardware combination have not been hands-on tested in this review.",
    origin: "First-principles curriculum v4",
    guidedSteps: [
      {
        id: "image",
        title: "Get the installer and its authentication files",
        instructions: [
          "On a preparation computer, open Debian’s official installation page. Choose Stable, amd64, and the netinst image for a network-assisted installation. Download the ISO image, SHA256SUMS and SHA256SUMS.sign from the same release directory.",
          "An ISO is a disk image. A checksum checks its bytes; a signature authenticates the checksum list to a particular key. Follow Debian’s verification page to obtain the Debian CD signing keys and compare their full fingerprints using Debian’s published key information.",
          "The verification commands below run on a trusted Linux preparation computer with GnuPG and sha256sum available. If your preparation computer uses another operating system, follow Debian’s linked verification instructions for that platform before proceeding; do not skip authentication.",
        ],
        expectedResult:
          "You can identify the installer release, architecture, checksum and signing key.",
        help: "The netinst installer needs networking to fetch packages. Use this stage to prepare the dedicated practice computer before creating any wallet keys.",
      },
      {
        id: "verify-image",
        title: "Authenticate before writing the USB",
        instructions: [
          "In the folder with those files, check the detached signature, then compare the image checksum. Read both results. A matching checksum downloaded from the same compromised source would not establish authenticity by itself.",
          "The command checks only files actually present and should report OK for your chosen ISO. Stop on a mismatch, bad signature or unidentified signing key.",
        ],
        expectedResult:
          "A valid signature from the identified Debian CD key and an OK checksum for the ISO.",
        command:
          "gpg --verify SHA256SUMS.sign SHA256SUMS\nsha256sum --ignore-missing --check SHA256SUMS",
        commandContext: "Linux terminal · installer download folder",
        help: "Identify the selected installer, key fingerprint and target disk before retrying. A missing verification tool is a preparation problem; install it from your existing system’s trusted package source. Never bypass an image mismatch or guess which disk will be overwritten.",
      },
      {
        id: "boot-install-clean-v42",
        title: "Write the installer and select the destination",
        instructions: [
          "Use the graphical disk-image writer included with your preparation system, or the method documented in Debian’s installation guide. Select the disposable installer USB by model and capacity; writing the image overwrites it. Boot the dedicated computer from that USB.",
          "Choose Graphical install, your language and keyboard. For the sudo-based commands used here, leave the root password blank and create the first normal user account; Debian then grants that account permission to perform administration with sudo. Use the correctly identified internal disk. Guided encrypted LVM can protect local data, but its disk-unlock credential becomes a separate recovery requirement; it does not replace Core wallet encryption or backups.",
          "Select a desktop environment and standard system utilities. Leave web server and SSH server unselected unless you have a specific, documented need. Finish installation, remove the installer USB and boot from the internal disk.",
        ],
        expectedResult:
          "A working Debian desktop on the intended disk, with the keyboard and local login tested.",
        warning:
          "The installer’s final disk-write confirmation is destructive. Do not use a computer holding your only copy of any important file.",
        help: "Identify the selected installer, key fingerprint and target disk before retrying. A missing verification tool is a preparation problem; install it from your existing system’s trusted package source. Never bypass an image mismatch or guess which disk will be overwritten.",
      },
      {
        id: "update",
        title: "Update through Debian’s signed package system",
        instructions: [
          "While this new computer is still online and contains no wallet keys, update the installed software. Read the proposed changes before confirming. Restart if the update requires it.",
          "APT is Debian’s package manager. Its authenticated repositories supply the system software; arbitrary download sites are not a substitute.",
        ],
        expectedResult:
          "Updates finish without errors and the desktop starts normally after a restart.",
        command: "sudo apt update\nsudo apt full-upgrade",
        commandContext: "Debian terminal · preparation stage only",
        help: "Identify the selected installer, key fingerprint and target disk before retrying. A missing verification tool is a preparation problem; install it from your existing system’s trusted package source. Never bypass an image mismatch or guess which disk will be overwritten.",
      },
      {
        id: "minimum",
        title: "Install only the tools the next task needs",
        instructions: [
          "Install GnuPG, curl, Git and certificate support for release verification. Install KeePassXC from Debian’s authenticated repositories too: it is the default passphrase generator in this course.",
          "On Debian 13 Stable (trixie), use keepassxc-minimal, reviewed here at 2.7.10+dfsg1-1. It includes the generator without browser-integration and other optional plugins. Use maintained Debian updates; if the version changes, compare the generator settings with the versioned lesson before relying on its exact word-count calculation.",
        ],
        expectedResult: "You can explain why each added package is installed.",
        command:
          "sudo apt install gnupg curl git ca-certificates keepassxc-minimal",
        commandContext: "Debian terminal · package installation",
        help: "Identify the selected installer, key fingerprint and target disk before retrying. A missing verification tool is a preparation problem; install it from your existing system’s trusted package source. Never bypass an image mismatch or guess which disk will be overwritten.",
      },
      {
        id: "record",
        title: "Record the installation and prepare for Core",
        instructions: [
          "Record the Debian release, architecture and verification results without including login secrets. Test shutdown and cold boot. Continue to the Core download-verification lesson.",
        ],
        expectedResult:
          "A maintained minimal Debian system is ready for the verified Core release.",
        help: "Identify the selected installer, key fingerprint and target disk before retrying. A missing verification tool is a preparation problem; install it from your existing system’s trusted package source. Never bypass an image mismatch or guess which disk will be overwritten.",
      },
    ],
    chapter: "Prepare Debian and Core",
    optional: false,
    sourceReviewed: "2026-09-14",
    takeaway:
      "The Debian installer, operating system and installed tools are part of the trust boundary. Prepare and verify them before creating secrets.",
  },
  {
    id: "signet-install-verify",
    slug: "install-and-verify-bitcoin-core",
    title: "Download Core and check that it is the intended release",
    summary:
      "Verify the download and identify the people whose release signatures you trust.",
    objective:
      "Verify the download and identify the people whose release signatures you trust.",
    estimatedTime: "20–40 min active + downloads",
    status: "published",
    verification: "source-reviewed",
    referenceVersion: "Bitcoin Core 31.1 · Debian Stable",
    reviewNote:
      "v4.1 wording, sequence and source review on 2026-09-14. Earlier hands-on evidence is listed separately. This review does not certify a physical Debian installation or funded Signet exercise.",
    explanation: [
      "A download check has two parts. A checksum is a short fingerprint calculated from a file's contents; it helps detect whether the file changed. A digital signature connects the published checksum list to a signing key. You must also establish whose key it is, otherwise an attacker could supply their own file, checksum and signature.",
      "Before you run Core, the steps in this lesson walk you through preparing the tools, checking the file and identifying several release signers. They explain the messages you should expect. These checks do not prove that the program has no bugs or that your computer is free of malicious software.",
    ],
    concepts: [
      "SHA256 is a hash function. Its checksum is a compact digest of a file's bytes. Matching the archive to SHA256SUMS detects changed bytes, but an attacker could replace both unless you authenticate the list.",
      "SHA256SUMS.asc holds detached OpenPGP signatures over SHA256SUMS. GnuPG, usually run as gpg, is software that verifies these signatures. OpenPGP is the format and protocol it implements.",
      "A builder keeps a private signing key secret and publishes a public key for verification. These release-signing keys are different from your Bitcoin wallet keys. You do not generate a GPG private key to verify a download.",
      "A fingerprint identifies a public key. Compare the full fingerprint with trustworthy independent sources, such as the builder's established personal site and a separately authenticated direct contact. Another page or mirror of the same compromised repository is not independent confirmation.",
      "Your local GPG keyring, or key database, stores the public keys you import. Importing a key only makes it available for checks; it does not establish the owner's identity or make the key trustworthy.",
      "Bitcoin Core releases carry signatures from multiple builders. Check valid signatures from several independently identified people you trust, as the official guide describes. Agreement on the release bytes is useful evidence, not proof that the source code is harmless.",
    ],
    warnings: [],
    checklist: [],
    sources: [
      {
        label: "Bitcoin Core · Official release verification",
        url: "https://bitcoincore.org/en/download/",
      },
      {
        label: "Bitcoin Core · Guix release attestations and builder keys",
        url: "https://github.com/bitcoin-core/guix.sigs",
      },
      {
        label: "GnuPG · Public keys, fingerprints and signatures",
        url: "https://www.gnupg.org/gph/en/manual.html",
      },
      {
        label: "Debian · Package management",
        url: "https://www.debian.org/doc/manuals/debian-reference/ch02.en.html",
      },
      {
        label: "Debian: authenticating installation images",
        url: "https://www.debian.org/CD/verify",
      },
    ],
    codeBlocks: [],
    callouts: [],
    videoUrl: null,
    origin: "Checked on the official Bitcoin Core 31.1 arm64 macOS package",
    optional: false,
    kind: "practice",
    guidedSteps: [
      {
        id: "tools-check",
        title: "Check the verification tools",
        instructions: [
          "A terminal is an application where you type commands for the operating system. Open Debian's Terminal application on the online preparation computer. This is different from the text console inside Bitcoin Core.",
          "Run the command below. command -v looks for each named tool. It prints the location of each tool it finds; it prints nothing for a missing tool. Check all five names, because a minimal Debian installation may not include them.",
        ],
        expectedResult:
          "You see a location for curl, git, gpg, sha256sum and tar, or can name which ones are missing.",
        help: "command -v finds installed tools. curl can download files, git downloads the builder-key repository, gpg checks signatures, sha256sum checks file contents and tar unpacks the archive. The browser downloads in later steps do not require curl.",
        command: "command -v curl git gpg sha256sum tar",
        commandContext: "Linux system terminal · not the Core console",
        warning:
          "Use Signet test coins only. Never reuse these keys or passwords for mainnet.",
      },
      {
        id: "tools-install",
        title: "Install missing Debian packages",
        instructions: [
          "Debian installs software in packages. apt is its package-management command, and sudo runs a command with administrator permission. The first command below refreshes the package list; the second installs the verification tools and supporting packages from your configured Debian repositories.",
          "Run these only if the tools are missing, while this computer has no wallet secrets. Read the proposed package changes before accepting, then repeat the tool check. If sudo is missing, the help below explains using the root administrator account with su -. If all tools are already present, continue without reinstalling them.",
        ],
        expectedResult:
          "curl, git, gpg, sha256sum and tar are available from Debian's authenticated packages.",
        help: "sudo may itself be absent on a minimal Debian install. Use su - to enter the configured root account, run the apt commands without sudo, then exit. If you have no administrator access, resolve that first. Never run this online installation on a signer holding private keys.",
        command:
          "sudo apt update\nsudo apt install ca-certificates curl git gnupg coreutils tar",
        commandContext: "Linux system terminal · not the Core console",
        warning:
          "Use Signet test coins only. Never reuse these keys or passwords for mainnet.",
      },
      {
        id: "platform",
        title: "Download the matching package",
        instructions: [
          "The download must match both your operating system and your processor. This example uses Linux on x86-64, the processor family Debian calls amd64. A .tar.gz archive is a compressed bundle of program files. Leave it unopened until verification is complete.",
          "Open the official Core download page listed under Sources. Save the following files together in a new folder: bitcoin-31.1-x86_64-linux-gnu.tar.gz, SHA256SUMS and SHA256SUMS.asc from release 31.1. SHA256SUMS lists file checksums; SHA256SUMS.asc contains signatures over that list. Check the current official release before following this worked example, and keep all three files from the same release. Other platforms need their matching instructions.",
        ],
        expectedResult:
          "All three files belong to release 31.1 and the archive matches your operating system and processor.",
        help: "Debian calls this processor architecture amd64; the Core archive calls it x86_64. For Windows, macOS or another processor, use the matching official verification instructions. The Linux commands here do not apply unchanged.",
        warning:
          "Use Signet test coins only. Never reuse these keys or passwords for mainnet.",
      },
      {
        id: "folder",
        title: "Check which folder the terminal is using",
        instructions: [
          "Every terminal command runs from a particular folder, called the current directory. Open the terminal in the folder containing your three downloaded files, then run pwd and ls below. pwd prints the folder's location; ls lists its files. Compare both with the file manager.",
          "To move to another folder, use cd followed by its path. For example, cd Downloads/ enters Downloads when you are in your home folder. cd .. goes up one folder. Use the actual folder name on your computer, which may differ. Continue only when the archive and both SHA256SUMS files appear in the same location.",
        ],
        expectedResult:
          "You can see the exact archive, SHA256SUMS and SHA256SUMS.asc in the current folder.",
        help: "pwd prints your current folder; ls lists its contents. cd changes folder, for example cd Downloads/ when you are in your home folder. cd .. goes to the parent folder. Folder names may be translated, so use the actual path shown in your file manager.",
        command: "pwd\nls",
        commandContext: "Linux system terminal · not the Core console",
        warning:
          "Use Signet test coins only. Never reuse these keys or passwords for mainnet.",
      },
      {
        id: "hash",
        title: "Check the archive's checksum",
        instructions: [
          "SHA256 calculates a checksum from the exact contents of a file. The command below calculates the archive's checksum and compares it with the value listed in SHA256SUMS. --ignore-missing skips entries for other downloads you did not save.",
          "Run it in the download folder and find the line for your exact .tar.gz filename. It must end with OK. A different filename, FAILED or no matching line means stop. This checks that the file matches the list; the next steps check who signed that list.",
        ],
        expectedResult: "The exact archive you downloaded is listed with OK.",
        help: "A FAILED result or no matching file means stop. Check the folder, filename and release; do not run the downloaded program.",
        command: "sha256sum --ignore-missing --check SHA256SUMS",
        commandContext: "Linux system terminal · not the Core console",
        warning:
          "Use Signet test coins only. Never reuse these keys or passwords for mainnet.",
      },
      {
        id: "builder-repo",
        title: "Obtain the builder public keys",
        instructions: [
          "Core release builders independently build the software and sign release checksums. To verify a builder's signature, you need their public signing key. The secret private signing key stays with that builder; neither key is one of your Bitcoin wallet keys.",
          "A repository is a stored collection of project files. git clone downloads a copy. Run the command below in your download folder to obtain the official guix.sigs repository and its builder-keys folder. Downloading these keys does not yet establish whose keys they are.",
        ],
        expectedResult:
          "A guix.sigs folder containing builder-keys is present.",
        help: "Cloning downloads repository data; it does not run it or prove a key owner's identity. If that folder already exists, use a fresh verification folder instead of deleting unknown files.",
        command: "git clone https://github.com/bitcoin-core/guix.sigs",
        commandContext: "Linux system terminal · not the Core console",
        warning:
          "Use Signet test coins only. Never reuse these keys or passwords for mainnet.",
      },
      {
        id: "builder-import",
        title: "Import the public keys locally",
        instructions: [
          "GnuPG is the signature-checking program, usually called gpg in commands. OpenPGP is the standard used for these signatures. GPG keeps imported public keys in a local keyring, which is simply its database of keys.",
          "Run the import command below. The * selects all the files in builder-keys. Importing makes the keys available for verification; it does not mean you trust every owner. You do not need to create a private GPG key to check a Core download.",
        ],
        expectedResult:
          "GPG reports imported, updated or unchanged public keys.",
        help: "This local keyring is not your Bitcoin wallet. Importing every builder key does not mean trusting every builder. You still need to identify the signers you rely on.",
        command: "gpg --import guix.sigs/builder-keys/*",
        commandContext: "Linux system terminal · not the Core console",
        warning:
          "Use Signet test coins only. Never reuse these keys or passwords for mainnet.",
      },
      {
        id: "fingerprints",
        title: "Identify the keys you will trust",
        instructions: [
          "A fingerprint is the full identifier calculated from a public key. A copied name, email address or short key ID is not enough to establish identity. Run gpg --fingerprint below and record the full fingerprints of the builders you intend to rely on.",
          "For several builders, compare the full fingerprint with a trustworthy independent source, such as their established personal website or a separately authenticated direct contact. Another copy of the same repository is not independent. Record who you checked and how. If you cannot establish a key's identity, do not count its signature as trusted evidence.",
        ],
        expectedResult:
          "You have a record of independently identified builder keys.",
        help: "A name, email or short key ID can be copied. Use the full fingerprint and an independently authenticated source. If you cannot establish a key's identity, do not count its signature as trusted evidence.",
        command: "gpg --fingerprint",
        commandContext: "Linux system terminal · not the Core console",
        warning:
          "Use Signet test coins only. Never reuse these keys or passwords for mainnet.",
      },
      {
        id: "signature",
        title: "Verify who signed those checksums",
        instructions: [
          "Run the command below to check the signatures in SHA256SUMS.asc against SHA256SUMS. Read the results for the builders whose full fingerprints you checked. Good signature means the signature matches that key. It does not, by itself, establish the person's identity.",
          "Confirm that several builders you independently identified have valid signatures. A missing public key means that particular signature was not checked. An uncertified-key warning concerns GPG's stored trust information; resolve identity independently rather than hiding the warning. Stop for a bad signature, a fingerprint mismatch, an expired or revoked key you rely on, or too few valid signatures from builders you have identified.",
        ],
        expectedResult:
          "Several identified builders have valid signatures, and their full key fingerprints match your independent records.",
        help: "A missing public key prevents GPG from checking that particular signature; it does not invalidate the others. An uncertified-key warning means GPG has not established the key owner's identity through its trust database. Verify identity independently. Stop for a bad signature, an unexplained fingerprint mismatch, an expired or revoked key you rely on, or too few valid signatures from identified builders. Do not change GPG's ownertrust settings just to hide warnings.",
        command: "gpg --verify SHA256SUMS.asc SHA256SUMS",
        commandContext: "Linux system terminal · not the Core console",
        warning:
          "Use Signet test coins only. Never reuse these keys or passwords for mainnet.",
      },
      {
        id: "extract",
        title: "Extract the verified program",
        instructions: [
          "Only after the file and signature checks pass, extract the archive. Extract means unpack the compressed files into a folder. Keep the bitcoin-31.1 folder in a location you control. The bin folder inside it contains the executable programs.",
          "In bitcoin-31.1/bin, run the command below. bitcoin-qt is Core's application with windows and menus; -version asks it to report its version. Keep the folder, because the next lesson starts this same verified program on Signet. If libraries, the supporting software the program needs, are missing, stop and resolve that during preparation.",
        ],
        expectedResult: "The version output identifies Bitcoin Core 31.1.",
        help: "If the program cannot run or reports missing libraries, use the official platform documentation. Do not download replacement executables from an error-message link.",
        command: "./bitcoin-qt -version",
        commandContext: "Linux system terminal · not the Core console",
        warning:
          "Use Signet test coins only. Never reuse these keys or passwords for mainnet.",
      },
    ],
    prerequisites: ["debian-setup"],
    notes: [],
    commonMistakes: [],
    contentUpdated: "2026-09-14",
    chapter: "Prepare Debian and Core",
    sourceReviewed: "2026-09-14",
    why: "Verify the download and identify the people whose release signatures you trust.",
    risk: "A missing or misunderstood step can leave you unable to verify the result or recover the wallet. Demonstrate the outcome before continuing.",
    takeaway:
      "A checksum matches file bytes; a valid signature ties the manifest to a key. Establishing whose key it is requires a separate identity check.",
  },
  {
    id: "signet-why",
    slug: "learn-first-with-valueless-bitcoin",
    title: "Practice with test coins first",
    summary:
      "Learn the whole payment and recovery process before risking real bitcoin.",
    objective:
      "Learn the whole payment and recovery process before risking real bitcoin.",
    estimatedTime: "3 min reading",
    status: "published",
    verification: "source-reviewed",
    referenceVersion: "BIP 325 / Bitcoin Core 31.1",
    explanation: [
      "Linux customization was our computer sandbox. Signet/Regtest is our Bitcoin sandbox. Signet is a separate network for practicing with Bitcoin software. Its test coins are not intended to have monetary value. You can receive them, send them, make mistakes and repeat the exercise without putting your savings at risk. Mainnet is the real Bitcoin network, where payments transfer bitcoin that has monetary value.",
      "You will receive test coins, send a small amount, save a wallet backup and restore the wallet from that file. Then you will send again using the restored wallet. That final payment checks whether the backup restores your ability to spend. Simply copying the file does not establish that.",
    ],
    checklist: [
      "I understand why Signet coins are not mainnet bitcoin.",
      "I know that a test network does not justify introducing real secrets.",
      "I accept that I must repeat recovery before using real funds.",
    ],
    sources: [
      {
        label: "BIP 325 — Signet",
        url: "https://github.com/bitcoin/bips/blob/master/bip-0325.mediawiki",
      },
      {
        label: "Bitcoin Core 31.1 — Offline Signing Tutorial",
        url: "https://github.com/bitcoin/bitcoin/blob/v31.1/doc/offline-signing-tutorial.md",
      },
    ],
    callouts: [
      {
        kind: "warning",
        title: "Practice payments are public too",
        body: "Signet addresses and transactions are public. Use separate test keys and passwords. Never bring a real wallet's private keys or backup into a practice exercise.",
      },
    ],
    videoUrl: null,
    origin: "New curriculum v2 lesson",
    optional: false,
    kind: "reading",
    contentUpdated: "2026-09-14",
    notes: [],
    chapter: "Prepare Debian and Core",
    sourceReviewed: "2026-09-14",
    reviewNote:
      "v4.1 wording, sequence and source review on 2026-09-14. Earlier hands-on evidence is listed separately. This review does not certify a physical Debian installation or funded Signet exercise.",
    why: "Learn the whole payment and recovery process before risking real bitcoin.",
    risk: "A missing or misunderstood step can leave you unable to verify the result or recover the wallet. Demonstrate the outcome before continuing.",
    takeaway:
      "Test coins let you rehearse the real workflow while keeping mistakes away from your savings.",
    prerequisites: ["signet-install-verify"],
  },
  {
    id: "signet-vs-mainnet",
    slug: "mainnet-vs-signet",
    title: "Check whether you are using test coins or real bitcoin",
    summary:
      "Recognize Signet and mainnet before creating a wallet or sending a payment.",
    objective:
      "Recognize Signet and mainnet before creating a wallet or sending a payment.",
    estimatedTime: "3 min reading",
    status: "published",
    verification: "source-reviewed",
    referenceVersion: "BIP 325 / Bitcoin Core 31.1",
    explanation: [
      "Mainnet and Signet keep separate transaction histories. A Signet payment does not move real mainnet bitcoin. Core chooses which network to use when it starts. In this course, adding -signet to the launch command selects the practice network.",
      "Core's console is a panel inside the application where you can enter text commands. The command getblockchaininfo reports the selected network in a field named chain. The value signet means our practice network; main means real Bitcoin. Check that value instead of guessing from a wallet name or an address. Addresses on some other test networks look like Signet addresses.",
    ],
    concepts: [
      "Signet and mainnet have separate transaction histories and data folders.",
      "A Signet destination cannot receive mainnet bitcoin. Check the selected network before sharing an address.",
      "A wallet name is only a label. Check the chain field in getblockchaininfo to establish which network Core is using.",
    ],
    sources: [
      {
        label: "BIP 325 — Signet",
        url: "https://github.com/bitcoin/bips/blob/master/bip-0325.mediawiki",
      },
      {
        label: "Bitcoin Core 31.1 — Files and Data Directories",
        url: "https://github.com/bitcoin/bitcoin/blob/v31.1/doc/files.md",
      },
    ],
    videoUrl: null,
    origin: "New curriculum v2 lesson",
    optional: false,
    kind: "reading",
    contentUpdated: "2026-09-14",
    notes: [],
    chapter: "Prepare Debian and Core",
    sourceReviewed: "2026-09-14",
    reviewNote:
      "v4.1 wording, sequence and source review on 2026-09-14. Earlier hands-on evidence is listed separately. This review does not certify a physical Debian installation or funded Signet exercise.",
    why: "Recognize Signet and mainnet before creating a wallet or sending a payment.",
    risk: "A missing or misunderstood step can leave you unable to verify the result or recover the wallet. Demonstrate the outcome before continuing.",
    takeaway:
      "The selected network determines which coins and addresses Core is using. Separate training wallets from every real-money wallet.",
    prerequisites: ["signet-why"],
  },
  {
    id: "signet-start",
    slug: "start-bitcoin-core-on-signet",
    title: "Open Core on the Signet practice network",
    summary: "Confirm the practice network in the GUI before making a wallet.",
    objective:
      "Confirm the practice network in the GUI before making a wallet.",
    what: "Confirm the practice network in the GUI before making a wallet.",
    why: "The network tells you whether you are using test coins or real bitcoin.",
    risk: "An ordinary mainnet window is not a safe substitute for an explicitly selected practice network.",
    status: "published",
    verification: "source-reviewed",
    referenceVersion: "Bitcoin Core 31.1",
    contentUpdated: "2026-09-14",
    estimatedTime: "20–40 min active",
    kind: "practice",
    explanation: [
      "Signet is a public Bitcoin practice network. Its coins are for testing. Core’s graphical application includes the node; there is no separate server to start for these lessons.",
      "Synchronization can run while you create an empty wallet and rehearse file handling. Wait until the online node is up to date before treating balances and confirmations as current.",
    ],
    prerequisites: ["signet-vs-mainnet"],
    sources: [
      {
        label: "Bitcoin Core 31.1: wallet GUI actions",
        url: "https://github.com/bitcoin/bitcoin/blob/v31.1/src/qt/bitcoingui.cpp",
      },
      {
        label: "Bitcoin Core 31.1: data files",
        url: "https://github.com/bitcoin/bitcoin/blob/v31.1/doc/files.md",
      },
    ],
    reviewNote:
      "v4.1 wording, sequence and source review on 2026-09-14. Earlier hands-on evidence is listed separately. This review does not certify a physical Debian installation or funded Signet exercise.",
    origin: "First-principles curriculum v4",
    guidedSteps: [
      {
        id: "launch-v4",
        title: "Launch the verified application on Signet",
        instructions: [
          "Close your other Core test window. From the verified bitcoin-31.1/bin folder on Debian, start the command below. Choose a separate practice data folder when prompted.",
          "The -signet option selects the test network. Do not omit it. On another supported operating system, pass the same option to the matching verified graphical application.",
        ],
        expectedResult:
          "The window identifies Signet and starts synchronizing.",
        command: "./bitcoin-qt -signet",
        commandContext: "Debian terminal · launch GUI",
        warning:
          "Test coins only. Keys and weak training passphrases from this course must never be reused for mainnet.",
        help: "Stop at this step if the result differs. Recheck the selected network, wallet and files, then review the linked official documentation. Do not mark the result as confirmed until you can explain the difference.",
      },
      {
        id: "inspect-gui-v4",
        title: "Verify the network and synchronization",
        instructions: [
          "Look for Signet in the window title and open Window → Information. Check the Network field. On platforms whose menu arrangement differs, open the Information tab in the node window.",
          "Return to the main window. Open the synchronization indicator to see download and verification progress. Wait for “Up to date” before the receive/send exercise. No console command is needed for these checks.",
        ],
        expectedResult:
          "The Information tab says Signet. You can identify whether the node has caught up.",
        help: "Stop at this step if the result differs. Recheck the selected network, wallet and files, then review the linked official documentation. Do not mark the result as confirmed until you can explain the difference.",
      },
    ],
    chapter: "Prepare Debian and Core",
    optional: false,
    sourceReviewed: "2026-09-14",
    takeaway:
      "An explicit Signet data directory makes the training environment identifiable and keeps its working files separate.",
  },
  {
    id: "2.3",
    title: "Keep every block or save disk space with pruning",
    summary:
      "Understand what pruning saves and how it affects wallet recovery.",
    status: "published",
    what: "Choose whether to keep all old blocks or delete older block files after checking them.",
    why: "Pruning saves disk space while still checking Bitcoin's rules. Restoring an old wallet can require blocks that a pruned node has already deleted.",
    risk: "Pruning changes what is kept on disk, not which rules the node checks. Do not assume an old wallet can be fully scanned with only the remaining block files.",
    sources: [
      {
        label: "Core 31.1 · Files and data directory",
        url: "https://github.com/bitcoin/bitcoin/blob/v31.1/doc/files.md",
      },
      {
        label: "Core 31.1 · Pruning options and recovery limits",
        url: "https://github.com/bitcoin/bitcoin/blob/v31.1/src/init.cpp",
      },
    ],
    videoUrl: null,
    slug: "full-vs-pruned-node",
    objective:
      "Understand what pruning saves and how it affects wallet recovery.",
    estimatedTime: "8–12 min",
    verification: "source-reviewed",
    referenceVersion: "Bitcoin Core 31.1",
    explanation: [
      "An archival full node keeps the old blocks after checking them. A pruned full node checks the same Bitcoin rules but deletes older block files to save disk space. Pruning does not mean trusting someone else to validate the transactions, and an archival node is not required for safe wallet operation.",
      "The difference matters when restoring a wallet. Core may need old blocks to find its earlier payments. If your pruned node has deleted those blocks, you need access to that history again, including downloading and validating it when necessary. Keeping the full archive makes that task easier when you have enough storage. Neither choice replaces wallet backups.",
    ],
    origin: "Moved from legacy module 2",
    optional: true,
    kind: "reading",
    contentUpdated: "2026-09-14",
    notes: [],
    chapter: "Prepare Debian and Core",
    sourceReviewed: "2026-09-14",
    reviewNote:
      "v4.1 wording, sequence and source review on 2026-09-14. Earlier hands-on evidence is listed separately. This review does not certify a physical Debian installation or funded Signet exercise.",
    takeaway:
      "Pruning saves storage after validation. Missing historical blocks may still be needed when recovering an old wallet.",
    prerequisites: ["signet-start"],
  },
  {
    id: "signet-first-wallet",
    slug: "first-signet-wallet-and-address",
    title: "Create a wallet used only for practice",
    summary:
      "Create the named test wallet and check that it can hold signing keys.",
    objective:
      "Create the named test wallet and check that it can hold signing keys.",
    estimatedTime: "10–15 min",
    status: "published",
    verification: "source-reviewed",
    referenceVersion: "Bitcoin Core 31.1",
    explanation: [
      "A wallet name is a local label, not a Bitcoin address. We use signet-training-wallet so you can recognize this practice wallet in Core's wallet selector. Never reuse its keys or password for real savings.",
      "Core can create different kinds of wallet. For this exercise, it must contain private keys so that it can sign a test payment. After the passphrase lessons, you will encrypt those keys and make a fresh backup before receiving test coins.",
    ],
    sources: [
      {
        label: "Bitcoin Core 31.1 — Managing the wallet",
        url: "https://github.com/bitcoin/bitcoin/blob/v31.1/doc/managing-wallets.md",
      },
      {
        label: "Bitcoin Core 31.1 — Files and Data Directories",
        url: "https://github.com/bitcoin/bitcoin/blob/v31.1/doc/files.md",
      },
    ],
    codeBlocks: [],
    callouts: [
      {
        kind: "warning",
        title: "Keep practice and real wallets separate",
        body: "Later, mainnet gets new keys, a new wallet password and new backups. Do not reuse the Signet wallet or convert its backup into your real-funds setup.",
      },
    ],
    videoUrl: null,
    origin: "New curriculum v2 lesson",
    optional: false,
    kind: "practice",
    guidedSteps: [
      {
        id: "create",
        title: "Create signet-training-wallet",
        instructions: [
          "After confirming Signet, choose File → Create Wallet and name it signet-training-wallet. This name identifies the wallet on your computer; it is not a receiving address.",
          "For this practice exercise leave Encrypt Wallet unchecked, because encryption is taught separately after passphrase generation. Leave Disable Private Keys unchecked so the wallet can sign, and Make Blank Wallet unchecked so Core creates its normal starting keys. Do not receive coins before encryption and the new backup.",
        ],
        expectedResult: "The selected wallet is signet-training-wallet.",
        help: "If the name already exists, return to that training wallet or use a fresh test data directory; never overwrite another wallet.",
        warning:
          "Use Signet test coins only. Never reuse these keys or passwords for mainnet.",
      },
      {
        id: "receive-gui-v4",
        title: "Create and record a practice receiving address",
        instructions: [
          "Confirm the selected wallet name. Open Receive, add the label “first practice receipt” and choose Create new receiving address. The dialog shows the address and a QR code.",
          "Record the address and wallet name in your test notes. An address is public payment information; it is not the private key. On Signet, a native SegWit address starts with tb1. The same prefix can appear on other test networks, so the network check still matters.",
        ],
        expectedResult:
          "A receiving address appears in the intended Signet wallet, with the label you chose.",
        help: "Stop at this step if the result differs. Recheck the selected network, wallet and files, then review the linked official documentation. Do not mark the result as confirmed until you can explain the difference.",
      },
    ],
    prerequisites: ["signet-start"],
    contentUpdated: "2026-09-14",
    notes: [],
    checklist: [
      "I can create a named wallet and locate its receiving address without using the console.",
    ],
    chapter: "Operate one Core wallet",
    sourceReviewed: "2026-09-14",
    reviewNote:
      "v4.1 wording, sequence and source review on 2026-09-14. Earlier hands-on evidence is listed separately. This review does not certify a physical Debian installation or funded Signet exercise.",
    why: "Create the named test wallet and check that it can hold signing keys.",
    risk: "A missing or misunderstood step can leave you unable to verify the result or recover the wallet. Demonstrate the outcome before continuing.",
    takeaway:
      "A wallet name identifies a local file collection; a receiving address identifies where a Bitcoin payment can be sent.",
  },
  {
    id: "passphrase-strength",
    slug: "passphrase-strength",
    title: "How strong does my wallet passphrase need to be?",
    summary: "Understand randomness before counting characters or words.",
    objective: "Understand randomness before counting characters or words.",
    what: "Understand randomness before counting characters or words.",
    why: "An attacker who obtains the encrypted file can try guesses without asking your permission.",
    risk: "A familiar sentence can be easier to guess than a shorter sequence generated independently at random.",
    status: "published",
    verification: "source-reviewed",
    referenceVersion: "Bitcoin Core 31.1",
    contentUpdated: "2026-09-14",
    estimatedTime: "8–12 min",
    kind: "reading",
    explanation: [
      "If a list contains N different words, one equally likely selection has N possibilities. Choosing another word independently multiplies that count by N again. Word order matters, and a repeated word is a valid random result.",
      "A bit represents a doubling of the possibilities. The expression log2(N) counts how many doublings produce N. For n independent, equally likely choices, entropy is n × log2(N) bits. This describes the selection process; a sentence you invent does not become random because it contains the same number of words.",
      "The bundled large list in the reviewed Debian KeePassXC package contains 7,772 distinct lowercase words. The table uses that actual count: one word gives about 12.92 bits, five 64.62, six 77.54 and eight 103.39. A fixed space between words adds no extra entropy.",
      "Eight independently random words are the conservative course default for a long-term wallet, not a cryptographic minimum. Five and six words already produce enormous search spaces. Their suitability depends on the generation method and the attack assumptions; fewer than eight is not automatically unsafe. The default gives an enormous margin without requiring each beginner to design a separate policy.",
      "More words keep multiplying the search space, but their practical benefit diminishes once guessing is already economically implausible with a large margin. Extra words still have to be recorded, typed, protected and recovered. Twenty-four words do not automatically produce a better custody system than eight.",
      "A Core passphrase protects private key material in an encrypted file. BIP39 words encode a root recovery secret. Their roles differ; neither a word count nor a readable format tells you whether the generating process was sound.",
      "Our default generator is KeePassXC on the clean dedicated Debian computer. It requests secure random bytes from Linux and uses them to select words. Linux gathers unpredictable input from device activity and other sources, mixes it into protected internal state and uses cryptography to produce bytes. A CSPRNG is a cryptographically secure pseudorandom number generator: its calculations are deterministic, but an attacker without its secret internal state should not be able to predict the output when it is properly initialized.",
      "Core itself depends on secure computer-generated randomness to create wallet keys. Using a reviewed generator on this same prepared foundation is consistent with that trust. Correct dice can be strong too, but manual rolls, transcription and lookup add work and errors without addressing a threat in our default model. Use KeePassXC unless you can explain the extra protection or educational purpose of dice. The next calculator helps you judge the margin before generating a phrase.",
    ],
    prerequisites: ["signet-first-wallet"],
    sources: [
      {
        label: "Debian Stable: KeePassXC minimal 2.7.10+dfsg1-1",
        url: "https://packages.debian.org/trixie/keepassxc-minimal",
      },
      {
        label: "KeePassXC 2.7.10: passphrase generation and list loading",
        url: "https://github.com/keepassxreboot/keepassxc/blob/2.7.10/src/core/PassphraseGenerator.cpp",
      },
      {
        label: "KeePassXC 2.7.10: bundled large wordlist",
        url: "https://github.com/keepassxreboot/keepassxc/blob/2.7.10/share/wordlists/eff_large.wordlist",
      },
      {
        label: "KeePassXC 2.7.10: random bytes and unbiased integer selection",
        url: "https://github.com/keepassxreboot/keepassxc/blob/2.7.10/src/crypto/Random.cpp",
      },
      {
        label: "Linux random interfaces",
        url: "https://man7.org/linux/man-pages/man4/random.4.html",
      },
    ],
    reviewNote:
      "v4.1 wording, sequence and source review on 2026-09-14. Earlier hands-on evidence is listed separately. This review does not certify a physical Debian installation or funded Signet exercise.",
    origin: "First-principles curriculum v4",
    widget: "entropy-table",
    chapter: "Operate one Core wallet",
    optional: false,
    sourceReviewed: "2026-09-14",
    takeaway:
      "Eight random words are a conservative default, not a minimum. Judge the generation method, attack margin and recovery burden together.",
  },
  {
    id: "brute-force-economics",
    slug: "brute-force-economics",
    title: "Explore the cost of guessing",
    summary: "Change public assumptions and see how the search grows.",
    objective: "Change public assumptions and see how the search grows.",
    what: "Change public assumptions and see how the search grows.",
    why: "An attacker spends resources to search a space of possible passphrases.",
    risk: "A precise-looking price can hide an unrealistic guess rate or ignore how the secret was actually generated.",
    status: "published",
    verification: "source-reviewed",
    referenceVersion: "Bitcoin Core 31.1",
    contentUpdated: "2026-09-14",
    estimatedTime: "8–12 min",
    kind: "reading",
    explanation: [
      "The calculator models uniformly random words, a fixed aggregate guess rate and a fixed price per hour for that whole guessing system. Average search is half the space; full search tries every candidate once. Neither is a promise about when a particular secret will be found.",
      "The default rate of one billion guesses a second is deliberately hypothetical. It is not a Bitcoin Core cracking benchmark. Power and hourly compute costs must describe the same total equipment that achieves the chosen rate. Electricity is shown separately from compute rental to avoid adding the same energy cost twice.",
      "Core 31.1 encrypts private key material using AES-256-CBC and derives an encryption key from the passphrase using salted, repeated SHA-512 work. Its implementation calibrates the iteration count to a target duration on the machine doing encryption, subject to a minimum. That slows each guess; it does not make a predictable passphrase random.",
      "A real attack depends on the wallet’s stored derivation parameters, hardware, software optimization, parallel machines, electricity and future improvements. Do not interpret the result as an insurance quote or aim for an estimated attack cost only slightly above the wallet’s value. Keep a large margin and review it over time.",
      "An attacker who obtains an encrypted wallet can try guesses without asking you or this website. The work consumes computing time, energy and equipment, and prevents those resources from being used elsewhere. This opportunity cost matters even when a machine is already owned.",
      "Compare one, five, six and eight words, then change the assumptions. The aim is intuition, not choosing the largest number out of fear. Do not match a $100,000 wallet to a $101,000 attack estimate: future purchasing power, better attack tools and uncertain hardware costs require a much larger margin. Once the attack is already economically absurd under demanding assumptions, further entropy has diminishing practical value. Review the margin over time.",
    ],
    prerequisites: ["passphrase-strength"],
    sources: [
      {
        label: "Bitcoin Core 31.1: passphrase derivation and AES encryption",
        url: "https://github.com/bitcoin/bitcoin/blob/v31.1/src/wallet/crypter.cpp",
      },
      {
        label: "Bitcoin Core 31.1: wallet root generation",
        url: "https://github.com/bitcoin/bitcoin/blob/v31.1/src/wallet/wallet.cpp",
      },
      {
        label: "EFF: original large wordlist (7,776 entries)",
        url: "https://www.eff.org/files/2016/07/18/eff_large_wordlist.txt",
      },
    ],
    reviewNote:
      "v4.1 wording, sequence and source review on 2026-09-14. Earlier hands-on evidence is listed separately. This review does not certify a physical Debian installation or funded Signet exercise.",
    origin: "First-principles curriculum v4",
    widget: "brute-force",
    chapter: "Operate one Core wallet",
    optional: false,
    sourceReviewed: "2026-09-14",
    takeaway:
      "Guessing consumes resources, but illustrative costs are not guarantees. Keep a substantial security margin instead of matching an estimate to your balance.",
  },
  {
    id: "generate-passphrase",
    slug: "generate-passphrase",
    title: "Generate the passphrase with KeePassXC",
    summary:
      "Use the secure randomness already available on your clean Debian system.",
    objective:
      "Generate and record eight independent words using the verified bundled list.",
    what: "Choose words by a random procedure you can explain.",
    why: "The strength calculation is only valid when the generating method matches it.",
    risk: "Picking attractive words, reusing an online password or losing the record defeats the intended protection.",
    status: "published",
    verification: "source-reviewed",
    referenceVersion:
      "KeePassXC 2.7.10+dfsg1-1 · Debian 13 Stable amd64 · Botan 2.19.5+dfsg-4",
    contentUpdated: "2026-09-14",
    estimatedTime: "20–40 min active",
    kind: "practice",
    explanation: [
      "Use KeePassXC on the clean dedicated Debian environment. The computer is not inventing a clever password: the application requests secure random bytes from the operating system and uses them to select words. For this stage, generate a disposable Signet passphrase. The same method will later run on the prepared offline signer before any real wallet is created.",
      "Linux gathers unpredictable input from device activity and other sources, mixes it into protected internal state and uses cryptography to produce random bytes. A CSPRNG is a cryptographically secure pseudorandom number generator. Its calculations are deterministic, but an attacker without its secret internal state should not be able to predict the output. The relevant question is whether the source is properly initialized and the implementation is sound, not whether a human or a machine performed the procedure.",
      "Bitcoin Core already relies on secure computer-generated randomness to create wallet keys. Our clean Linux and generic-hardware foundation therefore needs a trustworthy random source in either case. A correctly implemented password generator can turn that source into more than enough passphrase entropy. Replacing it with manual dice rolling adds no meaningful practical protection against a named threat in this course’s default model.",
      "The reviewed Debian package includes eff_large.wordlist with 7,772 distinct words. Use it directly. Downloading and importing the original EFF list would change the eight-word figure from about 103.39 to 103.40 bits while adding another file and several manual steps. That does not justify the added work.",
      "Physical dice can produce excellent entropy, but this course discourages them as the routine method. Transcribing rolls, looking up words and reproducing the procedure add time and opportunities for mistakes. An optional dice lesson remains available for an explicit threat, education or research. If you cannot name the threat that dice solve in your setup, use KeePassXC.",
    ],
    prerequisites: ["brute-force-economics"],
    sources: [
      {
        label: "Debian Stable: KeePassXC minimal 2.7.10+dfsg1-1",
        url: "https://packages.debian.org/trixie/keepassxc-minimal",
      },
      {
        label: "KeePassXC 2.7.10: passphrase generation and list loading",
        url: "https://github.com/keepassxreboot/keepassxc/blob/2.7.10/src/core/PassphraseGenerator.cpp",
      },
      {
        label: "KeePassXC 2.7.10: random bytes and unbiased integer selection",
        url: "https://github.com/keepassxreboot/keepassxc/blob/2.7.10/src/crypto/Random.cpp",
      },
      {
        label: "KeePassXC 2.7.10: bundled large wordlist",
        url: "https://github.com/keepassxreboot/keepassxc/blob/2.7.10/share/wordlists/eff_large.wordlist",
      },
      {
        label: "Debian: Botan 2.19.5+dfsg-4",
        url: "https://packages.debian.org/trixie/libbotan-2-19",
      },
      {
        label: "Botan 2.19.5: system RNG implementation",
        url: "https://github.com/randombit/botan/blob/2.19.5/src/lib/rng/system_rng/system_rng.cpp",
      },
      {
        label: "Linux random interfaces",
        url: "https://man7.org/linux/man-pages/man4/random.4.html",
      },
    ],
    reviewNote:
      "v4.1 source and sequence review. Debian package files and generator implementation were inspected; this is not a physical Debian installation or a funded Signet test.",
    origin: "First-principles curriculum v4",
    guidedSteps: [
      {
        id: "keepass-bundled-v41",
        title: "Select the bundled generator settings",
        instructions: [
          "Open KeePassXC. You can use its generator without creating a password database. Choose Tools → Password Generator, then Passphrase. Select (SYSTEM) eff_large.wordlist, set Word Count to 8, choose lower case and use a single space as the word separator.",
          "Check these settings yourself; they may reflect a previous session. Use the Generate control (the circular-arrow button) to create the test phrase. Keep exactly what the generator selects, including repeated words. Do not substitute words you prefer or keep regenerating until the result looks memorable.",
        ],
        expectedResult:
          "The selected bundled list has 7,772 choices; eight generated words give about 103.39 bits. No custom file is needed.",
        help: "If the list is missing, the word count is wrong or the result is empty, stop and check the installed package and generator settings. An unfamiliar version needs a fresh source/list comparison, not an assumed count.",
      },
      {
        id: "record-v4",
        title: "Record exactly what was generated",
        instructions: [
          "Write the words in order, including any repetition, with the separator and case unambiguous. Store the record separately from the wallet backup locations you are protecting. A second password record may be justified, but give it its own access and loss model.",
          "Do not rely on memory alone. If you use an encrypted password database, its master passphrase and recovery procedure become part of this system. Do not put the only copy inside the wallet backup it is needed to unlock.",
          "Keep this generated phrase off websites and screenshots. A password database is optional for storage; it is not required simply to use the generator.",
        ],
        expectedResult:
          "A readable, independently protected record can reconstruct the exact passphrase.",
        help: "Check the wordlist, word count and written order. Do not repair an uncertain phrase by inventing a missing word. For this disposable exercise, generate a fresh phrase and make a clear record.",
      },
      {
        id: "record-check-v4",
        title: "Check the written record before using it",
        instructions: [
          "Count the eight words and verify their order, case and separators against the generated result. Read it back carefully. The next lesson will use it in a disposable encrypted wallet and prove the record through signing.",
        ],
        expectedResult:
          "The record unambiguously reproduces the generated test phrase; the following wallet exercise will test it.",
        help: "Check the wordlist, word count and written order. Do not repair an uncertain phrase by inventing a missing word. For this disposable exercise, generate a fresh phrase and make a clear record.",
      },
    ],
    chapter: "Operate one Core wallet",
    optional: false,
    sourceReviewed: "2026-09-14",
    takeaway:
      "Use KeePassXC’s bundled large list on clean Debian: eight independent words provide about 103.39 bits with fewer manual operations.",
    notes: [
      "Implementation reviewed: Debian 13 Stable amd64 keepassxc-minimal 2.7.10+dfsg1-1 with libbotan-2-19 2.19.5+dfsg-4. Random.cpp selects Botan::System_RNG. The inspected Debian Botan build enables the device RNG path and sets BOTAN_SYSTEM_RNG_DEVICE to /dev/urandom; its library contains that path. This is a request to Linux’s kernel random generator, not an internet service. Other versions or builds may use a different system interface.",
      "The device path reads bytes from /dev/urandom. It does not itself wait for initial seeding as Linux’s getrandom interface normally does. This procedure assumes a normally booted, maintained physical Debian desktop with initialized kernel randomness. Early-boot software, copied virtual-machine state and unusual embedded systems need their own review; this source inspection does not certify every platform.",
      "PassphraseGenerator.cpp loads words into a set that removes duplicates, then requests a random index for each word. Random::randomUInt rejects the small upper tail of a 32-bit draw before taking its remainder modulo the list size. Without that rejection, some indexes could receive more possible draws than others. For 7,772 words, 4,294,962,640 values are accepted, exactly 552,620 per index; 4,656 values are rejected and redrawn. Uniform bytes therefore produce uniform word selections.",
      "The packaged list and source list were byte-identical, with 7,772 distinct entries even after lowercase conversion. Each word is chosen independently, with replacement, so duplicates in the generated phrase are allowed. The generator’s source default is seven words; explicitly select the course’s eight-word default rather than relying on a factory or saved setting.",
    ],
  },
  {
    id: "signet-encrypt-new-backup",
    slug: "encrypt-signet-wallet-and-create-new-backup",
    title: "Protect the test wallet with a password and back it up",
    summary:
      "Save a new backup after encryption and record its password separately.",
    objective:
      "Save a new backup after encryption and record its password separately.",
    estimatedTime: "15-20 min",
    status: "published",
    verification: "source-reviewed",
    referenceVersion: "Bitcoin Core 31.1",
    explanation: [
      "Encryption makes the private key material in the wallet file unusable without the passphrase. Core calls the wallet password a passphrase. It protects a locked backup while you preserve a separate, recoverable record of that credential.",
      "When this Core version first encrypts the wallet, it replaces the starting secret used for new keys and refreshes its prepared keys. A backup made before encryption will not cover the new keys. Make the new backup immediately, before receiving coins, and keep the password in a separate recoverable place.",
    ],
    sources: [
      {
        label: "Bitcoin Core 31.1 — Managing the wallet",
        url: "https://github.com/bitcoin/bitcoin/blob/v31.1/doc/managing-wallets.md",
      },
      {
        label: "Bitcoin Core 31.1 — Files and Data Directories",
        url: "https://github.com/bitcoin/bitcoin/blob/v31.1/doc/files.md",
      },
      {
        label: "Bitcoin Core 31.1: encryption and change-passphrase dialogs",
        url: "https://github.com/bitcoin/bitcoin/blob/v31.1/src/qt/askpassphrasedialog.cpp",
      },
      {
        label: "EFF: original large wordlist (7,776 entries)",
        url: "https://www.eff.org/files/2016/07/18/eff_large_wordlist.txt",
      },
    ],
    codeBlocks: [],
    callouts: [
      {
        kind: "warning",
        title: "Make a new backup after encryption",
        body: "Core 31.1 replaces its pool of prepared keys and creates a new HD seed, the starting secret for generating future keys, when it encrypts the wallet. An earlier backup cannot recover funds received to those new keys. Back up again after changing the wallet password too. If Core migrates an older wallet format and produces several wallets, back up every resulting wallet.",
      },
      {
        kind: "important",
        title: "Encryption does not hide every wallet record",
        body: "Core encrypts private keys. Someone who obtains the file may still see transaction records, public keys and other wallet information.",
      },
    ],
    videoUrl: null,
    origin: "New practical milestone in curriculum v2.1",
    optional: false,
    kind: "practice",
    guidedSteps: [
      {
        id: "context-gui-v4",
        title: "Confirm the selected wallet and network",
        instructions: [
          "Read Signet in the window title and the Network field in Window → Information. Confirm signet-training-wallet is selected. Use a newly generated test-only passphrase from the earlier generation lesson.",
        ],
        expectedResult:
          "The correct named Signet wallet is selected; no console check is needed.",
        help: "Stop at this step if the result differs. Recheck the selected network, wallet and files, then review the linked official documentation. Do not mark the result as confirmed until you can explain the difference.",
      },
      {
        id: "encrypt",
        title: "Encrypt the test wallet",
        instructions: [
          "Choose Settings → Encrypt Wallet in the Core window. Enter your dedicated test password twice in Core's dialog. Passphrase is Core's word for the wallet password; both entries must match.",
          "Read Core's warning about making a fresh backup. Encryption protects the private keys while the wallet is locked. Core has no password-reset option. If this test wallet is already encrypted, use its known test password rather than changing another wallet.",
        ],
        expectedResult:
          "Core confirms encryption and the wallet displays its encrypted state.",
        help: "A forgotten password cannot be reset. If already encrypted, use the known test password; do not guess or change another wallet.",
        warning:
          "Use Signet test coins only. Never reuse these keys or passwords for mainnet.",
      },
      {
        id: "backup",
        title: "Save a post-encryption backup",
        instructions: [
          "With signet-training-wallet selected, choose File → Backup Wallet. Save a new file named signet-training-after-encryption.dat in an existing backup folder outside the active wallet's own folder. The .dat ending identifies the saved data file; the full filename helps you recognize this particular test copy.",
          "Use Core's backup command rather than copying an open wallet database yourself. This new copy is needed because first-time encryption changes the starting secret used for new keys. An older, pre-encryption backup is not a substitute.",
        ],
        expectedResult:
          "Core reports no backup error and the new file exists at the recorded location.",
        help: "Create the destination folder and check write access if saving fails. Copying the live wallet.dat by hand is not the backup procedure.",
        warning:
          "Use Signet test coins only. Never reuse these keys or passwords for mainnet.",
      },
      {
        id: "record",
        title: "Record what recovery needs",
        instructions: [
          "Write down the network, wallet name, Core version, backup date and file location. Keep the test password in a different recoverable place. Someone following the notes should be able to find both without needing the original computer to work.",
          "A second file on the same USB drive does not protect against losing that drive. The public blockchain can be downloaded again, but your private keys and password cannot. You will test the actual backup by restoring and spending in later steps.",
        ],
        expectedResult:
          "You can locate the new backup and its password independently.",
        help: "A copy made before encryption does not cover the new keys. A copy on the same USB is not protection against losing that USB.",
        warning:
          "Use Signet test coins only. Never reuse these keys or passwords for mainnet.",
      },
    ],
    prerequisites: ["generate-passphrase"],
    contentUpdated: "2026-09-14",
    notes: [],
    practicalReview: {
      date: "2026-09-13",
      scope:
        "Core 31.1 macOS GUI dialog/menu inspection and automated Regtest encryption, passphrase-change, old/new backup restoration and signing. Not a full Debian GUI run.",
    },
    chapter: "Operate one Core wallet",
    sourceReviewed: "2026-09-14",
    reviewNote:
      "v4.1 wording, sequence and source review on 2026-09-14. Earlier hands-on evidence is listed separately. This review does not certify a physical Debian installation or funded Signet exercise.",
    why: "Save a new backup after encryption and record its password separately.",
    risk: "A missing or misunderstood step can leave you unable to verify the result or recover the wallet. Demonstrate the outcome before continuing.",
    takeaway:
      "First-time encryption changes the active key-generation roots. Save a fresh backup and preserve its passphrase separately.",
  },
  {
    id: "signet-receive-send",
    slug: "first-signet-receive-and-send",
    title: "Receive test coins and send a small payment to yourself",
    summary:
      "Recognize the amount received, the payment, the fee and any money returned as change.",
    objective:
      "Recognize the amount received, the payment, the fee and any money returned as change.",
    estimatedTime: "15–25 min active + confirmations",
    status: "published",
    verification: "source-reviewed",
    referenceVersion: "Bitcoin Core 31.1",
    reviewNote:
      "v4.1 wording, sequence and source review on 2026-09-14. Earlier hands-on evidence is listed separately. This review does not certify a physical Debian installation or funded Signet exercise.",
    explanation: [
      "A receiving address tells a sender where to pay. It is public information you can share for that payment, not a password or a private key. A Signet faucet is a service that sends small amounts of free test coins to your practice address.",
      "A confirmation means that a transaction has been included in a block. When you later spend a received amount, Core may use more than the payment needs and return the remainder to your own wallet as change. The transaction fee is the difference between everything spent and everything paid out, including that change.",
    ],
    sources: [
      {
        label: "Bitcoin Core 31.1 · Wallet management",
        url: "https://github.com/bitcoin/bitcoin/blob/v31.1/doc/managing-wallets.md",
      },
      {
        label: "Bitcoin Core 31.1 · Offline signing",
        url: "https://github.com/bitcoin/bitcoin/blob/v31.1/doc/offline-signing-tutorial.md",
      },
      {
        label: "Bitcoin Core 31.1 · Wallet RPC source",
        url: "https://github.com/bitcoin/bitcoin/tree/v31.1/src/wallet/rpc",
      },
    ],
    codeBlocks: [],
    videoUrl: null,
    origin: "New curriculum v2 lesson",
    optional: false,
    kind: "practice",
    guidedSteps: [
      {
        id: "receive",
        title: "Request test coins",
        instructions: [
          "Read Signet in the window title and the Network field in Window → Information. Confirm that the node has finished synchronizing. In signet-training-wallet choose Receive → Create new receiving address. Record that address. It is the public destination for this test payment, not a wallet secret.",
          "Use the Signet faucet linked from the official offline-signing tutorial in Sources. A faucet gives out test coins. Give it only the receiving address, never a password or wallet file, and never pay for test coins. A faucet may be unavailable; do not change networks simply to make an address work.",
        ],
        expectedResult:
          "A faucet transaction appears in Core for your recorded address.",
        help: "Faucets may be unavailable or rate-limited. Wait or use another faucet for the same default Signet; do not switch networks to make an address work.",
        warning:
          "Use Signet test coins only. Never reuse these keys or passwords for mainnet.",
      },
      {
        id: "confirmed",
        title: "Wait until the received coins have a confirmation",
        instructions: [
          "Open Transactions and inspect the payment you received. One confirmation means it has been included in a block. Wait for at least one confirmation before using these coins in the exercise.",
          "Open the received transaction’s details in the GUI and record its transaction ID, address and amount. The transaction ID identifies that payment in the history. Check that the confirmed receipt is reflected in the wallet’s available balance. The next coin-control lesson shows the individual unspent amounts.",
        ],
        expectedResult:
          "The received amount has at least one confirmation and Core reports that this wallet can spend it.",
        help: "An unconfirmed receipt is different from a missing receipt. Check chain, synchronization and the exact address before requesting again.",
        warning:
          "Use Signet test coins only. Never reuse these keys or passwords for mainnet.",
      },
      {
        id: "send",
        title: "Review a small self-transfer",
        instructions: [
          "Create another receiving address in your own test wallet. In Send, enter that address and a small amount below your confirmed balance. Leave enough for the fee and the later recovery exercise. This is a self-transfer, a payment between addresses in your own wallet.",
          "Choose a displayed fee rate, the price paid per unit of transaction size. Before sending, compare the full destination, payment amount and total fee in Core's confirmation dialog. Unlock with the test password when requested, then send. If you do not understand the total fee, stop before approving.",
        ],
        expectedResult:
          "Core reports a transaction ID; the transaction pays the second address you recorded.",
        help: "If fee estimation is unavailable, wait for more network data or use a deliberately chosen Signet-only custom fee. Do not press Send without understanding the displayed total.",
        warning:
          "Use Signet test coins only. Never reuse these keys or passwords for mainnet.",
      },
      {
        id: "change",
        title: "Identify the fee and change",
        instructions: [
          "After the payment confirms, inspect it in Core. Inputs are the previously received amounts used to fund the payment. Outputs are the new amounts assigned to addresses. If an input is larger than the payment plus fee, Core can return the remainder to your own wallet as change.",
          "Check the amount sent to your recorded address, any change returning to you and the fee. The fee equals total inputs minus total outputs. Because this payment went to yourself, your overall balance falls only by the fee. Use Core's ownership information to recognize change rather than guessing from the address.",
        ],
        expectedResult:
          "You can identify the recipient, any change, the fee and a confirmation.",
        help: "Change is not another payment to a stranger. Use the wallet's ownership information rather than recognizing an address by sight.",
        warning:
          "Use Signet test coins only. Never reuse these keys or passwords for mainnet.",
      },
    ],
    prerequisites: ["signet-encrypt-new-backup"],
    contentUpdated: "2026-09-14",
    notes: [],
    chapter: "Operate one Core wallet",
    sourceReviewed: "2026-09-14",
    why: "Recognize the amount received, the payment, the fee and any money returned as change.",
    risk: "A missing or misunderstood step can leave you unable to verify the result or recover the wallet. Demonstrate the outcome before continuing.",
    takeaway:
      "Receiving, reviewing and sending are separate checks. Verify the address, amount and fee before authorizing a payment.",
  },
  {
    id: "coin-control-fees",
    slug: "coin-control-fees",
    title: "Choose coins, fees and the final transaction deliberately",
    summary:
      "Understand the information in the Send review before approving it.",
    objective:
      "Understand the information in the Send review before approving it.",
    what: "Understand the information in the Send review before approving it.",
    why: "A payment may spend several earlier receipts and return the remainder to your own wallet.",
    risk: "Choosing the wrong recipient, combining unrelated coins or misreading the fee can create a costly mistake.",
    status: "published",
    verification: "source-reviewed",
    referenceVersion: "Bitcoin Core 31.1",
    contentUpdated: "2026-09-14",
    estimatedTime: "20–40 min active",
    kind: "practice",
    explanation: [
      "A UTXO is an unspent transaction output: a piece of bitcoin available to spend. Think of several received amounts in separate envelopes. A transaction opens whole selected envelopes, pays the recipient and returns any remainder as change.",
      "Coin control lets you choose which outputs to spend. Joining outputs can reveal that they belong to the same spender. A fee rate prices transaction size, not the value sent; sat/vB means satoshis per virtual byte, a measure used for transaction fees.",
    ],
    prerequisites: ["signet-receive-send"],
    sources: [
      {
        label: "Bitcoin Core 31.1: send, fees, coin control and PSBT",
        url: "https://github.com/bitcoin/bitcoin/blob/v31.1/src/qt/sendcoinsdialog.cpp",
      },
      {
        label: "Bitcoin Core 31.1: PSBT dialog",
        url: "https://github.com/bitcoin/bitcoin/blob/v31.1/src/qt/psbtoperationsdialog.cpp",
      },
    ],
    reviewNote:
      "v4.1 wording, sequence and source review on 2026-09-14. Earlier hands-on evidence is listed separately. This review does not certify a physical Debian installation or funded Signet exercise.",
    origin: "First-principles curriculum v4",
    guidedSteps: [
      {
        id: "enable-v4",
        title: "Enable the GUI’s coin-selection controls",
        instructions: [
          "In Core’s wallet preferences, enable coin control features. On Debian this is under Settings → Options → Wallet. Return to Send and open Inputs.",
          "Use only your funded Signet practice wallet. Select a confirmed output and inspect its amount, label, date and confirmations. If it is empty, complete the earlier practice receipt first.",
        ],
        expectedResult:
          "The selected inputs and amount are visible; you can explain which earlier receipt is being spent.",
        help: "Recheck the selected wallet, confirmed spendable outputs and fee units. A fee rate in satoshis per virtual byte is not the same number as the transaction’s total fee.",
      },
      {
        id: "fee-v4",
        title: "Choose and explain the fee",
        instructions: [
          "Enter a practice recipient address and a small amount. Expand the transaction-fee controls. Choose a confirmation target when estimation is available, or a deliberate custom rate for the test. Read the displayed unit: do not mistake BTC/kvB for sat/vB.",
          "An estimator may be unavailable on a new node or test network. Stop if you cannot interpret the fee. Do not copy a mainnet fee quote into a test blindly or present a Signet example as a current mainnet recommendation.",
        ],
        expectedResult:
          "You can identify the fee rate, unit and estimated total fee before approval.",
        help: "Recheck the selected wallet, confirmed spendable outputs and fee units. A fee rate in satoshis per virtual byte is not the same number as the transaction’s total fee.",
      },
      {
        id: "review-v4",
        title: "Read the transaction, then send test coins",
        instructions: [
          "Compare the full recipient address against the independent record made by the receiving wallet. Check the amount and total fee. Explain the change returning to your own wallet; do not paste a stranger’s “change address”.",
          "Approve only the test payment you intended. Core may ask to unlock the encrypted wallet for signing. In Transactions, inspect the result and wait for a confirmation before treating the exercise as complete.",
        ],
        expectedResult:
          "The intended practice recipient receives the intended amount and you can account for the inputs, fee and change.",
        help: "Recheck the selected wallet, confirmed spendable outputs and fee units. A fee rate in satoshis per virtual byte is not the same number as the transaction’s total fee.",
      },
    ],
    chapter: "Operate one Core wallet",
    optional: false,
    sourceReviewed: "2026-09-14",
    takeaway:
      "Coin control chooses which spendable outputs a payment consumes. The fee depends on transaction size and the selected fee rate.",
  },
  {
    id: "signet-restore",
    slug: "back-up-remove-test-wallet-and-restore",
    title: "Rebuild the test wallet from its backup",
    summary:
      "Check that the restored wallet recognizes the address and payment you recorded.",
    objective:
      "Check that the restored wallet recognizes the address and payment you recorded.",
    estimatedTime: "10–15 min",
    status: "published",
    verification: "source-reviewed",
    referenceVersion: "Bitcoin Core 31.1",
    explanation: [
      "Restoring means asking Core to create a usable wallet from your saved backup file. We give the restored copy a different name and keep the original closed. Nothing needs to be deleted for this exercise.",
      "Core may scan stored blocks to find payments belonging to the restored wallet. This is a rescan. Compare the address and transaction you recorded in the receive/send exercise. The following send-again lesson will prove that the restored keys and recorded passphrase can authorize a new payment.",
    ],
    sources: [
      {
        label: "Bitcoin Core 31.1 — Managing the wallet",
        url: "https://github.com/bitcoin/bitcoin/blob/v31.1/doc/managing-wallets.md",
      },
      {
        label: "Bitcoin Core 31.1 — Files and Data Directories",
        url: "https://github.com/bitcoin/bitcoin/blob/v31.1/doc/files.md",
      },
    ],
    codeBlocks: [],
    videoUrl: null,
    origin:
      "Create/encrypt/back up/unload/restore/unlock flow reproduced on Bitcoin Core 31.1",
    optional: false,
    kind: "practice",
    guidedSteps: [
      {
        id: "record",
        title: "Record the payment details and close the original wallet",
        instructions: [
          "Record an address that received test coins and its transaction ID. Select File → Close Wallet for signet-training-wallet. Closing unloads it from Core; it does not delete the files.",
          "Keep the original files intact and locate signet-training-after-encryption.dat separately. This ensures that recovery uses the backup rather than the original wallet. The original must stay closed during this exercise and the next payment.",
        ],
        expectedResult:
          "The original test wallet is closed and you can locate the post-encryption backup independently.",
        help: "Do not move a directory whose identity you cannot prove. Never touch another wallet or the blockchain folders.",
        warning:
          "Use Signet test coins only. Never reuse these keys or passwords for mainnet.",
      },
      {
        id: "restore",
        title: "Restore under a new name",
        instructions: [
          "Choose File → Restore Wallet. Name the restored wallet signet-training-restored, select the saved signet-training-after-encryption.dat file and complete the restore. Keep signet-training-wallet closed. If Core needs to scan blocks, let the scan finish before judging the result.",
          "Confirm the restored wallet name in the window and its encryption state in the padlock indicator. Once the rescan is complete, open the recorded incoming transaction’s details and compare its receiving address with your notes. Receive-request history and labels added after the backup may be absent; rescanning the blockchain does not reconstruct those local records.",
          "Wait for the Signet node to catch up before comparing transaction history. The later send-again exercise proves signing capability; a familiar balance alone does not.",
        ],
        expectedResult:
          "The intended restored wallet recognizes the recorded address and displays its encryption state.",
        help: "If the name exists, use a fresh test data directory rather than overwrite it. If pruned blocks are missing, recover against a node with the required history or download and validate that history again.",
        warning:
          "Use Signet test coins only. Never reuse these keys or passwords for mainnet.",
      },
      {
        id: "compare",
        title: "Compare the restored wallet with your records",
        instructions: [
          "Find the address and transaction ID you recorded before closing the original. Check them in signet-training-restored and keep signet-training-wallet closed. The restored wallet should recognize the expected received amounts that remain available to spend.",
          "Compare a recorded address, not only the next new address each wallet creates. Wallets can be at different positions in their address sequences. Seeing a balance is only the first check; sending from the restored copy next will test access to the signing keys.",
        ],
        expectedResult:
          "The restored wallet recognizes the recorded transaction and the amounts that should still be available to spend.",
        help: "Compare an address you recorded earlier, not just the next address each wallet generates. The wallets may be at different positions in their address sequences. A visible balance alone does not prove that you can sign.",
        warning:
          "Use Signet test coins only. Never reuse these keys or passwords for mainnet.",
      },
    ],
    prerequisites: ["coin-control-fees"],
    contentUpdated: "2026-09-14",
    notes: [],
    practicalReview: {
      date: "2026-09-13",
      scope:
        "Core 31.1 macOS GUI dialog/menu inspection and automated Regtest encryption, passphrase-change, old/new backup restoration and signing. Not a full Debian GUI run.",
    },
    chapter: "Operate one Core wallet",
    sourceReviewed: "2026-09-14",
    reviewNote:
      "v4.1 wording, sequence and source review on 2026-09-14. Earlier hands-on evidence is listed separately. This review does not certify a physical Debian installation or funded Signet exercise.",
    why: "Check that the restored wallet recognizes the address and payment you recorded.",
    risk: "A missing or misunderstood step can leave you unable to verify the result or recover the wallet. Demonstrate the outcome before continuing.",
    takeaway:
      "Restoring a file should reproduce recorded wallet information. A later payment must also prove that the recovered keys can sign.",
  },
  {
    id: "signet-transact-again",
    slug: "send-again-after-signet-recovery",
    title: "Prove that the restored wallet can send",
    summary:
      "Send a confirmed test payment using only the wallet restored from backup.",
    objective:
      "Send a confirmed test payment using only the wallet restored from backup.",
    estimatedTime: "10–15 min",
    status: "published",
    verification: "source-reviewed",
    referenceVersion: "Bitcoin Core 31.1",
    reviewNote:
      "v4.1 wording, sequence and source review on 2026-09-14. Earlier hands-on evidence is listed separately. This review does not certify a physical Debian installation or funded Signet exercise.",
    explanation: [
      "A wallet can display a balance even when it cannot sign. This exercise checks the missing piece: whether your recovered wallet and password can actually approve a payment.",
      "Keep the original wallet closed. Send a small amount to another address in your own restored test wallet, then wait for a confirmation. Record the transaction ID, the reference number that identifies this payment in the transaction history.",
    ],
    sources: [
      {
        label: "Bitcoin Core 31.1 — Managing the wallet",
        url: "https://github.com/bitcoin/bitcoin/blob/v31.1/doc/managing-wallets.md",
      },
      {
        label: "BIP 325 — Signet",
        url: "https://github.com/bitcoin/bips/blob/master/bip-0325.mediawiki",
      },
    ],
    codeBlocks: [],
    videoUrl: null,
    origin: "New curriculum v2 lesson",
    optional: false,
    kind: "practice",
    guidedSteps: [
      {
        id: "selected",
        title: "Select only the restored wallet",
        instructions: [
          "Confirm Signet and a synchronized node, then select signet-training-restored. Keep signet-training-wallet closed. Create a fresh receiving address in the restored wallet and record it as the destination for a small self-transfer.",
          "The wallet selector tells you which wallet Core is acting on. If the original is selected, change it before continuing: a payment signed by the original would not test the backup you restored.",
        ],
        expectedResult:
          "The sending wallet is the restored wallet and you have a fresh destination you own.",
        help: "If the original wallet is selected, stop; a signature from it would not demonstrate recovery.",
        warning:
          "Use Signet test coins only. Never reuse these keys or passwords for mainnet.",
      },
      {
        id: "spend",
        title: "Sign and confirm another test transaction",
        instructions: [
          "Repeat the small self-transfer from the receive/send lesson, now using signet-training-restored. Check the full destination, amount, any change returning to you and the total fee. Enter the recovered test password only when Core asks for it in the send dialog.",
          "Wait for a confirmation and record the new transaction ID. If the password fails, the keys are missing or the payment does not complete, the recovery test is unfinished. Check the selected wallet and backup before trying again. A visible balance alone does not mean recovery succeeded.",
        ],
        expectedResult:
          "A transaction signed by the restored wallet is confirmed. The original wallet was not needed.",
        help: "A wrong password, missing key or failed transaction means the recovery exercise is unfinished. Return to the backup and selected wallet before trying again.",
        warning:
          "Use Signet test coins only. Never reuse these keys or passwords for mainnet.",
      },
    ],
    prerequisites: ["signet-restore"],
    contentUpdated: "2026-09-14",
    notes: [],
    chapter: "Operate one Core wallet",
    sourceReviewed: "2026-09-14",
    why: "Send a confirmed test payment using only the wallet restored from backup.",
    risk: "A missing or misunderstood step can leave you unable to verify the result or recover the wallet. Demonstrate the outcome before continuing.",
    takeaway:
      "A confirmed payment from the restored wallet proves more than a familiar balance: the recovered signing material actually works.",
  },
  {
    id: "wallet-lock-change",
    slug: "wallet-lock-change",
    title: "Lock, unlock and change the wallet passphrase",
    summary: "Operate encryption without confusing it with the Bitcoin keys.",
    objective: "Operate encryption without confusing it with the Bitcoin keys.",
    what: "Operate encryption without confusing it with the Bitcoin keys.",
    why: "You must know both when signing is authorized and which passphrase unlocks each backup.",
    risk: "Changing the live wallet’s passphrase does not update a backup file you already copied elsewhere.",
    status: "published",
    verification: "source-reviewed",
    referenceVersion: "Bitcoin Core 31.1",
    contentUpdated: "2026-09-14",
    estimatedTime: "20–40 min active",
    kind: "practice",
    explanation: [
      "An encrypted wallet is normally locked for signing. Core asks for the passphrase when a GUI operation needs private keys and ordinarily returns the wallet to its previous locked state afterward. The padlock status describes this state; it is not a button for replacing the keys.",
      "Core 31.1 has Settings → Change Passphrase. It does not have a general-purpose Unlock Wallet menu item. Receiving addresses and viewing transactions normally do not require unlocking; signing does.",
    ],
    prerequisites: ["signet-transact-again"],
    sources: [
      {
        label: "Bitcoin Core 31.1: wallet creation, backup and restoration",
        url: "https://github.com/bitcoin/bitcoin/blob/v31.1/doc/managing-wallets.md",
      },
      {
        label: "Bitcoin Core 31.1: encryption and change-passphrase dialogs",
        url: "https://github.com/bitcoin/bitcoin/blob/v31.1/src/qt/askpassphrasedialog.cpp",
      },
      {
        label: "Bitcoin Core 31.1: wallet GUI actions",
        url: "https://github.com/bitcoin/bitcoin/blob/v31.1/src/qt/bitcoingui.cpp",
      },
      {
        label: "Bitcoin Core 31.1: passphrase derivation and AES encryption",
        url: "https://github.com/bitcoin/bitcoin/blob/v31.1/src/wallet/crypter.cpp",
      },
    ],
    reviewNote:
      "v4.1 wording, sequence and source review on 2026-09-14. Earlier hands-on evidence is listed separately. This review does not certify a physical Debian installation or funded Signet exercise.",
    origin: "First-principles curriculum v4",
    guidedSteps: [
      {
        id: "state-v4",
        title: "Observe the locked wallet",
        instructions: [
          "Select the encrypted test wallet. Hover the padlock indicator and read its status. Open Receive and generate an address without entering a passphrase.",
          "Close and reopen the wallet through File → Close Wallet and File → Open Wallet. Confirm it is encrypted. Repeat a small Signet self-transfer as you already practiced, observe the unlock prompt and check that the wallet returns to its locked state after signing.",
        ],
        expectedResult:
          "You can distinguish viewing or receiving from an operation that needs signing authority.",
        help: "Confirm which test wallet is selected and whether the backup predates the password change. Its own creation date determines which password record you should test.",
      },
      {
        id: "old-copy-v4",
        title: "Make the before-change backup",
        instructions: [
          "Use File → Backup Wallet. Save a copy named with the test wallet name, date and “before-passphrase-change”. Keep it for the later old-backup drill; record which test passphrase belongs to it without putting the passphrase in its filename.",
        ],
        expectedResult:
          "The old encrypted snapshot is clearly identified and remains available for a controlled recovery test.",
        help: "Confirm which test wallet is selected and whether the backup predates the password change. Its own creation date determines which password record you should test.",
      },
      {
        id: "change-v4",
        title: "Change the live test wallet’s passphrase",
        instructions: [
          "Open Settings → Change Passphrase. Enter the old test passphrase and the newly generated test passphrase twice. Read the result. Changing the encryption credential does not change the Bitcoin addresses or revoke old backups. Generate the replacement phrase with the same KeePassXC bundled-list method.",
          "Immediately use File → Backup Wallet again. Give the new copy a distinct name and restore that copy under a distinct test wallet name. Test a signing operation with the new phrase.",
        ],
        expectedResult:
          "The changed live wallet and new backup unlock with the new phrase; the recorded addresses still identify the same wallet.",
        help: "Confirm which test wallet is selected and whether the backup predates the password change. Its own creation date determines which password record you should test.",
      },
      {
        id: "old-state-v4",
        title: "Restore the old snapshot and explain it",
        instructions: [
          "Restore the before-change copy as a separate test wallet. Verify that it still needs its old passphrase. The new passphrase does not retroactively alter that file.",
          "If an old file and its old passphrase were compromised, changing only the current file’s password would not revoke the attacker’s Bitcoin keys. Actual key compromise requires moving the coins to a new securely created wallet and retiring the compromised keys.",
        ],
        expectedResult:
          "You can identify the passphrase and metadata state associated with each backup.",
        warning:
          "This lesson uses disposable test wallets. Do not delete old real backups until current recovery is proven and you have reviewed what the old copies can still reveal.",
        help: "Confirm which test wallet is selected and whether the backup predates the password change. Its own creation date determines which password record you should test.",
      },
    ],
    practicalReview: {
      date: "2026-09-13",
      scope:
        "Core 31.1 macOS GUI dialog/menu inspection and automated Regtest encryption, passphrase-change, old/new backup restoration and signing. Not a full Debian GUI run.",
    },
    chapter: "Operate one Core wallet",
    optional: false,
    sourceReviewed: "2026-09-14",
    takeaway:
      "Core unlocks protected keys when signing needs them. Changing the passphrase does not update old backup copies or replace copied private keys.",
  },
  basicRpcLesson,
  {
    id: "repetition-drills",
    slug: "repetition-drills",
    title: "Repeat until the wallet lifecycle feels ordinary",
    summary: "Practice naming, encryption and recovery more than once.",
    objective: "Practice naming, encryption and recovery more than once.",
    what: "Practice naming, encryption and recovery more than once.",
    why: "A skill that worked once with instructions may still fail under stress.",
    risk: "Unclear names and untested password records can make identical-looking wallets easy to confuse.",
    status: "published",
    verification: "source-reviewed",
    referenceVersion: "Bitcoin Core 31.1",
    contentUpdated: "2026-09-14",
    estimatedTime: "20–40 min active",
    kind: "practice",
    explanation: [
      "Keep this session entirely on Signet. Use the prefix PRACTICE and never reuse these wallets, addresses or passphrases for savings. The point is to make mistakes while they have no financial consequence.",
      "Do the repetitions across more than one session. Speed is not the metric. You should be able to predict the result and explain a discrepancy.",
    ],
    prerequisites: ["basic-rpc"],
    sources: [
      {
        label: "Bitcoin Core 31.1: wallet creation, backup and restoration",
        url: "https://github.com/bitcoin/bitcoin/blob/v31.1/doc/managing-wallets.md",
      },
      {
        label: "Bitcoin Core 31.1: send, fees, coin control and PSBT",
        url: "https://github.com/bitcoin/bitcoin/blob/v31.1/src/qt/sendcoinsdialog.cpp",
      },
    ],
    reviewNote:
      "v4.1 wording, sequence and source review on 2026-09-14. Earlier hands-on evidence is listed separately. This review does not certify a physical Debian installation or funded Signet exercise.",
    origin: "First-principles curriculum v4",
    guidedSteps: [
      {
        id: "ten-v4",
        title: "Create ten named test wallets",
        instructions: [
          "Create PRACTICE-01 through PRACTICE-10 using File → Create Wallet. Open each, produce one receiving address and record the mapping from name to address. Close and reopen several in a different order.",
        ],
        expectedResult:
          "You can select the intended wallet and identify its recorded address without guessing.",
        help: "Use the name-to-address record to identify the correct test wallet. Keep originals closed during restoration and compare a previously recorded address rather than the next newly generated address.",
      },
      {
        id: "three-v4",
        title: "Compare three test passphrases",
        instructions: [
          "Encrypt three empty disposable wallets: one with an obviously predictable test phrase, one with five independently generated KeePassXC words and one with eight from the same bundled large list. The predictable example is deliberately weak; five random words are a comparison, not automatically an unsafe choice.",
          "Observe that accepting a passphrase, looking locked or taking time to unlock does not demonstrate strong entropy. Record the generation method, not the words, in your comparison notes.",
        ],
        expectedResult:
          "You can explain why the same GUI can accept secrets with very different resistance to guessing.",
        warning:
          "Never fund weak test wallets with real bitcoin. The exercise demonstrates a limitation of the UI, not a recommendation.",
        help: "Use the name-to-address record to identify the correct test wallet. Keep originals closed during restoration and compare a previously recorded address rather than the next newly generated address.",
      },
      {
        id: "restore-repeat-v4",
        title: "Repeat backup and restoration",
        instructions: [
          "Back up each of the three encrypted wallets. Restore each under a new test name and compare its recorded receiving address. Repeat on a second session, using the written password record.",
        ],
        expectedResult:
          "Each backup is tied to the correct wallet and you can restore it without a lucky guess.",
        help: "Use the name-to-address record to identify the correct test wallet. Keep originals closed during restoration and compare a previously recorded address rather than the next newly generated address.",
      },
      {
        id: "lifecycle-v41",
        title: "Repeat the complete lifecycle across separate sessions",
        instructions: [
          "Using eight independently generated words, complete CREATE → ENCRYPT → BACK UP → RECEIVE → SPEND → RESTORE → CHANGE PASSWORD → RESTORE AGAIN. After changing the passphrase, make a fresh backup and restore that new copy with its new phrase. Prove signing from the restored copy.",
          "Repeat this whole cycle in another session with a fresh disposable wallet and phrase. Keep originals closed during restore tests. Record the addresses, confirmed transactions and which phrase belongs to each backup. If anything differs, explain it before continuing.",
        ],
        expectedResult:
          "You have repeated the entire cycle, including password changes and a second successful restore, without depending on the working copy.",
        help: "Use the name-to-address record to identify the correct test wallet. Keep originals closed during restoration and compare a previously recorded address rather than the next newly generated address.",
      },
    ],
    chapter: "Operate one Core wallet",
    optional: false,
    sourceReviewed: "2026-09-14",
    takeaway:
      "A reliable workflow is one you can repeat, including password changes and recovery, without improvising from memory.",
  },
  {
    id: "signet-readiness",
    slug: "mainnet-readiness-signet-checkpoint",
    title: "Check that you completed the whole practice cycle",
    summary: "Confirm what you did in the complete one-wallet practice cycle.",
    objective:
      "Confirm what you did in the complete one-wallet practice cycle.",
    estimatedTime: "5-10 min",
    status: "published",
    verification: "source-reviewed",
    referenceVersion: "Bitcoin Core 31.1",
    explanation: [
      "You should now have created a test wallet, encrypted it, saved a backup, received and sent test coins, restored the backup and sent again from the restored wallet. If a step did not work, return to it before continuing.",
      "The checkboxes on this website record what you say you completed. They cannot inspect Core, your wallet or your transactions. Completion requires published, source-reviewed content and your own recorded results. Practical testing by the author is listed separately in each lesson’s review details.",
    ],
    checklist: [
      "I restored the post-encryption backup while the original wallet stayed closed.",
      "I signed and confirmed another transaction from the restored wallet.",
      "I can identify the network, recipient, change and fee without guessing.",
    ],
    sources: [
      {
        label: "Bitcoin Core 31.1 — Managing the wallet",
        url: "https://github.com/bitcoin/bitcoin/blob/v31.1/doc/managing-wallets.md",
      },
      {
        label: "BIP 325 — Signet",
        url: "https://github.com/bitcoin/bips/blob/master/bip-0325.mediawiki",
      },
    ],
    callouts: [
      {
        kind: "mental-model",
        title: "Your first complete recovery",
        body: "You created, encrypted and backed up a practice wallet, then received and sent test coins. With the original wallet closed, you restored the backup and sent again. You have now exercised the recovery procedure without risking real bitcoin.",
      },
    ],
    videoUrl: null,
    origin: "New checkpoint in curriculum v2.1",
    optional: false,
    kind: "checkpoint",
    prerequisites: ["repetition-drills"],
    contentUpdated: "2026-09-14",
    notes: [],
    chapter: "Operate one Core wallet",
    sourceReviewed: "2026-09-14",
    reviewNote:
      "v4.1 wording, sequence and source review on 2026-09-14. Earlier hands-on evidence is listed separately. This review does not certify a physical Debian installation or funded Signet exercise.",
    why: "Confirm what you did in the complete one-wallet practice cycle.",
    risk: "A missing or misunderstood step can leave you unable to verify the result or recover the wallet. Demonstrate the outcome before continuing.",
    takeaway:
      "You have practiced the complete test-wallet lifecycle. This checkpoint records your results; it cannot independently verify your computer.",
  },
  {
    id: "2.6",
    title: "Find the wallet data that needs a backup",
    summary:
      "Distinguish the wallet file from the much larger public blockchain data.",
    status: "published",
    what: "We learn how to locate the wallet directory and document what the built-in backup includes in the Bitcoin Core version we use.",
    why: "Base recovery on a backup procedure you have tested, rather than assuming a familiar filename is all you need.",
    risk: "Manually copying an active database or moving files at random can produce an unusable copy. Use the built-in backup process and test the restore.",
    sources: [
      {
        label: "Bitcoin Core 31.1 — Files and Data Directories",
        url: "https://github.com/bitcoin/bitcoin/blob/v31.1/doc/files.md",
      },
      {
        label: "Bitcoin Core 31.1 — Managing the wallet",
        url: "https://github.com/bitcoin/bitcoin/blob/v31.1/doc/managing-wallets.md",
      },
    ],
    videoUrl: null,
    slug: "wallet-backup-vs-node-data",
    objective:
      "Distinguish the wallet file from the much larger public blockchain data.",
    estimatedTime: "8–12 min",
    verification: "source-reviewed",
    referenceVersion: "Bitcoin Core 31.1",
    explanation: [
      "Core's data directory is the folder where it stores its working files. It can contain blockchain blocks, a database called chainstate that tracks currently unspent amounts, and wallet folders. wallet.dat is a wallet database file, not the blockchain itself.",
      "Use Core's File → Backup Wallet command to make a wallet backup. Do not assume that copying an open database by hand produces a usable copy. Record where the backup is saved and keep its password separately. The blockchain can be downloaded again; a lost wallet secret cannot.",
    ],
    origin: "Moved from legacy module 2",
    optional: false,
    kind: "reading",
    contentUpdated: "2026-09-14",
    notes: [],
    chapter: "Prove backup and recovery",
    sourceReviewed: "2026-09-14",
    reviewNote:
      "v4.1 wording, sequence and source review on 2026-09-14. Earlier hands-on evidence is listed separately. This review does not certify a physical Debian installation or funded Signet exercise.",
    takeaway:
      "Wallet backups preserve wallet information. Public blockchain data serves a different purpose and can be downloaded and validated again.",
    prerequisites: ["signet-readiness"],
  },
  {
    id: "backup-redundancy-freshness",
    slug: "more-copies-do-not-mean-a-current-backup",
    title: "Keep backups separate and up to date",
    summary:
      "Check both how many usable copies you have and whether they cover your current wallet.",
    objective:
      "Check both how many usable copies you have and whether they cover your current wallet.",
    estimatedTime: "12-16 min",
    status: "published",
    verification: "source-reviewed",
    referenceVersion: "Bitcoin Core 31.1",
    explanation: [
      "Redundancy means keeping copies that will not all disappear in the same failure. Two files on one USB drive do not protect against losing that drive. Separate devices and locations can protect against different failures. Freshness means the backup includes the wallet's current keys, settings and other information you need to recover.",
      "Make a fresh backup after encryption, a wallet-password change or importing new keys or descriptors. Save a new copy when newer labels or other wallet records matter too. Modern wallets derive new keys from a saved starting secret, so creating a new receiving address does not, by itself, require another backup. Changing the active wallet password does not change passwords on old backup files, and it cannot revoke keys someone has copied.",
    ],
    concepts: [
      "Redundancy means having independent copies. Consider the devices and locations: one fire or failed disk must not destroy every copy.",
      "Freshness means the backup still contains what recovery needs after changes to the wallet.",
      "Wallet metadata includes labels and other records you add. An older backup can be missing these even when it can recover the keys.",
    ],
    checklist: [
      "I know how many independent backup copies I will keep and where.",
      "I know to make a new backup after encryption or a wallet-password change.",
      "If Core converts an old wallet format into several wallets, I will back up each resulting wallet.",
      "In a recovery drill, I check needed labels and wallet records as well as the balance.",
    ],
    sources: [
      {
        label: "Bitcoin Core 31.1 — Managing the wallet",
        url: "https://github.com/bitcoin/bitcoin/blob/v31.1/doc/managing-wallets.md",
      },
      {
        label: "Bitcoin Core 31.1 — Files and Data Directories",
        url: "https://github.com/bitcoin/bitcoin/blob/v31.1/doc/files.md",
      },
    ],
    callouts: [
      {
        kind: "important",
        title: "Check both independence and freshness",
        body: "Several files on one disk share a point of failure. Several old copies can all be missing a later wallet change. Check where your backups are and what each can restore.",
      },
    ],
    videoUrl: null,
    origin: "New backup mental model in curriculum v2.1",
    optional: false,
    kind: "checkpoint",
    prerequisites: ["2.6"],
    contentUpdated: "2026-09-14",
    notes: [
      "Labels are information you supply. Reading the blockchain again cannot reconstruct them. A newer backup may be needed to recover those records even if an older copy can still recover the money.",
      "Refresh backups after encryption, password changes and imported keys or address descriptions. Also refresh them when newly added wallet records matter for recovery. Changing a password does not encrypt old copies again or take back keys someone copied. If keys may have been stolen, secure the environment and move to new keys.",
    ],
    chapter: "Prove backup and recovery",
    sourceReviewed: "2026-09-14",
    reviewNote:
      "v4.1 wording, sequence and source review on 2026-09-14. Earlier hands-on evidence is listed separately. This review does not certify a physical Debian installation or funded Signet exercise.",
    why: "Check both how many usable copies you have and whether they cover your current wallet.",
    risk: "A missing or misunderstood step can leave you unable to verify the result or recover the wallet. Demonstrate the outcome before continuing.",
    takeaway:
      "More copies protect against failed media; current copies preserve later wallet changes. You need to manage both.",
  },
  {
    id: "encrypted-backup-privacy",
    slug: "digital-and-cloud-backup-privacy-model",
    title: "Understand what an encrypted backup still reveals",
    summary: "Understand how key protection differs from financial privacy.",
    objective: "Understand how key protection differs from financial privacy.",
    estimatedTime: "10-14 min",
    status: "published",
    verification: "source-reviewed",
    referenceVersion: "Bitcoin Core 31.1",
    explanation: [
      "Core wallet encryption protects private-key material. It does not necessarily hide public keys, addresses, transaction records or labels. These records are often called metadata: information about the wallet's activity rather than the secret needed to sign a payment.",
      "Someone who obtains the file may learn about your finances even if the password prevents spending. Cloud storage can make a copy available after local devices fail, but it also gives a third party a stored copy and adds online exposure. If you use an additional encrypted container to hide the entire file, include that container and its password in the recovery test. Extra protection also creates another thing you must recover.",
    ],
    checklist: [
      "I can distinguish someone gaining the ability to spend from someone learning my payment history.",
      "I understand the extra exposure and recovery benefits of cloud storage.",
      "I keep the encrypted backup and its password in separate places, and can recover each.",
    ],
    sources: [
      {
        label: "Bitcoin Core 31.1 — Managing the wallet",
        url: "https://github.com/bitcoin/bitcoin/blob/v31.1/doc/managing-wallets.md",
      },
      {
        label: "Bitcoin Core 31.1 — Files and Data Directories",
        url: "https://github.com/bitcoin/bitcoin/blob/v31.1/doc/files.md",
      },
    ],
    callouts: [
      {
        kind: "warning",
        title: "Encrypted does not mean private",
        body: "Assess separately whether an attacker could spend funds, what they could learn about the wallet, and how strong the passphrase is. Only then decide whether online storage is acceptable for your threat model.",
      },
    ],
    videoUrl: null,
    origin: "New privacy layer backup model in curriculum v2.1",
    optional: false,
    kind: "checkpoint",
    prerequisites: ["backup-redundancy-freshness"],
    contentUpdated: "2026-09-14",
    notes: [
      "Cloud storage is therefore a tradeoff: it can improve redundancy and availability, but adds a third party, online exposure, and potential privacy leakage to the threat model. It is not a universal recommendation.",
    ],
    chapter: "Prove backup and recovery",
    sourceReviewed: "2026-09-14",
    reviewNote:
      "v4.1 wording, sequence and source review on 2026-09-14. Earlier hands-on evidence is listed separately. This review does not certify a physical Debian installation or funded Signet exercise.",
    why: "Understand how key protection differs from financial privacy.",
    risk: "A missing or misunderstood step can leave you unable to verify the result or recover the wallet. Demonstrate the outcome before continuing.",
    takeaway:
      "Core encrypts private key material, not all wallet metadata. A locked backup still deserves financial privacy protection.",
  },
  {
    id: "backup-media",
    slug: "backup-media",
    title: "Choose backup media by failure mode",
    summary: "Select a small set of independent copies you can maintain.",
    objective: "Select a small set of independent copies you can maintain.",
    what: "Select a small set of independent copies you can maintain.",
    why: "Several copies help only if one event cannot destroy all of them.",
    risk: "Media can age, lose bits, disappear, be tampered with or become unreadable on future computers.",
    status: "published",
    verification: "source-reviewed",
    referenceVersion: "Bitcoin Core 31.1",
    contentUpdated: "2026-09-14",
    estimatedTime: "8–12 min",
    kind: "reading",
    explanation: [
      "Redundancy means having recoverable copies after one fails. A control policy defines who must authorize a spend. Several encrypted single-sig backups improve redundancy without adding another required signer.",
      "Start with a current Core backup, a separately recoverable passphrase and at least two deliberately separated locations appropriate to your threats. Choose media you can read and test. The comparison below is a menu of trade-offs, not a shopping list.",
      "No medium has a guaranteed unattended lifetime. Bit rot means stored bits changing or becoming unreadable over time. A checksum can detect some changes but cannot repair a damaged file; another tested copy provides recovery. Inspect and restore periodically.",
    ],
    prerequisites: ["encrypted-backup-privacy"],
    sources: [
      {
        label: "Bitcoin Core 31.1: wallet creation, backup and restoration",
        url: "https://github.com/bitcoin/bitcoin/blob/v31.1/doc/managing-wallets.md",
      },
      {
        label: "Bitcoin Core 31.1: data files",
        url: "https://github.com/bitcoin/bitcoin/blob/v31.1/doc/files.md",
      },
    ],
    reviewNote:
      "v4.1 wording, sequence and source review on 2026-09-14. Earlier hands-on evidence is listed separately. This review does not certify a physical Debian installation or funded Signet exercise.",
    origin: "First-principles curriculum v4",
    widget: "backup-media",
    chapter: "Prove backup and recovery",
    optional: false,
    sourceReviewed: "2026-09-14",
    takeaway:
      "Choose copies whose failure modes differ. Test readability and restoration rather than relying on a promised storage lifetime.",
  },
  {
    id: "recovery-failure-drills",
    slug: "recovery-failure-drills",
    title: "Recover after losing the local wallet or a backup device",
    summary:
      "Make the original working copy unavailable and recover from your planned alternatives.",
    objective:
      "Make the original working copy unavailable and recover from your planned alternatives.",
    what: "Make the original working copy unavailable and recover from your planned alternatives.",
    why: "A backup is demonstrated by restoring and using it, not by seeing its filename.",
    risk: "The apparent “backup” may be the only remaining copy or may depend on the failed computer.",
    status: "published",
    verification: "source-reviewed",
    referenceVersion: "Bitcoin Core 31.1",
    contentUpdated: "2026-09-14",
    estimatedTime: "20–40 min active",
    kind: "practice",
    explanation: [
      "Use only the named disposable practice wallet. Before removing a working copy, make two backups, restore one successfully and record the test wallet’s address and transaction identifiers.",
      "In this stage, restore into a fresh named wallet on the same dedicated practice computer. This proves that recovery does not need the local working wallet or one particular backup medium. It does not yet prove recovery after the computer itself fails; that separate exercise comes later.",
    ],
    prerequisites: ["backup-media"],
    sources: [
      {
        label: "Bitcoin Core 31.1: wallet creation, backup and restoration",
        url: "https://github.com/bitcoin/bitcoin/blob/v31.1/doc/managing-wallets.md",
      },
      {
        label: "Bitcoin Core 31.1: data files",
        url: "https://github.com/bitcoin/bitcoin/blob/v31.1/doc/files.md",
      },
    ],
    reviewNote:
      "v4.1 wording, sequence and source review on 2026-09-14. Earlier hands-on evidence is listed separately. This review does not certify a physical Debian installation or funded Signet exercise.",
    origin: "First-principles curriculum v4",
    guidedSteps: [
      {
        id: "isolate-original-v4",
        title: "Remove only the disposable local test copy",
        instructions: [
          "Close the test wallet in Core and then shut Core down cleanly. In your dedicated practice data directory, locate only the wallet subfolder whose name you recorded for this drill. Move that entire subfolder to a clearly marked quarantine folder outside Core’s wallet directory, or to the recoverable Trash.",
          "This simulates losing the live wallet without requiring irreversible deletion. Do not delete the whole data directory, an unknown wallet folder or either backup. Do not empty the Trash. Restart Core and confirm that this specific wallet is no longer available to open.",
        ],
        expectedResult:
          "The original working wallet is unavailable, while two separate backup copies remain.",
        warning:
          "Stop if the path or wallet name is uncertain. This removal exercise must never target your real wallet or your only copy.",
        help: "Keep the unavailable original set aside. If recovery needs a file, password or instruction that exists only there, the drill has found a missing dependency: fix the backup plan and repeat.",
      },
      {
        id: "restore-survivor-v4",
        title: "Restore the surviving backup",
        instructions: [
          "Use File → Restore Wallet with the chosen backup and a new practice name. Wait for the online practice node to synchronize and scan the relevant history. Compare your recorded address and confirmed transactions.",
          "Use the recorded passphrase to send a new small Signet payment. A balance display alone does not establish signing capability.",
        ],
        expectedResult:
          "The recovered wallet can authorize a new confirmed practice payment.",
        help: "Keep the unavailable original set aside. If recovery needs a file, password or instruction that exists only there, the drill has found a missing dependency: fix the backup plan and repeat.",
      },
      {
        id: "failed-usb-v4",
        title: "Pretend one USB has failed",
        instructions: [
          "Set one backup USB aside and do not use it. Recover from the other planned location. Record which equipment, software and password record were actually needed.",
        ],
        expectedResult:
          "Loss of one medium does not prevent recovery; both copies were not dependent on that medium.",
        help: "Keep the unavailable original set aside. If recovery needs a file, password or instruction that exists only there, the drill has found a missing dependency: fix the backup plan and repeat.",
      },
    ],
    chapter: "Prove backup and recovery",
    optional: false,
    sourceReviewed: "2026-09-14",
    takeaway:
      "Recovery is credible only when the normal working copy or one backup location is genuinely unavailable during the rehearsal.",
  },
  {
    id: "backup-mastery",
    slug: "backup-mastery",
    title: "Checkpoint — prove backup and recovery",
    summary: "Demonstrate the skills before adding the next building block.",
    objective: "Demonstrate the skills before adding the next building block.",
    what: "Demonstrate the skills before adding the next building block.",
    why: "A familiar-looking screen is not evidence that you can recover or operate the system.",
    risk: "Skipping a missing skill turns the next layer into something you cannot diagnose.",
    status: "published",
    verification: "source-reviewed",
    referenceVersion: "Bitcoin Core 31.1",
    contentUpdated: "2026-09-14",
    estimatedTime: "8–12 min",
    kind: "checkpoint",
    explanation: [
      "Do this without following the earlier lesson line by line. If you need the instructions, return to the exercise, repeat it, and try again later.",
      "Tick each outcome only after you have demonstrated it. These checks record your own assessment in this browser; they are not a certification or a substitute for the actual exercise.",
    ],
    prerequisites: ["recovery-failure-drills"],
    sources: [
      {
        label: "Bitcoin Core 31.1: wallet creation, backup and restoration",
        url: "https://github.com/bitcoin/bitcoin/blob/v31.1/doc/managing-wallets.md",
      },
    ],
    reviewNote:
      "v4.1 wording, sequence and source review on 2026-09-14. Earlier hands-on evidence is listed separately. This review does not certify a physical Debian installation or funded Signet exercise.",
    origin: "First-principles curriculum v4",
    checklist: [
      "I can say what my wallet backup contains and which later changes it cannot contain.",
      "I can restore a fresh named wallet on this computer using an independent backup and separately stored passphrase.",
      "I can explain which passphrase an old backup still requires after a password change.",
      "I can recover when one backup medium is unavailable.",
      "I can distinguish backup redundancy from changing who may authorize spending.",
    ],
    chapter: "Prove backup and recovery",
    optional: false,
    sourceReviewed: "2026-09-14",
    takeaway:
      "You can recover from an independent copy, explain its password state and identify which failures your remaining copies would survive.",
  },
  {
    id: "one-wallet-mastery",
    slug: "one-wallet-mastery",
    title: "Mastery checkpoint — I can operate one Core wallet",
    summary: "Make one Core wallet ordinary before adding another computer.",
    objective:
      "Demonstrate the whole wallet lifecycle without following the tutorial.",
    what: "Demonstrate the skills before adding the next building block.",
    why: "A new security boundary is easier to understand once the wallet itself is familiar.",
    risk: "Adding hardware before recovery is routine hides missing basic skills.",
    status: "published",
    verification: "source-reviewed",
    referenceVersion: "Bitcoin Core 31.1",
    contentUpdated: "2026-09-14",
    estimatedTime: "Repeat over separate practice sessions",
    kind: "checkpoint",
    explanation: [
      "Use only disposable Signet material on your dedicated Debian practice computer. Complete these outcomes without following the tutorial line by line. Return to any exercise that still requires guessing and try again in another session.",
      "The local-copy loss test uses the recoverable Trash or a quarantine folder after Core is shut down. It removes the working wallet from use without requiring irreversible deletion. Never remove your real wallet or the only surviving copy.",
      "The intended result is simple: operating a basic Bitcoin Core wallet now feels ordinary. Once that is true, the next stage separates work you already understand between two computers.",
    ],
    prerequisites: ["backup-mastery"],
    sources: [
      {
        label: "Bitcoin Core 31.1: wallet creation, backup and restoration",
        url: "https://github.com/bitcoin/bitcoin/blob/v31.1/doc/managing-wallets.md",
      },
    ],
    reviewNote:
      "v4.1 source and sequence review. Debian package files and generator implementation were inspected; this is not a physical Debian installation or a funded Signet test.",
    origin: "First-principles curriculum v4",
    checklist: [
      "I can install and authenticate the intended Bitcoin Core release.",
      "I can create and name a wallet without following a tutorial.",
      "I can generate a receiving address and verify it against my wallet record.",
      "I can receive and send Signet bitcoin and check the confirmation.",
      "I can encrypt the wallet using an independently generated passphrase.",
      "I can explain what the passphrase protects and what it does not hide.",
      "I can observe locking, unlock for signing and check the locked state afterward.",
      "I can change the passphrase and verify the result.",
      "I can make a current wallet backup and locate its separate password record.",
      "I can restore from the backup and prove signing with the original closed.",
      "I can explain which keys, records and password state an old backup does and does not contain.",
      "I can recover after removing the disposable local wallet copy and after setting one backup medium aside.",
    ],
    chapter: "Prove backup and recovery",
    optional: false,
    sourceReviewed: "2026-09-14",
    takeaway:
      "One wallet now feels ordinary. You are ready to separate verification and payment coordination from private-key signing.",
  },
  {
    id: "architecture-choice",
    slug: "simple-wallet-or-offline-signer",
    title: "Separate the jobs you already know",
    summary: "Move signing offline after mastering one Core wallet.",
    objective:
      "Explain the online and offline jobs of the recommended savings setup.",
    estimatedTime: "12-16 min",
    status: "published",
    verification: "source-reviewed",
    referenceVersion: "Bitcoin Core 31.1",
    explanation: [
      "You already know how a Core wallet receives, signs, encrypts and recovers. We are now separating two jobs, using the same Debian and Bitcoin Core foundation. Complete the one-wallet mastery checkpoint before building this stage.",
      "The online computer verifies blockchain history, keeps the current wallet view, constructs transactions and broadcasts completed payments. The offline computer holds the private signing keys and approves the proposed transactions. A private key is the secret that authorizes spending; it does not need to be online to do that job.",
      "Prepare a second dedicated generic Debian computer as the signer. Its wallet uses the same creation, encryption and backup operations you practiced. The online wallet will be watch-only: it has the public information needed to recognize payments, but cannot sign them. Later lessons introduce public descriptors and PSBT files one at a time.",
      "Create fresh practice keys after disconnecting the signer. Do not turn the previous online practice wallet into a savings wallet by moving its file offline: that cannot undo earlier exposure. Signet material stays disposable throughout.",
    ],
    concepts: [],
    warnings: [],
    checklist: [],
    sources: [
      {
        label: "Debian · Stable releases and support",
        url: "https://www.debian.org/releases/",
      },
      {
        label: "Debian · Installation guide",
        url: "https://www.debian.org/releases/stable/amd64/",
      },
      {
        label: "Debian · Verify installation media",
        url: "https://www.debian.org/CD/verify",
      },
      {
        label: "Core 31.1 · Offline signing",
        url: "https://github.com/bitcoin/bitcoin/blob/v31.1/doc/offline-signing-tutorial.md",
      },
    ],
    codeBlocks: [],
    callouts: [],
    videoUrl: null,
    origin: "New architectural checkpoint in curriculum v2.1",
    optional: false,
    kind: "reading",
    prerequisites: ["one-wallet-mastery"],
    notes: [
      "Debian Stable is the default operating system for both dedicated computers in this course. Its stable releases change less often than fast-release desktop systems, and its mature software repositories make it practical to maintain a dedicated computer for years. That predictability makes maintenance easier to plan. It does not make Debian inherently more secure than Fedora. Fedora and other supported Linux distributions remain alternatives if you can maintain and test them.",
    ],
    commonMistakes: [],
    contentUpdated: "2026-09-14",
    chapter: "Separate node and signer",
    sourceReviewed: "2026-09-14",
    reviewNote:
      "v4.1 wording, sequence and source review on 2026-09-14. Earlier hands-on evidence is listed separately. This review does not certify a physical Debian installation or funded Signet exercise.",
    why: "Keeping private keys off the network reduces their exposure during routine coordination.",
    risk: "Moving keys that have already been online does not erase that earlier exposure.",
    takeaway:
      "The wallet primitives stay the same. The new boundary separates online verification and coordination from offline signing.",
  },
  {
    id: "2.4",
    title: "How the online computer and offline signer work together",
    summary:
      "Follow a proposed payment from preparation through approval to broadcast.",
    status: "published",
    sources: [
      {
        label: "Core 31.1 · Offline signing",
        url: "https://github.com/bitcoin/bitcoin/blob/v31.1/doc/offline-signing-tutorial.md",
      },
      {
        label: "Debian · Stable releases and support",
        url: "https://www.debian.org/releases/",
      },
      {
        label: "Debian · Installation guide",
        url: "https://www.debian.org/releases/stable/amd64/",
      },
      {
        label: "Debian · Verify installation media",
        url: "https://www.debian.org/CD/verify",
      },
    ],
    videoUrl: null,
    slug: "online-node-and-offline-signer",
    objective:
      "Follow a proposed payment from preparation through approval to broadcast.",
    estimatedTime: "8–12 min",
    verification: "source-reviewed",
    referenceVersion: "Bitcoin Core 31.1",
    explanation: [
      "The online jobs are blockchain verification, the current wallet view, transaction construction and broadcasting. A watch-only wallet performs the wallet part with public address information and no signing keys. It saves a payment proposal as a PSBT, a Partially Signed Bitcoin Transaction file, so the signing decision can happen elsewhere.",
      "You move the PSBT to the offline signer, check the recipient, amounts, change and fee, then approve it with the private keys. You return the signed file to the online node for broadcast, which means sending the transaction to the network. The private keys remain offline. The signer checks the proposal; it does not independently check the whole blockchain or whether an input has already been spent.",
    ],
    callouts: [],
    origin: "Moved from legacy module 2",
    optional: false,
    kind: "reading",
    notes: [
      "The online computer runs Debian Stable and a synchronized Core node. Its watch-only wallet tracks payments and prepares payment files without holding the savings wallet's private keys. It broadcasts transactions after the offline computer signs them.",
      "The offline computer runs Debian Stable and Core with an encrypted private-key wallet. It can review and sign a payment without the blockchain. The online node supplies input information in the PSBT file. The offline signer checks recipients, change and fees, but does not independently check the current blockchain or whether an input remains unspent.",
      "Routine transfers carry only public address descriptions and unsigned or signed PSBT payment files. Public descriptions cannot spend, but can reveal wallet activity. Private wallet backups and passwords stay off this transfer device.",
      "Debian Stable is the default operating system for both dedicated computers in this course. Its stable releases change less often than fast-release desktop systems, and its mature software repositories make it practical to maintain a dedicated computer for years. That predictability makes maintenance easier to plan. It does not make Debian inherently more secure than Fedora. Fedora and other supported Linux distributions remain alternatives if you can maintain and test them.",
    ],
    concepts: [],
    warnings: [],
    commonMistakes: [],
    checklist: [],
    codeBlocks: [],
    contentUpdated: "2026-09-14",
    chapter: "Separate node and signer",
    sourceReviewed: "2026-09-14",
    reviewNote:
      "v4.1 wording, sequence and source review on 2026-09-14. Earlier hands-on evidence is listed separately. This review does not certify a physical Debian installation or funded Signet exercise.",
    why: "Follow a proposed payment from preparation through approval to broadcast.",
    risk: "A missing or misunderstood step can leave you unable to verify the result or recover the wallet. Demonstrate the outcome before continuing.",
    takeaway:
      "The online node prepares and validates payments; the offline signer supplies authorization. Each machine has a distinct job.",
    prerequisites: ["architecture-choice"],
  },
  {
    id: "2.8",
    title: "Three wallet roles you will encounter",
    summary:
      "Recognize which wallets can observe payments and which can approve spending.",
    status: "published",
    what: "We only give each component the information and powers it needs.",
    why: "This separation limits the consequences of compromising a single device and makes the procedure easier to audit.",
    risk: "A watch-only wallet cannot sign, but its extended public keys and address descriptions can reveal wallet history and future addresses. Treat these as private financial information.",
    checklist: [
      "I can describe what a compromised hot wallet allows an attacker to do.",
      "I can describe what a compromised watch-only wallet reveals.",
      "I can explain what an offline signer must verify before signing.",
    ],
    sources: [
      {
        label: "Bitcoin Core 31.1 — Offline Signing Tutorial",
        url: "https://github.com/bitcoin/bitcoin/blob/v31.1/doc/offline-signing-tutorial.md",
      },
      {
        label: "Bitcoin Core 31.1 — Output Descriptors",
        url: "https://github.com/bitcoin/bitcoin/blob/v31.1/doc/descriptors.md",
      },
      {
        label: "Bitcoin Core 31.1 — PSBT documentation",
        url: "https://github.com/bitcoin/bitcoin/blob/v31.1/doc/psbt.md",
      },
    ],
    videoUrl: null,
    slug: "hot-watch-only-and-signing-wallet",
    objective:
      "Recognize which wallets can observe payments and which can approve spending.",
    estimatedTime: "8–12 min",
    verification: "source-reviewed",
    referenceVersion: "Bitcoin Core 31.1",
    explanation: [
      "A hot wallet holds signing keys on a network-connected computer. A watch-only wallet has public information for recognizing addresses and transactions but no private keys to sign a spend. An offline signing wallet holds the private keys on a disconnected computer and approves a payment prepared elsewhere.",
      "In our two-computer setup, the online wallet is watch-only and the offline wallet signs. Public descriptors let both wallets recognize the same addresses; PSBT files carry proposed and signed payments. Watch-only does not mean public: its addresses and history can reveal financial information even though it cannot spend.",
    ],
    origin: "Moved from legacy module 2",
    optional: false,
    kind: "reading",
    contentUpdated: "2026-09-14",
    notes: [],
    chapter: "Separate node and signer",
    sourceReviewed: "2026-09-14",
    reviewNote:
      "v4.1 wording, sequence and source review on 2026-09-14. Earlier hands-on evidence is listed separately. This review does not certify a physical Debian installation or funded Signet exercise.",
    takeaway:
      "A watch-only wallet tracks addresses and constructs transactions using public information. It has no private keys with which to approve them.",
    prerequisites: ["2.4"],
  },
  {
    id: "ops-malware",
    slug: "malware-usb-and-destination-verification",
    title: "Transfer payment files safely between the computers",
    summary:
      "Decide which files may cross between the computers and how you will check the recipient.",
    objective:
      "Decide which files may cross between the computers and how you will check the recipient.",
    estimatedTime: "10–15 min",
    status: "published",
    verification: "source-reviewed",
    referenceVersion: "Bitcoin Core 31.1",
    reviewNote:
      "Procedure and boundaries reviewed against official sources. Physical Debian setup, isolation and tamper resistance must be verified on your actual equipment; no hands-on hardware certification is claimed.",
    explanation: [
      "Malware is software designed to harm you, steal information or change what your computer does. Keeping the signer offline blocks ordinary network access, but a USB drive can still bring it malicious files. An air gap means there is no network connection between the devices; it does not make transferred data safe.",
      "Use the transfer device only for the expected public wallet descriptions and PSBT payment files. Never put private wallet backups or passwords on it. Before signing, compare the proposed payment with an independently obtained record of what you intended to pay. A second screen showing the same substituted clipboard address is not an independent check.",
    ],
    concepts: [],
    warnings: [],
    checklist: [],
    sources: [
      {
        label: "Core 31.1 · Offline signing",
        url: "https://github.com/bitcoin/bitcoin/blob/v31.1/doc/offline-signing-tutorial.md",
      },
      {
        label: "Tails · Hardware and firmware limitations",
        url: "https://tails.net/doc/about/warnings/index.en.html#untrusted_computer",
      },
    ],
    codeBlocks: [],
    callouts: [],
    videoUrl: null,
    origin: "New curriculum v2 lesson",
    optional: false,
    kind: "practice",
    guidedSteps: [
      {
        id: "media",
        title: "Limit which files you transfer",
        instructions: [
          "Use the labeled payment-transfer device only for public descriptors, which describe wallet addresses without private keys, and PSBT files containing proposed or signed payments. Open only the expected data file in the verified application.",
          "Never run a program or install an update supplied on this device while signing. Keep private wallet backups and passwords off it. The absence of a network connection does not make USB contents trustworthy; unexpected files or instructions are a reason to stop.",
        ],
        expectedResult:
          "You have identified the transfer device and can name the file types allowed on it.",
        help: "An air gap does not make USB data trustworthy. Unexpected files, instructions or executable content are a reason to stop.",
      },
      {
        id: "destination",
        title: "Plan an independent destination check",
        instructions: [
          "For Signet, record a receiving address from your own training wallet. For a real payment, obtain the recipient's address through a separately authenticated channel, a way of communicating where you have checked who the person is. Do not rely only on the address pasted into the online computer.",
          "On the signer, compare every character with that independent record. Check every payment amount, any change returning to you and the total fee. Looking at the same compromised clipboard on two screens does not provide a separate source of truth.",
        ],
        expectedResult:
          "You have chosen an independent, trusted source for the recipient's address and know how to compare it on the signer.",
        help: "Comparing two views of the same compromised clipboard is not independent verification.",
      },
    ],
    prerequisites: ["2.8"],
    notes: [],
    commonMistakes: [],
    contentUpdated: "2026-09-14",
    chapter: "Separate node and signer",
    sourceReviewed: "2026-09-14",
    why: "Decide which files may cross between the computers and how you will check the recipient.",
    risk: "A missing or misunderstood step can leave you unable to verify the result or recover the wallet. Demonstrate the outcome before continuing.",
    takeaway:
      "An offline boundary reduces network exposure, while careful file transfer and destination checks address risks that remain at that boundary.",
  },
  {
    id: "ops-physical",
    slug: "physical-security-and-backup-media",
    title: "Know when physical tampering means you should stop",
    summary:
      "Plan how to replace a suspect signer without unlocking its wallet.",
    objective:
      "Plan how to replace a suspect signer without unlocking its wallet.",
    estimatedTime: "10–15 min",
    status: "published",
    verification: "source-reviewed",
    referenceVersion: "Bitcoin Core 31.1",
    reviewNote:
      "Procedure and boundaries reviewed against official sources. Physical Debian setup, isolation and tamper resistance must be verified on your actual equipment; no hands-on hardware certification is claimed.",
    explanation: [
      "An Evil Maid attack means someone gets access while you are absent and changes the device so they can steal secrets later. They might alter the hardware, the firmware built into it, or the software that starts the computer. An unattended laptop is not automatically compromised. Consider who could access it and whether there is reasonable evidence or suspicion of tampering.",
      "If you reasonably suspect tampering, do not unlock the wallet on that computer just to check it. Remove it from signing duty, prepare trusted replacement hardware with verified software, and restore from known-good backups offline. If keys may have been copied or exposed, make fresh keys on the trusted replacement and move the funds after checking that setup. Changing the old wallet password cannot stop someone from using a key they already copied.",
    ],
    concepts: [],
    warnings: [],
    checklist: [],
    sources: [
      {
        label: "Tails · Hardware and firmware limitations",
        url: "https://tails.net/doc/about/warnings/index.en.html#untrusted_computer",
      },
      {
        label: "Core 31.1 · Wallet management",
        url: "https://github.com/bitcoin/bitcoin/blob/v31.1/doc/managing-wallets.md",
      },
      {
        label: "Debian · Stable releases and support",
        url: "https://www.debian.org/releases/",
      },
      {
        label: "Debian · Installation guide",
        url: "https://www.debian.org/releases/stable/amd64/",
      },
      {
        label: "Debian · Verify installation media",
        url: "https://www.debian.org/CD/verify",
      },
    ],
    codeBlocks: [],
    callouts: [],
    videoUrl: null,
    origin: "New curriculum v2 lesson",
    optional: false,
    kind: "practice",
    prerequisites: ["ops-malware"],
    notes: [
      "Tails starts from removable media and can reduce traces left by an operating-system session. It cannot make altered hardware trustworthy. Malicious firmware, hidden hardware, changed startup settings or an altered Tails USB can still undermine it. Rebooting into Tails does not resolve every case of tampering while you were away.",
    ],
    commonMistakes: [],
    guidedSteps: [
      {
        id: "physical-plan",
        title: "Write down when to stop using the signer",
        instructions: [
          "Write who can physically access the signer and how you will store it between uses. List evidence that would make you suspect it had been altered. An Evil Maid attack is a modification made while you are absent, intended to capture secrets when you next use the device.",
          "Write the stop rule explicitly: if tampering is reasonably suspected, do not unlock the wallet on that computer to test it. A seal or malware scan cannot prove that hardware or firmware is clean. Equally, simply leaving a laptop unattended does not prove that its keys have been stolen.",
        ],
        expectedResult:
          "You have a physical-access plan and a clear stop condition.",
        help: "A locked room, controlled storage or signs of tampering may help you assess the risk. An intact seal or a clean scan cannot prove that firmware and hardware are unchanged. Leaving a laptop unattended does not, by itself, mean its keys were stolen.",
      },
      {
        id: "replacement-plan",
        title: "Plan replacement and possible key migration",
        instructions: [
          "Write a response you can follow without trusting the suspicious machine: stop using it for signing, obtain trusted replacement hardware, install verified Debian and Core, disconnect the replacement, restore known-good backups and recheck addresses, wallet descriptions, password access and signing.",
          "Known-good means you have a reason to trust the hardware or backup, not just that a model name or filename looks familiar. Do not copy the suspicious computer's system image to the replacement. If private keys may have been copied, especially after unlocking on the suspect machine, create fresh keys on the trusted replacement and move the funds after checking it. A password change does not revoke a copied private key.",
        ],
        expectedResult:
          "Your written response does not require trusting the suspicious signer or its working disk.",
        help: "If keys were used or unlocked after plausible compromise, or extraction may have occurred, generate fresh keys on a new trusted signer and migrate the funds after verifying that setup. A password change does not revoke stolen keys. Do not copy the suspicious OS image to the replacement.",
      },
    ],
    contentUpdated: "2026-09-14",
    chapter: "Separate node and signer",
    sourceReviewed: "2026-09-14",
    why: "Plan how to replace a suspect signer without unlocking its wallet.",
    risk: "A missing or misunderstood step can leave you unable to verify the result or recover the wallet. Demonstrate the outcome before continuing.",
    takeaway:
      "If you reasonably suspect tampering, recover on a trusted replacement. Unlocking the suspect machine is not a safe diagnostic test.",
  },
  {
    id: "offline-device",
    slug: "prepare-offline-signer",
    title: "Prepare the offline signer and check it after shutdown",
    summary:
      "Keep the test wallet offline and prove that its saved files are still there after a full shutdown.",
    objective:
      "Keep the test wallet offline and prove that its saved files are still there after a full shutdown.",
    estimatedTime: "45–90 min setup + downloads",
    status: "published",
    verification: "source-reviewed",
    referenceVersion: "Debian Stable · Bitcoin Core 31.1",
    reviewNote:
      "Procedure and boundaries reviewed against official sources. Physical Debian setup, isolation and tamper resistance must be verified on your actual equipment; no hands-on hardware certification is claimed.",
    explanation: [
      "Use the second dedicated generic Debian computer as the signer. It holds private keys and approves payments using the same Core wallet operations you have mastered. Prepare Debian, verified Core and KeePassXC while it has no wallet secrets. Then disconnect it before creating or restoring a wallet; it stays offline whenever it holds those keys.",
      "Persistent storage means saved files remain after the computer is turned off. You will choose a specific folder for Core's data and check it after a full shutdown. This checks the installed setup, not independent recovery. You also need a separate wallet backup that can restore the wallet on a replacement computer.",
    ],
    concepts: [],
    warnings: [],
    checklist: [],
    sources: [
      {
        label: "Debian · Stable releases and support",
        url: "https://www.debian.org/releases/",
      },
      {
        label: "Debian · Installation guide",
        url: "https://www.debian.org/releases/stable/amd64/",
      },
      {
        label: "Debian · Verify installation media",
        url: "https://www.debian.org/CD/verify",
      },
      {
        label: "Bitcoin Core · Official release verification",
        url: "https://bitcoincore.org/en/download/",
      },
      {
        label: "Core 31.1 · Wallet management",
        url: "https://github.com/bitcoin/bitcoin/blob/v31.1/doc/managing-wallets.md",
      },
      {
        label: "Core 31.1 · Offline signing",
        url: "https://github.com/bitcoin/bitcoin/blob/v31.1/doc/offline-signing-tutorial.md",
      },
    ],
    codeBlocks: [],
    callouts: [],
    videoUrl: null,
    origin: "New curriculum v2 lesson",
    optional: false,
    kind: "practice",
    guidedSteps: [
      {
        id: "debian-preparation",
        title: "Finish software setup before creating keys",
        instructions: [
          "Install verified Debian Stable with a supported desktop, the graphical environment with windows and menus. While the signer has no wallet secrets, apply Debian security updates, prepare the download-verification tools and verify the official Core archive using the earlier lesson.",
          "Install KeePassXC during preparation, using the reviewed Debian package and bundled-list settings. Test that its generator and verified Core run before creating any keys. If you choose disk encryption, preserve its separate recovery password too. Finish setup before disconnecting.",
        ],
        expectedResult:
          "The required software and libraries work, with no private-key wallet yet present.",
        help: "Follow the Debian installer and media-verification sources. If you enable disk encryption, record its separate recovery password. Wallet encryption and disk encryption protect different things; neither replaces backups.",
      },
      {
        id: "isolate",
        title: "Disconnect before creating or restoring keys",
        instructions: [
          "Close Core. Unplug the Ethernet network cable and disable Wi-Fi, Bluetooth and any other network connections in Debian. Where supported, also disable them in the computer's firmware settings. Physically remove or disable network hardware if your threat model calls for it.",
          "Restart and check that the computer remains disconnected before creating or restoring keys. Core's own network setting affects only Core, not other applications. Once the computer holds private keys, do not reconnect it to download a missing program. Prepare missing software separately or use a prepared replacement without secrets.",
        ],
        expectedResult:
          "The signer has no network connection after restart and will stay offline for key creation, recovery and signing.",
        help: "A Core flag does not disable other programs' networking. Do not reconnect a signer containing keys to fetch a missing package. Return to software preparation on a replacement environment with no secrets.",
      },
      {
        id: "debian-datadir",
        title: "Start Core with a separate offline data folder",
        instructions: [
          "In the file manager, open your home folder and create folders named core and core-signet. Unpack the verified release inside core so the program is at core/bitcoin-31.1/bin/bitcoin-qt. The command below starts that program, selects Signet and stores working data in core-signet. $HOME means your home folder; -networkactive=0 and -listen=0 turn off Core's network activity and listening.",
          "Keep the computer physically disconnected. In Core's Window → Console, run getblockchaininfo and getnetworkinfo. Check chain = signet and networkactive = false. false means disabled. The signer is not synchronized with the blockchain. That is expected: the online node will provide payment information in PSBT files.",
        ],
        expectedResult:
          "Core uses $HOME/core-signet, is on Signet and has networking disabled. Its blockchain is not synchronized, which is expected for the signer.",
        help: "$HOME expands to your user's home folder, so no hard-coded username is needed. The data folder must exist. If Core cannot start, stop; do not connect this signer to download dependencies.",
        command:
          '"$HOME/core/bitcoin-31.1/bin/bitcoin-qt" -signet -datadir="$HOME/core-signet" -networkactive=0 -listen=0',
        commandContext: "Linux system terminal · not the Core console",
      },
      {
        id: "wallet",
        title: "Create and back up the offline Signet wallet",
        instructions: [
          "On this disconnected computer, generate a fresh Signet passphrase with KeePassXC’s bundled large list. In Core choose File → Create Wallet and name it signet-offline-wallet. Enable Encrypt Wallet, enter that separate test passphrase and leave private keys enabled. These new keys approve practice payments while the computer stays offline.",
          "Choose File → Backup Wallet and save signet-offline-after-encryption.dat on a separate backup device. Create and record an address through Receive, note the backup location and keep the password separately. The installed disk is working storage, not your only backup; the regular payment-transfer USB must contain neither this backup nor its password.",
        ],
        expectedResult:
          "An encrypted test wallet, independent backup and address record exist. No test secret will be reused on mainnet.",
        help: "The installed disk is working storage, not the only backup. Never place wallet backups or passwords on the regular PSBT transfer medium.",
      },
      {
        id: "coldboot",
        title: "Verify after a complete shutdown",
        instructions: [
          "Close Core normally, shut Debian down completely and turn the computer on again. This full power-off test is sometimes called a cold boot. Check that network connections remain disabled and start Core with the same command and data folder.",
          "Open signet-offline-wallet and compare the address you recorded with its history. Recheck chain = signet and networkactive = false in the console. Saved data surviving shutdown shows persistence is working; it does not prove you can recover after the disk fails. Keep the separate backup for that later test.",
        ],
        expectedResult:
          "The wallet and address survive shutdown, the data folder is correct and Core remains offline.",
        help: "A reboot test is not independent recovery. Keep the original backup for the later replacement-signer drill. If the wallet is missing, check the data path before creating anything.",
      },
    ],
    notes: [],
    commonMistakes: [],
    prerequisites: ["ops-physical"],
    contentUpdated: "2026-09-14",
    chapter: "Separate node and signer",
    sourceReviewed: "2026-09-14",
    why: "Keep the test wallet offline and prove that its saved files are still there after a full shutdown.",
    risk: "A missing or misunderstood step can leave you unable to verify the result or recover the wallet. Demonstrate the outcome before continuing.",
    takeaway:
      "Prepare Debian and Core before creating keys, then keep the signer disconnected. A successful reboot does not replace an independent backup.",
  },
  {
    id: "watch-only-setup",
    slug: "watch-only-setup",
    title: "Connect the wallets using public descriptors",
    summary:
      "Give the online coordinator your addresses without giving it private keys.",
    objective:
      "Give the online coordinator your addresses without giving it private keys.",
    what: "Give the online coordinator your addresses without giving it private keys.",
    why: "The online computer needs to know what belongs to you while remaining unable to spend by itself.",
    risk: "Exporting private descriptors would cross the very boundary this setup is meant to create.",
    status: "published",
    verification: "source-reviewed",
    referenceVersion: "Bitcoin Core 31.1",
    contentUpdated: "2026-09-14",
    estimatedTime: "20–40 min active",
    kind: "practice",
    explanation: [
      "A descriptor is a precise description of how wallet addresses and spending conditions are constructed. A public descriptor can contain extended public keys that describe many addresses. It reveals wallet activity but does not itself give spending authority.",
      "Core 31.1 does not expose this descriptor export/import setup through ordinary GUI forms. This setup needs a short, justified console step. Use it for this one setup task, then return to the GUI for PSBT handling. The commands execute locally in the selected wallet.",
    ],
    prerequisites: ["offline-device"],
    sources: [
      {
        label: "Bitcoin Core 31.1: offline signing tutorial",
        url: "https://github.com/bitcoin/bitcoin/blob/v31.1/doc/offline-signing-tutorial.md",
      },
      {
        label: "Bitcoin Core 31.1: descriptors and Miniscript",
        url: "https://github.com/bitcoin/bitcoin/blob/v31.1/doc/descriptors.md",
      },
    ],
    reviewNote:
      "v4.1 wording, sequence and source review on 2026-09-14. Earlier hands-on evidence is listed separately. This review does not certify a physical Debian installation or funded Signet exercise.",
    origin: "First-principles curriculum v4",
    guidedSteps: [
      {
        id: "export",
        title: "Export only public descriptors",
        instructions: [
          "A public descriptor is a text description from which Core can calculate your addresses without receiving private signing keys. It may contain an extended public key, from which Core can derive a sequence of public keys. The receive branch makes addresses for incoming payments; the internal or change branch makes addresses for money returned to you.",
          "On the offline signer, select signet-offline-wallet in Window → Console and run listdescriptors without true. The reply is structured text called JSON. Save only the descriptors array, the list between its opening [ and matching closing ], as signet-public-descriptors.json. Keep each entry and its range, timestamp, next_index, active and internal fields intact. Keep the next field too, if present; it is a compatibility copy of next_index. Use a plain-text file on the transfer device. Never run listdescriptors true, export a private descriptor or transfer the wallet backup or password.",
        ],
        expectedResult:
          "The saved JSON list contains the public receive and change descriptions with their original fields. No private key, wallet backup or password crosses to the online computer.",
        help: "Do not use listdescriptors true. Public descriptors reveal wallet activity, so keep the file private even though it cannot authorize spending.",
        command: "listdescriptors",
        commandContext: "OFFLINE · Core console · signet-offline-wallet",
        warning:
          "Transfer public descriptors only. Never use listdescriptors true or move the wallet backup online.",
      },
      {
        id: "watchonly-gui-v4",
        title: "Create the watch-only coordinator in the GUI",
        instructions: [
          "On the online Signet machine, choose File → Create Wallet, name it signet-watch-only, and select Disable Private Keys and Make Blank Wallet. Create it without a wallet encryption passphrase; this wallet is deliberately unable to hold private keys.",
          "Select this wallet in Window → Console and check getwalletinfo before the descriptor import. This read-only check confirms the security boundary you just selected.",
        ],
        expectedResult:
          "walletname is signet-watch-only and private_keys_enabled is false.",
        command: "getwalletinfo",
        commandContext: "ONLINE · Core console · signet-watch-only",
        help: "Check the selected wallet and each import result. Use only public descriptors, preserve receive and change branches, and never solve an import error by exporting private keys.",
      },
      {
        id: "import",
        title: "Import both descriptor branches",
        instructions: [
          "Open signet-public-descriptors.json as plain text on the online computer. JSON arrays use [ and ] around the list, with named fields inside each entry. range gives the address-number range, timestamp tells Core how far back to look for payments, next_index records the next address position, active says whether to use the description for new addresses, and internal distinguishes change from receiving addresses.",
          "In the signet-watch-only Core console, enter importdescriptors followed by the complete saved array inside single quotes. Keep all fields and original timestamps. Use the array, not the outer object that contained it in the original reply. Check that every import entry reports success: true and that getwalletinfo still reports private_keys_enabled: false. Do not replace old timestamps with now to skip a scan.",
        ],
        expectedResult:
          "Every import result reports success: true. getwalletinfo still reports private_keys_enabled: false.",
        help: "For JSON errors, check the array brackets and quoting. Never replace old timestamps with ‘now’ to hide a rescan problem; that can miss existing receipts.",
      },
      {
        id: "address",
        title: "Check a receiving address on the signer",
        instructions: [
          "Create a receiving address in signet-watch-only and take that exact public address to the offline signer. In its Core console, run getaddressinfo with the address inside double quotes. ismine: true means the selected offline wallet recognizes it as its own.",
          "Check the returned descriptor and derivation path, the recorded sequence used to calculate this address, against the receive branch you exported. Compare the complete address on both devices. Only after those checks, request a small Signet faucet payment to it. Do not compare two independently generated next addresses; their address counters may be at different positions.",
        ],
        expectedResult:
          "The offline wallet recognizes the address as its own, with ismine: true, and the receive branch matches your records. Only then request a small faucet payment to it.",
        help: "Two wallets can be at different positions in their address sequences. Check the same recorded address on both devices instead of generating a new address on each and expecting them to match.",
      },
    ],
    chapter: "Complete an offline payment",
    optional: false,
    sourceReviewed: "2026-09-14",
    takeaway:
      "Public receive and change descriptors let the coordinator track the wallet. Private-key material must stay on the signer.",
  },
  {
    id: "offline-psbt",
    slug: "first-offline-signed-transaction",
    title: "Build online, sign offline, return and broadcast",
    summary: "Complete the file-based payment cycle using the GUI.",
    objective: "Complete the file-based payment cycle using the GUI.",
    estimatedTime: "30–45 min active + confirmations",
    status: "published",
    verification: "source-reviewed",
    referenceVersion: "Bitcoin Core 31.1",
    reviewNote:
      "v4.1 wording, sequence and source review on 2026-09-14. Earlier hands-on evidence is listed separately. This review does not certify a physical Debian installation or funded Signet exercise.",
    explanation: [
      "You have already imported the signer’s public descriptors into the online watch-only wallet. Return to the GUI for the payment cycle: build the proposal online, sign on the offline computer, return the signed file and broadcast from the online node.",
      "A payment consumes inputs, the previously received outputs selected to spend, and creates new outputs for the recipient and any change. In the PSBT dialog, review every output and the total fee. The displayed Total Amount can include change; it is not necessarily the amount paid to the recipient.",
    ],
    sources: [
      {
        label: "Bitcoin Core 31.1 · Offline signing",
        url: "https://github.com/bitcoin/bitcoin/blob/v31.1/doc/offline-signing-tutorial.md",
      },
      {
        label: "Bitcoin Core 31.1 · Wallet RPC source",
        url: "https://github.com/bitcoin/bitcoin/tree/v31.1/src/wallet/rpc",
      },
      {
        label: "Bitcoin Core 31.1: PSBT dialog",
        url: "https://github.com/bitcoin/bitcoin/blob/v31.1/src/qt/psbtoperationsdialog.cpp",
      },
      {
        label: "Bitcoin Core 31.1: send, fees, coin control and PSBT",
        url: "https://github.com/bitcoin/bitcoin/blob/v31.1/src/qt/sendcoinsdialog.cpp",
      },
    ],
    codeBlocks: [],
    videoUrl: null,
    origin: "New curriculum v2 lesson",
    optional: false,
    kind: "practice",
    guidedSteps: [
      {
        id: "proposal",
        title: "Save an unsigned transaction",
        instructions: [
          "Wait for the received test coins to have a confirmation. In signet-watch-only, use Send to prepare a small payment to the recorded address in your separate training wallet. Leave enough for the fee and review the amount and destination.",
          "Choose Create Unsigned, then Save the .psbt file. Unsigned means the payment has not been approved by the private keys. A funded proposal has selected inputs, the received amounts it intends to spend; it does not mean the payment has been sent. Keep the independently recorded destination for the offline check.",
        ],
        expectedResult:
          "A funded unsigned .psbt file is saved. The online watch-only wallet has not signed it.",
        help: "If Send offers an ordinary signing flow, recheck the selected wallet and private_keys_enabled. For insufficient funds, check confirmation and leave room for the fee.",
      },
      {
        id: "review",
        title: "Review every output offline",
        instructions: [
          "Move only the expected .psbt file to the offline computer. Select signet-offline-wallet and choose File → Load PSBT from file. Treat this as an untrusted proposal until you have checked it.",
          "For every output, check which address receives what amount. Compare the recipient with your independent record. Any change output returns the unused remainder to your wallet and must be recognized as yours. Check the displayed total fee too. Do not sign if the fee cannot be calculated, an output is unexplained, change is unrecognized or an address differs.",
        ],
        expectedResult:
          "Every output is accounted for, the recipient matches your independent record, and you understand the total fee.",
        help: "Stop if the fee cannot be calculated, an output is unexplained, change is not recognized or the destination differs. A PSBT is an untrusted proposal.",
        warning:
          "Do not sign if any output is unexplained, the destination differs or the fee cannot be checked.",
      },
      {
        id: "sign",
        title: "Sign and save on the offline device",
        instructions: [
          "After reviewing the whole payment, choose Sign Tx in the PSBT dialog. Tx is short for transaction. Enter the test wallet password only when Core requests it. Core signs the payment with the private keys; the keys stay on the signer.",
          "Check that Core reports the transaction fully signed and ready for broadcast. Save the signed PSBT with a different filename so you can distinguish it from the unsigned proposal. Close the wallet normally and keep the signer offline. Saving a file does not mean it has been signed. Check Core's signing status before continuing.",
        ],
        expectedResult:
          "Core reports that the transaction is fully signed and ready for broadcast; the signed .psbt is saved.",
        help: "If signatures are still missing or the wallet cannot sign, stop. The procedure is incomplete; do not mistake an exported unsigned file for a signed transaction.",
      },
      {
        id: "broadcast",
        title: "Broadcast from the online node",
        instructions: [
          "Return the signed .psbt file to the online node. Choose File → Load PSBT from file, check the outputs and total fee again, then select Broadcast Tx. Broadcast means send the transaction to the Bitcoin network; it does not require unlocking private keys on this computer.",
          "The Core window assembles the signed transaction into its final form and extracts it from the PSBT before sending. Wait for a Signet confirmation and record the transaction ID. A separate command-line workflow uses different commands; do not pass a PSBT file or string directly to sendrawtransaction, which expects the final raw transaction.",
        ],
        expectedResult:
          "The online node shows the transaction ID and a confirmation, while private keys remained offline throughout.",
        help: "Do not pass a PSBT string to sendrawtransaction: that RPC expects a finalized raw transaction. In a CLI workflow, check finalizepsbt.complete before using its hex result.",
      },
    ],
    prerequisites: ["watch-only-setup"],
    contentUpdated: "2026-09-14",
    notes: [],
    why: "The online node can prepare and broadcast while the spending keys stay on a disconnected machine.",
    risk: "A malicious or mistaken transaction must be caught before the offline wallet signs it.",
    practicalReview: {
      date: "2026-09-13",
      scope:
        "Official Core 31.1 macOS GUI: load PSBT, review outputs/fee, unlock, Sign Tx and Broadcast Tx on isolated Regtest. Separate automated zero-block signer test; no physical Debian air-gap claim.",
    },
    chapter: "Complete an offline payment",
    sourceReviewed: "2026-09-14",
    takeaway:
      "A PSBT carries a payment between preparation and signing. Review the destination, change and fee before signing, then return it for broadcast.",
  },
  {
    id: "offline-recovery",
    slug: "recovery-drill-without-original-coordinator",
    title: "Replace both computers and repeat the payment",
    summary:
      "Recover and send using the backups and instructions, with the originals set aside.",
    objective:
      "Recover and send using the backups and instructions, with the originals set aside.",
    estimatedTime: "10–15 min",
    status: "published",
    verification: "source-reviewed",
    referenceVersion: "Debian Stable · Bitcoin Core 31.1",
    reviewNote:
      "v4.1 wording, sequence and source review on 2026-09-14. Earlier hands-on evidence is listed separately. This review does not certify a physical Debian installation or funded Signet exercise.",
    explanation: [
      "Independent recovery means the original computer and its working disk are not supplying anything needed to recover. Keep them intact but set them aside. Restore the private-key wallet only on a trusted replacement that is already offline. This is where you now test physical replacement, beyond the same-computer recovery you proved before the one-wallet checkpoint.",
      "The online coordinator is simply the online Core computer that prepares and tracks payments. Rebuild its watch-only wallet from public descriptors, then repeat a small Signet payment with both replacements. A balance on a screen is not enough: the replacement signer must approve the payment and the replacement online node must broadcast it.",
    ],
    sources: [
      {
        label: "Bitcoin Core 31.1 · Wallet management",
        url: "https://github.com/bitcoin/bitcoin/blob/v31.1/doc/managing-wallets.md",
      },
      {
        label: "Bitcoin Core 31.1 · Offline signing",
        url: "https://github.com/bitcoin/bitcoin/blob/v31.1/doc/offline-signing-tutorial.md",
      },
    ],
    codeBlocks: [],
    videoUrl: null,
    origin: "New curriculum v2 lesson",
    optional: false,
    kind: "practice",
    guidedSteps: [
      {
        id: "signer",
        title: "Restore a replacement offline signer",
        instructions: [
          "Set the original signer and its working disk aside intact. Prepare trusted replacement hardware with verified Debian and Core using the signer-setup lesson. Disconnect it before restoring any wallet secrets, and use a separate Core Signet data folder.",
          "Using only known-good recovery copies, choose File → Restore Wallet and restore signet-offline-after-encryption.dat as signet-offline-restored. Check an address you recorded earlier that has received test coins. The original signer must supply nothing for this recovery. Never restore this private-key backup on the online computer.",
        ],
        expectedResult:
          "The replacement offline wallet recognizes a recorded funded address. The original signer and its working disk were not used.",
        help: "Never restore private wallet data on the online coordinator. A wallet restored online does not preserve the offline architecture.",
      },
      {
        id: "coordinator",
        title: "Rebuild a watch-only coordinator",
        instructions: [
          "The coordinator is the online computer that tracks payments and prepares PSBT files. Close its original watch-only wallet. On a separate synchronized Signet Core setup, create a new blank wallet with private keys disabled.",
          "Export public descriptors from the restored offline signer and import the complete receive and change entries with their original timestamps, as in the PSBT lesson. Let Core scan for payments and compare your recorded transactions. Keep private_keys_enabled = false. Public descriptors recover the address rules, but not labels written only in the lost coordinator; preserve a separate watch-only backup if you need those labels.",
        ],
        expectedResult:
          "The new online wallet reports private_keys_enabled: false and finds the expected unspent amounts without using the original coordinator's database.",
        help: "Use a node with the blocks needed for recovery. Public descriptors restore the address rules, but not labels stored only on the original online computer. Keep a separate watch-only wallet backup if you need those labels.",
      },
      {
        id: "sign-again",
        title: "Spend using only the replacements",
        instructions: [
          "Repeat the PSBT payment using only the replacement online wallet and signet-offline-restored. Prepare the proposal online, check every output and fee offline, unlock with the test password recovered from its separate record, and sign.",
          "Return the signed file to the replacement online node, broadcast it and wait for confirmation. Record the transaction ID, software versions and any missing instructions you discovered. This confirms that both replacement computers completed the payment without using the original wallets or disks.",
        ],
        expectedResult:
          "A payment signed and broadcast using only the replacement computers has received a confirmation. The original wallets and signer disk were not needed.",
        help: "A matching balance alone is insufficient. Record the transaction ID, versions, recovery locations and any correction needed in your notes.",
      },
    ],
    prerequisites: ["offline-psbt"],
    contentUpdated: "2026-09-14",
    notes: [],
    chapter: "Recover without the originals",
    sourceReviewed: "2026-09-14",
    why: "Recover and send using the backups and instructions, with the originals set aside.",
    risk: "A missing or misunderstood step can leave you unable to verify the result or recover the wallet. Demonstrate the outcome before continuing.",
    takeaway:
      "A recoverable setup can replace both computers and still create a valid payment from the saved wallet and public coordination records.",
  },
  {
    id: "ops-documentation",
    slug: "document-the-procedure-without-exposing-secrets",
    title: "Write a recovery guide someone else can follow",
    summary:
      "Write recovery instructions that do not depend on your memory or the original computers.",
    objective:
      "Write recovery instructions that do not depend on your memory or the original computers.",
    estimatedTime: "10–15 min",
    status: "published",
    verification: "source-reviewed",
    referenceVersion: "Bitcoin Core 31.1",
    reviewNote:
      "v4.1 wording, sequence and source review on 2026-09-14. Earlier hands-on evidence is listed separately. This review does not certify a physical Debian installation or funded Signet exercise.",
    explanation: [
      "A recovery card is a written guide to the setup: what each computer does, which wallet is used, where its backup is stored and how to recover the password separately. Recovery material means the files, devices and records the procedure needs. The card itself should not contain a private key or password.",
      "Try following the card with your Signet test files. Whenever you have to guess, add the missing instruction. Then have the person who could act if you died or became unavailable try it too. Practice with test material rather than sharing real wallet secrets for an exercise.",
    ],
    codeBlocks: [],
    videoUrl: null,
    origin: "New curriculum v2 lesson",
    optional: false,
    kind: "practice",
    guidedSteps: [
      {
        id: "card",
        title: "Write the recovery guide",
        instructions: [
          "Write a recovery card on paper. List the network, which computer signs and which prepares payments, wallet names, Core and operating-system versions, backup dates and locations, and where to find the separate password-recovery records. Identify the public descriptor file and the wallet's creation date.",
          "Write the ordered steps for rebuilding each computer and mark the actions that must stay offline. The card should identify the needed files and records without containing a private key or password. Keep it private too: addresses and storage locations can reveal sensitive financial information.",
        ],
        expectedResult:
          "The recovery card identifies the necessary files, devices and records, and explains their purpose. It contains no password or private key.",
        help: "Treat public descriptors and addresses as private financial information too. A recovery card should not publish wallet history or all storage locations.",
      },
      {
        id: "rehearse",
        title: "Use the card in a Signet rehearsal",
        instructions: [
          "Repeat the offline recovery exercise using the card and separately stored Signet backups and password records. Do not rely on the original computers or on steps you remember but have not written down.",
          "At every point where you have to guess, stop and improve the card. Record the successful test date and confirmed transaction ID. If the instructions depend on the original device still working, recovery remains unfinished.",
        ],
        expectedResult:
          "You can rebuild and use the Signet system from the written procedure.",
        help: "If the card depends on the original device still working, revise it before preparing mainnet.",
      },
      {
        id: "operator-unavailable",
        title: "Check that someone else can follow the guide",
        instructions: [
          "Name the person who could act if you died or became unavailable. Ask them to locate the instructions and rehearse with Signet test files. They should be able to find the wallet backup and recover its password through the separate records without relying on you to fill in missing steps.",
          "Correct anything unclear. Do not share real wallet secrets simply to run this practice. Review the access instructions after life changes; legal arrangements for inheritance need their own appropriate review.",
        ],
        expectedResult:
          "You have named the person who could recover the wallet and checked that they can follow the test instructions to find both the backup and the separate password record.",
        help: "Do not share production secrets for a practice exercise. Review access and inheritance instructions after life changes. Any legal arrangements need their own appropriate review.",
      },
    ],
    prerequisites: ["offline-recovery"],
    contentUpdated: "2026-09-14",
    notes: [],
    chapter: "Recover without the originals",
    sourceReviewed: "2026-09-14",
    why: "Write recovery instructions that do not depend on your memory or the original computers.",
    risk: "A missing or misunderstood step can leave you unable to verify the result or recover the wallet. Demonstrate the outcome before continuing.",
    takeaway:
      "Recovery instructions explain which artifacts, software and people are needed without collecting the spending secrets in one document.",
    sources: [
      {
        label: "Core 31.1 · Wallet backup and recovery records",
        url: "https://github.com/bitcoin/bitcoin/blob/v31.1/doc/managing-wallets.md",
      },
    ],
  },
  {
    id: "offline-mastery",
    slug: "offline-mastery",
    title: "Before maintenance: operate without the original signer",
    summary: "Demonstrate the skills before adding the next building block.",
    objective: "Demonstrate the skills before adding the next building block.",
    what: "Demonstrate the skills before adding the next building block.",
    why: "A familiar-looking screen is not evidence that you can recover or operate the system.",
    risk: "Skipping a missing skill turns the next layer into something you cannot diagnose.",
    status: "published",
    verification: "source-reviewed",
    referenceVersion: "Bitcoin Core 31.1",
    contentUpdated: "2026-09-14",
    estimatedTime: "8–12 min",
    kind: "checkpoint",
    explanation: [
      "Do this without following the earlier lesson line by line. If you need the instructions, return to the exercise, repeat it, and try again later.",
      "Tick each outcome only after you have demonstrated it. These checks record your own assessment in this browser; they are not a certification or a substitute for the actual exercise.",
    ],
    prerequisites: ["ops-documentation"],
    sources: [
      {
        label: "Bitcoin Core 31.1: wallet creation, backup and restoration",
        url: "https://github.com/bitcoin/bitcoin/blob/v31.1/doc/managing-wallets.md",
      },
    ],
    reviewNote:
      "v4.1 wording, sequence and source review on 2026-09-14. Earlier hands-on evidence is listed separately. This review does not certify a physical Debian installation or funded Signet exercise.",
    origin: "First-principles curriculum v4",
    checklist: [
      "I can build a PSBT online and identify the recipient, amount, fee and change.",
      "I can load it into the offline Core GUI, review it and save the signed PSBT.",
      "I can return it to the online machine, finalize it and broadcast the test payment.",
      "I can explain why the signer has no blockchain and why the coordinator has no private keys.",
      "I have recovered the signing wallet on a replacement machine and completed a new test payment.",
    ],
    chapter: "Recover without the originals",
    optional: false,
    sourceReviewed: "2026-09-14",
    takeaway:
      "You can keep private keys offline while receiving, coordinating, signing and recovering through a separate online node.",
  },
  {
    id: "ops-routine",
    slug: "regular-tests-and-annual-recovery-drill",
    title: "Review the custody system every year",
    summary: "Maintain security as your circumstances and computing change.",
    objective: "Maintain security as your circumstances and computing change.",
    what: "Maintain security as your circumstances and computing change.",
    why: "The backup medium, software and threat model will not stay fixed forever.",
    risk: "A procedure left untouched for years can become impossible to execute when needed.",
    status: "published",
    verification: "source-reviewed",
    referenceVersion: "Bitcoin Core 31.1",
    contentUpdated: "2026-09-14",
    estimatedTime: "20–40 min active",
    kind: "practice",
    explanation: [
      "Security is maintained, not frozen on setup day. A wallet’s balance or purchasing power may grow, computing and attack tools may improve, or your recovery procedure may become harder to perform. Revisit the assumptions calmly instead of adding components in response to every headline.",
      "Schedule a full annual custody and recovery review, with earlier reviews after material changes. Change a passphrase when that review identifies a need, not merely because a date has arrived. If the margin is still enormous and recovery works, unnecessary changes add work and opportunities for error.",
    ],
    prerequisites: ["offline-mastery"],
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
        label: "Bitcoin Core 31.1: passphrase derivation and AES encryption",
        url: "https://github.com/bitcoin/bitcoin/blob/v31.1/src/wallet/crypter.cpp",
      },
    ],
    reviewNote:
      "v4.1 wording, sequence and source review on 2026-09-14. Earlier hands-on evidence is listed separately. This review does not certify a physical Debian installation or funded Signet exercise.",
    origin: "First-principles curriculum v4",
    guidedSteps: [
      {
        id: "threat-review-v4",
        title: "Revisit the original threat model",
        instructions: [
          "Has the BTC balance or its purchasing power changed materially? Have the people involved, storage locations, physical access or plausible attackers changed? Have you added dependencies? Can the intended recovery person still perform the procedure?",
        ],
        expectedResult:
          "You can explain whether the current architecture still fits.",
        help: "Stop at this step if the result differs. Recheck the selected network, wallet and files, then review the linked official documentation. Do not mark the result as confirmed until you can explain the difference.",
      },
      {
        id: "strength-review-v4",
        title: "Review the passphrase method and margin",
        instructions: [
          "Check the recorded generation method and wordlist. Has available computing power changed materially? Have attack tools improved? Is the attack margin still very large under demanding assumptions, including future value growth? Has typing or recovering the credential become harder?",
          "If the evidence justifies strengthening the phrase, generate a fresh one, use Core’s Change Passphrase operation, make current backups and test restoration and signing with the new phrase. Review old snapshots separately: their old phrases still apply. Do not rotate a sound credential without a reason, and do not confuse a password change with revoking exposed Bitcoin keys.",
        ],
        expectedResult:
          "The phrase retains a generous margin without relying on a precise attack-price estimate.",
        help: "Stop at this step if the result differs. Recheck the selected network, wallet and files, then review the linked official documentation. Do not mark the result as confirmed until you can explain the difference.",
      },
      {
        id: "media-review-v4",
        title: "Inspect and restore the copies",
        instructions: [
          "Are all intended backup copies present and readable? Do connectors and readers still work? Can authorized people find the instructions and separate password record? Restore a copy in the correct clean environment, verify a known address and prove signing; a file listing alone is not a recovery test.",
          "For a real offline wallet, keep the restored signer offline and use an appropriate controlled signing test. Do not expose the real private keys online merely to simplify a maintenance exercise.",
        ],
        expectedResult:
          "A current copy actually restores and its password record works.",
        help: "Stop at this step if the result differs. Recheck the selected network, wallet and files, then review the linked official documentation. Do not mark the result as confirmed until you can explain the difference.",
      },
      {
        id: "software-review-v4",
        title: "Plan verified software maintenance",
        instructions: [
          "Check official Core and Debian release information. Verify downloads, preserve current backups and rehearse changes with test wallets. Keep the signer offline: transfer authenticated update media under the existing procedure or prepare a replacement offline environment.",
        ],
        expectedResult:
          "You know which software versions recovery requires and have tested the update path before relying on it.",
        help: "Stop at this step if the result differs. Recheck the selected network, wallet and files, then review the linked official documentation. Do not mark the result as confirmed until you can explain the difference.",
      },
      {
        id: "write-review-v4",
        title: "Record outcomes and the next date",
        instructions: [
          "Record what you tested, what failed, what changed and who can recover if you are unavailable. Schedule the next review. Do not record a test you did not perform.",
        ],
        expectedResult:
          "Your recovery instructions reflect demonstrated current practice.",
        help: "Stop at this step if the result differs. Recheck the selected network, wallet and files, then review the linked official documentation. Do not mark the result as confirmed until you can explain the difference.",
      },
    ],
    chapter: "Maintain the setup",
    optional: false,
    sourceReviewed: "2026-09-14",
    takeaway:
      "Custody is maintained over time. Review changing threats, password strength, backup health and the ability to restore.",
  },
  {
    id: "ops-inheritance",
    slug: "inheritance-and-other-people",
    title: "Make recovery understandable to another person",
    summary: "Test instructions with someone who did not design the setup.",
    objective: "Test instructions with someone who did not design the setup.",
    what: "Test instructions with someone who did not design the setup.",
    why: "A technically correct system can still fail when its operator is unavailable.",
    risk: "The recovery person may not know which files, versions, passwords or devices matter.",
    status: "published",
    verification: "source-reviewed",
    referenceVersion: "Bitcoin Core 31.1",
    contentUpdated: "2026-09-14",
    estimatedTime: "20–40 min active",
    kind: "practice",
    explanation: [
      "Prepare a short recovery map: what the encrypted wallet file is, where authorized people can find copies, how the passphrase becomes available, which software is needed, and how to verify the recovered wallet. Keep secrets out of the public-facing map.",
      "Practice with a different, disposable wallet. Give the intended recovery person the test instructions and the materials the plan says will survive. Let them explain and perform the recovery. Every missing assumption is something to fix while you can.",
      "Distinguish practical recovery instructions from legal authority over an estate. An inheritance spending policy can be appropriate when authority genuinely needs to change; a complex policy is not a substitute for understandable instructions. Obtain jurisdiction-specific help where legal arrangements are needed.",
    ],
    prerequisites: ["ops-routine"],
    sources: [
      {
        label: "Bitcoin Core 31.1: wallet creation, backup and restoration",
        url: "https://github.com/bitcoin/bitcoin/blob/v31.1/doc/managing-wallets.md",
      },
    ],
    reviewNote:
      "v4.1 wording, sequence and source review on 2026-09-14. Earlier hands-on evidence is listed separately. This review does not certify a physical Debian installation or funded Signet exercise.",
    origin: "First-principles curriculum v4",
    guidedSteps: [
      {
        id: "handover-test-v4",
        title: "Rehearse a handover with a disposable wallet",
        instructions: [
          "Have the intended recovery person restore and sign with a test wallet using your instructions. Observe without supplying unrecorded shortcuts. Update the instructions and repeat any failed part.",
        ],
        expectedResult:
          "Another person can locate the necessary materials, distinguish public information from secrets and demonstrate a test recovery.",
        help: "Stop at this step if the result differs. Recheck the selected network, wallet and files, then review the linked official documentation. Do not mark the result as confirmed until you can explain the difference.",
      },
    ],
    chapter: "Maintain the setup",
    optional: false,
    sourceReviewed: "2026-09-14",
    takeaway:
      "Someone else needs a workable route to recovery when you cannot help. Rehearse that route without exposing the secrets during teaching.",
  },
  {
    id: "single-sig-mastery",
    slug: "single-sig-mastery",
    title: "Master the simple system before adding a spending policy",
    summary: "Demonstrate the skills before adding the next building block.",
    objective: "Demonstrate the skills before adding the next building block.",
    what: "Demonstrate the skills before adding the next building block.",
    why: "A familiar-looking screen is not evidence that you can recover or operate the system.",
    risk: "Skipping a missing skill turns the next layer into something you cannot diagnose.",
    status: "published",
    verification: "source-reviewed",
    referenceVersion: "Bitcoin Core 31.1",
    contentUpdated: "2026-09-14",
    estimatedTime: "8–12 min",
    kind: "checkpoint",
    explanation: [
      "Do this without following the earlier lesson line by line. If you need the instructions, return to the exercise, repeat it, and try again later.",
      "Tick each outcome only after you have demonstrated it. These checks record your own assessment in this browser; they are not a certification or a substitute for the actual exercise.",
      "If this system covers your actual threat model, you do not need a more complex spending policy. You may finish the course here. Part III is optional work for a specific authorization problem, not the next compulsory level of expertise.",
    ],
    prerequisites: ["ops-inheritance"],
    sources: [
      {
        label: "Bitcoin Core 31.1: wallet creation, backup and restoration",
        url: "https://github.com/bitcoin/bitcoin/blob/v31.1/doc/managing-wallets.md",
      },
    ],
    reviewNote:
      "v4.1 wording, sequence and source review on 2026-09-14. Earlier hands-on evidence is listed separately. This review does not certify a physical Debian installation or funded Signet exercise.",
    origin: "First-principles curriculum v4",
    checklist: [
      "I can explain my threat model and justify every component.",
      "I can create, name, encrypt, back up and restore a Core wallet without following each instruction.",
      "I can generate a strong passphrase, change it and explain what happens to old backups.",
      "I have received and spent test coins after restoring a backup.",
      "I have built, reviewed, signed offline and broadcast a PSBT.",
      "I have recovered without the original signer and with one backup medium unavailable.",
      "I have a written annual review and recovery procedure.",
      "I can explain why a large balance alone does not require multisig.",
    ],
    chapter: "Maintain the setup",
    optional: false,
    sourceReviewed: "2026-09-14",
    takeaway:
      "A tested single-sig setup can be your completed custody system. Add another spending authority only when it solves a concrete threat.",
  },
  {
    id: "optional-dice",
    slug: "optional-physical-dice-passphrase",
    title: "Optional: generate the passphrase with physical dice",
    summary: "Use manual randomness only for a reason you can explain.",
    objective:
      "Evaluate the extra work, then demonstrate correct dice generation with test material.",
    what: "Add an outer layer only for a named threat, such as wallet metadata exposure.",
    why: "A protection earns its place by addressing a specific threat or educational purpose.",
    risk: "Transcription and lookup mistakes can undermine a long manual procedure.",
    status: "published",
    verification: "source-reviewed",
    referenceVersion: "Original EFF large list · 7,776 distinct entries",
    contentUpdated: "2026-09-14",
    estimatedTime: "20–40 min active",
    kind: "practice",
    explanation: [
      "Physical dice can produce excellent entropy when used correctly. They are not the recommended workflow here because they add manual work without solving a threat present in the default clean-Linux architecture. If you cannot name the threat that dice solve in your setup, use KeePassXC.",
      "Possible reasons include an independently observable physical randomness requirement, unusual distrust of the computer RNG, research or education. State the reason first. Dice do not make a compromised computer safe when you later enter the phrase or create wallet keys on it.",
      "The original EFF large list has 7,776 entries: one for every ordered result of five fair six-sided die readings. Eight words require 40 readings plus recording and lookup. Skipped, duplicated or mistyped results, wrong lookups and repetition by another operator are practical costs. Correct execution can be strong; extra ceremony alone is not a security benefit.",
    ],
    prerequisites: ["generate-passphrase"],
    sources: [
      {
        label: "EFF: original large wordlist",
        url: "https://www.eff.org/files/2016/07/18/eff_large_wordlist.txt",
      },
      {
        label: "EFF: creating strong passphrases",
        url: "https://www.eff.org/dice",
      },
    ],
    reviewNote:
      "v4.1 source and sequence review. Debian package files and generator implementation were inspected; this is not a physical Debian installation or a funded Signet test.",
    origin: "First-principles curriculum v4",
    guidedSteps: [
      {
        id: "reason",
        title: "Name the reason for using dice",
        instructions: [
          "Physical dice can produce excellent entropy when used correctly. They are not recommended for routine use here: forty readings, transcription and lookup add manual work and error opportunities without solving a threat in the default clean-Linux setup.",
          "Write the threat, research question or educational purpose that justifies the extra procedure. For ordinary custody on this course’s clean Debian system, keep KeePassXC as the default.",
        ],
        expectedResult:
          "You can explain why you are accepting the additional manual work.",
        help: "If the reason is only that rolling feels more secure, return to the default generator.",
      },
      {
        id: "roll",
        title: "Generate a disposable phrase from the original EFF list",
        instructions: [
          "Use the original EFF large list linked below, whose five-digit lookup codes use only digits 1–6. It has 7,776 entries. The smaller KeePassXC bundled file is not a substitute for this five-dice lookup table.",
          "For each word, roll one fair six-sided die five times, recording every result in order. Alternatively use five dice with a fixed reading order declared before rolling. Look up that exact code, record the corresponding word and repeat independently eight times. Keep repeated words; do not reroll because a word is inconvenient.",
        ],
        expectedResult:
          "Forty ordered die readings identify eight words through an unambiguous lookup process.",
        help: "Do not guess a missing reading or word. Establish a clear record with disposable test material before relying on this procedure.",
      },
      {
        id: "verify",
        title: "Check the record and test recovery",
        instructions: [
          "Compare each recorded five-digit code with its word, then write the phrase in order with unambiguous case and separators. Eight independent choices from the original 7,776-word list give about 103.40 bits.",
          "Use this phrase only in a disposable Signet wallet. Encrypt, back up, restore and test signing using the separately kept phrase record. Record the added time and any errors before deciding whether this method belongs in your actual recovery plan.",
        ],
        expectedResult:
          "The test phrase and backup work together, and you can assess the operational cost.",
        help: "A successful practice exercise does not remove the need for separate backup and passphrase protection.",
      },
    ],
    optional: true,
    chapter: "Optional extensions",
    sourceReviewed: "2026-09-14",
    takeaway:
      "Correct dice can be strong. Use them only when a concrete threat or educational purpose justifies the extra work.",
    notes: [],
  },
  {
    id: "optional-veracrypt",
    slug: "optional-veracrypt",
    title: "Optional: put the backup inside an encrypted container",
    summary:
      "Add an outer layer only for a named threat, such as wallet metadata exposure.",
    objective:
      "Add an outer layer only for a named threat, such as wallet metadata exposure.",
    what: "Add an outer layer only for a named threat, such as wallet metadata exposure.",
    why: "Core wallet encryption protects private key material without encrypting every wallet record.",
    risk: "A second encryption layer can become a second way to lock yourself out.",
    status: "published",
    verification: "source-reviewed",
    referenceVersion: "Bitcoin Core 31.1",
    contentUpdated: "2026-09-14",
    estimatedTime: "20–40 min active",
    kind: "practice",
    explanation: [
      "VeraCrypt can hold an encrypted Core backup inside a separate encrypted volume. This can protect information outside Core’s private-key encryption boundary, including metadata, when that additional privacy matters to your threat model.",
      "It adds software, a volume format, a second credential and another recovery operation. You still need the Core wallet passphrase after opening the container. A lost or damaged container header can create a further recovery dependency.",
      "The default course does not require VeraCrypt. If you choose it, follow its official volume-creation and backup documentation and prove the whole two-stage recovery with a disposable copy before depending on it.",
    ],
    prerequisites: ["backup-media"],
    sources: [
      {
        label: "VeraCrypt: volume backup and recovery dependencies",
        url: "https://veracrypt.io/en/How%20to%20Back%20Up%20Securely.html",
      },
      {
        label: "Bitcoin Core 31.1: wallet creation, backup and restoration",
        url: "https://github.com/bitcoin/bitcoin/blob/v31.1/doc/managing-wallets.md",
      },
    ],
    reviewNote:
      "v4.1 wording, sequence and source review on 2026-09-14. Earlier hands-on evidence is listed separately. This review does not certify a physical Debian installation or funded Signet exercise.",
    origin: "First-principles curriculum v4",
    guidedSteps: [
      {
        id: "justify-layer-v4",
        title: "Name the extra threat",
        instructions: [
          "Write what the outer container protects that your current file encryption and physical storage do not. Identify the VeraCrypt version, password record and any header-backup plan the official documentation requires.",
        ],
        expectedResult:
          "The extra software and recovery dependencies have a reason.",
        help: "Check whether the problem is opening the container or unlocking the wallet inside it. Each layer needs its own software and credential; test them separately using disposable copies.",
      },
      {
        id: "copy-test-v4",
        title: "Use a copy in a fresh test container",
        instructions: [
          "Create a standard file container through VeraCrypt’s documented wizard on your test computer. Put a copy of an already encrypted test wallet backup inside it. Keep the original backup separately; do not move your only copy into an untested volume. Dismount the container.",
        ],
        expectedResult:
          "The test container can be closed and reopened with its own credential.",
        help: "Check whether the problem is opening the container or unlocking the wallet inside it. Each layer needs its own software and credential; test them separately using disposable copies.",
      },
      {
        id: "two-stage-v4",
        title: "Prove both stages elsewhere",
        instructions: [
          "On a separate maintained test environment, open the copied container, extract the wallet backup and restore it in Bitcoin Core. Unlock the restored test wallet with its separate Core passphrase and complete a test signing operation.",
        ],
        expectedResult:
          "Both the outer container and inner wallet are recoverable without the original machine.",
        help: "Check whether the problem is opening the container or unlocking the wallet inside it. Each layer needs its own software and credential; test them separately using disposable copies.",
      },
    ],
    optional: true,
    chapter: "Optional extensions",
    sourceReviewed: "2026-09-14",
    takeaway:
      "An encrypted container can address an additional privacy need, but its software, password and recovery procedure become new dependencies.",
  },
  productionLesson,
  {
    id: "mainnet-separate-wallet",
    slug: "do-not-turn-signet-wallet-into-mainnet-wallet",
    title: "Start a new wallet for real bitcoin",
    summary:
      "Reuse the procedure you practiced, never the test keys or passwords.",
    objective:
      "Reuse the procedure you practiced, never the test keys or passwords.",
    estimatedTime: "6-10 min",
    status: "published",
    verification: "source-reviewed",
    referenceVersion: "Debian Stable · Bitcoin Core 31.1",
    explanation: [
      "Mainnet is Bitcoin's real network. Create new keys, a new wallet password and separately labeled backups for it. Do not convert your Signet practice wallet into a savings wallet or restore a test backup into this setup.",
      "The roles remain the same: a disconnected computer holds the encrypted private-key wallet, and an online watch-only computer checks the chain and prepares payments. Before depositing anything, restore the new empty wallet offline and check that its separately stored password works.",
    ],
    checklist: [
      "Signet and mainnet wallets have different names",
      "Mainnet gets new keys and a new backup",
      "The test passphrase is never used for real funds",
    ],
    sources: [
      {
        label: "Bitcoin Core 31.1 — Files and Data Directories",
        url: "https://github.com/bitcoin/bitcoin/blob/v31.1/doc/files.md",
      },
      {
        label: "Bitcoin Core 31.1 — Managing the wallet",
        url: "https://github.com/bitcoin/bitcoin/blob/v31.1/doc/managing-wallets.md",
      },
      {
        label: "BIP 325 — Signet",
        url: "https://github.com/bitcoin/bips/blob/master/bip-0325.mediawiki",
      },
    ],
    videoUrl: null,
    origin: "New curriculum v2 lesson",
    optional: true,
    kind: "reading",
    prerequisites: ["single-sig-mastery", "move-to-real-bitcoin"],
    contentUpdated: "2026-09-13",
    notes: [],
    chapter: "Move to real Bitcoin",
    sourceReviewed: "2026-09-13",
    reviewNote:
      "v4.1 wording, sequence and source review on 2026-09-14. Earlier hands-on evidence is listed separately. This review does not certify a physical Debian installation or funded Signet exercise.",
    why: "Reuse the procedure you practiced, never the test keys or passwords.",
    risk: "A missing or misunderstood step can leave you unable to verify the result or recover the wallet. Demonstrate the outcome before continuing.",
    takeaway:
      "Real savings begin with fresh keys, fresh credentials and a separately checked mainnet setup. Training secrets never graduate into real use.",
  },
  {
    id: "real-encryption",
    slug: "encryption-and-passphrase",
    title: "Create the real wallet and its password offline",
    summary:
      "Create an encrypted wallet and make sure you can recover both its backup and password.",
    objective:
      "Create an encrypted wallet and make sure you can recover both its backup and password.",
    estimatedTime: "10–15 min",
    status: "published",
    verification: "source-reviewed",
    referenceVersion: "Debian Stable · Bitcoin Core 31.1",
    reviewNote:
      "v4.1 wording, sequence and source review on 2026-09-14. Earlier hands-on evidence is listed separately. This review does not certify a physical Debian installation or funded Signet exercise.",
    explanation: [
      "Generate a fresh real-wallet passphrase with KeePassXC on the prepared offline signer. Use the verified bundled large list and the eight-independent-word default you rehearsed. Never reuse a test phrase. If the record is stored in an encrypted password database, that database and its unlocking credential become part of recovery.",
      "Keep the real wallet in its own Core data folder, separate from Signet practice files. Make the wallet backup after enabling encryption. Recovery needs both the backup file and the wallet password. Store them so that one failed device cannot take away both.",
    ],
    sources: [
      {
        label: "Bitcoin Core 31.1 · Wallet management",
        url: "https://github.com/bitcoin/bitcoin/blob/v31.1/doc/managing-wallets.md",
      },
      {
        label: "Debian · KeePassXC package",
        url: "https://packages.debian.org/stable/keepassxc",
      },
      {
        label: "Bitcoin Core 31.1: encryption and change-passphrase dialogs",
        url: "https://github.com/bitcoin/bitcoin/blob/v31.1/src/qt/askpassphrasedialog.cpp",
      },
      {
        label: "EFF: original large wordlist (7,776 entries)",
        url: "https://www.eff.org/files/2016/07/18/eff_large_wordlist.txt",
      },
    ],
    codeBlocks: [],
    videoUrl: null,
    origin: "New curriculum v2 lesson",
    optional: true,
    kind: "practice",
    guidedSteps: [
      {
        id: "password",
        title: "Generate and preserve a new password offline",
        instructions: [
          "On the trusted offline signer, repeat the KeePassXC method: Passphrase, (SYSTEM) eff_large.wordlist, eight words, lower case and a space separator. Generate a fresh real-wallet passphrase. Do not invent a pattern, use a browser generator or reuse a test phrase. Physical dice remain an optional alternative only when you can explain the additional threat or purpose.",
          "Preserve it in a recoverable offline record or encrypted password-manager database. Check that you can retrieve it before using it. If using a database, keep its own password recoverable too. You must be able to recover the password even if the device holding the wallet backup fails.",
        ],
        expectedResult:
          "You can retrieve the new random wallet password even if the wallet's backup device is unavailable.",
        help: "Install the Debian-packaged KeePassXC during preparation, before keys exist. Keep its database and its own recovery password separate from the wallet backup; test that access offline.",
      },
      {
        id: "mainnet",
        title: "Start a distinct mainnet data directory",
        instructions: [
          "Close Core. In your home folder create core-mainnet, separate from core-signet. A data directory is simply the folder selected for Core's working files. Run the command below on the disconnected signer. It intentionally leaves out -signet, so Core starts on mainnet.",
          "Check the Network field in Window → Information and the disabled-network status icon before creating a wallet. Mainnet is the real Bitcoin network; the disabled icon describes Core’s peer networking. Keep the computer physically offline too. Do not restore a Signet backup into this folder.",
        ],
        expectedResult:
          "Core uses $HOME/core-mainnet, reports chain = main and remains offline.",
        help: "If the chain or data path differs, stop. Do not load the Signet backup into this setup.",
        command:
          '"$HOME/core/bitcoin-31.1/bin/bitcoin-qt" -datadir="$HOME/core-mainnet" -networkactive=0 -listen=0',
        commandContext: "Linux system terminal · not the Core console",
      },
      {
        id: "create",
        title: "Create and back up savings-offline",
        instructions: [
          "In the offline Core window choose File → Create Wallet, name it savings-offline and enable Encrypt Wallet. Enter the new mainnet password only in Core's dialog, and leave private keys enabled. These are new keys, separate from all practice wallets.",
          "Choose File → Backup Wallet and save mainnet-savings-after-encryption.dat on separate backup media. Create and record a receiving address and the exact backup location. Never put the real password in a terminal command, on this website or alongside an unprotected copy of the backup.",
        ],
        expectedResult:
          "A new encrypted mainnet wallet and post-encryption backup exist. Neither uses Signet keys or passwords.",
        help: "Never store the real password in a shell command, on this website, or with an unprotected copy of the backup.",
        warning:
          "Keep mainnet keys and passwords separate from all Signet material. The signer stays offline.",
      },
    ],
    prerequisites: ["mainnet-separate-wallet", "move-to-real-bitcoin"],
    contentUpdated: "2026-09-14",
    notes: [],
    chapter: "Move to real Bitcoin",
    sourceReviewed: "2026-09-14",
    why: "Create an encrypted wallet and make sure you can recover both its backup and password.",
    risk: "A missing or misunderstood step can leave you unable to verify the result or recover the wallet. Demonstrate the outcome before continuing.",
    takeaway:
      "The real wallet and its new passphrase are created offline. Its tested encrypted backup and password record must remain separately recoverable.",
  },
  {
    id: "real-restore",
    slug: "restore-in-a-clean-test-environment",
    title: "Restore the empty real wallet before depositing",
    summary:
      "Check the backup, password and receiving address on a replacement offline signer.",
    objective:
      "Check the backup, password and receiving address on a replacement offline signer.",
    estimatedTime: "10–15 min",
    status: "published",
    verification: "source-reviewed",
    referenceVersion: "Bitcoin Core 31.1",
    reviewNote:
      "v4.1 wording, sequence and source review on 2026-09-14. Earlier hands-on evidence is listed separately. This review does not certify a physical Debian installation or funded Signet exercise.",
    explanation: [
      "An empty-wallet recovery test uses your actual mainnet backup before it holds funds. Set aside the original signer, restore the file on a trusted offline replacement and check the address you recorded when creating the wallet.",
      "Loading a wallet and unlocking it are different actions. Loading makes its records available in Core. Unlocking uses the password to make protected private keys temporarily available for signing. You must check that the recovered password works; seeing an address alone does not prove that. The later small-value payment will test actual spending.",
    ],
    sources: [
      {
        label: "Bitcoin Core 31.1 — Managing the wallet",
        url: "https://github.com/bitcoin/bitcoin/blob/v31.1/doc/managing-wallets.md",
      },
    ],
    codeBlocks: [],
    videoUrl: null,
    origin: "New curriculum v2 lesson",
    optional: true,
    kind: "practice",
    guidedSteps: [
      {
        id: "restore",
        title: "Restore on a replacement offline system",
        instructions: [
          "Before depositing bitcoin, set the original signer aside and prepare a trusted replacement with verified software. Disconnect it before recovery and use a separate mainnet data folder. Restore mainnet-savings-after-encryption.dat as savings-restored.",
          "In the restored wallet's Core console, use getaddressinfo for the address recorded when you created the wallet. Check that the wallet recognizes the address and that the returned descriptor, which describes its addresses and spending rules, matches your records. Never copy the private wallet file to the online node. This checks an empty wallet; a confirmed spend comes later.",
        ],
        expectedResult:
          "The restored wallet recognizes the recorded mainnet address and its expected descriptors. No private wallet data touched the online node.",
        help: "This is an empty-wallet rehearsal. It verifies recovery artifacts, but cannot yet prove a confirmed spend.",
      },
      {
        id: "unlock",
        title: "Check the recovered password on the signer",
        instructions: [
          "Loading the wallet makes its records visible. Unlocking uses its password to make private keys temporarily available. You must check the actual recovered password, not only whether Core displays the address. Core’s GUI has no general Unlock Wallet command, and this empty wallet has no payment to sign yet. This is the specific reason for using the offline Core console here; later payments use the GUI signing prompt.",
          "With savings-restored selected in the offline Core console, read help walletpassphrase. Follow the syntax shown in that help text to unlock the wallet for 60 seconds with your recovered password. Then run walletlock. Check getwalletinfo afterward; unlocked_until should be 0 when locked. Do not enter the password in the operating-system terminal, paste the command with the password into your notes, or include it in a screenshot or website. If it fails, stop before depositing.",
        ],
        expectedResult:
          "Core accepts the recovered password, and getwalletinfo reports unlocked_until: 0 after walletlock.",
        help: "If the password fails, stop before depositing. Core has no wallet-password reset service. Return to your separate password-recovery records and check that you have the correct password.",
        command: "help walletpassphrase",
        commandContext: "OFFLINE · Core console · savings-restored",
      },
      {
        id: "public",
        title: "Prepare the mainnet watch-only coordinator",
        instructions: [
          "Create a new online savings-watch-only wallet and repeat the public-descriptor export/import from the Signet PSBT lesson, now using savings-restored on the offline signer. The public descriptions let the online wallet recognize the real wallet's addresses without its private keys.",
          "Keep both receive and change branches and their original timestamps. Use the new mainnet descriptor file, not the Signet one. Confirm private_keys_enabled = false and a synchronized mainnet node. Check one exact receiving address on the restored offline signer before using it. Missing old blocks must be recovered for a needed scan, not skipped.",
        ],
        expectedResult:
          "The online wallet knows the mainnet wallet's address rules but has no private keys. The restored offline signer recognizes the receiving address.",
        help: "Do not reuse the Signet descriptor file. If a future restore needs pruned historical blocks, recover against complete relevant history rather than skipping the scan.",
      },
    ],
    prerequisites: ["real-encryption", "move-to-real-bitcoin"],
    contentUpdated: "2026-09-13",
    notes: [],
    chapter: "Move to real Bitcoin",
    sourceReviewed: "2026-09-13",
    why: "Check the backup, password and receiving address on a replacement offline signer.",
    risk: "A missing or misunderstood step can leave you unable to verify the result or recover the wallet. Demonstrate the outcome before continuing.",
    takeaway:
      "An empty-wallet restore proves that your artifacts and password can be recovered before a deposit; the small payment tests actual spending afterward.",
  },
  {
    id: "mainnet-readiness",
    slug: "mainnet-readiness-before-first-deposit",
    title: "Check the setup before a small real-bitcoin test",
    summary:
      "Confirm the empty-wallet recovery before risking even the first test amount.",
    objective:
      "Confirm the empty-wallet recovery before risking even the first test amount.",
    estimatedTime: "8-12 min",
    status: "published",
    verification: "source-reviewed",
    referenceVersion: "Bitcoin Core 31.1",
    explanation: [
      "You should have a new mainnet wallet, separate recoverable backups and password, and an offline replacement that recognizes its address. The online watch-only wallet must have no savings private keys. Check the actual setup rather than relying on this website's progress marks.",
      "This checkpoint permits only the planned small test. It does not prove that spending works yet. The next exercise must send from the restored offline wallet and reach a confirmation before you consider adding substantial savings.",
    ],
    checklist: [
      "I completed the entire Signet cycle and rebuilt both offline-signing roles.",
      "New mainnet keys, passwords and backups are separate from all test material.",
      "The restored offline wallet recognizes the receiving address and accepts the independently recovered password.",
      "The online wallet has private keys disabled; I know how to review outputs and fees offline.",
    ],
    sources: [
      {
        label: "Bitcoin Core 31.1 — Managing the wallet",
        url: "https://github.com/bitcoin/bitcoin/blob/v31.1/doc/managing-wallets.md",
      },
      {
        label: "Bitcoin Core 31.1 — Offline Signing Tutorial",
        url: "https://github.com/bitcoin/bitcoin/blob/v31.1/doc/offline-signing-tutorial.md",
      },
    ],
    callouts: [
      {
        kind: "verify",
        title: "The result we're looking for",
        body: "I can repeat the same process and I know why every step exists.",
      },
    ],
    videoUrl: null,
    origin: "New mainnet checkpoint in curriculum v2.1",
    optional: true,
    kind: "checkpoint",
    prerequisites: ["real-restore", "move-to-real-bitcoin"],
    contentUpdated: "2026-09-13",
    notes: [],
    chapter: "Move to real Bitcoin",
    sourceReviewed: "2026-09-13",
    reviewNote:
      "v4.1 wording, sequence and source review on 2026-09-14. Earlier hands-on evidence is listed separately. This review does not certify a physical Debian installation or funded Signet exercise.",
    why: "Confirm the empty-wallet recovery before risking even the first test amount.",
    risk: "A missing or misunderstood step can leave you unable to verify the result or recover the wallet. Demonstrate the outcome before continuing.",
    takeaway:
      "Passing this checkpoint permits a carefully bounded small test. It is not evidence that the later spend has already succeeded.",
  },
  {
    id: "mainnet-small-test",
    slug: "first-small-mainnet-test",
    title: "Send a small real payment from the restored wallet",
    summary:
      "Prove the actual recovery procedure with an amount you can afford to lose.",
    objective:
      "Prove the actual recovery procedure with an amount you can afford to lose.",
    estimatedTime: "20–30 min active + confirmations",
    status: "published",
    verification: "source-reviewed",
    referenceVersion: "Bitcoin Core 31.1",
    reviewNote:
      "v4.1 wording, sequence and source review on 2026-09-14. Earlier hands-on evidence is listed separately. This review does not certify a physical Debian installation or funded Signet exercise.",
    explanation: [
      "A successful Signet exercise shows that you learned the procedure. It does not test the real wallet's backup and password. This exercise makes a small mainnet deposit, then spends from the wallet restored using those actual recovery records.",
      "Keep the original signer out of the process. Choose a test amount that covers the payment and fees and whose loss you could tolerate. Record the confirmed transaction and any corrections to your written instructions. A successful test is evidence that this setup worked; you must still maintain and protect it afterward.",
    ],
    sources: [
      {
        label: "Bitcoin Core 31.1 · Wallet management",
        url: "https://github.com/bitcoin/bitcoin/blob/v31.1/doc/managing-wallets.md",
      },
      {
        label: "Bitcoin Core 31.1 · Offline signing",
        url: "https://github.com/bitcoin/bitcoin/blob/v31.1/doc/offline-signing-tutorial.md",
      },
    ],
    codeBlocks: [],
    callouts: [
      {
        kind: "mental-model",
        title: "Test the actual wallet too",
        body: "Signet lets you rehearse the process. The small mainnet test checks the actual wallet, backup and password you intend to use. A successful test is evidence that this setup worked, not a guarantee against later loss or tampering.",
      },
    ],
    videoUrl: null,
    origin: "New operational test in curriculum v2.1",
    optional: true,
    kind: "practice",
    guidedSteps: [
      {
        id: "deposit",
        title: "Receive only the test amount",
        instructions: [
          "Use the receiving address already checked on savings-restored. Choose a small amount you could afford to lose that also covers the planned payment and fees. There is no single test amount suitable for everyone.",
          "Compare the full address again before making the transfer, then wait for a confirmation on your own synchronized mainnet node. This means the payment has entered a block that your node checked. If the address differs or the expected receipt is missing, stop and resolve it before sending more.",
        ],
        expectedResult:
          "Your node shows a confirmed test payment to the address checked on the restored mainnet wallet.",
        help: "If the address differs, the node is unsynchronized or the expected receipt is missing, stop and resolve it before sending more.",
      },
      {
        id: "spend",
        title: "Use the restored offline signer",
        instructions: [
          "In savings-watch-only, prepare a small PSBT self-transfer to another address independently checked on savings-restored. Keep the original signer set aside so it cannot supply the signature for this test.",
          "On the restored offline signer, check every output, any change returning to you and the total fee. Sign, save the signed file and return it to the online node for broadcast. Stop for an unknown output or incomplete signatures. If you need to guess, repeat the Signet version of the exercise first.",
        ],
        expectedResult:
          "Only the restored signer authorizes the transaction; the original wallet is not required.",
        help: "Any unknown output or incomplete signature means stop. Repeat the Signet rehearsal if the mainnet procedure requires guessing.",
      },
      {
        id: "confirm",
        title: "Record the successful recovery spend",
        instructions: [
          "Wait for the transaction to confirm on your own node. Match its transaction ID, recipient amounts, change and fee to the payment you reviewed. This ties the network result to the payment the restored signer approved.",
          "Update the recovery card with the successful test date and software versions. Keep current backups on independent devices before considering further deposits. This test shows the setup worked; it does not guarantee protection against later tampering or losing every backup.",
        ],
        expectedResult:
          "You have a confirmed mainnet spend signed from the recovered wallet and a repeatable written procedure.",
        help: "A successful small test is evidence about this setup, not a guarantee against later device compromise or loss of all backups.",
      },
    ],
    prerequisites: ["mainnet-readiness", "move-to-real-bitcoin"],
    contentUpdated: "2026-09-13",
    notes: [],
    chapter: "Move to real Bitcoin",
    sourceReviewed: "2026-09-13",
    why: "Prove the actual recovery procedure with an amount you can afford to lose.",
    risk: "A missing or misunderstood step can leave you unable to verify the result or recover the wallet. Demonstrate the outcome before continuing.",
    takeaway:
      "A confirmed payment signed by the restored offline wallet completes the small-value check before you consider adding more funds.",
  },
  {
    id: "node-migration",
    slug: "migrate-node-data-or-validate-from-scratch",
    title: "Reuse your own block files and rebuild validation state",
    summary:
      "Move a node without treating copied databases as independent verification.",
    objective:
      "Move a node without treating copied databases as independent verification.",
    what: "Move a node without treating copied databases as independent verification.",
    why: "You can preserve downloaded blocks while rebuilding the new installation’s view of them.",
    risk: "Copying wallet files, settings or chainstate casually can import secrets or assumptions you did not intend.",
    status: "published",
    verification: "source-reviewed",
    referenceVersion: "Bitcoin Core 31.1",
    contentUpdated: "2026-09-13",
    estimatedTime: "20–40 min active",
    kind: "practice",
    explanation: [
      "This procedure uses your own intact, unpruned block archive as an input to a fresh node. It rebuilds the block index and chainstate from raw blocks. It does not copy a wallet or claim that a checksum proves consensus validity.",
      "Core normally has assumevalid behavior for historical script checks. For this exercise, -assumevalid=0 disables that optimization while rebuilding. This is a deliberate verification choice, not a requirement for every ordinary installation.",
    ],
    prerequisites: ["single-sig-mastery"],
    sources: [
      {
        label: "Bitcoin Core 31.1: data files",
        url: "https://github.com/bitcoin/bitcoin/blob/v31.1/doc/files.md",
      },
    ],
    reviewNote:
      "v4.1 wording, sequence and source review on 2026-09-14. Earlier hands-on evidence is listed separately. This review does not certify a physical Debian installation or funded Signet exercise.",
    origin: "First-principles curriculum v4",
    guidedSteps: [
      {
        id: "prepare-copy-v4",
        title: "Record and shut down the source",
        instructions: [
          "In the source GUI Information window, record network and block height. Confirm that the archive is unpruned. Shut Core down and wait until its process has exited before copying files.",
          "Install and authenticate Core 31.1 on the receiving computer. Use the same network and a fresh, empty data directory. Keep a separately tested wallet backup; do not use node migration as your wallet recovery method.",
        ],
        expectedResult:
          "The source is stopped, the network is known and the destination directory is empty.",
        help: "Confirm the network-specific directory and that the source was shut down. Keep xor.dat with the copied blocks. A partial or damaged archive may require downloading missing data; it is not fixed by copying chainstate.",
      },
      {
        id: "copy-blocks-v4",
        title: "Copy the whole blocks directory from your own archive",
        instructions: [
          "Copy only the network’s blocks directory into the same network location under the fresh data directory. Preserve the complete directory, including xor.dat if present: newer Core versions can obfuscate block files with that local XOR key. For Signet this directory is under signet/blocks; mainnet uses blocks directly.",
          "Do not copy chainstate, bitcoin.conf, settings.json, peers, cookie files or wallets as part of this procedure. The index copied inside blocks is disposable and will be rebuilt by -reindex. Compare transfer checksums to detect copy errors.",
        ],
        expectedResult:
          "The destination contains the original block bytes and required xor.dat, while configuration and wallet state are deliberately separate.",
        help: "Confirm the network-specific directory and that the source was shut down. Keep xor.dat with the copied blocks. A partial or damaged archive may require downloading missing data; it is not fixed by copying chainstate.",
      },
      {
        id: "rebuild-v4",
        title: "Rebuild the practice node",
        instructions: [
          "For the first attempt, use your Signet practice archive and the command below, substituting the absolute path to the prepared fresh directory. Do not use a directory containing the only copy of a wallet.",
          "-reindex rebuilds the block index and chainstate; -assumevalid=0 requests historical script checking too. The node can fetch missing or newer blocks from its peers once connected. Remove these one-time options on subsequent ordinary launches.",
        ],
        expectedResult:
          "The fresh node processes local blocks, rebuilds its state and catches up on the selected network.",
        command:
          "./bitcoin-qt -signet -datadir=/absolute/path/to/fresh-practice-node -reindex -assumevalid=0",
        commandContext: "Debian terminal · verified Core bin directory",
        help: "Confirm the network-specific directory and that the source was shut down. Keep xor.dat with the copied blocks. A partial or damaged archive may require downloading missing data; it is not fixed by copying chainstate.",
      },
      {
        id: "check-migration-v4",
        title: "Verify the resulting node",
        instructions: [
          "Check the network, height and “Up to date” state in the GUI. Inspect the debug log for reindex progress or errors. At an agreed height, compare a block hash using the optional advanced getblockhash command if you need a precise identity check.",
          "A pruned archive cannot recreate missing history. If your source is pruned, use a full archive you control or download and validate the missing blocks; do not promise a complete local rebuild from a partial archive.",
        ],
        expectedResult:
          "The replacement node is synchronized and its separately recovered wallet, if needed, is handled through the wallet-recovery procedure.",
        help: "Confirm the network-specific directory and that the source was shut down. Keep xor.dat with the copied blocks. A partial or damaged archive may require downloading missing data; it is not fixed by copying chainstate.",
      },
    ],
    optional: true,
    chapter: "Optional extensions",
    sourceReviewed: "2026-09-13",
    takeaway:
      "You can reuse your own block files while rebuilding validation state. Copying node data is neither a wallet backup nor a substitute for validation.",
    practicalReview: {
      date: "2026-09-13",
      scope:
        "Core 31.1 on macOS ARM, isolated Regtest: clean shutdown, blocks including xor.dat copied to a fresh data directory, -reindex -assumevalid=0 restored the same height and best-block hash without peers or wallet files. A full Signet or mainnet archive was not migrated.",
    },
  },
  {
    id: "optional-tails",
    slug: "optional-tails-offline-environment",
    title: "Optional: use Tails as the offline operating system",
    summary:
      "Understand what a live system changes before choosing it over the default Debian signer.",
    objective:
      "Understand what a live system changes before choosing it over the default Debian signer.",
    estimatedTime: "10–15 min",
    status: "published",
    verification: "source-reviewed",
    referenceVersion: "Bitcoin Core 31.1 · Tails 7.11 (target)",
    reviewNote:
      "Optional path reviewed against Tails documentation. No physical Tails boot, persistence or hardware compatibility test was performed in the v4 review.",
    explanation: [
      "Tails is an operating system you start from a USB drive. A live system runs from that removable media rather than a normal installation on the computer's internal disk. Amnesic means that most session data is discarded at shutdown. This can reduce the information left on the device, but does not make altered hardware or firmware trustworthy.",
      "The optional procedure in this lesson uses Tails Persistent Storage, an encrypted area that deliberately keeps selected files after shutdown. Your wallet therefore remains available between sessions. You still need separate Core backups, passwords and a full recovery test. Learn the default Debian procedure first, and choose Tails only if the difference solves a problem in your own threat model.",
    ],
    concepts: [],
    sources: [
      {
        label: "Tails · Hardware requirements",
        url: "https://tails.net/doc/about/requirements/index.en.html",
      },
      {
        label: "Tails · Installation and verification",
        url: "https://tails.net/install/",
      },
      {
        label: "Tails · Offline Mode",
        url: "https://tails.net/doc/first_steps/welcome_screen/index.en.html",
      },
      {
        label: "Tails · Create Persistent Storage",
        url: "https://tails.net/doc/persistent_storage/create/index.en.html",
      },
      {
        label: "Tails · Persistent Folder",
        url: "https://tails.net/doc/persistent_storage/configure/index.en.html",
      },
      {
        label: "Bitcoin Core 31.1 · Wallet management",
        url: "https://github.com/bitcoin/bitcoin/blob/v31.1/doc/managing-wallets.md",
      },
      {
        label: "Tails · Hardware and firmware limitations",
        url: "https://tails.net/doc/about/warnings/index.en.html#untrusted_computer",
      },
    ],
    codeBlocks: [],
    callouts: [],
    videoUrl: null,
    origin:
      "Optional architecture added 2026-09-13; physical rehearsal pending.",
    optional: true,
    kind: "practice",
    guidedSteps: [
      {
        id: "tails-benefit",
        title: "Decide whether Tails addresses a risk you face",
        instructions: [
          "Tails starts from a USB drive. It can reduce information left behind by a session, while a normal persistent Debian installation keeps saved files and settings. After completing the Debian recovery rehearsal, write which particular risk would be reduced by using Tails.",
          "Write down the extra USB-startup, storage and recovery steps you would accept. Continue only if that benefit matters. This optional path uses encrypted Persistent Storage for some files, so it is not a completely amnesic wallet. Starting Tails cannot make altered hardware or firmware trustworthy.",
        ],
        expectedResult:
          "You can explain which risk Tails addresses and why the extra setup and maintenance are worthwhile for you.",
        help: "Tails needs supported x86-64 hardware; Apple Silicon is not supported. A cloned system USB can reduce downtime but cannot replace independent Core backups and password recovery.",
      },
      {
        id: "boot",
        title: "Boot verified Tails without networking",
        instructions: [
          "Follow Tails' official installation and verification instructions for a supported computer. An installation image is the downloadable file used to create the system USB. Installing it erases the selected USB, so identify that device and preserve any needed files first.",
          "Boot means start the computer using that system. Unplug Ethernet and select Offline Mode in the Welcome Screen's additional network settings before entering the desktop. Check this setting every time; do not assume the last session's choice was retained.",
        ],
        expectedResult:
          "The desktop starts without networking; the selected USB is the intended Tails system.",
        help: "Do not assume a previous session's network setting was retained. Recheck Offline Mode on every boot.",
      },
      {
        id: "persistence",
        title: "Create storage that survives shutdown",
        instructions: [
          "Persistent Storage is an encrypted area on the Tails USB that deliberately keeps selected files after shutdown. On the first startup, open Tails → Persistent Storage, create it and enable Persistent Folder. Keep its password in a separate recoverable place.",
          "On later startups, unlock that existing storage in the Welcome Screen, then recheck Offline Mode. Creating storage once and unlocking it later are different actions. The storage password protects this area; Core's wallet password separately protects its private keys. You need independent Core backups even when persistence works.",
        ],
        expectedResult:
          "The Persistent folder is accessible. You can distinguish creating storage once from unlocking it on later boots.",
        help: "The Tails storage password and Core wallet password protect different things. Enabling the Electrum persistence feature does not preserve a Core wallet.",
      },
      {
        id: "datadir",
        title: "Put Core and its data in Persistent",
        instructions: [
          "Before any wallet keys exist, bring the verified Linux x86-64 Core 31.1 archive and verification records from the preparation computer. Unpack it at /home/amnesia/Persistent/core/bitcoin-31.1. In the Files application, create /home/amnesia/Persistent/core-signet for Core's data.",
          "Start Core with the explicit command below. The paths identify the saved program and data inside Persistent, rather than the temporary home folder. In Core's console, check networkactive = false using getnetworkinfo. If the program or required supporting software cannot run, stop. Do not connect a signer holding private keys to download a fix or silently switch to temporary storage.",
        ],
        expectedResult:
          "Core opens on Signet using the Persistent/core-signet data directory and networkactive = false in getnetworkinfo.",
        help: "If Persistent is locked or the binary cannot run, stop. Do not fall back to the default temporary home folder or connect the signer to download dependencies.",
        command:
          "/home/amnesia/Persistent/core/bitcoin-31.1/bin/bitcoin-qt -signet -datadir=/home/amnesia/Persistent/core-signet -networkactive=0 -listen=0",
        commandContext: "Linux system terminal · not the Core console",
      },
      {
        id: "wallet",
        title: "Create and back up an offline test wallet",
        instructions: [
          "In the offline Core window, create signet-offline-wallet with Encrypt Wallet enabled and a dedicated test password. Keep private keys enabled so it can sign. Choose File → Backup Wallet and save signet-offline-after-encryption.dat on a separate backup device.",
          "Create and record an address using Receive before closing Core normally. Keep wallet backups and passwords off the regular PSBT transfer USB. Tails Persistent Storage is the working copy, not a substitute for a backup on another device.",
        ],
        expectedResult:
          "An encrypted offline test wallet and a separate Core backup exist, and you have an address for comparison.",
        help: "Do not put wallet backups or passwords on the routine PSBT transfer medium. Tails persistence is working storage, not your only backup.",
      },
      {
        id: "coldboot",
        title: "Verify after a complete shutdown",
        instructions: [
          "Shut Tails down completely and start the computer again. Unlock Persistent Storage, select Offline Mode and start Core with the same saved-data command. Open signet-offline-wallet and find the receiving address you recorded.",
          "Check that Core remains offline and the wallet survived shutdown. If it is missing, do not create another wallet and mark this done. Check whether Persistent Storage is unlocked and whether the data path is correct. Keep the independent backup for a separate offline recovery rehearsal.",
        ],
        expectedResult:
          "The wallet and recorded address survive shutdown; Core remains offline.",
        help: "If the wallet is missing, do not create a replacement and mark this done. Check the mounted Persistent folder and data path. Restore only in an offline environment.",
      },
    ],
    prerequisites: ["offline-mastery"],
    notes: [
      "This optional path keeps Core and working wallet files in encrypted Persistent Storage, the area of a Tails USB whose contents survive shutdown. Those files remain writable. A setup that keeps nothing between sessions would need a separate restore-on-every-start procedure and its own practical test. Both approaches still need independent wallet backups and separate password recovery.",
    ],
    contentUpdated: "2026-09-13",
    chapter: "Optional extensions",
    sourceReviewed: "2026-09-13",
    why: "Understand what a live system changes before choosing it over the default Debian signer.",
    risk: "A missing or misunderstood step can leave you unable to verify the result or recover the wallet. Demonstrate the outcome before continuing.",
    takeaway:
      "Tails is an optional live-system choice. Persistent Storage and independent wallet recovery still need deliberate handling.",
  },
  {
    id: "architecture-path-a",
    slug: "path-a-online-encrypted-core-wallet",
    title: "Optional: keep a small spending wallet online",
    summary:
      "Understand the simpler hot-wallet approach and its exposure to online attacks.",
    objective:
      "Understand the simpler hot-wallet approach and its exposure to online attacks.",
    estimatedTime: "8-12 min",
    status: "published",
    verification: "source-reviewed",
    referenceVersion: "Bitcoin Core 31.1",
    explanation: [
      "A hot wallet holds private keys on a device connected to a network. The same computer can prepare and sign a payment, so there are fewer devices and file transfers to manage. Encryption protects stored key material while locked, but malware may capture secrets or misuse keys when the wallet is unlocked.",
      "A simpler setup can reduce mistakes if you cannot reliably operate a more involved one. That does not make an online computer suitable for every amount or threat. This course's recommended setup for long-term savings keeps the keys on a separate offline signer. Decide what loss you could tolerate before using an online spending wallet.",
    ],
    sources: [
      {
        label: "Bitcoin Core 31.1 — Managing the wallet",
        url: "https://github.com/bitcoin/bitcoin/blob/v31.1/doc/managing-wallets.md",
      },
    ],
    videoUrl: null,
    origin: "New curriculum v2 lesson",
    optional: true,
    kind: "reading",
    contentUpdated: "2026-09-13",
    notes: [],
    chapter: "Optional extensions",
    sourceReviewed: "2026-09-13",
    reviewNote:
      "v4.1 wording, sequence and source review on 2026-09-14. Earlier hands-on evidence is listed separately. This review does not certify a physical Debian installation or funded Signet exercise.",
    why: "Understand the simpler hot-wallet approach and its exposure to online attacks.",
    risk: "A missing or misunderstood step can leave you unable to verify the result or recover the wallet. Demonstrate the outcome before continuing.",
    takeaway:
      "An online spending wallet accepts online key exposure for convenience. Its purpose and risk differ from the recommended offline savings wallet.",
    prerequisites: ["single-sig-mastery"],
  },
]
