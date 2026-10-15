import { SectionIcon } from "@/components/section-icon"
import { formatArticleHtml } from "@/article-links"

export function EssaySectionHeading({
  id,
  text,
  html,
}: {
  id: string
  text?: string
  html?: string
}) {
  return (
    <h2 id={id} className="essay-section-heading">
      <SectionIcon topic={id} className="essay-section-icon" />
      {html === undefined ? (
        <span>{text}</span>
      ) : (
        <span dangerouslySetInnerHTML={{ __html: formatArticleHtml(html) }} />
      )}
    </h2>
  )
}
