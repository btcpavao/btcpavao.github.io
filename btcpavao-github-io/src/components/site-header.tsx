import { useEffect, useRef, useState, useSyncExternalStore } from "react"
import {
  ArrowRight,
  ChevronDown,
  Languages,
  Menu,
  MoonStar,
  SunMedium,
  X,
} from "lucide-react"

import { findContentByPath, getLanguageTarget } from "@/content-registry"
import { SiteBrandLink } from "@/components/site-brand"
import { useTheme } from "@/components/theme-provider"
import { Button } from "@/components/ui/button"
import { BOOKING_URL } from "@/site-config"

const navigationGroups = [
  {
    label: "Bitcoin Core",
    links: [
      { label: "Start Here", href: "/en/bitcoin-core/start-here/" },
      {
        label: "Create, back up and restore a wallet",
        href: "/en/bitcoin-core/wallet-setup-backup-recovery/",
      },
      { label: "Self-custody curriculum", href: "/en/bitcoin-core/self-custody/" },
      { label: "All Bitcoin Core work", href: "/en/bitcoin-core/" },
    ],
  },
  {
    label: "Bitcoin Standard",
    links: [
      { label: "Advisory approach", href: "/#bitcoin-standard" },
      { label: "Work with me", href: "/#work-with-me" },
      { label: "Book a conversation", href: BOOKING_URL, external: true },
    ],
  },
  {
    label: "Writing",
    links: [
      { label: "Bitcoin Core essays", href: "/en/bitcoin-core/#essays" },
      { label: "Latest writing", href: "/#writing" },
    ],
  },
  {
    label: "Additional",
    links: [
      { label: "About", href: "/#about" },
      { label: "Open work and support", href: "/support/" },
      { label: "Contact", href: "/#work-with-me" },
    ],
  },
] as const

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
        <SunMedium className={`theme-toggle-icon ${isDark ? "theme-toggle-icon-active" : "theme-toggle-icon-inactive"}`} />
        <MoonStar className={`theme-toggle-icon ${isDark ? "theme-toggle-icon-inactive" : "theme-toggle-icon-active"}`} />
      </span>
    </Button>
  )
}

export function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [openGroup, setOpenGroup] = useState<string | null>(null)
  const currentPath = useSyncExternalStore(
    () => () => undefined,
    () => window.location.pathname,
    () => "/"
  )
  const currentLocale = currentPath.startsWith("/hr/") ? "hr" : "en"
  const targetLocale = currentLocale === "hr" ? "en" : "hr"
  const languageTarget = getLanguageTarget(currentPath, targetLocale)
  const currentEntry = findContentByPath(currentPath)
  const languageLink = {
    href: languageTarget,
    label: targetLocale.toUpperCase(),
    exact: currentEntry?.translationPath === languageTarget,
  }
  const headerRef = useRef<HTMLElement | null>(null)
  const menuButtonRef = useRef<HTMLButtonElement | null>(null)
  const firstMobileLinkRef = useRef<HTMLAnchorElement | null>(null)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setMobileMenuOpen(false)
    }
    const handleKeydown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return
      setOpenGroup(null)
      setMobileMenuOpen((isOpen) => {
        if (isOpen) menuButtonRef.current?.focus()
        return false
      })
    }
    const handlePointerDown = (event: PointerEvent) => {
      if (!headerRef.current?.contains(event.target as Node)) setOpenGroup(null)
    }

    window.addEventListener("resize", handleResize)
    window.addEventListener("keydown", handleKeydown)
    window.addEventListener("pointerdown", handlePointerDown)
    return () => {
      window.removeEventListener("resize", handleResize)
      window.removeEventListener("keydown", handleKeydown)
      window.removeEventListener("pointerdown", handlePointerDown)
    }
  }, [])

  useEffect(() => {
    if (mobileMenuOpen) firstMobileLinkRef.current?.focus()
  }, [mobileMenuOpen])

  const languageTitle = languageLink.exact
    ? `Open ${languageLink.label} version`
    : `${languageLink.label} translation unavailable; open the relevant language hub`

  return (
    <header ref={headerRef} className="home-header sticky top-0 z-50 border-b border-border/60 bg-background/88 backdrop-blur-xl">
      <div className="mx-auto flex min-h-[72px] max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
        <SiteBrandLink />

        <nav aria-label="Main navigation" className="hidden lg:flex lg:items-center">
          {navigationGroups.map((group) => {
            const isOpen = openGroup === group.label
            return (
              <div key={group.label} className="relative">
                <button
                  type="button"
                  className="home-nav-link inline-flex min-h-11 items-center gap-1 rounded-full px-2.5 text-sm font-medium text-muted-foreground hover:text-foreground"
                  aria-expanded={isOpen}
                  aria-haspopup="true"
                  onClick={() => setOpenGroup(isOpen ? null : group.label)}
                >
                  {group.label}
                  <ChevronDown className={`size-3.5 transition-transform ${isOpen ? "rotate-180" : ""}`} aria-hidden="true" />
                </button>
                {isOpen ? (
                  <div className="absolute left-0 top-[calc(100%+0.35rem)] w-72 rounded-3xl border border-border/70 bg-background/98 p-2 shadow-soft">
                    {group.links.map((link) => (
                      <a
                        key={link.label}
                        href={link.href}
                        target={"external" in link ? "_blank" : undefined}
                        rel={"external" in link ? "noopener noreferrer" : undefined}
                        className="flex min-h-11 items-center justify-between rounded-2xl px-4 py-2 text-sm font-medium hover:bg-card"
                        onClick={() => setOpenGroup(null)}
                      >
                        {link.label}
                        <ArrowRight className="size-4" aria-hidden="true" />
                      </a>
                    ))}
                  </div>
                ) : null}
              </div>
            )
          })}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={languageLink.href}
            title={languageTitle}
            aria-label={languageTitle}
            className="hidden min-h-11 items-center gap-1.5 rounded-full border border-border/70 bg-background/88 px-3 text-sm font-bold text-muted-foreground hover:text-foreground sm:inline-flex"
          >
            <Languages className="size-4" aria-hidden="true" />
            {languageLink.label}
          </a>
          <ThemeToggle />
          <Button asChild className="hidden min-h-11 rounded-full px-5 xl:inline-flex">
            <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">Book a call</a>
          </Button>
          <Button
            ref={menuButtonRef}
            type="button"
            variant="outline"
            size="icon"
            className="home-icon-button size-11 rounded-full bg-background/88 lg:hidden"
            onClick={() => setMobileMenuOpen((open) => !open)}
            aria-label={mobileMenuOpen ? "Close navigation" : "Open navigation"}
            aria-controls="mobile-navigation"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </Button>
        </div>
      </div>

      {mobileMenuOpen ? (
        <nav id="mobile-navigation" aria-label="Mobile navigation" className="max-h-[calc(100vh-72px)] overflow-y-auto border-t border-border/60 bg-background/98 px-4 py-4 lg:hidden">
          <div className="mx-auto grid max-w-7xl gap-5">
            {navigationGroups.map((group, groupIndex) => (
              <section key={group.label} aria-labelledby={`mobile-${groupIndex}`}>
                <h2 id={`mobile-${groupIndex}`} className="px-4 pb-1 text-xs font-bold tracking-[0.12em] text-primary uppercase">{group.label}</h2>
                {group.links.map((link, linkIndex) => (
                  <a
                    key={link.label}
                    ref={groupIndex === 0 && linkIndex === 0 ? firstMobileLinkRef : undefined}
                    href={link.href}
                    target={"external" in link ? "_blank" : undefined}
                    rel={"external" in link ? "noopener noreferrer" : undefined}
                    className="flex min-h-11 items-center justify-between rounded-2xl px-4 text-sm font-medium hover:bg-card"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.label}
                    <ArrowRight className="size-4" aria-hidden="true" />
                  </a>
                ))}
              </section>
            ))}
            <a href={languageLink.href} title={languageTitle} className="flex min-h-11 items-center justify-between rounded-2xl border border-border/70 px-4 text-sm font-semibold">
              Open {languageLink.label}{!languageLink.exact ? " language hub" : " version"}
              <Languages className="size-4" aria-hidden="true" />
            </a>
          </div>
        </nav>
      ) : null}
    </header>
  )
}
