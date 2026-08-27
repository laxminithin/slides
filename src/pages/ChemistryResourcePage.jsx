import { Link, useParams } from 'react-router-dom'
import { BookOpen, FileQuestion } from 'lucide-react'
import { getSubject } from '../data/subjects'
import module1 from '../chemistry/data/module1.json'
import module2 from '../chemistry/data/module2.json'
import module3 from '../chemistry/data/module3.json'
import module4 from '../chemistry/data/module4.json'
import module5 from '../chemistry/data/module5.json'

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
    if (slide.definition) {
      picks.push([slide.definition.term, slide.definition.text])
    } else if (slide.layout === 'formula' || /equation|formula|nernst|cpr|\bmn\b|\bmw\b/i.test(slide.title)) {
      const line = slide.points.find((p) => /=/.test(p)) || slide.points.find((p) => p.length > 20)
      if (line) picks.push([slide.title, line])
    } else {
      const point = (slide.points || []).find((p) => p && p.length > 40 && !/^(tell|explain|ask|use |show |make |start |open |connect |contrast )/i.test(p))
      if (point) picks.push([slide.title, point])
    }
    if (picks.length >= 10) break
  }
  return picks
}

function vivaFrom(moduleData) {
  const exam = moduleData.slides.find((s) => /viva/i.test(s.title))
  if (exam?.points?.length) return exam.points.filter((p) => p.length > 8).slice(0, 12)
  return moduleData.slides
    .filter((s) => s.layout === 'definition' || s.definition)
    .slice(0, 10)
    .map((s) => `Define / explain: ${s.title}`)
}

function questionsFrom(moduleData) {
  const exam = moduleData.slides.find((s) => /exam questions/i.test(s.title))
  if (exam?.points?.length) {
    return exam.points.filter((p) => p.length > 12).slice(0, 12)
  }
  return moduleData.slides
    .filter((s) => /construction|working|applications|synthesis|principle/i.test(s.title))
    .slice(0, 10)
    .map((s) => `Explain ${s.title.toLowerCase()}.`)
}

export default function ChemistryResourcePage({ type = 'notes' }) {
  const { moduleId = 'module-1' } = useParams()
  const subject = getSubject('chemistry')
  const module = subject?.modules?.find((item) => item.id === moduleId) || subject?.modules?.[0]
  const key = module?.id || 'module-1'
  const data = dataByModule[key] || module1
  const isNotes = type === 'notes'
  const notes = notesFrom(data)
  const viva = vivaFrom(data)
  const questions = questionsFrom(data)

  return (
    <main className="study-page">
      <section className="study-hero">
        <Link to={`/chemistry/${key}`} className="study-back-link">
          Back to presentation
        </Link>
        <p className="study-kicker">Applied Chemistry for Smart Systems | 1BCHES102/202</p>
        <h1>
          {module?.title || 'Module'} — {isNotes ? 'Module Notes' : 'Practice Questions'}
        </h1>
        <p className="study-subtitle">
          {isNotes
            ? 'Lecture-first revision notes extracted from the Chemistry module PPT sources.'
            : 'Viva and important-question practice aligned to the module PPT. Use structure → property → device → application.'}
        </p>
      </section>

      <section className="study-card">
        {isNotes ? <BookOpen size={24} /> : <FileQuestion size={24} />}
        <h2>{isNotes ? 'Quick Revision' : 'Question Bank'}</h2>
        {isNotes ? (
          <div className="question-list">
            {notes.map(([title, body], index) => (
              <article key={`${title}-${index}`} className="question-card">
                <span className="question-number">{String(index + 1).padStart(2, '0')}</span>
                <h3>{title}</h3>
                <p>{body}</p>
              </article>
            ))}
          </div>
        ) : (
          [
            ['Viva Questions', viva],
            ['Important Questions', questions],
          ].map(([title, items]) => (
            <div key={title} className="question-list">
              <h3>{title}</h3>
              {items.map((item, index) => (
                <article key={`${title}-${item}`} className="question-card">
                  <span className="question-number">{String(index + 1).padStart(2, '0')}</span>
                  <h3>{item}</h3>
                  <p>Answer cue: define precisely, show the visual/process, then close with one engineering application.</p>
                </article>
              ))}
            </div>
          ))
        )}
      </section>
    </main>
  )
}
