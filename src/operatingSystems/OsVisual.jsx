/**
 * OsVisual — the "director's cut" visual kit.
 *
 * Large, intentional, stage-filling components that replace the old
 * text-in-a-box placeholders. Every component is designed to be the HERO of
 * the slide: one dominant idea, projector-legible type, generous negative
 * space, quiet motion that supports the teaching idea.
 *
 * Two families:
 *   • Editorial panels (HTML/CSS)  — TwoWorld, StepFlow, LayerStack,
 *     ConceptHub, NoteBoard, Taxonomy, StatTiles
 *   • Concept diagrams (SVG)       — ThreadsShareSpace, MemoryHierarchy,
 *     SwapScene, CopyOnWrite, MountScene, NasSan, MessageMailbox,
 *     MultiprogTimeline, SchedulerPipeline
 */
import { useId } from 'react'
import { C } from './OsMachine.jsx'

const TONE = {
  kernel: '#2563eb', process: '#0891b2', memory: '#7c3aed',
  ok: '#15803d', wait: '#d97706', fault: '#dc2626', navy: '#1b2a41',
}
function hexToRgb(hex) {
  const n = parseInt(hex.slice(1), 16)
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255]
}
function mix(a, b, t) {
  const [r1, g1, b1] = hexToRgb(a)
  const [r2, g2, b2] = hexToRgb(b)
  const r = Math.round(r1 + (r2 - r1) * t)
  const g = Math.round(g1 + (g2 - g1) * t)
  const bl = Math.round(b1 + (b2 - b1) * t)
  return `rgb(${r}, ${g}, ${bl})`
}

/* ------------------------------------------------------------------ */
/* SVG scene wrapper — fills the stage cell, cream card, soft shadow.   */
/* ------------------------------------------------------------------ */
function Canvas({ children, viewBox = '0 0 1000 560', label, className = '', flat = false }) {
  const id = `v-${useId().replace(/:/g, '')}`
  return (
    <div className={`os-scene ${flat ? 'os-scene-flat' : ''} ${className}`.trim()}>
      <svg viewBox={viewBox} role="img" aria-label={label} preserveAspectRatio="xMidYMid meet">
        <defs>
          <linearGradient id={`${id}-k`} x1="0" y1="0" x2="1" y2="1">
            <stop stopColor={C.kernel} />
            <stop offset="1" stopColor={C.process} />
          </linearGradient>
          <linearGradient id={`${id}-m`} x1="0" y1="0" x2="1" y2="1">
            <stop stopColor={C.memory} />
            <stop offset="1" stopColor="#9d5cf0" />
          </linearGradient>
          <filter id={`${id}-s`} x="-25%" y="-25%" width="150%" height="150%">
            <feDropShadow dx="0" dy="8" stdDeviation="9" floodColor={C.navy} floodOpacity=".16" />
          </filter>
          <marker id={`${id}-arr`} viewBox="0 0 12 12" refX="9" refY="6" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
            <path d="M1 1 L10 6 L1 11" fill="none" stroke="context-stroke" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
          </marker>
        </defs>
        {typeof children === 'function' ? children({ id }) : children}
      </svg>
    </div>
  )
}

/* Reusable SVG atoms -------------------------------------------------- */
function Node({ x, y, w, h, fill, stroke, r = 16, children, shadow = true, id, dash }) {
  return (
    <g style={shadow ? { filter: `url(#${id}-s)` } : undefined}>
      <rect x={x} y={y} width={w} height={h} rx={r} fill={fill} stroke={stroke || 'none'} strokeWidth={stroke ? 2.5 : 0} strokeDasharray={dash} />
      {children}
    </g>
  )
}
function Label({ x, y, children, size = 26, fill = '#fff', anchor = 'middle', weight = 800, spacing }) {
  return (
    <text x={x} y={y} fontSize={size} fill={fill} textAnchor={anchor} fontWeight={weight} letterSpacing={spacing} dominantBaseline="middle" style={{ fontFamily: 'inherit' }}>
      {children}
    </text>
  )
}
function Arrow({ d, stroke = C.wait, id, width = 3.5, dash, animate }) {
  return <path d={d} fill="none" stroke={stroke} strokeWidth={width} strokeLinecap="round" strokeDasharray={dash} markerEnd={`url(#${id}-arr)`} className={animate ? 'os-anim-claim' : ''} />
}

/* ================================================================== */
/* EDITORIAL PANELS (HTML/CSS)                                         */
/* ================================================================== */

/**
 * Two-world comparison — the workhorse for before/after, logical vs physical,
 * user vs kernel, monolithic vs micro, etc. One big idea per side.
 */
export function TwoWorld({ a, b, split = 'vs', tone = 'kernel' }) {
  return (
    <div className={`os-scene os-twoworld os-tone-${tone}`}>
      <article className="os-tw-side os-tw-a">
        <h3>{a.title}</h3>
        {a.lead && <p className="os-tw-lead">{a.lead}</p>}
        {a.points && (
          <ul>{a.points.map((p) => <li key={p}>{p}</li>)}</ul>
        )}
        {a.tag && <span className="os-tw-tag">{a.tag}</span>}
      </article>
      <div className="os-tw-split" aria-hidden>{split}</div>
      <article className="os-tw-side os-tw-b">
        <h3>{b.title}</h3>
        {b.lead && <p className="os-tw-lead">{b.lead}</p>}
        {b.points && (
          <ul>{b.points.map((p) => <li key={p}>{p}</li>)}</ul>
        )}
        {b.tag && <span className="os-tw-tag">{b.tag}</span>}
      </article>
    </div>
  )
}

/**
 * Step journey — big horizontal flow of labelled stages with connectors.
 * Optional per-step caption underneath. The dominant object for any process.
 */
export function StepFlow({ steps = [], accent = 'kernel', highlight = -1, vertical = false }) {
  return (
    <div className={`os-scene os-stepflow ${vertical ? 'os-stepflow-v' : ''} os-tone-${accent}`}>
      <ol>
        {steps.map((step, i) => {
          const label = typeof step === 'string' ? step : step.label
          const note = typeof step === 'string' ? null : step.note
          const kind = typeof step === 'string' ? null : step.kind
          return (
            <li key={label} className={`${i === highlight ? 'now' : ''} ${kind ? `k-${kind}` : ''}`.trim()} style={{ '--i': i }}>
              <span className="os-step-n">{i + 1}</span>
              <span className="os-step-l">{label}</span>
              {note && <span className="os-step-note">{note}</span>}
            </li>
          )
        })}
      </ol>
    </div>
  )
}

/**
 * Layer stack — vertical stack of full-width bands (OS layers, hierarchy).
 * Bottom band is the "ground" (hardware); top is the surface (user).
 */
export function LayerStack({ layers = [], caption, accent = 'kernel' }) {
  const hex = TONE[accent] || TONE.kernel
  const n = layers.length
  return (
    <div className={`os-scene os-layerstack os-tone-${accent}`}>
      <div className="os-ls-rail">
        {layers.map((l, i) => {
          const label = typeof l === 'string' ? l : l.label
          const sub = typeof l === 'string' ? null : l.sub
          const ground = typeof l === 'object' && l.ground
          // Top layers lean toward the accent; lower layers deepen toward navy.
          const t = n > 1 ? 1 - i / (n - 1) : 1
          const bg = ground ? C.navy : mix(C.navy, hex, 0.28 + 0.62 * t)
          return (
            <div key={label} className={`os-ls-band ${ground ? 'ground' : ''}`} style={{ '--i': i, '--n': n, background: bg }}>
              <strong>{label}</strong>
              {sub && <span>{sub}</span>}
            </div>
          )
        })}
      </div>
      {caption && <p className="os-ls-cap">{caption}</p>}
    </div>
  )
}

/**
 * Concept hub — a dominant central object with radiating satellites.
 * Central engine style (kernel, CPU, MMU) surrounded by responsibilities.
 */
export function ConceptHub({ center, nodes = [], accent = 'kernel' }) {
  const n = nodes.length
  const cx = 500
  const cy = 285
  const rx = 350
  const ry = 205
  return (
    <Canvas viewBox="0 0 1000 570" label={`${center} and related concepts`}>
      {({ id }) => (
        <>
          {nodes.map((_, i) => {
            const ang = (i / n) * Math.PI * 2 - Math.PI / 2
            const x = cx + Math.cos(ang) * rx
            const y = cy + Math.sin(ang) * ry
            return <line key={`l${i}`} x1={cx} y1={cy} x2={x} y2={y} stroke={C.line} strokeWidth="2.5" />
          })}
          {nodes.map((node, i) => {
            const label = typeof node === 'string' ? node : node.label
            const ang = (i / n) * Math.PI * 2 - Math.PI / 2
            const x = cx + Math.cos(ang) * rx
            const y = cy + Math.sin(ang) * ry
            const w = 210
            const h = 74
            return (
              <Node key={label} id={id} x={x - w / 2} y={y - h / 2} w={w} h={h} r={18} fill="#fff" stroke={C.line}>
                <Label x={x} y={y} size={23} fill={C.ink} weight={750}>{label}</Label>
              </Node>
            )
          })}
          <g style={{ filter: `url(#${id}-s)` }}>
            <circle cx={cx} cy={cy} r="108" fill={`url(#${id}-k)`} className="os-anim-kernel" style={{ transformOrigin: `${cx}px ${cy}px` }} />
          </g>
          <Label x={cx} y={cy} size={30} fill="#fff" weight={850}>{center}</Label>
        </>
      )}
    </Canvas>
  )
}

/**
 * Note board — a large editorial list panel for genuinely list-shaped content.
 * Big type, accent rule, fills the stage. Replaces bland text-in-box lists.
 */
export function NoteBoard({ eyebrow, headline, points = [], numbered = false, accent = 'kernel', foot }) {
  const List = numbered ? 'ol' : 'ul'
  return (
    <div className={`os-scene os-noteboard os-tone-${accent}`}>
      {eyebrow && <span className="os-nb-eyebrow">{eyebrow}</span>}
      {headline && <h3 className="os-nb-head">{headline}</h3>}
      <List className={`os-nb-list ${numbered ? 'num' : ''}`}>
        {points.map((p, i) => {
          const [lead, rest] = typeof p === 'string' ? [p, null] : [p.lead, p.rest]
          return (
            <li key={lead} style={{ '--i': i }}>
              <strong>{lead}</strong>
              {rest && <span>{rest}</span>}
            </li>
          )
        })}
      </List>
      {foot && <p className="os-nb-foot">{foot}</p>}
    </div>
  )
}

/**
 * Taxonomy — a tidy grid of category tiles (syscall families, methods…).
 */
export function Taxonomy({ groups = [], accent = 'kernel', cols }) {
  return (
    <div className={`os-scene os-taxonomy os-tone-${accent}`} style={cols ? { '--cols': cols } : undefined}>
      {groups.map((g, i) => {
        const label = typeof g === 'string' ? g : g.label
        const sub = typeof g === 'string' ? null : g.sub
        return (
          <article key={label} className="os-tx-tile" style={{ '--i': i }}>
            <span className="os-tx-dot" />
            <strong>{label}</strong>
            {sub && <span>{sub}</span>}
          </article>
        )
      })}
    </div>
  )
}

/**
 * Stat tiles — big projector-legible numbers with labels.
 */
export function StatTiles({ items = [], accent = 'kernel' }) {
  return (
    <div className={`os-scene os-stattiles os-tone-${accent}`}>
      {items.map(([value, label, sub], i) => (
        <article key={label} style={{ '--i': i }}>
          <strong>{value}</strong>
          <span>{label}</span>
          {sub && <em>{sub}</em>}
        </article>
      ))}
    </div>
  )
}

/* ================================================================== */
/* CONCEPT DIAGRAMS (SVG)                                              */
/* ================================================================== */

/** Threads share the address space; each keeps its own stack + PC. */
export function ThreadsShareSpace({ n = 3 }) {
  const cols = Array.from({ length: n })
  const boxW = 900
  const x0 = 50
  const tw = (boxW - 40) / n
  return (
    <Canvas viewBox="0 0 1000 560" label="Threads sharing one address space">
      {({ id }) => (
        <>
          <Node id={id} x={x0} y={40} w={boxW} h={480} r={26} fill="#fff" stroke={C.process}>
            <Label x={x0 + 24} y={74} size={22} fill={C.process} anchor="start" spacing="0.08em">PROCESS · one address space</Label>
          </Node>
          {/* shared band */}
          <Node id={id} x={x0 + 30} y={100} w={boxW - 60} h={120} r={16} fill="#eef6fb" stroke={C.line} shadow={false}>
            <Label x={x0 + 55} y={128} size={18} fill={C.muted} anchor="start" spacing="0.06em">SHARED BY ALL THREADS</Label>
            {['code', 'data', 'open files'].map((t, i) => (
              <g key={t}>
                <rect x={x0 + 55 + i * 275} y={148} width={250} height={52} rx={12} fill={C.process} />
                <Label x={x0 + 55 + i * 275 + 125} y={175} size={22}>{t}</Label>
              </g>
            ))}
          </Node>
          {/* thread columns */}
          {cols.map((_, i) => {
            const cx = x0 + 20 + tw * i + tw / 2
            return (
              <g key={i} className="os-anim-cpu" style={{ transformOrigin: `${cx}px 400px`, animationDelay: `${i * 0.25}s` }}>
                <rect x={cx - tw / 2 + 14} y={250} width={tw - 28} height={240} rx={16} fill={C.kernel} />
                <Label x={cx} y={286} size={22}>{`thread ${i + 1}`}</Label>
                <rect x={cx - tw / 2 + 34} y={318} width={tw - 68} height={44} rx={10} fill="#fff" opacity="0.92" />
                <Label x={cx} y={340} size={17} fill={C.kernel}>own PC</Label>
                <rect x={cx - tw / 2 + 34} y={378} width={tw - 68} height={44} rx={10} fill="#fff" opacity="0.92" />
                <Label x={cx} y={400} size={17} fill={C.kernel}>registers</Label>
                <rect x={cx - tw / 2 + 34} y={438} width={tw - 68} height={40} rx={10} fill="#fff" opacity="0.92" />
                <Label x={cx} y={458} size={17} fill={C.kernel}>own stack</Label>
              </g>
            )
          })}
        </>
      )}
    </Canvas>
  )
}

/** Memory hierarchy pyramid — fast+small at top, slow+big at bottom. */
export function MemoryHierarchy() {
  const rows = [
    ['Registers', 'sub-ns · bytes', C.navy, 300],
    ['Cache', 'ns · KB–MB', C.kernel, 470],
    ['Main memory (RAM)', '~100 ns · GB', C.process, 640],
    ['Solid-state / disk', 'ms · TB', C.memory, 810],
  ]
  return (
    <Canvas viewBox="0 0 1000 560" label="Storage speed hierarchy">
      {({ id }) => (
        <>
          <Label x={70} y={60} size={20} anchor="start" fill={C.ok} spacing="0.04em">▲ faster · smaller · costlier</Label>
          <Label x={70} y={530} size={20} anchor="start" fill={C.wait} spacing="0.04em">▼ slower · larger · cheaper</Label>
          {rows.map(([name, meta, color, w], i) => {
            const y = 100 + i * 108
            const x = 500 - w / 2
            return (
              <Node key={name} id={id} x={x} y={y} w={w} h={86} r={14} fill={color}>
                <Label x={500} y={y + 34} size={25}>{name}</Label>
                <Label x={500} y={y + 62} size={18} fill="#dbeafe" weight={650}>{meta}</Label>
              </Node>
            )
          })}
        </>
      )}
    </Canvas>
  )
}

/** Swapping — a whole process rolls out to disk and back. */
export function SwapScene() {
  return (
    <Canvas viewBox="0 0 1000 560" label="Swapping a process between RAM and backing store">
      {({ id }) => (
        <>
          <Node id={id} x={70} y={70} w={420} h={210} r={20} fill="#fff" stroke={C.process}>
            <Label x={90} y={104} size={22} anchor="start" fill={C.process} spacing="0.06em">MAIN MEMORY</Label>
            <rect x={100} y={128} width={170} height={120} rx={14} fill={C.kernel} />
            <Label x={185} y={188} size={24}>P1</Label>
            <rect x={290} y={128} width={170} height={120} rx={14} fill="#e8e0d4" />
            <Label x={375} y={188} size={20} fill={C.muted}>free</Label>
          </Node>
          <Node id={id} x={510} y={300} w={420} h={190} r={20} fill={C.navy}>
            <Label x={530} y={334} size={22} anchor="start" spacing="0.06em">BACKING STORE · disk</Label>
            <rect x={540} y={356} width={170} height={110} rx={14} fill={C.memory} />
            <Label x={625} y={412} size={24}>P2</Label>
            <rect x={730} y={356} width={170} height={110} rx={14} fill="#334155" />
            <Label x={815} y={412} size={20} fill="#94a3b8">swap area</Label>
          </Node>
          <Arrow id={id} d="M420 290 C 470 340, 540 320, 560 348" stroke={C.wait} animate />
          <Arrow id={id} d="M690 348 C 640 300, 360 300, 300 288" stroke={C.ok} animate />
          <Label x={520} y={318} size={19} anchor="start" fill={C.wait} weight={750}>swap out ▸</Label>
          <Label x={330} y={318} size={19} anchor="end" fill={C.ok} weight={750}>◂ swap in</Label>
        </>
      )}
    </Canvas>
  )
}

/** Copy-on-write — shared frames until a write forces a private copy. */
export function CopyOnWrite() {
  return (
    <Canvas viewBox="0 0 1000 560" label="Copy-on-write after fork">
      {({ id }) => (
        <>
          <Node id={id} x={70} y={80} w={220} h={90} r={16} fill={C.process}><Label x={180} y={125} size={24}>parent</Label></Node>
          <Node id={id} x={70} y={390} w={220} h={90} r={16} fill={C.kernel}><Label x={180} y={435} size={24}>child</Label></Node>
          {/* shared frames */}
          {[0, 1, 2].map((i) => (
            <Node key={i} id={id} x={470} y={120 + i * 110} w={190} h={80} r={14} fill={i === 0 ? C.fault : '#fff'} stroke={i === 0 ? C.fault : C.line}>
              <Label x={565} y={160 + i * 110} size={20} fill={i === 0 ? '#fff' : C.ink}>{i === 0 ? 'page A (copied)' : `page ${String.fromCharCode(66 + i)}`}</Label>
            </Node>
          ))}
          <Arrow id={id} d="M290 125 C 380 135, 400 150, 470 158" stroke={C.process} width={3} />
          <Arrow id={id} d="M290 445 C 380 430, 400 250, 470 268" stroke={C.kernel} width={3} />
          <Arrow id={id} d="M290 130 C 380 200, 400 330, 470 372" stroke={C.process} width={3} dash="6 6" />
          <Arrow id={id} d="M290 440 C 380 420, 400 400, 470 388" stroke={C.kernel} width={3} />
          {/* private copy */}
          <Node id={id} x={740} y={120} w={190} h={80} r={14} fill={C.process}><Label x={835} y={160} size={19}>parent's A</Label></Node>
          <Arrow id={id} d="M660 160 H740" stroke={C.wait} width={3.5} animate />
          <Label x={835} y={230} size={18} fill={C.fault} weight={750}>write ⇒ private copy</Label>
          <Label x={565} y={70} size={19} fill={C.muted}>shared &amp; read-only until a write</Label>
        </>
      )}
    </Canvas>
  )
}

/** Mount — an unmounted volume attaches onto a directory (mount point). */
export function MountScene() {
  return (
    <Canvas viewBox="0 0 1000 560" label="Mounting a volume at a mount point">
      {({ id }) => (
        <>
          {/* existing tree */}
          <line x1="230" y1="110" x2="230" y2="180" stroke={C.navy} strokeWidth="2.5" />
          <line x1="130" y1="180" x2="330" y2="180" stroke={C.navy} strokeWidth="2.5" />
          <line x1="130" y1="180" x2="130" y2="230" stroke={C.navy} strokeWidth="2.5" />
          <line x1="330" y1="180" x2="330" y2="230" stroke={C.navy} strokeWidth="2.5" />
          <Node id={id} x={180} y={70} w={100} h={54} r={12} fill="#fff" stroke={C.navy}><Label x={230} y={97} size={22} fill={C.navy}>/</Label></Node>
          <Node id={id} x={70} y={230} w={120} h={54} r={12} fill="#fff" stroke={C.navy}><Label x={130} y={257} size={19} fill={C.navy}>home</Label></Node>
          <Node id={id} x={270} y={230} w={120} h={54} r={12} fill={C.ok} stroke={C.ok}><Label x={330} y={257} size={19}>/mnt</Label></Node>
          <Label x={330} y={306} size={16} fill={C.muted}>mount point</Label>
          {/* volume attaching */}
          <Arrow id={id} d="M560 300 C 470 300, 420 290, 392 270" stroke={C.wait} width={4} animate />
          <Node id={id} x={560} y={200} w={360} h={230} r={20} fill={C.navy}>
            <Label x={740} y={236} size={20} spacing="0.06em">VOLUME · sdb1</Label>
            <rect x={590} y={262} width={140} height={64} rx={12} fill={C.memory} /><Label x={660} y={294} size={18}>docs</Label>
            <rect x={750} y={262} width={140} height={64} rx={12} fill={C.memory} /><Label x={820} y={294} size={18}>media</Label>
            <rect x={590} y={342} width={300} height={64} rx={12} fill="#334155" /><Label x={740} y={374} size={18} fill="#cbd5e1">blocks until mounted</Label>
          </Node>
        </>
      )}
    </Canvas>
  )
}

/** NAS vs SAN vs host-attached storage. */
export function NasSan() {
  const models = [
    ['Host-attached', 'SATA / SAS bus', 'one machine owns the disk', C.process],
    ['NAS', 'files over the LAN', 'NFS / SMB · shared file system', C.kernel],
    ['SAN', 'block fabric', 'many hosts ↔ many arrays', C.memory],
  ]
  return (
    <Canvas viewBox="0 0 1000 520" label="Host-attached, NAS and SAN storage">
      {({ id }) => (
        <>
          {models.map(([name, how, note, color], i) => {
            const x = 60 + i * 305
            return (
              <g key={name}>
                <Node id={id} x={x} y={60} w={270} h={90} r={16} fill={color}>
                  <Label x={x + 135} y={95} size={24}>{name}</Label>
                  <Label x={x + 135} y={126} size={17} fill="#e2e8f0" weight={650}>{how}</Label>
                </Node>
                <line x1={x + 135} y1={150} x2={x + 135} y2={230} stroke={C.line} strokeWidth="2.5" />
                <Node id={id} x={x + 35} y={230} w={200} h={90} r={14} fill="#fff" stroke={C.line}>
                  <Label x={x + 135} y={266} size={18} fill={C.ink} weight={750}>storage</Label>
                  <Label x={x + 135} y={294} size={15} fill={C.muted} weight={600}>{note}</Label>
                </Node>
              </g>
            )
          })}
          <Label x={500} y={400} size={18} fill={C.muted}>NAS shares a file system · SAN shares raw blocks</Label>
        </>
      )}
    </Canvas>
  )
}

/** Message passing through a mailbox. */
export function MessageMailbox() {
  return (
    <Canvas viewBox="0 0 1000 500" label="Message passing between processes through a mailbox">
      {({ id }) => (
        <>
          <Node id={id} x={70} y={190} w={220} h={120} r={20} fill={C.process}><Label x={180} y={250} size={26}>P1</Label></Node>
          <Node id={id} x={710} y={190} w={220} h={120} r={20} fill={C.kernel}><Label x={820} y={250} size={26}>P2</Label></Node>
          <Node id={id} x={390} y={150} w={220} h={200} r={22} fill={C.navy}>
            <Label x={500} y={186} size={20} spacing="0.06em">MAILBOX A</Label>
            {[0, 1, 2].map((i) => (
              <rect key={i} x={420} y={214 + i * 42} width={160} height={30} rx={8} fill={i === 0 ? C.wait : '#334155'} />
            ))}
          </Node>
          <Arrow id={id} d="M290 250 H388" stroke={C.wait} width={4} animate />
          <Arrow id={id} d="M610 250 H708" stroke={C.ok} width={4} animate />
          <Label x={340} y={214} size={18} fill={C.wait} weight={750}>send(A, m)</Label>
          <Label x={660} y={214} size={18} fill={C.ok} weight={750}>receive(A)</Label>
        </>
      )}
    </Canvas>
  )
}

/** Multiprogramming — several jobs overlap CPU and I/O to keep CPU busy. */
export function MultiprogTimeline() {
  const jobs = [
    ['Job A', [[0, 3, 'cpu'], [3, 6, 'io'], [9, 11, 'cpu']]],
    ['Job B', [[3, 5, 'io'], [6, 9, 'cpu'], [11, 13, 'io']]],
    ['Job C', [[5, 6, 'io'], [9, 9, 'cpu'], [13, 16, 'cpu']]],
  ]
  const unit = 52
  const x0 = 190
  return (
    <Canvas viewBox="0 0 1000 480" label="Multiprogramming overlaps CPU and I/O">
      {({ id }) => (
        <>
          {jobs.map(([name, segs], row) => {
            const y = 90 + row * 110
            return (
              <g key={name}>
                <Label x={70} y={y + 30} size={22} anchor="start" fill={C.ink}>{name}</Label>
                <rect x={x0} y={y} width={16 * unit} height={60} rx={12} fill="#efeae1" />
                {segs.map(([s, e, kind], i) => e > s && (
                  <g key={i}>
                    <rect x={x0 + s * unit} y={y + 6} width={(e - s) * unit - 6} height={48} rx={10} fill={kind === 'cpu' ? C.kernel : C.wait} />
                    <Label x={x0 + s * unit + ((e - s) * unit - 6) / 2} y={y + 30} size={16}>{kind === 'cpu' ? 'CPU' : 'I/O'}</Label>
                  </g>
                ))}
              </g>
            )
          })}
          <Label x={x0} y={420} size={18} anchor="start" fill={C.muted}>While one job waits on I/O, the CPU runs another — never idle.</Label>
        </>
      )}
    </Canvas>
  )
}

/** Scheduler pipeline — long / short / medium-term schedulers. */
export function SchedulerPipeline() {
  return (
    <Canvas viewBox="0 0 1000 520" label="Long, short and medium-term schedulers">
      {({ id }) => (
        <>
          <Node id={id} x={40} y={210} w={150} h={100} r={16} fill="#fff" stroke={C.line}><Label x={115} y={252} size={19} fill={C.ink}>new jobs</Label><Label x={115} y={278} size={15} fill={C.muted}>on disk</Label></Node>
          <Node id={id} x={330} y={200} w={210} h={120} r={18} fill={C.process}><Label x={435} y={248} size={20}>READY QUEUE</Label><Label x={435} y={280} size={16} fill="#e2e8f0">in RAM</Label></Node>
          <Node id={id} x={700} y={210} w={150} h={100} r={16} fill={C.navy}><Label x={775} y={260} size={22}>CPU</Label></Node>
          <Node id={id} x={330} y={410} w={210} h={80} r={16} fill="#e8e0d4"><Label x={435} y={450} size={18} fill={C.ink}>swap space</Label></Node>
          <Arrow id={id} d="M190 260 H326" stroke={C.wait} width={3.5} animate />
          <Label x={258} y={232} size={16} fill={C.wait} weight={750}>long-term</Label>
          <Arrow id={id} d="M540 260 H696" stroke={C.ok} width={3.5} animate />
          <Label x={618} y={232} size={16} fill={C.ok} weight={750}>short-term</Label>
          <Arrow id={id} d="M700 300 C 620 360, 560 380, 500 408" stroke={C.memory} width={3} />
          <Arrow id={id} d="M430 408 C 400 370, 400 350, 428 322" stroke={C.memory} width={3} />
          <Label x={560} y={392} size={16} fill={C.memory} weight={750}>medium-term (swap)</Label>
          <Label x={775} y={340} size={16} fill={C.muted}>running</Label>
        </>
      )}
    </Canvas>
  )
}

/** Paging — contiguous logical pages land in scattered physical frames. */
export function PageFrameMapping() {
  // page -> frame placement (deliberately non-adjacent)
  const map = [
    [0, 5, C.process],
    [1, 1, C.kernel],
    [2, 7, C.memory],
    [3, 3, C.wait],
  ]
  const frameOf = Object.fromEntries(map.map(([p, f]) => [f, p]))
  const py = (i) => 90 + i * 100
  const fy = (i) => 60 + i * 62
  return (
    <Canvas viewBox="0 0 1000 560" label="Logical pages mapped to physical frames">
      {({ id }) => (
        <>
          <Label x={190} y={44} size={20} fill={C.process} spacing="0.06em">LOGICAL · pages</Label>
          <Label x={810} y={44} size={20} fill={C.memory} spacing="0.06em">PHYSICAL · frames</Label>
          {/* page table in the middle */}
          <Node id={id} x={430} y={70} w={140} h={430} r={16} fill="#fff" stroke={C.line}>
            <Label x={500} y={98} size={17} fill={C.muted} spacing="0.05em">PAGE TABLE</Label>
          </Node>
          {map.map(([p], i) => (
            <g key={p}>
              <rect x={455} y={120 + i * 92} width={90} height={70} rx={10} fill="#f4f0e8" />
              <Label x={478} y={155 + i * 92} size={17} fill={C.muted}>{p}</Label>
              <Label x={524} y={155 + i * 92} size={19} fill={C.ink}>{map[i][1]}</Label>
            </g>
          ))}
          {/* logical pages */}
          {map.map(([p, , c], i) => (
            <Node key={p} id={id} x={70} y={py(i)} w={210} h={72} r={14} fill={c}>
              <Label x={175} y={py(i) + 36} size={22}>{`page ${p}`}</Label>
            </Node>
          ))}
          {/* physical frames */}
          {Array.from({ length: 8 }).map((_, f) => {
            const owner = frameOf[f]
            const c = owner != null ? map[owner][2] : '#fff'
            return (
              <Node key={f} id={id} x={720} y={fy(f)} w={210} h={52} r={10} fill={c} stroke={owner != null ? 'none' : C.line} shadow={owner != null}>
                <Label x={745} y={fy(f) + 26} size={15} fill={owner != null ? '#fff' : C.muted} anchor="start">{`frame ${f}`}</Label>
                {owner != null && <Label x={905} y={fy(f) + 26} size={15} anchor="end">{`p${owner}`}</Label>}
              </Node>
            )
          })}
          {map.map(([p, f, c], i) => (
            <Arrow key={p} id={id} d={`M280 ${py(i) + 36} C 360 ${py(i) + 36}, 380 ${144 + i * 92}, 430 ${155 + i * 92}`} stroke={c} width={2.6} />
          ))}
          {map.map(([p, f, c], i) => (
            <Arrow key={`b${p}`} id={id} d={`M570 ${155 + i * 92} C 650 ${155 + i * 92}, 660 ${fy(f) + 26}, 720 ${fy(f) + 26}`} stroke={c} width={2.6} />
          ))}
          <Label x={500} y={535} size={17} fill={C.muted}>pages are contiguous · frames are wherever they fit</Label>
        </>
      )}
    </Canvas>
  )
}

export { Canvas as OsCanvas }
