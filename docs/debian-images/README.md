# Verify the sources and rebuild a Bitcoin Core image


## Current Vault release: v0.9.0

The current Vault download is [v0.9.0](https://github.com/btcpavao/bitcoin-core-vault-releases/releases/tag/v0.9.0), SHA-256 `615067c09f573a4476c7039adc90e58f75a46bdf20a028fd3c58f3e300c832fe`, size 1,133,379,584 bytes. It publishes the tested local ISO, source archive, package inventory, build inputs and validation records. A byte-identical independent rebuild of this ISO has not yet been demonstrated. Read its [current build guide and limits](https://github.com/btcpavao/bitcoin-core-vault-releases/blob/v0.9.0/docs/REBUILD.md) and [BUILD-PROVENANCE.json](https://github.com/btcpavao/bitcoin-core-vault-releases/releases/download/v0.9.0/BUILD-PROVENANCE.json).

After completing the verifier setup and independently confirming the signing fingerprint below, use:

```bash
python3 check_release.py vault v0.9.0
python3 check_release.py vault v0.9.0 --iso "$HOME/Downloads/bitcoin-core-vault-v0.9.0-amd64.iso"
```

The version-specific Vault rebuild and 162-file `--inspect` walkthrough below is retained for **the archived v0.8.0 ISO**. The existing `inspect_payload.py` mapping stops at v0.8.0 and must not be presented as a full v0.9.0 source-to-ISO check. Use the new release's source and published validation records when reviewing v0.9.0. The Node RC3 commands and evidence below likewise describe the archived RC3 ISO.

## Current Node release: v0.1.0-rc.4

The current Node download is [v0.1.0-rc.4](https://github.com/btcpavao/bitcoin-core-node-releases/releases/tag/v0.1.0-rc.4):

- Filename: `bitcoin-core-node-v0.1.0-rc.4-core32.1-amd64.iso`
- Size: 1,800,142,848 bytes (1.80 GB).
- SHA-256: `b25093180bb9b8f57adf2163634be3473fbc0f5163e9fcb05008651f2e0f6da7`.
- PGP publication status: **signed**. The release publishes the [signed checksum list](https://github.com/btcpavao/bitcoin-core-node-releases/releases/download/v0.1.0-rc.4/SHA256SUMS.asc) and a [detached signature for the ISO](https://github.com/btcpavao/bitcoin-core-node-releases/releases/download/v0.1.0-rc.4/bitcoin-core-node-v0.1.0-rc.4-core32.1-amd64.iso.asc). Confirm the full signing-key fingerprint through a trusted channel before verifying either signature.
- Matching tracked-source archive: [bitcoin-core-node-v0.1.0-rc.4-source.tar.gz](https://github.com/btcpavao/bitcoin-core-node-releases/releases/download/v0.1.0-rc.4/bitcoin-core-node-v0.1.0-rc.4-source.tar.gz), with prefix `bitcoin-core-node-v0.1.0-rc.4/`, archival commit `8eae47cb3c2c67c7365dcfcc25af44cd5048baf3` and archive SHA-256 `c629d565d6b2e999d5c229ccb4cc5fd3f0a1ee0160ce7fcb1655fd96b5defb49`.
- [SOURCE-PROVENANCE.json](https://github.com/btcpavao/bitcoin-core-node-releases/releases/download/v0.1.0-rc.4/SOURCE-PROVENANCE.json), [BUILD-INFO.json](https://github.com/btcpavao/bitcoin-core-node-releases/releases/download/v0.1.0-rc.4/BUILD-INFO.json), [ACCEPTANCE.json](https://github.com/btcpavao/bitcoin-core-node-releases/releases/download/v0.1.0-rc.4/ACCEPTANCE.json) and [TEST-SCOPE-LIMITS.json](https://github.com/btcpavao/bitcoin-core-node-releases/releases/download/v0.1.0-rc.4/TEST-SCOPE-LIMITS.json) record the actual derivation and verification scope.

The release also includes its recipe and native installer source bundles. The archival commit records the tracked source after the build; read the provenance for the actual build base and working-tree changes. A fresh byte-identical independent rebuild of RC4 has not been demonstrated. RC3's two matching GitHub builds and its 247-file source mapping do not establish those properties for RC4.

RC4 uses one RAM-only **Private Workspace**, including PSBT files. Blockchain data, Core-managed wallets and saved Node settings remain persistent. Use **Settings → Network Connections** for Wi-Fi and **Settings → Backup and Restore** for supported backups.

Follow the [current Node signature-verification instructions](https://btcpavao.com/en/bitcoin-core/debian-images/#verify-node-download) for Debian, macOS or Windows. After verifying the signed checksum list, compare the downloaded RC4 ISO with the published hash on Debian:

```bash
cd "$HOME/Downloads" &&
  echo 'b25093180bb9b8f57adf2163634be3473fbc0f5163e9fcb05008651f2e0f6da7  bitcoin-core-node-v0.1.0-rc.4-core32.1-amd64.iso' | sha256sum --check -
```

## Historical signed-release and rebuild walkthrough

The walkthrough below retains the original **Vault v0.8.0 and Node v0.1.0-rc.3** targets. Use the current release sections above for the downloads now offered on the website. Do not substitute RC4's filename into an RC3 build or inspection command.


Use a separate Debian 13 **amd64** virtual machine. A VM is a disposable computer that runs inside your usual computer. Open its Terminal and run one block at a time. Downloading and checking an ISO takes no USB stick, wallet, or Bitcoin. The build instructions for each image list additional space and tools.

For either archived target below, check the signature and file hash, then [build it from the release revision in step 4](#4-build-on-a-clean-machine).

| Archived rebuild target | Published SHA-256 of the complete ISO | Verification |
| --- | --- | --- |
| [Vault v0.8.0](https://github.com/btcpavao/bitcoin-core-vault-releases/releases/tag/v0.8.0) | `0bc142508a35172ea92f645decc31be1373b05956e9a17d0ad01cee9bab84857` | Verify the OpenPGP-signed manifest, then compare the rebuilt ISO. |
| [Node v0.1.0-rc.3](https://github.com/btcpavao/bitcoin-core-node-releases/releases/tag/v0.1.0-rc.3) | `39e9b5b76dce7d9854989365d389caa50d55f0b0c5654602eafc7e12904b6675` | Verify the OpenPGP-signed manifest, then compare the rebuilt ISO. |

A release has a version (for example, `v0.8.0`), an exact revision of its source code (the **commit**) and a fingerprint of the finished file (the **SHA-256**). The release list `SHA256SUMS` connects filenames to their SHA-256 values. Pavao’s detached OpenPGP signature authenticates each release’s list once you establish the signing key’s fingerprint. To check a rebuild, calculate the SHA-256 of the ISO **you built** and compare every byte against the actual downloaded ISO.

## 1. Get the signed-release verification tool

In the VM, install the tools and open this guide's directory. The last command displays the small Python program so you can read what it will do. Use the arrow keys to scroll and press `q` to exit.

```sh
sudo apt update
sudo apt install git python3 gnupg curl less patch
git clone --depth 1 --filter=blob:none --sparse https://github.com/btcpavao/btcpavao.github.io.git verification-guide
cd verification-guide
git sparse-checkout set docs/debian-images
cd docs/debian-images
less check_release.py
```

Before trusting a result, confirm the publisher's full OpenPGP key fingerprint through a channel you already trust, for example directly with Pavao. Compare all the characters with this value and the `SIGNER` line in the program.

```text
787A 2AAF B0D1 19CA 0522 B2A5 B9C9 9AF8 5788 96D0
```

The program downloads the public key, manifest and detached signature for the version you select. It asks GnuPG to require that specific signer and checks every requested file against its entry in the signed manifest. A failed command stops the verification. The private signing key stays with the publisher.

## 2. Download authenticated source files

These two commands authenticate the archived signed Vault release and the signed RC2 **source** used as an input to the RC3 recipe. For the prepared source of the archived Node RC3 download, use its tag and apply that release's public build patch:

```bash
git clone --depth 1 --branch v0.1.0-rc.3 https://github.com/btcpavao/bitcoin-core-node-releases.git node-source-review
(
  set -eu
  cd node-source-review
  test "$(git rev-parse HEAD)" = dc82242379bc9c6f8c7d7c60d94a0dbb69bdd1e0
  bash rebuild/node source ../node-inspection
)
```

The following commands inspect the signed archives. Run them in the verification guide directory where you opened `check_release.py`.

```sh
python3 check_release.py vault v0.8.0
python3 check_release.py node v0.1.0-rc.2
```

Look for `OK` or `Verified existing file` beside the source archive and a final `Source revision` line. The files are in `release-checks/<product>/<version>/`. The Vault source archive includes the source inputs for its patched Calamares installer and Thunar file manager under tools/rebuild/packages/sources/. The release pages contain the ISO and package records. For Node, the source to compare is the attached **bitcoin-core-node-…-source.tar.gz**. GitHub's automatic “Source code (zip)” for the release tag contains the public release repository and has different contents.

| Published image | Source revision recorded by its signed files | Release |
| --- | --- | --- |
| Vault v0.8.0 | `d0bc35aa9a64d45d5c24a226aa9ba2ec2a315ebf` | [Vault files](https://github.com/btcpavao/bitcoin-core-vault-releases/releases/tag/v0.8.0) |
| Historical Node v0.1.0-rc.2 (base source) | `0d43a61e82ab1a0ee86a0b916d1215f31f4502e3` | [Node files](https://github.com/btcpavao/bitcoin-core-node-releases/releases/tag/v0.1.0-rc.2) |

To check the archived signed Vault ISO or an archived copy of the older signed Node RC2 ISO, save it in your VM's Downloads folder and run the matching line. For the archived Node RC3 ISO, verify its detached signature and match its signed ISO checksum before the historical build comparison in steps 4–5. The program prints the expected release filename and the SHA-256 it computed from your local file. A mismatch exits with an error. If you are only reading the source, skip the ISO download. For current RC4 signature verification, use the RC4 section above.

```sh
python3 check_release.py vault v0.8.0 --iso ~/Downloads/bitcoin-core-vault-v0.8.0-amd64.iso
python3 check_release.py node v0.1.0-rc.2 --iso ~/Downloads/bitcoin-core-node-v0.1.0-rc.2-core32.1-amd64.iso
```

## 3. See what changed

**Vault.** The public Git repository contains the history. These commands check that the tags resolve to the two revisions named in the signed source records. Run this block from the same guide directory. If either revision check fails, stop before using the diff.

```sh
python3 check_release.py vault v0.7.0
git clone https://github.com/btcpavao/bitcoin-core-vault-releases.git vault-history
(
  set -eu
  old=$(cat release-checks/vault/v0.7.0/SOURCE-COMMIT.txt)
  new=$(cat release-checks/vault/v0.8.0/SOURCE-COMMIT.txt)
  test "$(git -C vault-history rev-parse 'v0.7.0^{commit}')" = "$old"
  test "$(git -C vault-history rev-parse 'v0.8.0^{commit}')" = "$new"
  git -C vault-history diff --stat "$old" "$new"
  git -C vault-history diff "$old" "$new" -- config/includes.chroot/usr/lib/core-vault/public_export.py
)
```

The first diff lists changed files and line counts. The second shows the actual edits in a single file. In a Git diff, a line starting with `+` was added and a line starting with `-` was removed. Use other paths from the list to inspect the installer or wallet helpers.

**Node.** You can [browse the complete RC2 source](https://github.com/btcpavao/bitcoin-core-node-releases/tree/669e90f9768975924ae443225f23f78cb4a28ecf/source) or [view the 42 changed paths from RC1](https://github.com/btcpavao/bitcoin-core-node-releases/compare/5f5770f7000d9d7fa05687279b21bf26e1293a86...669e90f9768975924ae443225f23f78cb4a28ecf). Compare the two signed source archives locally as follows. Run the following in the guide directory, using fresh `review-node/rc1` and `review-node/rc2` folders.

```sh
python3 check_release.py node v0.1.0-rc.1
mkdir -p review-node/rc1 review-node/rc2
tar -xzf release-checks/node/v0.1.0-rc.1/bitcoin-core-node-v0.1.0-rc.1-source.tar.gz --strip-components=1 -C review-node/rc1
tar -xzf release-checks/node/v0.1.0-rc.2/bitcoin-core-node-v0.1.0-rc.2-source.tar.gz --strip-components=1 -C review-node/rc2
git diff --no-index --stat review-node/rc1 review-node/rc2
git diff --no-index review-node/rc1/app/chain_backup.py review-node/rc2/app/chain_backup.py
```

For these two `git diff --no-index` commands, exit code 1 means differences were found. Archives can also differ in which tests or documentation they include. To assess behavior, read the code that actually runs. For example, follow how Vault exports an encrypted wallet to USB or how Node picks the destination for a chain backup.

### Check a file inside the downloaded ISO

To check the archived Node RC3 download's chain-backup code, prepare its `node-inspection` source in step 2 and save that RC3 ISO in Downloads. From the directory containing `node-inspection`, run:

```bash
sudo apt install xorriso squashfs-tools
(
  set -eu
  iso="$HOME/Downloads/bitcoin-core-node-v0.1.0-rc.3-core32.1-amd64.iso"
  printf '%s  %s\n' 39e9b5b76dce7d9854989365d389caa50d55f0b0c5654602eafc7e12904b6675 "$iso" | sha256sum --check
  work=$(mktemp -d "$HOME/inspect-node.XXXXXX")
  xorriso -osirrox on -indev "$iso" -extract /live/filesystem.squashfs "$work/payload.squashfs"
  unsquashfs -cat "$work/payload.squashfs" usr/lib/bitcoin-core-node/chain_backup.py > "$work/from-iso.py"
  cmp node-inspection/app/chain_backup.py "$work/from-iso.py"
  echo "The prepared Node source and the downloaded ISO contain identical chain-backup code."
)
```

For Vault v0.8.0, the same method works for the code that checks signed PSBTs and watch-only wallets before writing them to a mounted transfer drive. The ISO path is `usr/lib/core-vault/public_export.py`. Its source archive member is `bitcoin-core-vault-v0.8.0-source/config/includes.chroot/usr/lib/core-vault/public_export.py`.

For the signed Vault and Node releases, the verifier also checks the mapped project files. Use the current release commands below. Allow 2 GiB of temporary disk space. The verifier checks the source archive and ISO against the same signed manifest before extracting them.

```sh
python3 check_release.py vault v0.8.0 --iso ~/Downloads/bitcoin-core-vault-v0.8.0-amd64.iso --inspect
python3 check_release.py node v0.1.0-rc.3
python3 check_release.py node v0.1.0-rc.3 --iso ~/Downloads/bitcoin-core-node-v0.1.0-rc.3-core32.1-amd64.iso --inspect
```

| Image | Files covered by the comparison | Recorded result |
| --- | --- | --- |
| Vault v0.8.0 | 162 installed regular files from `config/includes.chroot/`, including both Bitcoin Core executables and the public export helpers, plus two intentionally removed session files | 162 matched and both retired files were absent on November 18, 2026 |
| Node v0.1.0-rc.2 | 156 regular files in `runtime/` and 71 Python modules in `app/` | 227 matched on November 11, 2026 |
| Node v0.1.0-rc.3 | Project runtime files and Python modules | 247 matched byte for byte on November 20, 2026. A separate exact check covers the initramfs setting: the source sets `CRYPTSETUP=y` once and the installed file contains that same assignment twice. |

The comparison checks the contents of the paths supplied by the source archive. Other files, permissions, symbolic links, installed Debian packages and machine behavior require separate inspection. You can read the path mapping in [inspect_payload.py](inspect_payload.py).

## 4. Build on a clean machine

**Vault v0.8.0.** The build recipe targets the same ISO distributed with the signed release. Authenticate the downloaded ISO in step 2, then compare your own build with it.

**Historical Node v0.1.0-rc.3.** The archived RC3 download is the candidate built by the recipe below. Its recipe starts with the signed RC2 source archive and pins the build environment, Debian packages and upstream inputs. Verify the detached signature and ISO checksum for that candidate, then compare your build with that exact downloaded file. These commands do not build RC4.

### Prepare your build VM

In a fresh Debian 13 amd64 VM, allow 4 CPU cores, 8 GB of memory and at least 50 GB of free disk for one build. Make sure the VM can reach the internet. The commands below install Git, Docker and tools for checking the inputs. Docker runs the build in a clean environment with the tool versions specified by the project.

```bash
sudo apt update
sudo apt install ca-certificates curl docker.io docker-cli git gnupg patch xz-utils
sudo systemctl start docker
sudo docker version
```

The last command should show a **Server** section. Choose Vault or Node below and run its block in Bash from a directory where the named checkout and result folders do not yet exist. The block stops if the download fails or the commit differs. The build can take hours. Each block ends by checking the ISO created on **your** machine against the published SHA-256 for that image. Look for the ISO filename followed by `OK`.

### Rebuild Vault v0.8.0

This recipe builds the Calamares installer, Thunar file manager and Vault Backup from source. It assembles the base system with pinned Debian packages and verified upstream Bitcoin Core and KeePassXC binaries. The release script uses the full Git history to rebuild the base and apply the reviewed updates to the live and installed systems. [Two project builds](https://github.com/btcpavao/bitcoin-core-vault-releases/actions/runs/44328053285/job/134901484375) produced identical 714,407,936-byte ISOs matching the signed release hash. The release page includes the signed checksum list, ISO, package inventory and source archive. [Signed release files](https://github.com/btcpavao/bitcoin-core-vault-releases/releases/tag/v0.8.0) · [Build instructions at this revision](https://github.com/btcpavao/bitcoin-core-vault-releases/blob/d0bc35aa9a64d45d5c24a226aa9ba2ec2a315ebf/docs/REBUILD.md)

```bash
(
  set -eu
  git clone --branch v0.8.0 https://github.com/btcpavao/bitcoin-core-vault-releases.git vault-release
  cd vault-release
  test "$(git rev-parse HEAD)" = d0bc35aa9a64d45d5c24a226aa9ba2ec2a315ebf
  bash tools/rebuild/build-release.sh --sudo-docker ../vault-result
  printf '%s  %s\n' 0bc142508a35172ea92f645decc31be1373b05956e9a17d0ad01cee9bab84857 ../vault-result/bitcoin-core-vault-amd64.iso | sha256sum --check
)
```

### Rebuild the Node candidate

The recipe authenticates Node's RC2 project sources, applies its public changes and builds the local installer and login screen. The tested RC3 download is 1,288,060,928 bytes. Two fresh GitHub rebuilds matched each other byte for byte and reproduced the signed RC3 hash. The release page includes the downloadable image, recipe commit ID, signed checksum list and detached signature. [Candidate files](https://github.com/btcpavao/bitcoin-core-node-releases/releases/tag/v0.1.0-rc.3) · [Build instructions at this revision](https://github.com/btcpavao/bitcoin-core-node-releases/blob/dc82242379bc9c6f8c7d7c60d94a0dbb69bdd1e0/docs/REBUILD.md) · [Build logs and byte comparison](https://github.com/btcpavao/bitcoin-core-node-releases/actions/runs/44714236174/job/136224300463)

```bash
(
  set -eu
  git clone --depth 1 --branch v0.1.0-rc.3 https://github.com/btcpavao/bitcoin-core-node-releases.git node-candidate
  cd node-candidate
  test "$(git rev-parse HEAD)" = dc82242379bc9c6f8c7d7c60d94a0dbb69bdd1e0
  sudo bash rebuild/node build ../node-result
  printf '%s  %s\n' 39e9b5b76dce7d9854989365d389caa50d55f0b0c5654602eafc7e12904b6675 ../node-result/bitcoin-core-node-candidate-amd64.iso | sudo sha256sum --check
)
```

### Inspect the source changes

**Vault.** Review the [changes since v0.7.0](https://github.com/btcpavao/bitcoin-core-vault-releases/compare/v0.7.0...d0bc35aa9a64d45d5c24a226aa9ba2ec2a315ebf) and the [source inputs for the patched packages](https://github.com/btcpavao/bitcoin-core-vault-releases/tree/d0bc35aa9a64d45d5c24a226aa9ba2ec2a315ebf/tools/rebuild/packages/sources). The release revision and signed build-inputs.txt identify the recipe. The signed package inventory identifies the installed Debian packages.

**Node.** Open [the build recipe changes](https://github.com/btcpavao/bitcoin-core-node-releases/compare/e6519d7e5e956aa62512294389a9db2cd0a60a96...97922f807e84de7184aaae6be56375da56d7f1de). The file `rebuild/node.patch` shows each change applied to the signed RC2 sources. To read the finished sources before building, run `bash rebuild/node source ../node-inspection` in your checked-out candidate directory and open the resulting folder. Node also includes upstream firmware packages. Those packages can be identified and hashed even where the vendor does not publish their source.

Each recipe links to a public revision. For the main [Vault](https://btcpavao.com/en/bitcoin-core/debian-images/#verify-vault-download) and [Node](https://btcpavao.com/en/bitcoin-core/debian-images/#verify-node-download) downloads, verify the release’s detached signature before checking your ISO against its checksum list.

## 5. Compare the finished images and report the result

In each builder's Terminal type `sha256sum ` (including a space), drag the ISO **from the build output folder** into the Terminal, then press Enter. Record all 64 characters. If both files are on one machine you can also run `cmp first.iso second.iso` with their actual paths. Exit code 0 means every byte matched. Two builds on one provider test repeatability there. A second person using their own machine can provide independent confirmation.

Save your chosen ISO from the main download button in Downloads. From the directory containing the `vault-result` or `node-result` build folder, run the relevant line:

```bash
cmp vault-result/bitcoin-core-vault-amd64.iso "$HOME/Downloads/bitcoin-core-vault-v0.8.0-amd64.iso" && echo "MATCH: Vault"
sudo cmp node-result/bitcoin-core-node-candidate-amd64.iso "$HOME/Downloads/bitcoin-core-node-v0.1.0-rc.3-core32.1-amd64.iso" && echo "MATCH: Node"
```

A successful comparison establishes that your machine reproduced the actual download. See the [website rebuild tutorial](https://btcpavao.com/en/bitcoin-core/debian-images/verification/#rebuild-tutorial) for a single comparison block per product that also downloads and checks the published ISO.

For signed Vault v0.8.0 or Node v0.1.0-rc.3, return to the guide directory and use `python3 check_release.py PRODUCT TAG --iso "/path/to/your/downloaded.iso"` with the actual product, version and path. The tool verifies the publisher’s signature on the checksum list and compares your file with the entry for that release. See [how to verify a signed download](https://btcpavao.com/en/bitcoin-core/debian-images/#verify-download).

If any hashes differ, keep both files, record the expected and actual digests and keep the build logs. On a disposable VM with both files, install `diffoscope` and run `diffoscope --text differences.txt first.iso second.iso` with the actual paths. It opens nested filesystems and identifies the first meaningful differences. A timestamp difference still changes the ISO.

When sharing a result, include the product, recipe commit, build command, builder OS/architecture, dependency snapshot or image digest, ISO filename, size and SHA-256, the comparison target, and whether they matched. Keep your own signed report if you use OpenPGP. Reproducibility connects the reviewed inputs to the image bytes. Assessing whether the software handles keys and transactions correctly also requires reviewing those inputs.

## Working with an LLM

Give your assistant the link to this guide and the release or recipe you selected. You can paste the following text:

> I am using a fresh Debian 13 amd64 VM. Walk me through this guide one command at a time. Explain what each command reads, writes, or downloads, where to run it, and what output means success. Wait for my result before moving on. When comparing hashes, tell me which file came from the release and which file I built. If they differ, preserve the logs, show me the first difference and explain it. Use only the selected revision and its documented dependencies.

For help reviewing code, paste a small public diff and ask the assistant to identify the exact file and line supporting each claim. Check that line yourself. Public logs and hashes are enough for build questions. Wallets, passphrases, private keys and private descriptors belong outside the conversation.
