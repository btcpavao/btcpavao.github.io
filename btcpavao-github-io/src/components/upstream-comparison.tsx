import { useState } from "react"
import { VerificationCommands } from "./verification-commands"

const images = {
  vault: {
    name: "Vault v0.7.0",
    file: "bitcoin-core-vault-v0.7.0-amd64.iso",
    hash: "1e1782d6dc1354585cf6ec941ed7d231f0e48adfc0cee3972af1eaf3483424bb",
    core: "usr/local/bin",
  },
  node: {
    name: "Node v0.1.0-rc.2",
    file: "bitcoin-core-node-v0.1.0-rc.2-core32.1-amd64.iso",
    hash: "7934c3ddd2f39e126d6ed29b50be688ada25c50b60e37be60967bf1c6297ec0b",
    core: "opt/bitcoin-core/32.1/bin",
  },
}

const coreArchive = "bitcoin-32.1-x86_64-linux-gnu.tar.gz"
const keepassImage = "KeePassXC-2.8.0-1-x86_64.AppImage"
const coreRelease = "https://bitcoincore.org/bin/bitcoin-core-32.1/"
const keepassRelease = "https://github.com/keepassxreboot/keepassxc/releases/download/2.8.0/"

export function UpstreamComparison() {
  const [product, setProduct] = useState<keyof typeof images>("vault")
  const selected = images[product]
  return (
    <details className="build-instructions" id="compare-upstream">
      <summary>Try it yourself · compare the programs inside your ISO with their originals</summary>
      <p>
        You can open an ISO like an archive on a separate Debian 13 amd64 computer.
        This example compares the Bitcoin Core window, its command-line program and the KeePassXC
        application with copies obtained directly from their developers. The ISO stays on disk the whole time.
      </p>
      <ol>
        <li>
          <strong>Authenticate your reference copies.</strong> Keep your signed and verified Vault or Node
          ISO in <code>~/Downloads</code>. Save both of the following upstream downloads there too.
          <ul>
            <li>
              <strong>Bitcoin Core 32.1.</strong> Download the <a href={coreRelease + coreArchive}>Linux x86_64 archive</a>,
              its <a href={coreRelease + "SHA256SUMS"}>checksum list</a> and
              its <a href={coreRelease + "SHA256SUMS.asc"}>signatures</a>. Follow Bitcoin
              Core’s <a href="https://bitcoincore.org/en/download/#verify-your-download">Linux verification instructions</a>.
              Check the signatures against builder keys whose fingerprints you trust, then verify the archive’s
              checksum against that signed list. Keep Bitcoin Core’s two checksum files in their own folder
              so they do not replace the ISO publisher’s files of the same names.
            </li>
            <li>
              <strong>KeePassXC 2.8.0.</strong> Download the <a href={keepassRelease + keepassImage}>Linux AppImage</a> and
              its <a href={keepassRelease + keepassImage + ".sig"}>signature</a>.
              Follow <a href="https://keepassxc.org/verifying-signatures/">KeePassXC’s signature instructions</a>.
              Its published primary key fingerprint is <code>BF5A 669F 2272 CF43 24C1 FDA8 CFB4 C216 6397 D0D2</code>.
              Continue once both upstream downloads have passed their own checks.
            </li>
          </ul>
        </li>
        <li>
          <strong>Install the archive readers.</strong> The second tool opens SquashFS, the compressed filing
          system that holds the programs inside these ISOs. Allow another 2 GiB of free space in your home folder.
          <VerificationCommands title="Install ISO inspection tools" lines={[
            "sudo apt update && sudo apt install xorriso squashfs-tools",
          ]} />
        </li>
        <li>
          <strong>Choose the ISO you verified.</strong> The two images store Bitcoin Core in different
          folders. Select yours, then copy the block into Bash. It rechecks the three input files,
          opens the archives in a new folder and compares the actual program bytes.
          <fieldset>
            <legend>ISO to inspect</legend>
            {(["vault", "node"] as const).map((key) => (
              <label key={key}>
                <input type="radio" name="upstream-comparison-product" value={key}
                  checked={product === key} onChange={() => setProduct(key)} /> {images[key].name}{" "}
              </label>
            ))}
          </fieldset>
          <VerificationCommands title={"Compare upstream programs in " + selected.name} lines={[
            "(",
            "  set -eu",
            '  downloads="$HOME/Downloads"',
            '  cd "$downloads"',
            "  iso=" + selected.file,
            "  core=" + coreArchive,
            "  keepass=" + keepassImage,
            "  printf '%s  %s\\n' \\",
            '    ' + selected.hash + ' "$iso" \\',
            '    61545c17c3120fb7412f896d248b11993af04ec8817aad3649c55b2afb044963 "$core" \\',
            '    3ab1bfbb422272334b48057e6bfc984c839375d9a1cd9350c4ea62ca0b55ca5f "$keepass" | sha256sum --check',
            '  work=$(mktemp -d "$HOME/iso-compare.XXXXXX")',
            '  cd "$work"',
            '  echo "Inspection files: $work"',
            '  xorriso -osirrox on -indev "$downloads/$iso" -extract /live/filesystem.squashfs payload.squashfs',
            '  tar -xzf "$downloads/$core" bitcoin-32.1/bin/bitcoin-qt bitcoin-32.1/bin/bitcoin-cli',
            "  for app in bitcoin-qt bitcoin-cli; do",
            '    unsquashfs -cat payload.squashfs "' + selected.core + '/$app" > "$app.from-iso"',
            '    cmp "bitcoin-32.1/bin/$app" "$app.from-iso"',
            '    echo "MATCH $app"',
            "  done",
            '  install -m 700 "$downloads/$keepass" verified.AppImage',
            "  ./verified.AppImage --appimage-extract usr/bin/keepassxc > /dev/null",
            "  unsquashfs -cat payload.squashfs opt/keepassxc/2.8.0-3ab1bfbb42227233/usr/bin/keepassxc > keepassxc.from-iso",
            "  cmp squashfs-root/usr/bin/keepassxc keepassxc.from-iso",
            '  echo "MATCH keepassxc"',
            ")",
          ]} />
        </li>
      </ol>
      <p>
        Look for <code>MATCH bitcoin-qt</code>, <code>MATCH bitcoin-cli</code> and <code>MATCH keepassxc</code>.
        Each line means that executable matched its upstream counterpart byte for byte. If a comparison fails,
        the commands stop at that file. Check the product, version and signed downloads before continuing.
        You can delete the printed inspection folder when finished. Project launchers, settings and
        backup helpers have their own source-review steps below.
      </p>
    </details>
  )
}
