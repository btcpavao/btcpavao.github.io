import { useState } from "react"
import { useModel, useSnapshot } from "./use-model"
import {
  PARAMETERS,
  POWER_LAW_LEVELS,
  createDateMapper,
  powerLawPrice,
  priceToRoot,
  rootToPrice,
  wavePrice,
} from "./model/power-law.mjs"
import { hAtDate, hTime, issuance, modelGrowth } from "./model/helpers.mjs"
import { Field, ToolBox } from "./tool-common"
import { percent, usd } from "./format"
const precisePrice = (p: number) =>
  p > 0 && p < 1 ? "$" + p.toPrecision(4) : usd(p)
export default function Trend() {
  const { data, error } = useModel(),
    { snapshot, status, busy, refresh } = useSnapshot()
  const [start, setStart] = useState(0),
    [span, setSpan] = useState(6),
    [levels, setLevels] = useState<number[]>([0]),
    [history, setHistory] = useState(true),
    [waves, setWaves] = useState(false),
    [selected, setSelected] = useState("4.6"),
    [inputError, setInputError] = useState(""),
    [drag, setDrag] = useState<number | null>(null),
    [quote, setQuote] = useState(""),
    [tablePage, setTablePage] = useState(0)
  if (error) return <p role="alert">{error}</p>
  if (!data)
    return (
      <p className="bam-note">
        Loading the documented historical series and original model…
      </p>
    )
  const dateForH = createDateMapper(data),
    h = Number(selected),
    valid = selected !== "" && Number.isFinite(h) && h >= 0 && h <= 11.9975,
    date = valid ? dateForH(h) : "",
    height = valid ? Math.round(h * PARAMETERS.blocksPerH) : 0,
    supply = issuance(height)
  const observations = data.observations.map(([oh, p, r]) => [
    oh,
    p || rootToPrice(r),
    r,
  ])
  const livePoint = snapshot?.height
    ? [snapshot.height / 210000, snapshot.usd, priceToRoot(snapshot.usd)]
    : null
  const end = start + span,
    visible = observations.filter(([oh]) => oh >= start && oh <= end)
  const series = levels.map((level) => ({
    name: `PL${level}`,
    level,
    points: Array.from({ length: 301 }, (_, i) => {
      const x = start + (span * i) / 300
      return [x, priceToRoot(powerLawPrice(x, level))]
    }),
  }))
  if (waves)
    for (const band of [-2, 0, 2])
      series.push({
        name: `W${band}`,
        level: 10 + band,
        points: Array.from({ length: 301 }, (_, i) => {
          const x = start + (span * i) / 300
          return [x, priceToRoot(wavePrice(x, band))]
        }),
      })
  const ymax =
    Math.max(
      1,
      ...(history && livePoint && livePoint[0] >= start && livePoint[0] <= end
        ? [livePoint[2]]
        : []),
      ...series.flatMap((s) => s.points.map((p) => p[1])),
      ...(history ? visible.map((p) => p[2]) : [])
    ) * 1.06
  const X = (n: number) => 65 + ((n - start) / span) * 680,
    Y = (n: number) => 315 - (n / ymax) * 280
  const line = (points: number[][]) =>
    points
      .map(
        ([x, y], i) => `${i ? "L" : "M"}${X(x).toFixed(1)},${Y(y).toFixed(1)}`
      )
      .join(" ")
  const move = (n: number) => setStart(Math.max(0, Math.min(12 - span, n)))
  function changeDate(d: string) {
    try {
      setSelected(String(hAtDate(data!, d)))
      setInputError("")
    } catch (e) {
      setInputError((e as Error).message)
    }
  }
  const nearest =
    valid && h >= observations[0][0] && h <= observations.at(-1)![0]
      ? observations.reduce(
          (best, row) =>
            Math.abs(row[0] - h) < Math.abs(best[0] - h) ? row : best,
          observations[0]
        )
      : null
  const comparisonPrice = quote !== "" ? Number(quote) : nearest?.[1],
    comparisonValid =
      comparisonPrice !== undefined &&
      Number.isFinite(comparisonPrice) &&
      comparisonPrice > 0
  const baseDate = snapshot?.asOf.slice(0, 10),
    snapshotH = snapshot?.height
      ? snapshot.height / PARAMETERS.blocksPerH
      : undefined
  return (
    <ToolBox
      title="Bitcoin through time"
      caption="The original Bitcoin Wave model, drawn natively here. Explore its assumptions without turning a curve into a promise."
    >
      <div className="bam-source">
        <p role="status">
          {status}
          {snapshot && (
            <>
              {" "}
              <strong>{usd(snapshot.usd)}</strong> · Price timestamp:{" "}
              {new Date(snapshot.asOf)
                .toISOString()
                .replace("T", " ")
                .slice(0, 19)}{" "}
              UTC.
            </>
          )}
        </p>
        <button onClick={refresh} disabled={busy}>
          {busy ? "Updating…" : "Update market quote"}
        </button>
      </div>
      <div className="bam-buttons bam-legend">
        <button aria-pressed={history} onClick={() => setHistory(!history)}>
          Historical price
        </button>
        {POWER_LAW_LEVELS.map((l) => (
          <button
            key={l}
            aria-pressed={levels.includes(l)}
            onClick={() =>
              setLevels(
                levels.includes(l)
                  ? levels.filter((x) => x !== l)
                  : [...levels, l]
              )
            }
          >
            PL{l}
          </button>
        ))}
        <button aria-pressed={waves} onClick={() => setWaves(!waves)}>
          Wave bands
        </button>
      </div>
      <svg
        className="bam-chart"
        viewBox="0 0 800 380"
        role="img"
        aria-label={`Root-scale Bitcoin chart from H${start.toFixed(1)} to H${end.toFixed(1)}. Data and selected values are available below.`}
        onPointerDown={(e) => {
          setDrag(e.clientX)
          e.currentTarget.setPointerCapture(e.pointerId)
        }}
        onPointerUp={() => setDrag(null)}
        onPointerCancel={() => setDrag(null)}
        onPointerMove={(e) => {
          if (drag !== null) {
            move(
              start -
                ((e.clientX - drag) /
                  e.currentTarget.getBoundingClientRect().width) *
                  span
            )
            setDrag(e.clientX)
          }
        }}
      >
        <title>Historical Bitcoin prices and deterministic model curves</title>
        {[0, 0.25, 0.5, 0.75, 1].map((f) => (
          <g key={f}>
            <line
              x1="65"
              x2="745"
              y1={Y(ymax * f)}
              y2={Y(ymax * f)}
              stroke="currentColor"
              opacity=".12"
            />
            <text x="60" y={Y(ymax * f) + 5} textAnchor="end">
              {new Intl.NumberFormat("en", {
                notation: "compact",
                style: "currency",
                currency: "USD",
                maximumFractionDigits: 0,
              }).format(rootToPrice(ymax * f))}
            </text>
          </g>
        ))}
        {Array.from({ length: 13 }, (_, i) => i)
          .filter((x) => x >= start && x <= end)
          .map((n) => (
            <g key={n}>
              <line
                x1={X(n)}
                x2={X(n)}
                y1="35"
                y2="315"
                stroke="currentColor"
                opacity=".18"
                strokeDasharray="3 5"
              />
              <text x={X(n)} y="338" textAnchor="middle">
                H{n}
              </text>
              <text x={X(n)} y="358" textAnchor="middle">
                {dateForH(n).slice(0, 4)}
              </text>
            </g>
          ))}
        {series.map((s) => (
          <path
            key={s.name}
            d={line(s.points)}
            fill="none"
            stroke={
              s.level === 0 ? "#b45e26" : s.level >= 8 ? "#728477" : "#ad9879"
            }
            strokeWidth={s.level === 0 ? 3 : 1.3}
            strokeDasharray={s.level >= 8 ? "5 4" : undefined}
          />
        ))}
        {history && (
          <path
            d={line(visible.map(([oh, , r]) => [oh, r]))}
            fill="none"
            stroke="#365d6b"
            strokeWidth="1.6"
          />
        )}
        {history &&
          livePoint &&
          livePoint[0] >= start &&
          livePoint[0] <= end && (
            <circle
              cx={X(livePoint[0])}
              cy={Y(livePoint[2])}
              r="5"
              fill="#365d6b"
            >
              <title>
                Dated market snapshot; isolated from historical prices
              </title>
            </circle>
          )}
      </svg>
      <div className="bam-buttons">
        <button onClick={() => move(start - span / 4)}>← Pan earlier</button>
        <button onClick={() => move(start + span / 4)}>Pan later →</button>
        <button
          onClick={() => {
            setSpan(Math.max(0.5, span / 1.5))
          }}
        >
          Zoom in
        </button>
        <button
          onClick={() => {
            const n = Math.min(12, span * 1.5)
            setSpan(n)
            setStart(Math.min(start, 12 - n))
          }}
        >
          Zoom out
        </button>
        <button
          onClick={() => {
            setStart(0)
            setSpan(6)
          }}
        >
          Reset view
        </button>
      </div>
      <label className="bam-slider">
        <span>
          Pan the timeline: H{start.toFixed(1)}–H{end.toFixed(1)}
        </span>
        <input
          type="range"
          min="0"
          max={12 - span}
          step=".05"
          value={start}
          onChange={(e) => move(+e.target.value)}
        />
      </label>
      <p className="bam-note">
        Drag horizontally to pan, or use the buttons and slider. The vertical
        coordinate is price raised to 1/5.4. Equal vertical distances are not
        equal dollar changes. This compresses the scale so early and later
        cycles can be compared. H is block height ÷ 210,000; dotted lines mark
        halving epochs. Model bands are not statistical confidence intervals.
      </p>
      <details>
        <summary>Historical prices: accessible data table</summary>
        <div className="bam-table-wrap">
          <table>
            <caption>
              Historical observations within H{start.toFixed(1)}–H
              {end.toFixed(1)}; calendar dates are mapped from source H-values.
              Showing{" "}
              {Math.min(tablePage * 12, Math.max(0, visible.length - 12)) + 1}–
              {Math.min(
                Math.min(tablePage * 12, Math.max(0, visible.length - 12)) + 12,
                visible.length
              )}{" "}
              of {visible.length} points.
            </caption>
            <thead>
              <tr>
                <th>Mapped date</th>
                <th>H</th>
                <th>Market price</th>
                <th>PL0</th>
              </tr>
            </thead>
            <tbody>
              {visible
                .slice(
                  Math.min(tablePage * 12, Math.max(0, visible.length - 12)),
                  Math.min(tablePage * 12, Math.max(0, visible.length - 12)) +
                    12
                )
                .map(([oh, p]) => (
                  <tr key={oh}>
                    <th>{dateForH(oh)}</th>
                    <td>{oh.toFixed(5)}</td>
                    <td>{precisePrice(p)}</td>
                    <td>{precisePrice(powerLawPrice(oh, 0))}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        <div className="bam-buttons">
          <button
            disabled={tablePage === 0}
            onClick={() => setTablePage(Math.max(0, tablePage - 1))}
          >
            Previous observations
          </button>
          <button
            disabled={(tablePage + 1) * 12 >= visible.length}
            onClick={() => setTablePage(tablePage + 1)}
          >
            Next observations
          </button>
          <button
            onClick={() =>
              setTablePage(Math.max(0, Math.floor((visible.length - 1) / 12)))
            }
          >
            Latest in view
          </button>
        </div>
        <p className="bam-note">
          The isolated market dot, when visible, is the separately timestamped
          quote above. No missing daily prices are interpolated.
        </p>
      </details>
      <h4>Read the Bitcoin clock</h4>
      <div className="bam-fields">
        <label className="bam-field">
          <span>Calendar date (mapped estimate)</span>
          <input
            type="date"
            value={date}
            min={data.modelDates[0]}
            max={data.modelDates.at(-1)}
            onChange={(e) => changeDate(e.target.value)}
          />
        </label>
        <Field
          label="H-value"
          value={selected}
          min={0}
          max={11.9975}
          onChange={(v) => {
            setSelected(v)
            setInputError("")
          }}
        />
        <Field
          label="Block height"
          value={valid ? height : ""}
          min={0}
          max={Math.floor(11.9975 * 210000)}
          step="1"
          onChange={(v) => {
            setSelected(v === "" ? "" : String(Number(v) / 210000))
            setInputError("")
          }}
        />
      </div>
      {inputError && <p role="alert">{inputError}</p>}
      {valid ? (
        <>
          <div className="bam-table-wrap">
            <table>
              <caption>
                Selected coordinate: {date}. Dates and heights are related by
                the source model’s calendar map, not guaranteed future block
                times.
              </caption>
              <tbody>
                <tr>
                  <th>Days since genesis</th>
                  <td>
                    {Math.round(
                      (Date.parse(date) - Date.parse("2009-01-03")) / 86400000
                    ).toLocaleString("en")}
                  </td>
                </tr>
                <tr>
                  <th>H / halving epoch</th>
                  <td>
                    {h.toFixed(5)} / {Math.floor(h)}
                  </td>
                </tr>
                <tr>
                  <th>H-time within this epoch</th>
                  <td>{hTime(h)}</td>
                </tr>
                <tr>
                  <th>PL0 model price</th>
                  <td>{usd(powerLawPrice(h, 0))}</td>
                </tr>
                <tr>
                  <th>Scheduled issued supply</th>
                  <td>
                    {supply.supply.toLocaleString("en", {
                      maximumFractionDigits: 8,
                    })}{" "}
                    BTC
                  </td>
                </tr>
                <tr>
                  <th>Block subsidy at this height</th>
                  <td>{supply.subsidy} BTC</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="bam-note">
            H-time maps one halving epoch onto a 24-hour clock; it is not the
            current time of day. Supply follows scheduled maximum issuance
            through the selected block, including genesis. It is not a
            measurement of spendable or circulating coins.
          </p>
        </>
      ) : (
        <p role="alert">Please enter an H-value between 0 and 11.9975.</p>
      )}
      <h4>A dated price against its model coordinate</h4>
      <Field
        label="Market price at the selected date (USD, optional)"
        value={quote}
        min={0.000001}
        onChange={setQuote}
      />
      {valid && comparisonValid && h > 0 ? (
        <p className="bam-feedback" role="status">
          {quote !== ""
            ? "Your entered scenario"
            : `Nearest historical observation, mapped to ${dateForH(nearest![0])}`}
          : {usd(comparisonPrice!)}. Selected-date PL0:{" "}
          {usd(powerLawPrice(h, 0))}. The price is{" "}
          {percent(Math.abs(comparisonPrice! / powerLawPrice(h, 0) - 1))}{" "}
          {comparisonPrice! >= powerLawPrice(h, 0) ? "above" : "below"} PL0.
          This is model context, not a trading signal.
        </p>
      ) : (
        <p className="bam-note">
          Please enter a positive price for the selected date when the
          historical series does not cover it. A current snapshot is not
          substituted for a historical quote.
        </p>
      )}
      <h4>Two different annualized rates</h4>
      <p>
        The market-to-PL0 rate starts at the dated market price. The PL0 growth
        rate starts on the model itself. Neither is a forecast of market return.
      </p>
      {snapshot && baseDate ? (
        <div className="bam-table-wrap">
          <table>
            <caption>
              Starting date: {baseDate}; market reference: {usd(snapshot.usd)}.
              A constant annual rate connects the endpoints mathematically.
            </caption>
            <thead>
              <tr>
                <th>Years</th>
                <th>Future PL0</th>
                <th>Market → future PL0</th>
                <th>PL0 → future PL0</th>
              </tr>
            </thead>
            <tbody>
              {[1, 5, 10, 30].map((years) => {
                try {
                  const r = modelGrowth(
                    data,
                    baseDate,
                    years,
                    snapshot.usd,
                    snapshotH
                  )
                  return (
                    <tr key={years}>
                      <th>
                        {years}
                        {r.extrapolated ? "*" : ""}
                      </th>
                      <td>{usd(r.target)}</td>
                      <td>{percent(r.marketRate)}</td>
                      <td>{percent(r.pathRate)}</td>
                    </tr>
                  )
                } catch {
                  return (
                    <tr key={years}>
                      <th>{years}</th>
                      <td colSpan={3}>Outside the published model range.</td>
                    </tr>
                  )
                }
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <p>A valid dated price is needed for market-to-model rates.</p>
      )}
      <p className="bam-note">
        * Beyond {data.modelDates.at(-1)}, the calendar is extrapolated using
        the original model’s target ten-minute block interval. The power-law
        formula continues unchanged; neither future block timing nor price is
        guaranteed. The historical chart is not extended with invented data.
      </p>
      <details>
        <summary>Source, model and limitations</summary>
        <p>
          Model: {data.version}. Historical dataset captured{" "}
          {data.provenance.capturedAt.slice(0, 10)} from{" "}
          <a href={data.provenance.sourceUrl}>Bitcoin Wave</a>. Original
          formulas and calendar mapping migrated from{" "}
          <a href="https://bitcoin-savjetovanje.com/dugorocni-trend/">
            Bitcoin Savjetovanje
          </a>
          ; reviewed for this integration on 18 September 2026.
        </p>
        <p>
          Price history ends near the snapshot capture date. A later quote is a
          separate point, not a reconstruction of missing daily prices. Early
          source prices rounded to zero are recovered from the source’s root
          coordinate. PL0 = 10<sup>1.47</sup> × H<sup>5.38</sup>. Fit to past
          data does not establish causation or guarantee survival of this
          relationship. The public price endpoint receives no personal financial
          inputs.
        </p>
        <p>
          Annualized rate = (end value ÷ start value)<sup>1 / years</sup> − 1.
          Doubling over five years requires about 14.87% a year along a smooth
          path; actual prices need not follow that path.
        </p>
      </details>
    </ToolBox>
  )
}
