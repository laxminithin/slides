import { BookOpen, FileQuestion, ListChecks, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'

export function osSlide({
  id,
  kicker,
  title,
  subtitle,
  content,
  notes,
  composition = 'split-right',
  camera = 'wide-system',
  family = 'execution-flow',
  object = 'kernel',
  action = 'explain',
  interaction = 'watch',
  hideTitle = false,
  layout,
  film = {},
  tone,
}) {
  return {
    id,
    kicker,
    title,
    subtitle,
    content,
    notes,
    layout: layout || composition,
    composition,
    hideTitle,
    tone,
    film: {
      camera,
      composition,
      animationFamily: family,
      dominantObject: object,
      teachingAction: action,
      interactionType: interaction,
      ...film,
    },
    signature: {
      composition,
      camera,
      animationFamily: family,
      dominantObject: object,
      teachingAction: action,
      interactionType: interaction,
    },
  }
}

export function Stage({
  composition = 'split-right',
  story = [],
  beat = 0,
  children,
  visual,
  visualB,
  takeaway,
  exam,
  cue,
}) {
  return (
    <div className={`os-stage os-${composition}`} data-os-comp={composition}>
      {story.length > 0 && (
        <aside className="os-story" aria-label="Module journey">
          {story.map((item, index) => (
            <span key={item} className={`${index <= beat ? 'lit' : ''} ${index === beat ? 'now' : ''}`.trim()}>
              {item}
            </span>
          ))}
        </aside>
      )}
      <section className="os-copy">{children}</section>
      {visual && <section className="os-visual">{visual}</section>}
      {visualB && <section className="os-visual-b">{visualB}</section>}
      {(takeaway || exam || cue) && (
        <aside className="os-footer-band">
          {takeaway && (
            <p className="os-takeaway">
              <strong>Takeaway</strong>
              <span>{takeaway}</span>
            </p>
          )}
          {exam && (
            <p className="os-exam">
              <strong>{cue || 'VTU KEY'}</strong>
              <span>{exam}</span>
            </p>
          )}
        </aside>
      )}
    </div>
  )
}

export function Lead({ children }) {
  return <p className="os-lead">{children}</p>
}

export function Points({ items = [] }) {
  return (
    <ul className="os-points">
      {items.map((item) => (
        <li key={typeof item === 'string' ? item : item.key}>{item}</li>
      ))}
    </ul>
  )
}

export function Definition({ term, children, exam }) {
  return (
    <div className="os-definition">
      <span>Definition</span>
      <strong>{term}</strong>
      <p>{children}</p>
      {exam && <em>{exam}</em>}
    </div>
  )
}

export function Flow({ items = [] }) {
  return (
    <div className="os-flow">
      {items.map((item, index) => (
        <span key={item}>
          {item}
          {index < items.length - 1 ? <i aria-hidden> →</i> : null}
        </span>
      ))}
    </div>
  )
}

export function Formula({ children, vars }) {
  return (
    <div className="os-formula">
      <div className="os-formula-eq">{children}</div>
      {vars && (
        <ul>
          {vars.map(([sym, mean]) => (
            <li key={sym}>
              <b>{sym}</b> {mean}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export function Callout({ kind = 'idea', label, children }) {
  return (
    <div className={`os-callout os-callout-${kind}`}>
      <span>{label || kind}</span>
      <p>{children}</p>
    </div>
  )
}

export function MetricRow({ items = [] }) {
  return (
    <div className="os-metrics">
      {items.map(([value, label]) => (
        <article key={label}>
          <strong>{value}</strong>
          <span>{label}</span>
        </article>
      ))}
    </div>
  )
}

export function ResourceHub({ moduleId = 'module-1' }) {
  const links = [
    ['Module Notes', 'Revision map of definitions, diagrams and numericals.', 'notes', BookOpen],
    ['Previous-Year Questions', '5-mark and 10-mark practice aligned to VTU BCS303.', 'previous-year-questions', FileQuestion],
    ['Quick Revision', 'The phrases and diagrams you must be able to redraw.', 'notes', ListChecks],
  ]
  return (
    <div className="os-resource-hub">
      {links.map(([title, text, path, Icon]) => (
        <Link key={title} to={`/operating-systems/${moduleId}/${path}`}>
          <Icon size={22} strokeWidth={1.8} aria-hidden />
          <strong>{title}</strong>
          <span>{text}</span>
        </Link>
      ))}
      <div className="os-study-tip">
        <Sparkles size={16} aria-hidden />
        <span>If you can animate it in your head — process, page, or disk head — you can write the 10-mark answer.</span>
      </div>
    </div>
  )
}

export function signatureTuple(sig) {
  if (!sig) return null
  return [sig.composition, sig.camera, sig.animationFamily, sig.dominantObject, sig.teachingAction]
}

export function compositionKey(sig) {
  if (!sig) return null
  return `${sig.composition}|${sig.camera}|${sig.animationFamily}`
}

export function auditSignatures(slides) {
  const identicalPairs = []
  const threeSlideFails = []
  const familyRuns = []
  let run = 1
  for (let i = 0; i < slides.length - 1; i += 1) {
    const a = slides[i].signature
    const b = slides[i + 1].signature
    if (JSON.stringify(signatureTuple(a)) === JSON.stringify(signatureTuple(b))) {
      identicalPairs.push([slides[i].id, slides[i + 1].id])
    }
    const changed = ['composition', 'camera', 'animationFamily', 'dominantObject', 'teachingAction'].filter(
      (k) => a?.[k] !== b?.[k],
    ).length
    if (changed < 2) {
      identicalPairs.push([`${slides[i].id}~weak`, slides[i + 1].id])
    }
    if (a?.animationFamily && a.animationFamily === b?.animationFamily) run += 1
    else {
      if (run >= 5) familyRuns.push({ family: slides[i].signature?.animationFamily, run, at: slides[i].id })
      run = 1
    }
  }
  for (let i = 0; i < slides.length - 2; i += 1) {
    const a = compositionKey(slides[i].signature)
    const b = compositionKey(slides[i + 1].signature)
    const c = compositionKey(slides[i + 2].signature)
    if (a && a === b && b === c) threeSlideFails.push([slides[i].id, slides[i + 1].id, slides[i + 2].id])
  }
  return { identicalPairs, threeSlideFails, familyRuns }
}
