import { Download, FileSearch, Mail } from "lucide-react"
import { nodeBuild, vaultBuild } from "../iso-releases"
import { SITE_URL } from "../site-config"

const brief = "/software/reviewer-brief-vault-v0.8.0-node-v0.1.0-rc.3.md"
const vault = vaultBuild.repo + "/tree/" + vaultBuild.revision
const node = nodeBuild.sourceUrl

export function IsoReviewerBrief() {
  return (
    <section id="reviewer-brief" className="debian-verification" aria-labelledby="reviewer-brief-title">
      <h2 id="reviewer-brief-title" className="learning-heading">
        <FileSearch className="section-pictogram" aria-hidden="true" /><span>Give this to my reviewer</span>
      </h2>
      <p>
        Choose someone you trust who understands Linux system security and Bitcoin Core wallets.
        They can examine everything below using public files and their own disposable wallet.
        Your balance, wallet backup and passphrases stay with you.
      </p>
      <p>The downloadable brief records earlier Vault v0.8.0 and Node RC3 releases. Use the current source and evidence links in the checklist below for today’s downloads.</p>
      <nav className="build-evidence-links" aria-label="Independent review handoff">
        <a href={brief} download><Download size={17} aria-hidden="true" />Historical reviewer brief (.md)</a>
        <a href={"mailto:?subject=" + encodeURIComponent("Independent review of Bitcoin Core Vault and Node") + "&body=" + encodeURIComponent("Please review the current release that I plan to use. These release pages identify the current files and evidence:\n" + vaultBuild.releaseUrl + "\n" + nodeBuild.releaseUrl + "\n\nThis older brief is background, not the identity of the current downloads:\n" + SITE_URL + brief)}>
          <Mail size={17} aria-hidden="true" />Email the release links to my reviewer
        </a>
      </nav>
      <details className="build-instructions">
        <summary>What am I asking the reviewer to check?</summary>
        <ol>
          <li><strong>Identify my file.</strong> Match the exact filename and SHA-256 on the current release page. For Vault, confirm the signing key through a trusted channel and verify the signature on its checksum list. {nodeBuild.signatureStatus === "signed" ? "Apply the same signature check to Node." : "Node’s PGP signature is pending; its checksum alone does not authenticate the publisher."}</li>
          <li><strong>Check the original software.</strong> Get reference copies from Debian, Bitcoin Core and KeePassXC and verify their publishers’ signatures. Compare the programs inside the ISO with those copies.</li>
          <li><strong>Examine Pavao’s changes.</strong> Account for what starts automatically, which programs can read a wallet and where each can write. Check the entire image for unexpected files and permissions, including the installer. Start with the current <a href={vault}>Vault code</a>, <a href={node}>Node source archive</a> and <a href={nodeBuild.proofUrl}>Node source provenance</a>.</li>
          <li><strong>Try the workflow on a spare machine.</strong> With a disposable wallet, observe network and disk activity, inspect a USB export and sign a test payment after restoring the backup.</li>
          <li><strong>Connect the findings to the download.</strong> Review the published inputs and derivation records for Vault {vaultBuild.tag} or Node {nodeBuild.tag}. If you build an image, compare it with that exact published ISO and report the result. An independent byte-identical rebuild of either current image has not yet been demonstrated.</li>
        </ol>
        <p>
          Ask for a signed report naming the reviewer, funding, exact ISO, work performed, findings and remaining uncertainties.
          A mismatch, an unexplained program with access to keys, or an untested assumption that matters to you is a reason to pause before using that release.
        </p>
      </details>

    </section>
  )
}
