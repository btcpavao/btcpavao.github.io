import type { PlayerLesson } from "./bitcoin-core-curriculum-player-en-data"
import { understandingKey } from "./curriculum/concept-types"
export type LearningMode = "guided" | "open"
export const MODE_KEY = "btcpavao-core-curriculum-mode-v5"
export function passedUnderstanding(
  lesson: PlayerLesson,
  checks: ReadonlySet<string>,
  retained: ReadonlySet<string>
) {
  return (
    !lesson.understanding ||
    checks.has(understandingKey(lesson.id)) ||
    retained.has(lesson.id)
  )
}
// Existing practical completion semantics are retained. A separate reasoning check
// gates guided progression without discarding old practical confirmations.
export function guidedFrontier<T extends { lesson: PlayerLesson }>(
  entries: readonly T[],
  completed: ReadonlySet<string>,
  checks: ReadonlySet<string>,
  retained: ReadonlySet<string>
) {
  return (
    entries.find(
      (e) =>
        !e.lesson.optional &&
        (!completed.has(e.lesson.id) ||
          !passedUnderstanding(e.lesson, checks, retained))
    ) ?? null
  )
}
export function mayOpenGuided(
  lesson: PlayerLesson,
  frontier: { lesson: PlayerLesson } | null,
  completed: ReadonlySet<string>
) {
  return (
    completed.has(lesson.id) ||
    frontier?.lesson.id === lesson.id ||
    (!frontier && lesson.optional)
  )
}
