import type { ReactNode } from "react"

type TutorialMetadataProps = {
  language: "en" | "hr"
  goal: ReactNode
  difficulty: ReactNode
  estimatedTime: ReactNode
  realBitcoin: ReactNode
  softwareVersion: ReactNode
  operatingSystems: ReactNode
  recommendedOs: ReactNode
  prerequisites: ReactNode
  outcome: ReactNode
  lastReviewed: ReactNode
  className?: string
}

const labels = {
  en: {
    title: "Before you begin",
    goal: "Goal",
    difficulty: "Difficulty",
    estimatedTime: "Estimated time",
    realBitcoin: "Real bitcoin",
    softwareVersion: "Software version",
    operatingSystems: "Operating systems",
    recommendedOs: "Recommended OS",
    prerequisites: "Prerequisites",
    outcome: "Expected outcome",
    lastReviewed: "Last reviewed",
  },
  hr: {
    title: "Prije početka",
    goal: "Cilj",
    difficulty: "Težina",
    estimatedTime: "Procijenjeno vrijeme",
    realBitcoin: "Stvarni bitcoin",
    softwareVersion: "Verzija softvera",
    operatingSystems: "Operacijski sustavi",
    recommendedOs: "Preporučeni OS",
    prerequisites: "Preduvjeti",
    outcome: "Očekivani rezultat",
    lastReviewed: "Zadnja provjera",
  },
} as const

export function TutorialMetadata({
  language,
  goal,
  difficulty,
  estimatedTime,
  realBitcoin,
  softwareVersion,
  operatingSystems,
  recommendedOs,
  prerequisites,
  outcome,
  lastReviewed,
  className = "",
}: TutorialMetadataProps) {
  const copy = labels[language]
  const rows = [
    [copy.goal, goal],
    [copy.difficulty, difficulty],
    [copy.estimatedTime, estimatedTime],
    [copy.realBitcoin, realBitcoin],
    [copy.softwareVersion, softwareVersion],
    [copy.operatingSystems, operatingSystems],
    [copy.recommendedOs, recommendedOs],
    [copy.prerequisites, prerequisites],
    [copy.outcome, outcome],
    [copy.lastReviewed, lastReviewed],
  ] as const

  return (
    <section
      className={`rounded-[28px] bg-card p-5 shadow-[var(--shadow-border)] sm:p-7 ${className}`}
      aria-labelledby={`tutorial-metadata-${language}`}
    >
      <h2
        id={`tutorial-metadata-${language}`}
        className="font-display text-2xl font-bold tracking-[-0.035em]"
      >
        {copy.title}
      </h2>
      <dl className="mt-5 grid gap-px overflow-hidden rounded-[20px] bg-border/70 sm:grid-cols-2">
        {rows.map(([label, value]) => (
          <div key={label} className="min-w-0 bg-background p-4 sm:p-5">
            <dt className="text-[10px] font-bold tracking-[0.12em] text-primary uppercase">
              {label}
            </dt>
            <dd className="mt-2 text-sm leading-6 text-foreground [&_a]:font-semibold [&_a]:text-primary [&_a]:underline [&_a]:underline-offset-4">
              {value}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  )
}
