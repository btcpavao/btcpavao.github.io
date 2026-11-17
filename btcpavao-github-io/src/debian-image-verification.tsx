import { Braces, CircleCheckBig, Disc3, Fingerprint, GitCompareArrows, Hammer, List, LockKeyhole, Network, PackageOpen, ScanLine, ShieldCheck } from "lucide-react"
import { DEBIAN_IMAGES_PATH } from "./components/debian-images-notice"
import { verifierRevision } from "./components/signed-download-check"
import { VerificationCommands as Commands } from "./components/verification-commands"
import { UpstreamComparison } from "./components/upstream-comparison"
import { ZoomableImage } from "./components/zoomable-image"

const verificationDocs = "https://github.com/btcpavao/btcpavao.github.io/blob/main/docs/debian-images/README.md"
const vaultRepo = "https://github.com/btcpavao/bitcoin-core-vault-releases"
const nodeRepo = "https://github.com/btcpavao/bitcoin-core-node-releases"

const nodeSnapshot = "669e90f9768975924ae443225f23f78cb4a28ecf"
const nodeTree = nodeRepo + "/tree/" + nodeSnapshot + "/source"
const nodeSource = nodeRepo + "/blob/" + nodeSnapshot + "/source"

const builds = {
  Vault: {
    repo: vaultRepo,
    tag: "v0.7.0",
    revision: "5346a0db977049a028429482ff943619c52009c4",
    digest: "1e1782d6dc1354585cf6ec941ed7d231f0e48adfc0cee3972af1eaf3483424bb",
    download: "bitcoin-core-vault-v0.7.0-amd64.iso",
    inventory: "image-packages.tsv",
    result: "../vault-result/bitcoin-core-vault-amd64.iso",
    build: "bash tools/rebuild/build.sh --sudo-docker ../vault-result",
    compareJob: "43864705133",
  },
  Node: {
    repo: nodeRepo,
    tag: "rebuild-e6519d7e5e95",
    revision: "e6519d7e5e956aa62512294389a9db2cd0a60a96",
    digest: "8efaf0fb4f05a7a59554855575e24e178f07a3629cea5c9b9bbe6e5f498691b6",
    download: "bitcoin-core-node-rebuild-e6519d7e5e95-core32.1-amd64.iso",
    inventory: "filesystem.packages",
    result: "../node-result/bitcoin-core-node-candidate-amd64.iso",
    build: "sudo bash rebuild/node build ../node-result",
    compareJob: "43019152211/job/130527546091",
  },
}

type Product = keyof typeof builds

const vaultExport = vaultRepo + "/blob/" + builds.Vault.revision + "/config/includes.chroot/usr/lib/core-vault/public_export.py"

function BuildLinks({ product }: { product: Product }) {
  const { repo, tag, revision, inventory, compareJob } = builds[product]
  const signedTag = product === "Node" ? "v0.1.0-rc.2" : tag
  const files = repo + "/releases/download/" + signedTag + "/"
  return (
    <nav className="build-evidence-links" aria-label={product + " release evidence"}>
      <a href={product === "Node" ? nodeTree : repo + "/tree/" + revision}><Braces size={15} aria-hidden="true" />Browse release code</a>
      <a href={files + inventory}><List size={15} aria-hidden="true" />Installed packages</a>
      <a href={repo + "/releases/tag/" + signedTag}><Disc3 size={15} aria-hidden="true" />Signed release files</a>
      <a href={repo + "/actions/runs/" + compareJob}><GitCompareArrows size={15} aria-hidden="true" />{product === "Vault" ? "Vault rebuild log" : "Separate candidate rebuild log"}</a>
    </nav>
  )
}

function SourceFolder({ product }: { product: Product }) {
  const role = product.toLowerCase()
  const tag = product === "Vault" ? builds.Vault.tag : "v0.1.0-rc.2"
  const folder = role + "-" + tag + "-review"
  const archive = "release-checks/" + role + "/" + tag + "/bitcoin-core-" + role + "-" + tag + "-source.tar.gz"
  return (
    <Commands title={"Open the signed " + product + " source"} lines={[
      'cd "$HOME/iso-review" &&',
      "  python3 check_release.py " + role + " " + tag + " &&",
      "  mkdir " + folder + " &&",
      "  tar -xzf " + archive + " --strip-components=1 -C " + folder,
    ]} />
  )
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

function RebuildSteps({ product }: { product: Product }) {
  const { repo, tag, revision, build, result, download, digest } = builds[product]
  const folder = product === "Vault" ? "vault-release" : "node-candidate"
  const readAs = product === "Node" ? "sudo " : ""
  return (
    <details className="build-instructions">
      <summary>Rebuild and compare {product}</summary>
      <ol>
        <li>
          <strong>Get the exact source.</strong> In the VM, open a terminal in a fresh folder. The last
          command prints the full commit ID. Continue when it matches <code>{revision}</code>.
          <Commands title={product + " source revision"} lines={[
            "git clone --depth 1 --branch " + tag + " " + repo + ".git " + folder,
            "cd " + folder,
            "git rev-parse HEAD",
          ]} />
          {product === "Node" && <VerificationShot file="node-source-revision" width={1114} height={223}
            alt="A checkout of the Node candidate prints the full Git commit beginning with e6519d7e5e95."
            caption="The final line identifies the Node source revision. Compare the entire value before building." />}
        </li>
        <li>
          <strong>Review what the project changes.</strong>{" "}
          {product === "Vault" ? <>
            Open the <a href={vaultRepo + "/compare/v0.6.0..." + revision}>changes since Vault v0.6.0</a> and
            the <a href={vaultRepo + "/tree/" + revision + "/tools/rebuild/packages/sources"}>patched package sources</a>.
            For example, inspect how Vault checks a watch-only wallet or signed PSBT before writing it to a transfer drive.
            The release includes the corresponding Calamares and Thunar sources.
          </> : <>
            Open the <a href={nodeRepo + "/blob/" + revision + "/rebuild/node.patch"}>patch applied to the signed RC2 source</a>.
            Extract the resulting files with the command below. Open <code>../node-inspection/app/chain_backup.py</code> to see how the Node copies blockchain data.
            <Commands title="Inspect the Node source" lines={["bash rebuild/node source ../node-inspection"]} />
          </>}
        </li>
        <li>
          <strong>Build the ISO.</strong> Stay in the same terminal and directory. The command needs
          a new result folder and may take hours. Docker provides the specified build environment. Continue after it finishes successfully.
          <Commands title={"Build the " + product + " ISO"} lines={['test "$(git rev-parse HEAD)" = ' + revision + " &&", "  " + build]} />
        </li>
        <li>
          <strong>Compare your ISO with the published image.</strong> Run this block from the same
          directory. It downloads the published file, checks both SHA-256 values, then compares every byte.
          <Commands title={"Compare the " + product + " ISOs"} lines={[
            "(",
            "  set -euo pipefail",
            "  base=" + repo + "/releases/download/" + tag,
            "  image=" + download,
            "  built=" + result,
            "  expected=" + digest,
            '  curl --fail --location --retry 3 -o "../$image" "$base/$image"',
            "  printf '%s  %s\\n' \"$expected\" \"$built\" \"$expected\" \"../$image\" | " + readAs + "sha256sum --check",
            '  ' + readAs + 'cmp -- "$built" "../$image"',
            '  echo "MATCH: your ' + product + ' ISO and the published image are identical."',
            ")",
          ]} />
        </li>
      </ol>
      <p><a href={repo + "/blob/" + revision + (product === "Vault" ? "/docs/NATIVE-REBUILD.md" : "/docs/REBUILD.md")}>Full {product} build guide and troubleshooting</a></p>
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
        <a href="#signed-manifest"><Fingerprint aria-hidden="true" /><strong>Did I get Pavao’s file?</strong><span>Verify the signed download</span></a>
        <a href="#upstream-programs"><PackageOpen aria-hidden="true" /><strong>Are the programs genuine?</strong><span>Compare with their publishers</span></a>
        <a href="#review-project-code"><Braces aria-hidden="true" /><strong>What did Pavao change?</strong><span>Trace an action in the code</span></a>
        <a href="#rebuild-tutorial"><GitCompareArrows aria-hidden="true" /><strong>Can I make the same ISO?</strong><span>Build it and compare every byte</span></a>
      </nav>
      <p>
        <strong>If you are about to write a USB stick, start with the signed download.</strong> If you
        are deciding whether to trust the software with a wallet, go further. Even a perfect copy
        can reproduce a programming mistake. Reading how the system handles a wallet and testing that
        behaviour with an empty practice wallet answer questions a file comparison leaves open.
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
          come as <strong>packages</strong> (bundles of program files). Debian signs its catalogue.
          Its package manager, APT, checks the catalogue’s signature, then follows its checksums down to
          the individual package. For example, the <code>gpg</code> program inside both signed ISOs
          matched Debian’s package <code>2.4.7-21+deb13u1+b5</code> byte for byte in our check.
          A package inventory lists the versions installed.{" "}
          <a href="https://www.debian.org/doc/manuals/debian-handbook/sect.package-authentication.en.html">How Debian authenticates packages</a>{" · "}
          <a href={vaultRepo + "/blob/" + builds.Vault.revision + "/tools/rebuild/inside.sh#L11-L45"}>How Vault checks the Debian snapshot</a></dd></div>
        <div><dt>Bitcoin Core 32.1</dt><dd>Both images include the graphical wallet (<code>bitcoin-qt</code>)
          and its command-line companion (<code>bitcoin-cli</code>). Bitcoin Core publishes a signed list of
          hashes for its downloads. Authenticate its Linux archive, unpack the two programs and compare them
          with the copies inside your chosen ISO. A byte match is stronger evidence than a version number
          in an About window.{" "}
          <a href="https://bitcoincore.org/bin/bitcoin-core-32.1/">Official 32.1 files</a>{" · "}
          <a href={vaultRepo + "/blob/" + builds.Vault.revision + "/provenance/32.1/verification.json"}>Recorded archive and executable hashes</a></dd></div>
        <div><dt>KeePassXC 2.8.0</dt><dd>This password and passphrase tool comes in an <strong>AppImage</strong>,
          a single downloadable bundle. KeePassXC signs that bundle with its own release key. The images install
          the extracted application and give it project-specific launchers or settings. Compare the executable
          inside the authenticated bundle with the executable inside the ISO.{" "}
          <a href="https://keepassxc.org/verifying-signatures/">KeePassXC’s signature instructions</a>{" · "}
          <a href={vaultRepo + "/blob/" + builds.Vault.revision + "/tools/core-vault/manifests/keepassxc-release.json"}>Pinned version, key and hash</a></dd></div>
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
        <a href={vaultRepo + "/tree/" + builds.Vault.revision + "/tools/rebuild/packages/sources"}>Installer and file-manager sources</a>
      </p>
      <BuildLinks product="Vault" />
      <h3 className="learning-heading"><Network className="section-pictogram" aria-hidden="true" /><span>What Node adds to the online computer</span></h3>
      <p>
        Node adds a dashboard, network and storage settings, blockchain backup and restore, and its
        watch-only wallet workflow. The signed RC2 includes project changes to Calamares and the login
        screen, plus Debian’s Thunar package. The inventory also lists device firmware, small programs
        for hardware. Some vendors distribute firmware only in compiled form, which limits source review.
        Use the <strong>signed RC2 source archive</strong> for the Node from the main download button.
        GitHub’s automatic ZIP for that tag contains the release repository.{" "}
        <a href={nodeSource + "/app/chain_backup.py"}>Blockchain backup code</a>{" · "}
        <a href={nodeSource + "/installer/greeter/patch_greeter.py"}>Login-screen changes</a>
      </p>
      <BuildLinks product="Node" />

      <h3 id="signed-manifest" className="learning-heading"><ShieldCheck className="section-pictogram" aria-hidden="true" /><span>Did I receive Pavao’s file?</span></h3>
      <p>To check your own ISO, follow the commands for <a href={DEBIAN_IMAGES_PATH + "#verify-vault-download"}>Vault v0.7.0</a> or <a href={DEBIAN_IMAGES_PATH + "#verify-node-download"}>Node v0.1.0-rc.2</a>.</p>
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
        to open the authenticated source folder in your coding assistant.
      </p>
      <ol>
        <li>
          <strong>Give the AI the exact edition.</strong> Choose{" "}
          <a href={vaultRepo + "/tree/" + builds.Vault.revision}>the Vault v0.7.0 source</a> or{" "}
          <a href={nodeTree}>the signed Node RC2 source snapshot</a>.
          Start with the full release. A <a href={vaultRepo + "/compare/v0.6.0..." + builds.Vault.revision}>diff between two Vault versions</a> can then show individual edits, including an added line marked <code>+</code> or a removed line marked <code>−</code>. If your assistant cannot open the link, give it the relevant public files from the verified archive.
          Keep wallet files, private descriptors, passphrases and signing keys out of the conversation.
          <details className="build-instructions">
            <summary>Get the signed source folder for my assistant</summary>
            <p>Set up the verifier and independently confirm the signing-key fingerprint using the first two instructions for <a href={DEBIAN_IMAGES_PATH + "#verify-vault-download"}>Vault</a> or <a href={DEBIAN_IMAGES_PATH + "#verify-node-download"}>Node</a> on Debian 13.
              The block below returns to <code>~/iso-review</code>, where you saved <code>check_release.py</code>. It downloads the signed source, checks the signature and archive, then unpacks it into a new folder. You can inspect the public source before downloading the ISO.
              Open that folder in your assistant in read-only mode. A Node rebuild candidate has a separate recipe.</p>
            <SourceFolder product="Vault" />
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
              "Use the public Vault v0.7.0 source at " + vaultRepo + "/tree/" + builds.Vault.revision + ". Read the code without executing it.",
              "I click File → Export watch-only wallet and choose a USB drive. Follow the action from Bitcoin Core to Vault’s export helper. Start with export_view.py and public_export.py. Which code belongs to Core, and which to Vault? What is held in RAM, what is checked, what reaches the drive, and what happens if a check fails?",
              "Explain each step in everyday language. For each claim give the exact file, function and line link for this revision, or file and line numbers if working locally. Identify anything you could not verify. Suggest one test using an empty practice wallet.",
            ]} />
          </div>
          <Commands kind="prompt" title="Node · trace a blockchain backup" lines={[
            "Read the published Node v0.1.0-rc.2 source at " + nodeTree + " without executing it. I choose Backup Chainstate and select a USB drive.",
            "Start with app/chain_backup.py. Find the list of folders it copies and the code that uses that list. Are wallet files among the selected folders? What happens to Bitcoin Core during the copy, and what happens if the drive fills up?",
            "Trace called functions as needed. Explain each conclusion in plain English and cite the exact file, function and line link for this version, or local line numbers. Distinguish observed code from assumptions. Suggest one check with disposable data.",
          ]} />
        </li>
        <li>
          <strong>Open a citation yourself.</strong> In Vault, the{" "}
          <a href={vaultExport + "#L76-L96"}>watch-only checks</a> read the wallet flags and ask Core whether a descriptor
          contains private keys. Follow the call from{" "}
          <a href={vaultExport + "#L133-L145"}>the function that publishes the file</a>.
          In Node, compare the <a href={nodeSource + "/app/chain_backup.py#L28"}>folder list</a> with the{" "}
          <a href={nodeSource + "/app/chain_backup.py#L220-L240"}>loop that reads those folders</a>.
          If an answer cites only a comment or a README, ask for the code that enforces the behaviour.
          An AI can overlook another code path. Treat an unsupported claim as an open question.
        </li>
      </ol>
      <details className="build-instructions" id="compare-source-files">
        <summary>Check that the project files I just read are inside my ISO</summary>
        <p>In Terminal, return to <code>~/iso-review</code>. First run the source-download step above for your image.
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
        <Commands title="Compare Vault’s project files" lines={[
          'python3 check_release.py vault v0.7.0 --inspect --iso "$HOME/Downloads/bitcoin-core-vault-v0.7.0-amd64.iso"',
        ]} />
        <Commands title="Compare Node RC2’s project files" lines={[
          'python3 check_release.py node v0.1.0-rc.2 --inspect --iso "$HOME/Downloads/bitcoin-core-node-v0.1.0-rc.2-core32.1-amd64.iso"',
        ]} />
        <p>For these releases, look for <strong>MATCH</strong> and <strong>164 regular project files</strong>
          {" "}for Vault or <strong>227</strong> for Node. These counts cover the files the helper maps from
          the source archive into the installed system. The comparison checks their contents. File permissions,
          other packages and behaviour on a running computer need their own checks.</p>
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
        <p><strong>Vault v0.7.0</strong>Compare your build directly with the signed Vault ISO from the main
          download button. The tagged build fixes the Debian snapshot, compiler environment and package
          inputs. <a href={vaultRepo + "/actions/runs/" + builds.Vault.compareJob}>Two GitHub builds matched the published ISO.</a></p>
        <p><strong>Node v0.1.0-rc.2</strong>The signed Node download was made using an earlier image and
          changing Debian repositories. You can verify its signature, inspect its files and read its source.
          For a byte-for-byte rebuild, use the <a href={nodeRepo + "/releases/tag/" + builds.Node.tag}>separate unsigned Node comparison image</a>.
          The match applies only to that candidate.</p>
      </div>
      <details className="build-instructions">
        <summary>Already downloaded the comparison image? Check its SHA-256 first</summary>
        <p>Open a terminal in the download folder and run the line for your ISO.
          An <strong>OK</strong> result confirms that the file has the published hash for that image.
          To check that the source produces those bytes, continue with the build below.</p>
        <Commands title="Check the Vault v0.7.0 hash" lines={[
          "echo '" + builds.Vault.digest + "  " + builds.Vault.download + "' | sha256sum --check -",
        ]} />
        <Commands title="Check the Node candidate hash" lines={[
          "echo '" + builds.Node.digest + "  " + builds.Node.download + "' | sha256sum --check -",
        ]} />
        <VerificationShot file="vault-v060-checksum" width={1256} height={178}
          alt="The checksum command prints OK next to bitcoin-core-vault-v0.6.0-amd64.iso."
          caption="This earlier Vault v0.6.0 example shows a matching SHA-256. The separate signature check authenticates that checksum." />
      </details>
      <p>
        <strong>Prepare a clean build computer.</strong> Use a fresh Debian 13 amd64 virtual machine
        with internet access, 4 CPU cores, 8 GB of RAM and at least 50 GB of free disk for one build.
        Open Bash, the VM’s command terminal, and run the commands below. Docker runs the build with permission to mount
        filesystems, so keep wallets, signing keys and personal files outside this VM.
      </p>
      <Commands title="Prepare the build VM" lines={[
        "sudo apt update && sudo apt install ca-certificates curl docker.io docker-cli git gnupg patch xz-utils",
        "sudo systemctl start docker",
        "sudo docker version",
      ]} />
      <p>When Docker shows a <strong>Server</strong> section, open the instructions for your image.</p>
      <RebuildSteps product="Vault" />
      <RebuildSteps product="Node" />
      <h3 id="verification-results" className="learning-heading"><CircleCheckBig className="section-pictogram" aria-hidden="true" /><span>Read the result</span></h3>
      <p>
        Two <strong>OK</strong> lines followed by <strong>MATCH</strong> mean your build and the published
        image are identical, down to the last byte. The Node comparison log below shows the output from two builders. Running the recipe on infrastructure you control provides a separate check. Assessing what the software does also requires reading the code and testing its behaviour.
      </p>
      <VerificationShot file="node-ci-comparison" width={906} height={348}
        alt="The Node GitHub comparison log shows identical SHA-256 values for both build outputs and a final MATCH."
        caption="The recorded GitHub job compared the two Node builds. Each ISO has the same hash, and MATCH confirms that the full files are identical." />
      <a href={nodeRepo + "/actions/runs/" + builds.Node.compareJob}>Open the original Node comparison log</a>
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
