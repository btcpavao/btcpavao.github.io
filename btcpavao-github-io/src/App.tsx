import {
  createElement,
  type ReactNode,
  useEffect,
  useRef,
  useState,
} from "react"
import {
  ArrowUp,
  ArrowUpRight,
  BookOpen,
  CalendarDays,
  CircleCheckBig,
  Cpu,
  Dice5,
  GitBranch,
  KeyRound,
  Mail,
  Menu,
  MoonStar,
  ShieldCheck,
  Shuffle,
  SunMedium,
  TriangleAlert,
  X,
  type LucideIcon,
} from "lucide-react"

import { useTheme } from "@/components/theme-provider"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  longRoadVisuals,
  parseLongRoadArticle,
  renderLongRoadInline,
  type LongRoadArticleBlock,
} from "@/long-road-article"
import {
  AI_SERIES_PATH,
  ARTICLE_PATH,
  BITCOIN_CORE_ENTROPY_ARTICLE_PATH,
  BITCOIN_CORE_SERIES_PATH,
  EN_BITCOIN_CORE_ENTROPY_ARTICLE_PATH,
  EN_BITCOIN_CORE_SERIES_PATH,
  HR_HOME_PATH,
  LEARNING_ARTICLE_PATH,
  LONG_ROAD_BITCOIN_CORE_ARTICLE_PATH,
  normalizePath,
  WORKFLOW_ARTICLE_PATH,
} from "@/routes"

const SITE_URL = "https://btcpavao.com"
const CONTACT_EMAIL = "mailto:pavao@hey.com"
const HR_HOME_URL = `${SITE_URL}${HR_HOME_PATH}`
const HR_HOME_TITLE = "Hrvatski tekstovi"
const HR_HOME_DESCRIPTION =
  "Hrvatski tekstovi Pavaoa Pahljine o Bitcoinu, Bitcoin Coreu i praktičnoj primjeni umjetne inteligencije."
const AI_SERIES_URL = `${SITE_URL}${AI_SERIES_PATH}`
const AI_SERIES_TITLE = "AI u praksi"
const AI_SERIES_DESCRIPTION =
  "Osobne bilješke o tome kako koristim AI za pisanje, knjige, web stranice, agente, automatizaciju i svakodnevni rad."
const AI_SERIES_OG_DESCRIPTION =
  "Kako jedan generalist koristi AI da ideje pretvori u tekstove, knjige, web stranice i stvarne poslovne sustave."
const ARTICLE_URL = `${SITE_URL}${ARTICLE_PATH}`
const ARTICLE_TITLE = "Jedan čovjek, AI i dva mjeseca rada"
const ARTICLE_DESCRIPTION =
  "Osobni osvrt na to kako sam uz diktiranje, ChatGPT i Codex u manje od dva mjeseca dovršio knjigu, podigao web stranice i promijenio vlastiti način rada."
const ARTICLE_OG_DESCRIPTION =
  "Kako AI u praksi mijenja rad jednog generalista: od diktiranja u šetnji do knjige, web stranica, agenata i automatizacije."
const ARTICLE_DATE = "2026-06-12"
const ARTICLE_DISPLAY_DATE = "12. lipnja 2026."
const ARTICLE_HERO_IMAGE = "/ai-workflow-hero.webp"
const ARTICLE_HERO_IMAGE_SMALL = "/ai-workflow-hero-840.webp"
const WORKFLOW_ARTICLE_URL = `${SITE_URL}${WORKFLOW_ARTICLE_PATH}`
const WORKFLOW_ARTICLE_TITLE =
  "Moj AI workflow: od diktata do objavljene stranice"
const WORKFLOW_ARTICLE_DESCRIPTION =
  "Kako koristim diktiranje, transkripciju, ChatGPT i Codex da ideju pretvorim u članak, vodič, knjigu ili web stranicu."
const WORKFLOW_ARTICLE_OG_DESCRIPTION =
  "Praktičan prikaz procesa od ideje izgovorene u šetnji do sadržaja ili stranice spremne za objavu."
const WORKFLOW_ARTICLE_DATE = "2026-06-25"
const WORKFLOW_ARTICLE_DISPLAY_DATE = "25. lipnja 2026."
const LEARNING_ARTICLE_URL = `${SITE_URL}${LEARNING_ARTICLE_PATH}`
const LEARNING_ARTICLE_TITLE =
  "Kako sam uz AI naučio matematiku Bitcoinova dugoročnog trenda"
const LEARNING_ARTICLE_DESCRIPTION =
  "Kako sam uz AI korak po korak naučio matematiku Bitcoin Wave Modela, provjerio njegove granice i znanje pretvorio u graf i H-time kalkulator."
const LEARNING_ARTICLE_OG_DESCRIPTION =
  "Od PDF-a koji nisam razumio do javnog grafa i H-time kalkulatora: konkretan primjer AI-a kao učitelja, istraživača i alata za izgradnju."
const LEARNING_ARTICLE_DATE = "2026-07-17"
const LEARNING_ARTICLE_DISPLAY_DATE = "17. srpnja 2026."
const LEARNING_ARTICLE_HERO_IMAGE = "/ai-ucenje-bitcoin-model-hero.webp"
const LEARNING_ARTICLE_HERO_IMAGE_SMALL =
  "/ai-ucenje-bitcoin-model-hero-840.webp"
const BITCOIN_CORE_SERIES_URL = `${SITE_URL}${BITCOIN_CORE_SERIES_PATH}`
const BITCOIN_CORE_SERIES_TITLE = "Bitcoin Core"
const BITCOIN_CORE_SERIES_DESCRIPTION =
  "Hrvatski tekstovi o Bitcoin Coreu, walletima, validaciji i sigurnosnim temeljima Bitcoin sustava."
const BITCOIN_CORE_ARTICLE_URL = `${SITE_URL}${BITCOIN_CORE_ENTROPY_ARTICLE_PATH}`
const BITCOIN_CORE_ARTICLE_TITLE =
  "Kako Bitcoin Core generira entropiju kada napravimo novi wallet"
const BITCOIN_CORE_ARTICLE_SUBTITLE =
  "Zašto je to važno i zašto je Bitcoin Core toliko bitan"
const BITCOIN_CORE_ARTICLE_DESCRIPTION =
  "Kako Bitcoin Core prikuplja i kriptografski miješa entropiju, provjerava privatni ključ i iz njega gradi BIP32 wallet."
const BITCOIN_CORE_ARTICLE_DATE = "2026-08-05"
const BITCOIN_CORE_ARTICLE_DISPLAY_DATE = "5. kolovoza 2026."
const BITCOIN_CORE_ARTICLE_HERO_IMAGE = "/bitcoin-core-entropija-hero.webp"
const BITCOIN_CORE_ARTICLE_HERO_IMAGE_SMALL =
  "/bitcoin-core-entropija-hero-840.webp"
const EN_BITCOIN_CORE_SERIES_URL = `${SITE_URL}${EN_BITCOIN_CORE_SERIES_PATH}`
const EN_BITCOIN_CORE_SERIES_DESCRIPTION =
  "English essays about Bitcoin Core, wallets, validation, and the security foundations of the Bitcoin system."
const EN_BITCOIN_CORE_ARTICLE_URL = `${SITE_URL}${EN_BITCOIN_CORE_ENTROPY_ARTICLE_PATH}`
const EN_BITCOIN_CORE_ARTICLE_TITLE =
  "How Bitcoin Core Generates Entropy When You Create a New Wallet"
const EN_BITCOIN_CORE_ARTICLE_SUBTITLE =
  "Why It Matters and Why Bitcoin Core Is So Important"
const EN_BITCOIN_CORE_ARTICLE_DESCRIPTION =
  "How Bitcoin Core gathers and cryptographically mixes entropy, validates a private key, and builds a BIP32 wallet from it."
const EN_BITCOIN_CORE_ARTICLE_DISPLAY_DATE = "August 5, 2026"
const LONG_ROAD_ARTICLE_URL = `${SITE_URL}${LONG_ROAD_BITCOIN_CORE_ARTICLE_PATH}`
const LONG_ROAD_ARTICLE_TITLE = "The Long Road Back to Bitcoin Core"
const LONG_ROAD_ARTICLE_SUBTITLE =
  "How a hardware-wallet controversy, an entropy rabbit hole, and a few simple restore tests ended my search for the \u201cperfect\u201d Bitcoin wallet"
const LONG_ROAD_ARTICLE_DATE = "2026-08-05"
const LONG_ROAD_ARTICLE_DISPLAY_DATE = "August 5, 2026"
const LONG_ROAD_ARTICLE_OG_IMAGE = `${SITE_URL}/long-road-bitcoin-core-cover-share.jpg`
const LONG_ROAD_ARTICLE_HERO_IMAGE = "/long-road-bitcoin-core-cover.webp"
const LONG_ROAD_ARTICLE_HERO_IMAGE_SMALL =
  "/long-road-bitcoin-core-cover-840.webp"
const BOOK_SECTION_HEADING = "Knjiga koja je godinama čekala red"
const AGENTS_SECTION_HEADING = "Agenti kao probni čitatelji"
const WEB_SECTION_HEADING = "Web stranice kroz razgovor"
export type ArticleDataModule = typeof import("./article-data")

type SeriesPost = {
  category: string
  title: string
  description: string
  href: string
  language: string
  date: string
}

const sectionLinks = [
  { label: "About", href: "#about" },
  { label: "Advisory", href: "#advisory" },
  { label: "Projects", href: "#projects" },
  { label: "For You", href: "#for-you" },
  { label: "Contact", href: "#contact" },
]

const socialLinks = [
  { label: "X", href: "https://x.com/btcpavao" },
  { label: "Nostr", href: "https://primal.net/btcpavao" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/pavaopahljina/" },
  {
    label: "GitBook",
    href: "https://btcpavao.gitbook.io/practical-bitcoin-standard/",
  },
]

const workflowSectionVisuals = [
  {
    heading: "1. Ideja dolazi prije prompta",
    src: "/ai-workflow-step-1-idea.webp",
    smallSrc: "/ai-workflow-step-1-idea-840.webp",
    alt: "Radni stol uz prozor s pogledom na obalu, otvorenom bilježnicom, laptopom, mobitelom i šalicom kave.",
  },
  {
    heading: "2. Diktat je sirov materijal",
    src: "/ai-workflow-step-2-dictation.webp",
    smallSrc: "/ai-workflow-step-2-dictation-840.webp",
    alt: "Mobitel s otvorenom glasovnom snimkom leži kraj bilježnice, papira, laptopa i šalice kave na drvenom stolu.",
  },
  {
    heading: "3. ChatGPT kao sugovornik i urednik",
    src: "/ai-workflow-step-3-chatgpt-editor.webp",
    smallSrc: "/ai-workflow-step-3-chatgpt-editor-840.webp",
    alt: "Laptop s nečitljivim razgovorom na ekranu, otvorena bilježnica i označeni papiri na radnom stolu.",
  },
  {
    heading: "4. Od razgovora do zadatka za Codex",
    src: "/ai-workflow-step-4-codex-task.webp",
    smallSrc: "/ai-workflow-step-4-codex-task-840.webp",
    alt: "Laptop s nečitljivim kodom, bilježnica s kratkom listom provjere, mobitel i šalica kave na stolu uz prozor.",
  },
  {
    heading: "5. Codex čita postojeći sustav",
    src: "/ai-workflow-step-5-system-reading.webp",
    smallSrc: "/ai-workflow-step-5-system-reading-840.webp",
    alt: "Laptop s nečitljivim kodom i papiri sa skicama stranice na drvenom stolu pokraj prozora.",
  },
  {
    heading: "6. Pregled je dio rada, a ne formalnost",
    src: "/ai-workflow-step-6-review.webp",
    smallSrc: "/ai-workflow-step-6-review-840.webp",
    alt: "Radni stol s laptopom, papirima za pregled, bilježnicom, mobitelom i olovkom tijekom provjere članka.",
  },
  {
    heading: "7. Iteracija je mjesto gdje nastaje kvaliteta",
    src: "/ai-workflow-step-7-iteration.webp",
    smallSrc: "/ai-workflow-step-7-iteration-840.webp",
    alt: "Nekoliko verzija nacrta stranice, bilježnica, laptop i mobitel prikazuju proces uređivanja i ponavljanja.",
  },
] as const

function getWorkflowSectionVisual(heading: string) {
  return workflowSectionVisuals.find((visual) => visual.heading === heading)
}

const aiSeriesPosts: SeriesPost[] = [
  {
    category: "AI u praksi",
    title: ARTICLE_TITLE,
    description:
      "Prvi hrvatski zapis o tome kako mi je diktiranje, ChatGPT i Codex promijenilo svakodnevni rad.",
    href: ARTICLE_PATH,
    language: "HR",
    date: ARTICLE_DISPLAY_DATE,
  },
  {
    category: "AI u praksi",
    title: WORKFLOW_ARTICLE_TITLE,
    description:
      "Kako ideja iz šetnje prolazi kroz transkripciju, razgovor s ChatGPT-em i implementaciju u Codexu.",
    href: WORKFLOW_ARTICLE_PATH,
    language: "HR",
    date: WORKFLOW_ARTICLE_DISPLAY_DATE,
  },
  {
    category: "AI u praksi",
    title: LEARNING_ARTICLE_TITLE,
    description:
      "Kako sam uz AI naučio matematiku Bitcoin Wave Modela i znanje pretvorio u graf i H-time kalkulator.",
    href: LEARNING_ARTICLE_PATH,
    language: "HR",
    date: LEARNING_ARTICLE_DISPLAY_DATE,
  },
]

const hrBitcoinCorePosts: SeriesPost[] = [
  {
    category: BITCOIN_CORE_SERIES_TITLE,
    title: BITCOIN_CORE_ARTICLE_TITLE,
    description: BITCOIN_CORE_ARTICLE_SUBTITLE,
    href: BITCOIN_CORE_ENTROPY_ARTICLE_PATH,
    language: "HR",
    date: BITCOIN_CORE_ARTICLE_DISPLAY_DATE,
  },
]

const enBitcoinCorePosts: SeriesPost[] = [
  {
    category: BITCOIN_CORE_SERIES_TITLE,
    title: LONG_ROAD_ARTICLE_TITLE,
    description: LONG_ROAD_ARTICLE_SUBTITLE,
    href: LONG_ROAD_BITCOIN_CORE_ARTICLE_PATH,
    language: "EN",
    date: LONG_ROAD_ARTICLE_DISPLAY_DATE,
  },
  {
    category: BITCOIN_CORE_SERIES_TITLE,
    title: EN_BITCOIN_CORE_ARTICLE_TITLE,
    description: EN_BITCOIN_CORE_ARTICLE_SUBTITLE,
    href: EN_BITCOIN_CORE_ENTROPY_ARTICLE_PATH,
    language: "EN",
    date: EN_BITCOIN_CORE_ARTICLE_DISPLAY_DATE,
  },
]

const latestWritingPosts = [
  ...enBitcoinCorePosts,
  ...aiSeriesPosts,
  ...hrBitcoinCorePosts,
]

const learningArticleHeadings = [
  {
    id: "nisam-trazio-da-mi-objasni-sve-odjednom",
    title: "Nisam tražio da mi objasni sve odjednom",
  },
  {
    id: "najkorisniji-trenutak-bio-je-kada-sam-pogrijesio",
    title: "Najkorisniji trenutak bio je kada sam pogriješio",
  },
  {
    id: "jedna-zastrasujuca-formula-postala-je-niz-malih-ideja",
    title: "Jedna zastrašujuća formula postala je niz malih ideja",
  },
  {
    id: "u-jednom-trenutku-prestao-sam-uciti-model-i-poceo-ga-testirati",
    title: "U jednom trenutku prestao sam učiti model i počeo ga testirati",
  },
  { id: "lijep-graf-nije-bio-dovoljan", title: "Lijep graf nije bio dovoljan" },
  {
    id: "nesklad-od-desetak-tisuca-dolara-pokrenuo-je-novo-pitanje",
    title: "Nesklad od desetak tisuća dolara pokrenuo je novo pitanje",
  },
  {
    id: "od-ucenika-preko-istrazivaca-do-graditelja",
    title: "Od učenika preko istraživača do graditelja",
  },
  {
    id: "sto-danas-postoji-na-stranici",
    title: "Što danas postoji na stranici",
  },
  {
    id: "sto-sam-iz-ovoga-naucio-o-ucenju-uz-ai",
    title: "Što sam iz ovoga naučio o učenju uz AI",
  },
  {
    id: "ai-nije-uklonio-potrebu-za-razumijevanjem",
    title: "AI nije uklonio potrebu za razumijevanjem",
  },
  {
    id: "od-teskog-pdf-a-do-stranice-koju-svatko-moze-otvoriti",
    title: "Od teškog PDF-a do stranice koju svatko može otvoriti",
  },
]

const focusItems = [
  {
    category: "Advisory",
    heading: "Practical Bitcoin-standard guidance",
    description:
      "One-on-one conversations for Bitcoiners who want to organize money, habits, risk, and next steps around Bitcoin.",
    cta: "Book a call",
    href: "https://cal.com/btcpavao/introductory-call",
  },
  {
    category: "Writing",
    heading: "Practical Bitcoin Standard",
    description:
      "My open-source writing project for people moving from Bitcoin conviction to everyday Bitcoin practice.",
    cta: "Read the guide",
    href: "https://btcpavao.gitbook.io/practical-bitcoin-standard/",
  },
  {
    category: "Communities",
    heading: "Local and global Bitcoin signal",
    description:
      "Supporting Bitcoin communities through events, writing, networks, and practical infrastructure.",
    cta: "Explore projects",
    href: "#projects",
  },
]

const advisoryTopics = [
  {
    title: "Bitcoin as primary money",
    description:
      "How to think about income, spending, saving, buffers, and fiat exposure.",
  },
  {
    title: "Budgeting on a Bitcoin standard",
    description:
      "Build a simple system for tracking expenses, planning cash flow, and reducing fiat noise.",
  },
  {
    title: "Debt-free transition",
    description:
      "Think clearly about debt, liquidity, risk, and time preference.",
  },
  {
    title: "Practical learning path",
    description:
      "Turn scattered Bitcoin content into a focused reading and implementation plan.",
  },
  {
    title: "Bitcoin education and consulting",
    description:
      "General Bitcoin education, custody guidance, inheritance planning, and security reviews.",
  },
  {
    title: "Community and media strategy",
    description:
      "Build stronger local Bitcoin signal through meetups, livestreams, writing, and networks.",
  },
]

const callFaqItems = [
  "We clarify where you are today.",
  "We identify the biggest source of fiat noise, debt, confusion, or friction.",
  "We outline simple next steps.",
  "You leave with a practical path, not generic theory.",
]

const audienceItems = [
  "You save in Bitcoin but still plan your life in fiat terms.",
  "You want a cleaner system for spending, saving, and budgeting.",
  "You want to reduce debt, noise, and financial fragility.",
  "You are building or joining a serious Bitcoin community.",
  "You want a structured path through Bitcoin, Austrian economics, and personal finance.",
]

const proofPoints = [
  {
    value: "10,000+",
    label: "Hours in Bitcoin",
    copy: "Studying, teaching, and working across the ecosystem.",
  },
  {
    value: "Global + Local",
    label: "Community Footprint",
    copy: "Operating across worldwide and Balkan Bitcoin networks.",
  },
  {
    value: "Open Source",
    label: "Public Writing",
    copy: "Building a practical guide for living on a Bitcoin standard.",
  },
]

const sectionReveal = ""
const itemReveal = ""
const subtleReveal = ""
const liftHover =
  "transition-[background-color,color,border-color,box-shadow,transform] duration-300 active:translate-y-px active:scale-[0.96]"
const staggerDelays = ["", "", "", ""]

const projectGroups = [
  {
    title: "Core Work",
    description: "Work in the Bitcoin industry.",
    items: [
      {
        title: "Saifedean.com",
        focus: "Education",
        role: "Bitcoin education, Austrian economics, and high-signal learning infrastructure.",
        description:
          "Work around Bitcoin education, Austrian economics, and high-signal learning infrastructure.",
        href: "https://saifedean.com",
        logo: "/project-logos/saifedean.avif",
        cta: "Visit site",
      },
      {
        title: "TheSaifHouse.com",
        focus: "Books",
        role: "Books, global fulfillment, checkout experience, and Bitcoin-native commerce.",
        description:
          "Bitcoin books delivered worldwide with a strong checkout and customer experience across bitcoin and fiat rails.",
        href: "https://thesaifhouse.com",
        logo: "/project-logos/the-saif-house.png",
        cta: "Visit site",
      },
    ],
  },
  {
    title: "Open Source Work",
    description: "Open source & community building projects.",
    items: [
      {
        title: "Practical Bitcoin Standard",
        focus: "Open-source writing",
        role: "Turning Bitcoin conviction into everyday monetary habits.",
        description:
          "My open-source guide for turning Bitcoin conviction into everyday monetary habits.",
        href: "https://btcpavao.gitbook.io/practical-bitcoin-standard/",
        logo: "/project-logos/practical-bitcoin-standard.png",
        cta: "Read guide",
      },
      {
        title: "TwentyOne.World",
        focus: "Community network",
        role: "Local community discovery, network coordination, and Bitcoin signal.",
        description:
          "A global network of local Bitcoin communities helping people find signal, events, and peers.",
        href: "https://twentyone.world",
        logo: "/project-logos/twentyone-world-v2.svg",
        cta: "Visit site",
      },
    ],
  },
]

function ThemeToggle({ language = "en" }: { language?: "en" | "hr" }) {
  const { theme, setTheme } = useTheme()
  const isDark = theme === "dark"
  const label = isDark
    ? language === "hr"
      ? "Uključi svijetlu temu"
      : "Switch to light theme"
    : language === "hr"
      ? "Uključi tamnu temu"
      : "Switch to dark theme"

  return (
    <Button
      variant="outline"
      size="icon"
      className="glimmer-button inline-flex size-10 min-h-10 min-w-10 shrink-0 items-center justify-center rounded-full border-border/70 bg-background/85 p-0 leading-none backdrop-blur"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={label}
      title={label}
    >
      <span className="theme-toggle-icon-stack" aria-hidden="true">
        <SunMedium
          className={`theme-toggle-icon ${
            isDark ? "theme-toggle-icon-active" : "theme-toggle-icon-inactive"
          }`}
        />
        <MoonStar
          className={`theme-toggle-icon ${
            isDark ? "theme-toggle-icon-inactive" : "theme-toggle-icon-active"
          }`}
        />
      </span>
    </Button>
  )
}

function SectionHeader({
  eyebrow,
  title,
  copy,
}: {
  eyebrow: string
  title: string
  copy?: string
}) {
  return (
    <div className="max-w-3xl">
      <p className="text-[11px] font-semibold tracking-[0.24em] text-muted-foreground uppercase">
        {eyebrow}
      </p>
      <h2 className="mt-3 font-display text-3xl font-bold tracking-[-0.05em] text-foreground sm:text-4xl">
        {title}
      </h2>
      {copy ? (
        <p className="mt-4 text-base leading-8 text-muted-foreground">{copy}</p>
      ) : null}
    </div>
  )
}

function SkipLink({ label }: { label: string }) {
  return (
    <a className="skip-link" href="#main-content">
      {label}
    </a>
  )
}

function getCurrentPath() {
  if (typeof window === "undefined") {
    return "/"
  }

  return normalizePath(window.location.pathname)
}

function estimateReadingMinutes(parts: string[]) {
  const words = parts.join(" ").trim().split(/\s+/).filter(Boolean).length

  return Math.max(1, Math.ceil(words / 210))
}

function toSectionId(heading: string) {
  return heading
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
}

type BitcoinCoreArticleBlock =
  | { type: "heading"; text: string; id: string; numbered: boolean }
  | { type: "paragraph"; text: string }
  | { type: "list"; items: string[] }
  | { type: "visual"; number: number }

type BitcoinCoreLanguage = "hr" | "en"

const bitcoinCoreVisuals = [
  {
    src: "/bitcoin-core-entropija-01.webp",
    smallSrc: "/bitcoin-core-entropija-01-840.webp",
    alt: "Novčić, dvije kocke, PIN uređaj i svjetleća 32-bajtna kapsula prikazuju rast entropije.",
    enAlt:
      "A coin, two dice, a PIN device, and a glowing 32-byte capsule illustrate increasing entropy.",
  },
  {
    src: "/bitcoin-core-entropija-02.webp",
    smallSrc: "/bitcoin-core-entropija-02-840.webp",
    alt: "Klik na laptopu pokreće tok od izvora slučajnosti preko kriptografske jezgre do HD wallet stabla.",
    enAlt:
      "A click on a laptop starts a flow from randomness sources through a cryptographic core to an HD wallet tree.",
  },
  {
    src: "/bitcoin-core-entropija-03.webp",
    smallSrc: "/bitcoin-core-entropija-03-840.webp",
    alt: "Sistemski izvori šalju plave blokove slučajnosti u središnju kriptografsku komoru.",
    enAlt:
      "System sources send blue blocks of randomness into a central cryptographic chamber.",
  },
  {
    src: "/bitcoin-core-entropija-04.webp",
    smallSrc: "/bitcoin-core-entropija-04-840.webp",
    alt: "Dva slična računalna modula proizvode različite izlaze zbog sitnih vremenskih i izvršnih razlika.",
    enAlt:
      "Two similar computer modules produce different outputs because of tiny timing and execution differences.",
  },
  {
    src: "/bitcoin-core-entropija-05.webp",
    smallSrc: "/bitcoin-core-entropija-05-840.webp",
    alt: "Komponente računala tvore jedinstveni svjetleći otisak koji ulazi u kriptografsku komoru.",
    enAlt:
      "Computer components form a unique glowing fingerprint that enters a cryptographic chamber.",
  },
  {
    src: "/bitcoin-core-entropija-06.webp",
    smallSrc: "/bitcoin-core-entropija-06-840.webp",
    alt: "Plavi i zlatni tokovi miješaju se u komori, a dio izlaza vraća se kao obnovljeno interno stanje.",
    enAlt:
      "Blue and golden streams mix inside a chamber while part of the output returns as refreshed internal state.",
  },
  {
    src: "/bitcoin-core-entropija-07.webp",
    smallSrc: "/bitcoin-core-entropija-07-840.webp",
    alt: "Nasumična vrijednost ulazi u golemo zlatno polje valjanih privatnih ključeva uz vrlo tanak crveni rub.",
    enAlt:
      "A random value enters a vast golden field of valid private keys bordered by a very thin red edge.",
  },
  {
    src: "/bitcoin-core-entropija-08.webp",
    smallSrc: "/bitcoin-core-entropija-08-840.webp",
    alt: "Zlatni seed postaje dvije povezane linije iz kojih raste razgranato BIP32 stablo.",
    enAlt:
      "A golden seed becomes two connected lines from which a branching BIP32 tree grows.",
  },
  {
    src: "/bitcoin-core-entropija-09.webp",
    smallSrc: "/bitcoin-core-entropija-09-840.webp",
    alt: "Jedan zlatni korijen deterministički se grana prema mnogim pripremljenim adresama.",
    enAlt:
      "A single golden root branches deterministically into many prepared addresses.",
  },
  {
    src: "/bitcoin-core-entropija-10.webp",
    smallSrc: "/bitcoin-core-entropija-10-840.webp",
    alt: "Kriptografska jezgra zaštićena je koncentričnim slojevima operacijske, uređajne i fizičke sigurnosti.",
    enAlt:
      "A cryptographic core is protected by concentric layers of operating system, device, and physical security.",
  },
  {
    src: "/bitcoin-core-entropija-11.webp",
    smallSrc: "/bitcoin-core-entropija-11-840.webp",
    alt: "Robustan Bitcoin Core modul ugrađen je u temelje sustava koji podupire širu Bitcoin infrastrukturu.",
    enAlt:
      "A robust Bitcoin Core module is embedded in the foundation of a system supporting broader Bitcoin infrastructure.",
  },
] as const

function createBitcoinCorePictogram(Icon: LucideIcon) {
  return createElement(Icon, { className: "size-5", strokeWidth: 1.85 })
}

const bitcoinCoreHeadingIcons: ReactNode[] = [
  Dice5,
  KeyRound,
  GitBranch,
  Shuffle,
  Cpu,
  Cpu,
  Dice5,
  Shuffle,
  Cpu,
  Shuffle,
  Shuffle,
  ShieldCheck,
  KeyRound,
  KeyRound,
  KeyRound,
  GitBranch,
  GitBranch,
  GitBranch,
  ShieldCheck,
  ShieldCheck,
  TriangleAlert,
  ShieldCheck,
  ShieldCheck,
].map(createBitcoinCorePictogram)

const bitcoinCoreConclusionIcon = createBitcoinCorePictogram(CircleCheckBig)
const bitcoinCoreFallbackIcon = createBitcoinCorePictogram(Dice5)

const hrBitcoinCoreBoldStatements = new Set([
  "Kako stvoriti privatni ključ koji nitko drugi ne može pogoditi?",
  "Entropija je mjera nepredvidivosti.",
  "Bitcoin Core radi izravno s kriptografskim materijalom, bez “riječi” kao korisničkog sloja.",
  "To je srž cijele priče.",
  "Hardverska slučajnost je dodatni izvor, ne jedini temelj.",
  "Core akumulira i održava svoj vlastiti kvalitetni RNG state, a ne samo “uzima broj i gotovo”.",
  "Za to koristi SHA-512.",
  "To se zove rejection sampling.",
  "Ta dva dijela zajedno postaju temelj HD walleta.",
  "To je keypool.",
  "Dobar RNG je nužan, ali nije dovoljan za cijeli cold storage sustav.",
  "Bitcoin Core je softver koji ozbiljno pristupa temeljnim sigurnosnim problemima Bitcoina.",
  "On je jedan od najvažnijih tehničkih temelja cijelog Bitcoin sustava.",
  "Seed",
  "Passphrase za wallet",
])

const enBitcoinCoreBoldStatements = new Set([
  "How do you create a private key that no one else can guess?",
  "Entropy is a measure of unpredictability.",
  "Bitcoin Core works directly with cryptographic material, without “words” as a user-facing layer.",
  "That is the heart of the whole story.",
  "Hardware randomness is an additional source, not the only foundation.",
  "Core accumulates and maintains its own high-quality RNG state rather than merely “taking a number and calling it done.”",
  "It uses SHA-512 for that.",
  "This is called rejection sampling.",
  "Together, these two parts form the foundation of the HD wallet.",
  "That is the keypool.",
  "A good RNG is necessary, but it is not sufficient for an entire cold storage system.",
  "Bitcoin Core is software that takes Bitcoin’s fundamental security problems seriously.",
  "It is one of the most important technical foundations of the entire Bitcoin system.",
  "Seed",
  "Wallet passphrase",
])

function isBitcoinCoreLead(text: string, language: BitcoinCoreLanguage) {
  const boldStatements =
    language === "en"
      ? enBitcoinCoreBoldStatements
      : hrBitcoinCoreBoldStatements

  return (
    text.endsWith(":") ||
    ["Jednostavan primjer", "Još jednostavnije", "Najjednostavnije:"].includes(
      text
    ) ||
    ["A simple example", "Even simpler", "The simplest explanation:"].includes(
      text
    ) ||
    text === "Zašto?" ||
    text === "Why?" ||
    boldStatements.has(text)
  )
}

function getBitcoinCoreHeadingIcon(
  heading: Extract<BitcoinCoreArticleBlock, { type: "heading" }>
) {
  if (heading.numbered) {
    const number = Number.parseInt(heading.text, 10)
    return bitcoinCoreHeadingIcons[number - 1] ?? bitcoinCoreFallbackIcon
  }

  return bitcoinCoreConclusionIcon
}

function parseBitcoinCoreArticle(
  source: string,
  language: BitcoinCoreLanguage
) {
  const normalized = source.replace(/\r\n?/g, "\n").trim()
  const [title, subtitle, ...bodyLines] = normalized.split("\n")
  const chunks = bodyLines
    .join("\n")
    .trim()
    .split(/\n\s*\n/)
    .map((chunk) => chunk.trim())
    .filter(Boolean)

  const blocks: BitcoinCoreArticleBlock[] = chunks.flatMap(
    (chunk): BitcoinCoreArticleBlock[] => {
      const visualMatch = chunk.match(/^\[\[VIZUAL (\d+)\]\]$/)

      if (visualMatch) {
        return [{ type: "visual", number: Number(visualMatch[1]) }]
      }

      const lines = chunk.split("\n").map((line) => line.trim())
      const isNumberedHeading = /^\d+\.\s/.test(chunk)
      const isHeading =
        isNumberedHeading ||
        chunk === (language === "en" ? "Conclusion" : "Zaključak")

      if (isHeading) {
        return [
          {
            type: "heading",
            text: chunk,
            id: toSectionId(chunk),
            numbered: isNumberedHeading,
          },
        ]
      }

      if (
        lines[0] ===
        (language === "en" ? "Even simpler" : "Još jednostavnije")
      ) {
        return [
          { type: "paragraph", text: lines[0] },
          { type: "list", items: lines.slice(1) },
        ]
      }

      if (
        lines[0] === "Kod privatnih ključeva upravo to želimo:" ||
        lines[0] === "To ne znači da je manje siguran." ||
        lines[0] === "With private keys, that is exactly what we want:" ||
        lines[0] === "That does not make it less secure."
      ) {
        return lines.map((line) => ({ type: "paragraph", text: line }))
      }

      if (lines.length > 1) {
        return [{ type: "list", items: lines }]
      }

      return [{ type: "paragraph", text: chunk }]
    }
  )

  return { title, subtitle, blocks }
}

function setMetaContent(
  attribute: "name" | "property",
  key: string,
  content: string
) {
  let meta = document.head.querySelector<HTMLMetaElement>(
    `meta[${attribute}="${key}"]`
  )

  if (!meta) {
    meta = document.createElement("meta")
    meta.setAttribute(attribute, key)
    document.head.append(meta)
  }

  meta.content = content
}

function setCanonicalUrl(href: string) {
  let link = document.head.querySelector<HTMLLinkElement>(
    'link[rel="canonical"]'
  )

  if (!link) {
    link = document.createElement("link")
    link.rel = "canonical"
    document.head.append(link)
  }

  link.href = href
}

type LanguageAlternates = {
  hr: string
  en: string
  xDefault: string
}

function setLanguageAlternates(alternates?: LanguageAlternates) {
  document.head
    .querySelectorAll('link[data-language-alternate="true"]')
    .forEach((link) => link.remove())

  if (!alternates) {
    return
  }

  const entries = [
    ["hr", alternates.hr],
    ["en", alternates.en],
    ["x-default", alternates.xDefault],
  ] as const

  for (const [language, href] of entries) {
    const link = document.createElement("link")
    link.rel = "alternate"
    link.hreflang = language
    link.href = href
    link.dataset.languageAlternate = "true"
    document.head.append(link)
  }
}

function renderLinkedText(text: string) {
  return text.split(/(https?:\/\/[^\s]+)/g).map((part, index) => {
    if (!part.startsWith("http")) {
      return part
    }

    const trailingMatch = part.match(/[.,;:!?]+$/)
    const trailing = trailingMatch?.[0] ?? ""
    const href = trailing ? part.slice(0, -trailing.length) : part
    const label = href.replace(/^https?:\/\//, "").replace(/\/$/, "")

    return (
      <span key={`${href}-${index}`}>
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-foreground underline decoration-primary/35 underline-offset-4 hover:text-primary"
        >
          {label}
        </a>
        {trailing}
      </span>
    )
  })
}

type MetadataOptions = {
  title: string
  description: string
  ogDescription: string
  url: string
  type?: "website" | "article"
  publishedDate?: string
  articleSection?: string
  image?: string
  language?: "hr" | "en"
  alternates?: LanguageAlternates
}

function usePageMetadata({
  title,
  description,
  ogDescription,
  url,
  type = "website",
  publishedDate,
  articleSection = "AI u praksi",
  image,
  language = "hr",
  alternates,
}: MetadataOptions) {
  useEffect(() => {
    document.documentElement.lang = language
    document.title = title
    setCanonicalUrl(url)
    setLanguageAlternates(alternates)
    setMetaContent("name", "description", description)
    setMetaContent("property", "og:type", type)
    setMetaContent("property", "og:title", title)
    setMetaContent("property", "og:description", ogDescription)
    setMetaContent("property", "og:url", url)
    setMetaContent("property", "og:locale", language === "en" ? "en_US" : "hr_HR")
    setMetaContent(
      "property",
      "og:locale:alternate",
      language === "en" ? "hr_HR" : "en_US"
    )
    setMetaContent("name", "twitter:title", title)
    setMetaContent("name", "twitter:description", ogDescription)

    if (image) {
      setMetaContent("property", "og:image", image)
      setMetaContent("name", "twitter:image", image)
    }

    if (type === "article" && publishedDate) {
      setMetaContent("property", "article:section", articleSection)
      setMetaContent("property", "article:published_time", publishedDate)
    }
  }, [
    articleSection,
    alternates,
    description,
    image,
    language,
    ogDescription,
    publishedDate,
    title,
    type,
    url,
  ])
}

function useArticleMetadata() {
  usePageMetadata({
    title: ARTICLE_TITLE,
    description: ARTICLE_DESCRIPTION,
    ogDescription: ARTICLE_OG_DESCRIPTION,
    url: ARTICLE_URL,
    type: "article",
    publishedDate: ARTICLE_DATE,
  })
}

function useSeriesMetadata() {
  usePageMetadata({
    title: `${AI_SERIES_TITLE} | Pavao Pahljina`,
    description: AI_SERIES_DESCRIPTION,
    ogDescription: AI_SERIES_OG_DESCRIPTION,
    url: AI_SERIES_URL,
  })
}

function useWorkflowArticleMetadata() {
  usePageMetadata({
    title: WORKFLOW_ARTICLE_TITLE,
    description: WORKFLOW_ARTICLE_DESCRIPTION,
    ogDescription: WORKFLOW_ARTICLE_OG_DESCRIPTION,
    url: WORKFLOW_ARTICLE_URL,
    type: "article",
    publishedDate: WORKFLOW_ARTICLE_DATE,
  })
}

function useLearningArticleMetadata() {
  usePageMetadata({
    title: LEARNING_ARTICLE_TITLE,
    description: LEARNING_ARTICLE_DESCRIPTION,
    ogDescription: LEARNING_ARTICLE_OG_DESCRIPTION,
    url: LEARNING_ARTICLE_URL,
    type: "article",
    publishedDate: LEARNING_ARTICLE_DATE,
  })
}

function useHrHomeMetadata() {
  usePageMetadata({
    title: `${HR_HOME_TITLE} | Pavao Pahljina`,
    description: HR_HOME_DESCRIPTION,
    ogDescription: HR_HOME_DESCRIPTION,
    url: HR_HOME_URL,
  })
}

function useBitcoinCoreSeriesMetadata(language: BitcoinCoreLanguage = "hr") {
  const isEnglish = language === "en"

  usePageMetadata({
    title: `${BITCOIN_CORE_SERIES_TITLE} | Pavao Pahljina`,
    description: isEnglish
      ? EN_BITCOIN_CORE_SERIES_DESCRIPTION
      : BITCOIN_CORE_SERIES_DESCRIPTION,
    ogDescription: isEnglish
      ? EN_BITCOIN_CORE_SERIES_DESCRIPTION
      : BITCOIN_CORE_SERIES_DESCRIPTION,
    url: isEnglish ? EN_BITCOIN_CORE_SERIES_URL : BITCOIN_CORE_SERIES_URL,
    language,
    alternates: {
      hr: BITCOIN_CORE_SERIES_URL,
      en: EN_BITCOIN_CORE_SERIES_URL,
      xDefault: EN_BITCOIN_CORE_SERIES_URL,
    },
  })
}

function useBitcoinCoreArticleMetadata(language: BitcoinCoreLanguage = "hr") {
  const isEnglish = language === "en"

  usePageMetadata({
    title: isEnglish
      ? EN_BITCOIN_CORE_ARTICLE_TITLE
      : BITCOIN_CORE_ARTICLE_TITLE,
    description: isEnglish
      ? EN_BITCOIN_CORE_ARTICLE_DESCRIPTION
      : BITCOIN_CORE_ARTICLE_DESCRIPTION,
    ogDescription: isEnglish
      ? "How Bitcoin Core creates a high-quality private root from multiple entropy sources and uses it to build an entire wallet."
      : BITCOIN_CORE_ARTICLE_DESCRIPTION,
    url: isEnglish ? EN_BITCOIN_CORE_ARTICLE_URL : BITCOIN_CORE_ARTICLE_URL,
    type: "article",
    publishedDate: BITCOIN_CORE_ARTICLE_DATE,
    articleSection: BITCOIN_CORE_SERIES_TITLE,
    image: `${SITE_URL}/bitcoin-core-entropija-og.jpg`,
    language,
    alternates: {
      hr: BITCOIN_CORE_ARTICLE_URL,
      en: EN_BITCOIN_CORE_ARTICLE_URL,
      xDefault: EN_BITCOIN_CORE_ARTICLE_URL,
    },
  })
}

function useLongRoadArticleMetadata() {
  usePageMetadata({
    title: LONG_ROAD_ARTICLE_TITLE,
    description: LONG_ROAD_ARTICLE_SUBTITLE,
    ogDescription: LONG_ROAD_ARTICLE_SUBTITLE,
    url: LONG_ROAD_ARTICLE_URL,
    type: "article",
    publishedDate: LONG_ROAD_ARTICLE_DATE,
    articleSection: BITCOIN_CORE_SERIES_TITLE,
    image: LONG_ROAD_ARTICLE_OG_IMAGE,
    language: "en",
  })
}

function useReadingProgress() {
  useEffect(() => {
    function updateProgress() {
      const max = document.documentElement.scrollHeight - window.innerHeight
      const progress = max <= 0 ? 0 : Math.min(window.scrollY / max, 1)
      document.documentElement.style.setProperty(
        "--reading-progress",
        progress.toFixed(4)
      )
    }

    updateProgress()
    window.addEventListener("scroll", updateProgress, { passive: true })
    window.addEventListener("resize", updateProgress)

    return () => {
      window.removeEventListener("scroll", updateProgress)
      window.removeEventListener("resize", updateProgress)
      document.documentElement.style.removeProperty("--reading-progress")
    }
  }, [])
}

function ArticlePage({
  initialArticleData = null,
}: {
  initialArticleData?: ArticleDataModule | null
}) {
  useArticleMetadata()
  useReadingProgress()
  const [articleData, setArticleData] = useState<ArticleDataModule | null>(
    initialArticleData
  )

  useEffect(() => {
    if (articleData) {
      return undefined
    }

    let isMounted = true

    import("./article-data").then((data) => {
      if (isMounted) {
        setArticleData(data)
      }
    })

    return () => {
      isMounted = false
    }
  }, [articleData])

  const articleIntro = articleData?.articleIntro ?? []
  const articleSections = articleData?.articleSections ?? []
  const websiteScreenshots = articleData?.websiteScreenshots ?? []
  const bookAgentGroups = articleData?.bookAgentGroups ?? []
  const articleHeadings = articleSections.map((section) => section.heading)
  const readingMinutes = articleData
    ? estimateReadingMinutes([
        ...articleIntro,
        ...articleSections.flatMap((section) => [
          section.heading,
          ...section.paragraphs,
        ]),
      ])
    : null

  return (
    <div className="relative isolate min-h-screen overflow-x-clip bg-background text-foreground">
      <SkipLink label="Preskoči na sadržaj" />
      <div className="reading-progress" aria-hidden="true" />
      <div
        aria-hidden="true"
        className="page-atmosphere pointer-events-none absolute inset-0"
      />
      <div
        aria-hidden="true"
        className="page-grid pointer-events-none absolute inset-0"
      />
      <header className="z-40 border-b border-border/60 bg-background/92 md:sticky md:top-0 md:bg-background/78 md:backdrop-blur-xl">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-4 py-4 sm:px-6 lg:px-8">
          <a
            className="font-display text-base font-bold tracking-[-0.04em]"
            href="/"
          >
            Pavao Pahljina
          </a>

          <div className="flex items-center gap-2">
            <a
              href="/"
              className={`glimmer-button hidden h-10 items-center rounded-full border border-border/70 bg-background/80 px-4 text-sm font-medium text-muted-foreground transition-[background-color,color,border-color,box-shadow,transform] duration-300 hover:bg-card hover:text-foreground sm:inline-flex ${liftHover}`}
            >
              Početna
            </a>
            <a
              href={CONTACT_EMAIL}
              className={`glimmer-button hidden h-10 items-center rounded-full border border-border/70 bg-background/80 px-4 text-sm font-medium text-muted-foreground transition-[background-color,color,border-color,box-shadow,transform] duration-300 hover:bg-card hover:text-foreground sm:inline-flex ${liftHover}`}
            >
              Kontakt
            </a>
            <ThemeToggle language="hr" />
          </div>
        </div>
      </header>

      <main id="main-content" className="relative pb-20">
        <article className="article-layout">
          <header className="article-hero-bleed">
            <picture className="article-hero-background">
              <img
                src={ARTICLE_HERO_IMAGE}
                srcSet={`${ARTICLE_HERO_IMAGE_SMALL} 840w, ${ARTICLE_HERO_IMAGE} 1672w`}
                sizes="(max-width: 760px) 100vw, 60vw"
                alt="Laptop, mobitel, bilježnica, kava i rukopis knjige na radnom stolu"
                width={1672}
                height={941}
                decoding="async"
                fetchPriority="high"
              />
            </picture>

            <div className="article-hero-content">
              <div className="article-hero-copy">
                <a
                  href="/"
                  className="glimmer-button inline-flex rounded-full border border-border/70 bg-background/82 px-4 py-2 text-sm font-medium text-muted-foreground backdrop-blur transition-[background-color,color,border-color,box-shadow,transform] duration-300 hover:bg-card hover:text-foreground"
                >
                  Natrag na početnu
                </a>

                <div className="mt-12 flex flex-wrap items-center gap-2 text-[11px] font-semibold text-muted-foreground uppercase">
                  <span className="rounded-full border border-border/70 bg-background/78 px-3 py-1 backdrop-blur">
                    AI u praksi
                  </span>
                  <span className="rounded-full border border-border/70 bg-background/78 px-3 py-1 backdrop-blur">
                    Hrvatski
                  </span>
                  <a
                    href="/"
                    rel="author"
                    className="rounded-full border border-border/70 bg-background/78 px-3 py-1 backdrop-blur hover:bg-card hover:text-foreground"
                  >
                    Pavao Pahljina
                  </a>
                  <time
                    className="rounded-full border border-border/70 bg-background/78 px-3 py-1 backdrop-blur"
                    dateTime={ARTICLE_DATE}
                  >
                    {ARTICLE_DISPLAY_DATE}
                  </time>
                  {readingMinutes ? (
                    <span className="rounded-full border border-border/70 bg-background/78 px-3 py-1 backdrop-blur">
                      {readingMinutes} min čitanja
                    </span>
                  ) : null}
                </div>

                <h1 className="mt-8 max-w-[10ch] font-display text-5xl leading-[0.96] font-bold text-balance text-foreground sm:text-6xl xl:text-7xl">
                  {ARTICLE_TITLE}
                </h1>
                <p className="mt-6 max-w-xl text-xl leading-8 text-pretty text-muted-foreground sm:text-2xl sm:leading-9">
                  Kako sam uz diktiranje, ChatGPT i Codex počeo raditi kao da
                  imam mali tim oko sebe.
                </p>
              </div>
            </div>
          </header>

          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="article-shell mt-12 border-y border-border/70 py-8">
              <p className="max-w-2xl text-base leading-8 text-muted-foreground">
                Ovo je prvi tekst u serijalu o praktičnom korištenju AI-a. Nije
                manifest ni prodajna stranica, nego osobni zapis o tome kako se
                promijenio moj svakodnevni ritam rada.
              </p>
            </div>

            <nav
              aria-label="Sadržaj članka"
              className="article-shell article-toc mt-10 rounded-[24px] border border-border/70 bg-card/78 p-4 shadow-soft"
            >
              <p className="text-[11px] font-semibold text-muted-foreground uppercase">
                Sadržaj
              </p>
              <div className="mt-3 grid gap-2 sm:grid-cols-2">
                {articleHeadings.map((heading) => (
                  <a
                    key={heading}
                    href={`#${toSectionId(heading)}`}
                    className={`glimmer-button rounded-2xl border border-border/60 bg-background/64 px-4 py-3 text-sm font-medium text-muted-foreground hover:bg-card hover:text-foreground ${liftHover}`}
                  >
                    {heading}
                  </a>
                ))}
              </div>
            </nav>

            <div className="article-shell mt-10 space-y-10 text-lg leading-8 text-muted-foreground">
              <div className="space-y-6">
                {articleIntro.map((paragraph) => (
                  <p key={paragraph}>{renderLinkedText(paragraph)}</p>
                ))}
              </div>

              {articleSections.map((section) => (
                <section key={section.heading} className="space-y-6">
                  <h2
                    id={toSectionId(section.heading)}
                    className="pt-4 font-display text-3xl font-bold text-balance text-foreground"
                  >
                    {section.heading}
                  </h2>
                  {section.heading === BOOK_SECTION_HEADING ? (
                    <figure className="space-y-3">
                      <picture>
                        <img
                          src="/bitcoin-kao-novac-cover.webp"
                          srcSet="/bitcoin-kao-novac-cover-724.webp 724w, /bitcoin-kao-novac-cover.webp 1448w"
                          sizes="(max-width: 768px) calc(100vw - 2rem), 48rem"
                          alt='Naslovnica knjige "Bitcoin kao novac"'
                          width={1448}
                          height={1086}
                          loading="lazy"
                          decoding="async"
                          className="w-full rounded-lg border border-border/70 bg-card/80 shadow-soft"
                        />
                      </picture>
                      <figcaption className="text-sm leading-6 text-muted-foreground">
                        Naslovnica knjige{" "}
                        <span className="font-medium text-foreground">
                          Bitcoin kao novac
                        </span>
                        .
                      </figcaption>
                    </figure>
                  ) : null}
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{renderLinkedText(paragraph)}</p>
                  ))}
                  {section.heading === WEB_SECTION_HEADING ? (
                    <div className="grid gap-5">
                      {websiteScreenshots.map((site) => (
                        <figure
                          key={site.title}
                          className="space-y-3 rounded-[28px] border border-border/70 bg-card/78 p-3 shadow-soft sm:p-4"
                        >
                          <picture>
                            <img
                              src={site.src}
                              srcSet={`${site.smallSrc} 800w, ${site.mediumSrc} 1600w, ${site.src} ${site.width}w`}
                              sizes="(max-width: 768px) calc(100vw - 3.5rem), 44rem"
                              alt={site.alt}
                              width={site.width}
                              height={site.height}
                              loading="lazy"
                              decoding="async"
                              className="w-full rounded-2xl border border-border/70 bg-background/80"
                            />
                          </picture>
                          <figcaption className="px-1 pb-1 text-sm leading-6 text-muted-foreground">
                            <span className="font-medium text-foreground">
                              {site.title}
                            </span>
                            : {site.caption}
                          </figcaption>
                        </figure>
                      ))}
                    </div>
                  ) : null}
                  {section.heading === AGENTS_SECTION_HEADING ? (
                    <div className="space-y-5 rounded-[28px] border border-border/70 bg-card/78 p-5 text-base leading-7 shadow-soft sm:p-6">
                      <div className="space-y-2">
                        <p className="text-[11px] font-semibold tracking-[0.24em] text-muted-foreground uppercase">
                          Primjer iz stvarnog procesa
                        </p>
                        <h3 className="font-display text-2xl font-bold tracking-[-0.04em] text-foreground">
                          Mali urednički tim za knjigu Bitcoin kao novac
                        </h3>
                        <p className="max-w-2xl text-sm leading-7 text-muted-foreground">
                          Ovo nisu bili likovi za zabavu, nego radne perspektive
                          kroz koje sam testirao tekst prije stvarnih čitatelja:
                          tko se gubi, tko osjeća pritisak, tko vidi rizik i
                          gdje knjiga preskače korak.
                        </p>
                      </div>
                      <div className="grid gap-4">
                        {bookAgentGroups.map((group) => (
                          <section
                            key={group.label}
                            className="rounded-2xl border border-border/70 bg-background/62 p-4"
                          >
                            <div className="mb-4">
                              <h4 className="font-display text-lg font-bold tracking-[-0.03em] text-foreground">
                                {group.label}
                              </h4>
                              <p className="mt-1 text-sm leading-6 text-muted-foreground">
                                {group.description}
                              </p>
                            </div>
                            <div className="grid gap-3 md:grid-cols-2">
                              {group.agents.map((agent) => (
                                <div
                                  key={agent.id}
                                  className="rounded-2xl border border-border/60 bg-card/72 p-4"
                                >
                                  <p className="font-mono text-[11px] leading-5 font-semibold break-all text-primary">
                                    {agent.id}
                                  </p>
                                  <h5 className="mt-2 font-display text-lg font-bold tracking-[-0.03em] text-foreground">
                                    {agent.title}
                                  </h5>
                                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                                    {agent.description}
                                  </p>
                                </div>
                              ))}
                            </div>
                          </section>
                        ))}
                      </div>
                    </div>
                  ) : null}
                </section>
              ))}
            </div>

            <Card className="article-shell mt-14 rounded-[30px] border-border/70 bg-card/86 py-0 shadow-float">
              <CardContent className="p-6 sm:p-8">
                <p className="text-[11px] font-semibold tracking-[0.24em] text-muted-foreground uppercase">
                  AI u praksi
                </p>
                <h2 className="mt-3 font-display text-2xl font-bold tracking-[-0.04em] text-foreground">
                  Serijal AI u praksi
                </h2>
                <p className="mt-4 max-w-2xl text-base leading-8 text-muted-foreground">
                  Ovo je prvi tekst u serijalu o tome kako koristim AI za
                  pisanje, web stranice, knjige, agente i poslovne procese.
                  Sljedeći tekst opisuje moj konkretan workflow od diktata do
                  objavljene stranice.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Button
                    asChild
                    size="lg"
                    className="glimmer-button cta-shadow rounded-full px-6"
                  >
                    <a href={AI_SERIES_PATH}>Svi tekstovi iz serijala</a>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="glimmer-button rounded-full border-border/70 bg-background/82 px-6"
                  >
                    <a href={WORKFLOW_ARTICLE_PATH}>Sljedeći tekst</a>
                  </Button>
                  <Button
                    asChild
                    variant="link"
                    className="h-auto px-1 text-sm font-semibold"
                  >
                    <a href={CONTACT_EMAIL}>
                      Kontakt
                      <Mail className="size-4" />
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </article>
      </main>

      <footer className="border-t border-border/60 bg-background/92 backdrop-blur-xl">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <a
            className="font-display text-base font-bold tracking-[-0.04em]"
            href="/"
          >
            Pavao Pahljina
          </a>

          <div className="flex items-center gap-2">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="glimmer-button rounded-full border border-border/70 bg-background/80 px-4 py-2 text-sm font-medium text-muted-foreground transition-[background-color,color,border-color,box-shadow,transform] duration-300 hover:bg-card hover:text-foreground"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  )
}

function PageChrome({
  children,
  active = "series",
  sectionHref = AI_SERIES_PATH,
  sectionLabel = AI_SERIES_TITLE,
  language = "hr",
}: {
  children: ReactNode
  active?: "home" | "series"
  sectionHref?: string
  sectionLabel?: string
  language?: "hr" | "en"
}) {
  const isEnglish = language === "en"

  return (
    <div className="relative isolate min-h-screen overflow-x-clip bg-background text-foreground">
      <SkipLink label={isEnglish ? "Skip to content" : "Preskoči na sadržaj"} />
      <div
        aria-hidden="true"
        className="page-atmosphere pointer-events-none absolute inset-0"
      />
      <div
        aria-hidden="true"
        className="page-grid pointer-events-none absolute inset-0"
      />
      <header className="z-40 border-b border-border/60 bg-background/92 md:sticky md:top-0 md:bg-background/78 md:backdrop-blur-xl">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-4 py-4 sm:px-6 lg:px-8">
          <a
            className="font-display text-base font-bold tracking-[-0.04em]"
            href="/"
            aria-current={active === "home" ? "page" : undefined}
          >
            Pavao Pahljina
          </a>

          <div className="flex items-center gap-2">
            <a
              href={sectionHref}
              aria-current={active === "series" ? "page" : undefined}
              className={`glimmer-button hidden h-10 items-center rounded-full border border-border/70 bg-background/80 px-4 text-sm font-medium text-muted-foreground hover:bg-card hover:text-foreground sm:inline-flex ${liftHover}`}
            >
              {sectionLabel}
            </a>
            <a
              href="/#contact"
              className={`glimmer-button hidden h-10 items-center rounded-full border border-border/70 bg-background/80 px-4 text-sm font-medium text-muted-foreground hover:bg-card hover:text-foreground sm:inline-flex ${liftHover}`}
            >
              {isEnglish ? "Contact" : "Kontakt"}
            </a>
            <ThemeToggle language={language} />
          </div>
        </div>
      </header>

      {children}
    </div>
  )
}

function SeriesCard({ post }: { post: SeriesPost }) {
  return (
    <a
      href={post.href}
      className={`glimmer-button grid rounded-[28px] border border-border/70 bg-card/82 p-6 shadow-soft hover:bg-card ${liftHover}`}
    >
      <div className="flex flex-wrap items-center gap-2 text-[11px] font-semibold tracking-[0.2em] text-muted-foreground uppercase">
        <span className="surface-ring rounded-full bg-background/70 px-3 py-1">
          {post.category}
        </span>
        <span className="surface-ring rounded-full bg-background/70 px-3 py-1">
          {post.language}
        </span>
        <span className="surface-ring rounded-full bg-background/70 px-3 py-1">
          {post.date}
        </span>
      </div>
      <h3 className="mt-5 font-display text-2xl font-bold tracking-[-0.04em] text-balance text-foreground">
        {post.title}
      </h3>
      <p className="mt-3 text-sm leading-7 text-pretty text-muted-foreground">
        {post.description}
      </p>
    </a>
  )
}

function AiSeriesPage() {
  useSeriesMetadata()

  const topics = [
    "Pisanje i knjige",
    "Diktiranje i razmišljanje naglas",
    "Web stranice i kod",
    "Agenti i povratne informacije",
    "Automatizacija",
    "AI za generaliste",
    "Granice, pogreške i odgovornost",
  ]

  return (
    <PageChrome>
      <main
        id="main-content"
        className="relative mx-auto max-w-5xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20"
      >
        <section>
          <a
            href="/"
            className={`glimmer-button inline-flex min-h-10 items-center rounded-full border border-border/70 bg-background/82 px-4 text-sm font-medium text-muted-foreground backdrop-blur hover:bg-card hover:text-foreground ${liftHover}`}
          >
            Početna
          </a>
          <p className="mt-12 text-[11px] font-semibold tracking-[0.24em] text-muted-foreground uppercase">
            AI u praksi
          </p>
          <h1 className="mt-4 max-w-[12ch] font-display text-5xl leading-[0.94] font-bold tracking-[-0.06em] text-balance text-foreground sm:text-6xl">
            AI u praksi
          </h1>
          <div className="mt-8 max-w-3xl space-y-5 text-lg leading-8 text-pretty text-muted-foreground">
            <p>
              Ovdje bilježim kako koristim AI u stvarnom radu: za pisanje,
              knjige, web stranice, poslovne procese, agente i automatizacije.
            </p>
            <p>
              Ovo nije zbirka vijesti o umjetnoj inteligenciji niti pokušaj
              predviđanja daleke budućnosti. Pišem o onome što trenutačno
              testiram, što mi pomaže, gdje AI griješi i kako se mijenja posao
              čovjeka koji ima ideju, ali nema veliki tim za njezinu izvedbu.
            </p>
            <p>
              Posebno me zanima što AI znači za generaliste, poduzetnike,
              autore, konzultante i druge ljude koji dobro poznaju svoj problem,
              ali nisu programeri, dizajneri i stručnjaci za svaki pojedini dio
              procesa.
            </p>
          </div>
        </section>

        <section className="mt-16 border-t border-border/60 pt-16">
          <SectionHeader
            eyebrow="Objavljeni tekstovi"
            title="Tekstovi iz serijala"
          />
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {aiSeriesPosts.map((post) => (
              <SeriesCard key={post.href} post={post} />
            ))}
          </div>
        </section>

        <section className="mt-16 grid gap-8 border-t border-border/60 pt-16 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1fr)]">
          <SectionHeader eyebrow="Bilješke" title="O čemu ovdje pišem" />
          <ul className="flex flex-wrap gap-3">
            {topics.map((topic) => (
              <li
                key={topic}
                className="surface-shadow-subtle rounded-2xl bg-card/82 px-4 py-3 text-sm font-medium text-muted-foreground"
              >
                {topic}
              </li>
            ))}
          </ul>
        </section>

        <Card className="mt-16 rounded-[32px] border-border/70 bg-card/86 py-0 shadow-float">
          <CardContent className="p-6 sm:p-8">
            <p className="text-[11px] font-semibold tracking-[0.24em] text-muted-foreground uppercase">
              Kontakt
            </p>
            <h2 className="mt-3 font-display text-2xl font-bold tracking-[-0.04em] text-balance text-foreground">
              Razgovor o praktičnoj primjeni AI-a
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-8 text-pretty text-muted-foreground">
              Ako pokušavaš uklopiti AI u vlastito pisanje, posao ili
              svakodnevni workflow, možeš mi se javiti i opisati što pokušavaš
              napraviti.
            </p>
            <Button
              asChild
              size="lg"
              className="glimmer-button cta-shadow mt-6 rounded-full px-6"
            >
              <a href={CONTACT_EMAIL}>
                Kontakt
                <Mail className="size-4" />
              </a>
            </Button>
          </CardContent>
        </Card>
      </main>
    </PageChrome>
  )
}

function HrHomePage() {
  useHrHomeMetadata()

  const sections = [
    {
      title: AI_SERIES_TITLE,
      description: AI_SERIES_DESCRIPTION,
      href: AI_SERIES_PATH,
      count: `${aiSeriesPosts.length} teksta`,
    },
    {
      title: BITCOIN_CORE_SERIES_TITLE,
      description: BITCOIN_CORE_SERIES_DESCRIPTION,
      href: BITCOIN_CORE_SERIES_PATH,
      count: `${hrBitcoinCorePosts.length} tekst`,
    },
  ]

  return (
    <PageChrome sectionHref={HR_HOME_PATH} sectionLabel={HR_HOME_TITLE}>
      <main
        id="main-content"
        className="relative mx-auto max-w-5xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20"
      >
        <section>
          <a
            href="/"
            className={`glimmer-button inline-flex min-h-10 items-center rounded-full border border-border/70 bg-background/82 px-4 text-sm font-medium text-muted-foreground backdrop-blur hover:bg-card hover:text-foreground ${liftHover}`}
          >
            Početna
          </a>
          <p className="mt-12 text-[11px] font-semibold tracking-[0.24em] text-muted-foreground uppercase">
            btcpavao.com/hr
          </p>
          <h1 className="mt-4 max-w-[14ch] font-display text-5xl leading-[0.94] font-bold tracking-[-0.06em] text-balance text-foreground sm:text-6xl">
            {HR_HOME_TITLE}
          </h1>
        </section>

        <section className="mt-16 border-t border-border/60 pt-16">
          <SectionHeader eyebrow="Sekcije" title="Odaberi temu" />
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {sections.map((section) => (
              <a
                key={section.href}
                href={section.href}
                className={`glimmer-button surface-shadow-soft rounded-[28px] bg-card/82 p-6 hover:bg-card sm:p-8 ${liftHover}`}
              >
                <span className="surface-ring inline-flex rounded-full bg-background/70 px-3 py-1 text-[11px] font-semibold tracking-[0.2em] text-muted-foreground uppercase">
                  {section.count}
                </span>
                <h2 className="mt-5 font-display text-3xl font-bold tracking-[-0.04em] text-balance text-foreground">
                  {section.title}
                </h2>
                <p className="mt-4 text-base leading-8 text-pretty text-muted-foreground">
                  {section.description}
                </p>
              </a>
            ))}
          </div>
        </section>
      </main>
    </PageChrome>
  )
}

function BitcoinCoreSeriesPage({
  language = "hr",
}: {
  language?: BitcoinCoreLanguage
}) {
  const isEnglish = language === "en"
  const posts = isEnglish ? enBitcoinCorePosts : hrBitcoinCorePosts
  const seriesPath = isEnglish
    ? EN_BITCOIN_CORE_SERIES_PATH
    : BITCOIN_CORE_SERIES_PATH

  useBitcoinCoreSeriesMetadata(language)

  return (
    <PageChrome
      sectionHref={seriesPath}
      sectionLabel={BITCOIN_CORE_SERIES_TITLE}
      language={language}
    >
      <main
        id="main-content"
        className="relative mx-auto max-w-5xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20"
      >
        <section className="bitcoin-core-series-intro">
          <div>
            <a
              href={isEnglish ? "/" : HR_HOME_PATH}
              className={`glimmer-button inline-flex min-h-10 items-center rounded-full border border-border/70 bg-background/82 px-4 text-sm font-medium text-muted-foreground backdrop-blur hover:bg-card hover:text-foreground ${liftHover}`}
            >
              {isEnglish ? "Home" : "Hrvatski tekstovi"}
            </a>
            <p className="mt-12 text-[11px] font-semibold tracking-[0.24em] text-muted-foreground uppercase">
              Bitcoin
            </p>
            <h1 className="mt-4 max-w-[12ch] font-display text-5xl leading-[0.94] font-bold tracking-[-0.06em] text-balance text-foreground sm:text-6xl">
              {BITCOIN_CORE_SERIES_TITLE}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-pretty text-muted-foreground">
              {isEnglish
                ? EN_BITCOIN_CORE_SERIES_DESCRIPTION
                : BITCOIN_CORE_SERIES_DESCRIPTION}
            </p>
          </div>

          <div className="bitcoin-core-series-logo">
            <img
              src="/bitcoin-logo.svg"
              alt="Bitcoin"
              width={160}
              height={160}
              decoding="async"
            />
          </div>
        </section>

        <section className="mt-16 border-t border-border/60 pt-16">
          <SectionHeader
            eyebrow={isEnglish ? "Published writing" : "Objavljeni tekstovi"}
            title="Bitcoin Core"
          />
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {posts.map((post) => (
              <SeriesCard key={post.href} post={post} />
            ))}
          </div>
        </section>
      </main>
    </PageChrome>
  )
}

function BitcoinCoreArticleVisual({
  number,
  language,
}: {
  number: number
  language: BitcoinCoreLanguage
}) {
  const visual = bitcoinCoreVisuals[number - 1]

  if (!visual) {
    throw new Error(`Nedostaje Bitcoin Core vizual ${number}.`)
  }

  return (
    <figure className="bitcoin-core-article-visual">
      <picture>
        <source
          media="(max-width: 840px)"
          srcSet={visual.smallSrc}
          type="image/webp"
        />
        <img
          src={visual.src}
          srcSet={`${visual.smallSrc} 840w, ${visual.src} 1122w`}
          sizes="(max-width: 840px) calc(100vw - 32px), 832px"
          alt={language === "en" ? visual.enAlt : visual.alt}
          width={1122}
          height={1402}
          loading="lazy"
          decoding="async"
        />
      </picture>
    </figure>
  )
}

function BitcoinCoreSectionHeading({
  heading,
  index,
}: {
  heading: Extract<BitcoinCoreArticleBlock, { type: "heading" }>
  index: number
}) {
  const icon = getBitcoinCoreHeadingIcon(heading)

  return (
    <div
      className="bitcoin-core-section-heading"
      key={`${heading.id}-${index}`}
    >
      <span className="bitcoin-core-section-pictogram" aria-hidden="true">
        {icon}
      </span>
      <h2 id={heading.id}>{heading.text}</h2>
    </div>
  )
}

function BitcoinCoreParagraph({
  text,
  language,
}: {
  text: string
  language: BitcoinCoreLanguage
}) {
  const isQuote = /^“.+”$/.test(text)

  return (
    <p
      className={
        isQuote
          ? "bitcoin-core-article-quote"
          : isBitcoinCoreLead(text, language)
            ? "bitcoin-core-article-lead"
            : undefined
      }
    >
      {isQuote ? (
        <em>{renderLinkedText(text)}</em>
      ) : isBitcoinCoreLead(text, language) ? (
        <strong>{renderLinkedText(text)}</strong>
      ) : (
        renderLinkedText(text)
      )}
    </p>
  )
}

function BitcoinCoreListItem({ text }: { text: string }) {
  const definitionParts = text.split(" = ")

  if (definitionParts.length === 2) {
    return (
      <>
        <strong>{definitionParts[0]}</strong>
        {` = ${definitionParts[1]}`}
      </>
    )
  }

  return renderLinkedText(text)
}

function BitcoinCoreBackToTop({
  language,
}: {
  language: BitcoinCoreLanguage
}) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    function updateVisibility() {
      setIsVisible(window.scrollY > 640)
    }

    updateVisibility()
    window.addEventListener("scroll", updateVisibility, { passive: true })

    return () => window.removeEventListener("scroll", updateVisibility)
  }, [])

  function scrollToTop() {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches

    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    })
  }

  return (
    <Button
      type="button"
      variant="outline"
      size="icon"
      className={`glimmer-button floating-top-button fixed right-4 bottom-4 z-50 inline-flex size-11 min-h-11 min-w-11 shrink-0 items-center justify-center rounded-full border border-border/70 bg-background/94 p-0 leading-none text-foreground shadow-soft transition-[opacity,transform,background-color,color,border-color,box-shadow] duration-300 ease-out hover:bg-card hover:text-foreground active:scale-[0.96] md:right-6 md:bottom-6 ${
        isVisible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-3 opacity-0"
      }`}
      style={{ bottom: "calc(env(safe-area-inset-bottom, 0px) + 1rem)" }}
      onClick={scrollToTop}
      aria-label={language === "en" ? "Back to top" : "Natrag na vrh"}
      title={language === "en" ? "Back to top" : "Natrag na vrh"}
      aria-hidden={!isVisible}
      tabIndex={isVisible ? 0 : -1}
    >
      <ArrowUp
        aria-hidden="true"
        className="relative z-10 size-4 shrink-0"
        strokeWidth={2.25}
      />
    </Button>
  )
}

function BitcoinCoreArticlePage({
  initialArticleSource = "",
  language = "hr",
}: {
  initialArticleSource?: string
  language?: BitcoinCoreLanguage
}) {
  const isEnglish = language === "en"
  const articleTitle = isEnglish
    ? EN_BITCOIN_CORE_ARTICLE_TITLE
    : BITCOIN_CORE_ARTICLE_TITLE
  const articleSubtitle = isEnglish
    ? EN_BITCOIN_CORE_ARTICLE_SUBTITLE
    : BITCOIN_CORE_ARTICLE_SUBTITLE
  const articleDisplayDate = isEnglish
    ? EN_BITCOIN_CORE_ARTICLE_DISPLAY_DATE
    : BITCOIN_CORE_ARTICLE_DISPLAY_DATE
  const seriesPath = isEnglish
    ? EN_BITCOIN_CORE_SERIES_PATH
    : BITCOIN_CORE_SERIES_PATH
  const counterpartPath = isEnglish
    ? BITCOIN_CORE_ENTROPY_ARTICLE_PATH
    : EN_BITCOIN_CORE_ENTROPY_ARTICLE_PATH

  useBitcoinCoreArticleMetadata(language)
  useReadingProgress()
  const [articleSource, setArticleSource] = useState(initialArticleSource)

  useEffect(() => {
    if (articleSource) {
      return undefined
    }

    let isMounted = true

    const sourcePromise = isEnglish
      ? import("./bitcoin-core-article-en.txt?raw")
      : import("./bitcoin-core-article.txt?raw")

    sourcePromise.then((module) => {
      if (isMounted) {
        setArticleSource(module.default)
      }
    })

    return () => {
      isMounted = false
    }
  }, [articleSource, isEnglish])

  const bitcoinCoreArticle = articleSource
    ? parseBitcoinCoreArticle(articleSource, language)
    : {
        title: articleTitle,
        subtitle: articleSubtitle,
        blocks: [] as BitcoinCoreArticleBlock[],
      }

  if (
    bitcoinCoreArticle.title !== articleTitle ||
    bitcoinCoreArticle.subtitle !== articleSubtitle
  ) {
    throw new Error(
      isEnglish
        ? "The Bitcoin Core article title or subtitle does not match its approved copy."
        : "Naslov ili podnaslov Bitcoin Core članka nije nepromijenjen."
    )
  }

  const bitcoinCoreArticleHeadings = bitcoinCoreArticle.blocks.filter(
    (block): block is Extract<BitcoinCoreArticleBlock, { type: "heading" }> =>
      block.type === "heading" && block.numbered
  )
  const bitcoinCoreArticleReadingMinutes = estimateReadingMinutes([
    bitcoinCoreArticle.title,
    bitcoinCoreArticle.subtitle,
    ...bitcoinCoreArticle.blocks.flatMap((block) => {
      if (block.type === "visual") return []
      if (block.type === "list") return block.items
      return [block.text]
    }),
  ])

  return (
    <PageChrome
      sectionHref={seriesPath}
      sectionLabel={BITCOIN_CORE_SERIES_TITLE}
      language={language}
    >
      <div className="reading-progress" aria-hidden="true" />
      <main id="main-content" className="relative pb-20">
        <article>
          <header className="article-hero-bleed bitcoin-core-article-hero">
            <picture className="article-hero-background">
              <img
                src={BITCOIN_CORE_ARTICLE_HERO_IMAGE}
                srcSet={`${BITCOIN_CORE_ARTICLE_HERO_IMAGE_SMALL} 840w, ${BITCOIN_CORE_ARTICLE_HERO_IMAGE} 1200w`}
                sizes="(max-width: 760px) 100vw, 60vw"
                alt={
                  isEnglish
                    ? "A click on a laptop starts the creation of a Bitcoin Core wallet from multiple sources of randomness."
                    : "Klik na laptopu pokreće stvaranje Bitcoin Core walleta iz više izvora slučajnosti."
                }
                width={1200}
                height={900}
                decoding="async"
                fetchPriority="high"
              />
            </picture>

            <div className="article-hero-content">
              <div className="article-hero-copy">
                <a
                  href={seriesPath}
                  className={`glimmer-button inline-flex min-h-10 items-center rounded-full border border-border/70 bg-background/82 px-4 text-sm font-medium text-muted-foreground backdrop-blur hover:bg-card hover:text-foreground ${liftHover}`}
                >
                  Bitcoin Core
                </a>

                <div className="mt-12 flex flex-wrap items-center gap-2 text-[11px] font-semibold text-muted-foreground uppercase">
                  <span className="surface-ring rounded-full bg-background/78 px-3 py-1 backdrop-blur">
                    Bitcoin Core
                  </span>
                  <span className="surface-ring rounded-full bg-background/78 px-3 py-1 backdrop-blur">
                    {isEnglish ? "English" : "Hrvatski"}
                  </span>
                  <a
                    href={counterpartPath}
                    className="surface-ring inline-flex min-h-10 items-center rounded-full bg-background/78 px-3 py-1 backdrop-blur transition-[background-color,color,box-shadow,transform] duration-300 hover:bg-card hover:text-foreground active:scale-[0.96]"
                    hrefLang={isEnglish ? "hr" : "en"}
                  >
                    {isEnglish ? "Croatian version" : "English version"}
                  </a>
                  <a
                    href="/"
                    rel="author"
                    className="surface-ring rounded-full bg-background/78 px-3 py-1 backdrop-blur hover:bg-card hover:text-foreground"
                  >
                    Pavao Pahljina
                  </a>
                  <time
                    className="surface-ring rounded-full bg-background/78 px-3 py-1 backdrop-blur"
                    dateTime={BITCOIN_CORE_ARTICLE_DATE}
                  >
                    {articleDisplayDate}
                  </time>
                  <span className="surface-ring rounded-full bg-background/78 px-3 py-1 backdrop-blur">
                    {bitcoinCoreArticleReadingMinutes}{" "}
                    {isEnglish ? "min read" : "min čitanja"}
                  </span>
                </div>

                <h1 className="mt-8 max-w-[18ch] font-display text-4xl leading-[0.98] font-bold text-balance text-foreground sm:text-6xl">
                  {bitcoinCoreArticle.title}
                </h1>
                <p className="mt-6 max-w-xl text-xl leading-8 text-pretty text-muted-foreground sm:text-2xl sm:leading-9">
                  {bitcoinCoreArticle.subtitle}
                </p>
              </div>
            </div>
          </header>

          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <nav
              aria-label={isEnglish ? "Article contents" : "Sadržaj članka"}
              className="article-shell article-toc surface-shadow-soft mt-10 rounded-[24px] bg-card/78 p-4 sm:p-6"
            >
              <p className="text-[11px] font-semibold text-muted-foreground uppercase">
                {isEnglish ? "Contents" : "Sadržaj"}
              </p>
              <div className="mt-3 grid gap-2 sm:grid-cols-2">
                {bitcoinCoreArticleHeadings.map((heading) => (
                  <a
                    key={heading.id}
                    href={`#${heading.id}`}
                    className={`glimmer-button surface-ring rounded-2xl bg-background/64 px-4 py-3 text-sm font-medium text-muted-foreground hover:bg-card hover:text-foreground ${liftHover}`}
                  >
                    {heading.text}
                  </a>
                ))}
              </div>
            </nav>

            <div className="article-shell learning-article-body bitcoin-core-article-body mt-10">
              {bitcoinCoreArticle.blocks.map((block, index) => {
                if (block.type === "heading") {
                  return (
                    <BitcoinCoreSectionHeading
                      key={`${block.id}-${index}`}
                      heading={block}
                      index={index}
                    />
                  )
                }

                if (block.type === "list") {
                  return (
                    <ul className="bitcoin-core-list" key={`list-${index}`}>
                      {block.items.map((item, itemIndex) => (
                        <li key={`${item}-${itemIndex}`}>
                          <BitcoinCoreListItem text={item} />
                        </li>
                      ))}
                    </ul>
                  )
                }

                if (block.type === "visual") {
                  return (
                    <BitcoinCoreArticleVisual
                      key={`visual-${block.number}`}
                      number={block.number}
                      language={language}
                    />
                  )
                }

                return (
                  <BitcoinCoreParagraph
                    key={`paragraph-${index}`}
                    text={block.text}
                    language={language}
                  />
                )
              })}
              {!articleSource ? (
                <p>{isEnglish ? "Loading article…" : "Učitavanje članka…"}</p>
              ) : null}
            </div>

            <nav
              aria-label={isEnglish ? "Related content" : "Povezani sadržaj"}
              className="article-shell mt-14 grid gap-3 sm:grid-cols-2"
            >
              <a
                href={seriesPath}
                className={`glimmer-button surface-shadow-soft rounded-[24px] bg-card/82 p-5 hover:bg-card sm:p-6 ${liftHover}`}
              >
                <span className="text-[11px] font-semibold tracking-[0.2em] text-muted-foreground uppercase">
                  {isEnglish ? "Section" : "Sekcija"}
                </span>
                <span className="mt-3 block font-display text-xl font-bold tracking-[-0.04em] text-balance text-foreground">
                  Bitcoin Core
                </span>
              </a>
              <a
                href={isEnglish ? "/" : HR_HOME_PATH}
                className={`glimmer-button surface-shadow-soft rounded-[24px] bg-card/82 p-5 hover:bg-card sm:p-6 ${liftHover}`}
              >
                <span className="text-[11px] font-semibold tracking-[0.2em] text-muted-foreground uppercase">
                  {isEnglish ? "English" : "Hrvatski"}
                </span>
                <span className="mt-3 block font-display text-xl font-bold tracking-[-0.04em] text-balance text-foreground">
                  {isEnglish ? "All English writing" : "Svi hrvatski tekstovi"}
                </span>
              </a>
            </nav>
          </div>
        </article>
      </main>
      <BitcoinCoreBackToTop language={language} />
    </PageChrome>
  )
}

function LongRoadArticleVisual({ number }: { number: number }) {
  const visual = longRoadVisuals[number - 1]

  if (!visual) {
    throw new Error(`Missing The Long Road visual ${number}.`)
  }

  return (
    <figure className="long-road-article-visual">
      <picture>
        <source
          media="(max-width: 840px)"
          srcSet={visual.smallSrc}
          type="image/webp"
        />
        <img
          src={visual.src}
          srcSet={`${visual.smallSrc} 840w, ${visual.src} ${visual.width}w`}
          sizes="(max-width: 840px) calc(100vw - 32px), 1152px"
          alt={visual.alt}
          width={visual.width}
          height={visual.height}
          loading="lazy"
          decoding="async"
        />
      </picture>
    </figure>
  )
}

function LongRoadSectionHeading({
  heading,
  index,
}: {
  heading: Extract<LongRoadArticleBlock, { type: "heading" }>
  index: number
}) {
  const icon =
    bitcoinCoreHeadingIcons[index % bitcoinCoreHeadingIcons.length] ??
    bitcoinCoreFallbackIcon

  return (
    <div className="bitcoin-core-section-heading">
      <span className="bitcoin-core-section-pictogram" aria-hidden="true">
        {icon}
      </span>
      <h2 id={heading.id}>{heading.text}</h2>
    </div>
  )
}

function LongRoadArticlePage({
  initialArticleSource = "",
}: {
  initialArticleSource?: string
}) {
  useLongRoadArticleMetadata()
  useReadingProgress()
  const [articleSource, setArticleSource] = useState(initialArticleSource)

  useEffect(() => {
    if (articleSource) {
      return undefined
    }

    let isMounted = true

    import("./long-road-back-to-bitcoin-core.md?raw").then((module) => {
      if (isMounted) {
        setArticleSource(module.default)
      }
    })

    return () => {
      isMounted = false
    }
  }, [articleSource])

  const article = articleSource
    ? parseLongRoadArticle(articleSource)
    : {
        title: LONG_ROAD_ARTICLE_TITLE,
        subtitle: LONG_ROAD_ARTICLE_SUBTITLE,
        blocks: [] as LongRoadArticleBlock[],
      }

  if (
    article.title !== LONG_ROAD_ARTICLE_TITLE ||
    article.subtitle !== LONG_ROAD_ARTICLE_SUBTITLE
  ) {
    throw new Error(
      "The Long Road article title or subtitle does not match its approved copy."
    )
  }

  const headings = article.blocks.filter(
    (block): block is Extract<LongRoadArticleBlock, { type: "heading" }> =>
      block.type === "heading"
  )
  const readingMinutes = estimateReadingMinutes([
    article.title,
    article.subtitle,
    ...article.blocks.flatMap((block) => {
      if (block.type === "visual" || block.type === "separator") return []
      if (block.type === "list") return block.items
      return [block.text]
    }),
  ])

  return (
    <PageChrome
      sectionHref={EN_BITCOIN_CORE_SERIES_PATH}
      sectionLabel={BITCOIN_CORE_SERIES_TITLE}
      language="en"
    >
      <div className="reading-progress" aria-hidden="true" />
      <main id="main-content" className="relative pb-20">
        <article>
          <header className="article-hero-bleed bitcoin-core-article-hero long-road-cover-hero">
            <picture className="article-hero-background">
              <source
                media="(max-width: 840px)"
                srcSet={LONG_ROAD_ARTICLE_HERO_IMAGE_SMALL}
                type="image/webp"
              />
              <img
                src={LONG_ROAD_ARTICLE_HERO_IMAGE}
                srcSet={`${LONG_ROAD_ARTICLE_HERO_IMAGE_SMALL} 840w, ${LONG_ROAD_ARTICLE_HERO_IMAGE} 1774w`}
                sizes="(max-width: 760px) 100vw, 100vw"
                alt="A traveler leaves a limestone maze for a transparent Bitcoin Core machine overlooking the Adriatic Sea."
                width={1774}
                height={887}
                decoding="async"
                fetchPriority="high"
              />
            </picture>

            <div className="article-hero-content">
              <div className="article-hero-copy">
                <a
                  href={EN_BITCOIN_CORE_SERIES_PATH}
                  className={`glimmer-button inline-flex min-h-10 items-center rounded-full border border-border/70 bg-background/82 px-4 text-sm font-medium text-muted-foreground backdrop-blur hover:bg-card hover:text-foreground ${liftHover}`}
                >
                  Bitcoin Core
                </a>

                <div className="mt-12 flex flex-wrap items-center gap-2 text-[11px] font-semibold text-muted-foreground uppercase">
                  <span className="surface-ring rounded-full bg-background/78 px-3 py-1 backdrop-blur">
                    Bitcoin Core
                  </span>
                  <span className="surface-ring rounded-full bg-background/78 px-3 py-1 backdrop-blur">
                    English
                  </span>
                  <a
                    href="/"
                    rel="author"
                    className="surface-ring inline-flex min-h-10 items-center rounded-full bg-background/78 px-3 py-1 backdrop-blur transition-[background-color,color,box-shadow,transform] duration-300 hover:bg-card hover:text-foreground active:scale-[0.96]"
                  >
                    Pavao Pahljina
                  </a>
                  <time
                    className="surface-ring rounded-full bg-background/78 px-3 py-1 backdrop-blur"
                    dateTime={LONG_ROAD_ARTICLE_DATE}
                  >
                    {LONG_ROAD_ARTICLE_DISPLAY_DATE}
                  </time>
                  <span className="surface-ring rounded-full bg-background/78 px-3 py-1 backdrop-blur">
                    {readingMinutes} min read
                  </span>
                </div>

                <h1 className="mt-8 max-w-[12ch] font-display text-5xl leading-[0.94] font-bold tracking-[-0.06em] text-balance text-foreground sm:text-7xl">
                  {article.title}
                </h1>
                <p className="mt-7 max-w-xl text-xl leading-8 text-pretty text-muted-foreground sm:text-2xl sm:leading-9">
                  {article.subtitle}
                </p>
              </div>
            </div>
          </header>

          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <nav
              aria-label="Article contents"
              className="article-shell article-toc surface-shadow-soft mt-10 rounded-[24px] bg-card/78 p-4 sm:p-6"
            >
              <p className="text-[11px] font-semibold text-muted-foreground uppercase">
                Contents
              </p>
              <div className="mt-3 grid gap-2 sm:grid-cols-2">
                {headings.map((heading) => (
                  <a
                    key={heading.id}
                    href={`#${heading.id}`}
                    className={`glimmer-button surface-ring rounded-2xl bg-background/64 px-4 py-3 text-sm font-medium text-muted-foreground hover:bg-card hover:text-foreground ${liftHover}`}
                  >
                    {heading.text}
                  </a>
                ))}
              </div>
            </nav>

            <div className="article-shell learning-article-body bitcoin-core-article-body long-road-article-body mt-10">
              {article.blocks.map((block, index) => {
                if (block.type === "heading") {
                  return (
                    <LongRoadSectionHeading
                      key={`${block.id}-${index}`}
                      heading={block}
                      index={headings.findIndex(
                        (heading) => heading.id === block.id
                      )}
                    />
                  )
                }

                if (block.type === "list") {
                  return (
                    <ul className="bitcoin-core-list" key={`list-${index}`}>
                      {block.items.map((item, itemIndex) => (
                        <li key={`${item}-${itemIndex}`}>
                          {renderLongRoadInline(item)}
                        </li>
                      ))}
                    </ul>
                  )
                }

                if (block.type === "quote") {
                  return (
                    <blockquote
                      className="long-road-article-quote"
                      key={`quote-${index}`}
                    >
                      <p>{renderLongRoadInline(block.text)}</p>
                    </blockquote>
                  )
                }

                if (block.type === "visual") {
                  return (
                    <LongRoadArticleVisual
                      key={`visual-${block.number}`}
                      number={block.number}
                    />
                  )
                }

                if (block.type === "separator") {
                  return (
                    <hr
                      className="long-road-article-separator"
                      key={`separator-${index}`}
                    />
                  )
                }

                return (
                  <p key={`paragraph-${index}`}>
                    {renderLongRoadInline(block.text)}
                  </p>
                )
              })}
              {!articleSource ? <p>Loading article…</p> : null}
            </div>

            <nav
              aria-label="Related content"
              className="article-shell mt-14 grid gap-3 sm:grid-cols-2"
            >
              <a
                href={EN_BITCOIN_CORE_SERIES_PATH}
                className={`glimmer-button surface-shadow-soft rounded-[24px] bg-card/82 p-5 hover:bg-card sm:p-6 ${liftHover}`}
              >
                <span className="text-[11px] font-semibold tracking-[0.2em] text-muted-foreground uppercase">
                  Section
                </span>
                <span className="mt-3 block font-display text-xl font-bold tracking-[-0.04em] text-balance text-foreground">
                  Bitcoin Core
                </span>
              </a>
              <a
                href="/"
                className={`glimmer-button surface-shadow-soft rounded-[24px] bg-card/82 p-5 hover:bg-card sm:p-6 ${liftHover}`}
              >
                <span className="text-[11px] font-semibold tracking-[0.2em] text-muted-foreground uppercase">
                  English
                </span>
                <span className="mt-3 block font-display text-xl font-bold tracking-[-0.04em] text-balance text-foreground">
                  Back to the homepage
                </span>
              </a>
            </nav>
          </div>
        </article>
      </main>
      <BitcoinCoreBackToTop language="en" />
    </PageChrome>
  )
}

type WorkflowBlock =
  | { type: "p"; text: string }
  | { type: "note"; text: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "workflow" }

function WorkflowSteps({ steps }: { steps: string[] }) {
  return (
    <ol
      className="my-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4"
      aria-label="Workflow od ideje do objave"
    >
      {steps.map((step, index) => (
        <li
          key={step}
          className="surface-shadow-subtle grid min-h-24 content-center rounded-[20px] bg-card/86 p-4"
        >
          <span className="grid size-7 place-items-center rounded-full bg-primary/12 text-xs font-bold text-primary">
            {index + 1}
          </span>
          <span className="mt-3 font-display text-lg font-bold tracking-[-0.03em] text-foreground">
            {step}
          </span>
        </li>
      ))}
    </ol>
  )
}

function WorkflowSectionVisual({
  visual,
}: {
  visual: (typeof workflowSectionVisuals)[number]
}) {
  return (
    <figure className="surface-shadow-soft my-7 overflow-hidden rounded-[28px] bg-card/82">
      <picture>
        <img
          src={visual.src}
          srcSet={`${visual.smallSrc} 840w, ${visual.src} 1672w`}
          sizes="(max-width: 768px) calc(100vw - 2rem), 48rem"
          alt={visual.alt}
          width={1672}
          height={941}
          loading="lazy"
          decoding="async"
          className="block aspect-[16/9] w-full object-cover"
        />
      </picture>
    </figure>
  )
}

function WorkflowArticleBlock({
  block,
  steps,
}: {
  block: WorkflowBlock
  steps: string[]
}) {
  if (block.type === "workflow") {
    return <WorkflowSteps steps={steps} />
  }

  if (block.type === "h3") {
    return (
      <h3 className="pt-2 font-display text-2xl font-bold tracking-[-0.04em] text-balance text-foreground">
        {block.text}
      </h3>
    )
  }

  if (block.type === "note") {
    return (
      <aside className="surface-shadow-subtle rounded-[22px] bg-card/82 p-4 text-base leading-7 text-muted-foreground">
        {renderLinkedText(block.text)}
      </aside>
    )
  }

  if (block.type === "ul" || block.type === "ol") {
    const List = block.type
    return (
      <List className="grid gap-3 pl-6 text-base leading-8 text-muted-foreground marker:text-primary">
        {block.items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </List>
    )
  }

  return <p>{renderLinkedText(block.text)}</p>
}

function WorkflowArticlePage({
  initialArticleData = null,
}: {
  initialArticleData?: ArticleDataModule | null
}) {
  useWorkflowArticleMetadata()
  useReadingProgress()
  const [articleData, setArticleData] = useState<ArticleDataModule | null>(
    initialArticleData
  )

  useEffect(() => {
    if (articleData) {
      return undefined
    }

    let isMounted = true

    import("./article-data").then((data) => {
      if (isMounted) {
        setArticleData(data)
      }
    })

    return () => {
      isMounted = false
    }
  }, [articleData])

  const intro = articleData?.aiWorkflowArticleIntro ?? []
  const sections = articleData?.aiWorkflowArticleSections ?? []
  const steps = articleData?.aiWorkflowSteps ?? []
  const readingMinutes = articleData
    ? estimateReadingMinutes([
        ...intro,
        ...sections.flatMap((section) => [
          section.heading,
          ...section.blocks.flatMap((block) => {
            if ("text" in block && typeof block.text === "string") {
              return [block.text]
            }

            if ("items" in block && Array.isArray(block.items)) {
              return block.items
            }

            return []
          }),
        ]),
      ])
    : null

  return (
    <PageChrome>
      <div className="reading-progress" aria-hidden="true" />
      <main id="main-content" className="relative pb-20">
        <article>
          <header className="article-hero-bleed">
            <picture className="article-hero-background">
              <img
                src={ARTICLE_HERO_IMAGE}
                srcSet={`${ARTICLE_HERO_IMAGE_SMALL} 840w, ${ARTICLE_HERO_IMAGE} 1672w`}
                sizes="(max-width: 760px) 100vw, 60vw"
                alt="Laptop, mobitel, bilježnica, kava i rukopis knjige na radnom stolu"
                width={1672}
                height={941}
                decoding="async"
                fetchPriority="high"
              />
            </picture>

            <div className="article-hero-content">
              <div className="article-hero-copy">
                <a
                  href={AI_SERIES_PATH}
                  className={`glimmer-button inline-flex min-h-10 items-center rounded-full border border-border/70 bg-background/82 px-4 text-sm font-medium text-muted-foreground backdrop-blur hover:bg-card hover:text-foreground ${liftHover}`}
                >
                  AI u praksi
                </a>

                <div className="mt-12 flex flex-wrap items-center gap-2 text-[11px] font-semibold text-muted-foreground uppercase">
                  <span className="surface-ring rounded-full bg-background/78 px-3 py-1 backdrop-blur">
                    AI u praksi
                  </span>
                  <span className="surface-ring rounded-full bg-background/78 px-3 py-1 backdrop-blur">
                    Hrvatski
                  </span>
                  <a
                    href="/"
                    rel="author"
                    className="surface-ring rounded-full bg-background/78 px-3 py-1 backdrop-blur hover:bg-card hover:text-foreground"
                  >
                    Pavao Pahljina
                  </a>
                  <time
                    className="surface-ring rounded-full bg-background/78 px-3 py-1 backdrop-blur"
                    dateTime={WORKFLOW_ARTICLE_DATE}
                  >
                    {WORKFLOW_ARTICLE_DISPLAY_DATE}
                  </time>
                  {readingMinutes ? (
                    <span className="surface-ring rounded-full bg-background/78 px-3 py-1 backdrop-blur">
                      {readingMinutes} min čitanja
                    </span>
                  ) : null}
                </div>

                <h1 className="mt-8 max-w-[14ch] font-display text-5xl leading-[0.98] font-bold text-balance text-foreground sm:text-6xl">
                  {WORKFLOW_ARTICLE_TITLE}
                </h1>
                <p className="mt-6 max-w-xl text-xl leading-8 text-pretty text-muted-foreground sm:text-2xl sm:leading-9">
                  Kako ideja nastala u šetnji prolazi kroz transkripciju,
                  razgovor s ChatGPT-em i implementaciju u Codexu dok ne postane
                  nešto stvarno.
                </p>
              </div>
            </div>
          </header>

          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="article-shell mt-10 space-y-6 text-lg leading-8 text-muted-foreground">
              {intro.map((paragraph) => (
                <p key={paragraph}>{renderLinkedText(paragraph)}</p>
              ))}
            </div>

            <nav
              aria-label="Sadržaj članka"
              className="article-shell article-toc surface-shadow-soft mt-10 rounded-[24px] bg-card/78 p-4 sm:p-6"
            >
              <p className="text-[11px] font-semibold text-muted-foreground uppercase">
                Sadržaj
              </p>
              <div className="mt-3 grid gap-2 sm:grid-cols-2">
                {sections.map((section) => (
                  <a
                    key={section.heading}
                    href={`#${toSectionId(section.heading)}`}
                    className={`glimmer-button surface-ring rounded-2xl bg-background/64 px-4 py-3 text-sm font-medium text-muted-foreground hover:bg-card hover:text-foreground ${liftHover}`}
                  >
                    {section.heading}
                  </a>
                ))}
              </div>
            </nav>

            <div className="article-shell mt-10 space-y-10 text-lg leading-8 text-muted-foreground">
              {sections.map((section) => {
                const sectionVisual = getWorkflowSectionVisual(section.heading)

                return (
                  <section key={section.heading} className="space-y-6">
                    <h2
                      id={toSectionId(section.heading)}
                      className="pt-4 font-display text-3xl font-bold text-balance text-foreground"
                    >
                      {section.heading}
                    </h2>
                    {sectionVisual ? (
                      <WorkflowSectionVisual visual={sectionVisual} />
                    ) : null}
                    {section.blocks.map((block, index) => (
                      <WorkflowArticleBlock
                        key={`${section.heading}-${index}`}
                        block={block as WorkflowBlock}
                        steps={steps}
                      />
                    ))}
                  </section>
                )
              })}
            </div>

            <nav
              aria-label="Povezani članci"
              className="article-shell mt-14 grid gap-3 sm:grid-cols-2"
            >
              <a
                href={ARTICLE_PATH}
                className={`glimmer-button surface-shadow-soft rounded-[24px] bg-card/82 p-5 hover:bg-card ${liftHover}`}
              >
                <span className="text-[11px] font-semibold tracking-[0.2em] text-muted-foreground uppercase">
                  Prethodni tekst
                </span>
                <span className="mt-3 block font-display text-xl font-bold tracking-[-0.04em] text-balance text-foreground">
                  {ARTICLE_TITLE}
                </span>
              </a>
              <a
                href={LEARNING_ARTICLE_PATH}
                className={`glimmer-button surface-shadow-soft rounded-[24px] bg-card/82 p-5 hover:bg-card ${liftHover}`}
              >
                <span className="text-[11px] font-semibold tracking-[0.2em] text-muted-foreground uppercase">
                  Sljedeći tekst
                </span>
                <span className="mt-3 block font-display text-xl font-bold tracking-[-0.04em] text-balance text-foreground">
                  {LEARNING_ARTICLE_TITLE}
                </span>
              </a>
            </nav>
          </div>
        </article>
      </main>
    </PageChrome>
  )
}

function LearningArticlePage({
  initialArticleHtml = "",
}: {
  initialArticleHtml?: string
}) {
  useLearningArticleMetadata()
  useReadingProgress()
  const [articleHtml, setArticleHtml] = useState(initialArticleHtml)

  useEffect(() => {
    if (articleHtml) {
      return undefined
    }

    let isMounted = true

    import("./learning-article.html?raw").then((module) => {
      if (isMounted) {
        setArticleHtml(module.default)
      }
    })

    return () => {
      isMounted = false
    }
  }, [articleHtml])

  return (
    <PageChrome>
      <div className="reading-progress" aria-hidden="true" />
      <main id="main-content" className="relative pb-20">
        <article>
          <header className="article-hero-bleed">
            <picture className="article-hero-background">
              <img
                src={LEARNING_ARTICLE_HERO_IMAGE}
                srcSet={`${LEARNING_ARTICLE_HERO_IMAGE_SMALL} 840w, ${LEARNING_ARTICLE_HERO_IMAGE} 1672w`}
                sizes="(max-width: 760px) 100vw, 60vw"
                alt="Radni stol s matematičkim bilješkama, grafovima, bilježnicom i laptopom s prikazom Bitcoinove cijene"
                width={1672}
                height={941}
                decoding="async"
                fetchPriority="high"
              />
            </picture>

            <div className="article-hero-content">
              <div className="article-hero-copy">
                <a
                  href={AI_SERIES_PATH}
                  className={`glimmer-button inline-flex min-h-10 items-center rounded-full border border-border/70 bg-background/82 px-4 text-sm font-medium text-muted-foreground backdrop-blur hover:bg-card hover:text-foreground ${liftHover}`}
                >
                  AI u praksi
                </a>

                <div className="mt-12 flex flex-wrap items-center gap-2 text-[11px] font-semibold text-muted-foreground uppercase">
                  <span className="surface-ring rounded-full bg-background/78 px-3 py-1 backdrop-blur">
                    AI u praksi
                  </span>
                  <span className="surface-ring rounded-full bg-background/78 px-3 py-1 backdrop-blur">
                    Hrvatski
                  </span>
                  <a
                    href="/"
                    rel="author"
                    className="surface-ring rounded-full bg-background/78 px-3 py-1 backdrop-blur hover:bg-card hover:text-foreground"
                  >
                    Pavao Pahljina
                  </a>
                  <time
                    className="surface-ring rounded-full bg-background/78 px-3 py-1 backdrop-blur"
                    dateTime={LEARNING_ARTICLE_DATE}
                  >
                    {LEARNING_ARTICLE_DISPLAY_DATE}
                  </time>
                  <span className="surface-ring rounded-full bg-background/78 px-3 py-1 backdrop-blur">
                    15 min čitanja
                  </span>
                </div>

                <h1 className="mt-8 max-w-[16ch] font-display text-5xl leading-[0.96] font-bold text-balance text-foreground sm:text-6xl">
                  {LEARNING_ARTICLE_TITLE}
                </h1>
                <p className="mt-6 max-w-xl text-xl leading-8 text-pretty text-muted-foreground sm:text-2xl sm:leading-9">
                  Od pogrešnog odgovora o potencijama do interaktivnog grafa i
                  H-time kalkulatora: kako sam AI koristio kao učitelja,
                  istraživačkog pomoćnika i alat za izgradnju.
                </p>
              </div>
            </div>
          </header>

          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <nav
              aria-label="Sadržaj članka"
              className="article-shell article-toc surface-shadow-soft mt-10 rounded-[24px] bg-card/78 p-4 sm:p-6"
            >
              <p className="text-[11px] font-semibold text-muted-foreground uppercase">
                Sadržaj
              </p>
              <div className="mt-3 grid gap-2 sm:grid-cols-2">
                {learningArticleHeadings.map((heading) => (
                  <a
                    key={heading.id}
                    href={`#${heading.id}`}
                    className={`glimmer-button surface-ring rounded-2xl bg-background/64 px-4 py-3 text-sm font-medium text-muted-foreground hover:bg-card hover:text-foreground ${liftHover}`}
                  >
                    {heading.title}
                  </a>
                ))}
              </div>
            </nav>

            {articleHtml ? (
              <div
                className="article-shell learning-article-body mt-10"
                dangerouslySetInnerHTML={{ __html: articleHtml }}
              />
            ) : (
              <p className="article-shell mt-10 text-lg text-muted-foreground">
                Učitavanje članka…
              </p>
            )}

            <nav
              aria-label="Povezani članci"
              className="article-shell mt-14 grid gap-3 sm:grid-cols-2"
            >
              <a
                href={WORKFLOW_ARTICLE_PATH}
                className={`glimmer-button surface-shadow-soft rounded-[24px] bg-card/82 p-4 hover:bg-card sm:p-6 ${liftHover}`}
              >
                <span className="text-[11px] font-semibold tracking-[0.2em] text-muted-foreground uppercase">
                  Prethodni tekst
                </span>
                <span className="mt-3 block font-display text-xl font-bold tracking-[-0.04em] text-balance text-foreground">
                  {WORKFLOW_ARTICLE_TITLE}
                </span>
              </a>
              <a
                href={AI_SERIES_PATH}
                className={`glimmer-button surface-shadow-soft rounded-[24px] bg-card/82 p-4 hover:bg-card sm:p-6 ${liftHover}`}
              >
                <span className="text-[11px] font-semibold tracking-[0.2em] text-muted-foreground uppercase">
                  Serijal
                </span>
                <span className="mt-3 block font-display text-xl font-bold tracking-[-0.04em] text-balance text-foreground">
                  Svi tekstovi iz serijala
                </span>
              </a>
            </nav>
          </div>
        </article>
      </main>
    </PageChrome>
  )
}

function HomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [showBackToTop, setShowBackToTop] = useState(false)
  const firstMobileLinkRef = useRef<HTMLAnchorElement | null>(null)
  const mobileMenuButtonRef = useRef<HTMLButtonElement | null>(null)

  useEffect(() => {
    function handleKeydown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setMobileMenuOpen((isOpen) => {
          if (isOpen) {
            mobileMenuButtonRef.current?.focus()
          }

          return false
        })
      }
    }

    function handleResize() {
      if (window.innerWidth >= 1024) {
        setMobileMenuOpen(false)
      }
    }

    function handleScroll() {
      setShowBackToTop(window.scrollY > 320)
    }

    window.addEventListener("keydown", handleKeydown)
    window.addEventListener("resize", handleResize)
    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()

    return () => {
      window.removeEventListener("keydown", handleKeydown)
      window.removeEventListener("resize", handleResize)
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  useEffect(() => {
    if (!mobileMenuOpen) {
      return
    }

    firstMobileLinkRef.current?.focus()
  }, [mobileMenuOpen])

  function scrollToTop() {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches

    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    })
  }

  return (
    <div
      id="top"
      className="relative isolate min-h-screen overflow-x-clip bg-background text-foreground"
    >
      <SkipLink label="Skip to content" />
      <div
        aria-hidden="true"
        className="page-atmosphere pointer-events-none absolute inset-0"
      />
      <div
        aria-hidden="true"
        className="page-grid pointer-events-none absolute inset-0"
      />
      <header className="z-40 border-b border-border/60 bg-background/92 md:sticky md:top-0 md:bg-background/78 md:backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <a
            className={`font-display text-base font-bold tracking-[-0.04em] ${subtleReveal}`}
            href="#top"
          >
            Pavao Pahljina
          </a>

          <nav className="hidden items-center gap-1 lg:flex">
            {sectionLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`glimmer-button inline-flex h-10 items-center justify-center rounded-full px-4 text-sm font-medium text-muted-foreground transition-[background-color,color,border-color,box-shadow,transform] duration-300 hover:bg-card/70 hover:text-foreground ${liftHover}`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <div className="hidden items-center gap-2 lg:flex">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`glimmer-button inline-flex h-10 min-h-10 shrink-0 items-center justify-center rounded-full border border-border/70 bg-background/80 px-4 text-sm leading-none font-medium text-muted-foreground transition-[background-color,color,border-color,box-shadow,transform] duration-300 hover:bg-card hover:text-foreground ${liftHover}`}
                >
                  {link.label}
                </a>
              ))}
            </div>

            <ThemeToggle />

            <Button
              ref={mobileMenuButtonRef}
              variant="outline"
              size="icon"
              className={`glimmer-button inline-flex size-10 min-h-10 min-w-10 shrink-0 items-center justify-center rounded-full border-border/70 bg-background/85 p-0 leading-none lg:hidden ${liftHover}`}
              onClick={() => setMobileMenuOpen((open) => !open)}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-nav"
              aria-label={
                mobileMenuOpen ? "Close navigation" : "Open navigation"
              }
            >
              <span className="theme-toggle-icon-stack" aria-hidden="true">
                <X
                  className={`theme-toggle-icon ${
                    mobileMenuOpen
                      ? "theme-toggle-icon-active"
                      : "theme-toggle-icon-inactive"
                  }`}
                />
                <Menu
                  className={`theme-toggle-icon ${
                    mobileMenuOpen
                      ? "theme-toggle-icon-inactive"
                      : "theme-toggle-icon-active"
                  }`}
                />
              </span>
            </Button>
          </div>
        </div>

        {mobileMenuOpen ? (
          <nav
            id="mobile-nav"
            aria-label="Mobile navigation"
            className="mx-auto max-w-6xl px-4 pb-4 lg:hidden"
          >
            <Card
              className={`overflow-hidden rounded-[28px] border-border/70 bg-card/95 py-0 shadow-soft ${itemReveal}`}
            >
              <CardContent className="grid gap-3 p-4">
                <div className="grid gap-2">
                  {sectionLinks.map((link) => (
                    <a
                      key={link.href}
                      ref={
                        link.href === sectionLinks[0].href
                          ? firstMobileLinkRef
                          : undefined
                      }
                      href={link.href}
                      className={`glimmer-button rounded-2xl px-4 py-3 text-sm font-medium text-foreground transition-[background-color,color,border-color,box-shadow,transform] duration-300 hover:bg-background/70 ${liftHover}`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {link.label}
                    </a>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-2">
                  {socialLinks.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`glimmer-button rounded-2xl border border-border/70 bg-background/80 px-4 py-3 text-center text-sm font-medium text-muted-foreground transition-[background-color,color,border-color,box-shadow,transform] duration-300 hover:text-foreground ${liftHover}`}
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              </CardContent>
            </Card>
          </nav>
        ) : null}
      </header>

      <main
        id="main-content"
        className="mx-auto max-w-6xl px-4 pt-8 pb-20 sm:px-6 lg:px-8 lg:pt-12"
      >
        <section className="flex flex-col gap-8">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1.25fr)_360px] lg:items-start">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-card/80 px-4 py-2 text-[11px] font-semibold tracking-[0.24em] text-muted-foreground uppercase backdrop-blur">
                <span className="size-2 rounded-full bg-primary" />
                Pavao Pahljina
              </div>

              <div className="space-y-5">
                <p className="text-sm font-medium tracking-[0.24em] text-muted-foreground uppercase">
                  Bitcoin Standard Advisory
                </p>
                <h1 className="max-w-[11ch] font-display text-4xl leading-[0.95] font-bold tracking-[-0.06em] text-balance sm:max-w-[12ch] sm:text-6xl sm:tracking-[-0.07em] lg:text-7xl">
                  Practical guidance for living on a Bitcoin standard.
                </h1>
                <p className="max-w-3xl text-lg leading-8 text-muted-foreground sm:text-xl">
                  I help Bitcoiners organize their money, habits, and community
                  life around Bitcoin through writing, advisory calls, and
                  hands-on project work.
                </p>
                <p className="max-w-2xl rounded-2xl border border-border/70 bg-card/64 px-4 py-3 text-sm leading-7 text-muted-foreground">
                  For Bitcoiners who already understand why Bitcoin matters and
                  want a practical path for using it as money.
                </p>
              </div>

              <div className="flex flex-col items-start gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                <Button
                  asChild
                  size="lg"
                  className="cta-shadow rounded-full px-6"
                >
                  <a
                    href="https://cal.com/btcpavao/introductory-call"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Schedule Advisory Call
                  </a>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="rounded-full border-border/70 bg-background/80 px-6"
                >
                  <a
                    href="https://btcpavao.gitbook.io/practical-bitcoin-standard/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Read Practical Bitcoin Standard
                  </a>
                </Button>
                <Button
                  asChild
                  variant="link"
                  className="h-auto px-1 text-sm font-semibold"
                >
                  <a href="mailto:pavao@hey.com">
                    Email Pavao
                    <ArrowUpRight className="size-4" />
                  </a>
                </Button>
              </div>
            </div>

            <Card className="overflow-hidden rounded-[36px] border-border/70 bg-card/84 py-0 shadow-float backdrop-blur">
              <CardContent className="p-6 sm:p-7">
                <div className="relative mx-auto mb-6 w-full max-w-[220px]">
                  <div className="profile-glow absolute inset-4 -z-10 rounded-full blur-2xl" />
                  <Avatar className="profile-shadow size-full rounded-full border-4 border-background">
                    <AvatarImage
                      src="/pavao-profile.webp"
                      alt="Pavao Pahljina"
                    />
                    <AvatarFallback>PP</AvatarFallback>
                    <span
                      className="profile-light-pulse pointer-events-none absolute inset-0 z-10 rounded-full"
                      aria-hidden="true"
                    />
                  </Avatar>
                </div>

                <div className="text-center">
                  <p className="text-[11px] font-semibold tracking-[0.24em] text-muted-foreground uppercase">
                    Pavao Pahljina
                  </p>
                  <h2 className="mt-3 font-display text-3xl font-bold tracking-[-0.05em]">
                    @btcpavao
                  </h2>
                  <p className="mt-2 text-base text-muted-foreground">
                    Bitcoin Standard Advisor
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className={itemReveal + " grid gap-3 sm:grid-cols-3"}>
            {proofPoints.map((item, index) => (
              <div
                key={item.value}
                className={`rounded-[28px] border border-border/70 bg-card/78 p-5 shadow-soft backdrop-blur ${liftHover} ${staggerDelays[index] ?? ""}`}
              >
                <p className="font-display text-2xl font-bold tracking-[-0.05em]">
                  {item.value}
                </p>
                <p className="mt-2 text-[11px] font-semibold tracking-[0.2em] text-muted-foreground uppercase">
                  {item.label}
                </p>
                <p className="mt-4 text-sm leading-7 text-muted-foreground">
                  {item.copy}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section
          id="about"
          className={sectionReveal + " mt-16 border-t border-border/60 pt-16"}
        >
          <SectionHeader
            eyebrow="About"
            title="Trusted signal, practical guidance, and real project involvement."
            copy="I work at the intersection of Bitcoin education, advisory support, and community-building for people moving toward a Bitcoin standard with more clarity and conviction."
          />

          <div className="mt-8 border-l border-border/70 pl-6 text-base leading-8 text-muted-foreground sm:pl-8 lg:max-w-4xl">
            <div className="space-y-5">
              <p>
                A former ed-tech entrepreneur turned full-time Bitcoiner,
                currently working on{" "}
                <a
                  href="https://saifedean.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Saifedean.com
                </a>
                ,{" "}
                <a
                  href="https://thesaifhouse.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  TheSaifHouse.com
                </a>
                , and{" "}
                <a
                  href="https://twentyone.world"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  TwentyOne.World
                </a>
                .
              </p>
              <p className="mt-5">
                I am also writing an open-source guide for living on a full
                Bitcoin standard:{" "}
                <a
                  href="https://btcpavao.gitbook.io/practical-bitcoin-standard/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  btcpavao.gitbook.io/practical-bitcoin-standard
                </a>
                . I have spent over 10,000 hours studying, teaching, and working
                in Bitcoin.
              </p>
            </div>
          </div>
        </section>

        <section
          id="advisory"
          className={sectionReveal + " mt-16 border-t border-border/60 pt-16"}
        >
          <SectionHeader
            eyebrow="Advisory"
            title="Work with me"
            copy="If you already understand why Bitcoin matters, the next challenge is practical: organizing your money, habits, risk, and environment around it."
          />

          <div className={itemReveal + " mt-8 grid gap-4 md:grid-cols-2"}>
            {advisoryTopics.map((item, index) => (
              <Card
                key={item.title}
                className={`rounded-[28px] border-border/70 bg-card/82 py-0 shadow-soft ${liftHover} ${staggerDelays[index % staggerDelays.length] ?? ""}`}
              >
                <CardContent className="p-6">
                  <p className="text-sm font-semibold text-primary">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-4 font-display text-xl font-bold tracking-[-0.04em] text-foreground">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div
            className={
              subtleReveal +
              " mt-8 flex flex-col gap-4 rounded-[30px] border border-border/70 bg-card/76 p-6 shadow-soft sm:flex-row sm:items-center sm:justify-between"
            }
          >
            <div className="max-w-2xl">
              <h3 className="font-display text-xl font-bold tracking-[-0.04em] text-foreground">
                What happens on a call?
              </h3>
              <div className="mt-4 grid gap-2">
                {callFaqItems.map((item, index) => (
                  <p
                    key={item}
                    className="rounded-2xl border border-border/60 bg-background/64 px-4 py-3 text-sm leading-7 text-muted-foreground"
                  >
                    <span className="mr-3 font-semibold text-primary">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    {item}
                  </p>
                ))}
              </div>
              <p className="mt-4 text-sm leading-7 text-muted-foreground">
                This is practical education and guidance, not investment advice.
              </p>
            </div>
            <Button
              asChild
              size="lg"
              className="glimmer-button cta-shadow shrink-0 rounded-full px-6"
            >
              <a
                href="https://cal.com/btcpavao/introductory-call"
                target="_blank"
                rel="noopener noreferrer"
              >
                Book an advisory call
                <CalendarDays className="size-4" />
              </a>
            </Button>
          </div>
        </section>

        <section
          id="work"
          className={sectionReveal + " mt-16 border-t border-border/60 pt-16"}
        >
          <SectionHeader
            eyebrow="Work"
            title="Three ways to follow the work"
            copy="Start with the path that fits your intent: direct advisory, public writing, or community signal."
          />

          <div className="mt-8 divide-y divide-border/70 border-y border-border/70">
            {focusItems.map((item, index) => (
              <div
                key={item.category}
                className="grid gap-4 py-6 md:grid-cols-[120px_minmax(0,1fr)_minmax(0,0.95fr)] md:items-start"
              >
                <p className="text-sm font-semibold text-muted-foreground">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <div>
                  <p className="text-[11px] font-semibold tracking-[0.22em] text-muted-foreground uppercase">
                    {item.category}
                  </p>
                  <h3 className="mt-3 font-display text-2xl font-bold tracking-[-0.04em] text-foreground">
                    {item.heading}
                  </h3>
                </div>
                <p className="max-w-xl text-base leading-8 text-muted-foreground">
                  {item.description}
                </p>
                <Button
                  asChild
                  variant="link"
                  className="h-auto justify-self-start px-0 text-sm font-semibold md:col-start-2"
                >
                  <a
                    href={item.href}
                    target={item.href.startsWith("http") ? "_blank" : undefined}
                    rel={
                      item.href.startsWith("http")
                        ? "noopener noreferrer"
                        : undefined
                    }
                  >
                    {item.cta}
                    <ArrowUpRight className="size-4" />
                  </a>
                </Button>
              </div>
            ))}
          </div>
        </section>

        <section
          className={sectionReveal + " mt-16 border-t border-border/60 pt-16"}
        >
          <SectionHeader
            eyebrow="Latest writing"
            title="Kako AI koristim u stvarnom radu."
            copy="Pišem o diktiranju, knjigama, web stranicama, agentima, automatizaciji i tome što AI znači za generaliste koji imaju ideje, ali nemaju veliki tim za izvedbu."
          />

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {latestWritingPosts.map((post) => (
              <SeriesCard key={post.href} post={post} />
            ))}
          </div>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="glimmer-button mt-6 rounded-full border-border/70 bg-background/82 px-6 transition-[background-color,border-color,box-shadow,color,transform] duration-300 hover:bg-card"
          >
            <a href={HR_HOME_PATH}>
              Svi tekstovi
              <ArrowUpRight className="size-4" />
            </a>
          </Button>
        </section>

        <section
          id="projects"
          className={sectionReveal + " mt-16 border-t border-border/60 pt-16"}
        >
          <SectionHeader
            eyebrow="Projects"
            title="Where the work lives"
            copy="Start with the part that matches your intent: company work, public writing, or community media."
          />

          <div className={itemReveal + " mt-8 space-y-10"}>
            {projectGroups.map((group) => (
              <div
                key={group.title}
                className={
                  itemReveal + " grid gap-6 lg:grid-cols-[260px_minmax(0,1fr)]"
                }
              >
                <div className="lg:pt-2">
                  <p className="text-[11px] font-semibold tracking-[0.24em] text-muted-foreground uppercase">
                    {group.title}
                  </p>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">
                    {group.description}
                  </p>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  {group.items.map((item, index) => {
                    return (
                      <Card
                        key={item.title}
                        className={`group rounded-[28px] border-border/70 bg-card/82 py-0 shadow-soft transition-[background-color,color,border-color,box-shadow,transform] duration-300 ${liftHover} ${staggerDelays[index % staggerDelays.length] ?? ""}`}
                      >
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between gap-4">
                            <div className="grid size-12 shrink-0 place-items-center overflow-hidden rounded-full border border-border/70 bg-white p-1.5 shadow-sm">
                              <img
                                src={item.logo}
                                alt=""
                                width={36}
                                height={36}
                                loading="lazy"
                                decoding="async"
                                className="project-logo-image size-9 object-contain"
                              />
                            </div>
                            <span className="h-px flex-1 bg-border/70" />
                          </div>

                          <h3 className="mt-6 font-display text-2xl font-bold tracking-[-0.04em] text-foreground">
                            {item.title}
                          </h3>
                          <p className="mt-3 inline-flex rounded-full border border-border/70 bg-background/70 px-3 py-1 text-[11px] font-semibold tracking-[0.18em] text-muted-foreground uppercase">
                            {item.focus}
                          </p>
                          <p className="mt-3 text-sm leading-7 text-muted-foreground">
                            {item.description}
                          </p>
                          <div className="mt-4 rounded-2xl border border-border/70 bg-background/62 p-4">
                            <p className="text-[11px] font-semibold tracking-[0.2em] text-muted-foreground uppercase">
                              Role
                            </p>
                            <p className="mt-2 text-sm leading-7 text-muted-foreground">
                              {item.role}
                            </p>
                          </div>

                          <Button
                            asChild
                            variant="link"
                            className="mt-5 h-auto px-0 text-sm font-semibold"
                          >
                            <a
                              href={item.href}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {item.cta}
                              <ArrowUpRight className="size-4" />
                            </a>
                          </Button>
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section
          id="for-you"
          className={sectionReveal + " mt-16 border-t border-border/60 pt-16"}
        >
          <SectionHeader
            eyebrow="Who this is for"
            title="Past beginner conviction, toward daily practice."
            copy="This site is for people who are past the beginner stage and want to make Bitcoin more practical in daily life."
          />

          <div className={itemReveal + " mt-8 grid gap-3 md:grid-cols-2"}>
            {audienceItems.map((item, index) => (
              <div
                key={item}
                className={`rounded-[24px] border border-border/70 bg-card/78 p-5 text-sm leading-7 text-muted-foreground shadow-soft ${liftHover} ${staggerDelays[index % staggerDelays.length] ?? ""}`}
              >
                <span className="mr-3 font-semibold text-primary">
                  {String(index + 1).padStart(2, "0")}
                </span>
                {item}
              </div>
            ))}
          </div>
        </section>

        <section
          id="contact"
          className={sectionReveal + " mt-16 border-t border-border/60 pt-16"}
        >
          <Card
            className={
              sectionReveal +
              " overflow-hidden rounded-[38px] border-border/70 bg-card/86 py-0 shadow-float"
            }
          >
            <CardContent
              className={
                itemReveal +
                " grid gap-8 p-6 sm:p-8 lg:grid-cols-[minmax(0,1.2fr)_320px] lg:p-10"
              }
            >
              <div>
                <SectionHeader
                  eyebrow="Contact"
                  title="Start with the simplest next step"
                  copy="Email is best for direct outreach. If you want to talk live, book a call. If you want to read first, start with Practical Bitcoin Standard."
                />

                <div className="mt-8 flex flex-wrap gap-3">
                  <Button
                    asChild
                    size="lg"
                    className="glimmer-button cta-shadow rounded-full px-6 transition-[background-color,border-color,color] duration-300"
                  >
                    <a href="mailto:pavao@hey.com">
                      <Mail className="size-4" />
                      Email Me
                    </a>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="glimmer-button rounded-full border-border/70 bg-background/82 px-6 transition-[background-color,border-color,color] duration-300 hover:bg-card"
                  >
                    <a
                      href="https://cal.com/btcpavao/introductory-call"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <CalendarDays className="size-4" />
                      Schedule a Call
                    </a>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="glimmer-button rounded-full border-border/70 bg-background/82 px-6 transition-[background-color,border-color,color] duration-300 hover:bg-card"
                  >
                    <a
                      href="https://btcpavao.gitbook.io/practical-bitcoin-standard/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <BookOpen className="size-4" />
                      Read the Guide
                    </a>
                  </Button>
                </div>
              </div>

              <div className="rounded-[30px] border border-border/70 bg-background/76 p-6">
                <p className="text-[11px] font-semibold tracking-[0.24em] text-muted-foreground uppercase">
                  Need a starting point?
                </p>
                <p className="mt-4 text-base leading-8 text-muted-foreground">
                  If you are unsure where to start, send an email or book a call
                  and I will point you toward the right resource, conversation,
                  or community.
                </p>

                <div className="mt-6 space-y-3">
                  <a
                    href="mailto:pavao@hey.com"
                    className="glimmer-button block rounded-2xl border border-border/70 px-4 py-3 text-sm font-medium text-foreground transition-[background-color,color,border-color,box-shadow,transform] duration-300 hover:bg-card/70"
                  >
                    pavao@hey.com
                  </a>
                  <a
                    href="https://cal.com/btcpavao/introductory-call"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glimmer-button block rounded-2xl border border-border/70 px-4 py-3 text-sm font-medium text-foreground transition-[background-color,color,border-color,box-shadow,transform] duration-300 hover:bg-card/70"
                  >
                    cal.com/btcpavao/introductory-call
                  </a>
                  <a
                    href="https://btcpavao.gitbook.io/practical-bitcoin-standard/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glimmer-button block rounded-2xl border border-border/70 px-4 py-3 text-sm font-medium text-foreground transition-[background-color,color,border-color,box-shadow,transform] duration-300 hover:bg-card/70"
                  >
                    Practical Bitcoin Standard
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>

      <footer className="border-t border-border/60 bg-background/92 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <a
            className="font-display text-base font-bold tracking-[-0.04em]"
            href="#top"
          >
            Pavao Pahljina
          </a>

          <nav className="hidden items-center gap-1 lg:flex">
            {sectionLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="glimmer-button rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition-[background-color,color,border-color,box-shadow,transform] duration-300 hover:bg-card/70 hover:text-foreground"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="glimmer-button rounded-full border border-border/70 bg-background/80 px-4 py-2 text-sm font-medium text-muted-foreground transition-[background-color,color,border-color,box-shadow,transform] duration-300 hover:bg-card hover:text-foreground"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </footer>

      {showBackToTop ? (
        <Button
          type="button"
          variant="outline"
          size="icon"
          className="glimmer-button floating-top-button fixed right-4 bottom-4 z-50 inline-flex size-10 min-h-10 min-w-10 shrink-0 items-center justify-center rounded-full border border-border/70 bg-background/94 p-0 leading-none text-foreground shadow-soft hover:bg-card hover:text-foreground md:right-6 md:bottom-6"
          style={{ bottom: "calc(env(safe-area-inset-bottom, 0px) + 1rem)" }}
          onClick={scrollToTop}
          aria-label="Back to top"
          title="Back to top"
        >
          <ArrowUp
            aria-hidden="true"
            className="relative z-10 size-4 shrink-0"
            strokeWidth={2.25}
          />
        </Button>
      ) : null}
    </div>
  )
}

export function App({
  initialPath,
  initialArticleData = null,
  initialLearningArticleHtml = "",
  initialBitcoinCoreArticleSource = "",
  initialLongRoadArticleSource = "",
}: {
  initialPath?: string
  initialArticleData?: ArticleDataModule | null
  initialLearningArticleHtml?: string
  initialBitcoinCoreArticleSource?: string
  initialLongRoadArticleSource?: string
} = {}) {
  const currentPath = initialPath
    ? normalizePath(initialPath)
    : getCurrentPath()

  if (currentPath === ARTICLE_PATH) {
    return <ArticlePage initialArticleData={initialArticleData} />
  }

  if (currentPath === HR_HOME_PATH) {
    return <HrHomePage />
  }

  if (currentPath === BITCOIN_CORE_SERIES_PATH) {
    return <BitcoinCoreSeriesPage />
  }

  if (currentPath === EN_BITCOIN_CORE_SERIES_PATH) {
    return <BitcoinCoreSeriesPage language="en" />
  }

  if (currentPath === BITCOIN_CORE_ENTROPY_ARTICLE_PATH) {
    return (
      <BitcoinCoreArticlePage
        initialArticleSource={initialBitcoinCoreArticleSource}
      />
    )
  }

  if (currentPath === EN_BITCOIN_CORE_ENTROPY_ARTICLE_PATH) {
    return (
      <BitcoinCoreArticlePage
        initialArticleSource={initialBitcoinCoreArticleSource}
        language="en"
      />
    )
  }

  if (currentPath === LONG_ROAD_BITCOIN_CORE_ARTICLE_PATH) {
    return (
      <LongRoadArticlePage
        initialArticleSource={initialLongRoadArticleSource}
      />
    )
  }

  if (currentPath === AI_SERIES_PATH) {
    return <AiSeriesPage />
  }

  if (currentPath === WORKFLOW_ARTICLE_PATH) {
    return <WorkflowArticlePage initialArticleData={initialArticleData} />
  }

  if (currentPath === LEARNING_ARTICLE_PATH) {
    return (
      <LearningArticlePage initialArticleHtml={initialLearningArticleHtml} />
    )
  }

  return <HomePage />
}

export default App
