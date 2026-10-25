import {
  Children,
  isValidElement,
  useId,
  useState,
  type ReactNode,
} from "react"
import type { ConceptVisual as Visual } from "@/curriculum/concept-types"

// A synchronized text alternative keeps compact SVG labels readable on phones
// and exposes their current values without requiring visual interpretation.
function diagramLabels(node: ReactNode): string[] {
  const labels: string[] = []
  const text = (children: ReactNode): string =>
    Children.toArray(children)
      .map((child) =>
        typeof child === "string" || typeof child === "number"
          ? String(child)
          : isValidElement<{ children?: ReactNode }>(child)
            ? text(child.props.children)
            : ""
      )
      .join("")
  Children.forEach(node, (child) => {
    if (!isValidElement<{ children?: ReactNode; label?: string }>(child)) return
    if (child.type === "text") labels.push(text(child.props.children))
    else if (child.props.label) labels.push(child.props.label)
    else labels.push(...diagramLabels(child.props.children))
  })
  return labels.filter(Boolean)
}

function File({
  x,
  y,
  locked = false,
}: {
  x: number
  y: number
  locked?: boolean
}) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <path
        d="M0 0h36l14 14v50H0z M36 0v14h14"
        fill="var(--background)"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M10 26h28M10 34h28M10 42h18"
        stroke="currentColor"
        strokeWidth="2"
      />
      {locked && (
        <g transform="translate(30 40)">
          <rect
            width="26"
            height="22"
            rx="4"
            fill="var(--background)"
            stroke="var(--concept-accent)"
            strokeWidth="3"
          />
          <path
            d="M6 0v-6a7 7 0 0 1 14 0v6"
            fill="none"
            stroke="var(--concept-accent)"
            strokeWidth="3"
          />
        </g>
      )}
    </g>
  )
}
function Key({ x, y }: { x: number; y: number }) {
  return (
    <g
      transform={`translate(${x} ${y})`}
      stroke="var(--concept-accent)"
      strokeWidth="4"
      fill="none"
    >
      <circle cx="10" cy="10" r="9" />
      <path d="M18 16l24 24m-7-7l7-7m-14 0l7-7" />
    </g>
  )
}
function Computer({ x, y, label }: { x: number; y: number; label: string }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect
        width="112"
        height="72"
        rx="5"
        fill="var(--background)"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M-10 82h132l-10 10H0z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />
      <text x="56" y="42" textAnchor="middle">
        {label}
      </text>
    </g>
  )
}
function Arrow({ x, y, width = 70 }: { x: number; y: number; width?: number }) {
  return (
    <path
      d={`M${x} ${y}h${width}m-9-6l9 6-9 6`}
      fill="none"
      stroke="var(--concept-accent)"
      strokeWidth="3"
    />
  )
}
function Slider({
  label,
  value,
  min,
  max,
  onChange,
}: {
  label: string
  value: number
  min: number
  max: number
  onChange: (n: number) => void
}) {
  const id = useId()
  return (
    <label className="concept-control" htmlFor={id}>
      <span>
        {label} <output>{value.toLocaleString()}</output>
      </span>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      />
    </label>
  )
}

export function ConceptVisual({
  visual,
  lessonId,
}: {
  visual: Visual
  lessonId: string
}) {
  const titleId = useId(),
    captionId = useId()
  const [count, setCount] = useState(1),
    [separate, setSeparate] = useState(true),
    [failed, setFailed] = useState(false)
  const [words, setWords] = useState(6),
    [list, setList] = useState(7776),
    [layers, setLayers] = useState(2)
  const [innerWords, setInnerWords] = useState(6),
    [outerWords, setOuterWords] = useState(4),
    [thirdWords, setThirdWords] = useState(5),
    [budgetBits, setBudgetBits] = useState(60)
  const [value, setValue] = useState(100000),
    [probability, setProbability] = useState(50),
    [success, setSuccess] = useState(50),
    [cost, setCost] = useState(10000)
  const [distance, setDistance] = useState(0),
    [remote, setRemote] = useState(false),
    [records, setRecords] = useState(2)
  const isTheft = lessonId === "copies-and-theft"
  let drawing: React.ReactNode
  let controls: React.ReactNode
  let result: React.ReactNode
  switch (visual.kind) {
    case "learning":
      drawing = (
        <>
          <path
            d="M80 100Q240 0 400 100M400 110Q470 220 330 260M300 270Q120 320 80 180"
            fill="none"
            stroke="var(--concept-accent)"
            strokeWidth="3"
            strokeDasharray="7 5"
          />
          {[
            ["Observe", 80, 90],
            ["Ask why", 320, 90],
            ["Test a solution", 280, 240],
            ["Notice consequences", 20, 240],
          ].map(([t, x, y]) => (
            <text key={t} x={x} y={y}>
              {t}
            </text>
          ))}
          <text
            x="240"
            y="175"
            textAnchor="middle"
            className="concept-svg-emphasis"
          >
            One idea at a time
          </text>
        </>
      )
      break
    case "gold":
      drawing = (
        <>
          <text x="110" y="38" textAnchor="middle">
            Physical gold
          </text>
          <path
            d="M45 110l25-45h95l25 45-15 28H60zM45 110h145M70 65l15 45M165 65l-15 45"
            fill="var(--muted)"
            stroke="var(--concept-accent)"
            strokeWidth="3"
          />
          <Arrow x={70} y={190} />
          <text x="110" y="235" textAnchor="middle">
            One bar moves
          </text>
          <path d="M240 25v260" stroke="currentColor" opacity=".2" />
          <text x="365" y="38" textAnchor="middle">
            Signing information
          </text>
          <File x={340} y={70} />
          <path
            d="M365 140v25m-65 0h130m-130 0v20m65-20v20m65-20v20"
            fill="none"
            stroke="var(--concept-accent)"
            strokeWidth="2"
          />
          {[275, 340, 405].map((x) => (
            <File key={x} x={x} y={190} />
          ))}
          <text x="365" y="290" textAnchor="middle">
            Same authority, more copies
          </text>
        </>
      )
      break
    case "copies": {
      const shown = Math.min(count, 100),
        lost = failed ? (separate ? 1 : count) : 0
      controls = (
        <>
          <label className="concept-control">
            Copies
            <select
              value={count}
              onChange={(e) => setCount(Number(e.target.value))}
            >
              <option value={1}>1 copy</option>
              <option value={10}>10 copies</option>
              <option value={1000}>1,000 copies</option>
            </select>
          </label>
          <label>
            <input
              type="checkbox"
              checked={separate}
              onChange={(e) => setSeparate(e.target.checked)}
            />{" "}
            Independent locations
          </label>
          <button
            type="button"
            className="course-action course-action--secondary"
            onClick={() => setFailed(!failed)}
          >
            {failed ? "Restore the scenario" : "Simulate losing one location"}
          </button>
        </>
      )
      drawing = (
        <>
          <text x="240" y="30" textAnchor="middle">
            {separate ? "Separate failure domains" : "One shared location"}
          </text>
          <rect
            x="25"
            y="50"
            width="430"
            height="200"
            rx="15"
            fill="none"
            stroke="currentColor"
            strokeDasharray={separate ? "3 8" : undefined}
          />
          {Array.from({ length: shown }, (_, i) => {
            const x = 50 + (i % 10) * 42,
              y = 73 + Math.floor(i / 10) * 18
            return (
              <g key={i}>
                <rect
                  x={x}
                  y={y}
                  width="20"
                  height="12"
                  rx="2"
                  fill={
                    failed && (!separate || i === 0)
                      ? "none"
                      : isTheft
                        ? "var(--concept-accent)"
                        : "currentColor"
                  }
                  opacity={failed && (!separate || i === 0) ? ".25" : ".65"}
                  stroke="currentColor"
                />
                {failed && (!separate || i === 0) && (
                  <path
                    d={`M${x} ${y}l20 12m-20 0l20-12`}
                    stroke="currentColor"
                  />
                )}
              </g>
            )
          })}
          <text x="240" y="285" textAnchor="middle">
            {count === 1000
              ? "Grouped view: each mark represents 10 copies"
              : "Each mark represents one copy"}
          </text>
        </>
      )
      result = (
        <p aria-live="polite">
          {count - lost} of {count.toLocaleString()} copies survive the
          scenario.{" "}
          {isTheft
            ? "Every surviving unprotected copy remains a possible theft route."
            : "This illustrates shared failures, not a measured probability."}
          {count === 1000 && failed && separate
            ? " One actual copy is lost; the crossed group indicates its location."
            : ""}
        </p>
      )
      break
    }
    case "separation":
      controls = (
        <>
          <label>
            <input
              type="checkbox"
              checked={separate}
              onChange={(e) => setSeparate(e.target.checked)}
            />{" "}
            Store file and secret separately
          </label>
          <label>
            <input
              type="checkbox"
              checked={failed}
              onChange={(e) => setFailed(e.target.checked)}
            />{" "}
            Lose all records of the required secret
          </label>
        </>
      )
      drawing = (
        <>
          <rect
            x="25"
            y="50"
            width={separate ? 190 : 430}
            height="200"
            rx="20"
            stroke="currentColor"
            fill="none"
            strokeDasharray="6 6"
          />
          <text x="115" y="85" textAnchor="middle">
            File location
          </text>
          <File x={90} y={130} locked />
          {separate && (
            <rect
              x="270"
              y="50"
              width="185"
              height="200"
              rx="20"
              stroke="currentColor"
              fill="none"
              strokeDasharray="6 6"
            />
          )}
          <text x="360" y="85" textAnchor="middle">
            Secret location
          </text>
          <g opacity={failed ? 0.15 : 1}>
            <Key x={335} y={140} />
          </g>
          {failed && (
            <path
              d="M325 130l65 70m-65 0l65-70"
              stroke="var(--concept-accent)"
              strokeWidth="3"
            />
          )}
          <text x="240" y="290" textAnchor="middle">
            {failed
              ? "A file cannot replace a missing secret"
              : separate
                ? "One discovery does not supply both"
                : "One discovery can supply both"}
          </text>
        </>
      )
      result = (
        <p>
          Conceptual file-and-secret model. A Core-encrypted backup inside GPG
          also needs the separate Core passphrase.
        </p>
      )
      break
    case "privacy":
      controls = (
        <label>
          <input
            type="checkbox"
            checked={separate}
            onChange={(e) => setSeparate(e.target.checked)}
          />{" "}
          Reveal contextual labels
        </label>
      )
      drawing = (
        <>
          <File x={80} y={90} locked />
          <path
            d="M150 120h70"
            stroke="var(--concept-accent)"
            strokeDasharray="5 5"
          />
          <rect
            x="240"
            y="55"
            width="210"
            height="175"
            rx="12"
            fill="var(--muted)"
          />
          <text x="255" y="90">
            {separate ? "Bitcoin backup" : "Encrypted data"}
          </text>
          <text x="255" y="125">
            {separate ? "Claimed value: 100 BTC" : "Purpose: unknown"}
          </text>
          <text x="255" y="160">
            {separate ? "Related file: identified" : "Related secrets: unknown"}
          </text>
          <text x="255" y="195">
            {separate ? "Owner: identified" : "Value: not in file size"}
          </text>
          <text x="240" y="280" textAnchor="middle">
            Same ciphertext. Different available context.
          </text>
        </>
      )
      break
    case "economics": {
      const reward = (((value * probability) / 100) * success) / 100,
        scale = Math.max(reward, cost, 1)
      controls = (
        <>
          <Slider
            label="Assumed value (USD)"
            value={value}
            min={1000}
            max={1000000}
            onChange={setValue}
          />
          <Slider
            label="Assumed chance of value (%)"
            value={probability}
            min={0}
            max={100}
            onChange={setProbability}
          />
          <Slider
            label="Assumed success if valuable (%)"
            value={success}
            min={0}
            max={100}
            onChange={setSuccess}
          />
          <Slider
            label="Assumed attack cost (USD)"
            value={cost}
            min={0}
            max={1000000}
            onChange={setCost}
          />
        </>
      )
      drawing = (
        <>
          <text x="30" y="55">
            Expected reward
          </text>
          <rect
            x="30"
            y="75"
            width={(420 * reward) / scale}
            height="45"
            rx="5"
            fill="var(--concept-accent)"
          />
          <text x="30" y="165">
            Assumed cost
          </text>
          <rect
            x="30"
            y="185"
            width={(420 * cost) / scale}
            height="45"
            rx="5"
            fill="currentColor"
            opacity=".6"
          />
          <text x="30" y="285">
            Illustrative assumptions only
          </text>
        </>
      )
      result = (
        <p aria-live="polite">
          Expected reward: ${Math.round(reward).toLocaleString()}. Net payoff: $
          {Math.round(reward - cost).toLocaleString()}. No probabilities here
          are measured.
        </p>
      )
      break
    }
    case "guessing":
      drawing = (
        <>
          <text x="30" y="45">
            Fictional public clues
          </text>
          <text x="30" y="95">
            Pet: Luna
          </text>
          <text x="30" y="130">
            Birth year: 1986
          </text>
          <text x="30" y="165">
            Band: favorite artist
          </text>
          <Arrow x={220} y={130} width={45} />
          <path
            d="M300 75h145l-50 70v75l-45-15v-60z"
            fill="var(--muted)"
            stroke="var(--concept-accent)"
            strokeWidth="2"
          />
          <text x="375" y="260" textAnchor="middle">
            Targeted guesses
          </text>
          <text x="25" y="300">
            A random generator does not consult this biography.
          </text>
        </>
      )
      break
    case "entropy": {
      const bits = words * Math.log2(list)
      controls = (
        <>
          <Slider
            label="Independent random words"
            value={words}
            min={1}
            max={8}
            onChange={setWords}
          />
          <label className="concept-control">
            Wordlist size
            <select
              value={list}
              onChange={(e) => setList(Number(e.target.value))}
            >
              <option value={7776}>7,776 — theoretical EFF-sized list</option>
              <option value={7772}>
                7,772 — reviewed KeePassXC bundled list
              </option>
            </select>
          </label>
        </>
      )
      drawing = (
        <>
          <path d="M45 25v225h400" stroke="currentColor" fill="none" />
          <text x="240" y="298" textAnchor="middle">
            Words
          </text>
          {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
            <g key={n}>
              <rect
                x={55 + (n - 1) * 48}
                y={245 - n * 24}
                width="28"
                height={n * 24}
                fill="var(--concept-accent)"
                opacity={n === words ? 1 : 0.45}
              />
              <text x={68 + (n - 1) * 48} y="272" textAnchor="middle">
                {n}
              </text>
            </g>
          ))}
          <text x="50" y="20">
            Entropy (bits): a linear scale
          </text>
          <text x="240" y="330" textAnchor="middle">
            Candidates grow exponentially: Nⁿ
          </text>
        </>
      )
      result = (
        <p aria-live="polite">
          <strong>{bits.toFixed(2)} bits</strong> ·{" "}
          {Math.pow(list, words).toExponential(3)} possible phrases. One
          additional independent word multiplies candidates by{" "}
          {list.toLocaleString()}. These are selection possibilities, not a
          measured attack cost.
        </p>
      )
      break
    }
    case "layers": {
      const counts = Array.from(
          { length: layers },
          (_, i) => [innerWords, outerWords, thirdWords][i]
        ),
        bits = counts.reduce((s, n) => s + n * Math.log2(7776), 0)
      controls = (
        <>
          <Slider
            label="GPG layers"
            value={layers}
            min={1}
            max={3}
            onChange={setLayers}
          />
          <Slider
            label="Inner layer words"
            value={innerWords}
            min={1}
            max={8}
            onChange={setInnerWords}
          />
          {layers > 1 && (
            <Slider
              label="Second layer words"
              value={outerWords}
              min={1}
              max={8}
              onChange={setOuterWords}
            />
          )}{" "}
          {layers > 2 && (
            <Slider
              label="Outermost layer words"
              value={thirdWords}
              min={1}
              max={8}
              onChange={setThirdWords}
            />
          )}
          <label>
            <input
              type="checkbox"
              checked={failed}
              onChange={(e) => setFailed(e.target.checked)}
            />{" "}
            A required layer secret is unavailable
          </label>
        </>
      )
      drawing = (
        <>
          {Array.from({ length: layers }, (_, i) => (
            <g key={i}>
              <ellipse
                cx="150"
                cy="158"
                rx={55 + i * 28}
                ry={65 + i * 32}
                fill="none"
                stroke="var(--concept-accent)"
                strokeWidth="3"
                strokeDasharray={failed && i === layers - 1 ? "6 5" : undefined}
              />
              <text x={280} y={80 + i * 60}>
                Layer {i + 1}: {counts[i]} words
              </text>
              <text x={280} y={102 + i * 60}>
                {(counts[i] * Math.log2(7776)).toFixed(1)} bits
              </text>
            </g>
          ))}
          <File x={125} y={122} locked />
          <text x="240" y="310" textAnchor="middle">
            {failed
              ? "Recovery stops at the missing secret"
              : "Open outermost → innermost → Core"}
          </text>
        </>
      )
      result = (
        <p aria-live="polite">
          {layers + 2} required component categories: final file, {layers} GPG{" "}
          {layers === 1 ? "secret" : "secrets"} and Core secret. GPG secret-set
          entropy: {bits.toFixed(1)} bits. Illustrative sequential average
          candidates:{" "}
          {counts
            .reduce((s, n) => s + (Math.pow(7776, n) + 1) / 2, 0)
            .toExponential(2)}
          , before format-specific work per guess. The entropy sum is not
          effective nested-attack strength.
        </p>
      )
      break
    }
    case "geography":
      controls = (
        <>
          <label className="concept-control">
            Storage scenario
            <select
              value={distance}
              onChange={(e) => setDistance(Number(e.target.value))}
            >
              <option value={0}>Two rooms in one house</option>
              <option value={1}>Illustrative two-hour drive</option>
              <option value={2}>Illustrative ten-hour flight</option>
            </select>
          </label>
          <label>
            <input
              type="checkbox"
              checked={remote}
              onChange={(e) => setRemote(e.target.checked)}
            />{" "}
            A remembered or remotely available copy bypasses travel
          </label>
        </>
      )
      drawing = (
        <>
          <path
            d="M15 180Q80 50 150 135T280 100T465 175L460 260Q320 220 240 280T20 240z"
            fill="var(--muted)"
          />
          <circle cx="85" cy="170" r="9" fill="var(--concept-accent)" />
          <circle
            cx={150 + distance * 120}
            cy="130"
            r="9"
            fill="var(--concept-accent)"
          />
          <path
            d={`M85 170Q200 ${30 - distance * 10} ${150 + distance * 120} 130`}
            fill="none"
            stroke="var(--concept-accent)"
            strokeWidth="3"
            strokeDasharray="6 6"
          />
          <Key x={55} y={195} />
          <Key x={140 + distance * 120} y={155} />
          <text x="240" y="40" textAnchor="middle">
            {remote
              ? "An alternate path can bypass distance"
              : [
                  "Nearby retrieval",
                  "Travel and access needed",
                  "International logistics",
                ][distance]}
          </text>
          <text x="240" y="315" textAnchor="middle">
            Illustrative map — not actual locations
          </text>
        </>
      )
      result = (
        <p>
          {remote
            ? "The fastest available path, including memory or transmission, determines access."
            : "Travel scenarios add logistical obligations for owner and attacker."}{" "}
          This is not a Bitcoin-enforced timelock.
        </p>
      )
      break
    case "complexity":
      controls = (
        <>
          <Slider
            label="Layer passwords"
            value={layers}
            min={1}
            max={100}
            onChange={setLayers}
          />
          <Slider
            label="Records of each password"
            value={records}
            min={1}
            max={10}
            onChange={setRecords}
          />
        </>
      )
      drawing = (
        <>
          {Array.from({ length: Math.min(layers * records, 1000) }, (_, i) => (
            <rect
              key={i}
              x={20 + (i % 40) * 11}
              y={20 + Math.floor(i / 40) * 10}
              width="6"
              height="6"
              fill="var(--concept-accent)"
            />
          ))}
          <text x="240" y="295" textAnchor="middle">
            {(layers * records).toLocaleString()} layer-passphrase artifacts
          </text>
        </>
      )
      result = (
        <p aria-live="polite">
          Add final-file copies and Core passphrase records to this inventory.
          This count measures maintenance burden, not a security score.
        </p>
      )
      break
    case "hardware":
      drawing = (
        <>
          <path
            d="M10 70Q70 35 130 70T250 70T370 70T470 70M10 95Q70 60 130 95T250 95T370 95T470 95"
            fill="none"
            stroke="currentColor"
            opacity=".5"
          />
          <ellipse cx="110" cy="185" rx="100" ry="78" fill="var(--muted)" />
          <ellipse
            cx="290"
            cy="185"
            rx="60"
            ry="55"
            fill="none"
            stroke="var(--concept-accent)"
            strokeWidth="2"
          />
          <ellipse
            cx="415"
            cy="185"
            rx="38"
            ry="38"
            fill="none"
            stroke="var(--concept-accent)"
            strokeWidth="3"
          />
          {[45, 80, 115, 150, 185, 260, 285, 310, 395, 415, 430].map((x, i) => (
            <path
              key={x}
              d={`M${x - 6} ${168 + (i % 3) * 15}q8-8 16 0q-8 8-16 0l-5-5v10z`}
              fill="var(--concept-accent)"
            />
          ))}
          <text x="110" y="290" textAnchor="middle">
            Generic computers
          </text>
          <text x="285" y="290" textAnchor="middle">
            Recognizable DIY
          </text>
          <text x="405" y="315" textAnchor="middle">
            Wallet devices
          </text>
        </>
      )
      result = (
        <p>
          Conceptual target concentration, not measured market shares or
          device-security rankings.
        </p>
      )
      break
    case "isolation":
      controls = (
        <label>
          <input
            type="checkbox"
            checked={separate}
            onChange={(e) => setSeparate(e.target.checked)}
          />{" "}
          Dedicated offline signing environment
        </label>
      )
      drawing = (
        <>
          {(separate
            ? ["PSBT data", "Backup media"]
            : ["Browser", "Email", "Downloads", "Chat", "Extensions", "Network"]
          ).map((label, i, a) => {
            const angle = (i / a.length) * Math.PI * 2,
              x = 240 + Math.cos(angle) * 180,
              y = 158 + Math.sin(angle) * 120
            return (
              <g key={label}>
                <path
                  d={`M${x} ${y}L240 158`}
                  stroke="var(--concept-accent)"
                  strokeWidth="2"
                  strokeDasharray={separate ? "5 5" : undefined}
                />
                <rect
                  x={x - 60}
                  y={y - 14}
                  width="120"
                  height="28"
                  rx="6"
                  fill="var(--background)"
                />
                <text x={x} y={y + 5} textAnchor="middle">
                  {label}
                </text>
              </g>
            )
          })}
          <Computer x={185} y={115} label="Core signer" />
        </>
      )
      result = (
        <p>
          {separate
            ? "Transferred data and physical access remain boundaries to control."
            : "Daily activities introduce many unrelated inputs around key use."}
        </p>
      )
      break
    case "vault":
      controls = (
        <button
          type="button"
          className="course-action course-action--secondary"
          onClick={() => setFailed(!failed)}
        >
          {failed ? "Start another session" : "Simulate shutdown"}
        </button>
      )
      drawing = (
        <>
          <rect
            x="20"
            y="35"
            width="220"
            height="245"
            rx="20"
            fill="var(--muted)"
            stroke="currentColor"
            strokeDasharray="5 5"
          />
          <text x="130" y="70" textAnchor="middle">
            Private RAM workspace
          </text>
          <g opacity={failed ? 0.12 : 1}>
            <Computer x={70} y={105} label="Core" />
            <Key x={100} y={215} />
          </g>
          <Arrow x={245} y={155} width={60} />
          <File x={345} y={115} locked />
          <text x="365" y="230" textAnchor="middle">
            External backup
          </text>
          <text x="240" y="315" textAnchor="middle">
            {failed
              ? "Next session: restore with separate secrets"
              : "Backup is an explicit operation before shutdown"}
          </text>
        </>
      )
      break
    case "validation":
      drawing = (
        <>
          <Computer x={20} y={110} label="Your node" />
          <Computer x={340} y={110} label="Offline signer" />
          <Arrow x={155} y={135} width={140} />
          <text x="225" y="115" textAnchor="middle">
            PSBT proposal
          </text>
          <path
            d="M300 180H155m9-6l-9 6 9 6"
            stroke="var(--concept-accent)"
            strokeWidth="3"
            fill="none"
          />
          <text x="225" y="210" textAnchor="middle">
            Signed result
          </text>
          <text x="77" y="265" textAnchor="middle">
            Validate / observe
          </text>
          <text x="397" y="265" textAnchor="middle">
            Review / authorize
          </text>
          <path d="M320 40v250" stroke="currentColor" strokeDasharray="5 6" />
          <text x="225" y="40" textAnchor="middle">
            Separate roles, controlled information flow
          </text>
        </>
      )
      break
    case "policy":
      controls = (
        <Slider
          label="Available independent signatures"
          value={count}
          min={0}
          max={3}
          onChange={setCount}
        />
      )
      drawing = (
        <>
          <text x="105" y="35" textAnchor="middle">
            Access protection
          </text>
          <ellipse
            cx="105"
            cy="150"
            rx="85"
            ry="95"
            fill="none"
            stroke="var(--concept-accent)"
            strokeWidth="3"
          />
          <ellipse
            cx="105"
            cy="150"
            rx="65"
            ry="75"
            fill="none"
            stroke="var(--concept-accent)"
            strokeWidth="2"
          />
          <File x={80} y={115} locked />
          <text x="105" y="285" textAnchor="middle">
            One signing authority
          </text>
          <text x="355" y="35" textAnchor="middle">
            2-of-3 authorization
          </text>
          {[0, 1, 2].map((i) => (
            <g key={i} opacity={i < count ? 1 : 0.2}>
              <Key x={270 + i * 65} y={100} />
              <path d={`M${295 + i * 65} 150L355 210`} stroke="currentColor" />
            </g>
          ))}
          <rect
            x="280"
            y="215"
            width="160"
            height="45"
            rx="6"
            fill="var(--muted)"
          />
          <text x="360" y="243" textAnchor="middle">
            {count >= 2 ? "Threshold satisfied" : "Need another signer"}
          </text>
        </>
      )
      result = (
        <p aria-live="polite">
          {count} of 3 signatures available; 2 required. Opening file-encryption
          layers does not change that spending rule.
        </p>
      )
      break
    case "strength-cost": {
      const bits = words * Math.log2(7776),
        margin = bits - 1 - budgetBits
      controls = (
        <>
          <Slider
            label="Independent random words"
            value={words}
            min={1}
            max={40}
            onChange={setWords}
          />
          <Slider
            label="Hypothetical guessing budget (log₂ candidates)"
            value={budgetBits}
            min={20}
            max={120}
            onChange={setBudgetBits}
          />
        </>
      )
      drawing = (
        <>
          <text x="20" y="25">
            Average search work · log₂ candidate count
          </text>
          <path d="M25 45v150h430" stroke="currentColor" fill="none" />
          {Array.from({ length: 40 }, (_, i) => (
            <rect
              key={i}
              x={30 + i * 10.5}
              y={195 - (i + 1) * 3.5}
              width="7"
              height={(i + 1) * 3.5}
              fill="var(--concept-accent)"
              opacity={i + 1 === words ? 1 : 0.35}
            />
          ))}
          <path
            d={`M25 ${195 - ((budgetBits + 1) / Math.log2(7776)) * 3.5}h430`}
            stroke="currentColor"
            strokeDasharray="5 4"
          />
          <text x="20" y="225">
            Dashed line: assumed candidate budget
          </text>
          <text x="20" y="265">
            Words to record and verify: {words}
          </text>
          {Array.from({ length: words }, (_, i) => (
            <rect
              key={i}
              x={25 + (i % 20) * 22}
              y={285 + Math.floor(i / 20) * 20}
              width="17"
              height="12"
              rx="2"
              fill="var(--concept-accent)"
            />
          ))}
        </>
      )
      result = (
        <p aria-live="polite">
          {bits.toFixed(1)} bits of entropy. Average candidate work is{" "}
          {Math.abs(margin).toFixed(1)} bits {margin >= 0 ? "above" : "below"}{" "}
          the hypothetical budget. Additional words keep increasing mathematical
          work and transcription burden. The budget is an assumption, not a
          hardware benchmark or a recommendation; use the retained attack-cost
          calculator for format-specific scenarios.
        </p>
      )
      break
    }
    case "deterrence":
      controls = (
        <label>
          <input
            type="checkbox"
            checked={separate}
            onChange={(e) => setSeparate(e.target.checked)}
          />{" "}
          Disclose purpose, value and layer details
        </label>
      )
      drawing = (
        <>
          {[
            ["Discover object", "Encrypted bytes"],
            ["Identify purpose", separate ? "Known wallet" : "Uncertain"],
            [
              "Estimate reward",
              separate ? "Claimed $100 million" : "Unknown value",
            ],
            [
              "Estimate effort",
              separate ? "Two 3-word secrets" : "Unknown architecture",
            ],
            [
              "Decide whether to invest",
              separate ? "Compare work and payoff" : "Investigate or stop?",
            ],
          ].map(([a, b], i) => (
            <g key={a}>
              <rect
                x="15"
                y={10 + i * 66}
                width="250"
                height="48"
                rx="9"
                fill="var(--muted)"
              />
              <text x="140" y={40 + i * 66} textAnchor="middle">
                {a}
              </text>
              <text x="280" y={40 + i * 66}>
                {b}
              </text>
              {i < 4 && (
                <path
                  d={`M140 ${60 + i * 66}v13m-5-5l5 5 5-5`}
                  fill="none"
                  stroke="var(--concept-accent)"
                  strokeWidth="2"
                />
              )}
            </g>
          ))}
        </>
      )
      result = (
        <p>
          Disclosure changes what an attacker can estimate before paying to
          attack. Unknown purpose or value creates uncertainty; it does not
          guarantee that the object will be ignored.
        </p>
      )
      break
    case "scaling":
      controls = (
        <Slider
          label="Illustrative purchasing-power multiplier"
          value={count}
          min={1}
          max={10}
          onChange={setCount}
        />
      )
      drawing = (
        <>
          <text x="115" y="35" textAnchor="middle">
            Physical gold
          </text>
          <text x="365" y="35" textAnchor="middle">
            Same signing keys
          </text>
          {Array.from({ length: count }, (_, i) => (
            <path
              key={i}
              d={`M${30 + (i % 2) * 85} ${65 + Math.floor(i / 2) * 40}h60l10 25h-80z`}
              fill="var(--muted)"
              stroke="var(--concept-accent)"
              strokeWidth="2"
            />
          ))}
          <File x={340} y={115} locked />
          <path d="M240 50v240" stroke="currentColor" opacity=".2" />
          <text x="115" y="300" textAnchor="middle">
            More physical capacity
          </text>
          <text x="365" y="300" textAnchor="middle">
            Same-sized secret
          </text>
        </>
      )
      result = (
        <p aria-live="polite">
          At {count}× the illustrative value, gold volume scales with quantity.
          A larger balance under the same Bitcoin keys does not require longer
          keys. Greater value can still justify a changed threat model and
          protection budget.
        </p>
      )
      break
    case "wallet-privacy":
      controls = (
        <label>
          <input
            type="checkbox"
            checked={separate}
            onChange={(e) => setSeparate(e.target.checked)}
          />{" "}
          Answer wallet queries using your own validating node
        </label>
      )
      drawing = (
        <>
          <Computer x={20} y={100} label="Wallet" />
          <Computer
            x={345}
            y={100}
            label={separate ? "Your node" : "Service"}
          />
          <Arrow x={160} y={130} width={160} />
          <text x="240" y="100" textAnchor="middle">
            Wallet-specific queries
          </text>
          <path
            d="M240 50v220"
            stroke="currentColor"
            strokeDasharray={separate ? "2 8" : "7 5"}
            opacity=".4"
          />
          <text x="240" y="245" textAnchor="middle">
            {separate
              ? "Inside your controlled environment"
              : "Third party learns what you ask about"}
          </text>
          <text x="240" y="300" textAnchor="middle">
            The public transaction graph remains public
          </text>
        </>
      )
      result = (
        <p>
          {separate
            ? "Your node validates chain data and answers your wallet’s queries locally."
            : "A server can associate address or descriptor queries with the requesting client."}{" "}
          Local validation reduces this disclosure; it does not by itself
          provide network anonymity.
        </p>
      )
      break
    case "architecture":
      controls = (
        <label>
          <input
            type="checkbox"
            checked={failed}
            onChange={(e) => setFailed(e.target.checked)}
          />{" "}
          Replace the original signer
        </label>
      )
      drawing = (
        <>
          <Computer x={20} y={35} label="Online node" />
          <Computer
            x={345}
            y={35}
            label={failed ? "Replacement" : "Offline signer"}
          />
          <Arrow x={160} y={65} width={160} />
          <text x="240" y="45" textAnchor="middle">
            Proposal →
          </text>
          <path
            d="M320 105H160m9-6l-9 6 9 6"
            fill="none"
            stroke="var(--concept-accent)"
            strokeWidth="2"
          />
          <text x="240" y="135" textAnchor="middle">
            ← Signed result
          </text>
          <path
            d="M400 140v45H240v35"
            fill="none"
            stroke="var(--concept-accent)"
            strokeWidth="2"
          />
          <File x={215} y={230} locked />
          <Key x={365} y={235} />
          <text x="95" y="230" textAnchor="middle">
            Public observation
          </text>
          <text x="95" y="260" textAnchor="middle">
            Prepare / broadcast
          </text>
          <text x="245" y="325" textAnchor="middle">
            Backup copies
          </text>
          <text x="395" y="325" textAnchor="middle">
            Separate secrets
          </text>
        </>
      )
      result = (
        <p>
          {failed
            ? "Restore from the backup and separately recovered secrets, then prove signing without the original."
            : "Keep private keys offline; transfer public wallet information and carefully inspected transaction files."}{" "}
          Node observes and validates; Vault signs. Follow the release-specific
          operating and backup instructions.
        </p>
      )
      break
    case "trust":
      controls = (
        <label>
          <input
            type="checkbox"
            checked={separate}
            onChange={(e) => setSeparate(e.target.checked)}
          />{" "}
          Authenticate the expected signer’s identity
        </label>
      )
      drawing = (
        <>
          <text x="20" y="30">
            Three different evidence paths
          </text>
          {[
            ["Source review", "Intended behavior"],
            ["Signed digest", "Release identity"],
            ["Independent builds", "Matching output"],
          ].map(([a, b], i) => (
            <g key={a}>
              <rect
                x="20"
                y={60 + i * 80}
                width="170"
                height="50"
                rx="8"
                fill="var(--muted)"
              />
              <text x="105" y={90 + i * 80} textAnchor="middle">
                {a}
              </text>
              <Arrow x={205} y={85 + i * 80} width={45} />
              <text x="270" y={90 + i * 80}>
                {i === 1 && !separate ? "Unknown signer" : b}
              </text>
            </g>
          ))}
        </>
      )
      result = (
        <p>
          {separate
            ? "An authenticated signature binds the digest to the expected signing key."
            : "A valid signature from an unknown key does not establish the intended publisher."}{" "}
          Reviewing behavior and reproducing a build answer additional
          questions.
        </p>
      )
      break
    case "blockchain":
      controls = (
        <>
          <Slider
            label="Illustrative blocks validated"
            value={count}
            min={1}
            max={6}
            onChange={setCount}
          />
          <label>
            <input
              type="checkbox"
              checked={separate}
              onChange={(e) => setSeparate(e.target.checked)}
            />{" "}
            Keep only recent block files after validation
          </label>
        </>
      )
      drawing = (
        <>
          <text x="240" y="38" textAnchor="middle">
            History is checked in order
          </text>
          {Array.from({ length: 6 }, (_, i) => (
            <g key={i} opacity={i < count ? 1 : 0.25}>
              <rect
                x={20 + i * 75}
                y="80"
                width="55"
                height="55"
                rx="7"
                fill="var(--muted)"
                stroke="currentColor"
              />
              {i < 5 && <Arrow x={77 + i * 75} y={107} width={15} />}
              <text x={47 + i * 75} y="113" textAnchor="middle">
                {i + 1}
              </text>
              <text x={47 + i * 75} y="163" textAnchor="middle">
                {i < count ? "✓" : "…"}
              </text>
              {i < count && (!separate || i >= count - 2) && (
                <path
                  d={`M${30 + i * 75} 185h35v40h-35z`}
                  fill="none"
                  stroke="var(--concept-accent)"
                  strokeWidth="2"
                />
              )}
            </g>
          ))}
          <text x="240" y="265" textAnchor="middle">
            Files below: retained storage
          </text>
          <text x="240" y="300" textAnchor="middle">
            Deleting old files does not skip their validation
          </text>
        </>
      )
      result = (
        <p aria-live="polite">
          {count} of 6 illustrative blocks validated.{" "}
          {separate
            ? "Only the most recent two are retained in this model."
            : "All validated block files are retained."}{" "}
          Real pruning uses storage limits; wallet backups remain separate from
          public chain data.
        </p>
      )
      break
    case "recovery":
      controls = (
        <label>
          <input
            type="checkbox"
            checked={failed}
            onChange={(e) => setFailed(e.target.checked)}
          />{" "}
          Set the original device aside
        </label>
      )
      drawing = (
        <>
          <g opacity={failed ? 0.15 : 1}>
            <Computer x={20} y={40} label="Original" />
          </g>
          <File x={220} y={50} locked />
          <Key x={360} y={60} />
          <path
            d="M245 125v45h110v30m25-90v90"
            fill="none"
            stroke="var(--concept-accent)"
            strokeWidth="3"
          />
          <Computer x={300} y={205} label="Replacement" />
          <text x="70" y="195">
            Independent records
          </text>
          <text x="70" y="222">
            Restore → inspect
          </text>
          <text x="70" y="249">
            Then prove signing
          </text>
          <text x="240" y="330" textAnchor="middle">
            {failed
              ? "The backup path must work without the original"
              : "A working original can hide a broken recovery path"}
          </text>
        </>
      )
      result = (
        <p>
          Use the lesson’s complete backup and policy records. A displayed
          balance alone does not prove recovered spending authority.
        </p>
      )
      break
    case "transaction":
      controls = (
        <label>
          <input
            type="checkbox"
            checked={failed}
            onChange={(e) => setFailed(e.target.checked)}
          />{" "}
          The recipient shown for approval differs from the intended recipient
        </label>
      )
      drawing = (
        <>
          <text x="240" y="30" textAnchor="middle">
            Follow value and authorization separately
          </text>
          <rect
            x="15"
            y="65"
            width="120"
            height="110"
            rx="10"
            fill="var(--muted)"
          />
          <text x="75" y="100" textAnchor="middle">
            Inputs
          </text>
          <text x="75" y="135" textAnchor="middle">
            100,000 sats
          </text>
          <path
            d="M140 120h45v-25h45m-45 25v65h45"
            fill="none"
            stroke="var(--concept-accent)"
            strokeWidth="3"
          />
          <text x="250" y="95">
            Recipient: 60,000
          </text>
          <text x="250" y="135">
            Change: 39,000
          </text>
          <text x="250" y="175">
            Fee: 1,000
          </text>
          <path d="M20 210h440" stroke="currentColor" opacity=".2" />
          <text x="240" y="250" textAnchor="middle">
            Inspect inputs, recipient, change and fee
          </text>
          <text x="240" y="290" textAnchor="middle">
            {failed
              ? "Stop — do not authorize the proposal"
              : "Only then authorize and broadcast"}
          </text>
        </>
      )
      result = (
        <p>
          Illustrative amounts: inputs minus all outputs equals the fee. A PSBT
          (partially signed Bitcoin transaction) carries a proposal and
          signatures between tools; it is not itself proof of broadcast or
          confirmation.
        </p>
      )
      break
    case "descriptor":
      drawing = (
        <>
          <Key x={45} y={70} />
          <text x="30" y="155">
            Private authority
          </text>
          <path d="M175 30v250" stroke="currentColor" strokeDasharray="5 5" />
          <File x={225} y={65} />
          <Arrow x={295} y={95} width={35} />
          <Computer x={345} y={60} label="Watch-only" />
          <text x="245" y="185" textAnchor="middle">
            Public descriptor
          </text>
          <text x="315" y="225" textAnchor="middle">
            Addresses + spending structure
          </text>
          <text x="315" y="260" textAnchor="middle">
            Visibility without signing secrets
          </text>
          <text x="240" y="315" textAnchor="middle">
            Back up the policy; protect its privacy
          </text>
        </>
      )
      result = (
        <p>
          A descriptor describes how outputs are constructed. Inspect whether it
          contains private material before transferring it; “descriptor” alone
          does not mean public.
        </p>
      )
      break
    case "maintenance":
      controls = (
        <label>
          <input
            type="checkbox"
            checked={failed}
            onChange={(e) => setFailed(e.target.checked)}
          />{" "}
          A review finds an unexpected result
        </label>
      )
      drawing = (
        <>
          <path
            d="M95 70Q240 5 385 70M390 85Q465 170 385 255M365 270Q240 330 95 270M80 250Q10 170 80 85"
            fill="none"
            stroke="var(--concept-accent)"
            strokeWidth="3"
            strokeDasharray="6 5"
          />
          <text x="240" y="60" textAnchor="middle">
            Prepare disposable test
          </text>
          <text x="240" y="135" textAnchor="middle">
            Observe the actual result
          </text>
          <text x="240" y="200" textAnchor="middle">
            {failed ? "Stop and investigate" : "Record evidence + versions"}
          </text>
          <text x="240" y="270" textAnchor="middle">
            Repeat after meaningful changes
          </text>
        </>
      )
      result = (
        <p>
          {failed
            ? "A mismatch needs an explanation before the procedure can support a custody decision."
            : "A recorded exercise has a scope. Repeat the relevant checks when dependencies change."}
        </p>
      )
      break
    case "threats":
      controls = (
        <label className="concept-control">
          Threat to examine
          <select
            value={distance}
            onChange={(e) => setDistance(Number(e.target.value))}
          >
            <option value={0}>Theft of one artifact</option>
            <option value={1}>Collusion between custodians</option>
            <option value={2}>Coercion of an owner</option>
          </select>
        </label>
      )
      drawing = (
        <>
          <rect
            x="20"
            y="70"
            width="135"
            height="145"
            rx="16"
            fill="var(--muted)"
          />
          <File x={60} y={95} locked />
          <rect
            x="185"
            y="70"
            width="120"
            height="145"
            rx="16"
            fill="var(--muted)"
          />
          <Key x={220} y={110} />
          <rect
            x="335"
            y="70"
            width="120"
            height="145"
            rx="16"
            fill="var(--muted)"
          />
          <Key x={370} y={110} />
          <text x="85" y="245" textAnchor="middle">
            File
          </text>
          <text x="245" y="245" textAnchor="middle">
            Secret A
          </text>
          <text x="395" y="245" textAnchor="middle">
            Secret B
          </text>
          <path
            d={
              distance === 0
                ? "M20 40h135"
                : distance === 1
                  ? "M185 40h270"
                  : "M20 40h435"
            }
            stroke="var(--concept-accent)"
            strokeWidth="5"
          />
          <text x="240" y="300" textAnchor="middle">
            {
              [
                "One artifact may leave other requirements missing",
                "Participants may combine what they hold",
                "Consider every route available to the owner",
              ][distance]
            }
          </text>
        </>
      )
      result = (
        <p>
          {
            [
              "Separation limits what one discovery supplies. Copies of the same component do not supply a different secret.",
              "Independent storage does not guarantee independent behavior. Map who can cooperate to assemble recovery.",
              "Remote copies, memory, other people and travel all affect immediate access. No arrangement promises protection from physical harm.",
            ][distance]
          }
        </p>
      )
      break
    default:
      drawing = (
        <>
          <Computer x={20} y={95} label="Prepare" />
          <Arrow x={150} y={130} width={55} />
          <File x={230} y={100} />
          <Arrow x={295} y={130} width={45} />
          <Computer x={350} y={95} label="Verify" />
          <path
            d="M400 210Q240 300 75 210"
            fill="none"
            stroke="var(--concept-accent)"
            strokeWidth="3"
            strokeDasharray="6 5"
          />
          <text x="240" y="285" textAnchor="middle">
            Observe the result before continuing
          </text>
        </>
      )
  }
  return (
    <figure
      className="concept-visual"
      aria-labelledby={titleId}
      aria-describedby={captionId}
    >
      <h2 id={titleId}>Explore the idea</h2>
      {controls && <div className="concept-controls">{controls}</div>}
      <svg
        viewBox="0 0 480 340"
        role="img"
        aria-label={`${visual.title}. ${visual.caption}`}
      >
        <title>{visual.title}</title>
        {drawing}
      </svg>
      <details className="concept-diagram-labels">
        <summary>Read diagram labels</summary>
        <ul>
          {diagramLabels(drawing).map((label, index) => (
            <li key={index}>{label}</li>
          ))}
        </ul>
      </details>
      {result}
      {visual.labels?.length ? (
        <ol className="concept-path">
          {visual.labels.map((label, i) => (
            <li key={`${i}-${label}`}>
              <span aria-hidden="true">{i + 1}</span>
              {label}
            </li>
          ))}
        </ol>
      ) : null}
      <figcaption id={captionId}>{visual.caption}</figcaption>
    </figure>
  )
}
