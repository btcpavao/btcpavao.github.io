# Verify the sources and rebuild a Bitcoin Core image

Use a separate Debian 13 **amd64** virtual machine. A VM is a disposable computer that runs inside your usual computer. Open its Terminal and run one block at a time. Downloading and checking an ISO takes no USB stick, wallet, or Bitcoin. The build instructions for each image list additional space and tools.

To **build your own ISO** and check it against the signed Vault release or the public Node test candidate, [start at step 4](#4-build-on-a-clean-machine). To **inspect a signed release** or see what changed between versions, start at step 1.

A release has a version (for example, `v0.6.0`), an exact revision of its source code (the **commit**) and a fingerprint of the finished file (the **SHA-256**). A signed list called `SHA256SUMS` connects filenames to their SHA-256 values. To check a rebuild, calculate the SHA-256 of the ISO **you built** and compare it with the value signed for that same release.

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
python3 check_release.py vault v0.6.0
python3 check_release.py node v0.1.0-rc.2
```

Look for `OK` or `Verified existing file` beside the source archive and a final `Source revision` line. The files are in `release-checks/<product>/<version>/`. The Vault source archive includes the source inputs for its patched Calamares installer and Thunar file manager under tools/rebuild/packages/sources/. The release pages contain the ISO and package records. For Node, the source to compare is the attached **bitcoin-core-node-…-source.tar.gz**. GitHub's automatic “Source code (zip)” for the release tag contains the public release repository and has different contents.

| Published image | Source revision recorded by its signed files | Release |
| --- | --- | --- |
| Vault v0.6.0 | `26e590741c968316b99416c51a53b9720d8134cb` | [Vault files](https://github.com/btcpavao/bitcoin-core-vault-releases/releases/tag/v0.6.0) |
| Node v0.1.0-rc.2 | `0d43a61e82ab1a0ee86a0b916d1215f31f4502e3` | [Node files](https://github.com/btcpavao/bitcoin-core-node-releases/releases/tag/v0.1.0-rc.2) |

To check a downloaded ISO, save it in your VM's Downloads folder and run the matching line. The program prints the expected release filename and the SHA-256 it computed from your local file. A mismatch exits with an error. If you are only reading the source, skip the ISO download.

```sh
python3 check_release.py vault v0.6.0 --iso ~/Downloads/bitcoin-core-vault-v0.6.0-amd64.iso
python3 check_release.py node v0.1.0-rc.2 --iso ~/Downloads/bitcoin-core-node-v0.1.0-rc.2-core32.1-amd64.iso
```

## 3. See what changed

**Vault.** The public Git repository contains the history. These commands check that the tags resolve to the two revisions named in the signed source records. Run this block from the same guide directory. If either revision check fails, stop before using the diff.

```sh
python3 check_release.py vault v0.5.0
git clone https://github.com/btcpavao/bitcoin-core-vault-releases.git vault-history
(
  set -eu
  old=$(cat release-checks/vault/v0.5.0/SOURCE-COMMIT.txt)
  new=$(cat release-checks/vault/v0.6.0/SOURCE-COMMIT.txt)
  test "$(git -C vault-history rev-parse 'v0.5.0^{commit}')" = "$old"
  test "$(git -C vault-history rev-parse 'v0.6.0^{commit}')" = "$new"
  git -C vault-history diff --stat "$old" "$new"
  git -C vault-history diff "$old" "$new" -- tools/core-vault/backup-src/src/destinations.py
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

For Vault v0.6.0, the same method works for the code that checks where wallets are stored. The ISO path is `usr/lib/core-vault/runtime.py`. Its source archive member is `bitcoin-core-vault-v0.6.0-source/config/includes.chroot/usr/lib/core-vault/runtime.py`.

To check the full set of regular files the project copies into the system, run either line after step 2. The tool rechecks the ISO and the source archive against the same signed manifest before opening either. Keep 2 GiB free for temporary files per run.

```sh
python3 check_release.py vault v0.6.0 --iso ~/Downloads/bitcoin-core-vault-v0.6.0-amd64.iso --inspect
python3 check_release.py node v0.1.0-rc.2 --iso ~/Downloads/bitcoin-core-node-v0.1.0-rc.2-core32.1-amd64.iso --inspect
```

| Image | Files covered by the comparison | Recorded result |
| --- | --- | --- |
| Vault v0.6.0 | 162 regular files from `config/includes.chroot/`, including the two Bitcoin Core executables | 162 matched on 13 November 2026 |
| Node v0.1.0-rc.2 | 156 regular files in `runtime/` and 71 Python modules in `app/` | 227 matched on 11 November 2026 |

The comparison checks the contents of the paths supplied by the source archive. Other files, permissions, symbolic links, installed Debian packages and machine behavior require separate inspection. You can read the path mapping in [inspect_payload.py](inspect_payload.py).

## 4. Build on a clean machine

**Vault v0.6.0.** The build recipe targets the same ISO distributed with the signed release. Authenticate the downloaded ISO in step 2, then compare your own build with it.

**Node v0.1.0-rc.2.** The signed Node release was prepared with an earlier image and Debian packages from changing repositories. To test a repeatable build, use the separate Node candidate and its checksum below.

### Prepare your build VM

In a fresh Debian 13 amd64 VM, allow 4 CPU cores, 8 GB of memory and at least 50 GB of free disk for one build. Make sure the VM can reach the internet. The commands below install Git, Docker and tools for checking the inputs. Docker runs the build in a clean environment with the tool versions specified by the project.

```bash
sudo apt update
sudo apt install ca-certificates curl docker.io docker-cli git gnupg patch xz-utils
sudo systemctl start docker
sudo docker version
```

The last command should show a **Server** section. Choose Vault or Node below and run its block in Bash from a directory where the named checkout and result folders do not yet exist. The block stops if the download fails or the commit differs. The build can take hours. Each block ends by checking the ISO created on **your** machine against the published SHA-256 for that image. Look for the ISO filename followed by `OK`.

### Rebuild Vault v0.6.0

This recipe builds the Calamares installer, Thunar file manager and Vault Backup from source. These are the three locally modified packages. It assembles them with Debian packages and verified upstream Bitcoin Core and KeePassXC binaries. The tagged recipe targets the 714,080,256-byte release ISO. The release page includes the signed checksum list, ISO, package inventory and source archive. [Signed release files](https://github.com/btcpavao/bitcoin-core-vault-releases/releases/tag/v0.6.0) · [Build instructions at this revision](https://github.com/btcpavao/bitcoin-core-vault-releases/blob/26e590741c968316b99416c51a53b9720d8134cb/docs/NATIVE-REBUILD.md) · [Build logs and byte comparison](https://github.com/btcpavao/bitcoin-core-vault-releases/actions/runs/43397223031)

```bash
(
  set -eu
  git clone --depth 1 --branch v0.6.0 https://github.com/btcpavao/bitcoin-core-vault-releases.git vault-release
  cd vault-release
  test "$(git rev-parse HEAD)" = 26e590741c968316b99416c51a53b9720d8134cb
  bash tools/rebuild/build.sh --sudo-docker ../vault-result
  printf '%s  %s\n' d1e3656099875e6cde7ed6c78fcf9ee3217d8bed4f8ccd5500b4231ad6bfa8ba ../vault-result/bitcoin-core-vault-amd64.iso | sha256sum --check
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

### Inspect the source changes

**Vault.** Review the [changes since v0.5.0](https://github.com/btcpavao/bitcoin-core-vault-releases/compare/v0.5.0...26e590741c968316b99416c51a53b9720d8134cb) and the [source inputs for the patched packages](https://github.com/btcpavao/bitcoin-core-vault-releases/tree/26e590741c968316b99416c51a53b9720d8134cb/tools/rebuild/packages/sources). The release revision and build log identify the recipe. The signed package inventory identifies the installed Debian packages.

**Node.** Open [the build recipe changes](https://github.com/btcpavao/bitcoin-core-node-releases/pull/1/files). The file `rebuild/node.patch` shows each change applied to the signed RC2 sources. To read the finished sources before building, run `bash rebuild/node source ../node-inspection` in your checked-out candidate directory and open the resulting folder. Node also includes upstream firmware packages. Those packages can be identified and hashed even where the vendor does not publish their source.

Each recipe links to a public revision, comparison run and checksum record. Authenticate the signed Vault download in step 2. The Node candidate has a published checksum, while the separate Node RC2 download has a signed manifest.

## 5. Compare the finished images and report the result

In each builder's Terminal type `sha256sum ` (including a space), drag the ISO **from the build output folder** into the Terminal, then press Enter. Record all 64 characters. If both files are on one machine you can also run `cmp first.iso second.iso` with their actual paths. Exit code 0 means every byte matched. Two builds on one provider test repeatability there. A second person using their own machine can provide independent confirmation.

Download the Vault v0.6.0 release ISO or the Node candidate ISO for the exact tag you built. Compare its SHA-256 with the value in step 4 and run `cmp` on the downloaded ISO and your local build. A successful comparison establishes that both files contain the same bytes. See the [website rebuild tutorial](https://btcpavao.com/en/bitcoin-core/debian-images/#rebuild-tutorial).

For the signed Vault v0.6.0 or Node v0.1.0-rc.2 download, return to the guide directory and use `python3 check_release.py PRODUCT TAG --iso "/path/to/your/downloaded.iso"` with the actual product, version and path. The tool verifies the publisher’s signature on the checksum list and compares your file with the entry for that release. See [how to verify a signed download](https://btcpavao.com/en/bitcoin-core/debian-images/#verify-download).

If any hashes differ, keep both files, record the expected and actual digests and keep the build logs. On a disposable VM with both files, install `diffoscope` and run `diffoscope --text differences.txt first.iso second.iso` with the actual paths. It opens nested filesystems and identifies the first meaningful differences. A timestamp difference still changes the ISO.

When sharing a result, include the product, recipe commit, build command, builder OS/architecture, dependency snapshot or image digest, ISO filename, size and SHA-256, the comparison target, and whether they matched. Keep your own signed report if you use OpenPGP. Reproducibility connects the reviewed inputs to the image bytes. Assessing whether the software handles keys and transactions correctly also requires reviewing those inputs.

## Working with an LLM

Give your assistant the link to this guide and the release or recipe you selected. You can paste the following text:

> I am using a fresh Debian 13 amd64 VM. Walk me through this guide one command at a time. Explain what each command reads, writes, or downloads, where to run it, and what output means success. Wait for my result before moving on. When comparing hashes, tell me which file came from the release and which file I built. If they differ, preserve the logs, show me the first difference and explain it. Use only the selected revision and its documented dependencies.

For help reviewing code, paste a small public diff and ask the assistant to identify the exact file and line supporting each claim. Check that line yourself. Public logs and hashes are enough for build questions. Wallets, passphrases, private keys and private descriptors belong outside the conversation.
