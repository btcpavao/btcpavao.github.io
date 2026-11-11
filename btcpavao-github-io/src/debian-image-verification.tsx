const verificationDocs = "https://github.com/btcpavao/btcpavao.github.io/blob/main/docs/debian-images/README.md"
const verifierRevision = "9b5b56fc33342724578a3ec6b8814acd4f66a634"
const verifierPath = verifierRevision + "/docs/debian-images/check_release.py"
const vaultRepo = "https://github.com/btcpavao/bitcoin-core-vault-releases"
const nodeRepo = "https://github.com/btcpavao/bitcoin-core-node-releases"

const candidates = {
  Vault: {
    repo: vaultRepo,
    tag: "native-rebuild-candidate-71242344618b",
    revision: "71242344618ba499278ea2abe49d7343a7f9a1c4",
    digest: "2b8f8fd5225b4b2ccee1d8ccc6847c647cb6f5d2481fa2d9ef94820a13b09ddc",
    download: "bitcoin-core-vault-native-rebuild-candidate-71242344618b-amd64.iso",
    inventory: "image-packages.tsv",
    result: "../vault-result/bitcoin-core-vault-amd64.iso",
    build: "bash tools/rebuild/build.sh --sudo-docker ../vault-result",
    compareJob: "43021928913/job/130537526728",
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

type Product = keyof typeof candidates

function CandidateLinks({ product }: { product: Product }) {
  const { repo, tag, revision, inventory, compareJob } = candidates[product]
  return (
    <nav className="build-evidence-links" aria-label={product + " candidate evidence"}>
      <a href={repo + "/tree/" + revision}>Exact source</a>
      <a href={repo + "/releases/download/" + tag + "/" + inventory}>Installed packages</a>
      <a href={repo + "/releases/tag/" + tag}>ISO and release files</a>
      <a href={repo + "/actions/runs/" + compareJob}>Byte comparison log</a>
    </nav>
  )
}

function Commands({ lines }: { lines: string[] }) {
  return <pre className="build-commands"><code>{lines.join("\n")}</code></pre>
}

function RebuildSteps({ product }: { product: Product }) {
  const { repo, tag, revision, build, result, download, digest } = candidates[product]
  const folder = product.toLowerCase() + "-candidate"
  const readAs = product === "Node" ? "sudo " : ""
  return (
    <details className="build-instructions">
      <summary>Rebuild and compare {product}</summary>
      <ol>
        <li>
          <strong>Get the exact source.</strong> In the VM, open a terminal in a fresh folder. The last
          command prints the full commit ID. Continue when it matches <code>{revision}</code>.
          <Commands lines={[
            "git clone --depth 1 --branch " + tag + " " + repo + ".git " + folder,
            "cd " + folder,
            "git rev-parse HEAD",
          ]} />
        </li>
        <li>
          <strong>Review what the project changes.</strong>{" "}
          {product === "Vault" ? <>
            Read the <a href={vaultRepo + "/pull/2/files"}>image recipe changes</a> and
            the <a href={vaultRepo + "/pull/4/files"}>native package changes</a>.
            For example, follow the wallet backup code that takes a snapshot before encrypting it.
            The release includes the corresponding Calamares and Thunar sources.
          </> : <>
            Open the <a href={nodeRepo + "/blob/" + revision + "/rebuild/node.patch"}>patch applied to the signed RC2 source</a>.
            To read the resulting files, run <code>bash rebuild/node source ../node-inspection</code>.
            For example, open <code>../node-inspection/app/chain_backup.py</code> to see how the Node copies blockchain data.
          </>}
        </li>
        <li>
          <strong>Build the ISO.</strong> Stay in the same terminal and directory. The command needs
          a new result folder and may take hours. Continue after it finishes successfully.
          <Commands lines={['test "$(git rev-parse HEAD)" = ' + revision + " &&", "  " + build]} />
        </li>
        <li>
          <strong>Compare your ISO with the public candidate.</strong> Run this block from the same
          directory. It downloads the published file, checks both SHA-256 values, then compares every byte.
          <Commands lines={[
            "(",
            "  set -euo pipefail",
            "  base=" + repo + "/releases/download/" + tag,
            "  image=" + download,
            "  built=" + result,
            "  expected=" + digest,
            '  curl --fail --location --retry 3 -o "../$image" "$base/$image"',
            "  printf '%s  %s\\n' \"$expected\" \"$built\" \"$expected\" \"../$image\" | " + readAs + "sha256sum --check",
            '  ' + readAs + 'cmp -- "$built" "../$image"',
            '  echo "MATCH: your ' + product + ' ISO and the published candidate are identical."',
            ")",
          ]} />
        </li>
      </ol>
      <p><a href={repo + "/blob/main/docs/REBUILD.md"}>Full {product} build guide and troubleshooting</a></p>
    </details>
  )
}

export function DebianImageVerification() {
  return (
    <section className="debian-verification" id="verify-the-build">
      <h2>What’s in the images, and how can I check?</h2>
      <p>
        An ISO is the file you write to a USB drive. If you used a download button above,
        <a href="#verify-download"> check the signed download</a> before writing it.
        To see whether the public source produces the published bytes,
        <a href="#rebuild-tutorial"> rebuild a test candidate</a>. You can do both checks
        on a separate computer, without a USB stick or a wallet.
      </p>
      <p>
        Both candidates use Debian 13 for 64-bit Intel and AMD computers, the unmodified
        Bitcoin Core 32.1 binaries and KeePassXC. The recipes pin the Debian package snapshot
        and check the upstream downloads. The installed package lists below show what goes
        into the operating system. The exact source links show the project’s own code and settings.
      </p>
      <h3>Vault · offline wallet and signing</h3>
      <p>
        The private session runs in RAM. Bitcoin Core creates wallets and signs transactions.
        Vault Backup uses GnuPG to protect wallet backups. The build compiles Vault Backup,
        the project’s version of the Thunar file manager and its Calamares installer from source.
      </p>
      <CandidateLinks product="Vault" />
      <h3>Node · online verification and broadcasting</h3>
      <p>
        The installed Node keeps the blockchain and watch-only wallet across restarts. It prepares
        transactions for Vault to sign, then broadcasts them. Its build applies a public patch to
        the signed RC2 sources and compiles the installer and login screen. The package list also
        identifies upstream device firmware, some of which vendors supply only as binaries.
      </p>
      <CandidateLinks product="Node" />
      <p className="build-upstream">For the upstream inputs, follow{" "}
        <a href="https://manpages.debian.org/trixie/apt/apt-secure.8.en.html">Debian’s package verification</a>,
        the <a href="https://bitcoincore.org/en/download/">Bitcoin Core verification instructions</a> and
        the <a href="https://keepassxc.org/verifying-signatures/">KeePassXC signature guide</a>.
      </p>

      <h3 id="verify-download">Check a signed download</h3>
      <p>
        Use this for <a href={vaultRepo + "/releases/tag/v0.5.0"}>Vault v0.5.0</a> or{" "}
        <a href={nodeRepo + "/releases/tag/v0.1.0-rc.2"}>Node v0.1.0-rc.2</a>.
        The publisher signs a list of filenames and their SHA-256 fingerprints. Checking the signature
        tells you who signed the list. Checking your ISO against its entry tells you whether the
        downloaded bytes match.
      </p>
      <ol>
        <li>
          <strong>Confirm the key.</strong> Check the publisher’s full OpenPGP fingerprint with Pavao through
          a channel you already trust. The verification tool requires this exact signer.
          <code className="debian-signing-fingerprint">787A 2AAF B0D1 19CA 0522 B2A5 B9C9 9AF8 5788 96D0</code>
        </li>
        <li>
          <strong>Get the verifier.</strong> Save the ISO in your Downloads folder. On Debian 13,
          open a terminal in a new folder. These commands install the tools and fetch the{" "}
          <a href={"https://github.com/btcpavao/btcpavao.github.io/blob/" + verifierPath}>readable verification script</a>.
          Open it with <code>less check_release.py</code> and press <kbd>q</kbd> to leave.
          <Commands lines={[
            "sudo apt update && sudo apt install ca-certificates curl gnupg less python3",
            "curl --fail --location --output check_release.py https://raw.githubusercontent.com/btcpavao/btcpavao.github.io/" + verifierPath,
          ]} />
        </li>
        <li>
          <strong>Run the line for your download.</strong> Adjust the path if you saved the ISO elsewhere.
          The script fetches the signed manifest and public key, verifies the signature in a temporary
          keyring and computes the SHA-256 of your file.
          <Commands lines={[
            "# Vault v0.5.0",
            'python3 check_release.py vault v0.5.0 --iso "$HOME/Downloads/bitcoin-core-vault-32.1-practical-guide-20261110-amd64.iso"',
            "",
            "# Node v0.1.0-rc.2",
            'python3 check_release.py node v0.1.0-rc.2 --iso "$HOME/Downloads/bitcoin-core-node-v0.1.0-rc.2-core32.1-amd64.iso"',
          ]} />
          Look for <strong>OK</strong> next to the computed hash and your ISO’s filename.
          If verification stops, check the version, filename and fingerprint before flashing.
        </li>
      </ol>

      <h3 id="rebuild-tutorial">Build a candidate from source, step by step</h3>
      <p>
        The two candidates below are unsigned test images. Each has a public recipe, a fixed
        source revision and an ISO you can download for comparison. The main download buttons
        serve earlier signed versions with different bytes. Choose the candidate for the product
        you want to reproduce.
      </p>
      <details className="build-instructions">
        <summary>Already downloaded a candidate? Check its SHA-256 first</summary>
        <p>Open a terminal in the download folder and run the line for your ISO.
          An <strong>OK</strong> result confirms that the file has the published candidate hash.
          To check that the source produces those bytes, continue with the build below.</p>
        <Commands lines={[
          "# Vault candidate",
          "echo '" + candidates.Vault.digest + "  " + candidates.Vault.download + "' | sha256sum --check -",
          "",
          "# Node candidate",
          "echo '" + candidates.Node.digest + "  " + candidates.Node.download + "' | sha256sum --check -",
        ]} />
      </details>
      <p>
        <strong>Prepare a clean build computer.</strong> Use a fresh Debian 13 amd64 virtual machine
        with internet access, 4 CPU cores, 8 GB of RAM and at least 50 GB of free disk for one build.
        Open Bash in the VM and run the commands below. Docker runs the build with permission to mount
        filesystems, so keep wallets, signing keys and personal files outside this VM.
      </p>
      <Commands lines={[
        "sudo apt update && sudo apt install ca-certificates curl docker.io docker-cli git gnupg patch xz-utils",
        "sudo systemctl start docker",
        "sudo docker version",
      ]} />
      <p>When Docker shows a <strong>Server</strong> section, open the instructions for your image.</p>
      <RebuildSteps product="Vault" />
      <RebuildSteps product="Node" />
      <h3>Read the result</h3>
      <p>
        Two <strong>OK</strong> lines followed by <strong>MATCH</strong> mean your build and the public
        candidate are identical, down to the last byte. Two GitHub-hosted builders have already
        compared each candidate. Running the recipe on infrastructure you control provides a separate
        check. Assessing what the software does also requires reading the code and testing its behaviour.
      </p>
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
