import v41Manifest from "./curriculum/v4.1-progress-manifest.json"
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

// Freeze v4.1 evidence before the Linux/RPC additions. Existing v4 waivers
// remain bounded by their own evidence; a fresh visitor gets no snapshot.
export function validatedV41Completions(
  marks: ReadonlySet<string>,
  checks: ReadonlySet<string>,
  retainedV4: ReadonlySet<string> = new Set()
) {
  const result = new Set<string>()
  let changed = true
  while (changed) {
    changed = false
    for (const lesson of v41Manifest) {
      if (
        !result.has(lesson.id) &&
        marks.has(lesson.id) &&
        lesson.checks.every((key) => checks.has(key)) &&
        (retainedV4.has(lesson.id) ||
          lesson.prerequisites.every((id) => result.has(id)))
      ) {
        result.add(lesson.id)
        changed = true
      }
    }
  }
  return result
}

export function retainedV41Completions(
  snapshot: ReadonlySet<string>,
  marks: ReadonlySet<string>,
  checks: ReadonlySet<string>,
  retainedV4: ReadonlySet<string> = new Set()
) {
  return new Set(
    [...validatedV41Completions(marks, checks, retainedV4)].filter((id) =>
      snapshot.has(id)
    )
  )
}
