import { percent } from "./format"
import type { ReactNode } from "react"
export function Field({
  label,
  value,
  onChange,
  min = 0,
  max = 1e10,
  step = "any",
}: {
  label: string
  value: string | number
  onChange: (value: string) => void
  min?: number
  max?: number
  step?: string
}) {
  return (
    <label className="bam-field">
      <span>{label}</span>
      <input
        type="number"
        value={value}
        min={min}
        max={max}
        step={step}
        onChange={(e) => onChange(e.target.value)}
      />
    </label>
  )
}
export function ToolBox({
  title,
  children,
  caption,
}: {
  title: string
  children: ReactNode
  caption?: string
}) {
  return (
    <section className="bam-tool" aria-label={title}>
      <p className="bam-eyebrow">Try it · an example you can change</p>
      <h3>{title}</h3>
      {caption && <p>{caption}</p>}
      {children}
      <p className="bam-note bam-privacy">
        Calculations stay in this browser. Financial inputs are not saved or
        sent to a server.
      </p>
    </section>
  )
}
export function Bar({
  values,
  labels,
}: {
  values: number[]
  labels: string[]
}) {
  const total = values.reduce((a, b) => a + b, 0)
  return (
    <>
      <div className="bam-bars" aria-hidden="true">
        {values.map((v, i) => (
          <span
            key={i}
            style={{ width: `${total ? (v / total) * 100 : 0}%` }}
          />
        ))}
      </div>
      <div className="bam-bar-labels">
        {labels.map((l, i) => (
          <span key={l}>
            {l}: <strong>{total ? percent(values[i] / total) : "0%"}</strong>
          </span>
        ))}
      </div>
    </>
  )
}
