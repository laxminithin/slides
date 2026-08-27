import { Link } from 'react-router-dom'
import { BookOpen, FileQuestion } from 'lucide-react'
import './parallelComputing.css'
import './pcComposition.css'
import './foundScenes.css'
import {
  ParallelOriginScene,
  SerialBottleneck,
  WorkDecomposition,
  SerialVsParallelTimeline,
  EvolutionTimeline,
  SingleVsMulticore,
  HeatPowerLimit,
  IdleCoresScene,
  PagesExample,
  ReductionTree,
  TaskVsData,
  ConcurrencyTimeline,
  DependencyGraph,
  VonNeumann,
  HardwareTypes,
  FlynnMatrix,
  SisdMachine,
  SimdFanout,
  MisdPipeline,
  MimdArchitecture,
  FlynnCompare,
  SharedMemoryMachine,
  DistributedMemoryMachine,
  UmaMemoryScene,
  NumaMemoryScene,
  UmaVsNuma,
  CacheCoherenceScene,
  BusInterconnect,
  CrossbarScene,
  MeshTopology,
  RingTopology,
  StaticNetworks,
  OmegaScene,
  DataDecomposition,
  TaskDecomposition,
  LoadBalance,
  ParallelBarrier,
  ProcessThread,
  DynamicStaticThreads,
  NondeterminismScene,
  RaceConditionScene,
  MutexScene,
  MessagePassing,
  OneSidedScene,
  Module1Synthesis,
  SyllabusMap,
  AppsWall,
  UsesWall,
  ApiPreview,
  LibraryTable,
  HypercubeScene,
  TorusScene,
  StarTreeScene,
  CommCost,
  FalseSharing,
  SnoopingVsDirectory,
  KeyTerms,
  ExamList,
} from './components/FoundScenes'

const roadmap = [
  'Opening',
  'Need',
  'Serial',
  'Hardware',
  'Flynn',
  'Architectures',
  'Networks',
  'Coherence',
  'Coordination',
  'Summary',
]

const SRC = 'Source: PC_MODULE 1aug.pptx (New PPT) plus VTU BCS702 Module 1 Parallel Computing syllabus coverage.'

function slide({ id, title, subtitle, content, notes, hideTitle = true, composition = 'teaching' }) {
  return {
    id,
    kicker: 'VTU BCS702 | Module 1',
    title,
    subtitle,
    content,
    notes,
    hideTitle,
    composition,
    layout: composition,
  }
}

function Roadmap({ section }) {
  return (
    <nav className="pc-m1-roadmap" aria-label="Module 1 roadmap">
      {roadmap.map((item) => <span key={item} className={item === section ? 'active' : ''}>{item}</span>)}
    </nav>
  )
}

function Shell({ section, children }) {
  return (
    <div className="pc-m1-slide">
      <Roadmap section={section} />
      <div className="fo-stage-wrap">{children}</div>
    </div>
  )
}

function Head({ kicker, title, lead }) {
  return (
    <header className="fo-head">
      {kicker && <span className="fo-kicker">{kicker}</span>}
      <h2>{title}</h2>
      {lead && <p className="fo-lead">{lead}</p>}
    </header>
  )
}

function Points({ items }) {
  return (
    <ul className="fo-points">
      {items.map((item) => <li key={item}>{item}</li>)}
    </ul>
  )
}

function Full({ section, kicker, title, lead, visual }) {
  return (
    <Shell section={section}>
      <Head kicker={kicker} title={title} lead={lead} />
      <div className="fo-full fo-visual">{visual}</div>
    </Shell>
  )
}

function Split({ section, kicker, title, lead, points, formula, code, question, takeaway, visual, reverse = false }) {
  return (
    <Shell section={section}>
      <Head kicker={kicker} title={title} lead={lead} />
      <div className={`fo-split ${reverse ? 'reverse' : ''}`}>
        <section className="fo-copy">
          {question && <p className="fo-q">{question}</p>}
          {formula && <p className={`fo-formula ${formula.length > 42 ? 'sm' : ''}`}>{formula}</p>}
          {code && <pre className="fo-code"><code>{code}</code></pre>}
          {points && <Points items={points} />}
          {takeaway && <p className="fo-take">{takeaway}</p>}
        </section>
        <section className="fo-visual">{visual}</section>
      </div>
    </Shell>
  )
}

function Divider({ section, tone, number, title, subtitle, visual }) {
  return (
    <Shell section={section}>
      <div className={`fo-divider fo-div-${tone}`}>
        <div className="fo-divider-copy">
          <span>{number}</span>
          <h2>{title}</h2>
          <p>{subtitle}</p>
        </div>
        <div className="fo-visual">{visual}</div>
      </div>
    </Shell>
  )
}

const n = (topic) => `What to say: ${topic} Keep the architecture story: one problem, many processing elements, one coordinated result. ${SRC}`

const raw = []
function add(item) { raw.push(item) }

/* ========================================================================
   OPENING
   ======================================================================== */
add({
  section: 'Opening',
  title: 'Foundations of Parallel Computing',
  composition: 'hero',
  content: (
    <Shell section="Opening">
      <Head kicker="Parallel Computing  ·  Module 1" title="Foundations of Parallel Computing" lead="One problem. Many processing elements. One coordinated result." />
      <div className="fo-full"><ParallelOriginScene /></div>
    </Shell>
  ),
  notes: n('Open on one CPU with a queue. Fracture the workload. Recombine. This is not a performance dashboard and not an MPI cluster.'),
})

add({
  section: 'Opening',
  title: 'Module 1 syllabus',
  content: (
    <Split
      section="Opening"
      title="What this module must teach"
      lead="Use the syllabus as the checklist, not as a rumour."
      points={[
        'Introduction to parallel programming.',
        'Parallel hardware and parallel software.',
        'Classifications of parallel computers.',
        'SIMD systems and MIMD systems.',
        'Interconnection networks and cache coherence.',
        'Shared-memory versus distributed-memory.',
        'Coordinating processes and threads.',
      ]}
      visual={<SyllabusMap />}
    />
  ),
  notes: n('Read the syllabus aloud. Every later slide exists to answer one of these lines.'),
})

add({
  section: 'Opening',
  title: 'Learning objectives',
  content: (
    <Split
      section="Opening"
      title="By the end of Module 1"
      lead="The student should be able to explain why parallelism exists and what kinds of machines implement it."
      points={[
        'Explain the need for parallel programming.',
        'Classify parallel computers using Flynn’s taxonomy.',
        'Differentiate SIMD and MIMD systems.',
        'Explain interconnection networks and cache coherence.',
        'Compare shared-memory and distributed-memory systems.',
        'Explain coordination of processes and threads.',
      ]}
      visual={<Module1Synthesis />}
    />
  ),
  notes: n('This is the exam contract. Module 2 later measures speed. Module 3 later programs messages.'),
})

add({
  section: 'Opening',
  title: 'Course APIs preview',
  content: (
    <Full
      section="Opening"
      title="What this course will program"
      lead="C plus four APIs. Module 1 only names them."
      visual={<ApiPreview />}
    />
  ),
  notes: n('MPI, Pthreads, OpenMP, CUDA. Do not teach their APIs here.'),
})

/* ========================================================================
   NEED
   ======================================================================== */
add({
  section: 'Need',
  title: 'Why parallel computing?',
  content: (
    <Divider
      section="Need"
      tone="need"
      number="01"
      title="Why parallel computing?"
      subtitle="One processor cannot finish modern work fast enough."
      visual={<SerialBottleneck />}
    />
  ),
  notes: n('Do not begin with a definition. Begin with a queue behind one CPU.'),
})

add({
  section: 'Need',
  title: 'Evolution of microprocessor performance',
  content: (
    <Full
      section="Need"
      title="1986–2003: single-core boom"
      lead="Microprocessor performance improved by more than 50% per year on average."
      visual={<EvolutionTimeline />}
    />
  ),
  notes: n('Higher clocks, better designs, semiconductor advances. Most machines were single-core.'),
})

add({
  section: 'Need',
  title: 'The single-core stall',
  content: (
    <Split
      section="Need"
      title="Since 2003 the easy speed ended"
      lead="Single-core improvement slowed because of power, heat and physical limits."
      points={[
        '2015–2017: single-core performance increased by less than 4% per year.',
        'It became difficult to get major speed from a faster individual processor.',
        'By 2005, major manufacturers shifted focus to parallelism.',
        'They placed multiple complete cores on one chip.',
      ]}
      takeaway="Multi-core chips exist because one faster core got too hot."
      visual={<HeatPowerLimit />}
    />
  ),
  notes: n('Power → heat → errors. Parallelism is the architectural answer.'),
})

add({
  section: 'Need',
  title: 'Transistors, speed and heat',
  content: (
    <Split
      section="Need"
      title="Why one core cannot just run faster"
      lead="Smaller transistors packed more switches onto a chip and made them faster."
      points={[
        'Faster transistors consume more electrical power.',
        'Most of that power becomes heat.',
        'If the chip gets too hot it can produce errors, become unstable, or fail.',
        'So designers perform multiple tasks at the same time instead of making one processor do everything faster.',
      ]}
      formula="smaller transistors → more heat if we only raise the clock"
      visual={<HeatPowerLimit />}
    />
  ),
  notes: n('Keep the chain: smaller → faster → hotter → parallelism.'),
})

add({
  section: 'Need',
  title: 'Serial programs do not use extra cores',
  content: (
    <Split
      section="Need"
      title="Adding cores is not enough"
      lead="Most older programs are serial: one instruction at a time on a single processor."
      points={[
        'A serial program is not aware of multiple processors.',
        'On a multi-core chip it usually uses only one core.',
        'The other cores remain idle.',
        'Performance is almost the same as on a single-core processor of similar speed.',
      ]}
      takeaway="Multi-core processors improve performance only if the software is designed for parallel execution."
      visual={<IdleCoresScene />}
    />
  ),
  notes: n('This is the software crisis created by the 2005 multi-core shift.'),
})

add({
  section: 'Need',
  title: 'Single-core versus multi-core',
  content: (
    <Full
      section="Need"
      title="Inside the chip boundary"
      lead="A multi-core processor places multiple cores, private memory and shared memory on one chip."
      visual={<SingleVsMulticore />}
    />
  ),
  notes: n('Point from Core to individual memory to shared memory to the bus.'),
})

add({
  section: 'Need',
  title: 'Four people, one hundred pages',
  content: (
    <Split
      section="Need"
      title="The source example"
      lead="To use multiple processors, software must divide work into simultaneous tasks."
      points={[
        'Serial: one person writes 100 pages alone → about 100 hours.',
        'Parallel: four people each write 25 pages at the same time → about 25 hours.',
        'The hardware only helps if the work is actually split.',
      ]}
      visual={<PagesExample />}
    />
  ),
  notes: n('Keep the numbers. They are the source example.'),
})

add({
  section: 'Need',
  title: 'Why computational power mattered',
  content: (
    <Full
      section="Need"
      title="What extra computing unlocked"
      lead="Source applications: genome, imaging, search, games, climate, proteins, drugs, energy, data."
      visual={<AppsWall />}
    />
  ),
  notes: n('Do not invent extra applications. Use the source list.'),
})

add({
  section: 'Need',
  title: 'Terminologies',
  content: (
    <Split
      section="Need"
      title="Four words to keep exact"
      lead="Say these the way the source says them."
      points={[
        'Parallelism: executing multiple tasks simultaneously.',
        'Core: an individual CPU inside a processor chip.',
        'Multicore processor: two or more CPU cores on one chip.',
        'Single-core system: a traditional processor with only one CPU/core.',
      ]}
      visual={<SingleVsMulticore />}
    />
  ),
  notes: n('Students mix core and processor. Force the distinction.'),
})

add({
  section: 'Need',
  title: 'Why write parallel programs',
  content: (
    <Split
      section="Need"
      title="Two ways to get parallel software"
      lead="Rewrite serial programs, or try automatic parallelization."
      points={[
        'A serial program executes one instruction after another on a single core.',
        'A parallel program divides work into tasks that run on different cores.',
        'Translation programs (parallelizing compilers) try to convert serial code automatically.',
        'Automatic translation is hard: the tool must decide which instructions can safely run together.',
      ]}
      takeaway="We write parallel programs to use cores, cut time, avoid hotter clocks, and reduce power."
      visual={<WorkDecomposition />}
    />
  ),
  notes: n('Path 1: rewrite. Path 2: compilers. Path 2 is incomplete.'),
})

add({
  section: 'Need',
  title: 'Uses of parallel computing',
  content: (
    <Full
      section="Need"
      title="Seven source reasons"
      lead="Speed, bigger problems, resource use, real time, energy, scalability, complex simulations."
      visual={<UsesWall />}
    />
  ),
  notes: n('Example: a simulation that takes 10 hours on one CPU might take 1 hour on 10 CPUs.'),
})

/* ========================================================================
   SERIAL → PARALLEL
   ======================================================================== */
add({
  section: 'Serial',
  title: 'From serial to parallel',
  content: (
    <Divider
      section="Serial"
      tone="serial"
      number="02"
      title="From serial to parallel"
      subtitle="One instruction stream becomes many cooperating pieces."
      visual={<SerialVsParallelTimeline />}
    />
  ),
  notes: n('Same workload both ways. Serial is a chain. Parallel splits then merges.'),
})

add({
  section: 'Serial',
  title: 'What is parallel computing?',
  content: (
    <Split
      section="Serial"
      title="Definition"
      lead="Keep the source sentence."
      points={[
        'Parallel computing is the process of performing multiple computations or executing multiple instructions simultaneously by using two or more processors or cores to solve a computational problem faster.',
        'The problem is divided into smaller independent tasks.',
        'Each task is executed concurrently by different processors.',
        'Partial results are combined into the final output.',
      ]}
      visual={<WorkDecomposition />}
    />
  ),
  notes: n('Definition plus the four-step working: split, assign, execute, combine.'),
})

add({
  section: 'Serial',
  title: 'Serial computing',
  content: (
    <Full
      section="Serial"
      title="SERIAL PROBLEM"
      lead="One problem becomes one instruction stream into one CPU."
      visual={<SerialBottleneck />}
    />
  ),
  notes: n('t1, t2, t3 … tN queue into a single CPU.'),
})

add({
  section: 'Serial',
  title: 'The same workload, two schedules',
  content: (
    <Full
      section="Serial"
      title="A → B → C → D → E → F"
      lead="Parallel: A, B and C run independently where possible, then merge."
      visual={<SerialVsParallelTimeline />}
    />
  ),
  notes: n('Do not use generic cards. Walk the timeline.'),
})

add({
  section: 'Serial',
  title: 'Characteristics',
  content: (
    <Split
      section="Serial"
      title="How parallel computing works"
      lead="A problem is divided. Processors communicate when required. Results combine."
      points={[
        'A problem is divided into multiple smaller sub-problems.',
        'Each sub-problem is assigned to a different processor or CPU core.',
        'Multiple instructions are executed simultaneously.',
        'Processors communicate and synchronize when required.',
        'The partial results are combined to produce the final output.',
      ]}
      visual={<WorkDecomposition />}
    />
  ),
  notes: n('This is the working, not a slogan.'),
})

add({
  section: 'Serial',
  title: 'Sum n values — serial',
  content: (
    <Split
      section="Serial"
      title="Source numerical: compute n values and add them"
      lead="Serial code from the new PPT."
      code={`sum = 0;
for (i = 0; i < n; i++) {
  x = Compute_next_value(...);
  sum += x;
}`}
      points={[
        'One core walks i from 0 to n−1.',
        'Every addition waits for the previous addition.',
      ]}
      visual={<SerialBottleneck />}
    />
  ),
  notes: n('This example continues into per-core my_sum and tree reduction.'),
})

add({
  section: 'Serial',
  title: 'Each core keeps a private my_sum',
  content: (
    <Split
      section="Serial"
      title="Partition the loop"
      lead="Cores are numbered 0, 1, …, p−1."
      code={`my_sum = 0;
for (my_i = my_first_i; my_i < my_last_i; my_i++) {
  my_x = Compute_next_value(...);
  my_sum += my_x;
}`}
      points={[
        'Core 0: 8    Core 1: 19    Core 2: 7    Core 3: 15',
        'Core 4: 7    Core 5: 13    Core 6: 12    Core 7: 14',
      ]}
      takeaway="Local sums exist. A global sum still has to be formed."
      visual={<ReductionTree />}
    />
  ),
  notes: n('Write the eight numbers on the board before the tree.'),
})

add({
  section: 'Serial',
  title: 'Tree reduction to 95',
  content: (
    <Full
      section="Serial"
      title="Pairwise addition across eight cores"
      lead="Step 1: 27, 22, 20, 26. Step 2: 49, 46. Step 3: 95 on Core 0."
      visual={<ReductionTree />}
    />
  ),
  notes: n('Core1 sends 19 to Core0: 8+19=27. Continue pairwise. This is the source diagram.'),
})

add({
  section: 'Serial',
  title: 'Task parallelism versus data parallelism',
  content: (
    <Full
      section="Serial"
      title="How do we partition the work?"
      lead="Task-parallelism partitions tasks. Data-parallelism partitions the data."
      visual={<TaskVsData />}
    />
  ),
  notes: n('Both appear in the new PPT. Keep both.'),
})

add({
  section: 'Serial',
  title: 'Concurrency versus parallelism',
  content: (
    <Full
      section="Serial"
      title="Related, not identical"
      lead="Concurrency interleaves on one processor. Parallelism executes on different processors at the same time."
      visual={<ConcurrencyTimeline />}
    />
  ),
  notes: n('Old VTU completeness. Two synchronized timelines.'),
})

add({
  section: 'Serial',
  title: 'Dependence graph',
  content: (
    <Split
      section="Serial"
      title="What can run together?"
      lead="A node is a task. An edge is a dependence that forces order."
      points={[
        'A must finish before B and C.',
        'B and C have no path between them, so they may run together.',
        'D waits for both.',
      ]}
      visual={<DependencyGraph />}
    />
  ),
  notes: n('Old VTU completeness. Do not explain with bullets only.'),
})

/* ========================================================================
   HARDWARE
   ======================================================================== */
add({
  section: 'Hardware',
  title: 'Parallel hardware',
  content: (
    <Divider
      section="Hardware"
      tone="hw"
      number="03"
      title="Parallel hardware"
      subtitle="Physical components that let multiple operations happen at the same time."
      visual={<HardwareTypes />}
    />
  ),
  notes: n('Processors, memory, interconnects.'),
})

add({
  section: 'Hardware',
  title: 'von Neumann baseline',
  content: (
    <Split
      section="Hardware"
      title="The classical machine"
      lead="Main memory, a CPU/core, and an interconnection between them."
      points={[
        'The CPU fetches instructions and data from memory.',
        'Results go back through the same interconnect.',
        'Parallel hardware expands this baseline with more execution resources and faster data paths.',
      ]}
      visual={<VonNeumann />}
    />
  ),
  notes: n('Draw CPU, interconnect, memory. Then later add cores.'),
})

add({
  section: 'Hardware',
  title: 'Kinds of parallel hardware',
  content: (
    <Full
      section="Hardware"
      title="From a laptop chip to a supercomputer"
      lead="Multi-core, GPU, multiprocessor, cluster, supercomputer, FPGA, interconnects."
      visual={<HardwareTypes />}
    />
  ),
  notes: n('Walk the seven source types. GPU here is architecture, not Module 2 performance.'),
})

add({
  section: 'Hardware',
  title: 'Multi-core and GPUs',
  content: (
    <Split
      section="Hardware"
      title="On one chip, then thousands of small cores"
      lead="Keep Module 1 foundational. Module 2 later measures GPU runtime."
      points={[
        'Multi-core: a single chip with multiple cores. Each core executes tasks independently. Example: quad-core or octa-core CPUs.',
        'GPUs: thousands of smaller cores for parallel data processing.',
        'Ideal for image processing, machine learning and simulations.',
        'Example: NVIDIA CUDA-enabled GPUs.',
      ]}
      visual={<SingleVsMulticore />}
    />
  ),
  notes: n('Do not open occupancy or warps. That is Module 2.'),
})

add({
  section: 'Hardware',
  title: 'Multiprocessors, clusters, supercomputers, FPGAs',
  content: (
    <Split
      section="Hardware"
      title="From one box to many buildings"
      points={[
        'Multiprocessor: multiple CPUs in one system. Example: dual-processor servers.',
        'Cluster: networked computers (nodes) working on one problem. Used in scientific computing and data centers.',
        'Supercomputers: thousands of processors or nodes. Weather, nuclear simulations, AI research.',
        'FPGAs: hardware programmed after manufacturing for specific parallel tasks. Signal processing, AI inference, acceleration.',
      ]}
      visual={<DistributedMemoryMachine />}
    />
  ),
  notes: n('Cluster is the common distributed-memory system. Grid turns large networks into one system.'),
})

add({
  section: 'Hardware',
  title: 'Interconnects as hardware',
  content: (
    <Split
      section="Hardware"
      title="The links between processors and memory"
      lead="InfiniBand or Ethernet in clusters. Bus, ring, mesh, hypercube as structures."
      points={[
        'Bus: transfers data between components.',
        'Ring: connects components in a circular form.',
        'Mesh: provides multiple communication paths.',
        'Hypercube: used in supercomputers.',
      ]}
      takeaway="A slow interconnect creates a communication bottleneck even if processors are fast."
      visual={<CommCost />}
    />
  ),
  notes: n('Four people talking more than working — the source analogy.'),
})

add({
  section: 'Hardware',
  title: 'Parallel software map',
  content: (
    <Split
      section="Hardware"
      title="Software that uses the hardware"
      lead="Languages, models, libraries, OS support, debugging tools."
      points={[
        'C/C++ with OpenMP, Fortran with OpenMP, Python multiprocessing/Dask, Java threads.',
        'Models: thread-based shared memory, message passing, data parallelism, task parallelism.',
        'OS support: multi-threading, scheduling, resource management.',
        'Tools: GDB/Valgrind, VTune, Nsight, Perf, Visual Studio.',
      ]}
      visual={<LibraryTable />}
    />
  ),
  notes: n('Do not turn this into a vendor catalogue. Name the source tools.'),
})

/* ========================================================================
   FLYNN
   ======================================================================== */
add({
  section: 'Flynn',
  title: "Flynn's taxonomy",
  content: (
    <Divider
      section="Flynn"
      tone="flynn"
      number="04"
      title="Flynn’s taxonomy"
      subtitle="Classify machines by instruction streams and data streams."
      visual={<FlynnMatrix />}
    />
  ),
  notes: n('Overview first. Then each class gets its own visual.'),
})

add({
  section: 'Flynn',
  title: 'The four classes',
  content: (
    <Full
      section="Flynn"
      title="Instruction stream × data stream"
      lead="SISD, SIMD, MISD, MIMD."
      visual={<FlynnMatrix />}
    />
  ),
  notes: n('Do not stop at the 2×2. The next four slides unpack each cell.'),
})

add({
  section: 'Flynn',
  title: 'SISD',
  content: (
    <Split
      section="Flynn"
      title="Single Instruction, Single Data"
      lead="Traditional sequential computer. One instruction. One data stream. Deterministic."
      points={[
        'Only one instruction stream is acted on during any clock cycle.',
        'Only one data stream is used as input during any clock cycle.',
        'This is the uniprocessor / serial machine.',
      ]}
      visual={<SisdMachine />}
    />
  ),
  notes: n('Walk load A, load B, C=A+B, store C.'),
})

add({
  section: 'Flynn',
  title: 'SIMD',
  content: (
    <Full
      section="Flynn"
      title="One instruction, many data lanes"
      lead="All processing units execute the same instruction at a given clock cycle, each on a different data element."
      visual={<SimdFanout />}
    />
  ),
  notes: n('Control unit fans out. P1, P2, Pn load A(i), load B(i), C(i)=A(i)*B(i). Not a GPU occupancy chart.'),
})

add({
  section: 'Flynn',
  title: 'SIMD components and example',
  content: (
    <Split
      section="Flynn"
      title="Control unit, processing elements, memory"
      lead="If you add two arrays element-wise, a SIMD system adds multiple pairs at once."
      points={[
        'Control unit: fetches and decodes the single instruction.',
        'Multiple processing elements: same operation on different data.',
        'Memory unit: supplies data and stores results.',
        'Varieties: processor arrays and vector pipelines.',
        'Best for regular work: graphics and image processing.',
      ]}
      formula="C(i) = A(i) * B(i)   for many i at once"
      visual={<SimdFanout />}
    />
  ),
  notes: n('Source array example. Keep it architectural.'),
})

add({
  section: 'Flynn',
  title: 'SIMD in the real world',
  content: (
    <Split
      section="Flynn"
      title="Where SIMD appears"
      points={[
        'GPUs: the same colour transform on thousands of pixels.',
        'Intel SSE/AVX: multiple data with one CPU instruction.',
        'Neural-network accelerators: matrix multiplications.',
        'Applications: image/video, audio, scientific computing, ML, cryptography.',
      ]}
      takeaway="SIMD is powerful when every lane does the same operation."
      visual={<SimdFanout />}
    />
  ),
  notes: n('Name SSE/AVX. Do not steal Module 2 GPU performance treatment.'),
})

add({
  section: 'Flynn',
  title: 'MISD',
  content: (
    <Split
      section="Flynn"
      title="Multiple Instruction, Single Data"
      lead="A single data stream is fed to multiple processing units. Each has its own instruction stream."
      points={[
        'Rare in practice.',
        'Source uses: multiple frequency filters on one signal.',
        'Source uses: multiple cryptography algorithms on one coded message.',
        'Do not invent a misleading everyday example.',
      ]}
      visual={<MisdPipeline />}
    />
  ),
  notes: n('Keep it abstract and source-faithful. Mark it rare.'),
})

add({
  section: 'Flynn',
  title: 'MIMD',
  content: (
    <Full
      section="Flynn"
      title="Independent processors, independent streams"
      lead="Every processor may execute a different instruction stream on a different data stream. Synchronous or asynchronous. Deterministic or not."
      visual={<MimdArchitecture />}
    />
  ),
  notes: n('This answers WHAT the architecture is. Module 2 answers HOW it performs.'),
})

add({
  section: 'Flynn',
  title: 'MIMD components',
  content: (
    <Split
      section="Flynn"
      title="What a MIMD machine contains"
      points={[
        'Multiple processors, each with its own control unit.',
        'Independent instruction streams.',
        'Separate or shared memory.',
        'An interconnection network connecting processors to memory and/or each other.',
        'The most flexible, general-purpose form of parallelism.',
      ]}
      visual={<MimdArchitecture />}
    />
  ),
  notes: n('Multicore CPUs, clusters, clouds, parallel databases — source examples.'),
})

add({
  section: 'Flynn',
  title: 'Flynn comparison',
  content: (
    <Full
      section="Flynn"
      title="Control · data · processing elements"
      lead="One clean architecture comparison after the four individuals."
      visual={<FlynnCompare />}
    />
  ),
  notes: n('Not a dense table. Four architecture thumbnails.'),
})

/* ========================================================================
   ARCHITECTURES
   ======================================================================== */
add({
  section: 'Architectures',
  title: 'Parallel machine organization',
  content: (
    <Divider
      section="Architectures"
      tone="arch"
      number="05"
      title="Memory organization"
      subtitle="Shared variables, or messages across an interconnect?"
      visual={<SharedMemoryMachine />}
    />
  ),
  notes: n('Hardware architecture perspective. Not Module 3’s MPI comparison layout.'),
})

add({
  section: 'Architectures',
  title: 'Shared-memory MIMD interconnect',
  content: (
    <Split
      section="Architectures"
      title="Bus, then switched interconnects"
      lead="Shared-memory systems often start with a bus connecting processors and memory."
      points={[
        'Buses are cheap and flexible.',
        'As shared-memory systems grow, buses are replaced by switched interconnects.',
        'Switches control the routing of data among connected devices.',
        'A crossbar is a relatively simple and powerful switched interconnect.',
      ]}
      visual={<BusInterconnect />}
    />
  ),
  notes: n('Bus virtue: cost. Bus limit: one conversation.'),
})

add({
  section: 'Architectures',
  title: 'Crossbar',
  content: (
    <Full
      section="Architectures"
      title="Simultaneous non-conflicting connections"
      lead="Faster than a bus. Switches and links cost more. A small bus system is cheaper than a same-size crossbar."
      visual={<CrossbarScene />}
    />
  ),
  notes: n('Highlight two non-conflicting CPU–memory pairs lighting at once.'),
})

add({
  section: 'Architectures',
  title: 'Shared memory',
  content: (
    <Split
      section="Architectures"
      title="One global address space"
      lead="Multiple processors or threads access the same memory space. Common in multi-core and SMP systems."
      points={[
        'All processors share a single global memory.',
        'Each processor can access the same variables and data structures.',
        'Communication is easy; scaling is harder.',
        'Tightly coupled MIMD.',
      ]}
      visual={<SharedMemoryMachine />}
    />
  ),
  notes: n('P0–P3 over COMMON MEMORY. Hardware view.'),
})

add({
  section: 'Architectures',
  title: 'UMA',
  content: (
    <Full
      section="Architectures"
      title="Uniform Memory Access"
      lead="All processors access memory with equal latency and bandwidth. The time to access all locations is the same for all cores."
      visual={<UmaMemoryScene />}
    />
  ),
  notes: n('Equal-length paths. Example: traditional SMP.'),
})

add({
  section: 'Architectures',
  title: 'NUMA',
  content: (
    <Full
      section="Architectures"
      title="Non-Uniform Memory Access"
      lead="A memory location directly connected to a core is faster than a location that must be reached through another chip."
      visual={<NumaMemoryScene />}
    />
  ),
  notes: n('Local = short. Remote = long. Used in HPC servers and data centers.'),
})

add({
  section: 'Architectures',
  title: 'UMA versus NUMA',
  content: (
    <Full
      section="Architectures"
      title="Memory access distance is the difference"
      lead="UMA: equal time, simpler, small systems. NUMA: location matters, scales, more complex."
      visual={<UmaVsNuma />}
    />
  ),
  notes: n('Do not reduce this to a text table. Show distance.'),
})

add({
  section: 'Architectures',
  title: 'Distributed memory',
  content: (
    <Split
      section="Architectures"
      title="Private memory plus messages"
      lead="Each processor has its own private memory and communicates explicitly by passing messages."
      points={[
        'Widely used in clusters, supercomputers and cloud architectures.',
        'The most widely available distributed-memory systems are clusters: commodity PCs plus a commodity network such as Ethernet.',
        'A grid turns geographically distributed computers into one distributed-memory system.',
        'Loosely coupled MIMD: massive scale, more programming complexity.',
      ]}
      takeaway="Communication becomes explicit in Module 3."
      visual={<DistributedMemoryMachine />}
    />
  ),
  notes: n('Do not duplicate MPI. Leave a continuity cue.'),
})

add({
  section: 'Architectures',
  title: 'Distributed-memory programs use processes',
  content: (
    <Split
      section="Architectures"
      title="Why processes, not threads, on clusters"
      lead="Threads of execution may run on independent CPUs with independent operating systems."
      points={[
        'There may be no software to start one distributed process and fork threads on every node.',
        'So distributed-memory programs usually start multiple processes rather than multiple threads.',
        'Ranks identify processes as 0, 1, …, p−1.',
      ]}
      visual={<DistributedMemoryMachine />}
    />
  ),
  notes: n('This prepares Module 3 without teaching MPI calls.'),
})

add({
  section: 'Architectures',
  title: 'Shared versus distributed memory',
  content: (
    <Split
      section="Architectures"
      title="The central design question"
      lead="Share variables, or send messages?"
      points={[
        'Shared: easy conceptual model, hardware coherence, limited core counts.',
        'Distributed: explicit messages, scales to large clusters, programmer manages data movement.',
        'Shared is tightly coupled. Distributed is loosely coupled.',
      ]}
      visual={<UmaVsNuma />}
      reverse
    />
  ),
  notes: n('Architecture, not MPI collectives.'),
})

/* ========================================================================
   NETWORKS
   ======================================================================== */
add({
  section: 'Networks',
  title: 'Interconnection networks',
  content: (
    <Divider
      section="Networks"
      tone="net"
      number="06"
      title="Interconnection networks"
      subtitle="The backbone that moves data between processors and memory."
      visual={<MeshTopology />}
    />
  ),
  notes: n('If processors spend too much time exchanging data, the whole program is slow.'),
})

add({
  section: 'Networks',
  title: 'Why the interconnect decides performance',
  content: (
    <Split
      section="Networks"
      title="Four people on a project"
      lead="If they spend more time talking than working, the project finishes late. Same in parallel computing."
      points={[
        'Facilitate data transfer between processors and memory.',
        'Enable synchronization and coordination.',
        'Provide a path for message passing or memory access.',
        'The interconnect plays a decisive role in both distributed- and shared-memory systems.',
      ]}
      visual={<CommCost />}
    />
  ),
  notes: n('Keep the talking-versus-working analogy from the source.'),
})

add({
  section: 'Networks',
  title: 'Static versus dynamic networks',
  content: (
    <Split
      section="Networks"
      title="Fixed pattern, or switches?"
      points={[
        'Static / direct / deterministic: connections are fixed. Linear array, ring, mesh, cube, hypercube, torus, star.',
        'Dynamic / indirect / multistage: connections via switches or routers. Omega, crossbar.',
      ]}
      visual={<StaticNetworks />}
    />
  ),
  notes: n('Old VTU said direct vs indirect. New PPT says static vs dynamic. Teach both names.'),
})

add({
  section: 'Networks',
  title: 'Ring',
  content: (
    <Full
      section="Networks"
      title="Neighbors in a loop"
      lead="Each node connects to two neighbors. A wrap closes the circle."
      visual={<RingTopology />}
    />
  ),
  notes: n('Full-stage topology. Not a tiny card.'),
})

add({
  section: 'Networks',
  title: 'Mesh',
  content: (
    <Full
      section="Networks"
      title="Grid of neighbors"
      lead="A packet hops to adjacent nodes. Natural for grid-shaped work."
      visual={<MeshTopology />}
    />
  ),
  notes: n('Highlight one route across neighbors.'),
})

add({
  section: 'Networks',
  title: 'Torus',
  content: (
    <Full
      section="Networks"
      title="Mesh with wrap-around"
      lead="Edge nodes connect to the opposite edge. No special border."
      visual={<TorusScene />}
    />
  ),
  notes: n('Show the wrap arcs.'),
})

add({
  section: 'Networks',
  title: 'Star, tree, hypercube',
  content: (
    <Full
      section="Networks"
      title="Hub, hierarchy, extra dimensions"
      lead="Star: all traffic through a hub. Tree: root can bottleneck. Hypercube: each hop flips one bit."
      visual={<StarTreeScene />}
    />
  ),
  notes: n('Then show the cube/hypercube slide.'),
})

add({
  section: 'Networks',
  title: 'Hypercube',
  content: (
    <Full
      section="Networks"
      title="Nodes differ by one bit"
      lead="Used in supercomputers. Each dimension is one extra neighbor."
      visual={<HypercubeScene />}
    />
  ),
  notes: n('Label binary ids if students are ready.'),
})

add({
  section: 'Networks',
  title: 'Omega network',
  content: (
    <Full
      section="Networks"
      title="Dynamic paths through switches"
      lead="Connections are established via switches or routers, allowing dynamic paths."
      visual={<OmegaScene />}
    />
  ),
  notes: n('Source pairs Omega with crossbar as dynamic examples.'),
})

add({
  section: 'Networks',
  title: 'Communication cost words',
  content: (
    <Full
      section="Networks"
      title="Latency, bandwidth, bisection, contention"
      lead="Old VTU completeness: the vocabulary used when a network is slow."
      visual={<CommCost />}
    />
  ),
  notes: n('These terms return in Module 2 as measured time.'),
})

/* ========================================================================
   COHERENCE
   ======================================================================== */
add({
  section: 'Coherence',
  title: 'Cache coherence',
  content: (
    <Divider
      section="Coherence"
      tone="cache"
      number="07"
      title="Cache coherence"
      subtitle="Private caches must agree about shared data."
      visual={<CacheCoherenceScene stage="stale" />}
    />
  ),
  notes: n('Especially MIMD shared-memory. Each processor has a local cache and shares main memory.'),
})

add({
  section: 'Coherence',
  title: 'The stale-copy story',
  content: (
    <Split
      section="Coherence"
      title="X starts at 5"
      lead="P1 caches X=5. P2 caches X=5. P1 writes X=10. P2 still sees 5."
      points={[
        'Cache coherence ensures all processors see a consistent view of memory.',
        'If one processor updates a location, others must see the updated value rather than stale data.',
        'Otherwise: bugs, race conditions, wrong results.',
      ]}
      formula="P1: X = 10     P2 still holds X = 5"
      visual={<CacheCoherenceScene stage="stale" />}
    />
  ),
  notes: n('Source numbers are 5 then 10. Keep them.'),
})

add({
  section: 'Coherence',
  title: 'Snooping versus directory',
  content: (
    <Full
      section="Coherence"
      title="Two approaches"
      lead="Snooping: caches monitor the bus. Directory: a table tracks who has copies."
      visual={<SnoopingVsDirectory />}
    />
  ),
  notes: n('When a processor reads or writes, all caches snoop and react.'),
})

add({
  section: 'Coherence',
  title: 'Write-update',
  content: (
    <Split
      section="Coherence"
      title="Broadcast the new value"
      lead="Instead of invalidating, the processor broadcasts the new value and other caches update their copies."
      points={[
        'Write-invalidate drops stale copies.',
        'Write-update / write-broadcast refreshes them.',
        'Source introduces both; do not over-expand protocols.',
      ]}
      visual={<CacheCoherenceScene stage="fresh" />}
    />
  ),
  notes: n('Keep depth aligned with the source.'),
})

add({
  section: 'Coherence',
  title: 'False sharing preview',
  content: (
    <Split
      section="Coherence"
      title="Independent variables, one cache line"
      lead="Old VTU completeness. Different variables can still fight."
      points={[
        'A cache line holds a block of nearby bytes.',
        'Two cores update different variables on the same line.',
        'Coherence traffic increases even without true data sharing.',
      ]}
      visual={<FalseSharing />}
    />
  ),
  notes: n('Preview only. Module 4 can deepen OpenMP cache issues.'),
})

/* ========================================================================
   COORDINATION
   ======================================================================== */
add({
  section: 'Coordination',
  title: 'Coordinating processes and threads',
  content: (
    <Divider
      section="Coordination"
      tone="coord"
      number="08"
      title="Coordination"
      subtitle="Divide the work. Synchronize. Communicate."
      visual={<ParallelBarrier />}
    />
  ),
  notes: n('Three source jobs: balance work, minimize communication, arrange synchronization.'),
})

add({
  section: 'Coordination',
  title: 'Process versus thread',
  content: (
    <Full
      section="Coordination"
      title="Independent program, or a path inside one"
      lead="A process has its own memory space. A thread is the smallest unit of execution inside a process."
      visual={<ProcessThread />}
    />
  ),
  notes: n('Process: heavyweight, OS scheduler. Thread: shared memory, own stack, faster switch.'),
})

add({
  section: 'Coordination',
  title: 'Three coordination jobs',
  content: (
    <Split
      section="Coordination"
      title="What the programmer must arrange"
      points={[
        'Divide work so each process/thread gets roughly the same amount, and communication is minimized.',
        'Arrange for the processes/threads to synchronize.',
        'Arrange for communication among the processes/threads.',
      ]}
      visual={<LoadBalance />}
    />
  ),
  notes: n('Load balance is why decomposition quality matters. Module 2 later measures it.'),
})

add({
  section: 'Coordination',
  title: 'Data partition of x[i] += y[i]',
  content: (
    <Split
      section="Coordination"
      title="Assign array elements"
      lead="With p processes/threads, process 0 owns 0 … n/p − 1, process 1 owns n/p … 2n/p − 1, and so on."
      code={`double x[n], y[n];
for (int i = 0; i < n; i++)
  x[i] += y[i];`}
      visual={<DataDecomposition />}
    />
  ),
  notes: n('This is decomposition, not MPI ranks.'),
})

add({
  section: 'Coordination',
  title: 'Task decomposition',
  content: (
    <Full
      section="Coordination"
      title="Different tasks on different cores"
      lead="Task-parallelism partitions the various tasks carried out in solving the problem."
      visual={<TaskDecomposition />}
    />
  ),
  notes: n('Source-supported functional split.'),
})

add({
  section: 'Coordination',
  title: 'Dynamic versus static threads',
  content: (
    <Full
      section="Coordination"
      title="When are worker threads created?"
      lead="Dynamic: master forks a worker when a task arrives, then the worker joins. Static: all workers are forked at once and stay until the work is finished."
      visual={<DynamicStaticThreads />}
    />
  ),
  notes: n('Shared-memory programs often use dynamic threads. Static is the alternative paradigm.'),
})

add({
  section: 'Coordination',
  title: 'Nondeterminism',
  content: (
    <Split
      section="Coordination"
      title="Same input, different order"
      lead="Nondeterminism is a situation in which a program produces different outputs even when executed multiple times with the same input."
      points={[
        'Thread 0 stores my_x = 7. Thread 1 stores my_x = 19.',
        'printf can print 0 then 1, or 1 then 0.',
        'The exact order of threads is unpredictable.',
      ]}
      code={`printf("Thread %d > my_x = %d\\n", my_rank, my_x);`}
      visual={<NondeterminismScene />}
    />
  ),
  notes: n('Keep 7 and 19. They return in the race example.'),
})

add({
  section: 'Coordination',
  title: 'Race condition',
  content: (
    <Full
      section="Coordination"
      title="Both threads execute x += my_val"
      lead="x starts at 0. Core 0 adds 7. Core 1 adds 19. Without exclusion the store of 7 is lost and x ends at 19 instead of 26."
      visual={<RaceConditionScene />}
    />
  ),
  notes: n('Walk the six time steps. Lost update is the teaching action.'),
})

add({
  section: 'Coordination',
  title: 'Critical section and mutex',
  content: (
    <Split
      section="Coordination"
      title="One thread at a time"
      lead="A critical section can be executed by only one thread at a time. The common mechanism is a mutex lock."
      code={`my_val = Compute_val(my_rank);
Lock(&add_my_val_lock);
x += my_val;
Unlock(&add_my_val_lock);`}
      points={[
        'If one thread is in the critical section, others are excluded.',
        'A mutex is a special object with hardware support.',
        'Each critical section is protected by a lock.',
      ]}
      visual={<MutexScene />}
    />
  ),
  notes: n('Do not expand into OpenMP pragmas. That is Module 4.'),
})

add({
  section: 'Coordination',
  title: 'Synchronization as a barrier',
  content: (
    <Full
      section="Coordination"
      title="Wait until everyone arrives"
      lead="Workers finish stages at different times. All must synchronize before the next phase."
      visual={<ParallelBarrier />}
    />
  ),
  notes: n('Conceptual barrier. Not OpenMP #pragma omp barrier.'),
})

add({
  section: 'Coordination',
  title: 'Message passing',
  content: (
    <Split
      section="Coordination"
      title="Send and receive"
      lead="A message-passing API provides at least a send and a receive. Processes identify each other by ranks 0 … p−1."
      code={`if (my_rank == 1) {
  sprintf(message, "Greetings from process 1");
  Send(message, MSG_CHAR, 100, 0);
} else if (my_rank == 0) {
  Receive(message, MSG_CHAR, 100, 1);
  printf("Process 0 > Received: %s\\n", message);
}`}
      visual={<MessagePassing />}
    />
  ),
  notes: n('Source greeting example. Module 3 implements this in MPI.'),
})

add({
  section: 'Coordination',
  title: 'One-sided communication',
  content: (
    <Split
      section="Coordination"
      title="Only one process performs the operation"
      lead="The sender can place data into the receiver’s memory. The receiver does not execute a matching receive."
      points={[
        'Put: writes into another process’s memory.',
        'Get: reads from another process’s memory.',
        'Accumulate: updates data in another process’s memory.',
        'Compared with two-sided Send/Receive: less synchronization, often faster, receiver need not participate.',
      ]}
      visual={<OneSidedScene />}
    />
  ),
  notes: n('Source names MPI_Put and MPI_Get as examples, without teaching the API.'),
})

/* ========================================================================
   SUMMARY
   ======================================================================== */
add({
  section: 'Summary',
  title: 'Module 1 in one picture',
  content: (
    <Full
      section="Summary"
      title="From one processor to coordinated architecture"
      lead="Then Module 2 asks how much performance we actually gain."
      visual={<Module1Synthesis />}
    />
  ),
  notes: n('Need → decompose → Flynn → memory → network → coordinate → Module 2.'),
})

add({
  section: 'Summary',
  title: 'Exam-writing shortcuts',
  content: (
    <Split
      section="Summary"
      title="Turn concepts into marks"
      points={[
        'For definitions, write one clear line plus one example.',
        'For SIMD versus MIMD, use a two-column picture of streams.',
        'For memory systems, draw shared and distributed diagrams, then UMA/NUMA distance.',
        'For networks, mention latency, bandwidth and topology.',
        'For cache coherence, explain stale copies and snooping versus directory.',
        'For races, walk x += my_val and the lost update to 19 instead of 26.',
      ]}
      visual={<KeyTerms />}
    />
  ),
  notes: n('Definition + diagram + comparison + example + limitation.'),
})

add({
  section: 'Summary',
  title: '20 viva questions',
  content: (
    <Full
      section="Summary"
      title="20 viva questions"
      lead="Two to four lines plus one keyword."
      visual={<ExamList items={[
        '1. What is parallel computing?',
        '2. Why write parallel programs?',
        '3. Core vs multicore?',
        '4. Concurrency vs parallelism?',
        '5. Data parallelism? Task parallelism?',
        '6. Define SISD, SIMD, MISD, MIMD.',
        '7. Shared vs distributed memory?',
        '8. UMA vs NUMA?',
        '9. Interconnection network? Latency?',
        '10. Bandwidth? Cache coherence?',
        '11. Snooping vs directory?',
        '12. Process vs thread?',
        '13. What is a race? A mutex?',
        '14. Message passing?',
        '15. One-sided communication?',
        '16. MPI vs OpenMP vs CUDA?',
      ]} />}
    />
  ),
  notes: n('Two to four lines plus one keyword.'),
})

add({
  section: 'Summary',
  title: '10 two-mark questions',
  content: (
    <Full
      section="Summary"
      title="10 two-mark questions"
      lead="One sentence plus one example."
      visual={<ExamList items={[
        '1. Define parallel computing.',
        '2. Define a core.',
        '3. What is data parallelism?',
        '4. What is task parallelism?',
        '5. Define SIMD. Define MIMD.',
        '6. Why is MISD rare?',
        '7. What is shared memory?',
        '8. What is distributed memory?',
        '9. Define UMA. Define NUMA.',
        '10. Cache coherence? Thread? Mutex?',
      ]} />}
    />
  ),
  notes: n('One sentence plus one example.'),
})

add({
  section: 'Summary',
  title: '10 five-mark questions',
  content: (
    <Full
      section="Summary"
      title="10 five-mark questions"
      lead="Diagram plus steps plus one limitation."
      visual={<ExamList items={[
        '1. Need for parallel programming and multi-core shift.',
        '2. n-value sum and tree reduction to 95.',
        '3. Flynn’s taxonomy: SISD, SIMD, MISD, MIMD.',
        '4. Differentiate SIMD and MIMD.',
        '5. Shared-memory architecture, UMA and NUMA.',
        '6. Distributed-memory architecture and clusters.',
        '7. Interconnection networks: static vs dynamic.',
        '8. Cache coherence with X = 5 then X = 10.',
        '9. Processes, threads and the race on x += my_val.',
        '10. Message passing and one-sided communication.',
      ]} />}
    />
  ),
  notes: n('Diagram plus steps plus one limitation.'),
})

add({
  section: 'Summary',
  title: '10 ten-mark questions',
  content: (
    <Full
      section="Summary"
      title="10 ten-mark questions"
      lead="Ten marks need a figure. Draw processors and memory."
      visual={<ExamList items={[
        '1. Parallel programming: need, heat limits, examples.',
        '2. Classify computers with SIMD and MIMD.',
        '3. Interconnection networks and why they matter.',
        '4. Cache coherence and shared vs distributed memory.',
        '5. Coordinating processes/threads, races, mutexes, messages.',
        '6–10. Previous VTU Q1–Q5: fill from the past paper.',
      ]} />}
    />
  ),
  notes: n('Ten marks need a figure. Force students to draw processors and memory.'),
})

add({
  section: 'Summary',
  title: 'One-page revision sheet',
  content: (
    <Split
      section="Summary"
      title="Must-remember keywords"
      points={[
        'parallelism; core; multicore; serial program; tree reduction.',
        'SISD; SIMD; MISD; MIMD; control unit; processing element.',
        'shared memory; distributed memory; UMA; NUMA; SMP; cluster; grid.',
        'bus; crossbar; mesh; torus; hypercube; omega; latency; bandwidth.',
        'cache coherence; snooping; directory; process; thread; mutex; race; message passing; Put/Get.',
      ]}
      visual={<KeyTerms />}
    />
  ),
  notes: n('Close: one processor became many, but only coordination makes the result correct. Module 2 measures speed.'),
})

add({
  section: 'Summary',
  title: 'Study resources',
  content: (
    <Shell section="Summary">
      <Head title="Continue after the lecture" lead="Notes and PYQ architecture are unchanged." />
      <div className="fo-resource">
        <Link to="/parallel-computing/module-1/notes">
          <BookOpen size={28} strokeWidth={1.8} />
          <strong>Module Notes</strong>
          <span>Open the Module 1 notes companion.</span>
        </Link>
        <Link to="/parallel-computing/module-1/previous-year-questions">
          <FileQuestion size={28} strokeWidth={1.8} />
          <strong>Previous Year Questions</strong>
          <span>Viva, 2 marks, 5 marks and 10 marks.</span>
        </Link>
      </div>
    </Shell>
  ),
  notes: n('Do not change Notes/PYQ routing. This slide only links to it.'),
})

export const parallelComputingModule1Slides = raw.map((item, index) => slide({
  id: `pc-fo-${String(index + 1).padStart(2, '0')}`,
  title: item.title,
  subtitle: item.subtitle,
  content: item.content,
  notes: item.notes,
  composition: item.composition || 'teaching',
}))
