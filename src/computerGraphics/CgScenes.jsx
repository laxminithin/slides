/**
 * CgScenes — Computer Graphics and Visualization (BCS504) classroom SVG visuals.
 * Instructional motion (cgv-*) shows mechanisms, not decoration.
 */
const N = '#0f172a'
const BLUE = '#22d3ee'
const RED = '#f43f5e'
const AMBER = '#f59e0b'
const PURP = '#a78bfa'
const GREEN = '#34d399'
const MUTED = '#64748b'
const CREAM = '#f8fafc'
const SKY = '#e0f2fe'
const WHITE = '#ffffff'
export const PALETTE = { N, BLUE, MUTED, CREAM, RED, AMBER, PURP, GREEN, SKY }

export function Scene({ caption, children, vb = '0 0 900 520', className = '' }) {
  return (
    <div className={`cg-scene ${className}`} aria-label={caption || 'Computer Graphics and Visualization diagram'}>
      <svg viewBox={vb} role="img" className="cg-svg">
        <defs>
          <marker id="cgArr" markerWidth="10" markerHeight="10" refX="8" refY="4" orient="auto">
            <path d="M0 0 L9 4 L0 8 Z" fill={N} />
          </marker>
          <marker id="cgArrB" markerWidth="10" markerHeight="10" refX="8" refY="4" orient="auto">
            <path d="M0 0 L9 4 L0 8 Z" fill={BLUE} />
          </marker>
          <marker id="cgArrA" markerWidth="10" markerHeight="10" refX="8" refY="4" orient="auto">
            <path d="M0 0 L9 4 L0 8 Z" fill={AMBER} />
          </marker>
          <marker id="cgArrR" markerWidth="10" markerHeight="10" refX="8" refY="4" orient="auto">
            <path d="M0 0 L9 4 L0 8 Z" fill={RED} />
          </marker>
          <marker id="cgArrG" markerWidth="10" markerHeight="10" refX="8" refY="4" orient="auto">
            <path d="M0 0 L9 4 L0 8 Z" fill={GREEN} />
          </marker>
        </defs>
        <rect width="100%" height="100%" fill={CREAM} rx="8" />
        {children}
        {caption ? (
          <text x="450" y="502" textAnchor="middle" fontSize="15" fontWeight="700" fill={MUTED} fontFamily="system-ui,sans-serif">
            {caption}
          </text>
        ) : null}
      </svg>
    </div>
  )
}

export function L({ x, y, children, size = 18, fill = N, anchor = 'middle', weight = 800 }) {
  return (
    <text x={x} y={y} textAnchor={anchor} fontSize={size} fontWeight={weight} fill={fill} fontFamily="system-ui,sans-serif">
      {children}
    </text>
  )
}

function Box({ x, y, w, h, label, sub, fill = WHITE, stroke = BLUE, className = '' }) {
  return (
    <g transform={`translate(${x},${y})`} className={className}>
      <rect width={w} height={h} rx="10" fill={fill} stroke={stroke} strokeWidth="2.5" />
      <L x={w / 2} y={h / 2 + (sub ? -2 : 6)} size={sub ? 13 : 15}>
        {label}
      </L>
      {sub ? (
        <L x={w / 2} y={h / 2 + 18} size={11} fill={MUTED} weight={700}>
          {sub}
        </L>
      ) : null}
    </g>
  )
}

/* ── Module openers / closers ───────────────────────────────────── */
export function ModuleHero({ module = 1, title, question, hours }) {
  return (
    <Scene caption={question || 'CGV visual journey'}>
      <rect x="40" y="40" width="820" height="400" rx="16" fill={WHITE} stroke={BLUE} strokeWidth="3" />
      <L x="450" y="110" size={18} fill={BLUE}>{`MODULE ${module} · BCS504`}</L>
      <L x="450" y="170" size={26}>
        {title || `Module ${module}`}
      </L>
      <L x="450" y="220" size={15} fill={MUTED} weight={700}>
        {question || 'Watch the concept execute'}
      </L>
      {['Problem', 'Model', 'Mechanism', 'Example', 'Exam'].map((t, i) => (
        <Box key={t} x={70 + i * 150} y={280} w={130} h={70} label={t} className={`cgv-pulse cgv-delay-${i}`} />
      ))}
      {hours ? (
        <L x="450" y="420" size={14} fill={MUTED}>
          {`${hours} teaching hours`}
        </L>
      ) : null}
    </Scene>
  )
}

export function ModuleOutro({ module = 1, title }) {
  return (
    <Scene caption="Redraw the map — then attempt the PYQs">
      <L x="450" y="80" size={24}>{`Module ${module} closed`}</L>
      <L x="450" y="120" size={16} fill={MUTED}>
        {title}
      </L>
      <Box x="120" y="200" w="200" h="120" label="Definitions" sub="precise terms" className="cgv-fade-in cgv-delay-0" />
      <Box x="350" y="200" w="200" h="120" label="Diagrams" sub="labelled flows" stroke={PURP} className="cgv-fade-in cgv-delay-1" />
      <Box x="580" y="200" w="200" h="120" label="Practice" sub="10-mark answers" stroke={AMBER} className="cgv-fade-in cgv-delay-2" />
    </Scene>
  )
}

export function ConceptBoard({ title = 'Concept', points = [] }) {
  const pts = points.length ? points : ['Context', 'Mechanism', 'Example', 'Exam point']
  return (
    <Scene caption={title}>
      <Box x="250" y="40" w="400" h="80" label={title} className="cgv-pulse" />
      {pts.map((p, i) => (
        <Box key={`${p}-${i}`} x={60 + (i % 4) * 210} y={180 + Math.floor(i / 4) * 120} w="190" h="90" label={p} className={`cgv-fade-in cgv-delay-${i % 5}`} />
      ))}
    </Scene>
  )
}

/* ── 1. Synthetic camera ────────────────────────────────────────── */
export function SyntheticCameraScene() {
  return (
    <Scene caption="Synthetic camera: COP → object → image plane">
      <L x="450" y="42" size={20}>
        Synthetic-camera model
      </L>
      {/* Camera / COP */}
      <g className="cgv-cam-pulse">
        <polygon points="70,240 130,210 130,270" fill={SKY} stroke={BLUE} strokeWidth="3" />
        <circle cx="70" cy="240" r="10" fill={BLUE} />
        <L x="90" y="300" size={14} fill={BLUE}>
          COP / camera
        </L>
      </g>
      {/* Projection rays */}
      <line x1="130" y1="240" x2="620" y2="140" stroke={AMBER} strokeWidth="2.5" className="cgv-ray" markerEnd="url(#cgArrA)" />
      <line x1="130" y1="240" x2="620" y2="340" stroke={AMBER} strokeWidth="2.5" className="cgv-ray cgv-delay-1" markerEnd="url(#cgArrA)" />
      <line x1="130" y1="240" x2="620" y2="240" stroke={AMBER} strokeWidth="2" strokeDasharray="6 5" className="cgv-ray cgv-delay-2" />
      {/* Image plane */}
      <rect x="300" y="120" width="18" height="240" rx="3" fill={PURP} opacity="0.85" className="cgv-plane" />
      <L x="309" y="100" size={13} fill={PURP}>
        Image plane
      </L>
      {/* Projected image on plane */}
      <rect x="292" y="190" width="34" height="50" fill={WHITE} stroke={PURP} strokeWidth="2" className="cgv-img-dot" />
      <L x="309" y="390" size={12} fill={MUTED}>
        projected image
      </L>
      {/* 3D object */}
      <g className="cgv-object-bob">
        <polygon points="560,180 680,150 720,260 600,300" fill="#bae6fd" stroke={N} strokeWidth="2.5" />
        <polygon points="680,150 760,190 720,260" fill="#7dd3fc" stroke={N} strokeWidth="2.5" />
        <L x="650" y="330" size={14}>
          Object (world)
        </L>
      </g>
      <L x="450" y="460" size={13} fill={MUTED}>
        Rays through COP hit the plane — that is the synthetic photograph
      </L>
    </Scene>
  )
}

/* ── 2. Graphics pipeline ───────────────────────────────────────── */
export function GraphicsPipelineScene() {
  const stages = [
    { lab: 'Model', sub: 'object', c: BLUE },
    { lab: 'World', sub: 'place', c: GREEN },
    { lab: 'View', sub: 'camera', c: AMBER },
    { lab: 'Project', sub: '2D', c: PURP },
    { lab: 'Clip', sub: 'volume', c: RED },
    { lab: 'Raster', sub: 'pixels', c: BLUE },
    { lab: 'Fragment', sub: 'shade', c: GREEN },
  ]
  return (
    <Scene caption="Graphics pipeline: Model → … → Fragment">
      <L x="450" y="48" size={20}>
        Programmable / fixed-function path
      </L>
      {stages.map((s, i) => (
        <g key={s.lab}>
          <Box
            x={28 + i * 124}
            y={160}
            w={110}
            h={90}
            label={s.lab}
            sub={s.sub}
            stroke={s.c}
            fill={SKY}
            className={`cgv-pipe-stage cgv-delay-${i % 5}`}
          />
          {i < stages.length - 1 ? (
            <line
              x1={138 + i * 124}
              y1={205}
              x2={152 + i * 124}
              y2={205}
              stroke={N}
              strokeWidth="3"
              markerEnd="url(#cgArr)"
              className="cgv-flow-arrow"
            />
          ) : null}
        </g>
      ))}
      <path
        d="M 80 280 C 80 380, 820 380, 820 280"
        fill="none"
        stroke={AMBER}
        strokeWidth="2.5"
        strokeDasharray="8 6"
        className="cgv-feedback"
      />
      <L x="450" y="410" size={14} fill={AMBER}>
        Vertex stream advances left → right; fragments shade the framebuffer
      </L>
      <circle cx="80" cy="205" r="8" fill={RED} className="cgv-token-slide" />
    </Scene>
  )
}

/* ── 3. Translate / Rotate / Scale ──────────────────────────────── */
export function TransformTRSScene({ mode = 'all' }) {
  const showT = mode === 'all' || mode === 'translate'
  const showR = mode === 'all' || mode === 'rotate'
  const showS = mode === 'all' || mode === 'scale'
  return (
    <Scene caption="Affine moves: Translate · Rotate · Scale">
      <L x="450" y="42" size={20}>
        Geometric transformations on shapes
      </L>
      {/* Translate */}
      <g opacity={showT ? 1 : 0.25}>
        <L x="160" y="90" size={15} fill={BLUE}>
          Translate
        </L>
        <rect x="80" y="140" width="70" height="50" fill={SKY} stroke={MUTED} strokeWidth="2" strokeDasharray="4 4" />
        <rect x="80" y="140" width="70" height="50" fill="#67e8f9" stroke={BLUE} strokeWidth="2.5" className="cgv-translate" />
        <L x="160" y="230" size={12} fill={MUTED}>
          T(tx, ty)
        </L>
      </g>
      {/* Rotate */}
      <g opacity={showR ? 1 : 0.25}>
        <L x="450" y="90" size={15} fill={AMBER}>
          Rotate
        </L>
        <rect x="400" y="150" width="70" height="50" fill={SKY} stroke={MUTED} strokeWidth="2" strokeDasharray="4 4" />
        <g className="cgv-rotate" style={{ transformOrigin: '435px 175px' }}>
          <rect x="400" y="150" width="70" height="50" fill="#fde68a" stroke={AMBER} strokeWidth="2.5" />
        </g>
        <circle cx="435" cy="175" r="5" fill={N} />
        <L x="450" y="230" size={12} fill={MUTED}>
          R(θ) about origin
        </L>
      </g>
      {/* Scale */}
      <g opacity={showS ? 1 : 0.25}>
        <L x="740" y="90" size={15} fill={PURP}>
          Scale
        </L>
        <rect x="690" y="155" width="50" height="40" fill={SKY} stroke={MUTED} strokeWidth="2" strokeDasharray="4 4" />
        <rect x="680" y="140" width="70" height="55" fill="#ddd6fe" stroke={PURP} strokeWidth="2.5" className="cgv-scale" />
        <L x="740" y="230" size={12} fill={MUTED}>
          S(sx, sy)
        </L>
      </g>
      <Box x="180" y="280" w="540" h="140" label="Exam tip" sub="Order matters — matrices multiply right-to-left on column vectors" stroke={GREEN} fill="#ecfdf5" />
    </Scene>
  )
}

/* ── 4. Homogeneous coordinates ─────────────────────────────────── */
export function HomogeneousScene() {
  return (
    <Scene caption="Homogeneous: (x, y, w) → (x/w, y/w)">
      <L x="450" y="42" size={20}>
        Why a third coordinate?
      </L>
      <Box x="60" y="90" w="240" h="120" label="Cartesian" sub="(x, y)" stroke={MUTED} />
      <path d="M320 150 H380" stroke={N} strokeWidth="3" markerEnd="url(#cgArr)" className="cgv-flow-arrow" />
      <Box x="390" y="90" w="280" h="120" label="Homogeneous" sub="(x, y, w)" stroke={BLUE} fill={SKY} className="cgv-pulse" />
      <path d="M690 150 H740" stroke={N} strokeWidth="3" markerEnd="url(#cgArr)" className="cgv-flow-arrow" />
      <Box x="750" y="90" w="110" h="120" label="÷ w" sub="project" stroke={AMBER} fill="#fffbeb" className="cgv-homog-w" />
      {/* Plane intuition */}
      <line x1="120" y1="380" x2="780" y2="380" stroke={MUTED} strokeWidth="2" />
      <L x="120" y="370" size={12} fill={MUTED} anchor="start">
        w = 1 plane
      </L>
      <g className="cgv-homog-lift">
        <circle cx="450" cy="320" r="14" fill={BLUE} />
        <L x="450" y="300" size={13} fill={BLUE}>
          (x,y,w)
        </L>
        <line x1="450" y1="334" x2="450" y2="380" stroke={AMBER} strokeWidth="2" strokeDasharray="4 4" className="cgv-ray" />
      </g>
      <circle cx="450" cy="380" r="10" fill={AMBER} className="cgv-img-dot" />
      <L x="450" y="420" size={13} fill={MUTED}>
        Perspective & translation unify as 3×3 (2D) / 4×4 (3D) matrices
      </L>
    </Scene>
  )
}

/* ── 5. Concatenation order ─────────────────────────────────────── */
export function ConcatOrderScene() {
  return (
    <Scene caption="Order matters: R then T  ≠  T then R">
      <L x="450" y="40" size={18}>
        Concatenation of transformations
      </L>
      {/* Left: Rotate then Translate */}
      <rect x="40" y="70" width="400" height="380" rx="12" fill={WHITE} stroke={BLUE} strokeWidth="2.5" />
      <L x="240" y="100" size={16} fill={BLUE}>
        Rotate → Translate
      </L>
      <L x="240" y="122" size={12} fill={MUTED}>
        M = T · R
      </L>
      <circle cx="160" cy="280" r="6" fill={N} />
      <L x="160" y="310" size={11} fill={MUTED}>
        origin
      </L>
      <rect x="140" y="200" width="50" height="36" fill={SKY} stroke={MUTED} strokeWidth="1.5" strokeDasharray="3 3" />
      <g className="cgv-order-rt">
        <rect x="140" y="200" width="50" height="36" fill="#67e8f9" stroke={BLUE} strokeWidth="2.5" />
      </g>
      <L x="240" y="400" size={12} fill={MUTED}>
        Spin about origin, then slide
      </L>

      {/* Right: Translate then Rotate */}
      <rect x="460" y="70" width="400" height="380" rx="12" fill={WHITE} stroke={AMBER} strokeWidth="2.5" />
      <L x="660" y="100" size={16} fill={AMBER}>
        Translate → Rotate
      </L>
      <L x="660" y="122" size={12} fill={MUTED}>
        M = R · T
      </L>
      <circle cx="580" cy="280" r="6" fill={N} />
      <L x="580" y="310" size={11} fill={MUTED}>
        origin
      </L>
      <rect x="560" y="200" width="50" height="36" fill="#fef3c7" stroke={MUTED} strokeWidth="1.5" strokeDasharray="3 3" />
      <g className="cgv-order-tr">
        <rect x="560" y="200" width="50" height="36" fill="#fbbf24" stroke={AMBER} strokeWidth="2.5" />
      </g>
      <L x="660" y="400" size={12} fill={MUTED}>
        Slide first — rotation orbits the origin
      </L>
    </Scene>
  )
}

/* ── 6. Viewing volume ──────────────────────────────────────────── */
export function ViewingVolumeScene() {
  return (
    <Scene caption="View frustum / viewing volume">
      <L x="450" y="42" size={20}>
        Classical & computer viewing
      </L>
      {/* Eye */}
      <circle cx="80" cy="260" r="16" fill={BLUE} className="cgv-cam-pulse" />
      <L x="80" y="300" size={13} fill={BLUE}>
        Eye / COP
      </L>
      {/* Frustum wedge */}
      <path
        d="M110 260 L320 140 L320 380 Z"
        fill="rgba(34,211,238,0.12)"
        stroke={BLUE}
        strokeWidth="2.5"
        className="cgv-frustum"
      />
      {/* Near / far planes */}
      <line x1="200" y1="180" x2="200" y2="340" stroke={PURP} strokeWidth="3" className="cgv-plane" />
      <L x="200" y="165" size={12} fill={PURP}>
        near
      </L>
      <line x1="320" y1="140" x2="320" y2="380" stroke={AMBER} strokeWidth="3" className="cgv-plane cgv-delay-1" />
      <L x="320" y="125" size={12} fill={AMBER}>
        far
      </L>
      {/* Objects inside / outside */}
      <rect x="230" y="230" width="50" height="40" fill={GREEN} opacity="0.85" className="cgv-object-bob" />
      <L x="255" y="290" size={11} fill={GREEN}>
        visible
      </L>
      <rect x="400" y="200" width="55" height="40" fill={RED} opacity="0.7" className="cgv-clip-out" />
      <L x="428" y="260" size={11} fill={RED}>
        clipped
      </L>
      <Box x="520" y="160" w="320" h="200" label="View volume" sub="left · right · bottom · top · near · far" stroke={PURP} fill={SKY} />
      <L x="680" y="400" size={13} fill={MUTED}>
        Only primitives intersecting the frustum survive clipping
      </L>
    </Scene>
  )
}

/* ── 7. Phong lighting ──────────────────────────────────────────── */
export function PhongScene() {
  return (
    <Scene caption="Phong: I = ambient + diffuse + specular">
      <L x="450" y="40" size={18}>
        Phong lighting model
      </L>
      {/* Light */}
      <g className="cgv-light-orbit">
        <circle cx="180" cy="120" r="18" fill={AMBER} />
        <L x="180" y="100" size={13} fill={AMBER}>
          Light
        </L>
      </g>
      {/* Surface */}
      <ellipse cx="450" cy="300" rx="160" ry="70" fill="#bae6fd" stroke={N} strokeWidth="2.5" />
      <L x="450" y="390" size={13}>
        Surface
      </L>
      {/* Normal */}
      <line x1="450" y1="300" x2="450" y2="180" stroke={BLUE} strokeWidth="3" markerEnd="url(#cgArrB)" className="cgv-ray" />
      <L x="470" y="200" size={14} fill={BLUE} anchor="start">
        N
      </L>
      {/* Light vector */}
      <line x1="450" y1="300" x2="220" y2="150" stroke={AMBER} strokeWidth="2.5" markerEnd="url(#cgArrA)" className="cgv-ray cgv-delay-1" />
      <L x="300" y="200" size={14} fill={AMBER}>
        L
      </L>
      {/* View / reflection */}
      <line x1="450" y1="300" x2="680" y2="140" stroke={PURP} strokeWidth="2.5" markerEnd="url(#cgArr)" className="cgv-ray cgv-delay-2" />
      <L x="600" y="200" size={14} fill={PURP}>
        V / R
      </L>
      {/* Specular hotspot */}
      <circle cx="520" cy="250" r="22" fill={WHITE} opacity="0.9" className="cgv-specular" />
      {/* Term cards */}
      <Box x="40" y="420" w="250" h="50" label="Ambient ka·Ia" fill="#ecfdf5" stroke={GREEN} className="cgv-phong-amb" />
      <Box x="320" y="420" w="250" h="50" label="Diffuse kd (N·L) Id" fill="#e0f2fe" stroke={BLUE} className="cgv-phong-diff" />
      <Box x="600" y="420" w="260" h="50" label="Specular ks (R·V)^n Is" fill="#faf5ff" stroke={PURP} className="cgv-phong-spec" />
    </Scene>
  )
}

/* ── 8. Cohen-Sutherland ────────────────────────────────────────── */
export function CohenSutherlandScene() {
  const codes = [
    { x: 120, y: 100, c: '1001' },
    { x: 400, y: 100, c: '1000' },
    { x: 680, y: 100, c: '1010' },
    { x: 120, y: 250, c: '0001' },
    { x: 400, y: 250, c: '0000' },
    { x: 680, y: 250, c: '0010' },
    { x: 120, y: 400, c: '0101' },
    { x: 400, y: 400, c: '0100' },
    { x: 680, y: 400, c: '0110' },
  ]
  return (
    <Scene caption="Cohen–Sutherland region codes (TBRL)">
      <L x="450" y="36" size={18}>
        Outcodes decide accept / reject / clip
      </L>
      {/* Clip window */}
      <rect x="280" y="160" width="340" height="200" fill="rgba(52,211,153,0.15)" stroke={GREEN} strokeWidth="3.5" className="cgv-cs-window" />
      <L x="450" y="265" size={14} fill={GREEN}>
        0000 inside
      </L>
      {/* Grid guides */}
      <line x1="280" y1="60" x2="280" y2="470" stroke={MUTED} strokeWidth="1.5" strokeDasharray="4 4" />
      <line x1="620" y1="60" x2="620" y2="470" stroke={MUTED} strokeWidth="1.5" strokeDasharray="4 4" />
      <line x1="80" y1="160" x2="820" y2="160" stroke={MUTED} strokeWidth="1.5" strokeDasharray="4 4" />
      <line x1="80" y1="360" x2="820" y2="360" stroke={MUTED} strokeWidth="1.5" strokeDasharray="4 4" />
      {codes.map((r, i) => (
        <text
          key={r.c + i}
          x={r.x}
          y={r.y}
          textAnchor="middle"
          fontSize="15"
          fontWeight="800"
          fill={r.c === '0000' ? GREEN : N}
          fontFamily="system-ui,sans-serif"
          className={`cgv-cs-code cgv-delay-${i % 5}`}
        >
          {r.c}
        </text>
      ))}
      {/* Sample line crossing */}
      <line x1="150" y1="120" x2="700" y2="400" stroke={RED} strokeWidth="3" className="cgv-cs-line" markerEnd="url(#cgArrR)" />
      <L x="450" y="480" size={12} fill={MUTED}>
        trivial accept (OR=0) · trivial reject (AND≠0) · else clip against edges
      </L>
    </Scene>
  )
}

/* ── 9. DDA line ────────────────────────────────────────────────── */
export function DdaScene() {
  const cells = []
  // Approximate line from (1,1) to (8,5) on an 8×6 grid
  const path = [
    [1, 1],
    [2, 2],
    [3, 2],
    [4, 3],
    [5, 3],
    [6, 4],
    [7, 4],
    [8, 5],
  ]
  const lit = new Set(path.map(([x, y]) => `${x},${y}`))
  for (let y = 0; y < 6; y++) {
    for (let x = 0; x < 10; x++) {
      cells.push({ x, y, on: lit.has(`${x},${y}`) })
    }
  }
  return (
    <Scene caption="DDA: step along the major axis, light pixels">
      <L x="450" y="40" size={18}>
        Digital Differential Analyzer
      </L>
      <g transform="translate(140,70)">
        {cells.map((c, i) => (
          <rect
            key={`${c.x}-${c.y}`}
            x={c.x * 54}
            y={(5 - c.y) * 54}
            width="50"
            height="50"
            fill={c.on ? BLUE : WHITE}
            stroke={MUTED}
            strokeWidth="1.5"
            opacity={c.on ? 0.95 : 0.9}
            className={c.on ? `cgv-pixel-lit cgv-delay-${i % 5}` : ''}
          />
        ))}
      </g>
      <L x="720" y="160" size={14} fill={MUTED} anchor="start">
        x += dx/steps
      </L>
      <L x="720" y="190" size={14} fill={MUTED} anchor="start">
        y += dy/steps
      </L>
      <L x="720" y="230" size={13} fill={AMBER} anchor="start">
        round(x), round(y)
      </L>
      <circle r="10" fill={RED} className="cgv-dda-cursor">
        <animateMotion dur="3.2s" repeatCount="indefinite" path="M194,340 L248,286 L302,286 L356,232 L410,232 L464,178 L518,178 L572,124" />
      </circle>
    </Scene>
  )
}

/* ── 10. Bresenham ──────────────────────────────────────────────── */
export function BresenhamScene() {
  const decisions = [
    { p: 'p0=2dy−dx', choose: 'E or NE?', y: 140 },
    { p: 'p < 0 → E', choose: 'p := p+2dy', y: 220 },
    { p: 'p ≥ 0 → NE', choose: 'p := p+2dy−2dx', y: 300 },
  ]
  return (
    <Scene caption="Bresenham: integer decision parameter p">
      <L x="450" y="40" size={18}>
        Only integer adds — no floats
      </L>
      {/* Pixel ladder */}
      <g transform="translate(80,100)">
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <g key={i}>
            <rect x={i * 55} y={200 - i * 28} width="48" height="48" fill={i % 2 === 0 ? BLUE : GREEN} opacity="0.85" stroke={N} strokeWidth="1.5" className={`cgv-pixel-lit cgv-delay-${i % 5}`} />
            <L x={i * 55 + 24} y={200 - i * 28 + 70} size={11} fill={MUTED}>
              {i % 2 === 0 ? 'E' : 'NE'}
            </L>
          </g>
        ))}
      </g>
      {/* Decision panel */}
      <rect x="480" y="90" width="380" height="320" rx="12" fill={WHITE} stroke={AMBER} strokeWidth="2.5" />
      <L x="670" y="125" size={16} fill={AMBER}>
        Decision parameter
      </L>
      {decisions.map((d, i) => (
        <g key={d.p} className={`cgv-bres-decide cgv-delay-${i}`}>
          <Box x="510" y={d.y} w="320" h="60" label={d.p} sub={d.choose} stroke={i === 0 ? AMBER : BLUE} fill={SKY} />
        </g>
      ))}
      <L x="450" y="460" size={13} fill={MUTED}>
        Compare midpoint error → pick East or North-East pixel
      </L>
    </Scene>
  )
}

/* ── 11. Midpoint circle ────────────────────────────────────────── */
export function MidpointCircleScene() {
  const cx = 320
  const cy = 260
  const r = 140
  // First-octant sample points then reflect
  const oct1 = [
    [0, r],
    [40, 134],
    [70, 120],
    [100, 98],
    [120, 72],
    [134, 40],
    [140, 0],
  ]
  const pts = []
  oct1.forEach(([x, y], idx) => {
    const pair = [
      [x, y],
      [y, x],
      [-x, y],
      [-y, x],
      [x, -y],
      [y, -x],
      [-x, -y],
      [-y, -x],
    ]
    pair.forEach(([px, py], oi) => {
      pts.push({ px: cx + px, py: cy - py, d: (idx + oi) % 5 })
    })
  })
  return (
    <Scene caption="Midpoint circle: compute 1 octant → 8-way symmetry">
      <L x="450" y="40" size={18}>
        Midpoint circle algorithm
      </L>
      <circle cx={cx} cy={cy} r={r} fill="none" stroke={MUTED} strokeWidth="2" strokeDasharray="6 5" />
      <circle cx={cx} cy={cy} r="5" fill={N} />
      {/* Octant wedges hint */}
      <line x1={cx} y1={cy} x2={cx + r} y2={cy} stroke={BLUE} strokeWidth="1.5" opacity="0.5" />
      <line x1={cx} y1={cy} x2={cx} y2={cy - r} stroke={BLUE} strokeWidth="1.5" opacity="0.5" />
      <line x1={cx} y1={cy} x2={cx + r * 0.7} y2={cy - r * 0.7} stroke={AMBER} strokeWidth="2" className="cgv-ray" />
      <L x={cx + 90} y={cy - 90} size={12} fill={AMBER}>
        octant 1
      </L>
      {pts.map((p, i) => (
        <circle key={i} cx={p.px} cy={p.py} r="7" fill={GREEN} className={`cgv-octant cgv-delay-${p.d}`} />
      ))}
      <Box x="560" y="120" w="300" h="260" label="8-way plot" sub="(±x,±y) and (±y,±x)" stroke={PURP} fill={SKY} className="cgv-pulse" />
      <L x="710" y="280" size={13} fill={MUTED}>
        Decision at midpoint
      </L>
      <L x="710" y="310" size={13} fill={MUTED}>
        between pixels
      </L>
      <L x="710" y="350" size={12} fill={GREEN}>
        one calculation → eight dots
      </L>
    </Scene>
  )
}

/* ── VISUAL_MAP + beatVisual ────────────────────────────────────── */
const VISUAL_MAP = {
  'synthetic-camera-model': SyntheticCameraScene,
  'imaging-systems': SyntheticCameraScene,
  'physical-and-synthetic-images': SyntheticCameraScene,
  'programmable-pipelines': GraphicsPipelineScene,
  'graphics-architectures': GraphicsPipelineScene,
  'vertices-to-fragments': GraphicsPipelineScene,
  'four-major-tasks': GraphicsPipelineScene,
  'graphics-system': GraphicsPipelineScene,
  'affine-transformations': () => <TransformTRSScene mode="all" />,
  translation: () => <TransformTRSScene mode="translate" />,
  rotation: () => <TransformTRSScene mode="rotate" />,
  scaling: () => <TransformTRSScene mode="scale" />,
  'homogeneous-coordinates': HomogeneousScene,
  'concatenation-of-transformations': ConcatOrderScene,
  'classical-and-computer-viewing': ViewingVolumeScene,
  'viewing-with-a-computer': ViewingVolumeScene,
  'phong-lighting-model': PhongScene,
  'light-sources': PhongScene,
  'light-and-matter': PhongScene,
  'polygonal-shading': PhongScene,
  'cohen-sutherland-clipping': CohenSutherlandScene,
  clipping: CohenSutherlandScene,
  'line-segment-clipping': CohenSutherlandScene,
  'dda-algorithm': DdaScene,
  'line-drawing-algorithms': DdaScene,
  'bresenham-line-algorithm': BresenhamScene,
  'midpoint-circle-algorithm': MidpointCircleScene,
  'circle-generating-algorithms': MidpointCircleScene,
}

function matchKeyword(blob) {
  if (/synthetic.?camera|imaging.?system|physical.?and.?synthetic/.test(blob)) return SyntheticCameraScene
  if (/pipeline|architecture|vertices.?to.?fragment|four.?major|graphics.?system/.test(blob)) return GraphicsPipelineScene
  if (/concatenat|transform.?order|order.?matter/.test(blob)) return ConcatOrderScene
  if (/homogeneous/.test(blob)) return HomogeneousScene
  if (/translat/.test(blob)) return () => <TransformTRSScene mode="translate" />
  if (/rotat/.test(blob)) return () => <TransformTRSScene mode="rotate" />
  if (/scal/.test(blob)) return () => <TransformTRSScene mode="scale" />
  if (/affine/.test(blob)) return () => <TransformTRSScene mode="all" />
  if (/viewing|frustum|view.?volume/.test(blob)) return ViewingVolumeScene
  if (/phong|specular|diffuse|ambient|shading|light.?source|light.?and.?matter/.test(blob)) return PhongScene
  if (/cohen|sutherland|outcode|region.?code/.test(blob)) return CohenSutherlandScene
  if (/\bdda\b/.test(blob)) return DdaScene
  if (/bresenham/.test(blob)) return BresenhamScene
  if (/midpoint.?circle|circle.?generat|8.?way|octant/.test(blob)) return MidpointCircleScene
  if (/clip/.test(blob)) return CohenSutherlandScene
  if (/line.?draw/.test(blob)) return DdaScene
  return null
}

export function beatVisual(unit, beatIndex = 0) {
  const key = unit?.visual
  let Comp = (key && VISUAL_MAP[key]) || null
  if (!Comp) {
    const blob = `${key || ''} ${unit?.topic || ''} ${(unit?.terms || []).join(' ')}`.toLowerCase()
    Comp = matchKeyword(blob)
  }
  if (Comp) {
    // Slight beat variation for transforms showcase
    if (key === 'affine-transformations' && beatIndex === 1) return <TransformTRSScene mode="all" />
    if (key === 'programmable-pipelines' && beatIndex === 2) return <GraphicsPipelineScene />
    return <Comp />
  }
  return <ConceptBoard title={unit?.topic || 'Concept'} points={unit?.terms || []} />
}
