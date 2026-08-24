import { SiteBrandLink } from "@/components/site-brand"
import { CONTACT_EMAIL_URL, SOCIAL_LINKS } from "@/site-config"

const footerGroups = [
  {
    label: "Learn Core",
    links: [
      { label: "Start Here", href: "/en/bitcoin-core/start-here/" },
      { label: "Wallet guide", href: "/en/bitcoin-core/wallet-setup-backup-recovery/" },
      { label: "Self-custody curriculum", href: "/en/bitcoin-core/self-custody/" },
    ],
  },
  {
    label: "Bitcoin Standard",
    links: [
      { label: "Advisory approach", href: "/#bitcoin-standard" },
      { label: "Work with me", href: "/#work-with-me" },
    ],
  },
  {
    label: "Writing",
    links: [
      { label: "Bitcoin Core essays", href: "/en/bitcoin-core/#essays" },
      { label: "AI u praksi", href: "/hr/ai-u-praksi/" },
    ],
  },
  {
    label: "Open work",
    links: [
      { label: "Value for Value", href: "/support/" },
      { label: "GitHub", href: "https://github.com/btcpavao", external: true },
      { label: "Report a correction", href: "https://github.com/btcpavao/btcpavao.github.io/issues/new", external: true },
    ],
  },
] as const

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60 bg-card/44">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.15fr_2fr]">
          <div>
            <SiteBrandLink />
            <p className="mt-3 max-w-sm text-sm leading-6 text-muted-foreground">
              Bitcoin Standard advisory and first-principles Bitcoin Core education.
            </p>
            <p className="mt-5 max-w-md text-sm leading-6 text-muted-foreground">
              This work follows Value for Value: use what helps, share it when useful,
              and support the work with sats, attention or a thoughtful conversation.
            </p>
          </div>
          <nav aria-label="Footer navigation" className="grid gap-8 sm:grid-cols-2 xl:grid-cols-4">
            {footerGroups.map((group) => {
              const headingId = `footer-${group.label.replaceAll(" ", "-")}`
              return (
                <section key={group.label} aria-labelledby={headingId}>
                  <h2 id={headingId} className="text-sm font-bold text-foreground">{group.label}</h2>
                  <div className="mt-3 grid gap-1">
                    {group.links.map((link) => (
                      <a
                        key={link.label}
                        href={link.href}
                        target={"external" in link ? "_blank" : undefined}
                        rel={"external" in link ? "noopener noreferrer" : undefined}
                        className="inline-flex min-h-10 items-center text-sm text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {link.label}
                      </a>
                    ))}
                  </div>
                </section>
              )
            })}
          </nav>
        </div>
        <div className="mt-9 flex flex-wrap items-center justify-between gap-4 border-t border-border/60 pt-6 text-sm text-muted-foreground">
          <span>© {new Date().getFullYear()} BTC Pavao</span>
          <div className="flex flex-wrap gap-5">
            {SOCIAL_LINKS.map((link) => (
              <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer" className="hover:text-foreground">{link.label}</a>
            ))}
            <a href={CONTACT_EMAIL_URL} className="hover:text-foreground">Email</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
