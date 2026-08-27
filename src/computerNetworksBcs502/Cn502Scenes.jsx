/** Cn502Scenes — Computer Networks classroom visuals (BCS502) */
const N = '#0f172a'
const BLUE = '#0ea5a4'
const MUTED = '#64748b'
const CREAM = '#f8fafc'
const SKY = '#e0f2fe'
const AMBER = '#d97706'
const RED = '#dc2626'
const GREEN = '#16a34a'
const PURP = '#7c3aed'
const NAVY = '#1e3a5f'
export const PALETTE = { N, BLUE, MUTED, CREAM, SKY, AMBER, RED, GREEN, PURP, NAVY }

export function Scene({ caption, children, vb = '0 0 900 520', className = '' }) {
  return (
    <div className={`cn502-scene ${className}`} aria-label={caption || 'Computer Networks diagram'}>
      <svg viewBox={vb} role="img" className="cn502-svg">
        <defs>
          <marker id="cnArr" markerWidth="10" markerHeight="10" refX="8" refY="4" orient="auto">
            <path d="M0 0 L9 4 L0 8 Z" fill={N} />
          </marker>
          <marker id="cnArrB" markerWidth="10" markerHeight="10" refX="8" refY="4" orient="auto">
            <path d="M0 0 L9 4 L0 8 Z" fill={BLUE} />
          </marker>
          <marker id="cnArrG" markerWidth="10" markerHeight="10" refX="8" refY="4" orient="auto">
            <path d="M0 0 L9 4 L0 8 Z" fill={GREEN} />
          </marker>
          <marker id="cnArrR" markerWidth="10" markerHeight="10" refX="8" refY="4" orient="auto">
            <path d="M0 0 L9 4 L0 8 Z" fill={RED} />
          </marker>
          <marker id="cnArrA" markerWidth="10" markerHeight="10" refX="8" refY="4" orient="auto">
            <path d="M0 0 L9 4 L0 8 Z" fill={AMBER} />
          </marker>
        </defs>
        <rect width="100%" height="100%" fill={CREAM} rx="8" />
        {children}
        {caption ? (
          <text x="450" y="502" textAnchor="middle" fontSize="15" fontWeight="700" fill={MUTED} fontFamily="system-ui,sans-serif">
            {caption}
          </text>
        ) : null}
      </svg>
    </div>
  )
}

export function L({ x, y, children, size = 18, fill = N, anchor = 'middle', weight = 800 }) {
  return (
    <text x={x} y={y} textAnchor={anchor} fontSize={size} fontWeight={weight} fill={fill} fontFamily="system-ui,sans-serif">
      {children}
    </text>
  )
}

function Box({ x, y, w, h, label, sub, fill = '#fff', stroke = BLUE, className = '' }) {
  return (
    <g transform={`translate(${x},${y})`} className={className}>
      <rect width={w} height={h} rx="10" fill={fill} stroke={stroke} strokeWidth="2.5" />
      <L x={w / 2} y={h / 2 + (sub ? -2 : 6)} size={sub ? 14 : 16}>
        {label}
      </L>
      {sub ? (
        <L x={w / 2} y={h / 2 + 18} size={12} fill={MUTED} weight={700}>
          {sub}
        </L>
      ) : null}
    </g>
  )
}

export function ModuleHero({ module = 1, title, question, hours }) {
  return (
    <Scene caption={question || 'CN visual journey'}>
      <rect x="40" y="40" width="820" height="400" rx="16" fill="#fff" stroke={BLUE} strokeWidth="3" />
      <L x="450" y="110" size={18} fill={BLUE}>{`MODULE ${module} · BCS502`}</L>
      <L x="450" y="170" size={26}>
        {title || `Module ${module}`}
      </L>
      <L x="450" y="220" size={15} fill={MUTED} weight={700}>
        {question || 'Watch the concept execute'}
      </L>
      {['Problem', 'Model', 'Mechanism', 'Example', 'Exam'].map((t, i) => (
        <Box key={t} x={70 + i * 150} y={280} w={130} h={70} label={t} className="cn502v-pulse" />
      ))}
      {hours ? (
        <L x="450" y="420" size={14} fill={MUTED}>
          {`${hours} teaching hours`}
        </L>
      ) : null}
    </Scene>
  )
}

export function ModuleOutro({ module = 1, title }) {
  return (
    <Scene caption="Redraw the map — then attempt the PYQs">
      <L x="450" y="80" size={24}>{`Module ${module} closed`}</L>
      <L x="450" y="120" size={16} fill={MUTED}>
        {title}
      </L>
      <Box x="120" y="200" w="200" h="120" label="Definitions" sub="precise terms" />
      <Box x="350" y="200" w="200" h="120" label="Diagrams" sub="labelled flows" />
      <Box x="580" y="200" w="200" h="120" label="Practice" sub="10-mark answers" />
    </Scene>
  )
}

export function ConceptBoard({ title = 'Concept', points = [] }) {
  const pts = points.length ? points : ['Context', 'Mechanism', 'Example', 'Exam point']
  return (
    <Scene caption={title}>
      <Box x="250" y="40" w="400" h="80" label={title} className="cn502v-pulse" />
      {pts.map((p, i) => (
        <Box key={`${p}-${i}`} x={60 + (i % 4) * 210} y={180 + Math.floor(i / 4) * 120} w="190" h="90" label={p} />
      ))}
    </Scene>
  )
}

/* ── 1. OSI / TCP-IP encapsulation ──────────────────────────────── */
export function EncapsulationScene() {
  const layers = [
    { name: 'Application', hdr: 'AH', y: 50 },
    { name: 'Transport', hdr: 'TH', y: 120 },
    { name: 'Network', hdr: 'NH', y: 190 },
    { name: 'Data Link', hdr: 'DH', y: 260 },
    { name: 'Physical', hdr: 'bits', y: 330 },
  ]
  return (
    <Scene caption="Encapsulation ↓ adds headers · Decapsulation ↑ strips them">
      <L x="220" y="36" size={16} fill={BLUE}>
        Sender (down)
      </L>
      <L x="680" y="36" size={16} fill={GREEN}>
        Receiver (up)
      </L>
      {layers.map((ly, i) => (
        <g key={ly.name}>
          <Box x={60} y={ly.y} w={140} h={55} label={ly.name} stroke={NAVY} className={`cn502v-encap-layer cn502v-delay-${i}`} />
          <g className={`cn502v-encap-pdu cn502v-delay-${i}`}>
            <rect x={230} y={ly.y + 8} width={200 + i * 28} height={40} rx="8" fill={SKY} stroke={BLUE} strokeWidth="2" />
            {i > 0 ? (
              <L x={250} y={ly.y + 34} size={13} fill={AMBER} anchor="start">
                {ly.hdr}
              </L>
            ) : null}
            <L x={310 + i * 10} y={ly.y + 34} size={13} fill={N} anchor="start">
              Data
            </L>
          </g>
          <line
            x1={440 + i * 28}
            y1={ly.y + 28}
            x2={560}
            y2={ly.y + 28}
            stroke={MUTED}
            strokeWidth="2"
            strokeDasharray="6 4"
            className="cn502v-packet"
          />
          <Box x={580} y={ly.y} w={140} h={55} label={ly.name} stroke={GREEN} className={`cn502v-decap-layer cn502v-delay-${4 - i}`} />
          {i < layers.length - 1 ? (
            <path
              d={`M 130 ${ly.y + 55} L 130 ${ly.y + 70}`}
              stroke={BLUE}
              strokeWidth="3"
              markerEnd="url(#cnArrB)"
              className="cn502v-flow-arrow"
            />
          ) : null}
        </g>
      ))}
      <L x="450" y="420" size={14} fill={AMBER}>
        Each layer adds its header going down · strips it going up
      </L>
    </Scene>
  )
}

/* ── 2. Datagram vs virtual circuit ─────────────────────────────── */
export function PacketSwitchingScene() {
  return (
    <Scene caption="Datagram: independent routes · VC: fixed path after setup">
      <L x="220" y="40" size={18} fill={BLUE}>
        Datagram
      </L>
      <L x="680" y="40" size={18} fill={PURP}>
        Virtual circuit
      </L>
      {/* Datagram network */}
      <circle cx="100" cy="160" r="28" fill={SKY} stroke={BLUE} strokeWidth="2.5" />
      <L x="100" y="166" size={14}>
        A
      </L>
      <circle cx="340" cy="160" r="28" fill={SKY} stroke={BLUE} strokeWidth="2.5" />
      <L x="340" y="166" size={14}>
        B
      </L>
      <circle cx="180" cy="280" r="22" fill="#fff" stroke={MUTED} strokeWidth="2" />
      <L x="180" y="286" size={12} fill={MUTED}>
        R1
      </L>
      <circle cx="260" cy="280" r="22" fill="#fff" stroke={MUTED} strokeWidth="2" />
      <L x="260" y="286" size={12} fill={MUTED}>
        R2
      </L>
      <path d="M 125 170 Q 180 200, 220 260" fill="none" stroke={AMBER} strokeWidth="3" className="cn502v-pkt-path-a" />
      <path d="M 125 150 Q 220 100, 315 150" fill="none" stroke={GREEN} strokeWidth="3" className="cn502v-pkt-path-b" />
      <circle r="10" fill={AMBER} className="cn502v-pkt-dot-a">
        <animateMotion dur="3s" repeatCount="indefinite" path="M 125 170 Q 180 200, 220 260" />
      </circle>
      <circle r="10" fill={GREEN} className="cn502v-pkt-dot-b">
        <animateMotion dur="2.8s" repeatCount="indefinite" path="M 125 150 Q 220 100, 315 150" />
      </circle>
      <L x="220" y="360" size={13} fill={MUTED}>
        Packets may take different paths
      </L>

      {/* VC */}
      <circle cx="560" cy="160" r="28" fill="#ede9fe" stroke={PURP} strokeWidth="2.5" />
      <L x="560" y="166" size={14}>
        A
      </L>
      <circle cx="800" cy="160" r="28" fill="#ede9fe" stroke={PURP} strokeWidth="2.5" />
      <L x="800" y="166" size={14}>
        B
      </L>
      <circle cx="640" cy="280" r="22" fill="#fff" stroke={MUTED} strokeWidth="2" />
      <L x="640" y="286" size={12} fill={MUTED}>
        R1
      </L>
      <circle cx="720" cy="280" r="22" fill="#fff" stroke={MUTED} strokeWidth="2" />
      <L x="720" y="286" size={12} fill={MUTED}>
        R2
      </L>
      <path
        d="M 585 170 L 640 255 L 720 255 L 775 170"
        fill="none"
        stroke={PURP}
        strokeWidth="4"
        strokeDasharray="8 6"
        className="cn502v-vc-path"
      />
      <circle r="10" fill={PURP} className="cn502v-pkt-dot-vc">
        <animateMotion dur="3.2s" repeatCount="indefinite" path="M 585 170 L 640 255 L 720 255 L 775 170" />
      </circle>
      <L x="680" y="360" size={13} fill={MUTED}>
        Setup → fixed path → teardown
      </L>
      <L x="450" y="420" size={14} fill={AMBER}>
        Exam: draw both and label independent vs reserved path
      </L>
    </Scene>
  )
}

/* ── 3. Error / CRC flow ────────────────────────────────────────── */
export function CrcFlowScene() {
  const steps = [
    { label: 'Data', x: 50, fill: SKY },
    { label: 'Codeword', x: 210, fill: '#dbeafe' },
    { label: 'TX', x: 370, fill: '#fef3c7' },
    { label: 'Error?', x: 530, fill: '#fee2e2' },
    { label: 'Detect', x: 690, fill: '#dcfce7' },
  ]
  return (
    <Scene caption="CRC: Data → Codeword → Transmit → Channel error → Detect">
      {steps.map((s, i) => (
        <g key={s.label}>
          <Box
            x={s.x}
            y={160}
            w={140}
            h={100}
            label={s.label}
            fill={s.fill}
            stroke={i === 3 ? RED : i === 4 ? GREEN : BLUE}
            className={`cn502v-crc-step cn502v-delay-${i}`}
          />
          {i < steps.length - 1 ? (
            <line
              x1={s.x + 140}
              y1={210}
              x2={s.x + 160}
              y2={210}
              stroke={N}
              strokeWidth="3"
              markerEnd="url(#cnArr)"
              className="cn502v-flow-arrow"
            />
          ) : null}
        </g>
      ))}
      <g className="cn502v-crc-bit">
        <rect x="230" y="300" width="440" height="50" rx="8" fill="#fff" stroke={MUTED} strokeWidth="2" />
        <L x="280" y="332" size={14} fill={MUTED} anchor="start">
          Generator G(x)
        </L>
        <L x="480" y="332" size={16} fill={AMBER} anchor="start">
          Remainder = CRC bits
        </L>
      </g>
      <L x="450" y="400" size={14} fill={RED}>
        If remainder ≠ 0 at receiver → error detected
      </L>
    </Scene>
  )
}

/* ── 4. Framing on a link ───────────────────────────────────────── */
export function FramingScene() {
  return (
    <Scene caption="Framing: mark start/end so the receiver finds PDU boundaries">
      <L x="450" y="50" size={18}>
        Bit stream on the wire
      </L>
      <rect x="60" y="100" width="780" height="70" rx="10" fill="#fff" stroke={MUTED} strokeWidth="2" />
      {['1', '0', '1', '1', '0', '0', '1', '0', '1', '1', '0', '1', '0', '0', '1', '1'].map((b, i) => (
        <L key={i} x={90 + i * 46} y={145} size={18} fill={MUTED}>
          {b}
        </L>
      ))}
      <g className="cn502v-frame-slide">
        <rect x="180" y="220" width="540" height="120" rx="12" fill={SKY} stroke={BLUE} strokeWidth="3" />
        <rect x="200" y="240" width="80" height="80" rx="8" fill="#fef3c7" stroke={AMBER} strokeWidth="2" />
        <L x="240" y="288" size={13}>
          FLAG
        </L>
        <rect x="300" y="240" width="280" height="80" rx="8" fill="#fff" stroke={NAVY} strokeWidth="2" />
        <L x="440" y="288" size={16}>
          Frame data
        </L>
        <rect x="600" y="240" width="80" height="80" rx="8" fill="#fef3c7" stroke={AMBER} strokeWidth="2" />
        <L x="640" y="288" size={13}>
          FLAG
        </L>
      </g>
      <L x="450" y="400" size={14} fill={MUTED}>
        Character count · flag bytes · bit stuffing · length field
      </L>
    </Scene>
  )
}

/* ── 5. Flow control buffers ────────────────────────────────────── */
export function FlowControlScene() {
  return (
    <Scene caption="Flow control: sender must not overrun receiver buffer">
      <Box x="80" y="80" w="280" h="60" label="Sender" fill={SKY} stroke={BLUE} />
      <Box x="540" y="80" w="280" h="60" label="Receiver" fill="#dcfce7" stroke={GREEN} />
      <L x="220" y="180" size={14} fill={MUTED}>
        Send buffer
      </L>
      <L x="680" y="180" size={14} fill={MUTED}>
        Recv buffer
      </L>
      {[0, 1, 2, 3].map((i) => (
        <rect
          key={`s${i}`}
          x={100}
          y={200 + i * 45}
          width={240}
          height={36}
          rx="6"
          fill={i < 3 ? '#bae6fd' : '#e2e8f0'}
          stroke={BLUE}
          strokeWidth="2"
          className={i < 3 ? `cn502v-buf-fill cn502v-delay-${i}` : ''}
        />
      ))}
      {[0, 1, 2, 3].map((i) => (
        <rect
          key={`r${i}`}
          x={560}
          y={200 + i * 45}
          width={240}
          height={36}
          rx="6"
          fill={i < 2 ? '#bbf7d0' : '#e2e8f0'}
          stroke={GREEN}
          strokeWidth="2"
          className={i < 2 ? `cn502v-buf-drain cn502v-delay-${i}` : ''}
        />
      ))}
      <path
        d="M 380 120 C 450 120, 450 280, 520 280"
        fill="none"
        stroke={AMBER}
        strokeWidth="3"
        markerEnd="url(#cnArrA)"
        className="cn502v-flow-arrow"
      />
      <L x="450" y="160" size={13} fill={AMBER}>
        DATA
      </L>
      <path
        d="M 520 160 C 450 160, 450 360, 380 360"
        fill="none"
        stroke={GREEN}
        strokeWidth="3"
        strokeDasharray="8 6"
        markerEnd="url(#cnArrG)"
        className="cn502v-feedback"
      />
      <L x="450" y="400" size={13} fill={GREEN}>
        ACK / WINDOW
      </L>
      <L x="450" y="450" size={14} fill={MUTED}>
        Stop-and-wait · Sliding window · Credit-based
      </L>
    </Scene>
  )
}

/* ── 6. MAC stations contending ─────────────────────────────────── */
export function MacContendScene() {
  const stations = ['A', 'B', 'C', 'D']
  return (
    <Scene caption="MAC: stations contend for the shared medium">
      <rect x="100" y="240" width="700" height="24" rx="8" fill={NAVY} className="cn502v-medium" />
      <L x="450" y="230" size={13} fill={MUTED}>
        Shared channel
      </L>
      {stations.map((s, i) => {
        const x = 160 + i * 180
        return (
          <g key={s} className={`cn502v-contend cn502v-delay-${i}`}>
            <rect x={x} y={80} width={100} height={70} rx="12" fill="#fff" stroke={i === 1 ? AMBER : BLUE} strokeWidth="2.5" />
            <L x={x + 50} y={122} size={20}>
              {s}
            </L>
            <line x1={x + 50} y1={150} x2={x + 50} y2={240} stroke={MUTED} strokeWidth="2" />
            {i === 1 ? (
              <g className="cn502v-tx-burst">
                <rect x={x + 10} y={250} width={80} height={20} rx="4" fill={AMBER} />
                <L x={x + 50} y={266} size={11} fill="#fff">
                  TX
                </L>
              </g>
            ) : null}
            {i === 2 ? (
              <L x={x + 50} y={290} size={12} fill={RED}>
                collide?
              </L>
            ) : null}
          </g>
        )
      })}
      <L x="450" y="360" size={15} fill={AMBER}>
        ALOHA · CSMA/CD · CSMA/CA · Token
      </L>
      <L x="450" y="400" size={14} fill={MUTED}>
        Random access: listen / transmit / detect collision / backoff
      </L>
    </Scene>
  )
}

/* ── 7. IPv4 datagram field highlight ───────────────────────────── */
export function Ipv4DatagramScene() {
  const fields = [
    { label: 'Ver', w: 60 },
    { label: 'IHL', w: 60 },
    { label: 'TOS', w: 80 },
    { label: 'Total length', w: 140 },
    { label: 'ID', w: 100 },
    { label: 'Flags', w: 70 },
    { label: 'Frag offset', w: 130 },
  ]
  let x = 80
  const row1 = fields.map((f) => {
    const item = { ...f, x }
    x += f.w
    return item
  })
  return (
    <Scene caption="IPv4 datagram — exam labels: Ver, IHL, TTL, Protocol, Checksum, Addresses">
      <L x="450" y="40" size={18}>
        IPv4 header (simplified)
      </L>
      {row1.map((f, i) => (
        <g key={f.label} className={`cn502v-field-hl cn502v-delay-${i % 5}`}>
          <rect x={f.x} y={70} width={f.w} height={50} fill={i === 3 ? '#fef3c7' : SKY} stroke={BLUE} strokeWidth="2" />
          <L x={f.x + f.w / 2} y={102} size={12}>
            {f.label}
          </L>
        </g>
      ))}
      {[
        { label: 'TTL', x: 80, w: 100, hl: true },
        { label: 'Protocol', x: 180, w: 140, hl: true },
        { label: 'Header checksum', x: 320, w: 200, hl: false },
      ].map((f, i) => (
        <g key={f.label} className={`cn502v-field-hl cn502v-delay-${i}`}>
          <rect x={f.x} y={130} width={f.w} height={50} fill={f.hl ? '#fde68a' : SKY} stroke={f.hl ? AMBER : BLUE} strokeWidth="2.5" />
          <L x={f.x + f.w / 2} y={162} size={13}>
            {f.label}
          </L>
        </g>
      ))}
      <g className="cn502v-field-hl cn502v-delay-2">
        <rect x="80" y="190" width="440" height={50} fill="#dcfce7" stroke={GREEN} strokeWidth="2.5" />
        <L x="300" y="222" size={15}>
          Source IP address
        </L>
      </g>
      <g className="cn502v-field-hl cn502v-delay-3">
        <rect x="80" y="250" width="440" height={50} fill="#ede9fe" stroke={PURP} strokeWidth="2.5" />
        <L x="300" y="282" size={15}>
          Destination IP address
        </L>
      </g>
      <rect x="80" y="310" width="440" height={60} fill="#fff" stroke={MUTED} strokeWidth="2" />
      <L x="300" y="348" size={15} fill={MUTED}>
        Options + Payload
      </L>
      <Box x="560" y="130" w="280" h="200" label="TTL countdown" sub="each hop −1 → 0 drop" fill="#fff7ed" stroke={AMBER} className="cn502v-pulse" />
      <L x="450" y="420" size={14} fill={MUTED}>
        Protocol field → TCP(6) / UDP(17) / ICMP(1)
      </L>
    </Scene>
  )
}

/* ── 8. Distance vector table iteration ─────────────────────────── */
export function DistanceVectorScene() {
  return (
    <Scene caption="Distance vector: exchange tables with neighbours, relax costs">
      <circle cx="160" cy="200" r="40" fill={SKY} stroke={BLUE} strokeWidth="3" className="cn502v-pulse" />
      <L x="160" y="208" size={20}>
        A
      </L>
      <circle cx="450" cy="120" r="40" fill="#fff" stroke={MUTED} strokeWidth="2.5" />
      <L x="450" y="128" size={20}>
        B
      </L>
      <circle cx="450" cy="320" r="40" fill="#fff" stroke={MUTED} strokeWidth="2.5" />
      <L x="450" y="328" size={20}>
        C
      </L>
      <circle cx="740" cy="200" r="40" fill="#dcfce7" stroke={GREEN} strokeWidth="3" />
      <L x="740" y="208" size={20}>
        D
      </L>
      <line x1="200" y1="180" x2="410" y2="130" stroke={N} strokeWidth="2" className="cn502v-flow-arrow" />
      <line x1="200" y1="220" x2="410" y2="300" stroke={N} strokeWidth="2" className="cn502v-flow-arrow" />
      <line x1="490" y1="140" x2="700" y2="180" stroke={N} strokeWidth="2" />
      <line x1="490" y1="300" x2="700" y2="220" stroke={N} strokeWidth="2" />
      <g className="cn502v-dv-table">
        <rect x="100" y="360" width="280" height="100" rx="10" fill="#fff" stroke={BLUE} strokeWidth="2" />
        <L x="240" y="388" size={13} fill={BLUE}>
          A&apos;s DV table
        </L>
        <L x="160" y="420" size={12} fill={MUTED} anchor="start">
          Dest B: 2 via B
        </L>
        <L x="160" y="442" size={12} fill={AMBER} anchor="start">
          Dest D: 5 → 4 (update!)
        </L>
      </g>
      <g className="cn502v-dv-update">
        <rect x="520" y="360" width="280" height="100" rx="10" fill="#fef3c7" stroke={AMBER} strokeWidth="2" />
        <L x="660" y="410" size={14}>
          Bellman-Ford iterate
        </L>
        <L x="660" y="438" size={12} fill={MUTED}>
          d(x,y) = min_v [c(x,v)+d(v,y)]
        </L>
      </g>
    </Scene>
  )
}

/* ── 9. Link state flood intuition ──────────────────────────────── */
export function LinkStateScene() {
  return (
    <Scene caption="Link state: flood LSPs → each node builds full topology → SPF">
      {[
        { x: 200, y: 140, id: 'A' },
        { x: 450, y: 80, id: 'B' },
        { x: 700, y: 140, id: 'C' },
        { x: 300, y: 300, id: 'D' },
        { x: 600, y: 300, id: 'E' },
      ].map((n, i) => (
        <g key={n.id}>
          <circle cx={n.x} cy={n.y} r="32" fill={i === 0 ? '#fef3c7' : '#fff'} stroke={i === 0 ? AMBER : BLUE} strokeWidth="2.5" className={i === 0 ? 'cn502v-pulse' : ''} />
          <L x={n.x} y={n.y + 6} size={16}>
            {n.id}
          </L>
        </g>
      ))}
      <line x1="232" y1="140" x2="418" y2="90" stroke={MUTED} strokeWidth="2" />
      <line x1="482" y1="90" x2="668" y2="140" stroke={MUTED} strokeWidth="2" />
      <line x1="220" y1="170" x2="290" y2="272" stroke={MUTED} strokeWidth="2" />
      <line x1="480" y1="110" x2="580" y2="272" stroke={MUTED} strokeWidth="2" />
      <line x1="332" y1="300" x2="568" y2="300" stroke={MUTED} strokeWidth="2" />
      <line x1="232" y1="155" x2="668" y2="155" stroke={AMBER} strokeWidth="2.5" strokeDasharray="6 5" className="cn502v-flood" />
      <circle r="9" fill={AMBER} className="cn502v-lsp-dot">
        <animateMotion dur="3.5s" repeatCount="indefinite" path="M 232 140 L 450 80 L 700 140 L 600 300 L 300 300 Z" />
      </circle>
      <Box x="280" y="380" w="340" h="70" label="Dijkstra SPF on local map" sub="shortest-path tree" fill="#ecfdf5" stroke={GREEN} className="cn502v-fade-in" />
    </Scene>
  )
}

/* ── 10. RIP vs OSPF vs BGP ─────────────────────────────────────── */
export function RoutingProtocolsScene({ focus = 'all' }) {
  const cards = [
    { title: 'RIP', sub: 'DV · hop count · AS interior', x: 50, stroke: BLUE, note: 'Split horizon' },
    { title: 'OSPF', sub: 'LS · cost metric · areas', x: 320, stroke: GREEN, note: 'Dijkstra SPF' },
    { title: 'BGP', sub: 'Path vector · AS paths', x: 590, stroke: PURP, note: 'Policy routing' },
  ]
  return (
    <Scene caption="RIP (IGP/DV) · OSPF (IGP/LS) · BGP (EGP/path-vector)">
      {cards.map((c, i) => (
        <g key={c.title} className={`cn502v-proto-card cn502v-delay-${i}`} opacity={focus === 'all' || focus === c.title.toLowerCase() ? 1 : 0.35}>
          <Box x={c.x} y={80} w={260} h={160} label={c.title} sub={c.sub} stroke={c.stroke} fill="#fff" />
          <L x={c.x + 130} y={280} size={14} fill={c.stroke}>
            {c.note}
          </L>
        </g>
      ))}
      <Box x="80" y="320" w="200" h="70" label="Intra-AS" sub="RIP / OSPF" stroke={BLUE} />
      <Box x="350" y="320" w="200" h="70" label="Inter-AS" sub="BGP" stroke={PURP} />
      <Box x="620" y="320" w="200" h="70" label="Metric" sub="hop / cost / policy" stroke={AMBER} />
      <L x="450" y="430" size={14} fill={MUTED}>
        Draw three separate diagrams in the exam — do not mix models
      </L>
    </Scene>
  )
}

/* ── 11. TCP 3-way handshake ────────────────────────────────────── */
export function TcpHandshakeScene() {
  return (
    <Scene caption="TCP 3-way handshake: SYN → SYN-ACK → ACK">
      <Box x="80" y="60" w="200" h="60" label="Client" fill={SKY} stroke={BLUE} />
      <Box x="620" y="60" w="200" h="60" label="Server" fill="#dcfce7" stroke={GREEN} />
      <line x1="180" y1="140" x2="180" y2="420" stroke={MUTED} strokeWidth="2" strokeDasharray="4 4" />
      <line x1="720" y1="140" x2="720" y2="420" stroke={MUTED} strokeWidth="2" strokeDasharray="4 4" />

      <g className="cn502v-hs-1">
        <path d="M 200 180 L 700 180" fill="none" stroke={BLUE} strokeWidth="3.5" markerEnd="url(#cnArrB)" />
        <L x="450" y="168" size={15} fill={BLUE}>
          1. SYN seq=x
        </L>
      </g>
      <g className="cn502v-hs-2">
        <path d="M 700 260 L 200 260" fill="none" stroke={GREEN} strokeWidth="3.5" markerEnd="url(#cnArrG)" />
        <L x="450" y="248" size={15} fill={GREEN}>
          2. SYN-ACK seq=y ack=x+1
        </L>
      </g>
      <g className="cn502v-hs-3">
        <path d="M 200 340 L 700 340" fill="none" stroke={AMBER} strokeWidth="3.5" markerEnd="url(#cnArrA)" />
        <L x="450" y="328" size={15} fill={AMBER}>
          3. ACK ack=y+1
        </L>
      </g>
      <Box x="280" y="380" w="340" h="60" label="ESTABLISHED" sub="both sides can send data" fill="#ecfdf5" stroke={GREEN} className="cn502v-pulse" />
    </Scene>
  )
}

/* ── 12. Sliding / congestion window growth ─────────────────────── */
export function CongestionWindowScene() {
  return (
    <Scene caption="Congestion window: slow start → CA · sliding window in flight">
      <L x="200" y="50" size={16} fill={BLUE}>
        Sliding window
      </L>
      {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
        <rect
          key={i}
          x={60 + i * 55}
          y={80}
          width={48}
          height={48}
          rx="6"
          fill={i >= 2 && i <= 5 ? '#fef3c7' : '#e2e8f0'}
          stroke={i >= 2 && i <= 5 ? AMBER : MUTED}
          strokeWidth="2"
          className={i >= 2 && i <= 5 ? 'cn502v-window-slide' : ''}
        />
      ))}
      <L x="280" y="160" size={13} fill={AMBER}>
        bytes in flight (snd_una … snd_nxt)
      </L>

      <L x="650" y="50" size={16} fill={GREEN}>
        cwnd growth
      </L>
      <path d="M 520 380 L 520 100 L 860 100" fill="none" stroke={MUTED} strokeWidth="2" />
      <path
        d="M 540 360 L 580 300 L 620 220 L 660 160 L 700 140 L 780 120"
        fill="none"
        stroke={GREEN}
        strokeWidth="4"
        className="cn502v-cwnd-grow"
      />
      <L x="600" y="250" size={12} fill={GREEN} anchor="start">
        Slow start
      </L>
      <L x="720" y="150" size={12} fill={AMBER} anchor="start">
        Congestion avoidance
      </L>
      <L x="450" y="430" size={14} fill={MUTED}>
        Loss → ssthresh = cwnd/2 · restart slow start or CA
      </L>
    </Scene>
  )
}

/* ── 13. DNS resolution chain ───────────────────────────────────── */
export function DnsChainScene() {
  const nodes = [
    { label: 'Browser', x: 40 },
    { label: 'Resolver', x: 190 },
    { label: 'Root', x: 340 },
    { label: 'TLD', x: 490 },
    { label: 'Auth', x: 640 },
    { label: 'IP', x: 790 },
  ]
  return (
    <Scene caption="DNS: Browser → Resolver → Root → TLD → Authoritative → IP">
      {nodes.map((n, i) => (
        <g key={n.label}>
          <Box
            x={n.x}
            y={160}
            w={120}
            h={90}
            label={n.label}
            fill={i === 5 ? '#dcfce7' : '#fff'}
            stroke={i === 5 ? GREEN : BLUE}
            className={`cn502v-dns-hop cn502v-delay-${i}`}
          />
          {i < nodes.length - 1 ? (
            <line
              x1={n.x + 120}
              y1={205}
              x2={n.x + 150}
              y2={205}
              stroke={AMBER}
              strokeWidth="3"
              markerEnd="url(#cnArrA)"
              className="cn502v-flow-arrow"
            />
          ) : null}
        </g>
      ))}
      <path
        d="M 850 260 C 850 380, 100 380, 100 260"
        fill="none"
        stroke={GREEN}
        strokeWidth="3"
        strokeDasharray="8 6"
        markerEnd="url(#cnArrG)"
        className="cn502v-feedback"
      />
      <L x="450" y="360" size={14} fill={GREEN}>
        Answer caches on the way back
      </L>
      <L x="450" y="420" size={14} fill={MUTED}>
        Iterative at resolver · recursive from client&apos;s view
      </L>
    </Scene>
  )
}

/* ── 14. HTTP request / response ────────────────────────────────── */
export function HttpExchangeScene() {
  return (
    <Scene caption="HTTP: request line + headers → response status + body">
      <Box x="60" y="60" w="220" h="60" label="Client" fill={SKY} stroke={BLUE} />
      <Box x="620" y="60" w="220" h="60" label="Server" fill="#dcfce7" stroke={GREEN} />

      <g className="cn502v-http-req">
        <rect x="160" y="160" width="580" height="100" rx="12" fill="#eff6ff" stroke={BLUE} strokeWidth="2.5" />
        <L x="450" y="195" size={16} fill={BLUE}>
          GET /index.html HTTP/1.1
        </L>
        <L x="450" y="230" size={13} fill={MUTED}>
          Host: example.com · Accept: text/html
        </L>
      </g>
      <path d="M 280 140 L 620 140" fill="none" stroke={BLUE} strokeWidth="3" markerEnd="url(#cnArrB)" className="cn502v-flow-arrow" />

      <g className="cn502v-http-res">
        <rect x="160" y="300" width="580" height="100" rx="12" fill="#ecfdf5" stroke={GREEN} strokeWidth="2.5" />
        <L x="450" y="335" size={16} fill={GREEN}>
          HTTP/1.1 200 OK
        </L>
        <L x="450" y="370" size={13} fill={MUTED}>
          Content-Type: text/html · body…
        </L>
      </g>
      <path d="M 620 280 L 280 280" fill="none" stroke={GREEN} strokeWidth="3" markerEnd="url(#cnArrG)" className="cn502v-flow-arrow" />
      <L x="450" y="440" size={14} fill={MUTED}>
        Stateless request/response · cookies / sessions add state
      </L>
    </Scene>
  )
}

/* ── VISUAL_MAP keyed by curriculum visual slugs ─────────────────── */
const VISUAL_MAP = {
  // Module 1
  'start-with-why-the-module-matters': EncapsulationScene,
  'data-communications': EncapsulationScene,
  'data-communications-message-movement': EncapsulationScene,
  'networks-and-network-types': PacketSwitchingScene,
  'networks-and-network-types-message-movement': PacketSwitchingScene,
  'protocol-layering': EncapsulationScene,
  'protocol-layering-message-movement': EncapsulationScene,
  'tcp-ip-protocol-suite': EncapsulationScene,
  'tcp-ip-protocol-suite-message-movement': EncapsulationScene,
  'osi-model': EncapsulationScene,
  'osi-model-message-movement': EncapsulationScene,
  'transmission-media': FramingScene,
  'transmission-media-message-movement': FramingScene,
  'guided-media': FramingScene,
  'guided-media-message-movement': FramingScene,
  'unguided-wireless-media': MacContendScene,
  'unguided-wireless-media-message-movement': MacContendScene,
  'packet-switching-and-types': PacketSwitchingScene,
  'packet-switching-and-types-message-movement': PacketSwitchingScene,

  // Module 2
  'error-detection-and-correction': CrcFlowScene,
  'error-detection-and-correction-message-movement': CrcFlowScene,
  'block-coding': CrcFlowScene,
  'block-coding-message-movement': CrcFlowScene,
  'cyclic-codes': CrcFlowScene,
  'cyclic-codes-message-movement': CrcFlowScene,
  framing: FramingScene,
  'framing-message-movement': FramingScene,
  'flow-control': FlowControlScene,
  'flow-control-message-movement': FlowControlScene,
  'error-control': CrcFlowScene,
  'error-control-message-movement': CrcFlowScene,
  'connectionless-and-connection-oriented-services': PacketSwitchingScene,
  'connectionless-and-connection-oriented-services-': PacketSwitchingScene,
  hdlc: FramingScene,
  'hdlc-message-movement': FramingScene,
  'random-access': MacContendScene,
  'random-access-message-movement': MacContendScene,
  'controlled-access': MacContendScene,
  'controlled-access-message-movement': MacContendScene,
  checksum: CrcFlowScene,
  'checksum-message-movement': CrcFlowScene,
  'point-to-point-protocol': FramingScene,
  'point-to-point-protocol-message-movement': FramingScene,

  // Module 3
  'network-layer-services': Ipv4DatagramScene,
  'network-layer-services-message-movement': Ipv4DatagramScene,
  'packet-switching': PacketSwitchingScene,
  'packet-switching-message-movement': PacketSwitchingScene,
  'ipv4-address': Ipv4DatagramScene,
  'ipv4-address-message-movement': Ipv4DatagramScene,
  'ipv4-datagram': Ipv4DatagramScene,
  'ipv4-datagram-message-movement': Ipv4DatagramScene,
  'ipv6-datagram': Ipv4DatagramScene,
  'ipv6-datagram-message-movement': Ipv4DatagramScene,
  'routing-algorithms': DistanceVectorScene,
  'routing-algorithms-message-movement': DistanceVectorScene,
  'distance-vector-routing': DistanceVectorScene,
  'distance-vector-routing-message-movement': DistanceVectorScene,
  'link-state-routing': LinkStateScene,
  'link-state-routing-message-movement': LinkStateScene,
  'path-vector-routing': () => <RoutingProtocolsScene focus="bgp" />,
  'path-vector-routing-message-movement': () => <RoutingProtocolsScene focus="bgp" />,
  rip: () => <RoutingProtocolsScene focus="rip" />,
  'rip-message-movement': () => <RoutingProtocolsScene focus="rip" />,
  ospf: () => <RoutingProtocolsScene focus="ospf" />,
  'ospf-message-movement': () => <RoutingProtocolsScene focus="ospf" />,
  bgp: () => <RoutingProtocolsScene focus="bgp" />,
  'bgp-message-movement': () => <RoutingProtocolsScene focus="bgp" />,
  mospf: () => <RoutingProtocolsScene focus="ospf" />,
  'mospf-message-movement': () => <RoutingProtocolsScene focus="ospf" />,

  // Module 4
  'transport-layer-services': TcpHandshakeScene,
  'transport-layer-services-message-movement': TcpHandshakeScene,
  'transport-layer-protocols': TcpHandshakeScene,
  'transport-layer-protocols-message-movement': TcpHandshakeScene,
  udp: CongestionWindowScene,
  'udp-message-movement': CongestionWindowScene,
  'tcp-services': TcpHandshakeScene,
  'tcp-services-message-movement': TcpHandshakeScene,
  'tcp-features': CongestionWindowScene,
  'tcp-features-message-movement': CongestionWindowScene,
  'tcp-segments': CongestionWindowScene,
  'tcp-segments-message-movement': CongestionWindowScene,
  'tcp-connections': TcpHandshakeScene,
  'tcp-connections-message-movement': TcpHandshakeScene,
  'tcp-flow-control': FlowControlScene,
  'tcp-flow-control-message-movement': FlowControlScene,
  'tcp-error-control': CrcFlowScene,
  'tcp-error-control-message-movement': CrcFlowScene,
  'tcp-congestion-control': CongestionWindowScene,
  'tcp-congestion-control-message-movement': CongestionWindowScene,

  // Module 5
  'application-layer-introduction': HttpExchangeScene,
  'application-layer-introduction-message-movement': HttpExchangeScene,
  'client-server-programming': HttpExchangeScene,
  'client-server-programming-message-movement': HttpExchangeScene,
  'world-wide-web-and-http': HttpExchangeScene,
  'world-wide-web-and-http-message-movement': HttpExchangeScene,
  ftp: HttpExchangeScene,
  'ftp-message-movement': HttpExchangeScene,
  'electronic-mail': DnsChainScene,
  'electronic-mail-message-movement': DnsChainScene,
  'domain-name-system': DnsChainScene,
  'domain-name-system-message-movement': DnsChainScene,
  telnet: TcpHandshakeScene,
  'telnet-message-movement': TcpHandshakeScene,
  'secure-shell': TcpHandshakeScene,
  'secure-shell-message-movement': TcpHandshakeScene,
}

function resolveByKeywords(unit) {
  const blob = `${unit?.visual || ''} ${unit?.topic || ''}`.toLowerCase()
  if (/osi|tcp.?ip|layer|encapsul|protocol.?layer/.test(blob)) return EncapsulationScene
  if (/datagram|virtual.?circuit|packet.?switch/.test(blob)) return PacketSwitchingScene
  if (/crc|cyclic|checksum|error.?detect|error.?correct|block.?cod/.test(blob)) return CrcFlowScene
  if (/fram|hdlc|ppp|point.?to.?point/.test(blob)) return FramingScene
  if (/flow.?control/.test(blob)) return FlowControlScene
  if (/mac|random.?access|aloha|csma|controlled.?access|contend/.test(blob)) return MacContendScene
  if (/ipv4|ipv6|datagram.?field|network.?layer.?service/.test(blob)) return Ipv4DatagramScene
  if (/distance.?vector|bellman|routing.?algorithm/.test(blob)) return DistanceVectorScene
  if (/link.?state|dijkstra|flood|spf/.test(blob)) return LinkStateScene
  if (/\brip\b|\bospf\b|\bbgp\b|mospf|path.?vector/.test(blob)) return RoutingProtocolsScene
  if (/handshake|tcp.?connect|three.?way|3.?way|syn/.test(blob)) return TcpHandshakeScene
  if (/congestion|sliding.?window|cwnd|slow.?start/.test(blob)) return CongestionWindowScene
  if (/dns|domain.?name|resolver|tld/.test(blob)) return DnsChainScene
  if (/http|www|web|ftp|request.?response/.test(blob)) return HttpExchangeScene
  return null
}

export function beatVisual(unit, _beatIndex = 0) {
  const key = unit?.visual
  const Mapped = key ? VISUAL_MAP[key] : null
  if (Mapped) return <Mapped />
  const Fallback = resolveByKeywords(unit)
  if (Fallback) return <Fallback />
  return <ConceptBoard title={unit?.topic || 'Concept'} points={unit?.terms || []} />
}
