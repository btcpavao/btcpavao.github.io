import { useEffect } from "react"
import { DEBIAN_IMAGE_VERIFICATION_PATH } from "@/routes"

// Existing bookmarks and published release notes use these download-page fragments.
const movedSections = [
  "what-pavao-added", "project-changes-heading", "reviewer-brief", "reviewer-brief-title",
  "verify-the-build", "upstream-programs", "compare-upstream", "review-project-code",
  "compare-source-files", "rebuild-tutorial", "verification-results",
]

export function LegacyVerificationLinks() {
  useEffect(() => {
    function followMovedSection() {
      const { hash, search } = window.location
      if (movedSections.includes(hash.slice(1))) {
        window.location.replace(DEBIAN_IMAGE_VERIFICATION_PATH + search + hash)
      }
    }
    followMovedSection()
    window.addEventListener("hashchange", followMovedSection)
    return () => window.removeEventListener("hashchange", followMovedSection)
  }, [])

  return movedSections.map(id => (
    <a id={id} key={id} className="hidden scroll-mt-24 target:inline-flex"
      href={DEBIAN_IMAGE_VERIFICATION_PATH + "#" + id}>Continue to this section in the verification guide</a>
  ))
}
