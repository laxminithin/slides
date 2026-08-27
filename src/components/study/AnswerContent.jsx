/** Shared answer presentation helpers — VTU exam-friendly formatting */

export function Keyword({ children }) {
  return <strong className="ans-kw">{children}</strong>
}

export function AnsSection({ title, children }) {
  return (
    <section className="ans-section">
      {title && <h4 className="ans-heading">{title}</h4>}
      {children}
    </section>
  )
}

export function AnsLead({ children }) {
  return <p className="ans-lead">{children}</p>
}

export function AnsPoints({ items }) {
  return (
    <ul className="ans-points">
      {items.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  )
}

export function AnsTable({ headers, rows, caption }) {
  return (
    <div className="ans-table-wrap">
      {caption && <p className="ans-table-caption">{caption}</p>}
      <table className="ans-table">
        <thead>
          <tr>
            {headers.map((h) => (
              <th key={h}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i}>
              {row.map((cell, j) => (
                <td key={j}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export function AnsCards({ items }) {
  return (
    <div className="ans-cards">
      {items.map((item) => (
        <article key={item.title} className="ans-card">
          <h5>{item.title}</h5>
          {item.question && <p className="ans-card-q">{item.question}</p>}
          <p>{item.body}</p>
          {item.example && (
            <p className="ans-card-eg">
              <span>Example:</span> {item.example}
            </p>
          )}
        </article>
      ))}
    </div>
  )
}

export function AnsFlow({ steps }) {
  return (
    <div className="ans-flow" aria-label="Process flow">
      {steps.map((step, i) => (
        <div key={step} className="ans-flow-item">
          <span className="ans-flow-node">{step}</span>
          {i < steps.length - 1 && <span className="ans-flow-arrow" aria-hidden="true">→</span>}
        </div>
      ))}
    </div>
  )
}

export function AnsSummary({ children }) {
  return (
    <aside className="ans-summary">
      <span className="ans-summary-label">Exam Summary</span>
      <p>{children}</p>
    </aside>
  )
}

export function AnsVsGrid({ left, right }) {
  return (
    <div className="ans-vs">
      <div className="ans-vs-pane">
        <h5>{left.title}</h5>
        <ul>
          {left.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
      <div className="ans-vs-pane accent">
        <h5>{right.title}</h5>
        <ul>
          {right.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}
