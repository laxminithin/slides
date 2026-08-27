import { Definition, Flow, Formula, Lead, Points, ResourceHub, Stage, osSlide } from './OsKit.jsx'
import {
  ContextSwitchScene,
  PCBInspector,
  ProcessStateMachine,
  ProducerConsumerBuffer,
  ReadyQueue,
  LiveStateMachine,
} from './OsMachine.jsx'
import {
  LayerStack,
  MessageMailbox,
  NoteBoard,
  SchedulerPipeline,
  StatTiles,
  StepFlow,
  Taxonomy,
  ThreadsShareSpace,
  TwoWorld,
} from './OsVisual.jsx'
import { Module2Opening, ModuleEnding } from './OsOpenings.jsx'
import { CpuScheduler } from './OsSims.jsx'

const S = ['Process', 'PCB', 'Queues', 'IPC', 'Threads', 'CPU', 'FCFS', 'SJF', 'RR', 'MLQ']
const k = (t) => `MODULE 2 · ${t}`
const s = (cfg, body) => osSlide({ ...cfg, content: body })

export const osModule2Slides = [
  s({ id: 'm2-open', kicker: k('THE BATTLE FOR THE CPU'), title: 'Many processes, one processor', composition: 'dashboard', camera: 'follow-process', family: 'queue-motion', object: 'ready-queue', action: 'race-cpu', film: { chapterOpener: true, hero: true } },
    <Stage composition="dashboard" visual={<Module2Opening />}>
      <Lead>Queues form. The scheduler takes the only CPU.</Lead>
    </Stage>),

  s({ id: 'm2-concept', kicker: k('PROCESS'), title: 'A process is a program in motion', composition: 'inspect', camera: 'inspect-pcb', family: 'execution-flow', object: 'process', action: 'define' },
    <Stage composition="inspect" story={S} beat={0} visual={<PCBInspector />} takeaway="Passive program. Active process. Sequential progress." exam="Process includes code, PC, stack, data section.">
      <Definition term="Process">A program in execution. In batch systems we said jobs; in timesharing we said tasks. The textbook treats them as the same idea.</Definition>
    </Stage>),

  s({ id: 'm2-states', kicker: k('PROCESS'), title: 'States are places a process can live', composition: 'full-stage', camera: 'follow-process', family: 'execution-flow', object: 'state-machine', action: 'watch-migrate', film: { hero: true } },
    <Stage composition="full-stage" visual={<LiveStateMachine />} takeaway="new → ready → running → waiting → ready → terminated. The scheduler and I/O decide the arrows.">
      <Lead>Do not memorize a static pentagon. Watch one process walk it.</Lead>
    </Stage>),

  s({ id: 'm2-pcb', kicker: k('PROCESS'), title: 'The PCB is the process identity card', composition: 'microscope', camera: 'inspect-pcb', family: 'context-switch', object: 'pcb', action: 'inspect-fields' },
    <Stage composition="microscope" visual={<PCBInspector pid={17} state="READY" pc="0x10F0" />} exam="List PCB fields: state, PC, registers, scheduling, memory, accounting, I/O.">
      <Points items={['State and program counter', 'CPU registers — the snapshot for a switch', 'Scheduling: priority, queues', 'Memory limits', 'Open files and I/O status']} />
    </Stage>),

  s({ id: 'm2-switch', kicker: k('CONTEXT SWITCH'), title: 'One process leaves the CPU; another enters', composition: 'split-left', camera: 'zoom-cpu', family: 'context-switch', object: 'cpu', action: 'save-restore', film: { hero: true } },
    <Stage composition="split-left" visual={<ContextSwitchScene />} takeaway="Switch time is pure overhead. Save PCB of P1, load PCB of P2.">
      <Flow items={['P1 running', 'Interrupt / syscall', 'Save PCB', 'Pick P2', 'Load PCB', 'P2 running']} />
    </Stage>),

  s({ id: 'm2-queues', kicker: k('QUEUES'), title: 'Processes migrate among queues', composition: 'dashboard', camera: 'overhead-queue', family: 'queue-motion', object: 'queues', action: 'migrate' },
    <Stage composition="dashboard" story={S} beat={2} visual={<ReadyQueue items={['P3', 'P4', 'P7']} cpu="P1" />}>
      <Points items={['Job queue — every process in the system', 'Ready queue — in RAM, waiting for CPU', 'Device queues — waiting for a particular I/O']} />
    </Stage>),

  s({ id: 'm2-schedulers', kicker: k('SCHEDULERS'), title: 'Long-term, short-term, medium-term', composition: 'pipeline', camera: 'pull-timeline', family: 'execution-flow', object: 'schedulers', action: 'three-speeds' },
    <Stage composition="pipeline" visual={<SchedulerPipeline />} exam="Degree of multiprogramming is controlled by the long-term scheduler.">
      <Points items={['Short-term: milliseconds — must be fast', 'Long-term: seconds — controls the degree of multiprogramming', 'Medium-term: swapping trims the mix', 'Balance I/O-bound and CPU-bound jobs']} />
    </Stage>),

  s({ id: 'm2-create', kicker: k('OPERATIONS'), title: 'fork creates, exec overlays, wait reaps', composition: 'timeline', camera: 'follow-process', family: 'timeline-build', object: 'fork-tree', action: 'create' },
    <Stage composition="timeline" visual={<StepFlow accent="process" steps={['fork()', { label: 'child', note: 'a copy' }, 'exec()', { label: 'new program', note: 'image replaced' }, 'exit()', { label: 'wait()', note: 'parent reaps', kind: 'ok' }]} />} exam="Parent may wait, or continue concurrently. Cascading termination if a parent exits.">
      <Lead>init sits at the root of the process tree. fork copies; exec replaces; exit terminates; wait collects the status.</Lead>
    </Stage>),

  s({ id: 'm2-term', kicker: k('OPERATIONS'), title: 'Termination reclaims every reusable resource', composition: 'cause-effect', camera: 'inspect-pcb', family: 'execution-flow', object: 'exit', action: 'reclaim' },
    <Stage composition="cause-effect" visual={<ProcessStateMachine active="terminated" />}>
      <Points items={['exit() asks the OS to delete the process', 'A parent may abort a child', 'If the parent dies, some systems kill the children', 'Zombies hold an exit status until wait']} />
    </Stage>),

  s({ id: 'm2-ipc', kicker: k('IPC'), title: 'Why cooperate? Then how.', composition: 'dashboard', camera: 'wide-system', family: 'resource-claim', object: 'ipc', action: 'motivate' },
    <Stage composition="dashboard" story={S} beat={3} visual={<TwoWorld tone="kernel" split="vs" a={{ title: 'Independent', lead: 'Alone in the machine.', points: ['Cannot affect others', 'Cannot be affected', 'Needs no IPC'] }} b={{ title: 'Cooperating', lead: 'Sharing something.', points: ['Can affect / be affected', 'Needs IPC', 'Why: share · speed · modularity'] }} />} exam="Cooperating processes need IPC: shared memory or message passing." />),

  s({ id: 'm2-pc', kicker: k('IPC'), title: 'Producer-consumer needs a buffer', composition: 'stack', camera: 'overhead-queue', family: 'queue-motion', object: 'buffer', action: 'bounded' },
    <Stage composition="stack" visual={<ProducerConsumerBuffer slots={['A', 'B', null, null]} />} exam="Unbounded vs bounded buffer. Shared-memory solution uses in/out pointers.">
      <Lead>Producer inserts. Consumer removes. They must not overwrite a full slot or read an empty one.</Lead>
    </Stage>),

  s({ id: 'm2-msg', kicker: k('IPC'), title: 'Message passing: send and receive', composition: 'full-stage', camera: 'wide-system', family: 'resource-claim', object: 'mailbox', action: 'send-recv' },
    <Stage composition="full-stage" visual={<MessageMailbox />} takeaway="Direct names a process; indirect names a mailbox. Blocking vs non-blocking sets synchronization.">
      <Lead>No shared memory needed — the kernel moves the message from sender to receiver.</Lead>
    </Stage>),

  s({ id: 'm2-threads', kicker: k('THREADS'), title: 'One process, many program counters', composition: 'full-stage', camera: 'zoom-cpu', family: 'execution-flow', object: 'threads', action: 'share-space', film: { hero: true } },
    <Stage composition="full-stage" story={S} beat={4} visual={<ThreadsShareSpace />} takeaway="Threads share code, data and files; each keeps its own PC, registers and stack." exam="Benefits: responsiveness, resource sharing, economy, scalability.">
      <Lead>A thread is the unit of CPU dispatch inside a process.</Lead>
    </Stage>),

  s({ id: 'm2-multicore', kicker: k('THREADS'), title: 'Multicore makes parallelism real', composition: 'dashboard', camera: 'overhead-queue', family: 'cpu-pulse', object: 'cores', action: 'parallel' },
    <Stage composition="dashboard" visual={<Taxonomy accent="process" cols={3} groups={[{ label: 'User threads', sub: 'library-level · fast · kernel may see one' }, { label: 'Kernel threads', sub: 'the OS knows each thread' }, { label: 'Parallelism', sub: 'real on multiple cores' }, { label: 'Divide the work', sub: 'split activity & data' }, { label: 'Balance', sub: 'keep cores equally busy' }, { label: 'Test & debug', sub: 'harder with concurrency' }]} />}>
      <Lead>Concurrency interleaves on one core; parallelism runs truly at once on many.</Lead>
    </Stage>),

  s({ id: 'm2-models', kicker: k('THREADS'), title: 'Many-to-one, one-to-one, many-to-many', composition: 'dashboard', camera: 'wide-system', family: 'comparison-race', object: 'mapping', action: 'contrast-models' },
    <Stage composition="dashboard" visual={<TwoWorld tone="process" a={{ title: 'Many-to-one', lead: 'Many user threads, one kernel thread.', points: ['Cheap', 'One blocking call blocks all', 'No true parallelism'] }} b={{ title: 'One-to-one', lead: 'Each user thread has a kernel thread.', points: ['Linux & Windows', 'True parallelism', 'More kernel threads cost more'], tag: 'M:M multiplexes both' }} />} exam="Two-level model = many-to-many plus some bound 1:1 threads." />),

  s({ id: 'm2-issues', kicker: k('THREADS'), title: 'Cancellation, signals, pools, TSD', composition: 'board', camera: 'inspect-pcb', family: 'interrupt', object: 'thread-issues', action: 'list-issues' },
    <Stage composition="board" visual={<Taxonomy accent="kernel" cols={2} groups={[{ label: 'Cancellation', sub: 'deferred vs asynchronous' }, { label: 'Signals', sub: 'which thread receives it?' }, { label: 'Thread pools', sub: 'avoid create / destroy storms' }, { label: 'Thread-specific data', sub: 'per-thread storage' }]} />}>
      <Lead>Pthreads is the library; Java threads map to host threads; scheduler activations upcall into the library.</Lead>
    </Stage>),

  s({ id: 'm2-bursts', kicker: k('CPU SCHEDULING'), title: 'CPU burst, I/O burst, repeat', composition: 'timeline', camera: 'pull-timeline', family: 'timeline-build', object: 'bursts', action: 'show-histogram' },
    <Stage composition="timeline" story={S} beat={5} visual={<NoteBoard accent="kernel" eyebrow="Burst distribution" headline="Most bursts are short — a few are very long" points={[{ lead: 'A process alternates CPU and I/O' }, { lead: 'The scheduler sees only the next CPU burst' }, { lead: 'This histogram is why SJF and RR differ' }]} />}>
      <Lead>Execution is a cycle of CPU work and I/O waits.</Lead>
    </Stage>),

  s({ id: 'm2-disp', kicker: k('CPU SCHEDULING'), title: 'Scheduler picks; dispatcher switches', composition: 'split-right', camera: 'zoom-cpu', family: 'context-switch', object: 'dispatcher', action: 'dispatch' },
    <Stage composition="split-right" visual={<ContextSwitchScene />}>
      <Points items={['CPU scheduler selects from the ready queue', 'Dispatcher gives the CPU: switch context, switch mode, jump to PC', 'Dispatch latency = time to stop one and start another']} />
    </Stage>),

  s({ id: 'm2-criteria', kicker: k('CPU SCHEDULING'), title: 'What we optimize', composition: 'radial', camera: 'inspect-pcb', family: 'timeline-build', object: 'criteria', action: 'name-metrics' },
    <Stage composition="radial" visual={<Taxonomy accent="ok" cols={3} groups={[{ label: '↑ CPU utilization', sub: 'keep it busy' }, { label: '↑ Throughput', sub: 'jobs per unit time' }, { label: '↓ Turnaround', sub: 'birth to death' }, { label: '↓ Waiting', sub: 'time in ready queue' }, { label: '↓ Response', sub: 'until first output' }]} />} exam="Write all five. Response ≠ turnaround.">
      <Lead>Waiting is time in the ready queue; response is until first output; turnaround is birth to death.</Lead>
    </Stage>),

  s({ id: 'm2-fcfs', kicker: k('FCFS'), title: 'First-come, first-served — and the convoy', composition: 'full-stage', camera: 'pull-timeline', family: 'timeline-build', object: 'gantt', action: 'simulate-fcfs', film: { hero: true } },
    <Stage composition="full-stage" visual={<CpuScheduler algo="fcfs" order={['P1', 'P2', 'P3']} />} takeaway="P1=24, P2=3, P3=3. Order P1,P2,P3 → waits 0,24,27 → average 17. Short jobs stuck behind a giant: convoy effect." exam="Gantt + average waiting time is a 5 or 10 mark numerical.">
      <Lead>Same three processes. Arrival order is everything.</Lead>
    </Stage>),

  s({ id: 'm2-fcfs2', kicker: k('FCFS'), title: 'Reverse the arrival, collapse the wait', composition: 'timeline', camera: 'pull-timeline', family: 'timeline-build', object: 'gantt', action: 'convoy-fix' },
    <Stage composition="timeline" visual={<CpuScheduler algo="fcfs" order={['P2', 'P3', 'P1']} />} takeaway="Order P2,P3,P1 → waits 0,3,6 → average 3. Same algorithm, different luck.">
      <Lead>A long CPU-bound job at the head of FCFS ruins everyone behind it — the convoy effect.</Lead>
    </Stage>),

  s({ id: 'm2-sjf', kicker: k('SJF'), title: 'Shortest job first is waiting-time optimal', composition: 'split-left', camera: 'follow-process', family: 'queue-motion', object: 'sjf', action: 'explain-optimal' },
    <Stage composition="split-left" visual={<CpuScheduler algo="sjf" />} takeaway="Non-preemptive SJF on PPT jobs P1(0,6) P2(2,8) P3(4,7) P4(5,3): P1 then P4 then P3 then P2." exam="SJF optimal for average waiting time. Problem: predicting the next burst.">
      <Definition term="SJF">Schedule the ready process with the smallest next CPU burst. Preemptive SJF is SRTF.</Definition>
    </Stage>),

  s({ id: 'm2-exp', kicker: k('SJF'), title: 'Guess the next burst with exponential averaging', composition: 'inspect', camera: 'inspect-pcb', family: 'timeline-build', object: 'tau', action: 'formula' },
    <Stage composition="inspect" visual={<NoteBoard accent="kernel" eyebrow="Prediction" headline="The past predicts the next burst" points={[{ lead: 'α = 0', rest: 'prediction never learns' }, { lead: 'α = 1', rest: 'only the last burst counts' }, { lead: 'α = ½', rest: 'a balanced, common choice' }]} />}>
      <Formula vars={[['τₙ₊₁', 'predicted next burst'], ['tₙ', 'actual last burst'], ['α', 'weight 0…1']]}>τₙ₊₁ = α tₙ + (1−α) τₙ</Formula>
    </Stage>),

  s({ id: 'm2-prio', kicker: k('PRIORITY'), title: 'Priority scheduling — and starvation', composition: 'cause-effect', camera: 'overhead-queue', family: 'queue-motion', object: 'priority', action: 'starvation' },
    <Stage composition="cause-effect" visual={<ReadyQueue items={['Hi', 'Mid', 'Low forever?']} cpu="Hi" />}>
      <Points items={['Smallest integer = highest priority in the textbook', 'Preemptive or not', 'SJF is priority where priority = predicted burst', 'Starvation: aging raises priority as time passes']} />
    </Stage>),

  s({ id: 'm2-rr', kicker: k('ROUND ROBIN'), title: 'A time quantum, then the back of the line', composition: 'full-stage', camera: 'pull-timeline', family: 'timeline-build', object: 'rr-gantt', action: 'simulate-rr', film: { hero: true } },
    <Stage composition="full-stage" visual={<CpuScheduler algo="rr" />} takeaway="Same P1=24,P2=3,P3=3, q=4. No process waits more than (n−1)q. q large → FCFS. q tiny → switch overhead." exam="Draw RR Gantt with q=4.">
      <Lead>Fairness is the point. Average turnaround is often worse than SJF; response is better.</Lead>
    </Stage>),

  s({ id: 'm2-q', kicker: k('ROUND ROBIN'), title: 'Quantum versus context-switch cost', composition: 'dashboard', camera: 'zoom-cpu', family: 'comparison-race', object: 'quantum', action: 'tradeoff' },
    <Stage composition="dashboard" visual={<TwoWorld tone="wait" split="↔" a={{ title: 'Quantum too small', lead: 'Switches dominate.', points: ['q ≈ context-switch time', 'Machine thrashes on switching', 'Overhead eats throughput'] }} b={{ title: 'Quantum too large', lead: 'It degrades to FCFS.', points: ['Long jobs hog the CPU', 'Response time suffers', 'Rule: 80% of bursts shorter than q'] }} />} />),

  s({ id: 'm2-race', kicker: k('COMPARE'), title: 'Same jobs, two algorithms, two stories', composition: 'race', camera: 'pull-timeline', family: 'comparison-race', object: 'two-gantts', action: 'compete', film: { hero: true } },
    <Stage composition="race" visual={<CpuScheduler algo="fcfs" />} visualB={<CpuScheduler algo="rr" />} takeaway="FCFS convoy vs RR slices. Results differ because the decision rule differs — not because the jobs changed." exam="Always state arrival order and quantum." />),

  s({ id: 'm2-mlq', kicker: k('MULTILEVEL'), title: 'Multilevel queue: classes that do not mix', composition: 'stack', camera: 'overhead-queue', family: 'queue-motion', object: 'mlq', action: 'foreground-bg' },
    <Stage composition="stack" story={S} beat={9} visual={<LayerStack accent="process" caption="Each queue keeps its own algorithm; the CPU is split or strictly prioritized between them." layers={[{ label: 'System processes', sub: 'highest priority' }, { label: 'Interactive — foreground', sub: 'Round Robin' }, { label: 'Batch — background', sub: 'FCFS', ground: true }]} />}>
      <Lead>Interactive jobs must not wait behind batch.</Lead>
    </Stage>),

  s({ id: 'm2-mlfq', kicker: k('MULTILEVEL'), title: 'Feedback queues let a job change class', composition: 'pipeline', camera: 'follow-process', family: 'queue-motion', object: 'mlfq', action: 'demote' },
    <Stage composition="pipeline" visual={<StepFlow accent="memory" steps={[{ label: 'Q0 · RR q=8' }, { label: 'too long ↓', kind: 'warn' }, { label: 'Q1 · RR q=16' }, { label: 'too long ↓', kind: 'warn' }, { label: 'Q2 · FCFS', kind: 'fault' }]} />} exam="Parameters: number of queues, algorithm per queue, when to upgrade/demote, how to pick among queues.">
      <Lead>A CPU hog falls down the queues; an interactive job stays high. Aging can promote it back.</Lead>
    </Stage>),

  s({ id: 'm2-thread-sched', kicker: k('THREAD SCHEDULING'), title: 'Process contention vs system contention', composition: 'dashboard', camera: 'inspect-pcb', family: 'cpu-pulse', object: 'pcs-scs', action: 'scope' },
    <Stage composition="dashboard" visual={<TwoWorld tone="kernel" a={{ title: 'PCS — process scope', lead: 'The library schedules user threads.', points: ['Competes within the process', 'Onto available LWPs', 'PTHREAD_SCOPE_PROCESS'] }} b={{ title: 'SCS — system scope', lead: 'The kernel schedules kernel threads.', points: ['Competes system-wide', 'One-to-one is essentially SCS', 'PTHREAD_SCOPE_SYSTEM'] }} />} />),

  s({ id: 'm2-mp-sched', kicker: k('MULTIPROCESSOR'), title: 'Asymmetric, SMP, affinity, NUMA', composition: 'map', camera: 'wide-system', family: 'cpu-pulse', object: 'numa', action: 'place-threads' },
    <Stage composition="map" visual={<Taxonomy accent="process" cols={2} groups={[{ label: 'Asymmetric MP', sub: 'one master scheduler' }, { label: 'SMP', sub: 'each processor self-schedules' }, { label: 'Affinity', sub: 'soft vs hard · keep a thread home' }, { label: 'NUMA', sub: 'memory is closer to some CPUs' }]} />}>
      <Lead>Load balancing pushes or pulls threads; affinity and NUMA argue for keeping them put.</Lead>
    </Stage>),

  s({ id: 'm2-end', kicker: k('CLOSE'), title: 'Module 2 map', composition: 'map', camera: 'wide-system', family: 'execution-flow', object: 'recap', action: 'remember', film: { chapterPayoff: true } },
    <Stage composition="map" visual={<ModuleEnding n={2} />} />),

  s({ id: 'm2-exam', kicker: k('EXAM'), title: 'Draw these under time pressure', composition: 'full-stage', camera: 'inspect-pcb', family: 'timeline-build', object: 'questions', action: 'practise' },
    <Stage composition="full-stage" visual={<NoteBoard accent="wait" numbered eyebrow="Most-asked" headline="Rehearse these five" points={[{ lead: 'Process state diagram', rest: '+ PCB fields' }, { lead: 'FCFS convoy numerical' }, { lead: 'SJF Gantt', rest: '+ exponential averaging' }, { lead: 'RR with a given quantum' }, { lead: 'Thread models', rest: '1:1 / M:1 / M:M' }]} />} />),

  s({ id: 'm2-res', kicker: k('STUDY'), title: 'Notes and questions', composition: 'dashboard', camera: 'wide-system', family: 'file-tree', object: 'notes', action: 'continue', film: { finale: true } },
    <Stage composition="dashboard"><ResourceHub moduleId="module-2" /></Stage>),
]
