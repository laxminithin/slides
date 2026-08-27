/** DistScenes — Distributed Systems classroom simulator visuals (distv-*) */
const N = '#0f172a'
const BLUE = '#4f46e5'
const AMBER = '#d97706'
const GREEN = '#16a34a'
const RED = '#dc2626'
const TEAL = '#0d9488'
const PURP = '#7c3aed'
const MUTED = '#64748b'
const CREAM = '#f8fafc'
const SKY = '#eef2ff'
const WHITE = '#ffffff'
export const PALETTE = { N, BLUE, AMBER, GREEN, RED, TEAL, PURP, MUTED, CREAM, SKY, WHITE }

export function Scene({ caption, children, vb = '0 0 900 520', className = '' }) {
  return (
    <div className={`dist-scene ${className}`} aria-label={caption || 'Distributed Systems diagram'}>
      <svg viewBox={vb} role="img" className="dist-svg">
        <defs>
          <marker id="distArr" markerWidth="10" markerHeight="10" refX="8" refY="4" orient="auto">
            <path d="M0 0 L9 4 L0 8 Z" fill={N} />
          </marker>
          <marker id="distArrB" markerWidth="10" markerHeight="10" refX="8" refY="4" orient="auto">
            <path d="M0 0 L9 4 L0 8 Z" fill={BLUE} />
          </marker>
          <marker id="distArrG" markerWidth="10" markerHeight="10" refX="8" refY="4" orient="auto">
            <path d="M0 0 L9 4 L0 8 Z" fill={GREEN} />
          </marker>
          <marker id="distArrA" markerWidth="10" markerHeight="10" refX="8" refY="4" orient="auto">
            <path d="M0 0 L9 4 L0 8 Z" fill={AMBER} />
          </marker>
          <marker id="distArrR" markerWidth="10" markerHeight="10" refX="8" refY="4" orient="auto">
            <path d="M0 0 L9 4 L0 8 Z" fill={RED} />
          </marker>
          <marker id="distArrT" markerWidth="10" markerHeight="10" refX="8" refY="4" orient="auto">
            <path d="M0 0 L9 4 L0 8 Z" fill={TEAL} />
          </marker>
        </defs>
        <rect width="100%" height="100%" fill={CREAM} rx="8" />
        {children}
        {caption ? (
          <text x="450" y="502" textAnchor="middle" fontSize="15" fontWeight="700" fill={MUTED} fontFamily="system-ui,sans-serif">
            {caption}
          </text>
        ) : null}
      </svg>
    </div>
  )
}

export function L({ x, y, children, size = 18, fill = N, anchor = 'middle', weight = 800 }) {
  return (
    <text x={x} y={y} textAnchor={anchor} fontSize={size} fontWeight={weight} fill={fill} fontFamily="system-ui,sans-serif">
      {children}
    </text>
  )
}

function Box({ x, y, w, h, label, sub, className = '', fill = WHITE, stroke = BLUE }) {
  return (
    <g transform={`translate(${x},${y})`} className={className}>
      <rect width={w} height={h} rx="10" fill={fill} stroke={stroke} strokeWidth="2.5" />
      <L x={w / 2} y={h / 2 + (sub ? -2 : 6)} size={sub ? 14 : 16}>
        {label}
      </L>
      {sub ? (
        <L x={w / 2} y={h / 2 + 18} size={12} fill={MUTED} weight={700}>
          {sub}
        </L>
      ) : null}
    </g>
  )
}

/* ── Primitives: Node / Link / Message ───────────────────────────── */
export function Node({
  x,
  y,
  label,
  sub,
  w = 118,
  h = 64,
  r = 12,
  fill = WHITE,
  stroke = BLUE,
  className = '',
  badge,
  badgeFill = AMBER,
}) {
  return (
    <g transform={`translate(${x},${y})`} className={className}>
      <rect width={w} height={h} rx={r} fill={fill} stroke={stroke} strokeWidth="2.8" />
      <L x={w / 2} y={h / 2 + (sub ? -4 : 6)} size={sub ? 14 : 15}>
        {label}
      </L>
      {sub ? (
        <L x={w / 2} y={h / 2 + 16} size={11} fill={MUTED} weight={700}>
          {sub}
        </L>
      ) : null}
      {badge != null ? (
        <g>
          <circle cx={w - 6} cy={8} r="14" fill={badgeFill} className="distv-pulse" />
          <L x={w - 6} y={12} size={11} fill={WHITE} weight={800}>
            {badge}
          </L>
        </g>
      ) : null}
    </g>
  )
}

export function Link({
  x1,
  y1,
  x2,
  y2,
  color = BLUE,
  marker = 'url(#distArrB)',
  className = 'distv-flow-arrow',
  dashed = false,
  width = 2.8,
}) {
  return (
    <line
      x1={x1}
      y1={y1}
      x2={x2}
      y2={y2}
      stroke={color}
      strokeWidth={width}
      markerEnd={marker}
      strokeDasharray={dashed ? '8 6' : undefined}
      className={className}
    />
  )
}

let msgSeq = 0
export function Message({
  path,
  label,
  color = AMBER,
  delay = 0,
  dur = '2.8s',
  className = 'distv-msg',
  r = 11,
}) {
  const id = `distMsgPath-${++msgSeq}`
  return (
    <g className={className}>
      <path id={id} d={path} fill="none" stroke="none" />
      <circle r={r} fill={color} opacity="0.95">
        <animateMotion dur={dur} begin={`${delay}s`} repeatCount="indefinite" rotate="auto">
          <mpath href={`#${id}`} />
        </animateMotion>
      </circle>
      {label ? (
        <text fontSize="11" fontWeight="800" fill={N} fontFamily="system-ui,sans-serif" textAnchor="middle" dy="-16">
          <animateMotion dur={dur} begin={`${delay}s`} repeatCount="indefinite">
            <mpath href={`#${id}`} />
          </animateMotion>
          {label}
        </text>
      ) : null}
    </g>
  )
}

export function ModuleHero({ module = 1, title, question, hours }) {
  return (
    <Scene caption={question || 'DIST visual journey'}>
      <rect x="40" y="40" width="820" height="400" rx="16" fill="#fff" stroke={BLUE} strokeWidth="3" />
      <L x="450" y="110" size={18} fill={BLUE}>{`MODULE ${module} · BCS515D`}</L>
      <L x="450" y="170" size={26}>
        {title || `Module ${module}`}
      </L>
      <L x="450" y="220" size={15} fill={MUTED} weight={700}>
        {question || 'Watch the concept execute'}
      </L>
      {['Problem', 'Model', 'Mechanism', 'Example', 'Exam'].map((t, i) => (
        <Box key={t} x={70 + i * 150} y={280} w={130} h={70} label={t} className={`distv-pulse distv-delay-${i}`} />
      ))}
      {hours ? (
        <L x="450" y="420" size={14} fill={MUTED}>
          {`${hours} teaching hours`}
        </L>
      ) : null}
    </Scene>
  )
}

export function ModuleOutro({ module = 1, title }) {
  return (
    <Scene caption="Redraw the map — then attempt the PYQs">
      <L x="450" y="80" size={24}>{`Module ${module} closed`}</L>
      <L x="450" y="120" size={16} fill={MUTED}>
        {title}
      </L>
      <Box x="120" y="200" w="200" h="120" label="Definitions" sub="precise terms" className="distv-fade-in" />
      <Box x="350" y="200" w="200" h="120" label="Diagrams" sub="labelled flows" className="distv-fade-in distv-delay-1" />
      <Box x="580" y="200" w="200" h="120" label="Practice" sub="10-mark answers" className="distv-fade-in distv-delay-2" />
    </Scene>
  )
}

export function ConceptBoard({ title = 'Concept', points = [] }) {
  const pts = points.length ? points : ['Context', 'Mechanism', 'Example', 'Exam point']
  return (
    <Scene caption={title}>
      <Box x="250" y="40" w="400" h="80" label={title} className="distv-pulse" />
      {pts.map((p, i) => (
        <Box key={p} x={60 + (i % 4) * 210} y={180 + Math.floor(i / 4) * 120} w="190" h="90" label={p} className={`distv-step distv-delay-${i % 5}`} />
      ))}
    </Scene>
  )
}

/* ── 1. Multi-machine distributed system ─────────────────────────── */
export function DistSystemScene() {
  const nodes = [
    { x: 80, y: 180, label: 'M1', sub: 'host' },
    { x: 280, y: 90, label: 'M2', sub: 'host' },
    { x: 500, y: 90, label: 'M3', sub: 'host' },
    { x: 700, y: 180, label: 'M4', sub: 'host' },
    { x: 390, y: 300, label: 'Net', sub: 'WAN/LAN', stroke: TEAL, w: 120 },
  ]
  return (
    <Scene caption="Independent machines cooperate over a network">
      <L x="450" y="42" size={20}>
        Distributed system
      </L>
      <Link x1={198} y1={212} x2={390} y2={320} color={TEAL} marker="url(#distArrT)" />
      <Link x1={340} y1={154} x2={430} y2={300} color={TEAL} marker="url(#distArrT)" />
      <Link x1={560} y1={154} x2={470} y2={300} color={TEAL} marker="url(#distArrT)" />
      <Link x1={700} y1={212} x2={510} y2={320} color={TEAL} marker="url(#distArrT)" />
      {nodes.map((n, i) => (
        <Node
          key={n.label}
          x={n.x}
          y={n.y}
          w={n.w || 118}
          label={n.label}
          sub={n.sub}
          stroke={n.stroke || BLUE}
          className={`distv-flow-node distv-delay-${i}`}
        />
      ))}
      <Message path="M140 200 C 260 260, 340 280, 430 320" label="msg" delay={0} color={AMBER} />
      <Message path="M760 200 C 640 260, 560 280, 470 320" label="msg" delay={1.2} color={PURP} />
      <L x="450" y="430" size={14} fill={MUTED}>
        No shared memory · message passing · concurrency · partial failure
      </L>
    </Scene>
  )
}

/* ── 2. Request–Reply ────────────────────────────────────────────── */
export function RequestReplyScene() {
  return (
    <Scene caption="Request–reply: doOperation → getRequest → sendReply">
      <L x="450" y="40" size={20}>
        Request–reply protocol
      </L>
      <Node x={80} y={180} w={160} h={80} label="Client" sub="doOperation" className="distv-actor" />
      <Node x={660} y={180} w={160} h={80} label="Server" sub="execute" className="distv-actor distv-delay-2" stroke={TEAL} />
      <Link x1={240} y1={200} x2={650} y2={200} color={BLUE} />
      <Link x1={650} y1={240} x2={240} y2={240} color={GREEN} marker="url(#distArrG)" className="distv-feedback" />
      <Message path="M250 200 H640" label="REQUEST" delay={0} color={BLUE} dur="2.4s" />
      <Message path="M640 240 H250" label="REPLY" delay={1.2} color={GREEN} dur="2.4s" />
      <L x="450" y="150" size={13} fill={MUTED}>
        requestId · methodId · arguments
      </L>
      <L x="450" y="320" size={13} fill={MUTED}>
        result · success / failure
      </L>
      <Box x={280} y={360} w={340} h={56} label="Idempotent ops tolerate duplicate requests" className="distv-pulse" stroke={AMBER} fill="#fff7ed" />
    </Scene>
  )
}

/* ── 3. RPC path ─────────────────────────────────────────────────── */
export function RpcScene() {
  const steps = [
    { x: 30, label: 'Client', sub: 'call' },
    { x: 190, label: 'Stub', sub: 'marshal' },
    { x: 350, label: 'Network', sub: 'send' },
    { x: 510, label: 'Srv stub', sub: 'unmarshal' },
    { x: 670, label: 'Procedure', sub: 'execute' },
  ]
  return (
    <Scene caption="RPC: Client → Stub → Network → Server stub → Procedure (+ return)">
      <L x="450" y="36" size={18}>
        Remote procedure call
      </L>
      {steps.map((s, i) => (
        <g key={s.label}>
          <Node
            x={s.x}
            y={120}
            w={140}
            h={72}
            label={s.label}
            sub={s.sub}
            stroke={i === 2 ? TEAL : i === 4 ? GREEN : BLUE}
            className={`distv-flow-node distv-delay-${i}`}
          />
          {i < steps.length - 1 ? (
            <Link x1={s.x + 140} y1={156} x2={steps[i + 1].x} y2={156} color={BLUE} />
          ) : null}
        </g>
      ))}
      <Message path="M100 156 H740" label="call" delay={0} color={AMBER} dur="3s" />
      <path
        d="M740 200 C 740 300, 100 300, 100 200"
        fill="none"
        stroke={GREEN}
        strokeWidth="2.5"
        strokeDasharray="8 6"
        markerEnd="url(#distArrG)"
        className="distv-feedback"
      />
      <Message path="M740 220 C 740 290, 100 290, 100 220" label="return" delay={1.5} color={GREEN} dur="3s" />
      <L x="450" y="360" size={14} fill={MUTED}>
        Local call looks remote · stubs hide marshalling & network
      </L>
      <L x="450" y="400" size={13} fill={AMBER}>
        RMI: object reference + method invoke (same path)
      </L>
    </Scene>
  )
}

/* ── 4. DFS Client → FileService → Storage ───────────────────────── */
export function DfsScene() {
  return (
    <Scene caption="DFS: Client → File service → Storage servers">
      <L x="450" y="40" size={20}>
        Distributed file system
      </L>
      <Node x={60} y={200} w={150} h={80} label="Client" sub="open/read/write" className="distv-actor" />
      <Node x={340} y={120} w={180} h={80} label="File service" sub="directory · flat file" stroke={TEAL} className="distv-system-box" />
      <Node x={340} y={280} w={180} h={80} label="Lock / Cache" sub="consistency" stroke={PURP} className="distv-step" />
      <Node x={680} y={140} w={150} h={70} label="Storage A" sub="blocks" stroke={GREEN} className="distv-flow-node" />
      <Node x={680} y={260} w={150} h={70} label="Storage B" sub="blocks" stroke={GREEN} className="distv-flow-node distv-delay-2" />
      <Link x1={210} y1={230} x2={340} y2={170} color={BLUE} />
      <Link x1={520} y1={160} x2={680} y2={175} color={TEAL} marker="url(#distArrT)" />
      <Link x1={520} y1={180} x2={680} y2={290} color={TEAL} marker="url(#distArrT)" />
      <Link x1={430} y1={200} x2={430} y2={280} color={PURP} marker="url(#distArr)" dashed />
      <Message path="M220 220 C 280 180, 320 160, 420 160" label="LOOKUP" delay={0} color={AMBER} />
      <Message path="M520 160 H680" label="READ" delay={1.1} color={BLUE} />
      <L x="450" y="420" size={14} fill={MUTED}>
        Transparency: location · access · replication · failure
      </L>
    </Scene>
  )
}

/* ── 5. Name resolution ──────────────────────────────────────────── */
export function NameResolveScene() {
  return (
    <Scene caption="Name resolution: name → attributes / binding">
      <L x="450" y="40" size={20}>
        Name service / DNS
      </L>
      <Node x={40} y={200} w={140} h={70} label="Client" sub="resolve(name)" className="distv-actor" />
      <Node x={250} y={80} w={150} h={64} label="Local NS" sub="cache" className="distv-flow-node" />
      <Node x={250} y={300} w={150} h={64} label="Root / TLD" sub="referral" stroke={AMBER} className="distv-flow-node distv-delay-1" />
      <Node x={520} y={180} w={160} h={70} label="Authoritative" sub="binding" stroke={TEAL} className="distv-system-box" />
      <Node x={740} y={180} w={120} h={70} label="Host" sub="IP / attrs" stroke={GREEN} className="distv-pulse" />
      <Link x1={180} y1={220} x2={250} y2={140} />
      <Link x1={180} y1={250} x2={250} y2={320} color={AMBER} marker="url(#distArrA)" />
      <Link x1={400} y1={112} x2={520} y2={200} color={TEAL} marker="url(#distArrT)" />
      <Link x1={400} y1={332} x2={520} y2={230} color={TEAL} marker="url(#distArrT)" />
      <Link x1={680} y1={215} x2={740} y2={215} color={GREEN} marker="url(#distArrG)" />
      <Message path="M180 230 C 220 160, 300 120, 400 112" label="query" delay={0} />
      <Message path="M400 332 C 460 280, 500 240, 600 210" label="NS?" delay={0.9} color={PURP} />
      <Message path="M680 215 H760" label="A / IP" delay={1.8} color={GREEN} />
      <L x="450" y="430" size={14} fill={MUTED}>
        Iterative / recursive · caching · naming contexts
      </L>
    </Scene>
  )
}

/* ── 6. Physical clocks drift + sync ─────────────────────────────── */
export function PhysicalClockScene() {
  return (
    <Scene caption="Physical clocks drift; sync pulls them closer">
      <L x="450" y="40" size={20}>
        Synchronizing physical clocks
      </L>
      {[0, 1, 2].map((i) => {
        const x = 120 + i * 240
        const drift = [0, 18, -14][i]
        return (
          <g key={i}>
            <L x={x + 60} y={90} size={15} fill={MUTED}>{`P${i}`}</L>
            <rect x={x} y={110} width="120" height="220" rx="10" fill={WHITE} stroke={BLUE} strokeWidth="2.5" />
            <line x1={x + 20} y1={180} x2={x + 100} y2={180} stroke={MUTED} strokeWidth="1.5" strokeDasharray="4 4" />
            <g className="distv-clock-drift" style={{ transformOrigin: `${x + 60}px ${180 + drift}px` }}>
              <rect x={x + 35} y={150 + drift} width="50" height="28" rx="6" fill={SKY} stroke={AMBER} strokeWidth="2" />
              <L x={x + 60} y={170 + drift} size={13} fill={AMBER}>{`T+${i}`}</L>
            </g>
            <L x={x + 60} y={360} size={12} fill={MUTED}>
              crystal skew
            </L>
          </g>
        )
      })}
      <path d="M240 200 H360" stroke={GREEN} strokeWidth="2.5" markerEnd="url(#distArrG)" className="distv-flow-arrow" />
      <path d="M600 200 H480" stroke={GREEN} strokeWidth="2.5" markerEnd="url(#distArrG)" className="distv-flow-arrow" />
      <Message path="M240 200 H360" label="sync" delay={0} color={GREEN} dur="2.5s" />
      <Box x={250} y={400} w={400} h={48} label="Cristian / NTP / Berkeley — bound clock skew" stroke={GREEN} fill="#ecfdf5" className="distv-pulse" />
    </Scene>
  )
}

/* ── 7. Logical / Lamport clocks ─────────────────────────────────── */
export function LamportScene() {
  const ys = [120, 220, 320]
  return (
    <Scene caption="Lamport clocks: send → timestamp; recv → max+1">
      <L x="450" y="36" size={18}>
        Logical / Lamport clocks
      </L>
      {['P0', 'P1', 'P2'].map((p, i) => (
        <g key={p}>
          <L x="50" y={ys[i] + 6} size={15} fill={MUTED} anchor="start">
            {p}
          </L>
          <line x1="90" y1={ys[i]} x2="850" y2={ys[i]} stroke={MUTED} strokeWidth="2" />
          {[1, 2, 3, 4, 5].map((t) => (
            <circle key={t} cx={90 + t * 140} cy={ys[i]} r="5" fill={SKY} stroke={BLUE} strokeWidth="1.5" />
          ))}
        </g>
      ))}
      {/* events with clocks */}
      <g className="distv-pulse">
        <circle cx="230" cy={ys[0]} r="16" fill={AMBER} />
        <L x="230" y={ys[0] + 5} size={12} fill={WHITE}>
          1
        </L>
      </g>
      <g className="distv-pulse distv-delay-1">
        <circle cx="370" cy={ys[1]} r="16" fill={BLUE} />
        <L x="370" y={ys[1] + 5} size={12} fill={WHITE}>
          3
        </L>
      </g>
      <g className="distv-pulse distv-delay-2">
        <circle cx="510" cy={ys[2]} r="16" fill={TEAL} />
        <L x="510" y={ys[2] + 5} size={12} fill={WHITE}>
          5
        </L>
      </g>
      <path d="M230 136 L370 204" fill="none" stroke={AMBER} strokeWidth="2.5" markerEnd="url(#distArrA)" className="distv-flow-arrow" />
      <path d="M370 236 L510 304" fill="none" stroke={BLUE} strokeWidth="2.5" markerEnd="url(#distArrB)" className="distv-flow-arrow" />
      <Message path="M230 136 L370 204" label="m:2" delay={0} color={AMBER} dur="2.6s" />
      <Message path="M370 236 L510 304" label="m:4" delay={1.1} color={PURP} dur="2.6s" />
      <L x="450" y="400" size={14} fill={MUTED}>
        e → e′ ⇒ L(e) &lt; L(e′) · concurrency when incomparable
      </L>
      <L x="450" y="440" size={13} fill={AMBER}>
        On receive: LC = max(LC, Tm) + 1
      </L>
    </Scene>
  )
}

/* ── 8. Global snapshot ──────────────────────────────────────────── */
export function SnapshotScene() {
  return (
    <Scene caption="Global snapshot: local state + channel state (marker)">
      <L x="450" y="40" size={20}>
        Global states / Chandy–Lamport
      </L>
      <Node x={100} y={160} w={140} h={80} label="P" sub="state Sp" className="distv-gate" stroke={BLUE} />
      <Node x={660} y={160} w={140} h={80} label="Q" sub="state Sq" className="distv-gate distv-delay-2" stroke={TEAL} />
      <Link x1={240} y1={180} x2={650} y2={180} color={BLUE} />
      <Link x1={650} y1={220} x2={240} y2={220} color={TEAL} marker="url(#distArrT)" className="distv-feedback" />
      <Message path="M250 180 H640" label="MARKER" delay={0} color={AMBER} dur="2.8s" />
      <Message path="M400 180 H500" label="app msg" delay={0.8} color={PURP} dur="2.8s" />
      <rect x={280} y={300} width={340} height={100} rx="12" fill={WHITE} stroke={AMBER} strokeWidth="2.5" className="distv-pulse" />
      <L x="450" y="340" size={15} fill={AMBER}>
        Cut = {`{Sp, Sq}`} + channel records
      </L>
      <L x="450" y="375" size={13} fill={MUTED}>
        Consistent cut: no arrow from after-cut into before-cut
      </L>
    </Scene>
  )
}

/* ── 9. Mutual exclusion ─────────────────────────────────────────── */
export function MutexScene() {
  return (
    <Scene caption="Distributed mutual exclusion — one process in CS">
      <L x="450" y="40" size={20}>
        Mutual exclusion
      </L>
      <rect x="340" y="160" width="220" height="140" rx="16" fill="#fff7ed" stroke={AMBER} strokeWidth="3" className="distv-wave" />
      <L x="450" y="220" size={18} fill={AMBER}>
        Critical Section
      </L>
      <L x="450" y="255" size={13} fill={MUTED}>
        TOKEN / permission
      </L>
      {[
        { x: 60, y: 120, label: 'P1', state: 'want' },
        { x: 60, y: 280, label: 'P2', state: 'wait' },
        { x: 720, y: 120, label: 'P3', state: 'in CS', stroke: GREEN },
        { x: 720, y: 280, label: 'P4', state: 'idle' },
      ].map((p, i) => (
        <Node
          key={p.label}
          x={p.x}
          y={p.y}
          w={120}
          h={64}
          label={p.label}
          sub={p.state}
          stroke={p.stroke || BLUE}
          className={`distv-actor distv-delay-${i}`}
          badge={p.state === 'in CS' ? '✓' : null}
          badgeFill={GREEN}
        />
      ))}
      <Link x1={180} y1={152} x2={340} y2={200} color={AMBER} marker="url(#distArrA)" />
      <Link x1={720} y1={152} x2={560} y2={200} color={GREEN} marker="url(#distArrG)" />
      <Message path="M180 152 L340 200" label="REQUEST" delay={0} color={AMBER} />
      <Message path="M560 230 L180 300" label="REPLY" delay={1.3} color={GREEN} />
      <L x="450" y="420" size={14} fill={MUTED}>
        Safety · liveness · fairness — Ricart–Agrawala / token ring
      </L>
    </Scene>
  )
}

/* ── 10. Election coordinator ────────────────────────────────────── */
export function ElectionScene() {
  const ring = [
    { x: 450, y: 80, id: 5, alive: true },
    { x: 680, y: 180, id: 3, alive: true },
    { x: 620, y: 360, id: 7, alive: false },
    { x: 280, y: 360, id: 2, alive: true },
    { x: 220, y: 180, id: 4, alive: true },
  ]
  return (
    <Scene caption="Election: highest alive id becomes coordinator">
      <L x="450" y="36" size={18}>
        Bully / Ring election
      </L>
      <circle cx="450" cy="240" r="150" fill="none" stroke={MUTED} strokeWidth="2" strokeDasharray="6 8" className="distv-orbit" />
      {ring.map((n, i) => {
        const next = ring[(i + 1) % ring.length]
        return (
          <g key={n.id}>
            <Link x1={n.x + 40} y1={n.y + 32} x2={next.x + 40} y2={next.y + 32} color={n.alive ? BLUE : MUTED} dashed={!n.alive} />
            <Node
              x={n.x}
              y={n.y}
              w={80}
              h={64}
              label={`P${n.id}`}
              sub={n.alive ? (n.id === 5 ? 'coord?' : 'alive') : 'FAILED'}
              stroke={n.alive ? (n.id === 5 ? AMBER : BLUE) : RED}
              fill={n.alive ? WHITE : '#fef2f2'}
              className={n.id === 5 ? 'distv-elect' : n.alive ? `distv-flow-node distv-delay-${i}` : ''}
              badge={n.id === 5 ? '★' : null}
            />
          </g>
        )
      })}
      <Message path="M490 112 C 620 140, 700 200, 700 200" label="ELECTION" delay={0} color={AMBER} dur="3s" />
      <Message path="M300 200 C 350 120, 420 100, 450 100" label="COORD" delay={1.5} color={GREEN} dur="3s" />
      <L x="450" y="460" size={14} fill={MUTED}>
        Detect failure → elect → announce new coordinator
      </L>
    </Scene>
  )
}

/* ── 11. Consensus propose / agree ───────────────────────────────── */
export function ConsensusScene() {
  return (
    <Scene caption="Consensus: propose a value → agree on one">
      <L x="450" y="40" size={20}>
        Consensus
      </L>
      <Node x={360} y={60} w={180} h={70} label="Proposer" sub="v = X" stroke={AMBER} className="distv-pulse" />
      {[0, 1, 2, 3].map((i) => (
        <Node
          key={i}
          x={60 + i * 210}
          y={260}
          w={150}
          h={70}
          label={`Acceptor ${i + 1}`}
          sub={i < 3 ? 'vote YES' : '…'}
          stroke={i < 3 ? GREEN : MUTED}
          className={`distv-flow-node distv-delay-${i}`}
        />
      ))}
      {[0, 1, 2].map((i) => (
        <Link key={i} x1={450} y1={130} x2={135 + i * 210} y2={260} color={AMBER} marker="url(#distArrA)" />
      ))}
      <Message path="M450 140 L200 260" label="PROPOSE" delay={0} color={AMBER} />
      <Message path="M200 290 L430 150" label="ACCEPT" delay={1.2} color={GREEN} />
      <rect x="250" y="380" width="400" height="56" rx="12" fill="#ecfdf5" stroke={GREEN} strokeWidth="2.5" className="distv-gate" />
      <L x="450" y="415" size={16} fill={GREEN}>
        Decided: X (majority)
      </L>
    </Scene>
  )
}

/* ── 12. Distributed transaction ─────────────────────────────────── */
export function TransactionScene() {
  return (
    <Scene caption="Distributed transaction spans multiple resource managers">
      <L x="450" y="40" size={20}>
        Distributed transaction
      </L>
      <Node x={340} y={70} w={220} h={70} label="Coordinator / TM" sub="begin → commit" stroke={AMBER} className="distv-system-box" />
      {[
        { x: 60, label: 'RM1', sub: 'Bank A' },
        { x: 340, label: 'RM2', sub: 'Bank B' },
        { x: 620, label: 'RM3', sub: 'Inventory' },
      ].map((rm, i) => (
        <g key={rm.label}>
          <Node x={rm.x} y={260} w={180} h={80} label={rm.label} sub={rm.sub} className={`distv-actor distv-delay-${i}`} stroke={TEAL} />
          <Link x1={450} y1={140} x2={rm.x + 90} y2={260} color={BLUE} />
        </g>
      ))}
      <Message path="M450 150 L150 260" label="work" delay={0} />
      <Message path="M450 150 L430 260" label="work" delay={0.6} color={PURP} />
      <Message path="M450 150 L710 260" label="work" delay={1.2} color={TEAL} />
      <L x="450" y="400" size={14} fill={MUTED}>
        Flat: one level · Nested: subtransactions · ACID across sites
      </L>
      <L x="450" y="440" size={13} fill={AMBER}>
        Recovery logs at each RM + coordinator
      </L>
    </Scene>
  )
}

/* ── 13. Atomic commit (2PC) ─────────────────────────────────────── */
export function AtomicCommitScene() {
  return (
    <Scene caption="2PC: PREPARE → YES/NO → COMMIT / ABORT">
      <L x="450" y="36" size={18}>
        Two-phase commit
      </L>
      <Node x={360} y={50} w={180} h={64} label="Coordinator" sub="Phase 1 → 2" stroke={AMBER} className="distv-elect" />
      {[
        { x: 80, vote: 'YES', stroke: GREEN },
        { x: 360, vote: 'YES', stroke: GREEN },
        { x: 640, vote: 'NO', stroke: RED },
      ].map((p, i) => (
        <Node
          key={i}
          x={p.x}
          y={280}
          w={160}
          h={70}
          label={`Participant ${i + 1}`}
          sub={p.vote}
          stroke={p.stroke}
          className={`distv-flow-node distv-delay-${i}`}
          badge={p.vote}
          badgeFill={p.vote === 'YES' ? GREEN : RED}
        />
      ))}
      <Link x1={450} y1={114} x2={160} y2={280} color={BLUE} />
      <Link x1={450} y1={114} x2={440} y2={280} color={BLUE} />
      <Link x1={450} y1={114} x2={720} y2={280} color={BLUE} />
      <Message path="M450 120 L200 280" label="PREPARE" delay={0} color={AMBER} dur="2.5s" />
      <Message path="M200 300 L430 140" label="YES" delay={1.0} color={GREEN} dur="2.5s" />
      <Message path="M720 300 L480 140" label="NO" delay={1.2} color={RED} dur="2.5s" />
      <rect x="200" y="390" width="500" height="56" rx="12" fill="#fef2f2" stroke={RED} strokeWidth="2.5" className="distv-pulse" />
      <L x="450" y="425" size={16} fill={RED}>
        Decision: ABORT (any NO ⇒ abort all)
      </L>
    </Scene>
  )
}

/* ── 14. Deadlock wait-for cycle ──────────────────────────────────── */
export function DeadlockScene() {
  const pts = [
    { x: 450, y: 90, label: 'T1' },
    { x: 680, y: 240, label: 'T2' },
    { x: 450, y: 380, label: 'T3' },
    { x: 220, y: 240, label: 'T4' },
  ]
  return (
    <Scene caption="Deadlock: cycle in the wait-for graph">
      <L x="450" y="40" size={20}>
        Distributed deadlock
      </L>
      {pts.map((p, i) => {
        const n = pts[(i + 1) % pts.length]
        return (
          <g key={p.label}>
            <Link x1={p.x + 40} y1={p.y + 32} x2={n.x + 40} y2={n.y + 32} color={RED} marker="url(#distArrR)" className="distv-wait-edge" />
            <Node x={p.x} y={p.y} w={80} h={64} label={p.label} sub="waits" stroke={RED} className={`distv-actor distv-delay-${i}`} />
          </g>
        )
      })}
      <Message path="M490 122 L700 250" label="waits-for" delay={0} color={RED} dur="3s" />
      <rect x="280" y="210" width="340" height="50" rx="10" fill="#fef2f2" stroke={RED} strokeWidth="2" className="distv-pulse" />
      <L x="450" y="242" size={15} fill={RED}>
        Cycle detected → abort a victim
      </L>
    </Scene>
  )
}

/* ── 15. Replication Primary → replicas ──────────────────────────── */
export function ReplicationScene() {
  return (
    <Scene caption="Replication: Primary → replicas update propagation">
      <L x="450" y="40" size={20}>
        Primary–backup replication
      </L>
      <Node x={360} y={70} w={180} h={80} label="PRIMARY" sub="accept writes" stroke={AMBER} className="distv-elect" badge="P" />
      {[
        { x: 80, label: 'Replica 1' },
        { x: 360, label: 'Replica 2' },
        { x: 640, label: 'Replica 3' },
      ].map((r, i) => (
        <g key={r.label}>
          <Node x={r.x} y={300} w={170} h={70} label={r.label} sub="apply update" stroke={TEAL} className={`distv-flow-node distv-delay-${i}`} />
          <Link x1={450} y1={150} x2={r.x + 85} y2={300} color={TEAL} marker="url(#distArrT)" />
        </g>
      ))}
      <Node x={60} y={90} w={130} h={60} label="Client" sub="write(x)" className="distv-actor" />
      <Link x1={190} y1={120} x2={360} y2={110} color={BLUE} />
      <Message path="M200 120 H360" label="WRITE" delay={0} color={AMBER} dur="2.4s" />
      <Message path="M450 160 L165 300" label="UPDATE" delay={0.8} color={TEAL} dur="2.6s" />
      <Message path="M450 160 L445 300" label="UPDATE" delay={1.0} color={PURP} dur="2.6s" />
      <Message path="M450 160 L725 300" label="UPDATE" delay={1.2} color={BLUE} dur="2.6s" />
      <L x="450" y="420" size={14} fill={MUTED}>
        Sync vs async · quorum · failover promotes a replica
      </L>
    </Scene>
  )
}

/* ── Challenges / resource sharing helpers ───────────────────────── */
export function ChallengesScene() {
  const items = [
    ['Heterogeneity', BLUE],
    ['Openness', TEAL],
    ['Security', RED],
    ['Scalability', PURP],
    ['Failure handling', AMBER],
    ['Concurrency', GREEN],
    ['Transparency', BLUE],
    ['QoS', TEAL],
  ]
  return (
    <Scene caption="Design challenges of distributed systems">
      <L x="450" y="40" size={20}>
        Challenges
      </L>
      {items.map(([t, c], i) => (
        <Box
          key={t}
          x={40 + (i % 4) * 215}
          y={100 + Math.floor(i / 4) * 160}
          w={200}
          h={100}
          label={t}
          stroke={c}
          className={`distv-step distv-delay-${i % 5}`}
        />
      ))}
    </Scene>
  )
}

export function ResourceShareScene() {
  return (
    <Scene caption="Resource sharing via remote services">
      <L x="450" y="40" size={20}>
        Resource sharing
      </L>
      <Node x={80} y={200} label="User A" className="distv-actor" />
      <Node x={80} y={320} label="User B" className="distv-actor distv-delay-1" />
      <Node x={360} y={240} w={160} h={80} label="Service" sub="shared API" stroke={TEAL} className="distv-system-box" />
      <Node x={680} y={180} label="Disk" stroke={GREEN} className="distv-pulse" />
      <Node x={680} y={300} label="Printer" stroke={PURP} className="distv-pulse distv-delay-2" />
      <Link x1={198} y1={232} x2={360} y2={270} />
      <Link x1={198} y1={352} x2={360} y2={300} />
      <Link x1={520} y1={260} x2={680} y2={210} color={GREEN} marker="url(#distArrG)" />
      <Link x1={520} y1={290} x2={680} y2={330} color={PURP} marker="url(#distArr)" />
      <Message path="M210 240 L360 270" label="access" delay={0} />
    </Scene>
  )
}

export function GroupCommScene() {
  return (
    <Scene caption="Group communication: multicast to members">
      <L x="450" y="40" size={20}>
        Group communication
      </L>
      <Node x={80} y={200} w={140} h={70} label="Sender" className="distv-actor" />
      {[0, 1, 2, 3].map((i) => (
        <Node key={i} x={520} y={70 + i * 90} w={140} h={60} label={`M${i + 1}`} className={`distv-flow-node distv-delay-${i}`} stroke={TEAL} />
      ))}
      {[0, 1, 2, 3].map((i) => (
        <Link key={i} x1={220} y1={235} x2={520} y2={100 + i * 90} color={BLUE} />
      ))}
      <Message path="M230 235 L520 100" label="mcast" delay={0} />
      <Message path="M230 235 L520 190" label="mcast" delay={0.3} color={PURP} />
      <Message path="M230 235 L520 280" label="mcast" delay={0.6} color={TEAL} />
      <L x="300" y="420" size={14} fill={MUTED} anchor="start">
        Reliable / ordered / atomic multicast variants
      </L>
    </Scene>
  )
}

/* ── beatVisual: keyword → scene ─────────────────────────────────── */
function pickScene(topic = '', beatIndex = 0) {
  const t = topic.toLowerCase()

  if (/request.?reply|request-reply/.test(t)) return <RequestReplyScene />
  if (/remote procedure|rpc/.test(t)) return <RpcScene />
  if (/rmi|remote method/.test(t)) return <RpcScene />
  if (/file service|distributed file|dfs/.test(t)) return <DfsScene />
  if (/name service|domain name|directory service|dns/.test(t)) return <NameResolveScene />
  if (/physical clock|synchronizing physical/.test(t)) return <PhysicalClockScene />
  if (/logical clock|logical time|lamport/.test(t)) return <LamportScene />
  if (/global state|snapshot/.test(t)) return <SnapshotScene />
  if (/mutual exclusion|mutex/.test(t)) return <MutexScene />
  if (/election/.test(t)) return <ElectionScene />
  if (/consensus|agreement/.test(t)) return <ConsensusScene />
  if (/atomic commit|two.?phase|2pc/.test(t)) return <AtomicCommitScene />
  if (/deadlock/.test(t)) return <DeadlockScene />
  if (/replication/.test(t)) return <ReplicationScene />
  if (/transaction/.test(t)) return <TransactionScene />
  if (/group communication|coordination/.test(t) && !/mutual|election|consensus/.test(t)) return <GroupCommScene />
  if (/challenge/.test(t)) return <ChallengesScene />
  if (/resource sharing/.test(t)) return <ResourceShareScene />
  if (/clocks events|process states/.test(t)) return <LamportScene />
  if (/concurrency control/.test(t)) return <MutexScene />
  if (/recovery/.test(t)) return <TransactionScene />
  if (/introduction to distributed|message movement|characterization|why the module/.test(t)) {
    return beatIndex % 2 === 1 ? <RequestReplyScene /> : <DistSystemScene />
  }
  return null
}

export function beatVisual(unit, beatIndex = 0) {
  const scene = pickScene(unit?.topic || '', beatIndex)
  if (scene) return scene
  return <ConceptBoard title={unit?.topic || 'Concept'} points={unit?.terms || []} />
}
