import { CheckCircle2, Database, FileCheck2, Fingerprint, KeyRound, LockKeyhole, Network, RadioTower, RotateCcw, ShieldCheck, Shuffle, Smartphone, UserCheck, Wifi, XCircle } from 'lucide-react'
import { Lead, ProcessPath, Takeaway, TwoColumn, VisualFirst } from './components/Teaching'
import { AttackDefenseBoard, SecurityTeachingFrame, isRichSecurityViz, pickVisualForTopic } from './components/InsVisuals'
import { AuthenticationFlow, DigitalSignature, FirewallEngine, PkiChain } from './components/InsSecurityViz'
import { visualForSlide } from './components/InsTeachingScenes'
import { ModuleOpening } from './components/InsOpenings'
import { InsHeroScene, composeAt, ratioAt, withInsHero } from './components/InsKit'

const icon = { size: 30, strokeWidth: 1.8, 'aria-hidden': true }

/** Prefer concept-specific teaching scene; otherwise use factory fallback. */
function teach(id, fallback) {
  return visualForSlide(id) || fallback
}

function RevealList({ step = 0, items }) {
  return (
    <ul className="insx-reveal-list">
      {items.map((item, i) => <li key={item} className={i <= step ? 'visible' : ''}>{item}</li>)}
    </ul>
  )
}

function MissionLesson({
  id,
  section,
  title,
  lead,
  items,
  visual,
  takeaway,
  example,
  attack = false,
  compose = 'standard',
  beat,
  metaphor,
  annotations,
  peak = false,
}) {
  return (
    <SecurityTeachingFrame
      id={id}
      section={section}
      title={title}
      lead={lead}
      items={items}
      visual={visual}
      takeaway={takeaway}
      example={example}
      attack={attack}
      compose={compose}
      beat={beat}
      metaphor={metaphor}
      annotations={annotations}
      peak={peak}
    />
  )
}

/** Two-column lesson with deterministic ratio cycling to avoid template runs. */
function LessonColumn({
  step = 999,
  lead,
  items,
  visual,
  index = 0,
  peak = false,
  beat,
  metaphor,
  annotations = [],
}) {
  const ratio = peak ? 'visual-lead' : ratioAt(index)
  const body = withInsHero(visual, { beat, metaphor, annotations, peak })
  return (
    <TwoColumn visual={body} ratio={ratio}>
      {lead && <Lead>{lead}</Lead>}
      <RevealList step={step} items={items} />
    </TwoColumn>
  )
}

function Ribbon({ step = 0, stages = ['Alice', 'Message', 'Security mechanism', 'Bob'], attack = false }) {
  return (
    <div className={`insx-ribbon ${attack ? 'attack' : ''}`}>
      {stages.map((stage, i) => (
        <div key={`${stage}-${i}`} className={`insx-ribbon-node ${i <= step ? 'active' : ''} ${i === stages.length - 1 ? 'end' : ''}`}>
          <strong>{stage}</strong>
          <span>{i === 0 ? 'sender' : i === stages.length - 1 ? 'receiver' : i === 1 ? 'payload' : 'protection'}</span>
        </div>
      ))}
      {attack && <div className={`insx-eve ${step >= 2 ? 'visible' : ''}`}>Eve tries replay, replace or impersonate</div>}
      <span className="insx-ribbon-packet one" aria-hidden="true" />
      <span className="insx-ribbon-packet two" aria-hidden="true" />
      {attack && <span className="insx-ribbon-packet bad" aria-hidden="true" />}
    </div>
  )
}

function HashMachine({ step = 0, mode = 'hash' }) {
  const bits = ['8F', '21', 'C9', 'A4', '55', 'E0', '7B', '19']
  return (
    <div className={`insx-machine insx-${mode}`}>
      <div className={`insx-doc ${step >= 0 ? 'active' : ''}`}><strong>Large message M</strong><span>exam.pdf, bid, packet, password</span></div>
      <div className={`insx-box ${step >= 1 ? 'active' : ''}`}>{mode === 'hmac' ? 'HMAC(K, M)' : mode === 'crc' ? 'CRC division' : 'h(M)'}</div>
      <div className="insx-digest" aria-label="Digest bytes">
        {bits.map((bit, i) => <code key={bit} className={step >= 2 && (i + step) % 2 === 0 ? 'flip' : ''}>{bit}</code>)}
      </div>
      <p>{mode === 'crc' ? 'Good for accidental errors; unsafe against a deliberate attacker.' : mode === 'hmac' ? 'A digest now proves integrity and knowledge of the shared key.' : 'A fixed-size fingerprint represents a much larger input.'}</p>
    </div>
  )
}

function CollisionLab({ step = 0 }) {
  const harmless = ['H1', 'H2', 'H3', 'H4']
  const malicious = ['M1', 'M2', 'M3', 'M4']
  return (
    <div className="insx-collision">
      <div>{harmless.map((x, i) => <span key={x} className={i <= step ? 'active' : ''}>{x}: harmless variant</span>)}</div>
      <div className="insx-collision-core">hash search<br /><b>{step >= 3 ? 'match found' : 'comparing digests'}</b></div>
      <div>{malicious.map((x, i) => <span key={x} className={i <= step ? 'active bad' : ''}>{x}: malicious variant</span>)}</div>
    </div>
  )
}

function ProtocolFlow({ step = 0, rows }) {
  return (
    <div className="insx-protocol">
      {rows.map((row, i) => (
        <div key={`${row.from}-${row.label}-${i}`} className={i <= step ? 'visible' : ''}>
          <strong>{row.from}</strong>
          <span>{row.label}</span>
          <strong>{row.to}</strong>
        </div>
      ))}
    </div>
  )
}

function Lifecycle({ step = 0, items }) {
  return (
    <div className="insx-lifecycle">
      {items.map((item, i) => (
        <div key={item} className={i <= step ? 'active' : ''}>
          <span>{String(i + 1).padStart(2, '0')}</span>
          <strong>{item}</strong>
        </div>
      ))}
    </div>
  )
}

/* Certificate/PKI chain — now the living InsSecurityViz PkiChain (certificates
   travel the chain; trust indicators light progressively). The `step` prop is
   kept for call-site compatibility but the SVG self-animates its progression. */
function CertificateChain() {
  return <PkiChain />
}

function Matrix({ headers, rows }) {
  return (
    <div className="insx-matrix" style={{ '--cols': headers.length }}>
      {headers.map((h) => <strong key={h}>{h}</strong>)}
      {rows.flatMap((row, r) => row.map((cell, c) => <span key={`${r}-${c}`}>{cell}</span>))}
    </div>
  )
}

const TITLE_BEATS = {
  '02': { beat: 'Integrity', metaphor: 'Can we prove the data is genuine?' },
  '03': { beat: 'Identity', metaphor: 'Who are you — and are you active now?' },
  '04': { beat: 'Trust infrastructure', metaphor: 'How does the Internet know whom to trust?' },
  '05': { beat: 'Network defense', metaphor: 'The perimeter is under attack' },
}

function TitleSlide({ moduleNumber, title, subtitle }) {
  const story = TITLE_BEATS[moduleNumber] || { beat: 'Security', metaphor: title }
  return (
    <div className="title-hero ins-title-hero insx-title">
      <div>
        <p className="slide-kicker">INFORMATION AND NETWORK SECURITY</p>
        <h1>Module {moduleNumber}</h1>
        <p className="subtitle">{title}</p>
        <p className="lead">{subtitle}</p>
      </div>
      <div className="layout-visual">
        <InsHeroScene beat={story.beat} metaphor={story.metaphor} peak>
          <ModuleOpening module={moduleNumber} />
        </InsHeroScene>
      </div>
    </div>
  )
}

function StoryCards({ step = 0, cards }) {
  return (
    <div className="insx-card-grid">
      {cards.map((card, i) => (
        <article key={card.title} className={i <= step ? 'visible' : ''}>
          {card.icon}
          <strong>{card.title}</strong>
          <p>{card.text}</p>
        </article>
      ))}
    </div>
  )
}

function summarySlide(id, module, points) {
  return {
    id,
    kicker: 'Module summary',
    title: `${module} in One Security Story`,
    tone: 'ins-slide ins-peak',
    content: () => (
      <MissionLesson
        id={id}
        section="Module summary"
        title={module}
        lead="Every mechanism answers a specific attacker capability in Alice and Bob's communication story."
        items={points}
        visual={<AttackDefenseBoard steps={points.slice(0, 5)} />}
        takeaway="In exams, connect the primitive to the threat it is meant to stop, then draw the workflow."
        compose="hero"
        beat="Module map"
        metaphor={`${module}: threat → mechanism → outcome`}
        peak
      />
    ),
  }
}

const hmacRows = [
  { from: 'Alice', label: 'share secret key K with Bob', to: 'Bob' },
  { from: 'Alice', label: 'inner = H((K xor ipad) || M)', to: 'Hash' },
  { from: 'Alice', label: 'tag = H((K xor opad) || inner)', to: 'Bob' },
  { from: 'Bob', label: 'recompute tag and compare', to: 'Accept / reject' },
]

export const insModule2Slides = [
  { id: 'ins-m2-title', kicker: 'Information and Network Security', hideTitle: true, layout: 'full', tone: 'ins-slide', content: ({ step = 999 }) => <TitleSlide moduleNumber="02" title="Hash Functions and Related Applications" subtitle="From digital fingerprints to integrity and authentication." step={step} /> },
  { id: 'm2-journey', kicker: 'Learning journey', title: 'Message to Trusted Digest', content: <VisualFirst visual={<ProcessPath steps={['Message', 'Hash', 'Collision Resistance', 'Birthday Attack', 'Tiger', 'HMAC', 'Applications']} />} takeaway={<Takeaway>Hash functions compress information, but security depends on one-wayness and collision resistance.</Takeaway>} /> },
  ...[
    ['fingerprint-need', 'Why Do We Need a Fingerprint?', 'Alice has a large document; Bob needs a compact value that changes if the document changes.', ['Large input becomes small digest', 'Digest is quick to compare', 'Any changed message should produce a changed digest'], 'hash'],
    ['hash-definition', 'Cryptographic Hash Function', 'A hash maps an input of arbitrary size to a fixed-size output.', ['Input can be any length', 'Output length is fixed', 'The same input always gives the same digest'], 'hash'],
    ['compression-property', 'Compression Property', 'The digest length stays fixed even when the message grows.', ['10 bytes and 10 MB can both map to 256 bits', 'Compression guarantees collisions exist mathematically', 'Security asks that useful collisions remain hard to find'], 'hash'],
    ['efficiency', 'Efficiency Requirement', 'Hashing must be practical for normal files, protocol messages and password checks.', ['Easy to compute', 'Fast enough for protocols', 'Still costly to invert or collide'], 'hash'],
    ['one-way', 'One-Way Property', 'Given y = h(x), Eve should not be able to recover a useful x.', ['Bob can verify quickly', 'Eve cannot reverse the digest', 'Password storage relies on this asymmetry'], 'hash'],
    ['weak-collision', 'Weak Collision Resistance', 'Given x, finding x prime with h(x) = h(x prime) should be infeasible.', ['Protects a known document', 'Stops targeted replacement', 'Also called second-preimage resistance'], 'hash'],
    ['strong-collision', 'Strong Collision Resistance', 'Finding any two different messages with equal hash values should be infeasible.', ['Eve chooses both messages', 'No target message is fixed', 'Birthday attacks measure this strength'], 'hash'],
  ].map(([id, title, lead, items, mode], i) => ({
    id, kicker: 'Hash foundations', title, content: ({ step = 999 }) => (
      <MissionLesson
        id={id}
        section="Hash foundations"
        title={title}
        lead={lead}
        items={items}
        visual={teach(id, <HashMachine step={Math.min(step, 2)} mode={mode} />)}
        takeaway="A digest is useful only when it is easy to compute and hard to abuse."
        compose={composeAt(i)}
        beat={i === 0 ? 'Integrity' : i === 1 ? 'Fingerprint' : undefined}
        metaphor={i === 0 ? 'A large document becomes a compact, change-sensitive digest' : undefined}
        peak={id === 'fingerprint-need' || id === 'hash-definition'}
      />
    ),
  })),
  { id: 'hash-properties-summary', kicker: 'Properties', title: 'The Five Promises Work Together', content: ({ step = 999 }) => <VisualFirst visual={<StoryCards step={step} cards={[{ title: 'Any size input', text: 'Documents, passwords and packets can enter.', icon: <FileCheck2 {...icon} /> }, { title: 'Fixed output', text: 'The digest is compact and predictable in size.', icon: <Fingerprint {...icon} /> }, { title: 'Efficient', text: 'Honest users can compute it quickly.', icon: <CheckCircle2 {...icon} /> }, { title: 'One-way', text: 'Digest does not reveal the message.', icon: <LockKeyhole {...icon} /> }, { title: 'Collision resistant', text: 'Replacement messages are hard to find.', icon: <ShieldCheck {...icon} /> }]} />} takeaway={<Takeaway>Weakening any one promise can break an application built on hashes.</Takeaway>} /> },
  { id: 'avalanche-effect', kicker: 'Avalanche effect', title: 'One Bit Changes Many Digest Bits', tone: 'ins-slide ins-peak', content: ({ step = 999 }) => <VisualFirst lead="A secure design spreads a tiny input change across the internal state." visual={<InsHeroScene beat="Avalanche" metaphor="One bit flips → the fingerprint transforms" peak>{teach('avalanche-effect', <HashMachine step={step % 3} />)}</InsHeroScene>} takeaway={<Takeaway>Avalanche makes patterns hard to exploit and supports collision resistance.</Takeaway>} /> },
  { id: 'sign-digest', kicker: 'Digital signatures', title: 'Do Not Sign the Whole Mountain', tone: 'ins-slide ins-peak', content: ({ step = 999 }) => (
    <LessonColumn
      step={step}
      index={0}
      peak
      beat="Verification"
      metaphor="Sign the fingerprint, not the mountain"
      annotations={['hash', 'sign', 'verify', 'trust']}
      lead="Digital signatures normally sign the digest, not the entire message."
      items={['Efficient for large messages', 'Integrity depends on collision resistance', 'Bob recomputes h(M) before verification', 'A collision can turn this efficiency into an attack']}
      visual={<DigitalSignature />}
    />
  ) },
  ...[
    ['birthday-problem', 'The Birthday Problem', 'A shared birthday becomes likely much earlier than intuition says.', ['365 people are not required', 'About 23 people gives probability above one half', 'Pair comparisons grow rapidly'], ['People', 'Birthdays', 'Same birthday', 'Collision']],
    ['birthday-hash', 'Birthday Paradox Becomes Hash Collision Search', 'People map to messages; birthdays map to digest values.', ['Many candidate messages are generated', 'Each message receives a digest', 'A matching digest pair is the collision'], ['Messages', 'Hash outputs', 'Same digest', 'Collision']],
    ['work-factor', 'Generic Collision Work Factor', 'For an n-bit hash, collision work is about 2^(n/2), not 2^n.', ['128-bit output gives about 64-bit collision strength', 'Longer digests are required for collision resistance', 'Designers choose digest length from the attack model'], ['n-bit hash', '2^n outputs', '2^(n/2) search', 'Security level']],
  ].map(([id, title, lead, items, stages], i) => ({ id, kicker: 'Birthday attack', title, content: ({ step = 999 }) => <MissionLesson id={id} section="Birthday attack" title={title} lead={lead} items={items} visual={teach(id, <Ribbon step={step} stages={stages} attack={id !== 'birthday-problem'} />)} takeaway="Collision security is roughly half the digest size." attack={id !== 'birthday-problem'} compose={composeAt(i + 1)} beat={id === 'birthday-hash' ? 'Collision search' : undefined} metaphor={id === 'birthday-hash' ? 'Messages collide when digests match' : undefined} /> })),
  { id: 'signature-substitution', kicker: 'Birthday attack', title: 'How a Collision Can Abuse a Signature', tone: 'ins-slide ins-peak', content: ({ step = 999 }) => <VisualFirst lead="Trudy prepares harmless and malicious variants until one pair collides." visual={<InsHeroScene beat="Compromise" metaphor="Same digest · same signature · wrong document" peak annotations={['harmless', 'malicious', 'match', 'abuse']}><CollisionLab step={step} /></InsHeroScene>} takeaway={<Takeaway>If Alice signs the harmless digest, the same signature can validate the malicious message.</Takeaway>} /> },
  { id: 'birthday-defense', kicker: 'Defence', title: 'Birthday-Attack Defence', content: ({ step = 999 }) => <LessonColumn step={step} index={2} lead="Use sufficiently long hash outputs and avoid protocols that let attackers choose both colliding messages." items={['Prefer modern digest lengths', 'Add context to what is signed', 'Reject legacy weak hashes']} visual={teach('birthday-defense', <Ribbon step={step} stages={['Long digest', 'Domain separation', 'Careful signing', 'Resistant design']} />)} /> },
  ...[
    ['simple-hashes', 'Non-Cryptographic Hashes', 'Simple additive hashes can detect some mistakes but fail against Eve.', ['Byte sums are easy to collide', 'Ordering can be ignored', 'Attackers can repair the checksum after changing data'], 'crc'],
    ['weighted-sum', 'Weighted Byte-Sum Hash', 'Weights add ordering information, but collisions remain easy to construct.', ['Better than plain sum', 'Still linear and predictable', 'Not a cryptographic integrity mechanism'], 'crc'],
    ['crc-not-crypto', 'CRC Is for Accidental Errors', 'CRC uses polynomial division and is excellent for noise detection, not adversarial integrity.', ['Detects common transmission errors', 'Designed for random faults', 'Eve can modify data and recompute CRC'], 'crc'],
    ['crc-worked', 'CRC Worked Visual', 'Treat bits as a polynomial, divide by a generator and append the remainder.', ['Data polynomial', 'Generator polynomial', 'Remainder becomes check bits'], 'crc'],
  ].map(([id, title, lead, items, mode], i) => ({ id, kicker: 'Checksums', title, content: ({ step = 999 }) => <MissionLesson id={id} section="Checksums" title={title} lead={lead} items={items} visual={teach(id, <HashMachine step={Math.min(step, 2)} mode={mode} />)} takeaway="Integrity against intelligent attackers needs a cryptographic construction." attack compose={composeAt(i + 2)} /> })),
  ...[
    ['tiger-intro', 'Introduction to Tiger Hash', 'Tiger is a practical hash design built around 64-bit operations.', ['512-bit message blocks', '192-bit output', 'Three 64-bit state words', 'Designed for 64-bit processors']],
    ['tiger-structure', 'Tiger High-Level Structure', 'Each block passes through rounds that mix message words into the state.', ['512-bit block enters', '24 rounds process the block', '192-bit state is updated']],
    ['tiger-rounds', 'Tiger Outer and Inner Rounds', 'The round structure repeatedly combines state words, message sub-blocks and S-box lookups.', ['F0 to F7 process 64-bit sub-blocks', 'S-boxes add nonlinearity', 'Passes spread influence across state']],
    ['tiger-key-schedule', 'Tiger Key Schedule', 'Message words are modified between passes so repeated structure does not stay aligned.', ['Schedule changes message words', 'Different passes see different material', 'Diffusion increases across rounds']],
    ['tiger-avalanche', 'Tiger Avalanche Design', 'Small input changes should propagate through S-boxes, arithmetic and state updates.', ['Byte selection enters S-box', 'State words change', 'Later rounds amplify the difference']],
  ].map(([id, title, lead, items], i) => ({ id, kicker: 'Tiger hash', title, content: ({ step = 999 }) => <MissionLesson id={id} section="Tiger hash" title={title} lead={lead} items={items} visual={teach(id, <Lifecycle step={step} items={['Block', 'Pass 1', 'Key schedule', 'Pass 2', 'Pass 3', 'Digest']} />)} takeaway="Exam takeaway: Tiger is explained by block input, state words, rounds, S-box mixing, key schedule and digest output." compose={composeAt(i + 3)} /> })),
  { id: 'hash-not-auth', kicker: 'Authentication gap', title: 'A Hash Alone Does Not Prove Who Created the Message', content: ({ step = 999 }) => <LessonColumn step={step} index={3} beat="Attack" metaphor="Anyone can recompute a plain hash — including Eve" lead="Anyone can compute a plain hash, including the attacker." items={['Hash checks accidental change', 'It does not identify Alice', 'Eve can replace both message and digest', 'A secret key must enter the construction']} visual={teach('hash-not-auth', <Ribbon step={step} stages={['Alice: M,h(M)', 'Eve changes M', 'Eve recomputes h(M)', 'Bob is fooled']} attack />)} /> },
  { id: 'hmac-structure', kicker: 'HMAC', title: 'HMAC Adds a Shared Secret Key', tone: 'ins-slide ins-peak', content: ({ step = 999 }) => (
    <LessonColumn
      step={step}
      index={0}
      peak
      beat="Keyed integrity"
      metaphor="A shared secret enters the fingerprint machine"
      annotations={['share K', 'inner hash', 'outer hash', 'verify']}
      lead={<code>HMAC(K,M) = H((K xor opad) || H((K xor ipad) || M))</code>}
      items={['ipad = 0x36 repeated', 'opad = 0x5C repeated', 'Inner hash binds key and message', 'Outer hash protects the final tag']}
      visual={teach('hmac-structure', <ProtocolFlow step={step} rows={hmacRows} />)}
    />
  ) },
  { id: 'hmac-animation', kicker: 'HMAC', title: 'Inner Hash, Then Outer Hash', content: ({ step = 999 }) => <VisualFirst lead="Each reveal adds a visible construction step." visual={<InsHeroScene beat="Construction" metaphor="Inner bind → outer protect">{teach('hmac-animation', <HashMachine step={Math.min(step, 2)} mode="hmac" />)}</InsHeroScene>} takeaway={<Takeaway>HMAC avoids simple h(K || M) weaknesses by using separated inner and outer keyed hashes.</Takeaway>} /> },
  ...[
    ['hash-uses', 'Uses of Hash Functions', ['Authentication support', 'Message integrity', 'Digital signatures', 'Fingerprinting and error checks']],
    ['sealed-bidding', 'Online Sealed Bidding', ['Bid with random value', 'Publish hash commitment', 'Reveal after deadline', 'Verify the same hash']],
    ['bidding-forward-search', 'Forward-Search Limitation', ['Predictable bids can be guessed', 'Hash every possible low-value bid', 'Add randomness to the committed message']],
    ['spam-pow', 'Spam Reduction with Proof of Work', ['Sender chooses nonce R', 'Hash must begin with N zero bits', 'Receivers verify cheaply']],
    ['secret-sharing', 'Secret Sharing', ['No participant alone knows the secret', 'Threshold group reconstructs it', 'Useful for escrow and recovery']],
    ['visual-cryptography', 'Visual Cryptography', ['Split image into meaningless shares', 'Each share hides the secret', 'Overlay reveals the message']],
    ['random-numbers', 'Random Numbers in Cryptography', ['Unpredictability matters', 'Physical and behavioural sources help', 'Poor shuffles can expose future cards']],
    ['information-hiding', 'Information Hiding', ['Steganography hides existence', 'Watermarking embeds ownership', 'LSB changes can be visually invisible']],
  ].map(([id, title, items], i) => ({ id, kicker: 'Hash applications', title, content: ({ step = 999 }) => (
    i % 3 === 1
      ? <VisualFirst lead="Hash functions become building blocks in larger security stories." visual={teach(id, <StoryCards step={step} cards={items.map((text, j) => ({ title: text.split(' ').slice(0, 2).join(' '), text, icon: j % 2 ? <ShieldCheck {...icon} /> : <Fingerprint {...icon} /> }))} />)} takeaway={<Takeaway>Exam takeaway: explain the hash primitive first, then the larger protocol that uses it.</Takeaway>} />
      : <MissionLesson id={id} section="Hash applications" title={title} lead="Hash functions become building blocks in larger security stories." items={items} visual={teach(id, <StoryCards step={step} cards={items.map((text, j) => ({ title: text.split(' ').slice(0, 2).join(' '), text, icon: j % 2 ? <ShieldCheck {...icon} /> : <Fingerprint {...icon} /> }))} />)} takeaway="Exam takeaway: explain the hash primitive first, then the larger protocol that uses it." compose={composeAt(i)} />
  ) })),
  summarySlide('m2-summary', 'Hash Functions', ['Hash Functions', 'Collisions', 'Birthday Attack', 'Tiger', 'HMAC', 'Security Applications']),
  { id: 'm2-common-mistakes', kicker: 'Exam guardrails', title: 'Common Mistakes', content: ({ step = 999 }) => <LessonColumn step={step} index={4} items={['Calling CRC a cryptographic hash', 'Forgetting strong vs weak collision resistance', 'Saying 128-bit hash gives 128-bit collision security', 'Using h(K || M) when HMAC is required']} visual={<Ribbon step={step} stages={['CRC', 'Plain hash', 'HMAC', 'Signature']} attack />} /> },
  { id: 'm2-exam-focus', kicker: 'Exam focus', title: 'What to Practice', content: ({ step = 999 }) => <LessonColumn step={step} index={1} items={['Define all hash properties precisely', 'Explain birthday attack on signatures', 'Draw Tiger at high level', 'Write and explain the HMAC construction']} visual={<Lifecycle step={step} items={['Definitions', 'Birthday math', 'Attack flow', 'HMAC formula']} />} /> },
  { id: 'm2-end', kicker: 'End', title: 'From Fingerprint to Authenticated Message', content: <VisualFirst visual={<InsHeroScene beat="Outcome" metaphor="Fingerprint → keyed proof → trusted verification"><Ribbon step={3} stages={['Message', 'Digest', 'HMAC', 'Trusted verification']} /></InsHeroScene>} takeaway={<Takeaway>Module 3 asks the next question: how does Bob know Alice is active now?</Takeaway>} /> },
]

const freshnessRows = [
  { from: 'Bob', label: 'nonce NB', to: 'Alice' },
  { from: 'Alice', label: 'protected response f(K, NB)', to: 'Bob' },
  { from: 'Bob', label: 'verify fresh challenge', to: 'Accept' },
]

export const insModule3Slides = [
  { id: 'ins-m3-title', kicker: 'Information and Network Security', hideTitle: true, layout: 'full', tone: 'ins-slide', content: ({ step = 999 }) => <TitleSlide moduleNumber="03" title="Entity Authentication" subtitle="Proving identity and proving that the claimant is active now." step={step} /> },
  { id: 'm3-journey', kicker: 'Learning journey', title: 'Identity Needs Freshness', content: <VisualFirst visual={<ProcessPath steps={['Randomness', 'Freshness', 'Identity', 'Passwords', 'Dynamic Passwords', 'Zero Knowledge']} />} takeaway={<Takeaway>Authentication at one instant is not the same as a protected session.</Takeaway>} /> },
  ...[
    ['auth-problem', 'Authentication Problem', 'Bob receives a message claiming to be from Alice.', ['Identity claim alone is not proof', 'Eve may replay an old login', 'Bob needs evidence Alice is active now'], true],
    ['randomness-matters', 'Why Randomness Matters', 'Random values stop attackers from predicting protocol choices.', ['Keys, salts and IVs', 'Nonces and challenges', 'Probabilistic public-key systems'], false],
    ['what-randomness', 'What Is Randomness?', 'A useful random source is unpredictable and has no exploitable structure.', ['10101010 can occur', '11111111 can occur', 'Uniform sources make every equal-length string equally likely'], false],
    ['statistical-properties', 'Statistical Properties', 'Random-looking output should pass balance and pattern-frequency checks.', ['Rough balance of zeros and ones', 'No repeated exploitable patterns', 'Statistical tests do not prove secrecy'], false],
    ['hardware-random', 'Hardware Random Sources', 'Physical phenomena can provide non-deterministic input.', ['Radioactive decay', 'Thermal and electrical noise', 'Oscillator instability and quantum measurements'], false],
    ['software-observed-random', 'Software-Observed Random Sources', 'Systems collect unpredictable timing from user and machine events.', ['Keystroke timing and mouse movement', 'Interrupt and disk timing', 'Network statistics'], false],
    ['nondeterministic-limits', 'Limits of Non-Deterministic Generators', 'True sources can be costly, slow or hard to reproduce for testing.', ['Special hardware may be needed', 'Rate can be limited', 'Health checks are required'], false],
    ['deterministic-generator', 'Deterministic Generator', 'A seed expands into a pseudorandom stream.', ['Seed enters generator', 'Stream appears random', 'Same seed gives same stream'], false],
    ['seed-security', 'Seed Security', 'If Eve learns the seed, future output becomes predictable.', ['Seed must be secret', 'Seed must have enough entropy', 'Poor seeding breaks strong generators'], true],
    ['prng-comparison', 'Random vs Pseudorandom', 'Systems use both: non-deterministic input to seed fast deterministic expansion.', ['Random source gives entropy', 'PRNG gives speed', 'Security depends on seed and algorithm'], false],
    ['replay-attack', 'Replay Attack Story', 'Eve records a valid message and sends it later.', ['Old proof was once valid', 'Bob sees correct credentials', 'Freshness is missing'], true],
    ['freshness', 'What Is Freshness?', 'Freshness assures Bob that this message is new, not replayed.', ['Clock value', 'Sequence number', 'Nonce challenge'], false],
    ['fresh-vs-live', 'Freshness vs Liveness', 'A fresh message does not always prove the sender remains active after authentication.', ['Fresh evidence at an instant', 'Session can be hijacked later', 'Use session keys to extend protection'], true],
  ].map(([id, title, lead, items, attack], i) => ({
    id,
    kicker: 'Entity authentication',
    title,
    content: ({ step = 999 }) => (
      i % 4 === 2
        ? (
          <VisualFirst
            lead={lead}
            visual={teach(id, <Ribbon step={step} stages={attack ? ['Alice', 'Old proof', 'Eve replay', 'Bob'] : ['Source', 'Security value', 'Verifier check', 'Decision']} attack={attack} />)}
            takeaway={<Takeaway>{items[0]}</Takeaway>}
          />
        )
        : (
          <LessonColumn
            step={step}
            index={i}
            peak={id === 'auth-problem' || id === 'replay-attack'}
            beat={id === 'auth-problem' ? 'Identity' : id === 'replay-attack' ? 'Attack' : id === 'freshness' ? 'Freshness' : undefined}
            metaphor={id === 'auth-problem' ? 'A name alone is not proof' : id === 'replay-attack' ? 'Yesterday’s proof is not today’s proof' : undefined}
            lead={lead}
            items={items}
            visual={teach(id, <Ribbon step={step} stages={attack ? ['Alice', 'Old proof', 'Eve replay', 'Bob'] : ['Source', 'Security value', 'Verifier check', 'Decision']} attack={attack} />)}
          />
        )
    ),
  })),
  { id: 'clock-freshness', kicker: 'Freshness', title: 'Clock-Based Freshness', content: ({ step = 999 }) => <LessonColumn step={step} index={0} beat="Timeline" metaphor="Timestamp inside the acceptance window" items={['Alice sends timestamp TA', 'Bob checks against TB', 'Acceptance window handles delay', 'Timestamp must be integrity protected']} visual={<ProtocolFlow step={step} rows={[{ from: 'Alice', label: 'M, TA', to: 'Bob' }, { from: 'Bob', label: 'compare TA with TB', to: 'Clock window' }, { from: 'Bob', label: 'inside window', to: 'Accept' }, { from: 'Bob', label: 'outside window', to: 'Reject' }]} />} /> },
  { id: 'clock-problems', kicker: 'Freshness', title: 'Clock-Based Problems', content: ({ step = 999 }) => <VisualFirst visual={<StoryCards step={step} cards={['Existence of clocks', 'Synchronisation', 'Communication delay', 'Timestamp integrity'].map((text) => ({ title: text, text, icon: <RotateCcw {...icon} /> }))} />} takeaway={<Takeaway>Clock freshness is simple only when clock management is trustworthy.</Takeaway>} /> },
  { id: 'sequence-number', kicker: 'Freshness', title: 'Sequence-Number Freshness', content: ({ step = 999 }) => <LessonColumn step={step} index={2} items={['Numbers must increase', 'Bob stores last accepted value', 'Old numbers are rejected', 'Integrity protection is still required']} visual={<ProtocolFlow step={step} rows={[{ from: 'Stored', label: 'last value = 17', to: 'Bob' }, { from: 'Alice', label: 'receive 18', to: 'Accept' }, { from: 'Eve', label: 'replay 16', to: 'Reject' }, { from: 'Bob', label: 'store 18', to: 'Next check' }]} />} /> },
  { id: 'sequence-limits', kicker: 'Freshness', title: 'Sequence-Number Limitations', content: ({ step = 999 }) => <VisualFirst visual={<StoryCards step={step} cards={['State storage', 'Message loss', 'Reordering', 'Counter wraparound', 'Integrity protection'].map((text) => ({ title: text, text, icon: <Database {...icon} /> }))} />} takeaway={<Takeaway>Sequence numbers work best when state and ordering are manageable.</Takeaway>} /> },
  { id: 'nonce-challenge', kicker: 'Freshness', title: 'Nonce-Based Challenge Response', tone: 'ins-slide ins-peak', content: ({ step = 999 }) => <LessonColumn step={step} index={0} peak beat="Challenge" metaphor="Bob asks a question only Alice can answer now" annotations={['nonce', 'response', 'verify']} lead="A nonce is a number used once. Bob chooses a fresh unpredictable challenge." items={['The challenge could not be predicted', 'Alice proves knowledge of K over NB', 'Replay of an old response fails']} visual={teach('nonce-challenge', <ProtocolFlow step={step} rows={freshnessRows} />)} /> },
  { id: 'freshness-comparison', kicker: 'Comparison', title: 'Freshness Mechanisms Compared', content: <VisualFirst visual={<Matrix headers={['Mechanism', 'Synchronisation', 'Passes', 'Special requirement']} rows={[['Clock', 'Yes', 'One', 'Clock window'], ['Sequence', 'No', 'One', 'Stored state'], ['Nonce', 'No', 'Two+', 'Random generator']]} />} takeaway={<Takeaway>Choose freshness based on state, clock and message-pass constraints.</Takeaway>} /> },
  ...[
    ['entity-auth-definition', 'What Is Entity Authentication?', 'Entity authentication proves identity with freshness.', ['Identity: who is claiming?', 'Freshness: is the claim current?', 'Verification: should access begin?']],
    ['unilateral-mutual', 'Unilateral vs Mutual Authentication', 'Sometimes only Bob authenticates Alice; sometimes both sides must prove identity.', ['Unilateral: one claimant', 'Mutual: both parties', 'Mutual authentication blocks fake servers']],
    ['atm-hijack', 'Authentication Exists at an Instant', 'A login can be valid and the later session can still be hijacked.', ['ATM user authenticates', 'Attacker takes over later', 'Session protection must continue']],
    ['session-key-extension', 'Extending Authentication with a Session Key', 'Authentication should establish keys for protected communication afterward.', ['Authenticate', 'Establish session key', 'Protect the session']],
    ['applications-auth', 'Applications of Entity Authentication', 'Authentication gates access and enables larger cryptographic protocols.', ['Access control', 'Network login', 'Key-establishment protocols']],
  ].map(([id, title, lead, items], i) => ({ id, kicker: 'Identity', title, content: ({ step = 999 }) => <LessonColumn step={step} index={i + 1} peak={id === 'atm-hijack'} beat={id === 'atm-hijack' ? 'Session risk' : undefined} metaphor={id === 'atm-hijack' ? 'Authenticated once · hijacked later' : undefined} lead={lead} items={items} visual={teach(id, <Ribbon step={step} stages={items} attack={id === 'atm-hijack'} />)} /> })),
  { id: 'identity-factors', kicker: 'Identity factors', title: 'Three Ways to Prove Identity', tone: 'ins-slide ins-peak', content: ({ step = 999 }) => <VisualFirst visual={<InsHeroScene beat="Identity layers" metaphor="Have · Are · Know — factors that fail independently" peak><StoryCards step={step} cards={[{ title: 'Something you have', text: 'Token, smart card or smart token.', icon: <KeyRound {...icon} /> }, { title: 'Something you are', text: 'Static or dynamic biometric.', icon: <Fingerprint {...icon} /> }, { title: 'Something you know', text: 'Password, PIN or passphrase.', icon: <UserCheck {...icon} /> }]} /></InsHeroScene>} takeaway={<Takeaway>Combining factors improves security when the factors fail independently.</Takeaway>} /> },
  ...[
    ['password-popular', 'Why Passwords Remain Popular', ['Simple', 'Familiar', 'Cheap to deploy']],
    ['password-weaknesses', 'Password Weaknesses', ['Short or predictable choices', 'Repeatability across sites', 'Phishing and shoulder surfing', 'Database compromise']],
    ['password-attacks', 'Password Attacks', ['Shoulder surfing observes entry', 'Phishing steals the secret', 'Network interception captures weak exchanges', 'Dictionary search exploits human choices']],
    ['password-storage', 'Password Database Problem', ['Plaintext storage exposes all users', 'Hash storage reduces direct exposure', 'Salt stops equal-password equality leaks']],
    ['hash-salt-storage', 'Hash-Based Storage with Salt', ['User password', 'Unique salt', 'One-way hash', 'Stored digest and salt']],
    ['unix-password', 'UNIX Password Protection Example', ['One-way repeated construction', 'Salted stored value', 'Introductory lesson: never store the password itself']],
  ].map(([id, title, items], i) => ({
    id,
    kicker: 'Passwords',
    title,
    content: ({ step = 999 }) => (
      i % 3 === 0
        ? <MissionLesson id={id} section="Passwords" title={title} lead="Passwords identify by knowledge, but must be handled as high-risk secrets." items={items} visual={teach(id, <HashMachine step={Math.min(step, 2)} />)} takeaway="Never store the password itself — store a salted one-way digest." compose={composeAt(i)} peak={id === 'hash-salt-storage'} beat={id === 'hash-salt-storage' ? 'Storage' : undefined} metaphor={id === 'hash-salt-storage' ? 'Password → salt → digest' : undefined} attack={id === 'password-attacks' || id === 'password-weaknesses'} />
        : <LessonColumn step={step} index={i} lead="Passwords identify by knowledge, but must be handled as high-risk secrets." items={items} visual={teach(id, <HashMachine step={Math.min(step, 2)} />)} />
    ),
  })),
  { id: 'dynamic-passwords', kicker: 'Dynamic passwords', title: 'A Different Response for Each Attempt', content: ({ step = 999 }) => <LessonColumn step={step} index={3} beat="Possession + knowledge" metaphor="The response changes every login" items={['Local PIN adds a knowledge check', 'Token contains a secret key', 'Response changes every login', 'Replay resistance improves']} visual={<ProtocolFlow step={step} rows={[{ from: 'User', label: 'local PIN unlocks token', to: 'Token' }, { from: 'Server', label: 'challenge / time / sequence', to: 'Token' }, { from: 'Token', label: 'response f(K, value)', to: 'Server' }, { from: 'Server', label: 'verify response', to: 'Accept' }]} />} /> },
  { id: 'full-dynamic-protocol', kicker: 'Dynamic passwords', title: 'Full Dynamic-Password Protocol', tone: 'ins-slide ins-peak', content: ({ step = 999 }) => <LessonColumn step={step} index={0} peak beat="Access gate" metaphor="Secret stays in the token · network sees only a fresh response" annotations={['PIN', 'challenge', 'response', 'verify', 'access']} lead="The reusable secret stays inside the token; the network sees only a changing response." items={['PIN protects local token use', 'Fresh input prevents replay', 'Shared key K is never sent', 'Server verifies by recomputing', 'The method combines possession and knowledge factors']} visual={<AuthenticationFlow />} /> },
  { id: 'token-variants', kicker: 'Dynamic passwords', title: 'Practical Token Variants', content: ({ step = 999 }) => <VisualFirst visual={<StoryCards step={step} cards={['Clock-based', 'Sequence-based', 'Nonce-based'].map((text) => ({ title: text, text: `${text} token response`, icon: <Smartphone {...icon} /> }))} />} takeaway={<Takeaway>Token choice depends on clock sync, state and protocol round trips.</Takeaway>} /> },
  ...[
    ['zk-motivation', 'Zero-Knowledge Motivation', 'Alice should prove she knows a secret without revealing it.', ['No reusable secret crosses the network', 'Repeated rounds build confidence', 'Verifier learns only validity']],
    ['prover-verifier', 'Prover and Verifier', 'The prover demonstrates knowledge; the verifier checks the demonstration.', ['Prover: Alice', 'Verifier: Bob', 'Secret remains hidden']],
    ['zk-cave', 'Cave Analogy', 'Bob asks Alice to exit from a random side of a cave path.', ['Alice enters unseen', 'Bob chooses left or right', 'Alice succeeds only if she knows the secret path']],
    ['zk-repetition', 'Zero-Knowledge Repetition', 'One lucky answer is possible; many successful rounds become convincing.', ['Round confidence increases', 'Cheating probability shrinks', 'Secret is still not disclosed']],
    ['zk-properties', 'Zero-Knowledge Properties', 'A proper mechanism has completeness, soundness and zero knowledge.', ['Completeness: honest prover succeeds', 'Soundness: cheater rarely succeeds', 'Zero knowledge: no secret is revealed']],
  ].map(([id, title, lead, items], i) => ({
    id,
    kicker: 'Zero knowledge',
    title,
    content: ({ step = 999 }) => (
      i % 2 === 0
        ? <LessonColumn step={step} index={i} peak={id === 'zk-cave'} beat={id === 'zk-cave' ? 'Proof without reveal' : undefined} metaphor={id === 'zk-cave' ? 'Exit the side Bob names — only if you know the path' : undefined} lead={lead} items={items} visual={teach(id, <Ribbon step={step} stages={['Prover', 'Challenge', 'Response', 'Verifier']} />)} />
        : <VisualFirst lead={lead} visual={teach(id, <Ribbon step={step} stages={['Prover', 'Challenge', 'Response', 'Verifier']} />)} takeaway={<Takeaway>{items[items.length - 1]}</Takeaway>} />
    ),
  })),
  summarySlide('m3-summary', 'Entity Authentication', ['Randomness', 'Freshness', 'Identity', 'Passwords', 'Dynamic Passwords', 'Zero Knowledge']),
  { id: 'm3-common-mistakes', kicker: 'Exam guardrails', title: 'Common Mistakes', content: ({ step = 999 }) => <LessonColumn step={step} index={4} items={['Treating freshness and liveness as identical', 'Forgetting integrity on timestamps and counters', 'Confusing password hashing with encryption', 'Saying zero knowledge reveals part of the secret']} visual={<Ribbon step={step} stages={['Freshness', 'Liveness', 'Authentication', 'Session security']} attack />} /> },
  { id: 'm3-exam-focus', kicker: 'Exam focus', title: 'What to Practice', content: ({ step = 999 }) => <LessonColumn step={step} index={2} items={['Compare clock, sequence number and nonce freshness', 'Draw challenge-response authentication', 'Explain salt and password database protection', 'State completeness, soundness and zero knowledge']} visual={<Lifecycle step={step} items={['Random sources', 'Freshness methods', 'Passwords', 'Zero knowledge']} />} /> },
  { id: 'm3-end', kicker: 'End', title: 'Identity Is Proven Now; Keys Must Be Managed Next', content: <VisualFirst visual={<InsHeroScene beat="Handoff" metaphor="Identity proven · keys must now be managed"><Ribbon step={3} stages={['Alice proves identity', 'Bob verifies freshness', 'Session key begins', 'Managed keys needed']} /></InsHeroScene>} takeaway={<Takeaway>Module 4 follows the life of the keys that make these protocols trustworthy.</Takeaway>} /> },
]

export const insModule4Slides = [
  { id: 'ins-m4-title', kicker: 'Information and Network Security', hideTitle: true, layout: 'full', tone: 'ins-slide', content: ({ step = 999 }) => <TitleSlide moduleNumber="04" title="Key Management and Public-Key Management" subtitle="Strong algorithms fail when keys are weak, exposed, lost or misused." step={step} /> },
  { id: 'm4-journey', kicker: 'Learning journey', title: 'The Key Lifecycle', content: <VisualFirst visual={<ProcessPath steps={['Generate', 'Establish', 'Store', 'Use', 'Change', 'Archive', 'Destroy', 'Certify']} />} takeaway={<Takeaway>Key management is the operational discipline around cryptographic strength.</Takeaway>} /> },
  ...[
    ['strong-algorithm-fail', 'The Strongest Algorithm Can Still Fail', ['AES can be strong', 'A copied key can be fatal', 'Management is part of the security boundary']],
    ['what-key-management', 'What Is Key Management?', ['Secure administration of cryptographic keys', 'Controls across people, process and technology', 'Policies for every lifecycle stage']],
    ['management-controls', 'Key Management Controls', ['Technical controls', 'Process controls', 'Environmental controls', 'Human controls']],
  ].map(([id, title, items], i) => ({ id, kicker: 'Key management', title, content: ({ step = 999 }) => <LessonColumn step={step} index={i} peak={id === 'strong-algorithm-fail'} beat={id === 'strong-algorithm-fail' ? 'Trust boundary' : undefined} metaphor={id === 'strong-algorithm-fail' ? 'A strong cipher with a stolen key is already lost' : undefined} lead="Security follows the key, not just the cipher name." items={items} visual={teach(id, <Ribbon step={step} stages={['Algorithm', 'Key', 'Management', 'Security']} attack={id === 'strong-algorithm-fail'} />)} /> })),
  { id: 'key-lifecycle', kicker: 'Lifecycle', title: 'Key Lifecycle Overview', tone: 'ins-slide ins-peak', content: ({ step = 999 }) => <VisualFirst visual={<InsHeroScene beat="Lifecycle" metaphor="Birth → use → retirement of cryptographic trust" peak annotations={['generate', 'establish', 'store', 'use', 'destroy']}>{teach('key-lifecycle', <Lifecycle step={step} items={['Generation', 'Establishment', 'Storage', 'Usage', 'Change', 'Archival', 'Destruction']} />)}</InsHeroScene>} takeaway={<Takeaway>Each stage creates different exposure and assurance questions.</Takeaway>} /> },
  ...[
    ['key-generation', 'Key Generation', ['Use secure random generation', 'Meet algorithm-specific constraints', 'Protect generated material immediately']],
    ['key-establishment', 'Key Establishment', ['Get the right key to the right entities', 'Use agreement or distribution', 'Authenticate the establishment process']],
    ['key-storage', 'Key Storage, Backup and Archival', ['Store encrypted or inside protected hardware', 'Back up recovery-critical keys', 'Archive only when future decryption is required']],
    ['key-usage-change', 'Key Usage and Key Change', ['Use keys only for assigned purpose', 'Change keys before exposure grows too large', 'Separate encryption and MAC keys']],
    ['key-destruction', 'Key Destruction', ['Erase keys when no longer needed', 'Destroy all recoverable copies', 'Record ceremonies where policy requires it']],
    ['secrecy-purpose', 'Fundamental Requirements', ['Secrecy of keys', 'Assurance of purpose', 'Purpose includes entity, algorithm and usage restriction']],
    ['environment-dependence', 'Environment Shapes the System', ['Banking needs audit and ceremony', 'Military may require strict compartmenting', 'Home systems need usability']],
    ['key-length-tradeoff', 'Key Length and Lifetime', ['Longer keys increase attack cost', 'Longer keys can cost more to process', 'Cryptoperiod limits exposure time']],
    ['why-expire', 'Why Keys Expire', ['Limit damage after compromise', 'Reduce management-failure exposure', 'Prepare for stronger future attacks']],
  ].map(([id, title, items], i) => ({
    id,
    kicker: 'Lifecycle detail',
    title,
    content: ({ step = 999 }) => (
      i % 3 === 1
        ? <VisualFirst lead={`${title} is a security decision, not clerical housekeeping.`} visual={teach(id, <Lifecycle step={step} items={items} />)} takeaway={<Takeaway>{items[0]}</Takeaway>} />
        : <MissionLesson id={id} section="Lifecycle detail" title={title} lead={`${title} is a security decision, not clerical housekeeping.`} items={items} visual={teach(id, <Lifecycle step={step} items={items} />)} takeaway="Security follows the key across every operational stage." compose={composeAt(i)} />
    ),
  })),
  { id: 'key-derivation', kicker: 'Generation', title: 'Key Derivation and Separation', tone: 'ins-slide ins-peak', content: ({ step = 999 }) => <LessonColumn step={step} index={0} peak beat="Separation" metaphor="One base key → many purpose-bound keys" annotations={['encrypt', 'MAC', 'derive', 'policy']} items={['Derivation is efficient', 'Key separation prevents cross-protocol misuse', 'Password-based derivation slows guessing', 'Salt blocks precomputed lookup']} visual={<ProtocolFlow step={step} rows={[{ from: 'Base key K', label: 'K1 = h(K || 0)', to: 'Encryption key' }, { from: 'Base key K', label: 'K2 = h(K || 1)', to: 'MAC key' }, { from: 'Password', label: 'salt + iteration count', to: 'Derived key' }, { from: 'Policy', label: 'different purpose', to: 'different key' }]} />} /> },
  { id: 'key-components', kicker: 'Generation', title: 'Key Generation from Components', content: ({ step = 999 }) => <LessonColumn step={step} index={3} lead="No one component needs to reveal the final key." items={['XOR combination follows one-time-pad intuition', 'Two components reveal nothing about the missing one', 'Threshold generation generalises this idea', 'Any k of n shares may reconstruct']} visual={<ProtocolFlow step={step} rows={[{ from: 'Alice', label: 'KA', to: 'Combiner' }, { from: 'Bob', label: 'KB', to: 'Combiner' }, { from: 'Charlie', label: 'KC', to: 'Combiner' }, { from: 'Combiner', label: 'K = KA xor KB xor KC', to: 'Final key' }]} />} /> },
  ...[
    ['direct-symmetric-generation', 'Direct Symmetric-Key Generation', ['Secure random generator creates K', 'K must be protected immediately', 'Distribution remains the hard part']],
    ['easy-establishment-cases', 'Easy Establishment Cases', ['Local key entry for small systems', 'Public key can be sent openly', 'Predistribution works in controlled environments']],
    ['public-key-pair', 'Public-Key-Pair Generation', ['Algorithm-specific constraints matter', 'Private key must remain secret', 'Public key needs authentic binding']],
    ['establishment-problem', 'Key Establishment Problem', ['How does a secret key reach both endpoints?', 'Local entry works only in small systems', 'Protocols must authenticate the result']],
    ['agreement-distribution', 'Key Agreement vs Key Distribution', ['Agreement: both contribute to the key', 'Distribution: trusted party supplies it', 'Both need authentication']],
    ['key-hierarchy', 'Key Hierarchy Concept', ['Master key protects key-encrypting keys', 'Key-encrypting key protects data/session keys', 'Lower-level keys change more often']],
    ['three-level-hierarchy', 'Three-Level Key Hierarchy', ['Master key', 'Key-encrypting key', 'Data or session key']],
    ['hierarchy-behaviour', 'Key Hierarchy Behaviour', ['Top-level keys live longer', 'Lower-level keys face more exposure', 'Compromise should stay local']],
    ['hsm-master', 'HSM Protection for Master Keys', ['Master keys deserve strongest protection', 'Hardware limits extraction', 'Operations occur inside the protected boundary']],
    ['scaling-problem', 'Pairwise-Key Scaling Problem', ['100 users can require 4,950 pairwise keys', 'Manual distribution becomes impossible', 'Trusted centres reduce storage']],
  ].map(([id, title, items], i) => ({
    id,
    kicker: 'Symmetric key systems',
    title,
    content: ({ step = 999 }) => (
      i % 3 === 2
        ? <VisualFirst visual={teach(id, <Lifecycle step={step} items={items} />)} takeaway={<Takeaway>{items[items.length - 1]}</Takeaway>} />
        : <LessonColumn step={step} index={i} peak={id === 'key-hierarchy' || id === 'scaling-problem'} beat={id === 'key-hierarchy' ? 'Trust layers' : id === 'scaling-problem' ? 'Scale' : undefined} metaphor={id === 'key-hierarchy' ? 'Master keys protect the keys that protect the data' : id === 'scaling-problem' ? 'Pairwise keys explode with users' : undefined} items={items} visual={teach(id, <Lifecycle step={step} items={items} />)} />
    ),
  })),
  { id: 'trusted-key-centre', kicker: 'Key centre', title: 'Translation and Dispatch', tone: 'ins-slide ins-peak', content: ({ step = 999 }) => <LessonColumn step={step} index={0} peak beat="Trusted centre" metaphor="One long-term centre key per user · session keys translate through trust" annotations={['translate', 'dispatch', 're-encrypt']} items={['Translation: Alice supplies K', 'Dispatch: centre generates K', 'Each user stores one long-term centre key', 'Trust shifts to the centre']} visual={<ProtocolFlow step={step} rows={[{ from: 'Alice', label: 'generate K', to: 'Key Centre' }, { from: 'KC', label: 'decrypt under Alice link key', to: 'KC' }, { from: 'KC', label: 're-encrypt under Bob link key', to: 'Bob' }, { from: 'KC', label: 'or generate two encrypted copies', to: 'Alice and Bob' }]} />} /> },
  { id: 'ukpt', kicker: 'Transaction keys', title: 'Unique Key Per Transaction', content: ({ step = 999 }) => <LessonColumn step={step} index={4} beat="Reduced exposure" metaphor="A new key for every sale" items={['New key for each transaction', 'Request and response are authenticated', 'Registers advance together', 'Racal and derived UKPT are practical families', 'Compromise is limited to a small window']} visual={<ProtocolFlow step={step} rows={[{ from: 'Terminal', label: 'derive transaction key', to: 'Request MAC' }, { from: 'Host', label: 'verify request MAC', to: 'Response' }, { from: 'Host', label: 'response MAC', to: 'Terminal' }, { from: 'Both', label: 'update register', to: 'Next key' }, { from: 'Next sale', label: 'new transaction key', to: 'Reduced exposure' }]} />} /> },
  ...[
    ['quantum-basic', 'Quantum Key Establishment', ['Establishes a conventional symmetric key', 'Uses quantum states to reveal observation', 'Still needs authentication']],
    ['bb84-story', 'BB84 Basic Story', ['Alice sends polarised photons', 'Bob measures with selected bases', 'They keep compatible measurements']],
    ['eavesdrop-detect', 'Eavesdropper Detection', ['Measurement disturbs the state', 'Errors reveal Eve', 'Distance, rate and cost are practical limits']],
    ['avoid-storage', 'Avoiding Key Storage', ['Derive from remembered passphrase when needed', 'No stored clear key', 'Passphrase quality becomes critical']],
    ['software-storage', 'Software Key Storage', ['Cleartext storage fails', 'Encrypt stored keys with a KEK', 'File permissions are not enough']],
    ['hsm-storage', 'Hardware Security Modules', ['Keys stay inside hardware', 'Operations are authorised and audited', 'Useful for master and signing keys']],
    ['storage-zones', 'Storage Security Zones', ['Clear zones expose key material', 'Encrypted zones protect stored keys', 'Hardware zones reduce extraction risk']],
    ['backup-archival', 'Backup and Archival', ['Backup restores availability', 'Archival supports future decryption', 'Both increase material that must be protected']],
    ['usage-separation', 'Key Usage and Separation', ['Encryption key encrypts only', 'MAC key authenticates only', 'Purpose labels prevent misuse']],
    ['change-destroy', 'Key Change and Destruction', ['Rotate before risk grows', 'Destroy retired secrets', 'Document sensitive ceremonies']],
    ['policies-ceremonies', 'Key-Management Policies and Ceremonies', ['Policies define who may handle keys', 'Ceremonies control high-value operations', 'Audit records make failures traceable']],
  ].map(([id, title, items], i) => ({
    id,
    kicker: 'Operational key management',
    title,
    content: ({ step = 999 }) => (
      i % 4 === 0
        ? <MissionLesson id={id} section="Operational key management" title={title} lead="Operational controls decide whether cryptographic strength survives deployment." items={items} visual={teach(id, <Lifecycle step={step} items={items} />)} takeaway="Keys need process, hardware and policy — not algorithms alone." compose={composeAt(i)} attack={id === 'eavesdrop-detect'} />
        : <LessonColumn step={step} index={i + 1} items={items} visual={teach(id, <Lifecycle step={step} items={items} />)} />
    ),
  })),
  { id: 'public-key-problem', kicker: 'Public-key management', title: 'A Public Key Is Public, But Whose Key Is It?', tone: 'ins-slide ins-peak', content: ({ step = 999 }) => <LessonColumn step={step} index={0} peak beat="Authenticity" metaphor="Public is not the same as trusted" annotations={['claim', 'bind', 'sign', 'verify']} lead="Eve can publish a key and claim it belongs to Alice unless ownership is authenticated." items={['Public visibility is not authenticity', 'Identity must bind to the key', 'A trusted signature creates the binding', 'Verification follows a chain of trust']} visual={teach('public-key-problem', <Ribbon step={step} stages={['Public key', 'Identity claim', 'CA signature', 'Trust']} attack />)} /> },
  ...[
    ['certificate-definition', 'Public-Key Certificates', ['Identity', 'Public key', 'CA signature']],
    ['certificate-authority', 'Certificate Authority', ['Verifies identity', 'Signs certificates', 'Publishes trust information']],
    ['certificate-fields', 'X.509-Style Certificate Fields', ['Subject', 'Subject public key', 'Issuer', 'Validity period', 'Serial number', 'Signature algorithm']],
  ].map(([id, title, items], i) => ({ id, kicker: 'Certificates', title, content: ({ step = 999 }) => <LessonColumn step={step} index={i} peak={id === 'certificate-definition'} beat={id === 'certificate-definition' ? 'Binding' : undefined} metaphor={id === 'certificate-definition' ? 'Identity + public key + CA signature' : undefined} items={items} visual={teach(id, <CertificateChain step={Math.min(step, 3)} />)} /> })),
  { id: 'certificate-chain', kicker: 'Certificates', title: 'Certificate-Chain Verification', tone: 'ins-slide ins-peak', content: ({ step = 999 }) => <VisualFirst visual={<InsHeroScene beat="Trust cascade" metaphor="Root → intermediate → server → browser trust" peak annotations={['root', 'intermediate', 'certificate', 'validate']}><CertificateChain step={step} /></InsHeroScene>} takeaway={<Takeaway>A trust anchor lets Bob validate each signature down to the end certificate.</Takeaway>} /> },
  { id: 'certificate-lifecycle', kicker: 'Certificates', title: 'Certificate Lifecycle', content: ({ step = 999 }) => <VisualFirst visual={teach('certificate-lifecycle', <Lifecycle step={step} items={['Key-pair generation', 'Certificate creation', 'Distribution', 'Usage', 'Renewal', 'Revocation']} />)} takeaway={<Takeaway>Certificates expire or get revoked; public-key trust is also a lifecycle.</Takeaway>} /> },
  ...[
    ['push-pull', 'Push vs Pull Certificate Establishment', ['Push: owner sends certificate', 'Pull: verifier retrieves it', 'Both require validation']],
    ['creation-locations', 'Certificate Creation Locations', ['Owner-generated key pair', 'Trusted-third-party generated pair', 'Private-key custody changes the risk']],
    ['revocation', 'Certificate Revocation', ['A valid-looking certificate may no longer be acceptable', 'CRLs distribute revoked serials', 'Online status checking can reduce delay']],
    ['attribute-certs', 'Digital and Attribute Certificates', ['Digital certificate binds identity to public key', 'Attribute certificate binds privileges or attributes', 'Both need issuer trust']],
  ].map(([id, title, items], i) => ({
    id,
    kicker: 'Public-key lifecycle',
    title,
    content: ({ step = 999 }) => (
      id === 'revocation'
        ? <MissionLesson id={id} section="Public-key lifecycle" title={title} lead="Trust can be withdrawn after a certificate is issued." items={items} visual={teach('revocation', <CertificateChain step={Math.min(step, 3)} />)} takeaway="A valid-looking certificate may already be revoked." compose="hero" peak beat="Trust failure" metaphor="Revocation closes a broken trust path" attack />
        : <LessonColumn step={step} index={i + 2} items={items} visual={teach(id, <CertificateChain step={Math.min(step, 3)} />)} />
    ),
  })),
  summarySlide('m4-summary', 'Key Management', ['Generate', 'Establish', 'Store', 'Use', 'Change', 'Destroy', 'Certify']),
  { id: 'm4-common-mistakes', kicker: 'Exam guardrails', title: 'Common Mistakes', content: ({ step = 999 }) => <LessonColumn step={step} index={1} items={['Discussing algorithms but ignoring key lifecycle', 'Using one key for encryption and MAC', 'Trusting a public key without a certificate path', 'Forgetting revocation and expiry']} visual={<Ribbon step={step} stages={['Algorithm', 'Key', 'Certificate', 'Revocation']} attack />} /> },
  { id: 'm4-exam-focus', kicker: 'Exam focus', title: 'What to Practice', content: ({ step = 999 }) => <LessonColumn step={step} index={3} items={['Draw the key lifecycle', 'Explain hierarchy and key centres', 'Compare translation and dispatch', 'Verify a certificate chain and revocation need']} visual={<Lifecycle step={step} items={['Lifecycle', 'Hierarchy', 'Key centre', 'Certificate chain']} />} /> },
  { id: 'm4-end', kicker: 'End', title: 'Managed Keys Make Real Systems Possible', content: <VisualFirst visual={<InsHeroScene beat="Trust ready" metaphor="Managed keys make real systems possible"><CertificateChain step={3} /></InsHeroScene>} takeaway={<Takeaway>Module 5 applies the toolkit to Internet, wireless, mobile, payment and identity systems.</Takeaway>} /> },
]

const appSections = [
  ['toolkit-decisions', 'One Toolkit, Different Decisions', 'Applications trade security, performance, cost, compatibility and key management.', ['Security requirements', 'Application constraints', 'Cryptographic primitives', 'Algorithm choices', 'Key-management plan'], ShieldCheck],
  ['application-questions', 'Application-Design Questions', 'For every system, ask what must be protected and what can realistically be deployed.', ['Requirements', 'Constraints', 'Primitives', 'Algorithms and key types', 'Failure lessons'], CheckCircle2],
]

const tlsSlides = [
  ['tls-why', 'Why Secure Internet Communication?', 'An online store must protect payment and identity data over an untrusted network.', ['Confidentiality', 'Data-origin authentication', 'Entity authentication'], Network],
  ['secure-layers', 'Secure Channels at Different Layers', 'SSH, SSL/TLS and IPsec protect traffic at different parts of the stack.', ['SSH for remote login', 'SSL/TLS for application channels', 'IPsec for network-layer protection'], Network],
  ['tls-background', 'SSL/TLS Background', 'HTTPS uses TLS to protect browser-to-server communication.', ['Browser indicators help users', 'Certificates identify servers', 'Back-end systems still need separate protection'], LockKeyhole],
  ['tls-hybrid', 'Why SSL/TLS Uses Hybrid Encryption', 'Public-key methods establish secrets; symmetric keys protect bulk data.', ['Public key for establishment', 'Symmetric key for speed', 'MAC or AEAD for integrity'], KeyRound],
  ['cipher-suite', 'Cipher Suite', 'Participants agree on a collection of algorithms.', ['Key exchange', 'Authentication', 'Bulk encryption', 'Integrity/hash'], Shuffle],
  ['tls-protocols', 'SSL/TLS Protocol Structure', 'The handshake sets up security; the record layer protects application data.', ['Handshake Protocol', 'Record Protocol', 'Alerts and change-cipher messages'], Network],
  ['client-hello', 'Client Request', 'The client proposes session parameters.', ['session ID', 'client nonce rC', 'supported cipher suites'], Smartphone],
  ['server-hello', 'Server Response', 'The server chooses parameters and sends proof of identity.', ['session ID', 'server nonce rS', 'chosen cipher suite', 'certificate chain'], FileCheck2],
  ['tls-cert-validation', 'Certificate Validation', 'The browser verifies the server certificate chain before trusting the key.', ['Build chain', 'Check signatures', 'Check validity and revocation signal'], FileCheck2],
  ['premaster', 'Pre-Master Secret Transfer', 'The client sends KP protected by the server public key.', ['Encrypt KP with server public key', 'Only server private key should recover it', 'Both sides derive shared secrets'], KeyRound],
  ['master-secret', 'Master Secret and Session Keys', 'KP, rC and rS feed derivation of KM and direction-specific keys.', ['KP + rC + rS to KM', 'Client encryption and MAC keys', 'Server encryption and MAC keys'], KeyRound],
  ['finished-messages', 'Client and Server Finished', 'Finished messages prove the handshake transcript and keys match.', ['Client Finished', 'Server Finished', 'Protected channel begins'], CheckCircle2],
  ['tls-full-handshake', 'Full Handshake Animation', 'The handshake moves from negotiation to certificate trust to shared keys.', ['ClientHello', 'ServerHello + certificate', 'Key exchange', 'Finished messages'], Network],
  ['server-auth', 'How Server Authentication Is Achieved', 'Certificate validation links the server identity to the public key used in the exchange.', ['CA chain is trusted', 'Certificate names the server', 'Handshake proves possession of private key'], ShieldCheck],
  ['mutual-auth', 'Mutual Client Authentication', 'A client certificate and signature let the server authenticate Alice too.', ['Client certificate', 'Client signature', 'Server validates client identity'], UserCheck],
  ['record-protocol', 'SSL Record Protocol', 'Application data is framed, authenticated and encrypted.', ['Data', 'MAC', 'Padding where needed', 'Encryption'], LockKeyhole],
  ['record-verify', 'Record Decryption and Verification', 'The receiver reverses protection and rejects tampered records.', ['Decrypt', 'Check MAC', 'Deliver plaintext only if valid'], CheckCircle2],
  ['tls-key-management', 'SSL/TLS Key Management', 'TLS depends on public-key infrastructure and internal symmetric-key separation.', ['PKI for certificates', 'Session keys for records', 'Separate direction and function keys'], KeyRound],
  ['tls-failures', 'SSL/TLS Failures', 'TLS can fail through process, implementation, key management or usage errors.', ['Phishing and ignored warnings', 'Bad certificate checks', 'Compromised private keys'], XCircle],
  ['tls-lessons', 'SSL/TLS Design Lessons', 'TLS shows flexible algorithm negotiation with minimal public-key work.', ['Flexibility', 'Public algorithms', 'Public-key only for setup', 'Symmetric speed for data'], ShieldCheck],
]

const wlanSlides = [
  ['wlan-threat', 'Why Wireless Changes the Threat Model', 'Eve can listen without touching a cable.', ['Radio range leaks outside walls', 'Attackers can capture packets nearby', 'Authentication must include access points'], Wifi],
  ['wlan-architecture', 'WLAN Architecture', 'A device talks through an access point into the wired network.', ['Device', 'Access point', 'Wired network'], Wifi],
  ['wlan-evolution', 'Evolution: WEP to WPA2', 'WLAN security evolved after weaknesses became practical.', ['WEP', 'WPA', 'WPA2'], RotateCcw],
  ['wep-components', 'WEP Components', 'WEP combined RC4, CRC and challenge-response with weak key management.', ['RC4', 'CRC', 'Challenge-response', 'Shared fixed key'], KeyRound],
  ['wep-packet', 'WEP Packet Encryption', 'A per-packet key is IV || K, while the IV is sent in clear.', ['Data + ICV', 'RC4 encryption', 'IV sent in clear'], LockKeyhole],
  ['wep-auth', 'WEP Entity Authentication', 'Challenge-response was undermined by reusable keystream exposure.', ['Access point challenge', 'Station encrypts challenge', 'Captured material can be replayed'], UserCheck],
  ['wep-weaknesses', 'WEP Weaknesses', 'WEP combined poor key management with weak integrity.', ['Fixed shared key', 'CRC manipulation', '24-bit IV birthday repeats', 'Key-recovery attacks'], XCircle],
  ['wpa-overview', 'WPA and WPA2', 'WPA improved WEP; WPA2 redesigned protection around AES and CCMP.', ['Pairwise Master Key', 'Nonce-based establishment', 'MACs for mutual authentication', 'AES + CCMP in WPA2'], ShieldCheck],
  ['wpa-keys', 'Deriving WLAN Session Keys', 'Session material separates encryption and MAC functions.', ['EK', 'MK', 'DEK', 'DMK'], KeyRound],
  ['wlan-lessons', 'WLAN Design Lessons', 'Wireless security needs key separation, strong integrity and robust password choices.', ['Poor key management breaks systems', 'Weak integrity invites manipulation', 'Weak pre-shared passwords remain risky'], ShieldCheck],
]

const mobileSlides = [
  ['mobile-analogue', 'Analogue Mobile-Phone Weaknesses', 'Early systems exposed voice traffic and enabled cloning.', ['Eavesdropping', 'Cloning', 'Weak subscriber authentication'], Smartphone],
  ['gsm-umts', 'GSM and UMTS Background', 'Cellular systems moved security into SIM-based subscriber authentication.', ['Phone', 'Base station', 'Home network'], RadioTower],
  ['gsm-requirements', 'GSM Security Requirements', 'Mobile systems need subscriber authentication and radio-link confidentiality.', ['Authenticate subscriber', 'Establish session key', 'Encrypt communication'], ShieldCheck],
  ['sim-key', 'SIM and Long-Term Subscriber Key', 'A long-term key in the SIM supports challenge-response without revealing itself.', ['SIM stores secret', 'Network stores matching subscriber material', 'Responses prove possession'], KeyRound],
  ['gsm-auth', 'GSM Authentication Story', 'The network sends a challenge; the SIM computes a response and session key.', ['Challenge', 'Response', 'Session key'], UserCheck],
  ['gsm-limits', 'GSM Limits and UMTS Improvements', 'Later systems strengthened mutual authentication and algorithm choices.', ['One-way authentication limitations', 'Rogue base-station concerns', 'UMTS improves mutual assurance'], ShieldCheck],
]

const paymentSlides = [
  ['payment-env', 'Payment-Card Environment', 'A payment transaction coordinates cardholder, merchant, acquirer and issuer.', ['Cardholder', 'Merchant', 'Bank/acquirer', 'Issuer'], Database],
  ['payment-req', 'Payment-Card Security Requirements', 'Payments need authentication, integrity and risk-managed authorisation.', ['Card authentication', 'Cardholder verification', 'Transaction integrity'], ShieldCheck],
  ['stripe-chip', 'Magnetic Stripe vs Chip Card', 'Chip cards support dynamic cryptographic processing that stripes cannot.', ['Static stripe data', 'Smart chip computation', 'Harder cloning'], CreditIcon],
  ['pin-protection', 'PIN Protection', 'PIN handling must protect cardholder secrets through terminals and hosts.', ['PIN entry', 'Protected PIN block', 'Issuer verification'], LockKeyhole],
  ['atm-pos-flow', 'ATM or POS Transaction Flow', 'Transaction messages move between terminal, acquirer and issuer.', ['Card interaction', 'Terminal request', 'Issuer decision', 'Response to merchant'], Network],
  ['emv-processing', 'EMV Cryptographic Processing', 'Chip cards can produce dynamic values tied to transaction context.', ['Card authentication', 'Dynamic authentication value', 'Online/offline decision'], ShieldCheck],
  ['bank-key-management', 'Banking Key Management', 'Payment systems require strict key hierarchy, audit and transaction-key controls.', ['Master keys', 'Key-encrypting keys', 'Transaction keys', 'Ceremonies and audit'], KeyRound],
  ['payment-lessons', 'Payment-Card Design Lessons', 'Payments optimise risk, compatibility and operational control together.', ['Dynamic data beats static data', 'PIN handling is part of crypto design', 'Key ceremonies matter'], CheckCircle2],
]

function CreditIcon(props) {
  return <Database {...props} />
}

const broadcastIdentityHomeSlides = [
  ['paytv-problem', 'Pay-TV Problem', 'One broadcaster serves many receivers, but only entitled users should decrypt.', ['Many receivers', 'Encrypted content', 'Subscriber entitlement'], RadioTower],
  ['conditional-access', 'Conditional Access System', 'Content encryption is paired with entitlement and key delivery.', ['Control words', 'Service keys', 'Subscriber keys'], LockKeyhole],
  ['broadcast-hierarchy', 'Broadcast Key Hierarchy', 'A hierarchy lets the broadcaster update groups without sending a unique stream to everyone.', ['Content key', 'Service key', 'Subscriber entitlement', 'Key updates'], KeyRound],
  ['eid-card', 'Electronic Identity Card', 'Identity cards store certificates and private keys for authentication or digital signatures.', ['Public-key certificates', 'PIN activation', 'Smart-card signature'], FileCheck2],
  ['belgian-eid', 'Belgian eID-Style Application', 'An eID card combines identity data, certificates and protected signing operations.', ['Identity certificate', 'Signature certificate', 'PIN-gated use'], UserCheck],
  ['eid-key-management', 'Identity-Card Key Management Issues', 'Issuance, PINs, revocation and private-key protection must all work together.', ['Secure issuance', 'Private-key custody', 'Revocation', 'User PIN usability'], KeyRound],
  ['home-threat', 'Home-User Threat Model', 'Home users need protection that survives weak habits and limited administration.', ['Lost device', 'Malware', 'Weak passphrases', 'Usability pressure'], XCircle],
  ['file-encryption', 'File Encryption', 'File encryption protects selected documents with keys derived or stored securely.', ['Choose file', 'Derive or unlock key', 'Encrypt data', 'Store metadata safely'], LockKeyhole],
  ['disk-encryption', 'Disk Encryption', 'Disk encryption protects storage at rest but depends on boot-time authentication.', ['Volume key', 'Passphrase or hardware unlock', 'Transparent encryption'], Database],
  ['email-security', 'Email Security', 'Email can use encryption and signatures, but key discovery and usability are hard.', ['Sender signs', 'Receiver verifies', 'Key trust problem'], FileCheck2],
  ['home-usability', 'Usability vs Security', 'Security that users cannot operate tends to be bypassed.', ['Memorable passphrases', 'Recoverability', 'Clear warnings', 'Low friction'], CheckCircle2],
]

/** Story beats for Module 5 peaks — composition only; academic text unchanged. */
const APP_STORY = {
  'tls-why': { beat: 'Threat', metaphor: 'Payment data crosses an untrusted network', compose: 'hero', peak: true },
  'tls-hybrid': { beat: 'Hybrid crypto', metaphor: 'Public key sets up · symmetric key protects bulk', compose: 'visual-lead' },
  'cipher-suite': { beat: 'Negotiate', metaphor: 'Agree the algorithms before trust begins', compose: 'quiet' },
  'client-hello': { beat: 'ClientHello', metaphor: 'Browser proposes how to talk securely', compose: 'reverse', annotations: ['session', 'nonce', 'suites'] },
  'server-hello': { beat: 'ServerHello', metaphor: 'Server chooses parameters and proves identity', compose: 'hero', annotations: ['suite', 'cert', 'nonce'] },
  'tls-cert-validation': { beat: 'Validation', metaphor: 'Chain of trust before any secret is sent', compose: 'hero', peak: true, annotations: ['build', 'sign', 'validity'] },
  'premaster': { beat: 'Key exchange', metaphor: 'Only the server private key should recover KP', compose: 'visual-lead' },
  'master-secret': { beat: 'Derivation', metaphor: 'Shared secrets become direction-specific keys', compose: 'reverse' },
  'finished-messages': { beat: 'Finished', metaphor: 'Both sides prove the transcript and keys match', compose: 'hero', peak: true },
  'tls-full-handshake': { beat: 'Handshake', metaphor: 'Negotiate → certify → exchange → encrypt', compose: 'hero', peak: true, annotations: ['Hello', 'Certificate', 'Keys', 'Tunnel'] },
  'server-auth': { beat: 'Server identity', metaphor: 'Certificate + private-key proof = authenticated server', compose: 'standard' },
  'mutual-auth': { beat: 'Mutual trust', metaphor: 'Client certificate closes the other side of identity', compose: 'reverse' },
  'record-protocol': { beat: 'Record layer', metaphor: 'Application data framed, authenticated and encrypted', compose: 'visual-lead' },
  'record-verify': { beat: 'Verify', metaphor: 'Tampered records never become plaintext', compose: 'quiet' },
  'tls-failures': { beat: 'Failure', metaphor: 'Process and key mistakes can still break TLS', compose: 'hero', peak: true },
  'tls-lessons': { beat: 'Design lesson', metaphor: 'Flexibility with minimal public-key work', compose: 'quiet' },
  'wlan-threat': { beat: 'Radio threat', metaphor: 'Eve listens without touching a cable', compose: 'hero', peak: true },
  'wep-weaknesses': { beat: 'Compromise', metaphor: 'Weak integrity + fixed keys invite recovery', compose: 'hero', peak: true },
  'wpa-overview': { beat: 'Recovery', metaphor: 'WPA2 redesigns protection around AES and CCMP', compose: 'visual-lead', peak: true },
  'gsm-auth': { beat: 'Subscriber proof', metaphor: 'SIM answers a challenge without revealing the long-term key', compose: 'hero', peak: true },
  'emv-processing': { beat: 'Dynamic trust', metaphor: 'Chip values tie cryptography to transaction context', compose: 'hero', peak: true },
  'home-threat': { beat: 'Home perimeter', metaphor: 'Weak habits become the attack surface', compose: 'hero', peak: true },
  'network-firewall': { beat: 'Perimeter', metaphor: 'Inspect → allow · deny · quarantine', compose: 'hero', peak: true },
}

function applicationSlide([id, title, lead, items, Icon], section = 'Cryptographic applications', index = 0) {
  const story = APP_STORY[id] || {}
  const compose = story.compose || composeAt(index)
  const rich = isRichSecurityViz(id, section, title) || story.peak
  return {
    id,
    kicker: section,
    title,
    tone: story.peak ? 'ins-slide ins-peak' : undefined,
    content: ({ step = 999 }) => (
      <MissionLesson
        id={id}
        section={section}
        title={title}
        lead={lead}
        items={items}
        visual={
          <div className="ins-application-visual">
            {pickVisualForTopic(id, section, title)}
            {!rich && (
              <StoryCards step={step} cards={items.map((text) => ({ title: text, text, icon: <Icon {...icon} /> }))} />
            )}
          </div>
        }
        takeaway="Exam takeaway: draw the environment first, then explain the cryptographic decision that fits that environment."
        attack={/fail|weak|threat|wep|phishing|eavesdrop|cloning/i.test(`${id} ${title}`)}
        compose={compose}
        beat={story.beat}
        metaphor={story.metaphor}
        annotations={story.annotations}
        peak={Boolean(story.peak)}
      />
    ),
  }
}

export const insModule5Slides = [
  { id: 'ins-m5-title', kicker: 'Information and Network Security', hideTitle: true, layout: 'full', tone: 'ins-slide', content: ({ step = 999 }) => <TitleSlide moduleNumber="05" title="Cryptographic Applications" subtitle="The same toolkit behaves differently in Internet, wireless, mobile, payment and identity systems." step={step} /> },
  { id: 'm5-journey', kicker: 'Learning journey', title: 'Real Deployment Environments', content: <VisualFirst visual={<InsHeroScene beat="Environments" metaphor="Same toolkit · different threat models"><ProcessPath steps={['Internet', 'Wi-Fi', 'Mobile', 'Payment Cards', 'Broadcasting', 'Identity Cards', 'Home Users']} /></InsHeroScene>} takeaway={<Takeaway>No single mechanism is correct for every application environment.</Takeaway>} /> },
  ...appSections.map((s, i) => applicationSlide(s, 'Cryptographic applications', i)),
  ...tlsSlides.map((s, i) => applicationSlide(s, 'SSL/TLS', i)),
  ...wlanSlides.map((s, i) => applicationSlide(s, 'WLAN security', i + 2)),
  ...mobileSlides.map((s, i) => applicationSlide(s, 'Mobile telecommunications', i + 1)),
  ...paymentSlides.map((s, i) => applicationSlide(s, 'Payment cards', i + 3)),
  ...broadcastIdentityHomeSlides.map((s, i) => applicationSlide(s, 'Applied environments', i)),
  {
    id: 'network-firewall',
    kicker: 'Network defense',
    title: 'Firewalls at the Network Perimeter',
    tone: 'ins-slide ins-peak',
    notes: 'Cryptography protects a message end to end, but a network also needs a gatekeeper at its boundary. A firewall evaluates every arriving packet against an ordered rule set: traffic that matches an allow rule is forwarded to the protected zone, traffic that matches a deny rule is dropped at the boundary, and anything suspicious is diverted to quarantine for inspection. Point out that rules are evaluated top to bottom (order matters), that the firewall keeps live counters of allowed, blocked and quarantined traffic, and that a firewall complements — never replaces — the cryptographic protections covered earlier in the module.',
    content: ({ step = 999 }) => (
      <LessonColumn
        step={step}
        index={0}
        peak
        beat="Perimeter"
        metaphor="Inspect every packet · allow · deny · quarantine"
        annotations={['rule check', 'allow', 'block', 'quarantine']}
        lead="Cryptography protects a message; a firewall guards the boundary of the network itself."
        items={['Every packet is checked against an ordered rule set', 'Trusted traffic is forwarded to the protected zone', 'Malicious traffic is blocked at the boundary', 'Suspicious traffic is quarantined for inspection', 'It complements encryption — it does not replace it']}
        visual={<FirewallEngine />}
      />
    ),
  },
  { id: 'application-comparison', kicker: 'Comparison', title: 'Application Comparison Matrix', content: <VisualFirst visual={<InsHeroScene beat="Constraint map" metaphor="Application crypto is engineering under constraints"><Matrix headers={['System', 'Core need', 'Key issue']} rows={[['SSL/TLS', 'Secure channel', 'Certificates'], ['WLAN', 'Radio protection', 'Pairwise keys'], ['Mobile', 'Subscriber auth', 'SIM key'], ['Payments', 'Transaction trust', 'Bank hierarchy'], ['Broadcast', 'Entitlement', 'Group keys'], ['eID', 'Identity/signature', 'Certificates'], ['Home', 'Usable privacy', 'Passphrases']]} /></InsHeroScene>} takeaway={<Takeaway>Application crypto is engineering under constraints.</Takeaway>} /> },
  summarySlide('m5-summary', 'Cryptographic Applications', ['Internet', 'WLAN', 'Mobile', 'Payments', 'Broadcasting', 'Identity Cards', 'Home Users']),
  { id: 'm5-common-lessons', kicker: 'Design lessons', title: 'Common Design Lessons', content: ({ step = 999 }) => <LessonColumn step={step} index={2} items={['Define the environment before choosing mechanisms', 'Separate keys by purpose and direction', 'Authenticate identities and protocol messages', 'Plan revocation, recovery and renewal', 'Usability failures become security failures']} visual={<Ribbon step={step} stages={['Threat model', 'Primitive choice', 'Key management', 'Usability', 'Failure review']} attack />} /> },
  { id: 'm5-common-mistakes', kicker: 'Exam guardrails', title: 'Common Mistakes', content: ({ step = 999 }) => <LessonColumn step={step} index={4} items={['Assuming TLS secures the whole organisation', 'Forgetting WEP IV collision and replay attacks', 'Ignoring SIM and subscriber-key roles', 'Treating usability as separate from security']} visual={<StoryCards step={step} cards={['TLS protects only the channel', 'WEP CRC is not cryptographic integrity', 'WPA2 still suffers from weak passwords', 'Home encryption depends on key recovery'].map((text) => ({ title: text.split(' ')[0], text, icon: <XCircle {...icon} /> }))} />} /> },
  { id: 'm5-exam-focus', kicker: 'Exam focus', title: 'What to Practice', content: ({ step = 999 }) => <LessonColumn step={step} index={1} items={['Draw SSL/TLS handshake and record protection', 'Explain WEP failures and WPA/WPA2 improvements', 'Describe GSM challenge-response and session key use', 'Trace a payment-card transaction', 'Compare application constraints in a matrix']} visual={<Lifecycle step={step} items={['TLS handshake', 'WEP/WPA', 'GSM auth', 'Payment flow', 'Application matrix']} />} /> },
  { id: 'm5-end', kicker: 'End', title: 'Cryptography Becomes Security Only When the System Fits', content: <VisualFirst visual={<InsHeroScene beat="Final lesson" metaphor="Choose mechanisms by threat, constraint and lifecycle" peak><Ribbon step={3} stages={['Toolkit', 'Environment', 'Key management', 'Usable security']} /></InsHeroScene>} takeaway={<Takeaway>The final lesson is practical: choose mechanisms by threat, constraint and lifecycle.</Takeaway>} /> },
]
