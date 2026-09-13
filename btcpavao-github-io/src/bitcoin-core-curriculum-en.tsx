import { CurriculumOverview } from "@/components/curriculum-overview"
import { CurriculumLesson } from "@/components/curriculum-lesson"
import {
  canCompleteLesson,
  effectiveCompletions,
  nextRequiredEntry,
  resumeEntry,
} from "@/curriculum-learning"
import { useEffect, useMemo, useRef, useState } from "react"
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Check,
  ChevronRight,
  Menu,
  PanelLeftClose,
  PanelLeftOpen,
  ShieldAlert,
  X,
} from "lucide-react"

import {
  CORE_REFERENCE_VERSION,
  CURRICULUM_VERSION,
  curriculumLessons,
  curriculumPhases,
  findLessonBySlug,
  isAvailableLesson,
  legacyEnglishLessonSlugAliases,
  primaryCurriculumLessons,
  type CurriculumCodeBlock,
  type PlayerLesson,
} from "@/bitcoin-core-curriculum-player-en-data"
import { SiteHeader } from "@/components/site-header"
import { ValueForValueRail } from "@/components/value-for-value"
import {
  EN_BITCOIN_CORE_CURRICULUM_PATH,
  EN_BITCOIN_CORE_SERIES_PATH,
} from "@/routes"

const SITE_URL = "https://btcpavao.com"
const PROGRESS_STORAGE_KEY = "btcpavao-core-curriculum-en-progress-v1"
const CHECKLIST_STORAGE_KEY = "btcpavao-core-curriculum-en-checklists-v2"
const LAST_LESSON_STORAGE_KEY =
  "btcpavao-core-curriculum-en-last-available-lesson-v3"

type CurriculumEntry = (typeof curriculumLessons)[number]

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
      "Learn Bitcoin Core from the beginning: protect your keys, practise with test coins, back up and recover a wallet, then approve payments on an offline computer."
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

    document.head
      .querySelectorAll(
        'link[rel="alternate"][hreflang="hr"], meta[property="og:locale:alternate"]'
      )
      .forEach((element) => element.remove())
    const alternates = [
      { lang: "en", href: url },
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
    return new Set<string>(
      Array.isArray(stored)
        ? stored.filter((item): item is string => typeof item === "string")
        : []
    )
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
  if (!match) return null
  try {
    const slug = decodeURIComponent(match[1])
    return legacyEnglishLessonSlugAliases[slug] ?? slug
  } catch {
    return null
  }
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
  const [allPhases, setAllPhases] = useState(false)
  const [showOptional, setShowOptional] = useState(false)
  const activePhase = curriculumPhases.find((phase) =>
    phase.lessons.some((lesson) => lesson.id === activeLesson.id)
  )
  const [phaseExpansion, setPhaseExpansion] = useState<{
    lessonId: string
    phaseIds: string[]
  }>({
    lessonId: activeLesson.id,
    phaseIds: activePhase ? [activePhase.id] : [],
  })
  // A new lesson reveals its phase; browsing the outline does not change lessons.
  if (phaseExpansion.lessonId !== activeLesson.id) {
    setPhaseExpansion({
      lessonId: activeLesson.id,
      phaseIds: activePhase ? [activePhase.id] : [],
    })
  }
  const expandedPhaseIds =
    phaseExpansion.lessonId === activeLesson.id
      ? phaseExpansion.phaseIds
      : activePhase
        ? [activePhase.id]
        : []

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
          <small>{availableCount} steps on the main path</small>
        </span>
        <strong>{completedCount} completed</strong>
      </div>
      <button
        type="button"
        className="course-outline__toggle"
        aria-expanded={allPhases}
        onClick={() => setAllPhases(!allPhases)}
      >
        {allPhases ? "Show current phase" : "Show all phases"}
      </button>
      <button
        type="button"
        className="course-outline__toggle"
        aria-expanded={showOptional}
        onClick={() => setShowOptional(!showOptional)}
      >
        {showOptional ? "Hide optional reading" : "Show optional reading"}
      </button>
      <ol className="course-outline__phases">
        {curriculumPhases
          .filter((phase) => allPhases || phase.id === activePhase?.id)
          .map((phase) => {
            const isActive = phase.id === activePhase?.id
            const isExpanded = expandedPhaseIds.includes(phase.id)
            const lessonsId = `${mobile ? "mobile" : "desktop"}-phase-${phase.id}-lessons`
            return (
              <li key={phase.id} className={isActive ? "is-active" : undefined}>
                <button
                  type="button"
                  className="course-outline__phase"
                  onClick={() => {
                    setPhaseExpansion({
                      lessonId: activeLesson.id,
                      phaseIds: isExpanded
                        ? expandedPhaseIds.filter((id) => id !== phase.id)
                        : [...expandedPhaseIds, phase.id],
                    })
                  }}
                  aria-current={isActive ? "step" : undefined}
                  aria-expanded={isExpanded}
                  aria-controls={lessonsId}
                >
                  <span>{String(Number(phase.id) + 1).padStart(2, "0")}</span>
                  <span>
                    <strong>{phase.shortTitle}</strong>
                    <small>{phase.estimatedTime}</small>
                  </span>
                  <ChevronRight aria-hidden="true" />
                </button>
                <ol
                  id={lessonsId}
                  className="course-outline__lessons"
                  hidden={!isExpanded}
                >
                  {phase.lessons.map((lesson, index) => {
                    if (
                      lesson.optional &&
                      !showOptional &&
                      lesson.id !== activeLesson.id
                    )
                      return null
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
                            {Number(phase.id) + 1}.{index + 1}
                          </span>
                          <span className="course-outline__lesson-title">
                            <span>{lesson.title}</span>
                            {lesson.optional ? (
                              <small>Optional deep dive</small>
                            ) : null}
                            {!isAvailableLesson(lesson) ? (
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
              </li>
            )
          })}
      </ol>
    </nav>
  )
}

export function BitcoinCoreCurriculumEnPage() {
  useCurriculumMetadata()
  const [activeSlug, setActiveSlug] = useState<string | null>(null)
  const [completionMarks, setCompletedLessons] = useState<Set<string>>(
    new Set()
  )
  const [checklistItems, setChecklistItems] = useState<Set<string>>(new Set())
  const completedLessons = useMemo(
    () =>
      effectiveCompletions(
        curriculumLessons.map((entry) => entry.lesson),
        completionMarks,
        checklistItems
      ),
    [completionMarks, checklistItems]
  )
  const [storageReady, setStorageReady] = useState(false)
  const [mobileOutlineOpen, setMobileOutlineOpen] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [copiedLink, setCopiedLink] = useState(false)
  const [lastAvailableSlug, setLastAvailableSlug] = useState<string | null>(
    null
  )
  const mobileCloseRef = useRef<HTMLButtonElement>(null)
  const mobileDrawerRef = useRef<HTMLElement>(null)
  const mobileTriggerRef = useRef<HTMLButtonElement>(null)

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
  const nextEntry = nextRequiredEntry(curriculumLessons, activeIndex)
  const continueEntry = useMemo<CurriculumEntry | null>(
    () => resumeEntry(curriculumLessons, completedLessons),
    [completedLessons]
  )
  const hasLearningHistory =
    Boolean(lastAvailableSlug) || completedLessons.size > 0

  useEffect(() => {
    const storageTimer = window.setTimeout(() => {
      setCompletedLessons(readStoredSet(PROGRESS_STORAGE_KEY))
      setChecklistItems(readStoredSet(CHECKLIST_STORAGE_KEY))
      try {
        const storedSlug = localStorage.getItem(LAST_LESSON_STORAGE_KEY)
        setLastAvailableSlug(
          storedSlug
            ? (legacyEnglishLessonSlugAliases[storedSlug] ?? storedSlug)
            : null
        )
      } catch {
        setLastAvailableSlug(null)
      }
      setStorageReady(true)
    }, 0)

    const syncFromUrl = () => {
      const slug = getHashLessonSlug()
      setActiveSlug(slug)
      if (
        slug &&
        window.location.hash !== `#lesson/${encodeURIComponent(slug)}`
      ) {
        window.history.replaceState(
          {},
          "",
          `${window.location.pathname}${window.location.search}#lesson/${encodeURIComponent(slug)}`
        )
      }
    }
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
    if (storageReady) writeStoredSet(PROGRESS_STORAGE_KEY, completionMarks)
  }, [completionMarks, storageReady])

  useEffect(() => {
    if (storageReady) writeStoredSet(CHECKLIST_STORAGE_KEY, checklistItems)
  }, [checklistItems, storageReady])

  useEffect(() => {
    if (!activeEntry) return
    document.title = `${activeEntry.lesson.title} | BTC Pavao`
    document.getElementById("lesson-title")?.focus({ preventScroll: true })
    window.scrollTo({ top: 0, behavior: "auto" })
    if (!isAvailableLesson(activeEntry.lesson) || activeEntry.lesson.optional)
      return
    const rememberTimer = window.setTimeout(() => {
      try {
        localStorage.setItem(LAST_LESSON_STORAGE_KEY, activeEntry.lesson.slug)
        setLastAvailableSlug(activeEntry.lesson.slug)
      } catch {
        // The last lesson is not critical data.
      }
    }, 0)
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
      if (event.key === "Escape") {
        setMobileOutlineOpen(false)
        mobileTriggerRef.current?.focus()
      }
      if (event.key === "Tab") {
        const buttons =
          mobileDrawerRef.current?.querySelectorAll<HTMLButtonElement>(
            "button:not(:disabled)"
          )
        if (!buttons?.length) return
        const first = buttons[0]
        const last = buttons[buttons.length - 1]
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault()
          last.focus()
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault()
          first.focus()
        }
      }
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
    <div
      className={`curriculum-page course-page ${!activeEntry ? "course-page--persistent-support" : ""} min-h-screen bg-background text-foreground`}
    >
      <a className="skip-link" href="#curriculum-content">
        Skip to content
      </a>
      {!activeEntry && <ValueForValueRail language="en" persistent />}
      <SiteHeader />

      <div className="curriculum-header curriculum-header--course">
        <div>
          {activeEntry && (
            <button
              type="button"
              className="course-sidebar-toggle"
              aria-expanded={sidebarOpen}
              aria-controls="course-desktop-outline"
              onClick={() => setSidebarOpen((open) => !open)}
            >
              {sidebarOpen ? (
                <PanelLeftClose aria-hidden="true" />
              ) : (
                <PanelLeftOpen aria-hidden="true" />
              )}
              <span>{sidebarOpen ? "Hide steps" : "Show steps"}</span>
            </button>
          )}
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
          <div
            className={`course-player ${sidebarOpen ? "" : "course-player--sidebar-hidden"}`}
          >
            <aside
              id="course-desktop-outline"
              className="course-player__sidebar"
              hidden={!sidebarOpen}
            >
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
                ref={mobileTriggerRef}
                onClick={() => setMobileOutlineOpen(true)}
                aria-expanded={mobileOutlineOpen}
              >
                <Menu aria-hidden="true" />
                <span>Phases and lessons</span>
                <small>{activeEntry.lessonNumber}</small>
              </button>

              <CurriculumLesson
                key={activeLesson.id}
                language="en"
                completedLessons={completedLessons}
                lessons={curriculumLessons.map((entry) => entry.lesson)}
                onSelectLesson={openLesson}
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
                    else if (
                      canCompleteLesson(
                        activeLesson,
                        checklistItems,
                        completedLessons
                      )
                    )
                      next.add(activeLesson.id)
                    return next
                  })
                }
              />

              {nextEntry && !isAvailableLesson(nextEntry.lesson) ? (
                <aside className="course-next-notice">
                  <ShieldAlert aria-hidden="true" />
                  <div>
                    <strong>
                      The next required exercise is still in review.
                    </strong>
                    <p>
                      The guided path stops here. You can read the draft, but
                      this does not complete its practical requirements.
                    </p>
                    <button
                      type="button"
                      className="course-copy-link"
                      onClick={() => openLesson(nextEntry.lesson)}
                    >
                      Read the draft: {nextEntry.lesson.title}
                    </button>
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
                {nextEntry &&
                isAvailableLesson(nextEntry.lesson) &&
                completedLessons.has(activeLesson.id) ? (
                  <button
                    type="button"
                    onClick={() => openLesson(nextEntry.lesson)}
                  >
                    <span>
                      <small>Continue on the main path</small>
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
              inert={!mobileOutlineOpen}
              ref={mobileDrawerRef}
              role="dialog"
              aria-modal={mobileOutlineOpen || undefined}
              aria-label="Phases and lessons"
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
          <CurriculumOverview
            language="en"
            phases={curriculumPhases}
            entries={curriculumLessons}
            version={CURRICULUM_VERSION}
            referenceVersion={CORE_REFERENCE_VERSION}
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
        </p>
        <a href={EN_BITCOIN_CORE_SERIES_PATH}>Bitcoin Core on btcpavao.com</a>
      </footer>
    </div>
  )
}
