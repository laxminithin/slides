import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { BookOpen, ClipboardList, Download, FileQuestion, GraduationCap } from 'lucide-react'
import { getSubject } from '../data/subjects'
import { COURSE, MODULES } from '../networkAnalysis/curriculum.js'

/** Everything under public/Network Analysis/ was generated with the deck. */
const asset = (path) => encodeURI(`${import.meta.env.BASE_URL}Network Analysis/${path}`)

const PYQ_PAPERS = [
  'PYQ_Index.pdf',
  '2023 ECE Odd sem.pdf',
  '2023 ECE Even sem.pdf',
  '2024 ECE Odd sem.pdf',
  'EC 2023-24.pdf',
  'EC- Dec-jan 2024.pdf',
  'EC QP Merged june-july 2024.pdf',
  'EC_Odd.pdf',
  'EC_Even.pdf',
]

function DownloadRow({ items }) {
  return (
    <div className="na-study-downloads">
      {items.map(([label, href]) => (
        <a key={href} className="na-study-download" href={href} target="_blank" rel="noreferrer">
          <Download size={15} strokeWidth={2} aria-hidden />
          <span>{label}</span>
        </a>
      ))}
    </div>
  )
}

function McqItem({ item, index }) {
  const [picked, setPicked] = useState(null)
  return (
    <article className="question-card na-study-mcq">
      <span className="question-number">{String(index + 1).padStart(2, '0')}</span>
      <h3>{item.q}</h3>
      <ol className="na-study-options">
        {item.options.map((opt, i) => {
          const state = picked === null ? '' : i === item.answer ? ' is-correct' : i === picked ? ' is-wrong' : ''
          return (
            <li key={opt}>
              <button type="button" className={`na-study-option${state}`} onClick={() => setPicked(i)}>
                {opt}
              </button>
            </li>
          )
        })}
      </ol>
      {picked !== null && (
        <p className={`na-study-feedback${picked === item.answer ? ' is-correct' : ''}`}>
          {item.feedback?.wrong?.[picked] || item.feedback?.correct}
        </p>
      )}
      <p className="na-study-meta">
        {item.co} · {item.bloom} · {item.difficulty} · {item.ref}
      </p>
    </article>
  )
}

function DescriptiveItem({ item, index }) {
  const [open, setOpen] = useState(false)
  return (
    <article className="question-card">
      <span className="question-number">{String(index + 1).padStart(2, '0')}</span>
      <h3>{item.q}</h3>
      <p className="na-study-meta">
        {item.marks} marks · {item.co} · {item.bloom} · {item.ref}
      </p>
      <button type="button" className="na-study-toggle" onClick={() => setOpen((v) => !v)}>
        {open ? 'Hide model answer' : 'Show model answer'}
      </button>
      {open && (
        <div className="na-study-answer">
          <p>{item.modelAnswer}</p>
          <ul>
            {(item.markingScheme || []).map(([what, marks]) => (
              <li key={what}>
                <b>{marks}</b> {what}
              </li>
            ))}
          </ul>
        </div>
      )}
    </article>
  )
}

export default function NetworkAnalysisResourcePage({ type }) {
  const { moduleId = 'module-1' } = useParams()
  const subject = getSubject('network-analysis')
  const module = subject?.modules.find((item) => item.id === moduleId) || subject?.modules[0]
  const data = MODULES.find((m) => m.id === (module?.id || moduleId)) || MODULES[0]
  const n = data.n

  useEffect(() => {
    document.body.classList.add('study-scroll')
    return () => document.body.classList.remove('study-scroll')
  }, [])

  const heading = {
    notes: 'Module Notes',
    quiz: 'Quiz',
    assignment: 'Assignment',
    questions: 'Previous Year Questions',
  }[type] || 'Resources'

  const Icon = { notes: BookOpen, quiz: ClipboardList, assignment: GraduationCap }[type] || FileQuestion

  return (
    <main className="study-page na-study">
      <section className="study-hero">
        <Link to={`/network-analysis/${data.id}`} className="study-back-link">Back to presentation</Link>
        <p className="study-kicker">VTU {COURSE.code} · {COURSE.title} · 2025 scheme</p>
        <h1>Module {n} — {heading}</h1>
        <p className="study-subtitle">{data.title}</p>
      </section>

      <section className="study-card">
        <h2><Icon size={22} strokeWidth={2} aria-hidden /> {heading}</h2>

        {type === 'notes' && (
          <>
            <p className="na-study-lead">{data.notes}</p>
            <DownloadRow
              items={[
                ['Syllabus extract (PDF)', asset('syllabus/BEC303_Syllabus_Extract.pdf')],
                ['Syllabus mapping (PDF)', asset('syllabus/Syllabus_Mapping.pdf')],
                ['Subject overview (PDF)', asset('BEC303_Overview.pdf')],
                [`Module ${n} deck (PPTX)`, asset(`ppt/${data.deck.replace(/^ppt\//, '')}`)],
              ]}
            />
            <p className="na-study-meta">
              Source scope: {data.chapters} · Textbook: {COURSE.textbook.author}, <i>{COURSE.textbook.title}</i>,{' '}
              {COURSE.textbook.edition} ed., {COURSE.textbook.publisher}, {COURSE.textbook.year}.
            </p>
            <div className="question-list">
              {data.units.map((u, i) => (
                <article key={u.topic} className="question-card">
                  <span className="question-number">{String(i + 1).padStart(2, '0')}</span>
                  <h3>{u.topic}</h3>
                  <p>{u.definition}</p>
                  <p className="na-study-takeaway"><b>Takeaway</b> {u.takeaway}</p>
                  <p className="na-study-mistake"><b>Common mistake</b> {u.mistake}</p>
                  <div className="na-study-chips">
                    {u.terms.map((t) => (
                      <span key={t}>{t}</span>
                    ))}
                  </div>
                  <p className="na-study-meta">
                    {u.book?.chapter}{u.book?.pages ? ` · ${u.book.pages}` : ''} · {u.co} · {u.bloom}
                  </p>
                </article>
              ))}
            </div>
          </>
        )}

        {type === 'quiz' && (
          <>
            <p className="na-study-lead">
              {data.quiz.meta.duration} · {data.quiz.meta.totalMarks} marks · pass {data.quiz.meta.passingMarks}.
            </p>
            <ul className="na-study-rules">
              {data.quiz.meta.instructions.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
            <DownloadRow
              items={[
                [`Module ${n} quiz (PDF)`, asset(`quizzes/Module_${n}_Quiz.pdf`)],
                [`Module ${n} quiz (Moodle GIFT)`, asset(`quizzes/Module_${n}_Quiz.gift`)],
              ]}
            />
            <h3 className="na-study-section">Part A — {data.quiz.mcq.length} multiple choice questions</h3>
            <p className="na-study-meta">Pick an option to see why it is right or wrong.</p>
            <div className="question-list">
              {data.quiz.mcq.map((item, i) => (
                <McqItem key={item.q} item={item} index={i} />
              ))}
            </div>
            <h3 className="na-study-section">Part B — {data.quiz.short.length} descriptive questions</h3>
            <div className="question-list">
              {data.quiz.short.map((item, i) => (
                <DescriptiveItem key={item.q} item={item} index={i} />
              ))}
            </div>
          </>
        )}

        {type === 'assignment' && (
          <>
            <h3 className="na-study-section">{data.assignment.title}</h3>
            <p className="na-study-lead">{data.assignment.objective}</p>
            <p className="na-study-meta">
              {data.assignment.maxMarks} marks · {data.assignment.weightage} · submit as{' '}
              {data.assignment.submission.naming} via {data.assignment.submission.channel} ·{' '}
              late policy: {data.assignment.submission.latePolicy}
            </p>
            <DownloadRow items={[[`Module ${n} assignment (PDF)`, asset(`assignments/Module_${n}_Assignment.pdf`)]]} />

            <h3 className="na-study-section">Outcomes</h3>
            <ul className="na-study-rules">
              {data.assignment.outcomes.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>

            <h3 className="na-study-section">Problems</h3>
            <div className="question-list">
              {[...data.assignment.tasks, ...data.assignment.theory].map((t) => (
                <article key={t.id} className="question-card">
                  <span className="question-number">{t.id}</span>
                  <h3>{t.text}</h3>
                  <p className="na-study-meta">{t.marks} mark{t.marks === 1 ? '' : 's'} · {t.co} · {t.bloom}</p>
                </article>
              ))}
            </div>

            <h3 className="na-study-section">Rubric</h3>
            <div className="na-study-rubric">
              {data.assignment.rubric.criteria.map((c) => (
                <article key={c.name}>
                  <header>
                    <strong>{c.name}</strong>
                    <em>{c.weight} marks</em>
                  </header>
                  <dl>
                    {Object.entries(c.levels).map(([level, text]) => (
                      <div key={level}>
                        <dt>{level.replace(/([A-Z])/g, ' $1')}</dt>
                        <dd>{text}</dd>
                      </div>
                    ))}
                  </dl>
                </article>
              ))}
            </div>
            <p className="na-study-meta">{data.assignment.integrity}</p>
          </>
        )}

        {type === 'questions' && (
          <>
            <p className="na-study-lead">
              {COURSE.pyqAliases[0].reason} The index below points at the right pages in each paper.
            </p>
            <DownloadRow items={PYQ_PAPERS.map((f) => [f.replace(/\.pdf$/, ''), asset(`pyq/${f}`)])} />
            <h3 className="na-study-section">Exam-style practice for Module {n}</h3>
            <p className="na-study-meta">
              Descriptive bank from this module, with the marking scheme each answer is graded against.
            </p>
            <div className="question-list">
              {data.quiz.short.map((item, i) => (
                <DescriptiveItem key={item.q} item={item} index={i} />
              ))}
            </div>
          </>
        )}
      </section>

      <nav className="na-study-modnav" aria-label="Other modules">
        {MODULES.map((m) => (
          <Link key={m.id} to={`/network-analysis/${m.id}/${type === 'questions' ? 'previous-year-questions' : type}`} className={m.id === data.id ? 'is-current' : ''}>
            Module {m.n}
          </Link>
        ))}
      </nav>
    </main>
  )
}
