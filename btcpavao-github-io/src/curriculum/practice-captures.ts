const base = "/software/screenshots/curriculum/"

const captures = {
  "fingerprint": {
    src: "/software/screenshots/verification/signer-fingerprint.webp", width: 1192, height: 198,
    context: "Debian terminal · publisher key",
    alt: "GnuPG displays the full BTC Pavao signing-key fingerprint.",
    caption: "Identify the whole fingerprint through a separate channel before trusting the signed checksum list.",
  },
  "wrong-file": {
    src: "/software/screenshots/verification/rejected-file.webp", width: 1192, height: 448,
    context: "Debian terminal · deliberately wrong test file",
    alt: "GnuPG accepts the manifest signature but the verifier reports different expected and computed hashes.",
    caption: "The signature passes. The selected file fails its own check, so stop before writing the USB.",
  },
  "vault-iso": {
    src: "/software/screenshots/verification/vault-signed.webp", width: 1192, height: 448,
    context: "Vault v0.5.0 · signed ISO",
    alt: "The verifier prints the required signer and OK next to the Vault ISO.",
    caption: "Match the expected signer, file name and full ISO hash.",
  },
  "node-iso": {
    src: "/software/screenshots/verification/node-signed.webp", width: 1192, height: 448,
    context: "Node v0.1.0-rc.2 · signed ISO",
    alt: "The Node ISO checksum is shown beside an OK result.",
    caption: "This signature authenticates the prepared Node ISO. The upstream Bitcoin Core archive has its own verification procedure.",
  },
  "vault-home": {
    src: base + "vault-installed-home.webp", width: 1280, height: 800,
    context: "Vault v0.5.0 · installed offline VM",
    alt: "Vault Home shows Bitcoin Core, Wallet Backup, Decrypt Backup, KeePassXC and Files.",
    caption: "Vault keeps the private session in RAM even when its operating system is installed.",
  },
  "node-disk": {
    src: base + "node-install-destination.webp", width: 1280, height: 800,
    context: "Node v0.1.0-rc.2 · UEFI installer in a disposable VM",
    alt: "The installer shows the target disk for the dedicated Node.",
    caption: "Identify the destination by model and capacity. The device shown here is a disposable virtual disk.",
  },
  "node-backup": {
    src: base + "node-backup-categories.webp", width: 1280, height: 800,
    context: "Node v0.1.0-rc.2 · installed VM",
    alt: "Node’s Backup and Restore screen lists the components available for backup.",
    caption: "Identify the watch-only wallet, blockchain and configuration entries before choosing what to back up.",
  },
  "vault-create": {
    src: base + "vault-create-wallet.webp", width: 1280, height: 401,
    context: "Vault v0.5.0 · offline VM · unfunded wallet",
    alt: "The Create Wallet dialog on Vault shows the disposable name PracticeVault and the Encrypt Wallet checkbox.",
    caption: "The dialog opens with Encrypt Wallet unchecked. Select it to set the separate Bitcoin Core passphrase used in this exercise.",
  },
  "node-peers": {
    src: base + "node-peer-status.webp", width: 1280, height: 800,
    context: "Node v0.1.0-rc.2 · Regtest VM · offline mode",
    alt: "Node reports that it is waiting for peers and shows Bitcoin Core offline.",
    caption: "Read the connection message first. This offline exercise cannot make synchronization progress through peers.",
  },
  "vault-backup": {
    src: base + "vault-wallet-backup.webp", width: 1280, height: 417,
    context: "Vault v0.5.0 · offline VM · empty exercise wallet",
    alt: "Wallet Backup shows the selected wallet, a blank GPG passphrase field and a default destination in Private Workspace.",
    caption: "The default destination is in RAM. Choose removable storage or copy the verified encrypted file there before shutting down.",
  },
  "psbt-review": {
    src: base + "unsigned-signer.webp", width: 585, height: 327,
    context: "Bitcoin Core 32.1 · offline signer · Regtest",
    alt: "The signing wallet recognizes the change output and displays the two payment outputs and fee before signing.",
    caption: "The signer recognizes 0.74999718 BTC in change. Compare the other output, 0.25000000 BTC, with the test payment request. The fee is 0.00000282 BTC (282 sat).",
  },
  "psbt-decode": {
    src: base + "psbt-decode-terminal.webp", width: 1272, height: 492,
    context: "Bitcoin Core 32.1 · Regtest · same unsigned PSBT",
    alt: "The decoded Regtest proposal shows one input worth 1 BTC, two outputs and a fee of 282 sat.",
    caption: "Output 0 returns 0.74999718 BTC to the wallet. Output 1 pays 0.25000000 BTC to the test recipient. Subtract both from the 1 BTC input to check the 282 sat fee.",
  },
  "vault-private-backup": {
    src: base + "vault-private-backup.webp", width: 1280, height: 401,
    context: "Vault v0.5.0 · offline VM · private RAM",
    alt: "Files shows wallet.dat.gpg in Private Workspace.",
    caption: "This encrypted file is still in the temporary session. Copy it to the separate backup medium.",
  },
  "vault-usb-backup": {
    src: base + "vault-usb-backup.webp", width: 1280, height: 401,
    context: "Vault v0.5.0 · offline VM · disposable USB",
    alt: "Files shows the encrypted wallet.dat.gpg backup on the mounted PRACTICEUSB drive.",
    caption: "Check the destination path and the file on the drive before ejecting it. This exercise used a virtual USB device.",
  },
  "vault-restart": {
    src: base + "vault-restart-warning.webp", width: 506, height: 347,
    context: "Vault v0.5.0 · installed offline VM",
    alt: "Vault warns that files left only in the current RAM session will be lost on restart.",
    caption: "Verify the external backup before accepting the restart. Vault leaves that check to you.",
  },
  "psbt-node-unsigned": {
    src: base + "unsigned-node.webp", width: 585, height: 327,
    context: "Bitcoin Core 32.1 · watch-only coordinator · Regtest",
    alt: "Core reports that the proposal has an unsigned input and that this wallet cannot sign it.",
    caption: "Review the destination, change and fee. The watch-only coordinator can save the proposal for transfer.",
  },
  "psbt-signed": {
    src: base + "signed-signer.webp", width: 585, height: 327,
    context: "Bitcoin Core 32.1 · offline signer · Regtest",
    alt: "The signing dialog says the transaction was signed successfully and is ready to broadcast.",
    caption: "Save the signed file under a distinct name and return it to the coordinator.",
  },
  "psbt-broadcast": {
    src: base + "broadcast-node.webp", width: 889, height: 327,
    context: "Bitcoin Core 32.1 · coordinator · Regtest",
    alt: "The coordinator reports a successful broadcast and displays the test transaction ID.",
    caption: "Record the transaction ID and find the same payment in Transactions to check its confirmations.",
  },
  "watch-name": {
    src: base + "watch-only-restore-name.webp", width: 200, height: 94,
    context: "Bitcoin Core 32.1 · coordinator · Regtest",
    alt: "Core prompts for the name of the restored public wallet.",
    caption: "Give the restored public wallet a name you can recognize when selecting it in Core.",
  },
  "watch-address": {
    src: base + "verify-receive-address.webp", width: 1024, height: 388,
    context: "Bitcoin Core 32.1 · two disposable wallets · Regtest",
    alt: "The coordinator and signing wallet both recognize the same bcrt1 receiving address and derivation path.",
    caption: "Compare the complete public test address in both results. The offline wallet recognizes the exact address issued by the watch-only wallet.",
  },
  "restored-pair": {
    src: base + "restored-wallet-proof.webp", width: 1024, height: 388,
    context: "Bitcoin Core 32.1 · two fresh data directories · Regtest",
    alt: "The replacement wallets have different private-key capabilities and the new 0.05 BTC test payment has six confirmations.",
    caption: "The private wallet was restored first. Its fresh public export let the replacement coordinator find the earlier output. This new 0.05 BTC payment spends from the recovered setup.",
  },
  "vault-decrypt": {
    src: base + "vault-decrypt.webp", width: 1280, height: 759,
    context: "Vault v0.5.0 · fresh offline VM session",
    alt: "Decrypt Encrypted Backup shows wallet.dat.gpg, a masked practice passphrase and the practice-recovery folder in Private Workspace.",
    caption: "Vault writes the recovered wallet into the named folder in private RAM. In this example the external wallet backup has one GPG layer.",
  },
  "vault-recovered-ram": {
    src: base + "vault-recovery-result.webp", width: 1280, height: 183,
    context: "Vault v0.5.0 · after guest restart · offline VM",
    alt: "Decrypt Backup reports File recovered to RAM in the practice-recovery folder.",
    caption: "The external GPG backup has been decrypted into the new session. Core can now restore the recovered wallet file.",
  },
  "vault-keepass": {
    src: base + "vault-keepass-passphrase.webp", width: 1148, height: 189,
    context: "Vault v0.5.0 · KeePassXC in an offline VM",
    alt: "The Passphrase settings show a six-word count, the eff_large wordlist, separator and lower-case options.",
    caption: "Check the word list, number of words and separator before generating your own disposable practice phrase.",
  },
  "vault-restored-file": {
    src: base + "vault-recovered-wallet.webp", width: 1050, height: 245,
    context: "Vault v0.5.0 · offline VM · after USB recovery",
    alt: "Files shows wallet.dat inside Private Workspace/practice-recovery after decrypting the USB backup.",
    caption: "Select this recovered wallet.dat in Core’s File → Restore Wallet dialog. Keep it in private RAM.",
  },
  "vault-isolation": {
    src: base + "stock-vault-isolation.webp", width: 1280, height: 400,
    context: "Vault v0.5.0 · protected Core session · offline VM",
    alt: "The Core console reports networkactive false and a connection count of zero.",
    caption: "Check both values in the protected signer. Zero peers alone would also be possible on a disconnected online node.",
  },
  "vault-watch-menu": {
    src: base + "stock-vault-export-menu.webp", width: 650, height: 410,
    context: "Vault v0.5.0 · protected Core session · unfunded wallet",
    alt: "The File menu in the signing wallet includes Export watch-only wallet.",
    caption: "Select File → Export watch-only wallet while the disposable signing wallet is active.",
  },
  "vault-watch-complete": {
    src: base + "stock-vault-export-complete.webp", width: 745, height: 225,
    context: "Vault v0.5.0 · protected Core session · unfunded wallet",
    alt: "Core confirms it has exported watch-only.dat to Private Workspace.",
    caption: "This is the public copy you can move to Node. Leave the private wallet and its backup with the signer.",
  },
  "vault-watch-usb": {
    src: base + "stock-vault-public-usb.webp", width: 1110, height: 400,
    context: "Vault v0.5.0 · Files · disposable transfer USB",
    alt: "The PUBLICDEMO transfer device contains the exported watch-only.dat.",
    caption: "Check the file name and the destination. This USB carries the public coordinator wallet.",
  },
  "psbt-confirmed": {
    src: base + "confirmed-transaction.webp", width: 620, height: 250,
    context: "Bitcoin Core 32.1 · watch-only coordinator · Regtest",
    alt: "Transaction details show seven confirmations of the original 0.25 BTC test payment and its 282 sat fee.",
    caption: "Match the transaction ID with the broadcast screen. The test chain now has seven confirmations for this payment.",
  },
  "node-synced": {
    src: base + "node-synchronized-regtest.webp", width: 1280, height: 515,
    context: "Node v0.1.0-rc.2 · isolated Regtest VM · one local peer",
    alt: "Bitcoin Core Status shows Synchronized, 112 validated blocks, 112 known headers, 100% validation and one connected peer.",
    caption: "This Node downloaded 112 test blocks from one local peer. Its validated block count now matches its known headers. Compare that with the waiting-for-peers screen.",
  },
  "vault-restore-success": {
    src: base + "vault-wallet-restored.webp", width: 269, height: 119,
    context: "Vault v0.5.0 · Bitcoin Core · after USB recovery",
    alt: "Core displays Wallet restored successfully after opening the recovered wallet.dat.",
    caption: "Core accepted the recovered backup. Check a previously recorded receiving address in your own rehearsal.",
  },
}

type CaptureKey = keyof typeof captures

export const capturePlacements: Record<string, Record<string, CaptureKey[]>> = {
  "what-verification-proves": {
    "overview": ["fingerprint", "wrong-file"],
  },
  "why-the-signer-does-not-need-the-blockchain": {
    "overview": ["node-peers", "vault-home"],
  },
  "debian-setup": {
    "verify-image": ["vault-iso"],
    "boot-install-clean-v42": ["node-disk"],
  },
  "install-and-verify-bitcoin-core": {
    "signature": ["node-iso"],
  },
  "online-node-and-offline-signer": {
    "overview": ["node-peers", "vault-home"],
  },
  "prepare-offline-signer": {
    "debian-preparation": ["vault-home"],
    "wallet": ["vault-create", "vault-backup"],
    "debian-datadir": ["vault-private-backup", "vault-usb-backup"],
    "coldboot": ["vault-restart", "vault-recovered-ram", "vault-restore-success"],
    "isolate": ["vault-isolation"],
  },
  "ibd-does-not-block-wallet-learning": {
    "overview": ["node-peers", "node-synced"],
  },
  "wallet-backup-vs-node-data": {
    "overview": ["node-backup", "vault-usb-backup"],
  },
  "migrate-node-data-or-validate-from-scratch": {
    "prepare-copy-v4": ["node-backup"],
  },
  "encrypt-signet-wallet-and-create-new-backup": {
    "backup": ["vault-backup"],
  },
  "first-offline-signed-transaction": {
    "review": ["psbt-review"],
    "proposal": ["psbt-node-unsigned"],
    "sign": ["psbt-signed"],
    "broadcast": ["psbt-broadcast", "psbt-confirmed"],
  },
  "psbt-debugging": {
    "decode-v4": ["psbt-review", "psbt-decode"],
  },
  "watch-only-setup": {
    "watchonly-gui-v4": ["watch-name"],
    "address": ["watch-address"],
    "export": ["vault-watch-menu", "vault-watch-complete"],
  },
  "recovery-drill-without-original-coordinator": {
    "sign-again": ["restored-pair"],
    "signer": ["vault-decrypt", "vault-restored-file"],
  },
  "optional-gpg-layers": {
    "gpg-recover-20261016": ["vault-decrypt", "vault-recovered-ram"],
  },
  "back-up-remove-test-wallet-and-restore": {
    "restore": ["vault-restored-file", "vault-restore-success"],
  },
  "generate-passphrase": {
    "keepass-bundled-v41": ["vault-keepass"],
  },
  "malware-usb-and-destination-verification": {
    "media": ["vault-watch-usb"],
  },
}

export function capturesFor(slug: string, step = "overview") {
  return (capturePlacements[slug]?.[step] ?? []).map(key => captures[key])
}
