/**
 * SeScenes — BCS501 Software Engineering classroom SVG visuals.
 * Instructional motion (sev-*) demonstrates process mechanisms, not decoration.
 */
const N = '#0f2744'
const BLUE = '#1d4ed8'
const RED = '#dc2626'
const AMBER = '#d97706'
const PURP = '#6d28d9'
const GREEN = '#15803d'
const TEAL = '#0f766e'
const CREAM = '#f4f7fb'
const SKY = '#e8eef8'
const MUTED = '#5b6b7c'
export const SE = { N, BLUE, RED, AMBER, PURP, GREEN, TEAL, CREAM, SKY, MUTED }

export function Scene({ caption, children, vb = '0 0 900 520', className = '' }) {
  return (
    <div className={`se-scene ${className}`} aria-label={caption || 'Software engineering diagram'}>
      <svg viewBox={vb} role="img" className="se-svg">
        <defs>
          <marker id="seArr" markerWidth="10" markerHeight="10" refX="8" refY="4" orient="auto">
            <path d="M0 0 L9 4 L0 8 Z" fill={N} />
          </marker>
          <marker id="seArrB" markerWidth="10" markerHeight="10" refX="8" refY="4" orient="auto">
            <path d="M0 0 L9 4 L0 8 Z" fill={BLUE} />
          </marker>
          <marker id="seArrG" markerWidth="10" markerHeight="10" refX="8" refY="4" orient="auto">
            <path d="M0 0 L9 4 L0 8 Z" fill={GREEN} />
          </marker>
          <marker id="seArrR" markerWidth="10" markerHeight="10" refX="8" refY="4" orient="auto">
            <path d="M0 0 L9 4 L0 8 Z" fill={RED} />
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

function Box({ x, y, w, h, label, sub, fill = SKY, stroke = BLUE, className = '' }) {
  return (
    <g transform={`translate(${x},${y})`} className={className}>
      <rect width={w} height={h} rx="10" fill={fill} stroke={stroke} strokeWidth="2.5" />
      <L x={w / 2} y={h / 2 + (sub ? -2 : 6)} size={sub ? 15 : 16} fill={N}>
        {label}
      </L>
      {sub ? (
        <L x={w / 2} y={h / 2 + 18} size={12} fill={MUTED} weight={700}>
          {sub}
        </L>
      ) : null}
    </g>
  )
}

/* ── Module openers ─────────────────────────────────────────────── */
export function ModuleHero({ module = 1, title, question, hours }) {
  const hues = [BLUE, TEAL, PURP, AMBER, GREEN]
  const hue = hues[(module - 1) % hues.length]
  return (
    <Scene caption={question || 'SEPM visual journey'} className="se-hero-scene">
      <rect x="40" y="40" width="820" height="400" rx="16" fill="#fff" stroke={hue} strokeWidth="3" />
      <L x="450" y="100" size={18} fill={hue}>
        {`MODULE ${module} · BCS501`}
      </L>
      <L x="450" y="160" size={28}>
        {title || `Module ${module}`}
      </L>
      <L x="450" y="210" size={16} fill={MUTED} weight={700}>
        {question || 'Watch the software process come alive'}
      </L>
      <g className="sev-pulse">
        {['Problem', 'Model', 'Mechanism', 'Example', 'Exam'].map((t, i) => (
          <Box key={t} x={70 + i * 150} y={280} w={130} h={70} label={t} fill={SKY} stroke={hue} className="sev-step" />
        ))}
      </g>
      {hours ? (
        <L x="450" y="420" size={14} fill={MUTED}>
          {`${hours} teaching hours · syllabus-complete`}
        </L>
      ) : null}
    </Scene>
  )
}

export function ModuleOutro({ module = 1, title }) {
  return (
    <Scene caption="Redraw the map — then attempt the PYQs">
      <L x="450" y="70" size={24}>{`Module ${module} closed`}</L>
      <L x="450" y="110" size={16} fill={MUTED}>
        {title}
      </L>
      <Box x="120" y="180" w="200" h="120" label="Definitions" sub="precise terms" stroke={BLUE} className="sev-fade-in" />
      <Box x="350" y="180" w="200" h="120" label="Diagrams" sub="labelled flows" stroke={TEAL} className="sev-fade-in" />
      <Box x="580" y="180" w="200" h="120" label="Practice" sub="10-mark answers" stroke={PURP} className="sev-fade-in" />
    </Scene>
  )
}

/* ── Process flow: Req → Design → Impl → Test → Deploy + feedback ─ */
export function ProcessFlowScene({ mode = 'flow' }) {
  const phases = ['Requirements', 'Design', 'Implementation', 'Testing', 'Deployment']
  return (
    <Scene caption="Software process: forward flow + feedback">
      <L x="450" y="48" size={22}>
        Framework activities
      </L>
      {phases.map((p, i) => (
        <g key={p}>
          <Box x={40 + i * 170} y={120} w={150} h={72} label={p} className={`sev-flow-node sev-delay-${i}`} />
          {i < phases.length - 1 ? (
            <line
              x1={190 + i * 170}
              y1={156}
              x2={210 + i * 170}
              y2={156}
              stroke={BLUE}
              strokeWidth="3"
              markerEnd="url(#seArrB)"
              className="sev-flow-arrow"
            />
          ) : null}
        </g>
      ))}
      <path
        d="M 790 200 C 790 320, 110 320, 110 200"
        fill="none"
        stroke={AMBER}
        strokeWidth="3"
        strokeDasharray="8 6"
        markerEnd="url(#seArrR)"
        className="sev-feedback"
      />
      <L x="450" y="350" size={16} fill={AMBER}>
        Feedback & change
      </L>
      {mode === 'umbrella' ? (
        <L x="450" y="400" size={15} fill={MUTED}>
          Umbrella: SQA · SCM · Risk · Measurement · Reviews
        </L>
      ) : null}
    </Scene>
  )
}

/* ── Waterfall cascade + late-change cost ───────────────────────── */
export function WaterfallScene({ showCost = true }) {
  const phases = ['Requirements', 'Design', 'Coding', 'Testing', 'Maintain']
  return (
    <Scene caption="Waterfall cascade — late change is expensive">
      <L x="280" y="40" size={20}>
        Waterfall
      </L>
      {phases.map((p, i) => (
        <Box
          key={p}
          x={80 + i * 36}
          y={70 + i * 70}
          w={220}
          h={56}
          label={p}
          fill={i === 2 ? '#fee2e2' : SKY}
          stroke={i === 2 ? RED : BLUE}
          className={`sev-waterfall sev-delay-${i}`}
        />
      ))}
      {showCost ? (
        <g>
          <L x="620" y="80" size={18} fill={RED}>
            Cost of change
          </L>
          <path d="M 520 420 L 520 120 L 820 120" fill="none" stroke={MUTED} strokeWidth="2" />
          <path d="M 540 400 Q 620 380, 700 280 T 800 140" fill="none" stroke={RED} strokeWidth="4" className="sev-cost-curve" />
          <circle cx="780" cy="160" r="10" fill={RED} className="sev-cost-dot" />
          <L x="700" y="450" size={14} fill={MUTED}>
            Phase →
          </L>
          <L x="500" y="260" size={14} fill={MUTED} anchor="end">
            Cost
          </L>
        </g>
      ) : null}
    </Scene>
  )
}

/* ── Incremental growth ─────────────────────────────────────────── */
export function IncrementalScene() {
  const layers = [
    { label: 'Core', w: 180, fill: '#dbeafe' },
    { label: '+ Feature 1', w: 260, fill: '#bfdbfe' },
    { label: '+ Feature 2', w: 340, fill: '#93c5fd' },
    { label: '+ Feature 3', w: 420, fill: '#60a5fa' },
  ]
  return (
    <Scene caption="Incremental model — the product visibly grows">
      <L x="450" y="48" size={20}>
        Core → increments
      </L>
      {layers.map((layer, i) => (
        <g key={layer.label} className={`sev-grow sev-delay-${i}`}>
          <rect
            x={(900 - layer.w) / 2}
            y={100 + i * 80}
            width={layer.w}
            height={64}
            rx="12"
            fill={layer.fill}
            stroke={BLUE}
            strokeWidth="2.5"
          />
          <L x="450" y={140 + i * 80} size={18}>
            {layer.label}
          </L>
        </g>
      ))}
    </Scene>
  )
}

/* ── Evolutionary / spiral ──────────────────────────────────────── */
export function EvolutionaryScene() {
  return (
    <Scene caption="Evolutionary cycles — each loop reduces uncertainty">
      <L x="450" y="40" size={20}>
        Spiral / prototyping cycles
      </L>
      {[1, 2, 3].map((k) => (
        <ellipse
          key={k}
          cx="450"
          cy="270"
          rx={80 + k * 70}
          ry={50 + k * 45}
          fill="none"
          stroke={k === 3 ? PURP : BLUE}
          strokeWidth="3"
          className={`sev-spiral sev-delay-${k}`}
        />
      ))}
      <L x="450" y="270" size={16} fill={PURP}>
        Product
      </L>
      {['Plan', 'Risk', 'Engineer', 'Evaluate'].map((t, i) => {
        const ang = (i * Math.PI) / 2 - Math.PI / 2
        const x = 450 + Math.cos(ang) * 250
        const y = 270 + Math.sin(ang) * 160
        return (
          <L key={t} x={x} y={y} size={15} fill={TEAL}>
            {t}
          </L>
        )
      })}
    </Scene>
  )
}

/* ── Concurrent activity states ─────────────────────────────────── */
export function ConcurrentScene() {
  const rows = [
    { name: 'Requirements', state: 'Awaiting changes', color: AMBER },
    { name: 'Design', state: 'Under development', color: BLUE },
    { name: 'Coding', state: 'Under review', color: PURP },
    { name: 'Testing', state: 'Done', color: GREEN },
  ]
  return (
    <Scene caption="Concurrent model — activities in different states now">
      <L x="450" y="40" size={20}>
        Same clock · different states
      </L>
      {rows.map((r, i) => (
        <g key={r.name} className={`sev-concurrent sev-delay-${i}`}>
          <Box x={80} y={80 + i * 90} w={280} h={70} label={r.name} />
          <line x1={370} y1={115 + i * 90} x2={470} y2={115 + i * 90} stroke={MUTED} strokeWidth="2" markerEnd="url(#seArr)" />
          <Box x={490} y={80 + i * 90} w={320} h={70} label={r.state} fill="#fff" stroke={r.color} />
        </g>
      ))}
    </Scene>
  )
}

/* ── Unified Process phases with overlapping disciplines ────────── */
export function UnifiedProcessScene() {
  const phases = ['Inception', 'Elaboration', 'Construction', 'Transition']
  const discs = [
    { name: 'Requirements', peaks: [0.7, 0.9, 0.35, 0.15] },
    { name: 'Design', peaks: [0.25, 0.85, 0.55, 0.2] },
    { name: 'Implementation', peaks: [0.1, 0.35, 0.95, 0.4] },
    { name: 'Test', peaks: [0.1, 0.3, 0.7, 0.85] },
  ]
  const colors = [BLUE, TEAL, PURP, AMBER]
  return (
    <Scene caption="Unified Process — phases with overlapping disciplines">
      <L x="450" y="36" size={18}>
        UP hump chart (teaching view)
      </L>
      {phases.map((p, i) => (
        <g key={p}>
          <L x={140 + i * 180} y={70} size={14} fill={MUTED}>
            {p}
          </L>
          <line x1={140 + i * 180} y1={80} x2={140 + i * 180} y2={420} stroke="#d6dde8" strokeWidth="2" />
        </g>
      ))}
      {discs.map((d, di) => {
        const pts = d.peaks
          .map((h, i) => `${140 + i * 180},${400 - h * 260}`)
          .join(' ')
        return (
          <g key={d.name}>
            <polyline
              points={pts}
              fill="none"
              stroke={colors[di]}
              strokeWidth="4"
              className={`sev-up-line sev-delay-${di}`}
            />
            <L x={820} y={120 + di * 36} size={14} fill={colors[di]} anchor="end">
              {d.name}
            </L>
          </g>
        )
      })}
    </Scene>
  )
}

/* ── Requirements engineering cycle ─────────────────────────────── */
export function RequirementsCycleScene() {
  const steps = ['Inception', 'Elicitation', 'Elaboration', 'Negotiation', 'Specification', 'Validation', 'Management']
  const cx = 450
  const cy = 260
  const r = 170
  return (
    <Scene caption="Requirements engineering cycle">
      <circle cx={cx} cy={cy} r={70} fill={SKY} stroke={BLUE} strokeWidth="3" />
      <L x={cx} y={cy + 6} size={16}>
        RE
      </L>
      {steps.map((s, i) => {
        const ang = (i / steps.length) * Math.PI * 2 - Math.PI / 2
        const x = cx + Math.cos(ang) * r
        const y = cy + Math.sin(ang) * r
        return (
          <g key={s} className={`sev-orbit sev-delay-${i % 5}`}>
            <circle cx={x} cy={y} r="38" fill="#fff" stroke={TEAL} strokeWidth="2.5" />
            <L x={x} y={y + 5} size={11}>
              {s}
            </L>
          </g>
        )
      })}
      <circle cx={cx} cy={cy - r} r="6" fill={AMBER} className="sev-token" />
    </Scene>
  )
}

/* ── Use case path ──────────────────────────────────────────────── */
export function UseCaseScene() {
  return (
    <Scene caption="Actor → Action → System Response">
      <ellipse cx="140" cy="220" rx="70" ry="100" fill="#fff" stroke={N} strokeWidth="3" className="sev-actor" />
      <circle cx="140" cy="140" r="28" fill="none" stroke={N} strokeWidth="3" />
      <L x="140" y="360" size={16}>
        Actor
      </L>
      <Box x="280" y="180" w="160" h="80" label="Action" sub="goal step" className="sev-usecase-step" />
      <line x1="210" y1="220" x2="275" y2="220" stroke={BLUE} strokeWidth="3" markerEnd="url(#seArrB)" className="sev-flow-arrow" />
      <Box x="520" y="140" w="280" h="160" label="System" sub="validate · persist · respond" stroke={TEAL} className="sev-system-box" />
      <line x1="445" y1="220" x2="515" y2="220" stroke={TEAL} strokeWidth="3" markerEnd="url(#seArrG)" className="sev-flow-arrow" />
      <path d="M 660 300 C 660 380, 200 380, 200 300" fill="none" stroke={AMBER} strokeWidth="2.5" strokeDasharray="6 5" className="sev-feedback" />
      <L x="430" y="400" size={14} fill={AMBER}>
        Extensions / failures return here
      </L>
    </Scene>
  )
}

/* ── Agile loop + backlog ───────────────────────────────────────── */
export function AgileLoopScene() {
  const cols = ['Backlog', 'Doing', 'Review', 'Done']
  const cards = [
    { x: 70, label: 'Story A' },
    { x: 70, label: 'Story B', y: 1 },
    { x: 280, label: 'Story C' },
    { x: 490, label: 'Story D' },
    { x: 700, label: 'Story E' },
  ]
  return (
    <Scene caption="Agile iteration — backlog items move through a short cycle">
      {cols.map((c, i) => (
        <g key={c}>
          <rect x={40 + i * 210} y="70" width="190" height="340" rx="12" fill="#fff" stroke="#c9d4e4" strokeWidth="2" />
          <L x={135 + i * 210} y="110" size={16} fill={MUTED}>
            {c}
          </L>
        </g>
      ))}
      {cards.map((card, i) => (
        <Box
          key={card.label}
          x={card.x}
          y={140 + (card.y || 0) * 90}
          w={150}
          h={70}
          label={card.label}
          fill="#fef3c7"
          stroke={AMBER}
          className={`sev-backlog-card sev-delay-${i}`}
        />
      ))}
      <L x="450" y="450" size={14} fill={TEAL}>
        Short cycle · demo · retrospective · adapt
      </L>
    </Scene>
  )
}

/* ── XP pipeline ────────────────────────────────────────────────── */
export function XpPipelineScene() {
  const steps = ['User Story', 'Planning', 'Pair Prog.', 'Test', 'Integrate', 'Small Release']
  return (
    <Scene caption="Extreme Programming feedback pipeline">
      {steps.map((s, i) => (
        <g key={s}>
          <Box x={30 + i * 145} y="200" w={130} h="90" label={s} className={`sev-xp-step sev-delay-${i}`} />
          {i < steps.length - 1 ? (
            <line
              x1={160 + i * 145}
              y1={245}
              x2={172 + i * 145}
              y2={245}
              stroke={PURP}
              strokeWidth="3"
              markerEnd="url(#seArr)"
            />
          ) : null}
        </g>
      ))}
      <path d="M 820 300 C 820 400, 80 400, 80 300" fill="none" stroke={GREEN} strokeWidth="3" className="sev-feedback" />
      <L x="450" y="430" size={15} fill={GREEN}>
        Continuous feedback
      </L>
    </Scene>
  )
}

/* ── Stakeholder map ────────────────────────────────────────────── */
export function StakeholderMapScene() {
  return (
    <Scene caption="Stakeholder map — power × interest">
      <line x1="120" y1="420" x2="780" y2="420" stroke={N} strokeWidth="2" markerEnd="url(#seArr)" />
      <line x1="120" y1="420" x2="120" y2="80" stroke={N} strokeWidth="2" markerEnd="url(#seArr)" />
      <L x="450" y="460" size={14} fill={MUTED}>
        Interest →
      </L>
      <L x="50" y="250" size={14} fill={MUTED}>
        Power
      </L>
      <Box x="180" y="280" w="160" h="70" label="Keep informed" fill="#ecfdf5" stroke={GREEN} />
      <Box x="520" y="280" w="160" h="70" label="Keep satisfied" fill="#eff6ff" stroke={BLUE} />
      <Box x="180" y="120" w="160" h="70" label="Monitor" fill="#f8fafc" stroke={MUTED} />
      <Box x="520" y="120" w="200" h="80" label="Manage closely" fill="#fef3c7" stroke={AMBER} className="sev-pulse" />
      <L x="620" y="100" size={13} fill={AMBER}>
        Sponsor / Controller
      </L>
    </Scene>
  )
}

/* ── Risk matrix ────────────────────────────────────────────────── */
export function RiskMatrixScene() {
  const cells = [
    [GREEN, GREEN, AMBER],
    [GREEN, AMBER, RED],
    [AMBER, RED, RED],
  ]
  return (
    <Scene caption="Risk matrix — Probability × Impact">
      <L x="450" y="40" size={18}>
        Evaluate · prioritize · mitigate
      </L>
      {cells.map((row, ri) =>
        row.map((c, ci) => (
          <rect
            key={`${ri}-${ci}`}
            x={220 + ci * 140}
            y={100 + ri * 110}
            width={120}
            height={95}
            rx="10"
            fill={c}
            opacity="0.35"
            stroke={c}
            strokeWidth="3"
            className="sev-risk-cell"
          />
        )),
      )}
      <circle cx="620" cy="150" r="18" fill={RED} className="sev-risk-dot" />
      <L x="680" y="156" size={14} fill={RED} anchor="start">
        High P × High I
      </L>
      <L x="160" y="400" size={13} fill={MUTED}>
        Impact →
      </L>
      <L x="100" y="260" size={13} fill={MUTED}>
        Prob
      </L>
    </Scene>
  )
}

/* ── Cost-benefit bars ──────────────────────────────────────────── */
export function CostBenefitScene() {
  return (
    <Scene caption="Cost–benefit over project years">
      <L x="200" y="80" size={16} fill={RED}>
        Cost
      </L>
      <L x="700" y="80" size={16} fill={GREEN}>
        Benefit
      </L>
      {[1, 2, 3, 4].map((y) => (
        <g key={y} className={`sev-bar sev-delay-${y - 1}`}>
          <rect x={80} y={100 + y * 70} width={40 + y * 30} height={40} rx="6" fill="#fecaca" stroke={RED} strokeWidth="2" />
          <rect x={480} y={100 + y * 70} width={60 + y * 55} height={40} rx="6" fill="#bbf7d0" stroke={GREEN} strokeWidth="2" />
          <L x={40} y={128 + y * 70} size={14} fill={MUTED}>
            {`Y${y}`}
          </L>
        </g>
      ))}
      <L x="450" y="460" size={14} fill={TEAL}>
        Payback when cumulative benefit overtakes cost
      </L>
    </Scene>
  )
}

/* ── Estimation decomposition ───────────────────────────────────── */
export function EstimateDecomposeScene() {
  return (
    <Scene caption="Decomposition — sum parts, then add contingency">
      <Box x="320" y="40" w="260" h="70" label="System" sub="total effort" stroke={PURP} />
      <line x1="450" y1="110" x2="450" y2="150" stroke={N} strokeWidth="2" />
      <line x1="180" y1="150" x2="720" y2="150" stroke={N} strokeWidth="2" />
      {['Auth', 'Core UX', 'Reports', 'Integrate'].map((t, i) => (
        <g key={t} className={`sev-grow sev-delay-${i}`}>
          <line x1={180 + i * 180} y1={150} x2={180 + i * 180} y2={190} stroke={N} strokeWidth="2" />
          <Box x={110 + i * 180} y={190} w={140} h={80} label={t} sub={`${8 + i * 3} PW`} />
        </g>
      ))}
      <Box x="250" y="320" w="400" h="70" label="Sum + contingency buffer" sub="honest range, not false precision" fill="#fef3c7" stroke={AMBER} />
    </Scene>
  )
}

/* ── Quality gates ──────────────────────────────────────────────── */
export function QualityGateScene() {
  const gates = ['Req review', 'Design review', 'Code review', 'Test gate', 'UAT']
  return (
    <Scene caption="Quality is planned as gates on the critical path">
      {gates.map((g, i) => (
        <g key={g}>
          <Box x={40 + i * 170} y="200" w={150} h={80} label={g} stroke={i === 3 ? GREEN : BLUE} className={`sev-gate sev-delay-${i}`} />
          {i < gates.length - 1 ? (
            <line x1={190 + i * 170} y1={240} x2={205 + i * 170} y2={240} stroke={N} strokeWidth="3" markerEnd="url(#seArr)" />
          ) : null}
        </g>
      ))}
      <L x="450" y="360" size={15} fill={MUTED}>
        Prevention & appraisal before failure cost
      </L>
    </Scene>
  )
}

/* ── Myth bust ──────────────────────────────────────────────────── */
export function MythBustScene() {
  return (
    <Scene caption="Myth → Reality (exam pair)">
      <Box x="60" y="140" w="340" h="180" label="MYTH" sub="Adding people late always helps" fill="#fee2e2" stroke={RED} />
      <L x="450" y="230" size={28} fill={AMBER}>
        →
      </L>
      <Box x="500" y="140" w="340" h="180" label="REALITY" sub="Brooks' Law — communication paths explode" fill="#dcfce7" stroke={GREEN} className="sev-pulse" />
    </Scene>
  )
}

/* ── Nature of software / deterioration ─────────────────────────── */
export function SoftwareNatureScene() {
  return (
    <Scene caption="Hardware wears out · Software deteriorates via change">
      <L x="220" y="60" size={16}>
        Hardware bathtub
      </L>
      <path d="M 80 180 Q 140 320, 220 200 T 360 220" fill="none" stroke={BLUE} strokeWidth="4" />
      <L x="680" y="60" size={16}>
        Software change pressure
      </L>
      <path d="M 520 280 Q 620 260, 700 180 T 840 120" fill="none" stroke={RED} strokeWidth="4" className="sev-cost-curve" />
      <Box x="80" y="360" w="200" h="70" label="Instructions" />
      <Box x="320" y="360" w="200" h="70" label="Data structures" />
      <Box x="560" y="360" w="220" h="70" label="Documents" />
    </Scene>
  )
}

/* ── Generic fallback diagram ───────────────────────────────────── */
export function ConceptBoard({ title = 'Concept', points = [] }) {
  return (
    <Scene caption={title}>
      <Box x="250" y="40" w="400" h="80" label={title} stroke={PURP} className="sev-pulse" />
      {(points.length ? points : ['Context', 'Mechanism', 'Example', 'Exam point']).map((p, i) => (
        <Box key={p} x={60 + (i % 4) * 210} y={180 + Math.floor(i / 4) * 120} w="190" h="90" label={p} className={`sev-fade-in sev-delay-${i % 5}`} />
      ))}
    </Scene>
  )
}

const VISUAL_MAP = {
  nature: SoftwareNatureScene,
  webapps: () => <ConceptBoard title="WebApp pressures" points={['Network', 'Content', 'Concurrency', 'Evolution']} />,
  'se-def': () => <ConceptBoard title="SE layers" points={['Tools', 'Methods', 'Process', 'Quality']} />,
  process: ProcessFlowScene,
  practice: () => <ConceptBoard title="Practice loop" points={['Understand', 'Plan', 'Carry out', 'Examine']} />,
  myths: MythBustScene,
  generic: ProcessFlowScene,
  cmmi: () => <ConceptBoard title="Assess → Improve" points={['Assess', 'Gap', 'Pilot', 'Remeasure']} />,
  waterfall: WaterfallScene,
  incremental: IncrementalScene,
  evolutionary: EvolutionaryScene,
  concurrent: ConcurrentScene,
  specialized: () => <ConceptBoard title="Specialized models" points={['CBSE', 'Formal', 'AOP', 'Reuse']} />,
  up: UnifiedProcessScene,
  'psp-tsp': () => <ConceptBoard title="PSP / TSP" points={['Measure', 'Estimate', 'Launch', 'Track']} />,
  re: RequirementsCycleScene,
  groundwork: () => <ConceptBoard title="Groundwork" points={['Stakeholders', 'Goals', 'Feasibility', 'Problem']} />,
  elicit: () => <ConceptBoard title="Elicitation" points={['Interview', 'Workshop', 'Observe', 'Prototype']} />,
  usecase: UseCaseScene,
  'req-model': () => <ConceptBoard title="Requirements model" points={['Scenario', 'Class', 'Flow', 'Behavior']} />,
  negotiate: () => <ConceptBoard title="Negotiate" points={['Conflict', 'Priority', 'Trade-off', 'Agree']} />,
  validate: () => <ConceptBoard title="Validate" points={['Review', 'Testable', 'Prototype', 'Sign-off']} />,
  analysis: () => <ConceptBoard title="Analysis" points={['Partition', 'Abstract', 'Model', 'Trace']} />,
  scenario: UseCaseScene,
  uml: () => <ConceptBoard title="UML views" points={['Activity', 'Sequence', 'State', 'Trace']} />,
  'data-model': () => <ConceptBoard title="Data model" points={['Entity', 'Attribute', 'Relation', 'Cardinality']} />,
  'class-model': () => <ConceptBoard title="Class model" points={['Entity', 'Boundary', 'Control', 'CRC']} />,
  dfd: () => <ConceptBoard title="DFD pieces" points={['Process', 'Flow', 'Store', 'Terminator']} />,
  behavior: () => <ConceptBoard title="Behavior" points={['State', 'Event', 'Transition', 'Guard']} />,
  agility: AgileLoopScene,
  'cost-change': WaterfallScene,
  'agile-process': AgileLoopScene,
  xp: XpPipelineScene,
  'agile-family': () => <ConceptBoard title="Agile family" points={['Scrum', 'Kanban', 'Crystal', 'FDD']} />,
  'agile-tools': () => <ConceptBoard title="Agile tools" points={['Backlog', 'CI', 'Chat', 'Tests']} />,
  'se-knowledge': () => <ConceptBoard title="SE knowledge" points={['Process', 'Methods', 'Tools', 'Judgment']} />,
  'core-principles': () => <ConceptBoard title="Core principles" points={['Value', 'Simple', 'Vision', 'Respect']} />,
  'activity-principles': ProcessFlowScene,
  'pm-intro': () => <ConceptBoard title="Project" points={['Temporary', 'Unique', 'Constraints', 'PM']} />,
  contract: () => <ConceptBoard title="Contract" points={['SOW', 'Accept', 'Change', 'Risk']} />,
  'pm-activities': () => <ConceptBoard title="PM activities" points={['Plan', 'Staff', 'Monitor', 'Control']} />,
  'plans-methods': () => <ConceptBoard title="Plans & methods" points={['Plan', 'Method', 'Tailor', 'Standards']} />,
  categorize: () => <ConceptBoard title="Project types" points={['Domain', 'Novelty', 'Size', 'Enhance']} />,
  stakeholders: StakeholderMapScene,
  objectives: () => <ConceptBoard title="Objectives" points={['SMART', 'Scope', 'Time', 'Quality']} />,
  'business-case': CostBenefitScene,
  'success-fail': () => <ConceptBoard title="Success / failure" points={['Criteria', 'Warnings', 'Causes', 'Recover']} />,
  control: () => <ConceptBoard title="Management control" points={['Plan', 'Actual', 'Variance', 'Act']} />,
  'pm-lifecycle': () => <ConceptBoard title="PM lifecycle" points={['Initiate', 'Plan', 'Execute', 'Close']} />,
  'trad-modern': () => <ConceptBoard title="Traditional vs modern" points={['Predictive', 'Adaptive', 'Hybrid', 'Govern']} />,
  evaluate: () => <ConceptBoard title="Evaluate projects" points={['Strategic', 'Financial', 'Portfolio', 'Kill']} />,
  'cost-benefit': CostBenefitScene,
  risk: RiskMatrixScene,
  'quality-plan': QualityGateScene,
  'quality-importance': CostBenefitScene,
  'quality-def': () => <ConceptBoard title="Define quality" points={['Explicit', 'Implicit', 'Conformance', 'Measure']} />,
  'quality-models': () => <ConceptBoard title="Quality models" points={['Factors', 'Criteria', 'Metrics', 'McCall']} />,
  'product-process': () => <ConceptBoard title="Product vs process" points={['Product', 'Process', 'Measure', 'Improve']} />,
  estimation: EstimateDecomposeScene,
  decompose: EstimateDecomposeScene,
  empirical: EstimateDecomposeScene,
}

export function beatVisual(unit, beatIndex = 0) {
  const key = unit?.visual
  const Comp = VISUAL_MAP[key]
  if (Comp) {
    if (key === 'waterfall' && beatIndex === 1) return <WaterfallScene showCost />
    if (key === 'process' && beatIndex === 1) return <ProcessFlowScene mode="umbrella" />
    return <Comp />
  }
  return <ConceptBoard title={unit?.topic || 'Concept'} points={unit?.terms || []} />
}
