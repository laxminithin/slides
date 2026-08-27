/**
 * FoundScenes — Module 1 teaching visuals.
 * Identity: foundations of parallelism — architecture cutaways,
 * decomposition, instruction/data streams, topology, memory layouts.
 * Do not reuse Module 2 meters or Module 3 MPI rank clusters.
 */
import '../foundScenes.css'

function Scene({ label, children, className = '' }) {
  return (
    <div className={`found-scene ${className}`} aria-label={label}>
      {children}
    </div>
  )
}

export function ParallelOriginScene() {
  return (
    <Scene label="One sequential workload fractures into many processing elements and recombines">
      <svg viewBox="0 0 1200 560">
        <text x="40" y="42" fill="#1c1917" fontSize="22" fontWeight="900">One problem. Many processing elements. One coordinated result.</text>
        <rect x="40" y="70" width="280" height="70" rx="12" fill="#9f1239" className="fo-anim-pulse" />
        <text x="180" y="114" textAnchor="middle" fill="#fff" fontSize="22" fontWeight="900">WORKLOAD</text>
        <rect x="40" y="170" width="280" height="90" rx="12" fill="#1c1917" />
        <text x="180" y="212" textAnchor="middle" fill="#fde68a" fontSize="22" fontWeight="900">ONE CPU</text>
        <text x="180" y="242" textAnchor="middle" fill="#fda4af" fontSize="16" fontWeight="800">queue builds</text>
        {[0, 1, 2, 3].map((i) => (
          <rect key={i} x={70 + i * 50} y="280" width="36" height="22" rx="4" fill="#c2410c" className="fo-anim-queue" style={{ animationDelay: `${i * 0.18}s` }} />
        ))}
        <path d="M340 105 H430 L470 250 H560" fill="none" stroke="#4338ca" strokeWidth="4" className="fo-anim-path" />
        <text x="500" y="62" fill="#4338ca" fontSize="18" fontWeight="900">DECOMPOSE</text>
        {[0, 1, 2, 3].map((i) => (
          <g key={i} className="fo-anim-split" style={{ '--dx': `${i * 8}px`, '--dy': `${i * 4}px` }}>
            <rect x={590} y={70 + i * 100} width="170" height="72" rx="12" fill="#fff" stroke="#4338ca" strokeWidth="3" />
            <text x="675" y={102 + i * 100} textAnchor="middle" fill="#1c1917" fontSize="20" fontWeight="900">PE {i}</text>
            <text x="675" y={126 + i * 100} textAnchor="middle" fill="#4338ca" fontSize="16" fontWeight="800">piece {i + 1}</text>
          </g>
        ))}
        <path d="M780 210 H860 L900 280 H980" fill="none" stroke="#0f766e" strokeWidth="4" className="fo-anim-path" />
        <rect x="980" y="230" width="180" height="100" rx="14" fill="#0f766e" />
        <text x="1070" y="278" textAnchor="middle" fill="#fff" fontSize="20" fontWeight="900">RESULT</text>
        <text x="1070" y="308" textAnchor="middle" fill="#bbf7d0" fontSize="16" fontWeight="800">recombined</text>
      </svg>
    </Scene>
  )
}

export function SerialBottleneck() {
  return (
    <Scene label="A large problem queues behind one CPU">
      <svg viewBox="0 0 1200 560">
        <rect x="40" y="60" width="220" height="90" rx="12" fill="#4338ca" />
        <text x="150" y="116" textAnchor="middle" fill="#fff" fontSize="24" fontWeight="900">problem</text>
        <path d="M150 150 V210" stroke="#1c1917" strokeWidth="4" />
        {Array.from({ length: 12 }).map((_, i) => (
          <rect key={i} x={60 + i * 28} y="220" width="16" height="70" rx="3" fill="#4338ca" className="fo-anim-queue" style={{ animationDelay: `${i * 0.08}s` }} />
        ))}
        <text x="220" y="330" fill="#57534e" fontSize="18" fontWeight="800">instructions  t1  t2  t3  …  tN</text>
        <path d="M400 255 H620" stroke="#c2410c" strokeWidth="5" markerEnd="url(#fo-arr)" />
        <defs>
          <marker id="fo-arr" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto">
            <path d="M0 0 L10 5 L0 10 Z" fill="#c2410c" />
          </marker>
        </defs>
        <rect x="640" y="180" width="280" height="150" rx="16" fill="#c2410c" />
        <text x="780" y="268" textAnchor="middle" fill="#fff" fontSize="36" fontWeight="900">CPU</text>
        <text x="600" y="430" textAnchor="middle" fill="#9f1239" fontSize="22" fontWeight="900">Serial bottleneck: one instruction stream, one core</text>
        <text x="600" y="470" textAnchor="middle" fill="#57534e" fontSize="18" fontWeight="700">The rest of the work waits in line.</text>
      </svg>
    </Scene>
  )
}

export function WorkDecomposition() {
  return (
    <Scene label="One workload splits, many processors execute, results combine">
      <svg viewBox="0 0 1200 560">
        <rect x="40" y="200" width="180" height="100" rx="12" fill="#9f1239" />
        <text x="130" y="258" textAnchor="middle" fill="#fff" fontSize="22" fontWeight="900">WORKLOAD</text>
        <path d="M220 250 H300" stroke="#4338ca" strokeWidth="4" />
        <rect x="300" y="200" width="180" height="100" rx="12" fill="#4338ca" />
        <text x="390" y="258" textAnchor="middle" fill="#fff" fontSize="22" fontWeight="900">DECOMPOSE</text>
        {[0, 1, 2, 3].map((i) => (
          <g key={i}>
            <path d={`M480 250 L${560} ${90 + i * 110}`} stroke="#4338ca" strokeWidth="3" className="fo-anim-fan" />
            <rect x="560" y={50 + i * 110} width="200" height="80" rx="12" fill="#fff" stroke="#4338ca" strokeWidth="3" />
            <text x="660" y={98 + i * 110} textAnchor="middle" fill="#1c1917" fontSize="20" fontWeight="900">processor {i}</text>
          </g>
        ))}
        <path d="M760 250 H840" stroke="#0f766e" strokeWidth="4" />
        <rect x="840" y="200" width="200" height="100" rx="12" fill="#0f766e" />
        <text x="940" y="248" textAnchor="middle" fill="#fff" fontSize="20" fontWeight="900">COMBINE</text>
        <text x="940" y="278" textAnchor="middle" fill="#bbf7d0" fontSize="16" fontWeight="800">one result</text>
      </svg>
    </Scene>
  )
}

export function SerialVsParallelTimeline() {
  const serial = ['A', 'B', 'C', 'D', 'E', 'F']
  return (
    <Scene label="Same workload: serial chain versus independent parallel stages then merge">
      <svg viewBox="0 0 1200 560">
        <text x="40" y="46" fill="#9f1239" fontSize="22" fontWeight="900">Serial</text>
        {serial.map((t, i) => (
          <g key={t}>
            <rect x={40 + i * 175} y="70" width="140" height="70" rx="10" fill="#fff" stroke="#9f1239" strokeWidth="3" />
            <text x={110 + i * 175} y="114" textAnchor="middle" fill="#1c1917" fontSize="28" fontWeight="900">{t}</text>
            {i < 5 && <path d={`M${180 + i * 175} 105 H${215 + i * 175}`} stroke="#9f1239" strokeWidth="4" />}
          </g>
        ))}
        <text x="40" y="210" fill="#4338ca" fontSize="22" fontWeight="900">Parallel — independent where possible, then merge</text>
        {['A', 'B', 'C'].map((t, i) => (
          <g key={t}>
            <rect x={40 + i * 220} y="240" width="160" height="80" rx="12" fill="#4338ca" className="fo-anim-pulse" style={{ animationDelay: `${i * 0.15}s` }} />
            <text x={120 + i * 220} y="290" textAnchor="middle" fill="#fff" fontSize="28" fontWeight="900">{t}</text>
          </g>
        ))}
        <path d="M200 320 V380 H540 V320" fill="none" stroke="#0f766e" strokeWidth="4" />
        <rect x="430" y="380" width="220" height="70" rx="12" fill="#0f766e" />
        <text x="540" y="424" textAnchor="middle" fill="#fff" fontSize="24" fontWeight="900">merge D</text>
        <path d="M540 450 V490" stroke="#b45309" strokeWidth="4" />
        <rect x="250" y="490" width="160" height="50" rx="10" fill="#b45309" />
        <text x="330" y="524" textAnchor="middle" fill="#fff" fontSize="20" fontWeight="900">E</text>
        <rect x="670" y="490" width="160" height="50" rx="10" fill="#b45309" />
        <text x="750" y="524" textAnchor="middle" fill="#fff" fontSize="20" fontWeight="900">F</text>
      </svg>
    </Scene>
  )
}

export function EvolutionTimeline() {
  const stages = [
    ['1986–2003', '> 50% / year', 'single-core boom', '#4338ca'],
    ['Since 2003', 'heat · power', 'clocks stall', '#9f1239'],
    ['By 2005', 'multi-core', 'parallelism', '#c2410c'],
    ['2015–2017', '< 4% / year', 'single-core crawl', '#57534e'],
  ]
  return (
    <Scene label="Microprocessor performance evolution from single-core boom to multi-core">
      <svg viewBox="0 0 1200 560">
        <path d="M60 280 H1140" stroke="#d6d3d1" strokeWidth="6" />
        {stages.map(([y, n, s, c], i) => (
          <g key={y} transform={`translate(${80 + i * 280} 80)`}>
            <circle cx="90" cy="200" r="18" fill={c} className="fo-anim-pulse" style={{ animationDelay: `${i * 0.2}s` }} />
            <rect x="0" y="0" width="180" height="150" rx="14" fill="#fff" stroke={c} strokeWidth="3" />
            <text x="90" y="42" textAnchor="middle" fill={c} fontSize="20" fontWeight="900">{y}</text>
            <text x="90" y="82" textAnchor="middle" fill="#1c1917" fontSize="22" fontWeight="900">{n}</text>
            <text x="90" y="118" textAnchor="middle" fill="#57534e" fontSize="16" fontWeight="800">{s}</text>
          </g>
        ))}
        <text x="600" y="500" textAnchor="middle" fill="#4338ca" fontSize="22" fontWeight="900">Designers stopped making one core faster and placed many cores on one chip.</text>
      </svg>
    </Scene>
  )
}

export function SingleVsMulticore() {
  return (
    <Scene label="Single-core chip versus multi-core chip with private and shared memory">
      <svg viewBox="0 0 1200 560">
        <text x="250" y="48" textAnchor="middle" fill="#1c1917" fontSize="24" fontWeight="900">Single-core processor</text>
        <rect x="70" y="70" width="360" height="380" rx="18" fill="#fff" stroke="#6d28d9" strokeWidth="4" />
        <rect x="140" y="110" width="220" height="70" rx="10" fill="#c4b5fd" />
        <text x="250" y="154" textAnchor="middle" fill="#1c1917" fontSize="22" fontWeight="900">Core</text>
        <rect x="140" y="210" width="220" height="70" rx="10" fill="#ddd6fe" />
        <text x="250" y="254" textAnchor="middle" fill="#1c1917" fontSize="20" fontWeight="900">Memory</text>
        <rect x="140" y="310" width="220" height="70" rx="10" fill="#a78bfa" />
        <text x="250" y="354" textAnchor="middle" fill="#fff" fontSize="20" fontWeight="900">Bus interface</text>
        <text x="250" y="490" textAnchor="middle" fill="#57534e" fontSize="18" fontWeight="800">off-chip components</text>

        <text x="600" y="260" textAnchor="middle" fill="#c2410c" fontSize="28" fontWeight="900">VS</text>

        <text x="950" y="48" textAnchor="middle" fill="#1c1917" fontSize="24" fontWeight="900">Multi-core processor</text>
        <rect x="770" y="70" width="360" height="380" rx="18" fill="#fff" stroke="#4338ca" strokeWidth="4" />
        <rect x="800" y="110" width="140" height="56" rx="10" fill="#4338ca" />
        <text x="870" y="146" textAnchor="middle" fill="#fff" fontSize="18" fontWeight="900">Core 1</text>
        <rect x="960" y="110" width="140" height="56" rx="10" fill="#4338ca" />
        <text x="1030" y="146" textAnchor="middle" fill="#fff" fontSize="18" fontWeight="900">Core 2</text>
        <rect x="800" y="186" width="140" height="48" rx="8" fill="#c7d2fe" />
        <text x="870" y="216" textAnchor="middle" fill="#312e81" fontSize="14" fontWeight="800">individual mem</text>
        <rect x="960" y="186" width="140" height="48" rx="8" fill="#c7d2fe" />
        <text x="1030" y="216" textAnchor="middle" fill="#312e81" fontSize="14" fontWeight="800">individual mem</text>
        <rect x="800" y="260" width="300" height="70" rx="10" fill="#0f766e" />
        <text x="950" y="304" textAnchor="middle" fill="#fff" fontSize="22" fontWeight="900">Shared memory</text>
        <rect x="800" y="350" width="300" height="60" rx="10" fill="#a78bfa" />
        <text x="950" y="388" textAnchor="middle" fill="#fff" fontSize="20" fontWeight="900">Bus interface</text>
        <text x="950" y="490" textAnchor="middle" fill="#57534e" fontSize="18" fontWeight="800">chip boundary</text>
      </svg>
    </Scene>
  )
}

export function HeatPowerLimit() {
  const steps = [
    ['Smaller transistors', 'more on a chip'],
    ['Faster switching', 'higher clock'],
    ['More power', 'more heat'],
    ['Too hot', 'errors · failure'],
  ]
  return (
    <Scene label="Faster transistors create heat that limits single-processor speed">
      <svg viewBox="0 0 1200 560">
        {steps.map(([a, b], i) => (
          <g key={a} transform={`translate(${40 + i * 290} 160)`}>
            <rect width="250" height="180" rx="16" fill={i === 3 ? '#9f1239' : '#fff'} stroke={i === 3 ? '#9f1239' : '#4338ca'} strokeWidth="3" />
            <text x="125" y="80" textAnchor="middle" fill={i === 3 ? '#fff' : '#1c1917'} fontSize="22" fontWeight="900">{a}</text>
            <text x="125" y="122" textAnchor="middle" fill={i === 3 ? '#fecaca' : '#57534e'} fontSize="18" fontWeight="800">{b}</text>
            {i < 3 && <path d="M250 90 H290" stroke="#c2410c" strokeWidth="4" />}
          </g>
        ))}
        <text x="600" y="430" textAnchor="middle" fill="#4338ca" fontSize="22" fontWeight="900">So designers use parallelism instead of one ever-faster core.</text>
      </svg>
    </Scene>
  )
}

export function IdleCoresScene() {
  return (
    <Scene label="A serial program occupies one core while other cores stay idle">
      <svg viewBox="0 0 1200 560">
        <text x="600" y="48" textAnchor="middle" fill="#1c1917" fontSize="22" fontWeight="900">Serial program on a multi-core chip</text>
        {[0, 1, 2, 3].map((i) => (
          <g key={i} transform={`translate(${90 + i * 280} 110)`}>
            <rect width="220" height="220" rx="16" fill={i === 0 ? '#4338ca' : '#e7e5e4'} stroke={i === 0 ? '#312e81' : '#a8a29e'} strokeWidth="3" />
            <text x="110" y="90" textAnchor="middle" fill={i === 0 ? '#fff' : '#78716c'} fontSize="24" fontWeight="900">Core {i}</text>
            <text x="110" y="140" textAnchor="middle" fill={i === 0 ? '#c7d2fe' : '#a8a29e'} fontSize="20" fontWeight="800">{i === 0 ? 'BUSY' : 'IDLE'}</text>
            {i === 0
              ? <rect x="30" y="170" width="160" height="22" rx="6" fill="#fde68a" className="fo-anim-pulse" />
              : <rect x="30" y="170" width="160" height="22" rx="6" fill="#d6d3d1" />}
          </g>
        ))}
        <text x="600" y="420" textAnchor="middle" fill="#9f1239" fontSize="22" fontWeight="900">Adding cores does not speed a serial program.</text>
        <text x="600" y="468" textAnchor="middle" fill="#57534e" fontSize="20" fontWeight="700">The work must be written as a parallel program.</text>
      </svg>
    </Scene>
  )
}

export function PagesExample() {
  return (
    <Scene label="One person writes 100 pages versus four people writing 25 pages each">
      <svg viewBox="0 0 1200 560">
        <rect x="40" y="70" width="500" height="380" rx="18" fill="#fff" stroke="#9f1239" strokeWidth="3" />
        <text x="290" y="120" textAnchor="middle" fill="#9f1239" fontSize="24" fontWeight="900">Serial</text>
        <rect x="180" y="160" width="220" height="90" rx="12" fill="#9f1239" />
        <text x="290" y="216" textAnchor="middle" fill="#fff" fontSize="22" fontWeight="900">1 writer</text>
        <text x="290" y="300" textAnchor="middle" fill="#1c1917" fontSize="22" fontWeight="800">100 pages</text>
        <text x="290" y="360" textAnchor="middle" fill="#9f1239" fontSize="28" fontWeight="900">≈ 100 hours</text>

        <rect x="660" y="70" width="500" height="380" rx="18" fill="#fff" stroke="#4338ca" strokeWidth="3" />
        <text x="910" y="120" textAnchor="middle" fill="#4338ca" fontSize="24" fontWeight="900">Parallel</text>
        {[0, 1, 2, 3].map((i) => (
          <rect key={i} x={700 + (i % 2) * 210} y={150 + Math.floor(i / 2) * 110} width="180" height="80" rx="12" fill="#4338ca" className="fo-anim-pulse" style={{ animationDelay: `${i * 0.12}s` }} />
        ))}
        {[0, 1, 2, 3].map((i) => (
          <text key={i} x={790 + (i % 2) * 210} y={198 + Math.floor(i / 2) * 110} textAnchor="middle" fill="#fff" fontSize="18" fontWeight="900">25 pages</text>
        ))}
        <text x="910" y="420" textAnchor="middle" fill="#4338ca" fontSize="28" fontWeight="900">≈ 25 hours</text>
      </svg>
    </Scene>
  )
}

export function ReductionTree() {
  const vals = [8, 19, 7, 15, 7, 13, 12, 14]
  const step1 = [27, 22, 20, 26]
  const step2 = [49, 46]
  return (
    <Scene label="Eight cores form a global sum by pairwise tree reduction">
      <svg viewBox="0 0 1200 560">
        <text x="600" y="36" textAnchor="middle" fill="#1c1917" fontSize="22" fontWeight="900">Multiple cores forming a global sum</text>
        {vals.map((v, i) => (
          <g key={i}>
            <text x={80 + i * 140} y="70" textAnchor="middle" fill="#57534e" fontSize="16" fontWeight="800">Core {i}</text>
            <circle cx={80 + i * 140} cy="110" r="28" fill="#4338ca" />
            <text x={80 + i * 140} y="118" textAnchor="middle" fill="#fff" fontSize="18" fontWeight="900">{v}</text>
          </g>
        ))}
        {step1.map((v, i) => (
          <g key={i}>
            <path d={`M${80 + i * 280} 138 L${150 + i * 280} 200`} stroke="#c2410c" strokeWidth="3" className="fo-anim-path" />
            <path d={`M${220 + i * 280} 138 L${150 + i * 280} 200`} stroke="#c2410c" strokeWidth="3" className="fo-anim-path" />
            <circle cx={150 + i * 280} cy="230" r="30" fill="#c2410c" />
            <text x={150 + i * 280} y="238" textAnchor="middle" fill="#fff" fontSize="18" fontWeight="900">+{v}</text>
          </g>
        ))}
        {step2.map((v, i) => (
          <g key={i}>
            <path d={`M${150 + i * 560} 260 L${290 + i * 280} 330`} stroke="#0f766e" strokeWidth="3" />
            <circle cx={290 + i * 560} cy="360" r="32" fill="#0f766e" />
            <text x={290 + i * 560} y="368" textAnchor="middle" fill="#fff" fontSize="20" fontWeight="900">+{v}</text>
          </g>
        ))}
        <path d="M290 392 L600 460" stroke="#1c1917" strokeWidth="4" />
        <path d="M850 392 L600 460" stroke="#1c1917" strokeWidth="4" />
        <circle cx="600" cy="500" r="36" fill="#1c1917" className="fo-anim-pulse" />
        <text x="600" y="508" textAnchor="middle" fill="#fde68a" fontSize="22" fontWeight="900">95</text>
      </svg>
    </Scene>
  )
}

export function TaskVsData() {
  return (
    <Scene label="Task parallelism partitions tasks; data parallelism partitions data">
      <svg viewBox="0 0 1200 560">
        <rect x="40" y="60" width="540" height="440" rx="18" fill="#fff" stroke="#4338ca" strokeWidth="3" />
        <text x="310" y="110" textAnchor="middle" fill="#4338ca" fontSize="24" fontWeight="900">Task parallelism</text>
        {['ingest', 'physics', 'render'].map((t, i) => (
          <rect key={t} x={80 + i * 160} y="180" width="140" height="90" rx="12" fill="#4338ca" className="fo-anim-pulse" style={{ animationDelay: `${i * 0.15}s` }} />
        ))}
        {['ingest', 'physics', 'render'].map((t, i) => (
          <text key={t} x={150 + i * 160} y="234" textAnchor="middle" fill="#fff" fontSize="18" fontWeight="900">{t}</text>
        ))}
        <text x="310" y="360" textAnchor="middle" fill="#57534e" fontSize="18" fontWeight="700">Different tasks on different cores</text>
        <text x="310" y="400" textAnchor="middle" fill="#1c1917" fontSize="18" fontWeight="800">partition the work</text>

        <rect x="620" y="60" width="540" height="440" rx="18" fill="#fff" stroke="#c2410c" strokeWidth="3" />
        <text x="890" y="110" textAnchor="middle" fill="#c2410c" fontSize="24" fontWeight="900">Data parallelism</text>
        {['0…n/p', 'n/p…2n/p', '2n/p…n'].map((t, i) => (
          <rect key={t} x={660 + i * 160} y="180" width="140" height="90" rx="12" fill="#c2410c" />
        ))}
        {['0…n/p', 'n/p…2n/p', '2n/p…n'].map((t, i) => (
          <text key={t} x={730 + i * 160} y="234" textAnchor="middle" fill="#fff" fontSize="16" fontWeight="900">{t}</text>
        ))}
        <text x="890" y="360" textAnchor="middle" fill="#57534e" fontSize="18" fontWeight="700">Same operation on parts of the data</text>
        <text x="890" y="400" textAnchor="middle" fill="#1c1917" fontSize="18" fontWeight="800">partition the data</text>
      </svg>
    </Scene>
  )
}

export function ConcurrencyTimeline() {
  return (
    <Scene label="Concurrency interleaves on one processor; parallelism runs on many">
      <svg viewBox="0 0 1200 560">
        <text x="40" y="48" fill="#6d28d9" fontSize="22" fontWeight="900">Concurrency — one processor, interleaved tasks</text>
        <rect x="40" y="70" width="1120" height="70" rx="10" fill="#f5f3ff" stroke="#6d28d9" strokeWidth="2" />
        <rect x="60" y="86" width="180" height="38" rx="8" fill="#6d28d9" />
        <text x="150" y="112" textAnchor="middle" fill="#fff" fontSize="18" fontWeight="900">A</text>
        <rect x="260" y="86" width="140" height="38" rx="8" fill="#c2410c" />
        <text x="330" y="112" textAnchor="middle" fill="#fff" fontSize="18" fontWeight="900">B</text>
        <rect x="420" y="86" width="160" height="38" rx="8" fill="#6d28d9" />
        <text x="500" y="112" textAnchor="middle" fill="#fff" fontSize="18" fontWeight="900">A</text>
        <rect x="600" y="86" width="180" height="38" rx="8" fill="#c2410c" />
        <text x="690" y="112" textAnchor="middle" fill="#fff" fontSize="18" fontWeight="900">B</text>
        <rect x="800" y="86" width="140" height="38" rx="8" fill="#6d28d9" />
        <text x="870" y="112" textAnchor="middle" fill="#fff" fontSize="18" fontWeight="900">A</text>
        <text x="40" y="220" fill="#4338ca" fontSize="22" fontWeight="900">Parallelism — different processors, same time</text>
        <rect x="40" y="250" width="1120" height="70" rx="10" fill="#eef2ff" stroke="#4338ca" strokeWidth="2" />
        <rect x="60" y="266" width="500" height="38" rx="8" fill="#4338ca" className="fo-anim-pulse" />
        <text x="310" y="292" textAnchor="middle" fill="#fff" fontSize="18" fontWeight="900">A on processor 0</text>
        <rect x="40" y="360" width="1120" height="70" rx="10" fill="#fff7ed" stroke="#c2410c" strokeWidth="2" />
        <rect x="60" y="376" width="500" height="38" rx="8" fill="#c2410c" className="fo-anim-pulse" />
        <text x="310" y="402" textAnchor="middle" fill="#fff" fontSize="18" fontWeight="900">B on processor 1</text>
        <text x="600" y="500" textAnchor="middle" fill="#57534e" fontSize="20" fontWeight="800">Concurrency is structure. Parallelism is simultaneous execution.</text>
      </svg>
    </Scene>
  )
}

export function DependencyGraph() {
  return (
    <Scene label="Task graph showing independent work that can run together">
      <svg viewBox="0 0 1200 560">
        <circle cx="200" cy="80" r="48" fill="#4338ca" />
        <text x="200" y="88" textAnchor="middle" fill="#fff" fontSize="28" fontWeight="900">A</text>
        <path d="M200 128 V190" stroke="#1c1917" strokeWidth="4" />
        <circle cx="120" cy="250" r="48" fill="#0f766e" className="fo-anim-pulse" />
        <text x="120" y="258" textAnchor="middle" fill="#fff" fontSize="28" fontWeight="900">B</text>
        <circle cx="280" cy="250" r="48" fill="#0f766e" className="fo-anim-pulse" />
        <text x="280" y="258" textAnchor="middle" fill="#fff" fontSize="28" fontWeight="900">C</text>
        <path d="M168 286 L200 350" stroke="#1c1917" strokeWidth="4" />
        <path d="M232 286 L200 350" stroke="#1c1917" strokeWidth="4" />
        <circle cx="200" cy="400" r="48" fill="#c2410c" />
        <text x="200" y="408" textAnchor="middle" fill="#fff" fontSize="28" fontWeight="900">D</text>
        <rect x="480" y="140" width="640" height="280" rx="18" fill="#fff" stroke="#4338ca" strokeWidth="3" />
        <text x="800" y="200" textAnchor="middle" fill="#4338ca" fontSize="24" fontWeight="900">B and C can run together</text>
        <text x="800" y="250" textAnchor="middle" fill="#1c1917" fontSize="20" fontWeight="800">No path between B and C</text>
        <text x="800" y="300" textAnchor="middle" fill="#57534e" fontSize="20" fontWeight="700">A must finish first. D waits for both.</text>
        <text x="800" y="360" textAnchor="middle" fill="#0f766e" fontSize="20" fontWeight="800">A dependence graph reveals safe parallel work.</text>
      </svg>
    </Scene>
  )
}

export function VonNeumann() {
  return (
    <Scene label="Classical von Neumann architecture: CPU, memory, interconnect">
      <svg viewBox="0 0 1200 560">
        <rect x="380" y="60" width="440" height="140" rx="16" fill="#4338ca" />
        <text x="600" y="120" textAnchor="middle" fill="#fff" fontSize="28" fontWeight="900">CPU / core</text>
        <text x="600" y="160" textAnchor="middle" fill="#c7d2fe" fontSize="18" fontWeight="800">control + ALU + registers</text>
        <path d="M600 200 V270" stroke="#c2410c" strokeWidth="6" className="fo-anim-path" />
        <text x="640" y="250" fill="#c2410c" fontSize="18" fontWeight="900">interconnect</text>
        <rect x="300" y="270" width="600" height="160" rx="16" fill="#0f766e" />
        <text x="600" y="345" textAnchor="middle" fill="#fff" fontSize="28" fontWeight="900">main memory</text>
        <text x="600" y="390" textAnchor="middle" fill="#bbf7d0" fontSize="18" fontWeight="800">stores data and program</text>
        <text x="600" y="500" textAnchor="middle" fill="#57534e" fontSize="20" fontWeight="800">Parallel hardware expands this baseline with more cores and faster paths.</text>
      </svg>
    </Scene>
  )
}

export function HardwareTypes() {
  const items = [
    ['Multi-core', 'several CPUs on one chip'],
    ['GPU', 'thousands of small cores'],
    ['Multiprocessor', 'multiple CPUs in one box'],
    ['Cluster', 'networked commodity nodes'],
    ['Supercomputer', 'thousands of nodes'],
    ['FPGA', 'reconfigurable hardware'],
  ]
  return (
    <Scene label="Kinds of parallel hardware">
      <div className="fo-chip-row" style={{ gridTemplateColumns: 'repeat(3, minmax(0, 1fr))' }}>
        {items.map(([t, s], i) => (
          <article key={t} className="fo-chip" style={{ '--i': i }}>
            <strong>{t}</strong>
            <span>{s}</span>
          </article>
        ))}
      </div>
    </Scene>
  )
}

export function FlynnMatrix() {
  const cells = [
    ['SISD', 'Single Instruction', 'Single Data', '#e0e7ff', '#4338ca'],
    ['SIMD', 'Single Instruction', 'Multiple Data', '#cffafe', '#0e7490'],
    ['MISD', 'Multiple Instruction', 'Single Data', '#ede9fe', '#6d28d9'],
    ['MIMD', 'Multiple Instruction', 'Multiple Data', '#ffedd5', '#c2410c'],
  ]
  return (
    <Scene label="Flynn taxonomy: instruction stream versus data stream">
      <svg viewBox="0 0 1200 560">
        <text x="600" y="40" textAnchor="middle" fill="#57534e" fontSize="18" fontWeight="800">DATA STREAM →</text>
        <text x="28" y="300" fill="#57534e" fontSize="18" fontWeight="800" transform="rotate(-90 28 300)">INSTRUCTION STREAM →</text>
        {cells.map(([a, b, c, bg, fg], i) => {
          const x = 140 + (i % 2) * 520
          const y = 70 + Math.floor(i / 2) * 230
          return (
            <g key={a}>
              <rect x={x} y={y} width="480" height="200" rx="18" fill={bg} stroke={fg} strokeWidth="4" />
              <text x={x + 240} y={y + 80} textAnchor="middle" fill={fg} fontSize="48" fontWeight="900">{a}</text>
              <text x={x + 240} y={y + 126} textAnchor="middle" fill="#1c1917" fontSize="20" fontWeight="800">{b}</text>
              <text x={x + 240} y={y + 160} textAnchor="middle" fill="#1c1917" fontSize="20" fontWeight="800">{c}</text>
            </g>
          )
        })}
      </svg>
    </Scene>
  )
}

export function SisdMachine() {
  const ops = ['load A', 'load B', 'C = A + B', 'store C', 'A = B * 2', 'store A']
  return (
    <Scene label="SISD: one instruction stream, one data stream, sequential time">
      <svg viewBox="0 0 1200 560">
        <text x="600" y="40" textAnchor="middle" fill="#4338ca" fontSize="22" fontWeight="900">Single Instruction · Single Data</text>
        {ops.map((op, i) => (
          <g key={op} className="fo-anim-stream" style={{ animationDelay: `${i * 0.12}s` }}>
            <rect x="420" y={70 + i * 70} width="360" height="56" rx="10" fill="#e0e7ff" stroke="#4338ca" strokeWidth="2" />
            <text x="600" y={106 + i * 70} textAnchor="middle" fill="#1c1917" fontSize="22" fontWeight="900">{op}</text>
          </g>
        ))}
        <path d="M820 80 V470" stroke="#1c1917" strokeWidth="4" />
        <text x="850" y="280" fill="#57534e" fontSize="20" fontWeight="900">time</text>
        <text x="200" y="260" fill="#57534e" fontSize="20" fontWeight="800">one CPU</text>
        <text x="200" y="300" fill="#57534e" fontSize="18" fontWeight="700">deterministic</text>
      </svg>
    </Scene>
  )
}

export function SimdFanout() {
  const pes = [1, 2, 'n']
  const rows = ['load A', 'load B', 'C = A * B', 'store C']
  return (
    <Scene label="SIMD: one instruction fans out to many processing elements on different data">
      <svg viewBox="0 0 1200 560">
        <rect x="40" y="40" width="220" height="80" rx="12" fill="#0e7490" />
        <text x="150" y="88" textAnchor="middle" fill="#fff" fontSize="20" fontWeight="900">Control unit</text>
        {pes.map((p, i) => (
          <path key={p} d={`M260 80 L${360 + i * 280} 160`} stroke="#0e7490" strokeWidth="4" className="fo-anim-fan" />
        ))}
        {pes.map((p, i) => (
          <g key={p} transform={`translate(${300 + i * 280} 170)`}>
            <text x="110" y="0" textAnchor="middle" fill="#0e7490" fontSize="20" fontWeight="900">P{p}</text>
            {rows.map((r, k) => (
              <g key={r}>
                <rect x="0" y={20 + k * 70} width="220" height="56" rx="8" fill="#cffafe" stroke="#0e7490" strokeWidth="2" className="fo-anim-pulse" style={{ animationDelay: `${k * 0.2}s` }} />
                <text x="110" y={56 + k * 70} textAnchor="middle" fill="#1c1917" fontSize="16" fontWeight="800">{`${r}(${p})`}</text>
              </g>
            ))}
          </g>
        ))}
      </svg>
    </Scene>
  )
}

export function MisdPipeline() {
  const pes = [
    ['P1', 'C(1)=A(1)*1'],
    ['P2', 'C(2)=A(1)*2'],
    ['Pn', 'C(n)=A(1)*n'],
  ]
  return (
    <Scene label="MISD: multiple instruction streams act on one data stream">
      <svg viewBox="0 0 1200 560">
        <rect x="40" y="220" width="180" height="80" rx="12" fill="#6d28d9" />
        <text x="130" y="268" textAnchor="middle" fill="#fff" fontSize="22" fontWeight="900">A(1)</text>
        {pes.map(([p, op], i) => (
          <g key={p}>
            <path d={`M220 260 L${360} ${90 + i * 150}`} stroke="#6d28d9" strokeWidth="4" className="fo-anim-fan" />
            <rect x="360" y={50 + i * 150} width="280" height="80" rx="12" fill="#ede9fe" stroke="#6d28d9" strokeWidth="3" />
            <text x="500" y={82 + i * 150} textAnchor="middle" fill="#6d28d9" fontSize="20" fontWeight="900">{p}</text>
            <text x="500" y={112 + i * 150} textAnchor="middle" fill="#1c1917" fontSize="16" fontWeight="800">{op}</text>
          </g>
        ))}
        <rect x="760" y="180" width="380" height="180" rx="16" fill="#fff" stroke="#9f1239" strokeWidth="3" />
        <text x="950" y="240" textAnchor="middle" fill="#9f1239" fontSize="22" fontWeight="900">Rare in practice</text>
        <text x="950" y="286" textAnchor="middle" fill="#57534e" fontSize="18" fontWeight="700">Source uses: filters on one</text>
        <text x="950" y="316" textAnchor="middle" fill="#57534e" fontSize="18" fontWeight="700">signal, or crypto on one message</text>
      </svg>
    </Scene>
  )
}

export function MimdArchitecture() {
  const rows = [
    ['P1', 'load A(1) · C=A*B', '#4338ca'],
    ['P2', 'call funcD · x=y*z', '#0f766e'],
    ['Pn', 'do 10 i=1,N · alpha=w³', '#c2410c'],
  ]
  return (
    <Scene label="MIMD: independent instruction streams on independent data">
      <svg viewBox="0 0 1200 560">
        <text x="600" y="40" textAnchor="middle" fill="#1c1917" fontSize="22" fontWeight="900">Multiple Instruction · Multiple Data</text>
        {rows.map(([p, op, c], i) => (
          <g key={p} className="fo-anim-lane" style={{ animationDelay: `${i * 0.2}s` }}>
            <rect x="60" y={80 + i * 150} width="160" height="100" rx="12" fill={c} />
            <text x="140" y={140 + i * 150} textAnchor="middle" fill="#fff" fontSize="24" fontWeight="900">{p}</text>
            <path d={`M220 ${130 + i * 150} H400`} stroke={c} strokeWidth="4" />
            <rect x="400" y={90 + i * 150} width="420" height="80" rx="12" fill="#fff" stroke={c} strokeWidth="3" />
            <text x="610" y={140 + i * 150} textAnchor="middle" fill="#1c1917" fontSize="20" fontWeight="900">{op}</text>
            <path d={`M820 ${130 + i * 150} H980`} stroke={c} strokeWidth="4" />
            <rect x="980" y={90 + i * 150} width="160" height="80" rx="12" fill="#fff7ed" stroke={c} strokeWidth="3" />
            <text x="1060" y={140 + i * 150} textAnchor="middle" fill="#1c1917" fontSize="20" fontWeight="900">data {i + 1}</text>
          </g>
        ))}
      </svg>
    </Scene>
  )
}

export function FlynnCompare() {
  return (
    <Scene label="Flynn comparison of control streams, data streams and processing elements">
      <svg viewBox="0 0 1200 560">
        {[
          ['SISD', '1 control', '1 data', '1 PE', '#4338ca'],
          ['SIMD', '1 control', 'many data', 'many PEs lockstep', '#0e7490'],
          ['MISD', 'many control', '1 data', 'rare', '#6d28d9'],
          ['MIMD', 'many control', 'many data', 'independent PEs', '#c2410c'],
        ].map(([a, b, c, d, col], i) => (
          <g key={a} transform={`translate(${40 + i * 290} 90)`}>
            <rect width="260" height="340" rx="18" fill="#fff" stroke={col} strokeWidth="4" />
            <text x="130" y="70" textAnchor="middle" fill={col} fontSize="32" fontWeight="900">{a}</text>
            <text x="130" y="140" textAnchor="middle" fill="#1c1917" fontSize="20" fontWeight="800">{b}</text>
            <text x="130" y="200" textAnchor="middle" fill="#1c1917" fontSize="20" fontWeight="800">{c}</text>
            <text x="130" y="270" textAnchor="middle" fill="#57534e" fontSize="18" fontWeight="800">{d}</text>
          </g>
        ))}
      </svg>
    </Scene>
  )
}

export function SharedMemoryMachine() {
  return (
    <Scene label="Four processors addressing one common memory">
      <svg viewBox="0 0 1200 560">
        {[0, 1, 2, 3].map((i) => (
          <g key={i}>
            <rect x={140 + i * 240} y="50" width="160" height="90" rx="12" fill="#fff" stroke="#4338ca" strokeWidth="3" />
            <text x={220 + i * 240} y="106" textAnchor="middle" fill="#1c1917" fontSize="24" fontWeight="900">P{i}</text>
            <path d={`M${220 + i * 240} 140 V240`} stroke="#4338ca" strokeWidth="4" className="fo-anim-path" />
          </g>
        ))}
        <rect x="80" y="240" width="1040" height="110" rx="16" fill="#0f766e" />
        <text x="600" y="306" textAnchor="middle" fill="#fff" fontSize="28" fontWeight="900">COMMON MEMORY</text>
        <text x="600" y="420" textAnchor="middle" fill="#57534e" fontSize="20" fontWeight="800">Every processor sees the same address space.</text>
        <text x="600" y="460" textAnchor="middle" fill="#4338ca" fontSize="18" fontWeight="800">Coordination uses shared variables, locks and barriers.</text>
      </svg>
    </Scene>
  )
}

export function DistributedMemoryMachine() {
  return (
    <Scene label="Processor plus local memory connected through an interconnect">
      <svg viewBox="0 0 1200 560">
        {[0, 1, 2, 3].map((i) => (
          <g key={i} transform={`translate(${70 + (i % 2) * 560} ${60 + Math.floor(i / 2) * 180})`}>
            <rect width="500" height="140" rx="14" fill="#fff" stroke="#c2410c" strokeWidth="3" />
            <rect x="20" y="30" width="180" height="80" rx="10" fill="#c2410c" />
            <text x="110" y="80" textAnchor="middle" fill="#fff" fontSize="22" fontWeight="900">CPU {i}</text>
            <rect x="240" y="30" width="230" height="80" rx="10" fill="#0e7490" />
            <text x="355" y="80" textAnchor="middle" fill="#fff" fontSize="20" fontWeight="900">local memory {i}</text>
          </g>
        ))}
        <rect x="80" y="430" width="1040" height="54" rx="27" fill="#1c1917" />
        <text x="600" y="466" textAnchor="middle" fill="#fde68a" fontSize="22" fontWeight="900">network  ·  communication is explicit</text>
        <text x="600" y="540" textAnchor="middle" fill="#4338ca" fontSize="18" fontWeight="800">Communication becomes explicit in Module 3.</text>
      </svg>
    </Scene>
  )
}

export function UmaMemoryScene() {
  return (
    <Scene label="UMA: equal-length paths from chips to shared memory">
      <svg viewBox="0 0 1200 560">
        <text x="600" y="40" textAnchor="middle" fill="#1c1917" fontSize="22" fontWeight="900">A UMA multicore system</text>
        {['Chip 1', 'Chip 2'].map((chip, i) => (
          <g key={chip} transform={`translate(${220 + i * 420} 70)`}>
            <rect width="340" height="120" rx="14" fill="#fff" stroke="#4338ca" strokeWidth="3" />
            <text x="170" y="36" textAnchor="middle" fill="#4338ca" fontSize="20" fontWeight="900">{chip}</text>
            <rect x="30" y="50" width="120" height="50" rx="8" fill="#c7d2fe" />
            <text x="90" y="82" textAnchor="middle" fill="#312e81" fontSize="16" fontWeight="800">Core 1</text>
            <rect x="190" y="50" width="120" height="50" rx="8" fill="#c7d2fe" />
            <text x="250" y="82" textAnchor="middle" fill="#312e81" fontSize="16" fontWeight="800">Core 2</text>
            <path d="M170 120 V180" stroke="#4338ca" strokeWidth="4" />
          </g>
        ))}
        <rect x="180" y="250" width="840" height="70" rx="12" fill="#4338ca" />
        <text x="600" y="294" textAnchor="middle" fill="#fff" fontSize="24" fontWeight="900">Interconnect</text>
        <path d="M600 320 V370" stroke="#0f766e" strokeWidth="5" className="fo-anim-path" />
        <rect x="300" y="370" width="600" height="90" rx="14" fill="#0f766e" />
        <text x="600" y="426" textAnchor="middle" fill="#fff" fontSize="26" fontWeight="900">Memory  ·  equal latency</text>
        <text x="600" y="520" textAnchor="middle" fill="#57534e" fontSize="18" fontWeight="800">All cores travel about the same distance to memory.</text>
      </svg>
    </Scene>
  )
}

export function NumaMemoryScene() {
  return (
    <Scene label="NUMA: local memory is a short path; remote memory is a long path">
      <svg viewBox="0 0 1200 560">
        <text x="600" y="36" textAnchor="middle" fill="#1c1917" fontSize="22" fontWeight="900">A NUMA multicore system</text>
        {[0, 1].map((i) => (
          <g key={i} transform={`translate(${80 + i * 620} 70)`}>
            <rect width="500" height="120" rx="14" fill="#fff" stroke="#c2410c" strokeWidth="3" />
            <text x="250" y="36" textAnchor="middle" fill="#c2410c" fontSize="20" fontWeight="900">Chip {i + 1}</text>
            <rect x="50" y="50" width="160" height="50" rx="8" fill="#ffedd5" />
            <text x="130" y="82" textAnchor="middle" fill="#9a3412" fontSize="16" fontWeight="800">Core 1</text>
            <rect x="280" y="50" width="160" height="50" rx="8" fill="#ffedd5" />
            <text x="360" y="82" textAnchor="middle" fill="#9a3412" fontSize="16" fontWeight="800">Core 2</text>
            <path d="M250 120 V170" stroke="#c2410c" strokeWidth="4" />
            <rect x="80" y="170" width="340" height="50" rx="10" fill="#c2410c" />
            <text x="250" y="204" textAnchor="middle" fill="#fff" fontSize="18" fontWeight="900">local interconnect</text>
            <path d="M250 220 V270" stroke="#0f766e" strokeWidth="5" className="fo-anim-path" />
            <rect x="80" y="270" width="340" height="80" rx="12" fill="#0f766e" />
            <text x="250" y="318" textAnchor="middle" fill="#fff" fontSize="22" fontWeight="900">local memory</text>
          </g>
        ))}
        <path d="M580 120 H700" stroke="#9f1239" strokeWidth="5" className="fo-anim-path" />
        <text x="640" y="108" textAnchor="middle" fill="#9f1239" fontSize="16" fontWeight="900">REMOTE</text>
        <text x="200" y="420" fill="#0f766e" fontSize="20" fontWeight="900">LOCAL = shorter / faster</text>
        <text x="760" y="420" fill="#9f1239" fontSize="20" fontWeight="900">REMOTE = longer / slower</text>
        <text x="600" y="500" textAnchor="middle" fill="#57534e" fontSize="18" fontWeight="800">A core reaches nearby memory faster than memory on the other chip.</text>
      </svg>
    </Scene>
  )
}

export function UmaVsNuma() {
  return (
    <Scene label="UMA equal paths versus NUMA local and remote distances">
      <svg viewBox="0 0 1200 560">
        <rect x="40" y="50" width="540" height="460" rx="18" fill="#fff" stroke="#4338ca" strokeWidth="3" />
        <text x="310" y="100" textAnchor="middle" fill="#4338ca" fontSize="28" fontWeight="900">UMA</text>
        {[0, 1, 2].map((i) => (
          <g key={i}>
            <circle cx={140 + i * 140} cy="180" r="28" fill="#4338ca" />
            <text x={140 + i * 140} y="188" textAnchor="middle" fill="#fff" fontSize="16" fontWeight="900">P{i}</text>
            <path d={`M${140 + i * 140} 208 V300`} stroke="#4338ca" strokeWidth="4" />
          </g>
        ))}
        <rect x="90" y="300" width="420" height="70" rx="12" fill="#0f766e" />
        <text x="310" y="344" textAnchor="middle" fill="#fff" fontSize="20" fontWeight="900">same distance</text>
        <text x="310" y="430" textAnchor="middle" fill="#57534e" fontSize="18" fontWeight="800">equal latency and bandwidth</text>

        <rect x="620" y="50" width="540" height="460" rx="18" fill="#fff" stroke="#c2410c" strokeWidth="3" />
        <text x="890" y="100" textAnchor="middle" fill="#c2410c" fontSize="28" fontWeight="900">NUMA</text>
        <circle cx="760" cy="180" r="28" fill="#c2410c" />
        <text x="760" y="188" textAnchor="middle" fill="#fff" fontSize="16" fontWeight="900">P0</text>
        <rect x="700" y="300" width="140" height="60" rx="10" fill="#0f766e" />
        <text x="770" y="338" textAnchor="middle" fill="#fff" fontSize="16" fontWeight="900">local</text>
        <path d="M760 208 V300" stroke="#0f766e" strokeWidth="5" />
        <circle cx="1020" cy="180" r="28" fill="#9f1239" />
        <text x="1020" y="188" textAnchor="middle" fill="#fff" fontSize="16" fontWeight="900">P1</text>
        <path d="M788 180 H992" stroke="#9f1239" strokeWidth="4" strokeDasharray="8 6" />
        <text x="890" y="430" textAnchor="middle" fill="#57534e" fontSize="18" fontWeight="800">access time depends on location</text>
      </svg>
    </Scene>
  )
}

export function CacheCoherenceScene({ stage = 'stale' }) {
  return (
    <Scene label="Two caches hold X; one write leaves a stale copy until coherence acts">
      <svg viewBox="0 0 1200 560">
        <rect x="80" y="60" width="220" height="120" rx="14" fill="#4338ca" />
        <text x="190" y="110" textAnchor="middle" fill="#fff" fontSize="24" fontWeight="900">P1</text>
        <text x="190" y="148" textAnchor="middle" fill="#c7d2fe" fontSize="18" fontWeight="800">writes X = 10</text>
        <rect x="80" y="220" width="220" height="90" rx="12" fill="#fff" stroke="#4338ca" strokeWidth="3" />
        <text x="190" y="274" textAnchor="middle" fill="#4338ca" fontSize="22" fontWeight="900">cache X=10</text>
        <rect x="900" y="60" width="220" height="120" rx="14" fill="#c2410c" />
        <text x="1010" y="110" textAnchor="middle" fill="#fff" fontSize="24" fontWeight="900">P2</text>
        <text x="1010" y="148" textAnchor="middle" fill="#fed7aa" fontSize="18" fontWeight="800">still sees old X</text>
        <rect x="900" y="220" width="220" height="90" rx="12" fill="#fff" stroke="#c2410c" strokeWidth="3" className={stage === 'stale' ? 'fo-anim-stale' : 'fo-anim-fresh'} />
        <text x="1010" y="274" textAnchor="middle" fill="#c2410c" fontSize="22" fontWeight="900">{stage === 'stale' ? 'cache X=5' : 'cache X=10'}</text>
        <rect x="360" y="380" width="480" height="90" rx="14" fill="#0f766e" />
        <text x="600" y="434" textAnchor="middle" fill="#fff" fontSize="24" fontWeight="900">shared memory  X started as 5</text>
        <path d="M300 160 H900" stroke="#9f1239" strokeWidth="4" className="fo-anim-path" />
        <text x="600" y="150" textAnchor="middle" fill="#9f1239" fontSize="20" fontWeight="900">{stage === 'stale' ? 'incoherent copies' : 'coherence restored'}</text>
      </svg>
    </Scene>
  )
}

export function BusInterconnect() {
  return (
    <Scene label="One shared bus connecting processors and memory, with contention">
      <svg viewBox="0 0 1200 560">
        {[0, 1, 2, 3].map((i) => (
          <g key={i}>
            <rect x={90 + i * 270} y="60" width="180" height="80" rx="12" fill="#fff" stroke="#4338ca" strokeWidth="3" />
            <text x={180 + i * 270} y="110" textAnchor="middle" fill="#1c1917" fontSize="22" fontWeight="900">P{i}</text>
            <path d={`M${180 + i * 270} 140 V250`} stroke="#c2410c" strokeWidth="4" />
          </g>
        ))}
        <rect x="60" y="250" width="1080" height="70" rx="12" fill="#c2410c" className="fo-anim-pulse" />
        <text x="600" y="294" textAnchor="middle" fill="#fff" fontSize="24" fontWeight="900">SHARED BUS  ·  one conversation at a time</text>
        <rect x="360" y="380" width="480" height="80" rx="12" fill="#0f766e" />
        <text x="600" y="428" textAnchor="middle" fill="#fff" fontSize="22" fontWeight="900">memory</text>
        <text x="600" y="510" textAnchor="middle" fill="#9f1239" fontSize="20" fontWeight="800">Contention grows as more processors talk.</text>
      </svg>
    </Scene>
  )
}

export function CrossbarScene() {
  return (
    <Scene label="Crossbar matrix allowing simultaneous non-conflicting connections">
      <svg viewBox="0 0 1200 560">
        <text x="600" y="36" textAnchor="middle" fill="#1c1917" fontSize="22" fontWeight="900">Crossbar switch system</text>
        {[1, 2, 3, 4].map((n, i) => (
          <g key={n}>
            <rect x={280 + i * 160} y="60" width="120" height="50" rx="8" fill="#0f766e" />
            <text x={340 + i * 160} y="92" textAnchor="middle" fill="#fff" fontSize="16" fontWeight="900">MM {n}</text>
            <path d={`M${340 + i * 160} 110 V460`} stroke="#a8a29e" strokeWidth="3" />
          </g>
        ))}
        {[1, 2, 3, 4].map((n, i) => (
          <g key={`c${n}`}>
            <rect x="60" y={150 + i * 80} width="140" height="50" rx="8" fill="#4338ca" />
            <text x="130" y={182 + i * 80} textAnchor="middle" fill="#fff" fontSize="16" fontWeight="900">CPU {n}</text>
            <path d={`M200 ${175 + i * 80} H920`} stroke="#a8a29e" strokeWidth="3" />
            {[0, 1, 2, 3].map((j) => (
              <rect key={j} x={328 + j * 160} y={163 + i * 80} width="24" height="24" rx="4" className="fo-anim-switch" style={{ animationDelay: `${(i + j) * 0.12}s` }} fill="#c7d2fe" stroke="#4338ca" />
            ))}
          </g>
        ))}
        <text x="600" y="530" textAnchor="middle" fill="#4338ca" fontSize="18" fontWeight="800">Non-conflicting pairs can transfer at the same time. Cost is high.</text>
      </svg>
    </Scene>
  )
}

export function MeshTopology() {
  return (
    <Scene label="Mesh topology with neighbor routes">
      <svg viewBox="0 0 1200 560">
        <text x="600" y="40" textAnchor="middle" fill="#1c1917" fontSize="22" fontWeight="900">Mesh — each node talks to its neighbors</text>
        {Array.from({ length: 16 }).map((_, i) => {
          const x = 280 + (i % 4) * 160
          const y = 80 + Math.floor(i / 4) * 110
          return (
            <g key={i}>
              {(i % 4) < 3 && <path d={`M${x + 56} ${y + 28} H${x + 160}`} stroke="#0e7490" strokeWidth="4" />}
              {i < 12 && <path d={`M${x + 28} ${y + 56} V${y + 110}`} stroke="#0e7490" strokeWidth="4" />}
              <circle cx={x + 28} cy={y + 28} r="28" fill="#0e7490" />
              <text x={x + 28} y={y + 34} textAnchor="middle" fill="#fff" fontSize="16" fontWeight="900">{i}</text>
            </g>
          )
        })}
        <path d="M308 108 H468" stroke="#c2410c" strokeWidth="6" className="fo-anim-path" />
        <text x="600" y="530" textAnchor="middle" fill="#57534e" fontSize="18" fontWeight="800">A packet hops neighbor to neighbor. Natural for grid-shaped work.</text>
      </svg>
    </Scene>
  )
}

export function RingTopology() {
  return (
    <Scene label="Ring topology connecting neighbors in a loop">
      <svg viewBox="0 0 1200 560">
        <text x="600" y="40" textAnchor="middle" fill="#1c1917" fontSize="22" fontWeight="900">Ring</text>
        {Array.from({ length: 8 }).map((_, i) => {
          const a = (i / 8) * Math.PI * 2 - Math.PI / 2
          const x = 600 + Math.cos(a) * 180
          const y = 290 + Math.sin(a) * 180
          const a2 = ((i + 1) / 8) * Math.PI * 2 - Math.PI / 2
          const x2 = 600 + Math.cos(a2) * 180
          const y2 = 290 + Math.sin(a2) * 180
          return (
            <g key={i}>
              <path d={`M${x} ${y} L${x2} ${y2}`} stroke="#4338ca" strokeWidth="4" />
              <circle cx={x} cy={y} r="28" fill="#4338ca" />
              <text x={x} y={y + 6} textAnchor="middle" fill="#fff" fontSize="16" fontWeight="900">{i}</text>
            </g>
          )
        })}
      </svg>
    </Scene>
  )
}

export function StaticNetworks() {
  return (
    <Scene label="Static interconnection types: linear, ring, mesh, torus, tree, star, cube, hypercube">
      <svg viewBox="0 0 1200 560">
        {[
          ['Linear', 80],
          ['Ring', 230],
          ['Mesh', 380],
          ['Torus', 530],
          ['Tree', 680],
          ['Star', 830],
          ['Cube', 980],
        ].map(([n, x]) => (
          <g key={n}>
            <rect x={x} y="180" width="130" height="160" rx="14" fill="#fff" stroke="#0e7490" strokeWidth="3" />
            <text x={x + 65} y="270" textAnchor="middle" fill="#0e7490" fontSize="20" fontWeight="900">{n}</text>
          </g>
        ))}
        <text x="600" y="80" textAnchor="middle" fill="#1c1917" fontSize="24" fontWeight="900">Static / direct networks</text>
        <text x="600" y="430" textAnchor="middle" fill="#57534e" fontSize="20" fontWeight="800">Connections are fixed and follow a pattern.</text>
        <text x="600" y="480" textAnchor="middle" fill="#0e7490" fontSize="18" fontWeight="800">Also: hypercube. Each topology is a full-stage picture on later slides.</text>
      </svg>
    </Scene>
  )
}

export function OmegaScene() {
  return (
    <Scene label="Omega multistage network with switches forming dynamic paths">
      <svg viewBox="0 0 1200 560">
        <text x="600" y="40" textAnchor="middle" fill="#1c1917" fontSize="22" fontWeight="900">Dynamic / multistage — Omega idea</text>
        {[0, 1, 2, 3].map((i) => (
          <g key={i}>
            <rect x="80" y={90 + i * 100} width="140" height="60" rx="10" fill="#4338ca" />
            <text x="150" y={128 + i * 100} textAnchor="middle" fill="#fff" fontSize="18" fontWeight="900">in {i}</text>
            <rect x="980" y={90 + i * 100} width="140" height="60" rx="10" fill="#0f766e" />
            <text x="1050" y={128 + i * 100} textAnchor="middle" fill="#fff" fontSize="18" fontWeight="900">out {i}</text>
          </g>
        ))}
        {[0, 1].map((col) => (
          [0, 1, 2, 3].map((row) => (
            <rect key={`${col}-${row}`} x={360 + col * 220} y={100 + row * 100} width="70" height="40" rx="6" fill="#c7d2fe" stroke="#4338ca" className="fo-anim-switch" style={{ animationDelay: `${(col + row) * 0.1}s` }} />
          ))
        ))}
        <path d="M220 120 C320 120, 340 120, 360 120" stroke="#c2410c" strokeWidth="4" className="fo-anim-path" />
        <path d="M430 120 C520 120, 540 320, 580 320" stroke="#c2410c" strokeWidth="4" className="fo-anim-path" />
        <text x="600" y="520" textAnchor="middle" fill="#57534e" fontSize="18" fontWeight="800">Switches set a path at runtime. Not a fixed neighbor pattern.</text>
      </svg>
    </Scene>
  )
}

export function DataDecomposition() {
  return (
    <Scene label="An array partitioned by blocks among p processes">
      <svg viewBox="0 0 1200 560">
        <text x="600" y="40" textAnchor="middle" fill="#1c1917" fontSize="22" fontWeight="900">x[i] += y[i]  ·  assign elements 0…n/p − 1, n/p…2n/p − 1, …</text>
        {['0 … n/p−1', 'n/p … 2n/p−1', '2n/p … 3n/p−1', '3n/p … n−1'].map((t, i) => (
          <g key={t}>
            <rect x={40 + i * 290} y="100" width="260" height="220" rx="14" fill="#fff" stroke="#4338ca" strokeWidth="3" />
            {Array.from({ length: 8 }).map((_, k) => (
              <rect key={k} x={60 + i * 290} y={130 + k * 22} width="220" height="18" rx="3" fill={['#4338ca', '#0f766e', '#c2410c', '#6d28d9'][i]} opacity={0.35 + (k % 3) * 0.2} />
            ))}
            <text x={170 + i * 290} y="360" textAnchor="middle" fill="#1c1917" fontSize="18" fontWeight="900">{t}</text>
            <rect x={70 + i * 290} y="390" width="200" height="50" rx="10" fill="#4338ca" />
            <text x={170 + i * 290} y="422" textAnchor="middle" fill="#fff" fontSize="18" fontWeight="900">thread {i}</text>
          </g>
        ))}
      </svg>
    </Scene>
  )
}

export function TaskDecomposition() {
  return (
    <Scene label="One application broken into functional tasks">
      <svg viewBox="0 0 1200 560">
        <rect x="400" y="40" width="400" height="80" rx="14" fill="#1c1917" />
        <text x="600" y="90" textAnchor="middle" fill="#fff" fontSize="22" fontWeight="900">one application</text>
        {['read input', 'compute', 'exchange', 'write output'].map((t, i) => (
          <g key={t}>
            <path d={`M600 120 L${150 + i * 300} 220`} stroke="#4338ca" strokeWidth="3" className="fo-anim-fan" />
            <rect x={40 + i * 300} y="220" width="220" height="120" rx="14" fill="#4338ca" />
            <text x={150 + i * 300} y="290" textAnchor="middle" fill="#fff" fontSize="20" fontWeight="900">{t}</text>
          </g>
        ))}
        <text x="600" y="420" textAnchor="middle" fill="#57534e" fontSize="20" fontWeight="800">Task-parallelism partitions the various tasks among the cores.</text>
      </svg>
    </Scene>
  )
}

export function LoadBalance() {
  return (
    <Scene label="Balanced workers finish together; unbalanced leaves one worker remaining">
      <svg viewBox="0 0 1200 560">
        <text x="280" y="48" textAnchor="middle" fill="#0f766e" fontSize="22" fontWeight="900">Balanced</text>
        {[0, 1, 2, 3].map((i) => (
          <g key={i}>
            <text x="70" y={110 + i * 80} fill="#1c1917" fontSize="18" fontWeight="800">W{i}</text>
            <rect x="120" y={88 + i * 80} width="360" height="36" rx="8" fill="#0f766e" />
          </g>
        ))}
        <text x="920" y="48" textAnchor="middle" fill="#9f1239" fontSize="22" fontWeight="900">Unbalanced</text>
        {[120, 200, 280, 480].map((w, i) => (
          <g key={i}>
            <text x="640" y={110 + i * 80} fill="#1c1917" fontSize="18" fontWeight="800">W{i}</text>
            <rect x="700" y={88 + i * 80} width={w} height="36" rx="8" fill={i === 3 ? '#9f1239' : '#c2410c'} className={i === 3 ? 'fo-anim-pulse' : ''} />
          </g>
        ))}
        <text x="600" y="460" textAnchor="middle" fill="#57534e" fontSize="20" fontWeight="800">Divide work so each process/thread gets roughly the same amount.</text>
        <text x="600" y="510" textAnchor="middle" fill="#4338ca" fontSize="18" fontWeight="800">Module 2 later measures how much this costs in runtime.</text>
      </svg>
    </Scene>
  )
}

export function ParallelBarrier() {
  return (
    <Scene label="Workers finish a phase at different times and wait at a barrier">
      <svg viewBox="0 0 1200 560">
        {[0, 1, 2, 3].map((i) => (
          <g key={i}>
            <text x="60" y={110 + i * 90} fill="#1c1917" fontSize="20" fontWeight="900">worker {i}</text>
            <rect x="200" y={86 + i * 90} width={220 + i * 80} height="40" rx="8" fill="#4338ca" className="fo-anim-arrive" style={{ animationDelay: `${i * 0.2}s` }} />
          </g>
        ))}
        <rect x="860" y="60" width="24" height="380" rx="8" fill="#c2410c" />
        <text x="980" y="250" fill="#c2410c" fontSize="22" fontWeight="900">BARRIER</text>
        <text x="600" y="500" textAnchor="middle" fill="#57534e" fontSize="20" fontWeight="800">All must arrive before the next phase starts.</text>
      </svg>
    </Scene>
  )
}

export function ProcessThread() {
  return (
    <Scene label="A process owns memory; threads share that memory with private stacks">
      <svg viewBox="0 0 1200 560">
        <rect x="60" y="60" width="500" height="420" rx="18" fill="#fff" stroke="#4338ca" strokeWidth="4" />
        <text x="310" y="110" textAnchor="middle" fill="#4338ca" fontSize="26" fontWeight="900">Process</text>
        <text x="310" y="160" textAnchor="middle" fill="#1c1917" fontSize="18" fontWeight="800">own address space</text>
        <text x="310" y="210" textAnchor="middle" fill="#57534e" fontSize="18" fontWeight="700">code · data · heap · stack</text>
        <text x="310" y="280" textAnchor="middle" fill="#57534e" fontSize="18" fontWeight="700">OS scheduler</text>
        <text x="310" y="340" textAnchor="middle" fill="#9f1239" fontSize="20" fontWeight="900">heavyweight</text>

        <rect x="640" y="60" width="520" height="420" rx="18" fill="#fff" stroke="#c2410c" strokeWidth="4" />
        <text x="900" y="110" textAnchor="middle" fill="#c2410c" fontSize="26" fontWeight="900">Threads</text>
        {['T0', 'T1', 'T2'].map((t, i) => (
          <rect key={t} x={690 + i * 150} y="170" width="130" height="160" rx="12" fill="#c2410c" />
        ))}
        {['T0', 'T1', 'T2'].map((t, i) => (
          <text key={t} x={755 + i * 150} y="260" textAnchor="middle" fill="#fff" fontSize="22" fontWeight="900">{t}</text>
        ))}
        <text x="900" y="400" textAnchor="middle" fill="#1c1917" fontSize="18" fontWeight="800">share memory · own stack/registers</text>
        <text x="900" y="440" textAnchor="middle" fill="#0f766e" fontSize="18" fontWeight="800">lightweight</text>
      </svg>
    </Scene>
  )
}

export function DynamicStaticThreads() {
  return (
    <Scene label="Dynamic fork of workers versus static team created once">
      <svg viewBox="0 0 1200 560">
        <text x="280" y="48" textAnchor="middle" fill="#4338ca" fontSize="22" fontWeight="900">Dynamic threads</text>
        <rect x="80" y="80" width="160" height="60" rx="10" fill="#1c1917" />
        <text x="160" y="118" textAnchor="middle" fill="#fff" fontSize="18" fontWeight="900">master</text>
        {[0, 1, 2].map((i) => (
          <g key={i}>
            <path d={`M240 110 L${280} ${180 + i * 90}`} stroke="#4338ca" strokeWidth="3" />
            <rect x="280" y={150 + i * 90} width="200" height="56" rx="10" fill="#4338ca" className="fo-anim-arrive" style={{ animationDelay: `${i * 0.25}s` }} />
            <text x="380" y={186 + i * 90} textAnchor="middle" fill="#fff" fontSize="16" fontWeight="900">fork · work · join</text>
          </g>
        ))}
        <text x="920" y="48" textAnchor="middle" fill="#c2410c" fontSize="22" fontWeight="900">Static threads</text>
        <rect x="740" y="80" width="160" height="60" rx="10" fill="#1c1917" />
        <text x="820" y="118" textAnchor="middle" fill="#fff" fontSize="18" fontWeight="900">master</text>
        {[0, 1, 2].map((i) => (
          <rect key={i} x="940" y={150 + i * 90} width="180" height="56" rx="10" fill="#c2410c" />
        ))}
        {[0, 1, 2].map((i) => (
          <text key={i} x="1030" y={186 + i * 90} textAnchor="middle" fill="#fff" fontSize="16" fontWeight="900">stay until done</text>
        ))}
      </svg>
    </Scene>
  )
}

export function NondeterminismScene() {
  return (
    <Scene label="Two threads print in unpredictable order">
      <svg viewBox="0 0 1200 560">
        <rect x="40" y="60" width="520" height="200" rx="16" fill="#fff" stroke="#4338ca" strokeWidth="3" />
        <text x="300" y="110" textAnchor="middle" fill="#4338ca" fontSize="20" fontWeight="900">possible output 1</text>
        <text x="300" y="170" textAnchor="middle" fill="#1c1917" fontSize="22" fontWeight="800">Thread 0 &gt; my_x = 7</text>
        <text x="300" y="220" textAnchor="middle" fill="#1c1917" fontSize="22" fontWeight="800">Thread 1 &gt; my_x = 19</text>
        <rect x="640" y="60" width="520" height="200" rx="16" fill="#fff" stroke="#c2410c" strokeWidth="3" />
        <text x="900" y="110" textAnchor="middle" fill="#c2410c" fontSize="20" fontWeight="900">possible output 2</text>
        <text x="900" y="170" textAnchor="middle" fill="#1c1917" fontSize="22" fontWeight="800">Thread 1 &gt; my_x = 19</text>
        <text x="900" y="220" textAnchor="middle" fill="#1c1917" fontSize="22" fontWeight="800">Thread 0 &gt; my_x = 7</text>
        <text x="600" y="360" textAnchor="middle" fill="#1c1917" fontSize="22" fontWeight="900">Same input. Different order. Same values.</text>
        <text x="600" y="430" textAnchor="middle" fill="#57534e" fontSize="20" fontWeight="800">Nondeterminism: the exact order of threads is unpredictable.</text>
      </svg>
    </Scene>
  )
}

export function RaceConditionScene() {
  const rows = [
    ['0', 'finish my_val', 'still computing'],
    ['1', 'load x = 0', 'finish my_val'],
    ['2', 'load my_val = 7', 'load x = 0'],
    ['3', 'add 7 to x', 'load my_val = 19'],
    ['4', 'store x = 7', 'add 19 to old x'],
    ['5', 'other work', 'store x = 19'],
  ]
  return (
    <Scene label="Race on x += my_val: Core 1 overwrites Core 0 and the sum 26 is lost">
      <svg viewBox="0 0 1200 560">
        <rect x="40" y="40" width="160" height="50" rx="8" fill="#1c1917" />
        <text x="120" y="74" textAnchor="middle" fill="#fff" fontSize="18" fontWeight="900">Time</text>
        <rect x="220" y="40" width="430" height="50" rx="8" fill="#4338ca" />
        <text x="435" y="74" textAnchor="middle" fill="#fff" fontSize="18" fontWeight="900">Core 0  (my_val=7)</text>
        <rect x="670" y="40" width="490" height="50" rx="8" fill="#c2410c" />
        <text x="915" y="74" textAnchor="middle" fill="#fff" fontSize="18" fontWeight="900">Core 1  (my_val=19)</text>
        {rows.map(([t, a, b], i) => (
          <g key={t}>
            <text x="120" y={130 + i * 60} textAnchor="middle" fill="#1c1917" fontSize="20" fontWeight="900">{t}</text>
            <text x="435" y={130 + i * 60} textAnchor="middle" fill="#4338ca" fontSize="18" fontWeight="800">{a}</text>
            <text x="915" y={130 + i * 60} textAnchor="middle" fill="#c2410c" fontSize="18" fontWeight="800">{b}</text>
          </g>
        ))}
        <text x="600" y="530" textAnchor="middle" fill="#9f1239" fontSize="20" fontWeight="900">Final x = 19  ·  lost update  ·  correct sum is 26</text>
      </svg>
    </Scene>
  )
}

export function MutexScene() {
  return (
    <Scene label="A mutex lets only one thread execute the critical section">
      <svg viewBox="0 0 1200 560">
        <rect x="80" y="80" width="280" height="100" rx="14" fill="#4338ca" />
        <text x="220" y="140" textAnchor="middle" fill="#fff" fontSize="22" fontWeight="900">Thread 0  LOCKED</text>
        <rect x="440" y="40" width="320" height="280" rx="18" fill="#fff7ed" stroke="#c2410c" strokeWidth="4" />
        <text x="600" y="100" textAnchor="middle" fill="#c2410c" fontSize="22" fontWeight="900">critical section</text>
        <text x="600" y="160" textAnchor="middle" fill="#1c1917" fontSize="22" fontWeight="900">x += my_val</text>
        <text x="600" y="220" textAnchor="middle" fill="#57534e" fontSize="18" fontWeight="800">one thread at a time</text>
        <rect x="840" y="80" width="280" height="100" rx="14" fill="#e7e5e4" />
        <text x="980" y="140" textAnchor="middle" fill="#78716c" fontSize="22" fontWeight="900">Thread 1  WAIT</text>
        <text x="600" y="400" textAnchor="middle" fill="#1c1917" fontSize="20" fontWeight="800">Lock(&add_my_val_lock);  x += my_val;  Unlock(&add_my_val_lock);</text>
        <text x="600" y="460" textAnchor="middle" fill="#0f766e" fontSize="20" fontWeight="800">Mutual exclusion lock — mutex — protects the shared update.</text>
      </svg>
    </Scene>
  )
}

export function MessagePassing() {
  return (
    <Scene label="Process 1 sends a greeting; process 0 receives it">
      <svg viewBox="0 0 1200 560">
        <rect x="80" y="140" width="320" height="200" rx="16" fill="#fff" stroke="#c2410c" strokeWidth="3" />
        <text x="240" y="200" textAnchor="middle" fill="#c2410c" fontSize="24" fontWeight="900">rank 1</text>
        <text x="240" y="250" textAnchor="middle" fill="#1c1917" fontSize="18" fontWeight="800">Send(message, …, 0)</text>
        <text x="240" y="300" textAnchor="middle" fill="#57534e" fontSize="16" fontWeight="700">“Greetings from process 1”</text>
        <rect x="500" y="210" width="200" height="56" rx="12" fill="#fde68a" className="fo-anim-lane" />
        <text x="600" y="246" textAnchor="middle" fill="#1c1917" fontSize="18" fontWeight="900">message</text>
        <rect x="800" y="140" width="320" height="200" rx="16" fill="#fff" stroke="#4338ca" strokeWidth="3" />
        <text x="960" y="200" textAnchor="middle" fill="#4338ca" fontSize="24" fontWeight="900">rank 0</text>
        <text x="960" y="250" textAnchor="middle" fill="#1c1917" fontSize="18" fontWeight="800">Receive(…, 1)</text>
        <text x="960" y="300" textAnchor="middle" fill="#0f766e" fontSize="16" fontWeight="800">prints the greeting</text>
        <text x="600" y="430" textAnchor="middle" fill="#57534e" fontSize="20" fontWeight="800">A message-passing API provides at least send and receive.</text>
        <text x="600" y="480" textAnchor="middle" fill="#4338ca" fontSize="18" fontWeight="800">Module 3 turns this sketch into MPI.</text>
      </svg>
    </Scene>
  )
}

export function OneSidedScene() {
  return (
    <Scene label="One-sided Put/Get: only one process performs the communication">
      <svg viewBox="0 0 1200 560">
        <rect x="80" y="140" width="300" height="180" rx="16" fill="#4338ca" />
        <text x="230" y="220" textAnchor="middle" fill="#fff" fontSize="24" fontWeight="900">Process A</text>
        <text x="230" y="270" textAnchor="middle" fill="#c7d2fe" fontSize="18" fontWeight="800">Put / Get / Accumulate</text>
        <path d="M380 230 H700" stroke="#c2410c" strokeWidth="6" className="fo-anim-path" />
        <text x="540" y="210" textAnchor="middle" fill="#c2410c" fontSize="18" fontWeight="900">writes into B’s memory</text>
        <rect x="720" y="140" width="400" height="180" rx="16" fill="#e7e5e4" />
        <text x="920" y="220" textAnchor="middle" fill="#57534e" fontSize="24" fontWeight="900">Process B</text>
        <text x="920" y="270" textAnchor="middle" fill="#78716c" fontSize="18" fontWeight="800">no matching receive</text>
        <text x="600" y="420" textAnchor="middle" fill="#1c1917" fontSize="20" fontWeight="800">One-sided: only one process performs the operation.</text>
        <text x="600" y="470" textAnchor="middle" fill="#57534e" fontSize="18" fontWeight="800">Two-sided: both Send and Receive participate.</text>
      </svg>
    </Scene>
  )
}

export function Module1Synthesis() {
  const steps = ['ONE PROCESSOR', 'DECOMPOSE', 'PARALLEL EXECUTION', 'ARCHITECTURE', 'MEMORY', 'COORDINATION']
  return (
    <Scene label="Module 1 journey from one processor to coordinated parallel architecture">
      <svg viewBox="0 0 1200 560">
        {steps.map((s, i) => (
          <g key={s}>
            <rect x={40 + (i % 3) * 390} y={60 + Math.floor(i / 3) * 200} width="350" height="140" rx="16" fill={i === 5 ? '#0f766e' : '#fff'} stroke="#4338ca" strokeWidth="3" />
            <text x={215 + (i % 3) * 390} y={140 + Math.floor(i / 3) * 200} textAnchor="middle" fill={i === 5 ? '#fff' : '#4338ca'} fontSize="20" fontWeight="900">{s}</text>
          </g>
        ))}
        <text x="600" y="520" textAnchor="middle" fill="#c2410c" fontSize="20" fontWeight="900">Module 2 asks: how much performance do we actually gain?</text>
      </svg>
    </Scene>
  )
}

export function SyllabusMap() {
  const items = [
    'Need for parallel programs',
    'Hardware and software',
    'Flynn: SISD SIMD MISD MIMD',
    'Interconnection networks',
    'Cache coherence',
    'Shared vs distributed memory',
    'Processes and threads',
    'Coordination and races',
  ]
  return (
    <Scene label="Module 1 syllabus map">
      <div className="fo-chip-row" style={{ gridTemplateColumns: 'repeat(4, minmax(0, 1fr))' }}>
        {items.map((t, i) => (
          <article key={t} className="fo-chip" style={{ '--i': i }}>
            <strong>{String(i + 1).padStart(2, '0')}</strong>
            <span>{t}</span>
          </article>
        ))}
      </div>
    </Scene>
  )
}

export function AppsWall() {
  const items = ['Human genome', 'Medical imaging', 'Web search', 'Games', 'Climate models', 'Protein folding', 'Drug discovery', 'Energy research', 'Data analysis']
  return (
    <Scene label="Applications that needed more computational power">
      <div className="fo-chip-row" style={{ gridTemplateColumns: 'repeat(3, minmax(0, 1fr))' }}>
        {items.map((t, i) => (
          <article key={t} className="fo-chip" style={{ '--i': i }}>
            <strong>{t}</strong>
            <span>source application</span>
          </article>
        ))}
      </div>
    </Scene>
  )
}

export function UsesWall() {
  const items = [
    ['Speed', '10 hours on 1 CPU → 1 hour on 10'],
    ['Bigger problems', 'climate · DNA'],
    ['Resource use', 'multicore, GPU, cloud'],
    ['Real time', 'imaging · robotics · cars'],
    ['Energy', 'share work, less heat'],
    ['Scale + simulate', 'add nodes as data grows'],
  ]
  return (
    <Scene label="Why parallel computing is used">
      <div className="fo-chip-row" style={{ gridTemplateColumns: 'repeat(3, minmax(0, 1fr))' }}>
        {items.map(([t, s], i) => (
          <article key={t} className="fo-chip" style={{ '--i': i }}>
            <strong>{t}</strong>
            <span>{s}</span>
          </article>
        ))}
      </div>
    </Scene>
  )
}

export function ApiPreview() {
  const items = [
    ['MPI', 'processes + messages', 'distributed memory'],
    ['Pthreads', 'threads + locks', 'shared memory'],
    ['OpenMP', 'compiler directives', 'shared-memory multicore'],
    ['CUDA', 'thousands of GPU threads', 'AI and HPC'],
  ]
  return (
    <Scene label="The four APIs this course will teach">
      <div className="fo-chip-row">
        {items.map(([t, s, p], i) => (
          <article key={t} className="fo-chip" style={{ '--i': i }}>
            <strong>{t}</strong>
            <span>{s}</span>
            <span>{p}</span>
          </article>
        ))}
      </div>
    </Scene>
  )
}

export function LibraryTable() {
  const rows = [
    ['OpenMP', 'C/C++/Fortran threads', 'shared memory'],
    ['MPI', 'clusters', 'distributed memory'],
    ['CUDA', 'NVIDIA GPU', 'HPC / AI'],
    ['OpenCL', 'CPU + GPU', 'heterogeneous'],
  ]
  return (
    <Scene label="Popular parallel libraries">
      <svg viewBox="0 0 1200 560">
        {rows.map(([a, b, c], i) => (
          <g key={a} transform={`translate(60 ${50 + i * 120})`}>
            <rect width="1080" height="100" rx="14" fill="#fff" stroke="#4338ca" strokeWidth="3" />
            <text x="160" y="60" fill="#4338ca" fontSize="26" fontWeight="900">{a}</text>
            <text x="520" y="60" fill="#1c1917" fontSize="22" fontWeight="800">{b}</text>
            <text x="920" y="60" fill="#57534e" fontSize="20" fontWeight="800">{c}</text>
          </g>
        ))}
      </svg>
    </Scene>
  )
}

export function HypercubeScene() {
  return (
    <Scene label="Hypercube: nodes differ by one bit along each dimension">
      <svg viewBox="0 0 1200 560">
        <text x="600" y="40" textAnchor="middle" fill="#1c1917" fontSize="22" fontWeight="900">Cube / hypercube intuition</text>
        {[[300, 180], [520, 180], [300, 380], [520, 380], [420, 120], [640, 120], [420, 320], [640, 320]].map(([x, y], i) => (
          <g key={i}>
            <circle cx={x} cy={y} r="26" fill="#0e7490" />
            <text x={x} y={y + 6} textAnchor="middle" fill="#fff" fontSize="14" fontWeight="900">{i.toString(2).padStart(3, '0')}</text>
          </g>
        ))}
        <path d="M300 180 H520 M300 380 H520 M300 180 V380 M520 180 V380 M420 120 H640 M420 320 H640 M420 120 V320 M640 120 V320 M300 180 L420 120 M520 180 L640 120 M300 380 L420 320 M520 380 L640 320" fill="none" stroke="#0e7490" strokeWidth="3" />
        <text x="900" y="240" fill="#1c1917" fontSize="20" fontWeight="800">Each hop flips one bit.</text>
        <text x="900" y="290" fill="#57534e" fontSize="18" fontWeight="700">Used in supercomputers.</text>
      </svg>
    </Scene>
  )
}

export function TorusScene() {
  return (
    <Scene label="Torus wraps mesh edges so every node has four neighbors">
      <svg viewBox="0 0 1200 560">
        <text x="600" y="40" textAnchor="middle" fill="#1c1917" fontSize="22" fontWeight="900">Torus — mesh with wrap-around</text>
        {Array.from({ length: 9 }).map((_, i) => {
          const x = 360 + (i % 3) * 160
          const y = 120 + Math.floor(i / 3) * 120
          return (
            <g key={i}>
              <circle cx={x} cy={y} r="26" fill="#4338ca" />
              <text x={x} y={y + 6} textAnchor="middle" fill="#fff" fontSize="16" fontWeight="900">{i}</text>
            </g>
          )
        })}
        <path d="M360 120 H680 M360 240 H680 M360 360 H680 M360 120 V360 M520 120 V360 M680 120 V360" fill="none" stroke="#4338ca" strokeWidth="4" />
        <path d="M360 120 C300 60, 740 60, 680 120" fill="none" stroke="#c2410c" strokeWidth="3" className="fo-anim-path" />
        <path d="M360 120 C280 240, 280 240, 360 360" fill="none" stroke="#c2410c" strokeWidth="3" />
        <text x="600" y="500" textAnchor="middle" fill="#57534e" fontSize="18" fontWeight="800">Edge nodes wrap to the opposite side. No special border.</text>
      </svg>
    </Scene>
  )
}

export function StarTreeScene() {
  return (
    <Scene label="Star has a hub; tree is hierarchical">
      <svg viewBox="0 0 1200 560">
        <text x="300" y="48" textAnchor="middle" fill="#4338ca" fontSize="22" fontWeight="900">Star</text>
        <circle cx="300" cy="260" r="32" fill="#c2410c" />
        <text x="300" y="266" textAnchor="middle" fill="#fff" fontSize="16" fontWeight="900">hub</text>
        {[0, 1, 2, 3, 4, 5].map((i) => {
          const a = (i / 6) * Math.PI * 2
          const x = 300 + Math.cos(a) * 140
          const y = 260 + Math.sin(a) * 140
          return (
            <g key={i}>
              <path d={`M300 260 L${x} ${y}`} stroke="#4338ca" strokeWidth="3" />
              <circle cx={x} cy={y} r="22" fill="#4338ca" />
            </g>
          )
        })}
        <text x="900" y="48" textAnchor="middle" fill="#0f766e" fontSize="22" fontWeight="900">Tree</text>
        <circle cx="900" cy="110" r="24" fill="#0f766e" />
        <circle cx="820" cy="230" r="24" fill="#0f766e" />
        <circle cx="980" cy="230" r="24" fill="#0f766e" />
        <circle cx="760" cy="360" r="22" fill="#0f766e" />
        <circle cx="880" cy="360" r="22" fill="#0f766e" />
        <circle cx="1020" cy="360" r="22" fill="#0f766e" />
        <path d="M900 134 L820 206 M900 134 L980 206 M820 254 L760 338 M820 254 L880 338 M980 254 L1020 338" stroke="#0f766e" strokeWidth="3" />
        <text x="600" y="500" textAnchor="middle" fill="#57534e" fontSize="18" fontWeight="800">Star: all traffic through the hub. Tree: root can become a bottleneck.</text>
      </svg>
    </Scene>
  )
}

export function CommCost() {
  const items = [
    ['Latency', 'startup time before data arrives'],
    ['Bandwidth', 'rate of data transfer'],
    ['Bisection', 'capacity across a network cut'],
    ['Contention', 'slowdown from competing messages'],
  ]
  return (
    <Scene label="Communication cost vocabulary">
      <div className="fo-chip-row">
        {items.map(([t, s], i) => (
          <article key={t} className="fo-chip" style={{ '--i': i }}>
            <strong>{t}</strong>
            <span>{s}</span>
          </article>
        ))}
      </div>
    </Scene>
  )
}

export function FalseSharing() {
  return (
    <Scene label="Two independent variables on one cache line cause extra coherence traffic">
      <svg viewBox="0 0 1200 560">
        <rect x="200" y="160" width="800" height="140" rx="16" fill="#fff" stroke="#c2410c" strokeWidth="4" />
        <text x="600" y="140" textAnchor="middle" fill="#c2410c" fontSize="22" fontWeight="900">one cache line</text>
        <rect x="240" y="200" width="300" height="60" rx="10" fill="#4338ca" />
        <text x="390" y="240" textAnchor="middle" fill="#fff" fontSize="20" fontWeight="900">counter A  ·  P0</text>
        <rect x="660" y="200" width="300" height="60" rx="10" fill="#0f766e" />
        <text x="810" y="240" textAnchor="middle" fill="#fff" fontSize="20" fontWeight="900">counter B  ·  P1</text>
        <text x="600" y="400" textAnchor="middle" fill="#1c1917" fontSize="22" fontWeight="900">Logically independent. Physically sharing a line.</text>
        <text x="600" y="460" textAnchor="middle" fill="#9f1239" fontSize="20" fontWeight="800">Coherence traffic rises even without true sharing.</text>
      </svg>
    </Scene>
  )
}

export function SnoopingVsDirectory() {
  return (
    <Scene label="Snooping watches the bus; a directory tracks who holds copies">
      <svg viewBox="0 0 1200 560">
        <rect x="40" y="70" width="540" height="400" rx="18" fill="#fff" stroke="#4338ca" strokeWidth="3" />
        <text x="310" y="130" textAnchor="middle" fill="#4338ca" fontSize="26" fontWeight="900">Snooping</text>
        <text x="310" y="200" textAnchor="middle" fill="#1c1917" fontSize="20" fontWeight="800">caches watch the bus</text>
        <text x="310" y="260" textAnchor="middle" fill="#57534e" fontSize="18" fontWeight="700">write-invalidate or write-update</text>
        <text x="310" y="330" textAnchor="middle" fill="#57534e" fontSize="18" fontWeight="700">simple on small systems</text>
        <text x="310" y="390" textAnchor="middle" fill="#9f1239" fontSize="18" fontWeight="800">broadcast limits scale</text>
        <rect x="620" y="70" width="540" height="400" rx="18" fill="#fff" stroke="#0f766e" strokeWidth="3" />
        <text x="890" y="130" textAnchor="middle" fill="#0f766e" fontSize="26" fontWeight="900">Directory</text>
        <text x="890" y="200" textAnchor="middle" fill="#1c1917" fontSize="20" fontWeight="800">a table of sharers</text>
        <text x="890" y="260" textAnchor="middle" fill="#57534e" fontSize="18" fontWeight="700">informs owners to update or drop</text>
        <text x="890" y="330" textAnchor="middle" fill="#57534e" fontSize="18" fontWeight="700">better for larger systems</text>
        <text x="890" y="390" textAnchor="middle" fill="#0f766e" fontSize="18" fontWeight="800">tracking overhead</text>
      </svg>
    </Scene>
  )
}

export function KeyTerms() {
  const items = ['parallelism', 'core', 'multicore', 'SISD', 'SIMD', 'MISD', 'MIMD', 'UMA', 'NUMA', 'coherence', 'mutex', 'message passing']
  return (
    <Scene label="Must-remember Module 1 terms">
      <div className="fo-chip-row" style={{ gridTemplateColumns: 'repeat(4, minmax(0, 1fr))' }}>
        {items.map((t, i) => (
          <article key={t} className="fo-chip" style={{ '--i': i }}>
            <strong>{t}</strong>
          </article>
        ))}
      </div>
    </Scene>
  )
}

export function ExamList({ items }) {
  return (
    <Scene label="Exam question list">
      <svg viewBox="0 0 1200 560">
        {items.map((t, i) => {
          const col = i < Math.ceil(items.length / 2) ? 0 : 1
          const row = col === 0 ? i : i - Math.ceil(items.length / 2)
          const x = 40 + col * 590
          const y = 30 + row * 52
          return (
            <g key={t}>
              <rect x={x} y={y} width="560" height="44" rx="10" fill="#fff" stroke="#4338ca" strokeWidth="2" />
              <text x={x + 16} y={y + 29} fill="#1c1917" fontSize="16" fontWeight="800">{t}</text>
            </g>
          )
        })}
      </svg>
    </Scene>
  )
}
