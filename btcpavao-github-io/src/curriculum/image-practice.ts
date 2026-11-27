import { DEBIAN_IMAGE_VERIFICATION_PATH } from "../routes"

/** Teaching material keyed by the public lesson slug and the existing guided step ID. */
export type ImagePractice = {
  role: "Vault" | "Node" | "Vault and Node"
  title: string
  instructions: string[]
  command?: { title: string; code: string }
  result?: string
  links?: { label: string; href: string; download?: boolean }[]
  replacesStep?: boolean
}

type ImageLesson = {
  overview?: ImagePractice
  steps?: Record<string, ImagePractice>
}

const downloads = "/bitcoin-core/debian-images/"
const imageCourse = "/bitcoin-core/self-custody/?setup=vault-node#lesson/"
const downloadCheck = { label: "Check your Vault or Node ISO", href: downloads + "#verify-download" }
const rebuild = { label: "Rebuild the Vault or Node download", href: DEBIAN_IMAGE_VERIFICATION_PATH + "#rebuild-tutorial" }
const nativeExport = {
  label: "Core 32.1 watch-only export on Vault",
  href: "https://github.com/btcpavao/bitcoin-core-vault-releases/blob/v0.9.0/docs/WATCH-ONLY.md",
}
const independentRecovery = {
  label: "Recover a Vault backup using GnuPG and Core",
  href: "https://github.com/btcpavao/bitcoin-core-vault-releases/blob/58f873fa727054f262b2f99bf742aff251cc5672/docs/GPG-BACKUP.md",
}

export const imagePractice: Record<string, ImageLesson> = {
  "ibd-does-not-block-wallet-learning": {
    overview: {
      role: "Node",
      title: "Read the sync status on the online computer",
      instructions: ["With Core running, open Settings → Bitcoin Core Status. Compare the number of block headers the Node knows about with the blocks it has validated. Network Status tells you whether the computer has a connection. Bitcoin Core Status tells you how far validation has progressed."],
      result: "You can tell whether Core is catching up before using the wallet’s displayed balance.",
    },
  },
  "why-the-signer-does-not-need-the-blockchain": {
    overview: {
      role: "Vault and Node",
      title: "Follow the work across the two desktops",
      instructions: ["Node stores and validates the blockchain. Its watch-only wallet can find payments and prepare a proposal. Vault holds the signing wallet in a private RAM session. It uses the transaction and supporting data in the PSBT to sign offline. Return the signed file to Node for broadcast."],
      result: "Point to the computer that can approve a spend and the computer that can report a block confirmation.",
    },
  },
  "core-as-a-tool-not-an-identity": {
    overview: {
      role: "Vault and Node",
      title: "What survives a restart?",
      instructions: ["On an installed Node, the blockchain and watch-only wallet persist. On an installed Vault, the operating system persists and the private session starts fresh. Before you turn Vault off, save the signing-wallet backup to separate media."],
      links: [{ label: "Rehearse a fresh Vault session", href: imageCourse + "prepare-offline-signer" }],
    },
  },
  "what-verification-proves": {
    overview: {
      role: "Vault and Node",
      title: "Read a successful signature and a rejected file",
      instructions: ["Compare the BTC Pavao key fingerprint through a channel you already trust. In the Vault v0.9.0 example, look for Good signature from btcpavao. The next check reads a deliberately incorrect file with the release ISO’s name. Its line ends in FAILED. Stop before writing it to a USB drive. Identify which check passed and which one stopped the process."],
      result: "You can distinguish the publisher’s identity, the downloaded bytes and an independent rebuild. Each answers a different question.",
      links: [downloadCheck, rebuild],
    },
  },
  "debian-setup": {
    steps: {
      "verify-image": {
        role: "Vault and Node",
        title: "If you downloaded a prepared ISO",
        instructions: ["For Vault or Node, confirm Pavao’s key fingerprint and verify his signature on the checksum list for the exact release you downloaded. Compare the whole ISO’s SHA-256 with its entry in that list. The guide gives the command and expected result for each download."],
        links: [downloadCheck, rebuild],
      },
      "boot-install-clean-v42": {
        role: "Vault and Node",
        title: "Identify the physical destination",
        instructions: ["For a first look at Vault, choose Start Bitcoin Core Vault (Live RAM). To install Node, unplug your backup drives and identify the intended internal disk by model and capacity in the installer. Check the final disk summary before confirming the erase."],
        result: "You can name the source USB and the target disk separately.",
      },
    },
  },
  "install-and-verify-bitcoin-core": {
    steps: {
      signature: {
        role: "Vault and Node",
        title: "Who signed which download?",
        instructions: ["The builders in this exercise attest to the upstream Bitcoin Core release. Pavao signs a separate checksum list for each complete Vault or Node image, including its desktop, installer and project tools. The screenshot verifies the signed Node v0.1.0-rc.4 ISO. Follow the current download guide for the signature, checksum and rebuild checks."],
        links: [downloadCheck, rebuild],
      },
    },
  },
  "generate-passphrase": {
    steps: {
      "keepass-bundled-v41": {
        role: "Vault",
        title: "Open KeePassXC from Vault Home",
        instructions: ["The generator opens on the Passphrase tab with six words selected. Inspect the word list and choose the length for this exercise. Generate a fresh practice phrase locally. Keep the exact words, separators and capitalization in your separate recovery record."],
        result: "You can recreate the disposable phrase from the record without leaving it on the Node or in a screenshot.",
      },
    },
  },
  "encrypt-signet-wallet-and-create-new-backup": {
    steps: {
      backup: {
        role: "Vault",
        title: "Export the wallet after Core encryption",
        instructions: ["In a separate Vault exercise with a disposable wallet, open Wallet Backup on Home and select the intended wallet. Under Save to, select your external backup drive and choose a new .gpg filename. Supply an independently generated GPG passphrase and wait for the completed backup check."],
        result: "You can locate the encrypted file on the external medium and explain when recovery needs the GPG passphrase and when it needs the Core passphrase.",
      },
    },
  },
  "coin-control-fees": {
    steps: {
      "review-v4": {
        role: "Node", title: "Carry the review into a PSBT",
        instructions: ["First complete this single-wallet exercise on Signet. Later, when you use Node with a watch-only wallet, review the same recipient, amount and transaction fee before choosing Create Unsigned. On Vault you will check those details again against your original payment request."],
        links: [{ label: "Review every output offline", href: imageCourse + "first-offline-signed-transaction" }],
      },
    },
  },
  "back-up-remove-test-wallet-and-restore": {
    steps: {
      restore: {
        role: "Vault",
        title: "Recover the external copy into private RAM",
        instructions: ["With your disposable backup available, open Decrypt Backup and choose the .gpg file on the external medium. Decrypt to a fresh folder in Private Workspace. For a single wallet, open Core → File → Restore Wallet, select the recovered wallet.dat and give this copy a distinct name."],
        result: "The restored copy recognizes a receiving address you recorded before the backup.",
      },
    },
  },
  "send-again-after-signet-recovery": {
    steps: {
      spend: {
        role: "Vault and Node",
        title: "Test signing after recovery",
        instructions: ["In the single-wallet Signet exercise, send from the restored test wallet. Later, in the two-computer exercise, the replacement Vault signs a new proposal and the Node broadcasts it. The ability to display the old address or history alone cannot demonstrate spending authority."],
        links: [{ label: "Recovery with two replacement computers", href: imageCourse + "recovery-drill-without-original-coordinator" }],
      },
    },
  },
  "wallet-backup-vs-node-data": {
    overview: {
      role: "Vault and Node",
      title: "Choose the backup that solves your loss",
      instructions: ["Vault’s encrypted signing-wallet backup is what you recover to sign again. On the Node, Settings → Backup and Restore separates blockchain data, watch-only wallets, Bitcoin Core configuration and Node configuration. A watch-only copy can restore public wallet records. A blockchain copy can save time when rebuilding a Node. Neither can sign a payment."],
      result: "For each external file, say what a replacement computer can do after restoring it.",
    },
  },
  "more-copies-do-not-mean-a-current-backup": {
    overview: {
      role: "Vault", title: "Keep track of the snapshot you copied",
      instructions: ["Make a fresh Wallet Backup after changing the wallet’s Core passphrase. Copy that new encrypted file to your separate backup locations. Record which snapshot you restored in the rehearsal. Duplicating an old file preserves its old wallet state and its old Core passphrase."],
    },
  },
  "recovery-failure-drills": {
    steps: {
      "failed-usb-v4": {
        role: "Vault",
        title: "Rehearse a missing backup drive",
        instructions: ["Set the first backup medium aside. In a fresh Vault session, decrypt the second external copy and restore the disposable signing wallet. Compare a known address and complete a signing test. Keep both original media intact during the drill."],
        result: "You recovered with the first medium unavailable.",
      },
    },
  },
  "simple-wallet-or-offline-signer": {
    overview: {
      role: "Vault and Node", title: "Decide whether to use a second computer",
      instructions: ["The one-wallet exercise teaches you to receive, spend, back up and recover. A separate Vault keeps spending authority off the online Node, but each outgoing payment now requires a file transfer and an offline review. Write down the risk that makes those extra steps worthwhile for you."],
    },
  },
  "online-node-and-offline-signer": {
    overview: {
      role: "Vault and Node",
      title: "Three hand-offs between the two computers",
      instructions: ["Vault → Node: the native watch-only export lets Node recognize addresses. Node → Vault: an unsigned PSBT describes a proposed payment. Vault → Node: the signed PSBT can be broadcast. The signing wallet and its recovery passphrases stay offline."],
      links: [{ label: "Export the watch-only wallet", href: imageCourse + "watch-only-setup" }],
    },
  },
  "malware-usb-and-destination-verification": {
    steps: {
      media: {
        role: "Vault and Node",
        title: "Choose the correct file before copying",
        instructions: ["Keep transfer media distinct from signing-wallet backup media. In Vault, select the mounted transfer USB when saving a signed PSBT or exporting a watch-only wallet. On Node, Private Workspace provides temporary RAM space for PSBT files. Copy the completed file to the transfer medium before shutdown."],
        result: "You can identify the single file needed for this hand-off. The original signing wallet stays on the offline side.",
      },
    },
  },
  "prepare-offline-signer": {
    overview: {
      role: "Vault",
      title: "Rehearse with an empty Vault wallet",
      instructions: ["The signed Vault v0.9.0 image runs Core 32.1 inside its protected offline launcher. Use an unfunded disposable wallet to practice backup, shutdown and restoration. For the funded exercise, start a fresh Signet session and check its chain before creating the signing wallet. The current Vault screenshots use an unfunded Core-encrypted wallet and a separate GPG backup layer. Keep both passphrases and perform the full shutdown below for your own recovery drill."],
      links: [downloadCheck],
    },
    steps: {
      "debian-preparation": {
        replacesStep: true, role: "Vault", title: "Prepare the signed Vault image",
        instructions: ["Verify the downloaded Vault ISO on a separate computer. Boot the signer with its network disconnected. Choose Live RAM for the rehearsal, or use an existing installed test Vault. Both modes start with a private RAM session."],
        result: "You see Vault Home and have a separate external destination ready for the disposable backup.",
      },
      isolate: {
        replacesStep: true, role: "Vault", title: "Check the offline boundary",
        instructions: ["Disconnect the cable and disable radios. Launch Bitcoin Core from Vault Home and choose Window → Console. Run each command below on its own line. Check that networking is disabled and the peer count is zero, then record the chain shown by the third command."],
        command: { title: "Bitcoin Core console · Vault", code: "getnetworkinfo()[networkactive]\ngetconnectioncount\ngetblockchaininfo()[chain]" },
        result: "Core reports networkactive false and zero peer connections. You have written down the actual chain.",
      },
      "debian-datadir": {
        replacesStep: true, role: "Vault", title: "Locate the private working files",
        instructions: ["Open Files from Vault Home and select Private Workspace. Create a temporary test note there. In the backup tool, open Save to and identify your removable drive by name. The example drive is DEMOUSB. Vault’s Home launcher already selects the protected Core data directory."],
        result: "You can point to the temporary workspace and a separate destination that will survive shutdown.",
      },
      wallet: {
        replacesStep: true, role: "Vault", title: "Create an unfunded wallet and export its backup",
        instructions: ["In Core, create a disposable signing wallet with its own Core passphrase. Record a fresh receiving address for the later check. Use Home → Wallet Backup, select that wallet, choose a new destination on removable media and protect the backup with an independent GPG passphrase. Wait for verification before ejecting the medium."],
        result: "You have an encrypted backup outside RAM, separate recovery records and a known test address. Leave the wallet unfunded.",
      },
      coldboot: {
        replacesStep: true, role: "Vault", title: "Prove the backup survives a fresh session",
        instructions: ["After confirming the external copy exists, shut Vault down completely. Boot again and open Private Workspace. Your temporary note and working wallet are gone. Use Decrypt Backup to recover the external .gpg file into RAM, then File → Restore Wallet in Core. Check the original address against the restored wallet."],
        result: "The fresh session started empty. The restored wallet recognizes the recorded address. Prove signing authority in the payment exercise.",
      },
    },
  },
  "start-bitcoin-core-on-signet": {
    steps: {
      "launch-v4": {
        replacesStep: true, role: "Vault", title: "Start the offline signer on Signet",
        instructions: ["Boot a fresh Vault v0.9.0 Live RAM session with networking disconnected. Before opening Bitcoin Core, open Terminal and run the commands below. The first two commands select Signet in this temporary session. The last starts Vault’s protected Bitcoin Core launcher. If bitcoin.conf already exists, start a fresh practice session."],
        command: { title: "Terminal · fresh Vault live session", code: 'mkdir -p "$HOME/.bitcoin" && (set -C; echo chain=signet > "$HOME/.bitcoin/bitcoin.conf") && core-vault-bitcoin' },
        result: "Bitcoin Core opens with [signet] in the title. Start this way again after each fresh Vault boot.",
      },
    },
  },
  "watch-only-setup": {
    overview: {
      role: "Vault and Node", title: "Use the native Core 32.1 watch-only export",
      instructions: ["Start the offline Vault and the online Node on public Signet. Check the chain in both windows before exporting. A watch-only copy lets Node recognize the signer’s addresses. It can also reveal labels and transaction history to anyone who can read the file. Keep the signing wallet and its recovery backup on Vault."],
      links: [nativeExport],
    },
    steps: {
      export: {
        replacesStep: true, role: "Vault", title: "Export watch-only.dat",
        instructions: ["Select the intended signing wallet in Core and choose File → Export watch-only wallet. Select your mounted transfer USB and save watch-only.dat there. If Core lists address-book or transaction data, review what will be shared before choosing Export wallet. Wait for Export Successful. Keep the original wallet.dat and its encrypted backup on the offline side."],
        result: "The transfer USB contains the public watch-only export.",
      },
      "watchonly-gui-v4": {
        replacesStep: true, role: "Node", title: "Restore the public file on Node",
        instructions: ["Open Core on the matching chain. Choose File → Restore Wallet, select watch-only.dat and give the new wallet a recognizable name. Select that wallet once the restore finishes. A wallet with earlier transactions may need time and access to older blocks to rescan."],
        result: "Node has opened the named watch-only wallet without any signing-wallet passphrase.",
      },
      import: {
        replacesStep: true, role: "Node", title: "Check that the online wallet cannot sign",
        instructions: ["In Core, choose Window → Console, select the restored wallet and run getwalletinfo. Check walletname, then find private_keys_enabled. If it says true, stop the exercise and establish which file was transferred before using this setup."],
        command: { title: "Bitcoin Core console · selected Node watch-only wallet", code: "getwalletinfo" },
        result: "The intended wallet reports private_keys_enabled: false. The native export already supplied its public descriptors.",
      },
      address: {
        replacesStep: true, role: "Vault and Node", title: "Check one address on both computers",
        instructions: ["Choose one receiving address to compare. You can create it on Node after restoring the public wallet, or record it on Vault before exporting, as in this exercise. On each machine, select its corresponding wallet in Window → Console. Replace the placeholder with that same complete address and check ismine. Two separately generated requests can use different address indices."],
        command: { title: "Bitcoin Core console · selected Vault signing wallet", code: 'getaddressinfo("YOUR_PUBLIC_TEST_RECEIVING_ADDRESS")[ismine]' },
        result: "Vault recognizes the exact address shown by Node as its own. If the address or wallet differs, stop before requesting payment.",
      },
    },
  },
  "first-offline-signed-transaction": {
    overview: {
      role: "Vault and Node", title: "Follow one test payment across two devices",
      instructions: ["Use your own disposable wallet, recipient address and test coins. In the public Signet signing example below, Vault v0.9.0 approved a 3,000 sat payment from an 8,000 sat input with networking disabled. For that example the proposal was prepared separately in Bitcoin Core. The Node proposal and broadcast screenshots show a separate Regtest example."],
      links: [{ label: "Verify the practice network first", href: imageCourse + "start-bitcoin-core-on-signet" }],
    },
    steps: {
      proposal: {
        replacesStep: true, role: "Node", title: "Save one unsigned test payment",
        instructions: ["With the correct funded test watch-only wallet selected, open Send and enter the independently recorded recipient address and test amount. Review the fee, choose Create Unsigned and save the .psbt. Copy the unsigned file to your transfer USB."],
        result: "You can identify the unsigned file, proposed destination, amount and fee. No transaction has been broadcast.",
      },
      review: {
        replacesStep: true, role: "Vault", title: "Check what the proposal authorizes",
        instructions: ["Open or restore the matching disposable signing wallet. Use File → Load PSBT from file to open the unsigned proposal on your transfer USB. Compare the complete recipient address and amount with your independent record. Core marks this wallet’s change as “own address.” Total Amount adds the recipient and the change together. Read the fee from “Pays transaction fee of” and check that all outputs plus the fee account for the input."],
        result: "You can explain every output. An unknown destination, unexplained change or unexpected fee is a reason to leave the proposal unsigned.",
      },
      sign: {
        replacesStep: true, role: "Vault", title: "Sign and return the signed file",
        instructions: ["Choose Sign Tx only after reviewing the payment. Unlock the wallet with its Core passphrase if prompted. Wait for Core to report that signing is complete. Choose Save… and select the mounted transfer USB. Give the signed file a distinct name such as payment-signed.psbt. Wait for “PSBT saved to disk” before ejecting the USB."],
        result: "You have a signed file ready to broadcast and can distinguish it from the original unsigned file.",
      },
      broadcast: {
        replacesStep: true, role: "Node", title: "Broadcast and wait for confirmation",
        instructions: ["Load the signed file with File → Load PSBT from file on the synchronized test Node. Compare the payment details again, then choose Broadcast Tx. Record the transaction ID. Open the transaction later and check that the network has included it in a block."],
        result: "A transaction ID records the broadcast. The same transaction later shows at least one confirmation on your practice network.",
      },
    },
  },
  "recovery-drill-without-original-coordinator": {
    overview: {
      role: "Vault and Node", title: "Recover with the original machines set aside",
      instructions: ["Use disposable material and a clean replacement for each role. Recover from the external signing backup and your independent recovery records. For the payment portion, use the verified test-network setup from the previous exercise. In a separate Core 32.1 Regtest drill, the replacement pair used two fresh data directories, the recovered signing wallet and its new watch-only export to spend the earlier output in a confirmed payment of 0.05 test BTC."],
      links: [independentRecovery],
    },
    steps: {
      signer: {
        replacesStep: true, role: "Vault", title: "Recover on a fresh offline signer",
        instructions: ["Start a clean offline Vault. Open Decrypt Backup, select the external .gpg and decrypt into Private Workspace. In Core, choose File → Restore Wallet and select the recovered wallet.dat. Check a known receiving address in the restored wallet."],
        result: "The replacement signer recognizes a recorded address without using the original computer or its working disk.",
      },
      coordinator: {
        replacesStep: true, role: "Vault and Node", title: "Recreate the watch-only coordinator",
        instructions: ["Export a fresh watch-only.dat from the restored Vault wallet. On the replacement Node, restore that public file, verify private_keys_enabled is false and check the same recorded address. Allow synchronization and wallet scanning to finish. Older transactions can require blocks that a pruned Node no longer retains."],
        command: { title: "Bitcoin Core console · replacement Node watch-only wallet", code: "getwalletinfo" },
        result: "The replacement Node recognizes the expected test output without the original coordinator’s wallet database.",
      },
      "sign-again": {
        replacesStep: true, role: "Vault and Node", title: "Make a new payment using only the replacements",
        instructions: ["From the replacement Node, prepare a new PSBT spending the recovered test funds. Review and sign on the recovered Vault, then return the signed file to the replacement Node. Broadcast and record the confirmation. If only the balance or a known address is visible, the signing test is still ahead."],
        result: "The confirmed payment was prepared, signed and broadcast using the two replacement environments.",
      },
    },
  },
  "document-the-procedure-without-exposing-secrets": {
    steps: {
      card: {
        role: "Vault and Node", title: "Write down how the next person recognizes success",
        instructions: ["Record the image versions, where to find the authenticated downloads, which machine handles each file and how to recognize a completed restore. Record pointers to the separate recovery arrangements. Keep the private wallet, passwords and private descriptors out of the procedure."],
        links: [downloadCheck, independentRecovery],
      },
    },
  },
  "offline-mastery": {
    overview: {
      role: "Vault and Node", title: "Record your own recovery result",
      instructions: ["Use your test notes to identify the external copy you restored, the known address you checked and the confirmation of a fresh payment signed on the replacement Vault. Mark the recovery milestone after you have reproduced those results yourself."],
      links: [{ label: "Repeat the replacement-computer drill", href: imageCourse + "recovery-drill-without-original-coordinator" }],
    },
  },
  "regular-tests-and-annual-recovery-drill": {
    steps: {
      "media-review-v4": {
        role: "Vault and Node", title: "Test the copy on the medium you intend to trust",
        instructions: ["Restore one externally stored signing-wallet backup on a fresh offline system. Separately test the Node data you plan to reuse. Node RC4 exports have no read-back verification pass; restore checks remain enabled. A recovery drill shows whether your particular saved copy works."],
      },
    },
  },
  "optional-gpg-layers": {
    steps: {
      "gpg-recover-20261016": {
        role: "Vault", title: "Recover a wallet with Decrypt Backup",
        instructions: ["Open Decrypt Backup on the offline Vault and select the .gpg file on your external drive. Leave Recover to set to Private Workspace and choose a new recovery folder. Enter the GPG passphrases starting with the outermost layer. When Vault reports File recovered to RAM, open Bitcoin Core and choose File → Restore Wallet. Select wallet.dat from the recovery folder."],
        result: "Bitcoin Core opens the restored wallet. Use its separate Core passphrase for the signing test.",
        links: [independentRecovery],
      },
    },
  },
  "migrate-node-data-or-validate-from-scratch": {
    steps: {
      "prepare-copy-v4": {
        role: "Node", title: "Choose what to carry to the new Node",
        instructions: ["The block-file exercise below rebuilds validation state from your own block archive. Settings → Backup and Restore → Blockchain on the prepared Node also saves chainstate and related data so a replacement Node can resume. Decide which recovery you want to rehearse and document the source of the data."],
      },
    },
  },
  "psbt-debugging": {
    steps: {
      "decode-v4": {
        role: "Vault and Node", title: "Read the same proposal in Core and decodepsbt",
        instructions: [
          "Download the binary PSBT to open it with File → Load PSBT from file. The Base64 text download contains exactly the same proposal. To decode it locally, open the console of Bitcoin Core 32.1 running on Regtest and replace the placeholder below with the single line of Base64 text. You can reproduce the values with no wallet, funds or blockchain download.",
          "In the pictured Core 32.1 Regtest session, decodepsbt reports PSBT version 2. Under outputs, match each script.address and amount with the two rows in the dialog. The demo signer recognizes output 0 as its own change of 0.74999718 BTC because it owns the matching wallet. Output 1 pays the recorded recipient 0.25000000 BTC. Check ownership against your wallet even when the output order changes.",
          "Subtract both outputs from the 1.00000000 BTC input. The remaining 0.00000282 BTC equals 282 satoshis. The dialog still reports one unsigned input.",
        ],
        command: { title: "Bitcoin Core console · disposable practice PSBT", code: 'decodepsbt "YOUR_PRACTICE_PSBT_IN_BASE64"' },
        result: "You can identify the same recipient, change and fee in both views of one transaction.",
        links: [
          { label: "Download the unsigned Regtest PSBT", href: "/software/examples/practice-unsigned.psbt", download: true },
          { label: "Download the same PSBT as Base64 text", href: "/software/examples/practice-unsigned.base64.txt", download: true },
          { label: "Review a proposal on the offline signer", href: imageCourse + "first-offline-signed-transaction" },
        ],
      },
    },
  },
}
