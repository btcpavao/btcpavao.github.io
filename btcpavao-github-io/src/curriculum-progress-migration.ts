import v4Manifest from "./curriculum/v4-progress-manifest.json"

// Frozen evidence from b47e447, captured once when v4.1 first loads.
// Old bare completion marks are insufficient. Reordering does not erase work.
export function validatedV4Completions(
  marks: ReadonlySet<string>,
  checks: ReadonlySet<string>
) {
  const completed = new Set<string>()
  for (const lesson of v4Manifest) {
    if (
      marks.has(lesson.id) &&
      lesson.checks.every((key) => checks.has(key)) &&
      lesson.prerequisites.every((id) => completed.has(id))
    )
      completed.add(lesson.id)
  }
  return completed
}

// Revalidate the old evidence on every change so withdrawing an earlier result
// still withdraws the dependent retained credit. Never award credit to new users.
export function retainedV4Completions(
  snapshot: ReadonlySet<string>,
  marks: ReadonlySet<string>,
  checks: ReadonlySet<string>
) {
  return new Set(
    [...validatedV4Completions(marks, checks)].filter((id) => snapshot.has(id))
  )
}
