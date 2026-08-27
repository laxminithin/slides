/** Computer Networks-I visual teaching kit — large SVG/React diagrams (Forouzan-aligned). */

const C = {
  blue: '#2563eb',
  teal: '#0f766e',
  purple: '#7c3aed',
  indigo: '#4338ca',
  green: '#15803d',
  red: '#dc2626',
  amber: '#d97706',
  navy: '#0f172a',
  soft: '#e2e8f0',
  cream: '#fffbeb',
}

function Svg({ children, w = 720, h = 400, label }) {
  return (
    <div className="cnx-svg-wrap" role="img" aria-label={label || 'Network diagram'}>
      <svg viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="xMidYMid meet">
        <defs>
          <filter id="cnxSoftShadow" x="-20%" y="-25%" width="140%" height="150%">
            <feDropShadow dx="0" dy="10" stdDeviation="8" floodColor="#0f172a" floodOpacity="0.16" />
          </filter>
          <filter id="cnxGlowBlue" x="-40%" y="-40%" width="180%" height="180%">
            <feDropShadow dx="0" dy="0" stdDeviation="6" floodColor="#2563eb" floodOpacity="0.42" />
          </filter>
          <linearGradient id="cnxBlueGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#60a5fa" />
            <stop offset="100%" stopColor={C.blue} />
          </linearGradient>
          <linearGradient id="cnxTealGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2dd4bf" />
            <stop offset="100%" stopColor={C.teal} />
          </linearGradient>
          <linearGradient id="cnxPurpleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#a78bfa" />
            <stop offset="100%" stopColor={C.purple} />
          </linearGradient>
          <linearGradient id="cnxAmberGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fbbf24" />
            <stop offset="100%" stopColor={C.amber} />
          </linearGradient>
          <marker id="cnxArrowBlue" markerWidth="10" markerHeight="10" refX="8" refY="4" orient="auto">
            <path d="M0,0 L8,4 L0,8 Z" fill={C.blue} />
          </marker>
          <marker id="cnxArrowTeal" markerWidth="10" markerHeight="10" refX="8" refY="4" orient="auto">
            <path d="M0,0 L8,4 L0,8 Z" fill={C.teal} />
          </marker>
          <marker id="cnxArrowPurple" markerWidth="10" markerHeight="10" refX="8" refY="4" orient="auto">
            <path d="M0,0 L8,4 L0,8 Z" fill={C.purple} />
          </marker>
        </defs>
        {children}
      </svg>
    </div>
  )
}

function Device({ x, y, label, tone = 'blue' }) {
  const fill = tone === 'teal' ? 'url(#cnxTealGrad)' : tone === 'purple' ? 'url(#cnxPurpleGrad)' : 'url(#cnxBlueGrad)'
  return (
    <g filter="url(#cnxSoftShadow)">
      <rect x={x - 58} y={y - 30} width="116" height="62" rx="16" fill="#0f172a" opacity="0.12" transform="translate(5 7)" />
      <rect x={x - 58} y={y - 32} width="116" height="62" rx="16" fill={fill} />
      <rect x={x - 46} y={y - 20} width="92" height="8" rx="4" fill="#fff" opacity="0.22" />
      <text x={x} y={y + 7} textAnchor="middle" fill="#fff" fontSize="18" fontWeight="800">{label}</text>
    </g>
  )
}

function journeyIndex(stage) {
  const stages = ['MESSAGE', 'DATA', 'SIGNAL', 'MEDIUM', 'FRAME', 'LAN', 'ROUTER', 'IP', 'DEST']
  const query = String(stage || 'message').slice(0, 4).toUpperCase()
  const idx = stages.findIndex((s) => s.includes(query))
  return idx >= 0 ? idx : 0
}

export function NetworkJourney({ stage = 'message' }) {
  const stages = ['MESSAGE', 'DATA', 'SIGNAL', 'MEDIUM', 'FRAME', 'LAN', 'ROUTER', 'IP', 'DEST']
  const active = journeyIndex(stage)
  return (
    <Svg w={840} h={280} label="Network journey">
      <path d="M58 152 C190 62 310 225 430 130 S660 75 788 150" fill="none" stroke="#dbeafe" strokeWidth="22" strokeLinecap="round" opacity="0.82" />
      <path d="M58 152 C190 62 310 225 430 130 S660 75 788 150" fill="none" stroke={C.blue} strokeWidth="3.4" strokeLinecap="round" strokeDasharray="10 10" className="cnx-packet-path" markerEnd="url(#cnxArrowBlue)" />
      <text x="36" y="42" fill={C.navy} fontSize="22" fontWeight="850">Laptop A → Computer B</text>
      <text x="36" y="68" fill={C.teal} fontSize="16" fontWeight="700">Message becomes data, signals, frames, packets, then the destination copy</text>
      {stages.map((s, i) => {
        const x = 58 + i * 91
        const y = 152 + Math.sin(i * 0.9) * 26
        const on = i <= Math.max(active, 0)
        return (
          <g key={s}>
            {on && <circle cx={x} cy={y} r="46" className="cnx-ambient-ring" />}
            <circle cx={x} cy={y + 7} r="37" fill="#0f172a" opacity="0.1" />
            <circle cx={x} cy={y} r="38" fill={on ? 'url(#cnxBlueGrad)' : '#f8fafc'} stroke={on ? C.blue : '#cbd5e1'} strokeWidth="3" filter="url(#cnxSoftShadow)" className={i === active ? 'cnx-glow' : undefined} />
            <text x={x} y={y + 6} textAnchor="middle" fill={on ? '#fff' : C.navy} fontSize={s.length > 6 ? 15 : 17} fontWeight="850">{s}</text>
          </g>
        )
      })}
      <circle cx={58 + Math.max(active, 0) * 91} cy={152 + Math.sin(Math.max(active, 0) * 0.9) * 26} r="9" fill={C.amber} className="cnx-pulse" filter="url(#cnxGlowBlue)" />
      <rect x="170" y="222" width="500" height="34" rx="17" fill="#fff" stroke="#bfdbfe" strokeWidth="2" filter="url(#cnxSoftShadow)" />
      <text x="420" y="245" textAnchor="middle" fill={C.navy} fontSize="18" fontWeight="800">Ambient packet pulse marks the active teaching stage</text>
    </Svg>
  )
}

export function JourneyRibbon({ stage = 'message' }) {
  const stages = ['MESSAGE', 'DATA', 'SIGNAL', 'MEDIUM', 'FRAME', 'LAN', 'ROUTER', 'IP', 'DEST']
  const active = journeyIndex(stage)
  return (
    <Svg w={760} h={84} label="Journey ribbon">
      <line x1="48" y1="42" x2="712" y2="42" stroke="#dbeafe" strokeWidth="8" strokeLinecap="round" />
      <line x1="48" y1="42" x2={48 + (664 * Math.max(active, 0)) / (stages.length - 1)} y2="42" stroke={C.blue} strokeWidth="8" strokeLinecap="round" className="cnx-draw" />
      {stages.map((s, i) => {
        const x = 48 + (664 * i) / (stages.length - 1)
        const on = i <= active
        return (
          <g key={s}>
            <circle cx={x} cy="42" r={on ? 13 : 10} fill={on ? 'url(#cnxBlueGrad)' : '#fff'} stroke={on ? C.blue : '#cbd5e1'} strokeWidth="2.5" className={i === active ? 'cnx-pulse' : undefined} />
            <text x={x} y="72" textAnchor="middle" fill={on ? C.navy : '#64748b'} fontSize="10" fontWeight="800">{s}</text>
          </g>
        )
      })}
    </Svg>
  )
}

export function DataCommunicationScene() {
  return (
    <Svg w={780} h={340} label="Data communication components">
      <rect x="34" y="48" width="712" height="190" rx="28" fill="#ffffff" opacity="0.7" stroke="#dbeafe" strokeWidth="2" filter="url(#cnxSoftShadow)" />
      <path d="M136 144 H636" stroke="#dbeafe" strokeWidth="18" strokeLinecap="round" />
      <path d="M136 144 H636" stroke={C.blue} strokeWidth="3.4" strokeLinecap="round" strokeDasharray="12 10" className="cnx-packet-path" markerEnd="url(#cnxArrowBlue)" />
      <Device x={92} y={144} label="Sender" />
      <rect x="170" y="108" width="120" height="72" rx="18" fill="#dbeafe" stroke={C.blue} strokeWidth="3" filter="url(#cnxSoftShadow)" />
      <text x="230" y="151" textAnchor="middle" fill={C.navy} fontSize="18" fontWeight="850">Message</text>
      <rect x="326" y="74" width="140" height="140" rx="24" fill="url(#cnxTealGrad)" opacity="0.95" filter="url(#cnxSoftShadow)" />
      <circle cx="396" cy="144" r="54" className="cnx-ambient-ring" />
      <text x="396" y="139" textAnchor="middle" fill="#fff" fontSize="20" fontWeight="850">Medium</text>
      <text x="396" y="164" textAnchor="middle" fill="#ecfeff" fontSize="15" fontWeight="700">signals travel</text>
      <rect x="502" y="108" width="124" height="72" rx="18" fill="#ede9fe" stroke={C.purple} strokeWidth="3" filter="url(#cnxSoftShadow)" />
      <text x="564" y="151" textAnchor="middle" fill={C.navy} fontSize="18" fontWeight="850">Protocol</text>
      <Device x={690} y={144} label="Receiver" tone="teal" />
      <circle cx="198" cy="144" r="8" fill={C.amber} className="cnx-pulse" />
      <text x="390" y="286" textAnchor="middle" fill={C.navy} fontSize="18" fontWeight="750">Forouzan’s five building blocks: sender, message, medium, protocol, receiver</text>
    </Svg>
  )
}

export function ProtocolExchange() {
  return (
    <Svg w={640} h={320} label="Protocol exchange">
      <text x="90" y="40" textAnchor="middle" fill={C.navy} fontSize="18" fontWeight="750">Laptop A</text>
      <text x="550" y="40" textAnchor="middle" fill={C.navy} fontSize="18" fontWeight="750">Computer B</text>
      <line x1="90" y1="55" x2="90" y2="290" stroke={C.soft} strokeWidth="3" />
      <line x1="550" y1="55" x2="550" y2="290" stroke={C.soft} strokeWidth="3" />
      {[
        [82, 'Request (syntax)', C.blue],
        [144, 'Meaning agreed (semantics)', C.teal],
        [206, 'When to send / wait (timing)', C.purple],
        [268, 'Response', C.green],
      ].map(([y, label, color], i) => (
        <g key={label}>
          <line x1="100" y1={y} x2="540" y2={y} stroke={color} strokeWidth="3.4" />
          <circle cx={i % 2 === 0 ? 100 : 540} cy={y} r="7" fill={color} className="cnx-pulse" />
          <rect x="196" y={y - 21} width="248" height="42" rx="11" fill="#fff" stroke={color} strokeWidth="2" />
          <text x="320" y={y + 6} textAnchor="middle" fill={C.navy} fontSize="17" fontWeight="700">{label}</text>
        </g>
      ))}
    </Svg>
  )
}

export function OsiStack({ active = 3, highlightAll = false }) {
  const layers = [
    [7, 'Application', 'Network services to user processes', C.blue],
    [6, 'Presentation', 'Syntax / translation / encryption', '#0284c7'],
    [5, 'Session', 'Dialog control and sync', '#0891b2'],
    [4, 'Transport', 'Process-to-process delivery', C.indigo],
    [3, 'Network', 'Source-to-destination routing', C.purple],
    [2, 'Data Link', 'Hop framing and local delivery', '#a21caf'],
    [1, 'Physical', 'Bits on the medium', C.teal],
  ]
  return (
    <div className="cnx-osi-hero" aria-label="OSI seven-layer model">
      {layers.map(([n, name, desc, color]) => {
        const on = highlightAll || active === n
        return (
          <div key={n} className={`cnx-osi-row ${on ? 'active' : ''}`} style={{ '--osi': color }}>
            <span className="cnx-osi-num">{n}</span>
            <strong>{name}</strong>
            <em>{desc}</em>
            {on && <span className="cnx-osi-packet cnx-glow" aria-hidden="true" />}
          </div>
        )
      })}
    </div>
  )
}

export function EncapsulationFlow({ direction = 'down' }) {
  const steps = direction === 'down'
    ? ['Application Data', 'Transport PDU', 'Network Packet', 'Data-Link Frame', 'Physical Bits']
    : ['Physical Bits', 'Data-Link Frame', 'Network Packet', 'Transport PDU', 'Application Data']
  return (
    <Svg w={760} h={320} label="Encapsulation flow">
      <text x="380" y="28" textAnchor="middle" fill={C.navy} fontSize="16" fontWeight="800">
        {direction === 'down' ? 'Encapsulation adds headers as data moves down' : 'Decapsulation removes headers as data moves up'}
      </text>
      {steps.map((s, i) => {
        const y = 48 + i * 50
        const inset = i * 18
        const w = 500 - i * 18
        const x = 130 + inset
        const last = i === steps.length - 1
        return (
          <g key={s}>
            <rect x={x + 7} y={y + 7} width={w} height="38" rx="12" fill="#0f172a" opacity="0.08" />
            <rect x={x} y={y} width={w} height="40" rx="12" fill={last ? 'url(#cnxTealGrad)' : i % 2 ? '#eef2ff' : '#eff6ff'} stroke={last ? C.teal : C.blue} strokeWidth="2.5" filter="url(#cnxSoftShadow)" />
            <text x={x + w / 2} y={y + 26} textAnchor="middle" fill={last ? '#fff' : C.navy} fontSize="16" fontWeight="800">{s}</text>
            {i < steps.length - 1 && (
              <path d={`M380 ${y + 42} V${y + 52}`} stroke={C.teal} strokeWidth="2.8" markerEnd="url(#cnxArrowTeal)" />
            )}
          </g>
        )
      })}
    </Svg>
  )
}

export function TcpIpStack() {
  const layers = [
    ['Application', 'HTTP, FTP, SMTP, DNS…'],
    ['Transport', 'TCP · UDP'],
    ['Internet', 'IP · routing'],
    ['Network Access', 'Data link + physical'],
  ]
  return (
    <div className="cnx-tcpip" aria-label="TCP/IP protocol suite">
      {layers.map(([name, protocols]) => (
        <div key={name}>
          <strong>{name}</strong>
          <span>{protocols}</span>
        </div>
      ))}
    </div>
  )
}

export function AddressJourney() {
  return (
    <Svg w={720} h={280} label="Addressing journey">
      {[
        [90, 'Device', 'Laptop A', C.navy],
        [250, 'Physical', 'MAC on this link', C.teal],
        [410, 'Logical', 'IP end-to-end', C.blue],
        [570, 'Port', 'Process / service', C.purple],
      ].map(([x, title, sub, color], i) => (
        <g key={title}>
          {i < 3 && <line x1={x + 55} y1="130" x2={x + 105} y2="130" stroke={C.soft} strokeWidth="4" />}
          <circle cx={x} cy="130" r="52" fill={color} className={i === 0 ? 'cnx-pulse' : undefined} />
          <text x={x} y="136" textAnchor="middle" fill="#fff" fontSize="18" fontWeight="800">{title}</text>
          <text x={x} y="216" textAnchor="middle" fill={C.navy} fontSize="17" fontWeight="650">{sub}</text>
        </g>
      ))}
    </Svg>
  )
}

export function AnalogWave({ label = 'Analog signal' }) {
  const pts = Array.from({ length: 60 }, (_, i) => {
    const x = 52 + i * 11.6
    const y = 270 + Math.sin(i / 4.2) * 128 + Math.sin(i / 1.8) * 32
    return `${x},${y}`
  }).join(' ')
  return (
    <Svg w={760} h={470} label={label}>
      <line x1="52" y1="270" x2="720" y2="270" stroke="#cbd5e1" strokeWidth="3" />
      <line x1="52" y1="96" x2="52" y2="444" stroke="#cbd5e1" strokeWidth="3" />
      <polyline points={pts} fill="none" stroke="url(#cnxTealGrad)" strokeWidth="6.5" strokeLinecap="round" strokeLinejoin="round" className="cnx-draw" filter="url(#cnxGlowBlue)" />
      <text x="70" y="52" fill={C.navy} fontSize="30" fontWeight="850">{label}</text>
      <text x="70" y="84" fill={C.teal} fontSize="21" fontWeight="750">Continuous in time and amplitude</text>
      <text x="712" y="304" textAnchor="end" fill="#64748b" fontSize="19" fontWeight="700">time</text>
      <text x="30" y="270" textAnchor="middle" fill="#64748b" fontSize="19" fontWeight="700" transform="rotate(-90 30 270)">amplitude</text>
    </Svg>
  )
}

export function DigitalWave({ bits = '1011001', label = 'Digital signal' }) {
  const bitW = 92
  let x = 60
  const segs = []
  ;[...bits].forEach((b) => {
    const y = b === '1' ? 130 : 320
    segs.push(`M${x} ${y} H${x + bitW}`)
    x += bitW
  })
  return (
    <Svg w={760} h={460} label={label}>
      <line x1="52" y1="225" x2="720" y2="225" stroke="#cbd5e1" strokeWidth="3" strokeDasharray="9 9" />
      <line x1="52" y1="96" x2="52" y2="360" stroke="#cbd5e1" strokeWidth="3" />
      <path d={segs.join(' ')} fill="none" stroke="url(#cnxBlueGrad)" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" className="cnx-draw" filter="url(#cnxGlowBlue)" />
      {[...bits].map((b, i) => (
        <text key={i} x={60 + bitW / 2 + i * bitW} y="410" textAnchor="middle" fill={C.navy} fontSize="26" fontWeight="850">{b}</text>
      ))}
      <text x="70" y="56" fill={C.navy} fontSize="30" fontWeight="850">{label}</text>
      <text x="712" y="255" textAnchor="end" fill="#64748b" fontSize="19" fontWeight="700">time</text>
    </Svg>
  )
}

export function SignalImpairment({ kind = 'attenuation' }) {
  const title = kind === 'noise' ? 'Noise' : kind === 'distortion' ? 'Distortion' : 'Attenuation'
  const left = 'M56 250 Q126 104 196 250 T336 250'
  const right = kind === 'attenuation'
    ? 'M444 250 Q514 208 584 250 T724 250'
    : kind === 'distortion'
      ? 'M444 250 Q486 70 536 320 T632 118 T724 250'
      : 'M444 250 Q484 120 520 330 T590 110 T662 340 T724 250'
  return (
    <Svg w={780} h={440} label={title}>
      <text x="196" y="70" textAnchor="middle" fill={C.navy} fontSize="26" fontWeight="850">Original</text>
      <text x="584" y="70" textAnchor="middle" fill={C.red} fontSize="26" fontWeight="850">{title}</text>
      <line x1="56" y1="250" x2="336" y2="250" stroke="#e2e8f0" strokeWidth="2.5" />
      <line x1="444" y1="250" x2="724" y2="250" stroke="#e2e8f0" strokeWidth="2.5" />
      <path d={left} fill="none" stroke="url(#cnxTealGrad)" strokeWidth="6.5" strokeLinecap="round" className="cnx-draw" />
      <path d={right} fill="none" stroke={C.red} strokeWidth="6.5" strokeLinecap="round" className="cnx-draw" filter="url(#cnxSoftShadow)" />
      <path d="M356 250 H424" stroke={C.amber} strokeWidth="5" markerEnd="url(#cnxArrowBlue)" />
    </Svg>
  )
}

export function LineCodingViz({ scheme = 'manchester', bits = '1011001' }) {
  const bitW = 94
  const hi = 150
  const lo = 350
  const mid = 250
  let d = ''
  let x = 52
  let onesSeen = 0
  let prevY = null
  const levelFor = (b) => {
    if (scheme === 'polar') return b === '1' ? hi : lo
    // bipolar AMI: 0 stays mid, 1 alternates polarity
    if (b === '1') onesSeen += 1
    return b === '0' ? mid : onesSeen % 2 === 0 ? hi : lo
  }
  ;[...bits].forEach((b) => {
    if (scheme === 'manchester') {
      if (b === '1') d += `M${x} ${hi} H${x + bitW / 2} V${lo} H${x + bitW}`
      else d += `M${x} ${lo} H${x + bitW / 2} V${hi} H${x + bitW}`
    } else {
      // Continuous line with vertical transitions between levels (polar / bipolar).
      const y = levelFor(b)
      if (prevY === null) d += `M${x} ${y} H${x + bitW}`
      else d += `V${y} H${x + bitW}`
      prevY = y
    }
    x += bitW
  })
  return (
    <Svg w={780} h={470} label={`${scheme} line coding`}>
      <line x1="52" y1={mid} x2="724" y2={mid} stroke="#cbd5e1" strokeWidth="3" strokeDasharray="8 8" />
      <path d={d} fill="none" stroke="url(#cnxBlueGrad)" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" className="cnx-draw" filter="url(#cnxGlowBlue)" />
      {[...bits].map((b, i) => (
        <g key={i}>
          <text x={52 + bitW / 2 + i * bitW} y="428" textAnchor="middle" fill={C.navy} fontSize="26" fontWeight="850">{b}</text>
          <line x1={52 + i * bitW} y1="108" x2={52 + i * bitW} y2="392" stroke="#e2e8f0" strokeWidth="1.8" />
        </g>
      ))}
      <line x1={52 + bits.length * bitW} y1="108" x2={52 + bits.length * bitW} y2="392" stroke="#e2e8f0" strokeWidth="1.8" />
      <text x="52" y="58" fill={C.navy} fontSize="26" fontWeight="850">{scheme.toUpperCase()} · bits {bits}</text>
    </Svg>
  )
}

export function PcmPipeline() {
  const steps = ['Analog', 'Sampling', 'Quantization', 'Encoding', 'Bit stream']
  return (
    <Svg w={820} h={400} label="PCM pipeline">
      <path d="M88 200 H744" stroke="#dbeafe" strokeWidth="22" strokeLinecap="round" />
      <path d="M88 200 H744" stroke={C.teal} strokeWidth="3.6" strokeLinecap="round" strokeDasharray="12 10" className="cnx-packet-path" markerEnd="url(#cnxArrowTeal)" />
      {steps.map((s, i) => {
        const x = 32 + i * 156
        return (
          <g key={s}>
            <rect x={x + 8} y="128" width="140" height="146" rx="22" fill="#0f172a" opacity="0.1" />
            <rect x={x} y="120" width="140" height="146" rx="22" fill={i === 0 ? 'url(#cnxTealGrad)' : i === 4 ? 'url(#cnxBlueGrad)' : '#fff'} stroke={i === 4 ? C.blue : C.teal} strokeWidth="3" filter="url(#cnxSoftShadow)" />
            <text x={x + 70} y="200" textAnchor="middle" fill={i === 0 || i === 4 ? '#fff' : C.navy} fontSize={s.length > 10 ? 19 : 22} fontWeight="850">{s}</text>
            {i > 0 && i < 4 && <circle cx={x + 70} cy="150" r="6" fill={C.amber} className="cnx-pulse" />}
          </g>
        )
      })}
      <text x="410" y="336" textAnchor="middle" fill={C.navy} fontSize="21" fontWeight="750">Pulse Code Modulation turns a continuous wave into binary</text>
    </Svg>
  )
}

export function MultiplexerViz({ mode = 'FDM' }) {
  return (
    <Svg w={720} h={300} label={`${mode} multiplexing`}>
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect x="40" y={48 + i * 72} width="122" height="50" rx="13" fill="#dbeafe" stroke={C.blue} strokeWidth="2.5" filter="url(#cnxSoftShadow)" />
          <text x="101" y={80 + i * 72} textAnchor="middle" fill={C.navy} fontSize="18" fontWeight="850">Ch {i + 1}</text>
          <line x1="162" y1={73 + i * 72} x2="232" y2="150" stroke={C.blue} strokeWidth="3" strokeLinecap="round" />
        </g>
      ))}
      <rect x="230" y="112" width="104" height="76" rx="18" fill="url(#cnxTealGrad)" filter="url(#cnxSoftShadow)" />
      <text x="282" y="156" textAnchor="middle" fill="#fff" fontSize="19" fontWeight="850">MUX</text>
      <rect x="358" y="124" width="156" height="52" rx="14" fill="#ccfbf1" stroke={C.teal} strokeWidth="3" filter="url(#cnxSoftShadow)" />
      <text x="436" y="157" textAnchor="middle" fill={C.teal} fontSize="18" fontWeight="850">{mode} link</text>
      <path d="M334 150 H358" stroke={C.teal} strokeWidth="3.2" markerEnd="url(#cnxArrowTeal)" />
      <path d="M514 150 H538" stroke={C.purple} strokeWidth="3.2" markerEnd="url(#cnxArrowPurple)" />
      <rect x="538" y="112" width="110" height="76" rx="18" fill="url(#cnxPurpleGrad)" filter="url(#cnxSoftShadow)" />
      <text x="593" y="156" textAnchor="middle" fill="#fff" fontSize="18" fontWeight="850">DEMUX</text>
      {[0, 1, 2].map((i) => (
        <g key={`o${i}`}>
          <line x1="648" y1="150" x2="688" y2={73 + i * 72} stroke={C.purple} strokeWidth="3" strokeLinecap="round" />
          <rect x="688" y={48 + i * 72} width="26" height="50" rx="8" fill="#ede9fe" stroke={C.purple} strokeWidth="2" />
        </g>
      ))}
    </Svg>
  )
}

export function SpreadSpectrumViz({ mode = 'FHSS' }) {
  return (
    <Svg w={720} h={300} label={mode}>
      <text x="40" y="44" fill={C.navy} fontSize="22" fontWeight="800">{mode}</text>
      {mode === 'FHSS'
        ? [0, 1, 2, 3, 4].map((i) => (
            <g key={i}>
              <rect x={70 + i * 122} y={78 + (i % 3) * 58} width="104" height="48" rx="10" fill={C.blue} opacity={0.75 + i * 0.05} className="cnx-hop" filter="url(#cnxSoftShadow)" />
              <text x={122 + i * 122} y={107 + (i % 3) * 58} textAnchor="middle" fill="#fff" fontSize="17" fontWeight="800">f{i + 1}</text>
            </g>
          ))
        : (
          <>
            <rect x="80" y="118" width="560" height="70" rx="14" fill="#dbeafe" stroke={C.blue} strokeWidth="2.5" />
            <text x="360" y="160" textAnchor="middle" fill={C.navy} fontSize="19" fontWeight="750">Wideband coded chip sequence (DSSS)</text>
          </>
        )}
      <text x="40" y="272" fill={C.navy} fontSize="18" fontWeight="700">Spreading trades bandwidth for robustness against interference</text>
    </Svg>
  )
}

export function CircuitSwitchScene({ phase = 'transfer' }) {
  const reserved = phase !== 'idle'
  return (
    <Svg w={720} h={280} label="Circuit switching">
      <Device x={80} y={140} label="A" />
      <Device x={640} y={140} label="B" tone="teal" />
      {[[200, 80], [360, 80], [520, 80], [200, 200], [360, 200], [520, 200]].map(([x, y], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r="26" fill={reserved && [0, 1, 2].includes(i) ? 'url(#cnxAmberGrad)' : '#f8fafc'} stroke={reserved && [0, 1, 2].includes(i) ? C.amber : '#cbd5e1'} strokeWidth="3" filter="url(#cnxSoftShadow)" />
          {reserved && [0, 1, 2].includes(i) && <circle cx={x} cy={y} r="38" className="cnx-ambient-ring" />}
        </g>
      ))}
      <path d="M138 140 C158 108 176 88 200 80 H360 H520 C548 85 570 108 586 140" fill="none" stroke={reserved ? C.amber : '#cbd5e1'} strokeWidth="6" strokeLinecap="round" className={reserved ? 'cnx-draw' : undefined} />
      <text x="360" y="252" textAnchor="middle" fill={C.navy} fontSize="18" fontWeight="750">
        {phase === 'setup' ? 'Setup: reserve a dedicated path' : phase === 'teardown' ? 'Teardown: release resources' : 'Data transfer on reserved circuit'}
      </text>
    </Svg>
  )
}

export function DatagramRouting() {
  return (
    <Svg w={720} h={300} label="Datagram routing">
      <Device x={80} y={150} label="A" />
      <Device x={640} y={150} label="F" tone="teal" />
      {[[240, 80, 'C'], [240, 220, 'D'], [420, 80, ''], [420, 220, 'E']].map(([x, y, label], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r="30" fill="#fff" stroke={i % 2 ? C.purple : C.blue} strokeWidth="3.2" filter="url(#cnxSoftShadow)" />
          {label && <text x={x} y={y + 7} textAnchor="middle" fill={C.navy} fontSize="18" fontWeight="850">{label}</text>}
        </g>
      ))}
      <path d="M134 140 C180 90 200 80 210 80 H390 C510 88 560 120 586 140" fill="none" stroke={C.blue} strokeWidth="3.4" strokeLinecap="round" className="cnx-packet-path" markerEnd="url(#cnxArrowBlue)" />
      <path d="M134 160 C180 210 200 220 210 220 H390 C510 212 560 180 586 160" fill="none" stroke={C.purple} strokeWidth="3.4" strokeLinecap="round" strokeDasharray="8 6" className="cnx-packet-path" markerEnd="url(#cnxArrowPurple)" />
      <circle cx="332" cy="80" r="8" fill={C.amber} className="cnx-pulse" />
      <circle cx="332" cy="220" r="8" fill={C.amber} className="cnx-pulse" />
      <text x="360" y="38" textAnchor="middle" fill={C.blue} fontSize="18" fontWeight="850">Packet 1: A → C → F</text>
      <text x="360" y="282" textAnchor="middle" fill={C.purple} fontSize="18" fontWeight="850">Packet 2: A → D → E → F</text>
    </Svg>
  )
}

export function VirtualCircuitScene() {
  return (
    <Svg w={720} h={260} label="Virtual circuit">
      <Device x={80} y={130} label="A" />
      <Device x={640} y={130} label="B" tone="teal" />
      <path d="M134 130 C250 58 470 58 586 130" fill="none" stroke="#e0e7ff" strokeWidth="18" strokeLinecap="round" />
      <path d="M134 130 C250 58 470 58 586 130" fill="none" stroke="url(#cnxPurpleGrad)" strokeWidth="6" strokeLinecap="round" className="cnx-draw" markerEnd="url(#cnxArrowPurple)" />
      <circle cx="260" cy="78" r="16" fill={C.indigo} className="cnx-pulse" filter="url(#cnxGlowBlue)" />
      <circle cx="460" cy="78" r="16" fill={C.indigo} filter="url(#cnxSoftShadow)" />
      <text x="360" y="214" textAnchor="middle" fill={C.navy} fontSize="18" fontWeight="750">Setup creates a VC; packets follow the same logical path</text>
    </Svg>
  )
}

export function ErrorChannel({ flipped = 4 }) {
  const sent = '10110101'
  const recv = sent.split('').map((b, i) => (i === flipped ? (b === '1' ? '0' : '1') : b)).join('')
  return (
    <Svg w={720} h={260} label="Noisy channel bit flip">
      <text x="40" y="54" fill={C.navy} fontSize="20" fontWeight="850">Sent</text>
      {[...sent].map((b, i) => (
        <rect key={`s${i}`} x={116 + i * 58} y="28" width="48" height="44" rx="10" fill="#dbeafe" stroke={C.blue} strokeWidth="2.4" filter="url(#cnxSoftShadow)" />
      )).concat([...sent].map((b, i) => (
        <text key={`st${i}`} x={140 + i * 58} y="57" textAnchor="middle" fill={C.navy} fontSize="20" fontWeight="850">{b}</text>
      )))}
      <rect x="202" y="98" width="316" height="40" rx="20" fill="#fee2e2" stroke={C.red} strokeWidth="2" />
      <text x="360" y="124" textAnchor="middle" fill={C.red} fontSize="18" fontWeight="850">Noisy channel → bit {flipped} flipped</text>
      <text x="40" y="198" fill={C.navy} fontSize="20" fontWeight="850">Received</text>
      {[...recv].map((b, i) => (
        <g key={`r${i}`}>
          <rect x={116 + i * 58} y="172" width="48" height="44" rx="10" fill={i === flipped ? '#fee2e2' : '#dcfce7'} stroke={i === flipped ? C.red : C.green} strokeWidth="2.4" filter="url(#cnxSoftShadow)" className={i === flipped ? 'cnx-pulse' : undefined} />
          <text x={140 + i * 58} y="201" textAnchor="middle" fill={C.navy} fontSize="20" fontWeight="850">{b}</text>
        </g>
      ))}
    </Svg>
  )
}

export function BlockCodeViz() {
  return (
    <Svg w={720} h={260} label="Block coding">
      <rect x="56" y="82" width="150" height="84" rx="18" fill="#dbeafe" stroke={C.blue} strokeWidth="3" filter="url(#cnxSoftShadow)" />
      <text x="131" y="131" textAnchor="middle" fill={C.navy} fontSize="20" fontWeight="850">k data bits</text>
      <path d="M218 124 H262" stroke={C.blue} strokeWidth="3.2" markerEnd="url(#cnxArrowBlue)" />
      <rect x="272" y="82" width="140" height="84" rx="18" fill="url(#cnxPurpleGrad)" filter="url(#cnxSoftShadow)" />
      <text x="342" y="131" textAnchor="middle" fill="#fff" fontSize="20" fontWeight="850">Encoder</text>
      <path d="M424 124 H468" stroke={C.blue} strokeWidth="3.2" markerEnd="url(#cnxArrowBlue)" />
      <rect x="478" y="82" width="186" height="84" rx="18" fill="#ede9fe" stroke={C.purple} strokeWidth="3" filter="url(#cnxSoftShadow)" />
      <text x="571" y="131" textAnchor="middle" fill={C.navy} fontSize="20" fontWeight="850">n-bit codeword</text>
      <text x="360" y="220" textAnchor="middle" fill={C.navy} fontSize="18" fontWeight="750">2^k datawords map into a subset of 2^n possible n-bit words</text>
    </Svg>
  )
}

export function CrcDivision({ stage = 'sender' }) {
  const steps = stage === 'sender'
    ? ['Dataword', 'Append zeros', '÷ Generator', 'Remainder', 'Codeword']
    : ['Codeword', '÷ Generator', 'Syndrome', 'Zero → OK', 'Nonzero → Error']
  return (
    <Svg w={800} h={240} label="CRC division">
      {steps.map((s, i) => {
        const x = 28 + i * 152
        return (
          <g key={s}>
            <rect x={x + 6} y="78" width="136" height="72" rx="16" fill="#0f172a" opacity="0.09" />
            <rect x={x} y="70" width="136" height="72" rx="16" fill={i === steps.length - 1 ? '#dcfce7' : '#eff6ff'} stroke={C.indigo} strokeWidth="3" filter="url(#cnxSoftShadow)" />
            <text x={x + 68} y="113" textAnchor="middle" fill={C.navy} fontSize="16" fontWeight="850">{s}</text>
            {i < steps.length - 1 && <path d={`M${x + 138} 106 H${x + 150}`} stroke={C.indigo} strokeWidth="3" markerEnd="url(#cnxArrowPurple)" />}
          </g>
        )
      })}
    </Svg>
  )
}

export function ChecksumViz() {
  return (
    <Svg w={720} h={280} label="Checksum">
      {['Word 1', 'Word 2', 'Word 3'].map((w, i) => (
        <rect key={w} x={58} y={36 + i * 54} width="152" height="42" rx="10" fill="#dbeafe" stroke={C.blue} strokeWidth="2.4" filter="url(#cnxSoftShadow)" />
      )).concat(['Word 1', 'Word 2', 'Word 3'].map((w, i) => (
        <text key={`${w}t`} x={134} y={64 + i * 54} textAnchor="middle" fill={C.navy} fontSize="18" fontWeight="850">{w}</text>
      )))}
      <path d="M222 118 H258" stroke={C.blue} strokeWidth="3.2" markerEnd="url(#cnxArrowBlue)" />
      <rect x="270" y="78" width="172" height="80" rx="16" fill="#fff7ed" stroke={C.amber} strokeWidth="3" filter="url(#cnxSoftShadow)" />
      <text x="356" y="111" textAnchor="middle" fill={C.navy} fontSize="16" fontWeight="850">1&apos;s complement</text>
      <text x="356" y="135" textAnchor="middle" fill={C.navy} fontSize="16" fontWeight="850">sum + wrap</text>
      <path d="M454 118 H490" stroke={C.blue} strokeWidth="3.2" markerEnd="url(#cnxArrowBlue)" />
      <rect x="502" y="88" width="164" height="60" rx="16" fill={C.green} filter="url(#cnxSoftShadow)" />
      <text x="584" y="124" textAnchor="middle" fill="#fff" fontSize="19" fontWeight="850">Checksum</text>
      <text x="360" y="224" textAnchor="middle" fill={C.navy} fontSize="18" fontWeight="750">Receiver adds words + checksum; all-1s means accept</text>
    </Svg>
  )
}

export function FramingViz({ mode = 'byte-stuffing' }) {
  return (
    <Svg w={720} h={240} label={mode}>
      <rect x="40" y="76" width="82" height="58" rx="13" fill="url(#cnxTealGrad)" filter="url(#cnxSoftShadow)" />
      <text x="81" y="112" textAnchor="middle" fill="#fff" fontSize="16" fontWeight="850">FLAG</text>
      <rect x="138" y="76" width="314" height="58" rx="13" fill="#dbeafe" stroke={C.blue} strokeWidth="3" filter="url(#cnxSoftShadow)" />
      <text x="295" y="112" textAnchor="middle" fill={C.navy} fontSize="18" fontWeight="850">
        {mode === 'bit-stuffing' ? 'payload with stuffed 0 after 11111' : 'A  ESC FLAG  B'}
      </text>
      <rect x="468" y="76" width="82" height="58" rx="13" fill="url(#cnxTealGrad)" filter="url(#cnxSoftShadow)" />
      <text x="509" y="112" textAnchor="middle" fill="#fff" fontSize="16" fontWeight="850">FLAG</text>
      <text x="360" y="184" textAnchor="middle" fill={C.navy} fontSize="18" fontWeight="750">
        {mode === 'bit-stuffing' ? 'Bit stuffing protects the flag pattern' : 'Byte stuffing protects special bytes'}
      </text>
    </Svg>
  )
}

export function StopWaitTimeline() {
  return (
    <Svg w={640} h={300} label="Stop-and-Wait timeline">
      <text x="90" y="36" textAnchor="middle" fill={C.navy} fontSize="18" fontWeight="850">Sender</text>
      <text x="550" y="36" textAnchor="middle" fill={C.navy} fontSize="18" fontWeight="850">Receiver</text>
      <line x1="90" y1="50" x2="90" y2="280" stroke="#cbd5e1" strokeWidth="4" />
      <line x1="550" y1="50" x2="550" y2="280" stroke="#cbd5e1" strokeWidth="4" />
      <path d="M100 80 L540 110" stroke={C.blue} strokeWidth="3.5" markerEnd="url(#cnxArrowBlue)" className="cnx-draw" />
      <text x="320" y="88" fill={C.blue} fontSize="18" fontWeight="850">Frame 0</text>
      <path d="M540 140 L100 170" stroke={C.green} strokeWidth="3.5" markerEnd="url(#cnxArrowTeal)" className="cnx-draw" />
      <text x="320" y="154" fill={C.green} fontSize="18" fontWeight="850">ACK 1</text>
      <path d="M100 200 L540 230" stroke={C.blue} strokeWidth="3.5" markerEnd="url(#cnxArrowBlue)" className="cnx-draw" />
      <text x="320" y="216" fill={C.blue} fontSize="18" fontWeight="850">Frame 1</text>
    </Svg>
  )
}

export function SlidingWindowViz({ size = 4 }) {
  const nums = Array.from({ length: 12 }, (_, i) => i)
  return (
    <Svg w={760} h={200} label="Sliding window">
      {nums.map((n, i) => {
        const inWin = i >= 2 && i < 2 + size
        return (
          <g key={n}>
            <rect x={40 + i * 58} y="66" width="50" height="56" rx="12" fill={inWin ? 'url(#cnxPurpleGrad)' : '#f8fafc'} stroke={inWin ? C.purple : '#cbd5e1'} strokeWidth="2.5" filter={inWin ? 'url(#cnxSoftShadow)' : undefined} />
            <text x={65 + i * 58} y="101" textAnchor="middle" fill={inWin ? '#fff' : C.navy} fontSize="18" fontWeight="850">{n}</text>
          </g>
        )
      })}
      <rect x={40 + 2 * 58 - 8} y="56" width={size * 58 + 8} height="78" rx="16" fill="none" stroke={C.amber} strokeWidth="3.5" strokeDasharray="7 5" className="cnx-window" />
      <text x="380" y="174" textAnchor="middle" fill={C.navy} fontSize="18" fontWeight="750">Sender window of size {size} slides as ACKs arrive</text>
    </Svg>
  )
}

export function HdlcFrame() {
  const fields = ['Flag', 'Address', 'Control', 'Information', 'FCS', 'Flag']
  const widths = [74, 96, 96, 214, 96, 74]
  let x = 34
  return (
    <Svg w={760} h={230} label="HDLC frame">
      <text x="380" y="46" textAnchor="middle" fill={C.navy} fontSize="20" fontWeight="800">HDLC Frame Format</text>
      {fields.map((f, i) => {
        const w = widths[i]
        const node = (
          <g key={f}>
            <rect x={x} y="78" width={w} height="104" rx="14" fill={i === 0 || i === 5 ? 'url(#cnxTealGrad)' : i === 4 ? 'url(#cnxPurpleGrad)' : '#eff6ff'} stroke={C.navy} strokeWidth="1.8" filter="url(#cnxSoftShadow)" />
            <text x={x + w / 2} y="136" textAnchor="middle" fill={i === 0 || i === 5 || i === 4 ? '#fff' : C.navy} fontSize={f.length > 10 ? 16 : 18} fontWeight="850">{f}</text>
          </g>
        )
        x += w + 6
        return node
      })}
    </Svg>
  )
}

export function PppPhases() {
  const phases = ['Dead', 'Establish', 'Authenticate', 'Network', 'Open', 'Terminate']
  return (
    <Svg w={780} h={220} label="PPP transition phases">
      {phases.map((p, i) => {
        const x = 24 + i * 125
        return (
          <g key={p}>
            <rect x={x} y="78" width="108" height="64" rx="14" fill={i === 4 ? C.green : '#eff6ff'} stroke={C.blue} strokeWidth="2.5" filter="url(#cnxSoftShadow)" />
            <text x={x + 54} y="116" textAnchor="middle" fill={i === 4 ? '#fff' : C.navy} fontSize={p.length > 8 ? 15 : 17} fontWeight="800">{p}</text>
            {i < phases.length - 1 && <text x={x + 111} y="118" fill={C.blue} fontSize="22" fontWeight="800">→</text>}
          </g>
        )
      })}
    </Svg>
  )
}

export function SharedMediumScene() {
  return (
    <Svg w={720} h={260} label="Shared medium">
      <rect x="80" y="106" width="560" height="32" rx="16" fill="url(#cnxTealGrad)" filter="url(#cnxSoftShadow)" />
      <text x="360" y="128" textAnchor="middle" fill="#fff" fontSize="18" fontWeight="850">Shared medium</text>
      {[120, 260, 400, 540].map((x, i) => (
        <g key={x}>
          <rect x={x - 38} y="34" width="76" height="46" rx="12" fill="url(#cnxBlueGrad)" filter="url(#cnxSoftShadow)" />
          <text x={x} y="64" textAnchor="middle" fill="#fff" fontSize="18" fontWeight="850">S{i + 1}</text>
          <line x1={x} y1="80" x2={x} y2="106" stroke={C.navy} strokeWidth="3" />
        </g>
      ))}
      <circle cx="400" cy="122" r="13" fill={C.amber} className="cnx-pulse" />
      <text x="360" y="205" textAnchor="middle" fill={C.navy} fontSize="20" fontWeight="850">Who gets to transmit now?</text>
    </Svg>
  )
}

export function AlohaCollision() {
  return (
    <Svg w={720} h={260} label="ALOHA collision">
      <rect x="80" y="58" width="220" height="44" rx="12" fill="url(#cnxBlueGrad)" opacity="0.9" filter="url(#cnxSoftShadow)" />
      <rect x="200" y="112" width="220" height="44" rx="12" fill="url(#cnxPurpleGrad)" opacity="0.9" filter="url(#cnxSoftShadow)" />
      <rect x="180" y="58" width="132" height="98" rx="16" fill={C.red} opacity="0.22" stroke={C.red} strokeWidth="3" className="cnx-pulse" />
      <text x="246" y="208" textAnchor="middle" fill={C.red} fontSize="20" fontWeight="850">Collision: both frames damaged</text>
    </Svg>
  )
}

export function CsmaScene() {
  return (
    <Svg w={740} h={260} label="CSMA">
      {['Listen', 'Idle?', 'Transmit', 'or Wait'].map((s, i) => {
        const x = 40 + i * 172
        return (
          <g key={s}>
            <rect x={x} y="96" width="142" height="72" rx="15" fill={i === 2 ? C.green : '#eff6ff'} stroke={C.blue} strokeWidth="2.5" filter="url(#cnxSoftShadow)" />
            <text x={x + 71} y="139" textAnchor="middle" fill={i === 2 ? '#fff' : C.navy} fontSize="19" fontWeight="800">{s}</text>
            {i < 3 && <text x={x + 148} y="140" fill={C.blue} fontSize="24" fontWeight="800">→</text>}
          </g>
        )
      })}
    </Svg>
  )
}

export function CsmaCdCollision() {
  return (
    <Svg w={720} h={280} label="CSMA/CD">
      {['Transmit', 'Collision', 'Detect', 'Jam / Stop', 'Backoff', 'Retry'].map((s, i) => {
        const x = 20 + (i % 3) * 230
        const y = i < 3 ? 50 : 150
        return (
          <g key={s}>
            <rect x={x} y={y} width="200" height="62" rx="15" fill={s === 'Collision' ? '#fee2e2' : '#eff6ff'} stroke={s === 'Collision' ? C.red : C.blue} strokeWidth="3" filter="url(#cnxSoftShadow)" className={s === 'Collision' ? 'cnx-pulse' : undefined} />
            <text x={x + 100} y={y + 39} textAnchor="middle" fill={C.navy} fontSize="18" fontWeight="850">{s}</text>
          </g>
        )
      })}
    </Svg>
  )
}

export function ControlledAccessViz({ mode = 'token' }) {
  return (
    <Svg w={720} h={290} label={mode}>
      {[0, 1, 2, 3, 4].map((i) => {
        const a = -Math.PI / 2 + (i * 2 * Math.PI) / 5
        const x = 360 + Math.cos(a) * 118
        const y = 132 + Math.sin(a) * 96
        return (
          <g key={i}>
            <circle cx={x} cy={y} r="32" fill={i === 0 ? C.amber : C.blue} filter="url(#cnxSoftShadow)" />
            <text x={x} y={y + 6} textAnchor="middle" fill="#fff" fontSize="18" fontWeight="800">S{i}</text>
          </g>
        )
      })}
      <text x="360" y="270" textAnchor="middle" fill={C.navy} fontSize="18" fontWeight="700">
        {mode === 'polling' ? 'Primary polls secondaries' : mode === 'reservation' ? 'Stations reserve slots' : 'Token circulates — only holder may send'}
      </text>
    </Svg>
  )
}

export function ChannelizationViz({ mode = 'FDMA' }) {
  return (
    <Svg w={720} h={280} label={mode}>
      <text x="40" y="48" fill={C.navy} fontSize="22" fontWeight="800">{mode}</text>
      {mode === 'TDMA'
        ? [0, 1, 2, 3].map((i) => (
            <g key={i}>
              <rect x={70 + i * 148} y="118" width="130" height="70" rx="13" fill={['#dbeafe', '#ccfbf1', '#ede9fe', '#ffedd5'][i]} stroke={C.navy} strokeWidth="2" filter="url(#cnxSoftShadow)" />
              <text x={135 + i * 148} y="160" textAnchor="middle" fill={C.navy} fontSize="17" fontWeight="800">Slot {i + 1}</text>
            </g>
          ))
        : mode === 'CDMA'
          ? (
            <text x="360" y="150" textAnchor="middle" fill={C.purple} fontSize="20" fontWeight="750">Users share band via orthogonal codes</text>
          )
          : [0, 1, 2].map((i) => (
            <g key={i}>
              <rect x="100" y={86 + i * 58} width="500" height="46" rx="10" fill={['#dbeafe', '#ccfbf1', '#ede9fe'][i]} stroke={C.blue} strokeWidth="2" filter="url(#cnxSoftShadow)" />
              <text x="350" y={115 + i * 58} textAnchor="middle" fill={C.navy} fontSize="16" fontWeight="750">Band {i + 1}</text>
            </g>
          ))}
    </Svg>
  )
}

export function EthernetFrame() {
  const fields = [
    ['Preamble', 70],
    ['SFD', 50],
    ['Dest', 90],
    ['Src', 90],
    ['Type', 60],
    ['Data', 180],
    ['CRC', 70],
  ]
  let x = 30
  return (
    <Svg w={760} h={230} label="Ethernet frame">
      <text x="380" y="46" textAnchor="middle" fill={C.navy} fontSize="20" fontWeight="800">IEEE 802.3 Ethernet Frame</text>
      {fields.map(([f, w]) => {
        const node = (
          <g key={f}>
            <rect x={x} y="78" width={w} height="104" rx="14" fill={f === 'CRC' ? 'url(#cnxPurpleGrad)' : '#eff6ff'} stroke={C.blue} strokeWidth="2.4" filter="url(#cnxSoftShadow)" />
            <text x={x + w / 2} y="136" textAnchor="middle" fill={f === 'CRC' ? '#fff' : C.navy} fontSize={w < 60 ? 15 : 18} fontWeight="850">{f}</text>
          </g>
        )
        x += w + 6
        return node
      })}
    </Svg>
  )
}

export function EthernetEvolution() {
  return (
    <Svg w={720} h={200} label="Ethernet evolution">
      {[
        ['Standard', '10 Mbps', C.blue],
        ['Fast', '100 Mbps', C.teal],
        ['Gigabit', '1 Gbps', C.purple],
      ].map(([name, rate, color], i) => (
        <g key={name}>
          <rect x={80 + i * 210} y="56" width="180" height="92" rx="20" fill={color} filter="url(#cnxSoftShadow)" />
          <text x={170 + i * 210} y="96" textAnchor="middle" fill="#fff" fontSize="20" fontWeight="850">{name}</text>
          <text x={170 + i * 210} y="124" textAnchor="middle" fill="#fff" fontSize="18" fontWeight="750">{rate}</text>
          {i < 2 && <path d={`M${266 + i * 210} 104 H${286 + i * 210}`} stroke={C.navy} strokeWidth="3" markerEnd="url(#cnxArrowBlue)" />}
        </g>
      ))}
    </Svg>
  )
}

export function WifiArchitecture() {
  return (
    <Svg w={720} h={280} label="IEEE 802.11 architecture">
      <rect x="76" y="36" width="230" height="190" rx="22" fill="#eff6ff" stroke={C.blue} strokeWidth="3" filter="url(#cnxSoftShadow)" />
      <text x="191" y="72" textAnchor="middle" fill={C.navy} fontSize="20" fontWeight="850">BSS</text>
      <circle cx="150" cy="136" r="32" fill="url(#cnxBlueGrad)" filter="url(#cnxSoftShadow)" />
      <text x="150" y="143" textAnchor="middle" fill="#fff" fontSize="17" fontWeight="850">STA</text>
      <circle cx="236" cy="136" r="34" fill="url(#cnxTealGrad)" filter="url(#cnxSoftShadow)" />
      <circle cx="236" cy="136" r="54" className="cnx-ambient-ring" />
      <text x="236" y="142" textAnchor="middle" fill="#fff" fontSize="16" fontWeight="850">AP</text>
      <rect x="378" y="36" width="266" height="190" rx="22" fill="#f5f3ff" stroke={C.purple} strokeWidth="3" filter="url(#cnxSoftShadow)" />
      <text x="511" y="72" textAnchor="middle" fill={C.navy} fontSize="20" fontWeight="850">ESS + DS</text>
      <rect x="418" y="108" width="188" height="58" rx="15" fill="url(#cnxPurpleGrad)" filter="url(#cnxSoftShadow)" />
      <text x="512" y="144" textAnchor="middle" fill="#fff" fontSize="17" fontWeight="850">Distribution System</text>
      <path d="M270 136 H416" stroke={C.indigo} strokeWidth="3.5" markerEnd="url(#cnxArrowPurple)" className="cnx-draw" />
    </Svg>
  )
}

export function BluetoothPiconet() {
  return (
    <Svg w={720} h={260} label="Bluetooth piconet">
      <circle cx="360" cy="120" r="42" fill="url(#cnxAmberGrad)" filter="url(#cnxSoftShadow)" />
      <circle cx="360" cy="120" r="64" className="cnx-ambient-ring" />
      <text x="360" y="126" textAnchor="middle" fill="#fff" fontSize="17" fontWeight="850">Master</text>
      {[0, 1, 2, 3, 4].map((i) => {
        const a = -Math.PI / 2 + (i * 2 * Math.PI) / 5
        const x = 360 + Math.cos(a) * 120
        const y = 120 + Math.sin(a) * 90
        return (
          <g key={i}>
            <line x1="360" y1="120" x2={x} y2={y} stroke="#cbd5e1" strokeWidth="3.2" />
            <circle cx={x} cy={y} r="31" fill="url(#cnxBlueGrad)" filter="url(#cnxSoftShadow)" />
            <text x={x} y={y + 6} textAnchor="middle" fill="#fff" fontSize="17" fontWeight="850">S{i}</text>
          </g>
        )
      })}
      <text x="360" y="244" textAnchor="middle" fill={C.navy} fontSize="18" fontWeight="750">Piconet: one master, up to seven active slaves</text>
    </Svg>
  )
}

export function ConnectingDevicesViz() {
  const devices = [
    ['Repeater', '1', C.teal],
    ['Hub', '1', C.teal],
    ['Bridge', '2', C.purple],
    ['Switch', '2', C.purple],
    ['Router', '3', C.indigo],
    ['Gateway', 'all', C.navy],
  ]
  return (
    <Svg w={760} h={220} label="Connecting devices">
      {devices.map(([name, layer, color], i) => (
        <g key={name}>
          <rect x={24 + i * 122} y="60" width="112" height="104" rx="18" fill={color} filter="url(#cnxSoftShadow)" />
          <text x={80 + i * 122} y="106" textAnchor="middle" fill="#fff" fontSize={name.length > 7 ? 16 : 18} fontWeight="850">{name}</text>
          <text x={80 + i * 122} y="136" textAnchor="middle" fill="#fff" fontSize="17" fontWeight="750">L{layer}</text>
        </g>
      ))}
    </Svg>
  )
}

export function CellularHandoff() {
  return (
    <Svg w={720} h={280} label="Cellular handoff">
      <circle cx="220" cy="140" r="96" fill="#dbeafe" stroke={C.blue} strokeWidth="3.5" opacity="0.9" filter="url(#cnxSoftShadow)" />
      <circle cx="500" cy="140" r="96" fill="#ccfbf1" stroke={C.teal} strokeWidth="3.5" opacity="0.9" filter="url(#cnxSoftShadow)" />
      <circle cx="220" cy="140" r="16" fill={C.blue} />
      <circle cx="500" cy="140" r="16" fill={C.teal} />
      <path d="M300 120 C335 98 380 98 420 120" fill="none" stroke={C.amber} strokeWidth="4" strokeLinecap="round" markerEnd="url(#cnxArrowBlue)" className="cnx-draw" />
      <text x="220" y="256" textAnchor="middle" fill={C.navy} fontSize="18" fontWeight="850">Cell A / BS</text>
      <text x="500" y="256" textAnchor="middle" fill={C.navy} fontSize="18" fontWeight="850">Cell B / BS</text>
      <circle cx="360" cy="120" r="19" fill="url(#cnxAmberGrad)" className="cnx-pulse" filter="url(#cnxSoftShadow)" />
      <text x="360" y="82" textAnchor="middle" fill={C.amber} fontSize="18" fontWeight="850">MS handoff</text>
    </Svg>
  )
}

export function Ipv4AddressViz({ dotted = '192.168.10.25' }) {
  const octets = dotted.split('.')
  return (
    <Svg w={720} h={240} label="IPv4 address">
      <text x="360" y="40" textAnchor="middle" fill={C.navy} fontSize="22" fontWeight="850">32-bit IPv4 address</text>
      {octets.map((o, i) => (
        <g key={i}>
          <rect x={74 + i * 152} y="70" width="128" height="70" rx="16" fill="#dbeafe" stroke={C.blue} strokeWidth="3" filter="url(#cnxSoftShadow)" />
          <text x={138 + i * 152} y="114" textAnchor="middle" fill={C.navy} fontSize="26" fontWeight="850">{o}</text>
          {i < 3 && <text x={209 + i * 152} y="116" fill={C.navy} fontSize="28" fontWeight="850">.</text>}
        </g>
      ))}
      <text x="360" y="196" textAnchor="middle" fill={C.navy} fontSize="18" fontWeight="750">Dotted-decimal notation of four octets</text>
    </Svg>
  )
}

export function InternetworkJourney() {
  return (
    <Svg w={760} h={240} label="Internetworking">
      {['LAN A', 'Router', 'WAN', 'Router', 'LAN B'].map((s, i) => {
        const x = 40 + i * 145
        return (
          <g key={s}>
            <rect x={x} y="76" width="124" height="70" rx="16" fill={s.includes('Router') ? 'url(#cnxPurpleGrad)' : '#eff6ff'} stroke={C.blue} strokeWidth="3" filter="url(#cnxSoftShadow)" />
            <text x={x + 62} y="118" textAnchor="middle" fill={s.includes('Router') ? '#fff' : C.navy} fontSize="18" fontWeight="850">{s}</text>
            {i < 4 && <path d={`M${x + 128} 111 H${x + 142}`} stroke={C.blue} strokeWidth="3" markerEnd="url(#cnxArrowBlue)" />}
          </g>
        )
      })}
      <circle cx="100" cy="111" r="10" fill={C.amber} className="cnx-pulse" />
      <text x="380" y="198" textAnchor="middle" fill={C.navy} fontSize="18" fontWeight="750">IP packet crosses heterogeneous networks</text>
    </Svg>
  )
}

export function Ipv4Header() {
  const rows = [
    ['Ver', 'IHL', 'Service', 'Total Length'],
    ['Identification', 'Flags', 'Fragment Offset'],
    ['TTL', 'Protocol', 'Header Checksum'],
    ['Source IP Address'],
    ['Destination IP Address'],
    ['Options / Padding'],
  ]
  return (
    <div className="cnx-ip-header" aria-label="IPv4 header">
      <h4>IPv4 Datagram Header</h4>
      {rows.map((row) => (
        <div key={row.join('-')} className="cnx-ip-row">
          {row.map((f) => <span key={f}>{f}</span>)}
        </div>
      ))}
    </div>
  )
}

export function Ipv6Header() {
  const rows = [
    ['Version', 'Traffic Class', 'Flow Label'],
    ['Payload Length', 'Next Header', 'Hop Limit'],
    ['Source Address (128 bits)'],
    ['Destination Address (128 bits)'],
  ]
  return (
    <div className="cnx-ip-header v6" aria-label="IPv6 header">
      <h4>IPv6 Base Header</h4>
      {rows.map((row) => (
        <div key={row.join('-')} className="cnx-ip-row">
          {row.map((f) => <span key={f}>{f}</span>)}
        </div>
      ))}
    </div>
  )
}

export function Ipv4Ipv6Morph() {
  return (
    <div className="cnx-ip-compare" aria-label="IPv4 vs IPv6 headers">
      <Ipv4Header />
      <div className="cnx-morph-arrow">→ streamlined →</div>
      <Ipv6Header />
    </div>
  )
}

export function DuplexViz({ mode = 'full' }) {
  return (
    <Svg w={640} h={200} label={`${mode} duplex`}>
      <Device x={100} y={100} label="A" />
      <Device x={540} y={100} label="B" tone="teal" />
      {mode !== 'simplex' && <path d="M154 90 H486" stroke={C.blue} strokeWidth="4" markerEnd="url(#darr)" />}
      {(mode === 'full' || mode === 'simplex') && <path d="M154 110 H486" stroke={mode === 'simplex' ? C.blue : C.teal} strokeWidth="4" />}
      {mode === 'half' && <path d="M486 110 H154" stroke={C.teal} strokeWidth="4" strokeDasharray="8 6" />}
      <defs>
        <marker id="darr" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill={C.blue} />
        </marker>
      </defs>
      <text x="320" y="176" textAnchor="middle" fill={C.navy} fontSize="18" fontWeight="800">{mode}-duplex</text>
    </Svg>
  )
}

export function InternetLayers() {
  const layers = ['End systems', 'Access networks', 'ISP', 'Backbone', 'Remote network', 'Destination']
  return (
    <Svg w={720} h={360} label="Internet structure">
      {layers.map((s, i) => (
        <g key={s}>
          <rect x="176" y={24 + i * 54} width="368" height="44" rx="12" fill={i === 0 || i === 5 ? C.blue : '#eff6ff'} stroke={C.blue} strokeWidth="2" filter="url(#cnxSoftShadow)" />
          <text x="360" y={52 + i * 54} textAnchor="middle" fill={i === 0 || i === 5 ? '#fff' : C.navy} fontSize="18" fontWeight="750">{s}</text>
        </g>
      ))}
    </Svg>
  )
}

export function TopologyViz({ type = 'star' }) {
  const W = 660
  const H = 320
  const cx = W / 2
  const cy = 150
  const pentagon = [0, 1, 2, 3, 4].map((i) => {
    const a = -Math.PI / 2 + (i * 2 * Math.PI) / 5
    return { x: Math.round(cx + 140 * Math.cos(a)), y: Math.round(cy + 110 * Math.sin(a)), label: 'ABCDE'[i] }
  })
  let nodes = pentagon
  let edges = []
  let hubs = []
  if (type === 'mesh') {
    for (let i = 0; i < 5; i += 1) for (let j = i + 1; j < 5; j += 1) edges.push([i, j])
  } else if (type === 'ring') edges = [[0, 1], [1, 2], [2, 3], [3, 4], [4, 0]]
  else if (type === 'bus') {
    const xs = [80, 200, 320, 450, 570]
    nodes = xs.map((x, i) => ({ x, y: i % 2 === 0 ? 80 : 220, label: 'ABCDE'[i] }))
    edges = nodes.map((_, i) => [i, `bus${i}`])
  } else if (type === 'star') {
    hubs = [{ x: cx, y: cy, label: 'Hub' }]
    edges = [[0, 'h0'], [1, 'h0'], [2, 'h0'], [3, 'h0'], [4, 'h0']]
  } else {
    hubs = [{ x: 210, y: cy, label: 'S1' }, { x: 450, y: cy, label: 'S2' }]
    nodes = [
      { x: 90, y: 70, label: 'A' }, { x: 90, y: 230, label: 'B' }, { x: 330, y: 50, label: 'C' },
      { x: 570, y: 70, label: 'D' }, { x: 570, y: 230, label: 'E' },
    ]
    edges = [[0, 'h0'], [1, 'h0'], [2, 'h0'], [3, 'h1'], [4, 'h1'], ['h0', 'h1']]
  }
  const point = (ref) => {
    if (typeof ref === 'number') return nodes[ref]
    if (String(ref).startsWith('h')) return hubs[Number(String(ref).slice(1))]
    if (String(ref).startsWith('bus')) return { x: nodes[Number(String(ref).slice(3))].x, y: cy }
    return nodes[ref]
  }
  return (
    <Svg w={W} h={H} label={`${type} topology`}>
      {type === 'bus' && <line x1="48" y1={cy} x2={W - 48} y2={cy} stroke={C.teal} strokeWidth="7" strokeLinecap="round" />}
      {edges.map(([a, b], i) => {
        const p = point(a)
        const q = point(b)
        return <line key={i} x1={p.x} y1={p.y} x2={q.x} y2={q.y} stroke={C.blue} strokeOpacity="0.55" strokeWidth="3.2" />
      })}
      {hubs.map((h, i) => (
        <g key={`h${i}`}>
          <circle cx={h.x} cy={h.y} r="32" fill={C.teal} filter="url(#cnxSoftShadow)" />
          <text x={h.x} y={h.y + 6} textAnchor="middle" fill="#fff" fontSize="16" fontWeight="800">{h.label}</text>
        </g>
      ))}
      {nodes.map((n, i) => (
        <g key={`n${i}`}>
          <circle cx={n.x} cy={n.y} r="28" fill={C.blue} filter="url(#cnxSoftShadow)" />
          <text x={n.x} y={n.y + 6} textAnchor="middle" fill="#fff" fontSize="17" fontWeight="800">{n.label}</text>
        </g>
      ))}
      <text x="28" y={H - 14} fill={C.navy} fontSize="17" fontWeight="800">{type.toUpperCase()} TOPOLOGY</text>
    </Svg>
  )
}

export function ModulationViz({ mode = 'ASK' }) {
  return (
    <Svg w={760} h={420} label={mode}>
      <text x="48" y="56" fill={C.navy} fontSize="24" fontWeight="800">{mode} — carrier modified by data</text>
      <line x1="48" y1="240" x2="712" y2="240" stroke="#e2e8f0" strokeWidth="2.5" strokeDasharray="8 8" />
      <path
        d={
          mode === 'FSK'
            ? 'M48 240 Q78 132 108 240 T168 240 Q198 84 228 240 T288 240 Q318 132 348 240 T408 240 Q438 84 468 240 T528 240 Q558 132 588 240 T648 240 Q678 84 704 240'
            : mode === 'PSK'
              ? 'M48 240 Q78 120 108 240 T168 240 Q198 360 228 240 T288 240 Q318 120 348 240 T408 240 Q438 360 468 240 T528 240 Q558 120 588 240 T648 240'
              : 'M48 240 Q78 108 108 240 T168 240 Q198 186 228 240 T288 240 Q318 108 348 240 T408 240 Q438 186 468 240 T528 240 Q558 108 588 240 T648 240'
        }
        fill="none"
        stroke={C.teal}
        strokeWidth="5"
        strokeLinecap="round"
        className="cnx-draw"
        filter="url(#cnxGlowBlue)"
      />
      <text x="48" y="392" fill={C.navy} fontSize="19" fontWeight="700">Digital bits shape amplitude, frequency, or phase of an analog carrier</text>
    </Svg>
  )
}

export function NyquistShannonViz() {
  return (
    <Svg w={760} h={380} label="Nyquist and Shannon">
      <rect x="44" y="60" width="320" height="240" rx="22" fill="#eff6ff" stroke={C.blue} strokeWidth="3" filter="url(#cnxSoftShadow)" />
      <text x="204" y="132" textAnchor="middle" fill={C.blue} fontSize="27" fontWeight="800">Nyquist</text>
      <text x="204" y="176" textAnchor="middle" fill={C.navy} fontSize="19" fontWeight="600">Noiseless channel</text>
      <text x="204" y="238" textAnchor="middle" fill={C.navy} fontSize="25" fontWeight="800">C = 2B log₂ M</text>
      <rect x="396" y="60" width="320" height="240" rx="22" fill="#ecfdf5" stroke={C.teal} strokeWidth="3" filter="url(#cnxSoftShadow)" />
      <text x="556" y="132" textAnchor="middle" fill={C.teal} fontSize="27" fontWeight="800">Shannon</text>
      <text x="556" y="176" textAnchor="middle" fill={C.navy} fontSize="19" fontWeight="600">Noisy channel</text>
      <text x="556" y="238" textAnchor="middle" fill={C.navy} fontSize="25" fontWeight="800">C = B log₂(1 + SNR)</text>
    </Svg>
  )
}

export function LayerDetail({ layer = 3 }) {
  const info = {
    7: ['Application', 'User network services', 'Data', 'Email, file transfer, remote login'],
    6: ['Presentation', 'Translation, compression, encryption', 'Data', 'Syntax agreement between peers'],
    5: ['Session', 'Dialog setup, sync, recovery', 'Data', 'Session checkpoints'],
    4: ['Transport', 'Process-to-process delivery', 'Segment', 'Reliability and ports'],
    3: ['Network', 'Source-to-destination delivery', 'Packet', 'Logical addressing and routing'],
    2: ['Data Link', 'Node-to-node delivery', 'Frame', 'Framing, MAC, error detection'],
    1: ['Physical', 'Bit transmission', 'Bits', 'Signals, media, connectors'],
  }[layer] || ['Network', '', '', '']
  return (
    <div className="cnx-layer-detail" style={{ '--osi': layer <= 2 ? C.teal : layer === 3 ? C.purple : C.blue }}>
      <span className="cnx-layer-num">Layer {layer}</span>
      <h3>{info[0]}</h3>
      <p>{info[1]}</p>
      <div className="cnx-layer-meta">
        <strong>PDU:</strong> {info[2]}
        <strong>Example:</strong> {info[3]}
      </div>
    </div>
  )
}
