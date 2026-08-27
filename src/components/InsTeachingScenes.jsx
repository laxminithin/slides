/**
 * InsTeachingScenes — parameterized semantic teaching SVG scenes for INS V2.5.
 *
 * These scenes follow the InsSecurityViz visual contract:
 * structure is always painted; only packets, pulses, scans, and highlights move.
 */
import {
  IvDefs,
  SecurityPacket,
  DataStream,
  VerificationPulse,
  TrustBadge,
  GlassServer,
  SecurityShield,
  Lock,
  Certificate,
  BrowserClient,
  Phone,
  Key,
  EncryptionCube,
  NetworkNode,
  ThreatActor,
  CertificateAuthority,
  Cloud,
  Router,
  TlsHandshake,
  RsaFlow,
} from './InsSecurityViz'

const T = { fontFamily: 'inherit' }

function Box({ x, y, w, h, tone = '', title, sub, children, className = '' }) {
  return (
    <g className={className}>
      <rect className={`iv-box ${tone}`.trim()} x={x} y={y} width={w} height={h} rx="14" />
      {children}
      {title && <text className="iv-title" x={x + w / 2} y={y + h - (sub ? 22 : 12)} textAnchor="middle" fontSize="12.5" style={T}>{title}</text>}
      {sub && <text className="iv-sub" x={x + w / 2} y={y + h - 8} textAnchor="middle" fontSize="10.5" style={T}>{sub}</text>}
    </g>
  )
}

function Arrow({ x1, y1, x2, y2, blue = false, red = false, dashed = false, dim = false }) {
  const cls = `iv-conn ${blue ? 'iv-s-blue' : ''} ${red ? 'iv-s-red' : ''} ${dim ? 'iv-dim' : ''}`.trim()
  return <line className={cls} x1={x1} y1={y1} x2={x2} y2={y2} markerEnd={blue ? 'url(#ivArrowBlue)' : 'url(#ivArrow)'} strokeDasharray={dashed ? '5 6' : undefined} />
}

function PathArrow({ d, blue = false, red = false, dashed = false, dim = false }) {
  const cls = `iv-conn ${blue ? 'iv-s-blue' : ''} ${red ? 'iv-s-red' : ''} ${dim ? 'iv-dim' : ''}`.trim()
  return <path className={cls} d={d} markerEnd={blue ? 'url(#ivArrowBlue)' : 'url(#ivArrow)'} strokeDasharray={dashed ? '5 6' : undefined} />
}

function Chip({ x, y, w = 76, text, tone = '', fill }) {
  return (
    <g>
      <rect className={`iv-box ${tone}`.trim()} x={x} y={y} width={w} height="28" rx="14" fill={fill} />
      <text className="iv-label" x={x + w / 2} y={y + 18} textAnchor="middle" fontSize="11.5" style={T}>{text}</text>
    </g>
  )
}

function WordBox({ x, y, text, tone = '', size = 26, w = 128, sub }) {
  return (
    <Box x={x} y={y} w={w} h={76} tone={tone}>
      <text className="iv-title" x={x + w / 2} y={y + 38} textAnchor="middle" fontSize={size} letterSpacing="2" style={T}>{text}</text>
      {sub && <text className="iv-sub" x={x + w / 2} y={y + 60} textAnchor="middle" fontSize="11" style={T}>{sub}</text>}
    </Box>
  )
}

function MiniDoc({ x, y, title = 'Message', body = 'M', tone = '' }) {
  return (
    <Box x={x} y={y} w={104} h={76} tone={tone}>
      <path d={`M${x + 31},${y + 15} H${x + 66} L${x + 76},${y + 25} V${y + 50} H${x + 31} Z`} fill="#fff" stroke="var(--iv-line)" strokeWidth="1.5" />
      <path d={`M${x + 66},${y + 15} V${y + 25} H${x + 76}`} fill="none" stroke="var(--iv-line)" strokeWidth="1.3" />
      <text className="iv-title" x={x + 52} y={y + 43} textAnchor="middle" fontSize="17" style={T}>{body}</text>
      <text className="iv-sub" x={x + 52} y={y + 66} textAnchor="middle" fontSize="10.5" style={T}>{title}</text>
    </Box>
  )
}

function HashNode({ x, y, label = 'h()' }) {
  return (
    <Box x={x} y={y} w={90} h={76} tone="soft">
      <circle cx={x + 45} cy={y + 31} r="19" fill="#eef7ff" stroke="var(--iv-blue)" strokeWidth="1.8" />
      <text className="iv-title" x={x + 45} y={y + 37} textAnchor="middle" fontSize="16" style={T}>{label}</text>
      <text className="iv-sub" x={x + 45} y={y + 65} textAnchor="middle" fontSize="10.5" style={T}>hash</text>
    </Box>
  )
}

function Digest({ x, y, text = '7A9F...2C', tone = 'trust', w = 132 }) {
  return (
    <Box x={x} y={y} w={w} h={58} tone={tone}>
      <text className="iv-title" x={x + w / 2} y={y + 26} textAnchor="middle" fontSize="13" letterSpacing="1" style={T}>{text}</text>
      <text className="iv-sub" x={x + w / 2} y={y + 45} textAnchor="middle" fontSize="10.5" style={T}>fixed digest</text>
    </Box>
  )
}

function Verdict({ x, y, ok = true, label = ok ? 'ACCEPT' : 'REJECT' }) {
  return (
    <Box x={x} y={y} w={118} h={60} tone={ok ? 'trust' : 'alert'}>
      <text className={ok ? 'iv-f-emerald' : 'iv-f-red'} x={x + 59} y={y + 36} textAnchor="middle" fontSize="15" fontWeight="800" style={T}>{label}</text>
      {ok ? <VerificationPulse x={x + 59} y={y + 30} r={24} /> : <path className="iv-block" d={`M${x + 49},${y + 20} L${x + 69},${y + 40} M${x + 69},${y + 20} L${x + 49},${y + 40}`} stroke="var(--iv-red)" strokeWidth="3" strokeLinecap="round" />}
    </Box>
  )
}

function AlphabetRow({ x, y, letters, title, color = 'var(--iv-blue)' }) {
  return (
    <g>
      <text className="iv-sub" x={x} y={y - 8} fontSize="11" fontWeight="800" style={T}>{title}</text>
      {letters.split('').map((l, i) => (
        <g key={`${title}-${l}-${i}`}>
          <rect x={x + i * 22} y={y} width="18" height="24" rx="5" fill="#fff" stroke="var(--iv-line)" />
          <text className="iv-label" x={x + i * 22 + 9} y={y + 16} textAnchor="middle" fontSize="10.5" style={T} fill={color}>{l}</text>
        </g>
      ))}
    </g>
  )
}

export function CaesarTransform({ mode = 'transform' } = {}) {
  const plain = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const shifted = 'DEFGHIJKLMNOPQRSTUVWXYZABC'
  const moves = [
    ['H', 7, 'K', 10],
    ['E', 4, 'H', 7],
    ['L', 11, 'O', 14],
    ['O', 14, 'R', 17],
  ]

  if (mode === 'concept' || mode === 'keyspace') {
    const keys = Array.from({ length: 26 })
    return (
      <svg className="iv-svg" viewBox="0 0 640 360" role="img" aria-label={mode === 'keyspace' ? 'Caesar cipher has 26 possible shift keys on a dial' : 'Caesar cipher concept: shift by k maps one letter to another'}>
        <IvDefs />
        <text className="iv-title" x="320" y="36" textAnchor="middle" fontSize="15" style={T}>{mode === 'keyspace' ? 'Only 26 possible Caesar keys' : 'Shift alphabet by k'}</text>
        <g transform="translate(320,178)">
          <circle cx="0" cy="0" r="112" fill="#f4f8ff" stroke="var(--iv-line)" strokeWidth="2" />
          <circle cx="0" cy="0" r="62" fill="#fff" stroke="var(--iv-blue)" strokeWidth="2" />
          {keys.map((_, i) => {
            const a = (Math.PI * 2 * i) / 26 - Math.PI / 2
            const x = Math.cos(a) * 92
            const y = Math.sin(a) * 92
            const on = i === 3 || (mode === 'keyspace' && i % 5 === 0)
            return (
              <g key={i}>
                <circle cx={x} cy={y} r={on ? 12 : 8} fill={on ? '#fff7ea' : '#fff'} stroke={on ? 'var(--iv-amber)' : 'var(--iv-line)'} />
                <text className="iv-label" x={x} y={y + 4} textAnchor="middle" fontSize="8.5" style={T}>{i}</text>
              </g>
            )
          })}
          <text className="iv-f-blue" x="0" y="-10" textAnchor="middle" fontSize="24" fontWeight="800" style={T}>k</text>
          <text className="iv-sub" x="0" y="14" textAnchor="middle" fontSize="11" style={T}>secret shift</text>
          <PathArrow d="M-20,-82 C36,-110 92,-66 84,-8" blue />
        </g>
        {mode === 'concept' ? (
          <>
            <WordBox x={66} y={132} text="A" sub="letter" w={98} size={34} />
            <Box x={236} y={256} w={168} h={54} tone="soft">
              <text className="iv-title" x="320" y="286" textAnchor="middle" fontSize="18" style={T}>C = P + k mod 26</text>
            </Box>
            <WordBox x={476} y={132} text="D" sub="after k=3" w={98} size={34} tone="trust" />
            <PathArrow d="M164,170 C220,92 420,92 476,170" blue />
          </>
        ) : (
          <>
            <Box x={64} y={132} w={134} h={94} tone="warn">
              <text className="iv-f-amber" x="131" y="172" textAnchor="middle" fontSize="26" fontWeight="800" style={T}>26</text>
              <text className="iv-sub" x="131" y="194" textAnchor="middle" fontSize="11" style={T}>keys to try</text>
            </Box>
            <ThreatActor x={466} y={130} w={104} h={86} label="Attacker" sub="turns dial" color="var(--iv-red)" />
            <PathArrow d="M466,174 C408,228 250,228 198,174" red dashed />
          </>
        )}
      </svg>
    )
  }

  if (mode === 'decrypt') {
    return (
      <svg className="iv-svg" viewBox="0 0 640 340" role="img" aria-label="Caesar decryption reverses KHOOR by shifting minus three to recover HELLO">
        <IvDefs />
        <WordBox x={252} y={44} text="KHOOR" tone="warn" sub="ciphertext" w={136} />
        <Box x={236} y={154} w={168} h={74} tone="alert">
          <text className="iv-title" x="320" y="190" textAnchor="middle" fontSize="20" style={T}>shift -3</text>
          <text className="iv-sub" x="320" y="210" textAnchor="middle" fontSize="11" style={T}>reverse the encryption offset</text>
        </Box>
        <WordBox x={252} y={256} text="HELLO" tone="trust" sub="plaintext" w={136} />
        <PathArrow d="M320,120 C250,142 250,182 236,190" red />
        <PathArrow d="M404,190 C430,232 390,250 320,256" blue />
        <SecurityPacket path="M320,120 C250,142 250,182 236,190" color="var(--iv-red)" dur={2.8} square />
        <SecurityPacket path="M404,190 C430,232 390,250 320,256" color="var(--iv-emerald)" dur={2.8} delay={0.9} square />
        <AlphabetRow x={34} y={156} letters={shifted} title="Cipher alphabet" color="var(--iv-amber)" />
        <AlphabetRow x={34} y={234} letters={plain} title="Plain alphabet" color="var(--iv-emerald)" />
      </svg>
    )
  }

  return (
    <svg className="iv-svg" viewBox="0 0 640 360" role="img" aria-label="Caesar cipher shifts HELLO by 3 letters to KHOOR">
      <IvDefs />
      <WordBox x={42} y={48} text="HELLO" sub="plaintext" />
      <Box x={252} y={48} w={136} h={76} tone="soft">
        <text className="iv-title" x="320" y="84" textAnchor="middle" fontSize="20" style={T}>shift +3</text>
        <text className="iv-sub" x="320" y="106" textAnchor="middle" fontSize="11" style={T}>same offset for every letter</text>
      </Box>
      <WordBox x={470} y={48} text="KHOOR" tone="trust" sub="ciphertext" />
      <Arrow x1={170} y1={86} x2={252} y2={86} blue />
      <Arrow x1={388} y1={86} x2={470} y2={86} blue />
      <SecurityPacket path="M170,86 L252,86" color="var(--iv-blue)" dur={2.5} square />
      <SecurityPacket path="M388,86 L470,86" color="var(--iv-emerald)" dur={2.5} delay={0.8} square />
      <AlphabetRow x={34} y={178} letters={plain} title="Plain alphabet" />
      <AlphabetRow x={34} y={250} letters={shifted} title="Cipher alphabet" color="var(--iv-emerald)" />
      {moves.map(([from, a, to, b], i) => (
        <g key={`${from}-${to}`}>
          <PathArrow d={`M${43 + a * 22},204 C${43 + a * 22},224 ${43 + b * 22},224 ${43 + b * 22},250`} blue />
          <circle className="iv-verify" cx={43 + b * 22} cy="263" r="13" style={{ '--delay': `${i * 0.35}s`, '--dur': '3s' }} />
          <text className="iv-sub" x={43 + b * 22} y="238" textAnchor="middle" fontSize="10" style={T}>{`${from}->${to}`}</text>
        </g>
      ))}
    </svg>
  )
}

export function SubstitutionIntro() {
  return (
    <svg className="iv-svg" viewBox="0 0 640 340" role="img" aria-label="Substitution cipher idea: one plaintext symbol is replaced by one cipher symbol">
      <IvDefs />
      <text className="iv-title" x="320" y="42" textAnchor="middle" fontSize="15" style={T}>Substitution replaces symbols</text>
      <WordBox x={94} y={126} text="A" sub="plaintext symbol" w={112} size={38} />
      <Box x={264} y={116} w={112} h={96} tone="soft">
        <text className="iv-title" x="320" y="154" textAnchor="middle" fontSize="14" style={T}>rule</text>
        <text className="iv-f-blue" x="320" y="184" textAnchor="middle" fontSize="24" fontWeight="800" style={T}>{'A -> X'}</text>
      </Box>
      <WordBox x={434} y={126} text="X" tone="trust" sub="cipher symbol" w={112} size={38} />
      <Arrow x1={206} y1={164} x2={264} y2={164} blue />
      <Arrow x1={376} y1={164} x2={434} y2={164} blue />
      <Box x={216} y={252} w={208} h={46} tone="warn">
        <text className="iv-sub" x="320" y="280" textAnchor="middle" fontSize="12" style={T}>A full cipher uses one rule for every symbol.</text>
      </Box>
    </svg>
  )
}

export function MonoalphabeticMap() {
  const plain = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const cipher = 'QWERTYUIOPASDFGHJKLZXCVBNM'
  const pairs = [
    ['S', 'L'], ['E', 'T'], ['C', 'E'], ['U', 'X'], ['R', 'K'], ['E', 'T'],
  ]
  return (
    <svg className="iv-svg" viewBox="0 0 640 380" role="img" aria-label="Monoalphabetic substitution maps the alphabet to a scrambled cipher alphabet">
      <IvDefs />
      <AlphabetRow x={34} y={58} letters={plain} title="Plain alphabet" />
      <AlphabetRow x={34} y={138} letters={cipher} title="Scrambled cipher alphabet" color="var(--iv-purple)" />
      <rect className="iv-box soft" x="26" y="34" width="588" height="150" rx="16" />
      {['S->L', 'E->T', 'C->E', 'U->X', 'R->K'].map((m, i) => (
        <PathArrow key={m} d={`M${43 + plain.indexOf(m[0]) * 22},84 C${80 + i * 92},112 ${80 + i * 92},118 ${43 + cipher.indexOf(m[3]) * 22},138`} blue={i % 2 === 0} />
      ))}
      <text className="iv-title" x="320" y="238" textAnchor="middle" fontSize="14" style={T}>Sample word uses an arbitrary permutation, not a fixed shift</text>
      <WordBox x={88} y={268} text="SECURE" sub="plaintext" w={150} size={24} />
      <Box x={282} y={268} w={76} h={76} tone="soft">
        <text className="iv-title" x="320" y="309" textAnchor="middle" fontSize="16" style={T}>map</text>
      </Box>
      <WordBox x={402} y={268} text="LTexKT" tone="trust" sub="ciphertext" w={150} size={24} />
      <Arrow x1={238} y1={306} x2={282} y2={306} blue />
      <Arrow x1={358} y1={306} x2={402} y2={306} blue />
      {pairs.map((_, i) => (
        <SecurityPacket key={i} path={`M${238 + (i % 2) * 5},${300 + i * 2} L282,306`} color="var(--iv-blue)" dur={2.8} delay={i * 0.25} square r={4} />
      ))}
    </svg>
  )
}

export function SymmetricAsymmetricCompare() {
  return (
    <svg className="iv-svg" viewBox="0 0 640 390" role="img" aria-label="Symmetric encryption uses one shared secret key; asymmetric encryption uses public encryption and private decryption">
      <IvDefs />
      <text className="iv-title" x="160" y="30" textAnchor="middle" fontSize="14" style={T}>Symmetric: one shared secret</text>
      <text className="iv-title" x="480" y="30" textAnchor="middle" fontSize="14" style={T}>Asymmetric: public in, private out</text>
      <NetworkNode x={38} y={78} w={88} h={78} label="Alice" color="var(--iv-blue)" />
      <NetworkNode x={194} y={78} w={88} h={78} label="Bob" color="var(--iv-emerald)" />
      <Key x={116} y={192} w={88} h={74} label="Secret key" sub="same key" color="var(--iv-amber)" />
      <Arrow x1={126} y1={116} x2={194} y2={116} blue />
      <Arrow x1={194} y1={132} x2={126} y2={132} blue />
      <PathArrow d="M160,192 C112,170 88,154 82,156" dashed />
      <PathArrow d="M160,192 C210,170 238,154 240,156" dashed />
      <SecurityPacket path="M126,116 L194,116" color="var(--iv-amber)" dur={2.6} square />
      <SecurityPacket path="M194,132 L126,132" color="var(--iv-amber)" dur={2.6} delay={1.2} square />
      <BrowserClient x={356} y={78} w={88} h={78} label="Sender" color="var(--iv-blue)" />
      <GlassServer x={514} y={78} w={88} h={78} label="Receiver" color="var(--iv-emerald)" />
      <Key x={352} y={202} w={82} h={70} label="Public key" sub="encrypt" color="var(--iv-blue)" />
      <Key x={514} y={202} w={82} h={70} label="Private key" sub="decrypt" color="var(--iv-amber)" />
      <Arrow x1={444} y1={116} x2={514} y2={116} blue />
      <SecurityPacket path="M444,116 L514,116" color="var(--iv-purple)" dur={2.8} square />
      <PathArrow d="M394,202 C394,176 396,158 400,156" dashed blue />
      <PathArrow d="M556,202 C556,176 558,158 560,156" dashed />
      <line x1="320" y1="46" x2="320" y2="344" stroke="var(--iv-line)" strokeDasharray="6 7" />
      <text className="iv-sub" x="160" y="326" textAnchor="middle" fontSize="11.5" style={T}>Fast, but key distribution is the problem.</text>
      <text className="iv-sub" x="480" y="326" textAnchor="middle" fontSize="11.5" style={T}>Anyone can encrypt; only private key decrypts.</text>
    </svg>
  )
}

export function KerckhoffsScene() {
  return (
    <svg className="iv-svg" viewBox="0 0 640 360" role="img" aria-label="Kerckhoffs principle: algorithm can be public, security depends on the secret key">
      <IvDefs />
      <Box x={52} y={72} w={190} h={160} tone="soft">
        <path d="M88 104 C122 90 154 90 188 104 V196 C154 184 122 184 88 196 Z" fill="#fff" stroke="var(--iv-blue)" strokeWidth="1.8" />
        <line x1="138" y1="98" x2="138" y2="190" stroke="var(--iv-line)" />
        <text className="iv-title" x="147" y="140" textAnchor="middle" fontSize="14" style={T}>Algorithm</text>
        <text className="iv-sub" x="147" y="160" textAnchor="middle" fontSize="11.5" style={T}>published and reviewed</text>
      </Box>
      <Lock x={282} y={84} w={102} h={102} label="Secret key" sub="kept private" color="var(--iv-amber)" glow="var(--iv-amber)" />
      <ThreatActor x={478} y={72} w={104} h={86} label="Eve" sub="knows algorithm" color="var(--iv-red)" />
      <Arrow x1={242} y1={152} x2={282} y2={134} blue />
      <Arrow x1={384} y1={134} x2={478} y2={118} dashed red />
      <Box x={434} y={222} w={164} h={72} tone="alert">
        <text className="iv-title" x="516" y="250" textAnchor="middle" fontSize="13" style={T}>No key</text>
        <text className="iv-f-red" x="516" y="272" textAnchor="middle" fontSize="14" fontWeight="800" style={T}>decryption fails</text>
      </Box>
      <PathArrow d="M530,158 C530,190 516,202 516,222" red dashed />
      <path className="iv-block" d="M505 195 L527 217 M527 195 L505 217" stroke="var(--iv-red)" strokeWidth="3" strokeLinecap="round" />
      <text className="iv-sub" x="320" y="324" textAnchor="middle" fontSize="12" style={T}>Good crypto remains secure even when the design is public.</text>
    </svg>
  )
}

export function HashPipeline({ mode = 'fingerprint' }) {
  const title = {
    fingerprint: 'Fingerprint: message to digest',
    definition: 'Digest definition: fixed hexadecimal fingerprint',
    compress: 'Compression: any size to fixed size',
    oneWay: 'One-way: digest does not reveal M',
    weakCollision: 'Weak collision: given M, find M prime',
    strongCollision: 'Strong collision: find any two matching digests',
    avalanche: 'Avalanche: tiny input change, wild digest change',
    efficiency: 'Efficiency: fast to compute',
    defense: 'Collision defense: use longer digests and domains',
  }[mode] || 'Hash function'

  if (mode === 'definition') {
    const hex = ['7A', '9F', '02', 'C1', '88', '4E', 'D0', 'B6', '13', 'AA', '5C', 'FE']
    return (
      <svg className="iv-svg" viewBox="0 0 640 340" role="img" aria-label={title}>
        <IvDefs />
        <text className="iv-title" x="320" y="40" textAnchor="middle" fontSize="15" style={T}>Hash output is a fixed digest</text>
        <Chip x={52} y={58} w={112} text="any input" tone="soft" />
        <PathArrow d="M164,72 C222,72 238,112 258,136" blue dashed />
        <Box x={178} y={118} w={390} h={156} tone="trust">
          <text className="iv-sub" x="373" y="146" textAnchor="middle" fontSize="11" style={T}>hex digest close-up</text>
          {hex.map((h, i) => (
            <g key={h} transform={`translate(${214 + (i % 6) * 54},${166 + Math.floor(i / 6) * 48})`}>
              <rect className="iv-box" x="0" y="0" width="42" height="34" rx="9" />
              <text className="iv-f-emerald" x="21" y="22" textAnchor="middle" fontSize="14" fontWeight="800" style={T}>{h}</text>
            </g>
          ))}
        </Box>
        <text className="iv-sub" x="320" y="310" textAnchor="middle" fontSize="12" style={T}>The digest is the object compared, stored, and signed.</text>
      </svg>
    )
  }

  if (mode === 'compress') {
    return (
      <svg className="iv-svg" viewBox="0 0 640 360" role="img" aria-label={title}>
        <IvDefs />
        <text className="iv-title" x="320" y="34" textAnchor="middle" fontSize="14" style={T}>{title}</text>
        <MiniDoc x={58} y={76} title="large file" body="M..." />
        <MiniDoc x={58} y={206} title="small msg" body="M" />
        <HashNode x={270} y={142} />
        <Digest x={470} y={84} text="A91C...44" />
        <Digest x={470} y={214} text="0F2B...91" />
        <PathArrow d="M162,114 C220,114 224,168 270,168" blue />
        <PathArrow d="M162,244 C220,244 224,190 270,190" blue />
        <PathArrow d="M360,168 C420,148 430,118 470,114" />
        <PathArrow d="M360,190 C420,210 430,238 470,244" />
        <SecurityPacket path="M162,114 C220,114 224,168 270,168" color="var(--iv-blue)" dur={2.8} square />
        <SecurityPacket path="M162,244 C220,244 224,190 270,190" color="var(--iv-cyan)" dur={2.8} delay={0.7} square />
        <text className="iv-sub" x="536" y="300" textAnchor="middle" fontSize="12" style={T}>Same digest length, not same digest value.</text>
      </svg>
    )
  }

  if (mode === 'oneWay') {
    return (
      <svg className="iv-svg" viewBox="0 0 640 360" role="img" aria-label={title}>
        <IvDefs />
        <text className="iv-title" x="320" y="34" textAnchor="middle" fontSize="14" style={T}>{title}</text>
        <Digest x={76} y={132} text="7A9F...2C" w={154} />
        <HashNode x={276} y={122} />
        <MiniDoc x={470} y={122} title="message" body="M" />
        <PathArrow d="M230,162 C282,84 418,84 470,150" red dashed />
        <path className="iv-block" d="M306 94 L330 118 M330 94 L306 118" stroke="var(--iv-red)" strokeWidth="3.5" strokeLinecap="round" />
        <Arrow x1={470} y1={178} x2={366} y2={178} dim />
        <text className="iv-f-red" x="320" y="274" textAnchor="middle" fontSize="18" fontWeight="800" style={T}>reverse direction is blocked</text>
      </svg>
    )
  }

  if (mode === 'weakCollision') {
    return (
      <svg className="iv-svg" viewBox="0 0 640 360" role="img" aria-label={title}>
        <IvDefs />
        <text className="iv-title" x="320" y="34" textAnchor="middle" fontSize="14" style={T}>{title}</text>
        <MiniDoc x={58} y={78} title="locked target" body="M" />
        <Digest x={58} y={224} text="7A9F...2C" tone="trust" />
        <ThreatActor x={270} y={122} w={100} h={86} label="Eve" sub="searches M'" color="var(--iv-red)" />
        {["M'1", "M'2", "M'3"].map((m, i) => <MiniDoc key={m} x={448} y={52 + i * 92} title="candidate" body={m} tone={i === 2 ? 'alert' : ''} />)}
        <PathArrow d="M162,116 C206,116 228,144 270,154" red />
        <PathArrow d="M370,148 C398,98 420,90 448,90" red dashed />
        <PathArrow d="M370,164 C404,178 416,190 448,190" red dashed />
        <PathArrow d="M370,180 C398,238 420,274 448,274" red dashed />
        <path className="iv-block" d="M408 238 L430 260 M430 238 L408 260" stroke="var(--iv-red)" strokeWidth="3" strokeLinecap="round" />
        <text className="iv-sub" x="320" y="322" textAnchor="middle" fontSize="12" style={T}>Weak collision fixes M first; the attacker hunts only for a matching M'.</text>
      </svg>
    )
  }

  if (mode === 'defense') {
    return (
      <svg className="iv-svg" viewBox="0 0 640 360" role="img" aria-label={title}>
        <IvDefs />
        <text className="iv-title" x="320" y="38" textAnchor="middle" fontSize="15" style={T}>Make the collision target bigger</text>
        <Box x={80} y={92} w={160} h={166} tone="alert">
          <text className="iv-f-red" x="160" y="132" textAnchor="middle" fontSize="16" fontWeight="800" style={T}>short digest</text>
          <rect className="iv-box alert" x="128" y="164" width="64" height="42" rx="10" />
          <text className="iv-title" x="160" y="190" textAnchor="middle" fontSize="14" style={T}>64b</text>
        </Box>
        <Box x={400} y={78} w={170} h={200} tone="trust">
          <text className="iv-f-emerald" x="485" y="120" textAnchor="middle" fontSize="16" fontWeight="800" style={T}>long digest</text>
          <rect className="iv-box trust" x="426" y="154" width="118" height="42" rx="10" />
          <text className="iv-title" x="485" y="180" textAnchor="middle" fontSize="14" style={T}>256b+</text>
          <Chip x={428} y={222} w={114} text="domain sep" tone="soft" />
        </Box>
        <Arrow x1={240} y1={176} x2={400} y2={176} blue />
        <text className="iv-sub" x="320" y="316" textAnchor="middle" fontSize="12" style={T}>Use modern digest lengths and separate domains for different uses.</text>
      </svg>
    )
  }

  if (mode === 'strongCollision') {
    return (
      <svg className="iv-svg" viewBox="0 0 640 360" role="img" aria-label={title}>
        <IvDefs />
        <ThreatActor x={48} y={126} w={92} h={78} label="Eve" sub="chooses messages" color="var(--iv-red)" />
        <MiniDoc x={194} y={66} title="message A" body="A" />
        <MiniDoc x={194} y={210} title="message B" body="B" />
        <HashNode x={354} y={138} />
        <Digest x={496} y={149} text="same?" tone="alert" />
        <PathArrow d="M140,150 C170,118 176,104 194,104" red />
        <PathArrow d="M140,164 C170,220 176,248 194,248" red />
        <PathArrow d="M298,104 C334,112 344,140 354,164" />
        <PathArrow d="M298,248 C334,238 344,198 354,188" />
        <Arrow x1={444} y1={176} x2={496} y2={176} />
        <path className="iv-block" d="M464 164 L486 186 M486 164 L464 186" stroke="var(--iv-red)" strokeWidth="3" strokeLinecap="round" />
        <text className="iv-title" x="320" y="34" textAnchor="middle" fontSize="14" style={T}>Strong collision resistance blocks any pair with same digest</text>
      </svg>
    )
  }

  if (mode === 'avalanche') {
    const a = '10110010 01101101'
    const b = '01001101 11010010'
    return (
      <svg className="iv-svg" viewBox="0 0 640 360" role="img" aria-label={title}>
        <IvDefs />
        <WordBox x={58} y={72} text="HELLO" sub="input 1" w={136} />
        <WordBox x={58} y={210} text="HELLP" sub="one letter changed" w={136} tone="warn" />
        <HashNode x={278} y={142} />
        <Digest x={452} y={80} text={a} w={154} />
        <Digest x={452} y={218} text={b} w={154} tone="warn" />
        <PathArrow d="M194,110 C238,110 250,158 278,166" blue />
        <PathArrow d="M194,248 C238,248 250,190 278,190" blue />
        <PathArrow d="M368,166 C410,144 424,114 452,110" />
        <PathArrow d="M368,190 C410,212 424,248 452,248" />
        {[0, 1, 2, 3, 4].map((i) => <circle key={i} className="iv-verify" cx={468 + i * 25} cy={248} r="10" style={{ '--delay': `${i * 0.2}s` }} />)}
        <text className="iv-sub" x="320" y="330" textAnchor="middle" fontSize="12" style={T}>A tiny input change flips many output bits.</text>
      </svg>
    )
  }

  if (mode === 'efficiency') {
    return (
      <svg className="iv-svg" viewBox="0 0 640 320" role="img" aria-label={title}>
        <IvDefs />
        <text className="iv-title" x="320" y="42" textAnchor="middle" fontSize="14" style={T}>Efficient: quick to compute even for large inputs</text>
        <path d="M190 230 A130 130 0 0 1 450 230" fill="none" stroke="var(--iv-line)" strokeWidth="18" strokeLinecap="round" />
        <path d="M190 230 A130 130 0 0 1 410 122" fill="none" stroke="var(--iv-emerald)" strokeWidth="18" strokeLinecap="round" />
        <line x1="320" y1="230" x2="404" y2="136" stroke="var(--iv-amber)" strokeWidth="5" strokeLinecap="round" />
        <circle cx="320" cy="230" r="12" fill="#fff" stroke="var(--iv-amber)" strokeWidth="3" />
        <text className="iv-f-emerald" x="320" y="174" textAnchor="middle" fontSize="22" fontWeight="800" style={T}>FAST</text>
        <MiniDoc x={68} y={134} title="large input" body="M..." />
        <Digest x={468} y={158} text="digest" w={102} />
        <PathArrow d="M172,172 C222,116 270,104 320,110" blue dashed />
        <PathArrow d="M410,190 C432,178 448,174 468,184" />
      </svg>
    )
  }

  return (
    <svg className="iv-svg" viewBox="0 0 640 320" role="img" aria-label={title}>
      <IvDefs />
      <MiniDoc x={70} y={116} title="message" body="M" />
      <HashNode x={274} y={116} />
      <Digest x={470} y={125} />
      <Arrow x1={174} y1={154} x2={274} y2={154} blue />
      <Arrow x1={364} y1={154} x2={470} y2={154} />
      <SecurityPacket path="M174,154 L274,154" color="var(--iv-blue)" dur={2.5} square />
      <SecurityPacket path="M364,154 L470,154" color="var(--iv-emerald)" dur={2.5} delay={0.8} square />
      <text className="iv-title" x="320" y="52" textAnchor="middle" fontSize="14" style={T}>A digest is a compact fingerprint of the message</text>
    </svg>
  )
}

export function MacAuthScene() {
  return (
    <svg className="iv-svg" viewBox="0 0 640 390" role="img" aria-label="MAC authentication: sender computes a tag with a shared key and receiver recalculates to accept or reject">
      <IvDefs />
      <text className="iv-sub" x="30" y="34" fontSize="11" fontWeight="800" style={T}>SENDER</text>
      <MiniDoc x={38} y={58} title="message" body="M" />
      <Key x={178} y={58} w={86} h={76} label="Key K" color="var(--iv-amber)" />
      <Box x={310} y={58} w={96} h={76} tone="soft">
        <text className="iv-title" x="358" y="101" textAnchor="middle" fontSize="17" style={T}>MAC</text>
      </Box>
      <Chip x={470} y={82} w={90} text="Tag T" tone="trust" />
      <Arrow x1={142} y1={96} x2={178} y2={96} />
      <Arrow x1={264} y1={96} x2={310} y2={96} blue />
      <Arrow x1={406} y1={96} x2={470} y2={96} />
      <SecurityPacket path="M142,96 L178,96 L264,96 L310,96 L406,96 L470,96" color="var(--iv-amber)" dur={3.5} square />
      <text className="iv-sub" x="30" y="206" fontSize="11" fontWeight="800" style={T}>RECEIVER</text>
      <MiniDoc x={38} y={230} title="received M" body="M" />
      <Key x={178} y={230} w={86} h={76} label="same K" color="var(--iv-amber)" />
      <Box x={310} y={230} w={96} h={76} tone="soft">
        <text className="iv-title" x="358" y="273" textAnchor="middle" fontSize="17" style={T}>MAC</text>
      </Box>
      <Box x={448} y={220} w={74} h={46} tone="trust"><text className="iv-title" x="485" y="249" textAnchor="middle" fontSize="12" style={T}>T</text></Box>
      <Box x={448} y={278} w={74} h={46} tone="soft"><text className="iv-title" x="485" y="307" textAnchor="middle" fontSize="12" style={T}>T'</text></Box>
      <Verdict x={548} y={248} ok label="MATCH" />
      <Arrow x1={142} y1={268} x2={178} y2={268} />
      <Arrow x1={264} y1={268} x2={310} y2={268} blue />
      <Arrow x1={406} y1={268} x2={448} y2={300} />
      <Arrow x1={522} y1={244} x2={548} y2={268} />
      <Arrow x1={522} y1={300} x2={548} y2={284} />
    </svg>
  )
}

export function HmacConstruction({ mode = 'structure' } = {}) {
  if (mode === 'nested') {
    return (
      <svg className="iv-svg" viewBox="0 0 640 390" role="img" aria-label="HMAC nested construction: outer hash wraps the inner hash result">
        <IvDefs />
        <Box x={88} y={58} w={464} h={276} tone="warn">
          <text className="iv-title" x="320" y="92" textAnchor="middle" fontSize="15" style={T}>outer hash</text>
          <Chip x={128} y={126} w={106} text="K xor opad" tone="warn" />
          <Box x={178} y={164} w={284} h={112} tone="soft">
            <text className="iv-title" x="320" y="196" textAnchor="middle" fontSize="14" style={T}>inner hash</text>
            <Chip x={214} y={220} w={98} text="K xor ipad" tone="soft" />
            <MiniDoc x={334} y={206} title="message" body="M" />
          </Box>
          <Digest x={462} y={194} text="inner" w={68} tone="soft" />
        </Box>
        <Digest x={260} y={340} text="HMAC" w={120} />
        <PathArrow d="M462,220 C506,226 520,284 382,356" blue />
        <SecurityPacket path="M462,220 C506,226 520,284 382,356" color="var(--iv-emerald)" dur={3} square />
      </svg>
    )
  }
  return (
    <svg className="iv-svg" viewBox="0 0 640 390" role="img" aria-label="HMAC construction: key is mixed with ipad for inner hash, then opad for outer hash to produce HMAC">
      <IvDefs />
      <Key x={36} y={154} w={86} h={76} label="Key K" color="var(--iv-amber)" />
      <Chip x={160} y={86} w={92} text="K xor ipad" tone="soft" />
      <MiniDoc x={160} y={140} title="message" body="M" />
      <Box x={292} y={112} w={92} h={88} tone="soft">
        <text className="iv-title" x="338" y="154" textAnchor="middle" fontSize="15" style={T}>inner H</text>
        <text className="iv-sub" x="338" y="174" textAnchor="middle" fontSize="10.5" style={T}>H((K^ipad)||M)</text>
      </Box>
      <Chip x={160} y={252} w={92} text="K xor opad" tone="warn" />
      <Box x={424} y={154} w={96} h={86} tone="warn">
        <text className="iv-title" x="472" y="194" textAnchor="middle" fontSize="15" style={T}>outer H</text>
        <text className="iv-sub" x="472" y="214" textAnchor="middle" fontSize="10.5" style={T}>wraps inner</text>
      </Box>
      <Digest x={548} y={166} text="HMAC" w={76} />
      <PathArrow d="M122,176 C142,138 146,108 160,100" blue />
      <PathArrow d="M122,204 C142,246 146,264 160,266" />
      <Arrow x1={252} y1={100} x2={292} y2={136} blue />
      <Arrow x1={264} y1={178} x2={292} y2={164} />
      <PathArrow d="M384,156 C410,156 406,184 424,184" />
      <PathArrow d="M252,266 C340,266 360,220 424,206" />
      <Arrow x1={520} y1={197} x2={548} y2={197} blue />
      <SecurityPacket path="M122,176 C142,138 146,108 160,100 L252,100 L292,136" color="var(--iv-blue)" dur={3} square />
      <SecurityPacket path="M384,156 C410,156 406,184 424,184 L520,197 L548,197" color="var(--iv-emerald)" dur={3.2} delay={1.2} square />
      <text className="iv-title" x="320" y="34" textAnchor="middle" fontSize="14" style={T}>Nested hashes protect keyed authentication</text>
    </svg>
  )
}

export function EncryptVsHash() {
  return (
    <svg className="iv-svg" viewBox="0 0 640 420" role="img" aria-label="Encryption is reversible with a key; hashing is one-way and has no reverse path">
      <IvDefs />
      <text className="iv-title" x="42" y="36" fontSize="14" style={T}>Encryption: reversible with key</text>
      <MiniDoc x={42} y={64} title="message" body="M" />
      <Key x={176} y={64} w={82} h={76} label="Key" color="var(--iv-amber)" />
      <EncryptionCube x={300} y={64} w={82} h={76} label="Ciphertext" color="var(--iv-purple)" />
      <Key x={424} y={64} w={82} h={76} label="Key" color="var(--iv-amber)" />
      <MiniDoc x={546} y={64} title="message" body="M" tone="trust" />
      {[146, 258, 382, 506].map((x, i) => <Arrow key={x} x1={x} y1={102} x2={x + (i === 0 ? 30 : 42)} y2={102} blue={i === 0 || i === 3} />)}
      <SecurityPacket path="M146,102 L176,102 L258,102 L300,102 L382,102 L424,102 L506,102 L546,102" color="var(--iv-amber)" dur={4} square />
      <text className="iv-title" x="42" y="234" fontSize="14" style={T}>Hash: one-way fingerprint</text>
      <MiniDoc x={42} y={262} title="message" body="M" />
      <HashNode x={270} y={262} />
      <Digest x={484} y={271} />
      <Arrow x1={146} y1={300} x2={270} y2={300} blue />
      <Arrow x1={360} y1={300} x2={484} y2={300} />
      <PathArrow d="M484,330 C400,386 238,386 146,330" red dashed />
      <path className="iv-block" d="M306 360 L330 384 M330 360 L306 384" stroke="var(--iv-red)" strokeWidth="3.5" strokeLinecap="round" />
      <text className="iv-f-red" x="320" y="406" textAnchor="middle" fontSize="12" fontWeight="800" style={T}>No decryption key exists for a hash digest</text>
    </svg>
  )
}

export function ReplayAttackScene() {
  return (
    <svg className="iv-svg" viewBox="0 0 640 390" role="img" aria-label="Replay attack: Eve captures a valid message and resends it later, but a nonce or timestamp rejects stale traffic">
      <IvDefs />
      <NetworkNode x={42} y={72} w={88} h={78} label="Alice" color="var(--iv-blue)" />
      <GlassServer x={510} y={72} w={88} h={78} label="Server" color="var(--iv-emerald)" />
      <ThreatActor x={270} y={196} w={100} h={82} label="Eve stores" sub="old valid msg" color="var(--iv-red)" />
      <Arrow x1={130} y1={112} x2={510} y2={112} blue />
      <SecurityPacket path="M130,112 L510,112" color="var(--iv-emerald)" dur={3} square />
      <PathArrow d="M310,112 C306,148 310,174 320,196" red dashed />
      <SecurityPacket path="M310,112 C306,148 310,174 320,196" color="var(--iv-red)" dur={2.6} delay={0.7} square />
      <PathArrow d="M370,238 C460,238 476,170 510,138" red />
      <SecurityPacket path="M370,238 C460,238 476,170 510,138" color="var(--iv-red)" dur={3.4} delay={1.5} square />
      <Box x={442} y={230} w={158} h={76} tone="alert">
        <text className="iv-title" x="521" y="258" textAnchor="middle" fontSize="13" style={T}>Nonce/timestamp</text>
        <text className="iv-f-red" x="521" y="280" textAnchor="middle" fontSize="14" fontWeight="800" style={T}>REJECTS STALE</text>
      </Box>
      <VerificationPulse x={552} y={112} r={22} />
    </svg>
  )
}

export function ChallengeResponseScene() {
  return (
    <svg className="iv-svg" viewBox="0 0 640 390" role="img" aria-label="Challenge response: server sends a fresh challenge, client responds with a secret-derived answer, and old responses fail">
      <IvDefs />
      <GlassServer x={52} y={62} w={96} h={78} label="Server" color="var(--iv-blue)" />
      <Phone x={492} y={62} w={96} h={78} label="Client" color="var(--iv-emerald)" />
      <Arrow x1={148} y1={98} x2={492} y2={98} blue />
      <Arrow x1={492} y1={128} x2={148} y2={128} />
      <SecurityPacket path="M148,98 L492,98" color="var(--iv-blue)" dur={2.8} square />
      <SecurityPacket path="M492,128 L148,128" color="var(--iv-emerald)" dur={2.8} delay={1.1} square />
      <Chip x={266} y={64} w={108} text="fresh nonce" tone="soft" />
      <Key x={458} y={204} w={86} h={72} label="Secret" color="var(--iv-amber)" />
      <Box x={236} y={206} w={168} h={72} tone="trust">
        <text className="iv-title" x="320" y="235" textAnchor="middle" fontSize="13" style={T}>Response</text>
        <text className="iv-sub" x="320" y="255" textAnchor="middle" fontSize="11" style={T}>f(secret, challenge)</text>
      </Box>
      <Verdict x={54} y={220} ok label="VERIFY" />
      <Box x={248} y={314} w={144} h={50} tone="alert">
        <text className="iv-f-red" x="320" y="344" textAnchor="middle" fontSize="12.5" fontWeight="800" style={T}>old response fails</text>
      </Box>
      <path className="iv-block" d="M306 292 L330 316 M330 292 L306 316" stroke="var(--iv-red)" strokeWidth="3" strokeLinecap="round" />
    </svg>
  )
}

export function PasswordHashStore({ mode = 'store' } = {}) {
  if (mode === 'plaintextRisk') {
    return (
      <svg className="iv-svg" viewBox="0 0 640 390" role="img" aria-label="Plaintext password storage risk: database leak exposes user passwords directly">
        <IvDefs />
        <text className="iv-title" x="320" y="38" textAnchor="middle" fontSize="15" style={T}>Bad storage: plaintext password column</text>
        <GlassServer x={250} y={80} w={140} h={96} label="User DB" sub="leaked" color="var(--iv-red)" />
        <ThreatActor x={62} y={200} w={104} h={86} label="Attacker" sub="reads rows" color="var(--iv-red)" />
        <Box x={250} y={218} w={230} h={112} tone="alert">
          {['alice | hunter2', 'bob | qwerty', 'cara | letmein'].map((r, i) => (
            <text key={r} className="iv-f-red" x="276" y={250 + i * 26} fontSize="13" fontWeight="800" style={T}>{r}</text>
          ))}
        </Box>
        <PathArrow d="M250,136 C168,150 144,184 126,200" red dashed />
        <SecurityPacket path="M250,136 C168,150 144,184 126,200" color="var(--iv-red)" dur={2.8} square />
        <text className="iv-sub" x="320" y="364" textAnchor="middle" fontSize="12" style={T}>A breach immediately becomes a password breach.</text>
      </svg>
    )
  }

  if (mode === 'unix') {
    return (
      <svg className="iv-svg" viewBox="0 0 640 360" role="img" aria-label="Unix password record stores user, salt, and hash fields rather than plaintext">
        <IvDefs />
        <text className="iv-title" x="320" y="42" textAnchor="middle" fontSize="15" style={T}>Stored password record</text>
        <Box x={70} y={116} w={500} h={118} tone="soft">
          <text className="iv-sub" x="98" y="146" fontSize="11" style={T}>/etc/shadow style fields</text>
          <Chip x={100} y={172} w={78} text="user" tone="soft" />
          <Chip x={204} y={172} w={96} text="method" tone="warn" />
          <Chip x={326} y={172} w={88} text="salt" tone="warn" />
          <Chip x={440} y={172} w={92} text="hash" tone="trust" />
        </Box>
        <Digest x={236} y={268} text="$6$salt$hash..." w={168} />
        <PathArrow d="M370,234 C366,250 338,256 320,268" blue />
      </svg>
    )
  }

  return (
    <svg className="iv-svg" viewBox="0 0 640 390" role="img" aria-label="Password storage hashes salted passwords and compares digests without storing plaintext">
      <IvDefs />
      <MiniDoc x={42} y={76} title="password" body="pw" />
      <Chip x={190} y={100} w={84} text="salt" tone="warn" />
      <HashNode x={318} y={76} />
      <Digest x={482} y={85} text="stored hash" w={118} />
      <Arrow x1={146} y1={114} x2={190} y2={114} />
      <Arrow x1={274} y1={114} x2={318} y2={114} blue />
      <Arrow x1={408} y1={114} x2={482} y2={114} />
      <Box x={64} y={238} w={166} h={70} tone="alert">
        <text className="iv-f-red" x="147" y="268" textAnchor="middle" fontSize="13" fontWeight="800" style={T}>NOT plaintext</text>
        <text className="iv-sub" x="147" y="288" textAnchor="middle" fontSize="11" style={T}>no password column</text>
      </Box>
      <Box x={282} y={226} w={134} h={94} tone="soft">
        <text className="iv-title" x="349" y="258" textAnchor="middle" fontSize="13" style={T}>Login</text>
        <text className="iv-sub" x="349" y="278" textAnchor="middle" fontSize="11" style={T}>hash input again</text>
        <text className="iv-sub" x="349" y="298" textAnchor="middle" fontSize="11" style={T}>compare digests</text>
      </Box>
      <Verdict x={478} y={242} ok label="ACCESS" />
      <SecurityPacket path="M146,114 L190,114 L274,114 L318,114 L408,114 L482,114" color="var(--iv-amber)" dur={4} square />
    </svg>
  )
}

export function MutualAuthScene() {
  return (
    <svg className="iv-svg" viewBox="0 0 640 360" role="img" aria-label="Mutual authentication: A proves to B and B proves to A">
      <IvDefs />
      <NetworkNode x={58} y={94} w={98} h={84} label="Party A" color="var(--iv-blue)" />
      <NetworkNode x={484} y={94} w={98} h={84} label="Party B" color="var(--iv-emerald)" />
      <PathArrow d="M156,116 C260,58 380,58 484,116" blue />
      <PathArrow d="M484,158 C380,226 260,226 156,158" />
      <SecurityPacket path="M156,116 C260,58 380,58 484,116" color="var(--iv-blue)" dur={3} square />
      <SecurityPacket path="M484,158 C380,226 260,226 156,158" color="var(--iv-emerald)" dur={3} delay={1.2} square />
      <Box x={230} y={78} w={180} h={58} tone="soft">
        <text className="iv-title" x="320" y="103" textAnchor="middle" fontSize="12.5" style={T}>A proves identity to B</text>
      </Box>
      <Box x={230} y={200} w={180} h={58} tone="trust">
        <text className="iv-title" x="320" y="225" textAnchor="middle" fontSize="12.5" style={T}>B proves identity to A</text>
      </Box>
      <TrustBadge x={188} y={118} on label="B trusts A" />
      <TrustBadge x={426} y={202} on label="A trusts B" />
    </svg>
  )
}

export function CertificateAnatomy({ focus = 'definition' } = {}) {
  const fields = [
    ['Subject', 'www.example.com'],
    ['Public Key', 'RSA/ECC public key bits'],
    ['Issuer', 'Trusted Certificate Authority'],
    ['Validity', 'Not before / Not after'],
    ['Serial', 'Unique certificate number'],
    ['Signature', 'CA signs certificate body'],
  ]
  if (focus === 'fields') {
    return (
      <svg className="iv-svg" viewBox="0 0 640 390" role="img" aria-label="Certificate fields close-up showing subject, issuer, validity, public key, and signature">
        <IvDefs />
        <text className="iv-title" x="320" y="36" textAnchor="middle" fontSize="15" style={T}>Certificate field close-up</text>
        {fields.map(([k, v], i) => (
          <Box key={k} x={70 + (i % 2) * 260} y={76 + Math.floor(i / 2) * 88} w={220} h={62} tone={i === 5 ? 'trust' : 'soft'}>
            <text className="iv-title" x={180 + (i % 2) * 260} y={100 + Math.floor(i / 2) * 88} textAnchor="middle" fontSize="12.5" style={T}>{k}</text>
            <text className="iv-sub" x={180 + (i % 2) * 260} y={120 + Math.floor(i / 2) * 88} textAnchor="middle" fontSize="10" style={T}>{v}</text>
          </Box>
        ))}
      </svg>
    )
  }

  return (
    <svg className="iv-svg" viewBox="0 0 640 430" role="img" aria-label="Certificate anatomy showing subject, public key, issuer, validity, serial, and signature fields">
      <IvDefs />
      <Box x={104} y={36} w={432} h={352} tone="soft">
        <text className="iv-title" x="320" y="72" textAnchor="middle" fontSize="15" style={T}>X.509 Certificate</text>
        <Certificate x={270} y={86} w={100} h={76} label="" color="var(--iv-blue)" />
        {fields.map(([k, v], i) => {
          const y = 172 + i * 32
          return (
            <g key={k}>
              <rect className="iv-box" x="140" y={y} width="360" height="24" rx="7" />
              <text className="iv-title" x="154" y={y + 16} fontSize="11.5" style={T}>{k}</text>
              <text className="iv-sub" x="268" y={y + 16} fontSize="11" style={T}>{v}</text>
            </g>
          )
        })}
      </Box>
    </svg>
  )
}

export function CertVerificationPipeline() {
  const steps = [
    ['Hostname', 'URL matches subject'],
    ['Validity', 'date is inside window'],
    ['Signature', 'issuer signed it'],
    ['Chain', 'links to trust anchor'],
    ['Revocation', 'not revoked'],
  ]
  return (
    <svg className="iv-svg" viewBox="0 0 640 360" role="img" aria-label="Certificate verification checks hostname, validity, signature, chain, and revocation before trust">
      <IvDefs />
      {steps.map(([t, s], i) => {
        const x = 24 + i * 104
        return (
          <g key={t}>
            <Box x={x} y={106} w={88} h={92} tone="soft">
              <text className="iv-title" x={x + 44} y={ySafe(142)} textAnchor="middle" fontSize="11.5" style={T}>{t}</text>
              <text className="iv-sub" x={x + 44} y={162} textAnchor="middle" fontSize="9.7" style={T}>{s}</text>
            </Box>
            {i < steps.length - 1 && <Arrow x1={x + 88} y1={152} x2={x + 104} y2={152} blue />}
            <VerificationPulse x={x + 44} y={152} r={24} delay={i * 0.35} />
          </g>
        )
      })}
      <Verdict x={548} y={122} ok label="TRUST" />
      <PathArrow d="M592,208 C592,250 496,270 430,218" red dashed />
      <Box x={386} y={258} w={150} h={52} tone="alert">
        <text className="iv-f-red" x="461" y="290" textAnchor="middle" fontSize="12.5" fontWeight="800" style={T}>any failed check: WARNING</text>
      </Box>
    </svg>
  )
}

function ySafe(y) {
  return y
}

export function RevocationScene() {
  return (
    <svg className="iv-svg" viewBox="0 0 640 360" role="img" aria-label="Certificate revocation: issued certificate becomes compromised, revoked, checked by CRL or OCSP, and rejected by browser">
      <IvDefs />
      <Certificate x={34} y={92} w={92} h={82} label="Issued" color="var(--iv-blue)" />
      <ThreatActor x={166} y={92} w={92} h={82} label="Compromised" color="var(--iv-red)" />
      <Box x={298} y={92} w={92} h={82} tone="alert">
        <text className="iv-f-red" x="344" y="132" textAnchor="middle" fontSize="14" fontWeight="800" style={T}>REVOKED</text>
        <text className="iv-sub" x="344" y="154" textAnchor="middle" fontSize="10.5" style={T}>serial listed</text>
      </Box>
      <Box x={430} y={82} w={96} h={102} tone="soft">
        <text className="iv-title" x="478" y="122" textAnchor="middle" fontSize="13" style={T}>CRL/OCSP</text>
        <text className="iv-sub" x="478" y="146" textAnchor="middle" fontSize="10.5" style={T}>status check</text>
      </Box>
      <BrowserClient x={554} y={92} w={72} h={82} label="Rejects" color="var(--iv-red)" />
      {[126, 258, 390, 526].map((x) => <Arrow key={x} x1={x} y1={134} x2={x + 40} y2={134} red={x > 126} blue={x === 126} />)}
      <SecurityPacket path="M126,134 L166,134 L258,134 L298,134 L390,134 L430,134 L526,134 L554,134" color="var(--iv-red)" dur={4.2} square />
      <text className="iv-sub" x="320" y="270" textAnchor="middle" fontSize="12" style={T}>A certificate can be structurally valid yet no longer trusted.</text>
    </svg>
  )
}

export function CaSigningScene() {
  return (
    <svg className="iv-svg" viewBox="0 0 640 360" role="img" aria-label="Certificate authority signing: applicant is identity checked, then CA signs a certificate">
      <IvDefs />
      <NetworkNode x={44} y={112} w={96} h={82} label="Applicant" color="var(--iv-blue)" />
      <SecurityShield x={206} y={102} w={104} h={94} label="Identity check" sub="documents/domain" color="var(--iv-cyan)" />
      <CertificateAuthority x={376} y={102} w={104} h={94} label="CA" sub="signing key" color="var(--iv-blue)" />
      <Certificate x={540} y={112} w={82} h={82} label="Signed cert" color="var(--iv-emerald)" />
      <Arrow x1={140} y1={152} x2={206} y2={152} blue />
      <Arrow x1={310} y1={152} x2={376} y2={152} blue />
      <Arrow x1={480} y1={152} x2={540} y2={152} />
      <SecurityPacket path="M140,152 L206,152 L310,152 L376,152 L480,152 L540,152" color="var(--iv-blue)" dur={4} square />
      <VerificationPulse x={258} y={148} r={30} />
      <VerificationPulse x={428} y={148} r={30} delay={0.8} />
    </svg>
  )
}

export function IdsVsIps() {
  return (
    <svg className="iv-svg" viewBox="0 0 640 380" role="img" aria-label="IDS detects and alerts while traffic continues; IPS detects and blocks malicious traffic">
      <IvDefs />
      <text className="iv-title" x="160" y="34" textAnchor="middle" fontSize="14" style={T}>IDS: alert only</text>
      <text className="iv-title" x="480" y="34" textAnchor="middle" fontSize="14" style={T}>IPS: inline block</text>
      <Cloud x={30} y={104} w={82} h={72} label="Traffic" color="var(--iv-muted)" />
      <GlassServer x={228} y={104} w={82} h={72} label="Server" color="var(--iv-blue)" />
      <SecurityShield x={112} y={220} w={96} h={78} label="IDS" sub="detect" color="var(--iv-amber)" />
      <Arrow x1={112} y1={140} x2={228} y2={140} blue />
      <PathArrow d="M160,220 C160,188 160,170 160,142" dashed />
      <Box x={220} y={236} w={82} h={46} tone="warn"><text className="iv-f-amber" x="261" y="264" textAnchor="middle" fontSize="13" fontWeight="800" style={T}>ALERT</text></Box>
      <SecurityPacket path="M112,140 L228,140" color="var(--iv-red)" dur={2.8} square />
      <Cloud x={350} y={104} w={82} h={72} label="Traffic" color="var(--iv-muted)" />
      <SecurityShield x={462} y={104} w={82} h={72} label="IPS" color="var(--iv-red)" />
      <GlassServer x={558} y={104} w={70} h={72} label="Server" color="var(--iv-blue)" />
      <Arrow x1={432} y1={140} x2={462} y2={140} red />
      <Arrow x1={544} y1={140} x2={558} y2={140} dim />
      <path className="iv-block" d="M494 128 L516 150 M516 128 L494 150" stroke="var(--iv-red)" strokeWidth="3.5" strokeLinecap="round" />
      <line x1="320" y1="56" x2="320" y2="326" stroke="var(--iv-line)" strokeDasharray="6 7" />
    </svg>
  )
}

export function PacketFilterScene({ mode = 'filter' } = {}) {
  const packets = [
    ['10.0.0.8', '172.16.1.5', '443', 'TCP', 'ALLOW', 'trust'],
    ['8.8.8.8', '172.16.1.5', '23', 'TCP', 'BLOCK', 'alert'],
    ['10.0.0.9', '172.16.1.5', '53', 'UDP', 'ALLOW', 'trust'],
  ]
  if (mode === 'hierarchy') {
    return (
      <svg className="iv-svg" viewBox="0 0 640 400" role="img" aria-label="Broadcast key hierarchy: group key branches to subscriber keys for conditional access">
        <IvDefs />
        <text className="iv-title" x="320" y="36" textAnchor="middle" fontSize="15" style={T}>Broadcast key hierarchy</text>
        <Key x={276} y={62} w={88} h={74} label="Root K" color="var(--iv-amber)" />
        {['Package A', 'Package B'].map((p, i) => <Key key={p} x={156 + i * 246} y={174} w={88} h={70} label={p} sub="group key" color="var(--iv-blue)" />)}
        {['U1', 'U2', 'U3', 'U4'].map((u, i) => <Phone key={u} x={66 + i * 138} y={292} w={72} h={58} label={u} color={i < 2 ? 'var(--iv-emerald)' : 'var(--iv-cyan)'} />)}
        <PathArrow d="M320,136 C282,154 240,160 200,174" blue />
        <PathArrow d="M320,136 C360,154 406,160 446,174" blue />
        <PathArrow d="M200,244 C164,262 124,276 102,292" />
        <PathArrow d="M200,244 C226,266 256,276 240,292" />
        <PathArrow d="M446,244 C420,266 394,276 378,292" />
        <PathArrow d="M446,244 C482,262 520,276 516,292" />
      </svg>
    )
  }
  return (
    <svg className="iv-svg" viewBox="0 0 640 430" role="img" aria-label="Packet filter examines source IP, destination IP, port, and protocol against a rule table to allow or block packets">
      <IvDefs />
      <Box x={24} y={62} w={210} h={288} tone="soft">
        <text className="iv-title" x="129" y="92" textAnchor="middle" fontSize="14" style={T}>Packet fields</text>
        {packets.map((p, i) => (
          <g key={p.join('-')} transform={`translate(46,${116 + i * 72})`}>
            <rect className="iv-box" x="0" y="0" width="166" height="54" rx="10" />
            <text className="iv-sub" x="10" y="18" fontSize="10" style={T}>src {p[0]}  dst {p[1]}</text>
            <text className="iv-label" x="10" y="39" fontSize="11" style={T}>port {p[2]} / {p[3]}</text>
          </g>
        ))}
      </Box>
      <Box x={292} y={82} w={150} h={220} tone="soft">
        <text className="iv-title" x="367" y="112" textAnchor="middle" fontSize="14" style={T}>Rule table</text>
        {['ALLOW tcp/443', 'BLOCK tcp/23', 'ALLOW udp/53', 'DROP default'].map((r, i) => (
          <text key={r} className="iv-label" x="316" y={150 + i * 34} fontSize="11.5" style={T}>{r}</text>
        ))}
        <rect className="iv-scan" x="306" y="132" width="122" height="28" rx="8" fill="url(#ivSecure)" opacity="0.45" style={{ '--scan': '102px', '--dur': '3.4s' }} />
      </Box>
      {packets.map((p, i) => (
        <g key={`decision-${p[4]}-${i}`}>
          <PathArrow d={`M234,${143 + i * 72} C260,${143 + i * 72} 270,${192} 292,${192}`} blue={p[4] === 'ALLOW'} red={p[4] === 'BLOCK'} />
          <Box x={510} y={116 + i * 72} w={96} h={48} tone={p[5]}>
            <text className={p[4] === 'ALLOW' ? 'iv-f-emerald' : 'iv-f-red'} x="558" y={146 + i * 72} textAnchor="middle" fontSize="13" fontWeight="800" style={T}>{p[4]}</text>
          </Box>
          <Arrow x1={442} y1={192} x2={510} y2={140 + i * 72} blue={p[4] === 'ALLOW'} red={p[4] === 'BLOCK'} />
        </g>
      ))}
    </svg>
  )
}

export function StatefulFirewallScene() {
  const steps = ['SYN', 'SYN-ACK', 'ACK', 'ESTABLISHED']
  return (
    <svg className="iv-svg" viewBox="0 0 640 400" role="img" aria-label="Stateful firewall tracks SYN, SYN-ACK, ACK, and established connection state">
      <IvDefs />
      <NetworkNode x={42} y={78} w={88} h={78} label="Client" color="var(--iv-blue)" />
      <SecurityShield x={276} y={70} w={88} h={88} label="Firewall" color="var(--iv-cyan)" />
      <GlassServer x={510} y={78} w={88} h={78} label="Server" color="var(--iv-emerald)" />
      <PathArrow d="M130,106 C206,84 222,92 276,106" blue />
      <PathArrow d="M364,106 C426,92 450,86 510,106" blue />
      <PathArrow d="M510,138 C450,176 426,174 364,138" />
      <PathArrow d="M276,138 C222,174 206,176 130,138" />
      <SecurityPacket path="M130,106 C206,84 222,92 276,106 C364,106 426,92 510,106" color="var(--iv-blue)" dur={3.2} square />
      <SecurityPacket path="M510,138 C450,176 426,174 364,138 C276,138 222,174 130,138" color="var(--iv-cyan)" dur={3.2} delay={1.1} square />
      <Box x={154} y={230} w={332} h={112} tone="soft">
        <text className="iv-title" x="320" y="260" textAnchor="middle" fontSize="14" style={T}>State table updates</text>
        {steps.map((s, i) => (
          <g key={s}>
            <rect className={i === 3 ? 'iv-box trust' : 'iv-box'} x={184 + i * 74} y="282" width="64" height="34" rx="9" />
            <text className="iv-label" x={216 + i * 74} y="304" textAnchor="middle" fontSize="10.5" style={T}>{s}</text>
            {i < 3 && <Arrow x1={248 + i * 74} y1={299} x2={258 + i * 74} y2={299} />}
          </g>
        ))}
      </Box>
    </svg>
  )
}

export function MitmScene() {
  return (
    <svg className="iv-svg" viewBox="0 0 640 360" role="img" aria-label="Man in the middle: Alice connects to Eve and Eve separately connects to Bob">
      <IvDefs />
      <NetworkNode x={44} y={120} w={96} h={84} label="Alice" color="var(--iv-blue)" />
      <ThreatActor x={270} y={112} w={100} h={92} label="Eve" sub="middle" color="var(--iv-red)" />
      <NetworkNode x={500} y={120} w={96} h={84} label="Bob" color="var(--iv-emerald)" />
      <Arrow x1={140} y1={148} x2={270} y2={148} red />
      <Arrow x1={370} y1={148} x2={500} y2={148} red />
      <SecurityPacket path="M140,148 L270,148" color="var(--iv-amber)" dur={2.6} square />
      <SecurityPacket path="M370,148 L500,148" color="var(--iv-purple)" dur={2.6} delay={1} square />
      <Chip x={158} y={92} w={92} text="session 1" tone="warn" />
      <Chip x={390} y={92} w={92} text="session 2" tone="warn" />
      <path d="M208 226 L432 226" stroke="var(--iv-line)" strokeWidth="2" strokeDasharray="6 7" />
      <text className="iv-f-red" x="320" y="258" textAnchor="middle" fontSize="13" fontWeight="800" style={T}>No direct authenticated Alice-Bob channel</text>
    </svg>
  )
}

export function BruteForceScene() {
  return (
    <svg className="iv-svg" viewBox="0 0 640 360" role="img" aria-label="Brute force attack tries a candidate stream until verification finds a match">
      <IvDefs />
      <ThreatActor x={42} y={116} w={94} h={82} label="Attacker" color="var(--iv-red)" />
      <Box x={206} y={96} w={120} h={122} tone="soft">
        <text className="iv-title" x="266" y="126" textAnchor="middle" fontSize="14" style={T}>Candidates</text>
        {['0000', '1234', 'pass', '7Qx9'].map((c, i) => <Chip key={c} x={232} y={142 + i * 24} w={68} text={c} />)}
      </Box>
      <SecurityShield x={396} y={116} w={92} h={82} label="Verify" color="var(--iv-cyan)" />
      <Verdict x={522} y={126} ok label="MATCH" />
      <Arrow x1={136} y1={156} x2={206} y2={156} red />
      <Arrow x1={326} y1={156} x2={396} y2={156} blue />
      <Arrow x1={488} y1={156} x2={522} y2={156} />
      <DataStream path="M136,156 L206,156 L326,156 L396,156" count={4} color="var(--iv-red)" dur={2.4} r={4} />
      <text className="iv-sub" x="320" y="284" textAnchor="middle" fontSize="12" style={T}>fail, fail, fail ... until one candidate matches</text>
    </svg>
  )
}

export function DosFloodScene() {
  return (
    <svg className="iv-svg" viewBox="0 0 640 390" role="img" aria-label="Denial of service flood overwhelms resources and blocks legitimate users">
      <IvDefs />
      <NetworkNode x={38} y={70} w={84} h={72} label="User" color="var(--iv-blue)" />
      <ThreatActor x={38} y={212} w={84} h={72} label="Bots" color="var(--iv-red)" />
      <Router x={270} y={126} w={88} h={78} label="Resource" sub="queue fills" color="var(--iv-amber)" />
      <GlassServer x={516} y={126} w={88} h={78} label="Service" color="var(--iv-blue)" />
      <Arrow x1={122} y1={106} x2={270} y2={154} blue />
      <Arrow x1={122} y1={248} x2={270} y2={174} red />
      <Arrow x1={358} y1={164} x2={516} y2={164} dim />
      <SecurityPacket path="M122,106 L270,154" color="var(--iv-blue)" dur={3.4} square />
      <DataStream path="M122,248 L270,174" count={9} color="var(--iv-red)" dur={1.7} r={4} />
      <Box x={386} y={240} w={178} h={62} tone="alert">
        <text className="iv-f-red" x="475" y="267" textAnchor="middle" fontSize="13" fontWeight="800" style={T}>resource exhausted</text>
        <text className="iv-sub" x="475" y="287" textAnchor="middle" fontSize="11" style={T}>legitimate request delayed</text>
      </Box>
      <path className="iv-block" d="M446 150 L470 174 M470 150 L446 174" stroke="var(--iv-red)" strokeWidth="3" strokeLinecap="round" />
    </svg>
  )
}

export function BirthdayCollisionScene({ mode = 'paradox' }) {
  if (mode === 'hash') {
    return (
      <svg className="iv-svg" viewBox="0 0 640 360" role="img" aria-label="Birthday hash collision: many messages enter digest buckets, making a collision more likely than expected">
        <IvDefs />
        <text className="iv-title" x="320" y="36" textAnchor="middle" fontSize="14" style={T}>Many messages, finite digest buckets</text>
        {[0, 1, 2, 3, 4, 5].map((i) => <MiniDoc key={i} x={40 + i * 48} y={96 + (i % 2) * 78} title="" body={`M${i + 1}`} />)}
        <HashNode x={330} y={130} />
        {['00', '01', '10', '11'].map((b, i) => <Digest key={b} x={472} y={72 + i * 58} text={b} w={80} tone={i === 2 ? 'alert' : 'soft'} />)}
        <DataStream path="M300,164 L330,164 L420,164 L472,188" count={5} color="var(--iv-purple)" dur={2.4} r={4} />
        <path className="iv-block" d="M556 178 L578 200 M578 178 L556 200" stroke="var(--iv-red)" strokeWidth="3" strokeLinecap="round" />
      </svg>
    )
  }
  if (mode === 'workFactor') {
    return (
      <svg className="iv-svg" viewBox="0 0 640 360" role="img" aria-label="Birthday work factor: n-bit hash collision search costs about two to the n over two trials">
        <IvDefs />
        <text className="iv-title" x="320" y="38" textAnchor="middle" fontSize="15" style={T}>Collision search is easier than preimage search</text>
        <Box x={72} y={92} w={210} h={200} tone="warn">
          <text className="iv-title" x="177" y="124" textAnchor="middle" fontSize="13" style={T}>collision work</text>
          <rect className="iv-box warn" x="132" y="174" width="90" height="72" rx="12" />
          <text className="iv-f-amber" x="177" y="216" textAnchor="middle" fontSize="22" fontWeight="800" style={T}>2^(n/2)</text>
        </Box>
        <Box x={358} y={62} w={210} h={230} tone="soft">
          <text className="iv-title" x="463" y="94" textAnchor="middle" fontSize="13" style={T}>preimage work</text>
          <rect className="iv-box" x="404" y="124" width="118" height="122" rx="12" />
          <text className="iv-f-blue" x="463" y="190" textAnchor="middle" fontSize="24" fontWeight="800" style={T}>2^n</text>
        </Box>
      </svg>
    )
  }
  if (mode === 'defense') {
    return (
      <svg className="iv-svg" viewBox="0 0 640 360" role="img" aria-label="Birthday defense: longer digests and context labels make collision attacks impractical">
        <IvDefs />
        <text className="iv-title" x="320" y="42" textAnchor="middle" fontSize="15" style={T}>Birthday defense</text>
        <Digest x={82} y={116} text="128-bit" w={112} tone="warn" />
        <Digest x={426} y={102} text="256-bit" w={132} tone="trust" />
        <Arrow x1={194} y1={146} x2={426} y2={132} blue />
        <Box x={224} y={210} w={192} h={72} tone="soft">
          <text className="iv-title" x="320" y="240" textAnchor="middle" fontSize="13" style={T}>separate contexts</text>
          <text className="iv-sub" x="320" y="262" textAnchor="middle" fontSize="11" style={T}>signing != storage != MAC</text>
        </Box>
        <DataStream path="M194,146 L426,132" count={4} color="var(--iv-emerald)" dur={2.4} />
      </svg>
    )
  }
  return (
    <svg className="iv-svg" viewBox="0 0 640 360" role="img" aria-label="Birthday paradox: pairs grow quickly as people are added, so a matching birthday appears surprisingly soon">
      <IvDefs />
      <text className="iv-title" x="320" y="36" textAnchor="middle" fontSize="14" style={T}>Pairs grow faster than people</text>
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = (Math.PI * 2 * i) / 12
        const x = 320 + Math.cos(angle) * 130
        const y = 180 + Math.sin(angle) * 92
        return <circle key={i} cx={x} cy={y} r="14" fill={i === 2 || i === 9 ? '#fff7ea' : '#eef7ff'} stroke={i === 2 || i === 9 ? 'var(--iv-amber)' : 'var(--iv-blue)'} strokeWidth="1.6" />
      })}
      <PathArrow d="M255,100 C286,42 352,42 385,100" blue />
      <PathArrow d="M206,180 C150,210 150,254 236,268" />
      <line className="iv-s-amber" x1="385" y1="100" x2="320" y2="272" strokeWidth="3" strokeDasharray="6 5" />
      <text className="iv-f-amber" x="320" y="316" textAnchor="middle" fontSize="13" fontWeight="800" style={T}>one matching pair is enough</text>
    </svg>
  )
}

export function ZkCaveScene({ mode = 'cave' } = {}) {
  if (mode === 'motivation') {
    return (
      <svg className="iv-svg" viewBox="0 0 640 360" role="img" aria-label="Zero knowledge motivation: prove knowledge without revealing the secret">
        <IvDefs />
        <text className="iv-title" x="320" y="42" textAnchor="middle" fontSize="15" style={T}>Prove knowledge without revealing it</text>
        <Phone x={70} y={122} w={100} h={84} label="Prover" color="var(--iv-emerald)" />
        <GlassServer x={470} y={122} w={100} h={84} label="Verifier" color="var(--iv-blue)" />
        <Lock x={268} y={84} w={104} h={92} label="Secret" sub="never sent" color="var(--iv-amber)" />
        <Box x={244} y={236} w={152} h={58} tone="trust">
          <text className="iv-title" x="320" y="260" textAnchor="middle" fontSize="13" style={T}>convincing proof</text>
          <text className="iv-sub" x="320" y="280" textAnchor="middle" fontSize="11" style={T}>no secret leakage</text>
        </Box>
        <PathArrow d="M170,164 C238,218 402,218 470,164" blue />
        <PathArrow d="M320,176 C320,204 320,220 320,236" dashed />
      </svg>
    )
  }
  if (mode === 'rounds') {
    return (
      <svg className="iv-svg" viewBox="0 0 640 360" role="img" aria-label="Zero knowledge repetition reduces cheating probability across many rounds">
        <IvDefs />
        <text className="iv-title" x="320" y="42" textAnchor="middle" fontSize="15" style={T}>Repeat independent challenges</text>
        {[1, 2, 3, 4, 5].map((n, i) => (
          <Box key={n} x={58 + i * 106} y={122} w={78} h={94} tone={i < 4 ? 'trust' : 'warn'}>
            <text className="iv-title" x={97 + i * 106} y="158" textAnchor="middle" fontSize="13" style={T}>Round {n}</text>
            <text className="iv-sub" x={97 + i * 106} y="182" textAnchor="middle" fontSize="10.5" style={T}>random A/B</text>
          </Box>
        ))}
        <DataStream path="M136,170 L164,170 L242,170 L270,170 L348,170 L376,170 L454,170 L482,170" count={4} color="var(--iv-blue)" dur={3} />
        <text className="iv-f-emerald" x="320" y="286" textAnchor="middle" fontSize="17" fontWeight="800" style={T}>cheat chance shrinks each round</text>
      </svg>
    )
  }
  return (
    <svg className="iv-svg" viewBox="0 0 640 390" role="img" aria-label="Zero-knowledge cave: Alice proves she knows the secret door by exiting the challenged path without revealing the secret">
      <IvDefs />
      <path d="M160 292 C70 180 145 70 320 78 C495 70 570 180 480 292" fill="#f4f8ff" stroke="var(--iv-line)" strokeWidth="2" />
      <path d="M320 80 C248 138 220 210 220 292" fill="none" stroke="var(--iv-blue)" strokeWidth="20" strokeLinecap="round" opacity="0.18" />
      <path d="M320 80 C392 138 420 210 420 292" fill="none" stroke="var(--iv-emerald)" strokeWidth="20" strokeLinecap="round" opacity="0.18" />
      <rect className="iv-box warn" x="278" y="68" width="84" height="48" rx="12" />
      <text className="iv-title" x="320" y="98" textAnchor="middle" fontSize="12.5" style={T}>secret door</text>
      <NetworkNode x={68} y={276} w={84} h={74} label="Bob" sub="challenge: B" color="var(--iv-blue)" />
      <Phone x={376} y={238} w={84} h={74} label="Alice" sub="exits B" color="var(--iv-emerald)" />
      <PathArrow d="M152,308 C220,340 324,336 376,294" blue />
      <SecurityPacket path="M376,294 C324,336 220,340 152,308" color="var(--iv-emerald)" dur={3} square />
      <text className="iv-sub" x="320" y="354" textAnchor="middle" fontSize="12" style={T}>Bob learns Alice knows the secret, not the secret itself.</text>
    </svg>
  )
}

export function ShannonScene() {
  return (
    <svg className="iv-svg" viewBox="0 0 640 370" role="img" aria-label="Shannon principles: confusion hides the key relationship and diffusion spreads one plaintext bit across ciphertext">
      <IvDefs />
      <text className="iv-title" x="160" y="34" textAnchor="middle" fontSize="14" style={T}>Confusion</text>
      <text className="iv-title" x="480" y="34" textAnchor="middle" fontSize="14" style={T}>Diffusion</text>
      <Box x={48} y={74} w={224} h={198} tone="soft">
        {['A', 'B', 'C', 'D'].map((l, i) => <Chip key={l} x={74} y={106 + i * 34} w={52} text={l} />)}
        {['Q', 'M', 'Z', 'R'].map((l, i) => <Chip key={l} x={192} y={106 + ((i + 2) % 4) * 34} w={52} text={l} tone="warn" />)}
        {[0, 1, 2, 3].map((i) => <PathArrow key={i} d={`M126,${120 + i * 34} C150,${100 + i * 20} 170,${210 - i * 22} 192,${120 + ((i + 2) % 4) * 34}`} blue={i % 2 === 0} />)}
      </Box>
      <Box x={368} y={74} w={224} h={198} tone="soft">
        <Chip x={400} y={118} w={54} text="bit" tone="warn" />
        {[0, 1, 2, 3, 4, 5].map((i) => <Chip key={i} x={494 + (i % 2) * 46} y={96 + i * 26} w={36} text={i % 2 ? '1' : '0'} tone={i < 5 ? 'trust' : ''} />)}
        {[0, 1, 2, 3, 4].map((i) => <PathArrow key={i} d={`M454,132 C478,${90 + i * 28} 486,${100 + i * 25} ${494 + (i % 2) * 46},${110 + i * 26}`} />)}
      </Box>
      <line x1="320" y1="56" x2="320" y2="306" stroke="var(--iv-line)" strokeDasharray="6 7" />
    </svg>
  )
}

export function KeyDistributionProblem({ mode = 'distribution' } = {}) {
  if (mode === 'reuse') {
    return (
      <svg className="iv-svg" viewBox="0 0 640 360" role="img" aria-label="One-time pad reuse exposes C1 xor C2 equals M1 xor M2">
        <IvDefs />
        <text className="iv-title" x="320" y="40" textAnchor="middle" fontSize="15" style={T}>Pad reuse leaks relationships</text>
        <WordBox x={64} y={92} text="C1" sub="M1 xor K" w={112} tone="warn" />
        <WordBox x={64} y={216} text="C2" sub="M2 xor K" w={112} tone="warn" />
        <Box x={258} y={134} w={124} h={92} tone="alert">
          <text className="iv-f-red" x="320" y="172" textAnchor="middle" fontSize="28" fontWeight="800" style={T}>xor</text>
          <text className="iv-sub" x="320" y="198" textAnchor="middle" fontSize="11" style={T}>same K cancels</text>
        </Box>
        <WordBox x={468} y={154} text="M1⊕M2" sub="plaintext relation" w={118} tone="alert" size={18} />
        <PathArrow d="M176,130 C226,130 238,156 258,164" red />
        <PathArrow d="M176,254 C226,254 238,198 258,196" red />
        <Arrow x1={382} y1={180} x2={468} y2={192} red />
      </svg>
    )
  }
  return (
    <svg className="iv-svg" viewBox="0 0 640 380" role="img" aria-label="One-time pad limitation: pad must be as long as the message and delivered securely by courier">
      <IvDefs />
      <WordBox x={48} y={74} text="MEET AT DAWN" w={210} size={18} sub="message" />
      <WordBox x={382} y={74} text="XQ7P 9K L2RM" w={210} size={18} sub="one-time pad" tone="warn" />
      <Arrow x1={258} y1={112} x2={382} y2={112} blue />
      <text className="iv-title" x="320" y="176" textAnchor="middle" fontSize="14" style={T}>Pad must be random, secret, single-use, and as long as M</text>
      <NetworkNode x={68} y={248} w={86} h={72} label="Sender" color="var(--iv-blue)" />
      <Key x={278} y={238} w={86} h={82} label="Courier" sub="bottleneck" color="var(--iv-amber)" />
      <NetworkNode x={486} y={248} w={86} h={72} label="Receiver" color="var(--iv-emerald)" />
      <Arrow x1={154} y1={284} x2={278} y2={284} />
      <Arrow x1={364} y1={284} x2={486} y2={284} />
      <SecurityPacket path="M154,284 L278,284 L364,284 L486,284" color="var(--iv-amber)" dur={4} square />
    </svg>
  )
}

export function CrcVsCrypto({ mode = 'compare' } = {}) {
  if (mode === 'weakSum') {
    return (
      <svg className="iv-svg" viewBox="0 0 640 340" role="img" aria-label="Simple additive checksum can be fooled by offsetting changes">
        <IvDefs />
        <text className="iv-title" x="320" y="40" textAnchor="middle" fontSize="15" style={T}>Additive checksum can be fooled</text>
        <Box x={78} y={104} w={170} h={114} tone="soft">
          <text className="iv-title" x="163" y="138" textAnchor="middle" fontSize="16" style={T}>10 + 20 + 30</text>
          <text className="iv-f-blue" x="163" y="178" textAnchor="middle" fontSize="22" fontWeight="800" style={T}>sum = 60</text>
        </Box>
        <Box x={392} y={104} w={170} h={114} tone="alert">
          <text className="iv-title" x="477" y="138" textAnchor="middle" fontSize="16" style={T}>11 + 19 + 30</text>
          <text className="iv-f-red" x="477" y="178" textAnchor="middle" fontSize="22" fontWeight="800" style={T}>sum = 60</text>
        </Box>
        <ThreatActor x={268} y={222} w={104} h={78} label="Eve" sub="+1 / -1" color="var(--iv-red)" />
        <PathArrow d="M248,160 C296,122 344,122 392,160" red dashed />
      </svg>
    )
  }
  if (mode === 'worked') {
    return (
      <svg className="iv-svg" viewBox="0 0 640 390" role="img" aria-label="CRC worked example shows polynomial division steps and remainder">
        <IvDefs />
        <text className="iv-title" x="320" y="42" textAnchor="middle" fontSize="15" style={T}>CRC worked example</text>
        <Box x={86} y={82} w={468} h={222} tone="soft">
          <text className="iv-f-blue" x="128" y="128" fontSize="24" fontWeight="800" style={T}>1101011011 ÷ 10011</text>
          <line x1="128" y1="148" x2="470" y2="148" stroke="var(--iv-line)" strokeWidth="2" />
          {['10011', '01001', '00000', '10011'].map((s, i) => (
            <text key={i} className={i === 3 ? 'iv-f-emerald' : 'iv-label'} x={170 + i * 66} y={188 + i * 24} fontSize="20" fontWeight="800" style={T}>{s}</text>
          ))}
          <text className="iv-f-emerald" x="356" y="278" fontSize="24" fontWeight="800" style={T}>remainder = 1110</text>
        </Box>
      </svg>
    )
  }
  if (mode === 'attack') {
    return (
      <svg className="iv-svg" viewBox="0 0 640 360" role="img" aria-label="CRC attack: Eve modifies data and recomputes CRC so the receiver accepts">
        <IvDefs />
        <ThreatActor x={72} y={128} w={106} h={86} label="Eve" sub="edits data" color="var(--iv-red)" />
        <MiniDoc x={256} y={84} title="modified data" body="D'" tone="alert" />
        <Box x={256} y={218} w={104} h={70} tone="soft"><text className="iv-title" x="308" y="258" textAnchor="middle" fontSize="15" style={T}>new CRC</text></Box>
        <Verdict x={474} y={140} ok label="ACCEPT" />
        <PathArrow d="M178,166 C218,128 232,122 256,122" red />
        <PathArrow d="M178,186 C222,240 232,252 256,252" red />
        <PathArrow d="M360,122 C414,122 430,156 474,164" />
        <PathArrow d="M360,252 C420,238 438,198 474,180" />
      </svg>
    )
  }
  return (
    <svg className="iv-svg" viewBox="0 0 640 390" role="img" aria-label="CRC detects accidental errors but an attacker can recompute it; cryptographic hash resists adversarial tampering">
      <IvDefs />
      <text className="iv-title" x="160" y="34" textAnchor="middle" fontSize="14" style={T}>CRC: accidental errors</text>
      <text className="iv-title" x="480" y="34" textAnchor="middle" fontSize="14" style={T}>Crypto hash/MAC: adversarial</text>
      <MiniDoc x={46} y={84} title="data" body="D" />
      <Box x={184} y={84} w={86} h={76} tone="soft"><text className="iv-title" x="227" y="128" textAnchor="middle" fontSize="15" style={T}>CRC</text></Box>
      <Verdict x={104} y={222} ok label="ERROR OK" />
      <ThreatActor x={224} y={222} w={80} h={72} label="Eve" sub="recomputes" color="var(--iv-red)" />
      <Arrow x1={150} y1={122} x2={184} y2={122} blue />
      <PathArrow d="M270,122 C310,160 310,210 286,222" red dashed />
      <MiniDoc x={366} y={84} title="data" body="D" />
      <HashNode x={500} y={84} label="H/K" />
      <Verdict x={436} y={222} ok={false} label="TAMPER" />
      <Arrow x1={470} y1={122} x2={500} y2={122} blue />
      <path className="iv-block" d="M508 198 L532 222 M532 198 L508 222" stroke="var(--iv-red)" strokeWidth="3" strokeLinecap="round" />
      <line x1="320" y1="56" x2="320" y2="330" stroke="var(--iv-line)" strokeDasharray="6 7" />
    </svg>
  )
}

export function TigerStructure({ mode = 'intro' }) {
  const headlines = {
    intro: ['Tiger hash overview', 'message block to 192-bit digest'],
    structure: ['Tiger structure', '3 passes over 512-bit blocks'],
    rounds: ['Tiger rounds', 'mix, S-box lookups, multiply'],
    schedule: ['Key schedule', 'words are transformed between passes'],
    avalanche: ['Tiger avalanche', 'small change spreads through state'],
  }
  const [title, sub] = headlines[mode] || headlines.intro
  return (
    <svg className="iv-svg" viewBox="0 0 640 390" role="img" aria-label={`${title}: ${sub}`}>
      <IvDefs />
      <text className="iv-title" x="320" y="34" textAnchor="middle" fontSize="14" style={T}>{title}</text>
      <text className="iv-sub" x="320" y="54" textAnchor="middle" fontSize="11.5" style={T}>{sub}</text>
      {mode === 'intro' && (
        <>
          <Box x={82} y={104} w={190} h={150} tone="soft">
            <text className="iv-title" x="177" y="148" textAnchor="middle" fontSize="15" style={T}>Block size</text>
            <text className="iv-f-blue" x="177" y="190" textAnchor="middle" fontSize="30" fontWeight="800" style={T}>512 bits</text>
          </Box>
          <Box x={368} y={104} w={190} h={150} tone="trust">
            <text className="iv-title" x="463" y="148" textAnchor="middle" fontSize="15" style={T}>Output size</text>
            <text className="iv-f-emerald" x="463" y="190" textAnchor="middle" fontSize="30" fontWeight="800" style={T}>192 bits</text>
          </Box>
        </>
      )}
      {mode === 'structure' && (
        <>
          {['Pass 1', 'Pass 2', 'Pass 3'].map((p, i) => <Box key={p} x={116 + i * 144} y={134} w={104} h={92} tone="soft"><text className="iv-title" x={168 + i * 144} y="174" textAnchor="middle" fontSize="14" style={T}>{p}</text><text className="iv-sub" x={168 + i * 144} y="198" textAnchor="middle" fontSize="10.5" style={T}>8 rounds</text></Box>)}
          {[220, 364].map((x) => <Arrow key={x} x1={x} y1={180} x2={x + 40} y2={180} blue />)}
          <DataStream path="M90,180 L116,180 L220,180 L260,180 L364,180 L404,180 L508,180" count={3} color="var(--iv-blue)" dur={3} />
        </>
      )}
      {mode === 'rounds' && (
        <>
          {['a', 'b', 'c'].map((r, i) => <Chip key={r} x={92} y={112 + i * 52} w={60} text={r} />)}
          {['mix', 'S-box', 'multiply'].map((r, i) => <Box key={r} x={240 + i * 108} y={136} w={82} h={72} tone="soft"><text className="iv-title" x={281 + i * 108} y="178" textAnchor="middle" fontSize="12.5" style={T}>{r}</text></Box>)}
          {[152, 322, 430].map((x, i) => <Arrow key={x} x1={x} y1={172} x2={i === 0 ? 240 : x + 26} y2={172} blue />)}
          <SecurityPacket path="M152,172 L240,172 L322,172 L348,172 L430,172 L456,172" color="var(--iv-amber)" dur={3} square />
        </>
      )}
      {mode === 'schedule' && (
        <>
          {Array.from({ length: 8 }).map((_, i) => <Chip key={i} x={72 + i * 62} y={112} w={46} text={`x${i}`} tone={i % 2 ? 'warn' : ''} />)}
          {Array.from({ length: 8 }).map((_, i) => <Chip key={`s${i}`} x={72 + i * 62} y={222} w={46} text={`x${i}'`} tone={i % 2 ? 'trust' : 'soft'} />)}
          {Array.from({ length: 8 }).map((_, i) => <PathArrow key={`a${i}`} d={`M${95 + i * 62},140 C${110 + i * 44},172 ${84 + i * 58},194 ${95 + i * 62},222`} blue={i % 2 === 0} />)}
          <text className="iv-sub" x="320" y="314" textAnchor="middle" fontSize="12" style={T}>The schedule changes message words before the next pass.</text>
        </>
      )}
      {mode === 'avalanche' && (
        <>
          <WordBox x={54} y={116} text="block A" w={120} size={16} />
          <WordBox x={54} y={218} text="block B" w={120} size={16} tone="warn" sub="1 bit changed" />
          <EncryptionCube x={270} y={164} w={96} h={90} label="Tiger" color="var(--iv-purple)" />
          <Digest x={476} y={116} text="9C71..." w={110} />
          <Digest x={476} y={218} text="2A0F..." w={110} tone="warn" />
          <PathArrow d="M174,154 C220,154 232,194 270,194" blue />
          <PathArrow d="M174,256 C220,256 232,208 270,208" blue />
          <PathArrow d="M366,194 C418,172 430,150 476,146" />
          <PathArrow d="M366,208 C418,228 430,248 476,248" />
          {[0, 1, 2, 3].map((i) => <VerificationPulse key={i} x={492 + i * 22} y={248} r={10} delay={i * 0.25} />)}
        </>
      )}
    </svg>
  )
}

export function WepPacketScene({ mode = 'packet' } = {}) {
  if (mode === 'components') {
    return (
      <svg className="iv-svg" viewBox="0 0 640 360" role="img" aria-label="WEP components: shared key, IV, RC4 stream cipher, and ICV checksum">
        <IvDefs />
        <text className="iv-title" x="320" y="38" textAnchor="middle" fontSize="15" style={T}>WEP components</text>
        <Key x={78} y={110} w={96} h={80} label="Shared K" color="var(--iv-amber)" />
        <Chip x={226} y={126} w={84} text="IV" tone="warn" />
        <Box x={368} y={110} w={96} h={80} tone="soft"><text className="iv-title" x="416" y="156" textAnchor="middle" fontSize="16" style={T}>RC4</text></Box>
        <Digest x={506} y={122} text="ICV" w={80} tone="alert" />
        <PathArrow d="M174,150 C196,126 210,126 226,140" blue />
        <Arrow x1={310} y1={150} x2={368} y2={150} blue />
        <Arrow x1={464} y1={150} x2={506} y2={150} />
      </svg>
    )
  }
  if (mode === 'weakness') {
    return (
      <svg className="iv-svg" viewBox="0 0 640 360" role="img" aria-label="WEP weaknesses: clear IV reuse and weak ICV enable packet tampering">
        <IvDefs />
        <ThreatActor x={68} y={132} w={106} h={86} label="Eve" sub="captures IVs" color="var(--iv-red)" />
        <Box x={252} y={70} w={136} h={78} tone="warn"><text className="iv-f-amber" x="320" y="116" textAnchor="middle" fontSize="15" fontWeight="800" style={T}>IV repeats</text></Box>
        <Box x={252} y={214} w={136} h={78} tone="alert"><text className="iv-f-red" x="320" y="260" textAnchor="middle" fontSize="15" fontWeight="800" style={T}>ICV linear</text></Box>
        <Verdict x={472} y={142} ok={false} label="BROKEN" />
        <PathArrow d="M174,164 C222,110 232,108 252,108" red dashed />
        <PathArrow d="M174,184 C222,244 232,252 252,252" red dashed />
      </svg>
    )
  }
  if (mode === 'wpa') {
    return (
      <svg className="iv-svg" viewBox="0 0 640 360" role="img" aria-label="WPA improves Wi-Fi security with stronger key management and message integrity">
        <IvDefs />
        <text className="iv-title" x="320" y="42" textAnchor="middle" fontSize="15" style={T}>WPA moves beyond WEP</text>
        {['fresh keys', 'strong integrity', 'AES/CCMP'].map((t, i) => (
          <Box key={t} x={74 + i * 178} y={128} w={136} h={92} tone="trust">
            <text className="iv-f-emerald" x={142 + i * 178} y="176" textAnchor="middle" fontSize="14" fontWeight="800" style={T}>{t}</text>
          </Box>
        ))}
        <DataStream path="M210,174 L252,174 L388,174 L430,174" count={3} color="var(--iv-emerald)" dur={2.8} />
      </svg>
    )
  }
  return (
    <svg className="iv-svg" viewBox="0 0 640 360" role="img" aria-label="WEP packet uses IV concatenated with key, IV is clear, RC4 encrypts data, and ICV weakness allows tampering">
      <IvDefs />
      <Chip x={42} y={88} w={78} text="IV" tone="warn" />
      <Key x={150} y={70} w={82} h={76} label="K" color="var(--iv-amber)" />
      <Box x={268} y={78} w={94} h={78} tone="soft"><text className="iv-title" x="315" y="122" textAnchor="middle" fontSize="15" style={T}>RC4</text></Box>
      <MiniDoc x={398} y={80} title="data+ICV" body="D" />
      <Digest x={526} y={89} text="cipher" w={82} />
      <Arrow x1={120} y1={102} x2={150} y2={102} />
      <Arrow x1={232} y1={108} x2={268} y2={108} blue />
      <Arrow x1={362} y1={118} x2={398} y2={118} />
      <Arrow x1={502} y1={118} x2={526} y2={118} />
      <Box x={70} y={226} w={156} h={58} tone="warn"><text className="iv-title" x="148" y="260" textAnchor="middle" fontSize="13" style={T}>IV sent in clear</text></Box>
      <Box x={386} y={226} w={178} h={58} tone="alert"><text className="iv-f-red" x="475" y="260" textAnchor="middle" fontSize="13" fontWeight="800" style={T}>ICV is not cryptographic</text></Box>
      <PathArrow d="M82,116 C80,162 104,196 148,226" dashed />
      <PathArrow d="M442,156 C432,188 440,206 475,226" red dashed />
    </svg>
  )
}

export function GsmAuthScene({ mode = 'challenge' } = {}) {
  if (mode === 'sim') {
    return (
      <svg className="iv-svg" viewBox="0 0 640 340" role="img" aria-label="SIM stores a long-term subscriber key used for GSM authentication">
        <IvDefs />
        <Phone x={252} y={78} w={136} h={118} label="SIM" sub="subscriber identity" color="var(--iv-emerald)" />
        <Key x={270} y={226} w={100} h={76} label="Ki" sub="long-term secret" color="var(--iv-amber)" />
        <PathArrow d="M320,196 C320,210 320,218 320,226" blue />
        <text className="iv-title" x="320" y="42" textAnchor="middle" fontSize="15" style={T}>SIM holds the subscriber secret</text>
      </svg>
    )
  }
  if (mode === 'limits') {
    return (
      <svg className="iv-svg" viewBox="0 0 640 360" role="img" aria-label="GSM authentication limits: network authenticates SIM but classic GSM lacks mutual authentication">
        <IvDefs />
        <Phone x={78} y={132} w={104} h={86} label="SIM" color="var(--iv-emerald)" />
        <GlassServer x={458} y={132} w={104} h={86} label="Network" color="var(--iv-blue)" />
        <Arrow x1={182} y1={162} x2={458} y2={162} blue />
        <PathArrow d="M458,194 C380,270 260,270 182,194" red dashed />
        <path className="iv-block" d="M310 246 L334 270 M334 246 L310 270" stroke="var(--iv-red)" strokeWidth="3.5" strokeLinecap="round" />
        <text className="iv-f-red" x="320" y="306" textAnchor="middle" fontSize="14" fontWeight="800" style={T}>classic GSM: no strong network proof to SIM</text>
      </svg>
    )
  }
  return (
    <svg className="iv-svg" viewBox="0 0 640 360" role="img" aria-label="GSM authentication: network sends random challenge, SIM computes response and session key">
      <IvDefs />
      <GlassServer x={56} y={92} w={102} h={86} label="Network" color="var(--iv-blue)" />
      <Phone x={486} y={92} w={102} h={86} label="SIM" color="var(--iv-emerald)" />
      <Arrow x1={158} y1={116} x2={486} y2={116} blue />
      <Arrow x1={486} y1={154} x2={158} y2={154} />
      <SecurityPacket path="M158,116 L486,116" color="var(--iv-blue)" dur={2.8} square />
      <SecurityPacket path="M486,154 L158,154" color="var(--iv-emerald)" dur={2.8} delay={1.1} square />
      <Chip x={260} y={78} w={120} text="RAND challenge" tone="soft" />
      <Box x={256} y={210} w={128} h={82} tone="trust">
        <text className="iv-title" x="320" y="242" textAnchor="middle" fontSize="13" style={T}>SRES + Kc</text>
        <text className="iv-sub" x="320" y="264" textAnchor="middle" fontSize="11" style={T}>response + session key</text>
      </Box>
      <PathArrow d="M538,178 C508,226 430,242 384,242" />
      <TrustBadge x={130} y={222} on label="response verified" />
    </svg>
  )
}

export function PaymentFlowScene({ mode = 'flow' } = {}) {
  const nodes = [
    [38, 'Cardholder', 'card'],
    [190, 'Merchant', 'sale'],
    [342, 'Acquirer', 'merchant bank'],
    [494, 'Issuer', 'card bank'],
  ]
  if (mode === 'env') {
    return (
      <svg className="iv-svg" viewBox="0 0 640 360" role="img" aria-label="Payment environment includes cardholder, terminal, merchant, network, and issuer">
        <IvDefs />
        <text className="iv-title" x="320" y="38" textAnchor="middle" fontSize="15" style={T}>Payment environment</text>
        <Phone x={72} y={132} w={86} h={74} label="Card" color="var(--iv-blue)" />
        <Router x={214} y={118} w={96} h={88} label="POS" sub="terminal" color="var(--iv-cyan)" />
        <GlassServer x={374} y={78} w={92} h={76} label="Merchant" color="var(--iv-blue)" />
        <Cloud x={378} y={218} w={92} h={76} label="Network" color="var(--iv-muted)" />
        <GlassServer x={520} y={148} w={86} h={76} label="Issuer" color="var(--iv-emerald)" />
        <PathArrow d="M158,168 C182,148 196,148 214,158" blue />
        <PathArrow d="M310,154 C344,122 354,116 374,116" blue />
        <PathArrow d="M310,178 C344,232 356,252 378,252" />
        <PathArrow d="M470,252 C512,238 526,220 540,224" />
      </svg>
    )
  }
  if (mode === 'emv') {
    return (
      <svg className="iv-svg" viewBox="0 0 640 360" role="img" aria-label="EMV chip processing creates dynamic transaction cryptograms">
        <IvDefs />
        <text className="iv-title" x="320" y="40" textAnchor="middle" fontSize="15" style={T}>EMV chip creates a dynamic cryptogram</text>
        <Phone x={82} y={126} w={96} h={82} label="Chip" color="var(--iv-blue)" />
        <Key x={270} y={122} w={96} h={82} label="Card key" color="var(--iv-amber)" />
        <Digest x={468} y={134} text="ARQC" w={106} tone="trust" />
        <Arrow x1={178} y1={166} x2={270} y2={166} blue />
        <Arrow x1={366} y1={166} x2={468} y2={166} />
        <text className="iv-sub" x="320" y="270" textAnchor="middle" fontSize="12" style={T}>Each transaction signs fresh terminal and amount data.</text>
      </svg>
    )
  }
  if (mode === 'stripe') {
    return (
      <svg className="iv-svg" viewBox="0 0 640 360" role="img" aria-label="Stripe on a magnetic card stores static track data that can be copied">
        <IvDefs />
        <Box x={104} y={108} w={432} h={140} tone="warn">
          <text className="iv-title" x="320" y="142" textAnchor="middle" fontSize="15" style={T}>Magnetic stripe</text>
          <rect x="142" y="170" width="356" height="36" rx="8" fill="#2b3440" opacity="0.8" />
          <text className="iv-sub" x="320" y="228" textAnchor="middle" fontSize="11" style={T}>static track data can be copied</text>
        </Box>
        <ThreatActor x={268} y={276} w={104} h={70} label="Skimmer" color="var(--iv-red)" />
        <PathArrow d="M320,248 C320,260 320,268 320,276" red dashed />
      </svg>
    )
  }
  return (
    <svg className="iv-svg" viewBox="0 0 640 360" role="img" aria-label="Payment flow from cardholder to merchant to acquirer to issuer and authorization response back">
      <IvDefs />
      {nodes.map(([x, t, s], i) => (
        <g key={t}>
          {i === 0 ? <Phone x={x} y={104} w={94} h={78} label={t} sub={s} color="var(--iv-blue)" /> : <GlassServer x={x} y={104} w={94} h={78} label={t} sub={s} color={i === 3 ? 'var(--iv-emerald)' : 'var(--iv-blue)'} />}
          {i < nodes.length - 1 && <Arrow x1={x + 94} y1={140} x2={x + 152} y2={140} blue />}
        </g>
      ))}
      <SecurityPacket path="M132,140 L190,140 L284,140 L342,140 L436,140 L494,140" color="var(--iv-blue)" dur={4} square />
      <PathArrow d="M494,180 C420,260 220,260 132,180" />
      <SecurityPacket path="M494,180 C420,260 220,260 132,180" color="var(--iv-emerald)" dur={4} delay={1.4} square />
      <Chip x={258} y={224} w={124} text="authorization" tone="trust" />
    </svg>
  )
}

function TlsHandshakeStage({ stage }) {
  const steps = [
    ['clientHello', 'ClientHello', 'suites, random', 'cs'],
    ['serverHello', 'ServerHello', 'chosen suite', 'sc'],
    ['certificate', 'Certificate', 'server identity', 'sc'],
    ['certVerify', 'Certificate Verify', 'prove private key', 'sc'],
    ['keyExchange', 'Key Exchange', 'shared secret', 'cs'],
    ['sessionKeys', 'Session Keys', 'derive keys', 'both'],
    ['finished', 'Finished', 'transcript check', 'both'],
  ]
  const cx = 112
  const sx = 528
  const bow = (y, dir) => dir === 'sc' ? `M${sx},${y} C440,${y - 18} 214,${y - 18} ${cx},${y}` : `M${cx},${y} C214,${y - 18} 440,${y - 18} ${sx},${y}`
  return (
    <svg className="iv-svg" viewBox="0 0 640 430" role="img" aria-label={`TLS ${stage} stage highlighted in the handshake`}>
      <IvDefs />
      <BrowserClient x={66} y={24} w={92} h={76} label="Client" color="var(--iv-blue)" />
      <GlassServer x={482} y={24} w={92} h={76} label="Server" color="var(--iv-emerald)" />
      <line className="iv-conn" x1={cx} y1="104" x2={cx} y2="390" strokeDasharray="5 6" />
      <line className="iv-conn" x1={sx} y1="104" x2={sx} y2="390" strokeDasharray="5 6" />
      {steps.map(([id, label, sub, dir], i) => {
        const y = 132 + i * 38
        const active = id === stage
        const both = dir === 'both'
        return (
          <g key={id} opacity={active ? 1 : 0.42}>
            {both ? <line className={active ? 'iv-conn iv-s-emerald' : 'iv-conn'} x1={cx} y1={y} x2={sx} y2={y} markerEnd="url(#ivArrowBlue)" markerStart="url(#ivArrow)" /> : <PathArrow d={bow(y, dir)} blue={active || dir === 'cs'} />}
            <rect className={`iv-box ${active ? 'trust' : ''}`.trim()} x="246" y={y - 18} width="148" height="28" rx="9" />
            <text className="iv-title" x="320" y={y - 5} textAnchor="middle" fontSize="11.5" style={T}>{label}</text>
            <text className="iv-sub" x="320" y={y + 8} textAnchor="middle" fontSize="9.5" style={T}>{sub}</text>
            {active && !both && <SecurityPacket path={bow(y, dir)} color={dir === 'cs' ? 'var(--iv-blue)' : 'var(--iv-emerald)'} dur={3} square />}
            {active && both && <DataStream path={`M${cx},${y} L${sx},${y}`} count={2} color="var(--iv-emerald)" dur={2.6} />}
          </g>
        )
      })}
    </svg>
  )
}

export function TlsStageScene({ stage = 'overview' }) {
  if (stage === 'problem' || stage === 'insecure') {
    return (
      <svg className="iv-svg" viewBox="0 0 640 340" role="img" aria-label="Insecure web traffic crosses the Internet in cleartext where Eve can read it">
        <IvDefs />
        <BrowserClient x={54} y={124} w={96} h={82} label="Browser" color="var(--iv-blue)" />
        <Cloud x={274} y={114} w={96} h={82} label="Internet" color="var(--iv-muted)" />
        <GlassServer x={498} y={124} w={96} h={82} label="Server" color="var(--iv-blue)" />
        <ThreatActor x={270} y={228} w={100} h={78} label="Eve" sub="reads HTTP" color="var(--iv-red)" />
        <Arrow x1={150} y1={164} x2={274} y2={154} red />
        <Arrow x1={370} y1={154} x2={498} y2={164} red />
        <SecurityPacket path="M150,164 L274,154 L370,154 L498,164" color="var(--iv-red)" dur={3.6} square />
        <PathArrow d="M320,196 C318,210 318,220 320,228" red dashed />
        <Chip x={244} y={72} w={152} text="cleartext password" tone="alert" />
      </svg>
    )
  }

  if (stage === 'layers') {
    return (
      <svg className="iv-svg" viewBox="0 0 640 390" role="img" aria-label="Security protocols operate at different layers: SSH, TLS, and IPsec">
        <IvDefs />
        <text className="iv-title" x="320" y="38" textAnchor="middle" fontSize="15" style={T}>Security at different layers</text>
        {[
          ['Application', 'SSH', 'remote login', 'trust'],
          ['Transport', 'TLS', 'web/app sessions', 'soft'],
          ['Network', 'IPsec', 'host/site tunnels', 'warn'],
        ].map(([layer, proto, sub, tone], i) => (
          <Box key={layer} x={148} y={76 + i * 88} w={344} h={66} tone={tone}>
            <text className="iv-title" x="230" y={104 + i * 88} fontSize="13" style={T}>{layer}</text>
            <text className="iv-f-blue" x="350" y={104 + i * 88} textAnchor="middle" fontSize="16" fontWeight="800" style={T}>{proto}</text>
            <text className="iv-sub" x="350" y={124 + i * 88} textAnchor="middle" fontSize="10.5" style={T}>{sub}</text>
          </Box>
        ))}
      </svg>
    )
  }

  if (stage === 'protocols') {
    return (
      <svg className="iv-svg" viewBox="0 0 640 360" role="img" aria-label="TLS has handshake protocol and record protocol panels">
        <IvDefs />
        <Box x={56} y={82} w={232} h={196} tone="soft">
          <text className="iv-title" x="172" y="122" textAnchor="middle" fontSize="16" style={T}>Handshake Protocol</text>
          {['negotiate suite', 'authenticate cert', 'derive keys'].map((t, i) => <Chip key={t} x={112} y={154 + i * 38} w={120} text={t} tone="soft" />)}
        </Box>
        <Box x={352} y={82} w={232} h={196} tone="trust">
          <text className="iv-title" x="468" y="122" textAnchor="middle" fontSize="16" style={T}>Record Protocol</text>
          {['fragment', 'encrypt', 'verify tag'].map((t, i) => <Chip key={t} x={408} y={154 + i * 38} w={120} text={t} tone="trust" />)}
        </Box>
        <line x1="320" y1="72" x2="320" y2="294" stroke="var(--iv-line)" strokeDasharray="6 7" />
      </svg>
    )
  }

  if (stage === 'full') {
    return <TlsHandshake stage="full" />
  }

  if (stage === 'keysCloseup') {
    return (
      <svg className="iv-svg" viewBox="0 0 640 360" role="img" aria-label="TLS key derivation close-up: pre-master, client random, and server random converge into master and encryption keys">
        <IvDefs />
        <text className="iv-title" x="320" y="38" textAnchor="middle" fontSize="15" style={T}>TLS key derivation close-up</text>
        <Key x={84} y={76} w={92} h={72} label="KP" sub="pre-master" color="var(--iv-amber)" />
        <Chip x={92} y={178} w={76} text="rC" tone="soft" />
        <Chip x={92} y={238} w={76} text="rS" tone="soft" />
        <Box x={272} y={138} w={106} h={82} tone="soft"><text className="iv-title" x="325" y="184" textAnchor="middle" fontSize="16" style={T}>PRF</text></Box>
        <Key x={466} y={92} w={92} h={72} label="MK" sub="master" color="var(--iv-emerald)" />
        <Key x={466} y={218} w={92} h={72} label="EK" sub="record keys" color="var(--iv-blue)" />
        <PathArrow d="M176,112 C220,120 244,146 272,166" blue />
        <PathArrow d="M168,192 C210,192 238,184 272,178" />
        <PathArrow d="M168,252 C216,236 246,210 272,194" />
        <PathArrow d="M378,170 C420,140 438,128 466,128" blue />
        <PathArrow d="M378,192 C422,224 438,252 466,252" />
      </svg>
    )
  }

  if (stage === 'keyMgmt') {
    return (
      <svg className="iv-svg" viewBox="0 0 640 360" role="img" aria-label="TLS key management separates long-term PKI keys from short-lived session keys">
        <IvDefs />
        <text className="iv-title" x="320" y="40" textAnchor="middle" fontSize="15" style={T}>Long-term identity, short-term traffic keys</text>
        <Certificate x={74} y={104} w={110} h={84} label="PKI cert" sub="identity" color="var(--iv-blue)" />
        <Key x={264} y={104} w={110} h={84} label="Key exchange" sub="fresh secret" color="var(--iv-amber)" />
        <Lock x={456} y={104} w={110} h={84} label="Session keys" sub="expire quickly" color="var(--iv-emerald)" />
        <Arrow x1={184} y1={146} x2={264} y2={146} blue />
        <Arrow x1={374} y1={146} x2={456} y2={146} blue />
        <Box x={176} y={252} w={288} h={52} tone="trust">
          <text className="iv-sub" x="320" y="282" textAnchor="middle" fontSize="12" style={T}>Compromise scope is limited by fresh session keys.</text>
        </Box>
      </svg>
    )
  }

  if (stage === 'lessons') {
    return (
      <svg className="iv-svg" viewBox="0 0 640 340" role="img" aria-label="TLS lessons dashboard: flexibility, public algorithms, and hybrid cryptography">
        <IvDefs />
        <text className="iv-title" x="320" y="46" textAnchor="middle" fontSize="16" style={T}>TLS lessons</text>
        {['flexible negotiation', 'public algorithms', 'hybrid crypto'].map((t, i) => (
          <Box key={t} x={82 + i * 166} y={130} w={134} h={84} tone={i === 2 ? 'trust' : 'soft'}>
            <text className="iv-title" x={149 + i * 166} y="176" textAnchor="middle" fontSize="13" style={T}>{t}</text>
          </Box>
        ))}
      </svg>
    )
  }

  if (stage === 'overview') {
    return (
      <svg className="iv-svg" viewBox="0 0 640 340" role="img" aria-label="TLS overview: client communicates with server through a secure channel">
        <IvDefs />
        <BrowserClient x={54} y={118} w={96} h={82} label="Client" color="var(--iv-blue)" />
        <Lock x={272} y={116} w={96} h={84} label="Secure channel" sub="TLS" color="var(--iv-emerald)" />
        <GlassServer x={490} y={118} w={96} h={82} label="Server" color="var(--iv-emerald)" />
        <Arrow x1={150} y1={158} x2={272} y2={158} blue />
        <Arrow x1={368} y1={158} x2={490} y2={158} blue />
        <DataStream path="M150,158 L272,158 L368,158 L490,158" count={3} color="var(--iv-emerald)" dur={3} />
      </svg>
    )
  }
  if (stage === 'record' || stage === 'recordVerify') {
    const verify = stage === 'recordVerify'
    return (
      <svg className="iv-svg" viewBox="0 0 640 360" role="img" aria-label={verify ? 'TLS record verification checks authentication tag before releasing application data' : 'TLS record layer encrypts application data into TLS records for the network'}>
        <IvDefs />
        <MiniDoc x={52} y={130} title="AppData" body="HTTP" />
        <EncryptionCube x={218} y={120} w={92} h={82} label="Encrypt" color="var(--iv-purple)" />
        <Box x={374} y={120} w={104} h={82} tone="trust"><text className="iv-title" x="426" y="154" textAnchor="middle" fontSize="13" style={T}>TLS Record</text><text className="iv-sub" x="426" y="176" textAnchor="middle" fontSize="10.5" style={T}>ciphertext + tag</text></Box>
        <Cloud x={534} y={126} w={78} h={76} label="Network" color="var(--iv-muted)" />
        <Arrow x1={156} y1={168} x2={218} y2={168} blue />
        <Arrow x1={310} y1={168} x2={374} y2={168} blue />
        <Arrow x1={478} y1={168} x2={534} y2={168} />
        <SecurityPacket path="M156,168 L218,168 L310,168 L374,168 L478,168 L534,168" color="var(--iv-emerald)" dur={4} square />
        {verify && <Verdict x={262} y={248} ok label="TAG OK" />}
      </svg>
    )
  }
  if (stage === 'mutual') {
    return <MutualAuthScene />
  }
  if (stage === 'hybrid') {
    return (
      <svg className="iv-svg" viewBox="0 0 640 360" role="img" aria-label="Hybrid TLS uses asymmetric authentication and key exchange to create fast symmetric session keys">
        <IvDefs />
        <Certificate x={66} y={96} w={104} h={84} label="Certificate" sub="asymmetric auth" color="var(--iv-blue)" />
        <Key x={268} y={96} w={104} h={84} label="Key exchange" sub="shared secret" color="var(--iv-amber)" />
        <Lock x={470} y={96} w={104} h={84} label="Session keys" sub="symmetric records" color="var(--iv-emerald)" />
        <Arrow x1={170} y1={138} x2={268} y2={138} blue />
        <Arrow x1={372} y1={138} x2={470} y2={138} blue />
        <DataStream path="M170,138 L268,138 L372,138 L470,138" count={3} color="var(--iv-emerald)" dur={3} />
      </svg>
    )
  }
  if (stage === 'suite') {
    return (
      <svg className="iv-svg" viewBox="0 0 640 360" role="img" aria-label="TLS cipher suite combines key exchange, authentication, encryption, and hash or AEAD tag">
        <IvDefs />
        <Box x={74} y={90} w={492} h={142} tone="soft">
          <text className="iv-title" x="320" y="124" textAnchor="middle" fontSize="14" style={T}>TLS_AES_128_GCM_SHA256</text>
          {['TLS version', 'encryption', 'AEAD mode', 'hash'].map((t, i) => <Chip key={t} x={108 + i * 112} y={160} w={92} text={t} tone={i === 1 ? 'trust' : 'soft'} />)}
        </Box>
      </svg>
    )
  }
  if (stage === 'failure') {
    return (
      <svg className="iv-svg" viewBox="0 0 640 360" role="img" aria-label="TLS failure: certificate or transcript verification failure stops the connection">
        <IvDefs />
        <BrowserClient x={78} y={118} w={96} h={82} label="Client" color="var(--iv-blue)" />
        <GlassServer x={466} y={118} w={96} h={82} label="Server" color="var(--iv-blue)" />
        <PathArrow d="M174,154 C260,108 380,108 466,154" red dashed />
        <Verdict x={260} y={222} ok={false} label="WARNING" />
        <path className="iv-block" d="M308 144 L332 168 M332 144 L308 168" stroke="var(--iv-red)" strokeWidth="3.5" strokeLinecap="round" />
      </svg>
    )
  }
  return <TlsHandshakeStage stage={stage} />
}

function BitTiles({ x, y, rows }) {
  return (
    <g>
      {rows.map((row, r) => (
        <g key={row}>
          {row.split('').map((bit, i) => (
            <rect key={`${row}-${i}`} x={x + i * 28} y={y + r * 34} width="22" height="24" rx="6" fill={bit === '1' ? '#e9f7ef' : '#eef7ff'} stroke={bit === '1' ? 'var(--iv-emerald)' : 'var(--iv-blue)'} />
          ))}
          {row.split('').map((bit, i) => (
            <text key={`${row}-${i}-t`} className="iv-label" x={x + i * 28 + 11} y={y + r * 34 + 16} textAnchor="middle" fontSize="10.5" style={T}>{bit}</text>
          ))}
        </g>
      ))}
    </g>
  )
}

function MeterBar({ x, y, w, label, value, tone = 'trust' }) {
  return (
    <g>
      <text className="iv-sub" x={x} y={y - 8} fontSize="10.5" fontWeight="800" style={T}>{label}</text>
      <rect x={x} y={y} width={w} height="18" rx="9" fill="#fff" stroke="var(--iv-line)" />
      <rect className={`iv-box ${tone}`.trim()} x={x + 2} y={y + 2} width={Math.max(8, w * value - 4)} height="14" rx="7" />
    </g>
  )
}

export function EntropyScene({ mode = 'why' } = {}) {
  if (mode === 'definition') {
    return (
      <svg className="iv-svg" viewBox="0 0 640 340" role="img" aria-label="Randomness definition: equal-likelihood bitstrings include regular-looking strings such as alternating and all-one patterns">
        <IvDefs />
        <text className="iv-title" x="320" y="38" textAnchor="middle" fontSize="15" style={T}>Equal likelihood, not always messy-looking</text>
        <BitTiles x={94} y={98} rows={['10101010', '11111111', '01011001']} />
        <Box x={386} y={92} w={170} h={132} tone="trust">
          <text className="iv-title" x="471" y="128" textAnchor="middle" fontSize="15" style={T}>Same chance</text>
          <text className="iv-sub" x="471" y="154" textAnchor="middle" fontSize="11.5" style={T}>for each 8-bit string</text>
          <text className="iv-f-emerald" x="471" y="190" textAnchor="middle" fontSize="18" fontWeight="800" style={T}>1 / 256</text>
        </Box>
        <PathArrow d="M322,142 C352,142 360,148 386,156" blue />
      </svg>
    )
  }

  if (mode === 'stats') {
    return (
      <svg className="iv-svg" viewBox="0 0 640 360" role="img" aria-label="Statistical randomness checks: balance bars and no exploitable pattern chart">
        <IvDefs />
        <text className="iv-title" x="320" y="40" textAnchor="middle" fontSize="15" style={T}>Statistical checks look for exploitable structure</text>
        <Box x={62} y={86} w={230} h={190} tone="soft">
          <text className="iv-title" x="177" y="122" textAnchor="middle" fontSize="14" style={T}>Balance</text>
          <MeterBar x={104} y={156} w={148} label="zeros" value={0.52} tone="trust" />
          <MeterBar x={104} y={212} w={148} label="ones" value={0.49} tone="trust" />
        </Box>
        <Box x={348} y={86} w={230} h={190} tone="trust">
          <text className="iv-title" x="463" y="122" textAnchor="middle" fontSize="14" style={T}>Pattern frequency</text>
          {[42, 74, 56, 88, 68].map((h, i) => (
            <rect key={i} x={388 + i * 34} y={230 - h} width="20" height={h} rx="5" fill="var(--iv-blue)" opacity={0.42 + i * 0.08} />
          ))}
          <text className="iv-sub" x="463" y="254" textAnchor="middle" fontSize="11" style={T}>no useful bias to exploit</text>
        </Box>
      </svg>
    )
  }

  if (mode === 'hardware') {
    return (
      <svg className="iv-svg" viewBox="0 0 640 360" role="img" aria-label="Hardware random sources: decay, noise and oscillator instability feed entropy collection">
        <IvDefs />
        <text className="iv-title" x="320" y="38" textAnchor="middle" fontSize="15" style={T}>Physical sources create non-deterministic input</text>
        {[
          ['Decay', 'random events', 'M118 146 q28 -40 56 0 q28 40 56 0'],
          ['Noise', 'thermal/electrical', 'M288 164 l18 -34 l18 56 l18 -44 l18 36 l18 -26'],
          ['Oscillator', 'jitter timing', 'M460 160 c18 -44 54 -44 72 0 c18 44 54 44 72 0'],
        ].map(([title, sub, d], i) => (
          <Box key={title} x={72 + i * 184} y={92} w={138} h={152} tone={i === 1 ? 'trust' : 'soft'}>
            <path d={d} fill="none" stroke={i === 1 ? 'var(--iv-emerald)' : 'var(--iv-blue)'} strokeWidth="3" strokeLinecap="round" />
            <text className="iv-title" x={141 + i * 184} y="206" textAnchor="middle" fontSize="14" style={T}>{title}</text>
            <text className="iv-sub" x={141 + i * 184} y="226" textAnchor="middle" fontSize="10.5" style={T}>{sub}</text>
          </Box>
        ))}
      </svg>
    )
  }

  if (mode === 'software') {
    return (
      <svg className="iv-svg" viewBox="0 0 640 360" role="img" aria-label="Software-observed timing entropy: keystrokes, interrupts and disk timings feed a pool">
        <IvDefs />
        <text className="iv-title" x="320" y="38" textAnchor="middle" fontSize="15" style={T}>Timing entropy from ordinary system events</text>
        {[
          ['Keystrokes', 'human timing'],
          ['Interrupts', 'device timing'],
          ['Disk', 'I/O latency'],
        ].map(([title, sub], i) => (
          <Box key={title} x={52 + i * 150} y={104} w={112} h={86} tone="soft">
            <text className="iv-title" x={108 + i * 150} y="140" textAnchor="middle" fontSize="13" style={T}>{title}</text>
            <text className="iv-sub" x={108 + i * 150} y="162" textAnchor="middle" fontSize="10.5" style={T}>{sub}</text>
          </Box>
        ))}
        <Box x={496} y={94} w={104} h={116} tone="trust">
          <text className="iv-title" x="548" y="136" textAnchor="middle" fontSize="14" style={T}>Pool</text>
          <text className="iv-sub" x="548" y="158" textAnchor="middle" fontSize="10.5" style={T}>mixed state</text>
        </Box>
        {[164, 314, 464].map((x, i) => <PathArrow key={x} d={`M${x},146 C${218 + i * 74},118 ${420 + i * 18},122 496,146`} blue />)}
        <DataStream path="M164,146 C252,120 398,122 496,146" count={3} color="var(--iv-blue)" dur={3} />
      </svg>
    )
  }

  if (mode === 'limits') {
    return (
      <svg className="iv-svg" viewBox="0 0 640 340" role="img" aria-label="Limits of true random generators: slow, costly and health-check dependent">
        <IvDefs />
        <ThreatActor x={56} y={116} w={104} h={86} label="Failure risk" sub="bad source" color="var(--iv-red)" />
        <Box x={222} y={78} w={334} h={188} tone="alert">
          <text className="iv-f-red" x="389" y="118" textAnchor="middle" fontSize="18" fontWeight="800" style={T}>Operational limits</text>
          {['slow rate', 'special hardware cost', 'health checks needed'].map((t, i) => (
            <Chip key={t} x={268} y={148 + i * 38} w={242} text={t} tone={i === 2 ? 'warn' : 'alert'} />
          ))}
        </Box>
        <PathArrow d="M160,156 C188,142 198,124 222,118" red dashed />
      </svg>
    )
  }

  if (mode === 'prng') {
    return (
      <svg className="iv-svg" viewBox="0 0 640 340" role="img" aria-label="Pseudorandom generator pipeline: seed enters deterministic expander and produces a stream">
        <IvDefs />
        <Key x={58} y={116} w={96} h={78} label="Seed" sub="secret" color="var(--iv-amber)" />
        <Box x={252} y={104} w={136} h={104} tone="soft">
          <text className="iv-title" x="320" y="146" textAnchor="middle" fontSize="15" style={T}>Deterministic</text>
          <text className="iv-title" x="320" y="168" textAnchor="middle" fontSize="15" style={T}>expander</text>
        </Box>
        <BitTiles x={466} y={112} rows={['01101010', '10011100']} />
        <Arrow x1={154} y1={155} x2={252} y2={155} blue />
        <Arrow x1={388} y1={155} x2={466} y2={155} blue />
        <SecurityPacket path="M154,155 L252,155 L388,155 L466,155" color="var(--iv-emerald)" dur={3} square />
      </svg>
    )
  }

  if (mode === 'seed') {
    return (
      <svg className="iv-svg" viewBox="0 0 640 360" role="img" aria-label="Seed compromise attack: Eve steals the seed and predicts the future pseudorandom stream">
        <IvDefs />
        <Key x={78} y={112} w={92} h={76} label="Seed" sub="stolen" color="var(--iv-amber)" />
        <ThreatActor x={244} y={102} w={106} h={86} label="Eve" sub="copies seed" color="var(--iv-red)" />
        <Box x={438} y={94} w={128} h={116} tone="alert">
          <text className="iv-title" x="502" y="132" textAnchor="middle" fontSize="14" style={T}>Future stream</text>
          <text className="iv-f-red" x="502" y="164" textAnchor="middle" fontSize="15" fontWeight="800" style={T}>predictable</text>
        </Box>
        <PathArrow d="M170,150 C198,116 220,112 244,132" red dashed />
        <PathArrow d="M350,146 C382,118 406,118 438,138" red />
        <Verdict x={252} y={242} ok={false} label="BROKEN" />
      </svg>
    )
  }

  if (mode === 'compare') {
    return (
      <svg className="iv-svg" viewBox="0 0 640 360" role="img" aria-label="Comparison of true random source and fast pseudorandom generator">
        <IvDefs />
        <Box x={58} y={78} w={230} h={204} tone="trust">
          <text className="iv-title" x="173" y="116" textAnchor="middle" fontSize="15" style={T}>True random source</text>
          <Chip x={104} y={150} w={138} text="unpredictable" tone="trust" />
          <Chip x={104} y={196} w={138} text="slower input" tone="warn" />
        </Box>
        <Box x={352} y={78} w={230} h={204} tone="soft">
          <text className="iv-title" x="467" y="116" textAnchor="middle" fontSize="15" style={T}>Fast PRNG</text>
          <Chip x={398} y={150} w={138} text="seeded" tone="soft" />
          <Chip x={398} y={196} w={138} text="fast stream" tone="trust" />
        </Box>
        <line x1="320" y1="70" x2="320" y2="292" stroke="var(--iv-line)" strokeDasharray="6 7" />
      </svg>
    )
  }

  return (
    <svg className="iv-svg" viewBox="0 0 640 360" role="img" aria-label="Randomness matters because keys, nonces and IVs need unpredictability">
      <IvDefs />
      <text className="iv-title" x="320" y="38" textAnchor="middle" fontSize="15" style={T}>Unpredictability protects protocol choices</text>
      <Key x={76} y={116} w={104} h={84} label="Key" sub="secret bits" color="var(--iv-amber)" />
      <Chip x={270} y={106} w={100} text="Nonce" tone="trust" />
      <Lock x={458} y={108} w={104} h={92} label="IV" sub="mode input" color="var(--iv-blue)" />
      <Arrow x1={180} y1={158} x2={270} y2={126} blue />
      <Arrow x1={370} y1={126} x2={458} y2={154} blue />
      <Box x={204} y={254} w={232} h={50} tone="trust">
        <text className="iv-sub" x="320" y="284" textAnchor="middle" fontSize="12" style={T}>Eve should not predict the next value.</text>
      </Box>
    </svg>
  )
}

function KeyLifecycleArc({ mode = 'lifecycle' }) {
  const steps = mode === 'expire'
    ? ['Issue', 'Use', 'Rotate', 'Expire', 'Retire']
    : ['Generate', 'Establish', 'Store', 'Use', 'Change', 'Archive', 'Destroy']
  const cx = 320
  const cy = 184
  const r = 122
  return (
    <g>
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="var(--iv-line)" strokeWidth="2" strokeDasharray="6 7" />
      {steps.map((step, i) => {
        const a = (-120 + i * (240 / Math.max(1, steps.length - 1))) * Math.PI / 180
        const x = cx + Math.cos(a) * r
        const y = cy + Math.sin(a) * r
        return (
          <g key={step}>
            <circle cx={x} cy={y} r="22" fill="#fff" stroke={i === steps.length - 1 ? 'var(--iv-red)' : 'var(--iv-blue)'} strokeWidth="1.8" />
            <text className="iv-label" x={x} y={y + 4} textAnchor="middle" fontSize="9.5" style={T}>{i + 1}</text>
            <text className="iv-sub" x={x} y={y + 38} textAnchor="middle" fontSize="10" style={T}>{step}</text>
          </g>
        )
      })}
    </g>
  )
}

export function KeyMgmtScene({ mode = 'overview' } = {}) {
  if (mode === 'fail') {
    return (
      <svg className="iv-svg" viewBox="0 0 640 360" role="img" aria-label="Strong AES can still fail when the key is stolen">
        <IvDefs />
        <EncryptionCube x={82} y={120} w={116} h={92} label="AES" color="var(--iv-blue)" />
        <Key x={280} y={112} w={92} h={82} label="Key K" sub="stolen" color="var(--iv-amber)" />
        <ThreatActor x={444} y={104} w={106} h={88} label="Eve" sub="has K" color="var(--iv-red)" />
        <Arrow x1={198} y1={166} x2={280} y2={154} blue />
        <PathArrow d="M372,154 C402,122 422,118 444,138" red />
        <Verdict x={268} y={248} ok={false} label="FAIL" />
      </svg>
    )
  }

  if (mode === 'definition') {
    return (
      <svg className="iv-svg" viewBox="0 0 640 360" role="img" aria-label="Key management combines people, process and technology controls around keys">
        <IvDefs />
        <Key x={274} y={132} w={92} h={82} label="Key" sub="asset" color="var(--iv-amber)" />
        {[
          ['People', 92, 80],
          ['Process', 438, 80],
          ['Technology', 92, 230],
          ['Controls', 438, 230],
        ].map(([label, x, y], i) => (
          <Box key={label} x={x} y={y} w={110} h={62} tone={i === 3 ? 'trust' : 'soft'}>
            <text className="iv-title" x={x + 55} y={y + 37} textAnchor="middle" fontSize="13" style={T}>{label}</text>
          </Box>
        ))}
        <PathArrow d="M202,110 C238,118 256,136 274,154" blue />
        <PathArrow d="M438,110 C402,118 384,136 366,154" blue />
        <PathArrow d="M202,260 C238,244 256,220 274,188" />
        <PathArrow d="M438,260 C402,244 384,220 366,188" />
      </svg>
    )
  }

  if (mode === 'controls') {
    return (
      <svg className="iv-svg" viewBox="0 0 640 360" role="img" aria-label="Key management control dashboard: technical, process, environmental and human controls">
        <IvDefs />
        <text className="iv-title" x="320" y="40" textAnchor="middle" fontSize="15" style={T}>Controls keep the key inside policy</text>
        {[
          ['Technical', 'HSM, ACLs'],
          ['Process', 'approval flow'],
          ['Environment', 'zones, safes'],
          ['Human', 'training, roles'],
        ].map(([title, sub], i) => (
          <Box key={title} x={66 + (i % 2) * 286} y={82 + Math.floor(i / 2) * 112} w={222} h={82} tone={i === 0 ? 'trust' : i === 2 ? 'warn' : 'soft'}>
            <text className="iv-title" x={177 + (i % 2) * 286} y={116 + Math.floor(i / 2) * 112} textAnchor="middle" fontSize="14" style={T}>{title}</text>
            <text className="iv-sub" x={177 + (i % 2) * 286} y={138 + Math.floor(i / 2) * 112} textAnchor="middle" fontSize="10.5" style={T}>{sub}</text>
          </Box>
        ))}
      </svg>
    )
  }

  if (mode === 'lifecycle' || mode === 'expire') {
    return (
      <svg className="iv-svg" viewBox="0 0 640 380" role="img" aria-label={mode === 'expire' ? 'Key cryptoperiod timeline from issue to expiry and retirement' : 'Circular key lifecycle from generation through destruction'}>
        <IvDefs />
        <text className="iv-title" x="320" y="38" textAnchor="middle" fontSize="15" style={T}>{mode === 'expire' ? 'Cryptoperiod limits exposure' : 'The key lifecycle is a managed loop'}</text>
        <KeyLifecycleArc mode={mode} />
        <Key x={276} y={146} w={88} h={76} label="K" sub={mode === 'expire' ? 'expires' : 'managed'} color="var(--iv-amber)" />
      </svg>
    )
  }

  if (mode === 'generate') {
    return (
      <svg className="iv-svg" viewBox="0 0 640 340" role="img" aria-label="Random number generator close-up producing key bits">
        <IvDefs />
        <Box x={80} y={104} w={150} h={106} tone="soft">
          <text className="iv-title" x="155" y="148" textAnchor="middle" fontSize="17" style={T}>RNG</text>
          <text className="iv-sub" x="155" y="170" textAnchor="middle" fontSize="11" style={T}>approved source</text>
        </Box>
        <BitTiles x={310} y={96} rows={['10110110', '01101001', '11001010']} />
        <Key x={468} y={128} w={92} h={76} label="K" sub="key bits" color="var(--iv-amber)" />
        <Arrow x1={230} y1={156} x2={310} y2={156} blue />
        <Arrow x1={422} y1={156} x2={468} y2={166} blue />
      </svg>
    )
  }

  if (mode === 'establish' || mode === 'agree' || mode === 'distribute') {
    const agree = mode === 'agree'
    const distribute = mode === 'distribute'
    return (
      <svg className="iv-svg" viewBox="0 0 640 360" role="img" aria-label={agree ? 'Key agreement: Alice and Bob both contribute to the key' : distribute ? 'Key distribution: a centre supplies the session key' : 'Authenticated key establishment between Alice and Bob'}>
        <IvDefs />
        <BrowserClient x={64} y={120} w={94} h={78} label="Alice" color="var(--iv-blue)" />
        {distribute && <GlassServer x={274} y={86} w={92} h={76} label="KDC" color="var(--iv-emerald)" />}
        <BrowserClient x={482} y={120} w={94} h={78} label="Bob" color="var(--iv-blue)" />
        {agree ? (
          <>
            <Key x={210} y={98} w={80} h={62} label="a" color="var(--iv-amber)" />
            <Key x={350} y={98} w={80} h={62} label="b" color="var(--iv-amber)" />
            <PathArrow d="M158,152 C224,98 416,98 482,152" blue />
            <PathArrow d="M482,166 C416,222 224,222 158,166" blue />
            <Chip x={268} y={224} w={104} text="shared K" tone="trust" />
          </>
        ) : distribute ? (
          <>
            <PathArrow d="M158,150 C214,100 240,112 274,124" blue />
            <PathArrow d="M366,124 C404,112 430,100 482,150" blue />
            <Chip x={268} y={218} w={104} text="K supplied" tone="trust" />
          </>
        ) : (
          <>
            <PathArrow d="M158,158 C240,86 400,86 482,158" blue />
            <SecurityPacket path="M158,158 C240,86 400,86 482,158" color="var(--iv-emerald)" dur={3} square />
            <Chip x={240} y={226} w={160} text="authenticated channel" tone="trust" />
          </>
        )}
      </svg>
    )
  }

  if (mode === 'store' || mode === 'softStore' || mode === 'zones') {
    return (
      <svg className="iv-svg" viewBox="0 0 640 360" role="img" aria-label="Key storage options: vault, encrypted file and hardware security module zones">
        <IvDefs />
        <text className="iv-title" x="320" y="38" textAnchor="middle" fontSize="15" style={mode === 'softStore' ? { ...T, fontWeight: 700 } : T}>{mode === 'softStore' ? 'Software storage needs wrapping keys' : mode === 'zones' ? 'Storage zones have different extraction risk' : 'Store keys inside protected zones'}</text>
        {[
          ['Vault', 'offline backup', 'warn'],
          [mode === 'softStore' ? 'Encrypted file' : 'File zone', mode === 'softStore' ? 'wrapped by KEK' : 'software boundary', 'soft'],
          ['HSM', 'key never leaves', 'trust'],
        ].map(([title, sub, tone], i) => (
          <Box key={title} x={54 + i * 194} y={96} w={144} h={134} tone={tone}>
            <Key x={88 + i * 194} y={116} w={76} h={60} label={i === 1 && mode === 'softStore' ? 'KEK' : 'K'} color={i === 2 ? 'var(--iv-emerald)' : 'var(--iv-amber)'} />
            <text className="iv-title" x={126 + i * 194} y="200" textAnchor="middle" fontSize="13" style={T}>{title}</text>
            <text className="iv-sub" x={126 + i * 194} y="218" textAnchor="middle" fontSize="10" style={T}>{sub}</text>
          </Box>
        ))}
      </svg>
    )
  }

  if (mode === 'usage') {
    return (
      <svg className="iv-svg" viewBox="0 0 640 340" role="img" aria-label="Key usage separation: encryption key is not the MAC key">
        <IvDefs />
        <Box x={72} y={92} w={216} h={154} tone="trust">
          <Key x={134} y={116} w={92} h={72} label="Kenc" sub="encrypt only" color="var(--iv-emerald)" />
          <text className="iv-sub" x="180" y="218" textAnchor="middle" fontSize="11" style={T}>confidentiality purpose</text>
        </Box>
        <Box x={352} y={92} w={216} h={154} tone="soft">
          <Key x={414} y={116} w={92} h={72} label="Kmac" sub="MAC only" color="var(--iv-blue)" />
          <text className="iv-sub" x="460" y="218" textAnchor="middle" fontSize="11" style={T}>integrity purpose</text>
        </Box>
        <line x1="320" y1="82" x2="320" y2="256" stroke="var(--iv-line)" strokeDasharray="6 7" />
      </svg>
    )
  }

  if (mode === 'destroy') {
    return (
      <svg className="iv-svg" viewBox="0 0 640 340" role="img" aria-label="Key destruction zeroizes or shreds retired key material">
        <IvDefs />
        <Key x={88} y={112} w={92} h={76} label="Old K" sub="retired" color="var(--iv-amber)" />
        <Box x={274} y={96} w={104} h={108} tone="alert">
          <text className="iv-title" x="326" y="138" textAnchor="middle" fontSize="15" style={T}>Zeroize</text>
          <path className="iv-block" d="M306 156 L346 184 M346 156 L306 184" stroke="var(--iv-red)" strokeWidth="4" strokeLinecap="round" />
        </Box>
        <Verdict x={456} y={118} ok label="GONE" />
        <Arrow x1={180} y1={150} x2={274} y2={150} red />
        <Arrow x1={378} y1={150} x2={456} y2={150} blue />
      </svg>
    )
  }

  if (mode === 'hierarchy' || mode === 'threeLevel') {
    const labels = mode === 'threeLevel' ? ['Master key', 'KEK', 'Data/session key'] : ['Master', 'KEK layer', 'Session keys']
    return (
      <svg className="iv-svg" viewBox="0 0 640 380" role="img" aria-label="Key hierarchy tree from master key to key-encrypting keys to session keys">
        <IvDefs />
        <Key x={274} y={54} w={92} h={72} label={labels[0]} color="var(--iv-amber)" />
        {[184, 364].map((x, i) => <Key key={x} x={x} y={162} w={92} h={70} label={i === 0 ? labels[1] : 'KEK'} color="var(--iv-blue)" />)}
        {[88, 224, 360, 496].map((x, i) => <Key key={x} x={x} y={278} w={78} h={58} label={mode === 'threeLevel' ? labels[2] : `S${i + 1}`} color="var(--iv-emerald)" />)}
        <PathArrow d="M298,126 C264,142 242,150 230,162" blue />
        <PathArrow d="M342,126 C376,142 398,150 410,162" blue />
        {[166, 224, 360, 438].map((x, i) => <PathArrow key={i} d={`M${i < 2 ? 230 : 410},232 C${i < 2 ? 196 : 446},252 ${x},258 ${x},278`} />)}
      </svg>
    )
  }

  if (mode === 'scale') {
    const users = [[320, 58], [138, 132], [502, 132], [192, 286], [448, 286]]
    return (
      <svg className="iv-svg" viewBox="0 0 640 360" role="img" aria-label="Pairwise key mesh grows rapidly as users increase">
        <IvDefs />
        {users.flatMap(([x1, y1], i) => users.slice(i + 1).map(([x2, y2], j) => <line key={`${i}-${j}`} className="iv-conn iv-s-red" x1={x1} y1={y1} x2={x2} y2={y2} opacity="0.42" />))}
        {users.map(([x, y], i) => <NetworkNode key={i} x={x - 28} y={y - 28} w={56} h={56} label={`U${i + 1}`} color="var(--iv-blue)" />)}
        <Chip x={252} y={170} w={136} text="n(n-1)/2 keys" tone="alert" />
      </svg>
    )
  }

  if (mode === 'hsm') {
    return (
      <svg className="iv-svg" viewBox="0 0 640 340" role="img" aria-label="Hardware security module boundary where the key never leaves">
        <IvDefs />
        <Box x={182} y={72} w={276} h={184} tone="trust">
          <text className="iv-title" x="320" y="112" textAnchor="middle" fontSize="15" style={T}>HSM boundary</text>
          <Key x={274} y={132} w={92} h={76} label="Master K" sub="inside" color="var(--iv-emerald)" />
        </Box>
        <MiniDoc x={48} y={124} title="request" body="op" />
        <Digest x={488} y={132} text="result" w={104} tone="trust" />
        <Arrow x1={152} y1={162} x2={182} y2={162} blue />
        <Arrow x1={458} y1={162} x2={488} y2={162} blue />
        <text className="iv-sub" x="320" y="290" textAnchor="middle" fontSize="12" style={T}>The operation is allowed; raw key export is not.</text>
      </svg>
    )
  }

  if (mode === 'quantum' || mode === 'bb84' || mode === 'eve') {
    return (
      <svg className="iv-svg" viewBox="0 0 640 360" role="img" aria-label={mode === 'bb84' ? 'BB84 photon bases story' : mode === 'eve' ? 'Quantum eavesdropping detection by measurement disturbance' : 'Quantum key establishment uses photon states'}>
        <IvDefs />
        <BrowserClient x={58} y={126} w={88} h={74} label="Alice" color="var(--iv-blue)" />
        <BrowserClient x={494} y={126} w={88} h={74} label="Bob" color="var(--iv-blue)" />
        {mode === 'eve' && <ThreatActor x={270} y={218} w={100} h={78} label="Eve" sub="measures" color="var(--iv-red)" />}
        {['+', 'x', '+', 'x', '+'].map((b, i) => (
          <g key={`${b}-${i}`}>
            <circle cx={198 + i * 54} cy={154 + (i % 2) * 22} r="13" fill="#fff" stroke={mode === 'eve' && i === 2 ? 'var(--iv-red)' : 'var(--iv-blue)'} strokeWidth="2" />
            <text className="iv-label" x={198 + i * 54} y={158 + (i % 2) * 22} textAnchor="middle" fontSize="13" style={T}>{mode === 'bb84' ? b : 'ph'}</text>
          </g>
        ))}
        <PathArrow d="M146,162 C230,104 410,104 494,162" blue={mode !== 'eve'} red={mode === 'eve'} dashed={mode === 'eve'} />
        <Chip x={246} y={66} w={148} text={mode === 'bb84' ? 'choose bases' : mode === 'eve' ? 'errors reveal Eve' : 'measure disturbance'} tone={mode === 'eve' ? 'alert' : 'trust'} />
      </svg>
    )
  }

  if (mode === 'ceremony') {
    return (
      <svg className="iv-svg" viewBox="0 0 640 360" role="img" aria-label="Key ceremony with dual control and audit log">
        <IvDefs />
        <Box x={64} y={102} w={122} h={82} tone="soft"><text className="iv-title" x="125" y="148" textAnchor="middle" fontSize="13" style={T}>Officer A</text></Box>
        <Box x={230} y={102} w={122} h={82} tone="soft"><text className="iv-title" x="291" y="148" textAnchor="middle" fontSize="13" style={T}>Officer B</text></Box>
        <Key x={436} y={106} w={92} h={76} label="Key" sub="released" color="var(--iv-amber)" />
        <Arrow x1={186} y1={143} x2={230} y2={143} blue />
        <Arrow x1={352} y1={143} x2={436} y2={143} blue />
        <Box x={152} y={246} w={336} h={48} tone="trust">
          <text className="iv-sub" x="320" y="275" textAnchor="middle" fontSize="12" style={T}>audit log: who, when, purpose, approval</text>
        </Box>
      </svg>
    )
  }

  if (mode === 'length') {
    return (
      <svg className="iv-svg" viewBox="0 0 640 360" role="img" aria-label="Key length tradeoff: longer keys raise attack cost and can add processing cost">
        <IvDefs />
        <text className="iv-title" x="320" y="38" textAnchor="middle" fontSize="15" style={T}>Longer keys raise attack cost and processing cost</text>
        <MeterBar x={116} y={118} w={390} label="attack work factor" value={0.9} tone="trust" />
        <MeterBar x={116} y={184} w={390} label="processing/storage cost" value={0.58} tone="warn" />
        <Chip x={238} y={256} w={164} text="choose cryptoperiod" tone="soft" />
      </svg>
    )
  }

  return <KeyMgmtScene mode="definition" />
}

export function CertPushPull() {
  return (
    <svg className="iv-svg" viewBox="0 0 640 360" role="img" aria-label="Push and pull certificate establishment show certificate travel directions">
      <IvDefs />
      <BrowserClient x={70} y={96} w={86} h={72} label="Owner" color="var(--iv-blue)" />
      <Certificate x={274} y={92} w={92} h={76} label="Cert" sub="push" color="var(--iv-emerald)" />
      <BrowserClient x={488} y={96} w={86} h={72} label="Verifier" color="var(--iv-blue)" />
      <Arrow x1={156} y1={132} x2={274} y2={132} blue />
      <Arrow x1={366} y1={132} x2={488} y2={132} blue />
      <CertificateAuthority x={274} y={230} w={92} h={76} label="CA" />
      <PathArrow d="M488,168 C438,220 372,246 366,260" blue dashed />
      <PathArrow d="M274,260 C206,248 162,220 132,168" blue dashed />
      <Chip x={246} y={314} w={148} text="pull from issuer" tone="soft" />
    </svg>
  )
}

/** Slide-id → concept-specific teaching visual. null = keep slide's existing correct visual. */
export const INS_TEACHING_VISUALS = {
  /* —— Module 1 —— */
  kerckhoffs: () => <KerckhoffsScene />,
  'symmetric-public': () => <SymmetricAsymmetricCompare />,
  'caesar-cipher': () => <CaesarTransform mode="concept" />,
  'caesar-encrypt': () => <CaesarTransform mode="transform" />,
  'caesar-decrypt': () => <CaesarTransform mode="decrypt" />,
  'general-substitution': () => <MonoalphabeticMap />,
  'substitution-intro': () => <SubstitutionIntro />,
  shannon: () => <ShannonScene />,
  'otp-limitation': () => <KeyDistributionProblem />,
  venona: () => <KeyDistributionProblem mode="reuse" />,
  'exhaustive-search': () => <BruteForceScene />,
  'shift-key-space': () => <CaesarTransform mode="keyspace" />,

  /* —— Module 2 —— */
  'fingerprint-need': () => <HashPipeline mode="fingerprint" />,
  'hash-definition': () => <HashPipeline mode="definition" />,
  'compression-property': () => <HashPipeline mode="compress" />,
  efficiency: () => <HashPipeline mode="efficiency" />,
  'one-way': () => <HashPipeline mode="oneWay" />,
  'weak-collision': () => <HashPipeline mode="weakCollision" />,
  'strong-collision': () => <HashPipeline mode="strongCollision" />,
  'avalanche-effect': () => <HashPipeline mode="avalanche" />,
  'birthday-problem': () => <BirthdayCollisionScene mode="paradox" />,
  'birthday-hash': () => <BirthdayCollisionScene mode="hash" />,
  'work-factor': () => <BirthdayCollisionScene mode="workFactor" />,
  'birthday-defense': () => <BirthdayCollisionScene mode="defense" />,
  'hmac-structure': () => <HmacConstruction mode="structure" />,
  'hmac-animation': () => <HmacConstruction mode="nested" />,
  'hash-not-auth': () => <MitmScene />,
  'simple-hashes': () => <CrcVsCrypto mode="weakSum" />,
  'weighted-sum': () => <CrcVsCrypto />,
  'crc-not-crypto': () => <CrcVsCrypto mode="attack" />,
  'crc-worked': () => <CrcVsCrypto mode="worked" />,
  'tiger-intro': () => <HashPipeline mode="fingerprint" />,
  'tiger-structure': () => <TigerStructure mode="structure" />,
  'tiger-rounds': () => <TigerStructure mode="rounds" />,
  'tiger-key-schedule': () => <TigerStructure mode="schedule" />,
  'tiger-avalanche': () => <HashPipeline mode="avalanche" />,

  /* —— Module 3 —— */
  'auth-problem': () => <MitmScene />,
  'randomness-matters': () => <EntropyScene mode="why" />,
  'what-randomness': () => <EntropyScene mode="definition" />,
  'statistical-properties': () => <EntropyScene mode="stats" />,
  'hardware-random': () => <EntropyScene mode="hardware" />,
  'software-observed-random': () => <EntropyScene mode="software" />,
  'nondeterministic-limits': () => <EntropyScene mode="limits" />,
  'deterministic-generator': () => <EntropyScene mode="prng" />,
  'seed-security': () => <EntropyScene mode="seed" />,
  'prng-comparison': () => <EntropyScene mode="compare" />,
  'replay-attack': () => <ReplayAttackScene />,
  freshness: () => <ChallengeResponseScene />,
  'fresh-vs-live': () => <ReplayAttackScene />,
  'clock-freshness': () => null,
  'clock-problems': () => null,
  'sequence-number': () => null,
  'sequence-limits': () => null,
  'nonce-challenge': () => <ChallengeResponseScene />,
  'unilateral-mutual': () => <MutualAuthScene />,
  'password-popular': () => <PasswordHashStore mode="store" />,
  'password-weaknesses': () => <BruteForceScene />,
  'password-attacks': () => <MitmScene />,
  'password-storage': () => <PasswordHashStore mode="plaintextRisk" />,
  'hash-salt-storage': () => <PasswordHashStore mode="store" />,
  'unix-password': () => <PasswordHashStore mode="unix" />,
  'zk-cave': () => <ZkCaveScene mode="cave" />,
  'zk-motivation': () => <ZkCaveScene mode="motivation" />,
  'prover-verifier': () => null,
  'zk-repetition': () => <ZkCaveScene mode="rounds" />,
  'atm-hijack': () => <MitmScene />,
  'dynamic-passwords': () => null,
  'sealed-bidding': () => <HashPipeline mode="fingerprint" />,
  'spam-pow': () => <HashPipeline mode="efficiency" />,
  'information-hiding': () => <EncryptVsHash />,
  'secure-layers': () => <TlsStageScene stage="layers" />,
  'wpa-overview': () => <WepPacketScene mode="wpa" />,
  'file-encryption': () => <EncryptVsHash />,
  'paytv-problem': () => <DosFloodScene />,
  'conditional-access': () => <PacketFilterScene mode="filter" />,
  'broadcast-hierarchy': () => <PacketFilterScene mode="hierarchy" />,

  /* —— Module 4 —— */
  'strong-algorithm-fail': () => <KeyMgmtScene mode="fail" />,
  'what-key-management': () => <KeyMgmtScene mode="definition" />,
  'management-controls': () => <KeyMgmtScene mode="controls" />,
  'key-lifecycle': () => <KeyMgmtScene mode="lifecycle" />,
  'key-generation': () => <KeyMgmtScene mode="generate" />,
  'key-establishment': () => <KeyMgmtScene mode="establish" />,
  'key-storage': () => <KeyMgmtScene mode="store" />,
  'key-usage-change': () => <KeyMgmtScene mode="usage" />,
  'key-destruction': () => <KeyMgmtScene mode="destroy" />,
  'secrecy-purpose': () => <KeyMgmtScene mode="usage" />,
  'environment-dependence': () => <KeyMgmtScene mode="ceremony" />,
  'key-length-tradeoff': () => <KeyMgmtScene mode="length" />,
  'why-expire': () => <KeyMgmtScene mode="expire" />,
  'direct-symmetric-generation': () => <KeyMgmtScene mode="generate" />,
  'easy-establishment-cases': () => <KeyMgmtScene mode="establish" />,
  'public-key-pair': () => <RsaFlow mode="keys" />,
  'establishment-problem': () => <KeyMgmtScene mode="establish" />,
  'agreement-distribution': () => <KeyMgmtScene mode="agree" />,
  'key-hierarchy': () => <KeyMgmtScene mode="hierarchy" />,
  'three-level-hierarchy': () => <KeyMgmtScene mode="threeLevel" />,
  'hierarchy-behaviour': () => <KeyMgmtScene mode="usage" />,
  'hsm-master': () => <KeyMgmtScene mode="hsm" />,
  'scaling-problem': () => <KeyMgmtScene mode="scale" />,
  'quantum-basic': () => <KeyMgmtScene mode="quantum" />,
  'bb84-story': () => <KeyMgmtScene mode="bb84" />,
  'eavesdrop-detect': () => <KeyMgmtScene mode="eve" />,
  'avoid-storage': () => <KeyMgmtScene mode="store" />,
  'software-storage': () => <KeyMgmtScene mode="softStore" />,
  'hsm-storage': () => <KeyMgmtScene mode="hsm" />,
  'storage-zones': () => <KeyMgmtScene mode="zones" />,
  'backup-archival': () => <KeyMgmtScene mode="ceremony" />,
  'usage-separation': () => <KeyMgmtScene mode="usage" />,
  'change-destroy': () => <KeyMgmtScene mode="destroy" />,
  'policies-ceremonies': () => <KeyMgmtScene mode="ceremony" />,
  'public-key-problem': () => <MitmScene />,
  'certificate-definition': () => <CertificateAnatomy />,
  'certificate-authority': () => <CaSigningScene />,
  'certificate-fields': () => <CertificateAnatomy focus="fields" />,
  'push-pull': () => <CertPushPull />,
  'creation-locations': () => <CaSigningScene />,
  'attribute-certs': () => <CertificateAnatomy focus="fields" />,
  'certificate-lifecycle': () => <KeyMgmtScene mode="lifecycle" />,
  revocation: () => <RevocationScene />,

  /* —— Module 5 TLS stages (distinct teaching states) —— */
  'tls-why': () => <TlsStageScene stage="problem" />,
  'tls-background': () => <TlsStageScene stage="overview" />,
  'tls-hybrid': () => <TlsStageScene stage="hybrid" />,
  'cipher-suite': () => <TlsStageScene stage="suite" />,
  'tls-protocols': () => <TlsStageScene stage="protocols" />,
  'client-hello': () => <TlsStageScene stage="clientHello" />,
  'server-hello': () => <TlsStageScene stage="serverHello" />,
  'tls-cert-validation': () => <CertVerificationPipeline />,
  premaster: () => <TlsStageScene stage="keyExchange" />,
  'master-secret': () => <TlsStageScene stage="keysCloseup" />,
  'finished-messages': () => <TlsStageScene stage="finished" />,
  'tls-full-handshake': () => <TlsStageScene stage="full" />,
  'server-auth': () => <CertificateAnatomy />,
  'mutual-auth': () => <MutualAuthScene />,
  'record-protocol': () => <TlsStageScene stage="record" />,
  'record-verify': () => <TlsStageScene stage="recordVerify" />,
  'tls-key-management': () => <TlsStageScene stage="keyMgmt" />,
  'tls-failures': () => <TlsStageScene stage="failure" />,
  'tls-lessons': () => <TlsStageScene stage="lessons" />,

  /* —— Module 5 WLAN / mobile / payment / home —— */
  'wlan-threat': () => <MitmScene />,
  'wep-components': () => <WepPacketScene mode="components" />,
  'wep-packet': () => <WepPacketScene mode="packet" />,
  'wep-auth': () => <ChallengeResponseScene />,
  'wep-weaknesses': () => <WepPacketScene mode="weakness" />,
  'gsm-auth': () => <GsmAuthScene mode="challenge" />,
  'sim-key': () => <GsmAuthScene mode="sim" />,
  'payment-env': () => <PaymentFlowScene mode="env" />,
  'atm-pos-flow': () => <PaymentFlowScene mode="flow" />,
  'emv-processing': () => <PaymentFlowScene mode="emv" />,
  'stripe-chip': () => <PaymentFlowScene mode="stripe" />,
  'home-threat': () => <DosFloodScene />,
  'eid-card': () => <CertificateAnatomy />,
  'belgian-eid': () => <CaSigningScene />,

  /* —— Network defense —— */
  'network-firewall': () => null, /* FirewallEngine kept on slide */
}

export const INS_VISUAL_SIGNATURES = {
  kerckhoffs: { family: 'principle', mode: 'public-algorithm', composition: 'book-key-attacker', camera: 'establishing' },
  'symmetric-public': { family: 'crypto-compare', mode: 'symmetric-asymmetric', composition: 'split-panel', camera: 'comparison' },
  'caesar-cipher': { family: 'caesar', mode: 'concept', composition: 'shift-dial', camera: 'establishing' },
  'caesar-encrypt': { family: 'caesar', mode: 'transform', composition: 'word-to-alphabet-map', camera: 'wide' },
  'caesar-decrypt': { family: 'caesar', mode: 'decrypt', composition: 'vertical-reverse', camera: 'reverse-flow' },
  'shift-key-space': { family: 'caesar', mode: 'keyspace', composition: '26-key-dial', camera: 'dial-closeup' },
  'exhaustive-search': { family: 'attack', mode: 'bruteforce', composition: 'attacker-candidates-verify', camera: 'wide' },
  'substitution-intro': { family: 'substitution', mode: 'single-rule', composition: 'symbol-rule-symbol', camera: 'establishing' },
  'general-substitution': { family: 'substitution', mode: 'alphabet-map', composition: 'two-alphabet-permutation', camera: 'wide' },
  shannon: { family: 'classical-crypto', mode: 'confusion-diffusion', composition: 'split-panel', camera: 'comparison' },
  'otp-limitation': { family: 'otp', mode: 'distribution', composition: 'message-pad-courier', camera: 'wide' },
  venona: { family: 'otp', mode: 'reuse', composition: 'xor-leak', camera: 'attacker-closeup' },

  'fingerprint-need': { family: 'hash', mode: 'fingerprint', composition: 'horizontal-pipeline', camera: 'wide' },
  'hash-definition': { family: 'hash', mode: 'definition', composition: 'hex-tile-closeup', camera: 'closeup' },
  'compression-property': { family: 'hash', mode: 'compress', composition: 'stacked-inputs-digests', camera: 'comparison' },
  efficiency: { family: 'hash', mode: 'efficiency', composition: 'speedometer', camera: 'dashboard' },
  'one-way': { family: 'hash', mode: 'oneWay', composition: 'reverse-blocked', camera: 'reverse-flow' },
  'weak-collision': { family: 'hash', mode: 'weakCollision', composition: 'attacker-target-search', camera: 'attacker' },
  'strong-collision': { family: 'hash', mode: 'strongCollision', composition: 'attacker-two-messages', camera: 'attacker' },
  'avalanche-effect': { family: 'hash', mode: 'avalanche', composition: 'split-screen-bitflip', camera: 'comparison' },
  'birthday-problem': { family: 'birthday', mode: 'paradox', composition: 'people-circle', camera: 'establishing' },
  'birthday-hash': { family: 'birthday', mode: 'hash', composition: 'message-pile-buckets', camera: 'wide' },
  'work-factor': { family: 'birthday', mode: 'workFactor', composition: 'math-bars', camera: 'dashboard' },
  'birthday-defense': { family: 'birthday', mode: 'defense', composition: 'long-digest-upgrade', camera: 'dashboard' },
  'hash-not-auth': { family: 'attack', mode: 'mitm', composition: 'middle-attacker', camera: 'attacker' },
  'hmac-structure': { family: 'hmac', mode: 'structure', composition: 'formula-strip-flow', camera: 'wide' },
  'hmac-animation': { family: 'hmac', mode: 'nested', composition: 'nested-boxes', camera: 'closeup' },
  'simple-hashes': { family: 'crc', mode: 'weakSum', composition: 'fooled-sums', camera: 'worked-closeup' },
  'weighted-sum': { family: 'crc', mode: 'compare', composition: 'crc-vs-crypto-split', camera: 'comparison' },
  'crc-not-crypto': { family: 'crc', mode: 'attack', composition: 'attacker-recompute', camera: 'attacker' },
  'crc-worked': { family: 'crc', mode: 'worked', composition: 'polynomial-division', camera: 'closeup' },
  'tiger-intro': { family: 'hash', mode: 'fingerprint', composition: 'horizontal-pipeline', camera: 'wide' },
  'tiger-structure': { family: 'tiger', mode: 'structure', composition: 'three-pass-pipeline', camera: 'wide' },
  'tiger-rounds': { family: 'tiger', mode: 'rounds', composition: 'round-exploded', camera: 'closeup' },
  'tiger-key-schedule': { family: 'tiger', mode: 'schedule', composition: 'word-transform-grid', camera: 'between-pass' },
  'tiger-avalanche': { family: 'hash', mode: 'avalanche', composition: 'split-screen-bitflip', camera: 'comparison' },

  'auth-problem': { family: 'attack', mode: 'mitm', composition: 'middle-attacker', camera: 'attacker' },
  'randomness-matters': { family: 'entropy', mode: 'why', composition: 'establishing-icons', camera: 'establishing' },
  'what-randomness': { family: 'entropy', mode: 'definition', composition: 'equal-likelihood-bitstrings', camera: 'closeup' },
  'statistical-properties': { family: 'entropy', mode: 'stats', composition: 'balance-bars-pattern-chart', camera: 'dashboard' },
  'hardware-random': { family: 'entropy', mode: 'hardware', composition: 'physical-source-tiles', camera: 'wide' },
  'software-observed-random': { family: 'entropy', mode: 'software', composition: 'timing-entropy-pool', camera: 'wide' },
  'nondeterministic-limits': { family: 'entropy', mode: 'limits', composition: 'operational-alert-panel', camera: 'attacker/warn' },
  'deterministic-generator': { family: 'entropy', mode: 'prng', composition: 'seed-expander-stream', camera: 'wide' },
  'seed-security': { family: 'entropy', mode: 'seed', composition: 'seed-theft-prediction', camera: 'attacker' },
  'prng-comparison': { family: 'entropy', mode: 'compare', composition: 'random-vs-prng-split', camera: 'comparison' },
  'replay-attack': { family: 'auth', mode: 'replay', composition: 'capture-and-resend', camera: 'attacker' },
  freshness: { family: 'auth', mode: 'challenge-response', composition: 'nonce-roundtrip', camera: 'protocol' },
  'fresh-vs-live': { family: 'auth', mode: 'replay', composition: 'capture-and-resend', camera: 'attacker' },
  'clock-freshness': { family: 'protocol', mode: 'clock-freshness', composition: 'timestamp-window', camera: 'timeline' },
  'clock-problems': { family: 'story-cards', mode: 'clock-problems', composition: 'freshness-risk-cards', camera: 'dashboard' },
  'sequence-number': { family: 'protocol', mode: 'sequence-number', composition: 'monotonic-state-check', camera: 'timeline' },
  'sequence-limits': { family: 'story-cards', mode: 'sequence-limits', composition: 'sequence-risk-cards', camera: 'dashboard' },
  'nonce-challenge': { family: 'auth', mode: 'challenge-response', composition: 'nonce-roundtrip', camera: 'protocol' },
  'unilateral-mutual': { family: 'auth', mode: 'mutual', composition: 'two-way-proof', camera: 'wide' },
  'password-popular': { family: 'password', mode: 'store', composition: 'salt-hash-compare', camera: 'wide' },
  'password-weaknesses': { family: 'attack', mode: 'bruteforce', composition: 'attacker-candidates-verify', camera: 'wide' },
  'password-attacks': { family: 'attack', mode: 'mitm', composition: 'middle-attacker', camera: 'attacker' },
  'password-storage': { family: 'password', mode: 'plaintextRisk', composition: 'leaked-db-alert', camera: 'attacker' },
  'hash-salt-storage': { family: 'password', mode: 'store', composition: 'salt-hash-compare', camera: 'wide' },
  'unix-password': { family: 'password', mode: 'unix', composition: 'record-fields-closeup', camera: 'closeup' },
  'zk-motivation': { family: 'zero-knowledge', mode: 'motivation', composition: 'secret-not-sent', camera: 'establishing' },
  'zk-cave': { family: 'zero-knowledge', mode: 'cave', composition: 'cave-paths', camera: 'story' },
  'zk-repetition': { family: 'zero-knowledge', mode: 'rounds', composition: 'round-cards', camera: 'sequence' },
  'atm-hijack': { family: 'attack', mode: 'mitm', composition: 'middle-attacker', camera: 'attacker' },
  'sealed-bidding': { family: 'hash', mode: 'fingerprint', composition: 'horizontal-pipeline', camera: 'wide' },
  'spam-pow': { family: 'hash', mode: 'efficiency', composition: 'speedometer', camera: 'dashboard' },
  'information-hiding': { family: 'crypto-compare', mode: 'encrypt-vs-hash', composition: 'two-row-comparison', camera: 'comparison' },
  'secure-layers': { family: 'tls', mode: 'layers', composition: 'vertical-layer-stack', camera: 'comparison' },
  'wpa-overview': { family: 'wifi', mode: 'wpa', composition: 'improvement-cards', camera: 'dashboard' },
  'file-encryption': { family: 'crypto-compare', mode: 'encrypt-vs-hash', composition: 'two-row-comparison', camera: 'comparison' },
  'paytv-problem': { family: 'availability', mode: 'dos', composition: 'flood-resource', camera: 'attacker' },
  'conditional-access': { family: 'access-control', mode: 'filter', composition: 'packet-table-decisions', camera: 'wide' },
  'broadcast-hierarchy': { family: 'access-control', mode: 'hierarchy', composition: 'key-tree', camera: 'tree' },

  'strong-algorithm-fail': { family: 'key-management', mode: 'fail', composition: 'strong-aes-stolen-key', camera: 'attacker' },
  'what-key-management': { family: 'key-management', mode: 'definition', composition: 'people-process-tech-around-key', camera: 'establishing' },
  'management-controls': { family: 'key-management', mode: 'controls', composition: 'four-control-tiles', camera: 'dashboard' },
  'key-lifecycle': { family: 'key-management', mode: 'lifecycle', composition: 'circular-lifecycle-arc', camera: 'wide' },
  'key-generation': { family: 'key-management', mode: 'generate', composition: 'rng-key-bits-closeup', camera: 'closeup' },
  'key-establishment': { family: 'key-management', mode: 'establish', composition: 'authenticated-key-channel', camera: 'protocol' },
  'key-storage': { family: 'key-management', mode: 'store', composition: 'vault-file-hsm-zones', camera: 'wide' },
  'key-usage-change': { family: 'key-management', mode: 'usage', composition: 'purpose-key-split', camera: 'comparison' },
  'key-destruction': { family: 'key-management', mode: 'destroy', composition: 'zeroize-shred-key', camera: 'closeup' },
  'secrecy-purpose': { family: 'key-management', mode: 'usage', composition: 'purpose-key-split', camera: 'comparison' },
  'environment-dependence': { family: 'key-management', mode: 'ceremony', composition: 'dual-control-audit-strip', camera: 'sequence' },
  'key-length-tradeoff': { family: 'key-management', mode: 'length', composition: 'length-cost-bars', camera: 'dashboard' },
  'why-expire': { family: 'key-management', mode: 'expire', composition: 'cryptoperiod-arc', camera: 'timeline' },
  'direct-symmetric-generation': { family: 'key-management', mode: 'generate', composition: 'rng-key-bits-closeup', camera: 'closeup' },
  'easy-establishment-cases': { family: 'key-management', mode: 'establish', composition: 'authenticated-key-channel', camera: 'protocol' },
  'public-key-pair': { family: 'rsa', mode: 'keys', composition: 'public-private-key-pair', camera: 'wide' },
  'establishment-problem': { family: 'key-management', mode: 'establish', composition: 'authenticated-key-channel', camera: 'protocol' },
  'agreement-distribution': { family: 'key-management', mode: 'agree', composition: 'both-contribute-key', camera: 'protocol' },
  'key-hierarchy': { family: 'key-management', mode: 'hierarchy', composition: 'master-kek-session-tree', camera: 'tree' },
  'three-level-hierarchy': { family: 'key-management', mode: 'threeLevel', composition: 'explicit-three-level-tree', camera: 'tree' },
  'hierarchy-behaviour': { family: 'key-management', mode: 'usage', composition: 'purpose-key-split', camera: 'comparison' },
  'hsm-master': { family: 'key-management', mode: 'hsm', composition: 'hardware-boundary-key-inside', camera: 'closeup' },
  'scaling-problem': { family: 'key-management', mode: 'scale', composition: 'pairwise-mesh-explosion', camera: 'establishing' },
  'quantum-basic': { family: 'key-management', mode: 'quantum', composition: 'photon-disturbance-path', camera: 'story' },
  'bb84-story': { family: 'key-management', mode: 'bb84', composition: 'photon-bases-sequence', camera: 'story' },
  'eavesdrop-detect': { family: 'key-management', mode: 'eve', composition: 'measurement-disturbance-eve', camera: 'attacker' },
  'avoid-storage': { family: 'key-management', mode: 'store', composition: 'vault-file-hsm-zones', camera: 'wide' },
  'software-storage': { family: 'key-management', mode: 'softStore', composition: 'encrypted-file-kek', camera: 'wide' },
  'hsm-storage': { family: 'key-management', mode: 'hsm', composition: 'hardware-boundary-key-inside', camera: 'closeup' },
  'storage-zones': { family: 'key-management', mode: 'zones', composition: 'storage-zone-risk-panels', camera: 'wide' },
  'backup-archival': { family: 'key-management', mode: 'ceremony', composition: 'dual-control-audit-strip', camera: 'sequence' },
  'usage-separation': { family: 'key-management', mode: 'usage', composition: 'purpose-key-split', camera: 'comparison' },
  'change-destroy': { family: 'key-management', mode: 'destroy', composition: 'zeroize-shred-key', camera: 'closeup' },
  'policies-ceremonies': { family: 'key-management', mode: 'ceremony', composition: 'dual-control-audit-strip', camera: 'sequence' },
  'public-key-problem': { family: 'attack', mode: 'mitm', composition: 'middle-attacker', camera: 'attacker' },
  'certificate-definition': { family: 'certificate', mode: 'definition', composition: 'document-field-list', camera: 'wide' },
  'certificate-authority': { family: 'certificate', mode: 'ca-signing', composition: 'identity-to-ca-to-cert', camera: 'wide' },
  'certificate-fields': { family: 'certificate', mode: 'fields', composition: 'field-card-grid', camera: 'closeup' },
  'push-pull': { family: 'certificate', mode: 'push-pull', composition: 'certificate-travel-directions', camera: 'protocol' },
  'creation-locations': { family: 'certificate', mode: 'ca-signing', composition: 'identity-to-ca-to-cert', camera: 'wide' },
  'attribute-certs': { family: 'certificate', mode: 'fields', composition: 'field-card-grid', camera: 'closeup' },
  'certificate-lifecycle': { family: 'key-management', mode: 'lifecycle', composition: 'circular-lifecycle-arc', camera: 'wide' },
  revocation: { family: 'certificate', mode: 'revocation', composition: 'revoked-status-chain', camera: 'wide' },
  'tls-cert-validation': { family: 'certificate', mode: 'verification', composition: 'check-pipeline', camera: 'sequence' },

  'tls-why': { family: 'tls', mode: 'problem', composition: 'attacker-path', camera: 'establishing' },
  'tls-background': { family: 'tls', mode: 'overview', composition: 'secure-channel', camera: 'wide' },
  'tls-hybrid': { family: 'tls', mode: 'hybrid', composition: 'cert-key-session', camera: 'wide' },
  'cipher-suite': { family: 'tls', mode: 'suite', composition: 'suite-token-breakdown', camera: 'closeup' },
  'tls-protocols': { family: 'tls', mode: 'protocols', composition: 'two-protocol-panels', camera: 'comparison' },
  'client-hello': { family: 'tls-handshake', mode: 'clientHello', composition: 'ladder-client-request', camera: 'protocol' },
  'server-hello': { family: 'tls-handshake', mode: 'serverHello', composition: 'ladder-server-response', camera: 'protocol' },
  premaster: { family: 'tls-handshake', mode: 'keyExchange', composition: 'ladder-highlight', camera: 'protocol' },
  'master-secret': { family: 'tls', mode: 'keysCloseup', composition: 'key-derivation-closeup', camera: 'closeup' },
  'finished-messages': { family: 'tls-handshake', mode: 'finished', composition: 'ladder-highlight', camera: 'protocol' },
  'tls-full-handshake': { family: 'tls', mode: 'full', composition: 'curved-ladder-tunnel', camera: 'wide' },
  'server-auth': { family: 'certificate', mode: 'definition', composition: 'document-field-list', camera: 'wide' },
  'mutual-auth': { family: 'auth', mode: 'mutual', composition: 'two-way-proof', camera: 'wide' },
  'record-protocol': { family: 'tls', mode: 'record', composition: 'record-encryption', camera: 'wide' },
  'record-verify': { family: 'tls', mode: 'recordVerify', composition: 'record-tag-check', camera: 'receiver' },
  'tls-key-management': { family: 'tls', mode: 'keyMgmt', composition: 'pki-to-session-keys', camera: 'wide' },
  'tls-failures': { family: 'tls', mode: 'failure', composition: 'warning-blocked-path', camera: 'attacker' },
  'tls-lessons': { family: 'tls', mode: 'lessons', composition: 'takeaway-dashboard', camera: 'dashboard' },

  'wlan-threat': { family: 'attack', mode: 'mitm', composition: 'middle-attacker', camera: 'attacker' },
  'wep-components': { family: 'wifi', mode: 'components', composition: 'component-row', camera: 'wide' },
  'wep-packet': { family: 'wifi', mode: 'packet', composition: 'packet-pipeline', camera: 'wide' },
  'wep-auth': { family: 'auth', mode: 'challenge-response', composition: 'nonce-roundtrip', camera: 'protocol' },
  'wep-weaknesses': { family: 'wifi', mode: 'weakness', composition: 'weakness-alerts', camera: 'attacker' },
  'sim-key': { family: 'gsm', mode: 'sim', composition: 'sim-secret-closeup', camera: 'closeup' },
  'gsm-auth': { family: 'gsm', mode: 'challenge', composition: 'network-sim-roundtrip', camera: 'protocol' },
  'payment-env': { family: 'payment', mode: 'env', composition: 'environment-map', camera: 'establishing' },
  'atm-pos-flow': { family: 'payment', mode: 'flow', composition: 'issuer-acquirer-flow', camera: 'wide' },
  'emv-processing': { family: 'payment', mode: 'emv', composition: 'dynamic-cryptogram', camera: 'closeup' },
  'stripe-chip': { family: 'payment', mode: 'stripe', composition: 'magstripe-closeup', camera: 'closeup' },
  'home-threat': { family: 'availability', mode: 'dos', composition: 'flood-resource', camera: 'attacker' },
  'eid-card': { family: 'certificate', mode: 'definition', composition: 'document-field-list', camera: 'wide' },
  'belgian-eid': { family: 'certificate', mode: 'ca-signing', composition: 'identity-to-ca-to-cert', camera: 'wide' },
  'network-firewall': { family: 'engine', mode: 'platform', composition: 'existing-engine', camera: 'engine' },
}

export function visualForSlide(id) {
  const visual = INS_TEACHING_VISUALS[id]
  return visual ? visual() : null
}
