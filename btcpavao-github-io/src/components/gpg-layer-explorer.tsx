import { useId, useState } from "react"
import { ArrowRight, FileLock2, KeyRound, LockKeyhole } from "lucide-react"

const layers = [
  { name: "A", radius: 92, detail: "Encrypt the wallet file.", className: "gpg-layer-a" },
  { name: "B", radius: 128, detail: "Encrypt the file from layer A.", className: "gpg-layer-b" },
  { name: "C", radius: 164, detail: "Encrypt the file from layer B.", className: "gpg-layer-c" },
] as const

export function GpgLayerExplorer() {
  const [count, setCount] = useState(1)
  const id = useId()
  const activeLayers = layers.slice(0, count)
  const recoveryLayers = [...activeLayers].reverse()

  return (
    <figure className="gpg-explorer" aria-labelledby={`${id}-title`}>
      <figcaption>
        <h3 id={`${id}-title`}>One wallet. Layers around it.</h3>
        <p>Each GPG layer wraps the entire file inside it, using its own independently generated passphrase. Add a layer to see what changes.</p>
      </figcaption>
      <div className="gpg-explorer__controls" role="group" aria-label="Number of GPG layers">
        {[1, 2, 3].map((number) => (
          <button key={number} type="button" aria-pressed={count === number} onClick={() => setCount(number)}>
            {number} {number === 1 ? "layer" : "layers"}
          </button>
        ))}
      </div>
      <div className="gpg-explorer__result" aria-live="polite" aria-atomic="true">
        <div className="gpg-explorer__visual">
          <div className="gpg-explorer__drawing">
            <svg viewBox="0 0 360 360" role="img" aria-labelledby={`${id}-diagram-title ${id}-diagram-desc`}>
              <title id={`${id}-diagram-title`}>{`${count} GPG ${count === 1 ? "layer" : "layers"} around one wallet`}</title>
              <desc id={`${id}-diagram-desc`}>
                {`The wallet is at the centre. ${activeLayers.map((layer) => `Layer ${layer.name}: ${layer.detail}`).join(" ")} Open ${recoveryLayers.map((layer) => layer.name).join(", then ")} to recover the wallet file.`}
              </desc>
              {[...activeLayers].reverse().map((layer) => (
                <circle key={layer.name} cx="180" cy="180" r={layer.radius} className={`gpg-explorer__ring ${layer.className}`} />
              ))}
              <circle cx="180" cy="180" r="60" className="gpg-explorer__wallet" />
              <LockKeyhole x="168" y="147" width="24" height="24" className="gpg-explorer__lock" aria-hidden="true" />
              <text x="180" y="195" className="gpg-explorer__wallet-label">wallet.dat</text>
              <text x="180" y="215" className="gpg-explorer__wallet-note">Core-encrypted</text>
              {activeLayers.map((layer) => (
                <g key={layer.name} className={layer.className}>
                  <circle cx="180" cy={180 - layer.radius} r="14" className="gpg-explorer__badge-circle" />
                  <text x="180" y={185 - layer.radius} className="gpg-explorer__badge-label">{layer.name}</text>
                </g>
              ))}
            </svg>
            <p className="gpg-explorer__caption">A look inside the layers.<br />The saved GPG file keeps this content hidden.</p>
          </div>
          <div className="gpg-explorer__legend">
            {activeLayers.map((layer) => (
              <div className="gpg-explorer__legend-row" key={layer.name}>
                <span className={`gpg-explorer__letter ${layer.className}`} aria-hidden="true">{layer.name}</span>
                <div><strong>GPG layer {layer.name}</strong><p>{layer.detail}<br />Opens with passphrase {layer.name}.</p></div>
              </div>
            ))}
            <div className="gpg-explorer__core">
              <KeyRound aria-hidden="true" size={20} />
              <p><strong>Separate Core passphrase</strong><br />Unlocks the wallet’s keys to approve payments.</p>
            </div>
          </div>
        </div>
        <div className="gpg-explorer__recovery">
          <h4>Open the outer layer first</h4>
          <div className="gpg-explorer__flow" aria-label="Recovery order">
            {recoveryLayers.map((layer) => (
              <span className="gpg-explorer__flow-step" key={layer.name}>
                <span className={`gpg-explorer__letter ${layer.className}`}>{layer.name}</span>
                <ArrowRight size={16} aria-hidden="true" />
              </span>
            ))}
            <span>Restore wallet in Core</span>
          </div>
          <p>Use the Core passphrase when you need to sign a payment.</p>
        </div>
        <div className="gpg-explorer__backups">
          <h4>{count + 2} things to keep — copies of each</h4>
          <p className="gpg-explorer__inventory"><FileLock2 size={19} aria-hidden="true" /><span><strong>1 final encrypted file</strong> + <strong>{count + 1} separate passphrases</strong></span></p>
          <p>Keep more than one copy of the final file, passphrase {activeLayers.map((layer) => layer.name).join(", passphrase ")} and the Core passphrase. Keep each passphrase separate from the others and from the file, with copies in different locations.</p>
        </div>
      </div>
      <p className="gpg-explorer__footnote">Start with one GPG layer. Extra layers add extra secrets to protect and recover. Test that you can open every layer using your saved copies.</p>
    </figure>
  )
}
