# Odvojena provjera tvrdnji i izvora — curriculum v4.2

Datum provjere: 2026-09-16. Opseg: nove i sadržajno promijenjene tvrdnje ovog passa. Ovo nije nova revizija svake zadržane povijesne tvrdnje ili incidenta iz v4.1. Postojeći datumi tehničke revizije nisu globalno prepisani.

## Ledger

| Tvrdnja / postupak | Primarni dokaz | Zaključak i granica |
| --- | --- | --- |
| Debian Stable je održavan, konzervativan temelj s dugom poviješću i velikim paketnim ekosustavom. | [Why Debian](https://www.debian.org/intro/why_debian), [Stable release](https://www.debian.org/releases/stable/) | Podržano. Odabir za ovaj curriculum je obrazložena urednička preporuka; nije tvrdnja da nestaje povjerenje u hardver/softver. |
| Debian je u trenutku provjere u obitelji 13 / trixie. | [Stable release](https://www.debian.org/releases/stable/) | Podržano. Novi sadržaj ne zaključava nepotreban minor broj OS-a. |
| Bez root lozinke instalater omogućuje sudo prvom korisniku. | [Debian installer, chapter 6.3](https://www.debian.org/releases/stable/amd64/ch06s03.en.html) | Podržano i izričito povezano s uvjetom iz instalacije. |
| Xfce je lagano desktop okruženje. | [Xfce project](https://www.xfce.org/) | Podržano. Kompatibilnost konkretnog starog PC-ja/ThinkPada treba provjeriti; nije obećana za svaki model. |
| `apt update`, `upgrade`, `show`, `install` služe prikazanim koracima. | [Debian apt(8)](https://manpages.debian.org/trixie/apt/apt.8.en.html) | Podržano dokumentacijom. APT promjene nisu izvođene na korisnikovu računalu. |
| Povjerenje u repozitorij, održavatelje i ovisnosti razlikuje se od pokretanja proizvoljne skripte. | [Debian Reference, package management](https://www.debian.org/doc/manuals/debian-reference/ch02.en.html) | Podržan model izvora paketa. Pedagoška usporedba ne tvrdi da je svaki third-party paket zlonamjeran. |
| Xfce postavke mogu se pregledati naredbom `xfconf-query -c xfce4-panel -l -v`. | [xfconf-query](https://docs.xfce.org/xfce/xfconf/xfconf-query), [Xfconf](https://docs.xfce.org/xfce/xfconf/start) | Podržano. Nakon provjere promijenjen primjer kanala na dokumentirani `xfce4-panel`. Ne preporučuje se pisanje XML-a dok je servis aktivan. |
| Num Lock na prijavi može poslužiti kao vježba istraživanja konkretnog sustava. | [Xfce keyboard settings](https://docs.xfce.org/xfce/xfce4-settings/keyboard) | Ograničena podrška: izvor objašnjava postavke tipkovnice, ne daje univerzalni Num Lock fix. Lekcija zato traži identifikaciju display managera, čitanje prijedloga, provjeru i test prijave; ne izmišlja univerzalnu naredbu. Izvor je nazvan “keyboard settings”, bez impliciranja posebne Num Lock dokumentacije. |
| SHA256 provjerava podudaranje bajtova; potpis autentificira checksum prema ključu kojem vjerujemo. Ni jedno ne dokazuje odsutnost zlonamjernog koda. | [Bitcoin Core download verification](https://bitcoincore.org/en/download/), [Debian image verification](https://www.debian.org/CD/verify) | Podržano. Lekcija izričito odvaja fingerprint/key trust, integritet i sigurnost samog programa. |
| Osnovne RPC operacije i mrežni/wallet kontekst mogu se pregledati kroz Core console/help. | Stvarni Core 31.1 `help` i RPC izvršavanja; [Core 31.1 wallet management](https://github.com/bitcoin/bitcoin/blob/v31.1/doc/managing-wallets.md) | Dokumentacija plus izvršavanje. Regtest dokazuje RPC ponašanje, ne korisnikov GUI ili fizičku instalaciju. |
| Dva signera mogu neovisno potpisati isti PSBT; `combinepsbt` spaja njihove podatke i omogućuje finalizaciju valjanog 2-of-3 trošenja. | Stvarni Core 31.1, [official combinepsbt RPC reference](https://bitcoincore.org/en/doc/31.0.0/rpc/rawtransactions/combinepsbt/), [Core 31.1 PSBT guide](https://github.com/bitcoin/bitcoin/blob/v31.1/doc/psbt.md) | Podržano izravnim testom. Web RPC referenca je 31.0; konačno sidro je izvršavanje baš 31.1. Testirani nepotpuni pojedinačni potpisi, spojeni potpisi, broadcast i potvrda. |
| Multisig prvenstveno određuje ovlaštenje za trošenje; recovery traži i podatke o politici. | [Core descriptors](https://github.com/bitcoin/bitcoin/blob/v31.1/doc/descriptors.md), postojeći Regtest recovery lab | Podržano. Preporuka da složenost mora opravdati svoj trošak je odluka o threat modelu, bez univerzalnog novčanog praga. |
| AI može objašnjavati naredbe i pomoći učenju, ali odgovor nije dokaz ispravnosti. | Urednički/pedagoški okvir; provjerljivi primjeri terminala/RPC-ja | Nije predstavljeno kao izmjereno smanjenje vremena učenja ili garancija. Zabranjeno je unositi seed, privatne ključeve, xprv, passphrase ili wallet.dat; offline signer ne spaja se radi AI-ja. |
| Čista ponovna instalacija, minimalni softver i recovery drill prethode produkciji. | Sigurnosni postupak kurikuluma, prethodni provjereni recovery workflow | Preporuka/procedura, ne tvrdnja da reinstall isključuje firmware rizik ili dokazuje čitav sustav sigurnim. |
| Pavaov okvir spaja budget, debt, giving, balance i volatilnost s custodyjem. | Postojeći homepage i pet izvornih poglavlja [Practical Bitcoin Standard](https://btcpavao.gitbook.io/practical-bitcoin-standard) | Točno pripisano autorovu okviru. Ciljne stranice provjerene HTTP dohvatom. Nema univerzalnog financijskog uvjeta za pristup tečaju niti jamstva buduće cijene. |
| Core Explorer treba pojednostaviti poznate operacije nakon razumijevanja. | Postojeći opis projekta i zadržane statusne oznake u curriculum sadržaju | Urednička pozicija. Nije provedena nova revizija Core Explorer koda ni sigurnosti, a repo nije diran. |

## Izvedeni testovi

`self-custody-v4.2-regtest-results.json` bilježi 64 uspješne provjere uz `completed: true`. Core je provjeren kao 310100, na Regtestu, bez peer mreže. Izvršena su i tri doslovna bloka naredbi iz multisig lekcije, s djelomičnim pa dovršenim PSBT-om, prihvaćanjem u mempool, broadcastom i jednom potvrdom.

Fizička Debian instalacija i odvajanje uređaja nisu testirani. Materijal ne označava te vježbe kao fizički potvrđene. Nije bilo pravih sredstava niti čitanja korisnikovih walleta.

## Ispravci iz ove odvojene provjere

1. Primjer Xfconf kanala usklađen je s dokumentiranim `xfce4-panel`.
2. Naslov izvora za tipkovnicu više ne implicira nedokumentirani Num Lock postupak.
3. Core RPC upute podijeljene su na pojedinačne korake, bez izmišljenog copy/paste placeholdera za provjeru stvarne adrese.
4. Dodani su izravni primarni izvori za installer/sudo i lightweight Xfce tvrdnju.
5. Samo promijenjena i ponovno testirana multisig lekcija dobila je novi praktični datum i precizan opseg testa.

Preostale granice su opisane uz tvrdnje; u novom sadržaju nije pronađena izmišljena referenca ili nepodržano tehničko jamstvo.
