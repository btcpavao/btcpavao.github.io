import { useState } from "react"
import { Clipboard, MessageCircle, Smartphone } from "lucide-react"
import { BITCOIN_CORE_WALLET_GUIDE_PATH } from "@/routes"
import { SITE_URL } from "@/site-config"
import { DEBIAN_IMAGES_PATH } from "./debian-images-notice"
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
      <h2 id="first-run-heading">Start Vault for the first time</h2>
      <p>Use a spare 64-bit Intel or AMD computer and a USB stick you can erase. Your goal is to open Bitcoin Core and see your own practice receiving address. You can do this offline without installing Vault, running a Node or downloading the blockchain.</p>
      <ol className="first-run-steps" role="list">
        <li>
          <h3><span aria-hidden="true">1</span> Verify your copy of Vault</h3>
          <p>On your everyday computer, <a href={vaultIso}>download the Vault ISO</a>. Check that your file matches the release Pavao signed before writing it to USB.</p>
          <SignedDownloadCheck product="Vault" />
        </li>
        <li id="prepare-usb">
          <h3><span aria-hidden="true">2</span> Write the verified ISO to a USB stick</h3>
          <div className="first-run-row">
            <div>
              <p><strong>Writing the image erases the entire selected drive.</strong> Unplug any backup drives. Connect the USB stick you set aside and check its model and capacity.</p>
              <p>On a Debian 13 desktop with <a href="https://apps.gnome.org/DiskUtility/">GNOME Disks</a>, right-click the verified ISO and choose <strong>Open With → Disk Image Writer</strong>. In <strong>Restore Disk Image</strong>, choose the USB stick under <strong>Destination</strong>. Check its model and capacity again, then choose <strong>Start Restoring…</strong> and confirm with <strong>Restore</strong>.</p>
              <p>Wait for writing to finish, then safely eject the stick. If you verified in a virtual machine, the computer running Disks must have access to the actual USB stick and the same verified file.</p>
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
          <h3><span aria-hidden="true">4</span> Create an empty wallet and see your first address</h3>
          <div className="first-run-row">
            <div>
              <p>Open <strong>Bitcoin Core</strong> from the Vault desktop and choose <strong>File → Create Wallet…</strong>. Name it <strong>Practice Wallet</strong>. For the disposable wallet shown here, leave the defaults and click <strong>Create</strong>. To practise wallet encryption too, select <strong>Encrypt Wallet</strong> before clicking Create and set a fresh practice passphrase.</p>
              <p>Open <strong>Receive</strong>, enter <strong>Recovery check</strong> in the Label field and click <strong>Create new receiving address</strong>.</p>
              <p>When Core displays your address, you have finished the first run. Leave the address unfunded. The wallet in this live session disappears when you shut down.</p>
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
      </ol>
      <div className="first-run-followup">
        <h3>Did Vault start on your computer?</h3>
        <a className="first-run-feedback" href="#ask-feedback"><MessageCircle size={18} aria-hidden="true" /> Tell Pavao how it went</a>
        <p>To keep practising with this wallet, record its address and label and make an encrypted backup on a second drive before you shut down. Then try restoring it.</p>
        <nav className="first-run-links" aria-label="More practice">
          <a href={BITCOIN_CORE_WALLET_GUIDE_PATH + "?setup=vault#step-7"}>Back up and restore the practice wallet</a>
          <a href="#practice-without-funds">See how offline signing works</a>
        </nav>
      </div>
    </section>
  )
}
