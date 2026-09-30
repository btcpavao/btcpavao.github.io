import { ArrowDownUp, Wifi, WifiOff } from "lucide-react"
import { CurriculumVisual } from "./curriculum-visual"

export function CustodyArchitecture({
  language = "en",
}: {
  language?: "en" | "hr"
}) {
  const tr = (en: string, hr: string) => (language === "en" ? en : hr)
  if (language === "en")
    return (
      <CurriculumVisual
        placement={{
          id: "overview-architecture",
          visual: "architecture",
          display: "core",
          target: { kind: "background" },
        }}
      />
    )
  return (
    <figure className="custody-architecture">
      <figcaption>
        {tr("Default reference architecture", "Zadana referentna arhitektura")}
      </figcaption>
      <div className="custody-architecture__roles">
        <section className="custody-architecture__role">
          <Wifi aria-hidden="true" />
          <h3>Online</h3>
          <ul>
            <li>
              {tr(
                "Ordinary computer reserved for this job",
                "Namjensko generičko računalo"
              )}
            </li>
            <li>Debian Stable</li>
            <li>
              {tr(
                "Core node: checks Bitcoin history",
                "Bitcoin Core puni čvor"
              )}
            </li>
            <li>
              {tr(
                "Watch-only wallet: tracks payments",
                "Watch-only novčanik za štednju"
              )}
            </li>
            <li>
              {tr(
                "No private keys for spending savings",
                "Bez privatnih ključeva za štednju"
              )}
            </li>
            <li>
              {tr(
                "Prepares proposals and sends signed payments",
                "Priprema PSBT i objavljuje transakcije"
              )}
            </li>
          </ul>
        </section>
        <div className="custody-architecture__transfer">
          <ArrowDownUp aria-hidden="true" />
          <span>
            {tr(
              "PSBT payment files, checked at each transfer",
              "PSBT kontroliranim prijenosom"
            )}
          </span>
        </div>
        <section className="custody-architecture__role custody-architecture__role--offline">
          <WifiOff aria-hidden="true" />
          <h3>Offline</h3>
          <ul>
            <li>
              {tr(
                "Ordinary computer reserved for this job",
                "Namjensko generičko računalo"
              )}
            </li>
            <li>Debian Stable</li>
            <li>Bitcoin Core</li>
            <li>
              {tr(
                "Private-key wallet protected by a password",
                "Šifrirani novčanik s privatnim ključevima"
              )}
            </li>
            <li>
              {tr("No blockchain download needed", "Blockchain nije potreban")}
            </li>
            <li>
              {tr(
                "Approves payments without a network",
                "Za potpisivanje ne treba mreža"
              )}
            </li>
          </ul>
        </section>
      </div>
      <details className="custody-architecture__optional">
        <summary>
          {tr("Optional offline environment", "Izborno offline okruženje")}
        </summary>
        <p>
          {tr(
            "Tails starts from a verified USB drive on a supported computer. It can reduce what the operating system keeps after a session. Choose it only when that helps with a risk you need to address. Core still signs the payments. Tails cannot make altered hardware trustworthy.",
            "Provjereni Tails live medij na podržanom generičkom hardveru, kada modelu prijetnji koristi smanjenje trajnog stanja OS-a. I dalje potpisuje Bitcoin Core. Tails ne čini nepouzdan hardver pouzdanim."
          )}
        </p>
      </details>
    </figure>
  )
}
