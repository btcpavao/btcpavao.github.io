import type { ReactNode } from "react"
import { ArrowRight, Download, ExternalLink, LockKeyhole, Network, Repeat2 } from "lucide-react"
import { ZoomableImage } from "@/components/zoomable-image"
import type { ImagePractice } from "@/curriculum/image-practice"
import { capturesFor } from "@/curriculum/practice-captures"

export function PracticeFigures({ slug, step }: { slug: string; step?: string }) {
  const captures = capturesFor(slug, step)
  if (!captures.length) return null
  return (
    <div className="practice-figures">
      {captures.map(({ src, alt, caption, context, width, height }) => (
        <figure key={src} className="practice-capture">
          <ZoomableImage src={src} alt={alt} width={width} height={height} loading="lazy" decoding="async" />
          <figcaption>
            <span className="practice-capture__context">{context}</span>
            <span>{caption}</span>
            <a href={src} aria-label={"Full size: " + alt}>Full size</a>
          </figcaption>
        </figure>
      ))}
    </div>
  )
}

export function PracticeLinks({ links }: Pick<ImagePractice, "links">) {
  if (!links?.length) return null
  return (
    <ul className="image-practice-links">
      {links.map(({ href, label, download }) => {
        const Icon = download ? Download : href.startsWith("/") ? ArrowRight : ExternalLink
        return (
          <li key={href}>
            <a href={href} download={download}>{label}<Icon aria-hidden="true" size={14} /></a>
          </li>
        )
      })}
    </ul>
  )
}

export function PracticeRole({ role }: Pick<ImagePractice, "role">) {
  const Icon = role === "Vault" ? LockKeyhole : role === "Node" ? Network : Repeat2
  return <span className="practice-role"><Icon aria-hidden="true" size={16} />{role}</span>
}

export function ImagePracticeNote({ note, slug, step, children }: { note?: ImagePractice; slug: string; step?: string; children?: ReactNode }) {
  if (!note) return <PracticeFigures slug={slug} step={step} />
  return (
    <aside className="image-practice-note" aria-label={note.title}>
      <p className="image-practice-role"><PracticeRole role={note.role} /></p>
      <h3>{note.title}</h3>
      {note.instructions.map(line => <p key={line}>{line}</p>)}
      {children}
      <PracticeFigures slug={slug} step={step} />
      {note.result && <p className="image-practice-outcome"><strong>Check your result.</strong> {note.result}</p>}
      <PracticeLinks links={note.links} />
    </aside>
  )
}

export function PracticeSetupChoice({ images, onChange }: { images: boolean; onChange: (images: boolean) => void }) {
  return (
    <fieldset className="practice-setup-choice">
      <legend>Choose your setup</legend>
      <div>
        <label><input type="radio" name="practice-setup" checked={!images} onChange={() => onChange(false)} />Bitcoin Core on Debian</label>
        <label><input type="radio" name="practice-setup" checked={images} onChange={() => onChange(true)} />Vault &amp; Node</label>
      </div>
      {images && <p>Browse the examples with <strong>Next example</strong>. Confirm a result after you reproduce it on your own practice setup.</p>}
    </fieldset>
  )
}
