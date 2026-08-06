import { useEffect } from "react"
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Check,
  Download,
  FileCheck2,
  HardDrive,
  KeyRound,
  ShieldAlert,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  EN_BITCOIN_CORE_ENTROPY_ARTICLE_PATH,
  EN_BITCOIN_CORE_SERIES_PATH,
  START_HERE_PATH,
} from "@/routes"

const SITE_URL = "https://btcpavao.com"

const exerciseSteps = [
  {
    title: "Prepare a practice environment",
    copy: "Use no real bitcoin. Choose a computer and location where you can work slowly, keep notes, and repeat the exercise.",
    icon: HardDrive,
  },
  {
    title: "Download and verify Bitcoin Core",
    copy: "Follow the official download and verification instructions for your operating system. Record what you checked and why.",
    icon: Download,
  },
  {
    title: "Create one empty practice wallet",
    copy: "Give it an obvious test name. Do not generate or send real funds. The goal is to learn the model, not to move money.",
    icon: KeyRound,
  },
  {
    title: "Back it up and explain it",
    copy: "Write down where the backup lives, what the password protects, and what another trusted person would need to know.",
    icon: FileCheck2,
  },
]

function setMeta(name: string, content: string) {
  const element = document.head.querySelector<HTMLMetaElement>(
    `meta[name="${name}"]`
  )
  if (element) element.content = content
}

export function BitcoinCoreStartPage() {
  useEffect(() => {
    const title = "Start Here with Bitcoin Core | Pavao Pahljina"
    const description =
      "A calm first Bitcoin Core exercise for non-developers: prepare a practice environment, verify the software, create an empty test wallet, and document the backup plan."

    document.documentElement.lang = "en"
    document.title = title
    setMeta("description", description)
    setMeta("twitter:title", title)
    setMeta("twitter:description", description)
  }, [])

  return (
    <div className="min-h-screen bg-background text-foreground">
      <a className="skip-link" href="#lesson">
        Skip to lesson
      </a>
      <header className="border-b border-border/60 bg-background/92">
        <div className="mx-auto flex min-h-[72px] max-w-5xl items-center justify-between gap-4 px-4 sm:px-6">
          <a href="/" className="font-display text-base font-bold">
            Pavao Pahljina
          </a>
          <div className="flex items-center gap-2">
            <a
              href={EN_BITCOIN_CORE_SERIES_PATH}
              className="inline-flex min-h-11 items-center gap-2 rounded-full px-4 text-sm font-semibold text-muted-foreground hover:bg-card hover:text-foreground"
            >
              <ArrowLeft className="size-4" aria-hidden="true" />
              Bitcoin Core
            </a>
          </div>
        </div>
      </header>

      <main id="lesson">
        <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-24">
          <p className="text-[11px] font-semibold text-primary uppercase">
            Bitcoin Core · Start here
          </p>
          <h1 className="mt-5 max-w-[14ch] font-display text-5xl leading-[0.96] font-bold tracking-[-0.055em] sm:text-7xl">
            Your first exercise uses no real bitcoin.
          </h1>
          <p className="mt-7 max-w-3xl text-lg leading-9 text-muted-foreground sm:text-xl">
            The first goal is to understand the shape of the process: verify the
            software, create an empty practice wallet, identify what must be
            backed up, and explain the plan in your own words.
          </p>

          <div className="mt-10 rounded-[28px] bg-card p-6 shadow-[var(--shadow-border)] sm:p-8">
            <div className="flex gap-4">
              <span className="grid size-11 shrink-0 place-items-center rounded-full bg-primary/12 text-primary">
                <ShieldAlert className="size-5" aria-hidden="true" />
              </span>
              <div>
                <h2 className="font-display text-xl font-bold">
                  Keep this exercise disposable.
                </h2>
                <p className="mt-2 max-w-3xl text-sm leading-7 text-muted-foreground">
                  Do not send funds to the wallet. Do not remove or overwrite an
                  existing wallet, data directory, or backup. If Bitcoin Core is
                  already in use on this computer, stop and make a separate
                  practice plan before changing anything.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-border/60 bg-card/48">
          <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-20">
            <p className="text-[11px] font-semibold text-primary uppercase">
              Exercise 01
            </p>
            <h2 className="mt-4 max-w-[18ch] font-display text-3xl leading-[1.02] font-bold tracking-[-0.045em] sm:text-5xl">
              Build the map before you test recovery.
            </h2>

            <ol className="mt-10 divide-y divide-border/70 border-y border-border/70">
              {exerciseSteps.map((step, index) => {
                const Icon = step.icon
                return (
                  <li
                    key={step.title}
                    className="grid gap-4 py-7 sm:grid-cols-[64px_minmax(0,1fr)] sm:py-9"
                  >
                    <span className="grid size-11 place-items-center rounded-full bg-background text-primary shadow-[var(--shadow-border)]">
                      <Icon className="size-5" aria-hidden="true" />
                    </span>
                    <div>
                      <p className="text-xs font-bold text-primary">
                        {String(index + 1).padStart(2, "0")}
                      </p>
                      <h3 className="mt-2 font-display text-2xl font-bold tracking-[-0.035em]">
                        {step.title}
                      </h3>
                      <p className="mt-3 max-w-2xl text-base leading-8 text-muted-foreground">
                        {step.copy}
                      </p>
                    </div>
                  </li>
                )
              })}
            </ol>

            <div className="mt-10 flex flex-wrap gap-3">
              <Button asChild size="lg" className="min-h-12 rounded-full px-6">
                <a
                  href="https://bitcoincore.org/en/download/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Official download and verification
                  <ArrowRight className="size-4" aria-hidden="true" />
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="min-h-12 rounded-full px-6"
              >
                <a href={EN_BITCOIN_CORE_ENTROPY_ARTICLE_PATH}>
                  Read how Core creates a wallet
                </a>
              </Button>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-20">
          <div className="grid gap-8 rounded-[32px] bg-[#0d3153] p-7 text-white sm:p-10 lg:grid-cols-[minmax(0,1fr)_280px] lg:items-end">
            <div>
              <p className="text-[11px] font-semibold text-white/62 uppercase">
                Finish line
              </p>
              <h2 className="mt-4 font-display text-3xl font-bold tracking-[-0.04em]">
                Stop when you can explain the plan.
              </h2>
              <ul className="mt-6 grid gap-3 text-sm leading-7 text-white/76">
                {[
                  "I know which software I downloaded and what I verified.",
                  "I know that this wallet contains no real funds.",
                  "I can identify the wallet backup and its role.",
                  "I have written down the questions I still cannot answer.",
                ].map((item) => (
                  <li key={item} className="flex gap-3">
                    <Check
                      className="mt-1 size-4 shrink-0 text-[#7cc9ff]"
                      aria-hidden="true"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col gap-3">
              <Button
                asChild
                className="min-h-11 rounded-full bg-white text-[#0d3153] hover:bg-white/90"
              >
                <a href={EN_BITCOIN_CORE_SERIES_PATH}>
                  <BookOpen className="size-4" aria-hidden="true" />
                  Continue learning
                </a>
              </Button>
              <a
                href="/"
                className="inline-flex min-h-11 items-center justify-center text-sm font-semibold text-white/74 hover:text-white"
              >
                Return to the homepage
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border/60 py-8 text-center text-xs text-muted-foreground">
        <p>
          Practical education and guidance. Not investment, legal, or tax
          advice.
        </p>
        <p className="mt-2">
          {SITE_URL.replace("https://", "")} · {START_HERE_PATH}
        </p>
      </footer>
    </div>
  )
}
