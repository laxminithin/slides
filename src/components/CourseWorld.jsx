/**
 * CourseWorld — the per-subject ambient visual identity (section 7 of the brief).
 *
 * Each subject gets its own quiet, animated "world" that reads instantly:
 *   data      → drifting data streams + node grid
 *   security  → encryption lattice + scanning shield
 *   database  → stacked cylinders + linked records
 *   network   → nodes with a travelling packet
 *   automata  → states, transitions, an accepting ring
 *   parallel  → a grid of cores lighting in waves
 *   java      → source code, bytecode and the JVM runtime path
 *   global    → a globe with orbiting trade routes
 *   research  → question narrowing into protected innovation
 *
 * Pure inline SVG + CSS animation (animation lives in universe.css). No deps,
 * theme-safe via currentColor / the subject tint passed by the parent.
 * `variant` = 'card' (compact, in a course card) | 'hero' (large, on landing).
 */
export default function CourseWorld({ world = 'data', variant = 'card', className = '' }) {
  const cls = `course-world course-world-${world} cw-${variant} ${className}`.trim()
  return (
    <div className={cls} aria-hidden="true">
      <svg viewBox="0 0 240 160" preserveAspectRatio="xMidYMid slice" role="presentation">
        {world === 'data' && <WorldData />}
        {world === 'security' && <WorldSecurity />}
        {world === 'database' && <WorldDatabase />}
        {world === 'network' && <WorldNetwork />}
        {world === 'automata' && <WorldAutomata />}
        {world === 'parallel' && <WorldParallel />}
        {world === 'java' && <WorldJava />}
        {world === 'global' && <WorldGlobal />}
        {world === 'research' && <WorldResearch />}
        {world === 'chemistry' && <WorldChemistry />}
        {world === 'deep-learning' && <WorldDeepLearning />}
        {world === 'os' && <WorldOS />}
        {world === 'ai' && <WorldAI />}
        {world === 'analog' && <WorldAnalog />}
        {world === 'structures' && <WorldStructures />}
      </svg>
    </div>
  )
}

function WorldData() {
  return (
    <g fill="none" stroke="currentColor">
      <g className="cw-grid" strokeWidth="0.6" opacity="0.35">
        {[30, 70, 110, 150, 190, 230].map((x) => (
          <line key={`v${x}`} x1={x} y1="0" x2={x} y2="160" />
        ))}
        {[26, 66, 106, 146].map((y) => (
          <line key={`h${y}`} x1="0" y1={y} x2="240" y2={y} />
        ))}
      </g>
      {[38, 74, 110].map((y, i) => (
        <path
          key={y}
          className="cw-stream"
          style={{ '--d': `${i * 0.9}s` }}
          d={`M-20 ${y} C 60 ${y - 22}, 120 ${y + 24}, 260 ${y - 8}`}
          strokeWidth="1.6"
          opacity="0.9"
        />
      ))}
      <g className="cw-nodes" fill="currentColor" stroke="none">
        {[[60, 40], [120, 82], [180, 58], [96, 116], [200, 118]].map(([cx, cy], i) => (
          <circle key={i} className="cw-node" style={{ '--d': `${i * 0.6}s` }} cx={cx} cy={cy} r="3.4" />
        ))}
      </g>
    </g>
  )
}

function WorldSecurity() {
  return (
    <g fill="none" stroke="currentColor">
      <g className="cw-lattice" strokeWidth="0.7" opacity="0.32">
        {Array.from({ length: 7 }).map((_, i) => (
          <line key={`d${i}`} x1={-20 + i * 44} y1="0" x2={20 + i * 44} y2="160" />
        ))}
        {Array.from({ length: 7 }).map((_, i) => (
          <line key={`u${i}`} x1={20 + i * 44} y1="0" x2={-20 + i * 44} y2="160" />
        ))}
      </g>
      <path
        className="cw-shield"
        d="M120 34 L156 48 V86 C156 108 140 122 120 132 C100 122 84 108 84 86 V48 Z"
        strokeWidth="2"
        opacity="0.95"
      />
      <path className="cw-lock" d="M110 80 h20 v18 h-20 z M114 80 v-6 a6 6 0 0 1 12 0 v6" strokeWidth="1.6" />
      <line className="cw-scan" x1="70" y1="60" x2="170" y2="60" strokeWidth="1.4" opacity="0.8" />
    </g>
  )
}

function WorldDatabase() {
  const cyl = (x, y) => (
    <g className="cw-cyl" stroke="currentColor" fill="none" strokeWidth="1.6">
      <ellipse cx={x} cy={y} rx="22" ry="7" />
      <path d={`M${x - 22} ${y} v26 a22 7 0 0 0 44 0 v-26`} />
      <ellipse cx={x} cy={y + 13} rx="22" ry="7" opacity="0.6" />
    </g>
  )
  return (
    <g>
      <g className="cw-links" stroke="currentColor" strokeWidth="1" opacity="0.5" strokeDasharray="3 4">
        <line className="cw-flow" x1="70" y1="60" x2="170" y2="60" />
        <line className="cw-flow" style={{ '--d': '0.8s' }} x1="120" y1="70" x2="120" y2="118" />
      </g>
      {cyl(70, 44)}
      {cyl(170, 44)}
      {cyl(120, 104)}
    </g>
  )
}

function WorldNetwork() {
  const nodes = [[50, 50], [120, 34], [190, 58], [80, 116], [170, 118]]
  const edges = [[0, 1], [1, 2], [0, 3], [3, 4], [4, 2], [1, 3]]
  return (
    <g fill="none" stroke="currentColor">
      <g strokeWidth="1" opacity="0.5">
        {edges.map(([a, b], i) => (
          <line key={i} x1={nodes[a][0]} y1={nodes[a][1]} x2={nodes[b][0]} y2={nodes[b][1]} />
        ))}
      </g>
      <circle className="cw-packet" r="3.6" fill="currentColor" stroke="none">
        <animateMotion dur="3.4s" repeatCount="indefinite"
          path="M50 50 L120 34 L190 58 L170 118 L80 116 Z" />
      </circle>
      <g fill="currentColor" stroke="none">
        {nodes.map(([cx, cy], i) => (
          <circle key={i} className="cw-node" style={{ '--d': `${i * 0.4}s` }} cx={cx} cy={cy} r="5" />
        ))}
      </g>
    </g>
  )
}

function WorldAutomata() {
  return (
    <g fill="none" stroke="currentColor" strokeWidth="1.8">
      <line x1="18" y1="80" x2="44" y2="80" opacity="0.7" />
      <circle className="cw-state" cx="64" cy="80" r="18" />
      <circle className="cw-state" style={{ '--d': '0.5s' }} cx="140" cy="60" r="18" />
      <g className="cw-accept">
        <circle cx="200" cy="104" r="18" />
        <circle cx="200" cy="104" r="12" opacity="0.7" />
      </g>
      <path d="M80 74 C 104 58, 118 56, 126 60" opacity="0.7" markerEnd="url(#cwArrow)" />
      <path d="M154 72 C 176 84, 186 92, 190 98" opacity="0.7" markerEnd="url(#cwArrow)" />
      <path className="cw-loop" d="M56 64 a 12 12 0 1 1 16 0" opacity="0.6" />
      <defs>
        <marker id="cwArrow" markerWidth="7" markerHeight="7" refX="5" refY="3.2" orient="auto">
          <path d="M0 0 L6 3.2 L0 6 z" fill="currentColor" stroke="none" />
        </marker>
      </defs>
    </g>
  )
}

function WorldParallel() {
  const cells = []
  const cols = 8
  const rows = 5
  for (let r = 0; r < rows; r += 1) {
    for (let c = 0; c < cols; c += 1) {
      cells.push([c, r])
    }
  }
  return (
    <g fill="currentColor" stroke="none">
      {cells.map(([c, r], i) => (
        <rect
          key={i}
          className="cw-core"
          style={{ '--d': `${((c + r) % 6) * 0.28}s` }}
          x={18 + c * 26}
          y={16 + r * 26}
          width="16"
          height="16"
          rx="3"
        />
      ))}
    </g>
  )
}

function WorldJava() {
  return (
    <g fill="none" stroke="currentColor" strokeWidth="1.6">
      <rect className="cw-java-card" x="30" y="30" width="74" height="96" rx="8" />
      <path className="cw-java-line" d="M44 54 h42 M44 72 h34 M44 90 h46" />
      <path className="cw-flow" d="M108 78 C130 58, 142 58, 160 78" opacity="0.65" markerEnd="url(#cwJavaArrow)" />
      <rect className="cw-java-vm" x="154" y="42" width="58" height="72" rx="10" />
      <path className="cw-java-byte" d="M168 62 h30 M168 78 h20 M168 94 h30" />
      <circle className="cw-node" cx="183" cy="126" r="8" fill="currentColor" stroke="none" />
      <path d="M183 114 v-22" opacity="0.55" />
      <defs>
        <marker id="cwJavaArrow" markerWidth="7" markerHeight="7" refX="5" refY="3.2" orient="auto">
          <path d="M0 0 L6 3.2 L0 6 z" fill="currentColor" stroke="none" />
        </marker>
      </defs>
    </g>
  )
}

function WorldGlobal() {
  return (
    <g fill="none" stroke="currentColor">
      <circle className="cw-globe" cx="120" cy="80" r="46" strokeWidth="1.6" />
      <g strokeWidth="0.9" opacity="0.55">
        <ellipse cx="120" cy="80" rx="46" ry="18" />
        <ellipse cx="120" cy="80" rx="46" ry="34" />
        <line x1="120" y1="34" x2="120" y2="126" />
        <line x1="74" y1="80" x2="166" y2="80" />
      </g>
      <path className="cw-route" d="M84 62 C 120 40, 150 44, 168 74" strokeWidth="1.6" strokeDasharray="4 4" />
      <circle className="cw-city" cx="84" cy="62" r="3" fill="currentColor" stroke="none" />
      <circle className="cw-city" style={{ '--d': '1.2s' }} cx="168" cy="74" r="3" fill="currentColor" stroke="none" />
    </g>
  )
}

function WorldResearch() {
  return (
    <g fill="none" stroke="currentColor">
      <path
        className="cw-stream"
        d="M36 120 C 70 40, 110 40, 140 88 C 160 120, 190 128, 220 70"
        strokeWidth="1.8"
        opacity="0.85"
      />
      {[[48, 108], [92, 58], [140, 88], [188, 110], [220, 70]].map(([cx, cy], i) => (
        <circle
          key={i}
          className="cw-node"
          style={{ '--d': `${i * 0.45}s` }}
          cx={cx}
          cy={cy}
          r="4"
          fill="currentColor"
          stroke="none"
        />
      ))}
      <rect className="cw-java-card" x="150" y="98" width="54" height="42" rx="6" strokeWidth="1.4" opacity="0.9" />
      <path className="cw-flow" d="M177 98 V78" strokeWidth="1.4" opacity="0.7" />
      <circle className="cw-node" cx="177" cy="70" r="7" fill="currentColor" stroke="none" />
    </g>
  )
}

function WorldChemistry() {
  return (
    <g fill="none" stroke="currentColor">
      <path
        className="cw-stream"
        d="M58 42 h48 M70 42 v48 l-18 54 q-4 14 10 14 h52 q14 0 10-14 l-18-54 V42"
        strokeWidth="2.2"
        opacity="0.9"
      />
      <path className="cw-flow" d="M64 128 q28-14 56 0 l6 18 H58z" fill="currentColor" stroke="none" opacity="0.28" />
      <circle className="cw-node" cx="78" cy="108" r="3.5" fill="currentColor" stroke="none" />
      <circle className="cw-node" style={{ '--d': '0.35s' }} cx="102" cy="118" r="2.8" fill="currentColor" stroke="none" />
      <circle className="cw-accept" cx="176" cy="78" r="16" strokeWidth="2" opacity="0.9" />
      <circle className="cw-node" cx="176" cy="78" r="6" fill="currentColor" stroke="none" />
      <circle className="cw-node" style={{ '--d': '0.5s' }} cx="152" cy="62" r="4" fill="currentColor" stroke="none" />
      <circle className="cw-node" style={{ '--d': '0.8s' }} cx="198" cy="98" r="4" fill="currentColor" stroke="none" />
      <line className="cw-flow" x1="160" y1="68" x2="168" y2="74" strokeWidth="1.6" />
      <line className="cw-flow" x1="188" y1="90" x2="182" y2="82" strokeWidth="1.6" />
      <rect className="cw-java-card" x="148" y="118" width="58" height="28" rx="8" strokeWidth="1.5" opacity="0.85" />
    </g>
  )
}

function WorldDeepLearning() {
  const nodes = [
    [48, 48], [48, 96], [48, 144],
    [120, 64], [120, 112],
    [192, 88],
  ]
  return (
    <g fill="none" stroke="currentColor">
      {[
        [48, 48, 120, 64], [48, 96, 120, 64], [48, 96, 120, 112], [48, 144, 120, 112],
        [120, 64, 192, 88], [120, 112, 192, 88],
      ].map(([x1, y1, x2, y2], i) => (
        <line
          key={`e${i}`}
          className="cw-flow"
          style={{ '--d': `${i * 0.2}s` }}
          x1={x1}
          y1={y1}
          x2={x2}
          y2={y2}
          strokeWidth="1.5"
          opacity="0.75"
        />
      ))}
      {nodes.map(([cx, cy], i) => (
        <circle
          key={`n${i}`}
          className="cw-node"
          style={{ '--d': `${i * 0.25}s` }}
          cx={cx}
          cy={cy}
          r={i === 5 ? 8 : 5}
          fill="currentColor"
          stroke="none"
        />
      ))}
      <circle className="cw-accept" cx="192" cy="88" r="16" strokeWidth="1.8" opacity="0.85" />
      <path className="cw-stream" d="M36 28 C90 18, 150 38, 210 24" strokeWidth="1.4" opacity="0.55" />
    </g>
  )
}

function WorldOS() {
  return (
    <g fill="none" stroke="currentColor">
      <rect className="cw-java-card" x="88" y="48" width="64" height="64" rx="10" strokeWidth="2" />
      <rect className="cw-core" x="102" y="62" width="12" height="12" rx="2" />
      <rect className="cw-core" x="126" y="62" width="12" height="12" rx="2" style={{ '--d': '0.2s' }} />
      <rect className="cw-core" x="102" y="86" width="12" height="12" rx="2" style={{ '--d': '0.4s' }} />
      <rect className="cw-core" x="126" y="86" width="12" height="12" rx="2" style={{ '--d': '0.6s' }} />
      {[[48, 70], [48, 110], [48, 150]].map(([cx, cy], i) => (
        <rect
          key={i}
          className="cw-node"
          style={{ '--d': `${i * 0.25}s` }}
          x={cx - 8}
          y={cy - 8}
          width="16"
          height="16"
          rx="3"
          fill="currentColor"
          stroke="none"
        />
      ))}
      <path className="cw-flow" d="M64 70 H88 M64 110 H88 M64 150 C 80 150, 88 120, 88 96" strokeWidth="1.6" />
      <path className="cw-stream" d="M168 80 C 200 60, 214 100, 232 88" strokeWidth="1.6" />
      <circle className="cw-accept" cx="200" cy="128" r="22" strokeWidth="1.8" opacity="0.8" />
      <path className="cw-flow" d="M188 128 H212 M200 116 V140" strokeWidth="1.6" />
    </g>
  )
}

function WorldAI() {
  return (
    <g fill="none" stroke="currentColor">
      <circle className="cw-accept" cx="120" cy="80" r="22" strokeWidth="1.8" />
      <circle className="cw-node" cx="120" cy="80" r="6" fill="currentColor" stroke="none" />
      <path className="cw-flow" d="M70 80 H98" strokeWidth="1.6" />
      <path className="cw-flow" d="M142 80 H190" strokeWidth="1.6" />
      <circle className="cw-state" cx="58" cy="80" r="14" strokeWidth="1.6" />
      <circle className="cw-state" cx="204" cy="80" r="14" strokeWidth="1.6" />
      {[[90, 40], [150, 40], [90, 120], [150, 120]].map(([cx, cy], i) => (
        <circle key={i} className="cw-node" style={{ '--d': `${i * 0.2}s` }} cx={cx} cy={cy} r="5" fill="currentColor" stroke="none" />
      ))}
      <path className="cw-stream" d="M90 40 C 105 55, 105 70, 120 80" strokeWidth="1.2" opacity="0.7" />
      <path className="cw-stream" d="M150 40 C 135 55, 135 70, 120 80" strokeWidth="1.2" opacity="0.7" />
      <path className="cw-stream" d="M120 80 C 105 95, 105 110, 90 120" strokeWidth="1.2" opacity="0.7" />
      <path className="cw-stream" d="M120 80 C 135 95, 135 110, 150 120" strokeWidth="1.2" opacity="0.7" />
    </g>
  )
}

function WorldAnalog() {
  return (
    <g fill="none" stroke="currentColor">
      <path className="cw-stream" style={{ '--d': '0s' }} d="M12 110 C 50 40, 90 140, 128 70 S 200 40, 228 95" strokeWidth="2" opacity="0.85" />
      <path className="cw-flow" d="M48 48 V112" strokeWidth="1.4" opacity="0.55" />
      <path className="cw-flow" d="M48 48 H92" strokeWidth="1.4" opacity="0.55" />
      <path className="cw-flow" d="M92 48 V78" strokeWidth="1.4" opacity="0.55" />
      <polygon points="92,78 118,92 92,106" fill="currentColor" stroke="none" opacity="0.75" />
      <path className="cw-flow" d="M118 92 H168" strokeWidth="1.5" />
      <circle className="cw-node" cx="48" cy="48" r="4" fill="currentColor" stroke="none" />
      <circle className="cw-node" cx="168" cy="92" r="4" fill="currentColor" stroke="none" />
      <rect className="cw-state" x="178" y="78" width="36" height="28" rx="4" strokeWidth="1.4" />
      {[0, 1, 2].map((i) => (
        <circle
          key={i}
          className="cw-node"
          style={{ '--d': `${i * 0.35}s` }}
          cx={60 + i * 28}
          cy={120}
          r="3"
          fill="currentColor"
          stroke="none"
        />
      ))}
    </g>
  )
}

function WorldStructures() {
  return (
    <g fill="none" stroke="currentColor">
      {[40, 90, 140, 190].map((x, i) => (
        <rect
          key={`c${x}`}
          className="cw-node"
          style={{ '--d': `${i * 0.25}s` }}
          x={x}
          y="58"
          width="36"
          height="28"
          rx="5"
          strokeWidth="1.6"
          fill="currentColor"
          fillOpacity="0.12"
        />
      ))}
      <path className="cw-flow" d="M76 72 H90" strokeWidth="2" opacity="0.85" />
      <path className="cw-flow" d="M126 72 H140" strokeWidth="2" opacity="0.85" />
      <path className="cw-flow" d="M176 72 H190" strokeWidth="2" opacity="0.85" />
      <circle className="cw-node" cx="28" cy="48" r="5" fill="currentColor" stroke="none" opacity="0.9" />
      <path className="cw-stream" style={{ '--d': '0.4s' }} d="M28 48 L58 58" strokeWidth="1.5" opacity="0.75" />
      <g className="cw-nodes" fill="currentColor" stroke="none">
        <circle className="cw-node" style={{ '--d': '0s' }} cx="70" cy="120" r="7" />
        <circle className="cw-node" style={{ '--d': '0.3s' }} cx="120" cy="120" r="7" />
        <circle className="cw-node" style={{ '--d': '0.6s' }} cx="170" cy="120" r="7" />
      </g>
      <path className="cw-flow" d="M77 120 H113" strokeWidth="1.8" />
      <path className="cw-flow" d="M127 120 H163" strokeWidth="1.8" />
    </g>
  )
}
