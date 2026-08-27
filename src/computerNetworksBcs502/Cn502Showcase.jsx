/**
 * Cn502Showcase — wide hero teaching scenes for BCS502.
 * Keyed by slide id for buildSlides showcase layout.
 */
import {
  EncapsulationScene,
  CrcFlowScene,
  DistanceVectorScene,
  TcpHandshakeScene,
  DnsChainScene,
  PALETTE,
} from './Cn502Scenes.jsx'

const { BLUE, AMBER, GREEN, PURP, NAVY } = PALETTE

function wrap(title, hue, scene, takeaway, camera = 'wide-process', family = 'process-flow', object = 'network') {
  return {
    title,
    camera,
    family,
    object,
    takeaway,
    scene: <div className="cn502-showcase-scene">{scene}</div>,
  }
}

const SHOWCASES = {
  'm1-u10-ops': wrap(
    'OSI / TCP-IP encapsulation — headers added going down',
    BLUE,
    <EncapsulationScene />,
    'Each layer adds a header on the way down; the receiver strips headers going up.',
    'cascade',
    'waterfall-cascade',
    'osi',
  ),
  'm1-u11-ops': wrap(
    'OSI message movement — encapsulate then decapsulate',
    NAVY,
    <EncapsulationScene />,
    'Watch the PDU grow with headers, then shrink as layers peel them off.',
    'cascade',
    'waterfall-cascade',
    'osi',
  ),
  'm2-u2-ops': wrap(
    'Error detection — Data → Codeword → TX → Error → Detect',
    AMBER,
    <CrcFlowScene />,
    'CRC appends a remainder; nonzero remainder at the receiver means error.',
    'flow',
    'process-flow',
    'crc',
  ),
  'm2-u6-ops': wrap(
    'Cyclic codes / CRC — generator produces the check bits',
    AMBER,
    <CrcFlowScene />,
    'Codeword = data + CRC. Exam diagrams must show TX, channel error, and detect.',
    'flow',
    'process-flow',
    'crc',
  ),
  'm3-u14-ops': wrap(
    'Distance vector — neighbour tables + Bellman-Ford iterate',
    PURP,
    <DistanceVectorScene />,
    'Exchange DVs with neighbours; relax costs until the table stabilises.',
    'map',
    'feedback-loop',
    'dvr',
  ),
  'm3-u15-ops': wrap(
    'Distance vector message movement — cost update intuition',
    PURP,
    <DistanceVectorScene />,
    'A cheaper path via a neighbour triggers a table update (count-to-infinity risk).',
    'map',
    'feedback-loop',
    'dvr',
  ),
  'm4-u14-ops': wrap(
    'TCP 3-way handshake — SYN → SYN-ACK → ACK',
    GREEN,
    <TcpHandshakeScene />,
    'Both sides agree on initial sequence numbers before ESTABLISHED.',
    'flow',
    'process-flow',
    'tcp',
  ),
  'm4-u15-ops': wrap(
    'TCP connection setup — watch the three segments',
    GREEN,
    <TcpHandshakeScene />,
    'Label seq/ack on each segment for full marks.',
    'flow',
    'process-flow',
    'tcp',
  ),
  'm5-u12-ops': wrap(
    'DNS chain — Browser → Resolver → Root → TLD → Auth → IP',
    BLUE,
    <DnsChainScene />,
    'Resolver walks the hierarchy; answers cache on the return path.',
    'pipeline',
    'xp-pipeline',
    'dns',
  ),
  'm5-u13-ops': wrap(
    'DNS message movement — iterative lookup path',
    BLUE,
    <DnsChainScene />,
    'From the client it looks recursive; the resolver usually queries iteratively.',
    'pipeline',
    'xp-pipeline',
    'dns',
  ),
}

export function getShowcase(id) {
  return SHOWCASES[id] || null
}
