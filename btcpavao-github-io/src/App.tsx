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
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
const sectionLinks = [
  { label: "Purpose", href: "#purpose" },
  { label: "About", href: "#about" },
  { label: "Working On", href: "#projects" },
  { label: "Support", href: "#contact" },
]

const navLinks = [
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
    label: "hours in Bitcoin",
    copy: "Studying, teaching, and working across the ecosystem.",
  },
  {
    value: "Global + Local",
    label: "community footprint",
    copy: "Operating across worldwide and Balkan Bitcoin networks.",
  },
  {
    value: "Open Source",
    label: "public writing",
    copy: "Building a practical guide for living on a Bitcoin standard.",
  },
]

const projects = [
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
    description: "Professional updates, background, and collaboration details.",
    href: "https://www.linkedin.com/in/pavaopahljina/",
    icon: Linkedin,
    cta: "Open profile",
  },
  {
    title: "Book a Call",
    description:
      "Schedule a meeting for support, questions, or collaboration.",
    href: "https://cal.com/btcpavao/meeting",
    icon: CalendarDays,
    cta: "Open calendar",
  },
]

const contactLinks = [
  {
    label: "Email",
    value: "pavao@hey.com",
    href: "mailto:pavao@hey.com",
  },
  {
    label: "Calendar",
    value: "Cal.com /btcpavao/meeting",
    href: "https://cal.com/btcpavao/meeting",
  },
  {
    label: "Primary signal",
    value: "X, Nostr, LinkedIn, GitBook",
    href: "https://x.com/btcpavao",
  },
]

function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const isDark = theme === "dark"

  return (
    <Button
      variant="outline"
      size="icon"
      className="rounded-full border-border/60 bg-background/80 backdrop-blur"
      onClick={() => setTheme(isDark ? "light" : "dark")}
    >
      {isDark ? <SunMedium className="size-4" /> : <MoonStar className="size-4" />}
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}

function SectionEyebrow({
  title,
  subtitle,
}: {
  title: string
  subtitle: string
}) {
  return (
    <>
      <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-muted-foreground">
        {title}
      </p>
      <h2 className="mt-2 font-display text-3xl font-extrabold tracking-[-0.05em] sm:text-4xl">
        {subtitle}
      </h2>
    </>
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
    <div className="relative min-h-svh overflow-hidden bg-background text-foreground">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,hsl(var(--hero-glow))_0%,transparent_26%),radial-gradient(circle_at_85%_12%,hsl(var(--hero-ember))_0%,transparent_18%),linear-gradient(180deg,hsl(var(--background))_0%,hsl(var(--background))_38%,hsl(var(--muted))_145%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-45 [background-image:linear-gradient(hsl(var(--border)/0.35)_1px,transparent_1px),linear-gradient(90deg,hsl(var(--border)/0.35)_1px,transparent_1px)] [background-size:56px_56px] [mask-image:linear-gradient(180deg,black,transparent_88%)]"
      />
      <div
        aria-hidden="true"
        className="ambient-orb ambient-orb-left"
      />
      <div
        aria-hidden="true"
        className="ambient-orb ambient-orb-right"
      />

      <header className="sticky top-0 z-40 border-b border-border/50 bg-background/75 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <span className="hidden rounded-full border border-border/60 bg-background/70 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.22em] text-muted-foreground sm:inline-flex">
              Independent Practice
            </span>
            <a
              className="font-display text-base font-extrabold tracking-[-0.04em]"
              href="#top"
            >
              @btcpavao
            </a>
          </div>

          <div className="hidden items-center gap-2 md:flex">
            {sectionLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="rounded-full px-4 py-2 text-sm font-semibold text-muted-foreground transition hover:bg-card hover:text-foreground"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <div className="hidden items-center gap-2 lg:flex">
              {navLinks.map((link) => (
                <Button
                  key={link.label}
                  variant="outline"
                  asChild
                  className="rounded-full border-border/60 bg-background/80 px-4"
                >
                  <a href={link.href} target="_blank" rel="noopener noreferrer">
                    {link.label}
                  </a>
                </Button>
              ))}
              <Button
                asChild
                className="rounded-full px-4 shadow-[0_18px_36px_hsl(var(--primary)/0.24)]"
              >
                <a
                  href="https://cal.com/btcpavao/meeting"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Book a Call
                </a>
              </Button>
            </div>

            <ThemeToggle />

            <Button
              variant="outline"
              size="icon"
              className="rounded-full border-border/60 bg-background/80 md:hidden"
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
          <div id="mobile-nav" className="mx-auto max-w-7xl px-4 pb-4 md:hidden">
            <Card className="animate-in fade-in slide-in-from-top-2 overflow-hidden rounded-[28px] border-border/60 bg-card/92 py-0 shadow-soft duration-200">
              <CardContent className="grid gap-3 p-4">
                <div className="grid gap-2">
                  {sectionLinks.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      className="rounded-2xl bg-background/70 px-4 py-3 text-sm font-semibold transition hover:bg-background"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {link.label}
                    </a>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-2">
                  {navLinks.map((link) => (
                    <Button
                      key={link.label}
                      variant="outline"
                      asChild
                      className="rounded-2xl border-border/60 bg-background/80"
                    >
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {link.label}
                      </a>
                    </Button>
                  ))}
                </div>

                <Button
                  asChild
                  className="rounded-2xl shadow-[0_18px_36px_hsl(var(--primary)/0.24)]"
                >
                  <a
                    href="https://cal.com/btcpavao/meeting"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Book a Call
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>
        ) : null}
      </header>

      <main
        id="top"
        className="mx-auto grid max-w-7xl gap-8 px-4 py-8 sm:px-6 lg:grid-cols-[320px_minmax(0,1fr)] lg:px-8 lg:py-10"
      >
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <Card className="animate-in fade-in slide-in-from-bottom-4 overflow-hidden rounded-4xl border-border/60 bg-card/82 py-0 shadow-[0_22px_60px_hsl(var(--foreground)/0.08)] backdrop-blur-xl duration-700">
            <CardContent className="p-6">
              <div className="relative mx-auto mb-6 w-full max-w-[220px]">
                <div className="absolute inset-3 -z-10 rounded-full bg-[radial-gradient(circle,hsl(var(--hero-glow)/0.35),transparent_70%)] blur-2xl" />
                <Avatar className="size-full rounded-full border-4 border-background/95 shadow-[0_26px_60px_hsl(var(--hero-glow)/0.25)]">
                  <AvatarImage
                    src="https://avatars.githubusercontent.com/u/109140795?v=4"
                    alt="Pavao GitHub profile image"
                  />
                  <AvatarFallback>PP</AvatarFallback>
                </Avatar>
              </div>

              <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-muted-foreground">
                Independent Practice
              </p>
              <h2 className="mt-2 font-display text-3xl font-extrabold tracking-[-0.05em]">
                btcpavao
              </h2>
              <p className="text-base text-muted-foreground">@btcpavao</p>
              <p className="mt-4 text-base font-medium text-foreground/90">
                Entrepreneur / Bitcoiner
              </p>

              <div className="mt-6 rounded-[26px] border border-border/60 bg-background/70 p-4">
                <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-muted-foreground">
                  Current Focus
                </p>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">
                  Helping individuals and communities move toward a practical
                  Bitcoin standard through writing, calls, and local network
                  building.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-4 rounded-3xl border-border/60 bg-card/75 py-0 backdrop-blur-xl">
            <CardContent className="grid gap-2 p-3">
              {sectionLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="rounded-2xl px-4 py-3 text-sm font-semibold text-foreground transition hover:bg-background hover:text-primary"
                >
                  {link.label}
                </a>
              ))}
            </CardContent>
          </Card>

          <Card className="mt-4 overflow-hidden rounded-3xl border-border/60 bg-card/78 py-0 backdrop-blur-xl">
            <CardContent className="p-0">
              {contactLinks.map((item, index) => (
                <a
                  key={item.label}
                  href={item.href}
                  target={item.href.startsWith("mailto:") ? undefined : "_blank"}
                  rel={
                    item.href.startsWith("mailto:")
                      ? undefined
                      : "noopener noreferrer"
                  }
                  className={`block px-5 py-4 transition hover:bg-background/70 ${
                    index !== 0 ? "border-t border-border/60" : ""
                  }`}
                >
                  <span className="block text-[11px] font-bold uppercase tracking-[0.24em] text-muted-foreground">
                    {item.label}
                  </span>
                  <span className="mt-2 block text-sm font-semibold text-foreground">
                    {item.value}
                  </span>
                </a>
              ))}
            </CardContent>
          </Card>
        </aside>

        <div className="min-w-0 animate-in fade-in slide-in-from-bottom-5 duration-700">
          <Card className="overflow-hidden rounded-[34px] border-border/60 bg-card/76 py-0 shadow-[0_22px_60px_hsl(var(--foreground)/0.08)] backdrop-blur-xl">
            <CardContent className="p-5 sm:p-7">
              <section
                id="purpose"
                className="rounded-[30px] border border-border/60 bg-[linear-gradient(135deg,hsl(var(--card))_0%,hsl(var(--card))_52%,hsl(var(--muted)/0.55)_100%)] p-6 shadow-sm sm:p-8"
              >
                <div className="grid gap-6 xl:grid-cols-[minmax(0,1.2fr)_360px]">
                  <div>
                    <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/70 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.22em] text-muted-foreground">
                      <span className="size-2 rounded-full bg-[hsl(var(--hero-ember))]" />
                      Pavao Pahljina
                    </div>

                    <h1 className="mt-5 max-w-[12ch] font-display text-5xl font-extrabold leading-[0.94] tracking-[-0.07em] text-balance sm:text-6xl xl:text-7xl">
                      Bitcoin Standard Advisor
                    </h1>
                    <p className="mt-5 max-w-3xl text-lg leading-8 text-muted-foreground">
                      I share practical Bitcoin ideas, tools, and money habits
                      from my own journey. This is the home base for my writing,
                      advisory work, and community building across global and
                      Balkan Bitcoin networks.
                    </p>

                    <div className="mt-8 flex flex-wrap gap-3">
                      <Button
                        asChild
                        size="lg"
                        className="rounded-full px-5 shadow-[0_18px_36px_hsl(var(--primary)/0.25)]"
                      >
                        <a
                          href="https://cal.com/btcpavao/meeting"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Book a Call
                        </a>
                      </Button>
                      <Button
                        asChild
                        variant="outline"
                        size="lg"
                        className="rounded-full border-border/60 bg-background/80 px-5"
                      >
                        <a
                          href="https://btcpavao.gitbook.io/practical-bitcoin-standard/"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Read GitBook
                        </a>
                      </Button>
                    </div>

                    <div className="mt-8 grid gap-3 sm:grid-cols-3">
                      {proofPoints.map((item) => (
                        <div
                          key={item.value}
                          className="rounded-[24px] border border-border/60 bg-background/70 p-4 shadow-soft"
                        >
                          <p className="font-display text-2xl font-extrabold tracking-[-0.05em]">
                            {item.value}
                          </p>
                          <p className="mt-1 text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">
                            {item.label}
                          </p>
                          <p className="mt-3 text-sm leading-6 text-muted-foreground">
                            {item.copy}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <Card className="rounded-[28px] border-border/60 bg-background/75 py-0 shadow-soft">
                      <CardHeader className="px-5 pt-5">
                        <CardDescription className="text-[11px] font-bold uppercase tracking-[0.24em]">
                          Current Focus
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-3 px-5 pb-5">
                        {focusItems.map((item, index) => (
                          <div
                            key={item.title}
                            className="grid grid-cols-[44px_minmax(0,1fr)] gap-3 rounded-2xl border border-border/60 bg-card/90 p-3"
                          >
                            <div className="inline-flex size-11 items-center justify-center rounded-2xl bg-primary/10 font-display text-sm font-extrabold text-primary">
                              {String(index + 1).padStart(2, "0")}
                            </div>
                            <div>
                              <h3 className="font-display text-lg font-bold tracking-[-0.03em]">
                                {item.title}
                              </h3>
                              <p className="mt-1 text-sm leading-6 text-muted-foreground">
                                {item.description}
                              </p>
                            </div>
                          </div>
                        ))}
                      </CardContent>
                    </Card>

                    <Card className="rounded-[28px] border-primary/15 bg-[linear-gradient(125deg,hsl(var(--hero-glow)/0.12),hsl(var(--card)),hsl(var(--hero-ember)/0.14))] py-0 shadow-soft">
                      <CardContent className="p-5">
                        <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-muted-foreground">
                          Network Note
                        </p>
                        <p className="mt-3 text-sm leading-7 text-muted-foreground">
                          I actively support Bitcoin communities through
                          TwentyOne.World and DvadesetJedan, including
                          livestreams, Telegram groups, and local meetups.
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </section>

              <Separator className="my-8" />

              <section id="about">
                <SectionEyebrow title="Background" subtitle="About" />

                <div className="mt-5 grid gap-4 xl:grid-cols-[minmax(0,1.12fr)_minmax(280px,0.88fr)]">
                  <Card className="rounded-[26px] border-border/60 bg-card/80 py-0 shadow-soft">
                    <CardContent className="p-6 text-base leading-8 text-muted-foreground">
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
                      <p className="mt-4">
                        I am also writing an open-source guide for living on a
                        full Bitcoin standard:{" "}
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
                    {proofPoints.map((item) => (
                      <Card
                        key={item.value}
                        className="rounded-[22px] border-border/60 bg-card/80 py-0 shadow-soft"
                      >
                        <CardContent className="p-5">
                          <strong className="block font-display text-lg font-extrabold tracking-[-0.03em]">
                            {item.value}
                          </strong>
                          <span className="mt-2 block text-sm font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                            {item.label}
                          </span>
                          <span className="mt-2 block text-sm leading-6 text-muted-foreground">
                            {item.copy}
                          </span>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </section>

              <Separator className="my-8" />

              <section id="projects">
                <SectionEyebrow title="Projects" subtitle="Working On" />

                <div className="mt-5 grid gap-4 md:grid-cols-2 2xl:grid-cols-3">
                  {projects.map((project) => {
                    const Icon = project.icon

                    return (
                      <Card
                        key={project.title}
                        className="group rounded-[24px] border-border/60 bg-card/85 py-0 shadow-soft transition duration-300 hover:-translate-y-1.5 hover:shadow-float"
                      >
                        <CardHeader className="px-5 pt-5">
                          <div className="mb-4 flex items-center justify-between">
                            <span className="block h-1.5 w-14 rounded-full bg-gradient-to-r from-primary to-[hsl(var(--hero-ember))]" />
                            <div className="rounded-2xl bg-primary/10 p-2 text-primary">
                              <Icon className="size-4" />
                            </div>
                          </div>
                          <CardTitle className="font-display text-xl font-bold tracking-[-0.03em]">
                            {project.title}
                          </CardTitle>
                          <CardDescription className="mt-2 text-sm leading-7 text-muted-foreground">
                            {project.description}
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="px-5 pb-5">
                          <Button
                            asChild
                            variant="link"
                            className="h-auto p-0 text-sm font-bold"
                          >
                            <a
                              href={project.href}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {project.cta}
                              <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                            </a>
                          </Button>
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>
              </section>

              <Separator className="my-8" />

              <section id="contact">
                <Card className="overflow-hidden rounded-[30px] border-border/60 bg-[linear-gradient(135deg,hsl(var(--card))_0%,hsl(var(--hero-glow)/0.08)_52%,hsl(var(--hero-ember)/0.08)_100%)] py-0 shadow-soft">
                  <CardContent className="p-6 sm:p-8">
                    <SectionEyebrow
                      title="Reach Out"
                      subtitle="Feedback and Support"
                    />
                    <p className="mt-4 max-w-3xl text-base leading-8 text-muted-foreground">
                      Reach me on <a href="https://x.com/btcpavao">X</a>,{" "}
                      <a href="https://primal.net/btcpavao">Nostr</a>, connect on{" "}
                      <a href="https://www.linkedin.com/in/pavaopahljina/">
                        LinkedIn
                      </a>
                      , follow the guide on{" "}
                      <a
                        href="https://btcpavao.gitbook.io/practical-bitcoin-standard/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        GitBook
                      </a>
                      , join Balkan community updates on{" "}
                      <a
                        href="https://dvadesetjedan.com"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        DvadesetJedan.com
                      </a>
                      , catch the weekly show on{" "}
                      <a
                        href="https://www.youtube.com/@dvadesetjedan/streams"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        YouTube Livestreams
                      </a>
                      , book a call on{" "}
                      <a
                        href="https://cal.com/btcpavao/meeting"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Cal.com
                      </a>
                      , or email me at{" "}
                      <a href="mailto:pavao@hey.com">pavao@hey.com</a>.
                    </p>

                    <div className="mt-6 grid gap-3 lg:grid-cols-[minmax(0,1fr)_320px]">
                      <div className="flex flex-wrap gap-3">
                        <Button
                          asChild
                          size="lg"
                          className="rounded-full px-5 shadow-[0_18px_36px_hsl(var(--primary)/0.25)]"
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
                          className="rounded-full border-border/60 bg-background/80 px-5"
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

                      <Card className="rounded-[24px] border-border/60 bg-background/70 py-0">
                        <CardContent className="p-5">
                          <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-muted-foreground">
                            Best Entry Point
                          </p>
                          <p className="mt-3 text-sm leading-7 text-muted-foreground">
                            If you are unsure where to start, book a call or send
                            an email and I will point you toward the right
                            resource, conversation, or community.
                          </p>
                        </CardContent>
                      </Card>
                    </div>
                  </CardContent>
                </Card>
              </section>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

export default App
