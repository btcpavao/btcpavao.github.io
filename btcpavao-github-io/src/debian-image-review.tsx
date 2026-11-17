import { useEffect } from "react"
import { DebianImageVerification } from "./debian-image-verification"
import { DEBIAN_IMAGES_PATH } from "./components/debian-images-notice"
import { IsoReviewerBrief } from "./components/iso-reviewer-brief"
import { SiteFooter } from "./components/site-footer"
import { SiteHeader } from "./components/site-header"
import { ZoomableImage } from "./components/zoomable-image"
import { captures } from "./curriculum/practice-captures"

const exportSource = "https://github.com/btcpavao/bitcoin-core-vault-releases/blob/5346a0db977049a028429482ff943619c52009c4/config/includes.chroot/usr/lib/core-vault/public_export.py#L75-L96"
const coreGuide = "https://github.com/bitcoin/bitcoin/blob/v32.1/doc/offline-signing-tutorial.md"

function ProjectChanges() {
  const menu = captures["vault-watch-menu"]
  return (
    <section id="what-pavao-added" className="iso-project-changes" aria-labelledby="project-changes-heading">
      <h2 id="project-changes-heading">What did Pavao add?</h2>
      <p>You can set up an offline signer and an online node yourself with Debian and Bitcoin Core. I packaged those roles with their settings, startup services, backup tools and USB transfer tools. <a href={coreGuide}>Read Bitcoin Core’s offline signing guide.</a></p>
      <div className="iso-usb-example">
        <figure>
          <ZoomableImage src={menu.src} alt={menu.alt} width={menu.width} height={menu.height} loading="lazy" decoding="async" />
          <figcaption>The export command in an earlier Vault v0.6.0 practice session. <a href={menu.src}>Full size</a></figcaption>
        </figure>
        <div>
          <h3>When I export a watch-only wallet, what goes onto my USB?</h3>
          <p>Node needs the information that lets it recognize your payments. The private keys that authorize spending belong on Vault. In v0.7.0, Bitcoin Core prepares the watch-only file. My export tool checks it in memory before writing it to the drive you selected.</p>
          <p>The tool checks that private keys are disabled, rejects unexpected kinds of records and asks Bitcoin Core whether any wallet description contains a private key. If a check fails, it stops the export. The exported file can still reveal your addresses and transaction history.</p>
          <a href={exportSource}>Read the export checks in Vault v0.7.0</a>
        </div>
      </div>
      <p>That example covers one action. A wider review includes what starts automatically, which programs can access a wallet, and where they can write. The reviewer brief identifies the exact releases and gives your reviewer a starting point for each question.</p>
    </section>
  )
}

export function DebianImageReviewPage() {
  useEffect(() => {
    // A shared link may point directly to a collapsed worked example.
    function revealExample() {
      const target = document.getElementById(window.location.hash.slice(1))
      if (target instanceof HTMLDetailsElement) target.open = true
    }
    revealExample()
    window.addEventListener("hashchange", revealExample)
    return () => window.removeEventListener("hashchange", revealExample)
  }, [])

  return (
    <div className="min-h-screen bg-background text-foreground">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <SiteHeader />
      <main id="main-content" className="debian-images-page">
        <header className="iso-intro max-w-3xl">
          <a href={DEBIAN_IMAGES_PATH}>← Vault and Node downloads</a>
          <h1>What can the ISO do with my wallet?</h1>
          <p className="max-w-prose text-lg leading-relaxed">Both download buttons lead to ISOs you can rebuild and compare byte for byte. Check Vault against my signed checksum list. Check the Node test candidate against its published SHA-256 and the recorded builds. To find out what can read your wallet or write to USB, you or a reviewer you trust can follow the code below and test it with an empty wallet.</p>
          <nav className="iso-guide-nav" aria-label="Choose a review task">
            <a href="#what-pavao-added">See what I added</a>
            <a href="#reviewer-brief">Give the brief to my reviewer</a>
            <a href="#review-project-code">Read the code with AI</a>
            <a href="#rebuild-tutorial">Rebuild and compare</a>
          </nav>
          <p className="mt-5 text-sm">Preparing a USB? <a href={DEBIAN_IMAGES_PATH + "#verify-vault-download"}>Check the Vault download</a> or <a href={DEBIAN_IMAGES_PATH + "#verify-node-download"}>check the Node download</a>.</p>
        </header>
        <ProjectChanges />
        <IsoReviewerBrief />
        <DebianImageVerification />
        <nav className="iso-guide-nav" aria-label="After reviewing the release">
          <a href={DEBIAN_IMAGES_PATH + "#first-run"}>Try Vault with an empty wallet</a>
          <a href={DEBIAN_IMAGES_PATH + "#ask-pavao"}>Ask Pavao about the evidence</a>
        </nav>
      </main>
      <SiteFooter />
    </div>
  )
}
