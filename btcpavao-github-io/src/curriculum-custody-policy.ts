import type { PlayerLesson } from "@/bitcoin-core-curriculum-player-en-data"
import type { GuidedStep } from "@/curriculum-learning"

export const CUSTODY_CONTENT_UPDATED = "2026-09-13"
export const debianSources = [
  {
    label: "Debian · Stable releases and support",
    url: "https://www.debian.org/releases/",
  },
  {
    label: "Debian · Installation guide",
    url: "https://www.debian.org/releases/stable/amd64/",
  },
  {
    label: "Debian · Verify installation media",
    url: "https://www.debian.org/CD/verify",
  },
]
const download = {
  label: "Bitcoin Core · Official release verification",
  url: "https://bitcoincore.org/en/download/",
}
const builders = {
  label: "Bitcoin Core · Guix release attestations and builder keys",
  url: "https://github.com/bitcoin-core/guix.sigs",
}
const gpg = {
  label: "GnuPG · Public keys, fingerprints and signatures",
  url: "https://www.gnupg.org/gph/en/manual.html",
}
const apt = {
  label: "Debian · Package management",
  url: "https://www.debian.org/doc/manuals/debian-reference/ch02.en.html",
}
const coreWallet = {
  label: "Core 31.1 · Wallet management",
  url: "https://github.com/bitcoin/bitcoin/blob/v31.1/doc/managing-wallets.md",
}
const coreOffline = {
  label: "Core 31.1 · Offline signing",
  url: "https://github.com/bitcoin/bitcoin/blob/v31.1/doc/offline-signing-tutorial.md",
}
const coreFiles = {
  label: "Core 31.1 · Files and data directory",
  url: "https://github.com/bitcoin/bitcoin/blob/v31.1/doc/files.md",
}
const tailsWarnings = {
  label: "Tails · Hardware and firmware limitations",
  url: "https://tails.net/doc/about/warnings/index.en.html#untrusted_computer",
}

// This is the bilingual authority for the v3 custody recommendations. It runs
// after procedural revisions, so legacy lesson identities can remain intact.
export function reviseCustodyPolicy(
  lessons: Map<string, PlayerLesson>,
  language: "en" | "hr"
) {
  const tr = (en: string, hr: string) => (language === "en" ? en : hr)
  const lines = (...pairs: [string, string][]) =>
    pairs.map(([en, hr]) => tr(en, hr))
  function edit(id: string, patch: Partial<PlayerLesson>) {
    const old = lessons.get(id)
    if (!old) throw new Error(`Unknown custody lesson: ${id}`)
    lessons.set(id, {
      ...old,
      ...patch,
      contentUpdated: CUSTODY_CONTENT_UPDATED,
    })
  }
  function replaceReading(id: string, patch: Partial<PlayerLesson>) {
    edit(id, {
      what: undefined,
      why: undefined,
      risk: undefined,
      notes: [],
      concepts: [],
      warnings: [],
      callouts: [],
      commonMistakes: [],
      technicalDetails: undefined,
      checklist: [],
      walkthrough: undefined,
      codeBlocks: [],
      ...patch,
    })
  }
  function step(
    id: string,
    en: [string, string, string, string],
    hr: [string, string, string, string],
    command?: string
  ): GuidedStep {
    const [title, instruction, expectedResult, help] =
      language === "en" ? en : hr
    return {
      id,
      title,
      instructions: [instruction],
      expectedResult,
      help,
      command,
      commandContext: command
        ? tr(
            "Linux system terminal · not the Core console",
            "Sistemski terminal Linuxa · nije Coreova konzola"
          )
        : undefined,
    }
  }
  const philosophy = lines(
    [
      "This curriculum chooses generic, non-Bitcoin-specific hardware, open-source Linux and Bitcoin Core for the wallet, node and signing software. For meaningful savings, private keys stay on a separate offline computer. We minimise specialised components and product-specific dependencies.",
      "Ovaj kurikulum bira generički hardver koji nije namijenjen posebno Bitcoinu, Linux otvorenog koda i Bitcoin Core za novčanik, čvor i potpisivanje. Za značajnu štednju privatni ključevi ostaju na odvojenom offline računalu. Smanjujemo broj specijaliziranih komponenti i ovisnosti o pojedinom proizvodu.",
    ],
    [
      "That choice puts more responsibility on you. Setup, isolation, software verification, backups and recovery must be understandable, written down and tested repeatedly. Choose the smallest architecture that addresses your actual threat model; add complexity only for a reason you can explain.",
      "Taj izbor tebi daje više odgovornosti. Postavljanje, izolacija, provjera softvera, backup i oporavak moraju biti razumljivi, zapisani i ponavljano testirani. Odaberi najmanju arhitekturu koja odgovara tvojem modelu prijetnji; složenost dodaj samo zbog razloga koji možeš objasniti.",
    ],
    [
      "We deliberately leave hardware wallets out of the production path. A Bitcoin-specific device is a more targeted product category and brings supply-chain, firmware, vendor, attestation where used, and product-specific assumptions. Generic hardware reduces those Bitcoin-specific dependencies; it does not eliminate supply-chain or firmware risk.",
      "Hardverske novčanike namjerno izostavljamo iz produkcijskog puta. Uređaj namijenjen Bitcoinu ciljanija je kategorija proizvoda i donosi pretpostavke o nabavnom lancu, firmwareu, proizvođaču, atestaciji gdje se koristi i samom proizvodu. Generički hardver smanjuje te Bitcoin-specifične ovisnosti; ne uklanja rizik nabavnog lanca ni firmwarea.",
    ],
    [
      "Hardware wallets can provide useful signing isolation and simpler operational UX. A generic Linux computer has a larger general-purpose hardware and software stack, so disciplined setup, isolation, verification and recovery matter more. This is our deliberate threat-model choice, not evidence that generic laptops are categorically safer or that Bitcoin Core guarantees security.",
      "Hardverski novčanici mogu pružiti korisnu izolaciju potpisivanja i jednostavnije korištenje. Generičko Linux računalo ima veći skup hardvera i softvera opće namjene pa disciplina postavljanja, izolacije, provjere i oporavka dobiva veću važnost. To je naš svjestan izbor prema modelu prijetnji, a ne dokaz da su generički laptopi uvijek sigurniji ili da Bitcoin Core jamči sigurnost.",
    ]
  )
  edit("0.1", {
    explanation: [
      lessons.get("0.1")!.explanation![0],
      tr(
        "Start by asking what you are protecting and what could go wrong. Then learn the curriculum's custody philosophy, practise the full Signet cycle, rehearse two separate Core computers, and test recovery before a small mainnet test.",
        "Prvo razjasni što štitiš i što može poći po zlu. Zatim upoznaj filozofiju kurikuluma, prođi cijeli Signet ciklus, uvježbaj dva odvojena Core računala i testiraj oporavak prije malog mainnet testa."
      ),
    ],
  })
  replaceReading("1.5", {
    title: tr("The custody philosophy", "Filozofija samostalnog čuvanja"),
    objective: tr(
      "Explain the responsibility you accept before choosing tools.",
      "Objasni odgovornost koju prihvaćaš prije odabira alata."
    ),
    explanation: philosophy,
    prerequisites: ["0.2"],
    sources: [
      coreWallet,
      coreOffline,
      tailsWarnings,
      {
        label: "Bitcoin Core · Hardware Wallet Interface",
        url: "https://github.com/bitcoin-core/HWI",
      },
    ],
  })
  replaceReading("1.1", {
    title: tr(
      "Generic hardware and hardware-wallet trade-offs",
      "Generički hardver i kompromisi hardverskih novčanika"
    ),
    summary: tr(
      "Signing isolation helps, but each architecture has different trust and recovery assumptions.",
      "Izolacija potpisivanja pomaže, ali svaka arhitektura ima drukčije pretpostavke povjerenja i oporavka."
    ),
    explanation: [philosophy[2], philosophy[3]],
    sources: [
      coreOffline,
      tailsWarnings,
      {
        label: "Bitcoin Core · Hardware Wallet Interface",
        url: "https://github.com/bitcoin-core/HWI",
      },
    ],
  })
  edit("0.2", {
    title: tr("Your threat model comes first", "Prvo odredi model prijetnji"),
    summary: tr(
      "What are you protecting, from what, and what complexity are you willing to accept to protect it?",
      "Što štitiš, od čega i koliku si složenost spreman prihvatiti da to zaštitiš?"
    ),
    explanation: lines([
      "Every security control solves some problems while potentially introducing new operational or recovery risks. The goal is the smallest adequate architecture, not maximum complexity.",
      "Svaka sigurnosna mjera rješava neke probleme, ali može uvesti nove rizike u radu ili oporavku. Cilj je najmanja dovoljna arhitektura, a ne najveća složenost.",
    ]),
    guidedSteps: [
      step(
        "protect",
        [
          "Name what you are protecting",
          "Write whether this is disposable practice or meaningful savings, who needs access, and what loss would mean for you. Do this before choosing an OS or buying a signer.",
          "Your notes identify the assets, people and acceptable loss.",
          "Keep amounts and identities private. The question is: what are you protecting, from what, and what complexity will you accept?",
        ],
        [
          "Zapiši što štitiš",
          "Zapiši je li ovo potrošna vježba ili značajna štednja, tko treba pristup i što bi gubitak značio. Učini to prije odabira OS-a ili kupnje potpisnika.",
          "Bilješke navode imovinu, ljude i prihvatljiv gubitak.",
          "Iznose i identitete čuvaj privatno. Pitanje je: što štitiš, od čega i koliku složenost prihvaćaš?",
        ]
      ),
      step(
        "risks-v3",
        [
          "Choose two failures to prepare for",
          "Choose two relevant failures, such as a lost device and an unavailable operator. For each, write the control, the recovery action and one new risk the control introduces. Review the full threat list under further reading.",
          "Two failures have a control, recovery route and explicit trade-off.",
          "A strong password protects a stolen encrypted backup but creates a password-loss risk. An offline signer reduces remote access but adds transfers and another device to recover.",
        ],
        [
          "Odaberi dva problema za koja se pripremaš",
          "Odaberi dva važna problema, poput izgubljenog uređaja i nedostupnog vlasnika. Za svaki zapiši zaštitu, postupak oporavka i novi rizik koji zaštita donosi. Cijeli popis prijetnji pregledaj pod dodatnim čitanjem.",
          "Dva problema imaju zaštitu, put oporavka i jasan kompromis.",
          "Snažna lozinka štiti ukradeni šifrirani backup, ali donosi rizik gubitka lozinke. Offline potpisnik smanjuje udaljeni pristup, ali dodaje prijenose i još jedan uređaj za obnovu.",
        ]
      ),
      step(
        "complexity",
        [
          "Set a limit on complexity",
          "Write which procedures you can reliably repeat and who could recover if you died or became unavailable. Reject controls you cannot explain or rehearse. Revisit these notes at architecture selection.",
          "You have an operational limit and a plan that goes beyond one person's memory.",
          "The smallest adequate system depends on your real circumstances. If this curriculum's offline procedure exceeds what you can maintain, pause before meaningful savings.",
        ],
        [
          "Odredi granicu složenosti",
          "Zapiši koje postupke možeš pouzdano ponavljati i tko bi mogao provesti oporavak ako umreš ili postaneš nedostupan. Odbaci mjere koje ne možeš objasniti ni uvježbati. Vrati se bilješkama pri izboru arhitekture.",
          "Imaš operativnu granicu i plan koji ne ovisi samo o pamćenju jedne osobe.",
          "Najmanji dovoljan sustav ovisi o tvojim okolnostima. Ako ne možeš održavati offline postupak ovog kurikuluma, stani prije značajne štednje.",
        ]
      ),
    ],
    concepts: lines(
      [
        "Loss of private keys; loss of the wallet backup; loss of the wallet passphrase. Each needs a separate recovery answer.",
        "Gubitak privatnih ključeva, backupa novčanika ili lozinke novčanika. Za svaki treba poseban odgovor o oporavku.",
      ],
      [
        "Malware or remote compromise; malicious or compromised software; supply-chain risk in hardware, firmware and downloads.",
        "Zlonamjerni softver ili udaljena kompromitacija; zlonamjeran ili kompromitiran program; rizik nabavnog lanca hardvera, firmwarea i preuzimanja.",
      ],
      [
        "Physical theft and physical tampering, including changes made while the owner is absent.",
        "Fizička krađa i fizička manipulacija, uključujući izmjene dok je vlasnik odsutan.",
      ],
      [
        "Hardware failure; backup-media failure; accidental deletion; operator error.",
        "Kvar hardvera, kvar backup medija, slučajno brisanje i pogreška korisnika.",
      ],
      [
        "Recovery failure; dependence on one person remembering the procedure; death or unavailability of that person.",
        "Neuspješan oporavak, ovisnost o jednoj osobi koja pamti postupak, njezina smrt ili nedostupnost.",
      ]
    ),
    sources: [coreWallet, tailsWarnings],
  })

  const debianWhy = tr(
    "Debian Stable is our default for both dedicated machines because of its conservative change cadence, long-lived stable releases, mature package ecosystem and predictable operation. It suits machines maintained for years, with fewer major upgrades than fast-release desktops. This is an operational recommendation, not a claim that Debian is inherently or cryptographically more secure than Fedora. Fedora and other maintained Linux distributions remain valid alternatives.",
    "Debian Stable zadani je izbor za oba namjenska računala zbog konzervativnog ritma promjena, dugotrajnih stabilnih izdanja, zrelog sustava paketa i predvidljivog rada. Odgovara računalima koja se održavaju godinama, uz manje velikih nadogradnji nego kod distribucija s brzim izdanjima. To je operativna preporuka, a ne tvrdnja da je Debian inherentno ili kriptografski sigurniji od Fedore. Fedora i druge održavane Linux distribucije ostaju valjane alternative."
  )
  replaceReading("architecture-choice", {
    title: tr(
      "Choose the reference architecture",
      "Odaberi referentnu arhitekturu"
    ),
    explanation: lines(
      [
        "Return to your threat-model notes. For meaningful savings, this curriculum chooses two dedicated generic computers running Debian Stable and Bitcoin Core. One verifies the chain online with a watch-only savings wallet; the other keeps the encrypted private-key wallet offline.",
        "Vrati se bilješkama o prijetnjama. Za značajnu štednju ovaj kurikulum bira dva namjenska generička računala s Debianom Stable i Bitcoin Coreom. Jedno online provjerava lanac s watch-only novčanikom za štednju; drugo čuva šifrirani novčanik s privatnim ključevima offline.",
      ],
      [
        "The persistent Debian signer is the default because its installed environment is straightforward to understand, maintain, document and recover. Rehearse it on Signet first. Consider optional Tails only afterward, if reducing persistent OS state addresses a threat you actually face.",
        "Trajni Debian potpisnik zadani je izbor jer je instalirano okruženje jednostavno razumjeti, održavati, dokumentirati i obnoviti. Prvo ga uvježbaj na Signetu. Izborni Tails razmotri tek poslije, ako smanjenje trajnog stanja OS-a odgovara stvarnoj prijetnji.",
      ]
    ),
    notes: [debianWhy],
    prerequisites: ["0.2", "1.5", "signet-readiness"],
    sources: [...debianSources, coreOffline],
  })
  replaceReading("2.4", {
    title: tr(
      "Online node and offline signer",
      "Online čvor i offline potpisnik"
    ),
    explanation: lines(
      [
        "Online: generic dedicated computer → Debian Stable → official Bitcoin Core release → synchronized full node → watch-only savings wallet. It prepares PSBTs and broadcasts signed transactions. It contains no savings-wallet private keys.",
        "Online: namjensko generičko računalo → Debian Stable → službeno izdanje Bitcoin Corea → sinkroniziran puni čvor → watch-only novčanik za štednju. Priprema PSBT i objavljuje potpisane transakcije. Ne sadrži privatne ključeve novčanika za štednju.",
      ],
      [
        "Offline: generic dedicated computer → Debian Stable → Bitcoin Core → encrypted private-key wallet. No blockchain is required and no network is required for signing. The online node supplies transaction and input information in the PSBT; the offline signer independently reviews outputs, change and fee before signing. It does not independently verify the chain or current spendability.",
        "Offline: namjensko generičko računalo → Debian Stable → Bitcoin Core → šifrirani novčanik s privatnim ključevima. Za potpisivanje ne trebaju blockchain ni mreža. Online čvor kroz PSBT daje podatke o transakciji i ulazima; offline potpisnik neovisno pregledava izlaze, kusur i naknadu prije potpisivanja. Ne provjerava samostalno lanac ni trenutačnu mogućnost potrošnje.",
      ],
      [
        "Only public descriptors and unsigned/signed PSBTs cross the controlled transfer boundary. Descriptors reveal wallet activity even though they cannot spend. Keep wallet.dat backups and passphrases off routine transfer media.",
        "Kontroliranu granicu prijenosa prelaze samo javni descriptori i nepotpisani ili potpisani PSBT. Descriptori otkrivaju aktivnost novčanika iako ne mogu trošiti. wallet.dat kopije i lozinke drži izvan redovnih prijenosnih medija.",
      ]
    ),
    notes: [debianWhy],
    sources: [coreOffline, ...debianSources],
  })
  const architecture = lessons.get("2.4")!
  edit("2.4", {
    explanation: lines(
      [
        "The online Core node verifies the blockchain, prepares payments and broadcasts. Its savings wallet is watch-only, with no private keys.",
        "Online Core čvor provjerava blockchain, priprema plaćanja i objavljuje transakcije. Novčanik za štednju je watch-only, bez privatnih ključeva.",
      ],
      [
        "The offline Core signer holds the encrypted private-key wallet. Review the transaction there before signing. The signer needs no blockchain or network connection.",
        "Offline Core potpisnik čuva šifrirani novčanik s privatnim ključevima. Ondje pregledaj transakciju prije potpisivanja. Potpisniku ne trebaju blockchain ni mrežna veza.",
      ]
    ),
    notes: [...architecture.explanation!, ...architecture.notes!],
  })
  edit("2.3", {
    explanation: [
      tr(
        "With sufficient storage, the dedicated node can keep the full block archive for easier historical rescans. An archival node is not required for consensus validation or safe wallet operation. Pruning remains valid when storage is limited; both validate the same rules.",
        "Uz dovoljno prostora namjenski čvor može zadržati cijelu arhivu blokova radi lakšeg ponovnog pregleda povijesti. Arhivski čvor nije potreban za konsenzusnu validaciju ni siguran rad novčanika. Pruning ostaje valjan izbor uz ograničenu pohranu; oba provjeravaju ista pravila."
      ),
      ...(lessons.get("2.3")!.explanation ?? []),
    ],
    sources: [
      coreFiles,
      {
        label: "Core 31.1 · Pruning options and recovery limits",
        url: "https://github.com/bitcoin/bitcoin/blob/v31.1/src/init.cpp",
      },
    ],
  })

  const originalInstall = lessons.get("signet-install-verify")!.guidedSteps!
  replaceReading("signet-install-verify", {
    objective: tr(
      "Verify the release bytes and identify its signers before running Core.",
      "Provjeri bajtove izdanja i identificiraj potpisnike prije pokretanja Corea."
    ),
    estimatedTime: tr(
      "20–40 min active + downloads",
      "20–40 min rada + preuzimanja"
    ),
    status: "in-progress",
    verification: "review-required",
    reviewNote: tr(
      "Commands checked against upstream documentation on 2026-09-13. The expanded Debian installation procedure still needs practical reproduction; the historical review date does not cover it.",
      "Naredbe uspoređene s izvornom dokumentacijom 2026-09-13. Prošireni Debian postupak još treba praktično ponoviti; prethodni datum pregleda ne obuhvaća ovu izmjenu."
    ),
    prerequisites: ["0.2", "1.5"],
    referenceVersion: "Bitcoin Core 31.1 · Debian Stable",
    explanation: lines([
      "A checksum checks the downloaded bytes. A signature ties that checksum list to a signing key. You must also identify whose key it is. None of these checks proves the software has no bugs or that your computer is clean.",
      "Checksum provjerava preuzete bajtove. Potpis povezuje popis checksumova s ključem potpisnika. Moraš utvrditi i čiji je to ključ. Nijedna od tih provjera ne dokazuje da softver nema pogrešaka ni da je računalo čisto.",
    ]),
    concepts: lines(
      [
        "SHA256 is a hash function. Its checksum is a compact digest of a file's bytes. Matching the archive to SHA256SUMS detects changed bytes, but an attacker could replace both unless you authenticate the list.",
        "SHA256 je hash funkcija. Checksum je sažetak bajtova datoteke. Podudaranje arhive s SHA256SUMS otkriva promjenu bajtova, ali napadač može zamijeniti oboje ako ne potvrdiš autentičnost popisa.",
      ],
      [
        "SHA256SUMS.asc holds detached OpenPGP signatures over SHA256SUMS. GnuPG, usually run as gpg, is software that verifies these signatures. OpenPGP is the format and protocol it implements.",
        "SHA256SUMS.asc sadrži odvojene OpenPGP potpise nad SHA256SUMS. GnuPG, koji obično pokrećeš naredbom gpg, program je za provjeru tih potpisa. OpenPGP je format i protokol koji koristi.",
      ],
      [
        "A builder keeps a private signing key secret and publishes a public key for verification. These release-signing keys are different from your Bitcoin wallet keys. You do not generate a GPG private key to verify a download.",
        "Graditelj drži privatni ključ za potpisivanje tajnim, a javni ključ objavljuje radi provjere. Ti ključevi za potpisivanje izdanja razlikuju se od ključeva Bitcoin novčanika. Za provjeru preuzimanja ne izrađuješ privatni GPG ključ.",
      ],
      [
        "A fingerprint identifies a public key. Compare the full fingerprint with trustworthy independent sources, such as the builder's established personal site and a separately authenticated direct contact. Another page or mirror of the same compromised repository is not independent confirmation.",
        "Otisak identificira javni ključ. Usporedi cijeli otisak s pouzdanim neovisnim izvorima, primjerice poznatom osobnom stranicom graditelja i zasebno potvrđenim izravnim kontaktom. Druga stranica ili kopija istog kompromitiranog repozitorija nije neovisna potvrda.",
      ],
      [
        "Your local GPG keyring, or key database, stores the public keys you import. Importing a key only makes it available for checks; it does not establish the owner's identity or make the key trustworthy.",
        "Lokalni GPG keyring, odnosno baza ključeva, čuva uvezene javne ključeve. Uvoz samo omogućuje provjeru; ne potvrđuje identitet vlasnika ni pouzdanost ključa.",
      ],
      [
        "Bitcoin Core releases carry signatures from multiple builders. Check valid signatures from several independently identified people you trust, as the official guide describes. Agreement on the release bytes is useful evidence, not proof that the source code is harmless.",
        "Bitcoin Core izdanja nose potpise više graditelja. Provjeri valjane potpise nekoliko neovisno identificiranih ljudi kojima vjeruješ, prema službenim uputama. Slaganje o bajtovima izdanja koristan je dokaz, ali ne dokazuje da je izvorni kod bezopasan.",
      ]
    ),
    guidedSteps: [
      step(
        "tools-check",
        [
          "Check the verification tools",
          "On the online Debian preparation computer, open the system terminal and run this check. These tools are not assumed to exist on a minimal installation.",
          "Each tool has a path, or you have identified which is missing.",
          "command -v finds an installed command. Here curl downloads files if needed, git obtains builder keys, gpg verifies signatures, sha256sum checks bytes and tar extracts the archive. Browser downloads below do not require curl.",
        ],
        [
          "Provjeri alate za verifikaciju",
          "Na online Debian računalu za pripremu otvori sistemski terminal i pokreni provjeru. Minimalna instalacija možda ne sadrži ove alate.",
          "Svaki alat ima putanju ili znaš koji nedostaje.",
          "command -v pronalazi instaliranu naredbu. curl po potrebi preuzima datoteke, git dohvaća ključeve graditelja, gpg provjerava potpise, sha256sum bajtove, a tar raspakirava arhivu. Preuzimanje preglednikom ispod ne zahtijeva curl.",
        ],
        "command -v curl git gpg sha256sum tar"
      ),
      step(
        "tools-install",
        [
          "Install missing Debian packages",
          "If tools are missing, use the two commands below with your Debian administrator account. Read the package list before accepting. If everything is installed, confirm the previous tool check and continue.",
          "curl, git, gpg, sha256sum and tar are available from Debian's authenticated packages.",
          "sudo may itself be absent on a minimal Debian install. Use su - to enter the configured root account, run the apt commands without sudo, then exit. If you have no administrator access, resolve that first. Never run this online installation on a signer holding private keys.",
        ],
        [
          "Instaliraj Debian pakete koji nedostaju",
          "Ako alati nedostaju, pokreni dvije naredbe ispod svojim Debian administratorskim računom. Prije potvrde pročitaj popis paketa. Ako je sve instalirano, potvrdi prethodnu provjeru i nastavi.",
          "curl, git, gpg, sha256sum i tar dostupni su iz Debianovih autentificiranih paketa.",
          "Ni sudo možda nije instaliran. Koristi su - za ulazak u postavljeni root račun, pokreni apt naredbe bez sudo pa izađi naredbom exit. Ako nemaš administratorski pristup, prvo to riješi. Online instalaciju nikada ne provodi na potpisniku s privatnim ključevima.",
        ],
        "sudo apt update\nsudo apt install ca-certificates curl git gnupg coreutils tar"
      ),
      {
        ...originalInstall[0],
        instructions: [
          tr(
            "Use the official Bitcoin Core download page under Sources. This worked example uses Core 31.1 for Linux x86-64. In one new folder save bitcoin-31.1-x86_64-linux-gnu.tar.gz, SHA256SUMS and SHA256SUMS.asc from that same release. Check the current official release before using this example; do not silently mix versions.",
            "Koristi službeno preuzimanje Bitcoin Corea pod Izvori. Ovaj primjer koristi Core 31.1 za Linux x86-64. U jednu novu mapu spremi bitcoin-31.1-x86_64-linux-gnu.tar.gz, SHA256SUMS i SHA256SUMS.asc iz istog izdanja. Prije upotrebe primjera provjeri trenutačno službeno izdanje; nemoj neprimjetno miješati verzije."
          ),
        ],
        help: tr(
          "Debian calls this processor architecture amd64; the Core archive calls it x86_64. For Windows, macOS or another processor, use the matching official verification instructions. The Linux commands here do not apply unchanged.",
          "Debian tu arhitekturu procesora naziva amd64, a Core arhiva x86_64. Za Windows, macOS ili drugi procesor koristi odgovarajuće službene upute. Ove Linux naredbe nisu izravno primjenjive."
        ),
      },
      step(
        "folder",
        [
          "Check which folder the terminal is using",
          "Open the terminal in the folder containing the three downloads. Run pwd and ls. Compare the printed location and filenames with your file manager before continuing.",
          "You can see the exact archive, SHA256SUMS and SHA256SUMS.asc in the current folder.",
          "pwd prints your current folder; ls lists its contents. cd changes folder, for example cd Downloads/ when you are in your home folder. cd .. goes to the parent folder. Folder names may be translated, so use the actual path shown in your file manager.",
        ],
        [
          "Provjeri u kojoj je mapi terminal",
          "Otvori terminal u mapi s tri preuzete datoteke. Pokreni pwd i ls. Prije nastavka usporedi putanju i nazive s upraviteljem datoteka.",
          "U trenutačnoj mapi vidiš točnu arhivu, SHA256SUMS i SHA256SUMS.asc.",
          "pwd ispisuje trenutačnu mapu, a ls njezin sadržaj. cd mijenja mapu, primjerice cd Downloads/ iz osobne mape. cd .. vodi u nadređenu mapu. Nazivi mogu biti prevedeni pa koristi stvarnu putanju iz upravitelja datoteka.",
        ],
        "pwd\nls"
      ),
      originalInstall[1],
      step(
        "builder-repo",
        [
          "Obtain the builder public keys",
          "In the same download folder, clone the official bitcoin-core/guix.sigs repository using the command from Core's verification guide.",
          "A guix.sigs folder containing builder-keys is present.",
          "Cloning downloads repository data; it does not run it or prove a key owner's identity. If that folder already exists, use a fresh verification folder instead of deleting unknown files.",
        ],
        [
          "Dohvati javne ključeve graditelja",
          "U istoj mapi preuzimanja kloniraj službeni repozitorij bitcoin-core/guix.sigs naredbom iz Coreovih uputa.",
          "Postoji mapa guix.sigs koja sadrži builder-keys.",
          "Kloniranje preuzima podatke repozitorija; ne pokreće ih ni ne dokazuje identitet vlasnika ključa. Ako mapa već postoji, koristi novu mapu za provjeru umjesto brisanja nepoznatih datoteka.",
        ],
        "git clone https://github.com/bitcoin-core/guix.sigs"
      ),
      step(
        "builder-import",
        [
          "Import the public keys locally",
          "Run the official import command. The wildcard selects the files in builder-keys. GPG adds or updates those public keys in your local key database.",
          "GPG reports imported, updated or unchanged public keys.",
          "This local keyring is not your Bitcoin wallet. Importing every builder key does not mean trusting every builder. You still need to identify the signers you rely on.",
        ],
        [
          "Uvezi javne ključeve lokalno",
          "Pokreni službenu naredbu uvoza. Zvjezdica odabire datoteke u builder-keys. GPG dodaje ili ažurira te javne ključeve u lokalnoj bazi.",
          "GPG prikazuje uvezene, ažurirane ili nepromijenjene javne ključeve.",
          "Ta lokalna baza nije Bitcoin novčanik. Uvoz svih ključeva ne znači povjerenje u svakog graditelja. I dalje moraš identificirati potpisnike na koje se oslanjaš.",
        ],
        "gpg --import guix.sigs/builder-keys/*"
      ),
      step(
        "fingerprints",
        [
          "Identify the keys you will trust",
          "Display the full fingerprints. Choose several builders and compare their full fingerprints with trustworthy independent sources. Record whose identity you checked and how, before accepting their release signatures.",
          "You have a record of independently identified builder keys.",
          "A name, email or short key ID can be copied. Use the full fingerprint and an independently authenticated source. If you cannot establish a key's identity, do not count its signature as trusted evidence.",
        ],
        [
          "Identificiraj ključeve kojima ćeš vjerovati",
          "Prikaži cijele otiske. Odaberi nekoliko graditelja i usporedi njihove otiske s pouzdanim neovisnim izvorima. Prije prihvaćanja potpisa zabilježi čiji si identitet provjerio i kako.",
          "Imaš zapis neovisno identificiranih ključeva graditelja.",
          "Naziv, e-adresa ili kratki ID mogu se kopirati. Koristi cijeli otisak i neovisno autentificiran izvor. Ako ne možeš utvrditi identitet ključa, njegov potpis ne računaj kao pouzdan dokaz.",
        ],
        "gpg --fingerprint"
      ),
      {
        ...originalInstall[2],
        instructions: [
          tr(
            "Verify the signed checksum list. Read the results for each signer you identified. A Good signature only means the signature matches that key; compare its full fingerprint with your independent record. Accept multiple valid signatures from the expected trusted builders.",
            "Provjeri potpisani popis checksumova. Pročitaj rezultate za svakog identificiranog potpisnika. Good signature znači samo da potpis odgovara tom ključu; cijeli otisak usporedi sa svojim neovisnim zapisom. Prihvati više valjanih potpisa očekivanih pouzdanih graditelja."
          ),
        ],
        help: tr(
          "A missing public key means that signature was not checked; it does not invalidate other signatures. An uncertified-key warning means GPG has not established identity through its trust database. Resolve identity independently. Stop for a bad signature, unexplained mismatch, expired/revoked key you rely on, or too few identified valid signers. Do not change ownertrust just to hide warnings.",
          "Nedostajući javni ključ znači da taj potpis nije provjeren; ne poništava druge potpise. Upozorenje o necertificiranom ključu znači da GPG nije potvrdio identitet kroz bazu povjerenja. Identitet potvrdi neovisno. Stani kod lošeg potpisa, neobjašnjene razlike, isteklog ili opozvanog ključa na koji se oslanjaš ili premalo identificiranih valjanih potpisa. Ne mijenjaj ownertrust samo da sakriješ upozorenja."
        ),
      },
      originalInstall[3],
    ],
    sources: [download, builders, gpg, apt],
  })

  const device = lessons.get("real-device")!.guidedSteps!
  replaceReading("real-device", {
    sources: [...debianSources, download],
    notes: [debianWhy],
    guidedSteps: [
      {
        ...device[0],
        instructions: [
          tr(
            "Choose two generic dedicated computers you control. Check Debian Stable hardware support, disk health and boot compatibility before storing secrets. This reference path uses x86-64 hardware and a Debian desktop. Verify Debian installation media using the official guide. Installation can erase the selected disk; identify it and preserve needed files first.",
            "Odaberi dva namjenska generička računala pod svojom kontrolom. Prije pohrane tajni provjeri podršku Debiana Stable za hardver, stanje diska i pokretanje. Ovaj put koristi x86-64 hardver i Debian desktop. Instalacijski medij provjeri prema službenim uputama. Instalacija može izbrisati odabrani disk; prvo ga identificiraj i sačuvaj potrebne datoteke."
          ),
        ],
        help: tr(
          "Debian and Core must both support the device. Generic hardware still has firmware and supply-chain assumptions. If its integrity is in doubt, resolve that before creating keys.",
          "I Debian i Core moraju podržavati uređaj. Generički hardver i dalje ovisi o firmwareu i nabavnom lancu. Sumnju u njegovu cjelovitost razjasni prije izrade ključeva."
        ),
      },
      {
        ...device[1],
        instructions: [
          tr(
            "Separate the installed system disk, Debian installation media, wallet backup media and PSBT transfer media. Label each and record which machine may access it. Keep passphrase recovery separate from wallet backups and ordinary transfer media.",
            "Odvoji instalirani sistemski disk, Debian instalacijski medij, backup medije i medije za prijenos PSBT-a. Označi ih i zapiši koje im računalo smije pristupati. Oporavak lozinke odvoji od backupa novčanika i redovnih prijenosnih medija."
          ),
        ],
        expectedResult: tr(
          "Your notes distinguish system storage, installation media, backups and transfer media.",
          "Bilješke razlikuju sistemsku pohranu, instalacijske medije, kopije i prijenosne medije."
        ),
      },
      step(
        "online-node",
        [
          "Prepare the dedicated online node",
          "Install Debian Stable, apply security updates and verify the official Core release as practised earlier. Start Core on Signet and let the full node synchronize. Keep the savings private-key wallet off this machine. The PSBT lesson creates the private-key-disabled watch-only wallet.",
          "The dedicated online Core node is synchronized on Signet and contains no savings private keys.",
          "With sufficient storage you may retain the block archive. Pruning is valid for constrained storage and still fully validates consensus. Plan access to old blocks for later recovery scans.",
        ],
        [
          "Pripremi namjenski online čvor",
          "Instaliraj Debian Stable, primijeni sigurnosne nadogradnje i provjeri službeno izdanje Corea kao u ranijoj vježbi. Pokreni Core na Signetu i pričekaj sinkronizaciju punog čvora. Novčanik s privatnim ključevima za štednju ne smije biti na tom računalu. Watch-only novčanik s isključenim privatnim ključevima izrađuješ u PSBT lekciji.",
          "Namjenski online Core čvor sinkroniziran je na Signetu i nema privatne ključeve za štednju.",
          "Uz dovoljno prostora možeš zadržati arhivu blokova. Pruning vrijedi za ograničenu pohranu i također potpuno provjerava konsenzus. Planiraj pristup starim blokovima za kasniji pregled pri oporavku.",
        ]
      ),
    ],
    prerequisites: ["architecture-choice"],
  })
  replaceReading("offline-device", {
    estimatedTime: tr(
      "45–90 min setup + downloads",
      "45–90 min pripreme + preuzimanja"
    ),
    title: tr(
      "Prepare and restart the Debian signer",
      "Pripremi i ponovno pokreni Debian potpisnik"
    ),
    summary: tr(
      "A persistent Debian Stable computer holds the encrypted Core wallet offline.",
      "Trajno instalirano Debian Stable računalo čuva šifrirani Core novčanik offline."
    ),
    objective: tr(
      "Verify that the offline wallet survives shutdown and has an independent backup.",
      "Provjeri da offline novčanik ostaje nakon gašenja i ima neovisan backup."
    ),
    kind: "practice",
    status: "in-progress",
    verification: "review-required",
    referenceVersion: "Debian Stable · Bitcoin Core 31.1",
    reviewNote: tr(
      "New Debian reference procedure. Physical installation, offline startup, cold boot, signing and independent restore remain to be reproduced.",
      "Novi referentni Debian postupak. Instalaciju na fizičkom uređaju, offline pokretanje, ponovno paljenje, potpisivanje i neovisnu obnovu još treba ponoviti."
    ),
    explanation: lines([
      "Prepare software before any wallet secrets exist. Once keys are created or restored, this machine remains permanently or operationally offline. No network or blockchain is required for signing. Core's network switch is an extra application control, not a substitute for disconnecting the operating system.",
      "Softver pripremi prije nastanka tajni novčanika. Nakon izrade ili obnove ključeva ovo računalo ostaje trajno ili operativno offline. Za potpisivanje ne trebaju mreža ni blockchain. Coreov mrežni prekidač dodatna je kontrola aplikacije, a ne zamjena za odspajanje operacijskog sustava.",
    ]),
    guidedSteps: [
      step(
        "debian-preparation",
        [
          "Finish the Debian environment before keys exist",
          "Install verified Debian Stable with a supported desktop on the dedicated signer. Complete Debian security updates and the Core verification prerequisites while it has no wallet secrets. Prepare the official verified Core archive and a Debian-packaged offline password manager such as KeePassXC. Test that Core launches before disconnecting.",
          "The required software and libraries work, with no private-key wallet yet present.",
          "Follow the Debian installer and media-verification sources. If you enable disk encryption, record its separate recovery password. Wallet encryption and disk encryption protect different things; neither replaces backups.",
        ],
        [
          "Dovrši Debian okruženje prije nastanka ključeva",
          "Na namjenski potpisnik instaliraj provjereni Debian Stable s podržanim desktopom. Dok nema tajni novčanika primijeni sigurnosne nadogradnje i pripremi alate za provjeru Corea. Pripremi službenu provjerenu Core arhivu i offline upravitelj lozinki iz Debianovih paketa, primjerice KeePassXC. Prije odspajanja provjeri da se Core pokreće.",
          "Potrebni programi i biblioteke rade, a novčanika s privatnim ključevima još nema.",
          "Prati izvore za Debian instalaciju i provjeru medija. Ako uključiš šifriranje diska, zasebno zabilježi njegovu lozinku za oporavak. Šifriranje novčanika i diska štite različite stvari; nijedno ne zamjenjuje backup.",
        ]
      ),
      step(
        "isolate",
        [
          "Disconnect before creating or restoring keys",
          "Close Core. Unplug Ethernet and disable Wi-Fi, Bluetooth and other network interfaces in the OS and, where supported, firmware. Remove or physically disable network hardware when your threat model calls for it. Restart and confirm the machine remains disconnected before proceeding.",
          "The signer has no network connection after restart and will stay offline for key creation, recovery and signing.",
          "A Core flag does not disable other programs' networking. Do not reconnect a signer containing keys to fetch a missing package. Return to software preparation on a replacement environment with no secrets.",
        ],
        [
          "Odspoji prije izrade ili obnove ključeva",
          "Zatvori Core. Odspoji Ethernet i isključi Wi-Fi, Bluetooth i ostala mrežna sučelja u OS-u te u firmwareu gdje je podržano. Ukloni ili fizički onemogući mrežni hardver kada to zahtijeva model prijetnji. Ponovno pokreni računalo i potvrdi da je odspojeno.",
          "Potpisnik nakon ponovnog pokretanja nema mrežu i ostaje offline za izradu ključeva, oporavak i potpisivanje.",
          "Coreova postavka ne isključuje mrežu drugih programa. Potpisnik s ključevima ne povezuj radi paketa koji nedostaje. Vrati se pripremi softvera u zamjenskom okruženju bez tajni.",
        ]
      ),
      step(
        "debian-datadir",
        [
          "Start Core with an explicit offline data folder",
          "In your home folder, create core and core-signet using the file manager. Extract the verified release so its executable is at core/bitcoin-31.1/bin/bitcoin-qt. Run the command below. In Window → Console, use getblockchaininfo and getnetworkinfo to check chain = signet and networkactive = false.",
          "Core uses $HOME/core-signet, is on Signet and has networking disabled. Its blockchain is not synchronized, which is expected for the signer.",
          "$HOME expands to your user's home folder, so no hard-coded username is needed. The data folder must exist. If Core cannot start, stop; do not connect this signer to download dependencies.",
        ],
        [
          "Pokreni Core s izričitom offline mapom podataka",
          "U osobnoj mapi kroz upravitelj datoteka napravi core i core-signet. Raspakiraj provjereno izdanje tako da program bude u core/bitcoin-31.1/bin/bitcoin-qt. Pokreni naredbu ispod. U Window → Console naredbama getblockchaininfo i getnetworkinfo provjeri chain = signet i networkactive = false.",
          "Core koristi $HOME/core-signet, radi na Signetu i ima isključenu mrežu. Blockchain nije sinkroniziran, što je očekivano za potpisnik.",
          "$HOME označuje osobnu mapu pa ne treba unaprijed upisan naziv korisnika. Mapa podataka mora postojati. Ako se Core ne pokreće, stani; ne povezuj potpisnik radi preuzimanja biblioteka.",
        ],
        '"$HOME/core/bitcoin-31.1/bin/bitcoin-qt" -signet -datadir="$HOME/core-signet" -networkactive=0 -listen=0'
      ),
      step(
        "wallet",
        [
          "Create and back up the offline Signet wallet",
          "Create signet-offline-wallet with Encrypt Wallet enabled, private keys enabled and a separate test passphrase. Use File → Backup Wallet to save signet-offline-after-encryption.dat on independent backup media. Record a Receive address and the backup location. Keep passphrase recovery separately.",
          "An encrypted test wallet, independent backup and address record exist. No test secret will be reused on mainnet.",
          "The installed disk is working storage, not the only backup. Never place wallet backups or passwords on the regular PSBT transfer medium.",
        ],
        [
          "Napravi i kopiraj offline Signet novčanik",
          "Napravi signet-offline-wallet s uključenim Encrypt Wallet, omogućenim privatnim ključevima i zasebnom testnom lozinkom. Kroz File → Backup Wallet spremi signet-offline-after-encryption.dat na neovisan backup medij. Zabilježi Receive adresu i mjesto kopije. Oporavak lozinke čuvaj odvojeno.",
          "Postoje šifrirani testni novčanik, neovisan backup i zapis adrese. Testne tajne nećeš koristiti na mainnetu.",
          "Instalirani disk radna je pohrana, a ne jedini backup. Backup i lozinku nikada ne stavljaj na redovni PSBT medij.",
        ]
      ),
      step(
        "coldboot",
        [
          "Verify after a complete shutdown",
          "Close Core normally and shut Debian down. Start the computer again, verify network isolation, then launch Core with the same command. Open signet-offline-wallet and compare the recorded address in its history. Check chain and networkactive again.",
          "The wallet and address survive shutdown, the data folder is correct and Core remains offline.",
          "A reboot test is not independent recovery. Keep the original backup for the later replacement-signer drill. If the wallet is missing, check the data path before creating anything.",
        ],
        [
          "Provjeri nakon potpunog gašenja",
          "Normalno zatvori Core i ugasi Debian. Ponovno upali računalo, provjeri mrežnu izolaciju i pokreni Core istom naredbom. Otvori signet-offline-wallet i usporedi zapisanu adresu u povijesti. Ponovno provjeri chain i networkactive.",
          "Novčanik i adresa ostali su nakon gašenja, mapa je ispravna i Core ostaje offline.",
          "Ponovno pokretanje nije neovisan oporavak. Izvorni backup sačuvaj za kasniju vježbu zamjene potpisnika. Ako novčanik nedostaje, prije izrade bilo čega provjeri putanju.",
        ]
      ),
    ],
    prerequisites: ["real-device", "ops-malware", "ops-physical"],
    sources: [...debianSources, download, coreWallet, coreOffline],
  })

  replaceReading("ops-malware", {
    sources: [coreOffline, tailsWarnings],
    explanation: lines([
      "Offline operation reduces direct remote access. Transfer media and malicious PSBT data still reach the signer. Open only the expected files in verified software and independently compare the intended recipient, every output, change and fee.",
      "Offline rad smanjuje izravan udaljeni pristup. Prijenosni mediji i zlonamjerni PSBT podaci i dalje dolaze do potpisnika. U provjerenom softveru otvaraj samo očekivane datoteke i neovisno usporedi primatelja, svaki izlaz, kusur i naknadu.",
    ]),
  })
  const tampering = tr(
    "An Evil Maid attack means someone gets physical access while you are absent and modifies hardware, firmware, boot components or the operating environment to compromise secrets later. An unattended laptop is not automatically compromised. Judge reasonable suspicion using your threat model, physical-security context and evidence.",
    "Evil Maid napad znači da netko dobije fizički pristup dok si odsutan i izmijeni hardver, firmware, komponente pokretanja ili operacijsko okruženje kako bi kasnije došao do tajni. Laptop bez nadzora nije automatski kompromitiran. Razumnu sumnju procijeni prema modelu prijetnji, fizičkoj zaštiti i dokazima."
  )
  replaceReading("ops-physical", {
    title: tr(
      "Physical tampering and the Evil Maid attack",
      "Fizička manipulacija i Evil Maid napad"
    ),
    summary: tr(
      "Reasonable suspicion of signer tampering changes what you do before unlocking.",
      "Razumna sumnja u manipulaciju potpisnikom mijenja postupak prije otključavanja."
    ),
    explanation: [
      tampering,
      tr(
        "If there is reasonable evidence or suspicion of tampering, do not unlock or use the wallet on that machine merely to check whether it is fine. Once signing-environment integrity is genuinely in doubt, ruling out sophisticated physical compromise can be harder than replacing the device.",
        "Ako postoje razumni dokazi ili sumnja u manipulaciju, nemoj otključavati ni koristiti novčanik na tom računalu samo da provjeriš je li sve u redu. Kada je cjelovitost potpisnog okruženja stvarno upitna, isključiti sofisticiranu fizičku kompromitaciju može biti teže nego zamijeniti uređaj."
      ),
    ],
    guidedSteps: [
      step(
        "physical-plan",
        [
          "Write the stop condition",
          "Record who can access the signer, how you store it between sessions and what evidence would make you distrust it. Write: reasonable suspicion of tampering means no wallet unlock on that machine. Review your plan before creating keys.",
          "You have a physical-access plan and a clear stop condition.",
          "A locked room, controlled storage or tamper evidence may help for your circumstances. An intact seal or clean scan cannot prove absence of firmware or hardware compromise. Do not treat every absence as proof of stolen keys.",
        ],
        [
          "Zapiši kada staješ",
          "Zapiši tko ima pristup potpisniku, kako ga čuvaš između korištenja i koji bi dokaz narušio povjerenje. Zapiši: razumna sumnja u manipulaciju znači da ne otključavam novčanik na tom računalu. Plan pregledaj prije izrade ključeva.",
          "Imaš plan fizičkog pristupa i jasan uvjet za zaustavljanje.",
          "Zaključana prostorija, kontrolirana pohrana ili tragovi otvaranja mogu pomoći u tvojim okolnostima. Neoštećena plomba ili čist pregled ne dokazuju izostanak kompromitacije firmwarea ili hardvera. Svaku odsutnost ne smatraj dokazom krađe ključeva.",
        ]
      ),
      step(
        "replacement-plan",
        [
          "Plan replacement and possible key migration",
          "For high assurance, write this sequence: remove the suspicious signer from trusted signing duty → replace it with known-good generic hardware → recreate verified Debian/Core → restore known-good backups offline → verify addresses, descriptors, passphrase access and the signing procedure again.",
          "Your written response does not require trusting the suspicious signer or its working disk.",
          "If keys were used or unlocked after plausible compromise, or extraction may have occurred, generate fresh keys on a new trusted signer and migrate the funds after verifying that setup. A password change does not revoke stolen keys. Do not copy the suspicious OS image to the replacement.",
        ],
        [
          "Isplaniraj zamjenu i moguću promjenu ključeva",
          "Za visoku razinu pouzdanosti zapiši redoslijed: povuci sumnjivi potpisnik iz pouzdane uporabe → zamijeni ga pouzdanim generičkim hardverom → ponovno pripremi provjereni Debian/Core → offline obnovi pouzdane kopije → ponovno provjeri adrese, descriptore, pristup lozinci i postupak potpisivanja.",
          "Pisani postupak ne zahtijeva povjerenje u sumnjivi potpisnik ni njegov radni disk.",
          "Ako su ključevi korišteni ili otključani nakon moguće kompromitacije ili postoji mogućnost njihova izvlačenja, na novom pouzdanom potpisniku napravi nove ključeve i prenesi sredstva nakon provjere postave. Promjena lozinke ne opoziva ukradene ključeve. Sumnjivu sliku OS-a ne kopiraj na zamjenu.",
        ]
      ),
    ],
    notes: lines([
      "Tails does not make untrusted hardware trustworthy. Its live environment can reduce persistent OS traces, but malicious firmware, hardware implants, boot changes and compromised Tails media can still undermine it. It does not solve every Evil Maid scenario.",
      "Tails ne čini nepouzdan hardver pouzdanim. Live okruženje može smanjiti trajne tragove OS-a, ali zlonamjeran firmware, hardverski implantati, promjene pokretanja i kompromitiran Tails medij i dalje ga mogu ugroziti. Ne rješava svaki Evil Maid scenarij.",
    ]),
    prerequisites: ["real-device"],
    sources: [tailsWarnings, coreWallet, ...debianSources],
  })
  edit("optional-tails", {
    title: tr(
      "Optional Tails: when less persistent state helps",
      "Izborni Tails: kada pomaže manje trajnog stanja"
    ),
    summary: tr(
      "An advanced live environment for a threat model that benefits from reducing persistent OS state.",
      "Napredno live okruženje za model prijetnji kojem koristi smanjenje trajnog stanja OS-a."
    ),
    explanation: lines(
      [
        "Learn the persistent Debian default first. Tails is an optional alternative when an amnesic/live OS provides a meaningful benefit, such as reducing persistent traces and making the operating environment replaceable. Bitcoin Core remains the wallet and signer; the optional environment adds no other production wallet.",
        "Prvo nauči zadani trajni Debian put. Tails je izborna alternativa kada amnezički/live OS daje stvarnu korist, poput smanjenja trajnih tragova i lakše zamjene okruženja. Bitcoin Core ostaje novčanik i potpisnik; izborno okruženje ne dodaje drugi produkcijski novčanik.",
      ],
      [
        "Use only supported generic hardware and verified Tails media. Booting Tails does not make an untrusted computer trustworthy. It cannot eliminate malicious firmware, hardware implants, physical tampering or every Evil Maid scenario. Apply the same suspicion-and-replacement procedure as for Debian.",
        "Koristi samo podržani generički hardver i provjereni Tails medij. Pokretanje Tailsa ne čini nepouzdano računalo pouzdanim. Ne uklanja zlonamjerni firmware, hardverske implantate, fizičku manipulaciju ni svaki Evil Maid scenarij. Primijeni isti postupak sumnje i zamjene kao za Debian.",
      ],
      [
        "This optional draft uses encrypted Persistent Storage for Core and working wallet files. Those files survive shutdown and remain writable; the setup is not wholly amnesic. A fully nonpersistent workflow would require a separate restore-at-every-session procedure and its own rehearsal. In either case, keep independent wallet.dat backups and separate passphrase recovery.",
        "Ovaj izborni nacrt koristi šifrirani Persistent Storage za Core i radne datoteke novčanika. Te datoteke ostaju nakon gašenja i mogu se mijenjati; postava nije potpuno amnezička. Postupak bez trajne pohrane zahtijevao bi zasebnu obnovu pri svakoj sesiji i vlastitu vježbu. U oba slučaja čuvaj neovisne wallet.dat kopije i odvojen oporavak lozinke.",
      ]
    ),
    what: undefined,
    why: undefined,
    risk: undefined,
    notes: [],
    callouts: [],
    concepts: [],
    guidedSteps: [
      step(
        "tails-benefit",
        [
          "Name the benefit before changing environments",
          "After the Debian recovery rehearsal, write which threat would be reduced by Tails and what extra boot-media, storage and recovery responsibilities you accept. Continue with this draft only if that benefit matters for your threat model.",
          "You can explain why an optional live environment is worth maintaining.",
          "Tails needs supported x86-64 hardware; Apple Silicon is not supported. A cloned system USB can reduce downtime but cannot replace independent Core backups and password recovery.",
        ],
        [
          "Navedi korist prije promjene okruženja",
          "Nakon Debian vježbe oporavka zapiši koju bi prijetnju Tails smanjio i koje dodatne obveze oko medija za pokretanje, pohrane i oporavka prihvaćaš. Nastavi s ovim nacrtom samo ako korist odgovara tvojem modelu prijetnji.",
          "Možeš objasniti zašto vrijedi održavati izborno live okruženje.",
          "Tails zahtijeva podržani x86-64 hardver; Apple Silicon nije podržan. Klonirani sistemski USB može skratiti prekid rada, ali ne zamjenjuje neovisne Core kopije i oporavak lozinke.",
        ]
      ),
      ...lessons.get("optional-tails")!.guidedSteps!,
    ],
    sources: [...lessons.get("optional-tails")!.sources!, tailsWarnings],
  })

  replaceReading("ops-routine", {
    title: tr(
      "Keep a maintenance and recovery rhythm",
      "Održavaj ritam provjera i oporavka"
    ),
    explanation: lines([
      "A backup is not a backup until recovery has been tested. A file that exists or can be read is only a preliminary check. A real drill restores the wallet, checks expected addresses/descriptors/data, recovers the passphrase and completes construction, review, signing and the intended transaction workflow.",
      "Backup nije backup dok oporavak nije testiran. Datoteka koja postoji ili je čitljiva samo je početna provjera. Prava vježba obnavlja novčanik, provjerava očekivane adrese/descriptore/podatke, oporavlja lozinku i prolazi izradu, pregled, potpisivanje i cijeli namjeravani transakcijski postupak.",
    ]),
    concepts: lines(
      [
        "Operating system: Debian and its packages. Bitcoin Core software: the verified executables. Core data directory: blockchain blocks, chainstate, indexes and configuration. Wallet data: keys, descriptors and metadata, often in the data directory but backed up separately.",
        "Operacijski sustav: Debian i paketi. Bitcoin Core softver: provjereni izvršni programi. Core mapa podataka: blokovi, chainstate, indeksi i konfiguracija. Podaci novčanika: ključevi, descriptori i metapodaci, često u mapi podataka, ali sa zasebnim backupom.",
      ],
      [
        "Routine Debian updates or a Debian release upgrade do not normally require downloading the blockchain again if the Core data directory is preserved. A Core upgrade normally reuses it too. Read the release notes; migration, corruption, deletion, configuration changes or a requested reindex can require additional local processing, and missing block files can require downloading again.",
        "Redovne Debian nadogradnje ili prelazak na novo izdanje obično ne zahtijevaju ponovno preuzimanje blockchaina ako je Core mapa podataka sačuvana. I Core nadogradnja obično je ponovno koristi. Pročitaj bilješke izdanja; migracija, oštećenje, brisanje, konfiguracijske promjene ili zatraženi reindex mogu zahtijevati dodatnu lokalnu obradu, a nedostajući blokovi novo preuzimanje.",
      ]
    ),
    guidedSteps: [
      step(
        "schedule",
        [
          "Write the next two dates",
          "Schedule a quick backup/media check every 3–6 months and a full recovery drill at least once per year. For high-value or operationally complex setups, consider twice per year. Record the dates in the recovery document.",
          "The next quick check and full recovery drill have concrete dates.",
          "This cadence is the curriculum's recommended baseline, not a Bitcoin protocol requirement. Security updates may need action sooner; do not wait for the annual drill.",
        ],
        [
          "Zapiši sljedeća dva datuma",
          "Zakaži kratku provjeru kopija i medija svakih 3–6 mjeseci i cijelu vježbu oporavka najmanje jednom godišnje. Za velike vrijednosti ili složene postave razmotri dvaput godišnje. Datume zapiši u dokument oporavka.",
          "Sljedeća kratka provjera i cijela vježba imaju konkretne datume.",
          "To je preporučeni ritam kurikuluma, a ne zahtjev Bitcoin protokola. Sigurnosne nadogradnje mogu tražiti raniju reakciju; ne čekaj godišnju vježbu.",
        ]
      ),
      step(
        "media-check",
        [
          "Check copies and readable media",
          "Verify that every expected backup copy still exists and its USB, optical or external media can be read in a trusted environment. Read your recovery instructions again. Keep private wallet backups off the online coordinator and retain another good copy while checking media.",
          "You have recorded which copies were readable and corrected unclear documentation or replaced failed media.",
          "File exists is not a recovery test. Avoid overwriting your only good copy. A cloud listing or a second file on the same disk does not prove independent recovery.",
        ],
        [
          "Provjeri kopije i čitljivost medija",
          "Provjeri da svaka očekivana kopija postoji i da je USB, optički ili vanjski medij čitljiv u pouzdanom okruženju. Ponovno pročitaj upute. Privatne kopije drži izvan online koordinatora i tijekom provjere sačuvaj drugu ispravnu kopiju.",
          "Zabilježio si čitljive kopije, ispravio nejasne upute ili zamijenio neispravan medij.",
          "Postojanje datoteke nije test oporavka. Ne prepisuj jedinu ispravnu kopiju. Popis u cloudu ili druga datoteka na istom disku ne dokazuju neovisan oporavak.",
        ]
      ),
      step(
        "full-drill",
        [
          "Rehearse recovery without the primary devices",
          "Use the offline-recovery exercise and the written recovery card. Restore on a trusted replacement, match addresses and public descriptors, retrieve the separate passphrase, prepare a PSBT online, review and sign offline, then broadcast and confirm. Record the outcome and any correction. Use Signet for repeated rehearsals.",
          "A recorded transaction proves the replacement roles completed the intended workflow.",
          "Signet rehearses the procedure; it does not test your actual mainnet backup or passphrase. Check those offline on the trusted replacement and complete the existing small-value mainnet test before meaningful savings. Never upload a real backup to a practice site.",
        ],
        [
          "Uvježbaj oporavak bez glavnih uređaja",
          "Koristi lekciju offline oporavka i pisanu uputu. Obnovi na pouzdanoj zamjeni, usporedi adrese i javne descriptore, dohvati odvojenu lozinku, pripremi PSBT online, pregledaj i potpiši offline pa objavi i potvrdi. Zapiši rezultat i potrebne ispravke. Za ponavljane vježbe koristi Signet.",
          "Zabilježena transakcija dokazuje da su zamjenske uloge dovršile cijeli postupak.",
          "Signet uvježbava postupak; ne testira stvarni mainnet backup ni lozinku. Njih provjeri offline na pouzdanoj zamjeni i prije značajne štednje dovrši postojeći mali mainnet test. Stvarni backup nikada ne učitavaj na stranicu za vježbu.",
        ]
      ),
      step(
        "change-trigger",
        [
          "Record what triggers another drill immediately",
          "Require a new recovery test after a new wallet, changed wallet passphrase, backup architecture, imported keys/descriptors, multisig policy, replaced signer, recovery procedure or inheritance instructions. Refresh affected backups and documents as part of the change.",
          "Your change checklist includes a fresh recovery test before relying on the changed setup.",
          "Do not wait for the next annual date after a material change. Old backups are not updated by changing the active wallet's password; stolen keys are not revoked by it.",
        ],
        [
          "Zapiši što odmah pokreće novu vježbu",
          "Zahtijevaj novi test nakon novog novčanika, promjene lozinke, arhitekture kopija, uvoza ključeva/descriptora, multisig politike, zamjene potpisnika, postupka oporavka ili uputa za nasljeđivanje. Uz promjenu osvježi zahvaćene kopije i dokumente.",
          "Popis za promjene uključuje novi test prije oslanjanja na promijenjenu postavu.",
          "Nakon bitne promjene ne čekaj godišnji datum. Promjena lozinke aktivnog novčanika ne ažurira stare kopije i ne opoziva ukradene ključeve.",
        ]
      ),
      step(
        "maintenance",
        [
          "Maintain Debian and Core separately",
          "Record the Core data path and back up relevant configuration and wallet material before meaningful maintenance. On the online node, apply Debian security updates and follow Debian's supported lifecycle for major upgrades. Evaluate Core releases separately, verify each new release and follow its upgrade notes. Preserve the existing data directory.",
          "Your maintenance plan distinguishes Debian, Core executables, blockchain data and wallet data.",
          "For a signer containing keys, stay offline. Prepare and authenticate required updates on a separate machine, or build an updated replacement with no secrets, isolate it and restore known-good backups. Rehearse the actual update/replacement path; do not connect the active signer just to run apt. Additional local migration or reindex work is sometimes required.",
        ],
        [
          "Održavaj Debian i Core odvojeno",
          "Zapiši putanju Core podataka i prije bitnog održavanja kopiraj važnu konfiguraciju i podatke novčanika. Na online čvoru primjenjuj Debian sigurnosne nadogradnje i prati podržani životni ciklus za velika izdanja. Core izdanja procjenjuj odvojeno, svako provjeri i prati upute za nadogradnju. Sačuvaj postojeću mapu podataka.",
          "Plan razlikuje Debian, Core programe, blockchain podatke i podatke novčanika.",
          "Potpisnik s ključevima ostaje offline. Potrebne nadogradnje pripremi i autentificiraj zasebno ili napravi ažuriranu zamjenu bez tajni, izoliraj je i obnovi pouzdane kopije. Uvježbaj stvarni put nadogradnje ili zamjene; aktivni potpisnik ne povezuj samo radi apt naredbe. Ponekad je potrebna dodatna lokalna migracija ili reindex.",
        ]
      ),
    ],
    prerequisites: ["mainnet-small-test"],
    sources: [
      coreWallet,
      coreFiles,
      apt,
      debianSources[0],
      {
        label: "Debian · Release upgrade procedure",
        url: "https://www.debian.org/releases/stable/release-notes/upgrading.en.html",
      },
      {
        label: "Core 31.1 · Upgrade notes",
        url: "https://bitcoincore.org/en/releases/31.1/",
      },
    ],
  })
  edit("ops-documentation", {
    guidedSteps: [
      ...lessons.get("ops-documentation")!.guidedSteps!,
      step(
        "operator-unavailable",
        [
          "Test who can act without you",
          "Name the person who can find and follow the procedure if you die or become unavailable. Have them rehearse with Signet artifacts and correct every unclear step. Record how they locate wallet.dat backups and separately recover the wallet passphrase without relying on your memory.",
          "The procedure identifies a successor and their route to both recovery components.",
          "Do not share production secrets for a practice exercise. Review access and inheritance instructions after life changes. Any legal arrangements need their own appropriate review.",
        ],
        [
          "Provjeri tko može postupati bez tebe",
          "Odredi osobu koja može pronaći i pratiti postupak ako umreš ili postaneš nedostupan. Neka vježba sa Signet podacima; ispravite svaki nejasan korak. Zapiši kako nalazi wallet.dat kopije i odvojeno oporavlja lozinku bez oslanjanja na tvoje pamćenje.",
          "Postupak navodi nasljednika i put do obaju dijelova oporavka.",
          "Za vježbu ne dijeli produkcijske tajne. Pristup i upute za nasljeđivanje preispitaj nakon životnih promjena. Pravni dio zahtijeva zaseban odgovarajući pregled.",
        ]
      ),
    ],
  })
  for (const id of [
    "offline-recovery",
    "real-encryption",
    "mainnet-separate-wallet",
  ])
    edit(id, { referenceVersion: "Debian Stable · Bitcoin Core 31.1" })
}
