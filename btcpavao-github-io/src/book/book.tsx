import { lazy, Suspense, useEffect, useRef, useState } from "react"
import { SiteHeader } from "../components/site-header"
import { SiteFooter } from "../components/site-footer"
import { OPENNODE_CHECKOUT_URL } from "../components/value-for-value"
import { BOOKING_URL } from "../site-config"
import { BOOK_PATH, ORDER } from "./types"
import type { Chapter } from "./types"
import { Pictogram } from "./pictogram"
import { ConceptDiagram } from "./diagrams"
import { checkKey, useBookProgress } from "./progress"
import images from "../../content/bitcoin-as-money/images.json"
import "./book.css"
const Exercise = lazy(() => import("./exercises"))
const files = import.meta.glob<Chapter>(
  "../../content/bitcoin-as-money/chapters/*.json",
  { eager: true, import: "default" }
)
const chapters = ORDER.map(
  (slug) => Object.values(files).find((c) => c.slug === slug)!
).filter(Boolean)
const href = (slug: string) => `${BOOK_PATH}${slug}/`
function Illustration({
  slug,
  priority = false,
}: {
  slug: string
  priority?: boolean
}) {
  const im = images.find((i) => i.slug === slug)!
  return (
    <figure className="bam-illustration">
      <img
        src={`/bitcoin-as-money/${slug}.webp`}
        srcSet={`/bitcoin-as-money/${slug}-800.webp 800w, /bitcoin-as-money/${slug}.webp 1600w`}
        sizes="(max-width: 800px) 100vw, 850px"
        width={im.width}
        height={im.height}
        alt={im.alt}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : undefined}
        decoding="async"
      />
    </figure>
  )
}
function Tool({ name }: { name: string }) {
  const ref = useRef<HTMLDivElement>(null),
    [ready, setReady] = useState(false)
  useEffect(() => {
    const node = ref.current
    if (!node) return
    const observer = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setReady(true)
          observer.disconnect()
        }
      },
      { rootMargin: "350px" }
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [])
  return (
    <div ref={ref} className="bam-tool-slot">
      {ready ? (
        <Suspense fallback={<p>Loading this exercise…</p>}>
          <Exercise name={name} />
        </Suspense>
      ) : (
        <button onClick={() => setReady(true)}>
          Open interactive exercise
        </button>
      )}
      <noscript>
        JavaScript enables this browser-only exercise. The explanation and
        worked examples remain available above.
      </noscript>
    </div>
  )
}
function Support() {
  return (
    <aside className="bam-support">
      <Pictogram name="giving" />
      <div>
        <h3>Open, because useful knowledge should travel.</h3>
        <p>
          No fixed price. No paywall. If this helped, please share it or{" "}
          <a href={OPENNODE_CHECKOUT_URL}>return value with sats</a>. For
          individual help,{" "}
          <a href={BOOKING_URL}>book a Value for Value conversation</a>.
        </p>
      </div>
    </aside>
  )
}
function Extra({ slug, id }: { slug: string; id: string }) {
  if (slug === "start" && id === "how-the-rules-work")
    return (
      <figure className="bam-diagram">
        <figcaption>One illustrative Bitcoin payment</figcaption>
        <div className="bam-utxo">
          <strong>
            Input
            <br />
            0.05 BTC
          </strong>
          <span aria-hidden="true">→</span>
          <div>
            <p>
              Payment: <strong>0.02 BTC</strong>
            </p>
            <p>
              Change: <strong>0.02999 BTC</strong>
            </p>
            <p>
              Fee: <strong>0.00001 BTC</strong>
            </p>
          </div>
        </div>
        <p className="bam-note">
          The payment, change and fee add up to the input.
        </p>
      </figure>
    )
  if (slug === "giving" && id === "planned-and-open")
    return (
      <figure className="bam-diagram">
        <figcaption>Two ways to use one giving category</figcaption>
        <div className="bam-diagram-items">
          <div>
            <Pictogram name="giving" />
            <strong>Planned giving</strong>
            <p>Commitments you deliberately choose and review.</p>
          </div>
          <div>
            <Pictogram name="giving" />
            <strong>Open giving</strong>
            <p>Capacity reserved for needs you have not met yet.</p>
          </div>
        </div>
      </figure>
    )
  if (slug === "long-term-trend" && id === "block-time")
    return (
      <aside className="bam-example">
        <h3>The same clock, two coordinates</h3>
        <p>
          840,000 ÷ 210,000 = <strong>H4</strong>
        </p>
        <p>
          945,000 ÷ 210,000 = <strong>H4.5</strong>
        </p>
        <p>
          Half an epoch is 105,000 blocks. Its calendar duration depends on
          block production.
        </p>
      </aside>
    )
  if (slug === "long-term-trend" && id === "power-law-in-plain-english")
    return (
      <div className="bam-table-wrap">
        <table>
          <caption>
            A teaching example: P = 100 × H². This is not the Bitcoin Wave
            formula.
          </caption>
          <thead>
            <tr>
              <th>H</th>
              <th>Calculation</th>
              <th>P</th>
            </tr>
          </thead>
          <tbody>
            {[2, 3, 4].map((h) => (
              <tr key={h}>
                <th>{h}</th>
                <td>100 × {h}²</td>
                <td>{100 * h * h}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  return null
}
export function BitcoinAsMoney({ path = BOOK_PATH }: { path?: string }) {
  const slug = path.slice(BOOK_PATH.length).replace(/\/$/, "")
  const chapter = chapters.find((c) => c.slug === slug)
  const { state, save, reset, unavailable } = useBookProgress()
  const [resetting, setResetting] = useState(false)
  const completed = chapters.filter((c) =>
    state.completed?.includes(c.slug)
  ).length
  const checks = state.checks ?? {}
  const index = chapters.findIndex((c) => c.slug === slug)
  const resume =
    chapters.find((c) => c.slug === state.last) ??
    chapters.find((c) => !state.completed?.includes(c.slug)) ??
    chapters[0]
  useEffect(() => {
    if (chapter && state.last !== chapter.slug)
      save({ ...state, last: chapter.slug })
  }, [chapter, state, save])
  const toggleComplete = () =>
    save({
      ...state,
      completed: state.completed?.includes(slug)
        ? state.completed.filter((s) => s !== slug)
        : [...(state.completed ?? []), slug],
    })
  const toc = (
    <ol className="bam-toc">
      {chapters.map((c, i) => (
        <li key={c.slug}>
          <a
            href={href(c.slug)}
            aria-current={c.slug === slug ? "page" : undefined}
          >
            <span>
              {state.completed?.includes(c.slug)
                ? "✓"
                : String(i + 1).padStart(2, "0")}
            </span>
            {c.title}
          </a>
        </li>
      ))}
    </ol>
  )
  return (
    <>
      <a href="#book-main" className="bam-skip">
        Skip to the book
      </a>
      <SiteHeader />
      <div className="bam">
        {!chapter && slug ? (
          <main id="book-main" className="bam-shell">
            <h1>Chapter not found</h1>
            <p>
              <a href={BOOK_PATH}>Return to the book contents</a>.
            </p>
          </main>
        ) : !chapter ? (
          <main id="book-main">
            <section className="bam-landing-hero bam-shell">
              <div className="bam-hero-copy">
                <p className="bam-eyebrow">An open interactive book</p>
                <h1>
                  Bitcoin
                  <br />
                  <em>as Money.</em>
                </h1>
                <p className="bam-deck">
                  A practical system for living on a Bitcoin standard.
                </p>
                <p>
                  Bitcoin conviction is a beginning. How do you organize a life
                  around better money?
                </p>
                <div className="bam-buttons">
                  <a className="bam-primary" href={href(resume.slug)}>
                    {state.last ? "Continue reading" : "Begin the book"}{" "}
                    <span aria-hidden="true">↗</span>
                  </a>
                  <a href="#contents">Explore the chapters ↓</a>
                </div>
                <p className="bam-note">
                  No login. No paywall. Your progress stays in this browser.
                </p>
              </div>
              <Illustration slug="start" priority />
            </section>
            <section className="bam-intro bam-shell">
              <p className="bam-eyebrow">
                From conviction to a working household system
              </p>
              <h2>
                Better money deserves
                <br />a deliberate life.
              </h2>
              <div>
                <p>
                  You can understand Bitcoin and still have money without a
                  plan: an impressive balance, an expensive debt, a bill that
                  arrives at the wrong time.
                </p>
                <p>
                  This book starts with the money you have and the life you need
                  it to support. You will build a budget, confront debt, make
                  room for giving, read your balance sheet and write a policy
                  your household can understand.
                </p>
                <p>
                  For individuals, couples and business owners. Read in order,
                  pause to try an exercise, and return when life gives the idea
                  a practical use.
                </p>
              </div>
            </section>
            <section className="bam-shell bam-roadmap" id="contents">
              <div className="bam-roadmap-heading">
                <div>
                  <p className="bam-eyebrow">The reading path</p>
                  <h2>One book. Ten chapters.</h2>
                </div>
                <p>
                  {Math.round(
                    (chapters.reduce((n, c) => n + c.minutes, 0) / 60) * 10
                  ) / 10}{" "}
                  hours of reading + time to put it into practice
                </p>
              </div>
              <div className="bam-progress">
                <progress
                  value={completed}
                  max={chapters.length}
                  aria-label="Chapters marked complete"
                />
                <span>
                  {completed} / {chapters.length} marked complete
                </span>
              </div>
              <ol className="bam-chapter-list">
                {chapters.map((c, i) => (
                  <li key={c.slug}>
                    <a href={href(c.slug)}>
                      <span className="bam-chapter-number">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <Pictogram name={c.slug} />
                      <div>
                        <p className="bam-eyebrow">{c.part}</p>
                        <h3>{c.title}</h3>
                        <p>{c.deck}</p>
                      </div>
                      <span className="bam-duration">
                        {state.completed?.includes(c.slug)
                          ? "✓ Completed"
                          : `${c.minutes} min`}{" "}
                        <span aria-hidden="true">↗</span>
                      </span>
                    </a>
                  </li>
                ))}
              </ol>
            </section>
            <section className="bam-shell bam-two-paths">
              <div>
                <p className="bam-eyebrow">Two paths, one foundation</p>
                <h2>
                  Organize the life.
                  <br />
                  Learn the tools.
                </h2>
              </div>
              <p>
                This book is about how money serves your life. When you are
                ready to hold and recover Bitcoin yourself, continue with{" "}
                <a href="/en/bitcoin-core/self-custody/">
                  Practical Bitcoin Self-Custody with Bitcoin Core
                </a>
                . The technical lessons belong there.
              </p>
            </section>
            <div className="bam-shell">
              <Support />
            </div>
          </main>
        ) : (
          <main id="book-main" className="bam-reader bam-shell">
            <aside className="bam-sidebar">
              <a className="bam-book-label" href={BOOK_PATH}>
                Bitcoin <em>as Money</em>
              </a>
              <p className="bam-eyebrow">
                Contents · {completed} / {chapters.length}
              </p>
              {toc}
              <a className="bam-note" href="#self-check">
                Put it into practice ↓
              </a>
            </aside>
            <div className="bam-reading">
              <details className="bam-mobile-toc">
                <summary>
                  Contents · Chapter {index + 1} of {chapters.length}
                </summary>
                {toc}
              </details>
              <header className="bam-chapter-header">
                <a href={BOOK_PATH}>← The open book</a>
                <p className="bam-eyebrow">
                  {chapter.part} · Chapter {String(index + 1).padStart(2, "0")}{" "}
                  · {chapter.minutes} min
                </p>
                <h1>{chapter.title}</h1>
                <p className="bam-deck">{chapter.deck}</p>
                <p className="bam-opening-question">{chapter.question}</p>
              </header>
              {slug !== "put-it-into-practice" && (
                <Illustration slug={slug} priority />
              )}
              <nav className="bam-on-this-page" aria-label="In this chapter">
                <p className="bam-eyebrow">In this chapter</p>
                {chapter.sections.map((s) => (
                  <a href={`#${s.id}`} key={s.id}>
                    {s.title}
                  </a>
                ))}
              </nav>
              {chapter.video && (
                <figure>
                  <video
                    controls
                    preload="metadata"
                    poster={chapter.video.poster}
                    aria-label={chapter.video.title}
                  >
                    <source src={chapter.video.src} />
                  </video>
                  <figcaption>{chapter.video.title}</figcaption>
                </figure>
              )}
              {chapter.sections.map((section) => (
                <section
                  className="bam-section"
                  id={section.id}
                  key={section.id}
                >
                  {slug === "put-it-into-practice" &&
                    section.id === "ana-thirty-years" && (
                      <Illustration slug={slug} />
                    )}
                  <h2>
                    <a href={`#${section.id}`}>{section.title}</a>
                  </h2>
                  {section.paragraphs.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                  {section.principle && (
                    <blockquote>{section.principle}</blockquote>
                  )}
                  {section.bullets && (
                    <ul>
                      {section.bullets.map((b, i) => (
                        <li key={i}>{b}</li>
                      ))}
                    </ul>
                  )}
                  {section.example && (
                    <aside className="bam-example">
                      <p className="bam-eyebrow">Worked example</p>
                      <h3>{section.example.title}</h3>
                      {section.example.paragraphs.map((p, i) => (
                        <p key={i}>{p}</p>
                      ))}
                    </aside>
                  )}
                  {section.diagram && <ConceptDiagram name={section.diagram} />}
                  <Extra slug={slug} id={section.id} />
                  {section.tool && <Tool name={section.tool} />}
                </section>
              ))}
              {slug === "custody-continuity" && (
                <aside className="bam-handoff">
                  <Pictogram name="custody-continuity" />
                  <h2>Ready to take responsibility for long-term custody?</h2>
                  <p>The next path teaches the technical work step by step.</p>
                  <a
                    className="bam-primary"
                    href="/en/bitcoin-core/self-custody/"
                  >
                    Continue with Bitcoin Core ↗
                  </a>
                  <p>
                    <a href="/en/bitcoin-core/self-custody/#lesson/backup-mastery">
                      Backup and recovery
                    </a>{" "}
                    ·{" "}
                    <a href="/en/bitcoin-core/self-custody/#lesson/inheritance-and-other-people">
                      Household continuity
                    </a>
                  </p>
                </aside>
              )}
              <section className="bam-summary">
                <p className="bam-eyebrow">What to carry forward</p>
                <ul>
                  {chapter.summary.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
              </section>
              <section className="bam-self-check" id="self-check">
                <p className="bam-eyebrow">Put it into practice</p>
                <h2>Make this chapter yours.</h2>
                <p>
                  Tick what you have actually done. Reading a page does not
                  complete these actions for you.
                </p>
                {chapter.checks.map((c) => (
                  <label key={c}>
                    <input
                      type="checkbox"
                      checked={checks[checkKey(slug, c)] === true}
                      onChange={(e) =>
                        save({
                          ...state,
                          checks: {
                            ...checks,
                            [checkKey(slug, c)]: e.target.checked,
                          },
                        })
                      }
                    />
                    <span>{c}</span>
                  </label>
                ))}
                <label className="bam-completion">
                  <input
                    type="checkbox"
                    checked={state.completed?.includes(slug) ?? false}
                    onChange={toggleComplete}
                  />
                  <span>I mark this chapter as completed.</span>
                </label>
                <p className="bam-note">
                  {
                    chapter.checks.filter((c) => checks[checkKey(slug, c)])
                      .length
                  }{" "}
                  / {chapter.checks.length} actions checked. Completion is your
                  own assessment.
                </p>
              </section>
              <nav className="bam-next" aria-label="Chapter navigation">
                {index > 0 ? (
                  <a href={href(chapters[index - 1].slug)}>
                    <span>← Previous chapter</span>
                    <strong>{chapters[index - 1].title}</strong>
                  </a>
                ) : (
                  <a href={BOOK_PATH}>← Book contents</a>
                )}
                {index < chapters.length - 1 ? (
                  <a href={href(chapters[index + 1].slug)}>
                    <span>Next chapter →</span>
                    <strong>{chapters[index + 1].title}</strong>
                  </a>
                ) : (
                  <a href={BOOK_PATH}>Return to the complete book →</a>
                )}
              </nav>
              {[3, 6, 9].includes(index) && <Support />}
            </div>
          </main>
        )}
        <div className="bam-shell bam-endnote">
          <p>
            {unavailable
              ? "Browser storage is unavailable. Progress is kept only for this session."
              : "Checkmarks and the last chapter are stored locally. Financial figures and policy text are not persisted."}
          </p>
          {resetting ? (
            <div className="bam-buttons">
              <span>Clear only this book’s progress?</span>
              <button
                onClick={() => {
                  reset()
                  setResetting(false)
                }}
              >
                Clear book progress
              </button>
              <button onClick={() => setResetting(false)}>Keep it</button>
            </div>
          ) : (
            <button onClick={() => setResetting(true)}>
              Reset book progress
            </button>
          )}
        </div>
      </div>
      <SiteFooter />
    </>
  )
}
