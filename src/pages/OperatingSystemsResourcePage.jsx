import { Link, useParams } from 'react-router-dom'
import { BookOpen, FileQuestion } from 'lucide-react'
import { getSubject } from '../data/subjects'
import { osResources } from '../operatingSystems/resources.js'

export default function OperatingSystemsResourcePage({ type = 'notes' }) {
  const { moduleId = 'module-1' } = useParams()
  const subject = getSubject('operating-systems')
  const module = subject?.modules?.find((item) => item.id === moduleId) || subject?.modules?.[0]
  const key = module?.id || 'module-1'
  const data = osResources[key] || osResources['module-1']
  const isNotes = type === 'notes'

  return (
    <main className="study-page">
      <section className="study-hero">
        <Link to={`/operating-systems/${key}`} className="study-back-link">
          Back to presentation
        </Link>
        <p className="study-kicker">Operating Systems | BCS303 / 21CS43 | VTU</p>
        <h1>
          {module?.title || 'Module'} — {isNotes ? 'Module Notes' : 'Practice Questions'}
        </h1>
        <p className="study-subtitle">
          {isNotes
            ? 'Lecture-first revision notes distilled from the Operating Systems PPT sources — definitions, diagrams and numericals.'
            : 'VTU-style 5-mark and 10-mark practice. Answer with definition → diagram/simulation → worked example → takeaway.'}
        </p>
      </section>

      <section className="study-card">
        {isNotes ? <BookOpen size={24} /> : <FileQuestion size={24} />}
        <h2>{isNotes ? 'Quick Revision' : 'Question Bank'}</h2>
        {isNotes ? (
          <div className="question-list">
            {data.notes.map(([title, body], index) => (
              <article key={title} className="question-card">
                <span className="question-number">{String(index + 1).padStart(2, '0')}</span>
                <h3>{title}</h3>
                <p>{body}</p>
              </article>
            ))}
          </div>
        ) : (
          <div className="question-list">
            <h3>Important questions</h3>
            {data.questions.map((item, index) => (
              <article key={item} className="question-card">
                <span className="question-number">{String(index + 1).padStart(2, '0')}</span>
                <h3>{item}</h3>
                <p>Answer cue: define precisely, redraw the visual, work one numerical if it exists, close with one limitation.</p>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  )
}
