import { BookOpen, FileQuestion, ListChecks, Sparkles } from 'lucide-react'

export function cn502Slide({
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
    <div className={`cn502-stage cn502-${composition}`} data-cn502-comp={composition} data-cn502-stage="true">
      {story.length > 0 && (
        <aside className="cn502-story" aria-label="Module journey">
          {story.map((item, index) => (
            <span key={item} className={`${index <= beat ? 'lit' : ''} ${index === beat ? 'now' : ''}`.trim()}>
              {item}
            </span>
          ))}
        </aside>
      )}
      <section className="cn502-copy" data-overflow-allow="true">
        {children}
      </section>
      {visual && <section className="cn502-visual">{visual}</section>}
      {visualB && <section className="cn502-visual-b">{visualB}</section>}
      {(takeaway || exam || cue) && (
        <aside className="cn502-footer-band">
          {takeaway && (
            <p className="cn502-takeaway">
              <strong>Takeaway</strong>
              <span>{takeaway}</span>
            </p>
          )}
          {exam && (
            <p className="cn502-exam">
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
  return <p className="cn502-lead">{children}</p>
}

export function Points({ items = [] }) {
  return (
    <ul className="cn502-points">
      {items.map((item) => (
        <li key={typeof item === 'string' ? item : item.key}>{item}</li>
      ))}
    </ul>
  )
}

export function Definition({ term, children, exam }) {
  return (
    <div className="cn502-definition">
      <span>Definition</span>
      <strong>{term}</strong>
      <p>{children}</p>
      {exam && <em>{exam}</em>}
    </div>
  )
}

export function Flow({ items = [] }) {
  return (
    <div className="cn502-flow">
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
    <ol className="cn502-algo-steps">
      {steps.map((step, index) => (
        <li key={typeof step === 'string' ? step : step.key || index}>{step}</li>
      ))}
    </ol>
  )
}

export function ComplexityBlock({ complexity }) {
  if (!complexity) return null
  // Networking has no Big-O; each unit supplies three concept-specific
  // "key facts" cells (label + value). Fall back to the old best/avg/worst
  // shape for any unit that has not been migrated.
  const cells =
    complexity.cells || [
      { k: 'Best', v: complexity.best },
      { k: 'Average', v: complexity.avg },
      { k: 'Worst', v: complexity.worst },
    ]
  return (
    <div className="cn502-complexity">
      {cells.map((c, i) => (
        <div key={c.k || i}>
          <span>{c.k}</span>
          <strong>{c.v}</strong>
        </div>
      ))}
      {complexity.note ? <p>{complexity.note}</p> : null}
    </div>
  )
}

export function CodePanel({ code, title = 'C' }) {
  if (!code) return null
  return (
    <div className="cn502-code-panel">
      <span>{title}</span>
      <pre>
        <code>{code}</code>
      </pre>
    </div>
  )
}

export function Callout({ kind = 'idea', label, children }) {
  return (
    <div className={`cn502-callout cn502-callout-${kind}`}>
      <span>{label || kind}</span>
      <p>{children}</p>
    </div>
  )
}

export function DryRunPanel({ dryRun }) {
  if (!dryRun) return null
  return (
    <div className="cn502-dryrun">
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
    <div className="cn502-term-chips">
      {items.map((item) => (
        <span key={typeof item === 'string' ? item : item.key}>{item}</span>
      ))}
    </div>
  )
}

export function RoadmapGrid({ items = [] }) {
  return (
    <div className="cn502-roadmap">
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
    <div className="cn502-checkpoint-sheet">
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
    <div className="cn502-syllabus-audit">
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
    <ol className="cn502-practice-list">
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
    <div className="cn502-review-map">
      {title ? <h3>{title}</h3> : null}
      <div className="cn502-review-topics">
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
    ['Practice Questions', 'Exam-style questions aligned to BCS502 (see Practice slide).', FileQuestion],
    ['Quick Revision', 'Redraw operations and recite the exam diagram labels for each.', ListChecks],
  ]
  return (
    <div className="cn502-resource-hub">
      {cards.map(([title, text, Icon]) => (
        <div key={title} className="cn502-resource-card" data-module={moduleId}>
          <Icon size={22} strokeWidth={1.8} aria-hidden />
          <strong>{title}</strong>
          <span>{text}</span>
        </div>
      ))}
      <div className="cn502-study-tip">
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
