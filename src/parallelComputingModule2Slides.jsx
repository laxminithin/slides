import { Link } from 'react-router-dom'
import { BookOpen, FileQuestion } from 'lucide-react'
import './parallelComputing.css'
import './pcComposition.css'
import './perfScenes.css'
import {
  OpeningInvestigation,
  MimdStreams,
  SharedMimdArch,
  DistMimdArch,
  MimdWorkloads,
  RuntimeParts,
  ProgrammingModels,
  CpuGpuArena,
  FeatureTable,
  CpuStrengths,
  HeterogeneousPair,
  HostDeviceFlow,
  ThreeStepComm,
  MultiprocessorArch,
  ComputeDeviceScene,
  GpuMemoryTypes,
  HwVsSwView,
  GridBlocksThreads,
  GoodGpuArray,
  BadGpuWork,
  GpuDieBoard,
  Gtx280,
  HybridCluster3,
  HybridModels,
  HybridWorkflow,
  HybridMemoryNode,
  SerialVsParallel,
  RuntimeClocks,
  SpeedupRace,
  SpeedupT1T2,
  SpeedupCurve,
  EfficiencyLanes,
  LoadBalance,
  PerfTable,
  HashamStory,
  AmdahlTimeline,
  AmdahlNumeric,
  SmaxCeiling,
  DiminishingReturns,
  AmdahlFamily,
  StrongSplit,
  WeakGrow,
  StrongVsWeak,
  IsoefficiencyFlow,
  WrongTimer,
  TimingPipeline,
  WallClockTools,
  GpuTotalTime,
  GpuSpeedup8x,
  ArithmeticIntensity,
  OccupancyLanes,
  WarpDiverge,
  CoalesceVsScatter,
  ThreeWayChoice,
  OnePicture,
  KeyFormulas,
  LangStrip,
  GpuFeatures,
  UseCases,
} from './components/PerfScenes'

const roadmap = [
  'Opening',
  'MIMD',
  'GPU',
  'Hybrid',
  'Metrics',
  'Amdahl',
  'Scaling',
  'Timing',
  'GPU Perf',
  'Summary',
]

const SRC = 'Source: MODULE 2 aug.pptx (New PPT) plus VTU BCS702 Module 2 GPU/MIMD/Performance syllabus coverage.'

function slide({ id, title, subtitle, content, notes, hideTitle = true, composition = 'teaching' }) {
  return {
    id,
    kicker: 'VTU BCS702 | Module 2',
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
    <nav className="pc-m2-roadmap" aria-label="Module 2 roadmap">
      {roadmap.map((item) => <span key={item} className={item === section ? 'active' : ''}>{item}</span>)}
    </nav>
  )
}

function Shell({ section, children }) {
  return (
    <div className="pc-m2-slide">
      <Roadmap section={section} />
      <div className="pe-stage-wrap">{children}</div>
    </div>
  )
}

function Head({ kicker, title, lead }) {
  return (
    <header className="pe-head">
      {kicker && <span className="pe-kicker">{kicker}</span>}
      <h2>{title}</h2>
      {lead && <p className="pe-lead">{lead}</p>}
    </header>
  )
}

function Points({ items }) {
  return (
    <ul className="pe-points">
      {items.map((item) => <li key={item}>{item}</li>)}
    </ul>
  )
}

function Full({ section, kicker, title, lead, visual }) {
  return (
    <Shell section={section}>
      <Head kicker={kicker} title={title} lead={lead} />
      <div className="pe-full pe-visual">{visual}</div>
    </Shell>
  )
}

function Split({ section, kicker, title, lead, points, formula, question, takeaway, visual, reverse = false }) {
  return (
    <Shell section={section}>
      <Head kicker={kicker} title={title} lead={lead} />
      <div className={`pe-split ${reverse ? 'reverse' : ''}`}>
        <section className="pe-copy">
          {question && <p className="pe-q">{question}</p>}
          {formula && <p className={`pe-formula ${formula.length > 42 ? 'sm' : ''}`}>{formula}</p>}
          {points && <Points items={points} />}
          {takeaway && <p className="pe-take">{takeaway}</p>}
        </section>
        <section className="pe-visual">{visual}</section>
      </div>
    </Shell>
  )
}

function Divider({ section, tone, number, title, subtitle, visual }) {
  return (
    <Shell section={section}>
      <div className={`pe-divider pe-div-${tone}`}>
        <div className="pe-divider-copy">
          <span>{number}</span>
          <h2>{title}</h2>
          <p>{subtitle}</p>
        </div>
        <div className="pe-visual">{visual}</div>
      </div>
    </Shell>
  )
}

const n = (topic) => `What to say: ${topic} Keep the investigation honest: measure runtime, then decide. ${SRC}`

const raw = []
function add(item) { raw.push(item) }

/* ========================================================================
   OPENING
   ======================================================================== */
add({
  section: 'Opening',
  title: 'MIMD, GPU and Performance',
  composition: 'hero',
  content: (
    <Shell section="Opening">
      <Head kicker="Parallel Computing  ·  Module 2" title="MIMD, GPU & Performance" lead="More processors do not automatically mean more speed." />
      <div className="pe-full"><OpeningInvestigation /></div>
    </Shell>
  ),
  notes: n('Open on one slow sequential bar. Cores ignite, GPU appears, hybrid cluster appears, runtime falls, overhead appears. End on: how much speedup did we really gain?'),
})

add({
  section: 'Opening',
  title: 'Learning objectives',
  content: (
    <Split
      section="Opening"
      title="Use the syllabus as the checklist"
      lead="Every heading below is on the updated Module 2 PPT."
      points={[
        'GPU programming and GPU architecture.',
        'Performance analysis: speedup and efficiency.',
        "Amdahl’s law.",
        'Scalability.',
        'Timing analysis.',
        'Hybrid programming systems.',
        'MIMD systems — why they dominate general-purpose parallelism.',
      ]}
      visual={<OpeningInvestigation />}
    />
  ),
  notes: n('Read the TOC as a performance investigation, not as eight disconnected definitions.'),
})

add({
  section: 'Opening',
  title: 'Module 2 map',
  content: (
    <Full
      section="Opening"
      title="One engineering investigation"
      lead="Sequential program → MIMD → GPU → hybrid → measure → interpret."
      visual={<HybridWorkflow />}
    />
  ),
  notes: n('Trace the story once. Later slides deepen each box; they do not restart the module.'),
})

add({
  section: 'Opening',
  title: 'The performance question',
  content: (
    <Split
      section="Opening"
      title="Did the program actually become faster?"
      question="More hardware has been added — but did the program actually become faster?"
      points={[
        'Compare sequential time with parallel time.',
        'Use the same input and equivalent output.',
        'Speedup says how much faster. Efficiency says how well hardware is used.',
      ]}
      takeaway="Always ask: did the extra hardware actually help?"
      visual={<RuntimeClocks />}
    />
  ),
  notes: n('80 s versus 12 s is the running lab number. Do not assume 8× just because there are 8 cores.'),
})

add({
  section: 'Opening',
  title: 'GPU programming is heterogeneous',
  content: (
    <Split
      section="Opening"
      title="Two different processors, one program"
      lead="The updated PPT opens GPU work as heterogeneous programming."
      points={[
        'Host code allocates and initializes storage on both the CPU and the GPU.',
        'The GPU itself has one or more processors, each capable of hundreds or thousands of threads.',
        'Processors share a large block of memory, but each has a small faster block accessible only by threads on that processor.',
      ]}
      visual={<HeterogeneousPair />}
    />
  ),
  notes: n('This Pacheco-style paragraph is on the new PPT. Keep both memory facts.'),
})

/* ========================================================================
   MIMD
   ======================================================================== */
add({
  section: 'MIMD',
  title: 'MIMD systems',
  composition: 'hero',
  content: <Divider section="MIMD" tone="mimd" number="01" title="MIMD" subtitle="Independent instruction streams. Independent data. Independent workers." visual={<MimdStreams />} />,
  notes: n('Section open: four processors, four jobs. Not four generic cards.'),
})

add({
  section: 'MIMD',
  title: 'Multiple Instruction Multiple Data',
  content: (
    <Full
      section="MIMD"
      title="Simultaneous execution"
      lead="Processor 0 runs stream A on data A. Processor 1 runs stream B on data B. They do not wait for identical instructions."
      visual={<MimdStreams />}
    />
  ),
  notes: n('Point at each row. Physics, boundary, files, visualization can run at once.'),
})

add({
  section: 'MIMD',
  title: 'Shared-memory MIMD',
  content: (
    <Split
      section="MIMD"
      title="Processors share one memory"
      lead="Threads coordinate through shared variables, locks, barriers and cache coherence."
      points={[
        'Threads run inside one process.',
        'Variables live in a common address space.',
        'Locks and barriers control shared updates.',
        'Cache coherence keeps copies consistent.',
      ]}
      takeaway="Shared memory is convenient. Waiting and coherence still appear in runtime."
      visual={<SharedMimdArch />}
    />
  ),
  notes: n('Connect conceptually to Module 4 OpenMP without teaching pragmas here.'),
})

add({
  section: 'MIMD',
  title: 'Distributed-memory MIMD',
  content: (
    <Split
      section="MIMD"
      title="Processor + local memory, linked by an interconnect"
      lead="Processes own private memory and exchange messages."
      points={[
        'Each processor has local memory.',
        'Send and receive move data.',
        'Network cost appears in runtime.',
        'Node-level results must be combined.',
      ]}
      takeaway="Distributed MIMD scales, but communication is never free."
      visual={<DistMimdArch />}
      reverse
    />
  ),
  notes: n('Connect conceptually to Module 3 MPI without teaching Send/Recv here.'),
})

add({
  section: 'MIMD',
  title: 'Why MIMD dominates general workloads',
  content: (
    <Split
      section="MIMD"
      title="Real programs branch, wait and mix tasks"
      points={[
        'Independent instruction streams — weather physics and visualization at once.',
        'Irregular workloads — file analysis and database work do not lockstep.',
        'General-purpose parallelism — maps to processes and threads.',
        'Branch-heavy work — control flow that SIMD/SIMT hates.',
      ]}
      visual={<MimdWorkloads />}
    />
  ),
  notes: n('Teach with actual jobs, not a bullet list floating in space.'),
})

add({
  section: 'MIMD',
  title: 'MIMD performance bottlenecks',
  content: (
    <Full
      section="MIMD"
      title="Adding processors does not give perfect speedup"
      lead="Useful work plus communication, synchronization, idle time and memory delay."
      visual={(
        <RuntimeParts
          title="A runtime bar, not a slogan"
          parts={[
            ['Useful work', 42, '#16a34a'],
            ['Communication', 16, '#f59e0b'],
            ['Synchronization', 12, '#ea580c'],
            ['Idle time', 18, '#e11d48'],
            ['Memory delay', 12, '#0891b2'],
          ]}
        />
      )}
    />
  ),
  notes: n('Walk the bar left to right. The missing speedup lives in the non-green slices.'),
})

add({
  section: 'MIMD',
  title: 'Four parallel programming models',
  content: (
    <Split
      section="MIMD"
      title="The new PPT names four models"
      points={[
        'Shared memory model.',
        'Message passing model.',
        'Threads model.',
        'Data parallel model.',
      ]}
      takeaway="Hybrid systems combine more than one of these."
      visual={<ProgrammingModels />}
    />
  ),
  notes: n('Source slide: Parallel Programming Models. Keep all four names.'),
})

/* ========================================================================
   GPU
   ======================================================================== */
add({
  section: 'GPU',
  title: 'GPU Computing',
  composition: 'hero',
  content: <Divider section="GPU" tone="gpu" number="02" title="GPU Computing" subtitle="Not a CPU with more cores — a throughput engine for data-parallel work." visual={<CpuGpuArena />} />,
  notes: n('Contrast latency versus throughput before vocabulary.'),
})

add({
  section: 'GPU',
  title: 'What is GPU computing?',
  content: (
    <Split
      section="GPU"
      title="A GPU performs many operations in parallel"
      points={[
        'GPU computing uses a Graphics Processing Unit to perform computations faster by executing many operations in parallel, unlike a CPU which processes work sequentially.',
        'A GPU contains thousands of smaller cores.',
        'It works together with the CPU to accelerate compute-intensive applications.',
        'It is widely used in AI, machine learning, image processing and scientific computing.',
      ]}
      visual={<CpuGpuArena />}
    />
  ),
  notes: n('Keep the source definition sentence. GPU is not a replacement for the OS host.'),
})

add({
  section: 'GPU',
  title: 'Heterogeneous computing',
  content: (
    <Split
      section="GPU"
      title="CPU and GPU work together rather than replacing one another"
      points={[
        'CPU (Host): operating system, control flow and memory management.',
        'GPU (Device): specialized co-processor for heavy parallel computation.',
        'GPU programming is heterogeneous because it combines different types of processors.',
      ]}
      visual={<HeterogeneousPair />}
      reverse
    />
  ),
  notes: n('Host versus device is the exam vocabulary. Repeat it until students can draw it.'),
})

add({
  section: 'GPU',
  title: 'CPU versus GPU',
  content: (
    <Full
      section="GPU"
      title="Latency-oriented versus throughput-oriented"
      lead="Few powerful cores and large cache versus many lightweight lanes and high bandwidth."
      visual={<CpuGpuArena />}
    />
  ),
  notes: n('Do not teach GPU as a normal CPU with more cores.'),
})

add({
  section: 'GPU',
  title: 'CPU versus GPU feature table',
  content: (
    <Full
      section="GPU"
      title="Source comparison"
      lead="Keep both columns. This table is on the updated Module 2 PPT."
      visual={<FeatureTable />}
    />
  ),
  notes: n('This table is on the new PPT. Recite both columns.'),
})

add({
  section: 'GPU',
  title: 'CPU strengths and limits',
  content: (
    <Split
      section="GPU"
      title="The CPU is the control processor"
      points={[
        'Versatility: operating systems, applications, mixed tasks.',
        'Strong sequential processing: program logic and step-by-step calculation.',
        'Multi-tasking with multiple cores and threads.',
        'Limited parallel processing: cannot efficiently handle thousands of operations at once.',
        'Lower throughput for large AI, simulation and graphics work.',
      ]}
      visual={<CpuStrengths />}
    />
  ),
  notes: n('Advantages and disadvantages are both on the new PPT. Teach both.'),
})

add({
  section: 'GPU',
  title: 'GPU strengths and limits',
  content: (
    <Split
      section="GPU"
      title="The GPU is the throughput processor"
      points={[
        'Massive parallel processing: thousands of operations at once.',
        'High throughput for large data.',
        'Efficient for AI, image processing and scientific computation.',
        'Not suitable for general tasks such as running an operating system.',
        'Higher power usage during heavy computation.',
      ]}
      takeaway="GPU is not always faster."
      visual={<GpuFeatures />}
      reverse
    />
  ),
  notes: n('Power and OS unsuitability prevent the “GPU always wins” error.'),
})

add({
  section: 'GPU',
  title: 'How GPUs work',
  content: (
    <Split
      section="GPU"
      title="Massive parallelism"
      points={[
        'A GPU accelerates rendering of images, video and animations by handling many calculations in parallel.',
        'The same reason makes GPUs useful in machine learning and scientific computing.',
        'Thousands of small cores (CUDA cores on NVIDIA, stream processors on AMD) process many data streams simultaneously.',
      ]}
      visual={<GridBlocksThreads />}
    />
  ),
  notes: n('Keep CUDA cores / stream processors as source terminology.'),
})

add({
  section: 'GPU',
  title: 'GPU applications',
  content: (
    <Full
      section="GPU"
      title="Where the throughput is used"
      lead="AI, image processing, scientific computing, data analytics, gaming, autonomous systems, finance, crypto, medical imaging and VR."
      visual={<UseCases />}
    />
  ),
  notes: n('Recover every use case named on the new PPT. Do not shrink to three icons.'),
})

add({
  section: 'GPU',
  title: 'Features of a GPU',
  content: (
    <Full
      section="GPU"
      title="What the hardware is built to do"
      visual={<GpuFeatures />}
    />
  ),
  notes: n('Rendering, CAD/video, cross-device, color formats, AI acceleration.'),
})

add({
  section: 'GPU',
  title: 'Core components of a graphics card',
  content: (
    <Split
      section="GPU"
      title="Die, memory, cooling, power"
      points={[
        'GPU Die: houses the compute units.',
        'VRAM: dedicated high-speed memory for graphics data and textures.',
        'Cooling system: keeps the GPU from overheating.',
        'Power regulation and interfaces: power the card and connect it to the motherboard and display.',
      ]}
      visual={<GpuDieBoard />}
    />
  ),
  notes: n('Physical board facts from the new PPT. Keep all four.'),
})

add({
  section: 'GPU',
  title: 'GPU architecture',
  content: (
    <Split
      section="GPU"
      title="Many cores, slower clocks, huge throughput"
      points={[
        'A GPU is a chip capable of rendering graphics — and of general parallel processing.',
        'Multiple processors handle separate parts of the same task.',
        'Each core runs at a clock speed significantly slower than a typical CPU clock.',
        'GPUs focus on execution throughput of massively parallel programs.',
      ]}
      visual={<MultiprocessorArch />}
    />
  ),
  notes: n('Slower clock + more cores is the architecture idea students forget.'),
})

add({
  section: 'GPU',
  title: 'NVIDIA GPU example — GTX 280',
  content: (
    <Full
      section="GPU"
      title="240 cores, SIMD, host-initiated"
      lead="The GPU is not a standalone device. The CPU initiates computation and transfers data."
      visual={<Gtx280 />}
    />
  ),
  notes: n('Keep 240 cores and SIMD/shared instruction cache from the source example.'),
})

add({
  section: 'GPU',
  title: 'Multiprocessors and shared memory',
  content: (
    <Full
      section="GPU"
      title="Device memory on top. Multiprocessors in the middle. Registers and shared memory below."
      visual={<MultiprocessorArch />}
    />
  ),
  notes: n('Recreate the source block diagram: Device Memory → MP 1..n → cores → registers/shared memory.'),
})

add({
  section: 'GPU',
  title: 'Compute device, RAM and distributor',
  content: (
    <Split
      section="GPU"
      title="Source architecture vocabulary"
      points={[
        'Compute device: subset of the GPU dedicated to general-purpose parallel processing, made of compute units.',
        'GPU RAM / global memory: dedicated memory integrated with the GPU.',
        'Workload distributor: processes instructions and data from the CPU and coordinates movement onto compute units.',
        'Compute units contain ALUs and processing elements (PEs) that execute in parallel.',
      ]}
      visual={<ComputeDeviceScene />}
    />
  ),
  notes: n('CU and PE terminology is on the new PPT. Keep it.'),
})

add({
  section: 'GPU',
  title: 'Types of memories in a GPU',
  content: (
    <Full
      section="GPU"
      title="Local, shared, global, constant"
      lead="Accessing DRAM is slow. CUDA caches frequently used data in faster low-capacity memories."
      visual={<GpuMemoryTypes />}
    />
  ),
  notes: n('per-thread local, per-block shared, per-grid global, read-only constant.'),
})

add({
  section: 'GPU',
  title: 'Global memory is high-latency',
  content: (
    <Split
      section="GPU"
      title="Reduce global accesses to raise arithmetic intensity"
      points={[
        'Global memory is a high-latency memory.',
        'There is no limitation on which threads access it — all threads of any block can.',
        'It is the main means of communicating data between host and device.',
        'Constant and texture memory exist; Module 2 focuses on global first.',
      ]}
      visual={<GpuMemoryTypes />}
    />
  ),
  notes: n('CUDA memory-model overview from the new PPT. Do not over-teach texture.'),
})

add({
  section: 'GPU',
  title: 'Hardware view versus software view',
  content: (
    <Full
      section="GPU"
      title="Device maps to kernel. Multiprocessor maps to block. Core maps to thread."
      visual={<HwVsSwView />}
    />
  ),
  notes: n('This pairing is the source “GPU Hardware vs Software view” slide.'),
})

add({
  section: 'GPU',
  title: 'Operational workflow',
  content: (
    <Full
      section="GPU"
      title="Because memories are separate, data must move"
      lead="Data offloading → kernel launch → result retrieval."
      visual={<HostDeviceFlow step={4} />}
    />
  ),
  notes: n('Three professional stages from the new PPT. Animate the copies.'),
})

add({
  section: 'GPU',
  title: 'Three-step communication',
  content: (
    <Full
      section="GPU"
      title="Copy in. Execute. Copy out."
      visual={<ThreeStepComm />}
    />
  ),
  notes: n('Keep the three numbered sentences from the source diagram.'),
})

add({
  section: 'GPU',
  title: 'Grid, blocks and threads',
  content: (
    <Split
      section="GPU"
      title="Execution hierarchy"
      points={[
        'Host: CPU side that launches work.',
        'Device: GPU side that executes kernels.',
        'Kernel: the function executed by many GPU threads.',
        'Hierarchy: Grid → Blocks → Threads.',
      ]}
      takeaway="Module 5 will program this in CUDA. Module 2 only introduces the map."
      visual={<GridBlocksThreads />}
    />
  ),
  notes: n('Do not over-teach CUDA syntax here.'),
})

add({
  section: 'GPU',
  title: 'Good GPU workloads',
  content: (
    <Split
      section="GPU"
      title="One operation, many independent elements"
      points={[
        'Large arrays with the same operation on many elements.',
        'High arithmetic intensity compared with data transfer.',
        'Regular / coalesced memory access.',
        'Limited branch divergence.',
        'Enough work to fill many GPU cores.',
      ]}
      visual={<GoodGpuArray />}
    />
  ),
  notes: n('Vector, matrix, image, simulation, ML — source-supported examples.'),
})

add({
  section: 'GPU',
  title: 'Poor GPU workloads',
  content: (
    <Split
      section="GPU"
      title="The GPU does not always mean faster"
      points={[
        'Small problems where launch overhead dominates.',
        'Irregular branch-heavy code.',
        'Frequent CPU–GPU transfers.',
        'Strong sequential dependence.',
        'Scattered memory access.',
      ]}
      visual={<BadGpuWork />}
      reverse
    />
  ),
  notes: n('Say the sentence out loud: GPU is not always faster.'),
})

add({
  section: 'GPU',
  title: 'Parallel programming languages',
  content: (
    <Split
      section="GPU"
      title="CUDA, OpenCL, OpenMP, HIP"
      points={[
        'Well-known languages and models: OpenCL, CUDA, OpenMP, HIP.',
        'CUDA is NVIDIA’s platform for GPU-accelerated code in C++, Python and Fortran.',
        'OpenCL is a cross-platform open standard for heterogeneous systems, supported by AMD, Intel and NVIDIA.',
      ]}
      visual={<LangStrip />}
    />
  ),
  notes: n('Keep all four names from the new PPT. OpenAMP OCR is OpenMP.'),
})

/* ========================================================================
   HYBRID
   ======================================================================== */
add({
  section: 'Hybrid',
  title: 'Hybrid Computing',
  composition: 'hero',
  content: <Divider section="Hybrid" tone="hyb" number="03" title="Hybrid Computing" subtitle="MPI across nodes. OpenMP on CPU cores. CUDA/OpenCL on the accelerator." visual={<HybridCluster3 />} />,
  notes: n('Show three fat nodes before naming APIs.'),
})

add({
  section: 'Hybrid',
  title: 'What is a hybrid system?',
  content: (
    <Split
      section="Hybrid"
      title="Multiple forms of parallelism in one program"
      points={[
        'A hybrid system combines multiple forms of parallelism — MPI across nodes, OpenMP within nodes, and GPU kernels on accelerators.',
        'Programming hybrid systems pairs distributed-memory communication between nodes with shared-memory or accelerator execution within nodes.',
      ]}
      visual={<HybridCluster3 />}
    />
  ),
  notes: n('Keep the source definition. Then show the three-node picture.'),
})

add({
  section: 'Hybrid',
  title: 'Levels of parallelism',
  content: (
    <Full
      section="Hybrid"
      title="How to control hybrid hardware"
      lead="MPI · OpenMP · CUDA · OpenCL"
      visual={<HybridCluster3 />}
    />
  ),
  notes: n('Source diagram: MPI between nodes, OpenMP on CPUs, CUDA on GPUs, MPI+CUDA across GPU nodes.'),
})

add({
  section: 'Hybrid',
  title: 'Common hybrid models',
  content: (
    <Split
      section="Hybrid"
      title="MPI+OpenMP, MPI+CUDA/OpenCL, PGAS+MPI"
      points={[
        'MPI + OpenMP: MPI for inter-node communication; OpenMP for multi-core threads inside each node.',
        'MPI + CUDA/OpenCL: MPI distributes data across nodes; the accelerator executes tasks on GPUs inside each node.',
        'PGAS + MPI: global shared-memory abstractions with explicit message passing for flexible scaling.',
      ]}
      visual={<HybridModels />}
    />
  ),
  notes: n('PGAS is on the new PPT. Do not drop it.'),
})

add({
  section: 'Hybrid',
  title: 'Hybrid execution story',
  content: (
    <Full
      section="Hybrid"
      title="Partition, thread, accelerate, combine"
      visual={<HybridWorkflow />}
    />
  ),
  notes: n('This is why modern HPC mixes models: each layer matches a hardware scope.'),
})

add({
  section: 'Hybrid',
  title: 'Inside one hybrid node',
  content: (
    <Split
      section="Hybrid"
      title="One MPI process, OpenMP threads, shared memory"
      points={[
        'A typical picture: one MPI process per node (or socket) and OpenMP threads on the cores.',
        'Scale that picture across computers on a high-performance network.',
      ]}
      visual={<HybridMemoryNode />}
    />
  ),
  notes: n('Source caption: 1 MPI process, OpenMP threads, cores, network.'),
})

add({
  section: 'Hybrid',
  title: 'Why hybrid systems exist',
  content: (
    <Split
      section="Hybrid"
      title="The hardware is already hybrid"
      points={[
        'Nodes contain multicore CPUs and accelerators.',
        'Use each device for suitable work.',
        'MPI scales across nodes; threads scale within nodes.',
        'Locality reduces unnecessary movement.',
      ]}
      visual={<HybridCluster3 />}
    />
  ),
  notes: n('Specialization plus locality. Not “more APIs for their own sake”.'),
})

add({
  section: 'Hybrid',
  title: 'Hybrid programming challenges',
  content: (
    <Split
      section="Hybrid"
      title="Complex hardware creates complex measurement"
      points={[
        'Multiple programming models must work together.',
        'Data placement becomes harder.',
        'CPU–GPU load balance is nontrivial.',
        'Debugging crosses process, thread and device boundaries.',
        'Performance tuning needs careful measurement.',
      ]}
      visual={(
        <RuntimeParts
          parts={[
            ['CPU work', 22, '#16a34a'],
            ['GPU work', 30, '#0d9488'],
            ['Transfers', 18, '#f59e0b'],
            ['MPI wait', 16, '#e11d48'],
            ['Tuning/debug', 14, '#ea580c'],
          ]}
        />
      )}
    />
  ),
  notes: n('A fast kernel can still wait on MPI or on a host copy.'),
})

/* ========================================================================
   METRICS
   ======================================================================== */
add({
  section: 'Metrics',
  title: 'Performance Engineering',
  composition: 'hero',
  content: <Divider section="Metrics" tone="met" number="04" title="Performance Engineering" subtitle="Measure first. Optimize second." visual={<RuntimeClocks />} />,
  notes: n('From here the module is an investigation, not a hardware tour.'),
})

add({
  section: 'Metrics',
  title: 'Why metrics are needed',
  content: (
    <Split
      section="Metrics"
      title="More hardware can be slower"
      points={[
        'Parallel programs can be slower than serial programs.',
        'Adding cores may increase overhead.',
        'Different machines require fair comparison.',
        'Optimization needs evidence.',
        'Speedup and efficiency summarize useful behaviour.',
      ]}
      visual={<SpeedupCurve mode="sublinear" />}
    />
  ),
  notes: n('Eight cores producing 6.67× is the running evidence, not a disappointment slide.'),
})

add({
  section: 'Metrics',
  title: 'Serial versus parallel processing',
  content: (
    <Full
      section="Metrics"
      title="One processor in sequence. Multiple processors at once."
      lead="Serial processing completes one task at a time. Parallel processing completes multiple tasks on different processors."
      visual={<SerialVsParallel />}
    />
  ),
  notes: n('New PPT serial/parallel slides. Keep both the communication analogy and the processor-count difference.'),
})

add({
  section: 'Metrics',
  title: 'Tserial and Tparallel',
  content: (
    <Split
      section="Metrics"
      title="Two clocks, then every later formula"
      formula="Tserial · Tparallel(p)"
      points={[
        'Tserial: time taken by the best sequential version.',
        'Tparallel(p): time taken using p processing elements.',
        'Same problem: same input size and equivalent output.',
      ]}
      takeaway="Bad baselines produce bad speedups."
      visual={<RuntimeClocks />}
    />
  ),
  notes: n('Write both definitions on the board before dividing them.'),
})

add({
  section: 'Metrics',
  title: 'What is speedup?',
  content: (
    <Split
      section="Metrics"
      title="Relative performance of two systems on the same problem"
      formula="Speedup = single-processor time / N-processor time"
      points={[
        'In computer architecture, speedup measures relative performance of two systems processing the same problem.',
        'If one processor finishes a task in one unit of time, how long do N processors take?',
      ]}
      visual={<SpeedupT1T2 />}
    />
  ),
  notes: n('New PPT definition plus T1=1s, T2=0.5s, speedup=2.'),
})

add({
  section: 'Metrics',
  title: 'Speedup in MIMD systems',
  content: (
    <Split
      section="Metrics"
      title="How many times faster?"
      formula="S(p) = Tserial / Tparallel(p)"
      points={[
        'Ideal speedup is p on p processors.',
        'Superlinear speedup is rare and needs explanation.',
        'Low speedup means overhead or limited parallelism.',
      ]}
      visual={<SpeedupRace />}
    />
  ),
  notes: n('Do not leave this as formula text. Show 80 / 12.'),
})

add({
  section: 'Metrics',
  title: 'Speedup example — 80 / 12',
  content: (
    <Full
      section="Metrics"
      title="Problem → formula → substitution → answer"
      lead="Tserial = 80 s. Tparallel(8) = 12 s. S(8) = 80/12 = 6.67×. Sublinear, not ideal 8×."
      visual={<SpeedupRace />}
    />
  ),
  notes: n('Interpretation: 6.67 effective lanes; 1.33 lane-equivalents lost.'),
})

add({
  section: 'Metrics',
  title: 'Ideal speedup example — T₁ = 1 s',
  content: (
    <Full
      section="Metrics"
      title="Old time over new time"
      lead="N=1, T₁=1 s. N=2, T₂=0.5 s (ideal). Speedup = 1/0.5 = 2. Also t / (t/2) = 2."
      visual={<SpeedupT1T2 />}
    />
  ),
  notes: n('This numerical is on the new PPT. Do not keep only 80/12.'),
})

add({
  section: 'Metrics',
  title: 'Ideal speedup curve',
  content: (
    <Full
      section="Metrics"
      title="S(p) = p is the straight line. Reality bends below it."
      visual={<SpeedupCurve mode="sublinear" />}
    />
  ),
  notes: n('Processors on x, speedup on y. Ideal then measured.'),
})

add({
  section: 'Metrics',
  title: 'Efficiency',
  content: (
    <Split
      section="Metrics"
      title="How much of the processing capacity is actually used?"
      formula="E(p) = S(p) / p"
      points={[
        'Also E(p) = Tserial / [p × Tparallel(p)].',
        'Ideal efficiency is 1, or 100%.',
        'Efficiency usually decreases as p increases.',
        'Low efficiency signals overhead or imbalance.',
      ]}
      visual={<EfficiencyLanes />}
    />
  ),
  notes: n('Show both formula forms from the source.'),
})

add({
  section: 'Metrics',
  title: 'Efficiency example',
  content: (
    <Full
      section="Metrics"
      title="S(8) = 6.67  →  E(8) = 6.67/8 = 0.834 = 83.4%"
      lead="About 83.4% of eight-core capacity is useful. The remaining capacity is overhead and idle time."
      visual={<EfficiencyLanes />}
    />
  ),
  notes: n('Do not make this a percentage card. Show eight lanes with pale unused tops.'),
})

add({
  section: 'Metrics',
  title: 'Ideal, sublinear and superlinear',
  content: (
    <Split
      section="Metrics"
      title="Most real curves bend below the ideal line"
      points={[
        'Ideal: S(p)=p; every added processor gives full benefit.',
        'Sublinear: overhead and serial work reduce gain — the usual case.',
        'Superlinear: rare; often cache effects or better memory behaviour.',
      ]}
      visual={<SpeedupCurve mode="sublinear" />}
    />
  ),
  notes: n('6.67 on 8 cores is sublinear. Name it.'),
})

add({
  section: 'Metrics',
  title: 'Parallel overhead',
  content: (
    <Full
      section="Metrics"
      title="Total parallel time = useful work + extra costs"
      lead="Communication, synchronization, startup, waiting, contention."
      visual={(
        <RuntimeParts
          parts={[
            ['Useful computation', 52, '#16a34a'],
            ['Communication', 14, '#f59e0b'],
            ['Synchronization', 10, '#ea580c'],
            ['Startup', 8, '#0891b2'],
            ['Waiting', 10, '#e11d48'],
            ['Contention', 6, '#7c3aed'],
          ]}
        />
      )}
    />
  ),
  notes: n('Source categories: communication, synchronization, idle time, startup, contention.'),
})

add({
  section: 'Metrics',
  title: 'Load balance',
  content: (
    <Split
      section="Metrics"
      title="Equal work keeps workers finishing together"
      points={[
        'Load balance: processing elements receive roughly equal useful work.',
        'Balanced: similar finish times.',
        'Unbalanced: one worker overloaded while others idle.',
        'Granularity and scheduling affect utilization.',
      ]}
      visual={<LoadBalance balanced={false} />}
    />
  ),
  notes: n('Show idle workers. Efficiency falls when everyone waits for the slowest.'),
})

add({
  section: 'Metrics',
  title: 'Load balance — the healthy picture',
  content: (
    <Full
      section="Metrics"
      title="All four finish together"
      visual={<LoadBalance balanced />}
    />
  ),
  notes: n('Contrast with the previous slide. Same workers, different heights.'),
})

add({
  section: 'Metrics',
  title: 'What to report',
  content: (
    <Full
      section="Metrics"
      title="p · T(p) · S(p) · E(p)"
      lead="For p=8: T=12.0 s, S=6.67, E=83.4%."
      visual={<PerfTable highlight={8} />}
    />
  ),
  notes: n('Animate the p=8 row. Large type. No 14px tables.'),
})

/* ========================================================================
   AMDAHL
   ======================================================================== */
add({
  section: 'Amdahl',
  title: "Amdahl’s Law",
  composition: 'hero',
  content: <Divider section="Amdahl" tone="amd" number="05" title="Amdahl’s Law" subtitle="The serial fraction sets the ceiling." visual={<AmdahlTimeline p={8} />} />,
  notes: n('See the limit before the equation.'),
})

add({
  section: 'Amdahl',
  title: 'The Hasham story',
  content: (
    <Full
      section="Amdahl"
      title="Faster cars still wait at the door"
      lead="Arham by car, Jalal by bus, Hasham on foot. The invitation does not start until all three arrive."
      visual={<HashamStory />}
    />
  ),
  notes: n('This analogy is on the new PPT. Hasham is the serial fraction.'),
})

add({
  section: 'Amdahl',
  title: 'The core idea',
  content: (
    <Full
      section="Amdahl"
      title="Only the parallel part shrinks"
      lead="10% serial stays. 90% parallel is split across processors. The serial bar does not move."
      visual={<AmdahlTimeline p={8} />}
    />
  ),
  notes: n('Hold this picture. Then reveal the formula.'),
})

add({
  section: 'Amdahl',
  title: 'Gene Amdahl, 1960',
  content: (
    <Split
      section="Amdahl"
      title="What the law is for"
      points={[
        'The law was developed by Gene Amdahl in 1960.',
        'It predicts the theoretical speedup of a multiprocessor system.',
        'It relates system improvement to the parts that did not improve — like Hasham.',
        'Purpose: how speedup, performance and execution time behave as processors are added.',
      ]}
      visual={<AmdahlFamily />}
    />
  ),
  notes: n('Keep 1960 and the purpose bullets from the new PPT.'),
})

add({
  section: 'Amdahl',
  title: "Amdahl’s formula",
  content: (
    <Split
      section="Amdahl"
      title="Fractions, not percentages, inside the formula"
      formula="S(p) = 1 / [s + (1 − s)/p]"
      points={[
        's = serial fraction.',
        '1 − s = parallel fraction.',
        'p = processing elements.',
      ]}
      visual={<AmdahlTimeline p={8} />}
    />
  ),
  notes: n('Write s, 1−s and p as three labelled terms.'),
})

add({
  section: 'Amdahl',
  title: 'Equivalent form with P and N',
  content: (
    <Split
      section="Amdahl"
      title="The new PPT derivation"
      formula="Speedup(P,N) = 1 / [(1 − P) + P/N]"
      points={[
        'P is the parallel proportion. (1 − P) cannot be parallelized.',
        'For N = 1: T = S + P.',
        'For N processors: T_N = (1 − P) + P/N.',
        'As N tends to infinity, maximum speedup tends to 1/(1 − P).',
      ]}
      visual={<AmdahlNumeric title="Derivation" lines={['T₁ = S + P', 'T_N = (1 − P) + P/N', 'S(N) = T₁ / T_N']} />}
    />
  ),
  notes: n('Keep both s-form and P-form. They are the same law.'),
})

add({
  section: 'Amdahl',
  title: 'Amdahl example — s = 0.10, p = 8',
  content: (
    <Full
      section="Amdahl"
      title="Ideal 8× versus Amdahl 4.71×"
      lead="S(8) = 1 / [0.10 + 0.90/8] = 1 / 0.2125 ≈ 4.71"
      visual={<AmdahlNumeric title="s = 0.10 · p = 8" lines={['S(8) = 1 / (0.10 + 0.90/8)', '= 1 / 0.2125', '≈ 4.71×  ·  not 8×']} />}
    />
  ),
  notes: n('VTU numerical. Interpretation: serial fraction alone prevents ideal 8×.'),
})

add({
  section: 'Amdahl',
  title: 'Amdahl example — 40% serial, N = 10',
  content: (
    <Full
      section="Amdahl"
      title="How much speed do we get in reality?"
      lead="N=10, serial=40%, parallel P=60%. Speedup = 1 / (0.40 + 0.60/10) = 1/0.46 ≈ 2.17"
      visual={<AmdahlNumeric title="N = 10 · serial 40% · P = 60%" lines={['Speedup = 1 / [(1 − 0.60) + 0.60/10]', '= 1 / 0.46', '≈ 2.17  (only about double)']} />}
    />
  ),
  notes: n('This numerical is on the new PPT. Do not omit it.'),
})

add({
  section: 'Amdahl',
  title: 'Maximum speedup',
  content: (
    <Full
      section="Amdahl"
      title="Smax = 1 / s"
      visual={<SmaxCeiling />}
    />
  ),
  notes: n('10% → 10×, 5% → 20×, 1% → 100×. Reducing serial fraction can beat buying processors.'),
})

add({
  section: 'Amdahl',
  title: 'Diminishing returns',
  content: (
    <Full
      section="Amdahl"
      title="1, 2, 4, 8, 16, 32, 64 — then the curve flattens"
      visual={<DiminishingReturns />}
    />
  ),
  notes: n('Not a tiny graph. Early processors help most.'),
})

add({
  section: 'Amdahl',
  title: 'Amdahl family of curves',
  content: (
    <Full
      section="Amdahl"
      title="Higher parallel portion, higher ceiling — still not the ideal line"
      visual={<AmdahlFamily />}
    />
  ),
  notes: n('New PPT graph: parallel portion 50% / 90% / 95% versus ideal.'),
})

add({
  section: 'Amdahl',
  title: "Amdahl’s law — common errors",
  content: (
    <Split
      section="Amdahl"
      title="Exam traps from the source"
      points={[
        'Using percent instead of fraction (10 instead of 0.10).',
        'Ignoring parallel overheads and communication.',
        'Assuming speedup grows forever / ideal linear scaling.',
        'Using different problem sizes for one speedup calculation.',
        'Comparing against a weak sequential implementation.',
        'Mixing strong and weak scaling interpretation.',
      ]}
      visual={<AmdahlNumeric title="s is a fraction" lines={['10% serial  →  s = 0.10', 'not s = 10']} />}
    />
  ),
  notes: n('Recover every source-supported mistake.'),
})

/* ========================================================================
   SCALING
   ======================================================================== */
add({
  section: 'Scaling',
  title: 'Scalability',
  composition: 'hero',
  content: <Divider section="Scaling" tone="sca" number="06" title="Scalability" subtitle="What happens when we keep adding processors?" visual={<StrongVsWeak />} />,
  notes: n('Name the question before the two experiments.'),
})

add({
  section: 'Scaling',
  title: 'What is scalability?',
  content: (
    <Split
      section="Scaling"
      title="Useful performance as the machine and the problem grow"
      points={[
        'Scalability is the ability of a parallel program or system to maintain useful performance as processors and problem size increase.',
      ]}
      visual={<IsoefficiencyFlow />}
    />
  ),
  notes: n('One sentence definition. Then the two experiments.'),
})

add({
  section: 'Scaling',
  title: 'Strong versus weak — side by side',
  content: (
    <Full
      section="Scaling"
      title="Same pie sliced smaller, versus more pies"
      visual={<StrongVsWeak />}
    />
  ),
  notes: n('Do not use only a comparison table.'),
})

add({
  section: 'Scaling',
  title: 'Strong scaling',
  content: (
    <Split
      section="Scaling"
      title="Fixed problem size. Goal: lower runtime."
      points={[
        'Increase processor count.',
        'The same workload is divided increasingly.',
        'Efficiency often drops because overhead grows.',
      ]}
      visual={<StrongSplit pieces={4} />}
    />
  ),
  notes: n('Keep one persistent workload visual.'),
})

add({
  section: 'Scaling',
  title: 'Strong scaling workflow',
  content: (
    <Split
      section="Scaling"
      title="How to test it"
      points={[
        'Fix input size.',
        'Run p = 1, 2, 4, 8.',
        'Measure times.',
        'Compute S and E.',
        'Find the useful limit.',
      ]}
      visual={<StrongSplit pieces={8} />}
    />
  ),
  notes: n('Same forecast, faster — until it is not.'),
})

add({
  section: 'Scaling',
  title: 'Weak scaling',
  content: (
    <Split
      section="Scaling"
      title="Problem size grows with processors. Goal: stable runtime."
      points={[
        'Work per processor stays approximately constant.',
        'Tests larger workload capacity.',
      ]}
      visual={<WeakGrow pies={4} />}
      reverse
    />
  ),
  notes: n('Larger forecast in similar time.'),
})

add({
  section: 'Scaling',
  title: 'Weak scaling workflow',
  content: (
    <Split
      section="Scaling"
      title="Grow machine and problem together"
      points={[
        'Choose work per processor.',
        'Grow p and problem size together.',
        'Measure runtime.',
        'Check efficiency.',
        'Judge scalability.',
      ]}
      visual={<WeakGrow pies={8} />}
    />
  ),
  notes: n('If overhead grows too fast, runtime will not stay stable.'),
})

add({
  section: 'Scaling',
  title: 'Isoefficiency intuition',
  content: (
    <Full
      section="Scaling"
      title="Keep efficiency approximately constant"
      lead="As processor count rises, overhead rises, so problem size must rise."
      visual={<IsoefficiencyFlow />}
    />
  ),
  notes: n('Conceptual only. No extra equations beyond the source.'),
})

/* ========================================================================
   TIMING
   ======================================================================== */
add({
  section: 'Timing',
  title: 'Reliable Timing',
  composition: 'hero',
  content: <Divider section="Timing" tone="tim" number="07" title="Reliable Timing" subtitle="A performance claim is only as good as its measurement." visual={<WrongTimer />} />,
  notes: n('Show the wrong measurement first.'),
})

add({
  section: 'Timing',
  title: 'A wrong measurement',
  content: (
    <Full
      section="Timing"
      title="Timer includes unrelated I/O. No synchronization."
      visual={<WrongTimer />}
    />
  ),
  notes: n('Students remember the mess more than a perfect checklist.'),
})

add({
  section: 'Timing',
  title: 'Timing workflow',
  content: (
    <Full
      section="Timing"
      title="Prepare → warm-up → sync → start → work → sync → stop → repeat"
      visual={<TimingPipeline />}
    />
  ),
  notes: n('Source-supported steps only. Report a statistic, not one lucky run.'),
})

add({
  section: 'Timing',
  title: 'Wall-clock time',
  content: (
    <Split
      section="Timing"
      title="Elapsed time of the whole timed region"
      points={[
        'Use wall-clock time for parallel runtime.',
        'Synchronize workers before starting the timed region.',
        'Synchronize before stopping the timer.',
        'Run multiple trials and report a representative value.',
        'Avoid unrelated I/O unless it is part of the workload.',
      ]}
      visual={<WallClockTools />}
    />
  ),
  notes: n('MPI_Wtime, omp_get_wtime and CUDA events are named at module level only. Do not turn this into Module 3/4/5 implementation.'),
})

add({
  section: 'Timing',
  title: 'Timing table',
  content: (
    <Full
      section="Timing"
      title="One row calculation students can defend"
      visual={<PerfTable highlight={8} />}
    />
  ),
  notes: n('p, T(p), S(p), E(p). Highlight p=8.'),
})

add({
  section: 'Timing',
  title: 'Timing pitfalls',
  content: (
    <Split
      section="Timing"
      title="Bad benchmarks make bad decisions look good"
      points={[
        'Measuring only one lucky run.',
        'Including print statements inside the timed loop.',
        'Changing input size unintentionally.',
        'Ignoring data-transfer time in GPU tests.',
        'Using debug builds or background-heavy machines.',
        'Asynchronous GPU timing that stops before the kernel finishes.',
      ]}
      visual={<WrongTimer />}
    />
  ),
  notes: n('Recover every source pitfall. Kernel-only GPU timing is the classic trap.'),
})

/* ========================================================================
   GPU PERF
   ======================================================================== */
add({
  section: 'GPU Perf',
  title: 'GPU Performance',
  composition: 'hero',
  content: <Divider section="GPU Perf" tone="gpf" number="08" title="GPU Performance" subtitle="Kernel time is only one part of the timeline." visual={<GpuTotalTime />} />,
  notes: n('Do not measure GPU only by kernel runtime.'),
})

add({
  section: 'GPU Perf',
  title: 'Total GPU time',
  content: (
    <Full
      section="GPU Perf"
      title="HOST → DEVICE + KERNEL + DEVICE → HOST"
      visual={<GpuTotalTime />}
    />
  ),
  notes: n('Honest GPU timing includes every transfer.'),
})

add({
  section: 'GPU Perf',
  title: 'Honest GPU speedup',
  content: (
    <Full
      section="GPU Perf"
      title="CPU = 2.4 s. GPU total = 0.30 s. Speedup = 8×."
      lead="The 0.30 s includes transfer. Kernel-only timing would exaggerate the claim."
      visual={<GpuSpeedup8x />}
    />
  ),
  notes: n('Source numerical. State that transfer is included.'),
})

add({
  section: 'GPU Perf',
  title: 'Arithmetic intensity',
  content: (
    <Split
      section="GPU Perf"
      title="Computation per byte moved"
      points={[
        'Arithmetic intensity is the amount of computation performed per byte of data moved.',
        'Higher intensity usually helps GPU performance.',
        'Vector addition: few FLOPs per byte — often memory-bound.',
        'Matrix multiplication: data reuse — more likely compute-bound.',
      ]}
      visual={<ArithmeticIntensity />}
    />
  ),
  notes: n('Source definition plus the two examples.'),
})

add({
  section: 'GPU Perf',
  title: 'Occupancy',
  content: (
    <Split
      section="GPU Perf"
      title="How full are the execution resources?"
      points={[
        'Occupancy: how well the GPU keeps execution resources filled with active warps.',
        'Low occupancy: many unused lanes.',
        'Higher occupancy: more active work, better latency hiding.',
        '100% occupancy does not automatically mean maximum performance.',
      ]}
      visual={<OccupancyLanes filled={10} total={16} />}
    />
  ),
  notes: n('Do not imply 100% occupancy is always peak.'),
})

add({
  section: 'GPU Perf',
  title: 'Warp divergence',
  content: (
    <Full
      section="GPU Perf"
      title="Half take IF. Half take ELSE. The warp pays for both."
      visual={<WarpDiverge />}
    />
  ),
  notes: n('Timeline, not a slogan. Warp time ≈ THEN + ELSE.'),
})

add({
  section: 'GPU Perf',
  title: 'Memory access pattern',
  content: (
    <Full
      section="GPU Perf"
      title="Regular / coalesced versus scattered"
      visual={<CoalesceVsScatter />}
    />
  ),
  notes: n('Keep terminology aligned with the source: regular versus poor locality / scattered.'),
})

add({
  section: 'GPU Perf',
  title: 'CPU versus GPU versus hybrid',
  content: (
    <Full
      section="GPU Perf"
      title="Choose by workload behaviour and measurement"
      lead="CPU: control-heavy / serial / irregular. GPU: massive data parallelism. Hybrid: combining system strengths."
      visual={<ThreeWayChoice />}
    />
  ),
  notes: n('Source-supported wording only. The best system is measured.'),
})

/* ========================================================================
   SUMMARY
   ======================================================================== */
add({
  section: 'Summary',
  title: 'Module 2 in one picture',
  composition: 'hero',
  content: (
    <Full
      section="Summary"
      title="MIMD → GPU → hybrid → measure → interpret"
      visual={<OnePicture />}
    />
  ),
  notes: n('Close the story as one investigation.'),
})

add({
  section: 'Summary',
  title: 'Performance engineering checklist',
  content: (
    <Split
      section="Summary"
      title="Before you claim a speedup"
      points={[
        'Choose the hardware level: MIMD, GPU or hybrid.',
        'Measure Tserial and Tparallel(p) on the same input.',
        'Compute speedup and efficiency.',
        'Name the overhead: communication, sync, idle, transfer.',
        'Apply Amdahl to the serial fraction.',
        'Say whether the test is strong or weak scaling.',
        'Report honest timing — including GPU copies.',
      ]}
      visual={<TimingPipeline />}
    />
  ),
  notes: n('This is the method, not a slogan list.'),
})

add({
  section: 'Summary',
  title: 'Key formulas',
  content: (
    <Full
      section="Summary"
      title="Write these, then interpret them"
      visual={<KeyFormulas />}
    />
  ),
  notes: n('S(p), E(p), Amdahl, Smax. Four lines students must own.'),
})

add({
  section: 'Summary',
  title: 'Common exam confusions',
  content: (
    <Split
      section="Summary"
      title="Where marks are lost"
      points={[
        's = 10 instead of s = 0.10.',
        'Ideal linear scaling with a serial fraction still present.',
        'Speedup without a sequential baseline.',
        'Efficiency forgotten after computing S(p).',
        'GPU kernel time reported as total GPU time.',
        'Strong scaling judged with a growing problem, or the reverse.',
        '“GPU is always faster.”',
      ]}
      visual={<AmdahlNumeric title="Confusion → correction" lines={['percent ≠ fraction', 'kernel ≠ total GPU time', 'strong ≠ weak']} />}
    />
  ),
  notes: n('Fire these quickly. Demand the correction, not an essay.'),
})

add({
  section: 'Summary',
  title: '20 viva questions',
  content: (
    <Split
      section="Summary"
      title="Rapid oral revision"
      points={[
        'What is MIMD? Why MIMD systems? Shared-memory MIMD? Distributed-memory MIMD?',
        'What is a GPU? Why GPU programming? What is a kernel? Blocks and grids?',
        'What is hybrid programming? MPI + OpenMP meaning?',
        'Define speedup. Define efficiency. Ideal speedup? Overhead? Load balance?',
        "State Amdahl’s law. What is serial fraction? Strong vs weak scaling?",
        'How to time MIMD programs? What affects GPU performance?',
      ]}
      visual={<OnePicture />}
    />
  ),
  notes: n('Twenty source viva prompts. Keyword answers, not essays.'),
})

add({
  section: 'Summary',
  title: '10 two-mark questions',
  content: (
    <Split
      section="Summary"
      title="Short answers"
      points={[
        'Define MIMD. Define GPU. What is a kernel? Define hybrid system.',
        'Define speedup. Define efficiency. State Amdahl’s law.',
        'What is scalability? What is strong scaling? What is weak scaling?',
      ]}
      visual={<KeyFormulas />}
    />
  ),
  notes: n('Two to four lines plus one keyword.'),
})

add({
  section: 'Summary',
  title: '10 five-mark questions',
  content: (
    <Split
      section="Summary"
      title="Medium answers"
      points={[
        'Explain MIMD systems. Explain the GPU programming model. Explain hybrid systems.',
        'Explain speedup and efficiency with examples. Explain Amdahl’s law with example.',
        'Explain strong and weak scaling. Explain taking timings of MIMD programs.',
        'Explain GPU performance factors. Explain parallel overhead and load balance.',
        'Compare CPU and GPU performance behaviour.',
      ]}
      visual={<ThreeWayChoice />}
    />
  ),
  notes: n('Diagram plus steps plus one limitation.'),
})

add({
  section: 'Summary',
  title: '10 ten-mark questions',
  content: (
    <Split
      section="Summary"
      title="Long-answer structure"
      points={[
        'Explain MIMD systems, GPUs and programming hybrid systems.',
        'Explain speedup, efficiency and overhead in MIMD systems with examples.',
        'Explain Amdahl’s law, maximum speedup and common mistakes.',
        'Explain scalability including strong and weak scaling.',
        'Explain timing of MIMD programs and GPU performance factors.',
        'Previous VTU Q1–Q5 placeholders: fill from the past paper in class.',
      ]}
      visual={<OpeningInvestigation />}
    />
  ),
  notes: n('Ten marks need a figure and a numerical.'),
})

add({
  section: 'Summary',
  title: 'One-page revision sheet',
  content: (
    <Split
      section="Summary"
      title="Must-remember keywords"
      points={[
        'MIMD; shared memory; distributed memory; GPU; host; device; kernel; thread; block; grid.',
        'Hybrid; MPI; OpenMP; CUDA; OpenCL; HIP; PGAS.',
        'Speedup; efficiency; ideal speedup; overhead; load balance.',
        "Amdahl’s law; serial fraction; Smax; strong scaling; weak scaling; isoefficiency.",
        'Wall-clock time; GPU transfer time; arithmetic intensity; occupancy; divergence.',
      ]}
      visual={<KeyFormulas />}
    />
  ),
  notes: n('Memory path: hardware → Tserial/Tparallel → S and E → Amdahl → scaling → honest timing.'),
})

add({
  section: 'Summary',
  title: 'Study resources',
  content: (
    <Shell section="Summary">
      <Head title="Continue after the lecture" lead="Notes and PYQ architecture are unchanged." />
      <div className="pe-resource">
        <Link to="/parallel-computing/module-2/notes">
          <BookOpen size={28} strokeWidth={1.8} />
          <strong>Module Notes</strong>
          <span>Open the Module 2 notes companion.</span>
        </Link>
        <Link to="/parallel-computing/module-2/previous-year-questions">
          <FileQuestion size={28} strokeWidth={1.8} />
          <strong>Previous Year Questions</strong>
          <span>Viva, 2 marks, 5 marks and 10 marks.</span>
        </Link>
      </div>
    </Shell>
  ),
  notes: n('Do not change Notes/PYQ routing. This slide only links to it.'),
})

export const parallelComputingModule2Slides = raw.map((item, index) => slide({
  id: `pc-pe-${String(index + 1).padStart(2, '0')}`,
  title: item.title,
  subtitle: item.subtitle,
  content: item.content,
  notes: item.notes,
  composition: item.composition || 'teaching',
}))
