import { DEBIAN_IMAGE_VERIFICATION_PATH } from "../routes"
import { captures } from "../curriculum/practice-captures"
import { nodeBuild, vaultBuild } from "../iso-releases"
import { VerificationCommands as Commands } from "./verification-commands"
import { NativeIsoVerification } from "./native-iso-verification"
import { EtcherUsbSteps } from "./etcher-usb-steps"
import { ZoomableImage } from "./zoomable-image"
import "./signed-download-check.css"

export const verifierRevision = "a48ff1e405dfb126471049c838fa4ec150023b1a"
const verifierPath = verifierRevision + "/docs/debian-images/check_release.py"
const screenshots = "/software/screenshots/verification/"

function NodeInstallation() {
  const target = captures["node-disk"]
  return (
    <details className="signed-download-check">
      <summary>Install the verified Node image on a spare disk</summary>
      <div className="signed-download-check__body" id="install-node">
        <p><strong>Installation erases the entire selected disk.</strong> Set aside a spare 64-bit Intel or AMD computer and a destination disk you can erase. Disconnect backup drives before you begin.</p>
        <ol>
          <li><p>On Debian, use GNOME Disks to write <code>{nodeBuild.isoName}</code> to a USB stick you can erase. Check the USB model and capacity before confirming. Wait for writing to finish, then safely eject it.</p><EtcherUsbSteps /></li>
          <li>Start the spare computer from that USB. In the Node installer, choose your keyboard and the intended destination disk. Match the disk’s model and capacity to the spare disk you set aside. Review the final selection before confirming the installation.</li>
          <li>When installation finishes, remove the USB and restart. At the Node desktop, connect an Ethernet cable or open <strong>Network Status</strong> to join Wi-Fi. Open <strong>Node Guide</strong> for the watch-only wallet and synchronization steps.</li>
        </ol>
        <figure className="verification-shot">
          <ZoomableImage src={target.src} alt={target.alt} width={target.width} height={target.height} loading="lazy" decoding="async" />
          <figcaption><span>This earlier Node RC2 screenshot shows the selected disk in a test virtual machine. Identify your own disk by model and capacity.</span> <a href={target.src}>View the full installer screen</a></figcaption>
        </figure>
        <p><a href={nodeBuild.releaseUrl}>Read the release notes for this Node download</a></p>
      </div>
    </details>
  )
}

function NodeDownloadCheck() {
  return (
    <>
      <details className="signed-download-check">
        <summary>Verify the Node signature and ISO</summary>
        <div className="signed-download-check__body" id="verify-node-download">
          <NativeIsoVerification product="Node" isoUrl={nodeBuild.isoUrl} filename={nodeBuild.isoName} />
          <details className="signed-download-check">
            <summary>Verify on Debian 13</summary>
            <div className="signed-download-check__body">
              <p>Save the <a href={nodeBuild.isoUrl}>Node ISO</a> in Downloads. Before you start, confirm Pavao’s signing-key fingerprint through a separate channel you already trust.</p>
              <code className="debian-signing-fingerprint">787A 2AAF B0D1 19CA 0522 B2A5 B9C9 9AF8 5788 96D0</code>
              <p>Open Terminal. If you need curl or GnuPG, install them with <code>sudo apt install curl gnupg</code>. Paste the block below. It downloads the public key and signed checksum list from the <a href={nodeBuild.releaseUrl}>Node release</a>, verifies the signature in a temporary keyring, then checks your entire ISO against the signed entry for RC3.</p>
              <Commands title="Verify the Node signature and ISO" lines={[
                "(",
                "  set -eu",
                '  cd "$HOME/Downloads"',
                "  base=" + nodeBuild.repo + "/releases/download/" + nodeBuild.tag,
                "  iso=" + nodeBuild.isoName,
                "  expected=" + nodeBuild.sha256,
                "  signer=787A2AAFB0D119CA0522B2A5B9C99AF8578896D0",
                "  work=$(mktemp -d)",
                '  trap \'rm -rf -- "$work"\' EXIT',
                "  for file in SHA256SUMS SHA256SUMS.asc btcpavao-pgp.asc; do",
                '    curl -fsSL --retry 2 -o "$work/$file" "$base/$file"',
                "  done",
                '  gpg --no-options --batch --homedir "$work" --dearmor \\',
                '    --output "$work/release.gpg" "$work/btcpavao-pgp.asc"',
                '  gpg --no-options --batch --homedir "$work" --no-default-keyring \\',
                '    --keyring "$work/release.gpg" --no-auto-key-retrieve --assert-signer "$signer" \\',
                '    --verify "$work/SHA256SUMS.asc" "$work/SHA256SUMS"',
                '  grep -Fx "$expected  $iso" "$work/SHA256SUMS" | sha256sum --check --strict',
                ")",
              ]} />
              <p>Look for <strong>Good signature</strong> from <code>btcpavao</code> and <strong>OK</strong> next to your ISO’s filename. GnuPG can also show an uncertified-key warning in a fresh keyring. The command checks the full fingerprint above. If either check fails, stop before writing the USB.</p>
              <p>For an independent check, use the <a href={nodeBuild.sourceUrl}>matching project source</a> and follow the <a href={DEBIAN_IMAGE_VERIFICATION_PATH + "#rebuild-tutorial"}>step-by-step rebuild guide</a>. Its final comparison checks every byte of your local build against the ISO offered on this page.</p>
            </div>
          </details>
          <div className="signed-download-check__next">
            <a href="#install-node">Continue to Node setup on a spare disk</a>
            <a href="#ask-node-verify">Ask Pavao about this check</a>
          </div>
        </div>
      </details>
      <NodeInstallation />
    </>
  )
}

export function SignedDownloadCheck({ product }: { product: "Vault" | "Node" }) {
  if (product === "Node") return <NodeDownloadCheck />
  const { tag, isoName: filename } = vaultBuild
  const fullImage = screenshots + "vault-v070-signed.webp"

  return (
    <details className="signed-download-check">
      <summary>Verify the Vault signature and ISO</summary>
      <div className="signed-download-check__body" id="verify-vault-download">
        <NativeIsoVerification product="Vault" isoUrl={vaultBuild.isoUrl} filename={filename} />
        <details className="signed-download-check">
          <summary>Verify on Debian 13</summary>
          <div className="signed-download-check__body">
            <p>Save the ISO in Downloads on Debian 13 or in a Debian 13 virtual machine. Open Terminal. Complete these three checks before writing the USB stick.</p>
            <ol>
              <li>
                <strong>Get the verification script.</strong> Copy this block and paste it into Terminal with <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>V</kbd>. Press <kbd>Enter</kbd>. It installs the tools and opens the <a href={"https://github.com/btcpavao/btcpavao.github.io/blob/" + verifierPath}>public script</a> for inspection. Press <kbd>q</kbd> to return to the terminal.
                <Commands title="Get and inspect the verifier" lines={[
                  'mkdir -p "$HOME/iso-review" && cd "$HOME/iso-review" &&',
                  "  sudo apt update && sudo apt install ca-certificates curl gnupg less python3 &&",
                  "  curl --fail --location --output check_release.py https://raw.githubusercontent.com/btcpavao/btcpavao.github.io/" + verifierPath + " &&",
                  "  less check_release.py",
                ]} />
              </li>
              <li>
                <strong>Confirm who signed the release.</strong> This block displays Pavao’s public signing key. Compare all 40 characters of its fingerprint with Pavao through a separate channel you already trust.
                <Commands title="Display the signing-key fingerprint" lines={[
                  "curl --fail --location --output btcpavao-pgp.asc " + vaultBuild.signingKeyUrl + " &&",
                  "  gpg --show-keys --with-fingerprint btcpavao-pgp.asc",
                ]} />
                <code className="debian-signing-fingerprint">787A 2AAF B0D1 19CA 0522 B2A5 B9C9 9AF8 5788 96D0</code>
                <a href={screenshots + "signer-fingerprint.webp"}>See the signing key in Terminal</a>
              </li>
              <li>
                <strong>Check your ISO against the signed list.</strong> Run this in the same terminal. If you saved the file elsewhere, change the path in quotes.
                <Commands title={"Verify Vault " + tag} lines={[
                  'python3 check_release.py vault ' + tag + ' --iso "$HOME/Downloads/' + filename + '"',
                ]} />
                <p>Look for <strong>OK</strong> next to the checksum and your ISO’s filename. This means the signature was accepted and your file matches the signed release. If either check fails, stop before writing the USB. Check the signing key and download again from the release you chose.</p>
                <figure className="verification-shot signed-download-check__result">
                  <ZoomableImage src={screenshots + "vault-v070-ok-detail.webp"}
                    fullSrc={fullImage} alt="Earlier example showing OK for bitcoin-core-vault-v0.7.0-amd64.iso."
                    width={544} height={48} loading="lazy" decoding="async" />
                  <figcaption>
                    <span>Example from Vault v0.7.0. Your result should show <strong>OK</strong> beside <code>{filename}</code>.</span>
                    <a href={fullImage}>View the full terminal output</a>
                  </figcaption>
                </figure>
              </li>
            </ol>
            <p>GnuPG may also say the key is uncertified. The verifier uses a temporary keyring. Confirm the fingerprint independently as in the second step.</p>
          </div>
        </details>
        <div className="signed-download-check__next">
          <a href="#prepare-usb">Continue to USB preparation</a>
          <a href="#ask-verify">Ask Pavao about this check</a>
        </div>
        <a href={DEBIAN_IMAGE_VERIFICATION_PATH + "#signed-manifest"}>How do the signature and checksum work together?</a>
      </div>
    </details>
  )
}
