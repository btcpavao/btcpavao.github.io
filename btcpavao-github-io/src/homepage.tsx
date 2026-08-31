import { useEffect, useState, type ReactNode } from "react"
import {
  ArrowRight,
  ArrowUp,
  ArrowUpRight,
  Building2,
  Check,
  KeyRound,
  RefreshCcw,
  Users,
  type LucideIcon,
} from "lucide-react"

import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ValueForValueCard } from "@/components/value-for-value"
import { contentRegistry } from "@/content-registry"
import {
  BITCOIN_CORE_WALLET_GUIDE_PATH,
  EN_BITCOIN_CORE_CURRICULUM_PATH,
  EN_BITCOIN_CORE_SERIES_PATH,
  LONG_ROAD_BITCOIN_CORE_ARTICLE_PATH,
  START_HERE_PATH,
} from "@/routes"
import { BOOKING_URL } from "@/site-config"

const PRACTICAL_BITCOIN_STANDARD_URL =
  "https://btcpavao.gitbook.io/practical-bitcoin-standard/"

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

const latestPosts = contentRegistry
  .filter(
    (entry) =>
      entry.locale === "en" &&
      entry.contentType === "article" &&
      entry.status === "published" &&
      entry.publishedAt
  )
  .sort((a, b) => String(b.publishedAt).localeCompare(String(a.publishedAt)))
  .slice(0, 3)
  .map((entry) => ({
    category: entry.section.startsWith("core") ? "Bitcoin Core" : "Writing",
    language: "EN",
    date: new Intl.DateTimeFormat("en", {
      dateStyle: "long",
      timeZone: "UTC",
    }).format(new Date(`${entry.publishedAt}T00:00:00Z`)),
    title: entry.title.replace(/ \| BTC Pavao$/, ""),
    copy: entry.description,
    href: entry.path,
  }))

const projects = [
  {
    title: "Saifedean.com",
    label: "My work: education operations",
    copy: "I contributed to the systems that deliver Bitcoin and Austrian economics education.",
    href: "https://saifedean.com",
    logo: "/project-logos/saifedean.avif",
  },
  {
    title: "TheSaifHouse.com",
    label: "My work: publishing operations",
    copy: "I contributed to the publishing, customer experience, and operational side of the project.",
    href: "https://thesaifhouse.com",
    logo: "/project-logos/the-saif-house.png",
  },
  {
    title: "TwentyOne.World",
    label: "My work: community operations",
    copy: "I contribute to a network built around local Bitcoin communities and coordination.",
    href: "https://twentyone.world",
    logo: "/project-logos/twentyone-world-v2.svg",
  },
  {
    title: "Practical Bitcoin Standard",
    label: "My work: open writing",
    copy: "I write and maintain this open guide to putting Bitcoin principles into everyday practice.",
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

function setMeta(name: string, content: string) {
  const element = document.head.querySelector<HTMLMetaElement>(
    `meta[name="${name}"]`
  )
  if (element) element.content = content
}

export function Homepage() {
  const [showBackToTop, setShowBackToTop] = useState(false)

  useEffect(() => {
    const title =
      "Bitcoin Standard Advisory and Bitcoin Core Education | BTC Pavao"
    const description =
      "Practical guidance for individuals, families, and businesses building a life on a Bitcoin standard, with beginner-friendly education on Bitcoin Core, custody, backup, and recovery."

    document.documentElement.lang = "en"
    document.title = title
    setMeta("description", description)
    setMeta("twitter:title", title)
    setMeta("twitter:description", description)

    const handleScroll = () => setShowBackToTop(window.scrollY > 480)

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

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

      <SiteHeader />

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

          <div className="mx-auto flex min-h-[37rem] max-w-7xl items-center px-4 py-14 sm:min-h-[40rem] sm:px-6 sm:py-16 lg:px-8 lg:py-20">
            <div className="home-hero-copy max-w-3xl">
              <Eyebrow>
                Bitcoin Standard advisory · Bitcoin Core education
              </Eyebrow>
              <h1 className="mt-5 max-w-[14ch] font-display text-5xl leading-[0.96] font-bold tracking-[-0.055em] text-balance sm:text-6xl lg:text-[4.75rem]">
                Build a Bitcoin life you can explain, recover, and maintain.
              </h1>
              <p className="mt-7 max-w-2xl text-lg leading-8 text-muted-foreground sm:text-xl sm:leading-9">
                Practical Bitcoin Standard advisory and first-principles
                self-custody education for individuals, families, and businesses
                who want fewer hidden assumptions in their setup.
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
                  <a href={START_HERE_PATH}>
                    Start with Bitcoin Core
                    <ArrowRight className="size-4" aria-hidden="true" />
                  </a>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="min-h-12 rounded-full bg-background/80 px-6 backdrop-blur-sm"
                >
                  <a
                    href={BOOKING_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Book a Value for Value conversation
                  </a>
                </Button>
              </div>
              <p className="mt-4 max-w-xl text-sm leading-6 text-muted-foreground">
                Advisory calls are offered on a value-for-value basis: after the
                conversation, contribute what it was worth to you.
              </p>
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
          className="mx-auto max-w-7xl scroll-mt-24 px-4 py-16 sm:px-6 sm:py-20 lg:px-8"
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
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
            <SectionIntro
              eyebrow="Custody philosophy"
              title="Custody is a progression, not a purity test."
              copy="A custody system is useful only if the people responsible for it understand it, can maintain it, and can recover it under pressure."
            />
            <div className="mt-8 grid gap-5 text-base leading-8 text-muted-foreground lg:grid-cols-2 lg:gap-12">
              <p>
                An air-gapped computer, a custom descriptor, or a complex
                multisig policy should not be the starting point for everyone. A
                simpler wallet, and even a custodial service, can be a
                reasonable temporary choice while a beginner is learning.
              </p>
              <p>
                For meaningful savings, my recommended destination is generic
                dedicated hardware booted from trusted Tails media for the
                offline Bitcoin Core signer, paired with a separate online
                Bitcoin Core node on normal secured Linux. The system still
                needs wallet encryption, redundant encrypted Core backups, a
                separately stored passphrase, PSBT-based signing, and a tested
                recovery procedure. Add complexity only when every part is
                understood and repeatable.
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
          className="mx-auto max-w-7xl scroll-mt-24 px-4 py-16 sm:px-6 sm:py-20 lg:px-8"
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

        <section
          id="tutorials"
          className="scroll-mt-24 border-y border-border/60 bg-card/48"
        >
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
            <SectionIntro
              eyebrow="Bitcoin Core tutorials"
              title="Choose the depth that fits your next step."
              copy="Follow the complete self-custody learning path, or use the focused wallet guide when you need a practical setup, backup, and recovery walkthrough."
            />

            <div className="mt-10 grid gap-5 lg:grid-cols-2">
              <a
                href={EN_BITCOIN_CORE_CURRICULUM_PATH}
                className="group flex min-h-[20rem] flex-col rounded-[32px] bg-background p-6 shadow-[var(--shadow-border)] transition-[background-color,box-shadow,transform] duration-300 hover:-translate-y-1 hover:bg-card hover:shadow-[var(--shadow-border-hover)] active:translate-y-0 active:scale-[0.96] sm:p-9"
              >
                <div className="flex items-center justify-between gap-4">
                  <span className="grid size-12 place-items-center rounded-full bg-primary/12 text-primary">
                    <KeyRound className="size-5" aria-hidden="true" />
                  </span>
                  <span className="rounded-full bg-card px-3 py-2 text-[11px] font-bold tracking-[0.14em] text-muted-foreground uppercase shadow-[var(--shadow-border)]">
                    Full tutorial
                  </span>
                </div>
                <h3 className="mt-8 max-w-[18ch] font-display text-3xl leading-[1.02] font-bold tracking-[-0.045em] text-balance sm:text-4xl">
                  Bitcoin self-custody
                </h3>
                <p className="mt-4 max-w-xl text-base leading-8 text-pretty text-muted-foreground">
                  A structured, progress-tracked course for understanding the
                  model, practicing recovery, and building toward more advanced
                  custody workflows.
                </p>
                <span className="mt-auto inline-flex min-h-11 items-center gap-2 pt-7 text-sm font-semibold group-hover:text-primary">
                  Open the tutorial
                  <ArrowUpRight className="size-4" aria-hidden="true" />
                </span>
              </a>

              <a
                href={BITCOIN_CORE_WALLET_GUIDE_PATH}
                className="group flex min-h-[20rem] flex-col rounded-[32px] bg-background p-6 shadow-[var(--shadow-border)] transition-[background-color,box-shadow,transform] duration-300 hover:-translate-y-1 hover:bg-card hover:shadow-[var(--shadow-border-hover)] active:translate-y-0 active:scale-[0.96] sm:p-9"
              >
                <div className="flex items-center justify-between gap-4">
                  <span className="grid size-12 place-items-center rounded-full bg-primary/12 text-primary">
                    <Check className="size-5" aria-hidden="true" />
                  </span>
                  <span className="rounded-full bg-card px-3 py-2 text-[11px] font-bold tracking-[0.14em] text-muted-foreground uppercase shadow-[var(--shadow-border)]">
                    Quick guide
                  </span>
                </div>
                <h3 className="mt-8 max-w-[20ch] font-display text-3xl leading-[1.02] font-bold tracking-[-0.045em] text-balance sm:text-4xl">
                  Wallet setup, backup & recovery
                </h3>
                <p className="mt-4 max-w-xl text-base leading-8 text-pretty text-muted-foreground">
                  A focused step-by-step guide to creating an encrypted Bitcoin
                  Core wallet, making redundant backups, and proving that you
                  can restore it.
                </p>
                <span className="mt-auto inline-flex min-h-11 items-center gap-2 pt-7 text-sm font-semibold group-hover:text-primary">
                  Open the quick guide
                  <ArrowUpRight className="size-4" aria-hidden="true" />
                </span>
              </a>
            </div>
          </div>
        </section>

        <section className="px-4 pb-16 sm:px-6 sm:pb-20 lg:px-8">
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
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
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
          className="mx-auto max-w-7xl scroll-mt-24 px-4 py-16 sm:px-6 sm:py-20 lg:px-8"
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
                "Self-custody",
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
          </div>
        </section>

        <section className="px-4 pb-16 sm:px-6 sm:pb-20 lg:px-8">
          <ValueForValueCard language="en" className="mx-auto max-w-7xl" />
        </section>

        <section
          id="about"
          className="scroll-mt-24 border-y border-border/60 bg-card/48"
        >
          <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-16 lg:px-8">
            <figure className="mx-auto w-full max-w-[240px] rounded-full bg-background p-2 shadow-[var(--shadow-border)] lg:mx-0">
              <img
                src="/pavao-profile.webp"
                alt="Pavao"
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

        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <SectionIntro
            eyebrow="Work and projects"
            title="Work in the Bitcoin space."
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
          className="scroll-mt-24 px-4 pb-16 sm:px-6 sm:pb-20 lg:px-8"
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
              <p className="mt-5 max-w-2xl text-sm leading-7 text-white/72">
                Advisory calls work on a value-for-value basis. There is no
                fixed fee: contribute what the conversation was worth to you.
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
                  Book a Value for Value conversation
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
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />

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
