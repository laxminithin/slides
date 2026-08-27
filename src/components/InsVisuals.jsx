import { CheckCircle2, Database, FileCheck2, KeyRound, LockKeyhole, Router, Server, ShieldAlert, ShieldCheck, UserRound, XCircle } from 'lucide-react'
import { Lead, Takeaway } from './Teaching'
import { FirewallEngine, TlsHandshake } from './InsSecurityViz'
import { InsHeroScene } from './InsKit'
import { visualForSlide } from './InsTeachingScenes'

const icon = { size: 26, strokeWidth: 1.8, 'aria-hidden': true }

const scenarioText = {
  tls: 'Alice opens her browser to pay fees. Eve can capture the traffic, so Bob\'s server proves its identity, negotiates keys and protects records.',
  wlan: 'Alice joins campus Wi-Fi. Eve listens from nearby, so the access point and device must establish fresh pairwise keys.',
  mobile: 'Alice\'s phone proves SIM possession to the home network before a radio session key protects calls and data.',
  payment: 'A card transaction travels from terminal to issuer. Dynamic cryptographic values stop simple cloning and message tampering.',
  key: 'A key is born, protected, used for a purpose, rotated and destroyed before old exposure becomes a future breach.',
  hash: 'Alice sends a file fingerprint. Bob recomputes it; if Eve changes even one bit, the digest no longer matches.',
  auth: 'Bob does not accept a name alone. Alice must answer a fresh challenge so replayed evidence is rejected.',
  attack: 'Eve sends suspicious traffic. The defense observes, verifies and blocks the malicious path while clean packets continue.',
  default: 'Alice sends protected data to Bob through an untrusted Internet while Eve tries to observe, alter or replay the message.',
}

function pickScenario(id = '', section = '', title = '') {
  const text = `${id} ${section} ${title}`.toLowerCase()
  // Order matters: prefer specific domains before broad keyword traps.
  if (/tls|ssl|handshake|cipher.?suite|premaster|record.?protocol|client.?hello|server.?hello/.test(text)) return 'tls'
  if (/wlan|wep|wpa|wifi|wireless/.test(text)) return 'wlan'
  if (/gsm|umts|mobile|sim|subscriber/.test(text)) return 'mobile'
  // Avoid matching eID "Card" / "identity card" as payment.
  if (/\b(payment|emv|pos|atm|bank|stripe|chip.?card|magnetic.?stripe)\b/.test(text)) return 'payment'
  if (/hash|hmac|birthday|collision|crc|tiger|digest/.test(text)) return 'hash'
  if (/auth|password|fresh|nonce|replay|zero.?knowledge/.test(text)) return 'auth'
  if (/firewall|ids|ips|packet.?filter|perimeter/.test(text)) return 'attack'
  if (/hsm|revocation|key.?hierarch|key.?lifecycle|key.?management|certificate.?chain/.test(text)) return 'key'
  if (/certificate|pki/.test(text) && !/tls|ssl|handshake/.test(text)) return 'key'
  // Generic attack words last — never alone force FirewallEngine.
  if (/\b(mitm|replay|phishing|malware|eavesdrop|brute.?force|dos|flood)\b/.test(text)) return 'attack'
  return 'default'
}

export function CyberMissionScene({ kind = 'default', labels = ['Alice', 'Internet', 'Firewall', 'Bob Server'], attack = false }) {
  const nodes = labels.slice(0, 4)
  const IconSet = [UserRound, Router, ShieldCheck, Server]
  return (
    <div className={`ins-mission-scene scene-${kind} ${attack ? 'under-attack' : ''}`.trim()} aria-label="Animated security workflow">
      <svg className="ins-mission-lines" viewBox="0 0 900 360" role="img" aria-label="Alice, Internet, Firewall and server security path">
        <defs>
          <linearGradient id={`secure-line-${kind}`} x1="0%" x2="100%">
            <stop offset="0%" stopColor="#2563eb" />
            <stop offset="58%" stopColor="#0ea5a4" />
            <stop offset="100%" stopColor="#0f766e" />
          </linearGradient>
          <filter id={`soft-glow-${kind}`} x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>
        <path className="secure-path" d="M110 180 C250 90 330 92 450 180 S650 270 790 180" stroke={`url(#secure-line-${kind})`} />
        <path className="attack-path" d="M450 42 C490 92 492 130 466 178" />
        <circle className="packet packet-one" r="9"><animateMotion dur="4.8s" repeatCount="indefinite" path="M110 180 C250 90 330 92 450 180 S650 270 790 180" /></circle>
        <circle className="packet packet-two" r="7"><animateMotion dur="4.8s" begin="1.6s" repeatCount="indefinite" path="M110 180 C250 90 330 92 450 180 S650 270 790 180" /></circle>
        <circle className="packet packet-attack" r="8"><animateMotion dur="3.2s" repeatCount="indefinite" path="M450 42 C490 92 492 130 466 178" /></circle>
      </svg>
      <div className="ins-node-row">
        {nodes.map((node, i) => {
          const NodeIcon = IconSet[i] || Server
          return (
            <article key={`${node}-${i}`} className={i === 2 ? 'defense-node' : i === 3 ? 'safe-node' : ''}>
              <NodeIcon {...icon} />
              <strong>{node}</strong>
              <span>{i === 0 ? 'sender' : i === 1 ? 'network' : i === 2 ? 'inspection' : 'receiver'}</span>
            </article>
          )
        })}
      </div>
      <div className="ins-attacker-card">
        <ShieldAlert {...icon} />
        <strong>Eve</strong>
        <span>{attack ? 'active attack blocked' : 'watching the channel'}</span>
      </div>
    </div>
  )
}

export function SecurityTeachingFrame({
  id,
  section,
  title,
  lead,
  items = [],
  visual,
  takeaway,
  example,
  attack = false,
  compose = 'standard',
  beat,
  metaphor,
  annotations = [],
  peak = false,
}) {
  const kind = pickScenario(id, section, title)
  const visibleItems = items.slice(0, 5)
  const baseVisual = visual || <CyberMissionScene kind={kind} attack={attack || kind === 'attack'} />
  const framedVisual = (beat || metaphor || peak || compose === 'hero')
    ? (
      <InsHeroScene beat={beat} metaphor={metaphor} annotations={annotations} peak={peak || compose === 'hero'}>
        {baseVisual}
      </InsHeroScene>
      )
    : baseVisual
  return (
    <div className={`ins-teaching-frame compose-${compose}`}>
      <div className="ins-teaching-copy">
        <Lead>{lead}</Lead>
        {compose !== 'hero' && compose !== 'quiet' && compose !== 'visual-lead' && (
          <div className="ins-why-how">
            <article><strong>Why needed</strong><span>{scenarioText[kind]}</span></article>
            <article><strong>How it works</strong><span>{visibleItems.join(' -> ')}</span></article>
          </div>
        )}
        {visibleItems.length > 0 && (
          <ul className="insx-reveal-list always-visible">
            {visibleItems.map((item) => <li key={item} className="visible">{item}</li>)}
          </ul>
        )}
        <aside className="ins-example"><strong>Real-world example</strong><span>{example || scenarioText[kind]}</span></aside>
      </div>
      <div className="ins-teaching-visual">
        {framedVisual}
      </div>
      <Takeaway>{takeaway || 'Exam takeaway: name the threat, draw the workflow, then explain the security mechanism that stops it.'}</Takeaway>
    </div>
  )
}

export function AttackDefenseBoard({ steps = ['Attack packet', 'Inspection', 'Decision', 'Secure response'], blocked = true }) {
  return (
    <div className="ins-attack-board">
      {steps.slice(0, 5).map((step, i) => (
        <article key={step} className={i === 0 ? 'threat' : i === steps.length - 1 ? 'secure' : ''}>
          {i === 0 ? <XCircle {...icon} /> : i === steps.length - 1 ? <CheckCircle2 {...icon} /> : <FileCheck2 {...icon} />}
          <strong>{step}</strong>
          <span>{i === 0 ? 'Eve attempts misuse' : i === steps.length - 1 ? (blocked ? 'accepted safely' : 'verified') : 'evidence checked'}</span>
        </article>
      ))}
      <i className="attack-board-packet" aria-hidden="true" />
    </div>
  )
}

export function KeyExchangeScene({ labels = ['Alice public key', 'Certificate', 'Shared secret', 'Encrypted data'] }) {
  return (
    <div className="ins-key-scene">
      <CyberMissionScene kind="tls" labels={['Browser', 'Internet', 'CA / Firewall', 'Server']} />
      <div className="ins-key-strip">
        {labels.map((label, i) => (
          <span key={label} className={i === labels.length - 1 ? 'secure' : ''}>
            {i < 2 ? <KeyRound {...icon} /> : i === 2 ? <LockKeyhole {...icon} /> : <Database {...icon} />}
            {label}
          </span>
        ))}
      </div>
    </div>
  )
}

export function WirelessScene() {
  return <CyberMissionScene kind="wlan" labels={['Station', 'Radio air', 'Access Point', 'Campus LAN']} attack />
}

export function HashFingerprintScene() {
  return <CyberMissionScene kind="hash" labels={['Message', 'Hash box', 'Digest check', 'Bob']} />
}

export function AuthChallengeScene() {
  return <CyberMissionScene kind="auth" labels={['Alice', 'Nonce', 'Verifier', 'Bob']} attack />
}

export function PaymentScene() {
  return <CyberMissionScene kind="payment" labels={['Card', 'Terminal', 'Bank Switch', 'Issuer']} />
}

export function MobileScene() {
  return <CyberMissionScene kind="mobile" labels={['Phone/SIM', 'Base Station', 'Home Network', 'Session Key']} />
}

export function NetworkOpsScene() {
  return <CyberMissionScene kind="attack" labels={['Client', 'Router', 'Firewall/IDS', 'Server']} attack />
}

/* Topics that now have a full living-architecture scene (InsSecurityViz) which
   stands on its own — the applied-module StoryCards become redundant for these
   and are dropped so the taller SVG fits without clipping. Extend as more
   scenes are wired in. */
export function isRichSecurityViz(id, section, title) {
  if (visualForSlide(id)) return true
  const kind = pickScenario(id, section, title)
  return kind === 'tls' || kind === 'attack'
}

/** Prefer concept-specific teaching scene; fall back to scenario router. */
export function pickVisualForTopic(id, section, title) {
  const taught = visualForSlide(id)
  if (taught) return taught
  const kind = pickScenario(id, section, title)
  if (kind === 'tls') {
    // Stage-aware fallback when id is a known TLS peak without registry entry
    if (/full-handshake|tls-full/.test(id)) return <TlsHandshake stage="full" />
    if (/client-hello|clienthello/.test(id)) return <TlsHandshake stage="clientHello" />
    if (/server-hello|serverhello/.test(id)) return <TlsHandshake stage="serverHello" />
    if (/cert-validation|certificate/.test(id)) return <TlsHandshake stage="certificate" />
    if (/premaster|key.?exchange/.test(id)) return <TlsHandshake stage="keyExchange" />
    if (/finished/.test(id)) return <TlsHandshake stage="finished" />
    if (/record-verify/.test(id)) return <TlsHandshake stage="record" />
    if (/record/.test(id)) return <TlsHandshake stage="record" />
    if (/mutual/.test(id)) return <TlsHandshake stage="mutual" />
    if (/why|background|overview/.test(id)) return <TlsHandshake stage="overview" />
    return <TlsHandshake stage="full" />
  }
  if (kind === 'wlan') return <WirelessScene />
  if (kind === 'mobile') return <MobileScene />
  if (kind === 'payment') return <PaymentScene />
  if (kind === 'hash') return <HashFingerprintScene />
  if (kind === 'auth') return <AuthChallengeScene />
  // Do NOT route generic "threat" keywords to FirewallEngine — that caused
  // home-threat / eid mis-attachments. Prefer CyberMissionScene unless explicit.
  if (kind === 'attack' && /firewall|ids|ips|perimeter|packet.?filter/i.test(`${id} ${title}`)) {
    return <FirewallEngine />
  }
  if (kind === 'attack') return <CyberMissionScene kind="attack" attack />
  if (kind === 'key') return <KeyExchangeScene labels={['Generate', 'Store', 'Use / rotate', 'Destroy / certify']} />
  return <CyberMissionScene />
}
