export interface BookSection {
  id: string
  title: string
  paragraphs: string[]
  principle?: string
  example?: { title: string; paragraphs: string[] }
  bullets?: string[]
  tool?: string
  diagram?: string
}
export interface Chapter {
  slug: string
  title: string
  part: string
  deck: string
  question: string
  minutes: number
  video: null | { src: string; title: string; poster?: string }
  sections: BookSection[]
  checks: string[]
  summary: string[]
}
export const BOOK_PATH = "/en/bitcoin-standard/"
export const ORDER = [
  "start",
  "budget",
  "debt",
  "giving",
  "living",
  "net-worth",
  "long-term-trend",
  "spend-hold-invest",
  "custody-continuity",
  "put-it-into-practice",
]
