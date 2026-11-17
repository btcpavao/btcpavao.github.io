import { Download, FileSearch, Mail } from "lucide-react"
import { nodeBuild } from "../iso-releases"
import { SITE_URL } from "../site-config"

const brief = "/software/reviewer-brief-vault-v0.7.0-node-rebuild-e6519d7e5e95.md"
const vault = "https://github.com/btcpavao/bitcoin-core-vault-releases/tree/5346a0db977049a028429482ff943619c52009c4"
const node = nodeBuild.repo + "/tree/" + nodeBuild.revision + "/rebuild"

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
      <nav className="build-evidence-links" aria-label="Independent review handoff">
        <a href={brief} download><Download size={17} aria-hidden="true" />Download the reviewer brief (.md)</a>
        <a href={"mailto:?subject=" + encodeURIComponent("Independent review of Bitcoin Core Vault and Node") + "&body=" + encodeURIComponent("Please review the release that I plan to use. This brief gives you the exact files, evidence and questions.\n\n" + SITE_URL + brief)}>
          <Mail size={17} aria-hidden="true" />Email the brief to my reviewer
        </a>
      </nav>
      <details className="build-instructions">
        <summary>What am I asking the reviewer to check?</summary>
        <ol>
          <li><strong>Identify my file.</strong> Check the exact ISO fingerprint for either download. For Vault, also confirm the signing key through a trusted channel and verify the signature on the manifest. The current Node checksum list is unsigned. The brief lists the exact filenames and fingerprints.</li>
          <li><strong>Check the original software.</strong> Get reference copies from Debian, Bitcoin Core and KeePassXC and verify their publishers’ signatures. Compare the programs inside the ISO with those copies.</li>
          <li><strong>Examine Pavao’s changes.</strong> Account for what starts automatically, which programs can read a wallet and where each can write. Check the entire image for unexpected files and permissions, including the installer. The brief links to the exact <a href={vault}>Vault code</a> and <a href={node}>Node build inputs and source patch</a>.</li>
          <li><strong>Try the workflow on a spare machine.</strong> With a disposable wallet, observe network and disk activity, inspect a USB export and sign a test payment after restoring the backup.</li>
          <li><strong>Connect the findings to the download.</strong> Build Vault v0.7.0 or Node {nodeBuild.tag} from its published revision on your own machine. Compare every byte against the ISO from the corresponding download button. Both images have matching project-run builds.</li>
        </ol>
        <p>
          Ask for a signed report naming the reviewer, funding, exact ISO, work performed, findings and remaining uncertainties.
          A mismatch, an unexplained program with access to keys, or an untested assumption that matters to you is a reason to pause before using that release.
        </p>
      </details>

    </section>
  )
}
