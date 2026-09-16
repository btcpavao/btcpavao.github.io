# Bitcoin Core curriculum v4.2 — pregled promjena

Datum: 16. rujna 2026.
Repozitorij: `btcpavao/btcpavao.github.io`
Grana: `curriculum-self-reliance-pass`
Polazište: najnoviji `main`, `54083e6eb8a52c4570bf20bae1a1ac7e36f14cb0` (`git pull --ff-only origin main`: already up to date).

Promjene su lokalne. Nisu objavljene na produkciji niti poslane na GitHub. Rad je napravljen u čistom postojećem checkoutu `btcpavao-copy-alignment`; drugi checkout s ranijim izmjenama nije diran.

## Rezultat i odluke

Sačuvane su tri glavne cjeline. Curriculum sada ima 99 lekcija: 27 u First Principles, 52 u Master the Simple System i 20 u Advanced Spending Policies. Glavni put ima 67 obveznih lekcija u 12 milestones. Produkcijski dio i Part III ostaju opcionalni: završetak tečaja ne zahtijeva pravi bitcoin.

- Gateway prije tri cjeline predstavlja Pavaov financijski okvir: proračun, razduživanje, davanje, ravnoteža imovine, dugoročno razmišljanje i volatilnost. Pet pitanja je u sklopivom bloku, bez dodatnog uvjeta za nastavak.
- Foundations sada vodi od razumijevanja povjerenja preko praktičnog Linuxa do odgovornosti za instalirani softver, čiste ponovne instalacije i provjere Corea. Debian Stable ostaje obrazloženi default; Tails ostaje opcionalan.
- Dvanaest novih lekcija koristi postojeće reading/practice/checkpoint komponente. Linux instalacija i prilagodba razdvojene su kako bi AI pravila prethodila AI-potpomognutoj prilagodbi. Terminal i RPC imaju objašnjenu svrhu i očekivane rezultate.
- RPC vježba ima pet kratkih koraka: mreža, wallet, pomoć za operacije, testna adresa, provjera adrese. Naredbe za Core konzolu su pojedinačne; korisnik ne lijepi višeredni blok u konzolu.
- `Move to real Bitcoin` sada je jasno vidljivo opcionalno poglavlje, s novim checkpointom i postojećim procedurama za stvarni wallet, enkripciju i oporavak. Te procedure nisu duplicirane.
- Multisig lab sada izričito potpisuje isti početni PSBT odvojeno kod dva signera i koristi `combinepsbt`. Slijede postojeće vježbe backupa i kvarova, pa nova odluka o tome opravdavaju li dodatni potpisnici svoj trošak. Nema univerzalnog iznosa za prelazak na multisig.
- Dugi usporedni argumenti u hardware lekciji premješteni su u dodatne detalje. Glavni tekst naglašava zamjenjivost, izbor softvera i kontinuitet. Zadržani su postojeći izvori i korisni tehnički detalji.
- Nenametljiv Ask Pavao / Value for Value blok pojavljuje se nakon threat modela, produkcijskog checkpointa/readiness provjere i napredne odluke/mastery provjere. To je običan kontaktni link; nijedna poruka nije poslana.
- Core Explorer ostaje opcionalno sučelje nakon razumijevanja operacija, uz postojeće oznake eksperimentalnog statusa. Njegov repozitorij nije diran.

## Navigacija, napredak i pristupačnost

Postojeći ID-jevi, slugovi, aliasi i javne rute sačuvani su. Zamrznuti v4.1 manifest bilježi staro dokazano znanje. Migracija zadržava ranije potvrđen rad, ali ne dodjeljuje završetak novih lekcija. Izmijenjeni praktični koraci i checkpointi imaju nove potrebne potvrde. Stari zapisi ostaju spremljeni čak i kada aktualna lekcija traži dodatni rezultat.

Izolirana preglednička provjera s potpunim v4.1 zapisom zadržala je svih 87 starih zapisa u migracijskom snapshotu, prikazala 7/12 aktualnih milestones i ponudila nastavak na novu lekciju o povjerenju. Novi korisnik dobiva prazan migracijski snapshot. Povlačenje ranijih potvrda ponovno provjerava ovisni napredak; reset čisti obje generacije migracijskih zapisa.

Prikaz i dalje koristi postojeće tri kartice, sklopive milestones, paginirane praktične korake, lokalnu pohranu i mobilni drawer. Ispravljena je dostupnost gumba zatvorenog drawera za čitače zaslona. Escape zatvara drawer i vraća fokus. Potvrda rezultata pomiče fokus na sljedeći korak; korak se zadržava nakon ponovnog učitavanja.

## Poveznice između obrazovnih osi

Gateway povezuje na postojeći `/#bitcoin-standard` i pet poglavlja postojećeg Practical Bitcoin Standard vodiča:

1. [Zero-based budget](https://btcpavao.gitbook.io/practical-bitcoin-standard/money-management-wisdom/plan-your-money)
2. [Becoming debt-free](https://btcpavao.gitbook.io/practical-bitcoin-standard/money-management-wisdom/live-debt-free)
3. [Systematic giving](https://btcpavao.gitbook.io/practical-bitcoin-standard/money-management-wisdom/set-aside-and-keep-10-20-of-your-budget-for-giving)
4. [Balanced net worth](https://btcpavao.gitbook.io/practical-bitcoin-standard/bitcoin-in-your-total-net-worth/keep-your-net-worth-composition-in-balance)
5. [Long-term expectations and volatility](https://btcpavao.gitbook.io/practical-bitcoin-standard/bitcoin-in-your-total-net-worth/managing-future-bitcoin-price-expectations-and-handling-volatility)

Na homepageu je dodan samo kratak kontekstualni odlomak koji spaja dvije postojeće putanje i povezuje na self-custody curriculum. Postojeća hrvatska knjiga/Bitcoin kao novac i ostale stranice nisu prepisivane. Financijski modeli opisani su kao okvir, bez obećanja prinosa.

## Datoteke

Putanje su relativne korijenu repozitorija; aplikacija je u `btcpavao-github-io/`.

| Datoteka | Promjena |
| --- | --- |
| `src/curriculum/self-reliance.ts` | Nova datoteka: 12 kratkih lekcija i checkpointa, izvori i praktični koraci |
| `src/curriculum/part-1.ts` | Uključivanje Linux/povjerenje niza, hardware copy, foundations checkpoint |
| `src/curriculum/part-2.ts` | Čista instalacija, sandbox analogija, RPC, produkcijski prijelaz i preduvjeti |
| `src/curriculum/part-3.ts` | Neovisni multisig potpisi i combinepsbt, reflection, kriteriji napredne politike |
| `src/bitcoin-core-curriculum-player-en-data.ts` | Verzija 4.2, sažeci postojećih triju cjelina |
| `src/components/curriculum-context.tsx` | Gateway i zajednički kontaktni blok |
| `src/components/curriculum-overview.tsx` | Gateway, grupiranje opcionalnih poglavlja, poruka o zadržanom radu |
| `src/components/curriculum-lesson.tsx` | Kontaktni blok na relevantnim lekcijama |
| `src/bitcoin-core-curriculum-en.tsx` | Migracija napretka, produkcijski CTA, drawer pristupačnost |
| `src/curriculum-progress-migration.ts` | Validacija i zadržavanje v4.1 dokaza |
| `src/curriculum/v4.1-progress-manifest.json` | Zamrznut manifest 87 starih lekcija |
| `src/homepage.tsx` | Mali kontekstualni cross-link |
| `src/index.css` | Stilovi novih blokova i razmaci unutar postojećih površina |
| `public/curriculum-labs/core-31.1-regtest.py` | Proširene stvarne RPC i multisig provjere |
| `scripts/verify-curriculum.mjs` | 27 provjera strukture, ovisnosti, migracije i novih obveznih rezultata |
| `docs/self-custody-v4.2-regtest-results.json` | Stvarni rezultat 64 Regtest provjere |
| `docs/self-custody-v4.2-factcheck-2026-09-16.md` | Odvojena provjera tvrdnji i izvora |
| `docs/self-custody-v4.2-review.md` | Ovaj izvještaj i konačan popis lekcija |
| `docs/self-custody-v4.2/*.webp` | Pregled desktop i mobilnog prikaza |

## Provjere

- `npm run verify:curriculum`: 27/27.
- `npm run build`: TypeScript, Vite browser/SSR build i prerender 14 javnih ruta prošli. Vite prijavljuje postojeći obrazac miješanih statičkih/dinamičkih SSR importa; ta arhitektura nije mijenjana.
- `npm run lint`: prošao bez upozorenja i grešaka.
- `npm run verify`: 38 responsive image skupova; 578 internih linkova; 99 odredišta lekcija; 14 javnih ruta.
- Stvarni Bitcoin Core 31.1 Regtest: 64/64, bez peer mreže, u zasebnim privremenim direktorijima. Obuhvaća enkripciju, restore, offline PSBT, sve 2-of-3 parove, neovisno kombiniranje potpisa, Taproot i delayed Miniscript recovery.
- Doslovno izvršena tri prikazana multisig command bloka: nepotpun jedan potpis → spojeni potpisi → finalizacija → mempool acceptance → broadcast → jedna potvrda.
- Preglednik: 1440 px desktop, 390 px mobile i 320 px uski mobile; svaka od 12 novih lekcija na 320 px bez horizontalnog prelijevanja. Pregledani svijetli i tamni prikaz, gateway, praktični korak, produkcijski checkpoint, drawer i napredak.
- Nove uokvirene površine imaju najmanje 16 px unutarnjeg vodoravnog razmaka na mobitelu, odnosno 24 px na desktopu. Širi gateway/help blokovi koriste 20/32 px.
- Fizička Debian instalacija, hardverski air gap i mainnet transakcije nisu dio ovih testova. UI bilježi izjavu korisnika o rezultatu; ne može provjeriti njegov uređaj ili wallet.

## Namjerno sačuvano

Tri cjeline i postojeći vizualni jezik; većina postojećih wallet/backup/restore/PSBT procedura; dizajn naprednih politika i postojeće poveznice/aliasi; odsutnost iznosnog praga za multisig; opcionalnost Tailsa, produkcije i Part III. Nema nove velike biblioteke, novog financijskog tečaja, redizajna homepagea ili izmjena nepovezanih stranica.

## Lokalni pregled

Iz direktorija `btcpavao-github-io`:

```sh
npm run build
npm run preview -- --host 127.0.0.1 --port 4175
```

Otvoriti [curriculum](http://127.0.0.1:4175/en/bitcoin-core/self-custody/), [Linux playground](http://127.0.0.1:4175/en/bitcoin-core/self-custody/#lesson/linux-playground), [Start clean](http://127.0.0.1:4175/en/bitcoin-core/self-custody/#lesson/start-clean) i [produkcijski checkpoint](http://127.0.0.1:4175/en/bitcoin-core/self-custody/#lesson/move-to-real-bitcoin).

Snimke: [desktop pregled](self-custody-v4.2/overview-desktop.webp), [Linux mobile](self-custody-v4.2/linux-mobile.webp), [produkcijski checkpoint, mobile dark](self-custody-v4.2/production-mobile-dark.webp).

## Konačna struktura

Gateway je uvodni kontekst, nije četvrta cjelina. U sljedećem popisu ★ označava novu lekciju; “opcionalno” ne ulazi u završetak glavnog puta.

### First Principles — Why Bitcoin Core? (27)


**Begin with the threat**

- Self-custody means control and understanding (`what-self-custody-really-means`)
- Write your threat model before choosing a solution (`threat-model-before-tools`)
- ★ Make the remaining trust visible (`trust-and-verification`)
- Complexity has a security and economic cost (`security-is-a-process`)
- Bitcoin custody does not scale like a gold vault (`custody-economics`)

**Verify for yourself**

- Bitcoin Core is a wallet and your own verifier (`what-is-bitcoin-core`)
- Verification belongs inside the custody model (`your-node-matters-first-to-you`)
- Electrum: the trade for an instant start (`electrum-workflow-and-security-assumptions`)
- Initial block download is a feature of sovereignty (`ibd-does-not-block-wallet-learning`)
- Keep the verification work you have already done (`core-is-neither-a-server-nor-useless`)
- One chain, several offline signers (`why-the-signer-does-not-need-the-blockchain`)

**Choose the foundation**

- Why this course starts with general-purpose hardware (`hardware-wallet-as-a-tradeoff`)
- Generic hardware, dedicated Debian, Bitcoin Core (`core-as-a-tool-not-an-identity`)
- BIP39: a readable root secret and its backup consequences (`bip39-cryptography-and-backup-model`)
- Where Core gets its wallet secrets (`where-the-private-key-comes-from`)
- Sparrow case study: a valid checksum is not good randomness (`sparrow-workflow-and-security-assumptions`)
- Choose recovery dependencies for 20, 40 or 80 years (`software-continuity`)
- What this foundation cannot do for you (`battle-tested-does-not-mean-bug-free`)

**Learn to control your computer**

- ★ Linux is something you can learn (`why-linux`)
- ★ Why Debian Stable (`why-debian-stable`)
- ★ Install Linux and make it yours (`linux-playground`)
- ★ AI is a tutor, not a root of trust (`ai-as-a-tutor`)
- ★ Make one change you understand (`linux-make-it-yours`)
- ★ Freedom creates responsibility (`software-responsibility`)

**Start clean and verify**

- ★ Start clean (`start-clean`)
- ★ What exactly am I verifying? (`what-verification-proves`)
- Before practice: explain your chosen foundation (`foundations-checkpoint`)

### Master the Simple System — Single-sig Bitcoin Core (52)


**Prepare Debian and Core**

- Choose one dedicated computer for practice (`choose-a-computer-and-model-malware-risk`)
- Install a small, dedicated Debian system (`debian-setup`)
- Download Core and check that it is the intended release (`install-and-verify-bitcoin-core`)
- Practice with test coins first (`learn-first-with-valueless-bitcoin`)
- Check whether you are using test coins or real bitcoin (`mainnet-vs-signet`)
- Open Core on the Signet practice network (`start-bitcoin-core-on-signet`)
- Keep every block or save disk space with pruning (`full-vs-pruned-node`) · opcionalno

**Operate one Core wallet**

- Create a wallet used only for practice (`first-signet-wallet-and-address`)
- How strong does my wallet passphrase need to be? (`passphrase-strength`)
- Explore the cost of guessing (`brute-force-economics`)
- Generate the passphrase with KeePassXC (`generate-passphrase`)
- Protect the test wallet with a password and back it up (`encrypt-signet-wallet-and-create-new-backup`)
- Receive test coins and send a small payment to yourself (`first-signet-receive-and-send`)
- Choose coins, fees and the final transaction deliberately (`coin-control-fees`)
- Rebuild the test wallet from its backup (`back-up-remove-test-wallet-and-restore`)
- Prove that the restored wallet can send (`send-again-after-signet-recovery`)
- Lock, unlock and change the wallet passphrase (`wallet-lock-change`)
- ★ See what the GUI is asking Core to do (`basic-rpc`)
- Repeat until the wallet lifecycle feels ordinary (`repetition-drills`)
- Check that you completed the whole practice cycle (`mainnet-readiness-signet-checkpoint`)

**Prove backup and recovery**

- Find the wallet data that needs a backup (`wallet-backup-vs-node-data`)
- Keep backups separate and up to date (`more-copies-do-not-mean-a-current-backup`)
- Understand what an encrypted backup still reveals (`digital-and-cloud-backup-privacy-model`)
- Choose backup media by failure mode (`backup-media`)
- Recover after losing the local wallet or a backup device (`recovery-failure-drills`)
- Checkpoint — prove backup and recovery (`backup-mastery`)
- Mastery checkpoint — I can operate one Core wallet (`one-wallet-mastery`)

**Separate node and signer**

- Separate the jobs you already know (`simple-wallet-or-offline-signer`)
- How the online computer and offline signer work together (`online-node-and-offline-signer`)
- Three wallet roles you will encounter (`hot-watch-only-and-signing-wallet`)
- Transfer payment files safely between the computers (`malware-usb-and-destination-verification`)
- Know when physical tampering means you should stop (`physical-security-and-backup-media`)
- Prepare the offline signer and check it after shutdown (`prepare-offline-signer`)

**Complete an offline payment**

- Connect the wallets using public descriptors (`watch-only-setup`)
- Build online, sign offline, return and broadcast (`first-offline-signed-transaction`)

**Recover without the originals**

- Replace both computers and repeat the payment (`recovery-drill-without-original-coordinator`)
- Write a recovery guide someone else can follow (`document-the-procedure-without-exposing-secrets`)
- Before maintenance: operate without the original signer (`offline-mastery`)

**Maintain the setup**

- Review the custody system every year (`regular-tests-and-annual-recovery-drill`)
- Make recovery understandable to another person (`inheritance-and-other-people`)
- Master the simple system before adding a spending policy (`single-sig-mastery`)

**Optional extensions**

- Optional: generate the passphrase with physical dice (`optional-physical-dice-passphrase`) · opcionalno
- Optional: put the backup inside an encrypted container (`optional-veracrypt`) · opcionalno

**Move to real Bitcoin**

- ★ Move to real Bitcoin — deliberately (`move-to-real-bitcoin`) · opcionalno
- Start a new wallet for real bitcoin (`do-not-turn-signet-wallet-into-mainnet-wallet`) · opcionalno
- Create the real wallet and its password offline (`encryption-and-passphrase`) · opcionalno
- Restore the empty real wallet before depositing (`restore-in-a-clean-test-environment`) · opcionalno
- Check the setup before a small real-bitcoin test (`mainnet-readiness-before-first-deposit`) · opcionalno
- Send a small real payment from the restored wallet (`first-small-mainnet-test`) · opcionalno

**Optional extensions**

- Reuse your own block files and rebuild validation state (`migrate-node-data-or-validate-from-scratch`) · opcionalno
- Optional: use Tails as the offline operating system (`optional-tails-offline-environment`) · opcionalno
- Optional: keep a small spending wallet online (`path-a-online-encrypted-core-wallet`) · opcionalno

### Advanced Spending Policies — Only when the threat model requires them (20)


**Decide whether to add authority**

- Multisig is a spending policy, not a backup strategy (`why-multisig-and-when-not-to-use-it`) · opcionalno
- Count the cost of three vendor ecosystems (`multi-vendor-cost`) · opcionalno
- Write the policy in ordinary language first (`complex-wallet-simple-recovery`) · opcionalno

**Learn the Core primitives**

- Make a reproducible, disposable experiment (`how-to-run-a-self-custody-experiment`) · opcionalno
- Run the Core 31.1 laboratory (`regtest-and-failure-scenarios`) · opcionalno
- Use RPC only when you need its precision (`rpc-and-cli`) · opcionalno
- Separate node state from wallet state in RPC (`node-wallet-and-blockchain-are-not-the-same`) · opcionalno
- Read and verify a descriptor (`descriptor-experiments`) · opcionalno
- Inspect the PSBT before adding signatures (`psbt-debugging`) · opcionalno

**Build and recover policies**

- Build and spend a 2-of-3 policy (`2-of-3-on-signet`) · opcionalno
- Back up the policy as well as the keys (`keys-are-not-the-whole-multisig-recovery`) · opcionalno
- Test the missing-signer cases (`failure-simulations`) · opcionalno
- ★ Did the extra signers earn their place? (`complexity-after-the-lab`) · opcionalno
- Taproot is an output format, not an automatic quorum (`taproot-mental-model`) · opcionalno
- Inspect a Taproot descriptor and its actual spending authority (`taproot-descriptors-and-recovery-artifacts`) · opcionalno
- Add a delayed recovery path only when you mean it (`timelocked-recovery`) · opcionalno
- Test every permitted path and every intended rejection (`test-every-recovery-path`) · opcionalno
- Before adopting a policy: justify and recover it (`advanced-mastery`) · opcionalno

**Optional interfaces and further work**

- Optional: Core Explorer as an advanced interface (`core-explorer`) · opcionalno
- Ask a technical question without exposing a wallet (`community-questions-and-clarifications`) · opcionalno
