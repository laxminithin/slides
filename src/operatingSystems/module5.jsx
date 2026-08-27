import { Definition, Flow, Lead, Points, ResourceHub, Stage, osSlide } from './OsKit.jsx'
import {
  DiskGeometry,
  FileAllocationVisualizer,
  FileSystemTree,
} from './OsMachine.jsx'
import { MountScene, NasSan, NoteBoard, StepFlow, Taxonomy, TwoWorld } from './OsVisual.jsx'
import { Module5Opening, ModuleEnding } from './OsOpenings.jsx'
import { DiskHeadScheduler, DiskRace } from './OsSims.jsx'

const S = ['File', 'Directory', 'Share', 'VFS', 'Allocate', 'Free', 'Disk', 'Schedule']
const k = (t) => `MODULE 5 · ${t}`
const s = (cfg, body) => osSlide({ ...cfg, content: body })

export const osModule5Slides = [
  s({ id: 'm5-open', kicker: k('WHERE DATA LIVES'), title: 'From a name to a moving head', composition: 'tree', camera: 'travel-disk', family: 'file-tree', object: 'path', action: 'descend', film: { chapterOpener: true, hero: true } },
    <Stage composition="tree" visual={<Module5Opening />}>
      <Lead>Application → file → directory → filesystem → blocks → platter → head.</Lead>
    </Stage>),

  s({ id: 'm5-file', kicker: k('FILE CONCEPT'), title: 'A file is a named logical storage unit', composition: 'inspect', camera: 'inspect-pcb', family: 'file-tree', object: 'file', action: 'define' },
    <Stage composition="inspect" story={S} beat={0} visual={<FileSystemTree highlight="/" />} exam="File = logical storage unit. Types via extension. Structure: none / record / tree.">
      <Definition term="File">The OS abstraction that hides tracks and sectors — a named collection of related information on secondary storage.</Definition>
    </Stage>),

  s({ id: 'm5-attr', kicker: k('FILE CONCEPT'), title: 'Attributes and operations', composition: 'dashboard', camera: 'inspect-pcb', family: 'execution-flow', object: 'attributes', action: 'list-ops' },
    <Stage composition="dashboard" visual={<TwoWorld tone="ok" a={{ title: 'Attributes', lead: 'What the OS records.', points: ['Name & identifier', 'Type, location, size', 'Protection · timestamps · owner'] }} b={{ title: 'Operations', lead: 'What you can do.', points: ['Create · write · read', 'Reposition · delete · truncate', 'Open maps a name to an entry'] }} />}>
      <Lead>Locks are shared or exclusive — the PPT’s Java file-lock example.</Lead>
    </Stage>),

  s({ id: 'm5-oft', kicker: k('OPEN FILES'), title: 'Open-file tables sit between name and blocks', composition: 'pipeline', camera: 'dive-kernel', family: 'kernel-transition', object: 'oft', action: 'two-tables' },
    <Stage composition="pipeline" visual={<StepFlow accent="kernel" steps={['Pathname', 'Directory', { label: 'FCB / inode' }, 'System OFT', 'Per-process OFT', { label: 'fd', kind: 'ok' }]} />} exam="Open-file count, file pointer, access rights, location on disk.">
      <Lead>Several processes can open the same file; the system-wide table holds the shared truth.</Lead>
    </Stage>),

  s({ id: 'm5-access', kicker: k('ACCESS'), title: 'Sequential, direct, and indexed', composition: 'radial', camera: 'follow-process', family: 'execution-flow', object: 'access', action: 'three-methods' },
    <Stage composition="radial" visual={<Taxonomy accent="process" cols={3} groups={[{ label: 'Sequential', sub: 'read next — no jumping (tape-like)' }, { label: 'Direct / relative', sub: 'position, then read the n-th block' }, { label: 'Indexed', sub: 'a key → pointer map for databases' }]} />}>
      <Lead>How you reach a byte depends on the access method the file supports.</Lead>
    </Stage>),

  s({ id: 'm5-dir', kicker: k('DIRECTORIES'), title: 'A directory is a symbol table for files', composition: 'tree', camera: 'file-tree', family: 'file-tree', object: 'directory', action: 'grow-tree' },
    <Stage composition="tree" story={S} beat={1} visual={<FileSystemTree />} takeaway="Search, create, delete, list, rename, traverse. A disk is partitions, each with a directory.">
      <Lead>Organize for convenience, speed, and two users not colliding on names.</Lead>
    </Stage>),

  s({ id: 'm5-single', kicker: k('DIRECTORIES'), title: 'Single-level: one flat namespace', composition: 'microscope', camera: 'file-tree', family: 'execution-flow', object: 'flat', action: 'show-collision' },
    <Stage composition="microscope" visual={<NoteBoard accent="wait" eyebrow="Single-level directory" headline="Everyone shares one namespace" points={[{ lead: 'All files in one directory' }, { lead: 'Fine for a tiny dedicated system' }, { lead: 'Two users → name collisions' }, { lead: 'No privacy between users' }]} />} />),

  s({ id: 'm5-two', kicker: k('DIRECTORIES'), title: 'Two-level: a directory per user', composition: 'split-left', camera: 'file-tree', family: 'resource-claim', object: 'ufd', action: 'isolate-users' },
    <Stage composition="split-left" visual={<FileSystemTree highlight="faculty" />}>
      <Lead>Master file directory → user file directory. Path names appear — but still no grouping inside one user’s files.</Lead>
    </Stage>),

  s({ id: 'm5-tree-d', kicker: k('DIRECTORIES'), title: 'Tree-structured directories', composition: 'full-stage', camera: 'file-tree', family: 'file-tree', object: 'tree', action: 'mkdir-cd', film: { hero: true } },
    <Stage composition="full-stage" visual={<FileSystemTree highlight="student" />} takeaway="Current directory. Absolute vs relative paths. mkdir, cd. Acyclic by default if no links.">
      <Lead>This is the UNIX picture students already live in.</Lead>
    </Stage>),

  s({ id: 'm5-graph', kicker: k('DIRECTORIES'), title: 'Acyclic graphs, then general graphs', composition: 'dashboard', camera: 'file-tree', family: 'comparison-race', object: 'links', action: 'share-node' },
    <Stage composition="dashboard" visual={<TwoWorld tone="kernel" a={{ title: 'Acyclic graph', lead: 'Sharing without cycles.', points: ['Links / aliases share a file', 'Reference counts', 'Delete when count hits 0'] }} b={{ title: 'General graph', lead: 'Cycles become possible.', points: ['Hard links can form loops', 'Garbage collection, or', 'Cycle detection on traverse'] }} />} exam="Soft link vs hard link. Deleting with a count of 0.">
      <Lead>Sharing is the reason graphs appear. Cycles are the cost.</Lead>
    </Stage>),

  s({ id: 'm5-mount', kicker: k('MOUNTING'), title: 'A filesystem appears at a mount point', composition: 'full-stage', camera: 'wide-system', family: 'kernel-transition', object: 'mount', action: 'attach-volume' },
    <Stage composition="full-stage" visual={<MountScene />} takeaway="Unmounted, a volume is just blocks. Mounted, it hangs off a directory — the mount point." exam="Draw before/after mount.">
      <Lead>A volume’s files stay invisible until it is attached to a directory in the existing tree.</Lead>
    </Stage>),

  s({ id: 'm5-share', kicker: k('SHARING'), title: 'Sharing, remote files, consistency', composition: 'dashboard', camera: 'wide-system', family: 'resource-claim', object: 'nfs', action: 'semantics' },
    <Stage composition="dashboard" story={S} beat={2} visual={<Taxonomy accent="process" cols={3} groups={[{ label: 'Access control', sub: 'user / group IDs' }, { label: 'Remote files', sub: 'NFS-style client / server (RPC)' }, { label: 'Failure modes', sub: 'network vs server crash · stale handles' }, { label: 'UNIX semantics', sub: 'writes visible immediately' }, { label: 'Session semantics', sub: 'visible after close' }, { label: 'Immutable files', sub: 'shared, never changed' }]} />} exam="UNIX semantics vs session semantics vs immutable-shared-files." />),

  s({ id: 'm5-impl', kicker: k('IMPLEMENTATION'), title: 'On-disk structures and the FCB', composition: 'inspect', camera: 'inspect-pcb', family: 'memory-fill', object: 'fcb', action: 'on-disk' },
    <Stage composition="inspect" story={S} beat={3} visual={<NoteBoard accent="memory" eyebrow="On disk & in memory" headline="The FCB is a file’s PCB" points={[{ lead: 'On disk', rest: 'boot block · volume control · directory · FCB' }, { lead: 'FCB / inode', rest: 'permissions · dates · size · block pointers' }, { lead: 'In memory', rest: 'mount table · directory cache' }, { lead: 'Two OFTs', rest: 'system-wide + per-process' }]} />} exam="FCB contents. In-memory: mount table, directory cache, system OFT, per-process OFT.">
      <Lead>A file control block is to a file what a PCB is to a process.</Lead>
    </Stage>),

  s({ id: 'm5-vfs', kicker: k('VFS'), title: 'One API, many file systems', composition: 'pipeline', camera: 'dive-kernel', family: 'kernel-transition', object: 'vfs', action: 'dispatch' },
    <Stage composition="pipeline" visual={<StepFlow accent="kernel" steps={['system call', { label: 'VFS', note: 'vnode layer' }, { label: 'ext4' }, { label: 'NFS' }, { label: 'proc' }]} />}>
      <Lead>The kernel dispatches through a vnode/VFS layer so local and remote files look the same to open, read and write.</Lead>
    </Stage>),

  s({ id: 'm5-dirimpl', kicker: k('DIRECTORY IMPL'), title: 'Linear list versus hash', composition: 'dashboard', camera: 'inspect-pcb', family: 'comparison-race', object: 'dir-impl', action: 'search-cost' },
    <Stage composition="dashboard" visual={<TwoWorld tone="kernel" a={{ title: 'Linear list', lead: 'Simple to build.', points: ['Find is a scan', 'Delete leaves a gap', 'Or compact on delete'] }} b={{ title: 'Hash table', lead: 'Faster lookup.', points: ['Hash the file name', 'Handle collisions', 'Can grow'] }} />} />),

  s({ id: 'm5-cont', kicker: k('ALLOCATION'), title: 'Contiguous: the file is one run of blocks', composition: 'timeline', camera: 'travel-disk', family: 'memory-fill', object: 'contiguous', action: 'one-run' },
    <Stage composition="timeline" story={S} beat={4} visual={<FileAllocationVisualizer mode="contiguous" />} takeaway="Fast sequential I/O — but external fragmentation and you must know the size." exam="Extent-based systems allocate chunks of contiguous blocks.">
      <Lead>Start block + length — like contiguous memory, with the same hole problem.</Lead>
    </Stage>),

  s({ id: 'm5-linked', kicker: k('ALLOCATION'), title: 'Linked: each block points to the next', composition: 'split-right', camera: 'travel-disk', family: 'execution-flow', object: 'linked', action: 'follow-pointers' },
    <Stage composition="split-right" visual={<FileAllocationVisualizer mode="linked" />} takeaway="No external fragmentation. Random access is slow. One broken pointer loses the tail. FAT keeps the links in a table.">
      <Lead>Scattered blocks, a chain between them.</Lead>
    </Stage>),

  s({ id: 'm5-indexed', kicker: k('ALLOCATION'), title: 'Indexed: one block of pointers', composition: 'inspect', camera: 'page-table', family: 'address-translation', object: 'index', action: 'indirect' },
    <Stage composition="inspect" visual={<FileAllocationVisualizer mode="indexed" />} exam="UNIX UFS: 12 direct + indirect + double + triple. 4 KB blocks.">
      <Lead>Random access becomes an array lookup — and the index block can be multi-level, like a page table for a file.</Lead>
    </Stage>),

  s({ id: 'm5-alloc-cmp', kicker: k('ALLOCATION'), title: 'Three methods, one file, one disk', composition: 'race', camera: 'travel-disk', family: 'comparison-race', object: 'three-alloc', action: 'compete', film: { hero: true } },
    <Stage composition="race" visual={<FileAllocationVisualizer mode="contiguous" />} visualB={<FileAllocationVisualizer mode="linked" />} takeaway="Contiguous = run. Linked = scatter+chain. Indexed = scatter+map. Remember the pictures." exam="Compare the three on sequential access, random access, fragmentation." />),

  s({ id: 'm5-free', kicker: k('FREE SPACE'), title: 'Bit vector, linked list, grouping, counting', composition: 'dashboard', camera: 'memory-dive', family: 'memory-fill', object: 'freelist', action: 'track-holes' },
    <Stage composition="dashboard" story={S} beat={5} visual={<Taxonomy accent="memory" cols={2} groups={[{ label: 'Bit vector', sub: '1 = free · fast, needs RAM' }, { label: 'Linked list', sub: 'free blocks chained on disk' }, { label: 'Grouping', sub: 'a free block holds n addresses' }, { label: 'Counting', sub: 'start block + run length' }]} />} exam="Bit vector needs the map in memory for speed.">
      <Lead>Allocation needs a twin: knowing what is free.</Lead>
    </Stage>),

  s({ id: 'm5-mass', kicker: k('MASS STORAGE'), title: 'Magnetic disks: platters, cylinders, sectors', composition: 'full-stage', camera: 'platter-close', family: 'disk-head', object: 'platter', action: 'spin', film: { hero: true } },
    <Stage composition="full-stage" story={S} beat={6} visual={<DiskGeometry />} takeaway="Positioning = seek + rotation. Transfer is the rest. Bandwidth = bytes / total time.">
      <Lead>The head is a physical object. Scheduling is a motion problem.</Lead>
    </Stage>),

  s({ id: 'm5-attach', kicker: k('MASS STORAGE'), title: 'Host-attached, NAS, SAN', composition: 'full-stage', camera: 'wide-system', family: 'resource-claim', object: 'san', action: 'place-storage' },
    <Stage composition="full-stage" visual={<NasSan />} takeaway="NAS shares a file system over the LAN; SAN shares raw blocks over a fabric." exam="NAS vs SAN one-liner." />),

  s({ id: 'm5-sched', kicker: k('DISK SCHEDULING'), title: 'The classic queue: 98 183 37 122 14 124 65 67', composition: 'timeline', camera: 'travel-disk', family: 'disk-head', object: 'queue', action: 'state-problem' },
    <Stage composition="timeline" story={S} beat={7} visual={<DiskHeadScheduler algo="fcfs" />} takeaway="Head starts at 53, cylinders 0–199. Seek time ≈ seek distance. We will race algorithms on this exact queue." exam="Memorise this queue. VTU uses it constantly.">
      <Lead>Access time = seek + rotational latency. Scheduling attacks the seek.</Lead>
    </Stage>),

  s({ id: 'm5-fcfs', kicker: k('FCFS'), title: 'FCFS: 640 cylinders of wandering', composition: 'full-stage', camera: 'travel-disk', family: 'disk-head', object: 'fcfs-head', action: 'watch-seek', film: { hero: true } },
    <Stage composition="full-stage" visual={<DiskHeadScheduler algo="fcfs" />} takeaway="Service in arrival order. Total head movement 640. Simple, not short.">
      <Lead>The head zig-zags because the queue is not sorted.</Lead>
    </Stage>),

  s({ id: 'm5-sstf', kicker: k('SSTF'), title: 'Shortest seek time first — 236', composition: 'split-left', camera: 'travel-disk', family: 'queue-motion', object: 'sstf-head', action: 'greedy' },
    <Stage composition="split-left" visual={<DiskHeadScheduler algo="sstf" />} takeaway="Always pick the nearest request. Like SJF. Far cylinders can starve." exam="SSTF movement = 236 on this queue.">
      <Lead>Greedy beats FCFS — but it is not globally best, and the edges of the disk can wait forever.</Lead>
    </Stage>),

  s({ id: 'm5-scan', kicker: k('SCAN'), title: 'SCAN / elevator: to the end, then reverse', composition: 'stack', camera: 'travel-disk', family: 'disk-head', object: 'scan-head', action: 'elevator' },
    <Stage composition="stack" visual={<DiskHeadScheduler algo="scan" />} takeaway="Sweep to the far end (199), service along the way, then reverse — 331 cylinders. LOOK would stop at the last request instead." exam="SCAN = elevator algorithm.">
      <Lead>Requests behind the head wait for the sweep to return.</Lead>
    </Stage>),

  s({ id: 'm5-cscan', kicker: k('C-SCAN'), title: 'C-SCAN treats the disk as a circle', composition: 'radial', camera: 'travel-disk', family: 'execution-flow', object: 'cscan-head', action: 'wrap' },
    <Stage composition="radial" visual={<DiskHeadScheduler algo="cscan" />}>
      <Lead>Service one way only, then jump back to 0 without serving. More uniform waiting than SCAN. C-LOOK returns only as far as the last request.</Lead>
    </Stage>),

  s({ id: 'm5-clook', kicker: k('C-LOOK'), title: 'C-LOOK: wrap without touching empty ends', composition: 'split-right', camera: 'travel-disk', family: 'disk-head', object: 'clook-head', action: 'wrap-look' },
    <Stage composition="split-right" visual={<DiskHeadScheduler algo="clook" />}>
      <Points items={['Never travel to 0 or 199 unless a request lives there', 'LOOK / C-LOOK are the practical SCAN / C-SCAN', 'Common default: SSTF or LOOK']} />
    </Stage>),

  s({ id: 'm5-race', kicker: k('COMPARE'), title: 'Same queue, four motions, four distances', composition: 'race', camera: 'travel-disk', family: 'comparison-race', object: 'disk-race', action: 'compete', film: { hero: true } },
    <Stage composition="race" visual={<DiskRace />} visualB={<DiskHeadScheduler algo="sstf" />} takeaway="FCFS 640 · SSTF 236 · SCAN 331 · C-LOOK 322. Greedy and elevator both beat arrival order. Keep the scheduler a replaceable module." exam="Select an algorithm: SSTF common; SCAN/C-SCAN under load." />),

  s({ id: 'm5-mgmt', kicker: k('DISK MGMT'), title: 'Format, partition, boot, spare the bad', composition: 'pipeline', camera: 'platter-close', family: 'kernel-transition', object: 'format', action: 'prepare-disk' },
    <Stage composition="pipeline" visual={<StepFlow accent="kernel" steps={['Low-level format', 'Partition', 'Logical format', 'Boot block', { label: 'Sector sparing', kind: 'warn' }]} />}>
      <Points items={['Physical formatting writes sectors the controller understands', 'Clusters group blocks for file I/O', 'A boot block in ROM loads from a fixed place', 'Bad blocks remapped by sector sparing']} />
    </Stage>),

  s({ id: 'm5-end', kicker: k('CLOSE'), title: 'Module 5 map', composition: 'map', camera: 'wide-system', family: 'execution-flow', object: 'recap', action: 'remember', film: { chapterPayoff: true } },
    <Stage composition="map" visual={<ModuleEnding n={5} />} />),

  s({ id: 'm5-exam', kicker: k('EXAM'), title: 'Questions that keep returning', composition: 'full-stage', camera: 'inspect-pcb', family: 'timeline-build', object: 'questions', action: 'practise' },
    <Stage composition="full-stage" visual={<NoteBoard accent="wait" numbered eyebrow="Most-asked" headline="Rehearse these five" points={[{ lead: 'File attributes, open-file data, directories' }, { lead: 'Contiguous vs linked vs indexed', rest: '(draw the same file)' }, { lead: 'VFS + FCB' }, { lead: 'Disk scheduling', rest: 'on 98,183,37,122,14,124,65,67 head 53' }, { lead: 'NAS vs SAN', rest: '· booting from disk' }]} />} />),

  s({ id: 'm5-res', kicker: k('STUDY'), title: 'Notes and questions', composition: 'dashboard', camera: 'wide-system', family: 'file-tree', object: 'notes', action: 'continue', film: { finale: true } },
    <Stage composition="dashboard"><ResourceHub moduleId="module-5" /></Stage>),
]
