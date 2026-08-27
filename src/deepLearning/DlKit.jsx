import { BookOpen, FileQuestion, FlaskConical, ListChecks, Sparkles } from 'lucide-react'
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
    'dl-board',
    reverse ? 'reverse' : '',
    full ? 'full' : '',
    layoutModifier,
    tone ? `tone-${tone}` : '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={classes} data-dl-tone={tone || undefined}>
      <aside className="dl-story" aria-label="Lesson journey">
        {story.map((item, index) => (
          <span
            key={typeof item === 'string' ? item : item.key || index}
            className={`${index <= active ? 'lit' : ''} ${index === active ? 'now' : ''}`.trim()}
          >
            {item}
          </span>
        ))}
      </aside>
      <section className="dl-copy">{children}</section>
      {!full && <section className="dl-visual">{visual}</section>}
      {takeaway && (
        <aside className="dl-takeaway">
          <strong>Takeaway</strong>
          <span>{takeaway}</span>
        </aside>
      )}
    </div>
  )
}

export function Lead({ children }) {
  return <p className="dl-lead">{children}</p>
}

export function Points({ items }) {
  return (
    <ul className="dl-points">
      {items.map((item, index) => (
        <li key={typeof item === 'string' ? item : item.key || index}>{item}</li>
      ))}
    </ul>
  )
}

export function Definition({ term, children }) {
  return (
    <div className="dl-definition">
      <span>Definition</span>
      <strong>{term}</strong>
      <p>{children}</p>
    </div>
  )
}

export function Example({ label = 'AI Engineering Connection', children }) {
  return (
    <div className="dl-example">
      <span>{label}</span>
      <p>{children}</p>
    </div>
  )
}

export function Flow({ items }) {
  return (
    <div className="dl-flow">
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
    <div className="dl-cards">
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
    <div className="dl-compare">
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
  return <div className="dl-formula">{children}</div>
}

export function Opener({ moduleNumber, title, question, chips = [] }) {
  return (
    <div className="dl-opener">
      <span className="dl-brand">Module {moduleNumber}</span>
      <h2>{title}</h2>
      <p className="dl-question">{question}</p>
      {chips.length > 0 && (
        <div className="dl-chip-row">
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
    <div className="dl-divider">
      <span className="dl-divider-ghost" aria-hidden>
        {title}
      </span>
      <div className="dl-divider-copy">
        <span className="dl-divider-number">{number}</span>
        <h2>{title}</h2>
        <p>{subtitle}</p>
      </div>
    </div>
  )
}

export function Remember({ children }) {
  return (
    <div className="dl-example">
      <span>Remember</span>
      <p>{children}</p>
    </div>
  )
}

export function ResourceHub({ moduleId = 'module-1' }) {
  const links = [
    ['Module Notes', 'Review architectures, definitions and equations.', 'notes', BookOpen],
    [
      'Previous-Year Questions',
      'Practise exam-style questions module by module.',
      'previous-year-questions',
      FileQuestion,
    ],
    ['Practical / Lab', 'Run experiments, observe outputs and document results.', 'lab', FlaskConical],
    ['Quick Revision', 'Scan the essential outcomes before an assessment.', 'notes', ListChecks],
  ]

  return (
    <div className="dl-resource-hub">
      {links.map(([title, text, path, Icon]) => (
        <Link key={title} to={`/deep-learning/${moduleId}/${path}`}>
          <Icon size={22} strokeWidth={1.8} aria-hidden />
          <strong>{title}</strong>
          <span>{text}</span>
        </Link>
      ))}
      <div className="dl-card" style={{ gridColumn: '1 / -1' }}>
        <strong>
          <Sparkles size={16} style={{ marginRight: 6 }} aria-hidden />
          Study Tip
        </strong>
        <span>Connect every model to its data flow, loss function and training signal.</span>
      </div>
    </div>
  )
}
