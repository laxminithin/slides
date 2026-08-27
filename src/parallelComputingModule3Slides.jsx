import './parallelComputing.css'
import './pcComposition.css'
import './mpiScenes.css'
import {
  OpeningCluster,
  SharedVsDistributed,
  DemandStats,
  SpmdLaunch,
  LifecycleScene,
  MessagePacket,
  MatchingScene,
  BlockingTimelines,
  TrapezoidCurve,
  IntegralShade,
  XSquaredPlot,
  SerialSweep,
  InitBootstrap,
  RecvCloseup,
  FlattenMemory,
  CommitHandle,
  TrapPartition,
  ReduceTree,
  BcastScene,
  ScatterScene,
  MatrixColumn,
  DatatypeLife,
  PerfTimeline,
  SortLanes,
} from './components/MpiScenes'
import {
  JourneyBeads,
  ModuleMap,
  SpatialSystem,
  ServiceNet,
  StrengthOrbit,
  TradeoffMesh,
  ProcessCloseup,
  RankCloseup,
  SizeCensus,
  CommRing,
  PacketAnatomy,
  MatchingGate,
  DeadlockFreeze,
  SafeDiagonal,
  ModuloCells,
  SumLanes,
  IntervalAsync,
  FloatCollect,
  Reduce15,
  AllReduceWave,
  ScatterFall,
  GatherPuzzle,
  CollectiveAtlas,
  BarrierGate,
  BuiltinCells,
  TypeCycle,
  VectorOverlay,
  WtimeStrip,
  LoadLanes,
  TinyLatency,
  TimingTable,
  UnsortedTiles,
  OddZoom,
  CompareMerge,
  SortPerfBars,
  TokenPass,
  TerminalWall,
  AnnotatedProgram,
  SynthesisWorld,
  SpeedupMeters,
  Scale1000,
  SerialVsParallelTrap,
  BcastFour,
  PackingBeforeAfter,
  SpmdFork,
  EvenLanes,
  LocalReorder,
  LocalAnnotate,
  RootIO,
  Reduce20,
  SnapSort,
  CollectiveStar,
  InputBroadcast,
  GroupCall,
  ClusterScale,
  ConvergeIO,
  KeywordRibbon,
  ExamShortcuts,
  ExamViva,
  ExamTwo,
  ExamFive,
  ExamTen,
} from './components/MpiWorld'

const roadmap = [
  'Opening',
  'MPI Basics',
  'Point-to-Point',
  'Trapezoidal Rule',
  'MPI I/O',
  'Collectives',
  'Datatypes',
  'Performance',
  'Sorting',
  'Summary',
]

const SRC = 'Source: Parallel_Computing_MPI_PPT.pptx (New PPT) plus VTU BCS702 Module 3 MPI syllabus coverage.'

function slide({ id, title, subtitle, content, notes, hideTitle = true, composition = 'teaching' }) {
  return {
    id,
    kicker: 'VTU BCS702 | Module 3',
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
    <nav className="pc-m3-roadmap" aria-label="Module 3 roadmap">
      {roadmap.map((item) => <span key={item} className={item === section ? 'active' : ''}>{item}</span>)}
    </nav>
  )
}

function Shell({ section, children }) {
  return (
    <div className="pc-m3-slide">
      <Roadmap section={section} />
      <div className="mpi-stage-wrap">{children}</div>
    </div>
  )
}

function Head({ kicker, title, lead }) {
  return (
    <header className="mpi-head">
      {kicker && <span className="mpi-kicker">{kicker}</span>}
      <h2>{title}</h2>
      {lead && <p className="mpi-lead">{lead}</p>}
    </header>
  )
}

function Points({ items }) {
  return (
    <ul className="mpi-points">
      {items.map((item) => <li key={item}>{item}</li>)}
    </ul>
  )
}

function Code({ children }) {
  return <pre className="mpi-code"><code>{children}</code></pre>
}

function Full({ section, kicker, title, lead, visual }) {
  return (
    <Shell section={section}>
      <Head kicker={kicker} title={title} lead={lead} />
      <div className="mpi-full mpi-visual">{visual}</div>
    </Shell>
  )
}

function Split({ section, kicker, title, lead, points, code, formula, question, takeaway, visual, reverse = false, extra = '' }) {
  return (
    <Shell section={section}>
      <Head kicker={kicker} title={title} lead={lead} />
      <div className={`mpi-split ${reverse ? 'reverse' : ''} ${extra}`.trim()}>
        <section className="mpi-copy">
          {question && <p className="mpi-q">{question}</p>}
          {formula && <p className="mpi-formula">{formula}</p>}
          {code && <Code>{code}</Code>}
          {points && <Points items={points} />}
          {takeaway && <p className="mpi-take">{takeaway}</p>}
        </section>
        <section className="mpi-visual">{visual}</section>
      </div>
    </Shell>
  )
}

function CodeLive({ section, kicker, title, lead, code, points, takeaway, visual, reverse = false }) {
  return (
    <Shell section={section}>
      <Head kicker={kicker} title={title} lead={lead} />
      <div className={`mpi-code-live ${reverse ? 'reverse' : ''}`}>
        <section className="mpi-copy">
          {code && <Code>{code}</Code>}
          {points && <Points items={points} />}
          {takeaway && <p className="mpi-take">{takeaway}</p>}
        </section>
        <section className="mpi-visual">{visual}</section>
      </div>
    </Shell>
  )
}

function CodeTop({ section, kicker, title, lead, code, visual, takeaway }) {
  return (
    <Shell section={section}>
      <Head kicker={kicker} title={title} lead={lead} />
      <div className="mpi-code-top">
        {code && <Code>{code}</Code>}
        <section className="mpi-visual">{visual}</section>
        {takeaway && <p className="mpi-take">{takeaway}</p>}
      </div>
    </Shell>
  )
}

function CodeHero({ section, kicker, title, lead, code, points, visual }) {
  return (
    <Shell section={section}>
      <Head kicker={kicker} title={title} lead={lead} />
      <div className="mpi-code-hero">
        <section className="mpi-copy">{code && <Code>{code}</Code>}{points && <Points items={points} />}</section>
        <section className="mpi-visual">{visual}</section>
      </div>
    </Shell>
  )
}

function CodeTime({ section, kicker, title, lead, visual, code, points }) {
  return (
    <Shell section={section}>
      <Head kicker={kicker} title={title} lead={lead} />
      <div className="mpi-code-time">
        <section className="mpi-visual">{visual}</section>
        <section className="mpi-copy">
          {code && <Code>{code}</Code>}
          {points && <Points items={points} />}
        </section>
      </div>
    </Shell>
  )
}

function Divider({ section, tone, number, title, subtitle, visual, layout = 'split' }) {
  return (
    <Shell section={section}>
      <div className={`mpi-divider mpi-div-${tone} mpi-div-layout-${layout}`}>
        <div className="mpi-divider-copy">
          <span>{number}</span>
          <h2>{title}</h2>
          <p>{subtitle}</p>
        </div>
        <div className="mpi-visual">{visual}</div>
      </div>
    </Shell>
  )
}

const n = (topic) => `What to say: ${topic} Teach with Rank 0–3: who owns the data, who sends, who receives, which communicator, which tag, where the result lives. ${SRC}`

const raw = []

function add(item) {
  raw.push(item)
}

add({
  section: 'Opening',
  title: 'Distributed Memory Programming with MPI',
  composition: 'hero',
  content: (
    <Shell section="Opening">
      <Head kicker="Parallel Computing  ·  Module 3" title="Distributed Memory Programming with MPI" lead="Private memories. Explicit messages. One parallel solution." />
      <div className="mpi-full"><OpeningCluster /></div>
    </Shell>
  ),
  notes: n('Open on four private memories. Rank 0 cannot read Rank 3. MPI is the conversation layer.'),
})

add({
  section: 'Opening',
  title: 'Learning objectives',
  content: (
    <Split
      section="Opening"
      title="Learning objectives"
      lead="Use the syllabus as the checklist, not as a rumour."
      points={[
        'Understand distributed-memory programming with MPI.',
        'Explain the trapezoidal rule using MPI.',
        'Understand MPI I/O and collective communication.',
        'Evaluate MPI program performance.',
        'Understand parallel sorting algorithms.',
        'Explain MPI-derived datatypes.',
      ]}
      visual={<JourneyBeads />}
      extra="wide-copy"
    />
  ),
  notes: n('This module connects directly to MPI lab experiments.'),
})

add({
  section: 'Opening',
  title: 'Module 3 map',
  content: (
    <Split
      section="Opening"
      title="Module 3"
      lead="Distributed memory programming with MPI"
      points={[
        'MPI functions.',
        'The trapezoidal rule in MPI.',
        'Dealing with I/O.',
        'Collective communication.',
        'Performance evaluation of MPI programs.',
        'A parallel sorting algorithm.',
        'MPI-derived datatypes.',
      ]}
      visual={<ModuleMap />}
    />
  ),
  notes: n('The journey is processes, messages, a numerical split, collectives, types, time, then sorting.'),
})

add({
  section: 'Opening',
  title: 'Distributed memory programming — definition',
  content: (
    <Split
      section="Opening"
      title="Definition"
      lead="Keep both sentences. They are exam gold."
      points={[
        'Distributed memory programming with MPI divides a computation among multiple processes, where each process has its own memory, and processes communicate by explicitly sending and receiving messages.',
        'Processors cannot directly access another processor’s memory.',
        'They communicate by sending and receiving messages.',
      ]}
      visual={<SpatialSystem />}
    />
  ),
  notes: n('Emphasize private memory. Shared-memory thinking is the most common student error.'),
})

add({
  section: 'Opening',
  title: 'Why a single system is not enough',
  content: (
    <Full
      section="Opening"
      title="Why?"
      lead="Demand outgrows one machine. Distributed systems exist because one computer cannot keep up."
      visual={<DemandStats />}
    />
  ),
  notes: n('Facebook, Google and YouTube statistics from the source PPT. Then land on: we need many computers cooperating.'),
})

add({
  section: 'Opening',
  title: 'What is a distributed system?',
  content: (
    <Split
      section="Opening"
      title="A distributed system"
      lead="Autonomous computers + network + middleware, perceived as one facility."
      points={[
        'A collection of autonomous computers, connected through a network and distribution middleware.',
        'They coordinate activities and share resources.',
        'Users perceive one integrated computing facility.',
        'Example: Google Web Server looks like one system while many servers answer a query in seconds.',
      ]}
      visual={<ServiceNet />}
    />
  ),
  notes: n('Point at the user query, then at the hidden nodes.'),
})

add({
  section: 'Opening',
  title: 'Advantages of distributed computing',
  content: (
    <Split
      section="Opening"
      title="Why distribute the work?"
      points={[
        'Highly efficient for large computations.',
        'Scalability: add machines as the problem grows.',
        'High availability when the system is designed for it.',
        'An example: we save computational time by running partial work simultaneously.',
        'Failure behaviour is more complex than on one machine — design for it, do not ignore it.',
      ]}
      visual={<StrengthOrbit />}
    />
  ),
  notes: n('Efficiency and scale are the motivation. Then show the array-sum picture.'),
})

add({
  section: 'Opening',
  title: 'Worked idea: summing an array in parallel',
  content: (
    <Split
      section="Opening"
      title="Examples: split, compute, combine"
      lead="If serial sum takes time x, three parallel partial sums take about x/3, then the main process adds the three results."
      points={[
        'Array a with n elements. Serial sum costs time x.',
        'Partition into a1, a2, a3 by modulo of the element.',
        'a1: remainder 0. a2: remainder 1. a3: remainder 2.',
        'Each process sums about n/3 elements.',
        'Return partial sums to the main process and add them.',
      ]}
      visual={<ModuloCells />}
      takeaway="This is already MPI thinking: private work, then a reduction."
    />
  ),
  notes: n('Walk the modulo partition slowly. Students must see local sum then global combine.'),
})

add({
  section: 'Opening',
  title: 'Shared memory versus distributed memory',
  content: (
    <Full
      section="Opening"
      title="How does Rank 0 send a value to Rank 3?"
      lead="Shared memory: all processors reach one region. Distributed memory: Process i owns Memory i. Messages cross the network."
      visual={<SharedVsDistributed />}
    />
  ),
  notes: n('Pause on the question. Then introduce MPI as the answer.'),
})

add({
  section: 'MPI Basics',
  title: 'MPI Basics',
  content: (
    <Divider
      section="MPI Basics"
      tone="basics"
      number="MPI BASICS"
      title="MPI Basics"
      subtitle="Same program. Different ranks. Private memories."
      visual={<SpmdFork />}
      layout="center"
    />
  ),
  notes: n('Section open: SPMD is the mental model for the rest of the module.'),
})

add({
  section: 'MPI Basics',
  title: 'What is MPI?',
  content: (
    <Split
      section="MPI Basics"
      title="Message Passing Interface"
      lead="A standardized and portable message-passing system for distributed and parallel computing."
      points={[
        'MPI is a STANDARD / SPECIFICATION, not one vendor’s language.',
        'It gives vendors a clearly defined base set of routines that can be implemented efficiently.',
        'Functions cover sending, receiving, communicating, synchronizing and dividing work.',
        'Used in HPC, supercomputers, clusters, scientific simulations and large numerical work.',
        'Implementations include MPICH and Open MPI.',
      ]}
      visual={<ProcessCloseup />}
    />
  ),
  notes: n('Clarify MPI is a specification. MPICH and Open MPI are implementations.'),
})

add({
  section: 'MPI Basics',
  title: 'How MPI works',
  content: (
    <Full
      section="MPI Basics"
      title="When an MPI program starts, multiple processes are created"
      lead="Each process gets a unique number called its rank. For four processes the ranks are 0, 1, 2 and 3."
      visual={<RankCloseup />}
    />
  ),
  notes: n('Animate identity. Rank is not a machine name; it is an ID inside the communicator.'),
})

add({
  section: 'MPI Basics',
  title: 'SPMD: same program, multiple data',
  content: (
    <CodeLive
      section="MPI Basics"
      title="SPMD"
      lead="One executable — parallel_program — launched four times."
      code={'if (rank == 0) {\n  coordinate_work();\n} else {\n  compute_local(rank);\n}'}
      points={[
        'Same program text on every process.',
        'Different rank.',
        'Different local data.',
        'Branch by rank only when a process must do unique work.',
      ]}
      visual={<SpmdLaunch variant="branch" />}
    />
  ),
  notes: n('Students should be able to draw this from memory.'),
})

add({
  section: 'MPI Basics',
  title: 'Rank and size',
  content: (
    <Full
      section="MPI Basics"
      title="comm_sz = 4    my_rank ∈ {0,1,2,3}"
      lead="MPI_Comm_size gets the total number of processes. MPI_Comm_rank gets the rank of the current process."
      visual={<SizeCensus />}
    />
  ),
  notes: n('Write the two calls on the board: size and rank, both on MPI_COMM_WORLD.'),
})

add({
  section: 'MPI Basics',
  title: 'Minimal MPI program structure',
  content: (
    <CodeLive
      section="MPI Basics"
      title="Initialize, identify, work, finalize"
      code={'#include <mpi.h>\n\nint main(int argc, char** argv) {\n  int rank, size;\n  MPI_Init(&argc, &argv);\n  MPI_Comm_rank(MPI_COMM_WORLD, &rank);\n  MPI_Comm_size(MPI_COMM_WORLD, &size);\n\n  /* parallel work */\n\n  MPI_Finalize();\n  return 0;\n}'}
      visual={<LifecycleScene variant="vertical" />}
      takeaway="MPI_Init starts the environment — some codes use MPI_Init(NULL, NULL). Rank and size discover identity. Never call MPI before Init or after Finalize."
    />
  ),
  notes: n('Do not shrink this code. Point to Init, rank, size, Finalize in that order.'),
})

add({
  section: 'MPI Basics',
  title: 'Core MPI functions',
  content: (
    <Split
      section="MPI Basics"
      title="The lifecycle every beginner program uses"
      formula={'MPI_Init(...) → MPI_Comm_size(MPI_COMM_WORLD, &size);\nMPI_Comm_rank(MPI_COMM_WORLD, &rank);\n/* work */\nMPI_Finalize();'}
      points={[
        'If 4 processes are running, size = 4.',
        'The rank statement yields 0, 1, 2 or 3 depending on which process executes it.',
        'Rank 0 is commonly used as root.',
      ]}
      visual={<InitBootstrap />}
    />
  ),
  notes: n('Repeat: size is how many, rank is who I am.'),
})

add({
  section: 'MPI Basics',
  title: 'Communicators',
  content: (
    <Full
      section="MPI Basics"
      title="MPI_COMM_WORLD is the default group"
      lead="A communicator defines which processes can communicate. Collectives operate over that group. A later subgroup can have its own rank scope."
      visual={<CommRing subgroup />}
    />
  ),
  notes: n('Draw the dashed world boundary around four ranks.'),
})

add({
  section: 'MPI Basics',
  title: 'Simple send: the number 100',
  content: (
    <CodeLive
      section="MPI Basics"
      title="Process 0 sends 100 to Process 1"
      code={'if (rank == 0) {\n  int number = 100;\n  MPI_Send(&number, 1, MPI_INT, 1, 0, MPI_COMM_WORLD);\n}\nif (rank == 1) {\n  int number;\n  MPI_Recv(&number, 1, MPI_INT, 0, 0,\n           MPI_COMM_WORLD, MPI_STATUS_IGNORE);\n}'}
      points={[
        'rank == 0 → sender. rank == 1 → receiver.',
        '100 is the message. count = 1. datatype = MPI_INT.',
        'destination rank in Send is 1. source rank in Recv is 0.',
        'tag is 0 on both sides so the message matches.',
      ]}
      visual={<MessagePacket value={100} />}
    />
  ),
  notes: n('This is the source example. Trace every argument.'),
})

add({
  section: 'MPI Basics',
  title: 'Adding 1 through 8 with four processes',
  content: (
    <Full
      section="MPI Basics"
      title="1+2+3+4+5+6+7+8 using 4 processes"
      lead="Each process computes a local sum. Then the results combine: 3+7+11+15 = 36. MPI_Reduce is the convenient combination."
      visual={<SumLanes />}
    />
  ),
  notes: n('This is the source’s first reduction picture. Keep the numbers exact.'),
})

add({
  section: 'MPI Basics',
  title: 'Advantages of MPI',
  content: (
    <Split
      section="MPI Basics"
      title="Why MPI is used"
      points={[
        'High performance for large parallel computations.',
        'Scalable: a few processors or thousands.',
        'Works across multiple computers — MPI programs can run on a cluster.',
        'Explicit communication: the programmer controls how and when data is exchanged.',
        'Suitable for distributed systems: each computer can have its own memory and processor.',
      ]}
      visual={<ClusterScale />}
    />
  ),
  notes: n('Explicit control is both the power and the cost.'),
})

add({
  section: 'MPI Basics',
  title: 'Disadvantages of MPI',
  content: (
    <Split
      section="MPI Basics"
      title="The cost of explicit messages"
      points={[
        'Programming is more complex than shared-memory programming.',
        'The programmer must manage communication.',
        'Communication between processes introduces latency.',
        'Sending large amounts of data can reduce performance.',
        'Debugging parallel MPI programs can be difficult.',
      ]}
      visual={<TradeoffMesh />}
    />
  ),
  notes: n('Latency and debugging are the honest limitations.'),
})

add({
  section: 'MPI Basics',
  title: 'Key terms to remember',
  content: (
    <Full
      section="MPI Basics"
      title="Term and meaning"
      lead="These words appear in almost every viva and two-mark question."
      visual={<AnnotatedProgram />}
    />
  ),
  notes: n('Ask students to close laptops and reciting rank, communicator, MPI_COMM_WORLD.'),
})

add({
  section: 'Point-to-Point',
  title: 'Point-to-Point Communication',
  content: (
    <Divider
      section="Point-to-Point"
      tone="p2p"
      number="POINT-TO-POINT"
      title="Point-to-point"
      subtitle="One sender. One receiver. One matching message."
      visual={<MessagePacket value={42} variant="travel" />}
      layout="center"
    />
  ),
  notes: n('One sender. One receiver. The rest of MPI is built on this match.'),
})

add({
  section: 'Point-to-Point',
  title: 'Point-to-point communication',
  content: (
    <Full
      section="Point-to-Point"
      title="Rank 0: value = 42 → MPI_Send → interconnect → MPI_Recv → Rank 1"
      lead="The most basic communication: one process sends data, the other receives it."
      visual={<PacketAnatomy value={42} />}
    />
  ),
  notes: n('Watch the packet. Name every field it carries.'),
})

add({
  section: 'Point-to-Point',
  title: 'MPI_Send — every parameter',
  content: (
    <CodeHero
      section="Point-to-Point"
      title="MPI_Send"
      lead="Sends a message. Annotate every argument."
      code={'MPI_Send(\n    buf,        /* address of send buffer */\n    count,      /* number of elements     */\n    datatype,   /* MPI type of each item  */\n    dest,       /* destination rank       */\n    tag,        /* message id             */\n    comm        /* communicator           */\n);'}
      points={[
        'buf, count and datatype describe memory.',
        'dest is a rank inside comm.',
        'tag distinguishes logical messages between the same pair.',
      ]}
      visual={<MessagePacket value={42} variant="send" />}
    />
  ),
  notes: n('Point to dest and tag. Those are matching keys.'),
})

add({
  section: 'Point-to-Point',
  title: 'MPI_Recv — every parameter',
  content: (
    <CodeLive
      section="Point-to-Point"
      title="MPI_Recv"
      lead="Receives a matching message into a local buffer."
      code={'MPI_Recv(\n    buf,        /* receive buffer         */\n    count,      /* max elements to accept */\n    datatype,\n    source,     /* sending rank           */\n    tag,\n    comm,\n    &status     /* or MPI_STATUS_IGNORE   */\n);'}
      points={[
        'source and tag must match the intended send (wildcards exist later).',
        'status can report the actual source, tag and count.',
        'The source example uses MPI_STATUS_IGNORE when status is not needed.',
      ]}
      visual={<RecvCloseup />}
      reverse
    />
  ),
  notes: n('Recv does not guess. It waits for a match.'),
})

add({
  section: 'Point-to-Point',
  title: 'Message matching',
  content: (
    <Full
      section="Point-to-Point"
      title="Three messages arrive. Only tag 20 is accepted."
      lead="Match by source, destination, tag and communicator. Datatype and count must be compatible."
      visual={<MatchingGate />}
    />
  ),
  notes: n('A mismatched tag leaves the expected receive waiting.'),
})

add({
  section: 'Point-to-Point',
  title: 'Why tags matter',
  content: (
    <Split
      section="Point-to-Point"
      title="Tags distinguish logical messages"
      points={[
        'The same two ranks may exchange temperature, pressure and a ready-flag.',
        'Tag 10, tag 20, tag 30 keep those streams from mixing.',
        'The receiver asks for the tag it needs now.',
      ]}
      visual={<MatchingScene variant="channels" />}
      takeaway="Tag is an application-level message name."
    />
  ),
  notes: n('Without tags, two messages between the same ranks can be received in the wrong order of meaning.'),
})

add({
  section: 'Point-to-Point',
  title: 'Blocking communication',
  content: (
    <Split
      section="Point-to-Point"
      title="A blocking call returns only after local completion"
      lead="MPI_Send or MPI_Recv may wait. Easier reasoning. Possible deadlock if both wait."
      takeaway="A blocking call returns only after the local completion condition is met."
      visual={<BlockingTimelines />}
      extra="wide-viz"
    />
  ),
  notes: n('Draw the WAIT box. Blocking is not the same as “the message already arrived at the other rank” in every implementation, but it is a completion of the local call.'),
})

add({
  section: 'Point-to-Point',
  title: 'Deadlock',
  content: (
    <Full
      section="Point-to-Point"
      title="Both wait to receive. Neither sends."
      lead="Rank 0: MPI_Recv from Rank 1. Rank 1: MPI_Recv from Rank 0. The path turns red."
      visual={<DeadlockFreeze />}
    />
  ),
  notes: n('This is a hero moment. Freeze the room. Ask who can make progress.'),
})

add({
  section: 'Point-to-Point',
  title: 'Safe ordering',
  content: (
    <Full
      section="Point-to-Point"
      title="A correct sequence makes progress"
      lead="Rank 0 sends. Rank 1 receives. Rank 1 replies. Rank 0 receives. Flow turns green."
      visual={<SafeDiagonal />}
    />
  ),
  notes: n('Also mention MPI_Sendrecv as a two-way exchange that avoids this pairing error.'),
})

add({
  section: 'Trapezoidal Rule',
  title: 'The Trapezoidal Rule in MPI',
  content: (
    <Divider
      section="Trapezoidal Rule"
      tone="trap"
      number="TRAPEZOIDAL RULE"
      title="Trapezoidal rule"
      subtitle="Divide the interval. Compute locally. Add globally."
      visual={<TrapezoidCurve />}
      layout="stack"
    />
  ),
  notes: n('The numerical is the spine of Module 3. Stay with it until every rank owns an interval.'),
})

add({
  section: 'Trapezoidal Rule',
  title: 'Numerical integration',
  content: (
    <Split
      section="Trapezoidal Rule"
      title="Approximate a definite integral"
      lead="Instead of the exact area under the curve, divide the area into trapezoids and add their areas."
      formula={'∫_a^b f(x) dx   ≈   sum of trapezoid areas'}
      points={[
        'The trapezoidal rule is a numerical method used to approximate the definite integral of a function.',
        'Input a, b and n.',
        'Width of each subinterval: h = (b − a) / n.',
      ]}
      visual={<IntegralShade />}
    />
  ),
  notes: n('Point at a, b, n, then at the shaded trapezoids.'),
})

add({
  section: 'Trapezoidal Rule',
  title: 'The trapezoidal formula',
  content: (
    <Split
      section="Trapezoidal Rule"
      title="Basic trapezoidal rule"
      lead="Suppose [a, b] is divided into n equal subintervals."
      formula={'h = (b − a) / n\n\n∫_a^b f(x) dx  ≈  h [ (f(a)+f(b))/2  +  Σ_{i=1}^{n-1} f(a + i h) ]'}
      points={[
        'Endpoints have half weight.',
        'Interior points have full weight.',
        'Multiply the bracket by h.',
      ]}
      visual={<TrapezoidCurve variant="single" />}
    />
  ),
  notes: n('Write the boxed formula from the source image. This is the exam statement.'),
})

add({
  section: 'Trapezoidal Rule',
  title: 'Worked example: f(x) = x²',
  content: (
    <Split
      section="Trapezoidal Rule"
      title="Simple example"
      lead="Suppose f(x) = x² and we want to calculate the integral from 0 to 4."
      formula={'f(x) = x²\n\n∫_0^4 x² dx'}
      takeaway="Divide [0, 4] into intervals. Each trapezoid has an area. Later four MPI ranks each own a slice."
      visual={<XSquaredPlot />}
      extra="wide-viz"
    />
  ),
  notes: n('Keep the source example. Exact integral is 64/3; the trapezoidal rule approximates it.'),
})

add({
  section: 'Trapezoidal Rule',
  title: 'Sequential trapezoidal algorithm',
  content: (
    <CodeTop
      section="Trapezoidal Rule"
      title="One process computes all trapezoids"
      lead="Serial version: calculate f(x) for all points, then all trapezoid areas, then add."
      code={'Input a, b, n\nh = (b - a) / n\nestimate = (f(a) + f(b)) / 2\nfor i = 1 to n-1:\n    estimate += f(a + i*h)\nestimate = estimate * h\nreturn estimate'}
      visual={<SerialSweep />}
      takeaway="For large n this loop is expensive — that is why MPI enters."
    />
  ),
  notes: n('Show the serial loop before any rank diagram.'),
})

add({
  section: 'Trapezoidal Rule',
  title: 'Why use MPI for the trapezoidal rule?',
  content: (
    <Full
      section="Trapezoidal Rule"
      title="Large n makes a sequential sweep slow"
      lead="MPI divides [a,b] among processes. Each process calculates its local trapezoidal sum. Local sums become the global integral."
      visual={<Scale1000 />}
    />
  ),
  notes: n('Four parts, four local sums, one global sum.'),
})

add({
  section: 'Trapezoidal Rule',
  title: 'MPI approach — identity then partition',
  content: (
    <Split
      section="Trapezoidal Rule"
      title="Steps 1 to 4"
      code={'MPI_Init(NULL, NULL);\nMPI_Comm_size(MPI_COMM_WORLD, &comm_sz);\nMPI_Comm_rank(MPI_COMM_WORLD, &my_rank);\n/* then divide [a,b] */'}
      points={[
        'If comm_sz = 4, ranks are 0, 1, 2, 3.',
        'n = 1000 trapezoids and p = 4 processes → about 250 trapezoids each.',
        'Each process calculates its own local integral.',
      ]}
      visual={<TrapPartition />}
    />
  ),
  notes: n('Source steps. Keep Init(NULL,NULL) as the source wrote it, alongside the argc/argv form shown earlier.'),
})

add({
  section: 'Trapezoidal Rule',
  title: 'Local interval formulas',
  content: (
    <Split
      section="Trapezoidal Rule"
      title="local_n, local_a, local_b, local_int"
      code={'local_n = n / comm_sz;\nlocal_a = a + my_rank * local_n * h;\nlocal_b = local_a + local_n * h;\nlocal_int = Trap(local_a, local_b, local_n, h);'}
      points={[
        'Each rank receives one interval segment.',
        'Private memory holds only that segment’s function values.',
        'Remainder trapezoids, if n is not divisible by p, need a fair extra-assignment in a complete program.',
      ]}
      visual={<LocalAnnotate />}
    />
  ),
  notes: n('Write the three assignment formulas large. They are five-mark material.'),
})

add({
  section: 'Trapezoidal Rule',
  title: 'Local computation',
  content: (
    <Full
      section="Trapezoidal Rule"
      title="All four ranks compute at once"
      lead="After the local Trap call: local_int₀, local_int₁, local_int₂, local_int₃."
      visual={<IntervalAsync />}
    />
  ),
  notes: n('No communication yet. That is the point of the partition.'),
})

add({
  section: 'Trapezoidal Rule',
  title: 'Manual result collection',
  content: (
    <Full
      section="Trapezoidal Rule"
      title="Non-root ranks send local_int to Rank 0"
      lead="Rank 0 receives each value, adds them, and prints the total. This is why MPI_Reduce exists."
      visual={<FloatCollect />}
    />
  ),
  notes: n('Show the loop of Recv at root. Then say: one collective replaces this.'),
})

add({
  section: 'Trapezoidal Rule',
  title: 'Combine with MPI_Reduce',
  content: (
    <Split
      section="Trapezoidal Rule"
      title="Local results become the integral"
      lead="Example local values 2.5, 3.1, 4.2, 5.2 combine to 15.0. Then MPI_Finalize."
      formula={'MPI_Reduce(&local_int, &total, 1, MPI_DOUBLE,\n           MPI_SUM, 0, MPI_COMM_WORLD);'}
      points={[
        'Each process calculates a local sum.',
        'Typical operation: MPI_SUM.',
        'Result can be placed at the root process — Rank 0 reports the final integral.',
        'Parallelism reduces computation time for large n.',
      ]}
      visual={<Reduce15 />}
    />
  ),
  notes: n('Source numbers 2.5+3.1+4.2+5.2=15.0. Keep them.'),
})

add({
  section: 'Trapezoidal Rule',
  title: 'Serial algorithm versus MPI algorithm',
  content: (
    <Split
      section="Trapezoidal Rule"
      title="Same mathematics. Different ownership."
      points={[
        'Serial: calculate f(x) for all points → all trapezoid areas → add → final integral.',
        'MPI: total work splits to P0 P1 P2 P3 → four local sums → MPI_Reduce → final result.',
        'The trapezoidal rule in MPI divides the interval among processes, each computes its assigned trapezoids, and MPI combines the local results.',
      ]}
      visual={<SerialVsParallelTrap />}
    />
  ),
  notes: n('Close the numerical section by restating the source’s MPI definition of the rule.'),
})

add({
  section: 'MPI I/O',
  title: 'MPI Input and Output',
  content: (
    <Divider
      section="MPI I/O"
      tone="io"
      number="MPI I/O"
      title="MPI I/O"
      subtitle="Many processes computing does not mean many processes should print."
      visual={<ConvergeIO />}
      layout="reverse"
    />
  ),
  notes: n('Show the mess first. Students remember the mess.'),
})

add({
  section: 'MPI I/O',
  title: 'Dealing with I/O in MPI',
  content: (
    <Split
      section="MPI I/O"
      title="I/O = Input / Output"
      points={[
        'Uncoordinated simultaneous output can be confusing and slow.',
        'A common approach is to let rank 0 handle common input/output.',
        'For very large datasets, MPI supports parallel / distributed I/O.',
        'Minimize unnecessary file access and communication.',
        'I/O can dominate runtime if every rank hits the disk or the console.',
      ]}
      visual={<RootIO />}
    />
  ),
  notes: n('Preserve every source bullet.'),
})

add({
  section: 'MPI I/O',
  title: 'Interleaved output',
  content: (
    <Full
      section="MPI I/O"
      title="Rank 0, 1, 2 and 3 print at once"
      lead="Lines from different ranks interleave. Debugging becomes archaeology."
      visual={<TerminalWall />}
    />
  ),
  notes: n('Then show the clean token-passing version.'),
})

add({
  section: 'MPI I/O',
  title: 'Root-managed input',
  content: (
    <Split
      section="MPI I/O"
      title="Rank 0 reads once. Everyone receives a copy."
      points={[
        'Rank 0 reads a, b and n from the keyboard or a file.',
        'Rank 0 validates the input.',
        'MPI_Bcast sends the values to the communicator.',
        'All ranks compute. Rank 0 prints the final result.',
      ]}
      takeaway="Root-managed input is the standard beginner pattern."
      visual={<InputBroadcast />}
    />
  ),
  notes: n('Connect I/O to the broadcast they are about to study formally.'),
})

add({
  section: 'MPI I/O',
  title: 'Ordered output',
  content: (
    <Split
      section="MPI I/O"
      title="Token passing keeps debug output readable"
      points={[
        'Rank 0 prints, then signals Rank 1.',
        'Rank 1 prints, then signals Rank 2.',
        'Useful for debugging.',
        'May reduce performance — do not use it in the timed region of a large run.',
      ]}
      visual={<TokenPass />}
    />
  ),
  notes: n('Ordered output is a teaching tool, not a performance tool.'),
})

add({
  section: 'Collectives',
  title: 'Collective Communication',
  content: (
    <Divider
      section="Collectives"
      tone="coll"
      number="COLLECTIVE COMMUNICATION"
      title="Collectives"
      subtitle="One operation coordinates the whole communicator."
      visual={<CollectiveStar />}
      layout="center"
    />
  ),
  notes: n('Collectives involve all processes in the communicator.'),
})

add({
  section: 'Collectives',
  title: 'What is collective communication?',
  content: (
    <Split
      section="Collectives"
      title="Group operations, not pairwise accidents"
      lead="Communication involving a group of processes."
      points={[
        'MPI_Bcast — one process broadcasts data to all.',
        'MPI_Scatter — distributes different portions of data.',
        'MPI_Gather — collects data from processes.',
        'MPI_Reduce — combines values at a root process.',
        'MPI_Allreduce — combines and makes the result available to all.',
        'MPI_Barrier — synchronizes processes.',
      ]}
      visual={<GroupCall />}
    />
  ),
  notes: n('Every rank in the communicator must call the collective.'),
})

add({
  section: 'Collectives',
  title: 'MPI_Bcast',
  content: (
    <Full
      section="Collectives"
      title="Rank 0 starts with x = 25. Then every rank owns x = 25."
      lead="Root copies one value outward. All ranks call MPI_Bcast."
      visual={<BcastFour />}
    />
  ),
  notes: n('Radial copy, not a loop of Send that students write by hand.'),
})

add({
  section: 'Collectives',
  title: 'MPI_Bcast syntax',
  content: (
    <Split
      section="Collectives"
      title="Broadcast call pattern"
      code={'MPI_Bcast(\n    buffer,\n    count,\n    datatype,\n    root,\n    MPI_COMM_WORLD\n);'}
      points={[
        'On the root, buffer is the source.',
        'On other ranks, buffer is the destination.',
        'root identifies the original owner.',
        'comm defines the participating group.',
      ]}
      visual={<BcastScene variant="radial" />}
    />
  ),
  notes: n('Same call on every rank. That surprises beginners.'),
})

add({
  section: 'Collectives',
  title: 'MPI_Scatter',
  content: (
    <Full
      section="Collectives"
      title="Root owns [A B C D E F G H]"
      lead="Rank 0 → [A B]  Rank 1 → [C D]  Rank 2 → [E F]  Rank 3 → [G H]"
      visual={<ScatterFall />}
    />
  ),
  notes: n('Chunks physically separate. This is not a broadcast.'),
})

add({
  section: 'Collectives',
  title: 'MPI_Gather',
  content: (
    <Full
      section="Collectives"
      title="Local arrays travel back to root"
      lead="Gather is scatter in reverse. Root reassembles the full array."
      visual={<GatherPuzzle />}
    />
  ),
  notes: n('Use the same letters so the reverse motion is obvious.'),
})

add({
  section: 'Collectives',
  title: 'Scatter and Gather syntax',
  content: (
    <Split
      section="Collectives"
      title="Distribution and collection"
      code={'MPI_Scatter(sendbuf, sendcount, sendtype,\n            recvbuf, recvcount, recvtype,\n            root, comm);\n\nMPI_Gather(sendbuf, sendcount, sendtype,\n           recvbuf, recvcount, recvtype,\n           root, comm);'}
      points={[
        'sendcount is the count per rank, not the full array length.',
        'Only root needs the large sendbuf on Scatter and the large recvbuf on Gather.',
      ]}
      visual={<ScatterScene variant="roundtrip" />}
    />
  ),
  notes: n('sendcount-per-rank is a classic exam trap.'),
})

add({
  section: 'Collectives',
  title: 'MPI_Reduce',
  content: (
    <Full
      section="Collectives"
      title="2, 4, 6, 8 collapse to 20 at Rank 0"
      lead="Tree: 2+4 and 6+8, then 6+14 = 20. Result at Rank 0."
      visual={<Reduce20 />}
    />
  ),
  notes: n('Animate the tree. Do not show four arrows into root as the only picture.'),
})

add({
  section: 'Collectives',
  title: 'Reduction operations',
  content: (
    <Split
      section="Collectives"
      title="The operator is part of the call"
      formula={'MPI_SUM    MPI_MAX    MPI_MIN    MPI_PROD'}
      points={[
        'MPI_SUM adds values — used for the trapezoidal total.',
        'MPI_MAX finds the maximum.',
        'MPI_MIN finds the minimum.',
        'MPI_PROD multiplies values.',
      ]}
      visual={<ReduceTree variant="op" />}
    />
  ),
  notes: n('Name the four operations from the source.'),
})

add({
  section: 'Collectives',
  title: 'MPI_Allreduce',
  content: (
    <Full
      section="Collectives"
      title="Reduce, then 20 returns to every rank"
      lead="Allreduce makes the combined value available to all. Useful in iterative algorithms."
      visual={<AllReduceWave />}
    />
  ),
  notes: n('Start from Reduce, then bounce the 20 back. The distinction must be obvious.'),
})

add({
  section: 'Collectives',
  title: 'MPI_Barrier',
  content: (
    <Split
      section="Collectives"
      title="Fast ranks wait. The last process opens the gate."
      lead="Every process waits until all processes in the communicator reach the barrier."
      takeaway="Every process waits until all processes in the communicator reach the barrier."
      visual={<BarrierGate />}
      extra="wide-viz"
    />
  ),
  notes: n('Timing, debugging, and measuring a parallel phase are the legitimate uses.'),
})

add({
  section: 'Collectives',
  title: 'Collective comparison',
  content: (
    <Full
      section="Collectives"
      title="Six patterns, one communicator"
      lead="Broadcast one→all · Scatter one→chunks · Gather chunks→one · Reduce values→combined one · Allreduce values→combined all · Barrier all wait→all continue"
      visual={<CollectiveAtlas />}
    />
  ),
  notes: n('Leave this slide up while students copy the six arrows.'),
})

add({
  section: 'Datatypes',
  title: 'Derived Datatypes',
  content: (
    <Divider
      section="Datatypes"
      tone="type"
      number="DERIVED DATATYPES"
      title="Derived datatypes"
      subtitle="Non-contiguous memory can travel as one logical message."
      visual={<FlattenMemory />}
      layout="center"
    />
  ),
  notes: n('The matrix column is the hero diagram for this section.'),
})

add({
  section: 'Datatypes',
  title: 'MPI datatypes',
  content: (
    <Full
      section="Datatypes"
      title="Built-in types must match the buffer"
      lead="C int → MPI_INT. C double → MPI_DOUBLE. C char → MPI_CHAR. C float → MPI_FLOAT."
      visual={<BuiltinCells />}
    />
  ),
  notes: n('Wrong datatype is undefined behaviour, not a friendly type error.'),
})

add({
  section: 'Datatypes',
  title: 'Why derived datatypes?',
  content: (
    <Split
      section="Datatypes"
      title="Complex layouts as one MPI datatype"
      question="What if the data we want is NOT contiguous?"
      points={[
        'Useful for non-contiguous data and mixed data types.',
        'Can reduce repeated communication and manual packing.',
        'Examples: contiguous, vector, indexed, and struct datatypes.',
        'A derived datatype is a user-defined MPI type that describes structured or strided memory.',
      ]}
      visual={<MatrixColumn />}
    />
  ),
  notes: n('Packing by hand is the alternative. Derived types describe the layout once.'),
})

add({
  section: 'Datatypes',
  title: 'Vector datatype — matrix column',
  content: (
    <Full
      section="Datatypes"
      title="MPI_Type_vector describes a column in row-major memory"
      lead="count = number of blocks. blocklength = elements per block. stride = gap between blocks."
      visual={<VectorOverlay />}
    />
  ),
  notes: n('Point from each property to the matrix. This must be unmistakable.'),
})

add({
  section: 'Datatypes',
  title: 'MPI_Type_vector signature',
  content: (
    <Split
      section="Datatypes"
      title="Create the type, then commit it"
      code={'MPI_Type_vector(\n    count,        /* blocks              */\n    blocklength,  /* elements per block  */\n    stride,       /* oldtype elements    */\n    oldtype,\n    &newtype\n);\nMPI_Type_commit(&newtype);\n/* send a matrix column-like pattern */'}
      points={[
        'oldtype is the built-in type of each element.',
        'newtype is the handle you pass to Send/Recv instead of packing a temp buffer.',
      ]}
      visual={<CommitHandle />}
    />
  ),
  notes: n('Keep the complete source signature.'),
})

add({
  section: 'Datatypes',
  title: 'Common derived datatype functions',
  content: (
    <Split
      section="Datatypes"
      title="The source toolkit"
      points={[
        'MPI_Type_contiguous() — consecutive elements.',
        'MPI_Type_vector() — regularly spaced elements.',
        'MPI_Type_indexed() — irregularly spaced elements.',
        'MPI_Type_create_struct() — mixed fields / types.',
        'MPI_Type_commit() — make the datatype ready for use.',
        'MPI_Type_free() — release the datatype.',
      ]}
      visual={<DatatypeLife variant="toolkit" />}
    />
  ),
  notes: n('All six functions are on the new PPT. Do not drop contiguous, indexed or struct.'),
})

add({
  section: 'Datatypes',
  title: 'Datatype lifecycle',
  content: (
    <Full
      section="Datatypes"
      title="Create → Commit → Use → Free"
      lead="A type that is never committed cannot be used. A type that is never freed leaks a handle."
      visual={<TypeCycle />}
    />
  ),
  notes: n('Commit is the exam keyword students forget.'),
})

add({
  section: 'Datatypes',
  title: 'Benefits and costs',
  content: (
    <Split
      section="Datatypes"
      title="Useful, but not magic"
      points={[
        'Benefits: cleaner code, avoid manual packing, express non-contiguous data, reduce copy logic.',
        'Costs: harder to understand, commit/free required, performance depends on layout, debugging can be tricky.',
      ]}
      visual={<PackingBeforeAfter />}
    />
  ),
  notes: n('A balanced answer scores better than “derived types are always faster”.'),
})

add({
  section: 'Performance',
  title: 'Performance Measurement',
  content: (
    <Divider
      section="Performance"
      tone="perf"
      number="PERFORMANCE"
      title="Performance"
      subtitle="Time the parallel section. Explain the overhead."
      visual={<PerfTimeline />}
      layout="reverse"
    />
  ),
  notes: n('Formulas without a timeline are not enough.'),
})

add({
  section: 'Performance',
  title: 'Performance evaluation of MPI programs',
  content: (
    <Split
      section="Performance"
      title="What to measure"
      formula={'Speedup    Sₚ = T₁ / Tₚ\nEfficiency Eₚ = Sₚ / p'}
      points={[
        'Measure execution time using MPI_Wtime().',
        'Evaluate scalability as process count increases.',
        'Consider communication overhead and synchronization.',
        'Check load balancing among processes.',
      ]}
      visual={<SpeedupMeters />}
    />
  ),
  notes: n('Write S_p and E_p exactly as the source.'),
})

add({
  section: 'Performance',
  title: 'MPI timing with MPI_Wtime',
  content: (
    <CodeTime
      section="Performance"
      title="Barrier → start → work → barrier → stop"
      code={'MPI_Barrier(MPI_COMM_WORLD);\nstart = MPI_Wtime();\n\n/* parallel work */\n\nMPI_Barrier(MPI_COMM_WORLD);\nelapsed = MPI_Wtime() - start;'}
      points={[
        'MPI_Wtime returns wall-clock time as a double.',
        'Barriers help every rank measure the same collective phase.',
        'Without the leading barrier, a late rank shortens the apparent time.',
      ]}
      visual={<WtimeStrip />}
    />
  ),
  notes: n('Explain why synchronization matters for measuring a parallel phase.'),
})

add({
  section: 'Performance',
  title: 'Communication overhead',
  content: (
    <Full
      section="Performance"
      title="100 tiny messages versus 1 larger message"
      lead="Latency taxes the start of every message. Bandwidth taxes the bytes. Too many small messages pay latency over and over."
      visual={<TinyLatency />}
    />
  ),
  notes: n('Latency + bandwidth at the source-supported level. No invented network-stack lecture.'),
})

add({
  section: 'Performance',
  title: 'Load balancing and overhead',
  content: (
    <Split
      section="Performance"
      title="Communication includes transfer and synchronization"
      points={[
        'Latency affects the start of communication.',
        'Bandwidth affects the rate of data transfer.',
        'Good load balancing gives each process similar work.',
        'Too much communication or imbalance can reduce speedup.',
      ]}
      visual={<LoadLanes />}
    />
  ),
  notes: n('Source slide on overhead and load balancing. Keep all four sentences.'),
})

add({
  section: 'Performance',
  title: 'Timing table for reports',
  content: (
    <Split
      section="Performance"
      title="Notation for lab and exam answers"
      formula={'p     number of MPI processes\nT(p)  measured runtime\nS(p)  speedup T(1)/T(p)\nE(p)  efficiency S(p)/p'}
      points={[
        'Always state what region was timed.',
        'Always state whether I/O was included.',
      ]}
      visual={<TimingTable />}
    />
  ),
  notes: n('This table is how students should present MPI timing in a lab record.'),
})

add({
  section: 'Sorting',
  title: 'Parallel Sorting',
  content: (
    <Divider
      section="Sorting"
      tone="sort"
      number="PARALLEL SORTING"
      title="Parallel sorting"
      subtitle="Sort locally. Exchange. Merge into global order."
      visual={<SnapSort />}
      layout="center"
    />
  ),
  notes: n('Start unsorted. Students must see private lists first.'),
})

add({
  section: 'Sorting',
  title: 'The parallel sorting problem',
  content: (
    <Split
      section="Sorting"
      title="Divide, sort, exchange, merge"
      points={[
        'Divide unsorted data among processes.',
        'Each process sorts its local portion.',
        'Collect or exchange sorted portions.',
        'Merge the sorted portions to obtain the final sorted sequence.',
        'MPI_Scatter() and MPI_Gather() can support distribution and collection.',
      ]}
      visual={<SortLanes variant="pipeline" />}
    />
  ),
  notes: n('Preserve the source algorithm. Then go deeper with odd-even.'),
})

add({
  section: 'Sorting',
  title: 'Source example: [8, 3, 7, 2, 6, 1, 5, 4]',
  content: (
    <Full
      section="Sorting"
      title="Local sort on four processes, then merge"
      lead="P0 [8,3]→[3,8]  P1 [7,2]→[2,7]  P2 [6,1]→[1,6]  P3 [5,4]→[4,5]  Final: [1,2,3,4,5,6,7,8]"
      visual={<UnsortedTiles />}
    />
  ),
  notes: n('Keep the source numbers exactly.'),
})

add({
  section: 'Sorting',
  title: 'Local sort',
  content: (
    <Split
      section="Sorting"
      title="Each rank sorts its private list first"
      lead="Unsorted distributed data becomes locally ordered data. Global order still needs neighbour exchange."
      takeaway="Local sort is necessary but not sufficient."
      visual={<LocalReorder />}
      extra="wide-viz"
    />
  ),
  notes: n('Local sort is necessary but not sufficient.'),
})

add({
  section: 'Sorting',
  title: 'Odd-even transposition — even phase',
  content: (
    <Full
      section="Sorting"
      title="Even phase: Rank 0 ↔ Rank 1 and Rank 2 ↔ Rank 3"
      lead="Partner exchange on even-odd pairs, then compare-split."
      visual={<EvenLanes />}
    />
  ),
  notes: n('Cinematic pairing. Name the partners out loud.'),
})

add({
  section: 'Sorting',
  title: 'Odd-even transposition — odd phase',
  content: (
    <Split
      section="Sorting"
      title="Odd phase: Rank 1 ↔ Rank 2"
      lead="The ends may sit out. Repeat even and odd phases until globally ordered."
      takeaway="With four ranks, Rank 0 and Rank 3 have no odd-phase partner."
      visual={<OddZoom />}
      extra="wide-viz"
    />
  ),
  notes: n('With four ranks, Rank 0 and Rank 3 have no odd-phase partner.'),
})

add({
  section: 'Sorting',
  title: 'Compare-split',
  content: (
    <Full
      section="Sorting"
      title="Exchange, merge, keep the correct half"
      lead="Rank 0 [1 5 8] and Rank 1 [2 6 9] merge to [1 2 5 6 8 9]. Lower rank keeps [1 2 5]. Higher rank keeps [6 8 9]."
      visual={<CompareMerge />}
    />
  ),
  notes: n('Hero slide. If students remember one sorting picture, this is it.'),
})

add({
  section: 'Sorting',
  title: 'Sorting performance issues',
  content: (
    <Split
      section="Sorting"
      title="Communication can dominate"
      points={[
        'Communication can dominate for large distributed arrays.',
        'Load imbalance occurs with skewed data.',
        'Choosing splitters affects balance when the algorithm uses them.',
        'Local sort cost still matters.',
        'Scalability depends on the algorithm and the network.',
      ]}
      visual={<SortPerfBars />}
    />
  ),
  notes: n('Close sorting with honesty: more ranks are not automatically faster.'),
})

add({
  section: 'Summary',
  title: 'Module 3 Summary',
  content: (
    <Divider
      section="Summary"
      tone="sum"
      number="SUMMARY"
      title="Summary"
      subtitle="Processes own memory. Messages make them work together."
      visual={<SynthesisWorld />}
      layout="center"
    />
  ),
  notes: n('Close the story: four private memories, then one parallel solution.'),
})

add({
  section: 'Summary',
  title: 'Key takeaways',
  content: (
    <Split
      section="Summary"
      kicker="Close"
      title="Module 3 in six sentences"
      points={[
        'MPI enables distributed-memory parallel programming.',
        'Trapezoidal integration demonstrates parallel numerical computation.',
        'Collective communication coordinates groups of processes.',
        'Performance depends on time, speedup, efficiency, communication and load balance.',
        'Parallel sorting divides sorting work across processes.',
        'Derived datatypes simplify communication of complex memory layouts.',
      ]}
      visual={<ModuleMap />}
    />
  ),
  notes: n('These six lines are the source closing slide. Keep them.'),
})

add({
  section: 'Summary',
  title: 'Exam-writing shortcuts',
  content: (
    <Split
      section="Summary"
      title="Turn concepts into marks"
      points={[
        'For MPI programs, always mention Init, rank, size and Finalize.',
        'For Send/Recv, write arguments and explain tag, source and destination.',
        'For the trapezoidal rule, draw interval partition among ranks.',
        'For collectives, identify root and result location.',
        'For sorting, explain local sort, exchange and merge / compare-split.',
      ]}
      visual={<ExamShortcuts />}
    />
  ),
  notes: n('Definition, syntax, diagram, performance note — that is a full answer.'),
})

add({
  section: 'Summary',
  title: '20 important viva questions',
  content: (
    <Split
      section="Summary"
      title="Rapid oral revision"
      points={[
        'What is MPI? What is rank? What is a communicator? What is MPI_COMM_WORLD?',
        'What are MPI_Init, MPI_Finalize, MPI_Send and MPI_Recv?',
        'What are tag, deadlock, trapezoidal rule and root-managed I/O?',
        'What are MPI_Bcast, Scatter, Gather, Reduce, Allreduce and Barrier?',
        'What are derived datatype, MPI_Wtime, speedup and parallel sorting?',
      ]}
      visual={<ExamViva />}
    />
  ),
  notes: n('Fire these quickly. Demand the keyword, not an essay.'),
})

add({
  section: 'Summary',
  title: '10 two-mark questions',
  content: (
    <Split
      section="Summary"
      title="Short answers"
      points={[
        'Define MPI.',
        'What is rank?',
        'What is a communicator?',
        'What is MPI_Send?',
        'What is MPI_Recv?',
        'Define collective communication.',
        'What is MPI_Bcast?',
        'What is MPI_Reduce?',
        'What is a derived datatype?',
        'What is MPI_Wtime?',
      ]}
      visual={<ExamTwo />}
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
        'Explain MPI program structure.',
        'Explain MPI_Send and MPI_Recv.',
        'Explain deadlock in MPI and how to avoid it.',
        'Explain the trapezoidal rule in MPI.',
        'Explain dealing with I/O in MPI.',
        'Explain collective communication.',
        'Explain MPI_Reduce and MPI_Allreduce.',
        'Explain MPI-derived datatypes.',
        'Explain performance evaluation of MPI programs.',
        'Explain a parallel sorting algorithm.',
      ]}
      visual={<ExamFive />}
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
        'Explain distributed-memory programming with MPI and important MPI functions.',
        'Explain trapezoidal rule implementation in MPI with interval partitioning.',
        'Explain MPI I/O handling and collective communication with examples.',
        'Explain MPI-derived datatypes and performance evaluation of MPI programs.',
        'Explain a parallel sorting algorithm using local sort, exchange and merge.',
        'Previous VTU Q1–Q5 placeholders: fill from the past paper in class.',
      ]}
      visual={<ExamTen />}
    />
  ),
  notes: n('Ten marks need a figure. Force students to draw ranks.'),
})

add({
  section: 'Summary',
  title: 'One-page revision sheet',
  content: (
    <Split
      section="Summary"
      title="Must-remember keywords"
      points={[
        'MPI; distributed memory; SPMD; process; rank; size; communicator; MPI_COMM_WORLD.',
        'MPI_Init; MPI_Finalize; MPI_Comm_rank; MPI_Comm_size; MPI_Send; MPI_Recv.',
        'buffer; count; datatype; source; destination; tag; status; deadlock.',
        'trapezoidal rule; local_n; local_a; local_b; local_int; root; MPI_Bcast; Scatter; Gather; Reduce; Allreduce; Barrier.',
        'MPI_Wtime; Sₚ; Eₚ; derived datatype; MPI_Type_vector; contiguous; indexed; struct; compare-split.',
      ]}
      visual={<KeywordRibbon />}
    />
  ),
  notes: n('Close the module. Four private memories, then one sentence: messages make them one machine.'),
})

export const parallelComputingModule3Slides = raw.map((item, index) => {
  return slide({
    id: `pc-mpi-${String(index + 1).padStart(2, '0')}`,
    title: item.title,
    subtitle: item.subtitle,
    content: item.content,
    notes: item.notes,
    composition: item.composition || 'teaching',
  })
})
