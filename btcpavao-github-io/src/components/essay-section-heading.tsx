import { createElement } from "react"
import {
  BookOpen,
  CircleCheckBig,
  Coins,
  Cpu,
  GitBranch,
  HardDrive,
  KeyRound,
  Search,
  ShieldCheck,
  Shuffle,
} from "lucide-react"
import { formatArticleHtml } from "@/article-links"

function sectionIcon(id: string) {
  if (/source|review|verify|check|public|firmware/.test(id)) return Search
  if (/backup|recover|restore|redundan|archaeology/.test(id)) return HardDrive
  if (/entropy|random|rng|sha-|mix|dice/.test(id)) return Shuffle
  if (
    /multisig|authorization|authority|governance|signer|decision|requirement/.test(
      id
    )
  )
    return GitBranch
  if (/cost|economic|money|billion|amount/.test(id)) return Coins
  if (/key|seed|bip39|bip32|root|passphrase|encrypt/.test(id)) return KeyRound
  if (/threat|attack|security|phishing|target|ledger|trezor|coldcard/.test(id))
    return ShieldCheck
  if (
    /hardware|laptop|computer|linux|core|system|node|usb|interface|ai-/.test(id)
  )
    return Cpu
  if (
    /practical-context|conclusion|recommend|keep-it-simple|start-with/.test(id)
  )
    return CircleCheckBig
  return BookOpen
}

export function EssaySectionHeading({
  id,
  text,
  html,
}: {
  id: string
  text?: string
  html?: string
}) {
  return (
    <h2 id={id} className="essay-section-heading">
      {createElement(sectionIcon(id), {
        className: "essay-section-icon",
        "aria-hidden": true,
        focusable: false,
        strokeWidth: 1.75,
      })}
      {html === undefined ? (
        <span>{text}</span>
      ) : (
        <span dangerouslySetInnerHTML={{ __html: formatArticleHtml(html) }} />
      )}
    </h2>
  )
}
