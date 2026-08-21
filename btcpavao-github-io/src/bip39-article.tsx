import { Fragment, type ReactNode } from "react"

export type Bip39ArticleBlock =
  | { type: "heading"; text: string; id: string }
  | { type: "paragraph"; text: string }
  | { type: "list"; items: string[] }
  | { type: "quote"; text: string }
  | { type: "visual"; number: number }

type Bip39Visual = {
  src: string
  smallSrc: string
  alt: string
  caption: string
}

export const bip39Visuals: readonly Bip39Visual[] = [
  {
    src: "/bip39-wrong-thing-cover.webp",
    smallSrc: "/bip39-wrong-thing-cover-840.webp",
    alt: "A person holds a long chain of blank mnemonic tiles beside a laptop that keeps a structured wallet safely inside a blue glass chamber.",
    caption:
      "We moved the most sensitive object in the wallet out of the machine and into the human's hands. Why?",
  },
  {
    src: "/bip39-wrong-thing-02.webp",
    smallSrc: "/bip39-wrong-thing-02-840.webp",
    alt: "A protected wallet artifact moves into Bitcoin Core, becomes an unsigned transaction, travels to a separate signer, and returns ready for broadcast while the passphrase stays apart.",
    caption:
      "The wallet could be loaded and used to construct the transaction without giving the recovery machine authority to sign it.",
  },
  {
    src: "/bip39-wrong-thing-03.webp",
    smallSrc: "/bip39-wrong-thing-03-840.webp",
    alt: "A small stack of blank mnemonic tiles sits beside a much richer structured wallet containing branches, scripts, policy objects, and metadata.",
    caption:
      "Secret material is not the same thing as a complete description of the wallet.",
  },
  {
    src: "/bip39-wrong-thing-04.webp",
    smallSrc: "/bip39-wrong-thing-04-840.webp",
    alt: "A blank seed card stands at the entrance to a sunlit stone maze whose branches represent the missing assumptions needed to find the wallet at its center.",
    caption:
      "When the backup preserves secret material but not its context, recovery can become wallet archaeology.",
  },
  {
    src: "/bip39-wrong-thing-05.webp",
    smallSrc: "/bip39-wrong-thing-05-840.webp",
    alt: "One root becomes a precise branching key tree on the BIP32 side, while root material crosses into human-held mnemonic tiles on the BIP39 side.",
    caption:
      "BIP32 organizes keys. BIP39 changes who is expected to handle the root secret.",
  },
  {
    src: "/bip39-wrong-thing-06.webp",
    smallSrc: "/bip39-wrong-thing-06-840.webp",
    alt: "A person struggles with a long root-secret chain while a machine holds the wallet and another person carries eight lightweight authorization tokens.",
    caption:
      "The root secret does not need to be memorable. The credential that unlocks the protected wallet may need to be.",
  },
  {
    src: "/bip39-wrong-thing-07.webp",
    smallSrc: "/bip39-wrong-thing-07-840.webp",
    alt: "A large word-library vessel sends eight independent blue channels to eight blank tokens, with exact labels showing the KeePassXC list size and entropy calculation.",
    caption:
      "Eight independent uniform selections from KeePassXC's 7,772-word list provide approximately 103.4 bits of selection entropy.",
  },
  {
    src: "/bip39-wrong-thing-08.webp",
    smallSrc: "/bip39-wrong-thing-08-840.webp",
    alt: "A protected wallet artifact and a separate passphrase travel through different physical routes and meet only at a trusted offline signing machine.",
    caption:
      "The backup and passphrase are separate parts of one recovery system. Neither artifact alone completes the signing process.",
  },
  {
    src: "/bip39-wrong-thing-09.webp",
    smallSrc: "/bip39-wrong-thing-09-840.webp",
    alt: "Copies of one protected wallet artifact rest on several storage media and in separate archives while the passphrase remains visibly detached.",
    caption:
      "Redundancy of a protected wallet artifact is not the same architecture as duplicating a raw bearer secret.",
  },
  {
    src: "/bip39-wrong-thing-10.webp",
    smallSrc: "/bip39-wrong-thing-10-840.webp",
    alt: "Two generic laptops form an online-and-offline Bitcoin Core workflow at Mediterranean dusk while a protected backup and separate passphrase sit nearby.",
    caption:
      "The next question is even more fundamental: where did the secret come from in the first place?",
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

function stripItalic(line: string) {
  const match = line.match(/^\*(.+)\*$/)
  return match?.[1] ?? null
}

export function parseBip39Article(source: string) {
  const lines = source.replace(/\r\n?/g, "\n").split("\n")
  const titleLine = lines[0] ?? ""
  const subtitleLine = lines[2] ?? ""

  if (!titleLine.startsWith("# ") || !stripItalic(subtitleLine)) {
    throw new Error("The BIP39 article title structure is invalid.")
  }

  const title = titleLine.slice(2)
  const subtitle = stripItalic(subtitleLine) ?? ""
  const blocks: Bip39ArticleBlock[] = []
  let heroCaption = bip39Visuals[0].caption
  let index = 3

  while (index < lines.length) {
    const line = lines[index]

    if (!line.trim()) {
      index += 1
      continue
    }

    const imageMatch = line.match(
      /^!\[(.*)\]\(article-01-images\/(\d{2})-[^)]+\)$/
    )

    if (imageMatch) {
      const number = Number(imageMatch[2])
      index += 1

      while (index < lines.length && !lines[index].trim()) {
        index += 1
      }

      const caption = stripItalic(lines[index] ?? "")
      if (caption) {
        if (number === 1) heroCaption = caption
        index += 1
      }

      if (number !== 1) blocks.push({ type: "visual", number })
      continue
    }

    if (line.startsWith("## ")) {
      const text = line.slice(3)
      blocks.push({ type: "heading", text, id: toSectionId(text) })
      index += 1
      continue
    }

    if (line.startsWith("- ")) {
      const items: string[] = []

      while (index < lines.length && lines[index].startsWith("- ")) {
        items.push(lines[index].slice(2))
        index += 1
      }

      blocks.push({ type: "list", items })
      continue
    }

    if (line.startsWith(">")) {
      const quoteLines: string[] = []

      while (index < lines.length && lines[index].startsWith(">")) {
        quoteLines.push(lines[index].replace(/^> ?/, ""))
        index += 1
      }

      blocks.push({
        type: "quote",
        text: quoteLines.filter(Boolean).join(" "),
      })
      continue
    }

    const paragraphLines = [line]
    index += 1

    while (index < lines.length && lines[index].trim()) {
      paragraphLines.push(lines[index])
      index += 1
    }

    blocks.push({ type: "paragraph", text: paragraphLines.join(" ") })
  }

  return { title, subtitle, heroCaption, blocks }
}

export function renderBip39Inline(text: string): ReactNode {
  const parts = text.split(/(\*\*.+?\*\*|`[^`]+`|\[[^\]]+\]\([^)]+\))/g)

  return parts.map((part, index) => {
    const key = `${part}-${index}`
    const linkMatch = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/)

    if (linkMatch) {
      return (
        <a href={linkMatch[2]} key={key}>
          {linkMatch[1]}
        </a>
      )
    }

    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={key}>{part.slice(2, -2)}</strong>
    }

    if (part.startsWith("`") && part.endsWith("`")) {
      return <code key={key}>{part.slice(1, -1)}</code>
    }

    return <Fragment key={key}>{part}</Fragment>
  })
}
