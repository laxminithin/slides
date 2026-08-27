import {
  Lead,
  Points,
  ProcessPath,
  Takeaway,
  TwoColumn,
  VisualFirst,
} from './components/Teaching'

function DevicePath({ labels = ['Application', 'Transport', 'Network', 'Data Link', 'Physical'], packet = 'Photo' }) {
  return (
    <div className="cnx-device-path">
      <div className="cnx-device sender">Student laptop</div>
      <div className="cnx-journey-line">
        <span className="cnx-packet">{packet}</span>
        {labels.map((label) => <em key={label}>{label}</em>)}
      </div>
      <div className="cnx-device receiver">Destination app</div>
    </div>
  )
}

function LayerStack({ active = 'Network' }) {
  const layers = [
    ['Application', 'Data', 'name'],
    ['Transport', 'Segment', 'port'],
    ['Network', 'Packet', 'IP'],
    ['Data Link', 'Frame', 'MAC'],
    ['Physical', 'Bits', 'signal'],
  ]
  return (
    <div className="cnx-stack">
      {layers.map(([layer, pdu, id]) => (
        <div key={layer} className={layer === active ? 'active' : ''}>
          <strong>{layer}</strong><span>{pdu}</span><em>{id}</em>
        </div>
      ))}
    </div>
  )
}

/**
 * SVG network topology with a correct, distinct layout per type.
 * The previous CSS version drew the same 5 nodes + 6 rotated lines for every
 * type, so mesh/star/bus/ring/hybrid all looked identical. Here each type gets
 * its own node coordinates and its own real connectors inside a fixed viewBox.
 */
function Topology({ type = 'star' }) {
  const W = 660
  const H = 380
  const cx = W / 2
  const cy = 188
  const pentagon = [0, 1, 2, 3, 4].map((i) => {
    const a = -Math.PI / 2 + (i * 2 * Math.PI) / 5
    return { x: Math.round(cx + 150 * Math.cos(a)), y: Math.round(cy + 132 * Math.sin(a)), label: 'ABCDE'[i] }
  })

  let nodes = pentagon
  let edges = []
  let hubs = []

  if (type === 'mesh') {
    for (let i = 0; i < 5; i += 1) for (let j = i + 1; j < 5; j += 1) edges.push([i, j])
  } else if (type === 'ring') {
    edges = [[0, 1], [1, 2], [2, 3], [3, 4], [4, 0]]
  } else if (type === 'star') {
    hubs = [{ x: cx, y: cy, label: 'Hub' }]
    nodes = pentagon
    edges = [[0, 'h0'], [1, 'h0'], [2, 'h0'], [3, 'h0'], [4, 'h0']]
  } else if (type === 'bus') {
    const xs = [80, 210, 330, 455, 580]
    nodes = xs.map((x, i) => ({ x, y: i % 2 === 0 ? 96 : 280, label: 'ABCDE'[i] }))
    edges = nodes.map((_, i) => [i, `bus${i}`])
  } else {
    // hybrid: two star clusters joined by a backbone link
    hubs = [{ x: 210, y: cy, label: 'S1' }, { x: 450, y: cy, label: 'S2' }]
    nodes = [
      { x: 90, y: 90, label: 'A' }, { x: 90, y: 286, label: 'B' },
      { x: 330, y: 70, label: 'C' },
      { x: 570, y: 90, label: 'D' }, { x: 570, y: 286, label: 'E' },
    ]
    edges = [[0, 'h0'], [1, 'h0'], [2, 'h0'], [3, 'h1'], [4, 'h1'], ['h0', 'h1']]
  }

  const point = (ref) => {
    if (typeof ref === 'number') return nodes[ref]
    if (ref.startsWith('h')) return hubs[Number(ref.slice(1))]
    if (ref.startsWith('bus')) return { x: nodes[Number(ref.slice(3))].x, y: cy }
    return nodes[ref]
  }

  return (
    <div className="cnx-topology-svg">
      <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid meet" role="img" aria-label={`${type} topology`}>
        {type === 'bus' && (
          <line x1="48" y1={cy} x2={W - 48} y2={cy} stroke="#0f766e" strokeWidth="7" strokeLinecap="round" />
        )}
        {edges.map(([a, b], i) => {
          const p = point(a)
          const q = point(b)
          return <line key={i} x1={p.x} y1={p.y} x2={q.x} y2={q.y} stroke="#0284c7" strokeOpacity={type === 'mesh' ? 0.4 : 0.6} strokeWidth={type === 'mesh' ? 2.4 : 3.4} />
        })}
        {hubs.map((h, i) => (
          <g key={`hub-${i}`}>
            <circle cx={h.x} cy={h.y} r="30" fill="#0f766e" />
            <text x={h.x} y={h.y} className="cnx-topo-hub">{h.label}</text>
          </g>
        ))}
        {nodes.map((n, i) => (
          <g key={`node-${i}`}>
            <circle cx={n.x} cy={n.y} r="26" fill="#0284c7" />
            <text x={n.x} y={n.y} className="cnx-topo-node">{n.label}</text>
          </g>
        ))}
        <text x="26" y={H - 20} className="cnx-topo-title">{type.toUpperCase()} TOPOLOGY</text>
      </svg>
    </div>
  )
}

function Frame({ payload = 'Packet', stuffed }) {
  return (
    <div className="cnx-frame">
      <span>Flag</span><strong>{payload}</strong><span>FCS</span>
      {stuffed && <em>{stuffed}</em>}
    </div>
  )
}

/**
 * SVG sequence (ladder) diagram with two lifelines. Each row is either a
 * directed message (→ right, ← left, ⇄ both) drawn as an arrow between the
 * lifelines, or an event note (no arrow glyph) drawn as a centered box.
 * Replaces the old stacked-pill list that lost all direction information.
 */
function Sequence({ rows, left = 'Sender', right = 'Receiver' }) {
  const W = 580
  const SX = 118
  const RX = 462
  const MID = (SX + RX) / 2
  const top = 58
  const rowH = 56
  const H = top + rows.length * rowH + 24

  const toneColor = (tone) => (tone === 'warn' ? '#c2620a' : tone === 'ok' ? '#0f766e' : '#0369a1')
  const noteFill = (tone) => (tone === 'warn' ? '#fff7ed' : tone === 'ok' ? '#ecfdf5' : '#eff6ff')

  return (
    <div className="cnx-sequence-svg">
      <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid meet" role="img" aria-label={`Sequence diagram between ${left} and ${right}`}>
        <defs>
          <marker id="cnx-seq-arrow" viewBox="0 0 10 10" refX="8.5" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0,0 L10,5 L0,10 z" fill="context-stroke" />
          </marker>
        </defs>

        {/* lifeline heads */}
        {[[SX, left], [RX, right]].map(([x, name]) => (
          <g key={name}>
            <rect x={x - 66} y="14" width="132" height="34" rx="8" fill="#0f766e" />
            <text x={x} y="31" className="cnx-seq-host">{name}</text>
            <line x1={x} y1="48" x2={x} y2={H - 12} stroke="#94a3b8" strokeWidth="2" strokeDasharray="5 6" />
          </g>
        ))}

        {rows.map(([label, tone], i) => {
          const y = top + 26 + i * rowH
          const color = toneColor(tone)
          const bidir = label.includes('⇄')
          const right2 = label.includes('→')
          const leftDir = label.includes('←')
          const text = label.replace(/[→←⇄]/g, '').trim()
          const isArrow = bidir || right2 || leftDir

          if (!isArrow) {
            const w = Math.min(300, 40 + text.length * 8.6)
            return (
              <g key={`${label}-${i}`}>
                <rect x={MID - w / 2} y={y - 17} width={w} height="30" rx="15" fill={noteFill(tone)} stroke={color} strokeOpacity="0.5" />
                <text x={MID} y={y - 1} className="cnx-seq-note" style={{ fill: color }}>{text}</text>
              </g>
            )
          }

          const x1 = right2 || bidir ? SX : RX
          const x2 = right2 || bidir ? RX : SX
          return (
            <g key={`${label}-${i}`}>
              <text x={MID} y={y - 12} className="cnx-seq-msg" style={{ fill: color }}>{text}</text>
              <line x1={x1} y1={y} x2={x2} y2={y} stroke={color} strokeWidth="3"
                markerEnd="url(#cnx-seq-arrow)" markerStart={bidir ? 'url(#cnx-seq-arrow)' : undefined} />
            </g>
          )
        })}
      </svg>
    </div>
  )
}

function SharedMedium({ mode = 'CSMA/CD' }) {
  return (
    <div className="cnx-medium">
      {['A', 'B', 'C', 'D'].map((node) => <span key={node}>{node}</span>)}
      <strong>{mode}</strong>
      <em>shared channel</em>
    </div>
  )
}

/**
 * SVG weighted routing graph. The previous CSS version gave edges classNames
 * like "A-B" that had no positioning rules, so every edge collapsed to the
 * corner. Here nodes and weighted edges live in a fixed viewBox with weight
 * labels on backgrounds, plus an optional highlighted path and a caption.
 */
function RoutingGraph({ active = 'Least-cost path A → B → D → E (cost 6)', path = ['A', 'B', 'D', 'E'] }) {
  const pos = {
    A: { x: 70, y: 175 },
    B: { x: 250, y: 66 },
    C: { x: 250, y: 288 },
    D: { x: 470, y: 175 },
    E: { x: 620, y: 175 },
  }
  const edges = [['A', 'B', 2], ['A', 'C', 5], ['B', 'D', 1], ['C', 'D', 2], ['D', 'E', 3], ['B', 'E', 6]]
  const onPath = (a, b) => {
    for (let i = 0; i < path.length - 1; i += 1) {
      if ((path[i] === a && path[i + 1] === b) || (path[i] === b && path[i + 1] === a)) return true
    }
    return false
  }
  return (
    <div className="cnx-graph-svg">
      <svg viewBox="0 0 690 360" preserveAspectRatio="xMidYMid meet" role="img" aria-label="Weighted routing graph">
        {edges.map(([a, b, w]) => {
          const p = pos[a]
          const q = pos[b]
          const hot = onPath(a, b)
          const mx = (p.x + q.x) / 2
          const my = (p.y + q.y) / 2
          return (
            <g key={`${a}${b}`}>
              <line x1={p.x} y1={p.y} x2={q.x} y2={q.y} stroke={hot ? '#f59e0b' : '#0284c7'} strokeOpacity={hot ? 1 : 0.5} strokeWidth={hot ? 5 : 3} />
              <rect x={mx - 13} y={my - 13} width="26" height="26" rx="6" fill="#ffffff" stroke={hot ? '#f59e0b' : '#cbd5e1'} />
              <text x={mx} y={my} className="cnx-graph-weight">{w}</text>
            </g>
          )
        })}
        {Object.entries(pos).map(([label, p]) => {
          const hot = path.includes(label)
          return (
            <g key={label}>
              <circle cx={p.x} cy={p.y} r="27" fill={hot ? '#0f766e' : '#0284c7'} />
              <text x={p.x} y={p.y} className="cnx-topo-node">{label}</text>
            </g>
          )
        })}
      </svg>
      {active && <p className="cnx-graph-caption">{active}</p>}
    </div>
  )
}

function HeaderBuild({ fields }) {
  return (
    <div className="cnx-header-build">
      {fields.map((field) => <span key={field}>{field}</span>)}
    </div>
  )
}

function AppFlow({ protocol = 'HTTP' }) {
  return (
    <div className="cnx-app-flow">
      <span>Client process</span>
      <b>socket</b>
      <strong>{protocol}</strong>
      <b>socket</b>
      <span>Server process</span>
    </div>
  )
}

function slide({ id, kicker, title, subtitle, visual, points, takeaway, steps = 0 }) {
  return {
    id,
    kicker,
    title,
    subtitle,
    steps,
    content: (
      <TwoColumn visual={visual} ratio="copy-visual">
        {subtitle && <Lead>{subtitle}</Lead>}
        {points && <Points items={points} />}
        {takeaway && <Takeaway>{takeaway}</Takeaway>}
      </TwoColumn>
    ),
  }
}

function visualSlide({ id, kicker, title, lead, visual, takeaway, steps = 0 }) {
  return {
    id,
    kicker,
    title,
    steps,
    content: <VisualFirst lead={lead} visual={visual} takeaway={takeaway && <Takeaway>{takeaway}</Takeaway>} />,
  }
}

function title(moduleNumber, title, subtitle, visual = <DevicePath />) {
  return {
    id: `cn-m${moduleNumber}-title`,
    kicker: 'Computer Networks',
    title: null,
    hideTitle: true,
    layout: 'full',
    content: (
      <div className="title-hero cnx-title-hero">
        <div>
          <p className="slide-kicker">COMPUTER NETWORKS</p>
          <h1>Module {String(moduleNumber).padStart(2, '0')}</h1>
          <p className="subtitle">{title}</p>
          <p className="lead">{subtitle}</p>
          <div className="badge-row">
            <span className="pill">Message Journey</span>
            <span className="pill">Layered Reasoning</span>
            <span className="pill">Exam Diagrams</span>
          </div>
        </div>
        <div className="layout-visual">{visual}</div>
      </div>
    ),
  }
}

export const computerNetworksModule1Slides = [
  title(1, 'Foundations of Computer Networks', 'Follow one student message from a laptop toward a distant application.'),
  visualSlide({
    id: 'cn1-journey',
    kicker: 'Learning journey',
    title: 'One Message, Many Problems',
    lead: 'A photo does not simply “go to the Internet.” Each layer solves a different delivery problem.',
    visual: <ProcessPath steps={['Application data', 'Transport process', 'Network route', 'Link frame', 'Physical bits', 'Destination app']} />,
    takeaway: 'The whole subject is one message journey.',
  }),
  slide({
    id: 'cn1-components',
    kicker: 'Opening problem',
    title: 'What Is Required for Communication?',
    subtitle: 'A sender and receiver are not enough. They also need a message, a medium and a protocol.',
    visual: <DevicePath labels={['message', 'medium', 'protocol']} packet="Hello" />,
    points: ['Sender creates the data.', 'Receiver interprets the data.', 'Medium carries signals.', 'Protocol defines the rules.'],
    takeaway: 'Communication is coordinated delivery, not just movement.',
  }),
  slide({
    id: 'cn1-criteria',
    kicker: 'Network criteria',
    title: 'What Makes Communication Good?',
    subtitle: 'The message must arrive at the right place, correctly, on time and with stable delay when needed.',
    visual: <HeaderBuild fields={['Delivery', 'Accuracy', 'Timeliness', 'Jitter']} />,
    points: ['Delivery: correct destination.', 'Accuracy: no uncorrected errors.', 'Timeliness: arrives when useful.', 'Jitter: variation in delay.'],
    takeaway: 'A network is judged by service quality, not only connectivity.',
  }),
  slide({
    id: 'cn1-data-flow',
    kicker: 'Data flow',
    title: 'Which Direction Can Data Move?',
    subtitle: 'Simplex, half duplex and full duplex describe the direction of communication.',
    visual: <HeaderBuild fields={['Simplex →', 'Half duplex ⇄ one at a time', 'Full duplex ⇄ simultaneous']} />,
    points: ['Simplex: keyboard to monitor style one-way flow.', 'Half duplex: walkie-talkie turn taking.', 'Full duplex: phone-call style simultaneous flow.'],
    takeaway: 'Direction changes the behaviour users experience.',
  }),
  ...['mesh', 'star', 'bus', 'ring', 'hybrid'].map((type) => slide({
    id: `cn1-topology-${type}`,
    kicker: 'Topology story',
    title: `${type[0].toUpperCase()}${type.slice(1)} Topology`,
    subtitle: 'A small office keeps changing its wiring plan as cost, reliability and growth pressure appear.',
    visual: <Topology type={type} />,
    points: type === 'mesh'
      ? ['Every device can have many direct links.', 'High reliability, but expensive as devices grow.', 'Best for critical backbone paths, not every classroom lab.']
      : type === 'star'
        ? ['All devices connect through a central switch or hub.', 'Easy to manage and expand.', 'Central device failure affects the network.']
        : type === 'bus'
          ? ['One shared backbone carries all signals.', 'Simple and inexpensive.', 'Collisions and backbone failure are major limits.']
          : type === 'ring'
            ? ['Each device connects to two neighbours.', 'Frames circulate around the ring.', 'A break can disturb communication unless protected.']
            : ['Real networks combine topologies.', 'Design follows cost, reliability and scale.', 'Most campus networks are hybrid.'],
    takeaway: 'Topology is a design trade-off, not a memorisation list.',
  })),
  slide({
    id: 'cn1-lan-man-wan',
    kicker: 'Scale',
    title: 'LAN, MAN and WAN Grow by Coverage',
    subtitle: 'The same message can move from a room, to a campus, to a city, and then across countries.',
    visual: <HeaderBuild fields={['Room', 'Building', 'Campus', 'City', 'Country']} />,
    points: ['LAN: local ownership and high speed.', 'MAN: city-scale connectivity.', 'WAN: large geographic reach through service providers.'],
    takeaway: 'Network type is mainly about scale, ownership and reach.',
  }),
  slide({
    id: 'cn1-switching',
    kicker: 'Switching',
    title: 'Phone Call or Internet Message?',
    subtitle: 'Circuit switching reserves a path; packet switching divides the message and forwards packets.',
    visual: <HeaderBuild fields={['Circuit: reserved path', 'Packet: split', 'Route', 'Reassemble']} />,
    points: ['Circuit switching is predictable but can waste capacity.', 'Datagram packet switching routes each packet independently.', 'Virtual circuit mode establishes a logical path first.'],
    takeaway: 'The Internet is built around packet forwarding.',
  }),
  slide({
    id: 'cn1-layering',
    kicker: 'Protocol layering',
    title: 'Each Layer Solves One Part',
    subtitle: 'Layering keeps a complex communication problem teachable and implementable.',
    visual: <LayerStack active="Transport" />,
    points: ['Application creates meaning.', 'Transport identifies processes.', 'Network chooses paths.', 'Data link handles one hop.', 'Physical transmits signals.'],
    takeaway: 'Encapsulation is layered problem solving.',
  }),
  slide({
    id: 'cn1-osi-tcpip',
    kicker: 'OSI and TCP/IP',
    title: 'Encapsulation and Decapsulation',
    subtitle: 'At the sender, headers are added. At the receiver, headers are removed in reverse order.',
    visual: <LayerStack active="Data Link" />,
    points: ['Data becomes segment, packet, frame and bits.', 'Each layer adds information needed by its peer layer.', 'The receiver reverses the process.'],
    takeaway: 'The stack is a journey down and back up.',
  }),
  slide({
    id: 'cn1-addressing',
    kicker: 'Addressing',
    title: 'Four Identities in One Journey',
    subtitle: 'Different layers answer different “who should receive this?” questions.',
    visual: <HeaderBuild fields={['Name: human service', 'Port: process', 'IP: host', 'MAC: next link']} />,
    points: ['MAC can change hop by hop.', 'IP normally remains end to end.', 'Port identifies the destination application process.', 'Names help humans before resolution.'],
    takeaway: 'Addressing is layered identity.',
  }),
  slide({
    id: 'cn1-media',
    kicker: 'Transmission media',
    title: 'How Do Bits Physically Travel?',
    subtitle: 'Copper, fiber and wireless carry different signal types with different trade-offs.',
    visual: <HeaderBuild fields={['Copper: electrical', 'Fiber: light', 'Wireless: radio']} />,
    points: ['Copper is common but affected by interference.', 'Fiber supports high bandwidth and longer distance.', 'Wireless gives mobility but shares spectrum.'],
    takeaway: 'The physical medium shapes speed, range and reliability.',
  }),
  visualSlide({
    id: 'cn1-recap',
    kicker: 'Module recap',
    title: 'Foundation Exam Map',
    lead: 'When asked to explain networks, start from the message journey and then name the layer, address, medium or topology involved.',
    visual: <ProcessPath steps={['Components', 'Criteria', 'Topologies', 'Scale', 'Switching', 'Layering', 'Addressing', 'Media']} />,
    takeaway: 'A neat diagram plus one real example usually makes the answer strong.',
  }),
]

export const computerNetworksModule2Slides = [
  title(2, 'Data Link Layer', 'The packet has reached one link. Now it must become a reliable frame.'),
  visualSlide({ id: 'cn2-journey', kicker: 'Learning journey', title: 'One Link, Many Risks', lead: 'The data-link layer turns a packet into frames, controls speed, detects errors and coordinates shared access.', visual: <ProcessPath steps={['Framing', 'Stuffing', 'Flow control', 'Error control', 'ARQ', 'Random access', 'Checksum/CRC', 'PPP']} />, takeaway: 'This module is about one hop at a time.' }),
  slide({ id: 'cn2-framing', kicker: 'Framing', title: 'Where Does One Frame End?', subtitle: 'A receiver sees a stream of bits. Framing adds structure so boundaries are clear.', visual: <Frame payload="Network packet" />, points: ['Header identifies control information.', 'Payload carries the packet.', 'Trailer often carries error-detection bits.'], takeaway: 'Framing converts raw stream into manageable units.' }),
  slide({ id: 'cn2-byte-stuffing', kicker: 'Byte stuffing', title: 'What If Data Contains a Flag Byte?', subtitle: 'If a flag appears inside data, the sender inserts an escape byte so the receiver does not mistake it for a boundary.', visual: <Frame payload="A ESC FLAG B" stuffed="receiver removes ESC" />, points: ['Flag marks frame boundary.', 'ESC protects special bytes in data.', 'Receiver reverses the stuffing.'], takeaway: 'Stuffing preserves data while protecting delimiters.' }),
  slide({ id: 'cn2-bit-stuffing', kicker: 'Bit stuffing', title: 'Five 1s Trigger an Inserted 0', subtitle: 'After five consecutive 1 bits, the sender inserts 0. The receiver removes that 0.', visual: <HeaderBuild fields={['11111', 'insert 0', '111110', 'receiver removes 0']} />, points: ['Prevents accidental flag patterns.', 'Works at bit level rather than byte level.', 'The inserted bit is not original data.'], takeaway: 'The receiver must undo exactly what the sender added.' }),
  slide({ id: 'cn2-flow-control', kicker: 'Flow control', title: 'The Sender Can Overwhelm the Receiver', subtitle: 'When the sender is faster than the receiver, buffers can overflow.', visual: <Sequence rows={[['Frame 0 →'], ['Frame 1 →'], ['Buffer pressure', 'warn'], ['Pause / window limit', 'ok']]} />, points: ['Flow control protects receiver capacity.', 'A window limits unacknowledged frames.', 'ACKs allow the sender to continue.'], takeaway: 'Flow control is receiver protection.' }),
  slide({ id: 'cn2-error-control', kicker: 'Error control', title: 'A Frame May Be Lost or Corrupted', subtitle: 'Error control detects trouble and triggers retransmission.', visual: <Sequence rows={[['Frame 0 corrupted →', 'warn'], ['NAK / timeout ←', 'warn'], ['Frame 0 retransmitted →', 'ok'], ['ACK 1 ←', 'ok']]} />, points: ['Detection finds corruption.', 'Timeout handles loss.', 'Sequence numbers detect duplicates.'], takeaway: 'Reliability is built from detection, feedback and retry.' }),
  slide({ id: 'cn2-stop-wait', kicker: 'Stop-and-Wait', title: 'Send One, Then Wait', subtitle: 'The sender transmits one frame and waits for its acknowledgement before sending the next.', visual: <Sequence rows={[['Frame 0 →'], ['ACK 1 ←'], ['Frame 1 →'], ['ACK 0 ←']]} />, points: ['Simple protocol.', 'Easy duplicate detection with sequence 0/1.', 'Inefficient on long-delay links.'], takeaway: 'Simplicity costs utilisation.' }),
  slide({ id: 'cn2-arq', kicker: 'ARQ', title: 'Timeouts Make Stop-and-Wait Reliable', subtitle: 'ARQ adds retransmission when frames or ACKs are lost.', visual: <Sequence rows={[['Frame 0 →'], ['lost ACK', 'warn'], ['timeout', 'warn'], ['Frame 0 again →'], ['duplicate discarded / ACK ←', 'ok']]} />, points: ['Frame loss causes timeout.', 'ACK loss can create duplicate frames.', 'Sequence numbers prevent duplicate delivery.'], takeaway: 'ARQ turns uncertainty into controlled retry.' }),
  slide({ id: 'cn2-windows', kicker: 'Sliding windows', title: 'Send Several Frames Before Waiting', subtitle: 'Go-Back-N and Selective Repeat improve efficiency by allowing multiple outstanding frames.', visual: <HeaderBuild fields={['Window: F0 F1 F2', 'ACK slides', 'Go-Back-N retransmits a run', 'Selective Repeat retransmits only missing frames']} />, points: ['Window size controls how much can be in flight.', 'Go-Back-N is simpler but may resend good frames.', 'Selective Repeat needs more receiver buffering.'], takeaway: 'Sliding windows trade complexity for better link use.' }),
  slide({ id: 'cn2-random-access', kicker: 'Random access', title: 'Many Devices Share One Medium', subtitle: 'The problem is deciding who may transmit and what happens during collisions.', visual: <SharedMedium mode="ALOHA → CSMA" />, points: ['ALOHA transmits whenever ready.', 'Slotted ALOHA waits for slot boundaries.', 'CSMA listens before transmitting.'], takeaway: 'Random access is coordination without a central schedule.' }),
  slide({ id: 'cn2-csma', kicker: 'CSMA variants', title: 'Detect or Avoid Collisions', subtitle: 'CSMA/CD detects collisions; CSMA/CA tries to avoid them before they occur.', visual: <SharedMedium mode="CSMA/CD vs CSMA/CA" />, points: ['CSMA/CD fits shared wired Ethernet history.', 'CSMA/CA is important in wireless where collision detection is hard.', 'Backoff reduces repeated collision.'], takeaway: 'Listening is not enough; the protocol must recover fairly.' }),
  slide({ id: 'cn2-checksum', kicker: 'Checksum', title: 'Checksum Uses Binary Addition', subtitle: 'Divide data into words, add them with wraparound, complement the sum and verify at the receiver.', visual: <HeaderBuild fields={['word 1', '+ word 2', 'wrap carry', 'complement', 'verify']} />, points: ['Simple error detection.', 'Used in Internet protocols.', 'Not as strong as CRC for burst errors.'], takeaway: 'Checksum is arithmetic-based error detection.' }),
  slide({ id: 'cn2-crc', kicker: 'CRC', title: 'CRC Treats Bits Like a Polynomial', subtitle: 'Sender divides data by a generator and appends the remainder. Receiver divides again to check.', visual: <HeaderBuild fields={['Data polynomial', 'Generator', 'Division', 'Remainder', 'Codeword']} />, points: ['Strong for burst-error detection.', 'Remainder becomes the FCS.', 'Receiver expects zero remainder for a valid codeword.'], takeaway: 'CRC is division-based error detection.' }),
  slide({ id: 'cn2-ppp', kicker: 'PPP', title: 'PPP Packages Point-to-Point Links', subtitle: 'PPP provides framing, link control and network-layer protocol support over a direct link.', visual: <Frame payload="PPP payload" stuffed="Flag · Address · Control · Protocol · FCS" />, points: ['Used over point-to-point connections.', 'Supports multiple network-layer protocols.', 'Includes error detection but not full reliability by itself.'], takeaway: 'PPP is a practical data-link framing protocol.' }),
  visualSlide({ id: 'cn2-recap', kicker: 'Module recap', title: 'Data-Link Exam Map', lead: 'For each protocol, explain the problem first: boundary, speed, error, shared medium or direct-link packaging.', visual: <ProcessPath steps={['Frame', 'Stuff', 'Control flow', 'Detect errors', 'Retransmit', 'Share medium', 'Check bits', 'PPP']} />, takeaway: 'Sequence diagrams are the clearest way to teach Module 2.' }),
]

export const computerNetworksModule3Slides = [
  title(3, 'Network Layer', 'Frames cross one link; packets must cross many networks.'),
  visualSlide({ id: 'cn3-journey', kicker: 'Learning journey', title: 'From One Hop to Many Hops', lead: 'The network layer provides logical addressing, packet forwarding and route selection across interconnected networks.', visual: <ProcessPath steps={['Service model', 'Packet switching', 'IPv4', 'IPv6', 'Least-cost routing', 'Distance vector', 'Link state', 'RIP/OSPF/BGP', 'Multicast']} />, takeaway: 'Routers move packets toward a destination network.' }),
  slide({ id: 'cn3-services', kicker: 'Network services', title: 'What Service Does the Network Layer Provide?', subtitle: 'It delivers packets from source host to destination host across multiple links.', visual: <DevicePath labels={['router', 'router', 'router']} packet="IP packet" />, points: ['Host-to-host delivery.', 'Logical addressing.', 'Routing and forwarding.', 'Fragmentation when required.'], takeaway: 'The network layer sees the path beyond one link.' }),
  slide({ id: 'cn3-packet-switching', kicker: 'Packet switching', title: 'Packets Move Independently or Along a Virtual Circuit', subtitle: 'Datagram networks route each packet independently; virtual-circuit networks establish a logical path first.', visual: <RoutingGraph active="datagram paths may differ" />, points: ['Datagram: flexible but packets may arrive out of order.', 'Virtual circuit: setup first, then packets follow the same path.', 'Routers forward based on table entries.'], takeaway: 'Forwarding is local; routing creates the table behind it.' }),
  slide({ id: 'cn3-ipv4-address', kicker: 'IPv4', title: 'IPv4 Gives the Host a Logical Address', subtitle: 'Dotted-decimal notation is a readable form of a 32-bit address.', visual: <HeaderBuild fields={['192', '168', '1', '25']} />, points: ['Network portion identifies the network.', 'Host portion identifies the host inside that network.', 'Subnetting adjusts the boundary.'], takeaway: 'IP addresses are hierarchical, unlike flat MAC addresses.' }),
  slide({ id: 'cn3-ipv4-header', kicker: 'IPv4 header', title: 'Build the IPv4 Header by Purpose', subtitle: 'The header fields support versioning, length, fragmentation, lifetime, protocol selection and addressing.', visual: <HeaderBuild fields={['Version', 'IHL', 'Total Length', 'ID', 'Flags', 'Offset', 'TTL', 'Protocol', 'Checksum', 'Source IP', 'Destination IP']} />, points: ['TTL prevents endless circulation.', 'Protocol tells which transport protocol receives the payload.', 'Source and destination IP remain end-to-end.'], takeaway: 'A header is not a table to memorise; each field solves a packet problem.' }),
  slide({ id: 'cn3-ipv6', kicker: 'IPv6', title: 'IPv6 Responds to IPv4 Limits', subtitle: 'Address exhaustion and header complexity motivated a larger, cleaner protocol design.', visual: <HeaderBuild fields={['128-bit address', 'simpler base header', 'extension headers', 'better autoconfiguration']} />, points: ['Much larger address space.', 'No header checksum in base header.', 'Extension headers support optional features.', 'Designed for modern scale.'], takeaway: 'IPv6 is a redesign for address scale and simpler forwarding.' }),
  slide({ id: 'cn3-routing', kicker: 'Routing', title: 'Which Route Should the Packet Take?', subtitle: 'Routers and links form a weighted graph. Routing chooses a good next hop.', visual: <RoutingGraph />, points: ['Cost may represent delay, bandwidth, hop count or policy.', 'Least-cost routing seeks the minimum-cost path.', 'Forwarding uses the selected next hop.'], takeaway: 'Routing converts topology into forwarding decisions.' }),
  slide({ id: 'cn3-distance-vector', kicker: 'Distance vector', title: 'Routers Share What They Know', subtitle: 'Each router knows neighbours first, then tables improve as neighbours exchange distance vectors.', visual: <RoutingGraph active="Bellman-Ford updates" />, points: ['Information is local and iterative.', 'Bellman-Ford updates distance estimates.', 'Count-to-infinity can occur after failures.'], takeaway: 'Distance vector learns by neighbour gossip.' }),
  slide({ id: 'cn3-link-state', kicker: 'Link state', title: 'Routers Flood Local Link Knowledge', subtitle: 'Each router tells the network about its neighbours, so every router can build the same map.', visual: <ProcessPath steps={['Discover neighbours', 'Create LSP', 'Flood LSPs', 'Build LSDB', 'Run Dijkstra', 'Forwarding table']} direction="vertical" />, points: ['Link-state database represents topology.', 'Dijkstra computes shortest paths from the router.', 'More complete knowledge than distance vector.'], takeaway: 'Link state learns by shared maps.' }),
  slide({ id: 'cn3-dijkstra', kicker: 'Dijkstra', title: 'Shortest-Path Tree Grows One Node at a Time', subtitle: 'Start at the root, choose the closest tentative node, relax edges and repeat.', visual: <RoutingGraph active="SPT from A" />, points: ['Tentative distances improve during relaxation.', 'Closest tentative node becomes permanent.', 'The final tree determines next hops.'], takeaway: 'Dijkstra is a controlled expansion of certainty.' }),
  slide({ id: 'cn3-rip', kicker: 'RIP', title: 'RIP Uses Hop Count Inside an AS', subtitle: 'RIP is a simple distance-vector protocol using hop count as its metric.', visual: <HeaderBuild fields={['Interior routing', 'Distance vector', 'Hop count', 'Simple updates']} />, points: ['Easy to understand and configure.', 'Limited by hop-count metric.', 'Best for smaller networks.'], takeaway: 'RIP is simple, but simplicity limits scale.' }),
  slide({ id: 'cn3-ospf', kicker: 'OSPF', title: 'OSPF Uses Link State and Areas', subtitle: 'OSPF floods link-state information and supports hierarchical area design.', visual: <HeaderBuild fields={['Interior routing', 'Link state', 'Areas', 'Dijkstra']} />, points: ['Routers build an LSDB.', 'Shortest paths are computed locally.', 'Areas improve scalability.'], takeaway: 'OSPF is link-state routing for larger internal networks.' }),
  slide({ id: 'cn3-bgp', kicker: 'BGP', title: 'BGP Routes Between Autonomous Systems', subtitle: 'Between organisations, policy matters as much as path length.', visual: <HeaderBuild fields={['AS 100', 'AS 200', 'AS 300', 'policy path']} />, points: ['Path-vector routing.', 'Used between autonomous systems.', 'Supports policy-based decisions.'], takeaway: 'BGP is the Internet’s inter-domain routing language.' }),
  slide({ id: 'cn3-multicast', kicker: 'Multicasting', title: 'One Sender, Many Receivers', subtitle: 'Multicast avoids sending duplicate unicast packets when a group should receive the same data.', visual: <RoutingGraph active="multicast tree" />, points: ['Receivers join a group.', 'Routers build delivery trees.', 'Useful for streaming and group distribution.'], takeaway: 'Multicast sends once where paths are shared.' }),
  visualSlide({ id: 'cn3-recap', kicker: 'Module recap', title: 'Network-Layer Exam Map', lead: 'Draw a graph, name the address, then explain how routing information becomes a forwarding table.', visual: <ProcessPath steps={['IP address', 'Packet', 'Router', 'Routing graph', 'Algorithm', 'Protocol', 'Forwarding']} />, takeaway: 'Module 3 is the story of path selection.' }),
]

export const computerNetworksModule4Slides = [
  title(4, 'Transport Layer', 'The packet reached the host. Now it must reach the correct process reliably when needed.'),
  visualSlide({ id: 'cn4-journey', kicker: 'Learning journey', title: 'Host Delivery Is Not Enough', lead: 'Transport protocols provide process-to-process communication, multiplexing, and optional reliability.', visual: <ProcessPath steps={['Ports', 'Multiplexing', 'UDP', 'TCP', 'Handshake', 'Flow control', 'Congestion control', 'Closing']} />, takeaway: 'Transport is where host delivery becomes application delivery.' }),
  slide({ id: 'cn4-process', kicker: 'Process delivery', title: 'Which Application Should Receive the Data?', subtitle: 'IP gets the packet to a host. Port numbers get data to the correct process.', visual: <AppFlow protocol="ports" />, points: ['A host may run many network applications.', 'Source and destination ports identify endpoints.', 'Transport multiplexes and demultiplexes data.'], takeaway: 'Port numbers complete delivery inside the host.' }),
  slide({ id: 'cn4-udp', kicker: 'UDP', title: 'UDP Is Fast and Minimal', subtitle: 'UDP is connectionless and low overhead, useful when speed or simplicity is preferred.', visual: <HeaderBuild fields={['Source port', 'Destination port', 'Length', 'Checksum']} />, points: ['No connection setup.', 'No guaranteed delivery or ordering.', 'Common for DNS, streaming and simple request-response.'], takeaway: 'UDP gives applications a lightweight datagram service.' }),
  slide({ id: 'cn4-tcp', kicker: 'TCP', title: 'TCP Provides a Reliable Byte Stream', subtitle: 'TCP is used when data must arrive ordered and reliably, such as files and web objects.', visual: <HeaderBuild fields={['Sequence number', 'ACK', 'Window', 'Checksum', 'Flags']} />, points: ['Connection-oriented.', 'Acknowledgements and retransmissions.', 'Flow control using receiver window.', 'Congestion control to protect the network.'], takeaway: 'TCP trades overhead for reliability and control.' }),
  slide({ id: 'cn4-handshake', kicker: 'TCP handshake', title: 'Why Three Messages?', subtitle: 'Both sides must prove they can send and receive before data transfer begins.', visual: <Sequence rows={[['SYN →'], ['SYN-ACK ←'], ['ACK →'], ['Data can begin', 'ok']]} left="Client" right="Server" />, points: ['SYN starts connection setup.', 'SYN-ACK confirms receiver readiness and its own sequence.', 'ACK confirms both directions.'], takeaway: 'Two messages cannot confirm bidirectional readiness safely.' }),
  slide({ id: 'cn4-transfer', kicker: 'TCP data transfer', title: 'Sequence Numbers Turn Bytes into Ordered Delivery', subtitle: 'TCP numbers bytes, acknowledges received data and retransmits missing data.', visual: <Sequence rows={[['Seq 100, 500 bytes →'], ['ACK 600 ←'], ['Seq 600, 500 bytes →'], ['ACK 1100 ←']]} />, points: ['ACK means next expected byte.', 'Missing data is detected by ACK behaviour or timeout.', 'Receiver reorders data before delivery.'], takeaway: 'TCP reliability is byte-stream bookkeeping.' }),
  slide({ id: 'cn4-flow-congestion', kicker: 'Control concepts', title: 'Flow Control vs Congestion Control',
    subtitle: 'They sound similar, but they protect different things.',
    visual: <HeaderBuild fields={['Flow: protect receiver', 'Congestion: protect network']} />,
    points: ['Flow control prevents receiver buffer overflow.', 'Congestion control prevents routers and links from overload.', 'A sender must respect both limits.'],
    takeaway: 'Receiver pressure and network pressure are different signals.' }),
  slide({ id: 'cn4-close', kicker: 'Connection termination', title: 'TCP Also Closes Carefully', subtitle: 'Connection release uses FIN/ACK exchange so both sides finish sending cleanly.', visual: <Sequence rows={[['FIN →'], ['ACK ←'], ['FIN ←'], ['ACK →']]} left="Client" right="Server" />, points: ['Each direction closes independently.', 'Outstanding data can be acknowledged.', 'A clean close prevents confusion about later segments.'], takeaway: 'TCP manages the whole conversation lifecycle.' }),
  visualSlide({ id: 'cn4-recap', kicker: 'Module recap', title: 'Transport Exam Map', lead: 'Always distinguish host delivery from process delivery, then compare UDP and TCP through service guarantees.', visual: <ProcessPath steps={['Host', 'Port', 'UDP datagram', 'TCP stream', 'ACK', 'Window', 'Congestion', 'Close']} />, takeaway: 'Transport is the application-facing control layer.' }),
]

export const computerNetworksModule5Slides = [
  title(5, 'Application Layer', 'Applications now use the transport service to exchange meaningful messages.'),
  visualSlide({ id: 'cn5-journey', kicker: 'Learning journey', title: 'Network Services Become User Services', lead: 'The application layer explains web, file transfer, email, remote access and socket programming.', visual: <ProcessPath steps={['Client-server', 'Sockets', 'UDP app', 'TCP app', 'HTTP', 'Cookies', 'FTP', 'Email/MIME', 'TELNET']} />, takeaway: 'Application protocols define meaning, not just delivery.' }),
  slide({ id: 'cn5-client-server', kicker: 'Client-server', title: 'One Process Requests, Another Serves', subtitle: 'The client initiates communication; the server waits at a known address and port.', visual: <AppFlow protocol="request / response" />, points: ['Server process listens on a port.', 'Client process creates a socket.', 'The pair of socket addresses identifies the conversation.'], takeaway: 'A socket is the application endpoint of network communication.' }),
  slide({ id: 'cn5-udp-socket', kicker: 'UDP programming', title: 'UDP Client-Server Flow', subtitle: 'UDP applications exchange independent datagrams without connection setup.', visual: <Sequence rows={[['client datagram →'], ['server reply ←']]} left="Client" right="Server" />, points: ['Simple send and receive calls.', 'Application handles loss if needed.', 'Useful for small queries and low-latency services.'], takeaway: 'UDP programming is message-oriented.' }),
  slide({ id: 'cn5-tcp-socket', kicker: 'TCP programming', title: 'TCP Client-Server Flow', subtitle: 'TCP applications establish a connection, exchange byte streams, then close.', visual: <Sequence rows={[['connect →'], ['accept ←'], ['stream data ⇄'], ['close ⇄']]} left="Client" right="Server" />, points: ['Server listens; client connects.', 'After setup, both sides read and write streams.', 'TCP handles ordering and reliability.'], takeaway: 'TCP programming is connection-oriented.' }),
  slide({ id: 'cn5-http-story', kicker: 'HTTP', title: 'What Happens After Typing a URL?', subtitle: 'The browser resolves a name, connects, sends an HTTP request and renders the response.', visual: <ProcessPath steps={['URL', 'DNS lookup', 'TCP connection', 'HTTP request', 'HTTP response', 'Render page']} direction="vertical" />, points: ['Request line names method and resource.', 'Headers carry metadata.', 'Body carries optional content.', 'Status code summarises result.'], takeaway: 'HTTP is a request-response application protocol.' }),
  slide({ id: 'cn5-status', kicker: 'HTTP status', title: 'Status Codes Tell the Browser What Happened', subtitle: 'The response status line quickly communicates success or failure category.', visual: <HeaderBuild fields={['200 OK', '404 Not Found', '500 Server Error']} />, points: ['200: request succeeded.', '404: resource not found.', '500: server-side failure.'], takeaway: 'Status codes are compact application-layer feedback.' }),
  slide({ id: 'cn5-persistent', kicker: 'HTTP connections', title: 'Persistent vs Non-Persistent HTTP', subtitle: 'Non-persistent opens a new TCP connection per object; persistent reuses the connection.', visual: <HeaderBuild fields={['Non-persistent: many TCP setups', 'Persistent: reuse connection']} />, points: ['Non-persistent has more setup overhead.', 'Persistent improves page loading with multiple objects.', 'Modern web communication relies heavily on reuse.'], takeaway: 'Connection management changes web performance.' }),
  slide({ id: 'cn5-cookies', kicker: 'Cookies', title: 'How Does a Site Remember a Cart?', subtitle: 'HTTP is stateless, so cookies carry a small identifier between browser and server.', visual: <Sequence rows={[['response: Set-Cookie ←'], ['browser stores cookie', 'ok'], ['request: Cookie →']]} left="Browser" right="Server" />, points: ['Server creates cookie value.', 'Browser stores and returns it on later requests.', 'Server uses it to associate state.'], takeaway: 'Cookies add continuity to a stateless protocol.' }),
  slide({ id: 'cn5-ftp', kicker: 'FTP', title: 'FTP Uses Separate Control and Data Connections', subtitle: 'Commands and file bytes travel on different connections.', visual: <HeaderBuild fields={['Control connection', 'USER/PASS/LIST', 'Data connection', 'upload/download']} />, points: ['Control connection stays for commands.', 'Data connection carries file transfer.', 'Separate channels make FTP distinctive.'], takeaway: 'FTP separates conversation from content transfer.' }),
  slide({ id: 'cn5-email', kicker: 'Email', title: 'Email Travels Through Mail Servers', subtitle: 'A message moves from user agent to mail server, across SMTP, then to the receiver through POP3 or IMAP.', visual: <ProcessPath steps={['Sender UA', 'Sender mail server', 'SMTP', 'Receiver mail server', 'POP3/IMAP', 'Receiver UA']} direction="vertical" />, points: ['SMTP pushes mail between servers.', 'POP3 or IMAP retrieves mail for the receiver.', 'MIME represents attachments and non-ASCII content.'], takeaway: 'Email is store-and-forward application communication.' }),
  slide({ id: 'cn5-telnet', kicker: 'Remote access', title: 'TELNET and Remote Login Concepts', subtitle: 'Remote login protocols let a user interact with a distant machine through a terminal-like session.', visual: <AppFlow protocol="remote terminal" />, points: ['Application protocol carries terminal input and output.', 'Historically TELNET was simple but insecure.', 'The concept is remote command interaction.'], takeaway: 'Application protocols define the user-visible service.' }),
  visualSlide({ id: 'cn5-recap', kicker: 'Module recap', title: 'Application-Layer Exam Map', lead: 'For each application protocol, name the service, endpoints, message flow, and transport assumptions.', visual: <ProcessPath steps={['Socket', 'UDP/TCP', 'HTTP', 'Cookie', 'FTP', 'Email', 'MIME', 'Remote login']} />, takeaway: 'Application layer is where network delivery becomes a user-facing service.' }),
]
