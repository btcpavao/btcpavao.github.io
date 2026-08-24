export type ContentLocale = "en" | "hr"
export type ContentStatus = "published" | "planned" | "system"

export interface ContentRegistryEntry {
  id: string
  path: string
  locale: ContentLocale
  title: string
  description: string
  contentType: "page" | "collection" | "article" | "tutorial" | "system"
  section: string
  publishedAt: string | null
  updatedAt: string | null
  featured: boolean
  order: number
  status: ContentStatus
  socialCardKey:
    | "homepage"
    | "default"
    | "workflow"
    | "learning"
    | "bitcoinCore"
    | "longRoad"
    | "walletGuide"
    | "bip39"
    | "support"
    | "startHere"
  heroImage: string | null
  translationPath: string | null
  indexable: boolean
  rss: boolean
  imageAlt: string
  imageWidth: number
  imageHeight: number
}

export const SITE_URL: string
export const contentRegistry: ContentRegistryEntry[]
export function findContentByPath(pathname: string): ContentRegistryEntry | null
export function getPublishedContent(): ContentRegistryEntry[]
export function getLanguageTarget(pathname: string, locale: ContentLocale): string
