const base = "/software/screenshots/curriculum/"

const captureData = {
  "vault-address-restored": {
    "src": "/software/screenshots/vault/v0.9.0/address-restored-detail.webp",
    "fullSrc": "/software/screenshots/vault/v0.9.0/address-restored.webp",
    "width": 471,
    "height": 117,
    "context": "Vault v0.9.0 · fresh offline session after restart",
    "alt": "Payment information in Restored Practice shows the same full receiving address and Practice only - do not fund label.",
    "caption": "After restarting and restoring the encrypted backup: the same address and label appear in Restored Practice."
  },
  "vault-watch-disclosure": {
    "src": "/software/screenshots/vault/v0.9.0/watch-export-notice-detail.webp",
    "fullSrc": "/software/screenshots/vault/v0.9.0/watch-export-notice.webp",
    "width": 316,
    "height": 418,
    "context": "Vault v0.9.0 · offline live session · public export disclosure",
    "alt": "The export disclosure explains that address-book and transaction data, including text entered in those fields, travel with the watch-only file.",
    "caption": "Read the disclosure before exporting. Anyone with the public copy can read the address-book and transaction data it contains."
  },
  "vault-backup-destinations": {
    "src": "/software/screenshots/vault/v0.9.0/backup-destinations.webp",
    "fullSrc": "/software/screenshots/vault/v0.9.0/backup-destinations.webp",
    "width": 1280,
    "height": 800,
    "context": "Vault v0.9.0 · offline live session · unfunded wallet · disposable USB",
    "alt": "The Save to menu offers Private Workspace and the mounted DEMOUSB drive.",
    "caption": "Choose external media for a backup that must survive shutdown. Private Workspace remains in RAM."
  },
  "vault-backup-complete": {
    "src": "/software/screenshots/vault/v0.9.0/backup-complete.webp",
    "fullSrc": "/software/screenshots/vault/v0.9.0/backup-complete.webp",
    "width": 1280,
    "height": 800,
    "context": "Vault v0.9.0 · offline live session · unfunded wallet · disposable USB",
    "alt": "Vault confirms that the encrypted wallet.dat.gpg backup was created and verified on DEMOUSB.",
    "caption": "Wait for the backup check to finish, then confirm the encrypted file is on the external drive."
  },
  "vault-address-before": {
    "src": "/software/screenshots/vault/v0.9.0/practice-address-detail.webp",
    "fullSrc": "/software/screenshots/vault/v0.9.0/practice-address.webp",
    "width": 471,
    "height": 117,
    "context": "Vault v0.9.0 · offline live session · unfunded wallet",
    "alt": "Payment information shows the original address, label Practice only - do not fund, and wallet name Practice Wallet.",
    "caption": "Before backup: Practice Wallet, with the label Practice only - do not fund. Record your own full address and label."
  },
  "vault-encrypt": {
    "src": "/software/screenshots/vault/v0.9.0/encrypt-wallet.webp",
    "fullSrc": "/software/screenshots/vault/v0.9.0/encrypt-wallet.webp",
    "width": 1280,
    "height": 800,
    "context": "Vault v0.9.0 · offline live session · unfunded wallet",
    "alt": "Bitcoin Core asks for the encryption passphrase and its confirmation for the disposable Practice Wallet.",
    "caption": "Keep the Core wallet passphrase separately from the encrypted backup and its GPG passphrase."
  },
  "vault-settings": {
    "src": "/software/screenshots/vault/v0.9.0/settings.webp",
    "fullSrc": "/software/screenshots/vault/v0.9.0/settings.webp",
    "width": 1280,
    "height": 800,
    "context": "Vault v0.9.0 · offline live session",
    "alt": "Vault Settings offers Display Settings, Keyboard and Mouse, Date and Time, and Backup and Restore.",
    "caption": "Open Settings → Backup and Restore to find wallet backup and recovery tools."
  },
  "vault-guide": {
    "src": "/software/screenshots/vault/v0.9.0/guide.webp",
    "fullSrc": "/software/screenshots/vault/v0.9.0/guide.webp",
    "width": 1280,
    "height": 800,
    "context": "Vault v0.9.0 · offline live session",
    "alt": "The built-in Vault Guide shows its navigation and instructions for using the offline wallet.",
    "caption": "Keep the guide open beside the wallet when practicing the offline workflow."
  },
  "vault-backup-restore": {
    "src": "/software/screenshots/vault/v0.9.0/backup-restore.webp",
    "fullSrc": "/software/screenshots/vault/v0.9.0/backup-restore.webp",
    "width": 1280,
    "height": 800,
    "context": "Vault v0.9.0 · offline live session",
    "alt": "Backup and Restore offers Wallet Backup, Decrypt Backup and Open Bitcoin Core.",
    "caption": "Create the encrypted backup, recover it into Private Workspace, then restore the recovered wallet in Core."
  },
  "vault-workspace": {
    "src": "/software/screenshots/vault/v0.9.0/private-workspace.webp",
    "fullSrc": "/software/screenshots/vault/v0.9.0/private-workspace.webp",
    "width": 1280,
    "height": 800,
    "context": "Vault v0.9.0 · offline live session",
    "alt": "Files opens the empty Private Workspace.",
    "caption": "Private Workspace is temporary. Keep the encrypted backup on a separate external medium before ending the session."
  },
  "vault-boot": {
    "src": "/software/screenshots/vault/v0.9.0/boot-menu.webp",
    "fullSrc": "/software/screenshots/vault/v0.9.0/boot-menu.webp",
    "width": 640,
    "height": 480,
    "context": "Vault v0.9.0 · BIOS boot menu",
    "alt": "Start Bitcoin Core Vault (Live RAM) is highlighted above Install Bitcoin Core Vault.",
    "caption": "Choose Start Bitcoin Core Vault (Live RAM). This is the BIOS menu from the published v0.9.0 image."
  },
  "node-home": {
    "src": "/software/screenshots/node/v0.1.0-rc.4/home.webp",
    "fullSrc": "/software/screenshots/node/v0.1.0-rc.4/home.webp",
    "width": 1280,
    "height": 800,
    "context": "Node v0.1.0-rc.4 · demonstration VM · network disconnected",
    "alt": "Node Home shows Bitcoin Core, Wallets, Private Workspace, Encrypt Files, Decrypt Files and utility tools.",
    "caption": "Open Bitcoin Core from Home. Private Workspace holds temporary files in RAM."
  },
  "node-settings": {
    "src": "/software/screenshots/node/v0.1.0-rc.4/settings.webp",
    "fullSrc": "/software/screenshots/node/v0.1.0-rc.4/settings.webp",
    "width": 1280,
    "height": 800,
    "context": "Node v0.1.0-rc.4 · demonstration VM · network disconnected",
    "alt": "Node Settings shows Backup and Restore, Network Connections, Bitcoin Core Status and device controls.",
    "caption": "Open Settings → Backup and Restore for backups, or Bitcoin Core Status to inspect validation and peers."
  },
  "node-guide": {
    "src": "/software/screenshots/node/v0.1.0-rc.4/guide.webp",
    "fullSrc": "/software/screenshots/node/v0.1.0-rc.4/guide.webp",
    "width": 1280,
    "height": 800,
    "context": "Node v0.1.0-rc.4 · demonstration VM · network disconnected",
    "alt": "Node Guide opens Start here: Node and Vault with steps to pair the public wallet, prepare a payment, sign offline and broadcast online.",
    "caption": "Keep Node Guide beside the wallet while learning the pairing and payment workflow."
  },
  "fingerprint": {
    src: "/software/screenshots/verification/signer-fingerprint.webp", width: 1192, height: 198,
    context: "Debian terminal · publisher key",
    alt: "GnuPG displays the full BTC Pavao signing-key fingerprint.",
    caption: "Identify the whole fingerprint through a separate channel before trusting the signed checksum list.",
  },
  "wrong-file": {
    src: "/software/screenshots/verification/vault-v060-rejected.webp", width: 1242, height: 384,
    context: "Historical Vault v0.6.0 · deliberately wrong test file",
    alt: "GnuPG accepts the manifest signature but the verifier reports different expected and computed hashes.",
    caption: "The signature passes. The selected file fails its own check, so stop before writing the USB.",
  },
  "vault-iso": {
    "src": "/software/screenshots/verification/current-20261126/vault-signed-verification.webp",
    "fullSrc": "/software/screenshots/verification/current-20261126/vault-signed-verification.webp",
    "width": 1280,
    "height": 422,
    "context": "Vault v0.9.0 · signed release verification",
    "alt": "GnuPG accepts the Vault v0.9.0 checksum-list signature from the required publisher fingerprint, and sha256sum reports OK for the published ISO.",
    "caption": "Vault v0.9.0: the manifest signature matches the publisher fingerprint, and the downloaded ISO matches its signed checksum. Confirm the fingerprint independently before trusting it."
  },
  "node-iso": {
    "src": "/software/screenshots/verification/current-20261126/node-signed-verification.webp",
    "fullSrc": "/software/screenshots/verification/current-20261126/node-signed-verification.webp",
    "width": 1280,
    "height": 422,
    "context": "Node v0.1.0-rc.4 · signed release verification",
    "alt": "GnuPG accepts the Node RC4 checksum-list signature from the required publisher fingerprint, and sha256sum reports OK for the published ISO.",
    "caption": "Node v0.1.0-rc.4: the manifest signature matches the publisher fingerprint, and the downloaded ISO matches its signed checksum. Confirm the fingerprint independently before trusting it."
  },
  "vault-isolation-console": {
    src: base + "vault-v0.6.0/stock-vault-isolation.webp", width: 1274, height: 337,
    context: "Archived Vault v0.6.0 · Bitcoin Core console",
    alt: "The console shows getnetworkinfo()[networkactive] returning false and getconnectioncount returning 0.",
    caption: "Run both checks in your own Vault session. The first shows whether Core networking is enabled. The second counts connected peers.",
  },
  "vault-home": {
    "src": "/software/screenshots/vault/v0.9.0/home.webp",
    "fullSrc": "/software/screenshots/vault/v0.9.0/home.webp",
    "width": 1280,
    "height": 800,
    "context": "Vault v0.9.0 · offline live session",
    "alt": "Vault Home shows Bitcoin Core, wallet backup and decryption, KeePassXC, Files and the built-in guide.",
    "caption": "Open Bitcoin Core from Home. Wallets and working files in the private session stay in RAM until shutdown."
  },
  "node-disk": {
    "src": "/software/screenshots/node/v0.1.0-rc.4/install-destination-selected.webp",
    "fullSrc": "/software/screenshots/node/v0.1.0-rc.4/install-destination-selected.webp",
    "width": 1280,
    "height": 800,
    "context": "Node v0.1.0-rc.4 · installer in a disposable offline VM",
    "alt": "The Node installer has Install to disk selected and shows the 128 GiB Practice SSD 128 as the destination.",
    "caption": "Match the destination by model and capacity. This example selects a disposable 128 GiB virtual disk; installation was not started."
  },
  "node-backup": {
    "src": "/software/screenshots/node/v0.1.0-rc.4/backup-restore.webp",
    "fullSrc": "/software/screenshots/node/v0.1.0-rc.4/backup-restore.webp",
    "width": 1280,
    "height": 800,
    "context": "Node v0.1.0-rc.4 · demonstration VM · network disconnected",
    "alt": "Node Backup and Restore offers blockchain, watch-only wallet, Bitcoin Core configuration and Node configuration categories.",
    "caption": "Open Settings → Backup and Restore. The screen notes that backup export has no read-back verification pass; restore checks remain enabled."
  },
  "vault-create": {
    "src": "/software/screenshots/vault/v0.9.0/create-wallet.webp",
    "fullSrc": "/software/screenshots/vault/v0.9.0/create-wallet.webp",
    "width": 1280,
    "height": 800,
    "context": "Vault v0.9.0 · offline live session · unfunded wallet",
    "alt": "Bitcoin Core’s Create Wallet dialog shows the name Practice Wallet and the Encrypt Wallet option.",
    "caption": "Choose a recognizable practice name and select Encrypt Wallet for a separate Core wallet passphrase. Leave this wallet unfunded."
  },
  "node-peers": {
    "src": "/software/screenshots/node/v0.1.0-rc.4/peers.webp",
    "fullSrc": "/software/screenshots/node/v0.1.0-rc.4/peers.webp",
    "width": 1280,
    "height": 800,
    "context": "Node v0.1.0-rc.4 · demonstration VM · network disconnected",
    "alt": "Bitcoin Core Status shows No peers connected, zero validated blocks, zero known headers and zero peers on mainnet.",
    "caption": "This isolated VM has no network adapter. Core is waiting for peers, with zero blocks and headers; this is not a synchronized node."
  },
  "vault-backup": {
    "src": "/software/screenshots/vault/v0.9.0/backup-destination-detail.webp",
    "fullSrc": "/software/screenshots/vault/v0.9.0/backup.webp",
    "width": 1240,
    "height": 200,
    "context": "Vault v0.9.0 · offline live session · unfunded wallet · disposable USB",
    "alt": "The backup destination detail selects DEMOUSB and shows /media/vault/DEMOUSB/wallet.dat.gpg.",
    "caption": "Vault v0.9.0 saves this encrypted backup to the drive named DEMOUSB. Identify your own external backup drive under Save to."
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
  "vault-usb-backup": {
    "src": "/software/screenshots/vault/v0.9.0/usb-backup.webp",
    "fullSrc": "/software/screenshots/vault/v0.9.0/usb-backup.webp",
    "width": 1280,
    "height": 800,
    "context": "Vault v0.9.0 · offline live session · unfunded wallet · disposable USB",
    "alt": "Files shows wallet.dat.gpg and watch-only.dat on the mounted DEMOUSB drive.",
    "caption": "This disposable demonstration drive contains both files. For your own setup, keep signing-wallet backups separate from the transfer drive."
  },
  "vault-restart": {
    "src": "/software/screenshots/vault/v0.9.0/after-restart-workspace.webp",
    "fullSrc": "/software/screenshots/vault/v0.9.0/after-restart-workspace.webp",
    "width": 1280,
    "height": 800,
    "context": "Vault v0.9.0 · fresh offline session after restart",
    "alt": "Private Workspace is empty after restarting the live Vault while the external DEMOUSB drive remains available.",
    "caption": "The actual restart cleared Private Workspace. The encrypted backup on the separate virtual USB survived."
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
    "src": "/software/screenshots/vault/v0.9.0/decrypt.webp",
    "fullSrc": "/software/screenshots/vault/v0.9.0/decrypt.webp",
    "width": 1280,
    "height": 1024,
    "context": "Vault v0.9.0 · fresh offline session after restart · external encrypted backup",
    "alt": "Decrypt Encrypted Backup selects Private Workspace and a new recovered-20261126-162817 folder for wallet.dat.gpg.",
    "caption": "Decrypt the external wallet.dat.gpg into Private Workspace. Keep the recovered file in the private RAM session."
  },
  "vault-recovered-ram": {
    "src": "/software/screenshots/vault/v0.9.0/recovered-ram.webp",
    "fullSrc": "/software/screenshots/vault/v0.9.0/recovered-ram.webp",
    "width": 1280,
    "height": 1024,
    "context": "Vault v0.9.0 · fresh offline session after restart",
    "alt": "Vault reports File recovered to RAM in Private Workspace/recovered-20261126-162817.",
    "caption": "The external GPG backup has been recovered into the fresh session. Restore the resulting wallet.dat in Bitcoin Core."
  },
  "vault-restored-file": {
    "src": "/software/screenshots/vault/v0.9.0/restored-file.webp",
    "fullSrc": "/software/screenshots/vault/v0.9.0/restored-file.webp",
    "width": 1280,
    "height": 1024,
    "context": "Vault v0.9.0 · fresh offline session after restart",
    "alt": "Files shows the recovered wallet.dat inside Private Workspace/recovered-20261126-162817.",
    "caption": "Select the recovered wallet.dat in Core’s File → Restore Wallet dialog."
  },
  "vault-watch-menu": {
    "src": "/software/screenshots/vault/v0.9.0/watch-menu.webp",
    "fullSrc": "/software/screenshots/vault/v0.9.0/watch-menu.webp",
    "width": 1280,
    "height": 800,
    "context": "Vault v0.9.0 · offline live session · unfunded wallet",
    "alt": "The File menu in Practice Wallet includes Export watch-only wallet.",
    "caption": "Select the signing wallet, then choose File → Export watch-only wallet to prepare its public copy."
  },
  "vault-watch-complete": {
    "src": "/software/screenshots/vault/v0.9.0/watch-complete.webp",
    "fullSrc": "/software/screenshots/vault/v0.9.0/watch-complete.webp",
    "width": 1280,
    "height": 800,
    "context": "Vault v0.9.0 · offline live session · unfunded wallet · disposable USB",
    "alt": "Core confirms that watch-only.dat was exported to /media/vault/DEMOUSB/watch-only.dat.",
    "caption": "Vault v0.9.0 exported watch-only.dat to DEMOUSB. Move only this public copy to Node; keep the signing wallet and its recovery backup offline."
  },
  "vault-watch-usb": {
    "src": "/software/screenshots/vault/v0.9.0/watch-usb.webp",
    "fullSrc": "/software/screenshots/vault/v0.9.0/watch-usb.webp",
    "width": 1280,
    "height": 800,
    "context": "Vault v0.9.0 · offline live session · unfunded wallet · disposable USB",
    "alt": "Files shows watch-only.dat on the mounted DEMOUSB drive.",
    "caption": "Check the public export’s filename and destination. This demonstration drive is named DEMOUSB."
  },
  "psbt-confirmed": {
    src: base + "confirmed-transaction.webp", width: 620, height: 250,
    context: "Bitcoin Core 32.1 · watch-only coordinator · Regtest",
    alt: "Transaction details show seven confirmations of the original 0.25 BTC test payment and its 282 sat fee.",
    caption: "Match the transaction ID with the broadcast screen. The test chain now has seven confirmations for this payment.",
  },
  "vault-restore-success": {
    "src": "/software/screenshots/vault/v0.9.0/restore-success.webp",
    "fullSrc": "/software/screenshots/vault/v0.9.0/restore-success.webp",
    "width": 1280,
    "height": 1024,
    "context": "Vault v0.9.0 · fresh offline session after restart",
    "alt": "Bitcoin Core reports that the wallet was restored successfully.",
    "caption": "Core accepted the recovered wallet file. Compare an address and label recorded before the backup."
  },
  "vault-restored-overview": {
    "src": "/software/screenshots/vault/v0.9.0/restored-overview.webp",
    "fullSrc": "/software/screenshots/vault/v0.9.0/restored-overview.webp",
    "width": 1280,
    "height": 1024,
    "context": "Vault v0.9.0 · fresh offline session after restart · unfunded wallet",
    "alt": "Bitcoin Core shows the restored wallet named Restored Practice with a zero BTC balance.",
    "caption": "The unfunded wallet reopened after the real restart and USB recovery. Its recorded address and label also matched."
  },
  "node-public-open": {
    "src": "/software/screenshots/node/v0.1.0-rc.4/public-open.webp",
    "fullSrc": "/software/screenshots/node/v0.1.0-rc.4/public-open.webp",
    "width": 1280,
    "height": 800,
    "context": "Node v0.1.0-rc.4 · demonstration VM · network disconnected · unfunded watch-only wallet",
    "alt": "Load Wallet Backup selects watch-only.dat on the NODECAPTURE transfer drive.",
    "caption": "On Node, select the public watch-only.dat supplied by Vault. This demonstration drive is named NODECAPTURE."
  },
  "node-public-name": {
    "src": "/software/screenshots/node/v0.1.0-rc.4/public-name.webp",
    "fullSrc": "/software/screenshots/node/v0.1.0-rc.4/public-name.webp",
    "width": 1280,
    "height": 800,
    "context": "Node v0.1.0-rc.4 · demonstration VM · network disconnected · unfunded watch-only wallet",
    "alt": "The Restore Wallet dialog contains the local wallet name PracticeWatchOnly.",
    "caption": "Give the imported public wallet a recognizable local name. This example uses PracticeWatchOnly."
  },
  "node-public-proof": {
    "src": "/software/screenshots/node/v0.1.0-rc.4/public-proof-detail.webp",
    "fullSrc": "/software/screenshots/node/v0.1.0-rc.4/public-proof.webp",
    "width": 710,
    "height": 365,
    "context": "Node v0.1.0-rc.4 · demonstration VM · network disconnected · same public export from Vault v0.9.0",
    "alt": "Core’s getwalletinfo result shows walletname PracticeWatchOnly, private_keys_enabled false, descriptors true and zero transactions.",
    "caption": "The actual public copy exported by Vault v0.9.0 opens as PracticeWatchOnly with private keys disabled. The VM is offline and the wallet is unfunded."
  },
}

export type PracticeCapture = {
  src: string
  fullSrc?: string
  width: number
  height: number
  context: string
  alt: string
  caption: string
}

export const captures: { [K in keyof typeof captureData]: PracticeCapture } = captureData

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
    "debian-datadir": ["vault-backup-complete", "vault-usb-backup"],
    "coldboot": ["vault-restart", "vault-recovered-ram", "vault-restore-success"],
    "isolate": ["vault-isolation-console"],
  },
  "ibd-does-not-block-wallet-learning": {
    "overview": ["node-peers"],
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
    "keepass-bundled-v41": [],
  },
  "malware-usb-and-destination-verification": {
    "media": ["vault-watch-usb"],
  },
}

export function capturesFor(slug: string, step = "overview") {
  return (capturePlacements[slug]?.[step] ?? []).map(key => captures[key])
}
