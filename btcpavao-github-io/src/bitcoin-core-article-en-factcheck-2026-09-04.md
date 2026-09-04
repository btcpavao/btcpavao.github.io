# Bitcoin Core entropy article fact-check, 2026-09-04

Scope: claim-by-claim technical review of the wallet-creation and entropy path described in the English article, with the Croatian translation checked against the same implementation. Reference version: Bitcoin Core 31.1.

Overall confidence: high.

| Claim cluster | Primary source checked | Result | Support |
| --- | --- | --- | --- |
| Bitcoin Core 31.1 is the reference release | [31.1 release notes](https://github.com/bitcoin/bitcoin/blob/v31.1/doc/release-notes/release-notes-31.1.md) | Confirmed | Direct |
| Newly created wallets are descriptor wallets; `createwallet` no longer accepts `descriptors=false` | [`src/wallet/rpc/wallet.cpp`](https://github.com/bitcoin/bitcoin/blob/v31.1/src/wallet/rpc/wallet.cpp#L346-L429) and [`src/wallet/wallet.cpp`](https://github.com/bitcoin/bitcoin/blob/v31.1/src/wallet/wallet.cpp#L377-L467) | Confirmed | Direct |
| A normal wallet with private keys enabled follows the internal descriptor setup path, while blank, private-key-disabled, and external-signer wallets follow different paths | [`src/wallet/wallet.cpp`](https://github.com/bitcoin/bitcoin/blob/v31.1/src/wallet/wallet.cpp#L3069-L3131) | Confirmed | Direct |
| The wallet creates a random seed key, verifies its public key, and passes the 32-byte key material into BIP32 `SetSeed` | [`src/wallet/wallet.cpp`](https://github.com/bitcoin/bitcoin/blob/v31.1/src/wallet/wallet.cpp#L3594-L3618) and [`src/key.cpp`](https://github.com/bitcoin/bitcoin/blob/v31.1/src/key.cpp#L475-L496) | Confirmed | Direct |
| Strong random bytes mix fresh OS randomness with Core's existing RNG state and other inputs; startup seeding also includes hardware randomness when available, environment data, and a 100 ms strengthening step | [`src/random.cpp`](https://github.com/bitcoin/bitcoin/blob/v31.1/src/random.cpp#L198-L253), [`src/random.cpp`](https://github.com/bitcoin/bitcoin/blob/v31.1/src/random.cpp#L285-L338), and [`src/random.cpp`](https://github.com/bitcoin/bitcoin/blob/v31.1/src/random.cpp#L340-L610) | Confirmed | Direct |
| An OS RNG failure aborts instead of continuing with weak key material | [`src/random.cpp`](https://github.com/bitcoin/bitcoin/blob/v31.1/src/random.cpp#L54-L58) and [`src/random.cpp`](https://github.com/bitcoin/bitcoin/blob/v31.1/src/random.cpp#L285-L338) | Confirmed | Direct |
| Candidate private keys are generated with `GetStrongRandBytes` and rejected until secp256k1 accepts them | [`src/key.cpp`](https://github.com/bitcoin/bitcoin/blob/v31.1/src/key.cpp#L158-L168) | Confirmed | Direct |
| Core verifies that the seed private key and public key match before building the wallet's descriptors | [`src/wallet/wallet.cpp`](https://github.com/bitcoin/bitcoin/blob/v31.1/src/wallet/wallet.cpp#L3604-L3617) and [`src/key.cpp`](https://github.com/bitcoin/bitcoin/blob/v31.1/src/key.cpp#L237-L248) | Confirmed | Direct |
| A standard wallet creates external and internal descriptor branches for legacy, nested SegWit, native SegWit, and Taproot output types | [`src/outputtype.h`](https://github.com/bitcoin/bitcoin/blob/v31.1/src/outputtype.h#L16-L30), [`src/wallet/wallet.cpp`](https://github.com/bitcoin/bitcoin/blob/v31.1/src/wallet/wallet.cpp#L3594-L3601), and [`src/wallet/walletutil.cpp`](https://github.com/bitcoin/bitcoin/blob/v31.1/src/wallet/walletutil.cpp#L35-L84) | Confirmed | Direct |
| The existing article's RNG and wallet-generation description still applies to 31.1 | Exact 31.1 sources above, plus a source diff against tag `v30.0` for the relevant functions | Confirmed | Direct for current behavior; comparison performed locally |

Corrections and publication changes:

- Updated the public Core reference from 30.0 to 31.1.
- Replaced the header-file reference with the exact `random.cpp` implementation and updated every source link to tag `v31.1`.
- Added the release notes and direct wallet/descriptor source links.
- Added a scope sentence distinguishing a normal private-key wallet from blank and external-signer wallets.
- Updated structured metadata and the visible last-updated date to 2026-09-04.

No contradictory behavior was found in Bitcoin Core 31.1 for the article's entropy-generation path.
