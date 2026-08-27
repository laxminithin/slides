/**
 * Premium "course" metadata layered on top of the raw subject/module data.
 *
 * The Learning Universe home and the reusable Course Landing read from here to
 * present every subject as a curated course — with a mood, an identity, a
 * visual world and a chapter-by-chapter journey — instead of a folder of PPTs.
 *
 * Keyed by subject id (see src/data/subjects.jsx). International Business keeps
 * its own bespoke `program` + `chapter` data on the subject itself; the values
 * here are the fallback identity used everywhere it plugs into the framework.
 */

export const courseMeta = {
  'big-data-analytics': {
    tagline: 'The Future of Intelligent Data',
    essence:
      'From raw signal to distributed intelligence — the systems that turn planet-scale data into decisions.',
    world: 'data',
    track: 'Data Journey',
    difficulty: 'Intermediate',
    tint: ['#2563eb', '#0ea5a4'],
    keywords: ['Big Data', 'Hadoop', 'Spark', 'Lab'],
    chapters: [
      { word: 'Foundations', quote: 'Every intelligent system begins with data no one could store yesterday.' },
      { word: 'Distribution', quote: 'When one machine is not enough, thousands learn to think as one.' },
      { word: 'Flexibility', quote: 'The real world refuses to sit in neat rows and columns.' },
      { word: 'Warehouse', quote: 'Raw files become questions a business can finally answer.' },
      { word: 'Intelligence', quote: 'The web is a graph — and importance can be computed.' },
    ],
  },
  'information-network-security': {
    tagline: 'Defend Digital Infrastructure',
    essence:
      'The discipline of secrecy, trust and proof — from classical ciphers to the cryptography protecting every connection.',
    world: 'security',
    track: 'Security Operations',
    difficulty: 'Advanced',
    tint: ['#1e3a8a', '#0891b2'],
    keywords: ['Cryptography', 'Hashing', 'Authentication', 'Keys'],
    chapters: [
      { word: 'Secrecy', quote: 'Every secret in history was kept — or broken — by a cipher.' },
      { word: 'Integrity', quote: 'A single altered bit should never go unnoticed.' },
      { word: 'Identity', quote: 'Prove who you are without giving yourself away.' },
      { word: 'Trust', quote: 'A key is only as safe as the system that guards it.' },
      { word: 'Defense', quote: 'Theory meets the wire where real systems are attacked.' },
    ],
  },
  'database-management-systems': {
    tagline: 'Where Information Becomes Structure',
    essence:
      'Turn scattered records into a single source of truth — models, relations, discipline and reliability under pressure.',
    world: 'database',
    track: 'Systems Track',
    difficulty: 'Core',
    tint: ['#2563eb', '#7c3aed'],
    keywords: ['ER Model', 'Relational', 'SQL', 'Transactions'],
    chapters: [
      { word: 'Structure', quote: 'Scattered records become a single source of truth.' },
      { word: 'Relations', quote: 'Facts about the world, expressed as pure relations.' },
      { word: 'Discipline', quote: 'A clean schema is a database that cannot lie.' },
      { word: 'Reliability', quote: 'Even through failure, correctness must survive.' },
      { word: 'Concurrency', quote: 'Thousands act at once, yet the truth stays consistent.' },
    ],
  },
  'computer-networks': {
    tagline: 'How Does Information Travel?',
    essence:
      'Follow one message from Laptop A to Computer B — through signals, frames, shared media, wireless links and IP packets — across all eight units of 10CS55.',
    world: 'network',
    track: 'Networking Track · 10CS55',
    difficulty: 'Intermediate',
    tint: ['#0ea5a4', '#2563eb'],
    segmentLabel: 'Unit',
    keywords: ['OSI/TCP-IP', 'Physical Layer', 'Ethernet', 'IPv4/IPv6'],
    chapters: [
      { word: 'Message', quote: 'What actually happens when one computer sends to another?' },
      { word: 'Signal', quote: 'Bits become waves — and waves can fade, distort or drown in noise.' },
      { word: 'Share', quote: 'Many channels, one link: multiplexing and switching invent capacity.' },
      { word: 'Protect', quote: 'Redundant bits detect corruption before it becomes wrong data.' },
      { word: 'Frame', quote: 'A stream becomes frames that can be paced, checked and retransmitted.' },
      { word: 'Access', quote: 'Who transmits on a shared cable — and how Ethernet evolved.' },
      { word: 'Wireless', quote: 'Radio LANs, Bluetooth, interconnecting devices and cellular handoff.' },
      { word: 'Route', quote: 'Logical addresses carry packets across heterogeneous networks.' },
    ],
  },
  'theory-of-computation': {
    tagline: 'The Mathematics of Machines',
    essence:
      'The elegant limits of computation — from the simplest machine that can decide to the boundary of what can ever be computed.',
    world: 'automata',
    track: 'Formal Track',
    difficulty: 'Theory',
    tint: ['#7c3aed', '#2563eb'],
    keywords: ['Automata', 'Languages', 'Grammars', 'Turing'],
    chapters: [
      { word: 'Machines', quote: 'The simplest machine that can still decide.' },
      { word: 'Patterns', quote: 'Every pattern is a language a machine can recognize.' },
      { word: 'Memory', quote: 'Add a stack, and grammar comes alive.' },
      { word: 'Structure', quote: 'The shape — and the limits — of what grammar can express.' },
      { word: 'Computation', quote: 'One tape, and the boundary of what can ever be computed.' },
    ],
  },
  'parallel-computing': {
    tagline: 'Thousands of Cores, One Result',
    essence:
      'Why one processor is no longer enough — and how CPUs, GPUs and clusters are choreographed into a single machine.',
    world: 'parallel',
    track: 'Engineering Track',
    difficulty: 'Advanced',
    tint: ['#2563eb', '#f97316'],
    keywords: ['SIMD/MIMD', 'GPU', 'MPI', 'CUDA'],
    chapters: [
      { word: 'Necessity', quote: 'One problem. Many processing elements. One coordinated result.' },
      { word: 'Power', quote: 'Thousands of cores, measured honestly.' },
      { word: 'Messages', quote: 'Separate computers, choreographed into one machine.' },
      { word: 'Sharing', quote: 'Shared memory, shared risk, shared result.' },
      { word: 'Scale', quote: 'Programming thousands of workers for a single answer.' },
    ],
  },
  'object-oriented-programming-with-java': {
    tagline: 'Build Programs That Think in Objects',
    essence:
      'From source code to reusable type-safe systems - Java fundamentals, objects, inheritance, exceptions, threads and generics in one clean studio.',
    world: 'java',
    track: 'Programming Track',
    difficulty: 'Core',
    tint: ['#0f766e', '#dc2626'],
    keywords: ['JVM', 'OOP', 'Inheritance', 'Threads', 'Generics'],
    chapters: [
      { word: 'Foundations', quote: 'Every Java program begins as text, then becomes bytecode the JVM can run anywhere.' },
      { word: 'Objects', quote: 'Related data and behavior belong together, so programs can grow without becoming tangled.' },
      { word: 'Reuse', quote: 'Inheritance and interfaces let one design serve many concrete forms.' },
      { word: 'Robustness', quote: 'Good programs expect failure and coordinate work without losing control.' },
      { word: 'Type Safety', quote: 'Enums, wrappers and generics help the compiler catch mistakes before users do.' },
    ],
  },
  'international-business': {
    tagline: 'One executive documentary of global commerce',
    essence:
      'From local trade to a connected world machine — discovery, understanding, knowledge, governance, growth and execution as one film.',
    world: 'global',
    track: 'Executive Program',
    difficulty: 'Executive',
    tint: ['#a16207', '#1e293b'],
    keywords: ['Trade', 'Strategy', 'Finance', 'Leadership'],
    // Chapter identity for IB lives on the subject's own `module.chapter` data.
    chapters: [
      { word: 'Curiosity', quote: 'How global business began.' },
      { word: 'Observation', quote: 'The forces shaping global business.' },
      { word: 'Insight', quote: 'Theories that explain international trade.' },
      { word: 'Authority', quote: 'Who controls global commerce.' },
      { word: 'Ambition', quote: 'How organizations become multinational.' },
      { word: 'Mastery', quote: 'How the global business machine operates.' },
    ],
  },
  'research-methodology-ipr': {
    tagline: 'From Research Questions to Intellectual Property',
    essence:
      'How an engineering problem becomes evidence-based research — then invention — then protected intellectual property.',
    world: 'research',
    track: 'Research & IP Track',
    difficulty: 'Core',
    tint: ['#2563eb', '#d97706'],
    keywords: ['Research', 'Literature', 'Ethics', 'Patents', 'Copyright', 'IPR'],
    chapters: [
      { word: 'Foundations', quote: 'Good research begins with a worthwhile question.' },
      { word: 'Knowledge', quote: 'Research begins where existing knowledge ends.' },
      { word: 'Invention', quote: 'Novel ideas need strategic protection.' },
      { word: 'Creation', quote: 'Different creations require different rights.' },
      { word: 'Ecosystem', quote: 'Protection extends beyond technology.' },
    ],
  },
  chemistry: {
    tagline: 'See What Happens Inside the Reaction',
    essence:
      'Applied Chemistry for Smart Systems — from functional materials and polymers to energy devices, sensors, corrosion control and green e-waste recovery.',
    world: 'chemistry',
    track: 'First-Year Engineering · 1BCHES102/202',
    difficulty: 'Core',
    tint: ['#0f9db8', '#e09b2d'],
    keywords: ['Materials', 'Energy', 'Sensors', 'Corrosion', 'Green Chemistry'],
    chapters: [
      { word: 'Function', quote: 'Chemical structure decides how devices store bits and paint pixels.' },
      { word: 'Scale', quote: 'When size shrinks, quantum and polymer properties become engineering tools.' },
      { word: 'Energy', quote: 'Chemistry converts, stores and delivers electricity for sustainable systems.' },
      { word: 'Sense', quote: 'Sensors read chemistry; corrosion shows metals returning to nature.' },
      { word: 'Recover', quote: 'Green materials and e-waste recovery close the electronics loop.' },
    ],
  },
  'deep-learning': {
    tagline: 'Watch a Neural Network Think',
    essence:
      'From artificial neurons to CNNs and LSTM — a premium animated lecture series where signals, gradients, filters and memory gates come alive.',
    world: 'deep-learning',
    track: 'BCA · Semester 7 · BCA701',
    difficulty: 'Advanced',
    tint: ['#2563eb', '#0d9488'],
    keywords: ['Perceptron', 'Backprop', 'CNN', 'RNN', 'LSTM'],
    chapters: [
      { word: 'Neuron', quote: 'Biological inspiration becomes a weighted mathematical unit.' },
      { word: 'Learn', quote: 'Hidden layers and backpropagation turn error into better weights.' },
      { word: 'Discipline', quote: 'Regularization and optimization decide whether training generalizes.' },
      { word: 'Vision', quote: 'Convolution discovers local patterns across an image.' },
      { word: 'Memory', quote: 'Recurrent state and LSTM gates remember what matters through time.' },
    ],
  },
  'operating-systems': {
    tagline: 'You Are Inside the Operating System',
    essence:
      'Watch processes race for a CPU, locks freeze shared memory, pages travel through the MMU, and disk heads seek — a VTU BCS303 machine you can see.',
    world: 'os',
    track: 'Systems Track · BCS303 / 21CS43',
    difficulty: 'Core',
    tint: ['#1b2a41', '#0891b2'],
    keywords: ['Processes', 'Scheduling', 'Deadlocks', 'Paging', 'Disks'],
    chapters: [
      { word: 'Kernel', quote: 'Hardware wakes. The kernel claims the machine. Applications only knock.' },
      { word: 'Scheduler', quote: 'Many processes. One CPU. The dispatcher chooses who runs.' },
      { word: 'Lock', quote: 'Shared memory without a lock is a race. A cycle of waits is deadlock.' },
      { word: 'Address', quote: 'The program thinks memory is continuous. The MMU knows better.' },
      { word: 'Platter', quote: 'A file name becomes blocks. Blocks become a moving disk head.' },
    ],
  },
  'artificial-intelligence': {
    tagline: 'We Are Watching an Intelligent System Reason',
    essence:
      'From percept to action — agents, search trees, heuristics, logical inference and plans — a BCS515B lecture series you can see expand.',
    world: 'ai',
    track: 'Intelligence Track · BCS515B',
    difficulty: 'Core',
    tint: ['#2563eb', '#7c3aed'],
    keywords: ['Agents', 'Search', 'A*', 'Logic', 'Planning'],
    chapters: [
      { word: 'Agent', quote: 'The world is sensed. An action is chosen. The world changes.' },
      { word: 'Search', quote: 'When the next step is unknown, the agent looks ahead through states.' },
      { word: 'Heuristic', quote: 'A guess of remaining cost turns blind exploration into A*.' },
      { word: 'Knowledge', quote: 'Facts and rules live in a language. Unification makes them fire.' },
      { word: 'Plan', quote: 'Queries pull proofs backward. Actions push the world toward a goal.' },
    ],
  },
  'analog-electronics-linear-ics': {
    tagline: 'An Electronics Lab Coming Alive',
    essence:
      'Watch bias form, current flow, gain appear, feedback close, oscillators start, and waveforms transform — VTU 1BEC304 rebuilt as a premium animated lecture series.',
    world: 'analog',
    track: 'Electronics Track · 1BEC304',
    difficulty: 'Core',
    tint: ['#2563eb', '#d97706'],
    keywords: ['BJT', 'MOSFET', 'Op-Amp', 'Oscillators', 'Filters', 'ADC/DAC'],
    chapters: [
      { word: 'Bias', quote: 'A quiet DC point so a small AC change can ride and grow.' },
      { word: 'gm', quote: 'Gate voltage becomes drain current — then voltage gain.' },
      { word: 'Loop', quote: 'Feedback can stabilize gain — or make a circuit sing.' },
      { word: 'Power', quote: 'Efficiency, load lines and filters sculpt real energy and spectra.' },
      { word: 'Convert', quote: 'Bits become volts, thresholds snap clean, regulators hold the rail.' },
    ],
  },
  'data-structures': {
    tagline: 'Memory Comes Alive',
    essence:
      'Watch arrays shift, pointers rewire, stacks grow, queues wrap, trees traverse, and graphs explore — VTU 1BCS305 rebuilt so algorithms become visible.',
    world: 'structures',
    track: 'Programming Track · 1BCS305',
    difficulty: 'Core',
    tint: ['#2563eb', '#7c3aed'],
    keywords: ['Arrays', 'Stacks', 'Linked Lists', 'Trees', 'Graphs', 'Hashing'],
    chapters: [
      { word: 'Memory', quote: 'Contiguous cells and addresses turn abstract data into storage you can see.' },
      { word: 'Ends', quote: 'One end of access creates LIFO power; two ends create FIFO flow.' },
      { word: 'Links', quote: 'Nodes and pointers reclaim space that arrays leave stranded.' },
      { word: 'Hierarchy', quote: 'A root and two children become searchable order through traversal.' },
      { word: 'Reach', quote: 'Keys hash to slots; priorities and edges choose what comes next.' },
    ],
  },

  'computer-networks-bcs502': {
    tagline: 'Watch Packets Travel End to End',
    essence: 'Encapsulation, switching, error control, routing and TCP — BCS502 as a living network.',
    world: 'network502',
    track: 'Networking Track · BCS502 · 5th Semester',
    difficulty: 'Core',
    tint: ['#0ea5a4', '#1d4ed8'],
    keywords: ['OSI/TCP-IP', 'Routing', 'TCP', 'DNS', 'HTTP'],
    chapters: [
      { word: 'Layers', quote: 'Headers are added going down and removed coming up.' },
      { word: 'Link', quote: 'Frames carry data across one hop — checked, paced, shared.' },
      { word: 'Route', quote: 'Tables and floods discover paths across networks.' },
      { word: 'Transport', quote: 'Ports, handshakes and windows deliver process-to-process.' },
      { word: 'Apps', quote: 'Names resolve and applications speak HTTP, mail and SSH.' },
    ],
  },
  'computer-graphics-visualization': {
    tagline: 'Watch Pixels Appear',
    essence: 'Synthetic cameras, transforms, Phong lighting and raster algorithms — graphics you can see compute.',
    world: 'graphics',
    track: 'Graphics Track · 5th Semester',
    difficulty: 'Core',
    tint: ['#22d3ee', '#a855f7'],
    keywords: ['Pipeline', 'Transforms', 'Phong', 'Clipping', 'Bresenham'],
    chapters: [
      { word: 'Camera', quote: 'A synthetic eye projects the model onto an image plane.' },
      { word: 'Interact', quote: 'Events and display lists drive responsive graphics.' },
      { word: 'Transform', quote: 'Matrices move geometry — and order matters.' },
      { word: 'Light', quote: 'Ambient, diffuse and specular compose a shaded surface.' },
      { word: 'Raster', quote: 'Clipping and pixel algorithms light the framebuffer.' },
    ],
  },
  'unix-system-programming': {
    tagline: 'Inside the Unix Machine',
    essence: 'Shell, permissions, pipes, fork/exec and signals — BCS515C as a living Unix lab.',
    world: 'unix',
    track: 'Systems Track · BCS515C · 5th Semester',
    difficulty: 'Core',
    tint: ['#16a34a', '#111827'],
    keywords: ['Shell', 'Permissions', 'fork/exec', 'IPC', 'Signals'],
    chapters: [
      { word: 'Shell', quote: 'User → Shell → Kernel → Hardware.' },
      { word: 'Control', quote: 'Permissions, pipes and scripts steer the interpreter.' },
      { word: 'Process', quote: 'Files, memory layout and environment shape a process.' },
      { word: 'IPC', quote: 'fork splits; pipes and shared memory reconnect.' },
      { word: 'Daemon', quote: 'Signals arrive; daemons detach and serve.' },
    ],
  },
  'distributed-systems': {
    tagline: 'Many Machines, One System',
    essence: 'RPC, clocks, elections, consensus and replication — BCS515D as a distributed simulator.',
    world: 'distributed',
    track: 'Systems Track · BCS515D · 5th Semester',
    difficulty: 'Advanced',
    tint: ['#4f46e5', '#0f172a'],
    keywords: ['RPC', 'Clocks', 'Consensus', 'Commit', 'Replication'],
    chapters: [
      { word: 'Remote', quote: 'Stubs turn local calls into network messages.' },
      { word: 'Name', quote: 'Files and names are found across machines.' },
      { word: 'Time', quote: 'Logical clocks order events without a shared clock.' },
      { word: 'Agree', quote: 'Nodes elect, exclude and reach consensus.' },
      { word: 'Replicate', quote: 'Transactions commit; replicas converge.' },
    ],
  },

  'software-engineering-project-management': {
    tagline: 'Watch the Software Process Execute',
    essence:
      'From process frameworks and requirements cycles to agile pipelines, stakeholder maps, risk matrices and estimation — VTU BCS501 as a living project studio.',
    world: 'sepm',
    track: 'Engineering Track · BCS501 · 5th Semester',
    difficulty: 'Core',
    tint: ['#1d4ed8', '#0f766e'],
    keywords: ['Process Models', 'Requirements', 'Agile', 'Project Management', 'Quality'],
    chapters: [
      { word: 'Process', quote: 'Software needs an engineered process — not heroic coding alone.' },
      { word: 'Requirements', quote: 'Stakeholder needs become a validated, traceable model.' },
      { word: 'Agility', quote: 'Short cycles absorb change without destroying quality.' },
      { word: 'Management', quote: 'Scope, stakeholders, cost and risk are steered — not hoped for.' },
      { word: 'Quality', quote: 'Quality is planned and effort is estimated with honest ranges.' },
    ],
  },
}

export function getCourseMeta(subjectId) {
  return courseMeta[subjectId] || null
}

/** One chapter identity ({ word, quote }) for a module, framework-wide. */
export function getChapterIdentity(subject, module, index) {
  if (module?.chapter) {
    return {
      word: module.chapter.emotion,
      quote: module.chapter.quote || module.chapter.lead,
      headline: module.chapter.headline,
      beginLabel: module.chapter.beginLabel,
      motif: module.chapter.motif,
    }
  }
  const meta = courseMeta[subject.id]
  const entry = meta?.chapters?.[index]
  return {
    word: entry?.word || module.label,
    quote: entry?.quote || module.description,
    headline: module.title,
    beginLabel: 'Begin Lesson',
  }
}

/** Total interactive lessons (slides) across a subject's modules. */
export function countLessons(subject) {
  return subject.modules.reduce((sum, module) => sum + (module.slides?.length || 0), 0)
}

/** Rough estimated study time from lesson count (~2.5 min per interactive lesson). */
export function estimateStudyTime(lessonCount) {
  const minutes = Math.round(lessonCount * 2.5)
  if (minutes < 60) return `${minutes} min`
  const hours = Math.round(minutes / 30) / 2 // nearest half hour
  return `${hours % 1 === 0 ? hours : hours.toFixed(1)} hrs`
}
