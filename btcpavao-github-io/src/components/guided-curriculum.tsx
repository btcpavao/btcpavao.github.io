import { TutorialMetadata } from "@/components/tutorial-metadata"
import type { PlayerLesson } from "@/bitcoin-core-curriculum-player-en-data"
export function GuidedHistory({
  lessons,
  active,
  completed,
  onSelect,
  onOverview,
}: {
  lessons: PlayerLesson[]
  active: PlayerLesson
  completed: Set<string>
  onSelect: (l: PlayerLesson) => void
  onOverview: () => void
}) {
  const required = lessons.filter((l) => !l.optional),
    done = required.filter((l) => completed.has(l.id)).length
  return (
    <nav className="guided-history" aria-label="Current and completed lessons">
      <button type="button" onClick={onOverview}>
        Learning home
      </button>
      <p>
        Step {required.findIndex((l) => l.id === active.id) + 1 || "optional"}{" "}
        of {required.length}
      </p>
      <progress
        value={done}
        max={required.length}
        aria-label="Completed required lessons"
      />
      <p>{done} completed</p>
      <ol>
        {lessons
          .filter((l) => completed.has(l.id) || l.id === active.id)
          .map((l) => (
            <li key={l.id}>
              <button
                type="button"
                aria-current={l.id === active.id ? "page" : undefined}
                onClick={() => onSelect(l)}
              >
                {l.title}
                {completed.has(l.id) ? " · completed" : ""}
              </button>
            </li>
          ))}
      </ol>
    </nav>
  )
}
export function GuidedWelcome({
  completed,
  total,
  returning,
  onContinue,
  onReset,
}: {
  completed: number
  total: number
  returning: boolean
  onContinue: () => void
  onReset: () => void
}) {
  return (
    <section className="guided-welcome" aria-labelledby="guided-title">
      <p>Guided Learning · Recommended</p>
      <h1 id="guided-title">Understand every part of your custody.</h1>
      <p>
        Forget your current wallet setup for a moment. Begin with the simplest
        question: what are we trying to protect? Build one idea at a time, test
        your understanding, then apply it with the existing practical exercises.
      </p>
      <p>
        Start from the beginning even if you already use hardware wallets or
        multisig. Familiar ideas become useful when you can explain their
        consequences. You can switch to Open Curriculum at any time.
      </p>
      <progress
        value={completed}
        max={total}
        aria-label="Required curriculum progress"
      />
      <p>
        {completed} of {total} required lessons complete. Progress stays in this
        browser.
      </p>
      <button
        type="button"
        className="course-action course-action--primary"
        onClick={onContinue}
      >
        {completed === total
          ? "Review the foundation"
          : returning
            ? "Resume learning"
            : "Begin with first principles"}
      </button>
      {returning && (
        <p>
          <button type="button" className="course-reset" onClick={onReset}>
            Reset local progress
          </button>
        </p>
      )}
      <p>
        The main course uses test coins. No account or video viewing is
        required. Never enter a wallet file, private key or passphrase on this
        website.
      </p>
      <details className="course-lesson-details">
        <summary>Before you begin: course requirements</summary>
        <TutorialMetadata
          language="en"
          goal="Understand, operate and independently recover a custody system."
          difficulty="Beginner through optional advanced practice"
          estimatedTime="Per lesson; allow separate synchronization and practice time"
          realBitcoin="Test coins for the required course"
          softwareVersion="Bitcoin Core 31.1 · Curriculum v5.0"
          operatingSystems="Debian Stable examples on x86-64"
          recommendedOs="Dedicated Debian Stable"
          prerequisites="Basic file handling; each practical checkpoint identifies its requirements"
          outcome="Reasoned architecture and demonstrated recovery"
          lastReviewed="Conceptual content updated 2026-10-25; practical evidence remains recorded per lesson"
        />
      </details>
    </section>
  )
}
