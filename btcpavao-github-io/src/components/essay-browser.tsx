import { useEffect, useState } from "react"
import { Search, X } from "lucide-react"
import { contentRegistry } from "@/content-registry"
import { matchesEssay } from "@/essay-search"

const essays = contentRegistry.filter(entry => entry.status === "published" && entry.locale === "en" && entry.section === "core-research")
  .sort((a, b) => a.order - b.order)

export function EssayBrowser() {
  const [query, setQuery] = useState("")
  const [bodies, setBodies] = useState<Record<string, string> | null>(null)
  const [failed, setFailed] = useState(false)
  const searching = Boolean(query.trim())

  useEffect(() => {
    if (!searching || bodies) return
    let active = true
    import("@/essay-search-data").then(module => {
      if (active) { setBodies(module.essayBodies); setFailed(false) }
    }).catch(() => { if (active) setFailed(true) })
    return () => { active = false }
  }, [searching, bodies])

  const results = essays.filter(essay => matchesEssay(`${essay.title} ${essay.description} ${bodies?.[essay.path] ?? ""}`, query))
  const loading = searching && !bodies && !failed

  return <>
    <div className="essay-search">
      <label htmlFor="essay-search-input">Search essays</label>
      <div className="essay-search__field">
        <Search size={20} aria-hidden="true" />
        <input id="essay-search-input" type="search" value={query} onChange={event => setQuery(event.target.value)} placeholder="Search titles, topics or words…" aria-controls="essay-results" />
        {query && <button type="button" aria-label="Clear search" onClick={() => setQuery("")}><X size={20} aria-hidden="true" /></button>}
      </div>
      <p className="essay-search__status" role="status" aria-live="polite">
        {loading ? "Searching article text…" : searching ? `${results.length} ${results.length === 1 ? "essay" : "essays"} found` : `${essays.length} essays`}
        {searching && failed && " · Article text could not load. Showing title and description matches; clear your search to try again."}
      </p>
    </div>
    <div id="essay-results" className="essay-grid" aria-busy={loading}>
      {results.map(essay => <a className="essay-card" href={essay.path} key={essay.id}>
        {essay.heroImage && <img src={essay.heroImage} alt="" width={essay.imageWidth} height={essay.imageHeight} loading="lazy" decoding="async" />}
        <div className="essay-card__copy">
          <h3>{essay.title}</h3>
          <p>{essay.description}</p>
        </div>
      </a>)}
    </div>
    {!results.length && !loading && <p className="essay-search__empty">No essays match your search. Try a different word or clear the search to see all essays.</p>}
  </>
}
