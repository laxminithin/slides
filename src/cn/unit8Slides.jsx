import { ProcessPath } from '../components/Teaching'
import { unitTitle, slide, visualSlide, compareSlide, formulaSlide, examClose } from './helpers'
import {
  Ipv4AddressViz, InternetworkJourney, Ipv4Header, Ipv6Header, Ipv4Ipv6Morph,
  NetworkJourney, AddressJourney,
} from './CnKit'

const list = (items) => (
  <ul className="points-list">
    {items.map((item) => <li key={item}>{item}</li>)}
  </ul>
)

export const unit8Slides = [
  {
    ...unitTitle(
      8,
      'Network Layer and IP Addressing',
      'How packets leave one LAN, cross routers, and reach another network.',
      <InternetworkJourney />,
    ),
    id: 'cn8-title',
  },
  visualSlide({
    id: 'cn8-opening-story',
    kicker: 'Opening story',
    title: 'Laptop A Needs Another Network',
    lead: 'A MAC address can deliver inside the local LAN, but a packet for a remote network needs a router and a logical address.',
    visual: <InternetworkJourney />,
    contentDensity: 'sparse',
    takeaway: 'The network layer gives the whole journey an addressable path.',
  }),
  slide({
    id: 'cn8-why-network-layer',
    kicker: 'Network layer',
    title: 'Why the Network Layer Exists',
    subtitle: 'Data-link delivery is local; network-layer delivery is source-to-destination across networks.',
    visual: <NetworkJourney stage="ip" />,
    ratio: 'visual-copy',
    points: [
      'Frames move across one link or LAN.',
      'Packets move across interconnected networks.',
      'Routers inspect logical addresses to forward packets.',
      'The network layer hides different LAN technologies under one addressing plan.',
    ],
    takeaway: 'A router is needed when the destination is outside the local network.',
  }),
  compareSlide({
    id: 'cn8-physical-vs-logical',
    kicker: 'Addressing',
    title: 'Physical vs Logical Addressing',
    left: (
      <div>
        <h3>Physical address</h3>
        {list(['MAC address', 'Data-link layer', 'Local delivery on one network', 'Usually flat and hardware-oriented'])}
      </div>
    ),
    right: (
      <div>
        <h3>Logical address</h3>
        {list(['IP address', 'Network layer', 'End-to-end delivery across networks', 'Hierarchical network + host idea'])}
      </div>
    ),
    footer: 'MAC changes at each hop; IP source and destination identify the end systems.',
  }),
  slide({
    id: 'cn8-address-journey',
    kicker: 'Address journey',
    title: 'Two Addresses in One Trip',
    subtitle: 'A packet keeps logical endpoint addresses while each link uses local physical addresses.',
    visual: <AddressJourney />,
    ratio: 'visual-copy',
    points: [
      'Source and destination IP addresses remain end-to-end in the packet.',
      'Source and destination MAC addresses are for the next local hop.',
      'At a router, the frame is removed and a new outgoing frame is created.',
      'This separation lets IP cross Ethernet, WLAN, and other networks.',
    ],
  }),
  visualSlide({
    id: 'cn8-ipv4-hero',
    kicker: 'IPv4 addressing',
    title: 'IPv4 Is a 32-Bit Logical Address',
    lead: 'IPv4 identifies an interface using 32 bits, normally written as four decimal octets.',
    visual: <Ipv4AddressViz dotted="192.168.10.25" />,
    takeaway: 'Dotted decimal is only a readable form of a 32-bit binary value.',
  }),
  slide({
    id: 'cn8-ipv4-binary-octets',
    kicker: 'IPv4 notation',
    title: 'Four Octets',
    subtitle: 'Each decimal number in an IPv4 address represents 8 bits.',
    visual: <Ipv4AddressViz dotted="192.168.10.25" />,
    ratio: 'visual-copy',
    points: [
      'IPv4 address length = 32 bits.',
      'It is divided into four 8-bit octets.',
      'Each octet ranges from 0 to 255.',
      'Example: 192.168.10.25 is four decimal octets.',
    ],
  }),
  formulaSlide({
    id: 'cn8-ipv4-address-space',
    kicker: 'Address space',
    title: 'IPv4 Address Space',
    formula: '2^{32} = 4,294,967,296 addresses',
    symbols: [
      '32 independent bit positions.',
      'Each bit has two possible values: 0 or 1.',
      'Theoretical address space is about 4.3 billion.',
      'Special, private, and reserved ranges reduce public usability.',
    ],
    example: 'A 32-bit address space means every full IPv4 address is one value from 0.0.0.0 through 255.255.255.255.',
    visual: <Ipv4AddressViz dotted="255.255.255.255" />,
    takeaway: 'The address count comes directly from the number of bits.',
  }),
  slide({
    id: 'cn8-binary-decimal-conversion',
    kicker: 'IPv4 skill',
    title: 'Binary to Decimal Octet',
    subtitle: 'Use place values 128, 64, 32, 16, 8, 4, 2, 1.',
    visual: <ProcessPath steps={['128', '64', '32', '16', '8', '4', '2', '1']} />,
    points: [
      '11000000 = 128 + 64 = 192.',
      '10101000 = 128 + 32 + 8 = 168.',
      '00001010 = 8 + 2 = 10.',
      '00011001 = 16 + 8 + 1 = 25.',
    ],
    takeaway: 'Convert one octet at a time.',
  }),
  visualSlide({
    id: 'cn8-classful-intro',
    kicker: 'Classful addressing',
    title: 'Classful IPv4 Addressing',
    lead: 'Older IPv4 addressing divided the space into Classes A, B, C, D, and E using leading bit patterns.',
    visual: <ProcessPath steps={['A: 0', 'B: 10', 'C: 110', 'D: 1110', 'E: 1111']} />,
    takeaway: 'Classful addressing is historical but still common in exams.',
  }),
  slide({
    id: 'cn8-class-a',
    kicker: 'Class A',
    title: 'Class A Addresses',
    subtitle: 'Class A begins with leading bit 0.',
    visual: <Ipv4AddressViz dotted="10.0.0.1" />,
    points: [
      'First bit pattern: 0.',
      'First octet range: 0 to 127 in classful theory.',
      'Default mask: 255.0.0.0 or /8.',
      'Large host space per network.',
    ],
  }),
  slide({
    id: 'cn8-class-b',
    kicker: 'Class B',
    title: 'Class B Addresses',
    subtitle: 'Class B begins with leading bits 10.',
    visual: <Ipv4AddressViz dotted="172.16.5.20" />,
    points: [
      'First bit pattern: 10.',
      'First octet range: 128 to 191.',
      'Default mask: 255.255.0.0 or /16.',
      'Balanced network and host portions in classful design.',
    ],
  }),
  slide({
    id: 'cn8-class-c',
    kicker: 'Class C',
    title: 'Class C Addresses',
    subtitle: 'Class C begins with leading bits 110.',
    visual: <Ipv4AddressViz dotted="192.168.1.10" />,
    points: [
      'First bit pattern: 110.',
      'First octet range: 192 to 223.',
      'Default mask: 255.255.255.0 or /24.',
      'Many networks, fewer hosts per network.',
    ],
  }),
  slide({
    id: 'cn8-class-d-e',
    kicker: 'Classes D and E',
    title: 'Class D and Class E',
    subtitle: 'Class D and E are not normal host-address classes.',
    visual: <ProcessPath steps={['D: 224-239 multicast', 'E: 240-255 reserved/experimental']} />,
    points: [
      'Class D leading bits: 1110; used for multicast.',
      'Class E leading bits: 1111; reserved for experimental use.',
      'They do not use ordinary network/host division.',
      'For this unit, do not expand into multicast protocols.',
    ],
  }),
  compareSlide({
    id: 'cn8-classful-table',
    kicker: 'Classful summary',
    title: 'Classes A-E at a Glance',
    left: (
      <div>
        <h3>Unicast classes</h3>
        {list(['A: 0, /8, 0-127', 'B: 10, /16, 128-191', 'C: 110, /24, 192-223'])}
      </div>
    ),
    right: (
      <div>
        <h3>Special classes</h3>
        {list(['D: 1110, 224-239, multicast', 'E: 1111, 240-255, reserved', 'No normal host split'])}
      </div>
    ),
    footer: 'In exams, identify the class first from the first octet or leading bits.',
  }),
  visualSlide({
    id: 'cn8-mask-intro',
    kicker: 'Masks',
    title: 'Mask Separates Network and Host',
    lead: 'A mask has 1s for the network part and 0s for the host part.',
    visual: <ProcessPath steps={['IP address', 'Subnet mask', 'Bitwise AND', 'Network address']} />,
    takeaway: 'The network address is found by ANDing IP address with the mask.',
  }),
  formulaSlide({
    id: 'cn8-mask-and-rule',
    kicker: 'Mask operation',
    title: 'Bitwise AND Rule',
    formula: 'IP address AND mask = network address',
    symbols: [
      '1 AND 1 = 1.',
      '1 AND 0 = 0.',
      '0 AND 1 = 0.',
      '0 AND 0 = 0.',
    ],
    example: 'A mask keeps network bits and zeroes host bits.',
    visual: <ProcessPath steps={['Address bit', 'Mask bit', 'AND result']} />,
    takeaway: 'Mask 1 means preserve; mask 0 means clear.',
  }),
  formulaSlide({
    id: 'cn8-mask-example-one',
    kicker: 'Worked example',
    title: 'Network Address Example 1',
    formula: '192.168.10.25 AND 255.255.255.0 = 192.168.10.0',
    symbols: [
      'Address: 192.168.10.25.',
      'Mask: 255.255.255.0 or /24.',
      'First three octets are network bits.',
      'Last octet becomes 0 in the network address.',
    ],
    example: 'The host 192.168.10.25 belongs to network 192.168.10.0/24.',
    visual: <Ipv4AddressViz dotted="192.168.10.25" />,
    takeaway: 'A /24 mask keeps the first 24 bits.',
  }),
  formulaSlide({
    id: 'cn8-mask-example-two',
    kicker: 'Worked example',
    title: 'Network Address Example 2',
    formula: '172.16.45.9 AND 255.255.0.0 = 172.16.0.0',
    symbols: [
      'Address: 172.16.45.9.',
      'Mask: 255.255.0.0 or /16.',
      'First two octets are network bits.',
      'Host part is cleared to zero.',
    ],
    example: 'The host 172.16.45.9 belongs to network 172.16.0.0/16.',
    visual: <Ipv4AddressViz dotted="172.16.45.9" />,
    takeaway: 'Default Class B masking preserves 16 network bits.',
  }),
  slide({
    id: 'cn8-prefix-notation',
    kicker: 'Prefix notation',
    title: 'Slash Prefix',
    subtitle: 'Prefix notation writes the number of 1 bits in the mask.',
    visual: <ProcessPath steps={['/8', '/16', '/24', '/26']} />,
    points: [
      '/8 means 8 network bits: 255.0.0.0.',
      '/16 means 16 network bits: 255.255.0.0.',
      '/24 means 24 network bits: 255.255.255.0.',
      '/26 means 26 network bits: 255.255.255.192.',
    ],
  }),
  visualSlide({
    id: 'cn8-subnetting-intro',
    kicker: 'Subnetting',
    title: 'Subnetting Borrows Host Bits',
    lead: 'Subnetting divides one larger network into smaller logical networks by extending the network prefix.',
    visual: <ProcessPath steps={['Original network', 'Borrow host bits', 'New subnet prefix', 'Smaller host ranges']} />,
    takeaway: 'More subnets means fewer hosts per subnet.',
  }),
  formulaSlide({
    id: 'cn8-subnet-counts',
    kicker: 'Subnet formulas',
    title: 'Subnet Count and Host Count',
    formula: 'Subnets = 2^s, hosts/subnet = 2^h - 2',
    symbols: [
      's: number of borrowed host bits.',
      'h: number of remaining host bits.',
      'Subtract 2 for network address and directed broadcast address.',
      'Use syllabus depth: find subnet count, host count, and ranges.',
    ],
    example: 'A /24 split into /26 borrows 2 bits, so 4 subnets; h = 6, so 62 usable hosts per subnet.',
    visual: <ProcessPath steps={['/24', 'borrow 2', '/26', '4 subnets', '62 hosts each']} />,
    takeaway: 'Borrowing bits increases subnet count exponentially.',
  }),
  formulaSlide({
    id: 'cn8-subnet-worked-example',
    kicker: 'Worked example',
    title: 'Subnet 192.168.1.0/24 into /26',
    formula: 'Block size = 256 - 192 = 64',
    symbols: [
      '/26 mask is 255.255.255.192.',
      'Subnet starts: 0, 64, 128, 192.',
      'Usable range in first subnet: .1 to .62.',
      'Broadcast in first subnet: .63.',
    ],
    example: 'The four subnets are 192.168.1.0/26, .64/26, .128/26, and .192/26.',
    visual: <ProcessPath steps={['.0-.63', '.64-.127', '.128-.191', '.192-.255']} />,
    takeaway: 'Block size gives the subnet increments.',
  }),
  slide({
    id: 'cn8-subnet-exam-method',
    kicker: 'Subnetting method',
    title: 'Exam Method for Subnetting',
    subtitle: 'Solve subnetting in a fixed order to avoid mistakes.',
    visual: <ProcessPath steps={['Find prefix', 'Find mask', 'Find block size', 'List subnets', 'Mark host range']} />,
    points: [
      'Convert prefix to dotted mask if needed.',
      'Find the changing octet.',
      'Compute block size as 256 minus mask value in that octet.',
      'Network address is first; broadcast is one before next subnet.',
    ],
  }),
  visualSlide({
    id: 'cn8-ipv6-hero',
    kicker: 'IPv6',
    title: 'IPv6 Uses 128-Bit Addresses',
    lead: 'IPv6 expands the address size from 32 bits to 128 bits and writes addresses in hexadecimal groups.',
    visual: <Ipv6Header />,
    takeaway: 'IPv6 primarily solves address exhaustion and simplifies parts of IP design.',
  }),
  formulaSlide({
    id: 'cn8-ipv6-address-space',
    kicker: 'IPv6 address space',
    title: 'How Large Is IPv6?',
    formula: '2^{128} addresses',
    symbols: [
      '128 bits are divided into eight 16-bit groups.',
      'Each group is written in hexadecimal.',
      'Groups are separated by colons.',
      'The address space is vastly larger than IPv4.',
    ],
    example: '2001:0db8:0000:0000:0000:ff00:0042:8329 is a full IPv6-style address.',
    visual: <ProcessPath steps={['16 bits', '16 bits', '16 bits', '16 bits', '16 bits', '16 bits', '16 bits', '16 bits']} />,
    takeaway: 'Eight groups times 16 bits equals 128 bits.',
  }),
  slide({
    id: 'cn8-ipv6-hex-groups',
    kicker: 'IPv6 notation',
    title: 'Hexadecimal Groups',
    subtitle: 'Each IPv6 group has four hexadecimal digits representing 16 bits.',
    visual: <Ipv6Header />,
    points: [
      'Hex digits range from 0 to f.',
      'One hex digit represents 4 bits.',
      'Four hex digits represent 16 bits.',
      'Eight 16-bit groups make one IPv6 address.',
    ],
  }),
  slide({
    id: 'cn8-ipv6-compression',
    kicker: 'IPv6 notation',
    title: 'IPv6 Compression Rules',
    subtitle: 'IPv6 notation allows shorter writing without changing the address value.',
    visual: <ProcessPath steps={['Drop leading zeros', 'Compress one zero run with ::', 'Use :: only once']} />,
    points: [
      'Leading zeros inside a group may be omitted.',
      'One continuous run of all-zero groups may be replaced by ::.',
      'The :: symbol can appear only once in an address.',
      'Compression must still expand back to eight groups.',
    ],
  }),
  formulaSlide({
    id: 'cn8-ipv6-compression-example',
    kicker: 'Worked example',
    title: 'IPv6 Compression Example',
    formula: '2001:0db8:0000:0000:0000:ff00:0042:8329',
    symbols: [
      'Drop leading zeros: 2001:db8:0:0:0:ff00:42:8329.',
      'Compress zero run: 2001:db8::ff00:42:8329.',
      'Only one :: is allowed.',
      'Expansion restores the original eight groups.',
    ],
    example: '2001:db8::ff00:42:8329 is the compressed form.',
    visual: <Ipv6Header />,
    takeaway: 'Compression is notation, not a different address.',
  }),
  visualSlide({
    id: 'cn8-internetworking-basics',
    kicker: 'Internetworking',
    title: 'Internetworking Basics',
    lead: 'An internet is a network of networks connected by routers, with IP providing a common packet format.',
    visual: <InternetworkJourney />,
    takeaway: 'Routers connect unlike physical networks through a common network layer.',
  }),
  slide({
    id: 'cn8-router-forwarding-basic',
    kicker: 'Router role',
    title: 'What a Router Does Here',
    subtitle: 'At syllabus depth, focus on packet forwarding using destination logical address.',
    visual: <InternetworkJourney />,
    points: [
      'Receives a frame on one interface.',
      'Extracts the IP packet.',
      'Checks the destination IP network.',
      'Sends the packet out in a new frame on the next network.',
    ],
    takeaway: 'No routing-protocol details are needed for this unit.',
  }),
  slide({
    id: 'cn8-ipv4-datagram',
    kicker: 'IPv4 packet',
    title: 'IPv4 Datagram',
    subtitle: 'An IPv4 datagram contains a header plus payload from the upper layer.',
    visual: <Ipv4Header />,
    ratio: 'visual-copy',
    points: [
      'Header carries delivery and control information.',
      'Payload normally contains transport-layer data.',
      'Header length may vary because options can be present.',
      'Routers use selected header fields while forwarding.',
    ],
  }),
  visualSlide({
    id: 'cn8-ipv4-header-hero',
    kicker: 'IPv4 header',
    title: 'IPv4 Header: Multi-Field Control Block',
    lead: 'The IPv4 header is larger and more field-heavy than the IPv6 base header.',
    visual: <Ipv4Header />,
    contentDensity: 'sparse',
    takeaway: 'Learn fields by purpose, not only by position.',
  }),
  slide({
    id: 'cn8-ipv4-header-version-ihl-service',
    kicker: 'IPv4 header fields',
    title: 'Version, IHL, Service, Total Length',
    subtitle: 'The first row identifies IP version, header size, service treatment, and datagram size.',
    visual: <Ipv4Header />,
    ratio: 'visual-copy',
    points: [
      'Version is 4 for IPv4.',
      'IHL tells the IPv4 header length.',
      'Service field supports differentiated handling ideas.',
      'Total Length gives complete datagram length.',
    ],
  }),
  slide({
    id: 'cn8-ipv4-header-fragmentation',
    kicker: 'IPv4 header fields',
    title: 'Identification, Flags, Fragment Offset',
    subtitle: 'These fields support fragmentation and reassembly.',
    visual: <Ipv4Header />,
    ratio: 'visual-copy',
    points: [
      'Identification marks fragments belonging to the same original datagram.',
      'Flags control fragmentation behavior.',
      'Fragment Offset locates a fragment in the original datagram.',
      'Fragmentation exists because networks can have different maximum frame payload sizes.',
    ],
  }),
  slide({
    id: 'cn8-ipv4-header-ttl-protocol-checksum',
    kicker: 'IPv4 header fields',
    title: 'TTL, Protocol, Header Checksum',
    subtitle: 'These fields limit lifetime, identify payload type, and protect the header.',
    visual: <Ipv4Header />,
    ratio: 'visual-copy',
    points: [
      'TTL prevents packets from circulating forever.',
      'Protocol identifies the next higher-layer protocol.',
      'Header checksum detects errors in the IPv4 header.',
      'Routers update TTL and therefore recompute the header checksum.',
    ],
  }),
  slide({
    id: 'cn8-ipv4-header-address-options',
    kicker: 'IPv4 header fields',
    title: 'Addresses, Options, Padding',
    subtitle: 'Source and destination addresses identify endpoints; options make the header variable length.',
    visual: <Ipv4Header />,
    ratio: 'visual-copy',
    points: [
      'Source IP address identifies the original sender interface.',
      'Destination IP address identifies the final receiver interface.',
      'Options are optional and not common in ordinary forwarding.',
      'Padding aligns the header length when options are used.',
    ],
  }),
  visualSlide({
    id: 'cn8-ipv6-header-hero',
    kicker: 'IPv6 base header',
    title: 'IPv6 Base Header',
    lead: 'IPv6 uses a simpler fixed base header with fewer fields and 128-bit source and destination addresses.',
    visual: <Ipv6Header />,
    contentDensity: 'sparse',
    takeaway: 'IPv6 moves optional details out of the base header.',
  }),
  slide({
    id: 'cn8-ipv6-header-fields',
    kicker: 'IPv6 header fields',
    title: 'IPv6 Base Header Fields',
    subtitle: 'The IPv6 base header supports forwarding without IPv4-style header clutter.',
    visual: <Ipv6Header />,
    ratio: 'visual-copy',
    points: [
      'Version is 6 for IPv6.',
      'Traffic Class and Flow Label support traffic handling.',
      'Payload Length gives data after the base header.',
      'Next Header and Hop Limit replace protocol and TTL ideas.',
      'Source and destination addresses are 128 bits each.',
    ],
  }),
  visualSlide({
    id: 'cn8-ipv4-ipv6-hero',
    kicker: 'HERO comparison',
    title: 'IPv4 vs IPv6',
    lead: 'IPv6 expands addressing and streamlines the base header.',
    visual: <Ipv4Ipv6Morph />,
    contentDensity: 'sparse',
    takeaway: '32-bit vs 128-bit; variable IPv4 header vs fixed IPv6 base header.',
  }),
  compareSlide({
    id: 'cn8-ipv4-vs-ipv6-table',
    kicker: 'IPv4 vs IPv6',
    title: 'Exam Comparison Points',
    left: (
      <div>
        <h3>IPv4</h3>
        {list(['32-bit addresses', 'Dotted decimal', 'Variable header length', 'Header checksum present', 'Fragmentation fields in header'])}
      </div>
    ),
    right: (
      <div>
        <h3>IPv6</h3>
        {list(['128-bit addresses', 'Hexadecimal colon notation', 'Fixed base header', 'No base header checksum', 'Extension-header design'])}
      </div>
    ),
    footer: 'Keep the comparison at base-header and addressing level for this syllabus.',
  }),
  slide({
    id: 'cn8-packet-journey-example',
    kicker: 'Worked journey',
    title: 'Packet from LAN A to LAN B',
    subtitle: 'Tie addressing, routers, and headers together in one answer.',
    visual: <InternetworkJourney />,
    ratio: 'visual-copy',
    points: [
      'Laptop A sees that destination IP is not on its local network.',
      'It sends the frame to the default router’s MAC address.',
      'The router forwards the IP packet toward the destination network.',
      'On each hop, a new data-link frame carries the same IP packet onward.',
    ],
  }),
  slide({
    id: 'cn8-quick-check',
    kicker: 'Quick check',
    title: 'Can You Answer These?',
    subtitle: 'These are the highest-value checks before revision.',
    visual: <ProcessPath steps={['IPv4', 'Classes', 'Mask AND', 'Subnet', 'IPv6', 'Headers']} />,
    points: [
      'Find class and default mask for a given IPv4 address.',
      'Compute network address using IP AND mask.',
      'Split a /24 network into /26 subnets and list ranges.',
      'Compress and expand a simple IPv6 address.',
      'Compare IPv4 and IPv6 headers.',
    ],
  }),
  ...examClose({
    id: 'cn8-exam-close',
    unitNumber: 8,
    title: 'Unit 8 Concept Map',
    mapSteps: ['Router need', 'Physical vs logical', 'IPv4', 'Classful addressing', 'Mask AND', 'Subnetting', 'IPv6', 'Headers'],
    notes: [
      'Start with the laptop-to-remote-network story.',
      'Write IPv4 classes with leading bits and first-octet ranges.',
      'Show mask AND operation for every network-address example.',
      'Keep IPv6 notation rules precise: drop leading zeros, one :: only.',
      'Compare IPv4 and IPv6 headers without routing-protocol expansion.',
    ],
    pyq: [
      'Explain physical and logical addressing.',
      'Describe IPv4 classful addressing with Classes A-E.',
      'Find network address using a subnet mask.',
      'Solve a basic subnetting problem.',
      'Explain IPv4 header fields and compare IPv4 with IPv6.',
    ],
    important: [
      'IPv4 32-bit dotted decimal and 2^32 address space.',
      'Classful A-E prefixes, ranges, and default masks.',
      'Mask AND worked examples.',
      'Subnetting counts and block-size method.',
      'IPv6 128-bit notation and base header.',
      'IPv4 vs IPv6 HERO comparison.',
    ],
    revision: ['Need router', 'Use IP', 'Find class', 'Apply mask', 'Subnet', 'Read header', 'Compare IPv6'],
  }).map((s) => ({ ...s, id: s.id.replace(`cn-${'u'}8-`, 'cn8-') })),
]

export default unit8Slides
