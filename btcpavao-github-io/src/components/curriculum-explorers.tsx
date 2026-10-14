import { useState } from "react"
import { Cpu, Zap } from "lucide-react"
import {
  AttackEstimate,
  CostEquivalents,
  GuessingCalculation,
  ReadableAmount,
  SearchDuration,
} from "@/components/passphrase-calculation"
import { PassphraseComparison } from "@/components/passphrase-comparison"
import {
  parallelAttackModel,
  KEEPASS_WORD_COUNT,
  wordEntropy,
  WALLET_BENCHMARK_RATE,
  GPU_RENTAL_PER_HOUR,
  fullNumber,
} from "@/curriculum-math"

function magnitude(value: number) {
  if (value === 0) return "0"
  if (Number.isInteger(value) && value < 1e6) return value.toLocaleString("en")
  if (value >= 1e6 || value < 0.01) return value.toExponential(1)
  return new Intl.NumberFormat("en", { maximumSignificantDigits: 2 }).format(
    value
  )
}
export function EntropyTable() {
  return (
    <>
      <PassphraseComparison />
      <section className="course-explorer" aria-label="Random word entropy">
        <h2>The method determines the strength</h2>
        <p>
          Independent, equally likely choices from{" "}
          {KEEPASS_WORD_COUNT.toLocaleString("en")} distinct words in the
          verified KeePassXC bundled large list. Fixed separators add no extra
          entropy.
        </p>
        <div
          className="course-table-scroll"
          tabIndex={0}
          role="region"
          aria-label="Entropy comparison table"
        >
          <table>
            <thead>
              <tr>
                <th>Words</th>
                <th>Entropy</th>
                <th>Possible sequences</th>
              </tr>
            </thead>
            <tbody>
              {[1, 5, 6, 8].map((words) => {
                const result = wordEntropy(words)
                return (
                  <tr key={words}>
                    <th scope="row">{words}</th>
                    <td>{result.bits.toFixed(2)} bits</td>
                    <td>≈ {magnitude(result.possibilities)}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
        <p className="course-local-note">
          Scientific notation: 1.0e+20 means 1 followed by 20 zeros. These
          values are calculated from the list size, not estimated from the
          appearance of a phrase.
        </p>
      </section>
    </>
  )
}
export function BruteForceExplorer() {
  const [gpus, setGpus] = useState("1")
  const [rate, setRate] = useState(String(WALLET_BENCHMARK_RATE))
  const [power, setPower] = useState("0.55")
  const [energy, setEnergy] = useState("0.15")
  const [compute, setCompute] = useState(String(GPU_RENTAL_PER_HOUR))
  const gpuCount = Number(gpus)
  const gpuValid =
    gpus.trim() !== "" &&
    Number.isSafeInteger(gpuCount) &&
    gpuCount >= 1 &&
    gpuCount <= 1_000_000
  const inputsValid =
    [rate, power, energy, compute].every(
      (v) =>
        v.trim() !== "" &&
        Number.isFinite(Number(v)) &&
        Number(v) >= 0 &&
        Number(v) <= 1e12
    ) && Number(rate) >= 1
  const valid = gpuValid && inputsValid
  const estimate = (words: number) =>
    parallelAttackModel(
      words,
      gpuCount,
      Number(rate),
      Number(power),
      Number(energy),
      Number(compute)
    )
  const models = valid ? [6, 8].map(estimate) : []
  return (
    <section
      className="course-explorer parallel-explorer"
      aria-label="Illustrative brute-force model"
    >
      <h2>
        <Cpu aria-hidden="true" />
        What changes with more GPUs?
      </h2>
      <p>
        Compare six and eight independent KeePassXC words with the same attack
        assumptions. Six words are the course default; choose eight if two extra
        words are comfortable to memorize. Enter public numbers only, never your
        passphrase.
      </p>
      <div className="parallel-explorer__gpu">
        <label htmlFor="attack-gpus">Number of GPUs</label>
        <input
          id="attack-gpus"
          type="number"
          min="1"
          max="1000000"
          step="1"
          value={gpus}
          aria-invalid={!gpuValid}
          aria-describedby="attack-gpu-help"
          onChange={(e) => setGpus(e.target.value)}
        />
        <div
          className="parallel-explorer__presets"
          role="group"
          aria-label="GPU count presets"
        >
          {[1, 10, 100, 1000].map((n) => (
            <button
              key={n}
              type="button"
              aria-pressed={gpuCount === n && gpuValid}
              onClick={() => setGpus(String(n))}
            >
              {n.toLocaleString("en-US")} {n === 1 ? "GPU" : "GPUs"}
            </button>
          ))}
        </div>
        <p id="attack-gpu-help">
          Choose a whole number from 1 to 1,000,000. Each GPU does the same
          amount of work per second; they search different candidates.
        </p>
      </div>
      <div className="course-explorer__inputs">
        <label htmlFor="attack-rate">
          Guesses per second, per GPU
          <input
            id="attack-rate"
            type="number"
            min="1"
            max="1000000000000"
            step="any"
            value={rate}
            onChange={(e) => setRate(e.target.value)}
          />
        </label>
        <label htmlFor="attack-rental">
          Rental, USD per GPU-hour
          <input
            id="attack-rental"
            type="number"
            min="0"
            max="1000000000000"
            step="any"
            value={compute}
            onChange={(e) => setCompute(e.target.value)}
          />
        </label>
      </div>
      <details className="parallel-explorer__energy">
        <summary>
          <Zap aria-hidden="true" />
          Electricity-only alternative
        </summary>
        <p>
          For owned hardware, estimate electricity separately. Include the GPU’s
          share of host-system power. This excludes buying the equipment,
          cooling and other overheads. Do not add it to rent that already
          includes electricity.
        </p>
        <div className="course-explorer__inputs">
          <label htmlFor="attack-power">
            Power per GPU, including host share, kW
            <input
              id="attack-power"
              type="number"
              min="0"
              max="1000000000000"
              step="any"
              value={power}
              onChange={(e) => setPower(e.target.value)}
            />
          </label>
          <label htmlFor="attack-energy">
            Electricity price, USD per kWh
            <input
              id="attack-energy"
              type="number"
              min="0"
              max="1000000000000"
              step="any"
              value={energy}
              onChange={(e) => setEnergy(e.target.value)}
            />
          </label>
        </div>
        <p>
          Starting assumptions: 0.55 kW per GPU including its host share, and
          USD 0.15 per kWh. These are illustrative inputs, not benchmark
          measurements.
        </p>
      </details>
      {!valid ? (
        <p role="alert">
          {!gpuValid
            ? "Enter a whole GPU count from 1 to 1,000,000."
            : "Fill every assumption: use at least 1 guess per second and non-negative power and prices, each no higher than 1,000,000,000,000."}
        </p>
      ) : (
        <>
          <p className="parallel-explorer__summary" role="status">
            {gpuCount.toLocaleString("en-US")} {gpuCount === 1 ? "GPU" : "GPUs"}{" "}
            ·{" "}
            {models[0].totalGuessesPerSecond.toLocaleString("en-US", {
              maximumSignificantDigits: 15,
            })}{" "}
            guesses per second in total.{" "}
            {gpuCount === 1
              ? "The single-GPU baseline."
              : `${gpuCount.toLocaleString("en-US")} times faster than one GPU; the same total rental cost.`}
          </p>
          <div
            className="passphrase-cost-grid"
            role="group"
            aria-label="Six and eight word attack estimates"
          >
            {models.map((model, i) => (
              <AttackEstimate
                key={i}
                words={i === 0 ? 6 : 8}
                model={model}
                compareCosts
              />
            ))}
          </div>
          <p className="course-local-note">
            For scale, imagine a house costing USD 1,000,000 (one million
            dollars) or an infrastructure project costing USD 1,000,000,000 (one
            billion dollars). Each equivalent is the average cost divided by
            that price, calculated before rounding. These are hypothetical
            comparisons, not market valuations or purchases anyone could
            actually make at this scale. They update with the cost assumptions;
            changing only the GPU count leaves them unchanged under ideal
            scaling.
          </p>
          <p>
            <strong>More GPUs shorten the wait.</strong> Under ideal linear
            scaling, doubling the GPU count halves elapsed time and doubles
            hourly rent. Total GPU-hours, rental cost and electricity use stay
            the same. Eight words require 60,403,984 times the work of six, for
            the same attacker.
          </p>
          <GuessingCalculation
            gpuCount={gpuCount}
            rate={Number(rate)}
            rental={Number(compute)}
          />
          <details className="course-lesson-details">
            <summary>Full search, GPU-hours and electricity</summary>
            <div className="passphrase-cost-grid">
              {models.map((model, i) => (
                <div key={i}>
                  <h3>{i === 0 ? 6 : 8} random words</h3>
                  <dl>
                    <dt>Full-search time</dt>
                    <dd>
                      <SearchDuration seconds={model.fullSeconds} />
                    </dd>
                    <dt>Full-search rental cost</dt>
                    <dd>
                      <ReadableAmount
                        value={model.averageComputeCost * 2}
                        unit="dollars"
                        prefix="USD "
                      />
                    </dd>
                    <dt>Average total GPU-hours</dt>
                    <dd>≈ {fullNumber(model.averageGpuHours)} GPU-hours</dd>
                    <dt>Average total electricity</dt>
                    <dd>≈ {fullNumber(model.averageKwh)} kWh</dd>
                    <dt>Average electricity-only cost</dt>
                    <dd>
                      <ReadableAmount
                        value={model.averageElectricityCost}
                        unit="dollars"
                        prefix="USD "
                      />
                    </dd>
                  </dl>
                  <CostEquivalents
                    cost={model.averageElectricityCost}
                    electricity
                  />
                </div>
              ))}
            </div>
            <p>
              Average electricity = average elapsed hours × GPU count × kW per
              GPU. Multiply by USD per kWh for the electricity-only cost.
              Full-search electricity and costs are twice the averages.
            </p>
          </details>
          <details className="course-lesson-details">
            <summary>Compare shorter phrases: one and five words</summary>
            <div
              className="course-table-scroll"
              tabIndex={0}
              role="region"
              aria-label="Attack model word-count comparison"
            >
              <table>
                <thead>
                  <tr>
                    <th>Words</th>
                    <th>Average time</th>
                    <th>Average rental</th>
                  </tr>
                </thead>
                <tbody>
                  {[1, 5].map((words) => {
                    const model = estimate(words)
                    return (
                      <tr key={words}>
                        <th scope="row">{words}</th>
                        <td>
                          <SearchDuration seconds={model.averageSeconds} />
                        </td>
                        <td>
                          <ReadableAmount
                            value={model.averageComputeCost}
                            unit="dollars"
                            prefix="USD "
                          />
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
            <p>
              The same GPU count and per-GPU assumptions apply. These shorter
              choices are comparisons, not recommendations.
            </p>
          </details>
        </>
      )}
      <details className="course-lesson-details">
        <summary>Sources and limits of this model</summary>
        <p>
          The verified KeePassXC bundled list has 7,772 distinct words. Each
          selection is independent and equally likely; repeated words are
          allowed. The attacker knows the wordlist, word count and separator,
          but no words. Fixed separators add no entropy.
        </p>
        <p>
          The starting rate is 32,880 guesses/second for one RTX 4090 from a{" "}
          <a href="https://hashcat.net/forum/thread-13338-post-63594.html">
            published Hashcat 7.0.0 wallet.dat benchmark
          </a>{" "}
          (mode 11300, reporting 200,459 iterations). The{" "}
          <a href="https://www.runpod.io/gpu-models/rtx-4090">
            Runpod headline RTX 4090 price
          </a>{" "}
          was USD 0.89 per GPU-hour when checked October 14, 2026; prices and
          availability vary.
        </p>
        <p>
          <strong>This is not a measurement of your wallet.</strong> Real speed
          depends on wallet derivation settings, candidate length, hardware and
          software; benchmark kernels may have length limits. Ideal scaling
          assumes no duplicate guesses, coordination overhead or rental
          minimums. A large GPU count does not imply that fleet is available.
        </p>
        <p>
          Huge durations and costs are mathematical extrapolations at fixed
          rates, not predictions or feasible budgets. Future hardware, disclosed
          words and malware change the situation. Rental excludes storage, taxes
          and other overheads. This models a Core wallet passphrase, not a 7z
          archive or KeePassXC database.
        </p>
      </details>
    </section>
  )
}
const media = [
  {
    name: "USB flash drive",
    benefit: "Small, inexpensive and easy to keep offline.",
    failure:
      "Can fail without warning; a connector can break or the drive can disappear. Unpowered flash is not an indefinite archive.",
    durability:
      "Test reads and real restoration; replace or refresh according to observed condition and manufacturer guidance. No fixed lifespan is promised.",
    tamper:
      "Easy to substitute or infect while being handled. Keep backup media separate from routine PSBT transfers.",
    location: "Copies in the same room share theft, fire and flood exposure.",
    dependency:
      "A working USB reader, compatible filesystem and another good copy if bits become unreadable.",
  },
  {
    name: "External SSD",
    benefit:
      "Convenient for several current encrypted files and periodic verified copies.",
    failure:
      "Controller failure, cable damage and charge loss during long unpowered storage can make data inaccessible.",
    durability:
      "Use a maintained rotation and test recovery; capacity and brand do not establish long-term retention.",
    tamper:
      "Physical substitution and a compromised computer writing to it remain possible.",
    location:
      "A drive beside the signer shares its local disaster risks; use a separate location for independence.",
    dependency:
      "A compatible enclosure, connector, filesystem and healthy controller.",
  },
  {
    name: "Write-once optical disc",
    benefit: "A finalized write-once copy is harder to overwrite accidentally.",
    failure:
      "Scratches, coating degradation, poor recording quality or an unavailable reader can prevent recovery.",
    durability:
      "Read back after writing and periodically test with a working drive. Do not rely on an unverified marketing lifetime.",
    tamper:
      "Write-once does not prevent substitution, theft or deliberate destruction.",
    location:
      "Keep protected from heat, moisture and light; separate copies from shared fire and flood hazards.",
    dependency:
      "A compatible optical drive, supported disc format and a current backup when wallet state changes.",
  },
  {
    name: "Encrypted cloud copy",
    benefit: "A remote copy can survive loss of the home and local equipment.",
    failure:
      "Account loss, provider deletion, synchronization mistakes or service shutdown can remove access.",
    durability:
      "Periodically download and restore the actual stored version; do not count a successful upload as a recovery test.",
    tamper:
      "The provider or a compromised account may replace, delete or retain older versions. Core metadata may remain readable unless separately encrypted.",
    location:
      "Geographic independence helps with local fire or flood, but provider and account failures are separate risks.",
    dependency:
      "Provider, internet access, account recovery and any outer-encryption tool. Keep the wallet passphrase outside this storage account.",
  },
  {
    name: "Trusted remote copy",
    benefit:
      "A person at another location can hold an encrypted file without needing its wallet passphrase.",
    failure:
      "That person may lose the medium, discard it, become unavailable or misunderstand the arrangement.",
    durability:
      "Agree on checks and replacement; demonstrate access to the exact file at review time.",
    tamper:
      "The holder can copy, replace or destroy the file. Encryption protects keys, not availability or all metadata.",
    location:
      "Choose a location that does not share the same disaster exposure as your other copies.",
    dependency:
      "The person, medium, contact route and clear authority to release the copy during recovery.",
  },
  {
    name: "Second computer",
    benefit:
      "A familiar reader and filesystem make periodic restoration convenient.",
    failure:
      "Malware, disk failure and automatic cleanup can affect it; a live duplicate signing wallet creates additional exposure.",
    durability:
      "Keep software maintained and test the saved encrypted backup, not just a shortcut to another machine.",
    tamper:
      "An online second machine can expose metadata and hold a ciphertext target. Do not restore real offline private keys onto it casually.",
    location:
      "A second laptop in the same building does not provide off-site disaster protection.",
    dependency:
      "That operating system, storage and maintenance; an independent removable or remote copy still matters.",
  },
  {
    name: "Off-site storage",
    benefit:
      "Separates the backup from a local theft, fire or flood. This is a location choice, not a medium.",
    failure:
      "Access restrictions, forgotten arrangements or a disaster at the remote location can prevent recovery.",
    durability:
      "The selected USB, SSD or optical medium still needs testing and renewal.",
    tamper:
      "Consider who can enter, inspect, replace or withhold the stored object.",
    location:
      "Choose meaningful geographic separation and consider correlated hazards rather than counting addresses.",
    dependency:
      "The location’s access rules, the medium and recoverable instructions; keep the passphrase’s access plan separate.",
  },
]
export function BackupMediaExplorer() {
  const [selected, setSelected] = useState(0)
  const item = media[selected]
  return (
    <section className="course-explorer" aria-label="Backup media comparison">
      <h2>Compare one storage choice at a time</h2>
      <label className="course-explorer__choice">
        Medium or location
        <select
          value={selected}
          onChange={(e) => setSelected(Number(e.target.value))}
        >
          {media.map((m, i) => (
            <option key={m.name} value={i}>
              {m.name}
            </option>
          ))}
        </select>
      </label>
      <dl className="course-media-detail">
        {[
          ["Benefit", item.benefit],
          ["Failure and bit loss", item.failure],
          ["Longevity and checks", item.durability],
          ["Tampering", item.tamper],
          ["Fire, flood and location", item.location],
          ["Recovery dependency", item.dependency],
        ].map(([label, value]) => (
          <div key={label}>
            <dt>{label}</dt>
            <dd>{value}</dd>
          </div>
        ))}
      </dl>
      <p className="course-local-note">
        Choose only what your threat model and maintenance capacity justify. Two
        independently recoverable copies are more useful than many untested ones
        with the same point of failure.
      </p>
    </section>
  )
}
