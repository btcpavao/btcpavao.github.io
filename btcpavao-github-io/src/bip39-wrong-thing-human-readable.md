# BIP39 Made the Wrong Thing Human-Readable

*Why I no longer think the wallet's root secret should be the thing humans are asked to preserve*

![A person holds a long chain of blank mnemonic tiles beside a laptop that keeps a structured wallet safely inside a blue glass chamber.](article-01-images/01-root-secret-hero.png)

*We moved the most sensitive object in the wallet out of the machine and into the human's hands. Why?*

Today a client sent me his Bitcoin wallet.

It arrived as a `.jpeg`.

There were no 12 words.

No 24 words.

No steel plate.

No hardware wallet.

And he did not give me the passphrase.

The file was a backup of his Bitcoin Core wallet. He had changed the extension so it looked like an ordinary image in an ordinary digital archive. Changing a filename is not cryptographic protection. **Obfuscation is not encryption.** But the file also did not advertise itself as a standardized Bitcoin bearer secret.

I loaded the actual wallet into Bitcoin Core. I could inspect the balance, the transaction history, and the UTXO we were going to test. The sensitive private-key material was protected by wallet encryption, and my client had managed the strong passphrase separately with KeePassXC.

I did not have it.

I created an unsigned PSBT spending 1,000 sats and sent it to him. On another computer, he checked the destination, unlocked his wallet, signed the PSBT, and sent it back. I broadcast the signed transaction.

It worked.

The backup loaded. The wallet state was there. The signing authority remained somewhere else.

> **I did not recover a seed. I recovered a wallet.**

That difference is the foundation of this series.

![A protected wallet artifact moves into Bitcoin Core, becomes an unsigned transaction, travels to a separate signer, and returns ready for broadcast while the passphrase stays apart.](article-01-images/02-core-recovery-flow.png)

*The wallet could be loaded and used to construct the transaction without giving the recovery machine authority to sign it.*

## A seed is not the whole wallet

A BIP39 mnemonic preserves secret material from which a deterministic wallet can be generated. That is powerful. It is not the same thing as preserving every fact needed to understand an arbitrary wallet.

A wallet may also depend on information such as:

- script type;
- derivation paths;
- account structure;
- external and change branches;
- key origins;
- wallet policy;
- multisig structure;
- labels and other metadata.

Some of that information can be recovered through standard conventions. Some can be stored in descriptors or separate documentation. Some wallet software can scan several common patterns automatically.

But those are additional layers.

[BIP39](https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki) defines how to generate a mnemonic and convert it into a binary seed. It does not encode a universal description of every wallet structure built from that seed.

> **Keys are not the whole wallet.**

A root secret can regenerate keys. It cannot, by itself, tell future software every assumption the original wallet made about those keys.

That is why a machine-readable wallet backup is conceptually different. It preserves the wallet as an object known to that software: its keys, its descriptors or scripts, its branches, and whatever metadata the backup contains.

It is not merely the raw material from which someone may later try to reconstruct that object.

This is not a semantic argument about whether people are allowed to call a seed a “backup.” In a simple, well-standardized single-signature wallet, a mnemonic plus the correct passphrase and known derivation convention may be enough to recover everything that matters for spending.

The question is what the artifact itself guarantees to preserve. A mnemonic preserves one layer. A wallet backup can preserve the implementation's known structure around that layer. The more custody moves beyond one default account and one default script, the more important that distinction becomes.

![A small stack of blank mnemonic tiles sits beside a much richer structured wallet containing branches, scripts, policy objects, and metadata.](article-01-images/03-seed-vs-wallet.png)

*Secret material is not the same thing as a complete description of the wallet.*

## Wallet archaeology

The familiar recovery failure begins with a reassuring moment.

The wallet accepts the seed phrase.

It opens.

The balance is zero.

Now the questions begin.

Which derivation path? Which script type? Which account? Was there a BIP39 passphrase? Which historical wallet created it? How far should the software scan? Was there a custom policy or a less common convention?

The funds may still exist. The seed may be perfectly correct. Yet recovery has become forensic reconstruction.

That does not happen in every BIP39 recovery. Mature wallets often follow well-known standards, and good backup procedures can preserve the missing context. The narrower and more defensible point is this:

**BIP39 itself does not preserve that context.**

If the rest was never documented, the person recovering the wallet must rediscover it.

> **If recovery requires reconstructing assumptions that were not stored in the backup, then the backup was not a complete description of the wallet.**

When I loaded my client's Core backup, I did not need to guess what wallet he had meant to create. I was looking at the wallet he had actually used.

![A blank seed card stands at the entrance to a sunlit stone maze whose branches represent the missing assumptions needed to find the wallet at its center.](article-01-images/04-wallet-archaeology.png)

*When the backup preserves secret material but not its context, recovery can become wallet archaeology.*

## BIP32 and BIP39 solved different problems

Bitcoiners often speak about BIP32 and BIP39 as if they were one innovation. They are not.

[BIP32](https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki) introduced hierarchical deterministic key derivation. One root can generate a structured tree of private and public keys. Before HD wallets, new independent keys could force users to refresh backups frequently. Deterministic derivation solved that wallet-engineering problem.

Bitcoin Core has implemented BIP32 HD wallets since version 0.13.0.

BIP39 made a different design choice. Its own motivation describes a way to transport computer-generated randomness through a human-readable transcription. The words can be written on paper or communicated between people, then converted into a seed for BIP32 or a similar system.

That is not the same achievement.

> **BIP32 made wallets deterministic. BIP39 made the master secret human-facing.**
>
> **The first was an engineering advance. I increasingly think the second was a security regression.**

Bitcoin Core adopted HD wallet functionality. It never adopted BIP39 as its native wallet-backup model.

I am not claiming Core formally held a vote and rejected BIP39 on philosophical grounds. I am describing the architecture that exists: Core uses deterministic wallet derivation and backs up the wallet itself.

![One root becomes a precise branching key tree on the BIP32 side, while root material crosses into human-held mnemonic tiles on the BIP39 side.](article-01-images/05-bip32-vs-bip39.png)

*BIP32 organizes keys. BIP39 changes who is expected to handle the root secret.*

## Why should humans handle the root secret?

BIP39 works as specified. I question whether its design goal should have become the foundation of Bitcoin custody.

Why should I need to see my wallet's root secret?

Why should I transcribe it, engrave it, recognize it, transport it, hide it, enter it into another device, expose it during recovery, or attempt to memorize it?

The user does not need to know individual private keys. The user does not need to manipulate the HD root. The user needs a reliable way to preserve the wallet and authorize its use.

Yet the dominant hardware-wallet model puts the machine's most sensitive secret into the human domain:

Here is the root to all your money. Write it down. Make it durable. Hide it for decades. Type it into a replacement device later.

We became so familiar with that ritual that we stopped asking whether the boundary itself was sensible.

In most mature security systems, software preserves cryptographic state. Humans manage access credentials, authorization, and recovery procedures.

Bitcoin normalized the reverse. We made the human the long-term storage layer for raw root material.

That may be the original category error.

## BIP39 made the wrong thing memorable

If human memorability is useful, apply it to the authorization credential.

Do not make the root secret itself the mnemonic.

Bitcoin Core allows that separation.

The machine-readable wallet backup contains the wallet's cryptographic material and structure. Bitcoin Core wallet encryption protects the sensitive private-key material with a separate passphrase. Public information such as transactions and other metadata may remain visible; Core does not promise that every byte of the wallet file becomes opaque ciphertext.

That limitation should be stated clearly. If full-file confidentiality is required, an external encrypted container can be added as a separate layer.

But the architectural division remains:

- The machine preserves the wallet artifact.
- The human manages the credential that authorizes use of its private keys.

A machine-readable wallet is not immortal. File formats change. Storage media fail. Software disappears. Future versions may require migration. The answer is not to trust one file forever; it is to keep tested copies, preserve compatible software and instructions, and rehearse restoration before an emergency. That is still a more concrete problem than asking future heirs to infer an undocumented wallet architecture from root words alone.

> **The thing worth making memorable was the credential that unlocks the wallet—not the wallet's root secret itself.**

![A person struggles with a long 24-tile root-secret chain while, beside them, a machine holds the wallet and another person carries only eight lightweight authorization tokens.](article-01-images/06-wrong-thing-memorable.png)

*The root secret does not need to be memorable. The credential that unlocks the protected wallet may need to be.*

## Eight random words, in the right role

KeePassXC provides a practical example.

The original EFF large Diceware list contains 7,776 entries. KeePassXC 2.7.12—the current release at the time of writing—ships a modified `eff_large.wordlist` containing **7,772 unique entries**.

KeePassXC draws a fresh random index for each word and uses rejection sampling to avoid modulo bias. For eight independent and uniform selections from the list it actually ships:

`8 × log2(7772) = 103.392561... bits`

Rounded to one decimal place: **103.4 bits of selection entropy**.

That figure does not apply to eight words invented by a human. It does not apply to a quotation, a clever sentence, a theme, or eight words chosen because they feel random. The estimate depends on independent software selection from the full list and a functioning random generator.

Nor am I proposing a brainwallet. Memory may be one recovery layer, but it should not automatically be the only copy. The passphrase can be documented for inheritance and stored redundantly in controlled forms, separately from the wallet backup.

The key distinction is its role.

**An eight-word Core wallet passphrase does not recreate the Bitcoin wallet.**

Without the corresponding wallet artifact, it is a credential with nothing to unlock.

![A large word-library vessel sends eight independent blue channels to eight blank tokens, with exact labels showing the KeePassXC list size and entropy calculation.](article-01-images/07-eight-word-passphrase.png)

*Eight independent uniform selections from KeePassXC's 7,772-word list provide approximately 103.4 bits of selection entropy.*

## Something you possess, something you know

The resulting model has two separate artifacts.

**Something you possess:** the wallet backup.

**Something you know or store separately:** the passphrase.

I am not calling this formal two-factor authentication. It is a separation between possession of wallet data and knowledge of the credential that unlocks the protected private-key material.

If someone learns only the passphrase, they cannot derive the wallet.

If someone obtains only the appropriately protected wallet backup, they still need the passphrase before the private keys can authorize a spend.

> **Finding my passphrase should not reconstruct my wallet. Finding my wallet backup should not be enough to spend from it.**

A bare BIP39 mnemonic without an additional passphrase has a different physical profile. Whoever obtains it can reconstruct the wallet's root secret. Every plaintext copy is therefore a portable, standardized bearer secret.

A correctly used BIP39 passphrase changes that model. It also creates another independent secret and more recovery semantics. That reinforces the larger point: the mnemonic alone was never the entire recovery architecture.

![A protected wallet artifact and a separate passphrase travel through different physical routes and meet only at a trusted offline signing machine.](article-01-images/08-separated-artifacts.png)

*The backup and passphrase are separate parts of one recovery system. Neither artifact alone completes the signing process.*

## Obfuscation is not encryption—but recognizability matters

My client's `.jpeg` extension provided no cryptographic protection. Anyone who inspected the file could discover that it was not an image.

The security came from wallet encryption and from keeping the passphrase elsewhere.

Still, the example reveals a useful operational difference. A machine-readable backup can live among normal digital archives without visibly announcing itself as a Bitcoin recovery object. It can be renamed, archived, copied to controlled media, or placed inside a separately encrypted container.

A piece of paper containing 12 standardized words or a metal plate containing 24 is more recognizable to anyone familiar with Bitcoin custody. Standardization improves interoperability. It also makes the artifact easier to identify for what it is.

Obfuscation is only a discovery-friction layer. It should never be mistaken for security. But recognizability is still part of operational security.

## Redundancy without copying a bearer secret everywhere

A plaintext seed creates an awkward redundancy problem. Each extra copy is another complete secret that can be photographed, copied, or used to reconstruct the wallet.

A protected machine-readable wallet artifact changes that problem.

It can be replicated across USB drives, SSDs, archival optical media, offline computers, appropriately protected cloud storage, and geographically separate archives while the passphrase remains elsewhere.

More copies are not free of risk. Every copy creates another operational surface: another device to maintain, another location to control, another restoration path to test.

But the distinction is still substantial:

> **Separating a protected wallet artifact from its passphrase changes the redundancy problem dramatically compared with duplicating a plaintext bearer secret.**

You can improve availability without placing the complete spend secret in every location.

Bitcoin Core's own documentation recommends using the proper wallet backup function, keeping backups on reliable offline devices, and testing them. It also warns that a forgotten passphrase cannot be recovered. This model replaces one set of responsibilities with another; it does not make operational discipline disappear.

The backup procedure matters. Copying a live wallet database at an arbitrary moment is not the same as asking Bitcoin Core to create a backup in a safe state. Core provides `backupwallet` and a GUI backup operation for that purpose. It also requires fresh backups after important wallet-encryption changes. The architecture is useful only when the operator follows the actual lifecycle of the wallet artifact.

![Copies of one protected wallet artifact rest on several storage media and in separate archives while the passphrase remains visibly detached.](article-01-images/09-protected-redundancy.png)

*Redundancy of a protected wallet artifact is not the same architecture as duplicating a raw bearer secret.*

## How the hardware-wallet industry normalized the opposite model

BIP39 did not become custody orthodoxy by itself.

Its listed authors are Marek Palatinus, Pavol Rusnák, Aaron Voisine, and Sean Bowe. Palatinus and Rusnák went on to establish Trezor's founding lineage. Trezor's Model One helped popularize the dedicated signing device and the mnemonic recovery flow:

specialized device → internally generated root → human-readable mnemonic → human preserves the root secret → replacement device reconstructs it

That is design lineage, not an accusation against individuals. Trezor did not create every later implementation, and a history of influence is not shared responsibility for every vendor's failures.

But the pattern spread. Millions of Bitcoiners were taught that serious self-custody meant buying a specialized device and treating 12 or 24 words as a sacred physical object.

I increasingly think the BIP39 plus specialized-hardware-wallet monoculture is a security disaster waiting to happen.

That is my assessment, not a universal fact. Specialized devices reduce important categories of exposure. They can keep signing keys away from an ordinary internet-connected computer. They can also introduce vendor firmware, secure-element integration, update mechanisms, companion applications, specialized supply chains, targeted delivery risk, and common recovery rituals.

Those assumptions deserve their own articles. Article 1 has a narrower job: to question why the root secret became the human's primary backup artifact in the first place.

## Test recovery, do not worship backups

A backup is not proven because the file exists.

A steel plate is not proven because the words are legible.

A recovery plan is proven when it survives recovery.

Use a small test wallet. Create the real backup. Move it to a separate machine. Restore or load it. Build an actual PSBT. Verify it on the signer. Sign it. Broadcast it. Confirm that the documentation, storage media, software, passphrase, and human procedure all agree.

My client's 1,000-sat transaction was not a thought experiment. It tested the actual chain:

wallet backup → loaded wallet → unsigned PSBT → separate authorization → signed PSBT → broadcast

The test showed us what we had and what we did not have.

I had enough wallet state to reconstruct the transaction.

I did not have enough authority to sign it.

That was the intended boundary.

> **A backup is not proven because it exists. It is proven because you restored it and spent from it.**

## Back to Bitcoin Core

The model I want to examine throughout this series is deliberately plain:

- generic, non-Bitcoin-specific hardware;
- clean Linux;
- minimal installed software;
- Bitcoin Core;
- a dedicated offline signer;
- a separate online Core node or watch-only coordinator;
- PSBT transfer;
- protected machine-readable wallet backups;
- separately managed authorization credentials;
- repeated recovery tests.

That is not magic. A laptop has firmware. Linux has a supply chain. Bitcoin Core can have bugs. Operators make mistakes. An ordinary daily-use laptop connected to the internet is not the offline signer I am describing.

The purpose of going back to Core is not to pretend trust disappears. It is to remove specialized assumptions one at a time, make the remaining boundaries explicit, and test the real recovery system instead of worshipping one artifact.

My client did not give me his root secret.

He gave me the wallet artifact.

He kept the authorization secret separately.

I could recover the wallet and construct the spend without being able to authorize it. He authorized it elsewhere.

That feels much closer to how a serious security system should work.

![Two generic laptops form an online-and-offline Bitcoin Core workflow at Mediterranean dusk while a protected backup and separate passphrase sit nearby and blue particles approach from the distance.](article-01-images/10-next-question-entropy.png)

*The next question is even more fundamental: where did the secret come from in the first place?*

For more than a decade, Bitcoin custody has treated seed words as almost sacred.

I think it is time to question the abstraction itself.

And there is another problem with the seed-phrase model that is even more fundamental.

Twenty-four perfectly valid words cannot tell you whether the secret underneath them was actually random.

Recent events made that painfully clear.

That is the next article.

> **Back to first principles.**
>
> **Back to Bitcoin Core.**
