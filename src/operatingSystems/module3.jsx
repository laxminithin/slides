import { Callout, Definition, Flow, Lead, Points, ResourceHub, Stage, osSlide } from './OsKit.jsx'
import {
  CriticalSectionGate,
  DiningPhilosophersScene,
  FourConditions,
  LiveRace,
  ProducerConsumerBuffer,
  ResourceAllocationGraph,
  SemaphoreMachine,
} from './OsMachine.jsx'
import { NoteBoard, StepFlow, Taxonomy, TwoWorld } from './OsVisual.jsx'
import { Module3Opening, ModuleEnding } from './OsOpenings.jsx'
import { BankersSafetySimulator } from './OsSims.jsx'

const S = ['Race', 'CS', 'Peterson', 'Hardware', 'Semaphores', 'Classics', 'Deadlock', 'Banker', 'Detect']
const k = (t) => `MODULE 3 · ${t}`
const s = (cfg, body) => osSlide({ ...cfg, content: body })

export const osModule3Slides = [
  s({ id: 'm3-open', kicker: k('WHEN PROCESSES COLLIDE'), title: 'Two writers, one counter', composition: 'terminal', camera: 'inspect-pcb', family: 'lock-motion', object: 'counter', action: 'watch-race', film: { chapterOpener: true, hero: true } },
    <Stage composition="terminal" visual={<Module3Opening />}>
      <Lead>Shared memory without a lock is a collision waiting to happen.</Lead>
    </Stage>),

  s({ id: 'm3-bg', kicker: k('PROBLEM'), title: 'Shared data plus interleaving equals a race', composition: 'terminal', camera: 'inspect-pcb', family: 'execution-flow', object: 'instructions', action: 'interleave', film: { hero: true } },
    <Stage composition="terminal" story={S} beat={0} visual={<LiveRace />} takeaway="Both read 5, both add 1, both write 6. The second increment vanished." exam="Race condition: outcome depends on the unpredictable interleaving.">
      <Lead>Do not start with a definition. Start with the broken counter.</Lead>
    </Stage>),

  s({ id: 'm3-cs', kicker: k('CRITICAL SECTION'), title: 'The critical section is the dangerous room', composition: 'split-right', camera: 'zoom-cpu', family: 'lock-motion', object: 'gate', action: 'introduce-cs' },
    <Stage composition="split-right" story={S} beat={1} visual={<CriticalSectionGate locked />} takeaway="Only one process inside. Others wait at the door.">
      <Definition term="Critical section">The fragment of code that touches shared data. Entry and exit sections surround it.</Definition>
    </Stage>),

  s({ id: 'm3-reqs', kicker: k('CRITICAL SECTION'), title: 'Three requirements, not two', composition: 'radial', camera: 'inspect-pcb', family: 'lock-motion', object: 'requirements', action: 'three-rules' },
    <Stage composition="radial" visual={<Taxonomy accent="wait" cols={3} groups={[{ label: '1 · Mutual exclusion', sub: 'at most one process in the CS' }, { label: '2 · Progress', sub: 'the choice cannot be delayed by processes in remainder' }, { label: '3 · Bounded waiting', sub: 'a limit on how many enter before you' }]} />} exam="Write all three. Progress ≠ bounded waiting.">
      <Lead>A correct solution must satisfy all three — not just mutual exclusion.</Lead>
    </Stage>),

  s({ id: 'm3-peterson', kicker: k('PETERSON'), title: 'Peterson’s solution for two processes', composition: 'inspect', camera: 'inspect-pcb', family: 'execution-flow', object: 'peterson', action: 'walk-code' },
    <Stage composition="inspect" visual={<div className="os-term os-term-big"><div>flag[i] = true;</div><div>turn = j;</div><div>while (flag[j] && turn == j)</div><div>    ; <span className="cmd">// wait</span></div><div className="ok">// critical section</div><div>flag[i] = false;</div></div>} exam="Software solution assuming atomic load/store. Two processes only.">
      <Lead>Announce “I want in”, offer the other the turn, then wait only while they still want it and it is their turn.</Lead>
    </Stage>),

  s({ id: 'm3-hw', kicker: k('HARDWARE'), title: 'Locks from TestAndSet and Swap', composition: 'microscope', camera: 'zoom-cpu', family: 'cpu-pulse', object: 'tas', action: 'atomic' },
    <Stage composition="microscope" visual={<CriticalSectionGate locked={false} />}>
      <Points items={['Uniprocessors could disable interrupts — not on SMP', 'TestAndSet and Swap are atomic', 'Mutex lock: acquire / release around the CS', 'Bounded waiting needs extra flags around TestAndSet']} />
    </Stage>),

  s({ id: 'm3-sem', kicker: k('SEMAPHORES'), title: 'A semaphore is an integer with two atomic ops', composition: 'split-left', camera: 'wide-system', family: 'lock-motion', object: 'semaphore', action: 'wait-signal' },
    <Stage composition="split-left" story={S} beat={4} visual={<SemaphoreMachine empty={1} full={0} mutex={1} />} exam="wait(S)/P decrements. signal(S)/V increments. Binary vs counting.">
      <Definition term="Semaphore">An integer accessed only via wait() and signal(). Binary semaphore ≈ mutex; counting semaphore tracks a pool.</Definition>
    </Stage>),

  s({ id: 'm3-impl', kicker: k('SEMAPHORES'), title: 'Busy waiting versus a waiting queue', composition: 'dashboard', camera: 'overhead-queue', family: 'comparison-race', object: 'block', action: 'no-spin' },
    <Stage composition="dashboard" visual={<TwoWorld tone="wait" a={{ title: 'Spinlock', lead: 'wait() loops.', points: ['Wastes CPU cycles', 'Useful only if the CS is tiny', 'No context switch'] }} b={{ title: 'Block', lead: 'wait() sleeps on a list.', points: ['signal() wakes one', 'No busy waiting', 'A context switch instead'] }} />}>
      <Callout kind="warn" label="Deadlock & starvation">Two processes can wait on each other’s semaphores; a process can wait forever if wakeup order is unlucky.</Callout>
    </Stage>),

  s({ id: 'm3-bb', kicker: k('CLASSICS'), title: 'Bounded buffer: empty, full, mutex', composition: 'dashboard', camera: 'overhead-queue', family: 'queue-motion', object: 'pc-buffer', action: 'live-counts', film: { hero: true } },
    <Stage composition="dashboard" story={S} beat={5} visual={<div style={{ display: 'grid', gridTemplateRows: 'minmax(0,1fr) minmax(0,1fr)', gap: 12, height: '100%', minHeight: 0 }}><ProducerConsumerBuffer slots={['A', 'B', null, null]} /><SemaphoreMachine empty={2} full={2} mutex={1} /></div>} exam="Producer waits empty, holds mutex, signals full. Consumer is the mirror.">
      <Lead>Watch the three integers change as items enter and leave.</Lead>
    </Stage>),

  s({ id: 'm3-rw', kicker: k('CLASSICS'), title: 'Readers-writers: many readers XOR one writer', composition: 'dashboard', camera: 'follow-process', family: 'lock-motion', object: 'rwlock', action: 'share-read' },
    <Stage composition="dashboard" visual={<TwoWorld tone="process" split="XOR" a={{ title: 'Readers', lead: 'Share freely.', points: ['Many readers at once is fine', 'First reader locks writers out', 'Last reader lets writers in'] }} b={{ title: 'Writer', lead: 'Exclusive only.', points: ['One writer, alone', 'No reader may overlap', 'Writer-priority stops writer starvation'] }} />} />),

  s({ id: 'm3-dp', kicker: k('CLASSICS'), title: 'Dining philosophers: five forks, five appetites', composition: 'full-stage', camera: 'wide-system', family: 'deadlock-freeze', object: 'philosophers', action: 'form-cycle', film: { hero: true } },
    <Stage composition="full-stage" visual={<DiningPhilosophersScene deadlock />} takeaway="Each picks left, waits for right — circular wait. Fixes: pick both atomically, odd/even order, or a waiter." exam="Draw the table. Name the deadlock. Name one prevention.">
      <Lead>The forks are the resources. The circle is the bug.</Lead>
    </Stage>),

  s({ id: 'm3-sem-prob', kicker: k('CLASSICS'), title: 'Semaphores are easy to misuse', composition: 'cause-effect', camera: 'inspect-pcb', family: 'lock-motion', object: 'bugs', action: 'wrong-order' },
    <Stage composition="cause-effect" visual={<div className="os-term os-term-big"><div className="err">signal() then wait() → mutual exclusion broken</div><div className="err">wait() twice → deadlock</div><div className="err">omit a call → chaos</div><div className="ok">// monitors exist because humans slip</div></div>}>
      <Lead>Language-level monitors exist because humans drop a wait or a signal. The exam still tests semaphores.</Lead>
    </Stage>),

  s({ id: 'm3-dl-open', kicker: k('DEADLOCKS'), title: 'The bridge that only one car can cross', composition: 'map', camera: 'wide-system', family: 'deadlock-freeze', object: 'bridge', action: 'story' },
    <Stage composition="map" story={S} beat={6} visual={<NoteBoard accent="fault" eyebrow="A deadlock cartoon" headline="Each side holds the lane and wants the other" points={[{ lead: 'A single-lane bridge, two directions' }, { lead: 'Car A holds the lane', rest: 'and waits for the far end' }, { lead: 'Car B holds the far end', rest: 'and waits for the lane' }, { lead: 'Neither backs up', rest: '— frozen' }]} foot="Now scale that to processes and resource types." />} />),

  s({ id: 'm3-model', kicker: k('DEADLOCKS'), title: 'System model: processes, types, instances', composition: 'pipeline', camera: 'inspect-pcb', family: 'resource-claim', object: 'model', action: 'define-sets' },
    <Stage composition="pipeline" visual={<StepFlow accent="kernel" steps={['Request', { label: 'Use', note: 'may hold while waiting' }, 'Release']} />}>
      <Points items={['P = {P1…Pn} processes', 'R = {R1…Rm} resource types, each with instances', 'Allocation, request and available describe the state']} />
    </Stage>),

  s({ id: 'm3-four', kicker: k('DEADLOCKS'), title: 'Four conditions — all necessary', composition: 'radial', camera: 'freeze-deadlock', family: 'deadlock-freeze', object: 'four', action: 'name-conditions', film: { hero: true } },
    <Stage composition="radial" visual={<FourConditions />} exam="Mutual exclusion, hold-and-wait, no preemption, circular wait. Break any one → no deadlock.">
      <Lead>The system freezes only when every condition is true at once.</Lead>
    </Stage>),

  s({ id: 'm3-rag', kicker: k('RAG'), title: 'Resource-allocation graphs make cycles visible', composition: 'inspect', camera: 'inspect-pcb', family: 'resource-claim', object: 'rag', action: 'draw-edges' },
    <Stage composition="inspect" visual={<ResourceAllocationGraph cycle />} takeaway="Request edge Pi→Rj. Assignment edge Rj→Pi. Cycle + single instance ⇒ deadlock; cycle + multiple instances ⇒ maybe." exam="Draw RAG and the corresponding wait-for graph.">
      <Lead>Edges appear as claims and grants. A cycle is the picture of circular wait.</Lead>
    </Stage>),

  s({ id: 'm3-methods', kicker: k('HANDLING'), title: 'Ignore, prevent, avoid, detect', composition: 'pipeline', camera: 'pull-timeline', family: 'execution-flow', object: 'methods', action: 'choose-policy' },
    <Stage composition="pipeline" visual={<StepFlow accent="kernel" steps={[{ label: 'Ostrich', note: 'ignore it' }, { label: 'Prevention', note: 'break a condition' }, { label: 'Avoidance', note: 'Banker' }, { label: 'Detection', note: '+ recovery', kind: 'warn' }]} />}>
      <Points items={['UNIX often ignores — deadlocks are rare', 'Prevention: break a condition in the design', 'Avoidance: never enter an unsafe state', 'Detection: allow it, then find and recover']} />
    </Stage>),

  s({ id: 'm3-prevent', kicker: k('PREVENTION'), title: 'Break a condition, pay a price', composition: 'dashboard', camera: 'wide-system', family: 'lock-motion', object: 'prevention', action: 'break-one' },
    <Stage composition="dashboard" visual={<NoteBoard accent="wait" eyebrow="Deadlock prevention" headline="Break one condition — accept its cost" points={[{ lead: 'Mutual exclusion', rest: '— not always possible (printers)' }, { lead: 'Hold-and-wait', rest: '— request all at once; low utilization' }, { lead: 'No preemption', rest: '— steal resources; hard for printers' }, { lead: 'Circular wait', rest: '— total order on resource types' }]} foot="Resource ordering is the favourite 5-mark answer." />} exam="Circular-wait prevention via resource ordering is the favourite 5-mark." />),

  s({ id: 'm3-safe', kicker: k('AVOIDANCE'), title: 'Safe state: there exists a happy order', composition: 'timeline', camera: 'pull-timeline', family: 'timeline-build', object: 'safe-seq', action: 'define-safe' },
    <Stage composition="timeline" story={S} beat={7} visual={<NoteBoard accent="ok" eyebrow="Safe state" headline="A finishing order exists" points={[{ lead: 'Some sequence lets every process finish' }, { lead: 'Each Pi’s need', rest: '≤ available + what earlier ones release' }, { lead: 'Unsafe ≠ deadlocked', rest: '— deadlock only becomes possible' }]} />} exam="Safe ⇒ no deadlock. Unsafe ⇒ may deadlock.">
      <Definition term="Safe state">A sequence of all processes where each Pi’s remaining need can be met by current availability plus what earlier processes release.</Definition>
    </Stage>),

  s({ id: 'm3-avoid-alg', kicker: k('AVOIDANCE'), title: 'RAG scheme vs Banker', composition: 'dashboard', camera: 'inspect-pcb', family: 'comparison-race', object: 'avoid-algs', action: 'pick-tool' },
    <Stage composition="dashboard" visual={<TwoWorld tone="kernel" a={{ title: 'Single instance', lead: 'A graph is enough.', points: ['Add claim edges', 'Grant only if no cycle forms', 'Cheap to check'] }} b={{ title: 'Multiple instances', lead: 'You need Banker.', points: ['Track Allocation, Max, Need', 'Need = Max − Allocation', 'Run the safety algorithm'] }} />} />),

  s({ id: 'm3-banker', kicker: k('BANKER'), title: 'Walk the safety algorithm on the classic snapshot', composition: 'full-stage', camera: 'inspect-pcb', family: 'timeline-build', object: 'banker-table', action: 'simulate-safe', film: { hero: true } },
    <Stage composition="full-stage" visual={<BankersSafetySimulator />} takeaway="A=10 B=5 C=7. Available 3 3 2. Need = Max−Alloc. Sequence ⟨P1,P3,P4,P2,P0⟩ is safe." exam="Show Need matrix, then the work vector after each finish.">
      <Lead>Pretend to allocate, run safety, commit only if still safe.</Lead>
    </Stage>),

  s({ id: 'm3-req', kicker: k('BANKER'), title: 'Resource-request algorithm for Pi', composition: 'pipeline', camera: 'follow-process', family: 'resource-claim', object: 'request', action: 'three-tests' },
    <Stage composition="pipeline" visual={<StepFlow accent="process" steps={['Request ≤ Need', 'Request ≤ Available', 'Pretend allocate', { label: 'Safe?', kind: 'warn' }, { label: 'Commit or roll back', kind: 'ok' }]} />}>
      <Points items={['Exceeding the max claim is an error', 'If not available, Pi waits', 'If unsafe, restore the old state']} />
    </Stage>),

  s({ id: 'm3-detect', kicker: k('DETECTION'), title: 'Wait-for graphs and the detection algorithm', composition: 'split-right', camera: 'inspect-pcb', family: 'deadlock-freeze', object: 'wait-for', action: 'find-cycle' },
    <Stage composition="split-right" story={S} beat={8} visual={<ResourceAllocationGraph cycle />} exam="Single instance: cycle in the wait-for graph. Multiple: Work/Finish algorithm O(m·n²).">
      <Lead>If we allow deadlock, we must look for it — how often depends on how often it happens and how many victims we would roll back.</Lead>
    </Stage>),

  s({ id: 'm3-detect-ex', kicker: k('DETECTION'), title: 'A snapshot that becomes a deadlock', composition: 'inspect', camera: 'inspect-pcb', family: 'timeline-build', object: 'detect-table', action: 'worked-example' },
    <Stage composition="inspect" visual={<NoteBoard accent="fault" eyebrow="Worked example" headline="One extra request tips it over" points={[{ lead: 'Five processes', rest: 'A(7) B(2) C(6)' }, { lead: 'Sequence ⟨P0,P2,P3,P1,P4⟩ is fine' }, { lead: 'P2 asks for one more C' }, { lead: 'Now P1–P4 deadlock', rest: '— only P0 can finish' }]} />} exam="After the extra request, Finish stays false for P1,P2,P3,P4." />),

  s({ id: 'm3-recover', kicker: k('RECOVERY'), title: 'Kill processes or steal resources', composition: 'dashboard', camera: 'wide-system', family: 'deadlock-freeze', object: 'recovery', action: 'choose-victim' },
    <Stage composition="dashboard" visual={<TwoWorld tone="fault" a={{ title: 'Termination', lead: 'Kill to break the cycle.', points: ['Abort all at once, or', 'Abort one-by-one', 'Cost · priority · children'] }} b={{ title: 'Preemption', lead: 'Steal and restart.', points: ['Select a victim', 'Roll back, restart', 'Same victim always → starvation'] }} />}>
      <Lead>Recovery is ugly — which is why avoidance is taught so hard.</Lead>
    </Stage>),

  s({ id: 'm3-end', kicker: k('CLOSE'), title: 'Module 3 map', composition: 'map', camera: 'wide-system', family: 'execution-flow', object: 'recap', action: 'remember', film: { chapterPayoff: true } },
    <Stage composition="map" visual={<ModuleEnding n={3} />} />),

  s({ id: 'm3-exam', kicker: k('EXAM'), title: 'Questions that keep returning', composition: 'full-stage', camera: 'inspect-pcb', family: 'timeline-build', object: 'questions', action: 'practise' },
    <Stage composition="full-stage" visual={<NoteBoard accent="wait" numbered eyebrow="Most-asked" headline="Rehearse these five" points={[{ lead: 'Race', rest: '+ three CS conditions + Peterson' }, { lead: 'Semaphores', rest: '& bounded-buffer code' }, { lead: 'Dining philosophers deadlock' }, { lead: 'Four conditions + RAG' }, { lead: 'Banker safety numerical' }]} />} />),

  s({ id: 'm3-res', kicker: k('STUDY'), title: 'Notes and questions', composition: 'dashboard', camera: 'wide-system', family: 'file-tree', object: 'notes', action: 'continue', film: { finale: true } },
    <Stage composition="dashboard"><ResourceHub moduleId="module-3" /></Stage>),
]
