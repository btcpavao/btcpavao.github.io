# Self-custody curriculum v2.3

This revision implements the September 9, 2026 curriculum audit in both English and Croatian. It keeps all 63 lesson IDs and language-specific slugs, including existing English aliases, while grouping them into six phases. Repeated introductory theory and advanced experiments remain accessible as optional reading.

## Learner-facing changes

- A shorter overview and current-phase navigation; optional lessons and full outline are available on request.
- One practical action at a time, with its expected result, immediate safety condition, contextual commands and expandable troubleshooting.
- Explicit reading, practice and checkpoint states. Completion is a local learner declaration, not verification of the wallet.
- Required drafts stop guided Next/Resume. Checkpoints require completed practical prerequisites, including recovery and a second transaction.
- Old reading marks survive. Previous practical checklists do not count toward the new results; learners reconfirm those exercises.
- Sources, historical review metadata and supporting theory are collapsed. Reusable tutorial metadata remains on the overview inside details. Missing videos have no placeholder. Support remains on the overview.

## Content changes

The Signet route now describes download verification, GUI/console context, wallet creation, four-step encryption/backup, receiving/sending, a reversible restore under a new name and spending from the restored wallet. Closing the original test wallet replaces mandatory deletion or ambiguous directory moves.

The offline route explicitly covers hardware compatibility, media roles, Tails Offline Mode, creating and unlocking Persistent Storage, an explicit persistent Core data directory, cold-boot verification, public descriptors for receive/change, a private-key-disabled coordinator, address verification, unsigned PSBT creation, offline output/fee review, signing, finalization/broadcast and recovery without the original system USB or coordinator.

The mainnet route requires a completed Signet rehearsal and independent offline recovery. New keys/passwords/backups stay separate from test material. Empty-wallet recovery and password checks happen before the first limited deposit. A confirmed spend from the restored signer remains the later operational proof. Password changes do not revoke stolen keys or update old backup files. Pruned historical-block requirements and separate coordinator metadata backups are clarified.

## Validation and remaining publication work

Run from `btcpavao-github-io`:

```sh
npm ci
npm run lint
npm run verify:curriculum
npm run build
npm run verify:assets
```

The curriculum checks cover bilingual structure, all lesson identities, prerequisite order, migration of progress, every required result, draft blocking, Next/Resume behavior and transitive invalidation of completion. The production build prerenders the existing public routes. Existing asset/metadata checks remain unchanged.

These checks do not run Bitcoin Core, boot Tails or submit transactions. No original draft has been promoted to published/verified. Existing technical-review dates remain historical; new format/content version 2.3 does not imply a fresh operating-system test. Before publishing the expanded practical drafts, reproduce:

1. Signet receive/send, restore and send-again on the stated Core version, recording GUI behavior and transaction IDs.
2. Tails/Core startup on supported physical hardware; verify the required binary libraries, explicit persistent directory, full shutdown/reboot and independent backup restore.
3. Public receive/change descriptor import, address matching, offline PSBT review/signing and online broadcast, then replace both roles and repeat.
4. New mainnet artifacts, empty-wallet offline restore and password recovery, followed by the limited deposit/spend procedure on the actual maintained setup.
5. Keyboard, mobile and beginner usability through the complete revised player. Automated browser interaction and physical-device usability were not performed for this edit.

Use a real reproduction record to update a lesson's status and review date. The official Core offline tutorial on the v31.1 tag still mentions v25.0 and contains a CLI finalization inconsistency; the revised GUI signing/broadcast sequence is cross-checked with the v31.1 Qt source and still requires practical reproduction.
