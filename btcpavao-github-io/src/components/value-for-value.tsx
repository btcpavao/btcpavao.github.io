import { ArrowUpRight, Zap } from "lucide-react"

export const OPENNODE_CHECKOUT_URL =
  "https://checkout.opennode.com/p/5d3032e8-dc66-4e0f-9fbe-e523ea62dc05"

type ValueForValueProps = {
  language?: "en" | "hr"
  className?: string
  persistent?: boolean
}

const copy = {
  en: {
    eyebrow: "Value for value",
    title: "Support this work with bitcoin",
    description:
      "If an article, guide, or conversation helped you, send back the value it created for you.",
    action: "Support with bitcoin",
    railLabel: "Support this work",
  },
  hr: {
    eyebrow: "Value for value",
    title: "Podrži ovaj rad bitcoinom",
    description:
      "Ako ti je članak, vodič ili razgovor pomogao, uzvrati vrijednošću koju je za tebe stvorio.",
    action: "Podrži bitcoinom",
    railLabel: "Podrži ovaj rad",
  },
} as const

export function ValueForValueRail({
  language = "en",
  persistent = false,
}: ValueForValueProps) {
  const labels = copy[language]

  return (
    <aside
      className={`value-for-value-rail ${
        persistent ? "value-for-value-rail--persistent" : ""
      }`.trim()}
      aria-label={labels.railLabel}
    >
      <a
        href={OPENNODE_CHECKOUT_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="value-for-value-rail__link"
        aria-label={`${labels.railLabel} — value for value`}
      >
        <span className="value-for-value-rail__icon" aria-hidden="true">
          <Zap />
        </span>
        <span className="value-for-value-rail__eyebrow">{labels.eyebrow}</span>
        <span className="value-for-value-rail__title">{labels.railLabel}</span>
        <ArrowUpRight
          className="value-for-value-rail__arrow"
          aria-hidden="true"
        />
      </a>
    </aside>
  )
}

export function ValueForValueCard({
  language = "en",
  className = "",
}: ValueForValueProps) {
  const labels = copy[language]

  return (
    <section className={`value-for-value-card ${className}`.trim()}>
      <div>
        <p className="value-for-value-card__eyebrow">{labels.eyebrow}</p>
        <h2>{labels.title}</h2>
        <p className="value-for-value-card__description">
          {labels.description}
        </p>
      </div>
      <a
        href={OPENNODE_CHECKOUT_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="value-for-value-card__button"
      >
        <Zap aria-hidden="true" />
        {labels.action}
        <ArrowUpRight aria-hidden="true" />
      </a>
    </section>
  )
}
