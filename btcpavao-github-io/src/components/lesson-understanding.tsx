import { useId, useState, type Dispatch, type SetStateAction } from "react"
import type { PlayerLesson } from "@/bitcoin-core-curriculum-player-en-data"
import { understandingKey } from "@/curriculum/concept-types"

export function LessonUnderstanding({
  lesson,
  checks,
  setChecks,
}: {
  lesson: PlayerLesson
  checks: Set<string>
  setChecks: Dispatch<SetStateAction<Set<string>>>
}) {
  const check = lesson.understanding,
    id = useId()
  const [selected, setSelected] = useState<number | null>(null),
    [submitted, setSubmitted] = useState(false)
  if (!check) return null
  const done = checks.has(understandingKey(lesson.id))
  return (
    <section className="concept-understanding" aria-labelledby={id}>
      <h2 id={id}>Check your understanding</h2>
      <fieldset>
        <legend>{check.prompt}</legend>
        {check.options.map((option, index) => (
          <label
            key={option.text}
            className={selected === index ? "is-selected" : ""}
          >
            <input
              type="radio"
              name={id}
              checked={selected === index}
              onChange={() => {
                setSelected(index)
                setSubmitted(false)
              }}
            />
            {option.text}
          </label>
        ))}
      </fieldset>
      <button
        type="button"
        className="course-action course-action--primary"
        disabled={selected === null}
        onClick={() => {
          setSubmitted(true)
          if (selected === check.correct)
            setChecks((current) =>
              new Set(current).add(understandingKey(lesson.id))
            )
        }}
      >
        Check answer
      </button>
      <div role="status" className="concept-feedback">
        {submitted && selected !== null ? (
          <p>
            <strong>
              {selected === check.correct
                ? "That’s right. "
                : "Try the example again. "}
            </strong>
            {check.options[selected].feedback}
          </p>
        ) : done ? (
          <p>
            Understanding check completed. You can revisit the question at any
            time.
          </p>
        ) : null}
      </div>
    </section>
  )
}
export function LessonVideoScript({ lesson }: { lesson: PlayerLesson }) {
  if (!lesson.videoScript?.length) return null
  return (
    <section className="concept-recording">
      <h2>Video explanation</h2>
      {!lesson.videoUrl && (
        <p>
          Recording not yet available. Read the complete explanation above or
          the prepared narration below; a recording is not required to progress.
        </p>
      )}
      <details className="course-lesson-details">
        <summary>
          {lesson.videoUrl
            ? "Narration and visual sequence"
            : "Read the prepared narration"}
        </summary>
        {lesson.videoScript.map((part, i) => (
          <div key={i}>
            <p className="concept-scene">
              Visual {i + 1}: {part.scene}
            </p>
            <p>{part.narration}</p>
          </div>
        ))}
      </details>
    </section>
  )
}
