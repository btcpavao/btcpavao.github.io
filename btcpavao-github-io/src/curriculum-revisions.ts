import type {
  CurriculumPhase,
  PlayerLesson,
} from "@/bitcoin-core-curriculum-player-en-data"
import { reviseCustodyPolicy } from "@/curriculum-custody-policy"
import { reviseBeginnerLanguage } from "@/curriculum-beginner-language"
import type { GuidedStep } from "@/curriculum-learning"

type Language = "en" | "hr"
const coreWallet = {
  label: "Bitcoin Core 31.1 · Wallet management",
  url: "https://github.com/bitcoin/bitcoin/blob/v31.1/doc/managing-wallets.md",
}
const coreOffline = {
  label: "Bitcoin Core 31.1 · Offline signing",
  url: "https://github.com/bitcoin/bitcoin/blob/v31.1/doc/offline-signing-tutorial.md",
}
const coreRpc = {
  label: "Bitcoin Core 31.1 · Wallet RPC source",
  url: "https://github.com/bitcoin/bitcoin/tree/v31.1/src/wallet/rpc",
}
const tailsSources = [
  {
    label: "Tails · Hardware requirements",
    url: "https://tails.net/doc/about/requirements/index.en.html",
  },
  {
    label: "Tails · Installation and verification",
    url: "https://tails.net/install/",
  },
  {
    label: "Tails · Offline Mode",
    url: "https://tails.net/doc/first_steps/welcome_screen/index.en.html",
  },
  {
    label: "Tails · Create Persistent Storage",
    url: "https://tails.net/doc/persistent_storage/create/index.en.html",
  },
  {
    label: "Tails · Persistent Folder",
    url: "https://tails.net/doc/persistent_storage/configure/index.en.html",
  },
]

// Editorial revision: stable lesson IDs and slugs preserve bookmarks. New procedures
// retain their review-required status; rearranging a lesson is not a hardware test.
export function reviseCurriculum(
  phases: CurriculumPhase[],
  language: Language
): CurriculumPhase[] {
  const tr = (en: string, hr: string) => (language === "en" ? en : hr)
  const lessons = new Map(
    phases
      .flatMap((p) => p.lessons)
      .map((l) => [l.id, { ...l, kind: "reading" as PlayerLesson["kind"] }])
  )
  function edit(id: string, patch: Partial<PlayerLesson>) {
    const lesson = lessons.get(id)
    if (!lesson) throw new Error(`Unknown curriculum lesson: ${id}`)
    lessons.set(id, { ...lesson, ...patch })
  }
  function step(
    id: string,
    en: [string, string, string, string?],
    hr: [string, string, string, string?],
    command?: string,
    commandContext?: string
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
      commandContext,
    }
  }
  function guide(
    id: string,
    title: string,
    steps: GuidedStep[],
    prerequisites: string[] = []
  ) {
    edit(id, {
      title,
      objective: steps.at(-1)?.expectedResult ?? title,
      kind: "practice",
      guidedSteps: steps,
      prerequisites,
      codeBlocks: [],
      walkthrough: undefined,
      checklist: undefined,
    })
  }
  const consoleContext = tr(
    "Bitcoin Core · Window → Console (select the named wallet)",
    "Bitcoin Core · Window → Console (odaberi navedeni novčanik)"
  )
  const terminal = tr(
    "Linux system terminal · not the Core console",
    "Sistemski terminal Linuxa · nije Coreova konzola"
  )
  const testOnly = tr(
    "Use Signet test coins only. Never reuse these keys or passwords for mainnet.",
    "Koristi samo testne Signet bitcoine. Ove ključeve i lozinke nikada ne koristi za mainnet."
  )

  edit("0.1", {
    title: tr("What you will build", "Što ćeš izgraditi"),
    objective: tr(
      "Learn the three roles, then practise with bitcoin that has no monetary value.",
      "Upoznaj tri uloge pa vježbaj s bitcoinima bez novčane vrijednosti."
    ),
    estimatedTime: tr("5 min reading", "5 min čitanja"),
    explanation: [
      tr(
        "A private key authorizes spending. A wallet manages keys and the information needed to use them. A node checks Bitcoin's rules and transactions. Bitcoin Core can perform all three roles; later we separate the online node from the offline signer.",
        "Privatni ključ omogućuje potpisivanje potrošnje. Novčanik upravlja ključevima i podacima za njihovu upotrebu. Čvor provjerava Bitcoinova pravila i transakcije. Bitcoin Core može obavljati sve tri uloge; kasnije odvajamo online čvor od offline potpisnika."
      ),
      tr(
        "First complete a Signet receive → send → backup recovery → send cycle. Then rehearse an offline signer and a watch-only coordinator. Mainnet starts with new keys and a small test only after recovery works. Use the outline to read ahead; the guided path stops at unfinished required exercises.",
        "Prvo prođi Signet ciklus primitak → slanje → oporavak iz backupa → ponovno slanje. Zatim uvježbaj offline potpisnika i watch-only koordinator. Mainnet počinje novim ključevima i malim testom tek nakon uspješnog oporavka. Sadržaj možeš čitati unaprijed iz pregleda; vođeni put staje na nedovršenoj obaveznoj vježbi."
      ),
    ],
    sources: [coreWallet, coreOffline],
  })
  guide(
    "0.2",
    tr(
      "Choose two risks to prepare for",
      "Odaberi dvije prijetnje za koje se pripremaš"
    ),
    [
      step(
        "risks",
        [
          "Write down two likely failures",
          "On paper, choose two failures relevant to you, such as a lost device and a forgotten recovery procedure. For each, write which backup or person would help you recover.",
          "You have two failure scenarios and a recovery action for each.",
          "If the answer is only ‘I will remember’, write where a future you could find the procedure without exposing secrets.",
        ],
        [
          "Zapiši dva moguća problema",
          "Na papir zapiši dva problema važna za tvoju situaciju, primjerice izgubljen uređaj i zaboravljen postupak oporavka. Za svaki navedi koja kopija ili osoba pomaže pri oporavku.",
          "Imaš dva scenarija i postupak oporavka za svaki.",
          "Ako je odgovor samo ‘zapamtit ću’, zapiši gdje ćeš kasnije pronaći postupak bez otkrivanja tajni.",
        ]
      ),
    ]
  )
  edit("signet-why", { estimatedTime: tr("3 min reading", "3 min čitanja") })
  edit("signet-vs-mainnet", {
    estimatedTime: tr("3 min reading", "3 min čitanja"),
  })

  guide(
    "signet-install-verify",
    tr("Install and verify Core", "Instaliraj i provjeri Core"),
    [
      step(
        "platform",
        [
          "Download the matching package",
          "Use the official Bitcoin Core download link under Sources. This worked path uses Linux x86-64 and Core 31.1. Download its archive, SHA256SUMS and SHA256SUMS.asc into one folder. For Windows or macOS, use the matching official verification tab; the Linux commands below do not apply.",
          "All three files belong to release 31.1 and the archive matches your operating system and processor.",
          "Check architecture in your system settings. This reference uses Debian Stable on x86-64. Use the official platform instructions for other processors.",
        ],
        [
          "Preuzmi odgovarajući paket",
          "Otvori službeno preuzimanje Bitcoin Corea pod Izvori. Ovaj primjer koristi Linux x86-64 i Core 31.1. U istu mapu spremi arhivu, SHA256SUMS i SHA256SUMS.asc. Za Windows ili macOS koristi odgovarajuću karticu službenih uputa; naredbe za Linux ispod nisu primjenjive.",
          "Sve tri datoteke pripadaju izdanju 31.1, a arhiva odgovara sustavu i procesoru.",
          "Arhitekturu provjeri u postavkama sustava. Ovaj primjer koristi Debian Stable na x86-64. Za druge procesore koristi službene upute sustava.",
        ]
      ),
      step(
        "hash",
        [
          "Check the archive's checksum",
          "Open the system terminal in the download folder. Run the checksum check before opening the archive.",
          "The exact archive you downloaded is listed with OK.",
          "A FAILED result or no matching file means stop. Check the folder, filename and release; do not run the downloaded program.",
        ],
        [
          "Provjeri checksum arhive",
          "Otvori sistemski terminal u mapi preuzimanja. Provjeri checksum prije otvaranja arhive.",
          "Uz točan naziv preuzete arhive piše OK.",
          "Ako piše FAILED ili nema odgovarajuće datoteke, stani. Provjeri mapu, naziv i izdanje; nemoj pokretati program.",
        ],
        "sha256sum --ignore-missing --check SHA256SUMS",
        terminal
      ),
      step(
        "signature",
        [
          "Verify who signed those checksums",
          "Follow the official download page to obtain builder public keys. Independently check the fingerprints of the signers you rely on, import their keys with GPG, and verify the signatures below.",
          "GPG reports valid signatures from the expected, fingerprint-checked keys.",
          "A valid signature from an unknown key is insufficient. Missing keys and an uncertified identity are different warnings; resolve trust in the expected signers before continuing.",
        ],
        [
          "Provjeri tko je potpisao checksume",
          "Prati službene upute za preuzimanje javnih ključeva graditelja. Neovisno provjeri otiske ključeva potpisnika kojima vjeruješ, uvezi njihove ključeve u GPG i provjeri potpise naredbom ispod.",
          "GPG prikazuje valjane potpise očekivanih ključeva čije si otiske provjerio.",
          "Valjan potpis nepoznatog ključa nije dovoljan. Nedostajući ključ i nepotvrđen identitet različita su upozorenja; prije nastavka razjasni povjerenje u potpisnike.",
        ],
        "gpg --verify SHA256SUMS.asc SHA256SUMS",
        terminal
      ),
      step(
        "extract",
        [
          "Extract the verified program",
          "Extract bitcoin-31.1-x86_64-linux-gnu.tar.gz into a folder you control. Inside bitcoin-31.1/bin, run bitcoin-qt with -version. Keep this folder: the next exercise launches its GUI on Signet.",
          "The version output identifies Bitcoin Core 31.1.",
          "If the program cannot run or reports missing libraries, use the official platform documentation. Do not download replacement executables from an error-message link.",
        ],
        [
          "Raspakiraj provjereni program",
          "Raspakiraj bitcoin-31.1-x86_64-linux-gnu.tar.gz u mapu pod svojom kontrolom. U bitcoin-31.1/bin pokreni bitcoin-qt s -version. Zadrži ovu mapu: sljedeća vježba iz nje pokreće GUI na Signetu.",
          "Ispis verzije navodi Bitcoin Core 31.1.",
          "Ako se program ne pokreće ili nedostaju biblioteke, koristi službenu dokumentaciju sustava. Ne preuzimaj zamjenske programe s poveznice iz poruke o grešci.",
        ],
        "./bitcoin-qt -version",
        terminal
      ),
    ]
  )
  edit("signet-install-verify", {
    sources: [
      {
        label: "Bitcoin Core · Download and platform verification",
        url: "https://bitcoincore.org/en/download/",
      },
      ...(lessons.get("signet-install-verify")?.sources ?? []),
    ],
  })
  guide(
    "signet-start",
    tr("Start Core on Signet", "Pokreni Core na Signetu"),
    [
      step(
        "launch",
        [
          "Launch the test network",
          "Close any other Core GUI first. From the verified bitcoin-31.1/bin folder, run the command below. On other operating systems, launch the verified Core executable with the same -signet argument. Select a test data directory with enough disk space.",
          "Core opens in its Signet context. Leave this GUI running throughout the exercises.",
          "The GUI includes the node. You do not need a second bitcoind process or an RPC server for its built-in console.",
        ],
        [
          "Pokreni testnu mrežu",
          "Prvo zatvori drugi Core GUI ako je otvoren. U provjerenoj mapi bitcoin-31.1/bin pokreni naredbu ispod. Na drugim sustavima pokreni provjereni Core program s istim argumentom -signet. Odaberi testnu mapu podataka s dovoljno prostora.",
          "Core je otvoren u Signet okruženju. Ovaj GUI ostaje pokrenut tijekom vježbi.",
          "GUI uključuje čvor. Za njegovu ugrađenu konzolu ne trebaš drugi bitcoind proces ni RPC poslužitelj.",
        ],
        "./bitcoin-qt -signet",
        terminal
      ),
      step(
        "chain",
        [
          "Confirm the network in Core's console",
          "Open Window → Console. Commands labeled ‘Bitcoin Core’ go here without the bitcoin-cli prefix. Run getblockchaininfo. Wait for synchronization before receiving and spending; wallet preparation can happen while it runs.",
          "chain is signet. Before transactions, initialblockdownload is false and the GUI no longer reports synchronization in progress.",
          "If chain is main, close Core and correct the launch argument. An address starting tb1 does not by itself distinguish Signet from testnet.",
        ],
        [
          "Provjeri mrežu u Coreovoj konzoli",
          "Otvori Window → Console. Naredbe označene ‘Bitcoin Core’ unose se ovdje bez prefiksa bitcoin-cli. Pokreni getblockchaininfo. Prije primanja i trošenja pričekaj sinkronizaciju; novčanik možeš pripremati dok traje.",
          "chain je signet. Prije transakcija initialblockdownload je false, a GUI više ne prikazuje sinkronizaciju.",
          "Ako je chain main, zatvori Core i ispravi argument pokretanja. Adresa koja počinje s tb1 sama ne razlikuje Signet od testneta.",
        ],
        "getblockchaininfo",
        consoleContext
      ),
    ],
    ["signet-install-verify"]
  )
  guide(
    "signet-first-wallet",
    tr("Create a test wallet", "Napravi testni novčanik"),
    [
      step(
        "create",
        [
          "Create signet-training-wallet",
          "After confirming Signet, use File → Create Wallet. Name it signet-training-wallet. For this test-only encryption exercise leave Encrypt Wallet unchecked. Leave Disable Private Keys and Make Blank Wallet unchecked. Do not receive coins yet.",
          "The selected wallet is signet-training-wallet.",
          "If the name already exists, return to that training wallet or use a fresh test data directory; never overwrite another wallet.",
        ],
        [
          "Napravi signet-training-wallet",
          "Nakon provjere Signeta odaberi File → Create Wallet. Nazovi ga signet-training-wallet. Samo za ovu testnu vježbu šifriranja ostavi Encrypt Wallet neoznačen. Disable Private Keys i Make Blank Wallet također ostaju neoznačeni. Još ne primaj bitcoine.",
          "Odabran je novčanik signet-training-wallet.",
          "Ako naziv postoji, vrati se tom testnom novčaniku ili koristi novu testnu mapu podataka; nemoj prepisati drugi novčanik.",
        ]
      ),
      step(
        "state",
        [
          "Check its capabilities",
          "Select signet-training-wallet in the console's wallet selector and run getwalletinfo.",
          "walletname is signet-training-wallet, descriptors is true and private_keys_enabled is true.",
          "A watch-only wallet cannot sign. If the fields differ, revisit creation before encryption.",
        ],
        [
          "Provjeri njegove mogućnosti",
          "U biraču novčanika u konzoli odaberi signet-training-wallet i pokreni getwalletinfo.",
          "walletname je signet-training-wallet, descriptors je true i private_keys_enabled je true.",
          "Watch-only novčanik ne može potpisivati. Ako polja nisu takva, vrati se izradi prije šifriranja.",
        ],
        "getwalletinfo",
        consoleContext
      ),
    ],
    ["signet-start"]
  )
  guide(
    "signet-encrypt-new-backup",
    tr("Encrypt and save a new backup", "Šifriraj i spremi novi backup"),
    [
      step(
        "context",
        [
          "Confirm the wallet and network",
          "In Core's console check the network, then check the selected wallet. Use only signet-training-wallet and a dedicated test password.",
          "chain is signet and walletname is signet-training-wallet.",
          "If either value differs, stop and select the correct test context.",
        ],
        [
          "Potvrdi novčanik i mrežu",
          "U Coreovoj konzoli provjeri mrežu pa odabrani novčanik. Koristi samo signet-training-wallet i zasebnu testnu lozinku.",
          "chain je signet, a walletname je signet-training-wallet.",
          "Ako se bilo koji podatak razlikuje, stani i odaberi ispravno testno okruženje.",
        ],
        "getblockchaininfo\ngetwalletinfo",
        consoleContext
      ),
      step(
        "encrypt",
        [
          "Encrypt the test wallet",
          "In the GUI choose Settings → Encrypt Wallet. Enter and confirm a dedicated test password in Core's dialog. Read the warning about creating a new backup.",
          "Core confirms encryption and the wallet displays its encrypted state.",
          "A forgotten password cannot be reset. If already encrypted, use the known test password; do not guess or change another wallet.",
        ],
        [
          "Šifriraj testni novčanik",
          "U GUI-ju odaberi Settings → Encrypt Wallet. U Coreov dijalog unesi i potvrdi zasebnu testnu lozinku. Pročitaj upozorenje o novom backupu.",
          "Core potvrđuje šifriranje, a novčanik prikazuje šifrirano stanje.",
          "Zaboravljena lozinka ne može se resetirati. Ako je već šifriran, koristi poznatu testnu lozinku; nemoj pogađati ni mijenjati drugi novčanik.",
        ]
      ),
      step(
        "backup",
        [
          "Save a post-encryption backup",
          "Select signet-training-wallet, then File → Backup Wallet. In an existing backup folder, save a new file named signet-training-after-encryption.dat. Keep it separate from the active wallet directory.",
          "Core reports no backup error and the new file exists at the recorded location.",
          "Create the destination folder and check write access if saving fails. Copying the live wallet.dat by hand is not the backup procedure.",
        ],
        [
          "Spremi backup nakon šifriranja",
          "Odaberi signet-training-wallet pa File → Backup Wallet. U postojeću mapu za kopije spremi novu datoteku signet-training-after-encryption.dat. Drži je odvojeno od aktivne mape novčanika.",
          "Core nije prijavio grešku, a nova datoteka postoji na zabilježenom mjestu.",
          "Ako spremanje ne uspije, napravi odredišnu mapu i provjeri prava pisanja. Ručno kopiranje aktivnog wallet.dat nije ovaj postupak backupa.",
        ]
      ),
      step(
        "record",
        [
          "Record what recovery needs",
          "Record the network, wallet name, Core version, backup date and location. Keep the test password separately. The wallet backup matters for recovery; blockchain blocks can be downloaded again. A file's presence is only a preliminary check: restore and spending come next.",
          "You can locate the new backup and its password independently.",
          "A copy made before encryption does not cover the new keys. A copy on the same USB is not protection against losing that USB.",
        ],
        [
          "Zapiši što treba za oporavak",
          "Zapiši mrežu, naziv novčanika, verziju Corea, datum i mjesto kopije. Testnu lozinku čuvaj odvojeno. Backup novčanika potreban je za oporavak; blokove blockchaina možeš ponovno preuzeti. Postojanje datoteke samo je prva provjera: slijede obnova i trošenje.",
          "Novu kopiju i pripadajuću lozinku možeš pronaći neovisno.",
          "Kopija prije šifriranja ne pokriva nove ključeve. Kopija na istom USB-u ne štiti od gubitka tog USB-a.",
        ]
      ),
    ],
    ["signet-first-wallet"]
  )
  guide(
    "signet-receive-send",
    tr("Receive and send on Signet", "Primi i pošalji na Signetu"),
    [
      step(
        "receive",
        [
          "Request test coins",
          "Confirm chain = signet and a synchronized node. In signet-training-wallet choose Receive → Create new receiving address. Use the Signet faucet linked by the official offline-signing tutorial. Give it only this public address; never pay for test coins.",
          "A faucet transaction appears in Core for your recorded address.",
          "Faucets may be unavailable or rate-limited. Wait or use another faucet for the same default Signet; do not switch networks to make an address work.",
        ],
        [
          "Zatraži testne bitcoine",
          "Potvrdi chain = signet i sinkroniziran čvor. U signet-training-wallet odaberi Receive → Create new receiving address. Koristi Signet faucet naveden u službenom vodiču za offline potpisivanje. Unesi samo javnu adresu; testne bitcoine nemoj plaćati.",
          "Transakcija fauceta pojavljuje se u Coreu uz tvoju zabilježenu adresu.",
          "Faucet može biti nedostupan ili imati ograničenje. Pričekaj ili koristi drugi za isti zadani Signet; nemoj mijenjati mrežu da adresa proradi.",
        ]
      ),
      step(
        "confirmed",
        [
          "Wait for a spendable output",
          "Open Transactions and inspect the receipt. Wait for at least one confirmation. In the selected wallet's console run listunspent and record the transaction ID and amount.",
          "The received output has at least one confirmation and is spendable.",
          "An unconfirmed receipt is different from a missing receipt. Check chain, synchronization and the exact address before requesting again.",
        ],
        [
          "Pričekaj potvrđeni izlaz",
          "Otvori Transactions i pregledaj primitak. Pričekaj barem jednu potvrdu. U konzoli odabranog novčanika pokreni listunspent i zapiši identifikator transakcije i iznos.",
          "Primljeni izlaz ima barem jednu potvrdu i može se potrošiti.",
          "Nepotvrđeni primitak nije isto što i nedostajući primitak. Prije ponovnog zahtjeva provjeri mrežu, sinkronizaciju i točnu adresu.",
        ],
        "listunspent",
        consoleContext
      ),
      step(
        "send",
        [
          "Review a small self-transfer",
          "Create another receiving address in your own test wallet. In Send enter that address and an amount below the confirmed balance, leaving room for fees and the later recovery exercise. Choose a displayed fee rate. Compare destination, amount and total fee in the confirmation dialog, then unlock and send.",
          "Core reports a transaction ID; its recipient is your recorded second address.",
          "If fee estimation is unavailable, wait for more network data or use a deliberately chosen Signet-only custom fee. Do not press Send without understanding the displayed total.",
        ],
        [
          "Pregledaj malo slanje sebi",
          "U vlastitom testnom novčaniku napravi novu adresu za primitak. U Send unesi tu adresu i iznos manji od potvrđenog salda, s prostorom za naknadu i kasniju vježbu oporavka. Odaberi prikazanu stopu naknade. U potvrdi usporedi odredište, iznos i ukupnu naknadu pa otključaj i pošalji.",
          "Core prikazuje identifikator transakcije, a primatelj je tvoja zabilježena druga adresa.",
          "Ako procjena naknade nije dostupna, pričekaj mrežne podatke ili svjesno odaberi ručnu naknadu samo za Signet. Nemoj potvrditi slanje bez razumijevanja prikazanog ukupnog iznosa.",
        ]
      ),
      step(
        "change",
        [
          "Identify the fee and change",
          "After confirmation, inspect the transaction in Core. The fee is total inputs minus total outputs. Check your recipient output and any change returning to your wallet. A self-transfer reduces your total balance only by its fee.",
          "You can identify the recipient, any change, the fee and a confirmation.",
          "Change is not another payment to a stranger. Use the wallet's ownership information rather than recognizing an address by sight.",
        ],
        [
          "Prepoznaj naknadu i kusur",
          "Nakon potvrde pregledaj transakciju u Coreu. Naknada je zbroj ulaza minus zbroj izlaza. Provjeri izlaz primatelju i eventualni kusur svom novčaniku. Slanje sebi smanjuje ukupni saldo samo za naknadu.",
          "Prepoznaješ primatelja, eventualni kusur, naknadu i potvrdu.",
          "Kusur nije dodatno plaćanje nepoznatoj osobi. Koristi podatke o pripadnosti novčaniku, a ne prepoznavanje adrese napamet.",
        ]
      ),
    ],
    ["signet-encrypt-new-backup"]
  )
  edit("signet-receive-send", {
    sources: [coreWallet, coreOffline, coreRpc],
    estimatedTime: tr(
      "15–25 min active + confirmations",
      "15–25 min rada + čekanje potvrda"
    ),
  })
  guide(
    "signet-restore",
    tr("Restore without the active wallet", "Obnovi bez aktivnog novčanika"),
    [
      step(
        "record",
        [
          "Record evidence and close the original",
          "Record a funded address and transaction ID from the test wallet. Use File → Close Wallet for signet-training-wallet. Keep its files intact; this exercise never requires deleting them.",
          "The original test wallet is closed and you can locate the post-encryption backup independently.",
          "Do not move a directory whose identity you cannot prove. Never touch another wallet or the blockchain folders.",
        ],
        [
          "Zabilježi podatke i zatvori izvornik",
          "Zapiši financiranu adresu i identifikator transakcije iz testnog novčanika. Odaberi File → Close Wallet za signet-training-wallet. Sačuvaj njegove datoteke; ova vježba ne zahtijeva brisanje.",
          "Izvorni testni novčanik je zatvoren, a kopiju nakon šifriranja možeš pronaći neovisno.",
          "Nemoj premještati mapu čiji identitet ne možeš dokazati. Ne diraj drugi novčanik ni mape blockchaina.",
        ]
      ),
      step(
        "restore",
        [
          "Restore under a new name",
          "Use File → Restore Wallet. Choose signet-training-after-encryption.dat and name the restored wallet signet-training-restored. Allow the wallet scan to finish; select the restored wallet in both the GUI and console.",
          "getwalletinfo reports walletname = signet-training-restored and descriptors = true.",
          "If the name exists, use a fresh test data directory rather than overwrite it. If pruned blocks are missing, recover against a node with the required history or download and validate that history again.",
        ],
        [
          "Obnovi pod novim nazivom",
          "Odaberi File → Restore Wallet. Odaberi signet-training-after-encryption.dat i nazovi obnovljeni novčanik signet-training-restored. Pričekaj pregled povijesti; obnovljeni novčanik odaberi u GUI-ju i konzoli.",
          "getwalletinfo prikazuje walletname = signet-training-restored i descriptors = true.",
          "Ako naziv postoji, koristi novu testnu mapu podataka umjesto prepisivanja. Ako nedostaju odbačeni blokovi, obnovi uz čvor s potrebnom poviješću ili ponovno preuzmi i validiraj tu povijest.",
        ],
        "getwalletinfo",
        consoleContext
      ),
      step(
        "compare",
        [
          "Compare the recovered state",
          "Find the recorded funded address and transaction in the restored wallet. Keep the original closed. The next exercise sends from signet-training-restored and tests the password when Core requests it.",
          "The recovered wallet recognizes the recorded transaction and expected spendable outputs.",
          "Do not compare only the next newly generated address: address indices may differ. A visible balance alone does not prove signing recovery.",
        ],
        [
          "Usporedi obnovljeno stanje",
          "U obnovljenom novčaniku pronađi zabilježenu financiranu adresu i transakciju. Izvornik ostaje zatvoren. Sljedeća vježba šalje iz signet-training-restored i provjerava lozinku kada je Core zatraži.",
          "Obnovljeni novčanik prepoznaje zabilježenu transakciju i očekivane raspoložive izlaze.",
          "Nemoj usporediti samo iduću novu adresu: indeksi mogu biti različiti. Sam vidljiv saldo ne dokazuje oporavak potpisivanja.",
        ]
      ),
    ],
    ["signet-receive-send"]
  )
  edit("signet-restore", {
    explanation: [
      tr(
        "Restore a separate test wallet from the backup while leaving the original closed. Keeping the original intact makes the rehearsal reversible; only the restored wallet may sign the next transaction.",
        "Obnovi zaseban testni novčanik iz kopije dok izvornik ostaje zatvoren. Sačuvani izvornik omogućuje povratak; sljedeću transakciju smije potpisati samo obnovljeni novčanik."
      ),
    ],
  })
  guide(
    "signet-transact-again",
    tr("Send from the recovered wallet", "Pošalji iz obnovljenog novčanika"),
    [
      step(
        "selected",
        [
          "Select only the restored wallet",
          "Confirm Signet, a synchronized node and signet-training-restored in the wallet selector. Keep signet-training-wallet closed. Create a new receiving address in the restored wallet.",
          "The sending wallet is the restored wallet and you have a fresh destination you own.",
          "If the original wallet is selected, stop; a signature from it would not demonstrate recovery.",
        ],
        [
          "Odaberi samo obnovljeni novčanik",
          "Potvrdi Signet, sinkroniziran čvor i signet-training-restored u biraču novčanika. signet-training-wallet ostaje zatvoren. U obnovljenom novčaniku napravi novu adresu za primitak.",
          "Novčanik pošiljatelj je obnovljeni novčanik i imaš novu vlastitu adresu.",
          "Ako je odabran izvornik, stani; njegov potpis ne bi dokazao oporavak.",
        ]
      ),
      step(
        "spend",
        [
          "Sign and confirm another test transaction",
          "Repeat the small self-transfer from the receive/send lesson using signet-training-restored. Review destination, amount, change and fee. Enter the test password only in Core's send dialog. Wait for a confirmation and record the new transaction ID.",
          "A transaction signed by the restored wallet is confirmed. The original wallet was not needed.",
          "A wrong password, missing key or failed transaction means the recovery exercise is unfinished. Return to the backup and selected wallet before trying again.",
        ],
        [
          "Potpiši i potvrdi novu testnu transakciju",
          "Ponovi malo slanje sebi iz lekcije primanja/slanja, sada iz signet-training-restored. Pregledaj odredište, iznos, kusur i naknadu. Testnu lozinku unesi samo u Coreov dijalog slanja. Pričekaj potvrdu i zapiši novi identifikator transakcije.",
          "Transakcija potpisana obnovljenim novčanikom je potvrđena. Izvorni novčanik nije bio potreban.",
          "Pogrešna lozinka, nedostajući ključ ili neuspjela transakcija znače da vježba oporavka nije dovršena. Prije novog pokušaja provjeri kopiju i odabrani novčanik.",
        ]
      ),
    ],
    ["signet-restore"]
  )
  edit("signet-readiness", {
    kind: "checkpoint",
    title: tr("Complete the Signet cycle", "Potvrdi cijeli Signet ciklus"),
    objective: tr(
      "Confirm the exercises you performed before preparing a real-money setup.",
      "Potvrdi izvedene vježbe prije pripreme sustava za stvarni novac."
    ),
    prerequisites: [
      "signet-encrypt-new-backup",
      "signet-receive-send",
      "signet-restore",
      "signet-transact-again",
    ],
    checklist: [
      tr(
        "I restored the post-encryption backup while the original wallet stayed closed.",
        "Obnovio sam kopiju nakon šifriranja dok je izvorni novčanik ostao zatvoren."
      ),
      tr(
        "I signed and confirmed another transaction from the restored wallet.",
        "Potpisao sam i potvrdio novu transakciju iz obnovljenog novčanika."
      ),
      tr(
        "I can identify the network, recipient, change and fee without guessing.",
        "Mogu prepoznati mrežu, primatelja, kusur i naknadu bez pogađanja."
      ),
    ],
    explanation: [
      tr(
        "Reading is separate from practice. This checkpoint counts only after the required exercises and your confirmations are complete. Your browser cannot independently verify what happened in Core.",
        "Čitanje je odvojeno od vježbe. Ova se provjera računa tek nakon obaveznih vježbi i tvojih potvrda. Preglednik ne može neovisno provjeriti što se dogodilo u Coreu."
      ),
    ],
  })

  edit("architecture-choice", {
    title: tr(
      "Prepare the offline signing path",
      "Pripremi put offline potpisivanja"
    ),
    objective: tr(
      "The guided savings path uses an online watch-only node and a separate offline Core signer.",
      "Vođeni put za štednju koristi online watch-only čvor i odvojeni offline Core potpisnik."
    ),
    explanation: [
      tr(
        "The main path now follows Path B: a networked Core node with public wallet information, and an offline Core signer holding private keys. You will rehearse both roles on Signet before creating any mainnet keys.",
        "Glavni put sada prati Path B: mrežni Core čvor s javnim podacima novčanika i offline Core potpisnik s privatnim ključevima. Obje ćeš uloge uvježbati na Signetu prije izrade mainnet ključeva."
      ),
      tr(
        "The online encrypted-wallet alternative remains optional reading. Completing that article does not substitute for the offline-signing prerequisites. If you cannot maintain a separate signer, stop and reconsider the architecture before using these mainnet instructions.",
        "Alternativa s online šifriranim novčanikom ostaje izborno čitanje. Ta lekcija ne zamjenjuje preduvjete offline potpisivanja. Ako ne možeš održavati odvojeni potpisnik, prije ovih mainnet uputa stani i ponovno razmotri arhitekturu."
      ),
    ],
    prerequisites: ["signet-readiness"],
  })
  guide(
    "real-device",
    tr("Check the devices before setup", "Provjeri uređaje prije postavljanja"),
    [
      step(
        "hardware",
        [
          "Confirm compatible, controlled hardware",
          "Choose an online node and a separate generic signer you control. Check Debian Stable support and boot compatibility before storing secrets.",
          "You have identified a supported signer and a separate online node.",
          "Identify devices and media before installation. An operating system cannot repair compromised hardware.",
        ],
        [
          "Potvrdi kompatibilan hardver pod svojom kontrolom",
          "Odaberi online čvor i zaseban generički potpisnik pod svojom kontrolom. Prije pohrane tajni provjeri podršku Debiana Stable i pokretanje.",
          "Odredio si podržani potpisnik i odvojeni online čvor.",
          "Prije instalacije identificiraj uređaje i medije. Operacijski sustav ne može popraviti kompromitiran hardver.",
        ]
      ),
      step(
        "separation",
        [
          "Assign and label the media",
          "Assign separate media for OS installation, wallet backups and PSBT transport. Write down which device may access each. Keep wallet backups and password recovery separate from routine transport media.",
          "Your notes distinguish the system USB, backup media and transfer media.",
          "A second file on the same device is not independent protection against its failure. A transfer USB can carry hostile files even when the signer has no network.",
        ],
        [
          "Dodijeli i označi medije",
          "Odvoji medije za instalaciju OS-a, kopije novčanika i prijenos PSBT-a. Zapiši koji uređaj smije pristupiti kojem mediju. Kopije novčanika i oporavak lozinke odvoji od medija za redovni prijenos.",
          "U bilješci razlikuješ sistemski USB, backup medije i prijenosne medije.",
          "Druga datoteka na istom uređaju nije neovisna zaštita od njegova kvara. Prijenosni USB može prenijeti zlonamjernu datoteku i bez mreže na potpisniku.",
        ]
      ),
    ],
    ["signet-readiness"]
  )
  guide(
    "ops-malware",
    tr("Prepare a safe transfer routine", "Pripremi postupak prijenosa"),
    [
      step(
        "media",
        [
          "Limit what crosses the gap",
          "Use your labeled PSBT transport media only for public descriptors and transaction files. Open only the expected data file in the verified application. Never execute a program or update supplied on this media during signing.",
          "You can name the allowed file types and the dedicated transfer medium.",
          "An air gap does not make USB data trustworthy. Unexpected files, instructions or executable content are a reason to stop.",
        ],
        [
          "Ograniči što prenosiš",
          "Označeni PSBT medij koristi samo za javne descriptore i transakcijske datoteke. U provjerenoj aplikaciji otvori samo očekivanu podatkovnu datoteku. Tijekom potpisivanja nikada ne pokreći program ni nadogradnju s tog medija.",
          "Znaš dopuštene vrste datoteka i koji medij koristiš za prijenos.",
          "Offline rad ne čini USB podatke pouzdanima. Neočekivane datoteke, upute ili program razlog su za zaustavljanje.",
        ]
      ),
      step(
        "destination",
        [
          "Plan an independent destination check",
          "For the Signet rehearsal, record a destination from your own training wallet. For a real payment, obtain the intended address through an authenticated channel independent of the coordinator's pasted value. Compare every character on the signer, together with all outputs and the total fee.",
          "You know the trusted reference against which the signer will check the destination.",
          "Comparing two views of the same compromised clipboard is not independent verification.",
        ],
        [
          "Pripremi neovisnu provjeru odredišta",
          "Za Signet vježbu zabilježi odredište iz vlastitog testnog novčanika. Za stvarno plaćanje pribavi namjeravanu adresu potvrđenim kanalom neovisnim o zalijepljenoj vrijednosti koordinatora. Na potpisniku usporedi svaki znak te sve izlaze i ukupnu naknadu.",
          "Znaš pouzdan izvor s kojim ćeš usporediti odredište na potpisniku.",
          "Usporedba dvaju prikaza istog kompromitiranog međuspremnika nije neovisna provjera.",
        ]
      ),
    ],
    ["real-device"]
  )
  lessons.set("optional-tails", {
    ...lessons.get("offline-device")!,
    id: "optional-tails",
    slug: tr(
      "optional-tails-offline-environment",
      "izborno-tails-offline-okruzenje"
    ),
    status: "in-progress",
    verification: "review-required",
    lastReviewed: undefined,
    origin: tr(
      "Optional architecture added 2026-09-13; physical rehearsal pending.",
      "Izborna arhitektura dodana 2026-09-13; čeka fizičku vježbu."
    ),
  })
  guide(
    "optional-tails",
    tr("Optional Tails signer", "Izborni Tails potpisnik"),
    [
      step(
        "boot",
        [
          "Boot verified Tails without networking",
          "Follow Tails' official installation and image-verification procedure on the chosen system USB. Installing erases that USB: verify its identity first. Boot the signer, unplug Ethernet and select Offline Mode in the Welcome Screen's additional network settings before entering the desktop.",
          "The desktop starts without networking; the selected USB is the intended Tails system.",
          "Do not assume a previous session's network setting was retained. Recheck Offline Mode on every boot.",
        ],
        [
          "Pokreni provjereni Tails bez mreže",
          "Prati službeni postupak instalacije i provjere Tails slike na odabranom sistemskom USB-u. Instalacija briše taj USB: prvo provjeri njegov identitet. Pokreni potpisnik, odspoji Ethernet i prije desktopa odaberi Offline Mode u dodatnim mrežnim postavkama Welcome Screena.",
          "Desktop se pokreće bez mreže, s namjeravanog Tails USB-a.",
          "Ne pretpostavljaj da su mrežne postavke prethodne sesije zadržane. Provjeri Offline Mode pri svakom pokretanju.",
        ]
      ),
      step(
        "persistence",
        [
          "Create storage that survives shutdown",
          "On the first boot open Tails → Persistent Storage and create encrypted storage on the system USB. Enable Persistent Folder. Store its password independently. On later boots unlock this storage in the Welcome Screen, then check Offline Mode again.",
          "The Persistent folder is accessible. You can distinguish creating storage once from unlocking it on later boots.",
          "The Tails storage password and Core wallet password protect different things. Enabling the Electrum persistence feature does not preserve a Core wallet.",
        ],
        [
          "Napravi pohranu koja preživljava gašenje",
          "Pri prvom pokretanju otvori Tails → Persistent Storage i napravi šifriranu pohranu na sistemskom USB-u. Uključi Persistent Folder. Lozinku sačuvaj neovisno. Pri kasnijem pokretanju otključaj pohranu na Welcome Screenu i ponovno provjeri Offline Mode.",
          "Mapa Persistent dostupna je. Razlikuješ jednokratnu izradu pohrane od otključavanja pri kasnijem pokretanju.",
          "Lozinka Tails pohrane i lozinka Core novčanika štite različite stvari. Uključena Electrum pohrana ne čuva Coreov novčanik.",
        ]
      ),
      step(
        "datadir",
        [
          "Put Core and its data in Persistent",
          "Before creating keys, bring the verified Linux x86-64 Core 31.1 archive and verification records from your preparation device. Extract it to /home/amnesia/Persistent/core/bitcoin-31.1. In Files create /home/amnesia/Persistent/core-signet. Launch the GUI using the explicit data path below.",
          "Core opens on Signet using the Persistent/core-signet data directory and networkactive = false in getnetworkinfo.",
          "If Persistent is locked or the binary cannot run, stop. Do not fall back to the default temporary home folder or connect the signer to download dependencies.",
        ],
        [
          "Smjesti Core i podatke u Persistent",
          "Prije izrade ključeva prenesi provjerenu Linux x86-64 arhivu Corea 31.1 i zapise provjere s pripremnog uređaja. Raspakiraj je u /home/amnesia/Persistent/core/bitcoin-31.1. U Files napravi /home/amnesia/Persistent/core-signet. Pokreni GUI s izričitom putanjom ispod.",
          "Core radi na Signetu s mapom Persistent/core-signet, a getnetworkinfo prikazuje networkactive = false.",
          "Ako je Persistent zaključan ili se program ne pokreće, stani. Nemoj prijeći na privremenu zadanu mapu ni povezati potpisnik radi preuzimanja biblioteka.",
        ],
        "/home/amnesia/Persistent/core/bitcoin-31.1/bin/bitcoin-qt -signet -datadir=/home/amnesia/Persistent/core-signet -networkactive=0 -listen=0",
        terminal
      ),
      step(
        "wallet",
        [
          "Create and back up an offline test wallet",
          "In the offline GUI create signet-offline-wallet with Encrypt Wallet enabled and a dedicated test password. Leave private keys enabled. Use File → Backup Wallet to save signet-offline-after-encryption.dat to separate backup media. Record one Receive address before closing Core normally.",
          "An encrypted offline test wallet and a separate Core backup exist, and you have an address for comparison.",
          "Do not put wallet backups or passwords on the routine PSBT transfer medium. Tails persistence is working storage, not your only backup.",
        ],
        [
          "Napravi i kopiraj offline testni novčanik",
          "U offline GUI-ju napravi signet-offline-wallet uz uključen Encrypt Wallet i zasebnu testnu lozinku. Privatni ključevi ostaju omogućeni. Kroz File → Backup Wallet spremi signet-offline-after-encryption.dat na odvojeni backup medij. Zabilježi jednu Receive adresu pa normalno zatvori Core.",
          "Postoje šifrirani offline testni novčanik, odvojeni Core backup i adresa za usporedbu.",
          "Kopije novčanika i lozinke ne spremaj na redovni PSBT medij. Tails trajna pohrana je radna pohrana, a ne jedini backup.",
        ]
      ),
      step(
        "coldboot",
        [
          "Verify after a complete shutdown",
          "Shut Tails down completely. Boot again, unlock Persistent Storage, select Offline Mode and use the same explicit Core launch command. Open signet-offline-wallet and compare the recorded receiving address in its address history. Keep the original backup available for the later recovery rehearsal.",
          "The wallet and recorded address survive shutdown; Core remains offline.",
          "If the wallet is missing, do not create a replacement and mark this done. Check the mounted Persistent folder and data path. Restore only in an offline environment.",
        ],
        [
          "Provjeri nakon potpunog gašenja",
          "Potpuno ugasi Tails. Ponovno pokreni, otključaj Persistent Storage, odaberi Offline Mode i koristi istu izričitu naredbu za Core. Otvori signet-offline-wallet i usporedi zabilježenu adresu u povijesti primanja. Izvorni backup sačuvaj za kasniju vježbu obnove.",
          "Novčanik i zabilježena adresa ostali su nakon gašenja, a Core je i dalje offline.",
          "Ako novčanik nedostaje, nemoj napraviti novi i označiti uspjeh. Provjeri otključani Persistent i mapu podataka. Obnavljaj samo u offline okruženju.",
        ]
      ),
    ],
    ["offline-recovery"]
  )
  edit("optional-tails", {
    referenceVersion: "Bitcoin Core 31.1 · Tails 7.11 (target)",
    sources: [...tailsSources, coreWallet],
    explanation: [
      tr(
        "This is a documented target procedure, not a claim that the Tails/Core combination has been reproduced on your hardware. The required cold-boot and independent recovery checks remain explicit publication gates.",
        "Ovo je dokumentirani predloženi postupak, a ne tvrdnja da je kombinacija Tails/Core ponovljena na tvojem hardveru. Provjera nakon gašenja i neovisni oporavak ostaju uvjeti prije objave."
      ),
    ],
    reviewNote: tr(
      "Draft expanded for Core 31.1 / Tails 7.11. A complete boot, persistence, backup and restore rehearsal on supported physical hardware is still required.",
      "Nacrt dopunjen za Core 31.1 / Tails 7.11. Još treba ponoviti cijelo pokretanje, trajnu pohranu, backup i obnovu na podržanom fizičkom hardveru."
    ),
  })
  guide(
    "offline-psbt",
    tr(
      "Connect the wallets and sign offline",
      "Poveži novčanike i potpiši offline"
    ),
    [
      step(
        "export",
        [
          "Export only public descriptors",
          "On the offline signer, select signet-offline-wallet in Window → Console and run listdescriptors without a true/private argument. Save only the returned descriptors array, including each entry's range, timestamp, next index, active and internal fields, as signet-public-descriptors.json on the transport medium.",
          "You have a JSON array of public descriptors covering receive and change branches. No wallet backup, private descriptor or password is transferred.",
          "Do not use listdescriptors true. Public descriptors reveal wallet activity, so keep the file private even though it cannot authorize spending.",
        ],
        [
          "Izvezi samo javne descriptore",
          "Na offline potpisniku u Window → Console odaberi signet-offline-wallet i pokreni listdescriptors bez argumenta true/private. Na prijenosni medij u signet-public-descriptors.json spremi samo vraćeno polje descriptors, sa svim pripadajućim range, timestamp, next index, active i internal podacima.",
          "Imaš JSON polje javnih descriptora za primanje i kusur. Ne prenosiš backup novčanika, privatni descriptor ni lozinku.",
          "Nemoj koristiti listdescriptors true. Javni descriptori otkrivaju aktivnost novčanika pa datoteku čuvaj privatno iako ne omogućuje potrošnju.",
        ],
        "listdescriptors",
        tr(
          "OFFLINE · Core console · signet-offline-wallet",
          "OFFLINE · Core konzola · signet-offline-wallet"
        )
      ),
      step(
        "watchonly",
        [
          "Create a wallet without private keys",
          "On the online Signet Core node, use the console command below. Select the new signet-watch-only wallet and run getwalletinfo before importing anything.",
          "walletname is signet-watch-only and private_keys_enabled is false.",
          "If private keys are enabled, stop and create a correctly configured fresh watch-only wallet. Never restore the offline wallet backup on this machine.",
        ],
        [
          "Napravi novčanik bez privatnih ključeva",
          "Na online Signet Core čvoru pokreni naredbu ispod u konzoli. Odaberi novi signet-watch-only i prije uvoza pokreni getwalletinfo.",
          "walletname je signet-watch-only, a private_keys_enabled je false.",
          "Ako su privatni ključevi omogućeni, stani i napravi ispravno postavljen novi watch-only novčanik. Nikada ne obnavljaj backup offline novčanika na ovom računalu.",
        ],
        'createwallet "signet-watch-only" true true',
        tr(
          "ONLINE · Core console · then select signet-watch-only",
          "ONLINE · Core konzola · zatim odaberi signet-watch-only"
        )
      ),
      step(
        "import",
        [
          "Import both descriptor branches",
          "On the online node, open the public JSON file as text. In the signet-watch-only console enter importdescriptors followed by that entire JSON array inside single quotes. Preserve its metadata and original timestamps. Do not paste the outer object returned by listdescriptors.",
          "Every import result reports success: true. getwalletinfo still reports private_keys_enabled: false.",
          "For JSON errors, check the array brackets and quoting. Never replace old timestamps with ‘now’ to hide a rescan problem; that can miss existing receipts.",
        ],
        [
          "Uvezi obje grane descriptora",
          "Na online čvoru otvori javnu JSON datoteku kao tekst. U konzolu signet-watch-only unesi importdescriptors pa cijelo to JSON polje unutar jednostrukih navodnika. Sačuvaj metapodatke i izvorne vremenske oznake. Nemoj zalijepiti vanjski objekt koji vraća listdescriptors.",
          "Svaki rezultat uvoza ima success: true. getwalletinfo i dalje prikazuje private_keys_enabled: false.",
          "Kod JSON greške provjeri uglate zagrade i navodnike. Nemoj zamijeniti stare vremenske oznake s ‘now’ radi skrivanja problema rescana jer možeš propustiti primitke.",
        ]
      ),
      step(
        "address",
        [
          "Check a receiving address on the signer",
          "Create a Receive address in signet-watch-only. Bring that public address to the offline console and run getaddressinfo with the address in double quotes. Compare its descriptor and derivation path with the imported policy; inspect the full address on both devices.",
          "The offline wallet recognizes the address as its own (ismine: true) and its receive branch matches. Only then fund it with a small Signet faucet receipt.",
          "The next address on two wallets need not match if their indices differ. Verify the same explicit address, not two independently advanced ‘next address’ counters.",
        ],
        [
          "Provjeri adresu primanja na potpisniku",
          "Napravi Receive adresu u signet-watch-only. Prenesi tu javnu adresu u offline konzolu i pokreni getaddressinfo s adresom u dvostrukim navodnicima. Usporedi descriptor i put derivacije s uvezenom politikom te cijelu adresu na oba uređaja.",
          "Offline novčanik prepoznaje adresu kao svoju (ismine: true) i odgovara grana primanja. Tek tada primi mali Signet iznos iz fauceta.",
          "Sljedeće adrese dvaju novčanika ne moraju biti jednake ako su indeksi različiti. Provjeri istu konkretnu adresu, a ne dva neovisno pomaknuta brojača novih adresa.",
        ]
      ),
      step(
        "proposal",
        [
          "Save an unsigned transaction",
          "After a confirmation, use Send in signet-watch-only to a recorded destination in your separate training wallet. Enter a small amount, review the fee and choose Create Unsigned, then Save the .psbt file. Keep the trusted destination record for the offline comparison.",
          "A funded unsigned .psbt file is saved. The online watch-only wallet has not signed it.",
          "If Send offers an ordinary signing flow, recheck the selected wallet and private_keys_enabled. For insufficient funds, check confirmation and leave room for the fee.",
        ],
        [
          "Spremi nepotpisanu transakciju",
          "Nakon potvrde u signet-watch-only otvori Send prema zabilježenom odredištu u zasebnom testnom novčaniku. Unesi mali iznos, pregledaj naknadu i odaberi Create Unsigned pa spremi .psbt datoteku. Sačuvaj pouzdan zapis odredišta za offline usporedbu.",
          "Spremljena je financirana nepotpisana .psbt datoteka. Online watch-only novčanik nije je potpisao.",
          "Ako Send nudi običan tijek potpisivanja, provjeri odabrani novčanik i private_keys_enabled. Kod manjka sredstava provjeri potvrdu i ostavi prostor za naknadu.",
        ]
      ),
      step(
        "review",
        [
          "Review every output offline",
          "Transfer only the expected .psbt. In the offline GUI select signet-offline-wallet and File → Load PSBT from file. Compare every destination and amount against the independent record. Check each change output is marked as your own, and check the displayed total transaction fee. Do not sign yet.",
          "You understand every output and the fee, and the intended external destination matches the trusted record.",
          "Stop if the fee cannot be calculated, an output is unexplained, change is not recognized or the destination differs. A PSBT is an untrusted proposal.",
        ],
        [
          "Offline pregledaj svaki izlaz",
          "Prenesi samo očekivani .psbt. U offline GUI-ju odaberi signet-offline-wallet pa File → Load PSBT from file. Svako odredište i iznos usporedi s neovisnim zapisom. Provjeri da je svaki izlaz kusura označen kao vlastiti i pregledaj ukupnu naknadu. Još ne potpisuj.",
          "Razumiješ svaki izlaz i naknadu, a namjeravano vanjsko odredište odgovara pouzdanom zapisu.",
          "Stani ako naknadu nije moguće izračunati, neki je izlaz neobjašnjen, kusur nije prepoznat ili se odredište razlikuje. PSBT je nepouzdan prijedlog.",
        ]
      ),
      step(
        "sign",
        [
          "Sign and save on the offline device",
          "Only after the review choose Sign Tx in the PSBT dialog. Enter the test wallet password in Core when requested. Save the signed PSBT under a different filename and close the wallet normally. Keep the signer offline.",
          "Core reports that the transaction is fully signed and ready for broadcast; the signed .psbt is saved.",
          "If signatures are still missing or the wallet cannot sign, stop. The procedure is incomplete; do not mistake an exported unsigned file for a signed transaction.",
        ],
        [
          "Potpiši i spremi na offline uređaju",
          "Tek nakon pregleda odaberi Sign Tx u PSBT dijalogu. Testnu lozinku novčanika unesi u Core kada je zatraži. Spremi potpisani PSBT pod drugim nazivom i normalno zatvori novčanik. Potpisnik ostaje offline.",
          "Core javlja da je transakcija potpuno potpisana i spremna za objavu; potpisani .psbt je spremljen.",
          "Ako još nedostaju potpisi ili novčanik ne može potpisati, stani. Postupak nije dovršen; izvezeni nepotpisani dokument nije potpisana transakcija.",
        ]
      ),
      step(
        "broadcast",
        [
          "Broadcast from the online node",
          "Return the signed .psbt to the online node. Load it through File → Load PSBT from file, compare the outputs and fee again, then choose Broadcast Tx. The GUI finalizes and extracts the transaction before broadcast. Wait for a Signet confirmation.",
          "The online node shows the transaction ID and a confirmation, while private keys remained offline throughout.",
          "Do not pass a PSBT string to sendrawtransaction: that RPC expects a finalized raw transaction. In a CLI workflow, check finalizepsbt.complete before using its hex result.",
        ],
        [
          "Objavi s online čvora",
          "Vrati potpisani .psbt na online čvor. Učitaj kroz File → Load PSBT from file, ponovno usporedi izlaze i naknadu pa odaberi Broadcast Tx. GUI prije objave finalizira i izdvaja transakciju. Pričekaj Signet potvrdu.",
          "Online čvor prikazuje identifikator i potvrdu transakcije, a privatni ključevi cijelo su vrijeme ostali offline.",
          "Nemoj predati PSBT tekst naredbi sendrawtransaction: ona očekuje finaliziranu sirovu transakciju. U CLI postupku provjeri finalizepsbt.complete prije upotrebe rezultata hex.",
        ]
      ),
    ],
    ["offline-device", "ops-malware"]
  )
  edit("offline-psbt", {
    sources: [
      coreOffline,
      coreRpc,
      {
        label: "Core 31.1 · PSBT GUI behavior",
        url: "https://github.com/bitcoin/bitcoin/blob/v31.1/src/qt/psbtoperationsdialog.cpp",
      },
      {
        label: "Core 31.1 · Unsigned transaction GUI",
        url: "https://github.com/bitcoin/bitcoin/blob/v31.1/src/qt/sendcoinsdialog.cpp",
      },
    ],
    estimatedTime: tr(
      "30–45 min active + confirmations",
      "30–45 min rada + čekanje potvrda"
    ),
  })
  guide(
    "offline-recovery",
    tr("Recover both roles independently", "Neovisno obnovi obje uloge"),
    [
      step(
        "signer",
        [
          "Restore a replacement offline signer",
          "Set the original signer aside intact. Prepare known-good replacement generic hardware with verified Debian Stable and Core, using the offline-device procedure. Create a separate Core Signet data directory, stay offline and use only known-good recovery copies. Restore signet-offline-after-encryption.dat as signet-offline-restored using File → Restore Wallet.",
          "The replacement offline wallet recognizes a recorded funded address. The original signer and its working disk were not used.",
          "Never restore private wallet data on the online coordinator. A wallet restored online does not preserve the offline architecture.",
        ],
        [
          "Obnovi zamjenski offline potpisnik",
          "Izvorni potpisnik sačuvaj netaknut sa strane. Pripremi pouzdan zamjenski generički hardver s provjerenim Debianom Stable i Coreom prema lekciji pripreme potpisnika. Napravi zasebnu mapu Core Signet podataka, ostani offline i koristi samo pouzdane kopije za oporavak. Kroz File → Restore Wallet obnovi signet-offline-after-encryption.dat kao signet-offline-restored.",
          "Zamjenski offline novčanik prepoznaje zabilježenu financiranu adresu. Izvorni potpisnik i njegov radni disk nisu korišteni.",
          "Privatne podatke novčanika nikada ne obnavljaj na online koordinatoru. Online obnova ne zadržava offline arhitekturu.",
        ]
      ),
      step(
        "coordinator",
        [
          "Rebuild a watch-only coordinator",
          "Close the original coordinator wallet. On a separate synchronized Signet Core environment create a fresh blank wallet with private keys disabled. Export public descriptors from the restored signer and import them with their original timestamps, receive and change metadata. Let the scan finish and compare recorded transactions.",
          "The new coordinator reports private_keys_enabled: false and finds the expected outputs without the original coordinator database.",
          "Use a node with the blocks needed for recovery. Public descriptors recover the policy, not labels created only on the lost coordinator; retain a separate watch-only backup when those labels matter.",
        ],
        [
          "Ponovno napravi watch-only koordinator",
          "Zatvori izvorni koordinatorski novčanik. U zasebnom sinkroniziranom Signet Core okruženju napravi nov prazan novčanik s isključenim privatnim ključevima. Iz obnovljenog potpisnika izvezi javne descriptore i uvezi ih s izvornim vremenskim oznakama te podacima primanja i kusura. Pričekaj pregled povijesti i usporedi transakcije.",
          "Novi koordinator prikazuje private_keys_enabled: false i nalazi očekivane izlaze bez izvorne baze koordinatora.",
          "Koristi čvor s blokovima potrebnim za oporavak. Javni descriptori obnavljaju politiku, ali ne oznake nastale samo na izgubljenom koordinatoru; za njih čuvaj zaseban watch-only backup.",
        ]
      ),
      step(
        "sign-again",
        [
          "Spend using only the replacements",
          "Repeat the preceding PSBT exercise with the replacement coordinator and signet-offline-restored. Review all outputs offline, unlock with the independently recovered test password, sign, return the signed PSBT and broadcast online.",
          "A confirmed transaction proves that both replacement roles work without the original wallets or signer disk.",
          "A matching balance alone is insufficient. Record the transaction ID, versions, recovery locations and any correction needed in your notes.",
        ],
        [
          "Potroši samo sa zamjenskim uređajima",
          "Ponovi prethodnu PSBT vježbu sa zamjenskim koordinatorom i signet-offline-restored. Offline pregledaj sve izlaze, otključaj neovisno oporavljenom testnom lozinkom, potpiši, vrati potpisani PSBT i objavi online.",
          "Potvrđena transakcija dokazuje da obje zamjenske uloge rade bez izvornih novčanika i diska potpisnika.",
          "Sam podudarni saldo nije dovoljan. U bilješku zapiši identifikator transakcije, verzije, mjesta kopija i potrebne ispravke.",
        ]
      ),
    ],
    ["offline-psbt"]
  )
  edit("offline-recovery", {
    sources: [coreWallet, coreOffline],
  })

  guide(
    "ops-documentation",
    tr(
      "Write a recovery card without secrets",
      "Napiši uputu za oporavak bez tajni"
    ),
    [
      step(
        "card",
        [
          "Write the recovery map",
          "On paper record: network; signer and coordinator roles; wallet names; Core/OS versions; backup dates and locations; where password recovery is kept separately; public descriptor policy and creation date; and the ordered steps to rebuild each role. Mark which actions must remain offline.",
          "Your recovery card identifies the required artifacts and their roles without containing a password or private key.",
          "Treat public descriptors and addresses as private financial information too. A recovery card should not publish wallet history or all storage locations.",
        ],
        [
          "Zapiši mapu oporavka",
          "Na papir zapiši: mrežu; uloge potpisnika i koordinatora; nazive novčanika; verzije Corea i OS-a; datume i mjesta kopija; gdje je odvojeno pohranjen oporavak lozinke; politiku javnih descriptora i datum izrade; redoslijed obnove obiju uloga. Označi radnje koje moraju ostati offline.",
          "Uputa navodi potrebne datoteke i njihove uloge bez lozinke ili privatnog ključa.",
          "I javne descriptore i adrese tretiraj kao privatne financijske podatke. Uputa za oporavak ne treba javno otkriti povijest novčanika ni sva mjesta pohrane.",
        ]
      ),
      step(
        "rehearse",
        [
          "Use the card in a Signet rehearsal",
          "Repeat the offline recovery exercise using only the card and the independently stored test artifacts. Note every place where you had to guess, then correct the card. Record the last successful test date and transaction ID.",
          "You can rebuild and use the Signet system from the written procedure.",
          "If the card depends on the original device still working, revise it before preparing mainnet.",
        ],
        [
          "Isprobaj uputu na Signetu",
          "Ponovi vježbu offline oporavka koristeći samo uputu i neovisno pohranjene testne podatke. Zabilježi svako mjesto na kojem si morao pogađati pa ispravi uputu. Zapiši datum zadnjeg uspješnog testa i identifikator transakcije.",
          "Možeš obnoviti i koristiti Signet sustav iz napisane upute.",
          "Ako uputa ovisi o ispravnom izvornom uređaju, dopuni je prije pripreme mainneta.",
        ]
      ),
    ],
    ["offline-recovery"]
  )
  edit("mainnet-separate-wallet", {
    prerequisites: [
      "signet-readiness",
      "offline-recovery",
      "ops-documentation",
    ],
    explanation: [
      tr(
        "Mainnet uses new keys, new wallet passwords and separately labeled backups. The main path continues with the same offline signer / online watch-only roles you rehearsed. A Signet wallet is never converted into the savings wallet.",
        "Mainnet koristi nove ključeve, nove lozinke novčanika i zasebno označene kopije. Glavni put nastavlja s istim offline potpisnikom i online watch-only ulogama koje si uvježbao. Signet novčanik nikada ne pretvaramo u novčanik za štednju."
      ),
    ],
  })
  guide(
    "real-encryption",
    tr(
      "Create a new encrypted mainnet wallet offline",
      "Offline napravi novi šifrirani mainnet novčanik"
    ),
    [
      step(
        "password",
        [
          "Generate and preserve a new password offline",
          "On the trusted offline signer, use a verified offline password manager's generator to create a unique password of 24 random letters and digits. Preserve it in an independently recoverable offline record or encrypted password database. Test that recovery before using it. Do not use a browser generator or reuse a test password.",
          "You can recover a new random wallet password without depending on the wallet's own USB.",
          "Install the Debian-packaged KeePassXC during preparation, before keys exist. Keep its database and its own recovery password separate from the wallet backup; test that access offline.",
        ],
        [
          "Offline generiraj i sačuvaj novu lozinku",
          "Na pouzdanom offline potpisniku generatorom provjerenog offline upravitelja lozinki napravi jedinstvenu lozinku od 24 nasumična slova i znamenke. Sačuvaj je u neovisno oporavljivom offline zapisu ili šifriranoj bazi lozinki. Prije upotrebe provjeri oporavak. Nemoj koristiti generator u pregledniku ni testnu lozinku.",
          "Novu nasumičnu lozinku možeš oporaviti bez oslanjanja na USB samog novčanika.",
          "KeePassXC iz Debianovih paketa instaliraj tijekom pripreme, prije nastanka ključeva. Njegovu bazu i lozinku za njezin oporavak odvoji od backupa novčanika; pristup isprobaj offline.",
        ]
      ),
      step(
        "mainnet",
        [
          "Start a distinct mainnet data directory",
          "Close Core. In your home folder create core-mainnet separately from core-signet. Use the launch command below on the offline device; it intentionally omits -signet. In Core's console confirm chain = main and networkactive = false before creating a wallet.",
          "Core uses $HOME/core-mainnet, reports chain = main and remains offline.",
          "If the chain or data path differs, stop. Do not load the Signet backup into this setup.",
        ],
        [
          "Pokreni zasebnu mainnet mapu podataka",
          "Zatvori Core. U osobnoj mapi napravi core-mainnet odvojeno od core-signet. Na offline uređaju pokreni naredbu ispod, namjerno bez -signet. U Coreovoj konzoli prije izrade novčanika potvrdi chain = main i networkactive = false.",
          "Core koristi $HOME/core-mainnet, prikazuje chain = main i ostaje offline.",
          "Ako se mreža ili mapa razlikuju, stani. U ovu postavu nemoj učitavati Signet backup.",
        ],
        '"$HOME/core/bitcoin-31.1/bin/bitcoin-qt" -datadir="$HOME/core-mainnet" -networkactive=0 -listen=0',
        terminal
      ),
      step(
        "create",
        [
          "Create and back up savings-offline",
          "In the offline GUI choose File → Create Wallet, name it savings-offline and enable Encrypt Wallet. Enter the new password only in Core's dialog; leave private keys enabled. Save a Core backup as mainnet-savings-after-encryption.dat on separate backup media. Record a receiving address and the exact backup location.",
          "A new encrypted mainnet wallet and post-encryption backup exist. Neither uses Signet keys or passwords.",
          "Never store the real password in a shell command, on this website, or with an unprotected copy of the backup.",
        ],
        [
          "Napravi i kopiraj savings-offline",
          "U offline GUI-ju odaberi File → Create Wallet, naziv savings-offline i uključi Encrypt Wallet. Novu lozinku unesi samo u Coreov dijalog; privatni ključevi ostaju omogućeni. Na odvojen backup medij spremi Core kopiju mainnet-savings-after-encryption.dat. Zapiši adresu primanja i točno mjesto kopije.",
          "Postoje novi šifrirani mainnet novčanik i kopija nakon šifriranja. Nijedan ne koristi Signet ključeve ni lozinke.",
          "Stvarnu lozinku nikada ne spremaj u shell naredbu, na ovu stranicu ni uz nezaštićenu kopiju novčanika.",
        ]
      ),
    ],
    ["mainnet-separate-wallet", "offline-recovery", "ops-documentation"]
  )
  edit("real-encryption", {
    sources: [
      coreWallet,
      {
        label: "Debian · KeePassXC package",
        url: "https://packages.debian.org/stable/keepassxc",
      },
    ],
  })
  for (const id of ["backup-redundancy-freshness", "encrypted-backup-privacy"])
    edit(id, { kind: "checkpoint", prerequisites: ["real-encryption"] })
  edit("backup-redundancy-freshness", {
    explanation: [
      ...(lessons.get("backup-redundancy-freshness")?.explanation ?? []),
      tr(
        "Refresh the backup after encryption, password changes, newly imported keys or descriptors, and whenever coordinator metadata matters. Password changes do not re-encrypt old copies. If keys may have been stolen, changing a password does not revoke them; recovery must move to new keys after securing the environment.",
        "Osvježi kopiju nakon šifriranja, promjene lozinke, uvoza novih ključeva ili descriptora te kada su važni metapodaci koordinatora. Promjena lozinke ne prešifrira stare kopije. Ako su ključevi možda ukradeni, promjena lozinke ih ne opoziva; nakon osiguranja okruženja potreban je prelazak na nove ključeve."
      ),
    ],
  })
  guide(
    "real-restore",
    tr(
      "Restore the empty mainnet signer offline",
      "Obnovi prazan mainnet potpisnik offline"
    ),
    [
      step(
        "restore",
        [
          "Restore on a replacement offline system",
          "Before depositing, set the original signer aside and prepare a verified replacement offline system with a separate mainnet data directory. Restore mainnet-savings-after-encryption.dat as savings-restored. Compare the recorded receiving address with getaddressinfo in the restored wallet.",
          "The restored wallet recognizes the recorded mainnet address and its expected descriptors. No private wallet data touched the online node.",
          "This is an empty-wallet rehearsal. It verifies recovery artifacts, but cannot yet prove a confirmed spend.",
        ],
        [
          "Obnovi na zamjenskom offline sustavu",
          "Prije uplate odloži izvorni potpisnik i pripremi provjeren zamjenski offline sustav sa zasebnom mainnet mapom. Obnovi mainnet-savings-after-encryption.dat kao savings-restored. U obnovljenom novčaniku usporedi zabilježenu adresu pomoću getaddressinfo.",
          "Obnovljeni novčanik prepoznaje zabilježenu mainnet adresu i očekivane descriptore. Privatni podaci nisu dotaknuli online čvor.",
          "Ovo je vježba praznog novčanika. Provjerava podatke za oporavak, ali još ne dokazuje potvrđenu potrošnju.",
        ]
      ),
      step(
        "unlock",
        [
          "Check the recovered password on the signer",
          "In the offline Core console with savings-restored selected, read help walletpassphrase. Use that RPC there to unlock with your recovered password for 60 seconds, then call walletlock. Do not put the password into a system terminal command, text document, screenshot or this website.",
          "Core accepts the recovered password and getwalletinfo shows the wallet locked again after walletlock.",
          "If the password fails, stop before any deposit. No operator, website or reset procedure can recover a forgotten wallet password for you.",
        ],
        [
          "Provjeri oporavljenu lozinku na potpisniku",
          "U offline Core konzoli uz odabran savings-restored pročitaj help walletpassphrase. Tu naredbu koristi u toj konzoli za otključavanje oporavljenom lozinkom na 60 sekundi pa pozovi walletlock. Lozinku nemoj stavljati u sistemski terminal, tekstni dokument, snimku zaslona ni ovu stranicu.",
          "Core prihvaća oporavljenu lozinku, a nakon walletlock getwalletinfo ponovno pokazuje zaključan novčanik.",
          "Ako lozinka ne radi, stani prije uplate. Operator, stranica ni resetiranje ne mogu ti oporaviti zaboravljenu lozinku novčanika.",
        ],
        "help walletpassphrase",
        tr(
          "OFFLINE · Core console · savings-restored",
          "OFFLINE · Core konzola · savings-restored"
        )
      ),
      step(
        "public",
        [
          "Prepare the mainnet watch-only coordinator",
          "Repeat the public-descriptor export/import from the Signet PSBT lesson, using the restored mainnet signer and a new online savings-watch-only wallet. Keep original descriptor timestamps and both branches. Verify private_keys_enabled = false, synchronization and a specific receiving address on the offline signer.",
          "The coordinator knows the correct mainnet policy without private keys. The receiving address is independently recognized by the restored signer.",
          "Do not reuse the Signet descriptor file. If a future restore needs pruned historical blocks, recover against complete relevant history rather than skipping the scan.",
        ],
        [
          "Pripremi mainnet watch-only koordinator",
          "Ponovi izvoz i uvoz javnih descriptora iz Signet PSBT lekcije, koristeći obnovljeni mainnet potpisnik i novi online savings-watch-only. Sačuvaj izvorne vremenske oznake i obje grane. Provjeri private_keys_enabled = false, sinkronizaciju i konkretnu adresu primanja na offline potpisniku.",
          "Koordinator poznaje ispravnu mainnet politiku bez privatnih ključeva. Obnovljeni potpisnik neovisno prepoznaje adresu primanja.",
          "Nemoj ponovno koristiti Signet descriptor datoteku. Ako buduća obnova treba odbačene povijesne blokove, koristi potrebnu potpunu povijest umjesto preskakanja pregleda.",
        ]
      ),
    ],
    [
      "real-encryption",
      "backup-redundancy-freshness",
      "encrypted-backup-privacy",
    ]
  )
  edit("mainnet-readiness", {
    kind: "checkpoint",
    title: tr(
      "Check readiness for a small deposit",
      "Provjeri spremnost za malu uplatu"
    ),
    objective: tr(
      "Confirm recovery of the empty wallet before a limited mainnet test.",
      "Potvrdi obnovu praznog novčanika prije ograničenog mainnet testa."
    ),
    prerequisites: [
      "signet-readiness",
      "offline-recovery",
      "ops-documentation",
      "real-restore",
    ],
    explanation: [
      tr(
        "This checkpoint permits only the first limited test in the written procedure. It does not prove real-money spending recovery yet: the next exercise must confirm a spend signed by the restored offline wallet.",
        "Ova provjera odnosi se samo na prvi ograničeni test iz pisanog postupka. Još ne dokazuje oporavak trošenja stvarnog novca: sljedeća vježba mora potvrditi potrošnju koju potpisuje obnovljeni offline novčanik."
      ),
    ],
    checklist: [
      tr(
        "I completed the entire Signet cycle and rebuilt both offline-signing roles.",
        "Dovršio sam cijeli Signet ciklus i obnovio obje uloge offline potpisivanja."
      ),
      tr(
        "New mainnet keys, passwords and backups are separate from all test material.",
        "Novi mainnet ključevi, lozinke i kopije odvojeni su od svih testnih podataka."
      ),
      tr(
        "The restored offline wallet recognizes the receiving address and accepts the independently recovered password.",
        "Obnovljeni offline novčanik prepoznaje adresu primanja i prihvaća neovisno oporavljenu lozinku."
      ),
      tr(
        "The online wallet has private keys disabled; I know how to review outputs and fees offline.",
        "Online novčanik ima isključene privatne ključeve; znam offline pregledati izlaze i naknade."
      ),
    ],
  })
  guide(
    "mainnet-small-test",
    tr(
      "Confirm a small spend from the restored signer",
      "Potvrdi malu potrošnju iz obnovljenog potpisnika"
    ),
    [
      step(
        "deposit",
        [
          "Receive only the test amount",
          "Use the receiving address checked on the restored signer. Choose an amount whose loss you can tolerate and that covers the planned test and fees; the curriculum does not prescribe a universal amount. Check the full address again before withdrawal or payment, then wait for confirmation on your own mainnet node.",
          "A small confirmed output belongs to the verified mainnet policy.",
          "If the address differs, the node is unsynchronized or the expected receipt is missing, stop and resolve it before sending more.",
        ],
        [
          "Primi samo testni iznos",
          "Koristi adresu provjerenu na obnovljenom potpisniku. Odaberi iznos čiji gubitak možeš podnijeti i koji pokriva test i naknade; kurikulum ne propisuje univerzalan iznos. Prije isplate ili plaćanja ponovno provjeri cijelu adresu pa pričekaj potvrdu na vlastitom mainnet čvoru.",
          "Mali potvrđeni izlaz pripada provjerenoj mainnet politici.",
          "Ako se adresa razlikuje, čvor nije sinkroniziran ili primitak nedostaje, stani i razjasni to prije dodatne uplate.",
        ]
      ),
      step(
        "spend",
        [
          "Use the restored offline signer",
          "Create a small PSBT self-transfer from savings-watch-only to another address independently checked on savings-restored. Keep the original signer aside. On the restored offline signer review every output, change and total fee, then sign and save. Return the signed PSBT for online broadcast.",
          "Only the restored signer authorizes the transaction; the original wallet is not required.",
          "Any unknown output or incomplete signature means stop. Repeat the Signet rehearsal if the mainnet procedure requires guessing.",
        ],
        [
          "Koristi obnovljeni offline potpisnik",
          "Iz savings-watch-only napravi mali PSBT prijenos sebi na drugu adresu neovisno provjerenu u savings-restored. Izvorni potpisnik ostaje sa strane. Na obnovljenom offline potpisniku pregledaj svaki izlaz, kusur i ukupnu naknadu pa potpiši i spremi. Potpisani PSBT vrati za online objavu.",
          "Transakciju odobrava samo obnovljeni potpisnik; izvorni novčanik nije potreban.",
          "Svaki nepoznati izlaz ili nepotpun potpis razlog je za zaustavljanje. Ponovi Signet vježbu ako mainnet postupak zahtijeva pogađanje.",
        ]
      ),
      step(
        "confirm",
        [
          "Record the successful recovery spend",
          "Wait for the transaction to confirm on your own node. Match its ID, outputs and fee to the reviewed proposal. Update your recovery card with the tested versions and date, and retain current independent backups before considering further deposits.",
          "You have a confirmed mainnet spend signed from the recovered wallet and a repeatable written procedure.",
          "A successful small test is evidence about this setup, not a guarantee against later device compromise or loss of all backups.",
        ],
        [
          "Zabilježi uspješnu potrošnju nakon obnove",
          "Pričekaj potvrdu transakcije na vlastitom čvoru. Usporedi identifikator, izlaze i naknadu s pregledanim prijedlogom. Uputu za oporavak dopuni provjerenim verzijama i datumom te sačuvaj aktualne neovisne kopije prije razmatranja novih uplata.",
          "Imaš potvrđenu mainnet potrošnju potpisanu obnovljenim novčanikom i ponovljiv pisani postupak.",
          "Uspješan mali test dokaz je o ovoj postavi, ali ne jamstvo protiv kasnije kompromitacije uređaja ili gubitka svih kopija.",
        ]
      ),
    ],
    ["mainnet-readiness", "real-restore"]
  )
  edit("mainnet-small-test", {
    sources: [coreWallet, coreOffline],
    estimatedTime: tr(
      "20–30 min active + confirmations",
      "20–30 min rada + čekanje potvrda"
    ),
  })
  edit("2.3", {
    title: tr("Archival and pruned full nodes", "Arhivski i pruned puni čvor"),
    explanation: [
      ...(lessons.get("2.3")?.explanation ?? []),
      tr(
        "Both validate the same consensus rules. An archival node keeps historical blocks; a pruned full node removes older block files. A recovery scan requiring removed blocks needs a node holding that history or a fresh download and validation. Do not discard wallet backups or replace old descriptor timestamps to bypass a missing-history error.",
        "Oba validiraju ista konsenzusna pravila. Arhivski čvor zadržava povijesne blokove; pruned puni čvor uklanja starije datoteke blokova. Za oporavak kojem trebaju uklonjeni blokovi koristi čvor s tom poviješću ili novo preuzimanje i validaciju. Nemoj odbaciti kopije novčanika ni zamijeniti stare vremenske oznake descriptora radi zaobilaženja greške."
      ),
    ],
  })
  const nodeLesson = lessons.get("2.2")!
  edit("2.2", {
    codeBlocks: nodeLesson.codeBlocks?.map((b) => ({
      ...b,
      code: b.code.replaceAll('"test-wallet"', '"signet-training-restored"'),
    })),
  })
  for (const id of ["ops-routine", "ops-physical"])
    edit(id, { kind: "practice", prerequisites: ["mainnet-small-test"] })

  const immediateWarnings: Record<string, Record<string, string>> = {
    "offline-device": {
      datadir: tr(
        "Create no keys until Persistent Storage is unlocked and the explicit data directory is in use.",
        "Ne izrađuj ključeve dok Persistent Storage nije otključan i koristi se izričita mapa podataka."
      ),
      coldboot: tr(
        "A missing wallet after shutdown is a failed persistence test. Stop before receiving any funds.",
        "Nedostajući novčanik nakon gašenja znači neuspjelu provjeru trajne pohrane. Stani prije bilo kakvog primanja sredstava."
      ),
    },
    "offline-psbt": {
      export: tr(
        "Transfer public descriptors only. Never use listdescriptors true or move the wallet backup online.",
        "Prenosi samo javne descriptore. Nikada ne koristi listdescriptors true ni prenosi backup novčanika online."
      ),
      review: tr(
        "Do not sign if any output is unexplained, the destination differs or the fee cannot be checked.",
        "Nemoj potpisati ako je neki izlaz neobjašnjen, odredište se razlikuje ili naknadu ne možeš provjeriti."
      ),
    },
    "real-encryption": {
      create: tr(
        "Keep mainnet keys and passwords separate from all Signet material. The signer stays offline.",
        "Mainnet ključevi i lozinke odvojeni su od svih Signet podataka. Potpisnik ostaje offline."
      ),
    },
  }
  for (const [id, warnings] of Object.entries(immediateWarnings)) {
    const lesson = lessons.get(id)!
    edit(id, {
      guidedSteps: lesson.guidedSteps?.map((s) => ({
        ...s,
        warning: warnings[s.id] ?? s.warning,
      })),
    })
  }
  edit("ops-routine", {
    checklist: [
      tr(
        "I recorded a recurring backup check and the next independent recovery rehearsal.",
        "Zabilježio sam redovnu provjeru kopija i sljedeću vježbu neovisnog oporavka."
      ),
      tr(
        "I know which changes require new backups, including imported keys and password changes.",
        "Znam koje promjene zahtijevaju nove kopije, uključujući uvezene ključeve i promjene lozinki."
      ),
      tr(
        "My update procedure verifies new software before use and keeps the active signer offline.",
        "Postupak nadogradnje provjerava novi softver prije upotrebe i zadržava aktivni potpisnik offline."
      ),
    ],
  })

  reviseCustodyPolicy(lessons, language)
  if (language === "en") reviseBeginnerLanguage(lessons)

  // Keep all existing lessons accessible, but remove repeated theory and advanced
  // experiments from the required beginner path. These groups own every ID once.
  const groups: {
    title: string
    summary: string
    ids: string[]
    optional?: string[]
  }[] = [
    {
      title: tr("Start with the essentials", "Počni s osnovama"),
      summary: tr(
        "Decide what you need to protect and learn where to practise safely.",
        "Model prijetnji, filozofija čuvanja i mreža za vježbu."
      ),
      ids: [
        "0.1",
        "0.2",
        "1.5",
        "signet-why",
        "signet-vs-mainnet",
        "0.3",
        "2.1",
        "own-node",
        "core-development",
        "1.2",
        "1.3",
        "1.1",
        "1.4",
      ],
      optional: [
        "0.3",
        "2.1",
        "own-node",
        "core-development",
        "1.2",
        "1.3",
        "1.1",
        "1.4",
      ],
    },
    {
      title: tr("Complete the Signet cycle", "Prođi cijeli Signet ciklus"),
      summary: tr(
        "Create, encrypt, back up, receive, send, restore and send again.",
        "Izradi, šifriraj, kopiraj, primi, pošalji, obnovi i ponovno pošalji."
      ),
      ids: [
        "signet-install-verify",
        "signet-start",
        "signet-first-wallet",
        "signet-encrypt-new-backup",
        "signet-receive-send",
        "signet-restore",
        "signet-transact-again",
        "signet-readiness",
        "signet-entropy-deep-dive",
        "2.2",
        "ibd-separation",
        "2.3",
        "core-not-server",
        "2.6",
        "node-migration",
      ],
      optional: [
        "signet-entropy-deep-dive",
        "2.2",
        "ibd-separation",
        "2.3",
        "core-not-server",
        "2.6",
        "node-migration",
      ],
    },
    {
      title: tr(
        "Practise signing on an offline computer",
        "Uvježbaj offline arhitekturu"
      ),
      summary: tr(
        "Separate the online and offline jobs, transfer payment files and rebuild both wallets.",
        "Trajni potpisnik, javni descriptori, PSBT i neovisni oporavak."
      ),
      ids: [
        "architecture-choice",
        "2.4",
        "real-device",
        "ops-malware",
        "ops-physical",
        "offline-device",
        "offline-psbt",
        "offline-recovery",
        "ops-documentation",
        "optional-tails",
        "architecture-path-a",
        "2.5",
        "2.8",
      ],
      optional: ["optional-tails", "architecture-path-a", "2.5", "2.8"],
    },
    {
      title: tr(
        "Prepare mainnet and test recovery",
        "Pripremi mainnet i testiraj oporavak"
      ),
      summary: tr(
        "Create the real wallet, restore its backup and send a small test payment.",
        "Novi ključevi, neovisne kopije i mala potrošnja iz obnovljenog potpisnika."
      ),
      ids: [
        "mainnet-separate-wallet",
        "real-encryption",
        "backup-redundancy-freshness",
        "encrypted-backup-privacy",
        "real-restore",
        "mainnet-readiness",
        "mainnet-small-test",
      ],
    },
    {
      title: tr("Maintain the setup", "Održavaj postavu"),
      summary: tr(
        "Review backups, physical access and a recovery plan others can follow.",
        "Pregledaj kopije, fizički pristup i uputu koju drugi mogu pratiti."
      ),
      ids: ["ops-routine", "ops-inheritance"],
      optional: ["ops-inheritance"],
    },
    {
      title: tr("Optional experiments", "Izborni eksperimenti"),
      summary: tr(
        "Explore several-key approval, different spending rules and local test networks.",
        "Multisig, Taproot i laboratorij nakon osnovnog ciklusa oporavka."
      ),
      ids: [
        "multisig-why",
        "multisig-signet",
        "multisig-backup",
        "multisig-failures",
        "taproot-model",
        "taproot-descriptors",
        "complex-simple",
        "taproot-path-tests",
        "lab-method",
        "lab-rpc",
        "lab-descriptors",
        "lab-psbt",
        "lab-regtest",
        "lab-community",
      ],
      optional: [
        "multisig-why",
        "multisig-signet",
        "multisig-backup",
        "multisig-failures",
        "taproot-model",
        "taproot-descriptors",
        "complex-simple",
        "taproot-path-tests",
        "lab-method",
        "lab-rpc",
        "lab-descriptors",
        "lab-psbt",
        "lab-regtest",
        "lab-community",
      ],
    },
  ]
  return groups.map((group, index) => {
    const grouped = group.ids.map((id) => {
      const lesson = lessons.get(id)!
      if (!lesson) throw new Error(`Missing lesson: ${id}`)
      const guidedSteps = lesson.guidedSteps?.map((s) => ({
        ...s,
        warning: s.warning ?? (id.startsWith("signet-") ? testOnly : undefined),
      }))
      return {
        ...lesson,
        optional: group.optional?.includes(id) ?? false,
        guidedSteps,
        // The lesson's existing review metadata remains historical. Newly expanded
        // drafts explicitly await a complete physical-device rehearsal.
        reviewNote:
          lesson.verification === "review-required"
            ? lesson.reviewNote ||
              tr(
                "Expanded draft. Reproduce the full procedure on the stated versions before publication.",
                "Dopunjen nacrt. Prije objave ponoviti cijeli postupak na navedenim verzijama."
              )
            : undefined,
      }
    })
    const required = grouped.filter((l) => !l.optional)
    const published = grouped.every((l) => l.status === "published")
    return {
      id: String(index),
      slug: `guided-phase-${index + 1}`,
      shortTitle: group.title,
      title: group.title,
      summary: group.summary,
      outcome: group.summary,
      status: published ? "published" : "in-progress",
      estimatedTime: tr(
        `${required.length} required ${required.length === 1 ? "lesson" : "lessons"}`,
        `${required.length} obaveznih koraka`
      ),
      lessons: grouped,
    }
  })
}
