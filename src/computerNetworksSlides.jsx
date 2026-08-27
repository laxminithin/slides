import {
  KeyStatement,
  Lead,
  Points,
  SectionDivider,
  StoryHook,
  Takeaway,
  TwoColumn,
  VisualFirst,
  VisualPanel,
} from './components/Teaching'

const reveal = (step, at) => (step >= at ? 'is-visible' : '')
const active = (step, at) => (step >= at ? 'is-active' : '')

function RevealStack({ step, items }) {
  return (
    <div className="cn-reveal-stack">
      {items.map((item, index) => (
        <article key={item.title} className={`cn-reveal-card ${reveal(step, index)}`}>
          <span>{item.label}</span>
          <strong>{item.title}</strong>
          <p>{item.text}</p>
        </article>
      ))}
    </div>
  )
}

function Packet({ label = 'DATA', className = '' }) {
  return (
    <div className={`cn-packet ${className}`.trim()}>
      <span>{label}</span>
    </div>
  )
}

function DataCommunicationViz({ step = 0 }) {
  return (
    <div className="cn-canvas cn-link-canvas">
      <div className="cn-device sender">
        <span className="cn-device-screen">S</span>
        <strong>Sender</strong>
      </div>
      <div className={`cn-medium ${active(step, 1)}`}>
        <span className="cn-medium-label">Transmission medium</span>
        <Packet className={step >= 2 ? 'move-across' : ''} />
      </div>
      <div className="cn-device receiver">
        <span className="cn-device-screen">R</span>
        <strong>Receiver</strong>
      </div>
      <div className="cn-signal-log">
        <span className={active(step, 0)}>Message created</span>
        <span className={active(step, 1)}>Signal encoded</span>
        <span className={active(step, 2)}>Packet delivered</span>
      </div>
    </div>
  )
}

function DuplexViz({ step = 0 }) {
  const modes = [
    ['Simplex', 'Keyboard sends. Monitor receives.', 'one-way'],
    ['Half Duplex', 'Walkie-talkie style turn taking.', 'half'],
    ['Full Duplex', 'Both sides send at the same time.', 'full'],
  ]
  return (
    <div className="cn-duplex-grid">
      {modes.map(([name, text, tone], index) => (
        <article key={name} className={`cn-duplex-card ${tone} ${reveal(step, index)}`}>
          <div className="cn-mini-link">
            <span>A</span>
            <i />
            <span>B</span>
          </div>
          <strong>{name}</strong>
          <p>{text}</p>
        </article>
      ))}
    </div>
  )
}

function CoverageViz({ step = 0 }) {
  return (
    <div className="cn-canvas cn-coverage">
      <div className={`cn-coverage-ring lan ${active(step, 0)}`}>LAN</div>
      <div className={`cn-coverage-ring man ${active(step, 1)}`}>MAN</div>
      <div className={`cn-coverage-ring wan ${active(step, 2)}`}>WAN</div>
      <div className="cn-building b1">Lab</div>
      <div className="cn-building b2">Campus</div>
      <div className="cn-building b3">City</div>
      <div className="cn-city city-a">Mysuru</div>
      <div className="cn-city city-b">Bengaluru</div>
      <Packet className={step >= 2 ? 'city-hop' : ''} label="IP" />
    </div>
  )
}

function TopologyViz({ step = 0 }) {
  const nodes = ['A', 'B', 'C', 'D', 'E']
  const topologies = [
    ['Mesh', 'Every critical node can reach many others.', 'mesh'],
    ['Star', 'A central hub or switch coordinates links.', 'star'],
    ['Ring', 'Frames circulate around a closed loop.', 'ring'],
    ['Bus', 'One shared backbone broadcasts signals.', 'bus'],
    ['Hybrid', 'Real networks combine patterns.', 'hybrid'],
  ]
  return (
    <div className="cn-topology-board">
      {topologies.map(([name, text, type], index) => (
        <article key={name} className={`cn-topology-card ${type} ${reveal(step, index)}`}>
          <div className="cn-topology-art">
            {nodes.map((node, nodeIndex) => <span key={node} className={`n${nodeIndex + 1}`}>{node}</span>)}
            <i className="l1" /><i className="l2" /><i className="l3" /><i className="l4" /><i className="l5" /><i className="l6" />
          </div>
          <strong>{name}</strong>
          <p>{text}</p>
        </article>
      ))}
    </div>
  )
}

function OsiViz({ step = 0 }) {
  const layers = ['Application', 'Presentation', 'Session', 'Transport', 'Network', 'Data Link', 'Physical']
  const headers = ['HTTP', 'TLS', 'SYNC', 'TCP', 'IP', 'MAC', 'Bits']
  return (
    <div className="cn-osi-lab">
      <div className="cn-osi-host">
        {layers.map((layer, index) => (
          <div key={layer} className={`cn-osi-layer ${active(step, index)}`}>
            <span>{7 - index}</span>
            <strong>{layer}</strong>
            {step >= index && <em>{headers[index]}</em>}
          </div>
        ))}
      </div>
      <div className="cn-encapsulation">
        <Packet label={step < 3 ? 'DATA' : step < 5 ? 'SEGMENT' : step < 6 ? 'PACKET' : 'FRAME'} />
        <div className="cn-header-train">
          {headers.slice(0, Math.min(step + 1, headers.length)).map((header) => <span key={header}>{header}</span>)}
        </div>
      </div>
    </div>
  )
}

function TcpIpViz({ step = 0 }) {
  const stages = [
    ['Application Data', 'Message from app'],
    ['TCP Segment', 'Ports + reliability'],
    ['IP Packet', 'Logical address'],
    ['Ethernet Frame', 'MAC address + trailer'],
    ['Bits', 'Signal on medium'],
  ]
  return (
    <div className="cn-tcpip-flow">
      {stages.map(([name, text], index) => (
        <div key={name} className={`cn-tcpip-stage ${reveal(step, index)}`}>
          <strong>{name}</strong>
          <span>{text}</span>
        </div>
      ))}
      <Packet className={`tcpip-drop drop-${Math.min(step, 4)}`} label="DATA" />
    </div>
  )
}

function AddressViz({ step = 0 }) {
  const rows = [
    ['Application', 'URL / name', 'vtu.ac.in'],
    ['Transport', 'Port address', '443'],
    ['Network', 'Logical IP', '172.16.4.21'],
    ['Data Link', 'Physical MAC', '8C:85:90:12:AA:7B'],
  ]
  return (
    <div className="cn-address-table">
      {rows.map(([layer, type, example], index) => (
        <div key={layer} className={`cn-address-row ${reveal(step, index)}`}>
          <span>{layer}</span>
          <strong>{type}</strong>
          <code>{example}</code>
        </div>
      ))}
    </div>
  )
}

function MediaViz({ step = 0 }) {
  return (
    <div className="cn-media-lab">
      {[
        ['Copper', 'Electrical pulses', 'copper'],
        ['Fiber', 'Light pulses', 'fiber'],
        ['Wireless', 'Radio waves', 'wireless'],
      ].map(([name, text, tone], index) => (
        <article key={name} className={`cn-media-card ${tone} ${reveal(step, index)}`}>
          <div className="cn-wave"><i /><i /><i /></div>
          <strong>{name}</strong>
          <p>{text}</p>
        </article>
      ))}
    </div>
  )
}

function SwitchingViz({ step = 0 }) {
  return (
    <div className="cn-switching-lab">
      <article className={`cn-switch-mode ${active(step, 0)}`}>
        <strong>Circuit Switching</strong>
        <div className="cn-reserved-path">
          <span>A</span><i /><i /><i /><span>B</span>
        </div>
        <p>One dedicated path is reserved before communication starts.</p>
      </article>
      <article className={`cn-switch-mode ${active(step, 1)}`}>
        <strong>Packet Switching</strong>
        <div className="cn-packet-paths">
          <Packet label="1" /><Packet label="2" /><Packet label="3" />
        </div>
        <p>Packets can split, use different routes, and reassemble at the destination.</p>
      </article>
    </div>
  )
}

function FramingViz({ step = 0 }) {
  return (
    <div className="cn-frame-lab">
      <div className={`cn-frame-part header ${reveal(step, 1)}`}>Header</div>
      <div className="cn-frame-part payload">Payload</div>
      <div className={`cn-frame-part trailer ${reveal(step, 2)}`}>Trailer</div>
    </div>
  )
}

function SlidingWindowViz({ step = 0 }) {
  return (
    <div className="cn-window-lab">
      {[0, 1, 2, 3, 4, 5, 6].map((n) => (
        <span key={n} className={n >= step && n < step + 3 ? 'inside' : ''}>F{n}</span>
      ))}
      <div className="cn-ack-line">ACK moves the window forward</div>
    </div>
  )
}

function AccessViz({ step = 0 }) {
  return (
    <div className="cn-access-lab">
      {['A', 'B', 'C', 'D'].map((node, index) => (
        <span key={node} className={`node-${index + 1} ${step >= index ? 'talking' : ''}`}>{node}</span>
      ))}
      <div className={`cn-shared-medium ${step >= 2 ? 'collision' : ''}`}>
        {step >= 2 ? 'Collision detected' : 'Shared medium'}
      </div>
      <div className={`cn-backoff ${reveal(step, 3)}`}>Random backoff → retry</div>
    </div>
  )
}

export const computerNetworksModule1Slides = [
  {
    id: 'cn-title',
    kicker: 'Computer Networks',
    title: null,
    hideTitle: true,
    layout: 'full',
    content: (
      <div className="cn-title-hero">
        <div>
          <p className="slide-kicker">COMPUTER NETWORKS</p>
          <h1>Packets Should Feel Alive</h1>
          <p className="subtitle">VTU Computer Networks · Module 01</p>
          <p className="lead">Foundations, media, addressing, OSI/TCP-IP, topologies and switching taught as moving systems.</p>
          <div className="badge-row">
            <span className="pill">Presenter Mode</span>
            <span className="pill">Student Mode</span>
            <span className="pill">Click-to-Reveal</span>
          </div>
        </div>
        <DataCommunicationViz step={2} />
      </div>
    ),
  },
  {
    id: 'story-hook',
    kicker: 'Story hook',
    title: null,
    hideTitle: true,
    content: ({ step = 999 }) => (
      <StoryHook
        statement="A network is a promise: your message will find a path."
        support="Each reveal follows the same teaching beat: question, concept, animation, example, summary and exam point."
        visual={<RevealStack step={step} items={[
          { label: 'Question', title: 'What must move?', text: 'Data must leave one device and arrive meaningfully at another.' },
          { label: 'Concept', title: 'Protocol', text: 'Rules decide format, timing, addressing, error handling and delivery.' },
          { label: 'Exam Point', title: 'Layered design', text: 'Layers reduce complexity by giving each level a specific job.' },
        ]} />}
      />
    ),
  },
  {
    id: 'data-communication',
    kicker: '1.1 Data Communication',
    title: 'Sender, Medium, Receiver',
    subtitle: 'A data communication system exists when a sender, message, medium, receiver and protocol work together.',
    content: ({ step = 999 }) => (
      <TwoColumn
        ratio="visual-lead"
        reverse
        visual={<VisualPanel label="Packet in motion"><DataCommunicationViz step={step} /></VisualPanel>}
      >
        <Lead>Click through the communication chain. The packet does not magically arrive; it is encoded, carried, interpreted and verified.</Lead>
        <Points items={['Sender creates the message', 'Medium carries the signal', 'Receiver decodes the message', 'Protocol controls every step']} />
        <Takeaway label="Exam Point">Components: message, sender, receiver, transmission medium and protocol.</Takeaway>
      </TwoColumn>
    ),
  },
  {
    id: 'data-flow',
    kicker: '1.2 Data Flow',
    title: 'Simplex, Half Duplex, Full Duplex',
    subtitle: 'Direction matters because it changes how devices coordinate access to the medium.',
    content: ({ step = 999 }) => (
      <VisualFirst
        lead="Reveal one communication mode at a time and ask students to name a real-world example."
        visual={<DuplexViz step={step} />}
        takeaway={<Takeaway>Simplex is one-way, half duplex is two-way but not simultaneous, and full duplex is simultaneous two-way communication.</Takeaway>}
      />
    ),
  },
  {
    id: 'network-types',
    kicker: '1.3 Network Types',
    title: 'LAN, MAN and WAN as Coverage',
    subtitle: 'The same packet feels different when it moves across a lab, a city and multiple cities.',
    content: ({ step = 999 }) => (
      <TwoColumn
        ratio="visual-lead"
        reverse
        visual={<VisualPanel label="Coverage map"><CoverageViz step={step} /></VisualPanel>}
      >
        <Points items={['LAN covers a room, lab, building or campus', 'MAN covers a metropolitan region', 'WAN connects distant cities, countries or continents']} />
        <KeyStatement label="Example">College lab network → campus fiber network → internet link to another city.</KeyStatement>
      </TwoColumn>
    ),
  },
  {
    id: 'topologies',
    kicker: '1.4 Topologies',
    title: 'Build the Links One by One',
    subtitle: 'Topology is the physical or logical arrangement of nodes and links.',
    content: ({ step = 999 }) => (
      <VisualFirst
        lead="Each reveal introduces a topology and the failure or traffic behavior students should remember."
        visual={<TopologyViz step={step} />}
        takeaway={<Takeaway label="Exam Point">Star is common in LANs, mesh improves reliability, bus shares one backbone, and ring circulates frames in sequence.</Takeaway>}
      />
    ),
  },
  {
    id: 'models-divider',
    kicker: 'Section 02',
    title: null,
    hideTitle: true,
    content: <SectionDivider number="02" title="Network Models" subtitle="Layering turns a complex communication system into teachable responsibilities." />,
  },
  {
    id: 'osi-model',
    kicker: '1.5 OSI Model',
    title: 'Encapsulation Down, Decapsulation Up',
    subtitle: 'Instead of memorizing rectangles, watch each layer add context to the data.',
    content: ({ step = 999 }) => (
      <TwoColumn
        ratio="visual-lead"
        reverse
        visual={<VisualPanel label="OSI encapsulation"><OsiViz step={step} /></VisualPanel>}
      >
        <Lead>The sender moves down the layers. Headers are added. The receiver moves up and removes them.</Lead>
        <Points items={['Application to Physical on the sender side', 'Physical to Application on the receiver side', 'Each layer serves the layer above it', 'Headers carry control information']} />
      </TwoColumn>
    ),
  },
  {
    id: 'tcpip-model',
    kicker: '1.6 TCP/IP Model',
    title: 'Data Becomes Segment, Packet, Frame and Bits',
    subtitle: 'TCP/IP is the practical internet model used by real networks.',
    content: ({ step = 999 }) => (
      <VisualFirst
        lead="A single app message is wrapped for reliability, routing, local delivery and physical transmission."
        visual={<TcpIpViz step={step} />}
        takeaway={<Takeaway>Encapsulation: Application data → TCP segment → IP packet → Ethernet frame → bits.</Takeaway>}
      />
    ),
  },
  {
    id: 'addressing',
    kicker: '1.7 Addressing',
    title: 'Every Layer Has a Different Address',
    subtitle: 'The destination is not one identifier; it is a stack of identifiers used at different layers.',
    content: ({ step = 999 }) => (
      <TwoColumn
        ratio="copy-lead"
        visual={<VisualPanel label="Header focus"><AddressViz step={step} /></VisualPanel>}
      >
        <Points items={['Application name identifies the service or resource', 'Port address identifies the process', 'IP address identifies the host/network path', 'MAC address identifies the next local interface']} />
        <Takeaway label="Exam Point">Physical = MAC, logical = IP, port = process, application = service name.</Takeaway>
      </TwoColumn>
    ),
  },
  {
    id: 'media',
    kicker: '1.8 Transmission Media',
    title: 'Signals Travel Differently',
    subtitle: 'Copper, fiber and wireless carry information using different physical phenomena.',
    content: ({ step = 999 }) => (
      <VisualFirst
        lead="Keep the idea concrete: the medium changes speed, noise resistance, mobility and installation cost."
        visual={<MediaViz step={step} />}
        takeaway={<Takeaway>Fiber uses light pulses, copper uses electrical pulses, and wireless uses radio waves.</Takeaway>}
      />
    ),
  },
  {
    id: 'switching',
    kicker: '1.9 Switching',
    title: 'Circuit Switching vs Packet Switching',
    subtitle: 'A circuit reserves a path; packet switching lets pieces share the network dynamically.',
    content: ({ step = 999 }) => (
      <TwoColumn
        ratio="visual-lead"
        reverse
        visual={<VisualPanel label="Switching lab"><SwitchingViz step={step} /></VisualPanel>}
      >
        <Lead>Use the contrast as a story: old telephone call versus internet message delivery.</Lead>
        <Points items={['Circuit switching reserves resources before transfer', 'Packet switching splits data into packets', 'Packets may take different routes', 'Destination reassembles packets in order']} />
      </TwoColumn>
    ),
  },
  {
    id: 'module-summary',
    kicker: 'Module recap',
    title: 'What Students Should Carry Forward',
    content: ({ step = 999 }) => (
      <RevealStack step={step} items={[
        { label: '01', title: 'Communication', text: 'Sender, medium, receiver and protocol cooperate to move meaning.' },
        { label: '02', title: 'Structure', text: 'LAN/MAN/WAN and topology define network shape and reach.' },
        { label: '03', title: 'Layering', text: 'OSI and TCP/IP explain how real packets are prepared and delivered.' },
        { label: '04', title: 'Addressing', text: 'MAC, IP, port and application names solve different routing questions.' },
        { label: '05', title: 'Switching', text: 'Circuit and packet switching differ in reservation, sharing and flexibility.' },
      ]} />
    ),
  },
]

export const computerNetworksModule2Slides = [
  {
    id: 'm2-title',
    kicker: 'Computer Networks',
    title: null,
    hideTitle: true,
    layout: 'full',
    content: (
      <div className="cn-title-hero compact">
        <div>
          <p className="slide-kicker">MODULE 02</p>
          <h1>Data Link Layer</h1>
          <p className="subtitle">Framing, error control, flow control and media access protocols.</p>
        </div>
        <FramingViz step={2} />
      </div>
    ),
  },
  {
    id: 'framing',
    kicker: '2.1 Framing',
    title: 'Wrap Data Into a Frame',
    subtitle: 'The data link layer packages network-layer packets for local delivery.',
    content: ({ step = 999 }) => (
      <VisualFirst
        lead="A frame gives local delivery structure: header, payload and trailer."
        visual={<FramingViz step={step} />}
        takeaway={<Takeaway>Header carries local addressing/control; trailer commonly carries error detection information.</Takeaway>}
      />
    ),
  },
  {
    id: 'stuffing',
    kicker: '2.2 Framing Transparency',
    title: 'Bit Stuffing and Byte Stuffing',
    content: ({ step = 999 }) => (
      <RevealStack step={step} items={[
        { label: 'Bit Stuffing', title: 'After five 1s, insert 0', text: 'Prevents data from accidentally looking like a flag.' },
        { label: 'Receiver', title: 'Remove stuffed 0', text: 'Original bit stream is reconstructed.' },
        { label: 'Byte Stuffing', title: 'Insert escape byte', text: 'Special characters inside data are protected.' },
        { label: 'Exam Point', title: 'Transparency', text: 'Control patterns can appear in data without breaking framing.' },
      ]} />
    ),
  },
  {
    id: 'error-control',
    kicker: '2.3 Error Control',
    title: 'CRC and Checksum Catch Corruption',
    content: ({ step = 999 }) => (
      <RevealStack step={step} items={[
        { label: 'CRC', title: 'Polynomial division', text: 'Sender appends a remainder; receiver divides again to verify.' },
        { label: 'Checksum', title: 'Binary addition', text: 'Sender sends complement; receiver checks for expected result.' },
        { label: 'ARQ', title: 'Retransmit on error', text: 'ACK, NAK and timeout recover from lost or corrupted frames.' },
        { label: 'Exam Point', title: 'Detect vs correct', text: 'CRC/checksum detect errors; ARQ handles recovery.' },
      ]} />
    ),
  },
  {
    id: 'flow-control',
    kicker: '2.4 Flow Control',
    title: 'Stop-and-Wait to Sliding Window',
    subtitle: 'Flow control keeps the sender from overwhelming the receiver.',
    content: ({ step = 999 }) => (
      <TwoColumn
        ratio="visual-lead"
        reverse
        visual={<VisualPanel label="Window movement"><SlidingWindowViz step={Math.min(step, 4)} /></VisualPanel>}
      >
        <Points items={['Stop-and-Wait sends one frame then waits for ACK', 'Sliding Window allows multiple outstanding frames', 'Go Back N retransmits from the lost frame onward', 'Selective Repeat retransmits only the missing frame']} />
      </TwoColumn>
    ),
  },
  {
    id: 'mac',
    kicker: '2.5 Media Access',
    title: 'ALOHA, CSMA, CSMA/CD and CSMA/CA',
    subtitle: 'Shared media need rules so nodes do not talk over each other endlessly.',
    content: ({ step = 999 }) => (
      <TwoColumn
        ratio="visual-lead"
        reverse
        visual={<VisualPanel label="Access contention"><AccessViz step={step} /></VisualPanel>}
      >
        <Points items={['ALOHA transmits and retries randomly after collision', 'CSMA listens before transmitting', 'CSMA/CD detects collision on wired Ethernet', 'CSMA/CA avoids collision in wireless networks']} />
        <Takeaway label="Exam Point">Sense, collide or avoid, back off, retry.</Takeaway>
      </TwoColumn>
    ),
  },
]

function createComingSoonSlides({ number, title, topics }) {
  return [
    {
      id: `module-${number}-ready`,
      kicker: 'Computer Networks',
      title: `${title} Framework Ready`,
      subtitle: 'This module slot is wired into the platform and ready for the next interactive deck.',
      content: (
        <TwoColumn
          ratio="copy-lead"
          visual={<VisualPanel label="Future plug-in"><RevealStack step={topics.length - 1} items={topics.map((topic, index) => ({ label: `Topic ${index + 1}`, title: topic, text: 'Prepared for a progressive animation, example and exam-point slide.' }))} /></VisualPanel>}
        >
          <Lead>The subject framework is already modular: add a slide array and this module becomes a complete deck.</Lead>
          <Takeaway>Future modules can plug into the same presenter, student, fullscreen, reveal and annotation engine.</Takeaway>
        </TwoColumn>
      ),
    },
  ]
}

export const computerNetworksModule3Slides = createComingSoonSlides({
  number: '3',
  title: 'Network Layer',
  topics: ['Routing', 'IPv4/IPv6', 'Subnetting', 'ICMP', 'Congestion'],
})

export const computerNetworksModule4Slides = createComingSoonSlides({
  number: '4',
  title: 'Transport Layer',
  topics: ['UDP', 'TCP', 'Reliability', 'Flow Control', 'Congestion Control'],
})

export const computerNetworksModule5Slides = createComingSoonSlides({
  number: '5',
  title: 'Application Layer',
  topics: ['DNS', 'HTTP', 'Email', 'FTP', 'Network Security'],
})
