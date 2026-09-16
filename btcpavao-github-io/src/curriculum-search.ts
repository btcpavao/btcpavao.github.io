import type {
  CurriculumPhase,
  PlayerLesson,
} from "./bitcoin-core-curriculum-player-en-data"

export type SearchEntry = { lesson: PlayerLesson; phase: CurriculumPhase }

// Discovery aliases, not claims that a lesson teaches a missing workflow.
const keywords: Record<string, string[]> = {
  "coin-control-fees": ["UTXO management", "coin control", "UTXO labeling"],
  "backup-redundancy-freshness": ["backup labels", "wallet backup", "metadata"],
}

export function normalizeSearch(text: string) {
  return text
    .normalize("NFKD")
    .replace(/\p{M}/gu, "")
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, " ")
    .trim()
}

function canonicalText(text: string) {
  return normalizeSearch(text)
    .replace(/\b(?:utxo management|coin control)\b/g, "utxo")
    .replace(/\b(?:backup|back up|export|import) labels?\b/g, "labelbackup")
    .replace(/\b(?:labels|labeling|labelling)\b/g, "label")
    .replace(/\b(?:verify|verification|verified|verifying)\b/g, "verify")
    .replace(/\b(?:restore|restoration)\b/g, "recovery")
    .replace(/\b(descriptor|signature|checksum)s\b/g, "$1")
}

export function isLabelTransferQuery(query: string) {
  return /\b(?:export|import) labels?\b/.test(normalizeSearch(query))
}

export function curriculumLessonHref(slug: string, query = "") {
  const params = new URLSearchParams()
  if (query.trim()) params.set("q", query.trim())
  return `/en/bitcoin-core/self-custody/${params.size ? `?${params}` : ""}#lesson/${encodeURIComponent(slug)}`
}

function lessonPassages(lesson: PlayerLesson) {
  return [
    lesson.summary,
    lesson.objective,
    lesson.what,
    lesson.why,
    lesson.risk,
    ...(lesson.explanation ?? []),
    ...(lesson.concepts ?? []),
    ...(lesson.notes ?? []),
    ...(lesson.warnings ?? []),
    ...(lesson.checklist ?? []),
    lesson.technicalDetails,
    lesson.takeaway,
    ...(lesson.commonMistakes ?? []),
    ...(lesson.communityQuestions ?? []),
    lesson.walkthrough?.title,
    lesson.walkthrough?.intro,
    ...(lesson.walkthrough?.steps ?? []),
    ...(lesson.callouts ?? []).flatMap((c) => [c.title, c.body]),
    ...(lesson.guidedSteps ?? []).flatMap((s) => [
      s.title,
      ...s.instructions,
      s.expectedResult,
      s.warning,
      s.help,
      s.command,
      s.commandContext,
    ]),
    ...(lesson.codeBlocks ?? []).flatMap((b) => [
      b.title,
      b.code,
      b.explanation,
      b.warning,
      ...(b.parameters ?? []).flatMap((p) => [p.name, p.explanation]),
    ]),
  ].filter((value): value is string => Boolean(value))
}

export function buildCurriculumSearchIndex(entries: readonly SearchEntry[]) {
  return entries
    .filter(({ lesson }) => lesson.status === "published")
    .map((entry) => {
      const passages = lessonPassages(entry.lesson)
      const fields = [
        { text: canonicalText(entry.lesson.title), weight: 14 },
        {
          text: canonicalText((keywords[entry.lesson.id] ?? []).join(" ")),
          weight: 12,
        },
        { text: canonicalText(entry.lesson.summary), weight: 5 },
        {
          text: canonicalText(
            [entry.phase.title, entry.phase.outcome, entry.lesson.chapter].join(
              " "
            )
          ),
          weight: 4,
        },
        { text: canonicalText(passages.join(" ")), weight: 1 },
      ]
      return { ...entry, passages, fields }
    })
}

function excerpt(passages: string[], tokens: string[]) {
  const terms = tokens.flatMap((t) =>
    t === "labelbackup" ? ["label", "backup"] : [t]
  )
  const ranked = passages
    .map((text) => ({
      text,
      score: terms.filter((t) => canonicalText(text).includes(t)).length,
    }))
    .sort((a, b) => b.score - a.score)
  const text = (ranked[0]?.text ?? "").replace(/\s+/g, " ")
  if (text.length <= 210) return text
  const normalized = canonicalText(text)
  const match = terms.map((t) => normalized.indexOf(t)).filter((i) => i >= 0)
  const offset = match.length ? Math.max(0, Math.min(...match) - 55) : 0
  const start = offset ? text.lastIndexOf(" ", offset) + 1 : 0
  const cut = Math.min(text.length, start + 210)
  const end = cut < text.length ? text.lastIndexOf(" ", cut) : cut
  return `${start ? "…" : ""}${text.slice(start, end).trim()}${end < text.length ? "…" : ""}`
}

export function searchCurriculum(
  index: ReturnType<typeof buildCurriculumSearchIndex>,
  query: string
) {
  const normalized = canonicalText(query.slice(0, 200))
  if (!normalized) return []
  const tokens = [...new Set(normalized.split(/\s+/))]
  return index
    .flatMap((entry) => {
      if (
        !tokens.every((token) =>
          entry.fields.some((f) => f.text.includes(token))
        )
      )
        return []
      const score =
        entry.fields.reduce(
          (sum, field) =>
            sum +
            tokens.filter((t) => field.text.includes(t)).length * field.weight,
          0
        ) + (canonicalText(entry.lesson.title) === normalized ? 200 : 0)
      return [
        {
          lesson: entry.lesson,
          phase: entry.phase,
          score,
          excerpt: excerpt(entry.passages, tokens),
          href: curriculumLessonHref(entry.lesson.slug, query),
        },
      ]
    })
    .sort((a, b) => b.score - a.score)
}
