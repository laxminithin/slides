import { BookOpen, FileQuestion, ListChecks, Sparkles } from 'lucide-react'

export function cgSlide({
  id,
  kicker,
  title,
  subtitle,
  content,
  notes,
  composition = 'split-right',
  camera = 'wide-memory',
  family = 'pointer-trace',
  object = 'memory',
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
    <div className={`cg-stage cg-${composition}`} data-cg-comp={composition} data-cg-stage="true">
      {story.length > 0 && (
        <aside className="cg-story" aria-label="Module journey">
          {story.map((item, index) => (
            <span key={item} className={`${index <= beat ? 'lit' : ''} ${index === beat ? 'now' : ''}`.trim()}>
              {item}
            </span>
          ))}
        </aside>
      )}
      <section className="cg-copy" data-overflow-allow="true">
        {children}
      </section>
      {visual && <section className="cg-visual">{visual}</section>}
      {visualB && <section className="cg-visual-b">{visualB}</section>}
      {(takeaway || exam || cue) && (
        <aside className="cg-footer-band">
          {takeaway && (
            <p className="cg-takeaway">
              <strong>Takeaway</strong>
              <span>{takeaway}</span>
            </p>
          )}
          {exam && (
            <p className="cg-exam">
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
  return <p className="cg-lead">{children}</p>
}

export function Points({ items = [] }) {
  return (
    <ul className="cg-points">
      {items.map((item) => (
        <li key={typeof item === 'string' ? item : item.key}>{item}</li>
      ))}
    </ul>
  )
}

export function Definition({ term, children, exam }) {
  return (
    <div className="cg-definition">
      <span>Definition</span>
      <strong>{term}</strong>
      <p>{children}</p>
      {exam && <em>{exam}</em>}
    </div>
  )
}

export function Flow({ items = [] }) {
  return (
    <div className="cg-flow">
      {items.map((item, index) => (
        <span key={item}>
          {item}
          {index < items.length - 1 ? <i aria-hidden> →</i> : null}
        </span>
      ))}
    </div>
  )
}

export function AlgoSteps({ steps = [] }) {
  return (
    <ol className="cg-algo-steps">
      {steps.map((step, index) => (
        <li key={typeof step === 'string' ? step : step.key || index}>{step}</li>
      ))}
    </ol>
  )
}

export function ComplexityBlock({ complexity }) {
  if (!complexity) return null
  return (
    <div className="cg-complexity">
      <div>
        <span>Best</span>
        <strong>{complexity.best}</strong>
      </div>
      <div>
        <span>Average</span>
        <strong>{complexity.avg}</strong>
      </div>
      <div>
        <span>Worst</span>
        <strong>{complexity.worst}</strong>
      </div>
      {complexity.note ? <p>{complexity.note}</p> : null}
    </div>
  )
}

export function CodePanel({ code, title = 'C' }) {
  if (!code) return null
  return (
    <div className="cg-code-panel">
      <span>{title}</span>
      <pre>
        <code>{code}</code>
      </pre>
    </div>
  )
}

export function Callout({ kind = 'idea', label, children }) {
  return (
    <div className={`cg-callout cg-callout-${kind}`}>
      <span>{label || kind}</span>
      <p>{children}</p>
    </div>
  )
}

export function DryRunPanel({ dryRun }) {
  if (!dryRun) return null
  return (
    <div className="cg-dryrun">
      <section>
        <span>Input</span>
        <p>{dryRun.input}</p>
      </section>
      <section>
        <span>Trace</span>
        <ol>
          {(dryRun.steps || []).map((step, i) => (
            <li key={i}>{step}</li>
          ))}
        </ol>
      </section>
      <section>
        <span>Result</span>
        <p>{dryRun.result}</p>
      </section>
    </div>
  )
}

export function TermChips({ items = [] }) {
  return (
    <div className="cg-term-chips">
      {items.map((item) => (
        <span key={typeof item === 'string' ? item : item.key}>{item}</span>
      ))}
    </div>
  )
}

export function RoadmapGrid({ items = [] }) {
  return (
    <div className="cg-roadmap">
      {items.map((item, index) => {
        const title = typeof item === 'string' ? item : item.title || item.topic
        return (
          <article key={title || index}>
            <b>{String(index + 1).padStart(2, '0')}</b>
            <strong>{title}</strong>
          </article>
        )
      })}
    </div>
  )
}

export function CheckpointSheet({ checkpoints = [] }) {
  return (
    <div className="cg-checkpoint-sheet">
      {checkpoints.map((row) => (
        <article key={row.label}>
          <strong>{row.label}</strong>
          <code>{row.bigO}</code>
          <span>{row.why}</span>
        </article>
      ))}
    </div>
  )
}

export function SyllabusAudit({ items = [] }) {
  return (
    <div className="cg-syllabus-audit">
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
    <ol className="cg-practice-list">
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
    <div className="cg-review-map">
      {title ? <h3>{title}</h3> : null}
      <div className="cg-review-topics">
        {topics.map((topic) => (
          <span key={typeof topic === 'string' ? topic : topic.key}>{topic}</span>
        ))}
      </div>
    </div>
  )
}

export function ResourceHub({ moduleId = 'module-1' }) {
  const cards = [
    ['Module Notes', 'Revision map of definitions, memory diagrams and dry runs.', BookOpen],
    ['Practice Questions', 'Exam-style questions aligned to BCS504 (see Practice slide).', FileQuestion],
    ['Quick Revision', 'Redraw operations and recite the exam diagram labels for each.', ListChecks],
  ]
  return (
    <div className="cg-resource-hub">
      {cards.map(([title, text, Icon]) => (
        <div key={title} className="cg-resource-card" data-module={moduleId}>
          <Icon size={22} strokeWidth={1.8} aria-hidden />
          <strong>{title}</strong>
          <span>{text}</span>
        </div>
      ))}
      <div className="cg-study-tip">
        <Sparkles size={16} aria-hidden />
        <span>If you can redraw the process diagram and state the exam diagram labels, you can write the 10-mark answer.</span>
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
