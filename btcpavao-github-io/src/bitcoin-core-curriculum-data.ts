export type CurriculumStatus = "published" | "in-progress" | "planned"
export type CurriculumLevel = "beginner" | "intermediate" | "advanced"

export type CurriculumSource = {
  label: string
  url: string
}

export type CurriculumCodeBlock = {
  id: string
  title: string
  code: string
  explanation: string
  parameters?: Array<{ name: string; explanation: string }>
  warning?: string
}

export type CurriculumLesson = {
  id: string
  title: string
  summary: string
  status: CurriculumStatus
  what?: string
  why?: string
  risk?: string
  concepts?: string[]
  warnings?: string[]
  notes?: string[]
  technicalDetails?: string
  checklist?: string[]
  codeBlocks?: CurriculumCodeBlock[]
  sources?: CurriculumSource[]
  videoUrl?: string | null
  image?: { src: string; alt: string }
  badges?: string[]
}

export type CurriculumModule = {
  id: string
  title: string
  subtitle: string
  level: CurriculumLevel
  status: CurriculumStatus
  estimatedTime: string
  prerequisites: string[]
  lessons: CurriculumLesson[]
  videoUrl: string | null
  warnings: string[]
  checklist: string[]
}

const coreRepository: CurriculumSource = {
  label: "Bitcoin Core izvorni kod i dokumentacija",
  url: "https://github.com/bitcoin/bitcoin",
}

const managingWallets: CurriculumSource = {
  label: "Bitcoin Core: Managing the Wallet",
  url: "https://github.com/bitcoin/bitcoin/blob/master/doc/managing-wallets.md",
}

const descriptors: CurriculumSource = {
  label: "Bitcoin Core: Output Descriptors",
  url: "https://github.com/bitcoin/bitcoin/blob/master/doc/descriptors.md",
}

const psbt: CurriculumSource = {
  label: "Bitcoin Core: PSBT Howto",
  url: "https://github.com/bitcoin/bitcoin/blob/master/doc/psbt.md",
}

const bitcoinWhitepaper: CurriculumSource = {
  label: "Bitcoin: A Peer-to-Peer Electronic Cash System",
  url: "https://bitcoincore.org/bitcoin.pdf",
}

function outlineLessons(
  moduleId: string,
  titles: string[],
  status: CurriculumStatus,
  summary: string
): CurriculumLesson[] {
  return titles.map((title, index) => ({
    id: `${moduleId}.${index + 1}`,
    title,
    summary,
    status,
    videoUrl: null,
  }))
}

export const curriculumModules: CurriculumModule[] = [
  {
    id: "0",
    title: "Prije softvera: što zapravo štitimo?",
    subtitle:
      "Sigurnosni model dolazi prije izbora walleta, uređaja ili backupa.",
    level: "beginner",
    status: "published",
    estimatedTime: "35 min",
    prerequisites: ["Nema preduvjeta"],
    videoUrl: null,
    warnings: [
      "Ovaj modul ne traži instalaciju ni stvarne bitcoine. Cilj je prvo nacrtati sustav i njegove rizike.",
    ],
    checklist: [
      "Mogu objasniti razliku između privatnog ključa, walleta i nodea",
      "Zapisao sam tri rizika koji su za mene najvažniji",
      "Znam koji dio sustava još ne razumijem dovoljno dobro",
    ],
    lessons: [
      {
        id: "0.1",
        title: "Što je Bitcoin self-custody?",
        summary:
          "Self-custody znači da ti kontroliraš ključeve koji mogu autorizirati potrošnju, ali pouzdan sustav uključuje i provjeru stanja, backup te recovery.",
        status: "published",
        what: "Razdvajamo uloge privatnog ključa, walleta, nodea, blockchaina, UTXO-a, potpisivanja i objave transakcije.",
        why: "Ako znaš koja komponenta što radi, možeš promijeniti ili obnoviti jedan dio bez nagađanja o cijelom sustavu.",
        risk: "Brkanje walleta s nodeom ili backupa s passphraseom može stvoriti lažan osjećaj sigurnosti i neupotrebljiv recovery plan.",
        concepts: [
          "Privatni ključ autorizira potrošnju određenog outputa.",
          "Wallet organizira ključeve, adrese, transakcije i pripadajuće metapodatke.",
          "Node samostalno provjerava pravila i stanje blockchaina.",
          "UTXO je nepotrošeni transakcijski output koji novi input može potrošiti.",
          "Signing stvara kriptografski dokaz autorizacije; broadcast šalje valjanu transakciju mreži.",
        ],
        technicalDetails:
          "Držanje ključa i provjera blockchaina dvije su različite sigurnosne funkcije. Offline signer može čuvati i koristiti privatni ključ bez kopije blockchaina, dok online node može provjeravati i objavljivati transakcije bez privatnih ključeva.",
        checklist: [
          "Mogu vlastitim riječima objasniti što privatni ključ radi",
          "Mogu objasniti zašto wallet i node nisu ista stvar",
          "Mogu razlikovati signing od broadcasta",
        ],
        sources: [bitcoinWhitepaper, coreRepository],
        videoUrl: null,
      },
      {
        id: "0.2",
        title: "Threat model",
        summary:
          "Threat model nije popis svih mogućih katastrofa, nego odluka od kojih se rizika štitiš, kojim redoslijedom i uz koji trošak.",
        status: "published",
        what: "Popisujemo gubitak uređaja, kvar medija, zaboravljen passphrase, malware, kompromitirano online računalo, supply-chain i firmware rizik, fizičku krađu, ljudsku pogrešku i loš backup.",
        why: "Ne postoji jedan univerzalno najbolji setup. Ovaj kurikulum optimizira za dugoročnu štednju, razumljivost, manje povjerenja u treće strane i ponovljiv recovery.",
        risk: "Sustav koji štiti od vrlo rijetkog napada, ali povećava vjerojatnost svakodnevne ljudske pogreške, može ukupno biti lošiji.",
        concepts: [
          "Vjerojatnost: koliko je scenarij realan u tvojem okruženju?",
          "Posljedica: što se događa ako se scenarij ostvari?",
          "Detekcija: kako ćeš znati da se problem dogodio?",
          "Oporavak: koji provjereni postupak vraća sustav u ispravno stanje?",
        ],
        notes: [
          "Threat model se mijenja s iznosom, životnim okolnostima, lokacijom, ljudima uključenima u recovery i tehnologijom koju koristiš.",
        ],
        checklist: [
          "Zapisao sam rizik s najvećom vjerojatnošću",
          "Zapisao sam rizik s najvećom posljedicom",
          "Za oba rizika znam kako bih testirao recovery",
        ],
        sources: [managingWallets],
        videoUrl: null,
      },
      {
        id: "0.3",
        title: "Sigurnost nije samo kriptografija",
        summary:
          "Kriptografija može biti besprijekorna, a operativni sustav svejedno krhak ako korisniku dopušta nejasne, neprovjerene ili nepovratne korake.",
        status: "published",
        what: "Promatramo cijeli sustav: uređaje, ljude, postupke, oznake, lokacije, navike provjere i način donošenja odluka.",
        why: "Najvažnija zaštita često nije nova kriptografska funkcija nego jasna procedura koju možeš ponoviti pod stresom.",
        risk: "Previše tajni, neoznačeni backupi, nedokumentirane derivacije i recovery koji postoji samo u nečijem sjećanju stvaraju pojedinačne točke kvara.",
        notes: [
          "Složenost je sigurnosni trošak. Dodaj je samo kada rješava jasno imenovan problem.",
        ],
        checklist: [
          "Mogu navesti jednu operativnu pogrešku koju kriptografija ne sprječava",
          "Znam tko osim mene mora razumjeti recovery postupak",
        ],
        sources: [managingWallets],
        videoUrl: null,
      },
    ],
  },
  {
    id: "1",
    title: "Zašto ovaj vodič počinje s Bitcoin Coreom?",
    subtitle:
      "Poštena usporedba sigurnosnih filozofija, broja odluka i operativnih tradeoffa.",
    level: "beginner",
    status: "published",
    estimatedTime: "55 min",
    prerequisites: ["Modul 0"],
    videoUrl: null,
    warnings: [
      "Ovaj modul ne proglašava druge wallete nesigurnima. Uspoređuje njihov UX i pretpostavke za konkretan threat model.",
    ],
    checklist: [
      "Razumijem zašto targetedness uređaja može biti dio threat modela",
      "Mogu objasniti prednosti hardware walleta, Sparrowa i Electruma",
      "Znam zašto ovaj put počinje s manjim brojem odluka",
    ],
    lessons: [
      {
        id: "1.1",
        title: "Hardware wallet pristup",
        summary:
          "Hardware wallet izolira signing ključ i mnogim korisnicima znatno pojednostavnjuje self-custody. Istodobno uvodi specijalizirani uređaj, firmware, supply chain i vendor dependency u threat model.",
        status: "published",
        what: "Odvajamo stvarne prednosti izoliranog signera od rizika koji proizlaze iz ciljanog, specijaliziranog uređaja.",
        why: "Odabir ne počinje pitanjem koji je proizvod 'najsigurniji', nego koje rizike želimo smanjiti i koje nove ovisnosti prihvaćamo.",
        risk: "Pogrešan zaključak bio bi da su hardware walleti automatski nesigurni. Ovdje je riječ o izboru arhitekture, ne univerzalnoj presudi.",
        notes: [
          "Hardware wallet može biti vrlo razuman izbor. Ovaj kurikulum samo želi da korisnik prvo razumije sustav koji može izgraditi i obnoviti bez vendor-specifičnog uređaja.",
        ],
        sources: [
          {
            label: "Bitcoin Core HWI projekt",
            url: "https://github.com/bitcoin-core/HWI",
          },
          managingWallets,
        ],
        videoUrl: null,
      },
      {
        id: "1.2",
        title: "Sparrow Wallet",
        summary:
          "Sparrow je moćan koordinator za hardware wallete, PSBT, multisig i descriptore. Ta fleksibilnost stručnjaku daje kontrolu, ali početniku izlaže više sigurnosno relevantnih odluka.",
        status: "published",
        what: "Promatramo policy type, script type, keystore, mnemonic standard i način povezivanja signera kao odvojene odluke.",
        why: "Kada vidiš broj odluka, lakše razumiješ zašto fleksibilan alat može biti izvrstan u kasnijoj fazi, ali zahtjevniji kao početna mentalna mapa.",
        risk: "Ručni unos ili samostalno smišljanje mnemonic riječi nije pouzdan izvor entropije. Alat treba generirati nasumičnost; čovjek je ne treba izmišljati.",
        warnings: [
          "Nikada ne upisuj stvarne seed riječi u web stranicu, poruku, bilješku u oblaku ili demonstraciju.",
        ],
        sources: [
          {
            label: "Sparrow Wallet: Quick Start Guide",
            url: "https://sparrowwallet.com/docs/quick-start.html",
          },
        ],
        videoUrl: null,
      },
      {
        id: "1.3",
        title: "Electrum",
        summary:
          "Electrum je zreo lagani wallet s vlastitim mnemonic sustavom. Njegov model servera, seed backupa i lozinke razlikuje se od Bitcoin Corea.",
        status: "published",
        what: "Razdvajamo Electrum seed, enkripciju lokalne wallet datoteke i način na koji lagani wallet dobiva podatke o blockchainu.",
        why: "Usporedba pokazuje da dva kvalitetna alata mogu imati različite recovery modele i tražiti različito znanje od korisnika.",
        risk: "Pretpostavka da su svi mnemonic formati nativno isti može zakomplicirati recovery. Electrumov vlastiti seed sustav nije isto što i nativni BIP39 workflow.",
        sources: [
          {
            label: "Electrum: Seed Version System",
            url: "https://electrum.readthedocs.io/en/latest/seedphrase.html",
          },
        ],
        videoUrl: null,
      },
      {
        id: "1.4",
        title: "Zašto ovaj kurikulum ne počinje s mnemonic riječima?",
        summary:
          "BIP39 je standard za pretvaranje računalno generirane entropije u mnemonic i zatim u seed. Njegove velike prednosti su prenosivost i široka kompatibilnost.",
        status: "published",
        what: "Razlikujemo entropiju, mnemonic rečenicu, opcionalni BIP39 passphrase i seed iz kojeg wallet dalje izvodi ključeve.",
        why: "Mnemonic je operativni secret koji treba sigurno pohraniti, provjeriti i prenijeti kroz recovery. Ovaj početni put bira backup model Bitcoin Core walleta.",
        risk: "BIP39 nije način da čovjek smisli 'dovoljno nasumične' riječi. Sam BIP izričito opisuje prijenos računalno generirane nasumičnosti u ljudski čitljiv oblik.",
        notes: [
          "Ovo nije tvrdnja da je BIP39 matematički loš. To je odluka da početni model ima manje vrsta tajni i manje kompatibilnosnih pretpostavki.",
        ],
        sources: [
          {
            label: "BIP 39: Mnemonic code for generating deterministic keys",
            url: "https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki",
          },
        ],
        videoUrl: null,
      },
      {
        id: "1.5",
        title: "Core-first filozofija",
        summary:
          "Početni Core flow je kratak: Create Wallet → Encrypt Wallet → Backup Wallet → Restore Wallet. Svaki korak ima jasno mjesto u recovery modelu.",
        status: "published",
        what: "Najprije gradimo jednostavan testni sustav koji možemo objasniti od nastanka ključa do provjerenog restora.",
        why: "Manji broj početnih odluka ostavlja više pažnje za ono što se ne smije preskočiti: enkripciju, backup, recovery i dokumentiranje.",
        risk: "Jednostavniji onboarding nije automatski kompletna sigurnost. Malware, kompromitirani OS, fizička sigurnost i loša procedura i dalje ostaju stvarni rizici.",
        technicalDetails:
          "Bitcoin Core stvara descriptor wallet iz vlastitog sigurnog RNG procesa, može enkriptirati privatne ključeve passphraseom, napraviti wallet backup te ga vratiti kroz restore postupak. Detalji o datotekama, verziji Corea i descriptorima ostaju dio dokumentiranog recovery paketa.",
        checklist: [
          "Mogu navesti sva četiri početna Core koraka",
          "Mogu objasniti što svaki korak štiti",
          "Znam da ću koristiti samo testni wallet dok recovery nije provjeren",
        ],
        sources: [managingWallets],
        videoUrl: null,
      },
    ],
  },
  {
    id: "2",
    title: "Bitcoin Core: temeljni mentalni model",
    subtitle:
      "Node, wallet, blockchain i signer dobivaju jasne, odvojene uloge.",
    level: "beginner",
    status: "published",
    estimatedTime: "60 min",
    prerequisites: ["Modul 0", "Modul 1"],
    videoUrl: null,
    warnings: [
      "RPC primjeri u ovom modulu koriste Signet i očito testno ime walleta. Ne kopiraj naredbe u setup sa stvarnim sredstvima bez razumijevanja svakog parametra.",
    ],
    checklist: [
      "Mogu nacrtati online node i offline signer kao dvije odvojene uloge",
      "Razumijem zašto offline signer ne treba sinkronizirati blockchain",
      "Mogu razlikovati hot, watch-only i signing wallet",
    ],
    lessons: [
      {
        id: "2.1",
        title: "Bitcoin Core nije samo wallet",
        summary:
          "Bitcoin Core sadrži node koji provjerava pravila i mrežno stanje te opcionalne wallete koji prate i potpisuju sredstva.",
        status: "published",
        what: "Odvajamo funkciju konsenzusne validacije od funkcije upravljanja ključevima.",
        why: "Možeš koristiti node bez privatnih ključeva, više walleta uz isti node ili offline wallet bez aktivnog nodea.",
        risk: "Ako sve zoveš 'walletom', postaje nejasno što backupirati, što može biti online i koja komponenta uopće provjerava blockchain.",
        sources: [coreRepository],
        videoUrl: null,
      },
      {
        id: "2.2",
        title: "Node vs wallet",
        summary:
          "Node odgovara na pitanja o lancu i mreži. Wallet odgovara na pitanja o vlastitim descriptorima, adresama, UTXO-ima i mogućnosti potpisivanja.",
        status: "published",
        what: "U Signet okruženju uspoređujemo node RPC i wallet RPC bez korištenja tajnih podataka.",
        why: "Različiti RPC konteksti pokazuju da node i wallet nisu samo dvije kartice istog sučelja, nego različite odgovornosti.",
        risk: "Naredba usmjerena pogrešnom walletu ili mreži može dati pogrešan kontekst. Prije svake radnje provjeri mrežu i aktivni wallet.",
        badges: ["SIGNET", "RPC", "TESTNI PRIMJER"],
        codeBlocks: [
          {
            id: "node-info",
            title: "Provjeri node na Signetu",
            code: "bitcoin-cli -signet getblockchaininfo",
            explanation:
              "Čita informacije o lancu koji node trenutačno prati. Ne pristupa privatnim ključevima.",
            parameters: [
              {
                name: "-signet",
                explanation: "Bira Signet testnu mrežu umjesto mainneta.",
              },
              {
                name: "getblockchaininfo",
                explanation: "Vraća stanje lanca i sinkronizacije nodea.",
              },
            ],
          },
          {
            id: "wallet-info",
            title: "Provjeri očito testni wallet",
            code: 'bitcoin-cli -signet -rpcwallet="test-wallet" getwalletinfo',
            explanation:
              "Čita informacije iz walleta nazvanog test-wallet u Signet okruženju.",
            parameters: [
              {
                name: '-rpcwallet="test-wallet"',
                explanation: "Odabire testni wallet; naziv nije tajna.",
              },
              {
                name: "getwalletinfo",
                explanation: "Vraća status i svojstva odabranog walleta.",
              },
            ],
            warning:
              "Ako test-wallet ne postoji ili nije učitan, naredba će javiti pogrešku. Nemoj zbog toga mijenjati ili brisati postojeće wallete.",
          },
        ],
        sources: [
          {
            label: "Bitcoin Core RPC dokumentacija",
            url: "https://bitcoincore.org/en/doc/",
          },
        ],
        videoUrl: null,
      },
      {
        id: "2.3",
        title: "Full node vs pruned node",
        summary:
          "Oba modela potpuno provjeravaju pravila. Pruned node nakon validacije briše stare blokove i zadržava ograničen prozor podataka.",
        status: "published",
        what: "Biramo između dugoročnog čuvanja cijele povijesti blokova i smanjene potrošnje diska uz punu validaciju.",
        why: "Pruning omogućuje samostalnu provjeru na skromnijem hardveru, ali ograničava ponovno posluživanje starih blokova i neke recovery scenarije rescaniranja.",
        risk: "Pruned ne znači 'lagana provjera'. Node i dalje mora preuzeti i provjeriti lanac; razlika je u tome što kasnije zadržava na disku.",
        sources: [
          {
            label: "Bitcoin Core: Running a Full Node",
            url: "https://bitcoin.org/en/full-node",
          },
        ],
        videoUrl: null,
      },
      {
        id: "2.4",
        title: "Online Core vs potpuno offline Core",
        summary:
          "Online Core prima mrežne podatke, provjerava UTXO stanje i objavljuje transakcije. Offline Core može držati descriptor wallet s privatnim ključevima i potpisivati PSBT.",
        status: "published",
        what: "Dijelimo sustav prema najmanjim potrebnim ovlastima: online dio zna stanje, offline dio smije potpisati.",
        why: "Privatni ključ ne mora biti izložen mrežno povezanom računalu da bi Bitcoin ostao upotrebljiv.",
        risk: "Air-gap nije čarobna zaštita. Zlonamjeran USB, pogrešan PSBT ili neprovjerena odredišna adresa mogu prenijeti rizik preko granice.",
        sources: [psbt],
        videoUrl: null,
      },
      {
        id: "2.5",
        title: "Zašto offline signer ne mora sinkronizirati blockchain",
        summary:
          "PSBT može signeru prenijeti unsigned transakciju i podatke potrebne za pregled i potpis. Signer ne mora sam čuvati cijeli lanac.",
        status: "published",
        what: "Online coordinator priprema PSBT, offline signer provjerava ono što može i dodaje potpis, a online node finalizira i objavljuje transakciju.",
        why: "Odvajanje omogućuje da uređaj s ključevima ostane trajno bez mreže i bez IBD opterećenja.",
        risk: "Signer i dalje mora prikazati dovoljno informacija za razumnu provjeru iznosa, odredišta, naknade i change outputa.",
        sources: [psbt, descriptors],
        videoUrl: null,
      },
      {
        id: "2.6",
        title: "Što je wallet.dat / wallet directory",
        summary:
          "Suvremeni Bitcoin Core wallet živi u zasebnom direktoriju s bazom i pomoćnim datotekama; povijesni naziv wallet.dat nije dovoljan opis svih verzija i konfiguracija.",
        status: "published",
        what: "Učimo pronaći wallet directory i dokumentirati što se stvarno backupira u verziji Corea koju koristimo.",
        why: "Recovery se mora temeljiti na provjerenom backup postupku, a ne na sjećanju na jedan povijesni naziv datoteke.",
        risk: "Ručno kopiranje aktivnih baza ili nasumično premještanje datoteka može proizvesti neupotrebljivu kopiju. Koristi ugrađeni backup postupak i test restore.",
        sources: [
          {
            label: "Bitcoin Core: Files",
            url: "https://github.com/bitcoin/bitcoin/blob/master/doc/files.md",
          },
          managingWallets,
        ],
        videoUrl: null,
      },
      {
        id: "2.7",
        title: "Descriptor walleti",
        summary:
          "Descriptor izričito opisuje koje skripte, ključeve i derivacijske putanje wallet prati. Time postaje čitljiva mapa onoga što wallet smatra svojim.",
        status: "published",
        what: "Promatramo descriptor kao opis spending i derivacijskog modela, ne kao sinonim za privatni ključ.",
        why: "Descriptori olakšavaju watch-only, multisig, backup javne konfiguracije i precizniji recovery.",
        risk: "Descriptor može sadržavati osjetljive privatne podatke ako u njega uključiš xpriv/WIF. Ovaj kurikulum nikada neće tražiti da ih uneseš na web stranicu.",
        warnings: [
          "Javni descriptor može otkriti sve buduće adrese walleta i narušiti privatnost. Privatni descriptor može omogućiti krađu. Oboje tretiraj prema sadržaju.",
        ],
        sources: [descriptors],
        videoUrl: null,
      },
      {
        id: "2.8",
        title: "Hot wallet, watch-only wallet i offline signer",
        summary:
          "Hot wallet ima online ključeve, watch-only wallet prati sredstva bez ključeva, a offline signer drži ključeve izvan mreže i potpisuje pripremljene transakcije.",
        status: "published",
        what: "Svakoj komponenti dajemo samo podatke i ovlasti koje su joj potrebne.",
        why: "Razdvajanje smanjuje posljedice kompromitacije pojedinačnog uređaja i čini proceduru lakšom za audit.",
        risk: "Watch-only wallet nije tajan samo zato što ne može potpisivati: njegovi xpubovi/descriptori mogu otkriti cijelu povijest i buduće adrese.",
        checklist: [
          "Mogu opisati što kompromitacija hot walleta omogućuje",
          "Mogu opisati što kompromitacija watch-only walleta otkriva",
          "Mogu objasniti što offline signer mora provjeriti prije potpisa",
        ],
        sources: [managingWallets, descriptors, psbt],
        videoUrl: null,
      },
    ],
  },
  {
    id: "3",
    title: "Izrada prvog Bitcoin Core walleta",
    subtitle:
      "Praktični walkthrough u testnom okruženju, bez stvarnih sredstava.",
    level: "beginner",
    status: "in-progress",
    estimatedTime: "75 min",
    prerequisites: ["Moduli 0–2", "Računalo za vježbu"],
    videoUrl: null,
    warnings: ["Ovo nemoj raditi s pravim bitcoinima dok nisi završio test."],
    checklist: ["Napravio sam testni wallet"],
    lessons: outlineLessons(
      "3",
      [
        "Instalacija i verifikacija Bitcoin Corea",
        "Create Wallet",
        "Što se događa ispod površine",
        "Entropija, OS CSPRNG i Core RNG",
        "Generiranje prve receive adrese",
        "Razumijevanje wallet datoteke",
        "Prvi testni wallet",
      ],
      "in-progress",
      "Praktična lekcija je u izradi. Bit će objavljena tek nakon ponovljenog testa na podržanim operacijskim sustavima."
    ),
  },
  {
    id: "4",
    title: "Enkripcija walleta i passphrase",
    subtitle: "Što enkripcija štiti, što ne štiti i kako čuvati pristup.",
    level: "beginner",
    status: "in-progress",
    estimatedTime: "85 min",
    prerequisites: ["Modul 3", "Prazan testni wallet"],
    videoUrl: null,
    warnings: [
      "Ako izgubiš wallet passphrase, možeš trajno izgubiti pristup bitcoinima.",
      "Nikada ne unosi stvarni wallet passphrase ili KeePassXC master password na ovu web stranicu.",
    ],
    checklist: [
      "Razumijem što enkripcija ne štiti",
      "Imam odvojen plan za backup walleta i passphrasea",
      "Testirao sam postupak samo na praznom testnom walletu",
    ],
    lessons: outlineLessons(
      "4",
      [
        "Encrypt Wallet",
        "Što enkripcija štiti",
        "Što enkripcija ne štiti",
        "Kako napraviti jak passphrase",
        "Zašto ne koristiti memorabilne osobne fraze",
        "KeePassXC",
        "Generiranje passphrasea u KeePassXC-u",
        "KeePassXC baza",
        "Master password",
        "Backup KeePass baze",
      ],
      "in-progress",
      "Lekcija prolazi sigurnosnu i recovery provjeru prije objave."
    ),
  },
  {
    id: "5",
    title: "Backup koji stvarno radi",
    subtitle: "Redundancija, odvajanje tajni i plan koji može preživjeti kvar.",
    level: "beginner",
    status: "in-progress",
    estimatedTime: "100 min",
    prerequisites: ["Moduli 3–4", "Prazan testni wallet"],
    videoUrl: null,
    warnings: ["Jedna kopija na jednom mediju nije backup sustav."],
    checklist: [
      "Imam najmanje 2 wallet backupa",
      "Nalaze se na najmanje 2 fizička medija",
      "Nisu svi na istoj lokaciji",
      "Imam siguran backup passphrasea",
      "Znam gdje se sve kopije nalaze",
      "Recovery sam stvarno testirao",
    ],
    lessons: outlineLessons(
      "5",
      [
        "Backup Wallet",
        "Što je zapravo spremljeno",
        "Zašto jedna kopija nije backup",
        "Redundantni backup",
        "Različiti fizički mediji",
        "Geografski odvojene kopije",
        "Enkriptirani digitalni backup",
        "Čuvanje walleta i passphrasea odvojeno",
        "Backup KeePassXC baze",
        "Dokumentiranje vlastite recovery procedure",
      ],
      "in-progress",
      "Detaljni backup scenarij je u izradi i bit će popraćen testnim restoreom."
    ),
  },
  {
    id: "6",
    title: "Restore — najvažniji test",
    subtitle: "Backup koji nikada nisi restorirao samo je pretpostavka.",
    level: "beginner",
    status: "in-progress",
    estimatedTime: "90 min",
    prerequisites: ["Modul 5", "Testni backup bez stvarnih sredstava"],
    videoUrl: null,
    warnings: [
      "Restore vježbu radi bez stvarnih sredstava i bez prepisivanja postojećeg walleta ili backupa.",
    ],
    checklist: [
      "Pronašao sam backup",
      "Otvorio sam kopiju",
      "Wallet se učitao",
      "Odgovarajuće adrese su prisutne",
      "Passphrase radi",
      "Backup medij je čitljiv",
      "Napravljen je novi backup ako je potrebno",
    ],
    lessons: outlineLessons(
      "6",
      [
        "Restore Wallet",
        "Restore na drugom računalu",
        "Provjera adresa",
        "Provjera descriptor informacija",
        "Test restore bez stvarnih sredstava",
        "Godišnji recovery drill",
      ],
      "in-progress",
      "Recovery postupak još se testira na više platformi."
    ),
  },
  {
    id: "7",
    title: "Bitcoin adrese i script typeovi",
    subtitle:
      "Prepoznaj format, kompatibilnost, trošak i tradeoff svake adrese.",
    level: "beginner",
    status: "in-progress",
    estimatedTime: "65 min",
    prerequisites: ["Modul 2"],
    videoUrl: null,
    warnings: [
      "Prefiks adrese nije zamjena za provjeru cijele odredišne adrese.",
    ],
    checklist: [
      "Mogu razlikovati 1…, 3…, bc1q… i bc1p… adrese",
      "Znam da kompatibilnost i fee nisu jedini kriteriji",
    ],
    lessons: outlineLessons(
      "7",
      [
        "Legacy",
        "Nested SegWit",
        "Native SegWit",
        "Taproot",
        "Kako prepoznati adresu",
        "Fee implikacije",
        "Privatnost",
        "Kompatibilnost",
        "Što danas koristiti i zašto",
      ],
      "in-progress",
      "Vizualni vodič kroz adrese i tradeoffe trenutačno je u izradi."
    ),
  },
  {
    id: "8",
    title: "Offline signer",
    subtitle: "Jedan uređaj, jedna funkcija i provjerljiv prijenos podataka.",
    level: "intermediate",
    status: "in-progress",
    estimatedTime: "120 min",
    prerequisites: ["Moduli 0–7", "Testiran backup i restore"],
    videoUrl: null,
    warnings: [
      "Air-gap nije dokaz sigurnosti ako software, instalacija ili prijenosni medij nisu provjereni.",
    ],
    checklist: [
      "Signer nikada nije bio spojen na mrežu nakon pripreme",
      "Uređaj ima jednu dokumentiranu funkciju",
      "Znam kako provjeriti podatke prije potpisivanja",
    ],
    lessons: outlineLessons(
      "8",
      [
        "Zašto offline računalo",
        "Zašto signer ne treba blockchain",
        "Stari laptop kao dedicated signing appliance",
        "Linux",
        "Fedora/Debian i lagani desktopi",
        "Instaliranje Corea prije air-gapa",
        "Verificiranje softwarea",
        "Isključivanje mreže",
        "Opcionalno fizičko uklanjanje Wi-Fi uređaja",
        "Jedan uređaj — jedna funkcija",
        "Zašto stari ThinkPad može biti više nego dovoljan",
      ],
      "in-progress",
      "Vodič za pripremu offline uređaja prolazi hardversku i operativnu provjeru."
    ),
  },
  {
    id: "9",
    title: "Prva offline potpisana transakcija",
    subtitle: "PSBT od online coordinatora do offline potpisa i natrag.",
    level: "intermediate",
    status: "in-progress",
    estimatedTime: "120 min",
    prerequisites: ["Modul 8", "Signet sredstva", "Prazan offline signer"],
    videoUrl: null,
    warnings: ["Ovo nemoj raditi s pravim bitcoinima dok nisi završio test."],
    checklist: [
      "Kreirao sam unsigned PSBT na Signetu",
      "Provjerio sam iznose, fee i change prije potpisa",
      "Finalizirao sam i objavio samo testnu transakciju",
    ],
    lessons: outlineLessons(
      "9",
      [
        "Kreiranje unsigned transakcije / PSBT-a",
        "Prijenos na offline Core",
        "Pregled transakcije",
        "Potpisivanje",
        "Prijenos natrag na online Core",
        "Finalize",
        "Vlastita provjera",
        "Broadcast",
      ],
      "in-progress",
      "Cijeli PSBT walkthrough bit će objavljen nakon ponovljivog Signet testa."
    ),
  },
  {
    id: "10",
    title: "Operativna sigurnost",
    subtitle: "Siguran sustav mora ostati siguran tijekom stvarne uporabe.",
    level: "intermediate",
    status: "in-progress",
    estimatedTime: "90 min",
    prerequisites: ["Modul 9"],
    videoUrl: null,
    warnings: [
      "Uvijek prvo testiraj mali iznos i unaprijed definiraj što provjeravaš.",
    ],
    checklist: [
      "Provjeravam adresu na neovisnom prikazu",
      "Provjeravam change i fee prije potpisa",
      "Imam godišnji maintenance termin",
      "Znam što radim ako uređaj prestane raditi",
    ],
    lessons: outlineLessons(
      "10",
      [
        "Malware",
        "Fizička sigurnost",
        "Kompromitirani USB",
        "Provjera adrese prije potpisivanja",
        "Change address",
        "Fee sanity checks",
        "Testiranje malim iznosima",
        "Dokumentiranje procedure",
        "Godišnji maintenance",
        "Što napraviti ako uređaj umre",
      ],
      "in-progress",
      "Operativne procedure trenutačno se pretvaraju u provjerljive checkliste."
    ),
  },
  {
    id: "11",
    title: "Uvod u multisig",
    subtitle: "Najprije koncept, tek zatim descriptor i naredbe.",
    level: "intermediate",
    status: "in-progress",
    estimatedTime: "75 min",
    prerequisites: ["Moduli 0–10", "Pouzdan single-sig recovery"],
    videoUrl: null,
    warnings: [
      "Multisig uklanja neke pojedinačne točke kvara, ali uvodi nove metapodatke, koordinaciju i recovery obveze.",
    ],
    checklist: [
      "Mogu objasniti 2-of-3 bez spominjanja proizvoda",
      "Znam što descriptor dodaje recovery paketu",
      "Imam stvaran razlog za dodavanje multisiga",
    ],
    lessons: outlineLessons(
      "11",
      [
        "Zašto multisig",
        "Što znači 2-of-3",
        "Što dobivamo",
        "Što kompliciramo",
        "Tri nezavisna ključa",
        "Tri nezavisna signera",
        "Descriptor kao mapa walleta",
        "Što mora biti backupirano osim privatnih ključeva",
      ],
      "in-progress",
      "Konceptualne lekcije prolaze recovery review prije objave."
    ),
  },
  {
    id: "12",
    title: "2-of-3 SegWit multisig u Bitcoin Coreu",
    subtitle:
      "Jednostavan prvi multisig s tri signera i watch-only coordinatorom.",
    level: "advanced",
    status: "in-progress",
    estimatedTime: "4 h",
    prerequisites: ["Modul 11", "Tri testna signera", "Signet"],
    videoUrl: null,
    warnings: [
      "RPC naredbe neće biti označene kao objavljene dok cijeli disaster recovery walkthrough nije ponovljen od nule.",
    ],
    checklist: [
      "Sva tri coordinatora izvode iste receive adrese",
      "Dva signera mogu dovršiti testnu transakciju",
      "Treći signer može biti nedostupan bez gubitka sredstava",
    ],
    lessons: outlineLessons(
      "12",
      [
        "Generirati 3 zasebna signera",
        "Dohvatiti potrebne javne informacije",
        "Izgraditi descriptor",
        "Checksum",
        "Import descriptora",
        "Watch-only coordinator",
        "Receive adresa",
        "Test deposit",
        "Kreiranje PSBT-a",
        "Signer A",
        "Signer B",
        "Finalize",
        "Broadcast",
        "Recovery",
      ],
      "in-progress",
      "Ova RPC lekcija još nije objavljena. Ne koristi je kao operativnu proceduru."
    ),
  },
  {
    id: "13",
    title: "Multisig backup i recovery",
    subtitle: "Ključevi nisu cijela priča: treba obnoviti i mapu walleta.",
    level: "advanced",
    status: "in-progress",
    estimatedTime: "3 h",
    prerequisites: ["Modul 12", "Testni 2-of-3 setup"],
    videoUrl: null,
    warnings: [
      "Privatni ključevi bez descriptora, derivacijskih informacija i dokumentacije mogu učiniti recovery vrlo teškim ili nemogućim.",
    ],
    checklist: [
      "Backupirao sam sva tri testna signer walleta",
      "Backupirao sam descriptor i derivacijske informacije",
      "Recovery dokumentacija ne ovisi o mojem sjećanju",
      "Dovršio sam disaster recovery bez originalnog coordinatora",
    ],
    lessons: outlineLessons(
      "13",
      [
        "Individualni signer walleti",
        "Passphrase sustav",
        "Descriptor i checksum",
        "Derivacijske informacije",
        "Recovery dokumentacija",
        "Kompletan 2-of-3 disaster recovery walkthrough",
      ],
      "in-progress",
      "Recovery vodič još nije objavljen jer se testira potpuna obnova bez izvornog coordinatora."
    ),
  },
  {
    id: "14",
    title: "Taproot",
    subtitle: "Rastući modul o key pathu, script pathu i descriptorima.",
    level: "advanced",
    status: "in-progress",
    estimatedTime: "U procjeni",
    prerequisites: ["Moduli 0–13"],
    videoUrl: null,
    warnings: [
      "Ovaj modul nije gotov vodič. Ne pretpostavljaj da je Taproot automatski bolji za svaki setup.",
    ],
    checklist: [],
    lessons: outlineLessons(
      "14",
      [
        "Što Taproot mijenja",
        "Key path",
        "Script path",
        "Privatnost",
        "Učinkovitost",
        "Taproot descriptori",
        "Kada koristiti Taproot",
        "Tradeoffi",
      ],
      "in-progress",
      "Tema je u istraživanju i neće biti označena kao dovršena prije potpunog testa."
    ),
  },
  {
    id: "15",
    title: "Napredni self-custody",
    subtitle:
      "Politike trošenja za stvarne potrebe koje jednostavniji sustav ne rješava.",
    level: "advanced",
    status: "planned",
    estimatedTime: "Planirano",
    prerequisites: ["Pouzdan single-sig i multisig recovery"],
    videoUrl: null,
    warnings: [
      "Ne dodaj složenost prije nego što razumiješ jednostavniji sustav.",
    ],
    checklist: [],
    lessons: outlineLessons(
      "15",
      [
        "Miniscript",
        "Timelocks",
        "Recovery paths",
        "Inheritance",
        "Business treasury",
        "Family vault",
        "Multi-location signing",
        "Taproot multisig konstrukcije",
        "MuSig2 gdje je primjenjivo",
        "Napredne spending politike",
        "Emergency recovery",
        "Geografski distribuirani signeri",
      ],
      "planned",
      "Ova lekcija je na roadmapu i još nema operativne upute."
    ),
  },
  {
    id: "16",
    title: "Laboratorij",
    subtitle:
      "Izolirani eksperimenti za Signet, Regtest, RPC, descriptore i PSBT.",
    level: "intermediate",
    status: "in-progress",
    estimatedTime: "Kontinuirano",
    prerequisites: ["Ovisi o eksperimentu"],
    videoUrl: null,
    warnings: [
      "Laboratorij koristi Signet ili Regtest. Primjeri nisu upute za mainnet sredstva.",
    ],
    checklist: [
      "Znam na kojoj mreži izvodim eksperiment",
      "Eksperiment nema pristup walletu sa stvarnim sredstvima",
      "Zapisao sam ulaz, očekivani rezultat i stvarni rezultat",
    ],
    lessons: outlineLessons(
      "16",
      [
        "BEGINNER — prvi Signet RPC",
        "BEGINNER — Regtest blokovi i testni UTXO-i",
        "INTERMEDIATE — descriptor eksperiment",
        "INTERMEDIATE — testni multisig",
        "ADVANCED — PSBT debugging",
        "ADVANCED — novi Bitcoin Core featurei",
      ],
      "in-progress",
      "Eksperiment je u pripremi; razina će biti potvrđena uz objavljene preduvjete."
    ),
  },
  {
    id: "17",
    title: "Reference i daljnje učenje",
    subtitle:
      "Primarni izvori prije sažetaka, tutorijala i tuđih interpretacija.",
    level: "beginner",
    status: "in-progress",
    estimatedTime: "Kontinuirano",
    prerequisites: ["Nema preduvjeta"],
    videoUrl: null,
    warnings: [
      "Provjeri verziju dokumentacije i Bitcoin Corea prije primjene RPC primjera.",
    ],
    checklist: [
      "Znam pronaći RPC dokumentaciju za svoju verziju Corea",
      "Znam pronaći izvorni BIP umjesto prepričanog sažetka",
      "Bilježim verziju izvora uz vlastitu recovery dokumentaciju",
    ],
    lessons: [
      {
        id: "17.1",
        title: "Bitcoin Core dokumentacija i GitHub",
        summary: "Službene upute, izvorni kod, release notes i RPC reference.",
        status: "in-progress",
        sources: [
          coreRepository,
          {
            label: "Bitcoin Core RPC dokumentacija",
            url: "https://bitcoincore.org/en/doc/",
          },
          {
            label: "Bitcoin Core preuzimanje i verifikacija",
            url: "https://bitcoincore.org/en/download/",
          },
        ],
        videoUrl: null,
      },
      {
        id: "17.2",
        title: "BIP repozitorij",
        summary:
          "Izvorne specifikacije za BIP39, PSBT, Taproot, descriptore, MuSig2 i povezane standarde.",
        status: "in-progress",
        sources: [
          {
            label: "Bitcoin Improvement Proposals",
            url: "https://github.com/bitcoin/bips",
          },
        ],
        videoUrl: null,
      },
      {
        id: "17.3",
        title: "Reproducible builds i release verification",
        summary:
          "Provjera binarnih datoteka i razumijevanje što potpisi i reproducibilna gradnja stvarno dokazuju.",
        status: "in-progress",
        sources: [
          {
            label: "Bitcoin Core preuzimanje i verifikacija",
            url: "https://bitcoincore.org/en/download/",
          },
          {
            label: "Bitcoin Core Guix signatures",
            url: "https://github.com/bitcoin-core/guix.sigs",
          },
        ],
        videoUrl: null,
      },
    ],
  },
]

export const roadmapStages = [
  { label: "Osnove", modules: "0–2" },
  { label: "Single-sig", modules: "3–7" },
  { label: "Offline signing", modules: "8–10" },
  { label: "Multisig", modules: "11–13" },
  { label: "Taproot", modules: "14" },
  { label: "Napredne politike", modules: "15–17" },
]

export const curriculumSources = {
  descriptors,
  managingWallets,
  psbt,
}
