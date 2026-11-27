const base = "/software/screenshots/curriculum/"

const captureData = {
  "node-signet-confirmed": {
    "src": "/software/screenshots/node/v0.1.0-rc.4/signet/confirmed-detail.webp",
    "fullSrc": "/software/screenshots/node/v0.1.0-rc.4/signet/confirmed.webp",
    "width": 845,
    "height": 118,
    "context": "Node v0.1.0-rc.4 · public Signet",
    "alt": "Signet Watch reports one confirmation and block height 332687 for this payment.",
    "caption": "The watch-only wallet found the payment in Signet block 332687. The confirmation count increases as new blocks arrive."
  },
  "node-signet-confirmed-details": {
    "src": "/software/screenshots/node/v0.1.0-rc.4/signet/confirmed-details-detail.webp",
    "fullSrc": "/software/screenshots/node/v0.1.0-rc.4/signet/confirmed-details.webp",
    "width": 654,
    "height": 188,
    "context": "Node v0.1.0-rc.4 · public Signet",
    "alt": "The transaction details show 1/unconfirmed, a 3,000 sat debit, a 141 sat fee, and the same transaction ID.",
    "caption": "At one confirmation this version’s Details window displayed “1/unconfirmed.” Use the wallet console to check the confirmation count and block height for the same ID."
  },
  "node-signet-broadcast": {
    "src": "/software/screenshots/node/v0.1.0-rc.4/signet/broadcast-detail.webp",
    "fullSrc": "/software/screenshots/node/v0.1.0-rc.4/signet/broadcast.webp",
    "width": 904,
    "height": 136,
    "context": "Node v0.1.0-rc.4 · public Signet",
    "alt": "The online Node reports Transaction broadcast successfully and shows the transaction ID.",
    "caption": "Record the ID after Broadcast Tx. The first block confirmation appears separately in Transactions."
  },
  "node-signet-ready": {
    "src": "/software/screenshots/node/v0.1.0-rc.4/signet/ready-detail.webp",
    "fullSrc": "/software/screenshots/node/v0.1.0-rc.4/signet/ready.webp",
    "width": 742,
    "height": 127,
    "context": "Node v0.1.0-rc.4 · public Signet",
    "alt": "The watch-only Node displays Transaction is fully signed and ready for broadcast.",
    "caption": "Check the payment once more. Broadcast Tx is now available in the online watch-only wallet."
  },
  "node-signet-return-file": {
    "src": "/software/screenshots/node/v0.1.0-rc.4/signet/return-file-detail.webp",
    "fullSrc": "/software/screenshots/node/v0.1.0-rc.4/signet/return-file.webp",
    "width": 558,
    "height": 108,
    "context": "Node v0.1.0-rc.4 · public Signet",
    "alt": "Load Transaction Data lists both payment-signed.psbt and payment-unsigned.psbt with the signed file selected.",
    "caption": "On Node, select payment-signed.psbt. Both files can be on the same drive."
  },
  "vault-signet-saved": {
    "src": "/software/screenshots/vault/v0.9.0/signet/saved-detail.webp",
    "fullSrc": "/software/screenshots/vault/v0.9.0/signet/saved.webp",
    "width": 725,
    "height": 128,
    "context": "Vault v0.9.0 · public Signet",
    "alt": "PSBT Operations reports PSBT saved to disk.",
    "caption": "The save confirmation appears after writing payment-signed.psbt. Eject the transfer drive before moving it."
  },
  "vault-signet-signed": {
    "src": "/software/screenshots/vault/v0.9.0/signet/signed-detail.webp",
    "fullSrc": "/software/screenshots/vault/v0.9.0/signet/signed.webp",
    "width": 725,
    "height": 128,
    "context": "Vault v0.9.0 · public Signet",
    "alt": "The green status reads Signed transaction successfully. Transaction is ready to broadcast.",
    "caption": "After Sign Tx and the Core wallet passphrase, this message confirms the offline signature. Choose Save to take the signed file back to Node."
  },
  "vault-signet-review": {
    "src": "/software/screenshots/vault/v0.9.0/signet/review-detail.webp",
    "fullSrc": "/software/screenshots/vault/v0.9.0/signet/review.webp",
    "width": 725,
    "height": 156,
    "context": "Vault v0.9.0 · public Signet",
    "alt": "PSBT Operations reports one unsigned input and lists the recipient, the change marked own address, and the fee.",
    "caption": "On Vault, 3,000 sats go to the recipient and 4,859 sats return as change. Total Amount adds the two outputs to get 7,859 sats. With the 141 sat fee, that accounts for all 8,000 sats."
  },
  "node-signet-save-unsigned": {
    "src": "/software/screenshots/node/v0.1.0-rc.4/signet/save-unsigned-detail.webp",
    "fullSrc": "/software/screenshots/node/v0.1.0-rc.4/signet/save-unsigned.webp",
    "width": 700,
    "height": 453,
    "context": "Node v0.1.0-rc.4 · public Signet",
    "alt": "Save Transaction Data shows payment-unsigned.psbt on the selected transfer USB.",
    "caption": "Select your transfer USB and save payment-unsigned.psbt. If ejecting reports that the drive is busy, exit Bitcoin Core, then eject again."
  },
  "node-signet-unsigned": {
    "src": "/software/screenshots/node/v0.1.0-rc.4/signet/unsigned-detail.webp",
    "fullSrc": "/software/screenshots/node/v0.1.0-rc.4/signet/unsigned.webp",
    "width": 216,
    "height": 176,
    "context": "Node v0.1.0-rc.4 · public Signet",
    "alt": "Unsigned Transaction says the PSBT was copied to the clipboard and offers Save and Discard.",
    "caption": "Choose Save to open the file dialog. The clipboard message alone does not put a file on the USB."
  },
  "node-signet-proposal-review": {
    "src": "/software/screenshots/node/v0.1.0-rc.4/signet/proposal-review-detail.webp",
    "fullSrc": "/software/screenshots/node/v0.1.0-rc.4/signet/proposal-review.webp",
    "width": 521,
    "height": 309,
    "context": "Node v0.1.0-rc.4 · public Signet",
    "alt": "Confirm send coins lists 3,000 sats for the recipient and a 141 sat fee, totaling 3,141 sats.",
    "caption": "Review the recipient and fee, then click Create Unsigned again. Here 3,141 sats will leave the wallet."
  },
  "node-signet-send": {
    "src": "/software/screenshots/node/v0.1.0-rc.4/signet/send.webp",
    "fullSrc": "/software/screenshots/node/v0.1.0-rc.4/signet/send.webp",
    "width": 1280,
    "height": 800,
    "context": "Node v0.1.0-rc.4 · public Signet",
    "alt": "The Send tab shows the test recipient, 0.00003000 BTC, the custom fee rate, and Create Unsigned.",
    "caption": "Enter your own test recipient in Pay To. This Node had no fee estimate yet. Under Transaction Fee, Choose opened the Custom rate. The example uses 0.00001000 BTC per kilobyte, or 1 sat/vB."
  },
  "node-signet-watch-proof": {
    "src": "/software/screenshots/node/v0.1.0-rc.4/signet/watch-proof-detail.webp",
    "fullSrc": "/software/screenshots/node/v0.1.0-rc.4/signet/watch-proof.webp",
    "width": 701,
    "height": 158,
    "context": "Node v0.1.0-rc.4 · public Signet",
    "alt": "Signet Watch reports false for private_keys_enabled and true for ismine on the funded address.",
    "caption": "Node recognizes the receiving address with private keys disabled. Check the same full address in the signing wallet on Vault."
  },
  "node-signet-funded": {
    "src": "/software/screenshots/node/v0.1.0-rc.4/signet/funded-detail.webp",
    "fullSrc": "/software/screenshots/node/v0.1.0-rc.4/signet/funded.webp",
    "width": 1278,
    "height": 432,
    "context": "Node v0.1.0-rc.4 · public Signet",
    "alt": "Wallet restored successfully appears over Signet Watch with an available balance of 0.00008000 BTC.",
    "caption": "After the scan, Node found the 8,000 test sats sent to the address recorded on Vault. An unfunded wallet will still show zero."
  },
  "node-signet-restore-name": {
    "src": "/software/screenshots/node/v0.1.0-rc.4/signet/restore-name-detail.webp",
    "fullSrc": "/software/screenshots/node/v0.1.0-rc.4/signet/restore-name.webp",
    "width": 223,
    "height": 137,
    "context": "Node v0.1.0-rc.4 · public Signet",
    "alt": "Restore Wallet asks for a Wallet Name. This run uses Signet Watch.",
    "caption": "Give the public wallet a name you will recognize on the online Node. Here it is Signet Watch."
  },
  "node-signet-restore-file": {
    "src": "/software/screenshots/node/v0.1.0-rc.4/signet/restore-file-detail.webp",
    "fullSrc": "/software/screenshots/node/v0.1.0-rc.4/signet/restore-file.webp",
    "width": 700,
    "height": 453,
    "context": "Node v0.1.0-rc.4 · public Signet",
    "alt": "Load Wallet Backup shows watch-only.dat selected on the SIGNETUSB transfer drive.",
    "caption": "Choose the transfer drive in the left sidebar, select watch-only.dat, and click Open. The bracketed identifier after the drive label can differ."
  },
  "node-signet-network": {
    "src": "/software/screenshots/node/v0.1.0-rc.4/signet/network-detail.webp",
    "fullSrc": "/software/screenshots/node/v0.1.0-rc.4/signet/network.webp",
    "width": 641,
    "height": 336,
    "context": "Node v0.1.0-rc.4 · public Signet",
    "alt": "Bitcoin Core 32.1 lists signet, seven outbound connections, and block height 332686.",
    "caption": "On Node, open Window → Information. Name is signet and the seven outbound connections are Bitcoin peers. The offline Vault shows zero connections."
  },
  "vault-signet-address-proof": {
    "src": "/software/screenshots/vault/v0.9.0/signet/address-proof-detail.webp",
    "fullSrc": "/software/screenshots/vault/v0.9.0/signet/address-proof.webp",
    "width": 646,
    "height": 91,
    "context": "Vault v0.9.0 · public Signet",
    "alt": "The Signet Signer wallet returns true for ismine when given the full practice address.",
    "caption": "Use the same address on both machines. Here Signet Signer recognizes the address that received the test coins."
  },
  "vault-signet-exported": {
    "src": "/software/screenshots/vault/v0.9.0/signet/exported-detail.webp",
    "fullSrc": "/software/screenshots/vault/v0.9.0/signet/exported.webp",
    "width": 539,
    "height": 142,
    "context": "Vault v0.9.0 · public Signet",
    "alt": "The Export Successful dialog identifies watch-only.dat on SIGNETUSB.",
    "caption": "Check the destination in Export Successful before you eject the USB and take it to Node."
  },
  "vault-signet-metadata": {
    "src": "/software/screenshots/vault/v0.9.0/signet/metadata-detail.webp",
    "fullSrc": "/software/screenshots/vault/v0.9.0/signet/metadata.webp",
    "width": 340,
    "height": 442,
    "context": "Vault v0.9.0 · public Signet",
    "alt": "Export wallet metadata? offers Export wallet or Cancel.",
    "caption": "This wallet already had an address-book entry. Core asks whether to include its metadata. Choose Export wallet to continue."
  },
  "vault-signet-export-file": {
    "src": "/software/screenshots/vault/v0.9.0/signet/export-file-detail.webp",
    "fullSrc": "/software/screenshots/vault/v0.9.0/signet/export-file.webp",
    "width": 1280,
    "height": 84,
    "context": "Vault v0.9.0 · public Signet",
    "alt": "The Save Watch-only Wallet Export dialog has watch-only.dat in the File name field.",
    "caption": "Select your transfer USB in the sidebar. Save the public export as watch-only.dat. SIGNETUSB is the drive name in this exercise."
  },
  "vault-signet-export-menu": {
    "src": "/software/screenshots/vault/v0.9.0/signet/export-menu-detail.webp",
    "fullSrc": "/software/screenshots/vault/v0.9.0/signet/export-menu.webp",
    "width": 290,
    "height": 352,
    "context": "Vault v0.9.0 · public Signet",
    "alt": "The File menu of Signet Signer shows Export watch-only wallet.",
    "caption": "With Signet Signer selected, open File and choose Export watch-only wallet."
  },
  "vault-signet-offline-chain": {
    "src": "/software/screenshots/vault/v0.9.0/signet/offline-chain-detail.webp",
    "fullSrc": "/software/screenshots/vault/v0.9.0/signet/offline-chain.webp",
    "width": 578,
    "height": 160,
    "context": "Vault v0.9.0 · public Signet",
    "alt": "Vault's console returns signet, false for networkactive, and 0 connections.",
    "caption": "Run these three commands on Vault before creating the signing wallet. It can sign a Signet payment with networking disabled."
  },
  "node-revision": {
    "src": "/software/screenshots/verification/current-20261126/node-rc4-source-detail.webp",
    "fullSrc": "/software/screenshots/verification/current-20261126/node-rc4-source.webp",
    "width": 791,
    "height": 171,
    "context": "Node v0.1.0-rc.4 · signed release records in a Debian terminal",
    "alt": "The terminal verifies the signature on the RC4 checksum list, reports SOURCE-COMMIT.txt: OK, and prints source revision 8eae47cb3c2c67c7365dcfcc25af44cd5048baf3.",
    "caption": "After checking the signature and the checksum of SOURCE-COMMIT.txt, read the full revision recorded in that file. It identifies the source used for RC4."
  },
  "vault-malware-warning": {
    "src": "/software/screenshots/vault/v0.9.0/encryption-malware-warning-detail.webp",
    "fullSrc": "/software/screenshots/vault/v0.9.0/encryption-malware-warning.webp",
    "width": 500,
    "height": 133,
    "context": "Vault v0.9.0 · unfunded wallet creation",
    "alt": "Wallet to be encrypted warns that encryption cannot fully protect against malware and offers Yes and Cancel.",
    "caption": "Choose Yes to encrypt the empty practice wallet on your offline computer."
  },
  "vault-loss-warning": {
    "src": "/software/screenshots/vault/v0.9.0/encryption-loss-warning-detail.webp",
    "fullSrc": "/software/screenshots/vault/v0.9.0/encryption-loss-warning.webp",
    "width": 500,
    "height": 133,
    "context": "Vault v0.9.0 · unfunded wallet creation",
    "alt": "Confirm wallet encryption warns that losing the passphrase means losing access to the bitcoin. Its buttons are Continue and Back.",
    "caption": "Check that you can recover your Core passphrase, then choose Continue."
  },
  "vault-wallet-name": {
    "src": "/software/screenshots/vault/v0.9.0/wallet-name-detail.webp",
    "fullSrc": "/software/screenshots/vault/v0.9.0/wallet-name.webp",
    "width": 480,
    "height": 257,
    "context": "Vault v0.9.0 · empty practice wallet",
    "alt": "Create Wallet shows Practice Wallet in the Wallet Name field. Encrypt Wallet and the advanced options are unchecked.",
    "caption": "Enter a local practice name. The next step selects Encrypt Wallet before you click Create."
  },
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
    "src": "/software/screenshots/verification/current-20261126/vault-publisher-key-detail.webp",
    "fullSrc": "/software/screenshots/verification/current-20261126/vault-publisher-key.webp",
    "width": 715,
    "height": 69,
    "context": "Vault v0.9.0 · release verification in a Debian terminal",
    "alt": "GnuPG displays the public key for btcpavao and its full fingerprint ending in 5788 96D0.",
    "caption": "Compare all 40 characters of the signing-key fingerprint with a copy obtained through a separate trusted channel."
  },
  "wrong-file": {
    "src": "/software/screenshots/verification/current-20261126/vault-wrong-file-detail.webp",
    "fullSrc": "/software/screenshots/verification/current-20261126/vault-wrong-file.webp",
    "width": 791,
    "height": 153,
    "context": "Vault v0.9.0 · deliberately incorrect test file",
    "alt": "GnuPG reports a good signature from btcpavao. The SHA-256 check for bitcoin-core-vault-v0.9.0-amd64.iso reports FAILED.",
    "caption": "The signature on the list passed. The file given the Vault ISO name failed its checksum. Stop before writing it to a USB drive."
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
    src: "/software/screenshots/vault/v0.9.0/isolation-console-detail.webp",
    fullSrc: "/software/screenshots/vault/v0.9.0/isolation-console.webp",
    width: 356, height: 144,
    context: "Vault v0.9.0 · Bitcoin Core console",
    alt: "The console shows getnetworkinfo()[networkactive] returning false, getconnectioncount returning 0, and getblockchaininfo()[chain] returning main.",
    caption: "In this live session, Core networking was disabled (false), the peer count was 0, and the selected chain was main.",
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
    "debian-preparation": ["vault-boot", "vault-home"],
    "wallet": ["vault-create", "vault-backup"],
    "debian-datadir": ["vault-workspace", "vault-backup-destinations"],
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
    "backup": ["vault-backup", "vault-backup-complete", "vault-usb-backup"],
  },
  "first-offline-signed-transaction": {
    "review": ["vault-signet-review"],
    "proposal": ["node-signet-send", "node-signet-proposal-review", "node-signet-unsigned", "node-signet-save-unsigned"],
    "sign": ["vault-signet-signed", "vault-signet-saved"],
    "broadcast": ["node-signet-return-file", "node-signet-ready", "node-signet-broadcast", "node-signet-confirmed-details", "node-signet-confirmed"],
  },
  "psbt-debugging": {
    "decode-v4": ["psbt-review", "psbt-decode"],
  },
  "start-bitcoin-core-on-signet": {
    "launch-v4": ["vault-signet-offline-chain"],
    "inspect-gui-v4": ["node-signet-network"],
  },
  "watch-only-setup": {
    "watchonly-gui-v4": ["node-signet-restore-file", "node-signet-restore-name", "node-signet-funded"],
    "address": ["vault-signet-address-proof"],
    "export": ["vault-signet-export-menu", "vault-signet-export-file", "vault-signet-metadata", "vault-signet-exported"],
    "import": ["node-signet-watch-proof"],
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
