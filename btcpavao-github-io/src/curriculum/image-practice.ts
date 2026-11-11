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

const downloads = "/en/bitcoin-core/debian-images/"
const course = "/en/bitcoin-core/self-custody/#lesson/"
const imageCourse = "/en/bitcoin-core/self-custody/?setup=vault-node#lesson/"
const signedCheck = { label: "Check a signed ISO", href: downloads + "#verify-download" }
const rebuild = { label: "Rebuild the comparison candidate", href: downloads + "#rebuild-tutorial" }
const nativeExport = {
  label: "Core 32.1 watch-only export on Vault",
  href: "https://github.com/btcpavao/bitcoin-core-vault-releases/blob/v0.5.0/docs/WATCH-ONLY.md",
}
const independentRecovery = {
  label: "Recover a Vault backup using GnuPG and Core",
  href: "https://github.com/btcpavao/bitcoin-core-vault-releases/blob/v0.5.0/docs/GPG-BACKUP.md",
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
      instructions: ["Compare the BTC Pavao key fingerprint through a channel you already trust. In the wrong-file example, GnuPG accepts the signature on the checksum list, then the verifier rejects the file you selected. Identify which check passed and which one stopped the process."],
      result: "You can distinguish the publisher’s identity, the downloaded bytes and an independent rebuild. Each answers a different question.",
      links: [signedCheck, rebuild],
    },
  },
  "debian-setup": {
    steps: {
      "verify-image": {
        role: "Vault and Node",
        title: "If you downloaded a prepared ISO",
        instructions: ["Use the signed check for the exact file you selected: Vault v0.5.0 or Node v0.1.0-rc.2. Find the full signer fingerprint and the OK line for that ISO. The Debian installer in the main exercise has its own publisher and signature."],
        links: [signedCheck],
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
        instructions: ["The builders in this exercise attest to the upstream Bitcoin Core release. BTC Pavao signs the checksums for the complete prepared Debian images, which also contain the desktop, installer and project tools. Follow the signed image guide if that is the file you have."],
        links: [signedCheck],
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
        instructions: ["In a separate Vault exercise with a disposable wallet, open Wallet Backup on Home and select the intended wallet. Choose a new .gpg destination on your backup medium. Supply an independently generated GPG passphrase and wait for the completed backup check."],
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
        instructions: ["Keep transfer media distinct from signing-wallet backup media. Use Files to take the watch-only export or signed .psbt out of Vault’s Private Workspace. On Node, the PSBT Transfer Folder provides temporary RAM space. Copy the completed file to the transfer medium before shutdown."],
        result: "You can identify the single file needed for this hand-off. The original signing wallet stays on the offline side.",
      },
    },
  },
  "prepare-offline-signer": {
    overview: {
      role: "Vault",
      title: "Rehearse with an empty Vault wallet",
      instructions: ["The signed Vault v0.5.0 image runs Core 32.1 inside its protected offline launcher. Use an unfunded disposable wallet to practise backup, shutdown and restoration. For the funded Signet exercise, use the standard Core path unless you have separately verified a matching practice network on both computers. The Vault screenshots follow an unfunded wallet with a single GPG backup layer across a guest OS restart. For your own drill, also encrypt the wallet in Core and perform the full shutdown below."],
      links: [signedCheck],
    },
    steps: {
      "debian-preparation": {
        replacesStep: true, role: "Vault", title: "Prepare the signed Vault image",
        instructions: ["Verify the downloaded Vault ISO on a separate computer. Boot the signer with its network disconnected. Choose Live RAM for the rehearsal, or use an existing installed test Vault. Both modes start with a private RAM session."],
        result: "You see Vault Home and have a separate external destination ready for the disposable backup.",
      },
      isolate: {
        replacesStep: true, role: "Vault", title: "Check the offline boundary",
        instructions: ["Disconnect the cable and disable radios. Launch Bitcoin Core from Vault Home. In Core’s console, read getnetworkinfo and find networkactive and connections. Open the Information tab or read getblockchaininfo to record which chain is selected."],
        command: { title: "Bitcoin Core console · Vault", code: "getnetworkinfo" },
        result: "Core reports networkactive false and zero peer connections. You have written down the actual chain.",
      },
      "debian-datadir": {
        replacesStep: true, role: "Vault", title: "Locate the private working files",
        instructions: ["Open Files → Private Workspace. Use this folder for a temporary test note and, later, for public exports and PSBTs. Locate the removable backup medium separately. Vault’s Home launcher already selects the protected Core data directory."],
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
  "watch-only-setup": {
    overview: {
      role: "Vault and Node", title: "Use the native Core 32.1 watch-only export",
      instructions: ["Use a disposable signing wallet and check that both Core instances are on the same chain. You can practise the export and address check without funding the wallet. The watch-only file carries public descriptors, address-book data and wallet history. Keep it private even though it contains no signing keys."],
      links: [nativeExport],
    },
    steps: {
      export: {
        replacesStep: true, role: "Vault", title: "Export watch-only.dat",
        instructions: ["Select the intended signing wallet in Core and choose File → Export watch-only wallet. Save watch-only.dat in Private Workspace. In Files, copy that exported file to your transfer USB. Keep the original wallet.dat and its encrypted backup on the offline side."],
        result: "The transfer USB contains the public watch-only export.",
      },
      "watchonly-gui-v4": {
        replacesStep: true, role: "Node", title: "Restore the public file on Node",
        instructions: ["Open Core on the matching chain. Choose File → Restore Wallet, select watch-only.dat and give the new wallet a recognizable name. Select that wallet once the restore finishes. A wallet with earlier transactions may need time and access to older blocks to rescan."],
        result: "Node has opened the named watch-only wallet without any signing-wallet passphrase.",
      },
      import: {
        replacesStep: true, role: "Node", title: "Check that the online wallet cannot sign",
        instructions: ["In Core’s console, select the restored wallet and run getwalletinfo. Check walletname, then find private_keys_enabled. If it says true, stop the exercise and establish which file was transferred before using this setup."],
        command: { title: "Bitcoin Core console · selected Node watch-only wallet", code: "getwalletinfo" },
        result: "The intended wallet reports private_keys_enabled: false. The native export already supplied its public descriptors.",
      },
      address: {
        replacesStep: true, role: "Vault and Node", title: "Check one address on both computers",
        instructions: ["Generate a receiving address in the Node’s watch-only wallet. On Vault, select the matching signing wallet. In its console, replace the placeholder below with the full public receiving address from your disposable Node wallet. Compare the full address and the ismine result. Generating a fresh address on both computers can select two different indices."],
        command: { title: "Bitcoin Core console · selected Vault signing wallet", code: 'getaddressinfo "YOUR_PUBLIC_TEST_RECEIVING_ADDRESS"' },
        result: "Vault recognizes the exact address shown by Node as its own. If the address or wallet differs, stop before requesting payment.",
      },
    },
  },
  "first-offline-signed-transaction": {
    overview: {
      role: "Vault and Node", title: "Follow one test payment across two devices",
      instructions: ["For a live rehearsal, use matching practice networks and a funded disposable test wallet. Check the network in both Core instances before creating the proposal. The released images start with their own launcher settings. If you have not established a supported practice network on both, use the Standard Core Signet path to make the payment. An empty mainnet wallet is sufficient for the earlier export exercise. The accompanying Core 32.1 Regtest session shows a 0.25 test BTC payment signed offline, returned to the watch-only node and confirmed in a block."],
      links: [{ label: "Verify the practice network first", href: course + "start-bitcoin-core-on-signet" }],
    },
    steps: {
      proposal: {
        replacesStep: true, role: "Node", title: "Save one unsigned test payment",
        instructions: ["With the correct funded test watch-only wallet selected, open Send and enter the independently recorded recipient address and test amount. Review the fee, choose Create Unsigned and save the .psbt. Copy the unsigned file to your transfer USB."],
        result: "You can identify the unsigned file, proposed destination, amount and fee. No transaction has been broadcast.",
      },
      review: {
        replacesStep: true, role: "Vault", title: "Check what the proposal authorizes",
        instructions: ["Open or restore the matching disposable signing wallet. Copy the unsigned PSBT into Private Workspace, then use File → Load PSBT from file. Compare the complete recipient address and amount with your independent record. Inspect every other output, identify any change belonging to your wallet and check the total fee."],
        result: "You can explain every output. An unknown destination, unexplained change or unexpected fee is a reason to leave the proposal unsigned.",
      },
      sign: {
        replacesStep: true, role: "Vault", title: "Sign and return the signed file",
        instructions: ["Choose Sign Tx only after reviewing the payment. Unlock the wallet with its Core passphrase if prompted. Wait for Core to report that signing is complete. Save the signed PSBT under a distinct name in Private Workspace, then copy it to the transfer USB using Files."],
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
        links: [signedCheck, independentRecovery],
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
        instructions: ["Restore one externally stored signing-wallet backup on a fresh offline system. Separately test the Node data you plan to reuse. In Node RC2 the four exports finish after writing and flushing the files. A recovery drill shows whether your particular saved copy works."],
      },
    },
  },
  "optional-gpg-layers": {
    steps: {
      "gpg-recover-20261016": {
        role: "Vault", title: "Recover one wallet without the Vault interface",
        instructions: ["For a Vault v0.5.0 single-wallet export, use standard GnuPG on a clean offline system to open each GPG layer, outermost first. The final output is the Core wallet file. Restore it using File → Restore Wallet and use the separate Core passphrase when the signing test asks for it. A grouped file or folder backup also requires extracting the recovered TAR archive."],
        result: "A backup from the removable medium restores in standard Core and can sign the disposable test payment.",
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
