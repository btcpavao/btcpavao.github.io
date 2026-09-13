import { ArrowDownUp, Wifi, WifiOff } from "lucide-react"

export function CustodyArchitecture({
  language = "en",
}: {
  language?: "en" | "hr"
}) {
  const tr = (en: string, hr: string) => (language === "en" ? en : hr)
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
              {tr("Generic dedicated computer", "Namjensko generičko računalo")}
            </li>
            <li>Debian Stable</li>
            <li>{tr("Bitcoin Core full node", "Bitcoin Core puni čvor")}</li>
            <li>
              {tr(
                "Watch-only savings wallet",
                "Watch-only novčanik za štednju"
              )}
            </li>
            <li>
              {tr(
                "No savings private keys",
                "Bez privatnih ključeva za štednju"
              )}
            </li>
            <li>
              {tr(
                "Prepares PSBTs and broadcasts",
                "Priprema PSBT i objavljuje transakcije"
              )}
            </li>
          </ul>
        </section>
        <div className="custody-architecture__transfer">
          <ArrowDownUp aria-hidden="true" />
          <span>
            {tr(
              "PSBT via controlled transfer",
              "PSBT kontroliranim prijenosom"
            )}
          </span>
        </div>
        <section className="custody-architecture__role custody-architecture__role--offline">
          <WifiOff aria-hidden="true" />
          <h3>Offline</h3>
          <ul>
            <li>
              {tr("Generic dedicated computer", "Namjensko generičko računalo")}
            </li>
            <li>Debian Stable</li>
            <li>Bitcoin Core</li>
            <li>
              {tr(
                "Encrypted private-key wallet",
                "Šifrirani novčanik s privatnim ključevima"
              )}
            </li>
            <li>{tr("No blockchain required", "Blockchain nije potreban")}</li>
            <li>
              {tr(
                "No network required for signing",
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
            "Verified Tails live media on supported generic hardware, only when the threat model benefits from reducing persistent OS state. Bitcoin Core still signs. Tails does not make untrusted hardware trustworthy.",
            "Provjereni Tails live medij na podržanom generičkom hardveru, kada modelu prijetnji koristi smanjenje trajnog stanja OS-a. I dalje potpisuje Bitcoin Core. Tails ne čini nepouzdan hardver pouzdanim."
          )}
        </p>
      </details>
    </figure>
  )
}
