import { kindLabel } from '../firstYearSourceLabels'
import './foundation.css'

const TONES = {
  math: '#2563eb',
  science: '#0f766e',
  code: '#7c3aed',
  circuit: '#d97706',
  lab: '#dc2626',
  human: '#0f766e',
  core: '#475569',
}

export function FoundationSlide({
  kicker,
  title,
  subtitle,
  layout = 'visual-hero',
  tone = 'core',
  visual,
  children,
  footer = 'First Year Foundation',
  hideHeader = false,
}) {
  return (
    <main className="fy-stage" data-fy-tone={tone}>
      <article className="fy-frame" data-fy-layout={layout} data-fy-hide-header={hideHeader ? 'true' : undefined}>
        {!hideHeader && (
          <header className="fy-header">
            {kicker && <p className="fy-kicker">{kicker}</p>}
            {title ? <h1>{title}</h1> : null}
            {subtitle && <p className="fy-subtitle">{subtitle}</p>}
          </header>
        )}
        <section className="fy-body">
          {visual && <div className="fy-visual-zone">{visual}</div>}
          {children && <div className="fy-copy-zone">{children}</div>}
        </section>
        <footer className="fy-footer">
          <span>{footer}</span>
          <span>{layout}</span>
        </footer>
      </article>
    </main>
  )
}

export function TeachingCallout({ kind = 'KEY IDEA', children }) {
  return (
    <aside className="fy-callout" data-slide-content="true" data-kind={kind.toLowerCase().replace(/\s+/g, '-')}>
      <strong>{kind}</strong>
      <span>{children}</span>
    </aside>
  )
}

export function SourceTeachingBlock({ range, title, points, action, provenance, mode = 'source', explanation }) {
  const chrome = /^(?:\d+\/\d+|1b[a-z0-9]+(?:\/\d+)?(?:\s*\|\s*module\s*\d+)?|official syllabus topic map|classroom explanation|check question|syllabus topic|treatment|define input|write algorithm|pptx slides|source teaching block|final pptx teaching block)$/i
  const visible = (points || []).filter((point) => String(point || '').trim().length >= 8 && !chrome.test(String(point).trim()))
  const shown = visible.length ? visible : (points || []).slice(0, 6)
  const lead = String(explanation || '').trim()
  const label = kindLabel(mode, action)
  const debug = typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.DEV
  return (
    <section
      className="fy-source-block"
      data-slide-content="true"
      data-source-mode={mode}
      data-source-slides={range || undefined}
      data-point-count={shown.length}
    >
      <header>
        <strong>{label}</strong>
      </header>
      <h2>{title}</h2>
      {lead ? <p className="fy-source-lead">{lead}</p> : null}
      <div className="fy-source-grid" data-count={shown.length}>
        {shown.map((point, index) => (
          <article key={`${point}-${index}`} style={{ '--i': index }}>
            <b>{String(index + 1).padStart(2, '0')}</b>
            <p>{point}</p>
          </article>
        ))}
      </div>
      {debug && provenance ? <footer data-fy-debug="source-mapping">{provenance}</footer> : null}
    </section>
  )
}

export function EquationStepper({ steps }) {
  return (
    <div className="fy-equation-stepper" data-slide-content="true">
      {steps.map((step, index) => (
        <section key={step.eq} className="fy-eq-step" style={{ '--i': index }}>
          <span className="fy-step-index">{index + 1}</span>
          <div>
            <div className="fy-equation" dangerouslySetInnerHTML={{ __html: step.eq }} />
            <p>{step.explain}</p>
          </div>
        </section>
      ))}
    </div>
  )
}

export function NumericalBoard({ given, find, formula, substitution, calculation, answer, interpretation }) {
  const rows = [
    ['GIVEN', given],
    ['FIND', find],
    ['FORMULA', formula],
    ['SUBSTITUTION', substitution],
    ['CALCULATION', calculation],
    ['ANSWER', answer],
    ['INTERPRETATION', interpretation],
  ]
  return (
    <div className="fy-numerical-board" data-slide-content="true">
      {rows.map(([label, text], index) => (
        <section key={label} style={{ '--i': index }}>
          <strong>{label}</strong>
          <span dangerouslySetInnerHTML={{ __html: text }} />
        </section>
      ))}
    </div>
  )
}

function mapPoint([x, y], { minX, maxX, minY, maxY, w, h, pad }) {
  const px = pad + ((x - minX) / (maxX - minX)) * (w - pad * 2)
  const py = h - pad - ((y - minY) / (maxY - minY)) * (h - pad * 2)
  return [px, py]
}

export function GraphAnimator({
  curves,
  points = [],
  xLabel = 'x',
  yLabel = 'y',
  domain = [-3, 3],
  range = [-1, 9],
  highlight,
}) {
  const w = 720
  const h = 430
  const pad = 54
  const scale = { minX: domain[0], maxX: domain[1], minY: range[0], maxY: range[1], w, h, pad }
  const zero = mapPoint([0, 0], scale)
  return (
    <svg className="fy-graph" viewBox={`0 0 ${w} ${h}`} role="img" aria-label="Animated teaching graph">
      <rect width={w} height={h} rx="18" />
      <line x1={pad} y1={zero[1]} x2={w - pad} y2={zero[1]} />
      <line x1={zero[0]} y1={pad} x2={zero[0]} y2={h - pad} />
      <text x={w - pad + 16} y={zero[1] + 6}>{xLabel}</text>
      <text x={zero[0] - 8} y={pad - 18}>{yLabel}</text>
      {curves.map((curve, index) => {
        const samples = Array.from({ length: 80 }, (_, i) => domain[0] + (i / 79) * (domain[1] - domain[0]))
        const d = samples.map((x, i) => {
          const [px, py] = mapPoint([x, curve.fn(x)], scale)
          return `${i ? 'L' : 'M'}${px.toFixed(1)} ${py.toFixed(1)}`
        }).join(' ')
        return <path key={curve.label} className="fy-curve" style={{ '--i': index, '--curve': curve.color || TONES.math }} d={d} />
      })}
      {points.map((point, index) => {
        const [cx, cy] = mapPoint(point.xy, scale)
        return (
          <g key={point.label} className="fy-graph-point" style={{ '--i': index }}>
            <circle cx={cx} cy={cy} r="7" />
            <text x={cx + 12} y={cy - 12}>{point.label}</text>
          </g>
        )
      })}
      {highlight && <text className="fy-graph-note" x={pad} y={h - 18}>{highlight}</text>}
    </svg>
  )
}

export function GeometryVisualizer() {
  return (
    <svg className="fy-geometry" viewBox="0 0 720 430" role="img" aria-label="Geometry and vector teaching visual">
      <rect width="720" height="430" rx="18" />
      <line x1="70" y1="350" x2="650" y2="350" />
      <line x1="110" y1="380" x2="110" y2="70" />
      <polygon points="230,300 500,300 500,145" />
      <path className="fy-vector" d="M230 300 L500 145" />
      <path className="fy-angle" d="M285 300 A55 55 0 0 0 274 268" />
      <text x="515" y="150">projected point</text>
      <text x="335" y="255">vector r</text>
      <text x="286" y="284">theta</text>
      <text x="82" y="64">y</text>
      <text x="660" y="356">x</text>
    </svg>
  )
}

export function CodeExecutionVisualizer({ code, steps }) {
  return (
    <div className="fy-code-exec" data-slide-content="true">
      <pre aria-label="Source code">
        {code.map((line, index) => (
          <code key={`${line}-${index}`} className={steps.some((step) => step.line === index + 1) ? 'will-run' : ''}>
            <span>{String(index + 1).padStart(2, '0')}</span>{line}
          </code>
        ))}
      </pre>
      <section className="fy-state-panel" aria-label="Execution state">
        {steps.map((step, index) => (
          <article key={`${step.line}-${step.note}`} style={{ '--i': index }}>
            <strong>Line {step.line}</strong>
            <p>{step.note}</p>
            <div>{step.state}</div>
          </article>
        ))}
      </section>
    </div>
  )
}

export function ExecutionTraceVisualizer({ code, steps, activeStep = 0, language = 'c', input = [], output = [] }) {
  const active = steps[activeStep] || steps[0] || {}
  return (
    <div className="fy-execution-trace" data-slide-content="true" data-language={language}>
      <section className="fy-trace-code" aria-label="Source code with executing line">
        <header><span>Source Code</span><b>{language.toUpperCase()}</b></header>
        <pre>
          {code.map((line, index) => (
            <code key={`${line}-${index}`} className={active.line === index + 1 ? 'active' : steps.some((step) => step.line === index + 1) ? 'visited' : ''}>
              <span>{String(index + 1).padStart(2, '0')}</span>{line}
            </code>
          ))}
        </pre>
      </section>
      <section className="fy-trace-state" aria-label="Current execution state">
        <header><span>Current Line</span><b>{active.line ? `Line ${active.line}` : 'Ready'}</b></header>
        <article className="current">
          <strong>{active.statement || active.note || 'Program starts'}</strong>
          <p>{active.explain || 'Trace the program from input through state changes to output.'}</p>
        </article>
        <div className="fy-variable-grid">
          {(active.variables || []).map((item) => (
            <section key={item.name}>
              <span>{item.name}</span>
              <b>{item.value}</b>
              {item.before && <small>before: {item.before}</small>}
              {item.after && <small>after: {item.after}</small>}
            </section>
          ))}
        </div>
      </section>
      <section className="fy-io-panel" aria-label="Input and output">
        <header><span>Input</span><span>Output</span></header>
        <pre>{input.map((line) => <code key={line}>{line}</code>)}</pre>
        <pre>{output.map((line) => <code key={line}>{line}</code>)}</pre>
      </section>
    </div>
  )
}

export function DryRunTable({ columns, rows, active = 0 }) {
  return (
    <table className="fy-dry-run" data-slide-content="true">
      <thead><tr>{columns.map((column) => <th key={column}>{column}</th>)}</tr></thead>
      <tbody>
        {rows.map((row, index) => (
          <tr key={`${row.join('-')}-${index}`} className={index === active ? 'active' : ''} style={{ '--i': index }}>
            {row.map((cell, cellIndex) => <td key={`${cell}-${cellIndex}`}>{cell}</td>)}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export function MemoryDiagram({ cells, pointers = [], frames = [] }) {
  return (
    <div className="fy-memory-diagram" data-slide-content="true">
      <section className="fy-memory-cells" aria-label="Memory cells">
        {cells.map((cell, index) => (
          <article key={cell.address || cell.name} className={cell.active ? 'active' : ''} style={{ '--i': index }}>
            <small>{cell.address}</small>
            <strong>{cell.name}</strong>
            <b>{cell.value}</b>
          </article>
        ))}
      </section>
      <section className="fy-pointer-list" aria-label="Pointers">
        {pointers.map((pointer, index) => (
          <article key={pointer.name} style={{ '--i': index }}>
            <strong>{pointer.name}</strong>
            <span>{pointer.expression}</span>
            <b>{pointer.target}</b>
          </article>
        ))}
      </section>
      <section className="fy-stack-frames" aria-label="Stack frames">
        {frames.map((frame, index) => (
          <article key={frame.name} style={{ '--i': index }}>
            <strong>{frame.name}</strong>
            {frame.locals.map((local) => <span key={local}>{local}</span>)}
          </article>
        ))}
      </section>
    </div>
  )
}

export function AlgorithmTraceVisualizer({ title = 'Algorithm Trace', steps, state = [], active = 0 }) {
  return (
    <div className="fy-algorithm-trace" data-slide-content="true">
      <section className="fy-algo-steps">
        <h2>{title}</h2>
        {steps.map((step, index) => (
          <article key={step} className={index === active ? 'active' : ''} style={{ '--i': index }}>
            <b>{index + 1}</b>
            <span>{step}</span>
          </article>
        ))}
      </section>
      <section className="fy-algo-state">
        {state.map((item, index) => (
          <article key={`${item.label}-${index}`} className={item.active ? 'active' : ''} style={{ '--i': index }}>
            <strong>{item.label}</strong>
            <span>{item.value}</span>
          </article>
        ))}
      </section>
    </div>
  )
}

export function FlowchartTrace({ nodes, active = 0 }) {
  return (
    <div className="fy-flowchart-trace" data-slide-content="true">
      {nodes.map((node, index) => (
        <article key={node.label} className={index === active ? 'active' : ''} data-kind={node.kind || 'process'} style={{ '--i': index }}>
          <strong>{node.label}</strong>
          <span>{node.detail}</span>
        </article>
      ))}
    </div>
  )
}

export function LoopVisualizer({ iterations }) {
  return (
    <div className="fy-loop-visual" data-slide-content="true">
      {iterations.map((it, index) => (
        <section key={it.label} style={{ '--i': index }}>
          <strong>{it.label}</strong>
          <span>{it.condition}</span>
          <b>{it.body}</b>
          <em>{it.update}</em>
        </section>
      ))}
    </div>
  )
}

export function ArrayVisualizer({ values, active = 0, label = 'Array traversal' }) {
  return (
    <div className="fy-array-visual" data-slide-content="true" aria-label={label}>
      {values.map((value, index) => (
        <span key={`${value}-${index}`} className={index === active ? 'active' : ''} style={{ '--i': index }}>
          <b>{value}</b>
          <small>{index}</small>
        </span>
      ))}
    </div>
  )
}

export function TerminalPanel({ lines }) {
  return (
    <pre className="fy-terminal" data-slide-content="true">
      {lines.map((line, index) => <code key={`${line}-${index}`}>{line}</code>)}
    </pre>
  )
}

export function CircuitVisualizer() {
  return (
    <svg className="fy-circuit" viewBox="0 0 760 430" role="img" aria-label="Basic electrical circuit with animated current path">
      <rect width="760" height="430" rx="18" />
      <path className="wire active" d="M120 215 H245" />
      <path className="wire active" d="M355 215 H510" />
      <path className="wire" d="M510 215 V330 H120 V215" />
      <g className="source"><line x1="120" y1="165" x2="120" y2="265" /><line x1="92" y1="185" x2="92" y2="245" /><text x="70" y="150">DC source</text></g>
      <circle className="fy-source-pulse" cx="106" cy="215" r="22" />
      <polyline className="component" points="245,215 260,185 290,245 320,185 350,245 365,215" />
      <text x="280" y="165">R</text>
      <path className="current" d="M140 215 H500 V320 H150" />
      <text x="385" y="202">current path</text>
      <text x="455" y="352">return wire</text>
      <circle cx="510" cy="215" r="9" />
    </svg>
  )
}

export function WaveformAnimator() {
  const path = Array.from({ length: 96 }, (_, i) => {
    const x = 60 + i * 6.5
    const y = 145 + Math.sin(i / 7) * 54
    return `${i ? 'L' : 'M'}${x.toFixed(1)} ${y.toFixed(1)}`
  }).join(' ')
  return (
    <svg className="fy-waveform" viewBox="0 0 760 300" role="img" aria-label="Input and output waveform comparison">
      <rect width="760" height="300" rx="18" />
      <line x1="54" y1="150" x2="710" y2="150" />
      <line x1="60" y1="42" x2="60" y2="250" />
      <path className="wave input" d={path} />
      <path className="wave output" d="M60 215 H140 V85 H230 V215 H320 V85 H410 V215 H500 V85 H590 V215 H680" />
      <text x="625" y="135">sine input</text>
      <text x="625" y="86">square output</text>
      <text x="690" y="173">time</text>
    </svg>
  )
}

export function ProcessAnimator({ steps, mode = 'linear' }) {
  return (
    <div className="fy-process" data-mode={mode} data-slide-content="true">
      {steps.map((step, index) => (
        <article key={step.title} style={{ '--i': index }}>
          <strong>{step.title}</strong>
          <span>{step.detail}</span>
        </article>
      ))}
    </div>
  )
}

export function TimelineEngine({ events }) {
  return (
    <div className="fy-timeline" data-slide-content="true">
      {events.map((event, index) => (
        <section key={event.when} style={{ '--i': index }}>
          <strong>{event.when}</strong>
          <span>{event.text}</span>
        </section>
      ))}
    </div>
  )
}

export function ComparisonVisualizer({ left, right, dimensions }) {
  return (
    <div className="fy-comparison" data-slide-content="true">
      <h2>{left.title}</h2>
      <h2>{right.title}</h2>
      {dimensions.map((row, index) => (
        <section key={row.label} style={{ '--i': index }}>
          <strong>{row.label}</strong>
          <span>{row.left}</span>
          <span>{row.right}</span>
        </section>
      ))}
    </div>
  )
}

export function ConceptMap({ nodes, links }) {
  return (
    <svg className="fy-concept-map" viewBox="0 0 760 430" role="img" aria-label="Concept map recap">
      <rect width="760" height="430" rx="18" />
      {links.map((link, index) => {
        const a = nodes.find((node) => node.id === link.from)
        const b = nodes.find((node) => node.id === link.to)
        return a && b ? (
          <g key={`${link.from}-${link.to}`} className="fy-map-link" style={{ '--i': index }}>
            <line x1={a.x} y1={a.y} x2={b.x} y2={b.y} />
            <text x={(a.x + b.x) / 2} y={(a.y + b.y) / 2 - 8}>{link.label}</text>
          </g>
        ) : null
      })}
      {nodes.map((node, index) => (
        <g key={node.id} className="fy-map-node" style={{ '--i': index }}>
          <circle cx={node.x} cy={node.y} r={node.main ? 54 : 42} />
          <text x={node.x} y={node.y + 5}>{node.label}</text>
        </g>
      ))}
    </svg>
  )
}

export function ExperimentVisualizer({ aim, setup, procedure, observation, output, result, viva }) {
  const showOutput = output && output !== result && output !== observation
  return (
    <div className="fy-experiment" data-slide-content="true">
      <section className="aim"><strong>AIM</strong><span>{aim}</span></section>
      <section className="setup"><strong>SETUP</strong><span>{setup}</span></section>
      <section className="procedure"><strong>PROCEDURE</strong><ol>{procedure.map((p) => <li key={p}>{p}</li>)}</ol></section>
      <section><strong>OBSERVATION</strong><span>{observation}</span></section>
      {showOutput ? <section><strong>CALCULATION / OUTPUT</strong><span>{output}</span></section> : null}
      <section><strong>RESULT</strong><span>{result}</span></section>
      <section><strong>VIVA</strong><span>{viva}</span></section>
    </div>
  )
}

export function ApparatusLayout() {
  return (
    <svg className="fy-apparatus" viewBox="0 0 760 430" role="img" aria-label="Large apparatus setup with labels">
      <rect width="760" height="430" rx="18" />
      <rect x="92" y="115" width="210" height="170" rx="16" />
      <circle cx="197" cy="200" r="52" />
      <path d="M302 200 H500" />
      <rect x="500" y="145" width="145" height="110" rx="14" />
      <path className="measure" d="M562 255 V330" />
      <text x="197" y="95">1. Apparatus</text>
      <text x="575" y="135">2. Meter</text>
      <text x="560" y="365">measurement point</text>
      <text x="360" y="188">process direction</text>
    </svg>
  )
}

export { TONES }
