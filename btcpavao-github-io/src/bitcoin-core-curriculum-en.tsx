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
  ArrowUpDown,
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
  Laptop,
  Menu,
  Play,
  RefreshCcw,
  ShieldAlert,
  Terminal,
  Usb,
  WifiOff,
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
} from "@/bitcoin-core-curriculum-player-en-data"
import { SiteHeader } from "@/components/site-header"
import { TutorialMetadata } from "@/components/tutorial-metadata"
import { ValueForValueRail } from "@/components/value-for-value"
import {
  EN_BITCOIN_CORE_CURRICULUM_PATH,
  EN_BITCOIN_CORE_SERIES_PATH,
} from "@/routes"

const SITE_URL = "https://btcpavao.com"
const PROGRESS_STORAGE_KEY = "btcpavao-core-curriculum-en-progress-v1"
const CHECKLIST_STORAGE_KEY = "btcpavao-core-curriculum-en-checklists-v1"
const LAST_LESSON_STORAGE_KEY =
  "btcpavao-core-curriculum-en-last-available-lesson-v3"

type CurriculumEntry = (typeof curriculumLessons)[number]

const statusLabels: Record<CurriculumStatus, string> = {
  published: "Published",
  "in-progress": "In review",
  planned: "Planned",
}

const verificationLabels = {
  verified: "Verified",
  "review-required": "Review required",
  planned: "Planned",
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
    const title = "Practical Bitcoin Self-Custody with Bitcoin Core | BTC Pavao"
    const description =
      "A long-term Bitcoin Core self-custody guide covering a watch-only online node, a Tails-based offline signer, wallet backup and recovery, PSBTs, and operational security."
    const url = `${SITE_URL}${EN_BITCOIN_CORE_CURRICULUM_PATH}`

    document.documentElement.lang = "en"
    document.title = title
    setMetaContent("name", "description", description)
    setMetaContent("property", "og:type", "website")
    setMetaContent("property", "og:title", title)
    setMetaContent("property", "og:description", description)
    setMetaContent("property", "og:url", url)
    setMetaContent("property", "og:locale", "en_US")
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

    const alternates = [
      { lang: "en", href: url },
      { lang: "hr", href: `${SITE_URL}/hr/bitcoin-core/self-custody/` },
      { lang: "x-default", href: url },
    ]
    alternates.forEach(({ lang, href }) => {
      let alternate = document.head.querySelector<HTMLLinkElement>(
        `link[rel="alternate"][hreflang="${lang}"]`
      )
      if (!alternate) {
        alternate = document.createElement("link")
        alternate.rel = "alternate"
        alternate.hreflang = lang
        document.head.append(alternate)
      }
      alternate.href = href
    })
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
    // Progress remains available for the current session if localStorage is blocked.
  }
}

function getHashLessonSlug() {
  if (typeof window === "undefined") return null
  const match = window.location.hash.match(/^#lesson\/(.+)$/)
  return match ? decodeURIComponent(match[1]) : null
}

function formatReviewDate(date: string | undefined) {
  if (!date) return "Not completed"
  return new Intl.DateTimeFormat("en-US", {
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
        ? `${available} of ${total} available`
        : available > 0
          ? `${available} of ${total} currently available${inReview ? ` · ${inReview} in review` : ""}`
          : inReview
            ? `${inReview} in technical review`
            : "Planned"}
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
    <div className="course-video" aria-label="Video coming soon">
      <span className="course-video__icon">
        <Play aria-hidden="true" />
      </span>
      <span>
        <strong>Video coming soon</strong>
        <small>The written lesson stands on its own.</small>
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
          aria-label={`Copy command: ${block.title}`}
        >
          {copied ? (
            <Check aria-hidden="true" />
          ) : (
            <Clipboard aria-hidden="true" />
          )}
          <span>{copied ? "Copied" : "Copy"}</span>
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
          <span>Apply</span>
          <h2 id="lesson-checklist-title">Practical tasks</h2>
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

function CoreSignerArchitecture({ overview = false }: { overview?: boolean }) {
  return (
    <figure
      className={`course-core-architecture${overview ? " course-core-architecture--overview" : ""}`}
      aria-label="Recommended Bitcoin Core savings architecture"
    >
      <figcaption>
        <span>Core-only savings architecture</span>
        <strong>Online Core verifies and prepares. Offline Core signs.</strong>
      </figcaption>
      <div className="course-core-architecture__role">
        <div className="course-core-architecture__role-heading">
          <Laptop aria-hidden="true" />
          <div>
            <span>Online</span>
            <strong>Bitcoin Core full node</strong>
          </div>
        </div>
        <small>Installed Linux · Fedora is the practical example</small>
        <ul>
          <li>Watch-only savings wallet</li>
          <li>Prepares PSBTs and broadcasts</li>
          <li>No savings-wallet private keys</li>
        </ul>
      </div>
      <div
        className="course-core-architecture__transfer"
        aria-label="PSBT transfer"
      >
        <ArrowUpDown aria-hidden="true" />
        <strong>PSBT</strong>
        <span>
          <Usb aria-hidden="true" /> Controlled removable media
        </span>
      </div>
      <div className="course-core-architecture__role course-core-architecture__role--offline">
        <div className="course-core-architecture__role-heading">
          <WifiOff aria-hidden="true" />
          <div>
            <span>Offline</span>
            <strong>Bitcoin Core signer</strong>
          </div>
        </div>
        <small>Trusted Tails live USB · generic dedicated computer</small>
        <ul>
          <li>Encrypted private-key wallet</li>
          <li>No blockchain and no network</li>
          <li>Reviews and signs PSBTs</li>
        </ul>
      </div>
    </figure>
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
    <nav className="course-outline" aria-label="Curriculum phases and lessons">
      <button
        type="button"
        className="course-outline__overview"
        onClick={onOverview}
        tabIndex={mobile ? 0 : undefined}
      >
        <BookOpen aria-hidden="true" />
        Curriculum overview
      </button>
      <div className="course-outline__progress">
        <span>
          Your progress
          <small>{availableCount} currently available</small>
        </span>
        <strong>{completedCount} completed</strong>
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
                              <small>Optional deep dive</small>
                            ) : !isAvailableLesson(lesson) ? (
                              <small>
                                {lesson.status === "planned"
                                  ? "Planned"
                                  : "In technical review"}
                              </small>
                            ) : null}
                          </span>
                          {completedLessons.has(lesson.id) ? (
                            <Check aria-label="Completed" />
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
            Learn to hold your own bitcoin by understanding the entire system.
          </h1>
          <p className="course-hero__lede">
            A practical path to long-term self-custody with Bitcoin Core.
            Private keys are only the beginning; a dependable setup also
            includes verification, backup, recovery, signing, and a routine you
            can repeat under stress.
          </p>
          <section
            className="course-software-stack"
            aria-labelledby="course-software-stack-title"
          >
            <div className="course-software-stack__intro">
              <strong id="course-software-stack-title">
                Recommended software stack
              </strong>
              <span>Official tools used throughout the curriculum</span>
            </div>
            <ul aria-label="Bitcoin Core, Fedora or Linux, Tails, and KeePassXC">
              <li className="course-software-stack__item--primary">
                <span className="course-software-stack__logo">
                  <img src="/bitcoin-logo.svg" alt="" aria-hidden="true" />
                </span>
                <span className="course-software-stack__label">
                  Bitcoin Core
                </span>
              </li>
              <li>
                <span className="course-software-stack__logo">
                  <img
                    src="/software-stack/tux.svg"
                    alt=""
                    aria-hidden="true"
                  />
                </span>
                <span className="course-software-stack__label">
                  Fedora / Linux
                </span>
              </li>
              <li>
                <span className="course-software-stack__logo">
                  <img
                    src="/software-stack/tails.png"
                    alt=""
                    aria-hidden="true"
                  />
                </span>
                <span className="course-software-stack__label">Tails live</span>
              </li>
              <li>
                <span className="course-software-stack__logo">
                  <img
                    src="/software-stack/keepassxc.svg"
                    alt=""
                    aria-hidden="true"
                  />
                </span>
                <span className="course-software-stack__label">KeePassXC</span>
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
                ? `Continue: ${continueEntry.lesson.title}`
                : "Start with the first step"}
              <ArrowRight aria-hidden="true" />
            </button>
          </div>
          <blockquote>
            Your node matters first and foremost to you: it lets you verify the
            rules, state, and transactions you rely on.
          </blockquote>
        </div>

        <aside
          className="course-progress-card"
          aria-label="Progress and content version"
        >
          <div className="course-progress-card__heading">
            <span>{returning ? "Your next step" : "Living curriculum"}</span>
            <strong aria-live="polite">
              {returning && continueEntry
                ? continueEntry.lesson.title
                : `${completableLessons.length} verified lessons`}
            </strong>
          </div>
          {continueEntry ? (
            <p className="course-progress-card__location">
              Phase {Number(continueEntry.phase.id) + 1} · Lesson{" "}
              {continueEntry.lessonNumber}
            </p>
          ) : null}
          <div
            className="course-progress-track"
            role="progressbar"
            aria-label="Progress through verified and published lessons"
            aria-valuemin={0}
            aria-valuemax={completableLessons.length}
            aria-valuenow={completedCount}
          >
            <span style={{ width: `${progress}%` }} />
          </div>
          <p>
            {completedCount} completed · {completableLessons.length} currently
            available. Progress is stored only in this browser; deep dives and
            lessons under review do not block the main path.
          </p>
          <dl>
            <div>
              <dt>Reference version</dt>
              <dd>{CORE_REFERENCE_VERSION}</dd>
            </div>
            <div>
              <dt>Latest completed technical review</dt>
              <dd>{formatReviewDate(LAST_TECHNICAL_REVIEW)}</dd>
            </div>
            <div>
              <dt>Content</dt>
              <dd>v{CURRICULUM_VERSION}</dd>
            </div>
          </dl>
          {completedCount ? (
            <button type="button" className="course-reset" onClick={onReset}>
              <RefreshCcw aria-hidden="true" />
              Reset progress
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
          <span>Strong recommendation</span>
          <h2 id="course-recommendation-title">
            This is a Bitcoin Core-only self-custody curriculum.
          </h2>
          <p>
            Bitcoin Core is the only wallet and signing software used here.
            Hardware wallets, BIP39, Sparrow, and Electrum appear only where the
            curriculum explains why they are not part of the production stack.
            For meaningful long-term savings, the recommended architecture is an
            online Bitcoin Core full node with a watch-only wallet on normal
            Linux, plus Bitcoin Core in a trusted Tails live environment on a
            generic dedicated offline computer. Private keys remain on the
            offline signer. PSBTs cross the gap on controlled removable media.
          </p>
        </div>
      </section>

      <CoreSignerArchitecture overview />

      <TutorialMetadata
        className="mx-auto my-8 max-w-[1520px]"
        language="en"
        goal="Build a complete, repeatable Bitcoin Core self-custody practice, from verification and wallet creation to PSBT signing and recovery."
        difficulty="Beginner to advanced"
        estimatedTime="Self-paced; approximately 8–12 hours for the published path"
        realBitcoin="No for the first exercises; Signet is used before any mainnet workflow"
        softwareVersion={`Living curriculum v${CURRICULUM_VERSION}; ${CORE_REFERENCE_VERSION}`}
        operatingSystems="Fedora or another appropriately secured Linux installation for the online node; Tails live USB for the offline signer"
        recommendedOs="For meaningful savings: an online Core node on normal Linux plus an offline Core signer booted from trusted Tails media"
        prerequisites="Comfort using files and a terminal; no prior Bitcoin Core experience required"
        outcome="You can explain, back up, restore, verify, and operate a separated online-node and offline-signer workflow."
        lastReviewed={formatReviewDate(LAST_TECHNICAL_REVIEW)}
      />

      <section className="course-safety" aria-label="Security rule">
        <KeyRound aria-hidden="true" />
        <div>
          <strong>This page never asks for your secrets.</strong>
          <p>
            Never enter real private keys, seed words, a passphrase, or an xpriv
            here. The first hands-on exercises use Signet, so no real money is
            at risk.
          </p>
        </div>
      </section>

      <section
        className="course-stage-map"
        aria-labelledby="course-stages-title"
      >
        <div className="course-section-heading">
          <span>A path without shortcuts</span>
          <h2 id="course-stages-title">
            Three stages to your first real setup
          </h2>
          <p>
            First understand the system, then practice the complete recovery
            cycle without real money, and only then choose and test a mainnet
            architecture.
          </p>
        </div>
        <ol>
          <li>
            <span>01</span>
            <div>
              <strong>Understand</strong>
              <p>
                Threat modeling, Bitcoin Core, and independent verification
                without mythology.
              </p>
            </div>
          </li>
          <li>
            <span>02</span>
            <div>
              <strong>Practice</strong>
              <p>
                Create → encrypt → new backup → transact → restore → transact
                again on Signet.
              </p>
            </div>
          </li>
          <li>
            <span>03</span>
            <div>
              <strong>Apply</strong>
              <p>
                Choose between two Bitcoin Core architectures. For meaningful
                savings, use the separated online-node and offline-signer path,
                with Tails as the signer's live operating environment, then test
                the complete recovery routine.
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
          <span>Detailed plan</span>
          <h2 id="course-roadmap-title">
            The complete roadmap, when you need it
          </h2>
          <p>
            Statuses show what is currently available, what is under technical
            review, and what is still planned.
          </p>
        </div>
        <button
          type="button"
          className="course-roadmap-toggle"
          aria-expanded={roadmapOpen}
          aria-controls="course-full-roadmap"
          onClick={() => setRoadmapOpen((current) => !current)}
        >
          {roadmapOpen ? "Hide the full roadmap" : "View the full roadmap"}
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
                      Outcome: {phase.outcome}
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
          <span>Four rules for the whole journey</span>
          <h2 id="course-principles-title">Security is the whole system.</h2>
        </div>
        <ul>
          <li>
            Do not add complexity before you understand the simpler system.
          </li>
          <li>A backup is not a backup until recovery has been tested.</li>
          <li>
            A private key does not need to be online for Bitcoin to be usable.
          </li>
          <li>Cryptography cannot fix an unclear operating procedure.</li>
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
          <span>Phase {Number(phase.id) + 1}</span>
          <span aria-hidden="true">/</span>
          <span>Lesson {lessonNumber}</span>
        </div>
        <h1 id="lesson-title">{lesson.title}</h1>
        <p className="course-lesson__objective">{lesson.objective}</p>
        <div className="course-lesson__meta">
          <StatusBadge status={lesson.status} />
          {lesson.optional ? (
            <span className="course-optional-label">Optional deep dive</span>
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
                ? "Tested on"
                : "Reference version"}
            </dt>
            <dd>{lesson.referenceVersion}</dd>
          </div>
          <div>
            <dt>Technical review</dt>
            <dd>
              {lesson.verification === "verified"
                ? formatReviewDate(lesson.lastReviewed)
                : lesson.verification === "planned"
                  ? "Planned"
                  : "Not completed"}
            </dd>
          </div>
          <div>
            <dt>Provenance</dt>
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
                ? "This lesson is planned."
                : "This lesson is not yet ready for practical use."}
            </strong>
            <p>
              {lesson.reviewNote ??
                "The structure and sources exist, but the procedure must be reproduced on the stated version before publication."}
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
            <span>Understand</span>
            <h2 id="lesson-explanation-title">Explanation</h2>
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
                <dt>What are we doing?</dt>
                <dd>{lesson.what}</dd>
              </div>
            ) : null}
            {lesson.why ? (
              <div>
                <dt>Why?</dt>
                <dd>{lesson.why}</dd>
              </div>
            ) : null}
            {lesson.risk ? (
              <div>
                <dt>What could go wrong?</dt>
                <dd>{lesson.risk}</dd>
              </div>
            ) : null}
          </dl>
        ) : null}
      </section>

      {lesson.id === "2.4" ? <CoreSignerArchitecture /> : null}

      {lesson.walkthrough ? (
        <section
          className="course-walkthrough"
          aria-labelledby="lesson-walkthrough-title"
        >
          <div className="course-section-heading course-section-heading--compact">
            <ArrowRight aria-hidden="true" />
            <div>
              <span>Execute</span>
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
              <span>Remember</span>
              <h2 id="lesson-concepts-title">Key concepts</h2>
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
            <span>Technical details</span>
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
              <span>Primary sources</span>
              <h2 id="lesson-sources-title">Verify it yourself</h2>
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
            <span>Before using a larger amount</span>
            <strong>Would you like another pair of eyes on your setup?</strong>
            <p>
              Individual consulting can help review your threat model, recovery
              plan, and operating procedure. I will never ask for your private
              keys, seed words, or wallet passphrase.
            </p>
          </div>
          <a
            href="https://bitcoin-savjetovanje.com/"
            target="_blank"
            rel="noreferrer"
          >
            See whether consulting is right for you
            <ExternalLink aria-hidden="true" />
          </a>
        </aside>
      ) : null}

      <footer className="course-lesson__completion">
        <div>
          <strong>
            {isCompletable
              ? "Have you completed this lesson?"
              : "This lesson is not available for completion."}
          </strong>
          <p>
            {isCompletable
              ? "Your completion status is stored locally in this browser."
              : "Completion will be enabled after technical review and publication."}
          </p>
        </div>
        <button
          type="button"
          className={completed ? "is-complete" : undefined}
          onClick={onToggleComplete}
          disabled={!isCompletable}
        >
          <CheckCircle2 aria-hidden="true" />
          {completed ? "Completed" : "Mark as completed"}
        </button>
      </footer>

      <button type="button" className="course-copy-link" onClick={onCopyLink}>
        {copiedLink ? (
          <Check aria-hidden="true" />
        ) : (
          <Link2 aria-hidden="true" />
        )}
        {copiedLink ? "Link copied" : "Copy lesson link"}
      </button>
    </article>
  )
}

export function BitcoinCoreCurriculumEnPage() {
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
        // The last lesson is not critical data.
      }
    }, 0)
    document.title = `${activeEntry.lesson.title} | BTC Pavao`
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
    document.title =
      "Practical Bitcoin Self-Custody with Bitcoin Core | BTC Pavao"
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
    if (!window.confirm("Reset saved progress and practical checklists?"))
      return
    setCompletedLessons(new Set())
    setChecklistItems(new Set())
    setLastAvailableSlug(null)
    try {
      localStorage.removeItem(LAST_LESSON_STORAGE_KEY)
    } catch {
      // The reset still applies to the current session.
    }
  }

  const activeLesson = activeEntry?.lesson

  return (
    <div className="curriculum-page course-page course-page--persistent-support min-h-screen bg-background text-foreground">
      <a className="skip-link" href="#curriculum-content">
        Skip to content
      </a>
      <ValueForValueRail language="en" persistent />
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
            <a
              href={EN_BITCOIN_CORE_SERIES_PATH}
              className="curriculum-back-link"
            >
              <ArrowLeft aria-hidden="true" />
              <span>All Bitcoin Core articles</span>
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
                <span>Phases and lessons</span>
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
                        ? `The lesson “${skippedReviewEntry.lesson.title}” is still in technical review.`
                        : "The next deep dive is optional."}
                    </strong>
                    <p>
                      {skippedReviewEntry
                        ? "Open it manually from the phase overview if you want to preview what is coming. The button below takes you to another published and verified lesson, not an unverified placeholder."
                        : "You can open it manually from the phase overview; it does not block the main path."}
                    </p>
                  </div>
                </aside>
              ) : null}

              <nav
                className="course-prev-next"
                aria-label="Previous and next lesson"
              >
                {previousEntry ? (
                  <button
                    type="button"
                    onClick={() => openLesson(previousEntry.lesson)}
                  >
                    <ArrowLeft aria-hidden="true" />
                    <span>
                      <small>Previous on the main path</small>
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
                          ? "Another verified lesson"
                          : "Continue on the main path"}
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
              aria-label="Close navigation"
              tabIndex={mobileOutlineOpen ? 0 : -1}
            />
            <aside
              className={`course-drawer ${mobileOutlineOpen ? "is-open" : ""}`}
              aria-hidden={!mobileOutlineOpen}
            >
              <div className="course-drawer__header">
                <strong>Phases and lessons</strong>
                <button
                  ref={mobileCloseRef}
                  type="button"
                  onClick={() => setMobileOutlineOpen(false)}
                  aria-label="Close navigation"
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
          Educational content for hands-on testing and step-by-step learning.
          This is not financial, legal, or tax advice.
        </p>
        <a href={EN_BITCOIN_CORE_SERIES_PATH}>Bitcoin Core on btcpavao.com</a>
      </footer>
    </div>
  )
}
