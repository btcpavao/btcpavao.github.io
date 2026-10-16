import { articleLinkProps } from "@/article-links"
import { useState, useSyncExternalStore } from "react"
import { Cpu, Link, RotateCcw, Zap } from "lucide-react"
import {
  AttackEstimate,
  CostEquivalents,
  GuessingCalculation,
  ReadableAmount,
  SearchDuration,
} from "@/components/passphrase-calculation"
import {
  parallelAttackModel,
  KEEPASS_WORD_COUNT,
  EFF_WORD_COUNT,
  wordEntropy,
  fullNumber,
} from "@/curriculum-math"

import {
  getPassphraseSnapshot,
  getServerPassphraseSnapshot,
  subscribePassphrasePreferences,
  updatePassphrasePreference,
  resetPassphrasePreferences,
  createPassphraseLink,
  isValidPassphrasePreferences,
  type PassphrasePreferences,
} from "@/passphrase-preferences"

export function PassphraseExplorer() {
  const { settings, storageAvailable } = useSyncExternalStore(
    subscribePassphrasePreferences,
    getPassphraseSnapshot,
    getServerPassphraseSnapshot
  )
  const { words, listSize, gpus, rate, power, energy, compute } = settings
  const [resetNotice, setResetNotice] = useState("")
  const [sharedLink, setSharedLink] = useState<{
    settings: PassphrasePreferences
    url: string
    copied: boolean
  } | null>(null)
  const currentLink = sharedLink?.settings === settings ? sharedLink : null
  const update: typeof updatePassphrasePreference = (key, value) => {
    setResetNotice("")
    updatePassphrasePreference(key, value)
  }
  const reset = () => {
    resetPassphrasePreferences()
    setResetNotice("Calculator reset to its starting values.")
  }
  const gpuCount = Number(gpus)
  const gpuValid =
    gpus.trim() !== "" &&
    Number.isSafeInteger(gpuCount) &&
    gpuCount >= 1 &&
    gpuCount <= 1_000_000
  const valid = isValidPassphrasePreferences(settings)
  const copyLink = async () => {
    if (!valid) return
    setResetNotice("")
    const url = createPassphraseLink(window.location.href, settings)
    try {
      await navigator.clipboard.writeText(url)
      setSharedLink({ settings, url, copied: true })
    } catch {
      setSharedLink({ settings, url, copied: false })
    }
  }
  const estimate = (words: number) =>
    parallelAttackModel(
      words,
      gpuCount,
      Number(rate),
      Number(power),
      Number(energy),
      Number(compute),
      listSize
    )
  const selected = valid ? estimate(words) : null
  const entropy = wordEntropy(words, listSize)
  const models = valid ? [6, 8].map(estimate) : []
  return (
    <section
      id="passphrase-calculator"
      className="course-explorer parallel-explorer"
      aria-label="Illustrative brute-force model"
    >
      <h2>
        <Cpu aria-hidden="true" />
        Turn word count into time and cost
      </h2>
      <p>
        Move the slider to get a feel for how hard a random passphrase is to
        guess.
      </p>
      <div className="word-count-control">
        <div className="word-count-control__heading">
          <label htmlFor="attack-words">Word count</label>
          <output htmlFor="attack-words" id="attack-word-output">
            {words} {words === 1 ? "word" : "words"} · {entropy.bits.toFixed(2)}{" "}
            bits
          </output>
        </div>
        <input
          id="attack-words"
          type="range"
          min="1"
          max="12"
          step="1"
          value={words}
          aria-valuetext={`${words} ${words === 1 ? "word" : "words"}, ${entropy.bits.toFixed(2)} bits of entropy`}
          aria-describedby="attack-word-guidance"
          onChange={(e) => update("words", Number(e.target.value))}
        />
        <div className="word-count-control__ends" aria-hidden="true">
          <span>1 word</span>
          <span>12 words</span>
        </div>
        <p id="attack-word-guidance" className="word-count-control__guidance">
          {listSize === KEEPASS_WORD_COUNT ? "KeePassXC" : "EFF large"} list ·{" "}
          {words < 6
            ? "Below the course recommendation"
            : words === 6
              ? "Course default"
              : "Extra margin"}
        </p>
        <div
          className="parallel-explorer__presets"
          role="group"
          aria-label="Recommended word counts"
        >
          <button
            type="button"
            aria-pressed={words === 6}
            onClick={() => update("words", 6)}
          >
            6 words · default
          </button>
          <button
            type="button"
            aria-pressed={words === 8}
            onClick={() => update("words", 8)}
          >
            8 words · extra
          </button>
        </div>
      </div>
      {selected ? (
        <div
          className="word-count-result"
          role="group"
          aria-label="Selected passphrase attack estimate"
        >
          <div className="passphrase-cost-grid word-count-result__totals">
            <AttackEstimate
              words={words}
              model={selected}
              showHeading={false}
            />
          </div>
          <div className="passphrase-cost-grid word-count-equivalents">
            <CostEquivalents cost={selected.averageComputeCost} compact />
          </div>
          <p className="word-count-result__context">
            Average estimates with {gpuCount.toLocaleString("en-US")}{" "}
            {gpuCount === 1 ? "GPU" : "GPUs"}, each at{" "}
            {Number(rate).toLocaleString("en-US")} guesses/second and USD{" "}
            {fullNumber(Number(compute))}/hour.
          </p>
          <p className="course-local-note">
            Illustrative Core wallet attack, not a guarantee. Only independently
            generated random words have this entropy.
          </p>
        </div>
      ) : (
        <p role="alert">
          {!gpuValid
            ? "Enter a whole GPU count from 1 to 1,000,000."
            : "Fill every assumption: use at least 1 guess per second and non-negative power and prices, each no higher than 1,000,000,000,000."}
        </p>
      )}
      <div className="word-count-memory">
        <p>
          {storageAvailable
            ? "Settings remembered in this browser across the guide and curriculum."
            : "Browser storage is unavailable. Settings will not survive leaving this page."}
        </p>
        <div className="word-count-actions">
          <button type="button" onClick={copyLink} disabled={!valid}>
            <Link aria-hidden="true" />
            Copy example link
          </button>
          <button type="button" onClick={reset}>
            <RotateCcw aria-hidden="true" />
            Reset calculator
          </button>
        </div>
      </div>
      <p className="course-local-note word-count-share-status" role="status">
        {currentLink
          ? currentLink.copied
            ? "Link copied. It opens this word count and all GPU settings."
            : "Automatic copying is unavailable. Copy the selected link below."
          : resetNotice}
      </p>
      {currentLink && !currentLink.copied && (
        <div className="word-count-share-fallback">
          <label htmlFor="attack-share-link">Example link</label>
          <textarea
            id="attack-share-link"
            readOnly
            rows={3}
            value={currentLink.url}
            ref={(field) => { field?.focus(); field?.select() }}
            onFocus={(event) => event.currentTarget.select()}
          />
        </div>
      )}
      <details className="course-lesson-details word-count-settings">
        <summary>Change GPU settings or see how this is calculated</summary>
        <div className="word-count-list">
          <label htmlFor="attack-wordlist">Wordlist</label>
          <select
            id="attack-wordlist"
            value={listSize}
            onChange={(e) => update("listSize", Number(e.target.value))}
          >
            <option value={KEEPASS_WORD_COUNT}>
              KeePassXC 2.7.10 · 7,772 words
            </option>
            <option value={EFF_WORD_COUNT}>
              EFF original large list · 7,776 words
            </option>
          </select>
          <p className="course-local-note">
            Entropy = {words} × log₂({listSize.toLocaleString("en-US")}) ={" "}
            {entropy.bits.toFixed(2)} bits. Each extra random word multiplies
            the search space by {listSize.toLocaleString("en-US")}. The default
            uses the bundled list verified for this course; the original EFF
            list is also available.
          </p>
        </div>
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
            onChange={(e) => update("gpus", e.target.value)}
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
                onClick={() => update("gpus", String(n))}
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
              onChange={(e) => update("rate", e.target.value)}
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
              onChange={(e) => update("compute", e.target.value)}
            />
          </label>
        </div>
        <details className="parallel-explorer__energy">
          <summary>
            <Zap aria-hidden="true" />
            Electricity-only alternative
          </summary>
          <p>
            For owned hardware, estimate electricity separately. Include the
            GPU’s share of host-system power. This excludes buying the
            equipment, cooling and other overheads. Do not add it to rent that
            already includes electricity.
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
                onChange={(e) => update("power", e.target.value)}
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
                onChange={(e) => update("energy", e.target.value)}
              />
            </label>
          </div>
          <p>
            Starting assumptions: 0.55 kW per GPU including its host share, and
            USD 0.15 per kWh. These are illustrative inputs, not benchmark
            measurements.
          </p>
        </details>
        {selected && (
          <>
            <p className="parallel-explorer__summary" role="status">
              {words} {words === 1 ? "word" : "words"} ·{" "}
              {selected.bits.toFixed(2)} bits ·{" "}
              {gpuCount.toLocaleString("en-US")}{" "}
              {gpuCount === 1 ? "GPU" : "GPUs"} ·{" "}
              {selected.totalGuessesPerSecond.toLocaleString("en-US", {
                maximumSignificantDigits: 15,
              })}{" "}
              guesses/second in total.
            </p>
            <p className="course-local-note">
              Average search tries about half the possible phrases; a particular
              phrase can be found earlier or later. For scale, a house costs USD
              1,000,000 (one million dollars) and a project costs USD
              1,000,000,000 (one billion dollars) in these hypothetical
              comparisons. Each equivalent is the average rental cost divided by
              that price, before rounding. They update with word count,
              wordlist, guess rate and rent; changing only GPU count leaves them
              unchanged under ideal scaling.
            </p>
            <p>
              <strong>More GPUs shorten the wait.</strong> Doubling the GPU
              count halves elapsed time and doubles hourly rent. Total
              GPU-hours, rental cost and electricity use stay the same. Eight
              words require {(listSize ** 2).toLocaleString("en-US")} times the
              work of six with this list, adding{" "}
              {(2 * Math.log2(listSize)).toFixed(2)} bits.
            </p>
            <p>
              Use the slider to understand the trade-off, then choose a margin
              you can store and recover reliably. Six random KeePassXC words
              remain the course default; choose eight if memorizing two more is
              comfortable. An estimated attack cost above your balance is not a
              guarantee: the guess rate, future hardware and what an attacker
              already knows all matter.
            </p>
            <details className="course-lesson-details">
              <summary>Compare the recommended six and eight words</summary>
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
                  />
                ))}
              </div>
              <p>
                The same wordlist, GPU count, rate and rental price apply to
                both.
              </p>
            </details>
            <details className="course-lesson-details">
              <summary>
                Follow the calculation for {words}{" "}
                {words === 1 ? "word" : "words"}
              </summary>
              <GuessingCalculation
                gpuCount={gpuCount}
                rate={Number(rate)}
                rental={Number(compute)}
                listSize={listSize}
                words={words}
              />
            </details>
            <details className="course-lesson-details">
              <summary>Full search, GPU-hours and electricity</summary>
              <div className="passphrase-cost-grid">
                <div>
                  <h3>
                    {words} random {words === 1 ? "word" : "words"}
                  </h3>
                  <dl>
                    <dt>Full-search time</dt>
                    <dd>
                      <SearchDuration seconds={selected.fullSeconds} />
                    </dd>
                    <dt>Full-search rental cost</dt>
                    <dd>
                      <ReadableAmount
                        value={selected.averageComputeCost * 2}
                        unit="dollars"
                        prefix="USD "
                      />
                    </dd>
                    <dt>Average total GPU-hours</dt>
                    <dd>≈ {fullNumber(selected.averageGpuHours)} GPU-hours</dd>
                    <dt>Average total electricity</dt>
                    <dd>≈ {fullNumber(selected.averageKwh)} kWh</dd>
                    <dt>Average electricity-only cost</dt>
                    <dd>
                      <ReadableAmount
                        value={selected.averageElectricityCost}
                        unit="dollars"
                        prefix="USD "
                      />
                    </dd>
                  </dl>
                </div>
                <CostEquivalents
                  cost={selected.averageElectricityCost}
                  electricity
                />
              </div>
              <p>
                Average electricity = average elapsed hours × GPU count × kW per
                GPU. Multiply by USD per kWh for the electricity-only cost.
                Full-search electricity and costs are twice the averages.
              </p>
            </details>
          </>
        )}
        <details className="course-lesson-details">
          <summary>Sources and limits of this model</summary>
          <p>
            The{" "}
            <a
              {...articleLinkProps(
                "https://github.com/keepassxreboot/keepassxc/blob/2.7.10/share/wordlists/eff_large.wordlist"
              )}
            >
              verified KeePassXC 2.7.10 bundled list
            </a>{" "}
            has 7,772 distinct words; the{" "}
            <a
              {...articleLinkProps(
                "https://www.eff.org/files/2016/07/18/eff_large_wordlist.txt"
              )}
            >
              original EFF large list
            </a>{" "}
            has 7,776. This calculation assumes each selection is independent
            and equally likely; repeated words are allowed. The attacker knows
            the wordlist, word count and separator, but no words. Fixed
            separators add no entropy.
          </p>
          <p>
            The starting rate is 32,880 guesses/second for one RTX 4090 from a{" "}
            <a
              {...articleLinkProps(
                "https://hashcat.net/forum/thread-13338-post-63594.html"
              )}
            >
              published Hashcat 7.0.0 wallet.dat benchmark
            </a>{" "}
            (mode 11300, reporting 200,459 iterations). The{" "}
            <a
              {...articleLinkProps("https://www.runpod.io/gpu-models/rtx-4090")}
            >
              Runpod headline RTX 4090 price
            </a>{" "}
            was USD 0.89 per GPU-hour when checked October 14, 2026; prices and
            availability vary.
          </p>
          <p>
            <strong>This is not a measurement of your wallet.</strong> Real
            speed depends on wallet derivation settings, candidate length,
            hardware and software; benchmark kernels may have length limits.
            Ideal scaling assumes no duplicate guesses, coordination overhead or
            rental minimums. A large GPU count does not imply that fleet is
            available.
          </p>
          <p>
            Huge durations and costs are mathematical extrapolations at fixed
            rates, not predictions or feasible budgets. Future hardware,
            disclosed words and malware change the situation. Rental excludes
            storage, taxes and other overheads. This models a Core wallet
            passphrase, not a 7z archive or KeePassXC database.
          </p>
        </details>
      </details>
    </section>
  )
}
