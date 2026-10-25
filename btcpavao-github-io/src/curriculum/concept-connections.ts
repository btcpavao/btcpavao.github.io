// Stable IDs connect the reasoning to retained operational lessons without moving
// or rewriting their tested procedures. These links are exposed in Open Curriculum.
export const conceptConnections: Record<string, string[]> = {
  "learn-from-first-principles": ["0.1", "foundations-checkpoint"],
  "bitcoin-is-information": ["1.4", "2.6"],
  "one-file-can-disappear": ["signet-restore", "backup-mastery"],
  "independent-copies": ["backup-redundancy-freshness", "backup-media"],
  "copies-and-theft": ["encrypted-backup-privacy", "optional-veracrypt"],
  "file-and-secret": ["signet-encrypt-new-backup", "optional-veracrypt"],
  "backup-every-secret": ["generate-passphrase", "recovery-failure-drills"],
  "separate-recovery-components": ["ops-documentation", "ops-inheritance"],
  "privacy-of-artifacts": ["encrypted-backup-privacy", "watch-only-setup"],
  "attack-cost-and-payoff": ["brute-force-economics", "custody-economics"],
  "predictable-human-passwords": ["passphrase-strength", "generate-passphrase"],
  "count-random-choices": ["passphrase-strength", "generate-passphrase"],
  "enough-entropy": ["brute-force-economics", "generate-passphrase"],
  "encrypt-an-encrypted-file": ["optional-veracrypt"],
  "layers-need-recovery": ["optional-veracrypt", "recovery-failure-drills"],
  "sequential-layer-attacks": ["optional-veracrypt", "brute-force-economics"],
  "privacy-and-deterrence": ["0.2", "encrypted-backup-privacy"],
  "theft-collusion-coercion": ["ops-physical", "ops-documentation"],
  "distance-as-friction": ["backup-redundancy-freshness", "ops-inheritance"],
  "cost-of-components": ["0.3", "complexity-after-the-lab"],
  "gold-and-digital-scale": ["custody-economics"],
  "target-concentration": ["1.1", "real-device"],
  "before-chip-security": ["1.1", "trust-and-verification"],
  "dedicated-environment": ["start-clean", "debian-setup", "offline-device"],
  "vault-memory-and-backups": [
    "offline-device",
    "optional-veracrypt",
    "offline-recovery",
  ],
  "core-trust-evidence": ["what-verification-proves", "signet-install-verify"],
  "validate-without-querying-wallet-service": ["own-node", "watch-only-setup"],
  "validation-cost-and-friction": ["ibd-separation", "2.3", "node-migration"],
  "access-versus-authorization": [
    "multisig-why",
    "multisig-signet",
    "multisig-backup",
  ],
  "connect-reasoning-to-practice": [
    "signet-first-wallet",
    "offline-psbt",
    "offline-recovery",
  ],
}
export function relatedConceptIds(id: string) {
  return (
    conceptConnections[id] ??
    Object.entries(conceptConnections)
      .filter(([, ids]) => ids.includes(id))
      .map(([concept]) => concept)
  )
}
