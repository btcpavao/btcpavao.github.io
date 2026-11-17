import { ArrowDownToLine, ArrowUpRight, ChevronRight } from "lucide-react"
import "./iso-landing-hero.css"

const workbench = "/software/illustrations/origin/two-computer-workbench"
const vaultDesktop = "/software/screenshots/verification/vault-v070-desktop.webp"
const nodeDesktop = "/software/screenshots/node/v0.1.0-rc.2/desktop.webp"

export function IsoLandingHero({ vaultIso, nodeIso }: { vaultIso: string; nodeIso: string }) {
  return (
    <header className="iso-landing-hero">
      <nav className="iso-breadcrumb" aria-label="Breadcrumb">
        <a href="/en/bitcoin-core/">Bitcoin Core</a>
        <ChevronRight size={13} aria-hidden="true" />
        <span>Debian images</span>
      </nav>
      <div className="iso-landing-hero__grid">
        <div className="iso-landing-hero__copy">
          <h1>Run Bitcoin Core on two ordinary computers.</h1>
          <p>Two dedicated Debian Linux operating systems for compatible laptops and desktops. <strong>Bitcoin Core Vault</strong> creates your wallet and signs payments offline. <strong>Bitcoin Core Node</strong> verifies the blockchain, tracks your wallet and sends your signed payments online.</p>
          <nav className="iso-landing-downloads" aria-label="Download the ISO images">
            <a href={vaultIso}>
              <ArrowDownToLine size={18} aria-hidden="true" />
              <span>Download Vault ISO<small>v0.7.0 · Offline</small></span>
            </a>
            <a href={nodeIso}>
              <ArrowDownToLine size={18} aria-hidden="true" />
              <span>Download Node ISO<small>Signed · Reproducible test ISO</small></span>
            </a>
          </nav>
          <div className="iso-hero-secondary">
            <a href="#verify-download">Verify a download</a>
            <a href="#first-run">Try Vault on one spare PC</a>
          </div>
        </div>
        <figure className="iso-workbench">
          <div className="iso-workbench__scene" role="img" aria-label="Illustration of a spare laptop running the real offline Vault desktop beside a small desktop PC running the online Node. A USB stick sits between them.">
            <img src={workbench + ".webp"} srcSet={workbench + "-640.webp 640w, " + workbench + ".webp 1200w"}
              sizes="(min-width: 1200px) 650px, (min-width: 900px) 54vw, 94vw"
              alt="" width={1200} height={800} fetchPriority="high" />
            <img className="iso-workbench__vault" src={vaultDesktop} alt="" width={1280} height={800} />
            <img className="iso-workbench__node" src={nodeDesktop} alt="" width={1280} height={800} />
          </div>
          <figcaption>
            <span>Open the desktop screenshots</span>
            <a href={vaultDesktop}>Vault <ArrowUpRight size={14} aria-hidden="true" /></a>
            <a href={nodeDesktop}>Node (RC2) <ArrowUpRight size={14} aria-hidden="true" /></a>
          </figcaption>
        </figure>
      </div>
      <nav className="iso-contents" aria-label="On this page">
        <a href="#why-two-computers">Why I built them</a>
        <a href="#systems">Inside Vault &amp; Node</a>
        <a href="#wallet-backup-plan">Wallet backups</a>
        <a href="#try-the-isos">Downloads &amp; setup</a>
        <a href="#custody-questions">FAQ</a>
        <a href="#ask-pavao">Ask Pavao <ArrowUpRight size={15} aria-hidden="true" /></a>
      </nav>
    </header>
  )
}
