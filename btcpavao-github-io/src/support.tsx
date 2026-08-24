import { ArrowRight, CalendarDays, Share2, Zap } from "lucide-react"

import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { Button } from "@/components/ui/button"
import { OPENNODE_CHECKOUT_URL } from "@/components/value-for-value"
import { BOOKING_URL } from "@/site-config"

const paths = [
  {
    icon: Zap,
    eyebrow: "Return value in sats",
    title: "Support the open work directly",
    copy: "Choose any amount that reflects the value you received. There is no fixed price and no obligation.",
    action: "Contribute through OpenNode",
    href: OPENNODE_CHECKOUT_URL,
    external: true,
  },
  {
    icon: CalendarDays,
    eyebrow: "Value for Value conversation",
    title: "Work through a real question together",
    copy: "Book a conversation first. Afterwards, you decide what it was worth based on the practical value it created.",
    action: "Book a conversation",
    href: BOOKING_URL,
    external: true,
  },
  {
    icon: Share2,
    eyebrow: "Share the work",
    title: "Help the right reader find it",
    copy: "If a guide or article helped you, sending it to one person who needs it is a meaningful form of support.",
    action: "Browse Bitcoin Core resources",
    href: "/en/bitcoin-core/",
    external: false,
  },
] as const

export function SupportPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <a className="skip-link" href="#support-content">
        Skip to content
      </a>
      <SiteHeader />
      <main id="support-content">
        <section className="relative overflow-hidden border-b border-border/60">
          <div className="page-atmosphere pointer-events-none absolute inset-0" aria-hidden="true" />
          <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-28">
            <p className="text-xs font-bold tracking-[0.16em] text-primary uppercase">
              Value for Value
            </p>
            <h1 className="mt-5 max-w-[14ch] font-display text-5xl leading-[0.98] font-bold tracking-[-0.055em] text-balance sm:text-6xl lg:text-7xl">
              Keep useful Bitcoin work open.
            </h1>
            <p className="mt-7 max-w-3xl text-lg leading-8 text-muted-foreground sm:text-xl sm:leading-9">
              Everything published here remains freely available. If the work
              helped you understand, recover, or improve a Bitcoin setup, you
              can return value in the way that fits you best.
            </p>
            <p className="mt-5 max-w-2xl font-semibold">
              No fixed price. No paywall. No obligation.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <div className="grid gap-5 lg:grid-cols-3">
            {paths.map((path) => {
              const Icon = path.icon
              return (
                <article
                  key={path.title}
                  className="flex min-h-full flex-col rounded-[2rem] border border-border/70 bg-card/82 p-6 shadow-soft sm:p-8"
                >
                  <span className="grid size-12 place-items-center rounded-full bg-primary/12 text-primary">
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                  <p className="mt-8 text-xs font-bold tracking-[0.14em] text-primary uppercase">
                    {path.eyebrow}
                  </p>
                  <h2 className="mt-3 font-display text-2xl leading-tight font-bold tracking-[-0.035em]">
                    {path.title}
                  </h2>
                  <p className="mt-4 flex-1 text-sm leading-7 text-muted-foreground">
                    {path.copy}
                  </p>
                  <Button asChild className="mt-7 min-h-11 w-full rounded-full">
                    <a
                      href={path.href}
                      target={path.external ? "_blank" : undefined}
                      rel={path.external ? "noopener noreferrer" : undefined}
                    >
                      {path.action}
                      <ArrowRight aria-hidden="true" />
                    </a>
                  </Button>
                </article>
              )
            })}
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
