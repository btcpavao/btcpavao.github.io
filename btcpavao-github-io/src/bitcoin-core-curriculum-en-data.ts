export type CurriculumStatus = "published" | "in-progress" | "planned"
export type CurriculumLevel = "beginner" | "intermediate" | "advanced"

export type CurriculumSource = {
  label: string
  url: string
}

export type CurriculumCodeBlock = {
  id: string
  title: string
  code: string
  explanation: string
  parameters?: Array<{ name: string; explanation: string }>
  warning?: string
}

export type CurriculumLesson = {
  id: string
  title: string
  summary: string
  status: CurriculumStatus
  what?: string
  why?: string
  risk?: string
  concepts?: string[]
  warnings?: string[]
  notes?: string[]
  technicalDetails?: string
  checklist?: string[]
  codeBlocks?: CurriculumCodeBlock[]
  sources?: CurriculumSource[]
  videoUrl?: string | null
  image?: { src: string; alt: string }
  badges?: string[]
}

export type CurriculumModule = {
  id: string
  title: string
  subtitle: string
  level: CurriculumLevel
  status: CurriculumStatus
  estimatedTime: string
  prerequisites: string[]
  lessons: CurriculumLesson[]
  videoUrl: string | null
  warnings: string[]
  checklist: string[]
}
