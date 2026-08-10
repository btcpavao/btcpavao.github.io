import {
  curriculumModules as legacyModules,
  type CurriculumCodeBlock,
  type CurriculumLesson,
  type CurriculumSource,
  type CurriculumStatus,
} from "@/bitcoin-core-curriculum-data"

export const CURRICULUM_VERSION = "2.0"
export const CORE_REFERENCE_VERSION = "Bitcoin Core 31.1"
export const SPARROW_REFERENCE_VERSION = "Sparrow 2.5.2"
export const ELECTRUM_REFERENCE_VERSION = "Electrum 4.8.0"
export const LAST_TECHNICAL_REVIEW = "2026-08-10"

export type LessonVerification = "verified" | "review-required" | "planned"
export type LessonCalloutKind =
  | "important"
  | "warning"
  | "mental-model"
  | "verify"

export type LessonCallout = {
  kind: LessonCalloutKind
  title: string
  body: string
}

export type PlayerLesson = Omit<CurriculumLesson, "status"> & {
  status: CurriculumStatus
  slug: string
  objective: string
  estimatedTime: string
  verification: LessonVerification
  referenceVersion: string
  lastReviewed: string
  reviewNote?: string
  explanation?: string[]
  walkthrough?: {
    title: string
    intro?: string
    steps: string[]
  }
  callouts?: LessonCallout[]
  commonMistakes?: string[]
  communityQuestions?: string[]
  origin?: string
}

export type CurriculumPhase = {
  id: string
  slug: string
  shortTitle: string
  title: string
  summary: string
  outcome: string
  status: CurriculumStatus
  estimatedTime: string
  lessons: PlayerLesson[]
}

export type { CurriculumCodeBlock, CurriculumSource, CurriculumStatus }

const coreRelease: CurriculumSource = {
  label: "Bitcoin Core 31.1 — release notes",
  url: "https://bitcoincore.org/en/releases/31.1/",
}

const coreRepository: CurriculumSource = {
  label: "Bitcoin Core — izvorni kod i razvojni proces",
  url: "https://github.com/bitcoin/bitcoin/tree/v31.1",
}

const managingWallets: CurriculumSource = {
  label: "Bitcoin Core 31.1 — Managing the Wallet",
  url: "https://github.com/bitcoin/bitcoin/blob/v31.1/doc/managing-wallets.md",
}

const coreFiles: CurriculumSource = {
  label: "Bitcoin Core 31.1 — datoteke i data directory",
  url: "https://github.com/bitcoin/bitcoin/blob/v31.1/doc/files.md",
}

const descriptors: CurriculumSource = {
  label: "Bitcoin Core 31.1 — Output Descriptors",
  url: "https://github.com/bitcoin/bitcoin/blob/v31.1/doc/descriptors.md",
}

const offlineSigning: CurriculumSource = {
  label: "Bitcoin Core 31.1 — Offline Signing Tutorial",
  url: "https://github.com/bitcoin/bitcoin/blob/v31.1/doc/offline-signing-tutorial.md",
}

const psbt: CurriculumSource = {
  label: "Bitcoin Core 31.1 — PSBT dokumentacija",
  url: "https://github.com/bitcoin/bitcoin/blob/v31.1/doc/psbt.md",
}

const multisigTutorial: CurriculumSource = {
  label: "Bitcoin Core 31.1 — Multisig Tutorial",
  url: "https://github.com/bitcoin/bitcoin/blob/v31.1/doc/multisig-tutorial.md",
}

const bip39: CurriculumSource = {
  label: "BIP 39 — Mnemonic code for deterministic keys",
  url: "https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki",
}

const bip325: CurriculumSource = {
  label: "BIP 325 — Signet",
  url: "https://github.com/bitcoin/bips/blob/master/bip-0325.mediawiki",
}

const sparrowQuickStart: CurriculumSource = {
  label: "Sparrow Wallet — službeni Quick Start Guide",
  url: "https://www.sparrowwallet.com/docs/quick-start.html",
}

const sparrowRelease: CurriculumSource = {
  label: "Sparrow 2.5.2 — službeno izdanje",
  url: "https://github.com/sparrowwallet/sparrow/releases/tag/2.5.2",
}

const electrumDocs: CurriculumSource = {
  label: "Electrum 4 — službena dokumentacija",
  url: "https://electrum.readthedocs.io/en/latest/",
}

const electrumRelease: CurriculumSource = {
  label: "Electrum 4.8.0 — release notes",
  url: "https://github.com/spesmilo/electrum/blob/master/RELEASE-NOTES",
}

const hwi: CurriculumSource = {
  label: "Bitcoin Core HWI projekt",
  url: "https://github.com/bitcoin-core/HWI",
}

const legacyLessons = new Map(
  legacyModules.flatMap((module) =>
    module.lessons.map((lesson) => [lesson.id, lesson] as const)
  )
)

function retainLesson(
  id: string,
  config: {
    slug: string
    objective?: string
    estimatedTime?: string
    status?: CurriculumStatus
    verification?: LessonVerification
    referenceVersion?: string
    reviewNote?: string
    sources?: CurriculumSource[]
    explanation?: string[]
    callouts?: LessonCallout[]
    origin?: string
  }
): PlayerLesson {
  const legacy = legacyLessons.get(id)
  if (!legacy) throw new Error(`Nedostaje legacy lekcija ${id}`)

  return {
    ...legacy,
    status: config.status ?? legacy.status,
    slug: config.slug,
    objective: config.objective ?? legacy.what ?? legacy.summary,
    estimatedTime: config.estimatedTime ?? "8–12 min",
    verification:
      config.verification ??
      (legacy.status === "published" ? "verified" : "review-required"),
    referenceVersion: config.referenceVersion ?? CORE_REFERENCE_VERSION,
    lastReviewed: LAST_TECHNICAL_REVIEW,
    reviewNote: config.reviewNote,
    sources: config.sources ?? legacy.sources,
    explanation: config.explanation,
    callouts: config.callouts,
    origin: config.origin ?? `Premješteno iz starog modula ${id.split(".")[0]}`,
  }
}

function outlineLesson(config: {
  id: string
  slug: string
  title: string
  summary: string
  objective: string
  estimatedTime?: string
  status?: CurriculumStatus
  verification?: LessonVerification
  referenceVersion?: string
  reviewNote?: string
  explanation?: string[]
  concepts?: string[]
  warnings?: string[]
  checklist?: string[]
  sources?: CurriculumSource[]
  callouts?: LessonCallout[]
  walkthrough?: PlayerLesson["walkthrough"]
  origin?: string
}): PlayerLesson {
  return {
    id: config.id,
    slug: config.slug,
    title: config.title,
    summary: config.summary,
    objective: config.objective,
    estimatedTime: config.estimatedTime ?? "10–15 min",
    status: config.status ?? "in-progress",
    verification: config.verification ?? "review-required",
    referenceVersion: config.referenceVersion ?? CORE_REFERENCE_VERSION,
    lastReviewed: LAST_TECHNICAL_REVIEW,
    reviewNote: config.reviewNote,
    explanation: config.explanation,
    concepts: config.concepts,
    warnings: config.warnings,
    checklist: config.checklist,
    sources: config.sources,
    callouts: config.callouts,
    walkthrough: config.walkthrough,
    videoUrl: null,
    origin: config.origin ?? "Nova lekcija u curriculum v2",
  }
}

const standardReviewNote =
  "Operativni koraci i screenshotovi moraju se ponovno reproducirati na navedenoj verziji prije nego što lekcija postane objavljena."

export const curriculumPhases: CurriculumPhase[] = [
  {
    id: "0",
    slug: "zasto-self-custody",
    shortTitle: "Zašto self-custody?",
    title: "Zašto self-custody?",
    summary:
      "Prvo definiramo što štitiš, od čega se štitiš i zašto ključevi sami nisu cijeli sustav.",
    outcome:
      "Moći ćeš nacrtati vlastiti custody sustav i imenovati njegove stvarne failure modeove.",
    status: "published",
    estimatedTime: "35 min",
    lessons: [
      retainLesson("0.1", {
        slug: "sto-self-custody-stvarno-znaci",
        objective:
          "Razlikovati kontrolu ključeva od provjere, backupa, potpisivanja i oporavka.",
      }),
      retainLesson("0.2", {
        slug: "threat-model-prije-alata",
        objective:
          "Napraviti threat model koji uspoređuje vjerojatnost, posljedicu i cijenu zaštite.",
      }),
      retainLesson("0.3", {
        slug: "sigurnost-je-proces",
        objective:
          "Prepoznati operativne pogreške koje dobra kriptografija sama ne može spriječiti.",
        callouts: [
          {
            kind: "mental-model",
            title: "Svaka zaštita mora imati posao",
            body: "Prije offline laptopa, dodatnog backupa ili multisiga pitaj: koji konkretan failure mode ovime smanjujem i koju novu složenost uvodim?",
          },
        ],
      }),
    ],
  },
  {
    id: "1",
    slug: "zasto-bitcoin-core",
    shortTitle: "Zašto Bitcoin Core?",
    title: "Zašto Bitcoin Core za self-custody?",
    summary:
      "Uspoređujemo sigurnosne filozofije i broj odluka koje alat traži od korisnika — bez tribalizma.",
    outcome:
      "Znat ćeš zašto ovaj put koristi Core i kada bi drugi alat ili hardware wallet bio razuman izbor.",
    status: "published",
    estimatedTime: "90 min",
    lessons: [
      retainLesson("1.5", {
        slug: "core-kao-alat-ne-kao-identitet",
        objective:
          "Objasniti zašto uži početni flow može smanjiti broj nerazumljivih sigurnosnih odluka.",
        explanation: [
          "Bitcoin Core ovdje nije cilj sam po sebi. Koristimo ga kao konzervativan alat za izgradnju sustava koji možeš provjeriti, backupirati, restorirati i postupno nadograđivati.",
          "Jednostavniji početni flow ne uklanja malware, fizičke rizike ni ljudsku pogrešku. Samo ostavlja više pažnje za odluke koje stvarno moraš razumjeti.",
        ],
        sources: [managingWallets, coreRelease],
      }),
      retainLesson("2.1", {
        slug: "sto-je-bitcoin-core",
        objective:
          "Razdvojiti node koji validira od walleta koji prati sredstva i potpisuje.",
        sources: [coreRepository, coreRelease],
      }),
      outlineLesson({
        id: "own-node",
        slug: "tvoj-node-je-prije-svega-vazan-tebi",
        title: "Tvoj node je prije svega važan tebi",
        summary:
          "Vlastiti node omogućuje ti da sam provjeriš pravila, transakcije i stanje walleta bez oslanjanja na tuđi node ili servis.",
        objective:
          "Objasniti osobnu sigurnosnu vrijednost vlastitog nodea bez narativa o altruističnom pomaganju mreži.",
        status: "published",
        verification: "verified",
        explanation: [
          "Node prima blokove i transakcije te provjerava odgovaraju li pravilima koja pokrećeš. Kada wallet koristi tvoj node, stanje i povijest ne preuzimaš kao gotovu tvrdnju udaljenog servisa.",
          "To ne znači da svaki node mora biti javni server, arhivski node ili računalo koje radi 24/7. Funkcija koju trebaš određuje resurse i način rada.",
        ],
        concepts: [
          "Validacija pravila i čuvanje privatnih ključeva odvojene su funkcije.",
          "Pruned node i dalje validira blokove, iako ne čuva cijelu povijest na disku.",
          "Vlastiti node smanjuje potrebu da trećoj strani otkrivaš wallet upite i prihvatiš njezin pogled na lanac.",
        ],
        sources: [coreRepository, coreFiles],
        callouts: [
          {
            kind: "mental-model",
            title: "Verify, don't worship",
            body: "Bitcoin Core nije autoritet kojem vjeruješ zato što je popularan. Vrijednost je u tome što pokrećeš javno provjerljiv skup pravila i zadržavaš mogućnost neovisne provjere.",
          },
        ],
      }),
      outlineLesson({
        id: "core-development",
        slug: "battle-tested-ne-znaci-bez-bugova",
        title: "Battle-tested ne znači bez bugova",
        summary:
          "Dug razvojni vijek, javni review i ekonomska važnost daju razlog za konzervativno povjerenje u proces — ne garanciju savršenstva.",
        objective:
          "Razlikovati povjerenje u transparentan razvojni proces od slijepog argumenta autoriteta.",
        status: "published",
        verification: "verified",
        explanation: [
          "Bitcoin Core razvija se javno: promjene prolaze review, automatizirana testiranja i objavljene release cikluse. Na njegovo se ponašanje oslanja važna infrastruktura, pa regresije imaju ozbiljne posljedice i velik broj motiviranih promatrača.",
          "To povećava težinu procesa, ali ne uklanja mogućnost buga, pogrešne konfiguracije ili loše operativne odluke korisnika.",
        ],
        sources: [coreRepository, coreRelease],
      }),
      retainLesson("1.2", {
        slug: "sparrow-flow-i-sigurnosne-pretpostavke",
        objective:
          "Analizirati koje odluke Sparrow rano izlaže korisniku i što moraš razumjeti prije njihova izbora.",
        status: "in-progress",
        verification: "review-required",
        referenceVersion: SPARROW_REFERENCE_VERSION,
        reviewNote:
          "Službeni Quick Start potvrđuje policy, script i keystore odluke. Cijeli GUI flow i mnemonic ponašanje još treba reproducirati na Sparrowu 2.5.2 prije objave.",
        sources: [sparrowQuickStart, sparrowRelease],
      }),
      retainLesson("1.3", {
        slug: "electrum-flow-i-sigurnosne-pretpostavke",
        objective:
          "Proći aktualni Electrum wizard, seed confirmation, enkripciju i upozorenja kao jedan operativni proces.",
        status: "in-progress",
        verification: "review-required",
        referenceVersion: ELECTRUM_REFERENCE_VERSION,
        reviewNote:
          "Seed sustav i službene upute su dokumentirani, ali screenshotovi i cijeli creation flow trebaju reprodukciju na Electrumu 4.8.0.",
        sources: [electrumDocs, electrumRelease],
      }),
      retainLesson("1.1", {
        slug: "hardware-wallet-kao-tradeoff",
        objective:
          "Procijeniti hardware wallet kroz konkretne failure modeove, a ne kao automatski odgovor na kompleksnost.",
        sources: [hwi],
      }),
      retainLesson("1.4", {
        slug: "bip39-kriptografija-i-backup-model",
        objective:
          "Odvojiti kvalitetu računalno generirane entropije od dugoročnog fizičkog i operativnog recovery modela.",
        referenceVersion: "BIP 39",
        sources: [bip39],
        callouts: [
          {
            kind: "important",
            title: "BIP39 nije problem sam po sebi",
            body: "BIP39 s kvalitetno generiranom entropijom može imati odličnu kriptografsku sigurnost. Problem nastaje kada čovjek sam bira riječi ili kada recovery sustav ne čuva sve potrebne metapodatke.",
          },
        ],
      }),
    ],
  },
  {
    id: "2",
    slug: "sigurno-igraliste",
    shortTitle: "Sigurno igralište",
    title: "Sigurno igralište: sve prvo na Signetu",
    summary:
      "Wallet operacije ponavljaš s bitcoinima bez tržišne vrijednosti dok postupak ne postane razumljiv i rutinski.",
    outcome:
      "Napravit ćeš puni create → receive → send → backup → destroy → restore ciklus bez stvarnog financijskog rizika.",
    status: "in-progress",
    estimatedTime: "2–3 h",
    lessons: [
      outlineLesson({
        id: "signet-why",
        slug: "prvo-nauci-s-bitcoinima-bez-vrijednosti",
        title: "Prvo nauči s bitcoinima koji nemaju vrijednost",
        summary:
          "Self-custody ne bi trebao biti postupak koji prvi put radiš kada je stvaran novac na kocki.",
        objective:
          "Objasniti zašto je ponovljiv testni ciklus sigurnosna karakteristika, a ne samo vježba za početnike.",
        status: "published",
        verification: "verified",
        referenceVersion: "BIP 325 / Bitcoin Core 31.1",
        explanation: [
          "Signet je Bitcoin testna mreža na kojoj coinovi nemaju tržišnu vrijednost. Pravila i wallet koncepti ostaju dovoljno slični da možeš vježbati adrese, transakcije, fee, backup, restore i potpisivanje bez mainnet rizika.",
          "Cilj nije jednom uspješno kliknuti kroz flow. Cilj je moći ga ponoviti, objasniti i prepoznati kada nešto odstupa od očekivanog.",
        ],
        sources: [bip325, offlineSigning],
        callouts: [
          {
            kind: "warning",
            title: "Signet nije privatno okruženje",
            body: "Coinovi nemaju tržišnu vrijednost, ali adrese i transakcije i dalje su javne na testnom lancu. Ne koristi stvarne tajne ni mainnet seedove.",
          },
        ],
        checklist: [
          "Razumijem zašto Signet coin nije mainnet bitcoin",
          "Znam da testna mreža ne opravdava unos stvarnih tajni",
          "Prihvaćam da ću recovery ponoviti prije stvarnih sredstava",
        ],
      }),
      outlineLesson({
        id: "signet-vs-mainnet",
        slug: "mainnet-vs-signet",
        title: "Mainnet vs Signet",
        summary:
          "Isti mentalni modeli, odvojeni lanci, odvojeni data directoryji i potpuno različita vrijednost coinova.",
        objective:
          "Pouzdano prepoznati na kojoj mreži radiš prije svake wallet ili RPC operacije.",
        status: "published",
        verification: "verified",
        referenceVersion: "BIP 325 / Bitcoin Core 31.1",
        concepts: [
          "Signet koristi odvojeni lanac i odvojeni poddirektorij podataka.",
          "Signet adresa i mainnet adresa nisu zamjenjive destinacije.",
          "Naziv walleta nije dovoljan dokaz mreže; provjeri aktivni chain kontekst.",
        ],
        sources: [bip325, coreFiles],
      }),
      outlineLesson({
        id: "signet-start",
        slug: "pokretanje-bitcoin-corea-na-signetu",
        title: "Pokretanje Bitcoin Corea na Signetu",
        summary:
          "Instalacija, verifikacija preuzimanja i odvojeni Signet profil prije prve wallet operacije.",
        objective:
          "Pokrenuti provjerenu verziju Corea na Signetu bez pristupa mainnet walletima.",
        reviewNote: standardReviewNote,
        sources: [coreRelease, bip325],
      }),
      outlineLesson({
        id: "signet-first-wallet",
        slug: "prvi-signet-wallet-i-adresa",
        title: "Prvi Signet wallet i receive adresa",
        summary:
          "Napravi očito testni wallet, zabilježi mrežu i generiraj prvu adresu.",
        objective:
          "Razumjeti što je stvorio wallet, što je stvorio node i gdje se podaci fizički nalaze.",
        reviewNote: standardReviewNote,
        sources: [managingWallets, coreFiles],
      }),
      outlineLesson({
        id: "signet-receive-send",
        slug: "prvi-receive-i-send-na-signetu",
        title: "Prvi receive i send",
        summary:
          "Dobavi testne coinove, provjeri primitak, odaberi iznos i pošalji Signet transakciju.",
        objective:
          "Pratiti puni tok od adrese do potvrđenog primitka i kontroliranog slanja.",
        reviewNote:
          "Faucet, aktualni GUI i fee/coin-selection flow treba provjeriti neposredno prije objave.",
        sources: [bip325],
      }),
      outlineLesson({
        id: "signet-restore",
        slug: "backup-unisti-testno-okruzenje-i-restore",
        title: "Backup, uništi testno okruženje i napravi restore",
        summary:
          "Test završava tek kada novi setup iz backupa ponovno vidi očekivane adrese i može koristiti wallet.",
        objective:
          "Dokazati da backup i passphrase zajedno daju ponovljiv recovery, a ne samo osjećaj sigurnosti.",
        reviewNote: standardReviewNote,
        sources: [managingWallets],
      }),
      outlineLesson({
        id: "muscle-memory",
        slug: "self-custody-muscle-memory",
        title: "Self-custody muscle memory",
        summary:
          "Sustav koji godinama ne diraš postaje stresan upravo kada ti je najpotrebniji.",
        objective:
          "Uvesti periodičan recovery drill kojim postupak ostaje poznat, provjerljiv i dokumentiran.",
        status: "published",
        verification: "verified",
        referenceVersion: "Operativni model v1",
        explanation: [
          "Čest obrazac je: mali test, veliki transfer, olakšanje i zatim godine bez vježbe. Za to vrijeme mijenjaju se uređaji, software i vlastito sjećanje.",
          "Na Signetu možeš redovito ponoviti receive, send, backup, restore i signing bez premještanja stvarne ušteđevine. Rutina smanjuje psihološki otpor i otkriva zastarjele upute dok posljedice još nisu financijske.",
        ],
        checklist: [
          "Odredio sam ritam recovery drilla",
          "Znam koje rezultate provjeravam nakon restora",
          "Bilježit ću verziju softwarea i datum svakog drilla",
        ],
        callouts: [
          {
            kind: "mental-model",
            title: "Ne postavi i zaboravi",
            body: "Dobar custody sustav nije onaj koji nikada ne diraš, nego onaj koji možeš kontrolirano testirati bez ugrožavanja stvarnih sredstava.",
          },
        ],
      }),
    ],
  },
  {
    id: "3",
    slug: "prvi-stvarni-core-wallet",
    shortTitle: "Prvi stvarni wallet",
    title: "Tvoj prvi stvarni Core wallet",
    summary:
      "Tek nakon ponovljivog Signet restora dizajniraš računalo, enkripciju, backup i recovery za stvarna sredstva.",
    outcome:
      "Imat ćeš dokumentiran single-sig sustav čiji si recovery dokazao prije mainnet uporabe.",
    status: "in-progress",
    estimatedTime: "3–5 h",
    lessons: [
      outlineLesson({
        id: "real-device",
        slug: "odabir-racunala-i-malware-threat-model",
        title: "Odabir računala i malware threat model",
        summary:
          "General-purpose hardware može biti razuman signer ili wallet uređaj kada točno znaš koji rizik odvajanjem smanjuješ.",
        objective:
          "Odabrati ulogu uređaja prema threat modelu, a ne prema etiketi proizvoda.",
        sources: [offlineSigning],
        reviewNote: standardReviewNote,
      }),
      outlineLesson({
        id: "real-create",
        slug: "kreiranje-stvarnog-walleta",
        title: "Kreiranje walleta",
        summary:
          "Novi descriptor wallet nastaje tek kada su uređaj, mreža i recovery plan unaprijed definirani.",
        objective:
          "Kreirati wallet bez preskakanja bilješki o verziji, lokaciji i namjeni.",
        sources: [managingWallets],
        reviewNote: standardReviewNote,
      }),
      outlineLesson({
        id: "real-encryption",
        slug: "enkripcija-i-passphrase",
        title: "Enkripcija i passphrase",
        summary:
          "Passphrase štiti privatne ključeve u wallet datoteci, ali ne skriva sve metapodatke i ne zaustavlja keylogger.",
        objective:
          "Objasniti što wallet enkripcija štiti, što ne štiti i kako gubitak passphrasea mijenja recovery.",
        sources: [managingWallets],
        reviewNote: standardReviewNote,
      }),
      outlineLesson({
        id: "real-backup",
        slug: "wallet-backup-i-redundancija",
        title: "Wallet backup i redundancija",
        summary:
          "Ugrađeni backup postupak, više pouzdanih kopija i jasno odvajanje walleta od passphrasea.",
        objective:
          "Napraviti backup sustav u kojem gubitak jednog medija ili lokacije nije kraj recoveryja.",
        sources: [managingWallets],
        reviewNote: standardReviewNote,
      }),
      outlineLesson({
        id: "real-restore",
        slug: "restore-na-cistom-testnom-okruzenju",
        title: "Restore na čistom testnom okruženju",
        summary:
          "Backup postaje dokaz tek kada ga učitaš, provjeriš adrese i potvrdiš da passphrase radi.",
        objective:
          "Dovršiti puni create → encrypt → backup → restore → verify ciklus.",
        sources: [managingWallets],
        reviewNote: standardReviewNote,
      }),
      outlineLesson({
        id: "real-verify",
        slug: "verification-prije-prvog-mainnet-deposita",
        title: "Verification prije prvog mainnet deposita",
        summary:
          "Prvi stvarni deposit dolazi tek nakon provjerenih adresa, backupa, passphrasea i dokumentiranog izlaza iz problema.",
        objective:
          "Donijeti informiranu odluku je li sustav spreman za mali mainnet test.",
        reviewNote: standardReviewNote,
        sources: [managingWallets],
      }),
    ],
  },
  {
    id: "4",
    slug: "node-bez-mitologije",
    shortTitle: "Node bez mitologije",
    title: "Node bez mitologije",
    summary:
      "Razdvajaš wallet, IBD, pruning, pohranu i migraciju kako 2 TB i dedicated server ne bi postali lažni preduvjeti.",
    outcome:
      "Znat ćeš koje su funkcije Corea potrebne tvojem setupu i koji resurs svaka od njih stvarno traži.",
    status: "in-progress",
    estimatedTime: "70 min",
    lessons: [
      retainLesson("2.2", {
        slug: "node-wallet-i-blockchain-nisu-ista-stvar",
        objective:
          "Razlikovati sinkronizaciju lanca od stvaranja, backupa i potpisivanja walletom.",
        sources: [coreRepository, coreFiles],
      }),
      retainLesson("2.3", {
        slug: "full-vs-pruned-node",
        objective:
          "Objasniti kako pruned node potpuno validira blokove, ali ih nakon validacije ne čuva sve trajno.",
        sources: [coreFiles, coreRelease],
      }),
      outlineLesson({
        id: "ibd-separation",
        slug: "ibd-nije-prepreka-za-ucenje-walleta",
        title: "IBD nije prepreka za učenje wallet operacija",
        summary:
          "Potpuna sinkronizacija potrebna je za aktualan, neovisno validiran pogled na lanac — ali wallet creation, backup, restore i signing zasebni su koncepti.",
        objective:
          "Razdvojiti što možeš učiti odmah od onoga što zahtijeva sinkronizirani node.",
        status: "published",
        verification: "verified",
        explanation: [
          "Initial Block Download preuzima i validira povijest potrebnu da node sam izračuna aktualno stanje. Bez toga node nema potpuno sinkroniziran pogled za provjeru primitaka i broadcast u aktualnom kontekstu.",
          "Wallet datoteka, descriptori, backup i potpisivanje ipak nisu isto što i blockchain baza. Zato metodologiju učenja dijelimo na wallet vježbe i mrežne operacije.",
        ],
        sources: [coreFiles, offlineSigning],
      }),
      retainLesson("2.6", {
        slug: "wallet-backup-vs-node-podaci",
        objective:
          "Razlikovati wallet backup od block, chainstate i drugih node podataka te izbjeći nesigurno kopiranje aktivnog datadira.",
        sources: [coreFiles, managingWallets],
      }),
      outlineLesson({
        id: "node-migration",
        slug: "migracija-node-podataka-ili-nova-validacija",
        title: "Migracija node podataka ili nova validacija",
        summary:
          "Kopiranje provjerenih podataka može uštedjeti vrijeme, ali mora slijediti siguran shutdown i dokumentirani postupak.",
        objective:
          "Procijeniti tradeoff između migracije node podataka i nove sinkronizacije bez miješanja s wallet recoveryjem.",
        reviewNote: standardReviewNote,
        sources: [coreFiles],
      }),
      outlineLesson({
        id: "core-not-server",
        slug: "core-nije-ili-server-ili-beskoristan",
        title: "Core nije ili 24/7 server ili beskoristan",
        summary:
          "Archival node, pruned node, online coordinator i offline signer različite su uloge s različitim zahtjevima.",
        objective:
          "Odabrati najmanju Core arhitekturu koja rješava tvoj konkretan problem.",
        status: "published",
        verification: "verified",
        concepts: [
          "Archival node čuva cijelu povijest blokova.",
          "Pruned node validira, ali ograničava trajno čuvanje starih blokova.",
          "Offline signer ne treba blockchain ni mrežu za svoju usku funkciju.",
        ],
        sources: [coreFiles, offlineSigning],
      }),
    ],
  },
  {
    id: "5",
    slug: "offline-signing",
    shortTitle: "Offline signing",
    title: "Offline signing",
    summary:
      "Online node zna stanje i priprema transakciju; offline signer drži ključeve i potpisuje PSBT.",
    outcome:
      "Na Signetu ćeš moći pripremiti, pregledati, potpisati, finalizirati i objaviti transakciju bez online privatnih ključeva.",
    status: "in-progress",
    estimatedTime: "3–4 h",
    lessons: [
      retainLesson("2.4", {
        slug: "online-node-i-offline-signer",
        objective:
          "Podijeliti sustav na online provjeru i offline ovlast potpisivanja.",
        sources: [offlineSigning, psbt],
      }),
      retainLesson("2.5", {
        slug: "zasto-signer-ne-treba-blockchain",
        objective:
          "Objasniti koje podatke PSBT prenosi i zašto signer ne mora sinkronizirati lanac.",
        sources: [offlineSigning, psbt],
      }),
      retainLesson("2.8", {
        slug: "hot-watch-only-i-signing-wallet",
        objective:
          "Razlikovati ovlasti i privatnosne posljedice hot, watch-only i offline walleta.",
        sources: [offlineSigning, descriptors],
      }),
      outlineLesson({
        id: "offline-device",
        slug: "priprema-offline-signera",
        title: "Priprema offline signera",
        summary:
          "General-purpose računalo dobiva jednu dokumentiranu funkciju i ostaje odvojeno od mreže.",
        objective:
          "Pripremiti signer bez pretvaranja air-gapa u čarobnu sigurnosnu tvrdnju.",
        reviewNote: standardReviewNote,
        sources: [offlineSigning],
      }),
      outlineLesson({
        id: "offline-psbt",
        slug: "prva-offline-potpisana-transakcija",
        title: "Prva offline potpisana transakcija",
        summary:
          "Unsigned PSBT ide offline, potpisani rezultat vraća se online na finalizaciju i broadcast.",
        objective:
          "Dovršiti cijeli PSBT tok na Signetu i provjeriti iznos, odredište, fee i change.",
        reviewNote:
          "Službeni tutorial je referenca, ali cijeli walkthrough treba reproducirati od nule na Coreu 31.1 prije objave.",
        sources: [offlineSigning, psbt],
      }),
      outlineLesson({
        id: "offline-recovery",
        slug: "recovery-drill-bez-originalnog-koordinatora",
        title: "Recovery drill bez originalnog coordinatora",
        summary:
          "Offline sustav nije dovršen dok watch-only dio i signer ne možeš obnoviti iz dokumentiranih artefakata.",
        objective:
          "Dokazati oporavak svake uloge bez oslanjanja na originalno online računalo.",
        reviewNote: standardReviewNote,
        sources: [offlineSigning, managingWallets, descriptors],
      }),
    ],
  },
  {
    id: "6",
    slug: "operativna-sigurnost",
    shortTitle: "Operativna sigurnost",
    title: "Operativna sigurnost kroz vrijeme",
    summary:
      "Setup ostaje siguran samo ako procedure, uređaji, dokumentacija i ljudi ostanu razumljivi kroz godine.",
    outcome:
      "Imat ćeš ritam održavanja, recovery drilla i dokumentaciju koja ne otkriva tajne.",
    status: "in-progress",
    estimatedTime: "2 h",
    lessons: [
      outlineLesson({
        id: "ops-routine",
        slug: "redovni-testovi-i-godisnji-recovery-drill",
        title: "Redovni testovi i godišnji recovery drill",
        summary:
          "Provjeravaš medije, passphrase, software verziju i recovery rezultat prije nego što nastane hitna situacija.",
        objective:
          "Pretvoriti recovery iz teorije u periodičan, mjerljiv postupak.",
        reviewNote: standardReviewNote,
        sources: [managingWallets],
      }),
      outlineLesson({
        id: "ops-malware",
        slug: "malware-usb-i-provjera-odredista",
        title: "Malware, USB i provjera odredišta",
        summary:
          "Air-gap smanjuje mrežnu izloženost, ali prijenosni medij i neprovjeren PSBT i dalje prenose rizik.",
        objective:
          "Imenovati što provjeravaš prije potpisa i kojim neovisnim prikazom.",
        reviewNote: standardReviewNote,
        sources: [offlineSigning],
      }),
      outlineLesson({
        id: "ops-physical",
        slug: "fizicka-sigurnost-i-backup-mediji",
        title: "Fizička sigurnost i backup mediji",
        summary:
          "Papir, metal i digitalni mediji imaju različite failure modeove; threat model određuje kombinaciju.",
        objective:
          "Procijeniti požar, vodu, krađu, gubitak, koroziju i dostupnost bez proglašavanja jednog medija univerzalnim.",
        reviewNote: standardReviewNote,
      }),
      outlineLesson({
        id: "ops-documentation",
        slug: "dokumentiraj-proceduru-bez-otkrivanja-tajni",
        title: "Dokumentiraj proceduru bez otkrivanja tajni",
        summary:
          "Recovery upute trebaju opisati artefakte, redoslijed i provjere bez kopiranja svih tajni u jedan dokument.",
        objective:
          "Napraviti operativnu mapu sustava koja preživljava zaborav i promjenu uređaja.",
        reviewNote: standardReviewNote,
      }),
      outlineLesson({
        id: "ops-inheritance",
        slug: "inheritance-i-drugi-ljudi",
        title: "Inheritance i drugi ljudi",
        summary:
          "Sustav mora uzeti u obzir tko može razumjeti i provesti recovery kada ti nisi dostupan.",
        objective:
          "Uključiti ljude i pravni kontekst bez prerane tehničke kompleksnosti.",
        verification: "planned",
        status: "planned",
        referenceVersion: "Planirano uz stručnu pravnu provjeru",
      }),
    ],
  },
  {
    id: "7",
    slug: "multisig",
    shortTitle: "Multisig",
    title: "Multisig kada ima stvaran posao",
    summary:
      "2-of-3 uklanja neke pojedinačne točke kvara, ali dodaje descriptore, koordinaciju i nove recovery obveze.",
    outcome:
      "Na Signetu ćeš izgraditi i namjerno pokvariti 2-of-3 sustav prije procjene je li ti uopće potreban.",
    status: "in-progress",
    estimatedTime: "5–7 h",
    lessons: [
      outlineLesson({
        id: "multisig-why",
        slug: "zasto-i-kada-ne-multisig",
        title: "Zašto multisig — i kada nema smisla",
        summary:
          "Multisig je odgovor na konkretan failure mode, ne medalja za naprednog korisnika.",
        objective:
          "Procijeniti koristi li 2-of-3 tvojem threat modelu više nego što mu operativna složenost šteti.",
        sources: [multisigTutorial],
        reviewNote: standardReviewNote,
      }),
      outlineLesson({
        id: "multisig-signet",
        slug: "2-of-3-na-signetu",
        title: "2-of-3 na Signetu",
        summary:
          "Tri testna signera i watch-only coordinator grade prvu spending policy bez stvarnih sredstava.",
        objective:
          "Izgraditi descriptor, potvrditi iste receive adrese i potpisati s bilo koja dva signera.",
        sources: [multisigTutorial, descriptors, psbt],
        reviewNote: standardReviewNote,
      }),
      outlineLesson({
        id: "multisig-backup",
        slug: "kljucevi-nisu-cijeli-multisig-recovery",
        title: "Ključevi nisu cijeli multisig recovery",
        summary:
          "Descriptor, derivacijske informacije, policy i dokumentacija mogu biti nužni uz privatne ključeve.",
        objective:
          "Popisati sve recovery artefakte za točno demonstrirani 2-of-3 setup.",
        sources: [descriptors, multisigTutorial],
        reviewNote: standardReviewNote,
      }),
      outlineLesson({
        id: "multisig-failures",
        slug: "failure-simulacije",
        title: "Failure simulacije",
        summary:
          "Namjerno gubiš coordinator, jedan signer i jednu lokaciju kako bi dokazao granice sustava.",
        objective:
          "Dovršiti recovery bez originalnog coordinatora i s jednim nedostupnim signerom.",
        sources: [multisigTutorial],
        reviewNote: standardReviewNote,
      }),
    ],
  },
  {
    id: "8",
    slug: "taproot-i-napredne-politike",
    shortTitle: "Taproot i politike",
    title: "Taproot i napredne politike",
    summary:
      "Kompleksnija spending policy ne smije automatski proizvesti kaotičan recovery sustav.",
    outcome:
      "Razumjet ćeš key path, script path i dodatne recovery artefakte prije testiranja svake grane na Signetu.",
    status: "in-progress",
    estimatedTime: "U procjeni",
    lessons: [
      outlineLesson({
        id: "taproot-model",
        slug: "taproot-mentalni-model",
        title: "Taproot mentalni model",
        summary:
          "Key path i script path različiti su načini autorizacije, a ne samo novi format adrese.",
        objective:
          "Objasniti što Taproot mijenja bez pretpostavke da je automatski bolji za svaki setup.",
        sources: [descriptors],
        reviewNote: standardReviewNote,
      }),
      outlineLesson({
        id: "taproot-descriptors",
        slug: "taproot-descriptori-i-recovery-artefakti",
        title: "Taproot descriptori i recovery artefakti",
        summary:
          "Točno demonstrirana policy određuje što wallet backup sadrži i što još moraš dokumentirati.",
        objective:
          "Navesti sve artefakte potrebne za recovery konkretne Taproot konstrukcije.",
        sources: [descriptors],
        reviewNote: standardReviewNote,
      }),
      outlineLesson({
        id: "complex-simple",
        slug: "complex-wallet-simple-recovery",
        title: "Complex wallet, simple recovery",
        summary:
          "Naprednija policy može ostati operativno razumljiva ako je svaki path dokumentiran i redovito testiran.",
        objective:
          "Smanjiti psihološki i operativni trošak kompleksnosti kroz Signet i recovery drillove.",
        reviewNote: standardReviewNote,
      }),
      outlineLesson({
        id: "taproot-path-tests",
        slug: "testiranje-svakog-recovery-patha",
        title: "Testiranje svakog recovery patha",
        summary:
          "Path koji postoji samo u descriptoru, ali nikada nije potrošen na Signetu, još nije operativno dokazan.",
        objective:
          "Izvesti i dokumentirati svaku planiranu recovery granu prije mainnet uporabe.",
        sources: [descriptors, psbt],
        reviewNote: standardReviewNote,
      }),
    ],
  },
  {
    id: "9",
    slug: "laboratorij",
    shortTitle: "Laboratorij",
    title: "Self-custody laboratorij",
    summary:
      "Izolirani eksperimenti za RPC, descriptore, PSBT, multisig, Taproot, Regtest i failure scenarije.",
    outcome:
      "Moći ćeš postaviti hipotezu, izvesti eksperiment bez stvarnih sredstava i zabilježiti provjerljiv rezultat.",
    status: "in-progress",
    estimatedTime: "Kontinuirano",
    lessons: [
      outlineLesson({
        id: "lab-method",
        slug: "kako-voditi-self-custody-eksperiment",
        title: "Kako voditi self-custody eksperiment",
        summary:
          "Svaki eksperiment ima mrežu, preduvjete, očekivani rezultat, stvarni rezultat i postupak čišćenja.",
        objective:
          "Izvesti test koji je ponovljiv i ne može dotaknuti wallet sa stvarnim sredstvima.",
        reviewNote: standardReviewNote,
      }),
      outlineLesson({
        id: "lab-rpc",
        slug: "rpc-i-cli",
        title: "RPC i CLI",
        summary:
          "Precizni, verzionirani eksperimenti koji pokazuju razliku između node i wallet konteksta.",
        objective:
          "Čitati pomoć za aktualnu verziju umjesto slijepog kopiranja stare naredbe.",
        sources: [coreRelease, coreRepository],
        reviewNote: standardReviewNote,
      }),
      outlineLesson({
        id: "lab-descriptors",
        slug: "descriptor-eksperimenti",
        title: "Descriptor eksperimenti",
        summary:
          "Watch-only, checksumi i javni metapodaci u kontroliranom testnom okruženju.",
        objective: "Objasniti svaki element descriptora prije importa.",
        sources: [descriptors],
        reviewNote: standardReviewNote,
      }),
      outlineLesson({
        id: "lab-psbt",
        slug: "psbt-debugging",
        title: "PSBT debugging",
        summary:
          "Analiza nedostajućih potpisa, UTXO podataka, feeja i changea bez stvarnih sredstava.",
        objective:
          "Prepoznati što PSBT još treba prije potpisa ili finalizacije.",
        sources: [psbt],
        reviewNote: standardReviewNote,
      }),
      outlineLesson({
        id: "lab-regtest",
        slug: "regtest-i-failure-scenariji",
        title: "Regtest i failure scenariji",
        summary:
          "Lokalni lanac za brze, ponovljive testove i namjerno izazivanje kvarova.",
        objective:
          "Izolirati eksperiment od javnih mreža i sam kontrolirati blokove i testne UTXO-e.",
        reviewNote: standardReviewNote,
      }),
      outlineLesson({
        id: "lab-community",
        slug: "community-pitanja-i-clarifications",
        title: "Community pitanja i clarifications",
        summary:
          "Stvarna pitanja korisnika postaju verzionirane dopune uz točno određenu lekciju.",
        objective:
          "Razlikovati pojašnjenje od promjene procedure i vezati ga uz verziju i primarni izvor.",
        verification: "planned",
        status: "planned",
        referenceVersion: "Living curriculum proces",
      }),
    ],
  },
]

export const curriculumLessons = curriculumPhases.flatMap((phase) =>
  phase.lessons.map((lesson, index) => ({
    phase,
    lesson,
    lessonNumber: `${phase.id}.${index + 1}`,
  }))
)

export function findLessonBySlug(slug: string | null | undefined) {
  if (!slug) return null
  return curriculumLessons.find(({ lesson }) => lesson.slug === slug) ?? null
}

export const publishedCurriculumLessons = curriculumLessons.filter(
  ({ lesson }) => lesson.status === "published"
)

export const curriculumSources = {
  bip39,
  bip325,
  coreFiles,
  coreRelease,
  descriptors,
  electrumDocs,
  managingWallets,
  offlineSigning,
  psbt,
  sparrowQuickStart,
}
