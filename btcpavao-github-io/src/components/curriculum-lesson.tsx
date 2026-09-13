import { CustodyArchitecture } from "@/components/custody-architecture"
import {
  useEffect,
  useRef,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react"
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  Clipboard,
  Clock3,
  ExternalLink,
  Link2,
} from "lucide-react"
import type {
  CurriculumCodeBlock,
  CurriculumPhase,
  PlayerLesson,
} from "@/bitcoin-core-curriculum-player-en-data"
import {
  canCompleteLesson,
  checklistKey,
  requiredChecks,
  stepKey,
} from "@/curriculum-learning"

type Language = "en" | "hr"
const copy = {
  en: {
    phase: "Phase",
    lesson: "Lesson",
    reading: "Reading",
    practice: "Practice",
    checkpoint: "Checkpoint",
    optional: "Optional",
    published: "Published",
    review: "Draft · practical review pending",
    planned: "Planned",
    metadata: "Versions and review",
    reference: "Reference version",
    date: "Previous technical review",
    origin: "Review scope",
    noReview: "Not completed",
    draft:
      "This procedure is a draft. You can read it, but completion is disabled until it has been tested and published.",
    background: "Why this matters and further reading",
    details: "Technical details",
    sources: "Sources",
    step: "Step",
    of: "of",
    result: "Expected result",
    help: "My result is different",
    confirm: "My result matches — continue",
    last: "Confirm the final result",
    back: "Previous step",
    preview: "Read the next step",
    repeat: "Repeat from this step",
    confirmed: "Result confirmed",
    checks: "Confirm what you actually did",
    readingChecks: "Check your understanding",
    prerequisites: "Complete these prerequisites first",
    open: "Open lesson",
    saved:
      "Progress is saved in this browser. The site records what you confirm; it cannot check your wallet.",
    read: "Mark as read",
    done: "Confirm practice completed",
    checkpointDone: "Confirm checkpoint",
    completed: "Completed",
    undo: "Undo completion",
    remaining: "Confirm each result before completing the exercise.",
    unavailable:
      "Completion is disabled while this exercise awaits practical review.",
    copy: "Copy",
    copied: "Copied",
    link: "Copy lesson link",
    linkCopied: "Link copied",
    secrets:
      "Never enter a password, recovery words, private key or wallet file on this website.",
  },
  hr: {
    phase: "Faza",
    lesson: "Lekcija",
    reading: "Čitanje",
    practice: "Vježba",
    checkpoint: "Provjera",
    optional: "Izborno",
    published: "Objavljeno",
    review: "Nacrt · čeka praktičnu provjeru",
    planned: "Planirano",
    metadata: "Verzije i pregled",
    reference: "Referentna verzija",
    date: "Prethodni tehnički pregled",
    origin: "Opseg pregleda",
    noReview: "Nije dovršen",
    draft:
      "Ovo je nacrt za čitanje. Dovršavanje je dostupno nakon praktične provjere i objave postupka.",
    background: "Zašto je ovo važno i dodatno čitanje",
    details: "Tehnički detalji",
    sources: "Izvori",
    step: "Korak",
    of: "od",
    result: "Očekivani rezultat",
    help: "Moj rezultat je drukčiji",
    confirm: "Rezultat odgovara — nastavi",
    last: "Potvrdi zadnji rezultat",
    back: "Prethodni korak",
    preview: "Pročitaj sljedeći korak",
    repeat: "Ponovi od ovog koraka",
    confirmed: "Rezultat potvrđen",
    checks: "Potvrdi što si stvarno napravio",
    readingChecks: "Provjeri svoje razumijevanje",
    prerequisites: "Prvo dovrši ove preduvjete",
    open: "Otvori lekciju",
    saved:
      "Sprema se samo u ovom pregledniku. Ovo su tvoje potvrde, a ne neovisna provjera novčanika.",
    read: "Označi kao pročitano",
    done: "Potvrdi izvedenu vježbu",
    checkpointDone: "Potvrdi provjeru",
    completed: "Dovršeno",
    undo: "Poništi završetak",
    remaining: "Potvrdi svaki rezultat prije dovršavanja vježbe.",
    unavailable: "Dovršavanje vježbe čeka tehničku provjeru.",
    copy: "Kopiraj",
    copied: "Kopirano",
    link: "Kopiraj poveznicu na lekciju",
    linkCopied: "Poveznica kopirana",
    secrets:
      "Na ovoj stranici nikada ne unosi lozinku, seed, privatni ključ ni datoteku novčanika.",
  },
}

function Command({
  block,
  copiedId,
  onCopy,
  language,
}: {
  block: CurriculumCodeBlock
  copiedId: string | null
  onCopy: (block: CurriculumCodeBlock) => void
  language: Language
}) {
  const t = copy[language]
  return (
    <section className="course-code">
      <div className="course-code__header">
        <h3>{block.title}</h3>
        <button
          type="button"
          className="course-copy-button"
          onClick={() => onCopy(block)}
          aria-label={`${t.copy}: ${block.title}`}
        >
          {copiedId === block.id ? (
            <Check aria-hidden="true" />
          ) : (
            <Clipboard aria-hidden="true" />
          )}
          <span>{copiedId === block.id ? t.copied : t.copy}</span>
        </button>
      </div>
      <pre>
        <code>{block.code}</code>
      </pre>
      <p>{block.explanation}</p>
      {block.warning && (
        <p className="course-guided__warning">{block.warning}</p>
      )}
      {block.parameters?.length ? (
        <dl className="course-code__parameters">
          {block.parameters.map((p) => (
            <div key={p.name}>
              <dt>{p.name}</dt>
              <dd>{p.explanation}</dd>
            </div>
          ))}
        </dl>
      ) : null}
    </section>
  )
}

function GuidedExercise({
  lesson,
  checkedItems,
  setCheckedItems,
  language,
  copiedId,
  onCopyCode,
}: {
  lesson: PlayerLesson
  checkedItems: Set<string>
  setCheckedItems: Dispatch<SetStateAction<Set<string>>>
  language: Language
  copiedId: string | null
  onCopyCode: (block: CurriculumCodeBlock) => void
}) {
  const steps = lesson.guidedSteps ?? []
  const t = copy[language]
  const firstMissing = steps.findIndex(
    (step) => !checkedItems.has(stepKey(lesson.id, step.id))
  )
  const [selected, setSelected] = useState(
    firstMissing < 0 ? steps.length - 1 : firstMissing
  )
  const draft =
    lesson.verification !== "verified" || lesson.status !== "published"
  const index = draft
    ? selected
    : Math.min(selected, firstMissing < 0 ? steps.length - 1 : firstMissing)
  const step = steps[index]
  const heading = useRef<HTMLHeadingElement>(null)
  const previousIndex = useRef(index)
  useEffect(() => {
    if (previousIndex.current !== index) heading.current?.focus()
    previousIndex.current = index
  }, [index])
  if (!step) return null
  const confirmed = checkedItems.has(stepKey(lesson.id, step.id))
  const last = index === steps.length - 1
  function confirm() {
    if (!draft)
      setCheckedItems((current) =>
        new Set(current).add(stepKey(lesson.id, step.id))
      )
    if (!last) setSelected(index + 1)
  }
  return (
    <section className="course-guided" aria-labelledby="guided-step-title">
      <div className="course-guided__position">
        <span>
          {t.step} {index + 1} {t.of} {steps.length}
        </span>
        <span>{draft ? t.review : t.practice}</span>
      </div>
      <progress
        value={index + (confirmed ? 1 : 0)}
        max={steps.length}
        aria-label={`${t.step} ${index + 1} ${t.of} ${steps.length}`}
      />
      <h2 ref={heading} tabIndex={-1} id="guided-step-title">
        {step.title}
      </h2>
      {step.warning && (
        <aside className="course-guided__warning">
          <AlertTriangle aria-hidden="true" />
          <p>{step.warning}</p>
        </aside>
      )}
      <div className="course-guided__instructions">
        {step.instructions.map((text, i) => (
          <p key={i}>{text}</p>
        ))}
      </div>
      {step.command && (
        <Command
          block={{
            id: `${lesson.id}-${step.id}`,
            title: step.commandContext ?? "Bitcoin Core",
            code: step.command,
            explanation: "",
          }}
          copiedId={copiedId}
          onCopy={onCopyCode}
          language={language}
        />
      )}
      <div className="course-guided__result">
        <strong>{t.result}</strong>
        <p>{step.expectedResult}</p>
      </div>
      {step.help && (
        <details className="course-lesson-details">
          <summary>{t.help}</summary>
          <p>{step.help}</p>
        </details>
      )}
      <div className="course-guided__actions">
        {index > 0 && (
          <button
            type="button"
            className="course-action course-action--secondary"
            onClick={() => setSelected(index - 1)}
          >
            <ArrowLeft aria-hidden="true" />
            {t.back}
          </button>
        )}
        {draft ? (
          !last && (
            <button
              type="button"
              className="course-action course-action--primary"
              onClick={confirm}
            >
              {t.preview}
              <ArrowRight aria-hidden="true" />
            </button>
          )
        ) : !last || !confirmed ? (
          <button
            type="button"
            className="course-action course-action--primary"
            onClick={confirm}
          >
            {last ? t.last : t.confirm}
            <ArrowRight aria-hidden="true" />
          </button>
        ) : (
          <span className="course-guided__confirmed">
            <CheckCircle2 aria-hidden="true" />
            {t.confirmed}
          </span>
        )}
      </div>
      {confirmed && !draft && (
        <button
          type="button"
          className="course-copy-link"
          onClick={() =>
            setCheckedItems((current) => {
              const next = new Set(current)
              for (const later of steps.slice(index))
                next.delete(stepKey(lesson.id, later.id))
              return next
            })
          }
        >
          {t.repeat}
        </button>
      )}
    </section>
  )
}

export function CurriculumLesson({
  lesson,
  phase,
  lessonNumber,
  completed,
  completedLessons,
  lessons,
  copiedId,
  checklistItems,
  setChecklistItems,
  onCopyCode,
  onCopyLink,
  copiedLink,
  onToggleComplete,
  language,
  onSelectLesson,
}: {
  lesson: PlayerLesson
  phase: CurriculumPhase
  lessonNumber: string
  completed: boolean
  completedLessons: Set<string>
  lessons: PlayerLesson[]
  copiedId: string | null
  checklistItems: Set<string>
  setChecklistItems: Dispatch<SetStateAction<Set<string>>>
  onCopyCode: (block: CurriculumCodeBlock) => void
  onCopyLink: () => void
  copiedLink: boolean
  onToggleComplete: () => void
  language: Language
  onSelectLesson: (lesson: PlayerLesson) => void
}) {
  const t = copy[language]
  const available =
    lesson.status === "published" && lesson.verification === "verified"
  const canComplete = canCompleteLesson(
    lesson,
    checklistItems,
    completedLessons
  )
  const kind = lesson.kind ?? "reading"
  const missing = (lesson.prerequisites ?? [])
    .filter((id) => !completedLessons.has(id))
    .map((id) => lessons.find((l) => l.id === id))
    .filter((l): l is PlayerLesson => Boolean(l))
  const allChecks = requiredChecks(lesson).every((key) =>
    checklistItems.has(key)
  )
  const paragraphs = lesson.explanation?.length
    ? lesson.explanation
    : [lesson.summary]
  return (
    <article
      className="course-lesson course-lesson--focused"
      aria-labelledby="lesson-title"
    >
      <header className="course-lesson__header">
        <div className="course-lesson__kicker">
          <span>
            {t.phase} {Number(phase.id) + 1}
          </span>
          <span aria-hidden="true">/</span>
          <span>
            {t.lesson} {lessonNumber}
          </span>
        </div>
        <h1 id="lesson-title" tabIndex={-1}>
          {lesson.title}
        </h1>
        <p className="course-lesson__objective">{lesson.objective}</p>
        <div className="course-lesson__meta">
          <span>{t[kind]}</span>
          <span>
            <Clock3 aria-hidden="true" />
            {lesson.estimatedTime}
          </span>
          {lesson.optional && <span>{t.optional}</span>}
          <span>
            {available
              ? t.published
              : lesson.verification === "planned"
                ? t.planned
                : t.review}
          </span>
        </div>
      </header>
      {!available && (
        <aside className="course-review-state">
          <AlertTriangle aria-hidden="true" />
          <div>
            <strong>{t.draft}</strong>
            <p>{lesson.reviewNote}</p>
          </div>
        </aside>
      )}
      {missing.length > 0 && (
        <aside className="course-prerequisites">
          <strong>{t.prerequisites}</strong>
          <ul>
            {missing.map((l) => (
              <li key={l.id}>
                <button type="button" onClick={() => onSelectLesson(l)}>
                  {l.title}
                  <ArrowRight aria-hidden="true" />
                </button>
              </li>
            ))}
          </ul>
        </aside>
      )}
      {lesson.guidedSteps?.length ? (
        <GuidedExercise
          key={lesson.id}
          lesson={lesson}
          checkedItems={checklistItems}
          setCheckedItems={setChecklistItems}
          language={language}
          copiedId={copiedId}
          onCopyCode={onCopyCode}
        />
      ) : (
        <section className="course-reading">
          {paragraphs.slice(0, 2).map((p) => (
            <p key={p}>{p}</p>
          ))}
          {lesson.warnings?.map((p) => (
            <aside className="course-guided__warning" key={p}>
              <AlertTriangle aria-hidden="true" />
              <p>{p}</p>
            </aside>
          ))}
        </section>
      )}
      {lesson.checklist?.length ? (
        <section className="course-checklist">
          <h2>{kind === "reading" ? t.readingChecks : t.checks}</h2>
          <div className="course-checklist__items">
            {lesson.checklist.map((item, index) => {
              const key = checklistKey(lesson.id, index)
              const checked = checklistItems.has(key)
              return (
                <label key={key} className={checked ? "is-checked" : undefined}>
                  <input
                    type="checkbox"
                    checked={checked}
                    disabled={kind !== "reading" && !available}
                    onChange={() =>
                      setChecklistItems((current) => {
                        const next = new Set(current)
                        if (next.has(key)) next.delete(key)
                        else next.add(key)
                        return next
                      })
                    }
                  />
                  <span className="course-checkbox" aria-hidden="true">
                    <Check />
                  </span>
                  <span>{item}</span>
                </label>
              )
            })}
          </div>
        </section>
      ) : null}
      {lesson.id === "2.4" && <CustodyArchitecture language={language} />}
      <details className="course-lesson-details">
        <summary>{t.background}</summary>
        {(lesson.guidedSteps?.length ? paragraphs : paragraphs.slice(2)).map(
          (p) => (
            <p key={p}>{p}</p>
          )
        )}
        {lesson.what && <p>{lesson.what}</p>}
        {lesson.why && <p>{lesson.why}</p>}
        {lesson.risk && <p>{lesson.risk}</p>}
        {lesson.callouts?.map((callout) => (
          <aside
            className={`course-callout course-callout--${callout.kind}`}
            key={callout.title}
          >
            <div>
              <strong>
                {callout.url ? (
                  <a href={callout.url}>{callout.title}</a>
                ) : (
                  callout.title
                )}
              </strong>
              <p>{callout.body}</p>
            </div>
          </aside>
        ))}
        {lesson.concepts?.length ? (
          <ul>
            {lesson.concepts.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        ) : null}
        {lesson.notes?.map((p) => (
          <p key={p}>{p}</p>
        ))}
        {lesson.walkthrough && !lesson.guidedSteps?.length && (
          <>
            <h3>{lesson.walkthrough.title}</h3>
            <p>{lesson.walkthrough.intro}</p>
            <ol>
              {lesson.walkthrough.steps.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ol>
          </>
        )}
        {lesson.image && (
          <figure className="course-lesson-image">
            <img src={lesson.image.src} alt={lesson.image.alt} loading="lazy" />
          </figure>
        )}
        {lesson.codeBlocks?.map((block) => (
          <Command
            key={block.id}
            block={block}
            copiedId={copiedId}
            onCopy={onCopyCode}
            language={language}
          />
        ))}
        {lesson.technicalDetails && (
          <>
            <h3>{t.details}</h3>
            <p>{lesson.technicalDetails}</p>
          </>
        )}
      </details>
      {lesson.videoUrl && (
        <div className="course-video course-video--embed">
          <iframe
            src={lesson.videoUrl}
            title={`Video: ${lesson.title}`}
            loading="lazy"
            allowFullScreen
          />
        </div>
      )}
      <details className="course-lesson-details">
        <summary>
          {t.sources} · {t.metadata}
        </summary>
        <dl className="course-lesson__version">
          <div>
            <dt>{t.reference}</dt>
            <dd>{lesson.referenceVersion}</dd>
          </div>
          <div>
            <dt>{t.date}</dt>
            <dd>{lesson.lastReviewed ?? t.noReview}</dd>
          </div>
          {lesson.contentUpdated && (
            <div>
              <dt>
                {language === "en"
                  ? "Content updated; no new practical test"
                  : "Sadržaj ažuriran; bez novog praktičnog testa"}
              </dt>
              <dd>{lesson.contentUpdated}</dd>
            </div>
          )}
          <div>
            <dt>{t.origin}</dt>
            <dd>{lesson.origin}</dd>
          </div>
        </dl>
        {lesson.sources?.length ? (
          <ul className="course-source-links">
            {lesson.sources.map((s) => (
              <li key={s.url}>
                <a href={s.url} target="_blank" rel="noreferrer">
                  {s.label}
                  <ExternalLink aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        ) : null}
      </details>
      <footer className="course-lesson__completion">
        <div>
          <strong>
            {!available
              ? t.unavailable
              : !allChecks
                ? t.remaining
                : missing.length
                  ? t.prerequisites
                  : completed
                    ? t.completed
                    : t[kind]}
          </strong>
          <p>{t.saved}</p>
        </div>
        {(!lesson.guidedSteps?.length || allChecks || !available) && (
          <button
            type="button"
            className={completed ? "is-complete" : undefined}
            disabled={!completed && !canComplete}
            onClick={() => {
              if (completed || canComplete) onToggleComplete()
            }}
          >
            <CheckCircle2 aria-hidden="true" />
            {completed
              ? t.undo
              : kind === "reading"
                ? t.read
                : kind === "checkpoint"
                  ? t.checkpointDone
                  : t.done}
          </button>
        )}
      </footer>
      {kind !== "reading" && <p className="course-local-note">{t.secrets}</p>}
      <button type="button" className="course-copy-link" onClick={onCopyLink}>
        {copiedLink ? (
          <Check aria-hidden="true" />
        ) : (
          <Link2 aria-hidden="true" />
        )}
        {copiedLink ? t.linkCopied : t.link}
      </button>
    </article>
  )
}
