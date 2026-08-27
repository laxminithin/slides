/**
 * InsOpenings — cinematic module-opening scenes (INS Phase 3, "Cinematic
 * Identity"). Each module gets a UNIQUE opening that answers "why does this
 * module exist?" before any teaching. Composed entirely from the Phase 2 glass
 * glyph kit (InsSecurityViz) — no new art style, just reuse + compose.
 *
 * Motion language: layered reveal driven by per-element `--d` (delay) —
 * background → network → objects → trust animation → path. Entrances run ONCE
 * (see .iv-in* in insViz.css); continuous idle life (bob / LEDs / packets) lives
 * on inner groups so it survives the assemble. Camera feel = drift / assemble /
 * reveal / illuminate, never a pop. Remount on slide nav replays the sequence.
 * Reduced-motion snaps straight to the composed final frame.
 */
import {
  IvDefs, SecurityPacket, SecureTunnel, VerificationPulse, TrustBadge,
  GlassServer, SecurityShield, Lock, Certificate, Cloud, BrowserClient,
  Key, NetworkNode, ThreatActor, CertificateAuthority,
} from './InsSecurityViz'

const T = { fontFamily: 'inherit' }
const VB = '0 0 560 430'

/* small ambient network node (raw glass dot with a live LED) */
function Dot({ x, y, c = 'var(--iv-cyan)', d = 0 }) {
  return (
    <g>
      <circle cx={x} cy={y} r="7" fill="#fff" stroke="#cdd9ec" strokeWidth="1.5" />
      <circle className="iv-led" cx={x} cy={y} r="3" fill={c} style={{ '--delay': `${d}s` }} />
    </g>
  )
}
const Layer = ({ d = 0, kind = 'iv-in', children }) => (
  <g className={kind} style={{ '--d': `${d}s` }}>{children}</g>
)

/* ===========================================================================
   MODULE 1 — Introduction to Security · "Trust vs Threat"
   network appears → packets flow → threat fades in → shield activates → safe
   path glows.
   ======================================================================== */
export function OpeningM1() {
  const safe = 'M120,236 C210,236 210,236 262,214 M298,214 C350,236 350,236 440,236'
  return (
    <svg className="iv-svg iv-open" viewBox={VB} role="img" aria-label="A network of trusted nodes; a threat is stopped by a security shield along the safe path">
      <IvDefs />
      {/* network layer */}
      <Layer d={0.15} kind="iv-in-fade">
        <line className="iv-conn iv-draw" x1="150" y1="90" x2="280" y2="200" style={{ '--len': 180, '--d': '0.2s' }} />
        <line className="iv-conn iv-draw" x1="410" y1="90" x2="280" y2="200" style={{ '--len': 180, '--d': '0.3s' }} />
        <line className="iv-conn iv-draw" x1="120" y1="330" x2="280" y2="220" style={{ '--len': 200, '--d': '0.35s' }} />
        <line className="iv-conn iv-draw" x1="440" y1="330" x2="280" y2="220" style={{ '--len': 200, '--d': '0.4s' }} />
        <Dot x={150} y={90} d={0} /><Dot x={410} y={90} d={0.5} />
        <Dot x={120} y={330} d={0.8} /><Dot x={440} y={330} d={1.1} />
      </Layer>

      {/* endpoints */}
      <Layer d={0.45}><NetworkNode x={40} y={200} w={84} h={74} label="User" color="var(--iv-blue)" bob delay={0.2} /></Layer>
      <Layer d={0.6}><GlassServer x={436} y={200} w={84} h={74} label="Server" color="var(--iv-blue)" bob delay={0.9} /></Layer>

      {/* safe traffic flows */}
      <Layer d={0.85} kind="iv-in-fade">
        <path className="iv-conn iv-path-glow iv-s-emerald" d={safe} style={{ strokeWidth: 3, '--d': '1.7s' }} />
        <SecurityPacket path="M120,236 C210,236 250,214 440,236" color="var(--iv-blue)" dur={3} square r={6} />
        <SecurityPacket path="M120,236 C210,236 250,214 440,236" color="var(--iv-emerald)" dur={3} delay={1.4} square r={6} />
      </Layer>

      {/* threat fades in, then is blocked at the shield */}
      <Layer d={1.05}><ThreatActor x={382} y={22} w={150} h={62} label="Threat" color="var(--iv-red)" /></Layer>
      <Layer d={1.1} kind="iv-in-fade">
        <SecurityPacket path="M420,84 C360,120 320,150 292,178" color="var(--iv-red)" dur={2.6} delay={1.3} square r={6} dissolve />
        <g transform="translate(288,176)"><path className="iv-block" d="M-8 -8 L8 8 M8 -8 L-8 8" stroke="var(--iv-red)" strokeWidth="3.4" strokeLinecap="round" style={{ '--dur': '2.6s', '--delay': '1.3s' }} /></g>
      </Layer>

      {/* shield activates */}
      <Layer d={1.35} kind="iv-in-scale">
        <VerificationPulse x={280} y={200} r={54} delay={1.6} dur={3} />
        <SecurityShield x={234} y={150} w={92} h={100} tone="trust" label="Trust" color="var(--iv-emerald)" glow="var(--iv-emerald)" bob delay={0.4} />
      </Layer>
    </svg>
  )
}

/* ===========================================================================
   MODULE 2 — Hash Functions · "Fingerprinting Information"
   message → hash function → fixed-size digest; a tiny input change produces a
   very different fingerprint.
   ======================================================================== */
export function OpeningM2() {
  return (
    <svg className="iv-svg iv-open" viewBox={VB} role="img" aria-label="A message is processed by a hash function into digest bytes; a tiny change creates a very different fingerprint">
      <IvDefs />
      {/* faint digest/hex backdrop */}
      <Layer d={0.1} kind="iv-in-fade">
        {['4F9A', 'SHA', 'D1E7', '0010', 'A8C3', 'HASH', '7B21', 'FE90'].map((t, i) => (
          <text key={i} x={30 + (i % 4) * 140} y={44 + Math.floor(i / 4) * 350} fontFamily="ui-monospace, monospace" fontSize="13" fill="#9fb2cf" opacity="0.22" style={T}>{t}</text>
        ))}
      </Layer>

      {/* flow: message → hash function → digest */}
      <Layer d={0.35}><Certificate x={28} y={178} w={96} h={92} label="Message" sub="M" color="var(--iv-blue)" /></Layer>
      <Layer d={0.6} kind="iv-in-scale">
        <g>
          <rect className="iv-box soft" x="208" y="164" width="144" height="120" rx="18" />
          <rect x="224" y="184" width="112" height="38" rx="10" fill="url(#ivSecure)" opacity="0.14" />
          <text className="iv-title" x="280" y="208" textAnchor="middle" fontSize="16" fontWeight="900" style={T}>HASH</text>
          <text className="iv-sub" x="280" y="242" textAnchor="middle" fontSize="10.5" style={T}>one-way function</text>
          <text className="iv-sub" x="280" y="258" textAnchor="middle" fontSize="9.5" style={T}>fixed-size output</text>
        </g>
      </Layer>
      <Layer d={1.05}>
        <g transform="translate(428,176)">
          <rect className="iv-box trust" x="0" y="0" width="104" height="96" rx="14" />
          {['4F', '9A', 'D1', 'E7', '2C', 'B8'].map((b, i) => (
            <g key={b} transform={`translate(${16 + (i % 3) * 28},${18 + Math.floor(i / 3) * 28})`}>
              <rect x="-10" y="-12" width="22" height="20" rx="5" fill="#fff" stroke="#d7e7dc" />
              <text className="iv-label" x="1" y="3" textAnchor="middle" fontSize="9" fontFamily="ui-monospace, monospace">{b}</text>
            </g>
          ))}
          <text className="iv-title" x="52" y="82" textAnchor="middle" fontSize="11.5" style={T}>Digest bytes</text>
        </g>
      </Layer>

      {/* transformation packets (message → digest fingerprint) */}
      <Layer d={0.8} kind="iv-in-fade">
        <SecurityPacket path="M126,224 L208,224" color="var(--iv-blue)" dur={2.2} square r={6} />
        <SecurityPacket path="M352,224 L428,224" color="var(--iv-emerald)" dur={2.2} delay={1.1} square r={6} />
        <line className="iv-conn" x1="126" y1="224" x2="208" y2="224" markerEnd="url(#ivArrow)" />
        <line className="iv-conn" x1="352" y1="224" x2="428" y2="224" markerEnd="url(#ivArrowBlue)" />
      </Layer>

      {/* avalanche hint */}
      <Layer d={1.35} kind="iv-in-fade">
        <g transform="translate(122,318)">
          <rect className="iv-box warn" x="0" y="0" width="316" height="54" rx="14" />
          <text className="iv-title" x="22" y="24" fontSize="12" style={T}>M</text>
          <text className="iv-f-red" x="44" y="24" fontSize="12" fontWeight="900" style={T}>+ 1 bit</text>
          <text className="iv-sub" x="158" y="24" textAnchor="middle" fontSize="10" style={T}>avalanche effect</text>
          <text className="iv-label" x="214" y="24" fontSize="10" fontFamily="ui-monospace, monospace">4F9A...</text>
          <text className="iv-f-red" x="258" y="24" fontSize="12" fontWeight="900" style={T}>!=</text>
          <text className="iv-label" x="276" y="24" fontSize="10" fontFamily="ui-monospace, monospace">A8C3...</text>
        </g>
      </Layer>
    </svg>
  )
}

/* ===========================================================================
   MODULE 3 — Authentication · "Proving Identity"
   user → credentials → verification → trust badge → door unlocks → network
   activates.
   ======================================================================== */
export function OpeningM3() {
  return (
    <svg className="iv-svg iv-open" viewBox={VB} role="img" aria-label="A user presents credentials, is verified, earns a trust badge, and a lock opens to activate the network">
      <IvDefs />
      <Layer d={0.3}><NetworkNode x={20} y={188} w={84} h={78} label="User" sub="claims identity" color="var(--iv-blue)" bob delay={0.2} /></Layer>
      <Layer d={0.55}><Key x={128} y={188} w={84} h={78} tone="soft" label="Credentials" color="var(--iv-amber)" /></Layer>
      <Layer d={0.85} kind="iv-in-scale">
        <SecurityShield x={238} y={172} w={92} h={98} tone="soft" label="Verify" color="var(--iv-cyan)" bob delay={0.4} />
        <VerificationPulse x={284} y={221} r={40} delay={1.4} dur={2.8} />
      </Layer>
      <Layer d={1.15}><g transform="translate(360,150)"><TrustBadge x={0} y={0} on label="Trusted" /></g></Layer>
      <Layer d={1.35} kind="iv-in-scale"><Lock x={392} y={188} w={84} h={78} tone="trust" label="Access" sub="granted" color="var(--iv-emerald)" open glow="var(--iv-emerald)" /></Layer>

      {/* network activates (dots light up) */}
      <Layer d={1.55} kind="iv-in-fade">
        <Dot x={500} y={120} d={1.6} /><Dot x={526} y={200} d={1.8} /><Dot x={498} y={286} d={2} />
        <line className="iv-conn iv-draw" x1="476" y1="214" x2="500" y2="120" style={{ '--len': 100, '--d': '1.6s' }} />
        <line className="iv-conn iv-draw" x1="476" y1="222" x2="526" y2="200" style={{ '--len': 60, '--d': '1.7s' }} />
        <line className="iv-conn iv-draw" x1="476" y1="230" x2="498" y2="286" style={{ '--len': 80, '--d': '1.8s' }} />
      </Layer>

      {/* credential → verify flow */}
      <Layer d={0.75} kind="iv-in-fade">
        <SecurityPacket path="M212,227 L238,227" color="var(--iv-amber)" dur={2} square r={5} />
        <SecurityPacket path="M330,221 L392,221" color="var(--iv-emerald)" dur={2.2} delay={1} square r={6} />
      </Layer>
    </svg>
  )
}

/* ===========================================================================
   MODULE 4 — PKI & Certificates · "Building Trust"
   root CA → intermediate → certificates cascade → trust chain illuminates →
   browser verifies → green trust path.
   ======================================================================== */
export function OpeningM4() {
  const steps = [
    { x: 30, y: 24, C: CertificateAuthority, label: 'Root CA', sub: 'trust anchor', color: 'var(--iv-blue)' },
    { x: 170, y: 118, C: CertificateAuthority, label: 'Intermediate', sub: 'CA', color: 'var(--iv-cyan)' },
    { x: 310, y: 212, C: Certificate, label: 'Certificate', sub: 'org / server', color: 'var(--iv-blue)' },
    { x: 448, y: 300, C: BrowserClient, label: 'Browser', sub: 'verifies', color: 'var(--iv-emerald)' },
  ]
  return (
    <svg className="iv-svg iv-open" viewBox={VB} role="img" aria-label="Trust cascades from a root CA through intermediates and a certificate to the browser, illuminating a green trust path">
      <IvDefs />
      {/* trust chain path illuminates */}
      <Layer d={0.2} kind="iv-in-fade">
        <path className="iv-conn iv-draw" d="M84,66 L214,160 M244,160 L354,254 M384,254 L492,342" style={{ '--len': 420, '--d': '0.3s', strokeWidth: 2.4 }} />
        <path className="iv-conn iv-path-glow iv-s-emerald" d="M84,66 L214,160 L244,160 L354,254 L384,254 L492,342" style={{ strokeWidth: 3, '--d': '1.9s', fill: 'none' }} />
      </Layer>

      {steps.map((s, i) => (
        <g key={s.label}>
          <Layer d={0.4 + i * 0.28} kind="iv-in-scale">
            <s.C x={s.x} y={s.y} w={98} h={84} label={s.label} sub={s.sub} color={s.color} bob delay={i * 0.3} />
          </Layer>
          {/* trust badge illuminates progressively */}
          <g className="iv-step-on" style={{ '--delay': `${1.2 + i * 0.3}s`, '--dur': '7s' }}>
            <TrustBadge x={s.x + 84} y={s.y + 8} on label="" />
          </g>
        </g>
      ))}

      {/* certificates cascade down the chain */}
      <Layer d={0.9} kind="iv-in-fade">
        <SecurityPacket path="M84,66 L214,160" color="var(--iv-blue)" dur={2.4} square r={6} />
        <SecurityPacket path="M244,160 L354,254" color="var(--iv-blue)" dur={2.4} delay={0.8} square r={6} />
        <SecurityPacket path="M384,254 L492,342" color="var(--iv-emerald)" dur={2.4} delay={1.6} square r={6} />
      </Layer>
    </svg>
  )
}

/* ===========================================================================
   MODULE 5 — Network Security · "Defending the Perimeter"
   network forms → threat packets approach → firewall rises → threat blocked →
   secure tunnel appears → shield locks.
   ======================================================================== */
export function OpeningM5() {
  return (
    <svg className="iv-svg iv-open" viewBox={VB} role="img" aria-label="A firewall rises to block incoming threats while a secure tunnel protects traffic to the server">
      <IvDefs />
      {/* network forms (left cluster) */}
      <Layer d={0.2} kind="iv-in-fade">
        <line className="iv-conn iv-draw" x1="60" y1="120" x2="70" y2="215" style={{ '--len': 100, '--d': '0.25s' }} />
        <line className="iv-conn iv-draw" x1="60" y1="315" x2="70" y2="230" style={{ '--len': 100, '--d': '0.3s' }} />
        <Dot x={60} y={120} d={0} /><Dot x={60} y={315} d={0.6} />
      </Layer>
      <Layer d={0.4}><Cloud x={30} y={188} w={84} h={72} label="Traffic" color="var(--iv-muted)" bob delay={0.3} /></Layer>

      {/* threat packets approach */}
      <Layer d={0.7} kind="iv-in-fade">
        <SecurityPacket path="M118,214 L214,214" color="var(--iv-red)" dur={2.4} square r={6} dissolve />
        <SecurityPacket path="M118,236 L214,236" color="var(--iv-red)" dur={2.4} delay={1.2} square r={6} dissolve />
      </Layer>

      {/* firewall rises */}
      <Layer d={1.0}>
        <rect className="iv-box soft" x={222} y={120} width={70} height={200} rx="14" />
        <rect x={222} y={120} width={70} height={30} rx="14" fill="url(#ivSecure)" opacity="0.18" />
        <path className="iv-breathe" d="M257,126 L269,130 V139 C269,146 263,150 257,153 C251,150 245,146 245,139 V130 Z" fill="#eef4ff" stroke="var(--iv-blue)" strokeWidth="1.6" />
        <path d="M252,139 L256,143 L263,135" fill="none" stroke="var(--iv-blue)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <text className="iv-title" x={257} y={178} textAnchor="middle" fontSize="10.5" style={T}>FIRE</text>
        <text className="iv-title" x={257} y={191} textAnchor="middle" fontSize="10.5" style={T}>WALL</text>
        {['#10b981', '#10b981', '#ef4444', '#f59e0b'].map((c, i) => (
          <rect key={i} x={234} y={206 + i * 26} width={46} height={18} rx="5" fill="#fff" stroke="#e2e9f4" />
        ))}
        {['#10b981', '#10b981', '#ef4444', '#f59e0b'].map((c, i) => (
          <circle key={i} cx={244} cy={215 + i * 26} r="3" fill={c} />
        ))}
        <rect className="iv-scan" x={232} y={204} width={50} height={18} rx="5" fill="url(#ivSecure)" opacity="0.5" style={{ '--scan': '78px', '--dur': '3.4s' }} />
      </Layer>

      {/* threats blocked at the wall */}
      <Layer d={1.1} kind="iv-in-fade">
        <g transform="translate(216,214)"><path className="iv-block" d="M-7 -7 L7 7 M7 -7 L-7 7" stroke="var(--iv-red)" strokeWidth="3.2" strokeLinecap="round" style={{ '--dur': '2.4s' }} /></g>
        <g transform="translate(216,236)"><path className="iv-block" d="M-7 -7 L7 7 M7 -7 L-7 7" stroke="var(--iv-red)" strokeWidth="3.2" strokeLinecap="round" style={{ '--dur': '2.4s', '--delay': '1.2s' }} /></g>
      </Layer>

      {/* secure tunnel to the protected server */}
      <Layer d={1.35} kind="iv-in-fade">
        <SecureTunnel x1={300} y1={214} x2={438} y2={214} h={22} period={5} label="Secure tunnel" />
      </Layer>
      <Layer d={1.5} kind="iv-in-scale">
        <GlassServer x={452} y={182} w={84} h={74} tone="trust" label="Server" color="var(--iv-emerald)" glow="var(--iv-emerald)" bob delay={0.5} />
        <g transform="translate(482,150)"><Lock x={0} y={0} w={48} h={40} color="var(--iv-emerald)" /></g>
      </Layer>
    </svg>
  )
}

const MAP = { 1: OpeningM1, 2: OpeningM2, 3: OpeningM3, 4: OpeningM4, 5: OpeningM5 }
export function ModuleOpening({ module = 1 }) {
  const C = MAP[Number(module)] || OpeningM1
  return <C />
}
