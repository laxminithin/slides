import { FileSystemTree, OperatingSystemMachine, RaceConditionScene, UserKernelBoundary } from './OsMachine.jsx'
import { CpuScheduler } from './OsSims.jsx'

export function Module1Opening() {
  return (
    <div className="os-scene" style={{ display: 'grid', placeItems: 'center', padding: 12 }}>
      <div style={{ width: '100%', height: '100%' }}>
        <OperatingSystemMachine phase={3} />
      </div>
      <div className="os-scene-hud">
        <span>INSIDE THE MACHINE</span>
        <span>Module 1 · Operating Systems</span>
      </div>
    </div>
  )
}

export function Module2Opening() {
  return (
    <div className="os-scene" style={{ padding: 12, display: 'grid', gap: 8 }}>
      <div style={{ textAlign: 'center', fontWeight: 900, letterSpacing: '0.08em', color: '#0891b2' }}>THE BATTLE FOR THE CPU</div>
      <CpuScheduler algo="fcfs" />
    </div>
  )
}

export function Module3Opening() {
  return (
    <div className="os-scene" style={{ display: 'grid', gridTemplateRows: 'auto 1fr', padding: 12, gap: 8 }}>
      <div style={{ textAlign: 'center', fontWeight: 900, letterSpacing: '0.08em', color: '#d97706' }}>WHEN PROCESSES COLLIDE</div>
      <RaceConditionScene step={5} />
    </div>
  )
}

export function Module4Opening() {
  return (
    <div className="os-scene" style={{ padding: 18, display: 'grid', alignContent: 'center', gap: 14 }}>
      <div style={{ fontWeight: 900, fontSize: 22, color: '#7c3aed' }}>MEMORY IS AN ILLUSION</div>
      <p style={{ margin: 0, fontSize: 16 }}>The program believes it owns one continuous space. Pull the camera back — physical RAM is fragmented. The MMU is already translating.</p>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        <div style={{ background: '#0891b2', color: '#fff', borderRadius: 14, padding: 18, fontWeight: 800 }}>logical 0x0000–0xFFFF</div>
        <div style={{ background: '#7c3aed', color: '#fff', borderRadius: 14, padding: 18, fontWeight: 800 }}>physical frames, scattered</div>
      </div>
    </div>
  )
}

export function Module5Opening() {
  return (
    <div className="os-scene" style={{ display: 'grid', gridTemplateRows: 'auto 1fr', padding: 10, gap: 6 }}>
      <div style={{ textAlign: 'center', fontWeight: 900, letterSpacing: '0.08em', color: '#15803d' }}>WHERE DATA LIVES</div>
      <FileSystemTree highlight="student" />
    </div>
  )
}

export function KernelWakeCard() {
  return <UserKernelBoundary crossing />
}

const ENDINGS = {
  1: {
    title: 'The machine has a mind',
    points: ['OS sits between user and hardware', 'Dual mode protects the kernel', 'System calls are the only legal door', 'Structure: simple → layered → microkernel → modules'],
    confuse: 'Do not confuse CLI (how humans talk) with system calls (how programs talk).',
    q: 'Explain OS services, system calls, and layered vs microkernel structure.',
  },
  2: {
    title: 'Processes compete; the scheduler decides',
    points: ['Process = program in execution + PCB', 'States move: new→ready→run→wait→term', 'FCFS convoy, SJF optimal wait, RR fair response', 'Threads share address space; models 1:1, M:1, M:M'],
    confuse: 'SJF is optimal for waiting time — but you cannot know the next burst exactly.',
    q: 'Compare FCFS, SJF, Priority and Round Robin with a Gantt chart.',
  },
  3: {
    title: 'Share memory, share risk',
    points: ['Race = interleaved writes to shared data', 'Critical section needs ME, progress, bounded wait', 'Semaphores: wait/signal; classic problems', 'Deadlock = 4 conditions + cycle; Banker avoids unsafe states'],
    confuse: 'Starvation is delay; deadlock is freeze. Prevention ≠ avoidance.',
    q: 'Banker’s algorithm safety check + four deadlock conditions.',
  },
  4: {
    title: 'Addresses lie, pages work',
    points: ['Logical vs physical via MMU', 'Paging + TLB; EAT formula', 'Demand paging + page-fault journey', 'FIFO/OPT/LRU; Belady; thrashing vs working set'],
    confuse: 'More frames can increase FIFO faults (Belady). Optimal is a benchmark, not a scheduler you can run.',
    q: 'Trace FIFO/LRU/Optimal on 1,2,3,4,1,2,5,1,2,3,4,5.',
  },
  5: {
    title: 'Files become blocks; blocks become motion',
    points: ['File + directory + mount + sharing', 'Contiguous vs linked vs indexed allocation', 'Disk: seek dominates', 'FCFS 640 · SSTF 236 · SCAN 331 on the classic queue'],
    confuse: 'SCAN goes to the end; LOOK stops at the last request. C-SCAN returns empty.',
    q: 'Disk scheduling on 98,183,37,122,14,124,65,67 head 53.',
  },
}

export function ModuleEnding({ n = 1 }) {
  const e = ENDINGS[n]
  return (
    <div className="os-scene" style={{ padding: 18, display: 'grid', gap: 10, alignContent: 'start' }}>
      <strong style={{ fontSize: 22 }}>{e.title}</strong>
      <ul className="os-points">
        {e.points.map((p) => <li key={p}>{p}</li>)}
      </ul>
      <div className="os-callout os-callout-warn"><span>Do not confuse</span><p>{e.confuse}</p></div>
      <div className="os-callout os-callout-idea"><span>Common 10-mark</span><p>{e.q}</p></div>
    </div>
  )
}
