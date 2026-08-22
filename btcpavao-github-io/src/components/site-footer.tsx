import { SiteBrandLink } from "@/components/site-brand"
import { CONTACT_EMAIL_URL, SOCIAL_LINKS } from "@/site-config"

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60 bg-card/44">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-8 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
        <div>
          <SiteBrandLink />
          <p className="mt-1 text-xs text-muted-foreground">
            Bitcoin Standard advisory · Bitcoin Core education
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-x-5 gap-y-3 text-sm font-medium text-muted-foreground">
          {SOCIAL_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-10 items-center transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
          <a
            href={CONTACT_EMAIL_URL}
            className="inline-flex min-h-10 items-center transition-colors hover:text-foreground"
          >
            Email
          </a>
        </div>
      </div>
    </footer>
  )
}
