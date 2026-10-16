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
  const preferences = await bundle("src/passphrase-preferences.ts", "preferences")
  const migration = await bundle(
    "src/curriculum-progress-migration.ts",
    "migration"
  )
  const milestone = await bundle("src/curriculum-milestones.ts", "milestones")
  const v4 = JSON.parse(
    await readFile("src/curriculum/v4-progress-manifest.json", "utf8")
  )
  const v41 = JSON.parse(
    await readFile("src/curriculum/v4.1-progress-manifest.json", "utf8")
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
    "98 unique lessons in three parts; 67 lessons on the foundation and single-sig path",
    () => {
      assert.equal(en.CURRICULUM_VERSION, "4.3")
      assert.deepEqual(
        en.curriculumPhases.map((p) => p.lessons.length),
        [27, 51, 20]
      )
      assert.equal(lessons.length, 98)
      assert.equal(new Set(ids).size, 98)
      assert.equal(new Set(lessons.map((l) => l.slug)).size, 98)
      assert.equal(en.primaryCurriculumLessons.length, 67)
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
    "With all declared results, all 98 lessons are reachable; removing foundation results revokes downstream completion",
    () => {
      const marks = new Set(ids),
        checks = new Set(lessons.flatMap(requiredChecks))
      assert.equal(effectiveCompletions(lessons, marks, checks).size, 98)
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
      const six = math.attackModel(6, math.WALLET_BENCHMARK_RATE, 0, 0, math.GPU_RENTAL_PER_HOUR)
      const eight = math.attackModel(8, math.WALLET_BENCHMARK_RATE, 0, 0, math.GPU_RENTAL_PER_HOUR)
      assert.ok(Math.abs(six.averageSeconds / math.SECONDS_PER_YEAR / 106201580488.30782 - 1) < 1e-12)
      assert.ok(Math.abs(eight.averageComputeCost / six.averageComputeCost / 60403984 - 1) < 1e-12)
      assert.equal(math.fullNumber(six.averageComputeCost), "829,000,000,000,000")
      assert.equal(math.fullNumber(eight.averageComputeCost), "50,000,000,000,000,000,000,000")
      assert.equal(math.namedNumber(six.averageComputeCost), "eight hundred twenty-nine trillion")
      assert.equal(math.namedNumber(eight.averageComputeCost), "fifty sextillion")
      assert.equal(math.fullNumber(0.89), "0.89")

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

  check("Parallel GPUs reduce elapsed time without changing total work or cost", () => {
    const near = (actual, expected) => assert.ok(Math.abs(actual / expected - 1) < 1e-12)
    for (const words of [6, 8]) {
      const baseline = math.attackModel(words, 32880, 0.55, 0.15, 0.89)
      for (const count of [1, 10, 1000, 1000000]) {
        const parallel = math.parallelAttackModel(words, count, 32880, 0.55, 0.15, 0.89)
        near(parallel.averageSeconds * count, baseline.averageSeconds)
        near(parallel.fullSeconds, parallel.averageSeconds * 2)
        near(parallel.totalGuessesPerSecond, 32880 * count)
        near(parallel.totalPowerKw, 0.55 * count)
        near(parallel.totalRentalPerHour, 0.89 * count)
        near(parallel.averageGpuHours, parallel.averageSeconds / 3600 * count)
        near(parallel.averageComputeCost, parallel.averageSeconds / 3600 * parallel.totalRentalPerHour)
        near(parallel.averageElectricityCost, parallel.averageSeconds / 3600 * parallel.totalPowerKw * 0.15)
        assert.equal(parallel.averageComputeCost, baseline.averageComputeCost)
        assert.equal(parallel.averageKwh, baseline.averageKwh)
        assert.equal(parallel.averageElectricityCost, baseline.averageElectricityCost)
      }
    }
    const six = math.parallelAttackModel(6, 1000, 32880, 0.55, 0.15, 0.89)
    const eight = math.parallelAttackModel(8, 1000, 32880, 0.55, 0.15, 0.89)
    near(six.averageSeconds / math.SECONDS_PER_YEAR, 106201580.48830782)
    near(eight.averageSeconds / math.SECONDS_PER_YEAR, 6414998568590458)
    near(eight.averageSeconds / six.averageSeconds, 60403984)
    for (const count of [0, -1, 1.5, 1000001, NaN, Infinity])
      assert.throws(() => math.parallelAttackModel(6, count, 32880, 0.55, 0.15, 0.89), RangeError)
    assert.equal(math.fullNumber(0.0000001234), "0.000000123")
    assert.equal(math.namedNumber(0.0000001234), "zero point zero zero zero zero zero zero one two three")
    assert.equal(math.namedNumber(999999), "one million")
    assert.equal(math.namedNumber(1e27), "one octillion")
    assert.equal(math.fullNumber(5e22), "50,000,000,000,000,000,000,000")
  })

  check("Word-count slider model agrees with integer search spaces and independent decimal references", () => {
    const near = (actual, expected) => assert.ok(Math.abs(actual / expected - 1) < 1e-12, `${actual} ≠ ${expected}`)
    for (const listSize of [7772, 7776]) {
      for (let words = 1; words <= 12; words++) {
        const space = Number(BigInt(listSize) ** BigInt(words))
        for (const count of [1, 1000, 1000000]) {
          const model = math.parallelAttackModel(words, count, 32880, 0.55, 0.15, 0.89, listSize)
          near(model.possibilities, space)
          near(model.bits, Math.log2(space))
          near(model.averageSeconds, space / (2 * count * 32880))
          near(model.averageComputeCost, space * 0.89 / (2 * 32880 * 3600))
          assert.doesNotMatch(math.fullNumber(model.averageComputeCost), /e[+-]/i)
          assert.doesNotMatch(math.namedNumber(model.averageComputeCost), /undefined|NaN|e[+-]/i)
          if (words < 12) {
            const next = math.parallelAttackModel(words + 1, count, 32880, 0.55, 0.15, 0.89, listSize)
            near(next.averageSeconds / model.averageSeconds, listSize)
            near(next.averageComputeCost / model.averageComputeCost, listSize)
          }
        }
      }
    }
    // Python Decimal, 60-digit precision; EFF original list, three words.
    const three = math.parallelAttackModel(3, 1, 32880, 0.55, 0.15, 0.89, 7776)
    near(three.bits, 38.7744375108173427218060841592)
    near(three.averageSeconds, 7150014.97226277372262773722628)
    near(three.averageComputeCost, 1767.64259036496350364963503650)
    assert.equal(math.fullNumber(three.averageComputeCost), "1,770")
    assert.equal(math.namedNumber(three.averageComputeCost), "one point seven seven thousand")
    near(math.parallelAttackModel(3, 1000, 32880, 0.55, 0.15, 0.89, 7776).averageSeconds / 3600, 1.986115270072992700729927)
    near(math.parallelAttackModel(3, 1, 65760, 0.55, 0.15, 0.89, 7776).averageComputeCost, three.averageComputeCost / 2)
    near(math.parallelAttackModel(3, 1, 32880, 0.55, 0.15, 1.78, 7776).averageComputeCost, three.averageComputeCost * 2)
    assert.equal(math.parallelAttackModel(3, 1, 32880, 0, 0, 0, 7776).averageComputeCost, 0)
    for (const size of [0, 1, 1.5, NaN, Infinity])
      assert.throws(() => math.parallelAttackModel(3, 1, 32880, 0.55, 0.15, 0.89, size), RangeError)
  })

  check("Calculator preferences restore, synchronize and reset without changing course progress", () => {
    const key = preferences.PASSPHRASE_PREFERENCES_KEY
    const defaults = preferences.DEFAULT_PASSPHRASE_PREFERENCES
    for (const raw of [null, "broken", "null", "[]", '{"version":2,"settings":{"words":8}}'])
      assert.deepEqual(preferences.parsePassphrasePreferences(raw), defaults)
    assert.deepEqual(preferences.parsePassphrasePreferences(JSON.stringify({version: 1, settings: {
      words: 25, listSize: 10, gpus: "1.5", rate: "0", power: "-1", energy: "Infinity", compute: "",
    }})), defaults)
    const settings = {words: 8, listSize: 7776, gpus: "25", rate: "40000", power: "0.8", energy: "0.2", compute: "1.25"}
    const memory = new Map([[key, JSON.stringify({version: 1, settings})], ["course-progress-test", "keep"]])
    const events = new Map()
    let writes = 0, notifications = 0, unavailable = false
    const originalWindow = globalThis.window
    globalThis.window = {
      location: new URL("https://btcpavao.com/en/bitcoin-core/self-custody/#lesson/passphrase-strength"),
      localStorage: {
        getItem: (k) => { if (unavailable) throw Error("blocked"); return memory.get(k) ?? null },
        setItem: (k, v) => { if (unavailable) throw Error("blocked"); writes++; memory.set(k, v) },
        removeItem: (k) => { if (unavailable) throw Error("blocked"); memory.delete(k) },
      },
      addEventListener: (type, listener) => events.set(type, listener),
      removeEventListener: (type) => events.delete(type),
    }
    let unsubscribe = () => {}
    try {
      assert.equal(preferences.getServerPassphraseSnapshot(), preferences.DEFAULT_PASSPHRASE_SNAPSHOT)
      unsubscribe = preferences.subscribePassphrasePreferences(() => notifications++)
      assert.deepEqual(preferences.getPassphraseSnapshot().settings, settings)
      assert.equal(writes, 0, "Hydration must not overwrite saved settings")
      preferences.updatePassphrasePreference("gpus", "1000")
      preferences.updatePassphrasePreference("words", 3)
      assert.equal(notifications, 2)
      assert.equal(JSON.parse(memory.get(key)).settings.gpus, "1000")
      preferences.updatePassphrasePreference("gpus", "")
      assert.equal(preferences.getPassphraseSnapshot().settings.gpus, "")
      assert.equal(JSON.parse(memory.get(key)).settings.gpus, "1000", "Do not persist incomplete numeric drafts")
      unsubscribe()
      unsubscribe = preferences.subscribePassphrasePreferences(() => notifications++)
      assert.equal(preferences.getPassphraseSnapshot().settings.gpus, "1000")
      assert.equal(preferences.getPassphraseSnapshot().settings.words, 3)
      memory.set(key, JSON.stringify({version: 1, settings}))
      events.get("storage")({key})
      assert.deepEqual(preferences.getPassphraseSnapshot().settings, settings)
      memory.set(key, JSON.stringify({version: 1, settings: {...settings, words: 9}}))
      events.get("pageshow")({persisted: true})
      assert.equal(preferences.getPassphraseSnapshot().settings.words, 9)
      preferences.resetPassphrasePreferences()
      assert.deepEqual(preferences.getPassphraseSnapshot().settings, defaults)
      assert.equal(memory.has(key), false)
      assert.equal(memory.get("course-progress-test"), "keep")
      assert.deepEqual(preferences.getServerPassphraseSnapshot().settings, defaults)
      unavailable = true
      preferences.updatePassphrasePreference("words", 8)
      assert.equal(preferences.getPassphraseSnapshot().settings.words, 8)
      assert.equal(preferences.getPassphraseSnapshot().storageAvailable, false)
      assert.doesNotThrow(() => preferences.resetPassphrasePreferences())
      unsubscribe()
      unsubscribe = preferences.subscribePassphrasePreferences(() => notifications++)
      assert.equal(preferences.getPassphraseSnapshot().storageAvailable, false)
    } finally {
      unsubscribe()
      if (originalWindow === undefined) delete globalThis.window
      else globalThis.window = originalWindow
    }
  })

  check("Example links round-trip every setting and reject damaged or incomplete examples", () => {
    const settings = {words: 3, listSize: 7776, gpus: "25", rate: "40000", power: "0.8", energy: "0.2", compute: "1.25"}
    for (const hash of ["#lesson/passphrase-strength", "#lesson/brute-force-economics", "#step-4"]) {
      const url = new URL(preferences.createPassphraseLink(`https://btcpavao.com/en/bitcoin-core/self-custody/?keep=yes${hash}`, settings))
      assert.deepEqual(preferences.parsePassphraseLink(url), settings)
      assert.equal(url.searchParams.get("keep"), "yes")
      assert.equal(url.hash, hash.startsWith("#lesson/") ? hash : "#passphrase-calculator")
    }
    const valid = new URL(preferences.createPassphraseLink("https://btcpavao.com/", settings))
    for (const value of ["", "2,3,7776,25,40000,0.8,0.2,1.25", "1,3,7776", "1,13,7776,25,40000,0.8,0.2,1.25", "1,3,7776,1.5,40000,0.8,0.2,1.25", "1,3,7776,25,NaN,0.8,0.2,1.25", "1,3,7776,25,40000,-1,0.2,1.25", "1,3,7776,25,40000,0.8,0.2,", "1,3,7776,25,40000,0.8,0.2,Infinity"]) {
      const damaged = new URL(valid)
      damaged.searchParams.set("calculator", value)
      assert.equal(preferences.parsePassphraseLink(damaged), null)
    }
    valid.searchParams.append("calculator", valid.searchParams.get("calculator"))
    assert.equal(preferences.parsePassphraseLink(valid), null)
    assert.throws(() => preferences.createPassphraseLink("https://btcpavao.com/", {...settings, gpus: ""}), RangeError)
  })

  check("Shared examples override remembered settings once, survive navigation, and can be reset", () => {
    const key = preferences.PASSPHRASE_PREFERENCES_KEY
    const defaults = preferences.DEFAULT_PASSPHRASE_PREFERENCES
    const settings = {words: 3, listSize: 7776, gpus: "25", rate: "40000", power: "0.8", energy: "0.2", compute: "1.25"}
    const base = "https://btcpavao.com/en/bitcoin-core/self-custody/?keep=yes#lesson/passphrase-strength"
    const sharedUrl = preferences.createPassphraseLink(base, settings)
    const memory = new Map([[key, JSON.stringify({version: 1, settings: defaults})], ["course-progress-test", "keep"]])
    const events = new Map()
    const originalWindow = globalThis.window
    let unavailable = false
    globalThis.window = {
      location: new URL(sharedUrl),
      history: {state: {keep: true}, replaceState: (state, _, href) => {
        assert.deepEqual(state, {keep: true})
        globalThis.window.location = new URL(href)
      }},
      localStorage: {
        getItem: (k) => { if (unavailable) throw Error("blocked"); return memory.get(k) ?? null },
        setItem: (k, v) => { if (unavailable) throw Error("blocked"); memory.set(k, v) },
        removeItem: (k) => { if (unavailable) throw Error("blocked"); memory.delete(k) },
      },
      addEventListener: (type, listener) => events.set(type, listener),
      removeEventListener: (type) => events.delete(type),
    }
    let unsubscribe = () => {}
    try {
      unsubscribe = preferences.subscribePassphrasePreferences(() => {})
      assert.deepEqual(preferences.getPassphraseSnapshot().settings, settings)
      assert.deepEqual(JSON.parse(memory.get(key)).settings, settings)
      assert.equal(window.location.href, base, "Consume only calculator parameters; retain route and other parameters")
      const firstArrival = preferences.getPassphraseSnapshot().sharedExample
      assert.equal(firstArrival.href, base)
      assert.ok(firstArrival.expiresAt > Date.now())
      assert.ok(firstArrival.expiresAt <= Date.now() + 8000)
      unsubscribe()
      unsubscribe = preferences.subscribePassphrasePreferences(() => {})
      assert.equal(preferences.getPassphraseSnapshot().sharedExample, firstArrival, "Immediate React remount retains the arrival")
      preferences.updatePassphrasePreference("words", 8)
      assert.equal(preferences.getPassphraseSnapshot().sharedExample, null, "Editing clears the arrival message")
      unsubscribe()
      unsubscribe = preferences.subscribePassphrasePreferences(() => {})
      assert.equal(preferences.getPassphraseSnapshot().settings.words, 8)
      window.location = new URL(sharedUrl)
      events.get("popstate")({})
      assert.deepEqual(preferences.getPassphraseSnapshot().settings, settings)
      const nextArrival = preferences.getPassphraseSnapshot().sharedExample
      assert.notEqual(nextArrival.id, firstArrival.id)
      preferences.dismissSharedExample(firstArrival.id)
      assert.equal(preferences.getPassphraseSnapshot().sharedExample, nextArrival, "An old timer cannot dismiss a newer example")
      preferences.dismissSharedExample(nextArrival.id)
      assert.equal(preferences.getPassphraseSnapshot().sharedExample, null)
      assert.deepEqual(preferences.getPassphraseSnapshot().settings, settings, "Dismissing the message preserves the example")
      preferences.resetPassphrasePreferences()
      unsubscribe()
      unsubscribe = preferences.subscribePassphrasePreferences(() => {})
      assert.deepEqual(preferences.getPassphraseSnapshot().settings, defaults)
      assert.equal(preferences.getPassphraseSnapshot().sharedExample, null)
      assert.equal(memory.get("course-progress-test"), "keep")
      window.location = new URL(base)
      window.location.searchParams.set("calculator", "1,3,7776")
      events.get("popstate")({})
      assert.deepEqual(preferences.getPassphraseSnapshot().settings, defaults)
      assert.equal(memory.has(key), false)
      assert.equal(preferences.getPassphraseSnapshot().sharedExample, null, "Malformed links never announce loaded settings")
      unavailable = true
      window.location = new URL(sharedUrl)
      events.get("popstate")({})
      assert.deepEqual(preferences.getPassphraseSnapshot().settings, settings)
      assert.equal(preferences.getPassphraseSnapshot().storageAvailable, false)
      assert.doesNotThrow(() => preferences.resetPassphrasePreferences())
    } finally {
      unsubscribe()
      if (originalWindow === undefined) delete globalThis.window
      else globalThis.window = originalWindow
    }
  })

  check(
    "All 85 existing English IDs and bookmarks survive the refinement",
    () => {
      assert.equal(v4.length, 85)
      for (const old of v4)
        assert.equal(en.findLessonBySlug(old.slug)?.lesson.id, old.id === "optional-dice" ? "generate-passphrase" : old.id)
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
    "Twelve milestones expose every required step; optional content never reduces main-path completion",
    () => {
      const groups = milestone.curriculumMilestones(en.curriculumPhases)
      assert.equal(groups.length, 12)
      assert.deepEqual(
        groups.map((g) => g.phaseId),
        ["0", "0", "0", "0", "0", "1", "1", "1", "1", "1", "1", "1"]
      )
      assert.deepEqual(
        groups.flatMap((g) => g.lessons.map((l) => l.id)),
        en.primaryCurriculumLessons.map((e) => e.lesson.id)
      )
      const main = new Set(en.primaryCurriculumLessons.map((e) => e.lesson.id))
      assert.equal(
        milestone.milestoneProgress(groups, main).filter((g) => g.complete)
          .length,
        12
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
        "foundations-checkpoint",
        "architecture-choice",
        "debian-setup",
        "passphrase-strength",
        "brute-force-economics",
        "generate-passphrase",
        "repetition-drills",
        "multisig-signet",
        "advanced-mastery",
      ])
      assert.ok(completed.has("offline-recovery"))
      assert.ok(!completed.has("one-wallet-mastery"))
      assert.equal(
        resumeEntry(entries, completed).lesson.id,
        "trust-and-verification"
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
    "KeePassXC uses six words by default, eight for extra margin; retired dice links resolve to that workflow",
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
      assert.ok(!ids.includes("optional-dice"))
      assert.doesNotMatch(text(lessons), /physical dice|dice rolling|roll a fair/i)
      assert.match(text(gen.guidedSteps), /Word Count to 6/)
      assert.match(text(gen), /77\.54 bits/)
      assert.match(text(gen), /103\.39 bits/)
      assert.equal(en.findLessonBySlug("optional-physical-dice-passphrase")?.lesson.id, "generate-passphrase")
      // The exact rejection interval in reviewed Random.cpp has equal buckets.
      const limit = math.KEEPASS_WORD_COUNT,
        max = 2 ** 32 - 1,
        ceiling = max - (max % limit) - 1
      assert.equal((ceiling + 1) % limit, 0)
      assert.equal((ceiling + 1) / limit, 552620)
      assert.equal(2 ** 32 - (ceiling + 1), 4656)
    }
  )

  check(
    "V4.1 credit survives new prerequisites without awarding new skills",
    () => {
      const oldMarks = new Set(v41.map((l) => l.id))
      const oldChecks = new Set(v41.flatMap((l) => l.checks))
      const snapshot = migration.validatedV41Completions(oldMarks, oldChecks)
      assert.equal(snapshot.size, 87)
      const retained = migration.retainedV41Completions(
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
      for (const id of [
        "offline-recovery",
        "single-sig-mastery",
        "mainnet-small-test",
      ])
        assert.ok(completed.has(id), id)
      for (const id of [
        "trust-and-verification",
        "linux-playground",
        "basic-rpc",
        "move-to-real-bitcoin",
        "complexity-after-the-lab",
      ])
        assert.ok(!completed.has(id), id)
      assert.equal(
        resumeEntry(entries, completed).lesson.id,
        "trust-and-verification"
      )
      assert.ok(!completed.has("debian-setup"))
      assert.ok(!completed.has("foundations-checkpoint"))
      assert.ok(!completed.has("multisig-signet"))
      assert.equal(
        migration.retainedV41Completions(new Set(), oldMarks, oldChecks).size,
        0
      )
      for (const old of v41)
        assert.equal(en.findLessonBySlug(old.slug)?.lesson.id, old.id === "optional-dice" ? "generate-passphrase" : old.id)
      oldChecks.delete(readingKey("0.1", 0))
      assert.equal(
        migration.retainedV41Completions(snapshot, oldMarks, oldChecks).size,
        0
      )
      assert.equal(effectiveCompletions(lessons, oldMarks, oldChecks).size, 0)
    }
  )
  check(
    "Partial v4.1 and migrated v4 users keep only demonstrated old work",
    () => {
      const firstIds = new Set(v41.slice(0, 10).map((l) => l.id))
      const partialChecks = new Set(v41.slice(0, 10).flatMap((l) => l.checks))
      assert.equal(
        migration.validatedV41Completions(firstIds, partialChecks).size,
        10
      )
      assert.equal(
        migration.validatedV41Completions(firstIds, new Set()).size,
        0
      )
      const marks = new Set(v4.map((l) => l.id)),
        checks = new Set(v4.flatMap((l) => l.checks))
      const old = migration.validatedV4Completions(marks, checks)
      assert.equal(
        migration.validatedV41Completions(marks, checks, old).size,
        80
      )
    }
  )
  check(
    "Linux experimentation, AI discipline and clean preparation precede Core",
    () => {
      const path = [
        "why-linux",
        "why-debian-stable",
        "linux-playground",
        "ai-as-a-tutor",
        "linux-make-it-yours",
        "software-responsibility",
        "start-clean",
        "what-verification-proves",
        "foundations-checkpoint",
        "debian-setup",
        "signet-install-verify",
        "signet-start",
      ]
      for (let i = 1; i < path.length; i++)
        assert.ok(ancestors(path[i]).has(path[i - 1]), path[i])
      for (const word of [
        "seed words",
        "private keys",
        "xprv",
        "wallet passphrases",
        "wallet.dat",
        "Never reconnect",
      ])
        assert.ok(text(find("ai-as-a-tutor")).includes(word), word)
      assert.match(text(find("linux-make-it-yours")), /Num Lock/)
      assert.match(text(find("start-clean")), /second installation/)
      assert.ok(ancestors("one-wallet-mastery").has("basic-rpc"))
    }
  )
  check(
    "Production remains optional and new mainnet confirmations require its new checkpoint",
    () => {
      const production = find("move-to-real-bitcoin")
      assert.equal(production.optional, true)
      for (const id of [
        "single-sig-mastery",
        "basic-rpc",
        "foundations-checkpoint",
        "what-verification-proves",
      ])
        assert.ok(production.prerequisites.includes(id), id)
      for (const id of [
        "real-encryption",
        "real-restore",
        "mainnet-readiness",
        "mainnet-small-test",
      ]) {
        const l = find(id)
        assert.ok(l.prerequisites.includes(production.id), id)
        const credit = new Set(
          l.prerequisites.filter((p) => p !== production.id)
        )
        assert.equal(
          canCompleteLesson(l, new Set(requiredChecks(l)), credit),
          false,
          id
        )
      }
      for (const l of en.curriculumPhases[2].lessons)
        assert.ok(!ancestors(l.id).has(production.id))
    }
  )
  check(
    "The lab makes independent combination explicit before the complexity decision",
    () => {
      assert.match(text(find("multisig-signet")), /combinepsbt/)
      assert.ok(ancestors("complexity-after-the-lab").has("multisig-failures"))
      assert.ok(ancestors("advanced-mastery").has("complexity-after-the-lab"))
      assert.match(
        text(find("complexity-after-the-lab")),
        /metadata must survive/
      )
      assert.match(
        text(find("core-explorer")),
        /abstraction after understanding/
      )
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
