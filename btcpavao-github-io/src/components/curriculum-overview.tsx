import { ArrowRight, BookOpen, RefreshCcw } from "lucide-react"
import { TutorialMetadata } from "@/components/tutorial-metadata"
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
  onReset: () => void
}) {
  const tr = (en: string, hr: string) => (language === "en" ? en : hr)
  const required = entries.filter((e) => !e.lesson.optional)
  const done = required.filter((e) => completedLessons.has(e.lesson.id)).length
  const drafts = required.filter(
    (e) =>
      e.lesson.verification !== "verified" || e.lesson.status !== "published"
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
              "Your bitcoin. One clear step at a time.",
              "Tvoj bitcoin. Jedan jasan korak za drugim."
            )}
          </h1>
          <p className="course-hero__lede">
            {tr(
              "Practise on Signet, recover your wallet and learn to sign offline. Prepare mainnet only after the recovery exercises work.",
              "Vježbaj na Signetu, obnovi novčanik i nauči potpisivati offline. Mainnet pripremi tek nakon uspješnih vježbi oporavka."
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
                : tr("Start with the essentials", "Kreni od osnova")}
              <ArrowRight aria-hidden="true" />
            </button>
          </div>
          <p className="course-local-note">
            {tr(
              "No real bitcoin is needed for the first exercises. Progress stays in this browser.",
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
              {done} / {required.length}
            </strong>
          </div>
          <p>
            {tr("Required lessons completed", "Dovršenih obaveznih lekcija")}
          </p>
          <progress
            value={done}
            max={required.length}
            aria-label={tr("Main path progress", "Napredak glavnog puta")}
          />
          <p>
            {tr(
              `${drafts} required exercises still await technical review. The guided path pauses at them; all drafts remain readable.`,
              `${drafts} obaveznih vježbi još čeka tehničku provjeru. Vođeni put na njima staje; svi nacrti dostupni su za čitanje.`
            )}
          </p>
          {returning && (
            <button type="button" className="course-reset" onClick={onReset}>
              <RefreshCcw aria-hidden="true" />
              {tr("Reset local progress", "Poništi lokalni napredak")}
            </button>
          )}
        </aside>
      </section>
      <section className="course-overview-details">
        <details className="course-lesson-details">
          <summary>
            <BookOpen aria-hidden="true" />
            {tr("See the six phases", "Pogledaj šest faza")}
          </summary>
          <ol className="course-roadmap__grid">
            {phases.map((phase, index) => {
              const published = phase.lessons.filter(
                (l) => l.status === "published" && l.verification === "verified"
              ).length
              return (
                <li key={phase.id}>
                  <button type="button" onClick={() => onSelectPhase(phase)}>
                    <span className="course-roadmap__number">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="course-roadmap__copy">
                      <strong>{phase.title}</strong>
                      <span className="course-roadmap__summary">
                        {phase.summary}
                      </span>
                      <small>
                        {published} / {phase.lessons.length}{" "}
                        {tr("published", "objavljeno")} · {phase.estimatedTime}
                      </small>
                    </span>
                    <ArrowRight aria-hidden="true" />
                  </button>
                </li>
              )
            })}
          </ol>
        </details>
        <details className="course-lesson-details">
          <summary>
            {tr(
              "Tools, architecture and versions",
              "Alati, arhitektura i verzije"
            )}
          </summary>
          <p>
            {tr(
              "The guided path uses Bitcoin Core for both roles: a synchronized online watch-only node, and an offline signer on a separate supported computer booted from verified Tails media. Public descriptors and PSBT files connect those roles. Private keys stay offline.",
              "Vođeni put koristi Bitcoin Core za obje uloge: sinkroniziran online watch-only čvor i offline potpisnik na zasebnom podržanom računalu pokrenutom s provjerenog Tails medija. Javni descriptori i PSBT datoteke povezuju te uloge. Privatni ključevi ostaju offline."
            )}
          </p>
          <p>
            {tr(
              "The worked installation commands use Linux x86-64. Other Core desktop platforms link to their official installation instructions. Tails requires supported x86-64 hardware; Apple Silicon is not supported for that signer.",
              "Primjeri instalacijskih naredbi koriste Linux x86-64. Za druge Core desktop sustave dostupne su poveznice na službene upute. Tails zahtijeva podržani x86-64 hardver; Apple Silicon nije podržan za taj potpisnik."
            )}
          </p>
          <p>
            {referenceVersion} · {tr("Curriculum", "Kurikulum")} v{version}.{" "}
            {tr(
              "Review scope and source links are listed in each lesson. A content update does not imply that every operating-system combination has been tested. Active work and waiting for synchronization or confirmations are separate.",
              "Opseg pregleda i izvori navedeni su u svakoj lekciji. Dorada sadržaja ne znači da je svaka kombinacija sustava praktično provjerena. Aktivan rad i čekanje sinkronizacije ili potvrda odvojeni su."
            )}
          </p>
          <TutorialMetadata
            language={language}
            goal={tr(
              "Practise signing and independent wallet recovery.",
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
              "Core desktop platforms; supported x86-64 hardware for Tails",
              "Core desktop sustavi; podržani x86-64 hardver za Tails"
            )}
            recommendedOs={tr(
              "Linux for the online node; verified Tails for the offline signer",
              "Linux za online čvor; provjereni Tails za offline potpisnik"
            )}
            prerequisites={tr(
              "Basic file handling; practical prerequisites are listed at each checkpoint",
              "Osnovni rad s datotekama; praktični preduvjeti navedeni su uz svaku provjeru"
            )}
            outcome={tr(
              "A documented receive, sign, back up and recover procedure",
              "Dokumentiran postupak primanja, potpisivanja, backupa i obnove"
            )}
            lastReviewed={tr(
              "Dates and scope are listed per lesson; drafts await practical review",
              "Datumi i opseg navedeni su po lekciji; nacrti čekaju praktičnu provjeru"
            )}
          />
        </details>
        <p className="course-local-note">
          {tr(
            "Never enter a password, seed, private key or wallet file on this website.",
            "Na ovoj stranici nikada ne unosi lozinku, seed, privatni ključ ni datoteku novčanika."
          )}
        </p>
      </section>
    </div>
  )
}
