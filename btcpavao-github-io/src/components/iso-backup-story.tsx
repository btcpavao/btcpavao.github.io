import { Disc3, FileKey2, KeyRound, StickyNote } from "lucide-react"
import { BITCOIN_CORE_WALLET_GUIDE_PATH } from "@/routes"
import "./iso-backup-story.css"

export function IsoBackupStory() {
  return (
    <section className="iso-backup-story" id="wallet-backup-plan" aria-labelledby="wallet-backup-heading">
      <div className="iso-backup-copy">
        <h2 id="wallet-backup-heading">A wallet you can back up like a file</h2>
        <p>You already know most of the steps if you’ve ever saved a document, copied it to a USB drive and opened it on another computer. On Vault, Wallet Backup takes a snapshot of your Core wallet. GnuPG encrypts the whole file. KeePassXC can generate the random words you use to open it.</p>
        <p>Say a relative holds one copy of <code>archive.gpg</code>. The file alone reveals no receiving addresses or balance. Someone else keeping five words on paper sees words, without a clue in the words themselves about which file they open. A name on the disc or the instructions you give someone can still identify its purpose.</p>
        <a href={BITCOIN_CORE_WALLET_GUIDE_PATH + "?setup=vault#optional-backup-protection"}>Try it with an empty wallet</a>
      </div>

      <div className="iso-backup-example">
        <h3>What do you keep?</h3>
        <p>With one GPG layer, keep these two parts in separate places.</p>
        <ul className="iso-backup-parts">
          <li>
            <Disc3 aria-hidden="true" />
            <div><strong>A copy of the encrypted wallet file</strong><span>Copy it to USB or burn it to an optical disc.</span></div>
          </li>
          <li>
            <StickyNote aria-hidden="true" />
            <div><strong>The GPG passphrase</strong><span>Use it to decrypt the file when you need the wallet.</span></div>
          </li>
        </ul>
        <details className="iso-backup-extra">
          <summary><span><KeyRound aria-hidden="true" />What if I use a second passphrase?</span></summary>
          <p>If you also choose <strong>Encrypt Wallet</strong> in Bitcoin Core, keep its passphrase as a third part. The GPG passphrase opens the backup. The Core passphrase unlocks the restored wallet’s signing keys.</p>
          <p>You can also wrap the file in a second GPG layer. Use fresh random words, keep them separately and distribute only the final, outermost file. Each extra layer needs its own passphrase at recovery.</p>
        </details>
      </div>

      <div className="iso-backup-drill">
        <FileKey2 aria-hidden="true" />
        <p><strong>Practise putting the pieces back together.</strong> Make spare copies of each part and store them so a single loss leaves a complete recovery path, and a single keeper cannot assemble it. On a fresh offline computer, bring one copy of each part together, decrypt the file and restore it in Bitcoin Core. Test signing with the recovered wallet.</p>
      </div>
    </section>
  )
}
