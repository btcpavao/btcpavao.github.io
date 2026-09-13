import { useState } from "react"
import {
  attackModel,
  EFF_WORD_COUNT,
  SECONDS_PER_YEAR,
  wordEntropy,
} from "@/curriculum-math"

function magnitude(value: number) {
  if (value === 0) return "0"
  if (value >= 1e6 || value < 0.01) return value.toExponential(1)
  return new Intl.NumberFormat("en", { maximumSignificantDigits: 2 }).format(
    value
  )
}
function duration(seconds: number) {
  return seconds < SECONDS_PER_YEAR
    ? `${magnitude(seconds / 3600)} hours`
    : `${magnitude(seconds / SECONDS_PER_YEAR)} years`
}
export function EntropyTable() {
  return (
    <section className="course-explorer" aria-label="Random word entropy">
      <h2>The method determines the strength</h2>
      <p>
        Independent, equally likely choices from{" "}
        {EFF_WORD_COUNT.toLocaleString("en")} distinct words. Fixed separators
        add no extra entropy.
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
        Scientific notation: 1.0e+20 means 1 followed by 20 zeros. These values
        are calculated from the list size, not estimated from the appearance of
        a phrase.
      </p>
    </section>
  )
}
export function BruteForceExplorer() {
  const [words, setWords] = useState(8)
  const [rate, setRate] = useState("1000000000")
  const [power, setPower] = useState("1000")
  const [energy, setEnergy] = useState("0.10")
  const [compute, setCompute] = useState("1000")
  const inputs = [rate, power, energy, compute]
  const valid =
    inputs.every(
      (v) =>
        v.trim() !== "" &&
        Number.isFinite(Number(v)) &&
        Number(v) >= 0 &&
        Number(v) <= 1e24
    ) && Number(rate) >= 1
  const model = valid
    ? attackModel(
        words,
        Number(rate),
        Number(power),
        Number(energy),
        Number(compute)
      )
    : null
  return (
    <section
      className="course-explorer"
      aria-label="Illustrative brute-force model"
    >
      <h2>Change the assumptions</h2>
      <p>
        This is an order-of-magnitude illustration,{" "}
        <strong>not a Core cracking benchmark</strong>. Enter public numbers
        only. No password is requested or analyzed.
      </p>
      <div className="course-explorer__inputs">
        <label>
          Independent EFF words
          <select
            value={words}
            onChange={(e) => setWords(Number(e.target.value))}
          >
            {[5, 6, 8, 12, 24].map((n) => (
              <option key={n} value={n}>
                {n} words
              </option>
            ))}
          </select>
        </label>
        <label>
          Guesses per second, entire system
          <input
            type="number"
            min="1"
            max="1e24"
            value={rate}
            onChange={(e) => setRate(e.target.value)}
          />
        </label>
        <label>
          Power of that system, kW
          <input
            type="number"
            min="0"
            max="1e24"
            value={power}
            onChange={(e) => setPower(e.target.value)}
          />
        </label>
        <label>
          Electricity price, USD per kWh
          <input
            type="number"
            min="0"
            max="1e24"
            step="0.01"
            value={energy}
            onChange={(e) => setEnergy(e.target.value)}
          />
        </label>
        <label>
          Alternative compute rental, USD/hour
          <input
            type="number"
            min="0"
            max="1e24"
            value={compute}
            onChange={(e) => setCompute(e.target.value)}
          />
        </label>
      </div>
      {!model ? (
        <p role="alert">
          Use a guess rate of at least 1 and non-negative finite power and
          costs, up to 1e24. Fill every field.
        </p>
      ) : (
        <div aria-live="polite" aria-atomic="true">
          <dl className="course-explorer__results">
            <div>
              <dt>Search space</dt>
              <dd>≈ {magnitude(model.possibilities)} sequences</dd>
            </div>
            <div>
              <dt>Entropy from this method</dt>
              <dd>{model.bits.toFixed(2)} bits</dd>
            </div>
            <div>
              <dt>Average search, half the space</dt>
              <dd>≈ {duration(model.averageSeconds)}</dd>
            </div>
            <div>
              <dt>Theoretical full search</dt>
              <dd>≈ {duration(model.fullSeconds)}</dd>
            </div>
            <div>
              <dt>Average electricity use</dt>
              <dd>≈ {magnitude(model.averageKwh)} kWh</dd>
            </div>
            <div>
              <dt>Average electricity-only cost</dt>
              <dd>≈ USD {magnitude(model.averageElectricityCost)}</dd>
            </div>
            <div>
              <dt>Alternative average compute rental</dt>
              <dd>≈ USD {magnitude(model.averageComputeCost)}</dd>
            </div>
          </dl>
          <p>
            Full-search energy and costs are twice the averages shown.
            Electricity-only cost excludes equipment. Rental is a separate
            alternative; do not add the two if rental already includes
            electricity.
          </p>
          <details className="course-lesson-details">
            <summary>Compare five, six and eight words</summary>
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
                    <th>Average search</th>
                    <th>Average electricity cost</th>
                  </tr>
                </thead>
                <tbody>
                  {[5, 6, 8].map((n) => {
                    const r = attackModel(
                      n,
                      Number(rate),
                      Number(power),
                      Number(energy),
                      Number(compute)
                    )
                    return (
                      <tr key={n}>
                        <th scope="row">{n}</th>
                        <td>≈ {duration(r.averageSeconds)}</td>
                        <td>USD {magnitude(r.averageElectricityCost)}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </details>
        </div>
      )}
      <p className="course-local-note">
        The assumed rate, power and rental price must describe the same
        aggregate attacker system. Huge durations are mathematical
        extrapolations under fixed assumptions, not predictions about future
        computers, energy markets or the lifetime of the universe.
      </p>
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
