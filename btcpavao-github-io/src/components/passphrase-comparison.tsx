import {
  AttackEstimate,
  GuessingCalculation,
} from "@/components/passphrase-calculation"
import {
  KEEPASS_WORD_COUNT,
  wordEntropy,
  attackModel,
  WALLET_BENCHMARK_RATE,
  GPU_RENTAL_PER_HOUR,
  fullNumber,
  namedNumber,
} from "@/curriculum-math"

export function PassphraseComparison() {
  return (
    <section className="course-explorer" aria-label="Six or eight random words">
      <h2>Six words by default; eight for extra margin</h2>
      <div
        className="course-table-scroll"
        tabIndex={0}
        role="region"
        aria-label="Passphrase choices"
      >
        <table>
          <thead>
            <tr>
              <th>Words</th>
              <th>Entropy</th>
              <th>Practical advantage</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">6</th>
              <td>{wordEntropy(6).bits.toFixed(2)} bits</td>
              <td>
                The recommended starting point: fewer words to memorize, type
                and recover.
              </td>
            </tr>
            <tr>
              <th scope="row">8</th>
              <td>{wordEntropy(8).bits.toFixed(2)} bits</td>
              <td>
                More resistance to guessing, if memorizing two extra words is
                comfortable for you.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        These figures use independent, equally likely selections from the
        verified KeePassXC list of {KEEPASS_WORD_COUNT.toLocaleString("en")}{" "}
        words: entropy = word count × log₂(list size). Repeated words are valid;
        fixed spaces add no entropy. Human-chosen sentences do not qualify.
      </p>
      <p>
        Two extra random words add about 25.85 bits and multiply the search
        space by {(KEEPASS_WORD_COUNT ** 2).toLocaleString("en")} — about 60.4
        million. That is the same increase in exhaustive-search work at an
        unchanged guess rate, not a promise about a particular attacker or
        future hardware.
      </p>
      <h2>A benchmark-based time and cost example</h2>
      <p>
        One RTX 4090 achieved 32,880 guesses per second in a published Hashcat
        7.0.0 Bitcoin/Litecoin wallet.dat benchmark (mode 11300, reporting
        200,459 iterations). Use that measured rate and an illustrative rental
        cost of USD 0.89 per GPU-hour. The attacker knows the wordlist, length
        and separator, but none of the words. Average search is half the
        possible sequences.
      </p>
      <div
        className="passphrase-cost-grid"
        role="group"
        aria-label="Average guessing time and rental cost"
      >
        {[6, 8].map((words) => {
          const model = attackModel(
            words,
            WALLET_BENCHMARK_RATE,
            0,
            0,
            GPU_RENTAL_PER_HOUR
          )
          return <AttackEstimate key={words} words={words} model={model} />
        })}
      </div>
      <GuessingCalculation
        gpuCount={1}
        rate={WALLET_BENCHMARK_RATE}
        rental={GPU_RENTAL_PER_HOUR}
      />
      <p>
        <a href="/en/bitcoin-core/self-custody/#lesson/brute-force-economics">
          Change the GPU count in the interactive calculator →
        </a>
      </p>
      <h2>What do those dollar amounts look like?</h2>
      <p>
        Imagine a house costing USD 1,000,000 (one million dollars), or a major
        infrastructure project costing USD 1,000,000,000 (one billion dollars).
        These are hypothetical price tags for scale, not market valuations.
      </p>
      <ul>
        {[6, 8].map((words) => {
          const cost = attackModel(
            words,
            WALLET_BENCHMARK_RATE,
            0,
            0,
            GPU_RENTAL_PER_HOUR
          ).averageComputeCost
          return (
            <li key={words}>
              <strong>{words} words:</strong> the modeled cost equals about{" "}
              {fullNumber(cost / 1e6)} such houses ({namedNumber(cost / 1e6)}),
              or {fullNumber(cost / 1e9)} such projects (
              {namedNumber(cost / 1e9)}).
            </li>
          )
        })}
      </ul>
      <p>
        Under ideal linear scaling, 1,000 identical GPUs divide the time by
        1,000 and multiply hourly rent by 1,000, leaving the total rental cost
        unchanged. These are extrapolations of present-day assumptions, not
        times or budgets anyone could actually sustain. Real rates depend on the
        wallet’s derivation settings, candidate length, software and hardware;
        benchmark kernels may have length limits. Faster future attacks or
        disclosed words change the calculation. Rental excludes storage, taxes
        and other costs; electricity is not added again.
      </p>
      <p>
        Sources:{" "}
        <a href="https://hashcat.net/forum/thread-13338-post-63594.html">
          reported RTX 4090 benchmark, August 2025
        </a>
        ;{" "}
        <a href="https://www.runpod.io/gpu-models/rtx-4090">
          Runpod RTX 4090 pricing
        </a>{" "}
        (headline USD 0.89/hour checked October 14, 2026; prices and
        availability vary). This compares guessing a Core wallet passphrase, not
        a 7z archive or KeePassXC database.
      </p>
      <p>
        Use KeePassXC on the prepared, trusted computer. Keep a separately
        protected recovery record even if you memorize the phrase. More words do
        not fix malware, disclosure or a lost backup.
      </p>
    </section>
  )
}
