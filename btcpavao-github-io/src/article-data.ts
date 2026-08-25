// Compatibility fixture for legacy components. The published AI content now lives at aipavao.com.
export const articleIntro: string[] = []
export const articleSections: { heading: string; paragraphs: string[] }[] = []
export const aiWorkflowArticleIntro: string[] = []
export const aiWorkflowSteps: string[] = []
export type AiWorkflowBlock =
  | { type: "p" | "note" | "h3"; text: string }
  | { type: "ul" | "ol"; items: string[] }
  | { type: "workflow" }
export const aiWorkflowArticleSections: {
  heading: string
  blocks: AiWorkflowBlock[]
}[] = []
export const websiteScreenshots: {
  src: string
  smallSrc: string
  mediumSrc: string
  width: number
  height: number
  alt: string
  title: string
  caption: string
}[] = []
export const bookAgentGroups: {
  label: string
  description: string
  agents: { id: string; title: string; description: string }[]
}[] = []
