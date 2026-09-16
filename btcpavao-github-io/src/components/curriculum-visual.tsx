import { useId, type ReactNode } from "react"
import {
  ArrowDown,
  ArrowRight,
  Check,
  CircleHelp,
  Copy,
  FileText,
  FlaskConical,
  HardDrive,
  KeyRound,
  Layers,
  LockKeyhole,
  Monitor,
  Network,
  OctagonX,
  Repeat2,
  Sparkles,
  UserRound,
  Wallet,
  Wifi,
  WifiOff,
} from "lucide-react"
import {
  exampleTransaction,
  visualCatalog,
  visualsFor,
  type VisualDefinition,
  type VisualNode,
  type VisualPlacement,
  type VisualTarget,
} from "@/curriculum/visuals"
import "./curriculum-visual.css"

const icons = {
  drive: HardDrive,
  key: KeyRound,
  keys: KeyRound,
  file: FileText,
  person: UserRound,
  computer: Monitor,
  check: Check,
  copy: Copy,
  network: Network,
  wallet: Wallet,
  spark: Sparkles,
  lock: LockKeyhole,
  question: CircleHelp,
  flask: FlaskConical,
  blocks: Layers,
  transfer: Repeat2,
  stop: OctagonX,
}
function Icon({ name }: { name: string }) {
  const Component = icons[name as keyof typeof icons] ?? FileText
  return <Component aria-hidden="true" />
}
function Card({
  title,
  body,
  icon = "file",
  active = false,
}: VisualNode & { active?: boolean }) {
  return (
    <div className={`cv-card${active ? "cv-card--active" : ""}`}>
      <Icon name={icon} />
      <div>
        <strong>{title}</strong>
        <p>{body}</p>
        {active && <span className="cv-current">Current focus</span>}
      </div>
    </div>
  )
}
function Arrow({ children }: { children: ReactNode }) {
  return (
    <div className="cv-arrow">
      <ArrowDown aria-hidden="true" />
      <span>{children}</span>
    </div>
  )
}
function Zone({
  name,
  offline,
  children,
}: {
  name: string
  offline?: boolean
  children: ReactNode
}) {
  return (
    <section className={`cv-zone${offline ? "cv-zone--offline" : ""}`}>
      <h4>
        {offline ? <WifiOff aria-hidden="true" /> : <Wifi aria-hidden="true" />}
        {name}
      </h4>
      {children}
    </section>
  )
}
export function SigningMap({
  mode = "architecture",
  active,
}: {
  mode?: "architecture" | "psbt" | "descriptors" | "recovery"
  active?: number
}) {
  const recovery = mode === "recovery"
  const psbt = mode === "psbt"
  return (
    <div className="cv-signing-map">
      {recovery && (
        <div className="cv-excluded">
          <OctagonX aria-hidden="true" />
          Original node and original signer are unavailable
        </div>
      )}
      <div className="cv-zones">
        <Zone
          name={
            recovery
              ? "Replacement online coordinator"
              : "Online node + watch-only wallet"
          }
        >
          <Card
            title={recovery ? "Rebuild from public data" : "Verify and prepare"}
            body={
              recovery
                ? "Sync the node; import the recovered public descriptors."
                : "Validate history, track outputs and prepare the payment proposal."
            }
            icon="network"
            active={recovery ? active === 1 : psbt && active === 0}
          />
          {psbt && (
            <Card
              title="Return, finalize, extract, broadcast"
              body="Return the signed PSBT. Submit the extracted transaction from the online node."
              icon="check"
              active={active === 3}
            />
          )}
          <span className="cv-boundary-label">No private signing keys</span>
        </Zone>
        <Zone
          name={
            recovery ? "Replacement offline signer" : "Offline signing wallet"
          }
          offline
        >
          {recovery ? (
            <Card
              title="Restore offline"
              body="Encrypted private backup + separately recovered passphrase."
              icon="drive"
              active={active === 0}
            />
          ) : (
            <>
              <Card
                title="Review every output"
                body="Check recipient, amount, change and fee on this device."
                icon="file"
                active={psbt && active === 1}
              />
              <Card
                title="Sign and save"
                body="Private key material stays here; only signatures are added to the PSBT. No blockchain download is needed to sign."
                icon="key"
                active={psbt && active === 2}
              />
            </>
          )}
          <span className="cv-boundary-label">
            <KeyRound aria-hidden="true" />
            Private keys remain inside this offline device
          </span>
        </Zone>
      </div>
      <dl className="cv-transfers">
        <div>
          <dt>Offline → online</dt>
          <dd>
            Public receive + change descriptors{" "}
            {mode === "descriptors" &&
              "· both devices recognize the same outputs"}
          </dd>
        </div>
        {mode !== "descriptors" && (
          <>
            <div>
              <dt>Online → offline</dt>
              <dd>Unsigned PSBT file for review</dd>
            </div>
            <div>
              <dt>Offline → online</dt>
              <dd>Signed PSBT file for finalization and broadcast</dd>
            </div>
          </>
        )}
      </dl>
      {recovery && (
        <Card
          title="Prove the replacement path"
          body="Review and sign offline, broadcast online, then verify the test transaction confirms."
          icon="check"
          active={active === 2}
        />
      )}
    </div>
  )
}
function Transaction() {
  const n = (v: number) => `${v.toLocaleString("en-US")} sats`
  return (
    <div className="cv-transaction">
      <Card
        title="Input · spent in full"
        body={n(exampleTransaction.input)}
        icon="wallet"
      />
      <Arrow>Two outputs</Arrow>
      <div className="cv-grid">
        <Card
          title="Payment · your test address"
          body={n(exampleTransaction.payment)}
          icon="wallet"
        />
        <Card
          title="Change · back to your wallet"
          body={n(exampleTransaction.change)}
          icon="wallet"
        />
      </div>
      <div className="cv-equation">
        <strong>Fee = input − outputs</strong>
        <span>
          {n(exampleTransaction.input)} − ({n(exampleTransaction.payment)} +{" "}
          {n(exampleTransaction.change)}) = {n(exampleTransaction.fee)}
        </span>
      </div>
    </div>
  )
}
function Verification({ active }: { active?: number }) {
  return (
    <ol className="cv-verification">
      {[
        [
          "Archive ↔ SHA256SUMS",
          "Hash",
          "Do these downloaded bytes match the listed digest?",
        ],
        [
          "SHA256SUMS ↔ SHA256SUMS.asc",
          "Signature",
          "Did the holder of this builder key sign these checksums?",
        ],
        [
          "Key fingerprint ↔ independent identity evidence",
          "Identity",
          "Is this the intended builder’s key? Confirm its fingerprint separately.",
        ],
      ].map(([relation, title, body], index) => (
        <li key={title} className={active === index ? "cv-card--active" : ""}>
          <span className="cv-number">{index + 1}</span>
          <div>
            <strong>{title}</strong>
            <code>{relation}</code>
            <p>{body}</p>
            {active === index && (
              <span className="cv-current">Current focus</span>
            )}
          </div>
        </li>
      ))}
    </ol>
  )
}
function Diagram({
  definition: d,
  active,
}: {
  definition: VisualDefinition
  active?: number
}) {
  if (d.layout === "scene")
    return (
      <img
        className="cv-scene"
        src={d.src}
        alt={d.alt}
        width="1200"
        height="675"
        loading="lazy"
        decoding="async"
      />
    )
  if (["architecture", "psbt", "descriptors", "recovery"].includes(d.layout))
    return (
      <SigningMap
        mode={d.layout as "architecture" | "psbt" | "descriptors" | "recovery"}
        active={active}
      />
    )
  if (d.layout === "transaction") return <Transaction />
  if (d.layout === "verification") return <Verification active={active} />
  if (d.layout === "encryption")
    return (
      <div className="cv-encryption">
        <span className="cv-boundary-label">Wallet file</span>
        <div className="cv-grid">
          <div className="cv-private">
            <LockKeyhole aria-hidden="true" />
            <strong>Encrypted scope</strong>
            <p>Private key material</p>
          </div>
          <Card
            title="Outside that scope"
            body="Public keys, addresses, labels and transaction history may still be readable."
            icon="file"
          />
        </div>
      </div>
    )
  if (d.layout === "combine")
    return (
      <div className="cv-branching">
        <Card
          title="One unsigned PSBT"
          body="Exactly the same proposed transaction goes to both signers."
          icon="file"
        />
        <Arrow>Copy the same proposal for independent review</Arrow>
        <div className="cv-grid">
          <Card
            title="Signer A → partial PSBT A"
            body="A reviews and adds its signature."
            icon="key"
          />
          <Card
            title="Signer B → partial PSBT B"
            body="B reviews and adds its signature."
            icon="key"
          />
        </div>
        <Arrow>combinepsbt merges both contributions</Arrow>
        <Card
          title="Enough signatures → finalize → extract"
          body="Check acceptance, then broadcast the raw transaction. C could replace A or B."
          icon="check"
        />
      </div>
    )
  if (d.layout === "taproot")
    return (
      <div className="cv-branching">
        <Card
          title="One Taproot output"
          body="Each permitted path has its own satisfaction conditions."
          icon="wallet"
        />
        <Arrow>Spend through either permitted path</Arrow>
        <div className="cv-grid">
          <Card
            title="Key path"
            body="A valid signature for the output key. Determine who controls this authority."
            icon="key"
          />
          <Card
            title="OR · script path"
            body="Satisfy the selected script, such as a 2-of-3 threshold. This does not disable the key path."
            icon="keys"
          />
        </div>
      </div>
    )
  if (d.layout === "timelock")
    return (
      <div className="cv-time">
        <div className="cv-track">
          <span>
            Output confirms
            <br />
            <strong>height h</strong>
          </span>
          <ArrowRight aria-hidden="true" />
          <span>
            Earliest block for older(6)
            <br />
            <strong>height h + 6</strong>
          </span>
        </div>
        <div className="cv-grid">
          <Card
            title="Ordinary path · 2-of-3"
            body="No recovery delay required. All other validity conditions still apply."
            icon="keys"
          />
          <Card
            title="Recovery path · child key C"
            body="Signature + older(6). Before eligibility: reject. After: can be valid with the correct version and sequence."
            icon="key"
          />
        </div>
        <p className="cv-note">
          Each spent output has its own confirmation height. Opening a wallet
          does not start or reset the clock. Blocks do not have an exact
          duration.
        </p>
      </div>
    )
  if (d.layout === "table")
    return (
      <div
        className="cv-table-wrap"
        tabIndex={0}
        role="region"
        aria-label={`${d.title}: scrollable comparison`}
      >
        <table>
          <thead>
            <tr>
              {d.headers?.map((h) => (
                <th scope="col" key={h}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {d.rows?.map((row, i) => (
              <tr key={i}>
                {row.map((cell, j) =>
                  j === 0 ? (
                    <th scope="row" key={j}>
                      {cell}
                    </th>
                  ) : (
                    <td key={j}>{cell}</td>
                  )
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  const nodes = d.nodes ?? []
  if (d.layout === "merge")
    return (
      <div>
        <div className="cv-grid">
          {nodes.slice(0, -1).map((n) => (
            <Card key={n.title} {...n} />
          ))}
        </div>
        <Arrow>Required together</Arrow>
        <Card {...nodes[nodes.length - 1]} />
      </div>
    )
  if (d.layout === "branches")
    return (
      <div>
        <Card {...nodes[0]} />
        <Arrow>Separate, reviewed file transfers</Arrow>
        <div className="cv-grid">
          {nodes.slice(1).map((n) => (
            <Card key={n.title} {...n} />
          ))}
        </div>
      </div>
    )
  return (
    <div className={d.boundary ? "cv-container-boundary" : undefined}>
      {d.boundary && <span className="cv-boundary-label">{d.boundary}</span>}
      <div className={`cv-grid${d.layout === "flow" ? "cv-flow" : ""}`}>
        {nodes.map((n, i) => (
          <div className="cv-node" key={n.title}>
            {d.layout === "flow" && <span className="cv-number">{i + 1}</span>}
            <Card {...n} />
          </div>
        ))}
      </div>
    </div>
  )
}
export function CurriculumVisual({
  placement,
}: {
  placement: VisualPlacement
}) {
  const id = useId()
  const definition = visualCatalog[placement.visual]
  if (!definition) return null
  const figure = (
    <figure
      className={`curriculum-visual cv-${definition.layout}`}
      data-visual={placement.visual}
      aria-labelledby={`${id}-title`}
      aria-describedby={`${id}-caption`}
    >
      <h3 id={`${id}-title`}>{definition.title}</h3>
      <Diagram definition={definition} active={placement.active} />
      <figcaption id={`${id}-caption`}>
        {placement.active !== undefined &&
          definition.states?.[placement.active] && (
            <strong className="cv-state-caption">
              {definition.states[placement.active]}{" "}
            </strong>
          )}
        {placement.caption ?? definition.caption}
      </figcaption>
    </figure>
  )
  return placement.display === "expandable" ? (
    <details className="cv-details">
      <summary>{definition.title}</summary>
      {figure}
    </details>
  ) : (
    figure
  )
}
export function LessonVisuals({
  lessonId,
  target,
}: {
  lessonId: string
  target: VisualTarget
}) {
  return (
    <>
      {visualsFor(lessonId, target).map((placement) => (
        <CurriculumVisual key={placement.id} placement={placement} />
      ))}
    </>
  )
}
