import { useEffect, useRef, useState } from "react"
import { Check, Clipboard, MessageSquare, Terminal } from "lucide-react"

type Feedback = "idle" | "copied" | "selected" | "manual"

export function VerificationCommands({ title, lines, kind = "command" }: { title: string; lines: string[]; kind?: "command" | "prompt" }) {
  const codeRef = useRef<HTMLElement>(null)
  const [feedback, setFeedback] = useState<Feedback>("idle")
  const isPrompt = kind === "prompt"
  const Icon = isPrompt ? MessageSquare : Terminal
  const command = lines.join(isPrompt ? "\n\n" : "\n")

  useEffect(() => {
    if (feedback !== "copied") return
    const timer = window.setTimeout(() => setFeedback("idle"), 2500)
    return () => window.clearTimeout(timer)
  }, [feedback])

  async function copyCommands() {
    try {
      await navigator.clipboard.writeText(command)
      setFeedback("copied")
    } catch {
      const selection = window.getSelection()
      if (!codeRef.current || !selection) {
        setFeedback("manual")
        return
      }
      const range = document.createRange()
      range.selectNodeContents(codeRef.current)
      selection.removeAllRanges()
      selection.addRange(range)
      try {
        if (document.execCommand("copy")) {
          selection.removeAllRanges()
          setFeedback("copied")
          return
        }
      } catch {
        // Keep the text selected when the browser only permits manual copying.
      }
      setFeedback("selected")
    }
  }

  const copied = feedback === "copied"
  const manual = feedback === "selected" || feedback === "manual"
  return (
    <div className={isPrompt ? "verification-command verification-prompt" : "verification-command"}>
      <div className="verification-command__bar">
        <span className="verification-command__title">
          <Icon size={16} aria-hidden="true" /><span>{title}</span>
        </span>
        <button type="button" onClick={copyCommands} aria-label={"Copy " + title}>
          {copied ? <Check size={16} aria-hidden="true" /> : <Clipboard size={16} aria-hidden="true" />}
          <span>{copied ? "Copied" : "Copy"}</span>
        </button>
      </div>
      {isPrompt ? <div className="verification-prompt__text"><span ref={codeRef}>{command}</span></div> : <pre className="build-commands"><code ref={codeRef}>{command}</code></pre>}
      <span role="status" aria-live="polite" className={manual ? "verification-command__notice" : "sr-only"}>
        {copied && "Copied to clipboard."}
        {feedback === "selected" && "Text selected. Use your device’s Copy command."}
        {feedback === "manual" && "Select the text, then use your device’s Copy command."}
      </span>
    </div>
  )
}
