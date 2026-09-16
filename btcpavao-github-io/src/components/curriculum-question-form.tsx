import { CurriculumTurnstile } from "@/components/curriculum-turnstile"
import { useEffect, useId, useRef, useState, type FormEvent } from "react"
import { CONTACT_EMAIL_URL } from "@/site-config"
import {
  questionPayload,
  questionErrorMessage,
  sendCurriculumQuestion,
  validateQuestion,
  type QuestionContext,
  type QuestionErrors,
  type QuestionFields,
} from "@/curriculum-questions"

const configuredSiteKey = import.meta.env.VITE_TURNSTILE_SITE_KEY ?? ""

export function CurriculumQuestionForm({
  context,
  endpoint = "/api/ask-pavao",
  siteKey = configuredSiteKey,
}: {
  context: QuestionContext
  endpoint?: string
  siteKey?: string
}) {
  const id = useId()
  const form = useRef<HTMLFormElement>(null)
  const receipt = useRef<HTMLDivElement>(null)
  const inFlight = useRef(false)
  const [token, setToken] = useState("")
  const [challengeReset, setChallengeReset] = useState(0)
  const [sendError, setSendError] = useState("")
  const [errors, setErrors] = useState<QuestionErrors>({})
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle")
  const [withEmail, setWithEmail] = useState(false)
  useEffect(() => {
    if (status === "success") receipt.current?.focus()
  }, [status])

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (inFlight.current || !siteKey) return
    const data = new FormData(event.currentTarget)
    const fields: QuestionFields = {
      question: String(data.get("question") ?? ""),
      name: String(data.get("name") ?? ""),
      email: String(data.get("email") ?? ""),
    }
    const validation = validateQuestion(fields)
    setErrors(validation)
    if (Object.keys(validation).length) {
      setStatus("idle")
      form.current
        ?.querySelector<HTMLElement>(`[name="${Object.keys(validation)[0]}"]`)
        ?.focus()
      return
    }
    if (!token) {
      setSendError("Please complete the security check before sending.")
      setStatus("error")
      return
    }
    inFlight.current = true
    setStatus("sending")
    try {
      await sendCurriculumQuestion(
        endpoint,
        questionPayload(
          fields,
          context,
          String(data.get("companyWebsite") ?? ""),
          token
        )
      )
      setWithEmail(Boolean(fields.email.trim()))
      setStatus("success")
    } catch (error) {
      setSendError(questionErrorMessage(error))
      setStatus("error")
    } finally {
      inFlight.current = false
      setToken("")
      setChallengeReset((n) => n + 1)
    }
  }

  if (status === "success")
    return (
      <div
        className="course-question__receipt"
        ref={receipt}
        tabIndex={-1}
        role="status"
      >
        <h3>Thanks — question received.</h3>
        <p>
          Questions like this help me see what needs to be explained more
          clearly in the curriculum.
        </p>
        <p>
          {withEmail
            ? "I’ll be able to reply directly using the email you provided. Your question may also help improve the curriculum for others."
            : "Since you didn’t leave an email, I won’t be able to reply directly, but I can still use the question to improve the curriculum."}
        </p>
      </div>
    )

  return (
    <form
      ref={form}
      className="course-question"
      onSubmit={submit}
      noValidate
      aria-label="Ask Pavao a question"
      aria-busy={status === "sending"}
    >
      {import.meta.env.DEV && siteKey === "1x00000000000000000000AA" && (
        <p className="course-question__unavailable">
          Local preview: submissions are simulated. No email is sent.
        </p>
      )}
      {!siteKey && (
        <p className="course-question__unavailable" role="status">
          The question form is temporarily unavailable. For now, you can{" "}
          <a href={CONTACT_EMAIL_URL}>email Pavao</a>; email reveals your sender
          address.
        </p>
      )}
      <label htmlFor={`${id}-question`}>Your question</label>
      <textarea
        id={`${id}-question`}
        name="question"
        required
        minLength={5}
        maxLength={5000}
        rows={5}
        aria-invalid={Boolean(errors.question)}
        aria-describedby={`${id}-security${errors.question ? ` ${id}-question-error` : ""}`}
      />
      {errors.question && (
        <p
          className="course-question__error"
          id={`${id}-question-error`}
          role="alert"
        >
          {errors.question}
        </p>
      )}
      <label htmlFor={`${id}-name`}>Name — optional</label>
      <input
        id={`${id}-name`}
        name="name"
        autoComplete="name"
        maxLength={150}
        aria-invalid={Boolean(errors.name)}
        aria-describedby={errors.name ? `${id}-name-error` : undefined}
      />
      {errors.name && (
        <p
          className="course-question__error"
          id={`${id}-name-error`}
          role="alert"
        >
          {errors.name}
        </p>
      )}
      <label htmlFor={`${id}-email`}>Email — optional</label>
      <input
        id={`${id}-email`}
        name="email"
        type="email"
        autoComplete="email"
        maxLength={254}
        aria-invalid={Boolean(errors.email)}
        aria-describedby={`${id}-reply${errors.email ? ` ${id}-email-error` : ""}`}
      />
      {errors.email && (
        <p
          className="course-question__error"
          id={`${id}-email-error`}
          role="alert"
        >
          {errors.email}
        </p>
      )}
      <p id={`${id}-reply`}>
        Leave an email only if you would like a direct reply. If you leave your
        name and email blank, the question will be sent without those
        identifying details. Without an email, I won’t have a way to reply
        directly.
      </p>
      <div hidden aria-hidden="true">
        <label htmlFor={`${id}-website`}>Website</label>
        <input
          id={`${id}-website`}
          name="companyWebsite"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>
      <p className="course-question__context">
        Included context: {context.section}
        {context.lesson ? ` · ${context.lesson}` : ""}, plus its public
        curriculum link.
        {context.searchQuery && (
          <> Search query: {context.searchQuery.slice(0, 200)}</>
        )}
      </p>
      <p>
        I may use the underlying topic, without identifying details, to improve
        the material. Your name, email and original question are not
        automatically published.
      </p>
      {status === "error" && (
        <p className="course-question__error" role="alert">
          {sendError}
        </p>
      )}
      {siteKey && (
        <CurriculumTurnstile
          siteKey={siteKey}
          onToken={setToken}
          reset={challengeReset}
        />
      )}
      <p className="course-question__security" id={`${id}-security`}>
        Never include seed words, private keys, wallet passphrases or other
        secrets in your question.
      </p>
      <button
        className="course-action course-action--primary"
        type="submit"
        disabled={!siteKey || status === "sending"}
      >
        {status === "sending" ? "Sending…" : "Send question"}
      </button>
      <p className="course-local-note">
        Ask first. Value for Value is optional; there is no payment requirement.
      </p>
    </form>
  )
}
