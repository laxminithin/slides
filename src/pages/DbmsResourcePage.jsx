import { useEffect } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { ArrowLeft, BookOpen, FileQuestion } from 'lucide-react'
import { getModule } from '../data/subjects'

const questionBank = {
  'module-1': [
    'Explain file system limitations and advantages of DBMS with examples.',
    'Describe three schema architecture with a neat diagram.',
    'Differentiate DDL, DML, DCL and TCL commands.',
    'Explain super, candidate, primary, alternate, foreign and composite keys.',
  ],
  'module-2': [
    'Construct an ER diagram for a library or college database.',
    'Explain strong entity, weak entity, attributes and relationships.',
    'Describe cardinality and participation constraints with examples.',
    'Convert an ER model into relational schemas.',
  ],
  'module-3': [
    'Write SQL queries using WHERE, ORDER BY, GROUP BY and HAVING.',
    'Explain joins with examples and result tables.',
    'Differentiate views, indexes, triggers, procedures and functions.',
    'Write transaction commands using COMMIT, ROLLBACK and SAVEPOINT.',
  ],
  'module-4': [
    'Explain functional dependency and attribute closure.',
    'Find minimal cover for a given set of dependencies.',
    'Normalize a relation up to 3NF or BCNF.',
    'Explain lossless join and dependency preservation.',
  ],
  'module-5': [
    'Explain ACID properties with a bank transfer example.',
    'Test a schedule for conflict serializability.',
    'Explain 2PL, strict 2PL, deadlock and starvation.',
    'Describe WAL, checkpoint, UNDO and REDO recovery.',
  ],
}

export default function DbmsResourcePage({ type }) {
  const { moduleId } = useParams()
  const module = getModule('database-management-systems', moduleId)

  useEffect(() => {
    document.body.classList.add('study-scroll')
    return () => document.body.classList.remove('study-scroll')
  }, [])

  if (!module) return <Navigate to="/database-management-systems" replace />

  const questions = questionBank[moduleId] || []
  const isNotes = type === 'notes'

  return (
    <div className="study-page pyq-page">
      <header className="study-topbar">
        <div className="study-topbar-inner">
          <Link to={`/database-management-systems/${moduleId}`} className="study-back">
            <ArrowLeft size={18} strokeWidth={2} />
            Back to {module.label}
          </Link>
          <div className="study-topbar-copy">
            <p className="study-label">BCS403 • {module.label}</p>
            <h1>{module.title} — {isNotes ? 'Notes' : 'Previous Year Questions'}</h1>
            <p className="study-subtitle">DBMS VTU study support generated from the interactive module.</p>
          </div>
        </div>
      </header>

      <main className="study-main">
        <section className="most-important">
          <div className="most-important-head">
            {isNotes ? <BookOpen size={24} /> : <FileQuestion size={24} />}
            <h2>{isNotes ? 'Module Notes Outline' : 'High-Yield Question Bank'}</h2>
            <p>{isNotes ? 'Use this as a printable structure while the interactive lesson remains the main teaching surface.' : 'Expandable answer writing can be added as soon as official PYQ source material is supplied.'}</p>
          </div>
          <div className="pyq-list-section">
            {questions.map((item, index) => (
              <article key={item} className="question-card">
                <div className="question-card-main">
                  <span className="question-number">{index + 1}</span>
                  <div>
                    <h3>{isNotes ? item.replace('Explain ', '').replace('Describe ', '') : item}</h3>
                    <p>{isNotes ? 'Definition, diagram, worked example, exam point and common mistake.' : 'Answer cue: define the term, draw the relevant table or diagram, then close with one DBMS-specific example.'}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>

      <footer className="study-footer-nav">
        <div className="study-footer-inner">
          <Link to={`/database-management-systems/${moduleId}/${isNotes ? 'previous-year-questions' : 'notes'}`} className="study-footer-btn">
            {isNotes ? 'Previous Year Questions' : 'Open Notes'}
          </Link>
          <Link to={`/database-management-systems/${moduleId}`} className="study-footer-btn ghost">
            Back to Presentation
          </Link>
        </div>
      </footer>
    </div>
  )
}
