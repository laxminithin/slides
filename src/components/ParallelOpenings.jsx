/**
 * ParallelOpenings — cinematic module-opening scenes for Parallel Computing V2.1.
 * Each module gets a UNIQUE emotional opening that answers "why does this
 * module exist?" before any teaching. Composed from ParallelViz + GpuViz —
 * no new art style, just reuse + compose (INS Openings pattern).
 *
 * One dominant living scene per opening (hero scale). Remount on slide nav
 * replays motion. Reduced-motion handled by existing pv and gv CSS rules.
 */
import { ProcessorPackage, TrafficVsExpressway, ForkJoinTimeline } from './ParallelViz'
import { OpeningCluster } from './MpiScenes'
import { HostDeviceTransfer, KernelLaunchScene } from './GpuViz'
import { OpeningInvestigation } from './PerfScenes'

/* ===========================================================================
   MODULE 1 — "One processor is no longer enough"
   ======================================================================== */
export function OpeningM1() {
  return (
    <div className="pc-opening-scene pc-open-m1" aria-label="Sequential traffic jam versus parallel multi-lane expressway">
      <TrafficVsExpressway />
      <p className="pc-open-caption">One processor is no longer enough — parallelism opens the lanes.</p>
    </div>
  )
}

export function OpeningM1Alt() {
  return (
    <div className="pc-opening-scene" aria-label="Overloaded CPU package with tasks arriving">
      <ProcessorPackage label="CPU" cores={4} hot />
      <p className="pc-open-caption">Workload piles onto one package until cores explode into parallel work.</p>
    </div>
  )
}

/* ===========================================================================
   MODULE 2 — "Massive parallel power" · legendary GPU awakening
   ======================================================================== */
export function OpeningM2() {
  return (
    <div className="pc-opening-scene pc-open-m2" aria-label="Sequential work becomes multicore, GPU and hybrid. Runtime falls. Overhead appears.">
      <OpeningInvestigation />
      <p className="pc-open-caption">More processors do not automatically mean more speed — how much speedup did we really gain?</p>
    </div>
  )
}

/* ===========================================================================
   MODULE 3 — "Independent computers become one machine"
   ======================================================================== */
export function OpeningM3() {
  return (
    <div className="pc-opening-scene pc-open-m3" aria-label="Four compute nodes with private memory exchanging MPI messages">
      <OpeningCluster />
      <p className="pc-open-caption">Private memories. Explicit messages. One parallel solution.</p>
    </div>
  )
}

/* ===========================================================================
   MODULE 4 — "One CPU becomes many workers"
   ======================================================================== */
export function OpeningM4() {
  return (
    <div className="pc-opening-scene pc-open-m4" aria-label="OpenMP fork-join timeline">
      <ForkJoinTimeline />
      <p className="pc-open-caption">Nearby workers share a workbench — fork the team, guard the critical write, join clean.</p>
    </div>
  )
}

/* ===========================================================================
   MODULE 5 — "Programming thousands of processors"
   ======================================================================== */
export function OpeningM5() {
  return (
    <div className="pc-opening-scene pc-open-m5" aria-label="CUDA kernel launch onto GPU streaming multiprocessors">
      <KernelLaunchScene />
      <p className="pc-open-caption">The host writes the work order. The automated factory — the grid — starts.</p>
    </div>
  )
}

export function OpeningM5Alt() {
  return (
    <div className="pc-opening-scene" aria-label="Host to device CUDA transfer path">
      <HostDeviceTransfer stage="full" />
      <p className="pc-open-caption">Copy in. Launch. Synchronize. Copy back — the CUDA memory path.</p>
    </div>
  )
}
