import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  CalendarDays,
  Globe2,
  Linkedin,
  Mail,
  Nfc,
  RadioTower,
} from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const navigation = [
  { label: "The Guide", href: "#guide" },
  { label: "Methodology", href: "#methodology" },
  { label: "Power Law", href: "#power-law" },
  { label: "Contact / Nostr", href: "#contact" },
]

const trustBar = [
  {
    label: "Janitor at Saifedean.com",
    href: "https://saifedean.com",
  },
  {
    label: "Contributor to The Bitcoin Standard",
    href: "https://thesaifhouse.com",
  },
  {
    label: "Community Builder at TwentyOne.World",
    href: "https://twentyone.world",
  },
]

const quickStartPillars = [
  {
    index: "01",
    title: "Zero-Based Budgeting",
    copy:
      "Every satoshi gets a job. Build clarity around cash flow before adding complexity.",
  },
  {
    index: "02",
    title: "Debt-Free Living",
    copy:
      "Reduce fragility first. A clean balance sheet creates room for long-term conviction.",
  },
  {
    index: "03",
    title: "10-20% Generosity",
    copy:
      "Sustainable generosity keeps abundance practical, relational, and grounded in service.",
  },
]

const guideHighlights = [
  "Earn, save, and spend with a Bitcoin-first operating system.",
  "Replace noise with principles that compound over years, not cycles.",
  "Use practical rules that make conviction easier to live with day to day.",
]

const methodologyPoints = [
  {
    title: "Zero-based budgeting",
    copy:
      "Direct every unit of money with intention. Budgeting becomes a strategic map rather than a restrictive chore.",
  },
  {
    title: "Debt-free living",
    copy:
      "Remove obligations that distort time preference. The goal is resilience before optimization.",
  },
  {
    title: "Household operating rules",
    copy:
      "Create simple, durable rules for reserves, spending, and long-horizon savings so decisions get easier over time.",
  },
]

const powerLawPoints = [
  {
    title: "Why asymmetry matters",
    copy:
      "The strategy is not about clever timing. It is about aligning behavior with a monetary asset that rewards patience.",
  },
  {
    title: "The math behind the strategy",
    copy:
      "Small recurring decisions compound. A Bitcoin standard works best when habits, savings rate, and spending discipline reinforce each other.",
  },
  {
    title: "Low-time-preference implementation",
    copy:
      "The real edge is consistency: clear budgeting, lower leverage, stronger reserves, and a long enough horizon to let the thesis work.",
  },
]

const contactLinks = [
  {
    label: "Start the Guide",
    href: "https://btcpavao.gitbook.io/practical-bitcoin-standard/",
    icon: BookOpen,
  },
  {
    label: "Book Advisory Call",
    href: "https://cal.com/btcpavao/meeting",
    icon: CalendarDays,
  },
  {
    label: "Email Pavao",
    href: "mailto:pavao@hey.com",
    icon: Mail,
  },
  {
    label: "Follow on Nostr",
    href: "https://primal.net/btcpavao",
    icon: Nfc,
  },
]

const ecosystemLinks = [
  {
    label: "Practical Bitcoin Standard",
    href: "https://btcpavao.gitbook.io/practical-bitcoin-standard/",
    icon: BookOpen,
    copy: "The core educational guide for learning the framework in depth.",
  },
  {
    label: "DvadesetJedan Livestreams",
    href: "https://www.youtube.com/@dvadesetjedan/streams",
    icon: RadioTower,
    copy: "Weekly signal, commentary, and discussion with the Balkan Bitcoin community.",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/pavaopahljina/",
    icon: Linkedin,
    copy: "Professional background, public profile, and collaboration context.",
  },
  {
    label: "TwentyOne.World",
    href: "https://twentyone.world",
    icon: Globe2,
    copy: "A global network of local Bitcoin communities and builders.",
  },
]

function SectionHeading({
  eyebrow,
  title,
  copy,
}: {
  eyebrow: string
  title: string
  copy: string
}) {
  return (
    <div className="max-w-3xl space-y-4">
      <p className="text-xs font-semibold uppercase tracking-[0.28em] text-primary/80">
        {eyebrow}
      </p>
      <h2 className="font-display text-3xl font-semibold tracking-[-0.04em] text-foreground sm:text-4xl">
        {title}
      </h2>
      <p className="text-base leading-8 text-muted-foreground sm:text-lg">
        {copy}
      </p>
    </div>
  )
}

export function App() {
  return (
    <div className="relative overflow-x-clip text-foreground">
      <header className="border-b border-border/70 bg-background/90 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-5 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <a href="#top" className="space-y-1">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-primary/80">
                Professional Bitcoin Advisory
              </p>
              <p className="font-display text-2xl font-semibold tracking-[-0.05em] text-foreground">
                Pavao Pahljina
              </p>
            </a>

            <nav className="flex flex-wrap gap-2">
              {navigation.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="rounded-full border border-border/70 bg-card/70 px-4 py-2 text-sm font-medium text-muted-foreground transition hover:border-primary/40 hover:text-foreground"
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>
        </div>
      </header>

      <main id="top" className="mx-auto max-w-6xl px-4 pb-24 pt-10 sm:px-6 lg:px-8 lg:pt-16">
        <section className="grid gap-10 lg:grid-cols-[minmax(0,1.25fr)_360px] lg:items-start">
          <div className="space-y-8">
            <div className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-primary">
              High-Trust, Low-Time Preference
            </div>

            <div className="space-y-6">
              <p className="text-sm font-medium uppercase tracking-[0.28em] text-muted-foreground">
                Bitcoin Standard Advisory
              </p>
              <h1 className="max-w-[11ch] font-display text-5xl font-semibold leading-[0.92] tracking-[-0.06em] text-balance text-foreground sm:text-6xl lg:text-7xl">
                The Blueprint for Living on a 100% Bitcoin Standard.
              </h1>
              <p className="max-w-3xl text-lg leading-8 text-muted-foreground sm:text-xl">
                Move beyond speculation. Learn the money management principles to
                earn, save, and spend in Bitcoin safely and sustainably.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button asChild size="lg" className="rounded-full px-7 text-base">
                <a
                  href="https://btcpavao.gitbook.io/practical-bitcoin-standard/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Start the Guide
                  <ArrowRight className="size-4" />
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="rounded-full border-border/70 bg-card/60 px-7 text-base"
              >
                <a
                  href="https://cal.com/btcpavao/meeting"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Book Advisory Call
                </a>
              </Button>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {guideHighlights.map((item) => (
                <div
                  key={item}
                  className="rounded-[28px] border border-border/70 bg-card/72 p-5"
                >
                  <p className="text-sm leading-7 text-muted-foreground">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <Card className="rounded-[32px] border-border/70 bg-card/84 py-0 shadow-float">
            <CardContent className="space-y-6 p-6 sm:p-7">
              <div className="flex items-center gap-4">
                <Avatar className="size-20 border-2 border-primary/25">
                  <AvatarImage
                    src="https://avatars.githubusercontent.com/u/109140795?v=4"
                    alt="Pavao GitHub profile image"
                  />
                  <AvatarFallback>PP</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                    Pavao Pahljina
                  </p>
                  <h2 className="mt-2 font-display text-3xl font-semibold tracking-[-0.05em] text-foreground">
                    @btcpavao
                  </h2>
                  <p className="mt-2 text-base text-muted-foreground">
                    Entrepreneur / Bitcoiner
                  </p>
                </div>
              </div>

              <div className="rounded-[28px] border border-border/70 bg-background/72 p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary/80">
                  Advisory Premise
                </p>
                <p className="mt-4 text-base leading-8 text-muted-foreground">
                  Practical Bitcoin standard ideas, tools, and money habits drawn
                  from lived experience since fall 2020.
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
                <div className="rounded-[24px] border border-border/70 bg-background/64 p-4">
                  <p className="text-2xl font-semibold tracking-[-0.04em] text-foreground">
                    10,000+
                  </p>
                  <p className="mt-2 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                    Hours in Bitcoin
                  </p>
                </div>
                <div className="rounded-[24px] border border-border/70 bg-background/64 p-4">
                  <p className="text-2xl font-semibold tracking-[-0.04em] text-foreground">
                    Global + Local
                  </p>
                  <p className="mt-2 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                    Community Reach
                  </p>
                </div>
                <div className="rounded-[24px] border border-border/70 bg-background/64 p-4">
                  <p className="text-2xl font-semibold tracking-[-0.04em] text-foreground">
                    Long Horizon
                  </p>
                  <p className="mt-2 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                    Low-Time Preference
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="mt-12 rounded-[28px] border border-border/70 bg-card/72 p-4 sm:p-5">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-muted-foreground">
              Trust Bar
            </p>
            <div className="flex flex-wrap gap-2">
              {trustBar.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-primary/20 bg-background/72 px-4 py-2 text-sm font-medium text-foreground transition hover:border-primary/40 hover:text-primary"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        </section>

        <section id="guide" className="section-shell">
          <SectionHeading
            eyebrow="The Guide"
            title="A practical operating manual for a Bitcoin-standard life"
            copy="The guide is for people who want a durable framework, not a temporary trade. Start with the principles, then apply them to income, spending, reserves, and generosity."
          />

          <div className="mt-8 grid gap-4 lg:grid-cols-[minmax(0,1.2fr)_0.8fr]">
            <Card className="rounded-[32px] border-border/70 bg-card/78 py-0 shadow-soft">
              <CardContent className="space-y-6 p-6 sm:p-8">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary/80">
                  Core Outcome
                </p>
                <h3 className="font-display text-3xl font-semibold tracking-[-0.04em] text-foreground">
                  Replace reactive money behavior with clear principles that can
                  survive an entire cycle.
                </h3>
                <p className="text-base leading-8 text-muted-foreground">
                  The aim is not to sound intelligent about Bitcoin. The aim is
                  to structure life around it with less fragility, better
                  judgment, and stronger long-term alignment.
                </p>
                <Button asChild size="lg" className="rounded-full px-7 text-base">
                  <a
                    href="https://btcpavao.gitbook.io/practical-bitcoin-standard/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Start the Guide
                    <ArrowUpRight className="size-4" />
                  </a>
                </Button>
              </CardContent>
            </Card>

            <div className="grid gap-4">
              {quickStartPillars.map((item) => (
                <Card
                  key={item.title}
                  className="rounded-[28px] border-border/70 bg-card/74 py-0 shadow-soft"
                >
                  <CardContent className="p-6">
                    <p className="text-sm font-semibold text-primary/80">{item.index}</p>
                    <h3 className="mt-4 font-display text-2xl font-semibold tracking-[-0.04em] text-foreground">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-muted-foreground">
                      {item.copy}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="methodology" className="section-shell">
          <SectionHeading
            eyebrow="Methodology"
            title="Simple rules that make the strategy livable"
            copy="A Bitcoin standard works best when household finance becomes calm, explicit, and repeatable. The methodology is intentionally simple so conviction can survive real life."
          />

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {methodologyPoints.map((item) => (
              <Card
                key={item.title}
                className="rounded-[30px] border-border/70 bg-card/76 py-0 shadow-soft"
              >
                <CardContent className="p-6">
                  <h3 className="font-display text-2xl font-semibold tracking-[-0.04em] text-foreground">
                    {item.title}
                  </h3>
                  <p className="mt-4 text-sm leading-7 text-muted-foreground">
                    {item.copy}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section id="power-law" className="section-shell">
          <SectionHeading
            eyebrow="Power Law"
            title="The math matters, but behavior matters more"
            copy="Power-law outcomes come from asymmetry plus survival. The practical work is building a life that can hold Bitcoin over a long enough horizon for the asymmetry to express itself."
          />

          <div className="mt-8 grid gap-4 lg:grid-cols-[0.9fr_minmax(0,1.1fr)]">
            <Card className="rounded-[30px] border-border/70 bg-[linear-gradient(180deg,hsl(var(--card))_0%,hsl(var(--primary)/0.08)_100%)] py-0 shadow-float">
              <CardContent className="space-y-5 p-6 sm:p-8">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary/80">
                  Strategic Framing
                </p>
                <h3 className="font-display text-4xl font-semibold tracking-[-0.05em] text-foreground">
                  Conviction compounds when the household balance sheet stops
                  fighting the thesis.
                </h3>
                <p className="text-base leading-8 text-muted-foreground">
                  Budgeting, debt reduction, reserves, and generosity are not
                  distractions from Bitcoin strategy. They are the conditions
                  that let the strategy survive.
                </p>
              </CardContent>
            </Card>

            <div className="grid gap-4">
              {powerLawPoints.map((item) => (
                <Card
                  key={item.title}
                  className="rounded-[28px] border-border/70 bg-card/74 py-0 shadow-soft"
                >
                  <CardContent className="p-6">
                    <h3 className="font-display text-2xl font-semibold tracking-[-0.04em] text-foreground">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-muted-foreground">
                      {item.copy}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="section-shell">
          <SectionHeading
            eyebrow="Contact / Nostr"
            title="Find the right entry point"
            copy="Start with the guide if you want the framework. Reach out directly if you want conversation, context, or practical next steps."
          />

          <div className="mt-8 grid gap-4 lg:grid-cols-[minmax(0,1fr)_340px]">
            <div className="grid gap-4 md:grid-cols-2">
              {contactLinks.map((item) => {
                const Icon = item.icon

                return (
                  <Card
                    key={item.label}
                    className="rounded-[28px] border-border/70 bg-card/76 py-0 shadow-soft"
                  >
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between gap-4">
                        <span className="inline-flex size-11 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 text-primary">
                          <Icon className="size-5" />
                        </span>
                        <ArrowUpRight className="size-4 text-muted-foreground" />
                      </div>
                      <Button asChild variant="link" className="mt-5 h-auto px-0 text-base font-semibold text-foreground">
                        <a href={item.href} target="_blank" rel="noopener noreferrer">
                          {item.label}
                        </a>
                      </Button>
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            <Card className="rounded-[32px] border-border/70 bg-card/82 py-0 shadow-float">
              <CardContent className="space-y-5 p-6 sm:p-7">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary/80">
                  Ecosystem Links
                </p>
                {ecosystemLinks.map((item) => {
                  const Icon = item.icon

                  return (
                    <a
                      key={item.label}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block rounded-[22px] border border-border/70 bg-background/64 p-4 transition hover:border-primary/40"
                    >
                      <div className="flex items-start gap-4">
                        <span className="inline-flex size-10 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 text-primary">
                          <Icon className="size-4" />
                        </span>
                        <div>
                          <p className="text-sm font-semibold text-foreground">{item.label}</p>
                          <p className="mt-2 text-sm leading-7 text-muted-foreground">
                            {item.copy}
                          </p>
                        </div>
                      </div>
                    </a>
                  )
                })}
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
    </div>
  )
}

export default App
