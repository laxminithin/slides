/* GPU Computing living visuals — Module 2 flagship ("look inside a GPU").
   Expands the Parallel Computing kit; reuses ParallelViz primitives.
   Paired stylesheet: src/gpuViz.css.

   Contract (same as ParallelViz): static first frame complete; only cores /
   schedulers / packets animate; restarts on slide revisit; reduced-motion safe.
   GPU cores are GREEN to contrast CPU (blue). No branding.
*/
import '../gpuViz.css'

/* ------------------------------------------------------------------ *
 * #1 CpuVsGpu — few powerful cores vs thousands of lightweight cores
 * ------------------------------------------------------------------ */
export function CpuVsGpu() {
  const gpuCols = 16, gpuRows = 7
  return (
    <svg className="gv-svg" viewBox="0 0 640 340" role="img" aria-label="CPU has a few powerful cores; a GPU has thousands of lightweight cores">
      {/* ---- CPU panel ---- */}
      <rect className="gv-panel" x="14" y="34" width="286" height="248" rx="14" />
      <text className="gv-t-blue" x="30" y="58" fontSize="18">CPU</text>
      <text className="gv-t-sub" x="30" y="76" fontSize="12">8 powerful cores</text>
      {Array.from({ length: 8 }).map((_, k) => {
        const c = k % 4, r = Math.floor(k / 4)
        return <rect key={k} className="gv-cpu-core beat" x={34 + c * 64} y={92 + r * 74} width="56" height="62" rx="9"
          style={{ animationDelay: `${k * 0.28}s` }} />
      })}
      <text className="gv-t-sub" x="157" y="266" textAnchor="middle" fontSize="11">latency-optimized · serial strength · complex control</text>

      {/* ---- GPU panel ---- */}
      <rect className="gv-panel" x="340" y="34" width="286" height="248" rx="14" />
      <text className="gv-t-green" x="356" y="58" fontSize="18">GPU</text>
      <text className="gv-t-sub" x="356" y="76" fontSize="12">thousands of lightweight cores</text>
      {Array.from({ length: gpuCols * gpuRows }).map((_, k) => {
        const c = k % gpuCols, r = Math.floor(k / gpuCols)
        return <rect key={k} className="gv-gpu-core on" x={352 + c * 16.5} y={90 + r * 21} width="13" height="15" rx="2.5"
          style={{ animationDelay: `${(c + r) * 0.07}s` }} />
      })}
      <text className="gv-t-sub" x="483" y="266" textAnchor="middle" fontSize="11">throughput-optimized · massively data-parallel</text>

      <text className="gv-t-cap" x="320" y="308" textAnchor="middle" fontSize="10.5">many data elements → the GPU maps thousands of threads at once</text>
      <text className="gv-t-sub" x="320" y="328" textAnchor="middle" fontSize="12">a GPU spends transistors on <tspan className="gv-t-green">arithmetic</tspan>, a CPU on <tspan className="gv-t-blue">control + cache</tspan></text>
    </svg>
  )
}

/* ------------------------------------------------------------------ *
 * Hero: GpuPackage — exploded GPU (package → die → SMs → CUDA cores)
 * ------------------------------------------------------------------ */
function Sm({ x, y, w, h, hot = false, seed = 0 }) {
  const cols = 4, rows = 3
  const cw = (w - 16) / cols, ch = (h - 30) / rows
  return (
    <g>
      <rect className={`gv-sm-body ${hot ? 'hot' : ''}`.trim()} x={x} y={y} width={w} height={h} rx="7" />
      {/* warp scheduler strip */}
      <rect className="gv-warp-sched" x={x + 5} y={y + 5} width={w - 10} height="6" rx="3" />
      {/* CUDA core grid */}
      {Array.from({ length: cols * rows }).map((_, k) => {
        const c = k % cols, r = Math.floor(k / cols)
        return <rect key={k} className="gv-cuda on" x={x + 8 + c * cw} y={y + 16 + r * ch} width={cw - 3} height={ch - 3} rx="2"
          style={{ animationDelay: `${(seed + c + r) * 0.12}s` }} />
      })}
      {/* shared memory strip */}
      <rect className="gv-shared" x={x + 5} y={y + h - 8} width={w - 10} height="5" rx="2.5" />
    </g>
  )
}
export function GpuPackage() {
  const sm = { w: 96, h: 86, gapX: 12, gapY: 14 }
  const originX = 128, originY = 132
  const positions = []
  for (let r = 0; r < 2; r++) for (let c = 0; c < 4; c++) positions.push([originX + c * (sm.w + sm.gapX), originY + r * (sm.h + sm.gapY)])
  return (
    <svg className="gv-svg" viewBox="0 0 640 400" role="img" aria-label="Exploded GPU: package, die, streaming multiprocessors, CUDA cores">
      {/* lifted lid */}
      <rect className="gv-lid" x="210" y="34" width="220" height="44" rx="11" />
      <text className="gv-t-sub" x="320" y="61" textAnchor="middle" fontSize="12.5">GPU package — lid lifted</text>
      <line className="gv-wire" x1="224" y1="78" x2="120" y2="112" strokeDasharray="4 5" />
      <line className="gv-wire" x1="416" y1="78" x2="556" y2="112" strokeDasharray="4 5" />
      {/* substrate + die */}
      <rect className="gv-pkg-sub" x="96" y="104" width="448" height="248" rx="16" />
      {Array.from({ length: 15 }).map((_, k) => <rect key={k} className="gv-pin" x={112 + k * 28} y="354" width="12" height="12" rx="3" />)}
      <rect className="gv-die" x="112" y="118" width="416" height="222" rx="11" />
      <text className="gv-t-cap" x="320" y="132" textAnchor="middle" fontSize="10.5">GPU die</text>
      {/* SM array */}
      {positions.map(([x, y], k) => <Sm key={k} x={x} y={y} w={sm.w} h={sm.h} hot={k === 0} seed={k} />)}
      {/* labels / legend */}
      <text className="gv-t-green" x="320" y="376" textAnchor="middle" fontSize="12.5">
        die → <tspan className="gv-t-label">Streaming Multiprocessors</tspan> → <tspan className="gv-t-green">CUDA cores</tspan>
      </text>
      <text className="gv-t-sub" x="320" y="394" textAnchor="middle" fontSize="10.5">each SM carries a warp scheduler (violet), CUDA cores (green) and shared memory (amber)</text>
    </svg>
  )
}

/* ------------------------------------------------------------------ *
 * #2 GpuThreadHierarchy — Grid → Blocks → Warps → Threads (containment)
 * ------------------------------------------------------------------ */
export function GpuThreadHierarchy() {
  return (
    <svg className="gv-svg" viewBox="0 0 640 330" role="img" aria-label="GPU thread hierarchy: grid contains blocks, blocks contain warps, warps contain 32 threads">
      {/* GRID */}
      <text className="gv-t-cap" x="105" y="34" textAnchor="middle" fontSize="11">Grid</text>
      <rect className="gv-hbox" x="24" y="44" width="162" height="180" rx="10" />
      {Array.from({ length: 12 }).map((_, k) => {
        const c = k % 3, r = Math.floor(k / 3)
        const sel = k === 4
        return <rect key={k} className={`gv-block-cell ${sel ? 'sel' : ''}`.trim()} x={40 + c * 48} y={60 + r * 40} width="40" height="32" rx="5" />
      })}
      <text className="gv-t-sub" x="105" y="242" textAnchor="middle" fontSize="10.5">many blocks</text>

      {/* zoom to BLOCK */}
      <path className="gv-zoom" d="M136 100 L232 60 M136 132 L232 210" />
      <text className="gv-t-cap" x="322" y="34" textAnchor="middle" fontSize="11">Block</text>
      <rect className="gv-hbox" x="236" y="44" width="172" height="180" rx="10" />
      {Array.from({ length: 4 }).map((_, k) => {
        const sel = k === 1
        return (
          <g key={k}>
            <rect className={`gv-warp-row ${sel ? 'sel' : ''}`.trim()} x={252} y={58 + k * 40} width="140" height="30" rx="6" />
            <text className="gv-t-sub" x={262} y={78 + k * 40} fontSize="10">warp {k}</text>
          </g>
        )
      })}
      <text className="gv-t-sub" x="322" y="242" textAnchor="middle" fontSize="10.5">warps of 32 threads</text>

      {/* zoom to WARP */}
      <path className="gv-zoom" d="M394 98 L452 60 M394 98 L452 210" />
      <text className="gv-t-cap" x="546" y="34" textAnchor="middle" fontSize="11">Warp · 32 threads</text>
      <rect className="gv-hbox" x="456" y="44" width="168" height="180" rx="10" />
      {Array.from({ length: 32 }).map((_, k) => {
        const c = k % 8, r = Math.floor(k / 8)
        return <rect key={k} className="gv-thread on" x={470 + c * 19} y={62 + r * 38} width="15" height="30" rx="3"
          style={{ animationDelay: `${(c + r) * 0.05}s` }} />
      })}
      <text className="gv-t-sub" x="546" y="242" textAnchor="middle" fontSize="10.5">32 threads in lockstep</text>

      <text className="gv-t-label" x="320" y="284" textAnchor="middle" fontSize="14">Grid → Blocks → Warps → Threads</text>
      <text className="gv-t-sub" x="320" y="308" textAnchor="middle" fontSize="11.5">one thread computes one data element; the hierarchy schedules millions of them</text>
    </svg>
  )
}

/* ------------------------------------------------------------------ *
 * HostDeviceTransfer — CPU host ↔ PCIe ↔ GPU device execution path
 * ------------------------------------------------------------------ */
export function HostDeviceTransfer({ stage = 'full' }) {
  const showCopy = stage === 'full' || stage === 'copy' || stage === 'transfer'
  const showKernel = stage === 'full' || stage === 'launch' || stage === 'workflow'
  const showBack = stage === 'full' || stage === 'result' || stage === 'workflow'
  return (
    <svg className="gv-svg" viewBox="0 0 640 360" role="img" aria-label="Host copies data over PCIe, launches a kernel on the GPU, then copies results back">
      {/* Host */}
      <rect className="gv-panel" x="16" y="48" width="168" height="220" rx="14" />
      <text className="gv-t-blue" x="100" y="78" textAnchor="middle" fontSize="16">CPU Host</text>
      <text className="gv-t-sub" x="100" y="98" textAnchor="middle" fontSize="11">control · allocate · launch</text>
      {['h_a', 'h_b', 'h_c'].map((lab, k) => (
        <rect key={lab} className="gv-host-buf" x="36" y={118 + k * 42} width="128" height="32" rx="7" />
      ))}
      {['h_a', 'h_b', 'h_c'].map((lab, k) => (
        <text key={`${lab}t`} className="gv-t-label" x="100" y={138 + k * 42} textAnchor="middle" fontSize="12">{lab}</text>
      ))}

      {/* PCIe bridge */}
      <rect className="gv-pcie" x="210" y="118" width="220" height="80" rx="12" />
      <text className="gv-t-cap" x="320" y="142" textAnchor="middle" fontSize="11">PCIe / interconnect</text>
      <text className="gv-t-sub" x="320" y="162" textAnchor="middle" fontSize="11">transfer cost is real</text>
      {showCopy && (
        <>
          <rect className="gv-xfer down" x="250" y="168" width="14" height="14" rx="3" style={{ animationDelay: '0s' }} />
          <rect className="gv-xfer down" x="290" y="168" width="14" height="14" rx="3" style={{ animationDelay: '0.35s' }} />
          <rect className="gv-xfer down" x="330" y="168" width="14" height="14" rx="3" style={{ animationDelay: '0.7s' }} />
        </>
      )}
      {showBack && (
        <>
          <rect className="gv-xfer up" x="370" y="168" width="14" height="14" rx="3" style={{ animationDelay: '1.4s' }} />
          <rect className="gv-xfer up" x="400" y="168" width="14" height="14" rx="3" style={{ animationDelay: '1.75s' }} />
        </>
      )}
      <text className="gv-t-cap" x="320" y="210" textAnchor="middle" fontSize="10">H→D · kernel · D→H</text>

      {/* Device */}
      <rect className="gv-panel" x="456" y="48" width="168" height="220" rx="14" />
      <text className="gv-t-green" x="540" y="78" textAnchor="middle" fontSize="16">GPU Device</text>
      <text className="gv-t-sub" x="540" y="98" textAnchor="middle" fontSize="11">SMs · global memory</text>
      {['d_a', 'd_b', 'd_c'].map((lab, k) => (
        <rect key={lab} className="gv-dev-buf" x="476" y={118 + k * 42} width="128" height="32" rx="7" />
      ))}
      {['d_a', 'd_b', 'd_c'].map((lab, k) => (
        <text key={`${lab}t`} className="gv-t-label" x="540" y={138 + k * 42} textAnchor="middle" fontSize="12">{lab}</text>
      ))}
      {showKernel && (
        <g>
          <rect className="gv-kernel-pulse" x="486" y="248" width="108" height="12" rx="6" />
          <text className="gv-t-cap" x="540" y="278" textAnchor="middle" fontSize="10">kernel executing</text>
        </g>
      )}

      <text className="gv-t-label" x="320" y="310" textAnchor="middle" fontSize="13">Host prepares → copy → launch → synchronize → copy back</text>
      <text className="gv-t-sub" x="320" y="334" textAnchor="middle" fontSize="11.5">honest GPU timing includes every transfer across the bridge</text>
    </svg>
  )
}

/* ------------------------------------------------------------------ *
 * WarpDivergence — cinematic: 32 threads → branch → serialize → cost
 * ------------------------------------------------------------------ */
export function WarpDivergence() {
  return (
    <svg className="gv-svg gv-hero" viewBox="0 0 640 400" role="img" aria-label="Warp divergence: 32 lockstep threads hit a branch, half wait, paths serialize, performance drops">
      <text className="gv-t-cap" x="320" y="22" textAnchor="middle" fontSize="10">a marching squad · one warp · 32 threads</text>

      {/* Phase 1: lockstep */}
      <text className="gv-t-label" x="320" y="48" textAnchor="middle" fontSize="13">1 · Same instruction</text>
      {Array.from({ length: 32 }).map((_, k) => (
        <rect key={`u${k}`} className="gv-thread on" x={48 + k * 17} y="58" width="14" height="28" rx="2"
          style={{ animationDelay: `${k * 0.025}s` }} />
      ))}

      {/* Branch appears */}
      <text className="gv-t-cap" x="320" y="110" textAnchor="middle" fontSize="11">branch appears · if (storm)</text>
      <path className="gv-branch-split" d="M320 118 L200 148 M320 118 L440 148" />

      {/* Phase 2: then path */}
      <text className="gv-t-green" x="200" y="168" textAnchor="middle" fontSize="12">THEN · active</text>
      {Array.from({ length: 16 }).map((_, k) => (
        <rect key={`t${k}`} className="gv-thread on" x={80 + k * 15} y="178" width="12" height="26" rx="2"
          style={{ animationDelay: `${0.3 + k * 0.03}s` }} />
      ))}
      <text className="gv-t-sub" x="200" y="222" textAnchor="middle" fontSize="10">half runs</text>

      {/* Phase 2b: else waits */}
      <text className="gv-t-blue" x="440" y="168" textAnchor="middle" fontSize="12">ELSE · waiting</text>
      {Array.from({ length: 16 }).map((_, k) => (
        <rect key={`e${k}`} className="gv-thread masked" x={320 + k * 15} y="178" width="12" height="26" rx="2" />
      ))}
      <text className="gv-t-sub" x="440" y="222" textAnchor="middle" fontSize="10">half masked</text>

      {/* Phase 3: serialize else */}
      <text className="gv-t-label" x="320" y="250" textAnchor="middle" fontSize="12">2 · Serialize the other path</text>
      {Array.from({ length: 16 }).map((_, k) => (
        <rect key={`s${k}`} className="gv-thread on" x={200 + k * 15} y="262" width="12" height="26" rx="2"
          style={{ animationDelay: `${1.0 + k * 0.04}s` }} />
      ))}
      {Array.from({ length: 16 }).map((_, k) => (
        <rect key={`m${k}`} className="gv-thread masked" x={48 + k * 9} y="262" width="7" height="26" rx="1" />
      ))}

      {/* Cost badge */}
      <rect className="gv-cost-badge" x="200" y="306" width="240" height="44" rx="10" />
      <text className="gv-t-label" x="320" y="326" textAnchor="middle" fontSize="14" fill="#fff">Performance drops</text>
      <text className="gv-t-cap" x="320" y="342" textAnchor="middle" fontSize="9" fill="#ffe4e4">both sides paid · warp time ≈ THEN + ELSE</text>

      <text className="gv-t-sub" x="320" y="378" textAnchor="middle" fontSize="12">Never forget: divergence turns one instruction into a queue</text>
    </svg>
  )
}

/* ------------------------------------------------------------------ *
 * OccupancyMeter — WHY occupancy changes (regs / shared / blocks)
 * ------------------------------------------------------------------ */
export function OccupancyMeter({ occupied = 0.62, regs = 0.78, shared = 0.55, blocks = 0.7 }) {
  const slots = 16
  const filled = Math.round(slots * occupied)
  const limit = Math.min(regs, shared, blocks)
  const limitName = limit === regs ? 'registers' : limit === shared ? 'shared memory' : 'block slots'
  return (
    <svg className="gv-svg gv-hero" viewBox="0 0 640 380" role="img" aria-label="Occupancy limited by registers, shared memory, and block scheduling">
      <text className="gv-t-cap" x="320" y="24" textAnchor="middle" fontSize="10">SM capacity · what decides occupancy</text>

      {/* Resource bars */}
      {[
        { label: 'Register file', v: regs, y: 48, cls: 'gv-res-regs' },
        { label: 'Shared memory', v: shared, y: 96, cls: 'gv-res-shm' },
        { label: 'Block slots', v: blocks, y: 144, cls: 'gv-res-blk' },
      ].map((r) => (
        <g key={r.label}>
          <text className="gv-t-sub" x="40" y={r.y + 14} fontSize="12">{r.label}</text>
          <rect className="gv-occ-track" x="180" y={r.y} width="280" height="22" rx="11" />
          <rect className={`gv-occ-fill ${r.cls}`} x="180" y={r.y} width={280 * r.v} height="22" rx="11" />
          <text className="gv-t-label" x="480" y={r.y + 16} fontSize="12">{Math.round(r.v * 100)}%</text>
        </g>
      ))}

      <text className="gv-t-cap" x="320" y="192" textAnchor="middle" fontSize="10">bottleneck → {limitName}</text>

      {/* Warp residency grid */}
      <rect className="gv-panel" x="40" y="208" width="400" height="120" rx="12" />
      <text className="gv-t-green" x="240" y="232" textAnchor="middle" fontSize="13">Resident warps on SM</text>
      {Array.from({ length: slots }).map((_, k) => {
        const c = k % 8, r = Math.floor(k / 8)
        return (
          <rect key={k} className={`gv-occ-slot ${k < filled ? 'full' : 'empty'}`.trim()}
            x={60 + c * 46} y={248 + r * 34} width="40" height="26" rx="5"
            style={{ animationDelay: `${k * 0.06}s` }} />
        )
      })}

      <rect className="gv-panel" x="460" y="208" width="140" height="120" rx="12" />
      <text className="gv-t-cap" x="530" y="236" textAnchor="middle" fontSize="10">Occupancy</text>
      <text className="gv-t-label" x="530" y="278" textAnchor="middle" fontSize="32">{Math.round(occupied * 100)}%</text>
      <text className="gv-t-sub" x="530" y="304" textAnchor="middle" fontSize="11">{filled}/{slots} warps</text>

      <text className="gv-t-label" x="320" y="350" textAnchor="middle" fontSize="13">Unused resources are idle workers — occupancy fills the factory</text>
      <text className="gv-t-sub" x="320" y="372" textAnchor="middle" fontSize="11.5">too many registers or too much shared mem → fewer resident blocks</text>
    </svg>
  )
}

/* ------------------------------------------------------------------ *
 * KernelLaunchScene — signature factory start sequence
 * Host → PCIe → Device → Grid → Blocks → Warps → Threads → Sync → Return
 * ------------------------------------------------------------------ */
export function KernelLaunchScene() {
  return (
    <svg className="gv-svg gv-hero" viewBox="0 0 640 400" role="img" aria-label="Signature kernel launch: host to PCIe to device grid executing on SMs then results return">
      {/* Host */}
      <rect className="gv-panel" x="12" y="40" width="100" height="80" rx="10" />
      <text className="gv-t-blue" x="62" y="72" textAnchor="middle" fontSize="13">Host</text>
      <text className="gv-t-cap" x="62" y="92" textAnchor="middle" fontSize="9">work order</text>

      {/* PCIe freight */}
      <rect className="gv-pcie" x="122" y="58" width="90" height="44" rx="8" />
      <text className="gv-t-cap" x="167" y="78" textAnchor="middle" fontSize="9">PCIe</text>
      <text className="gv-t-cap" x="167" y="92" textAnchor="middle" fontSize="8">freight</text>
      <rect className="gv-xfer down" x="140" y="72" width="10" height="10" rx="2" />

      {/* Device */}
      <rect className="gv-panel" x="224" y="40" width="100" height="80" rx="10" />
      <text className="gv-t-green" x="274" y="72" textAnchor="middle" fontSize="13">Device</text>
      <text className="gv-t-cap" x="274" y="92" textAnchor="middle" fontSize="9">receives</text>

      <path className="gv-wire-green" d="M274 120 V140" />
      <text className="gv-t-cap" x="320" y="138" textAnchor="middle" fontSize="10">{'<<< grid, block >>> · factory starts'}</text>

      {/* Grid industrial floor */}
      {Array.from({ length: 12 }).map((_, k) => {
        const c = k % 6, r = Math.floor(k / 6)
        return (
          <rect key={k} className="gv-launch-block" x={80 + c * 80} y={152 + r * 34} width="68" height="26" rx="5"
            style={{ animationDelay: `${k * 0.08}s` }} />
        )
      })}

      {/* Map to SMs */}
      <path className="gv-wire-green" d="M320 224 V240" />
      {[0, 1, 2, 3].map((k) => (
        <g key={k}>
          <rect className="gv-sm-body hot" x={40 + k * 150} y="246" width="136" height="70" rx="8" />
          <text className="gv-t-label" x={108 + k * 150} y="266" textAnchor="middle" fontSize="11">SM {k}</text>
          {Array.from({ length: 8 }).map((_, i) => (
            <rect key={i} className="gv-cuda on" x={52 + k * 150 + (i % 4) * 28} y={276 + Math.floor(i / 4) * 16}
              width="22" height="12" rx="2" style={{ animationDelay: `${(k + i) * 0.06}s` }} />
          ))}
        </g>
      ))}

      {/* Sync + return */}
      <rect className="gv-sync-gate" x="200" y="330" width="100" height="24" rx="6" />
      <text className="gv-t-cap" x="250" y="346" textAnchor="middle" fontSize="9" fill="#fff">synchronize</text>
      <path className="gv-wire" d="M300 342 H360" />
      <rect className="gv-host-buf" x="360" y="328" width="120" height="28" rx="6" />
      <text className="gv-t-label" x="420" y="346" textAnchor="middle" fontSize="11">results return</text>

      <text className="gv-t-label" x="320" y="382" textAnchor="middle" fontSize="13">Starting an automated factory — grid is the work order</text>
    </svg>
  )
}

/* ------------------------------------------------------------------ *
 * MemoryCoalescing — coalesced vs scattered global loads
 * ------------------------------------------------------------------ */
export function MemoryCoalescing() {
  return (
    <svg className="gv-svg" viewBox="0 0 640 340" role="img" aria-label="Coalesced memory access versus scattered accesses">
      {/* Coalesced panel */}
      <rect className="gv-panel" x="20" y="40" width="290" height="230" rx="14" />
      <text className="gv-t-green" x="165" y="70" textAnchor="middle" fontSize="15">Coalesced</text>
      <text className="gv-t-sub" x="165" y="90" textAnchor="middle" fontSize="11">neighbors → one transaction</text>
      {Array.from({ length: 8 }).map((_, k) => (
        <rect key={`ct${k}`} className="gv-thread on" x={48 + k * 28} y="110" width="20" height="28" rx="3"
          style={{ animationDelay: `${k * 0.05}s` }} />
      ))}
      {[0, 1, 2, 3, 4, 5, 6, 7].map((k) => (
        <line key={`cl${k}`} className="gv-wire-green" x1={58 + k * 28} y1="140" x2={58 + k * 28} y2="180" />
      ))}
      <rect className="gv-mem-row good" x="40" y="180" width="230" height="36" rx="8" />
      <text className="gv-t-label" x="165" y="203" textAnchor="middle" fontSize="12" fill="#fff">one wide DRAM burst</text>
      <text className="gv-t-sub" x="165" y="242" textAnchor="middle" fontSize="11">thread i reads address base+i</text>

      {/* Scattered panel */}
      <rect className="gv-panel" x="330" y="40" width="290" height="230" rx="14" />
      <text className="gv-t-blue" x="475" y="70" textAnchor="middle" fontSize="15">Scattered</text>
      <text className="gv-t-sub" x="475" y="90" textAnchor="middle" fontSize="11">strided → many transactions</text>
      {Array.from({ length: 8 }).map((_, k) => (
        <rect key={`st${k}`} className="gv-thread on" x={358 + k * 28} y="110" width="20" height="28" rx="3"
          style={{ animationDelay: `${k * 0.05}s` }} />
      ))}
      {[0, 1, 2, 3, 4, 5, 6, 7].map((k) => (
        <line key={`sl${k}`} className="gv-wire" x1={368 + k * 28} y1="140" x2={368 + ((k * 3) % 8) * 28} y2="180" />
      ))}
      {[0, 1, 2, 3, 4, 5, 6, 7].map((k) => (
        <rect key={`sm${k}`} className="gv-mem-cell bad" x={350 + k * 28} y="180" width="22" height="36" rx="4"
          style={{ animationDelay: `${k * 0.12}s` }} />
      ))}
      <text className="gv-t-sub" x="475" y="242" textAnchor="middle" fontSize="11">thread i reads address base+i×stride</text>

      <text className="gv-t-label" x="320" y="300" textAnchor="middle" fontSize="13">Memory layout decides bandwidth — coalescing turns eight loads into one</text>
      <text className="gv-t-sub" x="320" y="324" textAnchor="middle" fontSize="11.5">weather arrays in contiguous order keep GPU memory busy efficiently</text>
    </svg>
  )
}

/* ------------------------------------------------------------------ *
 * SharedVsGlobal — block shared toolbox vs global warehouse
 * ------------------------------------------------------------------ */
export function SharedVsGlobal() {
  return (
    <svg className="gv-svg" viewBox="0 0 640 360" role="img" aria-label="Shared memory inside a block versus global device memory">
      {/* Block with shared mem */}
      <rect className="gv-hbox" x="24" y="40" width="280" height="250" rx="14" />
      <text className="gv-t-label" x="164" y="68" textAnchor="middle" fontSize="14">Thread Block</text>
      <text className="gv-t-sub" x="164" y="88" textAnchor="middle" fontSize="11">construction crew</text>
      {Array.from({ length: 12 }).map((_, k) => {
        const c = k % 4, r = Math.floor(k / 4)
        return (
          <rect key={k} className="gv-thread on" x={52 + c * 52} y={106 + r * 36} width="40" height="26" rx="5"
            style={{ animationDelay: `${k * 0.06}s` }} />
        )
      })}
      <rect className="gv-shared-box" x="48" y="230" width="232" height="40" rx="8" />
      <text className="gv-t-label" x="164" y="255" textAnchor="middle" fontSize="12">Shared memory · toolbox beside workers</text>

      {/* Global warehouse */}
      <rect className="gv-hbox" x="336" y="40" width="280" height="250" rx="14" />
      <text className="gv-t-label" x="476" y="68" textAnchor="middle" fontSize="14">Global Memory</text>
      <text className="gv-t-sub" x="476" y="88" textAnchor="middle" fontSize="11">warehouse · large · slower</text>
      {[0, 1, 2, 3].map((r) => (
        <rect key={r} className="gv-global-row" x="360" y={110 + r * 42} width="232" height="32" rx="6"
          style={{ animationDelay: `${r * 0.15}s` }} />
      ))}
      {['temperature[]', 'pressure[]', 'velocity[]', 'result[]'].map((lab, k) => (
        <text key={lab} className="gv-t-sub" x="476" y={130 + k * 42} textAnchor="middle" fontSize="12">{lab}</text>
      ))}

      {/* transfer arrows */}
      <path className="gv-wire-green" d="M304 200 H336" />
      <text className="gv-t-cap" x="320" y="190" textAnchor="middle" fontSize="9">tile</text>

      <text className="gv-t-label" x="320" y="320" textAnchor="middle" fontSize="13">Load a tile into shared memory → reuse → write results to global</text>
      <text className="gv-t-sub" x="320" y="344" textAnchor="middle" fontSize="11.5">shared is fast and local to the block; global is visible to the whole grid</text>
    </svg>
  )
}

/* ==================================================================
 * DIRECTOR'S CUT V2.1 — legendary GPU documentary scenes
 * ================================================================== */

/* ------------------------------------------------------------------ *
 * GpuAwakening — WHY GPUs exist (signature Module 2 / 5 opening)
 * CPU overwhelmed → workload explodes → package opens → SMs light →
 * thousands of threads awaken → kernel begins
 * ------------------------------------------------------------------ */
export function GpuAwakening() {
  return (
    <svg className="gv-svg gv-hero" viewBox="0 0 640 400" role="img" aria-label="CPU overwhelmed by workload; GPU package opens and thousands of threads awaken">
      {/* Stage 1: overwhelmed CPU */}
      <g className="gv-awake-cpu">
        <rect className="gv-panel" x="16" y="40" width="150" height="130" rx="12" />
        <text className="gv-t-blue" x="91" y="68" textAnchor="middle" fontSize="14">CPU</text>
        <text className="gv-t-sub" x="91" y="86" textAnchor="middle" fontSize="10">overwhelmed</text>
        {[0, 1, 2, 3].map((k) => (
          <rect key={k} className="gv-cpu-core beat" x={32 + (k % 2) * 56} y={100 + Math.floor(k / 2) * 28} width="48" height="22" rx="5"
            style={{ animationDelay: `${k * 0.15}s` }} />
        ))}
      </g>

      {/* Workload explode */}
      {[0, 1, 2, 3, 4, 5].map((k) => (
        <rect key={k} className="gv-work-burst" x={176 + (k % 3) * 18} y={70 + Math.floor(k / 3) * 40} width="12" height="12" rx="2"
          style={{ animationDelay: `${k * 0.12}s` }} />
      ))}
      <text className="gv-t-cap" x="204" y="160" textAnchor="middle" fontSize="9">workload</text>

      {/* Arrow */}
      <path className="gv-wire-green" d="M240 100 H270" />

      {/* Stage 2: GPU package opening into die + SMs */}
      <g className="gv-awake-gpu">
        <rect className="gv-lid gv-lid-lift" x="290" y="28" width="160" height="28" rx="8" />
        <text className="gv-t-cap" x="370" y="46" textAnchor="middle" fontSize="9">lid lifts</text>
        <rect className="gv-pkg-sub" x="270" y="68" width="340" height="200" rx="14" />
        <rect className="gv-die" x="286" y="82" width="308" height="168" rx="10" />
        <text className="gv-t-green" x="440" y="100" textAnchor="middle" fontSize="13">GPU die · digital factory</text>
        {[0, 1, 2, 3, 4, 5].map((k) => {
          const c = k % 3, r = Math.floor(k / 3)
          return (
            <g key={k}>
              <rect className="gv-sm-body hot gv-sm-ignite" x={300 + c * 96} y={112 + r * 58} width="86" height="48" rx="6"
                style={{ animationDelay: `${0.4 + k * 0.18}s` }} />
              <rect className="gv-warp-sched" x={306 + c * 96} y={118 + r * 58} width="74" height="5" rx="2" />
              {Array.from({ length: 8 }).map((_, i) => (
                <rect key={i} className="gv-cuda on" x={306 + c * 96 + (i % 4) * 18} y={128 + r * 58 + Math.floor(i / 4) * 12}
                  width="14" height="9" rx="2" style={{ animationDelay: `${0.8 + k * 0.1 + i * 0.04}s` }} />
              ))}
            </g>
          )
        })}
      </g>

      {/* Stage 3: threads awaken strip */}
      <text className="gv-t-cap" x="320" y="296" textAnchor="middle" fontSize="10">thousands of threads awaken</text>
      {Array.from({ length: 40 }).map((_, k) => (
        <rect key={k} className="gv-thread on gv-thread-awake" x={40 + k * 14.5} y="308" width="11" height="22" rx="2"
          style={{ animationDelay: `${1.2 + k * 0.03}s` }} />
      ))}

      <text className="gv-t-label" x="320" y="358" textAnchor="middle" fontSize="14">One CPU cannot finish this workload — the GPU exists for width</text>
      <text className="gv-t-sub" x="320" y="380" textAnchor="middle" fontSize="11.5">package opens → SMs illuminate → CUDA cores activate → kernel begins</text>
    </svg>
  )
}

/* ------------------------------------------------------------------ *
 * StreamingMultiprocessor — open the SM (inside the silicon)
 * ------------------------------------------------------------------ */
export function StreamingMultiprocessor() {
  return (
    <svg className="gv-svg gv-hero" viewBox="0 0 640 400" role="img" aria-label="Exploded Streaming Multiprocessor: warp scheduler, CUDA cores, shared memory, registers, LSUs, SFUs">
      <text className="gv-t-cap" x="320" y="24" textAnchor="middle" fontSize="11">inside one Streaming Multiprocessor</text>
      <rect className="gv-sm-shell" x="40" y="40" width="560" height="300" rx="16" />

      {/* Warp scheduler */}
      <rect className="gv-warp-sched gv-sm-unit" x="60" y="56" width="520" height="36" rx="8" />
      <text className="gv-t-label" x="320" y="72" textAnchor="middle" fontSize="13" fill="#fff">Warp Scheduler</text>
      <text className="gv-t-cap" x="320" y="86" textAnchor="middle" fontSize="9" fill="#e9e4ff">issues one instruction to 32 lockstep lanes</text>

      {/* Warp marching in */}
      {Array.from({ length: 16 }).map((_, k) => (
        <rect key={k} className="gv-thread on" x={80 + k * 30} y="102" width="22" height="14" rx="2"
          style={{ animationDelay: `${k * 0.05}s` }} />
      ))}
      <text className="gv-t-cap" x="320" y="130" textAnchor="middle" fontSize="9">warp · marching squad of 32 (16 shown)</text>

      {/* CUDA cores factory floor */}
      <rect className="gv-sm-unit" x="60" y="144" width="300" height="120" rx="10" fill="#eefbf3" stroke="#16a34a" />
      <text className="gv-t-green" x="210" y="166" textAnchor="middle" fontSize="13">CUDA Cores</text>
      {Array.from({ length: 32 }).map((_, k) => {
        const c = k % 8, r = Math.floor(k / 8)
        return (
          <rect key={k} className="gv-cuda on" x={76 + c * 34} y={178 + r * 20} width="28" height="14" rx="3"
            style={{ animationDelay: `${k * 0.04}s` }} />
        )
      })}

      {/* SFU + LSU */}
      <rect className="gv-sfu" x="380" y="144" width="100" height="54" rx="8" />
      <text className="gv-t-label" x="430" y="168" textAnchor="middle" fontSize="11">SFU</text>
      <text className="gv-t-cap" x="430" y="186" textAnchor="middle" fontSize="8">special fn</text>
      <rect className="gv-lsu" x="500" y="144" width="100" height="54" rx="8" />
      <text className="gv-t-label" x="550" y="168" textAnchor="middle" fontSize="11">LSU</text>
      <text className="gv-t-cap" x="550" y="186" textAnchor="middle" fontSize="8">load / store</text>

      {/* Registers */}
      <rect className="gv-regs gv-sm-unit" x="380" y="210" width="220" height="54" rx="8" />
      <text className="gv-t-label" x="490" y="234" textAnchor="middle" fontSize="12">Register File</text>
      <text className="gv-t-cap" x="490" y="252" textAnchor="middle" fontSize="9">private per-thread · fastest</text>

      {/* Shared memory */}
      <rect className="gv-shared-box" x="60" y="280" width="540" height="42" rx="8" />
      <text className="gv-t-label" x="330" y="306" textAnchor="middle" fontSize="13">Shared Memory · workbench beside the crew</text>

      <text className="gv-t-label" x="320" y="368" textAnchor="middle" fontSize="13">A warp enters → scheduler issues → cores execute → memory serves</text>
      <text className="gv-t-sub" x="320" y="390" textAnchor="middle" fontSize="11.5">you are looking inside the silicon that runs thousands of threads</text>
    </svg>
  )
}

/* ------------------------------------------------------------------ *
 * GpuMemoryTower — registers → shared → L1 → L2 → global → host
 * ------------------------------------------------------------------ */
export function GpuMemoryTower() {
  const tiers = [
    { y: 36, w: 160, label: 'Registers', meta: 'workbench · ~1 cycle', cls: 'gv-tier-reg', tone: '#2563eb' },
    { y: 86, w: 210, label: 'Shared Memory', meta: 'factory shelf · block scope', cls: 'gv-tier-shm', tone: '#d97706' },
    { y: 136, w: 260, label: 'L1 Cache', meta: 'near · per-SM', cls: 'gv-tier-l1', tone: '#0ea5a4' },
    { y: 186, w: 320, label: 'L2 Cache', meta: 'chip-wide', cls: 'gv-tier-l2', tone: '#6d5dd3' },
    { y: 236, w: 400, label: 'Global Memory', meta: 'warehouse · high capacity', cls: 'gv-tier-glob', tone: '#64748b' },
    { y: 286, w: 480, label: 'Host Memory', meta: 'remote storage · PCIe away', cls: 'gv-tier-host', tone: '#94a3b8' },
  ]
  return (
    <svg className="gv-svg gv-hero" viewBox="0 0 640 380" role="img" aria-label="GPU memory hierarchy from registers to host memory with latency and capacity">
      <text className="gv-t-cap" x="40" y="24" fontSize="10">▲ faster · smaller</text>
      <text className="gv-t-cap" x="520" y="24" fontSize="10">latency grows →</text>
      {tiers.map((t, i) => (
        <g key={t.label}>
          <rect className={`gv-mem-tier ${t.cls}`} x={(640 - t.w) / 2} y={t.y} width={t.w} height="42" rx="9"
            style={{ animationDelay: `${i * 0.12}s` }} />
          <text className="gv-t-label" x="320" y={t.y + 18} textAnchor="middle" fontSize="13" fill="#fff">{t.label}</text>
          <text className="gv-t-cap" x="320" y={t.y + 34} textAnchor="middle" fontSize="9" fill="#fff">{t.meta}</text>
        </g>
      ))}
      {/* request token */}
      <rect className="gv-mem-token" x="312" y="48" width="16" height="12" rx="3" />
      <text className="gv-t-label" x="320" y="350" textAnchor="middle" fontSize="13">Nearby workers are faster — distance is latency</text>
      <text className="gv-t-sub" x="320" y="372" textAnchor="middle" fontSize="11.5">tile into shared (shelf) before walking to the global warehouse</text>
    </svg>
  )
}
