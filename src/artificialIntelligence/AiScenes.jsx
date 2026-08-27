const NAVY = '#0b1f3a'
const BLUE = '#2563eb'
const PURPLE = '#7c3aed'
const GREEN = '#16a34a'
const AMBER = '#d97706'
const RED = '#dc2626'
const TEAL = '#0d9488'
const MUTED = '#526079'

function Scene({ children, hud }) {
  const chips = Array.isArray(hud) ? hud.filter(Boolean) : hud ? [hud] : []
  return (
    <div className="ai-scene">
      {children}
      {chips.length > 0 && (
        <div className="ai-scene-hud">
          {chips.map((h) => (
            <span key={h}>{h}</span>
          ))}
        </div>
      )}
    </div>
  )
}

export function AgentEnvironmentLoop({ phase = 'all' }) {
  const glow = (name) => (phase === 'all' || phase === name ? 'ai-anim-pulse' : '')
  return (
    <Scene hud={['ENVIRONMENT → percept → AGENT → action']}>
      <svg viewBox="0 0 720 380" role="img" aria-label="Agent environment loop">
        <ellipse cx="360" cy="190" rx="330" ry="168" fill="none" stroke={NAVY} strokeWidth="1.4" opacity="0.18" />
        <ellipse cx="360" cy="190" rx="250" ry="128" fill="none" stroke={BLUE} strokeWidth="1.2" opacity="0.16" />
        <rect x="28" y="118" width="168" height="148" rx="8" fill="rgba(255,255,255,0.55)" stroke={NAVY} strokeWidth="2.2" />
        <text x="112" y="178" textAnchor="middle" fontSize="22" fontWeight="800" fill={NAVY}>ENVIRONMENT</text>
        <text x="112" y="208" textAnchor="middle" fontSize="15" fill={MUTED}>the world</text>
        <circle cx="360" cy="190" r="78" fill="#eaf2ff" stroke={PURPLE} strokeWidth="3.4" className={glow('think')} />
        <circle cx="360" cy="190" r="18" fill={PURPLE} className="ai-anim-glow" />
        <text x="360" y="128" textAnchor="middle" fontSize="18" fontWeight="900" fill={PURPLE}>AGENT</text>
        <path d="M196 150 C 250 70, 300 70, 318 130" fill="none" stroke={BLUE} strokeWidth="3" className="ai-anim-dash" />
        <text x="230" y="78" fontSize="16" fontWeight="800" fill={BLUE}>percept</text>
        <path d="M402 248 C 470 320, 520 300, 196 250" fill="none" stroke={GREEN} strokeWidth="3" className="ai-anim-dash" />
        <text x="470" y="318" fontSize="16" fontWeight="800" fill={GREEN}>action</text>
        <rect x="530" y="70" width="160" height="64" rx="8" fill="#eaf2ff" stroke={BLUE} strokeWidth="2.2" className={glow('perceive')} />
        <text x="610" y="108" textAnchor="middle" fontSize="18" fontWeight="800" fill={BLUE}>sensors</text>
        <rect x="530" y="246" width="160" height="64" rx="8" fill="#eaf8ef" stroke={GREEN} strokeWidth="2.2" className={glow('act')} />
        <text x="610" y="284" textAnchor="middle" fontSize="18" fontWeight="800" fill={GREEN}>actuators</text>
      </svg>
    </Scene>
  )
}

export function FourApproachesGrid({ highlight = 'rational' }) {
  const cells = [
    ['Thinking Humanly', 'cognitive models', 'human-think', 40, 36],
    ['Thinking Rationally', 'laws of thought', 'think-rational', 340, 36],
    ['Acting Humanly', 'Turing Test', 'human-act', 40, 176],
    ['Acting Rationally', 'rational agent', 'rational', 340, 176],
  ]
  return (
    <Scene hud={['Figure 1.1 — four definitions of AI']}>
      <svg viewBox="0 0 640 340" role="img" aria-label="Four approaches to AI">
        <line x1="320" y1="20" x2="320" y2="320" stroke={NAVY} strokeWidth="1.6" opacity="0.35" />
        <line x1="20" y1="170" x2="620" y2="170" stroke={NAVY} strokeWidth="1.6" opacity="0.35" />
        <text x="12" y="28" fontSize="13" fontWeight="800" fill={MUTED}>THOUGHT</text>
        <text x="12" y="328" fontSize="13" fontWeight="800" fill={MUTED}>BEHAVIOUR</text>
        {cells.map(([title, body, key, x, y]) => (
          <g key={key} className={highlight === key ? 'ai-anim-pulse' : ''}>
            <rect x={x} y={y} width="260" height="110" rx="8" fill={highlight === key ? '#eaf2ff' : 'rgba(255,255,255,0.55)'} stroke={highlight === key ? BLUE : 'transparent'} strokeWidth="3" />
            <text x={x + 130} y={y + 48} textAnchor="middle" fontSize="20" fontWeight="800" fill={NAVY}>{title}</text>
            <text x={x + 130} y={y + 78} textAnchor="middle" fontSize="15" fill={MUTED}>{body}</text>
          </g>
        ))}
      </svg>
    </Scene>
  )
}

export function TuringTestScene() {
  return (
    <Scene hud={['Can behaviour reveal intelligence?']}>
      <svg viewBox="0 0 720 360" role="img" aria-label="Turing test">
        <circle cx="360" cy="180" r="58" fill="#fffaf0" stroke={NAVY} strokeWidth="2.8" />
        <text x="360" y="176" textAnchor="middle" fontSize="16" fontWeight="900" fill={NAVY}>evaluator</text>
        <text x="360" y="198" textAnchor="middle" fontSize="13" fill={MUTED}>written only</text>
        <rect x="40" y="70" width="170" height="90" rx="8" fill="#eaf2ff" stroke={BLUE} strokeWidth="2.4" className="ai-anim-glow" />
        <text x="125" y="122" textAnchor="middle" fontSize="20" fontWeight="800" fill={BLUE}>A ?</text>
        <rect x="510" y="70" width="170" height="90" rx="8" fill="#fff5db" stroke={AMBER} strokeWidth="2.4" />
        <text x="595" y="122" textAnchor="middle" fontSize="20" fontWeight="800" fill={AMBER}>B ?</text>
        <text x="125" y="190" textAnchor="middle" fontSize="14" fontWeight="700" fill={MUTED}>hidden participant</text>
        <text x="595" y="190" textAnchor="middle" fontSize="14" fontWeight="700" fill={MUTED}>hidden participant</text>
        {[0, 1, 2].map((i) => (
          <g key={i}>
            <circle cx={230 + i * 28} cy={110 - i * 8} r="5" fill={BLUE} className="ai-anim-rise" style={{ animationDelay: `${i * 0.18}s` }} />
            <circle cx={490 - i * 28} cy={110 - i * 8} r="5" fill={AMBER} className="ai-anim-rise" style={{ animationDelay: `${i * 0.18}s` }} />
          </g>
        ))}
        <path d="M210 115 C 270 90, 310 140, 318 160" fill="none" stroke={BLUE} strokeWidth="2.2" className="ai-anim-dash" />
        <path d="M510 115 C 450 90, 410 140, 402 160" fill="none" stroke={AMBER} strokeWidth="2.2" className="ai-anim-dash" />
        <text x="360" y="310" textAnchor="middle" fontSize="18" fontWeight="700" fill={NAVY}>If the evaluator cannot tell which reply is which, the machine has passed.</text>
      </svg>
    </Scene>
  )
}

export function VacuumWorld({ loc = 'A', dirtA = true, dirtB = true, action = 'Suck' }) {
  return (
    <Scene hud={[`Location ${loc}`, `Action: ${action}`]}>
      <svg viewBox="0 0 640 320" role="img" aria-label="Vacuum world">
        <rect x="70" y="60" width="220" height="180" rx="18" fill={dirtA ? '#fff0f0' : '#eaf8ef'} stroke={NAVY} strokeWidth="2.4" />
        <text x="180" y="100" textAnchor="middle" fontSize="22" fontWeight="800" fill={NAVY}>A</text>
        {dirtA && <circle cx="180" cy="160" r="22" fill="#78716c" className="ai-anim-pulse" />}
        <rect x="350" y="60" width="220" height="180" rx="18" fill={dirtB ? '#fff0f0' : '#eaf8ef'} stroke={NAVY} strokeWidth="2.4" />
        <text x="460" y="100" textAnchor="middle" fontSize="22" fontWeight="800" fill={NAVY}>B</text>
        {dirtB && <circle cx="460" cy="160" r="22" fill="#78716c" />}
        <g className="ai-anim-glow" transform={`translate(${loc === 'A' ? 180 : 460}, 210)`}>
          <rect x="-28" y="-18" width="56" height="28" rx="10" fill={BLUE} />
          <text x="0" y="2" textAnchor="middle" fontSize="12" fontWeight="800" fill="#fff">agent</text>
        </g>
        <text x="320" y="280" textAnchor="middle" fontSize="16" fontWeight="700" fill={MUTED}>if dirty → Suck; else move to the other square</text>
      </svg>
    </Scene>
  )
}

export function PeasOrbit({ agent = 'Taxi' }) {
  const items = [
    ['P', 'Performance', 'safe, on-time, legal, profit', BLUE, 120, 50],
    ['E', 'Environment', 'roads, traffic, weather, people', TEAL, 430, 50],
    ['A', 'Actuators', 'steer, brake, accelerator, speech', GREEN, 120, 220],
    ['S', 'Sensors', 'cameras, GPS, speedo, mic', PURPLE, 430, 220],
  ]
  return (
    <Scene hud={[`${agent} PEAS`]}>
      <svg viewBox="0 0 640 340" role="img" aria-label="PEAS around an agent">
        <circle cx="320" cy="170" r="58" fill="#eaf2ff" stroke={BLUE} strokeWidth="3" className="ai-anim-pulse" />
        <text x="320" y="165" textAnchor="middle" fontSize="16" fontWeight="800" fill={NAVY}>{agent}</text>
        <text x="320" y="186" textAnchor="middle" fontSize="13" fill={MUTED}>agent</text>
        {items.map(([letter, title, body, color, x, y], i) => (
          <g key={letter} className="ai-anim-rise" style={{ animationDelay: `${i * 0.12}s` }}>
            <rect x={x} y={y} width="200" height="78" rx="16" fill="#fff" stroke={color} strokeWidth="2.4" />
            <circle cx={x + 22} cy={y + 24} r="14" fill={color} />
            <text x={x + 22} y={y + 29} textAnchor="middle" fontSize="14" fontWeight="800" fill="#fff">{letter}</text>
            <text x={x + 44} y={y + 30} fontSize="16" fontWeight="800" fill={NAVY}>{title}</text>
            <text x={x + 16} y={y + 56} fontSize="13" fill={MUTED}>{body}</text>
            <path d={`M${letter === 'P' || letter === 'A' ? x + 200 : x} ${y + 39} L ${letter === 'P' || letter === 'A' ? 262 : 378} 170`} fill="none" stroke={color} strokeWidth="1.8" opacity="0.6" />
          </g>
        ))}
      </svg>
    </Scene>
  )
}

export function EnvironmentAxes({ focus = 'observable' }) {
  const rows = [
    ['Fully vs partially observable', 'Can sensors see the whole relevant state?', 'observable'],
    ['Single vs multiagent', 'Is another entity optimizing against you?', 'multi'],
    ['Deterministic vs stochastic', 'Is the next state fixed by state + action?', 'det'],
    ['Episodic vs sequential', 'Does this choice affect later choices?', 'seq'],
    ['Static vs dynamic', 'Does the world change while you think?', 'static'],
    ['Discrete vs continuous', 'States, time, percepts, actions', 'disc'],
    ['Known vs unknown', 'Do you know the rules / physics?', 'known'],
  ]
  return (
    <Scene hud={['Task-environment properties']}>
      <div className="ai-env-board">
        {rows.map(([title, body, key]) => (
          <div
            key={key}
            className={`ai-env-row${focus === key ? ' is-on' : ''}`}
          >
            <strong>{title}</strong>
            <span>{body}</span>
          </div>
        ))}
      </div>
    </Scene>
  )
}

export function AgentArchitecture({ kind = 'reflex' }) {
  const layers = {
    reflex: ['Percept', 'Condition–action rules', 'Action'],
    model: ['Percept', 'State + world model', 'Rules', 'Action'],
    goal: ['Percept', 'Model', 'Goals', 'Search / plan', 'Action'],
    utility: ['Percept', 'Model', 'Utility', 'Maximize expected utility', 'Action'],
    learn: ['Performance element', 'Critic', 'Learning element', 'Problem generator'],
  }
  const items = layers[kind] || layers.reflex
  const colors = [BLUE, PURPLE, TEAL, AMBER, GREEN]
  return (
    <Scene hud={[`${kind} agent — architectural cutaway`]}>
      <svg viewBox="0 0 640 320" role="img" aria-label={`${kind} agent architecture`}>
        {items.map((item, i) => {
          const y = 18 + i * (280 / items.length)
          const h = 280 / items.length - 12
          const c = colors[i % colors.length]
          return (
            <g key={item} className="ai-anim-rise" style={{ animationDelay: `${i * 0.08}s` }}>
              <rect x="90" y={y} width="460" height={h} rx="6" fill="rgba(255,255,255,0.7)" stroke={c} strokeWidth="2.6" />
              <text x="320" y={y + h / 2 + 6} textAnchor="middle" fontSize="20" fontWeight="800" fill={NAVY}>{item}</text>
              {i < items.length - 1 && <path d={`M320 ${y + h} V ${y + h + 12}`} className="ai-edge active" />}
            </g>
          )
        })}
      </svg>
    </Scene>
  )
}

export function StateSpaceMap({ highlight = 'Arad' }) {
  const cities = [
    ['Arad', 90, 110],
    ['Zerind', 80, 42],
    ['Sibiu', 220, 118],
    ['Timisoara', 78, 210],
    ['Fagaras', 360, 70],
    ['Rimnicu', 300, 180],
    ['Pitesti', 420, 230],
    ['Bucharest', 560, 240],
  ]
  return (
    <Scene hud={['Romania route-finding — AIMA map']}>
      <svg viewBox="0 0 640 300" role="img" aria-label="Romania state space">
        <path d="M90 110 L80 42 L220 118 L90 110 L78 210 L220 118 L360 70 L560 240 L420 230 L300 180 L220 118" fill="none" stroke="#64748b" strokeWidth="3.2" />
        {cities.map(([name, x, y]) => (
          <g key={name}>
            <circle cx={x} cy={y} r={name === highlight ? 18 : 13} fill={name === 'Bucharest' ? '#eaf8ef' : name === highlight ? '#eaf2ff' : '#fff'} stroke={name === 'Bucharest' ? GREEN : name === highlight ? BLUE : NAVY} strokeWidth="2.6" className={name === highlight ? 'ai-anim-pulse' : ''} />
            <text x={x} y={y + 32} textAnchor="middle" fontSize="15" fontWeight="800" fill={NAVY}>{name}</text>
          </g>
        ))}
        <text x="90" y="292" fontSize="14" fontWeight="700" fill={BLUE}>START</text>
        <text x="560" y="292" textAnchor="middle" fontSize="14" fontWeight="700" fill={GREEN}>GOAL</text>
      </svg>
    </Scene>
  )
}

const TREE = {
  nodes: [
    { id: 'S', x: 280, y: 36, d: 0 },
    { id: 'A', x: 150, y: 110, d: 1 },
    { id: 'B', x: 410, y: 110, d: 1 },
    { id: 'C', x: 80, y: 190, d: 2 },
    { id: 'D', x: 210, y: 190, d: 2 },
    { id: 'E', x: 350, y: 190, d: 2 },
    { id: 'G', x: 480, y: 190, d: 2 },
  ],
  edges: [
    ['S', 'A'], ['S', 'B'], ['A', 'C'], ['A', 'D'], ['B', 'E'], ['B', 'G'],
  ],
}

function nodeById(id) {
  return TREE.nodes.find((n) => n.id === id)
}

export function SearchTree({ mode = 'idle', depth = 0, path = [], stack = [], queue = [], costs, heuristics, fvals, prune = [] }) {
  const active = new Set(path)
  const view = mode === 'dfs' ? '20 -20 360 300' : '0 0 560 300'
  const bfsLike = mode === 'bfs' || mode === 'bfs-goal' || mode === 'ids'
  return (
    <Scene hud={[mode.toUpperCase(), queue.length ? `frontier ${queue.join(' ')}` : stack.length ? `stack ${stack.join(' ')}` : '']}>
      <svg viewBox={view} role="img" aria-label={`${mode} search tree`}>
        {bfsLike ? [40, 110, 190].map((cy, i) => (
          <ellipse key={cy} cx="280" cy={cy} rx={48 + i * 92} ry={20 + i * 10} fill="none" stroke={mode === 'ids' ? TEAL : BLUE} strokeWidth="1.6" opacity={depth >= i ? 0.38 : 0.12} className={depth === i ? 'ai-anim-level' : ''} />
        )) : null}
        {mode === 'dls' && <rect x="16" y="148" width="528" height="10" fill={AMBER} opacity="0.7" />}
        {mode === 'dls' && <text x="540" y="142" textAnchor="end" fontSize="14" fontWeight="800" fill={AMBER}>depth wall</text>}
        {TREE.edges.map(([a, b]) => {
          const A = nodeById(a)
          const B = nodeById(b)
          const on = active.has(a) && active.has(b)
          const dead = prune.includes(b)
          const thick = mode === 'ucs' && costs ? Math.max(2.2, 9 - ((costs[B.id] || 0) / 28)) : undefined
          return (
            <path
              key={`${a}${b}`}
              d={`M${A.x} ${A.y + 20} C ${A.x} ${(A.y + B.y) / 2}, ${B.x} ${(A.y + B.y) / 2}, ${B.x} ${B.y - 20}`}
              className={dead ? 'ai-edge pruned' : on ? 'ai-edge active' : 'ai-edge'}
              strokeWidth={thick}
              opacity={mode === 'dfs' && !on && !dead ? 0.28 : 1}
            />
          )
        })}
        {TREE.nodes.map((n) => {
          const cls = prune.includes(n.id)
            ? 'pruned'
            : n.id === 'G' && (mode.includes('goal') || path.includes('G'))
              ? 'goal'
              : path.includes(n.id)
                ? 'active'
                : queue.includes(n.id) || stack.includes(n.id)
                  ? 'frontier'
                  : n.d <= depth
                    ? 'explored'
                    : ''
          const extra = bfsLike && n.d === depth ? ' ai-anim-level' : mode === 'dfs' && path[path.length - 1] === n.id ? ' ai-anim-dive' : ''
          const dim = mode === 'dfs' && !path.includes(n.id) && !stack.includes(n.id)
          return (
            <g key={n.id} className={extra} opacity={dim ? 0.32 : 1}>
              <circle cx={n.x} cy={n.y} r="22" className={`ai-node ${cls}`} />
              <text x={n.x} y={n.y + 6} className="ai-node-label">{n.id}</text>
              {heuristics && heuristics[n.id] != null && (
                <text x={n.x} y={n.y - 32} textAnchor="middle" fontSize="15" fontWeight="800" fill={TEAL}>h={heuristics[n.id]}</text>
              )}
              {costs && costs[n.id] != null && (
                <text x={n.x} y={n.y + 42} textAnchor="middle" fontSize="14" fontWeight="800" fill={BLUE}>g={costs[n.id]}</text>
              )}
              {fvals && fvals[n.id] != null && (
                <text x={n.x + 36} y={n.y + 6} fontSize="15" fontWeight="800" fill={PURPLE}>f={fvals[n.id]}</text>
              )}
            </g>
          )
        })}
      </svg>
    </Scene>
  )
}

export function BidirectionalSearchViz({ meet = false }) {
  return (
    <Scene hud={[meet ? 'Frontiers meet — the search collapses' : 'Search both ways']}>
      <svg viewBox="0 0 720 300" role="img" aria-label="Bidirectional search">
        {[70, 130, 190].map((r, i) => (
          <circle key={`f${r}`} cx="90" cy="150" r={r} fill="none" stroke={BLUE} strokeWidth="2" opacity={0.28 - i * 0.06} className="ai-anim-wave" style={{ animationDelay: `${i * 0.25}s` }} />
        ))}
        {[70, 130, 190].map((r, i) => (
          <circle key={`b${r}`} cx="630" cy="150" r={r} fill="none" stroke={PURPLE} strokeWidth="2" opacity={0.28 - i * 0.06} className="ai-anim-wave" style={{ animationDelay: `${i * 0.25}s` }} />
        ))}
        <circle cx="90" cy="150" r="32" fill="#eaf2ff" stroke={BLUE} strokeWidth="3" className="ai-anim-pulse" />
        <text x="90" y="156" textAnchor="middle" fontSize="20" fontWeight="900" fill={NAVY}>S</text>
        <circle cx="630" cy="150" r="32" fill="#f3edff" stroke={PURPLE} strokeWidth="3" className="ai-anim-pulse" />
        <text x="630" y="156" textAnchor="middle" fontSize="20" fontWeight="900" fill={NAVY}>G</text>
        {[210, 280, 350].map((x, i) => (
          <circle key={x} cx={x} cy="150" r="16" fill="#fff" stroke={BLUE} strokeWidth="2.2" className="ai-anim-rise" style={{ animationDelay: `${i * 0.12}s` }} />
        ))}
        {[510, 440, 370].map((x, i) => (
          <circle key={`g${x}`} cx={x} cy="150" r="16" fill="#fff" stroke={PURPLE} strokeWidth="2.2" className="ai-anim-rise" style={{ animationDelay: `${i * 0.12}s` }} />
        ))}
        {meet && <circle cx="360" cy="150" r="34" fill="#fff5db" stroke={AMBER} strokeWidth="4" className="ai-anim-meet" />}
        {meet && <text x="360" y="156" textAnchor="middle" fontSize="16" fontWeight="900" fill={AMBER}>MEET</text>}
        <text x="90" y="40" textAnchor="middle" fontSize="16" fontWeight="800" fill={BLUE}>forward frontier</text>
        <text x="630" y="40" textAnchor="middle" fontSize="16" fontWeight="800" fill={PURPLE}>backward frontier</text>
      </svg>
    </Scene>
  )
}

export function AStarFormula() {
  return (
    <Scene hud={['Where I have been + where I think remains']}>
      <svg viewBox="0 0 720 280" role="img" aria-label="A-star formula">
        <rect x="30" y="70" width="180" height="130" rx="8" fill="#eaf2ff" stroke={BLUE} strokeWidth="2.6" className="ai-anim-merge" />
        <text x="120" y="128" textAnchor="middle" fontSize="42" fontWeight="900" fill={BLUE}>g(n)</text>
        <text x="120" y="168" textAnchor="middle" fontSize="16" fontWeight="700" fill={NAVY}>cost so far</text>
        <text x="248" y="148" textAnchor="middle" fontSize="42" fontWeight="900" fill={NAVY}>+</text>
        <rect x="280" y="70" width="180" height="130" rx="8" fill="#e6fffa" stroke={TEAL} strokeWidth="2.6" className="ai-anim-merge" style={{ animationDelay: '0.15s' }} />
        <text x="370" y="128" textAnchor="middle" fontSize="42" fontWeight="900" fill={TEAL}>h(n)</text>
        <text x="370" y="168" textAnchor="middle" fontSize="16" fontWeight="700" fill={NAVY}>estimated remaining</text>
        <text x="498" y="148" textAnchor="middle" fontSize="42" fontWeight="900" fill={NAVY}>=</text>
        <rect x="530" y="58" width="168" height="154" rx="8" fill="#f3edff" stroke={PURPLE} strokeWidth="3.2" className="ai-anim-pulse" />
        <text x="614" y="128" textAnchor="middle" fontSize="42" fontWeight="900" fill={PURPLE}>f(n)</text>
        <text x="614" y="168" textAnchor="middle" fontSize="16" fontWeight="700" fill={NAVY}>estimated total</text>
      </svg>
    </Scene>
  )
}

export function EightPuzzle({ tiles = [7, 2, 4, 5, 0, 6, 8, 3, 1], goal = false }) {
  return (
    <Scene hud={[goal ? 'Goal board' : 'Start board — tiles physically occupy the canvas']}>
      <div className="ai-puzzle">
        {tiles.map((t, i) => (
          <div key={i} className={t === 0 ? 'ai-tile is-blank' : 'ai-tile ai-anim-grow'}>
            {t || ''}
          </div>
        ))}
      </div>
    </Scene>
  )
}

export function HeuristicCompare() {
  return (
    <Scene hud={['h1 misplaced = 8', 'h2 Manhattan = 18']}>
      <svg viewBox="0 0 720 300" role="img" aria-label="h1 versus h2">
        <text x="180" y="36" textAnchor="middle" fontSize="20" fontWeight="900" fill={BLUE}>h1 — misplaced tiles</text>
        <text x="540" y="36" textAnchor="middle" fontSize="20" fontWeight="900" fill={TEAL}>h2 — Manhattan paths</text>
        {[0, 1, 2].map((r) => [0, 1, 2].map((c) => (
          <rect key={`a${r}${c}`} x={70 + c * 72} y={60 + r * 72} width="64" height="64" rx="6" fill="#fff" stroke={BLUE} strokeWidth="2" />
        )))}
        {[0, 1, 2].map((r) => [0, 1, 2].map((c) => (
          <rect key={`b${r}${c}`} x={430 + c * 72} y={60 + r * 72} width="64" height="64" rx="6" fill="#fff" stroke={TEAL} strokeWidth="2" />
        )))}
        <text x="180" y="270" textAnchor="middle" fontSize="28" fontWeight="900" fill={BLUE}>8</text>
        <text x="540" y="270" textAnchor="middle" fontSize="28" fontWeight="900" fill={TEAL}>18</text>
        <path d="M462 92 H 534" stroke={TEAL} strokeWidth="3" markerEnd="url(#m)" className="ai-anim-trace" />
        <path d="M534 92 V 164" stroke={TEAL} strokeWidth="3" className="ai-anim-trace" />
        <text x="360" y="160" textAnchor="middle" fontSize="16" fontWeight="700" fill={MUTED}>same start · different remaining-cost estimates</text>
      </svg>
    </Scene>
  )
}

export function KnowledgeBaseScene({ facts = ['P', 'P → Q'], derived = 'Q' }) {
  return (
    <Scene hud={['TELL → ASK → infer']}>
      <svg viewBox="0 0 640 300" role="img" aria-label="Knowledge base">
        <rect x="40" y="50" width="220" height="200" rx="18" fill="#f3edff" stroke={PURPLE} strokeWidth="2.4" />
        <text x="150" y="90" textAnchor="middle" fontSize="18" fontWeight="800" fill={PURPLE}>Knowledge Base</text>
        {facts.map((f, i) => (
          <text key={f} x="70" y={130 + i * 32} fontSize="16" fontWeight="700" fill={NAVY}>• {f}</text>
        ))}
        <rect x="380" y="70" width="200" height="70" rx="14" fill="#eaf2ff" stroke={BLUE} strokeWidth="2" className="ai-anim-fire" />
        <text x="480" y="112" textAnchor="middle" fontSize="18" fontWeight="800" fill={BLUE}>Inference</text>
        <rect x="380" y="170" width="200" height="70" rx="14" fill="#eaf8ef" stroke={GREEN} strokeWidth="2.4" className="ai-anim-pulse" />
        <text x="480" y="212" textAnchor="middle" fontSize="20" fontWeight="800" fill={GREEN}>{derived}</text>
        <path d="M260 150 H 380" stroke={PURPLE} strokeWidth="2.4" className="ai-anim-dash" />
      </svg>
    </Scene>
  )
}

export function WumpusCave({ breeze = [[2, 1]], stench = [[1, 2]], gold = [2, 3], agent = [1, 1], pit = [3, 1], wumpus = [1, 3], zoom = null }) {
  const cells = []
  for (let y = 4; y >= 1; y -= 1) {
    for (let x = 1; x <= 4; x += 1) cells.push([x, y])
  }
  const has = (arr, x, y) => arr.some(([a, b]) => a === x && b === y)
  const size = zoom ? 118 : 92
  const origin = zoom ? [agent[0], agent[1]] : [1, 1]
  return (
    <Scene hud={['4×4 cave', zoom ? 'zoom: relevant cells' : 'stench / breeze / glitter']}>
      <svg viewBox="0 0 420 420" role="img" aria-label="Wumpus world">
        {cells.map(([x, y]) => {
          const px = zoom ? 40 + (x - origin[0] + 1) * size : 16 + (x - 1) * size
          const py = zoom ? 40 + (origin[1] - y + 1) * size : 16 + (4 - y) * size
          if (zoom && (Math.abs(x - origin[0]) > 1 || Math.abs(y - origin[1]) > 1)) return null
          const isAgent = agent[0] === x && agent[1] === y
          return (
            <g key={`${x}${y}`}>
              <rect x={px} y={py} width={size - 8} height={size - 8} rx="6" fill={isAgent ? '#eaf2ff' : 'rgba(255,255,255,0.72)'} stroke={NAVY} strokeWidth="1.8" />
              <text x={px + 10} y={py + 20} fontSize="13" fill={MUTED}>{`[${x},${y}]`}</text>
              {pit[0] === x && pit[1] === y && <text x={px + size / 2 - 4} y={py + size / 2} textAnchor="middle" fontSize="18" fontWeight="800" fill={RED}>PIT</text>}
              {wumpus[0] === x && wumpus[1] === y && <text x={px + size / 2 - 4} y={py + size / 2} textAnchor="middle" fontSize="18" fontWeight="800" fill={PURPLE}>W</text>}
              {gold[0] === x && gold[1] === y && <text x={px + size / 2 - 4} y={py + size / 2} textAnchor="middle" fontSize="22" fontWeight="800" fill={AMBER}>★</text>}
              {has(breeze, x, y) && <text x={px + size / 2 - 4} y={py + size - 18} textAnchor="middle" fontSize="13" fontWeight="700" fill={TEAL}>breeze</text>}
              {has(stench, x, y) && <text x={px + size / 2 - 4} y={py + size - 18} textAnchor="middle" fontSize="13" fontWeight="700" fill={PURPLE}>stench</text>}
              {isAgent && <circle cx={px + size / 2 - 4} cy={py + size / 2 - 4} r="12" fill={BLUE} className="ai-anim-pulse" />}
            </g>
          )
        })}
      </svg>
    </Scene>
  )
}

export function LogicInferenceFlow({ premises = ['Socrates is a man', 'All men are mortal'], conclusion = 'Socrates is mortal' }) {
  return (
    <Scene hud={['Laws of thought']}>
      <div style={{ display: 'grid', gap: 10, padding: 18, alignContent: 'center', height: '100%', boxSizing: 'border-box' }}>
        {premises.map((p, i) => (
          <div key={p} className="ai-anim-rise" style={{ animationDelay: `${i * 0.12}s`, background: '#eaf2ff', borderLeft: `5px solid ${BLUE}`, padding: 14, borderRadius: 12, fontWeight: 750, fontSize: 18 }}>
            Premise {i + 1}: {p}
          </div>
        ))}
        <div className="ai-anim-pulse" style={{ background: '#eaf8ef', borderLeft: `5px solid ${GREEN}`, padding: 14, borderRadius: 12, fontWeight: 800, fontSize: 20 }}>
          Conclusion: {conclusion}
        </div>
      </div>
    </Scene>
  )
}

export function ForwardChainingViz({ step = 2 }) {
  const facts = [
    [70, 46, 'American(West)', 1],
    [70, 108, 'Missile(M1)', 1],
    [70, 170, 'Owns(Nono,M1)', 1],
    [70, 232, 'Enemy(Nono,America)', 1],
    [330, 78, 'Weapon(M1)', 2],
    [330, 150, 'Sells(West,M1,Nono)', 2],
    [330, 222, 'Hostile(Nono)', 2],
    [540, 150, 'Criminal(West)', 3],
  ]
  return (
    <Scene hud={[`iteration ${Math.max(1, step - 1)}`, 'facts fire rules → new facts']}>
      <svg viewBox="0 0 720 300" role="img" aria-label="Forward chaining">
        <path d="M250 108 H 320" className="ai-edge" />
        <path d="M250 170 H 320" className="ai-edge" />
        <path d="M250 232 H 320" className="ai-edge" />
        <path d="M500 150 H 530" className={step >= 3 ? 'ai-edge goal' : 'ai-edge'} />
        {facts.filter(([, , , s]) => s <= step).map(([x, y, t, s], i) => (
          <g key={t} className="ai-anim-fire" style={{ animationDelay: `${i * 0.08}s` }}>
            <rect x={x} y={y - 20} width={s === 3 ? 150 : 230} height="40" rx="6" fill={s === 3 ? GREEN : s === 2 ? PURPLE : BLUE} />
            <text x={x + (s === 3 ? 75 : 115)} y={y + 6} textAnchor="middle" fontSize="14" fontWeight="800" fill="#fff">{t}</text>
          </g>
        ))}
      </svg>
    </Scene>
  )
}

export function BackwardChainingViz() {
  return (
    <Scene hud={['Goal: Criminal(West) — reason backward']}>
      <svg viewBox="0 0 720 340" role="img" aria-label="Backward chaining proof tree">
        <rect x="240" y="16" width="240" height="50" rx="8" fill="#eaf8ef" stroke={GREEN} strokeWidth="3" className="ai-anim-pulse" />
        <text x="360" y="48" textAnchor="middle" fontSize="18" fontWeight="900" fill={NAVY}>Criminal(West)?</text>
        <path d="M360 66 V 96" className="ai-edge goal" />
        {['American(West)', 'Weapon(y)', 'Sells(West,y,z)', 'Hostile(z)'].map((t, i) => {
          const x = 28 + i * 175
          return (
            <g key={t} className="ai-anim-back" style={{ animationDelay: `${i * 0.12}s` }}>
              <path d={`M360 96 L ${x + 70} 118`} className="ai-edge" />
              <rect x={x} y="118" width="150" height="46" rx="6" fill="#f3edff" stroke={PURPLE} strokeWidth="2.2" />
              <text x={x + 75} y="148" textAnchor="middle" fontSize="13" fontWeight="800" fill={NAVY}>{t}</text>
              <path d={`M${x + 75} 164 V 196`} className="ai-edge active" />
              <rect x={x + 10} y="196" width="130" height="36" rx="6" fill="#eaf2ff" stroke={BLUE} strokeWidth="1.8" />
              <text x={x + 75} y="220" textAnchor="middle" fontSize="12" fontWeight="700" fill={BLUE}>known fact</text>
            </g>
          )
        })}
        <text x="360" y="270" textAnchor="middle" fontSize="16" fontWeight="800" fill={PURPLE}>AND: prove every premise</text>
        <text x="360" y="298" textAnchor="middle" fontSize="15" fill={MUTED}>OR: choose a matching rule whose head unifies</text>
      </svg>
    </Scene>
  )
}

export function ResolutionScene({ empty = false }) {
  return (
    <Scene hud={['Complementary literals cancel']}>
      <svg viewBox="0 0 720 260" role="img" aria-label="Resolution">
        <rect x="40" y="70" width="200" height="90" rx="8" fill="#eaf2ff" stroke={BLUE} strokeWidth="2.6" />
        <text x="140" y="124" textAnchor="middle" fontSize="28" fontWeight="900" fill={NAVY}>P ∨ Q</text>
        <text x="280" y="124" textAnchor="middle" fontSize="36" fontWeight="900" fill={RED} className="ai-anim-cancel">¬P</text>
        <path d="M330 115 H 400" className="ai-edge active" />
        <rect x="420" y="58" width="260" height="114" rx="8" fill={empty ? '#eaf8ef' : '#fff5db'} stroke={empty ? GREEN : AMBER} strokeWidth="3" className="ai-anim-pulse" />
        <text x="550" y="124" textAnchor="middle" fontSize="26" fontWeight="900" fill={empty ? GREEN : NAVY}>{empty ? '□  empty clause' : 'Q   (resolvent)'}</text>
      </svg>
    </Scene>
  )
}

export function PlanningGraphViz() {
  const cols = [
    ['S0', ['At(P1,JFK)', 'At(C1,JFK)'], BLUE],
    ['A0', ['Load', 'Fly'], PURPLE],
    ['S1', ['In(C1,P1)', 'At(P1,SFO)'], TEAL],
    ['A1', ['Unload', 'Fly'], PURPLE],
    ['S2', ['At(C1,SFO)'], GREEN],
  ]
  return (
    <Scene hud={['S0 → A0 → S1 → A1 → S2']}>
      <svg viewBox="0 0 720 300" role="img" aria-label="Planning graph">
        {cols.map(([label, facts, color], i) => (
          <g key={label} className="ai-anim-rise" style={{ animationDelay: `${i * 0.1}s` }}>
            <rect x={18 + i * 142} y="36" width="128" height="210" rx="6" fill="rgba(255,255,255,0.55)" stroke={color} strokeWidth="2.4" />
            <text x={82 + i * 142} y="64" textAnchor="middle" fontSize="18" fontWeight="900" fill={color}>{label}</text>
            {facts.map((f, j) => (
              <text key={f} x={82 + i * 142} y={110 + j * 36} textAnchor="middle" fontSize="13" fontWeight="700" fill={NAVY}>{f}</text>
            ))}
            {i < cols.length - 1 && <path d={`M${146 + i * 142} 140 H ${160 + i * 142}`} className="ai-edge active" />}
          </g>
        ))}
        <path d="M82 250 L 210 250" stroke={RED} strokeWidth="1.6" opacity="0.5" />
        <text x="360" y="290" textAnchor="middle" fontSize="14" fontWeight="700" fill={MUTED}>mutex links mark impossible pairs inside a layer</text>
      </svg>
    </Scene>
  )
}

export function UnificationScene() {
  return (
    <Scene hud={['UNIFY(Knows(John, x), Knows(John, Jane))']}>
      <svg viewBox="0 0 720 280" role="img" aria-label="Unification">
        <text x="180" y="80" textAnchor="middle" fontSize="24" fontWeight="800" fill={NAVY} className="ai-anim-merge">Knows(John, x)</text>
        <text x="540" y="80" textAnchor="middle" fontSize="24" fontWeight="800" fill={NAVY} className="ai-anim-merge" style={{ animationDelay: '0.15s' }}>Knows(John, Jane)</text>
        <path d="M300 90 H 420" className="ai-edge active" />
        <text x="360" y="140" textAnchor="middle" fontSize="16" fontWeight="700" fill={MUTED}>predicate matches · John matches · x binds</text>
        <rect x="200" y="170" width="320" height="70" rx="8" fill="#eaf8ef" stroke={GREEN} strokeWidth="3" className="ai-anim-pulse" />
        <text x="360" y="214" textAnchor="middle" fontSize="28" fontWeight="900" fill={GREEN}>θ = {'{x / Jane}'}</text>
      </svg>
    </Scene>
  )
}

export function PictureSummary({ title, items }) {
  return (
    <Scene hud={['Module in one picture']}>
      <svg viewBox="0 0 720 280" role="img" aria-label={title}>
        <text x="360" y="36" textAnchor="middle" fontSize="18" fontWeight="800" fill={MUTED}>{title}</text>
        {items.map((item, i) => {
          const x = 40 + (i % 5) * 140
          const y = i < 5 ? 110 : 200
          return (
            <g key={item} className="ai-anim-rise" style={{ animationDelay: `${i * 0.08}s` }}>
              <circle cx={x + 50} cy={y} r="32" fill={i === items.length - 1 ? '#eaf8ef' : '#eaf2ff'} stroke={i === items.length - 1 ? GREEN : BLUE} strokeWidth="2.6" />
              <text x={x + 50} y={y + 5} textAnchor="middle" fontSize="12" fontWeight="800" fill={NAVY}>{item}</text>
              {i < items.length - 1 && i !== 4 && <path d={`M${x + 82} ${y} H ${x + 140}`} className="ai-edge active" />}
            </g>
          )
        })}
      </svg>
    </Scene>
  )
}

export function GoalStackPlanner() {
  return (
    <Scene hud={['Blocks world — initial → action → goal']}>
      <svg viewBox="0 0 720 280" role="img" aria-label="Blocks world">
        <text x="120" y="36" textAnchor="middle" fontSize="16" fontWeight="800" fill={MUTED}>INITIAL</text>
        <rect x="70" y="70" width="90" height="40" fill={BLUE} />
        <text x="115" y="96" textAnchor="middle" fontSize="20" fontWeight="800" fill="#fff">A</text>
        <rect x="70" y="110" width="90" height="40" fill={PURPLE} />
        <text x="115" y="136" textAnchor="middle" fontSize="20" fontWeight="800" fill="#fff">B</text>
        <rect x="50" y="150" width="130" height="10" fill={NAVY} />
        <text x="360" y="90" textAnchor="middle" fontSize="16" fontWeight="800" fill={AMBER}>PRECOND</text>
        <text x="360" y="128" textAnchor="middle" fontSize="22" fontWeight="900" fill={BLUE}>MOVE</text>
        <text x="360" y="166" textAnchor="middle" fontSize="16" fontWeight="800" fill={GREEN}>EFFECT</text>
        <path d="M210 130 H 280" className="ai-edge active" />
        <path d="M440 130 H 510" className="ai-edge goal" />
        <text x="600" y="36" textAnchor="middle" fontSize="16" fontWeight="800" fill={GREEN}>GOAL</text>
        <rect x="555" y="70" width="90" height="40" fill={PURPLE} className="ai-anim-pulse" />
        <text x="600" y="96" textAnchor="middle" fontSize="20" fontWeight="800" fill="#fff">B</text>
        <rect x="555" y="110" width="90" height="40" fill={BLUE} />
        <text x="600" y="136" textAnchor="middle" fontSize="20" fontWeight="800" fill="#fff">A</text>
        <rect x="535" y="150" width="130" height="10" fill={NAVY} />
      </svg>
    </Scene>
  )
}

export function ComparePanel({ leftTitle, rightTitle, left, right, leftColor = BLUE, rightColor = PURPLE }) {
  return (
    <Scene>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, padding: 14, height: '100%', boxSizing: 'border-box' }}>
        <div style={{ background: '#fff', border: `2px solid ${leftColor}`, borderRadius: 16, padding: 14 }}>
          <strong style={{ color: leftColor, fontSize: 18 }}>{leftTitle}</strong>
          <ul className="ai-points" style={{ marginTop: 10 }}>{left.map((x) => <li key={x}>{x}</li>)}</ul>
        </div>
        <div style={{ background: '#fff', border: `2px solid ${rightColor}`, borderRadius: 16, padding: 14 }}>
          <strong style={{ color: rightColor, fontSize: 18 }}>{rightTitle}</strong>
          <ul className="ai-points" style={{ marginTop: 10 }}>{right.map((x) => <li key={x}>{x}</li>)}</ul>
        </div>
      </div>
    </Scene>
  )
}

export function ComplexityBoard({ rows }) {
  return (
    <Scene hud={['b branching · d depth · m max path']}>
      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr repeat(4, 1fr)', gap: 6, padding: 16, height: '100%', boxSizing: 'border-box', alignContent: 'center', fontWeight: 750 }}>
        {['', 'Complete', 'Optimal', 'Time', 'Space'].map((h) => (
          <div key={h} style={{ color: MUTED, fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{h}</div>
        ))}
        {rows.flatMap((r, ri) => r.map((cell, ci) => (
          <div key={`${ri}-${ci}`} style={{ background: '#fff', borderRadius: 10, padding: '8px 10px', fontSize: 15 }}>{cell}</div>
        )))}
      </div>
    </Scene>
  )
}

export function DividerScene({ kicker, title, line }) {
  return (
    <div className="ai-opener">
      <div>
        <div className="ai-opener-kicker">{kicker}</div>
        <h2>{title}</h2>
        <p>{line}</p>
      </div>
    </div>
  )
}

