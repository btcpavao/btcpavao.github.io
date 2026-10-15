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

function sectionIcon(topic: string) {
  const id = topic.toLowerCase()
  if (/source|review|verify|public|firmware/.test(id)) return Search
  if (/backup|recover|restore|redundan|archaeology/.test(id)) return HardDrive
  if (/entropy|random|rng|sha-|mix|dice/.test(id)) return Shuffle
  if (
    /multisig|authorization|authority|governance|signer|decision|requirement/.test(
      id
    )
  )
    return GitBranch
  if (/cost|economic|money|billion|amount/.test(id)) return Coins
  if (/key|seed|bip39|bip32|root|passphrase|encrypt|wallet/.test(id))
    return KeyRound
  if (
    /threat|attack|security|safe|phishing|target|ledger|trezor|coldcard/.test(
      id
    )
  )
    return ShieldCheck
  if (
    /hardware|laptop|computer|linux|core|system|node|usb|interface|ai-/.test(id)
  )
    return Cpu
  if (
    /check|result|takeaway|practical-context|conclusion|recommend|keep-it-simple|start-with/.test(
      id
    )
  )
    return CircleCheckBig
  return BookOpen
}

export function SectionIcon({
  topic,
  className = "section-pictogram",
}: {
  topic: string
  className?: string
}) {
  return createElement(sectionIcon(topic), {
    className,
    "aria-hidden": true,
    focusable: false,
    strokeWidth: 1.75,
  })
}
