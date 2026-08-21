import { useEffect, useRef, useState } from "react"
import { ArrowRight, Menu, MoonStar, SunMedium, X } from "lucide-react"

import { SiteBrandLink } from "@/components/site-brand"
import { useTheme } from "@/components/theme-provider"
import { Button } from "@/components/ui/button"

const BOOKING_URL = "https://cal.com/btcpavao/introductory-call"

const navigation = [
  { label: "Bitcoin Standard", href: "/#bitcoin-standard" },
  { label: "Bitcoin Core", href: "/#bitcoin-core" },
  { label: "Tutorials", href: "/#tutorials" },
  { label: "Writing", href: "/#writing" },
  { label: "About", href: "/#about" },
  { label: "Work with me", href: "/#work-with-me" },
]

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

export function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const menuButtonRef = useRef<HTMLButtonElement | null>(null)
  const firstMobileLinkRef = useRef<HTMLAnchorElement | null>(null)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1280) setMobileMenuOpen(false)
    }
    const handleKeydown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileMenuOpen((isOpen) => {
          if (isOpen) menuButtonRef.current?.focus()
          return false
        })
      }
    }

    window.addEventListener("resize", handleResize)
    window.addEventListener("keydown", handleKeydown)
    return () => {
      window.removeEventListener("resize", handleResize)
      window.removeEventListener("keydown", handleKeydown)
    }
  }, [])

  useEffect(() => {
    if (mobileMenuOpen) firstMobileLinkRef.current?.focus()
  }, [mobileMenuOpen])

  return (
    <header className="home-header sticky top-0 z-50 border-b border-border/60 bg-background/88 backdrop-blur-xl">
      <div className="mx-auto flex min-h-[72px] max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <SiteBrandLink />

        <nav
          aria-label="Main navigation"
          className="hidden xl:flex xl:items-center"
        >
          {navigation.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="home-nav-link inline-flex min-h-11 items-center rounded-full px-2.5 text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button
            asChild
            className="hidden min-h-11 rounded-full px-5 xl:inline-flex"
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
            className="home-icon-button size-11 rounded-full bg-background/88 xl:hidden"
            onClick={() => setMobileMenuOpen((open) => !open)}
            aria-label={mobileMenuOpen ? "Close navigation" : "Open navigation"}
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
          className="border-t border-border/60 bg-background/96 px-4 py-4 xl:hidden"
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
            <div className="mt-2">
              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-h-11 items-center justify-center rounded-full bg-primary px-4 text-sm font-semibold text-primary-foreground active:scale-[0.96]"
              >
                Book a call
              </a>
            </div>
          </div>
        </nav>
      ) : null}
    </header>
  )
}
