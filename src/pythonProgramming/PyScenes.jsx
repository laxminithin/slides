/**
 * PyScenes — VTU BEC305 Python Programming classroom SVG visuals.
 *
 * Every scene animates a mechanism the syllabus asks students to reproduce:
 * a name rebinding to a new object, a slice copying while an index borrows,
 * a regex engine backtracking over a greedy span, a recv loop draining a
 * socket. Motion carries meaning — nothing here moves purely for decoration.
 *
 * Phase 1 wrote one `visualSpec` paragraph per unit; VISUAL_MAP at the bottom
 * binds each of the 80 `visual` ids to the scene that realises it.
 */

const N = '#10233d'
const BLUE = '#2563eb'
const AMBER = '#c2410c'
const PURP = '#7c3aed'
const TEAL = '#0f766e'
const GREEN = '#15803d'
const RED = '#b91c1c'
const MUTED = '#4f6076'
const CREAM = '#fffdf5'
const SKY = '#e9f0ff'
const WHITE = '#ffffff'
const MONO = 'ui-monospace,SFMono-Regular,Menlo,Consolas,monospace'

export const PALETTE = { N, BLUE, AMBER, PURP, TEAL, GREEN, RED, MUTED, CREAM, SKY }

/* JSX attributes arrive as strings when written `y="200"`, and `"200" + 11`
   is "20011", not 211 — which silently throws geometry off the canvas. Every
   helper that does arithmetic on a coordinate prop coerces first. */
const n = (v) => Number(v)

/* ── Shell ──────────────────────────────────────────────────────── */

export function Scene({ caption, children, vb = '0 0 900 520', className = '' }) {
  return (
    <div className={`py-scene ${className}`} aria-label={caption || 'Python Programming diagram'}>
      <svg viewBox={vb} role="img" className="py-svg">
        <defs>
          <marker id="pyArr" markerWidth="10" markerHeight="10" refX="8" refY="4" orient="auto">
            <path d="M0 0 L9 4 L0 8 Z" fill={N} />
          </marker>
          <marker id="pyArrB" markerWidth="10" markerHeight="10" refX="8" refY="4" orient="auto">
            <path d="M0 0 L9 4 L0 8 Z" fill={BLUE} />
          </marker>
          <marker id="pyArrA" markerWidth="10" markerHeight="10" refX="8" refY="4" orient="auto">
            <path d="M0 0 L9 4 L0 8 Z" fill={AMBER} />
          </marker>
          <marker id="pyArrT" markerWidth="10" markerHeight="10" refX="8" refY="4" orient="auto">
            <path d="M0 0 L9 4 L0 8 Z" fill={TEAL} />
          </marker>
          <marker id="pyArrR" markerWidth="10" markerHeight="10" refX="8" refY="4" orient="auto">
            <path d="M0 0 L9 4 L0 8 Z" fill={RED} />
          </marker>
          <marker id="pyArrG" markerWidth="10" markerHeight="10" refX="8" refY="4" orient="auto">
            <path d="M0 0 L9 4 L0 8 Z" fill={GREEN} />
          </marker>
          <marker id="pyArrP" markerWidth="10" markerHeight="10" refX="8" refY="4" orient="auto">
            <path d="M0 0 L9 4 L0 8 Z" fill={PURP} />
          </marker>
        </defs>
        <rect width="100%" height="100%" fill={CREAM} rx="8" />
        {children}
        {caption ? (
          <text x="450" y="504" textAnchor="middle" fontSize="15" fontWeight="700" fill={MUTED} fontFamily="system-ui,sans-serif">
            {caption}
          </text>
        ) : null}
      </svg>
    </div>
  )
}

export function L({ x, y, children, size = 17, fill = N, anchor = 'middle', weight = 800, className = '' }) {
  return (
    <text
      x={x}
      y={y}
      textAnchor={anchor}
      fontSize={size}
      fontWeight={weight}
      fill={fill}
      fontFamily="system-ui,sans-serif"
      className={className}
    >
      {children}
    </text>
  )
}

/** Monospaced label — anything that is literally Python source, a path, a
 *  pattern or a byte string is set in mono so it reads as code, not prose. */
export function M({ x, y, children, size = 13.5, fill = N, anchor = 'start', weight = 600, className = '' }) {
  return (
    <text x={x} y={y} textAnchor={anchor} fontSize={size} fontWeight={weight} fill={fill} fontFamily={MONO} className={className}>
      {children}
    </text>
  )
}

/* A CSS `transform` animation replaces the SVG `transform` attribute on the
   same element, so anything positioned with translate() keeps its animation
   on an inner group. Applies to every symbol helper below. */
function Box({ x, y, w, h, label, sub, fill = WHITE, stroke = BLUE, className = '', labelFill = N, mono = false, size }) {
  const W = n(w)
  const H = n(h)
  const Text = mono ? M : L
  return (
    <g transform={`translate(${x},${y})`}>
      <g className={className}>
        <rect width={W} height={H} rx="10" fill={fill} stroke={stroke} strokeWidth="2.5" />
        {label ? (
          <Text x={W / 2} y={H / 2 + (sub ? -2 : 6)} size={size || (sub ? 14 : 15)} fill={labelFill} anchor="middle">
            {label}
          </Text>
        ) : null}
        {sub ? (
          <L x={W / 2} y={H / 2 + 18} size={11.5} fill={MUTED} weight={700}>
            {sub}
          </L>
        ) : null}
      </g>
    </g>
  )
}

function Wire({ d, stroke = N, width = 2.6, className = '', marker, dash }) {
  return (
    <path
      d={d}
      fill="none"
      stroke={stroke}
      strokeWidth={width}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      markerEnd={marker}
      strokeDasharray={dash}
    />
  )
}

function Dot({ cx, cy, r = 5, fill = N, className = '' }) {
  return <circle cx={cx} cy={cy} r={r} fill={fill} className={className} />
}

/* ── Python-specific primitives ─────────────────────────────────── */

/**
 * An interactive-shell transcript. A line starting `>>>` or `...` is what the
 * student typed; everything else is what the interpreter printed back. The
 * distinction is the whole point of the REPL, so it is drawn, not described.
 */
function Shell({ x, y, w = 380, lines = [], title = 'Python 3 shell', className = '', accent = BLUE }) {
  const X = n(x)
  const Y = n(y)
  const W = n(w)
  const h = 38 + lines.length * 22 + 12
  return (
    <g transform={`translate(${X},${Y})`}>
      <g className={className}>
        <rect width={W} height={h} rx="10" fill="#0f172a" stroke={accent} strokeWidth="2.4" />
        <rect width={W} height="30" rx="10" fill="#1e293b" />
        <rect y="20" width={W} height="10" fill="#1e293b" />
        <circle cx="18" cy="15" r="4.5" fill="#ef4444" />
        <circle cx="34" cy="15" r="4.5" fill="#f59e0b" />
        <circle cx="50" cy="15" r="4.5" fill="#22c55e" />
        <M x={68} y={20} size={11.5} fill="#94a3b8" weight={700}>
          {title}
        </M>
        {lines.map((line, i) => {
          const prompt = /^(>>>|\.\.\.)/.test(line)
          return (
            <M key={`${line}-${i}`} x={16} y={54 + i * 22} size={13} fill={prompt ? '#e2e8f0' : '#7dd3fc'} weight={prompt ? 700 : 600}>
              {line}
            </M>
          )
        })}
      </g>
    </g>
  )
}

/**
 * A source listing with line numbers. `mark` spotlights one 0-based line —
 * the line the scene is currently talking about.
 */
function Code({ x, y, w = 380, lines = [], mark = -1, title, className = '', accent = BLUE, size = 13 }) {
  const X = n(x)
  const Y = n(y)
  const W = n(w)
  const top = title ? 30 : 12
  const h = top + lines.length * 21 + 12
  return (
    <g transform={`translate(${X},${Y})`}>
      <g className={className}>
        <rect width={W} height={h} rx="10" fill={WHITE} stroke={accent} strokeWidth="2.4" />
        {title ? (
          <>
            <rect width={W} height="26" rx="10" fill={accent} opacity="0.12" />
            <rect y="16" width={W} height="10" fill={accent} opacity="0.12" />
            <M x={12} y={18} size={11.5} fill={accent} weight={800}>
              {title}
            </M>
          </>
        ) : null}
        {lines.map((line, i) => (
          <g key={`${line}-${i}`}>
            {i === n(mark) ? <rect x="4" y={top + i * 21 - 14} width={W - 8} height="20" rx="5" fill={AMBER} opacity="0.16" /> : null}
            <M x={14} y={top + i * 21} size={size - 2} fill={MUTED} weight={700}>
              {i + 1}
            </M>
            <M x={34} y={top + i * 21} size={size} fill={i === n(mark) ? AMBER : N} weight={i === n(mark) ? 800 : 600}>
              {line}
            </M>
          </g>
        ))}
      </g>
    </g>
  )
}

/** One slot of a sequence, drawn with its index above and, optionally, its
 *  negative index below — the two rulers Python lays over the same cells. */
function Cell({ x, y, w = 62, h = 44, value, idx, neg, fill = WHITE, stroke = BLUE, className = '', valueFill = N }) {
  const X = n(x)
  const Y = n(y)
  const W = n(w)
  const H = n(h)
  return (
    <g transform={`translate(${X},${Y})`}>
      <g className={className}>
        <rect width={W} height={H} rx="7" fill={fill} stroke={stroke} strokeWidth="2.2" />
        <M x={W / 2} y={H / 2 + 5} size={13.5} fill={valueFill} anchor="middle" weight={700}>
          {value}
        </M>
      </g>
      {idx !== undefined ? (
        <M x={W / 2} y={-8} size={12} fill={BLUE} anchor="middle" weight={800}>
          {idx}
        </M>
      ) : null}
      {neg !== undefined ? (
        <M x={W / 2} y={H + 18} size={12} fill={AMBER} anchor="middle" weight={800}>
          {neg}
        </M>
      ) : null}
    </g>
  )
}

/** Python's name model: a name is a label tied to an object, never a box that
 *  holds one. Every scene about assignment, aliasing or copying uses this. */
function Bind({ x, y, name, value, stroke = BLUE, className = '', valueStroke, sub }) {
  const X = n(x)
  const Y = n(y)
  return (
    <g transform={`translate(${X},${Y})`}>
      <g className={className}>
        <rect width="104" height="34" rx="17" fill={WHITE} stroke={stroke} strokeWidth="2.2" />
        <M x={52} y={22} size={13} fill={stroke} anchor="middle" weight={800}>
          {name}
        </M>
        <Wire d="M108 17 L150 17" stroke={stroke} width="2.4" marker={`url(#pyArr${stroke === AMBER ? 'A' : stroke === GREEN ? 'G' : stroke === PURP ? 'P' : 'B'})`} />
        <rect x="154" y="-2" width="128" height="42" rx="9" fill={SKY} stroke={valueStroke || stroke} strokeWidth="2.2" />
        <M x={218} y={sub ? 18 : 24} size={13.5} fill={N} anchor="middle" weight={800}>
          {value}
        </M>
        {sub ? (
          <L x={218} y={33} size={10.5} fill={MUTED} weight={700} anchor="middle">
            {sub}
          </L>
        ) : null}
      </g>
    </g>
  )
}

/** A labelled panel of rows — the workhorse for "here are the five things
 *  this function guarantees" scenes that have no better spatial metaphor. */
function Panel({ x, y, w = 380, title, rows = [], accent = BLUE, className = '', mono = false, rowH = 34 }) {
  const X = n(x)
  const Y = n(y)
  const W = n(w)
  const h = 34 + rows.length * n(rowH) + 10
  const Text = mono ? M : L
  return (
    <g transform={`translate(${X},${Y})`}>
      <g className={className}>
        <rect width={W} height={h} rx="11" fill={WHITE} stroke={accent} strokeWidth="2.4" />
        <rect width={W} height="30" rx="11" fill={accent} />
        <rect y="20" width={W} height="10" fill={accent} />
        <L x={W / 2} y={21} size={13} fill={WHITE} weight={800}>
          {title}
        </L>
        {rows.map((row, i) => {
          const [label, note] = Array.isArray(row) ? row : [row, null]
          return (
            <g key={`${label}-${i}`}>
              <Dot cx={20} cy={n(rowH) * i + 50} r={4.5} fill={accent} />
              <Text x={34} y={n(rowH) * i + 55} size={mono ? 12.5 : 13.5} fill={N} anchor="start" weight={700}>
                {label}
              </Text>
              {note ? (
                <L x={W - 14} y={n(rowH) * i + 55} size={11.5} fill={MUTED} anchor="end" weight={700}>
                  {note}
                </L>
              ) : null}
            </g>
          )
        })}
      </g>
    </g>
  )
}

/** A verdict tag — PASS / FAIL / None / TypeError. Small, loud, and always in
 *  the same place so students learn where to look for the outcome. */
function Tag({ x, y, text, tone = GREEN, className = '', w = 96 }) {
  const X = n(x)
  const Y = n(y)
  const W = n(w)
  /* The animation class must sit on an inner group: a CSS transform replaces
     the SVG transform attribute on the same element, which snaps the tag to
     the origin. */
  return (
    <g transform={`translate(${X},${Y})`}>
      <g className={className}>
        <rect width={W} height="28" rx="14" fill={tone} opacity="0.14" />
        <rect width={W} height="28" rx="14" fill="none" stroke={tone} strokeWidth="2" />
        <M x={W / 2} y={19} size={12.5} fill={tone} anchor="middle" weight={800}>
          {text}
        </M>
      </g>
    </g>
  )
}

/* ── Generic teaching scenes ────────────────────────────────────── */

export function ModuleHero({ module = 1, title, question, hours }) {
  const beats = ['Read', 'Run', 'Inspect', 'Fix', 'Keep']
  return (
    <Scene caption={question || 'Type it, run it, read what it actually did'}>
      <rect x="40" y="36" width="820" height="410" rx="16" fill={WHITE} stroke={BLUE} strokeWidth="3" />
      <L x="450" y="104" size={18} fill={BLUE}>{`MODULE ${module} · VTU BEC305`}</L>
      <L x="450" y="162" size={25}>{title || `Module ${module}`}</L>
      <L x="450" y="208" size={14.5} fill={MUTED} weight={700}>
        {question || 'Turn an idea into a program that runs'}
      </L>
      {beats.map((t, i) => (
        <Box key={t} x={70 + i * 154} y={264} w={134} h={68} label={t} className={`pym-flux pym-delay-${i}`} />
      ))}
      <Wire d="M204 298 L224 298" stroke={BLUE} className="pym-current" marker="url(#pyArrB)" />
      <Wire d="M358 298 L378 298" stroke={BLUE} className="pym-current pym-delay-1" marker="url(#pyArrB)" />
      <Wire d="M512 298 L532 298" stroke={BLUE} className="pym-current pym-delay-2" marker="url(#pyArrB)" />
      <Wire d="M666 298 L686 298" stroke={BLUE} className="pym-current pym-delay-3" marker="url(#pyArrB)" />
      {hours ? <L x="450" y="396" size={14} fill={MUTED} weight={700}>{`${hours} teaching hours`}</L> : null}
    </Scene>
  )
}

export function ModuleOutro({ module = 1, title }) {
  return (
    <Scene caption="Retype the programs from memory — then attempt the PYQs">
      <L x="450" y="86" size={19} fill={BLUE}>{`MODULE ${module} COMPLETE`}</L>
      <L x="450" y="140" size={24}>{title || 'Module complete'}</L>
      {['Read the error, not the code', 'Test one expression in the shell', 'Name the type before the bug', 'Print the value you doubt', 'Keep it in a .py file'].map((t, i) => (
        <g key={t} className={`pym-cell-in pym-delay-${i}`}>
          <Box x={64} y={190 + i * 52} w={772} h={44} label={t} stroke={i % 2 ? TEAL : BLUE} />
        </g>
      ))}
    </Scene>
  )
}

export function ConceptBoard({ title = 'Concept', points = [] }) {
  const rows = points.slice(0, 6)
  return (
    <Scene caption="Key terms for this unit">
      <Box x="60" y="52" w="780" h="58" label={title} stroke={BLUE} />
      {rows.map((p, i) => (
        <g key={String(p)} className={`pym-cell-in pym-delay-${i % 5}`}>
          <rect x="60" y={134 + i * 58} width="780" height="46" rx="9" fill={WHITE} stroke={MUTED} strokeWidth="1.8" />
          <circle cx="92" cy={157 + i * 58} r="8" fill={i % 2 ? AMBER : BLUE} />
          <L x="118" y={163 + i * 58} size={16} anchor="start">{String(p)}</L>
        </g>
      ))}
    </Scene>
  )
}

/** A left-to-right procedure. Used where the unit's mechanism genuinely is a
 *  sequence of stages rather than a shape. */
export function PipelineScene({ steps = [], title = 'Procedure', accent = BLUE, caption }) {
  const rows = steps.slice(0, 6)
  return (
    <Scene caption={caption || 'Each stage hands its result to the next'}>
      <Box x="60" y="48" w="780" h="52" label={title} stroke={accent} />
      {rows.map((st, i) => (
        <g key={String(st)} className={`pym-slide-in pym-delay-${i % 5}`}>
          <rect x="60" y={124 + i * 58} width="780" height="46" rx="9" fill={WHITE} stroke={i % 2 ? accent : MUTED} strokeWidth="2" />
          <circle cx="92" cy={147 + i * 58} r="13" fill={accent} />
          <L x="92" y={153 + i * 58} size={13} fill={WHITE}>{i + 1}</L>
          <foreignObject x="116" y={130 + i * 58} width="710" height="34">
            <div xmlns="http://www.w3.org/1999/xhtml" style={{ font: '700 13.5px/1.25 system-ui,sans-serif', color: '#10233d', display: 'flex', alignItems: 'center', height: '100%' }}>
              {String(st)}
            </div>
          </foreignObject>
        </g>
      ))}
    </Scene>
  )
}

/** Two columns that disagree. The single most common shape in this subject:
 *  index versus slice, list versus dict, greedy versus lazy, pure versus
 *  modifier. Both sides get equal weight; the caption names the decision. */
export function TwoCaseScene({ left, right, caption = 'Two cases, two different answers' }) {
  const col = (side, x, accent) => (
    <g>
      <rect x={x} y="58" width="382" height="392" rx="14" fill={WHITE} stroke={accent} strokeWidth="2.6" />
      <rect x={x} y="58" width="382" height="46" rx="14" fill={accent} />
      <rect x={x} y="86" width="382" height="18" fill={accent} />
      <L x={n(x) + 191} y="88" size={15} fill={WHITE}>{side.title}</L>
      {(side.points || []).slice(0, 5).map((p, i) => (
        <g key={String(p)} className={`pym-cell-in pym-delay-${i}`}>
          <Dot cx={n(x) + 28} cy={142 + i * 62} r={5.5} fill={accent} />
          <foreignObject x={n(x) + 44} y={124 + i * 62} width="320" height="52">
            <div xmlns="http://www.w3.org/1999/xhtml" style={{ font: '700 13px/1.3 system-ui,sans-serif', color: '#10233d' }}>
              {String(p)}
            </div>
          </foreignObject>
        </g>
      ))}
    </g>
  )
  return (
    <Scene caption={caption}>
      {col(left || { title: 'Case A', points: [] }, 44, BLUE)}
      {col(right || { title: 'Case B', points: [] }, 474, AMBER)}
      <circle cx="450" cy="254" r="22" fill={CREAM} stroke={MUTED} strokeWidth="2.4" className="pym-flux" />
      <L x="450" y="260" size={14} fill={MUTED}>vs</L>
    </Scene>
  )
}

/** A ranked ladder of choices — "reach for the simplest thing that holds".
 *  Rungs light in order so the reading direction is unambiguous. */
export function LadderScene({ rungs = [], caption, title = 'Pick the lowest rung that holds' }) {
  const rows = rungs.slice(0, 5)
  return (
    <Scene caption={caption || 'Climb only when the rung below genuinely fails'}>
      <L x="450" y="62" size={17} fill={BLUE}>{title}</L>
      {rows.map((r, i) => {
        const [label, note, accent] = r
        const y = 400 - i * 72
        const w = 300 + i * 100
        return (
          <g key={label} className={`pym-slide-in pym-delay-${i}`}>
            <rect x={(900 - w) / 2} y={y} width={w} height="56" rx="10" fill={WHITE} stroke={accent || BLUE} strokeWidth="2.6" />
            <M x={(900 - w) / 2 + 20} y={y + 26} size={14} fill={accent || BLUE} weight={800}>
              {label}
            </M>
            <L x={(900 - w) / 2 + 20} y={y + 45} size={11.5} fill={MUTED} anchor="start" weight={700}>
              {note}
            </L>
          </g>
        )
      })}
    </Scene>
  )
}

/* ── Module 1 — basics, flow control, functions ─────────────────── */

export function ReplLoopScene() {
  const stages = [
    ['Read', 220, 130],
    ['Evaluate', 340, 218],
    ['Print', 220, 306],
    ['Loop', 100, 218],
  ]
  return (
    <Scene caption="feedback in two seconds">
      <circle cx="220" cy="218" r="112" fill="none" stroke={MUTED} strokeWidth="2" strokeDasharray="6 8" />
      {stages.map(([label, cx, cy], i) => (
        <g key={label} className={`pym-cell-in pym-delay-${i}`}>
          <circle cx={cx} cy={cy} r="44" fill={WHITE} stroke={i === 1 ? AMBER : BLUE} strokeWidth="2.6" />
          <L x={cx} y={cy + 5} size={13.5} fill={i === 1 ? AMBER : BLUE}>{label}</L>
        </g>
      ))}
      {/* The CSS token animation has a fixed transform-origin tuned for a
          centre-stage diagram; this loop sits left, so the expression rides
          the circle with SVG's own motion instead. */}
      <circle r="9" fill={AMBER}>
        <animateMotion dur="6s" repeatCount="indefinite" path="M220 130 A112 112 0 1 1 219.9 130 Z" />
      </circle>

      <Shell
        x="420"
        y="66"
        w="440"
        className="pym-slide-in pym-delay-2"
        lines={['>>> 2 + 3 * 4', '14', '>>> (2 + 3) * 4', '20']}
      />
      <Tag x="420" y="212" text="nothing saved" tone={AMBER} w={150} className="pym-fade-in pym-delay-3" />

      <Code
        x="420"
        y="262"
        w="440"
        title="precedence.py"
        accent={GREEN}
        className="pym-slide-in pym-delay-4"
        lines={['print(2 + 3 * 4)', 'print((2 + 3) * 4)']}
      />
      <Tag x="420" y="368" text="saved and re-runnable" tone={GREEN} w={210} className="pym-fade-in pym-delay-4" />
    </Scene>
  )
}

export function TypeBoxesScene() {
  const boxes = [
    ['int', '42  -3  0', 'whole, exact, unbounded', BLUE],
    ['float', '3.14  -0.5', 'binary fraction, approximate', AMBER],
    ['str', "'hello'  \"42\"", 'sequence of characters', TEAL],
  ]
  return (
    <Scene caption="The value carries the type; the name does not">
      {boxes.map(([name, sample, note, accent], i) => (
        <g key={name} className={`pym-cell-in pym-delay-${i}`}>
          <rect x={48 + i * 274} y="70" width="252" height="186" rx="13" fill={WHITE} stroke={accent} strokeWidth="2.8" />
          <rect x={48 + i * 274} y="70" width="252" height="42" rx="13" fill={accent} />
          <rect x={48 + i * 274} y="94" width="252" height="18" fill={accent} />
          <M x={174 + i * 274} y="98" size={16} fill={WHITE} anchor="middle" weight={800}>{name}</M>
          <M x={174 + i * 274} y="156" size={14.5} anchor="middle" fill={N} weight={700}>{sample}</M>
          <foreignObject x={64 + i * 274} y={176} width="220" height="60">
            <div xmlns="http://www.w3.org/1999/xhtml" style={{ font: '700 12.5px/1.3 system-ui,sans-serif', color: '#4f6076', textAlign: 'center' }}>
              {note}
            </div>
          </foreignObject>
        </g>
      ))}
      <Shell
        x="48"
        y="290"
        w="800"
        className="pym-slide-in pym-delay-3"
        title="the shell tells you the type"
        lines={[">>> 0.1 + 0.2", '0.30000000000000004', ">>> '5' + 5", "TypeError: can only concatenate str (not \"int\") to str"]}
      />
    </Scene>
  )
}

export function OperatorSwitchScene() {
  return (
    <Scene caption="One symbol, two behaviours — the operand types decide">
      <rect x="380" y="200" width="140" height="106" rx="14" fill={WHITE} stroke={PURP} strokeWidth="3" className="pym-flux" />
      <M x="450" y="248" size={30} fill={PURP} anchor="middle" weight={800}>+</M>
      <L x="450" y="284" size={11.5} fill={MUTED} weight={700}>dispatch on type</L>

      <g className="pym-slide-in">
        <rect x="44" y="76" width="296" height="118" rx="12" fill={SKY} stroke={BLUE} strokeWidth="2.4" />
        <M x="64" y="108" size={14} fill={BLUE} weight={800}>int + int</M>
        <M x="64" y="140" size={15}>3 + 4</M>
        <M x="64" y="170" size={15} fill={GREEN} weight={800}>→ 7   (arithmetic)</M>
      </g>
      <Wire d="M344 140 L380 218" stroke={BLUE} className="pym-current" marker="url(#pyArrB)" />

      <g className="pym-slide-in pym-delay-2">
        <rect x="44" y="318" width="296" height="118" rx="12" fill="#fff4ec" stroke={AMBER} strokeWidth="2.4" />
        <M x="64" y="350" size={14} fill={AMBER} weight={800}>str + str</M>
        <M x="64" y="382" size={15}>'3' + '4'</M>
        <M x="64" y="412" size={15} fill={GREEN} weight={800}>→ '34'  (join)</M>
      </g>
      <Wire d="M344 372 L380 290" stroke={AMBER} className="pym-current pym-delay-1" marker="url(#pyArrA)" />

      <g className="pym-cell-in pym-delay-3">
        <rect x="560" y="76" width="296" height="146" rx="12" fill={WHITE} stroke={TEAL} strokeWidth="2.4" />
        <M x="580" y="108" size={14} fill={TEAL} weight={800}>* replicates</M>
        <M x="580" y="140" size={15}>'ab' * 3</M>
        <M x="580" y="170" size={15} fill={GREEN} weight={800}>→ 'ababab'</M>
        <L x="708" y="200" size={11.5} fill={MUTED} weight={700}>str × int only</L>
      </g>

      <g className="pym-cell-in pym-delay-4">
        <rect x="560" y="290" width="296" height="146" rx="12" fill={WHITE} stroke={RED} strokeWidth="2.4" />
        <M x="580" y="322" size={14} fill={RED} weight={800}>mixed types</M>
        <M x="580" y="354" size={15}>'3' + 4</M>
        <M x="580" y="384" size={13.5} fill={RED} weight={800}>TypeError</M>
        <L x="708" y="414" size={11.5} fill={MUTED} weight={700}>no silent coercion</L>
      </g>
    </Scene>
  )
}

export function NameBindingScene({ rebind = true }) {
  return (
    <Scene caption="A name is a label tied to an object, not a box that holds one">
      <Bind x="60" y="96" name="spam" value="42" className="pym-cell-in" sub="int object" />
      <Shell x="60" y="168" w="360" className="pym-slide-in pym-delay-1" lines={['>>> spam = 42', ">>> spam = 'hello'", '>>> spam', "'hello'"]} />

      {rebind ? (
        <>
          <Bind x="470" y="96" name="spam" value="'hello'" stroke={AMBER} className="pym-cell-in pym-delay-2" sub="str object — rebound" />
          <g className="pym-fade-in pym-delay-3">
            <rect x="470" y="182" width="382" height="92" rx="11" fill="#fff4ec" stroke={AMBER} strokeWidth="2.2" />
            <L x="490" y="210" size={13} fill={AMBER} anchor="start">The int was never changed</L>
            <foreignObject x="490" y="220" width="346" height="50">
              <div xmlns="http://www.w3.org/1999/xhtml" style={{ font: '700 12.5px/1.35 system-ui,sans-serif', color: '#4f6076' }}>
                Assignment moves the label. The 42 object is simply left with nobody pointing at it.
              </div>
            </foreignObject>
          </g>
        </>
      ) : null}

      <Panel
        x="470"
        y="292"
        w="382"
        title="Legal names"
        accent={GREEN}
        className="pym-cell-in pym-delay-4"
        mono
        rowH={30}
        rows={[['letters, digits, _ — never start with a digit'], ['case matters: spam ≠ Spam'], ['no keywords: class, if, def, lambda']]}
      />
      <Panel x="60" y="292" w="382" title="What assignment is not" accent={MUTED} className="pym-cell-in pym-delay-3" rowH={30} rows={[['not a copy of the value'], ['not a typed declaration'], ['not equality — that is ==']]} />
    </Scene>
  )
}

export function LineTraceScene() {
  const lines = ['# hello.py', "print('Hello world!')", "name = input('Your name? ')", "print('Nice to meet you, ' + name)", 'length = len(name)', "print('Your name has ' + str(length) + ' letters.')"]
  return (
    <Scene caption="The interpreter runs line 1, then line 2, then line 3 — nothing else">
      <Code x="44" y="58" w="470" lines={lines} title="hello.py" accent={BLUE} className="pym-slide-in" />
      {lines.map((_, i) => (
        <g key={i} className={`pym-cell-in pym-delay-${i % 5}`}>
          <circle cx="536" cy={90 + i * 21} r="7" fill={i % 2 ? AMBER : BLUE} />
          <L x="536" y={94 + i * 21} size={9.5} fill={WHITE}>{i + 1}</L>
        </g>
      ))}
      <Wire d="M536 84 L536 200" stroke={MUTED} width="2" dash="5 6" />
      <Shell
        x="574"
        y="58"
        w="288"
        title="what it prints"
        className="pym-slide-in pym-delay-2"
        lines={['Hello world!', 'Your name? Asha', 'Nice to meet you, Asha', 'Your name has 4 letters.']}
      />
      <g className="pym-fade-in pym-delay-4">
        <rect x="44" y="264" width="470" height="176" rx="12" fill={WHITE} stroke={TEAL} strokeWidth="2.4" />
        <L x="279" y="294" size={14} fill={TEAL}>Every line does one nameable job</L>
        {[
          ['# comment', 'ignored entirely by the interpreter'],
          ['print(...)', 'writes a string to the screen'],
          ['input(...)', 'pauses, returns what was typed — as a str'],
          ['str(length)', 'converts so + can join, not add'],
        ].map(([a, b], i) => (
          <g key={a}>
            <M x="66" y={328 + i * 27} size={12.5} fill={BLUE} weight={800}>{a}</M>
            <L x="200" y={328 + i * 27} size={12} fill={MUTED} anchor="start" weight={700}>{b}</L>
          </g>
        ))}
      </g>
      <Tag x="574" y="264" text="input() always returns str" tone={AMBER} w={288} className="pym-fade-in pym-delay-4" />
      <g className="pym-cell-in pym-delay-3">
        <rect x="574" y="308" width="288" height="132" rx="12" fill="#fff4ec" stroke={AMBER} strokeWidth="2.2" />
        <M x="592" y="340" size={13}>age = input()</M>
        <M x="592" y="366" size={13} fill={RED} weight={800}>age + 1 → TypeError</M>
        <M x="592" y="398" size={13} fill={GREEN} weight={800}>int(age) + 1 → works</M>
        <L x="718" y="424" size={11} fill={MUTED} weight={700}>convert at the boundary</L>
      </g>
    </Scene>
  )
}

export function BuiltinPanelScene() {
  const fns = [
    ['print(x)', 'writes to the screen, returns None', BLUE],
    ['input(p)', 'reads a line, always returns str', AMBER],
    ['len(s)', 'items in a str, list, dict or tuple', TEAL],
    ['str(x)', 'the printable text form of x', PURP],
    ['int(s)', 'text → whole number, raises on junk', GREEN],
    ['float(s)', 'text → real number', RED],
  ]
  return (
    <Scene caption="Six functions cover almost every first program">
      {fns.map(([sig, note, accent], i) => {
        const x = 44 + (i % 2) * 412
        const y = 60 + Math.floor(i / 2) * 118
        return (
          <g key={sig} className={`pym-cell-in pym-delay-${i % 5}`}>
            <rect x={x} y={y} width="400" height="98" rx="12" fill={WHITE} stroke={accent} strokeWidth="2.5" />
            <rect x={x} y={y} width="8" height="98" rx="4" fill={accent} />
            <M x={x + 26} y={y + 38} size={16} fill={accent} weight={800}>{sig}</M>
            <foreignObject x={x + 26} y={y + 50} width="356" height="42">
              <div xmlns="http://www.w3.org/1999/xhtml" style={{ font: '700 12.5px/1.3 system-ui,sans-serif', color: '#4f6076' }}>
                {note}
              </div>
            </foreignObject>
          </g>
        )
      })}
      <g className="pym-fade-in pym-delay-4">
        <rect x="44" y="418" width="812" height="52" rx="11" fill={SKY} stroke={BLUE} strokeWidth="2.2" />
        <M x="70" y="450" size={14} fill={BLUE} weight={800}>len(42)</M>
        <L x="170" y="450" size={12.5} fill={RED} anchor="start" weight={800}>TypeError — an int has no length</L>
        <L x="836" y="450" size={12} fill={MUTED} anchor="end" weight={700}>length is a property of sequences</L>
      </g>
    </Scene>
  )
}

export function BoolFunnelScene() {
  const rows = [
    ['42 == 42', 'True', GREEN],
    ["'42' == 42", 'False', RED],
    ['3 < 5', 'True', GREEN],
    ["'b' > 'a'", 'True', GREEN],
    ['42 != 42.0', 'False', RED],
  ]
  return (
    <Scene caption="Every comparison collapses to exactly one of two values">
      {rows.map(([expr], i) => (
        <g key={expr} className={`pym-slide-in pym-delay-${i}`}>
          <rect x="44" y={68 + i * 62} width="270" height="48" rx="9" fill={WHITE} stroke={BLUE} strokeWidth="2.2" />
          <M x="62" y={98 + i * 62} size={14}>{expr}</M>
          <Wire d={`M320 ${92 + i * 62} L392 ${212 + (i - 2) * 12}`} stroke={MUTED} width="2" dash="5 6" />
        </g>
      ))}
      <path d="M396 120 L560 218 L560 300 L396 398 Z" fill={SKY} stroke={BLUE} strokeWidth="2.6" className="pym-flux" />
      <L x="478" y="266" size={14} fill={BLUE}>bool</L>
      <g className="pym-cell-in pym-delay-3">
        <rect x="614" y="150" width="238" height="80" rx="12" fill={WHITE} stroke={GREEN} strokeWidth="2.8" />
        <M x="733" y="200" size={22} fill={GREEN} anchor="middle" weight={800}>True</M>
      </g>
      <g className="pym-cell-in pym-delay-4">
        <rect x="614" y="278" width="238" height="80" rx="12" fill={WHITE} stroke={RED} strokeWidth="2.8" />
        <M x="733" y="328" size={22} fill={RED} anchor="middle" weight={800}>False</M>
      </g>
      {rows.map(([, out, tone], i) => (
        <Wire key={i} d={`M564 259 L610 ${out === 'True' ? 190 : 318}`} stroke={tone} width="2.2" className={`pym-current pym-delay-${i}`} marker={out === 'True' ? 'url(#pyArrG)' : 'url(#pyArrR)'} />
      ))}
      <L x="450" y="444" size={12.5} fill={MUTED} weight={700}>= assigns · == compares · they are not interchangeable</L>
    </Scene>
  )
}

export function ShortCircuitScene() {
  return (
    <Scene caption="and stops at the first False; or stops at the first True">
      <g className="pym-slide-in">
        <rect x="44" y="64" width="382" height="176" rx="13" fill={WHITE} stroke={BLUE} strokeWidth="2.6" />
        <L x="235" y="94" size={15} fill={BLUE}>and — both must hold</L>
        <M x="66" y="130" size={14}>x != 0 and 10 / x &gt; 2</M>
        <g className="pym-gate">
          <rect x="66" y="150" width="130" height="40" rx="8" fill={SKY} stroke={BLUE} strokeWidth="2.2" />
          <M x="131" y="176" size={13} anchor="middle" fill={BLUE} weight={800}>x != 0</M>
        </g>
        <Wire d="M200 170 L248 170" stroke={RED} width="2.4" marker="url(#pyArrR)" className="pym-current" />
        <rect x="252" y="150" width="152" height="40" rx="8" fill="#f3f4f6" stroke={MUTED} strokeWidth="2" strokeDasharray="5 5" />
        <M x="328" y="176" size={12.5} anchor="middle" fill={MUTED} weight={800}>never evaluated</M>
        <L x="235" y="222" size={12} fill={RED} weight={800}>False on the left ⇒ answer is False</L>
      </g>

      <g className="pym-slide-in pym-delay-2">
        <rect x="474" y="64" width="382" height="176" rx="13" fill={WHITE} stroke={AMBER} strokeWidth="2.6" />
        <L x="665" y="94" size={15} fill={AMBER}>or — one is enough</L>
        <M x="496" y="130" size={14}>cached or fetch()</M>
        <g className="pym-gate pym-delay-1">
          <rect x="496" y="150" width="130" height="40" rx="8" fill="#fff4ec" stroke={AMBER} strokeWidth="2.2" />
          <M x="561" y="176" size={13} anchor="middle" fill={AMBER} weight={800}>cached</M>
        </g>
        <Wire d="M630 170 L678 170" stroke={GREEN} width="2.4" marker="url(#pyArrG)" className="pym-current pym-delay-1" />
        <rect x="682" y="150" width="152" height="40" rx="8" fill="#f3f4f6" stroke={MUTED} strokeWidth="2" strokeDasharray="5 5" />
        <M x="758" y="176" size={12.5} anchor="middle" fill={MUTED} weight={800}>never called</M>
        <L x="665" y="222" size={12} fill={GREEN} weight={800}>True on the left ⇒ answer is True</L>
      </g>

      <Panel
        x="44"
        y="266"
        w="382"
        title="Precedence, highest first"
        accent={PURP}
        className="pym-cell-in pym-delay-3"
        mono
        rowH={31}
        rows={[['comparisons:  <  >  ==  !='], ['not'], ['and'], ['or  — binds loosest']]}
      />
      <g className="pym-cell-in pym-delay-4">
        <rect x="474" y="266" width="382" height="174" rx="12" fill="#fff4ec" stroke={RED} strokeWidth="2.4" />
        <L x="665" y="296" size={14} fill={RED}>The classic mistake</L>
        <M x="496" y="332" size={13.5} fill={RED} weight={800}>if x == 1 or 2:</M>
        <L x="496" y="356" size={12} fill={MUTED} anchor="start" weight={700}>2 is truthy, so this is always True</L>
        <M x="496" y="394" size={13.5} fill={GREEN} weight={800}>if x == 1 or x == 2:</M>
        <L x="496" y="418" size={12} fill={MUTED} anchor="start" weight={700}>spell out both comparisons</L>
      </g>
    </Scene>
  )
}

export function IndentBlockScene() {
  return (
    <Scene caption="Indentation is syntax — the whitespace is the block">
      <Code
        x="44"
        y="60"
        w="410"
        title="blocks.py"
        accent={BLUE}
        className="pym-slide-in"
        lines={['name = input()', "if name == 'Alice':", "    print('Hi Alice')", "    print('still inside')", "print('always runs')"]}
      />
      <g className="pym-fade-in pym-delay-2">
        <rect x="78" y="118" width="360" height="46" rx="8" fill={BLUE} opacity="0.1" />
        <rect x="96" y="118" width="342" height="46" rx="8" fill="none" stroke={BLUE} strokeWidth="2.4" strokeDasharray="6 5" />
        <L x="466" y="146" size="12" fill={BLUE} anchor="start" weight={800}>block</L>
      </g>

      <g className="pym-cell-in pym-delay-2">
        <rect x="490" y="60" width="366" height="188" rx="12" fill={WHITE} stroke={TEAL} strokeWidth="2.5" />
        <L x="673" y="90" size={14} fill={TEAL}>The three rules</L>
        {['Indent increases → a new block begins', 'Indent returns → the block ends', 'Blocks may nest inside blocks'].map((t, i) => (
          <g key={t}>
            <Dot cx={514} cy={124 + i * 40} r={5} fill={TEAL} />
            <L x="530" y={129 + i * 40} size={12.5} anchor="start" weight={700}>{t}</L>
          </g>
        ))}
      </g>

      <g className="pym-cell-in pym-delay-4">
        <rect x="490" y="272" width="366" height="168" rx="12" fill="#fff4ec" stroke={RED} strokeWidth="2.4" />
        <L x="673" y="302" size={14} fill={RED}>IndentationError</L>
        <M x="512" y="338" size={13} fill={RED}>→→ tab  ·  ␣␣␣␣ spaces</M>
        <L x="512" y="364" size={12} fill={MUTED} anchor="start" weight={700}>They look identical on screen.</L>
        <L x="512" y="386" size={12} fill={MUTED} anchor="start" weight={700}>Python refuses to guess which you meant.</L>
        <M x="512" y="418" size={13} fill={GREEN} weight={800}>Four spaces, always.</M>
      </g>

      <g className="pym-fade-in pym-delay-3">
        <rect x="44" y="272" width="410" height="168" rx="12" fill={SKY} stroke={BLUE} strokeWidth="2.2" />
        <L x="249" y="302" size={13.5} fill={BLUE}>Why not braces?</L>
        <foreignObject x="66" y="316" width="370" height="112">
          <div xmlns="http://www.w3.org/1999/xhtml" style={{ font: '700 12.5px/1.4 system-ui,sans-serif', color: '#4f6076' }}>
            In brace languages the indentation is a comment that can lie about the
            structure. In Python the indentation <b>is</b> the structure, so what you
            read is always what the interpreter runs.
          </div>
        </foreignObject>
      </g>
    </Scene>
  )
}

export function ElifChainScene() {
  const rows = [
    ['if age < 13:', "'child'", false],
    ['elif age < 20:', "'teen'", true],
    ['elif age < 65:', "'adult'", false],
    ['else:', "'senior'", false],
  ]
  return (
    <Scene caption="age = 17 — the first True wins and the rest are skipped">
      <Box x="330" y="48" w="240" h="46" label="age = 17" stroke={PURP} mono className="pym-flux" />
      {rows.map(([cond, out, hit], i) => (
        <g key={cond} className={`pym-slide-in pym-delay-${i}`}>
          <rect x="130" y={120 + i * 82} width="300" height="58" rx="10" fill={hit ? '#ecfdf5' : WHITE} stroke={hit ? GREEN : MUTED} strokeWidth={hit ? 2.8 : 2} />
          <M x="152" y={156 + i * 82} size={14} fill={hit ? GREEN : N} weight={hit ? 800 : 600}>{cond}</M>
          <Wire
            d={`M434 ${149 + i * 82} L512 ${149 + i * 82}`}
            stroke={hit ? GREEN : MUTED}
            width="2.2"
            dash={hit ? undefined : '5 6'}
            marker={hit ? 'url(#pyArrG)' : 'url(#pyArr)'}
            className={hit ? 'pym-current' : ''}
          />
          <rect x="516" y={120 + i * 82} width="220" height="58" rx="10" fill={hit ? '#ecfdf5' : '#f3f4f6'} stroke={hit ? GREEN : MUTED} strokeWidth={hit ? 2.8 : 1.8} strokeDasharray={hit ? undefined : '5 5'} />
          <M x="626" y={156 + i * 82} size={14} anchor="middle" fill={hit ? GREEN : MUTED} weight={800}>{out}</M>
          {!hit && i > 1 ? <L x="760" y={156 + i * 82} size={11.5} fill={MUTED} anchor="start" weight={700}>never tested</L> : null}
          {hit ? <Tag x="756" y={134 + i * 82} text="MATCH" tone={GREEN} w={96} className="pym-fade-in" /> : null}
        </g>
      ))}
      <Wire d="M110 148 L110 424 L110 424" stroke={MUTED} width="2" dash="4 6" />
      <L x="66" y="290" size={12} fill={MUTED} weight={800}>order</L>
    </Scene>
  )
}

export function WhileFlowScene() {
  return (
    <Scene caption="The condition is retested at the top of every pass">
      <g className="pym-flow-node">
        <rect x="336" y="58" width="228" height="48" rx="10" fill={SKY} stroke={BLUE} strokeWidth="2.4" />
        <M x="450" y="88" size={13.5} anchor="middle" fill={BLUE} weight={800}>spam = 0</M>
      </g>
      <Wire d="M450 110 L450 146" stroke={N} width="2.4" marker="url(#pyArr)" className="pym-current" />
      <path d="M450 150 L590 206 L450 262 L310 206 Z" fill={WHITE} stroke={AMBER} strokeWidth="2.8" className="pym-flux" />
      <M x="450" y="200" size={13.5} anchor="middle" fill={AMBER} weight={800}>spam &lt; 5</M>
      <L x="450" y="222" size={11} fill={MUTED} weight={700}>tested every pass</L>

      <Wire d="M450 266 L450 312" stroke={GREEN} width="2.4" marker="url(#pyArrG)" className="pym-current pym-delay-1" />
      <L x="472" y="292" size={12} fill={GREEN} anchor="start" weight={800}>True</L>
      <g className="pym-cell-in pym-delay-2">
        <rect x="310" y="316" width="280" height="68" rx="10" fill={WHITE} stroke={GREEN} strokeWidth="2.4" />
        <M x="450" y="344" size={13} anchor="middle" weight={800}>print(spam)</M>
        <M x="450" y="368" size={13} anchor="middle" fill={GREEN} weight={800}>spam = spam + 1</M>
      </g>
      <Wire d="M310 350 L232 350 L232 206 L306 206" stroke={GREEN} width="2.4" marker="url(#pyArrG)" className="pym-feedback" />
      <L x="200" y="282" size={11.5} fill={GREEN} weight={800}>loop</L>

      <Wire d="M594 206 L684 206" stroke={RED} width="2.4" marker="url(#pyArrR)" className="pym-current pym-delay-2" />
      <L x="636" y="190" size={12} fill={RED} weight={800}>False</L>
      <g className="pym-cell-in pym-delay-3">
        <rect x="688" y="182" width="168" height="48" rx="10" fill="#fef2f2" stroke={RED} strokeWidth="2.4" />
        <M x="772" y="212" size={13} anchor="middle" fill={RED} weight={800}>exit loop</M>
      </g>

      <g className="pym-cell-in pym-delay-4">
        <rect x="624" y="266" width="232" height="152" rx="11" fill={WHITE} stroke={PURP} strokeWidth="2.4" />
        <L x="740" y="294" size={13.5} fill={PURP}>Two escape hatches</L>
        <M x="646" y="330" size={13} fill={PURP} weight={800}>break</M>
        <L x="646" y="350" size={11.5} fill={MUTED} anchor="start" weight={700}>leave now, skip the test</L>
        <M x="646" y="382" size={13} fill={PURP} weight={800}>continue</M>
        <L x="646" y="402" size={11.5} fill={MUTED} anchor="start" weight={700}>jump back to the test</L>
      </g>
      <g className="pym-fade-in pym-delay-4">
        <rect x="44" y="392" width="248" height="60" rx="10" fill="#fef2f2" stroke={RED} strokeWidth="2.2" />
        <L x="168" y="418" size={12.5} fill={RED}>Forget spam = spam + 1</L>
        <L x="168" y="440" size={11.5} fill={MUTED} weight={700}>and the loop never ends</L>
      </g>
    </Scene>
  )
}

export function RangeRulerScene() {
  const marks = [0, 1, 2, 3, 4, 5]
  return (
    <Scene caption="range(5) yields 0 1 2 3 4 — the stop value is a boundary, not an item">
      <M x="450" y="74" size={18} anchor="middle" fill={BLUE} weight={800}>range(0, 5)</M>
      <Wire d="M96 160 L812 160" stroke={MUTED} width="2.4" />
      {marks.map((m) => {
        const x = 96 + m * 143
        const inside = m < 5
        return (
          <g key={m} className={`pym-cell-in pym-delay-${m % 5}`}>
            <Wire d={`M${x} 144 L${x} 176`} stroke={inside ? BLUE : RED} width="2.6" />
            <M x={x} y={200} size={15} anchor="middle" fill={inside ? BLUE : RED} weight={800}>{m}</M>
            {inside ? (
              <circle cx={x} cy="160" r="11" fill={BLUE} className={`pym-cost-dot pym-delay-${m}`} />
            ) : (
              <circle cx={x} cy="160" r="11" fill={WHITE} stroke={RED} strokeWidth="3" />
            )}
          </g>
        )
      })}
      <L x="778" y="228" size={12} fill={RED} weight={800}>stop — excluded</L>
      <rect x="84" y="128" width="596" height="64" rx="12" fill="none" stroke={BLUE} strokeWidth="2" strokeDasharray="7 6" />
      <L x="382" y="118" size={12.5} fill={BLUE} weight={800}>five values, half-open [0, 5)</L>

      <Panel
        x="44"
        y="258"
        w="382"
        title="Three call shapes"
        accent={TEAL}
        className="pym-slide-in pym-delay-3"
        mono
        rowH={33}
        rows={[['range(5)', '0..4'], ['range(2, 6)', '2..5'], ['range(0, 10, 2)', '0 2 4 6 8'], ['range(5, 0, -1)', '5 4 3 2 1']]}
      />
      <g className="pym-cell-in pym-delay-4">
        <rect x="474" y="258" width="382" height="182" rx="12" fill={SKY} stroke={BLUE} strokeWidth="2.4" />
        <L x="665" y="288" size={13.5} fill={BLUE}>Why half-open is the right default</L>
        <foreignObject x="496" y="302" width="342" height="128">
          <div xmlns="http://www.w3.org/1999/xhtml" style={{ font: '700 12.5px/1.4 system-ui,sans-serif', color: '#4f6076' }}>
            len(range(a, b)) is exactly b − a, adjacent ranges join with no gap and
            no overlap, and range(len(x)) covers every index of x without an
            off-by-one correction anywhere.
          </div>
        </foreignObject>
      </g>
    </Scene>
  )
}

export function ImportNamespaceScene() {
  return (
    <Scene caption="import keeps the module's names in their own box; from…import empties it into yours">
      <g className="pym-slide-in">
        <rect x="44" y="60" width="382" height="196" rx="13" fill={WHITE} stroke={GREEN} strokeWidth="2.6" />
        <M x="66" y="92" size={14} fill={GREEN} weight={800}>import random</M>
        <rect x="66" y="112" width="160" height="124" rx="10" fill={SKY} stroke={BLUE} strokeWidth="2.2" />
        <L x="146" y="136" size={12} fill={BLUE} weight={800}>your module</L>
        <M x="146" y="166" size={12.5} anchor="middle">random</M>
        <rect x="248" y="112" width="160" height="124" rx="10" fill="#f0fdf4" stroke={GREEN} strokeWidth="2.2" className="pym-flux" />
        <L x="328" y="136" size={12} fill={GREEN} weight={800}>random</L>
        <M x="328" y="162" size={12} anchor="middle">randint</M>
        <M x="328" y="184" size={12} anchor="middle">choice</M>
        <M x="328" y="206" size={12} anchor="middle">shuffle</M>
        <M x="146" y="212" size={12} anchor="middle" fill={MUTED}>random.randint()</M>
      </g>

      <g className="pym-slide-in pym-delay-2">
        <rect x="474" y="60" width="382" height="196" rx="13" fill={WHITE} stroke={AMBER} strokeWidth="2.6" />
        <M x="496" y="92" size={14} fill={AMBER} weight={800}>from random import *</M>
        <rect x="496" y="112" width="338" height="124" rx="10" fill="#fff4ec" stroke={AMBER} strokeWidth="2.2" />
        <L x="665" y="136" size={12} fill={AMBER} weight={800}>your module — now crowded</L>
        <M x="665" y="164" size={12} anchor="middle">randint  choice  shuffle</M>
        <M x="665" y="192" size={12.5} anchor="middle" fill={RED} weight={800}>your own choice() is gone</M>
        <L x="665" y="220" size={11.5} fill={MUTED} weight={700}>silently shadowed — no warning</L>
      </g>

      <Panel
        x="44"
        y="278"
        w="382"
        title="sys.exit() ends the program"
        accent={PURP}
        className="pym-cell-in pym-delay-3"
        mono
        rowH={31}
        rows={[['import sys'], ['sys.exit()      # clean stop'], ['sys.exit(1)     # error status'], ['return ends a call, not a program']]}
      />
      <g className="pym-cell-in pym-delay-4">
        <rect x="474" y="278" width="382" height="162" rx="12" fill={SKY} stroke={BLUE} strokeWidth="2.4" />
        <L x="665" y="308" size={13.5} fill={BLUE}>Name the source</L>
        <foreignObject x="496" y="322" width="342" height="108">
          <div xmlns="http://www.w3.org/1999/xhtml" style={{ font: '700 12.5px/1.4 system-ui,sans-serif', color: '#4f6076' }}>
            <b>random.choice(x)</b> says where the function came from, so a reader
            and a traceback agree. The dotted prefix is three extra keystrokes and
            it removes an entire class of shadowing bug.
          </div>
        </foreignObject>
      </g>
    </Scene>
  )
}

export function CallMechanicsScene() {
  return (
    <Scene caption="Arguments in, one return value out — None when you never said">
      <Code
        x="44"
        y="58"
        w="386"
        title="hello.py"
        accent={BLUE}
        className="pym-slide-in"
        mark={4}
        lines={['def hello(name):', "    return 'Hi ' + name", '', 'msg = hello(\'Bob\')', 'print(msg)']}
      />
      <g className="pym-cell-in pym-delay-2">
        <rect x="474" y="58" width="382" height="196" rx="12" fill={WHITE} stroke={AMBER} strokeWidth="2.6" />
        <L x="665" y="88" size={14} fill={AMBER}>What happens on the call</L>
        {[
          ["'Bob' is bound to the parameter name"],
          ['the body runs in a fresh local frame'],
          ['return hands one value back'],
          ['the frame — and name — is destroyed'],
        ].map(([t], i) => (
          <g key={t} className={`pym-slide-in pym-delay-${i}`}>
            <circle cx="500" cy={122 + i * 34} r="9" fill={AMBER} />
            <L x="500" y={126 + i * 34} size={11} fill={WHITE}>{i + 1}</L>
            <L x="520" y={127 + i * 34} size={12.5} anchor="start" weight={700}>{t}</L>
          </g>
        ))}
      </g>
      <Wire d="M436 156 L470 156" stroke={AMBER} width="2.6" marker="url(#pyArrA)" className="pym-current" />

      <g className="pym-cell-in pym-delay-3">
        <rect x="44" y="230" width="386" height="96" rx="12" fill="#f0fdf4" stroke={GREEN} strokeWidth="2.4" />
        <M x="66" y="262" size={13.5} fill={GREEN} weight={800}>msg → 'Hi Bob'</M>
        <L x="66" y="290" size={12} fill={MUTED} anchor="start" weight={700}>return value captured by the caller</L>
        <L x="66" y="312" size={12} fill={MUTED} anchor="start" weight={700}>printed once, by print()</L>
      </g>

      <g className="pym-cell-in pym-delay-4">
        <rect x="44" y="346" width="812" height="96" rx="12" fill="#fff4ec" stroke={RED} strokeWidth="2.4" />
        <L x="450" y="376" size={14} fill={RED}>print is not return</L>
        <M x="80" y="412" size={13} fill={RED} weight={800}>def f(): print(2)</M>
        <L x="80" y="434" size={11.5} fill={MUTED} anchor="start" weight={700}>f() + 1 → TypeError: None + int</L>
        <M x="480" y="412" size={13} fill={GREEN} weight={800}>def f(): return 2</M>
        <L x="480" y="434" size={11.5} fill={MUTED} anchor="start" weight={700}>f() + 1 → 3, and the caller decides what to show</L>
      </g>
    </Scene>
  )
}

export function ScopeBoxesScene() {
  return (
    <Scene caption="A local name lives and dies with the call; global needs saying out loud">
      <rect x="60" y="56" width="500" height="376" rx="14" fill={SKY} stroke={BLUE} strokeWidth="2.8" />
      <L x="310" y="86" size={15} fill={BLUE}>global scope</L>
      <M x="88" y="120" size={13.5} weight={800}>eggs = 42</M>

      <rect x="96" y="146" width="428" height="150" rx="12" fill={WHITE} stroke={AMBER} strokeWidth="2.6" className="pym-flux" />
      <L x="310" y="176" size={14} fill={AMBER}>spam() local scope</L>
      <M x="124" y="212" size={13} weight={800}>eggs = 99</M>
      <L x="124" y="234" size={11.5} fill={MUTED} anchor="start" weight={700}>a brand-new local name — the global is untouched</L>
      <M x="124" y="268" size={13} fill={GREEN} weight={800}>bacon = 0   # dies at return</M>

      <rect x="96" y="318" width="428" height="94" rx="12" fill="#f0fdf4" stroke={GREEN} strokeWidth="2.6" />
      <L x="310" y="346" size={14} fill={GREEN}>ham() local scope</L>
      <M x="124" y="380" size={13} weight={800}>global eggs</M>
      <L x="124" y="400" size={11.5} fill={MUTED} anchor="start" weight={700}>now eggs = 0 writes to the global one</L>

      <g className="pym-cell-in pym-delay-2">
        <rect x="592" y="56" width="266" height="166" rx="12" fill={WHITE} stroke={PURP} strokeWidth="2.5" />
        <L x="725" y="86" size={13.5} fill={PURP}>The four rules</L>
        {['read a global: allowed', 'write it: makes a local', 'unless you declare global', 'siblings never see each other'].map((t, i) => (
          <g key={t}>
            <Dot cx={614} cy={116 + i * 28} r={4.5} fill={PURP} />
            <L x="628" y={120 + i * 28} size={11.5} anchor="start" weight={700}>{t}</L>
          </g>
        ))}
      </g>

      <g className="pym-cell-in pym-delay-4">
        <rect x="592" y="244" width="266" height="188" rx="12" fill="#fff4ec" stroke={RED} strokeWidth="2.4" />
        <L x="725" y="274" size={13.5} fill={RED}>UnboundLocalError</L>
        <M x="612" y="308" size={12} fill={RED}>def f():</M>
        <M x="612" y="330" size={12} fill={RED}>    print(eggs)</M>
        <M x="612" y="352" size={12} fill={RED}>    eggs = 1</M>
        <foreignObject x="612" y="364" width="230" height="62">
          <div xmlns="http://www.w3.org/1999/xhtml" style={{ font: '700 11.5px/1.35 system-ui,sans-serif', color: '#4f6076' }}>
            One assignment anywhere in the body makes the name local for the whole
            body — including the line above it.
          </div>
        </foreignObject>
      </g>
    </Scene>
  )
}

export function TryExceptScene() {
  return (
    <Scene caption="The block that can fail is the block you wrap — not the whole program">
      <g className="pym-slide-in">
        <rect x="60" y="60" width="380" height="188" rx="13" fill={WHITE} stroke={BLUE} strokeWidth="2.6" />
        <M x="82" y="92" size={13.5} fill={BLUE} weight={800}>try:</M>
        <M x="102" y="120" size={13}>return 42 / div</M>
        <Wire d="M240 136 L240 176" stroke={RED} width="2.4" marker="url(#pyArrR)" className="pym-current" />
        <M x="82" y="204" size={13.5} fill={RED} weight={800}>except ZeroDivisionError:</M>
        <M x="102" y="232" size={13} fill={GREEN}>print('cannot divide by zero')</M>
      </g>

      <g className="pym-cell-in pym-delay-2">
        <rect x="486" y="60" width="370" height="188" rx="13" fill={SKY} stroke={TEAL} strokeWidth="2.5" />
        <L x="671" y="90" size={14} fill={TEAL}>Where control goes</L>
        {[
          ['no error', 'the except block is skipped entirely', GREEN],
          ['error raised', 'the rest of try is abandoned at once', RED],
          ['handled', 'execution resumes after the except', BLUE],
        ].map(([a, b, tone], i) => (
          <g key={a} className={`pym-slide-in pym-delay-${i}`}>
            <Dot cx={510} cy={126 + i * 40} r={5.5} fill={tone} />
            <L x="526" y={122 + i * 40} size={12.5} fill={tone} anchor="start" weight={800}>{a}</L>
            <L x="526" y={140 + i * 40} size={11.5} fill={MUTED} anchor="start" weight={700}>{b}</L>
          </g>
        ))}
      </g>

      <Code
        x="60"
        y="278"
        w="380"
        title="guess.py — the loop that needs it"
        accent={PURP}
        className="pym-slide-in pym-delay-3"
        lines={['for i in range(6):', '    try:', '        g = int(input())', '    except ValueError:', "        print('digits only'); continue", '    if g == secret: break']}
      />

      <g className="pym-cell-in pym-delay-4">
        <rect x="486" y="278" width="370" height="162" rx="12" fill="#fff4ec" stroke={RED} strokeWidth="2.4" />
        <L x="671" y="308" size={13.5} fill={RED}>Do not catch everything</L>
        <M x="508" y="342" size={13} fill={RED} weight={800}>except:</M>
        <L x="508" y="364" size={11.5} fill={MUTED} anchor="start" weight={700}>swallows typos, KeyboardInterrupt, all of it</L>
        <M x="508" y="398" size={13} fill={GREEN} weight={800}>except ValueError:</M>
        <L x="508" y="420" size={11.5} fill={MUTED} anchor="start" weight={700}>name the one failure you can actually handle</L>
      </g>
    </Scene>
  )
}

/* ── Module 2 — lists, dictionaries and strings ─────────────────── */

const SPAM = ["'cat'", "'bat'", "'rat'", "'elephant'"]

export function ListRulerScene() {
  return (
    <Scene caption="spam = ['cat', 'bat', 'rat', 'elephant']">
      <L x="450" y="72" size={16} fill={BLUE}>One object, four slots, one index each</L>
      {SPAM.map((v, i) => (
        <Cell key={v} x={132 + i * 164} y="124" w="148" h="58" value={v} idx={i} className={`pym-cell-in pym-delay-${i}`} />
      ))}
      <Wire d="M132 202 L780 202" stroke={MUTED} width="2" dash="5 6" />
      <L x="450" y="230" size={12.5} fill={MUTED} weight={700}>the index is an offset from the start, so the first one is 0</L>

      <g className="pym-slide-in pym-delay-2">
        <rect x="44" y="258" width="400" height="182" rx="12" fill={WHITE} stroke={GREEN} strokeWidth="2.5" />
        <L x="244" y="288" size={13.5} fill={GREEN}>Legal</L>
        <M x="66" y="322" size={13}>spam[0]      → 'cat'</M>
        <M x="66" y="350" size={13}>spam[3]      → 'elephant'</M>
        <M x="66" y="378" size={13}>len(spam)    → 4</M>
        <M x="66" y="406" size={13}>spam[1][0]   → 'b'</M>
        <L x="244" y="430" size={11.5} fill={MUTED} weight={700}>index the list, then index the string it gave back</L>
      </g>

      <g className="pym-cell-in pym-delay-4">
        <rect x="464" y="258" width="392" height="182" rx="12" fill="#fff4ec" stroke={RED} strokeWidth="2.5" />
        <L x="660" y="288" size={13.5} fill={RED}>IndexError</L>
        <M x="486" y="324" size={13} fill={RED} weight={800}>spam[4]</M>
        <L x="486" y="348" size={12} fill={MUTED} anchor="start" weight={700}>4 items means valid indexes 0 to 3</L>
        <M x="486" y="382" size={13} fill={RED} weight={800}>spam[1.0]</M>
        <L x="486" y="406" size={12} fill={MUTED} anchor="start" weight={700}>TypeError — indexes must be int, not float</L>
        <L x="660" y="430" size={11.5} fill={MUTED} weight={700}>len(spam) − 1 is always the last valid index</L>
      </g>
    </Scene>
  )
}

export function SliceScene() {
  return (
    <Scene caption="An index borrows one item; a slice builds a new list">
      {SPAM.map((v, i) => (
        <Cell key={v} x={132 + i * 164} y="106" w="148" h="54" value={v} idx={i} neg={i - 4} className={`pym-cell-in pym-delay-${i}`} />
      ))}
      <L x="72" y="138" size={12} fill={BLUE} weight={800}>0..3</L>
      <L x="72" y="196" size={12} fill={AMBER} weight={800}>-4..-1</L>

      <g className="pym-fade-in pym-delay-2">
        <rect x="288" y="96" width="320" height="74" rx="10" fill="none" stroke={PURP} strokeWidth="2.8" strokeDasharray="7 6" />
        <M x="448" y="88" size={13.5} anchor="middle" fill={PURP} weight={800}>spam[1:3]</M>
      </g>

      <g className="pym-slide-in pym-delay-3">
        <rect x="44" y="238" width="400" height="200" rx="12" fill={WHITE} stroke={PURP} strokeWidth="2.5" />
        <L x="244" y="268" size={13.5} fill={PURP}>Slice → a new list</L>
        <M x="66" y="302" size={13}>spam[1:3]   → ['bat', 'rat']</M>
        <M x="66" y="330" size={13}>spam[:2]    → ['cat', 'bat']</M>
        <M x="66" y="358" size={13}>spam[2:]    → ['rat', 'elephant']</M>
        <M x="66" y="386" size={13}>spam[:]     → a full shallow copy</M>
        <M x="66" y="414" size={13} fill={GREEN} weight={800}>spam[9:99]  → []  (never raises)</M>
      </g>

      <g className="pym-cell-in pym-delay-4">
        <rect x="464" y="238" width="392" height="200" rx="12" fill={SKY} stroke={BLUE} strokeWidth="2.5" />
        <L x="660" y="268" size={13.5} fill={BLUE}>Index → the item itself</L>
        <M x="486" y="302" size={13}>spam[1]     → 'bat'</M>
        <M x="486" y="330" size={13}>spam[-1]    → 'elephant'</M>
        <M x="486" y="358" size={13} fill={RED} weight={800}>spam[99]    → IndexError</M>
        <foreignObject x="486" y="370" width="352" height="62">
          <div xmlns="http://www.w3.org/1999/xhtml" style={{ font: '700 12px/1.35 system-ui,sans-serif', color: '#4f6076' }}>
            A slice out of range is silently empty; an index out of range stops the
            program. Same brackets, opposite failure behaviour.
          </div>
        </foreignObject>
      </g>
    </Scene>
  )
}

export function MutationScene() {
  return (
    <Scene caption="Index assignment changes the list in place; + always builds a new one">
      <g className="pym-slide-in">
        <rect x="44" y="58" width="392" height="190" rx="13" fill={WHITE} stroke={GREEN} strokeWidth="2.6" />
        <L x="240" y="88" size={14} fill={GREEN}>In place — same object</L>
        <M x="66" y="122" size={13} weight={800}>spam[1] = 'aardvark'</M>
        {["'cat'", "'aardvark'", "'rat'"].map((v, i) => (
          <g key={v} className={i === 1 ? 'pym-insert' : ''}>
            <rect x={66 + i * 122} y="140" width="112" height="44" rx="8" fill={i === 1 ? '#f0fdf4' : WHITE} stroke={i === 1 ? GREEN : MUTED} strokeWidth="2.2" />
            <M x={122 + i * 122} y="168" size={12.5} anchor="middle" weight={700}>{v}</M>
          </g>
        ))}
        <M x="66" y="212" size={12.5} fill={MUTED}>id(spam) unchanged</M>
        <M x="66" y="236" size={12.5} fill={GREEN} weight={800}>every alias sees the change</M>
      </g>

      <g className="pym-slide-in pym-delay-2">
        <rect x="464" y="58" width="392" height="190" rx="13" fill={WHITE} stroke={AMBER} strokeWidth="2.6" />
        <L x="660" y="88" size={14} fill={AMBER}>New object — rebinding</L>
        <M x="486" y="122" size={13} weight={800}>spam = spam + ['dog']</M>
        <rect x="486" y="140" width="160" height="44" rx="8" fill="#f3f4f6" stroke={MUTED} strokeWidth="2" strokeDasharray="5 5" />
        <M x="566" y="168" size={12} anchor="middle" fill={MUTED} weight={700}>old list</M>
        <Wire d="M652 162 L692 162" stroke={AMBER} width="2.4" marker="url(#pyArrA)" className="pym-current" />
        <rect x="696" y="140" width="140" height="44" rx="8" fill="#fff4ec" stroke={AMBER} strokeWidth="2.4" />
        <M x="766" y="168" size={12} anchor="middle" fill={AMBER} weight={800}>new list</M>
        <M x="486" y="212" size={12.5} fill={MUTED}>id(spam) is different</M>
        <M x="486" y="236" size={12.5} fill={RED} weight={800}>other names still see the old one</M>
      </g>

      <Panel
        x="44"
        y="276"
        w="392"
        title="Removing items"
        accent={PURP}
        className="pym-cell-in pym-delay-3"
        mono
        rowH={32}
        rows={[['del spam[1]', 'by position'], ["spam.remove('bat')", 'by value'], ['spam.pop()', 'take and return last'], ['spam.clear()', 'empty it, same object']]}
      />
      <g className="pym-cell-in pym-delay-4">
        <rect x="464" y="276" width="392" height="164" rx="12" fill="#fff4ec" stroke={RED} strokeWidth="2.4" />
        <L x="660" y="306" size={13.5} fill={RED}>Deleting while looping</L>
        <M x="486" y="340" size={12.5} fill={RED}>for i in range(len(x)): del x[i]</M>
        <foreignObject x="486" y="352" width="352" height="80">
          <div xmlns="http://www.w3.org/1999/xhtml" style={{ font: '700 12px/1.35 system-ui,sans-serif', color: '#4f6076' }}>
            Every deletion shifts the tail left, so the loop skips items and then runs
            off the end. Build a new list with a comprehension, or iterate over a copy.
          </div>
        </foreignObject>
      </g>
    </Scene>
  )
}

export function IterateItemsScene() {
  return (
    <Scene caption="for gives you the item; you almost never need its index">
      <g className="pym-slide-in">
        <rect x="44" y="58" width="392" height="180" rx="13" fill="#fff4ec" stroke={AMBER} strokeWidth="2.6" />
        <L x="240" y="88" size={14} fill={AMBER}>Index detour</L>
        <M x="66" y="124" size={13}>for i in range(len(spam)):</M>
        <M x="66" y="150" size={13}>    print(spam[i])</M>
        <Wire d="M96 168 L340 168" stroke={AMBER} width="2" dash="5 6" />
        <L x="66" y="196" size={11.5} fill={MUTED} anchor="start" weight={700}>i is only ever used to get spam[i] back</L>
        <L x="66" y="218" size={11.5} fill={MUTED} anchor="start" weight={700}>one extra name, one extra lookup, one extra bug</L>
      </g>

      <g className="pym-slide-in pym-delay-2">
        <rect x="464" y="58" width="392" height="180" rx="13" fill="#f0fdf4" stroke={GREEN} strokeWidth="2.6" />
        <L x="660" y="88" size={14} fill={GREEN}>Direct iteration</L>
        <M x="486" y="124" size={13} weight={800}>for name in spam:</M>
        <M x="486" y="150" size={13} weight={800}>    print(name)</M>
        <L x="486" y="196" size={11.5} fill={MUTED} anchor="start" weight={700}>works on any iterable — list, str, dict, file</L>
        <L x="486" y="218" size={11.5} fill={MUTED} anchor="start" weight={700}>enumerate(spam) when you genuinely need both</L>
      </g>

      {SPAM.map((v, i) => (
        <g key={v} className={`pym-traverse pym-delay-${i}`}>
          <rect x={132 + i * 164} y="278" width="148" height="52" rx="8" fill={WHITE} stroke={BLUE} strokeWidth="2.2" />
          <M x={206 + i * 164} y="310" size={13} anchor="middle" weight={700}>{v}</M>
        </g>
      ))}
      <circle cx="206" cy="304" r="20" fill="none" stroke={GREEN} strokeWidth="3" className="pym-search" />

      <Panel
        x="44"
        y="356"
        w="392"
        title="Membership, not position"
        accent={TEAL}
        className="pym-cell-in pym-delay-3"
        mono
        rowH={28}
        rows={[["'cat' in spam        → True"], ["'dog' not in spam    → True"]]}
      />
      <g className="pym-cell-in pym-delay-4">
        <rect x="464" y="356" width="392" height="84" rx="12" fill={SKY} stroke={BLUE} strokeWidth="2.4" />
        <L x="660" y="386" size={13} fill={BLUE}>in scans the whole list</L>
        <L x="660" y="412" size={11.5} fill={MUTED} weight={700}>fine for tens of items; use a dict or set for thousands</L>
      </g>
    </Scene>
  )
}

export function SwapUnpackScene() {
  return (
    <Scene caption="The right-hand side is fully evaluated before anything is assigned">
      <g className="pym-slide-in">
        <rect x="44" y="60" width="392" height="176" rx="13" fill={WHITE} stroke={BLUE} strokeWidth="2.6" />
        <L x="240" y="90" size={14} fill={BLUE}>Swap without a temp</L>
        <M x="66" y="126" size={14} weight={800}>a, b = b, a</M>
        <g className="pym-swap">
          <rect x="66" y="146" width="120" height="48" rx="9" fill={SKY} stroke={BLUE} strokeWidth="2.2" />
          <M x="126" y="176" size={14} anchor="middle" weight={800}>a</M>
        </g>
        <g className="pym-swap pym-delay-2">
          <rect x="246" y="146" width="120" height="48" rx="9" fill="#fff4ec" stroke={AMBER} strokeWidth="2.2" />
          <M x="306" y="176" size={14} anchor="middle" fill={AMBER} weight={800}>b</M>
        </g>
        <Wire d="M190 158 L242 158" stroke={MUTED} width="2" marker="url(#pyArr)" />
        <Wire d="M242 184 L190 184" stroke={MUTED} width="2" marker="url(#pyArr)" />
        <L x="240" y="220" size={11.5} fill={MUTED} weight={700}>a tuple is built first, then unpacked</L>
      </g>

      <g className="pym-slide-in pym-delay-2">
        <rect x="464" y="60" width="392" height="176" rx="13" fill={WHITE} stroke={TEAL} strokeWidth="2.6" />
        <L x="660" y="90" size={14} fill={TEAL}>Unpacking</L>
        <M x="486" y="126" size={13.5} weight={800}>cat = ['Zophie', 7, 'grey']</M>
        <M x="486" y="154" size={13.5} weight={800}>name, age, colour = cat</M>
        <L x="486" y="188" size={12} fill={MUTED} anchor="start" weight={700}>counts must match exactly, or</L>
        <M x="486" y="214" size={12.5} fill={RED} weight={800}>ValueError: not enough values to unpack</M>
      </g>

      <Panel
        x="44"
        y="272"
        w="392"
        title="Augmented assignment"
        accent={PURP}
        className="pym-cell-in pym-delay-3"
        mono
        rowH={30}
        rows={[['spam += 1', 'same as spam = spam + 1'], ['spam *= 3', 'replicates a str or list'], ['spam -= 1   spam /= 2']]}
      />
      <g className="pym-cell-in pym-delay-4">
        <rect x="464" y="272" width="392" height="168" rx="12" fill="#fff4ec" stroke={RED} strokeWidth="2.4" />
        <L x="660" y="302" size={13.5} fill={RED}>+= is not always harmless</L>
        <M x="486" y="338" size={12.5}>x = [1]; y = x; x += [2]</M>
        <M x="486" y="364" size={12.5} fill={RED} weight={800}>y is now [1, 2] too</M>
        <foreignObject x="486" y="376" width="352" height="60">
          <div xmlns="http://www.w3.org/1999/xhtml" style={{ font: '700 12px/1.35 system-ui,sans-serif', color: '#4f6076' }}>
            On a list, += extends in place, so every alias sees it. On an int or a
            str it rebinds, and aliases do not.
          </div>
        </foreignObject>
      </g>
    </Scene>
  )
}

export function MethodReturnNoneScene() {
  return (
    <Scene caption="A method that changes the list returns None — there is nothing to hand back">
      <g className="pym-slide-in">
        <rect x="44" y="58" width="812" height="130" rx="13" fill="#fff4ec" stroke={RED} strokeWidth="2.8" />
        <L x="450" y="88" size={15} fill={RED}>The single most common list bug</L>
        <M x="80" y="128" size={15} fill={RED} weight={800}>spam = spam.sort()</M>
        <Wire d="M320 122 L400 122" stroke={RED} width="2.4" marker="url(#pyArrR)" className="pym-current" />
        <M x="412" y="128" size={15} fill={RED} weight={800}>spam is now None</M>
        <L x="450" y="166" size={12.5} fill={MUTED} weight={700}>sort() rearranged the list and returned None; the assignment threw the list away</L>
      </g>

      <g className="pym-cell-in pym-delay-2">
        <rect x="44" y="212" width="392" height="228" rx="12" fill={WHITE} stroke={GREEN} strokeWidth="2.5" />
        <L x="240" y="242" size={13.5} fill={GREEN}>Changes in place → returns None</L>
        {['spam.append(x)', 'spam.insert(1, x)', 'spam.remove(x)', 'spam.sort()', 'spam.reverse()'].map((t, i) => (
          <g key={t} className={`pym-slide-in pym-delay-${i}`}>
            <M x="66" y={278 + i * 30} size={13} fill={GREEN} weight={800}>{t}</M>
            <M x="404" y={278 + i * 30} size={12} anchor="end" fill={MUTED}>None</M>
          </g>
        ))}
        <L x="240" y="428" size={11.5} fill={MUTED} weight={700}>call it on its own line; never assign the result</L>
      </g>

      <g className="pym-cell-in pym-delay-4">
        <rect x="464" y="212" width="392" height="228" rx="12" fill={SKY} stroke={BLUE} strokeWidth="2.5" />
        <L x="660" y="242" size={13.5} fill={BLUE}>Returns something → assign it</L>
        {[['spam.index(x)', 'int'], ['spam.pop()', 'the item'], ['spam.count(x)', 'int'], ['sorted(spam)', 'a NEW list'], ["','.join(spam)", 'a str']].map(([t, r], i) => (
          <g key={t} className={`pym-slide-in pym-delay-${i}`}>
            <M x="486" y={278 + i * 30} size={13} fill={BLUE} weight={800}>{t}</M>
            <M x="824" y={278 + i * 30} size={12} anchor="end" fill={MUTED}>{r}</M>
          </g>
        ))}
        <L x="660" y="428" size={11.5} fill={MUTED} weight={700}>sorted() is the safe twin of .sort()</L>
      </g>
    </Scene>
  )
}

export function MutabilitySplitScene() {
  return (
    <Scene caption="Mutability, not syntax, decides what a function can do to your data">
      <g className="pym-slide-in">
        <rect x="44" y="60" width="392" height="204" rx="13" fill="#f0fdf4" stroke={GREEN} strokeWidth="2.6" />
        <L x="240" y="90" size={15} fill={GREEN}>Mutable — can be changed</L>
        {[['list', '[1, 2, 3]'], ['dict', "{'a': 1}"], ['set', '{1, 2}']].map(([t, s], i) => (
          <g key={t} className={`pym-cell-in pym-delay-${i}`}>
            <rect x="66" y={112 + i * 46} width="348" height="38" rx="8" fill={WHITE} stroke={GREEN} strokeWidth="2" />
            <M x="86" y={136 + i * 46} size={13} fill={GREEN} weight={800}>{t}</M>
            <M x="394" y={136 + i * 46} size={12.5} anchor="end" fill={MUTED}>{s}</M>
          </g>
        ))}
        <L x="240" y="250" size={11.5} fill={MUTED} weight={700}>can be edited in place; cannot be a dict key</L>
      </g>

      <g className="pym-slide-in pym-delay-2">
        <rect x="464" y="60" width="392" height="204" rx="13" fill={SKY} stroke={BLUE} strokeWidth="2.6" />
        <L x="660" y="90" size={15} fill={BLUE}>Immutable — replaced, never edited</L>
        {[['str', "'hello'"], ['tuple', '(1, 2)'], ['int / float / bool', '42  3.14']].map(([t, s], i) => (
          <g key={t} className={`pym-cell-in pym-delay-${i}`}>
            <rect x="486" y={112 + i * 46} width="348" height="38" rx="8" fill={WHITE} stroke={BLUE} strokeWidth="2" />
            <M x="506" y={136 + i * 46} size={13} fill={BLUE} weight={800}>{t}</M>
            <M x="814" y={136 + i * 46} size={12.5} anchor="end" fill={MUTED}>{s}</M>
          </g>
        ))}
        <L x="660" y="250" size={11.5} fill={MUTED} weight={700}>hashable, so it can key a dict; safe to share</L>
      </g>

      <g className="pym-cell-in pym-delay-3">
        <rect x="44" y="292" width="392" height="148" rx="12" fill={WHITE} stroke={PURP} strokeWidth="2.4" />
        <L x="240" y="322" size={13.5} fill={PURP}>The one-comma trap</L>
        <M x="66" y="356" size={13} fill={RED} weight={800}>('hello')  → a str</M>
        <M x="66" y="384" size={13} fill={GREEN} weight={800}>('hello',) → a tuple</M>
        <L x="240" y="416" size={11.5} fill={MUTED} weight={700}>the comma makes the tuple; the brackets only group</L>
      </g>

      <g className="pym-cell-in pym-delay-4">
        <rect x="464" y="292" width="392" height="148" rx="12" fill="#fff4ec" stroke={AMBER} strokeWidth="2.4" />
        <L x="660" y="322" size={13.5} fill={AMBER}>Immutable is not deeply frozen</L>
        <M x="486" y="356" size={12.5}>t = ([1], [2]);  t[0].append(9)</M>
        <M x="486" y="382" size={12.5} fill={AMBER} weight={800}>t is now ([1, 9], [2])</M>
        <L x="660" y="416" size={11.5} fill={MUTED} weight={700}>the tuple's slots are fixed; the lists in them are not</L>
      </g>
    </Scene>
  )
}

export function AliasingScene() {
  const cases = [
    ['b = a', 'one list, two names', RED, 'both change'],
    ['b = a.copy()', 'new outer list, shared insides', AMBER, 'top level safe'],
    ['b = copy.deepcopy(a)', 'everything duplicated', GREEN, 'independent'],
  ]
  return (
    <Scene caption="Three ways to get a second name — only one of them is a real copy">
      {cases.map(([call, note, tone, verdict], i) => (
        <g key={call} className={`pym-slide-in pym-delay-${i}`}>
          <rect x="44" y={56 + i * 130} width="812" height="116" rx="13" fill={WHITE} stroke={tone} strokeWidth="2.6" />
          <M x="68" y={88 + i * 130} size={14} fill={tone} weight={800}>{call}</M>
          <L x="68" y={110 + i * 130} size={11.5} fill={MUTED} anchor="start" weight={700}>{note}</L>

          <rect x="330" y={72 + i * 130} width="88" height="32" rx="16" fill={WHITE} stroke={tone} strokeWidth="2.2" />
          <M x="374" y={93 + i * 130} size={12.5} anchor="middle" fill={tone} weight={800}>a</M>
          <rect x="330" y={116 + i * 130} width="88" height="32" rx="16" fill={WHITE} stroke={tone} strokeWidth="2.2" />
          <M x="374" y={137 + i * 130} size={12.5} anchor="middle" fill={tone} weight={800}>b</M>

          {i === 0 ? (
            <g>
              <Wire d={`M422 ${88 + i * 130} L538 ${106 + i * 130}`} stroke={tone} width="2.2" marker="url(#pyArrR)" className="pym-current" />
              <Wire d={`M422 ${132 + i * 130} L538 ${112 + i * 130}`} stroke={tone} width="2.2" marker="url(#pyArrR)" className="pym-current pym-delay-1" />
              <rect x="542" y={90 + i * 130} width="200" height="42" rx="9" fill="#fef2f2" stroke={tone} strokeWidth="2.4" className="pym-pulse" />
              <M x="642" y={117 + i * 130} size={12.5} anchor="middle" weight={800}>one list object</M>
            </g>
          ) : (
            <g>
              <Wire d={`M422 ${88 + i * 130} L538 ${88 + i * 130}`} stroke={tone} width="2.2" marker={i === 1 ? 'url(#pyArrA)' : 'url(#pyArrG)'} className="pym-current" />
              <Wire d={`M422 ${132 + i * 130} L538 ${132 + i * 130}`} stroke={tone} width="2.2" marker={i === 1 ? 'url(#pyArrA)' : 'url(#pyArrG)'} className="pym-current pym-delay-1" />
              <rect x="542" y={70 + i * 130} width="180" height="36" rx="9" fill={WHITE} stroke={tone} strokeWidth="2.2" />
              <M x="632" y={93 + i * 130} size={12.5} anchor="middle" weight={800}>outer list A</M>
              <rect x="542" y={114 + i * 130} width="180" height="36" rx="9" fill={WHITE} stroke={tone} strokeWidth="2.2" />
              <M x="632" y={137 + i * 130} size={12.5} anchor="middle" weight={800}>outer list B</M>
              {i === 1 ? (
                <g>
                  <Wire d={`M726 ${88 + i * 130} L768 ${108 + i * 130}`} stroke={AMBER} width="2" dash="4 5" />
                  <Wire d={`M726 ${132 + i * 130} L768 ${116 + i * 130}`} stroke={AMBER} width="2" dash="4 5" />
                  <rect x="772" y={94 + i * 130} width="70" height="34" rx="8" fill="#fff4ec" stroke={AMBER} strokeWidth="2.2" className="pym-pulse" />
                  <M x="807" y={116 + i * 130} size={11.5} anchor="middle" fill={AMBER} weight={800}>[1]</M>
                </g>
              ) : null}
            </g>
          )}
          <Tag x="748" y={i === 0 ? 62 : 62 + i * 130} text={verdict} tone={tone} w={100} className="pym-fade-in pym-delay-2" />
        </g>
      ))}
      <L x="450" y="462" size={11.5} fill={MUTED} weight={700}>is compares identity, == compares value — they answer different questions</L>
    </Scene>
  )
}

export function DictVsListScene() {
  return (
    <Scene caption="A list is ordered by position; a dictionary is keyed by meaning">
      <g className="pym-slide-in">
        <rect x="44" y="58" width="392" height="214" rx="13" fill={SKY} stroke={BLUE} strokeWidth="2.6" />
        <L x="240" y="88" size={14.5} fill={BLUE}>list — position</L>
        <M x="66" y="120" size={13}>cat = ['Zophie', 7, 'grey']</M>
        {['Zophie', '7', 'grey'].map((v, i) => (
          <g key={v} className={`pym-cell-in pym-delay-${i}`}>
            <rect x={66 + i * 118} y="140" width="108" height="44" rx="8" fill={WHITE} stroke={BLUE} strokeWidth="2.2" />
            <M x={120 + i * 118} y="168" size={12.5} anchor="middle" weight={700}>{v}</M>
            <M x={120 + i * 118} y="204" size={12} anchor="middle" fill={BLUE} weight={800}>{`[${i}]`}</M>
          </g>
        ))}
        <L x="240" y="240" size={11.5} fill={MUTED} weight={700}>you must remember that 1 means the age</L>
        <L x="240" y="260" size={11.5} fill={RED} weight={800}>insert a field and every index shifts</L>
      </g>

      <g className="pym-slide-in pym-delay-2">
        <rect x="464" y="58" width="392" height="214" rx="13" fill="#f0fdf4" stroke={GREEN} strokeWidth="2.6" />
        <L x="660" y="88" size={14.5} fill={GREEN}>dict — meaning</L>
        <M x="486" y="120" size={12.5}>{"cat = {'name': 'Zophie', 'age': 7}"}</M>
        {[["'name'", "'Zophie'"], ["'age'", '7'], ["'colour'", "'grey'"]].map(([k, v], i) => (
          <g key={k} className={`pym-cell-in pym-delay-${i}`}>
            <rect x="486" y={140 + i * 40} width="150" height="32" rx="8" fill={WHITE} stroke={GREEN} strokeWidth="2.2" />
            <M x="561" y={162 + i * 40} size={12} anchor="middle" fill={GREEN} weight={800}>{k}</M>
            <Wire d={`M640 ${156 + i * 40} L672 ${156 + i * 40}`} stroke={GREEN} width="2" marker="url(#pyArrG)" />
            <rect x="676" y={140 + i * 40} width="158" height="32" rx="8" fill={WHITE} stroke={MUTED} strokeWidth="2" />
            <M x="755" y={162 + i * 40} size={12} anchor="middle" weight={700}>{v}</M>
          </g>
        ))}
        <L x="660" y="260" size={11.5} fill={GREEN} weight={800}>cat['age'] says what it means, and never shifts</L>
      </g>

      <g className="pym-cell-in pym-delay-3">
        <rect x="44" y="300" width="812" height="140" rx="12" fill={WHITE} stroke={PURP} strokeWidth="2.5" />
        <L x="450" y="330" size={14} fill={PURP}>The properties that follow</L>
        {[
          ['keys are unique', 'a second assignment overwrites'],
          ['keys must be immutable', 'str, int, tuple — never a list'],
          ['lookup is one hash', 'not a scan of every item'],
          ['== ignores insertion order', 'two dicts match on content'],
        ].map(([a, b], i) => (
          <g key={a}>
            <Dot cx={78 + (i % 2) * 418} cy={366 + Math.floor(i / 2) * 44} r={5} fill={PURP} />
            <M x={94 + (i % 2) * 418} y={362 + Math.floor(i / 2) * 44} size={12.5} fill={PURP} weight={800}>{a}</M>
            <L x={94 + (i % 2) * 418} y={382 + Math.floor(i / 2) * 44} size={11.5} fill={MUTED} anchor="start" weight={700}>{b}</L>
          </g>
        ))}
      </g>
    </Scene>
  )
}

export function GetSetdefaultScene() {
  return (
    <Scene caption="Three ways to ask for a key that might not be there">
      <g className="pym-slide-in">
        <rect x="44" y="58" width="266" height="188" rx="13" fill="#fef2f2" stroke={RED} strokeWidth="2.6" />
        <L x="177" y="88" size={14} fill={RED}>picnic['eggs']</L>
        <Wire d="M177 104 L177 146" stroke={RED} width="2.4" marker="url(#pyArrR)" className="pym-current" />
        <rect x="70" y="150" width="214" height="52" rx="9" fill={WHITE} stroke={RED} strokeWidth="2.4" />
        <M x="177" y="182" size={13.5} anchor="middle" fill={RED} weight={800}>KeyError</M>
        <L x="177" y="226" size={11.5} fill={MUTED} weight={700}>the program stops</L>
      </g>

      <g className="pym-slide-in pym-delay-2">
        <rect x="318" y="58" width="266" height="188" rx="13" fill={SKY} stroke={BLUE} strokeWidth="2.6" />
        <L x="451" y="88" size={14} fill={BLUE}>.get('eggs', 0)</L>
        <Wire d="M451 104 L451 146" stroke={BLUE} width="2.4" marker="url(#pyArrB)" className="pym-current pym-delay-1" />
        <rect x="344" y="150" width="214" height="52" rx="9" fill={WHITE} stroke={BLUE} strokeWidth="2.4" />
        <M x="451" y="182" size={13.5} anchor="middle" fill={BLUE} weight={800}>0</M>
        <L x="451" y="226" size={11.5} fill={MUTED} weight={700}>reads only — dict unchanged</L>
      </g>

      <g className="pym-slide-in pym-delay-3">
        <rect x="592" y="58" width="266" height="188" rx="13" fill="#f0fdf4" stroke={GREEN} strokeWidth="2.6" />
        <L x="725" y="88" size={14} fill={GREEN}>.setdefault('eggs', 0)</L>
        <Wire d="M725 104 L725 146" stroke={GREEN} width="2.4" marker="url(#pyArrG)" className="pym-current pym-delay-2" />
        <rect x="618" y="150" width="214" height="52" rx="9" fill={WHITE} stroke={GREEN} strokeWidth="2.4" className="pym-insert" />
        <M x="725" y="182" size={13.5} anchor="middle" fill={GREEN} weight={800}>0, and stored</M>
        <L x="725" y="226" size={11.5} fill={MUTED} weight={700}>writes if absent — dict changed</L>
      </g>

      <Code
        x="44"
        y="278"
        w="400"
        title="the character-count idiom"
        accent={PURP}
        className="pym-cell-in pym-delay-4"
        lines={['count = {}', "for c in 'hello':", '    count.setdefault(c, 0)', '    count[c] = count[c] + 1']}
      />
      <g className="pym-cell-in pym-delay-4">
        <rect x="472" y="278" width="384" height="162" rx="12" fill={WHITE} stroke={TEAL} strokeWidth="2.4" />
        <L x="664" y="308" size={13.5} fill={TEAL}>Which to reach for</L>
        {[
          ['reading a value you may not have', '.get'],
          ['building up a tally or a bucket', '.setdefault'],
          ['a key that must exist', 'plain [ ]'],
        ].map(([a, b], i) => (
          <g key={a}>
            <L x="494" y={344 + i * 32} size={12} anchor="start" weight={700}>{a}</L>
            <M x="834" y={344 + i * 32} size={12.5} anchor="end" fill={TEAL} weight={800}>{b}</M>
          </g>
        ))}
        <L x="664" y="430" size={11} fill={MUTED} weight={700}>if k in d then d[k] costs two lookups for one answer</L>
      </g>
    </Scene>
  )
}

export function ModelShapeScene() {
  return (
    <Scene caption="Choose the structure that matches the shape of the thing">
      {[
        ['one thing, named fields', 'dict', "{'name': 'Zophie', 'age': 7}", GREEN],
        ['many of the same thing', 'list', "['cat', 'bat', 'rat']", BLUE],
        ['a fixed pair or record', 'tuple', '(12, 30)', PURP],
        ['a grid or a table', 'list of lists', '[[1,2],[3,4]]', AMBER],
      ].map(([shape, pick, sample, tone], i) => (
        <g key={pick} className={`pym-slide-in pym-delay-${i}`}>
          <rect x="44" y={60 + i * 92} width="812" height="78" rx="12" fill={WHITE} stroke={tone} strokeWidth="2.5" />
          <rect x="44" y={60 + i * 92} width="9" height="78" rx="4" fill={tone} />
          <L x="74" y={92 + i * 92} size={13.5} anchor="start" weight={800}>{shape}</L>
          <M x="74" y={116 + i * 92} size={12} fill={MUTED} anchor="start">{sample}</M>
          <rect x="700" y={80 + i * 92} width="132" height="38" rx="19" fill={tone} opacity="0.13" />
          <M x="766" y={104 + i * 92} size={13.5} anchor="middle" fill={tone} weight={800}>{pick}</M>
        </g>
      ))}
      <g className="pym-fade-in pym-delay-4">
        <rect x="44" y="428" width="812" height="46" rx="10" fill={SKY} stroke={BLUE} strokeWidth="2.2" />
        <M x="70" y="457" size={13} fill={BLUE} weight={800}>pprint.pprint(x)</M>
        <L x="216" y="457" size={12} fill={MUTED} anchor="start" weight={700}>indents nested structures and sorts dict keys — read a model with it, not print()</L>
      </g>
    </Scene>
  )
}

export function NestedTreeScene() {
  const branches = [
    ['Alice', 130, GREEN, 'G', [["'apples'", '7'], ["'pretzels'", '12']]],
    ['Bob', 450, AMBER, 'A', [["'ham'", '3'], ["'apples'", '2']]],
    ['Carol', 770, PURP, 'P', [["'cups'", '3'], ["'cake'", '1']]],
  ]
  return (
    <Scene caption="allGuests['Alice']['apples'] — one bracket per level, left to right">
      <rect x="330" y="52" width="240" height="46" rx="10" fill={SKY} stroke={BLUE} strokeWidth="2.6" className="pym-flux" />
      <M x="450" y="82" size={13.5} anchor="middle" fill={BLUE} weight={800}>allGuests</M>

      {branches.map(([name, cx, tone, mk, rows], i) => (
        <g key={name}>
          <g className={`pym-descend pym-delay-${i}`}>
            <Wire d={`M450 102 L${cx} 150`} stroke={tone} width="2.2" marker={`url(#pyArr${mk})`} />
            <rect x={n(cx) - 78} y="154" width="156" height="42" rx="9" fill={WHITE} stroke={tone} strokeWidth="2.4" />
            <M x={cx} y="181" size={13} anchor="middle" fill={tone} weight={800}>{`'${name}'`}</M>
          </g>
          {rows.map(([k, v], j) => (
            <g key={k} className={`pym-cell-in pym-delay-${i + j}`}>
              <Wire d={`M${cx} 200 L${cx} ${228 + j * 54}`} stroke={tone} width="2" dash="4 5" />
              <rect x={n(cx) - 96} y={228 + j * 54} width="192" height="42" rx="9" fill={WHITE} stroke={MUTED} strokeWidth="2" />
              <M x={n(cx) - 78} y={255 + j * 54} size={12} fill={tone} weight={800}>{k}</M>
              <M x={n(cx) + 78} y={255 + j * 54} size={12.5} anchor="end" weight={800}>{v}</M>
            </g>
          ))}
        </g>
      ))}

      <g className="pym-fade-in pym-delay-4">
        <rect x="112" y="350" width="676" height="102" rx="12" fill={WHITE} stroke={BLUE} strokeWidth="2.4" />
        <M x="140" y="384" size={14} fill={BLUE} weight={800}>allGuests['Alice']['apples']  →  7</M>
        <L x="140" y="410" size={12} fill={MUTED} anchor="start" weight={700}>each [ ] descends one level; the value it lands on decides what is legal next</L>
        <M x="140" y="438" size={12.5} fill={RED} weight={800}>a missing level raises KeyError — walk it with .get(), not faith</M>
      </g>
    </Scene>
  )
}

export function StringImmutableScene() {
  const chars = ['H', 'e', 'l', 'l', 'o']
  return (
    <Scene caption="Strings index and slice exactly like lists — and refuse to be edited">
      {chars.map((c, i) => (
        <Cell key={i} x={196 + i * 104} y="102" w="88" h="52" value={`'${c}'`} idx={i} neg={i - 5} className={`pym-cell-in pym-delay-${i}`} />
      ))}
      <M x="130" y="134" size={14} fill={BLUE} weight={800}>s =</M>

      <g className="pym-slide-in pym-delay-2">
        <rect x="44" y="204" width="392" height="120" rx="12" fill="#fef2f2" stroke={RED} strokeWidth="2.6" />
        <L x="240" y="234" size={14} fill={RED}>Immutable</L>
        <M x="66" y="270" size={13.5} fill={RED} weight={800}>s[0] = 'J'  →  TypeError</M>
        <M x="66" y="300" size={13} fill={GREEN} weight={800}>s = 'J' + s[1:]   # build a new one</M>
      </g>

      <g className="pym-slide-in pym-delay-3">
        <rect x="464" y="204" width="392" height="120" rx="12" fill="#f0fdf4" stroke={GREEN} strokeWidth="2.6" />
        <L x="660" y="234" size={14} fill={GREEN}>Reading is free</L>
        <M x="486" y="270" size={13}>s[0] → 'H'    s[-1] → 'o'</M>
        <M x="486" y="300" size={13}>s[1:4] → 'ell'   'H' in s → True</M>
      </g>

      <g className="pym-cell-in pym-delay-4">
        <rect x="44" y="350" width="812" height="106" rx="12" fill={WHITE} stroke={PURP} strokeWidth="2.5" />
        <L x="450" y="380" size={13.5} fill={PURP}>Literal forms, and why they exist</L>
        {[
          ['"It\'s fine"', 'double quotes hold an apostrophe'],
          ["'Say \\\"hi\\\"'", 'backslash escapes the delimiter'],
          ["r'C:\\new'", 'raw — the backslash stays a backslash'],
          ["'''two lines'''", 'triple quotes span lines verbatim'],
        ].map(([a, b], i) => (
          <g key={a}>
            <M x={70 + (i % 2) * 418} y={410 + Math.floor(i / 2) * 30} size={12.5} fill={PURP} weight={800}>{a}</M>
            <L x={252 + (i % 2) * 418} y={410 + Math.floor(i / 2) * 30} size={11.5} fill={MUTED} anchor="start" weight={700}>{b}</L>
          </g>
        ))}
      </g>
    </Scene>
  )
}

export function IsXGateScene() {
  return (
    <Scene caption="Validate before you convert — isdecimal() answers, int() explodes">
      <rect x="44" y="60" width="200" height="70" rx="12" fill={WHITE} stroke={MUTED} strokeWidth="2.4" />
      <M x="144" y="102" size={14} anchor="middle" weight={800}>input()</M>
      <Wire d="M248 96 L330 96" stroke={N} width="2.4" marker="url(#pyArr)" className="pym-current" />

      <g className="pym-gate">
        <path d="M334 56 L470 96 L334 136 Z" fill={SKY} stroke={BLUE} strokeWidth="2.8" />
        <M x="352" y="101" size={12} fill={BLUE} weight={800}>isdecimal()</M>
      </g>

      <Wire d="M474 84 L580 62" stroke={GREEN} width="2.4" marker="url(#pyArrG)" className="pym-current pym-delay-1" />
      <g className="pym-cell-in pym-delay-2">
        <rect x="584" y="38" width="272" height="52" rx="10" fill="#f0fdf4" stroke={GREEN} strokeWidth="2.4" />
        <M x="720" y="70" size={13} anchor="middle" fill={GREEN} weight={800}>int(text) — safe</M>
      </g>

      <Wire d="M474 110 L580 142" stroke={RED} width="2.4" marker="url(#pyArrR)" className="pym-current pym-delay-2" />
      <g className="pym-cell-in pym-delay-3">
        <rect x="584" y="118" width="272" height="52" rx="10" fill="#fef2f2" stroke={RED} strokeWidth="2.4" />
        <M x="720" y="150" size={13} anchor="middle" fill={RED} weight={800}>ask again — no crash</M>
      </g>

      <Panel
        x="44"
        y="204"
        w="392"
        title="Case methods return NEW strings"
        accent={AMBER}
        className="pym-slide-in pym-delay-3"
        mono
        rowH={30}
        rows={[["s.upper()   'HELLO'"], ["s.lower()   'hello'"], ["s.title()   'Hello World'"], ['s = s.upper()  ← you must assign']]}
      />

      <g className="pym-cell-in pym-delay-4">
        <rect x="464" y="204" width="392" height="236" rx="12" fill={WHITE} stroke={TEAL} strokeWidth="2.5" />
        <L x="660" y="234" size={13.5} fill={TEAL}>The isX family</L>
        {[
          ['isalpha()', 'letters only, at least one'],
          ['isalnum()', 'letters or digits'],
          ['isdecimal()', 'digits only — safe for int()'],
          ['isspace()', 'spaces, tabs, newlines'],
          ['istitle()', 'Every Word Capitalised'],
        ].map(([a, b], i) => (
          <g key={a} className={`pym-slide-in pym-delay-${i}`}>
            <M x="486" y={272 + i * 32} size={12.5} fill={TEAL} weight={800}>{a}</M>
            <L x="834" y={272 + i * 32} size={11.5} fill={MUTED} anchor="end" weight={700}>{b}</L>
          </g>
        ))}
        <M x="660" y="428" size={11.5} anchor="middle" fill={RED} weight={800}>''.isalpha() is False — empty never qualifies</M>
      </g>
      <g className="pym-fade-in pym-delay-4">
        <rect x="44" y="352" width="392" height="88" rx="12" fill="#fff4ec" stroke={AMBER} strokeWidth="2.2" />
        <L x="240" y="382" size={12.5} fill={AMBER}>Case-insensitive comparison</L>
        <M x="66" y="416" size={12.5} fill={GREEN} weight={800}>if answer.lower() == 'yes':</M>
      </g>
    </Scene>
  )
}

export function JoinSplitScene() {
  return (
    <Scene caption="join is a str method that takes a list; split is a str method that returns one">
      <g className="pym-slide-in">
        <rect x="44" y="60" width="812" height="146" rx="13" fill={WHITE} stroke={GREEN} strokeWidth="2.6" />
        <M x="70" y="94" size={14} fill={GREEN} weight={800}>', '.join(['cats', 'rats', 'bats'])</M>
        {['cats', 'rats', 'bats'].map((v, i) => (
          <g key={v} className={`pym-merge-l pym-delay-${i}`}>
            <rect x={70 + i * 120} y="112" width="108" height="42" rx="8" fill={WHITE} stroke={GREEN} strokeWidth="2.2" />
            <M x={124 + i * 120} y="140" size={12.5} anchor="middle" weight={700}>{v}</M>
          </g>
        ))}
        <Wire d="M438 134 L508 134" stroke={GREEN} width="2.6" marker="url(#pyArrG)" className="pym-current" />
        <rect x="512" y="112" width="320" height="42" rx="8" fill="#f0fdf4" stroke={GREEN} strokeWidth="2.4" />
        <M x="672" y="140" size={13} anchor="middle" fill={GREEN} weight={800}>'cats, rats, bats'</M>
        <L x="450" y="188" size={11.5} fill={MUTED} weight={700}>the separator is the string you call it on — that is why it reads backwards at first</L>
      </g>

      <g className="pym-slide-in pym-delay-2">
        <rect x="44" y="226" width="812" height="146" rx="13" fill={WHITE} stroke={BLUE} strokeWidth="2.6" />
        <M x="70" y="260" size={14} fill={BLUE} weight={800}>'cats, rats, bats'.split(', ')</M>
        <rect x="70" y="278" width="320" height="42" rx="8" fill={SKY} stroke={BLUE} strokeWidth="2.4" />
        <M x="230" y="306" size={13} anchor="middle" fill={BLUE} weight={800}>'cats, rats, bats'</M>
        <Wire d="M396 300 L466 300" stroke={BLUE} width="2.6" marker="url(#pyArrB)" className="pym-current pym-delay-1" />
        {['cats', 'rats', 'bats'].map((v, i) => (
          <g key={v} className={`pym-merge-r pym-delay-${i}`}>
            <rect x={470 + i * 122} y="278" width="112" height="42" rx="8" fill={WHITE} stroke={BLUE} strokeWidth="2.2" />
            <M x={526 + i * 122} y="306" size={12.5} anchor="middle" weight={700}>{v}</M>
          </g>
        ))}
        <L x="450" y="354" size={11.5} fill={MUTED} weight={700}>split() with no argument splits on any run of whitespace and drops the empties</L>
      </g>

      <Panel
        x="44"
        y="392"
        w="392"
        title="Testing the ends"
        accent={PURP}
        className="pym-cell-in pym-delay-3"
        mono
        rowH={26}
        rows={[["s.startswith('Hello')  → True"], ["s.endswith('.txt')     → True"]]}
      />
      <g className="pym-cell-in pym-delay-4">
        <rect x="464" y="392" width="392" height="82" rx="11" fill="#fff4ec" stroke={RED} strokeWidth="2.2" />
        <M x="486" y="422" size={12.5} fill={RED} weight={800}>['a','b'].join(',') → AttributeError</M>
        <L x="486" y="446" size={11.5} fill={MUTED} anchor="start" weight={700}>join belongs to str, because the separator is a str</L>
      </g>
    </Scene>
  )
}

export function PadStripScene() {
  return (
    <Scene caption="Alignment for output, stripping for input, the clipboard for both">
      <g className="pym-slide-in">
        <rect x="44" y="58" width="470" height="176" rx="13" fill={WHITE} stroke={BLUE} strokeWidth="2.6" />
        <L x="279" y="88" size={14} fill={BLUE}>Justify — pad to a width</L>
        {[["'Hello'.rjust(12)", '       Hello'], ["'Hello'.ljust(12, '.')", 'Hello.......'], ["'Hello'.center(12, '=')", '===Hello====']].map(([call, out], i) => (
          <g key={call} className={`pym-cell-in pym-delay-${i}`}>
            <M x="66" y={122 + i * 36} size={12.5} fill={BLUE} weight={800}>{call}</M>
            <rect x="286" y={106 + i * 36} width="212" height="26" rx="6" fill={SKY} stroke={BLUE} strokeWidth="1.6" />
            <M x="392" y={124 + i * 36} size={12} anchor="middle" weight={700}>{out}</M>
          </g>
        ))}
        <L x="279" y="222" size={11.5} fill={MUTED} weight={700}>monospaced output only — proportional fonts will not line up</L>
      </g>

      <g className="pym-slide-in pym-delay-2">
        <rect x="542" y="58" width="314" height="176" rx="13" fill={WHITE} stroke={AMBER} strokeWidth="2.6" />
        <L x="699" y="88" size={14} fill={AMBER}>Strip — cut from the ends</L>
        <rect x="564" y="106" width="270" height="34" rx="7" fill="#fff4ec" stroke={AMBER} strokeWidth="2" />
        <M x="699" y="129" size={12.5} anchor="middle" weight={700}>'   Hello   '</M>
        <Wire d="M699 144 L699 168" stroke={AMBER} width="2.2" marker="url(#pyArrA)" className="pym-current" />
        <rect x="620" y="172" width="158" height="34" rx="7" fill={WHITE} stroke={GREEN} strokeWidth="2.4" className="pym-collapse" />
        <M x="699" y="195" size={12.5} anchor="middle" fill={GREEN} weight={800}>'Hello'</M>
        <M x="699" y="224" size={11.5} anchor="middle" fill={MUTED} weight={700}>.lstrip() .rstrip() .strip()</M>
      </g>

      <g className="pym-cell-in pym-delay-3">
        <rect x="44" y="262" width="470" height="178" rx="12" fill="#fff4ec" stroke={RED} strokeWidth="2.4" />
        <L x="279" y="292" size={13.5} fill={RED}>strip() takes a SET of characters</L>
        <M x="66" y="328" size={13}>'SpamSpamBacon'.strip('ampS')</M>
        <M x="66" y="356" size={13} fill={GREEN} weight={800}>→ 'Bacon'</M>
        <foreignObject x="66" y="368" width="428" height="62">
          <div xmlns="http://www.w3.org/1999/xhtml" style={{ font: '700 12px/1.35 system-ui,sans-serif', color: '#4f6076' }}>
            Not a prefix — it removes any of those characters from either end until it
            meets one that is not in the set. To drop a prefix, test with startswith
            and slice.
          </div>
        </foreignObject>
      </g>

      <Panel
        x="542"
        y="262"
        w="314"
        title="pyperclip — the system clipboard"
        accent={TEAL}
        className="pym-cell-in pym-delay-4"
        mono
        rowH={30}
        rows={[['import pyperclip'], ['pyperclip.copy(text)'], ['pyperclip.paste()'], ['pip install pyperclip first']]}
      />
    </Scene>
  )
}

/* ── Module 3 — regular expressions and files ───────────────────── */

/** A text ribbon with one span highlighted — the shape every regex scene needs.
 *  Characters are laid out on a fixed pitch so a span can be boxed exactly. */
function Ribbon({ x, y, text, from = -1, to = -1, tone = AMBER, pitch = 15, size = 15, className = '', label }) {
  const X = n(x)
  const Y = n(y)
  const chars = String(text).split('')
  const a = n(from)
  const b = n(to)
  return (
    <g transform={`translate(${X},${Y})`}>
      {a >= 0 && b > a ? (
        <g className={className}>
          <rect x={a * n(pitch) - 3} y="-20" width={(b - a) * n(pitch) + 6} height="30" rx="6" fill={tone} opacity="0.18" />
          <rect x={a * n(pitch) - 3} y="-20" width={(b - a) * n(pitch) + 6} height="30" rx="6" fill="none" stroke={tone} strokeWidth="2.2" />
          {label ? (
            <M x={a * n(pitch) + ((b - a) * n(pitch)) / 2} y={-28} size={11.5} anchor="middle" fill={tone} weight={800}>
              {label}
            </M>
          ) : null}
        </g>
      ) : null}
      {chars.map((c, i) => (
        <M key={i} x={i * n(pitch)} y={0} size={size} fill={i >= a && i < b ? tone : N} weight={i >= a && i < b ? 800 : 600}>
          {c}
        </M>
      ))}
    </g>
  )
}

export function ManualMatcherScene() {
  return (
    <Scene caption="Twenty-five lines that only ever match one shape of phone number">
      <Code
        x="44"
        y="56"
        w="440"
        title="isPhoneNumber.py — the hand-written version"
        accent={AMBER}
        className="pym-slide-in"
        size={12}
        lines={[
          'def isPhoneNumber(text):',
          '    if len(text) != 12: return False',
          '    for i in range(0, 3):',
          '        if not text[i].isdecimal(): return False',
          "    if text[3] != '-': return False",
          '    for i in range(4, 7):',
          '        if not text[i].isdecimal(): return False',
          "    if text[7] != '-': return False",
          '    for i in range(8, 12):',
          '        if not text[i].isdecimal(): return False',
          '    return True',
        ]}
      />
      <g className="pym-cell-in pym-delay-2">
        <rect x="512" y="56" width="344" height="196" rx="12" fill="#fef2f2" stroke={RED} strokeWidth="2.5" />
        <L x="684" y="86" size={13.5} fill={RED}>What one new format costs</L>
        {[
          ['(415) 555-4242', 'rewrite the length test'],
          ['415.555.4242', 'rewrite both separators'],
          ['+91 98765 43210', 'rewrite the whole function'],
        ].map(([a, b], i) => (
          <g key={a} className={`pym-slide-in pym-delay-${i}`}>
            <M x="534" y={122 + i * 42} size={12.5} fill={RED} weight={800}>{a}</M>
            <L x="534" y={142 + i * 42} size={11.5} fill={MUTED} anchor="start" weight={700}>{b}</L>
          </g>
        ))}
        <L x="684" y="236" size={11.5} fill={MUTED} weight={700}>the rule is scattered over eleven lines</L>
      </g>

      <Wire d="M684 260 L684 300" stroke={GREEN} width="3" marker="url(#pyArrG)" className="pym-current pym-delay-2" />

      <g className="pym-cell-in pym-delay-4">
        <rect x="512" y="306" width="344" height="134" rx="12" fill="#f0fdf4" stroke={GREEN} strokeWidth="2.8" />
        <L x="684" y="336" size={13.5} fill={GREEN}>The same rule, declared once</L>
        <M x="534" y="376" size={14} fill={GREEN} weight={800}>r'\d{'{'}3{'}'}-\d{'{'}3{'}'}-\d{'{'}4{'}'}'</M>
        <L x="684" y="410" size={11.5} fill={MUTED} weight={700}>the shape is the pattern; the engine does the walking</L>
      </g>
      <g className="pym-fade-in pym-delay-3">
        <rect x="44" y="352" width="440" height="88" rx="12" fill={SKY} stroke={BLUE} strokeWidth="2.2" />
        <L x="264" y="382" size={12.5} fill={BLUE}>Still useful to have written once</L>
        <L x="264" y="410" size={11.5} fill={MUTED} weight={700}>it is exactly what the regex engine does, step by step</L>
      </g>
    </Scene>
  )
}

export function RegexPipelineScene() {
  const stages = [
    ["r'\\d\\d\\d-\\d\\d\\d\\d'", 'raw pattern string', MUTED],
    ['re.compile(...)', 'Regex object', BLUE],
    ['.search(text)', 'Match object or None', AMBER],
    ['.group()', 'the matched text', GREEN],
  ]
  return (
    <Scene caption="Four objects, in this order — skip one and the next attribute does not exist">
      {stages.map(([label, note, tone], i) => (
        <g key={label} className={`pym-slide-in pym-delay-${i}`}>
          <rect x="70" y={62 + i * 92} width="420" height="68" rx="12" fill={WHITE} stroke={tone} strokeWidth="2.6" />
          <M x="94" y={96 + i * 92} size={13.5} fill={tone} weight={800}>{label}</M>
          <L x="94" y={118 + i * 92} size={11.5} fill={MUTED} anchor="start" weight={700}>{note}</L>
          {i < 3 ? <Wire d={`M280 ${132 + i * 92} L280 ${150 + i * 92}`} stroke={tone} width="2.4" marker="url(#pyArr)" className="pym-current" /> : null}
        </g>
      ))}
      <g className="pym-cell-in pym-delay-3">
        <rect x="528" y="62" width="330" height="172" rx="12" fill="#fef2f2" stroke={RED} strokeWidth="2.5" />
        <L x="693" y="92" size={13.5} fill={RED}>search returns None on no match</L>
        <M x="550" y="130" size={12.5} fill={RED} weight={800}>mo.group()</M>
        <M x="550" y="156" size={12.5} fill={RED} weight={800}>AttributeError: 'NoneType'</M>
        <L x="550" y="184" size={11.5} fill={MUTED} anchor="start" weight={700}>the pattern did not match; there is no</L>
        <L x="550" y="204" size={11.5} fill={MUTED} anchor="start" weight={700}>Match object to ask, so always test first</L>
      </g>
      <Code
        x="528"
        y="256"
        w="330"
        title="the shape to memorise"
        accent={GREEN}
        className="pym-cell-in pym-delay-4"
        size={12}
        lines={['mo = regex.search(text)', 'if mo is not None:', '    print(mo.group())']}
      />
      <g className="pym-fade-in pym-delay-4">
        <rect x="528" y="386" width="330" height="54" rx="11" fill={SKY} stroke={BLUE} strokeWidth="2.2" />
        <M x="550" y="418" size={12.5} fill={BLUE} weight={800}>r'' — always raw</M>
        <L x="700" y="418" size={11} fill={MUTED} anchor="start" weight={700}>so \d stays \d, not an escape</L>
      </g>
    </Scene>
  )
}

export function GroupNumberScene() {
  return (
    <Scene caption="Count the opening parentheses left to right — that is the group number">
      <M x="80" y="94" size={16} fill={BLUE} weight={800}>r'(\d\d\d)-(\d\d\d-\d\d\d\d)'</M>
      <g className="pym-fade-in">
        <rect x="102" y="72" width="96" height="30" rx="6" fill={BLUE} opacity="0.14" />
        <M x="150" y="60" size={12} anchor="middle" fill={BLUE} weight={800}>group 1</M>
      </g>
      <g className="pym-fade-in pym-delay-1">
        <rect x="214" y="72" width="204" height="30" rx="6" fill={AMBER} opacity="0.14" />
        <M x="316" y="60" size={12} anchor="middle" fill={AMBER} weight={800}>group 2</M>
      </g>

      <Ribbon x="80" y="180" text="415-555-4242" from={0} to={12} tone={PURP} pitch={16} size={17} label="group 0 — the whole match" className="pym-fade-in pym-delay-2" />

      {[
        ['mo.group(0)', "'415-555-4242'", PURP],
        ['mo.group(1)', "'415'", BLUE],
        ['mo.group(2)', "'555-4242'", AMBER],
        ['mo.groups()', "('415', '555-4242')", TEAL],
      ].map(([call, out, tone], i) => (
        <g key={call} className={`pym-slide-in pym-delay-${i}`}>
          <rect x="44" y={240 + i * 56} width="812" height="46" rx="10" fill={WHITE} stroke={tone} strokeWidth="2.3" />
          <M x="70" y={269 + i * 56} size={13.5} fill={tone} weight={800}>{call}</M>
          <Wire d={`M290 ${263 + i * 56} L350 ${263 + i * 56}`} stroke={tone} width="2.2" marker="url(#pyArr)" className={`pym-current pym-delay-${i}`} />
          <M x="366" y={269 + i * 56} size={13.5} weight={700}>{out}</M>
          {i === 3 ? <L x="834" y={269 + i * 56} size={11} fill={MUTED} anchor="end" weight={700}>a tuple — group 0 is not in it</L> : null}
        </g>
      ))}
      <M x="450" y="474" size={11.5} anchor="middle" fill={MUTED} weight={700}>a literal parenthesis must be escaped: \( and \)</M>
    </Scene>
  )
}

export function AlternationScene() {
  return (
    <Scene caption="The pipe takes the first alternative that matches at the earliest position">
      <M x="80" y="90" size={16} fill={BLUE} weight={800}>r'Bat(man|mobile|copter)'</M>

      {['man', 'mobile', 'copter'].map((alt, i) => (
        <g key={alt} className={`pym-slide-in pym-delay-${i}`}>
          <rect x="120" y={130 + i * 62} width="300" height="48" rx="10" fill={i === 0 ? '#f0fdf4' : WHITE} stroke={i === 0 ? GREEN : MUTED} strokeWidth={i === 0 ? 2.8 : 2} strokeDasharray={i === 0 ? undefined : '5 5'} />
          <M x="146" y={160 + i * 62} size={13.5} fill={i === 0 ? GREEN : MUTED} weight={800}>{`Bat${alt}`}</M>
          {i === 0 ? <Tag x="300" y={138 + i * 62} text="taken" tone={GREEN} w={100} className="pym-fade-in pym-delay-2" /> : <L x="400" y={165 + i * 62} size={11.5} fill={MUTED} anchor="end" weight={700}>not tried</L>}
        </g>
      ))}

      <Ribbon x="470" y="160" text="Batmobile" from={0} to={6} tone={GREEN} pitch={16} size={16} label="match" className="pym-fade-in pym-delay-2" />
      <M x="470" y="206" size={12.5} fill={MUTED}>pattern: Bat(man|mobile)</M>
      <M x="470" y="232" size={13} fill={RED} weight={800}>→ 'Batman' — man is listed first</M>
      <M x="470" y="268" size={12.5} fill={MUTED}>pattern: Bat(mobile|man)</M>
      <M x="470" y="294" size={13} fill={GREEN} weight={800}>→ 'Batmobile' — longest first</M>

      <g className="pym-cell-in pym-delay-4">
        <rect x="44" y="330" width="812" height="120" rx="12" fill="#fff4ec" stroke={AMBER} strokeWidth="2.5" />
        <L x="450" y="360" size={13.5} fill={AMBER}>Order matters, and so does the grouping</L>
        <M x="80" y="398" size={13} fill={RED} weight={800}>r'^cat|dog$'</M>
        <L x="240" y="398" size={11.5} fill={MUTED} anchor="start" weight={700}>means "starts with cat" OR "ends with dog"</L>
        <M x="80" y="428" size={13} fill={GREEN} weight={800}>r'^(cat|dog)$'</M>
        <L x="240" y="428" size={11.5} fill={MUTED} anchor="start" weight={700}>means the whole string is exactly one of them</L>
      </g>
    </Scene>
  )
}

export function OptionalBranchScene() {
  return (
    <Scene caption="? makes the group optional — the Match still exists, the group may be None">
      <M x="80" y="88" size={16} fill={BLUE} weight={800}>r'Bat(wo)?man'</M>
      <g className="pym-fade-in">
        <rect x="150" y="66" width="60" height="30" rx="6" fill={PURP} opacity="0.16" />
        <M x="180" y="56" size={11.5} anchor="middle" fill={PURP} weight={800}>0 or 1</M>
      </g>

      <Wire d="M170 120 L170 158" stroke={MUTED} width="2.2" marker="url(#pyArr)" />
      <Wire d="M170 158 L100 190" stroke={GREEN} width="2.4" marker="url(#pyArrG)" className="pym-current" />
      <Wire d="M170 158 L420 190" stroke={AMBER} width="2.4" marker="url(#pyArrA)" className="pym-current pym-delay-1" />

      <g className="pym-cell-in pym-delay-2">
        <rect x="44" y="196" width="382" height="124" rx="12" fill="#f0fdf4" stroke={GREEN} strokeWidth="2.6" />
        <L x="235" y="226" size={13.5} fill={GREEN}>present</L>
        <M x="66" y="262" size={14} weight={800}>'Batwoman'</M>
        <M x="66" y="290" size={13} fill={GREEN} weight={800}>mo.group(1) → 'wo'</M>
      </g>
      <g className="pym-cell-in pym-delay-3">
        <rect x="464" y="196" width="392" height="124" rx="12" fill="#fff4ec" stroke={AMBER} strokeWidth="2.6" />
        <L x="660" y="226" size={13.5} fill={AMBER}>absent</L>
        <M x="486" y="262" size={14} weight={800}>'Batman'</M>
        <M x="486" y="290" size={13} fill={AMBER} weight={800}>mo.group(1) → None</M>
      </g>

      <g className="pym-cell-in pym-delay-4">
        <rect x="44" y="342" width="812" height="112" rx="12" fill="#fef2f2" stroke={RED} strokeWidth="2.5" />
        <L x="450" y="372" size={13.5} fill={RED}>Matched is not the same as captured</L>
        <M x="80" y="410" size={13} fill={RED} weight={800}>len(mo.group(1))</M>
        <L x="270" y="410" size={11.5} fill={MUTED} anchor="start" weight={700}>TypeError when the optional group was absent</L>
        <M x="80" y="438" size={13} fill={GREEN} weight={800}>mo.group(1) or ''</M>
        <L x="270" y="438" size={11.5} fill={MUTED} anchor="start" weight={700}>substitute a default before using it</L>
      </g>
    </Scene>
  )
}

export function StarPlusScene() {
  return (
    <Scene caption="* allows zero; + demands at least one. That is the entire difference.">
      <g className="pym-slide-in">
        <rect x="44" y="58" width="392" height="196" rx="13" fill={WHITE} stroke={BLUE} strokeWidth="2.6" />
        <M x="66" y="92" size={15} fill={BLUE} weight={800}>r'Bat(wo)*man'</M>
        {[['Batman', '0 copies'], ['Batwoman', '1 copy'], ['Batwowowoman', '3 copies']].map(([t, note], i) => (
          <g key={t} className={`pym-cell-in pym-delay-${i}`}>
            <rect x="66" y={110 + i * 44} width="348" height="36" rx="8" fill="#f0fdf4" stroke={GREEN} strokeWidth="2" />
            <M x="86" y={133 + i * 44} size={12.5} fill={GREEN} weight={800}>{t}</M>
            <L x="394" y={133 + i * 44} size={11} fill={MUTED} anchor="end" weight={700}>{note}</L>
          </g>
        ))}
        <M x="240" y="244" size={12} anchor="middle" fill={BLUE} weight={800}>zero is a legal count</M>
      </g>

      <g className="pym-slide-in pym-delay-2">
        <rect x="464" y="58" width="392" height="196" rx="13" fill={WHITE} stroke={AMBER} strokeWidth="2.6" />
        <M x="486" y="92" size={15} fill={AMBER} weight={800}>r'Bat(wo)+man'</M>
        {[['Batman', false, 'NO match'], ['Batwoman', true, '1 copy'], ['Batwowowoman', true, '3 copies']].map(([t, ok, note], i) => (
          <g key={t} className={`pym-cell-in pym-delay-${i}`}>
            <rect x="486" y={110 + i * 44} width="348" height="36" rx="8" fill={ok ? '#f0fdf4' : '#fef2f2'} stroke={ok ? GREEN : RED} strokeWidth="2" />
            <M x="506" y={133 + i * 44} size={12.5} fill={ok ? GREEN : RED} weight={800}>{t}</M>
            <L x="814" y={133 + i * 44} size={11} fill={MUTED} anchor="end" weight={700}>{note}</L>
          </g>
        ))}
        <M x="660" y="244" size={12} anchor="middle" fill={AMBER} weight={800}>one copy is the minimum</M>
      </g>

      <g className="pym-cell-in pym-delay-3">
        <rect x="44" y="280" width="392" height="164" rx="12" fill={SKY} stroke={PURP} strokeWidth="2.5" />
        <L x="240" y="310" size={13.5} fill={PURP}>Exact counts with { }</L>
        <M x="66" y="346" size={13}>{"(Ha){3}    exactly 3"}</M>
        <M x="66" y="374" size={13}>{"(Ha){3,5}  3 to 5"}</M>
        <M x="66" y="402" size={13}>{"(Ha){3,}   3 or more"}</M>
        <M x="66" y="430" size={13}>{"(Ha){,5}   up to 5"}</M>
      </g>

      <g className="pym-cell-in pym-delay-4">
        <rect x="464" y="280" width="392" height="164" rx="12" fill="#fef2f2" stroke={RED} strokeWidth="2.5" />
        <L x="660" y="310" size={13.5} fill={RED}>* matches the empty string</L>
        <M x="486" y="346" size={13} fill={RED} weight={800}>re.search(r'\d*', 'abc')</M>
        <M x="486" y="374" size={13} fill={RED} weight={800}>→ a Match of ''</M>
        <foreignObject x="486" y="386" width="352" height="58">
          <div xmlns="http://www.w3.org/1999/xhtml" style={{ font: '700 12px/1.35 system-ui,sans-serif', color: '#4f6076' }}>
            A truthy Match that captured nothing. If you meant "there must be digits
            here", + is the quantifier you wanted.
          </div>
        </foreignObject>
      </g>
    </Scene>
  )
}

export function GreedyLazyScene() {
  return (
    <Scene caption="Both are valid matches; the quantifier decides which one you get">
      <M x="450" y="72" size={15} anchor="middle" fill={MUTED} weight={700}>text: &lt;To serve man&gt; for dinner.&gt;</M>

      <g className="pym-slide-in">
        <rect x="44" y="102" width="812" height="122" rx="13" fill={WHITE} stroke={AMBER} strokeWidth="2.6" />
        <M x="70" y="136" size={14} fill={AMBER} weight={800}>r'&lt;.*&gt;'   greedy — take everything, then give back</M>
        <Ribbon x="70" y="186" text="<To serve man> for dinner.>" from={0} to={27} tone={AMBER} pitch={15} size={15} className="pym-sweep-x" />
        <L x="834" y="216" size={11.5} fill={MUTED} anchor="end" weight={700}>stops at the LAST &gt;</L>
      </g>

      <g className="pym-slide-in pym-delay-2">
        <rect x="44" y="244" width="812" height="122" rx="13" fill={WHITE} stroke={GREEN} strokeWidth="2.6" />
        <M x="70" y="278" size={14} fill={GREEN} weight={800}>r'&lt;.*?&gt;'  lazy — take as little as will do</M>
        <Ribbon x="70" y="328" text="<To serve man> for dinner.>" from={0} to={14} tone={GREEN} pitch={15} size={15} className="pym-fade-in pym-delay-2" />
        <L x="834" y="358" size={11.5} fill={MUTED} anchor="end" weight={700}>stops at the FIRST &gt;</L>
      </g>

      <g className="pym-cell-in pym-delay-4">
        <rect x="44" y="386" width="812" height="74" rx="12" fill={SKY} stroke={BLUE} strokeWidth="2.4" />
        <M x="70" y="420" size={13} fill={BLUE} weight={800}>? after a quantifier = lazy</M>
        <M x="70" y="446" size={12.5} fill={MUTED}>*? +? {'{'}3,5{'}'}?  — the same ? that means "optional" when it follows a group</M>
        <L x="834" y="432" size={11.5} fill={MUTED} anchor="end" weight={700}>scraping tags? you almost always want lazy</L>
      </g>
    </Scene>
  )
}

export function FindallShapeScene() {
  return (
    <Scene caption="The return shape of findall() depends on how many groups the pattern has">
      <g className="pym-slide-in">
        <rect x="44" y="58" width="812" height="164" rx="13" fill={WHITE} stroke={BLUE} strokeWidth="2.6" />
        <L x="450" y="88" size={14} fill={BLUE}>no groups → a list of strings</L>
        <M x="70" y="126" size={13.5} weight={800}>{"re.compile(r'\\d\\d\\d-\\d\\d\\d\\d').findall(text)"}</M>
        {["'555-1122'", "'555-0000'"].map((v, i) => (
          <g key={v} className={`pym-cell-in pym-delay-${i}`}>
            <rect x={70 + i * 200} y="146" width="184" height="42" rx="8" fill={SKY} stroke={BLUE} strokeWidth="2.2" />
            <M x={162 + i * 200} y="174" size={12.5} anchor="middle" fill={BLUE} weight={800}>{v}</M>
          </g>
        ))}
        <L x="834" y="176" size={11.5} fill={MUTED} anchor="end" weight={700}>['555-1122', '555-0000']</L>
        <L x="450" y="212" size={11.5} fill={MUTED} weight={700}>every non-overlapping match, in order</L>
      </g>

      <g className="pym-slide-in pym-delay-2">
        <rect x="44" y="242" width="812" height="164" rx="13" fill={WHITE} stroke={AMBER} strokeWidth="2.6" />
        <L x="450" y="272" size={14} fill={AMBER}>one or more groups → a list of TUPLES</L>
        <M x="70" y="310" size={13.5} weight={800}>{"re.compile(r'(\\d\\d\\d)-(\\d\\d\\d\\d)').findall(text)"}</M>
        {[["('555', '1122')"], ["('555', '0000')"]].map(([v], i) => (
          <g key={v} className={`pym-cell-in pym-delay-${i}`}>
            <rect x={70 + i * 230} y="330" width="214" height="42" rx="8" fill="#fff4ec" stroke={AMBER} strokeWidth="2.2" />
            <M x={177 + i * 230} y="358" size={12.5} anchor="middle" fill={AMBER} weight={800}>{v}</M>
          </g>
        ))}
        <L x="450" y="396" size={11.5} fill={MUTED} weight={700}>one tuple per match, one slot per group — the type of everything downstream just changed</L>
      </g>

      <g className="pym-cell-in pym-delay-4">
        <rect x="44" y="424" width="812" height="52" rx="11" fill="#f0fdf4" stroke={GREEN} strokeWidth="2.3" />
        <M x="70" y="456" size={12.5} fill={GREEN} weight={800}>{"(?:\\d\\d\\d)-\\d\\d\\d\\d"}</M>
        <L x="300" y="456" size={11.5} fill={MUTED} anchor="start" weight={700}>a non-capturing group — parentheses for bundling only, flat list of strings restored</L>
      </g>
    </Scene>
  )
}

export function CharClassScene() {
  return (
    <Scene caption="A class matches exactly one character from the set">
      {[
        ['\\d', '0-9', BLUE],
        ['\\w', 'letter, digit or _', TEAL],
        ['\\s', 'space, tab, newline', PURP],
        ['\\D', 'anything but a digit', AMBER],
        ['\\W', 'anything but a word char', AMBER],
        ['\\S', 'anything but whitespace', AMBER],
      ].map(([cls, note, tone], i) => (
        <g key={cls} className={`pym-cell-in pym-delay-${i % 5}`}>
          <rect x={44 + (i % 3) * 274} y={62 + Math.floor(i / 3) * 96} width="252" height="80" rx="12" fill={WHITE} stroke={tone} strokeWidth="2.5" />
          <M x={70 + (i % 3) * 274} y={98 + Math.floor(i / 3) * 96} size={18} fill={tone} weight={800}>{cls}</M>
          <L x={70 + (i % 3) * 274} y={124 + Math.floor(i / 3) * 96} size={11.5} fill={MUTED} anchor="start" weight={700}>{note}</L>
        </g>
      ))}

      <g className="pym-slide-in pym-delay-3">
        <rect x="44" y="262" width="392" height="178" rx="12" fill={SKY} stroke={GREEN} strokeWidth="2.5" />
        <L x="240" y="292" size={13.5} fill={GREEN}>Make your own with [ ]</L>
        <M x="66" y="328" size={13}>[aeiouAEIOU]   any vowel</M>
        <M x="66" y="356" size={13}>[a-zA-Z0-9]    a range</M>
        <M x="66" y="384" size={13}>[^aeiou]       NOT a vowel</M>
        <M x="66" y="412" size={13} fill={GREEN} weight={800}>[.*+]  inside [ ], these are literal</M>
      </g>

      <g className="pym-cell-in pym-delay-4">
        <rect x="464" y="262" width="392" height="178" rx="12" fill="#fef2f2" stroke={RED} strokeWidth="2.5" />
        <L x="660" y="292" size={13.5} fill={RED}>One class is one character</L>
        <M x="486" y="328" size={13} fill={RED} weight={800}>\d matches '4', not '415'</M>
        <M x="486" y="360" size={13} fill={GREEN} weight={800}>\d+ or \d{'{'}3{'}'} matches '415'</M>
        <foreignObject x="486" y="374" width="352" height="60">
          <div xmlns="http://www.w3.org/1999/xhtml" style={{ font: '700 12px/1.35 system-ui,sans-serif', color: '#4f6076' }}>
            The class says which characters are allowed; the quantifier says how many
            of them. You nearly always need both.
          </div>
        </foreignObject>
      </g>
    </Scene>
  )
}

export function AnchorScene() {
  return (
    <Scene caption="Anchors turn a search into a validation">
      <g className="pym-slide-in">
        <rect x="44" y="58" width="812" height="118" rx="13" fill={WHITE} stroke={AMBER} strokeWidth="2.6" />
        <M x="70" y="92" size={14} fill={AMBER} weight={800}>{"r'\\d{3}'  — unanchored"}</M>
        <Ribbon x="70" y="140" text="order 415 shipped" from={6} to={9} tone={AMBER} pitch={15} size={15} label="found here" className="pym-probe" />
        <L x="834" y="162" size={11.5} fill={MUTED} anchor="end" weight={700}>matches anywhere inside</L>
      </g>

      <g className="pym-slide-in pym-delay-2">
        <rect x="44" y="196" width="812" height="118" rx="13" fill={WHITE} stroke={GREEN} strokeWidth="2.6" />
        <M x="70" y="230" size={14} fill={GREEN} weight={800}>{"r'^\\d{3}$'  — anchored both ends"}</M>
        <Ribbon x="70" y="278" text="order 415 shipped" from={-1} to={-1} pitch={15} size={15} />
        <Tag x="600" y="256" text="NO match" tone={RED} w={116} className="pym-fade-in pym-delay-2" />
        <Ribbon x="736" y="278" text="415" from={0} to={3} tone={GREEN} pitch={15} size={15} className="pym-fade-in pym-delay-3" />
      </g>

      <g className="pym-cell-in pym-delay-3">
        <rect x="44" y="334" width="392" height="120" rx="12" fill={SKY} stroke={BLUE} strokeWidth="2.5" />
        <L x="240" y="364" size={13.5} fill={BLUE}>^ start · $ end</L>
        <M x="66" y="400" size={12.5}>^Hello   must start with it</M>
        <M x="66" y="428" size={12.5}>world$   must end with it</M>
      </g>

      <g className="pym-cell-in pym-delay-4">
        <rect x="464" y="334" width="392" height="120" rx="12" fill="#fff4ec" stroke={RED} strokeWidth="2.5" />
        <L x="660" y="364" size={13.5} fill={RED}>The dot does not match \n</L>
        <M x="486" y="400" size={12.5} fill={RED} weight={800}>.  any character EXCEPT newline</M>
        <M x="486" y="428" size={12.5} fill={GREEN} weight={800}>re.DOTALL makes it match that too</M>
      </g>
    </Scene>
  )
}

export function FlagsSubScene() {
  return (
    <Scene caption="Flags change how the pattern is read; sub() returns a new string">
      <g className="pym-slide-in">
        <rect x="44" y="58" width="392" height="180" rx="13" fill={WHITE} stroke={BLUE} strokeWidth="2.6" />
        <L x="240" y="88" size={14} fill={BLUE}>The three flags worth knowing</L>
        {[
          ['re.IGNORECASE', 'RoboCop = robocop = ROBOCOP'],
          ['re.DOTALL', 'the dot now matches newlines'],
          ['re.VERBOSE', 'whitespace and # comments allowed'],
        ].map(([a, b], i) => (
          <g key={a} className={`pym-slide-in pym-delay-${i}`}>
            <M x="66" y={124 + i * 40} size={12.5} fill={BLUE} weight={800}>{a}</M>
            <L x="66" y={144 + i * 40} size={11.5} fill={MUTED} anchor="start" weight={700}>{b}</L>
          </g>
        ))}
        <M x="240" y="226" size={11.5} anchor="middle" fill={MUTED} weight={700}>combine with |  — re.IGNORECASE | re.DOTALL</M>
      </g>

      <g className="pym-slide-in pym-delay-2">
        <rect x="464" y="58" width="392" height="180" rx="13" fill={WHITE} stroke={GREEN} strokeWidth="2.6" />
        <L x="660" y="88" size={14} fill={GREEN}>sub() — replace every match</L>
        <rect x="486" y="106" width="348" height="34" rx="7" fill={SKY} stroke={BLUE} strokeWidth="1.8" />
        <M x="660" y="129" size="12" anchor="middle" weight={700}>Agent Alice gave Agent Bob the file.</M>
        <Wire d="M660 146 L660 172" stroke={GREEN} width="2.4" marker="url(#pyArrG)" className="pym-current" />
        <rect x="486" y="176" width="348" height="34" rx="7" fill="#f0fdf4" stroke={GREEN} strokeWidth="2.2" />
        <M x="660" y="199" size="12" anchor="middle" fill={GREEN} weight={800}>A**** gave B**** the file.</M>
        <M x="660" y="228" size={11.5} anchor="middle" fill={MUTED} weight={700}>{"sub(r'\\1****', text)  — \\1 is group 1"}</M>
      </g>

      <Code
        x="44"
        y="266"
        w="392"
        title="re.VERBOSE — the same pattern, readable"
        accent={PURP}
        className="pym-cell-in pym-delay-3"
        size={11.5}
        lines={["phone = re.compile(r'''(", '    (\\d{3}|\\(\\d{3}\\))?   # area code', "    (\\s|-|\\.)?            # separator", '    \\d{3}                 # first 3', "    (\\s|-|\\.)            # separator", '    \\d{4}                 # last 4', "    )''', re.VERBOSE)"]}
      />

      <g className="pym-cell-in pym-delay-4">
        <rect x="464" y="266" width="392" height="176" rx="12" fill="#fef2f2" stroke={RED} strokeWidth="2.5" />
        <L x="660" y="296" size={13.5} fill={RED}>sub() does not edit in place</L>
        <M x="486" y="332" size={13} fill={RED} weight={800}>regex.sub('x', text)</M>
        <L x="486" y="354" size={11.5} fill={MUTED} anchor="start" weight={700}>text is unchanged — str is immutable</L>
        <M x="486" y="390" size={13} fill={GREEN} weight={800}>text = regex.sub('x', text)</M>
        <L x="486" y="412" size={11.5} fill={MUTED} anchor="start" weight={700}>assign the result, like every str method</L>
      </g>
    </Scene>
  )
}

export function PathJoinScene() {
  return (
    <Scene caption="Let the library write the separator — your code should not know the OS">
      <g className="pym-slide-in">
        <rect x="44" y="58" width="812" height="130" rx="13" fill={WHITE} stroke={GREEN} strokeWidth="2.8" />
        <M x="70" y="94" size={14} fill={GREEN} weight={800}>os.path.join('usr', 'bin', 'spam')</M>
        {['usr', 'bin', 'spam'].map((p, i) => (
          <g key={p} className={`pym-merge-l pym-delay-${i}`}>
            <rect x={70 + i * 116} y="112" width="104" height="42" rx="8" fill={WHITE} stroke={GREEN} strokeWidth="2.2" />
            <M x={122 + i * 116} y="140" size={13} anchor="middle" weight={800}>{p}</M>
          </g>
        ))}
        <Wire d="M426 134 L486 134" stroke={GREEN} width="2.6" marker="url(#pyArrG)" className="pym-current" />
        <rect x="494" y="106" width="178" height="26" rx="6" fill={SKY} stroke={BLUE} strokeWidth="1.8" />
        <M x="583" y="124" size={12} anchor="middle" fill={BLUE} weight={800}>usr/bin/spam</M>
        <L x="583" y="146" size={10.5} fill={MUTED} weight={700}>macOS / Linux</L>
        <rect x="686" y="106" width="170" height="26" rx="6" fill="#fff4ec" stroke={AMBER} strokeWidth="1.8" />
        <M x="771" y="124" size={12} anchor="middle" fill={AMBER} weight={800}>{'usr\\bin\\spam'}</M>
        <L x="771" y="146" size={10.5} fill={MUTED} weight={700}>Windows</L>
        <L x="450" y="178" size={11.5} fill={MUTED} weight={700}>same source, correct separator on every machine that runs it</L>
      </g>

      <g className="pym-cell-in pym-delay-2">
        <rect x="44" y="210" width="392" height="230" rx="12" fill={SKY} stroke={BLUE} strokeWidth="2.5" />
        <L x="240" y="240" size={13.5} fill={BLUE}>Absolute vs relative</L>
        <M x="66" y="278" size={12.5} fill={BLUE} weight={800}>C:\\Users\\al\\spam.txt</M>
        <L x="66" y="298" size={11.5} fill={MUTED} anchor="start" weight={700}>absolute — starts at the root, unambiguous</L>
        <M x="66" y="334" size={12.5} fill={AMBER} weight={800}>spam.txt</M>
        <L x="66" y="354" size={11.5} fill={MUTED} anchor="start" weight={700}>relative — resolved against os.getcwd()</L>
        <M x="66" y="390" size={12.5}>.   this folder</M>
        <M x="66" y="416" size={12.5}>..  the parent folder</M>
      </g>

      <g className="pym-cell-in pym-delay-4">
        <rect x="464" y="210" width="392" height="230" rx="12" fill="#fef2f2" stroke={RED} strokeWidth="2.5" />
        <L x="660" y="240" size={13.5} fill={RED}>Two ways to break it</L>
        <M x="486" y="278" size={12.5} fill={RED} weight={800}>{"'usr' + '/' + 'bin'"}</M>
        <L x="486" y="298" size={11.5} fill={MUTED} anchor="start" weight={700}>hard-codes one platform's separator</L>
        <M x="486" y="334" size={12.5} fill={RED} weight={800}>{"open('C:\\\\new\\\\file')"}</M>
        <L x="486" y="354" size={11.5} fill={MUTED} anchor="start" weight={700}>{"\\n is a newline — use r'' or forward slashes"}</L>
        <M x="486" y="396" size={12.5} fill={GREEN} weight={800}>os.makedirs(path)</M>
        <L x="486" y="416" size={11.5} fill={MUTED} anchor="start" weight={700}>creates every missing folder on the way</L>
      </g>
    </Scene>
  )
}

export function OsPathPanelScene() {
  return (
    <Scene caption="Ask the filesystem before you touch it">
      <Panel
        x="44"
        y="58"
        w="392"
        title="Existence — always check first"
        accent={GREEN}
        className="pym-slide-in"
        mono
        rowH={34}
        rows={[['os.path.exists(p)', 'anything'], ['os.path.isfile(p)', 'a file'], ['os.path.isdir(p)', 'a folder']]}
      />
      <Panel
        x="464"
        y="58"
        w="392"
        title="Taking a path apart"
        accent={BLUE}
        className="pym-slide-in pym-delay-2"
        mono
        rowH={34}
        rows={[['os.path.basename(p)', 'spam.txt'], ['os.path.dirname(p)', 'C:\\Users\\al'], ['os.path.split(p)', 'both, as a tuple']]}
      />
      <Panel
        x="44"
        y="226"
        w="392"
        title="Size and contents"
        accent={PURP}
        className="pym-cell-in pym-delay-3"
        mono
        rowH={34}
        rows={[['os.path.getsize(p)', 'bytes, int'], ['os.listdir(p)', 'names, not paths'], ['os.getcwd()', 'where relative starts']]}
      />
      <g className="pym-cell-in pym-delay-4">
        <rect x="464" y="226" width="392" height="214" rx="12" fill="#fef2f2" stroke={RED} strokeWidth="2.5" />
        <L x="660" y="256" size={13.5} fill={RED}>listdir gives names only</L>
        <M x="486" y="292" size={12.5} fill={RED} weight={800}>for f in os.listdir(d):</M>
        <M x="486" y="316" size={12.5} fill={RED} weight={800}>    os.path.getsize(f)  ✗</M>
        <L x="486" y="340" size={11.5} fill={MUTED} anchor="start" weight={700}>resolved against the CWD, not d</L>
        <M x="486" y="378" size={12.5} fill={GREEN} weight={800}>    os.path.getsize(</M>
        <M x="486" y="402" size={12.5} fill={GREEN} weight={800}>        os.path.join(d, f))  ✓</M>
        <L x="660" y="430" size={11} fill={MUTED} weight={700}>rejoin every name with its folder</L>
      </g>
      <g className="pym-fade-in pym-delay-4">
        <rect x="44" y="396" width="392" height="44" rx="10" fill={SKY} stroke={BLUE} strokeWidth="2.2" />
        <M x="66" y="425" size="12" fill={BLUE} weight={800}>a check then an open is still a race</M>
        <L x="414" y="425" size={10.5} fill={MUTED} anchor="end" weight={700}>handle the error too</L>
      </g>
    </Scene>
  )
}

export function FileModeScene() {
  return (
    <Scene caption="Open, use, close — with does the closing for you, even on an exception">
      {[
        ["'r'", 'read', 'file must exist', BLUE],
        ["'w'", 'write', 'TRUNCATES to empty', RED],
        ["'a'", 'append', 'adds at the end', GREEN],
      ].map(([m, name, note, tone], i) => (
        <g key={m} className={`pym-cell-in pym-delay-${i}`}>
          <rect x={44 + i * 274} y="58" width="252" height="120" rx="12" fill={WHITE} stroke={tone} strokeWidth="2.8" />
          <M x={170 + i * 274} y="100" size={24} anchor="middle" fill={tone} weight={800}>{m}</M>
          <L x={170 + i * 274} y="128" size={13.5} fill={tone}>{name}</L>
          <L x={170 + i * 274} y="154" size={11.5} fill={MUTED} weight={700}>{note}</L>
        </g>
      ))}

      <Code
        x="44"
        y="202"
        w="392"
        title="the shape to always write"
        accent={GREEN}
        className="pym-slide-in pym-delay-3"
        lines={["with open(p, 'w') as f:", "    f.write('Hello\\n')", '# closed here, always', '', "with open(p) as f:", '    text = f.read()']}
      />

      <g className="pym-cell-in pym-delay-4">
        <rect x="464" y="202" width="392" height="238" rx="12" fill={SKY} stroke={PURP} strokeWidth="2.5" />
        <L x="660" y="232" size={13.5} fill={PURP}>Reading, three ways</L>
        {[
          ['f.read()', 'the whole file as one str'],
          ['f.readlines()', 'a list, newlines kept'],
          ['for line in f:', 'one line at a time, any size'],
        ].map(([a, b], i) => (
          <g key={a} className={`pym-slide-in pym-delay-${i}`}>
            <M x="486" y={272 + i * 46} size={13} fill={PURP} weight={800}>{a}</M>
            <L x="486" y={292 + i * 46} size={11.5} fill={MUTED} anchor="start" weight={700}>{b}</L>
          </g>
        ))}
        <rect x="486" y="382" width="348" height="44" rx="9" fill="#fef2f2" stroke={RED} strokeWidth="2.2" />
        <M x="660" y="410" size="12" anchor="middle" fill={RED} weight={800}>'w' silently destroys the old contents</M>
      </g>
      <g className="pym-fade-in pym-delay-4">
        <rect x="44" y="384" width="392" height="56" rx="11" fill="#fff4ec" stroke={AMBER} strokeWidth="2.2" />
        <M x="66" y="408" size="12" fill={AMBER} weight={800}>write() adds no newline</M>
        <L x="66" y="430" size={11} fill={MUTED} anchor="start" weight={700}>print() does; write() writes exactly what you gave it</L>
      </g>
    </Scene>
  )
}

export function ShelveScene() {
  return (
    <Scene caption="A dictionary that survives the program exiting">
      <g className="pym-slide-in">
        <rect x="44" y="60" width="330" height="170" rx="12" fill={WHITE} stroke={BLUE} strokeWidth="2.6" />
        <L x="209" y="90" size={13.5} fill={BLUE}>in memory, while running</L>
        {[["'cats'", "['Zophie']"], ["'count'", '3']].map(([k, v], i) => (
          <g key={k} className={`pym-cell-in pym-delay-${i}`}>
            <rect x="66" y={110 + i * 52} width="130" height="38" rx="8" fill={SKY} stroke={BLUE} strokeWidth="2" />
            <M x="131" y={134 + i * 52} size={12} anchor="middle" fill={BLUE} weight={800}>{k}</M>
            <rect x="210" y={110 + i * 52} width="142" height="38" rx="8" fill={WHITE} stroke={MUTED} strokeWidth="2" />
            <M x="281" y={134 + i * 52} size={12} anchor="middle" weight={700}>{v}</M>
          </g>
        ))}
        <L x="209" y="218" size={11} fill={RED} weight={800}>gone the moment the process ends</L>
      </g>

      <Wire d="M380 146 L470 146" stroke={GREEN} width="3" marker="url(#pyArrG)" className="pym-current" />
      <M x="425" y="132" size={11.5} anchor="middle" fill={GREEN} weight={800}>shelf['cats'] = ...</M>

      <g className="pym-slide-in pym-delay-2">
        <rect x="478" y="60" width="378" height="170" rx="12" fill="#f0fdf4" stroke={GREEN} strokeWidth="2.8" />
        <L x="667" y="90" size={13.5} fill={GREEN}>on disk, after it ends</L>
        <rect x="560" y="108" width="196" height="76" rx="10" fill={WHITE} stroke={GREEN} strokeWidth="2.4" className="pym-flux" />
        <M x="658" y="142" size={13} anchor="middle" fill={GREEN} weight={800}>mydata.db</M>
        <L x="658" y="166" size={11} fill={MUTED} weight={700}>binary — .bak/.dat/.dir on Windows</L>
        <L x="667" y="214" size={11} fill={MUTED} weight={700}>reopen tomorrow and the values are still there</L>
      </g>

      <Code
        x="44"
        y="258"
        w="392"
        title="open, use, closed for you"
        accent={GREEN}
        className="pym-cell-in pym-delay-3"
        size={12.5}
        lines={["with shelve.open('mydata') as shelf:", "    shelf['cats'] = ['Zophie']", '', '# tomorrow, a different run:', "with shelve.open('mydata') as shelf:", "    print(shelf['cats'])"]}
      />

      <g className="pym-cell-in pym-delay-4">
        <rect x="464" y="258" width="392" height="182" rx="12" fill="#fef2f2" stroke={RED} strokeWidth="2.5" />
        <L x="660" y="288" size={13.5} fill={RED}>Two things that bite</L>
        <M x="486" y="324" size={12.5} fill={RED} weight={800}>a bare open() with no close()</M>
        <L x="486" y="344" size={11.5} fill={MUTED} anchor="start" weight={700}>writes are buffered — the file can be empty or corrupt</L>
        <M x="486" y="380" size={12.5} fill={RED} weight={800}>{"shelf['x'].append(1)"}</M>
        <L x="486" y="400" size={11.5} fill={MUTED} anchor="start" weight={700}>mutates a temporary copy — read it out,</L>
        <L x="486" y="420" size={11.5} fill={MUTED} anchor="start" weight={700}>change it, then assign it back</L>
      </g>
    </Scene>
  )
}

export function PformatChoiceScene() {
  return (
    <TwoCaseScene
      caption="Both persist a variable — they persist it for different readers"
      left={{
        title: 'shelve — a binary store',
        points: [
          'Random access by key, like a dict',
          'Handles data far larger than memory',
          'Opaque: you cannot read the file',
          'Needs shelve to get anything back',
          'Right for program state that keeps changing',
        ],
      }}
      right={{
        title: 'pprint.pformat — a .py file',
        points: [
          'Writes a Python literal you can read',
          'Re-import it and the data is just there',
          'Diffable, greppable, editable by hand',
          'Whole thing is rewritten every save',
          'Right for configuration and fixtures',
        ],
      }}
    />
  )
}

/* ── Module 4 — classes and objects ─────────────────────────────── */

/** An object diagram: the class name on the header, one row per attribute.
 *  Every scene in this module is some arrangement of these boxes and the
 *  arrows between them. */
function Obj({ x, y, w = 220, cls, attrs = [], accent = BLUE, className = '', note }) {
  const X = n(x)
  const Y = n(y)
  const W = n(w)
  const h = 34 + attrs.length * 26 + (note ? 22 : 10)
  return (
    <g transform={`translate(${X},${Y})`}>
      <g className={className}>
        <rect width={W} height={h} rx="10" fill={WHITE} stroke={accent} strokeWidth="2.6" />
        <rect width={W} height="30" rx="10" fill={accent} />
        <rect y="20" width={W} height="10" fill={accent} />
        <M x={W / 2} y={21} size={12.5} anchor="middle" fill={WHITE} weight={800}>
          {cls}
        </M>
        {attrs.map(([k, v], i) => (
          <g key={k}>
            <M x={14} y={52 + i * 26} size={12} fill={accent} weight={800}>
              {k}
            </M>
            <M x={W - 14} y={52 + i * 26} size={12} anchor="end" fill={N} weight={700}>
              {v}
            </M>
          </g>
        ))}
        {note ? (
          <L x={W / 2} y={h - 8} size={10.5} fill={MUTED} weight={700}>
            {note}
          </L>
        ) : null}
      </g>
    </g>
  )
}

export function ClassTypeScene() {
  return (
    <Scene caption="class creates a type; calling the type creates an instance of it">
      <Code
        x="44"
        y="58"
        w="380"
        title="point.py"
        accent={BLUE}
        className="pym-slide-in"
        lines={['class Point:', '    """Represents a point', '       in 2-D space."""', '', 'blank = Point()', 'blank.x = 3.0', 'blank.y = 4.0']}
      />

      <g className="pym-cell-in pym-delay-2">
        <rect x="454" y="58" width="180" height="82" rx="12" fill={SKY} stroke={PURP} strokeWidth="2.8" />
        <M x="544" y="94" size={14} anchor="middle" fill={PURP} weight={800}>Point</M>
        <L x="544" y="120" size={11} fill={MUTED} weight={700}>the class — a type</L>
      </g>
      <Wire d="M638 100 L706 100" stroke={PURP} width="2.6" marker="url(#pyArrP)" className="pym-current" />
      <M x="672" y="86" size={11} anchor="middle" fill={PURP} weight={800}>Point()</M>

      <Obj x="710" y="58" w="146" cls="Point" attrs={[['x', '3.0'], ['y', '4.0']]} accent={GREEN} className="pym-cell-in pym-delay-3" note="an instance" />

      <g className="pym-cell-in pym-delay-4">
        <rect x="454" y="180" width="402" height="260" rx="12" fill={WHITE} stroke={TEAL} strokeWidth="2.5" />
        <L x="655" y="210" size={13.5} fill={TEAL}>What you actually created</L>
        {[
          ['a new type', 'type(blank) is Point, not dict'],
          ['a factory', 'Point() makes as many as you want'],
          ['a namespace', 'attributes live on the instance'],
          ['a name for the idea', 'the code now says what it models'],
        ].map(([a, b], i) => (
          <g key={a} className={`pym-slide-in pym-delay-${i}`}>
            <Dot cx={478} cy={248 + i * 48} r={5.5} fill={TEAL} />
            <M x="494" y={244 + i * 48} size={12.5} fill={TEAL} weight={800}>{a}</M>
            <L x="494" y={264 + i * 48} size={11.5} fill={MUTED} anchor="start" weight={700}>{b}</L>
          </g>
        ))}
      </g>

      <g className="pym-fade-in pym-delay-4">
        <rect x="44" y="266" width="380" height="174" rx="12" fill="#fff4ec" stroke={AMBER} strokeWidth="2.4" />
        <L x="234" y="296" size={13.5} fill={AMBER}>Class vs instance</L>
        <M x="66" y="332" size={13} fill={PURP} weight={800}>Point</M>
        <L x="180" y="332" size={11.5} fill={MUTED} anchor="start" weight={700}>the blueprint — one of these</L>
        <M x="66" y="366" size={13} fill={GREEN} weight={800}>Point()</M>
        <L x="180" y="366" size={11.5} fill={MUTED} anchor="start" weight={700}>a new object — as many as you like</L>
        <M x="66" y="404" size={12.5} fill={RED} weight={800}>p = Point</M>
        <L x="180" y="404" size={11.5} fill={MUTED} anchor="start" weight={700}>no brackets — p is the class itself</L>
      </g>
    </Scene>
  )
}

export function AttrTypoScene() {
  return (
    <Scene caption="Assignment creates an attribute; a typo creates a second one, silently">
      <Obj x="60" y="70" w="250" cls="Point instance" attrs={[['x', '3.0'], ['y', '4.0']]} accent={GREEN} className="pym-slide-in" note="what you meant" />
      <Wire d="M320 130 L392 130" stroke={RED} width="2.6" marker="url(#pyArrR)" className="pym-current" />
      <M x="356" y="116" size={11.5} anchor="middle" fill={RED} weight={800}>p.Y = 9</M>
      <Obj
        x="400"
        y="70"
        w="250"
        cls="Point instance"
        attrs={[['x', '3.0'], ['y', '4.0'], ['Y', '9   ← new'], ]}
        accent={RED}
        className="pym-insert pym-delay-1"
        note="what you got — no error"
      />

      <g className="pym-cell-in pym-delay-3">
        <rect x="44" y="230" width="392" height="210" rx="12" fill="#fef2f2" stroke={RED} strokeWidth="2.5" />
        <L x="240" y="260" size={13.5} fill={RED}>Why it is so hard to find</L>
        <foreignObject x="66" y="276" width="348" height="150">
          <div xmlns="http://www.w3.org/1999/xhtml" style={{ font: '700 12.5px/1.45 system-ui,sans-serif', color: '#4f6076' }}>
            Reading <b>p.Y</b> before assigning it raises AttributeError, which is easy.
            Writing <b>p.Y</b> succeeds, so the program keeps running with the real
            value untouched and a spare attribute nobody reads. The failure shows up
            somewhere else entirely, much later.
          </div>
        </foreignObject>
      </g>

      <Panel
        x="464"
        y="230"
        w="392"
        title="Inspect the object, do not guess"
        accent={BLUE}
        className="pym-cell-in pym-delay-4"
        mono
        rowH={34}
        rows={[['vars(p)', 'the attribute dict'], ['hasattr(p, "y")', 'True or False'], ['getattr(p, "y", 0)', 'with a default'], ['p.__dict__', 'the same dict, directly']]}
      />
    </Scene>
  )
}

export function CompositionScene() {
  return (
    <Scene caption="An attribute may itself be an object — that is composition">
      <Obj x="60" y="80" w="260" cls="Rectangle" attrs={[['width', '100.0'], ['height', '200.0'], ['corner', '→'], ]} accent={BLUE} className="pym-slide-in" />
      <Wire d="M330 168 L420 168" stroke={BLUE} width="2.6" marker="url(#pyArrB)" className="pym-current" />
      <Obj x="428" y="120" w="220" cls="Point" attrs={[['x', '0.0'], ['y', '0.0']]} accent={GREEN} className="pym-cell-in pym-delay-2" note="embedded object" />

      <M x="60" y="290" size={14} fill={BLUE} weight={800}>box.corner.x</M>
      <Wire d="M70 302 L200 302" stroke={MUTED} width="2" dash="4 5" />
      <L x="230" y="294" size={11.5} fill={MUTED} anchor="start" weight={700}>read left to right: box → its corner → that point's x</L>

      <g className="pym-cell-in pym-delay-3">
        <rect x="44" y="322" width="392" height="120" rx="12" fill={SKY} stroke={PURP} strokeWidth="2.5" />
        <L x="240" y="352" size={13.5} fill={PURP}>Two ways to model the same box</L>
        <M x="66" y="388" size={12.5} fill={PURP} weight={800}>corner + width + height</M>
        <L x="66" y="408" size={11} fill={MUTED} anchor="start" weight={700}>easy to move, easy to resize</L>
        <M x="66" y="432" size={12.5} fill={PURP} weight={800}>two opposite corners</M>
      </g>

      <g className="pym-cell-in pym-delay-4">
        <rect x="464" y="322" width="392" height="120" rx="12" fill="#fef2f2" stroke={RED} strokeWidth="2.5" />
        <L x="660" y="352" size={13.5} fill={RED}>The chain is not free</L>
        <M x="486" y="388" size={12.5} fill={RED} weight={800}>box.corner is None</M>
        <L x="486" y="410" size={11.5} fill={MUTED} anchor="start" weight={700}>then box.corner.x raises AttributeError</L>
        <L x="486" y="432" size={11.5} fill={MUTED} anchor="start" weight={700}>make __init__ guarantee every link exists</L>
      </g>

      <g className="pym-fade-in pym-delay-4">
        <rect x="676" y="80" width="180" height="120" rx="12" fill="#f0fdf4" stroke={GREEN} strokeWidth="2.4" />
        <L x="766" y="110" size={12.5} fill={GREEN}>has-a</L>
        <foreignObject x="694" y="122" width="146" height="72">
          <div xmlns="http://www.w3.org/1999/xhtml" style={{ font: '700 11.5px/1.35 system-ui,sans-serif', color: '#4f6076', textAlign: 'center' }}>
            A Rectangle has a Point. It is not a kind of Point.
          </div>
        </foreignObject>
      </g>
      <g className="pym-fade-in pym-delay-4">
        <rect x="676" y="212" width="180" height="88" rx="12" fill={WHITE} stroke={MUTED} strokeWidth="2.2" />
        <M x="766" y="244" size={12} anchor="middle" fill={MUTED} weight={800}>deep chains</M>
        <L x="766" y="268" size={11} fill={MUTED} weight={700}>a.b.c.d.e means</L>
        <L x="766" y="286" size={11} fill={MUTED} weight={700}>five things can be None</L>
      </g>
    </Scene>
  )
}

export function ReturnObjectScene() {
  return (
    <Scene caption="A function that returns an object composes with the next one">
      <Code
        x="44"
        y="58"
        w="400"
        title="find_center.py"
        accent={BLUE}
        className="pym-slide-in"
        lines={['def find_center(rect):', '    p = Point()', '    p.x = rect.corner.x + rect.width/2', '    p.y = rect.corner.y + rect.height/2', '    return p', '', 'c = find_center(box)', 'print(c.x, c.y)']}
      />

      <Obj x="480" y="58" w="180" cls="Rectangle" attrs={[['width', '100'], ['height', '200']]} accent={MUTED} className="pym-cell-in pym-delay-1" />
      <Wire d="M572 148 L572 190" stroke={BLUE} width="2.6" marker="url(#pyArrB)" className="pym-current pym-delay-1" />
      <g className="pym-flux pym-delay-2">
        <rect x="480" y="196" width="180" height="52" rx="11" fill={SKY} stroke={BLUE} strokeWidth="2.6" />
        <M x="570" y="228" size="12.5" anchor="middle" fill={BLUE} weight={800}>find_center()</M>
      </g>
      <Wire d="M572 252 L572 292" stroke={GREEN} width="2.6" marker="url(#pyArrG)" className="pym-current pym-delay-2" />
      <Obj x="480" y="298" w="180" cls="Point" attrs={[['x', '50.0'], ['y', '100.0']]} accent={GREEN} className="pym-emerge pym-delay-3" note="a NEW object" />

      <g className="pym-cell-in pym-delay-4">
        <rect x="688" y="58" width="168" height="190" rx="12" fill="#f0fdf4" stroke={GREEN} strokeWidth="2.5" />
        <L x="772" y="88" size={13} fill={GREEN}>It composes</L>
        <M x="706" y="124" size="11.5" fill={GREEN} weight={800}>distance(</M>
        <M x="714" y="148" size="11.5" fill={GREEN} weight={800}>find_center(a),</M>
        <M x="714" y="172" size="11.5" fill={GREEN} weight={800}>find_center(b))</M>
        <L x="772" y="208" size={11} fill={MUTED} weight={700}>the result is a</L>
        <L x="772" y="226" size={11} fill={MUTED} weight={700}>first-class value</L>
      </g>

      <g className="pym-cell-in pym-delay-4">
        <rect x="688" y="260" width="168" height="180" rx="12" fill="#fef2f2" stroke={RED} strokeWidth="2.4" />
        <L x="772" y="290" size={12.5} fill={RED}>Do not print it</L>
        <foreignObject x="704" y="302" width="138" height="126">
          <div xmlns="http://www.w3.org/1999/xhtml" style={{ font: '700 11.5px/1.4 system-ui,sans-serif', color: '#4f6076' }}>
            A function that prints the centre gives the caller nothing to work with.
            Return the object; let the caller decide whether to show it.
          </div>
        </foreignObject>
      </g>
      <g className="pym-fade-in pym-delay-4">
        <rect x="44" y="286" width="400" height="154" rx="12" fill="#fff4ec" stroke={AMBER} strokeWidth="2.4" />
        <L x="244" y="316" size={13} fill={AMBER}>Every local name is thrown away</L>
        <foreignObject x="66" y="328" width="360" height="104">
          <div xmlns="http://www.w3.org/1999/xhtml" style={{ font: '700 12px/1.4 system-ui,sans-serif', color: '#4f6076' }}>
            The name <b>p</b> vanishes when the call ends — but the object it pointed at
            does not, because <b>return</b> handed it to the caller, who bound it to
            <b> c</b>. Objects outlive the names that made them.
          </div>
        </foreignObject>
      </g>
    </Scene>
  )
}

export function ObjectMutationScene() {
  return (
    <Scene caption="Pass an object to a function and the function can change your copy — there is only one">
      <Code
        x="44"
        y="58"
        w="400"
        title="grow.py"
        accent={AMBER}
        className="pym-slide-in"
        lines={['def grow(rect, dw, dh):', '    rect.width += dw', '    rect.height += dh', '', 'grow(box, 50, 100)', 'print(box.width)   # 150.0']}
      />

      <rect x="60" y="222" width="104" height="34" rx="17" fill={WHITE} stroke={BLUE} strokeWidth="2.4" />
      <M x="112" y="245" size={13} anchor="middle" fill={BLUE} weight={800}>box</M>
      <rect x="60" y="284" width="104" height="34" rx="17" fill={WHITE} stroke={AMBER} strokeWidth="2.4" />
      <M x="112" y="307" size={13} anchor="middle" fill={AMBER} weight={800}>rect</M>
      <L x="112" y="340" size={10.5} fill={MUTED} weight={700}>the parameter</L>

      <Wire d="M170 238 L262 258" stroke={BLUE} width="2.4" marker="url(#pyArrB)" className="pym-current" />
      <Wire d="M170 300 L262 280" stroke={AMBER} width="2.4" marker="url(#pyArrA)" className="pym-current pym-delay-1" />

      <Obj x="270" y="230" w="200" cls="ONE Rectangle" attrs={[['width', '150.0'], ['height', '300.0']]} accent={RED} className="pym-pulse pym-delay-2" note="both names, one object" />

      <g className="pym-cell-in pym-delay-3">
        <rect x="490" y="58" width="366" height="176" rx="12" fill={SKY} stroke={BLUE} strokeWidth="2.5" />
        <L x="673" y="88" size={13.5} fill={BLUE}>Python never copies on call</L>
        <foreignObject x="512" y="102" width="324" height="122">
          <div xmlns="http://www.w3.org/1999/xhtml" style={{ font: '700 12.5px/1.4 system-ui,sans-serif', color: '#4f6076' }}>
            Passing an argument binds a second name to the same object. For an int or a
            str that is invisible, because you cannot change them. For a list, a dict
            or an instance, every change the function makes is visible to the caller.
          </div>
        </foreignObject>
      </g>

      <g className="pym-cell-in pym-delay-4">
        <rect x="490" y="256" width="366" height="184" rx="12" fill={WHITE} stroke={GREEN} strokeWidth="2.5" />
        <L x="673" y="286" size={13.5} fill={GREEN}>Say which one you wrote</L>
        <M x="512" y="322" size={12.5} fill={AMBER} weight={800}>def grow(rect, dw, dh):</M>
        <L x="512" y="342" size={11.5} fill={MUTED} anchor="start" weight={700}>modifier — changes the caller's object, returns None</L>
        <M x="512" y="382" size={12.5} fill={GREEN} weight={800}>def grown(rect, dw, dh):</M>
        <L x="512" y="402" size={11.5} fill={MUTED} anchor="start" weight={700}>pure — builds and returns a new Rectangle</L>
        <L x="673" y="428" size={11} fill={MUTED} weight={700}>the docstring must say which; the name should hint</L>
      </g>
    </Scene>
  )
}

export function ObjectCopyScene() {
  return (
    <Scene caption="copy.copy duplicates the object; copy.deepcopy duplicates what it points at too">
      <g className="pym-slide-in">
        <rect x="44" y="56" width="812" height="168" rx="13" fill="#fff4ec" stroke={AMBER} strokeWidth="2.6" />
        <M x="70" y="90" size={14} fill={AMBER} weight={800}>b2 = copy.copy(box)   — shallow</M>
        <Obj x="70" y="104" w="180" cls="Rectangle b" attrs={[['corner', '→']]} accent={AMBER} />
        <Obj x="280" y="104" w="180" cls="Rectangle b2" attrs={[['corner', '→']]} accent={AMBER} />
        <Wire d="M254 140 L560 150" stroke={AMBER} width="2.2" marker="url(#pyArrA)" className="pym-current" />
        <Wire d="M464 140 L560 154" stroke={AMBER} width="2.2" marker="url(#pyArrA)" className="pym-current pym-delay-1" />
        <Obj x="566" y="122" w="180" cls="ONE Point" attrs={[['x', '0.0']]} accent={RED} className="pym-pulse" />
        <L x="800" y="196" size={11} fill={RED} anchor="end" weight={800}>moving b2 moves b</L>
      </g>

      <g className="pym-slide-in pym-delay-2">
        <rect x="44" y="244" width="812" height="168" rx="13" fill="#f0fdf4" stroke={GREEN} strokeWidth="2.6" />
        <M x="70" y="278" size={14} fill={GREEN} weight={800}>b3 = copy.deepcopy(box)   — deep</M>
        <Obj x="70" y="292" w="180" cls="Rectangle b" attrs={[['corner', '→']]} accent={GREEN} />
        <Obj x="280" y="292" w="180" cls="Rectangle b3" attrs={[['corner', '→']]} accent={GREEN} />
        <Wire d="M254 328 L552 320" stroke={GREEN} width="2.2" marker="url(#pyArrG)" className="pym-current" />
        <Wire d="M464 328 L552 372" stroke={GREEN} width="2.2" marker="url(#pyArrG)" className="pym-current pym-delay-1" />
        <Obj x="558" y="290" w="150" cls="Point" attrs={[['x', '0.0']]} accent={GREEN} />
        <Obj x="722" y="344" w="130" cls="Point copy" attrs={[['x', '0.0']]} accent={GREEN} />
        <L x="800" y="404" size={11} fill={GREEN} anchor="end" weight={800}>fully independent</L>
      </g>

      <g className="pym-fade-in pym-delay-4">
        <rect x="44" y="428" width="812" height="46" rx="10" fill={SKY} stroke={BLUE} strokeWidth="2.2" />
        <M x="70" y="458" size={12.5} fill={BLUE} weight={800}>b is b2 → False</M>
        <L x="240" y="458" size={11.5} fill={MUTED} anchor="start" weight={700}>different objects — but b.corner is b2.corner is True after a shallow copy</L>
      </g>
    </Scene>
  )
}

export function TimeCanonicalScene() {
  return (
    <Scene caption="Every operation must leave the object in a form it knows how to read">
      <Obj x="60" y="70" w="230" cls="Time" attrs={[['hour', '11'], ['minute', '59'], ['second', '30']]} accent={BLUE} className="pym-slide-in" note="canonical" />
      <Wire d="M300 150 L378 150" stroke={AMBER} width="2.6" marker="url(#pyArrA)" className="pym-current" />
      <M x="339" y="136" size={11} anchor="middle" fill={AMBER} weight={800}>+ 40 s</M>
      <Obj x="386" y="70" w="230" cls="Time" attrs={[['hour', '11'], ['minute', '59'], ['second', '70  ✗']]} accent={RED} className="pym-cell-in pym-delay-2" note="NOT canonical" />
      <Wire d="M626 150 L704 150" stroke={GREEN} width="2.6" marker="url(#pyArrG)" className="pym-current pym-delay-2" />
      <M x="665" y="136" size={11} anchor="middle" fill={GREEN} weight={800}>carry</M>
      <Obj x="712" y="70" w="144" cls="Time" attrs={[['hour', '12'], ['minute', '0'], ['second', '10']]} accent={GREEN} className="pym-emerge pym-delay-3" note="fixed" />

      <g className="pym-cell-in pym-delay-3">
        <rect x="44" y="246" width="392" height="194" rx="12" fill={SKY} stroke={PURP} strokeWidth="2.5" />
        <L x="240" y="276" size={13.5} fill={PURP}>The invariant, stated</L>
        <M x="66" y="314" size={13} fill={PURP} weight={800}>0 ≤ minute &lt; 60</M>
        <M x="66" y="342" size={13} fill={PURP} weight={800}>0 ≤ second &lt; 60</M>
        <foreignObject x="66" y="356" width="348" height="76">
          <div xmlns="http://www.w3.org/1999/xhtml" style={{ font: '700 12px/1.4 system-ui,sans-serif', color: '#4f6076' }}>
            Write it down, then write <b>valid_time(t)</b> that asserts it. An invariant
            you only hold in your head is one you will break.
          </div>
        </foreignObject>
      </g>

      <g className="pym-cell-in pym-delay-4">
        <rect x="464" y="246" width="392" height="194" rx="12" fill="#f0fdf4" stroke={GREEN} strokeWidth="2.5" />
        <L x="660" y="276" size={13.5} fill={GREEN}>The trick that removes the problem</L>
        <M x="486" y="314" size={12.5} fill={GREEN} weight={800}>time_to_int(t) → seconds</M>
        <M x="486" y="342" size={12.5} fill={GREEN} weight={800}>do the arithmetic on one int</M>
        <M x="486" y="370" size={12.5} fill={GREEN} weight={800}>int_to_time(n) → Time</M>
        <foreignObject x="486" y="382" width="352" height="54">
          <div xmlns="http://www.w3.org/1999/xhtml" style={{ font: '700 12px/1.4 system-ui,sans-serif', color: '#4f6076' }}>
            One number cannot be non-canonical, so the carry problem cannot occur.
          </div>
        </foreignObject>
      </g>
    </Scene>
  )
}

export function PureBoundaryScene() {
  return (
    <Scene caption="Nothing crosses the boundary except the arguments in and the value out">
      <rect x="250" y="120" width="400" height="220" rx="18" fill={SKY} stroke={GREEN} strokeWidth="3" className="pym-flux" />
      <L x="450" y="162" size={16} fill={GREEN}>pure function</L>
      <M x="450" y="200" size={13} anchor="middle" fill={GREEN} weight={800}>add_time(t1, t2)</M>
      <foreignObject x="282" y="216" width="336" height="106">
        <div xmlns="http://www.w3.org/1999/xhtml" style={{ font: '700 12.5px/1.45 system-ui,sans-serif', color: '#4f6076', textAlign: 'center' }}>
          reads its arguments · touches no global · prints nothing · writes no file ·
          builds and returns a new object
        </div>
      </foreignObject>

      <g className="pym-slide-in">
        <rect x="44" y="150" width="168" height="52" rx="10" fill={WHITE} stroke={BLUE} strokeWidth="2.4" />
        <M x="128" y="182" size={13} anchor="middle" fill={BLUE} weight={800}>t1</M>
      </g>
      <g className="pym-slide-in pym-delay-1">
        <rect x="44" y="222" width="168" height="52" rx="10" fill={WHITE} stroke={BLUE} strokeWidth="2.4" />
        <M x="128" y="254" size={13} anchor="middle" fill={BLUE} weight={800}>t2</M>
      </g>
      <Wire d="M216 176 L246 200" stroke={BLUE} width="2.4" marker="url(#pyArrB)" className="pym-current" />
      <Wire d="M216 248 L246 226" stroke={BLUE} width="2.4" marker="url(#pyArrB)" className="pym-current pym-delay-1" />

      <Wire d="M654 230 L698 230" stroke={GREEN} width="3" marker="url(#pyArrG)" className="pym-current pym-delay-2" />
      <Obj x="706" y="186" w="150" cls="new Time" attrs={[['hour', '1'], ['minute', '20']]} accent={GREEN} className="pym-emerge pym-delay-3" />

      <g className="pym-cell-in pym-delay-4">
        <rect x="44" y="330" width="392" height="110" rx="12" fill="#fef2f2" stroke={RED} strokeWidth="2.4" />
        <L x="240" y="360" size={13} fill={RED}>What would break purity</L>
        <M x="66" y="396" size={12} fill={RED} weight={800}>t1.hour += 1    print(...)    open(...)</M>
        <L x="240" y="424" size={11.5} fill={MUTED} weight={700}>any of these and the caller can no longer predict it</L>
      </g>
      <g className="pym-cell-in pym-delay-4">
        <rect x="464" y="358" width="392" height="82" rx="12" fill="#f0fdf4" stroke={GREEN} strokeWidth="2.4" />
        <L x="660" y="388" size={13} fill={GREEN}>Why it is worth the extra object</L>
        <L x="660" y="416" size={11.5} fill={MUTED} weight={700}>testable with one assert · reorderable · safe to call twice</L>
      </g>
    </Scene>
  )
}

export function ModifierCompareScene() {
  return (
    <TwoCaseScene
      caption="Both are legitimate; the contract must say which one you wrote"
      left={{
        title: 'Modifier — changes the argument',
        points: [
          'increment(t, 40) edits t in place',
          'Returns None, by convention',
          'Caller sees the change immediately',
          'Cheap: no new object is allocated',
          'Harder to test and to reason about',
        ],
      }}
      right={{
        title: 'Pure — returns a new object',
        points: [
          'incremented(t, 40) leaves t alone',
          'Returns the new Time',
          'Caller must assign the result',
          'Allocates, and that is usually fine',
          'One assert per call is a complete test',
        ],
      }}
    />
  )
}

export function PrototypePlanScene() {
  return (
    <Scene caption="Prototype to learn the problem; plan once you understand it">
      <g className="pym-slide-in">
        <rect x="44" y="58" width="812" height="164" rx="13" fill="#fff4ec" stroke={AMBER} strokeWidth="2.6" />
        <L x="450" y="88" size={14.5} fill={AMBER}>Prototype and patch</L>
        {['write it', 'find a case it fails', 'add a special case', 'find another', 'patch again'].map((t, i) => (
          <g key={t} className={`pym-slide-in pym-delay-${i}`}>
            <rect x={70 + i * 158} y="110" width="142" height="52" rx="10" fill={WHITE} stroke={AMBER} strokeWidth="2.2" />
            <L x={141 + i * 158} y="141" size={11.5} fill={AMBER} weight={800}>{t}</L>
            {i < 4 ? (
              <Wire d={`M${212 + i * 158} 136 L${226 + i * 158} 136`} stroke={AMBER} width="2.2" marker="url(#pyArrA)" className={`pym-current pym-delay-${i}`} />
            ) : null}
          </g>
        ))}
        <Wire d="M776 168 L110 168 L110 140" stroke={AMBER} width="2.2" dash="6 6" marker="url(#pyArrA)" className="pym-feedback" />
        <L x="450" y="204" size={11.5} fill={MUTED} weight={700}>fast to a first answer — the code gets harder to read with every patch</L>
      </g>

      <g className="pym-slide-in pym-delay-2">
        <rect x="44" y="242" width="812" height="164" rx="13" fill="#f0fdf4" stroke={GREEN} strokeWidth="2.6" />
        <L x="450" y="272" size={14.5} fill={GREEN}>Designed development</L>
        {['understand the problem', 'find the right representation', 'write the simple code', 'no special cases left'].map((t, i) => (
          <g key={t} className={`pym-slide-in pym-delay-${i}`}>
            <rect x={70 + i * 198} y="294" width="182" height="52" rx="10" fill={WHITE} stroke={GREEN} strokeWidth="2.2" />
            <L x={161 + i * 198} y="325" size={11.5} fill={GREEN} weight={800}>{t}</L>
            {i < 3 ? <Wire d={`M256 320 L${262 + i * 198} 320`} stroke={GREEN} width="2.2" marker="url(#pyArrG)" className={`pym-current pym-delay-${i}`} /> : null}
          </g>
        ))}
        <M x="450" y="378" size={12.5} anchor="middle" fill={GREEN} weight={800}>Time as seconds-since-midnight makes the carry problem disappear</M>
      </g>

      <g className="pym-cell-in pym-delay-4">
        <rect x="44" y="424" width="812" height="50" rx="11" fill={SKY} stroke={BLUE} strokeWidth="2.2" />
        <L x="450" y="455" size={12.5} fill={BLUE}>You usually need both: prototype to discover the representation, then rewrite around it</L>
      </g>
    </Scene>
  )
}

export function SelfBindingScene() {
  return (
    <Scene caption="t.print_time() is Time.print_time(t) — self is not magic, it is the first argument">
      <Code
        x="44"
        y="58"
        w="400"
        title="Time.py"
        accent={BLUE}
        className="pym-slide-in"
        lines={['class Time:', '    def print_time(self):', "        print(f'{self.hour}:{self.minute}')", '', 't = Time()', 't.print_time()']}
      />

      <g className="pym-slide-in pym-delay-2">
        <rect x="474" y="58" width="382" height="150" rx="13" fill={SKY} stroke={PURP} strokeWidth="2.6" />
        <L x="665" y="88" size={14} fill={PURP}>The translation</L>
        <M x="496" y="126" size={14} fill={PURP} weight={800}>t.print_time()</M>
        <Wire d="M665 138 L665 160" stroke={PURP} width="2.4" marker="url(#pyArrP)" className="pym-current" />
        <M x="496" y="186" size={14} fill={PURP} weight={800}>Time.print_time(t)</M>
      </g>

      <rect x="474" y="230" width="176" height="36" rx="18" fill={WHITE} stroke={GREEN} strokeWidth="2.4" />
      <M x="562" y="254" size={13} anchor="middle" fill={GREEN} weight={800}>t</M>
      <Wire d="M654 248 L716 248" stroke={GREEN} width="2.4" marker="url(#pyArrG)" className="pym-current pym-delay-1" />
      <rect x="720" y="230" width="136" height="36" rx="18" fill="#f0fdf4" stroke={GREEN} strokeWidth="2.4" className="pym-pulse" />
      <M x="788" y="254" size={13} anchor="middle" fill={GREEN} weight={800}>self</M>
      <L x="665" y="288" size={11.5} fill={MUTED} weight={700}>the object before the dot is passed in as the first parameter</L>

      <g className="pym-cell-in pym-delay-3">
        <rect x="44" y="284" width="400" height="156" rx="12" fill={WHITE} stroke={TEAL} strokeWidth="2.5" />
        <L x="244" y="314" size={13.5} fill={TEAL}>Why put it in the class at all</L>
        {['the behaviour travels with the data', 'the call reads as subject.verb()', 'two classes can share one method name'].map((t, i) => (
          <g key={t}>
            <Dot cx={68} cy={348 + i * 32} r={5} fill={TEAL} />
            <L x="84" y={352 + i * 32} size={12} anchor="start" weight={700}>{t}</L>
          </g>
        ))}
      </g>

      <g className="pym-cell-in pym-delay-4">
        <rect x="474" y="310" width="382" height="130" rx="12" fill="#fef2f2" stroke={RED} strokeWidth="2.4" />
        <L x="665" y="340" size={13} fill={RED}>Forgetting self in the def</L>
        <M x="496" y="376" size={12.5} fill={RED} weight={800}>def print_time():</M>
        <L x="496" y="398" size={11.5} fill={MUTED} anchor="start" weight={700}>TypeError: takes 0 positional arguments</L>
        <L x="496" y="420" size={11.5} fill={MUTED} anchor="start" weight={700}>but 1 was given — the object was still passed</L>
      </g>
    </Scene>
  )
}

export function InitStateScene() {
  return (
    <Scene caption="__init__ runs the moment the object exists, so no caller can forget a field">
      <Wire d="M132 96 L132 400" stroke={MUTED} width="2.4" dash="5 6" />
      {[
        ['Time()', 'the object is allocated', BLUE, 118],
        ['__init__(self, …)', 'runs automatically, now', PURP, 198],
        ['defaults applied', 'hour=0, minute=0, second=0', GREEN, 278],
        ['returned to the caller', 'already valid — always', GREEN, 358],
      ].map(([a, b, tone, y], i) => (
        <g key={a} className={`pym-slide-in pym-delay-${i}`}>
          <circle cx="132" cy={y} r="13" fill={tone} />
          <L x="132" y={y + 5} size={11.5} fill={WHITE}>{i + 1}</L>
          <M x="166" y={y - 2} size={13} fill={tone} weight={800}>{a}</M>
          <L x="166" y={y + 18} size={11.5} fill={MUTED} anchor="start" weight={700}>{b}</L>
        </g>
      ))}

      <Code
        x="474"
        y="58"
        w="382"
        title="Time with defaults"
        accent={PURP}
        className="pym-slide-in pym-delay-2"
        size={12.5}
        lines={['class Time:', '    def __init__(self, hour=0,', '                 minute=0, second=0):', '        self.hour = hour', '        self.minute = minute', '        self.second = second']}
      />

      <g className="pym-cell-in pym-delay-4">
        <rect x="474" y="248" width="382" height="94" rx="12" fill="#f0fdf4" stroke={GREEN} strokeWidth="2.4" />
        <M x="496" y="282" size={12.5} fill={GREEN} weight={800}>Time()           → 0:0:0</M>
        <M x="496" y="312" size={12.5} fill={GREEN} weight={800}>Time(9, 45)      → 9:45:0</M>
      </g>

      <g className="pym-cell-in pym-delay-4">
        <rect x="474" y="356" width="382" height="84" rx="12" fill="#fef2f2" stroke={RED} strokeWidth="2.4" />
        <M x="496" y="388" size={12.5} fill={RED} weight={800}>def __init__(self, tags=[]):</M>
        <L x="496" y="412" size={11.5} fill={MUTED} anchor="start" weight={700}>one list, shared by every instance ever made</L>
        <L x="496" y="432" size={11.5} fill={GREEN} anchor="start" weight={800}>use None and build the list inside</L>
      </g>
    </Scene>
  )
}

export function StrMethodScene() {
  return (
    <Scene caption="__str__ is what print() shows; without it you get the memory address">
      <g className="pym-slide-in">
        <rect x="44" y="58" width="392" height="180" rx="13" fill="#fef2f2" stroke={RED} strokeWidth="2.6" />
        <L x="240" y="88" size={14} fill={RED}>no __str__</L>
        <M x="66" y="126" size={13}>print(t)</M>
        <Wire d="M240 140 L240 170" stroke={RED} width="2.4" marker="url(#pyArrR)" className="pym-current" />
        <rect x="66" y="176" width="348" height="40" rx="8" fill={WHITE} stroke={RED} strokeWidth="2.2" />
        <M x="240" y="202" size={11.5} anchor="middle" fill={RED} weight={800}>{'<__main__.Time object at 0x7f4a…>'}</M>
        <L x="240" y="232" size={11} fill={MUTED} weight={700}>true, and useless</L>
      </g>

      <g className="pym-slide-in pym-delay-2">
        <rect x="464" y="58" width="392" height="180" rx="13" fill="#f0fdf4" stroke={GREEN} strokeWidth="2.6" />
        <L x="660" y="88" size={14} fill={GREEN}>with __str__</L>
        <M x="486" y="126" size={13}>print(t)</M>
        <Wire d="M660 140 L660 170" stroke={GREEN} width="2.4" marker="url(#pyArrG)" className="pym-current pym-delay-1" />
        <rect x="486" y="176" width="348" height="40" rx="8" fill={WHITE} stroke={GREEN} strokeWidth="2.4" />
        <M x="660" y="202" size={15} anchor="middle" fill={GREEN} weight={800}>09:45:00</M>
        <L x="660" y="232" size={11} fill={MUTED} weight={700}>the state, in a form a human reads</L>
      </g>

      <Code
        x="44"
        y="262"
        w="392"
        title="define it once"
        accent={GREEN}
        className="pym-cell-in pym-delay-3"
        size={12.5}
        lines={['def __str__(self):', "    return f'{self.hour:02d}:'\\", "           f'{self.minute:02d}:'\\", "           f'{self.second:02d}'"]}
      />

      <g className="pym-cell-in pym-delay-4">
        <rect x="464" y="262" width="392" height="178" rx="12" fill={SKY} stroke={BLUE} strokeWidth="2.5" />
        <L x="660" y="292" size={13.5} fill={BLUE}>__str__ vs __repr__</L>
        <M x="486" y="328" size={12.5} fill={BLUE} weight={800}>__str__</M>
        <L x="600" y="328" size={11.5} fill={MUTED} anchor="start" weight={700}>for users — print(), str(), f-strings</L>
        <M x="486" y="362" size={12.5} fill={BLUE} weight={800}>__repr__</M>
        <L x="600" y="362" size={11.5} fill={MUTED} anchor="start" weight={700}>for you — the shell, lists, debuggers</L>
        <M x="486" y="402" size={12} fill={RED} weight={800}>print([t]) uses __repr__, not __str__</M>
        <L x="660" y="428" size={11} fill={MUTED} weight={700}>define __repr__ and __str__ falls back to it</L>
      </g>
    </Scene>
  )
}

export function OperatorTranslateScene() {
  return (
    <Scene caption="Every operator is a method call the interpreter writes for you">
      {[
        ['a + b', '__add__', BLUE],
        ['a - b', '__sub__', TEAL],
        ['a == b', '__eq__', PURP],
        ['a < b', '__lt__', AMBER],
        ['len(a)', '__len__', GREEN],
        ['a[k]', '__getitem__', MUTED],
      ].map(([op, dunder, tone], i) => (
        <g key={op} className={`pym-slide-in pym-delay-${i % 5}`}>
          <rect x={44 + (i % 2) * 412} y={62 + Math.floor(i / 2) * 84} width="400" height="66" rx="11" fill={WHITE} stroke={tone} strokeWidth="2.4" />
          <M x={70 + (i % 2) * 412} y={102 + Math.floor(i / 2) * 84} size={16} fill={tone} weight={800}>{op}</M>
          <Wire
            d={`M${172 + (i % 2) * 412} ${96 + Math.floor(i / 2) * 84} L${226 + (i % 2) * 412} ${96 + Math.floor(i / 2) * 84}`}
            stroke={tone}
            width="2.2"
            marker="url(#pyArr)"
            className={`pym-current pym-delay-${i % 5}`}
          />
          <M x={242 + (i % 2) * 412} y={102 + Math.floor(i / 2) * 84} size={14} weight={700}>{`a.${dunder}(b)`}</M>
        </g>
      ))}

      <g className="pym-cell-in pym-delay-4">
        <rect x="44" y="314" width="812" height="126" rx="12" fill={SKY} stroke={BLUE} strokeWidth="2.5" />
        <L x="450" y="344" size={13.5} fill={BLUE}>Define the method and the operator starts working on your type</L>
        <M x="80" y="382" size={12.5} fill={BLUE} weight={800}>def __add__(self, other):</M>
        <M x="100" y="406" size={12.5} fill={BLUE} weight={800}>return Time(...)</M>
        <M x="480" y="382" size={12.5} fill={GREEN} weight={800}>t1 + t2   now works</M>
        <L x="480" y="406" size={11.5} fill={MUTED} anchor="start" weight={700}>returning NotImplemented lets Python try the other operand</L>
        <M x="834" y="434" size={11} anchor="end" fill={RED} weight={800}>only overload where the meaning is obvious</M>
      </g>
    </Scene>
  )
}

export function DispatchScene() {
  return (
    <Scene caption="Both handle several types; only one of them has to be edited when a new type arrives">
      <g className="pym-slide-in">
        <rect x="44" y="58" width="392" height="216" rx="13" fill="#fff4ec" stroke={AMBER} strokeWidth="2.6" />
        <L x="240" y="88" size={14} fill={AMBER}>Type-based dispatch</L>
        <M x="66" y="126" size={12.5}>def __add__(self, other):</M>
        <M x="66" y="152" size={12.5}>    if isinstance(other, Time):</M>
        <M x="66" y="178" size={12.5}>        return self.add_time(other)</M>
        <M x="66" y="204" size={12.5}>    else:</M>
        <M x="66" y="230" size={12.5}>        return self.increment(other)</M>
        <M x="240" y="262" size={11.5} anchor="middle" fill={RED} weight={800}>a new type means editing this if-chain</M>
      </g>

      <g className="pym-slide-in pym-delay-2">
        <rect x="464" y="58" width="392" height="216" rx="13" fill="#f0fdf4" stroke={GREEN} strokeWidth="2.6" />
        <L x="660" y="88" size={14} fill={GREEN}>Polymorphism</L>
        <M x="486" y="126" size={12.5}>def total(items):</M>
        <M x="486" y="152" size={12.5}>    t = items[0]</M>
        <M x="486" y="178" size={12.5}>    for x in items[1:]:</M>
        <M x="486" y="204" size={12.5}>        t = t + x</M>
        <M x="486" y="230" size={12.5}>    return t</M>
        <M x="660" y="262" size={11.5} anchor="middle" fill={GREEN} weight={800}>works on anything that defines +</M>
      </g>

      {[['int', BLUE], ['str', TEAL], ['list', PURP], ['Time', AMBER], ['your type', GREEN]].map(([t, tone], i) => (
        <g key={t} className={`pym-cell-in pym-delay-${i}`}>
          <rect x={92 + i * 148} y="306" width="126" height="46" rx="10" fill={WHITE} stroke={tone} strokeWidth="2.4" />
          <M x={155 + i * 148} y="335" size={12.5} anchor="middle" fill={tone} weight={800}>{t}</M>
          <Wire d={`M${155 + i * 148} 356 L450 396`} stroke={tone} width="1.8" dash="4 5" />
        </g>
      ))}
      <g className="pym-flux pym-delay-3">
        <rect x="316" y="400" width="268" height="52" rx="12" fill={SKY} stroke={GREEN} strokeWidth="2.8" />
        <M x="450" y="432" size={13.5} anchor="middle" fill={GREEN} weight={800}>total(items) — unchanged</M>
      </g>
    </Scene>
  )
}

export function StructureLadderScene() {
  return (
    <LadderScene
      title="Class, dict or tuple — pick the lowest rung that holds"
      caption="Every rung up buys a guarantee and costs a line of code"
      rungs={[
        ['tuple', 'a fixed, short, positional record — (12, 30)', PURP],
        ['dict', 'named fields, shape still changing, easy to dump as JSON', BLUE],
        ['class with __init__', 'the same fields every time, and an invariant to protect', TEAL],
        ['class with methods', 'behaviour that belongs with the data, not beside it', GREEN],
        ['class with operators', 'the type is genuinely arithmetic — Time, Vector, Money', AMBER],
      ]}
    />
  )
}

/* ── Module 5 — networked programs, web services, databases ─────── */

/** A database table: header row plus data rows. Used by every SQL scene. */
function Table({ x, y, w = 340, name, cols = [], rows = [], accent = BLUE, className = '', mark = -1 }) {
  const X = n(x)
  const Y = n(y)
  const W = n(w)
  const colW = W / cols.length
  const h = 30 + 26 + rows.length * 26 + 8
  return (
    <g transform={`translate(${X},${Y})`}>
      <g className={className}>
        <rect width={W} height={h} rx="10" fill={WHITE} stroke={accent} strokeWidth="2.5" />
        <rect width={W} height="30" rx="10" fill={accent} />
        <rect y="20" width={W} height="10" fill={accent} />
        <M x={W / 2} y={21} size={12.5} anchor="middle" fill={WHITE} weight={800}>
          {name}
        </M>
        {cols.map((c, i) => (
          <M key={c} x={i * colW + 10} y={52} size={11} fill={accent} weight={800}>
            {c}
          </M>
        ))}
        <Wire d={`M6 60 L${W - 6} 60`} stroke={accent} width="1.6" />
        {rows.map((row, r) => (
          <g key={r} className={r === n(mark) ? 'pym-pulse' : ''}>
            {r === n(mark) ? <rect x="5" y={66 + r * 26} width={W - 10} height="24" rx="5" fill={accent} opacity="0.14" /> : null}
            {row.map((cell, i) => (
              <M key={i} x={i * colW + 10} y={84 + r * 26} size={11.5} fill={r === n(mark) ? accent : N} weight={r === n(mark) ? 800 : 600}>
                {cell}
              </M>
            ))}
          </g>
        ))}
      </g>
    </g>
  )
}

export function HttpExchangeScene() {
  return (
    <Scene caption="One request, one response, connection done — the server remembers nothing">
      <g className="pym-cell-in">
        <rect x="44" y="90" width="200" height="120" rx="13" fill={WHITE} stroke={BLUE} strokeWidth="2.8" />
        <L x="144" y="140" size={14} fill={BLUE}>browser</L>
        <L x="144" y="168" size={11} fill={MUTED} weight={700}>the client</L>
      </g>
      <g className="pym-cell-in pym-delay-2">
        <rect x="656" y="90" width="200" height="120" rx="13" fill={WHITE} stroke={GREEN} strokeWidth="2.8" />
        <L x="756" y="140" size={14} fill={GREEN}>server</L>
        <L x="756" y="168" size={11} fill={MUTED} weight={700}>port 80</L>
      </g>

      <Wire d="M250 124 L648 124" stroke={BLUE} width="2.8" marker="url(#pyArrB)" className="pym-current" />
      <rect x="300" y="96" width="298" height="24" rx="6" fill={SKY} stroke={BLUE} strokeWidth="1.6" />
      <M x="449" y="113" size={11.5} anchor="middle" fill={BLUE} weight={800}>GET /page.htm HTTP/1.0</M>

      <Wire d="M648 178 L250 178" stroke={GREEN} width="2.8" marker="url(#pyArrG)" className="pym-current-rev pym-delay-1" />
      <rect x="300" y="182" width="298" height="24" rx="6" fill="#f0fdf4" stroke={GREEN} strokeWidth="1.6" />
      <M x="449" y="199" size={11.5} anchor="middle" fill={GREEN} weight={800}>200 OK + headers + body</M>

      <g className="pym-cell-in pym-delay-3">
        <rect x="44" y="240" width="392" height="200" rx="12" fill={WHITE} stroke={PURP} strokeWidth="2.5" />
        <L x="240" y="270" size={13.5} fill={PURP}>Status codes worth knowing</L>
        {[['200', 'OK — the body is what you asked for', GREEN], ['301', 'moved — follow the Location header', BLUE], ['404', 'no such resource on this server', AMBER], ['500', 'the server broke, not you', RED]].map(([c, note, tone], i) => (
          <g key={c} className={`pym-slide-in pym-delay-${i}`}>
            <M x="66" y={310 + i * 34} size={13} fill={tone} weight={800}>{c}</M>
            <L x="112" y={310 + i * 34} size={11.5} fill={MUTED} anchor="start" weight={700}>{note}</L>
          </g>
        ))}
      </g>

      <g className="pym-cell-in pym-delay-4">
        <rect x="464" y="240" width="392" height="200" rx="12" fill={SKY} stroke={BLUE} strokeWidth="2.5" />
        <L x="660" y="270" size={13.5} fill={BLUE}>Stateless, and what that costs</L>
        <foreignObject x="486" y="286" width="352" height="146">
          <div xmlns="http://www.w3.org/1999/xhtml" style={{ font: '700 12.5px/1.45 system-ui,sans-serif', color: '#4f6076' }}>
            Nothing about this request is remembered for the next one, which is why one
            server can answer millions and any of them can answer yours. Logins and
            carts put the state back — in cookies, tokens or a database — because the
            protocol deliberately refuses to hold it.
          </div>
        </foreignObject>
      </g>
    </Scene>
  )
}

export function RecvLoopScene() {
  return (
    <Scene caption="recv() returns what has arrived, not what you asked for — loop until it returns nothing">
      <Code
        x="44"
        y="58"
        w="400"
        title="browser.py"
        accent={BLUE}
        className="pym-slide-in"
        size={12}
        lines={[
          'import socket',
          's = socket.socket(socket.AF_INET,',
          '                  socket.SOCK_STREAM)',
          "s.connect(('data.pr4e.org', 80))",
          "s.send(b'GET /romeo.txt HTTP/1.0\\r\\n\\r\\n')",
          'while True:',
          '    data = s.recv(512)',
          '    if len(data) < 1: break',
          "    print(data.decode(), end='')",
          's.close()',
        ]}
      />

      {[0, 1, 2, 3].map((i) => (
        <g key={i} className={`pym-slide-in pym-delay-${i}`}>
          <rect x={488 + i * 92} y="100" width="78" height="52" rx="9" fill={SKY} stroke={BLUE} strokeWidth="2.2" />
          <M x={527 + i * 92} y="132" size={11.5} anchor="middle" fill={BLUE} weight={800}>{i === 3 ? "b''" : '512 B'}</M>
        </g>
      ))}
      <Wire d="M488 170 L844 170" stroke={MUTED} width="2" dash="5 6" />
      <M x="666" y="192" size={11.5} anchor="middle" fill={MUTED} weight={700}>four calls, four chunks, the last one empty</M>
      <Tag x="792" y="86" text="EOF" tone={RED} w={56} className="pym-fade-in pym-delay-3" />

      <g className="pym-cell-in pym-delay-3">
        <rect x="464" y="212" width="392" height="110" rx="12" fill="#fef2f2" stroke={RED} strokeWidth="2.5" />
        <L x="660" y="242" size={13} fill={RED}>One recv is not the whole response</L>
        <M x="486" y="278" size={12.5} fill={RED} weight={800}>data = s.recv(9999)   # and stop</M>
        <L x="486" y="302" size={11.5} fill={MUTED} anchor="start" weight={700}>works on a small file, truncates a real one</L>
      </g>

      <g className="pym-cell-in pym-delay-4">
        <rect x="464" y="336" width="392" height="104" rx="12" fill="#f0fdf4" stroke={GREEN} strokeWidth="2.5" />
        <L x="660" y="366" size={13} fill={GREEN}>Bytes on the wire, str in Python</L>
        <M x="486" y="400" size={12.5} fill={GREEN} weight={800}>send(b'...')   recv() → bytes</M>
        <M x="486" y="426" size={12.5} fill={GREEN} weight={800}>.decode() to read · .encode() to send</M>
      </g>
      <g className="pym-fade-in pym-delay-4">
        <rect x="44" y="336" width="400" height="104" rx="12" fill={SKY} stroke={BLUE} strokeWidth="2.2" />
        <L x="244" y="366" size={12.5} fill={BLUE}>The blank line is not optional</L>
        <M x="66" y="402" size={12} fill={BLUE} weight={800}>{"'GET /x HTTP/1.0\\r\\n\\r\\n'"}</M>
        <L x="244" y="428" size={11} fill={MUTED} weight={700}>it ends the headers; without it the server waits forever</L>
      </g>
    </Scene>
  )
}

export function BinarySplitScene() {
  return (
    <Scene caption="Find the blank line, throw away the headers, write the rest as bytes">
      <g className="pym-slide-in">
        <rect x="44" y="60" width="300" height="290" rx="13" fill={WHITE} stroke={BLUE} strokeWidth="2.6" />
        <L x="194" y="90" size={13.5} fill={BLUE}>the raw response</L>
        <rect x="66" y="106" width="256" height="104" rx="9" fill={SKY} stroke={BLUE} strokeWidth="2" />
        <M x="82" y="130" size={11}>HTTP/1.1 200 OK</M>
        <M x="82" y="152" size={11}>Content-Type: image/jpeg</M>
        <M x="82" y="174" size={11}>Content-Length: 230000</M>
        <M x="82" y="198" size={11} fill={MUTED}>...</M>
        <rect x="66" y="214" width="256" height="18" rx="4" fill={RED} opacity="0.2" />
        <M x="194" y="227" size={10.5} anchor="middle" fill={RED} weight={800}>\r\n\r\n — the boundary</M>
        <rect x="66" y="238" width="256" height="92" rx="9" fill="#f3f4f6" stroke={MUTED} strokeWidth="2" />
        <M x="194" y="290" size={12} anchor="middle" fill={MUTED} weight={800}>binary image bytes</M>
      </g>

      <Wire d="M352 200 L426 200" stroke={RED} width="2.6" marker="url(#pyArrR)" className="pym-current" />
      <M x="389" y="186" size={10.5} anchor="middle" fill={RED} weight={800}>split once</M>

      <Code
        x="434"
        y="60"
        w="422"
        title="the split, in full"
        accent={GREEN}
        className="pym-slide-in pym-delay-2"
        size={11.5}
        lines={[
          "pos = data.find(b'\\r\\n\\r\\n')",
          'if pos >= 0:',
          '    body = data[pos + 4:]',
          '    data = b\'\'',
          "with open('out.jpg', 'wb') as f:",
          '    f.write(body)',
        ]}
      />

      <g className="pym-cell-in pym-delay-4">
        <rect x="434" y="230" width="422" height="120" rx="12" fill="#fef2f2" stroke={RED} strokeWidth="2.5" />
        <L x="645" y="260" size={13} fill={RED}>Never decode a binary body</L>
        <M x="456" y="296" size={12.5} fill={RED} weight={800}>data.decode()  → UnicodeDecodeError</M>
        <L x="456" y="320" size={11.5} fill={MUTED} anchor="start" weight={700}>JPEG bytes are not UTF-8 and never will be</L>
        <M x="456" y="342" size={12} fill={GREEN} weight={800}>keep it bytes; open the file in 'wb'</M>
      </g>

      <g className="pym-cell-in pym-delay-4">
        <rect x="44" y="370" width="812" height="72" rx="12" fill={SKY} stroke={BLUE} strokeWidth="2.4" />
        <M x="70" y="402" size={12.5} fill={BLUE} weight={800}>+ 4</M>
        <L x="120" y="402" size={11.5} fill={MUTED} anchor="start" weight={700}>find() returns where the marker STARTS — skip its four bytes or they land in your file</L>
        <M x="70" y="428" size={12.5} fill={BLUE} weight={800}>'wb'</M>
        <L x="120" y="428" size={11.5} fill={MUTED} anchor="start" weight={700}>text mode would translate line endings and corrupt the image</L>
      </g>
    </Scene>
  )
}

export function UrllibLayerScene() {
  const layers = [
    ['your code', 'urlopen(url).read()', GREEN],
    ['urllib', 'builds the request, parses headers', BLUE],
    ['socket', 'connect, send, recv loop, close', PURP],
    ['TCP/IP', 'packets, retries, ordering', MUTED],
  ]
  return (
    <Scene caption="Each layer hides the one below — you only drop down when you must">
      {layers.map(([name, note, tone], i) => (
        <g key={name} className={`pym-slide-in pym-delay-${i}`}>
          <rect x={44 + i * 28} y={62 + i * 84} width={812 - i * 56} height="68" rx="12" fill={WHITE} stroke={tone} strokeWidth="2.6" />
          <M x={70 + i * 28} y={96 + i * 84} size={14} fill={tone} weight={800}>{name}</M>
          <L x={70 + i * 28} y={118 + i * 84} size={11.5} fill={MUTED} anchor="start" weight={700}>{note}</L>
          {i === 0 ? <Tag x="640" y={76} text="3 lines" tone={GREEN} w={92} className="pym-fade-in pym-delay-2" /> : null}
          {i === 2 ? <Tag x="584" y={244} text="30 lines by hand" tone={PURP} w={168} className="pym-fade-in pym-delay-3" /> : null}
        </g>
      ))}
      <Wire d="M450 130 L450 146" stroke={MUTED} width="2.2" marker="url(#pyArr)" className="pym-current" />
      <Wire d="M450 214 L450 230" stroke={MUTED} width="2.2" marker="url(#pyArr)" className="pym-current pym-delay-1" />
      <Wire d="M450 298 L450 314" stroke={MUTED} width="2.2" marker="url(#pyArr)" className="pym-current pym-delay-2" />

      <g className="pym-cell-in pym-delay-4">
        <rect x="44" y="404" width="812" height="66" rx="12" fill="#fff4ec" stroke={AMBER} strokeWidth="2.4" />
        <M x="70" y="436" size={12.5} fill={AMBER} weight={800}>urlopen gives you the BODY only</M>
        <L x="380" y="436" size={11.5} fill={MUTED} anchor="start" weight={700}>headers are already stripped — and it still returns bytes, so .decode() before treating it as text</L>
        <L x="834" y="458" size={11} fill={MUTED} anchor="end" weight={700}>it raises on 404 rather than handing you an error page</L>
      </g>
    </Scene>
  )
}

export function XmlTreeScene() {
  return (
    <Scene caption="Angle brackets in, a tree of nodes out">
      <g className="pym-slide-in">
        <rect x="44" y="60" width="360" height="200" rx="12" fill={WHITE} stroke={MUTED} strokeWidth="2.4" />
        <L x="224" y="88" size={12.5} fill={MUTED}>text</L>
        <M x="66" y="120" size={12}>&lt;person&gt;</M>
        <M x="86" y="146" size={12}>&lt;name&gt;Chuck&lt;/name&gt;</M>
        <M x="86" y="172" size={12}>&lt;phone type="intl"&gt;</M>
        <M x="106" y="198" size={12}>+1 734 303 4456</M>
        <M x="86" y="224" size={12}>&lt;/phone&gt;</M>
        <M x="66" y="250" size={12}>&lt;/person&gt;</M>
      </g>

      <Wire d="M412 160 L470 160" stroke={GREEN} width="2.8" marker="url(#pyArrG)" className="pym-current" />
      <M x="441" y="146" size={10.5} anchor="middle" fill={GREEN} weight={800}>fromstring</M>

      <g className="pym-descend pym-delay-2">
        <rect x="596" y="60" width="180" height="44" rx="10" fill={SKY} stroke={BLUE} strokeWidth="2.6" />
        <M x="686" y="88" size={12.5} anchor="middle" fill={BLUE} weight={800}>person</M>
      </g>
      <Wire d="M686 108 L566 148" stroke={BLUE} width="2.2" marker="url(#pyArrB)" className="pym-current pym-delay-2" />
      <Wire d="M686 108 L806 148" stroke={BLUE} width="2.2" marker="url(#pyArrB)" className="pym-current pym-delay-3" />
      <g className="pym-cell-in pym-delay-3">
        <rect x="486" y="152" width="160" height="44" rx="10" fill={WHITE} stroke={TEAL} strokeWidth="2.4" />
        <M x="566" y="180" size={12} anchor="middle" fill={TEAL} weight={800}>name</M>
        <rect x="486" y="204" width="160" height="34" rx="8" fill="#f0fdf4" stroke={GREEN} strokeWidth="2" />
        <M x="566" y="226" size={11.5} anchor="middle" fill={GREEN} weight={800}>.text 'Chuck'</M>
      </g>
      <g className="pym-cell-in pym-delay-4">
        <rect x="726" y="152" width="130" height="44" rx="10" fill={WHITE} stroke={PURP} strokeWidth="2.4" />
        <M x="791" y="180" size={12} anchor="middle" fill={PURP} weight={800}>phone</M>
        <rect x="686" y="204" width="170" height="34" rx="8" fill="#f5f3ff" stroke={PURP} strokeWidth="2" />
        <M x="771" y="226" size={11} anchor="middle" fill={PURP} weight={800}>.get('type') 'intl'</M>
      </g>

      <g className="pym-cell-in pym-delay-4">
        <rect x="44" y="290" width="812" height="150" rx="12" fill={SKY} stroke={BLUE} strokeWidth="2.5" />
        <L x="450" y="320" size={13.5} fill={BLUE}>Why a contract is worth the verbosity</L>
        {[
          ['a schema can be enforced', 'the document is valid or it is rejected'],
          ['attributes vs text', 'two different slots, deliberately'],
          ['namespaces', 'two vocabularies can share one document'],
          ['tools everywhere', 'validators, transforms, editors'],
        ].map(([a, b], i) => (
          <g key={a}>
            <Dot cx={78 + (i % 2) * 418} cy={356 + Math.floor(i / 2) * 46} r={5} fill={BLUE} />
            <M x={94 + (i % 2) * 418} y={352 + Math.floor(i / 2) * 46} size={12.5} fill={BLUE} weight={800}>{a}</M>
            <L x={94 + (i % 2) * 418} y={372 + Math.floor(i / 2) * 46} size={11.5} fill={MUTED} anchor="start" weight={700}>{b}</L>
          </g>
        ))}
      </g>
    </Scene>
  )
}

export function FindNoneScene() {
  return (
    <Scene caption="find() returns None when the tag is absent — and None has no .text">
      <Code
        x="44"
        y="58"
        w="400"
        title="the hazard"
        accent={RED}
        className="pym-slide-in"
        size={12.5}
        lines={['tree = ET.fromstring(data)', "print(tree.find('name').text)", '', '# if <name> is missing:', "# AttributeError: 'NoneType' object", "#   has no attribute 'text'"]}
      />

      <g className="pym-slide-in pym-delay-2">
        <rect x="474" y="58" width="382" height="172" rx="13" fill="#fef2f2" stroke={RED} strokeWidth="2.6" />
        <L x="665" y="88" size={13.5} fill={RED}>Why it is not a parse error</L>
        <foreignObject x="496" y="102" width="342" height="122">
          <div xmlns="http://www.w3.org/1999/xhtml" style={{ font: '700 12.5px/1.45 system-ui,sans-serif', color: '#4f6076' }}>
            The document parsed perfectly — it simply does not contain that tag.
            ElementTree reports absence by returning None, exactly like dict.get,
            so the failure lands one attribute access later.
          </div>
        </foreignObject>
      </g>

      <Code
        x="474"
        y="248"
        w="382"
        title="the shape to write instead"
        accent={GREEN}
        className="pym-cell-in pym-delay-3"
        size={12.5}
        lines={["node = tree.find('name')", 'if node is not None:', '    print(node.text)', 'else:', "    print('no name in this record')"]}
      />

      <g className="pym-cell-in pym-delay-4">
        <rect x="44" y="240" width="400" height="200" rx="12" fill={SKY} stroke={BLUE} strokeWidth="2.5" />
        <L x="244" y="270" size={13.5} fill={BLUE}>The three accessors</L>
        {[
          ['.text', 'the character data inside the tag'],
          [".get('attr')", 'an attribute — None if absent'],
          [".find('tag')", 'the FIRST matching child, or None'],
          [".findall('tag')", 'a list — empty, never None'],
        ].map(([a, b], i) => (
          <g key={a} className={`pym-slide-in pym-delay-${i}`}>
            <M x="66" y={308 + i * 34} size={12.5} fill={BLUE} weight={800}>{a}</M>
            <L x="422" y={308 + i * 34} size={11} fill={MUTED} anchor="end" weight={700}>{b}</L>
          </g>
        ))}
      </g>
    </Scene>
  )
}

export function FindallLoopScene() {
  return (
    <Scene caption="findall returns a list — loop it, and an empty document simply does nothing">
      <Code
        x="44"
        y="58"
        w="400"
        title="users.py"
        accent={BLUE}
        className="pym-slide-in"
        size={12.5}
        lines={["stuff = ET.fromstring(data)", "lst = stuff.findall('users/user')", "print('count:', len(lst))", 'for item in lst:', "    print(item.find('name').text)"]}
      />

      {[['Chuck', '001'], ['Brent', '009'], ['Ann', '042']].map(([nm, id], i) => (
        <g key={nm} className={`pym-traverse pym-delay-${i}`}>
          <rect x="474" y={62 + i * 74} width="382" height="60" rx="11" fill={WHITE} stroke={BLUE} strokeWidth="2.4" />
          <M x="496" y={90 + i * 74} size={12} fill={BLUE} weight={800}>&lt;user&gt;</M>
          <M x="580" y={90 + i * 74} size={12.5} weight={800}>{nm}</M>
          <M x="834" y={90 + i * 74} size={12} anchor="end" fill={MUTED}>{`id ${id}`}</M>
          <M x="496" y={110 + i * 74} size={10.5} fill={MUTED}>{`lst[${i}]`}</M>
        </g>
      ))}
      <circle cx="468" cy="92" r="9" fill={GREEN} className="pym-traverse" />

      <g className="pym-cell-in pym-delay-3">
        <rect x="44" y="238" width="400" height="106" rx="12" fill="#f0fdf4" stroke={GREEN} strokeWidth="2.5" />
        <L x="244" y="268" size={13} fill={GREEN}>Relative paths</L>
        <M x="66" y="304" size={12.5} fill={GREEN} weight={800}>'users/user'</M>
        <L x="66" y="328" size={11.5} fill={MUTED} anchor="start" weight={700}>children of users, not every user anywhere</L>
      </g>

      <g className="pym-cell-in pym-delay-4">
        <rect x="44" y="358" width="400" height="82" rx="12" fill="#fef2f2" stroke={RED} strokeWidth="2.4" />
        <M x="66" y="390" size={12.5} fill={RED} weight={800}>findall never returns None</M>
        <L x="66" y="414" size={11.5} fill={MUTED} anchor="start" weight={700}>no matches gives [], so len() is 0 and the loop is skipped</L>
      </g>

      <g className="pym-fade-in pym-delay-4">
        <rect x="474" y="288" width="382" height="152" rx="12" fill={SKY} stroke={BLUE} strokeWidth="2.4" />
        <L x="665" y="318" size={13} fill={BLUE}>Count before you trust</L>
        <foreignObject x="496" y="330" width="342" height="104">
          <div xmlns="http://www.w3.org/1999/xhtml" style={{ font: '700 12.5px/1.45 system-ui,sans-serif', color: '#4f6076' }}>
            Printing len(lst) first is how you find out the path was wrong. A silent
            zero-iteration loop looks exactly like a document with no users.
          </div>
        </foreignObject>
      </g>
    </Scene>
  )
}

export function JsonMapScene() {
  return (
    <Scene caption="json.loads hands back ordinary Python objects — then it is just dicts and lists">
      <g className="pym-slide-in">
        <rect x="44" y="58" width="340" height="216" rx="12" fill={WHITE} stroke={AMBER} strokeWidth="2.5" />
        <L x="214" y="86" size={12.5} fill={AMBER}>JSON text</L>
        <M x="66" y="118" size={12}>[</M>
        <M x="82" y="142" size={12}>{'{ "id" : "001",'}</M>
        <M x="98" y="166" size={12}>{'"x" : "2",'}</M>
        <M x="98" y="190" size={12}>{'"name" : "Chuck"'}</M>
        <M x="82" y="214" size={12}>{'}'}</M>
        <M x="66" y="238" size={12}>]</M>
      </g>

      <Wire d="M392 166 L452 166" stroke={GREEN} width="2.8" marker="url(#pyArrG)" className="pym-current" />
      <M x="422" y="152" size={10.5} anchor="middle" fill={GREEN} weight={800}>loads</M>

      {[
        ['object  { }', 'dict', GREEN],
        ['array  [ ]', 'list', BLUE],
        ['string', 'str', TEAL],
        ['number', 'int / float', PURP],
        ['true / false', 'True / False', AMBER],
        ['null', 'None', MUTED],
      ].map(([j, p, tone], i) => (
        <g key={j} className={`pym-cell-in pym-delay-${i % 5}`}>
          <rect x="466" y={58 + i * 42} width="390" height="34" rx="8" fill={WHITE} stroke={tone} strokeWidth="2.2" />
          <M x="486" y={80 + i * 42} size={12} fill={tone} weight={800}>{j}</M>
          <Wire d={`M640 ${74 + i * 42} L692 ${74 + i * 42}`} stroke={tone} width="1.8" marker="url(#pyArr)" />
          <M x="836" y={80 + i * 42} size={12} anchor="end" weight={800}>{p}</M>
        </g>
      ))}

      <g className="pym-cell-in pym-delay-4">
        <rect x="44" y="294" width="340" height="146" rx="12" fill={SKY} stroke={BLUE} strokeWidth="2.4" />
        <L x="214" y="324" size={13} fill={BLUE}>Then use it normally</L>
        <M x="66" y="360" size={12.5} fill={BLUE} weight={800}>info[0]['name']</M>
        <M x="66" y="388" size={12.5} fill={GREEN} weight={800}>info[0].get('name')</M>
        <L x="66" y="414" size={11} fill={MUTED} anchor="start" weight={700}>no parser API to learn — it is a dict</L>
        <M x="66" y="434" size={11.5} fill={RED} weight={800}>no comments, no trailing commas</M>
      </g>
    </Scene>
  )
}

export function ScanVsIndexScene() {
  return (
    <Scene caption="A file makes you read everything; a database is built to find one row">
      <g className="pym-slide-in">
        <rect x="44" y="58" width="392" height="230" rx="13" fill="#fff4ec" stroke={AMBER} strokeWidth="2.6" />
        <L x="240" y="88" size={14} fill={AMBER}>flat file — scan</L>
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <rect key={i} x={66 + i * 58} y="112" width="48" height="66" rx="7" fill={WHITE} stroke={i === 4 ? GREEN : MUTED} strokeWidth={i === 4 ? 2.8 : 1.8} />
        ))}
        <circle cx="90" cy="145" r="15" fill="none" stroke={AMBER} strokeWidth="3" className="pym-search" />
        <M x="240" y="206" size={12} anchor="middle" fill={AMBER} weight={800}>read row 1, 2, 3, 4, then find it</M>
        <L x="240" y="232" size={11.5} fill={MUTED} weight={700}>cost grows with the size of the file</L>
        <L x="240" y="256" size={11.5} fill={RED} weight={800}>no concurrent writers, no rollback</L>
        <L x="240" y="278" size={11.5} fill={MUTED} weight={700}>every update rewrites the whole file</L>
      </g>

      <g className="pym-slide-in pym-delay-2">
        <rect x="464" y="58" width="392" height="230" rx="13" fill="#f0fdf4" stroke={GREEN} strokeWidth="2.6" />
        <L x="660" y="88" size={14} fill={GREEN}>database — index</L>
        <rect x="486" y="112" width="348" height="38" rx="9" fill={WHITE} stroke={GREEN} strokeWidth="2.4" />
        <M x="660" y="137" size={12} anchor="middle" fill={GREEN} weight={800}>WHERE id = 42</M>
        <Wire d="M660 154 L660 176" stroke={GREEN} width="2.6" marker="url(#pyArrG)" className="pym-current" />
        <rect x="596" y="180" width="128" height="40" rx="8" fill={SKY} stroke={GREEN} strokeWidth="2.6" className="pym-pulse" />
        <M x="660" y="205" size={12} anchor="middle" fill={GREEN} weight={800}>one row</M>
        <L x="660" y="244" size={11.5} fill={MUTED} weight={700}>a B-tree gets there in a handful of steps</L>
        <L x="660" y="266" size={11.5} fill={GREEN} weight={800}>transactions, constraints, many readers</L>
      </g>

      <g className="pym-cell-in pym-delay-4">
        <rect x="44" y="312" width="812" height="130" rx="12" fill={SKY} stroke={BLUE} strokeWidth="2.5" />
        <L x="450" y="342" size={13.5} fill={BLUE}>When a file is still the right answer</L>
        {[
          ['written once, read whole', 'a log, a CSV export, a config file'],
          ['a few hundred records', 'the scan is instant and the setup is zero'],
          ['humans must edit it', 'a database needs a tool; a file needs a text editor'],
        ].map(([a, b], i) => (
          <g key={a}>
            <Dot cx={78} cy={376 + i * 28} r={4.5} fill={BLUE} />
            <M x="94" y={380 + i * 28} size={12} fill={BLUE} weight={800}>{a}</M>
            <L x="360" y={380 + i * 28} size={11.5} fill={MUTED} anchor="start" weight={700}>{b}</L>
          </g>
        ))}
      </g>
    </Scene>
  )
}

export function SqliteFileScene() {
  return (
    <Scene caption="One file, no server, and a browser that shows you what your code actually wrote">
      <g className="pym-flux">
        <rect x="330" y="68" width="240" height="96" rx="14" fill={SKY} stroke={BLUE} strokeWidth="3" />
        <M x="450" y="108" size={15} anchor="middle" fill={BLUE} weight={800}>music.sqlite</M>
        <L x="450" y="136" size={11} fill={MUTED} weight={700}>one ordinary file on disk</L>
      </g>

      {[['your script', 120, GREEN], ['DB Browser', 450, PURP], ['any other tool', 780, TEAL]].map(([name, cx, tone], i) => (
        <g key={name} className={`pym-cell-in pym-delay-${i}`}>
          <rect x={n(cx) - 110} y="222" width="220" height="56" rx="11" fill={WHITE} stroke={tone} strokeWidth="2.5" />
          <L x={cx} y="256" size={13} fill={tone}>{name}</L>
          <Wire d={`M${cx} 218 L${cx === 450 ? 450 : cx < 450 ? 340 : 560} 170`} stroke={tone} width="2.2" marker={`url(#pyArr${tone === GREEN ? 'G' : tone === PURP ? 'P' : 'T'})`} className={`pym-current pym-delay-${i}`} />
        </g>
      ))}

      <Panel
        x="44"
        y="304"
        w="392"
        title="The vocabulary"
        accent={BLUE}
        className="pym-slide-in pym-delay-3"
        rowH={28}
        rows={[['database — the file itself'], ['table — one kind of thing'], ['row — one of that thing'], ['column — one field of it']]}
      />
      <g className="pym-cell-in pym-delay-4">
        <rect x="464" y="304" width="392" height="136" rx="12" fill="#f0fdf4" stroke={GREEN} strokeWidth="2.5" />
        <L x="660" y="334" size={13} fill={GREEN}>Why the browser matters</L>
        <foreignObject x="486" y="346" width="352" height="88">
          <div xmlns="http://www.w3.org/1999/xhtml" style={{ font: '700 12.5px/1.45 system-ui,sans-serif', color: '#4f6076' }}>
            Print statements tell you what you think happened. Opening the file shows
            you the rows that are really there — including the ones a forgotten commit
            never wrote.
          </div>
        </foreignObject>
      </g>
    </Scene>
  )
}

export function SchemaContractScene() {
  return (
    <Scene caption="CREATE TABLE is a promise about every row that will ever be inserted">
      <Code
        x="44"
        y="58"
        w="400"
        title="schema.sql"
        accent={BLUE}
        className="pym-slide-in"
        size={12}
        lines={[
          'DROP TABLE IF EXISTS Track;',
          'CREATE TABLE Track (',
          '  id     INTEGER PRIMARY KEY',
          '         AUTOINCREMENT UNIQUE,',
          '  title  TEXT UNIQUE,',
          '  len    INTEGER,',
          '  artist_id INTEGER',
          ');',
        ]}
      />

      <Table
        x="474"
        y="58"
        w="382"
        name="Track"
        cols={['id', 'title', 'len']}
        rows={[['1', 'Thunderstruck', '209'], ['2', 'My Way', '264'], ['3', 'Bohemian', '355']]}
        accent={GREEN}
        className="pym-slide-in pym-delay-2"
      />

      <g className="pym-cell-in pym-delay-3">
        <rect x="474" y="228" width="382" height="212" rx="12" fill={SKY} stroke={PURP} strokeWidth="2.5" />
        <L x="665" y="258" size={13.5} fill={PURP}>What each word buys you</L>
        {[
          ['PRIMARY KEY', 'the one true identifier of a row'],
          ['AUTOINCREMENT', 'the database allocates it, not you'],
          ['UNIQUE', 'a second insert of the same title fails'],
          ['TEXT / INTEGER', 'the declared intent of the column'],
        ].map(([a, b], i) => (
          <g key={a} className={`pym-slide-in pym-delay-${i}`}>
            <M x="496" y={296 + i * 36} size={12} fill={PURP} weight={800}>{a}</M>
            <L x="496" y={314 + i * 36} size={11} fill={MUTED} anchor="start" weight={700}>{b}</L>
          </g>
        ))}
      </g>

      <g className="pym-cell-in pym-delay-4">
        <rect x="44" y="290" width="400" height="150" rx="12" fill="#fef2f2" stroke={RED} strokeWidth="2.5" />
        <L x="244" y="320" size={13} fill={RED}>DROP TABLE is not undoable</L>
        <foreignObject x="66" y="332" width="360" height="100">
          <div xmlns="http://www.w3.org/1999/xhtml" style={{ font: '700 12.5px/1.45 system-ui,sans-serif', color: '#4f6076' }}>
            It is exactly right at the top of a script you rerun while developing, and
            exactly wrong anywhere near data you care about. SQLite will also accept a
            string into an INTEGER column, so the type is a declaration of intent, not
            a guard.
          </div>
        </foreignObject>
      </g>
    </Scene>
  )
}

export function SqlFourScene() {
  return (
    <Scene caption="Four statements cover almost everything — and every value goes in through a ?">
      {[
        ['INSERT INTO t (a) VALUES (?)', 'add a row', GREEN],
        ['SELECT a FROM t WHERE b = ?', 'read rows back', BLUE],
        ['UPDATE t SET a = ? WHERE id = ?', 'change existing rows', AMBER],
        ['DELETE FROM t WHERE id = ?', 'remove rows', RED],
      ].map(([sql, note, tone], i) => (
        <g key={sql} className={`pym-slide-in pym-delay-${i}`}>
          <rect x="44" y={58 + i * 74} width="812" height="62" rx="11" fill={WHITE} stroke={tone} strokeWidth="2.5" />
          <rect x="44" y={58 + i * 74} width="9" height="62" rx="4" fill={tone} />
          <M x="74" y={88 + i * 74} size={13.5} fill={tone} weight={800}>{sql}</M>
          <L x="834" y={88 + i * 74} size={11.5} fill={MUTED} anchor="end" weight={700}>{note}</L>
          {i >= 2 ? <M x="74" y={110 + i * 74} size={10.5} fill={RED} weight={800}>omit WHERE and it hits every row</M> : null}
        </g>
      ))}

      <g className="pym-cell-in pym-delay-4">
        <rect x="44" y="358" width="812" height="116" rx="12" fill="#fef2f2" stroke={RED} strokeWidth="2.6" />
        <L x="450" y="388" size={13.5} fill={RED}>SQL injection — the reason for the ?</L>
        <M x="80" y="424" size={12} fill={RED} weight={800}>{"cur.execute('... WHERE n = \"' + name + '\"')"}</M>
        <L x="80" y="446" size={11} fill={MUTED} anchor="start" weight={700}>a quote inside name ends the string and the rest runs as SQL</L>
        <M x="480" y="424" size={12} fill={GREEN} weight={800}>{"cur.execute('... WHERE n = ?', (name,))"}</M>
        <L x="480" y="446" size={11} fill={MUTED} anchor="start" weight={700}>the driver sends it as a value; it can never become code</L>
      </g>
    </Scene>
  )
}

export function SpiderScene() {
  return (
    <Scene caption="Store as you go, so a crash costs one page and not the whole crawl">
      <g className="pym-flow-node">
        <rect x="44" y="90" width="186" height="66" rx="12" fill={SKY} stroke={BLUE} strokeWidth="2.6" />
        <M x="137" y="120" size={12.5} anchor="middle" fill={BLUE} weight={800}>pick an unretrieved</M>
        <M x="137" y="142" size={12.5} anchor="middle" fill={BLUE} weight={800}>row from the table</M>
      </g>
      <Wire d="M236 123 L294 123" stroke={N} width="2.4" marker="url(#pyArr)" className="pym-current" />
      <g className="pym-flow-node pym-delay-1">
        <rect x="300" y="90" width="166" height="66" rx="12" fill={WHITE} stroke={PURP} strokeWidth="2.6" />
        <M x="383" y="130" size={12.5} anchor="middle" fill={PURP} weight={800}>fetch it</M>
      </g>
      <Wire d="M472 123 L530 123" stroke={N} width="2.4" marker="url(#pyArr)" className="pym-current pym-delay-1" />
      <g className="pym-flow-node pym-delay-2">
        <rect x="536" y="90" width="166" height="66" rx="12" fill={WHITE} stroke={TEAL} strokeWidth="2.6" />
        <M x="619" y="120" size={12.5} anchor="middle" fill={TEAL} weight={800}>parse out</M>
        <M x="619" y="142" size={12.5} anchor="middle" fill={TEAL} weight={800}>new links</M>
      </g>
      <Wire d="M708 123 L766 123" stroke={N} width="2.4" marker="url(#pyArr)" className="pym-current pym-delay-2" />
      <g className="pym-flow-node pym-delay-3">
        <rect x="716" y="180" width="140" height="60" rx="12" fill="#f0fdf4" stroke={GREEN} strokeWidth="2.6" />
        <M x="786" y="216" size={12.5} anchor="middle" fill={GREEN} weight={800}>commit</M>
      </g>
      <Wire d="M786 244 L786 300 L137 300 L137 162" stroke={GREEN} width="2.4" dash="7 6" marker="url(#pyArrG)" className="pym-feedback" />
      <M x="450" y="322" size={11.5} anchor="middle" fill={GREEN} weight={800}>every loop leaves the database in a usable state</M>

      <g className="pym-cell-in pym-delay-3">
        <rect x="44" y="338" width="392" height="104" rx="12" fill={SKY} stroke={BLUE} strokeWidth="2.5" />
        <L x="240" y="368" size={13} fill={BLUE}>The retrieved flag is the whole design</L>
        <M x="66" y="404" size={12} fill={BLUE} weight={800}>retrieved = 0</M>
        <L x="200" y="404" size={11} fill={MUTED} anchor="start" weight={700}>known but not yet fetched</L>
        <M x="66" y="428" size={12} fill={GREEN} weight={800}>retrieved = 1</M>
        <L x="200" y="428" size={11} fill={MUTED} anchor="start" weight={700}>done — never fetched twice</L>
      </g>

      <g className="pym-cell-in pym-delay-4">
        <rect x="464" y="338" width="392" height="104" rx="12" fill="#fef2f2" stroke={RED} strokeWidth="2.5" />
        <L x="660" y="368" size={13} fill={RED}>Two ways to lose a night's work</L>
        <M x="486" y="402" size={12} fill={RED} weight={800}>one commit at the very end</M>
        <M x="486" y="428" size={12} fill={RED} weight={800}>INSERT without OR IGNORE on the URL</M>
      </g>
    </Scene>
  )
}

export function ThreeKeysScene() {
  return (
    <Scene caption="Three kinds of key, three different jobs">
      {[
        ['PRIMARY', 'the row is this one, forever', 'never reused, never a name', BLUE],
        ['LOGICAL', 'how a human looks it up', 'an email, a track title — it changes', AMBER],
        ['FOREIGN', 'points at another table', 'always a primary key, never a name', GREEN],
      ].map(([name, job, note, tone], i) => (
        <g key={name} className={`pym-cell-in pym-delay-${i}`}>
          <rect x={44 + i * 274} y="58" width="252" height="130" rx="12" fill={WHITE} stroke={tone} strokeWidth="2.8" />
          <rect x={44 + i * 274} y="58" width="252" height="34" rx="12" fill={tone} />
          <rect x={44 + i * 274} y="80" width="252" height="12" fill={tone} />
          <M x={170 + i * 274} y="81" size={12.5} anchor="middle" fill={WHITE} weight={800}>{name}</M>
          <foreignObject x={62 + i * 274} y={100} width="216" height="80">
            <div xmlns="http://www.w3.org/1999/xhtml" style={{ font: '700 12px/1.35 system-ui,sans-serif', color: '#10233d', textAlign: 'center' }}>
              <b>{job}</b>
              <br />
              <span style={{ color: '#4f6076' }}>{note}</span>
            </div>
          </foreignObject>
        </g>
      ))}

      <g className="pym-slide-in pym-delay-3">
        <rect x="44" y="206" width="392" height="122" rx="12" fill="#fff4ec" stroke={AMBER} strokeWidth="2.5" />
        <L x="240" y="234" size={12.5} fill={AMBER}>denormalised — the string repeated</L>
        <Table x="60" y="244" w="360" name="Track" cols={['title', 'artist']} rows={[['Thunder…', 'AC/DC'], ['Back In…', 'AC/DC']]} accent={AMBER} />
      </g>
      <Wire d="M450 268 L508 268" stroke={GREEN} width="2.8" marker="url(#pyArrG)" className="pym-current pym-delay-3" />
      <g className="pym-slide-in pym-delay-4">
        <rect x="520" y="206" width="336" height="122" rx="12" fill="#f0fdf4" stroke={GREEN} strokeWidth="2.5" />
        <L x="688" y="234" size={12.5} fill={GREEN}>normalised — stored once, referenced</L>
        <Table x="534" y="244" w="308" name="Track → Artist" cols={['title', 'artist_id']} rows={[['Thunder…', '1'], ['Back In…', '1']]} accent={GREEN} />
      </g>

      <g className="pym-cell-in pym-delay-4">
        <rect x="44" y="348" width="812" height="94" rx="12" fill={SKY} stroke={BLUE} strokeWidth="2.4" />
        <L x="450" y="378" size={13} fill={BLUE}>What normalisation actually buys</L>
        <L x="240" y="408" size={11.5} fill={MUTED} weight={700}>rename the artist in one place</L>
        <L x="450" y="408" size={11.5} fill={MUTED} weight={700}>no row can disagree with another</L>
        <L x="680" y="408" size={11.5} fill={MUTED} weight={700}>an integer is smaller than a string</L>
        <M x="450" y="434" size={11} anchor="middle" fill={RED} weight={800}>the price is a JOIN on every read — pay it</M>
      </g>
    </Scene>
  )
}

export function JoinOnScene() {
  return (
    <Scene caption="Without ON you get every combination; with ON you get the ones that mean something">
      <Table x="44" y="58" w="240" name="Track" cols={['title', 'a_id']} rows={[['Thunder', '1'], ['My Way', '2']]} accent={BLUE} className="pym-slide-in" />
      <Table x="308" y="58" w="200" name="Artist" cols={['id', 'name']} rows={[['1', 'AC/DC'], ['2', 'Sinatra']]} accent={TEAL} className="pym-slide-in pym-delay-1" />

      <g className="pym-cell-in pym-delay-2">
        <rect x="532" y="58" width="324" height="164" rx="12" fill="#fef2f2" stroke={RED} strokeWidth="2.5" />
        <L x="694" y="86" size={12.5} fill={RED}>no ON clause — 2 × 2 = 4 rows</L>
        {[['Thunder', 'AC/DC', true], ['Thunder', 'Sinatra', false], ['My Way', 'AC/DC', false], ['My Way', 'Sinatra', true]].map(([a, b, ok], i) => (
          <g key={`${a}${b}`}>
            <M x="554" y={116 + i * 24} size={11.5} fill={ok ? GREEN : RED} weight={ok ? 800 : 600}>{`${a} — ${b}`}</M>
            {!ok ? <M x="834" y={116 + i * 24} size={11} anchor="end" fill={RED} weight={800}>nonsense</M> : null}
          </g>
        ))}
      </g>

      <g className="pym-slide-in pym-delay-3">
        <rect x="44" y="244" width="812" height="80" rx="12" fill={SKY} stroke={GREEN} strokeWidth="2.6" />
        <M x="70" y="278" size={13.5} fill={GREEN} weight={800}>SELECT Track.title, Artist.name FROM Track</M>
        <M x="70" y="306" size={13.5} fill={GREEN} weight={800}>  JOIN Artist ON Track.a_id = Artist.id</M>
        <Tag x="700" y="270" text="the filter" tone={GREEN} w={132} className="pym-fade-in pym-delay-3" />
      </g>

      <Table
        x="264"
        y="346"
        w="372"
        name="result — only the meaningful pairs"
        cols={['title', 'name']}
        rows={[['Thunder', 'AC/DC'], ['My Way', 'Sinatra']]}
        accent={GREEN}
        className="pym-emerge pym-delay-4"
      />
      <M x="450" y="474" size={11} anchor="middle" fill={MUTED} weight={700}>qualify every column as Table.column once two tables are in play</M>
    </Scene>
  )
}

export function EndToEndScene() {
  return (
    <Scene caption="Fetch, parse, store, query — every stage is one thing you already know">
      {[
        ['FETCH', 'urlopen / socket', 'bytes', BLUE],
        ['PARSE', 'ET.fromstring / json.loads', 'Python objects', PURP],
        ['STORE', 'execute + commit', 'rows on disk', GREEN],
        ['QUERY', 'SELECT … JOIN … ORDER BY', 'the answer', AMBER],
      ].map(([stage, how, out, tone], i) => (
        <g key={stage} className={`pym-slide-in pym-delay-${i}`}>
          <rect x={44 + i * 208} y="106" width="188" height="150" rx="13" fill={WHITE} stroke={tone} strokeWidth="2.8" />
          <rect x={44 + i * 208} y="106" width="188" height="38" rx="13" fill={tone} />
          <rect x={44 + i * 208} y="130" width="188" height="14" fill={tone} />
          <M x={138 + i * 208} y="132" size={13} anchor="middle" fill={WHITE} weight={800}>{stage}</M>
          <foreignObject x={60 + i * 208} y={156} width="156" height="56">
            <div xmlns="http://www.w3.org/1999/xhtml" style={{ font: '700 11.5px/1.35 system-ui,sans-serif', color: '#10233d', textAlign: 'center' }}>
              {how}
            </div>
          </foreignObject>
          <L x={138 + i * 208} y="238" size={11} fill={MUTED} weight={700}>{out}</L>
          {i < 3 ? (
            <Wire d={`M${236 + i * 208} 181 L${248 + i * 208} 181`} stroke={tone} width="2.6" marker={`url(#pyArr${tone === BLUE ? 'B' : tone === PURP ? 'P' : 'G'})`} className={`pym-current pym-delay-${i}`} />
          ) : null}
        </g>
      ))}

      <g className="pym-cell-in pym-delay-4">
        <rect x="44" y="288" width="392" height="154" rx="12" fill={SKY} stroke={BLUE} strokeWidth="2.5" />
        <L x="240" y="318" size={13.5} fill={BLUE}>Make it resumable</L>
        {['commit after each record', 'INSERT OR IGNORE on the unique key', 'a retrieved flag, not a position counter'].map((t, i) => (
          <g key={t}>
            <Dot cx={68} cy={352 + i * 30} r={4.5} fill={BLUE} />
            <L x="84" y={356 + i * 30} size={12} anchor="start" weight={700}>{t}</L>
          </g>
        ))}
      </g>

      <g className="pym-cell-in pym-delay-4">
        <rect x="464" y="288" width="392" height="154" rx="12" fill="#f0fdf4" stroke={GREEN} strokeWidth="2.5" />
        <L x="660" y="318" size={13.5} fill={GREEN}>Test each stage on its own</L>
        <foreignObject x="486" y="330" width="352" height="104">
          <div xmlns="http://www.w3.org/1999/xhtml" style={{ font: '700 12.5px/1.45 system-ui,sans-serif', color: '#4f6076' }}>
            Save one response to a file and parse that until the parser is right. Only
            then point it at the network. A pipeline debugged end to end is four
            unknowns at once.
          </div>
        </foreignObject>
      </g>
    </Scene>
  )
}

/* ── Binding: Phase-1 `visual` id → the scene that realises it ──── */

export const VISUAL_MAP = {
  /* Module 1 — basics, flow control, functions */
  'repl-loop-cycle': ReplLoopScene,
  'three-types-boxes': TypeBoxesScene,
  'overloaded-operator-switch': OperatorSwitchScene,
  'label-points-at-value': NameBindingScene,
  'program-line-trace': LineTraceScene,
  'builtin-functions-panel': BuiltinPanelScene,
  'comparison-to-bool-funnel': BoolFunnelScene,
  'short-circuit-gate': ShortCircuitScene,
  'indentation-defines-block': IndentBlockScene,
  'elif-chain-first-match': ElifChainScene,
  'while-loop-flow': WhileFlowScene,
  'range-half-open-ruler': RangeRulerScene,
  'import-namespace-diagram': ImportNamespaceScene,
  'function-call-mechanics': CallMechanicsScene,
  'scope-boxes-nested': ScopeBoxesScene,
  'try-except-flow': TryExceptScene,

  /* Module 2 — lists, dictionaries, strings */
  'list-index-ruler': ListRulerScene,
  'slice-versus-index': SliceScene,
  'mutation-versus-new-list': MutationScene,
  'iterate-items-not-indexes': IterateItemsScene,
  'swap-and-unpack': SwapUnpackScene,
  'methods-return-none': MethodReturnNoneScene,
  'mutable-immutable-split': MutabilitySplitScene,
  'aliasing-three-cases': AliasingScene,
  'dict-versus-list-lookup': DictVsListScene,
  'get-versus-setdefault': GetSetdefaultScene,
  'model-shape-match': ModelShapeScene,
  'nested-structure-tree': NestedTreeScene,
  'string-immutability-and-literals': StringImmutableScene,
  'isx-validation-gate': IsXGateScene,
  'join-split-roundtrip': JoinSplitScene,
  'pad-strip-clipboard': PadStripScene,

  /* Module 3 — regular expressions and files */
  'manual-matcher-brittleness': ManualMatcherScene,
  'regex-object-pipeline': RegexPipelineScene,
  'group-numbering-diagram': GroupNumberScene,
  'alternation-order-matters': AlternationScene,
  'optional-group-branch': OptionalBranchScene,
  'star-versus-plus-counter': StarPlusScene,
  'greedy-versus-lazy-span': GreedyLazyScene,
  'findall-return-shape': FindallShapeScene,
  'character-class-venn': CharClassScene,
  'anchors-validate-versus-search': AnchorScene,
  'flags-and-substitution': FlagsSubScene,
  'path-join-portability': PathJoinScene,
  'ospath-inspection-panel': OsPathPanelScene,
  'file-modes-and-with': FileModeScene,
  'shelve-persistence-bridge': ShelveScene,
  'pformat-versus-shelve-choice': PformatChoiceScene,

  /* Module 4 — classes and objects */
  'class-defines-a-type': ClassTypeScene,
  'attribute-typo-trap': AttrTypoScene,
  'composition-chain-and-choice': CompositionScene,
  'return-object-composes': ReturnObjectScene,
  'object-aliasing-and-mutation': ObjectMutationScene,
  'shallow-deep-object-copy': ObjectCopyScene,
  'time-invariant-and-canonical-form': TimeCanonicalScene,
  'pure-function-boundary': PureBoundaryScene,
  'modifier-versus-pure-comparison': ModifierCompareScene,
  'prototype-versus-plan-paths': PrototypePlanScene,
  'method-self-binding': SelfBindingScene,
  'init-guarantees-valid-state': InitStateScene,
  'str-method-output-contrast': StrMethodScene,
  'operator-to-method-translation': OperatorTranslateScene,
  'dispatch-versus-polymorphism': DispatchScene,
  'structure-choice-ladder': StructureLadderScene,

  /* Module 5 — networked programs, web services, databases */
  'http-request-response-exchange': HttpExchangeScene,
  'socket-recv-chunk-loop': RecvLoopScene,
  'binary-body-split-and-write': BinarySplitScene,
  'urllib-hides-the-protocol': UrllibLayerScene,
  'xml-text-to-tree': XmlTreeScene,
  'elementtree-find-none-hazard': FindNoneScene,
  'findall-node-list-loop': FindallLoopScene,
  'json-maps-to-python-types': JsonMapScene,
  'file-scan-versus-index-lookup': ScanVsIndexScene,
  'sqlite-single-file-and-browser': SqliteFileScene,
  'create-table-schema-contract': SchemaContractScene,
  'sql-four-statements-and-placeholder': SqlFourScene,
  'spider-resumable-crawl': SpiderScene,
  'three-keys-and-normalisation': ThreeKeysScene,
  'join-on-clause-versus-cross': JoinOnScene,
  'end-to-end-pipeline': EndToEndScene,
}

/** Fallback for a unit whose `visual` id is not in the map — matched on the
 *  topic and term text so a near-miss still lands on a real diagram. */
function matchKeyword(blob) {
  if (/\bshell\b|repl|interactive/.test(blob)) return ReplLoopScene
  if (/data type|integer|floating/.test(blob)) return TypeBoxesScene
  if (/concatenat|replicat/.test(blob)) return OperatorSwitchScene
  if (/variable|assignment statement/.test(blob)) return NameBindingScene
  if (/boolean operator|and\b.*or\b/.test(blob)) return ShortCircuitScene
  if (/boolean|comparison operator/.test(blob)) return BoolFunnelScene
  if (/indent|block/.test(blob)) return IndentBlockScene
  if (/elif|if statement/.test(blob)) return ElifChainScene
  if (/while|break|continue/.test(blob)) return WhileFlowScene
  if (/\brange\b|for loop/.test(blob)) return RangeRulerScene
  if (/import|module|sys\.exit/.test(blob)) return ImportNamespaceScene
  if (/scope|global/.test(blob)) return ScopeBoxesScene
  if (/exception|try|except/.test(blob)) return TryExceptScene
  if (/def statement|parameter|return value/.test(blob)) return CallMechanicsScene
  if (/slic|negative index/.test(blob)) return SliceScene
  if (/list method|append|insert/.test(blob)) return MethodReturnNoneScene
  if (/mutab|tuple/.test(blob)) return MutabilitySplitScene
  if (/reference|deepcopy|alias/.test(blob)) return AliasingScene
  if (/setdefault|\bget\(/.test(blob)) return GetSetdefaultScene
  if (/nested/.test(blob)) return NestedTreeScene
  if (/dictionar/.test(blob)) return DictVsListScene
  if (/\blist\b|index/.test(blob)) return ListRulerScene
  if (/isx|case method|upper|lower/.test(blob)) return IsXGateScene
  if (/join|split|startswith/.test(blob)) return JoinSplitScene
  if (/justif|strip|clipboard/.test(blob)) return PadStripScene
  if (/string|literal/.test(blob)) return StringImmutableScene
  if (/greedy|nongreedy|curly/.test(blob)) return GreedyLazyScene
  if (/findall/.test(blob)) return FindallShapeScene
  if (/character class|caret|dollar|wildcard/.test(blob)) return CharClassScene
  if (/group|pipe|question mark/.test(blob)) return GroupNumberScene
  if (/star|plus/.test(blob)) return StarPlusScene
  if (/sub\(|case-insensitive|verbose/.test(blob)) return FlagsSubScene
  if (/regex|regular expression|pattern/.test(blob)) return RegexPipelineScene
  if (/file path|absolute|relative|working directory/.test(blob)) return PathJoinScene
  if (/os\.path|listing|size/.test(blob)) return OsPathPanelScene
  if (/reading and writing|open\(|file/.test(blob)) return FileModeScene
  if (/shelve/.test(blob)) return ShelveScene
  if (/pformat|pprint/.test(blob)) return PformatChoiceScene
  if (/attribute/.test(blob)) return AttrTypoScene
  if (/rectangle|object as attribute|composition/.test(blob)) return CompositionScene
  if (/instance as return|return value/.test(blob)) return ReturnObjectScene
  if (/copying object/.test(blob)) return ObjectCopyScene
  if (/objects are mutable/.test(blob)) return ObjectMutationScene
  if (/pure function/.test(blob)) return PureBoundaryScene
  if (/modifier/.test(blob)) return ModifierCompareScene
  if (/prototyp|planning/.test(blob)) return PrototypePlanScene
  if (/__init__/.test(blob)) return InitStateScene
  if (/__str__/.test(blob)) return StrMethodScene
  if (/operator overload/.test(blob)) return OperatorTranslateScene
  if (/dispatch|polymorph/.test(blob)) return DispatchScene
  if (/method|self/.test(blob)) return SelfBindingScene
  if (/programmer-defined|class/.test(blob)) return ClassTypeScene
  if (/\bhttp\b|protocol/.test(blob)) return HttpExchangeScene
  if (/socket|browser/.test(blob)) return RecvLoopScene
  if (/image|binary/.test(blob)) return BinarySplitScene
  if (/urllib/.test(blob)) return UrllibLayerScene
  if (/parsing xml|elementtree/.test(blob)) return FindNoneScene
  if (/looping through node/.test(blob)) return FindallLoopScene
  if (/\bxml\b/.test(blob)) return XmlTreeScene
  if (/\bjson\b/.test(blob)) return JsonMapScene
  if (/why not a file|what is a database/.test(blob)) return ScanVsIndexScene
  if (/sqlite|browser/.test(blob)) return SqliteFileScene
  if (/create table|schema/.test(blob)) return SchemaContractScene
  if (/insert|select|update|delete|\bsql\b/.test(blob)) return SqlFourScene
  if (/spider|crawl/.test(blob)) return SpiderScene
  if (/\bkey\b|normalis/.test(blob)) return ThreeKeysScene
  if (/join|multiple table/.test(blob)) return JoinOnScene
  if (/pipeline|putting it together/.test(blob)) return EndToEndScene
  return null
}

/** The worked trace for a unit: given → steps → result, built from the unit's
 *  own dry run, so no two units produce the same board. */
export function DryRunBoardScene({ dryRun, topic }) {
  const steps = (dryRun?.steps || []).slice(0, 5)
  // 62% of result strings wrap past one line, and a fixed 56px box sliced
  // every one of them through its second line. Grow into the free space
  // under the steps instead, stopping short of the 520-tall canvas edge.
  // ponytail: line count estimated at ~100 chars per 716px line of 13px text;
  // measure the foreignObject if a font change ever breaks the estimate.
  const givenLines = Math.min(3, Math.max(1, Math.ceil(String(dryRun?.input || '').length / 100)))
  const shift = (givenLines - 1) * 17 // a two-line GIVEN clipped its second line in a 62px box
  const pitch = Math.min(58, (294 - shift) / Math.max(1, steps.length))
  const stepH = Math.min(50, pitch - 6)
  const top = 136 + shift + steps.length * pitch
  const resultH = Math.min(96, 500 - top)
  return (
    <Scene caption={`Worked trace — ${topic || 'this unit'}`}>
      <rect x="56" y="54" width="788" height={62 + shift} rx="12" fill={SKY} stroke={BLUE} strokeWidth="2.4" />
      <L x="92" y="80" size={12.5} fill={BLUE} anchor="start">GIVEN</L>
      <foreignObject x="92" y="82" width="716" height={30 + shift}>
        <div xmlns="http://www.w3.org/1999/xhtml" style={{ font: '650 13px/1.25 system-ui,sans-serif', color: '#10233d' }}>
          {dryRun?.input || '—'}
        </div>
      </foreignObject>
      {steps.map((st, i) => (
        <g key={String(st)} className={`pym-slide-in pym-delay-${i}`}>
          <rect x="56" y={130 + shift + i * pitch} width="788" height={stepH} rx="10" fill={WHITE} stroke={MUTED} strokeWidth="1.8" />
          <circle cx="90" cy={130 + shift + i * pitch + stepH / 2} r="13" fill={AMBER} />
          <L x="90" y={136 + shift + i * pitch + stepH / 2} size={13} fill={WHITE}>{i + 1}</L>
          <foreignObject x="114" y={138 + shift + i * pitch} width="716" height={stepH - 14}>
            <div
              xmlns="http://www.w3.org/1999/xhtml"
              style={{ font: '650 13px/1.25 system-ui,sans-serif', color: '#10233d', display: 'flex', alignItems: 'center', height: '100%' }}
            >
              {String(st)}
            </div>
          </foreignObject>
        </g>
      ))}
      <g className="pym-emerge">
        <rect x="56" y={top} width="788" height={resultH} rx="12" fill={WHITE} stroke={GREEN} strokeWidth="2.6" />
        <L x="92" y={top + 24} size={12.5} fill={GREEN} anchor="start">RESULT</L>
        <foreignObject x="92" y={top + 26} width="716" height={resultH - 30}>
          <div xmlns="http://www.w3.org/1999/xhtml" style={{ font: '750 13px/1.2 system-ui,sans-serif', color: '#15803d' }}>
            {dryRun?.result || '—'}
          </div>
        </foreignObject>
      </g>
    </Scene>
  )
}

function mechanismFor(unit) {
  const key = unit?.visual
  const Comp = (key && VISUAL_MAP[key]) || null
  if (Comp) return Comp
  const blob = `${key || ''} ${unit?.topic || ''} ${(unit?.terms || []).join(' ')}`.toLowerCase()
  return matchKeyword(blob)
}

/**
 * Beat 0 introduces the mechanism and beat 1 watches it run, so both show the
 * unit's diagram. Beat 2 pairs the written procedure with the worked trace
 * built from the unit's own `dryRun`. Beat 3 returns to the diagram so the
 * code panel on its left has something to point at.
 */
export function beatVisual(unit, beatIndex = 0) {
  if (beatIndex === 2 && unit?.dryRun) {
    return <DryRunBoardScene dryRun={unit.dryRun} topic={unit.topic} />
  }
  const Comp = mechanismFor(unit)
  if (Comp) return <Comp />
  // Last resort: the unit still gets an animated board built from its own terms.
  return <ConceptBoard title={unit?.topic || 'Concept'} points={unit?.terms || []} />
}

/** How many of this module's units have a hand-built scene rather than the
 *  generic board — surfaced in DEV so gaps are visible, not silent. */
export function visualCoverage(units = []) {
  const mapped = units.filter((u) => VISUAL_MAP[u.visual]).length
  return { mapped, total: units.length }
}
