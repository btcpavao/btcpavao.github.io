import { useEffect } from "react"
import {
  englishCurriculumDestination,
  englishCurriculumPath,
} from "../../content/curriculum-redirect.mjs"

export function CurriculumRedirect() {
  useEffect(() => {
    window.location.replace(
      englishCurriculumDestination(window.location.search, window.location.hash)
    )
  }, [])
  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <h1>The curriculum is now in English</h1>
      <p>
        <a href={englishCurriculumPath}>
          Continue to the Bitcoin Core curriculum
        </a>
        .
      </p>
    </main>
  )
}
