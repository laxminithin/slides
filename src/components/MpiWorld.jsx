/**
 * MpiWorld — unique Module 3 compositions.
 * Each export is a distinct camera / spatial grammar so consecutive
 * slides never share an identical diagram family.
 */
import '../mpiScenes.css'

const R = ['#2563eb', '#0ea5a4', '#7c3aed', '#d97706']
const ink = '#172033'
const mute = '#475569'

function Scene({ label, tone = 'net', children }) {
  return (
    <div className={`mpi-scene mpi-tone-${tone}`} aria-label={label}>
      {children}
    </div>
  )
}

/* 01 — module journey beads ------------------------------------------------ */
export function JourneyBeads({ mode = 'objectives' }) {
  const items = mode === 'map'
    ? [
      ['MPI functions', '#2563eb'],
      ['Trapezoidal rule', '#0ea5a4'],
      ['I/O', '#475569'],
      ['Collectives', '#7c3aed'],
      ['Performance', '#e11d48'],
      ['Sorting', '#059669'],
      ['Derived types', '#4f46e5'],
    ]
    : [
      ['MPI programs', '#2563eb'],
      ['Trapezoidal rule', '#0ea5a4'],
      ['I/O + collectives', '#7c3aed'],
      ['Performance', '#e11d48'],
      ['Parallel sorting', '#059669'],
      ['Derived datatypes', '#4f46e5'],
    ]
  return (
    <Scene label="Module 3 journey as a spatial path" tone="net">
      <svg viewBox="0 0 1200 560">
        <path d="M90 280 C 280 80, 520 80, 620 280 S 980 480, 1110 280" fill="none" stroke="#cbd5e1" strokeWidth="4" strokeDasharray="3 10" />
        {items.map(([t, c], i) => {
          const x = 110 + i * (980 / Math.max(1, items.length - 1))
          const y = i % 2 === 0 ? 210 : 360
          return (
            <g key={t}>
              <rect x={x - 74} y={y - 44} width="148" height="88" rx="18" fill="#fff" stroke={c} strokeWidth="4" />
              <text x={x} y={y - 14} textAnchor="middle" fill={ink} fontSize="18" fontWeight="900">{String(i + 1).padStart(2, '0')}</text>
              {(() => {
                const words = t.split(' ')
                if (t.length > 12 && words.length > 1) {
                  const mid = Math.ceil(words.length / 2)
                  return [
                    <text key="a" x={x} y={y + 8} textAnchor="middle" fill={c} fontSize="18" fontWeight="800">{words.slice(0, mid).join(' ')}</text>,
                    <text key="b" x={x} y={y + 28} textAnchor="middle" fill={c} fontSize="18" fontWeight="800">{words.slice(mid).join(' ')}</text>,
                  ]
                }
                return <text x={x} y={y + 18} textAnchor="middle" fill={c} fontSize="18" fontWeight="800">{t}</text>
              })()}
            </g>
          )
        })}
        <text x="600" y="520" textAnchor="middle" fill={ink} fontSize="20" fontWeight="850">one module · private memory → messages → algorithms</text>
      </svg>
    </Scene>
  )
}

export function ModuleMap() {
  return <JourneyBeads mode="map" />
}

/* 02 — spatial distributed-system definition -------------------------------- */
export function SpatialSystem() {
  return (
    <Scene label="Distributed system as a spatial network of private memories" tone="net">
      <svg viewBox="0 0 1200 560">
        <ellipse cx="600" cy="280" rx="520" ry="210" fill="none" stroke="#93c5fd" strokeWidth="3" strokeDasharray="10 8" />
        <text x="600" y="86" textAnchor="middle" fill="#2563eb" fontSize="20" fontWeight="900">one perceived facility</text>
        {[
          [260, 200, 0],
          [540, 170, 1],
          [820, 210, 2],
          [400, 360, 3],
          [700, 370, 0],
          [940, 340, 1],
        ].map(([x, y, r], i) => (
          <g key={i}>
            <rect x={x - 70} y={y - 46} width="140" height="92" rx="14" fill="#fff" stroke={R[r]} strokeWidth="3" />
            <text x={x} y={y - 8} textAnchor="middle" fill={ink} fontSize="18" fontWeight="900">CPU {i}</text>
            <text x={x} y={y + 18} textAnchor="middle" fill={R[r]} fontSize="18" fontWeight="800">private RAM</text>
          </g>
        ))}
        <path d="M330 200 C 420 140, 480 140, 470 170" fill="none" stroke="#f59e0b" strokeWidth="3" />
        <path d="M610 170 C 700 120, 760 160, 750 210" fill="none" stroke="#f59e0b" strokeWidth="3" />
        <path d="M470 360 C 560 420, 640 420, 630 370" fill="none" stroke="#f59e0b" strokeWidth="3" />
        <circle r="9" fill="#f59e0b">
          <animateMotion dur="2.8s" repeatCount="indefinite" path="M330 200 C 420 140, 480 140, 470 170" />
        </circle>
        <text x="600" y="530" textAnchor="middle" fill={ink} fontSize="20" fontWeight="850">no shared variables — only messages cross the fabric</text>
      </svg>
    </Scene>
  )
}

/* 03 — abstract global service (no branding) -------------------------------- */
export function ServiceNet() {
  return (
    <Scene label="Users see one service; many autonomous nodes answer" tone="net">
      <svg viewBox="0 0 1200 560">
        {[0, 1, 2, 3, 4].map((i) => (
          <g key={i}>
            <circle cx={140 + i * 230} cy="90" r="28" fill="#eff6ff" stroke="#2563eb" strokeWidth="2" />
            <text x={140 + i * 230} y="96" textAnchor="middle" fill="#1e3a8a" fontSize="18" fontWeight="900">user</text>
            <path d={`M${140 + i * 230} 118 C ${140 + i * 230} 170, 600 170, 600 210`} fill="none" stroke="#93c5fd" strokeWidth="2" />
          </g>
        ))}
        <rect x="390" y="210" width="420" height="70" rx="16" fill="#2563eb" />
        <text x="600" y="254" textAnchor="middle" fill="#fff" fontSize="22" fontWeight="900">one service name</text>
        {[-2, -1, 0, 1, 2].map((k) => {
          const x = 600 + k * 150
          return (
            <g key={k}>
              <path d={`M600 280 L${x} 360`} stroke="#94a3b8" strokeWidth="2" />
              <rect x={x - 54} y="360" width="108" height="80" rx="12" fill="#0f172a" />
              <circle cx={x - 28} cy="392" r="6" fill="#22c55e">
                <animate attributeName="opacity" values="0.3;1;0.3" dur="1.4s" begin={`${Math.abs(k) * 0.18}s`} repeatCount="indefinite" />
              </circle>
              <text x={x} y="400" textAnchor="middle" fill="#fbbf24" fontSize="18" fontWeight="900">node</text>
              <text x={x} y="422" textAnchor="middle" fill="#94a3b8" fontSize="18">autonomous</text>
            </g>
          )
        })}
        <text x="600" y="500" textAnchor="middle" fill={mute} fontSize="18" fontWeight="750">middleware hides the geography — the user sees one facility</text>
      </svg>
    </Scene>
  )
}

/* 04 — strengths orbiting a scalable cluster -------------------------------- */
export function StrengthOrbit() {
  const notes = [
    [180, 120, 'high performance'],
    [1020, 120, 'scales to thousands'],
    [180, 430, 'cluster-ready'],
    [1020, 430, 'explicit control'],
  ]
  return (
    <Scene label="MPI strengths arranged around a living cluster" tone="net">
      <svg viewBox="0 0 1200 560">
        <circle cx="600" cy="270" r="210" fill="none" stroke="#bfdbfe" strokeWidth="2" strokeDasharray="6 8" />
        {[0, 1, 2, 3].map((r) => {
          const a = (Math.PI * 2 * r) / 4 - Math.PI / 2
          const x = 600 + Math.cos(a) * 118
          const y = 270 + Math.sin(a) * 118
          return (
            <g key={r}>
              <rect x={x - 52} y={y - 36} width="104" height="72" rx="12" fill="#fff" stroke={R[r]} strokeWidth="3" />
              <text x={x} y={y - 4} textAnchor="middle" fill={ink} fontSize="18" fontWeight="900">Rank {r}</text>
              <text x={x} y={y + 18} textAnchor="middle" fill={R[r]} fontSize="18" fontWeight="800">own RAM</text>
            </g>
          )
        })}
        {notes.map(([x, y, t], i) => (
          <g key={t}>
            <path d={`M${x < 600 ? 470 : 730} 270 L${x} ${y}`} stroke={R[i]} strokeWidth="2" opacity="0.6" />
            <rect x={x - 120} y={y - 28} width="240" height="56" rx="28" fill="#fff" stroke={R[i]} strokeWidth="3" />
            <text x={x} y={y + 6} textAnchor="middle" fill={R[i]} fontSize="18" fontWeight="900">{t}</text>
          </g>
        ))}
        <text x="600" y="530" textAnchor="middle" fill={ink} fontSize="18" fontWeight="850">the system grows by adding machines, not by sharing one RAM</text>
      </svg>
    </Scene>
  )
}

/* 05 — trade-off / message traffic ----------------------------------------- */
export function TradeoffMesh() {
  return (
    <Scene label="Message traffic and complexity around a congested interconnect" tone="p2p">
      <svg viewBox="0 0 1200 560">
        {[0, 1, 2, 3].map((r) => (
          <g key={r}>
            <circle cx={180 + (r % 2) * 840} cy={150 + Math.floor(r / 2) * 260} r="58" fill="#fff" stroke={R[r]} strokeWidth="3" />
            <text x={180 + (r % 2) * 840} y={156 + Math.floor(r / 2) * 260} textAnchor="middle" fill={ink} fontSize="18" fontWeight="900">R{r}</text>
          </g>
        ))}
        {[[180, 150, 1020, 150], [180, 410, 1020, 410], [180, 150, 180, 410], [1020, 150, 1020, 410]].map(([x1, y1, x2, y2], i) => (
          <path key={i} d={`M${x1} ${y1} L${x2} ${y2}`} stroke="#f59e0b" strokeWidth="2" opacity="0.55" />
        ))}
        <path d="M238 150 L962 150 M238 410 L962 410" stroke="#f59e0b" strokeWidth="2" opacity="0.35" />
        {Array.from({ length: 8 }).map((_, i) => {
          const paths = [
            'M248 150 L952 150',
            'M248 410 L952 410',
            'M180 218 L180 342',
            'M1020 218 L1020 342',
          ]
          return (
            <circle key={i} r="6" fill="#f59e0b">
              <animateMotion dur={`${1.8 + (i % 4) * 0.35}s`} begin={`${i * 0.18}s`} repeatCount="indefinite" path={paths[i % 4]} />
            </circle>
          )
        })}
        <rect x="390" y="210" width="420" height="140" rx="18" fill="#0f172a" />
        <text x="600" y="258" textAnchor="middle" fill="#fda4af" fontSize="22" fontWeight="900">latency · complexity · debug</text>
        <text x="600" y="300" textAnchor="middle" fill="#fbbf24" fontSize="18" fontWeight="800">every extra message is a design decision</text>
        <text x="600" y="520" textAnchor="middle" fill={ink} fontSize="18" fontWeight="850">explicit communication is power — and the cost</text>
      </svg>
    </Scene>
  )
}

/* 06 — process close-up (one rank, private memory) -------------------------- */
export function ProcessCloseup() {
  return (
    <Scene label="Close-up of one MPI process and its private memory" tone="net">
      <svg viewBox="0 0 1200 560">
        <rect x="80" y="70" width="720" height="420" rx="24" fill="#eff6ff" stroke="#2563eb" strokeWidth="4" />
        <text x="120" y="130" fill={ink} fontSize="28" fontWeight="900">Rank 0  ·  one process</text>
        <rect x="120" y="170" width="160" height="70" rx="12" fill="#172033" />
        <text x="200" y="214" textAnchor="middle" fill="#fff" fontSize="22" fontWeight="900">CPU</text>
        <rect x="310" y="170" width="440" height="190" rx="14" fill="#fff" stroke="#2563eb" strokeWidth="3" />
        <text x="330" y="210" fill={mute} fontSize="18" fontWeight="800">private memory</text>
        {['a, b, n', 'local_int', 'send buffer', 'recv buffer'].map((t, i) => (
          <rect key={t} x={330 + (i % 2) * 200} y={230 + Math.floor(i / 2) * 54} width="180" height="42" rx="8" fill="#dbeafe" />
        ))}
        {['a, b, n', 'local_int', 'send buffer', 'recv buffer'].map((t, i) => (
          <text key={`t${t}`} x={420 + (i % 2) * 200} y={258 + Math.floor(i / 2) * 54} textAnchor="middle" fill="#1e3a8a" fontSize="18" fontWeight="800">{t}</text>
        ))}
        <text x="120" y="420" fill="#1e3a8a" fontSize="20" fontWeight="850">Rank 0 cannot read Rank 3’s cells</text>
        <rect x="860" y="140" width="260" height="280" rx="18" fill="#0f172a" />
        <text x="990" y="200" textAnchor="middle" fill="#fbbf24" fontSize="20" fontWeight="900">MPI is the</text>
        <text x="990" y="240" textAnchor="middle" fill="#fff" fontSize="22" fontWeight="900">conversation</text>
        <text x="990" y="280" textAnchor="middle" fill="#94a3b8" fontSize="18">layer</text>
        <text x="990" y="340" textAnchor="middle" fill="#7dd3fc" fontSize="18" fontWeight="800">a specification</text>
        <text x="990" y="372" textAnchor="middle" fill="#94a3b8" fontSize="18">MPICH · Open MPI</text>
      </svg>
    </Scene>
  )
}

/* 07 — rank identity close-up ---------------------------------------------- */
export function RankCloseup() {
  return (
    <Scene label="Identity reveal: my_rank illuminates on each process" tone="net">
      <svg viewBox="0 0 1200 560">
        {[0, 1, 2, 3].map((r) => (
          <g key={r} transform={`translate(${70 + r * 280} 90)`}>
            <rect width="250" height="340" rx="20" fill="#fff" stroke={R[r]} strokeWidth="4" />
            <text x="125" y="70" textAnchor="middle" fill={mute} fontSize="18" fontWeight="800">process</text>
            <circle cx="125" cy="170" r="64" fill={R[r]} />
            <text x="125" y="182" textAnchor="middle" fill="#fff" fontSize="42" fontWeight="900">{r}</text>
            <text x="125" y="270" textAnchor="middle" fill={ink} fontSize="22" fontWeight="900">my_rank</text>
            <text x="125" y="310" textAnchor="middle" fill={R[r]} fontSize="18" fontWeight="800">MPI_Comm_rank</text>
          </g>
        ))}
        <text x="600" y="490" textAnchor="middle" fill={ink} fontSize="20" fontWeight="850">same question on every process — a different answer</text>
      </svg>
    </Scene>
  )
}

/* 08 — size as a census ---------------------------------------------------- */
export function SizeCensus() {
  return (
    <Scene label="Communicator size as a counted cluster" tone="net">
      <svg viewBox="0 0 1200 560">
        <text x="600" y="60" textAnchor="middle" fill={ink} fontSize="24" fontWeight="900">MPI_Comm_size → how many of us?</text>
        {[0, 1, 2, 3].map((r) => (
          <g key={r}>
            <circle cx={200 + r * 260} cy="230" r="88" fill="#fff" stroke={R[r]} strokeWidth="5" />
            <text x={200 + r * 260} y="224" textAnchor="middle" fill={ink} fontSize="20" fontWeight="900">Rank {r}</text>
            <text x={200 + r * 260} y="254" textAnchor="middle" fill={R[r]} fontSize="18" fontWeight="800">counted</text>
          </g>
        ))}
        <rect x="340" y="370" width="520" height="90" rx="18" fill="#2563eb" />
        <text x="600" y="428" textAnchor="middle" fill="#fff" fontSize="36" fontWeight="900">comm_sz = 4</text>
        <text x="600" y="510" textAnchor="middle" fill={mute} fontSize="18">every rank receives the same size; only rank is unique</text>
      </svg>
    </Scene>
  )
}

/* 09 — circular communicator ----------------------------------------------- */
export function CommRing({ subgroup = false }) {
  const cx = 600
  const cy = 270
  return (
    <Scene label="MPI_COMM_WORLD as a circular group boundary" tone="net">
      <svg viewBox="0 0 1200 560">
        <circle cx={cx} cy={cy} r="196" fill="none" stroke="#2563eb" strokeWidth="5" strokeDasharray="14 10" />
        <rect x="430" y="18" width="340" height="44" rx="22" fill="#2563eb" />
        <text x="600" y="48" textAnchor="middle" fill="#fff" fontSize="20" fontWeight="900">MPI_COMM_WORLD</text>
        {[0, 1, 2, 3].map((r) => {
          const a = (Math.PI * 2 * r) / 4 - Math.PI / 2
          const x = cx + Math.cos(a) * 138
          const y = cy + Math.sin(a) * 138
          return (
            <g key={r}>
              <circle cx={x} cy={y} r="52" fill="#fff" stroke={R[r]} strokeWidth="4" />
              <text x={x} y={y + 6} textAnchor="middle" fill={ink} fontSize="20" fontWeight="900">R{r}</text>
            </g>
          )
        })}
        {subgroup && (
          <>
            <rect x="868" y="392" width="272" height="64" rx="16" fill="#f5f3ff" stroke="#7c3aed" strokeWidth="3" />
            <text x="1004" y="432" textAnchor="middle" fill="#5b21b6" fontSize="18" fontWeight="800">optional subgroup</text>
          </>
        )}
        <text x="600" y="528" textAnchor="middle" fill={ink} fontSize="18" fontWeight="850">collectives operate over this group, not over “the whole machine”</text>
      </svg>
    </Scene>
  )
}

/* 10 — packet anatomy ------------------------------------------------------ */
export function PacketAnatomy({ value = 100 }) {
  const fields = [
    ['source', '0'],
    ['destination', '1'],
    ['tag', '0'],
    ['datatype', 'MPI_INT'],
    ['count', '1'],
    ['communicator', 'WORLD'],
  ]
  return (
    <Scene label="One message packet annotated field by field" tone="p2p">
      <svg viewBox="0 0 1200 560">
        <rect x="280" y="70" width="640" height="200" rx="28" fill="#fde68a" stroke="#d97706" strokeWidth="4" />
        <text x="600" y="150" textAnchor="middle" fill="#92400e" fontSize="72" fontWeight="900">{value}</text>
        <text x="600" y="210" textAnchor="middle" fill="#b45309" fontSize="22" fontWeight="800">payload</text>
        {fields.map(([k, v], i) => {
          const x = 80 + (i % 3) * 370
          const y = 330 + Math.floor(i / 3) * 96
          const midX = x + 150
          return (
            <g key={k}>
              <path d={`M${midX} ${y} V${300} H600`} fill="none" stroke="#f59e0b" strokeWidth="2" />
              <rect x={x} y={y} width="300" height="70" rx="14" fill="#fff" stroke="#d97706" strokeWidth="2" />
              <text x={x + 24} y={y + 30} fill={mute} fontSize="18" fontWeight="800">{k}</text>
              <text x={x + 24} y={y + 54} fill={ink} fontSize="22" fontWeight="900">{v}</text>
            </g>
          )
        })}
      </svg>
    </Scene>
  )
}

/* 11 — matching gate ------------------------------------------------------- */
export function MatchingGate() {
  return (
    <Scene label="Three packets; a tag filter lets only TAG 20 through" tone="p2p">
      <svg viewBox="0 0 1200 560">
        {[['TAG 10', 90, '#94a3b8', false], ['TAG 20', 250, '#059669', true], ['TAG 30', 410, '#94a3b8', false]].map(([t, y, c, ok]) => (
          <g key={t}>
            <rect x="50" y={y} width="210" height="70" rx="14" fill={c} />
            <text x="155" y={y + 44} textAnchor="middle" fill="#fff" fontSize="22" fontWeight="900">{t}</text>
            {!ok && <path d={`M260 ${y + 35} H 500`} stroke="#cbd5e1" strokeWidth="3" strokeDasharray="6 6" />}
            {ok && (
              <g>
                <rect width="132" height="44" rx="12" x="-66" y="-22" fill="#059669" stroke="#047857" strokeWidth="2" />
                <text y="8" textAnchor="middle" fill="#fff" fontSize="20" fontWeight="900">{t}</text>
                <animateMotion dur="2.6s" repeatCount="indefinite" path={`M336 ${y + 35} H 760`} />
              </g>
            )}
          </g>
        ))}
        <rect x="420" y="8" width="200" height="40" rx="20" fill="#0f172a" />
        <text x="520" y="35" textAnchor="middle" fill="#fbbf24" fontSize="18" fontWeight="900">FILTER · src=0 tag=20</text>
        <rect x="500" y="56" width="40" height="172" rx="8" fill="#0f172a" />
        <rect x="500" y="332" width="40" height="172" rx="8" fill="#0f172a" />
        <path d="M221 285 H 640" stroke="#059669" strokeWidth="3" opacity="0.35" />
        <rect x="640" y="200" width="500" height="160" rx="18" fill="#ecfdf5" stroke="#059669" strokeWidth="4" />
        <text x="890" y="268" textAnchor="middle" fill={ink} fontSize="24" fontWeight="900">Rank 1 buffer</text>
        <text x="890" y="314" textAnchor="middle" fill="#047857" fontSize="20" fontWeight="800">only TAG 20 enters</text>
      </svg>
    </Scene>
  )
}

/* 12 — deadlock freeze ----------------------------------------------------- */
export function DeadlockFreeze() {
  return (
    <Scene label="Two timeline lanes freeze on Recv; a red circular wait forms" tone="p2p">
      <svg viewBox="0 0 1200 560">
        <rect x="0" y="0" width="1200" height="560" fill="#e2e8f0" opacity="0.35" />
        <text x="80" y="70" fill={ink} fontSize="22" fontWeight="900">Rank 0</text>
        <rect x="200" y="40" width="180" height="50" rx="8" fill="#94a3b8" />
        <text x="290" y="72" textAnchor="middle" fill="#fff" fontSize="18">compute</text>
        <rect x="400" y="40" width="420" height="50" rx="8" fill="#dc2626">
          <animate attributeName="opacity" values="1;0.45;1" dur="1.6s" repeatCount="indefinite" />
        </rect>
        <text x="610" y="72" textAnchor="middle" fill="#fff" fontSize="20" fontWeight="900">WAIT  MPI_Recv</text>
        <text x="80" y="200" fill={ink} fontSize="22" fontWeight="900">Rank 1</text>
        <rect x="200" y="170" width="180" height="50" rx="8" fill="#94a3b8" />
        <text x="290" y="202" textAnchor="middle" fill="#fff" fontSize="18">compute</text>
        <rect x="400" y="170" width="420" height="50" rx="8" fill="#dc2626">
          <animate attributeName="opacity" values="1;0.45;1" dur="1.6s" begin="0.3s" repeatCount="indefinite" />
        </rect>
        <text x="610" y="202" textAnchor="middle" fill="#fff" fontSize="20" fontWeight="900">WAIT  MPI_Recv</text>
        <path d="M820 65 C 980 65, 980 195, 820 195 C 980 195, 980 65, 820 65" fill="none" stroke="#dc2626" strokeWidth="5" />
        <text x="600" y="340" textAnchor="middle" fill="#7f1d1d" fontSize="36" fontWeight="900">BOTH WAIT.</text>
        <text x="600" y="390" textAnchor="middle" fill="#dc2626" fontSize="36" fontWeight="900">NO ONE SENDS.</text>
        <text x="600" y="470" textAnchor="middle" fill={mute} fontSize="18">the matching send is never posted — the timelines stay red</text>
      </svg>
    </Scene>
  )
}

/* 13 — safe diagonal ordering ---------------------------------------------- */
export function SafeDiagonal() {
  const steps = [
    [160, 80, 'Rank 0 SEND', R[0]],
    [520, 160, 'Rank 1 RECV', R[1]],
    [160, 280, 'Rank 1 SEND', R[1]],
    [520, 360, 'Rank 0 RECV', R[0]],
  ]
  return (
    <Scene label="Four-step diagonal send/receive that crosses safely" tone="p2p">
      <svg viewBox="0 0 1200 560">
        {steps.map(([x, y, t, c], i) => (
          <g key={t}>
            <rect x={x} y={y} width="280" height="80" rx="16" fill={c} />
            <text x={x + 140} y={y + 48} textAnchor="middle" fill="#fff" fontSize="22" fontWeight="900">{t}</text>
            {i < 3 && <path d={`M${i % 2 === 0 ? x + 280 : x} ${y + 40} C 480 ${y + 40}, 480 ${steps[i + 1][1] + 40}, ${steps[i + 1][0] + (i % 2 === 0 ? 0 : 280)} ${steps[i + 1][1] + 40}`} fill="none" stroke="#059669" strokeWidth="4" />}
          </g>
        ))}
        <g>
          <rect width="52" height="32" rx="8" x="-26" y="-16" fill="#fde68a" stroke="#d97706" strokeWidth="2" />
          <text y="6" textAnchor="middle" fill="#92400e" fontSize="18" fontWeight="900">msg</text>
          <animateMotion dur="3.2s" repeatCount="indefinite" path="M480 120 V 200" />
        </g>
        <rect x="860" y="180" width="280" height="160" rx="18" fill="#ecfdf5" stroke="#059669" strokeWidth="3" />
        <text x="1000" y="250" textAnchor="middle" fill="#065f46" fontSize="22" fontWeight="900">messages cross</text>
        <text x="1000" y="292" textAnchor="middle" fill="#047857" fontSize="18" fontWeight="800">progress is restored</text>
      </svg>
    </Scene>
  )
}

/* 14 — modulo array cells -------------------------------------------------- */
export function ModuloCells() {
  const cells = [1, 2, 3, 4, 5, 6]
  const own = ['#2563eb', '#0ea5a4', '#7c3aed']
  return (
    <Scene label="Array 1–6 coloured by modulo ownership" tone="net">
      <svg viewBox="0 0 1200 560">
        <text x="600" y="50" textAnchor="middle" fill={ink} fontSize="22" fontWeight="900">a = [1, 2, 3, 4, 5, 6]   ownership = i mod 3</text>
        {cells.map((v, i) => (
          <g key={v}>
            <rect x={90 + i * 180} y="90" width="150" height="130" rx="16" fill={own[i % 3]} />
            <text x={165 + i * 180} y="170" textAnchor="middle" fill="#fff" fontSize="48" fontWeight="900">{v}</text>
          </g>
        ))}
        {[0, 1, 2].map((r) => (
          <g key={r}>
            <rect x={150 + r * 340} y="280" width="260" height="140" rx="16" fill="#fff" stroke={own[r]} strokeWidth="3" />
            <text x={280 + r * 340} y="330" textAnchor="middle" fill={ink} fontSize="20" fontWeight="900">process {r + 1}</text>
            <text x={280 + r * 340} y="372" textAnchor="middle" fill={own[r]} fontSize="26" fontWeight="900">{r === 0 ? '1 + 4' : r === 1 ? '2 + 5' : '3 + 6'}</text>
          </g>
        ))}
        <text x="600" y="480" textAnchor="middle" fill={ink} fontSize="20" fontWeight="850">local sums return to the main process → one answer</text>
      </svg>
    </Scene>
  )
}

/* 15 — 1–8 four-process lanes ---------------------------------------------- */
export function SumLanes() {
  const lanes = [
    [0, [1, 2], 3],
    [1, [3, 4], 7],
    [2, [5, 6], 11],
    [3, [7, 8], 15],
  ]
  return (
    <Scene label="Four rank lanes accumulate 1 through 8" tone="net">
      <svg viewBox="0 0 1200 560">
        {lanes.map(([r, vals, sum], i) => (
          <g key={r}>
            <text x="40" y={90 + i * 90} fill={ink} fontSize="20" fontWeight="900">R{r}</text>
            <rect x="120" y={58 + i * 90} width="720" height="56" rx="12" fill="#f8fafc" stroke={R[r]} strokeWidth="2" />
            {vals.map((v, k) => (
              <rect key={v} x={160 + k * 90} y={66 + i * 90} width="70" height="40" rx="8" fill={R[r]} />
            ))}
            {vals.map((v, k) => (
              <text key={`t${v}`} x={195 + k * 90} y={94 + i * 90} textAnchor="middle" fill="#fff" fontSize="20" fontWeight="900">{v}</text>
            ))}
            <text x="560" y={94 + i * 90} fill={mute} fontSize="18" fontWeight="800">local sum</text>
            <rect x="880" y={58 + i * 90} width="240" height="56" rx="12" fill={R[r]} />
            <text x="1000" y={94 + i * 90} textAnchor="middle" fill="#fff" fontSize="24" fontWeight="900">{sum}</text>
          </g>
        ))}
        <rect x="320" y="430" width="560" height="70" rx="14" fill="#0f172a" />
        <text x="600" y="474" textAnchor="middle" fill="#fbbf24" fontSize="24" fontWeight="900">3 + 7 + 11 + 15 = 36</text>
      </svg>
    </Scene>
  )
}

/* 16 — four interval regions, async fill ----------------------------------- */
export function IntervalAsync() {
  return (
    <Scene label="Four coloured interval regions compute asynchronously" tone="trap">
      <svg viewBox="0 0 1200 560">
        <path d="M80 430 H1120" stroke="#64748b" strokeWidth="3" />
        <path d="M80 430 Q 600 80 1120 260" fill="none" stroke="#2563eb" strokeWidth="4" />
        {[0, 1, 2, 3].map((r) => {
          const x0 = 80 + r * 260
          const x1 = x0 + 260
          return (
            <g key={r}>
              <rect x={x0} y="418" width="260" height="24" fill={R[r]} opacity="0.85" />
              <text x={(x0 + x1) / 2} y="80" textAnchor="middle" fill={R[r]} fontSize="20" fontWeight="900">Rank {r}</text>
              <rect x={x0 + 40} y="100" width="180" height="14" rx="7" fill="#e2e8f0" />
              <rect x={x0 + 40} y="100" width="40" height="14" rx="7" fill={R[r]}>
                <animate attributeName="width" values="40;180;180" dur={`${2.2 + r * 0.35}s`} repeatCount="indefinite" />
              </rect>
              <text x={(x0 + x1) / 2} y="500" textAnchor="middle" fill={R[r]} fontSize="18" fontWeight="800">local_int{r}</text>
            </g>
          )
        })}
        <text x="600" y="40" textAnchor="middle" fill={ink} fontSize="20" fontWeight="900">no communication yet — four independent Trap calls</text>
      </svg>
    </Scene>
  )
}

/* 17 — floating numbers converge ------------------------------------------- */
export function FloatCollect() {
  const vals = ['2.5', '3.1', '4.2', '5.2']
  return (
    <Scene label="Four local results float into a central accumulator" tone="trap">
      <svg viewBox="0 0 1200 560">
        {vals.map((v, i) => {
          const x = 140 + (i % 2) * 920
          const y = 90 + Math.floor(i / 2) * 280
          return (
            <g key={v}>
              <circle cx={x} cy={y} r="70" fill="#fff" stroke={R[i]} strokeWidth="4" />
              <text x={x} y={y + 10} textAnchor="middle" fill={R[i]} fontSize="28" fontWeight="900">{v}</text>
              <path d={`M${x} ${y} L600 280`} stroke={R[i]} strokeWidth="3" opacity="0.6" />
            </g>
          )
        })}
        <circle cx="600" cy="280" r="92" fill="#0f172a" />
        <text x="600" y="270" textAnchor="middle" fill="#fbbf24" fontSize="18" fontWeight="800">Rank 0</text>
        <text x="600" y="310" textAnchor="middle" fill="#fff" fontSize="32" fontWeight="900">15.0</text>
        <text x="600" y="500" textAnchor="middle" fill={ink} fontSize="20" fontWeight="850">manual Send/Recv — then MPI_Reduce replaces the loop</text>
      </svg>
    </Scene>
  )
}

/* 18 — reduce 15.0 tree ---------------------------------------------------- */
export function Reduce15() {
  return (
    <Scene label="Binary reduction tree 2.5+3.1 and 4.2+5.2 then 15.0" tone="coll">
      <svg viewBox="0 0 1200 560">
        {[
          [140, '2.5', 0],
          [400, '3.1', 1],
          [700, '4.2', 2],
          [960, '5.2', 3],
        ].map(([x, v, r]) => (
          <g key={r}>
            <circle cx={x} cy="80" r="48" fill="#fff" stroke={R[r]} strokeWidth="4" />
            <text x={x} y="68" textAnchor="middle" fill={mute} fontSize="18">R{r}</text>
            <text x={x} y="96" textAnchor="middle" fill={ink} fontSize="22" fontWeight="900">{v}</text>
          </g>
        ))}
        <path d="M140 128 L270 248 L400 128" fill="none" stroke="#0ea5a4" strokeWidth="4" />
        <path d="M700 128 L830 248 L960 128" fill="none" stroke="#7c3aed" strokeWidth="4" />
        <rect x="190" y="168" width="160" height="56" rx="12" fill="#ecfdf5" stroke="#0ea5a4" strokeWidth="2" />
        <text x="270" y="206" textAnchor="middle" fill="#0f766e" fontSize="22" fontWeight="900">5.6</text>
        <rect x="750" y="168" width="160" height="56" rx="12" fill="#f5f3ff" stroke="#7c3aed" strokeWidth="2" />
        <text x="830" y="206" textAnchor="middle" fill="#5b21b6" fontSize="22" fontWeight="900">9.4</text>
        <path d="M270 248 L600 360 L830 248" fill="none" stroke="#2563eb" strokeWidth="5" />
        <rect x="470" y="360" width="260" height="90" rx="16" fill="#2563eb" />
        <text x="600" y="398" textAnchor="middle" fill="#dbeafe" fontSize="18" fontWeight="800">MPI_SUM at root</text>
        <text x="600" y="432" textAnchor="middle" fill="#fff" fontSize="32" fontWeight="900">15.0</text>
        <text x="600" y="510" textAnchor="middle" fill={mute} fontSize="18">2.5 + 3.1 + 4.2 + 5.2 — the source trapezoid total</text>
      </svg>
    </Scene>
  )
}

/* 19 — allreduce wave ------------------------------------------------------ */
export function AllReduceWave() {
  return (
    <Scene label="Completed reduction at centre then result wave outward" tone="coll">
      <svg viewBox="0 0 1200 560">
        <circle cx="600" cy="270" r="92" fill="none" stroke="#86efac" strokeWidth="3">
          <animate attributeName="r" values="84;130;84" dur="2.8s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.9;0;0.9" dur="2.8s" repeatCount="indefinite" />
        </circle>
        <circle cx="600" cy="270" r="78" fill="#059669" />
        <text x="600" y="262" textAnchor="middle" fill="#fff" fontSize="18" fontWeight="800">reduced</text>
        <text x="600" y="292" textAnchor="middle" fill="#d1fae5" fontSize="28" fontWeight="900">20</text>
        {[0, 1, 2, 3].map((r) => {
          const a = (Math.PI * 2 * r) / 4 - Math.PI / 2
          const x = 600 + Math.cos(a) * 220
          const y = 270 + Math.sin(a) * 168
          return (
            <g key={r}>
              <circle cx={x} cy={y} r="54" fill="#fff" stroke={R[r]} strokeWidth="4" />
              <text x={x} y={y - 6} textAnchor="middle" fill={ink} fontSize="18" fontWeight="900">Rank {r}</text>
              <text x={x} y={y + 18} textAnchor="middle" fill="#059669" fontSize="22" fontWeight="900">20</text>
            </g>
          )
        })}
        <text x="600" y="538" textAnchor="middle" fill={ink} fontSize="20" fontWeight="850">Allreduce = reduce + the result is already everywhere</text>
      </svg>
    </Scene>
  )
}

/* 20 — scatter fall -------------------------------------------------------- */
export function ScatterFall() {
  const chunks = ['A B', 'C D', 'E F', 'G H']
  return (
    <Scene label="Root array across the top; chunks fall into rank lanes" tone="coll">
      <svg viewBox="0 0 1200 560">
        <rect x="80" y="40" width="1040" height="80" rx="14" fill="#0f172a" />
        {['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'].map((ch, i) => (
          <text key={ch} x={140 + i * 120} y="92" textAnchor="middle" fill="#fbbf24" fontSize="28" fontWeight="900">{ch}</text>
        ))}
        {chunks.map((c, i) => (
          <g key={c}>
            <path d={`M${200 + i * 260} 120 V210`} stroke={R[i]} strokeWidth="4" />
            <rect x={90 + i * 280} y="220" width="240" height="220" rx="16" fill="#fff" stroke={R[i]} strokeWidth="4" />
            <text x={210 + i * 280} y="290" textAnchor="middle" fill={ink} fontSize="22" fontWeight="900">Rank {i}</text>
            <text x={210 + i * 280} y="360" textAnchor="middle" fill={R[i]} fontSize="32" fontWeight="900">[{c}]</text>
          </g>
        ))}
      </svg>
    </Scene>
  )
}

/* 21 — gather puzzle ------------------------------------------------------- */
export function GatherPuzzle() {
  const chunks = ['A B', 'C D', 'E F', 'G H']
  const pos = [[80, 60], [860, 60], [80, 280], [860, 280]]
  return (
    <Scene label="Four local blocks assemble like puzzle pieces at root" tone="coll">
      <svg viewBox="0 0 1200 560">
        {chunks.map((c, i) => (
          <g key={c}>
            <rect x={pos[i][0]} y={pos[i][1]} width="220" height="150" rx="16" fill="#fff" stroke={R[i]} strokeWidth="4" />
            <text x={pos[i][0] + 110} y={pos[i][1] + 64} textAnchor="middle" fill={ink} fontSize="18" fontWeight="900">Rank {i}</text>
            <text x={pos[i][0] + 110} y={pos[i][1] + 108} textAnchor="middle" fill={R[i]} fontSize="26" fontWeight="900">[{c}]</text>
            <path d={`M${pos[i][0] + (i % 2 === 0 ? 220 : 0)} ${pos[i][1] + 75} L${i % 2 === 0 ? 360 : 840} 280`} stroke={R[i]} strokeWidth="3" opacity="0.7" />
          </g>
        ))}
        <rect x="360" y="210" width="480" height="140" rx="18" fill="#0f172a" />
        <text x="600" y="268" textAnchor="middle" fill="#99f6e4" fontSize="18" fontWeight="800">root buffer</text>
        <text x="600" y="314" textAnchor="middle" fill="#fff" fontSize="24" fontWeight="900">[ A B C D E F G H ]</text>
      </svg>
    </Scene>
  )
}

/* 22 — collective atlas ---------------------------------------------------- */
export function CollectiveAtlas() {
  const thumbs = [
    ['Broadcast', 'radial', '#2563eb'],
    ['Scatter', 'split', '#7c3aed'],
    ['Gather', 'assemble', '#0ea5a4'],
    ['Reduce', 'tree', '#d97706'],
    ['Allreduce', 'tree + wave', '#059669'],
    ['Barrier', 'gate', '#e11d48'],
  ]
  return (
    <Scene label="Six collective patterns as a communication atlas" tone="coll">
      <svg viewBox="0 0 1200 560">
        {thumbs.map(([t, g, c], i) => {
          const x = 40 + (i % 3) * 390
          const y = 30 + Math.floor(i / 3) * 250
          return (
            <g key={t}>
              <rect x={x} y={y} width="360" height="220" rx="18" fill="#fff" stroke={c} strokeWidth="3" />
              <text x={x + 180} y={y + 40} textAnchor="middle" fill={ink} fontSize="22" fontWeight="900">{t}</text>
              {i === 0 && [0, 1, 2, 3].map((k) => <line key={k} x1={x + 180} y1={y + 90} x2={x + 80 + k * 70} y2={y + 170} stroke={c} strokeWidth="3" />)}
              {i === 1 && [0, 1, 2, 3].map((k) => <rect key={k} x={x + 50 + k * 70} y={y + 90} width="50" height="80" rx="6" fill={c} opacity={0.25 + k * 0.15} />)}
              {i === 2 && [0, 1, 2, 3].map((k) => <rect key={k} x={x + 70 + (k % 2) * 110} y={y + 68 + Math.floor(k / 2) * 44} width="90" height="34" rx="8" fill={c} opacity="0.35" />)}
              {i === 3 && (
                <>
                  <circle cx={x + 90} cy={y + 96} r="16" fill={c} />
                  <circle cx={x + 270} cy={y + 96} r="16" fill={c} />
                  <circle cx={x + 180} cy={y + 150} r="22" fill={c} />
                </>
              )}
              {i === 4 && (
                <>
                  <circle cx={x + 180} cy={y + 112} r="24" fill={c} />
                  <circle cx={x + 180} cy={y + 112} r="54" fill="none" stroke={c} strokeWidth="3" />
                </>
              )}
              {i === 5 && (
                <>
                  {[0, 1, 2, 3].map((k) => <rect key={k} x={x + 48} y={y + 70 + k * 24} width={70 + k * 32} height="16" rx="4" fill={c} opacity="0.5" />)}
                  <rect x={x + 300} y={y + 70} width="16" height="96" rx="4" fill={c} />
                </>
              )}
              <text x={x + 180} y={y + 204} textAnchor="middle" fill={c} fontSize="18" fontWeight="800">{g}</text>
            </g>
          )
        })}
      </svg>
    </Scene>
  )
}

/* 23 — barrier gate -------------------------------------------------------- */
export function BarrierGate() {
  return (
    <Scene label="Four timelines approach a literal gate that lifts" tone="coll">
      <svg viewBox="0 0 1200 560">
        {[0, 1, 2, 3].map((r) => (
          <g key={r}>
            <text x="40" y={90 + r * 90} fill={ink} fontSize="20" fontWeight="900">R{r}</text>
            <rect x="140" y={62 + r * 90} width={280 + r * 110} height="44" rx="8" fill={R[r]} />
            <text x={280 + r * 55} y={90 + r * 90} fill="#fff" fontSize="18" fontWeight="800">{r < 3 ? 'WAIT' : 'last'}</text>
          </g>
        ))}
        <rect x="820" y="40" width="32" height="380" rx="6" fill="#dc2626">
          <animate attributeName="y" values="40;40;360" dur="3.4s" repeatCount="indefinite" />
          <animate attributeName="height" values="380;380;60" dur="3.4s" repeatCount="indefinite" />
        </rect>
        <text x="920" y="230" fill={ink} fontSize="22" fontWeight="900">MPI_Barrier</text>
        <text x="600" y="500" textAnchor="middle" fill={ink} fontSize="20" fontWeight="850">the last arrival lifts the gate · everyone continues together</text>
      </svg>
    </Scene>
  )
}

/* 24 — built-in memory cells ----------------------------------------------- */
export function BuiltinCells() {
  const rows = [
    ['int', 'MPI_INT', 4, '#2563eb'],
    ['double', 'MPI_DOUBLE', 8, '#0ea5a4'],
    ['char', 'MPI_CHAR', 1, '#7c3aed'],
    ['float', 'MPI_FLOAT', 4, '#d97706'],
  ]
  return (
    <Scene label="C memory cells mapped onto MPI datatype labels" tone="type">
      <svg viewBox="0 0 1200 560">
        {rows.map(([c, mpi, n, col], i) => (
          <g key={c} transform={`translate(0 ${40 + i * 125})`}>
            <text x="40" y="70" fill={ink} fontSize="26" fontWeight="900" fontFamily="ui-monospace, monospace">{c}</text>
            {Array.from({ length: 8 }).map((_, k) => (
              <rect key={k} x={220 + k * 70} y="30" width="60" height="70" rx="8" fill={k < n ? col : '#eef2f7'} opacity={k < n ? 0.85 : 0.5} stroke="#cbd5e1" />
            ))}
            <text x="860" y="74" fill={col} fontSize="24" fontWeight="900" fontFamily="ui-monospace, monospace">{mpi}</text>
          </g>
        ))}
      </svg>
    </Scene>
  )
}

/* 25 — contiguous join ----------------------------------------------------- */
export function ContiguousJoin() {
  return (
    <Scene label="Adjacent memory cells joining into one logical block" tone="type">
      <svg viewBox="0 0 1200 560">
        <text x="600" y="60" textAnchor="middle" fill={ink} fontSize="22" fontWeight="900">MPI_Type_contiguous — consecutive elements</text>
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <rect key={i} x={80 + i * 110} y="140" width="96" height="120" rx="12" fill="#c4b5fd" stroke="#7c3aed" strokeWidth="3">
            <animate attributeName="x" values={`${80 + i * 110};${300 + i * 70};${300 + i * 70}`} dur="2.4s" repeatCount="indefinite" />
          </rect>
        ))}
        <rect x="260" y="340" width="680" height="90" rx="16" fill="#7c3aed" />
        <text x="600" y="396" textAnchor="middle" fill="#fff" fontSize="24" fontWeight="900">one logical block · one Send</text>
      </svg>
    </Scene>
  )
}

/* 26 — indexed irregular --------------------------------------------------- */
export function IndexedGaps() {
  const on = [0, 1, 4, 7]
  return (
    <Scene label="Irregular selected memory groups for MPI_Type_indexed" tone="type">
      <svg viewBox="0 0 1200 560">
        <text x="600" y="50" textAnchor="middle" fill={ink} fontSize="22" fontWeight="900">MPI_Type_indexed — irregular displacements</text>
        {Array.from({ length: 10 }).map((_, i) => (
          <g key={i}>
            <rect x={70 + i * 110} y="140" width="96" height="140" rx="12" fill={on.includes(i) ? '#fde68a' : '#e2e8f0'} stroke={on.includes(i) ? '#d97706' : '#cbd5e1'} strokeWidth={on.includes(i) ? 4 : 1} />
            <text x={118 + i * 110} y="220" textAnchor="middle" fill={ink} fontSize="20" fontWeight="900">{i}</text>
          </g>
        ))}
        <text x="600" y="360" textAnchor="middle" fill="#b45309" fontSize="20" fontWeight="850">blocks = [2, 1, 1]   displacements = [0, 4, 7]</text>
        <text x="600" y="420" textAnchor="middle" fill={mute} fontSize="18">not a regular stride — the gaps themselves are the datatype</text>
      </svg>
    </Scene>
  )
}

/* 27 — struct record ------------------------------------------------------- */
export function StructRecord() {
  const fields = [
    ['ID', 'MPI_INT', 40, '#2563eb'],
    ['X', 'MPI_DOUBLE', 80, '#0ea5a4'],
    ['Y', 'MPI_DOUBLE', 80, '#7c3aed'],
    ['VALUE', 'MPI_FLOAT', 50, '#d97706'],
  ]
  let acc = 80
  return (
    <Scene label="Structured record with typed fields and offsets" tone="type">
      <svg viewBox="0 0 1200 560">
        <text x="600" y="50" textAnchor="middle" fill={ink} fontSize="22" fontWeight="900">MPI_Type_create_struct — mixed fields</text>
        {fields.map(([n, t, w, c]) => {
          const x = acc
          acc += w * 3.4
          return (
            <g key={n}>
              <rect x={x} y="140" width={w * 3.2} height="180" rx="14" fill={c} opacity="0.18" stroke={c} strokeWidth="4" />
              <text x={x + w * 1.6} y="210" textAnchor="middle" fill={ink} fontSize="26" fontWeight="900">{n}</text>
              <text x={x + w * 1.6} y="250" textAnchor="middle" fill={c} fontSize="18" fontWeight="800">{t}</text>
            </g>
          )
        })}
        <text x="80" y="380" fill={mute} fontSize="18" fontWeight="800">offsets</text>
        <path d="M80 400 H1120" stroke="#94a3b8" strokeWidth="3" />
        <text x="80" y="440" fill="#2563eb" fontSize="18" fontWeight="800">0</text>
        <text x="600" y="510" textAnchor="middle" fill={ink} fontSize="18" fontWeight="850">one particle / one record travels as a single derived type</text>
      </svg>
    </Scene>
  )
}

/* 28 — datatype circular lifecycle ----------------------------------------- */
export function TypeCycle() {
  const steps = [
    [600, 90, 'DEFINE', '#7c3aed'],
    [980, 280, 'COMMIT', '#2563eb'],
    [600, 460, 'COMMUNICATE', '#059669'],
    [220, 280, 'FREE', '#d97706'],
  ]
  return (
    <Scene label="Circular datatype lifecycle" tone="type">
      <svg viewBox="0 0 1200 560">
        <circle cx="600" cy="280" r="170" fill="none" stroke="#c4b5fd" strokeWidth="4" strokeDasharray="8 10" />
        {steps.map(([x, y, t, c]) => (
          <g key={t}>
            {t === 'COMMUNICATE' ? (
              <rect x={x - 118} y={y - 34} width="236" height="68" rx="34" fill="#fff" stroke={c} strokeWidth="4" />
            ) : (
              <circle cx={x} cy={y} r="78" fill="#fff" stroke={c} strokeWidth="4" />
            )}
            <text x={x} y={y + 7} textAnchor="middle" fill={c} fontSize="18" fontWeight="900">{t}</text>
          </g>
        ))}
        <text x="600" y="286" textAnchor="middle" fill={ink} fontSize="18" fontWeight="850">newtype</text>
      </svg>
    </Scene>
  )
}

/* 29 — vector overlay on matrix -------------------------------------------- */
export function VectorOverlay() {
  const cells = Array.from({ length: 16 }, (_, i) => ({ r: Math.floor(i / 4), c: i % 4, v: i + 1 }))
  return (
    <Scene label="COUNT, BLOCKLENGTH and STRIDE overlaid on the matrix" tone="type">
      <svg viewBox="0 0 1200 560">
        {cells.map(({ r, c, v }) => {
          const col = c === 1
          return (
            <g key={`${r}${c}`}>
              <rect x={180 + c * 110} y={60 + r * 100} width="96" height="86" rx="10" fill={col ? '#fde68a' : '#f1f5f9'} stroke={col ? '#d97706' : '#cbd5e1'} strokeWidth={col ? 4 : 1} />
              <text x={228 + c * 110} y={112 + r * 100} textAnchor="middle" fill={ink} fontSize="22" fontWeight="900">{v}</text>
            </g>
          )
        })}
        <text x="760" y="108" fill="#7c3aed" fontSize="22" fontWeight="900">COUNT = 4</text>
        <text x="760" y="140" fill={mute} fontSize="18">four yellow blocks</text>
        <path d="M740 124 H 620" stroke="#7c3aed" strokeWidth="2" />
        <text x="760" y="232" fill="#2563eb" fontSize="22" fontWeight="900">BLOCKLENGTH = 1</text>
        <text x="760" y="264" fill={mute} fontSize="18">one element each</text>
        <path d="M740 248 H 620" stroke="#2563eb" strokeWidth="2" />
        <text x="760" y="356" fill="#d97706" fontSize="22" fontWeight="900">STRIDE = 4</text>
        <text x="760" y="388" fill={mute} fontSize="18">row width in oldtype units</text>
        <path d="M168 60 V460" stroke="#d97706" strokeWidth="3" strokeDasharray="6 6" />
      </svg>
    </Scene>
  )
}

/* 30 — Wtime strip --------------------------------------------------------- */
export function WtimeStrip() {
  const steps = ['BARRIER', 'START', 'WORK', 'BARRIER', 'STOP']
  const cols = ['#0f172a', '#2563eb', '#059669', '#0f172a', '#d97706']
  return (
    <Scene label="Parallel timing strip Barrier-Start-Work-Barrier-Stop" tone="perf">
      <svg viewBox="0 0 1200 560">
        {steps.map((t, i) => (
          <g key={t}>
            <rect x={40 + i * 232} y="160" width="214" height="140" rx="16" fill={cols[i]} />
            <text x={147 + i * 232} y="240" textAnchor="middle" fill="#fff" fontSize="22" fontWeight="900">{t}</text>
            {i < 4 && <path d={`M${254 + i * 232} 230 H${272 + i * 232}`} stroke="#94a3b8" strokeWidth="4" />}
          </g>
        ))}
        <rect x="504" y="160" width="214" height="8" rx="4" fill="#fbbf24">
          <animate attributeName="width" values="40;214;214" dur="2.8s" repeatCount="indefinite" />
        </rect>
        <text x="600" y="380" textAnchor="middle" fill={ink} fontSize="20" fontWeight="850">elapsed = stop − start   ·   the two barriers make the phase comparable</text>
        <text x="600" y="430" textAnchor="middle" fill={mute} fontSize="18" fontFamily="ui-monospace, monospace">start = MPI_Wtime();   …   elapsed = MPI_Wtime() − start;</text>
      </svg>
    </Scene>
  )
}

/* 31 — load balance lanes -------------------------------------------------- */
export function LoadLanes() {
  return (
    <Scene label="Balanced workers finish together; unbalanced leaves idle ranks" tone="perf">
      <svg viewBox="0 0 1200 560">
        <text x="300" y="50" textAnchor="middle" fill="#059669" fontSize="22" fontWeight="900">balanced</text>
        <text x="900" y="50" textAnchor="middle" fill="#dc2626" fontSize="22" fontWeight="900">unbalanced</text>
        {[0, 1, 2, 3].map((r) => (
          <g key={r}>
            <rect x="60" y={80 + r * 90} width="480" height="50" rx="8" fill={R[r]} />
            <rect x="660" y={80 + r * 90} width={r === 2 ? 480 : 220 + r * 40} height="50" rx="8" fill={R[r]} opacity={r === 2 ? 1 : 0.55} />
            {r !== 2 && <text x="1016" y={112 + r * 90} fill="#94a3b8" fontSize="18" fontWeight="800">idle</text>}
          </g>
        ))}
        <line x1="540" y1="70" x2="540" y2="430" stroke="#059669" strokeWidth="3" />
        <text x="540" y="460" textAnchor="middle" fill="#059669" fontSize="18" fontWeight="800">finish</text>
        <text x="900" y="500" textAnchor="middle" fill={ink} fontSize="18" fontWeight="850">one slow rank holds the whole communicator</text>
      </svg>
    </Scene>
  )
}

/* 32 — tiny vs large network ----------------------------------------------- */
export function TinyLatency() {
  return (
    <Scene label="Many tiny packets pay startup cost versus one large payload" tone="perf">
      <svg viewBox="0 0 1200 560">
        <text x="280" y="50" textAnchor="middle" fill="#b45309" fontSize="22" fontWeight="900">many tiny packets</text>
        <text x="920" y="50" textAnchor="middle" fill="#047857" fontSize="22" fontWeight="900">few large packets</text>
        <rect x="80" y="90" width="400" height="300" rx="18" fill="#fff7ed" stroke="#d97706" strokeWidth="3" />
        {Array.from({ length: 16 }).map((_, i) => (
          <circle key={i} cx={140 + (i % 4) * 80} cy={150 + Math.floor(i / 4) * 55} r="14" fill="#f59e0b">
            <animate attributeName="cy" values={`${150 + Math.floor(i / 4) * 55};${330};${150 + Math.floor(i / 4) * 55}`} dur={`${1.4 + i * 0.05}s`} repeatCount="indefinite" />
          </circle>
        ))}
        <text x="280" y="430" textAnchor="middle" fill="#b45309" fontSize="18" fontWeight="800">startup × 16</text>
        <rect x="720" y="90" width="400" height="300" rx="18" fill="#ecfdf5" stroke="#059669" strokeWidth="3" />
        <rect x="800" y="180" width="240" height="90" rx="14" fill="#059669" />
        <text x="920" y="234" textAnchor="middle" fill="#fff" fontSize="22" fontWeight="900">one payload</text>
        <text x="920" y="430" textAnchor="middle" fill="#047857" fontSize="18" fontWeight="800">startup × 1</text>
        <text x="600" y="510" textAnchor="middle" fill={ink} fontSize="20" fontWeight="850">latency is paid per message — not per byte</text>
      </svg>
    </Scene>
  )
}

/* 33 — timing table highlight ---------------------------------------------- */
export function TimingTable() {
  const rows = [
    ['1', '8.00 s', '1.00', '1.00'],
    ['2', '4.40 s', '1.82', '0.91'],
    ['4', '2.50 s', '3.20', '0.80'],
    ['8', '1.70 s', '4.71', '0.59'],
  ]
  return (
    <Scene label="Clean timing table with one row highlighted into T S E" tone="perf">
      <svg viewBox="0 0 1200 560">
        {['p', 'T(p)', 'S(p)', 'E(p)'].map((h, i) => (
          <text key={h} x={160 + i * 220} y="70" fill={mute} fontSize="18" fontWeight="900">{h}</text>
        ))}
        {rows.map((row, r) => (
          <g key={row[0]}>
            <rect x="80" y={90 + r * 80} width="700" height="68" rx="12" fill={r === 2 ? '#eff6ff' : '#fff'} stroke={r === 2 ? '#2563eb' : '#e2e8f0'} strokeWidth={r === 2 ? 3 : 1} />
            {row.map((v, i) => (
              <text key={i} x={160 + i * 220} y={132 + r * 80} fill={r === 2 ? '#1e3a8a' : ink} fontSize="22" fontWeight="900">{v}</text>
            ))}
          </g>
        ))}
        <rect x="820" y="170" width="320" height="240" rx="16" fill="#0f172a" />
        <text x="980" y="230" textAnchor="middle" fill="#93c5fd" fontSize="18" fontWeight="800">highlighted p = 4</text>
        <text x="980" y="280" textAnchor="middle" fill="#fff" fontSize="22" fontWeight="900">T(4) = 2.50 s</text>
        <text x="980" y="324" textAnchor="middle" fill="#fbbf24" fontSize="22" fontWeight="900">S(4) = 3.20</text>
        <text x="980" y="368" textAnchor="middle" fill="#86efac" fontSize="22" fontWeight="900">E(4) = 0.80</text>
      </svg>
    </Scene>
  )
}

/* 34 — unsorted tiles ------------------------------------------------------ */
export function UnsortedTiles({ sorted = false }) {
  const vals = sorted ? [1, 2, 3, 4, 5, 6, 7, 8] : [8, 3, 7, 2, 6, 1, 5, 4]
  return (
    <Scene label="Eight large number tiles then split across ranks" tone="sort">
      <svg viewBox="0 0 1200 560">
        <text x="600" y="50" textAnchor="middle" fill={ink} fontSize="22" fontWeight="900">{sorted ? 'globally ordered' : 'input  [8, 3, 7, 2, 6, 1, 5, 4]'}</text>
        {vals.map((v, i) => (
          <g key={`${v}-${i}`}>
            <rect x={70 + i * 140} y="100" width="120" height="140" rx="18" fill={sorted ? '#059669' : R[i % 4]} />
            <text x={130 + i * 140} y="190" textAnchor="middle" fill="#fff" fontSize="48" fontWeight="900">{v}</text>
          </g>
        ))}
        {!sorted && [0, 1, 2, 3].map((r) => (
          <g key={r}>
            <rect x={90 + r * 280} y="320" width="240" height="140" rx="16" fill="#fff" stroke={R[r]} strokeWidth="3" />
            <text x={210 + r * 280} y="370" textAnchor="middle" fill={ink} fontSize="18" fontWeight="900">Rank {r}</text>
            <text x={210 + r * 280} y="420" textAnchor="middle" fill={R[r]} fontSize="26" fontWeight="900">[{vals[r * 2]}, {vals[r * 2 + 1]}]</text>
          </g>
        ))}
      </svg>
    </Scene>
  )
}

/* 35 — odd zoom ------------------------------------------------------------ */
export function OddZoom() {
  return (
    <Scene label="Camera zooms to the middle pair Rank 1 ↔ Rank 2" tone="sort">
      <svg viewBox="0 0 1200 560">
        <rect x="40" y="180" width="180" height="160" rx="14" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="2" opacity="0.6" />
        <text x="130" y="270" textAnchor="middle" fill="#94a3b8" fontSize="20" fontWeight="800">R0 sits out</text>
        <rect x="280" y="120" width="300" height="280" rx="20" fill="#fff" stroke="#d97706" strokeWidth="5" />
        <text x="430" y="240" textAnchor="middle" fill={ink} fontSize="28" fontWeight="900">Rank 1</text>
        <text x="430" y="290" textAnchor="middle" fill="#d97706" fontSize="22" fontWeight="800">[2, 7]</text>
        <path d="M580 260 H620" stroke="#d97706" strokeWidth="8" />
        <rect x="620" y="120" width="300" height="280" rx="20" fill="#fff" stroke="#d97706" strokeWidth="5" />
        <text x="770" y="240" textAnchor="middle" fill={ink} fontSize="28" fontWeight="900">Rank 2</text>
        <text x="770" y="290" textAnchor="middle" fill="#d97706" fontSize="22" fontWeight="800">[1, 6]</text>
        <rect x="980" y="180" width="180" height="160" rx="14" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="2" opacity="0.6" />
        <text x="1070" y="270" textAnchor="middle" fill="#94a3b8" fontSize="20" fontWeight="800">R3 sits out</text>
        <text x="600" y="480" textAnchor="middle" fill={ink} fontSize="20" fontWeight="850">odd phase · only the middle neighbour pair exchanges</text>
      </svg>
    </Scene>
  )
}

/* 36 — compare-split flagship ---------------------------------------------- */
export function CompareMerge() {
  return (
    <Scene label="Two sorted arrays merge then physically split low/high" tone="sort">
      <svg viewBox="0 0 1200 560">
        {['1', '5', '8'].map((v, i) => (
          <rect key={`a${v}`} x={80 + i * 90} y="80" width="76" height="76" rx="12" fill="#2563eb" />
        ))}
        {['1', '5', '8'].map((v, i) => (
          <text key={`at${v}`} x={118 + i * 90} y="128" textAnchor="middle" fill="#fff" fontSize="26" fontWeight="900">{v}</text>
        ))}
        <text x="200" y="50" textAnchor="middle" fill="#2563eb" fontSize="18" fontWeight="900">Rank 0</text>
        {['2', '6', '9'].map((v, i) => (
          <rect key={`b${v}`} x={850 + i * 90} y="80" width="76" height="76" rx="12" fill="#7c3aed" />
        ))}
        {['2', '6', '9'].map((v, i) => (
          <text key={`bt${v}`} x={888 + i * 90} y="128" textAnchor="middle" fill="#fff" fontSize="26" fontWeight="900">{v}</text>
        ))}
        <text x="1000" y="50" textAnchor="middle" fill="#7c3aed" fontSize="18" fontWeight="900">Rank 1</text>
        {['1', '2', '5', '6', '8', '9'].map((v, i) => (
          <rect key={`m${v}`} x={180 + i * 140} y="230" width="120" height="90" rx="14" fill="#0f172a" />
        ))}
        {['1', '2', '5', '6', '8', '9'].map((v, i) => (
          <text key={`mt${v}`} x={240 + i * 140} y="286" textAnchor="middle" fill="#fbbf24" fontSize="28" fontWeight="900">{v}</text>
        ))}
        <text x="600" y="210" textAnchor="middle" fill={mute} fontSize="18" fontWeight="800">merge</text>
        <rect x="80" y="380" width="480" height="110" rx="16" fill="#ecfdf5" stroke="#059669" strokeWidth="3" />
        <text x="320" y="430" textAnchor="middle" fill="#065f46" fontSize="20" fontWeight="900">LOWER HALF → Rank 0</text>
        <text x="320" y="464" textAnchor="middle" fill="#059669" fontSize="26" fontWeight="900">[1  2  5]</text>
        <rect x="640" y="380" width="480" height="110" rx="16" fill="#f5f3ff" stroke="#7c3aed" strokeWidth="3" />
        <text x="880" y="430" textAnchor="middle" fill="#5b21b6" fontSize="20" fontWeight="900">HIGHER HALF → Rank 1</text>
        <text x="880" y="464" textAnchor="middle" fill="#7c3aed" fontSize="26" fontWeight="900">[6  8  9]</text>
      </svg>
    </Scene>
  )
}

/* 37 — sort performance decomposition -------------------------------------- */
export function SortPerfBars() {
  const bars = [
    ['local sorting', 420, '#2563eb'],
    ['communication', 280, '#d97706'],
    ['merge / split', 180, '#7c3aed'],
    ['idle / imbalance', 120, '#94a3b8'],
  ]
  return (
    <Scene label="Sorting runtime decomposed into work, communication, merge, idle" tone="perf">
      <svg viewBox="0 0 1200 560">
        {bars.map(([t, w, c], i) => (
          <g key={t}>
            <text x="40" y={110 + i * 90} fill={ink} fontSize="20" fontWeight="900">{t}</text>
            <rect x="320" y={80 + i * 90} width={w} height="50" rx="10" fill={c} />
          </g>
        ))}
        <text x="600" y="480" textAnchor="middle" fill={ink} fontSize="20" fontWeight="850">more ranks help only while local sort still outweighs exchange</text>
      </svg>
    </Scene>
  )
}

/* 38 — token passing I/O --------------------------------------------------- */
export function TokenPass() {
  return (
    <Scene label="A print token travels 0 → 1 → 2 → 3" tone="io">
      <svg viewBox="0 0 1200 560">
        {[0, 1, 2, 3].map((r) => (
          <g key={r}>
            <rect x={70 + r * 280} y="160" width="220" height="180" rx="16" fill="#0f172a" />
            <text x={180 + r * 280} y="220" textAnchor="middle" fill="#94a3b8" fontSize="18">terminal</text>
            <text x={180 + r * 280} y="260" textAnchor="middle" fill="#fff" fontSize="22" fontWeight="900">Rank {r}</text>
            <text x={180 + r * 280} y="304" textAnchor="middle" fill="#86efac" fontSize="18" fontWeight="800">prints when token arrives</text>
            {r < 3 && <path d={`M${290 + r * 280} 250 H${350 + r * 280}`} stroke="#fbbf24" strokeWidth="5" />}
          </g>
        ))}
        <g>
          <circle r="16" fill="#fbbf24" />
          <animateMotion dur="3.6s" repeatCount="indefinite" path="M180 250 H460 H740 H1020" />
        </g>
        <text x="600" y="80" textAnchor="middle" fill={ink} fontSize="22" fontWeight="900">token  0 → 1 → 2 → 3</text>
        <text x="600" y="430" textAnchor="middle" fill={mute} fontSize="18">readable debug output · never time this path</text>
      </svg>
    </Scene>
  )
}

/* 39 — interleaved terminals ----------------------------------------------- */
export function TerminalWall({ clean = false }) {
  const messy = [
    [40, 40, 'R1 local_int=3.1', R[1]],
    [420, 70, 'R0 enter a,b,n', R[0]],
    [780, 40, 'R3 done', R[3]],
    [120, 220, 'R2 local_int=4.2', R[2]],
    [560, 250, 'R0 printing…', R[0]],
    [900, 210, 'R1 waiting', R[1]],
    [300, 380, 'R3 still writing', R[3]],
    [700, 400, 'R2 done?', R[2]],
  ]
  const ordered = [
    [80, 80, 'Rank 0 prints the result', R[0]],
    [80, 180, 'Rank 1 prints local_int', R[1]],
    [80, 280, 'Rank 2 prints local_int', R[2]],
    [80, 380, 'Rank 3 prints local_int', R[3]],
  ]
  const lines = clean ? ordered : messy
  return (
    <Scene label={clean ? 'Root-managed clean output' : 'Chaotic interleaved terminals'} tone="io">
      <svg viewBox="0 0 1200 560">
        {lines.map(([x, y, t, c]) => (
          <g key={t}>
            <rect x={x} y={y} width={clean ? 1040 : 340} height={clean ? 70 : 90} rx="12" fill="#0f172a" stroke={c} strokeWidth="3" />
            <text x={x + 24} y={y + (clean ? 44 : 54)} fill="#86efac" fontSize="18" fontWeight="800" fontFamily="ui-monospace, monospace">{t}</text>
          </g>
        ))}
      </svg>
    </Scene>
  )
}

/* 40 — annotated key terms on a live program ------------------------------- */
export function AnnotatedProgram() {
  const calls = [
    [80, 70, 'rank', 'MPI_Comm_rank', R[0]],
    [80, 200, 'size', 'MPI_Comm_size', R[1]],
    [80, 330, 'communicator', 'MPI_COMM_WORLD', '#2563eb'],
    [720, 70, 'message', 'payload 100', '#d97706'],
    [720, 200, 'tag', 'tag = 0', '#7c3aed'],
    [720, 330, 'datatype', 'MPI_INT', '#0ea5a4'],
  ]
  return (
    <Scene label="Key MPI terms annotated on one live program" tone="net">
      <svg viewBox="0 0 1200 560">
        <rect x="340" y="90" width="520" height="340" rx="20" fill="#0f172a" />
        <text x="600" y="140" textAnchor="middle" fill="#7dd3fc" fontSize="18" fontFamily="ui-monospace, monospace">MPI_Init</text>
        <text x="600" y="190" textAnchor="middle" fill="#e2e8f0" fontSize="18" fontFamily="ui-monospace, monospace">MPI_Comm_rank / size</text>
        <text x="600" y="240" textAnchor="middle" fill="#fbbf24" fontSize="18" fontFamily="ui-monospace, monospace">MPI_Send / MPI_Recv</text>
        <text x="600" y="290" textAnchor="middle" fill="#86efac" fontSize="18" fontFamily="ui-monospace, monospace">parallel work</text>
        <text x="600" y="340" textAnchor="middle" fill="#fda4af" fontSize="18" fontFamily="ui-monospace, monospace">MPI_Finalize</text>
        {calls.map(([x, y, k, v, c]) => (
          <g key={k}>
            <rect x={x} y={y} width="240" height="90" rx="14" fill="#fff" stroke={c} strokeWidth="3" />
            <text x={x + 120} y={y + 38} textAnchor="middle" fill={c} fontSize="18" fontWeight="900">{k}</text>
            <text x={x + 120} y={y + 66} textAnchor="middle" fill={ink} fontSize="18" fontWeight="800">{v}</text>
          </g>
        ))}
      </svg>
    </Scene>
  )
}

/* 41 — synthesis universe -------------------------------------------------- */
export function SynthesisWorld() {
  const nodes = [
    [180, 168, 'private memory', '#2563eb'],
    [420, 118, 'ranks', '#0ea5a4'],
    [680, 118, 'messages', '#f59e0b'],
    [920, 168, 'collectives', '#7c3aed'],
    [180, 372, 'datatypes', '#4f46e5'],
    [500, 412, 'performance', '#e11d48'],
    [860, 372, 'algorithms', '#059669'],
  ]
  return (
    <Scene label="The MPI universe connected as one teaching scene" tone="sum">
      <svg viewBox="0 0 1200 560">
        <path d="M180 168 L420 118 L680 118 L920 168 L860 372 L500 412 L180 372 Z" fill="none" stroke="#cbd5e1" strokeWidth="3" />
        {nodes.map(([x, y, t, c]) => (
          <g key={t}>
            <circle cx={x} cy={y} r="78" fill="#fff" stroke={c} strokeWidth="4" />
            {t.includes(' ') ? (
              <text textAnchor="middle" fill={c} fontSize="18" fontWeight="900">
                <tspan x={x} y={y - 4}>{t.split(' ')[0]}</tspan>
                <tspan x={x} y={y + 20}>{t.split(' ').slice(1).join(' ')}</tspan>
              </text>
            ) : (
              <text x={x} y={y + 6} textAnchor="middle" fill={c} fontSize="18" fontWeight="900">{t}</text>
            )}
          </g>
        ))}
        <text x="600" y="548" textAnchor="middle" fill={ink} fontSize="20" fontWeight="850">private memory + messages = one distributed machine</text>
      </svg>
    </Scene>
  )
}

/* 42 — exam / viva boards -------------------------------------------------- */
export function ExamBoard({ kind = 'viva' }) {
  if (kind === 'shortcuts') {
    return (
      <Scene label="Exam shortcut: write the call then the matching pair" tone="sum">
        <svg viewBox="0 0 1200 560">
          <rect x="80" y="80" width="480" height="360" rx="20" fill="#fff" stroke="#e11d48" strokeWidth="4" />
          <text x="320" y="160" textAnchor="middle" fill="#e11d48" fontSize="22" fontWeight="900">WRITE THE CALL</text>
          <text x="320" y="240" textAnchor="middle" fill={ink} fontSize="20">MPI_Send / MPI_Bcast / MPI_Reduce</text>
          <text x="320" y="300" textAnchor="middle" fill={mute} fontSize="18">arguments in order</text>
          <path d="M560 260 H640" stroke="#e11d48" strokeWidth="6" />
          <rect x="640" y="80" width="480" height="360" rx="20" fill="#fff7ed" stroke="#d97706" strokeWidth="4" />
          <text x="880" y="160" textAnchor="middle" fill="#d97706" fontSize="22" fontWeight="900">THEN THE PAIR</text>
          <text x="880" y="240" textAnchor="middle" fill={ink} fontSize="20">who sends · who receives</text>
          <text x="880" y="300" textAnchor="middle" fill={mute} fontSize="18">where the result lives</text>
        </svg>
      </Scene>
    )
  }
  if (kind === 'two') {
    return (
      <Scene label="Two-mark answer: definition plus a tiny figure" tone="sum">
        <svg viewBox="0 0 1200 560">
          <rect x="60" y="80" width="700" height="360" rx="18" fill="#ecfeff" stroke="#0ea5a4" strokeWidth="4" />
          <text x="410" y="180" textAnchor="middle" fill="#0f766e" fontSize="28" fontWeight="900">definition</text>
          <text x="410" y="250" textAnchor="middle" fill={ink} fontSize="20">two to four lines + the keyword</text>
          <rect x="820" y="140" width="300" height="240" rx="16" fill="#fff" stroke="#0ea5a4" strokeWidth="3" />
          {[0, 1, 2, 3].map((r) => (
            <circle key={r} cx={890 + (r % 2) * 160} cy={210 + Math.floor(r / 2) * 100} r="28" fill={R[r]} />
          ))}
          <text x="970" y="420" textAnchor="middle" fill="#0f766e" fontSize="18" fontWeight="900">tiny figure</text>
        </svg>
      </Scene>
    )
  }
  if (kind === 'five') {
    return (
      <Scene label="Five marks: a worked MPI pattern in steps" tone="sum">
        <svg viewBox="0 0 1200 560">
          {['Init', 'ranks', 'work', 'collect', 'Finalize'].map((s, i) => (
            <g key={s}>
              <rect x={70 + i * 226} y="160" width="200" height="200" rx="18" fill="#fff" stroke="#7c3aed" strokeWidth="4" />
              <text x={170 + i * 226} y="230" textAnchor="middle" fill="#7c3aed" fontSize="18" fontWeight="900">{i + 1}</text>
              <text x={170 + i * 226} y="280" textAnchor="middle" fill={ink} fontSize="22" fontWeight="900">{s}</text>
              {i < 4 && <path d={`M${270 + i * 226} 260 H${296 + i * 226}`} stroke="#7c3aed" strokeWidth="4" />}
            </g>
          ))}
          <text x="600" y="80" textAnchor="middle" fill="#5b21b6" fontSize="22" fontWeight="900">five marks = diagram + steps + one limitation</text>
        </svg>
      </Scene>
    )
  }
  if (kind === 'ten') {
    return (
      <Scene label="Ten marks need four ranks drawn on the page" tone="sum">
        <svg viewBox="0 0 1200 560">
          <rect x="40" y="40" width="1120" height="480" rx="8" fill="#fffbeb" stroke="#d97706" strokeWidth="3" />
          <text x="80" y="90" fill="#92400e" fontSize="18" fontWeight="800">exam paper</text>
          {[0, 1, 2, 3].map((r) => (
            <g key={r}>
              <rect x={120 + r * 250} y="160" width="200" height="220" rx="8" fill="#fff" stroke={R[r]} strokeWidth="3" strokeDasharray="8 6" />
              <text x={220 + r * 250} y="240" textAnchor="middle" fill={ink} fontSize="22" fontWeight="900">Rank {r}</text>
              <text x={220 + r * 250} y="300" textAnchor="middle" fill={R[r]} fontSize="18">draw this</text>
            </g>
          ))}
          <text x="600" y="460" textAnchor="middle" fill="#92400e" fontSize="20" fontWeight="850">ten marks without a figure lose easy credit</text>
        </svg>
      </Scene>
    )
  }
  return (
    <Scene label="Viva: fire the keyword, not an essay" tone="sum">
      <svg viewBox="0 0 1200 560">
        <circle cx="600" cy="280" r="70" fill="#2563eb" />
        <text x="600" y="290" textAnchor="middle" fill="#fff" fontSize="22" fontWeight="900">viva</text>
        {['rank', 'communicator', 'tag', 'deadlock', 'Bcast', 'Reduce', 'Wtime', 'vector'].map((t, i) => {
          const a = (Math.PI * 2 * i) / 8 - Math.PI / 2
          const x = 600 + Math.cos(a) * 210
          const y = 280 + Math.sin(a) * 160
          return (
            <g key={t}>
              <line x1="600" y1="280" x2={x} y2={y} stroke="#93c5fd" strokeWidth="2" />
              <rect x={x - 90} y={y - 24} width="180" height="48" rx="24" fill="#fff" stroke="#2563eb" strokeWidth="3" />
              <text x={x} y={y + 6} textAnchor="middle" fill="#1e3a8a" fontSize="18" fontWeight="900">{t}</text>
            </g>
          )
        })}
      </svg>
    </Scene>
  )
}

/* 43 — Sp / Ep meters ------------------------------------------------------ */
export function SpeedupMeters() {
  return (
    <Scene label="Large Sp and Ep formulas with runtime bars" tone="perf">
      <svg viewBox="0 0 1200 560">
        <rect x="60" y="60" width="520" height="200" rx="20" fill="#eff6ff" stroke="#2563eb" strokeWidth="3" />
        <text x="320" y="150" textAnchor="middle" fill="#1e3a8a" fontSize="48" fontWeight="900">Sₚ = T₁ / Tₚ</text>
        <text x="320" y="210" textAnchor="middle" fill={mute} fontSize="18">speedup</text>
        <rect x="620" y="60" width="520" height="200" rx="20" fill="#ecfdf5" stroke="#059669" strokeWidth="3" />
        <text x="880" y="150" textAnchor="middle" fill="#065f46" fontSize="48" fontWeight="900">Eₚ = Sₚ / p</text>
        <text x="880" y="210" textAnchor="middle" fill={mute} fontSize="18">efficiency</text>
        <text x="60" y="340" fill={ink} fontSize="18" fontWeight="900">T₁</text>
        <rect x="120" y="314" width="1000" height="36" rx="8" fill="#2563eb" />
        <text x="60" y="420" fill={ink} fontSize="18" fontWeight="900">T₄</text>
        <rect x="120" y="394" width="320" height="36" rx="8" fill="#059669" />
        <rect x="440" y="394" width="80" height="36" rx="8" fill="#d97706" />
        <text x="600" y="500" textAnchor="middle" fill={ink} fontSize="18" fontWeight="850">amber is communication — it is why Eₚ is not 1</text>
      </svg>
    </Scene>
  )
}

/* 44 — n=1000 partition scale ---------------------------------------------- */
export function Scale1000() {
  return (
    <Scene label="1000 trapezoids become 250 per rank" tone="trap">
      <svg viewBox="0 0 1200 560">
        <text x="600" y="50" textAnchor="middle" fill={ink} fontSize="22" fontWeight="900">n = 1000   ·   p = 4</text>
        <rect x="80" y="90" width="1040" height="70" rx="12" fill="#e2e8f0" />
        {Array.from({ length: 40 }).map((_, i) => (
          <rect key={i} x={90 + i * 25.5} y="100" width="18" height="50" rx="3" fill="#94a3b8" />
        ))}
        <text x="600" y="200" textAnchor="middle" fill={mute} fontSize="18">1000 trapezoids</text>
        {[0, 1, 2, 3].map((r) => (
          <g key={r}>
            <path d={`M${210 + r * 260} 160 L${210 + r * 260} 250`} stroke={R[r]} strokeWidth="3" />
            <rect x={80 + r * 280} y="250" width="250" height="180" rx="16" fill="#fff" stroke={R[r]} strokeWidth="4" />
            <text x={205 + r * 280} y="320" textAnchor="middle" fill={ink} fontSize="22" fontWeight="900">Rank {r}</text>
            <text x={205 + r * 280} y="370" textAnchor="middle" fill={R[r]} fontSize="32" fontWeight="900">250</text>
          </g>
        ))}
      </svg>
    </Scene>
  )
}

/* 45 — serial vs parallel trap --------------------------------------------- */
export function SerialVsParallelTrap() {
  return (
    <Scene label="Same curve: one worker versus four coloured regions" tone="trap">
      <svg viewBox="0 0 1200 560">
        <text x="300" y="40" textAnchor="middle" fill={ink} fontSize="20" fontWeight="900">serial</text>
        <text x="900" y="40" textAnchor="middle" fill={ink} fontSize="20" fontWeight="900">MPI</text>
        <line x1="600" y1="50" x2="600" y2="500" stroke="#e2e8f0" strokeWidth="2" />
        <path d="M80 420 Q 300 120 560 300" fill="none" stroke="#64748b" strokeWidth="4" />
        <rect x="80" y="432" width="70" height="36" rx="8" fill="#dc2626">
          <animate attributeName="x" values="80;490;490" dur="3s" repeatCount="indefinite" />
        </rect>
        {[0, 1, 2, 3].map((r) => (
          <rect key={r} x={640 + r * 120} y="200" width="110" height="230" rx="10" fill={R[r]} opacity="0.28" />
        ))}
        <path d="M640 420 Q 860 120 1120 300" fill="none" stroke="#2563eb" strokeWidth="4" />
        {[0, 1, 2, 3].map((r) => (
          <text key={`t${r}`} x={695 + r * 120} y="460" textAnchor="middle" fill={R[r]} fontSize="18" fontWeight="900">R{r}</text>
        ))}
      </svg>
    </Scene>
  )
}

/* 46 — bcast radial four ranks --------------------------------------------- */
export function BcastFour() {
  const cx = 600
  const cy = 280
  return (
    <Scene label="Root at centre broadcasts x=25 radially to four ranks" tone="coll">
      <svg viewBox="0 0 1200 560">
        <circle cx={cx} cy={cy} r="80" fill="none" stroke="#93c5fd" strokeWidth="3">
          <animate attributeName="r" values="70;200;70" dur="2.6s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.9;0;0.9" dur="2.6s" repeatCount="indefinite" />
        </circle>
        <circle cx={cx} cy={cy} r="70" fill="#2563eb" />
        <text x={cx} y={cy - 8} textAnchor="middle" fill="#fff" fontSize="18" fontWeight="900">root</text>
        <text x={cx} y={cy + 20} textAnchor="middle" fill="#dbeafe" fontSize="22" fontWeight="900">x = 25</text>
        {[0, 1, 2, 3].map((r) => {
          const a = (Math.PI * 2 * r) / 4 - Math.PI / 2
          const x = cx + Math.cos(a) * 220
          const y = cy + Math.sin(a) * 170
          return (
            <g key={r}>
              <circle cx={x} cy={y} r="54" fill="#fff" stroke={R[r]} strokeWidth="4" />
              <text x={x} y={y - 6} textAnchor="middle" fill={ink} fontSize="18" fontWeight="900">Rank {r}</text>
              <text x={x} y={y + 18} textAnchor="middle" fill="#2563eb" fontSize="20" fontWeight="900">25</text>
            </g>
          )
        })}
      </svg>
    </Scene>
  )
}

/* 47 — benefits before/after packing --------------------------------------- */
export function PackingBeforeAfter() {
  return (
    <Scene label="Manual packing versus one derived-type send" tone="type">
      <svg viewBox="0 0 1200 560">
        <text x="300" y="50" textAnchor="middle" fill="#b45309" fontSize="22" fontWeight="900">before · pack by hand</text>
        <text x="900" y="50" textAnchor="middle" fill="#047857" fontSize="22" fontWeight="900">after · one datatype</text>
        {[0, 1, 2, 3].map((i) => (
          <g key={i}>
            <rect x={80 + (i % 2) * 200} y={100 + Math.floor(i / 2) * 140} width="160" height="100" rx="10" fill="#fde68a" stroke="#d97706" />
            <text x={160 + (i % 2) * 200} y={156 + Math.floor(i / 2) * 140} textAnchor="middle" fill="#92400e" fontSize="18" fontWeight="800">copy {i + 1}</text>
          </g>
        ))}
        <rect x="720" y="140" width="400" height="260" rx="20" fill="#ecfdf5" stroke="#059669" strokeWidth="4" />
        <text x="920" y="250" textAnchor="middle" fill="#065f46" fontSize="22" fontWeight="900">MPI_Send(…, newtype)</text>
        <text x="920" y="300" textAnchor="middle" fill="#047857" fontSize="18">layout described once</text>
      </svg>
    </Scene>
  )
}

/* 48 — SPMD fork cinematic ------------------------------------------------- */
export function SpmdFork() {
  return (
    <Scene label="One executable splitting into four running instances" tone="net">
      <svg viewBox="0 0 1200 560">
        <rect x="360" y="30" width="480" height="80" rx="16" fill="#0f172a" />
        <text x="600" y="80" textAnchor="middle" fill="#fff" fontSize="24" fontWeight="900">parallel_program</text>
        {[0, 1, 2, 3].map((r) => (
          <g key={r}>
            <path d={`M600 110 C 600 160, ${180 + r * 280} 160, ${180 + r * 280} 210`} fill="none" stroke={R[r]} strokeWidth="4" />
            <rect x={70 + r * 280} y="210" width="220" height="250" rx="18" fill="#fff" stroke={R[r]} strokeWidth="4" />
            <text x={180 + r * 280} y="280" textAnchor="middle" fill={ink} fontSize="22" fontWeight="900">instance {r}</text>
            <text x={180 + r * 280} y="330" textAnchor="middle" fill={R[r]} fontSize="28" fontWeight="900">Rank {r}</text>
            <text x={180 + r * 280} y="390" textAnchor="middle" fill={mute} fontSize="18">same text · local data</text>
          </g>
        ))}
      </svg>
    </Scene>
  )
}

/* 49 — even phase lanes ---------------------------------------------------- */
export function EvenLanes() {
  const pairs = [[0, 1], [2, 3]]
  return (
    <Scene label="Even phase neighbour exchanges highlighted as pairs" tone="sort">
      <svg viewBox="0 0 1200 560">
        <text x="600" y="50" textAnchor="middle" fill={ink} fontSize="22" fontWeight="900">EVEN PHASE · 0 ↔ 1    2 ↔ 3</text>
        {pairs.map(([a, b], i) => (
          <g key={a}>
            <rect x={80 + i * 580} y="120" width="500" height="280" rx="24" fill="#fff" stroke={R[i * 2]} strokeWidth="4" />
            <rect x={120 + i * 580} y="180" width="180" height="160" rx="16" fill={R[a]} />
            <text x={210 + i * 580} y="270" textAnchor="middle" fill="#fff" fontSize="24" fontWeight="900">Rank {a}</text>
            <text x={330 + i * 580} y="270" textAnchor="middle" fill={ink} fontSize="28" fontWeight="900">↔</text>
            <rect x={360 + i * 580} y="180" width="180" height="160" rx="16" fill={R[b]} />
            <text x={450 + i * 580} y="270" textAnchor="middle" fill="#fff" fontSize="24" fontWeight="900">Rank {b}</text>
          </g>
        ))}
      </svg>
    </Scene>
  )
}

/* 50 — local sort reorder -------------------------------------------------- */
export function LocalReorder() {
  const before = [[8, 3], [7, 2], [6, 1], [5, 4]]
  const after = [[3, 8], [2, 7], [1, 6], [4, 5]]
  return (
    <Scene label="Chunks drop into lanes then reorder locally" tone="sort">
      <svg viewBox="0 0 1200 560">
        {before.map((pair, r) => (
          <g key={r}>
            <text x="40" y={90 + r * 110} fill={ink} fontSize="18" fontWeight="900">R{r}</text>
            {pair.map((v, k) => (
              <rect key={`b${v}`} x={120 + k * 90} y={50 + r * 110} width="76" height="76" rx="12" fill="#94a3b8" />
            ))}
            {pair.map((v, k) => (
              <text key={`bt${v}`} x={158 + k * 90} y={98 + r * 110} textAnchor="middle" fill="#fff" fontSize="24" fontWeight="900">{v}</text>
            ))}
            <path d={`M320 ${88 + r * 110} H520`} stroke="#059669" strokeWidth="4" />
            {after[r].map((v, k) => (
              <rect key={`a${v}`} x={540 + k * 90} y={50 + r * 110} width="76" height="76" rx="12" fill={R[r]} />
            ))}
            {after[r].map((v, k) => (
              <text key={`at${v}`} x={578 + k * 90} y={98 + r * 110} textAnchor="middle" fill="#fff" fontSize="24" fontWeight="900">{v}</text>
            ))}
          </g>
        ))}
        <text x="900" y="280" fill={ink} fontSize="20" fontWeight="850">local sort</text>
        <text x="900" y="316" fill={mute} fontSize="18">global order still open</text>
      </svg>
    </Scene>
  )
}

/* 51 — n=1000 formula interval one rank ------------------------------------ */
export function LocalAnnotate() {
  return (
    <Scene label="One rank segment annotated with local_n local_a local_b local_int" tone="trap">
      <svg viewBox="0 0 1200 560">
        <path d="M60 400 H1140" stroke="#64748b" strokeWidth="3" />
        <rect x="60" y="388" width="280" height="24" fill="#e2e8f0" />
        <rect x="860" y="388" width="280" height="24" fill="#e2e8f0" />
        <polygon points="340,400 340,200 860,140 860,400" fill="rgba(14,165,164,0.22)" stroke="#0ea5a4" strokeWidth="3" />
        <path d="M292 158 L340 200" stroke="#5b21b6" strokeWidth="2" />
        <path d="M930 92 L860 140" stroke="#5b21b6" strokeWidth="2" />
        <text x="280" y="152" textAnchor="end" fill="#5b21b6" fontSize="22" fontWeight="900">local_a</text>
        <text x="980" y="96" textAnchor="start" fill="#5b21b6" fontSize="22" fontWeight="900">local_b</text>
        <text x="600" y="438" textAnchor="middle" fill="#b45309" fontSize="20" fontWeight="900">local_n subintervals</text>
        <rect x="380" y="28" width="440" height="56" rx="12" fill="#0f172a" />
        <text x="600" y="64" textAnchor="middle" fill="#fbbf24" fontSize="22" fontWeight="900">local_int = shaded area</text>
        <text x="600" y="500" textAnchor="middle" fill="#0f766e" fontSize="18" fontWeight="850">Rank 1 owns only this slice of [a, b]</text>
      </svg>
    </Scene>
  )
}

/* 52 — root I/O hub -------------------------------------------------------- */
export function RootIO() {
  return (
    <Scene label="stdin into Rank 0, stdout out, other ranks only compute" tone="io">
      <svg viewBox="0 0 1200 560">
        <rect x="40" y="210" width="200" height="80" rx="12" fill="#0f172a" />
        <text x="140" y="258" textAnchor="middle" fill="#fbbf24" fontSize="20" fontWeight="900">stdin</text>
        <rect x="340" y="170" width="280" height="160" rx="18" fill="#2563eb" />
        <text x="480" y="240" textAnchor="middle" fill="#fff" fontSize="26" fontWeight="900">Rank 0</text>
        <text x="480" y="280" textAnchor="middle" fill="#dbeafe" fontSize="18">reads · validates · prints</text>
        <rect x="960" y="210" width="200" height="80" rx="12" fill="#0f172a" />
        <text x="1060" y="258" textAnchor="middle" fill="#86efac" fontSize="20" fontWeight="900">stdout</text>
        <path d="M240 250 H340" stroke="#2563eb" strokeWidth="4" />
        <path d="M620 250 H960" stroke="#059669" strokeWidth="4" />
        {[1, 2, 3].map((r, i) => (
          <g key={r}>
            <rect x={300 + i * 220} y="400" width="180" height="80" rx="12" fill="#fff" stroke={R[r]} strokeWidth="3" />
            <text x={390 + i * 220} y="448" textAnchor="middle" fill={ink} fontSize="18" fontWeight="900">Rank {r} computes</text>
          </g>
        ))}
      </svg>
    </Scene>
  )
}

/* 53 — reduce 20 tree ------------------------------------------------------ */
export function Reduce20() {
  return (
    <Scene label="Binary tree 2+4 and 6+8 then 20 at Rank 0" tone="coll">
      <svg viewBox="0 0 1200 560">
        {[
          [150, '2', 0],
          [430, '4', 1],
          [730, '6', 2],
          [1010, '8', 3],
        ].map(([x, v, r]) => (
          <g key={r}>
            <circle cx={x} cy="70" r="44" fill="#fff" stroke={R[r]} strokeWidth="4" />
            <text x={x} y="78" textAnchor="middle" fill={ink} fontSize="24" fontWeight="900">{v}</text>
          </g>
        ))}
        <path d="M150 114 L290 230 L430 114" fill="none" stroke="#0ea5a4" strokeWidth="4" />
        <path d="M730 114 L870 230 L1010 114" fill="none" stroke="#7c3aed" strokeWidth="4" />
        <rect x="175" y="148" width="230" height="48" rx="12" fill="#ecfdf5" stroke="#0ea5a4" strokeWidth="2" />
        <text x="290" y="180" textAnchor="middle" fill="#0f766e" fontSize="22" fontWeight="900">2 + 4 = 6</text>
        <rect x="755" y="148" width="230" height="48" rx="12" fill="#f5f3ff" stroke="#7c3aed" strokeWidth="2" />
        <text x="870" y="180" textAnchor="middle" fill="#5b21b6" fontSize="22" fontWeight="900">6 + 8 = 14</text>
        <path d="M290 230 L600 300 L870 230" fill="none" stroke="#2563eb" strokeWidth="5" />
        <rect x="470" y="288" width="260" height="48" rx="12" fill="#eff6ff" stroke="#2563eb" strokeWidth="2" />
        <text x="600" y="320" textAnchor="middle" fill="#2563eb" fontSize="24" fontWeight="900">6 + 14 = 20</text>
        <rect x="420" y="360" width="360" height="80" rx="14" fill="#0f172a" />
        <text x="600" y="410" textAnchor="middle" fill="#fbbf24" fontSize="22" fontWeight="900">result lives at Rank 0</text>
      </svg>
    </Scene>
  )
}

export function SnapSort() {
  return <UnsortedTiles sorted />
}

export function ExamShortcuts() { return <ExamBoard kind="shortcuts" /> }
export function ExamViva() { return <ExamBoard kind="viva" /> }
export function ExamTwo() { return <ExamBoard kind="two" /> }
export function ExamFive() { return <ExamBoard kind="five" /> }
export function ExamTen() { return <ExamBoard kind="ten" /> }

export function CollectiveStar() {
  return (
    <Scene label="Symmetric collective paths with no root value yet" tone="coll">
      <svg viewBox="0 0 1200 560">
        {[0, 1, 2, 3, 4, 5].map((i) => {
          const a = (Math.PI * 2 * i) / 6 - Math.PI / 2
          return <line key={i} x1="600" y1="280" x2={600 + Math.cos(a) * 240} y2={280 + Math.sin(a) * 180} stroke="#93c5fd" strokeWidth="3" />
        })}
        {[0, 1, 2, 3].map((r) => {
          const a = (Math.PI * 2 * r) / 4 - Math.PI / 4
          const x = 600 + Math.cos(a) * 220
          const y = 280 + Math.sin(a) * 160
          return (
            <g key={r}>
              <circle cx={x} cy={y} r="46" fill="#fff" stroke={R[r]} strokeWidth="4" />
              <text x={x} y={y + 6} textAnchor="middle" fill={ink} fontSize="18" fontWeight="900">R{r}</text>
            </g>
          )
        })}
        <circle cx="600" cy="280" r="36" fill="#0f172a" />
        <text x="600" y="286" textAnchor="middle" fill="#fff" fontSize="18" fontWeight="900">all</text>
        <text x="600" y="520" textAnchor="middle" fill={ink} fontSize="20" fontWeight="850">every rank calls · every rank participates</text>
      </svg>
    </Scene>
  )
}

export function InputBroadcast() {
  return (
    <Scene label="Keyboard into Rank 0, then a, b, n copy to the communicator" tone="io">
      <svg viewBox="0 0 1200 560">
        <rect x="40" y="40" width="240" height="90" rx="14" fill="#0f172a" />
        <text x="160" y="95" textAnchor="middle" fill="#fbbf24" fontSize="22" fontWeight="900">keyboard</text>
        <path d="M280 85 H430" stroke="#2563eb" strokeWidth="4" />
        <rect x="430" y="30" width="340" height="120" rx="18" fill="#2563eb" />
        <text x="600" y="80" textAnchor="middle" fill="#fff" fontSize="24" fontWeight="900">Rank 0 reads a, b, n</text>
        <text x="600" y="118" textAnchor="middle" fill="#dbeafe" fontSize="18">then MPI_Bcast</text>
        {[0, 1, 2, 3].map((r) => (
          <g key={r}>
            <path d={`M600 150 L${150 + r * 300} 280`} stroke={R[r]} strokeWidth="3" />
            <rect x={40 + r * 300} y="280" width="220" height="180" rx="16" fill="#fff" stroke={R[r]} strokeWidth="4" />
            <text x={150 + r * 300} y="350" textAnchor="middle" fill={ink} fontSize="20" fontWeight="900">Rank {r}</text>
            <text x={150 + r * 300} y="400" textAnchor="middle" fill={R[r]} fontSize="22" fontWeight="900">a, b, n</text>
          </g>
        ))}
      </svg>
    </Scene>
  )
}

export function GroupCall() {
  return (
    <Scene label="Four ranks invoke the same collective at once" tone="coll">
      <svg viewBox="0 0 1200 560">
        <rect x="80" y="40" width="1040" height="70" rx="14" fill="#0f172a" />
        <text x="600" y="86" textAnchor="middle" fill="#fbbf24" fontSize="24" fontWeight="900">MPI_Bcast / Scatter / Gather / Reduce / Allreduce / Barrier</text>
        {[0, 1, 2, 3].map((r) => (
          <g key={r}>
            <rect x={70 + r * 280} y="180" width="240" height="260" rx="18" fill="#fff" stroke={R[r]} strokeWidth="4" />
            <text x={190 + r * 280} y="250" textAnchor="middle" fill={ink} fontSize="22" fontWeight="900">Rank {r}</text>
            <text x={190 + r * 280} y="310" textAnchor="middle" fill={R[r]} fontSize="18" fontWeight="800">same call</text>
            <text x={190 + r * 280} y="360" textAnchor="middle" fill={mute} fontSize="18">same communicator</text>
          </g>
        ))}
        <text x="600" y="500" textAnchor="middle" fill={ink} fontSize="18" fontWeight="850">a collective is a group contract, not a pairwise accident</text>
      </svg>
    </Scene>
  )
}

export function ClusterScale() {
  return (
    <Scene label="MPI scales by adding machines rather than sharing one RAM" tone="net">
      <svg viewBox="0 0 1200 560">
        {Array.from({ length: 12 }).map((_, i) => {
          const col = i % 6
          const row = Math.floor(i / 6)
          const x = 80 + col * 190
          const y = 70 + row * 210
          const on = i < 8
          return (
            <g key={i} opacity={on ? 1 : 0.35}>
              <rect x={x} y={y} width="160" height="150" rx="14" fill="#fff" stroke={on ? R[i % 4] : '#cbd5e1'} strokeWidth="3" />
              <text x={x + 80} y={y + 70} textAnchor="middle" fill={ink} fontSize="18" fontWeight="900">{on ? `node ${i}` : 'add'}</text>
              <text x={x + 80} y={y + 104} textAnchor="middle" fill={on ? R[i % 4] : mute} fontSize="18" fontWeight="800">{on ? 'private RAM' : 'more machines'}</text>
            </g>
          )
        })}
      </svg>
    </Scene>
  )
}

export function ConvergeIO() {
  return (
    <Scene label="Four terminals converge into one root console" tone="io">
      <svg viewBox="0 0 1200 560">
        {[0, 1, 2, 3].map((r) => (
          <g key={r}>
            <rect x="40" y={30 + r * 120} width="280" height="90" rx="12" fill="#0f172a" stroke={R[r]} strokeWidth="3" />
            <text x="180" y={82 + r * 120} textAnchor="middle" fill="#86efac" fontSize="18" fontWeight="800">Rank {r} print</text>
            <path d={`M320 ${75 + r * 120} C 520 ${75 + r * 120}, 520 280, 640 280`} fill="none" stroke={R[r]} strokeWidth="3" />
          </g>
        ))}
        <rect x="640" y="160" width="500" height="240" rx="20" fill="#0f172a" stroke="#2563eb" strokeWidth="4" />
        <text x="890" y="250" textAnchor="middle" fill="#fff" fontSize="24" fontWeight="900">Rank 0 console</text>
        <text x="890" y="310" textAnchor="middle" fill="#86efac" fontSize="18">one readable stream</text>
      </svg>
    </Scene>
  )
}

export function KeywordRibbon() {
  const words = ['MPI_Init', 'rank', 'size', 'Send', 'Recv', 'tag', 'Bcast', 'Reduce', 'vector', 'Wtime']
  return (
    <Scene label="Revision keywords as a single flowing ribbon" tone="sum">
      <svg viewBox="0 0 1200 560">
        <path d="M60 280 C 240 80, 480 80, 600 280 S 960 480, 1140 280" fill="none" stroke="#cbd5e1" strokeWidth="6" />
        {words.map((w, i) => {
          const x = 80 + i * 110
          const y = i % 2 === 0 ? 200 : 360
          return (
            <g key={w}>
              <rect x={x} y={y} width="100" height="54" rx="12" fill={R[i % 4]} />
              <text x={x + 50} y={y + 34} textAnchor="middle" fill="#fff" fontSize="18" fontWeight="900">{w}</text>
            </g>
          )
        })}
        <text x="600" y="520" textAnchor="middle" fill={ink} fontSize="20" fontWeight="850">if you can draw it, you can write the ten-mark answer</text>
      </svg>
    </Scene>
  )
}

