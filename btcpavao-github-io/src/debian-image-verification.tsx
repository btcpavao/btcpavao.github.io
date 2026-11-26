import { Braces, CircleCheckBig, Disc3, Fingerprint, GitCompareArrows, Hammer, List, LockKeyhole, Network, PackageOpen, ScanLine, ShieldCheck } from "lucide-react"
import { nodeBuild, nodeRc3Build, vaultBuild } from "./iso-releases"
import { DEBIAN_IMAGES_PATH } from "./components/debian-images-notice"
import { verifierRevision } from "./components/signed-download-check"
import { VerificationCommands as Commands } from "./components/verification-commands"
import { UpstreamComparison } from "./components/upstream-comparison"
import { ZoomableImage } from "./components/zoomable-image"

const verificationDocs = "https://github.com/btcpavao/btcpavao.github.io/blob/main/docs/debian-images/README.md"
const vaultRepo = vaultBuild.repo
const nodeRepo = nodeBuild.repo

const nodeSnapshot = "669e90f9768975924ae443225f23f78cb4a28ecf"
const nodeSource = nodeRepo + "/blob/" + nodeSnapshot + "/source"

type Product = "Vault" | "Node"

const vaultExport = vaultRepo + "/blob/" + vaultBuild.revision + "/config/includes.chroot/usr/lib/core-vault/public_export.py"

function BuildLinks({ product }: { product: Product }) {
  if (product === "Node") return (
    <nav className="build-evidence-links" aria-label="Current Node release evidence">
      <a href={nodeBuild.sourceUrl}><Braces size={15} aria-hidden="true" />Matching source archive</a>
      <a href={nodeBuild.releaseUrl}><Disc3 size={15} aria-hidden="true" />Release files</a>
      <a href={nodeBuild.proofUrl}><GitCompareArrows size={15} aria-hidden="true" />Source provenance</a>
      <a href={nodeBuild.buildInfoUrl}><List size={15} aria-hidden="true" />Build information</a>
      <a href={nodeBuild.limitsUrl}>Test scope and limits</a>
    </nav>
  )
  const { repo, tag, revision, proofUrl } = vaultBuild
  const files = repo + "/releases/download/" + tag + "/"
  return (
    <nav className="build-evidence-links" aria-label={product + " release evidence"}>
      <a href={repo + "/tree/" + revision}><Braces size={15} aria-hidden="true" />Browse release code</a>
      <a href={files + "image-packages.tsv"}><List size={15} aria-hidden="true" />Installed packages</a>
      <a href={repo + "/releases/tag/" + tag}><Disc3 size={15} aria-hidden="true" />Signed release files</a>
      <a href={proofUrl}><GitCompareArrows size={15} aria-hidden="true" />Build provenance</a>
    </nav>
  )
}

function SourceFolder({ product }: { product: Product }) {
  if (product === "Node") {
    const archive = `bitcoin-core-node-${nodeBuild.tag}-source.tar.gz`
    return <Commands title="Prepare the current Node source" lines={[
      "curl --fail --location --output " + archive + " " + nodeBuild.sourceUrl + " &&",
      "  echo '" + nodeBuild.sourceSha256 + "  " + archive + "' | sha256sum --check - &&",
      "  mkdir node-inspection &&",
      "  tar -xzf " + archive + " --strip-components=1 -C node-inspection",
    ]} />
  }
  return <Commands title="Open the signed Vault source" lines={[
    'cd "$HOME/iso-review" &&',
    "  python3 check_release.py vault " + vaultBuild.tag + " &&",
    "  mkdir vault-" + vaultBuild.tag + "-review &&",
    "  tar -xzf release-checks/vault/" + vaultBuild.tag + "/bitcoin-core-vault-" + vaultBuild.tag + "-source.tar.gz --strip-components=1 -C vault-" + vaultBuild.tag + "-review",
  ]} />
}

function VerificationShot({ file, alt, caption, width, height }: {
  file: string; alt: string; caption: string; width: number; height: number
}) {
  const src = "/software/screenshots/verification/" + file + ".webp"
  return (
    <figure className="verification-shot">
      <ZoomableImage src={src} alt={alt} width={width} height={height} loading="lazy" decoding="async" />
      <figcaption><span>{caption}</span> <a href={src} aria-label={"Full size: " + alt}>Full size</a></figcaption>
    </figure>
  )
}

function VerificationIllustration({ file, alt, caption, sizes = "(min-width: 960px) 850px, calc(100vw - 40px)" }: {
  file: string; alt: string; caption: string; sizes?: string
}) {
  const src = "/software/illustrations/verification/" + file
  return (
    <figure className="verification-illustration">
      <ZoomableImage src={src + ".webp"} srcSet={src + "-768.webp 768w, " + src + ".webp 1536w"}
        sizes={sizes} alt={alt} width={1536} height={1024} loading="lazy" decoding="async" />
      <figcaption>{caption}</figcaption>
    </figure>
  )
}

function CurrentIsoComparison({ product }: { product: Product }) {
  const release = product === "Vault" ? vaultBuild : nodeBuild
  const role = product.toLowerCase()
  return (
    <details className="build-instructions" id={`compare-current-${role}`}>
      <summary>Compare your candidate with {product} {release.tag}</summary>
      <p>Save the <a href={release.isoUrl}>published {product} ISO</a> in Downloads and
        follow the <a href={DEBIAN_IMAGES_PATH + "#verify-" + role + "-download"}>signed checksum check</a>.
        Keep your own candidate in a separate file.</p>
      {product === "Vault"
        ? <p>The <a href={release.instructionsUrl}>Vault build guide</a> lists the Debian 13 prerequisites and the command that produces <code>live-image-amd64.hybrid.iso</code>. Use that output as your candidate.</p>
        : <p>The <a href={nodeBuild.recipeUrl}>RC4 recipe archive</a> records how the publisher assembled the image. Some inputs were local to that build. If you have produced an RC4 candidate, use its ISO here.</p>}
      <p>In Bash on Debian, run the block below. At the prompt, type the full path to your candidate, without quotation marks.</p>
      <Commands title={`Compare with ${product} ${release.tag}`} lines={[
        "(",
        "  set -eu",
        '  reference="$HOME/Downloads/' + release.isoName + '"',
        '  expected=' + release.sha256,
        "  printf '%s  %s\\n' \"$expected\" \"$reference\" | sha256sum --check -",
        '  read -r -p "Path to your candidate ISO: " candidate',
        '  if [[ ! -f "$candidate" || "$candidate" -ef "$reference" ]]; then',
        '    echo "Choose a separate candidate ISO file." >&2',
        '    exit 1',
        '  fi',
        '  cmp -- "$reference" "$candidate"',
        '  echo "MATCH: the two ISO files are byte-identical."',
        ")",
      ]} />
      <p><code>OK</code> confirms the release file’s checksum. <code>MATCH</code> appears only when the entire candidate matches it. If the files differ, keep the output and build log with the source revision you tested.</p>
    </details>
  )
}

function HistoricalNodeRebuild() {
  const { repo, tag, revision, isoName, sha256 } = nodeRc3Build
  return (
    <details className="build-instructions">
      <summary>Historical Node {tag} rebuild and comparison</summary>
      <p>These commands reproduce the archived {tag} ISO. They do not build or verify the current Node {nodeBuild.tag} download.</p>
      <ol>
        <li>
          <strong>Get the exact source.</strong> In the VM, open a terminal in a fresh folder. The block prints and checks the full commit ID. Continue when it matches <code>{revision}</code>.
          <Commands title="Node source revision" lines={[
            "git clone --depth 1 --branch " + tag + " " + repo + ".git node-candidate &&",
            "  cd node-candidate &&",
            "  git rev-parse HEAD &&",
            '  test "$(git rev-parse HEAD)" = ' + revision,
          ]} />
          <VerificationShot file="node-source-revision" width={1114} height={223}
            alt="A checkout of the Node candidate prints the full Git commit beginning with e6519d7e5e95."
            caption="Example from an earlier release. For RC3, compare the full revision printed by the command above." />
        </li>
        <li>
          <strong>Review what the project changes.</strong>{" "}
            Open the <a href={nodeRepo + "/blob/" + revision + "/rebuild/node.patch"}>patch applied to the signed RC2 source</a>.
            Extract the resulting files with the command below. Open <code>../node-inspection/app/chain_backup.py</code> to see how the Node copies blockchain data.
            <Commands title="Inspect the Node source" lines={["bash rebuild/node source ../node-inspection"]} />
        </li>
        <li>
          <strong>Build the ISO.</strong> Stay in the same terminal and directory. The command needs
          a new result folder and may take hours. Docker provides the specified build environment. Continue after it finishes successfully.
          <Commands title="Build the Node ISO" lines={['test "$(git rev-parse HEAD)" = ' + revision + " &&", "  sudo bash rebuild/node build ../node-result"]} />
        </li>
        <li>
          <strong>Compare your ISO with the published image.</strong> Run this block from the same
          directory. It downloads the published file, checks both SHA-256 values, then compares every byte.
          <Commands title="Compare the Node ISOs" lines={[
            "(",
            "  set -euo pipefail",
            "  base=" + repo + "/releases/download/" + tag,
            "  image=" + isoName,
            "  built=../node-result/bitcoin-core-node-candidate-amd64.iso",
            "  expected=" + sha256,
            '  curl --fail --location --retry 3 -o "../$image" "$base/$image"',
            "  printf '%s  %s\\n' \"$expected\" \"$built\" \"$expected\" \"../$image\" | sudo sha256sum --check",
            '  sudo cmp -- "$built" "../$image"',
            '  echo "MATCH: your Node ISO and the published image are identical."',
            ")",
          ]} />
        </li>
      </ol>
      <p><a href={repo + "/blob/" + revision + "/docs/REBUILD.md"}>Full Node build guide and troubleshooting</a></p>
    </details>
  )
}

export function DebianImageVerification() {
  return (
    <section className="debian-verification" id="verify-the-build">
      <h2 className="learning-heading"><ScanLine className="section-pictogram" aria-hidden="true" /><span>What’s in the images, and how can I check?</span></h2>
      <p>
        Before you put a wallet on a computer, you can ask what will run when it starts.
        An ISO is one downloadable file containing the operating system, applications and settings that
        start when you boot the USB stick. Think of a fitted tool case. Debian, Bitcoin Core and
        KeePassXC supply tools. Pavao chooses what goes in the case, fits the pieces together and
        supplies instructions for making another. Verifying the download identifies the case you received.
        Building the image means following those instructions on your own computer.
      </p>
      <VerificationIllustration file="inside-the-iso"
        alt="An open tool case contains three ready-made tools. A hand fits a custom divider beside them using an assembly drawing."
        caption="Debian supplies the system and many packages. The projects behind Bitcoin Core and KeePassXC publish their own software. Pavao’s build recipe selects versions, adds configuration and includes project code. Some components, including Vault’s file manager and installer, have published changes of their own." />
      <nav className="verification-map" aria-label="Choose a verification question">
        <a href="#signed-manifest"><Fingerprint aria-hidden="true" /><strong>Which ISO did I download?</strong><span>Check the release fingerprint</span></a>
        <a href="#upstream-programs"><PackageOpen aria-hidden="true" /><strong>Are the programs genuine?</strong><span>Compare with their publishers</span></a>
        <a href="#review-project-code"><Braces aria-hidden="true" /><strong>What did Pavao change?</strong><span>Trace an action in the code</span></a>
        <a href="#rebuild-tutorial"><GitCompareArrows aria-hidden="true" /><strong>Can I make the same ISO?</strong><span>Build it and compare every byte</span></a>
      </nav>
      <p>
        <strong>Before writing a USB stick, check the fingerprint for the ISO you downloaded.</strong> If you
        are deciding whether to trust the software with a wallet, go further. Even a perfect copy
        can reproduce a programming mistake. Reading how the system handles a wallet and testing that
        behavior with an empty practice wallet answer questions a file comparison leaves open.
        You can do all the file checks on a separate computer before booting either image.
      </p>
      <h3 id="upstream-programs" className="learning-heading"><PackageOpen className="section-pictogram" aria-hidden="true" /><span>Where do the programs come from?</span></h3>
      <p>
        <strong>Upstream</strong> means the project that supplies a piece of software. For instance,
        the Bitcoin Core developers publish the program that signs a transaction. BTC Pavao supplies
        the Vault configuration that launches it offline and controls which exports it can save to USB.
        You can examine those two contributions separately.
      </p>
      <dl className="verification-suppliers">
        <div><dt>Debian GNU/Linux</dt><dd>The operating system and many tools, including GnuPG for encryption,
          come as <strong>packages</strong> (bundles of program files). Debian signs its catalog.
          Its package manager, APT, checks the catalog’s signature, then follows its checksums down to
          the individual package. For example, the <code>gpg</code> program inside the earlier Vault v0.7.0 and the earlier signed Node RC2
          matched Debian’s package <code>2.4.7-21+deb13u1+b5</code> byte for byte in our check.
          A package inventory lists the versions installed.{" "}
          <a href="https://www.debian.org/doc/manuals/debian-handbook/sect.package-authentication.en.html">How Debian authenticates packages</a>{" · "}
          <a href={vaultRepo + "/blob/" + vaultBuild.revision + "/tools/rebuild/inside.sh#L11-L45"}>How Vault checks the Debian snapshot</a></dd></div>
        <div><dt>Bitcoin Core 32.1</dt><dd>Both images include the graphical wallet (<code>bitcoin-qt</code>)
          and its command-line companion (<code>bitcoin-cli</code>). Bitcoin Core publishes a signed list of
          hashes for its downloads. Authenticate its Linux archive, unpack the two programs and compare them
          with the copies inside your chosen ISO. A byte match is stronger evidence than a version number
          in an About window.{" "}
          <a href="https://bitcoincore.org/bin/bitcoin-core-32.1/">Official 32.1 files</a>{" · "}
          <a href={vaultRepo + "/blob/" + vaultBuild.revision + "/provenance/32.1/verification.json"}>Recorded archive and executable hashes</a></dd></div>
        <div><dt>KeePassXC 2.8.0</dt><dd>This password and passphrase tool comes in an <strong>AppImage</strong>,
          a single downloadable bundle. KeePassXC signs that bundle with its own release key. The images install
          the extracted application and give it project-specific launchers or settings. Compare the executable
          inside the authenticated bundle with the executable inside the ISO.{" "}
          <a href="https://keepassxc.org/verifying-signatures/">KeePassXC’s signature instructions</a>{" · "}
          <a href={vaultRepo + "/blob/" + vaultBuild.revision + "/tools/core-vault/manifests/keepassxc-release.json"}>Pinned version, key and hash</a></dd></div>
      </dl>
      <UpstreamComparison />
      <h3 className="learning-heading"><LockKeyhole className="section-pictogram" aria-hidden="true" /><span>What Vault adds to the offline computer</span></h3>
      <p>
        Vault starts a private session in RAM, launches Core with networking disabled, and adds backup,
        recovery and USB export tools. Vault’s own backup code uses GnuPG. The recipe also builds modified
        versions of Thunar, the file manager that offers Quick Delete and Secure Delete, and Calamares,
        the installer. A <strong>patch</strong> is a record of edits you can read, like tracked changes
        in a document. A <strong>commit</strong> identifies one saved revision, so two readers can
        discuss the very same lines.{" "}
        <a href={vaultRepo + "/tree/" + vaultBuild.revision + "/tools/core-vault/calamares"}>Current installer patches</a>{" · "}
        <a href={vaultRepo + "/tree/" + vaultBuild.revision + "/tools/rebuild/packages/sources"}>File-manager source inputs</a>
      </p>
      <BuildLinks product="Vault" />
      <h3 className="learning-heading"><Network className="section-pictogram" aria-hidden="true" /><span>What Node adds to the online computer</span></h3>
      <p>
        Node adds a desktop, network and storage settings, blockchain backup and restore, and its
        watch-only wallet workflow. {nodeBuild.tag} uses one RAM-only Private Workspace for temporary files, including PSBTs.
        Its source archive records revision <code>{nodeBuild.revision}</code>. The
        {" "}<a href={nodeBuild.proofUrl}>source provenance</a> describes how the accepted ISO was assembled,
        including the build inputs and changes present during that build. Review the
        {" "}<a href={nodeBuild.sourceUrl}>matching source archive</a> and
        {" "}<a href={nodeBuild.recipeUrl}>recorded recipe</a> together.
        Some vendor firmware is available only in compiled form; see the release’s build records.
      </p>
      <BuildLinks product="Node" />

      <h3 id="signed-manifest" className="learning-heading"><ShieldCheck className="section-pictogram" aria-hidden="true" /><span>How do I check the file I received?</span></h3>
      <p><a href={DEBIAN_IMAGES_PATH + "#verify-vault-download"}>Vault {vaultBuild.tag}</a> has a signed checksum list.
        {" "}<a href={DEBIAN_IMAGES_PATH + "#verify-node-download"}>Node {nodeBuild.tag}</a>
        {nodeBuild.signatureStatus === "signed" ? " also has a signed checksum list." : " has a published checksum list; Pavao’s PGP signature is pending. Its checksum alone does not authenticate the publisher."}
        {" "}Follow the steps for the release you downloaded. The signature explanation below applies once its signature is available.</p>
      <p>Imagine receiving a parcel with a packing list. First you check who signed the list. Then you
        check what arrived. Here the list is <code>SHA256SUMS</code>. Each entry pairs a filename with
        a <strong>SHA-256 checksum</strong>, a fingerprint calculated from every byte in that file.
        Even a one-byte edit should give a different checksum.
      </p>
      <p>
        <strong>Two different fingerprints appear in this check.</strong> One identifies a person’s signing key. The other identifies a file.</p>
      <figure className="verification-two-checks">
        <figcaption>How the signed list connects Pavao to your download</figcaption>
        <ol>
          <li><Fingerprint aria-hidden="true" /><span><strong>Known signing key → signed list</strong>
            Confirm the key’s 40-character fingerprint with Pavao through a channel you already trust. GnuPG uses that public key and the
            separate signature file (<code>SHA256SUMS.asc</code>) to authenticate the list.</span></li>
          <li><Disc3 aria-hidden="true" /><span><strong>Signed list → your ISO</strong>
            Calculate the ISO’s 64-character SHA-256. A match with the entry for your filename
            means your copy contains the bytes covered by Pavao’s signature.</span></li>
        </ol>
      </figure>
      <VerificationIllustration file="signed-list-and-file-match"
        alt="First a maker’s mark is compared with a separate reference. Then a pattern on the delivered box is compared with the same pattern on the list."
        caption="The maker’s mark stands for the signature on the list. The pattern on the box stands for the checksum you calculate from your download." />
      <details className="build-instructions">
        <summary>See what happens when a file fails verification</summary>
        <VerificationShot file="vault-v060-rejected" width={1242} height={384}
          alt="A deliberately wrong ISO makes the verifier stop and print the different expected and computed SHA-256 values."
          caption="In this earlier Vault v0.6.0 example the checksum list has a valid signature, but the selected file differs. Check the release and file before writing a USB stick." />
      </details>

      <h3 id="review-project-code" className="learning-heading"><Braces className="section-pictogram" aria-hidden="true" /><span>Read what the project does, with your own AI</span></h3>
      <p>
        Pick a question you would actually ask before using a wallet. “What reaches my USB drive when I
        export a watch-only wallet?” is a question you can trace from a click to a file. You can follow
        the links below in a browser. For a review on your own computer, the walkthrough also shows how
        to open the source for the selected image in your coding assistant.
      </p>
      <ol>
        <li>
          <strong>Give the AI the exact edition.</strong> Choose{" "}
          <a href={vaultRepo + "/tree/" + vaultBuild.revision}>the Vault {vaultBuild.tag} source</a> or{" "}
          <a href={nodeBuild.sourceUrl}>the current Node source archive</a>.
          Start with the full release. A <a href={vaultRepo + "/compare/v0.8.0..." + vaultBuild.revision}>diff between two Vault versions</a> can then show individual edits, including an added line marked <code>+</code> or a removed line marked <code>−</code>. If your assistant cannot open the link, give it the relevant public files from the verified archive.
          Keep wallet files, private descriptors, passphrases and signing keys out of the conversation.
          <details className="build-instructions">
            <summary>Get the source folder for my assistant</summary>
            <p>For Vault, follow the <a href={DEBIAN_IMAGES_PATH + "#verify-vault-download"}>Vault verifier setup</a> and confirm the signing-key fingerprint. The first block opens the verified Vault source in a new folder.</p>
            <SourceFolder product="Vault" />
            <p>For Node, use a fresh directory on Debian 13 with curl, tar and sha256sum. The block checks the archive against the exact hash published here and extracts its tracked files into <code>node-inspection</code>. Compare the archival revision in <a href={nodeBuild.sourceCommitUrl}>SOURCE-COMMIT.txt</a> with the <a href={nodeBuild.proofUrl}>source provenance</a>. {nodeBuild.signatureStatus === "pending" && "PGP signing is pending, so this hash check does not authenticate the publisher."}</p>
            <SourceFolder product="Node" />
          </details>
        </li>
        <li>
          <strong>Ask it to follow one action.</strong> Copy the prompt for your image into the AI chat.
          If it can only see part of the repository, ask it to name the next file it needs.
          <div className="verification-prompt-example">
            <VerificationIllustration file="trace-one-action"
              sizes="(min-width: 840px) 410px, calc(100vw - 72px)"
              alt="Three linked cards follow a file-selection action to a line of code and onward to a USB drive. A pencil points to the line to inspect."
              caption="Ask the AI to follow one action through the public release code. For example, when Vault saves a signed PSBT, which file handles the request, what does it check, and where does it write? Ask for links to the exact source lines and open them yourself." />
            <Commands kind="prompt" title="Vault · trace a USB export" lines={[
              "Use the public Vault " + vaultBuild.tag + " source at " + vaultRepo + "/tree/" + vaultBuild.revision + ". Read the code without executing it.",
              "I click File → Export watch-only wallet and choose a USB drive. Follow the action from Bitcoin Core to Vault’s export helper. Start with export_view.py and public_export.py. Which code belongs to Core, and which to Vault? What is held in RAM, what is checked, what reaches the drive, and what happens if a check fails?",
              "Explain each step in everyday language. For each claim give the exact file, function and line link for this revision, or file and line numbers if working locally. Identify anything you could not verify. Suggest one test using an empty practice wallet.",
            ]} />
          </div>
          <Commands kind="prompt" title="Node · trace a blockchain backup" lines={[
            "Read the Node " + nodeBuild.tag + " source in node-inspection/ without executing it. Its archival revision is " + nodeBuild.revision + "; the corresponding source and derivation record is " + nodeBuild.proofUrl + ". I choose Settings → Backup and Restore → Blockchain and select a USB drive.",
            "Start with app/chain_backup.py. Find the list of folders it copies and the code that uses that list. Are wallet files among the selected folders? What happens to Bitcoin Core during the copy, and what happens if the drive fills up?",
            "Trace called functions as needed. Explain each conclusion in plain English and cite the exact file, function and line link for this version, or local line numbers. Distinguish observed code from assumptions. Suggest one check with disposable data.",
          ]} />
        </li>
        <li>
          <strong>Open a citation yourself.</strong> In Vault, the{" "}
          <a href={vaultExport + "#L101-L128"}>watch-only checks</a> read the wallet flags and ask Core whether a descriptor
          contains private keys. Follow the call from{" "}
          <a href={vaultExport + "#L187-L225"}>the function that publishes the file</a>.
          For the current Node, inspect <code>node-inspection/app/chain_backup.py</code> from its matching source archive and follow its actual call paths.
          The older RC2 <a href={nodeSource + "/app/chain_backup.py#L28"}>folder list</a> and
          {" "}<a href={nodeSource + "/app/chain_backup.py#L220-L240"}>copy loop</a> are historical examples, not citations for the current code.
          If an answer cites only a comment or a README, ask for the code that enforces the behavior.
          An AI can overlook another code path. Treat an unsupported claim as an open question.
        </li>
      </ol>
      <details className="build-instructions" id="compare-source-files">
        <summary>Check that the project files I just read are inside my ISO</summary>
        <p>For Vault, return to <code>~/iso-review</code> after running its source-download step above.
          Leave the verified archive in <code>release-checks/</code>. In the same folder as
          {" "}<code>check_release.py</code>, get its companion script and the tools for opening a compressed
          Linux filesystem. Allow 2 GiB of temporary space. The ISO stays on disk throughout the check.</p>
        <Commands title="Prepare the source-to-ISO check" lines={[
          'cd "$HOME/iso-review" &&',
          "  sudo apt install xorriso squashfs-tools &&",
          "  curl --fail --location --output inspect_payload.py https://raw.githubusercontent.com/btcpavao/btcpavao.github.io/" + verifierRevision + "/docs/debian-images/inspect_payload.py &&",
          "  less inspect_payload.py",
        ]} />
        <p>Press <kbd>q</kbd> to leave the listing. Run the matching command from that same directory.</p>
        <p>The companion <code>--inspect</code> mapping currently supports Vault v0.5.0 through v0.8.0. For Vault {vaultBuild.tag}, use the signed source archive and the <a href={vaultBuild.proofUrl}>published file-level validation records</a>; do not treat an older mapping as a check of the current ISO.</p>
        <Commands title="Historical Vault v0.8.0 source-to-ISO check" lines={[
          'python3 check_release.py vault v0.8.0 --inspect --iso "$HOME/Downloads/bitcoin-core-vault-v0.8.0-amd64.iso"',
        ]} />
        <p>The historical Vault v0.8.0 check compares 162 installed project files and confirms that the old desktop session and its launcher are absent. For Node {nodeBuild.tag}, use the <a href={nodeBuild.acceptanceUrl}>published validation records</a> and their stated scope. The archived RC3 verifier’s 247-file mapping belongs to RC3. To compare just the current chain-backup module, install <code>xorriso</code> and <code>squashfs-tools</code>, prepare the current source folder as above and run this block from its parent directory. It checks the full ISO fingerprint first; this one-file comparison is not a whole-image validation.</p>
        <Commands title="Compare the current Node chain-backup module" lines={[
          "(",
          "  set -eu",
          '  iso="$HOME/Downloads/' + nodeBuild.isoName + '"',
          "  printf '%s  %s\\n' " + nodeBuild.sha256 + ' "$iso" | sha256sum --check',
          '  work=$(mktemp -d "$HOME/inspect-node.XXXXXX")',
          '  xorriso -osirrox on -indev "$iso" -extract /live/filesystem.squashfs "$work/payload.squashfs"',
          '  unsquashfs -cat "$work/payload.squashfs" usr/lib/bitcoin-core-node/chain_backup.py > "$work/from-iso.py"',
          '  cmp node-inspection/app/chain_backup.py "$work/from-iso.py"',
          '  echo "MATCH: Node chain_backup.py"',
          ")",
        ]} />
        <p>These checks cover the contents of the selected paths. File permissions, other packages and behavior on a running computer need their own checks.</p>
      </details>

      <h3 id="rebuild-tutorial" className="learning-heading"><Hammer className="section-pictogram" aria-hidden="true" /><span>Build an image from source, step by step</span></h3>
      <p>
        Think of the source as a recipe and the package versions as the exact ingredients. The build
        turns them into a bootable file. If another builder follows the same recipe with the specified inputs and gets exactly the same bytes,
        the build is <strong>reproducible</strong>. That connects the instructions you reviewed to the file you will boot.
      </p>
      <VerificationIllustration file="two-builds-one-comparison"
        alt="Two separate presses produce prints from the same layout. On a light box, the shapes on the two sheets line up."
        caption="The two prints line up on the light box. For two ISO files, the equivalent check is a byte-for-byte comparison." />
      <div className="verification-targets">
        <p><strong>Vault {vaultBuild.tag}</strong>The current download has signed checksums, published source and <a href={vaultBuild.proofUrl}>local build and validation records</a>. A byte-identical independent rebuild has not yet been demonstrated. Follow the <a href={vaultBuild.instructionsUrl}>current instructions and documented limits</a>; older Vault rebuild results belong to their original releases.</p>
        <p><strong>Node {nodeBuild.tag}</strong>The current download has a matching source archive and <a href={nodeBuild.proofUrl}>recorded build provenance</a>. An independent byte-identical rebuild has not yet been demonstrated. {nodeBuild.signatureStatus === "pending" && "Its PGP signature is also pending."} Read the <a href={nodeBuild.instructionsUrl}>current release instructions and limits</a>.</p>
        <p><strong>Historical Node {nodeRc3Build.tag}</strong>The <a href={nodeRc3Build.proofUrl}>RC3 comparison job</a> matched two complete builds. Those results and the <a href={nodeRc3Build.releaseUrl}>signed RC3 files</a> remain evidence for that older ISO. The archived rebuild walkthrough below is pinned to RC3.</p>
      </div>
      <CurrentIsoComparison product="Vault" />
      <CurrentIsoComparison product="Node" />
      <p>
        <strong>Historical RC3 build environment.</strong> To repeat the archived Node build,
        use a fresh Debian 13 amd64 virtual machine with internet access, 4 CPU cores, 8 GB of RAM
        and at least 50 GB of free disk. Open Bash in that VM. Docker mounts filesystems during the build.
      </p>
      <Commands title="Prepare the build VM" lines={[
        "sudo apt update && sudo apt install ca-certificates curl docker.io docker-cli git gnupg patch xz-utils",
        "sudo systemctl start docker",
        "sudo docker version",
      ]} />
      <p>When Docker shows a <strong>Server</strong> section, follow the historical Node RC3 walkthrough below.</p>
      <HistoricalNodeRebuild />
      <h3 id="verification-results" className="learning-heading"><CircleCheckBig className="section-pictogram" aria-hidden="true" /><span>Read the result</span></h3>
      <p>
        Two <strong>OK</strong> lines followed by <strong>MATCH</strong> mean your build and the published
        image are identical, down to the last byte. This example from an earlier Node release shows the output from two builders. Running the recipe on infrastructure you control provides a separate check. Assessing what the software does also requires reading the code and testing its behavior.
      </p>
      <VerificationShot file="node-ci-comparison" width={906} height={348}
        alt="The Node GitHub comparison log shows identical SHA-256 values for both build outputs and a final MATCH."
        caption="Historical example from an earlier Node release. Each ISO has the same hash, and MATCH confirms that the full files are identical." />
      <a href={nodeRc3Build.proofUrl}>Open the historical RC3 build record</a>
      <p>
        If they differ, keep both files, the full commit ID, the expected and actual hashes and the build log.
        These let another builder investigate the same result. The{" "}
        <a href={verificationDocs + "#5-compare-the-finished-images-and-report-the-result"}>comparison guide</a>{" "}
        shows how to locate the difference and share your findings.
      </p>
      <p><a href={verificationDocs}>Extended walkthrough with source diffs, upstream inputs and checks inside the ISO</a></p>
    </section>
  )
}
