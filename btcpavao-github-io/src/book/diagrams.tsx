import { Pictogram } from "./pictogram"
const maps: Record<
  string,
  { title: string; items: [string, string, string][]; note: string }
> = {
  accounts: {
    title: "Where money sits. What money does.",
    items: [
      ["living", "Accounts", "Bank, cash, Bitcoin: locations."],
      ["budget", "Categories", "Food, repairs, giving: assigned jobs."],
    ],
    note: "A transfer changes the location. A purchase uses a category. Moving money between accounts does not create income.",
  },
  "free-capital": {
    title: "A balance is not a surplus",
    items: [
      ["money", "Current money", "Only money already received."],
      ["debt", "Existing claims", "Bills, taxes, debt and known expenses."],
      [
        "budget",
        "Free capital",
        "The uncommitted part after obligations and reserves.",
      ],
    ],
    note: "Future income is not available money. An account balance does not tell you how much is uncommitted.",
  },
  layers: {
    title: "Different jobs, different layers",
    items: [
      [
        "living",
        "Operating balance",
        "Near-term fiat bills and everyday payments.",
      ],
      [
        "exchange",
        "Conversion rail",
        "An exchange connects fiat and Bitcoin; it adds counterparty risk.",
      ],
      [
        "custody-continuity",
        "Long-term money",
        "Self-custody requires tested access, recovery and continuity.",
      ],
    ],
    note: "Each layer has a purpose. A balance at a custodian is a claim on someone else; bearer control requires your own keys.",
  },
  timeline: {
    title: "A known expense has a place in time",
    items: [
      ["budget", "Now", "Assign money that already exists."],
      [
        "debt",
        "Before the due date",
        "Build the category and arrange payment liquidity.",
      ],
      [
        "living",
        "Payment day",
        "Spend from the category prepared for this job.",
      ],
    ],
    note: "An annual bill is infrequent, not unexpected. Its timing belongs in today’s plan.",
  },
  thirds: {
    title: "A compass for the balance sheet",
    items: [
      ["money", "Money", "At least one third in this framework."],
      ["home", "Consumption", "No more than one third."],
      ["spend-hold-invest", "Productive assets", "No more than one third."],
    ],
    note: "These are the author’s directional limits, not a command to sell mechanically or buy productive assets just to fill a slice.",
  },
  decision: {
    title: "What job will this money do?",
    items: [
      ["living", "Spend", "Obtain use, comfort or experience."],
      ["money", "Hold", "Keep monetary purchasing power available."],
      [
        "spend-hold-invest",
        "Invest",
        "Commit capital to production, with risk.",
      ],
    ],
    note: "A purchase can be worthwhile without being an investment. Classify its purpose before calculating its return.",
  },
  continuity: {
    title: "Make the household less dependent on one person",
    items: [
      ["family", "People", "Who acts after death or incapacity?"],
      ["budget", "Instructions", "Where is the plan, and what should happen?"],
      [
        "custody-continuity",
        "Practice",
        "Can the intended person follow it without guessing?",
      ],
    ],
    note: "Legal authority, practical access and cryptographic control are separate requirements. Do not put wallet secrets into this website.",
  },
}
export function ConceptDiagram({ name }: { name: string }) {
  const d = maps[name]
  if (!d) return null
  return (
    <figure className="bam-diagram">
      <figcaption>{d.title}</figcaption>
      <div className="bam-diagram-items">
        {d.items.map(([icon, title, copy]) => (
          <div key={title}>
            <Pictogram name={icon} />
            <strong>{title}</strong>
            <p>{copy}</p>
          </div>
        ))}
      </div>
      <p className="bam-note">{d.note}</p>
    </figure>
  )
}
