import { ProcessPath } from '../components/Teaching'
import { unitTitle, slide, visualSlide, formulaSlide, examClose } from './helpers'
import { ErrorChannel, BlockCodeViz, CrcDivision, ChecksumViz, NetworkJourney } from './CnKit'

const closeIds = (unitNumber, slides) =>
  slides.map((item) => ({
    ...item,
    id: String(item.id).replace(`cn-u${unitNumber}-`, `cn${unitNumber}-`),
  }))

const Bits = ({ bits, bad = [] }) => (
  <div className="process-path process-horizontal" data-steps={bits.length} aria-label="Bit pattern">
    {bits.map((bit, index) => (
      <div key={`${bit}-${index}`} className="process-node-wrap">
        <div className={`process-node ${bad.includes(index) ? 'accent' : ''}`.trim()}>
          <span className="process-node-label">{bit}</span>
        </div>
      </div>
    ))}
  </div>
)

const CodeSpace = () => (
  <ProcessPath
    steps={[
      { label: '0000', desc: 'valid' },
      { label: '0001', desc: 'invalid' },
      { label: '0010', desc: 'invalid' },
      { label: '1111', desc: 'valid' },
    ]}
  />
)

const crcMap = ['Dataword', 'Append 3 zeros', 'Modulo-2 divide', 'Remainder', 'Codeword']

export const unit4Slides = [
  {
    ...unitTitle(
      4,
      'Error Detection and Correction',
      'Forouzan Ch. 10.1-10.5: redundancy, block codes, cyclic codes and checksums.',
      <NetworkJourney stage="frame" />
    ),
    id: 'cn4-title',
  },
  visualSlide({
    id: 'cn4-roadmap',
    kicker: 'Unit 4 roadmap',
    title: 'From Noise to Reliable Frames',
    lead: 'The data-link layer cannot remove noise, so it adds controlled redundancy and lets the receiver test what arrived.',
    visual: <ProcessPath steps={['Error model', 'Redundancy', 'Block codes', 'CRC', 'Checksum', 'Exam method']} />,
    takeaway: 'Every technique answers the same question: is this received bit pattern believable?',
  }),
  slide({
    id: 'cn4-why-errors-happen',
    kicker: 'Error model',
    title: 'Transmission Media Can Change Bits',
    subtitle: 'Signals attenuate, distort and mix with noise before the receiver samples them as bits.',
    visual: <ErrorChannel flipped={4} />,
    ratio: 'visual-copy',
    points: [
      'A transmitted 1 may be interpreted as 0, or a transmitted 0 as 1.',
      'The receiver sees only the received pattern; it does not know the original message.',
      'Error control therefore adds extra evidence before transmission.',
    ],
    takeaway: 'Error detection begins by accepting that the channel is not perfectly trustworthy.',
  }),
  slide({
    id: 'cn4-bit-flip-story',
    kicker: 'Bit flip',
    title: 'One Wrong Sample Changes the Frame Meaning',
    subtitle: 'A bit flip is small physically but large logically because binary symbols are discrete.',
    visual: <Bits bits={['1', '0', '1', '1', '0', '1', '0', '1']} bad={[4]} />,
    points: [
      'Noise may push the signal across the decision threshold.',
      'After sampling, the receiver stores the wrong binary value.',
      'Detection depends on whether the new pattern violates the code rules.',
    ],
    takeaway: 'The receiver detects errors by checking structure, not by replaying the channel.',
  }),
  slide({
    id: 'cn4-single-vs-burst',
    kicker: 'Error types',
    title: 'Single-Bit Errors and Burst Errors',
    subtitle: 'Forouzan distinguishes errors by how many bit positions are affected and how close they are.',
    visual: <ProcessPath steps={['Single-bit', 'one position', 'Burst', 'two or more affected', 'span measured']} />,
    points: [
      'A single-bit error changes exactly one bit in the data unit.',
      'A burst error changes two or more bits; unchanged bits may lie inside the burst span.',
      'Burst errors are common in serial transmission because noise lasts for a time interval.',
    ],
    takeaway: 'CRC is valued because it is especially strong against burst errors.',
  }),
  formulaSlide({
    id: 'cn4-redundancy-principle',
    kicker: 'Redundancy',
    title: 'Redundancy Makes Errors Observable',
    formula: 'n = k + r',
    symbols: [
      'k: information bits in the original dataword.',
      'r: redundant bits added by the encoder.',
      'n: total bits in the transmitted codeword.',
    ],
    example: 'If 4 data bits become a 7-bit Hamming codeword, r = 3 redundancy bits.',
    visual: <BlockCodeViz />,
    takeaway: 'No redundancy means every received pattern may look legal.',
  }),
  slide({
    id: 'cn4-dataword-codeword',
    kicker: 'Coding terms',
    title: 'Datawords Map to Codewords',
    subtitle: 'A block code maps each k-bit dataword to one n-bit codeword before transmission.',
    visual: <BlockCodeViz />,
    ratio: 'visual-copy',
    points: [
      'There are 2^k possible datawords.',
      'There are 2^n possible n-bit words, but only 2^k are valid codewords.',
      'An invalid received word is evidence that an error occurred.',
      'An error can be missed if it changes one valid codeword into another valid codeword.',
    ],
    takeaway: 'The unused patterns are the detection power of the code.',
  }),
  slide({
    id: 'cn4-block-code-visual',
    kicker: 'Block coding',
    title: 'Encoder and Checker Agree on a Codebook',
    subtitle: 'The sender encodes; the receiver checks membership in the valid set.',
    visual: <CodeSpace />,
    ratio: 'visual-copy',
    points: [
      'The codebook must be known by both sender and receiver.',
      'The receiver does not need to know which noise event occurred.',
      'It only tests whether the received n-bit pattern belongs to the allowed set.',
    ],
    takeaway: 'Block coding turns reliability into a pattern-recognition problem.',
  }),
  formulaSlide({
    id: 'cn4-hamming-distance-definition',
    kicker: 'Hamming distance',
    title: 'Distance Counts Bit Positions That Differ',
    formula: 'd(x, y) = number of unequal bit positions',
    symbols: [
      'Compare the two equal-length words bit by bit.',
      'Each unequal position contributes one to the distance.',
      'The minimum distance of a code is the smallest distance between any two valid codewords.',
    ],
    example: 'd(10101, 11110) = 3 because positions 2, 4 and 5 differ.',
    visual: <Bits bits={['1=1', '0!=1', '1=1', '0!=1', '1!=0']} bad={[1, 3, 4]} />,
    takeaway: 'Distance measures how many bit errors are needed to transform one word into another.',
  }),
  formulaSlide({
    id: 'cn4-min-distance-detection',
    kicker: 'Detection rule',
    title: 'Minimum Distance Controls Detection',
    formula: 'To detect up to s errors: d_min >= s + 1',
    symbols: [
      'd_min is the minimum Hamming distance of the code.',
      's is the maximum number of bit errors guaranteed detectable.',
      'A smaller distance allows an error pattern to land on another valid codeword.',
    ],
    example: 'If d_min = 3, all one-bit and two-bit errors are detected.',
    visual: <ProcessPath steps={['Valid codeword', '1 error', '2 errors', 'not another valid word']} />,
    takeaway: 'Detection needs one more unit of distance than the error count.',
  }),
  formulaSlide({
    id: 'cn4-min-distance-correction',
    kicker: 'Correction rule',
    title: 'Correction Needs More Separation',
    formula: 'To correct up to t errors: d_min >= 2t + 1',
    symbols: [
      'Correction asks which valid codeword is closest.',
      'The nearest-codeword decision must be unambiguous.',
      'Detection is easier than correction for the same redundancy.',
    ],
    example: 'If d_min = 5, the receiver can correct all two-bit errors.',
    visual: <ProcessPath steps={['Codeword A', 'error cloud', 'gap', 'error cloud', 'Codeword B']} />,
    takeaway: 'Correction spends distance on both sides of each valid codeword.',
  }),
  slide({
    id: 'cn4-even-parity',
    kicker: 'Linear block codes',
    title: 'Even Parity Is the Smallest Linear Code',
    subtitle: 'One redundancy bit is chosen so the total number of 1s in the codeword is even.',
    visual: <Bits bits={['1', '0', '1', '1', 'P=1']} bad={[4]} />,
    points: [
      'The parity bit is the XOR of all data bits for even parity.',
      'Any single-bit error changes the parity from even to odd.',
      'Two flipped bits can preserve parity, so simple parity misses some burst errors.',
    ],
    takeaway: 'Parity is simple and instructive, but not strong enough for many links.',
  }),
  slide({
    id: 'cn4-two-dimensional-parity',
    kicker: 'Parity extension',
    title: 'Two-Dimensional Parity Improves Burst Detection',
    subtitle: 'Rows and columns each receive parity, creating two independent checks.',
    visual: <ProcessPath steps={['Arrange block', 'row parity', 'column parity', 'check both', 'locate likely bit']} />,
    points: [
      'A single-bit error changes one row check and one column check.',
      'Several burst patterns become detectable because they disturb multiple checks.',
      'The method introduces more redundancy and block delay.',
    ],
    takeaway: 'More independent checks increase the chance that an error leaves evidence.',
  }),
  slide({
    id: 'cn4-linear-code-idea',
    kicker: 'Linear block codes',
    title: 'Linear Codes Use XOR Algebra',
    subtitle: 'Forouzan describes linear block codes over modulo-2 arithmetic, where addition is XOR.',
    visual: <ProcessPath steps={['0+0=0', '0+1=1', '1+0=1', '1+1=0', 'no carry']} />,
    points: [
      'Modulo-2 addition has no carries and no borrows.',
      'The XOR of any two valid codewords in a linear code is also a valid codeword.',
      'This closure property makes syndrome checking efficient.',
    ],
    takeaway: 'Linear coding replaces ordinary arithmetic with XOR structure.',
  }),
  formulaSlide({
    id: 'cn4-xor-properties',
    kicker: 'Modulo-2 arithmetic',
    title: 'XOR Properties Used in Coding',
    formula: 'a xor a = 0, a xor 0 = a',
    symbols: [
      'Subtraction and addition are the same in modulo-2 arithmetic.',
      'Carries are ignored; each bit position is independent.',
      'Repeated XOR can cancel equal terms.',
    ],
    example: '1011 xor 1011 = 0000, and 1100 xor 0101 = 1001.',
    visual: <ProcessPath steps={['Compare bits', 'XOR', 'cancel equals', 'keep differences']} />,
    takeaway: 'CRC division is long division built from these XOR rules.',
  }),
  slide({
    id: 'cn4-syndrome',
    kicker: 'Syndrome',
    title: 'The Syndrome Is the Receiver Check Result',
    subtitle: 'A syndrome is a compact result computed from the received word.',
    visual: <ProcessPath steps={['Received word', 'checker', 'syndrome', 'zero: accept', 'nonzero: reject/correct']} />,
    points: [
      'A zero syndrome means no violation of the code rule was found.',
      'A nonzero syndrome indicates an error pattern is present.',
      'In correction codes, syndrome patterns can point to likely error positions.',
    ],
    takeaway: 'Syndrome is the receiver side of redundancy.',
  }),
  slide({
    id: 'cn4-hamming-code-note',
    kicker: 'Correction code',
    title: 'Hamming Codes Position Parity Bits Strategically',
    subtitle: 'Hamming codes are linear block codes designed for single-bit error correction.',
    visual: <ProcessPath steps={['Positions 1,2,4,...', 'parity checks', 'syndrome bits', 'error position', 'flip bit']} />,
    points: [
      'Parity bits occupy power-of-two positions in common presentations.',
      'Each parity bit checks a different subset of positions.',
      'The syndrome binary value identifies the faulty bit for single-bit correction.',
    ],
    takeaway: 'Hamming codes show how redundancy can locate, not only detect, an error.',
  }),
  visualSlide({
    id: 'cn4-cyclic-codes-hero',
    kicker: 'Cyclic codes',
    title: 'CRC Is the Hero Detection Code',
    lead: 'Cyclic Redundancy Check treats a bit string as a polynomial and uses modulo-2 division by a generator.',
    visual: <CrcDivision stage="sender" />,
    contentDensity: 'sparse',
    takeaway: 'CRC gives strong burst-error detection with compact hardware-friendly XOR logic.',
  }),
  slide({
    id: 'cn4-crc-sender-flow',
    kicker: 'CRC sender',
    title: 'Sender Builds a Divisible Codeword',
    subtitle: 'The sender chooses CRC bits so the final codeword divides exactly by the generator.',
    visual: <CrcDivision stage="sender" />,
    ratio: 'visual-copy',
    points: [
      'Let the generator have m bits, so the CRC field has m - 1 bits.',
      'Append m - 1 zeros to the dataword before division.',
      'Divide using modulo-2 XOR division and append the remainder.',
      'The resulting codeword has zero remainder when divided by the generator.',
    ],
    takeaway: 'The sender does not append random redundancy; it appends the exact remainder.',
  }),
  slide({
    id: 'cn4-crc-receiver-flow',
    kicker: 'CRC receiver',
    title: 'Receiver Repeats the Same Division',
    subtitle: 'The receiver divides the received codeword by the same generator.',
    visual: <CrcDivision stage="receiver" />,
    ratio: 'visual-copy',
    points: [
      'A zero syndrome means the codeword is divisible by the generator.',
      'A nonzero syndrome means an error was detected.',
      'CRC detects all burst errors shorter than the generator length under standard generator conditions.',
    ],
    takeaway: 'CRC checking is symmetric: the receiver repeats the sender logic.',
  }),
  slide({
    id: 'cn4-crc-polynomial-view',
    kicker: 'Polynomial view',
    title: 'Bit Strings Represent Polynomials',
    subtitle: 'Forouzan presents cyclic codes through polynomial arithmetic over GF(2).',
    visual: <ProcessPath steps={['1011', 'x^3 + x + 1', 'XOR add', 'mod generator', 'remainder']} />,
    ratio: 'visual-copy',
    points: [
      'A bit 1 means the corresponding power of x is present.',
      'A bit 0 means that term is absent.',
      'Addition and subtraction are XOR because coefficients are modulo 2.',
    ],
    takeaway: 'The polynomial view explains why cyclic shifts and division are natural for CRC.',
  }),
  slide({
    id: 'cn4-crc-example-setup',
    kicker: 'Worked CRC',
    title: 'Example Setup: Data 1101, Generator 1011',
    subtitle: 'Generator 1011 has 4 bits, so the CRC remainder has 3 bits.',
    visual: <ProcessPath steps={crcMap} />,
    ratio: 'visual-copy',
    points: [
      'Dataword D = 1101.',
      'Generator G = 1011.',
      'Append 3 zeros: 1101000.',
      'Now divide 1101000 by 1011 using XOR long division.',
    ],
    takeaway: 'The number of appended zeros is one less than the generator length.',
  }),
  formulaSlide({
    id: 'cn4-crc-example-append',
    kicker: 'Worked CRC',
    title: 'Step 1: Append Zeros',
    formula: '1101 x 2^3 = 1101000',
    symbols: [
      'Multiplying by x^3 shifts the dataword left by 3 bit positions.',
      'The three zero positions are reserved for the CRC remainder.',
      'The temporary dividend is not the final transmitted codeword.',
    ],
    example: 'D = 1101, G = 1011, dividend = 1101000.',
    visual: <Bits bits={['1', '1', '0', '1', '0', '0', '0']} bad={[4, 5, 6]} />,
    takeaway: 'The empty CRC field is created before division.',
  }),
  slide({
    id: 'cn4-crc-example-division-a',
    kicker: 'Worked CRC',
    title: 'Step 2: First XOR Division Passes',
    subtitle: 'Align the generator under the leftmost 1 and XOR instead of subtracting.',
    visual: <ProcessPath steps={['1101 xor 1011 = 0110', 'bring down 0', '1100 xor 1011 = 0111', 'bring down 0']} />,
    ratio: 'visual-copy',
    points: [
      'Start with the leftmost 4 bits: 1101 xor 1011 = 0110.',
      'Drop the leading 0 and bring down the next bit to get 1100.',
      'Again divide: 1100 xor 1011 = 0111.',
      'Modulo-2 division never borrows from neighboring bits.',
    ],
    takeaway: 'Each active division step starts only when the current group begins with 1.',
  }),
  slide({
    id: 'cn4-crc-example-division-b',
    kicker: 'Worked CRC',
    title: 'Step 3: Finish the Division',
    subtitle: 'Continue until no more bits remain to bring down.',
    visual: <ProcessPath steps={['1110 xor 1011 = 0101', 'bring down 0', '1010 xor 1011 = 0001', 'remainder 001']} />,
    ratio: 'visual-copy',
    points: [
      'After the next bring-down, divide 1110 by 1011 to get 0101.',
      'Bring down the last 0, making 1010.',
      '1010 xor 1011 = 0001.',
      'The final 3-bit remainder is 001.',
    ],
    takeaway: 'Only the last m - 1 bits become the CRC field.',
  }),
  formulaSlide({
    id: 'cn4-crc-example-codeword',
    kicker: 'Worked CRC',
    title: 'Step 4: Append the Remainder',
    formula: 'Codeword = 1101 001',
    symbols: [
      'Replace the appended zeros with the computed remainder.',
      'The transmitted codeword is 1101001.',
      'This codeword is exactly divisible by 1011 in modulo-2 arithmetic.',
    ],
    example: 'Sender transmits 1101001, not the temporary 1101000.',
    visual: <Bits bits={['1', '1', '0', '1', '0', '0', '1']} bad={[4, 5, 6]} />,
    takeaway: 'The CRC bits are chosen to make the whole word divisible.',
  }),
  slide({
    id: 'cn4-crc-example-receiver-ok',
    kicker: 'Worked CRC',
    title: 'Receiver Check with No Error',
    subtitle: 'Divide the received codeword 1101001 by the same generator 1011.',
    visual: <CrcDivision stage="receiver" />,
    points: [
      'The receiver uses 1101001 as the dividend.',
      'Modulo-2 division by 1011 gives remainder 000.',
      'A zero remainder means no error is detected.',
      'It does not prove mathematically that no error occurred; it proves no detectable violation occurred.',
    ],
    takeaway: 'CRC acceptance means the received pattern passed the generator test.',
  }),
  slide({
    id: 'cn4-crc-example-error',
    kicker: 'Worked CRC',
    title: 'Receiver Check with a Bit Flip',
    subtitle: 'If 1101001 becomes 1101101, the same division produces a nonzero remainder.',
    visual: <ErrorChannel flipped={4} />,
    ratio: 'visual-copy',
    points: [
      'The receiver has no copy of the original codeword.',
      'It divides the received bits and checks the syndrome.',
      'A nonzero remainder rejects the frame and triggers higher protocol action.',
      'Data-link control normally retransmits rather than trying to repair CRC-detected frames.',
    ],
    takeaway: 'CRC detection feeds the ARQ protocols of Unit 5.',
  }),
  visualSlide({
    id: 'cn4-checksum-intro',
    kicker: 'Checksum',
    title: "Checksum Uses One's Complement Addition",
    lead: 'The Internet-style checksum splits data into fixed-size words, adds them with end-around carry, and complements the sum.',
    visual: <ChecksumViz />,
    contentDensity: 'sparse',
    takeaway: "Checksum is arithmetic redundancy; CRC is polynomial redundancy.",
  }),
  slide({
    id: 'cn4-checksum-example-setup',
    kicker: 'Worked checksum',
    title: 'Example Setup: Four-Bit Words',
    subtitle: "Use small words so the one's complement rule is visible.",
    visual: <ProcessPath steps={['Word1 1001', 'Word2 1100', 'Word3 1010', 'add with wrap', 'complement']} />,
    points: [
      'Word 1 = 1001.',
      'Word 2 = 1100.',
      'Word 3 = 1010.',
      "All arithmetic is performed as 4-bit one's complement addition.",
    ],
    takeaway: 'A carry beyond 4 bits wraps around and is added back into the low bits.',
  }),
  formulaSlide({
    id: 'cn4-checksum-sender-work',
    kicker: 'Worked checksum',
    title: 'Sender Computes the Checksum',
    formula: '1001 + 1100 + 1010 = 10000 -> wrap -> 0001',
    symbols: [
      '1001 + 1100 = 10101, so wrap carry 1 into 0101 to get 0110.',
      '0110 + 1010 = 10000, so wrap carry 1 into 0000 to get 0001.',
      "Checksum is the one's complement of 0001, which is 1110.",
    ],
    example: 'Sender transmits the data words plus checksum 1110.',
    visual: <ChecksumViz />,
    takeaway: "The checksum is the complement of the wrapped sum.",
  }),
  formulaSlide({
    id: 'cn4-checksum-receiver-work',
    kicker: 'Worked checksum',
    title: 'Receiver Verifies All Ones',
    formula: '1001 + 1100 + 1010 + 1110 = 1111',
    symbols: [
      'The receiver adds every data word and the checksum.',
      "With no detected error, the final one's complement sum is all 1s.",
      'If the result is not all 1s, the receiver detects an error.',
    ],
    example: 'For 4-bit words, 1111 is the accept pattern.',
    visual: <ProcessPath steps={['Data words', 'checksum', 'add with wrap', '1111 accept', 'else reject']} />,
    takeaway: 'The receiver looks for an all-ones result, not for the original sum.',
  }),
  slide({
    id: 'cn4-crc-vs-checksum',
    kicker: 'Comparison',
    title: 'CRC and Checksum Solve the Same Problem Differently',
    subtitle: 'Both add redundancy, but they use different mathematics and catch different error patterns.',
    visual: <ProcessPath steps={['Parity', 'Block code', 'CRC', 'Checksum', 'Receiver decision']} />,
    points: [
      'Parity is simple but weak for even-numbered errors.',
      'CRC is strong for burst detection and common in data-link frames.',
      'Checksum is lightweight and widely used in protocol headers.',
      'No finite redundancy can detect every possible error pattern.',
    ],
    takeaway: 'Choose the error code according to the link, cost and error pattern.',
  }),
  ...closeIds(4, examClose({
    unitNumber: 4,
    title: 'Unit 4 Exam Map',
    mapSteps: ['Error types', 'Redundancy', 'Hamming distance', 'Linear codes', 'CRC', 'Checksum'],
    notes: [
      'Write definitions of dataword, codeword, redundancy, syndrome and Hamming distance.',
      'Practice the d_min rules for detection and correction with small examples.',
      'Solve CRC division using XOR, not decimal subtraction.',
      "Show one's complement wrapping clearly in checksum numericals.",
    ],
    pyq: [
      'Explain single-bit and burst errors with examples.',
      'Derive detection and correction capability from minimum Hamming distance.',
      'Perform CRC generation and checking for a given dataword and divisor.',
      "Compute checksum using one's complement arithmetic.",
    ],
    important: [
      'Redundancy and codeword validity.',
      'Hamming distance and minimum distance rules.',
      'Linear block codes and XOR properties.',
      'CRC sender and receiver algorithms.',
      'Checksum sender and receiver examples.',
    ],
    revision: ['Noise', 'Bit errors', 'Redundancy', 'Distance', 'CRC division', 'Checksum check'],
  })),
]

export default unit4Slides
