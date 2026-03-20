import { useEffect, useState } from "react"
import {
  ArrowUpRight,
  BookOpen,
  CalendarDays,
  Globe2,
  Linkedin,
  Mail,
  Menu,
  MoonStar,
  Nfc,
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
  { label: "Work", href: "#work" },
  { label: "Projects", href: "#projects" },
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
    title: "Advisory",
    description:
      "Helping people adopt Bitcoin-standard thinking with practical next steps.",
  },
  {
    title: "Writing",
    description:
      "Expanding Practical Bitcoin Standard into a durable open-source guide.",
  },
  {
    title: "Communities",
    description:
      "Supporting TwentyOne.World and DvadesetJedan through signal, events, and media.",
  },
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
  "animate-hover:-y-2 animate-hover:scale-105 animate-tap:scale-95 animate-spring animate-stiffness-300 animate-damping-24"
const staggerDelays = ["animate-delay-0", "animate-delay-100", "animate-delay-200", "animate-delay-300"]

const projectGroups = [
  {
    title: "Core Work",
    description: "Projects where I actively build, advise, and contribute.",
    items: [
      {
        title: "Saifedean.com",
        description:
          "Work and contributions around Austrian economics and Bitcoin education.",
        href: "https://saifedean.com",
        icon: BookOpen,
        cta: "Visit site",
      },
      {
        title: "TheSaifHouse.com",
        description:
          "The best bitcoin books delivered worldwide in all formats, at the best prices, with the best bitcoin & fiat checkout experience.",
        href: "https://thesaifhouse.com",
        icon: Globe2,
        cta: "Visit site",
      },
      {
        title: "TwentyOne.World",
        description: "A global network of local Bitcoin communities.",
        href: "https://twentyone.world",
        icon: Users,
        cta: "Visit site",
      },
      {
        title: "DvadesetJedan.com",
        description:
          "Balkan Bitcoin community with clean Bitcoin signal, livestreams, Telegram, and local meetups.",
        href: "https://dvadesetjedan.com",
        icon: RadioTower,
        cta: "Visit site",
      },
    ],
  },
  {
    title: "Media and Writing",
    description: "Where the ideas, commentary, and educational work live.",
    items: [
      {
        title: "DvadesetJedan Weekly Livestreams",
        description:
          "Weekly YouTube livestreams covering Bitcoin signal, news, and community discussion.",
        href: "https://www.youtube.com/@dvadesetjedan/streams",
        icon: RadioTower,
        cta: "Watch now",
      },
      {
        title: "Practical Bitcoin Standard",
        description:
          "My open-source guide for living on a full Bitcoin standard.",
        href: "https://btcpavao.gitbook.io/practical-bitcoin-standard/",
        icon: BookOpen,
        cta: "Read guide",
      },
    ],
  },
  {
    title: "Profiles and Contact",
    description: "Direct channels for updates, collaboration, and support.",
    items: [
      {
        title: "X Profile",
        description: "Daily thoughts, Bitcoin signal, and direct updates.",
        href: "https://x.com/btcpavao",
        icon: ArrowUpRight,
        cta: "Open profile",
      },
      {
        title: "Nostr Profile",
        description:
          "Decentralized social presence on Primal and the wider Nostr network.",
        href: "https://primal.net/btcpavao",
        icon: Nfc,
        cta: "Open profile",
      },
      {
        title: "LinkedIn Profile",
        description:
          "Professional updates, background, and collaboration details.",
        href: "https://www.linkedin.com/in/pavaopahljina/",
        icon: Linkedin,
        cta: "Open profile",
      },
      {
        title: "Schedule Advisory Call",
        description:
          "Schedule a meeting for support, questions, or collaboration.",
        href: "https://cal.com/btcpavao/meeting",
        icon: CalendarDays,
        cta: "Open calendar",
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
      className="rounded-full border-border/70 bg-background/85 backdrop-blur"
      onClick={() => setTheme(isDark ? "light" : "dark")}
    >
      {isDark ? <SunMedium className="size-4" /> : <MoonStar className="size-4" />}
      <span className="sr-only">Toggle theme</span>
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

  useEffect(() => {
    function handleKeydown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setMobileMenuOpen(false)
      }
    }

    function handleResize() {
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false)
      }
    }

    window.addEventListener("keydown", handleKeydown)
    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("keydown", handleKeydown)
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return (
    <div className="relative min-h-screen overflow-x-clip bg-background text-foreground">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,hsl(var(--hero-glow)/0.18)_0%,transparent_30%),radial-gradient(circle_at_85%_10%,hsl(var(--hero-ember)/0.16)_0%,transparent_18%),linear-gradient(180deg,hsl(var(--background))_0%,hsl(var(--background))_42%,hsl(var(--muted)/0.72)_150%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-55 [background-image:linear-gradient(hsl(var(--border)/0.28)_1px,transparent_1px),linear-gradient(90deg,hsl(var(--border)/0.28)_1px,transparent_1px)] [background-size:68px_68px] [mask-image:linear-gradient(180deg,black,transparent_84%)]"
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

          <nav className="hidden items-center gap-1 md:flex">
            {sectionLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition hover:bg-card/70 hover:text-foreground ${liftHover}`}
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
                  className={`rounded-full border border-border/70 bg-background/80 px-4 py-2 text-sm font-medium text-muted-foreground transition hover:border-primary/30 hover:bg-card hover:text-foreground ${liftHover}`}
                >
                  {link.label}
                </a>
              ))}
            </div>

            <ThemeToggle />

            <Button
              variant="outline"
              size="icon"
              className={`rounded-full border-border/70 bg-background/85 md:hidden ${liftHover}`}
              onClick={() => setMobileMenuOpen((open) => !open)}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-nav"
            >
              {mobileMenuOpen ? (
                <X className="size-4" />
              ) : (
                <Menu className="size-4" />
              )}
              <span className="sr-only">Toggle navigation</span>
            </Button>
          </div>
        </div>

        {mobileMenuOpen ? (
          <div id="mobile-nav" className="mx-auto max-w-6xl px-4 pb-4 md:hidden">
            <Card className={`overflow-hidden rounded-[28px] border-border/70 bg-card/95 py-0 shadow-soft ${itemReveal}`}>
              <CardContent className="grid gap-3 p-4">
                <div className="grid gap-2">
                  {sectionLinks.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      className={`rounded-2xl px-4 py-3 text-sm font-medium text-foreground transition hover:bg-background/70 ${liftHover}`}
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
                      className={`rounded-2xl border border-border/70 bg-background/80 px-4 py-3 text-center text-sm font-medium text-muted-foreground transition hover:text-foreground ${liftHover}`}
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
        <section className={sectionReveal + " grid gap-8 lg:grid-cols-[minmax(0,1.25fr)_360px] lg:items-start"}>
          <div className="space-y-8">
            <div className={subtleReveal + " inline-flex items-center gap-2 rounded-full border border-border/70 bg-card/80 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-muted-foreground backdrop-blur"}>
              <span className="size-2 rounded-full bg-primary" />
              Pavao Pahljina
            </div>

            <div className={`animate-initial:opacity-0 animate-inview:opacity-100 animate-initial:y-6 animate-inview:y-0 animate-duration-600 animate-ease-out animate-once animate-delay-100 space-y-5`}>
              <p className="text-sm font-medium uppercase tracking-[0.24em] text-muted-foreground">
                Bitcoin Standard Advisory
              </p>
              <h1 className="max-w-[12ch] font-display text-5xl font-bold leading-[0.92] tracking-[-0.07em] text-balance sm:text-6xl lg:text-7xl">
                Signal for living on a Bitcoin standard.
              </h1>
              <p className="max-w-3xl text-lg leading-8 text-muted-foreground sm:text-xl">
                Practical Bitcoin standard ideas, tools, and money habits from
                my own journey. This serves as a central hub for my writing,
                advisory work, and community across global Bitcoin networks.
              </p>
            </div>

            <div className={`animate-initial:opacity-0 animate-inview:opacity-100 animate-initial:y-4 animate-inview:y-0 animate-duration-500 animate-ease-out animate-once animate-delay-200 flex flex-wrap gap-3`}>
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

            <p className={`animate-initial:opacity-0 animate-inview:opacity-100 animate-initial:y-4 animate-inview:y-0 animate-duration-500 animate-ease-out animate-once animate-delay-300 max-w-3xl text-sm leading-7 text-muted-foreground`}>
              Start with the guide if you are exploring, schedule a call if you
              want direct help, or send an email if collaboration is the better
              fit.
            </p>

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
          </div>

          <Card className={`overflow-hidden rounded-[36px] border-border/70 bg-card/84 py-0 shadow-float backdrop-blur animate-initial:opacity-0 animate-inview:opacity-100 animate-initial:x-8 animate-inview:x-0 animate-duration-700 animate-ease-out animate-once animate-delay-200`}>
            <CardContent className="p-6 sm:p-7">
              <div className={subtleReveal + " relative mx-auto mb-6 w-full max-w-[220px]"}>
                <div className="absolute inset-4 -z-10 rounded-full bg-[radial-gradient(circle,hsl(var(--hero-glow)/0.35),transparent_72%)] blur-2xl" />
                <Avatar className="size-full rounded-full border-4 border-background shadow-[0_30px_80px_hsl(var(--hero-shadow)/0.16)]">
                  <AvatarImage
                    src="https://avatars.githubusercontent.com/u/109140795?v=4"
                    alt="Pavao GitHub profile image"
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
                  Entrepreneur / Bitcoiner
                </p>
              </div>

              <div className={`animate-initial:opacity-0 animate-inview:opacity-100 animate-initial:y-6 animate-inview:y-0 animate-duration-600 animate-ease-out animate-once animate-delay-100 mt-7 rounded-[28px] border border-border/70 bg-background/72 p-5`}>
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                  Current Focus
                </p>
                <div className="mt-4 space-y-4">
                  {focusItems.map((item, index) => (
                    <div
                      key={item.title}
                      className={`grid grid-cols-[36px_minmax(0,1fr)] gap-4 ${staggerDelays[index] ?? ""}`}
                    >
                      <div className="flex size-9 items-center justify-center rounded-full border border-border/70 bg-card text-xs font-semibold text-muted-foreground">
                        {String(index + 1).padStart(2, "0")}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-foreground">
                          {item.title}
                        </p>
                        <p className="mt-1 text-sm leading-7 text-muted-foreground">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className={`animate-initial:opacity-0 animate-inview:opacity-100 animate-initial:y-4 animate-inview:y-0 animate-duration-500 animate-ease-out animate-once animate-delay-200 mt-6 flex flex-wrap justify-center gap-2`}>
                {socialLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full border border-border/70 px-3 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground transition hover:border-primary/30 hover:text-foreground"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        <section
          id="about"
          className={sectionReveal + " mt-16 grid gap-8 border-t border-border/60 pt-16 lg:grid-cols-[minmax(0,1.1fr)_0.9fr]"}
        >
          <SectionHeader
            eyebrow="About"
            title="Trusted signal, practical guidance, and real project involvement."
            copy="The work connects education, advisory support, and community-building for people moving toward a Bitcoin standard with more clarity and conviction."
          />

          <div className="space-y-6">
            <Card className={`rounded-[30px] border-border/70 bg-card/80 py-0 shadow-soft ${liftHover}`}>
              <CardContent className="p-6 text-base leading-8 text-muted-foreground sm:p-7">
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
              </CardContent>
            </Card>

            <div className="grid gap-3">
              <div className={`rounded-[26px] border border-border/70 bg-background/74 p-5 ${liftHover}`}>
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                  Geographic range
                </p>
                <p className="mt-3 text-base leading-8 text-muted-foreground">
                  Working across worldwide Bitcoin circles while staying deeply
                  engaged with Balkan communities and regional media.
                </p>
              </div>
              <div className={`rounded-[26px] border border-border/70 bg-background/74 p-5 ${liftHover}`}>
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                  Practical orientation
                </p>
                <p className="mt-3 text-base leading-8 text-muted-foreground">
                  The emphasis is on usable signal: money habits, tools,
                  education, and communities that help people move toward a
                  Bitcoin standard in real life.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="work" className={sectionReveal + " mt-16 border-t border-border/60 pt-16"}>
          <SectionHeader
            eyebrow="Work"
            title="How I can help"
            copy="Choose the path that fits what you need most right now: direct guidance, public writing, or stronger community signal."
          />

          <div className="mt-8 grid gap-4 lg:grid-cols-3">
            {focusItems.map((item, index) => (
              <Card
                key={item.title}
                className="rounded-[30px] border-border/70 bg-card/82 py-0 shadow-soft animate-hover:-y-2 animate-hover:scale-105 animate-tap:scale-95 animate-spring animate-stiffness-300 animate-damping-24"
              >
                <CardContent className="p-6">
                  <p className="text-sm font-semibold text-muted-foreground">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-6 font-display text-2xl font-bold tracking-[-0.04em]">
                    {item.title}
                  </h3>
                  <p className="mt-4 text-base leading-8 text-muted-foreground">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-6 rounded-[34px] border border-border/70 bg-[linear-gradient(135deg,hsl(var(--card))_0%,hsl(var(--hero-ember)/0.08)_100%)] p-6 shadow-soft sm:p-8 animate-initial:opacity-0 animate-inview:opacity-100 animate-initial:y-6 animate-inview:y-0 animate-duration-700 animate-ease-out animate-once animate-delay-100">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-muted-foreground">
              Network Note
            </p>
            <p className="mt-4 max-w-4xl text-base leading-8 text-muted-foreground">
              I actively support Bitcoin communities through TwentyOne.World and
              DvadesetJedan, including livestreams, Telegram groups, and local
              meetups.
            </p>
          </div>
        </section>

        <section id="projects" className={sectionReveal + " mt-16 border-t border-border/60 pt-16"}>
          <SectionHeader
            eyebrow="Projects"
            title="Where the work lives"
            copy="Start with the part that matches your intent: company work, public writing, community media, or direct contact."
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
                          <p className="mt-3 text-sm leading-7 text-muted-foreground">
                            {item.description}
                          </p>

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
        </section>

        <section id="contact" className={sectionReveal + " mt-16 border-t border-border/60 pt-16"}>
          <Card className={sectionReveal + " overflow-hidden rounded-[38px] border-border/70 bg-card/86 py-0 shadow-float"}>
            <CardContent className={itemReveal + " grid gap-8 p-6 sm:p-8 lg:grid-cols-[minmax(0,1.2fr)_320px] lg:p-10"}>
              <div>
                <SectionHeader
                  eyebrow="Contact"
                  title="Start with the simplest path"
                  copy="Email is best for direct outreach. If you want to talk live, schedule a call. You can also follow the work on X, Nostr, LinkedIn, GitBook, DvadesetJedan.com, and the weekly YouTube livestreams."
                />

                <div className="mt-8 flex flex-wrap gap-3">
                  <Button
                    asChild
                    size="lg"
                    className="rounded-full px-6 shadow-[0_20px_40px_hsl(var(--primary)/0.22)] animate-hover:scale-105 animate-tap:scale-95 animate-spring animate-stiffness-400 animate-damping-24"
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
                    className="rounded-full border-border/70 bg-background/82 px-6 animate-hover:scale-105 animate-tap:scale-95 animate-spring animate-stiffness-400 animate-damping-24"
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
                    className="block rounded-2xl border border-border/70 px-4 py-3 text-sm font-medium text-foreground transition hover:bg-card/70"
                  >
                    pavao@hey.com
                  </a>
                  <a
                    href="https://cal.com/btcpavao/meeting"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block rounded-2xl border border-border/70 px-4 py-3 text-sm font-medium text-foreground transition hover:bg-card/70"
                  >
                    cal.com/btcpavao/meeting
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  )
}

export default App
