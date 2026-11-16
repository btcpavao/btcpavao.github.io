import { Download, FileSearch, Mail } from "lucide-react"
import { SITE_URL } from "../site-config"
import { VerificationCommands } from "./verification-commands"

const brief = "/software/reviewer-brief-vault-v0.7.0-node-v0.1.0-rc.2.md"
const vault = "https://github.com/btcpavao/bitcoin-core-vault-releases/tree/5346a0db977049a028429482ff943619c52009c4"
const node = "https://github.com/btcpavao/bitcoin-core-node-releases/tree/669e90f9768975924ae443225f23f78cb4a28ecf/source"

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
          <li><strong>Identify my file.</strong> Confirm the signing-key fingerprint through a separate, trusted channel, then check the signature and the ISO’s digital fingerprint. The brief lists the exact filenames and fingerprints.</li>
          <li><strong>Check the original software.</strong> Get reference copies from Debian, Bitcoin Core and KeePassXC and verify their publishers’ signatures. Compare the programs inside the ISO with those copies.</li>
          <li><strong>Examine Pavao’s changes.</strong> Account for what starts automatically, which programs can read a wallet and where each can write. Check the entire image for unexpected files and permissions, including the installer. The brief links to the exact <a href={vault}>Vault code</a> and <a href={node}>Node source snapshot</a>.</li>
          <li><strong>Try the workflow on a spare machine.</strong> With a disposable wallet, observe network and disk activity, inspect a USB export and sign a test payment after restoring the backup.</li>
          <li><strong>Connect the findings to the download.</strong> Build Vault v0.7.0 independently and compare it with the signed ISO. The signed Node RC2 has no demonstrated identical rebuild. Its comparison image has a different filename and fingerprint.</li>
        </ol>
        <p>
          Ask for a signed report naming the reviewer, funding, exact ISO, work performed, findings and remaining uncertainties.
          A mismatch, an unexplained program with access to keys, or an untested assumption that matters to you is a reason to pause before using that release.
        </p>
      </details>
      <details className="build-instructions">
        <summary>Explore a question first with my own AI</summary>
        <p>Give your assistant only the public source. Open the file it cites. If it cannot see a file, ask which file it needs. Its explanation can help you decide what to raise with your reviewer.</p>
        <VerificationCommands kind="prompt" title="Questions about my offline signing computer" lines={[
          `Please read the public Vault v0.7.0 source at ${vault} without running it. Which programs start automatically? Which of Pavao’s additions can read my wallet or write to removable storage?`,
          "Follow one action: I click Export watch-only wallet and save the file to USB. Which code creates the file, which checks run and what reaches the drive? Link to the exact lines. List other programs with access that this one example does not cover. Tell me what you could not establish.",
        ]} />
        <VerificationCommands kind="prompt" title="Questions about my online node" lines={[
          `Please read the public snapshot of the signed Node v0.1.0-rc.2 release at ${node} without running it. Which data in the watch-only wallet can someone with access to the computer see?`,
          "Follow a watch-only wallet backup from the button to the data written to the selected drive. Identify the programs, their permissions and the information in the copy. Link to the lines that support each answer and name any behaviour that requires a test on the running system.",
        ]} />
      </details>
    </section>
  )
}
