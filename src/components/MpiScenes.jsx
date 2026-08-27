/**
 * MpiScenes — Module 3 teaching visuals.
 * Recurring four-process system: Rank 0–3, private memory, explicit messages.
 * Concept-native motion families, not generic fade cards.
 */
import '../mpiScenes.css'

const TONES = ['r0', 'r1', 'r2', 'r3']

export function RankStrip({ values = ['—', '—', '—', '—'], memLabel = 'private memory', highlight }) {
  return (
    <div className="mpi-ranks" aria-hidden="false">
      {[0, 1, 2, 3].map((rank) => (
        <article key={rank} className={`mpi-rank ${TONES[rank]} ${highlight === rank ? 'lit' : ''}`} style={{ '--i': rank }}>
          <span className="rk">Rank {rank}</span>
          <span className="cpu">CPU</span>
          <div className="mem">{values[rank]}</div>
          <span className="priv">{memLabel}</span>
        </article>
      ))}
    </div>
  )
}

export function OpeningCluster({ variant }) {
  // ---- variant: module synthesis — the whole journey as one chain ---------
  if (variant === 'synthesis') {
    const nodes = [
      ['private memory', '#2563eb'],
      ['ranks', '#0ea5a4'],
      ['messages', '#f59e0b'],
      ['collectives', '#7c3aed'],
      ['datatypes', '#4f46e5'],
      ['performance', '#e11d48'],
      ['sorting', '#059669'],
    ]
    return (
      <div className="mpi-scene" aria-label="The Module 3 journey from private memory to distributed algorithms">
        <svg viewBox="0 0 1200 560">
          <path d="M120 150 C 300 60, 900 60, 1080 150 S 900 300, 600 300 S 200 380, 1080 440"
            fill="none" stroke="#cbd5e1" strokeWidth="3" strokeDasharray="2 10" strokeLinecap="round" />
          {nodes.map(([t, c], i) => {
            const cols = 4
            const col = i % cols
            const row = Math.floor(i / cols)
            const x = 160 + col * 300
            const y = 160 + row * 210
            return (
              <g key={t}>
                {i < nodes.length - 1 && (() => {
                  const ncol = (i + 1) % cols
                  const nrow = Math.floor((i + 1) / cols)
                  const nx = 160 + ncol * 300
                  const ny = 160 + nrow * 210
                  return <path d={`M${x} ${y} L${nx} ${ny}`} stroke={c} strokeWidth="3" markerEnd="url(#synA)" opacity="0.7" />
                })()}
                <circle cx={x} cy={y} r="74" fill="#fff" stroke={c} strokeWidth="4" />
                <text x={x} y={y - 4} textAnchor="middle" fill="#172033" fontSize="18" fontWeight="900">{String(i + 1)}</text>
                <text x={x} y={y + 22} textAnchor="middle" fill={c} fontSize="18" fontWeight="800">{t}</text>
              </g>
            )
          })}
          <defs><marker id="synA" markerWidth="12" markerHeight="12" refX="8" refY="6" orient="auto"><path d="M0 0 L10 6 L0 12 z" fill="#94a3b8" /></marker></defs>
          <text x="600" y="520" textAnchor="middle" fill="#172033" fontSize="20" fontWeight="850">private memory + messages = one distributed machine</text>
        </svg>
      </div>
    )
  }

  return (
    <div className="mpi-scene" aria-label="Four compute nodes with private memory. Rank 0 sends a message to Rank 1.">
      <span className="mpi-world-label">no shared memory</span>
      <svg viewBox="0 0 1200 560" role="img">
        <defs>
          <linearGradient id="pkt" x1="0" x2="1">
            <stop offset="0" stopColor="#fbbf24" />
            <stop offset="1" stopColor="#f59e0b" />
          </linearGradient>
          <path id="p01" d="M318 204 C 338 56, 408 56, 424 198" fill="none" />
          <path id="p02" d="M195 498 C 420 548, 820 548, 980 366" fill="none" />
          <path id="p13" d="M680 258 C 780 258, 880 258, 894 258" fill="none" />
        </defs>
        {[
          [70, 120, 0, '#2563eb', 1],
          [430, 90, 1, '#0ea5a4', 0.92],
          [70, 330, 2, '#7c3aed', 0.88],
          [430, 350, 3, '#d97706', 0.95],
        ].map(([x, y, r, c, s]) => (
          <g key={r} transform={`translate(${x} ${y}) scale(${s})`}>
            <rect width="250" height="168" rx="22" fill="#fff" stroke={c} strokeWidth="4" />
            <circle cx="46" cy="44" r="28" fill="#172033" />
            <text x="46" y="50" textAnchor="middle" fill="#fff" fontSize="18" fontWeight="800">CPU</text>
            <text x="88" y="50" fill="#172033" fontSize="24" fontWeight="900">Rank {r}</text>
            <rect x="20" y="76" width="210" height="52" rx="10" fill="#f1f5f9" />
            <text x="125" y="108" textAnchor="middle" fill="#475569" fontSize="18" fontWeight="800">PRIVATE MEMORY</text>
            <text x="125" y="148" textAnchor="middle" fill={c} fontSize="18" fontWeight="800">local data only</text>
          </g>
        ))}
        <text x="980" y="80" fill="#172033" fontSize="22" fontWeight="900">MPI fabric</text>
        <g>
          <circle cx="980" cy="280" r="86" fill="none" stroke="#93c5fd" strokeWidth="3" strokeDasharray="8 7" />
          <text x="980" y="272" textAnchor="middle" fill="#2563eb" fontSize="20" fontWeight="900">messages</text>
          <text x="980" y="300" textAnchor="middle" fill="#64748b" fontSize="18">not shared RAM</text>
        </g>
        <use href="#p01" stroke="#f59e0b" strokeWidth="4" fill="none" />
        <circle r="11" fill="url(#pkt)">
          <animateMotion dur="2.4s" repeatCount="indefinite">
            <mpath href="#p01" />
          </animateMotion>
        </circle>
        <use href="#p02" stroke="#c4b5fd" strokeWidth="2.5" fill="none" opacity="0.7" />
        <use href="#p13" stroke="#99f6e4" strokeWidth="2.5" fill="none" opacity="0.7" />
        <circle r="8" fill="#7c3aed" opacity="0.85">
          <animateMotion dur="3.2s" begin="0.6s" repeatCount="indefinite">
            <mpath href="#p02" />
          </animateMotion>
        </circle>
      </svg>
    </div>
  )
}

export function SharedVsDistributed() {
  return (
    <div className="mpi-scene" aria-label="Shared memory versus distributed memory">
      <svg viewBox="0 0 1200 560">
        <text x="280" y="48" textAnchor="middle" fill="#172033" fontSize="24" fontWeight="900">Shared memory</text>
        <rect x="70" y="80" width="420" height="90" rx="12" fill="#dbeafe" stroke="#2563eb" strokeWidth="3" />
        <text x="280" y="134" textAnchor="middle" fill="#1e3a8a" fontSize="22" fontWeight="900">ONE shared region</text>
        {[0, 1, 2].map((i) => (
          <g key={i}>
            <rect x={90 + i * 130} y="220" width="110" height="70" rx="10" fill="#fff" stroke="#2563eb" strokeWidth="2" />
            <text x={145 + i * 130} y="262" textAnchor="middle" fill="#172033" fontSize="20" fontWeight="800">P{i}</text>
            <path d={`M${145 + i * 130} 220 V170`} stroke="#2563eb" strokeWidth="3" />
          </g>
        ))}
        <text x="280" y="340" textAnchor="middle" fill="#475569" fontSize="18">all threads see the same variables</text>

        <line x1="600" y1="70" x2="600" y2="500" stroke="#cbd5e1" strokeWidth="2" />

        <text x="900" y="48" textAnchor="middle" fill="#172033" fontSize="24" fontWeight="900">Distributed memory</text>
        {[
          [640, 0, '#2563eb'],
          [790, 1, '#0ea5a4'],
          [940, 2, '#7c3aed'],
          [1090, 3, '#d97706'],
        ].map(([x, r, c], i) => (
          <g key={r}>
            <rect x={x - 70} y="90" width="128" height="86" rx="10" fill="#fff" stroke={c} strokeWidth="3" />
            <text x={x} y="126" textAnchor="middle" fill="#172033" fontSize="18" fontWeight="900">Process {r}</text>
            <text x={x} y="154" textAnchor="middle" fill={c} fontSize="18" fontWeight="800">Memory {r}</text>
            {i < 3 && <path d={`M${x + 64} 133 H${x + 80}`} stroke="#94a3b8" strokeWidth="2" strokeDasharray="4 4" />}
          </g>
        ))}
        <rect x="700" y="230" width="400" height="54" rx="27" fill="#0f172a" />
        <text x="900" y="264" textAnchor="middle" fill="#fbbf24" fontSize="20" fontWeight="900">NETWORK / interconnect</text>
        <text x="900" y="330" textAnchor="middle" fill="#dc2626" fontSize="22" fontWeight="900">No shared variables</text>
        <text x="900" y="368" textAnchor="middle" fill="#475569" fontSize="18">Rank 0 cannot read Memory 3</text>
        <rect x="660" y="410" width="480" height="88" rx="14" fill="#eff6ff" stroke="#2563eb" strokeWidth="2" />
        <text x="900" y="448" textAnchor="middle" fill="#1e3a8a" fontSize="22" fontWeight="900">How does Rank 0 send a value to Rank 3?</text>
        <text x="900" y="480" textAnchor="middle" fill="#2563eb" fontSize="18" fontWeight="800">MPI answers with an explicit message</text>
      </svg>
    </div>
  )
}

export function DemandStats() {
  const items = [
    ['1.5 billion', 'active users', 'social platforms', '#2563eb', 130],
    ['1 trillion+', 'searches / year', 'web search', '#7c3aed', 280],
    ['48 hours', 'video / minute', 'video streaming', '#d97706', 430],
  ]
  return (
    <div className="mpi-scene" aria-label="Massive request streams flow into distributed infrastructure">
      <svg viewBox="0 0 1200 560">
        <text x="150" y="52" textAnchor="middle" fill="#172033" fontSize="20" fontWeight="900">the demand</text>
        {items.map(([num, unit, note, c, y]) => (
          <g key={num}>
            <text x="60" y={y} fill={c} fontSize="46" fontWeight="900">{num}</text>
            <text x="62" y={y + 32} fill="#475569" fontSize="18" fontWeight="750">{unit} · {note}</text>
            <path d={`M470 ${y - 14} C 600 ${y - 14}, 660 290, 800 290`} fill="none" stroke={c} strokeWidth="3" opacity="0.8" />
            <circle r="7" fill={c}>
              <animateMotion dur={`${2.2 + y / 400}s`} repeatCount="indefinite" path={`M470 ${y - 14} C 600 ${y - 14}, 660 290, 800 290`} />
            </circle>
          </g>
        ))}
        <rect x="800" y="170" width="340" height="250" rx="20" fill="#0f172a" />
        <text x="970" y="210" textAnchor="middle" fill="#fff" fontSize="22" fontWeight="900">distributed infrastructure</text>
        {Array.from({ length: 9 }).map((_, i) => (
          <rect key={i} x={840 + (i % 3) * 100} y={240 + Math.floor(i / 3) * 56} width="80" height="42" rx="8" fill="#1e293b" stroke="#334155" strokeWidth="1.5" />
        ))}
        {Array.from({ length: 9 }).map((_, i) => (
          <circle key={i} cx={852 + (i % 3) * 100} cy={261 + Math.floor(i / 3) * 56} r="5" fill="#22c55e">
            <animate attributeName="opacity" values="0.3;1;0.3" dur="1.4s" begin={`${i * 0.12}s`} repeatCount="indefinite" />
          </circle>
        ))}
        <text x="600" y="530" textAnchor="middle" fill="#172033" fontSize="20" fontWeight="850">no single machine can serve this — the work is spread out</text>
      </svg>
    </div>
  )
}

export function ArraySumScene({ variant }) {
  // ---- variant: split -> compute -> combine (three-stage flow) ------------
  if (variant === 'pipeline') {
    return (
      <div className="mpi-scene" aria-label="Split the work, compute in parallel, combine the results">
        <svg viewBox="0 0 1200 560">
          <g>
            <text x="200" y="70" textAnchor="middle" fill="#2563eb" fontSize="24" fontWeight="900">SPLIT</text>
            <rect x="70" y="110" width="260" height="120" rx="14" fill="#eff6ff" stroke="#2563eb" strokeWidth="3" />
            <text x="200" y="160" textAnchor="middle" fill="#172033" fontSize="18" fontWeight="800">one big problem</text>
            <text x="200" y="196" textAnchor="middle" fill="#2563eb" fontSize="18" fontWeight="800">→ four pieces</text>
          </g>
          <path d="M330 170 H430" stroke="#94a3b8" strokeWidth="4" markerEnd="url(#asf)" />
          <g>
            <text x="600" y="70" textAnchor="middle" fill="#7c3aed" fontSize="24" fontWeight="900">COMPUTE</text>
            {[0, 1, 2, 3].map((r) => (
              <g key={r}>
                <rect x="470" y={100 + r * 62} width="260" height="50" rx="10" fill="#fff" stroke={['#2563eb', '#0ea5a4', '#7c3aed', '#d97706'][r]} strokeWidth="3" />
                <text x="510" y={131 + r * 62} fill="#172033" fontSize="18" fontWeight="800">Rank {r}</text>
                <text x="700" y={131 + r * 62} textAnchor="end" fill="#475569" fontSize="18" fontWeight="750">local result</text>
              </g>
            ))}
          </g>
          <path d="M730 240 H830" stroke="#94a3b8" strokeWidth="4" markerEnd="url(#asf)" />
          <defs><marker id="asf" markerWidth="12" markerHeight="12" refX="8" refY="6" orient="auto"><path d="M0 0 L10 6 L0 12 z" fill="#94a3b8" /></marker></defs>
          <g>
            <text x="1000" y="70" textAnchor="middle" fill="#059669" fontSize="24" fontWeight="900">COMBINE</text>
            <rect x="870" y="150" width="260" height="180" rx="14" fill="#0f172a" />
            <text x="1000" y="230" textAnchor="middle" fill="#fbbf24" fontSize="20" fontWeight="900">one answer</text>
            <text x="1000" y="270" textAnchor="middle" fill="#94a3b8" fontSize="18">reduce / gather</text>
          </g>
          <text x="600" y="440" textAnchor="middle" fill="#172033" fontSize="22" fontWeight="850">the pattern behind almost every MPI program</text>
        </svg>
      </div>
    )
  }

  return (
    <div className="mpi-scene" aria-label="Array partitioned across three processes by modulo">
      <svg viewBox="0 0 1200 560">
        <text x="600" y="42" textAnchor="middle" fill="#172033" fontSize="22" fontWeight="900">a = [1, 2, 3, 4, 5, 6]  ·  scale this idea to n elements</text>
        <text x="600" y="78" textAnchor="middle" fill="#475569" fontSize="18">serial sum takes time x · three parallel partial sums take about x/3</text>
        {[
          ['a1  modulo 0', '1, 4', '#2563eb', 140],
          ['a2  modulo 1', '2, 5', '#0ea5a4', 500],
          ['a3  modulo 2', '3, 6', '#7c3aed', 860],
        ].map(([t, v, c, x]) => (
          <g key={t}>
            <rect x={x} y="120" width="220" height="150" rx="14" fill="#fff" stroke={c} strokeWidth="3" />
            <text x={x + 110} y="168" textAnchor="middle" fill="#172033" fontSize="20" fontWeight="900">{t}</text>
            <text x={x + 110} y="214" textAnchor="middle" fill={c} fontSize="26" fontWeight="900">{v}</text>
          </g>
        ))}
        {[140, 500, 860].map((x) => (
          <path key={x} d={`M${x + 110} 270 V330`} stroke="#94a3b8" strokeWidth="3" />
        ))}
        <rect x="140" y="330" width="220" height="70" rx="12" fill="#eff6ff" />
        <rect x="500" y="330" width="220" height="70" rx="12" fill="#ecfeff" />
        <rect x="860" y="330" width="220" height="70" rx="12" fill="#f5f3ff" />
        <text x="250" y="374" textAnchor="middle" fill="#172033" fontSize="20" fontWeight="800">local sum</text>
        <text x="610" y="374" textAnchor="middle" fill="#172033" fontSize="20" fontWeight="800">local sum</text>
        <text x="970" y="374" textAnchor="middle" fill="#172033" fontSize="20" fontWeight="800">local sum</text>
        <path d="M250 400 L600 450 L970 400" fill="none" stroke="#2563eb" strokeWidth="3" />
        <rect x="430" y="450" width="340" height="70" rx="14" fill="#172033" />
        <text x="600" y="494" textAnchor="middle" fill="#fbbf24" fontSize="22" fontWeight="900">main process combines → final sum</text>
      </svg>
    </div>
  )
}

export function SpmdLaunch({ variant }) {
  // ---- variant: one source, branch on rank --------------------------------
  if (variant === 'branch') {
    return (
      <div className="mpi-scene" aria-label="One program branches on rank to do different work">
        <svg viewBox="0 0 1200 560">
          <rect x="360" y="30" width="480" height="150" rx="14" fill="#0f172a" />
          <text x="390" y="70" fill="#7dd3fc" fontSize="19" fontWeight="800" fontFamily="ui-monospace, monospace">if (my_rank == 0)</text>
          <text x="420" y="100" fill="#e2e8f0" fontSize="18" fontFamily="ui-monospace, monospace">read input, send work;</text>
          <text x="390" y="130" fill="#7dd3fc" fontSize="19" fontWeight="800" fontFamily="ui-monospace, monospace">else</text>
          <text x="420" y="160" fill="#e2e8f0" fontSize="18" fontFamily="ui-monospace, monospace">receive, compute, reply;</text>
          <text x="600" y="210" textAnchor="middle" fill="#475569" fontSize="18">the SAME source runs on every rank</text>
          {[0, 1, 2, 3].map((i) => {
            const c = ['#2563eb', '#0ea5a4', '#7c3aed', '#d97706'][i]
            const role = i === 0 ? 'reads input, coordinates' : 'computes its slice'
            return (
              <g key={i}>
                <path d={`M600 210 L${170 + i * 300} 300`} stroke={c} strokeWidth="3" />
                <rect x={70 + i * 300} y="300" width="200" height="150" rx="14" fill="#fff" stroke={c} strokeWidth="3" />
                <text x={170 + i * 300} y="345" textAnchor="middle" fill="#172033" fontSize="22" fontWeight="900">Rank {i}</text>
                <text x={170 + i * 300} y="382" textAnchor="middle" fill={c} fontSize="18" fontWeight="800">{i === 0 ? 'branch TRUE' : 'branch FALSE'}</text>
                <text x={170 + i * 300} y="418" textAnchor="middle" fill="#475569" fontSize="18">{role}</text>
              </g>
            )
          })}
          <text x="600" y="500" textAnchor="middle" fill="#172033" fontSize="20" fontWeight="850">SPMD: one program text, rank-dependent behaviour</text>
        </svg>
      </div>
    )
  }

  return (
    <div className="mpi-scene" aria-label="One executable launched four times as SPMD">
      <svg viewBox="0 0 1200 560">
        <rect x="390" y="24" width="420" height="70" rx="14" fill="#172033" />
        <text x="600" y="68" textAnchor="middle" fill="#fff" fontSize="24" fontWeight="900">parallel_program</text>
        <text x="600" y="118" textAnchor="middle" fill="#475569" fontSize="18">ONE executable · launched four times</text>
        {['#2563eb', '#0ea5a4', '#7c3aed', '#d97706'].map((c, i) => (
          <g key={i}>
            <path d={`M600 96 L${150 + i * 300} 170`} stroke={c} strokeWidth="3" />
            <rect x={70 + i * 300} y="170" width="160" height="250" rx="14" fill="#fff" stroke={c} strokeWidth="3" />
            <text x={150 + i * 300} y="220" textAnchor="middle" fill="#172033" fontSize="22" fontWeight="900">Rank {i}</text>
            <text x={150 + i * 300} y="262" textAnchor="middle" fill="#64748b" fontSize="18">same program</text>
            <text x={150 + i * 300} y="310" textAnchor="middle" fill={c} fontSize="20" fontWeight="900">different rank</text>
            <text x={150 + i * 300} y="360" textAnchor="middle" fill="#172033" fontSize="18">local data {i}</text>
          </g>
        ))}
        <text x="600" y="480" textAnchor="middle" fill="#172033" fontSize="22" fontWeight="800">SPMD — Single Program, Multiple Data</text>
        <text x="600" y="518" textAnchor="middle" fill="#475569" fontSize="18">branch on rank when a process must do unique work</text>
      </svg>
    </div>
  )
}

export function RankDiscovery({ variant }) {
  // ---- variant: size (same for all) versus rank (unique per process) ------
  if (variant === 'sizevsrank') {
    const cols = ['#2563eb', '#0ea5a4', '#7c3aed', '#d97706']
    return (
      <div className="mpi-scene" aria-label="MPI_Comm_size returns the same value everywhere, MPI_Comm_rank returns a unique value">
        <svg viewBox="0 0 1200 560">
          <text x="300" y="52" textAnchor="middle" fill="#172033" fontSize="24" fontWeight="900">MPI_Comm_size</text>
          <text x="300" y="82" textAnchor="middle" fill="#475569" fontSize="18">same answer on every rank</text>
          {[0, 1, 2, 3].map((r) => (
            <g key={r}>
              <rect x="90" y={110 + r * 90} width="420" height="72" rx="12" fill="#eff6ff" stroke="#2563eb" strokeWidth="2" />
              <text x="130" y={153 + r * 90} fill="#64748b" fontSize="18" fontWeight="800">rank {r}</text>
              <text x="470" y={153 + r * 90} textAnchor="end" fill="#1e3a8a" fontSize="26" fontWeight="900">comm_sz = 4</text>
            </g>
          ))}
          <line x1="600" y1="90" x2="600" y2="500" stroke="#cbd5e1" strokeWidth="2" />
          <text x="900" y="52" textAnchor="middle" fill="#172033" fontSize="24" fontWeight="900">MPI_Comm_rank</text>
          <text x="900" y="82" textAnchor="middle" fill="#475569" fontSize="18">a different answer on every rank</text>
          {[0, 1, 2, 3].map((r) => (
            <g key={r}>
              <rect x="690" y={110 + r * 90} width="420" height="72" rx="12" fill="#fff" stroke={cols[r]} strokeWidth="3" />
              <text x="730" y={153 + r * 90} fill="#64748b" fontSize="18" fontWeight="800">rank {r}</text>
              <text x="1070" y={153 + r * 90} textAnchor="end" fill={cols[r]} fontSize="26" fontWeight="900">my_rank = {r}</text>
            </g>
          ))}
          <text x="600" y="535" textAnchor="middle" fill="#172033" fontSize="19" fontWeight="850">how many of us · versus · which one am I</text>
        </svg>
      </div>
    )
  }

  return (
    <div className="mpi-scene" aria-label="Four processes discover rank and communicator size">
      <svg viewBox="0 0 1200 560">
        <text x="600" y="46" textAnchor="middle" fill="#2563eb" fontSize="22" fontWeight="900">comm_sz = 4</text>
        {[0, 1, 2, 3].map((r) => (
          <g key={r}>
            <rect x={70 + r * 280} y="90" width="240" height="320" rx="16" fill="#fff" stroke={['#2563eb', '#0ea5a4', '#7c3aed', '#d97706'][r]} strokeWidth="3">
              <animate attributeName="opacity" values="0.35;1;1" dur="0.8s" begin={`${r * 0.28}s`} fill="freeze" />
            </rect>
            <text x={190 + r * 280} y="160" textAnchor="middle" fill="#172033" fontSize="22" fontWeight="800">process</text>
            <text x={190 + r * 280} y="250" textAnchor="middle" fill={['#2563eb', '#0ea5a4', '#7c3aed', '#d97706'][r]} fontSize="42" fontWeight="900">
              my_rank = {r}
            </text>
            <text x={190 + r * 280} y="330" textAnchor="middle" fill="#64748b" fontSize="18">MPI_Comm_rank</text>
          </g>
        ))}
        <text x="600" y="470" textAnchor="middle" fill="#172033" fontSize="20" fontWeight="800">Each process asks: who am I, and how many of us are there?</text>
        <text x="600" y="508" textAnchor="middle" fill="#475569" fontSize="18">Rank 0 is commonly used as root for I/O and reductions</text>
      </svg>
    </div>
  )
}

export function CommunicatorWorld({ subgroup = false }) {
  return (
    <div className="mpi-scene" aria-label="MPI_COMM_WORLD surrounding four processes">
      <svg viewBox="0 0 1200 560">
        <rect x="80" y="70" width="1040" height="400" rx="28" fill="none" stroke="#2563eb" strokeWidth="4" strokeDasharray="10 8" />
        <rect x="430" y="40" width="340" height="44" rx="22" fill="#2563eb" />
        <text x="600" y="70" textAnchor="middle" fill="#fff" fontSize="20" fontWeight="900">MPI_COMM_WORLD</text>
        {[0, 1, 2, 3].map((r) => (
          <g key={r}>
            <circle cx={220 + r * 250} cy="270" r="78" fill="#fff" stroke={['#2563eb', '#0ea5a4', '#7c3aed', '#d97706'][r]} strokeWidth="4" />
            <text x={220 + r * 250} y="264" textAnchor="middle" fill="#172033" fontSize="22" fontWeight="900">Rank {r}</text>
            <text x={220 + r * 250} y="294" textAnchor="middle" fill="#64748b" fontSize="18">in this group</text>
          </g>
        ))}
        {subgroup && (
          <>
            <rect x="430" y="360" width="340" height="90" rx="16" fill="none" stroke="#7c3aed" strokeWidth="3" />
            <text x="600" y="412" textAnchor="middle" fill="#5b21b6" fontSize="18" fontWeight="800">optional subgroup communicator</text>
          </>
        )}
        <text x="600" y="510" textAnchor="middle" fill="#172033" fontSize="20" fontWeight="800">
          A communicator is the group of processes allowed to talk in this context
        </text>
      </svg>
    </div>
  )
}

export function LifecycleScene({ variant }) {
  // ---- variant: vertical lifecycle rail -----------------------------------
  if (variant === 'vertical') {
    const rail = [
      ['program start', '#94a3b8', false],
      ['MPI_Init(&argc, &argv)', '#2563eb', true],
      ['MPI_Comm_size → comm_sz', '#0ea5a4', true],
      ['MPI_Comm_rank → my_rank', '#0ea5a4', true],
      ['parallel work', '#7c3aed', true],
      ['MPI_Finalize()', '#d97706', true],
      ['program end', '#94a3b8', false],
    ]
    return (
      <div className="mpi-scene" aria-label="Vertical MPI program lifecycle">
        <svg viewBox="0 0 1200 560">
          <line x1="96" y1="30" x2="96" y2="530" stroke="#cbd5e1" strokeWidth="3" />
          {rail.map(([t, c, call], i) => {
            const y = 55 + i * 75
            return (
              <g key={t}>
                <circle cx="96" cy={y} r="11" fill={c} />
                <rect x={call ? 150 : 210} y={y - 26} width={call ? 980 : 860} height="52" rx={call ? 12 : 26}
                  fill={call ? '#fff' : '#f1f5f9'} stroke={c} strokeWidth={call ? 3 : 2} />
                <text x="640" y={y + 7} textAnchor="middle" fill="#172033" fontSize={call ? 22 : 18} fontWeight={call ? 900 : 800}
                  fontFamily={call ? 'ui-monospace, monospace' : 'inherit'}>{t}</text>
                {i < rail.length - 1 && <path d={`M96 ${y + 14} V ${y + 61}`} stroke="#94a3b8" strokeWidth="3" markerEnd="url(#lcv)" />}
              </g>
            )
          })}
          <defs><marker id="lcv" markerWidth="12" markerHeight="12" refX="6" refY="9" orient="auto"><path d="M0 0 L12 0 L6 10 z" fill="#94a3b8" /></marker></defs>
        </svg>
      </div>
    )
  }

  // ---- variant: MPI_Init bootstrap sequence -------------------------------
  if (variant === 'bootstrap') {
    const stages = [
      ['program launch', 'mpiexec -n 4', '#2563eb'],
      ['MPI runtime bootstrap', 'MPI_Init(NULL, NULL)', '#7c3aed'],
      ['environment ready', 'ranks + communicator live', '#059669'],
    ]
    return (
      <div className="mpi-scene" aria-label="MPI_Init bootstraps the parallel environment">
        <svg viewBox="0 0 1200 560">
          <text x="600" y="90" textAnchor="middle" fill="#172033" fontSize="24" fontWeight="900">MPI_Init builds the parallel environment before any work</text>
          {stages.map(([t, sub, c], i) => (
            <g key={t}>
              <rect x={70 + i * 390} y="200" width="340" height="170" rx="18" fill="#fff" stroke={c} strokeWidth="4" />
              <circle cx={100 + i * 390} cy="230" r="16" fill={c} />
              <text x={100 + i * 390} y="237" textAnchor="middle" fill="#fff" fontSize="18" fontWeight="900">{i + 1}</text>
              <text x={240 + i * 390} y="280" textAnchor="middle" fill="#172033" fontSize="22" fontWeight="900">{t}</text>
              <text x={240 + i * 390} y="325" textAnchor="middle" fill={c} fontSize="18" fontWeight="800" fontFamily="ui-monospace, monospace">{sub}</text>
              {i < 2 && <path d={`M${410 + i * 390} 285 H${460 + i * 390}`} stroke="#94a3b8" strokeWidth="4" markerEnd="url(#bsA)" />}
            </g>
          ))}
          <defs><marker id="bsA" markerWidth="12" markerHeight="12" refX="8" refY="6" orient="auto"><path d="M0 0 L10 6 L0 12 z" fill="#94a3b8" /></marker></defs>
          <text x="600" y="460" textAnchor="middle" fill="#475569" fontSize="18" fontWeight="750">only after MPI_Init are MPI_Comm_rank and MPI_Comm_size valid</text>
        </svg>
      </div>
    )
  }

  const steps = ['MPI_Init', 'MPI_Comm_rank', 'MPI_Comm_size', 'parallel work', 'MPI_Finalize']
  return (
    <div className="mpi-scene" style={{ display: 'grid', alignContent: 'center', padding: 28, gap: 18 }}>
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
        {steps.map((s, i) => (
          <span key={s} className="mpi-chip" style={{ fontSize: 20, padding: '14px 18px', animationDelay: `${i * 0.12}s` }}>{s}</span>
        ))}
      </div>
      <p className="mpi-note" style={{ textAlign: 'center' }}>Initialize the library → learn identity → do work → shut down cleanly.</p>
    </div>
  )
}

export function MessagePacket({ value = 100, variant }) {
  // ---- variant: travel through the interconnect (message lane) ------------
  if (variant === 'travel') {
    return (
      <div className="mpi-scene" aria-label={`Value ${value} travels from Rank 0 through the interconnect to Rank 1`}>
        <svg viewBox="0 0 1200 560">
          <rect x="60" y="200" width="240" height="180" rx="16" fill="#fff" stroke="#2563eb" strokeWidth="4" />
          <text x="180" y="258" textAnchor="middle" fill="#172033" fontSize="26" fontWeight="900">Rank 0</text>
          <text x="180" y="306" textAnchor="middle" fill="#2563eb" fontSize="22" fontWeight="800">value = {value}</text>
          <text x="180" y="348" textAnchor="middle" fill="#64748b" fontSize="18">MPI_Send →</text>
          <rect x="900" y="200" width="240" height="180" rx="16" fill="#fff" stroke="#0ea5a4" strokeWidth="4" />
          <text x="1020" y="258" textAnchor="middle" fill="#172033" fontSize="26" fontWeight="900">Rank 1</text>
          <text x="1020" y="306" textAnchor="middle" fill="#0ea5a4" fontSize="22" fontWeight="800">value = {value}</text>
          <text x="1020" y="348" textAnchor="middle" fill="#64748b" fontSize="18">→ MPI_Recv</text>
          <rect x="440" y="230" width="320" height="120" rx="60" fill="#0f172a" />
          <text x="600" y="292" textAnchor="middle" fill="#fbbf24" fontSize="22" fontWeight="900">interconnect</text>
          <text x="600" y="322" textAnchor="middle" fill="#94a3b8" fontSize="18">network, not shared RAM</text>
          <path id="lane" d="M348 248 H852" stroke="#334155" strokeWidth="3" strokeDasharray="10 8" fill="none" />
          <g>
            <rect width="96" height="40" rx="10" x="-48" y="-20" fill="#fde68a" stroke="#d97706" strokeWidth="2" />
            <text y="6" textAnchor="middle" fill="#92400e" fontSize="20" fontWeight="900">{value}</text>
            <animateMotion dur="2.8s" repeatCount="indefinite" keyPoints="0;1" keyTimes="0;1" calcMode="linear">
              <mpath href="#lane" />
            </animateMotion>
          </g>
          <text x="600" y="470" textAnchor="middle" fill="#172033" fontSize="20" fontWeight="800">the value is copied — Rank 1 gets its own private {value}</text>
        </svg>
      </div>
    )
  }

  // ---- variant: sender close-up (buffer is the hero) ----------------------
  if (variant === 'send') {
    return (
      <div className="mpi-scene" aria-label="Sender view: value loads into a message and leaves Rank 0">
        <svg viewBox="0 0 1200 560">
          <rect x="70" y="70" width="620" height="420" rx="20" fill="#eff6ff" stroke="#2563eb" strokeWidth="3" />
          <text x="110" y="120" fill="#172033" fontSize="26" fontWeight="900">Rank 0 — sender</text>
          <text x="110" y="176" fill="#475569" fontSize="20" fontWeight="750">send buffer</text>
          {[0, 1, 2, 3].map((i) => (
            <g key={i}>
              <rect x={110 + i * 130} y="200" width="118" height="90" rx="10" fill="#fff" stroke={i === 0 ? '#d97706' : '#cbd5e1'} strokeWidth={i === 0 ? 4 : 2} />
              <text x={169 + i * 130} y="255" textAnchor="middle" fill={i === 0 ? '#b45309' : '#94a3b8'} fontSize="26" fontWeight="900">{i === 0 ? value : '·'}</text>
            </g>
          ))}
          <text x="110" y="360" fill="#1e3a8a" fontSize="20" fontWeight="850">MPI_Send(&buf, 1, MPI_INT,</text>
          <text x="150" y="392" fill="#1e3a8a" fontSize="20" fontWeight="850">dest, tag, MPI_COMM_WORLD)</text>
          <path id="sarc" d="M690 160 C 820 88, 860 88, 925 160" fill="none" />
          <g>
            <rect width="110" height="48" rx="12" x="-55" y="-24" fill="#fde68a" stroke="#d97706" strokeWidth="2" />
            <text y="8" textAnchor="middle" fill="#92400e" fontSize="20" fontWeight="900">{value}</text>
            <animateMotion dur="2.4s" repeatCount="indefinite">
              <mpath href="#sarc" />
            </animateMotion>
          </g>
          <rect x="980" y="180" width="150" height="130" rx="14" fill="#0f172a" />
          <text x="1055" y="235" textAnchor="middle" fill="#fbbf24" fontSize="18" fontWeight="900">to</text>
          <text x="1055" y="262" textAnchor="middle" fill="#fff" fontSize="18">network</text>
          <text x="600" y="530" textAnchor="middle" fill="#475569" fontSize="18" fontWeight="750">one element leaves the buffer, wrapped with its destination and tag</text>
        </svg>
      </div>
    )
  }

  // ---- variant: receiver close-up (matching conditions) -------------------
  if (variant === 'recv') {
    return (
      <div className="mpi-scene" aria-label="Receiver view: a matching message fills the receive buffer of Rank 1">
        <svg viewBox="0 0 1200 560">
          <rect x="70" y="180" width="150" height="130" rx="14" fill="#0f172a" />
          <text x="145" y="235" textAnchor="middle" fill="#94a3b8" fontSize="18">from</text>
          <text x="145" y="262" textAnchor="middle" fill="#fbbf24" fontSize="18" fontWeight="900">network</text>
          <path id="rarc" d="M280 245 C 360 245, 430 245, 500 245" fill="none" />
          <g>
            <rect width="110" height="48" rx="12" x="-55" y="-24" fill="#fde68a" stroke="#d97706" strokeWidth="2" />
            <text y="8" textAnchor="middle" fill="#92400e" fontSize="20" fontWeight="900">{value}</text>
            <animateMotion dur="2.4s" repeatCount="indefinite">
              <mpath href="#rarc" />
            </animateMotion>
          </g>
          <rect x="510" y="70" width="620" height="420" rx="20" fill="#ecfeff" stroke="#0ea5a4" strokeWidth="3" />
          <text x="550" y="120" fill="#172033" fontSize="26" fontWeight="900">Rank 1 — receiver</text>
          <text x="550" y="172" fill="#0f766e" fontSize="20" fontWeight="850">MPI_Recv accepts only if it matches:</text>
          {[['source = Rank 0', 210], ['tag = expected tag', 250]].map(([t, y]) => (
            <text key={t} x="570" y={y + 20} fill="#0f766e" fontSize="20" fontWeight="800">✓ {t}</text>
          ))}
          <text x="550" y="330" fill="#475569" fontSize="20" fontWeight="750">receive buffer</text>
          {[0, 1, 2, 3].map((i) => (
            <g key={i}>
              <rect x={570 + i * 130} y="360" width="118" height="90" rx="10" fill="#fff" stroke={i === 0 ? '#0ea5a4' : '#cbd5e1'} strokeWidth={i === 0 ? 4 : 2} />
              <text x={629 + i * 130} y="415" textAnchor="middle" fill={i === 0 ? '#0f766e' : '#cbd5e1'} fontSize="26" fontWeight="900">{i === 0 ? value : '·'}</text>
            </g>
          ))}
        </svg>
      </div>
    )
  }

  return (
    <div className="mpi-scene" aria-label={`Rank 0 sends ${value} to Rank 1`}>
      <svg viewBox="0 0 1200 560">
        <rect x="60" y="120" width="280" height="240" rx="16" fill="#fff" stroke="#2563eb" strokeWidth="3" />
        <text x="200" y="180" textAnchor="middle" fill="#172033" fontSize="24" fontWeight="900">Rank 0</text>
        <text x="200" y="230" textAnchor="middle" fill="#2563eb" fontSize="22">value = {value}</text>
        <text x="200" y="280" textAnchor="middle" fill="#64748b" fontSize="18">MPI_Send</text>
        <rect x="860" y="120" width="280" height="240" rx="16" fill="#fff" stroke="#0ea5a4" strokeWidth="3" />
        <text x="1000" y="180" textAnchor="middle" fill="#172033" fontSize="24" fontWeight="900">Rank 1</text>
        <text x="1000" y="230" textAnchor="middle" fill="#0ea5a4" fontSize="22">value = {value}</text>
        <text x="1000" y="280" textAnchor="middle" fill="#64748b" fontSize="18">MPI_Recv</text>
        <path id="msg" d="M340 88 H860" stroke="#f59e0b" strokeWidth="5" fill="none" />
        <g>
          <rect width="120" height="48" rx="12" x="-60" y="-24" fill="#fde68a" stroke="#d97706" strokeWidth="2" />
          <text y="8" textAnchor="middle" fill="#92400e" fontSize="20" fontWeight="900">{value}</text>
          <animateMotion dur="2.6s" repeatCount="indefinite">
            <mpath href="#msg" />
          </animateMotion>
        </g>
        <text x="600" y="48" textAnchor="middle" fill="#172033" fontSize="20" fontWeight="900">message packet</text>
        <g>
          {[['src 0', 80], ['dst 1', 250], ['count 1', 430], ['MPI_INT', 620], ['tag 0', 820], ['COMM_WORLD', 980]].map(([t, x]) => (
            <g key={t}>
              <rect x={x} y="420" width="150" height="46" rx="23" fill="#eff6ff" />
              <text x={x + 75} y="450" textAnchor="middle" fill="#1e3a8a" fontSize="18" fontWeight="800">{t}</text>
            </g>
          ))}
        </g>
        <text x="600" y="510" textAnchor="middle" fill="#475569" fontSize="18">source · destination · count · datatype · tag · communicator</text>
      </svg>
    </div>
  )
}

export function MatchingScene({ variant }) {
  // ---- variant: tags as logical channels between the same pair ------------
  if (variant === 'channels') {
    const chans = [
      ['tag 0', 'data', '#2563eb', 130],
      ['tag 1', 'control', '#0ea5a4', 250],
      ['tag 2', 'terminate', '#7c3aed', 370],
    ]
    return (
      <div className="mpi-scene" aria-label="The same pair of ranks uses tags as separate logical channels">
        <svg viewBox="0 0 1200 560">
          <rect x="60" y="180" width="220" height="200" rx="16" fill="#fff" stroke="#2563eb" strokeWidth="4" />
          <text x="170" y="270" textAnchor="middle" fill="#172033" fontSize="26" fontWeight="900">Rank 0</text>
          <text x="170" y="308" textAnchor="middle" fill="#64748b" fontSize="18">one sender</text>
          <rect x="920" y="180" width="220" height="200" rx="16" fill="#fff" stroke="#0ea5a4" strokeWidth="4" />
          <text x="1030" y="270" textAnchor="middle" fill="#172033" fontSize="26" fontWeight="900">Rank 1</text>
          <text x="1030" y="308" textAnchor="middle" fill="#64748b" fontSize="18">one receiver</text>
          {chans.map(([tag, label, c, y]) => (
            <g key={tag}>
              <path d={`M280 ${y} H500 M760 ${y} H920`} stroke={c} strokeWidth="6" opacity="0.85" />
              <rect x="508" y={y - 28} width="184" height="56" rx="28" fill="#fff" stroke={c} strokeWidth="3" />
              <text x="600" y={y + 8} textAnchor="middle" fill={c} fontSize="20" fontWeight="900">{tag}</text>
              <text x="360" y={y - 16} fill={c} fontSize="18" fontWeight="800">{label}</text>
              <circle r="9" fill={c}><animateMotion dur={`${2 + y / 260}s`} repeatCount="indefinite" path={`M280 ${y} H500`} /></circle>
              <circle r="9" fill={c}><animateMotion dur={`${2 + y / 260}s`} begin="0.9s" repeatCount="indefinite" path={`M760 ${y} H920`} /></circle>
            </g>
          ))}
          <text x="600" y="470" textAnchor="middle" fill="#172033" fontSize="20" fontWeight="850">same source and destination — the tag keeps the streams separate</text>
        </svg>
      </div>
    )
  }

  return (
    <div className="mpi-scene" aria-label="Only the message with matching source and tag is received">
      <svg viewBox="0 0 1200 560">
        <text x="200" y="70" textAnchor="middle" fill="#172033" fontSize="22" fontWeight="900">Rank 0 sends three messages</text>
        {[['TAG 10', 110, '#94a3b8'], ['TAG 20', 250, '#059669'], ['TAG 30', 390, '#94a3b8']].map(([t, y, c]) => (
          <g key={t}>
            <rect x="70" y={y} width="220" height="70" rx="12" fill={c} />
            <text x="180" y={y + 44} textAnchor="middle" fill="#fff" fontSize="22" fontWeight="900">{t}</text>
          </g>
        ))}
        <path d="M300 285 H620" stroke="#059669" strokeWidth="6" />
        <path d="M300 145 H500" stroke="#cbd5e1" strokeWidth="3" strokeDasharray="6 6" />
        <path d="M300 425 H500" stroke="#cbd5e1" strokeWidth="3" strokeDasharray="6 6" />
        <rect x="620" y="200" width="500" height="180" rx="16" fill="#ecfdf5" stroke="#059669" strokeWidth="3" />
        <text x="870" y="250" textAnchor="middle" fill="#172033" fontSize="22" fontWeight="900">Rank 1 receive request</text>
        <text x="870" y="292" textAnchor="middle" fill="#047857" fontSize="20">source = Rank 0</text>
        <text x="870" y="328" textAnchor="middle" fill="#047857" fontSize="20">tag = 20</text>
        <text x="600" y="500" textAnchor="middle" fill="#172033" fontSize="22" fontWeight="800">Only the matching message enters the receive buffer</text>
      </svg>
    </div>
  )
}

export function BlockingTimelines() {
  return (
    <div className="mpi-scene" aria-label="Blocking send and receive on process timelines">
      <svg viewBox="0 0 1200 560">
        <text x="80" y="80" fill="#172033" fontSize="22" fontWeight="900">Rank 0</text>
        <rect x="200" y="50" width="220" height="50" rx="8" fill="#2563eb" />
        <text x="310" y="82" textAnchor="middle" fill="#fff" fontSize="18" fontWeight="800">MPI_Send</text>
        <rect x="420" y="50" width="180" height="50" rx="8" fill="#fde68a" />
        <text x="510" y="82" textAnchor="middle" fill="#92400e" fontSize="18" fontWeight="800">WAIT</text>
        <rect x="600" y="50" width="220" height="50" rx="8" fill="#059669" />
        <text x="710" y="82" textAnchor="middle" fill="#fff" fontSize="18" fontWeight="800">CONTINUE</text>
        <text x="80" y="220" fill="#172033" fontSize="22" fontWeight="900">Rank 1</text>
        <rect x="200" y="190" width="160" height="50" rx="8" fill="#94a3b8" />
        <text x="280" y="222" textAnchor="middle" fill="#fff" fontSize="18">compute</text>
        <rect x="360" y="190" width="240" height="50" rx="8" fill="#0ea5a4" />
        <text x="480" y="222" textAnchor="middle" fill="#fff" fontSize="18" fontWeight="800">MPI_Recv WAIT</text>
        <rect x="600" y="190" width="220" height="50" rx="8" fill="#059669" />
        <text x="710" y="222" textAnchor="middle" fill="#fff" fontSize="18" fontWeight="800">buffer filled</text>
        <path d="M510 100 V190" stroke="#f59e0b" strokeWidth="3" strokeDasharray="6 5" />
        <text x="600" y="340" textAnchor="middle" fill="#172033" fontSize="20" fontWeight="800">A blocking call returns only after the local completion condition is met</text>
        <text x="600" y="380" textAnchor="middle" fill="#475569" fontSize="18">Easier to reason about · waiting is real · ordering can create deadlock</text>
      </svg>
    </div>
  )
}

export function DeadlockScene() {
  return (
    <div className="mpi-scene" aria-label="Deadlock: both ranks wait to receive">
      <svg viewBox="0 0 1200 560">
        <rect x="80" y="90" width="420" height="280" rx="18" fill="#fff" stroke="#dc2626" strokeWidth="4" />
        <text x="290" y="150" textAnchor="middle" fill="#172033" fontSize="26" fontWeight="900">Rank 0</text>
        <text x="290" y="210" textAnchor="middle" fill="#dc2626" fontSize="24" fontWeight="900">WAITING</text>
        <text x="290" y="258" textAnchor="middle" fill="#7f1d1d" fontSize="20">MPI_Recv from Rank 1</text>
        <text x="290" y="300" textAnchor="middle" fill="#64748b" fontSize="18">no send posted</text>
        <rect x="700" y="90" width="420" height="280" rx="18" fill="#fff" stroke="#dc2626" strokeWidth="4" />
        <text x="910" y="150" textAnchor="middle" fill="#172033" fontSize="26" fontWeight="900">Rank 1</text>
        <text x="910" y="210" textAnchor="middle" fill="#dc2626" fontSize="24" fontWeight="900">WAITING</text>
        <text x="910" y="258" textAnchor="middle" fill="#7f1d1d" fontSize="20">MPI_Recv from Rank 0</text>
        <text x="910" y="300" textAnchor="middle" fill="#64748b" fontSize="18">no send posted</text>
        <path d="M500 230 H700" stroke="#dc2626" strokeWidth="8" />
        <rect x="470" y="400" width="260" height="70" rx="14" fill="#dc2626" />
        <text x="600" y="446" textAnchor="middle" fill="#fff" fontSize="28" fontWeight="900">DEADLOCK</text>
        <text x="600" y="510" textAnchor="middle" fill="#172033" fontSize="20" fontWeight="800">Both timelines freeze. Neither message is ever created.</text>
      </svg>
    </div>
  )
}

export function SafeOrdering() {
  return (
    <div className="mpi-scene" aria-label="Safe send-receive ordering">
      <svg viewBox="0 0 1200 560">
        {[
          ['Rank 0 sends', 80],
          ['Rank 1 receives', 340],
          ['Rank 1 replies', 600],
          ['Rank 0 receives', 860],
        ].map(([t, x], i) => (
          <g key={t}>
            <rect x={x} y="180" width="230" height="90" rx="14" fill="#059669" />
            <text x={x + 115} y="234" textAnchor="middle" fill="#fff" fontSize="20" fontWeight="900">{t}</text>
            {i < 3 && <path d={`M${x + 230} 225 H${x + 260}`} stroke="#059669" strokeWidth="4" />}
          </g>
        ))}
        <text x="600" y="340" textAnchor="middle" fill="#065f46" fontSize="26" fontWeight="900">SAFE ORDERING</text>
        <text x="600" y="390" textAnchor="middle" fill="#172033" fontSize="20">Pair Send with Recv. Or use MPI_Sendrecv for a two-way exchange.</text>
        <text x="600" y="440" textAnchor="middle" fill="#475569" fontSize="18">Flow turns green because a message actually exists before the matching wait.</text>
      </svg>
    </div>
  )
}

export function TrapezoidCurve({ partitions = false, variant }) {
  const a = 80
  const b = 1080
  const base = 460

  // ---- variant: single trapezoid anatomy (object close-up) ----------------
  if (variant === 'single') {
    const xi = 320
    const xj = 820
    const fi = 250
    const fj = 130
    return (
      <div className="mpi-scene" aria-label="Anatomy of one trapezoid">
        <svg viewBox="0 0 1200 560">
          <path d="M120 470 H1120 M180 500 V70" stroke="#64748b" strokeWidth="3" fill="none" />
          <path d={`M180 300 Q 500 120 1060 150`} fill="none" stroke="#2563eb" strokeWidth="4" opacity="0.5" />
          <polygon points={`${xi},${base} ${xi},${fi} ${xj},${fj} ${xj},${base}`} fill="rgba(14,165,164,0.24)" stroke="#0ea5a4" strokeWidth="3" />
          <line x1={xi} y1={base} x2={xi} y2={fi} stroke="#172033" strokeWidth="3" />
          <line x1={xj} y1={base} x2={xj} y2={fj} stroke="#172033" strokeWidth="3" />
          <circle cx={xi} cy={fi} r="7" fill="#0ea5a4" />
          <circle cx={xj} cy={fj} r="7" fill="#0ea5a4" />
          <text x={xi - 14} y={fi - 16} textAnchor="end" fill="#0f766e" fontSize="22" fontWeight="900">f(xᵢ)</text>
          <text x={xj + 14} y={fj - 6} fill="#0f766e" fontSize="22" fontWeight="900">f(xᵢ₊₁)</text>
          <path d={`M${xi} ${base + 26} H${xj}`} stroke="#d97706" strokeWidth="3" markerStart="url(#tcap)" markerEnd="url(#tcap)" />
          <defs><marker id="tcap" markerWidth="8" markerHeight="8" refX="4" refY="4"><circle cx="4" cy="4" r="3" fill="#d97706" /></marker></defs>
          <text x={(xi + xj) / 2} y={base + 52} textAnchor="middle" fill="#b45309" fontSize="22" fontWeight="900">h = (b − a) / n</text>
          <rect x="300" y="40" width="600" height="60" rx="12" fill="#0f172a" />
          <text x="600" y="80" textAnchor="middle" fill="#fbbf24" fontSize="24" fontWeight="900">area = ½ · h · ( f(xᵢ) + f(xᵢ₊₁) )</text>
        </svg>
      </div>
    )
  }

  // ---- variant: f(x)=x² on [0,4] (concrete example, full-stage math) -------
  if (variant === 'xsq') {
    const px = (x) => 180 + (x / 4) * 880
    const py = (y) => base - (y / 16) * 380
    const seg = [0, 1, 2, 3, 4]
    const curve = Array.from({ length: 41 }, (_, i) => { const x = i / 10; return `${i === 0 ? 'M' : 'L'}${px(x)} ${py(x * x)}` }).join(' ')
    const colors = ['rgba(37,99,235,.30)', 'rgba(14,165,164,.30)', 'rgba(124,58,237,.30)', 'rgba(217,119,6,.30)']
    return (
      <div className="mpi-scene" aria-label="f of x equals x squared on interval 0 to 4">
        <svg viewBox="0 0 1200 560">
          <text x="600" y="42" textAnchor="middle" fill="#172033" fontSize="24" fontWeight="900">f(x) = x²   on   [0, 4]</text>
          {seg.slice(0, -1).map((x, i) => (
            <polygon key={x} points={`${px(x)},${base} ${px(x)},${py(x * x)} ${px(x + 1)},${py((x + 1) ** 2)} ${px(x + 1)},${base}`} fill={colors[i]} stroke="#172033" strokeWidth="1.5" />
          ))}
          <path d={curve} fill="none" stroke="#2563eb" strokeWidth="5" />
          <path d={`M${px(0)} ${base} H${px(4) + 40} M${px(0)} ${base + 20} V80`} stroke="#64748b" strokeWidth="3" fill="none" />
          {seg.map((x) => (
            <g key={x}>
              <line x1={px(x)} y1={base} x2={px(x)} y2={base + 8} stroke="#64748b" strokeWidth="2" />
              <text x={px(x)} y={base + 34} textAnchor="middle" fill="#172033" fontSize="20" fontWeight="800">{x}</text>
            </g>
          ))}
          <text x={px(4) + 30} y={base + 34} fill="#475569" fontSize="18">x</text>
          <text x="600" y="530" textAnchor="middle" fill="#475569" fontSize="18" fontWeight="750">four trapezoids (h = 1) approximate the shaded area</text>
        </svg>
      </div>
    )
  }

  // ---- variant: definite integral / exact shaded area ----------------------
  if (variant === 'area') {
    const yAt = (x) => 420 - Math.sin(((x - a) / (b - a)) * Math.PI) * 220 - ((x - a) / (b - a)) * 40
    const pts = Array.from({ length: 101 }, (_, i) => a + (i / 100) * (b - a))
    const curve = pts.map((x, i) => `${i === 0 ? 'M' : 'L'}${x} ${yAt(x)}`).join(' ')
    return (
      <div className="mpi-scene" aria-label="Exact area under a curve as a definite integral">
        <svg viewBox="0 0 1200 560">
          <path d={`${curve} L${b} ${base} L${a} ${base} Z`} fill="rgba(37,99,235,0.20)" />
          <path d={curve} fill="none" stroke="#2563eb" strokeWidth="5" />
          <path d="M70 460 H1130 M80 480 V70" stroke="#64748b" strokeWidth="3" fill="none" />
          <text x="90" y="500" fill="#172033" fontSize="22" fontWeight="800">a</text>
          <text x="1086" y="500" fill="#172033" fontSize="22" fontWeight="800">b</text>
          <rect x="360" y="36" width="480" height="88" rx="14" fill="#0f172a" />
          <text x="600" y="74" textAnchor="middle" fill="#fbbf24" fontSize="28" fontWeight="900">∫ₐᵇ f(x) dx</text>
          <text x="600" y="106" textAnchor="middle" fill="#93c5fd" fontSize="18" fontWeight="800">= the area under the curve</text>
          <text x="600" y="525" textAnchor="middle" fill="#475569" fontSize="18" fontWeight="750">hard to integrate by hand → approximate it numerically</text>
        </svg>
      </div>
    )
  }

  // ---- variant: serial sweep (one worker crosses every trapezoid) ----------
  // Wide, short viewBox so the scene fills the horizontal band beneath the code
  // panel instead of letterboxing into the middle third.
  if (variant === 'serial') {
    const n = 8
    const sBase = 296
    const w = (b - a) / n
    const yAt = (x) => sBase - Math.sin(((x - a) / (b - a)) * Math.PI) * 170 - ((x - a) / (b - a)) * 30
    const pts = Array.from({ length: n + 1 }, (_, i) => a + i * w)
    return (
      <div className="mpi-scene" aria-label="One worker sweeps across every trapezoid in sequence">
        <svg viewBox="0 0 1200 400">
          {pts.slice(0, -1).map((x) => (
            <polygon key={x} points={`${x},${sBase} ${x},${yAt(x)} ${x + w},${yAt(x + w)} ${x + w},${sBase}`} fill="rgba(148,163,184,0.20)" stroke="#94a3b8" strokeWidth="1.5" />
          ))}
          <path d={pts.map((x, i) => `${i === 0 ? 'M' : 'L'}${x} ${yAt(x)}`).join(' ')} fill="none" stroke="#334155" strokeWidth="4" />
          <path d={`M70 ${sBase} H1130`} stroke="#64748b" strokeWidth="3" />
          <g>
            <rect x={a} y={sBase + 8} width="72" height="34" rx="10" fill="#dc2626" />
            <text x={a + 36} y={sBase + 31} textAnchor="middle" fill="#fff" fontSize="18" fontWeight="900">CPU</text>
            <animateTransform attributeName="transform" type="translate" values={`0 0; ${b - 72 - a} 0; ${b - 72 - a} 0`} dur="3.4s" repeatCount="indefinite" />
          </g>
          <text x="600" y="44" textAnchor="middle" fill="#172033" fontSize="23" fontWeight="900">One process · one worker · all n trapezoids in sequence</text>
          <text x="600" y="392" textAnchor="middle" fill="#b45309" fontSize="21" fontWeight="850">runtime grows with n — nothing overlaps</text>
        </svg>
      </div>
    )
  }

  // ---- default + partitions (divider hero / four-rank ownership) -----------
  const n = partitions ? 8 : 6
  const w = (b - a) / n
  const yAt = (x) => 420 - Math.sin(((x - a) / (b - a)) * Math.PI) * 220 - ((x - a) / (b - a)) * 40
  const pts = Array.from({ length: n + 1 }, (_, i) => a + i * w)
  const area = pts.map((x, i) => `${i === 0 ? 'M' : 'L'}${x} ${yAt(x)}`).join(' ') + ` L${b} ${base} L${a} ${base} Z`
  const curve = pts.map((x, i) => `${i === 0 ? 'M' : 'L'}${x} ${yAt(x)}`).join(' ')
  return (
    <div className="mpi-scene" aria-label="Trapezoidal approximation of area under a curve">
      <svg viewBox="0 0 1200 560">
        <text x="600" y="40" textAnchor="middle" fill="#172033" fontSize="22" fontWeight="900">
          {partitions ? 'the same curve, split across four ranks' : '∫ f(x) dx  from a to b'}
        </text>
        <path d={area} fill="rgba(14,165,164,0.22)" />
        {pts.slice(0, -1).map((x, i) => (
          <polygon
            key={x}
            points={`${x},${base} ${x},${yAt(x)} ${x + w},${yAt(x + w)} ${x + w},${base}`}
            fill={partitions ? ['rgba(37,99,235,.28)', 'rgba(14,165,164,.28)', 'rgba(124,58,237,.28)', 'rgba(217,119,6,.28)'][Math.floor(i / 2)] : 'rgba(37,99,235,.18)'}
            stroke="#172033"
            strokeWidth="1.5"
          />
        ))}
        <path d={curve} fill="none" stroke="#2563eb" strokeWidth="5" />
        <path d="M70 460 H1130 M80 480 V70" stroke="#64748b" strokeWidth="3" fill="none" />
        <text x="90" y="500" fill="#172033" fontSize="20" fontWeight="800">a</text>
        <text x="1088" y="500" fill="#172033" fontSize="20" fontWeight="800">b</text>
        {partitions && [0, 1, 2, 3].map((r) => (
          <text key={r} x={a + (2 * r + 1) * w} y="530" textAnchor="middle" fill={['#2563eb', '#0ea5a4', '#7c3aed', '#d97706'][r]} fontSize="18" fontWeight="900">Rank {r}</text>
        ))}
      </svg>
    </div>
  )
}

export function IntegralShade() {
  return <TrapezoidCurve variant="area" />
}

export function XSquaredPlot() {
  return <TrapezoidCurve variant="xsq" />
}

export function SerialSweep() {
  return <TrapezoidCurve variant="serial" />
}

export function InitBootstrap() {
  return <LifecycleScene variant="bootstrap" />
}

export function RecvCloseup() {
  return <MessagePacket value={100} variant="recv" />
}

export function FlattenMemory() {
  return <MatrixColumn variant="flatten" />
}

export function CommitHandle() {
  return <MatrixColumn variant="commit" />
}

export function TrapPartition({ variant }) {
  // ---- variant: workload scale — n=1000 trapezoids, one serial sweep ------
  if (variant === 'scale') {
    return (
      <div className="mpi-scene" aria-label="A large number of trapezoids swept by a single process">
        <svg viewBox="0 0 1200 560">
          <text x="600" y="70" textAnchor="middle" fill="#172033" fontSize="24" fontWeight="900">n = 1000 trapezoids · one process</text>
          <rect x="80" y="170" width="1040" height="120" rx="12" fill="#eef2f7" stroke="#2563eb" strokeWidth="2" />
          {Array.from({ length: 52 }).map((_, i) => (
            <line key={i} x1={90 + i * 20} y1="170" x2={90 + i * 20} y2="290" stroke="#cbd5e1" strokeWidth="1" />
          ))}
          <text x="100" y="330" fill="#172033" fontSize="20" fontWeight="800">a</text>
          <text x="1090" y="330" textAnchor="end" fill="#172033" fontSize="20" fontWeight="800">b</text>
          <g>
            <rect x="80" y="188" width="70" height="84" rx="10" fill="#dc2626" />
            <text x="115" y="238" textAnchor="middle" fill="#fff" fontSize="18" fontWeight="900">CPU</text>
            <animateTransform attributeName="transform" type="translate" values="0 0; 970 0; 970 0" dur="3.6s" repeatCount="indefinite" />
          </g>
          <text x="600" y="420" textAnchor="middle" fill="#b45309" fontSize="22" fontWeight="850">runtime ∝ n — the loop visits every subinterval in order</text>
          <text x="600" y="464" textAnchor="middle" fill="#2563eb" fontSize="20" fontWeight="800">split the interval → four ranks each sweep ~250</text>
        </svg>
      </div>
    )
  }

  // ---- variant: one rank's segment (local_n / local_a / local_b / local_int)
  if (variant === 'oneseg') {
    const la = 380
    const lb = 820
    const base = 430
    return (
      <div className="mpi-scene" aria-label="One rank owns a segment of the interval with local parameters">
        <svg viewBox="0 0 1200 560">
          <path d="M80 430 H1120" stroke="#64748b" strokeWidth="3" />
          <path d="M80 430 Q 600 120 1120 260" fill="none" stroke="#2563eb" strokeWidth="4" opacity="0.45" />
          <rect x="120" y="418" width={la - 120} height="24" fill="#e2e8f0" />
          <rect x={lb} y="418" width={1080 - lb} height="24" fill="#e2e8f0" />
          {[0, 1, 2, 3].map((i) => (
            <polygon key={i} points={`${la + i * 110},${base} ${la + i * 110},${base - (120 + i * 22)} ${la + (i + 1) * 110},${base - (120 + (i + 1) * 22)} ${la + (i + 1) * 110},${base}`} fill="rgba(14,165,164,0.26)" stroke="#0ea5a4" strokeWidth="2" />
          ))}
          <line x1={la} y1="168" x2={la} y2={base + 40} stroke="#7c3aed" strokeWidth="2" strokeDasharray="5 5" />
          <line x1={lb} y1="168" x2={lb} y2={base + 40} stroke="#7c3aed" strokeWidth="2" strokeDasharray="5 5" />
          <text x={la - 14} y="148" textAnchor="end" fill="#5b21b6" fontSize="22" fontWeight="900">local_a</text>
          <text x={lb + 14} y="148" textAnchor="start" fill="#5b21b6" fontSize="22" fontWeight="900">local_b</text>
          <path d={`M${la} ${base + 58} H${lb}`} stroke="#d97706" strokeWidth="3" markerStart="url(#oc)" markerEnd="url(#oc)" />
          <defs><marker id="oc" markerWidth="8" markerHeight="8" refX="4" refY="4"><circle cx="4" cy="4" r="3" fill="#d97706" /></marker></defs>
          <text x={(la + lb) / 2} y={base + 84} textAnchor="middle" fill="#b45309" fontSize="20" fontWeight="900">local_n subintervals</text>
          <rect x="360" y="28" width="480" height="52" rx="12" fill="#0f172a" />
          <text x="600" y="64" textAnchor="middle" fill="#fbbf24" fontSize="22" fontWeight="900">local_int = Trap(local_a, local_b, local_n)</text>
          <text x="600" y="520" textAnchor="middle" fill="#0f766e" fontSize="20" fontWeight="850">the shaded area is this rank's local_int</text>
        </svg>
      </div>
    )
  }

  return (
    <div className="mpi-scene" aria-label="Interval [a,b] split across four ranks">
      <svg viewBox="0 0 1200 560">
        <rect x="60" y="70" width="1080" height="70" rx="12" fill="#e0f2fe" stroke="#2563eb" strokeWidth="3" />
        <text x="600" y="114" textAnchor="middle" fill="#172033" fontSize="24" fontWeight="900">[a , b]   n trapezoids   h = (b − a) / n</text>
        {[0, 1, 2, 3].map((r) => (
          <g key={r}>
            <rect x={70 + r * 280} y="190" width="250" height="220" rx="14" fill="#fff" stroke={['#2563eb', '#0ea5a4', '#7c3aed', '#d97706'][r]} strokeWidth="3" />
            <text x={195 + r * 280} y="240" textAnchor="middle" fill="#172033" fontSize="22" fontWeight="900">Rank {r}</text>
            <text x={195 + r * 280} y="290" textAnchor="middle" fill="#475569" fontSize="18">local_a → local_b</text>
            <text x={195 + r * 280} y="340" textAnchor="middle" fill={['#2563eb', '#0ea5a4', '#7c3aed', '#d97706'][r]} fontSize="20" fontWeight="900">local_n ≈ n/4</text>
          </g>
        ))}
        <text x="600" y="470" textAnchor="middle" fill="#172033" fontSize="20" fontWeight="800">local_a = a + my_rank · local_n · h</text>
        <text x="600" y="508" textAnchor="middle" fill="#172033" fontSize="20" fontWeight="800">local_b = local_a + local_n · h     local_int = Trap(...)</text>
      </svg>
    </div>
  )
}

export function LocalAreas() {
  return (
    <div className="mpi-scene">
      <RankStrip values={['local_int₀', 'local_int₁', 'local_int₂', 'local_int₃']} memLabel="local trapezoid sum" />
    </div>
  )
}

export function ManualCollect() {
  return (
    <div className="mpi-scene" aria-label="Non-root ranks send local integrals to Rank 0">
      <svg viewBox="0 0 1200 560">
        <rect x="40" y="160" width="220" height="180" rx="14" fill="#fff" stroke="#2563eb" strokeWidth="4" />
        <text x="150" y="230" textAnchor="middle" fill="#172033" fontSize="22" fontWeight="900">Rank 0</text>
        <text x="150" y="270" textAnchor="middle" fill="#2563eb" fontSize="20">ROOT</text>
        <text x="150" y="310" textAnchor="middle" fill="#64748b" fontSize="18">adds all local_int</text>
        {[1, 2, 3].map((r) => (
          <g key={r}>
            <rect x={380 + (r - 1) * 260} y="80" width="200" height="130" rx="12" fill="#fff" stroke={['#0ea5a4', '#7c3aed', '#d97706'][r - 1]} strokeWidth="3" />
            <text x={480 + (r - 1) * 260} y="140" textAnchor="middle" fill="#172033" fontSize="20" fontWeight="900">Rank {r}</text>
            <text x={480 + (r - 1) * 260} y="178" textAnchor="middle" fill="#475569" fontSize="18">local_int</text>
            <path d={`M${480 + (r - 1) * 260} 210 Q 300 280 260 250`} stroke="#f59e0b" strokeWidth="3" fill="none" />
          </g>
        ))}
        <rect x="380" y="380" width="700" height="80" rx="14" fill="#172033" />
        <text x="730" y="430" textAnchor="middle" fill="#fbbf24" fontSize="22" fontWeight="900">Rank 0 total = Σ local_int     (manual Send/Recv)</text>
      </svg>
    </div>
  )
}

export function ReduceTree({ all = false, variant }) {
  // ---- variant: the operator is a pluggable argument ----------------------
  if (variant === 'op') {
    const ops = ['MPI_SUM', 'MPI_MAX', 'MPI_MIN', 'MPI_PROD']
    return (
      <div className="mpi-scene" aria-label="The reduction operator is chosen as an argument to MPI_Reduce">
        <svg viewBox="0 0 1200 560">
          {[2.5, 3.1, 4.2, 5.2].map((v, r) => (
            <g key={r}>
              <rect x="80" y={60 + r * 110} width="150" height="86" rx="12" fill="#fff" stroke={['#2563eb', '#0ea5a4', '#7c3aed', '#d97706'][r]} strokeWidth="3" />
              <text x="155" y={95 + r * 110} textAnchor="middle" fill="#64748b" fontSize="18">Rank {r}</text>
              <text x="155" y={128 + r * 110} textAnchor="middle" fill="#172033" fontSize="24" fontWeight="900">{v}</text>
              <path d={`M230 ${103 + r * 110} C 360 ${103 + r * 110}, 400 280, 470 280`} fill="none" stroke="#94a3b8" strokeWidth="2.5" />
            </g>
          ))}
          <rect x="470" y="210" width="230" height="140" rx="18" fill="#0f172a" />
          <text x="585" y="270" textAnchor="middle" fill="#fff" fontSize="20" fontWeight="900">operator</text>
          <text x="585" y="308" textAnchor="middle" fill="#fbbf24" fontSize="24" fontWeight="900">MPI_SUM</text>
          <path d="M700 280 H800" stroke="#2563eb" strokeWidth="4" markerEnd="url(#opA)" />
          <defs><marker id="opA" markerWidth="12" markerHeight="12" refX="8" refY="6" orient="auto"><path d="M0 0 L10 6 L0 12 z" fill="#2563eb" /></marker></defs>
          <rect x="800" y="235" width="180" height="90" rx="14" fill="#eff6ff" stroke="#2563eb" strokeWidth="3" />
          <text x="890" y="270" textAnchor="middle" fill="#1e3a8a" fontSize="18" fontWeight="800">result</text>
          <text x="890" y="304" textAnchor="middle" fill="#2563eb" fontSize="26" fontWeight="900">15.0</text>
          <text x="1010" y="248" fill="#475569" fontSize="18" fontWeight="800">swap the operator:</text>
          {ops.slice(1).map((o, i) => (
            <text key={o} x="1010" y={282 + i * 30} fill="#7c3aed" fontSize="18" fontWeight="800" fontFamily="ui-monospace, monospace">{o}</text>
          ))}
          <text x="585" y="430" textAnchor="middle" fill="#172033" fontSize="20" fontWeight="850">MPI_Reduce(&local, &result, 1, MPI_DOUBLE, MPI_SUM, 0, comm)</text>
          <text x="585" y="470" textAnchor="middle" fill="#475569" fontSize="18">same call shape · the operator decides how values combine</text>
        </svg>
      </div>
    )
  }

  return (
    <div className="mpi-scene" aria-label={all ? 'Allreduce result returns to every rank' : 'Tree reduction to Rank 0'}>
      <svg viewBox="0 0 1200 560">
        {[
          [120, '2', 0],
          [400, '4', 1],
          [680, '6', 2],
          [960, '8', 3],
        ].map(([x, v, r]) => (
          <g key={r}>
            <circle cx={x + 50} cy="78" r="40" fill="#fff" stroke="#2563eb" strokeWidth="3" />
            <text x={x + 50} y="70" textAnchor="middle" fill="#64748b" fontSize="18">R{r}</text>
            <text x={x + 50} y="96" textAnchor="middle" fill="#172033" fontSize="22" fontWeight="900">{v}</text>
          </g>
        ))}
        <path d="M170 118 L270 248 L450 118" fill="none" stroke="#0ea5a4" strokeWidth="3" />
        <path d="M730 118 L870 248 L1010 118" fill="none" stroke="#7c3aed" strokeWidth="3" />
        <rect x="175" y="168" width="190" height="50" rx="12" fill="#ecfdf5" stroke="#0ea5a4" strokeWidth="2" />
        <text x="270" y="202" textAnchor="middle" fill="#0ea5a4" fontSize="22" fontWeight="900">2 + 4 = 6</text>
        <rect x="775" y="168" width="190" height="50" rx="12" fill="#f5f3ff" stroke="#7c3aed" strokeWidth="2" />
        <text x="870" y="202" textAnchor="middle" fill="#7c3aed" fontSize="22" fontWeight="900">6 + 8 = 14</text>
        <path d="M270 248 L600 318 L870 248" fill="none" stroke="#2563eb" strokeWidth="4" />
        <rect x="470" y="288" width="260" height="52" rx="12" fill="#eff6ff" stroke="#2563eb" strokeWidth="2" />
        <text x="600" y="324" textAnchor="middle" fill="#2563eb" fontSize="24" fontWeight="900">6 + 14 = 20</text>
        <rect x={all ? 80 : 420} y="360" width={all ? 1040 : 360} height="80" rx="14" fill="#172033" />
        <text x="600" y="410" textAnchor="middle" fill="#fbbf24" fontSize="22" fontWeight="900">
          {all ? '20 is now on Rank 0, 1, 2 and 3' : 'Result 20 lives at Rank 0'}
        </text>
        <text x="600" y="500" textAnchor="middle" fill="#475569" fontSize="18">
          {all ? 'MPI_Allreduce = reduce + broadcast of the combined value' : 'MPI_Reduce with MPI_SUM'}
        </text>
      </svg>
    </div>
  )
}

export function BcastScene({ variant }) {
  // ---- variant: radial broadcast from a central root ----------------------
  if (variant === 'radial') {
    const cx = 600
    const cy = 290
    const ranks = [0, 1, 2, 3, 4, 5]
    const R = 210
    return (
      <div className="mpi-scene" aria-label="Root at the center broadcasts one value outward to every rank">
        <svg viewBox="0 0 1200 560">
          <circle cx={cx} cy={cy} r="96" fill="none" stroke="#93c5fd" strokeWidth="2" strokeDasharray="6 8">
            <animate attributeName="r" values="70;118;70" dur="2.8s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.9;0;0.9" dur="2.8s" repeatCount="indefinite" />
          </circle>
          {ranks.map((r) => {
            const ang = (Math.PI * 2 * r) / ranks.length - Math.PI / 2
            const x = cx + Math.cos(ang) * R
            const y = cy + Math.sin(ang) * R
            return (
              <g key={r}>
                <path d={`M${cx + Math.cos(ang) * 70} ${cy + Math.sin(ang) * 70} L${x - Math.cos(ang) * 52} ${y - Math.sin(ang) * 52}`} stroke="#2563eb" strokeWidth="3" markerEnd="url(#brad)" />
                <circle cx={x} cy={y} r="52" fill="#fff" stroke="#2563eb" strokeWidth="3" />
                <text x={x} y={y - 4} textAnchor="middle" fill="#172033" fontSize="18" fontWeight="900">Rank {r + 1}</text>
                <text x={x} y={y + 20} textAnchor="middle" fill="#2563eb" fontSize="18" fontWeight="900">25</text>
              </g>
            )
          })}
          <defs><marker id="brad" markerWidth="12" markerHeight="12" refX="8" refY="6" orient="auto"><path d="M0 0 L10 6 L0 12 z" fill="#2563eb" /></marker></defs>
          <circle cx={cx} cy={cy} r="66" fill="#2563eb" />
          <text x={cx} y={cy - 6} textAnchor="middle" fill="#fff" fontSize="20" fontWeight="900">root</text>
          <text x={cx} y={cy + 22} textAnchor="middle" fill="#dbeafe" fontSize="22" fontWeight="900">x = 25</text>
          <text x={cx} y="540" textAnchor="middle" fill="#172033" fontSize="20" fontWeight="850">MPI_Bcast(&x, 1, MPI_INT, root, comm) — same call on every rank</text>
        </svg>
      </div>
    )
  }

  return (
    <div className="mpi-scene" aria-label="Broadcast of x=25 from Rank 0">
      <svg viewBox="0 0 1200 560">
        <rect x="480" y="40" width="240" height="110" rx="14" fill="#2563eb" />
        <text x="600" y="86" textAnchor="middle" fill="#fff" fontSize="22" fontWeight="900">Rank 0</text>
        <text x="600" y="122" textAnchor="middle" fill="#dbeafe" fontSize="20">x = 25</text>
        {[0, 1, 2, 3].map((r) => (
          <g key={r}>
            <path d={`M600 150 L${150 + r * 300} 250`} stroke="#2563eb" strokeWidth="3" />
            <rect x={70 + r * 300} y="250" width="160" height="160" rx="14" fill="#fff" stroke="#2563eb" strokeWidth="3" />
            <text x={150 + r * 300} y="310" textAnchor="middle" fill="#172033" fontSize="20" fontWeight="900">Rank {r}</text>
            <text x={150 + r * 300} y="360" textAnchor="middle" fill="#2563eb" fontSize="22" fontWeight="900">x = 25</text>
          </g>
        ))}
        <text x="600" y="480" textAnchor="middle" fill="#172033" fontSize="22" fontWeight="800">one value · copied outward · every rank owns a local 25</text>
      </svg>
    </div>
  )
}

export function ScatterScene({ variant }) {
  const chunks = ['A B', 'C D', 'E F', 'G H']
  // ---- variant: scatter down, gather back (round trip) --------------------
  if (variant === 'roundtrip') {
    return (
      <div className="mpi-scene" aria-label="Scatter distributes chunks and Gather collects them back">
        <svg viewBox="0 0 1200 560">
          <rect x="330" y="24" width="540" height="56" rx="12" fill="#0f172a" />
          <text x="600" y="61" textAnchor="middle" fill="#fbbf24" fontSize="22" fontWeight="900">root [ A B C D E F G H ]</text>
          {chunks.map((c, i) => (
            <g key={c}>
              <path d={`M${520 + i * 40} 80 L${170 + i * 300} 210`} stroke="#7c3aed" strokeWidth="3" markerEnd="url(#sgd)" />
              <path d={`M${170 + i * 300} 350 L${600} 470`} stroke="#0ea5a4" strokeWidth="3" markerEnd="url(#sgu)" opacity="0.85" />
              <rect x={70 + i * 300} y="210" width="200" height="140" rx="14" fill="#fff" stroke="#334155" strokeWidth="2" />
              <text x={170 + i * 300} y="258" textAnchor="middle" fill="#172033" fontSize="20" fontWeight="900">Rank {i}</text>
              <text x={170 + i * 300} y="308" textAnchor="middle" fill="#7c3aed" fontSize="24" fontWeight="900">[{c}]</text>
            </g>
          ))}
          <defs>
            <marker id="sgd" markerWidth="12" markerHeight="12" refX="8" refY="6" orient="auto"><path d="M0 0 L10 6 L0 12 z" fill="#7c3aed" /></marker>
            <marker id="sgu" markerWidth="12" markerHeight="12" refX="8" refY="6" orient="auto"><path d="M0 0 L10 6 L0 12 z" fill="#0ea5a4" /></marker>
          </defs>
          <text x="150" y="150" fill="#7c3aed" fontSize="20" fontWeight="900">Scatter ↓</text>
          <rect x="430" y="470" width="340" height="56" rx="12" fill="#0f172a" />
          <text x="600" y="507" textAnchor="middle" fill="#99f6e4" fontSize="20" fontWeight="900">Gather ↑ back to root</text>
        </svg>
      </div>
    )
  }
  return (
    <div className="mpi-scene" aria-label="Scatter splits an array into chunks">
      <svg viewBox="0 0 1200 560">
        <rect x="200" y="30" width="800" height="70" rx="12" fill="#172033" />
        <text x="600" y="76" textAnchor="middle" fill="#fbbf24" fontSize="24" fontWeight="900">Root owns  [ A B C D E F G H ]</text>
        {chunks.map((c, i) => (
          <g key={c}>
            <path d={`M${280 + i * 180} 100 L${150 + i * 300} 190`} stroke="#7c3aed" strokeWidth="3" />
            <rect x={70 + i * 300} y="190" width="160" height="200" rx="14" fill="#fff" stroke="#7c3aed" strokeWidth="3" />
            <text x={150 + i * 300} y="250" textAnchor="middle" fill="#172033" fontSize="20" fontWeight="900">Rank {i}</text>
            <text x={150 + i * 300} y="320" textAnchor="middle" fill="#7c3aed" fontSize="26" fontWeight="900">[{c}]</text>
          </g>
        ))}
        <text x="600" y="460" textAnchor="middle" fill="#172033" fontSize="20" fontWeight="800">MPI_Scatter: different portions travel to different ranks</text>
      </svg>
    </div>
  )
}

export function GatherScene() {
  const chunks = ['A B', 'C D', 'E F', 'G H']
  return (
    <div className="mpi-scene" aria-label="Gather assembles local chunks at root">
      <svg viewBox="0 0 1200 560">
        {chunks.map((c, i) => (
          <g key={c}>
            <rect x={70 + i * 300} y="40" width="160" height="140" rx="14" fill="#fff" stroke="#0ea5a4" strokeWidth="3" />
            <text x={150 + i * 300} y="95" textAnchor="middle" fill="#172033" fontSize="18" fontWeight="900">Rank {i}</text>
            <text x={150 + i * 300} y="140" textAnchor="middle" fill="#0ea5a4" fontSize="22" fontWeight="900">[{c}]</text>
            <path d={`M${150 + i * 300} 180 L${i < 2 ? 420 : 780} ${i < 2 ? 300 : 300}`} stroke="#0ea5a4" strokeWidth="3" />
          </g>
        ))}
        <rect x="200" y="300" width="800" height="80" rx="14" fill="#172033" />
        <text x="600" y="350" textAnchor="middle" fill="#99f6e4" fontSize="24" fontWeight="900">Rank 0 now holds  [ A B C D E F G H ]</text>
        <text x="600" y="450" textAnchor="middle" fill="#172033" fontSize="20" fontWeight="800">MPI_Gather is scatter in reverse</text>
      </svg>
    </div>
  )
}

export function BarrierScene() {
  return (
    <div className="mpi-scene" aria-label="Barrier gate waits for the last rank">
      <svg viewBox="0 0 1200 560">
        {[0, 1, 2, 3].map((r) => (
          <g key={r}>
            <text x="70" y={90 + r * 90} fill="#172033" fontSize="20" fontWeight="900">Rank {r}</text>
            <rect x="180" y={60 + r * 90} width={220 + r * 90} height="40" rx="8" fill={['#2563eb', '#0ea5a4', '#7c3aed', '#d97706'][r]} />
            <text x={290 + r * 45} y={88 + r * 90} fill="#fff" fontSize="18" fontWeight="800">work</text>
            <text x={430 + r * 90} y={88 + r * 90} fill="#92400e" fontSize="18" fontWeight="800">{r < 3 ? 'WAIT' : 'last arrival'}</text>
          </g>
        ))}
        <rect x="860" y="40" width="28" height="360" rx="6" fill="#dc2626">
          <animate attributeName="height" values="360;360;28" dur="3.2s" repeatCount="indefinite" />
        </rect>
        <text x="930" y="230" fill="#172033" fontSize="22" fontWeight="900">MPI_Barrier</text>
        <text x="600" y="460" textAnchor="middle" fill="#172033" fontSize="20" fontWeight="800">Fast ranks accumulate at the gate. The last process opens it. All continue.</text>
      </svg>
    </div>
  )
}

export function CollectiveSummary() {
  const rows = [
    ['Broadcast', 'one → all'],
    ['Scatter', 'one → chunks'],
    ['Gather', 'chunks → one'],
    ['Reduce', 'values → combined one'],
    ['Allreduce', 'values → combined all'],
    ['Barrier', 'all wait → all continue'],
  ]
  return (
    <div className="mpi-scene" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0,1fr))', gap: 14, padding: 20 }}>
      {rows.map(([t, b], i) => (
        <article key={t} className="mpi-rank" style={{ '--i': i }}>
          <span className="rk">{t}</span>
          <div className="mem" style={{ fontSize: 20 }}>{b}</div>
          <span className="priv">collective</span>
        </article>
      ))}
    </div>
  )
}

export function TypeMap() {
  const rows = [
    ['int', 'MPI_INT', '4 bytes', '#2563eb'],
    ['double', 'MPI_DOUBLE', '8 bytes', '#0ea5a4'],
    ['char', 'MPI_CHAR', '1 byte', '#7c3aed'],
    ['float', 'MPI_FLOAT', '4 bytes', '#d97706'],
  ]
  return (
    <div className="mpi-scene" aria-label="C memory types map to MPI datatypes that must match the buffer">
      <svg viewBox="0 0 1200 560">
        <text x="300" y="52" textAnchor="middle" fill="#172033" fontSize="22" fontWeight="900">C variable in memory</text>
        <text x="920" y="52" textAnchor="middle" fill="#172033" fontSize="22" fontWeight="900">MPI datatype in the call</text>
        {rows.map(([c, mpi, size, col], i) => {
          const y = 100 + i * 105
          return (
            <g key={c}>
              <rect x="70" y={y} width="200" height="80" rx="10" fill="#fff" stroke={col} strokeWidth="3" />
              <text x="100" y={y + 48} fill="#172033" fontSize="24" fontWeight="900" fontFamily="ui-monospace, monospace">{c}</text>
              {Array.from({ length: 4 }).map((_, k) => (
                <rect key={k} x={300 + k * 46} y={y + 22} width="40" height="36" rx="6"
                  fill={k * 2 < (size === '8 bytes' ? 8 : size === '1 byte' ? 1 : 4) ? col : '#eef2f7'}
                  stroke="#cbd5e1" strokeWidth="1" opacity={k * 2 < (size === '8 bytes' ? 8 : size === '1 byte' ? 1 : 4) ? 0.5 : 1} />
              ))}
              <text x="510" y={y + 46} fill="#64748b" fontSize="18">{size}</text>
              <path d={`M600 ${y + 40} H720`} stroke={col} strokeWidth="3" markerEnd="url(#tmA)" />
              <rect x="740" y={y} width="380" height="80" rx="10" fill={col} opacity="0.12" stroke={col} strokeWidth="2" />
              <text x="770" y={y + 48} fill={col} fontSize="24" fontWeight="900" fontFamily="ui-monospace, monospace">{mpi}</text>
            </g>
          )
        })}
        <defs><marker id="tmA" markerWidth="12" markerHeight="12" refX="8" refY="6" orient="auto"><path d="M0 0 L10 6 L0 12 z" fill="#64748b" /></marker></defs>
        <text x="600" y="545" textAnchor="middle" fill="#dc2626" fontSize="18" fontWeight="850">the datatype in Send/Recv must match the buffer's real type</text>
      </svg>
    </div>
  )
}

export function MatrixColumn({ variant }) {
  // ---- variant: flatten row-major memory, show the column is scattered ----
  if (variant === 'flatten') {
    const cells = Array.from({ length: 16 }, (_, i) => ({ r: Math.floor(i / 4), c: i % 4, v: i + 1 }))
    return (
      <div className="mpi-scene" aria-label="A column is contiguous on the page but scattered in linear memory">
        <svg viewBox="0 0 1200 560">
          <text x="300" y="36" textAnchor="middle" fill="#172033" fontSize="22" fontWeight="900">as we see it — a 4×4 matrix</text>
          {cells.map(({ r, c }) => {
            const col = c === 1
            return <rect key={`${r}${c}`} x={80 + c * 72} y={56 + r * 62} width="64" height="54" rx="7" fill={col ? '#fde68a' : '#f1f5f9'} stroke={col ? '#d97706' : '#cbd5e1'} strokeWidth={col ? 3 : 1} />
          })}
          {cells.map(({ r, c, v }) => (
            <text key={`t${r}${c}`} x={112 + c * 72} y={90 + r * 62} textAnchor="middle" fill="#172033" fontSize="18" fontWeight="800">{v}</text>
          ))}
          <text x="900" y="36" textAnchor="middle" fill="#172033" fontSize="22" fontWeight="900">column 1 highlighted</text>
          <path d="M380 180 C 520 180, 520 180, 640 180" fill="none" stroke="#94a3b8" strokeWidth="3" markerEnd="url(#fend)" />
          <defs><marker id="fend" markerWidth="12" markerHeight="12" refX="8" refY="6" orient="auto"><path d="M0 0 L10 6 L0 12 z" fill="#94a3b8" /></marker></defs>
          <text x="720" y="174" textAnchor="start" fill="#475569" fontSize="18">stored as</text>
          <text x="600" y="348" textAnchor="middle" fill="#172033" fontSize="20" fontWeight="900">how memory actually stores it — one long row-major line</text>
          {cells.map(({ v }, i) => {
            const col = i % 4 === 1
            return (
              <g key={`m${i}`}>
                <rect x={90 + i * 63} y="368" width="58" height="56" rx="7" fill={col ? '#fde68a' : '#eef2f7'} stroke={col ? '#d97706' : '#cbd5e1'} strokeWidth={col ? 3 : 1} />
                <text x={119 + i * 63} y="404" textAnchor="middle" fill="#172033" fontSize="18" fontWeight="800">{v}</text>
              </g>
            )
          })}
          <path d="M148 448 H1090" stroke="#64748b" strokeWidth="2" />
          <text x="240" y="488" textAnchor="middle" fill="#b45309" fontSize="18" fontWeight="850">stride = 4</text>
          <path d="M119 436 h252" stroke="#d97706" strokeWidth="3" markerEnd="url(#fend)" />
          <text x="820" y="488" textAnchor="middle" fill="#b45309" fontSize="18" fontWeight="850">the yellow cells are not adjacent</text>
        </svg>
      </div>
    )
  }

  // ---- variant: scattered cells collapse into one committed handle --------
  if (variant === 'commit') {
    const picks = [2, 6, 10, 14]
    return (
      <div className="mpi-scene" aria-label="Scattered strided cells become one committed datatype handle">
        <svg viewBox="0 0 1200 560">
          <text x="600" y="52" textAnchor="middle" fill="#172033" fontSize="22" fontWeight="900">describe the layout once, reuse the handle</text>
          {Array.from({ length: 16 }).map((_, i) => {
            const on = picks.includes(i)
            return (
              <g key={i}>
                <rect x={110 + i * 62} y="120" width="56" height="60" rx="7" fill={on ? '#fde68a' : '#eef2f7'} stroke={on ? '#d97706' : '#cbd5e1'} strokeWidth={on ? 3 : 1} />
                {on && <path d={`M${138 + i * 62} 180 C ${138 + i * 62} 250, 600 250, 600 300`} fill="none" stroke="#d97706" strokeWidth="2.5" opacity="0.65" />}
              </g>
            )
          })}
          <text x="600" y="112" textAnchor="middle" fill="#475569" fontSize="18">strided source memory (stride = 4)</text>
          <rect x="380" y="300" width="440" height="86" rx="16" fill="#fff" stroke="#7c3aed" strokeWidth="4" />
          <text x="600" y="335" textAnchor="middle" fill="#5b21b6" fontSize="24" fontWeight="900">newtype</text>
          <text x="600" y="368" textAnchor="middle" fill="#7c3aed" fontSize="18" fontWeight="800">one committed handle</text>
          <path d="M600 386 V430" stroke="#059669" strokeWidth="4" markerEnd="url(#cmt)" />
          <defs><marker id="cmt" markerWidth="12" markerHeight="12" refX="8" refY="6" orient="auto"><path d="M0 0 L10 6 L0 12 z" fill="#059669" /></marker></defs>
          <rect x="300" y="440" width="600" height="66" rx="14" fill="#ecfdf5" stroke="#059669" strokeWidth="2" />
          <text x="600" y="482" textAnchor="middle" fill="#065f46" fontSize="20" fontWeight="900">MPI_Type_commit(&newtype) → ready to Send / Recv</text>
        </svg>
      </div>
    )
  }

  const cells = Array.from({ length: 16 }, (_, i) => ({ r: Math.floor(i / 4), c: i % 4, v: i + 1 }))
  return (
    <div className="mpi-scene" aria-label="Row-major matrix with a non-contiguous column highlighted">
      <svg viewBox="0 0 1200 560">
        <text x="600" y="40" textAnchor="middle" fill="#172033" fontSize="22" fontWeight="900">Row-major matrix · column 1 is not contiguous in memory</text>
        {cells.map(({ r, c }) => {
          const col = c === 1
          return (
            <rect key={`${r}${c}`} x={220 + c * 90} y={80 + r * 80} width="78" height="68" rx="8"
              fill={col ? '#fde68a' : '#f1f5f9'} stroke={col ? '#d97706' : '#cbd5e1'} strokeWidth={col ? 3 : 1} />
          )
        })}
        {cells.map(({ r, c, v }) => (
          <text key={`t${r}${c}`} x={259 + c * 90} y={122 + r * 80} textAnchor="middle" fill="#172033" fontSize="20" fontWeight="800">{v}</text>
        ))}
        <text x="820" y="140" fill="#172033" fontSize="20" fontWeight="900">MPI_Type_vector</text>
        <text x="820" y="184" fill="#475569" fontSize="18">count = 4 blocks</text>
        <text x="820" y="224" fill="#475569" fontSize="18">blocklength = 1</text>
        <text x="820" y="264" fill="#475569" fontSize="18">stride = 4  (row width)</text>
        <text x="820" y="304" fill="#475569" fontSize="18">oldtype = MPI_INT</text>
        <text x="820" y="360" fill="#d97706" fontSize="20" fontWeight="900">one logical datatype</text>
        <text x="820" y="400" fill="#475569" fontSize="18">scattered cells travel as one message</text>
      </svg>
    </div>
  )
}

export function DatatypeLife({ variant }) {
  // ---- variant: the four constructors as distinct memory patterns ---------
  if (variant === 'toolkit') {
    const on = '#7c3aed'
    const off = '#e2e8f0'
    const kits = [
      { name: 'contiguous', fn: 'MPI_Type_contiguous', pat: [1, 1, 1, 1, 0, 0, 0, 0], note: 'consecutive elements' },
      { name: 'vector', fn: 'MPI_Type_vector', pat: [1, 0, 0, 1, 0, 0, 1, 0], note: 'regular stride' },
      { name: 'indexed', fn: 'MPI_Type_indexed', pat: [1, 1, 0, 0, 1, 0, 0, 1], note: 'irregular gaps' },
      { name: 'struct', fn: 'MPI_Type_create_struct', pat: [2, 2, 3, 3, 4, 5, 5, 5], note: 'mixed field types' },
    ]
    const cc = ['', on, '#2563eb', '#0ea5a4', '#d97706', '#059669']
    return (
      <div className="mpi-scene" aria-label="Four derived-datatype constructors shown as memory patterns">
        <svg viewBox="0 0 1200 560">
          {kits.map((k, r) => (
            <g key={k.name} transform={`translate(0 ${36 + r * 128})`}>
              <text x="36" y="36" fill="#172033" fontSize="22" fontWeight="900">{k.name}</text>
              <text x="36" y="64" fill="#5b21b6" fontSize="18" fontWeight="800" fontFamily="ui-monospace, monospace">{k.fn}()</text>
              <text x="36" y="90" fill="#64748b" fontSize="18">{k.note}</text>
              {k.pat.map((v, i) => (
                <rect key={i} x={430 + i * 90} y="18" width="78" height="72" rx="8"
                  fill={typeof v === 'number' && v > 1 ? cc[v] : v ? on : off}
                  stroke={v ? '#334155' : '#cbd5e1'} strokeWidth={v ? 2 : 1} opacity={v ? 1 : 0.7} />
              ))}
            </g>
          ))}
        </svg>
      </div>
    )
  }

  const steps = ['Create', 'Commit', 'Use in Send/Recv', 'Free']
  return (
    <div className="mpi-scene" style={{ display: 'grid', alignContent: 'center', gap: 16, padding: 28 }}>
      <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
        {steps.map((s) => <span key={s} className="mpi-chip purple" style={{ fontSize: 22, padding: '16px 20px' }}>{s}</span>)}
      </div>
      <p className="mpi-formula">MPI_Type_commit(&newtype);   /* then communicate */   MPI_Type_free(&newtype);</p>
    </div>
  )
}

export function PerfTimeline({ variant }) {
  // ---- variant: what to measure — T1, Tp, speedup, efficiency -------------
  if (variant === 'measure') {
    return (
      <div className="mpi-scene" aria-label="Serial time versus parallel time give speedup and efficiency">
        <svg viewBox="0 0 1200 560">
          <text x="60" y="90" fill="#172033" fontSize="22" fontWeight="900">T₁</text>
          <text x="60" y="118" fill="#64748b" fontSize="18">1 process</text>
          <rect x="150" y="60" width="900" height="56" rx="8" fill="#2563eb" />
          <text x="600" y="97" textAnchor="middle" fill="#fff" fontSize="20" fontWeight="900">serial runtime</text>
          <text x="60" y="210" fill="#172033" fontSize="22" fontWeight="900">Tₚ</text>
          <text x="60" y="238" fill="#64748b" fontSize="18">p = 4</text>
          <rect x="150" y="180" width="270" height="56" rx="8" fill="#059669" />
          <text x="285" y="217" textAnchor="middle" fill="#fff" fontSize="20" fontWeight="900">parallel</text>
          <rect x="420" y="180" width="70" height="56" rx="8" fill="#d97706" />
          <text x="455" y="217" textAnchor="middle" fill="#fff" fontSize="18" fontWeight="800">comm</text>
          <path d="M150 300 H1050" stroke="#cbd5e1" strokeWidth="2" />
          <g transform="translate(150 340)">
            <rect x="0" y="0" width="430" height="150" rx="16" fill="#eff6ff" stroke="#2563eb" strokeWidth="2" />
            <text x="215" y="55" textAnchor="middle" fill="#1e3a8a" fontSize="30" fontWeight="900">Sₚ = T₁ / Tₚ</text>
            <text x="215" y="105" textAnchor="middle" fill="#475569" fontSize="18" fontWeight="750">speedup — how many times faster</text>
          </g>
          <g transform="translate(620 340)">
            <rect x="0" y="0" width="430" height="150" rx="16" fill="#ecfdf5" stroke="#059669" strokeWidth="2" />
            <text x="215" y="55" textAnchor="middle" fill="#065f46" fontSize="30" fontWeight="900">Eₚ = Sₚ / p</text>
            <text x="215" y="105" textAnchor="middle" fill="#475569" fontSize="18" fontWeight="750">efficiency — speedup per process</text>
          </g>
        </svg>
      </div>
    )
  }

  return (
    <div className="mpi-scene" aria-label="Runtime split into computation, communication, synchronization, waiting">
      <svg viewBox="0 0 1200 560">
        {[
          ['Computation', 80, 520, '#2563eb'],
          ['Communication', 80, 280, '#d97706'],
          ['Synchronization', 80, 180, '#7c3aed'],
          ['Waiting', 80, 140, '#94a3b8'],
        ].map(([t, , w, c], i) => (
          <g key={t}>
            <text x="40" y={110 + i * 90} fill="#172033" fontSize="20" fontWeight="900">{t}</text>
            <rect x="280" y={80 + i * 90} width={w} height="48" rx="8" fill={c} />
          </g>
        ))}
        <text x="600" y="460" textAnchor="middle" fill="#172033" fontSize="20" fontWeight="800">More ranks help only if useful work grows faster than communication and wait</text>
      </svg>
    </div>
  )
}

export function WtimeScene() {
  return (
    <div className="mpi-scene" aria-label="Barrier, start timer, work, barrier, stop timer">
      <svg viewBox="0 0 1200 560">
        {['Barrier', 'MPI_Wtime start', 'parallel work', 'Barrier', 'MPI_Wtime stop'].map((t, i) => (
          <g key={t}>
            <rect x={40 + i * 230} y="180" width="210" height="90" rx="14" fill={i === 2 ? '#2563eb' : '#0f172a'} />
            <text x={145 + i * 230} y="234" textAnchor="middle" fill="#fff" fontSize="18" fontWeight="900">{t}</text>
          </g>
        ))}
        <text x="600" y="340" textAnchor="middle" fill="#172033" fontSize="20" fontWeight="800">Synchronize before and after the region so every rank measures the same phase</text>
        <text x="600" y="384" textAnchor="middle" fill="#475569" fontSize="18">elapsed = stop − start     then compute Sₚ = T₁ / Tₚ</text>
      </svg>
    </div>
  )
}

export function TinyVsLarge() {
  return (
    <div className="mpi-scene" aria-label="Many tiny messages versus one larger message">
      <svg viewBox="0 0 1200 560">
        <text x="300" y="50" textAnchor="middle" fill="#172033" fontSize="22" fontWeight="900">100 tiny messages</text>
        <text x="900" y="50" textAnchor="middle" fill="#172033" fontSize="22" fontWeight="900">1 larger message</text>
        {Array.from({ length: 10 }).map((_, i) => (
          <circle key={i} cx={120 + (i % 5) * 70} cy={140 + Math.floor(i / 5) * 70} r="16" fill="#f59e0b">
            <animate attributeName="cy" values={`${140 + Math.floor(i / 5) * 70};${300};${140 + Math.floor(i / 5) * 70}`} dur={`${1.6 + i * 0.05}s`} repeatCount="indefinite" />
          </circle>
        ))}
        <rect x="780" y="160" width="240" height="80" rx="12" fill="#059669" />
        <text x="900" y="210" textAnchor="middle" fill="#fff" fontSize="20" fontWeight="900">one payload</text>
        <text x="300" y="420" textAnchor="middle" fill="#b45309" fontSize="18" fontWeight="800">pay startup latency 100 times</text>
        <text x="900" y="420" textAnchor="middle" fill="#047857" fontSize="18" fontWeight="800">pay latency once · use bandwidth</text>
      </svg>
    </div>
  )
}

export function IoMess({ ordered = false, variant }) {
  // ---- variant: I/O routed through the root process -----------------------
  if (variant === 'io') {
    return (
      <div className="mpi-scene" aria-label="Input and output flow through the root process">
        <svg viewBox="0 0 1200 560">
          <rect x="470" y="230" width="260" height="110" rx="16" fill="#2563eb" />
          <text x="600" y="278" textAnchor="middle" fill="#fff" fontSize="24" fontWeight="900">Rank 0</text>
          <text x="600" y="312" textAnchor="middle" fill="#dbeafe" fontSize="18" fontWeight="800">the root / I/O process</text>
          <rect x="80" y="250" width="200" height="70" rx="12" fill="#0f172a" />
          <text x="180" y="285" textAnchor="middle" fill="#fbbf24" fontSize="20" fontWeight="900">stdin</text>
          <text x="180" y="308" textAnchor="middle" fill="#94a3b8" fontSize="18">a, b, n</text>
          <path d="M280 285 H470" stroke="#2563eb" strokeWidth="4" markerEnd="url(#ioA)" />
          <defs><marker id="ioA" markerWidth="12" markerHeight="12" refX="8" refY="6" orient="auto"><path d="M0 0 L10 6 L0 12 z" fill="#2563eb" /></marker></defs>
          <text x="375" y="270" textAnchor="middle" fill="#1e3a8a" fontSize="18" fontWeight="800">read once</text>
          <rect x="920" y="250" width="200" height="70" rx="12" fill="#0f172a" />
          <text x="1020" y="285" textAnchor="middle" fill="#86efac" fontSize="20" fontWeight="900">stdout</text>
          <text x="1020" y="308" textAnchor="middle" fill="#94a3b8" fontSize="18">final result</text>
          <path d="M730 285 H920" stroke="#059669" strokeWidth="4" markerEnd="url(#ioB)" />
          <defs><marker id="ioB" markerWidth="12" markerHeight="12" refX="8" refY="6" orient="auto"><path d="M0 0 L10 6 L0 12 z" fill="#059669" /></marker></defs>
          <text x="825" y="270" textAnchor="middle" fill="#065f46" fontSize="18" fontWeight="800">print once</text>
          {[1, 2, 3].map((r, i) => (
            <g key={r}>
              <rect x={330 + i * 210} y="430" width="150" height="70" rx="12" fill="#fff" stroke={['#0ea5a4', '#7c3aed', '#d97706'][i]} strokeWidth="3" />
              <text x={405 + i * 210} y="473" textAnchor="middle" fill="#172033" fontSize="20" fontWeight="900">Rank {r}</text>
              <path d={`M${405 + i * 210} 430 V350`} stroke="#94a3b8" strokeWidth="2.5" strokeDasharray="5 5" />
            </g>
          ))}
          <text x="600" y="410" textAnchor="middle" fill="#475569" fontSize="18">values distributed to / collected from other ranks by messages</text>
          <text x="600" y="70" textAnchor="middle" fill="#172033" fontSize="22" fontWeight="900">Input and output belong to one process — usually Rank 0</text>
        </svg>
      </div>
    )
  }

  const messy = [
    'R1: local_int=3.1',
    'R0: enter a,b,n',
    'R3: done',
    'R2: local_int=4.2',
    'R0: printing...',
    'R1: waiting',
  ]
  const clean = ['Rank 0 prints', 'then Rank 1', 'then Rank 2', 'then Rank 3']
  const lines = ordered ? clean : messy
  return (
    <div className="mpi-scene" style={{ padding: 24 }}>
      <div className={`mpi-io-lines ${ordered ? 'clean' : 'mess'}`}>
        {lines.map((l, i) => <span key={l} style={{ '--i': i }}>{l}</span>)}
      </div>
    </div>
  )
}

export function Sum18() {
  return (
    <div className="mpi-scene" aria-label="Sum 1 through 8 across four ranks">
      <svg viewBox="0 0 1200 560">
        {[['1+2', '3', 0], ['3+4', '7', 1], ['5+6', '11', 2], ['7+8', '15', 3]].map(([w, s, r]) => (
          <g key={r}>
            <rect x={70 + r * 280} y="60" width="240" height="200" rx="14" fill="#fff" stroke="#2563eb" strokeWidth="3" />
            <text x={190 + r * 280} y="120" textAnchor="middle" fill="#172033" fontSize="22" fontWeight="900">Process {r}</text>
            <text x={190 + r * 280} y="170" textAnchor="middle" fill="#64748b" fontSize="20">{w}</text>
            <text x={190 + r * 280} y="220" textAnchor="middle" fill="#2563eb" fontSize="28" fontWeight="900">{s}</text>
          </g>
        ))}
        <rect x="360" y="320" width="480" height="90" rx="14" fill="#172033" />
        <text x="600" y="376" textAnchor="middle" fill="#fbbf24" fontSize="24" fontWeight="900">3 + 7 + 11 + 15 = 36</text>
        <text x="600" y="460" textAnchor="middle" fill="#172033" fontSize="20">MPI_Reduce() is the convenient combination step</text>
      </svg>
    </div>
  )
}

export function SortLanes({ phase = 'unsorted', variant }) {
  // ---- variant: the four-stage sorting pipeline ---------------------------
  if (variant === 'pipeline') {
    const stages = [
      ['Scatter', 'split data to ranks', '#2563eb'],
      ['Local sort', 'each rank sorts its chunk', '#0ea5a4'],
      ['Exchange', 'compare-split with neighbours', '#7c3aed'],
      ['Merge', 'assemble global order', '#d97706'],
    ]
    return (
      <div className="mpi-scene" aria-label="Parallel sort pipeline: scatter, local sort, exchange, merge">
        <svg viewBox="0 0 1200 560">
          <text x="600" y="70" textAnchor="middle" fill="#172033" fontSize="22" fontWeight="900">one unsorted array → four cooperating stages → one sorted array</text>
          {stages.map(([t, sub, c], i) => (
            <g key={t}>
              <rect x={60 + i * 290} y="150" width="240" height="230" rx="18" fill="#fff" stroke={c} strokeWidth="4" />
              <circle cx={90 + i * 290} cy="185" r="16" fill={c} />
              <text x={90 + i * 290} y="192" textAnchor="middle" fill="#fff" fontSize="18" fontWeight="900">{i + 1}</text>
              <text x={180 + i * 290} y="245" textAnchor="middle" fill="#172033" fontSize="24" fontWeight="900">{t}</text>
              <text x={180 + i * 290} y="285" textAnchor="middle" fill={c} fontSize="18" fontWeight="800">{sub}</text>
              {[0, 1, 2, 3].map((k) => (
                <rect key={k} x={95 + i * 290 + k * 42} y="320" width="34" height="34" rx="6" fill={c} opacity={0.35 + k * 0.15} />
              ))}
              {i < 3 && <path d={`M${300 + i * 290} 265 H${350 + i * 290}`} stroke="#94a3b8" strokeWidth="4" markerEnd="url(#spipe)" />}
            </g>
          ))}
          <defs><marker id="spipe" markerWidth="12" markerHeight="12" refX="8" refY="6" orient="auto"><path d="M0 0 L10 6 L0 12 z" fill="#94a3b8" /></marker></defs>
          <text x="600" y="440" textAnchor="middle" fill="#475569" fontSize="18" fontWeight="750">communication happens only in Scatter, Exchange and Merge</text>
        </svg>
      </div>
    )
  }

  const data = {
    unsorted: [['8 1 5', '9 2 6', '7 3 4', '0 11 10']],
    local: [['1 5 8', '2 6 9', '3 4 7', '0 10 11']],
  }
  const rows = phase === 'local' ? data.local[0] : data.unsorted[0]
  return (
    <div className="mpi-scene mpi-sort-lane">
      {rows.map((vals, i) => (
        <div className="mpi-row" key={i}>
          <b>Rank {i}</b>
          <div className="mpi-cells">
            {vals.split(' ').map((v) => <i key={v}>{v}</i>)}
          </div>
        </div>
      ))}
    </div>
  )
}

export function OddEven({ phase = 'even' }) {
  const even = phase === 'even'
  return (
    <div className="mpi-scene" aria-label={`${phase} phase neighbour exchange`}>
      <svg viewBox="0 0 1200 560">
        <text x="600" y="50" textAnchor="middle" fill="#172033" fontSize="24" fontWeight="900">
          {even ? 'EVEN PHASE  ·  Rank 0 ↔ Rank 1    Rank 2 ↔ Rank 3' : 'ODD PHASE  ·  Rank 1 ↔ Rank 2'}
        </text>
        {[0, 1, 2, 3].map((r) => (
          <rect key={r} x={80 + r * 280} y="140" width="220" height="160" rx="14" fill="#fff"
            stroke={even ? (r < 2 ? '#2563eb' : '#7c3aed') : (r === 1 || r === 2 ? '#d97706' : '#cbd5e1')} strokeWidth="4" />
        ))}
        {[0, 1, 2, 3].map((r) => (
          <text key={`t${r}`} x={190 + r * 280} y="230" textAnchor="middle" fill="#172033" fontSize="22" fontWeight="900">Rank {r}</text>
        ))}
        {even ? (
          <>
            <path d="M300 220 H360" stroke="#2563eb" strokeWidth="6" />
            <path d="M860 220 H920" stroke="#7c3aed" strokeWidth="6" />
          </>
        ) : (
          <path d="M580 220 H640" stroke="#d97706" strokeWidth="6" />
        )}
        <text x="600" y="400" textAnchor="middle" fill="#475569" fontSize="20">
          Neighbours exchange lists, then compare-split
        </text>
      </svg>
    </div>
  )
}

export function CompareSplit() {
  return (
    <div className="mpi-scene" aria-label="Compare-split keeps smaller half on lower rank">
      <svg viewBox="0 0 1200 560">
        <text x="240" y="50" textAnchor="middle" fill="#172033" fontSize="22" fontWeight="900">Rank 0  [1 5 8]</text>
        <text x="960" y="50" textAnchor="middle" fill="#172033" fontSize="22" fontWeight="900">Rank 1  [2 6 9]</text>
        <text x="600" y="110" textAnchor="middle" fill="#64748b" fontSize="18">exchange lists</text>
        <rect x="280" y="140" width="640" height="80" rx="12" fill="#f1f5f9" />
        <text x="600" y="190" textAnchor="middle" fill="#172033" fontSize="24" fontWeight="900">merge  [1 2 5 6 8 9]</text>
        <rect x="80" y="280" width="460" height="140" rx="14" fill="#ecfdf5" stroke="#059669" strokeWidth="3" />
        <text x="310" y="340" textAnchor="middle" fill="#065f46" fontSize="22" fontWeight="900">lower rank keeps</text>
        <text x="310" y="384" textAnchor="middle" fill="#059669" fontSize="26" fontWeight="900">[1 2 5]</text>
        <rect x="660" y="280" width="460" height="140" rx="14" fill="#f5f3ff" stroke="#7c3aed" strokeWidth="3" />
        <text x="890" y="340" textAnchor="middle" fill="#5b21b6" fontSize="22" fontWeight="900">higher rank keeps</text>
        <text x="890" y="384" textAnchor="middle" fill="#7c3aed" fontSize="26" fontWeight="900">[6 8 9]</text>
        <text x="600" y="480" textAnchor="middle" fill="#172033" fontSize="20" fontWeight="800">Compare-split is the engine of odd-even transposition sort</text>
      </svg>
    </div>
  )
}

export function SortExample() {
  return (
    <div className="mpi-scene" aria-label="Scatter sort example from the source PPT">
      <svg viewBox="0 0 1200 560">
        <text x="600" y="40" textAnchor="middle" fill="#172033" fontSize="22" fontWeight="900">Input: [8, 3, 7, 2, 6, 1, 5, 4]</text>
        {[['P0', '[8,3] → [3,8]'], ['P1', '[7,2] → [2,7]'], ['P2', '[6,1] → [1,6]'], ['P3', '[5,4] → [4,5]']].map(([p, t], i) => (
          <g key={p}>
            <rect x={70 + i * 280} y="80" width="240" height="160" rx="14" fill="#fff" stroke="#059669" strokeWidth="3" />
            <text x={190 + i * 280} y="140" textAnchor="middle" fill="#172033" fontSize="22" fontWeight="900">{p}</text>
            <text x={190 + i * 280} y="190" textAnchor="middle" fill="#047857" fontSize="20" fontWeight="800">{t}</text>
          </g>
        ))}
        <rect x="200" y="300" width="800" height="90" rx="14" fill="#172033" />
        <text x="600" y="356" textAnchor="middle" fill="#86efac" fontSize="24" fontWeight="900">Final merged result: [1,2,3,4,5,6,7,8]</text>
        <text x="600" y="440" textAnchor="middle" fill="#475569" fontSize="18">MPI_Scatter can distribute; MPI_Gather can collect after local sorts and merges</text>
      </svg>
    </div>
  )
}

export function GoogleOneSystem() {
  return (
    <div className="mpi-scene" aria-label="User sees one Google; many servers sit behind it">
      <svg viewBox="0 0 1200 560">
        <rect x="420" y="40" width="360" height="80" rx="14" fill="#2563eb" />
        <text x="600" y="90" textAnchor="middle" fill="#fff" fontSize="22" fontWeight="900">user query</text>
        <path d="M600 120 V180" stroke="#2563eb" strokeWidth="4" />
        <rect x="300" y="180" width="600" height="70" rx="14" fill="#fff" stroke="#2563eb" strokeWidth="3" />
        <text x="600" y="224" textAnchor="middle" fill="#172033" fontSize="22" fontWeight="900">appears as ONE Google web server</text>
        {[-2, -1, 0, 1, 2].map((k) => (
          <rect key={k} x={520 + k * 110} y="320" width="90" height="70" rx="10" fill="#0f172a" />
        ))}
        {[-2, -1, 0, 1, 2].map((k) => (
          <text key={`t${k}`} x={565 + k * 110} y="362" textAnchor="middle" fill="#fbbf24" fontSize="18" fontWeight="800">node</text>
        ))}
        <text x="600" y="440" textAnchor="middle" fill="#475569" fontSize="18">geographically and computationally distributed · result in a few seconds</text>
      </svg>
    </div>
  )
}

export function KeyTerms() {
  const rows = [
    ['MPI', 'Message Passing Interface'],
    ['Process', 'Independent execution unit'],
    ['Rank', 'Unique ID of an MPI process'],
    ['Communicator', 'Group of processes that can communicate'],
    ['MPI_COMM_WORLD', 'Default communicator of all launched processes'],
    ['Point-to-point', 'Communication between two processes'],
    ['Collective', 'Communication involving a group'],
    ['Distributed memory', 'Each process has private memory'],
  ]
  return (
    <div className="mpi-scene" style={{ padding: 12, overflow: 'auto' }}>
      <table className="mpi-table">
        <thead><tr><th>Term</th><th>Meaning</th></tr></thead>
        <tbody>
          {rows.map(([a, b]) => <tr key={a}><td>{a}</td><td>{b}</td></tr>)}
        </tbody>
      </table>
    </div>
  )
}
