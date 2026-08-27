import { ProcessPath } from '../components/Teaching'
import { unitTitle, slide, visualSlide, compareSlide, formulaSlide, examClose } from './helpers'
import {
  SharedMediumScene, AlohaCollision, CsmaScene, CsmaCdCollision, ControlledAccessViz,
  ChannelizationViz, EthernetFrame, EthernetEvolution, WifiArchitecture, NetworkJourney,
  AddressJourney,
} from './CnKit'

const list = (items) => (
  <ul className="points-list">
    {items.map((item) => <li key={item}>{item}</li>)}
  </ul>
)

export const unit6Slides = [
  {
    ...unitTitle(
      6,
      'Multiple Access and Ethernet',
      'How many stations share one medium without turning every frame into noise.',
      <SharedMediumScene />,
    ),
    id: 'cn6-title',
  },
  visualSlide({
    id: 'cn6-shared-medium-story',
    kicker: 'Opening story',
    title: 'One Cable, Many Talkers',
    lead: 'A shared link behaves like a classroom: if everyone speaks together, nobody receives a clean message.',
    visual: <SharedMediumScene />,
    contentDensity: 'sparse',
    takeaway: 'Multiple access protocols answer one question: who may transmit now?',
  }),
  slide({
    id: 'cn6-why-mac-needed',
    kicker: 'Medium access control',
    title: 'Why MAC Exists',
    subtitle: 'The data-link layer must coordinate access before frames enter a broadcast medium.',
    visual: <NetworkJourney stage="frame" />,
    points: [
      'Shared media allow every attached station to hear the signal.',
      'Two overlapping transmissions create a collision or unusable interference.',
      'MAC rules reduce collisions, recover from them, or prevent them.',
      'The goal is high utilization with fair access and bounded delay.',
    ],
    takeaway: 'MAC is local traffic discipline for frames.',
  }),
  slide({
    id: 'cn6-multiple-access-map',
    kicker: 'Classification',
    title: 'Three Families of Multiple Access',
    subtitle: 'Forouzan groups multiple access by how permission is obtained.',
    visual: <ProcessPath steps={['Random Access', 'Controlled Access', 'Channelization']} />,
    points: [
      'Random access: stations compete and recover from collisions.',
      'Controlled access: permission is scheduled or passed.',
      'Channelization: medium capacity is divided by frequency, time, or code.',
      'Ethernet historically used random access; switched Ethernet changes the collision story.',
    ],
  }),
  compareSlide({
    id: 'cn6-random-vs-controlled',
    kicker: 'Big contrast',
    title: 'Competition vs Permission',
    left: (
      <div>
        <h3>Random access</h3>
        {list(['No central scheduler', 'Collisions are possible', 'Simple and distributed', 'Delay varies under load'])}
      </div>
    ),
    right: (
      <div>
        <h3>Controlled access</h3>
        {list(['Explicit turn or reservation', 'Collisions avoided', 'More coordination overhead', 'Predictable under heavy load'])}
      </div>
    ),
    footer: 'Choose the method by traffic pattern, cost, and required predictability.',
  }),
  visualSlide({
    id: 'cn6-random-access-intro',
    kicker: 'Random access',
    title: 'Random Access: Try, Detect, Recover',
    lead: 'A station transmits according to local rules. If a collision happens, it waits a random time and tries again.',
    visual: <ProcessPath steps={['Frame ready', 'Follow access rule', 'Transmit', 'Collision?', 'Backoff', 'Retry']} />,
    takeaway: 'Randomness prevents repeated collisions by the same pair of stations.',
  }),
  slide({
    id: 'cn6-pure-aloha-idea',
    kicker: 'ALOHA',
    title: 'Pure ALOHA',
    subtitle: 'The simplest random access method: transmit whenever a frame is ready.',
    visual: <AlohaCollision />,
    points: [
      'No carrier sensing and no global clock.',
      'A collision destroys all overlapping frames.',
      'Sender waits for acknowledgement; if absent, it retransmits after random backoff.',
      'The vulnerable time is two frame times.',
    ],
    takeaway: 'Pure ALOHA is easy to understand but wastes capacity quickly.',
  }),
  formulaSlide({
    id: 'cn6-pure-aloha-throughput',
    kicker: 'Throughput concept',
    title: 'Pure ALOHA Throughput',
    formula: 'S = G e^{-2G}',
    symbols: [
      'S: successful frames per frame time.',
      'G: offered load, including new and retransmitted frames.',
      'Maximum S occurs at G = 0.5.',
      'Maximum utilization is about 18.4%.',
    ],
    example: 'At G = 0.5, S = 0.5e^-1 = 0.184. Only about one frame in five frame-times is useful.',
    visual: <AlohaCollision />,
    takeaway: 'The factor 2G comes from the two-frame vulnerable period.',
  }),
  slide({
    id: 'cn6-slotted-aloha-idea',
    kicker: 'Slotted ALOHA',
    title: 'Slotted ALOHA',
    subtitle: 'Time is divided into equal frame slots; stations may start only at slot boundaries.',
    visual: <ProcessPath steps={['Slot begins', 'Ready station sends', 'One sender succeeds', 'Many senders collide']} />,
    points: [
      'Requires synchronization among stations.',
      'Collisions can occur only within one slot.',
      'Vulnerable time is reduced from 2T to T.',
      'Better throughput is obtained at the cost of time coordination.',
    ],
  }),
  formulaSlide({
    id: 'cn6-slotted-aloha-throughput',
    kicker: 'Throughput concept',
    title: 'Slotted ALOHA Throughput',
    formula: 'S = G e^{-G}',
    symbols: [
      'One slot is vulnerable instead of two frame times.',
      'Maximum occurs at G = 1.',
      'Maximum utilization is about 36.8%.',
      'Idle slots and collision slots still waste capacity.',
    ],
    example: 'At G = 1, S = e^-1 = 0.368. Synchronization doubles the maximum useful throughput over pure ALOHA.',
    visual: <ProcessPath steps={['Slot 1', 'Slot 2', 'Collision', 'Slot 4', 'Success']} />,
    takeaway: 'Slotted ALOHA improves discipline without sensing the carrier.',
  }),
  compareSlide({
    id: 'cn6-aloha-comparison',
    kicker: 'ALOHA comparison',
    title: 'Pure vs Slotted ALOHA',
    left: (
      <div>
        <h3>Pure ALOHA</h3>
        {list(['Send anytime', 'Vulnerable time = 2T', 'No slot clock', 'Max throughput 18.4%'])}
      </div>
    ),
    right: (
      <div>
        <h3>Slotted ALOHA</h3>
        {list(['Send at slot start', 'Vulnerable time = T', 'Needs synchronization', 'Max throughput 36.8%'])}
      </div>
    ),
    footer: 'The exam idea: fewer possible overlap positions means higher successful throughput.',
  }),
  slide({
    id: 'cn6-csma-main-idea',
    kicker: 'CSMA',
    title: 'Carrier Sense Multiple Access',
    subtitle: 'Listen before talking: a station senses the medium before transmitting.',
    visual: <CsmaScene />,
    ratio: 'visual-copy',
    points: [
      'If the medium is idle, the station may transmit.',
      'If the medium is busy, the station waits according to a persistence rule.',
      'Collisions still happen because propagation delay hides remote transmissions.',
      'CSMA performs better than ALOHA because it avoids obvious busy periods.',
    ],
    takeaway: 'Carrier sensing reduces avoidable collisions; it cannot eliminate hidden timing races.',
  }),
  slide({
    id: 'cn6-csma-propagation-delay',
    kicker: 'CSMA limitation',
    title: 'Propagation Delay Still Matters',
    subtitle: 'A station senses only what has reached it, not what is already travelling elsewhere on the cable.',
    visual: <SharedMediumScene />,
    ratio: 'visual-copy',
    points: [
      'Station A may start transmitting at one end of the cable.',
      'Before A’s signal reaches B, B may sense idle and transmit.',
      'The two signals meet and collide.',
      'Longer propagation delay increases collision risk.',
    ],
  }),
  slide({
    id: 'cn6-one-persistent-csma',
    kicker: 'Persistence',
    title: '1-Persistent CSMA',
    subtitle: 'If the medium is idle, transmit immediately with probability 1.',
    visual: <CsmaScene />,
    ratio: 'visual-copy',
    points: [
      'Efficient when only one station is waiting.',
      'High collision chance when many stations wait for the same busy medium to become idle.',
      'Used as the base idea for classic CSMA/CD Ethernet.',
      'Aggressive access improves utilization at light load.',
    ],
  }),
  slide({
    id: 'cn6-nonpersistent-csma',
    kicker: 'Persistence',
    title: 'Nonpersistent CSMA',
    subtitle: 'If the medium is busy, wait a random time before sensing again.',
    visual: <ProcessPath steps={['Sense', 'Busy', 'Random wait', 'Sense again', 'Transmit if idle']} />,
    points: [
      'Reduces collisions after a busy period ends.',
      'May leave the channel idle while stations are waiting.',
      'Trades utilization for lower collision probability.',
      'Useful for explaining why backoff improves stability.',
    ],
  }),
  slide({
    id: 'cn6-p-persistent-csma',
    kicker: 'Persistence',
    title: 'p-Persistent CSMA',
    subtitle: 'In slotted time, a ready station transmits with probability p when the channel is idle.',
    visual: <ProcessPath steps={['Idle slot', 'Transmit with p', 'Defer with 1-p', 'Next slot']} />,
    points: [
      'Combines sensing, slotting, and probability.',
      'A smaller p reduces collisions under heavier load.',
      'A larger p reduces waiting when load is light.',
      'The value of p tunes fairness and utilization.',
    ],
  }),
  visualSlide({
    id: 'cn6-csma-cd-hero',
    kicker: 'CSMA/CD HERO',
    title: 'Carrier Sense Multiple Access with Collision Detection',
    lead: 'Classic shared Ethernet listens, transmits, detects a collision while sending, jams, backs off, and retries.',
    visual: <CsmaCdCollision />,
    contentDensity: 'sparse',
    takeaway: 'CSMA/CD is the signature access method of traditional half-duplex Ethernet.',
  }),
  slide({
    id: 'cn6-csma-cd-steps',
    kicker: 'CSMA/CD',
    title: 'CSMA/CD Algorithm',
    subtitle: 'The station reacts while the frame is still being transmitted.',
    visual: <ProcessPath steps={['Sense idle', 'Transmit', 'Detect collision', 'Send jam', 'Stop', 'Backoff', 'Retry']} />,
    ratio: 'visual-copy',
    points: [
      'Collision detection requires a sender to monitor the medium during transmission.',
      'A jam signal ensures all stations notice the collision.',
      'Binary exponential backoff spreads repeated retries.',
      'After too many attempts, the frame is reported as failed.',
    ],
  }),
  slide({
    id: 'cn6-minimum-frame-size',
    kicker: 'Ethernet timing',
    title: 'Minimum Frame Size',
    subtitle: 'The frame must last long enough for a collision from the far end to return.',
    visual: <CsmaCdCollision />,
    ratio: 'visual-copy',
    points: [
      'Collision detection depends on round-trip propagation time.',
      'If a frame is too short, the sender may finish before learning of a collision.',
      'Classic Ethernet fixes a minimum frame size of 64 bytes.',
      'This timing rule is tied to cable length and data rate.',
    ],
    takeaway: 'Minimum size is not arbitrary; it protects collision detection.',
  }),
  slide({
    id: 'cn6-binary-exponential-backoff',
    kicker: 'CSMA/CD recovery',
    title: 'Binary Exponential Backoff',
    subtitle: 'After repeated collisions, stations choose from a larger random waiting range.',
    visual: <ProcessPath steps={['1st collision', 'Small range', 'More collisions', 'Larger range', 'Retry spread']} />,
    ratio: 'visual-copy',
    points: [
      'The contention window grows after each collision.',
      'Growth reduces repeated collision between the same stations.',
      'Random waiting is measured in slot times.',
      'Backoff stabilizes Ethernet under temporary bursts.',
    ],
  }),
  compareSlide({
    id: 'cn6-csma-ca-vs-cd',
    kicker: 'Wireless contrast',
    title: 'CSMA/CD vs CSMA/CA',
    left: (
      <div>
        <h3>CSMA/CD</h3>
        {list(['Detect collision while sending', 'Works on shared wired Ethernet', 'Jam after collision', 'Half-duplex heritage'])}
      </div>
    ),
    right: (
      <div>
        <h3>CSMA/CA</h3>
        {list(['Avoid collision before sending', 'Used by IEEE 802.11 WLAN', 'Backoff before transmit', 'ACK confirms success'])}
      </div>
    ),
    footer: 'Wireless stations usually cannot transmit and listen for collisions at the same time.',
  }),
  slide({
    id: 'cn6-csma-ca-basics',
    kicker: 'CSMA/CA',
    title: 'Collision Avoidance Basics',
    subtitle: 'CSMA/CA avoids likely collisions instead of detecting them after damage.',
    visual: <WifiArchitecture />,
    points: [
      'Sense the channel before transmission.',
      'Wait an interframe space and random backoff.',
      'Use positive acknowledgements because collision detection is impractical.',
      'Optional RTS/CTS reduces hidden-station collisions.',
    ],
  }),
  visualSlide({
    id: 'cn6-controlled-access-intro',
    kicker: 'Controlled access',
    title: 'Controlled Access: Transmit by Permission',
    lead: 'Instead of allowing collisions, the network gives each station a controlled opportunity to send.',
    visual: <ControlledAccessViz mode="token" />,
    takeaway: 'Controlled access adds order when random contention becomes expensive.',
  }),
  slide({
    id: 'cn6-reservation',
    kicker: 'Controlled access',
    title: 'Reservation',
    subtitle: 'Stations reserve future slots before sending data frames.',
    visual: <ControlledAccessViz mode="reservation" />,
    points: [
      'A reservation interval announces which stations need service.',
      'Only reserved stations transmit in the data interval.',
      'Collisions are limited to the reservation process or avoided by design.',
      'Effective when traffic is bursty but stations can coordinate.',
    ],
  }),
  slide({
    id: 'cn6-polling',
    kicker: 'Controlled access',
    title: 'Polling',
    subtitle: 'A primary station asks secondary stations one by one whether they have data.',
    visual: <ControlledAccessViz mode="polling" />,
    points: [
      'The primary controls access to the medium.',
      'Secondaries transmit only when polled.',
      'No data collisions occur among secondaries.',
      'Primary failure or polling overhead can limit performance.',
    ],
  }),
  slide({
    id: 'cn6-token-passing',
    kicker: 'Controlled access',
    title: 'Token Passing',
    subtitle: 'A small control frame called a token circulates; only the token holder may transmit.',
    visual: <ControlledAccessViz mode="token" />,
    points: [
      'Each station gets a bounded turn.',
      'A station releases the token after sending or when its turn expires.',
      'Lost or duplicate tokens require management.',
      'Token systems offer fairness without collisions.',
    ],
  }),
  compareSlide({
    id: 'cn6-controlled-methods-compare',
    kicker: 'Controlled access',
    title: 'Reservation, Polling, Token',
    left: (
      <div>
        <h3>Central coordination</h3>
        {list(['Reservation uses planned slots', 'Polling uses a primary station', 'Good when order matters'])}
      </div>
    ),
    right: (
      <div>
        <h3>Distributed turn</h3>
        {list(['Token circulates among stations', 'No permanent primary needed', 'Fair but token must be protected'])}
      </div>
    ),
    footer: 'All three reduce collision cost by adding control overhead.',
  }),
  visualSlide({
    id: 'cn6-channelization-intro',
    kicker: 'Channelization',
    title: 'Channelization: Divide the Medium',
    lead: 'Instead of fighting for the same resource, users are separated by frequency, time, or code.',
    visual: <ChannelizationViz mode="FDMA" />,
    takeaway: 'Channelization converts one shared medium into many logical channels.',
  }),
  slide({
    id: 'cn6-fdma',
    kicker: 'Channelization',
    title: 'FDMA',
    subtitle: 'Frequency Division Multiple Access assigns a different frequency band to each user.',
    visual: <ChannelizationViz mode="FDMA" />,
    points: [
      'Users transmit at the same time in separate frequency bands.',
      'Guard bands reduce overlap between adjacent channels.',
      'Bandwidth is reserved even when a user is idle.',
      'Common intuition: radio channels separated by frequency.',
    ],
  }),
  slide({
    id: 'cn6-tdma',
    kicker: 'Channelization',
    title: 'TDMA',
    subtitle: 'Time Division Multiple Access assigns repeating time slots to users.',
    visual: <ChannelizationViz mode="TDMA" />,
    points: [
      'Users share the same frequency but transmit at different times.',
      'Requires synchronization.',
      'Unused slots waste capacity unless dynamically assigned.',
      'Good for predictable, periodic traffic patterns.',
    ],
  }),
  slide({
    id: 'cn6-cdma',
    kicker: 'Channelization',
    title: 'CDMA',
    subtitle: 'Code Division Multiple Access lets users share time and frequency using distinct codes.',
    visual: <ChannelizationViz mode="CDMA" />,
    points: [
      'Each sender multiplies data by a unique chip sequence.',
      'Receivers recover one sender by correlating with its code.',
      'Orthogonal or near-orthogonal codes separate users.',
      'Capacity is interference-limited rather than slot-limited.',
    ],
  }),
  compareSlide({
    id: 'cn6-channelization-compare',
    kicker: 'Channelization',
    title: 'FDMA vs TDMA vs CDMA',
    left: (
      <div>
        <h3>Separation resource</h3>
        {list(['FDMA: frequency bands', 'TDMA: time slots', 'CDMA: codes'])}
      </div>
    ),
    right: (
      <div>
        <h3>Key cost</h3>
        {list(['FDMA needs guard bands', 'TDMA needs clock sync', 'CDMA needs code control and power management'])}
      </div>
    ),
    footer: 'All three are multiple access methods, not data representation methods.',
  }),
  visualSlide({
    id: 'cn6-ethernet-intro',
    kicker: 'IEEE 802.3',
    title: 'Ethernet: The Dominant Wired LAN',
    lead: 'Ethernet standardizes frame format, addressing, access behavior, and physical variants for local networks.',
    visual: <EthernetFrame />,
    contentDensity: 'sparse',
    takeaway: 'IEEE 802.3 is data-link framing plus physical LAN engineering.',
  }),
  slide({
    id: 'cn6-standard-ethernet-characteristics',
    kicker: 'Standard Ethernet',
    title: 'Standard Ethernet Characteristics',
    subtitle: 'Classic Ethernet began as a shared, bus-like LAN with baseband signalling.',
    visual: <EthernetEvolution />,
    ratio: 'visual-copy',
    points: [
      'Original standard Ethernet operated at 10 Mbps.',
      'It used Manchester encoding in classic physical implementations.',
      'Access method was 1-persistent CSMA/CD.',
      'Frames are broadcast on the shared segment and filtered by address.',
    ],
  }),
  slide({
    id: 'cn6-ethernet-addressing',
    kicker: 'Ethernet addressing',
    title: 'MAC Addressing',
    subtitle: 'Ethernet uses 48-bit physical addresses for local frame delivery.',
    visual: <AddressJourney />,
    ratio: 'visual-copy',
    points: [
      'Destination address identifies the intended receiver on the local link.',
      'Source address identifies the sender interface.',
      'Broadcast address reaches all stations on the LAN.',
      'MAC addresses are flat hardware-style identifiers, not route summaries.',
    ],
  }),
  slide({
    id: 'cn6-ethernet-frame-overview',
    kicker: 'Ethernet frame',
    title: 'Standard Ethernet Frame',
    subtitle: 'Every field helps receivers synchronize, identify endpoints, carry payload, or detect errors.',
    visual: <EthernetFrame />,
    ratio: 'visual-copy',
    points: [
      'Preamble and SFD prepare the receiver and mark frame start.',
      'Destination and source addresses are 6 bytes each.',
      'Type/length identifies the payload interpretation or size.',
      'CRC provides error detection over the transmitted frame.',
    ],
  }),
  slide({
    id: 'cn6-preamble-sfd',
    kicker: 'Ethernet frame fields',
    title: 'Preamble and SFD',
    subtitle: 'The receiver must lock onto the bit pattern before interpreting addresses.',
    visual: <EthernetFrame />,
    ratio: 'visual-copy',
    points: [
      'Preamble is a repeated 10101010 pattern for synchronization.',
      'Start Frame Delimiter marks the exact beginning of frame fields.',
      'These bits help the physical layer and receiver timing.',
      'They are not part of the payload delivered upward.',
    ],
  }),
  slide({
    id: 'cn6-ethernet-data-crc',
    kicker: 'Ethernet frame fields',
    title: 'Data and CRC',
    subtitle: 'Ethernet carries a higher-layer packet and protects the frame with a check sequence.',
    visual: <EthernetFrame />,
    ratio: 'visual-copy',
    points: [
      'Payload carries network-layer data, commonly an IP packet.',
      'Minimum payload padding may be added to satisfy frame size.',
      'Frame Check Sequence uses CRC-32 for error detection.',
      'Bad CRC frames are discarded, not repaired by Ethernet.',
    ],
  }),
  slide({
    id: 'cn6-ethernet-access-method',
    kicker: 'Ethernet access',
    title: 'Access Method in Standard Ethernet',
    subtitle: 'Classic shared Ethernet combines carrier sensing with collision detection.',
    visual: <CsmaCdCollision />,
    ratio: 'visual-copy',
    points: [
      'Use 1-persistent CSMA before transmitting.',
      'Detect collision during transmission.',
      'Send jam signal and stop.',
      'Retry after binary exponential backoff.',
    ],
  }),
  slide({
    id: 'cn6-ethernet-changes-standard',
    kicker: 'Changes in Ethernet',
    title: 'Changes in the Standard',
    subtitle: 'Ethernet evolved while preserving the frame format and MAC addressing model.',
    visual: <EthernetEvolution />,
    points: [
      'Data rate increased from 10 Mbps to 100 Mbps and 1 Gbps.',
      'Media shifted from coaxial bus toward twisted pair and fiber.',
      'Hubs gave way to switches and full-duplex links.',
      'CSMA/CD became unnecessary on full-duplex switched Ethernet.',
    ],
    takeaway: 'The frame stayed familiar while the physical and access environment changed.',
  }),
  compareSlide({
    id: 'cn6-hub-vs-switch-ethernet',
    kicker: 'Ethernet evolution',
    title: 'Hub Ethernet vs Switched Ethernet',
    left: (
      <div>
        <h3>Hub / shared segment</h3>
        {list(['One collision domain', 'Half-duplex common', 'CSMA/CD needed', 'All stations hear frames'])}
      </div>
    ),
    right: (
      <div>
        <h3>Switch / dedicated links</h3>
        {list(['Separate collision domains', 'Full-duplex common', 'No collision on link', 'Frames forwarded selectively'])}
      </div>
    ),
    footer: 'This is why modern Ethernet often teaches CSMA/CD historically.',
  }),
  slide({
    id: 'cn6-fast-ethernet',
    kicker: 'Fast Ethernet',
    title: '10 Mbps to 100 Mbps',
    subtitle: 'Fast Ethernet keeps the MAC frame format but raises the data rate tenfold.',
    visual: <EthernetEvolution />,
    points: [
      'Standardized as 100 Mbps Ethernet.',
      'Designed for compatibility with existing Ethernet services.',
      'Common implementations use twisted pair or fiber.',
      'Autonegotiation helps devices agree on speed and duplex.',
    ],
  }),
  slide({
    id: 'cn6-gigabit-ethernet',
    kicker: 'Gigabit Ethernet',
    title: '100 Mbps to 1000 Mbps',
    subtitle: 'Gigabit Ethernet extends the Ethernet family to 1 Gbps links.',
    visual: <EthernetEvolution />,
    points: [
      'Preserves the Ethernet frame and 48-bit addressing.',
      'Commonly deployed as switched full-duplex Ethernet.',
      'Supports copper and fiber physical variants.',
      'Collision handling is mostly irrelevant in full-duplex operation.',
    ],
  }),
  slide({
    id: 'cn6-ethernet-exam-diagram',
    kicker: 'Exam diagram',
    title: 'Draw Ethernet as a Layered Story',
    subtitle: 'A strong answer links access method, frame, address, and evolution.',
    visual: <ProcessPath steps={['Shared medium', 'CSMA/CD', 'MAC address', 'Frame fields', 'Switching', 'Higher speeds']} />,
    points: [
      'Begin with the shared medium problem.',
      'Show the frame format with destination, source, payload, and CRC.',
      'Explain 48-bit physical addressing.',
      'Close with Fast and Gigabit Ethernet changes.',
    ],
  }),
  slide({
    id: 'cn6-quick-check',
    kicker: 'Quick check',
    title: 'Can You Answer These?',
    subtitle: 'Use short, exact answers before the exam close.',
    visual: <ProcessPath steps={['ALOHA', 'CSMA', 'CSMA/CD', 'Token', 'FDMA', 'Ethernet']} />,
    points: [
      'Why is slotted ALOHA better than pure ALOHA?',
      'Why can CSMA still collide?',
      'Why is CSMA/CD tied to half-duplex shared Ethernet?',
      'Which Ethernet fields are essential for local delivery?',
    ],
  }),
  ...examClose({
    id: 'cn6-exam-close',
    unitNumber: 6,
    title: 'Unit 6 Concept Map',
    mapSteps: ['Shared medium', 'ALOHA', 'CSMA', 'CSMA/CD', 'Controlled access', 'Channelization', 'Ethernet'],
    notes: [
      'Write ALOHA throughput formulas with the vulnerable-time reason.',
      'Draw CSMA/CD steps in order: sense, transmit, detect, jam, backoff, retry.',
      'Compare reservation, polling, and token passing using permission logic.',
      'Draw Ethernet frame and explain MAC addressing.',
    ],
    pyq: [
      'Explain pure and slotted ALOHA with throughput expressions.',
      'Describe CSMA/CD and binary exponential backoff.',
      'Compare FDMA, TDMA, and CDMA.',
      'Explain Standard, Fast, and Gigabit Ethernet.',
    ],
    important: [
      'Pure ALOHA and Slotted ALOHA throughput.',
      'CSMA persistence methods and propagation delay.',
      'CSMA/CD HERO answer with minimum frame-size logic.',
      'Ethernet frame format, addressing, and evolution.',
    ],
    revision: ['Problem', 'Random access', 'Controlled access', 'Channelization', 'Ethernet frame', 'Ethernet evolution'],
  }).map((s) => ({ ...s, id: s.id.replace(`cn-${'u'}6-`, 'cn6-') })),
]

export default unit6Slides
