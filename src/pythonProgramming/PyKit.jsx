import { Link } from 'react-router-dom'
import { BookOpen, ClipboardList, FileQuestion, GraduationCap, Sparkles } from 'lucide-react'
import { useLayoutEffect, useRef } from 'react'

export function pySlide({
  id,
  kicker,
  title,
  subtitle,
  content,
  notes,
  composition = 'split-right',
  camera = 'wide-source',
  family = 'trace-run',
  object = 'program',
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
    <div className={`py-stage py-${composition}`} data-py-comp={composition} data-py-stage="true">
      {story.length > 0 && (
        <aside className="py-story" aria-label="Module journey">
          {story.map((item, index) => (
            <span key={item} className={`${index <= beat ? 'lit' : ''} ${index === beat ? 'now' : ''}`.trim()}>
              {item}
            </span>
          ))}
        </aside>
      )}
      <section className="py-copy" data-overflow-allow="true">
        {children}
      </section>
      {visual && <section className="py-visual">{visual}</section>}
      {visualB && <section className="py-visual-b">{visualB}</section>}
      {(takeaway || exam || cue) && (
        <aside className="py-footer-band">
          {takeaway && (
            <p className="py-takeaway">
              <strong>Takeaway</strong>
              <span>{takeaway}</span>
            </p>
          )}
          {exam && (
            <p className="py-exam">
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
  return <p className="py-lead">{children}</p>
}

export function Points({ items = [] }) {
  return (
    <ul className="py-points">
      {items.map((item) => (
        <li key={typeof item === 'string' ? item : item.key}>{item}</li>
      ))}
    </ul>
  )
}

export function Definition({ term, children, exam }) {
  return (
    <div className="py-definition">
      <span>Definition</span>
      <strong>{term}</strong>
      <p>{children}</p>
      {exam && <em>{exam}</em>}
    </div>
  )
}

export function Flow({ items = [] }) {
  return (
    <div className="py-flow">
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
    <ol className="py-algo-steps">
      {steps.map((step, index) => (
        <li key={typeof step === 'string' ? step : step.key || index}>{step}</li>
      ))}
    </ol>
  )
}

/** Phase-1 `complexity` for this subject is a cost-of-approach block, not
 *  big-O: best / avg / worst read as "what does this idiom cost you here". */
export function MethodCost({ complexity }) {
  if (!complexity) return null
  return (
    <div className="py-complexity">
      <div>
        <span>Best case</span>
        <strong>{complexity.best}</strong>
      </div>
      <div>
        <span>Typical</span>
        <strong>{complexity.avg}</strong>
      </div>
      <div>
        <span>Worst case</span>
        <strong>{complexity.worst}</strong>
      </div>
      {complexity.note ? <p>{complexity.note}</p> : null}
    </div>
  )
}

/** Phase 1 writes `code` as `{ lang, src }` — for BEC305 the lang is almost
 *  always "python", so the panel is a real listing, not a worked sum. */
/**
 * Shrink a fixed-height panel's text until its last line is inside the box.
 * A line count cannot predict the fit -- wrapping depends on the slide's width,
 * and a 16-line body was still cut mid-glyph after the dense type step -- so
 * this measures, one pixel at a time, down to a 10px floor.
 */
function useFitText(dep) {
  const ref = useRef(null)
  useLayoutEffect(() => {
    const box = ref.current
    const pre = box?.querySelector('pre')
    const text = box?.querySelector('code')
    if (!box || !text) return undefined
    const over = (el) => !!el && el.scrollHeight > el.clientHeight + 1
    const fit = () => {
      text.style.fontSize = ''
      let px = parseFloat(getComputedStyle(text).fontSize)
      while ((over(box) || over(pre)) && px > 10) {
        px -= 1
        text.style.fontSize = `${px}px`
      }
    }
    fit()
    window.addEventListener('resize', fit)
    return () => window.removeEventListener('resize', fit)
  }, [dep])
  return ref
}

export function WorkedPanel({ code, title }) {
  const panel = useFitText(code)
  if (!code) return null
  const src = typeof code === 'string' ? code : code.src
  const lang = typeof code === 'string' ? null : code.lang
  if (!src) return null
  return (
    <div ref={panel} className="py-code-panel">
      <span>{title || (lang === 'python' ? 'Run it' : lang) || 'Run it'}</span>
      <pre>
        <code>{src}</code>
      </pre>
    </div>
  )
}

export function Callout({ kind = 'idea', label, children }) {
  return (
    <div className={`py-callout py-callout-${kind}`}>
      <span>{label || kind}</span>
      <p>{children}</p>
    </div>
  )
}

export function DryRunPanel({ dryRun }) {
  if (!dryRun) return null
  return (
    <div className="py-dryrun">
      <section>
        <span>Given</span>
        <p>{dryRun.input}</p>
      </section>
      <section>
        <span>Working</span>
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
    <div className="py-term-chips">
      {items.map((item) => (
        <span key={typeof item === 'string' ? item : item.key}>{item}</span>
      ))}
    </div>
  )
}

/** Textbook provenance carried through from Phase 1 (`unit.book`). Modules 4
 *  and 5 cite Downey and Severance, which were not supplied, so those units
 *  carry a chapter but no page range — render what exists rather than
 *  inventing a page number. */
export function BookCite({ book, co, bloom }) {
  if (!book && !co) return null
  return (
    <p className="py-book-cite">
      {book?.chapter ? <b>{book.chapter}</b> : null}
      {book?.pages ? <span>{book.pages}</span> : null}
      {co ? <em>{co}</em> : null}
      {bloom ? <i>{bloom}</i> : null}
    </p>
  )
}

export function RoadmapGrid({ items = [] }) {
  return (
    <div className="py-roadmap">
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
    <div className="py-checkpoint-sheet">
      {checkpoints.map((row) => (
        <article key={row.label}>
          <strong>{row.label}</strong>
          <code>{row.formula}</code>
          <span>{row.why}</span>
        </article>
      ))}
    </div>
  )
}

export function SyllabusAudit({ items = [] }) {
  return (
    <div className="py-syllabus-audit">
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
    <ol className="py-practice-list">
      {questions.map((q, index) => (
        <li key={typeof q === 'string' ? q : q.key || q.id || index}>
          <span>{typeof q === 'string' ? q : q.prompt || q.text || q.q}</span>
          {typeof q === 'object' && q.marks ? <em>{q.marks}</em> : null}
        </li>
      ))}
    </ol>
  )
}

/** One MCQ from the Phase-1 quiz bank, shown with its options and the correct
 *  answer marked — the deck is the revision surface, not a hidden answer key. */
export function QuizCard({ item }) {
  if (!item) return null
  return (
    <div className="py-quiz-card">
      <strong>{item.q}</strong>
      <ol>
        {(item.options || []).map((opt, i) => (
          <li key={opt} className={i === item.answer ? 'is-correct' : ''}>
            {opt}
          </li>
        ))}
      </ol>
      {item.feedback?.correct ? <p>{item.feedback.correct}</p> : null}
    </div>
  )
}

export function ReviewMap({ title, topics = [] }) {
  return (
    <div className="py-review-map">
      {title ? <h3>{title}</h3> : null}
      <div className="py-review-topics">
        {topics.map((topic) => (
          <span key={typeof topic === 'string' ? topic : topic.key}>{topic}</span>
        ))}
      </div>
    </div>
  )
}

/**
 * The platform's per-module resource links render in LegacyModuleSelector,
 * which the live CourseLanding view replaced — so nothing on screen reaches
 * /notes, /quiz, /assignment or /previous-year-questions. These cards are the
 * clickable route into them.
 */
export function ResourceHub({ moduleId = 'module-1' }) {
  const cards = [
    ['Module Notes', 'notes', 'Full definitions, runnable listings and the common mistake for all 16 units.', BookOpen],
    ['Quiz', 'quiz', '20 MCQs with per-option feedback, plus the descriptive bank and model answers.', ClipboardList],
    ['Assignment', 'assignment', 'The graded assignment, its programs, marking rubric and CO attainment.', GraduationCap],
    ['Previous Year Questions', 'previous-year-questions', 'VTU papers indexed for this subject, model answers included.', FileQuestion],
  ]
  return (
    <div className="py-resource-hub">
      {cards.map(([title, slug, text, Icon]) => (
        <Link key={title} className="py-resource-card" to={`/python-programming/${moduleId}/${slug}`} data-module={moduleId}>
          <Icon size={22} strokeWidth={1.8} aria-hidden />
          <strong>{title}</strong>
          <span>{text}</span>
        </Link>
      ))}
      <div className="py-study-tip">
        <Sparkles size={16} aria-hidden />
        <span>If you can name the type of every value on a line and say which names are rebound, the ten-mark answer is already half written.</span>
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
