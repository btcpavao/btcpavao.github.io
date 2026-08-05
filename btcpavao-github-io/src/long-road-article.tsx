import { Fragment, type ReactNode } from "react"

export type LongRoadArticleBlock =
  | { type: "heading"; text: string; id: string }
  | { type: "paragraph"; text: string }
  | { type: "list"; items: string[] }
  | { type: "quote"; text: string }
  | { type: "visual"; number: number }
  | { type: "separator" }

type LongRoadVisual = {
  src: string
  smallSrc: string
  alt: string
  width: number
  height: number
}

export const longRoadVisuals: readonly LongRoadVisual[] = [
  {
    src: "/long-road-bitcoin-core-01.webp",
    smallSrc: "/long-road-bitcoin-core-01-840.webp",
    alt: "A person stands inside a limestone maze of hardware wallets, backup plates, cards, laptops, and cables overlooking the Adriatic Sea.",
    width: 1672,
    height: 941,
  },
  {
    src: "/long-road-bitcoin-core-02.webp",
    smallSrc: "/long-road-bitcoin-core-02-840.webp",
    alt: "A moving walkway conceals layers of technical dependencies beside transparent steps leading to an understandable machine.",
    width: 1672,
    height: 941,
  },
  {
    src: "/long-road-bitcoin-core-03.webp",
    smallSrc: "/long-road-bitcoin-core-03-840.webp",
    alt: "Five blue streams enter a glass cryptographic mixing chamber and emerge as one concentrated golden stream.",
    width: 1672,
    height: 941,
  },
  {
    src: "/long-road-bitcoin-core-04.webp",
    smallSrc: "/long-road-bitcoin-core-04-840.webp",
    alt: "Engineers inspect a transparent modular machine from many levels of a sunlit Mediterranean hall.",
    width: 1915,
    height: 821,
  },
  {
    src: "/long-road-bitcoin-core-05.webp",
    smallSrc: "/long-road-bitcoin-core-05-840.webp",
    alt: "A laptop, notebook, SSD, network diagram, QR card, USB drive, and coffee form a patient Bitcoin Core learning setup.",
    width: 1672,
    height: 941,
  },
  {
    src: "/long-road-bitcoin-core-06.webp",
    smallSrc: "/long-road-bitcoin-core-06-840.webp",
    alt: "A protected wallet root branches into many future addresses while three backup capsules and a separate passphrase token remain stored apart.",
    width: 1672,
    height: 941,
  },
  {
    src: "/long-road-bitcoin-core-07.webp",
    smallSrc: "/long-road-bitcoin-core-07-840.webp",
    alt: "One protected wallet core sends four branches toward four distinct doorways within the same Mediterranean pavilion.",
    width: 1672,
    height: 941,
  },
  {
    src: "/long-road-bitcoin-core-08.webp",
    smallSrc: "/long-road-bitcoin-core-08-840.webp",
    alt: "Twelve blank recovery tiles in a metal case and a complete encrypted wallet capsule present two valid recovery philosophies.",
    width: 1915,
    height: 821,
  },
  {
    src: "/long-road-bitcoin-core-09.webp",
    smallSrc: "/long-road-bitcoin-core-09-840.webp",
    alt: "A compact machine validates incoming blue blocks beside a vast archive that retains every historical block.",
    width: 1672,
    height: 941,
  },
  {
    src: "/long-road-bitcoin-core-10.webp",
    smallSrc: "/long-road-bitcoin-core-10-840.webp",
    alt: "An online node validates network data below an isolated room where a dedicated offline laptop signs a transferred transaction.",
    width: 1915,
    height: 821,
  },
  {
    src: "/long-road-bitcoin-core-11.webp",
    smallSrc: "/long-road-bitcoin-core-11-840.webp",
    alt: "Many independent Bitcoin Core nodes form an open limestone foundation beneath a connected coastal economy.",
    width: 1915,
    height: 821,
  },
  {
    src: "/long-road-bitcoin-core-12.webp",
    smallSrc: "/long-road-bitcoin-core-12-840.webp",
    alt: "A person leaves a crowded market of wallet devices carrying a laptop and encrypted backup toward a quiet study.",
    width: 1672,
    height: 941,
  },
  {
    src: "/long-road-bitcoin-core-13.webp",
    smallSrc: "/long-road-bitcoin-core-13-840.webp",
    alt: "A precisely engineered anchor, closed laptop, and encrypted backup capsule rest beside a calm Mediterranean harbor.",
    width: 1672,
    height: 941,
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

function isPlaceholder(line: string) {
  return /^> \*\*\[VISUAL PLACEHOLDER \d{2} \u2014 .+\]\*\*$/.test(line)
}

export function parseLongRoadArticle(source: string) {
  const lines = source.replace(/\r\n?/g, "\n").split("\n")
  const titleLine = lines[0] ?? ""
  const subtitleLine = lines[2] ?? ""

  if (!titleLine.startsWith("# ") || !subtitleLine.startsWith("## ")) {
    throw new Error("The Long Road article title structure is invalid.")
  }

  const title = titleLine.slice(2)
  const subtitle = subtitleLine.slice(3)
  const blocks: LongRoadArticleBlock[] = []
  let index = 3

  while (index < lines.length) {
    const line = lines[index]

    if (!line.trim()) {
      index += 1
      continue
    }

    if (line === "---") {
      blocks.push({ type: "separator" })
      index += 1
      continue
    }

    if (isPlaceholder(line)) {
      const match = line.match(/VISUAL PLACEHOLDER (\d{2})/)

      if (!match) {
        throw new Error(`Invalid visual placeholder: ${line}`)
      }

      blocks.push({ type: "visual", number: Number(match[1]) })
      index += 1

      while (index < lines.length && lines[index].startsWith("> ")) {
        index += 1
      }

      continue
    }

    if (line.startsWith("## ")) {
      const text = line.slice(3)
      blocks.push({ type: "heading", text, id: toSectionId(text) })
      index += 1
      continue
    }

    if (line.startsWith("* ")) {
      const items: string[] = []

      while (index < lines.length && lines[index].startsWith("* ")) {
        items.push(lines[index].slice(2))
        index += 1
      }

      blocks.push({ type: "list", items })
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

  return { title, subtitle, blocks }
}

export function renderLongRoadInline(text: string): ReactNode {
  const parts = text.split(/(\*\*.+?\*\*)/g)

  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={`${part}-${index}`}>{part.slice(2, -2)}</strong>
    }

    return <Fragment key={`${part}-${index}`}>{part}</Fragment>
  })
}
