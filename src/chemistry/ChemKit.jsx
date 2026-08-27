import { BookOpen, FileQuestion, ListChecks, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'

export function slide({ id, kicker, title, subtitle, content, notes, layout, tone, hideTitle }) {
  return { id, kicker, title, subtitle, content, notes, layout, tone, hideTitle }
}

export function Deck({
  active = 0,
  story = [],
  children,
  visual,
  takeaway,
  reverse = false,
  full = false,
  layout = '',
  tone = 0,
}) {
  const layoutModifier = ['hero', 'exam', 'revision'].includes(layout) ? layout : ''
  const classes = [
    'chem-board',
    reverse ? 'reverse' : '',
    full ? 'full' : '',
    layoutModifier,
    tone ? `tone-${tone}` : '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={classes} data-chem-tone={tone || undefined} data-slide-content="true">
      <aside className="chem-story" aria-label="Lesson journey">
        {story.map((item, index) => (
          <span
            key={typeof item === 'string' ? item : item.key || index}
            className={`${index <= active ? 'lit' : ''} ${index === active ? 'now' : ''}`.trim()}
          >
            {item}
          </span>
        ))}
      </aside>
      <section className="chem-copy" data-slide-content="true">{children}</section>
      {!full && <section className="chem-visual">{visual}</section>}
      {takeaway && (
        <aside className="chem-takeaway">
          <strong>Takeaway</strong>
          <span>{takeaway}</span>
        </aside>
      )}
    </div>
  )
}

export function Lead({ children }) {
  return <p className="chem-lead">{children}</p>
}

export function Points({ items }) {
  return (
    <ul className="chem-points">
      {items.map((item, index) => (
        <li key={typeof item === 'string' ? item : item.key || index}>{item}</li>
      ))}
    </ul>
  )
}

export function Definition({ term, children }) {
  return (
    <div className="chem-definition">
      <span>Definition</span>
      <strong>{term}</strong>
      <p>{children}</p>
    </div>
  )
}

export function Example({ label = 'Engineering Connection', children }) {
  return (
    <div className="chem-example">
      <span>{label}</span>
      <p>{children}</p>
    </div>
  )
}

export function Flow({ items }) {
  return (
    <div className="chem-flow">
      {items.map((item, index) => (
        <span key={typeof item === 'string' ? item : item.key || index}>
          {item}
          {index < items.length - 1 ? <i aria-hidden> →</i> : null}
        </span>
      ))}
    </div>
  )
}

export function Cards({ items }) {
  return (
    <div className="chem-cards">
      {items.map((item, index) => {
        const { title, body } = Array.isArray(item)
          ? { title: item[0], body: item[1] }
          : item

        return (
          <article key={title || index}>
            <strong>{title}</strong>
            <p>{body}</p>
          </article>
        )
      })}
    </div>
  )
}

export function Compare({ leftTitle, leftItems, rightTitle, rightItems }) {
  return (
    <div className="chem-compare">
      <section>
        <h3>{leftTitle}</h3>
        <ul>
          {leftItems.map((item, index) => (
            <li key={typeof item === 'string' ? item : item.key || index}>{item}</li>
          ))}
        </ul>
      </section>
      <section>
        <h3>{rightTitle}</h3>
        <ul>
          {rightItems.map((item, index) => (
            <li key={typeof item === 'string' ? item : item.key || index}>{item}</li>
          ))}
        </ul>
      </section>
    </div>
  )
}

export function Formula({ children }) {
  return <div className="chem-formula">{children}</div>
}

export function Numerical({ given, required, formula, steps, answer }) {
  return (
    <div className="chem-example">
      <span>Worked Numerical</span>
      <div className="chem-cards">
        <article>
          <strong>Given</strong>
          <p>{given}</p>
        </article>
        <article>
          <strong>Required</strong>
          <p>{required}</p>
        </article>
      </div>
      <Formula>{formula}</Formula>
      <ol>
        {steps.map((step, index) => (
          <li key={typeof step === 'string' ? step : step.key || index}>{step}</li>
        ))}
      </ol>
      <p>
        <strong>Answer: </strong>
        {answer}
      </p>
    </div>
  )
}

export function Opener({ moduleNumber, title, question, chips = [] }) {
  return (
    <div className="chem-opener">
      <span className="chem-brand">Module {moduleNumber}</span>
      <h2>{title}</h2>
      <p className="chem-question">{question}</p>
      {chips.length > 0 && (
        <div className="chem-chip-row">
          {chips.map((chip) => (
            <span key={chip}>{chip}</span>
          ))}
        </div>
      )}
    </div>
  )
}

export function Divider({ number, title, subtitle }) {
  return (
    <div className="chem-divider">
      <span className="chem-divider-ghost" aria-hidden>
        {title}
      </span>
      <div className="chem-divider-copy">
        <span className="chem-divider-number">{number}</span>
        <h2>{title}</h2>
        <p>{subtitle}</p>
      </div>
    </div>
  )
}

export function ResourceHub({ moduleId = 'module-1' }) {
  const links = [
    ['Module Notes', 'Review the main ideas, definitions and formulas.', 'notes', BookOpen],
    ['Previous-Year Questions', 'Practise questions arranged for exam preparation.', 'previous-year-questions', FileQuestion],
    ['Quick Revision', 'Scan the essential outcomes before an assessment.', 'notes', ListChecks],
  ]

  return (
    <div className="chem-resource-hub">
      {links.map(([title, text, path, Icon]) => (
        <Link key={title} to={`/chemistry/${moduleId}/${path}`}>
          <Icon size={22} strokeWidth={1.8} aria-hidden />
          <strong>{title}</strong>
          <span>{text}</span>
        </Link>
      ))}
      <div className="chem-card" style={{ gridColumn: '1 / -1' }}>
        <strong>
          <Sparkles size={16} style={{ marginRight: 6 }} aria-hidden />
          Study Tip
        </strong>
        <span>Connect each equation to its conditions, units and one practical example.</span>
      </div>
    </div>
  )
}

export function Remember({ children }) {
  return (
    <div className="chem-example">
      <span>Remember</span>
      <p>{children}</p>
    </div>
  )
}
