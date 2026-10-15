import { ReadingProgress } from "@/components/reading-progress"
import { EssaySectionHeading } from "@/components/essay-section-heading"
import { articleLinkProps, formatArticleHtml } from "@/article-links"
import { ArticleContents } from "@/components/article-contents"
import { ConsultingInvitation } from "@/components/consulting-invitation"
import { ZoomableImage } from "@/components/zoomable-image"
import { useEffect } from "react"
import { articles, findPublishedArticle } from "./published-articles/data"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import {
  ValueForValueCard,
  ValueForValueRail,
} from "@/components/value-for-value"

export function PublishedArticlePage({
  article,
}: {
  article: (typeof articles)[number]
}) {
  useEffect(() => {
    document.documentElement.lang = "en"
    document.title = `${article.title} | BTC Pavao`
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute("content", article.description)
  }, [article])

  return (
    <div className="min-h-screen bg-background text-foreground">
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <SiteHeader />
      <ReadingProgress />
      <ValueForValueRail language="en" />
      <main id="main-content" className="published-article-page">
        <article>
          <header className="published-article-header">
            <a
              className="published-article-back"
              href="/en/bitcoin-core/#essays"
            >
              ← Bitcoin Core essays
            </a>
            <p className="published-article-meta">
              Bitcoin Core ·{" "}
              <time dateTime={article.date}>
                {new Date(`${article.date}T12:00:00Z`).toLocaleDateString(
                  "en-US",
                  {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                    timeZone: "UTC",
                  }
                )}
              </time>{" "}
              · {article.readingMinutes} min read
            </p>
            <h1>{article.title}</h1>
            <p className="published-article-description">
              {article.description}
            </p>
            <p className="published-article-source">
              By btcpavao ·{" "}
              <a
                {...articleLinkProps(article.sourceUrl)}
                target="_blank"
                rel="noopener noreferrer"
              >
                Originally published on X ↗
              </a>
            </p>
            <ZoomableImage
              className="published-article-cover"
              src={article.hero.src}
              srcSet={`${article.hero.smallSrc} ${article.hero.smallWidth}w, ${article.hero.src} ${article.hero.width}w`}
              sizes="(max-width: 1200px) calc(100vw - 32px), 1120px"
              alt={article.hero.alt}
              width={article.hero.width}
              height={article.hero.height}
              fetchPriority="high"
            />
          </header>
          <div className="published-article-reading">
            <ArticleContents headings={article.headings} />
            <div data-reading-content className="published-article-body essay-prose">
              {article.blocks.map((block, index) => {
                const key = `${block.type}-${index}`
                if (block.type === "image")
                  return (
                    <figure key={key}>
                      <ZoomableImage
                        src={block.src}
                        srcSet={`${block.smallSrc} ${block.smallWidth}w, ${block.src} ${block.width}w`}
                        sizes="(max-width: 840px) calc(100vw - 32px), 800px"
                        alt={block.alt}
                        width={block.width}
                        height={block.height}
                        loading="lazy"
                        decoding="async"
                      />
                      {block.caption && (
                        <figcaption>{block.caption}</figcaption>
                      )}
                    </figure>
                  )
                if (block.type === "heading")
                  return (
                    <EssaySectionHeading
                      key={key}
                      id={block.id ?? ""}
                      html={block.html ?? ""}
                    />
                  )
                if (block.type === "divider") return <hr key={key} />
                if (block.type === "quote")
                  return (
                    <blockquote
                      key={key}
                      dangerouslySetInnerHTML={{
                        __html: formatArticleHtml(block.html ?? ""),
                      }}
                    />
                  )
                if (block.type === "list-item") {
                  if (article.blocks[index - 1]?.type === "list-item")
                    return null
                  const items = []
                  for (
                    let i = index;
                    article.blocks[i]?.type === "list-item";
                    i++
                  )
                    items.push(article.blocks[i])
                  return (
                    <ul className="essay-list" key={key}>
                      {items.map((item, i) => (
                        <li
                          key={i}
                          dangerouslySetInnerHTML={{
                            __html: formatArticleHtml(item.html ?? ""),
                          }}
                        />
                      ))}
                    </ul>
                  )
                }
                return (
                  <p
                    key={key}
                    dangerouslySetInnerHTML={{
                      __html: formatArticleHtml(block.html ?? ""),
                    }}
                  />
                )
              })}
            </div>
            <aside className="article-next-step">
              <h2>Put the reasoning into practice.</h2>
              <p>
                Follow the Bitcoin Core curriculum with disposable wallets and
                test coins. Learn to recover one wallet before moving signing
                offline or adding a spending policy.
              </p>
              <a {...articleLinkProps("/en/bitcoin-core/self-custody/")}>
                Open the self-custody curriculum →
              </a>
              <a {...articleLinkProps("/en/bitcoin-core/debian-images/")}>
                Coming soon: dedicated Debian images →
              </a>
            </aside>
            <ConsultingInvitation
              className="mt-14"
              question="What would a simpler custody setup look like for you?"
              detail="We can work through your threat model, Bitcoin Core workflow, backup and recovery plan, or the authority your spending policy needs to express."
            />
            <ValueForValueCard language="en" className="mt-14" />
            <nav
              className="published-related"
              aria-label="More Bitcoin Core essays"
            >
              <h2>Keep reading</h2>
              {articles
                .filter((other) => other.id !== article.id)
                .slice(0, 3)
                .map((other) => (
                  <a key={other.id} {...articleLinkProps(other.path)}>
                    {other.title}
                    <span aria-hidden="true">↗</span>
                  </a>
                ))}
              <a href="/en/bitcoin-core/#essays">
                All Bitcoin Core essays<span aria-hidden="true">→</span>
              </a>
            </nav>
          </div>
        </article>
      </main>
      <SiteFooter />
    </div>
  )
}

export function PublishedArticleRoute({ path }: { path: string }) {
  const article = findPublishedArticle(path)
  return article ? <PublishedArticlePage article={article} /> : null
}
