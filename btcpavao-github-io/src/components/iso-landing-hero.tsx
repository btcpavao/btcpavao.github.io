import { ArrowDownToLine, ArrowRight, ArrowUpRight, ChevronRight, LockKeyhole, Network } from "lucide-react"
import { nodeBuild, vaultBuild } from "../iso-releases"
import { captures } from "../curriculum/practice-captures"
import "./iso-landing-hero.css"

const workbench = "/software/illustrations/origin/two-computer-workbench"
const vaultDesktop = captures["vault-home"]
const nodeDesktop = captures["node-home"]

export function IsoLandingHero() {
  return (
    <header className="iso-landing-hero">
      <nav className="iso-breadcrumb" aria-label="Breadcrumb">
        <a href="/en/bitcoin-core/">Bitcoin Core</a>
        <ChevronRight size={13} aria-hidden="true" />
        <span aria-current="page">Debian images</span>
      </nav>
      <div className="iso-landing-hero__grid">
        <div className="iso-landing-hero__copy">
          <h1>Run Bitcoin Core on two ordinary computers.</h1>
          <p>Two dedicated Debian Linux systems for 64-bit Intel and AMD computers.
            <strong> Vault</strong> creates your wallet and signs payments offline.
            Add <strong>Node</strong> on a second computer to verify the blockchain, track your wallet and broadcast signed payments.</p>
          <nav className="iso-hero-paths" aria-label="Download the ISO images">
            <div className="iso-hero-path">
              <LockKeyhole className="iso-hero-path__icon" size={19} aria-hidden="true" />
              <div>
                <a className="iso-hero-path__guide" href="#first-run">
                  Try Vault from USB <ArrowRight size={16} aria-hidden="true" />
                </a>
                <p>{vaultBuild.tag} · Runs in RAM without installing.</p>
              </div>
              <a className="iso-hero-path__download" href={vaultBuild.isoUrl} aria-label="Download Vault ISO">
                <ArrowDownToLine size={15} aria-hidden="true" /> Vault ISO
              </a>
            </div>
            <div className="iso-hero-path">
              <Network className="iso-hero-path__icon" size={19} aria-hidden="true" />
              <div>
                <a className="iso-hero-path__guide" href="#node-setup">
                  Set up the online Node <ArrowRight size={16} aria-hidden="true" />
                </a>
                <p>Test release · Installation erases the selected disk.</p>
              </div>
              <a className="iso-hero-path__download" href={nodeBuild.isoUrl} aria-label="Download Node ISO">
                <ArrowDownToLine size={15} aria-hidden="true" /> Node ISO
              </a>
            </div>
          </nav>
        </div>
        <figure className="iso-workbench">
          <div className="iso-workbench__scene" role="img" aria-label="A laptop showing the Vault desktop beside a monitor showing the Node desktop. A USB stick sits between them.">
            <img src={workbench + ".webp"} srcSet={workbench + "-640.webp 640w, " + workbench + ".webp 1200w"}
              sizes="(min-width: 1264px) 590px, (min-width: 900px) 48vw, 92vw"
              alt="" width={1200} height={800} fetchPriority="high" />
            <img className="iso-workbench__vault" src={vaultDesktop.src} alt="" width={vaultDesktop.width} height={vaultDesktop.height} />
            <img className="iso-workbench__node" src={nodeDesktop.src} alt="" width={nodeDesktop.width} height={nodeDesktop.height} />
          </div>
          <figcaption>
            <span>Desktop screenshots</span>
            <a href={vaultDesktop.fullSrc} aria-label="Open the Vault v0.9.0 Home screenshot">Vault {vaultBuild.tag} <ArrowUpRight size={14} aria-hidden="true" /></a>
            <a href={nodeDesktop.fullSrc} aria-label="Open the Node RC4 Home screenshot">Node RC4 <ArrowUpRight size={14} aria-hidden="true" /></a>
          </figcaption>
        </figure>
      </div>
      <nav className="iso-contents" aria-label="On this page">
        <a href="#try-the-isos">Downloads &amp; verification</a>
        <a href="#setup-guides">Setup guides</a>
        <a href="#systems">Inside the systems</a>
        <a href="#why-two-computers">Why I built them</a>
        <a href="#wallet-backup-plan">Wallet backups</a>
        <a href="#custody-questions">FAQ</a>
      </nav>
    </header>
  )
}
