/**
 * InsSecurityViz — reusable living SVG security architectures (INS, all modules).
 *
 * Phase 2 of the "Premium White Cybersecurity" flagship. Companion CSS:
 * src/insViz.css (.iv-* vocabulary). Same rules as HadoopViz:
 *   - Structure is ALWAYS painted; only packets / links / scans / rings / meters
 *     animate, so a frozen frame still reads correctly.
 *   - Every moving element teaches (packet = traffic, dash = live channel, scan =
 *     rule/cert evaluation, ring = verification, red flash = block/attack, gold
 *     lock = encrypted traffic, meter = a live statistic). No decorative spin.
 *   - Pure SVG + CSS/SMIL, no JS state → animations restart cleanly when App.jsx
 *     remounts the slide (replayKey) on revisit. Reduced-motion drops motion-only
 *     layers (see insViz.css) and keeps the full static architecture.
 *
 * Exports fall in three tiers:
 *   1. Primitives:  IvDefs, SecurityPacket, DataStream, SecureTunnel, TrustBadge,
 *                   VerificationPulse.
 *   2. Glass glyphs (parameterized, floating): GlassServer, SecurityShield, Lock,
 *      Certificate, Cloud, Router, BrowserClient, Phone, Key, EncryptionCube,
 *      NetworkNode, ThreatActor, CertificateAuthority.
 *   3. Scenes:  FirewallEngine, TlsHandshake, RsaFlow, DigitalSignature,
 *      PkiChain / CertificateChain, AuthenticationFlow.
 */

const T = { fontFamily: 'inherit' }

/* ===========================================================================
   Shared defs — arrow markers, gradients, soft glows
   ======================================================================== */
export function IvDefs() {
  return (
    <defs>
      <marker id="ivArrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6.5" markerHeight="6.5" orient="auto-start-reverse">
        <path d="M0 0 L10 5 L0 10 z" fill="#9fb2cf" />
      </marker>
      <marker id="ivArrowBlue" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6.5" markerHeight="6.5" orient="auto-start-reverse">
        <path d="M0 0 L10 5 L0 10 z" fill="#1f6bff" />
      </marker>
      <linearGradient id="ivSecure" x1="0%" x2="100%">
        <stop offset="0%" stopColor="#1f6bff" />
        <stop offset="55%" stopColor="#06b6d4" />
        <stop offset="100%" stopColor="#10b981" />
      </linearGradient>
      <linearGradient id="ivTunnelGrad" x1="0%" x2="100%">
        <stop offset="0%" stopColor="#1f6bff" />
        <stop offset="100%" stopColor="#10b981" />
      </linearGradient>
      <linearGradient id="ivGlass" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#ffffff" />
        <stop offset="100%" stopColor="#eef4fc" />
      </linearGradient>
    </defs>
  )
}

/* ---------------------------------------------------------------------------
   SecurityPacket — a unit of traffic travelling a (curved) path via SMIL.
   `win`+`period` drive a single master-timeline slice (holds at start, moves
   during the window, holds at end) so a scene can sequence many packets on one
   looping clock. Otherwise it loops on its own dur/delay.
   ------------------------------------------------------------------------- */
export function SecurityPacket({
  path, r = 6, color = 'var(--iv-blue)', dur = 3, delay = 0,
  square = false, dissolve = false, win = null, period = null,
}) {
  const useWin = win && period
  const d = useWin ? period : dur
  const begin = `${delay}s`
  const motion = useWin
    ? { keyPoints: `0;0;1;1`, keyTimes: `0;${win[0]};${win[1]};1`, calcMode: 'linear' }
    : {}
  // opacity envelope
  let oVals, oTimes
  if (useWin) {
    const a = win[0], b = win[1]
    oVals = '0;0;1;1;0'
    oTimes = `0;${Math.max(0, a - 0.01)};${a + 0.01};${b - 0.01};${b}`
  } else if (dissolve) {
    oVals = '0;1;1;0'; oTimes = '0;0.16;0.72;0.9'
  } else {
    oVals = '0;1;1;0'; oTimes = '0;0.12;0.85;1'
  }
  const common = { dur: `${d}s`, begin, repeatCount: 'indefinite' }
  return square
    ? (
      <rect className="iv-anim" x={-r} y={-r} width={r * 2} height={r * 2} rx="2" fill={color}>
        <animateMotion path={path} {...common} {...motion} />
        <animate attributeName="opacity" values={oVals} keyTimes={oTimes} {...common} />
      </rect>
    )
    : (
      <circle className="iv-anim" cx="0" cy="0" r={r} fill={color}>
        <animateMotion path={path} {...common} {...motion} />
        <animate attributeName="opacity" values={oVals} keyTimes={oTimes} {...common} />
      </circle>
    )
}

/* DataStream — a row of packets flowing along a path (throughput feel). */
export function DataStream({ path, count = 3, color = 'var(--iv-cyan)', dur = 3, r = 5, square = true }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <SecurityPacket key={i} path={path} color={color} dur={dur} delay={(i * dur) / count} r={r} square={square} />
      ))}
    </>
  )
}

/* SecureTunnel — an encrypted channel that literally draws itself, then carries
   locked traffic. period keeps it on the scene clock. */
export function SecureTunnel({ x1, y1, x2, y2, h = 26, period = 6, label = 'Encrypted Tunnel' }) {
  const len = Math.hypot(x2 - x1, y2 - y1)
  const midX = (x1 + x2) / 2
  return (
    <g>
      <rect className="iv-box" x={x1} y={y1 - h / 2} width={x2 - x1} height={h} rx={h / 2} fill="#f2fbff" stroke="#bfe6f2" />
      <line className="iv-tunnel iv-s-cyan" x1={x1 + 6} y1={y1} x2={x2 - 6} y2={y1}
        style={{ '--len': len, '--dur': `${period}s`, strokeWidth: 3, strokeLinecap: 'round' }} />
      <SecurityPacket path={`M${x1 + 10},${y1} L${x2 - 10},${y1}`} color="var(--iv-emerald)" dur={period * 0.5} square r={5} />
      <SecurityPacket path={`M${x2 - 10},${y1} L${x1 + 10},${y1}`} color="var(--iv-blue)" dur={period * 0.5} delay={period * 0.25} square r={5} />
      {label && <text className="iv-sub" x={midX} y={y1 - h / 2 - 7} textAnchor="middle" fontSize="11.5" style={T}>🔒 {label}</text>}
    </g>
  )
}

/* VerificationPulse — an emerald ring that confirms a check succeeded. */
export function VerificationPulse({ x, y, r = 22, delay = 0, dur = 2.8 }) {
  return <circle className="iv-verify" cx={x} cy={y} r={r} style={{ '--delay': `${delay}s`, '--dur': `${dur}s` }} />
}

/* TrustBadge — a small check/shield chip that turns emerald when trust holds. */
export function TrustBadge({ x, y, on = true, label = 'Verified' }) {
  const c = on ? 'var(--iv-emerald)' : 'var(--iv-muted)'
  return (
    <g transform={`translate(${x},${y})`}>
      <circle cx="0" cy="0" r="11" fill={on ? '#eefaf4' : '#f1f4f9'} stroke={c} strokeWidth="1.6" />
      <path d="M-4.5 0 L-1 3.6 L5 -4" fill="none" stroke={c} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      {label && <text className="iv-sub" x="18" y="4" fontSize="11" style={T} fill={c}>{label}</text>}
    </g>
  )
}

/* ===========================================================================
   Glass glyphs — floating, parameterized 3D-ish objects. Each renders a glass
   tile + line icon and (optionally) a gentle bob + label. Reused across scenes
   and (later) module openings. Icons drawn in a 0..36 local box.
   ======================================================================== */
function Tile({ x, y, w = 92, h = 78, tone = '', children, bob = false, delay = 0, label, sub, glow }) {
  const cls = `iv-box ${tone}`.trim()
  return (
    <g className={bob ? 'iv-bob' : ''} style={bob ? { '--delay': `${delay}s` } : undefined}>
      {glow && <rect x={x - 2} y={y - 2} width={w + 4} height={h + 4} rx="16" fill="none" stroke={glow} strokeWidth="2" opacity="0.28" className="iv-pulse" />}
      <rect className={cls} x={x} y={y} width={w} height={h} rx="14" />
      <g transform={`translate(${x + w / 2 - 18}, ${y + 10})`}>{children}</g>
      {label && <text className="iv-title" x={x + w / 2} y={y + h - 16} textAnchor="middle" fontSize="12.5" style={T}>{label}</text>}
      {sub && <text className="iv-sub" x={x + w / 2} y={y + h - 3} textAnchor="middle" fontSize="9.5" style={T}>{sub}</text>}
    </g>
  )
}

const stroke = (c, extra = {}) => ({ fill: 'none', stroke: c, strokeWidth: 1.9, strokeLinecap: 'round', strokeLinejoin: 'round', ...extra })

function LockIcon({ c = 'var(--iv-blue)', open = false }) {
  return (
    <g className="iv-breathe">
      <rect x="6" y="16" width="24" height="18" rx="3.5" {...stroke(c)} />
      <path d={open ? 'M11 16 v-4 a7 7 0 0 1 13 -2' : 'M11 16 v-5 a7 7 0 0 1 14 0 v5'} {...stroke(c)} />
      <circle cx="18" cy="24" r="2.4" fill={c} />
    </g>
  )
}
function ShieldIcon({ c = 'var(--iv-emerald)' }) {
  return (
    <g className="iv-breathe">
      <path d="M18 4 L31 9 V19 C31 27 25 32 18 35 C11 32 5 27 5 19 V9 Z" {...stroke(c)} />
      <path d="M12 18 L16.5 23 L25 13" {...stroke(c, { strokeWidth: 2.2 })} />
    </g>
  )
}
function CertIcon({ c = 'var(--iv-blue)' }) {
  return (
    <g>
      <rect x="6" y="4" width="24" height="26" rx="3" {...stroke(c)} />
      <line x1="10" y1="11" x2="26" y2="11" {...stroke(c, { strokeWidth: 1.5 })} />
      <line x1="10" y1="16" x2="26" y2="16" {...stroke(c, { strokeWidth: 1.5 })} />
      <line x1="10" y1="21" x2="20" y2="21" {...stroke(c, { strokeWidth: 1.5 })} />
      <circle cx="25" cy="27" r="6" fill="#fff7ea" stroke={c} strokeWidth="1.6" />
      <path d="M25 24 l1.6 3.2 l-3.2 0 z" fill={c} />
    </g>
  )
}
function ServerIcon({ c = 'var(--iv-blue)' }) {
  return (
    <g>
      <rect x="6" y="6" width="24" height="10" rx="2.4" {...stroke(c)} />
      <rect x="6" y="19" width="24" height="10" rx="2.4" {...stroke(c)} />
      <circle className="iv-led iv-f-emerald" cx="11" cy="11" r="1.8" />
      <circle className="iv-led iv-f-emerald" cx="11" cy="24" r="1.8" style={{ '--delay': '0.6s' }} />
      <line x1="17" y1="11" x2="26" y2="11" {...stroke(c, { strokeWidth: 1.4 })} />
      <line x1="17" y1="24" x2="26" y2="24" {...stroke(c, { strokeWidth: 1.4 })} />
    </g>
  )
}
function CloudIcon({ c = 'var(--iv-muted)' }) {
  return <g><path d="M11 27 a7 7 0 0 1 0 -14 a9 9 0 0 1 17 3 a6 6 0 0 1 -1 11 Z" {...stroke(c)} /></g>
}
function RouterIcon({ c = 'var(--iv-blue)' }) {
  return (
    <g>
      <rect x="5" y="20" width="26" height="12" rx="2.6" {...stroke(c)} />
      <circle className="iv-led iv-f-emerald" cx="10" cy="26" r="1.6" />
      <circle className="iv-led iv-f-cyan" cx="15" cy="26" r="1.6" style={{ '--delay': '0.5s' }} />
      <path d="M18 16 l5 -6 M22 20 l9 -11" {...stroke(c, { strokeWidth: 1.6 })} />
    </g>
  )
}
function BrowserIcon({ c = 'var(--iv-blue)' }) {
  return (
    <g>
      <rect x="5" y="6" width="26" height="22" rx="3" {...stroke(c)} />
      <line x1="5" y1="13" x2="31" y2="13" {...stroke(c, { strokeWidth: 1.5 })} />
      <circle cx="9" cy="9.5" r="1.2" fill={c} /><circle cx="13" cy="9.5" r="1.2" fill={c} />
      <rect x="9" y="17" width="18" height="3" rx="1.5" fill="#e6eefb" />
    </g>
  )
}
function PhoneIcon({ c = 'var(--iv-blue)' }) {
  return (
    <g>
      <rect x="10" y="4" width="16" height="28" rx="3.4" {...stroke(c)} />
      <line x1="15" y1="8" x2="21" y2="8" {...stroke(c, { strokeWidth: 1.5 })} />
      <circle cx="18" cy="28" r="1.6" fill={c} />
    </g>
  )
}
function KeyIcon({ c = 'var(--iv-amber)' }) {
  return (
    <g className="iv-breathe">
      <circle cx="12" cy="18" r="7" {...stroke(c)} />
      <path d="M19 18 H32 M27 18 V24 M31 18 V23" {...stroke(c)} />
      <circle cx="12" cy="18" r="2.2" fill={c} />
    </g>
  )
}
function CubeIcon({ c = 'var(--iv-purple)' }) {
  return (
    <g className="iv-bob" style={{ '--dur': '4.5s' }}>
      <path d="M18 4 L31 11 L18 18 L5 11 Z" fill="#efeaff" stroke={c} strokeWidth="1.7" strokeLinejoin="round" />
      <path d="M5 11 L18 18 L18 33 L5 26 Z" fill="#e3daff" stroke={c} strokeWidth="1.7" strokeLinejoin="round" />
      <path d="M31 11 L18 18 L18 33 L31 26 Z" fill="#d7cbff" stroke={c} strokeWidth="1.7" strokeLinejoin="round" />
    </g>
  )
}
function UserIcon({ c = 'var(--iv-blue)' }) {
  return <g><circle cx="18" cy="12" r="6" {...stroke(c)} /><path d="M7 32 a11 11 0 0 1 22 0" {...stroke(c)} /></g>
}
function ThreatIcon({ c = 'var(--iv-red)' }) {
  return (
    <g className="iv-breathe">
      <path d="M18 5 L32 30 H4 Z" fill="#fdecec" stroke={c} strokeWidth="1.9" strokeLinejoin="round" />
      <line x1="18" y1="15" x2="18" y2="23" {...stroke(c, { strokeWidth: 2.2 })} />
      <circle cx="18" cy="27" r="1.5" fill={c} />
    </g>
  )
}
function DocIcon({ c = 'var(--iv-body)' }) {
  return (
    <g>
      <path d="M9 4 H23 L29 10 V32 H9 Z" {...stroke(c)} />
      <path d="M23 4 V10 H29" {...stroke(c, { strokeWidth: 1.5 })} />
      <line x1="13" y1="16" x2="25" y2="16" {...stroke(c, { strokeWidth: 1.4 })} />
      <line x1="13" y1="21" x2="25" y2="21" {...stroke(c, { strokeWidth: 1.4 })} />
      <line x1="13" y1="26" x2="21" y2="26" {...stroke(c, { strokeWidth: 1.4 })} />
    </g>
  )
}

/* Public composable glass objects (compose Tile + icon). */
export const GlassServer = (p) => <Tile {...p}><ServerIcon c={p.color} /></Tile>
export const SecurityShield = (p) => <Tile {...p}><ShieldIcon c={p.color} /></Tile>
export const Lock = (p) => <Tile {...p}><LockIcon c={p.color} open={p.open} /></Tile>
export const Certificate = (p) => <Tile {...p}><CertIcon c={p.color} /></Tile>
export const Cloud = (p) => <Tile {...p}><CloudIcon c={p.color} /></Tile>
export const Router = (p) => <Tile {...p}><RouterIcon c={p.color} /></Tile>
export const BrowserClient = (p) => <Tile {...p}><BrowserIcon c={p.color} /></Tile>
export const Phone = (p) => <Tile {...p}><PhoneIcon c={p.color} /></Tile>
export const Key = (p) => <Tile {...p}><KeyIcon c={p.color} /></Tile>
export const EncryptionCube = (p) => <Tile {...p}><CubeIcon c={p.color} /></Tile>
export const NetworkNode = (p) => <Tile {...p}><UserIcon c={p.color} /></Tile>
export const ThreatActor = (p) => <Tile {...p} tone="alert"><ThreatIcon c={p.color} /></Tile>
export const CertificateAuthority = (p) => <Tile {...p} tone="soft"><ShieldIcon c={p.color || 'var(--iv-blue)'} /></Tile>

/* ===========================================================================
   PRIORITY 1 — FIREWALL ENGINE
   Traffic approaches → rules are evaluated (scan sweep) → good packets pass to
   the protected server, malicious packets dissolve at the membrane, suspicious
   packets are diverted to quarantine. Live meters update. No static arrows.
   ======================================================================== */
export function FirewallEngine({ mode = 'firewall' } = {}) {
  const isPacket = mode === 'packet'
  const isIds = mode === 'ids'
  const isIps = mode === 'ips'
  const rules = isPacket
    ? [
      { t: 'SRC  any', c: 'var(--iv-blue)' },
      { t: 'DST  server', c: 'var(--iv-cyan)' },
      { t: 'PORT 443/tcp', c: 'var(--iv-emerald)' },
      { t: 'ACTION allow', c: 'var(--iv-emerald)' },
    ]
    : [
      { t: 'ALLOW 443/tcp', c: 'var(--iv-emerald)' },
      { t: 'ALLOW 80/tcp', c: 'var(--iv-emerald)' },
      { t: isIds ? 'ALERT exploit' : isIps ? 'DROP  exploit' : 'DENY  telnet 23', c: 'var(--iv-red)' },
      { t: isIds ? 'LOG + allow' : 'INSPECT  *', c: 'var(--iv-amber)' },
    ]
  const fwX = 258, fwW = 104, srcX = 96, srvX = 560
  // paths
  const good = (y) => `M${srcX},${y} C170,${y} 210,180 ${fwX},180 S470,180 ${srvX - 8},180`
  const bad = (y) => `M${srcX},${y} C180,${y} 220,${y} ${fwX - 4},180`
  const susp = `M${srcX},210 C180,210 220,210 ${fwX - 4},210 C${fwX + 40},240 ${fwX + 60},320 500,352`
  return (
    <svg className="iv-svg" viewBox="0 0 640 430" role="img" aria-label="Firewall inspecting traffic: good packets pass, malicious packets blocked, suspicious packets quarantined">
      <IvDefs />

      {/* source */}
      <Cloud x={20} y={150} w={92} h={70} label="Traffic" sub="clients + attackers" color="var(--iv-muted)" bob delay={0.2} />

      {/* good / bad / suspicious flows */}
      <SecurityPacket path={good(150)} color="var(--iv-blue)" dur={3.2} r={6} square />
      <SecurityPacket path={good(180)} color="var(--iv-emerald)" dur={3.2} delay={1.1} r={6} square />
      <SecurityPacket path={good(210)} color="var(--iv-blue)" dur={3.2} delay={2.1} r={6} square />
      <SecurityPacket path={isIds ? good(120) : bad(120)} color="var(--iv-red)" dur={2.6} delay={0.6} r={6} square dissolve={!isIds} />
      <SecurityPacket path={isIds ? good(250) : bad(250)} color="var(--iv-red)" dur={2.6} delay={1.9} r={6} square dissolve={!isIds} />
      <SecurityPacket path={susp} color="var(--iv-amber)" dur={3.4} delay={1.3} r={6} square dissolve />

      {/* block flashes at the membrane */}
      {!isIds && (
        <>
          <g transform={`translate(${fwX - 4},120)`}><path className="iv-block" d="M-7 -7 L7 7 M7 -7 L-7 7" stroke="var(--iv-red)" strokeWidth="3" strokeLinecap="round" style={{ '--delay': '0.6s', '--dur': '2.6s' }} /></g>
          <g transform={`translate(${fwX - 4},250)`}><path className="iv-block" d="M-7 -7 L7 7 M7 -7 L-7 7" stroke="var(--iv-red)" strokeWidth="3" strokeLinecap="round" style={{ '--delay': '1.9s', '--dur': '2.6s' }} /></g>
        </>
      )}

      {/* firewall slab */}
      <rect className="iv-box soft" x={fwX} y="36" width={fwW} height="300" rx="16" />
      <rect x={fwX} y="36" width={fwW} height="34" rx="16" fill="url(#ivSecure)" opacity="0.16" />
      <g transform={`translate(${fwX + 12},44)`}><ShieldIcon c="var(--iv-blue)" /></g>
      <text className="iv-title" x={fwX + fwW / 2 + 8} y="58" textAnchor="middle" fontSize="13" style={T}>FIREWALL</text>
      {/* rules */}
      {rules.map((r, i) => {
        const ry = 86 + i * 40
        return (
          <g key={r.t}>
            <rect className="iv-box" x={fwX + 12} y={ry} width={fwW - 24} height="30" rx="7" />
            <circle cx={fwX + 24} cy={ry + 15} r="3.4" fill={r.c} />
            <text className="iv-label" x={fwX + 34} y={ry + 19} fontSize="10.5" style={T}>{r.t}</text>
          </g>
        )
      })}
      {/* rule-evaluation scan sweep */}
      <rect className="iv-scan" x={fwX + 10} y="84" width={fwW - 20} height="30" rx="7" fill="url(#ivSecure)" opacity="0.5"
        style={{ '--scan': '124px', '--dur': '3.4s' }} />

      {/* protected server */}
      <GlassServer x={srvX - 8} y={150} w={92} h={78} tone="trust" label="Protected" sub="server zone" color="var(--iv-emerald)" glow="var(--iv-emerald)" />

      {(isIds || isIps || isPacket) && (
        <g transform="translate(390,82)">
          <rect className={`iv-box ${isIps ? 'alert' : 'soft'}`} x="0" y="0" width="184" height="46" rx="10" />
          <text className="iv-title" x="92" y="20" textAnchor="middle" fontSize="11.5" style={T}>
            {isIds ? 'IDS alert: allow traffic' : isIps ? 'IPS inline: block threat' : 'Rule fields inspected'}
          </text>
          <text className="iv-sub" x="92" y="35" textAnchor="middle" fontSize="9.5" style={T}>
            {isPacket ? 'src + dst + port + action' : 'detect suspicious packet'}
          </text>
        </g>
      )}

      {/* quarantine */}
      <rect className="iv-box warn" x="440" y="336" width="150" height="64" rx="12" />
      <g transform="translate(452,346)"><LockIcon c="var(--iv-amber)" /></g>
      <text className="iv-title" x="530" y="362" textAnchor="middle" fontSize="12" style={T}>Quarantine</text>
      <text className="iv-sub" x="530" y="378" textAnchor="middle" fontSize="10" style={T}>held for review</text>

      {/* live statistics */}
      <g transform="translate(20,244)">
        {[
          { t: 'Allowed', c: 'var(--iv-emerald)', d: 0 },
          { t: 'Blocked', c: 'var(--iv-red)', d: 0.5 },
          { t: 'Quarantined', c: 'var(--iv-amber)', d: 1 },
        ].map((s, i) => (
          <g key={s.t} transform={`translate(0,${i * 40})`}>
            <text className="iv-sub" x="0" y="10" fontSize="10.5" style={T}>{s.t}</text>
            <rect x="0" y="16" width="150" height="9" rx="4.5" fill="#eaf0f9" />
            <rect className="iv-meter-fill" x="0" y="16" width="150" height="9" rx="4.5" fill={s.c} style={{ '--delay': `${s.d}s`, '--dur': '4s' }} />
            <circle className="iv-tick" cx="164" cy="20.5" r="4" fill={s.c} style={{ '--delay': `${s.d}s`, '--dur': '2.6s' }} />
          </g>
        ))}
      </g>
    </svg>
  )
}

/* ===========================================================================
   PRIORITY 2 — TLS HANDSHAKE
   A cinematic sequence ladder on one looping clock: ClientHello → ServerHello →
   Certificate → validation → Key Exchange → Finished, then the encrypted tunnel
   forms and secure (locked) traffic flows. Messages ride curved paths.
   ======================================================================== */
export function TlsHandshake({ stage = 'full' } = {}) {
  const cx = 118, sx = 522, P = 12
  const bow = (y, dir) => dir === 'cs'
    ? `M${cx},${y} C${cx + 130},${y - 26} ${sx - 130},${y - 26} ${sx},${y}`
    : `M${sx},${y} C${sx - 130},${y - 26} ${cx + 130},${y - 26} ${cx},${y}`
  const steps = [
    { id: 'clientHello', y: 150, dir: 'cs', label: 'ClientHello', sub: 'cipher suites, random', c: 'var(--iv-blue)', win: [0.02, 0.16] },
    { id: 'serverHello', y: 194, dir: 'sc', label: 'ServerHello', sub: 'chosen suite, random', c: 'var(--iv-cyan)', win: [0.18, 0.32] },
    { id: 'certificate', y: 238, dir: 'sc', label: 'Certificate', sub: 'server public key', c: 'var(--iv-blue)', win: [0.34, 0.48], cert: true },
    { id: 'keyExchange', y: 292, dir: 'cs', label: 'Key Exchange', sub: 'pre-master secret 🔒', c: 'var(--iv-amber)', win: [0.56, 0.70], key: true },
    { id: 'finished', y: 336, dir: 'cs', label: 'Finished', sub: 'transcript MAC', c: 'var(--iv-emerald)', win: [0.72, 0.84] },
  ]
  const spotlight = ['clientHello', 'serverHello', 'certificate', 'keyExchange', 'finished'].includes(stage)
  const isOverview = stage === 'overview'
  const isRecord = stage === 'record'
  const isMutual = stage === 'mutual'

  if (isOverview) {
    return (
      <svg className="iv-svg" viewBox="0 0 640 300" role="img" aria-label="TLS overview: client and server communicate through a secure channel">
        <IvDefs />
        <BrowserClient x={cx - 46} y={54} w={92} h={78} label="Client" sub="browser" color="var(--iv-blue)" bob delay={0.1} />
        <GlassServer x={sx - 46} y={54} w={92} h={78} label="Server" sub="https site" color="var(--iv-blue)" bob delay={0.7} />
        <SecureTunnel x1={cx} y1={182} x2={sx} y2={182} h={42} period={6} label="Secure Channel" />
        <g transform="translate(292,126)"><LockIcon c="var(--iv-emerald)" /></g>
        <text className="iv-sub" x="320" y="232" textAnchor="middle" fontSize="11" style={T}>TLS hides application data from observers</text>
      </svg>
    )
  }

  if (isRecord) {
    return (
      <svg className="iv-svg" viewBox="0 0 640 360" role="img" aria-label="TLS record: application data is encrypted into TLS records after the secure tunnel is formed">
        <IvDefs />
        <BrowserClient x={cx - 46} y={24} w={92} h={78} label="Client" sub="browser" color="var(--iv-blue)" bob delay={0.1} />
        <GlassServer x={sx - 46} y={24} w={92} h={78} label="Server" sub="https site" color="var(--iv-blue)" bob delay={0.7} />
        <SecureTunnel x1={cx} y1={132} x2={sx} y2={132} h={28} period={6} label="Encrypted Tunnel · Session Ready" />

        <Tile x={62} y={214} w={120} h={86}><DocIcon c="var(--iv-blue)" /></Tile>
        <text className="iv-title" x="122" y="276" textAnchor="middle" fontSize="11.5" style={T}>Application Data</text>
        <Tile x={260} y={204} w={120} h={96} tone="soft"><LockIcon c="var(--iv-amber)" /></Tile>
        <text className="iv-title" x="320" y="274" textAnchor="middle" fontSize="11.5" style={T}>Encrypt</text>
        <text className="iv-sub" x="320" y="288" textAnchor="middle" fontSize="9.5" style={T}>session key</text>
        <Tile x={458} y={214} w={120} h={86} tone="trust"><CertIcon c="var(--iv-emerald)" /></Tile>
        <text className="iv-title" x="518" y="276" textAnchor="middle" fontSize="11.5" style={T}>TLS Record</text>
        <Arrow x1={182} y1={257} x2={260} y2={257} blue />
        <Arrow x1={380} y1={257} x2={458} y2={257} blue />
        <SecurityPacket path="M182,257 L260,257" color="var(--iv-blue)" dur={2.2} square r={6} />
        <SecurityPacket path="M380,257 L458,257" color="var(--iv-emerald)" dur={2.2} delay={0.9} square r={6} />
      </svg>
    )
  }

  if (isMutual) {
    return (
      <svg className="iv-svg" viewBox="0 0 640 390" role="img" aria-label="Mutual TLS: client and server both present certificates before a secure channel is formed">
        <IvDefs />
        <BrowserClient x={cx - 46} y={24} w={92} h={78} label="Client" sub="browser" color="var(--iv-blue)" bob delay={0.1} />
        <GlassServer x={sx - 46} y={24} w={92} h={78} label="Server" sub="api / service" color="var(--iv-blue)" bob delay={0.7} />
        <Certificate x={60} y={150} w={116} h={86} tone="soft" label="Client Cert" sub="proves client" color="var(--iv-cyan)" />
        <Certificate x={464} y={150} w={116} h={86} tone="soft" label="Server Cert" sub="proves server" color="var(--iv-blue)" />
        <path className="iv-conn" d="M176,188 C260,152 380,152 464,188" markerEnd="url(#ivArrowBlue)" />
        <path className="iv-conn" d="M464,216 C380,252 260,252 176,216" markerEnd="url(#ivArrow)" />
        <SecurityPacket path="M176,188 C260,152 380,152 464,188" color="var(--iv-cyan)" dur={3} square r={6} />
        <SecurityPacket path="M464,216 C380,252 260,252 176,216" color="var(--iv-blue)" dur={3} delay={1.2} square r={6} />
        <g transform={`translate(${cx + 6},256)`}><TrustBadge x={0} y={0} on label="client OK" /></g>
        <g transform={`translate(${sx - 130},256)`}><TrustBadge x={0} y={0} on label="server OK" /></g>
        <SecureTunnel x1={cx} y1={330} x2={sx} y2={330} h={28} period={7} label="Mutual TLS Secure Channel" />
      </svg>
    )
  }

  return (
    <svg className="iv-svg" viewBox="0 0 640 460" role="img" aria-label="TLS handshake: client and server negotiate, exchange certificate and keys, then form an encrypted tunnel">
      <IvDefs />

      {/* endpoints */}
      <BrowserClient x={cx - 46} y={18} w={92} h={78} label="Client" sub="browser" color="var(--iv-blue)" bob delay={0.1} />
      <GlassServer x={sx - 46} y={18} w={92} h={78} label="Server" sub="https site" color="var(--iv-blue)" bob delay={0.7} />

      {/* lifelines */}
      <line className="iv-conn" x1={cx} y1="98" x2={cx} y2="418" strokeDasharray="4 5" />
      <line className="iv-conn" x1={sx} y1="98" x2={sx} y2="418" strokeDasharray="4 5" />

      {/* message rows */}
      {steps.map((s) => {
        const dim = spotlight && s.id !== stage
        const active = spotlight && s.id === stage
        return (
        <g key={s.label} className={dim ? 'iv-dim' : ''}>
          {active && <rect x="184" y={s.y - 42} width="272" height="38" rx="13" fill={s.c} opacity="0.10" />}
          <path className="iv-conn" d={bow(s.y, s.dir)}
            markerEnd={s.dir === 'cs' ? 'url(#ivArrowBlue)' : 'url(#ivArrow)'} opacity="0.5" />
          <text className="iv-label" x="320" y={s.y - 30} textAnchor="middle" fontSize="12.5" style={T}>{s.label}</text>
          <text className="iv-sub" x="320" y={s.y - 16} textAnchor="middle" fontSize="10" style={T}>{s.sub}</text>
          <SecurityPacket path={bow(s.y, s.dir)} color={s.c} win={s.win} period={P} r={s.cert || s.key ? 7 : 6} square={s.cert || s.key} />
        </g>
        )
      })}

      {/* certificate validation on the client side (verify pulse + check) */}
      <g className={spotlight && stage !== 'certificate' ? 'iv-dim' : ''} transform={`translate(${cx},262)`}>
        <VerificationPulse x={0} y={0} r={16} delay={P * 0.5} dur={P * 0.18} />
        <TrustBadge x={-42} y={0} on label="cert OK" />
      </g>

      {/* session keys derived on both ends */}
      <g className={`iv-step-on ${spotlight && stage !== 'finished' ? 'iv-dim' : ''}`} style={{ '--delay': `${P * 0.84}s`, '--dur': `${P}s` }}>
        <g transform={`translate(${cx - 12},368)`}><KeyIcon c="var(--iv-emerald)" /></g>
        <g transform={`translate(${sx - 24},368)`}><KeyIcon c="var(--iv-emerald)" /></g>
        <text className="iv-sub" x="320" y="388" textAnchor="middle" fontSize="10.5" style={T}>shared session key derived</text>
      </g>

      {/* the encrypted tunnel forms + carries secure traffic */}
      <SecureTunnel x1={cx} y1={430} x2={sx} y2={430} h={24} period={P} label="Encrypted Tunnel · Secure Communication" />
    </svg>
  )
}

/* small connector arrow between flow nodes */
function Arrow({ x1, y1, x2, y2, blue = false, dim = false }) {
  return <line className={`iv-conn ${dim ? 'iv-dim' : ''}`} x1={x1} y1={y1} x2={x2} y2={y2}
    markerEnd={blue ? 'url(#ivArrowBlue)' : 'url(#ivArrow)'} />
}

/* ===========================================================================
   PRIORITY 3 — RSA (public-key encryption)
   Plaintext → (public key) encryption cube → ciphertext across the Internet →
   (private key) decryption → original message. Meanwhile Eve intercepts the
   ciphertext, tries her own key and gets gibberish — so the student sees WHY
   only the matching private key recovers the message.
   ======================================================================== */
export function RsaFlow({ mode = 'encrypt' } = {}) {
  const y = 40, h = 96
  const xs = [16, 148, 280, 412, 544]
  const cy = y + 48
  const gap = (i) => ({ x1: xs[i] + 92, x2: xs[i + 1] })
  const keysMode = mode === 'keys'
  return (
    <svg className="iv-svg" viewBox="0 0 640 430" role="img" aria-label="RSA: plaintext encrypted with a public key travels as ciphertext and only the matching private key decrypts it; Eve's key fails">
      <IvDefs />
      <Tile x={xs[0]} y={y} w={92} h={h}><DocIcon c="var(--iv-blue)" /></Tile>
      <text className="iv-title" x={xs[0] + 46} y={y + h - 8} textAnchor="middle" fontSize="11.5" style={T}>Plaintext</text>
      <Tile x={xs[1]} y={y} w={92} h={h} tone="soft" glow={keysMode ? 'var(--iv-amber)' : undefined}><CubeIcon c="var(--iv-purple)" /></Tile>
      <text className="iv-title" x={xs[1] + 46} y={y + h - 20} textAnchor="middle" fontSize="11.5" style={T}>{keysMode ? 'Public Key' : 'Encrypt'}</text>
      <text className="iv-sub" x={xs[1] + 46} y={y + h - 6} textAnchor="middle" fontSize="9.5" style={T}>{keysMode ? 'shared openly' : 'public key 🔒'}</text>
      <Tile x={xs[2]} y={y} w={92} h={h}><CloudIcon c="var(--iv-muted)" /></Tile>
      <text className="iv-title" x={xs[2] + 46} y={y + h - 20} textAnchor="middle" fontSize="11.5" style={T}>Internet</text>
      <text className="iv-sub" x={xs[2] + 46} y={y + h - 6} textAnchor="middle" fontSize="9.5" style={T}>ciphertext C</text>
      <Tile x={xs[3]} y={y} w={92} h={h} tone="soft" glow={keysMode ? 'var(--iv-amber)' : undefined}><KeyIcon c="var(--iv-amber)" /></Tile>
      <text className="iv-title" x={xs[3] + 46} y={y + h - 20} textAnchor="middle" fontSize="11.5" style={T}>{keysMode ? 'Private Key' : 'Decrypt'}</text>
      <text className="iv-sub" x={xs[3] + 46} y={y + h - 6} textAnchor="middle" fontSize="9.5" style={T}>{keysMode ? 'kept secret' : 'private key'}</text>
      <Tile x={xs[4]} y={y} w={92} h={h} tone="trust"><DocIcon c="var(--iv-emerald)" /></Tile>
      <text className="iv-title" x={xs[4] + 46} y={y + h - 8} textAnchor="middle" fontSize="11.5" style={T}>Message</text>

      {keysMode && (
        <g transform="translate(214,166)">
          <rect className="iv-box warn" x="0" y="0" width="212" height="58" rx="12" />
          <g transform="translate(18,12)"><KeyIcon c="var(--iv-amber)" /></g>
          <text className="iv-title" x="122" y="24" textAnchor="middle" fontSize="12" style={T}>Key Pair Generated</text>
          <text className="iv-sub" x="122" y="40" textAnchor="middle" fontSize="10" style={T}>mathematically linked keys</text>
        </g>
      )}

      {[0, 1, 2, 3].map((i) => <Arrow key={i} {...gap(i)} y1={cy} y2={cy} blue={i === 0} />)}

      {/* transformation packets: blue plaintext → gold ciphertext → green message */}
      <SecurityPacket path={`M${gap(0).x1},${cy} L${gap(0).x2},${cy}`} color="var(--iv-blue)" dur={2.4} square r={6} />
      <SecurityPacket path={`M${gap(1).x1},${cy} L${gap(1).x2},${cy}`} color="var(--iv-amber)" dur={2.4} delay={0.7} square r={6} />
      <SecurityPacket path={`M${gap(2).x1},${cy} L${gap(2).x2},${cy}`} color="var(--iv-amber)" dur={2.4} delay={1.3} square r={6} />
      <SecurityPacket path={`M${gap(3).x1},${cy} L${gap(3).x2},${cy}`} color="var(--iv-emerald)" dur={2.4} delay={2} square r={6} />
      <VerificationPulse x={xs[4] + 46} y={cy} r={20} delay={2.2} dur={2.6} />

      {/* Eve intercepts the ciphertext and fails */}
      <path className="iv-conn iv-dim" d={`M${xs[2] + 46},${y + h} C${xs[2] + 46},210 ${300},240 ${300},280`} markerEnd="url(#ivArrow)" strokeDasharray="4 5" />
      <SecurityPacket path={`M${xs[2] + 46},${y + h} C${xs[2] + 46},210 300,240 300,282`} color="var(--iv-amber)" dur={2.8} delay={1.4} square r={6} />
      <Tile x={222} y={286} w={196} h={112} tone="alert"><ThreatIcon c="var(--iv-red)" /></Tile>
      <text className="iv-title" x={320} y={356} textAnchor="middle" fontSize="12" style={T}>Eve intercepts C</text>
      <text className="iv-sub" x={320} y={372} textAnchor="middle" fontSize="10" style={T}>tries her own key</text>
      <text className="iv-f-red" x={320} y={390} textAnchor="middle" fontSize="12" fontWeight="800" style={T}>→ gibberish ✕</text>
      <g transform="translate(392,300)"><path className="iv-block" d="M-8 -8 L8 8 M8 -8 L-8 8" stroke="var(--iv-red)" strokeWidth="3.4" strokeLinecap="round" style={{ '--dur': '2.8s', '--delay': '1.4s' }} /></g>
    </svg>
  )
}

/* ===========================================================================
   PRIORITY 4 — DIGITAL SIGNATURE
   Sender: document → hash → sign with private key → signature travels with the
   document. Receiver: recompute the hash AND recover the signed hash with the
   public key, then compare. Match → Verified. `tampered` → Eve alters the
   document in transit so the hashes differ → Mismatch.
   ======================================================================== */
export function DigitalSignature({ tampered = false }) {
  const okColor = tampered ? 'var(--iv-red)' : 'var(--iv-emerald)'
  return (
    <svg className="iv-svg" viewBox="0 0 640 440" role="img" aria-label="Digital signature: sign the document hash with a private key; the receiver recomputes and compares hashes to verify integrity and origin">
      <IvDefs />
      {/* sender lane */}
      <text className="iv-sub" x={16} y={26} fontSize="11" fontWeight="800" style={T}>SENDER</text>
      <Tile x={16} y={34} w={86} h={84}><DocIcon c="var(--iv-body)" /></Tile>
      <text className="iv-title" x={59} y={110} textAnchor="middle" fontSize="10.5" style={T}>Document</text>
      <Tile x={140} y={34} w={86} h={84} tone="soft"><g transform="translate(2,4)"><ShieldIcon c="var(--iv-cyan)" /></g></Tile>
      <text className="iv-title" x={183} y={104} textAnchor="middle" fontSize="10.5" style={T}>Hash</text>
      <text className="iv-sub" x={183} y={116} textAnchor="middle" fontSize="9" style={T}>h(M)</text>
      <Tile x={264} y={34} w={86} h={84} tone="soft"><KeyIcon c="var(--iv-amber)" /></Tile>
      <text className="iv-title" x={307} y={104} textAnchor="middle" fontSize="10.5" style={T}>Sign</text>
      <text className="iv-sub" x={307} y={116} textAnchor="middle" fontSize="9" style={T}>private key</text>
      <Tile x={388} y={34} w={86} h={84}><CertIcon c="var(--iv-blue)" /></Tile>
      <text className="iv-title" x={431} y={110} textAnchor="middle" fontSize="10.5" style={T}>Signature</text>
      <Arrow x1={102} y1={76} x2={140} y2={76} />
      <Arrow x1={226} y1={76} x2={264} y2={76} />
      <Arrow x1={350} y1={76} x2={388} y2={76} blue />
      <SecurityPacket path="M102,76 L140,76" color="var(--iv-body)" dur={2.2} square r={5} />
      <SecurityPacket path="M226,76 L264,76" color="var(--iv-cyan)" dur={2.2} delay={0.6} square r={5} />
      <SecurityPacket path="M350,76 L388,76" color="var(--iv-amber)" dur={2.2} delay={1.2} square r={5} />

      {/* transmission channel (doc + signature) down to receiver */}
      <path className="iv-conn" d="M431,118 C431,180 90,180 90,224" markerEnd="url(#ivArrow)" />
      <path className="iv-conn iv-dim" d="M59,118 C59,170 60,180 60,224" markerEnd="url(#ivArrow)" strokeDasharray="4 5" />
      <SecurityPacket path="M431,118 C431,180 90,180 90,222" color="var(--iv-amber)" dur={2.8} delay={1.6} square r={6} />
      <SecurityPacket path="M59,118 C59,175 60,180 60,222" color="var(--iv-body)" dur={2.8} delay={1.8} square r={6} />

      {/* tamper in transit */}
      {tampered && (
        <g>
          <Tile x={196} y={150} w={150} h={58} tone="alert"><g transform="translate(0,-2)"><ThreatIcon c="var(--iv-red)" /></g></Tile>
          <text className="iv-f-red" x={300} y={186} textAnchor="middle" fontSize="10.5" fontWeight="800" style={T}>Eve alters M</text>
        </g>
      )}

      {/* receiver lane */}
      <text className="iv-sub" x={16} y={222} fontSize="11" fontWeight="800" style={T}>RECEIVER</text>
      <Tile x={16} y={230} w={86} h={84}><DocIcon c="var(--iv-body)" /></Tile>
      <text className="iv-title" x={59} y={306} textAnchor="middle" fontSize="10.5" style={T}>Received</text>
      <Tile x={140} y={230} w={86} h={84} tone="soft"><g transform="translate(2,4)"><ShieldIcon c="var(--iv-cyan)" /></g></Tile>
      <text className="iv-title" x={183} y={300} textAnchor="middle" fontSize="10.5" style={T}>Recompute</text>
      <text className="iv-sub" x={183} y={312} textAnchor="middle" fontSize="9" style={T}>h(M)'</text>
      <Tile x={264} y={230} w={86} h={84} tone="soft"><KeyIcon c="var(--iv-blue)" /></Tile>
      <text className="iv-title" x={307} y={300} textAnchor="middle" fontSize="10.5" style={T}>Verify sig</text>
      <text className="iv-sub" x={307} y={312} textAnchor="middle" fontSize="9" style={T}>public key</text>
      <Arrow x1={102} y1={272} x2={140} y2={272} />
      <Arrow x1={226} y1={272} x2={264} y2={272} />
      <SecurityPacket path="M102,272 L140,272" color="var(--iv-body)" dur={2.2} delay={0.4} square r={5} />

      {/* compare + verdict */}
      <Arrow x1={226} y1={286} x2={430} y2={352} />
      <Arrow x1={350} y1={286} x2={430} y2={352} blue />
      <Tile x={388} y={330} w={210} h={86} tone={tampered ? 'alert' : 'trust'}>
        <g transform="translate(70,4)">{tampered ? <path d="M-8 -8 L8 8 M8 -8 L-8 8" stroke="var(--iv-red)" strokeWidth="3" strokeLinecap="round" /> : <ShieldIcon c="var(--iv-emerald)" />}</g>
      </Tile>
      <text className="iv-title" x={493} y={392} textAnchor="middle" fontSize="12.5" style={T} fill={okColor}>
        {tampered ? 'h(M)′ ≠ h(M)  ✕' : 'h(M)′ = h(M)  ✓'}
      </text>
      <text className="iv-sub" x={493} y={408} textAnchor="middle" fontSize="10" style={T}>{tampered ? 'Tampered — rejected' : 'Verified — integrity + origin'}</text>
      {!tampered && <VerificationPulse x={493} y={358} r={22} delay={2.2} dur={2.8} />}
    </svg>
  )
}

/* ===========================================================================
   PRIORITY 5 — PKI / CERTIFICATE CHAIN
   Root CA → Intermediate CA → Server/Org certificate → Browser → Trust. A
   certificate travels down the chain; each trust indicator activates in turn so
   the student sees trust flowing from a root anchor to the browser.
   ======================================================================== */
export function PkiChain({ focus = 'chain' } = {}) {
  const y = 96, h = 100, P = 8
  const xs = [16, 148, 280, 412, 544]
  const cy = y + 46
  const nodes = [
    { icon: <ShieldIcon c="var(--iv-blue)" />, t: 'Root CA', s: 'trust anchor', tone: 'soft' },
    { icon: <ShieldIcon c="var(--iv-cyan)" />, t: 'Intermediate', s: 'CA', tone: 'soft' },
    { icon: <CertIcon c="var(--iv-blue)" />, t: 'Certificate', s: 'org / server', tone: '' },
    { icon: <BrowserIcon c="var(--iv-blue)" />, t: 'Browser', s: 'validates chain', tone: '' },
    { icon: <ShieldIcon c="var(--iv-emerald)" />, t: 'Trust', s: 'established', tone: 'trust' },
  ]
  return (
    <svg className="iv-svg" viewBox="0 0 640 300" role="img" aria-label="PKI chain of trust: a certificate signed from the root through intermediate CAs to the server is validated by the browser, establishing trust">
      <IvDefs />
      {nodes.map((n, i) => {
        const dim = (focus === 'root' && i !== 0) || (focus === 'browser' && i !== 3)
        const glow = (focus === 'root' && i === 0) || (focus === 'browser' && i === 3) ? 'var(--iv-emerald)' : undefined
        return (
        <g key={n.t} className={dim ? 'iv-dim' : ''}>
          <Tile x={xs[i]} y={y} w={92} h={h} tone={n.tone} glow={glow}>{n.icon}</Tile>
          <text className="iv-title" x={xs[i] + 46} y={y + h - 22} textAnchor="middle" fontSize="11.5" style={T}>{n.t}</text>
          <text className="iv-sub" x={xs[i] + 46} y={y + h - 8} textAnchor="middle" fontSize="9.5" style={T}>{n.s}</text>
          {/* progressive trust indicator */}
          <g className="iv-step-on" style={{ '--delay': `${(i / nodes.length) * P}s`, '--dur': `${P}s` }}>
            <TrustBadge x={xs[i] + 46} y={y - 12} on label="" />
          </g>
        </g>
        )
      })}
      {[0, 1, 2, 3].map((i) => (
        <g key={i}>
          <Arrow x1={xs[i] + 92} y1={cy} x2={xs[i + 1]} y2={cy} blue />
          <SecurityPacket path={`M${xs[i] + 92},${cy} L${xs[i + 1]},${cy}`} color="var(--iv-blue)" win={[i / 5 + 0.02, i / 5 + 0.2]} period={P} square r={6} />
        </g>
      ))}
    </svg>
  )
}
export const CertificateChain = PkiChain

/* ===========================================================================
   PRIORITY 6 — AUTHENTICATION FLOW
   User → password (knowledge) → MFA / OTP (possession) → verification → access.
   On success the lock opens and the shield activates.
   ======================================================================== */
export function AuthenticationFlow({ focus = 'all' } = {}) {
  const y = 88, h = 100, P = 8
  const xs = [16, 148, 280, 412, 544]
  const cy = y + 46
  const nodes = [
    { icon: <UserIcon c="var(--iv-blue)" />, t: 'User', s: 'claims identity', tone: '' },
    { icon: <LockIcon c="var(--iv-blue)" />, t: 'Password', s: 'knowledge factor', tone: 'soft' },
    { icon: <PhoneIcon c="var(--iv-cyan)" />, t: 'MFA · OTP', s: 'possession factor', tone: 'soft' },
    { icon: <ShieldIcon c="var(--iv-cyan)" />, t: 'Verify', s: 'server checks', tone: 'soft' },
  ]
  return (
    <svg className="iv-svg" viewBox="0 0 640 290" role="img" aria-label="Authentication: user proves knowledge (password) and possession (OTP), the server verifies, and access is granted">
      <IvDefs />
      {nodes.map((n, i) => {
        const key = ['user', 'password', 'mfa', 'verify'][i]
        const dim = focus !== 'all' && focus !== key
        return (
        <g key={n.t} className={dim ? 'iv-dim' : ''}>
          <Tile x={xs[i]} y={y} w={92} h={h} tone={n.tone}>{n.icon}</Tile>
          <text className="iv-title" x={xs[i] + 46} y={y + h - 22} textAnchor="middle" fontSize="11.5" style={T}>{n.t}</text>
          <text className="iv-sub" x={xs[i] + 46} y={y + h - 8} textAnchor="middle" fontSize="9.5" style={T}>{n.s}</text>
        </g>
        )
      })}
      {/* access-granted node: closed lock that opens + shield activates */}
      <g className={focus !== 'all' && focus !== 'access' ? 'iv-dim' : ''}>
        <Tile x={xs[4]} y={y} w={92} h={h} tone="trust" glow="var(--iv-emerald)"><LockIcon c="var(--iv-emerald)" open /></Tile>
        <text className="iv-title" x={xs[4] + 46} y={y + h - 22} textAnchor="middle" fontSize="11.5" style={T}>Access</text>
        <text className="iv-sub" x={xs[4] + 46} y={y + h - 8} textAnchor="middle" fontSize="9.5" style={T}>granted</text>
      </g>
      <g className="iv-step-on" style={{ '--delay': `${P * 0.8}s`, '--dur': `${P}s` }}>
        <VerificationPulse x={xs[4] + 46} y={cy} r={24} dur={P * 0.2} />
      </g>

      {[0, 1, 2, 3].map((i) => (
        <g key={i}>
          <Arrow x1={xs[i] + 92} y1={cy} x2={xs[i + 1]} y2={cy} blue={i < 3} />
          <SecurityPacket path={`M${xs[i] + 92},${cy} L${xs[i + 1]},${cy}`} color={i < 3 ? 'var(--iv-blue)' : 'var(--iv-emerald)'} win={[i / 5 + 0.02, i / 5 + 0.2]} period={P} square r={6} />
        </g>
      ))}
    </svg>
  )
}
