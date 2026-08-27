/* Living instructional visuals for Theory of Computation V2.0.
   Configurable SVG scenes + reusable primitives.
   Paired stylesheet: src/tocViz.css (imported once here).

   Design contract:
   - Static first frame is COMPLETE (structure at full opacity; only motion
     elements animate). Diagrams restart on slide revisit (deck remounts).
   - No academic content lives here — only pictures of computation.
*/
import '../tocViz.css'

/* ------------------------------------------------------------------ *
 * Primitives
 * ------------------------------------------------------------------ */

export function StateNode({
  x, y, r = 28, label = 'q', accept = false, active = false, ghost = false, reject = false, delay = 0,
}) {
  const cls = [
    'tv-state',
    accept ? 'accept' : '',
    active ? 'active' : '',
    ghost ? 'ghost' : '',
    reject ? 'reject' : '',
  ].filter(Boolean).join(' ')
  return (
    <g className={cls} style={{ '--tv-i': `${delay}s` }}>
      <circle className="tv-state-glow" cx={x} cy={y} r={r + 10} />
      {accept && <circle className="tv-state-ring" cx={x} cy={y} r={r - 6} />}
      <circle className="tv-state-body" cx={x} cy={y} r={r} />
      <text className="tv-t-label" x={x} y={y + 5} textAnchor="middle" fontSize="14">{label}</text>
    </g>
  )
}

export function TransitionEdge({
  x1, y1, x2, y2, label, lit = false, nfa = false, epsilon = false, curved = false,
}) {
  const mx = (x1 + x2) / 2
  const my = (y1 + y2) / 2 - (curved ? 28 : 0)
  const d = curved
    ? `M ${x1} ${y1} Q ${mx} ${my} ${x2} ${y2}`
    : `M ${x1} ${y1} L ${x2} ${y2}`
  const cls = ['tv-edge', lit ? 'lit' : '', nfa ? 'nfa' : '', epsilon ? 'epsilon' : ''].filter(Boolean).join(' ')
  const angle = Math.atan2(y2 - y1, x2 - x1)
  const ax = x2 - Math.cos(angle) * 30
  const ay = y2 - Math.sin(angle) * 30
  return (
    <g>
      <path className={cls} d={d} markerEnd="url(#tv-arrow)" />
      {label && (
        <text className="tv-edge-label" x={mx} y={my - (curved ? 6 : 8)} textAnchor="middle">{label}</text>
      )}
      <polygon
        className={lit ? 'tv-fill-lit' : ''}
        points={`${ax},${ay} ${ax - 7},${ay - 4} ${ax - 7},${ay + 4}`}
        fill={lit ? '#2f6bff' : '#b8c2d4'}
        transform={`rotate(${(angle * 180) / Math.PI} ${ax} ${ay})`}
      />
    </g>
  )
}

function SvgShell({ viewBox = '0 0 640 360', children, label }) {
  return (
    <svg className="tv-svg" viewBox={viewBox} role="img" aria-label={label}>
      <defs>
        <marker id="tv-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill="#b8c2d4" />
        </marker>
      </defs>
      {children}
    </svg>
  )
}

export function TapeStrip({
  symbols = ['0', '1', '0', '1'], cursor = 1, x = 80, y = 28, cell = 44,
}) {
  return (
    <g>
      <rect className="tv-tape-frame" x={x - 10} y={y - 8} width={symbols.length * cell + 20} height={cell + 16} rx="10" />
      {symbols.map((sym, i) => {
        const cx = x + i * cell
        const cls = [
          'tv-tape-cell',
          i < cursor ? 'consumed' : '',
          i === cursor ? 'current' : '',
          i > cursor ? 'future' : '',
        ].filter(Boolean).join(' ')
        return (
          <g key={`${sym}-${i}`}>
            <rect className={cls} x={cx} y={y} width={cell - 6} height={cell} rx="8" />
            <text className="tv-t-mono" x={cx + (cell - 6) / 2} y={y + cell / 2 + 5} textAnchor="middle" fontSize="16" fill="#172033">{sym}</text>
          </g>
        )
      })}
      <polygon
        className="tv-sym-cursor"
        points={`${x + cursor * cell + (cell - 6) / 2 - 7},${y + cell + 10} ${x + cursor * cell + (cell - 6) / 2 + 7},${y + cell + 10} ${x + cursor * cell + (cell - 6) / 2},${y + cell + 20}`}
      />
    </g>
  )
}

/* ------------------------------------------------------------------ *
 * LivingDfa — railway network that consumes "ends with 01"
 * ------------------------------------------------------------------ */
export function LivingDfa({
  input = ['0', '1', '0', '1'],
  active = 'q1',
  litEdge = '01',
  result = null,
}) {
  const states = {
    q0: { x: 130, y: 210, accept: false },
    q1: { x: 300, y: 210, accept: false },
    q2: { x: 470, y: 210, accept: true },
  }
  const cursor = Math.min(
    input.length,
    active === 'q0' ? 0 : active === 'q1' ? 1 : active === 'q2' ? 2 : 3,
  )
  return (
    <SvgShell viewBox="0 0 620 340" label="Living DFA recognizing strings ending in 01">
      <text className="tv-t-cap" x="24" y="24" fontSize="11">Input tape</text>
      <TapeStrip symbols={input} cursor={Math.min(cursor, input.length - 1)} x={120} y={36} />
      <text className="tv-t-sub" x="24" y="120" fontSize="12">Railway of decisions — stations are states, tracks are transitions</text>

      <TransitionEdge x1={80} y1={210} x2={102} y2={210} label="start" lit={active === 'q0'} />
      <TransitionEdge x1={158} y1={210} x2={272} y2={210} label="1" lit={litEdge === '1' || litEdge === '01'} />
      <TransitionEdge x1={328} y1={210} x2={442} y2={210} label="0" lit={litEdge === '0' || litEdge === '01'} />
      <TransitionEdge x1={130} y1={238} x2={130} y2={290} label="0" curved lit={false} />
      <path className="tv-edge" d="M 130 290 Q 210 320 300 238" />
      <text className="tv-edge-label" x="210" y="318" textAnchor="middle">0-loop</text>
      <path className={`tv-edge ${litEdge === '1' ? 'lit' : ''}`} d="M 300 182 Q 385 120 470 182" />
      <text className="tv-edge-label" x="385" y="128" textAnchor="middle">1</text>

      {Object.entries(states).map(([id, s]) => (
        <StateNode key={id} x={s.x} y={s.y} label={id} accept={s.accept} active={active === id} />
      ))}

      {result && (
        <g>
          <rect x="480" y="280" width="110" height="36" rx="18" fill={result === 'Accept' ? '#17a06b' : '#c45c6a'} />
          <text x="535" y="303" textAnchor="middle" fill="#fff" fontWeight="900" fontSize="14">{result}</text>
        </g>
      )}
      <text className="tv-t-sub" x="24" y="320" fontSize="12">Current: {active} · reading · next transition lights up</text>
    </SvgShell>
  )
}

/** Auto-running DFA for “ends with 01” on 0101 */
export function LivingDfaRun({ input = ['0', '1', '0', '1'] }) {
  return (
    <SvgShell viewBox="0 0 640 360" label="DFA executing on input, symbol by symbol">
      <text className="tv-t-cap" x="24" y="22" fontSize="11">Watch the machine decide</text>
      <TapeStrip symbols={input} cursor={0} x={140} y={34} />
      {/* animated cursor phases via duplicate tapes fading */}
      <g className="tv-exec-step" style={{ '--tv-i': '0s' }}>
        <TapeStrip symbols={input} cursor={0} x={140} y={34} />
      </g>
      <g className="tv-exec-step" style={{ '--tv-i': '2.5s', opacity: 0 }}>
        <TapeStrip symbols={input} cursor={1} x={140} y={34} />
      </g>

      <TransitionEdge x1={70} y1={220} x2={108} y2={220} label="start" lit />
      <path className="tv-edge lit" d="M 165 220 L 255 220" />
      <text className="tv-edge-label" x="210" y="208" textAnchor="middle">1</text>
      <path className="tv-edge lit" d="M 335 220 L 425 220" />
      <text className="tv-edge-label" x="380" y="208" textAnchor="middle">0→1 path</text>

      <StateNode x={140} y={220} label="q0" active />
      <StateNode x={300} y={220} label="q1" />
      <StateNode x={460} y={220} label="q2" accept />

      <g className="tv-phase" style={{ '--tv-phase': '0s' }}>
        <StateNode x={140} y={220} label="q0" active />
      </g>
      <g className="tv-phase" style={{ '--tv-phase': '2.5s' }}>
        <StateNode x={300} y={220} label="q1" active />
      </g>
      <g className="tv-phase" style={{ '--tv-phase': '5s' }}>
        <StateNode x={460} y={220} label="q2" accept active />
      </g>

      <rect className="tv-tm-accept" x="500" y="300" width="110" height="34" rx="17" />
      <text className="tv-tm-accept" x="555" y="322" textAnchor="middle" fill="#fff" fontWeight="900" fontSize="13">ACCEPT</text>
      <text className="tv-t-sub" x="24" y="340" fontSize="12">Input → state → transition → next state → accept</text>
    </SvgShell>
  )
}

/* ------------------------------------------------------------------ *
 * LivingNfa — branching active sets
 * ------------------------------------------------------------------ */
export function LivingNfa() {
  return (
    <SvgShell viewBox="0 0 640 360" label="NFA with multiple active states after reading a">
      <text className="tv-t-cap" x="24" y="22" fontSize="11">Nondeterminism — several stations light at once</text>
      <TapeStrip symbols={['a', 'b', 'a']} cursor={0} x={160} y={32} />

      <path className="tv-edge nfa lit" d="M 160 200 L 260 140" />
      <path className="tv-edge nfa lit" d="M 160 200 L 260 260" />
      <path className="tv-edge nfa" d="M 300 140 L 420 200" />
      <path className="tv-edge nfa" d="M 300 260 L 420 200" />
      <text className="tv-edge-label" x="200" y="150">a</text>
      <text className="tv-edge-label" x="200" y="250">a</text>
      <text className="tv-edge-label" x="350" y="155">b</text>
      <text className="tv-edge-label" x="350" y="265">ε</text>

      <StateNode x={130} y={200} label="q0" active />
      <StateNode x={290} y={140} label="q1" active />
      <StateNode x={290} y={260} label="q2" active />
      <StateNode x={460} y={200} label="q3" accept />

      <rect x="500" y="40" width="120" height="70" rx="12" fill="rgba(255,255,255,0.9)" stroke="rgba(20,29,46,0.12)" />
      <text className="tv-t-cap" x="560" y="62" textAnchor="middle" fontSize="10">Active set</text>
      <text className="tv-t-label" x="560" y="88" textAnchor="middle" fontSize="14">{'{q0,q1,q2}'}</text>
      <text className="tv-t-sub" x="24" y="340" fontSize="12">Accept if ANY active path ends in an accept state</text>
    </SvgShell>
  )
}

/* ------------------------------------------------------------------ *
 * LivingPda — physical stack + input
 * ------------------------------------------------------------------ */
export function LivingPda({
  input = ['(', '(', ')', ')'],
  cursor = 2,
  stack = ['Z', '('],
  stage = 'push',
}) {
  const stackX = 460
  const baseY = 300
  return (
    <SvgShell viewBox="0 0 640 360" label="Pushdown automaton with physical stack">
      <text className="tv-t-cap" x="24" y="22" fontSize="11">Input</text>
      <TapeStrip symbols={input} cursor={cursor} x={40} y={36} cell={40} />

      <text className="tv-t-cap" x="40" y="130" fontSize="11">Control</text>
      <StateNode x={120} y={200} label="q" active />
      <StateNode x={260} y={200} label="qf" accept={stage === 'accept'} active={stage === 'accept'} />
      <path className={`tv-edge ${stage !== 'idle' ? 'lit' : ''}`} d="M 148 200 L 232 200" />
      <text className="tv-edge-label" x="190" y="188">{stage === 'pop' ? ')/pop' : '(/push'}</text>

      <text className="tv-t-cap" x={stackX} y="70" fontSize="11" textAnchor="middle">Stack</text>
      <rect className="tv-stack-frame" x={stackX - 50} y={90} width="100" height="220" rx="14" />
      <text className="tv-t-sub" x={stackX} y="328" textAnchor="middle" fontSize="11">top ↑</text>
      {stack.map((sym, i) => {
        const y = baseY - 36 - i * 42
        const isTop = i === stack.length - 1
        return (
          <g key={`${sym}-${i}`}>
            <rect
              className={`tv-stack-item ${isTop ? 'top' : ''} ${stage === 'pop' && isTop ? 'popping' : ''}`}
              x={stackX - 36}
              y={y}
              width="72"
              height="34"
              rx="8"
              style={{ '--tv-i': `${i * 0.12}s` }}
            />
            <text className="tv-t-label" x={stackX} y={y + 22} textAnchor="middle" fontSize="15">{sym}</text>
          </g>
        )
      })}
      <text className="tv-t-sub" x="24" y="340" fontSize="12">
        {stage === 'push' && 'Push — stack grows, top highlighted'}
        {stage === 'pop' && 'Pop — top leaves, stack shrinks'}
        {stage === 'accept' && 'Empty stack / accept state — destination reached'}
        {stage === 'idle' && 'Memory (the stack) changes what the machine can decide'}
      </text>
    </SvgShell>
  )
}

/* ------------------------------------------------------------------ *
 * LivingParseTree — organic growth
 * ------------------------------------------------------------------ */
export function LivingParseTree() {
  const nodes = [
    { id: 'E', x: 320, y: 60, d: 0 },
    { id: 'E', x: 180, y: 140, d: 0.15 },
    { id: '+', x: 320, y: 140, d: 0.2, leaf: true },
    { id: 'T', x: 460, y: 140, d: 0.25 },
    { id: 'id', x: 120, y: 230, d: 0.4, leaf: true },
    { id: '*', x: 420, y: 230, d: 0.45, leaf: true },
    { id: 'id', x: 520, y: 230, d: 0.5, leaf: true },
    { id: 'T', x: 180, y: 230, d: 0.35 },
  ]
  return (
    <SvgShell viewBox="0 0 640 320" label="Parse tree growing from productions">
      <text className="tv-t-cap" x="24" y="22" fontSize="11">Production expands → branches grow → sentence appears</text>
      <path className="tv-tree-edge" d="M 320 80 L 180 120" />
      <path className="tv-tree-edge" d="M 320 80 L 320 120" />
      <path className="tv-tree-edge" d="M 320 80 L 460 120" />
      <path className="tv-tree-edge" d="M 180 160 L 120 210" />
      <path className="tv-tree-edge" d="M 180 160 L 180 210" />
      <path className="tv-tree-edge" d="M 460 160 L 420 210" />
      <path className="tv-tree-edge" d="M 460 160 L 520 210" />
      {nodes.filter((n) => n.id !== 'T' || n.y !== 230).map((n) => (
        <g key={`${n.id}-${n.x}-${n.y}`}>
          <circle
            className={`tv-tree-node ${n.leaf ? 'leaf' : ''}`}
            cx={n.x}
            cy={n.y}
            r={n.leaf ? 20 : 24}
            style={{ '--tv-i': `${n.d}s` }}
          />
          <text className="tv-t-label" x={n.x} y={n.y + 5} textAnchor="middle" fontSize="13">{n.id}</text>
        </g>
      ))}
      <circle className="tv-tree-node" cx={180} cy={230} r={22} style={{ '--tv-i': '0.35s' }} />
      <text className="tv-t-label" x={180} y={235} textAnchor="middle" fontSize="13">T</text>
      <text className="tv-t-sub" x="24" y="300" fontSize="12">Leaves left-to-right: id + id * id</text>
    </SvgShell>
  )
}

export function LivingAmbiguity() {
  return (
    <SvgShell viewBox="0 0 640 320" label="Two parse trees for the same sentence — ambiguity">
      <text className="tv-t-cap" x="24" y="22" fontSize="11">Same string, two structures</text>
      {/* left tree */}
      <circle className="tv-tree-node ambig" cx="160" cy="70" r="22" style={{ '--tv-i': '0s' }} />
      <text className="tv-t-label" x="160" y="75" textAnchor="middle" fontSize="12">E</text>
      <path className="tv-tree-edge" d="M160 92 L100 140" />
      <path className="tv-tree-edge" d="M160 92 L220 140" />
      <circle className="tv-tree-node leaf" cx="100" cy="160" r="18" style={{ '--tv-i': '0.2s' }} />
      <circle className="tv-tree-node leaf" cx="220" cy="160" r="18" style={{ '--tv-i': '0.25s' }} />
      <text className="tv-t-label" x="100" y="165" textAnchor="middle" fontSize="11">a</text>
      <text className="tv-t-label" x="220" y="165" textAnchor="middle" fontSize="11">+</text>
      <text className="tv-t-sub" x="160" y="220" textAnchor="middle" fontSize="12">Tree A</text>

      {/* right tree */}
      <circle className="tv-tree-node ambig" cx="480" cy="70" r="22" style={{ '--tv-i': '0.1s' }} />
      <text className="tv-t-label" x="480" y="75" textAnchor="middle" fontSize="12">E</text>
      <path className="tv-tree-edge" d="M480 92 L420 140" />
      <path className="tv-tree-edge" d="M480 92 L540 140" />
      <circle className="tv-tree-node leaf" cx="420" cy="160" r="18" style={{ '--tv-i': '0.3s' }} />
      <circle className="tv-tree-node leaf" cx="540" cy="160" r="18" style={{ '--tv-i': '0.35s' }} />
      <text className="tv-t-label" x="420" y="165" textAnchor="middle" fontSize="11">*</text>
      <text className="tv-t-label" x="540" y="165" textAnchor="middle" fontSize="11">a</text>
      <text className="tv-t-sub" x="480" y="220" textAnchor="middle" fontSize="12">Tree B</text>

      <text className="tv-t-label" x="320" y="280" textAnchor="middle" fontSize="16">one sentence → two meanings</text>
    </SvgShell>
  )
}

/* ------------------------------------------------------------------ *
 * LivingTuringMachine — signature animation
 * ------------------------------------------------------------------ */
export function LivingTuringMachine() {
  const cells = ['□', '1', '1', '0', '1', '□', '□']
  return (
    <SvgShell viewBox="0 0 680 340" label="Turing machine reading, writing, and moving on an infinite tape">
      <text className="tv-t-cap" x="24" y="24" fontSize="11">Infinite road · explorer head · read → write → move</text>
      <path className="tv-tm-rail" d="M 40 160 H 640" />
      {cells.map((c, i) => {
        const x = 60 + i * 80
        const active = i === 2
        const written = i === 3
        return (
          <g key={i}>
            <rect
              className={`tv-tm-cell ${active ? 'active' : ''} ${written ? 'written' : ''}`}
              x={x}
              y={120}
              width="64"
              height="64"
              rx="10"
            />
            <text className="tv-t-mono" x={x + 32} y={158} textAnchor="middle" fontSize="20" fill="#172033">{c}</text>
          </g>
        )
      })}
      <g className="tv-head" transform="translate(188 70)">
        <polygon points="32,40 16,18 48,18" />
        <rect x="10" y="0" width="44" height="22" rx="6" />
        <text className="tv-head-label" x="32" y="15" textAnchor="middle">q</text>
      </g>
      <rect className="tv-tm-state-badge" x="40" y="230" width="160" height="36" rx="18" />
      <text x="120" y="253" textAnchor="middle" fill="#fff" fontWeight="850" fontSize="13">state · read · write</text>
      <rect className="tv-tm-accept" x="480" y="230" width="140" height="36" rx="18" />
      <text className="tv-tm-accept" x="550" y="253" textAnchor="middle" fill="#fff" fontWeight="900" fontSize="13">HALT / ACCEPT</text>
      <text className="tv-t-sub" x="24" y="310" fontSize="12">Tape extends as the head explores — the first computer thinking aloud</text>
    </SvgShell>
  )
}

export function HaltingMetaphor() {
  return (
    <SvgShell viewBox="0 0 640 300" label="Halting intuition — destination reached versus endless road">
      <text className="tv-t-cap" x="24" y="24" fontSize="11">Decidability intuition</text>
      <path className="tv-tm-rail" d="M 40 120 H 280" />
      <path className="tv-tm-rail" d="M 360 120 H 600" strokeDasharray="8 8" />
      <circle cx="260" cy="120" r="22" fill="#17a06b" />
      <text x="260" y="126" textAnchor="middle" fill="#fff" fontWeight="900" fontSize="12">✓</text>
      <circle className="tv-token" cx="400" cy="120" r="10" style={{ '--tv-dx': '140px', '--tv-i': '0s' }} />
      <text className="tv-t-label" x="160" y="180" textAnchor="middle" fontSize="14">Halts · destination</text>
      <text className="tv-t-label" x="480" y="180" textAnchor="middle" fontSize="14">May run forever</text>
      <text className="tv-t-sub" x="320" y="250" textAnchor="middle" fontSize="13">No general algorithm knows which road your machine is on</text>
    </SvgShell>
  )
}

/* ------------------------------------------------------------------ *
 * RegexWeave + decision gate + language city
 * ------------------------------------------------------------------ */
export function RegexWeave() {
  return (
    <SvgShell viewBox="0 0 640 300" label="Regular expression patterns weaving into a language">
      <text className="tv-t-cap" x="24" y="24" fontSize="11">Alphabet → pattern → language</text>
      <path className="tv-regex-path lit" d="M 60 150 C 160 60, 260 240, 360 150 S 520 80, 580 150" />
      {['0', '1', '*', '(', ')', '+'].map((b, i) => (
        <g key={b}>
          <circle
            className={`tv-regex-bead ${i % 3 === 1 ? 'teal' : i % 3 === 2 ? 'amber' : ''}`}
            cx={90 + i * 80}
            cy={150}
            r="18"
            style={{ '--tv-i': `${i * 0.12}s` }}
          />
          <text className="tv-t-label" x={90 + i * 80} y={155} textAnchor="middle" fill="#fff" fontSize="13">{b}</text>
        </g>
      ))}
      <text className="tv-t-sub" x="320" y="250" textAnchor="middle" fontSize="13">(0+1)*01 — building blocks that describe a whole city of strings</text>
    </SvgShell>
  )
}

export function DecisionGate() {
  return (
    <SvgShell viewBox="0 0 640 300" label="Strings arriving at accept or reject gate">
      <text className="tv-t-cap" x="24" y="24" fontSize="11">Why automata exist — filter the language</text>
      <rect className="tv-gate-body" x="260" y="90" width="120" height="120" rx="16" />
      <text className="tv-t-label" x="320" y="155" textAnchor="middle" fontSize="14">Machine</text>
      <circle className="tv-gate-go" cx="470" cy="120" r="28" />
      <circle className="tv-gate-stop" cx="470" cy="200" r="28" />
      <text x="470" y="125" textAnchor="middle" fill="#fff" fontWeight="900">IN</text>
      <text x="470" y="205" textAnchor="middle" fill="#fff" fontWeight="900">OUT</text>
      {[0, 1, 2].map((i) => (
        <circle key={i} className="tv-token" cx={80} cy={150} r="9" style={{ '--tv-dx': '170px', '--tv-i': `${i * 0.7}s` }} />
      ))}
      <text className="tv-t-sub" x="24" y="270" fontSize="12">Input arrives · machine reads · decision evolves · accept or reject</text>
    </SvgShell>
  )
}

export function EpsilonClosureViz() {
  return (
    <SvgShell viewBox="0 0 640 320" label="Epsilon closure expanding from a state">
      <text className="tv-t-cap" x="24" y="22" fontSize="11">ε-closure — free rides without consuming input</text>
      <path className="tv-edge epsilon lit" d="M 180 160 L 300 100" />
      <path className="tv-edge epsilon lit" d="M 180 160 L 300 220" />
      <path className="tv-edge epsilon" d="M 300 100 L 420 160" />
      <text className="tv-edge-label" x="230" y="110">ε</text>
      <text className="tv-edge-label" x="230" y="210">ε</text>
      <text className="tv-edge-label" x="350" y="115">ε</text>
      <StateNode x={150} y={160} label="q0" active />
      <StateNode x={300} y={100} label="q1" active />
      <StateNode x={300} y={220} label="q2" active />
      <StateNode x={450} y={160} label="q3" active accept />
      <text className="tv-t-label" x="320" y="290" textAnchor="middle" fontSize="14">ε-closure(q0) = {'{q0,q1,q2,q3}'}</text>
    </SvgShell>
  )
}

export function SubsetConstructionViz() {
  return (
    <SvgShell viewBox="0 0 640 320" label="NFA subsets becoming DFA states">
      <text className="tv-t-cap" x="24" y="22" fontSize="11">Subset construction — sets become single stations</text>
      <StateNode x={120} y={100} label="q0" ghost />
      <StateNode x={120} y={200} label="q1" ghost />
      <StateNode x={220} y={150} label="q2" ghost />
      <path className="tv-edge lit" d="M 260 150 L 360 150" />
      <StateNode x={420} y={150} label="{0,1}" active accept />
      <text className="tv-t-sub" x="320" y="280" textAnchor="middle" fontSize="13">Each DFA state = a set of NFA states</text>
    </SvgShell>
  )
}

export function DerivationTrail({ side = 'left' }) {
  const steps = side === 'left'
    ? ['E', 'E + T', 'id + T', 'id + id']
    : ['E', 'E + T', 'E + id', 'id + id']
  return (
    <SvgShell viewBox="0 0 640 280" label={`${side === 'left' ? 'Leftmost' : 'Rightmost'} derivation trail`}>
      <text className="tv-t-cap" x="24" y="22" fontSize="11">{side === 'left' ? 'Leftmost derivation' : 'Rightmost derivation'}</text>
      {steps.map((s, i) => (
        <g key={s}>
          <rect
            className="tv-tree-node"
            x={80 + i * 130}
            y={110}
            width={110}
            height={44}
            rx="10"
            style={{ '--tv-i': `${i * 0.18}s` }}
          />
          <text className="tv-t-label" x={135 + i * 130} y={138} textAnchor="middle" fontSize="14">{s}</text>
          {i < steps.length - 1 && (
            <path className="tv-edge lit" d={`M ${190 + i * 130} 132 L ${210 + i * 130} 132`} />
          )}
        </g>
      ))}
      <text className="tv-t-sub" x="24" y="220" fontSize="12">Each arrow is one production — structure takes shape</text>
    </SvgShell>
  )
}

export function MinimizationMerge() {
  return (
    <SvgShell viewBox="0 0 640 300" label="Equivalent DFA states merging during minimization">
      <text className="tv-t-cap" x="24" y="22" fontSize="11">Minimization — indistinguishable states merge</text>
      <StateNode x={120} y={150} label="A" active />
      <StateNode x={220} y={150} label="B" active />
      <path className="tv-edge lit" d="M 260 150 L 340 150" />
      <StateNode x={400} y={150} label="AB" accept active />
      <text className="tv-t-sub" x="320" y="250" textAnchor="middle" fontSize="13">Same future behaviour → one station</text>
    </SvgShell>
  )
}

export function LanguageCity() {
  return (
    <SvgShell viewBox="0 0 640 300" label="Alphabet strings forming a language city">
      <text className="tv-t-cap" x="24" y="22" fontSize="11">Σ* is the map · L is the neighbourhood we care about</text>
      <rect x="80" y="60" width="480" height="180" rx="16" fill="none" stroke="#2f6bff" strokeDasharray="6 6" strokeWidth="2" />
      <text className="tv-t-label" x="100" y="90" fontSize="16">Σ*</text>
      <circle cx="280" cy="150" r="70" fill="rgba(15,157,148,0.15)" stroke="#0f9d94" strokeWidth="2" />
      <text className="tv-t-label" x="280" y="155" textAnchor="middle" fontSize="18">L</text>
      {['ε', '0', '01', '101'].map((s, i) => (
        <g key={s}>
          <circle className="tv-regex-bead teal" cx={200 + i * 55} cy={150} r="14" style={{ '--tv-i': `${i * 0.1}s` }} />
          <text x={200 + i * 55} y={154} textAnchor="middle" fill="#fff" fontSize="10" fontWeight="800">{s}</text>
        </g>
      ))}
    </SvgShell>
  )
}
