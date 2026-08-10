import { useEffect, useRef, useState, type ReactNode } from "react"
import {
  ArrowRight,
  ArrowUp,
  ArrowUpRight,
  Building2,
  CalendarDays,
  Check,
  KeyRound,
  Menu,
  MoonStar,
  RefreshCcw,
  SunMedium,
  Users,
  X,
  type LucideIcon,
} from "lucide-react"

import { useTheme } from "@/components/theme-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  BITCOIN_CORE_CURRICULUM_PATH,
  BITCOIN_CORE_ENTROPY_ARTICLE_PATH,
  EN_BITCOIN_CORE_ENTROPY_ARTICLE_PATH,
  EN_BITCOIN_CORE_SERIES_PATH,
  HR_HOME_PATH,
  LEARNING_ARTICLE_PATH,
  LONG_ROAD_BITCOIN_CORE_ARTICLE_PATH,
  START_HERE_PATH,
  WORKFLOW_ARTICLE_PATH,
} from "@/routes"

const BOOKING_URL = "https://cal.com/btcpavao/introductory-call"
const PRACTICAL_BITCOIN_STANDARD_URL =
  "https://btcpavao.gitbook.io/practical-bitcoin-standard/"

const navigation = [
  { label: "Bitcoin Standard", href: "#bitcoin-standard" },
  { label: "Bitcoin Core", href: "#bitcoin-core" },
  { label: "Writing", href: "#writing" },
  { label: "About", href: "#about" },
  { label: "Work with me", href: "#work-with-me" },
]

const pathTopics = [
  {
    eyebrow: "Path one",
    title: "Live on a Bitcoin standard",
    description:
      "Turn Bitcoin conviction into a practical financial system for everyday life.",
    topics: [
      "Budgeting, cash flow, spending, and liquidity",
      "Debt, fiat exposure, risk, and time preference",
      "Money coordination for couples and families",
      "Practical Bitcoin processes for small companies",
      "A gradual path toward self-custody",
    ],
    cta: "Book a Bitcoin Standard conversation",
    href: BOOKING_URL,
    icon: RefreshCcw,
  },
  {
    eyebrow: "Path two",
    title: "Learn Bitcoin Core without becoming a developer",
    description:
      "Learn Bitcoin Core slowly and practically, without assuming a programming or cryptography background.",
    topics: [
      "Install and verify Bitcoin Core",
      "Create, encrypt, back up, and restore a test wallet",
      "Practice recovery before using real funds",
      "Learn watch-only wallets, PSBTs, and offline signing",
      "Add multisig and advanced policies only when needed",
    ],
    cta: "Explore Bitcoin Core",
    href: EN_BITCOIN_CORE_SERIES_PATH,
    icon: KeyRound,
  },
]

const custodySteps = ["Understand", "Test", "Recover", "Operate", "Review"]

const coreStages = [
  {
    title: "Understand the model",
    copy: "Learn what the node, wallet, keys, blockchain, and network each do.",
  },
  {
    title: "Use a test wallet",
    copy: "Create, encrypt, back up, delete, restore, and verify a wallet without real funds.",
  },
  {
    title: "Build a repeatable process",
    copy: "Document the steps and make sure another trusted person can follow them.",
  },
  {
    title: "Separate online and offline roles",
    copy: "Learn watch-only wallets, PSBTs, offline signing, and transaction verification.",
  },
  {
    title: "Explore advanced policies",
    copy: "When the need is real, progress toward multisig, inheritance paths, Miniscript, and Taproot.",
  },
]

const audiences: Array<{
  title: string
  copy: string
  icon: LucideIcon
}> = [
  {
    title: "Individuals",
    copy: "Build a clear system for income, spending, saving, liquidity, and custody.",
    icon: KeyRound,
  },
  {
    title: "Couples and families",
    copy: "Create shared understanding and recovery procedures that do not depend on one person’s memory.",
    icon: Users,
  },
  {
    title: "Companies and communities",
    copy: "Develop practical processes, internal knowledge, education, and long-term continuity.",
    icon: Building2,
  },
]

const latestPosts = [
  {
    category: "Bitcoin Core",
    language: "HR",
    date: "10. kolovoza 2026.",
    title: "Praktičan Bitcoin self-custody uz Bitcoin Core",
    copy: "Deset faza od threat modela i ranih Signet vježbi do provjerenog recoveryja, offline signinga i multisiga.",
    href: BITCOIN_CORE_CURRICULUM_PATH,
  },
  {
    category: "Bitcoin Core",
    language: "EN",
    date: "August 5, 2026",
    title: "The Long Road Back to Bitcoin Core",
    copy: "A practical account of wallet assumptions, recovery tests, and choosing a foundation for the long term.",
    href: LONG_ROAD_BITCOIN_CORE_ARTICLE_PATH,
  },
  {
    category: "Bitcoin Core",
    language: "EN",
    date: "August 5, 2026",
    title: "How Bitcoin Core Generates Entropy When You Create a New Wallet",
    copy: "How Core gathers randomness, validates a private key, and builds a BIP32 wallet.",
    href: EN_BITCOIN_CORE_ENTROPY_ARTICLE_PATH,
  },
  {
    category: "Bitcoin Core",
    language: "HR",
    date: "5. kolovoza 2026.",
    title: "Kako Bitcoin Core generira entropiju kada napravimo novi wallet",
    copy: "Hrvatska verzija vodiča kroz entropiju, privatni ključ i nastanak walleta.",
    href: BITCOIN_CORE_ENTROPY_ARTICLE_PATH,
  },
  {
    category: "AI and workflows",
    language: "HR",
    date: "17. srpnja 2026.",
    title: "Kako sam uz AI naučio matematiku Bitcoinova dugoročnog trenda",
    copy: "Od teškog PDF-a do provjerenog modela, grafa i javnog alata.",
    href: LEARNING_ARTICLE_PATH,
  },
  {
    category: "AI and workflows",
    language: "HR",
    date: "25. lipnja 2026.",
    title: "Moj AI workflow: od diktata do objavljene stranice",
    copy: "Kako ideja prolazi kroz diktat, uređivanje, implementaciju i objavu.",
    href: WORKFLOW_ARTICLE_PATH,
  },
]

const projects = [
  {
    title: "Saifedean.com",
    label: "Education",
    copy: "Bitcoin education, Austrian economics, and high-signal learning infrastructure.",
    href: "https://saifedean.com",
    logo: "/project-logos/saifedean.avif",
  },
  {
    title: "TheSaifHouse.com",
    label: "Books and commerce",
    copy: "Books, global fulfillment, checkout experience, and Bitcoin-native commerce.",
    href: "https://thesaifhouse.com",
    logo: "/project-logos/the-saif-house.png",
  },
  {
    title: "TwentyOne.World",
    label: "Community network",
    copy: "Local community discovery, coordination, events, and Bitcoin signal.",
    href: "https://twentyone.world",
    logo: "/project-logos/twentyone-world-v2.svg",
  },
  {
    title: "Practical Bitcoin Standard",
    label: "Open-source writing",
    copy: "A growing guide to turning Bitcoin conviction into everyday practice.",
    href: PRACTICAL_BITCOIN_STANDARD_URL,
    logo: "/project-logos/practical-bitcoin-standard.png",
  },
]

function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="text-[11px] font-semibold tracking-[0.22em] text-primary uppercase">
      {children}
    </p>
  )
}

function SectionIntro({
  eyebrow,
  title,
  copy,
  className = "",
}: {
  eyebrow: string
  title: string
  copy?: string
  className?: string
}) {
  return (
    <div className={`max-w-3xl ${className}`}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="mt-4 font-display text-3xl leading-[1.02] font-bold tracking-[-0.045em] text-foreground sm:text-5xl">
        {title}
      </h2>
      {copy ? (
        <p className="mt-5 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
          {copy}
        </p>
      ) : null}
    </div>
  )
}

function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const isDark = theme === "dark"

  return (
    <Button
      type="button"
      variant="outline"
      size="icon"
      className="home-icon-button size-11 rounded-full bg-background/88"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      title={isDark ? "Switch to light theme" : "Switch to dark theme"}
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

function setMeta(name: string, content: string) {
  const element = document.head.querySelector<HTMLMetaElement>(
    `meta[name="${name}"]`
  )
  if (element) element.content = content
}

export function Homepage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [showBackToTop, setShowBackToTop] = useState(false)
  const menuButtonRef = useRef<HTMLButtonElement | null>(null)
  const firstMobileLinkRef = useRef<HTMLAnchorElement | null>(null)

  useEffect(() => {
    const title =
      "Bitcoin Standard Advisory and Bitcoin Core Education | Pavao Pahljina"
    const description =
      "Practical guidance for individuals, families, and businesses building a life on a Bitcoin standard, with beginner-friendly education on Bitcoin Core, custody, backup, and recovery."

    document.documentElement.lang = "en"
    document.title = title
    setMeta("description", description)
    setMeta("twitter:title", title)
    setMeta("twitter:description", description)

    const handleScroll = () => setShowBackToTop(window.scrollY > 480)
    const handleResize = () => {
      if (window.innerWidth >= 1024) setMobileMenuOpen(false)
    }
    const handleKeydown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileMenuOpen((isOpen) => {
          if (isOpen) menuButtonRef.current?.focus()
          return false
        })
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    window.addEventListener("resize", handleResize)
    window.addEventListener("keydown", handleKeydown)
    handleScroll()

    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("resize", handleResize)
      window.removeEventListener("keydown", handleKeydown)
    }
  }, [])

  useEffect(() => {
    if (mobileMenuOpen) firstMobileLinkRef.current?.focus()
  }, [mobileMenuOpen])

  function scrollToTop() {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches
    window.scrollTo({ top: 0, behavior: reducedMotion ? "auto" : "smooth" })
  }

  return (
    <div
      id="top"
      className="home-page min-h-screen bg-background text-foreground"
    >
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>

      <header className="home-header sticky top-0 z-50 border-b border-border/60 bg-background/88 backdrop-blur-xl">
        <div className="mx-auto flex min-h-[72px] max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <a
            href="#top"
            className="font-display text-base font-bold tracking-[-0.035em] text-foreground"
          >
            Pavao Pahljina
          </a>

          <nav
            aria-label="Main navigation"
            className="hidden lg:flex lg:items-center"
          >
            {navigation.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="home-nav-link inline-flex min-h-11 items-center rounded-full px-3 text-sm font-medium text-muted-foreground hover:text-foreground"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <div
              className="hidden min-h-11 items-center rounded-full bg-card px-6 text-xs font-semibold text-muted-foreground shadow-[var(--shadow-border)] sm:flex"
              aria-label="Language"
            >
              <span className="text-foreground" aria-current="page">
                EN
              </span>
              <span className="px-2 text-border" aria-hidden="true">
                /
              </span>
              <a
                href={HR_HOME_PATH}
                lang="hr"
                className="hover:text-foreground"
              >
                HR
              </a>
            </div>
            <ThemeToggle />
            <Button
              asChild
              className="hidden min-h-11 rounded-full px-5 lg:inline-flex"
            >
              <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
                Book a call
              </a>
            </Button>
            <Button
              ref={menuButtonRef}
              type="button"
              variant="outline"
              size="icon"
              className="home-icon-button size-11 rounded-full bg-background/88 lg:hidden"
              onClick={() => setMobileMenuOpen((open) => !open)}
              aria-label={
                mobileMenuOpen ? "Close navigation" : "Open navigation"
              }
              aria-controls="mobile-navigation"
              aria-expanded={mobileMenuOpen}
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
            id="mobile-navigation"
            aria-label="Mobile navigation"
            className="border-t border-border/60 bg-background/96 px-4 py-4 lg:hidden"
          >
            <div className="mx-auto grid max-w-7xl gap-1">
              {navigation.map((link, index) => (
                <a
                  key={link.href}
                  ref={index === 0 ? firstMobileLinkRef : undefined}
                  href={link.href}
                  className="flex min-h-11 items-center justify-between rounded-2xl px-4 text-sm font-medium hover:bg-card"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                  <ArrowRight className="size-4" aria-hidden="true" />
                </a>
              ))}
              <div className="mt-2 grid grid-cols-2 gap-2">
                <a
                  href={HR_HOME_PATH}
                  lang="hr"
                  className="flex min-h-11 items-center justify-center rounded-full bg-card text-sm font-semibold shadow-[var(--shadow-border)]"
                >
                  Hrvatski
                </a>
                <a
                  href={BOOKING_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-h-11 items-center justify-center rounded-full bg-primary px-4 text-sm font-semibold text-primary-foreground"
                >
                  Book a call
                </a>
              </div>
            </div>
          </nav>
        ) : null}
      </header>

      <main id="main-content">
        <section className="home-hero relative isolate overflow-hidden">
          <picture className="home-hero-background absolute inset-0 -z-20">
            <source
              srcSet="/homepage-hero-v2-840.webp 840w, /homepage-hero-v2.webp 1774w"
              sizes="100vw"
              type="image/webp"
            />
            <img
              src="/homepage-hero-v2.webp"
              alt="A person reviews a plan beside a transparent blue-and-gold computing structure on a sunlit Adriatic terrace."
              width="1774"
              height="887"
              fetchPriority="high"
              decoding="async"
            />
          </picture>
          <div
            className="home-hero-fade absolute inset-0 -z-10"
            aria-hidden="true"
          />

          <div className="mx-auto flex min-h-[43rem] max-w-7xl items-center px-4 py-16 sm:min-h-[47rem] sm:px-6 sm:py-20 lg:px-8 lg:py-24">
            <div className="home-hero-copy max-w-3xl">
              <Eyebrow>
                Bitcoin Standard advisory · Bitcoin Core education
              </Eyebrow>
              <h1 className="mt-5 max-w-[12ch] font-display text-5xl leading-[0.94] font-bold tracking-[-0.065em] text-balance sm:text-7xl lg:text-[5.5rem]">
                Build your Bitcoin life from first principles.
              </h1>
              <p className="mt-7 max-w-2xl text-lg leading-8 text-muted-foreground sm:text-xl sm:leading-9">
                Practical guidance for individuals, families, and businesses who
                want to organize their money around Bitcoin, and learn
                self-custody with Bitcoin Core when they are ready.
              </p>
              <p className="mt-5 max-w-xl text-base leading-7 font-semibold text-foreground">
                Fewer assumptions. Fewer moving parts. More clarity for the
                decades ahead.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Button
                  asChild
                  size="lg"
                  className="min-h-12 rounded-full px-6"
                >
                  <a
                    href={BOOKING_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Book an advisory call
                    <CalendarDays className="size-4" aria-hidden="true" />
                  </a>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="min-h-12 rounded-full bg-background/80 px-6 backdrop-blur-sm"
                >
                  <a href={START_HERE_PATH}>
                    Start learning Bitcoin Core
                    <ArrowRight className="size-4" aria-hidden="true" />
                  </a>
                </Button>
                <Button asChild variant="link" className="min-h-12 px-2">
                  <a href="#writing">Read the latest writing</a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 sm:px-6 lg:px-8">
          <div className="principles-panel mx-auto grid max-w-7xl gap-8 overflow-hidden rounded-[36px] px-6 py-10 sm:px-10 sm:py-14 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16 lg:px-14 lg:py-16">
            <div>
              <p className="text-[11px] font-semibold tracking-[0.22em] text-white/62 uppercase">
                The principle
              </p>
              <h2 className="mt-4 max-w-[15ch] font-display text-3xl leading-[1.02] font-bold tracking-[-0.045em] text-white sm:text-5xl">
                Simplicity is not fewer clicks. It is fewer assumptions.
              </h2>
            </div>
            <div className="space-y-5 text-base leading-8 text-white/76 sm:text-lg">
              <p>
                Wallets change. Devices disappear. Vendors change direction.
                Software interfaces and recovery standards evolve.
              </p>
              <p>The principles underneath them change much more slowly.</p>
              <p className="font-medium text-white">
                My work is to understand those principles, test the complete
                process, and help you build a Bitcoin setup you can explain,
                recover, and maintain with confidence.
              </p>
            </div>
          </div>
        </section>

        <section
          id="bitcoin-standard"
          className="mx-auto max-w-7xl scroll-mt-24 px-4 py-20 sm:px-6 sm:py-28 lg:px-8"
        >
          <SectionIntro
            eyebrow="Two connected paths"
            title="Organize the life. Understand the tools."
            copy="Both paths start from the same place: reduce assumptions, test the whole process, and keep only the complexity you can explain."
          />

          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            {pathTopics.map((path, index) => {
              const Icon = path.icon
              return (
                <Card
                  key={path.title}
                  id={
                    index === 0
                      ? "bitcoin-standard-advisory"
                      : "bitcoin-core-path"
                  }
                  className={`home-path-card scroll-mt-24 overflow-hidden rounded-[32px] py-0 shadow-[var(--shadow-border)] ${
                    index === 1 ? "home-path-card--core" : ""
                  }`}
                >
                  <CardContent className="flex h-full flex-col p-6 sm:p-9">
                    <div className="flex items-center justify-between gap-4">
                      <span className="grid size-12 place-items-center rounded-full bg-primary/12 text-primary">
                        <Icon className="size-5" aria-hidden="true" />
                      </span>
                      <p className="text-xs font-semibold text-muted-foreground">
                        0{index + 1}
                      </p>
                    </div>
                    <Eyebrow>{path.eyebrow}</Eyebrow>
                    <h3 className="mt-4 max-w-[18ch] font-display text-3xl leading-[1.02] font-bold tracking-[-0.045em] sm:text-4xl">
                      {path.title}
                    </h3>
                    <p className="mt-5 text-base leading-8 text-muted-foreground">
                      {path.description}
                    </p>
                    <ul className="mt-7 grid gap-3" aria-label="Topics">
                      {path.topics.map((topic) => (
                        <li
                          key={topic}
                          className="flex gap-3 text-sm leading-6 text-muted-foreground"
                        >
                          <Check
                            className="mt-1 size-4 shrink-0 text-primary"
                            aria-hidden="true"
                          />
                          <span>{topic}</span>
                        </li>
                      ))}
                    </ul>
                    <Button
                      asChild
                      variant={index === 1 ? "default" : "outline"}
                      className="mt-8 min-h-11 w-fit rounded-full px-5"
                    >
                      <a
                        href={path.href}
                        target={
                          path.href.startsWith("http") ? "_blank" : undefined
                        }
                        rel={
                          path.href.startsWith("http")
                            ? "noopener noreferrer"
                            : undefined
                        }
                      >
                        {path.cta}
                        <ArrowRight className="size-4" aria-hidden="true" />
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </section>

        <section className="border-y border-border/60 bg-card/54">
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
            <SectionIntro
              eyebrow="Custody philosophy"
              title="Custody is a progression, not a purity test."
              copy="A custody system is useful only if the people responsible for it understand it, can maintain it, and can recover it under pressure."
            />
            <div className="mt-8 grid gap-5 text-base leading-8 text-muted-foreground lg:grid-cols-2 lg:gap-12">
              <p>
                An air-gapped computer, a custom descriptor, or a complex
                multisig policy should not be the starting point for everyone.
                There is no shame in using simpler or custodial tools while
                learning.
              </p>
              <p>
                Move toward greater control only when the process is clear,
                tested, and repeatable. Hardware wallets, BIP39, multisig, and
                Bitcoin Core all have trade-offs. Understanding them matters
                more than choosing a camp.
              </p>
            </div>

            <ol className="custody-progression mt-12 grid gap-3 sm:grid-cols-5">
              {custodySteps.map((step, index) => (
                <li
                  key={step}
                  className="relative flex min-h-20 items-center gap-3 rounded-2xl bg-background px-4 py-4 shadow-[var(--shadow-border)] sm:flex-col sm:items-start sm:justify-center"
                >
                  <span className="text-xs font-bold text-primary">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="font-display text-base font-bold">
                    {step}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section
          id="bitcoin-core"
          className="mx-auto max-w-7xl scroll-mt-24 px-4 py-20 sm:px-6 sm:py-28 lg:px-8"
        >
          <div className="grid gap-12 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] lg:gap-20">
            <div>
              <SectionIntro
                eyebrow="Bitcoin Core learning path"
                title="Start small. Add complexity only when it earns its place."
                copy="The material begins with the model and a disposable test wallet. It can grow over time toward offline signing and advanced spending policies."
              />
              <figure className="mt-10 rounded-[32px] bg-card p-2 shadow-[var(--shadow-border)]">
                <picture>
                  <source
                    srcSet="/bitcoin-core-entropija-09-840.webp 840w, /bitcoin-core-entropija-09.webp 1672w"
                    sizes="(max-width: 1023px) calc(100vw - 3rem), 34vw"
                    type="image/webp"
                  />
                  <img
                    src="/bitcoin-core-entropija-09.webp"
                    alt="A blue-and-gold branching key structure grows from one glowing root in Adriatic limestone."
                    width="1672"
                    height="2090"
                    loading="lazy"
                    decoding="async"
                    className="aspect-[4/5] w-full rounded-[24px] object-cover"
                  />
                </picture>
              </figure>
            </div>

            <ol className="divide-y divide-border/70 border-y border-border/70">
              {coreStages.map((stage, index) => (
                <li
                  key={stage.title}
                  className="grid gap-3 py-6 sm:grid-cols-[76px_minmax(0,1fr)] sm:gap-6 sm:py-8"
                >
                  <span className="font-display text-sm font-bold text-primary">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="font-display text-xl font-bold tracking-[-0.03em] sm:text-2xl">
                      {stage.title}
                    </h3>
                    <p className="mt-2 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
                      {stage.copy}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div className="mt-10 flex flex-wrap gap-3 lg:pl-[calc(41%+5rem)]">
            <Button asChild className="min-h-11 rounded-full px-5">
              <a href={START_HERE_PATH}>
                Try the first exercise
                <ArrowRight className="size-4" aria-hidden="true" />
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              className="min-h-11 rounded-full px-5"
            >
              <a href={EN_BITCOIN_CORE_SERIES_PATH}>
                Browse Bitcoin Core writing
              </a>
            </Button>
          </div>
        </section>

        <section className="px-4 pb-20 sm:px-6 sm:pb-28 lg:px-8">
          <div className="mx-auto grid max-w-7xl overflow-hidden rounded-[36px] bg-card shadow-[var(--shadow-border),0_28px_80px_color-mix(in_oklab,var(--foreground)_10%,transparent)] lg:grid-cols-2">
            <picture className="min-h-[340px]">
              <source
                srcSet="/long-road-bitcoin-core-03-840.webp 840w, /long-road-bitcoin-core-03.webp 1774w"
                sizes="(max-width: 1023px) 100vw, 50vw"
                type="image/webp"
              />
              <img
                src="/long-road-bitcoin-core-03.webp"
                alt="A transparent blue-and-gold entropy machine mixes several streams in a sunlit Mediterranean hall."
                width="1774"
                height="997"
                loading="lazy"
                decoding="async"
                className="h-full min-h-[340px] w-full object-cover"
              />
            </picture>
            <div className="flex flex-col justify-center p-7 sm:p-12 lg:p-14">
              <Eyebrow>Why Bitcoin Core</Eyebrow>
              <h2 className="mt-4 font-display text-3xl leading-[1.02] font-bold tracking-[-0.045em] sm:text-5xl">
                Old-fashioned in the best possible way.
              </h2>
              <div className="mt-6 space-y-5 text-base leading-8 text-muted-foreground">
                <p>For custody, novelty is not the goal. Understanding is.</p>
                <p>
                  Bitcoin Core can look less polished than newer wallet
                  products, but its model becomes coherent once you learn it:
                  create the wallet, protect it, back it up, test the restore,
                  and understand what must survive.
                </p>
                <p className="rounded-2xl bg-background p-5 text-sm leading-7 shadow-[var(--shadow-border)]">
                  Bitcoin Core is not the only valid wallet, and it is not the
                  right answer for everyone. It is the foundation I have chosen
                  to study deeply and use for the long term.
                </p>
              </div>
              <Button
                asChild
                variant="link"
                className="mt-5 h-auto w-fit justify-start px-0"
              >
                <a href={LONG_ROAD_BITCOIN_CORE_ARTICLE_PATH}>
                  Read why I returned to Bitcoin Core
                  <ArrowRight className="size-4" aria-hidden="true" />
                </a>
              </Button>
            </div>
          </div>
        </section>

        <section className="border-y border-border/60 bg-card/48">
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
            <SectionIntro
              eyebrow="Who this work is for"
              title="Built for responsibility shared over time."
              copy="The goal is a system that makes sense on an ordinary Tuesday and still makes sense under pressure."
            />
            <div className="mt-10 grid gap-4 md:grid-cols-3">
              {audiences.map((audience) => {
                const Icon = audience.icon
                return (
                  <div
                    key={audience.title}
                    className="rounded-[28px] bg-background p-6 shadow-[var(--shadow-border)] sm:p-8"
                  >
                    <span className="grid size-11 place-items-center rounded-full bg-primary/12 text-primary">
                      <Icon className="size-5" aria-hidden="true" />
                    </span>
                    <h3 className="mt-6 font-display text-2xl font-bold tracking-[-0.035em]">
                      {audience.title}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-muted-foreground">
                      {audience.copy}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        <section
          id="writing"
          className="mx-auto max-w-7xl scroll-mt-24 px-4 py-20 sm:px-6 sm:py-28 lg:px-8"
        >
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <SectionIntro
              eyebrow="Latest writing"
              title="Notes, essays, and practical guides."
              copy="Writing on Bitcoin Core, custody, life on a Bitcoin standard, and the workflows behind the work."
            />
            <div
              className="flex max-w-xl flex-wrap gap-2"
              aria-label="Writing labels"
            >
              {[
                "Bitcoin Core",
                "Bitcoin Standard",
                "AI and workflows",
                "Croatian",
                "English",
              ].map((label) => (
                <span
                  key={label}
                  className="inline-flex min-h-10 items-center rounded-full bg-card px-4 text-xs font-semibold text-muted-foreground shadow-[var(--shadow-border)]"
                >
                  {label}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-12 grid gap-x-8 border-y border-border/70 md:grid-cols-2">
            {latestPosts.map((post, index) => (
              <article
                key={post.href}
                className={`border-border/70 py-7 ${
                  index < latestPosts.length - 2 ? "md:border-b" : ""
                } ${index % 2 === 0 ? "md:pr-8" : "md:border-l md:pl-8"}`}
              >
                <a
                  href={post.href}
                  className="group block rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
                >
                  <div className="flex flex-wrap items-center gap-2 text-[11px] font-semibold text-muted-foreground uppercase">
                    <span className="text-primary">{post.category}</span>
                    <span aria-hidden="true">·</span>
                    <span>{post.language}</span>
                    <span aria-hidden="true">·</span>
                    <time>{post.date}</time>
                  </div>
                  <h3 className="mt-4 max-w-[27ch] font-display text-2xl leading-tight font-bold tracking-[-0.035em] group-hover:text-primary sm:text-3xl">
                    {post.title}
                  </h3>
                  <p className="mt-3 max-w-xl text-sm leading-7 text-muted-foreground">
                    {post.copy}
                  </p>
                  <span className="mt-5 inline-flex min-h-10 items-center gap-2 text-sm font-semibold">
                    Read article
                    <ArrowUpRight className="size-4" aria-hidden="true" />
                  </span>
                </a>
              </article>
            ))}
          </div>

          <div className="mt-7 flex flex-wrap gap-3">
            <Button
              asChild
              variant="outline"
              className="min-h-11 rounded-full px-5"
            >
              <a href={EN_BITCOIN_CORE_SERIES_PATH}>English Bitcoin Core</a>
            </Button>
            <Button
              asChild
              variant="outline"
              className="min-h-11 rounded-full px-5"
            >
              <a href={HR_HOME_PATH}>All Croatian writing</a>
            </Button>
          </div>
        </section>

        <section
          id="about"
          className="scroll-mt-24 border-y border-border/60 bg-card/48"
        >
          <div className="mx-auto grid max-w-7xl gap-10 px-4 py-20 sm:px-6 sm:py-24 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-16 lg:px-8">
            <figure className="mx-auto w-full max-w-[240px] rounded-full bg-background p-2 shadow-[var(--shadow-border)] lg:mx-0">
              <img
                src="/pavao-profile.webp"
                alt="Pavao Pahljina"
                width="400"
                height="400"
                loading="lazy"
                decoding="async"
                className="aspect-square w-full rounded-full object-cover"
              />
            </figure>
            <div className="max-w-4xl">
              <Eyebrow>About Pavao</Eyebrow>
              <h2 className="mt-4 max-w-[20ch] font-display text-3xl leading-[1.02] font-bold tracking-[-0.045em] sm:text-5xl">
                Education, advisory, operations, and community-building.
              </h2>
              <div className="mt-7 grid gap-5 text-base leading-8 text-muted-foreground lg:grid-cols-2 lg:gap-10">
                <div className="space-y-5">
                  <p>
                    I am not a Bitcoin Core developer. I study the software,
                    test the workflows, and document them for people who are not
                    programmers, cryptographers, or full-time Bitcoin
                    technologists.
                  </p>
                  <p>
                    I am learning in public, beginning with wallet creation,
                    backup, and recovery, then moving gradually toward offline
                    signing and more advanced spending policies.
                  </p>
                </div>
                <p>
                  I have spent more than 10,000 hours studying, teaching,
                  building, and working in Bitcoin. My work includes
                  Saifedean.com, TheSaifHouse.com, TwentyOne.World, and the
                  Practical Bitcoin Standard project.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
          <SectionIntro
            eyebrow="Work and projects"
            title="The work is active, public, and ongoing."
            copy="These projects are where the ideas meet education, publishing, commerce, and community operations."
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {projects.map((project) => (
              <a
                key={project.title}
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                className="home-project group flex min-h-[260px] flex-col rounded-[28px] bg-card p-6 shadow-[var(--shadow-border)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
              >
                <span className="flex h-12 items-center">
                  <img
                    src={project.logo}
                    alt=""
                    width="48"
                    height="48"
                    loading="lazy"
                    decoding="async"
                    className="project-logo-image size-12 object-contain"
                  />
                </span>
                <p className="mt-6 text-[11px] font-semibold text-primary uppercase">
                  {project.label}
                </p>
                <h3 className="mt-2 font-display text-xl font-bold tracking-[-0.03em] group-hover:text-primary">
                  {project.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">
                  {project.copy}
                </p>
                <ArrowUpRight
                  className="mt-auto size-4 pt-5 text-muted-foreground group-hover:text-primary"
                  aria-hidden="true"
                />
              </a>
            ))}
          </div>
        </section>

        <section
          id="work-with-me"
          className="scroll-mt-24 px-4 pb-20 sm:px-6 sm:pb-28 lg:px-8"
        >
          <div className="final-cta mx-auto grid max-w-7xl gap-10 overflow-hidden rounded-[36px] px-6 py-10 sm:px-10 sm:py-14 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end lg:px-14 lg:py-16">
            <div className="max-w-3xl">
              <p className="text-[11px] font-semibold text-white/62 uppercase">
                The next step
              </p>
              <h2 className="mt-4 max-w-[17ch] font-display text-3xl leading-[1.02] font-bold tracking-[-0.045em] text-white sm:text-5xl">
                Start with the simplest next step.
              </h2>
              <p className="mt-6 max-w-2xl text-base leading-8 text-white/74 sm:text-lg">
                You do not need to redesign your financial life or custody setup
                in one weekend. Begin with one conversation or one test wallet.
                Understand one step, verify it, and continue.
              </p>
              <p className="mt-6 text-sm text-white/60">
                Practical education and guidance. Not investment, legal, or tax
                advice.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col lg:items-stretch">
              <Button
                asChild
                size="lg"
                className="min-h-12 rounded-full bg-white px-6 text-[#0d3153] hover:bg-white/90"
              >
                <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
                  Book an introductory call
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="min-h-12 rounded-full border-white/28 bg-white/8 px-6 text-white hover:bg-white/14 hover:text-white"
              >
                <a href={START_HERE_PATH}>
                  Try the first Bitcoin Core exercise
                </a>
              </Button>
              <a
                href="#writing"
                className="inline-flex min-h-11 items-center justify-center gap-2 px-4 text-sm font-semibold text-white/78 hover:text-white"
              >
                Read the latest writing
                <ArrowRight className="size-4" aria-hidden="true" />
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border/60 bg-card/44">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-8 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
          <div>
            <p className="font-display text-base font-bold">Pavao Pahljina</p>
            <p className="mt-1 text-xs text-muted-foreground">
              Bitcoin Standard advisory · Bitcoin Core education
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-3 text-sm font-medium text-muted-foreground">
            <a
              href="https://x.com/btcpavao"
              target="_blank"
              rel="noopener noreferrer"
            >
              X
            </a>
            <a
              href="https://primal.net/btcpavao"
              target="_blank"
              rel="noopener noreferrer"
            >
              Nostr
            </a>
            <a
              href="https://www.linkedin.com/in/pavaopahljina/"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
            <a href="mailto:pavao@hey.com">Email</a>
          </div>
        </div>
      </footer>

      {showBackToTop ? (
        <Button
          type="button"
          variant="outline"
          size="icon"
          className="home-icon-button fixed right-4 z-50 size-11 rounded-full bg-background/92 shadow-[var(--shadow-border-hover)] backdrop-blur md:right-6"
          style={{ bottom: "calc(env(safe-area-inset-bottom, 0px) + 1rem)" }}
          onClick={scrollToTop}
          aria-label="Back to top"
          title="Back to top"
        >
          <ArrowUp className="size-4" aria-hidden="true" />
        </Button>
      ) : null}
    </div>
  )
}
