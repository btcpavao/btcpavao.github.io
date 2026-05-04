import { useEffect, useRef, useState } from "react"
import {
  ArrowUp,
  ArrowUpRight,
  BookOpen,
  CalendarDays,
  Globe2,
  Mail,
  Menu,
  MoonStar,
  RadioTower,
  SunMedium,
  Users,
  X,
} from "lucide-react"

import { useTheme } from "@/components/theme-provider"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

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

const focusItems = [
  {
    category: "Advisory",
    heading: "Practical Bitcoin-standard guidance",
    description:
      "One-on-one conversations for Bitcoiners who want to organize money, habits, risk, and next steps around Bitcoin.",
    cta: "Book a call",
    href: "https://cal.com/btcpavao/meeting",
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
      "Supporting TwentyOne.World and DvadesetJedan through events, livestreams, media, and community infrastructure.",
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

const sectionReveal =
  "animate-initial:opacity-0 animate-inview:opacity-100 animate-initial:y-8 animate-inview:y-0 animate-duration-700 animate-ease-out animate-once"
const itemReveal =
  "animate-initial:opacity-0 animate-inview:opacity-100 animate-initial:y-6 animate-inview:y-0 animate-duration-600 animate-ease-out animate-once"
const subtleReveal =
  "animate-initial:opacity-0 animate-inview:opacity-100 animate-initial:y-4 animate-inview:y-0 animate-duration-500 animate-ease-out animate-once"
const liftHover =
  "transition-[border-color,box-shadow,background-color,color] duration-300 hover:border-primary/35 hover:shadow-[0_18px_40px_hsl(var(--hero-shadow)/0.08)]"
const staggerDelays = ["animate-delay-0", "animate-delay-100", "animate-delay-200", "animate-delay-300"]

const projectGroups = [
  {
    title: "Core Work",
    description: "Work in the Bitcoin industry.",
    items: [
      {
        title: "Saifedean.com",
        focus: "Education",
        role:
          "Bitcoin education, Austrian economics, and high-signal learning infrastructure.",
        description:
          "Work around Bitcoin education, Austrian economics, and high-signal learning infrastructure.",
        href: "https://saifedean.com",
        icon: BookOpen,
        cta: "Visit site",
      },
      {
        title: "TheSaifHouse.com",
        focus: "Books",
        role:
          "Books, global fulfillment, checkout experience, and Bitcoin-native commerce.",
        description:
          "Bitcoin books delivered worldwide with a strong checkout and customer experience across bitcoin and fiat rails.",
        href: "https://thesaifhouse.com",
        icon: Globe2,
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
        role:
          "Turning Bitcoin conviction into everyday monetary habits.",
        description:
          "My open-source guide for turning Bitcoin conviction into everyday monetary habits.",
        href: "https://btcpavao.gitbook.io/practical-bitcoin-standard/",
        icon: BookOpen,
        cta: "Read guide",
      },
      {
        title: "TwentyOne.World",
        focus: "Community network",
        role:
          "Local community discovery, network coordination, and Bitcoin signal.",
        description:
          "A global network of local Bitcoin communities helping people find signal, events, and peers.",
        href: "https://twentyone.world",
        icon: Users,
        cta: "Visit site",
      },
      {
        title: "DvadesetJedan.com",
        focus: "Balkan Bitcoin media",
        role:
          "Balkan Bitcoin signal, livestreams, Telegram discussion, and local meetups.",
        description:
          "Balkan Bitcoin community focused on clean signal, livestreams, Telegram discussion, and local meetups.",
        href: "https://dvadesetjedan.com",
        icon: RadioTower,
        cta: "Visit site",
      },
    ],
  },
]

function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const isDark = theme === "dark"

  return (
    <Button
      variant="outline"
      size="icon"
      className="glimmer-button inline-flex size-10 min-h-10 min-w-10 shrink-0 items-center justify-center rounded-full border-border/70 bg-background/85 p-0 leading-none backdrop-blur"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      title={isDark ? "Switch to light theme" : "Switch to dark theme"}
    >
      {isDark ? <SunMedium className="size-4" /> : <MoonStar className="size-4" />}
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
      <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-muted-foreground">
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

export function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [showBackToTop, setShowBackToTop] = useState(false)
  const firstMobileLinkRef = useRef<HTMLAnchorElement | null>(null)

  useEffect(() => {
    function handleKeydown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setMobileMenuOpen(false)
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
    <div className="relative min-h-screen overflow-x-clip bg-background text-foreground">
      <div
        aria-hidden="true"
        className="page-atmosphere pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,hsl(var(--hero-glow)/0.18)_0%,transparent_30%),radial-gradient(circle_at_85%_10%,hsl(var(--hero-ember)/0.16)_0%,transparent_18%),linear-gradient(180deg,hsl(var(--background))_0%,hsl(var(--background))_42%,hsl(var(--muted)/0.72)_150%)]"
      />
      <div
        aria-hidden="true"
        className="page-grid pointer-events-none absolute inset-0 opacity-55 [background-image:linear-gradient(hsl(var(--border)/0.28)_1px,transparent_1px),linear-gradient(90deg,hsl(var(--border)/0.28)_1px,transparent_1px)] [background-size:68px_68px] [mask-image:linear-gradient(180deg,black,transparent_84%)]"
      />
      <div aria-hidden="true" className="ambient-orb ambient-orb-left" />
      <div aria-hidden="true" className="ambient-orb ambient-orb-right" />

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
                className={`inline-flex h-10 items-center justify-center rounded-full px-4 text-sm font-medium text-muted-foreground transition hover:bg-card/70 hover:text-foreground glimmer-button ${liftHover}`}
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
                  className={`inline-flex h-10 min-h-10 shrink-0 items-center justify-center rounded-full border border-border/70 bg-background/80 px-4 leading-none text-sm font-medium text-muted-foreground transition hover:border-primary/30 hover:bg-card hover:text-foreground glimmer-button ${liftHover}`}
                >
                  {link.label}
                </a>
              ))}
            </div>

            <ThemeToggle />

            <Button
              variant="outline"
              size="icon"
              className={`glimmer-button inline-flex size-10 min-h-10 min-w-10 shrink-0 items-center justify-center rounded-full border-border/70 bg-background/85 p-0 leading-none lg:hidden ${liftHover}`}
              onClick={() => setMobileMenuOpen((open) => !open)}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-nav"
              aria-label={mobileMenuOpen ? "Close navigation" : "Open navigation"}
            >
              {mobileMenuOpen ? (
                <X className="size-4" />
              ) : (
                <Menu className="size-4" />
              )}
            </Button>
          </div>
        </div>

        {mobileMenuOpen ? (
          <div id="mobile-nav" className="mx-auto max-w-6xl px-4 pb-4 lg:hidden">
            <Card className={`overflow-hidden rounded-[28px] border-border/70 bg-card/95 py-0 shadow-soft ${itemReveal}`}>
              <CardContent className="grid gap-3 p-4">
                <div className="grid gap-2">
                  {sectionLinks.map((link) => (
                    <a
                      key={link.href}
                      ref={link.href === sectionLinks[0].href ? firstMobileLinkRef : undefined}
                      href={link.href}
                      className={`rounded-2xl px-4 py-3 text-sm font-medium text-foreground transition hover:bg-background/70 glimmer-button ${liftHover}`}
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
                      className={`rounded-2xl border border-border/70 bg-background/80 px-4 py-3 text-center text-sm font-medium text-muted-foreground transition hover:text-foreground glimmer-button ${liftHover}`}
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        ) : null}
      </header>

      <main id="top" className="mx-auto max-w-6xl px-4 pb-20 pt-8 sm:px-6 lg:px-8 lg:pt-12">
        <section className="flex flex-col gap-8">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1.25fr)_360px] lg:items-start">
            <div className="space-y-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-card/80 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-muted-foreground backdrop-blur">
              <span className="size-2 rounded-full bg-primary" />
              Pavao Pahljina
            </div>

            <div className="space-y-5">
              <p className="text-sm font-medium uppercase tracking-[0.24em] text-muted-foreground">
                Bitcoin Standard Advisory
              </p>
              <h1 className="max-w-[11ch] font-display text-4xl font-bold leading-[0.95] tracking-[-0.06em] text-balance sm:max-w-[12ch] sm:text-6xl sm:tracking-[-0.07em] lg:text-7xl">
                Practical guidance for living on a Bitcoin standard.
              </h1>
              <p className="max-w-3xl text-lg leading-8 text-muted-foreground sm:text-xl">
                I help Bitcoiners organize their money, habits, and community life around Bitcoin through writing, advisory calls, and hands-on project work.
              </p>
              <p className="max-w-2xl rounded-2xl border border-border/70 bg-card/64 px-4 py-3 text-sm leading-7 text-muted-foreground">
                For Bitcoiners who already understand why Bitcoin matters and want a practical path for using it as money.
              </p>
            </div>

            <div className="flex flex-col items-start gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <Button
                asChild
                size="lg"
                className="rounded-full px-6 shadow-[0_20px_40px_hsl(var(--primary)/0.22)] animate-hover:scale-105 animate-tap:scale-95 animate-spring animate-stiffness-400 animate-damping-24"
              >
                <a
                  href="https://cal.com/btcpavao/meeting"
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
                className="rounded-full border-border/70 bg-background/80 px-6 animate-hover:scale-105 animate-tap:scale-95 animate-spring animate-stiffness-400 animate-damping-24"
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
                className="h-auto px-1 text-sm font-semibold animate-hover:scale-105 animate-tap:scale-95 animate-spring animate-stiffness-400 animate-damping-24"
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
                <div className="absolute inset-4 -z-10 rounded-full bg-[radial-gradient(circle,hsl(var(--hero-glow)/0.35),transparent_72%)] blur-2xl" />
                <Avatar className="size-full rounded-full border-4 border-background shadow-[0_30px_80px_hsl(var(--hero-shadow)/0.16)]">
                  <AvatarImage
                    src="https://avatars.githubusercontent.com/u/109140795?v=4"
                    alt="Pavao GitHub profile image"
                    className="avatar-shimmer"
                  />
                  <AvatarFallback>PP</AvatarFallback>
                </Avatar>
              </div>

              <div className="text-center">
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-muted-foreground">
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
                <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
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
                . I have spent over 10,000 hours studying, teaching, and
                working in Bitcoin.
              </p>
            </div>
          </div>
        </section>

        <section id="advisory" className={sectionReveal + " mt-16 border-t border-border/60 pt-16"}>
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

          <div className={subtleReveal + " mt-8 flex flex-col gap-4 rounded-[30px] border border-border/70 bg-card/76 p-6 shadow-soft sm:flex-row sm:items-center sm:justify-between"}>
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
              className="glimmer-button shrink-0 rounded-full px-6 shadow-[0_20px_40px_hsl(var(--primary)/0.22)]"
            >
              <a
                href="https://cal.com/btcpavao/meeting"
                target="_blank"
                rel="noopener noreferrer"
              >
                Book an advisory call
                <CalendarDays className="size-4" />
              </a>
            </Button>
          </div>
        </section>

        <section id="work" className={sectionReveal + " mt-16 border-t border-border/60 pt-16"}>
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
                  <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
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
                    rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  >
                    {item.cta}
                    <ArrowUpRight className="size-4" />
                  </a>
                </Button>
              </div>
            ))}
          </div>

        </section>

        <section id="projects" className={sectionReveal + " mt-16 border-t border-border/60 pt-16"}>
          <SectionHeader
            eyebrow="Projects"
            title="Where the work lives"
            copy="Start with the part that matches your intent: company work, public writing, or community media."
          />

          <div className={itemReveal + " mt-8 space-y-10"}>
            {projectGroups.map((group) => (
              <div key={group.title} className={itemReveal + " grid gap-6 lg:grid-cols-[260px_minmax(0,1fr)]"}>
                <div className="lg:pt-2">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                    {group.title}
                  </p>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">
                    {group.description}
                  </p>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  {group.items.map((item, index) => {
                    const Icon = item.icon

                    return (
                      <Card
                        key={item.title}
                        className={`group rounded-[28px] border-border/70 bg-card/82 py-0 shadow-soft transition duration-300 hover:shadow-float ${liftHover} ${staggerDelays[index % staggerDelays.length] ?? ""}`}
                      >
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between gap-4">
                            <div className="rounded-2xl border border-border/70 bg-background/70 p-3 text-primary">
                              <Icon className="size-5" />
                            </div>
                            <span className="h-px flex-1 bg-border/70" />
                          </div>

                          <h3 className="mt-6 font-display text-2xl font-bold tracking-[-0.04em] text-foreground">
                            {item.title}
                          </h3>
                          <p className="mt-3 inline-flex rounded-full border border-border/70 bg-background/70 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                            {item.focus}
                          </p>
                          <p className="mt-3 text-sm leading-7 text-muted-foreground">
                            {item.description}
                          </p>
                          <div className="mt-4 rounded-2xl border border-border/70 bg-background/62 p-4">
                            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
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
                              <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
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

          <Card className={subtleReveal + " mt-10 overflow-hidden rounded-[32px] border-border/70 bg-card/86 py-0 shadow-soft"}>
            <CardContent className="grid gap-6 p-6 sm:p-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                  Balkan Bitcoin
                </p>
                <h3 className="mt-3 font-display text-2xl font-bold tracking-[-0.04em] text-foreground">
                  For Balkan Bitcoiners
                </h3>
                <p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground">
                  I also support the DvadesetJedan community through local Bitcoin signal, livestreams, Telegram discussion, and meetups.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
                <Button
                  asChild
                  size="lg"
                  className="glimmer-button rounded-full px-6 shadow-[0_20px_40px_hsl(var(--primary)/0.2)]"
                >
                  <a
                    href="https://dvadesetjedan.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Visit DvadesetJedan
                  </a>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="glimmer-button rounded-full border-border/70 bg-background/82 px-6"
                >
                  <a
                    href="https://www.youtube.com/@dvadesetjedan/streams"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Watch livestreams
                    <ArrowUpRight className="size-4" />
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>

        <section id="for-you" className={sectionReveal + " mt-16 border-t border-border/60 pt-16"}>
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

        <section id="contact" className={sectionReveal + " mt-16 border-t border-border/60 pt-16"}>
          <Card className={sectionReveal + " overflow-hidden rounded-[38px] border-border/70 bg-card/86 py-0 shadow-float"}>
            <CardContent className={itemReveal + " grid gap-8 p-6 sm:p-8 lg:grid-cols-[minmax(0,1.2fr)_320px] lg:p-10"}>
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
                    className="glimmer-button rounded-full px-6 shadow-[0_20px_40px_hsl(var(--primary)/0.22)] transition-[border-color,box-shadow,background-color,color] duration-300 hover:border-primary/35 hover:shadow-[0_24px_48px_hsl(var(--primary)/0.24)]"
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
                    className="glimmer-button rounded-full border-border/70 bg-background/82 px-6 transition-[border-color,box-shadow,background-color,color] duration-300 hover:border-primary/35 hover:bg-card hover:shadow-[0_18px_40px_hsl(var(--hero-shadow)/0.08)]"
                  >
                    <a
                      href="https://cal.com/btcpavao/meeting"
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
                    className="glimmer-button rounded-full border-border/70 bg-background/82 px-6 transition-[border-color,box-shadow,background-color,color] duration-300 hover:border-primary/35 hover:bg-card hover:shadow-[0_18px_40px_hsl(var(--hero-shadow)/0.08)]"
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

              <div className={`animate-initial:opacity-0 animate-inview:opacity-100 animate-initial:y-6 animate-inview:y-0 animate-duration-600 animate-ease-out animate-once animate-delay-100 rounded-[30px] border border-border/70 bg-background/76 p-6 animate-initial:x-6 animate-inview:x-0`}>
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                  Need a starting point?
                </p>
                <p className="mt-4 text-base leading-8 text-muted-foreground">
                  If you are unsure where to start, send an email or book a call and I will point you toward the right resource, conversation, or community.
                </p>

                <div className="mt-6 space-y-3">
                  <a
                    href="mailto:pavao@hey.com"
                    className="glimmer-button block rounded-2xl border border-border/70 px-4 py-3 text-sm font-medium text-foreground transition hover:bg-card/70"
                  >
                    pavao@hey.com
                  </a>
                  <a
                    href="https://cal.com/btcpavao/meeting"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glimmer-button block rounded-2xl border border-border/70 px-4 py-3 text-sm font-medium text-foreground transition hover:bg-card/70"
                  >
                    cal.com/btcpavao/meeting
                  </a>
                  <a
                    href="https://btcpavao.gitbook.io/practical-bitcoin-standard/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glimmer-button block rounded-2xl border border-border/70 px-4 py-3 text-sm font-medium text-foreground transition hover:bg-card/70"
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
                className="glimmer-button rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition hover:bg-card/70 hover:text-foreground"
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
                className="glimmer-button rounded-full border border-border/70 bg-background/80 px-4 py-2 text-sm font-medium text-muted-foreground transition hover:border-primary/30 hover:bg-card hover:text-foreground"
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
          size="icon"
          className="glimmer-button floating-top-button fixed bottom-4 right-4 z-50 inline-flex size-10 min-h-10 min-w-10 shrink-0 items-center justify-center rounded-full border border-border/70 bg-background/94 p-0 leading-none shadow-soft md:bottom-6 md:right-6"
          style={{ bottom: "calc(env(safe-area-inset-bottom, 0px) + 1rem)" }}
          onClick={scrollToTop}
          aria-label="Back to top"
        >
          <ArrowUp className="size-4" />
        </Button>
      ) : null}
    </div>
  )
}

export default App
