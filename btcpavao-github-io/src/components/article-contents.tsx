type ArticleHeading = { id: string; text: string }

export function ArticleContents({
  headings,
  className = "",
}: {
  headings: readonly ArticleHeading[]
  className?: string
}) {
  if (!headings.length) return null

  return (
    <details className={`article-contents ${className}`.trim()}>
      <summary>In this essay</summary>
      <ol aria-label="Article sections">
        {headings.map((heading) => (
          <li key={heading.id}>
            <a href={`#${heading.id}`}>
              {heading.text.replace(/^\s*\d+[.)]\s+/, "")}
            </a>
          </li>
        ))}
      </ol>
    </details>
  )
}
