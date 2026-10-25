import { useEffect, useRef, useState } from "react"
import {
  ArrowRight,
  ArrowDown,
  ArrowUpRight,
  Check,
  ChevronDown,
  Copy,
  FileKey2,
  FileText,
  KeyRound,
  Layers,
  MapPin,
  Monitor,
  Plus,
  Minus,
  RotateCcw,
  ShieldCheck,
  Wifi,
  WifiOff,
} from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { DebianImagesNotice } from "@/components/debian-images-notice"
import {
  curriculumPhases,
  curriculumLessons,
  isAvailableLesson,
  findLessonBySlug,
  type PlayerLesson,
} from "@/course-manifest"
import {
  EN_BITCOIN_CORE_CURRICULUM_PATH as COURSE,
  COURSE_LANDING_PATH,
} from "@/routes"
import { SITE_URL } from "@/site-config"
import { courseEvent } from "@/course-events"
import "@/course-landing.css"

const firstLesson = curriculumLessons[0].lesson
const lessonHref = (lesson: PlayerLesson) =>
  `${COURSE}#lesson/${encodeURIComponent(lesson.slug)}`
const FIRST = lessonHref(firstLesson)
const available = curriculumLessons.filter(({ lesson }) =>
  isAvailableLesson(lesson)
)
const phaseImages = [
  "/bitcoin-core-entropija-09.webp",
  "/long-road-bitcoin-core-03.webp",
  "/multisig-not-dollar-amount-cover.webp",
]
const phaseAlt = [
  "A branching blue-and-gold key structure rooted in limestone.",
  "A blue-and-gold computing structure in Mediterranean light.",
  "An architectural illustration of separate signing authorities.",
]

function StartLink({
  children = "Start Learning — Free",
  placement = "body",
  className = "",
}: {
  children?: React.ReactNode
  placement?: string
  className?: string
}) {
  return (
    <a
      href={FIRST}
      className={`cl-button ${className}`}
      onClick={() => courseEvent("start_click", { placement })}
    >
      {children}
      <ArrowRight aria-hidden="true" size={18} />
    </a>
  )
}
function Share({ section, text }: { section: string; text: string }) {
  const [message, setMessage] = useState("")
  const url = `${SITE_URL}${COURSE_LANDING_PATH}#${section}`
  async function copy() {
    try {
      await navigator.clipboard.writeText(url)
      setMessage("Link copied")
      courseEvent("share", { section, method: "copy" })
    } catch {
      setMessage("Please copy the section link below.")
    }
  }
  return (
    <div className="cl-share">
      <span>Share the idea</span>
      <a
        aria-label={`Share ${section} on X`}
        href={`https://x.com/intent/post?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => courseEvent("share", { section, method: "x" })}
      >
        X
      </a>
      <a
        aria-label={`Share ${section} on LinkedIn`}
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        LinkedIn
      </a>
      <a
        aria-label={`Share ${section} on Telegram`}
        href={`https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        Telegram
      </a>
      <button onClick={copy} aria-label={`Copy ${section} link`}>
        <Copy size={15} aria-hidden="true" />
      </button>
      <span role="status">
        {message}
        {message.startsWith("Please") && <a href={url}>Section link</a>}
      </span>
    </div>
  )
}

function GoldAndInformation() {
  const [copies, setCopies] = useState(1)
  return (
    <section id="information" className="cl-section cl-wrap">
      <div className="cl-split cl-intro">
        <h2>
          Gold occupies space.
          <br />
          <em>Information can be copied.</em>
        </h2>
        <div>
          <p>
            A device? A seed phrase? A metal plate? Start with something more
            fundamental: the information that lets you authorize a payment.
          </p>
          <p>
            A wallet backup can be duplicated. Your bitcoin cannot. That
            difference changes how you think about loss and theft.
          </p>
        </div>
      </div>
      <div className="cl-comparison">
        <div className="cl-gold-panel">
          <div className="cl-gold" aria-hidden="true">
            Au<span>999.9</span>
          </div>
          <h3>One gold bar.</h3>
          <p>One physical object. One location at a time.</p>
          <div className="cl-small">
            Copying its photograph creates no more gold.
          </div>
        </div>
        <div className="cl-information-panel">
          <div className="cl-file-copies" aria-hidden="true">
            {Array.from({ length: copies }, (_, i) => (
              <span key={i}>
                <FileText size={25} />
              </span>
            ))}
          </div>
          <h3 aria-live="polite">
            {copies === 1
              ? "One wallet file."
              : `${copies} identical wallet copies.`}
          </h3>
          <p>More recovery copies. The same spending authority.</p>
          <button
            className="cl-control"
            onClick={() => {
              setCopies(copies === 8 ? 1 : Math.min(8, copies * 2))
              courseEvent("demo", { demo: "copy", copies })
            }}
          >
            {copies === 8 ? <RotateCcw size={17} /> : <Copy size={17} />}{" "}
            {copies === 8
              ? "Start with one again"
              : "Duplicate the information"}
          </button>
        </div>
      </div>
      <Share
        section="information"
        text="Gold occupies space. Information can be copied. That changes everything about custody."
      />
    </section>
  )
}

const stages = [
  {
    title: "Begin with one file.",
    description:
      "A wallet file holds the information your software needs. One computer is one point of failure.",
    question: "If this computer disappears, what survives?",
    change: "Starting point: one wallet, one location.",
    action: "Make backup copies",
    copies: 1,
    keys: 0,
  },
  {
    title: "Make a thousand copies.",
    description:
      "Redundancy can protect against loss. But an unprotected copy gives anyone who finds it the same spending authority.",
    question: "If someone finds just one copy, what can they do?",
    change: "Loss protection improves. Theft exposure grows.",
    action: "Encrypt the wallet",
    copies: 6,
    keys: 0,
  },
  {
    title: "Put a secret between them.",
    description:
      "Encryption changes what a discovered backup gives away. Now recovery needs both the file and its passphrase.",
    question: "What happens if you forget the secret?",
    change: "The file is protected. The secret is a new dependency.",
    action: "Back up the secret",
    copies: 6,
    keys: 1,
  },
  {
    title: "Back up the secret, too.",
    description:
      "Redundant passphrase backups protect against forgetting. Storing them beside the encrypted files lets one discovery expose both.",
    question: "Can one lost bag—or one theft—take everything?",
    change: "Both components have backups. Their locations still matter.",
    action: "Separate the components",
    copies: 6,
    keys: 3,
  },
  {
    title: "Design what must come together.",
    description:
      "Separate files and secrets across independent locations. Add encryption layers only when each one addresses a real threat and remains recoverable.",
    question: "Can you still recover after losing an entire location?",
    change: "Redundancy, encryption and separation work together.",
    action: "Replay the reasoning",
    copies: 6,
    keys: 3,
  },
]
function ArchitectureStory() {
  const [stage, setStage] = useState(0)
  const s = stages[stage]
  return (
    <section className="cl-story" id="architecture">
      <div className="cl-wrap cl-section">
        <div className="cl-section-head">
          <h2>
            One file. Five decisions.
            <br />A different way to think.
          </h2>
          <p>
            Security begins with a better question.
            <br />
            Build the reasoning, one decision at a time.
          </p>
        </div>
        <div className="cl-story-layout">
          <div
            className={`cl-story-diagram cl-stage-${stage}`}
            aria-label={s.change}
          >
            <div className="cl-location">
              <span className="cl-location-label">
                <MapPin size={16} />{" "}
                {stage === 4 ? "File locations" : "One location"}
              </span>
              <div className="cl-diagram-files">
                {Array.from({ length: s.copies }, (_, i) => (
                  <div key={i} className="cl-wallet">
                    {stage > 1 ? <FileKey2 /> : <FileText />}
                    <span>{stage > 1 ? "Encrypted" : "wallet.dat"}</span>
                  </div>
                ))}
              </div>
              {stage === 1 && <small>6 shown · imagine 1,000 copies</small>}
            </div>
            {stage > 1 && (
              <div className="cl-secret-location">
                <span className="cl-location-label">
                  <KeyRound size={16} />{" "}
                  {stage === 4
                    ? "Separate secret locations"
                    : "Passphrase backups"}
                </span>
                <div className="cl-diagram-keys">
                  {Array.from({ length: s.keys }, (_, i) => (
                    <span key={i}>
                      <KeyRound />
                      <span>Secret {i + 1}</span>
                    </span>
                  ))}
                </div>
                <small>
                  {stage > 2
                    ? "Copies of the same passphrase"
                    : "A single secret can still be lost"}
                </small>
              </div>
            )}
            <p className="cl-diagram-caption">{s.change}</p>
          </div>
          <div className="cl-story-copy">
            <div className="cl-step-nav" aria-label="Architecture stages">
              {stages.map((item, i) => (
                <button
                  key={item.title}
                  aria-label={`Stage ${i + 1}: ${item.title}`}
                  aria-pressed={stage === i}
                  onClick={() => setStage(i)}
                >
                  {i + 1}
                </button>
              ))}
            </div>
            <div aria-live="polite">
              <p className="cl-small">Decision {stage + 1} of 5</p>
              <h3>{s.title}</h3>
              <p>{s.description}</p>
              <p className="cl-question">{s.question}</p>
            </div>
            <button
              className="cl-button cl-button-light"
              onClick={() => {
                setStage((stage + 1) % 5)
                courseEvent("demo", { demo: "architecture", stage: stage + 1 })
              }}
            >
              {s.action}
              {stage === 4 ? <RotateCcw size={18} /> : <ArrowRight size={18} />}
            </button>
            <a className="cl-story-link" href={FIRST}>
              Learn to design your own custody architecture{" "}
              <ArrowUpRight size={16} />
            </a>
          </div>
        </div>
        <Share
          section="architecture"
          text="A thousand backups can make you safer from loss—and more exposed to theft. Learn why encryption and separation matter."
        />
      </div>
    </section>
  )
}

function EntropyPreview() {
  const [words, setWords] = useState(4)
  const combinations = 7776n ** BigInt(words)
  const exponent = Math.floor(words * Math.log10(7776))
  const mantissa = (7776 ** words / 10 ** exponent).toFixed(2)
  return (
    <article className="cl-entropy" id="entropy">
      <div className="cl-demo-heading">
        <span className="cl-demo-number">01</span>
        <h3>What does one extra word change?</h3>
      </div>
      <p>
        Every independently random word from the original 7,776-word EFF list
        multiplies the search space by <strong>7,776</strong>.
      </p>
      <div className="cl-entropy-readout" aria-live="polite">
        <strong>
          {(words * Math.log2(7776)).toFixed(1)}
          <span> bits</span>
        </strong>
        <span>
          {mantissa} × 10<sup>{exponent}</sup> possible combinations
        </span>
      </div>
      <div className="cl-word-slots" aria-hidden="true">
        {Array.from({ length: 8 }, (_, i) => (
          <span key={i} className={i < words ? "is-active" : ""}>
            {i + 1}
          </span>
        ))}
      </div>
      <div className="cl-growth" key={words}>
        <div className="cl-growth-heading">
          <span>{words - 1} words → {words} words</span>
          <strong>× 7,776</strong>
        </div>
        <div className="cl-growth-row" aria-hidden="true">
          <span>{words - 1} words</span>
          <div className="cl-growth-track"><i className="cl-growth-before" /></div>
        </div>
        <div className="cl-growth-row" aria-hidden="true">
          <span>{words} words</span>
          <div className="cl-growth-track"><i className="cl-growth-after" /></div>
        </div>
        <p>Same linear scale. The previous space is only 1/7,776 of the new one—too narrow to see at this size. Each extra word repeats this multiplication.</p>
      </div>
      <label className="cl-range-label" htmlFor="cl-word-count">
        Random words <output>{words}</output>
      </label>
      <input
        id="cl-word-count"
        type="range"
        min="3"
        max="8"
        value={words}
        onChange={(e) => setWords(Number(e.target.value))}
      />
      <div className="cl-range-ends">
        <span>3 words</span>
        <span>8 words</span>
      </div>
      <details className="cl-math">
        <summary>
          See the exact calculation <ChevronDown size={16} />
        </summary>
        <p>
          <code>
            7,776<sup>{words}</sup> = {combinations.toLocaleString("en-US")}
          </code>
        </p>
        <p>
          Entropy = words × log₂(7,776). Independent, uniform selection is
          essential. This is search-space size, not a prediction of cracking
          time or a passphrase recommendation. Hardware, encryption settings and
          attack costs also matter.
        </p>
      </details>
      <a
        className="cl-text-link"
        href={lessonHref(
          curriculumLessons.find(
            ({ lesson }) => lesson.slug === "generate-passphrase"
          )?.lesson ?? firstLesson
        )}
      >
        Learn how to generate a passphrase <ArrowUpRight size={16} />
      </a>
    </article>
  )
}
function VaultPreview() {
  const [copies, setCopies] = useState(1),
    [secrets, setSecrets] = useState(1),
    [layer, setLayer] = useState(false),
    [separate, setSeparate] = useState(false)
  return (
    <article className="cl-vault" id="vault-preview">
      <div className="cl-demo-heading">
        <span className="cl-demo-number">02</span>
        <h3>Design your digital vault.</h3>
      </div>
      <p>
        Every safeguard creates something you must preserve. Change the
        arrangement and inspect the consequences.
      </p>
      <div
        className="cl-vault-visual"
        aria-label={`${copies} encrypted file copies, ${secrets} copies of each of ${layer ? 2 : 1} independent secrets, ${separate ? "separate locations" : "one shared location"}`}
      >
        <div>
          <Layers size={38} />
          <strong>{copies}</strong>
          <span>encrypted copies</span>
        </div>
        <span className="cl-vault-plus">+</span>
        <div>
          <KeyRound size={38} />
          <strong>{layer ? 2 : 1}</strong>
          <span>required secrets</span>
        </div>
        <span className="cl-vault-plus">+</span>
        <div>
          <MapPin size={38} />
          <strong>{separate ? (layer ? 3 : 2) : 1}</strong>
          <span>storage groups</span>
        </div>
      </div>
      <div className="cl-counter">
        <span>Encrypted file copies</span>
        <div>
          <button
            aria-label="Remove a wallet copy"
            disabled={copies === 1}
            onClick={() => setCopies(copies - 1)}
          >
            <Minus size={16} />
          </button>
          <output>{copies}</output>
          <button
            aria-label="Add a wallet copy"
            disabled={copies === 4}
            onClick={() => setCopies(copies + 1)}
          >
            <Plus size={16} />
          </button>
        </div>
      </div>
      <div className="cl-counter">
        <span>Backups of each secret</span>
        <div>
          <button
            aria-label="Remove a secret backup"
            disabled={secrets === 1}
            onClick={() => setSecrets(secrets - 1)}
          >
            <Minus size={16} />
          </button>
          <output>{secrets}</output>
          <button
            aria-label="Add a secret backup"
            disabled={secrets === 4}
            onClick={() => setSecrets(secrets + 1)}
          >
            <Plus size={16} />
          </button>
        </div>
      </div>
      <label className="cl-checkbox">
        <input
          type="checkbox"
          checked={layer}
          onChange={(e) => setLayer(e.target.checked)}
        />{" "}
        Add a layer with an independent secret
      </label>
      <label className="cl-checkbox">
        <input
          type="checkbox"
          checked={separate}
          onChange={(e) => setSeparate(e.target.checked)}
        />{" "}
        Store files and secrets separately
      </label>
      <p className="cl-feedback" aria-live="polite">
        Recovery needs one usable file and{" "}
        {layer ? "both independent secrets" : "the secret"}.{" "}
        {copies === 1
          ? "The only file copy can still be lost. "
          : "Multiple copies help only if their failures are independent. "}
        {secrets === 1
          ? "Each secret still has a single backup. "
          : "Each secret has redundant backups. "}
        {separate
          ? "Keep copies within each group geographically independent, too."
          : "One compromised location can expose every component."}
      </p>
    </article>
  )
}
function AttackerPreview() {
  const [known, setKnown] = useState(0)
  const scenarios = [
    {
      label: "An unknown file",
      title: "A file. No known reward.",
      copy: "An encrypted file may not identify its contents or value. An attacker has less information for choosing a target. File formats and surrounding metadata may still give clues.",
      facts: ["Contents: unknown", "Value: unknown", "Passphrase: unknown"],
    },
    {
      label: "A known wallet",
      title: "The target is recognizable.",
      copy: "Knowing that a file is a wallet removes one uncertainty. The attacker still needs a way to obtain or guess the secret. Recognizability changes incentives, not the strength of the encryption.",
      facts: [
        "Contents: Bitcoin wallet",
        "Value: unknown",
        "Passphrase: unknown",
      ],
    },
    {
      label: "A known balance",
      title: "The reward has a price tag.",
      copy: "A linked balance or exposed descriptor can help estimate a potential reward. That may justify more effort. It does not make a random passphrase less random, and the balance may not be fully reachable.",
      facts: [
        "Contents: Bitcoin wallet",
        "Value: visible",
        "Passphrase: unknown",
      ],
    },
  ]
  const s = scenarios[known]
  return (
    <article className="cl-attacker" id="privacy">
      <div className="cl-demo-heading">
        <span className="cl-demo-number">03</span>
        <h3>Think like an attacker.</h3>
      </div>
      <p>
        Privacy changes what an attacker can know about the opportunity. Reveal
        one piece of information at a time.
      </p>
      <div className="cl-segmented" aria-label="Attacker information">
        {scenarios.map((item, i) => (
          <button
            key={item.label}
            aria-pressed={known === i}
            onClick={() => setKnown(i)}
          >
            {item.label}
          </button>
        ))}
      </div>
      <div className="cl-attacker-result" aria-live="polite">
        <div className="cl-attacker-file">
          <FileKey2 size={48} />
          <div>
            {s.facts.map((f) => (
              <span key={f}>{f}</span>
            ))}
          </div>
        </div>
        <h4>{s.title}</h4>
        <p>{s.copy}</p>
      </div>
      <p className="cl-equation">
        Expected reward × chance of success − attack cost
      </p>
      <p className="cl-small">
        A reasoning model, not a measured prediction. Uncertainty is useful; it
        cannot replace strong encryption.
      </p>
      <a
        className="cl-text-link"
        href={lessonHref(
          curriculumLessons.find(
            ({ lesson }) => lesson.id === "custody-economics"
          )?.lesson ?? firstLesson
        )}
      >
        Explore the economics of security <ArrowUpRight size={16} />
      </a>
    </article>
  )
}

function Syllabus() {
  return (
    <section id="curriculum" className="cl-section cl-wrap">
      <div className="cl-section-head">
        <h2>
          From first principles
          <br />
          to a system you can recover.
        </h2>
        <div>
          <p>
            The complete learning path. Three parts, {available.length}{" "}
            available lessons, and optional extensions when you need them.
          </p>
          <p className="cl-small">
            Open a part to inspect every chapter and lesson.
          </p>
        </div>
      </div>
      <div className="cl-syllabus">
        {curriculumPhases.map((phase, i) => {
          const chapters = [
            ...new Set(phase.lessons.map((l) => l.chapter ?? "Lessons")),
          ]
          const published = phase.lessons.filter(isAvailableLesson).length
          return (
            <details
              key={phase.id}
              className="cl-phase"
              onToggle={(e) => {
                if (e.currentTarget.open)
                  courseEvent("syllabus_open", { phase: phase.id })
              }}
            >
              <summary>
                <span className="cl-phase-number">0{i + 1}</span>
                <img
                  src={phaseImages[i]}
                  alt=""
                  width="180"
                  height="120"
                  loading="lazy"
                />
                <span className="cl-phase-summary">
                  <strong>{phase.title}</strong>
                  <span>{phase.outcome}</span>
                  <small>
                    {chapters.length} chapters · {published} available lessons
                    {i === 2 ? " · Optional" : ""}
                  </small>
                </span>
                <span className="cl-expand">
                  <Plus size={24} />
                </span>
              </summary>
              <div className="cl-phase-content">
                <div className="cl-phase-intro">
                  <img
                    src={phaseImages[i]}
                    alt={phaseAlt[i]}
                    width="840"
                    height="560"
                    loading="lazy"
                  />
                  <div>
                    <p>{phase.summary}</p>
                    <p className="cl-small">{phase.estimatedTime}</p>
                    <a
                      className="cl-text-link"
                      href={lessonHref(phase.lessons[0])}
                    >
                      Open this part <ArrowUpRight size={16} />
                    </a>
                  </div>
                </div>
                {chapters.map((chapter) => (
                  <div className="cl-chapter" key={chapter}>
                    <h3>{chapter}</h3>
                    <ol>
                      {phase.lessons
                        .filter((l) => (l.chapter ?? "Lessons") === chapter)
                        .map((l) => (
                          <li key={l.id}>
                            <a href={lessonHref(l)}>
                              <span>{l.title}</span>
                              <span className="cl-lesson-meta">
                                {!isAvailableLesson(l)
                                  ? l.status === "planned"
                                    ? "Planned"
                                    : "Draft · review pending"
                                  : l.optional
                                    ? "Optional"
                                    : l.estimatedTime}
                                <ArrowUpRight size={15} />
                              </span>
                            </a>
                          </li>
                        ))}
                    </ol>
                  </div>
                ))}
              </div>
            </details>
          )
        })}
      </div>
      <div className="cl-syllabus-foot">
        <p>
          Understand secrets and encryption. Choose a foundation. Practice one
          wallet. Prove recovery. Separate signing. Evaluate advanced policies.
        </p>
        <StartLink placement="curriculum" />
      </div>
    </section>
  )
}

function LearningPreview() {
  const [confirmed, setConfirmed] = useState(false)
  return (
    <section className="cl-learning cl-section" id="learning">
      <div className="cl-wrap cl-learning-layout">
        <div>
          <h2>
            One step.
            <br />
            One concept.
            <br />
            <em>Then the next.</em>
          </h2>
          <p>
            You do not need to absorb the entire system at once. Guided Learning
            takes you through explanations, practical checks and recovery
            exercises.
          </p>
          <p>
            Prefer to browse? Every chapter is available in the open curriculum.
            Progress stays in your browser.
          </p>
          <StartLink placement="learning">Begin Guided Learning</StartLink>
          <a href={COURSE} className="cl-text-link">
            Browse the open curriculum <ArrowUpRight size={16} />
          </a>
        </div>
        <article className="cl-lesson-preview">
          <div className="cl-preview-bar">
            <span>Lesson excerpt · {firstLesson.estimatedTime}</span>
            <span>
              1 / {curriculumLessons.filter((e) => !e.lesson.optional).length}
            </span>
          </div>
          <h3>{firstLesson.title}</h3>
          <p>{firstLesson.explanation?.[0]}</p>
          <div className="cl-mini-principle">
            <FileKey2 />
            <ArrowRight />
            <ShieldCheck />
            <span>
              Protect authority.
              <br />
              Preserve recovery.
            </span>
          </div>
          <div className="cl-check-understanding">
            <strong>Check your understanding</strong>
            <label className="cl-checkbox">
              <input
                type="checkbox"
                checked={confirmed}
                onChange={(e) => setConfirmed(e.target.checked)}
              />
              {firstLesson.checklist?.[0]}
            </label>
            <p role="status">
              {confirmed
                ? "That is the starting point. Test the reasoning in the full lesson."
                : "Try the check, then open the lesson to continue."}
            </p>
          </div>
          <a href={FIRST} className="cl-text-link">
            Open the actual lesson <ArrowRight size={16} />
          </a>
          <p className="cl-small">
            This preview does not mark the lesson complete. Video tutorials will
            be added as they become available.
          </p>
        </article>
      </div>
    </section>
  )
}

function Foundation() {
  const [step, setStep] = useState(0)
  const steps = [
    "Prepare the payment online.",
    "Inspect and sign offline.",
    "Return the signed payment and broadcast.",
  ]
  return (
    <section className="cl-section cl-wrap" id="foundation">
      <div className="cl-split">
        <h2>
          Ordinary hardware.
          <br />
          Extraordinary responsibility.
        </h2>
        <div>
          <p>
            Dedicated generic computers. Debian Stable. Bitcoin Core. Learn why
            each belongs here, what it verifies, and where its protection ends.
          </p>
          <p>
            First, master one wallet. Then separate online verification from
            offline signing.
          </p>
        </div>
      </div>
      <div className="cl-foundation-line">
        <span>
          <Monitor />
          Generic hardware
        </span>
        <span>
          <img src="/software/debian.svg" alt="" width="24" height="24" />
          Debian Stable
        </span>
        <span>
          <ShieldCheck />
          Bitcoin Core
        </span>
      </div>
      <div className="cl-psbt">
        <div className={step === 0 || step === 2 ? "is-active" : ""}>
          <Wifi />
          <h3>Online node</h3>
          <p>
            Validate the chain.
            <br />
            Track with a watch-only wallet.
          </p>
          <small>No savings private keys.</small>
        </div>
        <div className="cl-psbt-transfer">
          <FileText />
          <strong>PSBT</strong>
          <p aria-live="polite">{steps[step]}</p>
          <button
            className="cl-control"
            onClick={() => setStep((step + 1) % 3)}
          >
            Step {step + 1} of 3 <ArrowRight size={16} />
          </button>
          <small>Payment file transfer, not a network connection.</small>
        </div>
        <div className={step === 1 ? "is-active" : ""}>
          <WifiOff />
          <h3>Offline signer</h3>
          <p>
            Inspect the transaction.
            <br />
            Authorize with private keys.
          </p>
          <small>Check recipient, amount, fee and change.</small>
        </div>
      </div>
      <DebianImagesNotice compact />
    </section>
  )
}

const faqs = [
  [
    "Is this course really free?",
    "Yes. The curriculum is openly available, with no fixed fee and no registration barrier. It follows Value for Value: if it helps, you decide whether and how to give something back.",
  ],
  [
    "Do I need to know Linux or programming?",
    "No programming background is required for the foundational path. The course introduces Linux through small, understandable experiments before practical wallet work. Advanced RPC exercises come later.",
  ],
  [
    "Do I need to own bitcoin or buy a hardware wallet?",
    "No. Begin with disposable practice wallets and valueless Signet coins. The course uses ordinary computers reserved for the job, rather than requiring Bitcoin-specific hardware.",
  ],
  [
    "Can I use an old laptop?",
    "Often, yes. The reference examples use x86-64 (amd64) computers capable of running Debian Stable and Bitcoin Core. Storage, memory and synchronization requirements depend on the computer’s role. Review the preparation lessons before choosing hardware.",
  ],
  [
    "Why Bitcoin Core—and do I need a full node?",
    "This path teaches independent validation as part of custody. The online Core node checks Bitcoin history; the offline signer authorizes payments. You start with one computer for practice. Pruning reduces retained block storage, but does not skip initial validation.",
  ],
  [
    "Will I learn multisig, Taproot and timelocks?",
    "Yes, in the optional advanced part. Start by defining spending authority, then use disposable Regtest experiments to test policies and recovery paths. The course treats backup architecture and authorization policy as different problems.",
  ],
  [
    "What if I already use a hardware wallet?",
    "You can use the course to examine the assumptions behind your current setup: who verifies your payments, what each backup reveals, what recovery depends on, and whether extra complexity addresses a real threat.",
  ],
  [
    "How long does it take?",
    "There is no single promised completion time. Individual lessons distinguish active practice from waiting for synchronization or confirmations. The first lesson is estimated at 8–12 minutes; wallet practice and recovery take several sessions. Learn at your own pace.",
  ],
  [
    "Can I resume or browse freely?",
    "Yes. Guided Learning remembers progress in this browser, and the open curriculum lets you choose individual lessons. Clearing browser storage removes local progress, so use the same browser to continue.",
  ],
  [
    "Will I learn Bitcoin Core Vault and Bitcoin Core Node?",
    "The course teaches the roles these dedicated Debian environments will package. The project currently labels its Debian images as in development. The existing lessons use verified Debian and Bitcoin Core installations; download and verification links will appear when releases are available.",
  ],
  [
    "Does finishing guarantee that my bitcoin is safe?",
    "No course can do that. The practical outcome is the ability to explain, operate, test and recover your arrangement. Your hardware, software, procedures, backups and changing circumstances still require attention.",
  ],
]
function Updates() {
  const raw = import.meta.env.VITE_COURSE_SUBSCRIBE_URL as string | undefined
  let subscriptionUrl: string | undefined
  try {
    if (raw && new URL(raw).protocol === "https:")
      subscriptionUrl = new URL(raw).href
  } catch {
    /* Unconfigured: offer real public update channels. */
  }
  return (
    <aside id="updates" className="cl-updates">
      <div>
        <h3>Keep learning as the course grows.</h3>
        <p>New lessons, video tutorials and Debian image releases.</p>
      </div>
      <div>
        {subscriptionUrl ? (
          <>
            <a
              className="cl-control"
              href={subscriptionUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => courseEvent("subscribe_open")}
            >
              Subscribe for course updates <ArrowUpRight size={16} />
            </a>
            <p className="cl-small">
              Optional. The subscription page explains consent and email
              preferences.
            </p>
          </>
        ) : (
          <>
            <a
              className="cl-control"
              href="https://x.com/btcpavao"
              target="_blank"
              rel="noopener noreferrer"
            >
              Follow Pavao’s updates <ArrowUpRight size={16} />
            </a>
            <p className="cl-small">
              Email updates are not available yet.{" "}
              <a href="/feed.xml">Follow new writing via RSS.</a>
            </p>
          </>
        )}
      </div>
    </aside>
  )
}

export function CourseLandingPage() {
  const [resume, setResume] = useState<PlayerLesson | null>(null)
  const [sticky, setSticky] = useState(false)
  const heroRef = useRef<HTMLElement>(null),
    finalRef = useRef<HTMLElement>(null)
  useEffect(() => {
    document.title =
      "Bitcoin Self-Custody Course — Learn Bitcoin Core | BTC Pavao"
    const refreshResume = () => {
      try {
        const l = findLessonBySlug(
          localStorage.getItem(
            "btcpavao-core-curriculum-en-last-available-lesson-v3"
          )
        )
        setResume(l && isAvailableLesson(l.lesson) ? l.lesson : null)
      } catch {
        /* Learning remains open when storage is unavailable. */
      }
    }
    refreshResume()
    window.addEventListener("pageshow", refreshResume)
    window.addEventListener("storage", refreshResume)
    let heroVisible = true,
      finalVisible = false
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.target === heroRef.current) heroVisible = e.isIntersecting
          if (e.target === finalRef.current) finalVisible = e.isIntersecting
        }
        setSticky(!heroVisible && !finalVisible)
      },
      { threshold: 0 }
    )
    if (heroRef.current) observer.observe(heroRef.current)
    if (finalRef.current) observer.observe(finalRef.current)
    return () => {
      observer.disconnect()
      window.removeEventListener("pageshow", refreshResume)
      window.removeEventListener("storage", refreshResume)
    }
  }, [])
  return (
    <div className="cl-page" id="top">
      <a className="cl-skip" href="#main-content">
        Skip to content
      </a>
      <SiteHeader
        primaryAction={{ href: FIRST, label: "Start Learning — Free" }}
      />
      <main id="main-content">
        <section className="cl-hero" ref={heroRef}>
          <picture className="cl-hero-art">
            <source
              srcSet="/course/custody-architecture-840.webp 840w, /course/custody-architecture-1536.webp 1536w"
              sizes="(max-width: 700px) 100vw, 85vw"
            />
            <img
              src="/course/custody-architecture-1536.webp"
              alt="Nested blue glass and brass structures protect a golden information plate on a sunlit Adriatic terrace."
              width="1536"
              height="1024"
              fetchPriority="high"
            />
          </picture>
          <div className="cl-wrap cl-hero-inner">
            <div className="cl-hero-copy">
              <p className="cl-course-name">
                Bitcoin Self-Custody with Bitcoin Core
              </p>
              <h1>
                Understand
                <br />
                the system.
                <br />
                <em>Own your bitcoin.</em>
              </h1>
              <p className="cl-hero-lede">
                Most custody education teaches you which wallet to use. This
                course teaches you how to think about custody—and build a system
                you can explain, operate and recover.
              </p>
              <div className="cl-actions">
                <StartLink placement="hero" />
                <a
                  href="#curriculum"
                  className="cl-secondary"
                  onClick={() => courseEvent("curriculum_click")}
                >
                  Explore the curriculum <ArrowDown size={16} />
                </a>
              </div>
              <p className="cl-hero-note">
                Free and open. No account. No programming required.
              </p>
              {resume && (
                <a className="cl-resume" href={lessonHref(resume)}>
                  Continue learning: {resume.title}
                  <ArrowRight size={16} />
                </a>
              )}
            </div>
          </div>
          <span className="cl-art-caption">
            One file. A system of understanding.
          </span>
        </section>
        <div className="cl-proof-strip cl-wrap">
          <span>
            <Check />
            Start from first principles
          </span>
          <span>
            <Check />
            Practice with test coins
          </span>
          <span>
            <Check />
            Prove recovery
          </span>
          <a href="#learning">
            Learn at your own pace <ArrowDown size={15} />
          </a>
        </div>
        <GoldAndInformation />
        <ArchitectureStory />
        <section className="cl-section cl-wrap" id="previews">
          <div className="cl-section-head">
            <h2>
              Don’t just read the promise.
              <br />
              <em>Try the reasoning.</em>
            </h2>
            <p>
              Three small experiments. No wallet connection.
              <br />
              No private information to enter.
            </p>
          </div>
          <div className="cl-previews">
            <EntropyPreview />
            <VaultPreview />
          </div>
          <AttackerPreview />
          <Share
            section="entropy"
            text="One additional random word multiplies the search space by 7,776. Explore Bitcoin custody from first principles."
          />
        </section>
        <Syllabus />
        <LearningPreview />
        <section className="cl-section cl-wrap cl-outcomes" id="outcomes">
          <h2>
            A wallet setup you follow.
            <br />
            <em>A custody system you understand.</em>
          </h2>
          <div className="cl-outcome-table">
            <div>
              <span>From following instructions</span>
              <strong>To explaining your decisions</strong>
            </div>
            {[
              [
                "“Someone recommended this wallet.”",
                "Explain the trust assumptions behind your hardware, operating system and verifier.",
              ],
              [
                "“I have backups somewhere.”",
                "Create encrypted copies and verify that files and secrets survive independent failures.",
              ],
              [
                "“I think I could recover.”",
                "Restore a disposable wallet and prove it can spend again.",
              ],
              [
                "“More signers must be safer.”",
                "Separate theft and loss protection from the distribution of spending authority.",
              ],
            ].map(([before, after]) => (
              <div key={before}>
                <p>{before}</p>
                <p>
                  <Check aria-hidden="true" />
                  {after}
                </p>
              </div>
            ))}
          </div>
        </section>
        <section className="cl-audience cl-wrap">
          <h2>Start where you are.</h2>
          <div>
            {[
              [
                "New to self-custody?",
                "Start with the meaning of a private key, one computer and valueless test coins.",
              ],
              [
                "Already using a hardware wallet?",
                "Revisit backups, privacy and the assumptions beneath your existing setup.",
              ],
              [
                "Comfortable with Bitcoin?",
                "Explore economic security, independent layers, descriptors and spending policies.",
              ],
              [
                "Planning for a family or organization?",
                "Focus on continuity, understandable recovery and who should authorize spending.",
              ],
            ].map(([title, text]) => (
              <article key={title}>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>
        <Foundation />
        <section className="cl-instructor cl-section cl-wrap" id="instructor">
          <img
            className="cl-portrait"
            src="/pavao-profile.webp"
            alt="Pavao Pahljina"
            width="600"
            height="600"
            loading="lazy"
          />
          <div>
            <h2>Learn with Pavao.</h2>
            <blockquote>
              “I don’t want you to trust my wallet recommendations. I want you
              to understand the reasoning well enough to evaluate them
              yourself.”
            </blockquote>
            <p>
              I have spent more than 10,000 hours studying, teaching, building
              and working in Bitcoin. My work includes education and publishing
              operations at Saifedean.com and TheSaifHouse.com, community work
              at TwentyOne.World, and the Practical Bitcoin Standard.
            </p>
            <p>
              I am not a Bitcoin Core developer. I study the software, test the
              workflows and document them for people who are not programmers.
            </p>
            <div className="cl-actions">
              <a className="cl-text-link" href="/en/bitcoin-core/#essays">
                Read the essays <ArrowUpRight size={16} />
              </a>
              <a
                className="cl-text-link"
                href="https://github.com/btcpavao"
                target="_blank"
                rel="noopener noreferrer"
              >
                Explore the public work <ArrowUpRight size={16} />
              </a>
            </div>
          </div>
        </section>
        <section className="cl-section cl-wrap cl-faq" id="questions">
          <div>
            <h2>
              A few questions
              <br />
              before you begin.
            </h2>
            <p>
              Clarity is part of the course.
              <br />
              It should also be part of choosing it.
            </p>
          </div>
          <div>
            {faqs.map(([q, a]) => (
              <details key={q}>
                <summary>
                  {q}
                  <Plus size={18} />
                </summary>
                <p>{a}</p>
              </details>
            ))}
          </div>
        </section>
        <section className="cl-final" ref={finalRef} id="begin">
          <img
            src="/course/custody-architecture-1536.webp"
            alt="The complete nested structure in Mediterranean light."
            width="1536"
            height="1024"
            loading="lazy"
          />
          <div className="cl-wrap">
            <div className="cl-final-copy">
              <h2>
                Your bitcoin deserves
                <br />a system you understand.
              </h2>
              <p>
                Start with one simple question. Learn the principles. Test your
                assumptions. Build toward a custody system you can explain,
                maintain and recover.
              </p>
              <StartLink placement="final" />
              <p className="cl-small">
                No fixed price. No paywall. No obligation.
              </p>
              <a href="/support/" className="cl-text-link">
                Built on Value for Value <ArrowUpRight size={16} />
              </a>
            </div>
          </div>
        </section>
        <div className="cl-wrap">
          <Updates />
        </div>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Course",
              name: "Bitcoin Self-Custody with Bitcoin Core",
              description:
                "An open-access, first-principles course in Bitcoin Core, wallet backup and recovery, encryption, offline signing and optional advanced spending policies.",
              url: `${SITE_URL}${COURSE_LANDING_PATH}`,
              inLanguage: "en",
              isAccessibleForFree: true,
              provider: {
                "@type": "Person",
                name: "Pavao Pahljina",
                url: SITE_URL,
              },
              hasPart: curriculumPhases.map((p) => ({
                "@type": "LearningResource",
                name: p.title,
                url: `${SITE_URL}${lessonHref(p.lessons[0])}`,
              })),
            }),
          }}
        />
      </main>
      <SiteFooter />
      {sticky && (
        <div className="cl-sticky">
          <StartLink placement="mobile" />
        </div>
      )}
    </div>
  )
}
