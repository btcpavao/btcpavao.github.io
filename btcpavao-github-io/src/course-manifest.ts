import manifest from "../.cache/course-manifest.json"
export const curriculumPhases = manifest.phases
export const curriculumLessons = curriculumPhases.flatMap((phase) =>
  phase.lessons.map((lesson) => ({ phase, lesson }))
)
export type PlayerLesson = (typeof curriculumLessons)[number]["lesson"]
export const isAvailableLesson = (lesson: PlayerLesson) => lesson.available
export function findLessonBySlug(slug: string | null) {
  if (!slug) return null
  const aliases: Record<string, string> = manifest.aliases
  return (
    curriculumLessons.find(
      ({ lesson }) => lesson.slug === (aliases[slug] ?? slug)
    ) ?? null
  )
}
