import { VerificationCommands as Commands } from "./verification-commands"

const fingerprint = "787A 2AAF B0D1 19CA 0522 B2A5 B9C9 9AF8 5788 96D0"
const gpg = "gpg --no-options --batch --homedir ./release-keys"
const readKey = gpg + " --yes --dearmor --output ./release-keys/publisher.gpg btcpavao-pgp.asc"
const checkSignature = gpg + " --no-default-keyring --keyring publisher.gpg --no-auto-key-retrieve --assert-signer " +
  fingerprint.replaceAll(" ", "") + " --verify SHA256SUMS.asc SHA256SUMS"

export function NativeIsoVerification({ product, isoUrl, filename }: {
  product: "Vault" | "Node"; isoUrl: string; filename: string
}) {
  const folder = product + "-check"
  const preparation = (
    <>
      <p>In Downloads, create a new folder called <strong>{folder}</strong>. Save these four
        files there with their original names. Download the <a href={isoUrl}>{product} ISO</a>,{" "}
        <a href={new URL("SHA256SUMS", isoUrl).href}>SHA256SUMS</a>,{" "}
        <a href={new URL("SHA256SUMS.asc", isoUrl).href}>SHA256SUMS.asc</a> and{" "}
        <a href={new URL("btcpavao-pgp.asc", isoUrl).href}>btcpavao-pgp.asc</a>.</p>
      <p>Confirm all 40 characters of Pavao’s signing-key fingerprint through a separate
        channel you already trust.</p>
      <code className="debian-signing-fingerprint">{fingerprint}</code>
      <p>The commands keep the release key in this folder, verify the signature, then check your ISO against
        its exact filename and SHA-256 in the signed list. If you saved the files
        elsewhere, change the folder path in the block.</p>
    </>
  )
  const success = (
    <p>Continue to USB writing only when the last line reads <strong>Verified</strong> followed
      by <code>{filename}</code>. If verification fails, check the fingerprint, folder and
      release files before trying again.</p>
  )
  return (
    <>
      <details className="signed-download-check">
        <summary>Verify on macOS</summary>
        <div className="signed-download-check__body">
          {preparation}
          <p>Install a current <a href="https://gnupg.org/download/">GnuPG for macOS</a>.
            If you use Homebrew, run <a href="https://formulae.brew.sh/formula/gnupg"><code>brew install gnupg</code></a>.
            Open Terminal and run this block.</p>
          <Commands title={`Check the ${product} ISO on macOS`} lines={[
            "(", "  set -e", `  cd "$HOME/Downloads/${folder}"`,
            "  mkdir -p -m 700 release-keys",
            "  " + readKey, "  " + checkSignature,
            `  iso='${filename}'`,
            '  line=$(shasum -a 256 "$iso")',
            '  grep -Fxq -- "$line" SHA256SUMS || { echo "ISO does not match the signed list."; exit 1; }',
            '  echo "Verified $iso"', ")",
          ]} />
          {success}
        </div>
      </details>
      <details className="signed-download-check">
        <summary>Verify on Windows</summary>
        <div className="signed-download-check__body">
          {preparation}
          <p>Install the current <a href="https://gpg4win.org/get-gpg4win.html">Gpg4win</a> package.
            Open a new PowerShell window and run this block.</p>
          <Commands title={`Check the ${product} ISO on Windows`} lines={[
            "& {", "  $ErrorActionPreference = 'Stop'",
            `  Set-Location -LiteralPath "$HOME/Downloads/${folder}"`,
            "  New-Item -ItemType Directory -Path release-keys -Force | Out-Null",
            "  " + readKey,
            "  if ($LASTEXITCODE -ne 0) { throw 'Could not read the release key.' }",
            "  " + checkSignature,
            "  if ($LASTEXITCODE -ne 0) { throw 'Signature check failed.' }",
            `  $iso = '${filename}'`,
            "  $digest = (Get-FileHash -LiteralPath $iso -Algorithm SHA256).Hash.ToLowerInvariant()",
            '  if ((Get-Content -LiteralPath SHA256SUMS) -cnotcontains "$digest  $iso") {',
            "    throw 'ISO does not match the signed list.'", "  }",
            '  "Verified $iso"', "}",
          ]} />
          {success}
        </div>
      </details>
    </>
  )
}
