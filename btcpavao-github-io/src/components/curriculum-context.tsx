import { useState } from "react"
import { CurriculumQuestionForm } from "@/components/curriculum-question-form"
import type { QuestionContext } from "@/curriculum-questions"

const standard = "https://btcpavao.gitbook.io/practical-bitcoin-standard"
const financialTopics = [
  ["Zero-based budget", "/money-management-wisdom/plan-your-money"],
  ["Becoming debt-free", "/money-management-wisdom/live-debt-free"],
  [
    "Systematic giving",
    "/money-management-wisdom/set-aside-and-keep-10-20-of-your-budget-for-giving",
  ],
  [
    "A balanced personal balance sheet",
    "/bitcoin-in-your-total-net-worth/keep-your-net-worth-composition-in-balance",
  ],
  [
    "Long-term expectations and volatility",
    "/bitcoin-in-your-total-net-worth/managing-future-bitcoin-price-expectations-and-handling-volatility",
  ],
]

export function CurriculumGateway() {
  return (
    <section className="course-gateway" aria-labelledby="before-custody-title">
      <p className="course-gateway__eyebrow">
        Before you begin · Pavao’s framework
      </p>
      <h2 id="before-custody-title">
        Self-custody is not necessarily step one.
      </h2>
      <p>
        Bitcoin custody is part of a larger Bitcoin-as-money system. Before
        optimizing how you custody Bitcoin, make sure you are solving the right
        problem.
      </p>
      <p>
        My order is budget, debt freedom, giving, a balanced personal balance
        sheet, and understanding Bitcoin’s long-term monetary trend and
        volatility — then security, custody and inheritance. This is my
        framework, not a universal admission rule.
      </p>
      <details className="course-lesson-details">
        <summary>Before you begin: five questions for yourself</summary>
        <ul>
          <li>Do I use a budget?</li>
          <li>Am I debt-free?</li>
          <li>Do I understand why I own Bitcoin?</li>
          <li>Do I understand how Bitcoin volatility affects my decisions?</li>
          <li>
            Am I looking for durable self-custody — or reacting to the latest
            security scare?
          </li>
        </ul>
        <p>
          A sophisticated wallet does not fix an absent budget, large debts,
          leverage or an unbalanced balance sheet. Treating Bitcoin mainly as a
          trade, buying from FOMO or selling from panic may deserve attention
          before another custody feature.
        </p>
        <nav aria-label="Practical Bitcoin Standard foundations">
          <ul>
            {financialTopics.map(([label, path]) => (
              <li key={path}>
                <a href={standard + path}>{label}</a>
              </li>
            ))}
          </ul>
        </nav>
        <p>
          The linked Practical Bitcoin Standard is my open guide. Its long-term
          price models are frameworks for thinking, not guarantees about future
          purchasing power.
        </p>
      </details>
      <p>
        You are welcome here wherever you are. You can continue the course now;
        keep the order of your own problems in view.
      </p>
      <a href="/#bitcoin-standard" className="course-copy-link">
        See how the two paths connect
      </a>
    </section>
  )
}

export function CurriculumHelp({
  context = { section: "Curriculum overview" },
  overview = false,
}: {
  context?: QuestionContext
  overview?: boolean
}) {
  const [open, setOpen] = useState(false)
  return (
    <aside className="course-human-help" aria-label="Ask Pavao">
      <h2>
        {overview
          ? "Your questions make this curriculum better"
          : "Something unclear? Ask Pavao."}
      </h2>
      <p>
        {overview
          ? "If a step is confusing, incomplete or missing, please ask. If something is unclear to you, there is a good chance someone else will wonder about it too. Your question may help me improve this curriculum for everyone."
          : "You don’t need to provide your name or email. Your question may also help me improve the curriculum for others who run into the same problem."}
      </p>
      <details
        className="course-question-panel"
        onToggle={(event) => setOpen(event.currentTarget.open)}
      >
        <summary>Ask Pavao — no name or email required</summary>
        {open && <CurriculumQuestionForm context={context} />}
      </details>
    </aside>
  )
}
