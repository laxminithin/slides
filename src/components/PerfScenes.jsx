/**
 * PerfScenes — Module 2 teaching visuals.
 * Identity: performance engineering — processor lanes, runtime bars,
 * meters, GPU throughput, speedup curves, hybrid hardware.
 * Concept-native motion. Do not reuse Module 3 rank-cluster language.
 */
import '../perfScenes.css'

function Scene({ label, children, className = '' }) {
  return (
    <div className={`perf-scene ${className}`} aria-label={label}>
      {children}
    </div>
  )
}

export function OpeningInvestigation() {
  return (
    <Scene label="Sequential work becomes multicore, GPU and hybrid. Runtime falls. Overhead appears.">
      <svg viewBox="0 0 1200 560">
        <text x="40" y="42" fill="#0f172a" fontSize="22" fontWeight="900">One sequential workload</text>
        <rect x="40" y="62" width="520" height="44" rx="10" fill="#e11d48" className="pe-anim-pulse" />
        <text x="300" y="92" textAnchor="middle" fill="#fff" fontSize="20" fontWeight="800">80 s on one CPU</text>

        <text x="40" y="150" fill="#0f172a" fontSize="20" fontWeight="900">CPU cores activate</text>
        {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
          <rect key={i} x={40 + i * 66} y="168" width="56" height="36" rx="8" fill="#ea580c" className="pe-anim-spark" style={{ animationDelay: `${i * 0.12}s` }} />
        ))}

        <text x="40" y="246" fill="#0f172a" fontSize="20" fontWeight="900">GPU appears</text>
        {Array.from({ length: 48 }).map((_, i) => (
          <rect key={i} x={40 + (i % 16) * 18} y={262 + Math.floor(i / 16) * 16} width="14" height="12" rx="2" fill="#16a34a" className="pe-anim-spark" style={{ animationDelay: `${(i % 8) * 0.08}s` }} />
        ))}

        <text x="40" y="340" fill="#0f172a" fontSize="20" fontWeight="900">Hybrid cluster</text>
        {[0, 1, 2].map((n) => (
          <g key={n} transform={`translate(${40 + n * 180} 356)`}>
            <rect width="160" height="70" rx="10" fill="#fff" stroke="#0891b2" strokeWidth="3" />
            <text x="80" y="28" textAnchor="middle" fill="#0f172a" fontSize="18" fontWeight="900">Node {n + 1}</text>
            <text x="80" y="52" textAnchor="middle" fill="#0d9488" fontSize="16" fontWeight="800">CPU + GPU</text>
          </g>
        ))}

        <rect x="700" y="70" width="460" height="180" rx="16" fill="#0f172a" />
        <text x="930" y="112" textAnchor="middle" fill="#fbbf24" fontSize="22" fontWeight="900">Runtime falls</text>
        <rect x="740" y="140" width="380" height="28" rx="8" fill="#334155" />
        <rect x="740" y="140" width="160" height="28" rx="8" fill="#16a34a" className="pe-anim-fill" />
        <text x="930" y="210" textAnchor="middle" fill="#fda4af" fontSize="20" fontWeight="800">but overhead also appears</text>

        <rect x="700" y="280" width="460" height="210" rx="16" fill="#fff7ed" stroke="#ea580c" strokeWidth="3" />
        <text x="930" y="350" textAnchor="middle" fill="#9a3412" fontSize="22" fontWeight="900">How much speedup</text>
        <text x="930" y="392" textAnchor="middle" fill="#9a3412" fontSize="22" fontWeight="900">did we really gain?</text>
        <text x="930" y="444" textAnchor="middle" fill="#475569" fontSize="18" fontWeight="700">More processors do not automatically mean more speed.</text>
      </svg>
    </Scene>
  )
}

export function MimdStreams() {
  const rows = [
    [0, 'A', 'physics update', '#ea580c'],
    [1, 'B', 'boundary cells', '#0d9488'],
    [2, 'C', 'file analysis', '#0891b2'],
    [3, 'D', 'visualization', '#7c3aed'],
  ]
  return (
    <Scene label="Four processors run independent instruction streams on independent data">
      <svg viewBox="0 0 1200 560">
        <text x="600" y="40" textAnchor="middle" fill="#0f172a" fontSize="22" fontWeight="900">Multiple Instruction · Multiple Data</text>
        {rows.map(([p, letter, work, c], i) => (
          <g key={p} className="pe-anim-lane" style={{ animationDelay: `${i * 0.2}s` }}>
            <rect x="40" y={70 + i * 115} width="180" height="92" rx="12" fill="#0f172a" />
            <text x="130" y={112 + i * 115} textAnchor="middle" fill="#fff" fontSize="20" fontWeight="900">Processor {p}</text>
            <text x="130" y={140 + i * 115} textAnchor="middle" fill="#fbbf24" fontSize="16" fontWeight="800">independent</text>
            <path d={`M220 ${116 + i * 115} H430`} stroke={c} strokeWidth="4" />
            <rect x="430" y={78 + i * 115} width="280" height="76" rx="10" fill="#fff" stroke={c} strokeWidth="3" />
            <text x="570" y={110 + i * 115} textAnchor="middle" fill="#0f172a" fontSize="20" fontWeight="900">Instruction stream {letter}</text>
            <text x="570" y={138 + i * 115} textAnchor="middle" fill={c} fontSize="18" fontWeight="800">{work}</text>
            <path d={`M710 ${116 + i * 115} H920`} stroke={c} strokeWidth="4" />
            <rect x="920" y={78 + i * 115} width="240" height="76" rx="10" fill="#fff7ed" stroke={c} strokeWidth="3" />
            <text x="1040" y={124 + i * 115} textAnchor="middle" fill="#0f172a" fontSize="20" fontWeight="900">Data {letter}</text>
          </g>
        ))}
      </svg>
    </Scene>
  )
}

export function SharedMimdArch() {
  return (
    <Scene label="Shared-memory MIMD: processors connected to common memory">
      <svg viewBox="0 0 1200 560">
        <text x="600" y="48" textAnchor="middle" fill="#0f172a" fontSize="24" fontWeight="900">Shared-memory MIMD</text>
        {[0, 1, 2, 3].map((i) => (
          <g key={i}>
            <rect x={120 + i * 250} y="90" width="180" height="90" rx="12" fill="#fff" stroke="#ea580c" strokeWidth="3" />
            <text x={210 + i * 250} y="144" textAnchor="middle" fill="#0f172a" fontSize="22" fontWeight="900">P{i}</text>
            <path d={`M${210 + i * 250} 180 V250`} stroke="#ea580c" strokeWidth="4" />
          </g>
        ))}
        <rect x="90" y="250" width="1020" height="90" rx="14" fill="#fff7ed" stroke="#c2410c" strokeWidth="3" />
        <text x="600" y="306" textAnchor="middle" fill="#9a3412" fontSize="24" fontWeight="900">COMMON MEMORY</text>
        <text x="600" y="400" textAnchor="middle" fill="#475569" fontSize="20" fontWeight="700">Threads share variables. Locks, barriers and cache coherence keep copies consistent.</text>
        <text x="600" y="440" textAnchor="middle" fill="#0d9488" fontSize="18" fontWeight="800">Module 4 will program this layer with OpenMP. Here we only measure its cost.</text>
      </svg>
    </Scene>
  )
}

export function DistMimdArch() {
  return (
    <Scene label="Distributed-memory MIMD: processor plus local memory connected by interconnect">
      <svg viewBox="0 0 1200 560">
        <text x="600" y="44" textAnchor="middle" fill="#0f172a" fontSize="24" fontWeight="900">Distributed-memory MIMD</text>
        {[0, 1, 2, 3].map((i) => (
          <g key={i} transform={`translate(${70 + i * 280} 90)`}>
            <rect width="220" height="150" rx="14" fill="#fff" stroke="#0891b2" strokeWidth="3" />
            <text x="110" y="48" textAnchor="middle" fill="#0f172a" fontSize="22" fontWeight="900">Processor {i}</text>
            <rect x="18" y="70" width="184" height="58" rx="8" fill="#ecfeff" />
            <text x="110" y="108" textAnchor="middle" fill="#0e7490" fontSize="18" fontWeight="800">local memory {i}</text>
          </g>
        ))}
        <rect x="80" y="300" width="1040" height="64" rx="32" fill="#0f172a" />
        <text x="600" y="342" textAnchor="middle" fill="#fbbf24" fontSize="22" fontWeight="900">INTERCONNECT  ·  messages, not shared variables</text>
        {[0, 1, 2, 3].map((i) => (
          <path key={i} d={`M${180 + i * 280} 240 V300`} stroke="#0891b2" strokeWidth="4" />
        ))}
        <text x="600" y="420" textAnchor="middle" fill="#475569" fontSize="20" fontWeight="700">Processor 0 cannot read Processor 3’s memory. It must send.</text>
        <text x="600" y="458" textAnchor="middle" fill="#ea580c" fontSize="18" fontWeight="800">Module 3 will program this layer with MPI. Here we only see the network cost.</text>
      </svg>
    </Scene>
  )
}

export function MimdWorkloads() {
  const jobs = [
    ['Weather physics', 'branching solver', '#ea580c'],
    ['File analysis', 'irregular I/O', '#0d9488'],
    ['Database query', 'control-heavy', '#0891b2'],
    ['Visualization', 'independent task', '#7c3aed'],
  ]
  return (
    <Scene label="Independent MIMD workloads running at once">
      <div className="pe-chip-row">
        {jobs.map(([t, s, c], i) => (
          <article key={t} className="pe-chip" style={{ '--i': i, borderColor: c }}>
            <strong style={{ color: c }}>{t}</strong>
            <span>{s}</span>
            <span>own instruction stream</span>
          </article>
        ))}
      </div>
    </Scene>
  )
}

export function RuntimeParts({ parts, title = 'Where the runtime went' }) {
  const total = parts.reduce((s, p) => s + p[1], 0)
  return (
    <Scene label={title}>
      <svg viewBox="0 0 1200 560">
        <text x="40" y="48" fill="#0f172a" fontSize="22" fontWeight="900">{title}</text>
        {parts.map(([name, val, color], i) => {
          const w = (val / total) * 1120
          const x = 40 + parts.slice(0, i).reduce((s, p) => s + (p[1] / total) * 1120, 0)
          return (
            <g key={name}>
              <rect x={x} y="80" width={w - 6} height="90" rx="10" fill={color} className="pe-anim-fill" style={{ animationDelay: `${i * 0.12}s` }} />
              <text x={x + w / 2} y="134" textAnchor="middle" fill="#fff" fontSize="18" fontWeight="800">{name}</text>
              <text x={40} y={220 + i * 48} fill={color} fontSize="20" fontWeight="800">{name}</text>
              <text x="420" y={220 + i * 48} fill="#0f172a" fontSize="20" fontWeight="800">{val}%</text>
              <rect x="520" y={202 + i * 48} width="640" height="22" rx="8" fill="#e2e8f0" />
              <rect x="520" y={202 + i * 48} width={(val / 100) * 640} height="22" rx="8" fill={color} />
            </g>
          )
        })}
      </svg>
    </Scene>
  )
}

export function ProgrammingModels() {
  const models = [
    ['Shared memory', 'common address space'],
    ['Message passing', 'send and receive'],
    ['Threads', 'lightweight workers'],
    ['Data parallel', 'same op, many elements'],
  ]
  return (
    <Scene label="Four parallel programming models">
      <div className="pe-chip-row">
        {models.map(([t, s], i) => (
          <article key={t} className="pe-chip" style={{ '--i': i }}>
            <strong>{t}</strong>
            <span>{s}</span>
          </article>
        ))}
      </div>
    </Scene>
  )
}

export function FeatureTable() {
  const rows = [
    ['Architecture', 'Latency-oriented', 'Throughput-oriented'],
    ['Core count', 'Typically 4 to 64', 'Hundreds to thousands'],
    ['Processing mode', 'Serial execution', 'Parallel execution'],
    ['Control logic', 'Complex branching / scheduling', 'Reduced control, repeated ops'],
    ['Cache', 'Large L1 / L2 / L3', 'Smaller cache, high bandwidth'],
    ['Ideal workload', 'OS, program control, sequential', 'Vector, matrix, image, ML'],
  ]
  return (
    <Scene label="CPU versus GPU feature table from the source PPT">
      <div style={{ padding: 18, display: 'grid', placeItems: 'center', height: '100%' }}>
        <table className="pe-table compact">
          <thead>
            <tr><th>Feature</th><th>CPU (Host)</th><th>GPU (Device)</th></tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r[0]}>{r.map((c) => <td key={c}>{c}</td>)}</tr>
            ))}
          </tbody>
        </table>
      </div>
    </Scene>
  )
}

export function CpuStrengths() {
  const items = [
    ['Versatility', 'OS and mixed applications'],
    ['Sequential strength', 'program logic, step-by-step'],
    ['Multi-tasking', 'cores and threads'],
    ['Limit', 'not thousands of ops at once'],
  ]
  return (
    <Scene label="CPU advantages and the parallel limit">
      <div className="pe-chip-row">
        {items.map(([t, s], i) => (
          <article key={t} className="pe-chip" style={{ '--i': i, borderColor: i === 3 ? '#e11d48' : '#ea580c' }}>
            <strong>{t}</strong>
            <span>{s}</span>
          </article>
        ))}
      </div>
    </Scene>
  )
}

export function CpuGpuArena() {
  return (
    <Scene label="CPU few powerful cores versus GPU many lightweight lanes">
      <svg viewBox="0 0 1200 560">
        <rect x="40" y="50" width="520" height="460" rx="18" fill="#fff" stroke="#ea580c" strokeWidth="3" />
        <text x="300" y="96" textAnchor="middle" fill="#ea580c" fontSize="26" fontWeight="900">CPU · Host</text>
        <text x="300" y="132" textAnchor="middle" fill="#475569" fontSize="18">latency / control</text>
        {[0, 1, 2, 3].map((i) => (
          <g key={i}>
            <rect x={80 + (i % 2) * 210} y={170 + Math.floor(i / 2) * 140} width="180" height="110" rx="12" fill="#fff7ed" stroke="#ea580c" strokeWidth="2" className="pe-anim-pulse" style={{ animationDelay: `${i * 0.2}s` }} />
            <text x={170 + (i % 2) * 210} y={220 + Math.floor(i / 2) * 140} textAnchor="middle" fill="#0f172a" fontSize="20" fontWeight="900">Core {i}</text>
            <text x={170 + (i % 2) * 210} y={248 + Math.floor(i / 2) * 140} textAnchor="middle" fill="#9a3412" fontSize="16">cache + control</text>
          </g>
        ))}
        <rect x="640" y="50" width="520" height="460" rx="18" fill="#fff" stroke="#16a34a" strokeWidth="3" />
        <text x="900" y="96" textAnchor="middle" fill="#16a34a" fontSize="26" fontWeight="900">GPU · Device</text>
        <text x="900" y="132" textAnchor="middle" fill="#475569" fontSize="18">throughput / data parallelism</text>
        {Array.from({ length: 12 * 8 }).map((_, i) => (
          <rect key={i} x={670 + (i % 12) * 38} y={160 + Math.floor(i / 12) * 38} width="30" height="28" rx="5" fill="#16a34a" className="pe-anim-spark" style={{ animationDelay: `${(i % 12) * 0.05}s` }} />
        ))}
      </svg>
    </Scene>
  )
}

export function HeterogeneousPair() {
  return (
    <Scene label="CPU host and GPU device working together">
      <svg viewBox="0 0 1200 560">
        <rect x="60" y="80" width="380" height="360" rx="16" fill="#fff" stroke="#ea580c" strokeWidth="3" />
        <text x="250" y="140" textAnchor="middle" fill="#ea580c" fontSize="24" fontWeight="900">CPU HOST</text>
        <text x="250" y="190" textAnchor="middle" fill="#0f172a" fontSize="20" fontWeight="800">OS · control flow</text>
        <text x="250" y="230" textAnchor="middle" fill="#0f172a" fontSize="20" fontWeight="800">memory management</text>
        <text x="250" y="290" textAnchor="middle" fill="#475569" fontSize="18">allocates, copies, launches</text>
        <path d="M440 260 H760" stroke="#f59e0b" strokeWidth="6" />
        <circle r="12" fill="#f59e0b">
          <animateMotion dur="2s" repeatCount="indefinite" path="M440 260 H760" />
        </circle>
        <text x="600" y="240" textAnchor="middle" fill="#b45309" fontSize="18" fontWeight="800">heterogeneous</text>
        <rect x="760" y="80" width="380" height="360" rx="16" fill="#fff" stroke="#16a34a" strokeWidth="3" />
        <text x="950" y="140" textAnchor="middle" fill="#16a34a" fontSize="24" fontWeight="900">GPU DEVICE</text>
        <text x="950" y="190" textAnchor="middle" fill="#0f172a" fontSize="20" fontWeight="800">co-processor</text>
        <text x="950" y="230" textAnchor="middle" fill="#0f172a" fontSize="20" fontWeight="800">hundreds–thousands of threads</text>
        <text x="950" y="290" textAnchor="middle" fill="#475569" fontSize="18">shared device memory + fast local memory</text>
      </svg>
    </Scene>
  )
}

export function HostDeviceFlow({ step = 3 }) {
  const steps = [
    ['CPU HOST', 'allocate / prepare data'],
    ['COPY', 'HOST → DEVICE'],
    ['GPU KERNEL', 'thousands of threads'],
    ['COPY', 'DEVICE → HOST'],
    ['CPU', 'receives result'],
  ]
  return (
    <Scene label="Host-device workflow with data movement">
      <svg viewBox="0 0 1200 560">
        {steps.map(([a, b], i) => (
          <g key={a + i} opacity={i <= step ? 1 : 0.28}>
            <rect x={40 + i * 230} y="180" width="210" height="160" rx="14" fill={i === 2 ? '#16a34a' : '#fff'} stroke="#ea580c" strokeWidth="3" />
            <text x={145 + i * 230} y="248" textAnchor="middle" fill={i === 2 ? '#fff' : '#0f172a'} fontSize="20" fontWeight="900">{a}</text>
            <text x={145 + i * 230} y="290" textAnchor="middle" fill={i === 2 ? '#d1fae5' : '#9a3412'} fontSize="16" fontWeight="800">{b}</text>
            {i < 4 && <path d={`M${250 + i * 230} 260 H${270 + i * 230}`} stroke="#f59e0b" strokeWidth="5" />}
          </g>
        ))}
        <path id="pe-h2d" d="M145 180 C 400 40, 800 40, 1055 180" fill="none" />
        <circle r="10" fill="#ea580c">
          <animateMotion dur="2.8s" repeatCount="indefinite"><mpath href="#pe-h2d" /></animateMotion>
        </circle>
        <text x="600" y="80" textAnchor="middle" fill="#475569" fontSize="20" fontWeight="800">Data must move. Computation is not free of transfer.</text>
        <text x="600" y="430" textAnchor="middle" fill="#0f172a" fontSize="20" fontWeight="800">1 Offload  ·  2 Kernel  ·  3 Retrieve</text>
        <text x="600" y="470" textAnchor="middle" fill="#0d9488" fontSize="18" fontWeight="700">Module 5 will write the CUDA for this path.</text>
      </svg>
    </Scene>
  )
}

export function ThreeStepComm() {
  const captions = [
    '1. Copy input from CPU memory to GPU memory',
    '2. Load GPU program and execute, caching on chip',
    '3. Copy results from GPU memory to CPU memory',
  ]
  return (
    <Scene label="Three-step communication between CPU and GPU">
      <svg viewBox="0 0 1200 560">
        <rect x="40" y="60" width="280" height="300" rx="14" fill="#fff" stroke="#ea580c" strokeWidth="3" />
        <text x="180" y="110" textAnchor="middle" fill="#ea580c" fontSize="22" fontWeight="900">CPU</text>
        <rect x="70" y="140" width="220" height="50" rx="8" fill="#ffedd5" />
        <text x="180" y="172" textAnchor="middle" fill="#0f172a" fontSize="18" fontWeight="800">cores</text>
        <rect x="70" y="210" width="220" height="36" rx="8" fill="#e11d48" />
        <text x="180" y="234" textAnchor="middle" fill="#fff" fontSize="16" fontWeight="800">PCI / interconnect</text>
        <rect x="70" y="268" width="220" height="60" rx="8" fill="#ffedd5" />
        <text x="180" y="306" textAnchor="middle" fill="#0f172a" fontSize="18" fontWeight="800">CPU memory</text>
        <rect x="420" y="40" width="740" height="340" rx="16" fill="#fff" stroke="#16a34a" strokeWidth="3" />
        <text x="790" y="84" textAnchor="middle" fill="#16a34a" fontSize="22" fontWeight="900">GPU</text>
        {Array.from({ length: 8 * 5 }).map((_, i) => (
          <rect key={i} x={460 + (i % 8) * 82} y={110 + Math.floor(i / 8) * 32} width="70" height="24" rx="4" fill="#86efac" className="pe-anim-spark" style={{ animationDelay: `${(i % 8) * 0.06}s` }} />
        ))}
        <rect x="460" y="290" width="660" height="60" rx="8" fill="#bbf7d0" />
        <text x="790" y="328" textAnchor="middle" fill="#14532d" fontSize="20" fontWeight="900">GPU DRAM</text>
        <path d="M290 300 C 340 300, 380 320, 460 320" stroke="#f59e0b" strokeWidth="8" fill="none" />
        {captions.map((c, i) => (
          <text key={c} x="40" y={430 + i * 36} fill="#0f172a" fontSize="20" fontWeight="800">{c}</text>
        ))}
      </svg>
    </Scene>
  )
}

export function MultiprocessorArch() {
  return (
    <Scene label="GPU architecture: device memory, multiprocessors, cores, shared memory">
      <svg viewBox="0 0 1200 560">
        <rect x="60" y="40" width="1080" height="70" rx="12" fill="#16a34a" />
        <text x="600" y="86" textAnchor="middle" fill="#fff" fontSize="24" fontWeight="900">Device Memory (global)</text>
        {[0, 1, 2].map((i) => {
          const x = 80 + i * 370
          const label = i === 2 ? 'Multiprocessor n' : `Multiprocessor ${i + 1}`
          return (
            <g key={i}>
              <path d={`M${x + 160} 110 V160`} stroke="#0f172a" strokeWidth="4" />
              <rect x={x} y="160" width="320" height="200" rx="12" fill="#fef3c7" stroke="#d97706" strokeWidth="3" />
              <text x={x + 160} y="196" textAnchor="middle" fill="#0f172a" fontSize="20" fontWeight="900">{label}</text>
              {['Core 1', 'Core 2', i === 2 ? 'Core p' : 'Core 3'].map((c, k) => (
                <rect key={c} x={x + 24 + k * 96} y="220" width="84" height="50" rx="8" fill="#0891b2" className="pe-anim-spark" style={{ animationDelay: `${k * 0.15}s` }} />
              ))}
              {['Core 1', 'Core 2', i === 2 ? 'Core p' : 'Core 3'].map((c, k) => (
                <text key={`${c}t`} x={x + 66 + k * 96} y="252" textAnchor="middle" fill="#fff" fontSize="16" fontWeight="800">{c}</text>
              ))}
              <rect x={x + 20} y="400" width="280" height="70" rx="10" fill="#dbeafe" stroke="#2563eb" strokeWidth="2" />
              <text x={x + 160} y="444" textAnchor="middle" fill="#1e3a8a" fontSize="18" fontWeight="800">Registers + Shared Memory</text>
            </g>
          )
        })}
      </svg>
    </Scene>
  )
}

export function ComputeDeviceScene() {
  return (
    <Scene label="Compute device, GPU RAM, workload distributor, compute units and processing elements">
      <svg viewBox="0 0 1200 560">
        <rect x="40" y="40" width="1120" height="80" rx="12" fill="#0f172a" />
        <text x="600" y="90" textAnchor="middle" fill="#fbbf24" fontSize="22" fontWeight="900">Workload distributor  ·  instructions and data from the CPU</text>
        <rect x="40" y="150" width="1120" height="360" rx="16" fill="#fff" stroke="#16a34a" strokeWidth="3" />
        <text x="600" y="196" textAnchor="middle" fill="#16a34a" fontSize="22" fontWeight="900">Compute device</text>
        {[0, 1, 2].map((i) => (
          <g key={i} transform={`translate(${80 + i * 360} 230)`}>
            <rect width="320" height="160" rx="12" fill="#ecfdf5" stroke="#059669" strokeWidth="2" />
            <text x="160" y="40" textAnchor="middle" fill="#0f172a" fontSize="20" fontWeight="900">Compute unit {i + 1}</text>
            <text x="160" y="74" textAnchor="middle" fill="#047857" fontSize="18">ALUs + processing elements</text>
            {[0, 1, 2, 3].map((k) => (
              <rect key={k} x={24 + k * 72} y="96" width="60" height="40" rx="6" fill="#16a34a" className="pe-anim-spark" style={{ animationDelay: `${k * 0.1}s` }} />
            ))}
          </g>
        ))}
        <rect x="80" y="420" width="1040" height="60" rx="10" fill="#bbf7d0" />
        <text x="600" y="458" textAnchor="middle" fill="#14532d" fontSize="20" fontWeight="900">GPU RAM / global memory</text>
      </svg>
    </Scene>
  )
}

export function GpuMemoryTypes() {
  const rows = [
    ['per-thread', 'local / private / registers', 'fastest, tiny'],
    ['per-block', 'shared / local memory', 'on-chip, crew shelf'],
    ['per-grid', 'global memory', 'large, high latency'],
    ['per-grid read-only', 'constant memory', 'cached broadcast'],
  ]
  return (
    <Scene label="GPU memory types">
      <svg viewBox="0 0 1200 560">
        {rows.map(([a, b, c], i) => (
          <g key={a}>
            <rect x="60" y={50 + i * 120} width="1080" height="100" rx="14" fill="#fff" stroke={['#ea580c', '#0d9488', '#0891b2', '#7c3aed'][i]} strokeWidth="3" />
            <text x="200" y={108 + i * 120} fill="#0f172a" fontSize="22" fontWeight="900">{a}</text>
            <text x="620" y={108 + i * 120} textAnchor="middle" fill="#334155" fontSize="22" fontWeight="800">{b}</text>
            <text x="1040" y={108 + i * 120} textAnchor="end" fill="#9a3412" fontSize="20" fontWeight="800">{c}</text>
          </g>
        ))}
      </svg>
    </Scene>
  )
}

export function HwVsSwView() {
  return (
    <Scene label="GPU hardware view versus software view">
      <svg viewBox="0 0 1200 560">
        <text x="300" y="50" textAnchor="middle" fill="#0f172a" fontSize="24" fontWeight="900">Hardware</text>
        <text x="900" y="50" textAnchor="middle" fill="#0f172a" fontSize="24" fontWeight="900">Software</text>
        {[
          [120, 'GPU device', 720, 'Kernel'],
          [120, 'Multiprocessor', 720, 'Block'],
          [120, 'CUDA core / PE', 720, 'Thread'],
        ].map(([x1, a, x2, b], i) => (
          <g key={a}>
            <rect x={x1} y={90 + i * 140} width="360" height="110" rx="12" fill="#ecfdf5" stroke="#16a34a" strokeWidth="3" />
            <text x={x1 + 180} y={154 + i * 140} textAnchor="middle" fill="#0f172a" fontSize="22" fontWeight="900">{a}</text>
            <path d={`M${x1 + 360} ${145 + i * 140} H${x2}`} stroke="#f59e0b" strokeWidth="4" />
            <rect x={x2} y={90 + i * 140} width="360" height="110" rx="12" fill="#fff7ed" stroke="#ea580c" strokeWidth="3" />
            <text x={x2 + 180} y={154 + i * 140} textAnchor="middle" fill="#0f172a" fontSize="22" fontWeight="900">{b}</text>
          </g>
        ))}
      </svg>
    </Scene>
  )
}

export function GridBlocksThreads() {
  return (
    <Scene label="Grid of blocks of threads">
      <svg viewBox="0 0 1200 560">
        <rect x="40" y="40" width="1120" height="480" rx="16" fill="#fff" stroke="#0d9488" strokeWidth="3" />
        <text x="600" y="84" textAnchor="middle" fill="#0f172a" fontSize="24" fontWeight="900">GRID</text>
        {[0, 1, 2].map((b) => (
          <g key={b} transform={`translate(${80 + b * 360} 120)`}>
            <rect width="320" height="340" rx="12" fill="#ecfeff" stroke="#0891b2" strokeWidth="3" />
            <text x="160" y="40" textAnchor="middle" fill="#0e7490" fontSize="20" fontWeight="900">Block {b}</text>
            {Array.from({ length: 16 }).map((_, t) => (
              <rect key={t} x={20 + (t % 4) * 72} y={70 + Math.floor(t / 4) * 60} width="60" height="44" rx="8" fill="#16a34a" className="pe-anim-spark" style={{ animationDelay: `${t * 0.05}s` }} />
            ))}
          </g>
        ))}
      </svg>
    </Scene>
  )
}

export function GoodGpuArray() {
  return (
    <Scene label="Large array, one independent operation per element">
      <svg viewBox="0 0 1200 560">
        <text x="600" y="48" textAnchor="middle" fill="#0f172a" fontSize="22" fontWeight="900">C[i] = A[i] + B[i]  ·  one thread per element</text>
        {Array.from({ length: 16 }).map((_, i) => (
          <g key={i}>
            <rect x={40 + i * 72} y="90" width="64" height="70" rx="8" fill="#ffedd5" />
            <text x={72 + i * 72} y="134" textAnchor="middle" fill="#0f172a" fontSize="18" fontWeight="800">A{i}</text>
            <rect x={40 + i * 72} y="180" width="64" height="70" rx="8" fill="#ccfbf1" />
            <text x={72 + i * 72} y="224" textAnchor="middle" fill="#0f172a" fontSize="18" fontWeight="800">B{i}</text>
            <path d={`M${72 + i * 72} 250 V300`} stroke="#16a34a" strokeWidth="3" />
            <rect x={40 + i * 72} y="300" width="64" height="70" rx="8" fill="#16a34a" className="pe-anim-spark" style={{ animationDelay: `${i * 0.06}s` }} />
            <text x={72 + i * 72} y="344" textAnchor="middle" fill="#fff" fontSize="18" fontWeight="800">C{i}</text>
          </g>
        ))}
        <text x="600" y="430" textAnchor="middle" fill="#0d9488" fontSize="20" fontWeight="800">vector · matrix · image · simulation · ML</text>
        <text x="600" y="470" textAnchor="middle" fill="#475569" fontSize="18">Same operation, independent elements, enough work to fill the GPU.</text>
      </svg>
    </Scene>
  )
}

export function BadGpuWork() {
  return (
    <Scene label="Poor GPU workloads: small, branchy, or transfer-heavy">
      <svg viewBox="0 0 1200 560">
        {[
          [60, 'Small job', 'launch overhead wins', '#e11d48'],
          [430, 'Branch-heavy', 'irregular control', '#ea580c'],
          [800, 'Transfer-heavy', 'copy costs more than compute', '#b45309'],
        ].map(([x, t, s, c], i) => (
          <g key={t}>
            <rect x={x} y="80" width="340" height="360" rx="16" fill="#fff" stroke={c} strokeWidth="3" />
            <text x={x + 170} y="160" textAnchor="middle" fill={c} fontSize="24" fontWeight="900">{t}</text>
            <text x={x + 170} y="220" textAnchor="middle" fill="#0f172a" fontSize="20" fontWeight="800">{s}</text>
            <text x={x + 170} y="280" textAnchor="middle" fill="#475569" fontSize="18">{['tiny array', 'linked list / nested if', 'few FLOPs per byte'][i]}</text>
          </g>
        ))}
      </svg>
    </Scene>
  )
}

export function GpuDieBoard() {
  const parts = [
    ['GPU Die', 'compute units live here'],
    ['VRAM', 'high-speed graphics memory'],
    ['Cooling', 'keeps the die in range'],
    ['Power + I/O', 'motherboard and display'],
  ]
  return (
    <Scene label="Physical GPU board components">
      <div className="pe-chip-row">
        {parts.map(([t, s], i) => (
          <article key={t} className="pe-chip" style={{ '--i': i }}>
            <strong>{t}</strong>
            <span>{s}</span>
          </article>
        ))}
      </div>
    </Scene>
  )
}

export function Gtx280() {
  return (
    <Scene label="NVIDIA GeForce GTX 280: 240 cores, SIMD, host-initiated">
      <svg viewBox="0 0 1200 560">
        <rect x="80" y="60" width="1040" height="440" rx="18" fill="#0f172a" />
        <text x="600" y="130" textAnchor="middle" fill="#fbbf24" fontSize="28" fontWeight="900">NVIDIA GeForce GTX 280</text>
        <text x="600" y="190" textAnchor="middle" fill="#fff" fontSize="24" fontWeight="800">240 cores</text>
        <text x="600" y="250" textAnchor="middle" fill="#99f6e4" fontSize="20">heavily multithreaded · in-order · SIMD</text>
        <text x="600" y="310" textAnchor="middle" fill="#fdba74" fontSize="20">cores share control and instruction cache</text>
        <text x="600" y="390" textAnchor="middle" fill="#e2e8f0" fontSize="20" fontWeight="800">Not standalone — CPU initiates work and transfers data</text>
        <text x="600" y="440" textAnchor="middle" fill="#94a3b8" fontSize="18">Source architecture example from the Module 2 PPT</text>
      </svg>
    </Scene>
  )
}

export function HybridCluster3() {
  return (
    <Scene label="Three hybrid nodes, each with CPU cores and a GPU, networked">
      <svg viewBox="0 0 1200 560">
        {[0, 1, 2].map((n) => (
          <g key={n} transform={`translate(${70 + n * 380} 50)`}>
            <rect width="340" height="300" rx="16" fill="#fff" stroke="#0891b2" strokeWidth="3" />
            <text x="170" y="44" textAnchor="middle" fill="#0f172a" fontSize="22" fontWeight="900">NODE {n + 1}</text>
            {[0, 1, 2, 3].map((c) => (
              <rect key={c} x={24 + c * 76} y="70" width="66" height="50" rx="8" fill="#ea580c" />
            ))}
            <text x="170" y="148" textAnchor="middle" fill="#9a3412" fontSize="16" fontWeight="800">CPU cores · OpenMP</text>
            <rect x="40" y="170" width="260" height="90" rx="10" fill="#16a34a" />
            <text x="170" y="224" textAnchor="middle" fill="#fff" fontSize="20" fontWeight="900">GPU · CUDA</text>
          </g>
        ))}
        <rect x="80" y="400" width="1040" height="70" rx="35" fill="#0f172a" />
        <text x="600" y="444" textAnchor="middle" fill="#fbbf24" fontSize="22" fontWeight="900">NETWORK  ·  MPI across nodes</text>
        <text x="600" y="520" textAnchor="middle" fill="#475569" fontSize="18">MPI + OpenMP + CUDA/OpenCL control hybrid hardware</text>
      </svg>
    </Scene>
  )
}

export function HybridModels() {
  const items = [
    ['MPI + OpenMP', 'messages across nodes, threads inside a node'],
    ['MPI + CUDA / OpenCL', 'distribute data, accelerate kernels'],
    ['PGAS + MPI', 'global address abstraction plus messages'],
  ]
  return (
    <Scene label="Common hybrid programming models">
      <div className="pe-chip-row" style={{ gridAutoFlow: 'row', gridTemplateColumns: '1fr', gridAutoColumns: 'unset' }}>
        {items.map(([t, s], i) => (
          <article key={t} className="pe-chip" style={{ '--i': i, textAlign: 'left', padding: '22px 28px' }}>
            <strong>{t}</strong>
            <span>{s}</span>
          </article>
        ))}
      </div>
    </Scene>
  )
}

export function HybridWorkflow() {
  const steps = ['Workload', 'Partition nodes', 'CPU threads', 'GPU kernel', 'Combine']
  return (
    <Scene label="Hybrid execution story">
      <svg viewBox="0 0 1200 560">
        {steps.map((s, i) => (
          <g key={s}>
            <rect x={40 + i * 232} y="200" width="210" height="140" rx="14" fill="#fff" stroke="#ea580c" strokeWidth="3" className="pe-anim-fill" style={{ animationDelay: `${i * 0.15}s` }} />
            <text x={145 + i * 232} y="280" textAnchor="middle" fill="#0f172a" fontSize="20" fontWeight="900">{s}</text>
            {i < 4 && <path d={`M${250 + i * 232} 270 H${272 + i * 232}`} stroke="#f59e0b" strokeWidth="5" />}
          </g>
        ))}
        <text x="600" y="120" textAnchor="middle" fill="#0f172a" fontSize="22" fontWeight="900">Each hardware level takes the work it does best</text>
        <text x="600" y="430" textAnchor="middle" fill="#475569" fontSize="18">MPI splits regions · OpenMP uses cores · CUDA/OpenCL accelerates arrays</text>
      </svg>
    </Scene>
  )
}

export function HybridMemoryNode() {
  return (
    <Scene label="One node: MPI process, OpenMP threads, shared memory">
      <svg viewBox="0 0 1200 560">
        <rect x="80" y="50" width="1040" height="430" rx="18" fill="#fff" stroke="#0891b2" strokeWidth="3" />
        <text x="600" y="100" textAnchor="middle" fill="#0f172a" fontSize="24" fontWeight="900">1 MPI process  ·  OpenMP threads on cores</text>
        <rect x="140" y="140" width="920" height="90" rx="12" fill="#ecfeff" />
        <text x="600" y="196" textAnchor="middle" fill="#0e7490" fontSize="22" fontWeight="900">SHARED MEMORY</text>
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <g key={i}>
            <rect x={170 + i * 150} y="270" width="120" height="90" rx="10" fill="#ea580c" />
            <text x={230 + i * 150} y="324" textAnchor="middle" fill="#fff" fontSize="18" fontWeight="900">Core {i}</text>
          </g>
        ))}
        <text x="600" y="430" textAnchor="middle" fill="#475569" fontSize="18">Scale this picture across computers on a high-performance network</text>
      </svg>
    </Scene>
  )
}

export function SerialVsParallel() {
  return (
    <Scene label="Serial processing versus parallel processing">
      <svg viewBox="0 0 1200 560">
        <text x="300" y="50" textAnchor="middle" fill="#0f172a" fontSize="22" fontWeight="900">Serial</text>
        <text x="900" y="50" textAnchor="middle" fill="#0f172a" fontSize="22" fontWeight="900">Parallel</text>
        {['A', 'B', 'C', 'D'].map((ch, i) => (
          <g key={ch}>
            <rect x="160" y={80 + i * 90} width="280" height="70" rx="10" fill="#e11d48" />
            <text x="300" y={124 + i * 90} textAnchor="middle" fill="#fff" fontSize="22" fontWeight="900">Task {ch}</text>
          </g>
        ))}
        {['A', 'B', 'C', 'D'].map((ch, i) => (
          <g key={`p${ch}`}>
            <rect x={640 + (i % 2) * 240} y={120 + Math.floor(i / 2) * 160} width="200" height="110" rx="12" fill="#16a34a" className="pe-anim-spark" style={{ animationDelay: `${i * 0.1}s` }} />
            <text x={740 + (i % 2) * 240} y={184 + Math.floor(i / 2) * 160} textAnchor="middle" fill="#fff" fontSize="22" fontWeight="900">Task {ch}</text>
          </g>
        ))}
      </svg>
    </Scene>
  )
}

export function RuntimeClocks() {
  return (
    <Scene label="Serial 80 seconds versus parallel 12 seconds">
      <svg viewBox="0 0 1200 560">
        <circle cx="300" cy="250" r="150" fill="#fff" stroke="#e11d48" strokeWidth="10" />
        <circle cx="300" cy="250" r="150" fill="none" stroke="#fecaca" strokeWidth="10" className="pe-anim-clock" />
        <text x="300" y="240" textAnchor="middle" fill="#e11d48" fontSize="48" fontWeight="900">80 s</text>
        <text x="300" y="290" textAnchor="middle" fill="#0f172a" fontSize="20" fontWeight="800">Tserial</text>
        <text x="900" y="240" textAnchor="middle" fill="#16a34a" fontSize="48" fontWeight="900">12 s</text>
        <circle cx="900" cy="250" r="150" fill="none" stroke="#16a34a" strokeWidth="10" />
        <text x="900" y="290" textAnchor="middle" fill="#0f172a" fontSize="20" fontWeight="800">Tparallel(8)</text>
        <text x="600" y="500" textAnchor="middle" fill="#9a3412" fontSize="22" fontWeight="900">Same input  ·  equivalent output  ·  then divide</text>
      </svg>
    </Scene>
  )
}

export function SpeedupRace() {
  return (
    <Scene label="80 seconds versus 12 seconds becomes 6.67 times faster">
      <svg viewBox="0 0 1200 560">
        <text x="40" y="60" fill="#0f172a" fontSize="22" fontWeight="900">Sequential lane</text>
        <rect x="40" y="80" width="900" height="70" rx="12" fill="#e11d48" />
        <text x="490" y="126" textAnchor="middle" fill="#fff" fontSize="24" fontWeight="900">80 seconds</text>
        <text x="40" y="220" fill="#0f172a" fontSize="22" fontWeight="900">8 processors</text>
        <rect x="40" y="240" width="135" height="70" rx="12" fill="#16a34a" className="pe-anim-fill" />
        <text x="108" y="286" textAnchor="middle" fill="#fff" fontSize="22" fontWeight="900">12 s</text>
        <rect x="300" y="360" width="600" height="120" rx="16" fill="#0f172a" />
        <text x="600" y="410" textAnchor="middle" fill="#fbbf24" fontSize="22" fontWeight="800">80 / 12</text>
        <text x="600" y="454" textAnchor="middle" fill="#fff" fontSize="36" fontWeight="900">6.67×</text>
      </svg>
    </Scene>
  )
}

export function SpeedupT1T2() {
  return (
    <Scene label="Ideal speedup example T1 equals 1 second, T2 equals 0.5 seconds">
      <svg viewBox="0 0 1200 560">
        <rect x="80" y="80" width="440" height="320" rx="16" fill="#fff" stroke="#e11d48" strokeWidth="3" />
        <text x="300" y="140" textAnchor="middle" fill="#e11d48" fontSize="22" fontWeight="900">System 1</text>
        <text x="300" y="200" textAnchor="middle" fill="#0f172a" fontSize="20">N = 1</text>
        <text x="300" y="260" textAnchor="middle" fill="#0f172a" fontSize="36" fontWeight="900">T₁ = 1 s</text>
        <rect x="680" y="80" width="440" height="320" rx="16" fill="#fff" stroke="#16a34a" strokeWidth="3" />
        <text x="900" y="140" textAnchor="middle" fill="#16a34a" fontSize="22" fontWeight="900">System 2 (enhanced)</text>
        <text x="900" y="200" textAnchor="middle" fill="#0f172a" fontSize="20">N = 2  ·  ideal</text>
        <text x="900" y="260" textAnchor="middle" fill="#0f172a" fontSize="36" fontWeight="900">T₂ = 0.5 s</text>
        <text x="600" y="460" textAnchor="middle" fill="#9a3412" fontSize="24" fontWeight="900">Speedup = 1 / 0.5 = 2  (double fast)</text>
        <text x="600" y="500" textAnchor="middle" fill="#475569" fontSize="18">Also: old execution time / new execution time = t / (t/2) = 2</text>
      </svg>
    </Scene>
  )
}

export function SpeedupCurve({ mode = 'sublinear' }) {
  const actual = {
    ideal: 'M80 460 L1040 40',
    sublinear: 'M80 460 C 280 300, 520 200, 1040 140',
    amdahl: 'M80 460 C 260 180, 520 110, 1040 90',
  }
  return (
    <Scene label="Speedup versus processors">
      <svg viewBox="0 0 1200 560">
        <path d="M80 40 V460 H1100" fill="none" stroke="#0f172a" strokeWidth="3" />
        <text x="40" y="36" fill="#0f172a" fontSize="18" fontWeight="800">S(p)</text>
        <text x="1080" y="500" fill="#0f172a" fontSize="18" fontWeight="800">p</text>
        <path d="M80 460 L1040 40" fill="none" stroke="#94a3b8" strokeWidth="3" strokeDasharray="10 8" />
        <path d={actual[mode]} fill="none" stroke="#ea580c" strokeWidth="6" className="pe-anim-trace" />
        {[1, 2, 4, 8, 16, 32, 64].map((p, i) => (
          <text key={p} x={80 + i * 145} y="530" textAnchor="middle" fill="#334155" fontSize="18" fontWeight="800">{p}</text>
        ))}
        <text x="860" y="80" fill="#64748b" fontSize="18" fontWeight="800">ideal S(p)=p</text>
        <text x="700" y={mode === 'amdahl' ? 150 : 200} fill="#ea580c" fontSize="18" fontWeight="800">{mode === 'amdahl' ? 'Amdahl ceiling' : 'measured'}</text>
      </svg>
    </Scene>
  )
}

export function EfficiencyLanes({ active = 6.67, total = 8 }) {
  return (
    <Scene label="Eight processing lanes with 83.4 percent useful work">
      <svg viewBox="0 0 1200 560">
        {Array.from({ length: total }).map((_, i) => {
          const fill = i < Math.floor(active) ? '#16a34a' : i === Math.floor(active) ? 'url(#pe-partial)' : '#e2e8f0'
          return (
            <g key={i}>
              <rect x={70 + i * 140} y="80" width="110" height="320" rx="14" fill={fill} />
              <text x={125 + i * 140} y="250" textAnchor="middle" fill={i < active ? '#fff' : '#64748b'} fontSize="22" fontWeight="900">P{i}</text>
            </g>
          )
        })}
        <defs>
          <linearGradient id="pe-partial" x1="0" x2="0" y1="1" y2="0">
            <stop offset="0" stopColor="#16a34a" />
            <stop offset="0.67" stopColor="#16a34a" />
            <stop offset="0.67" stopColor="#fecaca" />
            <stop offset="1" stopColor="#fecaca" />
          </linearGradient>
        </defs>
        <text x="600" y="460" textAnchor="middle" fill="#0f172a" fontSize="24" fontWeight="900">E(8) = 6.67 / 8 = 0.834 = 83.4%</text>
        <text x="600" y="504" textAnchor="middle" fill="#e11d48" fontSize="18" fontWeight="800">the pale tops are overhead and idle capacity</text>
      </svg>
    </Scene>
  )
}

export function LoadBalance({ balanced = true }) {
  const heights = balanced ? [260, 260, 260, 260] : [140, 160, 150, 340]
  return (
    <Scene label={balanced ? 'Balanced workers finish together' : 'Unbalanced: three idle while one works'}>
      <svg viewBox="0 0 1200 560">
        {heights.map((h, i) => (
          <g key={i}>
            <rect x={120 + i * 260} y={400 - h} width="180" height={h} rx="12" fill={balanced ? '#16a34a' : i === 3 ? '#ea580c' : '#94a3b8'} />
            <text x={210 + i * 260} y="440" textAnchor="middle" fill="#0f172a" fontSize="20" fontWeight="900">Worker {i}</text>
            {!balanced && i < 3 && <text x={210 + i * 260} y={400 - h - 16} textAnchor="middle" fill="#e11d48" fontSize="18" fontWeight="800">idle</text>}
          </g>
        ))}
      </svg>
    </Scene>
  )
}

export function PerfTable({ highlight = 8 }) {
  const rows = [
    [1, '80.0 s', '1.00', '100%'],
    [2, '43.0 s', '1.86', '93%'],
    [4, '23.0 s', '3.48', '87%'],
    [8, '12.0 s', '6.67', '83.4%'],
  ]
  return (
    <Scene label="Performance table p, T(p), S(p), E(p)">
      <div style={{ padding: 24, display: 'grid', placeItems: 'center', height: '100%' }}>
        <table className="pe-table">
          <thead>
            <tr><th>p</th><th>T(p)</th><th>S(p)</th><th>E(p)</th></tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r[0]} className={r[0] === highlight ? 'lit' : ''}>
                {r.map((c) => <td key={c}>{c}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Scene>
  )
}

export function HashamStory() {
  return (
    <Scene label="Amdahl intuition: three friends wait for the slowest">
      <svg viewBox="0 0 1200 560">
        <text x="600" y="48" textAnchor="middle" fill="#0f172a" fontSize="22" fontWeight="900">They must all reach the door together</text>
        {[
          [80, 'Arham', 'car', '#16a34a', 0.9],
          [440, 'Jalal', 'bus', '#f59e0b', 0.55],
          [800, 'Hasham', 'on foot', '#e11d48', 0.22],
        ].map(([x, n, how, c, f]) => (
          <g key={n}>
            <rect x={x} y="90" width="320" height="280" rx="16" fill="#fff" stroke={c} strokeWidth="3" />
            <text x={x + 160} y="150" textAnchor="middle" fill="#0f172a" fontSize="24" fontWeight="900">{n}</text>
            <text x={x + 160} y="196" textAnchor="middle" fill={c} fontSize="20" fontWeight="800">{how}</text>
            <rect x={x + 40} y="230" width="240" height="28" rx="8" fill="#e2e8f0" />
            <rect x={x + 40} y="230" width={240 * f} height="28" rx="8" fill={c} className="pe-anim-fill" />
            <text x={x + 160} y="310" textAnchor="middle" fill="#475569" fontSize="18">{n === 'Hasham' ? 'the serial part' : 'already waiting'}</text>
          </g>
        ))}
        <text x="600" y="430" textAnchor="middle" fill="#9a3412" fontSize="22" fontWeight="900">Faster cars do not help until Hasham arrives</text>
        <text x="600" y="476" textAnchor="middle" fill="#475569" fontSize="18">Concentrate on the part that cannot be sped up — that is Amdahl’s point.</text>
      </svg>
    </Scene>
  )
}

export function AmdahlTimeline({ p = 8 }) {
  const par = Math.max(40, 720 / p)
  return (
    <Scene label="Serial fraction stays fixed while parallel work is split">
      <svg viewBox="0 0 1200 560">
        <text x="40" y="50" fill="#0f172a" fontSize="20" fontWeight="900">p = {p}  ·  10% serial stays  ·  90% parallel shrinks</text>
        <text x="40" y="120" fill="#e11d48" fontSize="20" fontWeight="800">SERIAL</text>
        <rect x="200" y="86" width="160" height="56" rx="8" fill="#e11d48" />
        <text x="40" y="220" fill="#16a34a" fontSize="20" fontWeight="800">PARALLEL</text>
        {Array.from({ length: Math.min(p, 8) }).map((_, i) => (
          <rect key={i} x="200" y={180 + i * 28} width={par} height="22" rx="6" fill="#16a34a" className="pe-anim-shrink" />
        ))}
        <text x="40" y="460" fill="#0f172a" fontSize="22" fontWeight="900">Students should see the limit before they see the equation.</text>
      </svg>
    </Scene>
  )
}

export function AmdahlNumeric({ title, lines }) {
  return (
    <Scene label={title}>
      <svg viewBox="0 0 1200 560">
        <rect x="80" y="50" width="1040" height="460" rx="18" fill="#fff" stroke="#e11d48" strokeWidth="3" />
        <text x="600" y="110" textAnchor="middle" fill="#e11d48" fontSize="24" fontWeight="900">{title}</text>
        {lines.map((line, i) => (
          <text key={line} x="600" y={180 + i * 52} textAnchor="middle" fill="#0f172a" fontSize="22" fontWeight="800">{line}</text>
        ))}
      </svg>
    </Scene>
  )
}

export function SmaxCeiling() {
  return (
    <Scene label="Maximum speedup equals 1 over serial fraction">
      <svg viewBox="0 0 1200 560">
        {[
          ['10% serial', 'Smax = 10×'],
          ['5% serial', 'Smax = 20×'],
          ['1% serial', 'Smax = 100×'],
        ].map(([a, b], i) => (
          <g key={a}>
            <rect x={70 + i * 370} y="80" width="340" height="280" rx="16" fill="#fff" stroke="#e11d48" strokeWidth="3" />
            <text x={240 + i * 370} y="180" textAnchor="middle" fill="#0f172a" fontSize="22" fontWeight="900">{a}</text>
            <text x={240 + i * 370} y="250" textAnchor="middle" fill="#e11d48" fontSize="32" fontWeight="900">{b}</text>
          </g>
        ))}
        <text x="600" y="430" textAnchor="middle" fill="#475569" fontSize="20">Even infinitely many processors cannot remove the serial fraction.</text>
        <path d="M80 480 C 300 430, 700 410, 1120 400" fill="none" stroke="#ea580c" strokeWidth="5" className="pe-anim-trace" />
      </svg>
    </Scene>
  )
}

export function DiminishingReturns() {
  const vals = [1, 1.8, 3.1, 4.7, 6.0, 6.9, 7.4]
  const ps = [1, 2, 4, 8, 16, 32, 64]
  return (
    <Scene label="Speedup improves quickly then flattens">
      <svg viewBox="0 0 1200 560">
        <path d="M80 40 V460 H1120" fill="none" stroke="#0f172a" strokeWidth="3" />
        <text x="36" y="36" fill="#0f172a" fontSize="18" fontWeight="800">S</text>
        {vals.map((v, i) => {
          const x = 120 + i * 140
          const y = 460 - v * 48
          return (
            <g key={ps[i]}>
              <circle cx={x} cy={y} r="10" fill="#ea580c" />
              <text x={x} y="500" textAnchor="middle" fill="#334155" fontSize="18" fontWeight="800">{ps[i]}</text>
              {i > 0 && <line x1={120 + (i - 1) * 140} y1={460 - vals[i - 1] * 48} x2={x} y2={y} stroke="#ea580c" strokeWidth="4" />}
            </g>
          )
        })}
        <text x="600" y="40" textAnchor="middle" fill="#0f172a" fontSize="20" fontWeight="900">1 → 2 → 4 → 8 → 16 → 32 → 64 processors</text>
      </svg>
    </Scene>
  )
}

export function AmdahlFamily() {
  return (
    <Scene label="Amdahl curves for different parallel fractions">
      <svg viewBox="0 0 1200 560">
        <path d="M80 40 V460 H1120" fill="none" stroke="#0f172a" strokeWidth="3" />
        <path d="M80 460 L1040 40" fill="none" stroke="#cbd5e1" strokeWidth="3" strokeDasharray="8 8" />
        <path d="M80 460 C 400 300, 800 280, 1040 270" fill="none" stroke="#94a3b8" strokeWidth="4" />
        <path d="M80 460 C 320 220, 760 170, 1040 150" fill="none" stroke="#f59e0b" strokeWidth="4" />
        <path d="M80 460 C 280 140, 700 90, 1040 70" fill="none" stroke="#ea580c" strokeWidth="5" className="pe-anim-trace" />
        <text x="1080" y="80" fill="#ea580c" fontSize="18" fontWeight="800">95%</text>
        <text x="1080" y="160" fill="#f59e0b" fontSize="18" fontWeight="800">90%</text>
        <text x="1080" y="280" fill="#64748b" fontSize="18" fontWeight="800">50%</text>
        <text x="600" y="520" textAnchor="middle" fill="#0f172a" fontSize="18" fontWeight="800">parallel portion  ·  ideal line is not reality</text>
      </svg>
    </Scene>
  )
}

export function StrongSplit({ pieces = 4 }) {
  return (
    <Scene label="Strong scaling: one fixed workload split into more pieces">
      <svg viewBox="0 0 1200 560">
        <text x="600" y="48" textAnchor="middle" fill="#0f172a" fontSize="22" fontWeight="900">Fixed problem size  ·  more processors  ·  smaller pieces</text>
        {Array.from({ length: pieces }).map((_, i) => (
          <rect key={i} x={80 + (i % 4) * 270} y={100 + Math.floor(i / 4) * 200} width={240} height={pieces === 1 ? 360 : 160} rx="14" fill="#ea580c" opacity={0.85} />
        ))}
        <text x="600" y="500" textAnchor="middle" fill="#475569" fontSize="18">Goal: lower runtime. Overhead ratio grows as pieces shrink.</text>
      </svg>
    </Scene>
  )
}

export function WeakGrow({ pies = 4 }) {
  return (
    <Scene label="Weak scaling: more pies as more processors appear">
      <svg viewBox="0 0 1200 560">
        <text x="600" y="48" textAnchor="middle" fill="#0f172a" fontSize="22" fontWeight="900">Problem size grows with p  ·  work per processor stays similar</text>
        {Array.from({ length: pies }).map((_, i) => (
          <circle key={i} cx={140 + (i % 4) * 260} cy={i < 4 ? 230 : 400} r="90" fill="#0d9488" className="pe-anim-spark" style={{ animationDelay: `${i * 0.12}s` }} />
        ))}
        <text x="600" y="530" textAnchor="middle" fill="#475569" fontSize="18">Goal: runtime stays approximately stable.</text>
      </svg>
    </Scene>
  )
}

export function StrongVsWeak() {
  return (
    <Scene label="Strong scaling splits one pie; weak scaling adds pies">
      <svg viewBox="0 0 1200 560">
        <text x="300" y="50" textAnchor="middle" fill="#ea580c" fontSize="24" fontWeight="900">STRONG</text>
        <circle cx="300" cy="220" r="120" fill="#fed7aa" />
        <line x1="300" y1="100" x2="300" y2="340" stroke="#9a3412" strokeWidth="4" />
        <line x1="180" y1="220" x2="420" y2="220" stroke="#9a3412" strokeWidth="4" />
        <text x="300" y="400" textAnchor="middle" fill="#0f172a" fontSize="18">same pie, more slices</text>
        <text x="900" y="50" textAnchor="middle" fill="#0d9488" fontSize="24" fontWeight="900">WEAK</text>
        {[0, 1, 2, 3].map((i) => (
          <circle key={i} cx={780 + (i % 2) * 200} cy={170 + Math.floor(i / 2) * 180} r="70" fill="#5eead4" />
        ))}
        <text x="900" y="520" textAnchor="middle" fill="#0f172a" fontSize="18">more pies as hardware grows</text>
      </svg>
    </Scene>
  )
}

export function IsoefficiencyFlow() {
  const steps = ['p ↑', 'overhead ↑', 'problem size must ↑', 'efficiency held']
  return (
    <Scene label="Isoefficiency intuition">
      <svg viewBox="0 0 1200 560">
        {steps.map((s, i) => (
          <g key={s}>
            <rect x={50 + i * 290} y="180" width="250" height="160" rx="14" fill="#fff" stroke="#7c3aed" strokeWidth="3" />
            <text x={175 + i * 290} y="270" textAnchor="middle" fill="#0f172a" fontSize="22" fontWeight="900">{s}</text>
            {i < 3 && <path d={`M${300 + i * 290} 260 H${340 + i * 290}`} stroke="#a855f7" strokeWidth="5" />}
          </g>
        ))}
      </svg>
    </Scene>
  )
}

export function WrongTimer() {
  return (
    <Scene label="Wrong timing includes unrelated I/O and misses synchronization">
      <svg viewBox="0 0 1200 560">
        <rect x="60" y="70" width="1080" height="90" rx="12" fill="#fecaca" />
        <text x="600" y="128" textAnchor="middle" fill="#9f1239" fontSize="22" fontWeight="900">WRONG: timer includes print / file I/O / no barrier</text>
        {['prepare', 'I/O noise', 'parallel work', 'more I/O'].map((s, i) => (
          <rect key={s} x={80 + i * 280} y="220" width="250" height="120" rx="12" fill={i === 2 ? '#16a34a' : '#e11d48'} />
        ))}
        {['prepare', 'I/O noise', 'parallel work', 'more I/O'].map((s, i) => (
          <text key={`${s}t`} x={205 + i * 280} y="290" textAnchor="middle" fill="#fff" fontSize="20" fontWeight="900">{s}</text>
        ))}
        <text x="600" y="420" textAnchor="middle" fill="#0f172a" fontSize="20">The red regions are not the parallel program you think you measured.</text>
      </svg>
    </Scene>
  )
}

export function TimingPipeline() {
  const steps = ['prepare', 'warm-up', 'sync', 'start', 'parallel work', 'sync', 'stop', 'repeat']
  return (
    <Scene label="Correct timing workflow">
      <svg viewBox="0 0 1200 560">
        {steps.map((s, i) => (
          <g key={s}>
            <rect x={30 + (i % 4) * 290} y={80 + Math.floor(i / 4) * 210} width="260" height="150" rx="14" fill={s === 'parallel work' ? '#16a34a' : '#fff'} stroke="#ea580c" strokeWidth="3" />
            <text x={160 + (i % 4) * 290} y={165 + Math.floor(i / 4) * 210} textAnchor="middle" fill={s === 'parallel work' ? '#fff' : '#0f172a'} fontSize="22" fontWeight="900">{s}</text>
          </g>
        ))}
      </svg>
    </Scene>
  )
}

export function WallClockTools() {
  const tools = [
    ['wall-clock', 'elapsed time of the whole program'],
    ['MPI_Wtime', 'Module 3 context'],
    ['omp_get_wtime', 'Module 4 context'],
    ['CUDA events', 'Module 5 context'],
  ]
  return (
    <Scene label="Wall-clock timing tools at module level">
      <div className="pe-chip-row">
        {tools.map(([t, s], i) => (
          <article key={t} className="pe-chip" style={{ '--i': i }}>
            <strong>{t}</strong>
            <span>{s}</span>
          </article>
        ))}
      </div>
    </Scene>
  )
}

export function GpuTotalTime() {
  return (
    <Scene label="Total GPU time is transfer plus kernel plus transfer back">
      <svg viewBox="0 0 1200 560">
        {[
          [60, 280, 'HOST → DEVICE', '#ea580c'],
          [360, 420, 'KERNEL', '#16a34a'],
          [800, 280, 'DEVICE → HOST', '#ea580c'],
        ].map(([x, w, t, c]) => (
          <g key={t}>
            <rect x={x} y="180" width={w} height="140" rx="14" fill={c} />
            <text x={x + w / 2} y="262" textAnchor="middle" fill="#fff" fontSize="22" fontWeight="900">{t}</text>
          </g>
        ))}
        <text x="600" y="100" textAnchor="middle" fill="#0f172a" fontSize="24" fontWeight="900">TOTAL GPU TIME</text>
        <text x="600" y="400" textAnchor="middle" fill="#9a3412" fontSize="20">Do not report kernel time alone.</text>
      </svg>
    </Scene>
  )
}

export function GpuSpeedup8x() {
  return (
    <Scene label="CPU 2.4 seconds versus GPU total 0.30 seconds is 8 times">
      <svg viewBox="0 0 1200 560">
        <rect x="80" y="120" width="440" height="240" rx="16" fill="#fff" stroke="#ea580c" strokeWidth="3" />
        <text x="300" y="200" textAnchor="middle" fill="#ea580c" fontSize="22" fontWeight="900">CPU</text>
        <text x="300" y="270" textAnchor="middle" fill="#0f172a" fontSize="40" fontWeight="900">2.4 s</text>
        <rect x="680" y="120" width="440" height="240" rx="16" fill="#fff" stroke="#16a34a" strokeWidth="3" />
        <text x="900" y="200" textAnchor="middle" fill="#16a34a" fontSize="22" fontWeight="900">GPU total (with transfer)</text>
        <text x="900" y="270" textAnchor="middle" fill="#0f172a" fontSize="40" fontWeight="900">0.30 s</text>
        <text x="600" y="440" textAnchor="middle" fill="#0f172a" fontSize="28" fontWeight="900">2.4 / 0.30 = 8×</text>
        <text x="600" y="490" textAnchor="middle" fill="#9a3412" fontSize="18">Transfer time is included in the 0.30 s.</text>
      </svg>
    </Scene>
  )
}

export function ArithmeticIntensity() {
  return (
    <Scene label="Vector addition is memory bound; matrix multiply reuses data">
      <svg viewBox="0 0 1200 560">
        <rect x="60" y="70" width="520" height="380" rx="16" fill="#fff" stroke="#e11d48" strokeWidth="3" />
        <text x="320" y="140" textAnchor="middle" fill="#e11d48" fontSize="24" fontWeight="900">Vector addition</text>
        <text x="320" y="210" textAnchor="middle" fill="#0f172a" fontSize="20">few FLOPs per byte moved</text>
        <text x="320" y="270" textAnchor="middle" fill="#475569" fontSize="18">memory-bandwidth bound</text>
        <rect x="620" y="70" width="520" height="380" rx="16" fill="#fff" stroke="#16a34a" strokeWidth="3" />
        <text x="880" y="140" textAnchor="middle" fill="#16a34a" fontSize="24" fontWeight="900">Matrix multiplication</text>
        <text x="880" y="210" textAnchor="middle" fill="#0f172a" fontSize="20">many FLOPs per byte reused</text>
        <text x="880" y="270" textAnchor="middle" fill="#475569" fontSize="18">more likely compute-bound</text>
      </svg>
    </Scene>
  )
}

export function OccupancyLanes({ filled = 10, total = 16 }) {
  return (
    <Scene label="Occupancy: unused GPU lanes versus more active work">
      <svg viewBox="0 0 1200 560">
        {Array.from({ length: total }).map((_, i) => (
          <rect key={i} x={40 + (i % 8) * 145} y={80 + Math.floor(i / 8) * 180} width="120" height="140" rx="12" fill={i < filled ? '#16a34a' : '#e2e8f0'} className={i < filled ? 'pe-anim-spark' : 'pe-anim-idle'} />
        ))}
        <text x="600" y="480" textAnchor="middle" fill="#0f172a" fontSize="20" fontWeight="800">Higher occupancy hides latency. 100% occupancy is not automatically peak performance.</text>
      </svg>
    </Scene>
  )
}

export function WarpDiverge() {
  return (
    <Scene label="Warp divergence: IF and ELSE serialize">
      <svg viewBox="0 0 1200 560">
        <text x="600" y="48" textAnchor="middle" fill="#0f172a" fontSize="22" fontWeight="900">One warp / group takes both paths, one after the other</text>
        {Array.from({ length: 8 }).map((_, i) => (
          <rect key={i} x={80 + i * 130} y="80" width="110" height="70" rx="10" fill="#0f172a" />
        ))}
        <text x="600" y="124" textAnchor="middle" fill="#fff" fontSize="18" fontWeight="800">threads 0–7</text>
        <rect x="80" y="200" width="500" height="90" rx="12" fill="#16a34a" />
        <text x="330" y="255" textAnchor="middle" fill="#fff" fontSize="22" fontWeight="900">IF path runs</text>
        <rect x="620" y="200" width="500" height="90" rx="12" fill="#94a3b8" className="pe-anim-idle" />
        <text x="870" y="255" textAnchor="middle" fill="#fff" fontSize="22" fontWeight="900">ELSE waits</text>
        <rect x="80" y="330" width="500" height="90" rx="12" fill="#94a3b8" className="pe-anim-idle" />
        <text x="330" y="385" textAnchor="middle" fill="#fff" fontSize="22" fontWeight="900">IF waits</text>
        <rect x="620" y="330" width="500" height="90" rx="12" fill="#ea580c" />
        <text x="870" y="385" textAnchor="middle" fill="#fff" fontSize="22" fontWeight="900">ELSE path runs</text>
        <text x="600" y="480" textAnchor="middle" fill="#9a3412" fontSize="20" fontWeight="800">Warp time ≈ THEN + ELSE</text>
      </svg>
    </Scene>
  )
}

export function CoalesceVsScatter() {
  return (
    <Scene label="Regular coalesced access versus scattered access">
      <svg viewBox="0 0 1200 560">
        <text x="300" y="50" textAnchor="middle" fill="#16a34a" fontSize="22" fontWeight="900">Coalesced</text>
        {Array.from({ length: 10 }).map((_, i) => (
          <rect key={i} x={80 + i * 44} y="90" width="38" height="70" rx="6" fill="#16a34a" />
        ))}
        <path d="M80 200 H 516" stroke="#16a34a" strokeWidth="8" />
        <text x="300" y="250" textAnchor="middle" fill="#0f172a" fontSize="18">neighbors walk together</text>
        <text x="900" y="50" textAnchor="middle" fill="#e11d48" fontSize="22" fontWeight="900">Scattered</text>
        {[0, 2, 5, 7, 9].map((i) => (
          <rect key={i} x={680 + i * 40} y="90" width="38" height="70" rx="6" fill="#e11d48" />
        ))}
        <path d="M700 200 Q 820 280 960 200 T 1100 260" fill="none" stroke="#e11d48" strokeWidth="5" />
        <text x="900" y="320" textAnchor="middle" fill="#0f172a" fontSize="18">many separate memory transactions</text>
      </svg>
    </Scene>
  )
}

export function ThreeWayChoice() {
  const cols = [
    ['CPU / MIMD', 'control-heavy · serial · irregular', '#ea580c'],
    ['GPU', 'massive data parallelism', '#16a34a'],
    ['Hybrid', 'combine system strengths', '#0891b2'],
  ]
  return (
    <Scene label="CPU versus GPU versus hybrid">
      <svg viewBox="0 0 1200 560">
        {cols.map(([t, s, c], i) => (
          <g key={t}>
            <rect x={50 + i * 380} y="70" width="350" height="380" rx="18" fill="#fff" stroke={c} strokeWidth="4" />
            <text x={225 + i * 380} y="160" textAnchor="middle" fill={c} fontSize="26" fontWeight="900">{t}</text>
            <text x={225 + i * 380} y="240" textAnchor="middle" fill="#0f172a" fontSize="20" fontWeight="800">best for</text>
            <text x={225 + i * 380} y="300" textAnchor="middle" fill="#334155" fontSize="20" fontWeight="700">{s}</text>
          </g>
        ))}
      </svg>
    </Scene>
  )
}

export function OnePicture() {
  const items = ['MIMD', 'GPU', 'Hybrid', 'Tserial', 'Speedup', 'Efficiency', 'Overhead', 'Amdahl', 'Scaling', 'Timing']
  return (
    <Scene label="Module 2 in one picture">
      <svg viewBox="0 0 1200 560">
        {items.map((t, i) => (
          <g key={t}>
            <rect x={40 + (i % 5) * 230} y={50 + Math.floor(i / 5) * 240} width="210" height="180" rx="16" fill="#fff" stroke="#ea580c" strokeWidth="3" />
            <text x={145 + (i % 5) * 230} y={150 + Math.floor(i / 5) * 240} textAnchor="middle" fill="#0f172a" fontSize="22" fontWeight="900">{t}</text>
          </g>
        ))}
      </svg>
    </Scene>
  )
}

export function KeyFormulas() {
  const formulas = [
    'S(p) = Tserial / Tparallel(p)',
    'E(p) = S(p) / p',
    'S(p) = 1 / [s + (1 − s)/p]',
    'Smax = 1 / s',
  ]
  return (
    <Scene label="Key Module 2 formulas">
      <svg viewBox="0 0 1200 560">
        {formulas.map((f, i) => (
          <g key={f}>
            <rect x="80" y={40 + i * 125} width="1040" height="100" rx="14" fill="#fff7ed" stroke="#ea580c" strokeWidth="2" />
            <text x="600" y={100 + i * 125} textAnchor="middle" fill="#0f172a" fontSize="28" fontWeight="800">{f}</text>
          </g>
        ))}
      </svg>
    </Scene>
  )
}

export function ResourceHub() {
  return (
    <div className="pe-resource">
      <a href="#/parallel-computing/module-2/notes">
        <strong>Module Notes</strong>
        <span>Concise revision after the lecture. Architecture unchanged.</span>
      </a>
      <a href="#/parallel-computing/module-2/previous-year-questions">
        <strong>Previous Year Questions</strong>
        <span>Viva, 2 marks, 5 marks and 10 marks practice.</span>
      </a>
    </div>
  )
}

export function LangStrip() {
  const langs = [
    ['CUDA', 'NVIDIA GPU platform'],
    ['OpenCL', 'cross-vendor heterogeneous'],
    ['OpenMP', 'shared-memory threads'],
    ['HIP', 'portable GPU language'],
  ]
  return (
    <Scene label="Parallel programming languages from the source PPT">
      <div className="pe-chip-row">
        {langs.map(([t, s], i) => (
          <article key={t} className="pe-chip" style={{ '--i': i }}>
            <strong>{t}</strong>
            <span>{s}</span>
          </article>
        ))}
      </div>
    </Scene>
  )
}

export function GpuFeatures() {
  const items = [
    ['2D / 3D rendering', 'smooth visuals'],
    ['Advanced software', 'CAD and video tools'],
    ['Cross-device', 'phones, consoles, TVs'],
    ['Color processing', 'YUV and accuracy'],
    ['AI / ML', 'large-dataset parallel work'],
  ]
  return (
    <Scene label="Features of GPUs">
      <div className="pe-chip-row">
        {items.map(([t, s], i) => (
          <article key={t} className="pe-chip" style={{ '--i': i }}>
            <strong>{t}</strong>
            <span>{s}</span>
          </article>
        ))}
      </div>
    </Scene>
  )
}

export function UseCases() {
  const items = [
    ['AI & Deep Learning', 'matrix multiply / LLMs'],
    ['Scientific research', 'weather and molecules'],
    ['Gaming & rendering', 'physics and ray tracing'],
    ['Autonomous systems', 'camera and LiDAR'],
    ['Finance', 'many simulations'],
    ['Crypto / imaging / VR', 'source-supported uses'],
  ]
  return (
    <Scene label="GPU computing use cases">
      <div className="pe-chip-row" style={{ gridAutoFlow: 'row', gridTemplateColumns: 'repeat(3, minmax(0,1fr))', gridAutoColumns: 'unset' }}>
        {items.map(([t, s], i) => (
          <article key={t} className="pe-chip" style={{ '--i': i }}>
            <strong>{t}</strong>
            <span>{s}</span>
          </article>
        ))}
      </div>
    </Scene>
  )
}
