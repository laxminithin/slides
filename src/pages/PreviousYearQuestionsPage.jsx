import { useCallback, useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, BookOpen } from 'lucide-react'
import QuestionSearch from '../components/study/QuestionSearch'
import QuestionAccordion from '../components/study/QuestionAccordion'
import RevisionProgress from '../components/study/RevisionProgress'
import { MODULE1_NOTES_PDF, MODULE1_NOTES_PDF_LABEL } from '../constants/assets'
import { MOST_IMPORTANT_IDS, module1Questions } from '../data/module1Questions'

const STORAGE_KEY = 'bda-m1-revised-questions'

function loadRevised() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return new Set()
    const list = JSON.parse(raw)
    return new Set(Array.isArray(list) ? list : [])
  } catch {
    return new Set()
  }
}

export default function PreviousYearQuestionsPage() {
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState('all')
  const [openId, setOpenId] = useState(null)
  const [revisedIds, setRevisedIds] = useState(() => loadRevised())

  useEffect(() => {
    document.body.classList.add('study-scroll')
    return () => document.body.classList.remove('study-scroll')
  }, [])

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...revisedIds]))
  }, [revisedIds])

  const availableFilters = useMemo(() => {
    const ids = ['all', 'repeated', 'priority']
    if (module1Questions.some((q) => q.marks === 5)) ids.push('marks-5')
    if (module1Questions.some((q) => q.marksBand === '8-10' || (q.marks != null && q.marks >= 8))) {
      ids.push('marks-8-10')
    }
    return ids
  }, [])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return module1Questions.filter((item) => {
      if (filter === 'repeated' && !item.repeated) return false
      if (filter === 'priority' && !(item.priority === 'very-high' || item.priority === 'high')) return false
      if (filter === 'marks-5' && item.marks !== 5) return false
      if (filter === 'marks-8-10' && !(item.marksBand === '8-10' || (item.marks != null && item.marks >= 8))) {
        return false
      }
      if (!q) return true
      const hay = [item.question, item.shortTitle, ...(item.topics || []), ...(item.years || [])]
        .join(' ')
        .toLowerCase()
      return hay.includes(q)
    })
  }, [query, filter])

  const important = useMemo(
    () => MOST_IMPORTANT_IDS.map((id) => module1Questions.find((q) => q.id === id)).filter(Boolean),
    [],
  )

  const onToggle = useCallback((id) => {
    setOpenId((current) => (current === id ? null : id))
  }, [])

  const onToggleRevised = useCallback((id) => {
    setRevisedIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }, [])

  const jumpToImportant = useCallback((id) => {
    setFilter('all')
    setQuery('')
    setOpenId(id)
    requestAnimationFrame(() => {
      const el = document.getElementById(id)
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
  }, [])

  return (
    <div className="study-page pyq-page">
      <header className="study-topbar">
        <div className="study-topbar-inner">
          <Link to="/big-data-analytics/module-1?slide=study-resources" className="study-back">
            <ArrowLeft size={18} strokeWidth={2} />
            Back to Module 1
          </Link>
          <div className="study-topbar-copy">
            <p className="study-label">BIS701 • Module 1</p>
            <h1>Module 1 — Previous Year Questions</h1>
            <p className="study-subtitle">VTU Big Data Analytics | Previous Year Questions with Answers</p>
          </div>
        </div>
      </header>

      <main className="study-main">
        <RevisionProgress revisedCount={revisedIds.size} total={module1Questions.length} />

        <QuestionSearch
          query={query}
          onQueryChange={setQuery}
          filter={filter}
          onFilterChange={setFilter}
          availableFilters={availableFilters}
        />

        <section className="most-important" aria-label="Most important questions">
          <div className="most-important-head">
            <h2>Most Important for Module 1</h2>
            <p>Jump to high-yield topics for exam preparation.</p>
          </div>
          <div className="most-important-list">
            {important.map((item, index) => (
              <button
                key={item.id}
                type="button"
                className="most-important-item"
                onClick={() => jumpToImportant(item.id)}
              >
                <span className="mi-index">{index + 1}</span>
                <span className="mi-title">{item.shortTitle}</span>
              </button>
            ))}
          </div>
        </section>

        <section className="pyq-list-section">
          <div className="pyq-list-head">
            <h2>Complete Question Bank</h2>
            <p>
              Showing {filtered.length} of {module1Questions.length} questions
            </p>
          </div>

          {filtered.length === 0 ? (
            <div className="pyq-empty">No questions match your search or filter.</div>
          ) : (
            <QuestionAccordion
              questions={filtered}
              openId={openId}
              onToggle={onToggle}
              revisedIds={revisedIds}
              onToggleRevised={onToggleRevised}
            />
          )}
        </section>
      </main>

      <footer className="study-footer-nav">
        <div className="study-footer-inner">
          <Link to="/big-data-analytics/module-1/notes" className="study-footer-btn">
            <BookOpen size={16} strokeWidth={2} />
            Open Module 1 Notes
          </Link>
          <a className="study-footer-btn ghost" href={MODULE1_NOTES_PDF} target="_blank" rel="noreferrer">
            {MODULE1_NOTES_PDF_LABEL}
          </a>
          <Link to="/big-data-analytics/module-1?slide=study-resources" className="study-footer-btn ghost">
            Back to Presentation
          </Link>
        </div>
      </footer>
    </div>
  )
}
