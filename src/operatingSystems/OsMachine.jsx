import { useEffect, useId, useState } from 'react'

const C = {
  navy: '#1b2a41',
  kernel: '#2563eb',
  process: '#0891b2',
  memory: '#7c3aed',
  ok: '#15803d',
  wait: '#d97706',
  fault: '#dc2626',
  cream: '#fffcf7',
  muted: '#5c6b7a',
  ink: '#1a2433',
}

export function Scene({ children, viewBox = '0 0 640 360', label = 'Operating system visual', hud }) {
  const id = `os-${useId().replace(/:/g, '')}`
  return (
    <div className="os-scene" aria-label={label}>
      <svg viewBox={viewBox} role="img">
        <defs>
          <linearGradient id={`${id}-k`} x1="0" y1="0" x2="1" y2="1">
            <stop stopColor={C.kernel} />
            <stop offset="1" stopColor={C.process} />
          </linearGradient>
          <filter id={`${id}-s`} x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="6" stdDeviation="6" floodColor={C.navy} floodOpacity=".14" />
          </filter>
        </defs>
        <rect width="100%" height="100%" fill={C.cream} />
        <g style={{ filter: `url(#${id}-s)` }}>{children}</g>
      </svg>
      {hud && <div className="os-scene-hud">{hud}</div>}
    </div>
  )
}

function T({ x, y, children, size = 14, fill = C.ink, anchor = 'start', weight = 800 }) {
  return (
    <text x={x} y={y} fontSize={size} fill={fill} textAnchor={anchor} fontWeight={weight}>
      {children}
    </text>
  )
}

function Box({ x, y, w, h, fill = '#fff', stroke = C.navy, r = 12, className }) {
  return <rect x={x} y={y} width={w} height={h} rx={r} fill={fill} stroke={stroke} strokeWidth="2" className={className} />
}

export function OperatingSystemMachine({ phase = 3 }) {
  return (
    <Scene label="Computer with kernel between apps and hardware">
      <g className="os-anim-boot">
        <Box x="40" y="250" w="560" h="80" fill={C.navy} stroke={C.navy} />
        <T x="320" y="296" anchor="middle" fill="#fff" size="18">HARDWARE — CPU · Memory · Disk · Devices</T>
        <Box x="80" y="150" w="480" h="78" fill={C.kernel} stroke={C.kernel} className="os-anim-kernel" />
        <T x="320" y="196" anchor="middle" fill="#fff" size="20">KERNEL  ·  operating system</T>
        {phase >= 2 && (
          <>
            {[['Editor', 90], ['Browser', 230], ['Compiler', 370], ['Shell', 510]].map(([n, x], i) => (
              <g key={n} style={{ animationDelay: `${0.2 + i * 0.1}s` }} className="os-anim-boot">
                <Box x={x} y="48" w="120" h="64" fill="#fff" stroke={C.process} />
                <T x={x + 60} y="86" anchor="middle" fill={C.process} size="14">{n}</T>
              </g>
            ))}
          </>
        )}
        {phase >= 3 && <T x="320" y="140" anchor="middle" fill={C.muted} size="13">user space  ↑     system calls     ↓  kernel space</T>}
      </g>
    </Scene>
  )
}

export function UserKernelBoundary({ crossing = true }) {
  return (
    <Scene label="User mode crossing into kernel mode">
      <Box x="40" y="40" w="560" h="130" fill="#e8f6fb" stroke={C.process} />
      <T x="60" y="72" fill={C.process}>USER MODE</T>
      <Box x="200" y="70" w="110" h="70" fill={C.process} stroke={C.process} className={crossing ? 'os-anim-mode' : ''} />
      <T x="255" y="112" anchor="middle" fill="#fff">P1</T>
      <Box x="40" y="200" w="560" h="130" fill="#e8eefc" stroke={C.kernel} />
      <T x="60" y="232" fill={C.kernel}>KERNEL MODE</T>
      <Box x="360" y="230" w="160" h="70" fill={C.kernel} stroke={C.kernel} className="os-anim-cpu" />
      <T x="440" y="272" anchor="middle" fill="#fff" size="14">system call</T>
      {crossing && (
        <path d="M255 140 C 255 180, 440 180, 440 230" fill="none" stroke={C.wait} strokeWidth="4" className="os-anim-claim" />
      )}
    </Scene>
  )
}

export function ProcessStateMachine({ active = 'running' }) {
  const states = [
    ['new', 80, 80],
    ['ready', 250, 80],
    ['running', 430, 80],
    ['waiting', 250, 230],
    ['terminated', 540, 230],
  ]
  return (
    <Scene label="Process state machine with a moving process">
      <path d="M150 95 H230 M330 95 H410 M500 95 C 560 95, 560 230, 540 230 M250 150 V200 M430 150 C 430 230, 330 255, 310 255" fill="none" stroke={C.navy} strokeWidth="2.5" />
      {states.map(([name, x, y]) => (
        <g key={name}>
          <circle cx={x} cy={y} r="42" fill={active === name ? C.process : '#fff'} stroke={active === name ? C.process : C.navy} strokeWidth="3" className={active === name ? 'os-anim-cpu' : ''} />
          <T x={x} y={y + 5} anchor="middle" fill={active === name ? '#fff' : C.navy} size="13">{name}</T>
        </g>
      ))}
      <circle cx={states.find((s) => s[0] === active)[1] - 54} cy={states.find((s) => s[0] === active)[2]} r="10" fill={C.wait} className="os-anim-queue" />
    </Scene>
  )
}

export function PCBInspector({ pid = 42, state = 'RUNNING', pc = '0x4AF0' }) {
  const rows = [
    ['PID', pid],
    ['State', state],
    ['Program counter', pc],
    ['Registers', 'AX BX CX SP'],
    ['Scheduling', 'priority 2 · RR'],
    ['Memory', 'base 0x2000 limit 4K'],
    ['I/O', 'disk wait: no'],
  ]
  return (
    <Scene label="Process control block identity card" viewBox="0 0 520 360">
      <Box x="40" y="28" w="440" h="310" fill="#fff" stroke={C.navy} r="18" />
      <Box x="40" y="28" w="440" h="58" fill={C.navy} stroke={C.navy} r="18" />
      <T x="260" y="64" anchor="middle" fill="#fff" size="20">PCB · identity of the process</T>
      {rows.map(([k, v], i) => (
        <g key={k} className="os-anim-queue" style={{ animationDelay: `${i * 0.08}s` }}>
          <T x="70" y={118 + i * 32} fill={C.muted} size="13">{k}</T>
          <T x="250" y={118 + i * 32} fill={C.navy} size="16">{v}</T>
        </g>
      ))}
    </Scene>
  )
}

export function ContextSwitchScene() {
  return (
    <Scene label="Context switch transferring PCB state">
      <Box x="40" y="120" w="150" h="90" fill={C.process} stroke={C.process} className="os-anim-queue" />
      <T x="115" y="172" anchor="middle" fill="#fff">P1 out</T>
      <Box x="245" y="80" w="150" h="170" fill={C.navy} stroke={C.navy} className="os-anim-cpu" />
      <T x="320" y="140" anchor="middle" fill="#fff">CPU</T>
      <T x="320" y="168" anchor="middle" fill="#7dd3fc" size="13">save PCB</T>
      <T x="320" y="192" anchor="middle" fill="#86efac" size="13">load PCB</T>
      <Box x="450" y="120" w="150" h="90" fill={C.kernel} stroke={C.kernel} />
      <T x="525" y="172" anchor="middle" fill="#fff">P2 in</T>
      <path d="M190 165 H245" stroke={C.wait} strokeWidth="4" className="os-anim-claim" />
      <path d="M395 165 H450" stroke={C.ok} strokeWidth="4" className="os-anim-claim" />
    </Scene>
  )
}

export function ReadyQueue({ items = ['P1', 'P2', 'P3', 'P4'], cpu = 'P0' }) {
  return (
    <div className="os-scene" style={{ display: 'grid', gridTemplateRows: '1fr auto', padding: 16, gap: 12 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <div className="os-cpu-core">{cpu}<small style={{ fontSize: 11, fontWeight: 700 }}>CPU</small></div>
        <div>
          <div style={{ fontSize: 12, fontWeight: 800, color: C.muted, marginBottom: 8 }}>READY QUEUE</div>
          <div className="os-ready-row">
            {items.map((p, i) => (
              <span key={p} className="os-chip os-chip-p os-anim-queue" style={{ animationDelay: `${i * 0.12}s` }}>{p}</span>
            ))}
          </div>
        </div>
      </div>
      <div className="os-scene-hud"><span>Short-term scheduler picks the head of the ready queue.</span></div>
    </div>
  )
}

export function InterruptScene() {
  return (
    <Scene label="Interrupt diverting the CPU to a handler">
      <Box x="60" y="140" w="200" h="80" fill={C.process} stroke={C.process} />
      <T x="160" y="186" anchor="middle" fill="#fff">user process</T>
      <path d="M260 180 C 340 80, 420 80, 500 140" fill="none" stroke={C.fault} strokeWidth="4" className="os-anim-claim" />
      <circle cx="380" cy="90" r="18" fill={C.fault} className="os-anim-irq" />
      <T x="380" y="96" anchor="middle" fill="#fff" size="11">IRQ</T>
      <Box x="460" y="150" w="140" h="80" fill={C.navy} stroke={C.navy} />
      <T x="530" y="196" anchor="middle" fill="#fff" size="13">handler</T>
    </Scene>
  )
}

export function RaceConditionScene({ step = 2 }) {
  const lines = [
    ['P1', 'reg = counter  // 5'],
    ['P2', 'reg = counter  // 5'],
    ['P1', 'reg = reg + 1   // 6'],
    ['P2', 'reg = reg + 1   // 6'],
    ['P1', 'counter = reg   // 6'],
    ['P2', 'counter = reg   // 6  WRONG'],
  ]
  return (
    <div className="os-scene os-term">
      <div className="cmd">shared counter starts at 5</div>
      {lines.slice(0, step + 1).map(([who, line], i) => (
        <div key={i} className={i === 5 ? 'err' : 'ok'}>
          {who}: {line}
        </div>
      ))}
      {step >= 5 && <div className="err">Lost update — both thought they added 1 to 5.</div>}
    </div>
  )
}

export function CriticalSectionGate({ locked = true }) {
  return (
    <Scene label="Critical section gate with mutex">
      <Box x="40" y="120" w="160" h="100" fill={C.process} stroke={C.process} />
      <T x="120" y="176" anchor="middle" fill="#fff">P1</T>
      <Box x="240" y="90" w="160" h="160" fill={locked ? C.fault : C.ok} stroke={locked ? C.fault : C.ok} className="os-anim-lock" />
      <T x="320" y="160" anchor="middle" fill="#fff">{locked ? 'LOCKED' : 'OPEN'}</T>
      <T x="320" y="186" anchor="middle" fill="#fff" size="12">critical section</T>
      <Box x="440" y="120" w="160" h="100" fill={C.wait} stroke={C.wait} />
      <T x="520" y="176" anchor="middle" fill="#fff">P2 waits</T>
    </Scene>
  )
}

export function SemaphoreMachine({ empty = 2, full = 1, mutex = 1 }) {
  return (
    <Scene label="Semaphore values for producer-consumer" viewBox="0 0 520 300">
      {[
        ['empty', empty, C.process],
        ['full', full, C.wait],
        ['mutex', mutex, C.kernel],
      ].map(([n, v, c], i) => (
        <g key={n} transform={`translate(${40 + i * 160} 70)`}>
          <circle cx="70" cy="80" r="58" fill={c} className="os-anim-kernel" />
          <T x="70" y="76" anchor="middle" fill="#fff" size="28">{v}</T>
          <T x="70" y="170" anchor="middle" fill={C.navy}>{n}</T>
        </g>
      ))}
    </Scene>
  )
}

export function ProducerConsumerBuffer({ slots = ['A', 'B', null, null] }) {
  return (
    <Scene label="Bounded buffer" viewBox="0 0 560 220">
      {slots.map((s, i) => (
        <g key={i}>
          <Box x={40 + i * 130} y="60" w="110" h="100" fill={s ? C.process : '#fff'} stroke={C.navy} />
          <T x={95 + i * 130} y="118" anchor="middle" fill={s ? '#fff' : C.muted} size="22">{s || 'empty'}</T>
        </g>
      ))}
    </Scene>
  )
}

export function DiningPhilosophersScene({ deadlock = false }) {
  const n = 5
  const cx = 320
  const cy = 180
  return (
    <Scene label="Dining philosophers around a table">
      <circle cx={cx} cy={cy} r="58" fill="#fff" stroke={C.navy} strokeWidth="3" />
      <T x={cx} y={cy + 6} anchor="middle">table</T>
      {Array.from({ length: n }).map((_, i) => {
        const a = (i / n) * Math.PI * 2 - Math.PI / 2
        const px = cx + Math.cos(a) * 130
        const py = cy + Math.sin(a) * 110
        const fx = cx + Math.cos(a + Math.PI / n) * 86
        const fy = cy + Math.sin(a + Math.PI / n) * 74
        return (
          <g key={i} className={deadlock ? 'os-anim-freeze' : ''}>
            <circle cx={px} cy={py} r="28" fill={deadlock ? C.fault : C.process} />
            <T x={px} y={py + 5} anchor="middle" fill="#fff" size="12">{`P${i}`}</T>
            <rect x={fx - 6} y={fy - 14} width="12" height="28" rx="3" fill={deadlock ? C.wait : C.navy} transform={`rotate(${(a * 180) / Math.PI} ${fx} ${fy})`} />
          </g>
        )
      })}
      {deadlock && <T x="320" y="340" anchor="middle" fill={C.fault}>CIRCULAR WAIT — DEADLOCK</T>}
    </Scene>
  )
}

export function ResourceAllocationGraph({ cycle = true }) {
  return (
    <Scene label="Resource allocation graph">
      <circle cx="140" cy="100" r="36" fill={C.process} />
      <T x="140" y="106" anchor="middle" fill="#fff">P1</T>
      <circle cx="140" cy="250" r="36" fill={C.process} />
      <T x="140" y="256" anchor="middle" fill="#fff">P2</T>
      <rect x="400" y="70" width="70" height="70" fill={C.kernel} />
      <T x="435" y="112" anchor="middle" fill="#fff">R1</T>
      <rect x="400" y="220" width="70" height="70" fill={C.memory} />
      <T x="435" y="262" anchor="middle" fill="#fff">R2</T>
      <path d="M176 100 H400" stroke={C.ok} strokeWidth="3" markerEnd="url(#arr)" className="os-anim-claim" />
      <path d="M176 250 H400" stroke={C.ok} strokeWidth="3" className="os-anim-claim" />
      {cycle && (
        <>
          <path d="M435 140 V220" stroke={C.fault} strokeWidth="3" className="os-anim-freeze" />
          <path d="M400 100 C 300 100, 300 250, 176 250" fill="none" stroke={C.fault} strokeWidth="3" />
          <T x="320" y="40" anchor="middle" fill={C.fault}>cycle ⇒ deadlock possible</T>
        </>
      )}
    </Scene>
  )
}

export function MemoryMap({
  segments = [
    ['OS kernel', 2, C.navy],
    ['P1', 2, C.process],
    ['hole', 1, '#e8e0d4'],
    ['P2', 3, C.kernel],
    ['P3', 2, C.memory],
    ['free', 2, '#e8e0d4'],
  ],
}) {
  const total = segments.reduce((a, [, u]) => a + u, 0)
  const x0 = 70
  const top = 120
  const width = 860
  const h = 210
  let cursor = x0
  return (
    <Scene label="Physical memory divided among the OS and processes" viewBox="0 0 1000 480">
      <T x={x0} y={78} size="22" fill={C.navy} anchor="start">PHYSICAL MEMORY</T>
      <T x={x0} y={104} size="15" fill={C.muted} anchor="start">the OS tracks who owns every byte</T>
      {segments.map(([label, units, color], i) => {
        const w = (units / total) * width
        const x = cursor
        cursor += w
        const hole = color === '#e8e0d4'
        return (
          <g key={label + i}>
            <rect x={x} y={top} width={w - 3} height={h} rx="10" fill={color} className="os-anim-fill" style={{ transformOrigin: `${x}px ${top + h}px`, animationDelay: `${i * 0.12}s` }} />
            <T x={x + (w - 3) / 2} y={top + h / 2 + 6} anchor="middle" fill={hole ? C.muted : '#fff'} size="22">{label}</T>
            {hole && <T x={x + (w - 3) / 2} y={top + h / 2 + 30} anchor="middle" fill={C.muted} size="14" weight="600">allocatable</T>}
          </g>
        )
      })}
      <line x1={x0} y1={top + h + 20} x2={x0 + width} y2={top + h + 20} stroke={C.line} strokeWidth="2" />
      <T x={x0} y={top + h + 44} size="15" fill={C.muted} anchor="start">0x0000</T>
      <T x={x0 + width} y={top + h + 44} size="15" fill={C.muted} anchor="end">high memory</T>
    </Scene>
  )
}

export function LogicalPhysicalAddress({ logical = '0x3A7C', page = '0x3A', off = '0x7C', frame = '0x09', physical = '0x097C' }) {
  return (
    <Scene label="Logical address travelling through the MMU">
      <Box x="30" y="140" w="140" h="70" fill={C.navy} className="os-anim-cpu" />
      <T x="100" y="170" anchor="middle" fill="#fff" size="13">CPU</T>
      <T x="100" y="192" anchor="middle" fill="#7dd3fc" size="12">{logical}</T>
      <Box x="210" y="40" w="120" h="56" fill={C.process} />
      <T x="270" y="64" anchor="middle" fill="#fff" size="12">page {page}</T>
      <T x="270" y="82" anchor="middle" fill="#fff" size="12">off {off}</T>
      <Box x="360" y="130" w="120" h="90" fill={C.memory} className="os-anim-kernel" />
      <T x="420" y="172" anchor="middle" fill="#fff">MMU</T>
      <T x="420" y="196" anchor="middle" fill="#fff" size="12">frame {frame}</T>
      <Box x="510" y="140" w="110" h="70" fill={C.ok} />
      <T x="565" y="170" anchor="middle" fill="#fff" size="12">RAM</T>
      <T x="565" y="192" anchor="middle" fill="#fff" size="12">{physical}</T>
      <path d="M170 175 H210 M330 70 C 350 70, 360 150, 360 160 M480 175 H510" fill="none" stroke={C.wait} strokeWidth="3" className="os-anim-claim" />
    </Scene>
  )
}

export function TLBLookup({ hit = true }) {
  return (
    <Scene label="TLB hit versus miss paths">
      <Box x="40" y="140" w="100" h="70" fill={C.navy} />
      <T x="90" y="182" anchor="middle" fill="#fff">CPU</T>
      <Box x="180" y="60" w="140" h="80" fill={hit ? C.ok : C.wait} className={hit ? 'os-anim-cpu' : 'os-anim-freeze'} />
      <T x="250" y="96" anchor="middle" fill="#fff">TLB</T>
      <T x="250" y="118" anchor="middle" fill="#fff" size="13">{hit ? 'HIT' : 'MISS'}</T>
      <Box x="180" y="210" w="140" h="80" fill={C.memory} />
      <T x="250" y="256" anchor="middle" fill="#fff" size="14">page table</T>
      <Box x="420" y="140" w="160" h="70" fill={C.kernel} />
      <T x="500" y="182" anchor="middle" fill="#fff">frame in RAM</T>
      <path d="M140 175 H180" stroke={C.navy} strokeWidth="3" />
      <path d={hit ? 'M320 100 C 380 100, 400 160, 420 170' : 'M250 140 V210 M320 250 C 380 250, 400 190, 420 175'} fill="none" stroke={hit ? C.ok : C.fault} strokeWidth="3" className="os-anim-claim" />
    </Scene>
  )
}

export function PageFaultJourney({ step = 3 }) {
  const labels = ['request page 7', 'not present', 'trap to OS', 'find on disk', 'load frame', 'restart']
  return (
    <Scene label="Page fault journey from CPU to disk and back">
      {labels.map((l, i) => (
        <g key={l} opacity={i <= step ? 1 : 0.25} className={i === step ? 'os-anim-queue' : ''}>
          <Box x={20 + (i % 3) * 200} y={i < 3 ? 50 : 200} w="180" h="80" fill={i === 1 ? C.fault : i === 4 ? C.ok : C.kernel} />
          <T x={110 + (i % 3) * 200} y={i < 3 ? 96 : 246} anchor="middle" fill="#fff" size="13">{l}</T>
        </g>
      ))}
    </Scene>
  )
}

export function FileSystemTree({ highlight = 'student' }) {
  const nodes = [
    ['/', 320, 40],
    ['home', 160, 120],
    ['etc', 320, 120],
    ['usr', 480, 120],
    ['student', 90, 220],
    ['faculty', 230, 220],
    ['bin', 480, 220],
  ]
  return (
    <Scene label="Directory tree growing">
      <path d="M320 62 V100 M160 100 H480 M160 120 V200 M480 120 V200 M90 200 H230" stroke={C.navy} fill="none" strokeWidth="2" />
      {nodes.map(([n, x, y], i) => (
        <g key={n} className="os-anim-tree" style={{ animationDelay: `${i * 0.08}s` }}>
          <Box x={x - 46} y={y} w="92" h="40" fill={n === highlight ? C.process : '#fff'} stroke={C.navy} r="10" />
          <T x={x} y={y + 26} anchor="middle" fill={n === highlight ? '#fff' : C.navy} size="13">{n}</T>
        </g>
      ))}
    </Scene>
  )
}

export function FileAllocationVisualizer({ mode = 'contiguous' }) {
  const cells = Array.from({ length: 16 }, (_, i) => i)
  const used = mode === 'contiguous' ? [3, 4, 5, 6] : mode === 'linked' ? [2, 7, 11, 14] : [1, 4, 9, 13]
  return (
    <Scene label={`${mode} file allocation`} viewBox="0 0 640 220">
      <T x="20" y="36" size="16">{mode} allocation — same file, same disk</T>
      {cells.map((i) => (
        <g key={i}>
          <rect x={20 + i * 38} y="80" width="34" height="70" rx="6" fill={used.includes(i) ? C.process : '#fff'} stroke={C.navy} />
          <T x={37 + i * 38} y="122" anchor="middle" fill={used.includes(i) ? '#fff' : C.muted} size="12">{i}</T>
        </g>
      ))}
      {mode === 'linked' && (
        <path d="M95 115 H250 M287 115 H400 M439 115 H530" fill="none" stroke={C.wait} strokeWidth="3" className="os-anim-claim" />
      )}
      {mode === 'indexed' && <T x="20" y="190" fill={C.memory}>index block 1 points to 4, 9, 13</T>}
    </Scene>
  )
}

export function DiskGeometry() {
  return (
    <Scene label="Disk platter with moving head">
      <g className="os-anim-platter" transform="translate(220 180)">
        <circle r="140" fill="#fff" stroke={C.navy} strokeWidth="3" />
        <circle r="100" fill="none" stroke={C.line || '#c9c2b6'} />
        <circle r="60" fill="none" stroke="#c9c2b6" />
        <circle r="16" fill={C.navy} />
      </g>
      <rect x="360" y="40" width="18" height="250" rx="8" fill={C.kernel} />
      <T x="500" y="80">cylinder · track · sector</T>
      <T x="500" y="110" fill={C.muted} size="13">the head must seek</T>
    </Scene>
  )
}

export function FourConditions() {
  const items = ['Mutual exclusion', 'Hold and wait', 'No preemption', 'Circular wait']
  return (
    <Scene label="Four necessary deadlock conditions" viewBox="0 0 640 240">
      {items.map((t, i) => (
        <g key={t}>
          <Box x={20 + i * 155} y="70" w="145" h="110" fill={i === 3 ? C.fault : C.navy} />
          <T x={92 + i * 155} y="132" anchor="middle" fill="#fff" size="13">{t}</T>
        </g>
      ))}
    </Scene>
  )
}

export function ThrashingMonitor({ util = 18, faults = 86 }) {
  return (
    <div className="os-scene" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, padding: 18 }}>
      <article className="os-metrics">
        <article>
          <strong style={{ color: util < 40 ? C.fault : C.ok }}>{util}%</strong>
          <span>CPU utilization</span>
        </article>
      </article>
      <article className="os-metrics">
        <article>
          <strong style={{ color: faults > 40 ? C.fault : C.ok }}>{faults}</strong>
          <span>page faults / sec</span>
        </article>
      </article>
      <div className="os-callout os-callout-fault" style={{ gridColumn: '1 / -1' }}>
        <span>system health</span>
        <p>{util < 40 ? 'THRASHING — the machine is paging, not computing.' : 'Healthy — CPU busy, faults low.'}</p>
      </div>
    </div>
  )
}

export function WorkingSetVisualizer() {
  const pages = [2, 3, 3, 4, 2, 5, 5, 3, 2, 6]
  return (
    <Scene label="Working set window over a reference string" viewBox="0 0 640 200">
      {pages.map((p, i) => (
        <g key={i}>
          <rect x={30 + i * 58} y="70" width="50" height="50" rx="10" fill={i >= 5 ? C.memory : C.process} />
          <T x={55 + i * 58} y="102" anchor="middle" fill="#fff">{p}</T>
        </g>
      ))}
      <rect x="318" y="58" width="292" height="74" fill="none" stroke={C.wait} strokeWidth="3" strokeDasharray="6 4" />
      <T x="30" y="40" fill={C.muted} size="13">Δ working-set window</T>
    </Scene>
  )
}

export function SegmentationVisualizer() {
  return (
    <Scene label="Logical segments mapped to physical memory">
      {['code', 'data', 'stack'].map((n, i) => (
        <g key={n}>
          <Box x="40" y={50 + i * 90} w="160" h="70" fill={C.process} />
          <T x="120" y={90 + i * 90} anchor="middle" fill="#fff">{n}</T>
          <path d={`M200 ${85 + i * 90} H300`} stroke={C.navy} strokeWidth="3" />
          <Box x="300" y={40 + i * 100} w="280" h={60 + i * 8} fill={C.memory} />
          <T x="440" y={78 + i * 100} anchor="middle" fill="#fff">physical {n}</T>
        </g>
      ))}
    </Scene>
  )
}

export function HierarchicalPaging() {
  return (
    <Scene label="Two-level page table">
      <Box x="30" y="130" w="120" h="80" fill={C.navy} />
      <T x="90" y="176" anchor="middle" fill="#fff" size="12">outer page</T>
      <Box x="200" y="50" w="140" h="240" fill={C.memory} />
      <T x="270" y="170" anchor="middle" fill="#fff" size="12">page table</T>
      <Box x="400" y="90" w="200" h="160" fill={C.kernel} />
      <T x="500" y="170" anchor="middle" fill="#fff">page in RAM</T>
      <path d="M150 170 H200 M340 170 H400" stroke={C.wait} strokeWidth="3" className="os-anim-claim" />
    </Scene>
  )
}

export function useTick(max, ms = 900) {
  const [i, setI] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setI((x) => (x + 1) % max), ms)
    return () => clearInterval(t)
  }, [max, ms])
  return i
}

export function LiveStateMachine() {
  const i = useTick(5, 1100)
  const order = ['new', 'ready', 'running', 'waiting', 'terminated']
  return <ProcessStateMachine active={order[i]} />
}

export function LiveRace() {
  const i = useTick(6, 800)
  return <RaceConditionScene step={i} />
}

export function LiveFault() {
  const i = useTick(6, 1000)
  return <PageFaultJourney step={i} />
}

export function LiveThrash() {
  const i = useTick(2, 2200)
  return i === 0 ? <ThrashingMonitor util={88} faults={4} /> : <ThrashingMonitor util={12} faults={91} />
}

export { C, T, Box }
