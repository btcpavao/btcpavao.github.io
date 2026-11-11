import { useEffect, useRef, useState } from "react"
import { Check, Clipboard, Terminal } from "lucide-react"

type Feedback = "idle" | "copied" | "selected" | "manual"

export function VerificationCommands({ title, lines }: { title: string; lines: string[] }) {
  const codeRef = useRef<HTMLElement>(null)
  const [feedback, setFeedback] = useState<Feedback>("idle")
  const command = lines.join("\n")

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
    <div className="verification-command">
      <div className="verification-command__bar">
        <span className="verification-command__title">
          <Terminal size={16} aria-hidden="true" /><span>{title}</span>
        </span>
        <button type="button" onClick={copyCommands} aria-label={"Copy " + title}>
          {copied ? <Check size={16} aria-hidden="true" /> : <Clipboard size={16} aria-hidden="true" />}
          <span>{copied ? "Copied" : "Copy"}</span>
        </button>
      </div>
      <pre className="build-commands"><code ref={codeRef}>{command}</code></pre>
      <span role="status" aria-live="polite" className={manual ? "verification-command__notice" : "sr-only"}>
        {copied && "Copied to clipboard."}
        {feedback === "selected" && "Code selected. Use your device’s Copy command."}
        {feedback === "manual" && "Select the code, then use your device’s Copy command."}
      </span>
    </div>
  )
}
