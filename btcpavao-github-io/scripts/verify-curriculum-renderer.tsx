import assert from "node:assert/strict"
import { renderToStaticMarkup } from "react-dom/server"
import { CurriculumLesson } from "../src/components/curriculum-lesson"
import { curriculumLessons } from "../src/bitcoin-core-curriculum-player-en-data"
import { readingKey, stepKey } from "../src/curriculum-learning"
import { visualsFor, type VisualTarget } from "../src/curriculum/visuals"

// Exercise the real lesson renderer with saved progress states. No browser or
// wallet is simulated, and this is not a substitute for layout/keyboard QA.
export function verifyRenderer() {
  const allLessons = curriculumLessons.map((e) => e.lesson)
  const completed = new Set(allLessons.map((l) => l.id))
  let screens = 0
  for (const entry of curriculumLessons) {
    const { lesson, phase, lessonNumber } = entry
    const targets: VisualTarget[] = lesson.guidedSteps?.length
      ? lesson.guidedSteps.map((s) => ({ kind: "step", stepId: s.id }))
      : lesson.kind === "reading"
        ? (lesson.explanation ?? []).map((anchor) => ({
            kind: "reading",
            anchor,
          }))
        : [{ kind: "checkpoint" }]
    const checks = new Set<string>()
    targets.forEach((target, index) => {
      const html = renderToStaticMarkup(
        <CurriculumLesson
          lesson={lesson}
          phase={phase}
          lessonNumber={lessonNumber}
          completed={false}
          completedLessons={completed}
          lessons={allLessons}
          copiedId={null}
          checklistItems={checks}
          setChecklistItems={() => {}}
          onCopyCode={() => {}}
          onCopyLink={() => {}}
          copiedLink={false}
          onToggleComplete={() => {}}
          language="en"
          onSelectLesson={() => {}}
        />
      )
      const start = html.indexOf(
        target.kind === "step"
          ? '<section class="course-guided"'
          : '<section class="course-reading'
      )
      const end = html.indexOf(
        target.kind === "step"
          ? '<div class="course-guided__result"'
          : target.kind === "reading"
            ? '<div class="course-guided__actions"'
            : "</section>",
        start
      )
      assert.ok(
        start >= 0 && end > start,
        `Active screen missing: ${lesson.id}`
      )
      const activeHtml = html.slice(start, end)
      const expected = visualsFor(lesson.id, target)
        .map((v) => v.visual)
        .sort()
      const actual = [...activeHtml.matchAll(/data-visual="([^"]+)"/g)]
        .map((m) => m[1])
        .sort()
      assert.deepEqual(
        actual,
        expected,
        `Wrong active art: ${lesson.id} ${index}`
      )
      if (target.kind === "step") {
        assert.ok(html.includes("Expected result"))
        checks.add(stepKey(lesson.id, target.stepId))
      } else if (target.kind === "reading") {
        checks.add(readingKey(lesson.id, index))
      }
      screens++
    })
  }
  assert.equal(screens, 285)
  console.log(
    `Rendered all ${screens} active reading, practice and checkpoint states with saved-progress fixtures; exact visual placement preserved.`
  )
}
