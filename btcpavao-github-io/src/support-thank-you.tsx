import { useEffect } from "react"
import { ArrowLeft, ArrowUpRight, CalendarDays, Mail } from "lucide-react"

import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { Button } from "@/components/ui/button"
import { EN_BITCOIN_CORE_SERIES_PATH, SUPPORT_THANK_YOU_PATH } from "@/routes"
import {
  BOOKING_URL,
  CONTACT_EMAIL,
  CONTACT_EMAIL_URL,
  SITE_URL,
} from "@/site-config"
import { SOCIAL_CARD_IMAGES } from "@/social-card-images"

const title = "Thank You | Pavao"
const description =
  "Thank you for supporting open, practical Bitcoin education through Value for Value."
const canonicalUrl = `${SITE_URL}${SUPPORT_THANK_YOU_PATH}`

function setMeta(
  selector: string,
  attribute: "content" | "href",
  value: string
) {
  const element = document.head.querySelector<HTMLElement>(selector)
  element?.setAttribute(attribute, value)
}

export function SupportThankYouPage() {
  useEffect(() => {
    document.documentElement.lang = "en"
    document.title = title
    setMeta('meta[name="description"]', "content", description)
    setMeta('meta[name="robots"]', "content", "noindex,nofollow,noarchive")
    setMeta('link[rel="canonical"]', "href", canonicalUrl)
    setMeta('meta[property="og:title"]', "content", title)
    setMeta('meta[property="og:description"]', "content", description)
    setMeta('meta[property="og:url"]', "content", canonicalUrl)
    setMeta('meta[property="og:image"]', "content", SOCIAL_CARD_IMAGES.support)
    setMeta('meta[name="twitter:title"]', "content", title)
    setMeta('meta[name="twitter:description"]', "content", description)
    setMeta('meta[name="twitter:image"]', "content", SOCIAL_CARD_IMAGES.support)
  }, [])

  return (
    <div className="min-h-screen bg-background text-foreground">
      <a className="skip-link" href="#thank-you">
        Skip to content
      </a>
      <SiteHeader />

      <main id="thank-you">
        <section className="home-hero support-thank-hero relative isolate overflow-hidden">
          <picture className="home-hero-background support-thank-hero-background absolute inset-0 -z-20">
            <source
              srcSet="/value-for-value-visual-840.webp 840w, /value-for-value-visual.webp 1536w"
              sizes="100vw"
              type="image/webp"
            />
            <img
              src="/value-for-value-visual.webp"
              alt="An open book encircled by small brass markers on a sunlit Mediterranean stone table, symbolizing open knowledge and voluntary exchange."
              width="1536"
              height="1024"
              fetchPriority="high"
              decoding="async"
            />
          </picture>
          <div
            className="home-hero-fade support-thank-hero-fade absolute inset-0 -z-10"
            aria-hidden="true"
          />

          <div className="mx-auto flex min-h-[43rem] max-w-7xl items-center px-4 py-16 sm:min-h-[47rem] sm:px-6 sm:py-20 lg:px-8 lg:py-24">
            <div className="home-hero-copy max-w-3xl">
              <p className="text-[11px] font-bold tracking-[0.18em] text-primary uppercase">
                Value for Value
              </p>
              <h1 className="mt-5 max-w-[13ch] font-display text-5xl leading-[0.94] font-bold tracking-[-0.065em] text-balance sm:text-7xl lg:text-[5rem]">
                Thank you for returning value.
              </h1>
              <div className="mt-7 max-w-2xl space-y-5 text-base leading-8 text-muted-foreground sm:text-lg sm:leading-9">
                <p>
                  Thank you for supporting my work. Your contribution helps me
                  keep Bitcoin education, articles, guides and other resources
                  open and freely available to everyone.
                </p>
                <p>
                  I don&apos;t want useful Bitcoin knowledge to be hidden behind
                  a paywall or limited only to people who can afford a
                  predetermined price. Value for Value lets me keep the work
                  open while allowing each person to decide for themselves what
                  it was worth.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-border/60 bg-card/44">
          <div className="mx-auto grid max-w-6xl gap-12 px-4 py-16 sm:px-6 sm:py-24 lg:grid-cols-[minmax(0,1.04fr)_minmax(19rem,0.96fr)] lg:gap-16 lg:px-8">
            <div>
              <p className="text-[11px] font-bold tracking-[0.18em] text-primary uppercase">
                Continue the conversation
              </p>
              <h2 className="mt-5 max-w-[15ch] font-display text-3xl leading-[1.02] font-bold tracking-[-0.045em] sm:text-5xl">
                Want to apply this to your own situation?
              </h2>
              <div className="mt-7 max-w-2xl space-y-5 text-base leading-8 text-muted-foreground">
                <p>
                  If something you read here raised questions about your own
                  Bitcoin setup, savings, self-custody, security, family
                  planning, or practical Bitcoin standard, you&apos;re welcome
                  to get in touch.
                </p>
                <p>
                  My one-to-one consulting works on the same Value for Value
                  principle. There is no predetermined consulting fee. We have
                  the conversation first, and afterwards you decide what value,
                  if any, you want to return based on how useful it was to you.
                </p>
                <p>
                  You can schedule a call directly in my calendar, or simply
                  send me an email. I try to answer every email and take every
                  useful conversation I reasonably can, subject to the time I
                  have available.
                </p>
              </div>
            </div>

            <aside
              className="self-start rounded-[1.75rem] bg-background p-6 shadow-[var(--shadow-border)] sm:p-8"
              aria-label="Contact Pavao"
            >
              <div className="flex items-start gap-4">
                <span className="grid size-11 shrink-0 place-items-center rounded-full bg-primary/12 text-primary">
                  <CalendarDays className="size-5" aria-hidden="true" />
                </span>
                <div>
                  <h3 className="font-display text-xl font-bold tracking-[-0.03em]">
                    A useful conversation, then you decide.
                  </h3>
                  <p className="mt-2 text-sm leading-7 text-muted-foreground">
                    No fixed consulting price. We talk first; afterwards you
                    decide what the conversation was worth to you.
                  </p>
                </div>
              </div>

              <Button
                asChild
                size="lg"
                className="mt-7 min-h-12 w-full rounded-full px-6"
              >
                <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
                  Schedule a Value for Value call
                  <ArrowUpRight aria-hidden="true" />
                </a>
              </Button>

              <div className="my-7 h-px bg-border/70" aria-hidden="true" />

              <div className="flex items-start gap-4">
                <span className="grid size-11 shrink-0 place-items-center rounded-full bg-muted text-foreground">
                  <Mail className="size-5" aria-hidden="true" />
                </span>
                <div>
                  <h3 className="font-display text-lg font-bold">
                    Email works, too.
                  </h3>
                  <p className="mt-2 text-sm leading-7 text-muted-foreground">
                    A call isn&apos;t necessary. If your question is better
                    suited to email, please send it over and I&apos;ll do my
                    best to respond.
                  </p>
                </div>
              </div>

              <Button
                asChild
                variant="outline"
                size="lg"
                className="mt-6 min-h-12 w-full rounded-full px-6"
              >
                <a href={CONTACT_EMAIL_URL}>
                  Send me an email
                  <span className="sr-only"> at {CONTACT_EMAIL}</span>
                </a>
              </Button>
            </aside>
          </div>
        </section>

        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
          <a
            href={EN_BITCOIN_CORE_SERIES_PATH}
            className="inline-flex min-h-11 items-center gap-2 rounded-full px-1 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-ring"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
            Back to articles
          </a>
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}
