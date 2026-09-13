import assert from "node:assert/strict"
import { mkdtemp, rm } from "node:fs/promises"
import { tmpdir } from "node:os"
import path from "node:path"
import { pathToFileURL } from "node:url"
import { build } from "esbuild"
import {
  englishCurriculumDestination,
  retiredLessonSlugs,
} from "../content/curriculum-redirect.mjs"

const temporary = await mkdtemp(path.join(tmpdir(), "curriculum-check-"))
try {
  async function bundle(source, name) {
    const outfile = path.join(temporary, `${name}.mjs`)
    await build({
      entryPoints: [source],
      outfile,
      bundle: true,
      platform: "node",
      format: "esm",
      logLevel: "silent",
    })
    return import(pathToFileURL(outfile).href)
  }
  const en = await bundle("src/bitcoin-core-curriculum-player-en-data.ts", "en")
  const logic = await bundle("src/curriculum-learning.ts", "progress")
  const {
    canCompleteLesson,
    effectiveCompletions,
    nextRequiredEntry,
    requiredChecks,
    resumeEntry,
  } = logic
  let checks = 0
  function check(name, fn) {
    fn()
    checks++
    console.log(`✓ ${name}`)
  }

  check("All 64 English lessons remain in six phases", () => {
    for (const data of [en]) {
      assert.equal(data.curriculumPhases.length, 6)
      assert.equal(data.curriculumLessons.length, 64)
      assert.equal(
        new Set(data.curriculumLessons.map((e) => e.lesson.id)).size,
        64
      )
      assert.equal(
        new Set(data.curriculumLessons.map((e) => e.lesson.slug)).size,
        64
      )
      for (const entry of data.curriculumLessons) {
        assert.ok(data.findLessonBySlug(entry.lesson.slug))
        assert.ok(
          entry.lessonNumber.startsWith(`${Number(entry.phase.id) + 1}.`)
        )
      }
    }
  })
  check("All prerequisites exist earlier on the required path", () => {
    for (const data of [en]) {
      const ids = data.curriculumLessons.map((e) => e.lesson.id)
      for (const { lesson } of data.curriculumLessons) {
        for (const id of lesson.prerequisites ?? []) {
          const at = ids.indexOf(id)
          assert.ok(
            at >= 0 && at < ids.indexOf(lesson.id),
            `${lesson.id} → ${id}`
          )
          assert.equal(data.curriculumLessons[at].lesson.optional, false)
        }
      }
    }
  })
  check(
    "Legacy completion marks and positional checklist keys cannot complete practical work",
    () => {
      const lessons = en.curriculumLessons.map((e) => e.lesson)
      const marks = new Set(lessons.map((l) => l.id))
      const oldChecks = new Set(
        lessons.flatMap((l) =>
          Array.from({ length: 20 }, (_, i) => `lesson-${l.id}:${i}`)
        )
      )
      const effective = effectiveCompletions(lessons, marks, oldChecks)
      assert.ok(effective.has("0.1"))
      for (const lesson of lessons.filter((l) => l.kind !== "reading"))
        assert.equal(effective.has(lesson.id), false, lesson.id)
    }
  )
  check(
    "A practice requires every result and loses completion when a result is withdrawn",
    () => {
      const lesson = en.curriculumLessons.find(
        (e) => e.lesson.id === "signet-encrypt-new-backup"
      ).lesson
      const prerequisites = new Set(lesson.prerequisites)
      const checked = new Set(requiredChecks(lesson))
      assert.equal(canCompleteLesson(lesson, checked, prerequisites), true)
      checked.delete(requiredChecks(lesson)[2])
      assert.equal(canCompleteLesson(lesson, checked, prerequisites), false)
      assert.equal(
        canCompleteLesson(
          { ...lesson, guidedSteps: [], checklist: [] },
          new Set(),
          prerequisites
        ),
        false
      )
    }
  )
  check(
    "Review drafts stay incomplete even when every checkbox and completion mark exists",
    () => {
      const lessons = en.curriculumLessons.map((e) => e.lesson)
      const marks = new Set(lessons.map((l) => l.id))
      const checked = new Set(lessons.flatMap(requiredChecks))
      const effective = effectiveCompletions(lessons, marks, checked)
      for (const id of [
        "signet-receive-send",
        "signet-transact-again",
        "offline-device",
        "offline-psbt",
        "offline-recovery",
        "signet-readiness",
        "mainnet-readiness",
        "mainnet-small-test",
      ]) {
        assert.equal(effective.has(id), false, id)
      }
    }
  )
  check(
    "Guided Next and Resume stop at the missing required exercise instead of skipping it",
    () => {
      const entries = en.curriculumLessons
      const previous = entries.findIndex(
        (e) => e.lesson.id === "signet-encrypt-new-backup"
      )
      assert.equal(
        nextRequiredEntry(entries, previous).lesson.id,
        "signet-receive-send"
      )
      const completed = new Set(
        entries.slice(0, previous + 1).map((e) => e.lesson.id)
      )
      assert.equal(
        resumeEntry(entries, completed).lesson.id,
        "signet-receive-send"
      )
      assert.equal(nextRequiredEntry(entries, -1), null)
      assert.equal(
        resumeEntry(entries, new Set(entries.map((e) => e.lesson.id))),
        null
      )
    }
  )
  check(
    "Checkpoint completion is revoked transitively when an earlier result is unchecked",
    () => {
      const base = {
        status: "published",
        verification: "verified",
        kind: "practice",
        checklist: ["Observed result"],
      }
      const first = { ...base, id: "first" }
      const second = { ...base, id: "second", prerequisites: ["first"] }
      const checkpoint = {
        ...base,
        id: "checkpoint",
        kind: "checkpoint",
        prerequisites: ["second"],
      }
      const lessons = [checkpoint, second, first]
      const marks = new Set(lessons.map((l) => l.id))
      const checked = new Set(lessons.flatMap(requiredChecks))
      assert.equal(effectiveCompletions(lessons, marks, checked).size, 3)
      checked.delete(requiredChecks(first)[0])
      assert.equal(effectiveCompletions(lessons, marks, checked).size, 0)
    }
  )
  check(
    "Every guided step has a unique stable key, action, expected result and useful help",
    () => {
      for (const data of [en])
        for (const { lesson } of data.curriculumLessons) {
          const steps = lesson.guidedSteps ?? []
          assert.equal(new Set(steps.map((s) => s.id)).size, steps.length)
          for (const step of steps) {
            assert.ok(
              step.title &&
                step.instructions.length &&
                step.expectedResult &&
                step.help,
              `${lesson.id}/${step.id}`
            )
            if (step.command) assert.ok(step.commandContext)
          }
        }
    }
  )
  check(
    "Mainnet prerequisites explicitly require independent offline recovery",
    () => {
      const find = (id) =>
        en.curriculumLessons.find((e) => e.lesson.id === id).lesson
      assert.ok(
        find("mainnet-separate-wallet").prerequisites.includes(
          "offline-recovery"
        )
      )
      assert.ok(
        find("mainnet-readiness").prerequisites.includes("real-restore")
      )
      assert.ok(
        find("mainnet-small-test").prerequisites.includes("real-restore")
      )
      assert.ok(find("real-restore").guidedSteps.some((s) => s.id === "unlock"))
      assert.ok(
        find("offline-device").guidedSteps.some((s) => s.id === "coldboot")
      )
    }
  )
  check(
    "Threat modelling and philosophy precede tools and architecture",
    () => {
      for (const data of [en]) {
        const ids = data.curriculumLessons.map(({ lesson }) => lesson.id)
        const find = (id) =>
          data.curriculumLessons.find((e) => e.lesson.id === id).lesson
        assert.ok(ids.indexOf("0.2") < ids.indexOf("1.5"))
        assert.ok(ids.indexOf("1.5") < ids.indexOf("signet-install-verify"))
        assert.ok(find("architecture-choice").prerequisites.includes("0.2"))
        assert.equal(find("1.5").optional, false)
        assert.equal(
          canCompleteLesson(
            find("0.2"),
            new Set(["lesson-0.2:guided-v1:risks"]),
            new Set()
          ),
          false
        )
      }
    }
  )
  check(
    "Debian default, optional Tails and physical safety preserve the offline boundary",
    () => {
      for (const data of [en]) {
        const find = (id) =>
          data.curriculumLessons.find((e) => e.lesson.id === id).lesson
        const signer = find("offline-device")
        const launch = signer.guidedSteps.find((s) => s.command).command
        assert.match(signer.referenceVersion, /Debian Stable/)
        assert.match(launch, /-networkactive=0 -listen=0/)
        assert.match(launch, /-signet/)
        assert.doesNotMatch(launch, /amnesia|Persistent/)
        assert.ok(signer.prerequisites.includes("ops-physical"))
        assert.equal(find("optional-tails").optional, true)
        assert.ok(
          find("optional-tails").prerequisites.includes("offline-recovery")
        )
        for (const { lesson } of data.curriculumLessons)
          assert.ok(!(lesson.prerequisites ?? []).includes("optional-tails"))
      }
    }
  )
  check(
    "Verification requires preparation and identity checks before executable launch",
    () => {
      for (const data of [en]) {
        const lesson = data.curriculumLessons.find(
          (e) => e.lesson.id === "signet-install-verify"
        ).lesson
        const steps = lesson.guidedSteps.map((s) => s.id)
        for (const id of [
          "tools-check",
          "tools-install",
          "folder",
          "hash",
          "builder-repo",
          "builder-import",
          "fingerprints",
          "signature",
        ])
          assert.ok(
            steps.indexOf(id) >= 0 &&
              steps.indexOf(id) < steps.indexOf("extract")
          )
        assert.equal(lesson.verification, "review-required")
        assert.equal(
          canCompleteLesson(
            lesson,
            new Set(requiredChecks(lesson)),
            new Set(lesson.prerequisites)
          ),
          false
        )
      }
    }
  )
  check("New procedures do not acquire a hands-on verification date", () => {
    for (const data of [en]) {
      assert.equal(data.CURRICULUM_VERSION, "3.1")
      for (const id of [
        "offline-device",
        "optional-tails",
        "ops-physical",
        "ops-routine",
      ]) {
        const lesson = data.curriculumLessons.find(
          (e) => e.lesson.id === id
        ).lesson
        assert.equal(lesson.contentUpdated, "2026-09-13")
        assert.equal(lesson.verification, "review-required")
        assert.notEqual(lesson.lastReviewed, "2026-09-13")
      }
    }
  })
  check(
    "Retired Croatian bookmarks reach the corresponding English lessons",
    () => {
      assert.equal(Object.keys(retiredLessonSlugs).length, 64)
      for (const [oldSlug, newSlug] of Object.entries(retiredLessonSlugs)) {
        assert.ok(en.findLessonBySlug(newSlug), newSlug)
        assert.equal(
          englishCurriculumDestination(
            "?from=bookmark",
            "#lesson/" + encodeURIComponent(oldSlug)
          ),
          "/en/bitcoin-core/self-custody/?from=bookmark#lesson/" +
            encodeURIComponent(newSlug)
        )
      }
      assert.equal(
        englishCurriculumDestination(),
        "/en/bitcoin-core/self-custody/"
      )
      assert.equal(
        englishCurriculumDestination("", "#lesson/0.2"),
        "/en/bitcoin-core/self-custody/#lesson/0.2"
      )
      assert.equal(
        englishCurriculumDestination("", "#lesson/%ZZ"),
        "/en/bitcoin-core/self-custody/#lesson/%ZZ"
      )
      assert.equal(
        englishCurriculumDestination("", "#lesson/https://example.com"),
        "/en/bitcoin-core/self-custody/#lesson/https%3A%2F%2Fexample.com"
      )
    }
  )
  console.log(
    `\n${checks} curriculum checks passed. These checks do not simulate Core, Debian, Tails or real transactions.`
  )
} finally {
  await rm(temporary, { recursive: true, force: true })
}
