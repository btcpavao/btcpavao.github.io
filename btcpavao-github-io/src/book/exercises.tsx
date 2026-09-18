import { lazy, Suspense, useState } from "react"
import { Bar, Field, ToolBox } from "./tool-common"
import { usd, percent } from "./format"
import { investmentReturn } from "./decision-math.mjs"
const Trend = lazy(() => import("./trend"))
const Decision = lazy(() => import("./decision"))
function Budget() {
  const names = [
    "Housing",
    "Food",
    "Transport",
    "Known expenses",
    "Debt payoff / saving",
  ]
  const [v, set] = useState([35, 20, 10, 15, 10])
  const sum = v.reduce((a, b) => a + b, 0)
  return (
    <ToolBox
      title="Give every unit a job"
      caption="You have 100 units of money now. Assign it, then increase one category and move money from another."
    >
      <div className="bam-statline">
        <span>
          Available <strong>100</strong>
        </span>
        <span>
          Assigned <strong>{sum}</strong>
        </span>
        <span>
          Unassigned <strong>{100 - sum}</strong>
        </span>
      </div>
      {v.map((n, i) => (
        <label className="bam-slider" key={names[i]}>
          <span>
            {names[i]} <strong>{n}</strong>
          </span>
          <input
            aria-label={names[i]}
            type="range"
            min="0"
            max="100"
            value={n}
            onChange={(e) =>
              set(v.map((x, j) => (j === i ? +e.target.value : x)))
            }
          />
        </label>
      ))}
      <p role="status" className="bam-feedback">
        {sum === 100
          ? "Every unit now has a job. Increase one category to see why a change requires a trade-off."
          : sum > 100
            ? `You assigned ${sum - 100} units you do not have. Please move that much out of other categories.`
            : `${100 - sum} units still need a job. Zero-based does not mean spending everything; saving is a job too.`}
      </p>
      <button onClick={() => set([35, 20, 10, 15, 10])}>Reset example</button>
    </ToolBox>
  )
}
function Debt() {
  const [first, setFirst] = useState(500),
    [second, setSecond] = useState(0)
  return (
    <ToolBox
      title="Who has a claim on the next paycheck?"
      caption="Illustrative monthly income: $2,500. Add a second payment to see how much future income is already committed."
    >
      <label className="bam-slider">
        <span>First monthly debt payment: {usd(first)}</span>
        <input
          type="range"
          min="0"
          max="1500"
          step="50"
          value={first}
          onChange={(e) => setFirst(+e.target.value)}
        />
      </label>
      <label className="bam-slider">
        <span>Second monthly debt payment: {usd(second)}</span>
        <input
          type="range"
          min="0"
          max="1000"
          step="50"
          value={second}
          onChange={(e) => setSecond(+e.target.value)}
        />
      </label>
      <div className="bam-paychecks">
        {["Month 1", "Month 2", "Month 3"].map((m) => (
          <div key={m}>
            <strong>{m}</strong>
            <Bar
              values={[first + second, 2500 - first - second]}
              labels={["Debt claims", "Before living costs"]}
            />
          </div>
        ))}
      </div>
      <p className="bam-feedback" role="status">
        {usd(first + second)} of each paycheck is already committed.{" "}
        {usd(2500 - first - second)} remains before food, housing, taxes and
        other needs.
      </p>
    </ToolBox>
  )
}
const expenses = [
  [
    "Annual insurance",
    "Known",
    "An infrequent bill with a foreseeable due date belongs in a funded category.",
  ],
  [
    "Tires after known mileage",
    "Known",
    "You may not know the exact date, but wear is predictable.",
  ],
  [
    "A tax bill on earned income",
    "Known",
    "Estimate and reserve before treating business receipts as yours.",
  ],
  [
    "A sudden medical emergency",
    "Emergency",
    "The exact event is unexpected; a general reserve can still be prepared.",
  ],
  [
    "An annual subscription",
    "Known",
    "The payment repeats even when it feels distant.",
  ],
  [
    "A broken appliance",
    "Reserve",
    "The exact failure date is uncertain; eventual replacement is foreseeable.",
  ],
]
function Expenses() {
  const [answers, set] = useState<Record<string, string>>({})
  return (
    <ToolBox
      title="Known expense or emergency?"
      caption="Choose a category. The distinction is about preparation, not whether an event is inconvenient."
    >
      {expenses.map(([name, answer, why]) => (
        <div className="bam-quiz" key={name}>
          <h4>{name}</h4>
          <div className="bam-buttons">
            {["Known", "Emergency", "Reserve"].map((x) => (
              <button
                aria-pressed={answers[name] === x}
                key={x}
                onClick={() => set({ ...answers, [name]: x })}
              >
                {x}
              </button>
            ))}
          </div>
          {answers[name] && (
            <p role="status">
              {answers[name] === answer
                ? "Yes. "
                : `A useful classification is ${answer.toLowerCase()}. `}
              {why}
            </p>
          )}
        </div>
      ))}
    </ToolBox>
  )
}
function Giving() {
  const [money, set] = useState("10000")
  const n = Number(money)
  const valid = money !== "" && Number.isFinite(n) && n >= 0
  return (
    <ToolBox
      title="A category in the money you have"
      caption="This exercise applies after zero debt. Set aside 10–20% of your current money in the giving category."
    >
      <Field label="Total money layer (USD)" value={money} onChange={set} />
      {valid ? (
        <div className="bam-statline">
          {[0.1, 0.15, 0.2].map((p) => (
            <span key={p}>
              {percent(p)}
              <strong>{usd(n * p)}</strong>
            </span>
          ))}
        </div>
      ) : (
        <p role="alert">Please enter a non-negative money balance.</p>
      )}
      <p>
        Keep this category funded and give deliberately as needs and commitments
        arise.
      </p>
    </ToolBox>
  )
}
const assets = [
  [
    "Bitcoin",
    "Money",
    "Monetary purchasing power, with volatile exchange value.",
  ],
  [
    "Short fiat operating balance",
    "Money",
    "Money reserved for imminent payments.",
  ],
  [
    "Primary home",
    "Consumption",
    "Provides housing services to you; it is not cash income.",
  ],
  ["Family car", "Consumption", "Provides transport to your household."],
  [
    "Rental property with net income",
    "Productive",
    "Produces income after actual costs; vacancy and repairs matter.",
  ],
  [
    "Business equipment in use",
    "Productive",
    "Helps produce goods or services.",
  ],
  [
    "Business equity",
    "Productive",
    "Ownership of productive activity, carrying business risk.",
  ],
  [
    "Unused expensive vehicle",
    "Consumption",
    "A high resale estimate does not create productive cash flow.",
  ],
]
const decisions = [
  [
    "A family holiday",
    "Spend",
    "You are buying an experience; it need not pretend to be an investment.",
  ],
  [
    "Keeping uncommitted bitcoin",
    "Hold",
    "You retain money without committing it to production.",
  ],
  [
    "A machine for confirmed customer orders",
    "Invest",
    "Productive capacity, whose costs, use and risks still need analysis.",
  ],
  [
    "An expensive car called an investment",
    "Spend",
    "A label does not establish productive use. Actual business use could change the classification.",
  ],
]
function Classification({
  mode = "assets",
}: {
  mode?: "assets" | "decisions"
}) {
  const rows = mode === "assets" ? assets : decisions
  const choices =
    mode === "assets"
      ? ["Money", "Consumption", "Productive"]
      : ["Spend", "Hold", "Invest"]
  const [answers, set] = useState<Record<string, string>>({})
  return (
    <ToolBox
      title={
        mode === "assets"
          ? "Classify by role, not by price"
          : "Name the decision before doing the math"
      }
    >
      {rows.map(([name, answer, why]) => (
        <div className="bam-quiz" key={name}>
          <h4>{name}</h4>
          <div className="bam-buttons">
            {choices.map((c) => (
              <button
                key={c}
                aria-pressed={answers[name] === c}
                onClick={() => set({ ...answers, [name]: c })}
              >
                {c}
              </button>
            ))}
          </div>
          {answers[name] && (
            <p role="status">
              {answers[name] === answer
                ? "That fits this example. "
                : `In this example: ${answer.toLowerCase()}. `}
              {why}
            </p>
          )}
        </div>
      ))}
    </ToolBox>
  )
}
function Thirds() {
  const [v, set] = useState(["60000", "180000", "90000"])
  const valid = v.every((x) => x !== "" && Number.isFinite(+x) && +x >= 0),
    values = v.map(Number),
    total = values.reduce((a, b) => a + b, 0)
  return (
    <ToolBox
      title="Read the shape of a debt-free balance sheet"
      caption="Use current realistic asset values. This example assumes no liabilities; clear debt separately rather than hiding it inside asset categories."
    >
      <div className="bam-fields">
        {[
          "Money (USD)",
          "Consumption assets (USD)",
          "Productive assets (USD)",
        ].map((l, i) => (
          <Field
            key={l}
            label={l}
            value={v[i]}
            onChange={(x) => set(v.map((n, j) => (i === j ? x : n)))}
          />
        ))}
      </div>
      {valid && total > 0 ? (
        <>
          <Bar
            values={values}
            labels={["Money", "Consumption", "Productive"]}
          />
          <p role="status">
            Total assets: {usd(total)}. Money represents{" "}
            {percent(values[0] / total)}. Consumption represents{" "}
            {percent(values[1] / total)}. Productive assets represent{" "}
            {percent(values[2] / total)}.
          </p>
          <p className="bam-feedback">
            The compass asks for at least one third in money and no more than
            one third in either other category. What does your liquidity allow
            you to do? What would changing this balance cost?
          </p>
        </>
      ) : (
        <p role="alert">
          Please enter non-negative values with a positive total.
        </p>
      )}
    </ToolBox>
  )
}
function Investment() {
  const [v, set] = useState(["10000", "15000", "5", "10"])
  let result
  try {
    if (v.some((x) => x === "")) throw Error()
    result = investmentReturn(+v[0], +v[1], +v[2], +v[3] / 100)
  } catch {
    /* Display validation below. */
  }
  return (
    <ToolBox
      title="One investment, two measuring sticks"
      caption="Assume all net proceeds arrive at the end, after costs and taxes. For interim cash flows, each flow needs conversion at its own date."
    >
      <div className="bam-fields">
        {[
          "Value committed today (USD)",
          "Net terminal proceeds (USD)",
          "Years",
          "Assumed annual BTC growth (%)",
        ].map((l, i) => (
          <Field
            key={l}
            label={l}
            value={v[i]}
            min={i === 3 ? -90 : 0}
            onChange={(x) => set(v.map((n, j) => (i === j ? x : n)))}
          />
        ))}
      </div>
      {result ? (
        <>
          <div className="bam-statline">
            <span>
              Total fiat return<strong>{percent(result.fiat)}</strong>
            </span>
            <span>
              Total BTC-denominated return
              <strong>{percent(result.bitcoin)}</strong>
            </span>
          </div>
          <p role="status">
            Keeping the initial money in BTC would end at {usd(result.hurdle)}{" "}
            under the selected growth path.
          </p>
          <p className="bam-formula">
            BTC return = (future proceeds ÷ initial value) ÷ (1 + BTC growth)
            <sup>years</sup> − 1
          </p>
        </>
      ) : (
        <p role="alert">
          Please enter a positive starting value and period, and non-negative
          proceeds.
        </p>
      )}
    </ToolBox>
  )
}
function Policy() {
  const prompts = [
    "Our purpose for money",
    "Budget review rhythm and responsible people",
    "Debt exit commitment / no-new-debt rule",
    "Giving category after zero debt",
    "Near-term fiat needs and conversion process",
    "Known expenses and liquidity reserves",
    "Balance-sheet review and large-decision threshold",
    "Custody roles and where non-secret instructions exist",
    "Who acts after death or incapacity",
    "Next action in 30 days; review in 60 and 90 days",
  ]
  const [v, set] = useState<Record<string, string>>({})
  const text =
    "My Bitcoin-as-Money policy\n\n" +
    prompts.map((p) => p + "\n" + (v[p] || "[To complete]")).join("\n\n")
  function download() {
    const url = URL.createObjectURL(
      new Blob([text], { type: "text/plain;charset=utf-8" })
    )
    const a = document.createElement("a")
    a.href = url
    a.download = "my-bitcoin-policy.txt"
    document.body.appendChild(a)
    a.click()
    a.remove()
    setTimeout(() => URL.revokeObjectURL(url), 1000)
  }
  return (
    <ToolBox
      title="Write the policy you can explain"
      caption="Use ordinary language. Please keep private keys, wallet passwords, account numbers and access secrets out of this plan. Entries disappear when you leave unless you download your copy."
    >
      {prompts.map((p) => (
        <label className="bam-field" key={p}>
          <span>{p}</span>
          <textarea
            rows={2}
            value={v[p] ?? ""}
            onChange={(e) => set({ ...v, [p]: e.target.value })}
          />
        </label>
      ))}
      <button onClick={download}>Download my policy</button>
      <details>
        <summary>View complete policy for copying</summary>
        <label className="bam-field">
          <span>Complete policy text</span>
          <textarea rows={14} readOnly value={text} />
        </label>
      </details>
    </ToolBox>
  )
}
export default function Exercise({ name }: { name: string }) {
  const simple: Record<string, React.ReactNode> = {
    budget: <Budget />,
    expenses: <Expenses />,
    debt: <Debt />,
    giving: <Giving />,
    classification: <Classification />,
    thirds: <Thirds />,
    investment: <Investment />,
    policy: <Policy />,
  }
  return (
    <Suspense fallback={<p className="bam-note">Loading the exercise…</p>}>
      {name === "trend" ? (
        <Trend />
      ) : name === "decision" ? (
        <>
          <Classification mode="decisions" />
          <Decision />
        </>
      ) : (
        (simple[name] ?? null)
      )}
    </Suspense>
  )
}
