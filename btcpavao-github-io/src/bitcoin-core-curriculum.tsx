import {
  useEffect,
  useMemo,
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
  ChevronDown,
  Clipboard,
  Clock3,
  Code2,
  ExternalLink,
  FileText,
  Filter,
  KeyRound,
  Menu,
  MonitorUp,
  MoonStar,
  Network,
  Play,
  RefreshCcw,
  Search,
  ShieldAlert,
  SunMedium,
  Terminal,
  Unplug,
  X,
} from "lucide-react"

import { useTheme } from "@/components/theme-provider"
import { Button } from "@/components/ui/button"
import {
  curriculumModules,
  roadmapStages,
  type CurriculumCodeBlock,
  type CurriculumLesson,
  type CurriculumLevel,
  type CurriculumModule,
  type CurriculumStatus,
} from "@/bitcoin-core-curriculum-data"
import {
  BITCOIN_CORE_CURRICULUM_PATH,
  BITCOIN_CORE_SERIES_PATH,
} from "@/routes"

const SITE_URL = "https://btcpavao.com"
const PROGRESS_STORAGE_KEY = "btcpavao-core-curriculum-progress-v1"
const CHECKLIST_STORAGE_KEY = "btcpavao-core-curriculum-checklists-v1"

const statusLabels: Record<CurriculumStatus, string> = {
  published: "Objavljeno",
  "in-progress": "U izradi",
  planned: "Planirano",
}

const levelLabels: Record<CurriculumLevel, string> = {
  beginner: "Beginner",
  intermediate: "Intermediate",
  advanced: "Advanced",
}

const levelOptions: Array<{
  value: "all" | CurriculumLevel
  label: string
}> = [
  { value: "all", label: "Sve razine" },
  { value: "beginner", label: "Beginner" },
  { value: "intermediate", label: "Intermediate" },
  { value: "advanced", label: "Advanced" },
]

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
    const title = "Bitcoin Core — od prvog walleta do naprednog self-custodyja"
    const description =
      "Interaktivni i kontinuirano nadogradivi Bitcoin Core kurikulum: threat model, wallet, backup, recovery, offline signing, PSBT, multisig i napredne politike."
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
    // Progress still works for the current session if storage is unavailable.
  }
}

function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const isDark = theme === "dark"

  return (
    <button
      type="button"
      className="curriculum-icon-button"
      aria-label={isDark ? "Uključi svijetlu temu" : "Uključi tamnu temu"}
      onClick={() =>
        setTheme(
          document.documentElement.classList.contains("dark") ? "light" : "dark"
        )
      }
    >
      <span
        className={`curriculum-icon-swap ${isDark ? "curriculum-icon-swap--visible" : ""}`}
      >
        <SunMedium aria-hidden="true" />
      </span>
      <span
        className={`curriculum-icon-swap ${!isDark ? "curriculum-icon-swap--visible" : ""}`}
      >
        <MoonStar aria-hidden="true" />
      </span>
    </button>
  )
}

function StatusBadge({ status }: { status: CurriculumStatus }) {
  return (
    <span className={`curriculum-status curriculum-status--${status}`}>
      <span aria-hidden="true" />
      {statusLabels[status]}
    </span>
  )
}

function VideoBlock({ url }: { url?: string | null }) {
  if (url) {
    return (
      <div className="curriculum-video curriculum-video--embed">
        <iframe
          src={url}
          title="Video lekcija"
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    )
  }

  return (
    <div className="curriculum-video" aria-label="Video uskoro">
      <span className="curriculum-video__icon">
        <Play aria-hidden="true" />
      </span>
      <span>
        <strong>Video uskoro</strong>
        <small>Komponenta je spremna za dodavanje video URL-a.</small>
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
    <section className="curriculum-code" aria-labelledby={`code-${block.id}`}>
      <div className="curriculum-code__header">
        <div>
          <span className="curriculum-code__label">
            <Terminal aria-hidden="true" /> RPC / CLI
          </span>
          <h5 id={`code-${block.id}`}>{block.title}</h5>
        </div>
        <button
          type="button"
          className="curriculum-copy-button"
          onClick={() => onCopy(block)}
          aria-label={`Kopiraj naredbu: ${block.title}`}
        >
          <span
            className={`curriculum-copy-icon ${copied ? "curriculum-copy-icon--visible" : ""}`}
          >
            <Check aria-hidden="true" />
          </span>
          <span
            className={`curriculum-copy-icon ${!copied ? "curriculum-copy-icon--visible" : ""}`}
          >
            <Clipboard aria-hidden="true" />
          </span>
          <span>{copied ? "Kopirano" : "Kopiraj"}</span>
        </button>
      </div>
      <pre>
        <code>{block.code}</code>
      </pre>
      <p>{block.explanation}</p>
      {block.parameters?.length ? (
        <dl className="curriculum-parameters">
          {block.parameters.map((parameter) => (
            <div key={parameter.name}>
              <dt>{parameter.name}</dt>
              <dd>{parameter.explanation}</dd>
            </div>
          ))}
        </dl>
      ) : null}
      {block.warning ? (
        <div className="curriculum-inline-warning">
          <AlertTriangle aria-hidden="true" />
          <p>{block.warning}</p>
        </div>
      ) : null}
    </section>
  )
}

function Checklist({
  title,
  items,
  scope,
  checkedItems,
  setCheckedItems,
}: {
  title: string
  items: string[]
  scope: string
  checkedItems: Set<string>
  setCheckedItems: Dispatch<SetStateAction<Set<string>>>
}) {
  if (!items.length) return null

  return (
    <section
      className="curriculum-checklist"
      aria-labelledby={`${scope}-title`}
    >
      <div className="curriculum-checklist__heading">
        <CheckCircle2 aria-hidden="true" />
        <h4 id={`${scope}-title`}>{title}</h4>
      </div>
      <div className="curriculum-checklist__items">
        {items.map((item, index) => {
          const key = `${scope}:${index}`
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
              <span className="curriculum-checkbox" aria-hidden="true">
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

function ArchitectureDiagram({ moduleId }: { moduleId: string }) {
  if (moduleId === "2") {
    return (
      <figure className="curriculum-architecture">
        <figcaption>Arhitektura koju ćemo graditi</figcaption>
        <div className="curriculum-architecture__node">
          <span className="curriculum-architecture__icon">
            <Network aria-hidden="true" />
          </span>
          <div>
            <strong>Online node</strong>
            <span>Blockchain · UTXO · provjera · broadcast</span>
          </div>
        </div>
        <div className="curriculum-architecture__bridge">
          <span>PSBT</span>
          <ArrowRight aria-hidden="true" />
        </div>
        <div className="curriculum-architecture__node curriculum-architecture__node--offline">
          <span className="curriculum-architecture__icon">
            <Unplug aria-hidden="true" />
          </span>
          <div>
            <strong>Offline signer</strong>
            <span>Privatni ključevi · pregled · signing · bez mreže</span>
          </div>
        </div>
      </figure>
    )
  }

  if (moduleId === "7") {
    return (
      <figure className="curriculum-address-map">
        <figcaption>
          Vizualni orijentir — prefiks nije potpuna provjera
        </figcaption>
        {[
          ["Legacy", "1…"],
          ["Nested SegWit", "3…"],
          ["Native SegWit", "bc1q…"],
          ["Taproot", "bc1p…"],
        ].map(([label, prefix]) => (
          <div key={label}>
            <span>{label}</span>
            <code>{prefix}</code>
          </div>
        ))}
      </figure>
    )
  }

  if (moduleId === "9") {
    return (
      <figure className="curriculum-psbt-flow">
        <figcaption>PSBT tok — privatni ključ ostaje offline</figcaption>
        <div>
          <span>1</span>
          <strong>Online Core</strong>
          <small>Kreiraj unsigned PSBT</small>
        </div>
        <ArrowRight aria-hidden="true" />
        <div>
          <span>2</span>
          <strong>Offline Core</strong>
          <small>Pregledaj i potpiši</small>
        </div>
        <ArrowRight aria-hidden="true" />
        <div>
          <span>3</span>
          <strong>Online Core</strong>
          <small>Finalize · provjera · broadcast</small>
        </div>
      </figure>
    )
  }

  return null
}

function LessonBody({
  lesson,
  copiedId,
  onCopy,
  checklistItems,
  setChecklistItems,
}: {
  lesson: CurriculumLesson
  copiedId: string | null
  onCopy: (block: CurriculumCodeBlock) => void
  checklistItems: Set<string>
  setChecklistItems: Dispatch<SetStateAction<Set<string>>>
}) {
  const hasThreeQuestions = lesson.what || lesson.why || lesson.risk

  return (
    <div className="curriculum-lesson__body">
      {hasThreeQuestions ? (
        <div className="curriculum-three-questions">
          {lesson.what ? (
            <div>
              <span>Što radimo?</span>
              <p>{lesson.what}</p>
            </div>
          ) : null}
          {lesson.why ? (
            <div>
              <span>Zašto?</span>
              <p>{lesson.why}</p>
            </div>
          ) : null}
          {lesson.risk ? (
            <div>
              <span>Što može poći po zlu?</span>
              <p>{lesson.risk}</p>
            </div>
          ) : null}
        </div>
      ) : null}

      {lesson.badges?.length ? (
        <div className="curriculum-badges" aria-label="Oznake lekcije">
          {lesson.badges.map((badge) => (
            <span key={badge}>{badge}</span>
          ))}
        </div>
      ) : null}

      {lesson.concepts?.length ? (
        <ul className="curriculum-concepts">
          {lesson.concepts.map((concept) => (
            <li key={concept}>
              <Check aria-hidden="true" />
              <span>{concept}</span>
            </li>
          ))}
        </ul>
      ) : null}

      {lesson.warnings?.map((warning) => (
        <div className="curriculum-inline-warning" key={warning}>
          <ShieldAlert aria-hidden="true" />
          <p>{warning}</p>
        </div>
      ))}

      {lesson.notes?.map((note) => (
        <aside className="curriculum-note" key={note}>
          <FileText aria-hidden="true" />
          <div>
            <strong>Napomena</strong>
            <p>{note}</p>
          </div>
        </aside>
      ))}

      {lesson.image ? (
        <figure className="curriculum-lesson-image">
          <img src={lesson.image.src} alt={lesson.image.alt} loading="lazy" />
        </figure>
      ) : null}

      {lesson.codeBlocks?.map((block) => (
        <CodeBlock
          key={block.id}
          block={block}
          copiedId={copiedId}
          onCopy={onCopy}
        />
      ))}

      {lesson.technicalDetails ? (
        <details className="curriculum-technical-details">
          <summary>
            <Code2 aria-hidden="true" />
            <span>Tehnički detalji</span>
            <ChevronDown aria-hidden="true" />
          </summary>
          <p>{lesson.technicalDetails}</p>
        </details>
      ) : null}

      {lesson.status === "published" ? (
        <VideoBlock url={lesson.videoUrl} />
      ) : null}

      <Checklist
        title="Praktični zadaci"
        items={lesson.checklist ?? []}
        scope={`lesson-${lesson.id}`}
        checkedItems={checklistItems}
        setCheckedItems={setChecklistItems}
      />

      {lesson.sources?.length ? (
        <section className="curriculum-sources">
          <h5>Primarni izvori</h5>
          <div>
            {lesson.sources.map((source) => (
              <a
                key={source.url}
                href={source.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {source.label}
                <ExternalLink aria-hidden="true" />
              </a>
            ))}
          </div>
        </section>
      ) : null}
    </div>
  )
}

function LessonCard({
  lesson,
  isOpen,
  onToggle,
  completed,
  onComplete,
  copiedId,
  onCopy,
  checklistItems,
  setChecklistItems,
}: {
  lesson: CurriculumLesson
  isOpen: boolean
  onToggle: () => void
  completed: boolean
  onComplete: () => void
  copiedId: string | null
  onCopy: (block: CurriculumCodeBlock) => void
  checklistItems: Set<string>
  setChecklistItems: Dispatch<SetStateAction<Set<string>>>
}) {
  const available = lesson.status === "published"
  const hasDetails = Boolean(
    lesson.what ||
    lesson.why ||
    lesson.risk ||
    lesson.concepts?.length ||
    lesson.warnings?.length ||
    lesson.notes?.length ||
    lesson.technicalDetails ||
    lesson.checklist?.length ||
    lesson.codeBlocks?.length ||
    lesson.sources?.length
  )

  return (
    <article
      id={`lesson-${lesson.id}`}
      className={`curriculum-lesson ${completed ? "is-complete" : ""}`}
    >
      <div className="curriculum-lesson__header">
        <button
          type="button"
          className="curriculum-lesson__toggle"
          onClick={onToggle}
          aria-expanded={isOpen}
          disabled={!hasDetails}
        >
          <span className="curriculum-lesson__number">{lesson.id}</span>
          <span>
            <strong>{lesson.title}</strong>
            <small>{lesson.summary}</small>
          </span>
          {hasDetails ? (
            <ChevronDown
              className={isOpen ? "is-open" : undefined}
              aria-hidden="true"
            />
          ) : null}
        </button>

        <label
          className={`curriculum-lesson__completion ${!available ? "is-disabled" : ""}`}
        >
          <input
            type="checkbox"
            checked={completed}
            onChange={onComplete}
            disabled={!available}
          />
          <span className="curriculum-checkbox" aria-hidden="true">
            <Check />
          </span>
          <span>
            {available
              ? "Završio sam ovaj korak"
              : "Lekcija još nije objavljena"}
          </span>
        </label>
      </div>

      {isOpen && hasDetails ? (
        <LessonBody
          lesson={lesson}
          copiedId={copiedId}
          onCopy={onCopy}
          checklistItems={checklistItems}
          setChecklistItems={setChecklistItems}
        />
      ) : null}
    </article>
  )
}

function ModuleCard({
  module,
  isOpen,
  onToggle,
  openLessons,
  setOpenLessons,
  completedLessons,
  setCompletedLessons,
  copiedId,
  onCopy,
  checklistItems,
  setChecklistItems,
}: {
  module: CurriculumModule
  isOpen: boolean
  onToggle: () => void
  openLessons: Set<string>
  setOpenLessons: Dispatch<SetStateAction<Set<string>>>
  completedLessons: Set<string>
  setCompletedLessons: Dispatch<SetStateAction<Set<string>>>
  copiedId: string | null
  onCopy: (block: CurriculumCodeBlock) => void
  checklistItems: Set<string>
  setChecklistItems: Dispatch<SetStateAction<Set<string>>>
}) {
  const publishedLessons = module.lessons.filter(
    (lesson) => lesson.status === "published"
  )
  const completedCount = publishedLessons.filter((lesson) =>
    completedLessons.has(lesson.id)
  ).length
  const moduleComplete =
    publishedLessons.length > 0 && completedCount === publishedLessons.length

  return (
    <section
      id={`module-${module.id}`}
      className={`curriculum-module ${isOpen ? "is-open" : ""}`}
    >
      <button
        type="button"
        className="curriculum-module__toggle"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={`module-${module.id}-content`}
      >
        <span className="curriculum-module__index">
          <small>Modul</small>
          {module.id.padStart(2, "0")}
        </span>
        <span className="curriculum-module__title">
          <span className="curriculum-module__meta">
            <StatusBadge status={module.status} />
            <span>{levelLabels[module.level]}</span>
            <span>
              <Clock3 aria-hidden="true" /> {module.estimatedTime}
            </span>
          </span>
          <strong>{module.title}</strong>
          <small>{module.subtitle}</small>
        </span>
        <span className="curriculum-module__right">
          {moduleComplete ? (
            <span className="curriculum-module__complete">
              Modul završen <Check aria-hidden="true" />
            </span>
          ) : publishedLessons.length ? (
            <span className="curriculum-module__count">
              {completedCount} / {publishedLessons.length}
            </span>
          ) : null}
          <ChevronDown aria-hidden="true" />
        </span>
      </button>

      {isOpen ? (
        <div
          id={`module-${module.id}-content`}
          className="curriculum-module__body"
        >
          <div className="curriculum-module__overview">
            <div>
              <span>Preduvjeti</span>
              <p>{module.prerequisites.join(" · ")}</p>
            </div>
            <div>
              <span>Lekcije</span>
              <p>{module.lessons.length}</p>
            </div>
            <div>
              <span>Procjena</span>
              <p>{module.estimatedTime}</p>
            </div>
          </div>

          {module.status !== "published" ? (
            <div className="curriculum-content-state">
              <MonitorUp aria-hidden="true" />
              <div>
                <strong>
                  {module.status === "planned"
                    ? "Ovaj modul je na roadmapu."
                    : "Sadržaj se gradi i testira."}
                </strong>
                <p>
                  Naslovi pokazuju plan kurikuluma, ali checkboxi lekcija postat
                  će aktivni tek kada je sadržaj objavljen i postupak provjeren.
                </p>
              </div>
            </div>
          ) : null}

          {module.warnings.map((warning) => (
            <div className="curriculum-inline-warning" key={warning}>
              <AlertTriangle aria-hidden="true" />
              <p>{warning}</p>
            </div>
          ))}

          <ArchitectureDiagram moduleId={module.id} />

          <Checklist
            title={
              module.id === "5"
                ? "Moj backup plan"
                : module.id === "6"
                  ? "Godišnji recovery drill"
                  : "Checklist modula"
            }
            items={module.checklist}
            scope={`module-${module.id}`}
            checkedItems={checklistItems}
            setCheckedItems={setChecklistItems}
          />

          <div className="curriculum-lessons">
            {module.lessons.map((lesson) => (
              <LessonCard
                key={lesson.id}
                lesson={lesson}
                isOpen={openLessons.has(lesson.id)}
                onToggle={() =>
                  setOpenLessons((current) => {
                    const next = new Set(current)
                    if (next.has(lesson.id)) next.delete(lesson.id)
                    else next.add(lesson.id)
                    return next
                  })
                }
                completed={completedLessons.has(lesson.id)}
                onComplete={() =>
                  setCompletedLessons((current) => {
                    const next = new Set(current)
                    if (next.has(lesson.id)) next.delete(lesson.id)
                    else next.add(lesson.id)
                    return next
                  })
                }
                copiedId={copiedId}
                onCopy={onCopy}
                checklistItems={checklistItems}
                setChecklistItems={setChecklistItems}
              />
            ))}
          </div>
        </div>
      ) : null}
    </section>
  )
}

function CurriculumNavigator({
  modules,
  completedLessons,
  onSelect,
}: {
  modules: CurriculumModule[]
  completedLessons: Set<string>
  onSelect: (module: CurriculumModule) => void
}) {
  return (
    <nav className="curriculum-navigator" aria-label="Navigator kurikuluma">
      <div className="curriculum-navigator__heading">
        <BookOpen aria-hidden="true" />
        <span>Kurikulum</span>
      </div>
      <ol>
        {modules.map((module) => {
          const available = module.lessons.filter(
            (lesson) => lesson.status === "published"
          )
          const complete =
            available.length > 0 &&
            available.every((lesson) => completedLessons.has(lesson.id))
          return (
            <li key={module.id}>
              <button type="button" onClick={() => onSelect(module)}>
                <span
                  className={`curriculum-navigator__dot curriculum-navigator__dot--${module.status} ${complete ? "is-complete" : ""}`}
                  aria-hidden="true"
                >
                  {complete ? <Check /> : module.id}
                </span>
                <span>
                  <strong>{module.title}</strong>
                  <small>{statusLabels[module.status]}</small>
                </span>
              </button>
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

export function BitcoinCoreCurriculumPage() {
  useCurriculumMetadata()
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(
    () => new Set()
  )
  const [checklistItems, setChecklistItems] = useState<Set<string>>(
    () => new Set()
  )
  const [storageReady, setStorageReady] = useState(false)
  const [openModules, setOpenModules] = useState<Set<string>>(
    () => new Set(["0"])
  )
  const [openLessons, setOpenLessons] = useState<Set<string>>(() => new Set())
  const [query, setQuery] = useState("")
  const [level, setLevel] = useState<"all" | CurriculumLevel>("all")
  const [mobileNavigatorOpen, setMobileNavigatorOpen] = useState(false)
  const [copiedId, setCopiedId] = useState<string | null>(null)

  useEffect(() => {
    let active = true
    queueMicrotask(() => {
      if (!active) return
      setCompletedLessons(readStoredSet(PROGRESS_STORAGE_KEY))
      setChecklistItems(readStoredSet(CHECKLIST_STORAGE_KEY))
      setStorageReady(true)
    })

    return () => {
      active = false
    }
  }, [])

  useEffect(() => {
    if (storageReady) writeStoredSet(PROGRESS_STORAGE_KEY, completedLessons)
  }, [completedLessons, storageReady])

  useEffect(() => {
    if (storageReady) writeStoredSet(CHECKLIST_STORAGE_KEY, checklistItems)
  }, [checklistItems, storageReady])

  const publishedLessons = useMemo(
    () =>
      curriculumModules.flatMap((module) =>
        module.lessons
          .filter((lesson) => lesson.status === "published")
          .map((lesson) => ({ module, lesson }))
      ),
    []
  )

  const completedPublishedCount = publishedLessons.filter(({ lesson }) =>
    completedLessons.has(lesson.id)
  ).length
  const progress = publishedLessons.length
    ? (completedPublishedCount / publishedLessons.length) * 100
    : 0

  const filteredModules = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase("hr")
    return curriculumModules.filter((module) => {
      if (level !== "all" && module.level !== level) return false
      if (!normalizedQuery) return true

      return [
        module.title,
        module.subtitle,
        ...module.lessons.flatMap((lesson) => [lesson.title, lesson.summary]),
      ]
        .join(" ")
        .toLocaleLowerCase("hr")
        .includes(normalizedQuery)
    })
  }, [level, query])

  function scrollToModule(module: CurriculumModule) {
    setOpenModules((current) => new Set(current).add(module.id))
    setMobileNavigatorOpen(false)
    requestAnimationFrame(() => {
      document
        .getElementById(`module-${module.id}`)
        ?.scrollIntoView({ behavior: "smooth", block: "start" })
    })
  }

  function scrollToLesson(module: CurriculumModule, lesson: CurriculumLesson) {
    setOpenModules((current) => new Set(current).add(module.id))
    setOpenLessons((current) => new Set(current).add(lesson.id))
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        document
          .getElementById(`lesson-${lesson.id}`)
          ?.scrollIntoView({ behavior: "smooth", block: "center" })
      })
    })
  }

  function continueLearning() {
    const next =
      publishedLessons.find(({ lesson }) => !completedLessons.has(lesson.id)) ??
      publishedLessons.at(-1)
    if (next) scrollToLesson(next.module, next.lesson)
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

  function resetProgress() {
    const confirmed = window.confirm(
      "Resetirati sav spremljeni napredak i praktične checkliste za ovaj kurikulum?"
    )
    if (!confirmed) return
    setCompletedLessons(new Set())
    setChecklistItems(new Set())
  }

  return (
    <div className="curriculum-page min-h-screen bg-background text-foreground">
      <a className="skip-link" href="#curriculum-content">
        Preskoči na kurikulum
      </a>

      <header className="curriculum-header">
        <div>
          <a href="/" className="curriculum-brand">
            <span aria-hidden="true">B</span>
            <strong>BTCPAVAO</strong>
          </a>
          <span className="curriculum-header__divider" aria-hidden="true" />
          <a
            href={BITCOIN_CORE_SERIES_PATH}
            className="curriculum-section-link"
          >
            Bitcoin Core
          </a>
          <div className="curriculum-header__actions">
            <a href={BITCOIN_CORE_SERIES_PATH} className="curriculum-back-link">
              <ArrowLeft aria-hidden="true" />
              <span>Svi Bitcoin Core tekstovi</span>
            </a>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main id="curriculum-content">
        <section className="curriculum-hero" aria-labelledby="curriculum-title">
          <div className="curriculum-hero__grid">
            <div className="curriculum-hero__copy">
              <div className="curriculum-kicker">
                <span aria-hidden="true" />
                Living curriculum · v1
              </div>
              <h1 id="curriculum-title">
                Bitcoin Core
                <span>od prvog walleta do naprednog self-custodyja</span>
              </h1>
              <p className="curriculum-hero__lede">
                Praktičan vodič za izgradnju Bitcoin sustava koji razumiješ od
                početka do kraja. Počni s threat modelom, dokaži da recovery
                radi i dodaj složenost tek kada za nju postoji stvaran razlog.
              </p>
              <div className="curriculum-hero__actions">
                <Button
                  size="lg"
                  className="curriculum-action curriculum-action--primary min-h-12 rounded-full px-6"
                  onClick={() => {
                    const first = publishedLessons[0]
                    if (first) scrollToLesson(first.module, first.lesson)
                  }}
                >
                  Kreni od početka
                  <ArrowRight aria-hidden="true" />
                </Button>
                <button
                  type="button"
                  className="curriculum-action curriculum-action--secondary"
                  onClick={continueLearning}
                >
                  Nastavi gdje si stao
                  <ArrowRight aria-hidden="true" />
                </button>
              </div>
              <blockquote>
                “Ne dodaj složenost prije nego što razumiješ jednostavniji
                sustav.”
              </blockquote>
            </div>

            <aside
              className="curriculum-progress-card"
              aria-label="Tvoj napredak"
            >
              <div className="curriculum-progress-card__top">
                <span>Tvoj napredak</span>
                <strong aria-live="polite">
                  {completedPublishedCount} / {publishedLessons.length} lekcija
                </strong>
              </div>
              <div
                className="curriculum-progress-track"
                role="progressbar"
                aria-label="Napredak kroz objavljene lekcije"
                aria-valuemin={0}
                aria-valuemax={publishedLessons.length}
                aria-valuenow={completedPublishedCount}
              >
                <span style={{ width: `${progress}%` }} />
              </div>
              <p>
                Napredak se sprema samo u ovom browseru. Planirane lekcije ne
                ulaze u ukupan broj dok ne budu objavljene.
              </p>
              <dl>
                <div>
                  <dt>Objavljeno</dt>
                  <dd>
                    {
                      curriculumModules.filter(
                        (module) => module.status === "published"
                      ).length
                    }{" "}
                    modula
                  </dd>
                </div>
                <div>
                  <dt>Ukupni roadmap</dt>
                  <dd>{curriculumModules.length} modula</dd>
                </div>
              </dl>
              <button type="button" onClick={resetProgress}>
                <RefreshCcw aria-hidden="true" />
                Resetiraj napredak
              </button>
            </aside>
          </div>
        </section>

        <section className="curriculum-safety" aria-label="Sigurnosno pravilo">
          <div>
            <span className="curriculum-safety__icon">
              <KeyRound aria-hidden="true" />
            </span>
            <div>
              <strong>Ova stranica nikada ne traži tvoje tajne.</strong>
              <p>
                Nikada ne unosite stvarne privatne ključeve, seed, wallet
                passphrase, KeePassXC master password ili xpriv na ovu web
                stranicu. Svi primjeri koriste očito testne podatke.
              </p>
            </div>
          </div>
        </section>

        <section className="curriculum-roadmap" aria-labelledby="roadmap-title">
          <div className="curriculum-section-heading">
            <span>Put kroz kurikulum</span>
            <h2 id="roadmap-title">Od mentalnog modela do vlastite politike</h2>
          </div>
          <ol>
            {roadmapStages.map((stage, index) => (
              <li key={stage.label}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{stage.label}</strong>
                <small>Moduli {stage.modules}</small>
                {index < roadmapStages.length - 1 ? (
                  <ArrowRight aria-hidden="true" />
                ) : null}
              </li>
            ))}
          </ol>
        </section>

        <section className="curriculum-controls" aria-label="Pretraga i filtri">
          <label className="curriculum-search">
            <Search aria-hidden="true" />
            <span className="sr-only">Pretraži lekcije</span>
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Pretraži module i lekcije…"
            />
            {query ? (
              <button
                type="button"
                onClick={() => setQuery("")}
                aria-label="Očisti pretragu"
              >
                <X aria-hidden="true" />
              </button>
            ) : null}
          </label>
          <div className="curriculum-filter" role="group" aria-label="Razina">
            <Filter aria-hidden="true" />
            {levelOptions.map((option) => (
              <button
                type="button"
                key={option.value}
                className={level === option.value ? "is-active" : undefined}
                onClick={() => setLevel(option.value)}
                aria-pressed={level === option.value}
              >
                {option.label}
              </button>
            ))}
          </div>
        </section>

        <div className="curriculum-mobile-nav">
          <button
            type="button"
            onClick={() => setMobileNavigatorOpen((open) => !open)}
            aria-expanded={mobileNavigatorOpen}
          >
            <Menu aria-hidden="true" />
            Kurikulum: {filteredModules.length} modula
            <ChevronDown aria-hidden="true" />
          </button>
          {mobileNavigatorOpen ? (
            <CurriculumNavigator
              modules={filteredModules}
              completedLessons={completedLessons}
              onSelect={scrollToModule}
            />
          ) : null}
        </div>

        <div className="curriculum-layout">
          <aside className="curriculum-desktop-nav">
            <CurriculumNavigator
              modules={filteredModules}
              completedLessons={completedLessons}
              onSelect={scrollToModule}
            />
          </aside>

          <div className="curriculum-modules">
            {filteredModules.length ? (
              filteredModules.map((module) => (
                <ModuleCard
                  key={module.id}
                  module={module}
                  isOpen={openModules.has(module.id) || Boolean(query)}
                  onToggle={() =>
                    setOpenModules((current) => {
                      const next = new Set(current)
                      if (next.has(module.id)) next.delete(module.id)
                      else next.add(module.id)
                      return next
                    })
                  }
                  openLessons={openLessons}
                  setOpenLessons={setOpenLessons}
                  completedLessons={completedLessons}
                  setCompletedLessons={setCompletedLessons}
                  copiedId={copiedId}
                  onCopy={copyCode}
                  checklistItems={checklistItems}
                  setChecklistItems={setChecklistItems}
                />
              ))
            ) : (
              <div className="curriculum-empty-state">
                <Search aria-hidden="true" />
                <h2>Nema rezultata za ovu pretragu.</h2>
                <p>Promijeni pojam ili ukloni filter razine.</p>
                <button
                  type="button"
                  onClick={() => {
                    setQuery("")
                    setLevel("all")
                  }}
                >
                  Prikaži sve module
                </button>
              </div>
            )}
          </div>
        </div>

        <section className="curriculum-closing">
          <div>
            <span>Četiri pravila za cijeli put</span>
            <h2>Sigurnost je cijeli sustav.</h2>
          </div>
          <ul>
            <li>
              Ne dodaj složenost prije nego što razumiješ jednostavniji sustav.
            </li>
            <li>Backup nije backup dok recovery nije testiran.</li>
            <li>
              Privatni ključ ne mora biti online da bi Bitcoin bio upotrebljiv.
            </li>
            <li>
              Kriptografija ne može popraviti nejasnu operativnu proceduru.
            </li>
          </ul>
        </section>
      </main>

      <footer className="curriculum-footer">
        <p>
          Edukativni sadržaj za testno i postupno učenje. Nije financijski,
          pravni ni porezni savjet.
        </p>
        <a href={BITCOIN_CORE_SERIES_PATH}>Bitcoin Core na btcpavao.com</a>
      </footer>
    </div>
  )
}
