import { ProcessPath } from '../components/Teaching'
import { unitTitle, slide, visualSlide, compareSlide, formulaSlide, examClose } from './helpers'
import {
  SharedMediumScene, ChannelizationViz, WifiArchitecture, BluetoothPiconet,
  ConnectingDevicesViz, CellularHandoff, InternetworkJourney, NetworkJourney,
  AddressJourney,
} from './CnKit'

const list = (items) => (
  <ul className="points-list">
    {items.map((item) => <li key={item}>{item}</li>)}
  </ul>
)

export const unit7Slides = [
  {
    ...unitTitle(
      7,
      'Wireless LANs and Cellular Networks',
      'How networks keep frames moving when the medium is air and users move.',
      <WifiArchitecture />,
    ),
    id: 'cn7-title',
  },
  visualSlide({
    id: 'cn7-opening-air-medium',
    kicker: 'Opening story',
    title: 'The Cable Disappears',
    lead: 'Wireless networking keeps the LAN idea, but replaces a protected wire with a noisy, shared radio space.',
    visual: <WifiArchitecture />,
    takeaway: 'Wireless design is Ethernet thinking plus radio constraints and mobility.',
  }),
  compareSlide({
    id: 'cn7-wired-vs-wireless',
    kicker: 'Wired vs wireless',
    title: 'Why Wireless Is Harder',
    left: (
      <div>
        <h3>Wired LAN</h3>
        {list(['Guided medium', 'Predictable signal path', 'Collision detection possible in old shared Ethernet', 'Physical access is easier to control'])}
      </div>
    ),
    right: (
      <div>
        <h3>Wireless LAN</h3>
        {list(['Unguided radio medium', 'Interference and fading', 'Collision avoidance preferred', 'Mobility changes signal strength'])}
      </div>
    ),
    footer: 'The same data-link goal remains: deliver frames locally.',
  }),
  slide({
    id: 'cn7-wireless-challenges',
    kicker: 'Wireless challenges',
    title: 'Radio-Specific Problems',
    subtitle: 'Wireless stations share spectrum and cannot assume every other station is equally visible.',
    visual: <SharedMediumScene />,
    points: [
      'Signal strength drops with distance and obstacles.',
      'Interference can come from other WLANs or devices.',
      'Hidden stations may collide at the receiver.',
      'Stations move, sleep, and change transmission rates.',
    ],
    takeaway: 'Wireless MAC design protects the receiver, not only the sender.',
  }),
  slide({
    id: 'cn7-ieee-80211-position',
    kicker: 'IEEE 802.11',
    title: 'What IEEE 802.11 Standardizes',
    subtitle: '802.11 defines wireless LAN operation at the physical and data-link layers.',
    visual: <NetworkJourney stage="lan" />,
    points: [
      'Physical-layer radio techniques and channels.',
      'MAC rules for channel access and acknowledgements.',
      'Frame formats and addressing.',
      'Infrastructure and ad hoc architecture concepts.',
    ],
  }),
  visualSlide({
    id: 'cn7-80211-architecture-hero',
    kicker: '802.11 architecture',
    title: 'STA, BSS, AP, ESS, DS',
    lead: 'A WLAN is built from stations, basic service sets, access points, distribution systems, and extended service sets.',
    visual: <WifiArchitecture />,
    takeaway: 'Memorize the names by drawing the architecture.',
  }),
  slide({
    id: 'cn7-sta',
    kicker: '802.11 terms',
    title: 'Station (STA)',
    subtitle: 'A station is any device with an IEEE 802.11 wireless interface.',
    visual: <WifiArchitecture />,
    points: [
      'Examples: laptop, phone, tablet, wireless printer.',
      'A station can transmit, receive, authenticate, and associate.',
      'Mobile stations may roam between access points.',
      'Each station has a MAC address for frame delivery.',
    ],
  }),
  slide({
    id: 'cn7-bss',
    kicker: '802.11 terms',
    title: 'Basic Service Set',
    subtitle: 'A BSS is the basic building block of an IEEE 802.11 WLAN.',
    visual: <WifiArchitecture />,
    points: [
      'Infrastructure BSS contains an access point and associated stations.',
      'Independent BSS allows stations to communicate without an AP.',
      'Stations in a BSS share radio access rules.',
      'The BSS is identified by a BSSID.',
    ],
  }),
  slide({
    id: 'cn7-ap',
    kicker: '802.11 terms',
    title: 'Access Point',
    subtitle: 'The AP connects wireless stations to the distribution system.',
    visual: <WifiArchitecture />,
    points: [
      'Accepts association from stations.',
      'Bridges wireless frames toward the wired LAN or another network.',
      'Advertises network presence using management frames.',
      'Controls practical coverage area for its BSS.',
    ],
  }),
  slide({
    id: 'cn7-ess-ds',
    kicker: '802.11 terms',
    title: 'ESS and Distribution System',
    subtitle: 'Multiple BSSs can be connected to form a larger WLAN service area.',
    visual: <WifiArchitecture />,
    points: [
      'Distribution System interconnects access points.',
      'Extended Service Set appears as one larger WLAN to users.',
      'Roaming allows a mobile station to move between BSSs.',
      'The DS is often wired Ethernet, but the concept is architectural.',
    ],
  }),
  visualSlide({
    id: 'cn7-80211-association-path',
    kicker: 'Joining WLAN',
    title: 'How a Station Joins',
    lead: 'A station discovers a WLAN, authenticates, associates with an AP, and then exchanges data frames.',
    visual: <ProcessPath steps={['Scan', 'Authenticate', 'Associate', 'Send data', 'Roam if needed']} />,
    takeaway: 'Association binds a mobile station to an AP for current delivery.',
  }),
  compareSlide({
    id: 'cn7-csma-ca-vs-cd-explicit',
    kicker: 'MAC difference',
    title: 'CSMA/CA Is Not CSMA/CD',
    left: (
      <div>
        <h3>CSMA/CD</h3>
        {list(['Detects collision while transmitting', 'Needs ability to listen during send', 'Classic half-duplex Ethernet', 'Jam signal after collision'])}
      </div>
    ),
    right: (
      <div>
        <h3>CSMA/CA</h3>
        {list(['Avoids collision before sending', 'Uses random backoff before frame', 'IEEE 802.11 WLAN', 'ACK confirms receiver got frame'])}
      </div>
    ),
    footer: 'Wireless uses collision avoidance because collision detection over radio is unreliable and expensive.',
  }),
  slide({
    id: 'cn7-csma-ca-flow',
    kicker: 'CSMA/CA',
    title: 'Basic CSMA/CA Flow',
    subtitle: '802.11 stations sense the channel and defer using interframe spacing and random backoff.',
    visual: <ProcessPath steps={['Sense channel', 'Wait IFS', 'Random backoff', 'Transmit', 'Receive ACK']} />,
    points: [
      'Carrier sensing checks whether the medium seems idle.',
      'Backoff counter decreases only while the channel is idle.',
      'An ACK is expected after successful unicast reception.',
      'No ACK usually means collision or loss, so retransmission follows.',
    ],
  }),
  slide({
    id: 'cn7-hidden-station',
    kicker: 'Wireless MAC',
    title: 'Hidden Station Problem',
    subtitle: 'Two stations may not hear each other but can still collide at the access point.',
    visual: <SharedMediumScene />,
    points: [
      'A and C are outside each other’s sensing range.',
      'Both may sense idle and transmit to the same AP.',
      'Signals collide at the AP receiver.',
      'RTS/CTS can reserve the medium around the receiver.',
    ],
  }),
  slide({
    id: 'cn7-rts-cts',
    kicker: 'CSMA/CA option',
    title: 'RTS/CTS Handshake',
    subtitle: 'Request-to-Send and Clear-to-Send help reduce hidden-station collisions.',
    visual: <ProcessPath steps={['RTS', 'CTS', 'Data', 'ACK']} />,
    points: [
      'Sender asks for permission with RTS.',
      'Receiver replies with CTS if the medium can be reserved.',
      'Nearby stations defer for the announced duration.',
      'Useful for larger frames or hidden-station environments.',
    ],
  }),
  slide({
    id: 'cn7-80211-frame-types',
    kicker: '802.11 frame',
    title: 'Three Frame Categories',
    subtitle: 'IEEE 802.11 frames serve data transfer, control, and management.',
    visual: <ProcessPath steps={['Management', 'Control', 'Data']} />,
    points: [
      'Management frames handle discovery, authentication, and association.',
      'Control frames support channel access and acknowledgements.',
      'Data frames carry user payload.',
      'Frame control fields identify type, subtype, and direction.',
    ],
  }),
  slide({
    id: 'cn7-80211-addressing-basics',
    kicker: '802.11 addressing',
    title: 'Why 802.11 Can Have Four Addresses',
    subtitle: 'Wireless frames may need to name wireless stations, access points, and distribution endpoints.',
    visual: <AddressJourney />,
    points: [
      'Receiver address identifies the immediate wireless receiver.',
      'Transmitter address identifies the immediate wireless sender.',
      'Source and destination may be original end hosts across the DS.',
      'To DS and From DS bits explain which addresses are meaningful.',
    ],
    takeaway: '802.11 addressing separates wireless hop identity from original endpoint identity.',
  }),
  compareSlide({
    id: 'cn7-ethernet-vs-80211-frame',
    kicker: 'Frame comparison',
    title: 'Ethernet Frame vs 802.11 Frame',
    left: (
      <div>
        <h3>Ethernet</h3>
        {list(['Destination MAC', 'Source MAC', 'Type/length', 'Payload and CRC', 'Simple LAN hop'])}
      </div>
    ),
    right: (
      <div>
        <h3>802.11</h3>
        {list(['Frame control', 'Duration', 'Multiple address fields', 'Sequence control', 'Wireless management needs'])}
      </div>
    ),
    footer: '802.11 carries more MAC context because radio access and mobility need it.',
  }),
  slide({
    id: 'cn7-bluetooth-position',
    kicker: 'Bluetooth',
    title: 'Bluetooth in the Syllabus',
    subtitle: 'Bluetooth is a short-range wireless technology for personal area networks.',
    visual: <BluetoothPiconet />,
    points: [
      'Designed for low-power, short-distance communication.',
      'Connects phones, headsets, keyboards, sensors, and peripherals.',
      'Operates through small ad hoc groups called piconets.',
      'Classic Bluetooth uses a master-slave coordination idea in Forouzan terminology.',
    ],
  }),
  visualSlide({
    id: 'cn7-piconet-hero',
    kicker: 'Bluetooth',
    title: 'Piconet',
    lead: 'A piconet has one master and up to seven active slave devices sharing the same hopping pattern.',
    visual: <BluetoothPiconet />,
    takeaway: 'The master controls timing; slaves communicate through the piconet schedule.',
  }),
  slide({
    id: 'cn7-scatternet',
    kicker: 'Bluetooth',
    title: 'Scatternet',
    subtitle: 'A scatternet is formed when Bluetooth devices participate in more than one piconet.',
    visual: <ProcessPath steps={['Piconet A', 'Shared device', 'Piconet B', 'Scatternet']} />,
    points: [
      'A device can bridge two piconets by time-sharing participation.',
      'Each piconet has its own master and timing.',
      'Scatternets extend connectivity conceptually.',
      'The exam focus is definition and diagram, not deep implementation.',
    ],
  }),
  slide({
    id: 'cn7-bluetooth-vs-wlan',
    kicker: 'Wireless comparison',
    title: 'Bluetooth vs WLAN',
    subtitle: 'Both are wireless, but their design goals differ.',
    visual: <ProcessPath steps={['Personal area', 'Low power', 'Short range', 'Peripheral links']} />,
    points: [
      'Bluetooth targets personal devices and cable replacement.',
      'WLAN targets LAN access and higher data service area.',
      'Bluetooth uses piconet/scatternet terminology.',
      '802.11 uses BSS/ESS/AP/DS terminology.',
    ],
  }),
  visualSlide({
    id: 'cn7-connecting-devices-hero',
    kicker: 'Connecting devices',
    title: 'Devices by OSI Layer',
    lead: 'Repeaters, hubs, bridges, switches, routers, and gateways differ by how much of the frame or packet they understand.',
    visual: <ConnectingDevicesViz />,
    takeaway: 'Layer of operation is the fastest way to classify connecting devices.',
  }),
  slide({
    id: 'cn7-repeater-hub',
    kicker: 'Layer 1 devices',
    title: 'Repeater and Hub',
    subtitle: 'Layer 1 devices work with bits and signals, not addresses.',
    visual: <ConnectingDevicesViz />,
    points: [
      'Repeater regenerates a weakened signal.',
      'Hub repeats incoming bits to other ports.',
      'They do not filter frames by MAC address.',
      'A hub keeps stations in the same collision domain.',
    ],
  }),
  slide({
    id: 'cn7-bridge-switch',
    kicker: 'Layer 2 devices',
    title: 'Bridge and Switch',
    subtitle: 'Layer 2 devices use MAC addresses to make forwarding decisions.',
    visual: <ConnectingDevicesViz />,
    points: [
      'Bridge connects LAN segments and filters frames.',
      'Switch is a high-port-count, fast multiport bridge.',
      'Learning switches build MAC tables from source addresses.',
      'Switching reduces collision domains in Ethernet LANs.',
    ],
  }),
  slide({
    id: 'cn7-router-gateway',
    kicker: 'Layer 3 and above',
    title: 'Router and Gateway',
    subtitle: 'Routers move packets between networks; gateways translate between dissimilar systems.',
    visual: <InternetworkJourney />,
    points: [
      'Router operates at the network layer using logical addresses.',
      'It separates broadcast domains and selects next hops.',
      'Gateway can operate across multiple layers.',
      'Gateways may translate protocol, format, or application semantics.',
    ],
  }),
  compareSlide({
    id: 'cn7-device-hierarchy-compare',
    kicker: 'Device hierarchy',
    title: 'Connecting Devices Summary',
    left: (
      <div>
        <h3>Lower layers</h3>
        {list(['Repeater: signal regeneration', 'Hub: multiport repeater', 'Bridge: MAC filtering'])}
      </div>
    ),
    right: (
      <div>
        <h3>Higher layers</h3>
        {list(['Switch: fast bridge', 'Router: IP forwarding', 'Gateway: protocol translation'])}
      </div>
    ),
    footer: 'Layer 1 repeats, Layer 2 forwards frames, Layer 3 routes packets.',
  }),
  visualSlide({
    id: 'cn7-cellular-hero',
    kicker: 'Cellular telephony',
    title: 'Cells, Base Stations, Mobile Stations',
    lead: 'Cellular systems divide a service area into cells so frequencies can be reused and mobile users can move.',
    visual: <CellularHandoff />,
    takeaway: 'Cellular telephony is radio coverage plus mobility management.',
  }),
  slide({
    id: 'cn7-cell-concept',
    kicker: 'Cellular basics',
    title: 'Cell Concept',
    subtitle: 'A cell is a geographic coverage area served by a base station.',
    visual: <CellularHandoff />,
    points: [
      'Cells allow limited radio spectrum to be reused in different locations.',
      'Smaller cells increase capacity but require more infrastructure.',
      'Adjacent cells coordinate channel use to reduce interference.',
      'Ideal diagrams use hexagons; real coverage is irregular.',
    ],
  }),
  slide({
    id: 'cn7-bs-ms',
    kicker: 'Cellular basics',
    title: 'BS and MS',
    subtitle: 'The base station connects radio users to the cellular network; the mobile station is the user device.',
    visual: <CellularHandoff />,
    points: [
      'BS handles radio communication for a cell.',
      'MS moves while maintaining network service.',
      'Signal strength and channel quality change as the MS moves.',
      'The network tracks where the MS can be reached.',
    ],
  }),
  slide({
    id: 'cn7-handoff',
    kicker: 'Cellular mobility',
    title: 'Handoff',
    subtitle: 'Handoff transfers an active mobile connection from one base station to another.',
    visual: <CellularHandoff />,
    points: [
      'Needed when a mobile station moves toward another cell.',
      'Triggered by signal strength, quality, or network policy.',
      'Should be fast enough to avoid call drop.',
      'Classic exam answers emphasize continuity during movement.',
    ],
  }),
  slide({
    id: 'cn7-generations-classic',
    kicker: 'Cellular generations',
    title: 'Classic Cellular Generations',
    subtitle: 'Keep the syllabus view: evolution from analog voice to digital voice and packet data.',
    visual: <ProcessPath steps={['1G analog voice', '2G digital voice', 'Packet data step', '3G multimedia', '4G broadband IP']} />,
    points: [
      '1G: analog cellular voice.',
      '2G: digital voice, better capacity and security.',
      'Packet-data enhancements introduced always-on data service ideas.',
      'Later broadband generations can be named only at summary level.',
    ],
  }),
  slide({
    id: 'cn7-frequency-reuse',
    kicker: 'Cellular capacity',
    title: 'Frequency Reuse',
    subtitle: 'Cells separated by sufficient distance can use the same frequencies again.',
    visual: <ChannelizationViz mode="FDMA" />,
    points: [
      'Reuse increases total system capacity.',
      'Nearby reuse causes co-channel interference.',
      'Cell planning balances capacity and interference.',
      'Reuse is the central cellular idea behind limited spectrum.',
    ],
  }),
  formulaSlide({
    id: 'cn7-exam-memory-rule',
    kicker: 'Memory rule',
    title: 'Layer Rule for Devices',
    formula: 'Signal → Frame → Packet → Translation',
    symbols: [
      'Repeater and hub: signal/bit level.',
      'Bridge and switch: frame/MAC level.',
      'Router: packet/IP level.',
      'Gateway: translation across layers or protocols.',
    ],
    example: 'If the question says MAC table, answer switch/bridge. If it says routing table and IP network, answer router.',
    visual: <ConnectingDevicesViz />,
    takeaway: 'Classify by what the device reads.',
  }),
  slide({
    id: 'cn7-quick-check',
    kicker: 'Quick check',
    title: 'Can You Answer These?',
    subtitle: 'These questions cover the scoring core of the unit.',
    visual: <ProcessPath steps={['802.11', 'CSMA/CA', 'Bluetooth', 'Devices', 'Cellular']} />,
    points: [
      'Draw IEEE 802.11 architecture and define STA, BSS, AP, ESS, DS.',
      'Explain why WLAN uses CSMA/CA instead of CSMA/CD.',
      'Differentiate piconet and scatternet.',
      'Classify connecting devices by OSI layer.',
      'Explain cell, BS, MS, frequency reuse, and handoff.',
    ],
  }),
  ...examClose({
    id: 'cn7-exam-close',
    unitNumber: 7,
    title: 'Unit 7 Concept Map',
    mapSteps: ['Wireless challenges', '802.11 architecture', 'CSMA/CA', '802.11 frames', 'Bluetooth', 'Connecting devices', 'Cellular'],
    notes: [
      'Draw BSS, AP, ESS, and DS neatly before writing definitions.',
      'State CSMA/CA vs CSMA/CD as avoidance vs detection.',
      'Classify devices by OSI layer with one forwarding action each.',
      'Keep cellular generations classic and concise.',
    ],
    pyq: [
      'Explain IEEE 802.11 architecture with neat diagram.',
      'Compare CSMA/CA and CSMA/CD.',
      'Explain Bluetooth piconet and scatternet.',
      'Describe repeater, hub, bridge, switch, router, and gateway.',
      'Explain cellular handoff and frequency reuse.',
    ],
    important: [
      '802.11 architecture terms: STA, BSS, AP, ESS, DS.',
      'CSMA/CA operation and hidden-station idea.',
      'Bluetooth piconet/scatternet diagram.',
      'Connecting devices hierarchy with layers.',
      'Cellular cell, BS, MS, handoff, and classic generations.',
    ],
    revision: ['Air medium', 'WLAN architecture', 'Avoid collisions', 'Personal area', 'Join networks', 'Move between cells'],
  }).map((s) => ({ ...s, id: s.id.replace(`cn-${'u'}7-`, 'cn7-') })),
]

export default unit7Slides
