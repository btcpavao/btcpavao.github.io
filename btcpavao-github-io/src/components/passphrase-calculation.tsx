import { Banknote, Clock3, Cpu, KeyRound } from "lucide-react"
import {
  type attackModel,
  fullNumber,
  namedNumber,
  SECONDS_PER_YEAR,
} from "@/curriculum-math"

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
        {fullNumber(value)}
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
      : seconds >= 3600
        ? [seconds / 3600, "hours"]
        : [seconds, "seconds"]
  return <ReadableAmount value={Number(value)} unit={String(unit)} />
}

export function AttackEstimate({
  words,
  model,
}: {
  words: number
  model: ReturnType<typeof attackModel>
}) {
  return (
    <div>
      <h3>
        <KeyRound aria-hidden="true" />
        {words} random words
      </h3>
      <p className="passphrase-entropy">
        {model.bits.toFixed(2)} bits ·{" "}
        {words === 6 ? "Recommended default" : "Extra margin"}
      </p>
      <dl>
        <dt>
          <Clock3 aria-hidden="true" />
          Average elapsed time
        </dt>
        <dd>
          <SearchDuration seconds={model.averageSeconds} />
        </dd>
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
      </dl>
    </div>
  )
}

export function GuessingCalculation({
  gpuCount,
  rate,
  rental,
}: {
  gpuCount: number
  rate: number
  rental: number
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
              Possible phrases = 7,772<sup>word count</sup>. Average seconds =
              possible phrases ÷ 2 ÷ total guesses per second. Divide seconds by
              3,600 for hours.
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
