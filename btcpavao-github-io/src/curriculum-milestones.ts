import type {
  CurriculumPhase,
  PlayerLesson,
} from "./bitcoin-core-curriculum-player-en-data"

export type CurriculumMilestone = {
  id: string
  phaseId: string
  title: string
  lessons: PlayerLesson[]
}

// Required chapters are the milestones. Optional steps never affect their totals.
export function curriculumMilestones(
  phases: readonly CurriculumPhase[]
): CurriculumMilestone[] {
  return phases.flatMap((phase) => {
    const chapters = [
      ...new Set(
        phase.lessons
          .filter((lesson) => !lesson.optional)
          .map((lesson) => lesson.chapter)
      ),
    ]
    return chapters.map((chapter) => ({
      id: `${phase.id}:${chapter}`,
      phaseId: phase.id,
      title: chapter ?? "Learn the foundation",
      lessons: phase.lessons.filter(
        (lesson) => !lesson.optional && lesson.chapter === chapter
      ),
    }))
  })
}

export function milestoneProgress(
  milestones: readonly CurriculumMilestone[],
  completed: ReadonlySet<string>
) {
  return milestones.map((milestone) => {
    const done = milestone.lessons.filter((lesson) =>
      completed.has(lesson.id)
    ).length
    return {
      ...milestone,
      done,
      total: milestone.lessons.length,
      complete: done === milestone.lessons.length,
    }
  })
}
