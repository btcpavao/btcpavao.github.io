import { Braces, CircleCheckBig, Disc3, GitCompareArrows, Hammer, List, LockKeyhole, Network, ScanLine, ShieldCheck } from "lucide-react"
import { VerificationCommands as Commands } from "./components/verification-commands"
import { ZoomableImage } from "./components/zoomable-image"

const verificationDocs = "https://github.com/btcpavao/btcpavao.github.io/blob/main/docs/debian-images/README.md"
const verifierRevision = "ca902118164172effbf6a232c5d7fef29a73863c"
const verifierPath = verifierRevision + "/docs/debian-images/check_release.py"
const vaultRepo = "https://github.com/btcpavao/bitcoin-core-vault-releases"
const nodeRepo = "https://github.com/btcpavao/bitcoin-core-node-releases"

const builds = {
  Vault: {
    repo: vaultRepo,
    tag: "v0.6.0",
    revision: "26e590741c968316b99416c51a53b9720d8134cb",
    digest: "d1e3656099875e6cde7ed6c78fcf9ee3217d8bed4f8ccd5500b4231ad6bfa8ba",
    download: "bitcoin-core-vault-v0.6.0-amd64.iso",
    inventory: "image-packages.tsv",
    result: "../vault-result/bitcoin-core-vault-amd64.iso",
    build: "bash tools/rebuild/build.sh --sudo-docker ../vault-result",
    compareJob: "43397223031",
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

function BuildLinks({ product }: { product: Product }) {
  const { repo, tag, revision, inventory, compareJob } = builds[product]
  return (
    <nav className="build-evidence-links" aria-label={product + " build evidence"}>
      <a href={repo + "/tree/" + revision}><Braces size={15} aria-hidden="true" />Exact source</a>
      <a href={repo + "/releases/download/" + tag + "/" + inventory}><List size={15} aria-hidden="true" />Installed packages</a>
      <a href={repo + "/releases/tag/" + tag}><Disc3 size={15} aria-hidden="true" />ISO and release files</a>
      <a href={repo + "/actions/runs/" + compareJob}><GitCompareArrows size={15} aria-hidden="true" />Byte comparison log</a>
    </nav>
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
            Open the <a href={vaultRepo + "/compare/v0.5.0..." + revision}>changes since Vault v0.5.0</a> and
            the <a href={vaultRepo + "/tree/" + revision + "/tools/rebuild/packages/sources"}>patched package sources</a>.
            For example, follow the wallet backup code that takes a snapshot before encrypting it.
            The release includes the corresponding Calamares and Thunar sources.
          </> : <>
            Open the <a href={nodeRepo + "/blob/" + revision + "/rebuild/node.patch"}>patch applied to the signed RC2 source</a>.
            Extract the resulting files with the command below. Open <code>../node-inspection/app/chain_backup.py</code> to see how the Node copies blockchain data.
            <Commands title="Inspect the Node source" lines={["bash rebuild/node source ../node-inspection"]} />
          </>}
        </li>
        <li>
          <strong>Build the ISO.</strong> Stay in the same terminal and directory. The command needs
          a new result folder and may take hours. Continue after it finishes successfully.
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
        An ISO is the file you write to a USB drive. If you used a download button above,
        <a href="#verify-download"> check the signed download</a> before writing it.
        To see whether the public source produces the published bytes,
        <a href="#rebuild-tutorial"> rebuild Vault v0.6.0 or the Node candidate</a>. You can do both checks
        on a separate computer, without a USB stick or a wallet.
      </p>
      <p>
        Both build recipes use Debian 13 for 64-bit Intel and AMD computers, the unmodified
        Bitcoin Core 32.1 binaries and KeePassXC. The recipes pin the Debian package snapshot
        and check the upstream downloads. The installed package lists below show what goes
        into the operating system. The exact source links show the project’s own code and settings.
      </p>
      <h3 className="learning-heading"><LockKeyhole className="section-pictogram" aria-hidden="true" /><span>Vault · offline wallet and signing</span></h3>
      <p>
        The private session runs in RAM. Bitcoin Core creates wallets and signs transactions.
        Vault Backup uses GnuPG to protect wallet backups. The build compiles Vault Backup,
        the project’s version of the Thunar file manager and its Calamares installer from source.
      </p>
      <BuildLinks product="Vault" />
      <p>For the Vault release, open the{" "}
        <a href={vaultRepo + "/releases/download/" + builds.Vault.tag + "/SHA256SUMS"}>checksum list</a>, its{" "}
        <a href={vaultRepo + "/releases/download/" + builds.Vault.tag + "/SHA256SUMS.asc"}>detached signature</a> or the{" "}
        <a href={vaultRepo + "/releases/download/" + builds.Vault.tag + "/bitcoin-core-vault-v0.6.0-source.tar.gz"}>release source archive</a>.
      </p>
      <h3 className="learning-heading"><Network className="section-pictogram" aria-hidden="true" /><span>Node · online verification and broadcasting</span></h3>
      <p>
        The installed Node keeps the blockchain and watch-only wallet across restarts. It prepares
        transactions for Vault to sign, then broadcasts them. Its build applies a public patch to
        the signed RC2 sources and compiles the installer and login screen. The package list also
        identifies upstream device firmware, some of which vendors supply only as binaries.
      </p>
      <BuildLinks product="Node" />
      <p className="build-upstream">For the upstream inputs, follow{" "}
        <a href="https://manpages.debian.org/trixie/apt/apt-secure.8.en.html">Debian’s package verification</a>,
        the <a href="https://bitcoincore.org/en/download/">Bitcoin Core verification instructions</a> and
        the <a href="https://keepassxc.org/verifying-signatures/">KeePassXC signature guide</a>.
      </p>

      <h3 id="verify-download" className="learning-heading"><ShieldCheck className="section-pictogram" aria-hidden="true" /><span>Check a signed download</span></h3>
      <p>
        Use this for <a href={vaultRepo + "/releases/tag/v0.6.0"}>Vault v0.6.0</a> or{" "}
        <a href={nodeRepo + "/releases/tag/v0.1.0-rc.2"}>Node v0.1.0-rc.2</a>.
        The publisher signs a list of filenames and their SHA-256 fingerprints. Checking the signature
        tells you who signed the list. Checking your ISO against its entry tells you whether the
        downloaded bytes match.
      </p>
      <ol>
        <li>
          <strong>Get the verifier.</strong> Save the ISO in your Downloads folder. On Debian 13,
          open a terminal in a new folder. These commands install the tools and fetch the{" "}
          <a href={"https://github.com/btcpavao/btcpavao.github.io/blob/" + verifierPath}>readable verification script</a>.
          Use <strong>Copy</strong> to copy the block, then paste it into Terminal with
          {" "}<kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>V</kbd>. Press <kbd>Enter</kbd> to run it.
          The last command opens the script for inspection. Press <kbd>q</kbd> to return.
          <Commands title="Get and inspect the verifier" lines={[
            "sudo apt update && sudo apt install ca-certificates curl gnupg less python3",
            "curl --fail --location --output check_release.py https://raw.githubusercontent.com/btcpavao/btcpavao.github.io/" + verifierPath,
            "less check_release.py",
          ]} />
        </li>
        <li>
          <strong>Confirm the signing key.</strong> Display the publisher’s public key, then compare
          all 40 characters of its fingerprint with Pavao through a channel you already trust.
          <Commands title="Display the signing-key fingerprint" lines={[
            "curl --fail --location --output btcpavao-pgp.asc " + vaultRepo + "/releases/download/v0.6.0/btcpavao-pgp.asc",
            "gpg --show-keys --with-fingerprint btcpavao-pgp.asc",
          ]} />
          <code className="debian-signing-fingerprint">787A 2AAF B0D1 19CA 0522 B2A5 B9C9 9AF8 5788 96D0</code>
          <VerificationShot file="signer-fingerprint" width={1192} height={198}
            alt="GnuPG displays the btcpavao public key and its full fingerprint ending in 5788 96D0."
            caption="Read the fingerprint on the line directly below the public key." />
        </li>
        <li>
          <strong>Run the line for your download.</strong> Adjust the path if you saved the ISO elsewhere.
          The script fetches the signed manifest and public key, verifies the signature in a temporary
          keyring and computes the SHA-256 of your file.
          <Commands title="Verify Vault v0.6.0" lines={[
            'python3 check_release.py vault v0.6.0 --iso "$HOME/Downloads/bitcoin-core-vault-v0.6.0-amd64.iso"',
          ]} />
          <Commands title="Verify Node v0.1.0-rc.2" lines={[
            'python3 check_release.py node v0.1.0-rc.2 --iso "$HOME/Downloads/bitcoin-core-node-v0.1.0-rc.2-core32.1-amd64.iso"',
          ]} />
          Look for <strong>OK</strong> next to the computed hash and your ISO’s filename.
          If verification stops, check the version, filename and fingerprint before flashing.
          <VerificationShot file="vault-signed" width={1192} height={448}
            alt="The Vault v0.5.0 verification shows the asserted signer and an OK line for the downloaded ISO."
            caption="This example was recorded for Vault v0.5.0. For v0.6.0, look for the asserted signer and an OK line naming bitcoin-core-vault-v0.6.0-amd64.iso." />
          <p>GnuPG may also say the key is uncertified. The verifier uses a temporary keyring.
            Confirm the fingerprint independently in the previous step to establish whose key it is.</p>
          <details className="build-instructions">
            <summary>See a successful Node check and a rejected file</summary>
            <VerificationShot file="node-signed" width={1192} height={448}
              alt="The signed Node v0.1.0-rc.2 ISO matches its checksum and the verifier prints OK."
              caption="The same check on Node v0.1.0-rc.2 ends with OK and the Node ISO filename." />
            <VerificationShot file="rejected-file" width={1192} height={448}
              alt="A deliberately wrong file makes the verifier stop and print different expected and computed SHA-256 values."
              caption="Here the signed list is valid, but the selected file is wrong. Verification stops and displays both hashes. Check the file before writing it to USB." />
          </details>
        </li>
      </ol>

      <h3 id="rebuild-tutorial" className="learning-heading"><Hammer className="section-pictogram" aria-hidden="true" /><span>Build an image from source, step by step</span></h3>
      <p>
        The Vault recipe targets the signed v0.6.0 ISO from the main download button. You can verify its signature above,
        rebuild it and compare both files byte for byte. The Node recipe targets a separate unsigned comparison image.
        Use the Node candidate link below when comparing a Node build. The main Node button serves signed RC2.
      </p>
      <details className="build-instructions">
        <summary>Already downloaded the comparison image? Check its SHA-256 first</summary>
        <p>Open a terminal in the download folder and run the line for your ISO.
          An <strong>OK</strong> result confirms that the file has the published hash for that image.
          To check that the source produces those bytes, continue with the build below.</p>
        <Commands title="Check the Vault v0.6.0 hash" lines={[
          "echo '" + builds.Vault.digest + "  " + builds.Vault.download + "' | sha256sum --check -",
        ]} />
        <Commands title="Check the Node candidate hash" lines={[
          "echo '" + builds.Node.digest + "  " + builds.Node.download + "' | sha256sum --check -",
        ]} />
        <VerificationShot file="vault-v060-checksum" width={1256} height={178}
          alt="The checksum command prints OK next to bitcoin-core-vault-v0.6.0-amd64.iso."
          caption="The Vault v0.6.0 ISO matches the expected SHA-256. The separate signature check authenticates that checksum." />
      </details>
      <p>
        <strong>Prepare a clean build computer.</strong> Use a fresh Debian 13 amd64 virtual machine
        with internet access, 4 CPU cores, 8 GB of RAM and at least 50 GB of free disk for one build.
        Open Bash in the VM and run the commands below. Docker runs the build with permission to mount
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
        image are identical, down to the last byte. The linked GitHub Actions runs show the comparison between
        builders. Running the recipe on infrastructure you control provides a separate check. Assessing what the software does also requires reading the code and testing its behaviour.
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
      <details className="build-instructions">
        <summary>Follow the guide with an LLM</summary>
        <p>Give the assistant this page and the public release link. Try this prompt.</p>
        <blockquote>“I’m checking the Vault or Node ISO on Debian 13. First help me identify my version.
          Walk me through one command at a time. Explain what it reads or changes, what success looks
          like, and wait for my output before continuing. If a check fails, help me identify which
          file or hash differs.”</blockquote>
        <p>Share public code, build logs and checksums. Keep wallet files, private descriptors,
          signing keys and passphrases private.</p>
      </details>
      <p><a href={verificationDocs}>Extended walkthrough with source diffs, upstream inputs and checks inside the ISO</a></p>
    </section>
  )
}
