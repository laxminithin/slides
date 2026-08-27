import { ProcessPath } from '../components/Teaching'
import {
  unitTitle, slide, visualSlide, hookSlide, compareSlide, examClose,
} from './helpers'
import {
  NetworkJourney, DataCommunicationScene, ProtocolExchange, OsiStack,
  EncapsulationFlow, TcpIpStack, AddressJourney, DuplexViz, InternetLayers,
  TopologyViz, LayerDetail,
} from './CnKit'

const K = {
  story: 'Laptop A → Computer B',
  dc: 'Data Communications',
  net: 'Networks',
  internet: 'The Internet',
  standards: 'Protocols & Standards',
  layered: 'Layered Tasks',
  osi: 'OSI Model',
  tcpip: 'TCP/IP Protocol Suite',
  addr: 'Addressing',
}

const miniList = (heading, items) => (
  <div className="cnx-mini-list">
    <strong>{heading}</strong>
    <ul>
      {items.map((item) => <li key={item}>{item}</li>)}
    </ul>
  </div>
)

export const cnUnit1Slides = [
  {
    ...unitTitle(
      1,
      'Introduction & Network Models',
      'Follow one message as Laptop A sends information to Computer B through media, protocols, layers, and addresses.',
      <NetworkJourney stage="message" />,
    ),
    id: 'cn1-title',
    kicker: 'Computer Networks-I · 10CS55',
    title: 'Introduction & Network Models',
  },

  hookSlide({
    id: 'cn1-story-hook',
    kicker: K.story,
    title: 'One Message, Many Jobs',
    statement: 'Laptop A does not simply “send a file”; it transforms information into signals that many systems can understand.',
    support: 'Unit 1 explains the vocabulary for that journey: data communication, networks, Internet structure, protocols, layers, models, and addresses.',
    visual: <NetworkJourney stage="message" />,
  }),

  slide({
    id: 'cn1-data-communication-definition',
    kicker: K.dc,
    title: 'Data Communication: Core Definition',
    subtitle: 'Forouzan defines data communications as exchange of data between two devices through a transmission medium.',
    visual: <DataCommunicationScene />,
    points: [
      'Sender creates the message: text, numbers, image, audio, or video.',
      'Receiver must get the data accurately and in time.',
      'Medium carries signals; protocol controls the exchange.',
    ],
    takeaway: 'Communication succeeds only when delivery, accuracy, timeliness, and jitter needs are met.',
  }),

  visualSlide({
    id: 'cn1-five-components',
    kicker: K.dc,
    title: 'Five Components of Data Communication',
    lead: 'Every communication system can be described with five components.',
    visual: <DataCommunicationScene />,
    takeaway: 'Message, sender, receiver, transmission medium, and protocol form the basic Forouzan model.',
  }),

  slide({
    id: 'cn1-message-to-signal',
    kicker: K.story,
    title: 'From Information to Signals',
    subtitle: 'Laptop A begins with information, but the network carries electromagnetic signals.',
    visual: <NetworkJourney stage="signal" />,
    ratio: 'visual-copy',
    points: [
      'Data is the information agreed by users or applications.',
      'Signals are the physical representation placed on a medium.',
      'Encoding rules decide how data becomes a sendable pattern.',
    ],
    takeaway: 'A network transports representations, not human meaning directly.',
  }),

  slide({
    id: 'cn1-data-flow-direction',
    kicker: K.dc,
    title: 'Direction of Data Flow',
    subtitle: 'Forouzan classifies communication by how endpoints are allowed to transmit.',
    visual: <DuplexViz mode="full" />,
    points: [
      'Simplex: one direction only, like keyboard to computer.',
      'Half-duplex: both directions, but not at the same time.',
      'Full-duplex: both directions simultaneously.',
    ],
    takeaway: 'Direction rules shape bandwidth sharing and conversation style.',
  }),

  compareSlide({
    id: 'cn1-simplex-half-duplex',
    kicker: K.dc,
    title: 'Simplex and Half-Duplex',
    left: (
      <>
        <DuplexViz mode="simplex" />
        {miniList('Simplex', ['Only one endpoint sends', 'Simple control', 'No reverse feedback path'])}
      </>
    ),
    right: (
      <>
        <DuplexViz mode="half" />
        {miniList('Half-duplex', ['Both can send', 'Turns are required', 'Collisions must be avoided'])}
      </>
    ),
    footer: 'Laptop A may transmit alone, or Laptop A and Computer B may take turns.',
  }),

  slide({
    id: 'cn1-network-definition',
    kicker: K.net,
    title: 'What Is a Network?',
    subtitle: 'A network is a set of devices connected by communication links.',
    visual: <TopologyViz type="star" />,
    points: [
      'A node can be a computer, printer, router, switch, or server.',
      'A link may be wired or wireless.',
      'The goal is resource sharing and information exchange.',
    ],
    takeaway: 'Laptop A needs a network whenever Computer B is not directly attached.',
  }),

  slide({
    id: 'cn1-network-criteria',
    kicker: K.net,
    title: 'Network Criteria',
    subtitle: 'Forouzan evaluates networks using performance, reliability, and security.',
    visual: <ProcessPath steps={['Performance', 'Reliability', 'Security']} />,
    points: [
      'Performance: transit time, response time, throughput, and delay.',
      'Reliability: failure frequency, recovery time, and robustness.',
      'Security: protect data from unauthorized access and damage.',
    ],
    takeaway: 'A fast network is incomplete if it is unreliable or insecure.',
  }),

  slide({
    id: 'cn1-physical-structures',
    kicker: K.net,
    title: 'Physical Structures',
    subtitle: 'Before protocols, a network has physical choices: connection type and topology.',
    visual: <ProcessPath steps={['Point-to-point', 'Multipoint', 'Topology', 'Transmission mode']} />,
    points: [
      'Point-to-point gives a dedicated link between two devices.',
      'Multipoint shares one link among several devices.',
      'Topology describes how nodes and links are arranged.',
    ],
    takeaway: 'The physical design influences cost, fault tolerance, and access control.',
  }),

  compareSlide({
    id: 'cn1-mesh-vs-star',
    kicker: K.net,
    title: 'Mesh and Star Topologies',
    left: (
      <>
        <TopologyViz type="mesh" />
        {miniList('Mesh', ['Many dedicated links', 'High redundancy', 'Expensive cabling and ports'])}
      </>
    ),
    right: (
      <>
        <TopologyViz type="star" />
        {miniList('Star', ['Central hub or switch', 'Easy to add nodes', 'Center failure affects many'])}
      </>
    ),
    footer: 'Mesh favors fault tolerance; star favors manageability.',
  }),

  compareSlide({
    id: 'cn1-bus-vs-ring',
    kicker: K.net,
    title: 'Bus and Ring Topologies',
    left: (
      <>
        <TopologyViz type="bus" />
        {miniList('Bus', ['One shared backbone', 'Simple and low cost', 'Breaks and collisions are concerns'])}
      </>
    ),
    right: (
      <>
        <TopologyViz type="ring" />
        {miniList('Ring', ['Each node has two neighbors', 'Signal circulates around ring', 'A break can disrupt traffic'])}
      </>
    ),
    footer: 'Topology is an engineering tradeoff, not a memorized drawing.',
  }),

  slide({
    id: 'cn1-network-categories',
    kicker: K.net,
    title: 'Categories of Networks',
    subtitle: 'Networks are often classified by size, ownership, and geographic span.',
    visual: <ProcessPath steps={['LAN', 'MAN', 'WAN']} />,
    points: [
      'LAN covers a room, building, or campus under one organization.',
      'MAN connects a city-scale area.',
      'WAN spans regions, countries, or continents.',
    ],
    takeaway: 'The Internet is a global internetwork built from many smaller networks.',
  }),

  visualSlide({
    id: 'cn1-internet-structure',
    kicker: K.internet,
    title: 'The Internet as an Internetwork',
    lead: 'The Internet is a network of networks connected through common protocols.',
    visual: <InternetLayers />,
    takeaway: 'Laptop A reaches Computer B by moving through access networks, ISPs, backbones, and destination networks.',
  }),

  slide({
    id: 'cn1-internet-path',
    kicker: K.internet,
    title: 'How the Internet Carries the Message',
    subtitle: 'A path across the Internet is a chain of local and wide-area decisions.',
    visual: <NetworkJourney stage="router" />,
    points: [
      'End systems generate and consume data.',
      'Routers forward packets between networks.',
      'ISPs provide access and transit across large regions.',
    ],
    takeaway: 'The Internet hides heterogeneity behind a common packet delivery service.',
  }),

  slide({
    id: 'cn1-protocol-definition',
    kicker: K.standards,
    title: 'Protocols: The Rules of Exchange',
    subtitle: 'A protocol defines what is communicated, how it is communicated, and when it is communicated.',
    visual: <ProtocolExchange />,
    points: [
      'Syntax defines message format, order, and signal levels.',
      'Semantics defines meaning and required action.',
      'Timing defines speed matching and event order.',
    ],
    takeaway: 'Without protocols, Laptop A and Computer B may transmit but still fail to communicate.',
  }),

  visualSlide({
    id: 'cn1-protocol-exchange',
    kicker: K.standards,
    title: 'Syntax, Semantics, and Timing',
    lead: 'Protocol agreement turns raw exchange into coordinated behavior.',
    visual: <ProtocolExchange />,
    takeaway: 'A valid conversation needs correct format, correct meaning, and correct timing.',
  }),

  slide({
    id: 'cn1-standards',
    kicker: K.standards,
    title: 'Why Standards Matter',
    subtitle: 'Standards make products from different vendors interoperate.',
    visual: <ProcessPath steps={['De facto', 'De jure', 'Interoperability']} />,
    points: [
      'De facto standards exist through widespread use.',
      'De jure standards are approved by recognized bodies.',
      'ISO, ITU-T, ANSI, IEEE, EIA, and IETF are common names.',
    ],
    takeaway: 'Computer B does not need the same manufacturer as Laptop A; it needs shared standards.',
  }),

  slide({
    id: 'cn1-layered-tasks',
    kicker: K.layered,
    title: 'Why Layered Tasks Help',
    subtitle: 'A complex network job is split into ordered, cooperating subtasks.',
    visual: <ProcessPath steps={['Application need', 'Reliable delivery', 'Route', 'Local link', 'Signal']} />,
    points: [
      'Each layer performs a focused service.',
      'Peer layers communicate using agreed protocols.',
      'Interfaces let one layer use the services below it.',
    ],
    takeaway: 'Layering makes the message journey teachable, testable, and replaceable in parts.',
  }),

  compareSlide({
    id: 'cn1-services-interfaces-protocols',
    kicker: K.layered,
    title: 'Services, Interfaces, and Protocols',
    left: miniList('Vertical relationship', [
      'Layer uses service below',
      'Layer offers service above',
      'Interface defines access points',
    ]),
    right: miniList('Horizontal relationship', [
      'Peer layers follow a protocol',
      'Headers carry control information',
      'Entities appear to talk directly',
    ]),
    footer: <ProcessPath steps={['Layer N+1', 'Service interface', 'Layer N', 'Peer protocol']} />,
  }),

  visualSlide({
    id: 'cn1-osi-hero',
    kicker: K.osi,
    title: 'OSI Model: Seven-Layer Reference Model',
    lead: 'The OSI model gives a disciplined vocabulary for every job in Laptop A’s message journey.',
    visual: <OsiStack highlightAll />,
    contentDensity: 'sparse',
    takeaway: 'Read OSI top-down for user intent; read it bottom-up for physical delivery.',
  }),

  slide({
    id: 'cn1-osi-application-layer',
    kicker: K.osi,
    title: 'Layer 7: Application',
    subtitle: 'The application layer provides network services directly to user processes.',
    visual: <LayerDetail layer={7} />,
    ratio: 'visual-copy',
    points: [
      'Supports services such as email, file transfer, and remote login.',
      'Creates the user-level data Laptop A wants to send.',
      'Does not mean the application program itself.',
    ],
    takeaway: 'Layer 7 is where communication becomes visible to users.',
  }),

  slide({
    id: 'cn1-osi-presentation-layer',
    kicker: K.osi,
    title: 'Layer 6: Presentation',
    subtitle: 'The presentation layer handles syntax and representation of information.',
    visual: <LayerDetail layer={6} />,
    ratio: 'visual-copy',
    points: [
      'Translates formats so systems interpret data consistently.',
      'Can compress data to reduce bits sent.',
      'Can encrypt data for privacy before transmission.',
    ],
    takeaway: 'Layer 6 answers: “Can Computer B read what Laptop A meant?”',
  }),

  slide({
    id: 'cn1-osi-session-layer',
    kicker: K.osi,
    title: 'Layer 5: Session',
    subtitle: 'The session layer establishes, manages, and synchronizes dialogs.',
    visual: <LayerDetail layer={5} />,
    ratio: 'visual-copy',
    points: [
      'Controls dialog mode between communicating systems.',
      'Adds synchronization points for recovery.',
      'Keeps long exchanges organized as a session.',
    ],
    takeaway: 'Layer 5 is about managing the conversation, not carrying every bit.',
  }),

  slide({
    id: 'cn1-osi-transport-layer',
    kicker: K.osi,
    title: 'Layer 4: Transport',
    subtitle: 'The transport layer provides process-to-process delivery.',
    visual: <LayerDetail layer={4} />,
    ratio: 'visual-copy',
    points: [
      'Segments data and reassembles it at Computer B.',
      'Can provide reliability, flow control, and error control.',
      'Uses port addresses to reach the correct process.',
    ],
    takeaway: 'Layer 4 makes the endpoint process, not just the host, the delivery target.',
  }),

  slide({
    id: 'cn1-osi-network-layer',
    kicker: K.osi,
    title: 'Layer 3: Network',
    subtitle: 'The network layer provides source-to-destination delivery across multiple networks.',
    visual: <LayerDetail layer={3} />,
    ratio: 'visual-copy',
    points: [
      'Adds logical addressing for end-to-end identification.',
      'Routers use routing to select paths.',
      'Packets may cross many links before Computer B.',
    ],
    takeaway: 'Layer 3 is the internetworking layer of the journey.',
  }),

  slide({
    id: 'cn1-osi-data-link-layer',
    kicker: K.osi,
    title: 'Layer 2: Data Link',
    subtitle: 'The data link layer provides node-to-node delivery over one link.',
    visual: <LayerDetail layer={2} />,
    ratio: 'visual-copy',
    points: [
      'Frames packets for the next hop.',
      'Uses physical addressing on the local link.',
      'Handles access control and error detection on the link.',
    ],
    takeaway: 'Layer 2 changes at each hop even when the Layer 3 packet continues onward.',
  }),

  slide({
    id: 'cn1-osi-physical-layer',
    kicker: K.osi,
    title: 'Layer 1: Physical',
    subtitle: 'The physical layer transmits individual bits over the medium.',
    visual: <LayerDetail layer={1} />,
    ratio: 'visual-copy',
    points: [
      'Defines electrical, optical, or radio characteristics.',
      'Covers connectors, data rate, synchronization, and topology.',
      'Turns frames into signals and signals back into bits.',
    ],
    takeaway: 'Layer 1 is where the abstract message becomes measurable energy.',
  }),

  visualSlide({
    id: 'cn1-encapsulation-down',
    kicker: K.layered,
    title: 'Encapsulation: Sending Down the Stack',
    lead: 'At Laptop A, each lower layer adds control information.',
    visual: <EncapsulationFlow direction="down" />,
    contentDensity: 'sparse',
    takeaway: 'Data becomes segment → packet → frame → bits.',
  }),

  visualSlide({
    id: 'cn1-encapsulation-up',
    kicker: K.layered,
    title: 'Decapsulation: Receiving Up the Stack',
    lead: 'At Computer B, each layer removes the control information meant for it.',
    visual: <EncapsulationFlow direction="up" />,
    contentDensity: 'sparse',
    takeaway: 'The receiver reverses encapsulation to recover application data.',
  }),

  slide({
    id: 'cn1-tcpip-suite',
    kicker: K.tcpip,
    title: 'TCP/IP Protocol Suite',
    subtitle: 'TCP/IP is the practical protocol suite used by the Internet.',
    visual: <TcpIpStack />,
    ratio: 'visual-copy',
    points: [
      'Application combines user-oriented services and some OSI upper-layer functions.',
      'Transport provides TCP or UDP process delivery.',
      'Internet uses IP for logical addressing and routing.',
    ],
    takeaway: 'TCP/IP is the working model behind Laptop A’s Internet communication.',
  }),

  compareSlide({
    id: 'cn1-osi-vs-tcpip',
    kicker: K.tcpip,
    title: 'OSI Model Compared with TCP/IP',
    left: (
      <>
        <OsiStack highlightAll />
        {miniList('OSI', ['Seven-layer reference model', 'Clear separation of services', 'Excellent for learning and diagnosis'])}
      </>
    ),
    right: (
      <>
        <TcpIpStack />
        {miniList('TCP/IP', ['Internet protocol suite', 'Application, Transport, Internet, Network Access', 'Used in real deployments'])}
      </>
    ),
    footer: 'OSI explains the roles; TCP/IP names the protocols most often used on the Internet.',
  }),

  visualSlide({
    id: 'cn1-addressing-overview',
    kicker: K.addr,
    title: 'Addressing Guides the Message',
    lead: 'Different layers need different identifiers to deliver the same message correctly.',
    visual: <AddressJourney />,
    takeaway: 'Physical, logical, and port addresses solve different delivery questions.',
  }),

  slide({
    id: 'cn1-address-types',
    kicker: K.addr,
    title: 'Physical, Logical, and Port Addressing',
    subtitle: 'Forouzan maps addressing to the scope of delivery.',
    visual: <AddressJourney />,
    ratio: 'visual-copy',
    points: [
      'Physical address identifies the next node on a local link.',
      'Logical address identifies source and destination hosts across networks.',
      'Port address identifies the sending and receiving processes.',
    ],
    takeaway: 'Laptop A needs all three when a browser talks to a service on Computer B.',
  }),

  slide({
    id: 'cn1-end-to-end-recap',
    kicker: K.story,
    title: 'Laptop A to Computer B: Complete Unit Story',
    subtitle: 'The Unit 1 syllabus becomes one continuous communication path.',
    visual: <NetworkJourney stage="dest" />,
    points: [
      'Data communication defines the basic exchange components.',
      'Networks and the Internet provide structure and reach.',
      'Protocols, layers, models, and addresses coordinate delivery.',
    ],
    takeaway: 'If you can narrate this journey, the definitions become connected instead of isolated.',
  }),

  ...examClose({
    id: 'cn1-concept-map',
    unitNumber: 1,
    mapSteps: [
      'Data Communications',
      'Networks',
      'The Internet',
      'Protocols & Standards',
      'Layered Tasks',
      'OSI Model',
      'TCP/IP Suite',
      'Addressing',
    ],
    notes: [
      'Write Forouzan definitions for data communication, protocol, network, and Internet.',
      'Draw data communication components and label the five parts.',
      'Practice OSI layers with PDU, address type, and main responsibility.',
      'Explain Laptop A to Computer B as one connected story.',
    ],
    pyq: [
      'Explain the five components of data communication with a diagram.',
      'Compare mesh, star, bus, and ring topologies with advantages and limitations.',
      'Explain the OSI reference model and functions of each layer.',
      'Compare OSI and TCP/IP models; explain addressing types.',
    ],
    important: [
      'Data communication effectiveness: delivery, accuracy, timeliness, jitter.',
      'Protocol elements: syntax, semantics, and timing.',
      'OSI seven layers, PDUs, and encapsulation/decapsulation.',
      'TCP/IP layers and physical, logical, and port addressing.',
    ],
    revision: [
      'Sender',
      'Data',
      'Protocol',
      'Layering',
      'Encapsulation',
      'Internet',
      'Addressing',
      'Receiver',
    ],
  }).map((closingSlide) => ({
    ...closingSlide,
    id: closingSlide.id.replace(/^cn-u1-/, 'cn1-'),
  })),
]
