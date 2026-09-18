import { useState } from "react"
import {
  addMonths,
  atRate,
  breakEvenRates,
  compare,
  factorsForGrowth,
} from "./decision-math.mjs"
import type { DecisionInputs, DecisionResult } from "./decision-math.mjs"
import { modelGrowth } from "./model/helpers.mjs"
import { useModel } from "./use-model"
import { Field, ToolBox } from "./tool-common"
import { btc, euro, percent } from "./format"
const presets: Record<string, DecisionInputs> = {
  Car: {
    purchase: 34490,
    rent: 745,
    ownership: 150,
    residual: 17245,
    upfront: 0,
    capital: 50000,
    months: 60,
    escalation: 0,
  },
  Home: {
    purchase: 300000,
    rent: 1000,
    ownership: 300,
    residual: 300000,
    upfront: 0,
    capital: 400000,
    months: 120,
    escalation: 0,
  },
  Equipment: {
    purchase: 20000,
    rent: 450,
    ownership: 80,
    residual: 8000,
    upfront: 0,
    capital: 30000,
    months: 36,
    escalation: 0,
  },
  Custom: {
    purchase: 10000,
    rent: 250,
    ownership: 30,
    residual: 3000,
    upfront: 0,
    capital: 20000,
    months: 36,
    escalation: 0,
  },
}
const fields: [keyof DecisionInputs, string][] = [
  ["purchase", "All-in purchase price (€)"],
  ["rent", "Monthly rent (€)"],
  ["ownership", "Monthly ownership costs (€)"],
  ["residual", "Net resale proceeds at the end (€)"],
  ["months", "Duration (months)"],
  ["capital", "Starting BTC balance, valued in euros"],
  ["upfront", "Non-refundable upfront rental fee (€)"],
  ["escalation", "Annual rent escalation (%)"],
]
const strings = (v: DecisionInputs) =>
  Object.fromEntries(Object.entries(v).map(([k, n]) => [k, String(n)]))
export default function Decision() {
  const { data } = useModel()
  const [preset, setPreset] = useState("Car"),
    [raw, setRaw] = useState(strings(presets.Car)),
    [rate, setRate] = useState("10"),
    [spot, setSpot] = useState("70000"),
    [path, setPath] = useState("smooth"),
    [mode, setMode] = useState("custom"),
    [date, setDate] = useState("2026-09-10"),
    [marketUsd, setUsd] = useState("78158")
  let x: DecisionResult | undefined,
    v: DecisionInputs | undefined,
    roots: ReturnType<typeof breakEvenRates> | undefined,
    smooth: DecisionResult | undefined,
    stress: DecisionResult | undefined,
    error = "",
    effectiveRate = +rate / 100,
    modelTarget: number | undefined
  try {
    if (
      Object.values(raw).some((n) => n === "") ||
      spot === "" ||
      !Number.isFinite(+spot) ||
      +spot <= 0
    )
      throw Error(
        "Please enter valid amounts and a positive starting BTC/EUR price."
      )
    v = Object.fromEntries(
      Object.entries(raw).map(([k, n]) => [k, Number(n)])
    ) as unknown as DecisionInputs
    if (mode === "model") {
      if (!data)
        throw Error(
          "The model is unavailable. Please use a custom growth assumption or retry after loading."
        )
      const g = modelGrowth(data, date, v.months / 12, +marketUsd)
      effectiveRate = g.marketRate
      modelTarget = g.target
    } else if (
      rate === "" ||
      !Number.isFinite(+rate) ||
      +rate < -90 ||
      +rate > 500
    )
      throw Error("Please enter annual BTC growth between −90% and 500%.")
    const total = (1 + effectiveRate) ** (v.months / 12)
    smooth = compare(v, factorsForGrowth(total, v.months))
    stress = compare(v, factorsForGrowth(total, v.months, true))
    x = path === "stress" ? stress : smooth
    roots = breakEvenRates(v)
  } catch (e) {
    error = (e as Error).message
  }
  const outcome = (r: DecisionResult) =>
    Math.abs(r.advantage) < 0.01
      ? "Equal final cost"
      : `${r.advantage > 0 ? "Rent" : "Own"}: ${euro(Math.abs(r.advantage))} lower opportunity-adjusted cost`
  return (
    <ToolBox
      title="Own or rent? Make the assumptions visible."
      caption="Compare equivalent use over the same period. The presets are editable teaching examples, not quotes or purchase recommendations."
    >
      <label className="bam-field">
        <span>Example</span>
        <select
          value={preset}
          onChange={(e) => {
            setPreset(e.target.value)
            setRaw(strings(presets[e.target.value]))
          }}
        >
          {Object.keys(presets).map((p) => (
            <option key={p}>{p}</option>
          ))}
        </select>
      </label>
      <div className="bam-fields">
        {fields.map(([key, label]) => (
          <Field
            key={key}
            label={label}
            value={raw[key]}
            min={key === "escalation" ? -90 : key === "months" ? 1 : 0}
            max={key === "months" ? 600 : key === "escalation" ? 100 : 1e10}
            step={key === "months" ? "1" : "any"}
            onChange={(n) => setRaw({ ...raw, [key]: n })}
          />
        ))}
      </div>
      <h4>The Bitcoin scenario</h4>
      <div className="bam-fields">
        <Field
          label="Starting BTC price (€ per BTC)"
          value={spot}
          min={0.01}
          onChange={setSpot}
        />
        <label className="bam-field">
          <span>Growth basis</span>
          <select value={mode} onChange={(e) => setMode(e.target.value)}>
            <option value="custom">My illustrative annual growth rate</option>
            <option value="model">Market price to future PL0</option>
          </select>
        </label>
        {mode === "custom" ? (
          <Field
            label="Assumed annual BTC growth (%)"
            value={rate}
            min={-90}
            max={500}
            onChange={setRate}
          />
        ) : (
          <>
            <label className="bam-field">
              <span>Starting date</span>
              <input
                type="date"
                value={date}
                min={data?.modelDates[1]}
                max={data?.modelDates.at(-1)}
                onChange={(e) => setDate(e.target.value)}
              />
            </label>
            <Field
              label="BTC market price on that date (USD)"
              value={marketUsd}
              min={1}
              onChange={setUsd}
            />
          </>
        )}
        <label className="bam-field">
          <span>Price path</span>
          <select value={path} onChange={(e) => setPath(e.target.value)}>
            <option value="smooth">Smooth compound path</option>
            <option value="stress">Early 50% waypoint, same endpoint</option>
          </select>
        </label>
      </div>
      {mode === "model" && (
        <p className="bam-note">
          The initial example is frozen at 10 September 2026. Changing the date
          does not fetch that date’s market price: please enter the matching USD
          quote. The USD model’s percentage change is applied to BTC/EUR under a
          constant EUR/USD assumption. Beyond the published calendar, the
          original model extends time at a target ten-minute block interval;
          this is an additional assumption, not known future timing.{" "}
          {modelTarget && v
            ? `PL0 on ${addMonths(date, v.months)}: $${modelTarget.toFixed(0)}. Required scenario rate: ${percent(effectiveRate)} a year.`
            : ""}
        </p>
      )}
      {error && (
        <p role="alert" className="bam-feedback">
          {error}
        </p>
      )}
      {x && v && roots && smooth && stress && (
        <>
          <div className="bam-result" role="status">
            <p className="bam-eyebrow">
              Under these assumptions · {v.months} months
            </p>
            {x.buyEnd !== null && x.rentEnd !== null ? (
              <h4>
                {Math.abs(x.advantage) < 0.01
                  ? "The paths leave equal final wealth."
                  : `${x.advantage > 0 ? "Renting" : "Owning"} leaves ${euro(Math.abs(x.advantage))} more final wealth.`}
              </h4>
            ) : (
              <>
                <h4>The starting balance cannot fund both paths.</h4>
                <p>
                  {outcome(x)}. This is a theoretical cost comparison, not
                  available final wealth.
                </p>
              </>
            )}
            <p>
              The result follows your assumptions. It does not choose for you.
            </p>
          </div>
          <div className="bam-table-wrap">
            <table>
              <caption>
                Same starting Bitcoin balance: {btc(v.capital / +spot)}.
                End-of-month payments; no income contributions or borrowing.
              </caption>
              <thead>
                <tr>
                  <th>Measure</th>
                  <th>Own</th>
                  <th>Rent</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>Nominal net cash cost</th>
                  <td>{euro(x.nominalBuy)}</td>
                  <td>{euro(x.nominalRent)}</td>
                </tr>
                <tr>
                  <th>Minimum initial BTC to fund the full path</th>
                  <td>{btc(x.requiredBuy / +spot)}</td>
                  <td>{btc(x.requiredRent / +spot)}</td>
                </tr>
                <tr>
                  <th>Same minimum, at initial EUR price</th>
                  <td>{euro(x.requiredBuy)}</td>
                  <td>{euro(x.requiredRent)}</td>
                </tr>
                <tr>
                  <th>Final wealth (includes resale for own)</th>
                  <td>
                    {x.buyEnd === null
                      ? `Unfunded from month ${x.buyExhaustion}`
                      : euro(x.buyEnd)}
                  </td>
                  <td>
                    {x.rentEnd === null
                      ? `Unfunded from month ${x.rentExhaustion}`
                      : euro(x.rentEnd)}
                  </td>
                </tr>
                <tr>
                  <th>BTC opportunity cost, net of final resale</th>
                  <td>{btc(x.buyCost / (+spot * x.g))}</td>
                  <td>{btc(x.rentCost / (+spot * x.g))}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="bam-note">
            Minimum starting BTC must cover every payment before the final
            resale. The resale proceeds cannot pay earlier bills. A negative net
            opportunity cost means modeled resale exceeds the BTC spent; it is
            not a guaranteed profit.
          </p>
          <div className="bam-statline">
            <span>
              Break-even annual growth, smooth path
              <strong>
                {roots.indeterminate
                  ? "Indeterminate"
                  : roots.roots.length
                    ? roots.roots.map(percent).join(" / ")
                    : "No crossing found"}
              </strong>
            </span>
            <span>
              Break-even net resale value
              <strong>
                {x.residualBreak < 0
                  ? "No non-negative threshold"
                  : euro(x.residualBreak)}
              </strong>
            </span>
          </div>
          <p className="bam-note">
            Growth crossings searched from −90% to 500% a year; this bounded
            scan does not prove there are no other crossings. The resale
            threshold uses the selected path.{" "}
            {x.residualBreak < 0
              ? "Ownership has lower modeled cost even at zero resale under this scenario."
              : ""}
          </p>
          <h4>Same endpoint. Different number of sats spent.</h4>
          <PricePaths months={v.months} total={x.g} />
          <div className="bam-table-wrap">
            <table>
              <caption>
                Both paths begin at {euro(+spot)}/BTC and finish at{" "}
                {euro(+spot * x.g)}/BTC.
              </caption>
              <thead>
                <tr>
                  <th>Path</th>
                  <th>Minimum BTC for rent</th>
                  <th>Cost comparison</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Smooth", smooth],
                  ["Early waypoint", stress],
                ].map(([label, r]) => {
                  const row = r as DecisionResult
                  return (
                    <tr key={label as string}>
                      <th>{label as string}</th>
                      <td>{btc(row.requiredRent / +spot)}</td>
                      <td>{outcome(row)}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
          <p>
            For the same euro payment, a lower BTC price consumes more sats.{" "}
            {v.months === 1
              ? "At one month, these paths are identical: there is no intermediate waypoint."
              : `The waypoint path uses ${btc(Math.abs(stress.requiredRent - smooth.requiredRent) / +spot)} ${stress.requiredRent > smooth.requiredRent ? "more" : "less"} BTC for rent than the smooth path.`}{" "}
            The endpoint alone cannot describe recurring withdrawals.
          </p>
          <h4>Change the growth assumption</h4>
          <div className="bam-table-wrap">
            <table>
              <caption>
                Sensitivity with smooth paths, all other assumptions unchanged.
              </caption>
              <thead>
                <tr>
                  <th>Annual BTC growth</th>
                  <th>Cost comparison</th>
                  <th>Both paths funded?</th>
                </tr>
              </thead>
              <tbody>
                {Array.from(new Set([-0.1, 0, 0.1, 0.2, effectiveRate]))
                  .sort((a, b) => a - b)
                  .map((r) => {
                    const y = atRate(v!, r)
                    return (
                      <tr key={r}>
                        <th>{percent(r)}</th>
                        <td>{outcome(y)}</td>
                        <td>
                          {y.buyEnd !== null && y.rentEnd !== null
                            ? "Yes"
                            : "No"}
                        </td>
                      </tr>
                    )
                  })}
              </tbody>
            </table>
          </div>
          <h4>What if resale is wrong?</h4>
          <p>
            A 20% lower resale estimate changes the relative final-wealth
            difference by {euro(v.residual * 0.2)} against ownership. A 20%
            higher estimate changes it by the same amount in favour of
            ownership. It does not solve an earlier funding shortfall.
          </p>
          <details>
            <summary>Assumptions and exclusions</summary>
            <ul>
              <li>
                All cash costs are gross euros. Include transaction charges and
                purchase taxes in the all-in purchase price; use net resale
                proceeds after costs and taxes.
              </li>
              <li>
                Rent is paid at month end. Annual escalation is compounded
                monthly from the first payment. Ownership costs are constant
                monthly averages.
              </li>
              <li>
                No debt, income top-ups, interest on deposits or interim
                investment income. No automatic tax calculation.
              </li>
              <li>
                Match the utility of both options. Include costs that differ,
                including insurance, repairs and maintenance. Common costs can
                be omitted from a relative comparison, but need funding in the
                actual household budget.
              </li>
              <li>
                Refundable deposits are not modeled; the upfront rental fee is
                non-refundable. Home presets omit jurisdiction-specific legal
                details, moving costs and rent controls.
              </li>
              <li>
                BTC prices may fall or fail to follow any path. The early
                drawdown example halves the initial price over the first{" "}
                {Math.min(12, Math.floor(v.months / 2))} months, then moves to
                the same endpoint. If the endpoint is below half the initial
                price, it continues falling; at one month the paths are
                identical.
              </li>
            </ul>
          </details>
        </>
      )}
    </ToolBox>
  )
}
function PricePaths({ months, total }: { months: number; total: number }) {
  const a = factorsForGrowth(total, months),
    b = factorsForGrowth(total, months, true),
    max = Math.max(...a, ...b),
    X = (i: number) => 60 + (i / months) * 630,
    Y = (v: number) => 230 - (v / max) * 190
  return (
    <svg
      className="bam-chart"
      viewBox="0 0 760 280"
      role="img"
      aria-label="Two illustrative BTC price paths with identical start and endpoint: smooth compound growth and an early waypoint then the same endpoint."
    >
      <title>Price paths, indexed to 1 at the start</title>
      {[a, b].map((s, j) => (
        <path
          key={j}
          d={s.map((v, i) => `${i ? "L" : "M"}${X(i)},${Y(v)}`).join(" ")}
          fill="none"
          stroke={j ? "#b45e26" : "#365d6b"}
          strokeWidth="3"
          strokeDasharray={j ? "6 4" : undefined}
        />
      ))}
      <text x="60" y="260">
        Start · 1×
      </text>
      <text x="690" y="260" textAnchor="end">
        Month {months} · {total.toFixed(2)}×
      </text>
      <text x="60" y="20">
        Solid: smooth · Dashed: early waypoint
      </text>
    </svg>
  )
}
