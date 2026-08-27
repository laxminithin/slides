const NAVY = '#0b1f3a'
const BLUE = '#2563eb'
const PURPLE = '#7c3aed'
const GREEN = '#16a34a'
const AMBER = '#d97706'
const TEAL = '#0d9488'
const MUTED = '#526079'

const STAGES = {
  1: [[120, 80], [200, 140], [90, 170]],
  2: [[80, 90], [160, 70], [210, 140], [130, 180], [70, 150]],
  3: [[70, 80], [150, 50], [230, 90], [200, 170], [110, 180], [160, 120]],
  4: [[60, 70], [130, 40], [210, 70], [240, 150], [170, 190], [80, 170], [150, 110]],
  5: [[50, 90], [120, 40], [200, 50], [250, 120], [210, 190], [110, 200], [70, 150], [155, 115]],
}

export function IntelligenceCore({ stage = 1, label }) {
  const pts = STAGES[stage] || STAGES[1]
  const color = [BLUE, TEAL, PURPLE, AMBER, GREEN][stage - 1] || BLUE
  return (
    <svg className="ai-core" viewBox="0 0 300 240" role="img" aria-label={label || `Reasoning core stage ${stage}`}>
      {pts.map((a, i) => pts.slice(i + 1).map((b, j) => (
        <line key={`${i}-${j}`} className="link" x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} stroke={color} />
      )))}
      {pts.map(([x, y], i) => (
        <circle key={i} className="dot ai-anim-pulse" cx={x} cy={y} r={i === pts.length - 1 ? 9 : 6} fill={color} style={{ animationDelay: `${i * 0.12}s` }} />
      ))}
    </svg>
  )
}

export function CinematicOpener({ kicker, title, line, stage = 1, scene }) {
  return (
    <div className="ai-opener">
      <div style={{ position: 'absolute', inset: 0, opacity: 0.55, pointerEvents: 'none' }}>{scene || <IntelligenceCore stage={stage} />}</div>
      <div style={{ position: 'relative', zIndex: 2 }}>
        <div className="ai-opener-kicker">{kicker}</div>
        <h2>{title}</h2>
        <p>{line}</p>
      </div>
    </div>
  )
}

export function ContrastPair({ leftTitle, left, rightTitle, right }) {
  return (
    <div className="ai-contrast" role="img" aria-label={`${leftTitle} versus ${rightTitle}`}>
      <article>
        <strong>{leftTitle}</strong>
        <p>{left}</p>
      </article>
      <article>
        <strong>{rightTitle}</strong>
        <p>{right}</p>
      </article>
    </div>
  )
}

export function JourneyPicture({ items = [] }) {
  return (
    <div className="ai-journey" role="img" aria-label={items.join(' then ')}>
      {items.map((item, i) => (
        <span key={item} style={{ display: 'contents' }}>
          <b className="ai-anim-rise" style={{ animationDelay: `${i * 0.08}s` }}>{item}</b>
          {i < items.length - 1 ? <i>→</i> : null}
        </span>
      ))}
    </div>
  )
}

export function FoundationsConstellation() {
  const nodes = [
    ['Philosophy', 80, 50],
    ['Mathematics', 250, 36],
    ['Economics', 430, 70],
    ['Neuroscience', 70, 170],
    ['Psychology', 500, 160],
    ['Computing', 160, 250],
    ['Control', 360, 255],
    ['Linguistics', 500, 250],
  ]
  return (
    <div className="ai-scene">
      <svg viewBox="0 0 580 310" role="img" aria-label="Foundations of AI">
        {nodes.map(([n, x, y]) => (
          <path key={n} d={`M${x} ${y} L 290 155`} fill="none" stroke={BLUE} strokeWidth="1.4" opacity="0.35" />
        ))}
        <circle cx="290" cy="155" r="36" fill="#eaf2ff" stroke={BLUE} strokeWidth="3" className="ai-anim-pulse" />
        <text x="290" y="161" textAnchor="middle" fontSize="18" fontWeight="800" fill={NAVY}>AI</text>
        {nodes.map(([n, x, y], i) => (
          <g key={n} className="ai-anim-rise" style={{ animationDelay: `${i * 0.07}s` }}>
            <circle cx={x} cy={y} r="8" fill={PURPLE} />
            <text x={x} y={y - 14} textAnchor="middle" fontSize="14" fontWeight="800" fill={NAVY}>{n}</text>
          </g>
        ))}
      </svg>
    </div>
  )
}

export function ApplicationsField() {
  const items = [
    [90, 70, 'Vehicles'],
    [250, 50, 'Speech'],
    [430, 80, 'Games'],
    [80, 200, 'Logistics'],
    [250, 230, 'Planning'],
    [450, 210, 'Translation'],
  ]
  return (
    <div className="ai-scene">
      <svg viewBox="0 0 560 300" role="img" aria-label="State of the art sample">
        <circle cx="280" cy="140" r="48" fill="#eaf2ff" stroke={BLUE} strokeWidth="3" className="ai-anim-glow" />
        <text x="280" y="146" textAnchor="middle" fontSize="16" fontWeight="800" fill={NAVY}>reason</text>
        {items.map(([x, y, label], i) => (
          <g key={label} className="ai-anim-rise" style={{ animationDelay: `${i * 0.1}s` }}>
            <path d={`M280 140 L ${x} ${y}`} fill="none" stroke={TEAL} strokeWidth="1.6" opacity="0.45" />
            <circle cx={x} cy={y} r="34" fill="#fffaf0" stroke={TEAL} strokeWidth="2" />
            <text x={x} y={y + 5} textAnchor="middle" fontSize="13" fontWeight="800" fill={NAVY}>{label}</text>
          </g>
        ))}
      </svg>
    </div>
  )
}

export function VacuumConstellation({ active = 0 }) {
  const states = [
    ['A dirty B dirty', 70, 70],
    ['A dirty B clean', 230, 70],
    ['A clean B dirty', 390, 70],
    ['A clean B clean', 550, 70],
    ['A· dirty B dirty', 70, 210],
    ['A· dirty B clean', 230, 210],
    ['A· clean B dirty', 390, 210],
    ['A· clean B clean', 550, 210],
  ]
  return (
    <div className="ai-scene">
      <svg viewBox="0 0 640 300" role="img" aria-label="Eight vacuum world states">
        {states.map(([label, x, y], i) => (
          <g key={label}>
            {i < 4 && <path d={`M${x} ${y + 28} L ${x} ${y + 112}`} className="ai-edge" />}
            <rect x={x - 58} y={y - 28} width="116" height="56" rx="10" fill={i === active ? '#eaf2ff' : '#fff'} stroke={i === active ? BLUE : NAVY} strokeWidth={i === active ? 3 : 1.6} className={i === active ? 'ai-anim-pulse' : ''} />
            <text x={x} y={y + 5} textAnchor="middle" fontSize="12" fontWeight="800" fill={NAVY}>{label}</text>
          </g>
        ))}
        <text x="320" y="292" textAnchor="middle" fontSize="15" fontWeight="700" fill={MUTED}>agent on A (top) or B (bottom) · dirt bits change by Suck</text>
      </svg>
    </div>
  )
}

export function EnvironmentAxisPair({ left, right, question }) {
  return (
    <div className="ai-scene">
      <svg viewBox="0 0 640 280" role="img" aria-label={`${left} versus ${right}`}>
        <line x1="80" y1="140" x2="560" y2="140" stroke={NAVY} strokeWidth="2.2" />
        <circle cx="110" cy="140" r="54" fill="#eaf2ff" stroke={BLUE} strokeWidth="3" />
        <text x="110" y="146" textAnchor="middle" fontSize="15" fontWeight="800" fill={NAVY}>{left}</text>
        <circle cx="530" cy="140" r="54" fill="#f3edff" stroke={PURPLE} strokeWidth="3" className="ai-anim-pulse" />
        <text x="530" y="146" textAnchor="middle" fontSize="15" fontWeight="800" fill={NAVY}>{right}</text>
        <text x="320" y="230" textAnchor="middle" fontSize="18" fontWeight="700" fill={MUTED}>{question}</text>
      </svg>
    </div>
  )
}

export function MultiagentScene() {
  return (
    <div className="ai-scene">
      <svg viewBox="0 0 640 280" role="img" aria-label="Single versus multiagent">
        <circle cx="160" cy="140" r="50" fill="#eaf2ff" stroke={BLUE} strokeWidth="3" />
        <text x="160" y="146" textAnchor="middle" fontSize="16" fontWeight="800" fill={NAVY}>A</text>
        <circle cx="480" cy="140" r="50" fill="#fff5db" stroke={AMBER} strokeWidth="3" className="ai-anim-pulse" />
        <text x="480" y="146" textAnchor="middle" fontSize="16" fontWeight="800" fill={NAVY}>B</text>
        <path d="M220 140 H 420" stroke={PURPLE} strokeWidth="2.6" className="ai-anim-dash" />
        <text x="320" y="128" textAnchor="middle" fontSize="16" fontWeight="800" fill={PURPLE}>maximising against A?</text>
        <text x="320" y="250" textAnchor="middle" fontSize="16" fill={MUTED}>Weather is not an agent. Another driver can be.</text>
      </svg>
    </div>
  )
}

export function NextStateFork() {
  return (
    <div className="ai-scene">
      <svg viewBox="0 0 640 280" role="img" aria-label="Deterministic versus stochastic next state">
        <circle cx="90" cy="140" r="36" fill="#eaf2ff" stroke={BLUE} strokeWidth="3" />
        <text x="90" y="146" textAnchor="middle" fontSize="16" fontWeight="800" fill={NAVY}>s,a</text>
        <path d="M130 140 H 230" className="ai-edge active" />
        <circle cx="280" cy="80" r="34" fill="#eaf8ef" stroke={GREEN} strokeWidth="2.4" />
        <text x="280" y="86" textAnchor="middle" fontSize="14" fontWeight="800" fill={NAVY}>s′</text>
        <text x="280" y="40" textAnchor="middle" fontSize="14" fontWeight="800" fill={GREEN}>deterministic</text>
        <path d="M230 140 C 250 140, 250 80, 246 80" className="ai-edge" />
        <circle cx="430" cy="200" r="28" fill="#fff" stroke={AMBER} strokeWidth="2" />
        <circle cx="510" cy="150" r="28" fill="#fff" stroke={AMBER} strokeWidth="2" />
        <circle cx="500" cy="230" r="28" fill="#fff5db" stroke={AMBER} strokeWidth="2" className="ai-anim-pulse" />
        <path d="M230 148 C 300 210, 360 210, 402 210" className="ai-edge" />
        <text x="470" y="120" textAnchor="middle" fontSize="14" fontWeight="800" fill={AMBER}>stochastic</text>
      </svg>
    </div>
  )
}

export function HorizonScene() {
  return (
    <div className="ai-scene">
      <svg viewBox="0 0 640 260" role="img" aria-label="Episodic versus sequential">
        {['percept', 'act', 'forget'].map((t, i) => (
          <g key={t} className="ai-anim-rise" style={{ animationDelay: `${i * 0.12}s` }}>
            <rect x={40 + i * 90} y="90" width="80" height="70" rx="12" fill="#eaf2ff" stroke={BLUE} strokeWidth="2" />
            <text x={80 + i * 90} y="132" textAnchor="middle" fontSize="14" fontWeight="800" fill={NAVY}>{t}</text>
          </g>
        ))}
        <text x="160" y="50" textAnchor="middle" fontSize="16" fontWeight="800" fill={BLUE}>episodic</text>
        {['now', 'later', 'cost'].map((t, i) => (
          <g key={t}>
            <rect x={360 + i * 80} y="90" width="70" height="70" rx="12" fill="#f3edff" stroke={PURPLE} strokeWidth="2" />
            <text x={395 + i * 80} y="132" textAnchor="middle" fontSize="14" fontWeight="800" fill={NAVY}>{t}</text>
            {i < 2 && <path d={`M${430 + i * 80} 125 H ${360 + (i + 1) * 80}`} className="ai-edge active" />}
          </g>
        ))}
        <text x="480" y="50" textAnchor="middle" fontSize="16" fontWeight="800" fill={PURPLE}>sequential</text>
      </svg>
    </div>
  )
}

export function KnownUnknownScene() {
  return (
    <div className="ai-scene">
      <svg viewBox="0 0 640 260" role="img" aria-label="Known versus observable">
        <rect x="40" y="50" width="250" height="160" rx="8" fill="#eaf8ef" stroke={GREEN} strokeWidth="2.4" />
        <text x="165" y="90" textAnchor="middle" fontSize="18" fontWeight="800" fill={NAVY}>Known rules</text>
        <text x="165" y="130" textAnchor="middle" fontSize="15" fill={MUTED}>Solitaire: you know the laws</text>
        <text x="165" y="158" textAnchor="middle" fontSize="15" fill={MUTED}>cards stay hidden</text>
        <rect x="350" y="50" width="250" height="160" rx="8" fill="#fff5db" stroke={AMBER} strokeWidth="2.4" />
        <text x="475" y="90" textAnchor="middle" fontSize="18" fontWeight="800" fill={NAVY}>Unknown buttons</text>
        <text x="475" y="130" textAnchor="middle" fontSize="15" fill={MUTED}>Full screen, new game</text>
        <text x="475" y="158" textAnchor="middle" fontSize="15" fill={MUTED}>observable ≠ known</text>
      </svg>
    </div>
  )
}

export function RationalActionViz() {
  return (
    <div className="ai-scene">
      <svg viewBox="0 0 640 300" role="img" aria-label="Rational action from percepts and knowledge">
        {[['e', 'percept history', 70], ['K', 'prior knowledge', 230], ['A', 'actions', 390]].map(([s, l, x], i) => (
          <g key={s} className="ai-anim-rise" style={{ animationDelay: `${i * 0.1}s` }}>
            <rect x={x} y="40" width="140" height="80" rx="10" fill="#eaf2ff" stroke={BLUE} strokeWidth="2" />
            <text x={x + 70} y="74" textAnchor="middle" fontSize="22" fontWeight="900" fill={BLUE}>{s}</text>
            <text x={x + 70} y="98" textAnchor="middle" fontSize="13" fontWeight="700" fill={NAVY}>{l}</text>
            <path d={`M${x + 70} 120 V 160`} className="ai-edge active" />
          </g>
        ))}
        <rect x="150" y="168" width="340" height="90" rx="12" fill="#eaf8ef" stroke={GREEN} strokeWidth="3" className="ai-anim-pulse" />
        <text x="320" y="208" textAnchor="middle" fontSize="22" fontWeight="900" fill={GREEN}>best expected action</text>
        <text x="320" y="236" textAnchor="middle" fontSize="15" fill={NAVY}>argmax  E[ π | e, K ]</text>
      </svg>
    </div>
  )
}

export function LearningCutaway() {
  const boxes = [
    [40, 40, 170, 90, 'Performance', BLUE],
    [250, 40, 170, 90, 'Critic', PURPLE],
    [40, 170, 170, 90, 'Learning', TEAL],
    [250, 170, 170, 90, 'Problem gen.', GREEN],
  ]
  return (
    <div className="ai-scene">
      <svg viewBox="0 0 640 300" role="img" aria-label="Learning agent four components">
        {boxes.map(([x, y, w, h, t, c], i) => (
          <g key={t} className="ai-anim-rise" style={{ animationDelay: `${i * 0.1}s` }}>
            <rect x={x} y={y} width={w} height={h} rx="10" fill="#fff" stroke={c} strokeWidth="2.6" />
            <text x={x + w / 2} y={y + 52} textAnchor="middle" fontSize="18" fontWeight="800" fill={NAVY}>{t}</text>
          </g>
        ))}
        <path d="M210 85 H 250" className="ai-edge active" />
        <path d="M125 130 V 170" className="ai-edge" />
        <path d="M335 130 V 170" className="ai-edge" />
        <text x="520" y="160" fontSize="16" fontWeight="700" fill={MUTED}>percepts in → better actions</text>
      </svg>
    </div>
  )
}

export function GrainStack() {
  const layers = [
    ['Atomic', 'In(Arad) — a name', BLUE, 70],
    ['Factored', 'attributes / fluents', TEAL, 140],
    ['Structured', 'objects + relations', PURPLE, 210],
  ]
  return (
    <div className="ai-scene">
      <svg viewBox="0 0 560 300" role="img" aria-label="Atomic factored structured">
        {layers.map(([t, d, c, y], i) => (
          <g key={t} className="ai-anim-rise" style={{ animationDelay: `${i * 0.12}s` }}>
            <rect x={80 + i * 18} y={y} width={400 - i * 36} height="58" rx="8" fill="#fff" stroke={c} strokeWidth="2.6" />
            <text x="280" y={y + 24} textAnchor="middle" fontSize="18" fontWeight="800" fill={NAVY}>{t}</text>
            <text x="280" y={y + 46} textAnchor="middle" fontSize="14" fill={MUTED}>{d}</text>
          </g>
        ))}
      </svg>
    </div>
  )
}

export function HeuristicLandscape() {
  return (
    <div className="ai-scene">
      <svg viewBox="0 0 640 300" role="img" aria-label="Heuristic field toward a goal">
        {[90, 150, 210].map((r, i) => (
          <ellipse key={r} cx="480" cy="150" rx={r + 40} ry={r * 0.55} fill="none" stroke={TEAL} strokeWidth="2" className="ai-anim-field" style={{ animationDelay: `${i * 0.3}s` }} opacity="0.45" />
        ))}
        <circle cx="90" cy="150" r="22" fill="#eaf2ff" stroke={BLUE} strokeWidth="3" />
        <text x="90" y="156" textAnchor="middle" fontSize="16" fontWeight="800" fill={NAVY}>S</text>
        <circle cx="480" cy="150" r="26" fill="#eaf8ef" stroke={GREEN} strokeWidth="3" className="ai-anim-pulse" />
        <text x="480" y="156" textAnchor="middle" fontSize="16" fontWeight="800" fill={NAVY}>G</text>
        <path d="M112 150 C 220 80, 340 80, 454 150" fill="none" stroke={BLUE} strokeWidth="3" className="ai-anim-trace" />
        <text x="250" y="50" fontSize="18" fontWeight="800" fill={TEAL}>h(n) bends attention toward the goal</text>
      </svg>
    </div>
  )
}

export function WestNetwork({ lit = 1 }) {
  const facts = [
    [80, 50, 'American(West)', 1],
    [80, 130, 'Missile(M1)', 1],
    [80, 210, 'Owns(Nono,M1)', 1],
    [80, 270, 'Enemy(Nono,America)', 1],
    [340, 90, 'Weapon(M1)', 2],
    [340, 170, 'Sells(West,M1,Nono)', 2],
    [340, 250, 'Hostile(Nono)', 2],
    [540, 170, 'Criminal(West)', 3],
  ]
  return (
    <div className="ai-scene">
      <svg viewBox="0 0 640 320" role="img" aria-label="Colonel West knowledge network">
        <path d="M200 130 H 300" className="ai-edge" />
        <path d="M200 210 H 300" className="ai-edge" />
        <path d="M460 170 H 510" className={lit >= 3 ? 'ai-edge goal' : 'ai-edge'} />
        {facts.filter(([, , , s]) => s <= lit).map(([x, y, t, s], i) => (
          <g key={t} className="ai-anim-fire" style={{ animationDelay: `${i * 0.08}s` }}>
            <rect x={x} y={y - 18} width={s === 3 ? 96 : 210} height="36" rx="8" fill={s === 3 ? GREEN : s === 2 ? PURPLE : BLUE} />
            <text x={x + (s === 3 ? 48 : 105)} y={y + 5} textAnchor="middle" fontSize="13" fontWeight="800" fill="#fff">{t}</text>
          </g>
        ))}
      </svg>
    </div>
  )
}

export function FlySchema() {
  return (
    <div className="ai-scene">
      <svg viewBox="0 0 640 300" role="img" aria-label="PDDL Fly schema">
        <rect x="220" y="110" width="200" height="70" rx="12" fill="#eaf2ff" stroke={BLUE} strokeWidth="3" className="ai-anim-pulse" />
        <text x="320" y="152" textAnchor="middle" fontSize="22" fontWeight="900" fill={NAVY}>Fly(p, from, to)</text>
        <rect x="30" y="40" width="170" height="70" rx="10" fill="#fff" stroke={TEAL} strokeWidth="2" />
        <text x="115" y="70" textAnchor="middle" fontSize="14" fontWeight="800" fill={TEAL}>PRECOND</text>
        <text x="115" y="94" textAnchor="middle" fontSize="13" fill={NAVY}>At(p,from) ∧ Plane(p)</text>
        <rect x="440" y="40" width="170" height="70" rx="10" fill="#eaf8ef" stroke={GREEN} strokeWidth="2" />
        <text x="525" y="70" textAnchor="middle" fontSize="14" fontWeight="800" fill={GREEN}>EFFECT</text>
        <text x="525" y="94" textAnchor="middle" fontSize="13" fill={NAVY}>¬At(p,from) ∧ At(p,to)</text>
        <path d="M200 75 H 220" className="ai-edge active" />
        <path d="M420 75 H 440" className="ai-edge goal" />
        <text x="320" y="250" textAnchor="middle" fontSize="16" fontWeight="700" fill={MUTED}>one schema instead of 4 T n² ground actions</text>
      </svg>
    </div>
  )
}

export function MemoryBoundedViz() {
  const rows = [
    ['IDA*', 'keep one f-cutoff', 'next cutoff = smallest f that leaked'],
    ['RBFS', 'linear space', 'backup the best forgotten child f'],
    ['SMA*', 'use all RAM', 'drop the worst leaf when full'],
  ]
  return (
    <div className="ai-scene">
      <svg viewBox="0 0 640 300" role="img" aria-label="Memory bounded heuristic search">
        {rows.map(([n, a, b], i) => (
          <g key={n} className="ai-anim-rise" style={{ animationDelay: `${i * 0.12}s` }}>
            <rect x="40" y={30 + i * 88} width="560" height="74" rx="8" fill="#fff" stroke={i === 0 ? BLUE : i === 1 ? PURPLE : TEAL} strokeWidth="2.4" />
            <text x="70" y={72 + i * 88} fontSize="22" fontWeight="900" fill={NAVY}>{n}</text>
            <text x="200" y={64 + i * 88} fontSize="16" fontWeight="700" fill={MUTED}>{a}</text>
            <text x="200" y={88 + i * 88} fontSize="15" fill={NAVY}>{b}</text>
          </g>
        ))}
      </svg>
    </div>
  )
}

export function SynthesisJourney() {
  const steps = ['World', 'Agent', 'Search', 'Heuristic', 'Knowledge', 'Logic', 'Proof', 'Plan', 'Action']
  return (
    <div className="ai-scene">
      <svg viewBox="0 0 640 300" role="img" aria-label="Course synthesis">
        {steps.map((t, i) => {
          const x = 36 + (i % 5) * 122
          const y = i < 5 ? 70 : 180
          return (
            <g key={t} className="ai-anim-rise" style={{ animationDelay: `${i * 0.08}s` }}>
              <circle cx={x + 40} cy={y} r="34" fill={i === steps.length - 1 ? '#eaf8ef' : '#eaf2ff'} stroke={i === steps.length - 1 ? GREEN : BLUE} strokeWidth="2.6" />
              <text x={x + 40} y={y + 5} textAnchor="middle" fontSize="13" fontWeight="800" fill={NAVY}>{t}</text>
              {i < 4 && <path d={`M${x + 74} ${y} H ${x + 122}`} className="ai-edge active" />}
              {i >= 5 && i < 8 && <path d={`M${x + 74} ${y} H ${x + 122}`} className="ai-edge goal" />}
            </g>
          )
        })}
        <path d="M526 104 V 146" className="ai-edge" />
      </svg>
    </div>
  )
}

export function SearchOpenerScene() {
  return (
    <div className="ai-scene">
      <svg viewBox="0 0 640 300" role="img" aria-label="Start and goal in a state space">
        <circle cx="80" cy="150" r="28" fill="#eaf2ff" stroke={BLUE} strokeWidth="3" />
        <text x="80" y="156" textAnchor="middle" fontSize="18" fontWeight="800" fill={NAVY}>S</text>
        <circle cx="560" cy="150" r="28" fill="#eaf8ef" stroke={GREEN} strokeWidth="3" className="ai-anim-pulse" />
        <text x="560" y="156" textAnchor="middle" fontSize="18" fontWeight="800" fill={NAVY}>G</text>
        {[[180, 80], [260, 170], [340, 70], [420, 190], [300, 150]].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="12" fill="#fff" stroke="#94a3b8" strokeWidth="1.6" />
        ))}
        <path d="M108 150 C 200 150, 280 150, 360 150 S 500 150, 532 150" fill="none" stroke={BLUE} strokeWidth="3" className="ai-anim-trace" />
        <text x="320" y="40" textAnchor="middle" fontSize="18" fontWeight="800" fill={MUTED}>a path through possibilities</text>
      </svg>
    </div>
  )
}

export function FolGrowScene() {
  return (
    <div className="ai-scene">
      <svg viewBox="0 0 640 300" role="img" aria-label="First-order knowledge growing">
        <text x="320" y="50" textAnchor="middle" fontSize="22" fontWeight="800" fill={NAVY} className="ai-anim-rise">Human(Socrates)</text>
        <text x="160" y="140" textAnchor="middle" fontSize="18" fontWeight="700" fill={BLUE} className="ai-anim-rise" style={{ animationDelay: '0.15s' }}>∀x Human(x) ⇒ Mortal(x)</text>
        <text x="480" y="140" textAnchor="middle" fontSize="18" fontWeight="700" fill={PURPLE} className="ai-anim-rise" style={{ animationDelay: '0.3s' }}>Teacher(Socrates, Plato)</text>
        <rect x="170" y="200" width="300" height="54" rx="10" fill="#eaf8ef" stroke={GREEN} strokeWidth="2.6" className="ai-anim-pulse" />
        <text x="320" y="234" textAnchor="middle" fontSize="20" fontWeight="900" fill={GREEN}>Mortal(Socrates)</text>
      </svg>
    </div>
  )
}

export function BackwardOpenerScene() {
  return (
    <div className="ai-scene">
      <svg viewBox="0 0 640 300" role="img" aria-label="Reason backward from a goal">
        <rect x="210" y="30" width="220" height="50" rx="10" fill="#eaf8ef" stroke={GREEN} strokeWidth="3" className="ai-anim-pulse" />
        <text x="320" y="62" textAnchor="middle" fontSize="18" fontWeight="900" fill={NAVY}>GOAL</text>
        <path d="M320 80 V 120" className="ai-edge goal" />
        {['rule', 'subgoals', 'facts'].map((t, i) => (
          <g key={t} className="ai-anim-back" style={{ animationDelay: `${i * 0.15}s` }}>
            <rect x={70 + i * 180} y="130" width="140" height="46" rx="8" fill="#f3edff" stroke={PURPLE} strokeWidth="2" />
            <text x={140 + i * 180} y="160" textAnchor="middle" fontSize="16" fontWeight="800" fill={NAVY}>{t}</text>
          </g>
        ))}
        <text x="320" y="240" textAnchor="middle" fontSize="18" fontWeight="700" fill={MUTED}>start at the question</text>
      </svg>
    </div>
  )
}

export function DiscreteContinuousScene() {
  return (
    <div className="ai-scene">
      <svg viewBox="0 0 640 280" role="img" aria-label="Discrete versus continuous">
        {[0, 1, 2, 3, 4].map((i) => (
          <rect key={i} x={40 + i * 42} y="90" width="32" height="80" fill="#eaf2ff" stroke={BLUE} strokeWidth="2" />
        ))}
        <text x="140" y="50" textAnchor="middle" fontSize="18" fontWeight="800" fill={BLUE}>discrete chess</text>
        <path d="M360 130 C 420 60, 500 200, 590 130" fill="none" stroke={TEAL} strokeWidth="3.2" />
        <circle cx="420" cy="92" r="8" fill={TEAL} />
        <circle cx="500" cy="168" r="8" fill={TEAL} />
        <text x="500" y="50" textAnchor="middle" fontSize="18" fontWeight="800" fill={TEAL}>continuous taxi</text>
      </svg>
    </div>
  )
}

export function QuantifierScene() {
  return (
    <div className="ai-scene">
      <svg viewBox="0 0 640 280" role="img" aria-label="Universal versus existential">
        {[80, 150, 220, 290, 360].map((x, i) => (
          <circle key={x} cx={x} cy="90" r="22" fill="#eaf2ff" stroke={BLUE} strokeWidth="2" className="ai-anim-pulse" style={{ animationDelay: `${i * 0.08}s` }} />
        ))}
        <text x="220" y="40" textAnchor="middle" fontSize="20" fontWeight="900" fill={BLUE}>∀  every object</text>
        <circle cx="500" cy="200" r="36" fill="#f3edff" stroke={PURPLE} strokeWidth="3" className="ai-anim-pulse" />
        <text x="500" y="206" textAnchor="middle" fontSize="18" fontWeight="900" fill={PURPLE}>∃ one</text>
        <text x="220" y="160" textAnchor="middle" fontSize="15" fill={MUTED}>rule applies across the set</text>
        <text x="500" y="256" textAnchor="middle" fontSize="15" fill={MUTED}>one satisfying object</text>
      </svg>
    </div>
  )
}

export function FolAnatomy() {
  return (
    <div className="ai-scene">
      <svg viewBox="0 0 720 280" role="img" aria-label="FOL sentence anatomy">
        <text x="360" y="70" textAnchor="middle" fontSize="28" fontWeight="900" fill={NAVY}>∀x  Missile(x) ⇒ Weapon(x)</text>
        <path d="M175 86 V 140" className="ai-edge" />
        <path d="M290 86 V 140" className="ai-edge" />
        <path d="M430 86 V 140" className="ai-edge" />
        <path d="M545 86 V 140" className="ai-edge" />
        <text x="175" y="168" textAnchor="middle" fontSize="15" fontWeight="800" fill={PURPLE}>quantifier</text>
        <text x="290" y="168" textAnchor="middle" fontSize="15" fontWeight="800" fill={BLUE}>variable</text>
        <text x="430" y="168" textAnchor="middle" fontSize="15" fontWeight="800" fill={TEAL}>predicate</text>
        <text x="545" y="168" textAnchor="middle" fontSize="15" fontWeight="800" fill={GREEN}>connective</text>
        <text x="360" y="230" textAnchor="middle" fontSize="16" fill={MUTED}>term names an object · sentence claims a relation</text>
      </svg>
    </div>
  )
}

export function PlanningTransition() {
  return (
    <div className="ai-scene">
      <svg viewBox="0 0 720 280" role="img" aria-label="Reasoning versus planning">
        <text x="180" y="80" textAnchor="middle" fontSize="22" fontWeight="900" fill={PURPLE}>REASONING</text>
        <text x="180" y="120" textAnchor="middle" fontSize="18" fill={NAVY}>What is true?</text>
        <text x="540" y="80" textAnchor="middle" fontSize="22" fontWeight="900" fill={GREEN}>PLANNING</text>
        <text x="540" y="120" textAnchor="middle" fontSize="18" fill={NAVY}>What should I do?</text>
        <path d="M280 100 H 440" className="ai-edge active" />
        <circle cx="360" cy="200" r="40" fill="#eaf8ef" stroke={GREEN} strokeWidth="3" className="ai-anim-pulse" />
        <text x="360" y="206" textAnchor="middle" fontSize="16" fontWeight="800" fill={NAVY}>ACT</text>
      </svg>
    </div>
  )
}

export function CnfPipeline() {
  const steps = ['Eliminate ⇒', 'Move ¬ in', 'Standardize', 'Skolemize', 'Drop ∀', 'Distribute']
  return (
    <div className="ai-scene">
      <svg viewBox="0 0 720 240" role="img" aria-label="CNF conversion pipeline">
        {steps.map((t, i) => (
          <g key={t} className="ai-anim-rise" style={{ animationDelay: `${i * 0.08}s` }}>
            <rect x={16 + i * 116} y="80" width="108" height="70" rx="8" fill="#fff" stroke={i === 5 ? GREEN : PURPLE} strokeWidth="2.2" />
            <text x={70 + i * 116} y="122" textAnchor="middle" fontSize="13" fontWeight="800" fill={NAVY}>{t}</text>
            {i < 5 && <path d={`M${124 + i * 116} 115 H ${132 + i * 116}`} className="ai-edge active" />}
          </g>
        ))}
      </svg>
    </div>
  )
}

export function ComplexityOnTree() {
  return (
    <div className="ai-scene">
      <svg viewBox="0 0 640 300" role="img" aria-label="Complexity on a tree">
        <circle cx="320" cy="40" r="18" className="ai-node active" />
        <text x="320" y="46" textAnchor="middle" fontSize="14" fontWeight="800" fill={NAVY}>S</text>
        {[-120, 0, 120].map((dx) => (
          <g key={dx}>
            <path d={`M320 58 L ${320 + dx} 120`} className="ai-edge active" />
            <circle cx={320 + dx} cy="138" r="16" className="ai-node frontier" />
          </g>
        ))}
        <text x="80" y="50" fontSize="22" fontWeight="900" fill={BLUE}>b</text>
        <text x="80" y="74" fontSize="14" fill={MUTED}>branching</text>
        <text x="80" y="160" fontSize="22" fontWeight="900" fill={TEAL}>d</text>
        <text x="80" y="184" fontSize="14" fill={MUTED}>goal depth</text>
        <text x="80" y="250" fontSize="22" fontWeight="900" fill={PURPLE}>m</text>
        <text x="80" y="274" fontSize="14" fill={MUTED}>longest path</text>
        <text x="480" y="160" fontSize="18" fontWeight="800" fill={NAVY}>time ~ nodes generated</text>
        <text x="480" y="190" fontSize="18" fontWeight="800" fill={NAVY}>space ~ nodes stored</text>
      </svg>
    </div>
  )
}

export function KnowledgeMorph() {
  return (
    <div className="ai-scene">
      <svg viewBox="0 0 720 280" role="img" aria-label="Search tree becoming knowledge">
        <circle cx="90" cy="70" r="14" className="ai-node active" />
        <circle cx="50" cy="150" r="14" className="ai-node" />
        <circle cx="130" cy="150" r="14" className="ai-node" />
        <path d="M90 84 V 136" className="ai-edge" />
        <text x="90" y="210" textAnchor="middle" fontSize="16" fontWeight="800" fill={BLUE}>SEARCH TREE</text>
        <path d="M180 140 H 280" className="ai-edge active" />
        <rect x="300" y="50" width="140" height="36" rx="6" fill={BLUE} />
        <text x="370" y="74" textAnchor="middle" fontSize="14" fontWeight="800" fill="#fff">fact</text>
        <rect x="300" y="110" width="140" height="36" rx="6" fill={PURPLE} />
        <text x="370" y="134" textAnchor="middle" fontSize="14" fontWeight="800" fill="#fff">rule</text>
        <rect x="500" y="80" width="160" height="50" rx="8" fill={GREEN} className="ai-anim-pulse" />
        <text x="580" y="112" textAnchor="middle" fontSize="16" fontWeight="800" fill="#fff">inference</text>
        <text x="370" y="210" textAnchor="middle" fontSize="16" fontWeight="800" fill={PURPLE}>KNOWLEDGE NETWORK</text>
      </svg>
    </div>
  )
}

export function AirCargoScene() {
  return (
    <div className="ai-scene">
      <svg viewBox="0 0 720 280" role="img" aria-label="Air cargo At versus In">
        <rect x="40" y="80" width="160" height="90" rx="8" fill="#eaf2ff" stroke={BLUE} strokeWidth="2.4" />
        <text x="120" y="132" textAnchor="middle" fontSize="18" fontWeight="800" fill={NAVY}>JFK</text>
        <rect x="520" y="80" width="160" height="90" rx="8" fill="#eaf8ef" stroke={GREEN} strokeWidth="2.4" />
        <text x="600" y="132" textAnchor="middle" fontSize="18" fontWeight="800" fill={NAVY}>SFO</text>
        <rect x="280" y="50" width="160" height="50" rx="8" fill={PURPLE} className="ai-anim-pulse" />
        <text x="360" y="82" textAnchor="middle" fontSize="16" fontWeight="800" fill="#fff">Plane p</text>
        <text x="120" y="210" textAnchor="middle" fontSize="16" fontWeight="800" fill={BLUE}>At(c, JFK)</text>
        <text x="360" y="150" textAnchor="middle" fontSize="16" fontWeight="800" fill={PURPLE}>In(c, p)</text>
        <text x="600" y="210" textAnchor="middle" fontSize="16" fontWeight="800" fill={GREEN}>At(c, SFO)</text>
        <path d="M200 125 H 280" className="ai-edge active" />
        <path d="M440 75 H 520" className="ai-edge goal" />
      </svg>
    </div>
  )
}

export function ProblemSolvingFlow() {
  const steps = ['Goal', 'Problem', 'Search', 'Actions', 'Execute']
  return (
    <div className="ai-scene">
      <svg viewBox="0 0 720 220" role="img" aria-label="Problem-solving agent">
        {steps.map((t, i) => (
          <g key={t} className="ai-anim-rise" style={{ animationDelay: `${i * 0.1}s` }}>
            <circle cx={80 + i * 140} cy="110" r="42" fill={i === 4 ? '#eaf8ef' : '#eaf2ff'} stroke={i === 4 ? GREEN : BLUE} strokeWidth="2.8" />
            <text x={80 + i * 140} y="116" textAnchor="middle" fontSize="16" fontWeight="800" fill={NAVY}>{t}</text>
            {i < 4 && <path d={`M${122 + i * 140} 110 H ${138 + i * 140}`} className="ai-edge active" />}
          </g>
        ))}
      </svg>
    </div>
  )
}

export function GraphPlanLoop() {
  const steps = ['EXPAND', 'CHECK GOALS', 'SEARCH PLAN', 'SUCCESS / AGAIN']
  return (
    <div className="ai-scene">
      <svg viewBox="0 0 720 240" role="img" aria-label="GraphPlan loop">
        {steps.map((t, i) => (
          <g key={t} className="ai-anim-rise" style={{ animationDelay: `${i * 0.1}s` }}>
            <rect x={20 + i * 175} y="80" width="160" height="70" rx="8" fill="#fff" stroke={i === 3 ? GREEN : BLUE} strokeWidth="2.4" />
            <text x={100 + i * 175} y="122" textAnchor="middle" fontSize="14" fontWeight="800" fill={NAVY}>{t}</text>
            {i < 3 && <path d={`M${180 + i * 175} 115 H ${195 + i * 175}`} className="ai-edge active" />}
          </g>
        ))}
      </svg>
    </div>
  )
}

export function StaticDynamicScene() {
  return (
    <div className="ai-scene">
      <svg viewBox="0 0 640 260" role="img" aria-label="Static versus dynamic">
        <rect x="40" y="50" width="240" height="150" rx="8" fill="#eaf2ff" stroke={BLUE} strokeWidth="2.4" />
        <text x="160" y="110" textAnchor="middle" fontSize="20" fontWeight="800" fill={NAVY}>STATIC</text>
        <text x="160" y="144" textAnchor="middle" fontSize="15" fill={MUTED}>world waits while you think</text>
        <rect x="360" y="50" width="240" height="150" rx="8" fill="#fff5db" stroke={AMBER} strokeWidth="2.4" className="ai-anim-pulse" />
        <text x="480" y="110" textAnchor="middle" fontSize="20" fontWeight="800" fill={NAVY}>DYNAMIC</text>
        <text x="480" y="144" textAnchor="middle" fontSize="15" fill={MUTED}>the taxi keeps moving</text>
      </svg>
    </div>
  )
}
