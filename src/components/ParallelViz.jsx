/* Living instructional visuals for Parallel Computing (Module 1 first).
   Configurable, phase-aware SVG components + reusable primitives.
   Paired stylesheet: src/parallelViz.css (imported once here).

   Design contract:
   - Static first frame is COMPLETE (structure at full opacity; only motion
     elements animate). Diagrams restart on slide revisit (deck remounts).
   - No academic content lives here — only pictures of it.
*/
import '../parallelViz.css'

/* ------------------------------------------------------------------ *
 * Primitives (return <g>; compose inside a parent <svg>)
 * ------------------------------------------------------------------ */

export function ThreadLane({ x, y, w, active = false, i = 0 }) {
  return (
    <g className={`pv-lane ${active ? 'active' : ''}`.trim()} style={{ '--pv-lane-dx': `${w - 14}px` }}>
      <line className="pv-lane-track" x1={x} y1={y} x2={x + w} y2={y} />
      <rect className="pv-lane-pulse" x={x} y={y - 2.5} width="9" height="5" rx="2.5"
        style={{ animationDelay: `${i * 0.4}s` }} />
    </g>
  )
}

export function ProcessorCore({ x, y, w = 88, h = 72, state = 'idle', label = 'Core', threads = 3, i = 0 }) {
  const lanes = Array.from({ length: threads })
  const laneGap = (h - 26) / (threads + 1)
  return (
    <g className={`pv-core ${state}`}>
      <rect className="pv-core-glow" x={x - 3} y={y - 3} width={w + 6} height={h + 6} rx="12" />
      <rect className="pv-core-body" x={x} y={y} width={w} height={h} rx="10" />
      <rect className="pv-core-etch" x={x + 7} y={y + 7} width={w - 14} height={h - 24} rx="6" />
      {lanes.map((_, k) => (
        <ThreadLane key={k} x={x + 12} y={y + 14 + laneGap * (k + 1)} w={w - 24} active={state === 'busy' || state === 'hot'} i={(i + k) % 4} />
      ))}
      <circle className="pv-core-led" cx={x + w - 13} cy={y + 13} r="4.5" />
      <text className="pv-t-sub" x={x + w / 2} y={y + h - 7} textAnchor="middle" fontSize="11">{label}</text>
    </g>
  )
}

export function TaskPacket({ x, y, dx = 0, dy = 0, tone = 'a', delay = 0, r = 6 }) {
  return (
    <rect className={`pv-packet ${tone}`} x={x - r} y={y - r} width={r * 2} height={r * 2} rx="2.5"
      style={{ '--pv-dx': `${dx}px`, '--pv-dy': `${dy}px`, animationDelay: `${delay}s` }} />
  )
}

export function WorkloadChunk({ x, y, w, h, tone = '#2563eb', i = 0, animate = true }) {
  return (
    <rect className={`pv-chunk ${animate ? 'enter' : ''}`.trim()} x={x} y={y} width={w} height={h} rx="5"
      fill={tone} style={{ '--i': i }} />
  )
}

export function MemoryBlock({ x, y, w, h, label, meta, cls = 'pv-tier-mid' }) {
  return (
    <g>
      <rect className={`pv-tier-body ${cls}`} x={x} y={y} width={w} height={h} rx="9" />
      <text className="pv-tier-label" x={x + 14} y={y + h / 2 + (meta ? -3 : 5)} fontSize="15">{label}</text>
      {meta && <text className="pv-tier-meta" x={x + 14} y={y + h / 2 + 14} fontSize="11">{meta}</text>}
    </g>
  )
}

export function Interconnect({ x1, y1, x2, y2, live = false }) {
  return <line className={live ? 'pv-wire-live' : 'pv-wire'} x1={x1} y1={y1} x2={x2} y2={y2} />
}

export function BarrierGate({ x, y, h, label = 'barrier' }) {
  return (
    <g>
      <rect className="pv-gate-post" x={x - 2} y={y} width="4" height={h} rx="2" />
      <rect className="pv-gate-bar" x={x} y={y + h / 2 - 4} width="30" height="8" rx="3" />
      <text className="pv-gate-label" x={x + 15} y={y + h + 14} textAnchor="middle" fontSize="10.5">{label}</text>
    </g>
  )
}

export function CoherenceSignal({ x, y, dx = 120 }) {
  return <rect className="pv-sig run" x={x - 6} y={y - 4} width="12" height="8" rx="3" style={{ '--pv-sig-dx': `${dx}px` }} />
}

export function SpeedupMeter({ x, y, w = 180, ideal = 4, actual = 3.2, label }) {
  const frac = Math.max(0, Math.min(1, actual / ideal))
  return (
    <g>
      {label && <text className="pv-t-cap" x={x} y={y - 8} fontSize="10.5">{label}</text>}
      <rect className="pv-meter-track" x={x} y={y} width={w} height="16" rx="8" />
      <rect className="pv-meter-ideal" x={x} y={y} width={w} height="16" rx="8" />
      <rect className="pv-meter-actual" x={x} y={y} width={w * frac} height="16" rx="8" />
      <text className="pv-meter-cap" x={x} y={y + 34} fontSize="13">actual {actual}×</text>
      <text className="pv-t-sub" x={x + w} y={y + 34} textAnchor="end" fontSize="12">ideal {ideal}×</text>
    </g>
  )
}

export function ProcessorGrid({ x, y, cols = 2, rows = 2, cell = 88, gap = 14, states = [], label = 'Core', threads = 3 }) {
  const out = []
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const idx = r * cols + c
      out.push(
        <ProcessorCore key={idx} x={x + c * (cell + gap)} y={y + r * (cell * 0.82 + gap)}
          w={cell} h={cell * 0.82} state={states[idx] || 'idle'} label={label} threads={threads} i={idx} />
      )
    }
  }
  return <g>{out}</g>
}

/* CacheLayer is an alias of MemoryBlock tuned for a hierarchy tier */
export function CacheLayer(props) { return <MemoryBlock {...props} /> }

/* ------------------------------------------------------------------ *
 * Diagram: PipelineFlow  (instructions/items stream through stages)
 * ------------------------------------------------------------------ */
export function PipelineFlow({ stages = ['Fetch', 'Decode', 'Execute', 'Memory', 'Write Back'], items = 4 }) {
  const n = stages.length
  const pad = 16, gap = 12
  const sw = (620 - pad * 2 - gap * (n - 1)) / n
  const sy = 96, sh = 66
  const xOf = (i) => pad + i * (sw + gap)
  return (
    <svg className="pv-svg" viewBox="0 0 620 236" role="img" aria-label="Pipeline: items flow through stages, overlapping for continuous output">
      {stages.map((s, i) => (
        <g key={i}>
          <rect className="pv-stage-body" x={xOf(i)} y={sy} width={sw} height={sh} rx="10" />
          <text className="pv-t-cap" x={xOf(i) + sw / 2} y={sy - 8} textAnchor="middle" fontSize="9.5">stage {i + 1}</text>
          <text className="pv-t-label" x={xOf(i) + sw / 2} y={sy + sh / 2 + 4} textAnchor="middle" fontSize="12">
            {s.length > 14 ? s.split(' ').map((w, wi) => <tspan key={wi} x={xOf(i) + sw / 2} dy={wi === 0 ? -4 : 13}>{w}</tspan>) : s}
          </text>
          {i < n - 1 && <path className="pv-wire-live" d={`M${xOf(i) + sw} ${sy + sh / 2} h ${gap}`} />}
        </g>
      ))}
      {/* items flowing through, staggered => pipelined overlap */}
      {Array.from({ length: items }).map((_, k) => (
        <rect key={k} className="pv-pipe-item" x={xOf(0) + 8} y={sy + sh / 2 - 7} width="16" height="14" rx="4"
          fill={['#2563eb', '#0ea5a4', '#d97706', '#6d5dd3'][k % 4]}
          style={{ '--pv-pipe-dx': `${xOf(n - 1) - xOf(0) + sw - 24}px`, animationDelay: `${k * 0.9}s` }} />
      ))}
      <text className="pv-t-sub" x="310" y="24" textAnchor="middle" fontSize="12">several items in flight at once — the pipeline gives continuous output</text>
      <text className="pv-t-cap" x="310" y="212" textAnchor="middle" fontSize="10">one item enters as another leaves</text>
    </svg>
  )
}

/* ------------------------------------------------------------------ *
 * Diagram: InterconnectFabric  (topology as a living communication fabric)
 * ------------------------------------------------------------------ */
export function InterconnectFabric({ type = 'mesh' }) {
  // node layouts + edge lists per topology
  const layouts = {
    mesh: {
      nodes: [[80, 70], [200, 70], [320, 70], [80, 200], [200, 200], [320, 200]],
      edges: [[0, 1], [1, 2], [3, 4], [4, 5], [0, 3], [1, 4], [2, 5]],
      route: [0, 1, 4, 5],
    },
    torus: {
      nodes: [[80, 70], [200, 70], [320, 70], [80, 200], [200, 200], [320, 200]],
      edges: [[0, 1], [1, 2], [3, 4], [4, 5], [0, 3], [1, 4], [2, 5]],
      wraps: [[0, 2], [3, 5], [0, 3], [2, 5]],
      route: [0, 1, 2],
    },
    hypercube: {
      nodes: [[70, 60], [200, 60], [70, 190], [200, 190], [130, 110], [260, 110], [130, 240], [260, 240]],
      edges: [[0, 1], [0, 2], [1, 3], [2, 3], [4, 5], [4, 6], [5, 7], [6, 7], [0, 4], [1, 5], [2, 6], [3, 7]],
      route: [0, 1, 5, 7],
    },
  }
  if (type === 'bus') {
    const nx = [70, 150, 230, 310]
    return (
      <svg className="pv-svg" viewBox="0 0 400 300" role="img" aria-label="Bus topology: one shared medium, one transfer at a time">
        <rect className="pv-bus" x="40" y="150" width="320" height="20" rx="8" />
        <rect className="pv-congest" x="192" y="153" width="12" height="14" rx="3" />
        {nx.map((x, k) => (
          <g key={k}>
            <line className="pv-wire" x1={x} y1="112" x2={x} y2="150" />
            <circle className="pv-node" cx={x} cy="96" r="20" />
            <text x={x} y="101" textAnchor="middle" fontSize="11" className="pv-t-label">N{k + 1}</text>
          </g>
        ))}
        <TaskPacket x={70} y={160} dx={240} dy={0} tone="a" delay={0} r={5} />
        <text className="pv-t-sub" x="200" y="210" textAnchor="middle" fontSize="12">shared medium · one message at a time · contention</text>
        <text className="pv-t-cap" x="200" y="248" textAnchor="middle" fontSize="11">BUS</text>
      </svg>
    )
  }
  if (type === 'crossbar') {
    const rows = [80, 140, 200], cols = [120, 200, 280]
    return (
      <svg className="pv-svg" viewBox="0 0 400 300" role="img" aria-label="Crossbar: switches allow many simultaneous paths">
        {rows.map((y, r) => <line key={`r${r}`} className="pv-wire" x1="70" y1={y} x2="320" y2={y} />)}
        {cols.map((x, c) => <line key={`c${c}`} className="pv-wire" x1={x} y1="50" x2={x} y2="230" />)}
        {rows.map((y, r) => cols.map((x, c) => <circle key={`s${r}${c}`} className="pv-switch-node" cx={x} cy={y} r="7" />))}
        {rows.map((y, r) => <text key={`rl${r}`} x="52" y={y + 4} textAnchor="end" fontSize="11" className="pv-t-label">P{r + 1}</text>)}
        <TaskPacket x={200} y={80} dx={0} dy={120} tone="b" delay={0} r={5} />
        <TaskPacket x={120} y={140} dx={200} dy={0} tone="c" delay={0.4} r={5} />
        <text className="pv-t-sub" x="200" y="262" textAnchor="middle" fontSize="12">switches enable many simultaneous transfers</text>
        <text className="pv-t-cap" x="200" y="284" textAnchor="middle" fontSize="11">CROSSBAR</text>
      </svg>
    )
  }
  const L = layouts[type] || layouts.mesh
  const routeEdges = []
  for (let i = 0; i < (L.route?.length || 0) - 1; i++) routeEdges.push([L.route[i], L.route[i + 1]])
  return (
    <svg className="pv-svg" viewBox="0 0 400 300" role="img" aria-label={`${type} topology communication fabric`}>
      {L.edges.map(([a, b], k) => (
        <line key={k} className="pv-wire" x1={L.nodes[a][0]} y1={L.nodes[a][1]} x2={L.nodes[b][0]} y2={L.nodes[b][1]} />
      ))}
      {L.wraps?.map(([a, b], k) => (
        <path key={`w${k}`} className="pv-wire pv-wrap" d={`M${L.nodes[a][0]} ${L.nodes[a][1]} C ${L.nodes[a][0] - 60} ${(L.nodes[a][1] + L.nodes[b][1]) / 2}, ${L.nodes[b][0] - 60} ${(L.nodes[a][1] + L.nodes[b][1]) / 2}, ${L.nodes[b][0]} ${L.nodes[b][1]}`} />
      ))}
      {/* highlighted route + travelling packet */}
      {routeEdges.map(([a, b], k) => (
        <line key={`re${k}`} className="pv-wire-live" x1={L.nodes[a][0]} y1={L.nodes[a][1]} x2={L.nodes[b][0]} y2={L.nodes[b][1]} />
      ))}
      {routeEdges.map(([a, b], k) => (
        <TaskPacket key={`rp${k}`} x={L.nodes[a][0]} y={L.nodes[a][1]} dx={L.nodes[b][0] - L.nodes[a][0]} dy={L.nodes[b][1] - L.nodes[a][1]} tone="a" delay={k * 0.5} r={5} />
      ))}
      {L.nodes.map(([x, y], k) => (
        <g key={k}>
          <circle className="pv-node" cx={x} cy={y} r="18" />
          <text x={x} y={y + 4} textAnchor="middle" fontSize="10.5" className="pv-t-label">{type === 'hypercube' ? k.toString(2).padStart(3, '0') : `N${k + 1}`}</text>
        </g>
      ))}
      <text className="pv-t-cap" x="200" y="288" textAnchor="middle" fontSize="11">{type.toUpperCase()}</text>
    </svg>
  )
}

/* ------------------------------------------------------------------ *
 * Diagram: LivingCluster  (racks + switch + heartbeat + load)
 * ------------------------------------------------------------------ */
export function LivingCluster({ overload = false, cluster = false }) {
  const count = cluster ? 5 : 3
  const spanL = 60, spanR = 540
  const step = (spanR - spanL) / count
  const racks = Array.from({ length: count }, (_, k) => spanL + step * k + step / 2)
  const hotIdx = overload ? count - 2 : -1
  return (
    <svg className="pv-svg" viewBox="0 0 600 330" role="img" aria-label="Compute cluster: racks, switch, heartbeats and load">
      {/* spine switch */}
      <rect className="pv-switch-body" x="130" y="26" width="340" height="30" rx="9" />
      <text className="pv-t-label" x="300" y="46" textAnchor="middle" fontSize="12">core switch</text>
      {racks.map((cx, k) => {
        const hot = k === hotIdx
        const load = hot ? 0.92 : [0.5, 0.62, 0.44, 0.58, 0.5][k % 5]
        return (
          <g key={k} className={`pv-rack ${hot ? 'hot' : ''}`.trim()}>
            {/* link rack -> switch */}
            <line className={hot ? 'pv-wire-live' : 'pv-wire'} x1={cx} y1="56" x2={cx} y2="120" />
            {/* heartbeat up to switch */}
            <TaskPacket x={cx} y={112} dx={0} dy={-52} tone={hot ? 'c' : 'g'} delay={k * 0.4} r={4} />
            {/* rack body */}
            <rect className="pv-rack-body" x={cx - 34} y="120" width="68" height="150" rx="9" />
            {[0, 1, 2, 3].map((u) => (
              <g key={u}>
                <rect className="pv-rack-slot" x={cx - 26} y={132 + u * 28} width="40" height="18" rx="3" />
                <circle className={`pv-rack-unit ${!hot ? 'on' : ''}`.trim()} cx={cx + 20} cy={141 + u * 28} r="4" style={{ animationDelay: `${u * 0.2}s` }} />
              </g>
            ))}
            {/* load bar */}
            <rect className="pv-load-track" x={cx - 34} y="278" width="68" height="12" rx="6" />
            <rect className={`pv-load-fill ${hot ? 'high' : ''}`.trim()} x={cx - 34} y="278" width={68 * load} height="12" rx="6" />
            <text className="pv-t-cap" x={cx} y="308" textAnchor="middle" fontSize="9">rack {k + 1}{hot ? ' · hot' : ''}</text>
          </g>
        )
      })}
      <text className="pv-t-sub" x="300" y="326" textAnchor="middle" fontSize="11">{overload ? 'one rack is a hotspot — load is uneven across the cluster' : 'racks exchange heartbeats through the switch — balanced load'}</text>
    </svg>
  )
}

/* ------------------------------------------------------------------ *
 * Diagram: LoadBalancing  (#8 balanced vs imbalanced, then redistribute)
 * ------------------------------------------------------------------ */
export function LoadBalancing() {
  const chunk = 20, cw = 46
  const bal = [4, 4, 4, 4]
  const imb = [8, 2, 2, 2]
  const panel = (x0, title, heights, dim, finishY, note) => {
    const cols = [0, 1, 2, 3].map((k) => x0 + 18 + k * (cw + 8))
    return (
      <g>
        <text className="pv-t-label" x={x0 + 130} y={26} textAnchor="middle" fontSize="13">{title}</text>
        {/* finish line */}
        <line className="pv-finish" x1={x0 + 6} y1={finishY} x2={x0 + 254} y2={finishY} />
        <text className="pv-t-cap" x={x0 + 6} y={finishY - 6} fontSize="9" fill="#16a34a">finish</text>
        {heights.map((h, k) => {
          const idle = dim && h < Math.max(...heights)
          return (
            <g key={k} className={idle ? 'pv-idle' : ''}>
              {Array.from({ length: h }).map((_, c) => (
                <rect key={c} x={cols[k]} y={210 - (c + 1) * (chunk + 2)} width={cw} height={chunk} rx="4"
                  fill={['#2563eb', '#0ea5a4', '#d97706', '#6d5dd3'][k]} opacity="0.9" />
              ))}
              <ProcessorCore x={cols[k]} y={216} w={cw} h={30} state={idle ? 'idle' : 'busy'} label={`w${k + 1}`} threads={1} i={k} />
              {idle && <text className="pv-t-cap" x={cols[k] + cw / 2} y={262} textAnchor="middle" fontSize="8.5" fill="#94a3b8">idle</text>}
            </g>
          )
        })}
        <text className="pv-t-sub" x={x0 + 130} y={286} textAnchor="middle" fontSize="10.5">{note}</text>
      </g>
    )
  }
  return (
    <svg className="pv-svg" viewBox="0 0 580 300" role="img" aria-label="Load balancing: balanced finishes together; imbalanced waits for the slowest">
      {panel(0, 'Balanced', bal, false, 210 - 4 * (chunk + 2) - 4, 'all workers finish together')}
      {/* redistribute arrow */}
      <g>
        <path className="pv-wire-live" d="M292 150 h 24" />
        <path d="M316 150 l -8 -5 v 10 z" className="pv-fill-blue" />
        <text className="pv-t-cap" x="304" y="140" textAnchor="middle" fontSize="9">balance</text>
      </g>
      {panel(320, 'Imbalanced', imb, true, 210 - 8 * (chunk + 2) - 4, 'completion waits for the slowest worker')}
    </svg>
  )
}

/* ------------------------------------------------------------------ *
 * Diagram: ProcessorPackage  (#2 CPU opens into cores & threads)
 * ------------------------------------------------------------------ */
export function ProcessorPackage({ label = 'CPU', cores = 4, hot = false }) {
  const state = hot ? 'hot' : 'busy'
  const grid = [
    { x: 150, y: 150 }, { x: 258, y: 150 },
    { x: 150, y: 236 }, { x: 258, y: 236 },
  ].slice(0, Math.max(1, Math.min(4, cores)))
  return (
    <svg className="pv-svg" viewBox="0 0 460 360" role="img" aria-label={`${label} package opening into cores and threads`}>
      {/* lifted lid (exploded) */}
      <g className="pv-heat-group">
        {hot && [180, 230, 280].map((hx, k) => (
          <path key={hx} className="pv-heat on" style={{ animationDelay: `${k * 0.3}s` }}
            d={`M${hx} 96 q -8 -12 0 -22 q 8 -10 0 -22`} />
        ))}
      </g>
      <rect className="pv-pkg-lid" x="132" y="44" width="200" height="46" rx="11" />
      <text className="pv-t-sub" x="232" y="72" textAnchor="middle" fontSize="12">heat spreader / lid — lifted</text>
      <line className="pv-wire" x1="140" y1="90" x2="126" y2="128" strokeDasharray="4 5" />
      <line className="pv-wire" x1="324" y1="90" x2="346" y2="128" strokeDasharray="4 5" />

      {/* substrate + pins (depth) */}
      <rect className="pv-pkg-substrate" x="112" y="126" width="240" height="192" rx="16" />
      {Array.from({ length: 9 }).map((_, k) => (
        <rect key={`pb${k}`} className="pv-pkg-pin" x={126 + k * 24} y="320" width="10" height="12" rx="3" />
      ))}
      <rect className="pv-pkg-die" x="126" y="138" width="212" height="168" rx="11" />
      <text className="pv-t-cap" x="232" y="132" textAnchor="middle" fontSize="10.5">{label} package</text>

      {/* cores with thread lanes */}
      {grid.map((g, k) => (
        <ProcessorCore key={k} x={g.x} y={g.y} w={86} h={70} state={state} label={`core ${k + 1}`} threads={3} i={k} />
      ))}

      {/* tasks entering the package from the left */}
      {[0, 1, 2, 3].map((k) => (
        <TaskPacket key={k} x={60} y={168 + k * 22} dx={90 + (k % 2) * 108} dy={(k < 2 ? 0 : 82)} tone={['a', 'b', 'c', 'q'][k]} delay={k * 0.5} />
      ))}
      <text className="pv-t-cap" x="60" y="150" textAnchor="middle" fontSize="10">tasks</text>

      {/* legend: processor / core / thread / task */}
      <g transform="translate(0,342)">
        <text className="pv-t-sub" x="24" y="0" fontSize="11.5">
          <tspan className="pv-t-label">Processor</tspan> holds many <tspan className="pv-t-label">cores</tspan>; each core runs <tspan className="pv-t-label">threads</tspan> executing <tspan className="pv-t-label">tasks</tspan>.
        </text>
      </g>
    </svg>
  )
}

/* ------------------------------------------------------------------ *
 * Diagram: EvolutionFlow  (#1 sequential -> parallel, the anchor)
 *   One core (long time) vs four cores (short time) + why speedup < ideal.
 * ------------------------------------------------------------------ */
export function EvolutionFlow() {
  const seq = ['a', 'b', 'c', 'q', 'a', 'b', 'c', 'q']
  const parLaneEnds = [250, 250, 250, 292] // last lane runs long => imbalance tail
  return (
    <svg className="pv-svg" viewBox="0 0 640 396" role="img" aria-label="Sequential versus parallel execution and why speedup is below ideal">
      {/* ---------------- Sequential ---------------- */}
      <text className="pv-t-cap" x="20" y="30" fontSize="11">Sequential · 1 core</text>
      <ProcessorCore x={20} y={40} w={78} h={52} state="hot" label="core" threads={2} i={0} />
      <line className="pv-wire" x1="112" y1="66" x2="126" y2="66" />
      {seq.map((tone, k) => (
        <g key={k}>
          <rect className={`pv-chunk`} x={128 + k * 58} y={50} width="54" height="32" rx="5"
            fill={{ a: '#2563eb', b: '#0ea5a4', c: '#d97706', q: '#6d5dd3' }[tone]} opacity="0.92" />
          <text x={128 + k * 58 + 27} y={70} textAnchor="middle" fontSize="11" fill="#fff" className="pv-t-mono">T{k + 1}</text>
        </g>
      ))}
      <TaskPacket x={140} y={40} dx={408} dy={0} tone="q" delay={0} r={5} />
      <text className="pv-t-label" x={620} y={70} textAnchor="end" fontSize="15">80 s</text>
      <line className="pv-wire" x1="128" y1="94" x2="602" y2="94" />
      <text className="pv-t-sub" x="128" y="108" fontSize="10.5">work done one task after another — the core is the bottleneck</text>

      {/* ---------------- Parallel ---------------- */}
      <text className="pv-t-cap" x="20" y="150" fontSize="11">Parallel · 4 cores</text>
      {[0, 1, 2, 3].map((r) => {
        const y = 160 + r * 40
        const end = parLaneEnds[r]
        const busy = 'busy'
        return (
          <g key={r}>
            <ProcessorCore x={20} y={y} w={78} h={30} state={busy} label={`c${r + 1}`} threads={1} i={r} />
            <line className="pv-wire" x1="102" y1={y + 15} x2="126" y2={y + 15} />
            {/* two task segments per lane */}
            <rect className="pv-chunk" x={128} y={y + 2} width={(end - 128) / 2 - 4} height="26" rx="5" fill="#2563eb" opacity="0.92" />
            <rect className="pv-chunk" x={128 + (end - 128) / 2} y={y + 2} width={(end - 128) / 2 - 4} height="26" rx="5" fill="#0ea5a4" opacity="0.92" />
            {r === 3 && <text className="pv-state-I" x={end + 6} y={y + 20} fontSize="10.5" fontWeight="850">tail</text>}
            <TaskPacket x={140} y={y + 15} dx={end - 150} dy={0} tone={['a', 'b', 'c', 'a'][r]} delay={0.2 * r} r={4.5} />
          </g>
        )
      })}
      {/* barrier + merge */}
      <BarrierGate x={318} y={158} h={128} label="sync" />
      <rect className="pv-bus" x={352} y={168} width="96" height="108" rx="10" />
      <text className="pv-t-label" x={400} y={216} textAnchor="middle" fontSize="13">MERGE</text>
      <text className="pv-t-sub" x={400} y={234} textAnchor="middle" fontSize="10.5">assemble</text>
      <text className="pv-t-sub" x={400} y={248} textAnchor="middle" fontSize="10.5">result</text>
      <TaskPacket x={360} y={222} dx={90} dy={0} tone="c" delay={1.4} r={5} />
      <text className="pv-t-label" x={470} y={226} fontSize="15">25 s</text>

      {/* ---------------- Speedup readout ---------------- */}
      <line className="pv-wire" x1="20" y1="316" x2="620" y2="316" opacity="0.5" />
      <SpeedupMeter x={20} y={340} w={260} ideal={4} actual={3.2} label="speedup = 80 s ÷ 25 s = 3.2×" />
      <text className="pv-t-sub" x={320} y={344} fontSize="12">Efficiency η = 3.2 ÷ 4 = <tspan className="pv-t-label">80%</tspan></text>
      <text className="pv-t-sub" x={320} y={366} fontSize="11.5" >More cores cut time, but <tspan className="pv-t-label">imbalance + sync + merge</tspan></text>
      <text className="pv-t-sub" x={320} y={382} fontSize="11.5">keep real speedup below the ideal 4×.</text>
    </svg>
  )
}

/* ------------------------------------------------------------------ *
 * Diagram: FlynnTaxonomy  (#3 four genuinely different animated modes)
 * ------------------------------------------------------------------ */
function FlynnCell({ x, y, w, h, title, sub, active, children }) {
  // children are authored in cell-LOCAL coordinates (0..w, 0..h)
  return (
    <g className={`pv-flynn-cell ${active ? 'active' : ''}`.trim()}>
      <rect x={x} y={y} width={w} height={h} rx="12" />
      <text className="pv-t-label" x={x + 14} y={y + 22} fontSize="15">{title}</text>
      <text className="pv-t-sub" x={x + 14} y={y + 37} fontSize="10.5">{sub}</text>
      <g transform={`translate(${x}, ${y})`}>{children}</g>
    </g>
  )
}
export function FlynnTaxonomy({ active = 'SIMD' }) {
  const cw = 262, ch = 150
  return (
    <svg className="pv-svg" viewBox="0 0 560 336" role="img" aria-label="Flynn's taxonomy: SISD, SIMD, MISD, MIMD execution streams">
      {/* SISD: one instruction, one data */}
      <FlynnCell x={12} y={10} w={cw} h={ch} title="SISD" sub="one instruction · one data" active={active === 'SISD'}>
        <rect x="18" y="78" width="40" height="28" rx="6" className="pv-inst" />
        <text x="38" y="97" textAnchor="middle" fontSize="11" fill="#fff" className="pv-t-mono">I</text>
        <ProcessorCore x={92} y={70} w={58} h={44} state="busy" label="core" threads={1} i={0} />
        <rect x="182" y="78" width="40" height="28" rx="6" className="pv-data" />
        <text x="202" y="97" textAnchor="middle" fontSize="11" fill="#fff" className="pv-t-mono">D</text>
        <line className="pv-wire-live" x1="58" y1="92" x2="90" y2="92" />
        <line className="pv-wire-live" x1="152" y1="92" x2="180" y2="92" />
        <TaskPacket x={72} y={92} dx={112} dy={0} tone="a" delay={0} r={4} />
        <text className="pv-t-sub" x="131" y="138" textAnchor="middle" fontSize="9.5">one stream, start to finish</text>
      </FlynnCell>

      {/* SIMD: one instruction broadcast to many data lanes */}
      <FlynnCell x={286} y={10} w={cw} h={ch} title="SIMD" sub="one instruction · many data" active={active === 'SIMD'}>
        <rect x="14" y="66" width="40" height="26" rx="6" className="pv-inst" />
        <text x="34" y="84" textAnchor="middle" fontSize="10.5" fill="#fff" className="pv-t-mono">I</text>
        {[0, 1, 2, 3].map((k) => (
          <g key={k}>
            <line className="pv-wire-live" x1="54" y1="79" x2="96" y2={52 + k * 22} />
            <rect x="98" y={44 + k * 22} width="30" height="16" rx="4" className="pv-core-body" />
            <rect x="140" y={44 + k * 22} width="24" height="16" rx="4" className="pv-data" />
            <TaskPacket x={72} y={79} dx={44} dy={(44 + k * 22 + 8) - 79} tone="b" delay={k * 0.12} r={3.5} />
          </g>
        ))}
        <text className="pv-t-sub" x="150" y="142" textAnchor="middle" fontSize="9.5">lockstep lanes</text>
      </FlynnCell>

      {/* MISD: one data stream through several instruction stages */}
      <FlynnCell x={12} y={176} w={cw} h={ch} title="MISD" sub="many instructions · one data" active={active === 'MISD'}>
        <rect x="14" y="76" width="32" height="30" rx="6" className="pv-data" />
        <text x="30" y="96" textAnchor="middle" fontSize="10" fill="#fff" className="pv-t-mono">D</text>
        {[0, 1, 2].map((k) => (
          <g key={k}>
            <line className="pv-wire-live" x1={46 + k * 64} y1="91" x2={62 + k * 64} y2="91" />
            <rect x={64 + k * 64} y="74" width="44" height="34" rx="6" className="pv-inst" />
            <text x={86 + k * 64} y="95" textAnchor="middle" fontSize="10.5" fill="#fff" className="pv-t-mono">S{k + 1}</text>
          </g>
        ))}
        <TaskPacket x={58} y={91} dx={158} dy={0} tone="q" delay={0} r={4} />
        <text className="pv-t-sub" x="131" y="138" textAnchor="middle" fontSize="9.5">staged pipeline (rare)</text>
      </FlynnCell>

      {/* MIMD: independent cores, different instructions + data */}
      <FlynnCell x={286} y={176} w={cw} h={ch} title="MIMD" sub="many instructions · many data" active={active === 'MIMD'}>
        {[0, 1, 2, 3].map((k) => {
          const lx = 16 + (k % 2) * 124, ly = 52 + Math.floor(k / 2) * 48
          return (
            <g key={k}>
              <rect x={lx} y={ly} width="18" height="15" rx="3" className="pv-inst" />
              <text x={lx + 9} y={ly + 11} textAnchor="middle" fontSize="8" fill="#fff">I{k + 1}</text>
              <ProcessorCore x={lx + 22} y={ly - 4} w={42} h={26} state="busy" label="" threads={1} i={k} />
              <rect x={lx + 68} y={ly} width="18" height="15" rx="3" className="pv-data" />
              <text x={lx + 77} y={ly + 11} textAnchor="middle" fontSize="8" fill="#fff">D{k + 1}</text>
            </g>
          )
        })}
        <text className="pv-t-sub" x="131" y="142" textAnchor="middle" fontSize="9.5">independent workers</text>
      </FlynnCell>
    </svg>
  )
}

/* ------------------------------------------------------------------ *
 * Diagram: MemoryHierarchy  (#6 registers -> ... -> secondary storage)
 *   Capacity grows downward, latency grows downward; request + hit/miss.
 * ------------------------------------------------------------------ */
export function MemoryHierarchy() {
  const tiers = [
    { label: 'Registers', meta: '~1 KB · ~1 cycle', w: 150, cls: 'pv-tier-fast' },
    { label: 'L1 Cache', meta: '~64 KB · ~4 cycles', w: 200, cls: 'pv-tier-fast' },
    { label: 'L2 Cache', meta: '~512 KB · ~12 cycles', w: 250, cls: 'pv-tier-mid' },
    { label: 'L3 Cache', meta: '~8 MB · ~40 cycles', w: 300, cls: 'pv-tier-mid' },
    { label: 'Main Memory (DRAM)', meta: '~16 GB · ~200 cycles', w: 350, cls: 'pv-tier-slow' },
    { label: 'Secondary Storage (SSD/HDD)', meta: 'TB scale · ~10⁶ cycles', w: 400, cls: 'pv-tier-store' },
  ]
  const th = 44, gap = 10, top = 26, cx = 230
  const totalDrop = (tiers.length - 1) * (th + gap)
  return (
    <svg className="pv-svg" viewBox="0 0 480 384" role="img" aria-label="Memory hierarchy from registers to secondary storage with cache hit and miss">
      {/* axis hints */}
      <text className="pv-t-cap" x="20" y="18" fontSize="9.5">▲ faster · smaller</text>
      <text className="pv-t-cap" x="20" y="376" fontSize="9.5">▼ slower · larger</text>
      {tiers.map((t, i) => {
        const y = top + i * (th + gap)
        return (
          <g key={t.label}>
            <MemoryBlock x={cx - t.w / 2} y={y} w={t.w} h={th} label={t.label} meta={t.meta} cls={t.cls} />
          </g>
        )
      })}
      {/* request token travels down; hit at L1, deeper miss illustrated */}
      <rect className="pv-req" x={cx - 6} y={top + 4} width="12" height="12" rx="3" style={{ '--pv-req-dy': `${(th + gap) * 1}px` }} />
      <circle className="pv-hit-ring" cx={cx} cy={top + th + gap + th / 2} r="16" />
      <circle className="pv-miss-ring" cx={cx} cy={top + (th + gap) * 4 + th / 2} r="18" />
      <text className="pv-t-label" x={cx + 108} y={top + th + gap + th / 2 + 4} fontSize="12" fill="#16a34a">hit → fast</text>
      <text className="pv-t-label" x={cx + 120} y={top + (th + gap) * 4 + th / 2 + 4} fontSize="12" fill="#dc2626">miss → go deeper</text>
    </svg>
  )
}

/* ------------------------------------------------------------------ *
 * Diagram: SimdLanes  (SIMD — one instruction, many data, lockstep)
 * ------------------------------------------------------------------ */
export function SimdLanes({ lanes = 5 }) {
  const xs = Array.from({ length: lanes }, (_, k) => 66 + k * ((520 - 66) / (lanes - 1)))
  return (
    <svg className="pv-svg" viewBox="0 0 560 320" role="img" aria-label="SIMD: one instruction broadcast to many data lanes in lockstep">
      {/* one instruction */}
      <rect className="pv-inst" x="190" y="20" width="180" height="40" rx="9" />
      <text x="280" y="45" textAnchor="middle" fontSize="14" fill="#fff" className="pv-t-mono">one instruction: add Δ</text>
      {/* broadcast + lanes */}
      {xs.map((x, k) => (
        <g key={k} className="pv-simd-lane">
          <line className="pv-wire-live" x1="280" y1="60" x2={x} y2="98" />
          <TaskPacket x={280} y={62} dx={x - 280} dy={36} tone="b" delay={0} r={4} />
          <rect className="pv-core-body pv-simd-alu" x={x - 32} y="100" width="64" height="52" rx="9" />
          <rect className="pv-simd-exec" x={x - 22} y="118" width="44" height="10" rx="5" />
          <text x={x} y="145" textAnchor="middle" fontSize="11" className="pv-t-sub">ALU</text>
          <line className="pv-wire" x1={x} y1="152" x2={x} y2="182" />
          <rect className="pv-data" x={x - 20} y="182" width="40" height="30" rx="6" />
          <text x={x} y="202" textAnchor="middle" fontSize="11" fill="#fff" className="pv-t-mono">d{k + 1}</text>
          <circle className="pv-done-led pv-simd-done" cx={x} cy="240" r="7" />
        </g>
      ))}
      {/* lockstep sync line */}
      <line className="pv-sync-line" x1={xs[0]} y1="240" x2={xs[lanes - 1]} y2="240" />
      <text className="pv-t-cap" x="280" y="272" textAnchor="middle" fontSize="10.5">lanes execute in lockstep</text>
      <text className="pv-t-sub" x="280" y="298" textAnchor="middle" fontSize="12">same operation on different data — all lanes start and finish together</text>
    </svg>
  )
}

/* ------------------------------------------------------------------ *
 * Diagram: MimdWorkers  (MIMD — independent work, different finish times)
 * ------------------------------------------------------------------ */
export function MimdWorkers() {
  const rows = [
    { task: 'physics step', dur: 2.4, tone: '#2563eb' },
    { task: 'boundary cells', dur: 3.3, tone: '#0ea5a4' },
    { task: 'I/O stream', dur: 1.7, tone: '#d97706' },
    { task: 'merge result', dur: 2.9, tone: '#6d5dd3' },
  ]
  return (
    <svg className="pv-svg" viewBox="0 0 520 320" role="img" aria-label="MIMD: independent processors run different work and finish at different times">
      {rows.map((r, k) => {
        const y = 30 + k * 66
        return (
          <g key={k}>
            <ProcessorCore x={16} y={y} w={92} h={50} state="busy" label={`Core ${k + 1}`} threads={2} i={k} />
            <text className="pv-t-label" x={124} y={y + 16} fontSize="12.5">{r.task}</text>
            <rect className="pv-prog-track" x={124} y={y + 24} width={310} height="18" rx="9" />
            <rect className="pv-prog-fill" x={124} y={y + 24} width={310} height="18" rx="9"
              fill={r.tone} style={{ animationDuration: `${r.dur}s` }} />
            <circle className="pv-done-led pv-mimd-done" cx={452} cy={y + 33} r="8" style={{ animationDelay: `${r.dur}s` }} />
            <text className="pv-t-sub" x={470} y={y + 37} fontSize="10.5">{r.dur}s</text>
          </g>
        )
      })}
      <text className="pv-t-sub" x="260" y="308" textAnchor="middle" fontSize="12">each core runs different work and finishes at its own time — no lockstep</text>
    </svg>
  )
}

/* ------------------------------------------------------------------ *
 * Diagram: MemoryOrg  (shared vs distributed — why MPI exists)
 * ------------------------------------------------------------------ */
export function MemoryOrg({ mode = 'shared' }) {
  const shared = mode === 'shared'
  const cx = [70, 190, 310, 430]
  if (shared) {
    return (
      <svg className="pv-svg" viewBox="0 0 500 320" role="img" aria-label="Shared memory: cores share one address space with contention">
        {cx.map((x, k) => (
          <g key={k}>
            <ProcessorCore x={x - 40} y={20} w={80} h={50} state="busy" label={`Core ${k + 1}`} threads={2} i={k} />
            <line className="pv-wire" x1={x} y1={70} x2={x} y2={132} />
            <TaskPacket x={x} y={78} dx={250 - x} dy={78} tone="a" delay={k * 0.25} r={4} />
          </g>
        ))}
        <rect className="pv-bus" x={40} y={132} width={420} height="26" rx="8" />
        <text className="pv-t-sub" x={250} y={149} textAnchor="middle" fontSize="11">shared bus · contention grows with cores</text>
        <rect className="pv-congest" x={244} y={136} width="12" height="18" rx="3" />
        <MemoryBlock x={130} y={188} w={240} h={56} label="Shared memory" meta="one common address space" cls="pv-tier-mid" />
        <text className="pv-t-sub" x={250} y={280} textAnchor="middle" fontSize="12">cores coordinate by reading/writing shared variables (locks, barriers)</text>
        <text className="pv-t-cap" x={250} y={302} textAnchor="middle" fontSize="10">easy model · limited scaling</text>
      </svg>
    )
  }
  return (
    <svg className="pv-svg" viewBox="0 0 500 320" role="img" aria-label="Distributed memory: each node owns memory and coordinates by messages">
      {cx.map((x, k) => (
        <g key={k}>
          <ProcessorCore x={x - 40} y={20} w={80} h={46} state="busy" label={`Node ${k + 1}`} threads={1} i={k} />
          <line className="pv-wire" x1={x} y1={66} x2={x} y2={78} />
          <MemoryBlock x={x - 40} y={78} w={80} h={34} label="mem" meta="" cls="pv-tier-fast" />
          <line className="pv-wire" x1={x} y1={112} x2={x} y2={150} />
        </g>
      ))}
      <rect className="pv-bus" x={40} y={150} width={420} height="24" rx="8" />
      <text className="pv-t-sub" x={250} y={166} textAnchor="middle" fontSize="11">network · messages between nodes</text>
      {/* messages hopping node to node */}
      <TaskPacket x={70} y={162} dx={120} dy={0} tone="c" delay={0} r={5} />
      <TaskPacket x={310} y={162} dx={120} dy={0} tone="b" delay={0.8} r={5} />
      <MemoryBlock x={130} y={206} w={240} h={50} label="no shared address space" meta="explicit send / receive (MPI)" cls="pv-tier-slow" />
      <text className="pv-t-sub" x={250} y={286} textAnchor="middle" fontSize="12">each node owns its memory — coordinate by passing messages</text>
      <text className="pv-t-cap" x={250} y={306} textAnchor="middle" fontSize="10">scales to large clusters · data movement is explicit</text>
    </svg>
  )
}

/* ------------------------------------------------------------------ *
 * Diagram: CoherenceStory  (#7 write-invalidate across the interconnect)
 * ------------------------------------------------------------------ */
export function CoherenceStory({ stale = true }) {
  // stale=true  -> show the PROBLEM: A wrote, B's copy is now Invalid
  // stale=false -> show RESOLVED: B re-fetched, both Shared again
  const bState = stale ? 'I' : 'S'
  const aState = stale ? 'M' : 'S'
  return (
    <svg className="pv-svg" viewBox="0 0 520 320" role="img" aria-label="Cache coherence write-invalidate protocol across two cores">
      {/* Core A */}
      <ProcessorCore x={30} y={40} w={130} h={78} state={stale ? 'hot' : 'busy'} label="Core A" threads={2} i={0} />
      <rect x={42} y={126} width={106} height="34" rx="7" className={`pv-cacheline ${stale ? 'mod' : ''}`} />
      <text x={95} y={148} textAnchor="middle" fontSize="12" className="pv-t-label">x = 21</text>
      <text className={`pv-state-badge pv-state-${aState}`} x={95} y={178} textAnchor="middle" fontSize="12">
        {stale ? 'Modified' : 'Shared'}
      </text>

      {/* Core B */}
      <ProcessorCore x={360} y={40} w={130} h={78} state={stale ? 'idle' : 'busy'} label="Core B" threads={2} i={1} />
      <rect x={372} y={126} width={106} height="34" rx="7" className={`pv-cacheline ${stale ? 'inv' : ''}`} />
      <text x={425} y={148} textAnchor="middle" fontSize="12" className="pv-t-label">
        {stale ? 'x = 20 ✕' : 'x = 21'}
      </text>
      <text className={`pv-state-badge pv-state-${bState}`} x={425} y={178} textAnchor="middle" fontSize="12">
        {stale ? 'Invalid' : 'Shared'}
      </text>

      {/* interconnect / bus */}
      <rect className="pv-bus" x={40} y={228} width={440} height="34" rx="9" />
      <text className="pv-t-sub" x={260} y={250} textAnchor="middle" fontSize="12">interconnect · shared memory</text>
      <line className="pv-wire" x1={95} y1={162} x2={95} y2={228} />
      <line className="pv-wire" x1={425} y1={162} x2={425} y2={228} />

      {/* the write-invalidate signal travelling A -> B */}
      {stale
        ? <>
            <CoherenceSignal x={110} y={200} dx={300} />
            <text className="pv-state-I" x={260} y={200} textAnchor="middle" fontSize="12" fontWeight="850">invalidate!</text>
            <text className="pv-t-sub" x={260} y={300} textAnchor="middle" fontSize="11.5">Core A writes → B's copy is invalidated → B must re-fetch</text>
          </>
        : <>
            <TaskPacket x={410} y={200} dx={-300} dy={0} tone="b" delay={0} r={5} />
            <text className="pv-fill-teal" x={260} y={200} textAnchor="middle" fontSize="12" fontWeight="850" fill="#0ea5a4">re-fetch 21</text>
            <text className="pv-t-sub" x={260} y={300} textAnchor="middle" fontSize="11.5">B re-fetches the updated value → both caches consistent (Shared)</text>
          </>}
    </svg>
  )
}

/* ------------------------------------------------------------------ *
 * TrafficVsExpressway — sequential jam vs parallel multi-lane
 * ------------------------------------------------------------------ */
export function TrafficVsExpressway() {
  return (
    <svg className="pv-svg" viewBox="0 0 640 340" role="img" aria-label="Sequential traffic jam versus parallel multi-lane expressway">
      {/* Sequential jam */}
      <g className="pv-flynn-cell">
        <rect x="16" y="28" width="290" height="250" rx="14" />
        <text className="pv-t-label" x="161" y="58" textAnchor="middle" fontSize="14">Sequential · traffic jam</text>
        <rect className="pv-bus" x="48" y="90" width="226" height="28" rx="8" />
        {[0, 1, 2, 3, 4, 5].map((k) => (
          <rect key={k} x={56 + k * 34} y={98} width="22" height="12" rx="3"
            fill={['#2563eb', '#0ea5a4', '#d97706', '#6d5dd3'][k % 4]} />
        ))}
        <text className="pv-state-I" x="161" y="150" textAnchor="middle" fontSize="12">ONE lane · queue grows</text>
        <ProcessorCore x={96} y={170} w={130} h={70} state="hot" label="1 CPU" threads={2} i={0} />
        <text className="pv-t-sub" x="161" y="262" textAnchor="middle" fontSize="11">workload waits behind the bottleneck</text>
      </g>

      {/* Parallel expressway */}
      <g className="pv-flynn-cell active">
        <rect x="334" y="28" width="290" height="250" rx="14" />
        <text className="pv-t-label" x="479" y="58" textAnchor="middle" fontSize="14">Parallel · expressway</text>
        {[0, 1, 2, 3].map((lane) => (
          <g key={lane}>
            <line className="pv-lane-track" x1="360" y1={100 + lane * 28} x2="598" y2={100 + lane * 28} />
            <TaskPacket x={370} y={100 + lane * 28} dx={200} dy={0} tone={['a', 'b', 'c', 'q'][lane]} delay={lane * 0.25} r={5} />
            <text className="pv-t-cap" x="350" y={104 + lane * 28} textAnchor="end" fontSize="9">L{lane + 1}</text>
          </g>
        ))}
        <ProcessorGrid x={380} y={220} cols={4} rows={1} cell={44} gap={10} states={['busy', 'busy', 'busy', 'busy']} label="c" threads={1} />
        <text className="pv-t-sub" x="479" y="262" textAnchor="middle" fontSize="11">many lanes move work at once</text>
      </g>

      <text className="pv-t-label" x="320" y="306" textAnchor="middle" fontSize="13">One processor is no longer enough — parallelism opens the lanes</text>
      <text className="pv-t-sub" x="320" y="328" textAnchor="middle" fontSize="11.5">same work, different execution width</text>
    </svg>
  )
}

/* ------------------------------------------------------------------ *
 * MpiMessageCity — living ranks with mode-driven packet choreography
 * ------------------------------------------------------------------ */
export function MpiMessageCity({ mode = 'scatter' }) {
  const ranks = [
    { x: 80, y: 120 }, { x: 240, y: 60 }, { x: 400, y: 60 }, { x: 560, y: 120 },
  ]
  const root = 0
  const packets = {
    send: [{ from: 0, to: 1, tone: 'a', delay: 0 }],
    recv: [{ from: 1, to: 0, tone: 'b', delay: 0.3 }],
    bcast: [
      { from: 0, to: 1, tone: 'a', delay: 0 },
      { from: 0, to: 2, tone: 'a', delay: 0.2 },
      { from: 0, to: 3, tone: 'a', delay: 0.4 },
    ],
    scatter: [
      { from: 0, to: 1, tone: 'a', delay: 0 },
      { from: 0, to: 2, tone: 'b', delay: 0.25 },
      { from: 0, to: 3, tone: 'c', delay: 0.5 },
    ],
    gather: [
      { from: 1, to: 0, tone: 'a', delay: 0 },
      { from: 2, to: 0, tone: 'b', delay: 0.25 },
      { from: 3, to: 0, tone: 'c', delay: 0.5 },
    ],
    reduce: [
      { from: 1, to: 0, tone: 'q', delay: 0 },
      { from: 2, to: 0, tone: 'q', delay: 0.3 },
      { from: 3, to: 0, tone: 'q', delay: 0.6 },
    ],
    barrier: [],
    idle: [],
  }
  const flow = packets[mode] || packets.scatter
  const caption = {
    send: 'MPI_Send: Rank 0 posts a message toward Rank 1',
    recv: 'MPI_Recv: Rank 0 waits until the matching message arrives',
    bcast: 'Broadcast: root copies one value to every rank',
    scatter: 'Scatter: root slices the array; each rank gets a chunk',
    gather: 'Gather: every rank sends its chunk back to root',
    reduce: 'Reduce: partial values combine into one result at root',
    barrier: 'Barrier: no rank proceeds until every rank arrives',
    idle: 'MPI_COMM_WORLD — independent computers become one machine',
  }[mode] || 'Message passing coordinates private memories'

  return (
    <svg className="pv-svg" viewBox="0 0 640 360" role="img" aria-label={`MPI ${mode}: messages traveling between ranks`}>
      <text className="pv-t-cap" x="320" y="28" textAnchor="middle" fontSize="11">MPI_COMM_WORLD · message city</text>
      {/* fabric */}
      <ellipse cx="320" cy="170" rx="250" ry="90" fill="none" stroke="#c3cde0" strokeWidth="1.5" strokeDasharray="6 5" />
      {ranks.map((r, i) => (
        <g key={i}>
          {i > 0 && <line className="pv-wire" x1={ranks[0].x} y1={ranks[0].y} x2={r.x} y2={r.y} />}
        </g>
      ))}
      {ranks.map((r, i) => (
        <g key={`n${i}`}>
          <rect className={`pv-rack-body ${i === root ? '' : ''}`.trim()} x={r.x - 42} y={r.y - 36} width="84" height="72" rx="10"
            style={i === root ? { stroke: '#2563eb', strokeWidth: 2.2 } : undefined} />
          <circle className="pv-rack-unit on" cx={r.x + 28} cy={r.y - 20} r="5" />
          <text className="pv-t-label" x={r.x} y={r.y - 8} textAnchor="middle" fontSize="13">Rank {i}</text>
          <text className="pv-t-sub" x={r.x} y={r.y + 12} textAnchor="middle" fontSize="10">private mem</text>
          <text className="pv-t-cap" x={r.x} y={r.y + 28} textAnchor="middle" fontSize="9">{i === root ? 'root' : 'worker'}</text>
        </g>
      ))}
      {flow.map((p, k) => {
        const a = ranks[p.from], b = ranks[p.to]
        return (
          <TaskPacket key={k} x={a.x} y={a.y} dx={b.x - a.x} dy={b.y - a.y} tone={p.tone} delay={p.delay} r={6} />
        )
      })}
      {mode === 'barrier' && (
        <>
          <BarrierGate x={300} y={250} h={40} label="MPI_Barrier" />
          {[0, 1, 2, 3].map((k) => (
            <TaskPacket key={k} x={ranks[k].x} y={ranks[k].y + 40} dx={320 - ranks[k].x} dy={40} tone="c" delay={k * 0.2} r={4} />
          ))}
        </>
      )}
      {mode === 'reduce' && (
        <text className="pv-t-label" x={ranks[0].x} y={ranks[0].y + 52} textAnchor="middle" fontSize="11" fill="#6d5dd3">Σ result</text>
      )}
      <text className="pv-t-label" x="320" y="320" textAnchor="middle" fontSize="13">{caption}</text>
      <text className="pv-t-sub" x="320" y="344" textAnchor="middle" fontSize="11.5">watch the packets — communication is the shared memory of a cluster</text>
    </svg>
  )
}

/* ------------------------------------------------------------------ *
 * MpiDeadlockJam — mutual blocked send as traffic jam
 * ------------------------------------------------------------------ */
export function MpiDeadlockJam() {
  return (
    <svg className="pv-svg" viewBox="0 0 640 320" role="img" aria-label="MPI deadlock: two ranks both blocked waiting to send">
      <text className="pv-t-cap" x="320" y="28" textAnchor="middle" fontSize="11">deadlock · traffic jam on the interconnect</text>

      {/* Rank 0 */}
      <rect className="pv-rack-body" x="60" y="80" width="160" height="140" rx="12" style={{ stroke: '#dc2626', strokeWidth: 2 }} />
      <text className="pv-t-label" x="140" y="112" textAnchor="middle" fontSize="15">Rank 0</text>
      <text className="pv-state-I" x="140" y="140" textAnchor="middle" fontSize="13">BLOCKED</text>
      <text className="pv-t-sub" x="140" y="168" textAnchor="middle" fontSize="12">MPI_Send → Rank 1</text>
      <text className="pv-t-sub" x="140" y="190" textAnchor="middle" fontSize="11">waiting for buffer / recv</text>

      {/* Rank 1 */}
      <rect className="pv-rack-body" x="420" y="80" width="160" height="140" rx="12" style={{ stroke: '#dc2626', strokeWidth: 2 }} />
      <text className="pv-t-label" x="500" y="112" textAnchor="middle" fontSize="15">Rank 1</text>
      <text className="pv-state-I" x="500" y="140" textAnchor="middle" fontSize="13">BLOCKED</text>
      <text className="pv-t-sub" x="500" y="168" textAnchor="middle" fontSize="12">MPI_Send → Rank 0</text>
      <text className="pv-t-sub" x="500" y="190" textAnchor="middle" fontSize="11">waiting for buffer / recv</text>

      {/* jam middle */}
      <rect className="pv-bus" x="250" y="120" width="140" height="60" rx="10" />
      <rect className="pv-congest" x="310" y="138" width="20" height="24" rx="4" />
      <text className="pv-t-cap" x="320" y="112" textAnchor="middle" fontSize="10">neither yields</text>
      <TaskPacket x={220} y={150} dx={40} dy={0} tone="c" delay={0} r={5} />
      <TaskPacket x={420} y={150} dx={-40} dy={0} tone="c" delay={0.4} r={5} />

      <text className="pv-t-label" x="320" y="260" textAnchor="middle" fontSize="13">Both send first → both wait forever</text>
      <text className="pv-t-sub" x="320" y="286" textAnchor="middle" fontSize="11.5">fix: pair Send with Recv, use non-blocking, or MPI_Sendrecv</text>
      <text className="pv-t-sub" x="320" y="308" textAnchor="middle" fontSize="11.5">deadlock is a traffic jam where every car blocks the intersection</text>
    </svg>
  )
}

/* ------------------------------------------------------------------ *
 * ForkJoinTimeline — OpenMP serial → fork → team → barrier → join
 * ------------------------------------------------------------------ */
export function ForkJoinTimeline() {
  const threads = 4
  return (
    <svg className="pv-svg" viewBox="0 0 640 340" role="img" aria-label="OpenMP fork-join: master forks a team, work runs, barrier, then join">
      <text className="pv-t-cap" x="320" y="26" textAnchor="middle" fontSize="11">fork-join timeline</text>

      {/* serial before */}
      <rect className="pv-chunk" x="20" y="150" width="90" height="28" rx="6" fill="#64748b" />
      <text x="65" y="168" textAnchor="middle" fontSize="11" fill="#fff" className="pv-t-mono">serial</text>
      <text className="pv-t-cap" x="65" y="200" textAnchor="middle" fontSize="9">master only</text>

      {/* fork wedge */}
      <path className="pv-wire-live" d="M110 164 H140" />
      <text className="pv-t-label" x="150" y="120" fontSize="12">FORK</text>

      {/* parallel region lanes */}
      {Array.from({ length: threads }).map((_, k) => {
        const y = 80 + k * 44
        return (
          <g key={k}>
            <path className="pv-wire" d={`M140 164 L170 ${y + 14}`} />
            <rect className="pv-chunk" x="170" y={y} width="220" height="28" rx="6"
              fill={['#2563eb', '#0ea5a4', '#d97706', '#6d5dd3'][k]} opacity="0.9" />
            <text x="280" y={y + 18} textAnchor="middle" fontSize="11" fill="#fff" className="pv-t-mono">Thread {k}</text>
            <TaskPacket x={180} y={y + 14} dx={180} dy={0} tone={['a', 'b', 'c', 'q'][k]} delay={k * 0.15} r={4} />
            <path className="pv-wire" d={`M390 ${y + 14} L420 164`} />
          </g>
        )
      })}

      <BarrierGate x={418} y={70} h={160} label="barrier" />

      {/* join */}
      <path className="pv-wire-live" d="M450 164 H480" />
      <text className="pv-t-label" x="500" y="120" fontSize="12">JOIN</text>
      <rect className="pv-chunk" x="500" y="150" width="110" height="28" rx="6" fill="#64748b" />
      <text x="555" y="168" textAnchor="middle" fontSize="11" fill="#fff" className="pv-t-mono">serial</text>
      <text className="pv-t-cap" x="555" y="200" textAnchor="middle" fontSize="9">master resumes</text>

      <text className="pv-t-label" x="320" y="290" textAnchor="middle" fontSize="13">One CPU becomes a team of workers — then becomes one again</text>
      <text className="pv-t-sub" x="320" y="314" textAnchor="middle" fontSize="11.5">#pragma omp parallel opens the team; the implicit barrier closes it</text>
    </svg>
  )
}

/* ------------------------------------------------------------------ *
 * CriticalSectionGate — mutex / critical as traffic signal
 * ------------------------------------------------------------------ */
export function CriticalSectionGate() {
  return (
    <svg className="pv-svg" viewBox="0 0 640 320" role="img" aria-label="Critical section: only one thread passes the traffic signal at a time">
      <text className="pv-t-cap" x="320" y="28" textAnchor="middle" fontSize="11">critical section · traffic signal</text>

      {[0, 1, 2, 3].map((k) => (
        <g key={k}>
          <ProcessorCore x={30} y={50 + k * 58} w={100} h={44} state={k === 1 ? 'busy' : 'idle'} label={`T${k}`} threads={1} i={k} />
          <line className="pv-wire" x1="130" y1={72 + k * 58} x2="220" y2={72 + k * 58} />
          {k !== 1 && <TaskPacket x={150} y={72 + k * 58} dx={60} dy={0} tone="c" delay={k * 0.3} r={4} />}
        </g>
      ))}

      {/* signal / mutex */}
      <rect x="220" y="60" width="70" height="200" rx="12" fill="#172033" />
      <circle cx="255" cy="100" r="16" fill="#dc2626" className="pv-congest" />
      <circle cx="255" cy="150" r="16" fill="#f59e0b" opacity="0.35" />
      <circle cx="255" cy="200" r="16" fill="#22c55e" />
      <text className="pv-t-cap" x="255" y="250" textAnchor="middle" fontSize="9" fill="#fff">mutex</text>

      {/* shared variable */}
      <rect className="pv-bus" x="320" y="120" width="200" height="80" rx="12" />
      <text className="pv-t-label" x="420" y="155" textAnchor="middle" fontSize="14">shared sum</text>
      <text className="pv-t-sub" x="420" y="178" textAnchor="middle" fontSize="12">one writer at a time</text>
      <TaskPacket x={290} y={160} dx={50} dy={0} tone="a" delay={0.2} r={5} />

      <text className="pv-t-cap" x="560" y="100" textAnchor="middle" fontSize="10">waiting</text>
      <text className="pv-t-sub" x="560" y="120" textAnchor="middle" fontSize="11">T0 · T2 · T3</text>
      <text className="pv-t-label" x="560" y="160" textAnchor="middle" fontSize="12" fill="#16a34a">T1 inside</text>

      <text className="pv-t-label" x="320" y="290" textAnchor="middle" fontSize="13">Critical protects the shared write — others wait at the red light</text>
      <text className="pv-t-sub" x="320" y="312" textAnchor="middle" fontSize="11.5">correctness first; prefer reduction when the pattern allows</text>
    </svg>
  )
}

/* ------------------------------------------------------------------ *
 * OpenMpReduction — private partials combine on a conveyor
 * ------------------------------------------------------------------ */
export function OpenMpReduction() {
  return (
    <svg className="pv-svg" viewBox="0 0 640 320" role="img" aria-label="OpenMP reduction: private partial sums combine into one result">
      <text className="pv-t-cap" x="320" y="28" textAnchor="middle" fontSize="11">reduction · collection conveyor</text>

      {[0, 1, 2, 3].map((k) => {
        const y = 60 + k * 48
        const vals = [12, 7, 15, 9]
        return (
          <g key={k}>
            <ProcessorCore x={24} y={y} w={90} h={38} state="busy" label={`T${k}`} threads={1} i={k} />
            <rect className="pv-chunk" x="140" y={y + 6} width="70" height="26" rx="6"
              fill={['#2563eb', '#0ea5a4', '#d97706', '#6d5dd3'][k]} />
            <text x="175" y={y + 24} textAnchor="middle" fontSize="12" fill="#fff" className="pv-t-mono">Σ={vals[k]}</text>
            <text className="pv-t-cap" x="175" y={y + 48} textAnchor="middle" fontSize="8">private</text>
            <path className="pv-wire-live" d={`M210 ${y + 19} H280`} />
            <TaskPacket x={220} y={y + 19} dx={90} dy={140 - (y + 19)} tone={['a', 'b', 'c', 'q'][k]} delay={k * 0.25} r={5} />
          </g>
        )
      })}

      {/* conveyor / combine */}
      <rect className="pv-bus" x="320" y="120" width="180" height="70" rx="12" />
      <text className="pv-t-label" x="410" y="150" textAnchor="middle" fontSize="14">combine (+)</text>
      <text className="pv-t-sub" x="410" y="172" textAnchor="middle" fontSize="11">operator at join</text>

      <path className="pv-wire-live" d="M500 155 H540" />
      <rect className="pv-chunk" x="540" y="130" width="80" height="50" rx="10" fill="#6d5dd3" />
      <text x="580" y="160" textAnchor="middle" fontSize="16" fill="#fff" className="pv-t-mono">43</text>

      <text className="pv-t-label" x="320" y="270" textAnchor="middle" fontSize="13">Each thread keeps a private sum — then the runtime combines them safely</text>
      <text className="pv-t-sub" x="320" y="294" textAnchor="middle" fontSize="11.5">reduction(+:sum) replaces a critical section for this pattern</text>
    </svg>
  )
}
