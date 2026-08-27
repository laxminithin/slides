/** Shared slide layout primitives — art-directed composition system */

export function Lead({ children, className = '' }) {
  return <p className={`lead ${className}`.trim()}>{children}</p>
}

export function Points({ items, className = '' }) {
  return (
    <ul className={`bullets ${className}`.trim()}>
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  )
}

export function Takeaway({ label = 'Takeaway', children }) {
  return (
    <aside className="takeaway">
      <span className="takeaway-label">{label}</span>
      <p className="takeaway-text">{children}</p>
    </aside>
  )
}

export function Callout({ label = 'Key Idea', children, tone = 'idea' }) {
  return (
    <aside className={`takeaway takeaway-${tone}`}>
      <span className="takeaway-label">{label}</span>
      <p className="takeaway-text">{children}</p>
    </aside>
  )
}

/** Soft cream / rounded frame for left-side illustrations */
export function VisualPanel({ children, className = '', label }) {
  return (
    <div className={`visual-panel ${className}`.trim()}>
      {label && <span className="visual-panel-label">{label}</span>}
      <div className="visual-panel-body">{children}</div>
    </div>
  )
}

/** Large takeaway / quote used to balance text-only slides */
export function KeyStatement({ children, label }) {
  return (
    <aside className="key-statement">
      {label && <span className="key-statement-label">{label}</span>}
      <p className="key-statement-text">{children}</p>
    </aside>
  )
}

/** Highlighted definition block for classroom emphasis */
export function DefinitionBlock({ children, label = 'Definition' }) {
  return (
    <blockquote className="definition-block">
      <span className="definition-label">{label}</span>
      <p className="definition-text">{children}</p>
    </blockquote>
  )
}

/** TEMPLATE 2 — Explanation + Visual
 *  ratio options:
 *  - copy-visual (default, text left / visual right ~48/52)
 *  - visual-copy (visual left / text right ~48/52)
 *  - visual-lead (visual left ~40%, text ~60%)
 *  - copy-lead (text ~60%, visual ~40%)
 *  - balanced (50/50)
 *  - copy-only (full-width text compositions)
 */
export function TwoColumn({ children, visual, reverse = false, ratio = 'copy-visual' }) {
  return (
    <div className={`layout-two ${ratio} ${reverse ? 'reverse' : ''}`.trim()}>
      <div className="layout-copy">{children}</div>
      {visual && <div className="layout-visual">{visual}</div>}
    </div>
  )
}

/** TEMPLATE 3 — Visual first (title strip + dominant canvas) */
export function VisualFirst({ lead, visual, takeaway }) {
  return (
    <div className="layout-visual-first">
      {lead && <Lead className="vf-lead">{lead}</Lead>}
      <div className="vf-canvas">{visual}</div>
      {takeaway}
    </div>
  )
}

/** TEMPLATE 4 — Comparison 50/50 */
export function ComparisonLayout({ left, right, footer }) {
  return (
    <div className="layout-compare">
      <div className="compare-pane">{left}</div>
      <div className="compare-divider" aria-hidden="true" />
      <div className="compare-pane">{right}</div>
      {footer && <div className="compare-footer">{footer}</div>}
    </div>
  )
}

/** TEMPLATE 5 — Process / journey path */
export function ProcessPath({ steps, direction = 'horizontal', accentEnds = true }) {
  const count = steps.length
  return (
    <div
      className={`process-path process-${direction}`}
      data-slide-content="true"
      data-steps={count}
      aria-label="Process flow"
    >
      {steps.map((step, i) => {
        const label = typeof step === 'string' ? step : step.label
        const desc = typeof step === 'string' ? null : step.desc
        const isAccent = accentEnds && (i === 0 || i === steps.length - 1)
        return (
          <div key={`${label}-${i}`} className="process-node-wrap">
            <div className={`process-node ${isAccent ? 'accent' : ''}`.trim()}>
              <span className="process-node-label">{label}</span>
              {desc && <span className="process-node-desc">{desc}</span>}
            </div>
            {i < steps.length - 1 && (
              <div className="process-connector" aria-hidden="true" />
            )}
          </div>
        )
      })}
    </div>
  )
}

/** TEMPLATE 6 — Concept + example */
export function ConceptExample({ concept, example }) {
  return (
    <div className="layout-concept-example">
      <div className="ce-concept">{concept}</div>
      <div className="ce-example">{example}</div>
    </div>
  )
}

/** TEMPLATE 7 — Section transition */
export function SectionDivider({ number, title, subtitle }) {
  return (
    <div className="section-slide">
      <div className="section-number">{number}</div>
      <div className="section-copy">
        <h2 className="section-title">{title}</h2>
        {subtitle && <p className="section-sub">{subtitle}</p>}
      </div>
      <div className="section-motif" aria-hidden="true" />
    </div>
  )
}

/** TEMPLATE 1 — Story hook */
export function StoryHook({ statement, support, visual }) {
  return (
    <div className={`layout-hook ${visual ? 'with-visual' : ''}`.trim()}>
      <div className="hook-copy">
        <h2 className="hook-statement">{statement}</h2>
        {support && <p className="hook-support">{support}</p>}
      </div>
      {visual && <div className="hook-visual">{visual}</div>}
    </div>
  )
}

/** Generic stack for stacked compositions */
export function Stack({ children, gap = 'md', className = '' }) {
  return <div className={`stack gap-${gap} ${className}`.trim()}>{children}</div>
}

/** Legacy SlideLayout — maps to TwoColumn / VisualFirst */
export function SlideLayout({ lead, points, visual, callout, wideVisual = false }) {
  if (wideVisual) {
    return (
      <VisualFirst
        lead={lead}
        visual={visual}
        takeaway={
          (points || callout) && (
            <div className="vf-footer">
              {points && <Points items={points} />}
              {callout}
            </div>
          )
        }
      />
    )
  }

  return (
    <TwoColumn
      visual={visual}
      ratio={visual ? 'copy-visual' : 'copy-only'}
    >
      {lead && <Lead>{lead}</Lead>}
      {points && <Points items={points} />}
      {callout}
    </TwoColumn>
  )
}
