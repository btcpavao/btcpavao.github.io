export type GuidedStep = {
  id: string
  title: string
  instructions: string[]
  expectedResult: string
  warning?: string
  help?: string
  command?: string
  commandContext?: string
}

export type LearningRequirements = {
  kind?: "reading" | "practice" | "checkpoint"
  guidedSteps?: GuidedStep[]
  prerequisites?: string[]
}

type ProgressLesson = LearningRequirements & {
  id: string
  status: string
  verification: string
  optional?: boolean
  checklist?: string[]
}

export function stepKey(lessonId: string, stepId: string) {
  return `lesson-${lessonId}:guided-v1:${stepId}`
}

export function checklistKey(lessonId: string, index: number) {
  return `lesson-${lessonId}:checklist-v2:${index}`
}

export function requiredChecks(lesson: ProgressLesson) {
  if (lesson.kind === "reading") return []
  if (lesson.guidedSteps?.length)
    return lesson.guidedSteps.map((step) => stepKey(lesson.id, step.id))
  return (lesson.checklist ?? []).map((_, index) =>
    checklistKey(lesson.id, index)
  )
}

export function canCompleteLesson(
  lesson: ProgressLesson,
  checkedItems: ReadonlySet<string>,
  completedLessons: ReadonlySet<string>
) {
  return (
    lesson.status === "published" &&
    lesson.verification === "verified" &&
    (lesson.kind === "reading" || requiredChecks(lesson).length > 0) &&
    (lesson.prerequisites ?? []).every((id) => completedLessons.has(id)) &&
    requiredChecks(lesson).every((key) => checkedItems.has(key))
  )
}

// Completion is the learner's local declaration, never a technical verification.
// Old completion marks cannot bypass new practical checks or prerequisites.
export function effectiveCompletions<T extends ProgressLesson>(
  lessons: readonly T[],
  completionMarks: ReadonlySet<string>,
  checkedItems: ReadonlySet<string>
) {
  const result = new Set<string>()
  let changed = true
  while (changed) {
    changed = false
    for (const lesson of lessons) {
      if (
        completionMarks.has(lesson.id) &&
        !result.has(lesson.id) &&
        canCompleteLesson(lesson, checkedItems, result)
      ) {
        result.add(lesson.id)
        changed = true
      }
    }
  }
  return result
}

export function nextRequiredEntry<T extends { lesson: ProgressLesson }>(
  entries: readonly T[],
  activeIndex: number
) {
  if (activeIndex < 0) return null
  return (
    entries.slice(activeIndex + 1).find(({ lesson }) => !lesson.optional) ??
    null
  )
}

export function resumeEntry<T extends { lesson: ProgressLesson }>(
  entries: readonly T[],
  completed: ReadonlySet<string>
) {
  return (
    entries.find(
      ({ lesson }) => !lesson.optional && !completed.has(lesson.id)
    ) ?? null
  )
}
