import assert from "node:assert/strict"
import { mkdtemp, rm, readFile } from "node:fs/promises"
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
  const math = await bundle("src/curriculum-math.ts", "math")
  const migration = await bundle(
    "src/curriculum-progress-migration.ts",
    "migration"
  )
  const milestone = await bundle("src/curriculum-milestones.ts", "milestones")
  const v4 = JSON.parse(
    await readFile("src/curriculum/v4-progress-manifest.json", "utf8")
  )
  const {
    canCompleteLesson,
    effectiveCompletions,
    nextRequiredEntry,
    requiredChecks,
    resumeEntry,
    stepKey,
    readingKey,
    checklistKey,
  } = logic
  const entries = en.curriculumLessons,
    lessons = entries.map((e) => e.lesson),
    ids = lessons.map((l) => l.id)
  const find = (id) => {
    const l = lessons.find((l) => l.id === id)
    assert.ok(l, id)
    return l
  }
  const text = (l) => JSON.stringify(l)
  const ancestors = (id) => {
    const result = new Set()
    function visit(x) {
      for (const p of find(x).prerequisites ?? []) {
        if (!result.has(p)) {
          result.add(p)
          visit(p)
        }
      }
    }
    visit(id)
    return result
  }
  let checks = 0
  function check(name, fn) {
    fn()
    checks++
    console.log(`✓ ${name}`)
  }
  check(
    "87 unique lessons in three parts; 57 lessons on the foundation and single-sig path",
    () => {
      assert.equal(en.CURRICULUM_VERSION, "4.1")
      assert.deepEqual(
        en.curriculumPhases.map((p) => p.lessons.length),
        [18, 50, 19]
      )
      assert.equal(lessons.length, 87)
      assert.equal(new Set(ids).size, 87)
      assert.equal(new Set(lessons.map((l) => l.slug)).size, 87)
      assert.equal(en.primaryCurriculumLessons.length, 57)
      for (const e of entries) {
        assert.equal(en.findLessonBySlug(e.lesson.slug)?.lesson.id, e.lesson.id)
        assert.ok(e.lessonNumber.startsWith(`${Number(e.phase.id) + 1}.`))
      }
    }
  )
  check(
    "Prerequisites are acyclic and earlier; the main path never depends on optional work",
    () => {
      for (const l of lessons)
        for (const p of l.prerequisites ?? []) {
          assert.ok(
            ids.indexOf(p) >= 0 && ids.indexOf(p) < ids.indexOf(l.id),
            `${l.id} → ${p}`
          )
          if (!l.optional) assert.equal(find(p).optional, false)
        }
    }
  )
  check(
    "Every advanced lesson follows single-sig mastery, without requiring a mainnet deposit",
    () => {
      for (const l of en.curriculumPhases[2].lessons) {
        assert.equal(l.optional, true)
        assert.ok(ancestors(l.id).has("single-sig-mastery"), l.id)
        assert.ok(!ancestors(l.id).has("mainnet-small-test"))
      }
      assert.ok(ancestors("mainnet-small-test").has("real-restore"))
      assert.ok(ancestors("single-sig-mastery").has("offline-recovery"))
      assert.ok(ancestors("single-sig-mastery").has("recovery-failure-drills"))
    }
  )
  check(
    "All retained Croatian bookmarks redirect to available English lessons",
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
        englishCurriculumDestination("", "#lesson/%ZZ"),
        "/en/bitcoin-core/self-custody/#lesson/%ZZ"
      )
      assert.equal(
        englishCurriculumDestination("", "#lesson/https://example.com"),
        "/en/bitcoin-core/self-custody/#lesson/https%3A%2F%2Fexample.com"
      )
    }
  )
  check(
    "Legacy completion marks and every pre-v4 checkbox namespace cannot bypass the new course",
    () => {
      const marks = new Set(ids),
        old = new Set(
          lessons.flatMap((l) =>
            Array.from({ length: 30 }, (_, i) => `lesson-${l.id}:${i}`)
          )
        )
      for (const l of lessons)
        for (const version of [1, 2, 3]) {
          for (const s of l.guidedSteps ?? [])
            old.add(`lesson-${l.id}:guided-v${version}:${s.id}`)
          for (let i = 0; i < 30; i++) {
            old.add(`lesson-${l.id}:checklist-v${version}:${i}`)
            old.add(`lesson-${l.id}:reading-v${version}:${i}`)
          }
        }
      assert.equal(effectiveCompletions(lessons, marks, old).size, 0)
    }
  )
  check(
    "Every reading page must be acknowledged; guided steps and outcome checklists both count",
    () => {
      const reading = find("0.1"),
        checked = new Set(requiredChecks(reading))
      assert.equal(canCompleteLesson(reading, checked, new Set()), true)
      checked.delete(readingKey(reading.id, 1))
      assert.equal(canCompleteLesson(reading, checked, new Set()), false)
      for (const l of lessons.filter((l) => l.guidedSteps?.length)) {
        const all = new Set(requiredChecks(l)),
          prereqs = new Set(l.prerequisites)
        assert.equal(canCompleteLesson(l, all, prereqs), true, l.id)
        all.delete(stepKey(l.id, l.guidedSteps[0].id))
        assert.equal(canCompleteLesson(l, all, prereqs), false, l.id)
        if (l.checklist?.length) {
          all.add(stepKey(l.id, l.guidedSteps[0].id))
          all.delete(checklistKey(l.id, 0))
          assert.equal(canCompleteLesson(l, all, prereqs), false, l.id)
        }
      }
    }
  )
  check(
    "Review-required and planned material cannot be completed; source review does not imply a physical test",
    () => {
      const l = find("offline-device"),
        checks = new Set(requiredChecks(l)),
        prereqs = new Set(l.prerequisites)
      assert.equal(l.verification, "source-reviewed")
      assert.equal(l.lastReviewed, undefined)
      assert.equal(l.practicalReview, undefined)
      for (const verification of ["review-required", "planned"])
        assert.equal(
          canCompleteLesson({ ...l, verification }, checks, prereqs),
          false
        )
      assert.equal(
        canCompleteLesson({ ...l, status: "draft" }, checks, prereqs),
        false
      )
      assert.equal(
        canCompleteLesson(
          { ...l, guidedSteps: [], checklist: [] },
          new Set(),
          prereqs
        ),
        false
      )
      assert.match(find("1.2").practicalReview.scope, /2\.5\.4/)
    }
  )
  check(
    "With all declared results, all 87 lessons are reachable; removing foundation results revokes downstream completion",
    () => {
      const marks = new Set(ids),
        checks = new Set(lessons.flatMap(requiredChecks))
      assert.equal(effectiveCompletions(lessons, marks, checks).size, 87)
      checks.delete(readingKey("0.1", 0))
      assert.equal(effectiveCompletions(lessons, marks, checks).size, 0)
    }
  )
  check(
    "Transitive completion works independently of array order and is revoked when an observed result is withdrawn",
    () => {
      const a = {
        id: "a",
        kind: "practice",
        status: "published",
        verification: "source-reviewed",
        checklist: ["Observed result"],
      }
      const b = { ...a, id: "b", prerequisites: ["a"] },
        c = { ...a, id: "c", kind: "checkpoint", prerequisites: ["b"] }
      const list = [c, b, a],
        marks = new Set(["a", "b", "c"]),
        checks = new Set(list.flatMap(requiredChecks))
      assert.equal(effectiveCompletions(list, marks, checks).size, 3)
      checks.delete(requiredChecks(a)[0])
      assert.equal(effectiveCompletions(list, marks, checks).size, 0)
    }
  )
  check(
    "Resume chooses the first unfinished required lesson; optional advanced navigation proceeds in sequence",
    () => {
      assert.equal(resumeEntry(entries, new Set()).lesson.id, "0.1")
      const first = ids.indexOf("signet-receive-send")
      assert.equal(
        resumeEntry(entries, new Set(ids.slice(0, first))).lesson.id,
        "signet-receive-send"
      )
      assert.equal(
        resumeEntry(
          entries,
          new Set(en.primaryCurriculumLessons.map((e) => e.lesson.id))
        ),
        null
      )
      assert.equal(nextRequiredEntry(entries, -1), null)
      assert.equal(
        nextRequiredEntry(entries, ids.indexOf("multisig-why")).lesson.id,
        "multi-vendor-cost"
      )
      assert.equal(
        nextRequiredEntry(entries, ids.indexOf("single-sig-mastery")),
        null
      )
      assert.equal(nextRequiredEntry(entries, entries.length - 1), null)
    }
  )
  check(
    "Every lesson has a purpose, failure mode, takeaway and source review; every guided command has context",
    () => {
      for (const l of lessons) {
        for (const key of [
          "title",
          "summary",
          "why",
          "risk",
          "takeaway",
          "chapter",
          "sourceReviewed",
          "reviewNote",
        ])
          assert.ok(l[key], `${l.id}/${key}`)
        assert.ok(l.explanation?.length, l.id)
        assert.ok(l.sources?.length, l.id)
        const steps = l.guidedSteps ?? []
        assert.equal(new Set(steps.map((s) => s.id)).size, steps.length)
        for (const s of steps) {
          assert.ok(
            s.title && s.instructions.length && s.expectedResult && s.help,
            `${l.id}/${s.id}`
          )
          if (s.command) assert.ok(s.commandContext)
        }
        if (l.kind === "checkpoint") assert.ok(l.checklist?.length >= 2, l.id)
      }
    }
  )
  check(
    "Threat modelling precedes products; Debian is the default and Tails and VeraCrypt are optional",
    () => {
      assert.ok(ids.indexOf("0.2") < ids.indexOf("1.1"))
      assert.ok(
        ids.indexOf("foundations-checkpoint") < ids.indexOf("debian-setup")
      )
      assert.match(find("offline-device").referenceVersion, /Debian Stable/)
      assert.match(text(find("offline-device")), /-networkactive=0 -listen=0/)
      assert.ok(
        find("offline-device").guidedSteps.some((s) => s.id === "coldboot")
      )
      for (const id of [
        "optional-tails",
        "optional-veracrypt",
        "optional-dice",
      ]) {
        assert.equal(find(id).optional, true)
        for (const l of lessons.filter((l) => !l.optional))
          assert.ok(!ancestors(l.id).has(id))
      }
      assert.ok(ids.indexOf("wallet-lock-change") < ids.indexOf("lab-rpc"))
    }
  )
  check(
    "Release identity and signature checks precede executable launch; GUI recovery names the restore action",
    () => {
      const steps = find("signet-install-verify").guidedSteps.map((s) => s.id)
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
            steps.indexOf(id) < steps.indexOf("extract"),
          id
        )
      assert.match(text(find("signet-restore")), /File → Restore Wallet/)
      assert.match(
        text(find("wallet-lock-change")),
        /does not have a general-purpose Unlock Wallet/
      )
    }
  )
  check(
    "Current incident and entropy cases retain their boundaries and Core Explorer has no private installation link",
    () => {
      assert.match(text(find("1.1")), /ActiveCampaign/)
      assert.match(text(find("1.1")), /not a compromise of the BitBox02/)
      assert.match(text(find("1.2")), /2\.5\.4/)
      assert.match(text(find("1.2")), /checksum/)
      assert.match(text(find("signet-entropy-deep-dive")), /GetStrongRandBytes/)
      assert.ok(
        !text(find("core-explorer")).includes(
          "https://github.com/btcpavao/core-explorer"
        )
      )
      assert.match(text(find("core-explorer")), /private/)
      assert.ok(ancestors("core-explorer").has("advanced-mastery"))
    }
  )
  check(
    "Default entropy uses the packaged 7772-entry list; original EFF remains an explicit optional calculation",
    () => {
      assert.equal(math.EFF_WORD_COUNT, 7776)
      assert.equal(math.KEEPASS_WORD_COUNT, 7772)
      for (const [n, bits] of [
        [1, 12.924070185585345],
        [5, 64.62035092792672],
        [6, 77.54442111351207],
        [8, 103.39256148468276],
      ]) {
        const r = math.wordEntropy(n)
        assert.ok(Math.abs(r.bits - bits) < 1e-10)
        assert.equal(r.possibilities, 7772 ** n)
      }
      assert.ok(
        Math.abs(math.wordEntropy(8, 7776).bits - 103.39850002884624) < 1e-10
      )
      assert.ok(math.wordEntropy(8).bits < math.wordEntropy(8, 7776).bits)
      for (const invalid of [0, -1, 25, 1.5, NaN, Infinity])
        assert.throws(() => math.wordEntropy(invalid), RangeError)
    }
  )
  check(
    "Attack economics has separate half/full search, electricity and rental; higher rate halves time at fixed power",
    () => {
      const a = math.attackModel(5, 1e9, 1000, 0.1, 1000),
        b = math.attackModel(5, 2e9, 1000, 0.1, 1000)
      assert.equal(a.fullSeconds, 2 * a.averageSeconds)
      assert.equal(a.averageSeconds, 2 * b.averageSeconds)
      assert.equal(a.averageKwh, (a.averageSeconds / 3600) * 1000)
      assert.equal(a.averageElectricityCost, a.averageKwh * 0.1)
      assert.equal(a.averageComputeCost, (a.averageSeconds / 3600) * 1000)
      assert.equal(math.attackModel(8, 1, 0, 0, 0).averageElectricityCost, 0)
      for (const args of [
        [8, 0, 1, 1, 1],
        [8, -1, 1, 1, 1],
        [8, 1, -1, 1, 1],
        [8, 1, 1, NaN, 1],
        [8, 1, 1, 1, Infinity],
      ])
        assert.throws(() => math.attackModel(...args), RangeError)
    }
  )

  check(
    "All 85 existing English IDs and bookmarks survive the refinement",
    () => {
      assert.equal(v4.length, 85)
      for (const old of v4)
        assert.equal(en.findLessonBySlug(old.slug)?.lesson.id, old.id)
    }
  )
  check(
    "One-wallet recovery precedes the new mastery gate and every second-computer lesson",
    () => {
      const order = [
        "real-device",
        "debian-setup",
        "signet-install-verify",
        "signet-start",
        "signet-first-wallet",
        "generate-passphrase",
        "signet-encrypt-new-backup",
        "signet-receive-send",
        "coin-control-fees",
        "signet-restore",
        "signet-transact-again",
        "wallet-lock-change",
        "repetition-drills",
        "recovery-failure-drills",
        "backup-mastery",
        "one-wallet-mastery",
        "architecture-choice",
        "offline-device",
        "watch-only-setup",
        "offline-psbt",
        "offline-recovery",
        "single-sig-mastery",
      ]
      for (let i = 1; i < order.length; i++)
        assert.ok(ids.indexOf(order[i - 1]) < ids.indexOf(order[i]), order[i])
      assert.equal(find("one-wallet-mastery").checklist.length, 12)
      for (const id of [
        "architecture-choice",
        "2.4",
        "offline-device",
        "offline-psbt",
        "offline-recovery",
      ])
        assert.ok(ancestors(id).has("one-wallet-mastery"))
      const stageA = en.curriculumPhases[1].lessons.slice(
        0,
        en.curriculumPhases[1].lessons.findIndex(
          (l) => l.id === "one-wallet-mastery"
        )
      )
      for (const l of stageA)
        assert.doesNotMatch(
          JSON.stringify([
            l.summary,
            l.explanation,
            l.guidedSteps,
            l.checklist,
          ]),
          /two-computer|second (physical )?(computer|machine)|watch-only/,
          l.id
        )
      assert.doesNotMatch(
        text(find("recovery-failure-drills")),
        /second-machine-v4/
      )
      assert.match(
        text(find("repetition-drills")),
        /CREATE → ENCRYPT → BACK UP → RECEIVE → SPEND → RESTORE → CHANGE PASSWORD → RESTORE AGAIN/
      )
    }
  )
  check(
    "Ten milestones expose every required step; optional content never reduces main-path completion",
    () => {
      const groups = milestone.curriculumMilestones(en.curriculumPhases)
      assert.equal(groups.length, 10)
      assert.deepEqual(
        groups.map((g) => g.phaseId),
        ["0", "0", "0", "1", "1", "1", "1", "1", "1", "1"]
      )
      assert.deepEqual(
        groups.flatMap((g) => g.lessons.map((l) => l.id)),
        en.primaryCurriculumLessons.map((e) => e.lesson.id)
      )
      const main = new Set(en.primaryCurriculumLessons.map((e) => e.lesson.id))
      assert.equal(
        milestone.milestoneProgress(groups, main).filter((g) => g.complete)
          .length,
        10
      )
      assert.equal(
        milestone
          .milestoneProgress(
            groups,
            new Set(lessons.filter((l) => l.optional).map((l) => l.id))
          )
          .filter((g) => g.complete).length,
        0
      )
      main.delete("one-wallet-mastery")
      const recovery = milestone
        .milestoneProgress(groups, main)
        .find((g) => g.title === "Prove backup and recovery")
      assert.equal(recovery.complete, false)
      assert.equal(recovery.done, recovery.total - 1)
      assert.equal(
        nextRequiredEntry(entries, ids.indexOf("generate-passphrase")).lesson
          .id,
        "signet-encrypt-new-backup"
      )
      assert.match(
        text(find("single-sig-mastery")),
        /you do not need a more complex spending policy/
      )
    }
  )
  check(
    "V4 migration preserves earned work and requires new evidence without erasing bookmarks or stored checks",
    () => {
      const oldMarks = new Set(v4.map((l) => l.id)),
        oldChecks = new Set(v4.flatMap((l) => l.checks))
      const snapshot = migration.validatedV4Completions(oldMarks, oldChecks)
      assert.equal(snapshot.size, 85)
      const retained = migration.retainedV4Completions(
        snapshot,
        oldMarks,
        oldChecks
      )
      const completed = effectiveCompletions(
        lessons,
        oldMarks,
        oldChecks,
        retained
      )
      const missingOld = v4.filter((l) => !completed.has(l.id)).map((l) => l.id)
      assert.deepEqual(missingOld, [
        "architecture-choice",
        "passphrase-strength",
        "brute-force-economics",
        "generate-passphrase",
        "repetition-drills",
      ])
      assert.ok(completed.has("offline-recovery"))
      assert.ok(!completed.has("one-wallet-mastery"))
      assert.equal(
        resumeEntry(entries, completed).lesson.id,
        "passphrase-strength"
      )
      assert.ok(oldChecks.has("lesson-generate-passphrase:guided-v4:method-v4"))
      assert.ok(
        !oldChecks.has(
          "lesson-generate-passphrase:guided-v4:keepass-bundled-v41"
        )
      )
      // New visitors cannot acquire retrospective credit as they work through v4.1.
      assert.equal(
        migration.retainedV4Completions(new Set(), oldMarks, oldChecks).size,
        0
      )
      oldChecks.delete("lesson-0.1:reading-v4:0")
      assert.equal(
        migration.retainedV4Completions(snapshot, oldMarks, oldChecks).size,
        0
      )
      assert.equal(
        effectiveCompletions(
          lessons,
          oldMarks,
          oldChecks,
          migration.retainedV4Completions(snapshot, oldMarks, oldChecks)
        ).size,
        0
      )
      assert.equal(oldMarks.size, 85)
      assert.equal(
        migration.validatedV4Completions(oldMarks, new Set()).size,
        0
      )
    }
  )
  check(
    "The packaged KeePassXC workflow is the default; dice are isolated and the eight-word setting is not a minimum",
    () => {
      const gen = find("generate-passphrase")
      assert.match(text(gen), /2\.7\.10\+dfsg1-1/)
      assert.match(text(gen), /Botan::System_RNG/)
      assert.match(text(gen), /\/dev\/urandom/)
      assert.match(text(gen), /4,656/)
      assert.match(text(gen), /552,620/)
      assert.match(text(gen), /CSPRNG/)
      assert.match(text(gen.guidedSteps), /\(SYSTEM\) eff_large\.wordlist/)
      assert.doesNotMatch(text(gen.guidedSteps), /custom wordlist|roll a fair/)
      assert.match(
        text(find("passphrase-strength")),
        /not a cryptographic minimum/
      )
      assert.match(text(find("optional-dice")), /40 readings/)
      assert.equal(find("optional-dice").optional, true)
      // The exact rejection interval in reviewed Random.cpp has equal buckets.
      const limit = math.KEEPASS_WORD_COUNT,
        max = 2 ** 32 - 1,
        ceiling = max - (max % limit) - 1
      assert.equal((ceiling + 1) % limit, 0)
      assert.equal((ceiling + 1) / limit, 552620)
      assert.equal(2 ** 32 - (ceiling + 1), 4656)
    }
  )

  const lab = await readFile(
    "public/curriculum-labs/core-31.1-regtest.py",
    "utf8"
  )
  check(
    "Downloadable lab pins Core 31.1 and creates explicit disposable directories with no peer networking",
    () => {
      assert.match(lab, /310100/)
      assert.match(lab, /mkdtemp/)
      assert.match(lab, /-datadir=/)
      assert.match(lab, /-regtest/)
      assert.match(lab, /-networkactive=0/)
      assert.match(lab, /testmempoolaccept/)
      assert.match(lab, /older\(6\)/)
      assert.match(lab, /reindex/)
      assert.doesNotMatch(lab, /rmtree|unlink\(/)
    }
  )
  console.log(
    `\n${checks} curriculum checks passed. UI and real Core integration are verified separately; these checks do not certify physical Debian or air-gap setup.`
  )
} finally {
  await rm(temporary, { recursive: true, force: true })
}
