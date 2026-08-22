import { useEffect, useState } from "react"
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
    title: "Did this help you?",
    description:
      "Everything I publish here is openly available. If this work has been valuable to you, you can return value in whatever amount feels appropriate. Your support helps me keep Bitcoin education, articles, guides and other resources open and freely available to everyone.",
    principle: "No fixed price. No paywall. No obligation.",
    action: "Return value",
    railLabel: "Support this work",
    visualAlt:
      "An open book encircled by small brass markers on a sunlit Mediterranean stone table, symbolizing open knowledge and voluntary exchange.",
  },
  hr: {
    eyebrow: "Value for value",
    title: "Je li ti ovo pomoglo?",
    description:
      "Sve što ovdje objavljujem otvoreno je dostupno. Ako ti je ovaj rad bio vrijedan, možeš uzvratiti vrijednošću u iznosu koji ti se čini primjerenim. Tvoja podrška pomaže mi zadržati Bitcoin edukaciju, članke, vodiče i druge resurse otvorenima i besplatno dostupnima svima.",
    principle: "Bez fiksne cijene. Bez paywalla. Bez obveze.",
    action: "Uzvrati vrijednost",
    railLabel: "Podrži ovaj rad",
    visualAlt:
      "Otvorena knjiga okružena malim mjedenim oznakama na osunčanom mediteranskom kamenom stolu, kao simbol otvorenog znanja i dobrovoljne razmjene.",
  },
} as const

export function ValueForValueRail({
  language = "en",
  persistent = false,
}: ValueForValueProps) {
  const labels = copy[language]
  const [cardVisible, setCardVisible] = useState(false)

  useEffect(() => {
    const card = document.querySelector(".value-for-value-card")
    if (!card) return

    const observer = new IntersectionObserver(
      ([entry]) => setCardVisible(entry.isIntersecting),
      { threshold: 0.12 }
    )
    observer.observe(card)

    return () => observer.disconnect()
  }, [])

  return (
    <aside
      className={`value-for-value-rail ${
        persistent ? "value-for-value-rail--persistent" : ""
      } ${cardVisible ? "value-for-value-rail--suppressed" : ""}`.trim()}
      aria-label={labels.railLabel}
      aria-hidden={cardVisible}
    >
      <a
        href={OPENNODE_CHECKOUT_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="value-for-value-rail__link"
        aria-label={`${labels.railLabel} — value for value`}
        tabIndex={cardVisible ? -1 : undefined}
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
      <picture className="value-for-value-card__visual">
        <source
          srcSet="/value-for-value-visual-840.webp 840w, /value-for-value-visual.webp 1536w"
          sizes="(max-width: 767px) calc(100vw - 2rem), 40vw"
          type="image/webp"
        />
        <img
          src="/value-for-value-visual.webp"
          alt={labels.visualAlt}
          width="1536"
          height="1024"
          loading="lazy"
          decoding="async"
        />
      </picture>
      <div className="value-for-value-card__content">
        <p className="value-for-value-card__eyebrow">{labels.eyebrow}</p>
        <h2>{labels.title}</h2>
        <p className="value-for-value-card__description">
          {labels.description}
        </p>
        <p className="value-for-value-card__principle">{labels.principle}</p>
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
      </div>
    </section>
  )
}
