import { useEffect, useRef, useState } from "react"

type Turnstile = {
  render: (
    container: HTMLElement,
    options: {
      sitekey: string
      action: string
      size: "compact" | "flexible"
      callback: (token: string) => void
      "expired-callback": () => void
      "error-callback": () => void
    }
  ) => string
  remove: (id: string) => void
}
declare global {
  interface Window {
    turnstile?: Turnstile
  }
}
let loading: Promise<Turnstile> | undefined
function loadTurnstile() {
  if (window.turnstile) return Promise.resolve(window.turnstile)
  if (!loading)
    loading = new Promise<Turnstile>((resolve, reject) => {
      const script = document.createElement("script")
      script.src =
        "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
      script.async = true
      script.onload = () =>
        window.turnstile
          ? resolve(window.turnstile)
          : reject(new Error("Unavailable"))
      script.onerror = () => {
        script.remove()
        reject(new Error("Unavailable"))
      }
      document.head.append(script)
    }).catch((error) => {
      loading = undefined
      throw error
    })
  return loading
}

export function CurriculumTurnstile({
  siteKey,
  onToken,
  reset,
}: {
  siteKey: string
  onToken: (token: string) => void
  reset: number
}) {
  const container = useRef<HTMLDivElement>(null)
  const [error, setError] = useState(false)
  const [attempt, setAttempt] = useState(0)
  useEffect(() => {
    let cancelled = false,
      widget: string | undefined,
      api: Turnstile | undefined
    void loadTurnstile()
      .then((instance) => {
        if (cancelled || !container.current) return
        api = instance
        widget = api.render(container.current, {
          sitekey: siteKey,
          action: "ask_pavao",
          size: container.current.clientWidth < 300 ? "compact" : "flexible",
          callback: (token) => {
            onToken(token)
            setError(false)
          },
          "expired-callback": () => onToken(""),
          "error-callback": () => {
            onToken("")
            setError(true)
          },
        })
      })
      .catch(() => {
        if (!cancelled) setError(true)
      })
    return () => {
      cancelled = true
      if (widget !== undefined) api?.remove(widget)
    }
  }, [siteKey, onToken, reset, attempt])
  return (
    <div className="course-question__challenge">
      <div ref={container} />
      {error && (
        <p role="alert">
          The security check could not load. Check your connection and{" "}
          <button
            type="button"
            onClick={() => {
              setError(false)
              setAttempt((n) => n + 1)
            }}
          >
            try again
          </button>
          .
        </p>
      )}
    </div>
  )
}
