import { BookOpen, FileQuestion, ListChecks, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'

export function aeSlide({
  id,
  kicker,
  title,
  subtitle,
  content,
  notes,
  composition = 'split-right',
  camera = 'wide-circuit',
  family = 'signal-flow',
  object = 'bjt',
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
    <div className={`ae-stage ae-${composition}`} data-ae-comp={composition} data-ae-stage="true">
      {story.length > 0 && (
        <aside className="ae-story" aria-label="Module journey">
          {story.map((item, index) => (
            <span key={item} className={`${index <= beat ? 'lit' : ''} ${index === beat ? 'now' : ''}`.trim()}>
              {item}
            </span>
          ))}
        </aside>
      )}
      <section className="ae-copy" data-overflow-allow="true">
        {children}
      </section>
      {visual && <section className="ae-visual">{visual}</section>}
      {visualB && <section className="ae-visual-b">{visualB}</section>}
      {(takeaway || exam || cue) && (
        <aside className="ae-footer-band">
          {takeaway && (
            <p className="ae-takeaway">
              <strong>Takeaway</strong>
              <span>{takeaway}</span>
            </p>
          )}
          {exam && (
            <p className="ae-exam">
              <strong>{cue || 'EXAM KEY'}</strong>
              <span>{exam}</span>
            </p>
          )}
        </aside>
      )}
    </div>
  )
}

export function Lead({ children }) {
  return <p className="ae-lead">{children}</p>
}

export function Points({ items = [] }) {
  return (
    <ul className="ae-points">
      {items.map((item) => (
        <li key={typeof item === 'string' ? item : item.key}>{item}</li>
      ))}
    </ul>
  )
}

export function Definition({ term, children, exam }) {
  return (
    <div className="ae-definition">
      <span>Definition</span>
      <strong>{term}</strong>
      <p>{children}</p>
      {exam && <em>{exam}</em>}
    </div>
  )
}

export function Flow({ items = [] }) {
  return (
    <div className="ae-flow">
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
    <div className="ae-formula">
      <div className="ae-formula-eq">{children}</div>
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
    <div className={`ae-callout ae-callout-${kind}`}>
      <span>{label || kind}</span>
      <p>{children}</p>
    </div>
  )
}

export function NumericalBoard({ given = [], find, steps = [], result }) {
  const givenList = Array.isArray(given) ? given : [given]
  const stepList = Array.isArray(steps) ? steps : [steps]

  return (
    <div className="ae-numerical">
      <section className="ae-numerical-given">
        <span>Given</span>
        <ul>
          {givenList.map((item) => (
            <li key={typeof item === 'string' ? item : item.key}>{item}</li>
          ))}
        </ul>
      </section>
      <section className="ae-numerical-find">
        <span>Required</span>
        <p>{find}</p>
      </section>
      <section className="ae-numerical-steps">
        <span>Steps</span>
        <ol>
          {stepList.map((step, index) => (
            <li key={typeof step === 'string' ? step : step.key || index}>{step}</li>
          ))}
        </ol>
      </section>
      <section className="ae-numerical-result">
        <span>Result</span>
        <p>{result}</p>
      </section>
    </div>
  )
}

export function TermChips({ items = [] }) {
  return (
    <div className="ae-term-chips">
      {items.map((item) => (
        <span key={typeof item === 'string' ? item : item.key}>{item}</span>
      ))}
    </div>
  )
}

export function RoadmapGrid({ items = [] }) {
  return (
    <div className="ae-roadmap">
      {items.map((item, index) => {
        const title = typeof item === 'string' ? item : item.title || item.topic
        const body = typeof item === 'object' ? item.body || item.blurb || item.mean : null
        return (
          <article key={title || index}>
            <b>{String(index + 1).padStart(2, '0')}</b>
            <strong>{title}</strong>
            {body ? <p>{body}</p> : null}
          </article>
        )
      })}
    </div>
  )
}

export function FormulaSheet({ formulas = [] }) {
  return (
    <div className="ae-formula-sheet">
      {formulas.map((row) => (
        <article key={row.eq}>
          <code>{row.eq}</code>
          <span>{row.mean}</span>
        </article>
      ))}
    </div>
  )
}

export function SyllabusAudit({ items = [] }) {
  return (
    <div className="ae-syllabus-audit">
      {items.map((item) => (
        <article key={typeof item === 'string' ? item : item.key || item.topic}>
          <strong>{typeof item === 'string' ? item : item.topic || item.title}</strong>
          <em>COVERED</em>
        </article>
      ))}
    </div>
  )
}

export function PracticeList({ questions = [] }) {
  return (
    <ol className="ae-practice-list">
      {questions.map((q, index) => (
        <li key={typeof q === 'string' ? q : q.key || index}>
          <span>{typeof q === 'string' ? q : q.prompt || q.text || q.q}</span>
          {typeof q === 'object' && q.marks ? <em>{q.marks}</em> : null}
        </li>
      ))}
    </ol>
  )
}

export function ReviewMap({ title, topics = [] }) {
  return (
    <div className="ae-review-map">
      {title ? <h3>{title}</h3> : null}
      <div className="ae-review-topics">
        {topics.map((topic) => (
          <span key={typeof topic === 'string' ? topic : topic.key}>{topic}</span>
        ))}
      </div>
    </div>
  )
}

export function ResourceHub({ moduleId = 'module-1' }) {
  const links = [
    ['Module Notes', 'Revision map of definitions, circuits and numericals.', 'notes', BookOpen],
    ['Previous-Year Questions', '5-mark and 10-mark practice aligned to 1BEC304.', 'previous-year-questions', FileQuestion],
    ['Quick Revision', 'The formulas and diagrams you must be able to redraw.', 'notes', ListChecks],
  ]
  return (
    <div className="ae-resource-hub">
      {links.map(([title, text, path, Icon]) => (
        <Link key={title} to={`/analog-electronics-linear-ics/${moduleId}/${path}`}>
          <Icon size={22} strokeWidth={1.8} aria-hidden />
          <strong>{title}</strong>
          <span>{text}</span>
        </Link>
      ))}
      <div className="ae-study-tip">
        <Sparkles size={16} aria-hidden />
        <span>If you can redraw the bias path and write Av from the model, you can write the 10-mark answer.</span>
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
  const compositionRuns = []
  const diagramRuns = []
  let run = 1
  let compRun = 1
  let objRun = 1
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
      if (run >= 3) familyRuns.push({ family: slides[i].signature?.animationFamily, run, at: slides[i].id })
      run = 1
    }
    if (a?.composition && a.composition === b?.composition) compRun += 1
    else {
      if (compRun >= 3) compositionRuns.push({ composition: slides[i].signature?.composition, run: compRun, at: slides[i].id })
      compRun = 1
    }
    if (a?.dominantObject && a.dominantObject === b?.dominantObject) objRun += 1
    else {
      if (objRun >= 3) diagramRuns.push({ object: slides[i].signature?.dominantObject, run: objRun, at: slides[i].id })
      objRun = 1
    }
  }
  if (run >= 3) familyRuns.push({ family: slides[slides.length - 1]?.signature?.animationFamily, run, at: slides[slides.length - 1]?.id })
  if (compRun >= 3) compositionRuns.push({ composition: slides[slides.length - 1]?.signature?.composition, run: compRun, at: slides[slides.length - 1]?.id })
  if (objRun >= 3) diagramRuns.push({ object: slides[slides.length - 1]?.signature?.dominantObject, run: objRun, at: slides[slides.length - 1]?.id })
  for (let i = 0; i < slides.length - 2; i += 1) {
    const a = compositionKey(slides[i].signature)
    const b = compositionKey(slides[i + 1].signature)
    const c = compositionKey(slides[i + 2].signature)
    if (a && a === b && b === c) threeSlideFails.push([slides[i].id, slides[i + 1].id, slides[i + 2].id])
  }
  return { identicalPairs, threeSlideFails, familyRuns, compositionRuns, diagramRuns }
}
