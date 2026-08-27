import { Definition, Flow, Lead, Points, ResourceHub, Stage, osSlide } from './OsKit.jsx'
import {
  InterruptScene,
  MemoryMap,
  OperatingSystemMachine,
  UserKernelBoundary,
} from './OsMachine.jsx'
import {
  ConceptHub,
  LayerStack,
  MemoryHierarchy,
  MultiprogTimeline,
  NoteBoard,
  StepFlow,
  Taxonomy,
  TwoWorld,
} from './OsVisual.jsx'
import { Module1Opening, ModuleEnding } from './OsOpenings.jsx'

const S = ['Boot', 'OS', 'Hardware', 'Mode', 'Services', 'Calls', 'Structure', 'VM', 'Boot again']

const k = (t) => `MODULE 1 · ${t}`

function s(cfg, body) {
  return osSlide({ ...cfg, content: body })
}

export const osModule1Slides = [
  s({ id: 'm1-open', kicker: k('INSIDE THE MACHINE'), title: 'The computer wakes', hideTitle: true, composition: 'hero-open', camera: 'wide-system', family: 'kernel-transition', object: 'machine', action: 'watch-boot', film: { chapterOpener: true, hero: true }, notes: 'Cinematic open: hardware, then kernel, then apps.' },
    <Stage composition="hero-open" visual={<Module1Opening />} takeaway="You are about to walk through the machine from power-on to kernel." />),

  s({ id: 'm1-where', kicker: k('ORIENT'), title: 'Where is the operating system?', composition: 'full-stage', camera: 'zoom-cpu', family: 'execution-flow', object: 'kernel', action: 'locate', notes: 'PPT slide 2. OS is the layer between apps and hardware.' },
    <Stage composition="full-stage" visual={<OperatingSystemMachine phase={3} />} takeaway="Not a file on the desktop — it is the layer that owns the hardware.">
      <Lead>Applications never touch the disk, the CPU or the network card directly.</Lead>
    </Stage>),

  s({ id: 'm1-def', kicker: k('DEFINITION'), title: 'What is an operating system?', composition: 'inspect', camera: 'inspect-pcb', family: 'kernel-transition', object: 'definition', action: 'define', notes: 'PPT: intermediary between user and hardware.' },
    <Stage composition="inspect" visual={<LayerStack accent="kernel" caption="The OS is the middle layer — nothing above it reaches the hardware except through it." layers={[{ label: 'User & applications', sub: 'editor · browser · shell' }, { label: 'Operating system', sub: 'intermediary · resource manager' }, { label: 'Hardware', sub: 'CPU · memory · disk · devices', ground: true }]} />} takeaway="System software. Intermediary. Resource manager." exam="Define OS — 2 marks. Write intermediary + resource allocator.">
      <Definition term="Operating system" exam="VTU phrase: intermediary between user and computer hardware.">
        System software that sits between a user of a computer and the computer hardware.
      </Definition>
    </Stage>),

  s({ id: 'm1-views', kicker: k('TWO LENSES'), title: 'User view versus system view', composition: 'dashboard', camera: 'wide-system', family: 'execution-flow', object: 'views', action: 'contrast', notes: 'Standalone, terminals, workstations, handheld vs resource allocator + control program.' },
    <Stage composition="dashboard" story={S} beat={1} visual={<TwoWorld tone="kernel" a={{ title: 'User view', lead: 'How you see the OS depends on where you sit.', points: ['Standalone PC — ease of use', 'Terminals on a mainframe — sharing', 'Handheld — battery, UI, radios'] }} b={{ title: 'System view', lead: 'The machine sees one job to do.', points: ['Resource allocator — CPU, memory, I/O', 'Control program — prevents misuse'] }} />} takeaway="Same OS, two jobs: convenience for users, control of hardware.">
      <Lead>The operating system is one program seen through two very different lenses.</Lead>
    </Stage>),

  s({ id: 'm1-system-view', kicker: k('SYSTEM VIEW'), title: 'Resource allocator and control program', composition: 'full-stage', camera: 'inspect-pcb', family: 'resource-claim', object: 'allocator', action: 'name-roles' },
    <Stage composition="full-stage" visual={<TwoWorld tone="process" split="+" a={{ title: 'Resource allocator', lead: 'Decides who gets what — fairly and efficiently.', points: ['CPU time', 'Memory', 'Files and I/O'] }} b={{ title: 'Control program', lead: 'Prevents errors and improper use.', points: ['Guards privileged operations', 'Especially I/O', 'Keeps one process off another'] }} />} exam="Write both phrases in the definition answer." />),

  s({ id: 'm1-boot', kicker: k('POWER ON'), title: 'Bootstrap: the first program to run', composition: 'pipeline', camera: 'dive-kernel', family: 'kernel-transition', object: 'boot', action: 'sequence' },
    <Stage composition="pipeline" story={S} beat={0} visual={<StepFlow accent="kernel" steps={['Power on', { label: 'ROM bootstrap', note: 'firmware' }, 'Init registers & I/O', 'Load kernel', 'Start init', { label: 'Wait for interrupt', kind: 'ok' }]} />} takeaway="Firmware finds the kernel, loads it, starts init, then waits for interrupts.">
      <Points items={['Bootstrap lives in firmware (ROM)', 'It locates the kernel on disk', 'Kernel is loaded into memory and given the CPU']} />
    </Stage>),

  s({ id: 'm1-irq-cache', kicker: k('ORGANIZATION'), title: 'Interrupts and the cache idea', composition: 'microscope', camera: 'interrupt', family: 'interrupt', object: 'irq', action: 'divert' },
    <Stage composition="microscope" visual={<InterruptScene />} takeaway="Normal execution is a loop; an interrupt is a controlled jump to the OS.">
      <Lead>Hardware does not politely wait. It interrupts.</Lead>
      <Points items={['CPU is diverted to a handler', 'Cache: copy hot data into faster storage', 'Check cache first — hit is cheap, miss copies then uses']} />
    </Stage>),

  s({ id: 'm1-uni', kicker: k('ARCHITECTURE'), title: 'One main CPU — and its helpers', composition: 'split-left', camera: 'wide-system', family: 'cpu-pulse', object: 'cpu', action: 'introduce' },
    <Stage composition="split-left" story={S} beat={2} visual={<ConceptHub accent="navy" center="Main CPU" nodes={['Disk controller', 'Keyboard µC', 'GPU', 'Network card', 'USB controller', 'Audio DSP']} />}>
      <Lead>A single-processor system has one main CPU that runs your instructions.</Lead>
      <Points items={['Devices carry special-purpose processors', 'They are not general CPUs for user work', 'The OS still coordinates every one of them']} />
    </Stage>),

  s({ id: 'm1-mp', kicker: k('ARCHITECTURE'), title: 'Asymmetric versus symmetric multiprocessing', composition: 'dashboard', camera: 'overhead-queue', family: 'comparison-race', object: 'multiprocessor', action: 'contrast' },
    <Stage composition="dashboard" visual={<TwoWorld tone="process" a={{ title: 'Asymmetric', lead: 'One boss, many workers.', points: ['Master CPU runs the OS', 'Slave CPUs run user work only'] }} b={{ title: 'Symmetric (SMP)', lead: 'Every processor is a peer.', points: ['Any CPU runs OS and user code', 'Shared bus, clock, memory', 'Dual-core is SMP on one chip'] }} />} takeaway="SMP is the common modern design. Dual-core is SMP on one chip.">
      <Lead>Two or more processors in close communication — tightly coupled, working in parallel.</Lead>
    </Stage>),

  s({ id: 'm1-cluster', kicker: k('ARCHITECTURE'), title: 'Clustered systems for high availability', composition: 'dashboard', camera: 'pull-timeline', family: 'resource-claim', object: 'cluster', action: 'high-avail' },
    <Stage composition="dashboard" visual={<TwoWorld tone="ok" a={{ title: 'Asymmetric cluster', lead: 'A hot standby watches.', points: ['One node stands by', 'Others run the apps', 'Standby takes over on failure'], tag: 'high availability' }} b={{ title: 'Symmetric cluster', lead: 'All nodes work and watch.', points: ['Every machine runs apps', 'They monitor each other', 'Also: parallel & WAN clusters'], tag: 'high availability' }} />} exam="Define clustered system + the two HA modes.">
      <Lead>Independent systems, networked and sharing software — built so the service stays up.</Lead>
    </Stage>),

  s({ id: 'm1-mpgm', kicker: k('STRUCTURE'), title: 'Multiprogramming keeps the CPU busy', composition: 'full-stage', camera: 'follow-process', family: 'queue-motion', object: 'jobs', action: 'keep-cpu-busy' },
    <Stage composition="full-stage" visual={<MultiprogTimeline />} takeaway="A single job cannot keep CPU and devices busy. Keep several in memory and overlap them.">
      <Lead>Hold a subset of jobs in memory; when one waits on I/O, run another.</Lead>
    </Stage>),

  s({ id: 'm1-time', kicker: k('STRUCTURE'), title: 'Timesharing is interactive multiprogramming', composition: 'dashboard', camera: 'follow-process', family: 'cpu-pulse', object: 'interactive', action: 'switch-fast' },
    <Stage composition="dashboard" visual={<NoteBoard accent="process" eyebrow="Time-sharing" headline="Switch so fast that each user feels alone" points={[{ lead: 'Response under 1 second', rest: '— it feels instant' }, { lead: 'Each user keeps a process in memory' }, { lead: 'Ready jobs need CPU scheduling' }, { lead: 'Too big to fit? swap; virtual memory helps' }]} />} takeaway="The CPU switches so often that every user believes they own the machine." exam="Timesharing = logical extension of multiprogramming." />),

  s({ id: 'm1-dist', kicker: k('STRUCTURE'), title: 'Networks grow by distance', composition: 'map', camera: 'travel-disk', family: 'execution-flow', object: 'network', action: 'share-remote' },
    <Stage composition="map" visual={<Taxonomy accent="kernel" cols={2} groups={[{ label: 'SAN', sub: 'a few feet — storage fabric' }, { label: 'LAN', sub: 'a room, floor or building' }, { label: 'MAN', sub: 'buildings across a city' }, { label: 'WAN', sub: 'offices worldwide' }]} />}>
      <Lead>Independent computers share resources over a communication path — a network.</Lead>
      <Points items={['Distance sets the technology', 'Latency grows with reach', 'Distributed OS hides the boundary']} />
    </Stage>),

  s({ id: 'm1-dual', kicker: k('PROTECTION'), title: 'Dual-mode operation: user and kernel', composition: 'split-right', camera: 'dive-kernel', family: 'kernel-transition', object: 'mode-bit', action: 'protect', storyBeat: 3 },
    <Stage composition="split-right" story={S} beat={3} visual={<UserKernelBoundary crossing />} takeaway="The mode bit is hardware. Privileged instructions trap if user code tries them." exam="System call: user → kernel. Return: kernel → user.">
      <Definition term="Mode bit">Hardware flag: kernel versus user. Distinguishes who is executing.</Definition>
      <Points items={['Privileged instructions only in kernel mode', 'A system call flips the mode', 'Return from the call resets user mode']} />
    </Stage>),

  s({ id: 'm1-timer', kicker: k('PROTECTION'), title: 'The timer stops infinite loops', composition: 'cause-effect', camera: 'pull-timeline', family: 'timeline-build', object: 'timer', action: 'preempt-hog' },
    <Stage composition="cause-effect" story={S} beat={3} visual={<StepFlow accent="wait" steps={['Set counter', 'Process runs', { label: 'Counter hits 0', kind: 'warn' }, { label: 'Timer interrupt', kind: 'fault' }, { label: 'OS regains CPU', kind: 'ok' }]} />} takeaway="Before dispatching a process, the OS arms a timer so it can steal the CPU back." />),

  s({ id: 'm1-proc', kicker: k('RESPONSIBILITIES'), title: 'Process management is the OS job list', composition: 'stack', camera: 'follow-process', family: 'execution-flow', object: 'process', action: 'list-duties' },
    <Stage composition="stack" visual={<NoteBoard accent="process" eyebrow="Process management" headline="Program is passive · process is active" points={[{ lead: 'Create & delete', rest: 'user and system processes' }, { lead: 'Suspend & resume' }, { lead: 'Synchronization' }, { lead: 'Communication' }, { lead: 'Deadlock handling' }]} />} exam="Process is a program in execution — the unit of work." />),

  s({ id: 'm1-mem', kicker: k('RESPONSIBILITIES'), title: 'Memory management decides what lives in RAM', composition: 'inspect', camera: 'memory-dive', family: 'memory-fill', object: 'ram', action: 'track-allocate' },
    <Stage composition="inspect" visual={<MemoryMap />}>
      <Points items={['Track which bytes are used, and by whom', 'Decide what to move in or out', 'Allocate and free space', 'Goal: CPU utilization and response']} />
    </Stage>),

  s({ id: 'm1-files', kicker: k('STORAGE'), title: 'Files hide the physics of disks', composition: 'tree', camera: 'file-tree', family: 'file-tree', object: 'directories', action: 'abstract-disk' },
    <Stage composition="tree" visual={<StepFlow accent="ok" steps={['Physical device', 'Blocks', 'File', 'Directory', 'Access control']} />}>
      <Lead>The OS gives a uniform logical view — the file — then maps it onto secondary storage.</Lead>
      <Points items={['Create/delete files and directories', 'Primitives to read, write, seek', 'Backup onto stable media']} />
    </Stage>),

  s({ id: 'm1-mass', kicker: k('STORAGE'), title: 'Mass-storage management is a speed problem', composition: 'stack', camera: 'travel-disk', family: 'disk-head', object: 'disk', action: 'schedule-free' },
    <Stage composition="stack" visual={<NoteBoard accent="memory" eyebrow="Mass storage" headline="The disk is slow — so the OS schedules it" points={[{ lead: 'Free-space management' }, { lead: 'Storage allocation' }, { lead: 'Disk scheduling', rest: '— minimise head motion' }, { lead: 'Tertiary media', rest: 'tape / optical · WORM vs RW' }]} />} exam="Name three disk OS activities: free-space, allocation, scheduling." />),

  s({ id: 'm1-cache-h', kicker: k('STORAGE'), title: 'Caching, coherency, and copies', composition: 'pipeline', camera: 'memory-dive', family: 'memory-fill', object: 'hierarchy', action: 'coherency' },
    <Stage composition="pipeline" visual={<MemoryHierarchy />}>
      <Lead>Data in use is copied into faster storage. Multiprocessors need cache coherency so every CPU sees the latest value.</Lead>
      <Points items={['Faster = smaller & costlier', 'A hit is cheap; a miss copies then uses', 'Distributed systems: many copies, a protocol problem']} />
    </Stage>),

  s({ id: 'm1-io', kicker: k('I/O'), title: 'The I/O subsystem hides device weirdness', composition: 'dashboard', camera: 'overhead-queue', family: 'queue-motion', object: 'devices', action: 'hide-hardware' },
    <Stage composition="dashboard" visual={<Taxonomy accent="kernel" cols={2} groups={[{ label: 'Buffering', sub: 'hold data while it moves' }, { label: 'Caching', sub: 'hot pieces in fast memory' }, { label: 'Spooling', sub: 'overlap one job with another' }, { label: 'Drivers', sub: 'common interface · per-device code' }]} />}>
      <Lead>One common driver interface, plus a driver for each device, hides the hardware.</Lead>
    </Stage>),

  s({ id: 'm1-svc-user', kicker: k('CHAPTER 2'), title: 'Services that help the user', composition: 'radial', camera: 'wide-system', family: 'execution-flow', object: 'services', action: 'help-user' },
    <Stage composition="radial" story={S} beat={4} visual={<Taxonomy accent="kernel" cols={3} groups={['User interface — CLI / GUI / batch', 'Program execution', 'I/O operations', 'File-system manipulation', 'Communications', 'Error detection']} />} exam="List user-facing OS services for 5 marks.">
      <Lead>One set of OS services exists because a human is trying to get work done.</Lead>
    </Stage>),

  s({ id: 'm1-svc-sys', kicker: k('CHAPTER 2'), title: 'Services that keep the system efficient', composition: 'board', camera: 'inspect-pcb', family: 'resource-claim', object: 'accounting', action: 'protect-share' },
    <Stage composition="board" visual={<Taxonomy accent="process" cols={2} groups={[{ label: 'Resource allocation', sub: 'among concurrent jobs' }, { label: 'Accounting', sub: 'who used what' }, { label: 'Protection', sub: 'processes must not collide' }, { label: 'Security', sub: 'users are who they claim' }]} />}>
      <Lead>Protection is internal access control; security authenticates against outsiders. A chain is only as strong as its weakest link.</Lead>
    </Stage>),

  s({ id: 'm1-cli', kicker: k('INTERFACE'), title: 'CLI shells and GUI desktops', composition: 'dashboard', camera: 'wide-system', family: 'file-tree', object: 'interface', action: 'two-faces' },
    <Stage composition="dashboard" visual={<TwoWorld tone="navy" a={{ title: 'Command line', lead: 'Type a line; the shell runs it.', points: ['Built-in or a separate program', 'Fast, scriptable, precise', 'macOS & Solaris ship UNIX shells'] }} b={{ title: 'Graphical desktop', lead: 'Icons, mouse, folders.', points: ['Xerox PARC idea', 'Windows GUI + cmd', 'macOS Aqua over UNIX'] }} />}>
      <Lead>A command interpreter fetches a line and executes it; a desktop wraps the same calls in pixels.</Lead>
    </Stage>),

  s({ id: 'm1-syscall', kicker: k('SYSTEM CALLS'), title: 'System calls are the programming door', composition: 'pipeline', camera: 'dive-kernel', family: 'kernel-transition', object: 'api', action: 'trap' },
    <Stage composition="pipeline" story={S} beat={5} visual={<UserKernelBoundary crossing />} takeaway="Programs call an API (Win32, POSIX, Java). The library traps into the kernel." exam="Why APIs not raw syscalls? Portability + the C library hides numbers.">
      <Flow items={['C program', 'printf()', 'write() syscall', 'kernel']} />
    </Stage>),

  s({ id: 'm1-readfile', kicker: k('SYSTEM CALLS'), title: 'Win32 ReadFile is a parameter list', composition: 'terminal', camera: 'inspect-pcb', family: 'execution-flow', object: 'ReadFile', action: 'parameters' },
    <Stage composition="terminal" visual={<div className="os-term os-term-big"><div className="cmd">BOOL ReadFile(</div><div>  HANDLE       file,</div><div>  LPVOID       buffer,</div><div>  DWORD        bytesToRead,</div><div>  LPDWORD      bytesRead,</div><div>  LPOVERLAPPED overlapped</div><div className="cmd">);</div><div className="ok">// open · read · write · close</div></div>}>
      <Lead>Copying one file to another is a sequence of open, read, write, close — each a system call under the API.</Lead>
    </Stage>),

  s({ id: 'm1-impl', kicker: k('SYSTEM CALLS'), title: 'A number, a table, a kernel function', composition: 'inspect', camera: 'zoom-cpu', family: 'address-translation', object: 'syscall-table', action: 'number' },
    <Stage composition="inspect" visual={<StepFlow accent="kernel" steps={['User program', 'API call', { label: 'syscall #', note: 'an index' }, 'Dispatch table', 'Kernel function', { label: 'Status back', kind: 'ok' }]} />}>
      <Points items={['Each call has a number', 'The interface indexes a table', 'Caller obeys the API — implementation is hidden', 'Run-time library ships with the compiler']} />
    </Stage>),

  s({ id: 'm1-params', kicker: k('SYSTEM CALLS'), title: 'Three ways to pass parameters', composition: 'cause-effect', camera: 'memory-dive', family: 'memory-fill', object: 'registers', action: 'three-methods' },
    <Stage composition="cause-effect" visual={<Taxonomy accent="memory" cols={3} groups={[{ label: '1 · Registers', sub: 'simplest — but limited count' }, { label: '2 · Block in memory', sub: 'a table; Linux & Solaris' }, { label: '3 · Stack', sub: 'push / pop — unbounded length' }]} />} exam="Draw parameter passing via table.">
      <Lead>Often a call needs more than its identity. Registers run out; blocks and stacks do not.</Lead>
    </Stage>),

  s({ id: 'm1-types', kicker: k('SYSTEM CALLS'), title: 'Six families of system calls', composition: 'radial', camera: 'overhead-queue', family: 'resource-claim', object: 'categories', action: 'classify' },
    <Stage composition="radial" visual={<Taxonomy accent="process" cols={3} groups={['Process control', 'File management', 'Device management', 'Information maintenance', 'Communications', 'Protection']} />} exam="List the six types — very common 5-mark.">
      <Lead>MS-DOS runs one program at a time; FreeBSD runs many. The call families stay the same.</Lead>
    </Stage>),

  s({ id: 'm1-sysprog', kicker: k('SYSTEM PROGRAMS'), title: 'Most users never see a system call', composition: 'stack', camera: 'wide-system', family: 'file-tree', object: 'utilities', action: 'user-view' },
    <Stage composition="stack" visual={<NoteBoard accent="ok" eyebrow="System programs" headline="The OS most people meet is this layer" points={[{ lead: 'File manipulation & status' }, { lead: 'Programming-language support', rest: 'compilers, loaders' }, { lead: 'Loading and execution' }, { lead: 'Communications' }, { lead: 'Application programs' }]} />} />),

  s({ id: 'm1-policy', kicker: k('DESIGN'), title: 'Policy is what. Mechanism is how.', composition: 'dashboard', camera: 'inspect-pcb', family: 'lock-motion', object: 'policy', action: 'separate' },
    <Stage composition="dashboard" story={S} beat={6} visual={<TwoWorld tone="kernel" split="↔" a={{ title: 'Policy — what', lead: 'The decision to make.', points: ['“CPU is shared fairly”', 'Changes with goals', 'Set by administrators'] }} b={{ title: 'Mechanism — how', lead: 'The tools that enforce it.', points: ['Timer + ready queue', 'The dispatcher', 'Stays fixed as policy changes'] }} />} exam="Separation of policy and mechanism = flexibility when policy changes.">
      <Lead>User goals: convenient, safe, fast. System goals: easy to design, maintain, efficient.</Lead>
    </Stage>),

  s({ id: 'm1-msdos', kicker: k('STRUCTURE'), title: 'Simple structure: MS-DOS in one lump', composition: 'microscope', camera: 'zoom-cpu', family: 'execution-flow', object: 'msdos', action: 'no-modules' },
    <Stage composition="microscope" visual={<NoteBoard accent="wait" eyebrow="Simple structure" headline="One program — no walls inside" points={[{ lead: 'Maximum function, minimum space' }, { lead: 'Interfaces & levels not separated' }, { lead: 'A bad program can crash the machine' }, { lead: 'Early UNIX was one fat layer too' }]} />}>
      <Lead>Written for tiny hardware — power at the cost of protection.</Lead>
    </Stage>),

  s({ id: 'm1-layered', kicker: k('STRUCTURE'), title: 'Layered OS: each floor uses only the one below', composition: 'pipeline', camera: 'dive-kernel', family: 'kernel-transition', object: 'layers', action: 'only-below' },
    <Stage composition="pipeline" visual={<LayerStack accent="kernel" caption="A layer may call only the layer beneath it — modular, but rigid." layers={[{ label: 'Layer N — user interface' }, { label: 'File system' }, { label: 'Memory manager' }, { label: 'CPU scheduler' }, { label: 'Layer 0 — hardware', ground: true }]} />} exam="Draw the layered diagram. Bottom = hardware, top = UI.">
      <Points items={['Modularity: a layer uses only lower layers', 'Easier to debug — but rigid, and slower']} />
    </Stage>),

  s({ id: 'm1-unix', kicker: k('STRUCTURE'), title: 'Traditional UNIX: programs plus one fat kernel', composition: 'split-left', camera: 'wide-system', family: 'execution-flow', object: 'unix-kernel', action: 'two-parts' },
    <Stage composition="split-left" visual={<LayerStack accent="navy" caption="Everything below the syscall interface lived in one level — 1970s hardware." layers={[{ label: 'System programs', sub: 'above the syscall interface' }, { label: 'Kernel', sub: 'file system · scheduling · memory · devices' }, { label: 'Hardware', ground: true }]} />}>
      <Points items={['System programs above the syscall interface', 'Kernel: file system, scheduling, memory, devices', 'Limited by 1970s hardware — one level']} />
    </Stage>),

  s({ id: 'm1-micro', kicker: k('STRUCTURE'), title: 'Microkernel: move services to user space', composition: 'dashboard', camera: 'dive-kernel', family: 'kernel-transition', object: 'messages', action: 'move-to-user' },
    <Stage composition="dashboard" visual={<TwoWorld tone="kernel" a={{ title: 'Monolithic', lead: 'Everything inside the kernel.', points: ['Scheduling, FS, drivers in-kernel', 'Fast calls', 'One bug can sink the system'] }} b={{ title: 'Microkernel', lead: 'A tiny trusted core.', points: ['Services run in user space', 'They talk by message passing', 'Reliable, portable — some latency'], tag: 'Mac OS X = Mach + BSD' }} />} exam="Benefits: extend, port, reliable, secure. Cost: user↔kernel messages." />),

  s({ id: 'm1-modules', kicker: k('STRUCTURE'), title: 'Loadable kernel modules', composition: 'radial', camera: 'overhead-queue', family: 'resource-claim', object: 'solaris', action: 'loadable' },
    <Stage composition="radial" visual={<ConceptHub accent="process" center="Core kernel" nodes={['Scheduling', 'File systems', 'Device drivers', 'Networking', 'Crypto', 'Executable formats']} />}>
      <Lead>Object-oriented: each component talks over a known interface and loads only when needed.</Lead>
      <Points items={['Separate components', 'Published interfaces only', 'Loadable at runtime — Solaris is the picture']} />
    </Stage>),

  s({ id: 'm1-vm', kicker: k('VIRTUAL MACHINES'), title: 'A virtual machine pretends to be hardware', composition: 'full-stage', camera: 'pull-timeline', family: 'kernel-transition', object: 'hypervisor', action: 'illusion', film: { hero: true } },
    <Stage composition="full-stage" visual={<LayerStack accent="memory" caption="The VMM gives each guest its own virtual CPU and memory — IBM, 1972." layers={[{ label: 'Guest OS', sub: 'thinks it owns a computer' }, { label: 'Virtual machine monitor', sub: 'hypervisor' }, { label: 'Host operating system' }, { label: 'Hardware', ground: true }]} />} takeaway="Useful for test, consolidation, and OVF portability. VM = layering taken to its conclusion." exam="VM = layered approach taken to its logical conclusion.">
      <Lead>The guest thinks it owns a computer. It owns a slice.</Lead>
    </Stage>),

  s({ id: 'm1-para', kicker: k('VIRTUAL MACHINES'), title: 'Paravirtualization modifies the guest', composition: 'dashboard', camera: 'inspect-pcb', family: 'comparison-race', object: 'guest', action: 'modified-guest' },
    <Stage composition="dashboard" visual={<TwoWorld tone="memory" a={{ title: 'Full virtualization', lead: 'The guest is untouched.', points: ['Sees identical hardware', 'VMware virtualizes it all', 'No guest changes needed'] }} b={{ title: 'Paravirtualization', lead: 'The guest is adapted.', points: ['Sees a similar machine', 'Containers share one kernel', 'JVM virtualizes a language, not an OS'] }} />} />),

  s({ id: 'm1-debug-boot', kicker: k('SYSGEN & BOOT'), title: 'Debug, generate, then boot', composition: 'timeline', camera: 'interrupt', family: 'interrupt', object: 'bootstrap', action: 'load-kernel' },
    <Stage composition="timeline" story={S} beat={8} visual={<StepFlow accent="kernel" steps={['SYSGEN', 'Firmware', 'Boot block', 'Loader', { label: 'Kernel runs', kind: 'ok' }]} />} takeaway="Core dump = process memory. Crash dump = kernel memory. Debugging is twice as hard as writing.">
      <Points items={['SYSGEN records this machine’s hardware', 'Bootstrap loader in ROM finds the kernel', 'Sometimes a boot block loads a bigger loader', 'Power-on starts at a fixed address']} />
    </Stage>),

  s({ id: 'm1-end', kicker: k('CLOSE'), title: 'Module 1 map', composition: 'map', camera: 'wide-system', family: 'execution-flow', object: 'recap', action: 'remember', film: { chapterPayoff: true } },
    <Stage composition="map" visual={<ModuleEnding n={1} />} exam="Draw: dual-mode, syscall path, layered vs microkernel." />),

  s({ id: 'm1-exam', kicker: k('EXAM'), title: 'Questions that keep returning', composition: 'full-stage', camera: 'inspect-pcb', family: 'timeline-build', object: 'questions', action: 'practise' },
    <Stage composition="full-stage" visual={<NoteBoard accent="wait" numbered eyebrow="Most-asked" headline="Rehearse these five" points={[{ lead: 'Define OS', rest: '— user vs system view' }, { lead: 'Dual-mode + timer' }, { lead: 'System-call implementation', rest: '& parameter passing' }, { lead: 'Simple vs layered vs micro vs modules' }, { lead: 'Virtual machines & paravirtualization' }]} />} />),

  s({ id: 'm1-res', kicker: k('STUDY'), title: 'Notes and questions', composition: 'dashboard', camera: 'wide-system', family: 'file-tree', object: 'notes', action: 'continue', film: { finale: true } },
    <Stage composition="dashboard"><ResourceHub moduleId="module-1" /></Stage>),
]
