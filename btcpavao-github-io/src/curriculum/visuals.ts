import catalogData from "./visual-catalog.json"
import placementData from "./visual-placements.json"

export type VisualNode = { title: string; body: string; icon: string }
export type VisualDefinition = {
  title: string
  caption: string
  layout: string
  states?: string[]
  boundary?: string
  nodes?: VisualNode[]
  headers?: string[]
  rows?: string[][]
  src?: string
  alt?: string
}
export type VisualTarget =
  | { kind: "reading"; anchor: string }
  | { kind: "step"; stepId: string }
  | { kind: "checkpoint" | "background" }
export type VisualPlacement = {
  id: string
  visual: string
  display: "core" | "expandable"
  target: VisualTarget
  active?: number
  caption?: string
}
export const visualCatalog = catalogData as Record<string, VisualDefinition>
export const visualPlacements = placementData as Record<
  string,
  VisualPlacement[]
>

// Match reading content, not a mutable paragraph index. A changed paragraph must
// be reviewed explicitly; verify:visuals fails rather than silently moving art.
// Existing reading-v4 and guided-v4 progress keys are deliberately untouched.
export function visualsFor(lessonId: string, target: VisualTarget) {
  return (visualPlacements[lessonId] ?? []).filter(({ target: candidate }) => {
    if (candidate.kind !== target.kind) return false
    if (candidate.kind === "reading" && target.kind === "reading")
      return candidate.anchor === target.anchor
    if (candidate.kind === "step" && target.kind === "step")
      return candidate.stepId === target.stepId
    return true
  })
}
export const exampleTransaction = {
  input: 100_000,
  payment: 60_000,
  change: 39_000,
  get fee() {
    return this.input - this.payment - this.change
  },
}
