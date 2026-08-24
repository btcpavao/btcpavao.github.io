import { useEffect } from "react"
import { ArrowLeft, BookOpen, Home } from "lucide-react"

import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { Button } from "@/components/ui/button"

export function NotFoundPage() {
  useEffect(() => {
    const robots = document.querySelector<HTMLMetaElement>('meta[name="robots"]')
    const previousContent = robots?.content

    if (robots) robots.content = "noindex, nofollow"

    return () => {
      if (robots && previousContent) robots.content = previousContent
    }
  }, [])

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <a className="skip-link" href="#not-found-content">
        Skip to content
      </a>
      <SiteHeader />
      <main id="not-found-content" className="grid flex-1 place-items-center px-4 py-20 sm:px-6">
        <section className="w-full max-w-3xl rounded-[2.25rem] border border-border/70 bg-card/82 p-7 text-center shadow-soft sm:p-12">
          <p className="text-xs font-bold tracking-[0.16em] text-primary uppercase">404</p>
          <h1 className="mt-4 font-display text-4xl leading-tight font-bold tracking-[-0.05em] text-balance sm:text-6xl">
            This page does not exist.
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-base leading-8 text-muted-foreground sm:text-lg">
            The address may have changed, or the link may be incomplete. Return
            home or continue with the Bitcoin Core learning path.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button asChild size="lg" className="min-h-12 rounded-full px-6">
              <a href="/">
                <Home aria-hidden="true" />
                Go to homepage
              </a>
            </Button>
            <Button asChild size="lg" variant="outline" className="min-h-12 rounded-full px-6">
              <a href="/en/bitcoin-core/">
                <BookOpen aria-hidden="true" />
                Explore Bitcoin Core
              </a>
            </Button>
          </div>
          <button
            type="button"
            onClick={() => window.history.back()}
            className="mt-7 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
            Go back
          </button>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
