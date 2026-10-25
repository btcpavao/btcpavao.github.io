export type UnderstandingCheck = {
  prompt: string
  options: { text: string; feedback: string }[]
  correct: number
}

export type ConceptVisual = {
  kind:
    | "learning"
    | "gold"
    | "copies"
    | "separation"
    | "privacy"
    | "economics"
    | "guessing"
    | "entropy"
    | "layers"
    | "geography"
    | "complexity"
    | "hardware"
    | "isolation"
    | "vault"
    | "validation"
    | "policy"
    | "workflow"
    | "trust"
    | "blockchain"
    | "recovery"
    | "transaction"
    | "descriptor"
    | "maintenance"
    | "threats"
    | "strength-cost"
    | "deterrence"
    | "scaling"
    | "wallet-privacy"
    | "architecture"
  title: string
  caption: string
  labels?: string[]
}

export type LessonMedia = {
  visual: ConceptVisual
  understanding: UnderstandingCheck
  videoScript: { scene: string; narration: string }[]
}

export const understandingKey = (id: string) => `lesson-${id}:understanding-v5`
