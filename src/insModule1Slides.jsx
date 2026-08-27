import { KeyRound, LockKeyhole, MessageSquare, Network, ShieldCheck, Workflow } from 'lucide-react'
import {
  ComparisonLayout,
  KeyStatement,
  Lead,
  Points,
  ProcessPath,
  Stack,
  Takeaway,
  TwoColumn,
  VisualFirst,
  VisualPanel,
} from './components/Teaching'
import { AttackDefenseBoard, CyberMissionScene, KeyExchangeScene, SecurityTeachingFrame } from './components/InsVisuals'
import { RsaFlow } from './components/InsSecurityViz'
import { visualForSlide } from './components/InsTeachingScenes'
import { ModuleOpening } from './components/InsOpenings'
import { InsHeroScene } from './components/InsKit'

const iconProps = { size: 28, strokeWidth: 1.7, 'aria-hidden': true }

function teach(id, fallback) {
  return visualForSlide(id) || fallback
}

function CryptoFlow({ compact = false }) {
  const steps = ['Plaintext', 'Encryption', 'Ciphertext', 'Decryption', 'Plaintext']
  return (
    <div className={`crypto-flow ${compact ? 'compact' : ''}`.trim()}>
      {steps.map((step, i) => (
        <div key={`${step}-${i}`} className={`crypto-flow-step ${i === 1 || i === 3 ? 'machine' : ''}`.trim()}>
          <strong>{step}</strong>
          <span>{i === 0 ? 'MEET AT DAWN' : i === 2 ? 'LUHDWWA...' : i === 4 ? 'MEET AT DAWN' : 'key controlled'}</span>
          {(i === 1 || i === 3) && <KeyRound {...iconProps} />}
        </div>
      ))}
      <span className="crypto-flow-packet secure" aria-hidden="true" />
      <span className="crypto-flow-packet cipher" aria-hidden="true" />
    </div>
  )
}

function Journey({ steps, vertical = false }) {
  return <ProcessPath steps={steps} direction={vertical ? 'vertical' : 'horizontal'} />
}

function CryptoBranch() {
  return (
    <div className="crypto-branch">
      <div className="crypto-root">CRYPTO</div>
      <div className="crypto-branch-row">
        <div><strong>Cryptography</strong><span>Creating secret codes</span></div>
        <div><strong>Cryptanalysis</strong><span>Breaking secret codes</span></div>
      </div>
      <p>Cryptology is the art and science of making and breaking secret codes.</p>
    </div>
  )
}

function AlphabetMap({ shift = 3, irregular = false }) {
  const plain = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
  const cipher = irregular
    ? 'QWERTYUIOPASDFGHJKLZXCVBNM'.split('')
    : plain.map((_, i) => plain[(i + shift) % plain.length])
  return (
    <div className="alphabet-map">
      <div className="alphabet-row">
        <b>Plain</b>
        {plain.map((letter) => <span key={letter}>{letter}</span>)}
      </div>
      <div className="alphabet-row cipher">
        <b>Cipher</b>
        {cipher.map((letter, i) => <span key={`${letter}-${i}`}>{letter}</span>)}
      </div>
    </div>
  )
}

function FrequencyBars() {
  const values = [
    ['E', 12.7], ['T', 9.1], ['A', 8.2], ['O', 7.5], ['I', 7.0], ['N', 6.7],
    ['S', 6.3], ['H', 6.1], ['R', 6.0], ['D', 4.3], ['L', 4.0], ['U', 2.8],
  ]
  return (
    <div className="freq-chart">
      {values.map(([letter, value]) => (
        <div key={letter} className="freq-bar">
          <span style={{ height: `${value * 7}px` }} />
          <b>{letter}</b>
        </div>
      ))}
    </div>
  )
}

function DoubleTranspositionMatrix() {
  const rows = [
    ['A', 'T', 'T', 'A', 'C'],
    ['K', 'X', 'A', 'T', 'X'],
    ['D', 'A', 'W', 'N', ''],
  ]
  return (
    <div className="matrix-wrap">
      <div className="matrix-label">Plaintext: ATTACKXATXDAWN</div>
      <div className="crypto-matrix">
        {rows.flatMap((row, r) => row.map((cell, c) => <span key={`${r}-${c}`}>{cell}</span>))}
      </div>
      <div className="matrix-perms">Rows: (3, 5, 1, 4, 2) · Columns: (1, 3, 2)</div>
      <div className="matrix-cipher">Ciphertext: XTAWXNATTXADAKC</div>
    </div>
  )
}

function XorTable() {
  return (
    <div className="xor-table">
      {['0 XOR 0 = 0', '0 XOR 1 = 1', '1 XOR 0 = 1', '1 XOR 1 = 0'].map((row) => (
        <span key={row}>{row}</span>
      ))}
    </div>
  )
}

function XorRows({ mode = 'encrypt' }) {
  return (
    <div className="xor-rows">
      <div><b>{mode === 'encrypt' ? 'P' : 'C'}</b><code>000 001 010 110 111</code></div>
      <div><b>K</b><code>101 011 100 001 010</code></div>
      <div><b>{mode === 'encrypt' ? 'C' : 'P'}</b><code>101 010 110 111 101</code></div>
    </div>
  )
}

function Timeline({ items }) {
  return (
    <div className="crypto-timeline">
      {items.map(([date, event]) => (
        <div key={date} className="crypto-time-item">
          <strong>{date}</strong>
          <span>{event}</span>
        </div>
      ))}
    </div>
  )
}

function EnigmaSignal() {
  return (
    <div className="signal-flow">
      {['Keyboard', 'Plugboard', 'Rotor 1', 'Rotor 2', 'Rotor 3', 'Reflector', 'Rotor 3', 'Rotor 2', 'Rotor 1', 'Plugboard', 'Lampboard'].map((step, i) => (
        <span key={`${step}-${i}`}>{step}</span>
      ))}
    </div>
  )
}

function AttackLadder() {
  const attacks = [
    ['Ciphertext-only', 'Algorithm and ciphertext'],
    ['Known-plaintext', 'Some plaintext and matching ciphertext'],
    ['Chosen-plaintext', 'Selected plaintext and observed ciphertext'],
    ['Adaptively chosen-plaintext', 'Later choices depend on earlier observations'],
    ['Related-key', 'Encryptions under related keys'],
    ['Forward search', 'Small plaintext spaces such as yes or no'],
  ]
  return (
    <div className="attack-ladder">
      {attacks.map(([name, text], i) => (
        <div key={name} style={{ '--level': i }}>
          <strong>{name}</strong>
          <span>{text}</span>
        </div>
      ))}
    </div>
  )
}

function CardGrid({ items }) {
  return (
    <div className="module2-card-grid ins-cards">
      {items.map((item) => (
        <div key={item.title} className="module2-card">
          {item.icon && <div className="module2-card-icon">{item.icon}</div>}
          <strong>{item.title}</strong>
          <p>{item.text}</p>
        </div>
      ))}
    </div>
  )
}

export const insModule1Slides = [
  {
    id: 'ins-title',
    kicker: 'Information and Network Security',
    title: null,
    hideTitle: true,
    layout: 'full',
    tone: 'ins-slide',
    content: (
      <div className="title-hero ins-title-hero">
        <div>
          <p className="slide-kicker" style={{ marginBottom: 12 }}>INFORMATION AND NETWORK SECURITY</p>
          <h1>Module 01</h1>
          <p className="subtitle">Crypto Basics</p>
          <p className="lead" style={{ marginTop: 16 }}>From secret writing to secure communication.</p>
        </div>
        <div className="layout-visual">
          <InsHeroScene beat="Threat vs trust" metaphor="Something valuable must be protected" peak>
            <ModuleOpening module={1} />
          </InsHeroScene>
        </div>
      </div>
    ),
  },
  {
    id: 'ins-journey',
    kicker: 'Module journey',
    title: 'Crypto Basics Roadmap',
    content: (
      <VisualFirst
        visual={<InsHeroScene beat="Roadmap" metaphor="From secret writing to modern cryptanalysis"><Journey steps={['Language of Crypto', 'Substitution', 'Cryptanalysis', 'Transposition', 'One-Time Pad', 'Codebooks & Machines', 'Modern Cryptography']} /></InsHeroScene>}
        takeaway={<Takeaway>We begin with secret communication and end with modern cryptographic and cryptanalysis taxonomies.</Takeaway>}
      />
    ),
  },
  {
    id: 'secret-communication',
    kicker: 'Story hook',
    title: 'How Can Two People Communicate When an Attacker Is Listening?',
    tone: 'ins-slide ins-peak',
    content: (
      <SecurityTeachingFrame
        id="secret-communication"
        section="Story hook"
        title="Secret communication"
        lead="The sender must transform the message so that only the intended receiver can understand it."
        items={['Alice writes a message', 'Eve can observe the open channel', 'A cipher transforms plaintext', 'Bob uses the key to recover meaning']}
        visual={<CyberMissionScene kind="default" labels={['Alice', 'Open Internet', 'Encryption', 'Bob']} attack />}
        takeaway="That transformation is the beginning of cryptography."
        compose="hero"
        beat="Secrecy"
        metaphor="Alice → open channel → Eve watching → Bob recovers meaning"
        peak
        attack
      />
    ),
  },
  {
    id: 'cryptology-terms',
    kicker: 'Terminology',
    title: 'Cryptology, Cryptography and Cryptanalysis',
    content: (
      <TwoColumn ratio="visual-lead" visual={<VisualPanel label="Crypto vocabulary"><CryptoBranch /></VisualPanel>}>
        <Points items={['Cryptology: the art and science of making and breaking secret codes', 'Cryptography: creating secret codes', 'Cryptanalysis: breaking secret codes', 'Crypto: a broad term covering all of these and related areas']} />
      </TwoColumn>
    ),
  },
  {
    id: 'speak-crypto',
    kicker: 'How to speak crypto',
    title: 'Plaintext, Ciphertext, Key',
    tone: 'ins-slide ins-peak',
    content: (
      <VisualFirst
        visual={<InsHeroScene beat="Transformation" metaphor="Plaintext → key-controlled cipher → ciphertext → recovery" peak annotations={['plaintext', 'encrypt', 'ciphertext', 'decrypt']}><CryptoFlow /></InsHeroScene>}
        takeaway={<Takeaway>A cipher or cryptosystem uses a key to encrypt plaintext into ciphertext and decrypt it back.</Takeaway>}
      />
    ),
  },
  {
    id: 'black-box',
    kicker: 'Black-box model',
    title: 'Crypto as a Black Box',
    content: (
      <SecurityTeachingFrame
        id="black-box"
        section="Black-box model"
        title="Crypto as a Black Box"
        lead="The attacker may know the ciphertext and even the system design."
        items={['Plaintext enters the encryptor', 'A key controls the transformation', 'Ciphertext travels over an exposed channel', 'The receiver uses the required key to recover plaintext']}
        visual={<KeyExchangeScene labels={['Plaintext', 'Keyed cipher', 'Ciphertext packet', 'Recovered plaintext']} />}
        takeaway="Kerckhoffs-style thinking assumes Eve can inspect the system, so the key carries the secrecy."
        compose="reverse"
        beat="Exposed channel"
        metaphor="Eve may see the system — secrecy lives in the key"
        attack
      />
    ),
  },
  {
    id: 'kerckhoffs',
    kicker: 'Key concept',
    title: 'Kerckhoffs’ Principle',
    content: (
      <TwoColumn ratio="visual-lead" visual={<VisualPanel label="Only the key is secret">{teach('kerckhoffs', <KeyStatement>Security must depend on the secrecy of the key, not the secrecy of the algorithm.</KeyStatement>)}</VisualPanel>}>
        <Points items={['Assume the cryptographic system is completely known to the attacker', 'Secret algorithms are often exposed', 'Hidden algorithms may contain weaknesses', 'Public examination helps discover weaknesses before attackers exploit them']} />
      </TwoColumn>
    ),
  },
  {
    id: 'symmetric-public',
    kicker: 'System types',
    title: 'Symmetric-Key and Public-Key Overview',
    tone: 'ins-slide ins-peak',
    content: (
      <TwoColumn
        ratio="visual-lead"
        visual={(
          <InsHeroScene beat="Secure communication" metaphor="Shared secret vs public lock / private unlock" peak annotations={['symmetric share', 'public encrypt', 'private decrypt']}>
            {teach('symmetric-public', <RsaFlow />)}
          </InsHeroScene>
        )}
      >
        <Stack><h3 className="content-heading">Symmetric-key system</h3><Points items={['Same key is used for encryption and decryption', 'The shared key must remain secret']} /></Stack>
        <Stack><h3 className="content-heading">Public-key system</h3><Points items={['Public key is used for encryption', 'Private key is used for decryption or signing']} /></Stack>
      </TwoColumn>
    ),
  },
  {
    id: 'substitution-intro',
    kicker: 'Classical cipher',
    title: 'Introduction to Substitution',
    content: (
      <TwoColumn ratio="balanced" visual={<VisualPanel label="Alphabet tiles">{teach('substitution-intro', <AlphabetMap />)}</VisualPanel>}>
        <Lead>A substitution cipher encrypts a message by replacing each plaintext symbol with another symbol.</Lead>
        <Takeaway>First question: what if every letter simply shifts by a fixed amount?</Takeaway>
      </TwoColumn>
    ),
  },
  {
    id: 'caesar-cipher',
    kicker: 'Shift substitution',
    title: 'Caesar Cipher',
    content: (
      <VisualFirst
        lead="A shift of 3 replaces each letter by a letter three positions ahead in the alphabet."
        visual={teach('caesar-cipher', <AlphabetMap />)}
        takeaway={<Takeaway>A maps to D, B maps to E, C maps to F, and X, Y, Z wrap around to A, B, C.</Takeaway>}
      />
    ),
  },
  {
    id: 'caesar-encrypt',
    kicker: 'Worked example',
    title: 'Caesar Encryption Example',
    content: (
      <TwoColumn
        ratio="visual-lead"
        visual={teach('caesar-encrypt', null)}
      >
        <Stack className="crypto-example">
          <div><strong>Plaintext</strong><code>FOURSCOREANDSEVENYEARSAGO</code></div>
          <div><strong>Key</strong><code>Shift by 3</code></div>
          <div><strong>Ciphertext</strong><code>IRXUVFRUHDQGVHYHQBHDUVDJR</code></div>
        </Stack>
      </TwoColumn>
    ),
  },
  {
    id: 'caesar-decrypt',
    kicker: 'Worked example',
    title: 'Caesar Decryption Example',
    content: (
      <TwoColumn
        ratio="visual-lead"
        visual={teach('caesar-decrypt', null)}
      >
        <Stack className="crypto-example">
          <div><strong>Ciphertext</strong><code>VSRQJHEREVTXDUHSDQWV</code></div>
          <div><strong>Rule</strong><code>Shift backward by 3</code></div>
          <div><strong>Plaintext</strong><code>SPONGEBOBSQUAREPANTS</code></div>
        </Stack>
      </TwoColumn>
    ),
  },
  {
    id: 'shift-key-space',
    kicker: 'Key space',
    title: 'Is 26 Keys Enough?',
    content: (
      <TwoColumn reverse visual={<VisualPanel label="Tiny key space">{teach('shift-key-space', <AlphabetMap shift={7} />)}</VisualPanel>}>
        <Lead>A shift key can be selected from 0, 1, 2, ..., 25.</Lead>
        <KeyStatement label="Question">Only 26 possible keys means an attacker can try every shift.</KeyStatement>
      </TwoColumn>
    ),
  },
  {
    id: 'exhaustive-search',
    kicker: 'Cryptanalysis',
    title: 'Breaking a Shift Cipher by Exhaustive Search',
    content: (
      <TwoColumn visual={<VisualPanel label="Attacker tries keys">{teach('exhaustive-search', <Journey steps={['Key 0', 'Key 1', 'Key 2', 'Key 3', 'Key 4']} vertical />)}</VisualPanel>}>
        <Stack className="crypto-example compact">
          <div><strong>Ciphertext</strong><code>MEQEFSCERHCSYEVIEKMVP</code></div>
          <div><strong>Solution</strong><code>Key = 4</code></div>
          <div><strong>Plaintext</strong><code>IAMABOYANDYOUAREAGIRL</code></div>
        </Stack>
        <Takeaway>A cipher with a very small key space can be broken by trying every possible key.</Takeaway>
      </TwoColumn>
    ),
  },
  {
    id: 'general-substitution',
    kicker: 'Beyond shifts',
    title: 'General Monoalphabetic Substitution',
    content: (
      <TwoColumn reverse visual={<VisualPanel label="Irregular mapping">{teach('general-substitution', <AlphabetMap irregular />)}</VisualPanel>}>
        <Lead>A general monoalphabetic substitution key may be any permutation of the alphabet.</Lead>
        <Points items={['It does not need to be a fixed shift', 'There are 26! possible permutations', 'That is more than 2^88 possible keys']} />
      </TwoColumn>
    ),
  },
  {
    id: 'impractical-search',
    kicker: 'Scale of search',
    title: 'Why Trying Every Key Becomes Impractical',
    content: (
      <ComparisonLayout
        left={<Stack><h3 className="content-heading">Shift cipher</h3><KeyStatement>26 keys</KeyStatement></Stack>}
        right={<Stack><h3 className="content-heading">General substitution</h3><KeyStatement>26! keys</KeyStatement></Stack>}
        footer={<Takeaway>We need a smarter attack than trying every possible key.</Takeaway>}
      />
    ),
  },
  {
    id: 'frequency-analysis',
    kicker: 'Language patterns',
    title: 'Frequency Analysis',
    content: (
      <TwoColumn visual={<VisualPanel label="English letter frequencies"><FrequencyBars /></VisualPanel>}>
        <Lead>Languages contain patterns. Some letters occur much more frequently than others.</Lead>
        <Points items={['In English, letters such as E, T, A and O appear frequently', 'A substitution cipher changes symbols but does not completely remove frequency patterns']} />
      </TwoColumn>
    ),
  },
  {
    id: 'frequency-example',
    kicker: 'Cryptanalysis workflow',
    title: 'Frequency-Analysis Example',
    content: (
      <VisualFirst
        visual={<Journey steps={['Collect ciphertext', 'Count each symbol', 'Identify frequent letters', 'Compare with English', 'Guess substitutions', 'Refine using word patterns']} />}
        takeaway={<Takeaway>The source exercise uses ciphertext frequency counts to attempt decryption without trying every key.</Takeaway>}
      />
    ),
  },
  {
    id: 'frequency-history',
    kicker: 'History',
    title: 'Historical Development of Frequency Analysis',
    content: (
      <VisualFirst
        visual={<Timeline items={[['9th Century', 'al-Kindi describes frequency analysis'], ['Renaissance Europe', 'Technique reaches or is rediscovered in Europe'], ['Afterward', 'Simple substitution ciphers become vulnerable']]} />}
      />
    ),
  },
  {
    id: 'secure-insecure',
    kicker: 'Security terminology',
    title: 'Secure vs Insecure Cryptosystems',
    content: (
      <ComparisonLayout
        left={<Stack><h3 className="content-heading">Secure</h3><Points items={['Best-known attack is exhaustive key search', 'No shortcut attack is known']} /></Stack>}
        right={<Stack><h3 className="content-heading">Insecure</h3><Points items={['A shortcut attack is known', 'May still require large practical effort in some cases']} /></Stack>}
        footer={<Takeaway>A technically secure system with a tiny key space can be easier to break than an insecure system with a huge practical workload.</Takeaway>}
      />
    ),
  },
  {
    id: 'transposition-intro',
    kicker: 'Classical cipher',
    title: 'Introduction to Transposition',
    content: (
      <TwoColumn visual={<VisualPanel label="Rearranged tiles"><Journey steps={['ATTACK', 'TACKAT', 'KATATC']} vertical /></VisualPanel>}>
        <Lead>Substitution changes the symbols. Transposition keeps the symbols but changes their positions.</Lead>
        <Takeaway>A transposition cipher rearranges plaintext characters.</Takeaway>
      </TwoColumn>
    ),
  },
  {
    id: 'double-transposition',
    kicker: 'Transposition',
    title: 'Double Transposition',
    content: (
      <VisualFirst
        visual={<Journey steps={['Write plaintext into an array', 'Permute rows', 'Permute columns', 'Read ciphertext']} />}
        takeaway={<Takeaway>Double transposition primarily demonstrates Shannon’s idea of diffusion: spreading plaintext structure across positions.</Takeaway>}
      />
    ),
  },
  {
    id: 'double-transposition-example',
    kicker: 'Worked example',
    title: 'Double-Transposition Example',
    content: (
      <VisualFirst visual={<DoubleTranspositionMatrix />} />
    ),
  },
  {
    id: 'otp-intro',
    kicker: 'Perfect-secrecy model',
    title: 'Introduction to the One-Time Pad',
    content: (
      <TwoColumn reverse visual={<VisualPanel label="Vernam cipher"><Journey steps={['Plaintext bits', 'XOR random key', 'Ciphertext bits']} vertical /></VisualPanel>}>
        <Points items={['The one-time pad is also known as the Vernam cipher in the source', 'The plaintext is represented as bits', 'The key is a random sequence of bits', 'The key has the same length as the message', 'Encryption uses XOR']} />
      </TwoColumn>
    ),
  },
  {
    id: 'xor-visual',
    kicker: 'Binary operation',
    title: 'XOR Visual',
    content: (
      <VisualFirst
        lead="XOR outputs 1 when the two input bits differ and 0 when they are the same."
        visual={<XorTable />}
      />
    ),
  },
  {
    id: 'otp-encryption',
    kicker: 'Worked example',
    title: 'One-Time-Pad Encryption',
    content: (
      <TwoColumn visual={<VisualPanel label="Aligned XOR rows"><XorRows /></VisualPanel>}>
        <Points items={['e = 000', 'h = 001', 'i = 010', 'k = 011', 'l = 100', 'r = 101', 's = 110', 't = 111']} />
      </TwoColumn>
    ),
  },
  {
    id: 'otp-decryption',
    kicker: 'Worked example',
    title: 'One-Time-Pad Decryption',
    content: (
      <VisualFirst
        lead="Ciphertext XOR Key = Plaintext because XORing the same key twice cancels the key."
        visual={<XorRows mode="decrypt" />}
        takeaway={<Takeaway>(P XOR K) XOR K = P</Takeaway>}
      />
    ),
  },
  {
    id: 'multiple-plaintexts',
    kicker: 'Perfect secrecy intuition',
    title: 'Why Multiple Plaintexts Can Fit One Ciphertext',
    content: (
      <TwoColumn visual={<VisualPanel label="Same ciphertext"><Journey steps={['Ciphertext', 'Key A → Plaintext A', 'Key B → Plaintext B', 'Key C → Plaintext C']} vertical /></VisualPanel>}>
        <Lead>Without knowing the correct random key, the ciphertext alone gives no information about which plaintext is correct.</Lead>
        <Takeaway>All possible plaintexts of the correct length are equally possible.</Takeaway>
      </TwoColumn>
    ),
  },
  {
    id: 'otp-conditions',
    kicker: 'Perfect secrecy',
    title: 'Conditions for One-Time-Pad Security',
    content: (
      <VisualFirst
        visual={<CardGrid items={[
          { title: 'Truly random', text: 'The pad must not be predictable.', icon: <Workflow {...iconProps} /> },
          { title: 'Same length', text: 'The pad must be as long as the message.', icon: <MessageSquare {...iconProps} /> },
          { title: 'Secret', text: 'Only sender and receiver know the pad.', icon: <ShieldCheck {...iconProps} /> },
          { title: 'Used once', text: 'No part of the pad may be reused.', icon: <KeyRound {...iconProps} /> },
        ]} />}
        takeaway={<Takeaway>The one-time pad does not by itself provide message integrity.</Takeaway>}
      />
    ),
  },
  {
    id: 'otp-limitation',
    kicker: 'Practical limitation',
    title: 'The Key Distribution Problem',
    content: (
      <TwoColumn reverse visual={<VisualPanel label="Scaling question">{teach('otp-limitation', <KeyStatement>If the key must be as long as the message, how do sender and receiver securely share it?</KeyStatement>)}</VisualPanel>}>
        <Lead>Key generation, storage and distribution make the one-time pad difficult to use at scale.</Lead>
      </TwoColumn>
    ),
  },
  {
    id: 'venona',
    kicker: 'Key reuse',
    title: 'VENONA and the Danger of Reusing Pads',
    content: (
      <TwoColumn visual={<VisualPanel label="Pad reuse breaks secrecy">{teach('venona', <Journey steps={['Soviet spy messages', 'One-time-pad systems', 'Repeated pad sections', 'Cryptanalysis']} vertical />)}</VisualPanel>}>
        <Lead>The source refers to the VENONA project and messages related to espionage.</Lead>
        <Takeaway>Reusing any part of a one-time pad destroys its perfect-security guarantee.</Takeaway>
      </TwoColumn>
    ),
  },
  {
    id: 'codebooks',
    kicker: 'Codebook cipher',
    title: 'Codebook Ciphers',
    content: (
      <TwoColumn reverse visual={<VisualPanel label="Code entries"><Stack className="codebook-list"><code>Februar → 13605</code><code>fest → 13732</code><code>finanzielle → 13850</code><code>folgender → 13918</code><code>Frieden → 17142</code><code>Friedenschluss → 17149</code></Stack></VisualPanel>}>
        <Lead>A codebook maps complete words or phrases to codewords or numbers.</Lead>
        <Takeaway>A codebook replaces meaningful units, while a substitution cipher usually replaces individual symbols.</Takeaway>
      </TwoColumn>
    ),
  },
  {
    id: 'zimmermann',
    kicker: 'Historical case',
    title: 'Zimmermann Telegram',
    content: (
      <TwoColumn visual={<VisualPanel label="Recreated document"><div className="telegram-card"><strong>Encoded telegram</strong><span>codebook numbers · reconstructed meaning · strategic consequence</span></div></VisualPanel>}>
        <Points items={['The Zimmermann Telegram was encrypted using a codebook', 'British cryptanalysts recovered part of the codebook and reconstructed missing portions', 'The decrypted telegram influenced the United States’ entry into World War I']} />
      </TwoColumn>
    ),
  },
  {
    id: 'election-1876',
    kicker: 'Cryptographic lesson',
    title: 'Election of 1876',
    content: (
      <Stack className="crypto-example">
        <div><strong>Ciphertext</strong><code>Warsaw they read all unchanged last are idiots can't situation</code></div>
        <div><strong>Transposition</strong><code>9, 3, 6, 1, 10, 5, 2, 7, 4, 8</code></div>
        <div><strong>Recovered</strong><code>Can't read last telegram. Situation unchanged. They are all idiots.</code></div>
        <Takeaway>Key reuse and predictable structure weaken a cipher.</Takeaway>
      </Stack>
    ),
  },
  {
    id: 'early-20th',
    kicker: 'Crypto history',
    title: 'Early Twentieth-Century Cryptography',
    content: (
      <VisualFirst
        visual={<Timeline items={[['World War I', 'Zimmermann Telegram'], ['1929', 'Gentlemen do not read each other’s mail'], ['World War II', 'Golden age of cryptanalysis'], ['Japanese Purple', 'MAGIC'], ['German Enigma', 'ULTRA']]} />}
      />
    ),
  },
  {
    id: 'enigma-components',
    kicker: 'Machine cryptography',
    title: 'Enigma Machine Components',
    content: (
      <VisualFirst
        visual={<Journey steps={['Plugboard', 'Keyboard', 'Set of rotors', 'Reflector', 'Lampboard']} />}
        takeaway={<Takeaway>The plugboard remaps letters, rotors create changing mappings, the reflector sends the signal back, and the lampboard displays the encrypted letter.</Takeaway>}
      />
    ),
  },
  {
    id: 'enigma-flow',
    kicker: 'Signal path',
    title: 'Enigma Signal Flow',
    content: (
      <VisualFirst
        visual={<EnigmaSignal />}
        takeaway={<Takeaway>The rightmost rotor rotates with each key press, so the letter mapping changes continuously.</Takeaway>}
      />
    ),
  },
  {
    id: 'enigma-decryption',
    kicker: 'Machine state',
    title: 'Enigma Decryption Requirements',
    content: (
      <TwoColumn visual={<VisualPanel label="Configuration checklist"><CardGrid items={[
        { title: 'Message', text: 'The encrypted message', icon: <MessageSquare {...iconProps} /> },
        { title: 'Rotors', text: 'The selected rotors', icon: <Workflow {...iconProps} /> },
        { title: 'Plugboard', text: 'The plugboard connections', icon: <Network {...iconProps} /> },
        { title: 'Initial settings', text: 'The starting rotor positions', icon: <LockKeyhole {...iconProps} /> },
      ]} /></VisualPanel>}>
        <Lead>Without the correct machine state, decoding is extremely difficult.</Lead>
      </TwoColumn>
    ),
  },
  {
    id: 'purple',
    kicker: 'Historical machine',
    title: 'Japanese Purple Machine',
    content: (
      <TwoColumn reverse visual={<VisualPanel label="Stepping switches"><Journey steps={['Diplomatic message', 'Stepping-switch machine', 'Encoded traffic', 'Cryptanalysis']} vertical /></VisualPanel>}>
        <Points items={['An electromechanical stepping-switch machine', 'Used telephone stepping switches rather than rotors', 'Associated with Japanese diplomatic communication', 'The source notes Pearl Harbor-related preparations encoded using Purple were decoded shortly before the attack']} />
      </TwoColumn>
    ),
  },
  {
    id: 'post-wwii',
    kicker: 'Modern development',
    title: 'Post-WWII Cryptography',
    content: (
      <VisualFirst
        visual={<Timeline items={[['1949', 'Claude Shannon and secrecy systems'], ['Computer revolution', 'Increasing data'], ['1970s', 'DES and public-key cryptography'], ['1980s', 'CRYPTO conferences'], ['1990s', 'Advanced Encryption Standard']]} />}
        takeaway={<Takeaway>Cryptography moves beyond the classified world.</Takeaway>}
      />
    ),
  },
  {
    id: 'shannon',
    kicker: 'Information theory',
    title: 'Claude Shannon: Confusion and Diffusion',
    content: (
      <VisualFirst
        visual={<InsHeroScene beat="Shannon" metaphor="Confusion hides · diffusion spreads">{teach('shannon', null)}</InsHeroScene>}
        takeaway={<Takeaway>Shannon proved the security of the correctly used one-time pad. Confusion obscures key relationships; diffusion spreads plaintext influence.</Takeaway>}
      />
    ),
  },
  {
    id: 'crypto-taxonomy',
    kicker: 'Modern taxonomy',
    title: 'Taxonomy of Cryptography',
    content: (
      <VisualFirst
        visual={<Journey steps={['Cryptography', 'Symmetric Key: Stream + Block Ciphers', 'Public Key: Encryption + Digital Signatures', 'Hash Algorithms']} />}
        takeaway={<Takeaway>Digital signatures do not have a direct equivalent in traditional symmetric-key cryptography.</Takeaway>}
      />
    ),
  },
  {
    id: 'cryptanalysis-taxonomy',
    kicker: 'Attack taxonomy',
    title: 'Taxonomy of Cryptanalysis',
    content: (
      <TwoColumn reverse visual={<VisualPanel label="Threat access ladder"><AttackLadder /></VisualPanel>}>
        <Lead>Cryptanalysis is classified by what information or access the attacker possesses.</Lead>
        <Takeaway>The “lunchtime attack” phrase refers to limited temporary access to a cryptosystem.</Takeaway>
      </TwoColumn>
    ),
  },
  {
    id: 'ins-summary',
    kicker: 'Module summary',
    title: 'Crypto Basics Summary',
    tone: 'ins-slide ins-peak',
    content: (
      <VisualFirst
        visual={(
          <InsHeroScene beat="Module map" metaphor="Threat → transformation → attack → modern taxonomy" peak>
            <AttackDefenseBoard steps={['Secret Communication', 'Plaintext + Key', 'Ciphertext', 'Cryptanalysis', 'Modern Taxonomy']} />
          </InsHeroScene>
        )}
        takeaway={<Takeaway>Cryptography protects information through algorithms and keys; cryptanalysis studies how those protections can fail.</Takeaway>}
      />
    ),
  },
  {
    id: 'ins-end',
    kicker: 'End of Module 1',
    title: null,
    hideTitle: true,
    tone: 'ins-slide',
    content: (
      <div className="center-stack">
        <div className="tag">MODULE 01 COMPLETE</div>
        <h2 className="thanks-title">From Secret Writing to Modern Cryptography.</h2>
        <p className="muted thanks-sub">Crypto Basics</p>
        <div className="soft-panel thanks-card">
          <h3>Thank You</h3>
          <p className="muted" style={{ margin: 0 }}>Information and Network Security · Module 1</p>
        </div>
        <div className="badge-row">
          <a className="pill module2-action" href="#/information-network-security">Back to INS Modules</a>
          <a className="pill module2-action" href="#/">Back to Subjects</a>
          <a className="pill module2-action" href="#/big-data-analytics">Open Big Data Analytics</a>
        </div>
      </div>
    ),
  },
]
