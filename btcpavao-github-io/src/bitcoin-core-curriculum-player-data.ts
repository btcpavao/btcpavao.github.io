import {
  curriculumModules as legacyModules,
  type CurriculumCodeBlock,
  type CurriculumLesson,
  type CurriculumSource,
  type CurriculumStatus,
} from "@/bitcoin-core-curriculum-data"

export const CURRICULUM_VERSION = "2.1"
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
  url?: string
}

export type PlayerLesson = Omit<CurriculumLesson, "status"> & {
  status: CurriculumStatus
  slug: string
  objective: string
  estimatedTime: string
  verification: LessonVerification
  referenceVersion: string
  lastReviewed?: string
  optional?: boolean
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

const coreDownload: CurriculumSource = {
  label: "Bitcoin Core 31.1 — službeni download i verifikacija",
  url: "https://bitcoincore.org/en/download/",
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

const bip39Editorial: CurriculumSource = {
  label: "Zašto je BIP39 učinio pogrešnu stvar čitljivom ljudima",
  url: "/hr/bitcoin-core/bip39-made-the-wrong-thing-human-readable/",
}

const bip325: CurriculumSource = {
  label: "BIP 325 — Signet",
  url: "https://github.com/bitcoin/bips/blob/master/bip-0325.mediawiki",
}

const coreRandom: CurriculumSource = {
  label: "Bitcoin Core 31.1 — RNG implementacija",
  url: "https://github.com/bitcoin/bitcoin/blob/v31.1/src/random.cpp",
}

const coreKeyGeneration: CurriculumSource = {
  label: "Bitcoin Core 31.1 — generiranje privatnog ključa",
  url: "https://github.com/bitcoin/bitcoin/blob/v31.1/src/key.cpp#L162-L168",
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
    optional?: boolean
    lastReviewed?: string
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
    lastReviewed:
      (config.verification ??
        (legacy.status === "published" ? "verified" : "review-required")) ===
      "verified"
        ? (config.lastReviewed ?? LAST_TECHNICAL_REVIEW)
        : undefined,
    reviewNote: config.reviewNote,
    sources: config.sources ?? legacy.sources,
    explanation: config.explanation,
    callouts: config.callouts,
    origin: config.origin ?? `Premješteno iz starog modula ${id.split(".")[0]}`,
    optional: config.optional,
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
  codeBlocks?: CurriculumCodeBlock[]
  callouts?: LessonCallout[]
  walkthrough?: PlayerLesson["walkthrough"]
  origin?: string
  optional?: boolean
  lastReviewed?: string
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
    lastReviewed:
      (config.verification ?? "review-required") === "verified"
        ? (config.lastReviewed ?? LAST_TECHNICAL_REVIEW)
        : undefined,
    reviewNote: config.reviewNote,
    explanation: config.explanation,
    concepts: config.concepts,
    warnings: config.warnings,
    checklist: config.checklist,
    sources: config.sources,
    codeBlocks: config.codeBlocks,
    callouts: config.callouts,
    walkthrough: config.walkthrough,
    videoUrl: null,
    origin: config.origin ?? "Nova lekcija u curriculum v2",
    optional: config.optional,
  }
}

const standardReviewNote =
  "Operativni koraci i screenshotovi moraju se ponovno reproducirati na navedenoj verziji prije nego što lekcija postane objavljena."

const curriculumPhasesV2: CurriculumPhase[] = [
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
    title: "Zašto ovaj kurikulum ostaje uz Bitcoin Core?",
    summary:
      "Produkcijski put koristi jedan provjerljiv stack: Bitcoin Core za validaciju, wallet, potpisivanje, backup i recovery.",
    outcome:
      "Razumjet ćeš zašto su Sparrow, Electrum, hardware walleti i BIP39 usporedne točke, a ne dijelovi produkcijske arhitekture koju podučavamo.",
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
          "Koristiti Sparrow samo kao usporedbu za kompleksnost coordinatora, bez uvođenja u produkcijsku arhitekturu ovog kurikuluma.",
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
          "Koristiti Electrum samo kao usporedbu za tradeoffove lightweight walleta i mnemonica, bez dodavanja u preporučeni stack.",
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
          "Objasniti dodatne ovisnosti komercijalnih hardware walleta i zašto ovaj kurikulum umjesto njih koristi namjensko generičko računalo s Bitcoin Coreom.",
        sources: [hwi],
      }),
      retainLesson("1.4", {
        slug: "bip39-kriptografija-i-backup-model",
        objective:
          "Odvojiti kvalitetu BIP39 entropije od ljudski čitljivog bearer-secret recovery modela i objasniti zašto se u ovom Core workflowu ne stvara mnemonic.",
        referenceVersion: "BIP 39",
        sources: [bip39],
        callouts: [
          {
            kind: "important",
            title: "Prigovor je operativan, a ne vezan uz entropiju",
            body: "Sigurno generiran BIP39 mnemonic može sadržavati snažnu entropiju. Ovaj kurikulum izbjegava prenosivi, ljudski čitljiv bearer-secret recovery model i operativne ovisnosti koje uvodi.",
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

const v2Lessons = new Map(
  curriculumPhasesV2.flatMap((phase) =>
    phase.lessons.map((lesson) => [lesson.id, lesson] as const)
  )
)

function reuseV2Lesson(
  id: string,
  overrides: Partial<PlayerLesson> = {}
): PlayerLesson {
  const lesson = v2Lessons.get(id)
  if (!lesson) throw new Error(`Nedostaje v2 lekcija ${id}`)
  return { ...lesson, ...overrides }
}

const newBackupAfterEncryption = outlineLesson({
  id: "signet-encrypt-new-backup",
  slug: "enkriptiraj-signet-wallet-i-napravi-novi-backup",
  title: "Enkriptiraj wallet i napravi novi backup",
  summary:
    "Enkripcija mijenja wallet stanje: stari backup više nije recovery artefakt na koji se želiš osloniti za nove primitke.",
  objective:
    "Enkriptirati očito testni wallet, odmah izraditi novi backup i objasniti zašto redoslijed koraka nije proizvoljan.",
  status: "published",
  verification: "verified",
  referenceVersion: CORE_REFERENCE_VERSION,
  estimatedTime: "15–20 min",
  explanation: [
    "Wallet enkripcija štiti privatne ključeve u wallet datoteci, ali uvodi passphrase koji se ne može resetirati ako ga izgubiš. Ne štiti od keyloggera na kompromitiranom računalu i ne skriva sve javne wallet podatke.",
    "Bitcoin Core 31.1 nakon enkripcije prazni keypool i generira novi HD seed. Zato backup napravljen prije enkripcije ne može obnoviti bitcoine primljene na ključeve izvedene iz novog seeda. Novi backup nije administrativna urednost, nego novi recovery temelj.",
  ],
  walkthrough: {
    title: "Create → encrypt → novi backup",
    intro:
      "Koristi isključivo `signet-training-wallet` i testni passphrase koji se nigdje drugdje ne koristi.",
    steps: [
      "Potvrdi da je aktivni chain `signet` i da je učitan `signet-training-wallet`.",
      "Enkriptiraj wallet testnim passphraseom.",
      "Pročitaj Coreovu poruku o ispražnjenom keypoolu, novom HD seedu i obaveznom novom backupu.",
      "Odmah napravi novi backup kroz `backupwallet` ili odgovarajuću GUI akciju.",
      "Označi backup mrežom, walletom, datumom i verzijom Corea — bez zapisivanja passphrasea na isti artefakt.",
    ],
  },
  codeBlocks: [
    {
      id: "signet-encrypt-wallet",
      title: "Enkriptiraj testni wallet",
      code: 'bitcoin-cli -signet -rpcwallet="signet-training-wallet" encryptwallet "UNESI-TESTNI-PASSPHRASE"',
      explanation:
        "Literal iz primjera nije passphrase. U vježbi koristi zaseban testni passphrase koji nikada neće štititi stvarna sredstva.",
      warning:
        "Nakon ovog koraka nemoj nastaviti s receive adresama dok ne napraviš novi backup.",
    },
    {
      id: "signet-backup-after-encryption",
      title: "Napravi novi backup nakon enkripcije",
      code: 'bitcoin-cli -signet -rpcwallet="signet-training-wallet" backupwallet "/SIGURNA-PUTANJA/signet-training-after-encryption.dat"',
      explanation:
        "Koristi ugrađeni `backupwallet` kako bi Core pripremio i zaključao wallet u sigurnom stanju za kopiranje.",
    },
  ],
  callouts: [
    {
      kind: "warning",
      title: "Nakon enkripcije napravi novi backup",
      body: "Core 31.1 nakon enkripcije prazni keypool i stvara novi HD seed. Sredstva primljena na ključeve novog seeda ne mogu se vratiti iz starog, pre-encryption backupa. Isto pravilo dokumentacija navodi nakon promjene wallet passphrasea; nakon migracije legacy walleta također treba backupirati sve nastale wallete.",
    },
    {
      kind: "important",
      title: "Enkripcija nije potpuna privatnost",
      body: "Enkriptiraju se privatni ključevi. Transakcije, javni ključevi i drugi wallet podaci mogu ostati vidljivi osobi koja dođe do datoteke.",
    },
  ],
  checklist: [
    "Wallet je očito testni i radi na Signetu",
    "Wallet je enkriptiran testnim passphraseom",
    "Novi backup napravljen je nakon enkripcije",
    "Mogu objasniti zašto stari backup nije dovoljan za novi seed",
  ],
  sources: [managingWallets, coreFiles],
  origin: "Novi praktični milestone u curriculum v2.1",
})

const entropyDeepDive = outlineLesson({
  id: "signet-entropy-deep-dive",
  slug: "odakle-dolazi-privatni-kljuc",
  title: "Odakle dolazi privatni ključ?",
  summary:
    "Dobar key-generation flow uklanja čovjeka iz posla stvaranja nasumičnosti.",
  objective:
    "Objasniti entropiju, OS CSPRNG i Bitcoin Core RNG na visokoj razini bez ručnog 'poboljšavanja' procesa.",
  status: "published",
  verification: "verified",
  referenceVersion: CORE_REFERENCE_VERSION,
  estimatedTime: "12–18 min",
  optional: true,
  explanation: [
    "Entropija je nepredvidljivost iz koje nastaje tajni broj. Čovjek je loš generator takve nepredvidljivosti: obrasci, omiljene riječi, tipkovničke putanje i pokušaji da nešto izgleda slučajno često su predvidljivi.",
    "Bitcoin Core pri stvaranju ključa poziva svoj jaki RNG. U Coreu 31.1 taj se tok oslanja na kriptografski generator operacijskog sustava, interno stanje RNG-a i dodatne izvore koje Core miješa i pojačava prije nego što dobivene bajtove provjeri kao valjani secp256k1 privatni ključ.",
    "Korisnikov posao nije smišljati riječi, bacati nekoliko nasumičnih znakova u input ili dodavati 'kreativnost'. Korisnikov posao je koristiti provjeren software na zdravom sustavu i zatim zaštititi nastali recovery model.",
  ],
  concepts: [
    "OS CSPRNG je sustavski izvor kriptografski prikladne nasumičnosti.",
    "Coreov `GetStrongRandBytes` pri svakom pozivu miješa svježu OS nasumičnost s internim stanjem i drugim izvorima.",
    "`CKey::MakeNewKey` ponavlja generiranje dok dobiveni 32-bajtni broj nije valjan secp256k1 privatni ključ.",
  ],
  callouts: [
    {
      kind: "mental-model",
      title: "Ne pomaži RNG-u intuicijom",
      body: "Ako software već koristi kvalitetan CSPRNG, ručno biranje 'nasumičnih' riječi ili znakova najčešće uvodi predvidljivost, a ne dodatnu sigurnost.",
    },
  ],
  checklist: [
    "Mogu objasniti zašto čovjek nije dobar RNG",
    "Razlikujem generiranje ključa od kasnijeg backupa",
    "Neću ručno smišljati seed riječi ili privatni ključ",
  ],
  sources: [coreRandom, coreKeyGeneration, coreRepository],
  origin: "Vraćena i proširena tema iz starog curriculuma",
})

const backupFreshnessLesson = outlineLesson({
  id: "backup-redundancy-freshness",
  slug: "vise-kopija-nije-isto-sto-i-noviji-backup",
  title: "Više kopija nije isto što i noviji backup",
  summary:
    "Redundancija odgovara na pitanje koliko kvarova možeš preživjeti; freshness odgovara imaš li pravu verziju wallet stanja.",
  objective:
    "Razlikovati broj kopija od trenutka nakon kojeg Core izričito traži novi backup.",
  status: "published",
  verification: "verified",
  referenceVersion: CORE_REFERENCE_VERSION,
  estimatedTime: "12–16 min",
  explanation: [
    "Redundancija znači više pouzdanih kopija na različitim medijima ili lokacijama. Ona štiti od gubitka uređaja, kvara medija, požara, krađe ili nedostupnosti jedne lokacije.",
    "Freshness znači da backup odgovara aktualnom recovery stanju. Za moderni HD wallet nije potreban novi backup nakon svake receive adrese samo kako bi privatni ključevi ostali izvedivi. Ipak, Core 31.1 traži novi backup odmah nakon enkripcije ili promjene passphrasea, a novi backup svih nastalih walleta i nakon migracije legacy walleta.",
    "Noviji backup čuva i novije metapodatke, primjerice labele. Ti podaci ne mogu se rekonstruirati običnim blockchain rescanom, pa stari backup može vratiti sredstva, ali izgubiti važan operativni kontekst.",
  ],
  callouts: [
    {
      kind: "important",
      title: "Dvije odvojene provjere",
      body: "Pitaj: imam li dovoljno neovisnih kopija — i jesu li te kopije verzija walleta koju sada trebam vratiti? Tri zastarjele kopije nisu svjež backup.",
    },
  ],
  concepts: [
    "Redundancija: broj, mediji, lokacije i failure modeovi.",
    "Freshness: je li se nakon backupa dogodila operacija koja traži novu verziju.",
    "Metadata freshness: labele i drugi wallet podaci mogu biti noviji od posljednje kopije.",
  ],
  checklist: [
    "Znam koliko neovisnih kopija želim održavati",
    "Znam kada enkripcija i promjena passphrasea traže novi backup",
    "Nakon migracije backupirat ću svaki nastali wallet",
    "U recovery drillu provjeravam i metadata state, ne samo balance",
  ],
  sources: [managingWallets, coreFiles],
  origin: "Novi backup mentalni model u curriculum v2.1",
})

const cloudPrivacyLesson = outlineLesson({
  id: "encrypted-backup-privacy",
  slug: "digitalni-i-cloud-backup-privacy-model",
  title: "Digitalni i cloud backup: privacy model",
  summary:
    "Enkripcija može otežati krađu privatnih ključeva, ali ne pretvara wallet backup u datoteku bez privatnosnog rizika.",
  objective:
    "Procijeniti digitalni ili cloud backup kroz krađu sredstava, curenje javnih wallet podataka i sigurnost passphrasea.",
  status: "published",
  verification: "verified",
  referenceVersion: CORE_REFERENCE_VERSION,
  estimatedTime: "10–14 min",
  explanation: [
    "Bitcoin Core wallet enkripcija prvenstveno štiti privatne ključeve. Dokumentacija izričito navodi da transakcije, javni ključevi i drugi wallet podaci nisu nužno skriveni.",
    "Napadač koji dođe do enkriptiranog backupa možda ne može odmah potrošiti sredstva, ali može dobiti public wallet metadata, povezati adrese i transakcije ili naučiti nešto o financijskoj aktivnosti. Slab ili ponovno korišten passphrase dodatno smanjuje zaštitu.",
    "Cloud je zato tradeoff: može pomoći redundanciji i dostupnosti, ali dodaje treću stranu, online exposure i privacy leak u threat model. Nije univerzalna preporuka.",
  ],
  callouts: [
    {
      kind: "warning",
      title: "Enkriptirano ne znači privatno",
      body: "Odvojeno procijeni može li napadač potrošiti sredstva, što može vidjeti o walletu i koliko je siguran passphrase. Tek tada odluči je li online pohrana prihvatljiva za tvoj threat model.",
    },
  ],
  checklist: [
    "Razlikujem rizik krađe ključeva od privacy leaka",
    "Cloud backup ne tretiram kao univerzalni best practice",
    "Wallet backup i njegov passphrase nisu pohranjeni u istom trust domainu",
  ],
  sources: [managingWallets, coreFiles],
  origin: "Novi privacy sloj backup modela u curriculum v2.1",
})

const signetReadinessChecklist = [
  "Kreirao sam `signet-training-wallet`",
  "Enkriptirao sam wallet testnim passphraseom",
  "Napravio sam novi backup nakon enkripcije",
  "Primio sam Signet coinove",
  "Poslao sam Signet transakciju",
  "Razumijem fee i change barem na osnovnoj razini",
  "Namjerno sam uklonio aktivni testni wallet iz kontroliranog okruženja",
  "Restorirao sam wallet iz novog backupa",
  "Unlockao sam wallet ispravnim testnim passphraseom",
  "Provjerio sam očekivane adrese i wallet state",
  "Nakon recoveryja ponovno sam potpisao i poslao Signet transakciju",
]

const curriculumPhasesV21Draft: CurriculumPhase[] = [
  {
    id: "0",
    slug: "razumij-self-custody",
    shortTitle: "Razumij self-custody",
    title: "Razumij što zapravo štitiš",
    summary:
      "Ključevi su početak; threat model, provjera i recovery čine sustav.",
    outcome:
      "Moći ćeš imenovati komponente custody sustava i rizik koji svaka zaštita pokušava smanjiti.",
    status: "published",
    estimatedTime: "25–35 min",
    lessons: [
      reuseV2Lesson("0.1"),
      reuseV2Lesson("0.2"),
      reuseV2Lesson("0.3", { optional: true }),
    ],
  },
  {
    id: "1",
    slug: "bitcoin-core-mentalni-model",
    shortTitle: "Zašto samo Bitcoin Core",
    title: "Zašto ovaj kurikulum ostaje uz Bitcoin Core",
    summary:
      "Fokusiran mentalni model za izgradnju, testiranje i oporavak jednog koherentnog Bitcoin Core self-custody sustava.",
    outcome:
      "Razumjet ćeš zašto svaka produkcijska uloga u ovom kurikulumu ostaje unutar Bitcoin Corea — i zašto su drugi sposobni alati namjerno izostavljeni.",
    status: "published",
    estimatedTime: "25 min + deep dives",
    lessons: [
      reuseV2Lesson("1.5", {
        title: "Zašto ovaj kurikulum ostaje uz Bitcoin Core",
        summary:
          "Jedna implementacija, jedan descriptor model, jedan backup model i jedan jezik recoveryja smanjuju nepotrebne prijelaze između alata.",
        objective:
          "Objasniti zašto Bitcoin Core-only produkcijski stack čini custody arhitekturu lakšom za razumijevanje i uvježbavanje.",
        explanation: [
          "Ovaj kurikulum ne koristi Bitcoin Core kao oznaku identiteta. Koristi ga zato što node, online watch-only wallet, offline signer, descriptori, PSBT workflow, backup i recovery mogu ostati unutar jedne provjerljive implementacije.",
          "Ta dosljednost je važna. Svaki dodatni produkcijski wallet uvodi novi release proces, format datoteka, recovery konvencije i skup pretpostavki. Sposobne alternative mogu biti korisne drugdje, ali nisu potrebne za sustav koji se ovdje podučava.",
          "Preporučeni stack zato je izričit: Bitcoin Core na čistoj Linux instalaciji, Fedora kao praktičan primjer i KeePassXC za generiranje snažnog nasumičnog passphrasea. Za značajnu štednju snažnija arhitektura odvaja offline Core signer od zasebnog online Core nodea.",
        ],
        callouts: [
          {
            kind: "mental-model",
            title: "Core-only je arhitektonska granica.",
            body: "Validacija, descriptori, PSBT-ovi, potpisivanje, wallet backup i recovery ostaju u jednom dokumentiranom sustavu. To nije tvrdnja da su svi drugi walleti nesposobni.",
          },
        ],
        checklist: [
          "Mogu objasniti zašto ovaj kurikulum od početka do kraja koristi jednu wallet implementaciju.",
          "Poznajem preporučeni softverski stack i ulogu svake komponente.",
          "Razumijem da jednostavniji tooling ne uklanja malware, fizički ni ljudski rizik.",
        ],
      }),
      reuseV2Lesson("2.1"),
      reuseV2Lesson("own-node"),
      reuseV2Lesson("core-development", { optional: true }),
      reuseV2Lesson("1.2", {
        optional: true,
        title: "Zašto Sparrow nije dio produkcijskog stacka",
        summary:
          "Sparrow je sposoban alat za PSBT-ove, descriptore, watch-only wallete i hardware signere, ali ovdje nijedna od tih funkcija ne zahtijeva Sparrow.",
        objective:
          "Prepoznati Sparrowove prednosti bez unošenja privatnih ključeva i recovery artefakata u drugu wallet implementaciju.",
        explanation: [
          "Sparrow može koordinirati PSBT-ove, descriptore, watch-only wallete, multisig pravila i hardware signere. To su stvarne sposobnosti, a ne nedostaci.",
          "Bitcoin Core već pruža PSBT, descriptor, watch-only, signing i recovery funkcije koje ovaj kurikulum koristi. Dodavanje Sparrowa stvorilo bi još jednu produkcijsku ovisnost i još jedno sučelje koje treba razumjeti, bez rješavanja zahtjeva koji nedostaje.",
          "Sparrow se zato može proučavati kao opcionalna usporedba, ali se ne koristi za stvaranje produkcijskih privatnih ključeva, pohranu recovery materijala, koordinaciju preporučene arhitekture ni restore walleta iz ovog kurikuluma.",
        ],
        warnings: [
          "Za potrebe ovog kurikuluma nemoj prenositi stvarni privatni ključ ni recovery secret u Sparrow.",
        ],
        checklist: [
          "Mogu navesti korisne Sparrowove koordinacijske funkcije.",
          "Razumijem zašto te funkcije ne zahtijevaju dodavanje Sparrowa ovom sustavu.",
          "Produkcijske ključeve i recovery zadržat ću unutar dokumentiranog Bitcoin Core workflowa.",
        ],
      }),
      reuseV2Lesson("1.3", {
        optional: true,
        title: "Zašto Electrum nije dio produkcijskog stacka",
        summary:
          "Electrum je zreo wallet s vlastitim server, mnemonic, enkripcijskim i recovery modelom — drugim sustavom od onoga koji se ovdje podučava.",
        objective:
          "Razumjeti zašto su Electrumova zasebna implementacija i recovery pravila nepotrebne ovisnosti u ovoj Core-only arhitekturi.",
        explanation: [
          "Electrum je sposoban lightweight wallet. Koristi drugu implementaciju, podatke o blockchainu dobiva kroz Electrum server model i ima vlastita mnemonic i wallet-encryption pravila.",
          "Te razlike su legitimne dizajnerske odluke, ali uvode drugi jezik recoveryja i drugi skup operativnih pretpostavki. Ovaj kurikulum ih ne miješa u produkcijski Bitcoin Core sustav.",
          "Electrum se može proučavati usporedno. U preporučenoj arhitekturi ne koristi se za produkcijsko generiranje ključeva, potpisivanje, backup ni recovery.",
        ],
        checklist: [
          "Razumijem da Electrum seed i BIP39 mnemonic nisu međusobno zamjenjive pretpostavke.",
          "Znam zašto zaseban server i recovery model ovdje nepotrebno šire opseg.",
          "Electrum neću koristiti kao prečac za recovery ovog Core walleta.",
        ],
      }),
      reuseV2Lesson("1.1", {
        optional: true,
        title: "Izolirano potpisivanje bez komercijalnog hardware walleta",
        summary:
          "Korisno svojstvo je držati signing ključeve izvan mreže; uređaj određenog proizvođača samo je jedna moguća izvedba, a ne uvjet.",
        objective:
          "Odvojiti sigurnosnu korist izoliranog potpisivanja od novih ovisnosti koje uvode specijalizirani hardware walleti.",
        explanation: [
          "Hardware wallet može izolirati signing ključeve i olakšati self-custody. To je korisno svojstvo, ali ne zahtijeva komercijalan uređaj.",
          "Namjensko generičko računalo s čistom Linux instalacijom i Bitcoin Coreom može služiti kao offline signer. Zaseban online Bitcoin Core node priprema PSBT-ove i broadcasta potpisane transakcije, dok privatni ključevi ostaju na offline računalu.",
          "Komercijalni hardware uvodi specijaliziranu metu, firmware i supply-chain pretpostavke, attestation uređaja, sigurnosne prakse proizvođača, vendor-specific recovery putove i čestu vezu s mnemonic backupom. Nijedna od tih ovisnosti nije potrebna za arhitekturu koja se ovdje podučava.",
        ],
        callouts: [
          {
            kind: "important",
            title: "Preporučeno za značajnu štednju",
            body: "Koristi namjenski generički hardware, čisti Linux, Bitcoin Core kao offline signer i zaseban online Bitcoin Core node. Ovaj kurikulum ne koristi komercijalni hardware wallet.",
          },
        ],
        checklist: [
          "Mogu objasniti korist izoliranog potpisivanja bez navođenja proizvoda.",
          "Mogu prepoznati dodatne trust pretpostavke koje uvodi specijalizirani hardware.",
          "Razumijem preporučenu Bitcoin Core arhitekturu s dva računala.",
        ],
      }),
      reuseV2Lesson("1.4", {
        optional: true,
        title: "Zašto ovaj kurikulum ne koristi BIP39 mnemoniku",
        summary:
          "Prigovor nije slaba entropija, nego pretvaranje prenosivog root bearer secreta walleta u riječi namijenjene ljudskom prepisivanju i rukovanju.",
        objective:
          "Razlikovati determinističko izvođenje ključeva od BIP39 recovery workflowa i objasniti zašto ovaj kurikulum recovery zadržava u enkriptiranom Core wallet backupu.",
        explanation: [
          "BIP32 opisuje determinističko izvođenje: mnogo ključeva može se izvesti iz internog seed materijala. BIP39 dodaje prenosivu, čovjeku čitljivu mnemonic reprezentaciju koja može ponovno stvoriti root secret walleta. Ideje su povezane, ali nisu isti zahtjev.",
          "Bitcoin Core descriptor walleti također interno koriste deterministički seed materijal. Core taj root ne prikazuje kao BIP39 word backup. Recovery artefakt u ovom kurikulumu je Bitcoin Core wallet backup, koji čuva i descriptore, labele te druge wallet metapodatke.",
          "Preporučeno odvajanje je enkriptirani wallet backup i snažan passphrase pohranjen u drugom trust domainu. Passphrase sam ne može ponovno stvoriti wallet. Enkriptirani backup ne bi trebao omogućiti spending bez passphrasea. Backup također čuva operativne metapodatke koje mnemonic sam po sebi ne nosi.",
          "Zato za wallet iz ovog kurikuluma nemoj generirati, gravirati, prepisivati ni čuvati BIP39 mnemoniku.",
        ],
        warnings: [
          "Nemoj stvarati BIP39 mnemonic kao dodatni backup za ovaj Bitcoin Core wallet.",
        ],
        callouts: [
          {
            kind: "warning",
            title: "Pogrešna stvar postala je čovjeku čitljiva",
            body: "BIP39 mnemonic je prenosivi bearer secret. Tko ga dobije, obično može ponovno stvoriti wallet. Prije prihvaćanja mnemonic recoveryja pročitaj cijeli argument.",
            url: bip39Editorial.url,
          },
        ],
        concepts: [
          "BIP32 determinističko izvođenje ne zahtijeva user-facing BIP39 mnemonic.",
          "Bitcoin Core deterministički seed materijal zadržava unutar walleta.",
          "Enkriptirani wallet backup i passphrase dvije su odvojene recovery komponente.",
          "Wallet backup čuva descriptore i metapodatke koje same riječi ne kodiraju.",
        ],
        checklist: [
          "Mogu razlikovati BIP32 izvođenje od BIP39 mnemonic recoveryja.",
          "Za ovaj wallet neću stvarati ni čuvati BIP39 mnemonic.",
          "Enkriptirani Core backup i njegov passphrase držat ću odvojeno.",
        ],
        sources: [bip39Editorial, bip39, managingWallets],
      }),
    ],
  },
  {
    id: "2",
    slug: "signet-training-cycle",
    shortTitle: "Signet training cycle",
    title: "Vježbaj cijeli ciklus bez stvarnog novca",
    summary:
      "Create → encrypt → backup → transact → destroy → restore → transact again.",
    outcome:
      "Napravit ćeš wallet, enkriptirati ga, backupirati, koristiti, ukloniti, restorirati i ponovno koristiti na Signetu.",
    status: "in-progress",
    estimatedTime: "2–3 h",
    lessons: [
      reuseV2Lesson("signet-why"),
      reuseV2Lesson("signet-vs-mainnet"),
      outlineLesson({
        id: "signet-install-verify",
        slug: "instaliraj-i-provjeri-bitcoin-core",
        title: "Instaliraj i provjeri Bitcoin Core",
        summary: "Službeni paket, checksum i potpis dolaze prije walleta.",
        objective:
          "Preuzeti Core iz službenog izvora i provjeriti paket prije pokretanja.",
        status: "published",
        verification: "verified",
        referenceVersion: CORE_REFERENCE_VERSION,
        estimatedTime: "15–25 min",
        explanation: [
          "Provjera paketa ne dokazuje da je cijelo računalo zdravo, ali uklanja važnu klasu pogreške: pokretanje binarija koji nije onaj koji je projekt objavio.",
          "Točne datoteke, hash vrijednosti i potpisnici mijenjaju se s izdanjem. Zato ova lekcija vodi na aktualnu službenu download stranicu umjesto hardcodeanog hasha u tekstu.",
        ],
        walkthrough: {
          title: "Službeni paket prije walleta",
          steps: [
            "Potvrdi da preuzimaš Bitcoin Core sa službene bitcoincore.org stranice.",
            "Odaberi paket za svoj operacijski sustav i arhitekturu.",
            "Preuzmi aktualni `SHA256SUMS` i pripadajuće potpise.",
            "Usporedi lokalni SHA-256 paketa sa službenim popisom.",
            "Provjeri potpise prema službenim uputama prije instalacije.",
          ],
        },
        checklist: [
          "Verzija i platforma paketa odgovaraju mojem uređaju",
          "SHA-256 odgovara službenom popisu",
          "Razumijem što checksum provjerava, a što ne provjerava",
        ],
        sources: [coreDownload, coreRelease],
        origin: "Provjereno na službenom Core 31.1 arm64 macOS paketu",
      }),
      reuseV2Lesson("signet-start", {
        status: "published",
        verification: "verified",
        lastReviewed: LAST_TECHNICAL_REVIEW,
        explanation: [
          "Signet ima zaseban chain context i zaseban poddirektorij podataka. To smanjuje rizik da testne radnje pomiješaš s mainnet walletom, ali naziv walleta i dalje treba biti očito testni.",
        ],
        walkthrough: {
          title: "Pokreni odvojeni Signet context",
          steps: [
            "Pokreni Bitcoin Core s `-signet` ili odaberi Signet prije wallet operacija.",
            "Provjeri `getblockchaininfo` i potvrdi da polje `chain` kaže `signet`.",
            "Zabilježi da Signet koristi odvojeni `signet/` poddirektorij unutar odabranog data directoryja.",
          ],
        },
        codeBlocks: [
          {
            id: "verify-signet-chain",
            title: "Provjeri aktivnu mrežu",
            code: "bitcoin-cli -signet getblockchaininfo",
            explanation:
              'Prije svake praktične vježbe provjeri da izlaz sadrži `"chain": "signet"`.',
          },
        ],
        sources: [bip325, coreFiles],
      }),
      reuseV2Lesson("signet-first-wallet", {
        status: "published",
        verification: "verified",
        lastReviewed: LAST_TECHNICAL_REVIEW,
        title: "Kreiraj prvi Signet training wallet",
        summary:
          "Kreiraj očito testni descriptor wallet, provjeri njegovo stanje i zaustavi se prije prve receive adrese.",
        objective:
          "Kreirati očito testni descriptor wallet bez ikakvog miješanja s budućim mainnet setupom.",
        explanation: [
          "Naziv `signet-training-wallet` namjerno opisuje mrežu i svrhu. Ovaj wallet postoji samo za trening i nikada se ne pretvara u mainnet wallet.",
        ],
        walkthrough: {
          title: "Kreiraj očito testni wallet",
          steps: [
            "Još jednom potvrdi da je chain `signet`.",
            "Kreiraj wallet naziva `signet-training-wallet`.",
            "Provjeri `getwalletinfo`: descriptor wallet, private keys enabled i format koji prijavljuje aktualna verzija.",
            "Ne generiraj receive adresu prije lekcije o enkripciji i novom backupu.",
          ],
        },
        codeBlocks: [
          {
            id: "create-signet-training-wallet",
            title: "Kreiraj Signet training wallet",
            code: 'bitcoin-cli -signet createwallet "signet-training-wallet"',
            explanation:
              "Očito testno ime smanjuje mogućnost zamjene mreže i recovery artefakata.",
          },
        ],
        callouts: [
          {
            kind: "warning",
            title: "Ne pretvaraj Signet wallet u mainnet wallet",
            body: "Mainnet dobiva novi network context, novi wallet i nove recovery artefakte. Signet služi učenju procedure, ne kasnijoj prenamjeni.",
          },
        ],
        sources: [managingWallets, coreFiles],
      }),
      newBackupAfterEncryption,
      entropyDeepDive,
      reuseV2Lesson("signet-receive-send", {
        title: "Receive, send, fee i change na Signetu",
        summary:
          "Nakon novog backupa primi testne coinove, pošalji transakciju i pregledaj destination, amount, fee i change.",
        objective:
          "Dovršiti transakcijski dio trening ciklusa bez stvarne vrijednosti.",
        reviewNote:
          "Faucet i aktualni send/coin-selection flow treba reproducirati na Coreu 31.1 prije oznake Testirano na.",
      }),
      reuseV2Lesson("signet-restore", {
        status: "published",
        verification: "verified",
        lastReviewed: LAST_TECHNICAL_REVIEW,
        title: "Ukloni aktivni wallet, restoreaj i unlockaj",
        summary:
          "Kontrolirano ukloni učitani testni wallet, vrati ga iz post-encryption backupa i provjeri passphrase i očekivani state.",
        objective:
          "Dokazati da novi backup nakon enkripcije vraća wallet koji možeš unlockati i provjeriti.",
        explanation: [
          "Destruktivna vježba radi se samo nad očito testnim Signet walletom. Prvo unload, zatim kontrolirano premještanje aktivnog wallet direktorija na privremenu lokaciju; tek nakon uspješnog restora odlučuješ o čišćenju.",
          "Nakon restora provjeri wallet format, descriptore, očekivane adrese i unlock testnim passphraseom. Balance sam po sebi nije dovoljan dokaz da je recovery dokumentiran i razumljiv.",
        ],
        walkthrough: {
          title: "Destroy → restore → unlock → verify",
          steps: [
            "Zapiši jednu ili više očekivanih Signet adresa i aktualni wallet state.",
            "Unloaduj `signet-training-wallet`.",
            "Premjesti njegov aktivni testni direktorij na kontroliranu privremenu lokaciju; ne diraj druge wallete ni node podatke.",
            "Restoreaj novi backup napravljen nakon enkripcije pod nazivom `signet-training-restored`.",
            "Unlockaj restored wallet testnim passphraseom.",
            "Provjeri očekivane adrese, descriptore i `getwalletinfo`.",
          ],
        },
        codeBlocks: [
          {
            id: "restore-signet-wallet",
            title: "Restoreaj novi backup",
            code: 'bitcoin-cli -signet restorewallet "signet-training-restored" "/SIGURNA-PUTANJA/signet-training-after-encryption.dat"',
            explanation:
              "Restore dobiva novo očito testno ime kako bi rezultat ostao odvojen od uklonjenog aktivnog walleta.",
          },
          {
            id: "unlock-restored-signet-wallet",
            title: "Privremeno unlockaj restored wallet",
            code: 'bitcoin-cli -signet -rpcwallet="signet-training-restored" walletpassphrase "UNESI-TESTNI-PASSPHRASE" 120',
            explanation:
              "Timeout ograničava koliko dugo decryption key ostaje u memoriji.",
          },
        ],
        sources: [managingWallets, coreFiles],
        origin:
          "Create/encrypt/backup/unload/restore/unlock flow reproduciran na Coreu 31.1",
      }),
      outlineLesson({
        id: "signet-transact-again",
        slug: "ponovno-poslaji-nakon-signet-recoveryja",
        title: "Ponovno pošalji nakon recoveryja",
        summary:
          "Recovery je dovršen tek kada restored wallet ponovno može autorizirati i poslati Signet transakciju.",
        objective:
          "Ponoviti pregled destinationa, amounta, feeja i changea nakon restora.",
        reviewNote:
          "Puni funded Signet send-after-restore treba reproducirati na Coreu 31.1 prije oznake Testirano na.",
        sources: [managingWallets, bip325],
      }),
      outlineLesson({
        id: "signet-readiness",
        slug: "mainnet-readiness-signet-checkpoint",
        title: "Mainnet readiness checkpoint",
        summary:
          "Soft gate prije ozbiljnog mainnet setupa: cijeli Signet ciklus moraš moći ponoviti bez nagađanja.",
        objective:
          "Iskreno potvrditi operativnu spremnost bez tehničkog zaključavanja sljedećih faza.",
        status: "published",
        verification: "verified",
        referenceVersion: CORE_REFERENCE_VERSION,
        estimatedTime: "5–10 min",
        explanation: [
          "Ovaj checkpoint ne otključava sadržaj i ne dodjeljuje certifikat. Samo odvaja pročitanu teoriju od postupka koji si doista izveo.",
          "Ako ovo još ne možeš ponoviti bez nagađanja, ostani na Signetu. Nema potrebe žuriti.",
        ],
        checklist: signetReadinessChecklist,
        callouts: [
          {
            kind: "mental-model",
            title: "Prvi veliki milestone",
            body: "Napravio sam wallet, enkriptirao ga, backupirao, koristio, namjerno uklonio, restorirao i ponovno koristio — bez stvarnog novca.",
          },
        ],
        sources: [managingWallets, bip325],
        origin: "Novi soft gate u curriculum v2.1",
      }),
    ],
  },
  {
    id: "3",
    slug: "node-bez-mitologije",
    shortTitle: "Node bez mitologije",
    title: "Minimalni node model prije mainneta",
    summary:
      "IBD, pruning i razlika nodea i walleta — bez mita o obaveznom velikom serveru.",
    outcome:
      "Znat ćeš što Core validira, što pruning briše i koji dio sustava stvarno treba tvojem setupu.",
    status: "in-progress",
    estimatedTime: "45–60 min",
    lessons: [
      reuseV2Lesson("2.2"),
      reuseV2Lesson("ibd-separation"),
      reuseV2Lesson("2.3"),
      reuseV2Lesson("core-not-server"),
      reuseV2Lesson("2.6", { optional: true }),
      reuseV2Lesson("node-migration", { optional: true }),
    ],
  },
  {
    id: "4",
    slug: "odaberi-custody-arhitekturu",
    shortTitle: "Dvije Core arhitekture",
    title: "Odaberi jednu od dvije Bitcoin Core arhitekture",
    summary:
      "Oba puta ostaju unutar Bitcoin Corea; razlika je u tome dijele li signing ključevi uređaj s mrežnom aktivnošću.",
    outcome:
      "Moći ćeš izabrati najmanju arhitekturu koja rješava tvoj stvarni failure mode.",
    status: "in-progress",
    estimatedTime: "45 min + praksa",
    lessons: [
      outlineLesson({
        id: "architecture-choice",
        slug: "jednostavni-wallet-ili-offline-signer",
        title: "Jednostavni wallet ili offline signer?",
        summary:
          "Operativna jednostavnost i izolacija signing ključeva rješavaju različite probleme.",
        objective:
          "Odabrati Path A ili Path B prema iznosu, namjeni, uređajima i vlastitoj sposobnosti održavanja.",
        status: "published",
        verification: "verified",
        referenceVersion: CORE_REFERENCE_VERSION,
        estimatedTime: "12–16 min",
        explanation: [
          "Path A je jednostavni online, enkriptirani Core wallet. Ograničen je na manje iznose, spending wallet ili situaciju u kojoj bi dodatni uređaji i transferi povećali vjerojatnost ljudske pogreške.",
          "Path B je online Core s watch-only walletom i odvojenim offline Core signerom. To je snažna preporuka za značajnu štednju jer rješava konkretan failure mode: kompromitaciju mrežno povezanog uređaja koji bi inače držao privatne ključeve.",
          "Path B nije automatski sigurniji za svakoga. Ako ne možeš održavati dva uređaja, descriptore, PSBT transport i recovery svake uloge, složenost može poništiti dio koristi.",
        ],
        callouts: [
          {
            kind: "mental-model",
            title: "Dva puta, jedan Bitcoin Core sustav",
            body: "Path A ograniči na iznose kod kojih je jednostavnost važnija od izolacije. Za značajnu štednju koristi Path B: zaseban online Core node i offline Core signer.",
          },
        ],
        checklist: [
          "Znam koji iznos i namjenu wallet treba podržati",
          "Mogu imenovati failure mode koji bi offline signer smanjio",
          "Ne biram dodatnu složenost samo zato što izgleda naprednije",
        ],
        sources: [offlineSigning, managingWallets],
        origin: "Novi arhitekturni checkpoint u curriculum v2.1",
      }),
      outlineLesson({
        id: "architecture-path-a",
        slug: "path-a-online-encrypted-core-wallet",
        title: "Path A — online enkriptirani Core wallet",
        summary:
          "Jedan uređaj, jasan backup i manji broj operativnih prijelaza.",
        objective:
          "Prepoznati kada jednostavniji hot wallet može biti sigurniji ukupni sustav.",
        status: "published",
        verification: "verified",
        referenceVersion: CORE_REFERENCE_VERSION,
        estimatedTime: "8–12 min",
        explanation: [
          "Path A drži privatne ključeve na mrežno povezanom uređaju. Enkripcija štiti ključeve u mirovanju, ali ne uklanja malware, keylogger ili kompromitaciju aktivnog sustava.",
          "Njegova prednost je manji broj komponenti, transporta i recovery artefakata. Za threat model u kojem operativna jednostavnost smanjuje ukupnu vjerojatnost pogreške, to je legitiman izbor.",
        ],
        sources: [managingWallets],
      }),
      reuseV2Lesson("2.4", {
        title: "Path B — online node i offline signer",
        explanation: [
          "Online host ima sinkronizirani node i watch-only wallet. Vidi stanje, prati primitke, priprema PSBT te finalizira i broadcasta potpisanu transakciju.",
          "Offline host ima wallet s privatnim ključevima, nema mrežu i ne treba kopiju blockchaina. Njegov posao je pregledati PSBT i potpisati ono s čime se korisnik slaže.",
        ],
        callouts: [
          {
            kind: "warning",
            title: "Javni podaci i dalje mogu biti osjetljivi",
            body: "Watch-only descriptori nisu privatni ključevi, ali mogu otkriti skup adresa, derivacije i financijske veze. Tretiraj ih kao privacy-sensitive podatke.",
          },
        ],
        sources: [offlineSigning, descriptors, psbt],
      }),
      reuseV2Lesson("2.5"),
      reuseV2Lesson("2.8", {
        explanation: [
          "Watch-only wallet koordinira i prati bez privatnih ključeva. Offline wallet potpisuje. PSBT prenosi transakciju i potrebne metapodatke između uloga.",
          "USB ili drugi transport nije automatski trusted samo zato što povezuje air-gapped sustav. Datoteke se pregledavaju, medij se kontrolira, a signer potvrđuje destination, amount, fee i change.",
        ],
        sources: [offlineSigning, descriptors, psbt],
      }),
      reuseV2Lesson("offline-device", {
        explanation: [
          "Primarni model je namjenska funkcija, verificirani software, minimalan attack surface i dokumentiran recovery. Praktičan signer može biti generičko računalo s čistom Linux instalacijom, minimalnim brojem aplikacija i trajno isključenom mrežom.",
          "Fedora Workstation praktičan je primjer za moderni hardware, a Fedora Xfce za skromnije računalo. Distribucija sama po sebi nije sigurnosni cilj: cilj je čist, provjerljiv i namjenski sustav koji pokreće Bitcoin Core samo za ključne operacije i potpisivanje.",
          "Zaseban online uređaj pokreće sinkronizirani Bitcoin Core node i watch-only wallet. Offline uređaj pokreće Bitcoin Core wallet s privatnim ključevima, pregledava PSBT i potpisuje samo provjerenu transakciju.",
        ],
        callouts: [
          {
            kind: "mental-model",
            title: "Dedicated funkcija prije brenda hardvera",
            body: "Važnije je da signer ima jednu jasnu ulogu, provjeren software i recovery plan nego da odgovara određenoj internet estetici hardeninga.",
          },
        ],
      }),
      reuseV2Lesson("offline-psbt"),
      reuseV2Lesson("offline-recovery"),
    ],
  },
  {
    id: "5",
    slug: "mainnet-odvojeni-setup",
    shortTitle: "Mainnet i mali test",
    title: "Novi mainnet setup i mali operativni test",
    summary:
      "Signet dokazuje proceduru; mali mainnet test dokazuje stvarni network i configuration setup.",
    outcome:
      "Odvojit ćeš mainnet wallet od treninga i testirati primitak i spend iznosom koji ti je očito ne-kritičan.",
    status: "in-progress",
    estimatedTime: "2–4 h",
    lessons: [
      outlineLesson({
        id: "mainnet-separate-wallet",
        slug: "ne-pretvaraj-signet-wallet-u-mainnet-wallet",
        title: "Ne pretvaraj Signet wallet u mainnet wallet",
        summary:
          "Mainnet je novi svjesni setup: drugi chain context, novi wallet i novi recovery artefakti.",
        objective:
          "Odvojiti naučenu proceduru od testnih ključeva, naziva i datoteka.",
        status: "published",
        verification: "verified",
        referenceVersion: CORE_REFERENCE_VERSION,
        estimatedTime: "6–10 min",
        explanation: [
          "Signet wallet služi učenju redoslijeda koraka. Mainnet setup ne nastaje promjenom zastavice ili prenamjenom testnog walleta, nego svjesnim stvaranjem novih ključeva i novog recovery sustava u odabranoj arhitekturi.",
          "Očito različiti nazivi, lokacije i dokumentacija smanjuju mogućnost da testni artefakt zamijeniš za stvarni ili obrnuto.",
        ],
        checklist: [
          "Signet i mainnet wallet imaju različita imena",
          "Mainnet dobiva nove ključeve i novi backup",
          "Testni passphrase nikada se ne koristi za stvarna sredstva",
        ],
        sources: [coreFiles, managingWallets, bip325],
      }),
      reuseV2Lesson("real-device"),
      reuseV2Lesson("real-encryption", {
        reviewNote:
          "Mainnet create/encrypt flow treba proći na odabranoj stvarnoj arhitekturi; novi backup nakon enkripcije obavezan je prema Core 31.1 dokumentaciji.",
        sources: [managingWallets],
      }),
      backupFreshnessLesson,
      cloudPrivacyLesson,
      reuseV2Lesson("real-restore"),
      outlineLesson({
        id: "mainnet-readiness",
        slug: "mainnet-readiness-prije-prvog-deposita",
        title: "Mainnet readiness prije prvog deposita",
        summary:
          "Novi wallet još ne prima ozbiljan iznos dok backup, passphrase, restore i odabrana arhitektura nisu jasni.",
        objective:
          "Potvrditi da isti proces možeš ponoviti i znaš zašto svaki korak postoji.",
        status: "published",
        verification: "verified",
        referenceVersion: CORE_REFERENCE_VERSION,
        estimatedTime: "8–12 min",
        explanation: [
          "Signet checkpoint dokazuje da poznaješ postupak. Ovaj checkpoint provjerava da novi mainnet wallet ima odvojene artefakte, da njegov backup odgovara stanju nakon enkripcije i da je arhitektura stvarno ona koju želiš održavati.",
          "Ako neki odgovor ovisi o nagađanju, vrati se korak unatrag. Mainnet sadržaj ostaje otvoren; soft gate služi odluci, ne prisili.",
        ],
        checklist: [
          "Završio sam puni Signet training cycle",
          "Mainnet wallet i recovery artefakti potpuno su odvojeni od Signeta",
          "Novi backup napravljen je nakon enkripcije",
          "Znam vraća li backup sve ključeve, labele i potrebne metapodatke",
          "Mogu objasniti zašto sam odabrao Path A ili Path B",
          "Recovery mogu izvesti bez originalnog aktivnog walleta",
        ],
        callouts: [
          {
            kind: "verify",
            title: "Rezultat koji tražimo",
            body: "Isti proces mogu ponoviti i znam zašto svaki korak postoji.",
          },
        ],
        sources: [managingWallets, offlineSigning],
        origin: "Novi mainnet soft gate u curriculum v2.1",
      }),
      outlineLesson({
        id: "mainnet-small-test",
        slug: "prvi-mali-mainnet-test",
        title: "Prvi mali mainnet test",
        summary:
          "Mali primitak i mali spend potvrđuju da je stvarni network i configuration setup ispravno složen.",
        objective:
          "Testirati cijeli mainnet operativni tok iznosom koji je korisniku očito ne-kritičan.",
        estimatedTime: "30–60 min + potvrde",
        walkthrough: {
          title: "Prvi stvarni, ali mali ciklus",
          steps: [
            "Provjeri da aktivni chain kaže `main` i da je učitan novi mainnet wallet.",
            "Generiraj receive adresu i provjeri je prema svojoj proceduri.",
            "Pošalji iznos koji ti je očito ne-kritičan; curriculum ne propisuje broj satsa ili eura.",
            "Provjeri primitak preko vlastitog nodea.",
            "Napravi mali spend i provjeri destination, amount, fee i change.",
            "Ponovno provjeri odgovara li backup/recovery plan aktualnom wallet stateu.",
            "Tek nakon toga razmišljaj o većem iznosu.",
          ],
        },
        callouts: [
          {
            kind: "mental-model",
            title: "Signet i mainnet dokazuju različite stvari",
            body: "Signet dokazuje postupak. Mali mainnet test dokazuje da je stvarni network i configuration setup ispravno složen.",
          },
        ],
        reviewNote:
          "Mainnet send/fee/change flow treba reproducirati na Coreu 31.1 i odabranoj arhitekturi prije oznake Testirano na.",
        sources: [managingWallets, psbt],
        origin: "Novi operativni test u curriculum v2.1",
      }),
    ],
  },
  {
    ...curriculumPhasesV2[6],
    id: "6",
    slug: "odrzavanje-kroz-vrijeme",
    shortTitle: "Održavanje",
    title: "Održavanje, recovery drill i nasljeđivanje",
  },
  curriculumPhasesV2[7],
  curriculumPhasesV2[8],
  curriculumPhasesV2[9],
]

const curriculumPhaseOrder = ["0", "1", "2", "4", "3", "5", "6", "7", "8", "9"]

export const curriculumPhases: CurriculumPhase[] = curriculumPhaseOrder.map(
  (originalId, index) => {
    const phase = curriculumPhasesV21Draft.find(
      (candidate) => candidate.id === originalId
    )
    if (!phase) throw new Error(`Nedostaje curriculum faza ${originalId}`)
    return { ...phase, id: String(index) }
  }
)

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

export function isAvailableLesson(lesson: PlayerLesson) {
  return lesson.status === "published" && lesson.verification === "verified"
}

export const primaryCurriculumLessons = curriculumLessons.filter(
  ({ lesson }) => isAvailableLesson(lesson) && !lesson.optional
)

export const curriculumSources = {
  bip39,
  bip325,
  coreDownload,
  coreFiles,
  coreKeyGeneration,
  coreRandom,
  coreRelease,
  descriptors,
  electrumDocs,
  managingWallets,
  offlineSigning,
  psbt,
  sparrowQuickStart,
}
