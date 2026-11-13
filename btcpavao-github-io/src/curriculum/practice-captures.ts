const base = "/software/screenshots/curriculum/"

export const captures = {
  "fingerprint": {
    src: "/software/screenshots/verification/signer-fingerprint.webp", width: 1192, height: 198,
    context: "Debian terminal · publisher key",
    alt: "GnuPG displays the full BTC Pavao signing-key fingerprint.",
    caption: "Identify the whole fingerprint through a separate channel before trusting the signed checksum list.",
  },
  "wrong-file": {
    src: "/software/screenshots/verification/vault-v060-rejected.webp", width: 1242, height: 384,
    context: "Vault v0.6.0 · deliberately wrong test file",
    alt: "GnuPG accepts the manifest signature but the verifier reports different expected and computed hashes.",
    caption: "The signature passes. The selected file fails its own check, so stop before writing the USB.",
  },
  "vault-iso": {
    src: "/software/screenshots/verification/vault-v060-signed.webp", width: 1242, height: 384,
    context: "Vault v0.6.0 · signed ISO",
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
    src: "/software/screenshots/vault/v0.6.0/home.webp", width: 1280, height: 800,
    context: "Vault v0.6.0 · offline Live RAM session",
    alt: "Vault Home shows Bitcoin Core, Wallet Backup, Decrypt Backup, KeePassXC and Files.",
    caption: "Start Bitcoin Core from Home. The private wallet session runs in RAM in installed mode too.",
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
    src: "/software/screenshots/curriculum/vault-v0.6.0/vault-create-wallet.webp", width: 720, height: 278,
    context: "Vault v0.6.0 · Bitcoin Core 32.1 · unfunded wallet",
    alt: "The Create Wallet dialog on Vault shows the disposable name GuidePractice and the Encrypt Wallet checkbox.",
    caption: "The dialog opens with Encrypt Wallet unchecked. Select it to set the separate Bitcoin Core passphrase used in this exercise.",
  },
  "node-peers": {
    src: base + "node-peer-status.webp", width: 1280, height: 800,
    context: "Node v0.1.0-rc.2 · Regtest VM · offline mode",
    alt: "Node reports that it is waiting for peers and shows Bitcoin Core offline.",
    caption: "Read the connection message first. This offline exercise cannot make synchronization progress through peers.",
  },
  "vault-select-backup": {
    src: "/software/screenshots/vault/v0.6.0/select-wallet.webp", width: 1280, height: 760,
    context: "Vault v0.6.0 · installed offline VM · unfunded wallets",
    alt: "The Select wallet to back up dialog lists two practice wallets with PracticeVault selected.",
    caption: "If you have several wallets, select the one you intend to back up before choosing the backup destination.",
  },
  "vault-backup": {
    src: "/software/screenshots/vault/v0.6.0/backup.webp", width: 1280, height: 760,
    context: "Vault v0.6.0 · Vault Backup 0.7.5 · disposable USB",
    alt: "Create Encrypted Backup shows the open Save to menu with Private Workspace and the TRANSFER USB drive.",
    caption: "Choose your mounted USB drive under Save to for an external encrypted backup. The default Private Workspace is in RAM.",
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
    src: "/software/screenshots/curriculum/vault-v0.6.0/private-backup.webp", width: 800, height: 270,
    context: "Vault v0.6.0 · installed offline VM · private RAM",
    alt: "Files shows wallet.dat.gpg in Private Workspace.",
    caption: "This encrypted file is still in the temporary session. Copy it to the separate backup medium.",
  },
  "vault-usb-backup": {
    src: "/software/screenshots/curriculum/vault-v0.6.0/usb-backup.webp", width: 800, height: 270,
    context: "Vault v0.6.0 · installed offline VM · disposable USB",
    alt: "Files shows the encrypted wallet.dat.gpg backup on the mounted TRANSFER drive.",
    caption: "Check the destination path and the file on the drive before ejecting it. This exercise used a virtual USB device.",
  },
  "vault-restart": {
    src: "/software/screenshots/curriculum/vault-v0.6.0/restart-warning.webp", width: 500, height: 344,
    context: "Vault v0.6.0 · offline Live RAM session",
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
    src: "/software/screenshots/vault/v0.6.0/recover.webp", width: 1280, height: 760,
    context: "Vault v0.6.0 · Vault Backup 0.7.5 · disposable USB",
    alt: "Decrypt Encrypted Backup shows the Recover to menu with Private Workspace and the TRANSFER USB drive.",
    caption: "Keep Private Workspace selected for this restore. Choosing USB writes the recovered files to that drive without the outer GPG protection.",
  },
  "vault-recovered-ram": {
    src: "/software/screenshots/curriculum/vault-v0.6.0/recovery-result.webp", width: 1280, height: 205,
    context: "Vault v0.6.0 · installed offline VM · after restarting",
    alt: "Decrypt Backup reports File recovered to RAM in the practice-recovery folder.",
    caption: "The external GPG backup has been decrypted into the new session. Core can now restore the recovered wallet file.",
  },
  "vault-keepass": {
    src: "/software/screenshots/curriculum/vault-v0.6.0/keepass-passphrase.webp", width: 1160, height: 195,
    context: "Vault v0.6.0 · KeePassXC 2.8.0 · offline Live RAM session",
    alt: "The Passphrase settings show a six-word count, the eff_large wordlist, separator and lower-case options.",
    caption: "Check the word list, number of words and separator before generating your own disposable practice phrase.",
  },
  "vault-restored-file": {
    src: "/software/screenshots/curriculum/vault-v0.6.0/recovered-wallet.webp", width: 800, height: 270,
    context: "Vault v0.6.0 · installed offline VM · after USB recovery",
    alt: "Files shows wallet.dat inside Private Workspace/practice-recovery after decrypting the USB backup.",
    caption: "Select this recovered wallet.dat in Core’s File → Restore Wallet dialog. Keep it in private RAM.",
  },
  "vault-isolation": {
    src: "/software/screenshots/curriculum/vault-v0.6.0/stock-vault-isolation.webp", width: 1274, height: 337,
    context: "Vault v0.6.0 · protected Core session · offline VM",
    alt: "The Core console reports networkactive false and a connection count of zero.",
    caption: "Check both values in the protected signer. Zero peers alone would also be possible on a disconnected online node.",
  },
  "vault-watch-menu": {
    src: "/software/screenshots/curriculum/vault-v0.6.0/stock-vault-export-menu.webp", width: 658, height: 361,
    context: "Vault v0.6.0 · protected Core session · unfunded wallet",
    alt: "The File menu in the signing wallet includes Export watch-only wallet.",
    caption: "Select File → Export watch-only wallet while the disposable signing wallet is active.",
  },
  "vault-watch-complete": {
    src: "/software/screenshots/curriculum/vault-v0.6.0/stock-vault-export-complete.webp", width: 511, height: 121,
    context: "Vault v0.6.0 · protected Core session · unfunded wallet",
    alt: "Core confirms it has exported watch-only.dat to Private Workspace.",
    caption: "This is the public copy you can move to Node. Leave the private wallet and its backup with the signer.",
  },
  "vault-watch-usb": {
    src: "/software/screenshots/curriculum/vault-v0.6.0/stock-vault-public-usb.webp", width: 1040, height: 284,
    context: "Vault v0.6.0 · Files · disposable transfer USB",
    alt: "Files shows watch-only.dat on the TRANSFER USB drive.",
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
    src: "/software/screenshots/curriculum/vault-v0.6.0/vault-wallet-restored.webp", width: 269, height: 120,
    context: "Vault v0.6.0 · installed offline VM · after USB recovery",
    alt: "Core displays Wallet restored successfully after opening the recovered wallet.dat.",
    caption: "Core accepted the recovered backup. Check a previously recorded receiving address in your own rehearsal.",
  },
  "vault-restored-overview": {
    src: "/software/screenshots/curriculum/vault-v0.6.0/vault-restored-overview.webp", width: 1280, height: 260,
    context: "Vault v0.6.0 · installed offline VM · unfunded wallet after restore",
    alt: "Bitcoin Core shows the restored practice wallet named GuideRestored and a zero BTC balance.",
    caption: "The disposable wallet reopened in Core after the guest restarted. For your own recovery drill, also verify an address recorded before the backup.",
  },
  "node-public-open": {
    src: base + "stock-node-restore-open.webp", width: 700, height: 443,
    context: "Node v0.1.0-rc.2 · fresh offline VM · unfunded mainnet exercise",
    alt: "Load Wallet Backup shows watch-only.dat on the PUBLICDEMO transfer device.",
    caption: "On Node, select watch-only.dat from your transfer drive. The drive in this Node example is named PUBLICDEMO.",
  },
  "node-public-name": {
    src: base + "stock-node-restore-name.webp", width: 517, height: 238,
    context: "Node v0.1.0-rc.2 · fresh offline VM · unfunded mainnet exercise",
    alt: "The Restore Wallet dialog contains the local name PracticeWatchOnly.",
    caption: "Use a distinct local name so you can select this watch-only wallet in Core.",
  },
  "node-public-proof": {
    src: base + "stock-node-watch-only-proof.webp", width: 732, height: 292,
    context: "Node v0.1.0-rc.2 · fresh offline VM · unfunded mainnet exercise",
    alt: "The Core console reports chain main, wallet name PracticeWatchOnly and private_keys_enabled false.",
    caption: "Read the chain, wallet name and private-key flag together. This Node opened the public copy supplied by Vault. The payment exercise uses separate Regtest wallets.",
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
    "wallet": ["vault-create", "vault-select-backup", "vault-backup"],
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
    "watchonly-gui-v4": ["node-public-open", "node-public-name"],
    "address": ["watch-address"],
    "export": ["vault-watch-menu", "vault-watch-complete"],
    "import": ["node-public-proof"],
  },
  "recovery-drill-without-original-coordinator": {
    "sign-again": ["restored-pair"],
    "signer": ["vault-decrypt", "vault-restored-overview"],
    "coordinator": ["node-public-proof"],
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
