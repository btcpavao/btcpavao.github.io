import { CustodyArchitecture } from "@/components/custody-architecture"
import { CUSTODY_CONTENT_UPDATED } from "@/bitcoin-core-curriculum-player-en-data"
import { ArrowRight, RefreshCcw } from "lucide-react"
import { TutorialMetadata } from "@/components/tutorial-metadata"
import {
  curriculumMilestones,
  milestoneProgress,
} from "@/curriculum-milestones"
import type {
  CurriculumPhase,
  PlayerLesson,
} from "@/bitcoin-core-curriculum-player-en-data"

type Entry = {
  lesson: PlayerLesson
  phase: CurriculumPhase
  lessonNumber: string
}
export function CurriculumOverview({
  language,
  phases,
  entries,
  version,
  referenceVersion,
  completedLessons,
  onStart,
  onContinue,
  continueEntry,
  returning,
  onSelectPhase,
  onSelectLesson,
  hasRetainedProgress,
  onReset,
}: {
  language: "en" | "hr"
  phases: CurriculumPhase[]
  entries: Entry[]
  version: string
  referenceVersion: string
  completedLessons: Set<string>
  onStart: () => void
  onContinue: () => void
  continueEntry: Entry | null
  returning: boolean
  onSelectPhase: (phase: CurriculumPhase) => void
  onSelectLesson: (lesson: PlayerLesson) => void
  hasRetainedProgress: boolean
  onReset: () => void
}) {
  const tr = (en: string, hr: string) => (language === "en" ? en : hr)
  const required = entries.filter((e) => !e.lesson.optional)
  const milestones = milestoneProgress(
    curriculumMilestones(phases),
    completedLessons
  )
  const done = milestones.filter((milestone) => milestone.complete).length
  const drafts = required.filter(
    (e) =>
      !["verified", "source-reviewed"].includes(e.lesson.verification) ||
      e.lesson.status !== "published"
  ).length
  return (
    <div className="course-overview--focused">
      <section className="course-hero" aria-labelledby="course-title">
        <div className="course-hero__copy">
          <div className="course-eyebrow">
            <img
              src="/bitcoin-logo-official.png"
              alt=""
              width="1920"
              height="1920"
              aria-hidden="true"
            />
            <span>Bitcoin Core · v{version}</span>
          </div>
          <h1 id="course-title">
            {tr(
              "Understand the system. Own your bitcoin.",
              "Tvoj bitcoin. Jedan jasan korak za drugim."
            )}
          </h1>
          <p className="course-hero__lede">
            {tr(
              "Begin with the threats. Master one Bitcoin Core wallet on one dedicated Debian computer, including backup and recovery. Then separate online coordination from offline signing. Add a protection when you can name the threat it solves.",
              "Počni modelom prijetnji, vježbaj na Signetu i nauči obnoviti novčanik i potpisivati offline. Mainnet pripremi tek nakon uspješnih vježbi oporavka."
            )}
          </p>
          <div className="course-hero__actions">
            <button
              type="button"
              className="course-action course-action--primary"
              onClick={returning && continueEntry ? onContinue : onStart}
            >
              {returning && continueEntry
                ? tr("Continue: ", "Nastavi: ") + continueEntry.lesson.title
                : done === milestones.length
                  ? "Review your completed foundation"
                  : tr("Start with first principles", "Kreni od osnova")}
              <ArrowRight aria-hidden="true" />
            </button>
          </div>
          <p className="course-local-note">
            {tr(
              "No real bitcoin is needed for the main course. Progress stays in this browser.",
              "Za prve vježbe ne trebaju stvarni bitcoini. Napredak ostaje u ovom pregledniku."
            )}
          </p>
        </div>
        <aside
          className="course-progress-card"
          aria-label={tr("Your learning progress", "Tvoj napredak")}
        >
          <div className="course-progress-card__heading">
            <span>{tr("The main path", "Glavni put")}</span>
            <strong>
              {done} / {milestones.length}
            </strong>
          </div>
          <p>Milestones completed · Parts I and II</p>
          <progress
            value={done}
            max={milestones.length}
            aria-label={tr("Main path progress", "Napredak glavnog puta")}
          />
          <p>
            {tr(
              drafts
                ? `${drafts} exercises remain in review.`
                : "Expand a milestone below to see its steps and your progress. Optional lessons and Part III never count against completion.",
              `${drafts} obaveznih vježbi još čeka tehničku provjeru. Vođeni put na njima staje; svi nacrti dostupni su za čitanje.`
            )}
          </p>
          {hasRetainedProgress && (
            <p className="course-local-note">
              Your v4 work is retained. Continue to the new reading and
              practical checks, including KeePassXC and the one-wallet
              checkpoint. Earlier confirmations remain saved.
            </p>
          )}
          {returning && (
            <button type="button" className="course-reset" onClick={onReset}>
              <RefreshCcw aria-hidden="true" />
              {tr("Reset local progress", "Poništi lokalni napredak")}
            </button>
          )}
        </aside>
      </section>
      <section className="course-overview-details">
        <section
          className="course-three-parts"
          aria-labelledby="course-parts-title"
        >
          <h2 id="course-parts-title">Three parts. One foundation.</h2>
          <ol className="course-roadmap__grid">
            {phases.map((phase, index) => {
              return (
                <li key={phase.id}>
                  <button type="button" onClick={() => onSelectPhase(phase)}>
                    <span className="course-roadmap__number">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="course-roadmap__copy">
                      <strong>{phase.title}</strong>
                      <span className="course-roadmap__subtitle">
                        {phase.outcome}
                      </span>
                      <span className="course-roadmap__summary">
                        {phase.summary}
                      </span>
                      <small>
                        {phase.id === "2"
                          ? "Optional policies"
                          : `${milestones.filter((m) => m.phaseId === phase.id).length} milestones`}{" "}
                        · {phase.estimatedTime}
                      </small>
                    </span>
                    <ArrowRight aria-hidden="true" />
                  </button>
                  <ol
                    className="course-milestones"
                    aria-label={`${phase.title} milestones and steps`}
                  >
                    {milestones
                      .filter((milestone) => milestone.phaseId === phase.id)
                      .map((milestone) => (
                        <li key={milestone.id}>
                          <details className="course-milestone">
                            <summary>
                              <span>{milestone.title}</span>
                              <small>
                                {milestone.done} of {milestone.total} steps
                                complete
                              </small>
                            </summary>
                            <ol>
                              {phase.lessons
                                .filter(
                                  (lesson) => lesson.chapter === milestone.title
                                )
                                .map((lesson) => (
                                  <li key={lesson.id}>
                                    <button
                                      type="button"
                                      onClick={() => onSelectLesson(lesson)}
                                    >
                                      <span>{lesson.title}</span>
                                      <small>
                                        {completedLessons.has(lesson.id)
                                          ? "Completed"
                                          : lesson.optional
                                            ? "Optional"
                                            : "Open step"}
                                      </small>
                                    </button>
                                  </li>
                                ))}
                            </ol>
                          </details>
                        </li>
                      ))}
                    {phase.lessons.some(
                      (lesson) =>
                        lesson.optional &&
                        !milestones.some(
                          (m) =>
                            m.phaseId === phase.id && m.title === lesson.chapter
                        )
                    ) && (
                      <li>
                        <details className="course-milestone course-milestone--optional">
                          <summary>
                            <span>
                              {phase.id === "2"
                                ? "Explore the optional policies"
                                : "Optional extensions"}
                            </span>
                            <small>Outside the required path</small>
                          </summary>
                          <ol>
                            {phase.lessons
                              .filter(
                                (lesson) =>
                                  lesson.optional &&
                                  !milestones.some(
                                    (m) =>
                                      m.phaseId === phase.id &&
                                      m.title === lesson.chapter
                                  )
                              )
                              .map((lesson) => (
                                <li key={lesson.id}>
                                  <button
                                    type="button"
                                    onClick={() => onSelectLesson(lesson)}
                                  >
                                    <span>{lesson.title}</span>
                                    <small>
                                      {completedLessons.has(lesson.id)
                                        ? "Completed · optional"
                                        : "Optional"}
                                    </small>
                                  </button>
                                </li>
                              ))}
                          </ol>
                        </details>
                      </li>
                    )}
                  </ol>
                </li>
              )
            })}
          </ol>
        </section>
        <p className="course-local-note">
          A tested single-sig system can be your finished setup. If it covers
          your actual threat model, you do not need a more complex spending
          policy.
        </p>
        <details className="course-lesson-details">
          <summary>
            {tr(
              "Computers, software and versions",
              "Alati, arhitektura i verzije"
            )}
          </summary>
          <p>
            {tr(
              "Start with one ordinary computer reserved for practice, running Debian Stable and Bitcoin Core. Learn creation, encryption, payments, backups and restoration before the one-wallet mastery checkpoint. After that checkpoint, the recommended savings setup separates online verification and coordination from offline private-key signing on a second dedicated Debian computer.",
              "Zadana postava koristi dva namjenska generička računala s Debianom Stable i Bitcoin Coreom. Online puni čvor ima watch-only novčanik za štednju. Trajni offline potpisnik čuva šifrirane privatne ključeve i ne treba blockchain. Javni descriptori i PSBT prelaze kontroliranu granicu."
            )}
          </p>
          <p>
            {tr(
              "The examples use x86-64 computers, the processor family also called amd64. Other maintained Linux systems can work too. Tails, an operating system started from a USB drive, is an optional later topic. You do not need to choose between these alternatives before learning the default setup.",
              "Primjeri koriste Debian Stable na x86-64 hardveru. Druge održavane Linux distribucije ostaju valjane alternative. Tails je izboran kada modelu prijetnji koristi smanjenje trajnog stanja OS-a. Prvo nauči zadanu postavu."
            )}
          </p>
          <p>
            {referenceVersion} · {tr("Curriculum", "Kurikulum")} v{version}.{" "}
            {tr(
              "Review scope and source links are listed in each lesson. A content update does not imply that every operating-system combination has been tested. Lesson times separate hands-on work from time spent waiting for synchronization or confirmations.",
              "Opseg pregleda i izvori navedeni su u svakoj lekciji. Dorada sadržaja ne znači da je svaka kombinacija sustava praktično provjerena. Aktivan rad i čekanje sinkronizacije ili potvrda odvojeni su."
            )}
          </p>
          <CustodyArchitecture language={language} />
          <p>
            {tr("Content updated", "Sadržaj ažuriran")}:{" "}
            {CUSTODY_CONTENT_UPDATED}.{" "}
            {tr(
              "Hands-on scope is recorded per lesson; a source review does not certify an operating-system installation or physical setup.",
              "Ovo nije novi datum praktične provjere."
            )}
          </p>
          <TutorialMetadata
            language={language}
            goal={tr(
              "Practice signing and independent wallet recovery.",
              "Uvježbaj potpisivanje i neovisni oporavak novčanika."
            )}
            difficulty={tr(
              "Beginner, then guided practice",
              "Početnik, zatim vođena vježba"
            )}
            estimatedTime={tr(
              "Per lesson; synchronization and confirmations take additional time",
              "Po lekciji; sinkronizacija i potvrde traže dodatno vrijeme"
            )}
            realBitcoin={tr(
              "Signet first; a limited mainnet test after recovery",
              "Prvo Signet; ograničen mainnet test nakon oporavka"
            )}
            softwareVersion={`${referenceVersion} · Curriculum v${version}`}
            operatingSystems={tr(
              "Examples use Debian Stable on x86-64; other supported Core platforms can be used for practice",
              "Referentni Debian Stable x86-64; drugi Core sustavi za vježbu"
            )}
            recommendedOs={tr(
              "Debian Stable for the online node and persistent offline signer",
              "Debian Stable za online čvor i trajni offline potpisnik"
            )}
            prerequisites={tr(
              "Basic file handling; practical prerequisites are listed at each checkpoint",
              "Osnovni rad s datotekama; praktični preduvjeti navedeni su uz svaku provjeru"
            )}
            outcome={tr(
              "Written instructions for receiving, signing, backing up and recovering",
              "Dokumentiran postupak primanja, potpisivanja, backupa i obnove"
            )}
            lastReviewed={tr(
              "Source and hands-on review dates and scope are listed per lesson",
              "Datumi i opseg navedeni su po lekciji; nacrti čekaju praktičnu provjeru"
            )}
          />
        </details>
        <p className="course-local-note">
          {tr(
            "Never enter a password, recovery words, private key or wallet file on this website.",
            "Na ovoj stranici nikada ne unosi lozinku, seed, privatni ključ ni datoteku novčanika."
          )}
        </p>
      </section>
    </div>
  )
}
