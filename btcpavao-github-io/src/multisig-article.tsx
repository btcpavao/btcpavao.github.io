import { Fragment, type ReactNode } from "react"

export type MultisigArticleBlock =
  | { type: "heading"; text: string; id: string }
  | { type: "paragraph"; text: string }
  | { type: "quote"; text: string }
  | { type: "visual"; number: number }

type MultisigVisual = {
  src: string
  smallSrc: string
  alt: string
}

export const multisigVisuals: readonly MultisigVisual[] = [
  {
    src: "/multisig-not-dollar-amount-01.webp",
    smallSrc: "/multisig-not-dollar-amount-01-840.webp",
    alt: "One-key and two-of-three authorization structures share equal visual weight on an Adriatic terrace.",
  },
  {
    src: "/multisig-not-dollar-amount-02.webp",
    smallSrc: "/multisig-not-dollar-amount-02-840.webp",
    alt: "Redundant paper secrets multiply exposure while encrypted wallet backups remain separate from their key.",
  },
  {
    src: "/multisig-not-dollar-amount-03.webp",
    smallSrc: "/multisig-not-dollar-amount-03-840.webp",
    alt: "An online watch-only Bitcoin Core machine exchanges a PSBT with an isolated offline signer.",
  },
  {
    src: "/multisig-not-dollar-amount-04.webp",
    smallSrc: "/multisig-not-dollar-amount-04-840.webp",
    alt: "Two homes with the same bitcoin holding present very different physical access paths and threat models.",
  },
  {
    src: "/multisig-not-dollar-amount-05.webp",
    smallSrc: "/multisig-not-dollar-amount-05-840.webp",
    alt: "Three geographically separate signers converge on a two-of-three authorization mechanism.",
  },
  {
    src: "/multisig-not-dollar-amount-06.webp",
    smallSrc: "/multisig-not-dollar-amount-06-840.webp",
    alt: "Bitcoin security tools become simpler as understanding replaces unnecessary complexity.",
  },
]

function toSectionId(heading: string) {
  return heading
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
}

function visualNumber(line: string) {
  const match = line.match(/^> \*\*\[VISUAL PLACEHOLDER (\d{2}) — .+\]\*\*$/)
  return match ? Number(match[1]) : null
}

export function parseMultisigArticle(source: string) {
  const lines = source.replace(/\r\n?/g, "\n").split("\n")
  const titleLine = lines[0] ?? ""

  if (!titleLine.startsWith("# ")) {
    throw new Error("The multisig article title structure is invalid.")
  }

  const title = titleLine.slice(2)
  const blocks: MultisigArticleBlock[] = []
  let index = 1

  while (index < lines.length) {
    const line = lines[index]

    if (!line.trim()) {
      index += 1
      continue
    }

    const number = visualNumber(line)
    if (number !== null) {
      blocks.push({ type: "visual", number })
      index += 1
      continue
    }

    if (line.startsWith("## ")) {
      const text = line.slice(3)
      blocks.push({ type: "heading", text, id: toSectionId(text) })
      index += 1
      continue
    }

    if (line.startsWith("> ")) {
      const quoteLines: string[] = []
      while (index < lines.length && lines[index].startsWith("> ")) {
        quoteLines.push(lines[index].slice(2))
        index += 1
      }
      blocks.push({ type: "quote", text: quoteLines.join(" ") })
      continue
    }

    const paragraphLines = [line]
    index += 1
    while (index < lines.length && lines[index].trim()) {
      paragraphLines.push(lines[index])
      index += 1
    }
    blocks.push({ type: "paragraph", text: paragraphLines.join("\n") })
  }

  return { title, blocks }
}

export function renderMultisigInline(text: string): ReactNode {
  const parts = text.split(/(\*\*.+?\*\*|\*[^*]+\*)/g)

  return parts.map((part, index) => {
    const key = `${part}-${index}`
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={key}>{part.slice(2, -2)}</strong>
    }
    if (part.startsWith("*") && part.endsWith("*")) {
      return <em key={key}>{part.slice(1, -1)}</em>
    }
    return <Fragment key={key}>{part}</Fragment>
  })
}
