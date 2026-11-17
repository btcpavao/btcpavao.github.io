import { useState } from "react"
import { Clipboard, MessageCircle, Smartphone } from "lucide-react"
import { BITCOIN_CORE_WALLET_GUIDE_PATH } from "@/routes"
import { SITE_URL } from "@/site-config"
import { DEBIAN_IMAGES_PATH } from "./debian-images-notice"
import { EtcherUsbSteps } from "./etcher-usb-steps"
import { SignedDownloadCheck } from "./signed-download-check"
import { ZoomableImage } from "./zoomable-image"
import "./vault-first-run.css"

const bootGuide = SITE_URL + DEBIAN_IMAGES_PATH + "#boot-vault"

function PhoneGuide() {
  const [message, setMessage] = useState("")

  async function copyGuide() {
    try {
      await navigator.clipboard.writeText(bootGuide)
      setMessage("Link copied.")
    } catch {
      setMessage("Use your browser’s copy-link command on the address above.")
    }
  }

  return (
    <details className="first-run-phone">
      <summary><Smartphone aria-hidden="true" size={18} /> Open these steps on your phone</summary>
      <div className="first-run-phone__content">
        <img src="/software/vault-boot-guide-qr.png" width="328" height="328" loading="lazy" alt="QR code for the boot instructions linked here." />
        <div>
          <p>Scan this code before you restart. You can follow the steps and ask for help on your phone while Vault stays offline.</p>
          <a href={bootGuide} className="first-run-phone__url">{bootGuide}</a>
          <button type="button" onClick={copyGuide}><Clipboard size={16} aria-hidden="true" /> Copy link</button>
          <p className="first-run-phone__status" role="status">{message}</p>
        </div>
      </div>
    </details>
  )
}

function AskAboutStep({ href, label }: { href: string; label: string }) {
  return <a className="first-run-ask" href={href}><MessageCircle aria-hidden="true" size={16} />{label}</a>
}

type FirstRunShot = { src: string; fullSrc?: string; alt: string; width: number; height: number }

function StepImage({ shot, caption }: { shot: FirstRunShot; caption: string }) {
  return (
    <figure className="first-run-shot">
      <ZoomableImage {...shot} loading="lazy" decoding="async" />
      <figcaption>{caption} <a href={shot.fullSrc ?? shot.src} aria-label={"Full screenshot: " + shot.alt}>Full screenshot</a></figcaption>
    </figure>
  )
}

export function VaultFirstRun({ vaultIso }: { vaultIso: string }) {
  return (
    <section className="vault-first-run" id="first-run" aria-labelledby="first-run-heading">
      <h3 id="first-run-heading" className="text-xl font-semibold">What you need for the Vault trial</h3>
      <ul className="my-3 max-w-prose list-disc space-y-1 pl-5 leading-7">
        <li>A spare <strong>64-bit Intel or AMD computer</strong> to run Vault offline.</li>
        <li>A <strong>USB stick you can erase</strong> for the boot image. Prepare it on a Windows, macOS or Debian computer.</li>
        <li>A <strong>separate backup drive</strong> if you want to keep the practice wallet after shutdown.</li>
      </ul>
      <p>You can create an unfunded wallet and see your first receiving address in Live RAM without installing Vault or downloading the blockchain.</p>
      <ol className="first-run-steps" role="list">
        <li>
          <h3><span aria-hidden="true">1</span> Verify your copy of Vault</h3>
          <p><a href={vaultIso}>Download the Vault ISO</a> and check it against Pavao’s signed list before writing it to USB.</p>
          <SignedDownloadCheck product="Vault" />
        </li>
        <li id="prepare-usb">
          <h3><span aria-hidden="true">2</span> Write the verified ISO to a USB stick</h3>
          <div className="first-run-row">
            <div>
              <p><strong>Writing the image erases the entire selected drive.</strong> Unplug your backup drives and connect the boot USB.</p>
              <EtcherUsbSteps />
              <p><strong>On Debian 13,</strong> right-click the verified ISO and choose <strong>Open With → Disk Image Writer</strong> in <a href="https://apps.gnome.org/DiskUtility/">GNOME Disks</a>. Under <strong>Destination</strong>, match the USB stick by model and capacity. Choose <strong>Start Restoring…</strong> and confirm with <strong>Restore</strong>. Safely eject the stick when writing finishes.</p>
              <p>If you verified in a virtual machine, write the same verified file from a system with access to your USB stick.</p>
              <AskAboutStep href="#ask-usb" label="Ask Pavao about the USB" />
            </div>
            <StepImage shot={{
              src: "/software/screenshots/verification/vault-usb-target.webp",
              width: 505, height: 236,
              alt: "Restore Disk Image shows the Vault v0.7.0 ISO and the selected destination, an 8.0 GB Practice USB Drive.",
            }} caption="On Debian 13, the 714 MB image fits on this 8.0 GB virtual USB. The size notice is expected. Identify your stick by its own name and capacity." />
          </div>
          <PhoneGuide />
        </li>
        <li id="boot-vault">
          <h3><span aria-hidden="true">3</span> Start the spare computer from USB</h3>
          <div className="first-run-row">
            <div>
              <p>Shut down the spare computer, unplug its network cable and leave Wi-Fi off. Insert the prepared USB. Power on, open the computer’s one-time boot menu and select the USB stick. The key for that menu depends on the computer.</p>
              <p>In the Vault menu choose <strong>Start Bitcoin Core Vault (Live RAM)</strong>. This runs the system from the USB without installing it on the internal drive.</p>
              <p>When the desktop appears, look for <strong>Bitcoin Core</strong>. If you see your usual desktop instead, restart and select the USB from the boot menu again.</p>
              <AskAboutStep href="#ask-boot" label="Ask Pavao about starting Vault" />
            </div>
            <StepImage shot={{
              src: "/software/screenshots/verification/vault-v070-menu-detail.webp",
              fullSrc: "/software/screenshots/verification/vault-v070-live-menu.webp",
              width: 312, height: 46,
              alt: "The first row, Start Bitcoin Core Vault (Live RAM), is highlighted above Install Bitcoin Core Vault.",
            }} caption="With the Live RAM row highlighted, press Enter. This is the UEFI menu in Vault v0.7.0." />
          </div>
        </li>
        <li id="practice-wallet">
          <h3><span aria-hidden="true">4</span> Create a practice receiving address</h3>
          <div className="first-run-row">
            <div>
              <p>Open <strong>Bitcoin Core</strong> from the Vault desktop and choose <strong>File → Create Wallet…</strong>. Name it <strong>Practice Wallet</strong>. For the disposable wallet shown here, leave the defaults and click <strong>Create</strong>. To practise wallet encryption too, select <strong>Encrypt Wallet</strong> before clicking Create and set a fresh practice passphrase.</p>
              <p>Open <strong>Receive</strong>, enter <strong>Recovery check</strong> in the Label field and click <strong>Create new receiving address</strong>.</p>
              <p>Leave this address unfunded. Record the address and label if you want to test your backup in the next step.</p>
              <AskAboutStep href="#ask-wallet" label="Ask Pavao about the practice wallet" />
            </div>
            <StepImage shot={{
              src: "/software/screenshots/verification/vault-v070-address-detail.webp",
              fullSrc: "/software/screenshots/verification/vault-v070-practice-address.webp",
              width: 383, height: 61,
              alt: "The Address, Label and Wallet fields show a receiving address, Recovery check and Practice Wallet.",
            }} caption="Look for your wallet name and label. Bitcoin Core will show your own address here." />
          </div>
        </li>
        <li id="backup-wallet">
          <h3><span aria-hidden="true">5</span> Keep an encrypted wallet backup</h3>
          <div className="first-run-row">
            <div>
              <p>Connect the separate backup drive and open <strong>Wallet Backup</strong>. Choose your practice wallet, select the backup drive under <strong>Save to</strong> and set a backup passphrase.</p>
              <p>Before shutting down, check that the encrypted file is on the drive. Store the backup passphrase separately from the file. If you selected <strong>Encrypt Wallet</strong> in Core, keep its passphrase too. In a fresh offline session, restore the wallet and look for the address and label you recorded.</p>
              <a href={BITCOIN_CORE_WALLET_GUIDE_PATH + "?setup=vault#step-7"}>Follow the backup and recovery exercise</a>
            </div>
            <StepImage shot={{
              src: "/software/screenshots/vault/v0.7.0/encrypted-backup-usb.webp", width: 560, height: 195,
              fullSrc: "/software/screenshots/vault/v0.7.0/encrypted-backup-usb-full.webp",
              alt: "Vault’s Save to field shows the TRANSFER USB drive and the destination /media/vault/TRANSFER/wallet.dat.gpg.",
            }} caption="Vault v0.7.0 shows wallet.dat.gpg on the drive named TRANSFER. On your computer, check the name of your own backup drive." />
          </div>
        </li>
      </ol>
      <div className="first-run-followup">
        <nav className="first-run-links" aria-label="More practice">
          <a href="#node-setup">Set up the online Node</a>
          <a href="#practice-without-funds">See how offline signing works</a>
          <AskAboutStep href="#ask-feedback" label="Tell Pavao how the Vault trial went" />
        </nav>
      </div>
    </section>
  )
}
