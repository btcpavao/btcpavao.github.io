// Keep old bookmarks working without maintaining a second curriculum.
export const retiredCurriculumPath = "/hr/bitcoin-core/self-custody/"
export const englishCurriculumPath = "/en/bitcoin-core/self-custody/"
export const retiredLessonSlugs = {
  "sto-self-custody-stvarno-znaci": "what-self-custody-really-means",
  "threat-model-prije-alata": "threat-model-before-tools",
  "core-kao-alat-ne-kao-identitet": "core-as-a-tool-not-an-identity",
  "prvo-nauci-s-bitcoinima-bez-vrijednosti":
    "learn-first-with-valueless-bitcoin",
  "mainnet-vs-signet": "mainnet-vs-signet",
  "sigurnost-je-proces": "security-is-a-process",
  "sto-je-bitcoin-core": "what-is-bitcoin-core",
  "tvoj-node-je-prije-svega-vazan-tebi": "your-node-matters-first-to-you",
  "battle-tested-ne-znaci-bez-bugova": "battle-tested-does-not-mean-bug-free",
  "sparrow-flow-i-sigurnosne-pretpostavke":
    "sparrow-workflow-and-security-assumptions",
  "electrum-flow-i-sigurnosne-pretpostavke":
    "electrum-workflow-and-security-assumptions",
  "hardware-wallet-kao-tradeoff": "hardware-wallet-as-a-tradeoff",
  "bip39-kriptografija-i-backup-model": "bip39-cryptography-and-backup-model",
  "instaliraj-i-provjeri-bitcoin-core": "install-and-verify-bitcoin-core",
  "pokretanje-bitcoin-corea-na-signetu": "start-bitcoin-core-on-signet",
  "prvi-signet-wallet-i-adresa": "first-signet-wallet-and-address",
  "enkriptiraj-signet-wallet-i-napravi-novi-backup":
    "encrypt-signet-wallet-and-create-new-backup",
  "prvi-receive-i-send-na-signetu": "first-signet-receive-and-send",
  "backup-unisti-testno-okruzenje-i-restore":
    "back-up-remove-test-wallet-and-restore",
  "ponovno-poslaji-nakon-signet-recoveryja": "send-again-after-signet-recovery",
  "mainnet-readiness-signet-checkpoint": "mainnet-readiness-signet-checkpoint",
  "odakle-dolazi-privatni-kljuc": "where-the-private-key-comes-from",
  "node-wallet-i-blockchain-nisu-ista-stvar":
    "node-wallet-and-blockchain-are-not-the-same",
  "ibd-nije-prepreka-za-ucenje-walleta": "ibd-does-not-block-wallet-learning",
  "full-vs-pruned-node": "full-vs-pruned-node",
  "core-nije-ili-server-ili-beskoristan":
    "core-is-neither-a-server-nor-useless",
  "wallet-backup-vs-node-podaci": "wallet-backup-vs-node-data",
  "migracija-node-podataka-ili-nova-validacija":
    "migrate-node-data-or-validate-from-scratch",
  "jednostavni-wallet-ili-offline-signer": "simple-wallet-or-offline-signer",
  "online-node-i-offline-signer": "online-node-and-offline-signer",
  "odabir-racunala-i-malware-threat-model":
    "choose-a-computer-and-model-malware-risk",
  "malware-usb-i-provjera-odredista":
    "malware-usb-and-destination-verification",
  "fizicka-sigurnost-i-backup-mediji": "physical-security-and-backup-media",
  "priprema-offline-signera": "prepare-offline-signer",
  "prva-offline-potpisana-transakcija": "first-offline-signed-transaction",
  "recovery-drill-bez-originalnog-koordinatora":
    "recovery-drill-without-original-coordinator",
  "dokumentiraj-proceduru-bez-otkrivanja-tajni":
    "document-the-procedure-without-exposing-secrets",
  "izborno-tails-offline-okruzenje": "optional-tails-offline-environment",
  "path-a-online-encrypted-core-wallet": "path-a-online-encrypted-core-wallet",
  "zasto-signer-ne-treba-blockchain":
    "why-the-signer-does-not-need-the-blockchain",
  "hot-watch-only-i-signing-wallet": "hot-watch-only-and-signing-wallet",
  "ne-pretvaraj-signet-wallet-u-mainnet-wallet":
    "do-not-turn-signet-wallet-into-mainnet-wallet",
  "enkripcija-i-passphrase": "encryption-and-passphrase",
  "vise-kopija-nije-isto-sto-i-noviji-backup":
    "more-copies-do-not-mean-a-current-backup",
  "digitalni-i-cloud-backup-privacy-model":
    "digital-and-cloud-backup-privacy-model",
  "restore-na-cistom-testnom-okruzenju": "restore-in-a-clean-test-environment",
  "mainnet-readiness-prije-prvog-deposita":
    "mainnet-readiness-before-first-deposit",
  "prvi-mali-mainnet-test": "first-small-mainnet-test",
  "redovni-testovi-i-godisnji-recovery-drill":
    "regular-tests-and-annual-recovery-drill",
  "inheritance-i-drugi-ljudi": "inheritance-and-other-people",
  "zasto-i-kada-ne-multisig": "why-multisig-and-when-not-to-use-it",
  "2-of-3-na-signetu": "2-of-3-on-signet",
  "kljucevi-nisu-cijeli-multisig-recovery":
    "keys-are-not-the-whole-multisig-recovery",
  "failure-simulacije": "failure-simulations",
  "taproot-mentalni-model": "taproot-mental-model",
  "taproot-descriptori-i-recovery-artefakti":
    "taproot-descriptors-and-recovery-artifacts",
  "complex-wallet-simple-recovery": "complex-wallet-simple-recovery",
  "testiranje-svakog-recovery-patha": "test-every-recovery-path",
  "kako-voditi-self-custody-eksperiment":
    "how-to-run-a-self-custody-experiment",
  "rpc-i-cli": "rpc-and-cli",
  "descriptor-eksperimenti": "descriptor-experiments",
  "psbt-debugging": "psbt-debugging",
  "regtest-i-failure-scenariji": "regtest-and-failure-scenarios",
  "community-pitanja-i-clarifications":
    "community-questions-and-clarifications",
}

export function englishCurriculumDestination(search = "", hash = "") {
  const match = hash.match(/^#lesson\/(.+)$/)
  if (match) {
    try {
      const slug = decodeURIComponent(match[1])
      hash = "#lesson/" + encodeURIComponent(retiredLessonSlugs[slug] ?? slug)
    } catch {
      // Preserve a malformed bookmark so the English player can show its fallback.
    }
  }
  return englishCurriculumPath + search + hash
}
