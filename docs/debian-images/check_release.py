#!/usr/bin/env python3
"""Verify BTC Pavao release sources or compare a local ISO. Requires Debian 13, curl and GnuPG."""
import argparse
import hashlib
import os
import re
import subprocess
import sys
import tempfile
from pathlib import Path

SIGNER = "787A2AAFB0D119CA0522B2A5B9C99AF8578896D0"


def sha256(path):
    with path.open("rb") as stream:
        return hashlib.file_digest(stream, "sha256").hexdigest()


def download(base_url, name, path):
    subprocess.run(
        ["curl", "--fail", "--location", "--silent", "--show-error", "--retry", "2",
         "--proto", "=https", "--proto-redir", "=https", "--output", str(path), base_url + "/" + name],
        check=True,
    )


def signed_manifest(directory, base_url):
    for name in ("btcpavao-pgp.asc", "SHA256SUMS", "SHA256SUMS.asc"):
        download(base_url, name, directory / name)
    keyring = directory / "release.gpg"
    gpg = ["gpg", "--no-options", "--batch", "--homedir", str(directory)]
    subprocess.run(gpg + ["--output", str(keyring), "--dearmor", str(directory / "btcpavao-pgp.asc")], check=True)
    subprocess.run(
        gpg + ["--no-default-keyring", "--keyring", str(keyring), "--no-auto-key-retrieve",
               "--assert-signer", SIGNER, "--verify",
               str(directory / "SHA256SUMS.asc"), str(directory / "SHA256SUMS")], check=True,
    )
    entries = {}
    for line in (directory / "SHA256SUMS").read_text().splitlines():
        match = re.fullmatch(r"([0-9a-f]{64}) [ *]([A-Za-z0-9][A-Za-z0-9._+-]*)", line)
        if not match or match[2] in entries:
            raise ValueError("Ambiguous or unsupported release manifest entry: " + line)
        entries[match[2]] = match[1]
    return entries


def verify_file(path, expected):
    actual = sha256(path)
    if actual != expected:
        raise ValueError(f"{path.name} differs.\nExpected  {expected}\nComputed  {actual}")
    print(f"OK  {actual}  {path.name}")


def check(args):
    if not re.fullmatch(r"v[0-9]+(?:\.[0-9]+)+(?:-[A-Za-z0-9.]+)?", args.tag):
        raise ValueError("Use the exact version on the release page, including its leading v.")
    repo = f"bitcoin-core-{args.role}-releases"
    base_url = f"https://github.com/btcpavao/{repo}/releases/download/{args.tag}"
    out = args.work / args.role / args.tag
    out.mkdir(parents=True, exist_ok=True)
    with tempfile.TemporaryDirectory(dir=out) as private:
        stage = Path(private).resolve()
        entries = signed_manifest(stage, base_url)
        source_name = f"bitcoin-core-{args.role}-{args.tag}-source.tar.gz"
        if source_name not in entries:
            raise ValueError("The signed manifest has no source archive for the selected product and version.")
        if args.iso:
            images = [name for name in entries if name.endswith(".iso") and name.startswith(f"bitcoin-core-{args.role}-")]
            if len(images) != 1:
                raise ValueError("Expected one ISO for this product in the signed manifest.")
            print("Release ISO:", images[0])
            verify_file(args.iso, entries[images[0]])
        else:
            names = [source_name, "SOURCE-COMMIT.txt"]
            names.extend(n for n in entries if n.endswith("-calamares-source.tar.xz"))
            for name in names:
                if name not in entries:
                    raise ValueError("Missing signed entry: " + name)
                dest = out / name
                if dest.is_file() and sha256(dest) == entries[name]:
                    print("Verified existing file:", dest)
                    continue
                download(base_url, name, stage / name)
                verify_file(stage / name, entries[name])
                os.replace(stage / name, dest)
            print("Source revision:", (out / "SOURCE-COMMIT.txt").read_text().strip())
        for name in ("btcpavao-pgp.asc", "SHA256SUMS", "SHA256SUMS.asc"):
            os.replace(stage / name, out / name)
    print("Verification files:", out)


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("role", choices=("vault", "node"))
    parser.add_argument("tag", help="release version, e.g. v0.5.0")
    parser.add_argument("--iso", type=Path, help="hash an existing file, including a locally built ISO")
    parser.add_argument("--work", type=Path, default=Path("release-checks"), help="folder for verified downloads")
    args = parser.parse_args()
    try:
        check(args)
    except (ValueError, OSError, subprocess.CalledProcessError) as err:
        sys.exit(f"Verification stopped: {err}")


if __name__ == "__main__":
    main()
