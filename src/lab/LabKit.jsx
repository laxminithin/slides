import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { LAB_PROGRAMS } from './catalog'

export function slide(partial) {
  return {
    layout: partial.hideTitle ? 'full' : partial.layout || 'standard',
    tone: 'lab-slide',
    ...partial,
  }
}

export function LabStage({ className = '', children }) {
  return <div className={`lab-stage ${className}`.trim()}>{children}</div>
}

export function LabGrid({ cols = 2, className = '', children }) {
  return (
    <div className={`lab-grid lab-cols-${cols} ${className}`.trim()} style={{ '--lab-cols': cols }}>
      {children}
    </div>
  )
}

export function Callout({ label = 'Remember', children, tone = 'ink' }) {
  return (
    <aside className={`lab-callout tone-${tone}`}>
      <strong>{label}</strong>
      <div>{children}</div>
    </aside>
  )
}

export function Pill({ children, tone = 'ink' }) {
  return <span className={`lab-pill tone-${tone}`}>{children}</span>
}

export function Flow({ items, active = items.length }) {
  return (
    <ol className="lab-flow" aria-label="Execution flow">
      {items.map((item, i) => (
        <li key={item} className={i < active ? 'is-on' : 'is-wait'}>
          <span>{item}</span>
        </li>
      ))}
    </ol>
  )
}

export function Terminal({
  prompt = '[cloudera@quickstart ~]$',
  hive = false,
  lines = [],
  className = '',
}) {
  const ps = hive ? 'hive>' : prompt
  return (
    <div className={`lab-term ${hive ? 'is-hive' : ''} ${className}`.trim()} role="region" aria-label="Terminal">
      <div className="lab-term-bar">
        <span /><span /><span />
        <em>{hive ? 'Hive CLI' : 'Terminal'}</em>
      </div>
      <pre>
        {lines.map((line, i) => {
          if (typeof line === 'string') {
            return <span key={i} className="lab-term-out">{line}{'\n'}</span>
          }
          const kind = line.kind || 'out'
          if (kind === 'cmd') {
            return (
              <span key={i} className="lab-term-cmd">
                <b>{line.prompt || ps}</b> {line.text}{'\n'}
              </span>
            )
          }
          return <span key={i} className={`lab-term-${kind}`}>{line.text}{'\n'}</span>
        })}
      </pre>
    </div>
  )
}

export function CodePane({ lines, highlight = [], dimOthers = true, caption }) {
  return (
    <div className="lab-code">
      {caption && <p className="lab-code-cap">{caption}</p>}
      <pre>
        {lines.map((line, i) => {
          const hot = highlight.includes(i)
          return (
            <span key={i} className={`lab-code-line ${hot ? 'is-hot' : dimOthers && highlight.length ? 'is-dim' : ''}`}>
              <i>{String(i + 1).padStart(2, ' ')}</i>
              {line || ' '}
              {'\n'}
            </span>
          )
        })}
      </pre>
    </div>
  )
}

export function CodeTeach({ lines, highlight = [], what, why, data, caption }) {
  return (
    <div className="lab-code-teach">
      <CodePane lines={lines} highlight={highlight} caption={caption} />
      <div className="lab-code-notes">
        {what && (
          <article>
            <h4>What it does</h4>
            <p>{what}</p>
          </article>
        )}
        {why && (
          <article>
            <h4>Why it is needed</h4>
            <p>{why}</p>
          </article>
        )}
        {data && (
          <article className="is-data">
            <h4>Data at this point</h4>
            <p>{data}</p>
          </article>
        )}
      </div>
    </div>
  )
}

export function DryRunBar({ step, total, label, onPrev, onNext, onRestart, onAuto, auto }) {
  return (
    <div className="lab-drybar" onClick={(e) => e.stopPropagation()} onKeyDown={(e) => e.stopPropagation()}>
      <span className="lab-drybar-meta">
        Step {step + 1}/{total}
        {label ? ` — ${label}` : ''}
      </span>
      <div className="lab-drybar-btns">
        <button type="button" onClick={onPrev} disabled={step === 0}>◀ Previous</button>
        <button type="button" onClick={onNext} disabled={step >= total - 1}>Next Step ▶</button>
        <button type="button" onClick={onRestart}>⟳ Restart</button>
        {onAuto && (
          <button type="button" className={auto ? 'is-on' : ''} onClick={onAuto}>
            {auto ? '❚❚ Pause' : '▶ Auto Run'}
          </button>
        )}
      </div>
    </div>
  )
}

export function useDryRun(total, { autoMs = 1500, labels = [] } = {}) {
  const [step, setStep] = useState(0)
  const [auto, setAuto] = useState(false)

  useEffect(() => {
    if (!auto) return undefined
    const id = window.setInterval(() => {
      setStep((current) => {
        if (current >= total - 1) {
          setAuto(false)
          return current
        }
        return current + 1
      })
    }, autoMs)
    return () => window.clearInterval(id)
  }, [auto, autoMs, total])

  const bar = (
    <DryRunBar
      step={step}
      total={total}
      label={labels[step]}
      auto={auto}
      onPrev={() => { setAuto(false); setStep((s) => Math.max(0, s - 1)) }}
      onNext={() => { setAuto(false); setStep((s) => Math.min(total - 1, s + 1)) }}
      onRestart={() => { setAuto(false); setStep(0) }}
      onAuto={() => setAuto((v) => !v)}
    />
  )

  return { step, setStep, auto, bar }
}

export function KV({ k, v, tone = 'ink', ghost = false }) {
  return (
    <span className={`lab-kv tone-${tone} ${ghost ? 'is-ghost' : ''}`}>
      <b>{k}</b>
      <em>{v}</em>
    </span>
  )
}

export function MatrixGrid({ rows, highlight, label }) {
  return (
    <div className="lab-matrix">
      {label && <p>{label}</p>}
      <table>
        <tbody>
          {rows.map((row, r) => (
            <tr key={r}>
              {row.map((cell, c) => {
                const on = highlight && highlight[0] === r && highlight[1] === c
                return <td key={c} className={on ? 'is-hot' : ''}>{cell}</td>
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export function HdfsTree({ nodes, highlight = '' }) {
  return (
    <ul className="lab-tree">
      {nodes.map((node) => (
        <li key={node.path} className={highlight === node.path ? 'is-hot' : ''}>
          <span className={node.file ? 'is-file' : 'is-dir'}>{node.label}</span>
          {node.children && <HdfsTree nodes={node.children} highlight={highlight} />}
        </li>
      ))}
    </ul>
  )
}

export function FileToken({ name, side = 'local' }) {
  return (
    <div className={`lab-file tone-${side}`}>
      <span className="lab-file-icon" aria-hidden="true" />
      <strong>{name}</strong>
    </div>
  )
}

export function VivaList({ items }) {
  const [open, setOpen] = useState({})
  return (
    <div className="lab-viva">
      {items.map((item, i) => (
        <article key={item.q} className={open[i] ? 'is-open' : ''}>
          <h4>
            <span>Q{i + 1}</span>
            {item.q}
          </h4>
          <button type="button" onClick={() => setOpen((s) => ({ ...s, [i]: !s[i] }))}>
            {open[i] ? 'Hide answer' : 'Reveal answer'}
          </button>
          {open[i] && <p>{item.a}</p>}
        </article>
      ))}
    </div>
  )
}

export function ErrorCard({ command, error, cause, fix }) {
  return (
    <div className="lab-error">
      <Terminal
        lines={[
          { kind: 'cmd', text: command },
          { kind: 'err', text: error },
        ]}
      />
      <div className="lab-error-copy">
        <p><strong>Likely cause.</strong> {cause}</p>
        <p><strong>Correction.</strong> {fix}</p>
      </div>
    </div>
  )
}

export function Recap({ flow, skills }) {
  return (
    <div className="lab-recap">
      <Flow items={flow} />
      <div className="lab-skills">
        <h4>You should now be able to</h4>
        <ul>
          {skills.map((s) => <li key={s}>{s}</li>)}
        </ul>
      </div>
    </div>
  )
}

export function LabProgramSwitcher({ currentId }) {
  const [open, setOpen] = useState(false)
  const current = useMemo(() => LAB_PROGRAMS.find((p) => p.id === currentId), [currentId])
  return (
    <div className="lab-switcher">
      <button type="button" className="lab-switcher-btn" onClick={() => setOpen((v) => !v)} aria-expanded={open}>
        Program {current?.number} ▾
      </button>
      {open && (
        <nav className="lab-switcher-menu" aria-label="Jump to a lab program">
          {LAB_PROGRAMS.map((p) => (
            <Link
              key={p.id}
              to={`/big-data-analytics/${p.id}`}
              className={p.id === currentId ? 'is-on' : ''}
              onClick={() => setOpen(false)}
            >
              P{p.number} {p.shortTitle}
            </Link>
          ))}
        </nav>
      )}
    </div>
  )
}

export function TitleHero({ number, title, tech, question, chips = [] }) {
  return (
    <div className="lab-hero">
      <p className="lab-hero-kicker">Lab Program {number}</p>
      <h1>{title}</h1>
      <p className="lab-hero-q">{question}</p>
      <div className="lab-hero-meta">
        <Pill tone="teal">{tech}</Pill>
        {chips.map((c) => <Pill key={c}>{c}</Pill>)}
      </div>
    </div>
  )
}

export function DataTable({ columns, rows, dim = [], ghost = [], highlight = [] }) {
  return (
    <div className="lab-table-wrap">
      <table className="lab-table">
        <thead>
          <tr>{columns.map((c) => <th key={c}>{c}</th>)}</tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr
              key={i}
              className={`${dim.includes(i) ? 'is-dim' : ''} ${ghost.includes(i) ? 'is-ghost' : ''} ${highlight.includes(i) ? 'is-hot' : ''}`.trim()}
            >
              {row.map((cell, j) => <td key={j}>{cell}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export function MapperNode({ label = 'Mapper', hot = false, children }) {
  return (
    <div className={`lab-node mapper ${hot ? 'is-hot' : ''}`}>
      <strong>{label}</strong>
      {children}
    </div>
  )
}

export function ReducerNode({ label = 'Reducer', hot = false, children }) {
  return (
    <div className={`lab-node reducer ${hot ? 'is-hot' : ''}`}>
      <strong>{label}</strong>
      {children}
    </div>
  )
}

export function ShuffleLane({ keys = [], active }) {
  return (
    <div className="lab-shuffle" aria-label="Shuffle and group">
      <p>Shuffle · Group</p>
      <div>
        {keys.map((key) => (
          <span key={key} className={key === active ? 'is-hot' : ''}>{key}</span>
        ))}
      </div>
    </div>
  )
}
