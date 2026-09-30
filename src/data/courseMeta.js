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

  'network-analysis': {
    tagline: 'Watch Circuits Solve Themselves',
    essence:
      'Two conservation laws, one systematic method — nodal and mesh analysis, the network theorems, transients, the s-domain and two-port characterisation. VTU BEC303 built from Hayt 8e.',
    world: 'analog',
    track: 'Electronics Track · BEC303 · 3rd Semester',
    difficulty: 'Core',
    tint: ['#1d4ed8', '#c2410c'],
    keywords: ['Nodal & Mesh', 'Theorems', 'Transients', 'Laplace', 'Two-Port'],
    chapters: [
      { word: 'Solve', quote: 'Two conservation laws generate every equation a network needs.' },
      { word: 'Simplify', quote: 'A theorem earns its place only when it shortens the work.' },
      { word: 'Switch', quote: 'Capacitor voltage and inductor current refuse to jump.' },
      { word: 'Transform', quote: 'Differential equations become algebra in the s-domain.' },
      { word: 'Characterise', quote: 'Four numbers describe a box you are not allowed to open.' },
    ],
  },
  'python-programming': {
    tagline: 'Type It, Run It, Read What It Did',
    essence:
      'From one expression in the shell to a database-backed pipeline — flow control and functions, the four built-in data structures, regular expressions and files, classes of your own, then HTTP, JSON and SQL. VTU BEC305 built from Sweigart, Downey and Severance.',
    world: 'code',
    track: 'Electronics Track · BEC305 · 3rd Semester',
    difficulty: 'Core',
    tint: ['#2563eb', '#0f766e'],
    keywords: ['Flow Control', 'Lists & Dicts', 'Regex & Files', 'Classes', 'Web & SQL'],
    chapters: [
      { word: 'Express', quote: 'Almost every beginner bug is a type, an indent or a scope — not logic.' },
      { word: 'Structure', quote: 'A name is a label on an object, never a box that holds one.' },
      { word: 'Match', quote: 'Describe the shape once and let the engine do the walking.' },
      { word: 'Model', quote: 'Define the type, and the code starts saying what it means.' },
      { word: 'Persist', quote: 'The process ends; the table is still there tomorrow.' },
    ],
  },
  'digital-communication': {
    tagline: 'Send Bits Through Noise, and Win',
    essence:
      'A waveform becomes a point, noise becomes a cloud around it, and every decision after that is geometry. Modulation, the Shannon bound, and the block, cyclic and convolutional codes that close the gap. VTU BEC503 built from Haykin.',
    world: 'signal',
    track: 'Electronics Track · BEC503 · 5th Semester',
    difficulty: 'Advanced',
    tint: ['#0369a1', '#be123c'],
    keywords: ['Signal Space', 'PSK & QAM', 'Entropy & Capacity', 'Block Codes', 'Viterbi'],
    chapters: [
      { word: 'Represent', quote: 'The carrier holds no information — strip it and the waveform becomes a point.' },
      { word: 'Modulate', quote: 'Every error probability in the subject is the area of one Gaussian tail.' },
      { word: 'Bound', quote: 'Shannon tells you a good code exists. He refuses to tell you which one.' },
      { word: 'Protect', quote: 'Linearity is what turns decoding from a search into a table lookup.' },
      { word: 'Decode', quote: 'A discarded path can never come back — that is the whole Viterbi argument.' },
    ],
  },

  'electric-circuit-analysis': {
    tagline: 'Write Fewer Equations, Solve Every Circuit',
    essence:
      'A circuit is a graph, and the whole subject is about writing the smallest set of equations that pins it down. Mesh and node analysis, the theorems that shortcut them, resonance and transients, and Laplace, which does both at once. VTU 1BEE303 built from Nahvi & Edminister and Hayt.',
    world: 'analog',
    track: 'Electrical Track · 1BEE303 · 3rd Semester',
    difficulty: 'Intermediate',
    tint: ['#1d4ed8', '#c2410c'],
    keywords: ['Mesh & Node', 'Thevenin & Norton', 'Resonance', 'Laplace', 'Two-Port'],
    chapters: [
      { word: 'Formulate', quote: 'Count the equations before you write one; the smaller count is the method you want.' },
      { word: 'Shortcut', quote: 'A theorem is not a trick. It is a promise that the rest of the network does not matter.' },
      { word: 'Respond', quote: 'At resonance the supply sees a resistor, and the coil sees twenty times its rating.' },
      { word: 'Transform', quote: 'Laplace does not solve the differential equation. It refuses to let one appear.' },
      { word: 'Encapsulate', quote: 'Four numbers you can multiply beat a schematic you have to redraw.' },
    ],
  },

  'analog-electronics-circuits': {
    tagline: 'Bias It First, Then the Gain Means Something',
    essence:
      'A junction, then a device, then a stage that actually amplifies. Rectifiers and clippers, four ways to bias a transistor against a β you do not control, Bode plots and the Miller effect, feedback and oscillators, and the FETs that took over. VTU 1BEE302 built from Boylestad and Nashelsky.',
    world: 'analog',
    track: 'Electrical Track · 1BEE302 · 3rd Semester',
    difficulty: 'Intermediate',
    tint: ['#7e22ce', '#ea580c'],
    keywords: ['p-n Junction', 'Q-point & Bias', 'Bode & Miller', 'Feedback', 'JFET & MOSFET'],
    chapters: [
      { word: 'Rectify', quote: 'Half the cycle does nothing at all, and that is the whole reason for the bridge.' },
      { word: 'Bias', quote: 'β varies three to one across one batch. A good bias circuit never asks what it is.' },
      { word: 'Amplify', quote: 'Every decibel of gain is paid for in bandwidth, at a rate the device fixed in the factory.' },
      { word: 'Feed back', quote: 'It divides the gain and the uncertainty by the same number — you only wanted one of those.' },
      { word: 'Switch', quote: 'The gate draws nothing, so the resistance it controls costs no current to control.' },
    ],
  },

  'complex-analysis-transforms-optimization': {
    tagline: 'The Mathematics the Rest of the Degree Runs On',
    essence:
      'Analytic functions, where knowing a curve determines a whole region. Fourier and the Z-transform, which turn calculus into algebra. Probability and testing, which turn data into a decision. And linear programming, which walks the corners of a polygon to the best one. VTU 1BMATEE301 built from Kreyszig.',
    world: 'parallel',
    track: 'Electrical Track · 1BMATEE301 · 3rd Semester',
    difficulty: 'Advanced',
    tint: ['#4338ca', '#db2777'],
    keywords: ['Cauchy-Riemann', 'Fourier Series', 'Z-Transform', 'Hypothesis Tests', 'Simplex'],
    chapters: [
      { word: 'Analyse', quote: 'Know an analytic function on any arc and you know it everywhere. No real function is that rigid.' },
      { word: 'Decompose', quote: 'Orthogonality does all the work: multiply by one harmonic and every other term dies.' },
      { word: 'Transform', quote: 'A differential equation is hard. Go round it — down, across, and back up.' },
      { word: 'Infer', quote: 'Failing to reject is not accepting. The test never had the power to prove the null.' },
      { word: 'Optimise', quote: 'The optimum is always at a corner, so there are only ever finitely many places to look.' },
    ],
  },

  'high-voltage-engineering': {
    tagline: 'Insulation Holds, Until It Does Not',
    essence:
      'Breakdown is a threshold, not a slope — Townsend avalanches, the Paschen minimum, and why gas, liquid and solid dielectrics each fail differently. How the lab reaches megavolts with the Cockcroft-Walton multiplier and the Marx generator, and measures them with a sphere gap and a Schering bridge. Where lightning and switching surges come from, and how shielding, earthing and arresters stop them. VTU BEE515A built from Naidu and Kamaraju.',
    world: 'analog',
    track: 'Electrical Track · BEE515A · 5th Semester',
    difficulty: 'Advanced',
    tint: ['#1d4ed8', '#c2410c'],
    keywords: ['Townsend Avalanche', 'Cockcroft-Walton', 'Sphere Gap', 'Lightning & Shielding', 'Schering Bridge'],
    chapters: [
      { word: 'Break', quote: 'Insulation does not degrade gracefully. It holds, and then at a definable threshold it fails in nanoseconds.' },
      { word: 'Generate', quote: 'Charge a capacitor to the peak, then put the source in series with it — that is the entire multiplier idea.' },
      { word: 'Measure', quote: 'It measures by breaking down, reads peak for any waveform, and is the reference the others are calibrated against.' },
      { word: 'Protect', quote: 'The tower flashes over to the line, not the line to the tower — footing resistance sets the threshold.' },
      { word: 'Test', quote: 'Measure without damaging, then trend the result — the change matters more than the absolute value.' },
    ],
  },

  'electric-motor-drive-systems-ev': {
    tagline: 'What the Vehicle Demands, and Which Machine Delivers It',
    essence:
      'The tractive effort a vehicle needs is fixed by physics — rolling resistance, drag and grade — while what it can use is capped by tyre adhesion. Meeting that demand runs through four machine families: direct current, simplest to control but brush limited; induction, robust but paying continuously for its own magnetising current; brushless DC, most efficient but unable to switch off its magnets; and switched reluctance, cheapest and most robust but inherently rippled. VTU BEE613D built from Ehsani, Gao, Gay and Emadi.',
    world: 'analog',
    track: 'Electrical Track · BEE613D · 6th Semester',
    difficulty: 'Advanced',
    tint: ['#1d4ed8', '#15803d'],
    keywords: ['Tractive Effort', 'Field Weakening', 'Four-Quadrant Chopper', 'Field Orientation', 'Switched Reluctance'],
    chapters: [
      { word: 'Resist', quote: 'Tractive effort minus three resistances equals mass times acceleration — and adhesion caps what you can use.' },
      { word: 'Propel', quote: 'Constant torque to base speed, constant power above it — the motor already looks like the ideal traction characteristic.' },
      { word: 'Commutate', quote: 'The commutator is a mechanical inverter. Everything a modern inverter does electronically, it did with brushes.' },
      { word: 'Orient', quote: 'Resolve the current along and across the rotor flux, and an induction machine controls exactly like a DC machine.' },
      { word: 'Switch', quote: 'No windings, no magnets, no conductors — the switched reluctance rotor is nothing but shaped steel.' },
    ],
  },
  'materials-science-metallurgy': {
    tagline: "Structure Decides Everything Else",
    essence:
      "Materials Science and Metallurgy is the argument that every property a part has — its stiffness, its strength, whether it bends or shatters, how long it survives a cyclic load — is a consequence of how its atoms are stacked and what is wrong with that stacking. You start at the unit cell and the defects in it, learn to look at real microstructure and to move atoms through it by diffusion, then read the whole mechanical character of a metal off a single tensile curve. The last half is control: phase diagrams and cooling rates that let you choose a microstructure deliberately, and the three non-metallic families that solve what metals cannot. VTU 1BME302 built from Callister and Rethwisch.",
    world: 'analog',
    track: "Mechanical Track · 1BME302 · 3rd Semester",
    difficulty: 'Intermediate',
    tint: ["#1d4ed8","#c2410c"],
    keywords: ["Unit Cell","Dislocation","Fick's Second Law","Lever Rule","TTT Diagram"],
    chapters: [
      { word: 'Stack', quote: "A perfect crystal would be far stronger than any real metal — it is the defects that let it deform instead of shatter." },
      { word: 'Move', quote: "Atoms move by trading places with vacancies, so diffusion needs both a hole next door and the energy to jump into it." },
      { word: 'Deform', quote: "Slope, first departure, peak and area: one tensile curve names four different properties, and confusing them is how parts fail." },
      { word: 'Transform', quote: "Composition tells you which phases are possible; cooling rate decides which ones you actually get." },
      { word: 'Combine', quote: "When no metal will do, the answer is to stop asking one material to be everything and combine two." },
    ],
  },

  'fluid-mechanics': {
    tagline: "How Fluids Behave When Held Still, Driven, And Compressed",
    essence:
      "Fluid Mechanics is the rigorous study of continuous matter responding to shear and pressure. It builds the mathematical framework to calculate hydrostatic forces, track velocity fields, and predict the energy lost to friction or shock waves. VTU 1BME404 built from Fox, Pritchard and McDonald, Cimbala and Cengel, and White.",
    world: 'analog',
    track: "Mechanical Track · 1BME404 · 4th Semester",
    difficulty: 'Intermediate',
    tint: ["#0ea5e9","#0284c7"],
    keywords: ["Viscosity","Bernoulli Equation","Reynolds Number","Boundary Layer","Mach Number"],
    chapters: [
      { word: 'Hold', quote: "A fluid at rest cannot resist shear stress, meaning every force it exerts must act perpendicular to the surfaces containing it." },
      { word: 'Describe', quote: "By tracking velocity and rotation across a flow field, we can describe fluid motion purely through geometry and continuity." },
      { word: 'Drive', quote: "Energy in a flowing fluid constantly trades between pressure, velocity, and elevation, inevitably losing a fraction to friction." },
      { word: 'Immerse', quote: "Any body immersed in a flow drags a thin, decelerated boundary layer of fluid that ultimately dictates its drag and wake." },
      { word: 'Compress', quote: "Once a fluid approaches the speed of sound, its density fundamentally changes, allowing shock waves to abruptly compress the flow." },
    ],
  },

  'digital-system-design-using-verilog': {
    tagline: "From Abstract Logic To Synthesizable Hardware",
    essence:
      "This subject covers the rigorous design and minimization of digital logic circuits, moving from mathematical Boolean representations to functional components. You will construct combinational and sequential systems, then translate these architectures into code using Verilog HDL. VTU 1BEC302 built from M. Morris Mano and Izad Khormaee.",
    world: 'digital',
    track: "Electronics and Communication · 1BEC302 · 3rd Semester",
    difficulty: 'Foundational',
    tint: ["#2563eb","#1e40af"],
    keywords: ["Karnaugh Maps","Quine-McCluskey","Multiplexers","Flip-Flops","Verilog HDL"],
    chapters: [
      { word: 'Minimization', quote: "We do not build circuits by brute force; we mathematically strip away redundancy until only the essential logic remains." },
      { word: 'MSI', quote: "Instead of wiring individual gates, we orchestrate complete functional blocks like adders and multiplexers to route data." },
      { word: 'Verilog', quote: "Hardware is no longer drawn on paper; it is written as code that defines exactly how electrical signals flow through wires." },
      { word: 'FlipFlops', quote: "By introducing feedback loops, our logic gates break free from being strictly combinational and gain the ability to remember the past." },
      { word: 'Behavioral', quote: "Rather than manually placing every gate, we describe how the hardware should behave and let the tools infer the physical structure." },
    ],
  },

  'additional-mathematics-1': {
    tagline: "Calculus and Linear Algebra for Engineers",
    essence:
      "A refresher mathematics course covering polar curves, partial differentiation, multiple integrals, vector calculus, and linear algebra. It establishes the analytical toolkit required for advanced engineering analysis. VTU 1BMATDIP310 built from B.S. Grewal and Gilbert Strang.",
    world: 'math',
    track: "EC Track · 1BMATDIP310 · 3rd Semester",
    difficulty: 'Foundational',
    tint: ["#2563eb","#1e3a8a"],
    keywords: ["Polar Curves","Partial Derivatives","Multiple Integrals","Vector Calculus","Linear Algebra"],
    chapters: [
      { word: 'Polar', quote: "Polar coordinates replace a rigid grid with distance and direction, allowing us to read a curve's geometry straight from its equation." },
      { word: 'Partial', quote: "Partial derivatives measure how a function changes when we freeze all variables but one, essential for verifying physical PDEs." },
      { word: 'Integral', quote: "Integral reduction formulas trade a complex integration problem for a simpler one of lower order." },
      { word: 'Vector', quote: "Vector calculus unifies the gradient of a scalar field with the divergence and curl of a vector flow." },
      { word: 'Matrices', quote: "Matrices turn systems of equations into a clean row echelon staircase, exposing exactly how many solutions exist." },
    ],
  },

  'kinematics-of-machines': {
    tagline: "Constraining Rigid Links to Deliver Precise Motion",
    essence:
      "Kinematics of Machines analyzes how rigid bars pinned together can be constrained to move in precise, chosen ways. It covers the geometry of linkage mobility, graphical and analytical velocity tracking, and the dynamic forces generated during operation. The course ultimately applies these principles to sizing flywheels and analyzing compound gear trains. VTU 1BME409 built from John J. Uicker Jr., Gordon R. Pennock and Joseph E. Shigley.",
    world: 'systems',
    track: "Mechanical Track · 1BME409 · 4th Semester",
    difficulty: 'Intermediate',
    tint: ["#F59E0B","#D97706"],
    keywords: ["Degrees of Freedom","Instantaneous Centres","Loop-Closure Equations","D'Alembert's Principle","Epicyclic Gear Trains"],
    chapters: [
      { word: 'Count', quote: "Before tracking motion, we count degrees of freedom to determine if our assembly of rigid links can actually move." },
      { word: 'Measure', quote: "We measure instantaneous centers and velocity differences to precisely map how fast each point in the linkage travels." },
      { word: 'Push', quote: "A machine does not merely move; it must push against applied forces, requiring us to solve its static equilibrium analytically." },
      { word: 'Accelerate', quote: "When machine parts accelerate, we must calculate the resulting inertial forces to properly size balancing flywheels." },
      { word: 'Mesh', quote: "To transmit exact rotational speeds, we rely on the continuous mesh of involute gear teeth and epicyclic trains." },
    ],
  },

  'automation-in-manufacturing': {
    tagline: "The Economics and Mechanics of Factory Automation",
    essence:
      "This subject breaks down exactly how a factory replaces manual human effort with machinery. It details the mathematics of production rates, the logic of line balancing, and the hardware of material handling and robotic assembly. From computerized planning to additive manufacturing, it covers the complete architecture of modern production. VTU BME515B built from Mikell P. Groover, Ian Gibson, David W. Rosen and Brent Stucker.",
    world: 'systems',
    track: "Mechanical Track · BME515B · 5th Semester",
    difficulty: 'Intermediate',
    tint: ["#475569","#0f172a"],
    keywords: ["Production Systems","Line Balancing","Material Requirements","Machine Vision","Additive Manufacturing"],
    chapters: [
      { word: 'Frame', quote: "You cannot automate a process until you have mathematically defined its physical limits and production capacity." },
      { word: 'Balance', quote: "A production line's throughput is strictly governed by how evenly its workload is distributed across workstations." },
      { word: 'Plan', quote: "Robots and guided vehicles execute the motion, but material requirements planning dictates the logic." },
      { word: 'Inspect', quote: "Automating production while leaving inspection manual does not increase throughput; it merely relocates the bottleneck." },
      { word: 'Project', quote: "Additive manufacturing shifts the constraint from how complex a part can be machined to how it is digitally sliced." },
    ],
  },

  'analog-electronics-and-linear-integrated-circuits': {
    tagline: "Mastering Signal Amplification and Circuit Design",
    essence:
      "This course explores the physics and practical application of semiconductor devices to amplify and process electrical signals. You will learn to design, analyze, and tune fundamental electronic circuits, moving from single-transistor amplifiers to complex op-amp architectures and feedback systems. VTU 1BEC304 built from Dr. D.C. Tayal, Praveen Tayal.",
    world: 'analog',
    track: "Electronics Track · 1BEC304 · 3rd Semester",
    difficulty: 'Foundational',
    tint: ["#f59e0b","#d97706"],
    keywords: ["BJT","MOSFET","Negative Feedback","Oscillator","Op-Amp"],
    chapters: [
      { word: 'BJT', quote: "The bipolar junction transistor is a current-controlled valve that breathes life into weak signals." },
      { word: 'MOSFET', quote: "The MOSFET uses an invisible electric field to govern the flow of current with near-zero input power." },
      { word: 'Feedback', quote: "By feeding a fraction of the output back to the input, we trade raw gain for absolute circuit stability." },
      { word: 'Power', quote: "When signals must drive physical loads, we move beyond voltage gain into the heavy lifting of power delivery." },
      { word: 'Opamp', quote: "The operational amplifier transforms complex mathematical operations into simple, robust circuit designs." },
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
