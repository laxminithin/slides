/**
 * Research Methodology & IPR — shared teaching primitives + visual metaphors.
 */
import { BookOpen, FileQuestion, ListChecks, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'

export const RM_STORY = [
  'Problem',
  'Question',
  'Literature',
  'Ethics',
  'Knowledge',
  'Invention',
  'IP Choice',
  'Protection',
  'Value',
]

export function slide({ id, kicker, title, subtitle, content, notes, layout, tone, hideTitle }) {
  return { id, kicker, title, subtitle, content, notes, layout, tone, hideTitle }
}

export function Deck({
  active = 0,
  children,
  visual,
  takeaway,
  reverse = false,
  full = false,
  layout = '',
  density = '',
  tone = 0,
}) {
  const hideVisual = full || layout === 'quote'
  const classes = [
    'rm-board',
    reverse ? 'reverse' : '',
    full ? 'full' : '',
    layout || '',
    density || '',
    tone ? `tone-${tone}` : '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={classes} data-rm-tone={tone || undefined}>
      <aside className="rm-story" aria-label="Research to IP journey">
        {RM_STORY.map((item, index) => (
          <span key={item} className={`${index <= active ? 'lit' : ''} ${index === active ? 'now' : ''}`.trim()}>
            {item}
          </span>
        ))}
      </aside>
      <section className="rm-copy">{children}</section>
      {!hideVisual && <section className="rm-visual">{visual}</section>}
      {takeaway && (
        <aside className="rm-takeaway">
          <strong>Takeaway</strong>
          <span>{takeaway}</span>
        </aside>
      )}
    </div>
  )
}

export function Points({ items }) {
  return (
    <ul className="rm-points">
      {items.map((item) => (
        <li key={typeof item === 'string' ? item : item.key || String(item)}>{item}</li>
      ))}
    </ul>
  )
}

export function Lead({ children }) {
  return <p className="rm-lead">{children}</p>
}

export function Definition({ term, children }) {
  return (
    <div className="rm-definition">
      <span>Definition</span>
      <strong>{term}</strong>
      <p>{children}</p>
    </div>
  )
}

export function Example({ label = 'Engineering story', children }) {
  return (
    <div className="rm-example">
      <span>{label}</span>
      <p>{children}</p>
    </div>
  )
}

export function Flow({ items, wide = false }) {
  return (
    <div className={`rm-flow${wide ? ' rm-flow-wide' : ''}`.trim()}>
      {items.map((item, index) => (
        <span key={item} style={{ '--i': index }}>
          {item}
          {index < items.length - 1 ? <em> →</em> : null}
        </span>
      ))}
    </div>
  )
}

export function ProcessFlow({ items = [], title }) {
  const n = Math.max(items.length, 1)
  const top = title ? 66 : 40
  const bottom = 330
  const step = n > 1 ? (bottom - top) / (n - 1) : 0
  const pillH = Math.min(step - 10, 42)
  const r = Math.min(step / 2 - 4, 19)
  return (
    <svg className="rm-scene" viewBox="0 0 480 360" role="img" aria-label={title || 'Process flow'}>
      <defs>
        <linearGradient id="rmFlowNode" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#0f9d94" />
        </linearGradient>
      </defs>
      <rect x="14" y="14" width="452" height="332" rx="18" fill="#fffdf9" stroke="rgba(20,29,46,.1)" />
      {title && (
        <text x="240" y="46" textAnchor="middle" fill="#0f2744" fontSize="16" fontWeight="850">
          {title}
        </text>
      )}
      <line x1="58" y1={top} x2="58" y2={bottom} stroke="#cbd9ef" strokeWidth="4" strokeLinecap="round" />
      {items.map((label, i) => {
        const y = top + i * step
        return (
          <g key={label} className="rm-anim-rise" style={{ animationDelay: `${i * 0.08}s` }}>
            <rect x="90" y={y - pillH / 2} width="356" height={pillH} rx="11" fill="#fff" stroke="rgba(37,99,235,.2)" />
            <text x="112" y={y + 5} fill="#0f2744" fontSize="15.5" fontWeight="750">
              {label}
            </text>
            <circle cx="58" cy={y} r={r} fill="url(#rmFlowNode)" />
            <text x="58" y={y + 4.5} textAnchor="middle" fill="#fff" fontSize="13" fontWeight="850">
              {i + 1}
            </text>
          </g>
        )
      })}
    </svg>
  )
}

export function Quote({ children, label = 'Principle' }) {
  return (
    <div className="rm-quote-block">
      <p>“{children}”</p>
      <span>{label}</span>
    </div>
  )
}

export function Callback({ children }) {
  return <span className="rm-callback">{children}</span>
}

export function Compare({ leftTitle, rightTitle, left, right }) {
  return (
    <div className="rm-compare">
      <article>
        <h3>{leftTitle}</h3>
        <Points items={left} />
      </article>
      <article>
        <h3>{rightTitle}</h3>
        <Points items={right} />
      </article>
    </div>
  )
}

export function Cards({ items, cols = 2 }) {
  return (
    <div className={`rm-card-grid${cols === 3 ? ' cols-3' : ''}`.trim()}>
      {items.map(([title, text]) => (
        <div className="rm-card" key={title}>
          <strong>{title}</strong>
          <span>{text}</span>
        </div>
      ))}
    </div>
  )
}

export function Divider({ number, title, subtitle, visual }) {
  return (
    <div className="rm-divider">
      <span className="rm-divider-ghost" aria-hidden="true">
        {title}
      </span>
      <div className="rm-divider-copy">
        <span className="rm-divider-number">{number}</span>
        <h2>{title}</h2>
        <p>{subtitle}</p>
      </div>
      <div className="rm-divider-visual">{visual}</div>
    </div>
  )
}

export function ResourceHub({ moduleId = 'module-1' }) {
  const links = [
    ['Module Notes', 'Concise revision map after the lecture.', 'notes', BookOpen],
    ['Practice Bank', 'Viva, 2-mark, 5-mark and 10-mark questions.', 'previous-year-questions', FileQuestion],
    ['Quick Revision', 'One-screen checklist of syllabus outcomes.', 'notes', ListChecks],
  ]
  return (
    <div className="rm-resource-hub">
      {links.map(([title, text, path, Icon]) => (
        <Link key={title} to={`/research-methodology-ipr/${moduleId}/${path}`}>
          <Icon size={22} strokeWidth={1.8} aria-hidden />
          <strong>{title}</strong>
          <span>{text}</span>
        </Link>
      ))}
      <div className="rm-card" style={{ gridColumn: '1 / -1' }}>
        <strong>
          <Sparkles size={16} style={{ marginRight: 6 }} /> Previous Year Questions
        </strong>
        <span>
          Genuine BRMK557 university papers will appear here when available. Until then, use the practice
          bank — it is not labelled as previous-year papers.
        </span>
      </div>
    </div>
  )
}

/* -------------------- Visual scenes -------------------- */

export function ResearchLifecycle({ stage = 3 }) {
  const steps = ['Unknown', 'Investigate', 'Evidence', 'Understanding']
  return (
    <svg className="rm-scene" viewBox="0 0 520 384" role="img" aria-label="Research lifecycle">
      <defs>
        <linearGradient id="rmLife" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#0f9d94" />
        </linearGradient>
        <marker id="rmLifeArrow" viewBox="0 0 10 10" refX="7.5" refY="5" markerWidth="6.5" markerHeight="6.5" orient="auto-start-reverse">
          <path d="M0 0 L10 5 L0 10 z" fill="#2563eb" />
        </marker>
      </defs>
      <rect x="14" y="14" width="492" height="356" rx="20" fill="#fffdf9" stroke="rgba(20,29,46,.1)" />
      <text x="260" y="54" textAnchor="middle" fill="#0f2744" fontSize="17" fontWeight="850">
        The research lifecycle
      </text>
      {steps.map((label, i) => {
        const x = 84 + i * 117
        const on = i <= stage
        return (
          <g key={label} className="rm-anim-rise" style={{ animationDelay: `${i * 0.12}s` }}>
            {i < steps.length - 1 && (
              <path d={`M${x + 50} 190 H${x + 67}`} stroke="#2563eb" strokeWidth="5" strokeLinecap="round" markerEnd="url(#rmLifeArrow)" className="rm-draw" />
            )}
            <circle cx={x} cy="190" r="46" fill={on ? 'url(#rmLife)' : '#e8eef8'} opacity={on ? 1 : 0.6} />
            <text x={x} y="199" textAnchor="middle" fill={on ? '#fff' : '#5b6577'} fontSize="24" fontWeight="850">
              {i + 1}
            </text>
            <text x={x} y="286" textAnchor="middle" fill="#141d2e" fontSize="17" fontWeight="800">
              {label}
            </text>
          </g>
        )
      })}
      <text x="260" y="344" textAnchor="middle" fill="#5b6577" fontSize="14.5">
        Research turns unknown problems into evidenced understanding.
      </text>
    </svg>
  )
}

export function ProblemNarrowing({ focus = null }) {
  const rows = [
    ['Broad issue', '#94a3b8', 464],
    ['Observe campus energy use', '#64748b', 384],
    ['Identify research gap', '#2563eb', 304],
    ['Worthwhile question', '#0f9d94', 224],
  ]
  const H = 58
  const GAP = 20
  const y0 = 34
  return (
    <svg className="rm-scene" viewBox="0 0 520 340" role="img" aria-label="Narrowing a broad issue into a worthwhile research question">
      <rect x="14" y="14" width="492" height="312" rx="18" fill="#fffdf9" stroke="rgba(20,29,46,.1)" />
      {/* funnel side walls */}
      {rows.slice(0, -1).map(([, color], i) => {
        const yTop = y0 + i * (H + GAP)
        const wTop = rows[i][2]
        const wBot = rows[i + 1][2]
        const xTopL = (520 - wTop) / 2
        const xTopR = 520 - xTopL
        const xBotL = (520 - wBot) / 2
        const xBotR = 520 - xBotL
        return (
          <polygon
            key={`wall-${i}`}
            points={`${xTopL},${yTop + H} ${xTopR},${yTop + H} ${xBotR},${yTop + H + GAP} ${xBotL},${yTop + H + GAP}`}
            fill="#0f2744"
            opacity="0.05"
          />
        )
      })}
      {rows.map(([label, color, w], i) => {
        const y = y0 + i * (H + GAP)
        const dim = focus !== null && focus !== i
        return (
          <g key={label} className="rm-anim-rise" style={{ animationDelay: `${i * 0.1}s` }} opacity={dim ? 0.4 : 1}>
            <rect x={(520 - w) / 2} y={y} width={w} height={H} rx="14" fill={color} opacity={dim ? 0.75 : 1} />
            <text x="260" y={y + H / 2 + 6} textAnchor="middle" fill="#fff" fontSize="17" fontWeight="800">
              {label}
            </text>
            {i < rows.length - 1 && (
              <path
                d={`M254 ${y + H + 3} L266 ${y + H + 3} L260 ${y + H + GAP - 4} Z`}
                fill="#94a3b8"
              />
            )}
          </g>
        )
      })}
    </svg>
  )
}

export function MotivationConstellation() {
  const items = [
    [90, 80, 'Curiosity'],
    [250, 55, 'Societal need'],
    [400, 90, 'Failure'],
    [130, 200, 'Performance'],
    [290, 230, 'Cost'],
    [420, 200, 'Sustainability'],
  ]
  return (
    <svg className="rm-scene" viewBox="0 0 520 340" role="img" aria-label="Motivation map">
      <rect x="18" y="18" width="484" height="304" rx="18" fill="#fffdf9" stroke="rgba(20,29,46,.1)" />
      <circle cx="260" cy="150" r="34" fill="#7c5cff" className="rm-pulse" />
      <text x="260" y="155" textAnchor="middle" fill="#fff" fontSize="11" fontWeight="800">
        Motive
      </text>
      {items.map(([x, y, label], i) => (
        <g key={label}>
          <line x1="260" y1="150" x2={x} y2={y} stroke="#a5b4fc" strokeWidth="2.5" className="rm-draw" />
          <circle cx={x} cy={y} r="28" fill="#2563eb" opacity="0.9" className="rm-anim-rise" style={{ animationDelay: `${i * 0.08}s` }} />
          <text x={x} y={y + 4} textAnchor="middle" fill="#fff" fontSize="10" fontWeight="750">
            {label}
          </text>
        </g>
      ))}
    </svg>
  )
}

export function ResearchLandscape() {
  const types = [
    ['Descriptive', 'What exists?'],
    ['Analytical', 'Why / how linked?'],
    ['Applied', 'Solve a real need'],
    ['Fundamental', 'Expand knowledge'],
    ['Quantitative', 'Measure & test'],
    ['Qualitative', 'Meaning & depth'],
  ]
  return (
    <svg className="rm-scene" viewBox="0 0 520 340" role="img" aria-label="Types of research">
      <rect x="18" y="18" width="484" height="304" rx="18" fill="#fffdf9" stroke="rgba(20,29,46,.1)" />
      {types.map(([t, q], i) => {
        const col = i % 3
        const row = Math.floor(i / 3)
        const x = 50 + col * 150
        const y = 55 + row * 130
        return (
          <g key={t} className="rm-anim-rise" style={{ animationDelay: `${i * 0.08}s` }}>
            <rect x={x} y={y} width="130" height="95" rx="14" fill={i % 2 ? '#eff6ff' : '#f0fdfa'} stroke="rgba(37,99,235,.2)" />
            <text x={x + 65} y={y + 38} textAnchor="middle" fill="#0f2744" fontSize="14" fontWeight="800">
              {t}
            </text>
            <text x={x + 65} y={y + 62} textAnchor="middle" fill="#5b6577" fontSize="11">
              {q}
            </text>
          </g>
        )
      })}
    </svg>
  )
}

export function IntegrityChain({ breakAt = -1 }) {
  const nodes = ['Question', 'Data', 'Analysis', 'Interpretation', 'Publication']
  return (
    <svg className="rm-scene" viewBox="0 0 520 340" role="img" aria-label="Research integrity chain">
      <rect x="18" y="18" width="484" height="304" rx="18" fill="#fffdf9" stroke="rgba(20,29,46,.1)" />
      {nodes.map((n, i) => {
        const x = 55 + i * 90
        const broken = breakAt === i
        return (
          <g key={n}>
            <rect
              x={x}
              y="140"
              width="78"
              height="48"
              rx="12"
              fill={broken ? '#fee2e2' : '#dcfce7'}
              stroke={broken ? '#dc2626' : '#15803d'}
            />
            <text x={x + 39} y="169" textAnchor="middle" fill="#141d2e" fontSize="10" fontWeight="750">
              {n}
            </text>
            {i < nodes.length - 1 && (
              <path
                d={`M${x + 78} 164 H${x + 90}`}
                stroke={breakAt === i ? '#dc2626' : '#15803d'}
                strokeWidth="3"
                strokeDasharray={breakAt === i ? '4 4' : '0'}
              />
            )}
          </g>
        )
      })}
      <text x="260" y="250" textAnchor="middle" fill="#5b6577" fontSize="13">
        {breakAt >= 0 ? 'Misconduct breaks trust at a specific link.' : 'Integrity must hold across the full evidence chain.'}
      </text>
    </svg>
  )
}

export function MisconductCompare() {
  const items = [
    ['Fabrication', 'Inventing data', '#dc2626'],
    ['Falsification', 'Altering data', '#d97706'],
    ['Plagiarism', 'Using without credit', '#7c5cff'],
  ]
  return (
    <svg className="rm-scene" viewBox="0 0 520 340" role="img" aria-label="Research misconduct types">
      <rect x="18" y="18" width="484" height="304" rx="18" fill="#fffdf9" stroke="rgba(20,29,46,.1)" />
      {items.map(([t, d, c], i) => (
        <g key={t} className="rm-anim-rise" style={{ animationDelay: `${i * 0.12}s` }}>
          <rect x="50" y={55 + i * 85} width="420" height="70" rx="14" fill="#fff" stroke={c} strokeWidth="2" />
          <circle cx="95" cy={90 + i * 85} r="22" fill={c} />
          <text x="95" y={95 + i * 85} textAnchor="middle" fill="#fff" fontSize="12" fontWeight="800">
            {i + 1}
          </text>
          <text x="140" y={82 + i * 85} fill="#0f2744" fontSize="16" fontWeight="800">
            {t}
          </text>
          <text x="140" y={106 + i * 85} fill="#5b6577" fontSize="13">
            {d}
          </text>
        </g>
      ))}
    </svg>
  )
}

export function AuthorshipMatrix() {
  const qs = ['Who conceived?', 'Who contributed?', 'Who wrote?', 'Who approved?', 'Who is accountable?']
  return (
    <svg className="rm-scene" viewBox="0 0 520 340" role="img" aria-label="Authorship ethics">
      <rect x="18" y="18" width="484" height="304" rx="18" fill="#fffdf9" stroke="rgba(20,29,46,.1)" />
      {qs.map((q, i) => (
        <g key={q} className="rm-anim-rise" style={{ animationDelay: `${i * 0.08}s` }}>
          <rect x="40" y={45 + i * 52} width="440" height="42" rx="12" fill={i === 4 ? '#eff6ff' : '#fff'} stroke="rgba(37,99,235,.22)" />
          <text x="60" y={72 + i * 52} fill="#0f2744" fontSize="14" fontWeight="750">
            {q}
          </text>
        </g>
      ))}
    </svg>
  )
}

export function LiteratureFunnel({ focus = null }) {
  const layers = [
    ['~10,000 papers', 462],
    ['Keywords + databases', 392],
    ['Titles & abstracts', 322],
    ['Full-text reading', 252],
    ['Relevant evidence', 182],
    ['Research gap', 120],
  ]
  const H = 40
  const GAP = 8
  const y0 = 30
  return (
    <svg className="rm-scene" viewBox="0 0 520 340" role="img" aria-label="Literature review funnel">
      <rect x="14" y="14" width="492" height="312" rx="18" fill="#fffdf9" stroke="rgba(20,29,46,.1)" />
      {/* funnel walls */}
      {layers.slice(0, -1).map((_, i) => {
        const yTop = y0 + i * (H + GAP)
        const wTop = layers[i][1]
        const wBot = layers[i + 1][1]
        const xTopL = (520 - wTop) / 2
        const xBotL = (520 - wBot) / 2
        return (
          <polygon
            key={`lw-${i}`}
            points={`${xTopL},${yTop + H} ${520 - xTopL},${yTop + H} ${520 - xBotL},${yTop + H + GAP} ${xBotL},${yTop + H + GAP}`}
            fill="#1d4f8f"
            opacity="0.06"
          />
        )
      })}
      {layers.map(([label, w], i) => {
        const x = (520 - w) / 2
        const y = y0 + i * (H + GAP)
        const isLast = i === layers.length - 1
        const dim = focus !== null && focus !== i
        return (
          <g key={label} className="rm-anim-rise" style={{ animationDelay: `${i * 0.09}s` }} opacity={dim ? 0.42 : 1}>
            <rect
              x={x}
              y={y}
              width={w}
              height={H}
              rx="12"
              fill={isLast ? '#0f9d94' : '#2563eb'}
              opacity={0.72 + i * 0.045}
              stroke={focus === i ? '#d97706' : 'none'}
              strokeWidth={focus === i ? 3 : 0}
            />
            <text x="260" y={y + H / 2 + 5} textAnchor="middle" fill="#fff" fontSize="15" fontWeight="800">
              {label}
            </text>
          </g>
        )
      })}
    </svg>
  )
}

export function AnalysisVsSynthesis() {
  return (
    <svg className="rm-scene" viewBox="0 0 520 340" role="img" aria-label="Analysis versus synthesis">
      <rect x="18" y="18" width="484" height="304" rx="18" fill="#fffdf9" stroke="rgba(20,29,46,.1)" />
      <rect x="40" y="50" width="200" height="240" rx="16" fill="#eff6ff" stroke="#2563eb" />
      <text x="140" y="85" textAnchor="middle" fill="#2563eb" fontSize="16" fontWeight="850">
        Analysis
      </text>
      {['Method', 'Dataset', 'Result', 'Limits'].map((t, i) => (
        <g key={t}>
          <rect x="65" y={110 + i * 40} width="150" height="28" rx="8" fill="#fff" />
          <text x="140" y={129 + i * 40} textAnchor="middle" fill="#141d2e" fontSize="12">
            {t}
          </text>
        </g>
      ))}
      <rect x="280" y="50" width="200" height="240" rx="16" fill="#f0fdfa" stroke="#0f9d94" />
      <text x="380" y="85" textAnchor="middle" fill="#0f9d94" fontSize="16" fontWeight="850">
        Synthesis
      </text>
      {['Patterns', 'Agreement', 'Conflicts', 'Gap'].map((t, i) => (
        <g key={t}>
          <rect x="305" y={110 + i * 40} width="150" height="28" rx="8" fill="#fff" />
          <text x="380" y={129 + i * 40} textAnchor="middle" fill="#141d2e" fontSize="12">
            {t}
          </text>
        </g>
      ))}
    </svg>
  )
}

export function CitationNetwork() {
  return (
    <svg className="rm-scene" viewBox="0 0 520 340" role="img" aria-label="Citation knowledge flow">
      <defs>
        <marker id="rmCiteArrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M0 0 L10 5 L0 10 z" fill="#64748b" />
        </marker>
      </defs>
      <rect x="18" y="18" width="484" height="304" rx="18" fill="#fffdf9" stroke="rgba(20,29,46,.1)" />
      <path d="M158 147 Q205 118 217 126" stroke="#64748b" strokeWidth="3.5" fill="none" markerEnd="url(#rmCiteArrow)" className="rm-draw" />
      <path d="M296 128 Q335 140 357 158" stroke="#64748b" strokeWidth="3.5" fill="none" markerEnd="url(#rmCiteArrow)" className="rm-draw" />
      <circle cx="120" cy="160" r="42" fill="#2563eb" />
      <text x="120" y="167" textAnchor="middle" fill="#fff" fontSize="20" fontWeight="850">
        A
      </text>
      <circle cx="260" cy="110" r="42" fill="#0f9d94" />
      <text x="260" y="117" textAnchor="middle" fill="#fff" fontSize="20" fontWeight="850">
        B
      </text>
      <circle cx="400" cy="180" r="42" fill="#7c5cff" />
      <text x="400" y="187" textAnchor="middle" fill="#fff" fontSize="20" fontWeight="850">
        C
      </text>
      <text x="260" y="286" textAnchor="middle" fill="#5b6577" fontSize="14">
        Citation is knowledge flow: A cites B cites C
      </text>
    </svg>
  )
}

export function PatentPipeline({ stage = 4, focus = '' }) {
  const steps = ['Idea', 'Prior Art', 'File', 'Publish', 'Examine', 'Grant', 'Use']
  const clamped = Math.max(0, Math.min(stage, steps.length - 1))
  // Document slides along the pipeline as stage advances
  const docX = 48 + clamped * 62
  const gateLabel = focus || steps[clamped]
  return (
    <svg className="rm-scene" viewBox="0 0 520 340" role="img" aria-label={`Patent pipeline — ${gateLabel}`}>
      <defs>
        <linearGradient id="rmPatRail" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <filter id="rmDocShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="6" stdDeviation="4" floodColor="#0f2744" floodOpacity="0.22" />
        </filter>
      </defs>
      <rect x="14" y="14" width="492" height="312" rx="18" fill="#fffdf9" stroke="rgba(20,29,46,.1)" />
      <text x="30" y="42" fill="#0f2744" fontSize="13" fontWeight="850">
        Patent journey
      </text>
      <text x="490" y="42" textAnchor="end" fill="#d97706" fontSize="12" fontWeight="800">
        Now: {gateLabel}
      </text>

      {/* rail */}
      <line x1="42" y1="88" x2="478" y2="88" stroke="#e2e8f0" strokeWidth="6" strokeLinecap="round" />
      <line
        x1="42"
        y1="88"
        x2={42 + (clamped / (steps.length - 1)) * 436}
        y2="88"
        stroke="url(#rmPatRail)"
        strokeWidth="6"
        strokeLinecap="round"
        className="rm-draw"
      />

      {steps.map((s, i) => {
        const x = 48 + i * 62
        const on = i <= clamped
        const now = i === clamped
        return (
          <g key={s}>
            <circle
              cx={x + 12}
              cy="88"
              r={now ? 15 : 11}
              fill={on ? (now ? '#d97706' : '#2563eb') : '#e2e8f0'}
              stroke={now ? '#fff7ed' : 'none'}
              strokeWidth="3"
            />
            <text x={x + 12} y="118" textAnchor="middle" fill={now ? '#9a6700' : '#0f2744'} fontSize="9.5" fontWeight={now ? '850' : '700'}>
              {s}
            </text>
          </g>
        )
      })}

      {/* moving application document — outer <g> holds position, inner animates */}
      <g filter="url(#rmDocShadow)" transform={`translate(${docX - 20}, 145)`} style={{ transition: 'transform 0.6s ease' }}>
        <g className="rm-anim-rise">
          <rect x="0" y="0" width="72" height="96" rx="8" fill="#fff" stroke="#d97706" strokeWidth="2.5" />
          <rect x="10" y="14" width="52" height="6" rx="2" fill="#fed7aa" />
          <rect x="10" y="28" width="44" height="5" rx="2" fill="#e2e8f0" />
          <rect x="10" y="40" width="48" height="5" rx="2" fill="#e2e8f0" />
          <rect x="10" y="52" width="36" height="5" rx="2" fill="#e2e8f0" />
          <rect x="10" y="70" width="52" height="16" rx="4" fill="#fff7ed" stroke="#d97706" />
          <text x="36" y="82" textAnchor="middle" fill="#9a6700" fontSize="11" fontWeight="850">
            SPEC
          </text>
        </g>
      </g>

      {/* gate callouts under document */}
      <path
        d={`M${docX + 16} 145 V136`}
        stroke="#d97706"
        strokeWidth="2.5"
        strokeDasharray="3 3"
      />
      <text x="260" y="310" textAnchor="middle" fill="#5b6577" fontSize="12">
        One invention document advances through legal gates — the story continues.
      </text>
    </svg>
  )
}

export function PriorArtScan() {
  return (
    <svg className="rm-scene" viewBox="0 0 520 340" role="img" aria-label="Prior art search">
      <defs>
        <radialGradient id="rmScanGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#0f2744" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect x="18" y="18" width="484" height="304" rx="18" fill="#0f2744" />
      <text x="30" y="48" fill="#e2e8f0" fontSize="13" fontWeight="850">
        Prior-art searchlight
      </text>
      {Array.from({ length: 24 }).map((_, i) => (
        <rect
          key={i}
          x={48 + (i % 8) * 54}
          y={70 + Math.floor(i / 8) * 58}
          width="40"
          height="42"
          rx="6"
          fill="#1e293b"
          stroke="#334155"
        />
      ))}
      <circle cx="260" cy="160" r="78" fill="url(#rmScanGlow)" />
      <circle cx="260" cy="160" r="70" fill="none" stroke="#fbbf24" strokeWidth="2.5" opacity="0.85" className="rm-pulse" />
      <rect x="252" y="48" width="6" height="224" fill="#fbbf24" className="rm-scan-bar" opacity="0.75" />
      <text x="260" y="300" textAnchor="middle" fill="#e2e8f0" fontSize="12">
        Patents + publications + NPL before the priority date
      </text>
    </svg>
  )
}

export function CopyrightLayer({ focus = null }) {
  const layers = [
    [58, 34, 404, 244, '#7c5cff', '© Exclusive rights'],
    [100, 74, 320, 164, '#2563eb', 'Bundle of rights'],
    [142, 114, 236, 84, '#0f9d94', 'Original expression'],
  ]
  return (
    <svg className="rm-scene" viewBox="0 0 520 340" role="img" aria-label="Copyright protection layers">
      <defs>
        <filter id="rmCopyDepth" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="8" stdDeviation="6" floodColor="#0f2744" floodOpacity="0.14" />
        </filter>
      </defs>
      <rect x="14" y="14" width="492" height="312" rx="18" fill="#fffdf9" stroke="rgba(20,29,46,.1)" />
      {layers.map(([x, y, w, h, color, label], i) => {
        const active = focus === i
        const dim = focus !== null && !active
        return (
          <g key={label} className="rm-layer" style={{ animationDelay: `${i * 0.14}s` }} filter="url(#rmCopyDepth)" opacity={dim ? 0.55 : 1}>
            <rect
              x={x}
              y={y}
              width={w}
              height={h}
              rx="16"
              fill={color}
              opacity={0.16 + i * 0.09}
              stroke={active ? '#d97706' : color}
              strokeWidth={active ? 4 : 3}
            />
            <text x={x + w / 2} y={i === 2 ? y + h / 2 + 6 : y + 30} textAnchor="middle" fill={color} fontSize={i === 2 ? 17 : 15} fontWeight="850">
              {label}
            </text>
          </g>
        )
      })}
      <text x="260" y="314" textAnchor="middle" fill="#5b6577" fontSize="13">
        Protection wraps the expression — not the underlying idea.
      </text>
    </svg>
  )
}

export function TrademarkIdentity() {
  return (
    <svg className="rm-scene" viewBox="0 0 520 340" role="img" aria-label="Trademark identity">
      <defs>
        <filter id="rmTmDepth">
          <feDropShadow dx="0" dy="10" stdDeviation="7" floodColor="#0f2744" floodOpacity="0.18" />
        </filter>
      </defs>
      <rect x="18" y="18" width="484" height="304" rx="18" fill="#fffdf9" stroke="rgba(20,29,46,.1)" />
      <text x="260" y="48" textAnchor="middle" fill="#0f2744" fontSize="14" fontWeight="850">
        Marketplace identity
      </text>
      <g filter="url(#rmTmDepth)">
        <rect x="55" y="90" width="150" height="130" rx="14" fill="#f1f5f9" stroke="#94a3b8" />
        <text x="130" y="145" textAnchor="middle" fill="#64748b" fontSize="13" fontWeight="700">
          Generic device
        </text>
        <text x="130" y="168" textAnchor="middle" fill="#94a3b8" fontSize="11">
          no distinctive mark
        </text>
      </g>
      <path d="M220 155 H275" stroke="#7c5cff" strokeWidth="3" className="rm-draw" />
      <polygon points="275,148 290,155 275,162" fill="#7c5cff" />
      <g filter="url(#rmTmDepth)" className="rm-anim-rise">
        <rect x="300" y="75" width="170" height="160" rx="16" fill="#2563eb" />
        <text x="385" y="145" textAnchor="middle" fill="#fff" fontSize="20" fontWeight="900">
          EcoSense
        </text>
        <text x="385" y="175" textAnchor="middle" fill="#dbeafe" fontSize="12">
          ™ search → ® register
        </text>
        <rect x="320" y="195" width="130" height="22" rx="8" fill="#1d4ed8" />
        <text x="385" y="210" textAnchor="middle" fill="#bfdbfe" fontSize="10" fontWeight="700">
          Source signal for buyers
        </text>
      </g>
      <text x="260" y="310" textAnchor="middle" fill="#5b6577" fontSize="12">
        A trademark separates your product from look-alikes in the market.
      </text>
    </svg>
  )
}

export function IndustrialDesignScene() {
  return (
    <svg className="rm-scene" viewBox="0 0 520 340" role="img" aria-label="Industrial design">
      <defs>
        <linearGradient id="rmDevice" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#e0f2fe" />
          <stop offset="100%" stopColor="#bae6fd" />
        </linearGradient>
        <filter id="rmDesDepth">
          <feDropShadow dx="0" dy="12" stdDeviation="8" floodColor="#0f2744" floodOpacity="0.2" />
        </filter>
      </defs>
      <rect x="18" y="18" width="484" height="304" rx="18" fill="#fffdf9" stroke="rgba(20,29,46,.1)" />
      <text x="30" y="48" fill="#0f2744" fontSize="13" fontWeight="850">
        EcoSense enclosure — appearance rights
      </text>
      {/* 3D-ish product object */}
      <g filter="url(#rmDesDepth)" className="rm-layer">
        <polygon points="180,90 320,90 360,130 220,130" fill="#7dd3fc" opacity="0.85" />
        <polygon points="220,130 360,130 360,230 220,230" fill="url(#rmDevice)" stroke="#0284c7" strokeWidth="2" />
        <polygon points="180,90 220,130 220,230 180,190" fill="#38bdf8" opacity="0.75" />
        <circle cx="290" cy="175" r="28" fill="none" stroke="#d97706" strokeWidth="3" strokeDasharray="5 4" className="rm-pulse" />
        <text x="290" y="180" textAnchor="middle" fill="#9a6700" fontSize="10" fontWeight="800">
          form
        </text>
      </g>
      <rect x="40" y="250" width="140" height="50" rx="10" fill="#eff6ff" stroke="#2563eb" />
      <text x="110" y="272" textAnchor="middle" fill="#2563eb" fontSize="13" fontWeight="800">
        Function
      </text>
      <text x="110" y="289" textAnchor="middle" fill="#64748b" fontSize="11">
        how it works
      </text>
      <rect x="340" y="250" width="140" height="50" rx="10" fill="#fff7ed" stroke="#d97706" />
      <text x="410" y="272" textAnchor="middle" fill="#d97706" fontSize="13" fontWeight="800">
        Appearance
      </text>
      <text x="410" y="289" textAnchor="middle" fill="#64748b" fontSize="11">
        design right protects
      </text>
    </svg>
  )
}

export function GiMap() {
  return (
    <svg className="rm-scene" viewBox="0 0 520 340" role="img" aria-label="Geographical indication">
      <defs>
        <filter id="rmGiDepth">
          <feDropShadow dx="0" dy="8" stdDeviation="6" floodColor="#0f2744" floodOpacity="0.16" />
        </filter>
      </defs>
      <rect x="18" y="18" width="484" height="304" rx="18" fill="#fffdf9" stroke="rgba(20,29,46,.1)" />
      <text x="30" y="48" fill="#0f2744" fontSize="13" fontWeight="850">
        Origin becomes identity
      </text>
      <g filter="url(#rmGiDepth)">
        <ellipse cx="200" cy="165" rx="100" ry="110" fill="#dcfce7" stroke="#15803d" strokeWidth="3" />
        <path
          d="M140 140 C160 100, 220 95, 250 130 C280 165, 250 210, 200 215 C150 220, 120 180, 140 140"
          fill="#bbf7d0"
          opacity="0.7"
        />
        <circle cx="230" cy="150" r="9" fill="#dc2626" className="rm-pulse" />
        <text x="200" y="250" textAnchor="middle" fill="#15803d" fontSize="11" fontWeight="800">
          Region of origin
        </text>
      </g>
      <path d="M240 150 C300 120, 330 130, 350 145" stroke="#d97706" strokeWidth="3" fill="none" className="rm-draw" />
      <g filter="url(#rmGiDepth)" className="rm-anim-rise">
        <rect x="350" y="110" width="120" height="90" rx="14" fill="#d97706" />
        <text x="410" y="148" textAnchor="middle" fill="#fff" fontSize="13" fontWeight="850">
          GI product
        </text>
        <text x="410" y="170" textAnchor="middle" fill="#ffedd5" fontSize="10">
          reputation + quality
        </text>
      </g>
      <text x="260" y="310" textAnchor="middle" fill="#5b6577" fontSize="12">
        Place → characteristics → community right
      </text>
    </svg>
  )
}

export function IpEcosystem({ highlight = '' }) {
  const items = [
    [110, 90, 'Patent', '#2563eb'],
    [260, 60, 'Copyright', '#7c5cff'],
    [410, 90, 'Trademark', '#0f9d94'],
    [160, 220, 'Design', '#d97706'],
    [360, 220, 'GI', '#15803d'],
  ]
  return (
    <svg className="rm-scene" viewBox="0 0 520 340" role="img" aria-label="IP ecosystem">
      <defs>
        <filter id="rmEcoDepth">
          <feDropShadow dx="0" dy="6" stdDeviation="5" floodColor="#0f2744" floodOpacity="0.18" />
        </filter>
      </defs>
      <rect x="18" y="18" width="484" height="304" rx="18" fill="#fffdf9" stroke="rgba(20,29,46,.1)" />
      <circle cx="260" cy="160" r="40" fill="#0f2744" filter="url(#rmEcoDepth)" />
      <text x="260" y="156" textAnchor="middle" fill="#fff" fontSize="11" fontWeight="800">
        Creation
      </text>
      <text x="260" y="172" textAnchor="middle" fill="#94a3b8" fontSize="9">
        EcoSense
      </text>
      {items.map(([x, y, label, color], i) => {
        const on = !highlight || highlight === label
        return (
          <g key={label} className="rm-anim-rise" style={{ animationDelay: `${i * 0.07}s` }} opacity={on ? 1 : 0.35}>
            <line x1="260" y1="160" x2={x} y2={y} stroke={on ? color : '#cbd5e1'} strokeWidth={on ? 2.5 : 1.5} />
            <circle cx={x} cy={y} r={on && highlight ? 38 : 32} fill={color} filter="url(#rmEcoDepth)" />
            <text x={x} y={y + 4} textAnchor="middle" fill="#fff" fontSize="11" fontWeight="800">
              {label}
            </text>
          </g>
        )
      })}
    </svg>
  )
}

export function InnovationJourney() {
  const steps = ['Problem', 'Research', 'Literature', 'Ethics', 'Knowledge', 'IP', 'Value']
  const pts = steps.map((s, i) => ({ s, x: 60 + i * 67, y: 306 - i * 28 }))
  const line = pts.map((p, i) => `${i ? 'L' : 'M'}${p.x} ${p.y}`).join(' ')
  const area = `${line} L${pts[pts.length - 1].x} 356 L${pts[0].x} 356 Z`
  return (
    <svg className="rm-scene" viewBox="0 0 520 400" role="img" aria-label="Complete innovation journey from problem to protected value">
      <defs>
        <linearGradient id="rmJourneyArea" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#38bdf8" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="rmJourneyLine" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#38bdf8" />
          <stop offset="72%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#22c55e" />
        </linearGradient>
      </defs>
      <rect x="14" y="14" width="492" height="372" rx="20" fill="#0f2744" />
      <text x="36" y="52" fill="#fbbf24" fontSize="16" fontWeight="850">
        The innovation journey
      </text>
      <text x="484" y="52" textAnchor="end" fill="#93c5fd" fontSize="12.5" fontWeight="700">
        value grows →
      </text>
      <path d={area} fill="url(#rmJourneyArea)" />
      <path d={line} fill="none" stroke="url(#rmJourneyLine)" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" className="rm-draw" />
      {pts.map((p, i) => {
        const fill = i === 6 ? '#22c55e' : i === 5 ? '#d97706' : '#2563eb'
        return (
          <g key={p.s} className="rm-anim-rise" style={{ animationDelay: `${i * 0.09}s` }}>
            <circle cx={p.x} cy={p.y} r="24" fill={fill} stroke="#0f2744" strokeWidth="3" />
            <text x={p.x} y={p.y + 6} textAnchor="middle" fill="#fff" fontSize="15" fontWeight="850">
              {i + 1}
            </text>
            <text x={p.x} y={p.y - 34} textAnchor="middle" fill="#e2e8f0" fontSize="13" fontWeight="750">
              {p.s}
            </text>
          </g>
        )
      })}
    </svg>
  )
}

export function CaseTimeline({ title, events }) {
  const n = Math.max(events.length, 1)
  const railY = 104
  const slot = 480 / n
  const midStages = ['IP Issue', 'Action', 'Outcome']
  const stageName = (i) =>
    i === 0 ? 'Background' : i === n - 1 ? 'Learning' : midStages[Math.min(i - 1, midStages.length - 1)]
  return (
    <svg className="rm-scene" viewBox="0 0 520 340" role="img" aria-label={`${title} timeline`}>
      <defs>
        <linearGradient id="rmCaseRail" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
      </defs>
      <rect x="16" y="16" width="488" height="308" rx="18" fill="#fffdf9" stroke="rgba(20,29,46,.1)" />
      <text x="260" y="46" textAnchor="middle" fill="#0f2744" fontSize="17" fontWeight="850">
        {title}
      </text>
      <line x1="20" y1={railY} x2="500" y2={railY} stroke="#e2e8f0" strokeWidth="6" strokeLinecap="round" />
      <line x1="20" y1={railY} x2="500" y2={railY} stroke="url(#rmCaseRail)" strokeWidth="6" strokeLinecap="round" className="rm-draw" />
      {events.map(([label, detail], i) => {
        const cx = 20 + slot * i + slot / 2
        const accent = i === n - 1 ? '#d97706' : '#2563eb'
        return (
          <g key={label} className="rm-anim-rise" style={{ animationDelay: `${i * 0.12}s` }}>
            <circle cx={cx} cy={railY} r="15" fill="#fff" stroke={accent} strokeWidth="3.5" />
            <text x={cx} y={railY + 5} textAnchor="middle" fill={accent} fontSize="13" fontWeight="850">
              {i + 1}
            </text>
            <foreignObject x={20 + slot * i + 5} y={railY + 26} width={slot - 10} height={200}>
              <div className="rm-case-card" style={{ borderTopColor: accent }}>
                <em style={{ color: accent }}>{stageName(i)}</em>
                <strong>{label}</strong>
                <span>{detail}</span>
              </div>
            </foreignObject>
          </g>
        )
      })}
    </svg>
  )
}

export function DocumentJourney({ stages = ['Draft', 'File', 'Examine', 'Register'] }) {
  return (
    <svg className="rm-scene" viewBox="0 0 520 340" role="img" aria-label="Document journey">
      <rect x="18" y="18" width="484" height="304" rx="18" fill="#fffdf9" stroke="rgba(20,29,46,.1)" />
      {stages.map((s, i) => {
        const x = 45 + i * 115
        return (
          <g key={s} className="rm-doc-move" style={{ animationDelay: `${i * 0.12}s` }}>
            <rect x={x} y="100" width="88" height="110" rx="10" fill="#fff" stroke="#2563eb" strokeWidth="2" />
            <rect x={x + 12} y="118" width="64" height="8" rx="3" fill="#bfdbfe" />
            <rect x={x + 12} y="136" width="54" height="6" rx="2" fill="#e2e8f0" />
            <rect x={x + 12} y="150" width="60" height="6" rx="2" fill="#e2e8f0" />
            <text x={x + 44} y="240" textAnchor="middle" fill="#0f2744" fontSize="12" fontWeight="800">
              {s}
            </text>
            {i < stages.length - 1 && (
              <path d={`M${x + 92} 155 H${x + 110}`} stroke="#d97706" strokeWidth="3" className="rm-draw" />
            )}
          </g>
        )
      })}
    </svg>
  )
}

export function DecisionTree({ question = 'Protect?', left = 'Patent', right = 'Secret' }) {
  return (
    <svg className="rm-scene" viewBox="0 0 520 340" role="img" aria-label="Decision tree">
      <rect x="18" y="18" width="484" height="304" rx="18" fill="#fffdf9" stroke="rgba(20,29,46,.1)" />
      <rect x="175" y="50" width="170" height="54" rx="14" fill="#0f2744" />
      <text x="260" y="84" textAnchor="middle" fill="#fff" fontSize="14" fontWeight="800">
        {question}
      </text>
      <path d="M200 104 L120 170" stroke="#94a3b8" strokeWidth="3" className="rm-draw" />
      <path d="M320 104 L400 170" stroke="#94a3b8" strokeWidth="3" className="rm-draw" />
      <rect x="50" y="170" width="150" height="70" rx="14" fill="#eff6ff" stroke="#2563eb" strokeWidth="2" />
      <text x="125" y="212" textAnchor="middle" fill="#2563eb" fontSize="14" fontWeight="850">
        {left}
      </text>
      <rect x="320" y="170" width="150" height="70" rx="14" fill="#f0fdfa" stroke="#0f9d94" strokeWidth="2" />
      <text x="395" y="212" textAnchor="middle" fill="#0f9d94" fontSize="14" fontWeight="850">
        {right}
      </text>
      <text x="260" y="290" textAnchor="middle" fill="#5b6577" fontSize="12">
        Strategy begins with a clear fork — not a default filing.
      </text>
    </svg>
  )
}
