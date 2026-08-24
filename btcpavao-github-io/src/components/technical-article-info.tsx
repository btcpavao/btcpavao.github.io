type SourceLink = {
  label: string
  href: string
}

type TechnicalArticleInfoProps = {
  language: "en" | "hr"
  published: string
  updated: string
  coreVersion: string
  sourcePath: string
  sources: SourceLink[]
}

const REPOSITORY_URL = "https://github.com/btcpavao/btcpavao.github.io"

export function TechnicalArticleInfo({
  language,
  published,
  updated,
  coreVersion,
  sourcePath,
  sources,
}: TechnicalArticleInfoProps) {
  const isEnglish = language === "en"
  const correctionUrl = `${REPOSITORY_URL}/issues/new?title=${encodeURIComponent(
    `Correction: ${sourcePath}`
  )}`

  return (
    <aside
      aria-label={
        isEnglish
          ? "Technical article information"
          : "Tehnički podaci o članku"
      }
      className="article-shell mt-8 rounded-[1.75rem] border border-border/70 bg-card/76 p-5 shadow-sm sm:p-7"
    >
      <p className="text-xs font-semibold tracking-[0.18em] text-bitcoin uppercase">
        {isEnglish ? "Technical article record" : "Tehnički zapis članka"}
      </p>

      <dl className="mt-5 grid gap-4 text-sm sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <dt className="font-semibold text-foreground">
            {isEnglish ? "Published" : "Objavljeno"}
          </dt>
          <dd className="mt-1 leading-6 text-muted-foreground">{published}</dd>
        </div>
        <div>
          <dt className="font-semibold text-foreground">
            {isEnglish ? "Last updated" : "Posljednje ažuriranje"}
          </dt>
          <dd className="mt-1 leading-6 text-muted-foreground">{updated}</dd>
        </div>
        <div>
          <dt className="font-semibold text-foreground">
            {isEnglish ? "Technical review" : "Tehnička provjera"}
          </dt>
          <dd className="mt-1 leading-6 text-muted-foreground">
            {isEnglish
              ? "Checked against primary sources"
              : "Provjereno prema primarnim izvorima"}
          </dd>
        </div>
        <div>
          <dt className="font-semibold text-foreground">
            {isEnglish ? "Core reference version" : "Referentna Core verzija"}
          </dt>
          <dd className="mt-1 leading-6 text-muted-foreground">
            Bitcoin Core {coreVersion}
          </dd>
        </div>
      </dl>

      <div className="mt-6 border-t border-border/60 pt-5">
        <p className="text-sm font-semibold text-foreground">
          {isEnglish ? "Sources" : "Izvori"}
        </p>
        <div className="mt-3 flex flex-wrap gap-x-5 gap-y-3 text-sm">
          {sources.map((source) => (
            <a
              key={source.href}
              className="font-medium text-bitcoin underline decoration-bitcoin/35 underline-offset-4 hover:decoration-bitcoin"
              href={source.href}
              target="_blank"
              rel="noreferrer"
            >
              {source.label}
            </a>
          ))}
          <a
            className="font-medium text-bitcoin underline decoration-bitcoin/35 underline-offset-4 hover:decoration-bitcoin"
            href={correctionUrl}
            target="_blank"
            rel="noreferrer"
          >
            {isEnglish ? "Report a correction" : "Prijavite ispravak"}
          </a>
          <a
            className="font-medium text-bitcoin underline decoration-bitcoin/35 underline-offset-4 hover:decoration-bitcoin"
            href={`${REPOSITORY_URL}/blob/main/${sourcePath}`}
            target="_blank"
            rel="noreferrer"
          >
            {isEnglish ? "View source" : "Pogledajte izvor"}
          </a>
        </div>
      </div>
    </aside>
  )
}
