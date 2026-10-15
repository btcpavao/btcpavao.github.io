import { Banknote, Building2, Clock3, Cpu, House, KeyRound } from "lucide-react"
import {
  type attackModel,
  fullNumber,
  namedNumber,
  KEEPASS_WORD_COUNT,
  SECONDS_PER_YEAR,
} from "@/curriculum-math"

function GroupedNumber({ value }: { value: number }) {
  const groups = fullNumber(value).split(",")
  return groups.map((group, index) => (
    <span key={index}>
      {index > 0 && <wbr />}
      {group}
      {index < groups.length - 1 ? "," : ""}
    </span>
  ))
}

export function ReadableAmount({
  value,
  unit,
  prefix = "",
}: {
  value: number
  unit: string
  prefix?: string
}) {
  return (
    <>
      <strong className="passphrase-number">
        ≈ {prefix}
        <GroupedNumber value={value} />
        {prefix ? "" : ` ${unit}`}
      </strong>
      <span className="passphrase-number-words">
        {namedNumber(value)} {unit}
      </span>
    </>
  )
}

export function SearchDuration({ seconds }: { seconds: number }) {
  const [value, unit] =
    seconds >= SECONDS_PER_YEAR
      ? [seconds / SECONDS_PER_YEAR, "years"]
      : seconds >= 86400
        ? [seconds / 86400, "days"]
        : seconds >= 3600
          ? [seconds / 3600, "hours"]
          : seconds >= 60
            ? [seconds / 60, "minutes"]
            : seconds >= 1
              ? [seconds, "seconds"]
              : seconds >= 0.001
                ? [seconds * 1000, "milliseconds"]
                : seconds >= 0.000001
                  ? [seconds * 1e6, "microseconds"]
                  : [seconds * 1e9, "nanoseconds"]
  return <ReadableAmount value={Number(value)} unit={String(unit)} />
}

export function AttackEstimate({
  words,
  model,
  compareCosts = false,
  showHeading = true,
}: {
  words: number
  model: ReturnType<typeof attackModel>
  compareCosts?: boolean
  showHeading?: boolean
}) {
  return (
    <div>
      {showHeading && (
        <>
          <h3>
            <KeyRound aria-hidden="true" />
            {words} random {words === 1 ? "word" : "words"}
          </h3>
          <p className="passphrase-entropy">
            {model.bits.toFixed(2)} bits ·{" "}
            {words < 6
              ? "Below the course recommendation"
              : words === 6
                ? "Recommended default"
                : "Extra margin"}
          </p>
        </>
      )}
      <dl>
        <div>
          <dt>
            <Clock3 aria-hidden="true" />
            Average elapsed time
          </dt>
          <dd>
            <SearchDuration seconds={model.averageSeconds} />
          </dd>
        </div>
        <div>
          <dt>
            <Banknote aria-hidden="true" />
            Average total GPU rental
          </dt>
          <dd>
            <ReadableAmount
              value={model.averageComputeCost}
              unit="dollars"
              prefix="USD "
            />
          </dd>
        </div>
      </dl>
      {compareCosts && <CostEquivalents cost={model.averageComputeCost} />}
    </div>
  )
}

export function CostEquivalents({
  cost,
  electricity = false,
  compact = false,
}: {
  cost: number
  electricity?: boolean
  compact?: boolean
}) {
  return (
    <div
      className="passphrase-cost-equivalents"
      role="group"
      aria-label={
        electricity ? "Electricity cost equivalents" : "Rental cost equivalents"
      }
    >
      <p>
        {compact
          ? "For scale, that is roughly"
          : electricity
            ? "That electricity-only cost equals"
            : "That rental cost equals"}
      </p>
      <dl>
        <div>
          <dt>
            <House aria-hidden="true" />
            Houses at USD 1,000,000 each
          </dt>
          <dd>
            {compact ? (
              <strong className="passphrase-number">
                {cost > 0 && cost / 1_000_000 < 0.001 ? (
                  "< 0.001"
                ) : (
                  <>
                    ≈ <GroupedNumber value={cost / 1_000_000} />
                  </>
                )}{" "}
                houses
              </strong>
            ) : (
              <ReadableAmount value={cost / 1_000_000} unit="houses" />
            )}
          </dd>
        </div>
        <div>
          <dt>
            <Building2 aria-hidden="true" />
            Projects at USD 1,000,000,000 each
          </dt>
          <dd>
            {compact ? (
              <strong className="passphrase-number">
                {cost > 0 && cost / 1_000_000_000 < 0.001 ? (
                  "< 0.001"
                ) : (
                  <>
                    ≈ <GroupedNumber value={cost / 1_000_000_000} />
                  </>
                )}{" "}
                projects
              </strong>
            ) : (
              <ReadableAmount value={cost / 1_000_000_000} unit="projects" />
            )}
          </dd>
        </div>
      </dl>
    </div>
  )
}

export function GuessingCalculation({
  gpuCount,
  rate,
  rental,
  listSize = KEEPASS_WORD_COUNT,
  words,
}: {
  gpuCount: number
  rate: number
  rental: number
  listSize?: number
  words?: number
}) {
  return (
    <div className="passphrase-calculation">
      <h3>Follow the calculation</h3>
      <ol>
        <li>
          <Cpu aria-hidden="true" />
          <div>
            <strong>Combine the GPUs</strong>
            <p>
              {gpuCount.toLocaleString("en-US")} ×{" "}
              {rate.toLocaleString("en-US", { maximumSignificantDigits: 15 })}{" "}
              guesses/second ={" "}
              <strong>
                {(gpuCount * rate).toLocaleString("en-US", {
                  maximumSignificantDigits: 15,
                })}{" "}
                guesses/second
              </strong>
              .
            </p>
          </div>
        </li>
        <li>
          <Clock3 aria-hidden="true" />
          <div>
            <strong>Divide the average work by that speed</strong>
            <p>
              Possible phrases = {listSize.toLocaleString("en-US")}
              <sup>{words ?? "word count"}</sup>. Average seconds = possible
              phrases ÷ 2 ÷ total guesses per second. Divide seconds by 3,600
              for hours.
            </p>
          </div>
        </li>
        <li>
          <Banknote aria-hidden="true" />
          <div>
            <strong>Pay for every GPU, for every hour</strong>
            <p>
              Total rental = elapsed hours × {gpuCount.toLocaleString("en-US")}{" "}
              {gpuCount === 1 ? "GPU" : "GPUs"} × USD {fullNumber(rental)} per
              GPU-hour ({namedNumber(rental)} dollars). Total hourly rent:{" "}
              <strong>≈ USD {fullNumber(gpuCount * rental)}</strong> (
              {namedNumber(gpuCount * rental)} dollars).
            </p>
          </div>
        </li>
      </ol>
      <p className="course-local-note">
        Average means about half the search space, with no repeated guesses.
        Full search takes twice the average time and cost. A year means 365.25
        days. Results are rounded to three significant digits; calculations use
        unrounded values.
      </p>
    </div>
  )
}
