import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react"
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Check,
  CheckCircle2,
  ChevronRight,
  Clipboard,
  Clock3,
  Code2,
  ExternalLink,
  FileText,
  KeyRound,
  Lightbulb,
  Link2,
  Menu,
  Play,
  RefreshCcw,
  ShieldAlert,
  Terminal,
  X,
} from "lucide-react"

import {
  CORE_REFERENCE_VERSION,
  CURRICULUM_VERSION,
  LAST_TECHNICAL_REVIEW,
  curriculumLessons,
  curriculumPhases,
  findLessonBySlug,
  isAvailableLesson,
  primaryCurriculumLessons,
  type CurriculumCodeBlock,
  type CurriculumPhase,
  type CurriculumStatus,
  type LessonCallout,
  type PlayerLesson,
} from "@/bitcoin-core-curriculum-player-data"
import { SiteHeader } from "@/components/site-header"
import { TutorialMetadata } from "@/components/tutorial-metadata"
import {
  BITCOIN_CORE_CURRICULUM_PATH,
  BITCOIN_CORE_SERIES_PATH,
} from "@/routes"

const SITE_URL = "https://btcpavao.com"
const PROGRESS_STORAGE_KEY = "btcpavao-core-curriculum-progress-v1"
const CHECKLIST_STORAGE_KEY = "btcpavao-core-curriculum-checklists-v1"
const LAST_LESSON_STORAGE_KEY =
  "btcpavao-core-curriculum-last-available-lesson-v3"

type CurriculumEntry = (typeof curriculumLessons)[number]

const statusLabels: Record<CurriculumStatus, string> = {
  published: "Objavljeno",
  "in-progress": "U provjeri",
  planned: "Planirano",
}

const verificationLabels = {
  verified: "Provjereno",
  "review-required": "Treba ponovnu provjeru",
  planned: "Planirano",
}

function setMetaContent(
  attribute: "name" | "property",
  key: string,
  content: string
) {
  let meta = document.head.querySelector<HTMLMetaElement>(
    `meta[${attribute}="${key}"]`
  )

  if (!meta) {
    meta = document.createElement("meta")
    meta.setAttribute(attribute, key)
    document.head.append(meta)
  }

  meta.content = content
}

function useCurriculumMetadata() {
  useEffect(() => {
    const title = "Praktičan Bitcoin self-custody uz Bitcoin Core | BTCPAVAO"
    const description =
      "Dugoročni vodič za Bitcoin self-custody: Signet vježba, vlastiti node, backup i restore, offline signing, PSBT, multisig i operativna sigurnost."
    const url = `${SITE_URL}${BITCOIN_CORE_CURRICULUM_PATH}`

    document.documentElement.lang = "hr"
    document.title = title
    setMetaContent("name", "description", description)
    setMetaContent("property", "og:type", "website")
    setMetaContent("property", "og:title", title)
    setMetaContent("property", "og:description", description)
    setMetaContent("property", "og:url", url)
    setMetaContent("property", "og:locale", "hr_HR")
    setMetaContent("name", "twitter:title", title)
    setMetaContent("name", "twitter:description", description)

    let canonical = document.head.querySelector<HTMLLinkElement>(
      'link[rel="canonical"]'
    )
    if (!canonical) {
      canonical = document.createElement("link")
      canonical.rel = "canonical"
      document.head.append(canonical)
    }
    canonical.href = url
  }, [])
}

function readStoredSet(key: string) {
  try {
    const stored = JSON.parse(localStorage.getItem(key) ?? "[]")
    return new Set<string>(Array.isArray(stored) ? stored : [])
  } catch {
    return new Set<string>()
  }
}

function writeStoredSet(key: string, value: Set<string>) {
  try {
    localStorage.setItem(key, JSON.stringify([...value]))
  } catch {
    // Napredak ostaje u trenutnoj sesiji ako browser blokira localStorage.
  }
}

function getHashLessonSlug() {
  if (typeof window === "undefined") return null
  const match = window.location.hash.match(/^#lesson\/(.+)$/)
  return match ? decodeURIComponent(match[1]) : null
}

function formatReviewDate(date: string | undefined) {
  if (!date) return "Nije dovršena"
  return new Intl.DateTimeFormat("hr-HR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date(`${date}T12:00:00`))
}

function StatusBadge({ status }: { status: CurriculumStatus }) {
  return (
    <span className={`curriculum-status curriculum-status--${status}`}>
      <span aria-hidden="true" />
      {statusLabels[status]}
    </span>
  )
}

function PhaseAvailability({ phase }: { phase: CurriculumPhase }) {
  const available = phase.lessons.filter(isAvailableLesson).length
  const inReview = phase.lessons.filter(
    (lesson) => lesson.verification === "review-required"
  ).length
  const total = phase.lessons.length
  const state =
    available === total ? "available" : available > 0 ? "partial" : "planned"

  return (
    <span
      className={`course-phase-availability course-phase-availability--${state}`}
    >
      <span aria-hidden="true" />
      {available === total
        ? `${available} od ${total} dostupno`
        : available > 0
          ? `${available} od ${total} trenutno dostupno${inReview ? ` · ${inReview} u provjeri` : ""}`
          : inReview
            ? `${inReview} u tehničkoj provjeri`
            : "Planirano"}
    </span>
  )
}

function VideoBlock({ lesson }: { lesson: PlayerLesson }) {
  if (lesson.videoUrl) {
    return (
      <div className="course-video course-video--embed">
        <iframe
          src={lesson.videoUrl}
          title={`Video: ${lesson.title}`}
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    )
  }

  return (
    <div className="course-video" aria-label="Video u pripremi">
      <span className="course-video__icon">
        <Play aria-hidden="true" />
      </span>
      <span>
        <strong>Video u pripremi</strong>
        <small>Tekst lekcije mora biti potpun i upotrebljiv i bez videa.</small>
      </span>
    </div>
  )
}

function CodeBlock({
  block,
  copiedId,
  onCopy,
}: {
  block: CurriculumCodeBlock
  copiedId: string | null
  onCopy: (block: CurriculumCodeBlock) => void
}) {
  const copied = copiedId === block.id

  return (
    <section className="course-code" aria-labelledby={`code-${block.id}`}>
      <div className="course-code__header">
        <div>
          <span className="course-code__label">
            <Terminal aria-hidden="true" /> RPC / CLI
          </span>
          <h3 id={`code-${block.id}`}>{block.title}</h3>
        </div>
        <button
          type="button"
          className="course-copy-button"
          onClick={() => onCopy(block)}
          aria-label={`Kopiraj naredbu: ${block.title}`}
        >
          {copied ? (
            <Check aria-hidden="true" />
          ) : (
            <Clipboard aria-hidden="true" />
          )}
          <span>{copied ? "Kopirano" : "Kopiraj"}</span>
        </button>
      </div>
      <pre>
        <code>{block.code}</code>
      </pre>
      <p>{block.explanation}</p>
      {block.parameters?.length ? (
        <dl className="course-code__parameters">
          {block.parameters.map((parameter) => (
            <div key={parameter.name}>
              <dt>{parameter.name}</dt>
              <dd>{parameter.explanation}</dd>
            </div>
          ))}
        </dl>
      ) : null}
      {block.warning ? (
        <div className="course-inline-message course-inline-message--warning">
          <AlertTriangle aria-hidden="true" />
          <p>{block.warning}</p>
        </div>
      ) : null}
    </section>
  )
}

function Checklist({
  lesson,
  checkedItems,
  setCheckedItems,
}: {
  lesson: PlayerLesson
  checkedItems: Set<string>
  setCheckedItems: Dispatch<SetStateAction<Set<string>>>
}) {
  if (!lesson.checklist?.length) return null

  return (
    <section
      className="course-checklist"
      aria-labelledby="lesson-checklist-title"
    >
      <div className="course-section-heading course-section-heading--compact">
        <CheckCircle2 aria-hidden="true" />
        <div>
          <span>Primijeni</span>
          <h2 id="lesson-checklist-title">Praktični zadaci</h2>
        </div>
      </div>
      <div className="course-checklist__items">
        {lesson.checklist.map((item, index) => {
          const key = `lesson-${lesson.id}:${index}`
          const checked = checkedItems.has(key)
          return (
            <label key={key} className={checked ? "is-checked" : undefined}>
              <input
                type="checkbox"
                checked={checked}
                onChange={() =>
                  setCheckedItems((current) => {
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
  )
}

function Callout({ callout }: { callout: LessonCallout }) {
  const Icon =
    callout.kind === "warning"
      ? ShieldAlert
      : callout.kind === "verify"
        ? CheckCircle2
        : callout.kind === "mental-model"
          ? Lightbulb
          : FileText

  return (
    <aside className={`course-callout course-callout--${callout.kind}`}>
      <Icon aria-hidden="true" />
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
  )
}

function PhaseNavigator({
  activeLesson,
  completedLessons,
  onSelectLesson,
  onOverview,
  mobile = false,
}: {
  activeLesson: PlayerLesson
  completedLessons: Set<string>
  onSelectLesson: (lesson: PlayerLesson) => void
  onOverview: () => void
  mobile?: boolean
}) {
  const activePhase = curriculumPhases.find((phase) =>
    phase.lessons.some((lesson) => lesson.id === activeLesson.id)
  )
  const availableCount = primaryCurriculumLessons.length
  const completedCount = primaryCurriculumLessons.filter(({ lesson }) =>
    completedLessons.has(lesson.id)
  ).length

  return (
    <nav className="course-outline" aria-label="Faze i lekcije kurikuluma">
      <button
        type="button"
        className="course-outline__overview"
        onClick={onOverview}
        tabIndex={mobile ? 0 : undefined}
      >
        <BookOpen aria-hidden="true" />
        Pregled kurikuluma
      </button>
      <div className="course-outline__progress">
        <span>
          Tvoj napredak
          <small>{availableCount} trenutno dostupno</small>
        </span>
        <strong>{completedCount} završeno</strong>
      </div>
      <ol className="course-outline__phases">
        {curriculumPhases.map((phase) => {
          const isActive = phase.id === activePhase?.id
          return (
            <li key={phase.id} className={isActive ? "is-active" : undefined}>
              <button
                type="button"
                className="course-outline__phase"
                onClick={() => {
                  const lesson = phase.lessons[0]
                  if (lesson) onSelectLesson(lesson)
                }}
                aria-current={isActive ? "step" : undefined}
              >
                <span>{String(Number(phase.id) + 1).padStart(2, "0")}</span>
                <span>
                  <strong>{phase.shortTitle}</strong>
                  <small>{phase.estimatedTime}</small>
                </span>
                <ChevronRight aria-hidden="true" />
              </button>
              {isActive ? (
                <ol className="course-outline__lessons">
                  {phase.lessons.map((lesson, index) => {
                    const isCurrent = lesson.id === activeLesson.id
                    return (
                      <li key={lesson.id}>
                        <button
                          type="button"
                          className={isCurrent ? "is-current" : undefined}
                          onClick={() => onSelectLesson(lesson)}
                          aria-current={isCurrent ? "page" : undefined}
                        >
                          <span>
                            {phase.id}.{index + 1}
                          </span>
                          <span className="course-outline__lesson-title">
                            <span>{lesson.title}</span>
                            {lesson.optional ? (
                              <small>Neobavezni deep dive</small>
                            ) : !isAvailableLesson(lesson) ? (
                              <small>
                                {lesson.status === "planned"
                                  ? "Planirano"
                                  : "U tehničkoj provjeri"}
                              </small>
                            ) : null}
                          </span>
                          {completedLessons.has(lesson.id) ? (
                            <Check aria-label="Dovršeno" />
                          ) : null}
                        </button>
                      </li>
                    )
                  })}
                </ol>
              ) : null}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

function CourseLanding({
  completedLessons,
  onStart,
  onContinue,
  continueEntry,
  returning,
  onSelectPhase,
  onReset,
}: {
  completedLessons: Set<string>
  onStart: () => void
  onContinue: () => void
  continueEntry: CurriculumEntry | null
  returning: boolean
  onSelectPhase: (phase: CurriculumPhase) => void
  onReset: () => void
}) {
  const [roadmapOpen, setRoadmapOpen] = useState(false)
  const completableLessons = primaryCurriculumLessons
  const completedCount = completableLessons.filter(({ lesson }) =>
    completedLessons.has(lesson.id)
  ).length
  const progress = completableLessons.length
    ? (completedCount / completableLessons.length) * 100
    : 0

  return (
    <>
      <section className="course-hero" aria-labelledby="course-title">
        <div className="course-hero__copy">
          <div className="course-eyebrow">
            <img
              src="/bitcoin-logo-official.png"
              alt=""
              width="1920"
              height="1920"
              aria-hidden="true"
              draggable="false"
            />
            <span>Living curriculum · v{CURRICULUM_VERSION}</span>
          </div>
          <h1 id="course-title">
            Nauči držati svoj Bitcoin tako da razumiješ cijeli sustav.
          </h1>
          <p className="course-hero__lede">
            Praktičan put kroz dugoročni self-custody uz Bitcoin Core. Privatni
            ključevi su početak; pouzdan sustav uključuje provjeru, backup,
            restore, potpisivanje i rutinu koju možeš ponoviti pod stresom.
          </p>
          <section
            className="course-software-stack"
            aria-labelledby="course-software-stack-title"
          >
            <div className="course-software-stack__intro">
              <strong id="course-software-stack-title">
                Preporučeni softverski stack
              </strong>
              <span>Službeni alati koji se koriste kroz kurikulum</span>
            </div>
            <ul aria-label="Bitcoin Core, Linux, Fedora i KeePassXC">
              <li className="course-software-stack__item--primary">
                <img
                  src="/software-stack/bitcoin-core.svg"
                  alt=""
                  aria-hidden="true"
                />
                <span>Bitcoin Core</span>
              </li>
              <li>
                <img src="/software-stack/tux.svg" alt="" aria-hidden="true" />
                <span>Linux</span>
              </li>
              <li>
                <img
                  src="/software-stack/fedora.svg"
                  alt=""
                  aria-hidden="true"
                />
                <span>Fedora</span>
              </li>
              <li>
                <img
                  src="/software-stack/keepassxc.svg"
                  alt=""
                  aria-hidden="true"
                />
                <span>KeePassXC</span>
              </li>
            </ul>
          </section>
          <div className="course-hero__actions">
            <button
              type="button"
              className="course-action course-action--primary"
              onClick={returning ? onContinue : onStart}
            >
              {returning && continueEntry
                ? `Nastavi: ${continueEntry.lesson.title}`
                : "Kreni od prvog koraka"}
              <ArrowRight aria-hidden="true" />
            </button>
          </div>
          <blockquote>
            Tvoj node je prije svega važan tebi: njime sam provjeravaš pravila,
            stanje i transakcije na koje se oslanjaš.
          </blockquote>
        </div>

        <aside
          className="course-progress-card"
          aria-label="Napredak i verzija sadržaja"
        >
          <div className="course-progress-card__heading">
            <span>
              {returning ? "Tvoja sljedeća točka" : "Living curriculum"}
            </span>
            <strong aria-live="polite">
              {returning && continueEntry
                ? continueEntry.lesson.title
                : `${completableLessons.length} provjerenih lekcija`}
            </strong>
          </div>
          {continueEntry ? (
            <p className="course-progress-card__location">
              Faza {Number(continueEntry.phase.id) + 1} · Lekcija{" "}
              {continueEntry.lessonNumber}
            </p>
          ) : null}
          <div
            className="course-progress-track"
            role="progressbar"
            aria-label="Napredak kroz provjerene i objavljene lekcije"
            aria-valuemin={0}
            aria-valuemax={completableLessons.length}
            aria-valuenow={completedCount}
          >
            <span style={{ width: `${progress}%` }} />
          </div>
          <p>
            {completedCount} završeno · {completableLessons.length} trenutno
            dostupno. Napredak se sprema samo u ovom browseru; deep diveovi i
            lekcije u provjeri ne blokiraju glavni put.
          </p>
          <dl>
            <div>
              <dt>Referentna verzija</dt>
              <dd>{CORE_REFERENCE_VERSION}</dd>
            </div>
            <div>
              <dt>Zadnja dovršena tehnička provjera</dt>
              <dd>{formatReviewDate(LAST_TECHNICAL_REVIEW)}</dd>
            </div>
            <div>
              <dt>Sadržaj</dt>
              <dd>v{CURRICULUM_VERSION}</dd>
            </div>
          </dl>
          {completedCount ? (
            <button type="button" className="course-reset" onClick={onReset}>
              <RefreshCcw aria-hidden="true" />
              Resetiraj napredak
            </button>
          ) : null}
        </aside>
      </section>

      <section
        className="course-recommendation"
        aria-labelledby="course-recommendation-title"
      >
        <ShieldAlert aria-hidden="true" />
        <div>
          <span>Snažna preporuka</span>
          <h2 id="course-recommendation-title">
            Ovo je Bitcoin Core-only self-custody kurikulum.
          </h2>
          <p>
            Bitcoin Core jedini je wallet i softver za potpisivanje koji se
            ovdje koristi. Hardware walleti, BIP39, Sparrow i Electrum spominju
            se samo ondje gdje kurikulum objašnjava zašto nisu dio produkcijskog
            stacka. Za značajnu dugoročnu štednju preporučena arhitektura
            uključuje generički hardware s čistim namjenskim Linuxom, vlastiti
            Bitcoin Core node, odvojeni offline Bitcoin Core signer, PSBT,
            enkriptirane wallet backupove, snažan odvojeno spremljen passphrase
            i testirani recovery postupak.
          </p>
        </div>
      </section>

      <TutorialMetadata
        className="mx-auto my-8 max-w-[1520px]"
        language="hr"
        goal="Izgraditi cjelovit i ponovljiv Bitcoin Core self-custody postupak, od provjere i izrade walleta do PSBT potpisivanja i oporavka."
        difficulty="Od početne do napredne razine"
        estimatedTime="Vlastitim tempom; približno 8–12 sati za objavljeni glavni put"
        realBitcoin="Ne u prvim vježbama; prije mainnet postupka koristi se Signet"
        softwareVersion={`Living curriculum v${CURRICULUM_VERSION}; ${CORE_REFERENCE_VERSION}`}
        operatingSystems="macOS, Linux i Windows; Linux primjeri koriste Fedoru gdje je praktično"
        recommendedOs="Čisto namjensko Linux računalo koje ostaje offline za generiranje ključeva i potpisivanje kada štitiš značajnu štednju"
        prerequisites="Osnovno snalaženje s datotekama i terminalom; prethodno iskustvo s Bitcoin Coreom nije potrebno"
        outcome="Možeš objasniti, sigurnosno kopirati, obnoviti, provjeriti i održavati odvojeni online node i offline signer postupak."
        lastReviewed={formatReviewDate(LAST_TECHNICAL_REVIEW)}
      />

      <section className="course-safety" aria-label="Sigurnosno pravilo">
        <KeyRound aria-hidden="true" />
        <div>
          <strong>Ova stranica nikada ne traži tvoje tajne.</strong>
          <p>
            Ne upisuj stvarne privatne ključeve, seed riječi, passphrase ili
            xpriv. Početne operativne vježbe namjerno se rade na Signetu, bez
            stvarnog novca.
          </p>
        </div>
      </section>

      <section
        className="course-stage-map"
        aria-labelledby="course-stages-title"
      >
        <div className="course-section-heading">
          <span>Put bez prečaca</span>
          <h2 id="course-stages-title">Tri etape do prvog stvarnog setupa</h2>
          <p>
            Najprije razumiješ sustav, zatim cijeli recovery ciklus vježbaš bez
            stvarnog novca, a tek onda biraš i testiraš mainnet arhitekturu.
          </p>
        </div>
        <ol>
          <li>
            <span>01</span>
            <div>
              <strong>Razumij</strong>
              <p>
                Threat model, Bitcoin Core i vlastita provjera bez mitologije.
              </p>
            </div>
          </li>
          <li>
            <span>02</span>
            <div>
              <strong>Vježbaj</strong>
              <p>
                Create → encrypt → novi backup → transact → restore → transact
                again na Signetu.
              </p>
            </div>
          </li>
          <li>
            <span>03</span>
            <div>
              <strong>Primijeni</strong>
              <p>
                Odaberi između dviju Bitcoin Core arhitektura. Za značajnu
                štednju koristi odvojeni online node i offline signer, pa
                testiraj cijeli recovery postupak.
              </p>
            </div>
          </li>
        </ol>
      </section>

      <section
        className="course-roadmap"
        aria-labelledby="course-roadmap-title"
      >
        <div className="course-section-heading">
          <span>Detaljni plan</span>
          <h2 id="course-roadmap-title">Cijeli roadmap kad ti zatreba</h2>
          <p>
            Statusi opisuju što je trenutno dostupno, što je u tehničkoj
            provjeri i što je još planirano.
          </p>
        </div>
        <button
          type="button"
          className="course-roadmap-toggle"
          aria-expanded={roadmapOpen}
          aria-controls="course-full-roadmap"
          onClick={() => setRoadmapOpen((current) => !current)}
        >
          {roadmapOpen ? "Sakrij cijeli roadmap" : "Pogledaj cijeli roadmap"}
          <ChevronRight aria-hidden="true" />
        </button>
        <div id="course-full-roadmap" hidden={!roadmapOpen}>
          <ol className="course-roadmap__grid">
            {curriculumPhases.map((phase, index) => (
              <li key={phase.id}>
                <button type="button" onClick={() => onSelectPhase(phase)}>
                  <span className="course-roadmap__number">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="course-roadmap__copy">
                    <span className="course-roadmap__meta">
                      <PhaseAvailability phase={phase} />
                      <small>{phase.estimatedTime}</small>
                    </span>
                    <strong>{phase.title}</strong>
                    <p>{phase.summary}</p>
                    <span className="course-roadmap__outcome">
                      Ishod: {phase.outcome}
                    </span>
                  </span>
                  <ArrowRight aria-hidden="true" />
                </button>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section
        className="course-principles"
        aria-labelledby="course-principles-title"
      >
        <div>
          <span>Četiri pravila za cijeli put</span>
          <h2 id="course-principles-title">Sigurnost je cijeli sustav.</h2>
        </div>
        <ul>
          <li>
            Ne dodaj složenost prije nego što razumiješ jednostavniji sustav.
          </li>
          <li>Backup nije backup dok recovery nije testiran.</li>
          <li>
            Privatni ključ ne mora biti online da bi Bitcoin bio upotrebljiv.
          </li>
          <li>Kriptografija ne može popraviti nejasnu operativnu proceduru.</li>
        </ul>
      </section>
    </>
  )
}

function LessonArticle({
  lesson,
  phase,
  lessonNumber,
  completed,
  copiedId,
  checklistItems,
  setChecklistItems,
  onCopyCode,
  onCopyLink,
  copiedLink,
  onToggleComplete,
}: {
  lesson: PlayerLesson
  phase: CurriculumPhase
  lessonNumber: string
  completed: boolean
  copiedId: string | null
  checklistItems: Set<string>
  setChecklistItems: Dispatch<SetStateAction<Set<string>>>
  onCopyCode: (block: CurriculumCodeBlock) => void
  onCopyLink: () => void
  copiedLink: boolean
  onToggleComplete: () => void
}) {
  const isCompletable = isAvailableLesson(lesson)
  const showConsultingBridge = [
    "mainnet-readiness-prije-prvog-deposita",
    "prvi-mali-mainnet-test",
  ].includes(lesson.slug)

  return (
    <article className="course-lesson" aria-labelledby="lesson-title">
      <header className="course-lesson__header">
        <div className="course-lesson__kicker">
          <span>Faza {Number(phase.id) + 1}</span>
          <span aria-hidden="true">/</span>
          <span>Lekcija {lessonNumber}</span>
        </div>
        <h1 id="lesson-title">{lesson.title}</h1>
        <p className="course-lesson__objective">{lesson.objective}</p>
        <div className="course-lesson__meta">
          <StatusBadge status={lesson.status} />
          {lesson.optional ? (
            <span className="course-optional-label">Neobavezni deep dive</span>
          ) : null}
          <span>
            <Clock3 aria-hidden="true" /> {lesson.estimatedTime}
          </span>
          <span
            className={`course-verification course-verification--${lesson.verification}`}
          >
            <CheckCircle2 aria-hidden="true" />
            {verificationLabels[lesson.verification]}
          </span>
        </div>
        <dl className="course-lesson__version">
          <div>
            <dt>
              {lesson.verification === "verified"
                ? "Testirano na"
                : "Referentna verzija"}
            </dt>
            <dd>{lesson.referenceVersion}</dd>
          </div>
          <div>
            <dt>Tehnička provjera</dt>
            <dd>
              {lesson.verification === "verified"
                ? formatReviewDate(lesson.lastReviewed)
                : lesson.verification === "planned"
                  ? "Planirano"
                  : "Nije dovršena"}
            </dd>
          </div>
          <div>
            <dt>Porijeklo</dt>
            <dd>{lesson.origin}</dd>
          </div>
        </dl>
      </header>

      <VideoBlock lesson={lesson} />

      {lesson.verification !== "verified" ? (
        <aside className="course-review-state">
          <ShieldAlert aria-hidden="true" />
          <div>
            <strong>
              {lesson.verification === "planned"
                ? "Ova lekcija je planirana."
                : "Ova lekcija još nije operativno objavljena."}
            </strong>
            <p>
              {lesson.reviewNote ??
                "Struktura i izvori postoje, ali postupak treba reproducirati na navedenoj verziji prije objave."}
            </p>
          </div>
        </aside>
      ) : null}

      <section
        className="course-reading"
        aria-labelledby="lesson-explanation-title"
      >
        <div className="course-section-heading course-section-heading--compact">
          <BookOpen aria-hidden="true" />
          <div>
            <span>Razumij</span>
            <h2 id="lesson-explanation-title">Objašnjenje</h2>
          </div>
        </div>
        {(lesson.explanation?.length
          ? lesson.explanation
          : [lesson.summary]
        ).map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}

        {lesson.what || lesson.why || lesson.risk ? (
          <dl className="course-three-questions">
            {lesson.what ? (
              <div>
                <dt>Što radimo?</dt>
                <dd>{lesson.what}</dd>
              </div>
            ) : null}
            {lesson.why ? (
              <div>
                <dt>Zašto?</dt>
                <dd>{lesson.why}</dd>
              </div>
            ) : null}
            {lesson.risk ? (
              <div>
                <dt>Što može poći po zlu?</dt>
                <dd>{lesson.risk}</dd>
              </div>
            ) : null}
          </dl>
        ) : null}
      </section>

      {lesson.walkthrough ? (
        <section
          className="course-walkthrough"
          aria-labelledby="lesson-walkthrough-title"
        >
          <div className="course-section-heading course-section-heading--compact">
            <ArrowRight aria-hidden="true" />
            <div>
              <span>Izvedi</span>
              <h2 id="lesson-walkthrough-title">{lesson.walkthrough.title}</h2>
            </div>
          </div>
          {lesson.walkthrough.intro ? <p>{lesson.walkthrough.intro}</p> : null}
          <ol>
            {lesson.walkthrough.steps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </section>
      ) : null}

      {lesson.callouts?.map((callout) => (
        <Callout key={`${callout.kind}-${callout.title}`} callout={callout} />
      ))}

      {lesson.concepts?.length ? (
        <section
          className="course-concepts"
          aria-labelledby="lesson-concepts-title"
        >
          <div className="course-section-heading course-section-heading--compact">
            <Lightbulb aria-hidden="true" />
            <div>
              <span>Zadrži</span>
              <h2 id="lesson-concepts-title">Ključni pojmovi</h2>
            </div>
          </div>
          <ul>
            {lesson.concepts.map((concept) => (
              <li key={concept}>
                <Check aria-hidden="true" />
                <span>{concept}</span>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {lesson.warnings?.map((warning) => (
        <aside
          className="course-inline-message course-inline-message--warning"
          key={warning}
        >
          <AlertTriangle aria-hidden="true" />
          <p>{warning}</p>
        </aside>
      ))}
      {lesson.notes?.map((note) => (
        <aside className="course-inline-message" key={note}>
          <FileText aria-hidden="true" />
          <p>{note}</p>
        </aside>
      ))}

      {lesson.image ? (
        <figure className="course-lesson-image">
          <img src={lesson.image.src} alt={lesson.image.alt} loading="lazy" />
        </figure>
      ) : null}

      {lesson.codeBlocks?.map((block) => (
        <CodeBlock
          key={block.id}
          block={block}
          copiedId={copiedId}
          onCopy={onCopyCode}
        />
      ))}

      {lesson.technicalDetails ? (
        <details className="course-technical-details">
          <summary>
            <Code2 aria-hidden="true" />
            <span>Tehnički detalji</span>
            <ChevronRight aria-hidden="true" />
          </summary>
          <p>{lesson.technicalDetails}</p>
        </details>
      ) : null}

      <Checklist
        lesson={lesson}
        checkedItems={checklistItems}
        setCheckedItems={setChecklistItems}
      />

      {lesson.sources?.length ? (
        <section
          className="course-sources"
          aria-labelledby="lesson-sources-title"
        >
          <div className="course-section-heading course-section-heading--compact">
            <ExternalLink aria-hidden="true" />
            <div>
              <span>Primarni izvori</span>
              <h2 id="lesson-sources-title">Provjeri sam</h2>
            </div>
          </div>
          <ul>
            {lesson.sources.map((source) => (
              <li key={source.url}>
                <a href={source.url} target="_blank" rel="noreferrer">
                  <span>{source.label}</span>
                  <ExternalLink aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {showConsultingBridge ? (
        <aside className="course-consulting-bridge">
          <div>
            <span>Prije većeg iznosa</span>
            <strong>Želiš još jedan par očiju na svom setupu?</strong>
            <p>
              Individualno savjetovanje može pomoći provjeriti threat model,
              recovery i operativne korake. Nikada ne tražim tvoje privatne
              ključeve, seed riječi ni wallet passphrase.
            </p>
          </div>
          <a
            href="https://bitcoin-savjetovanje.com/"
            target="_blank"
            rel="noreferrer"
          >
            Provjeri odgovara li ti savjetovanje
            <ExternalLink aria-hidden="true" />
          </a>
        </aside>
      ) : null}

      <footer className="course-lesson__completion">
        <div>
          <strong>
            {isCompletable
              ? "Jesi li završio ovu lekciju?"
              : "Lekcija nije dostupna za dovršavanje."}
          </strong>
          <p>
            {isCompletable
              ? "Oznaka se sprema lokalno u ovom browseru."
              : "Dovršavanje će biti uključeno nakon tehničke provjere i objave."}
          </p>
        </div>
        <button
          type="button"
          className={completed ? "is-complete" : undefined}
          onClick={onToggleComplete}
          disabled={!isCompletable}
        >
          <CheckCircle2 aria-hidden="true" />
          {completed ? "Dovršeno" : "Označi kao dovršeno"}
        </button>
      </footer>

      <button type="button" className="course-copy-link" onClick={onCopyLink}>
        {copiedLink ? (
          <Check aria-hidden="true" />
        ) : (
          <Link2 aria-hidden="true" />
        )}
        {copiedLink ? "Poveznica kopirana" : "Kopiraj poveznicu na lekciju"}
      </button>
    </article>
  )
}

export function BitcoinCoreCurriculumPage() {
  useCurriculumMetadata()
  const [activeSlug, setActiveSlug] = useState<string | null>(null)
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(
    new Set()
  )
  const [checklistItems, setChecklistItems] = useState<Set<string>>(new Set())
  const [storageReady, setStorageReady] = useState(false)
  const [mobileOutlineOpen, setMobileOutlineOpen] = useState(false)
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [copiedLink, setCopiedLink] = useState(false)
  const [lastAvailableSlug, setLastAvailableSlug] = useState<string | null>(
    null
  )
  const mobileCloseRef = useRef<HTMLButtonElement>(null)

  const activeEntry = useMemo(() => findLessonBySlug(activeSlug), [activeSlug])
  const activeIndex = activeEntry
    ? curriculumLessons.findIndex(
        ({ lesson }) => lesson.id === activeEntry.lesson.id
      )
    : -1
  const previousEntry =
    activeIndex > 0
      ? ([...primaryCurriculumLessons]
          .reverse()
          .find(
            (entry) =>
              curriculumLessons.findIndex(
                ({ lesson }) => lesson.id === entry.lesson.id
              ) < activeIndex
          ) ?? null)
      : null
  const nextEntry =
    activeIndex >= 0
      ? (primaryCurriculumLessons.find(
          (entry) =>
            curriculumLessons.findIndex(
              ({ lesson }) => lesson.id === entry.lesson.id
            ) > activeIndex
        ) ?? null)
      : null
  const nextEntryIndex = nextEntry
    ? curriculumLessons.findIndex(
        ({ lesson }) => lesson.id === nextEntry.lesson.id
      )
    : curriculumLessons.length
  const skippedEntries =
    activeIndex >= 0
      ? curriculumLessons
          .slice(activeIndex + 1, nextEntryIndex)
          .filter(({ lesson }) => lesson.optional || !isAvailableLesson(lesson))
      : []
  const skippedReviewEntry =
    skippedEntries.find(
      ({ lesson }) => !lesson.optional && !isAvailableLesson(lesson)
    ) ?? null
  const skippedOptionalEntry =
    skippedEntries.find(({ lesson }) => lesson.optional) ?? null
  const continueEntry = useMemo<CurriculumEntry | null>(() => {
    const storedIndex = primaryCurriculumLessons.findIndex(
      ({ lesson }) => lesson.slug === lastAvailableSlug
    )

    if (storedIndex >= 0) {
      const stored = primaryCurriculumLessons[storedIndex]
      if (stored && !completedLessons.has(stored.lesson.id)) return stored

      const laterIncomplete = primaryCurriculumLessons
        .slice(storedIndex + 1)
        .find(({ lesson }) => !completedLessons.has(lesson.id))
      if (laterIncomplete) return laterIncomplete
    }

    return (
      primaryCurriculumLessons.find(
        ({ lesson }) => !completedLessons.has(lesson.id)
      ) ??
      primaryCurriculumLessons.at(-1) ??
      null
    )
  }, [completedLessons, lastAvailableSlug])
  const hasLearningHistory =
    Boolean(lastAvailableSlug) || completedLessons.size > 0

  useEffect(() => {
    const storageTimer = window.setTimeout(() => {
      setCompletedLessons(readStoredSet(PROGRESS_STORAGE_KEY))
      setChecklistItems(readStoredSet(CHECKLIST_STORAGE_KEY))
      try {
        setLastAvailableSlug(localStorage.getItem(LAST_LESSON_STORAGE_KEY))
      } catch {
        setLastAvailableSlug(null)
      }
      setStorageReady(true)
    }, 0)

    const syncFromUrl = () => setActiveSlug(getHashLessonSlug())
    syncFromUrl()
    window.addEventListener("hashchange", syncFromUrl)
    window.addEventListener("popstate", syncFromUrl)
    return () => {
      window.clearTimeout(storageTimer)
      window.removeEventListener("hashchange", syncFromUrl)
      window.removeEventListener("popstate", syncFromUrl)
    }
  }, [])

  useEffect(() => {
    if (storageReady) writeStoredSet(PROGRESS_STORAGE_KEY, completedLessons)
  }, [completedLessons, storageReady])

  useEffect(() => {
    if (storageReady) writeStoredSet(CHECKLIST_STORAGE_KEY, checklistItems)
  }, [checklistItems, storageReady])

  useEffect(() => {
    if (
      !activeEntry ||
      !isAvailableLesson(activeEntry.lesson) ||
      activeEntry.lesson.optional
    )
      return
    const rememberTimer = window.setTimeout(() => {
      try {
        localStorage.setItem(LAST_LESSON_STORAGE_KEY, activeEntry.lesson.slug)
        setLastAvailableSlug(activeEntry.lesson.slug)
      } catch {
        // Zadnja lekcija nije kritičan podatak.
      }
    }, 0)
    document.title = `${activeEntry.lesson.title} | BTCPAVAO`
    window.scrollTo({ top: 0, behavior: "auto" })
    return () => window.clearTimeout(rememberTimer)
  }, [activeEntry])

  useEffect(() => {
    if (!mobileOutlineOpen) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    const focusTimer = window.setTimeout(
      () => mobileCloseRef.current?.focus(),
      280
    )
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMobileOutlineOpen(false)
    }
    window.addEventListener("keydown", closeOnEscape)
    return () => {
      window.clearTimeout(focusTimer)
      document.body.style.overflow = previousOverflow
      window.removeEventListener("keydown", closeOnEscape)
    }
  }, [mobileOutlineOpen])

  function openLesson(lesson: PlayerLesson, replace = false) {
    const url = `${window.location.pathname}${window.location.search}#lesson/${encodeURIComponent(lesson.slug)}`
    window.history[replace ? "replaceState" : "pushState"]({}, "", url)
    setActiveSlug(lesson.slug)
    setMobileOutlineOpen(false)
  }

  function showOverview() {
    window.history.pushState(
      {},
      "",
      `${window.location.pathname}${window.location.search}`
    )
    setActiveSlug(null)
    setMobileOutlineOpen(false)
    document.title = "Praktičan Bitcoin self-custody uz Bitcoin Core | BTCPAVAO"
    window.scrollTo({ top: 0, behavior: "auto" })
  }

  function continueLearning() {
    if (continueEntry) openLesson(continueEntry.lesson)
  }

  async function copyCode(block: CurriculumCodeBlock) {
    try {
      await navigator.clipboard.writeText(block.code)
      setCopiedId(block.id)
      window.setTimeout(() => setCopiedId(null), 1800)
    } catch {
      setCopiedId(null)
    }
  }

  async function copyLessonLink() {
    try {
      await navigator.clipboard.writeText(window.location.href)
      setCopiedLink(true)
      window.setTimeout(() => setCopiedLink(false), 1800)
    } catch {
      setCopiedLink(false)
    }
  }

  function resetProgress() {
    if (
      !window.confirm("Resetirati spremljeni napredak i praktične checkliste?")
    )
      return
    setCompletedLessons(new Set())
    setChecklistItems(new Set())
    setLastAvailableSlug(null)
    try {
      localStorage.removeItem(LAST_LESSON_STORAGE_KEY)
    } catch {
      // Reset je svejedno dovršen u trenutnoj sesiji.
    }
  }

  const activeLesson = activeEntry?.lesson

  return (
    <div className="curriculum-page course-page min-h-screen bg-background text-foreground">
      <a className="skip-link" href="#curriculum-content">
        Preskoči na sadržaj
      </a>
      <SiteHeader />

      <div className="curriculum-header curriculum-header--course">
        <div>
          <button
            type="button"
            className="course-header-title"
            onClick={showOverview}
          >
            Bitcoin self-custody
          </button>
          <div className="curriculum-header__actions">
            <a href={BITCOIN_CORE_SERIES_PATH} className="curriculum-back-link">
              <ArrowLeft aria-hidden="true" />
              <span>Svi Bitcoin Core tekstovi</span>
            </a>
          </div>
        </div>
      </div>

      <main id="curriculum-content">
        {activeEntry && activeLesson ? (
          <div className="course-player">
            <aside className="course-player__sidebar">
              <PhaseNavigator
                activeLesson={activeLesson}
                completedLessons={completedLessons}
                onSelectLesson={openLesson}
                onOverview={showOverview}
              />
            </aside>

            <div className="course-player__main">
              <button
                type="button"
                className="course-mobile-outline-trigger"
                onClick={() => setMobileOutlineOpen(true)}
                aria-expanded={mobileOutlineOpen}
              >
                <Menu aria-hidden="true" />
                <span>Faze i lekcije</span>
                <small>{activeEntry.lessonNumber}</small>
              </button>

              <LessonArticle
                lesson={activeLesson}
                phase={activeEntry.phase}
                lessonNumber={activeEntry.lessonNumber}
                completed={completedLessons.has(activeLesson.id)}
                copiedId={copiedId}
                checklistItems={checklistItems}
                setChecklistItems={setChecklistItems}
                onCopyCode={copyCode}
                onCopyLink={copyLessonLink}
                copiedLink={copiedLink}
                onToggleComplete={() =>
                  setCompletedLessons((current) => {
                    const next = new Set(current)
                    if (next.has(activeLesson.id)) next.delete(activeLesson.id)
                    else next.add(activeLesson.id)
                    return next
                  })
                }
              />

              {skippedReviewEntry || skippedOptionalEntry ? (
                <aside className="course-next-notice">
                  <ShieldAlert aria-hidden="true" />
                  <div>
                    <strong>
                      {skippedReviewEntry
                        ? `Lekcija „${skippedReviewEntry.lesson.title}” još je u tehničkoj provjeri.`
                        : "Sljedeći deep dive je neobavezan."}
                    </strong>
                    <p>
                      {skippedReviewEntry
                        ? "Otvori je ručno iz pregleda faze ako želiš vidjeti što dolazi. Gumb ispod nudi drugu objavljenu i provjerenu lekciju, a ne nepotvrđeni placeholder."
                        : "Možeš ga otvoriti ručno iz pregleda faze; ne blokira glavni put."}
                    </p>
                  </div>
                </aside>
              ) : null}

              <nav
                className="course-prev-next"
                aria-label="Prethodna i sljedeća lekcija"
              >
                {previousEntry ? (
                  <button
                    type="button"
                    onClick={() => openLesson(previousEntry.lesson)}
                  >
                    <ArrowLeft aria-hidden="true" />
                    <span>
                      <small>Prethodna na glavnom putu</small>
                      <strong>{previousEntry.lesson.title}</strong>
                    </span>
                  </button>
                ) : (
                  <span />
                )}
                {nextEntry ? (
                  <button
                    type="button"
                    onClick={() => openLesson(nextEntry.lesson)}
                  >
                    <span>
                      <small>
                        {skippedReviewEntry
                          ? "Druga provjerena lekcija"
                          : "Nastavi glavnim putem"}
                      </small>
                      <strong>{nextEntry.lesson.title}</strong>
                    </span>
                    <ArrowRight aria-hidden="true" />
                  </button>
                ) : null}
              </nav>
            </div>

            <button
              type="button"
              className={`course-drawer-backdrop ${mobileOutlineOpen ? "is-open" : ""}`}
              onClick={() => setMobileOutlineOpen(false)}
              aria-label="Zatvori navigaciju"
              tabIndex={mobileOutlineOpen ? 0 : -1}
            />
            <aside
              className={`course-drawer ${mobileOutlineOpen ? "is-open" : ""}`}
              aria-hidden={!mobileOutlineOpen}
            >
              <div className="course-drawer__header">
                <strong>Faze i lekcije</strong>
                <button
                  ref={mobileCloseRef}
                  type="button"
                  onClick={() => setMobileOutlineOpen(false)}
                  aria-label="Zatvori navigaciju"
                >
                  <X aria-hidden="true" />
                </button>
              </div>
              <PhaseNavigator
                activeLesson={activeLesson}
                completedLessons={completedLessons}
                onSelectLesson={openLesson}
                onOverview={showOverview}
                mobile
              />
            </aside>
          </div>
        ) : (
          <CourseLanding
            completedLessons={completedLessons}
            onStart={() => {
              const first = primaryCurriculumLessons[0]
              if (first) openLesson(first.lesson)
            }}
            onContinue={continueLearning}
            continueEntry={continueEntry}
            returning={hasLearningHistory}
            onSelectPhase={(phase) => {
              const first =
                phase.lessons.find(
                  (lesson) => isAvailableLesson(lesson) && !lesson.optional
                ) ?? phase.lessons[0]
              if (first) openLesson(first)
            }}
            onReset={resetProgress}
          />
        )}
      </main>

      <footer className="curriculum-footer course-footer">
        <p>
          Edukativni sadržaj za testno i postupno učenje. Nije financijski,
          pravni ni porezni savjet.
        </p>
        <a href={BITCOIN_CORE_SERIES_PATH}>Bitcoin Core na btcpavao.com</a>
      </footer>
    </div>
  )
}
