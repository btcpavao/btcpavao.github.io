# Verify the sources and rebuild a Bitcoin Core image

Use a separate Debian 13 **amd64** virtual machine. A VM is a disposable computer that runs inside your usual computer. Open its Terminal and run one block at a time. Downloading and checking an ISO takes no USB stick, wallet, or Bitcoin. The build instructions for each image list additional space and tools.

To **build your own ISO** and check it against the public test candidate, [start at step 4](#4-build-on-a-clean-machine). To **inspect a signed release** or see what changed between versions, start at step 1.

A release has a version (for example, `v0.5.0`), an exact revision of its source code (the **commit**) and a fingerprint of the finished file (the **SHA-256**). A signed list called `SHA256SUMS` connects filenames to their SHA-256 values. To check a rebuild, calculate the SHA-256 of the ISO **you built** and compare it with the value signed for that same release.

## 1. Get the verification tool

In the VM, install the tools and open this guide's directory. The last command displays the small Python program so you can read what it will do. Use the arrow keys to scroll and press `q` to exit.

```sh
sudo apt update
sudo apt install git python3 gnupg curl less
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

Run the line for the product you want to inspect. You can run both in the same directory.

```sh
python3 check_release.py vault v0.5.0
python3 check_release.py node v0.1.0-rc.2
```

Look for `OK` or `Verified existing file` beside the source archive and a final `Source revision` line. The files are in `release-checks/<product>/<version>/`. Vault also includes the separate source archive for its patched Calamares installer. The release pages contain the ISO and package records. For Node, the source to compare is the attached **bitcoin-core-node-…-source.tar.gz**. GitHub's automatic “Source code (zip)” for the release tag contains the public release repository and has different contents.

| Published image | Source revision recorded by its signed files | Release |
| --- | --- | --- |
| Vault v0.5.0 | `723d3a8957e86a06853e3ac059159c71174f3c50` | [Vault files](https://github.com/btcpavao/bitcoin-core-vault-releases/releases/tag/v0.5.0) |
| Node v0.1.0-rc.2 | `0d43a61e82ab1a0ee86a0b916d1215f31f4502e3` | [Node files](https://github.com/btcpavao/bitcoin-core-node-releases/releases/tag/v0.1.0-rc.2) |

To check a downloaded ISO, save it in your VM's Downloads folder and run the matching line. The program prints the expected release filename and the SHA-256 it computed from your local file. A mismatch exits with an error. If you are only reading the source, skip the ISO download.

```sh
python3 check_release.py vault v0.5.0 --iso ~/Downloads/bitcoin-core-vault-32.1-practical-guide-20261110-amd64.iso
python3 check_release.py node v0.1.0-rc.2 --iso ~/Downloads/bitcoin-core-node-v0.1.0-rc.2-core32.1-amd64.iso
```

## 3. See what changed

**Vault.** The public Git repository contains the history. These commands check that the tags resolve to the two revisions named in the signed source records. Run this block from the same guide directory. If either revision check fails, stop before using the diff.

```sh
python3 check_release.py vault v0.4.0
git clone https://github.com/btcpavao/bitcoin-core-vault-releases.git vault-history
(
  set -eu
  old=$(cat release-checks/vault/v0.4.0/SOURCE-COMMIT.txt)
  new=$(cat release-checks/vault/v0.5.0/SOURCE-COMMIT.txt)
  test "$(git -C vault-history rev-parse 'v0.4.0^{commit}')" = "$old"
  test "$(git -C vault-history rev-parse 'v0.5.0^{commit}')" = "$new"
  git -C vault-history diff --stat "$old" "$new"
  git -C vault-history diff "$old" "$new" -- config/includes.chroot/usr/lib/core-vault/guide_content.py
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

You can compare application files without booting or installing the image. For example, these commands compare Node's chain-backup code with the signed source archive. Run step 2 for Node first and verify the downloaded ISO with `--iso`. From the guide directory, use a new working folder:

```sh
sudo apt install xorriso squashfs-tools
(
  set -eu
  mkdir inspect-node
  xorriso -osirrox on -indev ~/Downloads/bitcoin-core-node-v0.1.0-rc.2-core32.1-amd64.iso -extract /live/filesystem.squashfs inspect-node/filesystem.squashfs
  unsquashfs -cat inspect-node/filesystem.squashfs usr/lib/bitcoin-core-node/chain_backup.py > inspect-node/from-iso.py
  tar -xOzf release-checks/node/v0.1.0-rc.2/bitcoin-core-node-v0.1.0-rc.2-source.tar.gz bitcoin-core-node-v0.1.0-rc.2/app/chain_backup.py > inspect-node/from-source.py
  cmp inspect-node/from-source.py inspect-node/from-iso.py
  echo "The source archive and ISO contain identical chain-backup code."
)
```

For Vault v0.5.0, the same method works for the code that checks where wallets are stored. The ISO path is `usr/lib/core-vault/runtime.py`. Its source archive member is `bitcoin-core-vault-v0.5.0-source/config/includes.chroot/usr/lib/core-vault/runtime.py`.

To check the full set of regular files the project copies into the system, run either line after step 2. The tool rechecks the ISO and the source archive against the same signed manifest before opening either. Keep 2 GiB free for temporary files per run.

```sh
python3 check_release.py vault v0.5.0 --iso ~/Downloads/bitcoin-core-vault-32.1-practical-guide-20261110-amd64.iso --inspect
python3 check_release.py node v0.1.0-rc.2 --iso ~/Downloads/bitcoin-core-node-v0.1.0-rc.2-core32.1-amd64.iso --inspect
```

| Image | Files covered by the comparison | Result on 11 November 2026 |
| --- | --- | --- |
| Vault v0.5.0 | 162 regular files from `config/includes.chroot/`, including the two Bitcoin Core executables | 162 matched |
| Node v0.1.0-rc.2 | 156 regular files in `runtime/` and 71 Python modules in `app/` | 227 matched |

The comparison checks the contents of the paths supplied by the source archive. Other files, permissions, symbolic links, installed Debian packages and machine behavior require separate inspection. You can read the path mapping in [inspect_payload.py](inspect_payload.py).

## 4. Build on a clean machine

**Vault v0.5.0 and Node v0.1.0-rc.2 are historical download targets.** Their signed checksums identify the published bytes. Neither release carries an independently confirmed procedure that recreates those exact bytes. Vault v0.5.0 was prepared from an earlier local image. Node's build record also names a previous image, and its original scripts looked up Debian packages from changing repositories. For either historical image, a matching download in step 2 is evidence of integrity. A source rebuild is a separate operation.

### Prepare your build VM

In a fresh Debian 13 amd64 VM, allow 4 CPU cores, 8 GB of memory and at least 50 GB of free disk for one build. Make sure the VM can reach the internet. The commands below install Git, Docker and tools for checking the inputs. Docker runs the build in a clean environment with the tool versions specified by the project.

```bash
sudo apt update
sudo apt install ca-certificates curl docker.io docker-cli git gnupg patch xz-utils
sudo systemctl start docker
sudo docker version
```

The last command should show a **Server** section. Choose Vault or Node below and run its block in Bash from a directory where the named checkout and result folders do not yet exist. The block stops if the download fails or the commit differs. The build can take hours. Each block ends by checking the ISO created on **your** machine against the published candidate digest. Look for the ISO filename followed by `OK`.

### Rebuild the Vault candidate

This recipe builds the Calamares installer, Thunar file manager and Vault Backup from source. These are the three locally modified packages. It assembles them with Debian packages and verified upstream Bitcoin Core and KeePassXC binaries. Two fresh runners produced the same 714,080,256-byte ISO. The release page includes the downloadable image, full commit ID and checksum. [Candidate files](https://github.com/btcpavao/bitcoin-core-vault-releases/releases/tag/native-rebuild-candidate-71242344618b) · [Build instructions at this revision](https://github.com/btcpavao/bitcoin-core-vault-releases/blob/71242344618ba499278ea2abe49d7343a7f9a1c4/docs/NATIVE-REBUILD.md) · [Build logs and byte comparison](https://github.com/btcpavao/bitcoin-core-vault-releases/actions/runs/43015346532/job/130514917458)

```bash
(
  set -eu
  git clone --depth 1 --branch native-rebuild-candidate-71242344618b https://github.com/btcpavao/bitcoin-core-vault-releases.git vault-candidate
  cd vault-candidate
  test "$(git rev-parse HEAD)" = 71242344618ba499278ea2abe49d7343a7f9a1c4
  bash tools/rebuild/build.sh --sudo-docker ../vault-result
  printf '%s  %s\n' 2b8f8fd5225b4b2ccee1d8ccc6847c647cb6f5d2481fa2d9ef94820a13b09ddc ../vault-result/bitcoin-core-vault-amd64.iso | sha256sum --check
)
```

### Rebuild the Node candidate

The recipe authenticates Node's RC2 project sources, applies its public changes and builds the local installer and login screen. Two fresh runners produced the same 1,284,276,224-byte ISO. The release page includes the downloadable image, full commit ID and checksum. [Candidate files](https://github.com/btcpavao/bitcoin-core-node-releases/releases/tag/rebuild-e6519d7e5e95) · [Build instructions at this revision](https://github.com/btcpavao/bitcoin-core-node-releases/blob/e6519d7e5e956aa62512294389a9db2cd0a60a96/docs/REBUILD.md) · [Build logs and byte comparison](https://github.com/btcpavao/bitcoin-core-node-releases/actions/runs/43015398147/job/130513786522)

```bash
(
  set -eu
  git clone --depth 1 --branch rebuild-e6519d7e5e95 https://github.com/btcpavao/bitcoin-core-node-releases.git node-candidate
  cd node-candidate
  test "$(git rev-parse HEAD)" = e6519d7e5e956aa62512294389a9db2cd0a60a96
  sudo bash rebuild/node build ../node-result
  printf '%s  %s\n' 8efaf0fb4f05a7a59554855575e24e178f07a3629cea5c9b9bbe6e5f498691b6 ../node-result/bitcoin-core-node-candidate-amd64.iso | sudo sha256sum --check
)
```

### Inspect changes that produce these candidates

**Vault.** Open the [ISO build recipe changes](https://github.com/btcpavao/bitcoin-core-vault-releases/pull/2/files) and the [changes that build the patched packages from source](https://github.com/btcpavao/bitcoin-core-vault-releases/pull/4/files). The candidate's exact revision and build log show which recipe it used. Look for the files that supply the offline wallet helpers, the installer and the desktop. Debian packages and Bitcoin Core executables are identified by the release records.

**Node.** Open [the build recipe changes](https://github.com/btcpavao/bitcoin-core-node-releases/pull/1/files). The file `rebuild/node.patch` shows each change applied to the signed RC2 sources. To read the finished sources before building, run `bash rebuild/node source ../node-inspection` in your checked-out candidate directory and open the resulting folder. Node also includes upstream firmware packages. Those packages can be identified and hashed even where the vendor does not publish their source.

These are unsigned test candidates. Their exact source revisions, full-image comparisons and checksum records are public. The earlier signed releases can be authenticated separately with step 2.

## 5. Compare the finished images and report the result

In each builder's Terminal type `sha256sum ` (including a space), drag the ISO **from the build output folder** into the Terminal, then press Enter. Record all 64 characters. If both files are on one machine you can also run `cmp first.iso second.iso` with their actual paths. Exit code 0 means every byte matched. Two builds on one provider test repeatability there. A second person using their own machine can provide independent confirmation.

For either unsigned candidate, download the ISO for the exact tag you built. Compare its SHA-256 with the value in step 4 and run `cmp` on the downloaded ISO and your local build. A successful comparison establishes that both files contain the same bytes. See the [website tutorial for both candidates](https://btcpavao.com/en/bitcoin-core/debian-images/#rebuild-tutorial).

For the signed Vault v0.5.0 or Node v0.1.0-rc.2 download, return to the guide directory and use `python3 check_release.py PRODUCT TAG --iso "/path/to/your/downloaded.iso"` with the actual product, version and path. The tool verifies the publisher’s signature on the checksum list and compares your file with the entry for that release. See [how to verify a signed download](https://btcpavao.com/en/bitcoin-core/debian-images/#verify-download).

If any hashes differ, keep both files, record the expected and actual digests and keep the build logs. On a disposable VM with both files, install `diffoscope` and run `diffoscope --text differences.txt first.iso second.iso` with the actual paths. It opens nested filesystems and identifies the first meaningful differences. A timestamp difference still changes the ISO.

When sharing a result, include the product, recipe commit, build command, builder OS/architecture, dependency snapshot or image digest, ISO filename, size and SHA-256, the comparison target, and whether they matched. Keep your own signed report if you use OpenPGP. Reproducibility connects the reviewed inputs to the image bytes. Assessing whether the software handles keys and transactions correctly also requires reviewing those inputs.

## Working with an LLM

Give your assistant the link to this guide and the release or recipe you selected. You can paste the following text:

> I am using a fresh Debian 13 amd64 VM. Walk me through this guide one command at a time. Explain what each command reads, writes, or downloads, where to run it, and what output means success. Wait for my result before moving on. When comparing hashes, tell me which file came from the release and which file I built. If they differ, preserve the logs, show me the first difference and explain it. Use only the selected revision and its documented dependencies.

For help reviewing code, paste a small public diff and ask the assistant to identify the exact file and line supporting each claim. Check that line yourself. Public logs and hashes are enough for build questions. Wallets, passphrases, private keys and private descriptors belong outside the conversation.
