# Usklađivanje javnog Bitcoin Core sadržaja — 14. rujna 2026.

## 1. Baseline i kanonski izvor

Baseline je `9da6c0a6296be479113dbbd757c7257e8f8c1732` — **Refine one-wallet progression and milestone UX for curriculum v4.1**. Nakon ponovnog dohvata potvrđeno je da su `main` i `origin/main` na tom commitu. Ranija prepreka bila je uklonjena: v4.1 je sada bio na `mainu`.

Kanonski izvor bio je [self-custody-v4.1-review.md](self-custody-v4.1-review.md), uz [dokaze o KeePassXC-u](self-custody-v4.1-keepassxc-evidence.json). Pročitani su i prethodni v4 review/audit te sve tri cjeline aktualnog curriculuma, ukupno 87 lekcija (18 / 50 / 19). U repozitoriju nije pronađen dodatni `AGENTS.md`; primijenjene su korisnikove priložene upute.

Implementacija je commit `92e04f97b6cdf8296b77ec8880ffc793e85ba954`. Zbog paralelnih, nedovršenih izmjena curriculuma u prvotnom radnom direktoriju, vlastiti je patch premješten u zasebnu lokalnu kopiju potvrđenog `maina`. Tuđe izmjene nisu uključene u commit.

## 2. Pregledane stranice

Pregledani su homepage, engleski i hrvatski Core hub, cijeli engleski curriculum, kratka vježba, wallet vodič, Long Road, BIP39, multisig i oba članka o entropiji. Pregledani su globalna navigacija, footer, content registry, `llms.txt`, izvor social kartice i postupak generiranja HTML-a, sitemapa i RSS-a. Metapodaci provjereni su za svih 14 javnih ruta, uključujući hrvatski početni sadržaj i support stranice.

## 3. Promijenjene stranice

Sadržajno su promijenjeni homepage, oba Core huba, kratka vježba, wallet vodič, Long Road, BIP39 te EN/HR prikaz članka o entropiji. Curriculum je dobio usklađene metapodatke; sadržaj lekcija, arhitektura, preduvjeti i spremanje napretka nisu mijenjani. Multisig članak ostao je sadržajno nepromijenjen. Globalni header/footer prenose novi redoslijed na stranice koje ih koriste.

## 4. Homepage — konkretne izmjene

Glavni CTA **Start with Bitcoin Core** sada glasi **Start with first principles** i vodi na curriculum. Isti primarni CTA postavljen je uz prikaz puta učenja. Sekundarni završni link glasi **Quick Bitcoin Core practice**.

Preporuka custodial servisa kao privremene faze zamijenjena je ovim tekstom:

> You do not need the final savings architecture on day one. Begin with disposable test wallets and valueless coins. Learn one wallet, practice the full lifecycle, and prove recovery before creating a fresh setup for real funds.

Dugoročna preporuka sada glasi:

> For long-term self-custody, I recommend Bitcoin Core on dedicated generic hardware running Debian Stable. Independent verification, encrypted redundant backups and a separately recoverable passphrase form the foundation. Learn offline signing after recovery is routine, and add further policies only when your threat model requires them.

Donja neutralna formulacija zamijenjena je jasnim **I recommend Bitcoin Core on dedicated generic Linux hardware**, uz objašnjenje da curriculum podučava Debian Stable i počinje modelom prijetnji.

Prikaz puta sada ima šest koraka:

1. Understand the threat model.
2. Understand why Bitcoin Core.
3. Master one simple wallet.
4. Prove backup and recovery.
5. Separate node and signer.
6. Add advanced policies only when required.

Dodani su neovisna provjera i početna sinkronizacija kao dio rada. Curriculum kartica označena je **Canonical learning path**, a wallet vodič **Focused reference**. Usklađeni su uvod u Core put i odlomak o učenju u javnosti. Sačuvane su glavne poruke o manje pretpostavki, manje pokretnih dijelova i sustavima koje možemo objasniti, oporaviti i održavati.

## 5. Core hub

Redoslijed je curriculum → quick practice → focused wallet guide. Curriculum je prva kartica i na desktopu zauzima cijeli red. Uvod objašnjava put od modela prijetnji do jednog walleta, dokazanog oporavka, odvojenog potpisivanja i opravdanih dodatnih politika.

Eseji ostaju odvojeni pod **The reasoning behind the recommendation**. Sekcija je dobila stvarni `#essays` anchor, na koji su navigacija i footer već upućivali. Hrvatski hub objašnjava istu hijerarhiju te englesku dostupnost praktičnih materijala; prvi link vodi na curriculum.

## 6. Kratka vježba

URL `/en/bitcoin-core/start-here/` je sačuvan. Stranica je predstavljena kao **Quick Core practice**, a naslov za tražilice i dijeljenje kao **Quick Bitcoin Core Practice**. Vidljivi glavni naslov o vježbi bez pravog bitcoina ostaje.

Na vrhu piše da je riječ o jednokratnoj praktičnoj vježbi i da curriculum počinje ranije, modelom prijetnji i prvim načelima. Ishod više ne tvrdi da kratka vježba sama dokazuje potpun oporavak. macOS, Windows i održavani Linux odvojeni su od dugoročne preporuke Debian Stablea na namjenskom generičkom hardveru.

Završni primarni CTA je **Open the curriculum**; sekundarni **Open the focused wallet guide**. Naslov social kartice promijenjen je u izvornom SVG-u, potom je PNG ponovno renderiran u Chromeu. Build je proizveo novu fingerprintiranu adresu slike.

## 7. Wallet vodič

- Uvod ga jasno definira kao referencu za mehaniku jednog šifriranog walleta i povezuje s curriculumom za cjelovit model.
- Osam neovisno generiranih riječi označeno je kao konzervativni zadani izbor tečaja, a ne kriptografski minimum.
- Zadani generator je KeePassXC na pripremljenom Debianu. Naveden je pregledani paket `keepassxc-minimal 2.7.10+dfsg1-1`, postupak s ugrađenim `(SYSTEM) eff_large.wordlist`, 7.772 različite riječi, mala slova i razmak.
- Nije potrebna izrada password baze niti uvoz vlastitog popisa samo za generiranje. Promjene verzije treba usporediti s pregledanim postupkom; održavane nadogradnje nisu isključene.
- Dodane su poveznice na generiranje, snagu passphrasea, ekonomiku napada i zasebnu opcionalnu vježbu s kockicama. Kockice više nisu ravnopravan zadani put.
- Screenshotovi na macOS-u označeni su kao vježba, odvojeno od pregledanog Debian postupka.
- Hardware-wallet odlomak priznaje izolaciju ključeva od malwarea, opisuje dodatne ovisnosti i završava preporukom generičkog hardvera, Linuxa i Corea.
- Objašnjenje dvaju računala premješteno je iza svih 11 praktičnih koraka. Vodič prvo traži jedan wallet i oporavak; odvojeno potpisivanje slijedi kasnije.
- Stari link `#lesson/9.1` zamijenjen je važećom poveznicom na curriculum. Tekst razlikuje učitavanje backupa od uspješnog testnog trošenja oporavljenim ključevima dok je original zatvoren.
- Završna provjera više ne poziva na financiranje testnog walleta. Dodan je CTA prema curriculumu. Broj i indeksi koraka/checklista te nazivi storage ključeva sačuvani su.

## 8. Long Road

Na početku tijela članka dodana je jasno oblikovana napomena **September 2026 update**. Ona razlikuje povijesni put od današnje preporuke: generički hardver, Debian Stable, Bitcoin Core, redundantni šifrirani backupi i zasebno oporavljiv passphrase; hardware walleti i BIP39 izvan su preporučenog puta.

Sekcija **This is not a universal recommendation** sada se zove **What I recommend now**. Stari anchor `#this-is-not-a-universal-recommendation` sačuvan je radi bookmarka. Rečenica o iznosu koji opravdava signer zamijenjena je modelom prijetnji kao razlogom za odvajanje potpisivanja. Usklađene su još sadašnje preporuke o BIP39, file backupu i izolaciji za značajne iznose.

Sačuvani su povijesni pregled walleta, kockica i multi-vendor istraživanja, struktura argumenta, svih 13 ilustracija i pripadajući izvorni vizualni blokovi. Caveat ostaje precizan: preporuka nije dokaz da je svaka alternativa nesigurna.

## 9. Ostali članci i provjera činjenica

**BIP39:** samo dva kratka odlomka u dijelu o osam riječi: KeePassXC kao zadani generator, osam kao zadani izbor tečaja i link na aktualni Debian postupak; kockice opcionalno. Povijesna referenca na verziju 2.7.12 i tehničko obrazloženje ostali su. Nije dodana tvrdnja da je BIP39 kriptografski slomljen.

**Multisig:** sadržaj je pregledan i sačuvan. Iznos može promijeniti model prijetnji, ali sam po sebi ne bira broj potpisa. Multisig ostaje model autorizacije, a ne backup strategija.

**Entropija EN/HR:** dodana je kratka napomena u prikazu članka s poveznicama na KeePassXC postupak i objašnjenje osam riječi. Tekst ne izjednačava implementacije RNG-a u Coreu i KeePassXC-u. Izvorni tehnički tekstovi oba članka ostali su byte-identični; njihove postojeće SHA-256 provjere prolaze.

Zaseban fact-check novih tvrdnji napravljen je nakon pisanja:

| Tvrdnja | Provjeren izvor / ishod |
|---|---|
| Pregledani Debian paket i verzija | [Debian trixie paket](https://packages.debian.org/trixie/keepassxc-minimal): `2.7.10+dfsg1-1`; podudara se s v4.1 dokazima. |
| 7.772 različite riječi i 103,392561… bita za osam neovisnih ravnomjernih odabira | Ponovno preuzet [upstream popis 2.7.10](https://github.com/keepassxreboot/keepassxc/blob/2.7.10/share/wordlists/eff_large.wordlist), ponovno izbrojen i izračunat. 7.772 retka, 7.772 jedinstvena unosa, jednako nakon lowercase pretvorbe. SHA-256 `df895130803573b14caa684e8cba982a9ed21f4898c98c711f204acf600efedd`, jednako paketnim dokazima v4.1. |
| Svaki odabir koristi novi slučajni indeks; ponavljanja se zadržavaju | Ponovno preuzet i pregledan [PassphraseGenerator.cpp 2.7.10](https://github.com/keepassxreboot/keepassxc/blob/2.7.10/src/core/PassphraseGenerator.cpp): odabir s ponavljanjem i zaseban draw u petlji. |
| Kriptografska računalna slučajnost; bez tvrdnje o identičnoj Core implementaciji | [Random.cpp 2.7.10](https://github.com/keepassxreboot/keepassxc/blob/2.7.10/src/crypto/Random.cpp), uz ograničenje na prethodno pregledani Debian/Botan build iz v4.1 dokaza. Nisu dodane tvrdnje o syscallovima svih platformi ili runtime mjerenju. |
| GUI: Passphrase, sistemski popis, broj riječi, lower case, separator, samostalan generator | Ponovno pregledani [PasswordGeneratorWidget.cpp](https://github.com/keepassxreboot/keepassxc/blob/2.7.10/src/gui/PasswordGeneratorWidget.cpp), pripadajući `.ui` i `MainWindow.cpp`, uz prethodnu v4.1 provjeru Debian paketa. |
| BIP39 može prenositi snažnu računalno generiranu entropiju | [BIP39 specifikacija](https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki): entropija i pretvorba mnemonika u seed. Arhitektonska kritika ne tvrdi slab RNG ili slomljenu kriptografiju. |
| Zašto kockice nisu zadani izbor; zašto osam riječi | Izričite preporuke curriculuma i korisnika. Operativni trošak nije pretvoren u empirijsku tvrdnju o stopi pogrešaka. |
| Core, Debian i generički hardver kao dugoročna preporuka | Jasno označen urednički zaključak usklađen s v4.1; nije predstavljen kao izmjeren univerzalni poredak sigurnosti svih walleta. |

Pouzdanost novih numeričkih i verzijskih tvrdnji: visoka za navedenu pregledanu verziju. Ovaj pass nije novi fizički Debian/KeePassXC test, Core transakcijski test niti potpuni novi audit svih povijesnih tvrdnji u esejima. Postojeći praktični dokazi i njihove granice ostaju u curriculum review dokumentima.

## 10. Header i footer

Desktop i mobilni Core izbornik imaju isti redoslijed: **Self-custody curriculum**, **Quick Core practice**, **Wallet setup, backup & recovery**, **All Bitcoin Core work**. Footerov **Learn Core** koristi curriculum → quick practice → wallet guide.

U pregledniku su potvrđeni redoslijed odredišta, fokus na prvom mobilnom linku nakon otvaranja i zatvaranje tipkom Escape s povratkom fokusa na gumb. Footerovi prvi Core linkovi vode na ista tri odredišta.

## 11. Content registry i metapodaci

Registry je izvor ažuriranih naslova, opisa, redoslijeda i datuma. Homepage opis već je odgovarao cilju pa je sačuvan. Curriculum opis sada uključuje prve principe, model prijetnji, generički Linux, jedan wallet, oporavak te naknadno odvojeno potpisivanje i opravdane politike.

Usklađeni su i client-side metadata hookovi kako hidratacija ne bi vratila stari opis nakon ispravnog prerendera. Početni HTML predložak i njegov WebSite/ProfilePage JSON-LD više nemaju stari homepage naslov/opis. Generator proizvodi canonical, Open Graph, Twitter i strukturirane podatke iz registryja. Provjereni su opisi i canonicali svih 14 javnih ruta te datumi u sitemapu.

Poveznice **View source** u zapisima članaka ispravljene su na stvarni poddirektorij `btcpavao-github-io/src/` u GitHub repozitoriju; dodana je provjera da ti izvori postoje.

## 12. llms.txt

Redoslijed je homepage → curriculum → quick practice → wallet guide → research/essays → support. Opisi objašnjavaju ulogu svakog odredišta. Dodana je sažeta preporuka arhitekture i napomena da je curriculum na engleskom.

Nepostojeće `/en/writing/` i `/en/support/` adrese nisu zadržane. Research vodi na `/en/bitcoin-core/#essays`, a support na `/support/`. Hrvatski link vodi na postojeći Core hub.

## 13. Sitemap, lastmod i cache signali

Deset sadržajno ili metapodatkovno ažuriranih registry zapisa koristi `2026-09-14`: homepage, EN/HR hub, curriculum, kratka vježba, wallet guide, Long Road, BIP39 i EN/HR entropija. Izvorni datumi objave ostaju sačuvani. Multisig datum nije umjetno pomaknut.

Kanonski generator je `scripts/build-static-routes.mjs`, pozvan kroz `npm run build`; proizvodi 14 prerenderiranih ruta, 404, sitemap i feed. Generirani `dist/sitemap.xml` potvrđen je prema registryju. Stari statički `public/sitemap.xml` nije ručno mijenjan: generator ga u konačnom buildu zamjenjuje. Nova social kartica dobila je novu adresu prema sadržajnom hashu.

## 14. Pronađen zastarjeli sadržaj i postupanje

Pretraženi su traženi izrazi u cijelom repozitoriju, uključujući dokumentaciju i arhivu. Tehnički identifikatori, nazivi datoteka, ikona `Dice5` i programski `details` nisu tretirani kao preporuke. Smisleni nalazi razvrstani su ovako:

| Mjesto / nalaz | Razred | Postupak |
|---|---|---|
| Homepage: custodial servis kao faza učenja | C | Zamijenjen jednokratnom praksom bez pravog bitcoina i novim ključevima za stvarnu upotrebu. |
| Homepage: „not the right answer for everyone” | C | Jasna dugoročna preporuka uz obrazloženje. |
| Homepage: stari redoslijed učenja i mehanika kao prvi koncept | C/D | Šest koraka; prijetnje i razlozi za Core prije rada s walletom. |
| Homepage: „Full tutorial”, „Quick guide”, CTA prema kratkoj vježbi | D | Canonical learning path, focused reference i primarni link na curriculum. |
| Hub: kratka vježba → recovery guide → curriculum | C/D | Curriculum prvi; ostala dva su praktične reference. |
| Hrvatski hub: stari redoslijed engleskih linkova | D | Ista nova hijerarhija. |
| Header i footer: Start Here prvi | D | Curriculum prvi na desktopu i mobitelu. |
| Eseji: link na nepostojeći `#essays` | D | Dodan stvarni anchor. |
| Quick practice: konceptualni „Start Here” | D | Sačuvan URL, izmijenjen javni naziv, opis, CTA i social kartica. |
| Quick practice: obećanje provjerenog backupa u ishodu | C | Precizan ograničeni ishod kratke vježbe. |
| Wallet guide: „at least eight” | C | Osam kao konzervativni zadani izbor, ne minimum. |
| Wallet guide: generički KeePassXC/dice savjet bez aktualnog postupka | C | Pregledani Debian paket i ugrađeni popis; kockice opcionalno s operativnim razlogom. |
| Wallet guide: neutralna hardware-wallet usporedba | C | Izolacija i ovisnosti objašnjene; jasna preporuka Linux/Core temelja. |
| Wallet guide: dva računala usred osnovnog postupka | C | Premješteno iza jednog walleta i oporavka. |
| Wallet guide: PSBT round trip kao sljedeći dokaz osnovnog oporavka | C | Prvo testno trošenje oporavljenim ključevima; PSBT poslije. |
| Wallet guide: stari `#lesson/9.1` | D | Važeće odredište curriculuma. |
| Wallet guide: završni poziv na financiranje vježbovnog walleta | C | Jednokratna praksa, curriculum i novi stvarni ključevi nakon učenja. |
| Long Road: iznos opravdava offline signer, uključujući bullet o significant holdings | C | Model prijetnji opravdava odvajanje. |
| Long Road: sadašnja neutralna preporuka i „simpler to me” | C | Jasno današnje stajalište uz sačuvanu povijesnu priču. |
| Long Road: povijesni wallet shopping, dice, multi-vendor, ranije dvojbe | A | Sačuvano; nova urednička napomena objašnjava evoluciju. |
| Long Road: BIP39 interoperabilnost i moguća funkcionalnost alternativa | B | Sačuvana tehnička preciznost, bez neutraliziranja preporuke. |
| BIP39: povijesna verzija 2.7.12, originalni EFF popis, jaka entropija | A/B | Sačuvano; novi odlomci povezuju s aktualnim Debian defaultom. |
| Multisig: iznos mijenja prijetnje, ali ne bira broj potpisa | B | Sačuvano bez prepisivanja članka. |
| Curriculum: opcionalne kockice, Tails, Fedora/ostali održavani sustavi, BIP39 i multi-vendor trošak | B | Pregledano u kontekstu v4.1; nema ponovnog arhitektonskog zahvata. |
| Curriculum: „not a universal recommendation” u odlomku o cloud backupu | B | Odnosi se na cloud, ne Core preporuku; sačuvano. |
| Wallet guide: mogućnost drugog održavanog Linuxa | B | Sačuvana uz uvjet održavanja i provjere istog postupka; Debian ostaje default. |
| Registry, client metadata, HTML predložak, llms redoslijed i stari datumi | D | Usklađeno i provjereno na produkcijskom izlazu. |
| Povijesni review dokumenti, arhiva i nekorišteni stari curriculum podaci | A | Sačuvani kao povijesni zapisi; ne određuju javnu kanonsku preporuku. |

## 15. Datoteke

Implementacijski commit mijenja 19 datoteka (putanje su relativne prema `btcpavao-github-io/`):

- `asset-sources/start-here-bitcoin-core-card.svg`
- `content/content-registry.mjs`
- `index.html`
- `package.json`
- `public/llms.txt`
- `public/start-here-bitcoin-core-card.png`
- `scripts/verify-assets.mjs`
- `scripts/verify-site-links.mjs` — nova provjera
- `src/App.tsx`
- `src/bip39-wrong-thing-human-readable.md`
- `src/bitcoin-core-curriculum-en.tsx`
- `src/bitcoin-core-start.tsx`
- `src/bitcoin-core-wallet-guide.tsx`
- `src/components/site-footer.tsx`
- `src/components/site-header.tsx`
- `src/components/technical-article-info.tsx`
- `src/homepage.tsx`
- `src/long-road-article.tsx`
- `src/long-road-back-to-bitcoin-core.md`

Ovaj izvještaj zasebna je dokumentacijska datoteka u `docs/`.

## 16. Build, testovi i vizualna provjera

| Provjera | Rezultat |
|---|---|
| `npm run build` | Prolazi: TypeScript, Vite client/SSR, 14 javnih ruta, 404, sitemap i RSS. Postojeća SSR upozorenja o istodobnim statičkim i dinamičkim importima nisu greške. |
| `npm run lint` | Prolazi. |
| `npm run verify:curriculum` | Prolazi svih 22 provjere: 87 lekcija, 57 obveznih, 10 milestoneova, v4 migracija, stari bookmarki i novi v4.1 preduvjeti. |
| `npm run verify` | Prolazi: crawlable routes, 38 skupova responsive slika, social hashovi i ažurirane string/strukturne provjere. |
| Nova `verify:links` | Prolazi: 555 internih linkova u 20 HTML datoteka i llms-u, 87 lesson odredišta, registry metadata i sitemap za 14 ruta; provjerene i repo poveznice izvora članaka. Uključena u `npm run verify`. |
| `git diff --check` | Prolazi. |
| Prerender i hidratacija | Naslovi i opisi odgovaraju registryju; client ih ne vraća na stari copy. Lekcije i dalje mogu imati vlastiti aktivni naslov. |
| Desktop/mobitel | 11 Core/home ruta pregledano na 1440, 390 i 320 px. Bez horizontalnog overflowa i bez zabilježenih browser grešaka. |
| Rubovi i CTA-ovi | Na 320 px otkrivene i ispravljene odrezane homepage kartice/CTA-ovi i duga poveznica kratke vježbe. Ponovno provjerena tri promijenjena prikaza na svim širinama. Preostali heuristički kandidati su separator uz novinski popis i kompaktni progress indikator; vizualno nema dodira teksta s rubovima sadržajnih kartica. |
| Header/footer | Potvrđeni desktop i mobilni redoslijed, fokus pri otvaranju, Escape i footer odredišta. |
| Stvarno spremanje napretka | Klikom dovršena prva curriculum lekcija: četiri potvrde čitanja, checklist i completion `0.1` ostali su jednaki nakon reloada. Korak wallet vodiča također ostaje označen nakon reloada. Testovi koriste izolirani lokalni profil. |

Nije promijenjen sadržaj nijedne curriculum lekcije, v4 manifest ni progress/migration implementacija. Izvorni screenshotovi wallet aplikacija sačuvani su. Nova slika za dijeljenje kratke vježbe vizualno je pregledana nakon renderiranja SVG izvora.

## 17. Deployment

Push na `main` je uspio. [GitHub Pages run 34834877380](https://github.com/btcpavao/btcpavao.github.io/actions/runs/34834877380) uspješno je izgradio i objavio commit `92e04f97b6cdf8296b77ec8880ffc793e85ba954`; deployment je završen 14. rujna 2026. u 10:47:42 UTC (12:47:42 po zagrebačkom vremenu).

Javna provjera završena je u 10:52:00 UTC (12:52:00 Zagreb). Svih 14 dohvaćenih javnih HTML dokumenata **byte-identično je lokalno provjerenom produkcijskom buildu**. Naslovi, opisi, canonicali i očekivani novi tekstovi odgovaraju. `llms.txt`, `sitemap.xml` i `robots.txt` također su identični lokalnom izlazu. U pregledniku je dodatno potvrđena nova hijerarhija na javnom Core hubu nakon hidratacije.

[Strojno čitljivi dokazi javne provjere](site-wide-copy-live-verification-2026-09-14.json) sadrže URL-ove, statuse, SHA-256 i rezultate usporedbe. Izvještaj i dokazi spremljeni su zasebnim dokumentacijskim commitom s `[skip ci]`; nisu promijenili objavljeni site. Taj commit ne zahtijeva novu Pages objavu. Nije zatečen stale javni sadržaj nakon deploymenta.

## 18. Javni URL-ovi

| Javni URL | HTTP | Rezultat |
|---|---:|---|
| [/](https://btcpavao.com/) | 200 | Identičan provjerenom buildu; metapodaci i tekst potvrđeni. |
| [/hr/](https://btcpavao.com/hr/) | 200 | Identičan provjerenom buildu; metapodaci i tekst potvrđeni. |
| [/hr/bitcoin-core/](https://btcpavao.com/hr/bitcoin-core/) | 200 | Identičan provjerenom buildu; metapodaci i tekst potvrđeni. |
| [/hr/bitcoin-core/kako-bitcoin-core-generira-entropiju-kada-napravimo-novi-wallet/](https://btcpavao.com/hr/bitcoin-core/kako-bitcoin-core-generira-entropiju-kada-napravimo-novi-wallet/) | 200 | Identičan provjerenom buildu; metapodaci i tekst potvrđeni. |
| [/en/bitcoin-core/](https://btcpavao.com/en/bitcoin-core/) | 200 | Identičan provjerenom buildu; metapodaci i tekst potvrđeni. |
| [/en/bitcoin-core/self-custody/](https://btcpavao.com/en/bitcoin-core/self-custody/) | 200 | Identičan provjerenom buildu; metapodaci i tekst potvrđeni. |
| [/en/bitcoin-core/start-here/](https://btcpavao.com/en/bitcoin-core/start-here/) | 200 | Identičan provjerenom buildu; metapodaci i tekst potvrđeni. |
| [/en/bitcoin-core/wallet-setup-backup-recovery/](https://btcpavao.com/en/bitcoin-core/wallet-setup-backup-recovery/) | 200 | Identičan provjerenom buildu; metapodaci i tekst potvrđeni. |
| [/en/bitcoin-core/bip39-made-the-wrong-thing-human-readable/](https://btcpavao.com/en/bitcoin-core/bip39-made-the-wrong-thing-human-readable/) | 200 | Identičan provjerenom buildu; metapodaci i tekst potvrđeni. |
| [/en/bitcoin-core/how-bitcoin-core-generates-entropy-when-you-create-a-new-wallet/](https://btcpavao.com/en/bitcoin-core/how-bitcoin-core-generates-entropy-when-you-create-a-new-wallet/) | 200 | Identičan provjerenom buildu; metapodaci i tekst potvrđeni. |
| [/en/bitcoin-core/the-long-road-back-to-bitcoin-core/](https://btcpavao.com/en/bitcoin-core/the-long-road-back-to-bitcoin-core/) | 200 | Identičan provjerenom buildu; metapodaci i tekst potvrđeni. |
| [/en/bitcoin-core/multisig-is-not-a-dollar-amount/](https://btcpavao.com/en/bitcoin-core/multisig-is-not-a-dollar-amount/) | 200 | Identičan provjerenom buildu; metapodaci i tekst potvrđeni. |
| [/support/](https://btcpavao.com/support/) | 200 | Identičan provjerenom buildu; metapodaci i tekst potvrđeni. |
| [/support/thank-you/](https://btcpavao.com/support/thank-you/) | 200 | Identičan provjerenom buildu; metapodaci i tekst potvrđeni. |
| [/llms.txt](https://btcpavao.com/llms.txt) | 200 | Identično buildu. |
| [/sitemap.xml](https://btcpavao.com/sitemap.xml) | 200 | Identično buildu. |
| [/robots.txt](https://btcpavao.com/robots.txt) | 200 | Identično buildu. |
| [/en/writing/](https://btcpavao.com/en/writing/) | 404 | Nepostojeća stara adresa; uklonjena iz llms.txt. |
| [/en/support/](https://btcpavao.com/en/support/) | 404 | Nepostojeća stara adresa; uklonjena iz llms.txt. |
| [/hr/bitcoin-core/self-custody/](https://btcpavao.com/hr/bitcoin-core/self-custody/) | 200 | Sačuvana skripta preusmjeravanja na engleski curriculum. |
