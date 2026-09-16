import { useEffect, useMemo, useRef, useState, type ReactNode } from "react"
import { Search, X } from "lucide-react"
import { CurriculumHelp } from "@/components/curriculum-context"
import {
  buildCurriculumSearchIndex,
  searchCurriculum,
  normalizeSearch,
  isLabelTransferQuery,
  type SearchEntry,
} from "@/curriculum-search"

export function CurriculumSearch({
  entries,
  children,
}: {
  entries: SearchEntry[]
  children: ReactNode
}) {
  const [query, setQuery] = useState("")
  const input = useRef<HTMLInputElement>(null)
  const index = useMemo(() => buildCurriculumSearchIndex(entries), [entries])
  const results = useMemo(() => searchCurriculum(index, query), [index, query])
  const searching = Boolean(normalizeSearch(query))

  useEffect(() => {
    const sync = () =>
      setQuery(
        (new URLSearchParams(window.location.search).get("q") ?? "").slice(
          0,
          200
        )
      )
    const timer = window.setTimeout(sync, 0)
    window.addEventListener("popstate", sync)
    return () => {
      window.clearTimeout(timer)
      window.removeEventListener("popstate", sync)
    }
  }, [])

  function updateQuery(value: string) {
    setQuery(value)
    const url = new URL(window.location.href)
    if (value.trim()) url.searchParams.set("q", value)
    else url.searchParams.delete("q")
    window.history.replaceState(
      window.history.state,
      "",
      `${url.pathname}${url.search}${url.hash}`
    )
  }
  function clear() {
    updateQuery("")
    input.current?.focus()
  }

  return (
    <>
      <section className="course-search" aria-label="Search the curriculum">
        <form role="search" onSubmit={(event) => event.preventDefault()}>
          <label htmlFor="curriculum-search">Search the curriculum</label>
          <div className="course-search__input-row">
            <Search aria-hidden="true" />
            <input
              ref={input}
              id="curriculum-search"
              type="search"
              value={query}
              placeholder="Search the curriculum…"
              maxLength={200}
              autoComplete="off"
              spellCheck={false}
              aria-describedby="curriculum-search-help"
              onChange={(event) => updateQuery(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Escape") {
                  event.preventDefault()
                  clear()
                }
              }}
            />
            {query && (
              <button type="button" onClick={clear} aria-label="Clear search">
                <X aria-hidden="true" />
                <span>Clear</span>
              </button>
            )}
          </div>
          <p id="curriculum-search-help">
            Find a topic in all three parts — try labels, UTXO, PSBT or Linux.
          </p>
        </form>
        <p
          className="course-search__status"
          role="status"
          aria-live="polite"
          aria-atomic="true"
        >
          {searching
            ? `${results.length} matching ${results.length === 1 ? "lesson" : "lessons"}.`
            : ""}
        </p>
        {searching && (
          <div className="course-search__results">
            <h1>Search results</h1>
            {isLabelTransferQuery(query) && (
              <p className="course-search__coverage">
                Related backup guidance is listed below. The curriculum does not
                yet include a dedicated label export/import procedure.
              </p>
            )}
            {results.length ? (
              <ul>
                {results.map((result) => (
                  <li key={result.lesson.id}>
                    <a href={result.href}>
                      <span className="course-search__section">
                        {result.phase.title} · {result.lesson.chapter}
                      </span>
                      <h2>{result.lesson.title}</h2>
                      <p>{result.excerpt}</p>
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="course-search__empty">
                <h2>No matching lesson found.</h2>
                <p>
                  Try a broader term. Can’t find what you’re looking for? Ask
                  Pavao. If the topic is missing, your question may help me add
                  it to the curriculum.
                </p>
                <CurriculumHelp
                  context={{ section: "Curriculum search", searchQuery: query }}
                />
              </div>
            )}
          </div>
        )}
      </section>
      {!searching && children}
    </>
  )
}
