import './parallelComputing.css'
import './pcComposition.css'
import { OpeningM5 } from './components/ParallelOpenings'
import {
  CpuVsGpu, GpuPackage, GpuThreadHierarchy,
  HostDeviceTransfer, WarpDivergence, OccupancyMeter,
  MemoryCoalescing, KernelLaunchScene, SharedVsGlobal,
  GpuAwakening, StreamingMultiprocessor, GpuMemoryTower,
} from './components/GpuViz'

const roadmap = [
  'Opening',
  'GPU Basics',
  'GPU Architecture',
  'Compute Capability',
  'Threads',
  'CUDA Memory',
  'Vector Addition',
  'Trapezoidal I',
  'Trapezoidal II',
  'Trapezoidal III',
  'Performance',
  'Correctness',
  'Summary',
]

const sourceNote = 'Source: VTU_BCS702_Module_5_CUDA.pptx in the workspace.'

function slide({ id, title, subtitle, content, notes, hideTitle = true }) {
  return { id, kicker: 'VTU BCS702 | Module 5', title, subtitle, content, notes, hideTitle }
}

function Roadmap({ section }) {
  return (
    <nav className="pc-m5-roadmap" aria-label="Module 5 roadmap">
      {roadmap.map((item) => <span key={item} className={item === section ? 'active' : ''}>{item}</span>)}
    </nav>
  )
}

function Points({ items }) {
  return (
    <ul className="pc-m5-points">
      {items.map((item) => <li key={item}>{item}</li>)}
    </ul>
  )
}

function Flow({ items, tone = 'blue' }) {
  return (
    <div className={`pc-m5-flow ${tone}`}>
      {items.map((item, index) => <span key={`${item}-${index}`} style={{ '--i': index }}>{item}</span>)}
    </div>
  )
}

function Code({ children, label = 'CUDA CODE' }) {
  return (
    <pre className="pc-m5-code">
      <b>{label}</b>
      <code>{children}</code>
    </pre>
  )
}

function Definition({ term, children }) {
  return (
    <div className="pc-m5-definition">
      <span>Definition</span>
      <strong>{term}</strong>
      <p>{children}</p>
    </div>
  )
}

function Compare({ leftTitle, rightTitle, left, right }) {
  return (
    <div className="pc-m5-compare">
      <article><h3>{leftTitle}</h3><Points items={left} /></article>
      <article><h3>{rightTitle}</h3><Points items={right} /></article>
    </div>
  )
}

function ConceptGrid({ items }) {
  return (
    <div className="pc-m5-concepts">
      {items.map(([title, body, tone], index) => (
        <article key={title} className={tone || ''} style={{ '--i': index }}>
          <strong>{title}</strong>
          <span>{body}</span>
        </article>
      ))}
    </div>
  )
}

function HostDevice({ stage = 'launch', host = ['h_a', 'h_b', 'h_c'], device = ['d_a', 'd_b', 'd_c'], lanes = ['cudaMemcpy H->D', 'kernel launch', 'cudaMemcpy D->H'] }) {
  return (
    <div className={`pc-m5-host-device ${stage}`}>
      <article className="host">
        <b>CPU Host</b>
        <span>control code</span>
        <span>memory allocation</span>
        {host.map((item) => <em key={item}>{item}</em>)}
      </article>
      <div className="lanes">
        {lanes.map((lane, index) => <i key={lane} style={{ '--i': index }}>{lane}</i>)}
      </div>
      <article className="device">
        <b>GPU Device</b>
        <span>global memory</span>
        <span>SMs, blocks, threads</span>
        {device.map((item) => <em key={item}>{item}</em>)}
      </article>
    </div>
  )
}

function GpuBoard({ mode = 'active' }) {
  return (
    <div className={`pc-m5-gpu-board ${mode}`}>
      <div className="board">
        <strong>NVIDIA GPU</strong>
        <section>
          {[0, 1, 2, 3].map((sm) => (
            <article key={sm} style={{ '--i': sm }}>
              <b>SM {sm}</b>
              <span>warp scheduler</span>
              <span>CUDA cores</span>
              <span>shared memory</span>
            </article>
          ))}
        </section>
        <footer>global memory</footer>
      </div>
    </div>
  )
}

function SmVisual() {
  return (
    <div className="pc-m5-sm">
      <strong>Streaming Multiprocessor</strong>
      <div className="scheduler">warp scheduler</div>
      <div className="cores">{Array.from({ length: 16 }).map((_, i) => <span key={i} />)}</div>
      <article>register file</article>
      <article>shared memory</article>
      <b>active warps issue instructions to CUDA cores</b>
    </div>
  )
}

function HierarchyVisual({ highlight = 2 }) {
  return (
    <div className="pc-m5-hierarchy">
      <section className="grid"><b>Grid</b>
        {[0, 1, 2].map((block) => (
          <article key={block} className={block === highlight ? 'active' : ''}>
            <strong>Block {block}</strong>
            <div>{Array.from({ length: 12 }).map((_, tid) => <span key={tid} className={block === highlight && tid === 7 ? 'hot' : ''}>t{tid}</span>)}</div>
          </article>
        ))}
      </section>
    </div>
  )
}

function IndexMath() {
  return (
    <div className="pc-m5-index-math">
      <span>blockIdx.x = 2</span>
      <span>blockDim.x = 256</span>
      <span>threadIdx.x = 7</span>
      <strong>i = 2 * 256 + 7 = 519</strong>
      <b>Thread 519 updates weather cell c[519]</b>
    </div>
  )
}

function MemoryPyramid() {
  return (
    <div className="pc-m5-memory-pyramid">
      {[
        ['Registers', 'thread private, fastest'],
        ['Shared memory', 'block scope, fast cooperation'],
        ['Constant / texture', 'cached read-only spaces'],
        ['Global memory', 'large device memory, higher latency'],
        ['Host memory', 'CPU memory, transfer required'],
      ].map(([name, detail], index) => <article key={name} style={{ '--i': index }}><strong>{name}</strong><span>{detail}</span></article>)}
    </div>
  )
}

function ArraysVisual({ mode = 'vector' }) {
  const labels = mode === 'partial' ? ['partial[0]', 'partial[1]', 'partial[2]', 'partial[3]', 'partial[4]', 'partial[5]', 'partial[6]', 'partial[7]'] : ['0', '1', '2', '3', '4', '5', '6', '7']
  return (
    <div className={`pc-m5-arrays ${mode}`}>
      {mode === 'vector' && ['a[i]', 'b[i]', 'c[i]'].map((row, r) => (
        <div key={row}><b>{row}</b>{labels.map((label, i) => <span key={`${row}-${label}`} style={{ '--i': i }}>{r === 2 ? `c${label}` : `${row[0]}${label}`}</span>)}</div>
      ))}
      {mode !== 'vector' && <div><b>{mode === 'partial' ? 'partial values' : 'block sums'}</b>{labels.map((label, i) => <span key={label} style={{ '--i': i }}>{label}</span>)}</div>}
    </div>
  )
}

function ReductionTree({ multiWarp = false }) {
  const rows = multiWarp ? [['warp 0 sum', 'warp 1 sum', 'warp 2 sum', 'warp 3 sum'], ['shared memory warp sums'], ['block sum']] : [['t0', 't1', 't2', 't3', 't4', 't5', 't6', 't7'], ['4 sums'], ['2 sums'], ['1 block sum']]
  return (
    <div className={`pc-m5-reduction ${multiWarp ? 'multi' : ''}`}>
      {rows.map((row, r) => (
        <section key={row.join('-')} style={{ '--r': r }}>
          {row.map((cell) => <span key={cell}>{cell}</span>)}
        </section>
      ))}
    </div>
  )
}

function Trapezoids() {
  return (
    <svg className="pc-m5-trap" viewBox="0 0 620 360" role="img" aria-label="Trapezoidal rule mapped to CUDA threads">
      <path className="axis" d="M70 304 H560 M90 318 V54" />
      <path className="area" d="M96 282 C166 126, 236 116, 304 192 S442 266, 532 76 L532 304 L96 304 Z" />
      <path className="curve" d="M96 282 C166 126, 236 116, 304 192 S442 266, 532 76" />
      {Array.from({ length: 9 }).map((_, i) => <path key={i} className="slice" d={`M${96 + i * 54.5} 304 V${i % 2 ? 168 : 236}`} />)}
      {Array.from({ length: 8 }).map((_, i) => <text key={i} x={124 + i * 54.5} y="336" textAnchor="middle">t{i}</text>)}
      <text x="310" y="38" textAnchor="middle">weather integral: many f(x) evaluations</text>
    </svg>
  )
}

function TimingBars({ total = false }) {
  return (
    <div className={`pc-m5-timing ${total ? 'total' : ''}`}>
      <article><strong>CPU serial</strong><span className="cpu">one long loop</span></article>
      <article>
        <strong>GPU application</strong>
        <span className="alloc">allocation</span>
        <span className="h2d">{'H->D'}</span>
        <span className="kernel">kernel</span>
        <span className="d2h">{'D->H'}</span>
      </article>
    </div>
  )
}

function DivergenceVisual() {
  return (
    <div className="pc-m5-divergence">
      <article><strong>Uniform branch</strong>{Array.from({ length: 8 }).map((_, i) => <span key={i}>IF</span>)}<b>one path</b></article>
      <article><strong>Divergent branch</strong>{Array.from({ length: 8 }).map((_, i) => <span key={i} className={i % 2 ? 'else' : ''}>{i % 2 ? 'ELSE' : 'IF'}</span>)}<b>paths serialize</b></article>
    </div>
  )
}

function CoalescingVisual() {
  return (
    <div className="pc-m5-coalescing">
      <article><strong>Coalesced</strong>{Array.from({ length: 8 }).map((_, i) => <span key={i}>a[{i}]</span>)}<b>grouped transaction</b></article>
      <article><strong>Scattered</strong>{[0, 9, 2, 17, 4, 25, 6, 33].map((i) => <span key={i}>a[{i}]</span>)}<b>multiple transactions</b></article>
    </div>
  )
}

function MindMap() {
  return (
    <div className="pc-m5-mindmap">
      <strong>CUDA Module 5</strong>
      {['GPGPU', 'GPU architecture', 'Compute capability', 'Grid / block / thread', 'CUDA memory', 'Vector addition', 'Trapezoidal I', 'Trapezoidal II', 'Trapezoidal III', 'Performance', 'Correctness'].map((item, index) => (
        <span key={item} style={{ '--i': index }}>{item}</span>
      ))}
    </div>
  )
}

function SlideView({ section, title, subtitle, points = [], visual, code, codeLabel, definition, flow, compare, dense = false, tone, composition = '' }) {
  return (
    <div className={`pc-m5-slide ${dense ? 'dense' : ''} ${composition}`.trim()}>
      <Roadmap section={section} />
      <div className="pc-m5-body">
        <section className="pc-m5-copy">
          <span className="pc-m5-section">{section}</span>
          <h2>{title}</h2>
          {subtitle && <p>{subtitle}</p>}
          {definition && <Definition term={definition[0]}>{definition[1]}</Definition>}
          {flow && <Flow items={flow} tone={tone} />}
          {points.length > 0 && <Points items={points} />}
        </section>
        <section className="pc-m5-visual">
          {code ? <Code label={codeLabel}>{code}</Code> : compare ? <Compare {...compare} /> : visual}
        </section>
      </div>
    </div>
  )
}

function DividerView({ number, section, title, subtitle, visual }) {
  return (
    <div className="pc-m5-slide pc-m5-divider pc-comp-hero">
      <Roadmap section={section} />
      <div>
        <span>{number}</span>
        <h2>{title}</h2>
        <p>{subtitle}</p>
      </div>
      {visual || <GpuPackage />}
    </div>
  )
}

const rawSlides = [
  { section: 'Opening', title: 'Parallel Computing Module 5', subtitle: 'One CPU cannot finish this workload — program thousands of processors', flow: ['CPU prepares weather data', 'Copy to GPU memory', 'Launch kernel grid', 'Thousands of threads compute', 'Result returns to CPU'], points: ['CUDA turns a host-controlled C/C++ program into massively parallel work on an NVIDIA GPU.', 'Module 5 answers how the CPU sends real work to the GPU and gets the result back.', 'Scenario: Weather Simulation on a CPU-GPU workstation.'], visual: <OpeningM5 />, composition: 'pc-comp-hero' },
  { section: 'Opening', title: 'Module 5 learning journey', subtitle: 'The source syllabus becomes one host-device programming story.', flow: ['GPUs and GPGPU', 'heterogeneous computing', 'GPU architecture', 'compute capability', 'threads/blocks/grids', 'vector addition', 'returning results', 'trapezoidal I', 'trapezoidal II', 'trapezoidal III'], visual: <GpuAwakening />, composition: 'pc-comp-visual-first' },
  { section: 'Opening', title: 'Why CUDA?', subtitle: 'How do we turn one loop into thousands of parallel GPU threads?', flow: ['CPU controls program', 'Data copied to GPU', 'GPU runs kernel', 'Result copied back', 'CPU continues'], points: ['The CPU host owns input, allocation, kernel launch, synchronization and final output.', 'The GPU device executes data-parallel kernels over many independent weather cells.', 'The program is heterogeneous because two different processor types cooperate.'], visual: <CpuVsGpu />, composition: 'pc-comp-compare' },
  { divider: true, number: '02', section: 'GPU Basics', title: 'GPGPU Computing', subtitle: 'Use graphics hardware for general-purpose parallel work.', visual: <CpuVsGpu /> },
  { section: 'GPU Basics', title: 'What is GPGPU?', subtitle: 'Graphics processors are used for non-graphics computation.', definition: ['GPGPU', 'General-purpose GPU computing uses graphics processors for non-graphics, data-parallel computation.'], points: ['Scientific simulation, image processing, machine learning, signal processing and numerical analysis are natural examples.', 'The weather grid has many similar cells, so it fits the data-parallel model.', 'Throughput matters more than single-thread latency.'], visual: <ConceptGrid items={[['Scientific simulation', 'many independent equations'], ['Image processing', 'same operation over pixels'], ['Machine learning', 'matrix and vector work'], ['Numerical analysis', 'many f(x) evaluations']]} />, composition: 'pc-comp-quiet' },
  { section: 'GPU Basics', title: 'CPU vs GPU thinking', subtitle: 'Compare control and throughput before choosing CUDA.', points: ['CPU: few powerful cores, branching and control, large caches, low-latency focus.', 'GPU: many simpler cores, data parallelism, high memory bandwidth, throughput focus.', 'Example: OS control stays on CPU; vector addition belongs on GPU.'], visual: <CpuVsGpu />, composition: 'pc-comp-compare' },
  { section: 'GPU Basics', title: 'Heterogeneous computing', subtitle: 'Different processor types cooperate in one application.', definition: ['Heterogeneous computing', 'Using different processor types together, typically CPU for control-heavy work and GPU for massively parallel kernels.'], flow: ['CPU Host', 'control-heavy work', 'GPU Device', 'massively parallel kernels', 'specialized result'], visual: <HostDeviceTransfer stage="launch" />, composition: 'pc-comp-reverse' },
  { section: 'GPU Basics', title: 'Complete CUDA workflow', subtitle: 'The full host-device process stays visible.', flow: ['Host allocates memory', 'cudaMalloc on device', 'cudaMemcpy HostToDevice', 'Kernel launch', 'cudaDeviceSynchronize', 'cudaMemcpy DeviceToHost', 'cudaFree'], points: ['This is the memory path students should trace in every CUDA program.', 'Transfers are explicit because host and device memory are separate.', 'Kernel launch starts GPU work from CPU host code.'], visual: <HostDeviceTransfer stage="workflow" />, composition: 'pc-comp-timeline' },
  { divider: true, number: '03', section: 'GPU Architecture', title: 'GPU Architecture', subtitle: 'Open the silicon — look inside a Streaming Multiprocessor.', visual: <StreamingMultiprocessor /> },
  { section: 'GPU Architecture', title: 'GPU architecture overview', subtitle: 'From package to threads — the digital factory.', flow: ['GPU', 'Streaming Multiprocessors', 'CUDA cores', 'Warps', 'Threads'], points: ['Global memory is the warehouse.', 'Shared memory is the workbench beside the crew.', 'Registers hold private per-thread values.', 'Warp schedulers issue to marching squads of 32.'], visual: <GpuPackage />, composition: 'pc-comp-exploded' },
  { section: 'GPU Architecture', title: 'Streaming multiprocessor', subtitle: 'You are looking inside the silicon.', points: ['Warp scheduler issues one instruction to 32 lockstep lanes.', 'CUDA cores execute arithmetic on the factory floor.', 'Shared memory is the workbench for the block.', 'Registers, LSUs and SFUs complete the SM.'], visual: <StreamingMultiprocessor />, composition: 'pc-comp-exploded' },
  { section: 'GPU Architecture', title: 'SIMT execution', subtitle: 'One instruction stream — many thread instances.', definition: ['SIMT', 'Single Instruction Multiple Threads means many threads execute the same instruction stream, while each thread has its own data and registers.'], flow: ['same kernel instruction', 'many threads', 'different array elements'], points: ['The same VecAdd instruction runs for c[0], c[1], c[2] and many more cells.', 'Each thread has its own index and register values.'], visual: <GpuThreadHierarchy />, composition: 'pc-comp-visual-first' },
  { section: 'GPU Architecture', title: 'Warp', subtitle: 'A marching squad of 32 threads.', definition: ['Warp', 'A group of CUDA threads scheduled together.'], points: ['Threads ideally follow the same execution path.', 'A warp commonly contains 32 threads.', 'Warp-level progress is efficient when control flow is uniform.'], visual: <GpuThreadHierarchy />, composition: 'pc-comp-hero' },
  { section: 'GPU Architecture', title: 'Divergence', subtitle: 'When the marching squad splits, you pay for both paths.', points: ['32 threads share one instruction.', 'A branch masks half while the other runs.', 'Then the waiting half serializes — warp time ≈ THEN + ELSE.', 'Never forget: divergence turns one instruction into a queue.'], visual: <WarpDivergence />, composition: 'pc-comp-compare' },
  { section: 'GPU Architecture', title: 'GPU memory hierarchy', subtitle: 'Why nearby workers are faster than remote workers.', points: ['Registers: workbench (~1 cycle).', 'Shared memory: factory shelf for the crew.', 'L1/L2: nearer chip caches.', 'Global: warehouse. Host: remote storage across PCIe.'], visual: <GpuMemoryTower />, composition: 'pc-comp-visual-first' },
  { section: 'GPU Architecture', title: 'Memory transfer cost', subtitle: 'PCIe is a high-speed freight corridor — and it is never free.', flow: ['Host array', 'cudaMemcpy to device', 'Kernel uses data', 'cudaMemcpy to host', 'CPU uses result'], points: ['Host-device movement is not free.', 'The weather simulation should copy input once, do enough GPU work, then return final results.', 'Total application timing must include transfer cost when comparing CPU and GPU.'], visual: <HostDeviceTransfer stage="transfer" />, composition: 'pc-comp-timeline' },
  { divider: true, number: '04', section: 'Compute Capability', title: 'Compute Capability', subtitle: 'What features and limits does this GPU support?', visual: <OccupancyMeter occupied={0.75} /> },
  { section: 'Compute Capability', title: 'NVIDIA compute capability', subtitle: 'More than a version number.', definition: ['Compute capability', 'A version number that describes the features supported by an NVIDIA GPU architecture.'], points: ['Major/minor version identifies architecture generation.', 'It controls supported hardware features and compatibility.', 'It exposes resource limits that affect launch configuration.', 'It guides optimization decisions for CUDA code.'], visual: <ConceptGrid items={[['major/minor', 'architecture version'], ['features', 'hardware support'], ['limits', 'threads and memory'], ['optimization', 'resource-aware tuning']]} />, composition: 'pc-comp-quiet' },
  { section: 'Compute Capability', title: 'Device properties', subtitle: 'Check the hardware before assuming launch limits.', points: ['Maximum threads per block.', 'Maximum block dimensions.', 'Maximum grid dimensions.', 'Shared memory per block.', 'Number of streaming multiprocessors.', 'Warp size and memory limits.'], visual: <OccupancyMeter occupied={0.5} />, composition: 'pc-comp-dashboard' },
  { section: 'Compute Capability', title: 'Query device properties', subtitle: 'Host code asks CUDA runtime for device limits.', codeLabel: 'HOST CODE', code: 'cudaDeviceProp prop;\ncudaGetDeviceProperties(&prop, 0);\n\nprintf("Name: %s\\n", prop.name);\nprintf("Max threads/block: %d\\n",\n       prop.maxThreadsPerBlock);', points: ['Read CUDA code by finding host memory, device memory, memory copies, kernel launch and synchronization.', 'Device property output explains why a chosen block size is legal or illegal.'] },
  { divider: true, number: '05', section: 'Threads', title: 'CUDA Execution Hierarchy', subtitle: 'The host writes the work order — the grid is the industrial floor.', visual: <KernelLaunchScene /> },
  { section: 'Threads', title: 'Hierarchy', subtitle: 'A kernel launch creates many kernel instances.', definition: ['CUDA execution hierarchy', 'A grid is all blocks launched by one kernel call; a block is a group of cooperating threads; a thread executes one instance of kernel code.'], points: ['Grid: complete launch for the weather kernel.', 'Block: cooperation unit that may use shared memory.', 'Thread: owns registers and handles one element or trapezoid contribution.'], visual: <GpuThreadHierarchy />, composition: 'pc-comp-hero' },
  { section: 'Threads', title: 'CUDA built-in indices', subtitle: 'Each thread can identify its position.', points: ['gridDim describes grid dimensions.', 'blockIdx identifies the current block.', 'blockDim describes block dimensions.', 'threadIdx identifies the current thread inside the block.', 'Together they produce the global index.'], visual: <KernelLaunchScene />, composition: 'pc-comp-visual-first' },
  { section: 'Threads', title: 'Global thread index', subtitle: 'Map a thread to one array element.', codeLabel: 'DEVICE CODE', code: 'int i = blockIdx.x * blockDim.x + threadIdx.x;', points: ['This is the source formula for one-dimensional CUDA indexing.', 'Example: blockIdx.x = 2, blockDim.x = 256, threadIdx.x = 7, so i = 519.', 'Thread 519 maps to weather array element 519.'], visual: <IndexMath />, composition: 'pc-comp-quiet' },
  { section: 'Threads', title: 'Boundary guard', subtitle: 'Extra launched threads must not access invalid memory.', codeLabel: 'DEVICE CODE', code: 'if (i < n) {\n    c[i] = a[i] + b[i];\n}', points: ['If 1024 threads are launched for 1000 useful elements, 24 extra threads exist.', 'The guard prevents out-of-bounds access.', 'Correct CUDA kernels check the global index before using arrays.'], visual: <ConceptGrid items={[['Launched', '1024 threads'], ['Useful', '1000 elements'], ['Extra', '24 threads', 'warn'], ['Guard', 'i < n prevents invalid access', 'ok']]} />, composition: 'pc-comp-quiet' },
  { section: 'Threads', title: 'Choosing block and grid size', subtitle: 'Cover all elements while keeping the guard.', flow: ['Choose threadsPerBlock', 'Compute blocksPerGrid', 'Launch kernel', 'Guard i < n', 'Cover all elements'], points: ['threadsPerBlock is the number of threads inside each block.', 'blocksPerGrid must round up so every weather element has a possible thread.', 'The guard handles the final partially filled block.'], visual: <KernelLaunchScene />, composition: 'pc-comp-timeline' },
  { section: 'Threads', title: 'Launch configuration', subtitle: 'The CPU host configures the kernel grid.', codeLabel: 'HOST CODE | KERNEL LAUNCH', code: 'int threadsPerBlock = 256;\n\nint blocksPerGrid =\n    (n + threadsPerBlock - 1)\n    / threadsPerBlock;\n\nVecAdd<<<blocksPerGrid,\n         threadsPerBlock>>>\n       (d_a, d_b, d_c, n);', points: ['blocksPerGrid is the number of blocks.', 'threadsPerBlock is the number of threads in each block.', 'Triple chevrons launch the named kernel with device-pointer arguments.'] },
  { divider: true, number: '06', section: 'CUDA Memory', title: 'CUDA Memory Workflow', subtitle: 'Allocate. Copy. Compute. Return. Free.', visual: <HostDeviceTransfer stage="workflow" /> },
  { section: 'CUDA Memory', title: 'Host and device pointers', subtitle: 'Host memory and device memory are separate address spaces.', points: ['h_a points to CPU host memory.', 'd_a points to GPU device memory.', 'A host pointer should not be used inside a kernel.', 'A device pointer must be allocated before GPU code writes to it.'], visual: <HostDeviceTransfer stage="copy" />, composition: 'pc-comp-reverse' },
  { section: 'CUDA Memory', title: 'cudaMalloc and cudaFree', subtitle: 'Allocate and release device memory.', codeLabel: 'HOST CODE | DEVICE ALLOCATION', code: 'float *d_a;\n\ncudaMalloc((void**)&d_a,\n           n * sizeof(float));\n\n/* GPU uses d_a */\n\ncudaFree(d_a);', points: ['cudaMalloc reserves memory in GPU device memory.', 'cudaFree releases the allocation.', 'The CPU host controls allocation even though the pointer refers to device memory.'] },
  { section: 'CUDA Memory', title: 'cudaMemcpy directions', subtitle: 'The direction constant must match the memory path.', points: ['cudaMemcpyHostToDevice copies input from CPU memory to GPU memory.', 'cudaMemcpyDeviceToHost copies output from GPU memory to CPU memory.', 'cudaMemcpyDeviceToDevice copies inside GPU memory.', 'cudaMemcpyHostToHost is an ordinary host-side copy.'], visual: <HostDeviceTransfer stage="transfer" />, composition: 'pc-comp-timeline' },
  { section: 'CUDA Memory', title: 'Returning results', subtitle: 'The output path after a kernel writes device memory.', flow: ['Kernel writes d_result', 'cudaDeviceSynchronize', 'cudaMemcpy D->H', 'Validate output', 'Free memory'], points: ['The GPU writes the device result.', 'The host waits for completion before reading final output.', 'The result becomes visible to CPU code after DeviceToHost copy.'], visual: <HostDeviceTransfer stage="result" />, composition: 'pc-comp-reverse' },
  { section: 'CUDA Memory', title: 'Why synchronization matters', subtitle: 'Kernel launches are generally asynchronous from the host perspective.', codeLabel: 'HOST CODE | SYNCHRONIZATION', code: 'VecAdd<<<blocksPerGrid,\n         threadsPerBlock>>>(d_a, d_b, d_c, n);\n\ncudaDeviceSynchronize();\n\ncudaMemcpy(h_c, d_c, bytes,\n           cudaMemcpyDeviceToHost);', points: ['The CPU can continue after launching a kernel.', 'cudaDeviceSynchronize makes the CPU wait for kernel completion.', 'Read results only after the GPU has finished writing them.'] },
  { section: 'CUDA Memory', title: 'CUDA error checking', subtitle: 'Detect launch errors, runtime errors and validation failures.', codeLabel: 'HOST CODE | ERROR CHECK', code: 'cudaError_t err = cudaGetLastError();\n\nif (err != cudaSuccess) {\n    printf("CUDA error: %s\\n",\n           cudaGetErrorString(err));\n}', points: ['Check API return status and kernel launch status.', 'Synchronize when you need runtime error visibility.', 'Validate numerical output against the CPU version.'] },
  { divider: true, number: '07', section: 'Vector Addition', title: 'First CUDA Program', subtitle: 'One thread computes one output element.', visual: <KernelLaunchScene /> },
  { section: 'Vector Addition', title: 'Vector addition problem', subtitle: 'Each output element is independent.', definition: ['Vector addition', 'A data-parallel operation where each output element is computed independently as c[i] = a[i] + b[i].'], points: ['Thread i reads a[i] and b[i].', 'Thread i writes c[i].', 'No thread needs another thread result, so the operation is ideal for GPU execution.'], visual: <ArraysVisual />, composition: 'pc-comp-quiet' },
  { section: 'Vector Addition', title: 'Serial baseline', subtitle: 'One CPU core processes elements sequentially.', codeLabel: 'HOST CODE | CPU BASELINE', code: 'for (int i = 0; i < n; i++) {\n    c[i] = a[i] + b[i];\n}', points: ['The loop is correct but serial.', 'The CUDA version keeps the same math but changes who owns each iteration.', 'The weather grid update becomes one thread per cell.'] },
  { section: 'Vector Addition', title: 'CUDA vector-add kernel', subtitle: 'The device code executed by every launched thread.', codeLabel: 'DEVICE CODE | KERNEL', code: '__global__ void VecAdd(float* a,\n                       float* b,\n                       float* c,\n                       int n) {\n    int i =\n        blockIdx.x * blockDim.x\n        + threadIdx.x;\n\n    if (i < n)\n        c[i] = a[i] + b[i];\n}', points: ['__global__ marks a kernel callable from host and executed on device.', 'The global index chooses the array element.', 'The boundary guard protects the final block.'] },
  { section: 'Vector Addition', title: 'Thread-to-element mapping', subtitle: 'Many thread instances run the same kernel body.', flow: ['Thread 0 -> c[0]', 'Thread 1 -> c[1]', 'Thread 2 -> c[2]', '...', 'Thread n-1 -> c[n-1]'], points: ['Each thread computes one weather vector element.', 'The same expression c[i] = a[i] + b[i] runs with a different i.', 'Correct mapping depends on blockIdx, blockDim and threadIdx.'], visual: <KernelLaunchScene />, composition: 'pc-comp-visual-first' },
  { section: 'Vector Addition', title: 'Complete host workflow', subtitle: 'Vector addition demonstrates the full CUDA pattern.', flow: ['Allocate host arrays', 'Initialize input', 'cudaMalloc device arrays', 'Copy a and b to GPU', 'Launch VecAdd', 'Synchronize', 'Copy c back', 'Verify result', 'Free memory'], visual: <HostDeviceTransfer stage="workflow" />, composition: 'pc-comp-timeline' },
  { section: 'Vector Addition', title: 'Memory movement', subtitle: 'Track which arrays cross the host-device boundary.', points: ['h_a and h_b copy to d_a and d_b using HostToDevice.', 'VecAdd reads d_a and d_b and writes d_c on the GPU.', 'd_c copies back to h_c using DeviceToHost.', 'Host-side validation checks h_c.'], visual: <HostDeviceTransfer stage="full" />, composition: 'pc-comp-reverse' },
  { section: 'Vector Addition', title: 'Common vector-add errors', subtitle: 'Prevent the first CUDA lab bugs.', points: ['Forgetting the i < n guard.', 'Using a host pointer inside the kernel.', 'Forgetting cudaMemcpy result back.', 'Launching too few blocks.', 'Ignoring CUDA error codes.'], visual: <ConceptGrid items={[['Missing guard', 'out-of-bounds access', 'warn'], ['Wrong pointer', 'host pointer in kernel', 'warn'], ['No result copy', 'CPU reads stale output', 'warn'], ['Few blocks', 'elements never computed', 'warn'], ['No error check', 'failure hidden', 'warn']]} />, composition: 'pc-comp-quiet' },
  { divider: true, number: '08', section: 'Trapezoidal I', title: 'CUDA Trapezoidal Rule I', subtitle: 'Compute every partial contribution in parallel.', visual: <KernelLaunchScene /> },
  { section: 'Trapezoidal I', title: 'The numerical problem', subtitle: 'Same trapezoidal rule; different execution model.', points: ['The interval is divided into trapezoids.', 'Interior function evaluations are independent.', 'MPI used private processes; OpenMP used CPU threads; CUDA uses GPU threads.', 'The weather integral now maps f(x) evaluations to device threads.'], visual: <Trapezoids /> },
  { section: 'Trapezoidal I', title: 'GPU mapping', subtitle: 'Threads create partial contributions.', flow: ['n trapezoids', 'one or a few contributions per thread', 'compute f(x) contribution', 'store partial value', 'reduce/sum partials'], points: ['The GPU is excellent at many independent f(x) evaluations.', 'The remaining challenge is combining partial values efficiently.', 'Version I chooses clarity first.'], visual: <Trapezoids /> },
  { section: 'Trapezoidal I', title: 'Simple trapezoid kernel', subtitle: 'One source-supported CUDA kernel pattern.', codeLabel: 'DEVICE CODE | KERNEL', code: '__global__ void TrapKernel(\n    double a,\n    double h,\n    int n,\n    double* partial) {\n\n    int i =\n        blockIdx.x * blockDim.x\n        + threadIdx.x;\n\n    if (i > 0 && i < n) {\n        double x = a + i*h;\n        partial[i] = f(x);\n    }\n}', points: ['Thread i computes x = a + i*h.', 'Interior points are guarded with i > 0 and i < n.', 'partial[i] stores the contribution for later summation.'] },
  { section: 'Trapezoidal I', title: 'Partial result array', subtitle: 'The GPU produces many values.', points: ['Each active thread writes one partial[i].', 'The partial array lives in device memory first.', 'The CPU cannot sum it until values are copied back or reduced further on GPU.'], visual: <ArraysVisual mode="partial" /> },
  { section: 'Trapezoidal I', title: 'Version I combination', subtitle: 'Simple to understand, potentially transfer-heavy.', flow: ['Partial array on GPU', 'Copy partials to host', 'CPU sums values', 'Add endpoints', 'Multiply by h'], points: ['Version I makes correctness visible.', 'The cost is copying many partial values back to the CPU.', 'Large transfers can limit speedup even when the kernel is fast.'], visual: <HostDeviceTransfer stage="result" />, composition: 'pc-comp-timeline' },
  { divider: true, number: '09', section: 'Trapezoidal II', title: 'CUDA Trapezoidal Rule II', subtitle: 'Reduce more data on the GPU. Transfer less data to the CPU.', visual: <SharedVsGlobal /> },
  { section: 'Trapezoidal II', title: 'Why Version I is limited', subtitle: 'Transfer volume becomes the bottleneck.', flow: ['Thousands of partial values', 'Large DeviceToHost copy', 'CPU final summation'], points: ['The arithmetic is parallel, but the return path is large.', 'Performance improves when fewer values cross the host-device boundary.', 'Version II reduces inside each block before copying back.'], visual: <HostDeviceTransfer stage="result" />, composition: 'pc-comp-timeline' },
  { section: 'Trapezoidal II', title: 'Version II idea', subtitle: 'One sum per block instead of one value per trapezoid.', definition: ['Trapezoidal II', 'An improved version that reduces overhead by doing more accumulation on the GPU and reducing host-device data transfer.'], flow: ['Each thread computes contribution', 'Block reduces in shared memory', 'One sum per block', 'Copy block sums', 'CPU/GPU final sum'], visual: <ReductionTree />, composition: 'pc-comp-visual-first' },
  { section: 'Trapezoidal II', title: 'Block-level reduction', subtitle: 'A block turns many thread values into one block sum.', points: ['Eight thread values can reduce to four sums, then two sums, then one block sum.', 'The same tree idea scales to a full CUDA block.', 'The block sum is written once for the final phase.'], visual: <ReductionTree />, composition: 'pc-comp-quiet' },
  { section: 'Trapezoidal II', title: 'Shared memory', subtitle: 'Fast block-local storage for cooperation.', codeLabel: 'DEVICE CODE | SHARED MEMORY', code: 'extern __shared__ double sdata[];\n\nint tid = threadIdx.x;\nsdata[tid] = local_value;', points: ['shared memory is visible to threads in the same block.', 'Each thread writes to sdata[threadIdx.x].', 'Shared memory is faster than global memory when it reduces global traffic.'], visual: <SharedVsGlobal />, composition: 'pc-comp-exploded' },
  { section: 'Trapezoidal II', title: 'Synchronization within block', subtitle: 'Fast threads must wait before reduction reads shared data.', codeLabel: 'DEVICE CODE | SYNCHRONIZATION', code: 'sdata[tid] = local_value;\n\n__syncthreads();\n\n/* reduction reads sdata after all writes */', points: ['__syncthreads() synchronizes threads within one block.', 'Do not read shared data before all writers finish.', 'This is a correctness rule, not just a performance hint.'] },
  { section: 'Trapezoidal II', title: 'Conceptual reduction code', subtitle: 'The source sketch for one block sum.', codeLabel: 'DEVICE CODE | BLOCK REDUCTION', code: 'extern __shared__ double sdata[];\n\nint tid = threadIdx.x;\nsdata[tid] = local_value;\n\n__syncthreads();\n\n/* reduce sdata within block */\n\nif (tid == 0)\n    block_sums[blockIdx.x]\n        = sdata[0];', points: ['One block writes one block_sums[blockIdx.x].', 'The final copy returns block sums, not every partial value.', 'This connects memory workflow to reduction performance.'] },
  { section: 'Trapezoidal II', title: 'Why Version II improves', subtitle: 'Same mathematical answer, less movement.', points: ['Fewer values copied back to CPU.', 'Shared memory is faster than global memory.', 'Block-level work improves locality.', 'Less CPU work for final summation.', 'The kernel still exposes many parallel function evaluations.'], visual: <Compare leftTitle="Version I" rightTitle="Version II" left={['Copy many partial values.', 'CPU sums large array.', 'Simple but transfer-heavy.']} right={['Copy one sum per block.', 'Shared-memory reduction.', 'Better transfer efficiency.']} />, composition: 'pc-comp-compare' },
  { divider: true, number: '10', section: 'Trapezoidal III', title: 'CUDA Trapezoidal Rule III', subtitle: 'Reduce correctly when one block contains multiple warps.', visual: <GpuThreadHierarchy /> },
  { section: 'Trapezoidal III', title: 'Why Version III exists', subtitle: 'Larger blocks may contain multiple warps.', definition: ['Trapezoidal III', 'A further version that uses blocks with multiple warps, requiring careful synchronization and reduction across more threads.'], points: ['Blocks with multiple warps can expose more active work.', 'The reduction must combine results across all warps in the block.', 'Synchronization and shared memory boundaries must be explicit.'], visual: <GpuThreadHierarchy />, composition: 'pc-comp-visual-first' },
  { section: 'Trapezoidal III', title: 'Warp vs block', subtitle: 'Keep scheduling level and cooperation level separate.', compare: { leftTitle: 'Warp', rightTitle: 'Block', left: ['Usually 32 threads.', 'Scheduled together.', 'Fast warp-level progress.', 'Divergence hurts.'], right: ['Contains one or more warps.', 'Can use shared memory.', 'Can synchronize with __syncthreads.', 'Maps to one SM at a time.'] }, composition: 'pc-comp-compare' },
  { section: 'Trapezoidal III', title: 'Multi-warp reduction', subtitle: 'Combine within warps, then across warps.', flow: ['Threads compute values', 'Warp partial reductions', 'Shared memory stores warp sums', 'Block combines warp sums', 'Write block sum'], visual: <ReductionTree multiWarp />, composition: 'pc-comp-timeline' },
  { section: 'Trapezoidal III', title: 'Warp-level and block-level view', subtitle: 'Two nested reduction layers.', points: ['Layer 1: thread contributions inside each warp become warp sums.', 'Layer 2: warp sums are combined into one block sum.', 'The final block sum can be copied or reduced again in another phase.'], visual: <ReductionTree multiWarp />, composition: 'pc-comp-quiet' },
  { section: 'Trapezoidal III', title: 'Synchronization rules', subtitle: 'Prevent correctness bugs in multi-warp blocks.', points: ['__syncthreads synchronizes threads within a block only.', 'Threads from different blocks cannot synchronize inside one kernel.', 'Shared memory is visible only inside a block.', 'Do not read shared data before all writers finish.', 'Use separate kernel launches for global synchronization.'], visual: <ConceptGrid items={[['Block only', '__syncthreads scope'], ['No cross-block wait', 'inside one kernel', 'warn'], ['Shared memory', 'one block scope'], ['Kernel boundary', 'global phase sync', 'ok']]} />, composition: 'pc-comp-quiet' },
  { section: 'Trapezoidal III', title: 'Global synchronization', subtitle: 'A new kernel launch can act as a global phase boundary.', flow: ['Kernel 1 completes', 'Host or runtime boundary', 'Kernel 2 launches'], points: ['A block cannot wait for every other block during one kernel.', 'Separate launches divide the algorithm into global phases.', 'This is useful when all block sums must exist before the next reduction phase.'], visual: <HostDeviceTransfer stage="launch" />, composition: 'pc-comp-timeline' },
  { divider: true, number: '11', section: 'Performance', title: 'CUDA Performance', subtitle: 'Fill the factory. Merge memory. Avoid squad splits.', visual: <OccupancyMeter occupied={0.68} /> },
  { section: 'Performance', title: 'Performance checklist', subtitle: 'The source speed rules in one place.', points: ['Enough threads to fill the GPU.', 'Coalesced global memory accesses.', 'Minimize host-device transfers.', 'Use shared memory when it reduces global traffic.', 'Avoid branch divergence and excessive synchronization.'], visual: <OccupancyMeter occupied={0.8} regs={0.7} shared={0.6} blocks={0.85} />, composition: 'pc-comp-dashboard' },
  { section: 'Performance', title: 'Memory coalescing', subtitle: 'Neighbors walk together — one merged transaction.', points: ['Coalesced: Thread 0 reads a[0], Thread 1 reads a[1] — one grouped transaction.', 'Scattered: threads jump around memory — more transactions, lower bandwidth.', 'Weather arrays in contiguous order keep GPU memory busy efficiently.'], visual: <MemoryCoalescing />, composition: 'pc-comp-compare' },
  { section: 'Performance', title: 'Occupancy', subtitle: 'Why occupancy changes — watch the resource bars.', definition: ['Occupancy', 'How well the GPU keeps execution resources filled with active warps.'], points: ['Registers, shared memory and block slots compete.', 'The lowest bar is the bottleneck.', 'Unused slots are idle workers on the factory floor.'], visual: <OccupancyMeter occupied={0.62} regs={0.78} shared={0.55} blocks={0.7} />, composition: 'pc-comp-dashboard' },
  { section: 'Performance', title: 'Divergence review', subtitle: 'When the marching squad splits, pay for both paths.', points: ['When all weather cells in a warp follow the same branch, the warp executes one path.', 'When the branch splits, the warp executes paths serially for different lanes.', 'Divergence turns into actual execution time.'], visual: <WarpDivergence />, composition: 'pc-comp-compare' },
  { section: 'Performance', title: 'CUDA timing', subtitle: 'Synchronize before stopping the GPU timer.', flow: ['Start timer/event', 'Copy inputs if included', 'Launch kernel', 'Synchronize', 'Stop timer/event'], points: ['CUDA events or host timers must account for asynchronous kernel launch.', 'Include copies when measuring application-level runtime.', 'Kernel-only timing is useful for tuning one kernel.'], visual: <TimingBars />, composition: 'pc-comp-quiet' },
  { section: 'Performance', title: 'Kernel-only vs total time', subtitle: 'Choose the timing answer that matches the claim.', compare: { leftTitle: 'Kernel-only time', rightTitle: 'Total time', left: ['Measures GPU computation only.', 'Useful for kernel tuning.', 'Ignores transfer overhead.', 'Can overstate application speedup.'], right: ['Includes allocation, copies, kernel and result return.', 'Best for CPU vs GPU comparison.', 'Reflects real user cost.', 'May reveal transfer bottleneck.'] }, composition: 'pc-comp-compare' },
  { section: 'Performance', title: 'Honest CPU-GPU comparison', subtitle: 'Application speedup must include the real memory path.', points: ['CPU runtime is usually one serial or multicore bar.', 'GPU runtime includes allocation, HostToDevice copy, kernel time and DeviceToHost copy.', 'A fast kernel can still lose if transfers dominate.', 'Report what your timing includes.'], visual: <HostDeviceTransfer stage="full" />, composition: 'pc-comp-timeline' },
  { divider: true, number: '12', section: 'Correctness', title: 'CUDA Correctness', subtitle: 'Fast wrong answers are still wrong.', visual: <HostDeviceTransfer stage="result" /> },
  { section: 'Correctness', title: 'Debugging mindset', subtitle: 'The source correctness checklist for CUDA programs.', points: ['Check every CUDA API return status.', 'Use cudaDeviceSynchronize before reading results.', 'Validate output against a CPU version.', 'Start with small arrays and simple blocks.', 'Watch for out-of-bounds global indexes.'], visual: <ConceptGrid items={[['API status', 'check returns'], ['Synchronize', 'wait before read'], ['CPU reference', 'known answer'], ['Small input', 'debug visibly'], ['Index guard', 'avoid invalid access', 'warn']]} />, composition: 'pc-comp-quiet' },
  { section: 'Correctness', title: 'Common failure paths', subtitle: 'Most beginner CUDA bugs happen at the host-device boundary.', points: ['Wrong pointer type.', 'Wrong copy direction.', 'Wrong grid size.', 'Missing boundary guard.', 'Missing synchronization.', 'Unchecked kernel failure.'], visual: <ConceptGrid items={[['Pointer', 'h_a vs d_a', 'warn'], ['Copy direction', 'H->D vs D->H', 'warn'], ['Grid size', 'too few blocks', 'warn'], ['Guard', 'missing i < n', 'warn'], ['Sync', 'CPU reads early', 'warn'], ['Error status', 'ignored failure', 'warn']]} />, composition: 'pc-comp-quiet' },
  { section: 'Correctness', title: 'Validation workflow', subtitle: 'Compare GPU results with a trusted CPU reference.', flow: ['Run CPU reference', 'Run GPU kernel', 'Copy result', 'Compare arrays', 'Report maximum error', 'Accept or debug'], points: ['Numerical CUDA programs should prove correctness before performance claims.', 'For floating-point output, compare with a tolerance or maximum error.', 'Small weather arrays make mapping errors easier to inspect.'], visual: <HostDeviceTransfer stage="result" />, composition: 'pc-comp-timeline' },
  { divider: true, number: '13', section: 'Summary', title: 'Module 5 Summary', subtitle: 'CPU control, GPU throughput, correct memory movement.', visual: <KernelLaunchScene /> },
  { section: 'Summary', title: 'Module mind map', subtitle: 'Connect all major CUDA headings before revision.', points: ['GPGPU and heterogeneous computing explain why CPU and GPU cooperate.', 'Architecture, compute capability and device properties explain what the GPU can do.', 'Grid, block, thread and global index explain who computes each element.', 'Memory workflow, vector addition and trapezoidal versions show complete programs.', 'Performance and correctness decide whether the answer is useful.'], visual: <MindMap />, composition: 'pc-comp-quiet' },
  { section: 'Summary', title: 'Complete CUDA story', subtitle: 'One continuous host-device path.', flow: ['CPU allocates data', 'Copy to GPU', 'Launch grid of blocks', 'Threads compute by global index', 'Synchronize', 'Reduce partial results', 'Copy final output back', 'Validate result', 'Optimize memory and transfer'], visual: <HostDeviceTransfer stage="workflow" />, composition: 'pc-comp-hero' },
  { section: 'Summary', title: 'Evolution of the trapezoidal rule', subtitle: 'Same math, better reduction strategy.', compare: { leftTitle: 'Version I', rightTitle: 'Version II and III', left: ['One partial per thread.', 'Copy all partials to CPU.', 'Simple but transfer-heavy.'], right: ['Block-level shared-memory reduction.', 'Copy only block sums.', 'Multiple warps require careful synchronization.'] }, points: ['Version III adds warp-level and block-level thinking for larger blocks.'], composition: 'pc-comp-compare' },
  { section: 'Summary', title: 'Exam answer technique', subtitle: 'Turn source concepts into marks.', points: ['CUDA: definition plus host-device diagram.', 'Execution hierarchy: grid plus block plus thread plus global index.', 'Vector addition: kernel plus launch syntax plus memory flow.', 'Returning results: synchronize plus DeviceToHost copy.', 'Trapezoidal rule: compare versions I, II and III.', 'Performance: transfer, coalescing, occupancy and divergence.'], visual: <ConceptGrid items={[['Definition', 'state the CUDA concept'], ['Diagram', 'host-device workflow'], ['Code', 'kernel or launch syntax'], ['Performance note', 'transfer or memory cost']]} />, composition: 'pc-comp-quiet' },
  { section: 'Summary', title: '20 important viva questions', subtitle: 'Rapid oral revision.', points: ['What are CUDA, GPGPU, CPU vs GPU, host, device and kernel?', 'What are __global__, grid, block, thread, warp, blockIdx and threadIdx?', 'What are cudaMalloc, cudaMemcpy, returning kernel results, vector addition, i < n guard and shared memory?', 'What are __syncthreads, divergence, coalescing, occupancy and compute capability?'], visual: <MindMap />, dense: true },
  { section: 'Summary', title: '10 two-mark questions', subtitle: 'Practice short answers.', points: ['Define CUDA.', 'Define GPGPU.', 'What is kernel?', 'What is host?', 'What is device?', 'What is grid?', 'What is block?', 'What is thread?', 'What is warp?', 'What is cudaMemcpy?'], visual: <ConceptGrid items={[['2 marks', 'definition + one use'], ['Formula', 'include global index when relevant'], ['Memory', 'state direction'], ['Diagram', 'small host-device sketch']]} />, dense: true },
  { section: 'Summary', title: '10 five-mark questions', subtitle: 'Practice medium answers.', points: ['Explain GPU architecture.', 'Explain heterogeneous computing.', 'Explain threads, blocks and grids.', 'Explain CUDA memory transfer workflow.', 'Explain vector addition in CUDA.', 'Explain returning results from CUDA kernels.', 'Explain CUDA trapezoidal rule I.', 'Explain CUDA trapezoidal rule II improvement.', 'Explain CUDA trapezoidal rule III with multiple warps.', 'Explain CUDA performance checklist.'], visual: <HostDevice />, dense: true },
  { section: 'Summary', title: '10 ten-mark questions and VTU placeholders', subtitle: 'Practice long-answer structure.', points: ['Explain GPU programming with CUDA, GPGPU and heterogeneous computing.', 'Explain GPU architecture, compute capabilities and device architecture concepts.', 'Explain threads, blocks and grids with vector addition CUDA program.', 'Explain returning results from CUDA kernels and common CUDA mistakes.', 'Explain CUDA trapezoidal rule I, II and III with performance improvements.', 'Previous VTU Q1-Q5 placeholders: fill from past paper.'], visual: <MindMap />, dense: true },
  { section: 'Summary', title: 'One-page revision and keyword sheet', subtitle: 'Close with the must-remember terms.', points: ['CUDA; GPGPU; GPU; CPU host; device; heterogeneous computing; kernel; __global__; cudaMalloc; cudaMemcpy; cudaFree; cudaDeviceSynchronize.', 'grid; block; thread; warp; blockIdx; blockDim; threadIdx; global index; SM; CUDA core; global memory; shared memory; registers.', 'compute capability; vector addition; HostToDevice; DeviceToHost; trapezoidal rule; partial sum; reduction; shared memory reduction; __syncthreads.', 'occupancy; divergence; coalescing; memory path: CPU host allocates and copies data -> GPU launches grid of blocks -> threads compute by global index -> copy results back.'], visual: <ConceptGrid items={[['Answer formula', 'definition + host-device diagram + code snippet + memory workflow + performance note'], ['CUDA story', 'allocate -> copy -> launch -> sync -> return -> validate'], ['Trap evolution', 'partials -> block sums -> multi-warp reduction'], ['Correctness', 'guard + sync + error check + CPU reference']]} />, dense: true },
]

export const parallelComputingModule5Slides = rawSlides.map((item, index) => {
  const content = item.divider ? <DividerView {...item} /> : <SlideView {...item} />
  return slide({
    id: `pc-cuda-${String(index + 1).padStart(2, '0')}`,
    title: item.title,
    subtitle: item.subtitle,
    content,
    notes: `Teach with the Weather Simulation on a CPU-GPU Workstation: identify CPU host code, GPU device code, device arrays, host-device transfers, kernel launch shape, global index, synchronization, reduction phase, validation and performance cost. ${sourceNote}`,
  })
})
