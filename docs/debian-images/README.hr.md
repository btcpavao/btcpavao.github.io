# Kako provjeriti Bitcoin Core Vault i Node i ponoviti izgradnju ISO-a

Za početak možeš provjeriti preuzetu datoteku i pregledati izvorni kod bez instaliranja Vaulta ili Nodea. Za cijelu izgradnju trebat će ti zasebno Linux računalo ili virtualni stroj. Sve korake radi na računalu za testiranje. Novčanik, privatni ključ, passphrase i USB sa sigurnosnim kopijama ostavi izvan njega.

**SHA-256** je otisak datoteke od 64 znaka. Kada promijeniš jedan bajt, mijenja se i otisak. **Commit** je oznaka točno određene verzije izvornog koda u Gitu. Za provjeru preuzetog ISO-a uspoređuješ svoj otisak s potpisanim popisom izdavača. Za provjeru izgradnje računaš otisak još jedne datoteke – ISO-a koji si sam izgradio iz odabranog commita.

## 1. Pripremi računalo

Otvori Terminal na svježem Debianu 13 za Intel ili AMD (amd64). Kopiraj naredbe jednu po jednu. Prve dvije instaliraju alate. Sljedeće preuzimaju javno objavljeni program za provjeru. Zadnja naredba prikazuje njegov kod. Za povratak u terminal pritisni `q`.

```sh
sudo apt update
sudo apt install git python3 gnupg curl less xorriso squashfs-tools
git clone --depth 1 --filter=blob:none --sparse https://github.com/btcpavao/btcpavao.github.io.git provjera
cd provjera
git sparse-checkout set docs/debian-images
cd docs/debian-images
less check_release.py
```

Prije provjere potvrdi **cijeli otisak javnog PGP ključa** putem kanala kojem već vjeruješ, primjerice izravno s Pavaom. Treba se podudarati s ovim otiskom i s vrijednošću `SIGNER` u programu.

```text
787A 2AAF B0D1 19CA 0522 B2A5 B9C9 9AF8 5788 96D0
```

## 2. Preuzmi izvore i provjeri potpis

Odaberi naredbu za izdanje koje te zanima. Možeš pokrenuti i obje.

```sh
python3 check_release.py vault v0.5.0
python3 check_release.py node v0.1.0-rc.2
```

Program provjerava potpis popisa `SHA256SUMS` i računa otiske preuzetih datoteka. Uz svaku provjerenu datoteku piše `OK` ili `Verified existing file`. Redak `Source revision` ispisuje točan commit. Arhivu izvora pronaći ćeš u `release-checks/vault/v0.5.0/` ili `release-checks/node/v0.1.0-rc.2/`. Ako provjera završi greškom, sačuvaj poruku i zaustavi se na tom koraku.

## 3. Provjeri ISO i usporedi programske datoteke s izvorima

Preuzmi ISO za odabrano izdanje i spremi ga u mapu `Downloads`. Ako preglednik koristi drugu mapu, u sljedećoj naredbi zamijeni putanju do datoteke. [Preuzimanje Vaulta](https://github.com/btcpavao/bitcoin-core-vault-releases/releases/tag/v0.5.0) · [Preuzimanje Nodea](https://github.com/btcpavao/bitcoin-core-node-releases/releases/tag/v0.1.0-rc.2)

```sh
python3 check_release.py vault v0.5.0 --iso ~/Downloads/bitcoin-core-vault-32.1-practical-guide-20261110-amd64.iso --inspect
python3 check_release.py node v0.1.0-rc.2 --iso ~/Downloads/bitcoin-core-node-v0.1.0-rc.2-core32.1-amd64.iso --inspect
```

Svaka naredba prvo provjerava otisak cijelog ISO-a. Opcija `--inspect` zatim otvara njegov komprimirani datotečni sustav i uspoređuje datoteke koje projekt izravno dodaje iz izvornog arhiva. Računaj na 2 GiB privremenog prostora. U ovim izdanjima očekuj `MATCH` za **162 datoteke kod Vaulta** i **227 kod Nodea**. To obuhvaća i kod koji Vault koristi za provjeru pohrane novčanika i kod kojim Node radi backup. Dodatni paketi, dozvole datoteka, pokretanje sustava i eventualne druge datoteke traže zasebnu provjeru.

## 4. Pogledaj što je promijenjeno

- **Vault.** Otvori [usporedbu v0.4.0 i v0.5.0](https://github.com/btcpavao/bitcoin-core-vault-releases/compare/v0.4.0...v0.5.0). Klikni na ime datoteke. Git označava dodane retke znakom `+`, a uklonjene znakom `-`. U odjeljku 3 [engleskog vodiča](README.md) možeš ponoviti usporedbu lokalno i provjeriti da obje oznake izdanja vode na commit iz potpisanog izvornog zapisa.
- **Node.** Kod ovih povijesnih izdanja stvarni izvor aplikacije nalazi se u zasebnoj arhivi uz svako izdanje. U [vodiču za Node](https://github.com/btcpavao/bitcoin-core-node-releases/blob/reproducible-builds/docs/REBUILD.hr.md) slijedi upute za `bash rebuild/release-diff`. Naredba provjerava potpise oba izdanja, otvara njihove izvore i prikazuje promjene između RC1 i RC2. Za primjer pogledaj `app/chain_backup.py`. Tu možeš vidjeti kako se promijenio završni dio backupa.

## 5. Izgradi ISO iz izvora

Vault v0.5.0 i Node v0.1.0-rc.2 imaju potpisane otiske povijesnih izdanja. Oba su nastala preradom ranije slike. Za njih još nije dokazana neovisna izgradnja s istim otiskom. Nove javne skripte polaze od zabilježenih izvora i određenih verzija Debianovih paketa. Njihov izlaz uspoređuje se s drugim primjerkom **istog kandidata**.

1. Otvori postupak za odabrani proizvod u tablici ispod. U njemu piše koliko prostora trebaš i kako pripremiti Docker u zasebnom virtualnom stroju.
2. Zapiši puni commit kandidata. Ako postupak ponavljaju dvije osobe, obje uzimaju isti commit. Ime grane može ostati isto dok se sadržaj mijenja.
3. Preuzmi javni repozitorij i prebaci se na taj commit kako piše u uputama. Pogledaj promjene i pokreni naredbu iz odgovarajućeg repozitorija.
4. Sačuvaj ISO, popis verzija paketa i dnevnik izgradnje. Zapiši iz kojeg direktorija uzimaš izgrađeni ISO kako ga pri usporedbi ne bi zamijenio s prethodno preuzetim.

| Proizvod | Upute i rezultati izgradnje | Naredba u mapi odabranog repozitorija |
| --- | --- | --- |
| Vault | [Upute](https://github.com/btcpavao/bitcoin-core-vault-releases/blob/build/reproducible-vault/docs/REBUILD.md) · [Izmjene i provjere](https://github.com/btcpavao/bitcoin-core-vault-releases/pull/2) | `bash tools/rebuild/build.sh ../vault-result` |
| Node | [Upute na hrvatskom](https://github.com/btcpavao/bitcoin-core-node-releases/blob/reproducible-builds/docs/REBUILD.hr.md) · [Izmjene i provjere](https://github.com/btcpavao/bitcoin-core-node-releases/pull/1) | `bash rebuild/node build ../node-result` |

## 6. Usporedi rezultat

U Terminal upiši `sha256sum ` s razmakom na kraju. Povuci svoj novoizgrađeni ISO iz mape s rezultatom u terminal i pritisni Enter. Usporedi svih 64 znakova s otiskom koji je dobila druga osoba za isti commit. Ako imaš oba ISO-a, `cmp prvi.iso drugi.iso` provjerava svaki bajt. Upotrijebi stvarne putanje do datoteka. Kad se podudaraju, `cmp` završava bez ispisa s izlaznim kodom 0.

U kartici **Checks** na GitHubu potraži završni posao `compare` za odabrani commit. Dvije izgradnje moraju završiti i njihova usporedba mora proći. Kada za taj ISO bude dostupan PGP-potpisani manifest, opcijom `--iso` provjeri upravo datoteku koju si izgradio. Ako se otisci razlikuju, sačuvaj oba otiska, puni commit i logove. Program `diffoscope` može otvoriti oba ISO-a kako bi pronašao prvu razliku. Jednak otisak povezuje objavljene bajtove s pregledanim postupkom. Za procjenu sigurnosti i dalje je važno pročitati što kod radi.

**Primjer pitanja za LLM**

> Radim na svježem Debianu 13 amd64 i prvi put koristim Git. Vodi me kroz ovaj vodič jednu naredbu po jednu. Prije svake mi reci u kojoj mapi trebam biti, što naredba preuzima ili stvara i kako izgleda uspješan rezultat. Pričekaj moj ispis. Ako nešto ne odgovara, pokaži mi gdje je zapelo. Pri usporedbi označi koji sam ISO preuzeo, a koji sam izgradio. Za tvrdnju o izmjeni koda pokaži mi datoteku i redak.

LLM-u je dovoljan javni kod, poruka greške ili ispis otiska datoteke. Za ovaj posao nisu mu potrebni podaci iz tvog novčanika.
