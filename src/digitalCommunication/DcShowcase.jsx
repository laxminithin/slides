/**
 * DcShowcase — full-bleed hero scenes for BEC503 Digital Communication.
 *
 * Keyed by slide id (`mN-uK-ops`). buildSlides swaps the normal split layout
 * for a showcase whenever a unit's "watch" beat is registered here, so each
 * module gets two slides where the mechanism fills the stage.
 */
import {
  ConstellationEnergyScene,
  MatchedFilterScene,
  QpskGrayScene,
  BerWaterfallScene,
  BinaryEntropyScene,
  ShannonLimitScene,
  HammingSyndromeScene,
  CyclicEncoderScene,
  TrellisWidthScene,
  ViterbiWorkedScene,
} from './DcScenes.jsx'

function wrap(title, scene, takeaway, camera, family, object) {
  return {
    title,
    camera,
    family,
    object,
    takeaway,
    scene: <div className="dc-showcase-scene">{scene}</div>,
  }
}

const SHOWCASES = {
  'm1-u11-ops': wrap(
    'The constellation — energy is the radius, errors are the gaps',
    <ConstellationEnergyScene />,
    'Average energy is the mean squared radius, but it is d_min that decides how often you are wrong.',
    'pull-constellation',
    'dc-constellation-map',
    'constellation',
  ),
  'm1-u16-ops': wrap(
    'Matched filter and correlator — two circuits, one number',
    <MatchedFilterScene />,
    'h(t) = φ(T − t) sampled at T equals the correlator output, and both maximise SNR at 2E/N₀.',
    'follow-waveform',
    'dc-filter-match',
    'matched-filter',
  ),
  'm2-u4-ops': wrap(
    'QPSK with Gray mapping — one slip, one bit',
    <QpskGrayScene />,
    'Gray labelling changes no geometry. It changes what a symbol error costs you in bits.',
    'pull-constellation',
    'dc-phase-rotate',
    'qpsk',
  ),
  'm2-u12-ops': wrap(
    'The waterfall — every scheme is a horizontal offset',
    <BerWaterfallScene />,
    'Read across at 10⁻⁵: DPSK costs 0.9 dB, coherent BFSK 3 dB, noncoherent BFSK about 4 dB.',
    'wide-channel',
    'dc-error-integrate',
    'ber-curve',
  ),
  'm3-u2-ops': wrap(
    'Binary entropy — the shape of not knowing',
    <BinaryEntropyScene />,
    'H(p) peaks at exactly 1 bit for a fair coin and falls to zero at both ends of certainty.',
    'overhead-board',
    'dc-entropy-weigh',
    'entropy',
  ),
  'm3-u16-ops': wrap(
    'The Shannon limit — where every real system is not',
    <ShannonLimitScene />,
    'Uncoded BPSK sits 11.2 dB right of the boundary. That gap is the entire budget for coding.',
    'wide-channel',
    'dc-capacity-climb',
    'shannon-bound',
  ),
  'm4-u10-ops': wrap(
    'Hamming codes — the syndrome is the address',
    <HammingSyndromeScene />,
    'Order H by binary counting and the syndrome names the bad bit directly. No search, no table.',
    'close-symbol',
    'dc-syndrome-lookup',
    'hamming',
  ),
  'm4-u14-ops': wrap(
    'The shift-register encoder — division in hardware',
    <CyclicEncoderScene />,
    'n − k flip-flops, a few XOR gates and a feedback path replace the whole generator matrix.',
    'follow-waveform',
    'dc-register-shift',
    'cyclic-encoder',
  ),
  'm5-u6-ops': wrap(
    'The trellis — why the tree stops mattering',
    <TrellisWidthScene />,
    'Once the register fills, the trellis width is 2^M forever. That is what makes Viterbi linear in L.',
    'overhead-board',
    'dc-trellis-walk',
    'trellis',
  ),
  'm5-u12-ops': wrap(
    'Viterbi in full — one corrupted pair, message intact',
    <ViterbiWorkedScene />,
    'Add, compare, select at every node; trace back from the terminal state and the flipped bit is gone.',
    'follow-waveform',
    'dc-survivor-prune',
    'viterbi',
  ),
}

export function getShowcase(id) {
  return SHOWCASES[id] || null
}
