import { SectionIcon } from "@/components/section-icon"
import { useState } from "react"

const media = [
  {
    name: "USB flash drive",
    benefit: "Small, inexpensive and easy to keep offline.",
    failure:
      "Can fail without warning; a connector can break or the drive can disappear. Unpowered flash is not an indefinite archive.",
    durability:
      "Test reads and real restoration; replace or refresh according to observed condition and manufacturer guidance. No fixed lifespan is promised.",
    tamper:
      "Easy to substitute or infect while being handled. Keep backup media separate from routine PSBT transfers.",
    location: "Copies in the same room share theft, fire and flood exposure.",
    dependency:
      "A working USB reader, compatible filesystem and another good copy if bits become unreadable.",
  },
  {
    name: "External SSD",
    benefit:
      "Convenient for several current encrypted files and periodic verified copies.",
    failure:
      "Controller failure, cable damage and charge loss during long unpowered storage can make data inaccessible.",
    durability:
      "Use a maintained rotation and test recovery; capacity and brand do not establish long-term retention.",
    tamper:
      "Physical substitution and a compromised computer writing to it remain possible.",
    location:
      "A drive beside the signer shares its local disaster risks; use a separate location for independence.",
    dependency:
      "A compatible enclosure, connector, filesystem and healthy controller.",
  },
  {
    name: "Write-once optical disc",
    benefit: "A finalized write-once copy is harder to overwrite accidentally.",
    failure:
      "Scratches, coating degradation, poor recording quality or an unavailable reader can prevent recovery.",
    durability:
      "Read back after writing and periodically test with a working drive. Do not rely on an unverified marketing lifetime.",
    tamper:
      "Write-once does not prevent substitution, theft or deliberate destruction.",
    location:
      "Keep protected from heat, moisture and light; separate copies from shared fire and flood hazards.",
    dependency:
      "A compatible optical drive, supported disc format and a current backup when wallet state changes.",
  },
  {
    name: "Encrypted cloud copy",
    benefit: "A remote copy can survive loss of the home and local equipment.",
    failure:
      "Account loss, provider deletion, synchronization mistakes or service shutdown can remove access.",
    durability:
      "Periodically download and restore the actual stored version; do not count a successful upload as a recovery test.",
    tamper:
      "The provider or a compromised account may replace, delete or retain older versions. Core metadata may remain readable unless separately encrypted.",
    location:
      "Geographic independence helps with local fire or flood, but provider and account failures are separate risks.",
    dependency:
      "Provider, internet access, account recovery and any outer-encryption tool. Keep the wallet passphrase outside this storage account.",
  },
  {
    name: "Trusted remote copy",
    benefit:
      "A person at another location can hold an encrypted file without needing its wallet passphrase.",
    failure:
      "That person may lose the medium, discard it, become unavailable or misunderstand the arrangement.",
    durability:
      "Agree on checks and replacement; demonstrate access to the exact file at review time.",
    tamper:
      "The holder can copy, replace or destroy the file. Encryption protects keys, not availability or all metadata.",
    location:
      "Choose a location that does not share the same disaster exposure as your other copies.",
    dependency:
      "The person, medium, contact route and clear authority to release the copy during recovery.",
  },
  {
    name: "Second computer",
    benefit:
      "A familiar reader and filesystem make periodic restoration convenient.",
    failure:
      "Malware, disk failure and automatic cleanup can affect it; a live duplicate signing wallet creates additional exposure.",
    durability:
      "Keep software maintained and test the saved encrypted backup, not just a shortcut to another machine.",
    tamper:
      "An online second machine can expose metadata and hold a ciphertext target. Do not restore real offline private keys onto it casually.",
    location:
      "A second laptop in the same building does not provide off-site disaster protection.",
    dependency:
      "That operating system, storage and maintenance; an independent removable or remote copy still matters.",
  },
  {
    name: "Off-site storage",
    benefit:
      "Separates the backup from a local theft, fire or flood. This is a location choice, not a medium.",
    failure:
      "Access restrictions, forgotten arrangements or a disaster at the remote location can prevent recovery.",
    durability:
      "The selected USB, SSD or optical medium still needs testing and renewal.",
    tamper:
      "Consider who can enter, inspect, replace or withhold the stored object.",
    location:
      "Choose meaningful geographic separation and consider correlated hazards rather than counting addresses.",
    dependency:
      "The location’s access rules, the medium and recoverable instructions; keep the passphrase’s access plan separate.",
  },
]
export function BackupMediaExplorer() {
  const [selected, setSelected] = useState(0)
  const item = media[selected]
  return (
    <section className="course-explorer" aria-label="Backup media comparison">
      <h2 className="learning-heading">
        <SectionIcon topic="Compare one storage choice at a time" />
        <span>Compare one storage choice at a time</span>
      </h2>
      <label className="course-explorer__choice">
        Medium or location
        <select
          value={selected}
          onChange={(e) => setSelected(Number(e.target.value))}
        >
          {media.map((m, i) => (
            <option key={m.name} value={i}>
              {m.name}
            </option>
          ))}
        </select>
      </label>
      <dl className="course-media-detail">
        {[
          ["Benefit", item.benefit],
          ["Failure and bit loss", item.failure],
          ["Longevity and checks", item.durability],
          ["Tampering", item.tamper],
          ["Fire, flood and location", item.location],
          ["Recovery dependency", item.dependency],
        ].map(([label, value]) => (
          <div key={label}>
            <dt>{label}</dt>
            <dd>{value}</dd>
          </div>
        ))}
      </dl>
      <p className="course-local-note">
        Choose only what your threat model and maintenance capacity justify. Two
        independently recoverable copies are more useful than many untested ones
        with the same point of failure.
      </p>
    </section>
  )
}
