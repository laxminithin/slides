import { Link, useParams } from 'react-router-dom'
import { BookOpen, FileQuestion, FlaskConical } from 'lucide-react'
import { getSubject } from '../data/subjects'
import module1 from '../deepLearning/data/module1.json'
import module2 from '../deepLearning/data/module2.json'
import module3 from '../deepLearning/data/module3.json'
import module4 from '../deepLearning/data/module4.json'
import module5 from '../deepLearning/data/module5.json'
import { LAB_EXPERIMENTS } from '../deepLearning/resources/lab.js'

const dataByModule = {
  'module-1': module1,
  'module-2': module2,
  'module-3': module3,
  'module-4': module4,
  'module-5': module5,
}

function notesFrom(moduleData) {
  const picks = []
  for (const slide of moduleData.slides) {
    if (slide.formula) {
      picks.push([slide.title, slide.formula])
    } else {
      const point = (slide.points || []).find(
        (p) => p && p.length > 36 && !/^(tell|explain|ask|use |show |make |start )/i.test(p),
      )
      if (point) picks.push([slide.title, point])
    }
    if (picks.length >= 12) break
  }
  return picks
}

function questionsFrom(moduleData) {
  const exam = moduleData.slides.find((s) => /exam answer|vocabulary|coverage checklist/i.test(s.title))
  if (exam?.points?.length) {
    return exam.points.filter((p) => p.length > 8).slice(0, 12).map((p) => `Explain: ${p}`)
  }
  return moduleData.syllabus?.map((item) => `Explain ${item.topic}.`) || []
}

function vivaFrom(moduleData) {
  return (moduleData.syllabus || []).slice(0, 10).map((item) => `Define / state: ${item.topic}`)
}

export default function DeepLearningResourcePage({ type = 'notes' }) {
  const { moduleId = 'module-1' } = useParams()
  const subject = getSubject('deep-learning')
  const module = subject?.modules?.find((item) => item.id === moduleId) || subject?.modules?.[0]
  const key = module?.id || 'module-1'
  const data = dataByModule[key] || module1
  const isNotes = type === 'notes'
  const isLab = type === 'lab'
  const notes = notesFrom(data)
  const viva = vivaFrom(data)
  const questions = questionsFrom(data)

  return (
    <main className="study-page">
      <section className="study-hero">
        <Link to={`/deep-learning/${key}`} className="study-back-link">
          Back to presentation
        </Link>
        <p className="study-kicker">Deep Learning | BCA701 | Semester 7</p>
        <h1>
          {module?.title || 'Module'} — {isLab ? 'Practical / Lab' : isNotes ? 'Module Notes' : 'Practice Questions'}
        </h1>
        <p className="study-subtitle">
          {isLab
            ? 'Official IPCC practical track — separate from theory lecture slides.'
            : isNotes
              ? 'Lecture-first revision notes extracted from the Deep Learning module PPT sources.'
              : 'Syllabus-aligned practice questions. Use definition → diagram → condition → conclusion.'}
        </p>
      </section>

      <section className="study-card">
        {isLab ? <FlaskConical size={24} /> : isNotes ? <BookOpen size={24} /> : <FileQuestion size={24} />}
        <h2>{isLab ? 'Lab Experiments' : isNotes ? 'Quick Revision' : 'Question Bank'}</h2>

        {isLab && (
          <div className="question-list">
            {LAB_EXPERIMENTS.map((item, index) => (
              <article key={item.title} className="question-card">
                <span className="question-number">{String(index + 1).padStart(2, '0')}</span>
                <h3>{item.title}</h3>
                <p>{item.goal}</p>
                <p><strong>Focus:</strong> {item.focus}</p>
              </article>
            ))}
          </div>
        )}

        {isNotes && (
          <div className="question-list">
            {notes.map(([title, body], index) => (
              <article key={`${title}-${index}`} className="question-card">
                <span className="question-number">{String(index + 1).padStart(2, '0')}</span>
                <h3>{title}</h3>
                <p>{body}</p>
              </article>
            ))}
            <article className="question-card">
              <span className="question-number">SY</span>
              <h3>Syllabus coverage</h3>
              <p>{(data.syllabus || []).map((s) => `${s.topic} — ${s.status}`).join(' · ')}</p>
            </article>
          </div>
        )}

        {!isNotes && !isLab && (
          [
            ['Viva / Short answers', viva],
            ['Important questions', questions],
          ].map(([title, items]) => (
            <div key={title} className="question-list">
              <h3>{title}</h3>
              {items.map((item, index) => (
                <article key={`${title}-${item}`} className="question-card">
                  <span className="question-number">{String(index + 1).padStart(2, '0')}</span>
                  <h3>{item}</h3>
                  <p>Answer cue: define precisely, redraw the visual, state the condition, close with one limitation.</p>
                </article>
              ))}
            </div>
          ))
        )}
      </section>
    </main>
  )
}
