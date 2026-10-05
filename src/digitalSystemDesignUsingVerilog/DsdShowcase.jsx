/**
 * DsdShowcase — full-bleed hero scenes for 1BEC302 Digital System Design
 * Using Verilog.
 *
 * Keyed by slide id (`mN-uK-ops`). buildSlides swaps the normal split layout
 * for a showcase whenever a unit's "watch" beat is registered here.
 */
import {
  M1Kmap4WrapScene,
  M1KmapDontCareScene,
  M2RippleCarryChain4BitScene,
  M2MuxTree16to1Scene,
  M3HdlFlowScene,
  M3AssignDelayScene,
  M4MasterSlaveBlockDiagramScene,
  M4FourBitJohnsonCounterScene,
  M5BlockingVsNonblockingHardwareScene,
  M5ForLoopUnrollChainScene,
} from './DsdScenes.jsx'

function wrap(title, scene, takeaway, camera, family, object) {
  return {
    title,
    camera,
    family,
    object,
    takeaway,
    scene: <div className="dsd-showcase-scene">{scene}</div>,
  }
}

const SHOWCASE = {
  'm1-u8-ops': wrap(
    'The K-map is a torus — corners are neighbours too',
    <M1Kmap4WrapScene />,
    'Top meets bottom, left meets right, and all four corners form one legal group of four.',
    'overhead-board',
    'dsd-kmap-wrap',
    'kmap-wraparound',
  ),
  'm1-u10-ops': wrap(
    "Don't-cares are wildcards: read an X as 1 when it grows the group",
    <M1KmapDontCareScene />,
    'The same map yields a 3-literal equation or a 2-literal one, depending only on how the Xs are read.',
    'overhead-board',
    'dsd-kmap-dontcare',
    'kmap-dontcare',
  ),
  'm2-u2-ops': wrap(
    'Operands arrive together; the answer ripples out one carry at a time',
    <M2RippleCarryChain4BitScene />,
    'Each stage waits for the carry before it — 4 bits cost 8 gate levels of settling time.',
    'pull-network',
    'dsd-ripple-carry',
    'ripple-adder',
  ),
  'm2-u13-ops': wrap(
    'A wide multiplexer is a tree of small ones',
    <M2MuxTree16to1Scene />,
    'Low select bits pick the leaf, high select bits pick the branch — read the address from the bottom up.',
    'wide-bench',
    'dsd-mux-tree',
    'mux-tree',
  ),
  'm3-u1-ops': wrap(
    'Fix it in the front-end, where a bug is only a text edit',
    <M3HdlFlowScene />,
    'A timing failure discovered after place-and-route forces re-coding, re-simulation and re-synthesis.',
    'side-by-side',
    'dsd-hdl-flow',
    'design-flow',
  ),
  'm3-u16-ops': wrap(
    'assign #5 holds every output change back by five time units',
    <M3AssignDelayScene />,
    'The delay is a simulation artifact only — synthesis reads the same line and ignores the #5 entirely.',
    'follow-current',
    'dsd-assign-delay',
    'propagation-delay',
  ),
  'm4-u5-ops': wrap(
    'Master captures, slave releases — one clock, one toggle',
    <M4MasterSlaveBlockDiagramScene />,
    'The inverted clock stops the master and slave from ever being transparent at the same instant, killing the race-around.',
    'close-element',
    'dsd-master-slave',
    'master-slave-jk',
  ),
  'm4-u12-ops': wrap(
    'Twist the feedback and the ring counter doubles its states',
    <M4FourBitJohnsonCounterScene />,
    "Feeding back Q' instead of Q turns a single circulating 1 into a solid block of 1s chasing a block of 0s.",
    'pull-network',
    'dsd-johnson-counter',
    'johnson-counter',
  ),
  'm5-u5-ops': wrap(
    'Same three lines, two very different circuits',
    <M5BlockingVsNonblockingHardwareScene />,
    'Blocking assignments on a clock edge collapse to one flip-flop; non-blocking assignments build a three-stage shift register.',
    'side-by-side',
    'dsd-blocking-nonblocking',
    'assignment-semantics',
  ),
  'm5-u9-ops': wrap(
    'A for loop is a copy machine, not a timer',
    <M5ForLoopUnrollChainScene />,
    'Eight loop iterations with a static bound become eight adders existing in space at once, not eight steps in time.',
    'follow-current',
    'dsd-loop-unroll',
    'loop-unrolling',
  ),
}

export function getShowcase(id) {
  return SHOWCASE[id] || null
}
