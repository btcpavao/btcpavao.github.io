"""Compare regular project files in a verified source archive with their shipped bytes."""
import hashlib
import subprocess
import tarfile
from pathlib import Path


def project_files(archive, role, version):
    if role == "vault" and version in ("v0.5.0", "v0.6.0"):
        roots = {f"bitcoin-core-vault-{version}-source/config/includes.chroot/": ""}
    elif (role, version) == ("node", "v0.1.0-rc.2"):
        roots = {
            "bitcoin-core-node-v0.1.0-rc.2/runtime/": "",
            "bitcoin-core-node-v0.1.0-rc.2/app/": "usr/lib/bitcoin-core-node/",
        }
    else:
        raise ValueError("This source-to-ISO mapping covers Vault v0.5.0, Vault v0.6.0 and Node v0.1.0-rc.2.")
    expected = {}
    with tarfile.open(archive, "r:gz") as tar:
        for member in tar:
            if not member.isfile():
                continue
            for prefix, installed in roots.items():
                if not member.name.startswith(prefix):
                    continue
                name = member.name[len(prefix):]
                if installed and ("/" in name or not name.endswith(".py")):
                    continue
                if not name or any(part in ("", ".", "..") for part in name.split("/")) or not name.isprintable():
                    raise ValueError("Unexpected project path in signed archive: " + repr(name))
                path = installed + name
                if path in expected:
                    raise ValueError("Two source files map to " + path)
                with tar.extractfile(member) as stream:
                    expected[path] = hashlib.file_digest(stream, "sha256").hexdigest()
    if not expected:
        raise ValueError("No project files found in the verified archive.")
    return expected


def compare_payload(archive, iso, stage, role, version):
    expected = project_files(archive, role, version)
    image = stage / "filesystem.squashfs"
    root = stage / "root"
    listing = stage / "project-files.txt"
    listing.write_text("".join(path + "\n" for path in sorted(expected)))
    subprocess.run(["xorriso", "-osirrox", "on", "-indev", str(iso.resolve()),
                    "-extract", "/live/filesystem.squashfs", str(image)], check=True)
    subprocess.run(["unsquashfs", "-no-xattrs", "-no-progress", "-no-wildcards",
                    "-d", str(root), "-extract-file", str(listing), str(image)], check=True)
    failures = []
    for name, digest in sorted(expected.items()):
        path = root / name
        if path.resolve() != path or not path.is_file():
            failures.append(name + " (missing regular file)")
        else:
            with path.open("rb") as stream:
                if hashlib.file_digest(stream, "sha256").hexdigest() != digest:
                    failures.append(name + " (different bytes)")
    if failures:
        raise ValueError("Source-to-ISO differences:\n" + "\n".join(failures))
    print(f"MATCH  {len(expected)} regular project files have the same bytes in the source archive and the ISO.")
