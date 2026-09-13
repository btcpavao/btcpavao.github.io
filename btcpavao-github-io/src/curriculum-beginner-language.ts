import type { PlayerLesson } from "@/bitcoin-core-curriculum-player-en-data"
import type { GuidedStep } from "@/curriculum-learning"

// Reader-facing copy only. Identities, commands, prerequisites, results and
// practical-review gates belong to the underlying procedures.
type Introduction = [title: string, objective: string, ...paragraphs: string[]]
const introductions: Record<string, Introduction> = {
  "0.1": [
    "What you will learn",
    "Understand what lets you spend bitcoin and what you need to recover it.",
    "Self-custody means that you control the secrets needed to spend your bitcoin. A private key is a secret number that your software uses to approve a payment with a digital signature. Your wallet manages these keys and keeps track of your payments. Bitcoin Core is the program we will use. It can also run as a node, checking Bitcoin's transaction history against its rules.",
    "You will practice with test coins on Signet, a separate Bitcoin network whose coins are not intended to have monetary value. Later, you will learn to approve payments on a computer disconnected from the internet. You will practice restoring a wallet from its backup, so you can regain access to your bitcoin if the original computer fails.",
  ],
  "0.2": [
    "Decide what you need to protect",
    "Write down two things that could go wrong and how you would recover.",
    "A threat model is your answer to three questions: what am I protecting, what could go wrong, and what am I willing to do about it? Start with your own circumstances. Losing a practice wallet is different from losing family savings.",
    "Every precaution can create another problem to manage. A password helps protect a backup if it is stolen, but you also need a way to recover the password. Choose a setup you can explain and repeat. More devices and more steps do not automatically make it safer.",
  ],
  "1.5": [
    "Why this course uses ordinary computers and Bitcoin Core",
    "Understand how the choice of hardware affects who can identify you as a Bitcoin target.",
    "For savings, this course recommends generic, non-Bitcoin-specific hardware: ordinary computers that could run many kinds of software. Buying one does not, by itself, announce that you plan to hold bitcoin. A hardware wallet is sold specifically for managing Bitcoin or other cryptocurrencies, so its purchase gives an attacker a much stronger clue. We deliberately avoid that signal and the wallet-device supply chain behind it.",
    "Once acquired, these computers are dedicated to custody, with no everyday browsing or email. They run Linux, an operating system, and Bitcoin Core for the wallet, transaction checks and signing. Linux and Core are open source, so their code is available for inspection. The computer holding private keys stays offline. Our recommendation combines less revealing hardware purchases, mature software, encrypted wallet backups and tested recovery; it does not rest on the laptop alone.",
  ],
  "signet-why": [
    "Practice with test coins first",
    "Learn the whole payment and recovery process before risking real bitcoin.",
    "Signet is a separate network for practicing with Bitcoin software. Its test coins are not intended to have monetary value. You can receive them, send them, make mistakes and repeat the exercise without putting your savings at risk. Mainnet is the real Bitcoin network, where payments transfer bitcoin that has monetary value.",
    "You will receive test coins, send a small amount, save a wallet backup and restore the wallet from that file. Then you will send again using the restored wallet. That final payment checks whether the backup restores your ability to spend. Simply copying the file does not establish that.",
  ],
  "signet-vs-mainnet": [
    "Check whether you are using test coins or real bitcoin",
    "Recognize Signet and mainnet before creating a wallet or sending a payment.",
    "Mainnet and Signet keep separate transaction histories. A Signet payment does not move real mainnet bitcoin. Core chooses which network to use when it starts. In this course, adding -signet to the launch command selects the practice network.",
    "Core's console is a panel inside the application where you can enter text commands. The command getblockchaininfo reports the selected network in a field named chain. The value signet means our practice network; main means real Bitcoin. Check that value instead of guessing from a wallet name or an address. Addresses on some other test networks look like Signet addresses.",
  ],
  "0.3": [
    "Good security also depends on what you do",
    "Spot everyday mistakes that encryption cannot fix.",
    "Cryptography is the mathematics behind digital signatures and encryption. It can make it extremely difficult to forge a signature or read an encrypted secret without its password. It cannot stop you from deleting your only backup, forgetting the password or approving a payment to the wrong address.",
    "A security procedure is the set of actions you repeat: check the network, check the recipient, keep separate recovery copies and practice using them. Write the steps down. If a step depends on your memory or on guessing what a warning means, improve the instructions before entrusting the setup with your savings.",
  ],
  "2.1": [
    "What Bitcoin Core does",
    "Separate checking Bitcoin's history from holding the keys that approve payments.",
    "Bitcoin Core can do two different jobs. As a node, it downloads blocks, which are batches of transactions, and checks that they follow Bitcoin's rules. Together, these linked blocks form the blockchain. As a wallet, Core manages keys, creates addresses and prepares or signs payments.",
    "The node can run without a wallet loaded. A wallet can also hold keys and sign a prepared payment without downloading the blockchain. Later we put these jobs on separate computers: an online computer checks the history, while an offline computer keeps the private keys.",
  ],
  "own-node": [
    "What your own node checks for you",
    "Understand why you might check transaction history on your own computer.",
    "A node is software that checks blocks and transactions against Bitcoin's rules. When your wallet uses your own node, your computer checks the history it relies on instead of accepting a wallet service's account of your balance and payments.",
    "Running a node does not mean you must operate a public website or keep a computer on all day. The online computer needs to catch up with the network before you rely on its view of payments. It can check all the rules while keeping only part of the old block archive, an option called pruning.",
  ],
  "core-development": [
    "Widely reviewed software can still have bugs",
    "Know what public review tells you, and what you still need to check.",
    "Bitcoin Core's source code and proposed changes are public. Developers review changes and run tests before releasing new versions. A bug is a mistake in the software; a regression is a change that breaks something that previously worked.",
    "Public review and testing give us reasons to trust Core, but they do not guarantee that the software is flawless or that your computer is safe. You still need to obtain the intended release, verify the download, read upgrade instructions and test your own recovery procedure. Recognizing the name of a download is no substitute for checking it.",
  ],
  "1.2": [
    "Why this course uses Core for every wallet task",
    "Understand why you do not need to add Sparrow to follow this course.",
    "Sparrow is another Bitcoin wallet application. It can prepare payments, work with hardware wallets and manage setups that require several signatures. Those features can be useful, but you do not need them to complete this course.",
    "Here, Bitcoin Core already performs the wallet, signing and recovery tasks we teach. Adding another wallet application would mean another interface, file format and update process to understand. You can compare Sparrow later using disposable test wallets. Use the documented Core procedure for the real keys and backups you create in this course.",
  ],
  "1.3": [
    "Why we do not mix Electrum and Core recovery methods",
    "Recognize that different wallet applications can require different recovery information.",
    "Electrum is a separate Bitcoin wallet application. It normally obtains information through Electrum servers instead of validating the entire blockchain itself. It also uses its own wallet-file formats, encryption settings and recovery-word system.",
    "A recovery method that works in one application may not work in another. This course uses Bitcoin Core wallet backups throughout. You do not need to install Electrum, create its recovery words or move your Core keys into it to complete the lessons.",
  ],
  "1.1": [
    "Why Bitcoin-specific devices attract targeted attacks",
    "Connect the product's purpose, its customer records and the economics of attacking its users.",
    "An attacker looking for bitcoin must find people likely to control it. A hardware-wallet customer list does part of that work: the product's purpose identifies a group with a likely financial use for it. A list of ordinary laptop buyers is much less specific. This concentration can act as an economic honeypot, meaning an attractive pool of potential victims. It is not a deliberately planted security trap, and a purchase does not reveal anyone's balance.",
    "This is the targeting asymmetry behind our hardware choice. A Bitcoin-focused attacker can concentrate on one wallet brand, its deliveries, firmware updates and recovery habits. Firmware is the low-level software built into a device. Supply-chain attacks alter a product during manufacture, distribution or delivery. Generic hardware makes a purchase less useful for selecting Bitcoin victims, although an attacker who already knows your identity or custody setup can still target your computer.",
    "Hardware inspection is a separate problem. A backdoor is a hidden way to bypass the intended protection. Checking a downloaded program against a published fingerprint is cheap and repeatable. That establishes a file match, not the absence of malicious code. Establishing what every chip actually does can require specialist equipment and destructive examination. Research has demonstrated chip modifications that evade optical inspection. Reading published source code, checking a seal or using attestation, a device-authenticity check, cannot prove that all the hardware is free of backdoors. This limitation applies to ordinary computers too.",
    "Attack and review have different economics. A thief can profit directly from a weakness. Preventing that loss requires someone to fund skilled reviewers, equipment and time. Public source code makes review possible; it does not tell us whether the relevant code path and the shipped device were examined thoroughly. The Coldcard case below shows why we do not equate available source with completed security review.",
    "Some institutional custody systems use tools quite different from retail hardware wallets. Coinbase's 2025 annual report, for example, describes proprietary software and hardware security modules for cold-storage custody. A hardware security module is a specialized device for protecting cryptographic keys within a larger system. Security work on an institution's own system does not tell us how thoroughly a consumer product has been reviewed. A claim about review quality needs evidence of the work actually performed.",
  ],
  "1.4": [
    "Why your Core backup is a file, not a list of recovery words",
    "Understand why we back up the wallet's records as well as the secret that generates its keys.",
    "BIP39 is a recovery-word specification introduced in 2013 by four authors, including Trezor's Marek Palatinus and Pavol Rusnak. It made machine-generated secret data easier to write down and transfer, helping make hardware-wallet recovery more usable. The words produce a starting secret, often called a seed. BIP32 then describes how to derive, or calculate, a family of keys from a starting secret. BIP39 is also used by software wallets; it is not restricted to hardware devices.",
    "We deliberately choose a different recovery model. Core's wallet.dat is a wallet database: it holds keys, address descriptions and wallet records. Use Core's Backup Wallet function to make a consistent snapshot, then keep the encrypted backup and its password separately. This preserves the stored wallet context as well as the secrets. For the offline Core workflow taught here, we consider that a better security model: fewer recovery conventions to reconstruct and a backup we can actually restore and test.",
  ],
  "signet-install-verify": [
    "Download Core and check that it is the intended release",
    "Verify the download and identify the people whose release signatures you trust.",
    "A download check has two parts. A checksum is a short fingerprint calculated from a file's contents; it helps detect whether the file changed. A digital signature connects the published checksum list to a signing key. You must also establish whose key it is, otherwise an attacker could supply their own file, checksum and signature.",
    "Before you run Core, the steps in this lesson walk you through preparing the tools, checking the file and identifying several release signers. They explain the messages you should expect. These checks do not prove that the program has no bugs or that your computer is free of malicious software.",
  ],
  "signet-start": [
    "Open Core on the Signet practice network",
    "Start Core on Signet and check when your node has caught up.",
    "Core's application window is its graphical user interface, or GUI. It includes the node as well as the wallet controls. You do not need to start another background program for these exercises.",
    "Synchronization means downloading and checking the blocks your node is missing. Wait for it to finish before relying on the node to check received coins or send transactions. You can prepare an empty practice wallet while it catches up.",
  ],
  "signet-first-wallet": [
    "Create a wallet used only for practice",
    "Create the named test wallet and check that it can hold signing keys.",
    "A wallet name is a local label, not a Bitcoin address. We use signet-training-wallet so you can recognize this practice wallet in Core's wallet selector. Never reuse its keys or password for real savings.",
    "Core can create different kinds of wallet. For this exercise, it must contain private keys so that it can sign a test payment. The next lesson encrypts those keys and makes a fresh backup before you receive test coins.",
  ],
  "signet-encrypt-new-backup": [
    "Protect the test wallet with a password and back it up",
    "Save a new backup after encryption and record its password separately.",
    "Encryption scrambles the wallet's private-key material so that Core needs the wallet password to use it. Core calls this password a passphrase. It has no password-reset service. Encryption also cannot protect secrets from malicious software that watches you unlock the wallet, and it does not hide every address or transaction stored in the file.",
    "When this Core version first encrypts the wallet, it replaces the starting secret used for new keys and refreshes its prepared keys. A backup made before encryption will not cover the new keys. Make the new backup immediately, before receiving coins, and keep the password in a separate recoverable place.",
  ],
  "signet-receive-send": [
    "Receive test coins and send a small payment to yourself",
    "Recognize the amount received, the payment, the fee and any money returned as change.",
    "A receiving address tells a sender where to pay. It is public information you can share for that payment, not a password or a private key. A Signet faucet is a service that sends small amounts of free test coins to your practice address.",
    "A confirmation means that a transaction has been included in a block. When you later spend a received amount, Core may use more than the payment needs and return the remainder to your own wallet as change. The transaction fee is the difference between everything spent and everything paid out, including that change.",
  ],
  "signet-restore": [
    "Rebuild the test wallet from its backup",
    "Check that the restored wallet recognizes the address and payment you recorded.",
    "Restoring means asking Core to create a usable wallet from your saved backup file. We give the restored copy a different name and keep the original closed. Nothing needs to be deleted for this exercise.",
    "Core may scan stored blocks to find payments belonging to the restored wallet. This is a rescan. Seeing the expected address and transaction is a useful first check. The next lesson tests the password and signing keys by sending from the restored copy.",
  ],
  "signet-transact-again": [
    "Prove that the restored wallet can send",
    "Send a confirmed test payment using only the wallet restored from backup.",
    "A wallet can display a balance even when it cannot sign. This exercise checks the missing piece: whether your recovered wallet and password can actually approve a payment.",
    "Keep the original wallet closed. Send a small amount to another address in your own restored test wallet, then wait for a confirmation. Record the transaction ID, the reference number that identifies this payment in the transaction history.",
  ],
  "signet-readiness": [
    "Check that you completed the whole practice cycle",
    "Confirm what you did in Core before moving to a two-computer setup.",
    "You should now have created a test wallet, encrypted it, saved a backup, received and sent test coins, restored the backup and sent again from the restored wallet. If a step did not work, return to it before continuing.",
    "The checkboxes on this website record what you say you completed. They cannot inspect Core, your wallet or your transactions. A draft lesson can be read, but its completion stays unavailable until its procedure has been practically tested and published.",
  ],
  "signet-entropy-deep-dive": [
    "How Core creates unpredictable private keys",
    "Understand why you should let the software generate wallet keys.",
    "A private key must be unpredictable. Entropy is a way of describing uncertainty in the information used to make a secret. A random-number generator, or RNG, produces values for the program. A cryptographically secure generator, often called a CSPRNG, is designed so that an attacker cannot predict its output from what they know.",
    "Core combines randomness from the operating system with its own internal generator and other inputs, then checks that the result is a valid key for Bitcoin's signature mathematics. The name secp256k1 identifies that mathematical system. You do not need to perform these calculations or invent random words. Use verified software on a computer you trust, and protect the resulting wallet backup.",
  ],
  "2.2": [
    "The node, wallet and blockchain are different things",
    "Know which data you can download again and which data you must back up.",
    "The blockchain is the public history of confirmed transactions. A node downloads and checks that history. Your wallet contains the keys and records needed to recognize and spend your own bitcoin. The bitcoin is not a collection of coins stored inside the wallet file.",
    "You can download the public history again. You cannot download lost private keys or your wallet password from the network. Save wallet backups separately from the computer's working data. A synchronized node without your keys is not a replacement for a wallet backup.",
  ],
  "ibd-separation": [
    "What you can practice while the node catches up",
    "Separate wallet preparation from actions that need current transaction history.",
    "Initial Block Download, shortened to IBD, is the node's first download and check of the blockchain. Until it catches up, its view of received coins and confirmations is incomplete.",
    "You can create an empty practice wallet, encrypt it, make a backup and try loading that backup before IBD finishes. Wait for synchronization before receiving and spending in the online exercises. Later, the offline signer will approve prepared transactions without downloading a blockchain at all.",
  ],
  "2.3": [
    "Keep every block or save disk space with pruning",
    "Understand what pruning saves and how it affects wallet recovery.",
    "An archival full node keeps the old blocks after checking them. A pruned full node checks the same Bitcoin rules but deletes older block files to save disk space. Pruning does not mean trusting someone else to validate the transactions, and an archival node is not required for safe wallet operation.",
    "The difference matters when restoring a wallet. Core may need old blocks to find its earlier payments. If your pruned node has deleted those blocks, you need access to that history again, including downloading and validating it when necessary. Keeping the full archive makes that task easier when you have enough storage. Neither choice replaces wallet backups.",
  ],
  "core-not-server": [
    "Your node does not have to run all day",
    "Understand when the online node needs to catch up with the network.",
    "A server is a computer providing a service to other computers. You do not need to operate a public server simply to use Core for your own wallet. You may shut down your node normally and start it when needed.",
    "While it is off, it does not learn about new blocks. On restart it must download and check what it missed before you rely on its current view. Keeping it running can make payments more convenient, but backups are still essential. The offline signer still needs no network connection.",
  ],
  "2.6": [
    "Find the wallet data that needs a backup",
    "Distinguish the wallet file from the much larger public blockchain data.",
    "Core's data directory is the folder where it stores its working files. It can contain blockchain blocks, a database called chainstate that tracks currently unspent amounts, and wallet folders. wallet.dat is a wallet database file, not the blockchain itself.",
    "Use Core's File → Backup Wallet command to make a wallet backup. Do not assume that copying an open database by hand produces a usable copy. Record where the backup is saved and keep its password separately. The blockchain can be downloaded again; a lost wallet secret cannot.",
  ],
  "node-migration": [
    "Move a node to another computer",
    "Treat moving blockchain data and recovering wallet keys as separate jobs.",
    "Migration means moving an existing setup to another computer or software version. For a node, you can preserve compatible blockchain data to avoid downloading everything again, or let the new node start a fresh download and validation.",
    "Neither method recovers a missing private-key wallet. Back up wallets and relevant settings separately before maintenance, shut Core down normally and follow the upgrade instructions for the versions involved. On the online computer in this course, the savings wallet must remain watch-only, with no savings private keys.",
  ],
  "architecture-choice": [
    "Choose the two-computer setup used in this course",
    "Give one computer the online work and the other the private signing keys.",
    "Architecture means how the parts of your setup fit together. Our default uses two ordinary computers reserved for this purpose. Both run Debian Stable, a Linux operating system chosen for predictable long-term maintenance, and Bitcoin Core. The online computer checks Bitcoin's history and prepares payments. The offline computer holds the private keys and approves those payments.",
    "The online savings wallet is watch-only: it can recognize your addresses and payments but cannot sign a transaction. The offline computer is the signer. Its Debian installation is persistent, meaning programs and saved files remain after shutdown. Practice using and recovering this setup with Signet test coins first. Tails, an optional operating system started from a USB drive, comes later if you have a reason to use it.",
  ],
  "2.4": [
    "How the online computer and offline signer work together",
    "Follow a proposed payment from preparation through approval to broadcast.",
    "The online node checks the blockchain and prepares a proposed payment. Its watch-only wallet has public information about your addresses but no savings private keys. It saves the proposal as a PSBT, a Partially Signed Bitcoin Transaction file. That file carries the payment details and information needed for signing.",
    "You move the PSBT to the offline signer, check the recipient, amounts, change and fee, then approve it with the private keys. You return the signed file to the online node for broadcast, which means sending the transaction to the network. The private keys remain offline. The signer checks the proposal; it does not independently check the whole blockchain or whether an input has already been spent.",
  ],
  "real-device": [
    "Choose the computers and label the storage devices",
    "Decide which job each computer and storage device will do before installing software.",
    "Dedicated means reserved for this task. Generic hardware means an ordinary computer rather than a product built specifically for Bitcoin. The examples use x86-64 computers, the processor family also called amd64 in Debian downloads. Software built for another processor may not run on your device.",
    "Media means storage devices such as USB drives, external disks or optical discs. Keep the installation USB, the installed system disk, wallet backup devices and payment-transfer USB separate. A label should tell you what a device contains and which computer may use it. Two files on one failed drive are both lost.",
  ],
  "ops-malware": [
    "Transfer payment files safely between the computers",
    "Decide which files may cross between the computers and how you will check the recipient.",
    "Malware is software designed to harm you, steal information or change what your computer does. Keeping the signer offline blocks ordinary network access, but a USB drive can still bring it malicious files. An air gap means there is no network connection between the devices; it does not make transferred data safe.",
    "Use the transfer device only for the expected public wallet descriptions and PSBT payment files. Never put private wallet backups or passwords on it. Before signing, compare the proposed payment with an independently obtained record of what you intended to pay. A second screen showing the same substituted clipboard address is not an independent check.",
  ],
  "ops-physical": [
    "Know when physical tampering means you should stop",
    "Plan how to replace a suspect signer without unlocking its wallet.",
    "An Evil Maid attack means someone gets access while you are absent and changes the device so they can steal secrets later. They might alter the hardware, the firmware built into it, or the software that starts the computer. An unattended laptop is not automatically compromised. Consider who could access it and whether there is reasonable evidence or suspicion of tampering.",
    "If you reasonably suspect tampering, do not unlock the wallet on that computer just to check it. Remove it from signing duty, prepare trusted replacement hardware with verified software, and restore from known-good backups offline. If keys may have been copied or exposed, make fresh keys on the trusted replacement and move the funds after checking that setup. Changing the old wallet password cannot stop someone from using a key they already copied.",
  ],
  "offline-device": [
    "Prepare the offline signer and check it after shutdown",
    "Keep the test wallet offline and prove that its saved files are still there after a full shutdown.",
    "The signer is the computer that holds private keys and approves payments. Prepare Debian, verified Core and the password manager while this computer has no wallet secrets. Then disconnect it before creating or restoring a wallet. From that point, it stays offline whenever it holds these keys.",
    "Persistent storage means saved files remain after the computer is turned off. You will choose a specific folder for Core's data and check it after a full shutdown. This checks the installed setup, not independent recovery. You also need a separate wallet backup that can restore the wallet on a replacement computer.",
  ],
  "offline-psbt": [
    "Prepare a payment online and approve it offline",
    "Move a payment between the computers while keeping every private key on the signer.",
    "First, you export public descriptors from the signer: text descriptions that let another wallet calculate and recognize its addresses without receiving its private keys. The online watch-only wallet uses them to track payments and prepare a PSBT file, a payment proposal carrying the information the signer needs.",
    "A payment spends previously received amounts, called inputs, and creates new amounts assigned to addresses, called outputs. Some outputs pay the recipient; another may return change to you. The offline signer must recognize its own change and let you check every payment and the total fee before signing. You then return the signed file to the online node, which broadcasts the transaction.",
  ],
  "offline-recovery": [
    "Replace both computers and repeat the payment",
    "Recover and send using the backups and instructions, with the originals set aside.",
    "Independent recovery means the original computer and its working disk are not supplying anything needed to recover. Keep them intact but set them aside. Restore the private-key wallet only on a trusted replacement that is already offline.",
    "The online coordinator is simply the online Core computer that prepares and tracks payments. Rebuild its watch-only wallet from public descriptors, then repeat a small Signet payment with both replacements. A balance on a screen is not enough: the replacement signer must approve the payment and the replacement online node must broadcast it.",
  ],
  "ops-documentation": [
    "Write a recovery guide someone else can follow",
    "Write recovery instructions that do not depend on your memory or the original computers.",
    "A recovery card is a written guide to the setup: what each computer does, which wallet is used, where its backup is stored and how to recover the password separately. Recovery material means the files, devices and records the procedure needs. The card itself should not contain a private key or password.",
    "Try following the card with your Signet test files. Whenever you have to guess, add the missing instruction. Then have the person who could act if you died or became unavailable try it too. Practice with test material rather than sharing real wallet secrets for an exercise.",
  ],
  "optional-tails": [
    "Optional: use Tails as the offline operating system",
    "Understand what a live system changes before choosing it over the default Debian signer.",
    "Tails is an operating system you start from a USB drive. A live system runs from that removable media rather than a normal installation on the computer's internal disk. Amnesic means that most session data is discarded at shutdown. This can reduce the information left on the device, but does not make altered hardware or firmware trustworthy.",
    "The optional procedure in this lesson uses Tails Persistent Storage, an encrypted area that deliberately keeps selected files after shutdown. Your wallet therefore remains available between sessions. You still need separate Core backups, passwords and a full recovery test. Learn the default Debian procedure first, and choose Tails only if the difference solves a problem in your own threat model.",
  ],
  "architecture-path-a": [
    "Optional: keep a small spending wallet online",
    "Understand the simpler hot-wallet approach and its exposure to online attacks.",
    "A hot wallet holds private keys on a device connected to a network. The same computer can prepare and sign a payment, so there are fewer devices and file transfers to manage. Encryption protects stored key material while locked, but malware may capture secrets or misuse keys when the wallet is unlocked.",
    "A simpler setup can reduce mistakes if you cannot reliably operate a more involved one. That does not make an online computer suitable for every amount or threat. This course's recommended setup for long-term savings keeps the keys on a separate offline signer. Decide what loss you could tolerate before using an online spending wallet.",
  ],
  "2.5": [
    "Why the signer does not download the blockchain",
    "Distinguish checking the payment proposal from checking the network's transaction history.",
    "The online node has already downloaded and checked the blockchain. It puts the proposed payment and the relevant information about the amounts being spent into a PSBT file. Core on the offline signer can use that information and its private keys to review and sign the proposal without synchronizing a node.",
    "That does not give the signer an independent view of the current blockchain. You still review the recipient, every output, change and fee. The online node then sends the signed transaction to the network, where nodes check whether it is valid, including whether the inputs remain unspent.",
  ],
  "2.8": [
    "Three wallet roles you will encounter",
    "Recognize which wallets can observe payments and which can approve spending.",
    "A hot wallet holds signing keys on a network-connected computer. A watch-only wallet has public information for recognizing addresses and transactions but no private keys to sign a spend. An offline signing wallet holds the private keys on a disconnected computer and approves a payment prepared elsewhere.",
    "In our two-computer setup, the online wallet is watch-only and the offline wallet signs. Public descriptors let both wallets recognize the same addresses; PSBT files carry proposed and signed payments. Watch-only does not mean public: its addresses and history can reveal financial information even though it cannot spend.",
  ],
  "mainnet-separate-wallet": [
    "Start a new wallet for real bitcoin",
    "Reuse the procedure you practiced, never the test keys or passwords.",
    "Mainnet is Bitcoin's real network. Create new keys, a new wallet password and separately labeled backups for it. Do not convert your Signet practice wallet into a savings wallet or restore a test backup into this setup.",
    "The roles remain the same: a disconnected computer holds the encrypted private-key wallet, and an online watch-only computer checks the chain and prepares payments. Before depositing anything, restore the new empty wallet offline and check that its separately stored password works.",
  ],
  "real-encryption": [
    "Create the real wallet and its password offline",
    "Create an encrypted wallet and make sure you can recover both its backup and password.",
    "Use the offline password manager prepared earlier. A password generator chooses random characters for you; you should not invent a sentence or reuse a practice password. If you save the wallet password in an encrypted password-manager database, you also need a way to recover that database and its own password.",
    "Keep the real wallet in its own Core data folder, separate from Signet practice files. Make the wallet backup after enabling encryption. Recovery needs both the backup file and the wallet password. Store them so that one failed device cannot take away both.",
  ],
  "backup-redundancy-freshness": [
    "Keep backups separate and up to date",
    "Check both how many usable copies you have and whether they cover your current wallet.",
    "Redundancy means keeping copies that will not all disappear in the same failure. Two files on one USB drive do not protect against losing that drive. Separate devices and locations can protect against different failures. Freshness means the backup includes the wallet's current keys, settings and other information you need to recover.",
    "Make a fresh backup after encryption, a wallet-password change or importing new keys or descriptors. Save a new copy when newer labels or other wallet records matter too. Modern wallets derive new keys from a saved starting secret, so creating a new receiving address does not, by itself, require another backup. Changing the active wallet password does not change passwords on old backup files, and it cannot revoke keys someone has copied.",
  ],
  "encrypted-backup-privacy": [
    "Understand what an encrypted backup still reveals",
    "Understand how key protection differs from financial privacy.",
    "Core wallet encryption protects private-key material. It does not necessarily hide public keys, addresses, transaction records or labels. These records are often called metadata: information about the wallet's activity rather than the secret needed to sign a payment.",
    "Someone who obtains the file may learn about your finances even if the password prevents spending. Cloud storage can make a copy available after local devices fail, but it also gives a third party a stored copy and adds online exposure. If you use an additional encrypted container to hide the entire file, include that container and its password in the recovery test. Extra protection also creates another thing you must recover.",
  ],
  "real-restore": [
    "Restore the empty real wallet before depositing",
    "Check the backup, password and receiving address on a replacement offline signer.",
    "An empty-wallet recovery test uses your actual mainnet backup before it holds funds. Set aside the original signer, restore the file on a trusted offline replacement and check the address you recorded when creating the wallet.",
    "Loading a wallet and unlocking it are different actions. Loading makes its records available in Core. Unlocking uses the password to make protected private keys temporarily available for signing. You must check that the recovered password works; seeing an address alone does not prove that. The later small-value payment will test actual spending.",
  ],
  "mainnet-readiness": [
    "Check the setup before a small real-bitcoin test",
    "Confirm the empty-wallet recovery before risking even the first test amount.",
    "You should have a new mainnet wallet, separate recoverable backups and password, and an offline replacement that recognizes its address. The online watch-only wallet must have no savings private keys. Check the actual setup rather than relying on this website's progress marks.",
    "This checkpoint permits only the planned small test. It does not prove that spending works yet. The next exercise must send from the restored offline wallet and reach a confirmation before you consider adding substantial savings.",
  ],
  "mainnet-small-test": [
    "Send a small real payment from the restored wallet",
    "Prove the actual recovery procedure with an amount you can afford to lose.",
    "A successful Signet exercise shows that you learned the procedure. It does not test the real wallet's backup and password. This exercise makes a small mainnet deposit, then spends from the wallet restored using those actual recovery records.",
    "Keep the original signer out of the process. Choose a test amount that covers the payment and fees and whose loss you could tolerate. Record the confirmed transaction and any corrections to your written instructions. A successful test is evidence that this setup worked; you must still maintain and protect it afterward.",
  ],
  "ops-routine": [
    "Schedule backup checks and recovery practice",
    "Schedule your next backup check and full recovery drill.",
    "A quick backup check asks whether the expected copies are present, their storage devices are readable and the instructions still make sense. A recovery drill goes further: restore on a replacement computer, recover the password and complete a payment. Seeing a file in a folder does not prove that recovery will work.",
    "Check backup media every 3–6 months and complete a full recovery drill at least once a year. Consider twice a year for high-value or complicated setups. Repeat after changes to the wallet, password, backups, signer or recovery instructions. Use Signet for repeated practice and separately test the actual mainnet recovery material offline. Keep operating-system and Core updates on their own maintenance schedule.",
  ],
  "ops-inheritance": [
    "Make recovery possible when you cannot help",
    "Plan who can follow the instructions if you die or become unavailable.",
    "Inheritance planning includes more than leaving a wallet file to someone. They need to know that the wallet exists, how to find the correct backup, how to recover its password separately and which actions must stay offline. Access instructions that only you understand are an unfinished recovery plan.",
    "Rehearse with the intended person using Signet test files. Record what to do and whom to contact without exposing real secrets unnecessarily. Technical access and legal ownership are separate questions; this lesson does not settle the legal arrangements. Review both the instructions and access after important life changes.",
  ],
  "multisig-why": [
    "When requiring several signatures helps",
    "Compare a single signing key with a two-out-of-three arrangement.",
    "Multisig means that spending requires signatures from more than one key. In a 2-of-3 setup there are three participating keys and any two must sign. This can let you recover when one key is unavailable, while preventing one key alone from authorizing a payment.",
    "It also adds devices, records and coordination. You must preserve the wallet's complete signing rule and public-key information, not merely two private keys. Choose it when shared authorization or a specific failure risk justifies those responsibilities. A larger balance by itself does not tell you whether you can operate it reliably.",
  ],
  "multisig-signet": [
    "Practice using a two-out-of-three wallet on Signet",
    "Check that both signers are approving a payment from the same wallet.",
    "A 2-of-3 wallet has three participating keys and requires any two signatures to spend. Its descriptor is the text description of that rule, the public keys and how the wallet makes addresses. Every participant must check that they are working with the same wallet description.",
    "Use only new test keys. Compare the same receiving address on each participant's device, prepare one PSBT payment file and add two valid signatures to that same proposal. Then test a different pair. This is an advanced draft: the description alone does not establish that the setup is ready for real funds.",
  ],
  "multisig-backup": [
    "Back up the rule as well as the multisig keys",
    "List everything needed to reconstruct the same two-out-of-three wallet.",
    "Private keys supply signatures, but they do not by themselves describe the whole multisig wallet. Recovery also needs its signing rule, the participating public keys and the information used to generate its addresses. In Core, descriptors record that structure.",
    "Save the exact wallet description and the relevant wallet backups, key origins, derivation paths and passwords. A key origin identifies where a key came from; a derivation path records the sequence used to calculate a child key. Test reconstruction with one signer unavailable. Do not assume that any two isolated key files will automatically discover the original wallet.",
  ],
  "multisig-failures": [
    "Practice losing a multisig signer",
    "Recover the test wallet with one signer unavailable and the original coordinator set aside.",
    "A failure simulation is a controlled rehearsal of something going wrong. For a 2-of-3 wallet, set one test signer aside without deleting it. The two remaining signers should still be able to approve a payment if you also have the full wallet description and correct backups.",
    "Rebuild the coordinator, the computer that prepares and combines payment files, from your records rather than its original wallet database. Check a recorded address and complete a Signet payment. If recovery depends on information still sitting on an excluded device, add that information to the backup plan and repeat the test.",
  ],
  "taproot-model": [
    "What Taproot adds to a spending rule",
    "Understand a direct signing route and alternative script routes before adding them to a wallet.",
    "Taproot is a Bitcoin feature for expressing how an output may be spent. An output is a received amount locked by a spending rule. A Taproot output can have a key path, a direct signature route, and alternative script paths. A script is a set of conditions that must be satisfied to spend.",
    "Different routes might require different keys or conditions. This can be useful, but it makes the exact wallet description and recovery plan more important. Do not assume Taproot automatically improves your custody setup. Learn what each route permits and test it with coins that have no monetary value first.",
  ],
  "taproot-descriptors": [
    "Record every Taproot spending route",
    "Preserve enough information to rebuild the same addresses and spending conditions.",
    "A Taproot descriptor is a text description of the keys and any alternative spending conditions used to create an address. A script tree organizes those alternatives. Its structure matters: changing the keys or conditions can produce a different address.",
    "Keep the exact descriptor, relevant key information, wallet backups and any additional data your chosen signing tool needs. Write down which keys and conditions each route requires. A collection of keys without the original structure may be insufficient. Treat this as an advanced recovery problem to test, not a shortcut around the basic backup exercises.",
  ],
  "complex-simple": [
    "Make a complex wallet easier to recover",
    "Turn each extra condition into a written, testable recovery step.",
    "A wallet policy is its rule for who can spend and under what conditions. More keys, waiting periods or alternative routes can address particular risks, but each adds something to remember, preserve and test.",
    "Write one plain sentence for each route: who acts, what they need and what must be true first. Then follow the instructions using Signet test material without help from the original devices. If you cannot explain a condition or reproduce its recovery, simplify the policy before using real savings.",
  ],
  "taproot-path-tests": [
    "Test every planned spending route",
    "Prove each alternative independently rather than testing only the easiest one.",
    "A spending path is one allowed way to authorize a transaction. A wallet may have a normal route and a fallback route with different keys or conditions. One successful payment proves only the route used for that payment.",
    "For each route, record the required keys, files, signatures and any waiting condition. Test that the route works when its conditions are met and fails when a required condition is missing. Use isolated test wallets. Do not mark the recovery plan as tested until you have successfully rehearsed every route you intend to rely on.",
  ],
  "lab-method": [
    "Run an experiment you can repeat",
    "Write a small test with a clear starting point and an observable result.",
    "A useful experiment answers one question. Write the Core version, test network, wallet names, starting files, commands or clicks and the result you expect. Use disposable keys and a separate data folder so the test cannot act on a wallet holding real funds.",
    "Record what actually happened, including error messages with secrets removed. Keep the original files intact when you can. Someone following the same notes should be able to repeat the test and tell whether it worked. A checked box is not enough. Record the result so someone else can compare it with their own test.",
  ],
  "lab-rpc": [
    "Understand Core's console and command-line tools",
    "Know which program a command belongs in before running it.",
    "RPC stands for Remote Procedure Call. Core uses this interface for named actions such as getwalletinfo, which returns wallet information. You can use many of these actions in the console built into the Core window. CLI means command-line interface; bitcoin-cli is a separate terminal program for asking a running Core node to perform those actions.",
    "The operating-system terminal and Core console are different places. In Core's console, enter getwalletinfo directly. A terminal example may instead use bitcoin-cli getwalletinfo. Read help followed by the command name in Core to check what it does and which arguments it accepts. Some commands change or expose wallet data, so do not guess which wallet is selected.",
  ],
  "lab-descriptors": [
    "Read a wallet descriptor before importing it",
    "Identify the address rules, public keys and recovery information in a descriptor.",
    "A descriptor is a structured text description of how a wallet makes addresses and spends their outputs. It may name a script type, public keys, key origins and derivation paths. A range tells Core which numbered addresses to calculate. A checksum at the end helps detect typing mistakes; it does not prove the descriptor belongs to the intended wallet.",
    "Use a test wallet. Explain each part of a descriptor before importing it. Public descriptors can reveal addresses and activity, while descriptors containing private keys can enable spending. Do not paste either kind into a public help request. Preserve original timestamps so Core knows how far back it may need to look for payments.",
  ],
  "lab-psbt": [
    "Check what a payment file is still missing",
    "Distinguish a proposal, a signed PSBT and a transaction ready to broadcast.",
    "PSBT means Partially Signed Bitcoin Transaction. It is a container for a proposed payment, information about the amounts being spent and any signatures added so far. A file ending in .psbt is not necessarily signed or ready to send.",
    "Decoding means reading the file's structured contents. Finalizing means assembling the required signatures and other spending data into their final form. Extraction produces the raw transaction that can be broadcast. If something is missing, identify it before continuing. Never solve an unclear error by blindly signing or pasting the file into a public website.",
  ],
  "lab-regtest": [
    "Use a private test chain you can control",
    "Understand how regtest differs from the shared Signet practice network.",
    "Regtest is a local testing mode in which you can create blocks when needed. Unlike public Signet, it does not require waiting for someone else's test blocks. It is useful for checking what happens before and after confirmations or when a spending condition becomes available.",
    "Keep it in a separate test data folder with disposable wallets. A UTXO, or unspent transaction output, is a received amount that has not yet been spent. Regtest lets you create test outputs and control their confirmations for an experiment. Its results do not by themselves prove behavior under every public-network condition.",
  ],
  "lab-community": [
    "Ask for help without sharing wallet secrets",
    "Describe the problem well enough to investigate while keeping recovery information private.",
    "A useful question states your Core version, test network, intended action, exact error and what you already checked. Use a disposable test example when possible. Remove private keys, passwords, wallet files and identifying financial information from screenshots and command output.",
    "Separate an explanation from an instruction to change your setup. Before running a suggested command, understand its purpose, required wallet and expected result, and compare it with the documentation for your version. Someone answering a question does not need your private backup to explain how a command works.",
  ],
}

const rationaleSources: Record<string, NonNullable<PlayerLesson["sources"]>> = {
  "1.5": [
    {
      label: "Ledger · Customer-data breach and phishing follow-up",
      url: "https://www.ledger.com/blog/update-efforts-to-protect-your-data-and-prosecute-the-scammers",
    },
  ],
  "1.1": [
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
  ],
  "1.4": [
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
  ],
}

export function reviseBeginnerLanguage(lessons: Map<string, PlayerLesson>) {
  for (const [id, lesson] of lessons) {
    const introduction = introductions[id]
    if (!introduction) throw new Error(`Missing beginner introduction: ${id}`)
    const [title, objective, ...explanation] = introduction
    lessons.set(id, {
      ...lesson,
      title,
      objective,
      summary: objective,
      explanation,
      contentUpdated: "2026-09-13",
      sources: rationaleSources[id]
        ? [...(lesson.sources ?? []), ...rationaleSources[id]]
        : lesson.sources,
      notes: [...(lesson.notes ?? []), ...(lesson.explanation?.slice(2) ?? [])],
      guidedSteps: lesson.guidedSteps?.map((step) => reviseStep(id, step)),
      ...backgroundCopy[id],
    })
  }
}

const debianReason =
  "Debian Stable is the default operating system for both dedicated computers in this course. Its stable releases change less often than fast-release desktop systems, and its mature software repositories make it practical to maintain a dedicated computer for years. That predictability makes maintenance easier to plan. It does not make Debian inherently more secure than Fedora. Fedora and other supported Linux distributions remain alternatives if you can maintain and test them."

const backgroundCopy: Record<string, Partial<PlayerLesson>> = {
  "0.1": {
    what: "We follow a payment from the keys that approve it to the network that records it.",
    concepts: [
      "A private key is a secret number used to create a signature that authorizes spending.",
      "A wallet manages keys, addresses and payment records. Its metadata is extra information, such as labels you give addresses.",
      "A node checks transactions and blocks against Bitcoin's rules.",
      "UTXO means unspent transaction output. Think of it as a received amount that is still available to spend. A later payment refers to it as an input, the source of money for that payment.",
      "Signing approves a payment using a private key. Broadcasting sends the signed transaction to other computers on the network. Signing alone does not send it.",
    ],
  },
  "0.2": {
    what: "Consider losing access to your bitcoin as well as someone stealing it. The list below gives examples to use in your own plan.",
    concepts: [
      "Lost secrets: the computer holding your private keys fails, the backup file disappears, or you forget the wallet password. Write a separate recovery answer for each.",
      "Harmful software: malware is software that steals information, damages files or interferes with your computer. An internet attacker might take over the online computer, or a malicious download might install harmful software before you disconnect a signer.",
      "Problems before a device reaches you: its manufacture, distribution or delivery can introduce a fault or deliberate alteration. This is supply-chain risk. Firmware, the low-level software built into hardware, can also be affected.",
      "Physical access: someone steals a computer or changes it while you are away. A changed device might capture a password the next time you use it.",
      "Accidents and failures: a disk or backup USB drive breaks, a file is deleted, or someone follows the wrong procedure. Two copies on one failed disk do not provide independent recovery.",
      "People and recovery: the only person who knows the procedure dies, becomes unavailable or cannot remember it. Backups need instructions and password recovery that the intended person can actually use.",
    ],
  },
  "1.5": {
    notes: [
      "The economic argument concerns finding worthwhile targets. When a product already identifies likely cryptocurrency users, an attacker can spend less effort separating them from unrelated customers. A generic computer has many possible uses, so its purchase supplies less of that information. This can raise the effort needed to identify Bitcoin victims; it does not establish a universal cost advantage for every attack. Ordinary computers are also valuable targets for widespread malware.",
      "The risk continues after delivery. Customer records, branded support messages and update instructions can give criminals ways to approach the owner. Phishing means impersonating a trusted source to obtain a secret or induce a harmful action. Social engineering is the broader practice of manipulating a person into helping an attacker. A fake support agent asking for recovery words attacks the owner even when the device keeps its keys isolated.",
      "We therefore leave retail hardware wallets out of this curriculum's savings setup. Their dedicated signing controls can simplify use, but they do not remove the purchase signal, vendor relationship or hardware-verification problem. Our choice avoids those Bitcoin-specific dependencies while accepting the work of maintaining a dedicated Linux computer. Verify the software, keep the signer offline, control physical access and rehearse recovery.",
    ],
  },
  "1.1": {
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
        body: "On January 17, 2024, Trezor reported unauthorized access to its third-party support portal. Its initial report said the intruder contacted 40 users asking for recovery secrets, and that its review had found no secrets sent by those users at that point. This is another concrete example of the support relationship becoming an attack route.",
        url: "https://forum.trezor.io/t/security-alert-update/15204",
      },
    ],
    notes: [
      "The five-year bug shows that publishing code is not enough to ensure a critical defect will be found. It does not, by itself, reveal why the defect escaped review. We need evidence of actual review work, including checks of how the device behaves as shipped.",
      "Our recommendation remains a dedicated offline Core signer on generic hardware, with separately recoverable backups and passwords. We prefer reducing Bitcoin-specific targeting and vendor dependencies to adding another wallet product to manage. That advantage must be combined with careful isolation and recovery; an ordinary computer used for everything would defeat the setup we are teaching.",
    ],
  },
  "signet-why": {
    callouts: [
      {
        kind: "warning",
        title: "Practice payments are public too",
        body: "Signet addresses and transactions are public. Use separate test keys and passwords. Never bring a real wallet's private keys or backup into a practice exercise.",
      },
    ],
  },
  "signet-vs-mainnet": {
    concepts: [
      "Signet and mainnet have separate transaction histories and data folders.",
      "A Signet destination cannot receive mainnet bitcoin. Check the selected network before sharing an address.",
      "A wallet name is only a label. Check the chain field in getblockchaininfo to establish which network Core is using.",
    ],
  },
  "0.3": {
    risk: "If recovery depends on one person, one device or an unrecorded password, losing that one thing can stop the whole recovery. Unlabeled backups and unclear instructions create the same problem.",
    callouts: [
      {
        kind: "mental-model",
        title: "Give each precaution a purpose",
        body: "Before adding another device or backup, write which problem it addresses and what extra work it creates. Then test whether you can still complete recovery.",
      },
    ],
  },
  "2.1": {
    what: "We separate checking Bitcoin's rules from managing the keys that approve payments.",
  },
  "1.2": {
    what: "Compare what the applications do and which files you would need to recover their wallets.",
    why: "Learning one complete procedure first makes it easier to understand what another application would change.",
    risk: "Switching applications without understanding their backup formats can leave you with files you do not know how to restore.",
    checklist: [
      "I can name a task Sparrow can help with, such as preparing a payment for a hardware wallet.",
      "I understand why I can complete this course using Core alone.",
      "I will keep real keys and recovery files within the documented Core procedure.",
    ],
    notes: [
      "Any later comparison with Sparrow uses disposable test wallets. Do not import the private keys or backup of the real wallet taught here.",
    ],
  },
  "1.3": {
    what: "Compare the source of a wallet's transaction information, its backup files and its recovery words.",
    why: "Another wallet application adds another recovery method and another set of steps to maintain.",
    risk: "Recovery words from different systems are not automatically interchangeable. Electrum's own recovery-word system differs from the BIP39 specification used by many other wallets.",
    checklist: [
      "I understand that a list of recovery words must be restored using the method that created it.",
      "I know that Electrum obtains transaction information through its server system.",
      "I will use the documented Core procedure to restore this Core wallet.",
    ],
    notes: [
      "Electrum is an optional comparison. The practical course uses Core to create keys, sign payments, back up and recover.",
    ],
  },
  "1.4": {
    what: "Words preserve secret material, but not the full instructions for using it. A derivation path identifies a route through the family of keys; a script type specifies the rules for spending. Recovery may also need account choices or a multisig policy, the rule identifying which participants must sign. BIP44 describes one set of account and path conventions. An output descriptor is a text description of addresses and spending rules that can preserve this information alongside the keys.",
    why: "A seed does not record address labels, imported keys unrelated to that seed, or the other participants' keys in a multisig wallet. A Core backup retains the keys, descriptors and metadata stored in that particular wallet when the copy is made. Metadata means supporting records such as your address labels. We prefer preserving that context to relying on future software to guess it.",
    risk: "A visible word list is easy to recognize, photograph and transcribe. Without an additional secret, someone who copies it can derive the keys. A BIP39 passphrase can add protection, but its strength and separate recovery then matter too. The word format itself is not encryption.",
    concepts: [
      "BIP39's checksum, a short error-detection code, catches some transcription mistakes but cannot correct them. Twelve words have a 4-bit checksum; 24 words have 8 bits.",
      "Every BIP39 passphrase produces a valid seed. A typo can therefore open a different, empty wallet instead of producing an incorrect-password error.",
      "The words contain no version or wallet-layout marker. They depend on the chosen wordlist, and translating them changes the resulting seed. The conversion is one-way: an arbitrary existing Core starting secret cannot simply be written as equivalent BIP39 words.",
      "BIP32 key derivation does not require a BIP39 word list. Core's file backup and its encryption password are the recovery components used in this course.",
    ],
    notes: [
      "A complete wallet snapshot is not a backup of the entire custody setup. It does not supply a forgotten password, separate instructions, another participant's private keys, records kept in a different wallet, or changes made after the backup. Keep the recovery guide and password separately recoverable, refresh backups when the wallet changes, and test restoration. The node's public blockchain data can be downloaded again.",
      "Core's wallet encryption protects private key material; it does not encrypt all wallet metadata. Treat the backup as private financial information even when locked. A generic filename is not protection against someone who examines the file. Keep the private-key backup off the online computer and never upload it to this website.",
      "We favor Core's long-running wallet-backup approach and its public development and review process. File formats and wallet features have changed over time, so test restoration with the version and wallet you actually use. Correctly generated BIP39 words can have strong randomness. Our objection is to treating them as the whole recovery plan and adding a recovery-word workflow that this Core setup does not need.",
    ],
    callouts: [
      {
        kind: "warning",
        title: "Recovery words are a secret",
        body: "Someone with BIP39 words and any required additional passphrase can derive the wallet's keys. Keep them out of messages, screenshots and websites. The linked essay explains why this course chooses file-based recovery.",
        url: "/en/bitcoin-core/bip39-made-the-wrong-thing-human-readable/",
      },
    ],
  },
  "signet-first-wallet": {
    callouts: [
      {
        kind: "warning",
        title: "Keep practice and real wallets separate",
        body: "Later, mainnet gets new keys, a new wallet password and new backups. Do not reuse the Signet wallet or convert its backup into your real-funds setup.",
      },
    ],
  },
  "signet-encrypt-new-backup": {
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
  },
  "signet-readiness": {
    callouts: [
      {
        kind: "mental-model",
        title: "Your first complete recovery",
        body: "You created, encrypted and backed up a practice wallet, then received and sent test coins. With the original wallet closed, you restored the backup and sent again. You have now exercised the recovery procedure without risking real bitcoin.",
      },
    ],
  },
  "signet-entropy-deep-dive": {
    concepts: [
      "A CSPRNG is a cryptographically secure pseudorandom number generator. It produces numbers designed to be unpredictable to an attacker. The operating system supplies one source of this randomness.",
      "GetStrongRandBytes is the name of a function in Core's source code. It mixes fresh operating-system randomness with internal and additional sources on each call.",
      "CKey::MakeNewKey is the key-generation function. It tries again if its 32-byte candidate, a 256-bit number, is outside the valid range for a secp256k1 private key. secp256k1 names the mathematical curve used by Bitcoin signatures.",
    ],
    checklist: [
      "I can explain why a person is a poor substitute for a secure random-number generator.",
      "I can distinguish creating keys from saving a backup of them.",
      "I will not invent a private key or recovery words by hand.",
    ],
    callouts: [
      {
        kind: "mental-model",
        title: "Let the software generate the keys",
        body: "Inventing random-looking words or characters can make a secret more predictable. Use verified software on a trusted system, then protect and test its backups.",
      },
    ],
    notes: [],
  },
  "2.2": {
    what: "On Signet, compare commands about the node with commands about the selected wallet. RPC means remote procedure call, a way to ask the program to perform a task; Core's console gives you local access to these commands.",
    why: "A node command can report the network even when no wallet is open. A wallet command needs the right wallet selected.",
  },
  "2.3": {
    what: "Choose whether to keep all old blocks or delete older block files after checking them.",
    why: "Pruning saves disk space while still checking Bitcoin's rules. Restoring an old wallet can require blocks that a pruned node has already deleted.",
    risk: "Pruning changes what is kept on disk, not which rules the node checks. Do not assume an old wallet can be fully scanned with only the remaining block files.",
  },
  "architecture-choice": { notes: [debianReason] },
  "real-device": { notes: [debianReason] },
  "2.4": {
    notes: [
      "The online computer runs Debian Stable and a synchronized Core node. Its watch-only wallet tracks payments and prepares payment files without holding the savings wallet's private keys. It broadcasts transactions after the offline computer signs them.",
      "The offline computer runs Debian Stable and Core with an encrypted private-key wallet. It can review and sign a payment without the blockchain. The online node supplies input information in the PSBT file. The offline signer checks recipients, change and fees, but does not independently check the current blockchain or whether an input remains unspent.",
      "Routine transfers carry only public address descriptions and unsigned or signed PSBT payment files. Public descriptions cannot spend, but can reveal wallet activity. Private wallet backups and passwords stay off this transfer device.",
      debianReason,
    ],
  },
  "ops-physical": {
    notes: [
      "Tails starts from removable media and can reduce traces left by an operating-system session. It cannot make altered hardware trustworthy. Malicious firmware, hidden hardware, changed startup settings or an altered Tails USB can still undermine it. Rebooting into Tails does not resolve every case of tampering while you were away.",
    ],
  },
  "optional-tails": {
    notes: [
      "This draft keeps Core and working wallet files in encrypted Persistent Storage, the area of a Tails USB whose contents survive shutdown. Those files remain writable. A setup that keeps nothing between sessions would need a separate restore-on-every-start procedure and its own practical test. Both approaches still need independent wallet backups and separate password recovery.",
    ],
  },
  "2.5": {
    what: "The online wallet prepares a payment file. The offline wallet reviews it and adds signatures. The online node then assembles the signed transaction and sends it to the network.",
    why: "The computer holding the private keys can stay offline and does not have to download the blockchain.",
    risk: "The PSBT must carry enough information for the signer to check amounts, recipients, change and fees. Stop if the signer cannot establish any of those details.",
  },
  "2.8": {
    risk: "A watch-only wallet cannot sign, but its extended public keys and address descriptions can reveal wallet history and future addresses. Treat these as private financial information.",
  },
  "backup-redundancy-freshness": {
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
    callouts: [
      {
        kind: "important",
        title: "Check both independence and freshness",
        body: "Several files on one disk share a point of failure. Several old copies can all be missing a later wallet change. Check where your backups are and what each can restore.",
      },
    ],
    notes: [
      "Labels are information you supply. Reading the blockchain again cannot reconstruct them. A newer backup may be needed to recover those records even if an older copy can still recover the money.",
      "Refresh backups after encryption, password changes and imported keys or address descriptions. Also refresh them when newly added wallet records matter for recovery. Changing a password does not encrypt old copies again or take back keys someone copied. If keys may have been stolen, secure the environment and move to new keys.",
    ],
  },
  "encrypted-backup-privacy": {
    checklist: [
      "I can distinguish someone gaining the ability to spend from someone learning my payment history.",
      "I understand the extra exposure and recovery benefits of cloud storage.",
      "I keep the encrypted backup and its password in separate places, and can recover each.",
    ],
  },
  "mainnet-small-test": {
    callouts: [
      {
        kind: "mental-model",
        title: "Test the actual wallet too",
        body: "Signet lets you rehearse the process. The small mainnet test checks the actual wallet, backup and password you intend to use. A successful test is evidence that this setup worked, not a guarantee against later loss or tampering.",
      },
    ],
  },
  "ops-routine": {
    concepts: [
      "Debian is the operating system. Core's program files contain the application. Core's data folder contains blocks, configuration and indexes, records that help it find information. Its chainstate database records which received amounts remain unspent. Wallet files hold keys, address descriptions and wallet records; back them up separately even when they live inside the data folder.",
      "Normal Debian and Core upgrades can reuse intact blockchain data. Read upgrade notes first. A database-format change, deleted or damaged files, or reindexing can require extra work. Reindexing rebuilds Core's indexes from block data. If required blocks are missing, the node may have to download them again.",
    ],
  },
}

type StepCopy = {
  instructions: string[]
  expectedResult?: string
  title?: string
  help?: string
}
const stepCopy: Record<string, StepCopy> = {
  "0.2/protect": {
    instructions: [
      "Write whether you are practicing with test coins or planning to protect real savings. Note who needs access and what losing the wallet would mean for them. Keep actual amounts and identities private.",
      "Do this before choosing an operating system, the software that runs the computer, or buying a signer, the computer that will hold your private keys. Choose tools that address the risks you identified.",
    ],
    expectedResult:
      "Your notes say what you are protecting, who needs access and what loss you could tolerate.",
  },
  "0.2/risks-v3": {
    instructions: [
      "Choose two problems relevant to you, such as losing a computer or becoming unable to help your family recover. For each, write one precaution, the steps you would take to recover, and a new problem that precaution might create.",
      "For example, a password helps protect a stolen backup, but forgetting it can also lock you out. A separate offline computer reduces exposure to internet attacks, but adds another device and file transfers to manage. The full list of threats is in the explanation below.",
    ],
    expectedResult:
      "For each of two problems, you have written a precaution, a recovery plan and a drawback to manage.",
  },
  "0.2/complexity": {
    help: "Choose a setup you can operate and recover reliably. If the offline procedure taught here is more than you can manage, pause before putting savings at risk.",
    instructions: [
      "Write which steps you could reliably repeat under stress and who could follow the recovery instructions if you died or became unavailable. If you cannot explain a precaution or test it, do not rely on it for savings yet.",
      "Keep these notes. When the course asks you to choose the computers and backups, check that the proposed setup addresses your problems without adding more work than you can reliably manage.",
    ],
    expectedResult:
      "You have a practical limit on the complexity you will accept and a recovery plan that does not rely only on your memory.",
  },
  "signet-install-verify/tools-check": {
    help: "command -v finds installed tools. curl can download files, git downloads the builder-key repository, gpg checks signatures, sha256sum checks file contents and tar unpacks the archive. The browser downloads in later steps do not require curl.",
    instructions: [
      "A terminal is an application where you type commands for the operating system. Open Debian's Terminal application on the online preparation computer. This is different from the text console inside Bitcoin Core.",
      "Run the command below. command -v looks for each named tool. It prints the location of each tool it finds; it prints nothing for a missing tool. Check all five names, because a minimal Debian installation may not include them.",
    ],
    expectedResult:
      "You see a location for curl, git, gpg, sha256sum and tar, or can name which ones are missing.",
  },
  "signet-install-verify/tools-install": {
    instructions: [
      "Debian installs software in packages. apt is its package-management command, and sudo runs a command with administrator permission. The first command below refreshes the package list; the second installs the verification tools and supporting packages from your configured Debian repositories.",
      "Run these only if the tools are missing, while this computer has no wallet secrets. Read the proposed package changes before accepting, then repeat the tool check. If sudo is missing, the help below explains using the root administrator account with su -. If all tools are already present, continue without reinstalling them.",
    ],
  },
  "signet-install-verify/platform": {
    instructions: [
      "The download must match both your operating system and your processor. This example uses Linux on x86-64, the processor family Debian calls amd64. A .tar.gz archive is a compressed bundle of program files. Leave it unopened until verification is complete.",
      "Open the official Core download page listed under Sources. Save the following files together in a new folder: bitcoin-31.1-x86_64-linux-gnu.tar.gz, SHA256SUMS and SHA256SUMS.asc from release 31.1. SHA256SUMS lists file checksums; SHA256SUMS.asc contains signatures over that list. Check the current official release before following this worked example, and keep all three files from the same release. Other platforms need their matching instructions.",
    ],
  },
  "signet-install-verify/folder": {
    instructions: [
      "Every terminal command runs from a particular folder, called the current directory. Open the terminal in the folder containing your three downloaded files, then run pwd and ls below. pwd prints the folder's location; ls lists its files. Compare both with the file manager.",
      "To move to another folder, use cd followed by its path. For example, cd Downloads/ enters Downloads when you are in your home folder. cd .. goes up one folder. Use the actual folder name on your computer, which may differ. Continue only when the archive and both SHA256SUMS files appear in the same location.",
    ],
  },
  "signet-install-verify/hash": {
    instructions: [
      "SHA256 calculates a checksum from the exact contents of a file. The command below calculates the archive's checksum and compares it with the value listed in SHA256SUMS. --ignore-missing skips entries for other downloads you did not save.",
      "Run it in the download folder and find the line for your exact .tar.gz filename. It must end with OK. A different filename, FAILED or no matching line means stop. This checks that the file matches the list; the next steps check who signed that list.",
    ],
  },
  "signet-install-verify/builder-repo": {
    instructions: [
      "Core release builders independently build the software and sign release checksums. To verify a builder's signature, you need their public signing key. The secret private signing key stays with that builder; neither key is one of your Bitcoin wallet keys.",
      "A repository is a stored collection of project files. git clone downloads a copy. Run the command below in your download folder to obtain the official guix.sigs repository and its builder-keys folder. Downloading these keys does not yet establish whose keys they are.",
    ],
  },
  "signet-install-verify/builder-import": {
    instructions: [
      "GnuPG is the signature-checking program, usually called gpg in commands. OpenPGP is the standard used for these signatures. GPG keeps imported public keys in a local keyring, which is simply its database of keys.",
      "Run the import command below. The * selects all the files in builder-keys. Importing makes the keys available for verification; it does not mean you trust every owner. You do not need to create a private GPG key to check a Core download.",
    ],
  },
  "signet-install-verify/fingerprints": {
    instructions: [
      "A fingerprint is the full identifier calculated from a public key. A copied name, email address or short key ID is not enough to establish identity. Run gpg --fingerprint below and record the full fingerprints of the builders you intend to rely on.",
      "For several builders, compare the full fingerprint with a trustworthy independent source, such as their established personal website or a separately authenticated direct contact. Another copy of the same repository is not independent. Record who you checked and how. If you cannot establish a key's identity, do not count its signature as trusted evidence.",
    ],
  },
  "signet-install-verify/signature": {
    help: "A missing public key prevents GPG from checking that particular signature; it does not invalidate the others. An uncertified-key warning means GPG has not established the key owner's identity through its trust database. Verify identity independently. Stop for a bad signature, an unexplained fingerprint mismatch, an expired or revoked key you rely on, or too few valid signatures from identified builders. Do not change GPG's ownertrust settings just to hide warnings.",
    instructions: [
      "Run the command below to check the signatures in SHA256SUMS.asc against SHA256SUMS. Read the results for the builders whose full fingerprints you checked. Good signature means the signature matches that key. It does not, by itself, establish the person's identity.",
      "Confirm that several builders you independently identified have valid signatures. A missing public key means that particular signature was not checked. An uncertified-key warning concerns GPG's stored trust information; resolve identity independently rather than hiding the warning. Stop for a bad signature, a fingerprint mismatch, an expired or revoked key you rely on, or too few valid signatures from builders you have identified.",
    ],
    expectedResult:
      "Several identified builders have valid signatures, and their full key fingerprints match your independent records.",
  },
  "signet-install-verify/extract": {
    instructions: [
      "Only after the file and signature checks pass, extract the archive. Extract means unpack the compressed files into a folder. Keep the bitcoin-31.1 folder in a location you control. The bin folder inside it contains the executable programs.",
      "In bitcoin-31.1/bin, run the command below. bitcoin-qt is Core's application with windows and menus; -version asks it to report its version. Keep the folder, because the next lesson starts this same verified program on Signet. If libraries, the supporting software the program needs, are missing, stop and resolve that during preparation.",
    ],
  },
  "signet-start/launch": {
    instructions: [
      "Close any other Core application window first. In the terminal, move to the verified bitcoin-31.1/bin folder and run the command below. The extra -signet setting tells Core to use test coins. On another operating system, start the matching verified Core program with that same setting.",
      "When Core asks where to store its data, choose a separate practice folder with enough space. This data directory holds the node's working files. Leave the Core window running for the exercises; it already includes the node, so no separate server program is needed.",
    ],
    expectedResult:
      "Core opens on Signet and begins downloading and checking the practice network's blocks.",
  },
  "signet-start/chain": {
    instructions: [
      "In Core, choose Window → Console. This opens a panel for commands addressed to Core itself. Enter getblockchaininfo directly, without a bitcoin-cli prefix, and inspect the named fields in the reply. true and false mean yes and no.",
      "chain must be signet. initialblockdownload tells you whether the initial catch-up is still in progress. Wait until it is false and the main window no longer reports synchronization in progress before receiving or spending. Wallet preparation can happen while the node catches up.",
    ],
    expectedResult:
      "chain reads signet, and initialblockdownload reads false when synchronization is finished.",
  },
  "signet-first-wallet/create": {
    instructions: [
      "After confirming Signet, choose File → Create Wallet and name it signet-training-wallet. This name identifies the wallet on your computer; it is not a receiving address.",
      "For this practice exercise leave Encrypt Wallet unchecked, because the next lesson teaches encryption separately. Leave Disable Private Keys unchecked so the wallet can sign, and Make Blank Wallet unchecked so Core creates its normal starting keys. Do not receive coins before encryption and the new backup.",
    ],
  },
  "signet-first-wallet/state": {
    instructions: [
      "In Window → Console, select signet-training-wallet from the wallet selector and run getwalletinfo. The reply is a list of named properties and their values.",
      "Check walletname = signet-training-wallet. descriptors = true means this wallet uses descriptions of how its addresses and spending rules are constructed. private_keys_enabled = true means it can hold private signing keys. A watch-only wallet would have that last setting false and could not sign on its own.",
    ],
    expectedResult:
      "The reply names signet-training-wallet and shows both descriptors and private_keys_enabled as true, meaning enabled.",
  },
  "signet-encrypt-new-backup/context": {
    help: "If either value differs, stop. Select the intended test wallet and confirm Signet before continuing.",
    instructions: [
      "Check the network and selected wallet in Core's console using the commands below. The reply to getblockchaininfo must say chain = signet. The reply to getwalletinfo must name signet-training-wallet.",
      "Use a password reserved for this test. If either value differs, stop and select the intended practice wallet and network. Do not encrypt or change a different wallet by mistake.",
    ],
  },
  "signet-encrypt-new-backup/encrypt": {
    instructions: [
      "Choose Settings → Encrypt Wallet in the Core window. Enter your dedicated test password twice in Core's dialog. Passphrase is Core's word for the wallet password; both entries must match.",
      "Read Core's warning about making a fresh backup. Encryption protects the private keys while the wallet is locked. Core has no password-reset option. If this test wallet is already encrypted, use its known test password rather than changing another wallet.",
    ],
  },
  "signet-encrypt-new-backup/backup": {
    instructions: [
      "With signet-training-wallet selected, choose File → Backup Wallet. Save a new file named signet-training-after-encryption.dat in an existing backup folder outside the active wallet's own folder. The .dat ending identifies the saved data file; the full filename helps you recognize this particular test copy.",
      "Use Core's backup command rather than copying an open wallet database yourself. This new copy is needed because first-time encryption changes the starting secret used for new keys. An older, pre-encryption backup is not a substitute.",
    ],
  },
  "signet-encrypt-new-backup/record": {
    instructions: [
      "Write down the network, wallet name, Core version, backup date and file location. Keep the test password in a different recoverable place. Someone following the notes should be able to find both without needing the original computer to work.",
      "A second file on the same USB drive does not protect against losing that drive. The public blockchain can be downloaded again, but your private keys and password cannot. You will test the actual backup by restoring and spending in later steps.",
    ],
  },
  "signet-receive-send/receive": {
    instructions: [
      "Confirm chain = signet and that the node has finished synchronizing. In signet-training-wallet choose Receive → Create new receiving address. Record that address. It is the public destination for this test payment, not a wallet secret.",
      "Use the Signet faucet linked from the official offline-signing tutorial in Sources. A faucet gives out test coins. Give it only the receiving address, never a password or wallet file, and never pay for test coins. A faucet may be unavailable; do not change networks simply to make an address work.",
    ],
  },
  "signet-receive-send/confirmed": {
    title: "Wait until the received coins have a confirmation",
    instructions: [
      "Open Transactions and inspect the payment you received. One confirmation means it has been included in a block. Wait for at least one confirmation before using these coins in the exercise.",
      "With the test wallet selected in the console, run listunspent. An unspent transaction output, shortened to UTXO, is an amount received that has not yet been spent. Record its transaction ID and amount, and check that it is spendable. The transaction ID identifies the payment in the history.",
    ],
    expectedResult:
      "The received amount has at least one confirmation and Core reports that this wallet can spend it.",
  },
  "signet-receive-send/send": {
    instructions: [
      "Create another receiving address in your own test wallet. In Send, enter that address and a small amount below your confirmed balance. Leave enough for the fee and the later recovery exercise. This is a self-transfer, a payment between addresses in your own wallet.",
      "Choose a displayed fee rate, the price paid per unit of transaction size. Before sending, compare the full destination, payment amount and total fee in Core's confirmation dialog. Unlock with the test password when requested, then send. If you do not understand the total fee, stop before approving.",
    ],
  },
  "signet-receive-send/change": {
    instructions: [
      "After the payment confirms, inspect it in Core. Inputs are the previously received amounts used to fund the payment. Outputs are the new amounts assigned to addresses. If an input is larger than the payment plus fee, Core can return the remainder to your own wallet as change.",
      "Check the amount sent to your recorded address, any change returning to you and the fee. The fee equals total inputs minus total outputs. Because this payment went to yourself, your overall balance falls only by the fee. Use Core's ownership information to recognize change rather than guessing from the address.",
    ],
  },
  "signet-restore/record": {
    instructions: [
      "Record an address that received test coins and its transaction ID. Select File → Close Wallet for signet-training-wallet. Closing unloads it from Core; it does not delete the files.",
      "Keep the original files intact and locate signet-training-after-encryption.dat separately. This ensures that recovery uses the backup rather than the original wallet. The original must stay closed during this exercise and the next payment.",
    ],
  },
  "signet-restore/restore": {
    instructions: [
      "Choose File → Restore Wallet, select signet-training-after-encryption.dat and name the new copy signet-training-restored. Restoring creates a usable wallet from the backup. Let Core finish scanning blocks for its payments.",
      "Select signet-training-restored in both the application window and console, then run getwalletinfo. walletname must match, and descriptors must be true. If blocks required for the scan were deleted by pruning, use the needed history or download and validate it again; do not bypass the scan.",
    ],
  },
  "signet-restore/compare": {
    help: "Compare an address you recorded earlier, not just the next address each wallet generates. The wallets may be at different positions in their address sequences. A visible balance alone does not prove that you can sign.",
    expectedResult:
      "The restored wallet recognizes the recorded transaction and the amounts that should still be available to spend.",
    instructions: [
      "Find the address and transaction ID you recorded before closing the original. Check them in signet-training-restored and keep signet-training-wallet closed. The restored wallet should recognize the expected received amounts that remain available to spend.",
      "Compare a recorded address, not only the next new address each wallet creates. Wallets can be at different positions in their address sequences. Seeing a balance is only the first check; sending from the restored copy next will test access to the signing keys.",
    ],
  },
  "signet-transact-again/selected": {
    instructions: [
      "Confirm Signet and a synchronized node, then select signet-training-restored. Keep signet-training-wallet closed. Create a fresh receiving address in the restored wallet and record it as the destination for a small self-transfer.",
      "The wallet selector tells you which wallet Core is acting on. If the original is selected, change it before continuing: a payment signed by the original would not test the backup you restored.",
    ],
  },
  "signet-transact-again/spend": {
    instructions: [
      "Repeat the small self-transfer from the receive/send lesson, now using signet-training-restored. Check the full destination, amount, any change returning to you and the total fee. Enter the recovered test password only when Core asks for it in the send dialog.",
      "Wait for a confirmation and record the new transaction ID. If the password fails, the keys are missing or the payment does not complete, the recovery test is unfinished. Check the selected wallet and backup before trying again. A visible balance alone does not mean recovery succeeded.",
    ],
  },
  "real-device/hardware": {
    expectedResult:
      "Both computers support Debian and Core. You have assigned one to online work and the other to offline signing.",
    instructions: [
      "Identify two ordinary computers you control and can reserve for this setup. These examples use x86-64 processors, also called amd64 in Debian downloads. Check that Debian Stable supports their hardware, their disks work and they can start from the intended installation media before creating keys.",
      "Follow Debian's official installation-media verification guide in Sources. Installation can erase a disk: identify the selected disk and preserve any files you still need first. A familiar computer model is not proof that its hardware or firmware has not been altered.",
    ],
  },
  "real-device/separation": {
    instructions: [
      "Label the computer's installed system disk, the USB used to install Debian, the wallet backup devices, and the USB used to move PSBT payment files. Media means the storage device itself. Give each device a clear purpose and record which computer may read it.",
      "Keep the password recovery record separate from wallet backups and payment-transfer media. Two backup files on one disk share the risk of that disk failing. A transfer USB can carry harmful files even when the signer has no network connection.",
    ],
  },
  "real-device/online-node": {
    help: "Keep the full block archive if storage allows. Pruning saves disk space and still checks all Bitcoin rules. If you choose pruning, plan how to obtain old blocks when a recovery scan needs them.",
    instructions: [
      "Install Debian Stable on the online computer, apply its security updates and verify the official Core release using the earlier lesson. Start Core on Signet and wait for it to download and check the practice network's history.",
      "Do not put the savings private-key wallet on this computer. The later PSBT lesson creates its watch-only wallet, which recognizes payments but cannot sign. You may keep the full block archive if storage allows. Pruning saves space by deleting old checked blocks; plan how recovery will obtain any deleted history it needs.",
    ],
  },
  "ops-malware/media": {
    expectedResult:
      "You have identified the transfer device and can name the file types allowed on it.",
    instructions: [
      "Use the labeled payment-transfer device only for public descriptors, which describe wallet addresses without private keys, and PSBT files containing proposed or signed payments. Open only the expected data file in the verified application.",
      "Never run a program or install an update supplied on this device while signing. Keep private wallet backups and passwords off it. The absence of a network connection does not make USB contents trustworthy; unexpected files or instructions are a reason to stop.",
    ],
  },
  "ops-malware/destination": {
    expectedResult:
      "You have chosen an independent, trusted source for the recipient's address and know how to compare it on the signer.",
    instructions: [
      "For Signet, record a receiving address from your own training wallet. For a real payment, obtain the recipient's address through a separately authenticated channel, a way of communicating where you have checked who the person is. Do not rely only on the address pasted into the online computer.",
      "On the signer, compare every character with that independent record. Check every payment amount, any change returning to you and the total fee. Looking at the same compromised clipboard on two screens does not provide a separate source of truth.",
    ],
  },
  "ops-physical/physical-plan": {
    help: "A locked room, controlled storage or signs of tampering may help you assess the risk. An intact seal or a clean scan cannot prove that firmware and hardware are unchanged. Leaving a laptop unattended does not, by itself, mean its keys were stolen.",
    instructions: [
      "Write who can physically access the signer and how you will store it between uses. List evidence that would make you suspect it had been altered. An Evil Maid attack is a modification made while you are absent, intended to capture secrets when you next use the device.",
      "Write the stop rule explicitly: if tampering is reasonably suspected, do not unlock the wallet on that computer to test it. A seal or malware scan cannot prove that hardware or firmware is clean. Equally, simply leaving a laptop unattended does not prove that its keys have been stolen.",
    ],
  },
  "ops-physical/replacement-plan": {
    instructions: [
      "Write a response you can follow without trusting the suspicious machine: stop using it for signing, obtain trusted replacement hardware, install verified Debian and Core, disconnect the replacement, restore known-good backups and recheck addresses, wallet descriptions, password access and signing.",
      "Known-good means you have a reason to trust the hardware or backup, not just that a model name or filename looks familiar. Do not copy the suspicious computer's system image to the replacement. If private keys may have been copied, especially after unlocking on the suspect machine, create fresh keys on the trusted replacement and move the funds after checking it. A password change does not revoke a copied private key.",
    ],
  },
  "offline-device/debian-preparation": {
    instructions: [
      "Install verified Debian Stable with a supported desktop, the graphical environment with windows and menus. While the signer has no wallet secrets, apply Debian security updates, prepare the download-verification tools and verify the official Core archive using the earlier lesson.",
      "Install the offline password manager, such as Debian's KeePassXC package, at this stage too. Open Core once to check that it and its supporting software run. If you choose disk encryption, keep its separate recovery password as well. Finish software preparation before disconnecting and creating any private-key wallet.",
    ],
  },
  "offline-device/isolate": {
    instructions: [
      "Close Core. Unplug the Ethernet network cable and disable Wi-Fi, Bluetooth and any other network connections in Debian. Where supported, also disable them in the computer's firmware settings. Physically remove or disable network hardware if your threat model calls for it.",
      "Restart and check that the computer remains disconnected before creating or restoring keys. Core's own network setting affects only Core, not other applications. Once the computer holds private keys, do not reconnect it to download a missing program. Prepare missing software separately or use a prepared replacement without secrets.",
    ],
  },
  "offline-device/debian-datadir": {
    instructions: [
      "In the file manager, open your home folder and create folders named core and core-signet. Unpack the verified release inside core so the program is at core/bitcoin-31.1/bin/bitcoin-qt. The command below starts that program, selects Signet and stores working data in core-signet. $HOME means your home folder; -networkactive=0 and -listen=0 turn off Core's network activity and listening.",
      "Keep the computer physically disconnected. In Core's Window → Console, run getblockchaininfo and getnetworkinfo. Check chain = signet and networkactive = false. false means disabled. The signer is not synchronized with the blockchain. That is expected: the online node will provide payment information in PSBT files.",
    ],
  },
  "offline-device/wallet": {
    instructions: [
      "In Core choose File → Create Wallet and name it signet-offline-wallet. Enable Encrypt Wallet, use a separate test password and leave private keys enabled. These keys will sign the practice payments while the computer stays offline.",
      "Choose File → Backup Wallet and save signet-offline-after-encryption.dat on a separate backup device. Create and record an address through Receive, note the backup location and keep the password separately. The installed disk is working storage, not your only backup; the regular payment-transfer USB must contain neither this backup nor its password.",
    ],
  },
  "offline-device/coldboot": {
    instructions: [
      "Close Core normally, shut Debian down completely and turn the computer on again. This full power-off test is sometimes called a cold boot. Check that network connections remain disabled and start Core with the same command and data folder.",
      "Open signet-offline-wallet and compare the address you recorded with its history. Recheck chain = signet and networkactive = false in the console. Saved data surviving shutdown shows persistence is working; it does not prove you can recover after the disk fails. Keep the separate backup for that later test.",
    ],
  },
  "offline-psbt/export": {
    instructions: [
      "A public descriptor is a text description from which Core can calculate your addresses without receiving private signing keys. It may contain an extended public key, from which Core can derive a sequence of public keys. The receive branch makes addresses for incoming payments; the internal or change branch makes addresses for money returned to you.",
      "On the offline signer, select signet-offline-wallet in Window → Console and run listdescriptors without true. The reply is structured text called JSON. Save only the descriptors array, the list between its opening [ and matching closing ], as signet-public-descriptors.json. Keep each entry and its range, timestamp, next_index, active and internal fields intact. Keep the next field too, if present; it is a compatibility copy of next_index. Use a plain-text file on the transfer device. Never run listdescriptors true, export a private descriptor or transfer the wallet backup or password.",
    ],
    expectedResult:
      "The saved JSON list contains the public receive and change descriptions with their original fields. No private key, wallet backup or password crosses to the online computer.",
  },
  "offline-psbt/watchonly": {
    instructions: [
      "A watch-only wallet can recognize your addresses and payments but has no private keys to sign. A blank wallet starts without its own generated keys or address descriptions; you will supply the public descriptions from the offline signer.",
      "On the synchronized online Signet node, run the createwallet command below in Core's console. Select signet-watch-only and run getwalletinfo. Confirm walletname = signet-watch-only and private_keys_enabled = false, meaning private keys are disabled, before importing anything. Never restore the offline wallet's backup on this computer.",
    ],
  },
  "offline-psbt/import": {
    instructions: [
      "Open signet-public-descriptors.json as plain text on the online computer. JSON arrays use [ and ] around the list, with named fields inside each entry. range gives the address-number range, timestamp tells Core how far back to look for payments, next_index records the next address position, active says whether to use the description for new addresses, and internal distinguishes change from receiving addresses.",
      "In the signet-watch-only Core console, enter importdescriptors followed by the complete saved array inside single quotes. Keep all fields and original timestamps. Use the array, not the outer object that contained it in the original reply. Check that every import entry reports success: true and that getwalletinfo still reports private_keys_enabled: false. Do not replace old timestamps with now to skip a scan.",
    ],
  },
  "offline-psbt/address": {
    help: "Two wallets can be at different positions in their address sequences. Check the same recorded address on both devices instead of generating a new address on each and expecting them to match.",
    expectedResult:
      "The offline wallet recognizes the address as its own, with ismine: true, and the receive branch matches your records. Only then request a small faucet payment to it.",
    instructions: [
      "Create a receiving address in signet-watch-only and take that exact public address to the offline signer. In its Core console, run getaddressinfo with the address inside double quotes. ismine: true means the selected offline wallet recognizes it as its own.",
      "Check the returned descriptor and derivation path, the recorded sequence used to calculate this address, against the receive branch you exported. Compare the complete address on both devices. Only after those checks, request a small Signet faucet payment to it. Do not compare two independently generated next addresses; their address counters may be at different positions.",
    ],
  },
  "offline-psbt/proposal": {
    instructions: [
      "Wait for the received test coins to have a confirmation. In signet-watch-only, use Send to prepare a small payment to the recorded address in your separate training wallet. Leave enough for the fee and review the amount and destination.",
      "Choose Create Unsigned, then Save the .psbt file. Unsigned means the payment has not been approved by the private keys. A funded proposal has selected inputs, the received amounts it intends to spend; it does not mean the payment has been sent. Keep the independently recorded destination for the offline check.",
    ],
  },
  "offline-psbt/review": {
    expectedResult:
      "Every output is accounted for, the recipient matches your independent record, and you understand the total fee.",
    instructions: [
      "Move only the expected .psbt file to the offline computer. Select signet-offline-wallet and choose File → Load PSBT from file. Treat this as an untrusted proposal until you have checked it.",
      "For every output, check which address receives what amount. Compare the recipient with your independent record. Any change output returns the unused remainder to your wallet and must be recognized as yours. Check the displayed total fee too. Do not sign if the fee cannot be calculated, an output is unexplained, change is unrecognized or an address differs.",
    ],
  },
  "offline-psbt/sign": {
    instructions: [
      "After reviewing the whole payment, choose Sign Tx in the PSBT dialog. Tx is short for transaction. Enter the test wallet password only when Core requests it. Core signs the payment with the private keys; the keys stay on the signer.",
      "Check that Core reports the transaction fully signed and ready for broadcast. Save the signed PSBT with a different filename so you can distinguish it from the unsigned proposal. Close the wallet normally and keep the signer offline. Saving a file does not mean it has been signed. Check Core's signing status before continuing.",
    ],
  },
  "offline-psbt/broadcast": {
    instructions: [
      "Return the signed .psbt file to the online node. Choose File → Load PSBT from file, check the outputs and total fee again, then select Broadcast Tx. Broadcast means send the transaction to the Bitcoin network; it does not require unlocking private keys on this computer.",
      "The Core window assembles the signed transaction into its final form and extracts it from the PSBT before sending. Wait for a Signet confirmation and record the transaction ID. A separate command-line workflow uses different commands; do not pass a PSBT file or string directly to sendrawtransaction, which expects the final raw transaction.",
    ],
  },
  "offline-recovery/signer": {
    instructions: [
      "Set the original signer and its working disk aside intact. Prepare trusted replacement hardware with verified Debian and Core using the signer-setup lesson. Disconnect it before restoring any wallet secrets, and use a separate Core Signet data folder.",
      "Using only known-good recovery copies, choose File → Restore Wallet and restore signet-offline-after-encryption.dat as signet-offline-restored. Check an address you recorded earlier that has received test coins. The original signer must supply nothing for this recovery. Never restore this private-key backup on the online computer.",
    ],
  },
  "offline-recovery/coordinator": {
    help: "Use a node with the blocks needed for recovery. Public descriptors restore the address rules, but not labels stored only on the original online computer. Keep a separate watch-only wallet backup if you need those labels.",
    expectedResult:
      "The new online wallet reports private_keys_enabled: false and finds the expected unspent amounts without using the original coordinator's database.",
    instructions: [
      "The coordinator is the online computer that tracks payments and prepares PSBT files. Close its original watch-only wallet. On a separate synchronized Signet Core setup, create a new blank wallet with private keys disabled.",
      "Export public descriptors from the restored offline signer and import the complete receive and change entries with their original timestamps, as in the PSBT lesson. Let Core scan for payments and compare your recorded transactions. Keep private_keys_enabled = false. Public descriptors recover the address rules, but not labels written only in the lost coordinator; preserve a separate watch-only backup if you need those labels.",
    ],
  },
  "offline-recovery/sign-again": {
    expectedResult:
      "A payment signed and broadcast using only the replacement computers has received a confirmation. The original wallets and signer disk were not needed.",
    instructions: [
      "Repeat the PSBT payment using only the replacement online wallet and signet-offline-restored. Prepare the proposal online, check every output and fee offline, unlock with the test password recovered from its separate record, and sign.",
      "Return the signed file to the replacement online node, broadcast it and wait for confirmation. Record the transaction ID, software versions and any missing instructions you discovered. This confirms that both replacement computers completed the payment without using the original wallets or disks.",
    ],
  },
  "ops-documentation/card": {
    expectedResult:
      "The recovery card identifies the necessary files, devices and records, and explains their purpose. It contains no password or private key.",
    instructions: [
      "Write a recovery card on paper. List the network, which computer signs and which prepares payments, wallet names, Core and operating-system versions, backup dates and locations, and where to find the separate password-recovery records. Identify the public descriptor file and the wallet's creation date.",
      "Write the ordered steps for rebuilding each computer and mark the actions that must stay offline. The card should identify the needed files and records without containing a private key or password. Keep it private too: addresses and storage locations can reveal sensitive financial information.",
    ],
  },
  "ops-documentation/rehearse": {
    instructions: [
      "Repeat the offline recovery exercise using the card and separately stored Signet backups and password records. Do not rely on the original computers or on steps you remember but have not written down.",
      "At every point where you have to guess, stop and improve the card. Record the successful test date and confirmed transaction ID. If the instructions depend on the original device still working, recovery remains unfinished.",
    ],
  },
  "ops-documentation/operator-unavailable": {
    expectedResult:
      "You have named the person who could recover the wallet and checked that they can follow the test instructions to find both the backup and the separate password record.",
    instructions: [
      "Name the person who could act if you died or became unavailable. Ask them to locate the instructions and rehearse with Signet test files. They should be able to find the wallet backup and recover its password through the separate records without relying on you to fill in missing steps.",
      "Correct anything unclear. Do not share real wallet secrets simply to run this practice. Review the access instructions after life changes; legal arrangements for inheritance need their own appropriate review.",
    ],
  },
  "optional-tails/tails-benefit": {
    expectedResult:
      "You can explain which risk Tails addresses and why the extra setup and maintenance are worthwhile for you.",
    instructions: [
      "Tails starts from a USB drive. It can reduce information left behind by a session, while a normal persistent Debian installation keeps saved files and settings. After completing the Debian recovery rehearsal, write which particular risk would be reduced by using Tails.",
      "Write down the extra USB-startup, storage and recovery steps you would accept. Continue only if that benefit matters. This draft deliberately uses encrypted Persistent Storage for some files, so it is not a completely amnesic wallet. Starting Tails cannot make altered hardware or firmware trustworthy.",
    ],
  },
  "optional-tails/boot": {
    instructions: [
      "Follow Tails' official installation and verification instructions for a supported computer. An installation image is the downloadable file used to create the system USB. Installing it erases the selected USB, so identify that device and preserve any needed files first.",
      "Boot means start the computer using that system. Unplug Ethernet and select Offline Mode in the Welcome Screen's additional network settings before entering the desktop. Check this setting every time; do not assume the last session's choice was retained.",
    ],
  },
  "optional-tails/persistence": {
    instructions: [
      "Persistent Storage is an encrypted area on the Tails USB that deliberately keeps selected files after shutdown. On the first startup, open Tails → Persistent Storage, create it and enable Persistent Folder. Keep its password in a separate recoverable place.",
      "On later startups, unlock that existing storage in the Welcome Screen, then recheck Offline Mode. Creating storage once and unlocking it later are different actions. The storage password protects this area; Core's wallet password separately protects its private keys. You need independent Core backups even when persistence works.",
    ],
  },
  "optional-tails/datadir": {
    instructions: [
      "Before any wallet keys exist, bring the verified Linux x86-64 Core 31.1 archive and verification records from the preparation computer. Unpack it at /home/amnesia/Persistent/core/bitcoin-31.1. In the Files application, create /home/amnesia/Persistent/core-signet for Core's data.",
      "Start Core with the explicit command below. The paths identify the saved program and data inside Persistent, rather than the temporary home folder. In Core's console, check networkactive = false using getnetworkinfo. If the program or required supporting software cannot run, stop. Do not connect a signer holding private keys to download a fix or silently switch to temporary storage.",
    ],
  },
  "optional-tails/wallet": {
    instructions: [
      "In the offline Core window, create signet-offline-wallet with Encrypt Wallet enabled and a dedicated test password. Keep private keys enabled so it can sign. Choose File → Backup Wallet and save signet-offline-after-encryption.dat on a separate backup device.",
      "Create and record an address using Receive before closing Core normally. Keep wallet backups and passwords off the regular PSBT transfer USB. Tails Persistent Storage is the working copy, not a substitute for a backup on another device.",
    ],
  },
  "optional-tails/coldboot": {
    instructions: [
      "Shut Tails down completely and start the computer again. Unlock Persistent Storage, select Offline Mode and start Core with the same saved-data command. Open signet-offline-wallet and find the receiving address you recorded.",
      "Check that Core remains offline and the wallet survived shutdown. If it is missing, do not create another wallet and mark this done. Check whether Persistent Storage is unlocked and whether the data path is correct. Keep the independent backup for a separate offline recovery rehearsal.",
    ],
  },
  "real-encryption/password": {
    expectedResult:
      "You can retrieve the new random wallet password even if the wallet's backup device is unavailable.",
    instructions: [
      "On the trusted offline signer, open the verified password manager prepared earlier. Use its generator to create a unique password of 24 random letters and digits. Random means chosen by the software, not a memorable pattern you invent. Do not use a browser generator or a test password.",
      "Preserve it in a recoverable offline record or encrypted password-manager database. Check that you can retrieve it before using it. If using a database, keep its own password recoverable too. You must be able to recover the password even if the device holding the wallet backup fails.",
    ],
  },
  "real-encryption/mainnet": {
    instructions: [
      "Close Core. In your home folder create core-mainnet, separate from core-signet. A data directory is simply the folder selected for Core's working files. Run the command below on the disconnected signer. It intentionally leaves out -signet, so Core starts on mainnet.",
      "In Core's console check chain = main and networkactive = false before creating a wallet. main means the real Bitcoin network; false means Core's networking is disabled. Keep the computer physically offline too. Do not restore a Signet backup into this folder.",
    ],
  },
  "real-encryption/create": {
    instructions: [
      "In the offline Core window choose File → Create Wallet, name it savings-offline and enable Encrypt Wallet. Enter the new mainnet password only in Core's dialog, and leave private keys enabled. These are new keys, separate from all practice wallets.",
      "Choose File → Backup Wallet and save mainnet-savings-after-encryption.dat on separate backup media. Create and record a receiving address and the exact backup location. Never put the real password in a terminal command, on this website or alongside an unprotected copy of the backup.",
    ],
  },
  "real-restore/restore": {
    instructions: [
      "Before depositing bitcoin, set the original signer aside and prepare a trusted replacement with verified software. Disconnect it before recovery and use a separate mainnet data folder. Restore mainnet-savings-after-encryption.dat as savings-restored.",
      "In the restored wallet's Core console, use getaddressinfo for the address recorded when you created the wallet. Check that the wallet recognizes the address and that the returned descriptor, which describes its addresses and spending rules, matches your records. Never copy the private wallet file to the online node. This checks an empty wallet; a confirmed spend comes later.",
    ],
  },
  "real-restore/unlock": {
    help: "If the password fails, stop before depositing. Core has no wallet-password reset service. Return to your separate password-recovery records and check that you have the correct password.",
    instructions: [
      "Loading the wallet makes its records visible. Unlocking uses its password to make private keys temporarily available. You must check the actual recovered password, not only whether Core displays the address.",
      "With savings-restored selected in the offline Core console, read help walletpassphrase. Follow the syntax shown in that help text to unlock the wallet for 60 seconds with your recovered password. Then run walletlock. Check getwalletinfo afterward; unlocked_until should be 0 when locked. Do not enter the password in the operating-system terminal, paste the command with the password into your notes, or include it in a screenshot or website. If it fails, stop before depositing.",
    ],
    expectedResult:
      "Core accepts the recovered password, and getwalletinfo reports unlocked_until: 0 after walletlock.",
  },
  "real-restore/public": {
    expectedResult:
      "The online wallet knows the mainnet wallet's address rules but has no private keys. The restored offline signer recognizes the receiving address.",
    instructions: [
      "Create a new online savings-watch-only wallet and repeat the public-descriptor export/import from the Signet PSBT lesson, now using savings-restored on the offline signer. The public descriptions let the online wallet recognize the real wallet's addresses without its private keys.",
      "Keep both receive and change branches and their original timestamps. Use the new mainnet descriptor file, not the Signet one. Confirm private_keys_enabled = false and a synchronized mainnet node. Check one exact receiving address on the restored offline signer before using it. Missing old blocks must be recovered for a needed scan, not skipped.",
    ],
  },
  "mainnet-small-test/deposit": {
    instructions: [
      "Use the receiving address already checked on savings-restored. Choose a small amount you could afford to lose that also covers the planned payment and fees. There is no single test amount suitable for everyone.",
      "Compare the full address again before making the transfer, then wait for a confirmation on your own synchronized mainnet node. This means the payment has entered a block that your node checked. If the address differs or the expected receipt is missing, stop and resolve it before sending more.",
    ],
    expectedResult:
      "Your node shows a confirmed test payment to the address checked on the restored mainnet wallet.",
  },
  "mainnet-small-test/spend": {
    instructions: [
      "In savings-watch-only, prepare a small PSBT self-transfer to another address independently checked on savings-restored. Keep the original signer set aside so it cannot supply the signature for this test.",
      "On the restored offline signer, check every output, any change returning to you and the total fee. Sign, save the signed file and return it to the online node for broadcast. Stop for an unknown output or incomplete signatures. If you need to guess, repeat the Signet version of the exercise first.",
    ],
  },
  "mainnet-small-test/confirm": {
    instructions: [
      "Wait for the transaction to confirm on your own node. Match its transaction ID, recipient amounts, change and fee to the payment you reviewed. This ties the network result to the payment the restored signer approved.",
      "Update the recovery card with the successful test date and software versions. Keep current backups on independent devices before considering further deposits. This test shows the setup worked; it does not guarantee protection against later tampering or losing every backup.",
    ],
  },
  "ops-routine/schedule": {
    help: "This schedule is the course's recommended baseline, not a rule of the Bitcoin network. Apply needed security updates sooner; do not wait for the annual drill.",
    expectedResult:
      "You have scheduled both the next quick backup check and the next full recovery drill.",
    instructions: [
      "Schedule a quick check of backup files and storage devices within the next 3–6 months. Schedule a full recovery drill within the next year. A drill means actually rebuilding the wallet and completing the signing process.",
      "For high-value or complicated setups, consider two full drills a year. These are course recommendations, not rules enforced by Bitcoin. Apply needed security updates sooner rather than waiting for the annual test.",
    ],
  },
  "ops-routine/media-check": {
    help: "A file's presence does not prove that recovery works. Keep your only good copy safe while testing. A cloud file listing, or a second file on the same disk, does not establish independent recovery.",
    instructions: [
      "Check that each expected backup file is present and readable on its USB drive, external disk or optical disc. Use a trusted environment and keep private wallet backups off the online coordinator. Retain another good copy while testing a device.",
      "Read the recovery instructions too. Record which copies you checked, replace failed media and fix unclear steps. A cloud file listing or a second file on the same disk does not prove independent recovery. This quick check does not replace actually restoring and signing.",
    ],
  },
  "ops-routine/full-drill": {
    help: "Signet lets you practice the procedure, but it does not test your actual mainnet backup or password. Check those offline on a trusted replacement and complete the small mainnet test before relying on the setup for savings. Never upload a real backup to a practice website.",
    expectedResult:
      "You have recorded a confirmed transaction completed with the replacement computers, along with any corrections to the recovery instructions.",
    instructions: [
      "Follow the offline-recovery exercise using the recovery card and a trusted replacement. Restore the wallet, check recorded addresses and public descriptions, and retrieve its separately stored password. Prepare a PSBT online, review and sign offline, then broadcast and confirm. Record the outcome and corrections.",
      "Use Signet for repeated practice. A Signet test does not test the actual mainnet backup or password: check those offline on the trusted replacement and complete the existing small-value mainnet test before relying on the setup for substantial savings. Never upload a real backup to a practice website.",
    ],
  },
  "ops-routine/change-trigger": {
    instructions: [
      "Write a checklist of changes that require another recovery test immediately: a new wallet, new wallet password, different backup arrangement, imported keys or descriptors, changed multisig signing rule, replacement signer, changed recovery steps or inheritance instructions.",
      "Update affected backup files and written records as part of the change, then test before relying on the new setup. Do not wait until the annual date. Changing a password does not update old backup files or take back a private key someone copied.",
    ],
  },
  "ops-routine/maintenance": {
    instructions: [
      "Record four separate things: Debian, the operating system; Core's program files; Core's blockchain data folder; and the wallet files and passwords needed for recovery. Normal OS or Core updates do not require downloading the blockchain again if the data remains intact. Read each release's upgrade notes: database migrations, reindexing, corruption or deleted blocks can require extra work. Reindexing means rebuilding Core's indexes from block data.",
      "Before significant maintenance, back up relevant settings and wallets. Apply Debian security updates on the online node, upgrade Debian while its release is supported, and evaluate and verify Core releases separately. Keep a signer that holds keys offline. Prepare authenticated updates separately, or prepare an updated replacement without secrets, disconnect it, and then restore known-good backups. Rehearse that method rather than connecting the active signer just to run apt.",
    ],
  },
}

function reviseStep(lessonId: string, step: GuidedStep): GuidedStep {
  const replacement = stepCopy[`${lessonId}/${step.id}`]
  if (!replacement)
    throw new Error(`Missing beginner step: ${lessonId}/${step.id}`)
  return { ...step, ...replacement }
}
