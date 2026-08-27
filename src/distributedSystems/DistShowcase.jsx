/**
 * DistShowcase — wide hero teaching scenes for BCS515D Distributed Systems.
 * Keyed by slide id for buildSlides showcase layout.
 */
import {
  RpcScene,
  LamportScene,
  ElectionScene,
  AtomicCommitScene,
  ReplicationScene,
  PALETTE,
} from './DistScenes.jsx'

const { BLUE, AMBER, PURP, TEAL, GREEN } = PALETTE

function wrap(title, hue, scene, takeaway, camera = 'wide-process', family = 'process-flow', object = 'process') {
  return {
    title,
    camera,
    family,
    object,
    takeaway,
    scene: <div className="dist-showcase-scene">{scene}</div>,
  }
}

const SHOWCASES = {
  'm1-u10-ops': wrap(
    'RPC — Client → Stub → Network → Server stub → Procedure',
    BLUE,
    <RpcScene />,
    'Stubs hide marshalling; the return path mirrors the call.',
    'rpc-path',
    'rpc-call-return',
    'rpc',
  ),
  'm1-u11-ops': wrap(
    'RPC message path — call out, return back',
    BLUE,
    <RpcScene />,
    'Watch the call hop forward and the result return on the feedback arc.',
    'rpc-path',
    'rpc-call-return',
    'rpc',
  ),
  'm3-u8-ops': wrap(
    'Lamport clocks — timelines with stamped messages',
    PURP,
    <LamportScene />,
    'On receive: LC = max(LC, Tm) + 1. Causality implies clock order.',
    'timeline',
    'lamport-clock',
    'lamport',
  ),
  'm3-u9-ops': wrap(
    'Logical clocks — message carries the timestamp',
    PURP,
    <LamportScene />,
    'Concurrent events can have incomparable Lamport times.',
    'timeline',
    'lamport-clock',
    'lamport',
  ),
  'm4-u4-ops': wrap(
    'Election — choose a new coordinator',
    AMBER,
    <ElectionScene />,
    'Detect failure → run election → announce the highest alive id.',
    'ring',
    'election-coord',
    'election',
  ),
  'm4-u5-ops': wrap(
    'Election message flow on the ring',
    AMBER,
    <ElectionScene />,
    'ELECTION circulates; COORDINATOR announces the winner.',
    'ring',
    'election-coord',
    'election',
  ),
  'm5-u6-ops': wrap(
    '2PC — PREPARE → YES/NO → COMMIT / ABORT',
    TEAL,
    <AtomicCommitScene />,
    'Any NO (or timeout) forces ABORT for all participants.',
    'commit',
    'atomic-2pc',
    '2pc',
  ),
  'm5-u7-ops': wrap(
    'Atomic commit — votes decide the outcome',
    TEAL,
    <AtomicCommitScene />,
    'Phase 1 collects votes; Phase 2 broadcasts the decision.',
    'commit',
    'atomic-2pc',
    '2pc',
  ),
  'm5-u14-ops': wrap(
    'Replication — Primary propagates updates',
    GREEN,
    <ReplicationScene />,
    'Client writes the primary; replicas apply the update stream.',
    'fanout',
    'replication-fanout',
    'replication',
  ),
  'm5-u15-ops': wrap(
    'Replica update propagation',
    GREEN,
    <ReplicationScene />,
    'Sync vs async trade latency for durability; failover promotes a replica.',
    'fanout',
    'replication-fanout',
    'replication',
  ),
}

export function getShowcase(id) {
  return SHOWCASES[id] || null
}
