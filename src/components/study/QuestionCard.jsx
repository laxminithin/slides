import { ChevronDown, Check } from 'lucide-react'
import PriorityBadge from './PriorityBadge'
import { getPriorityLabel } from '../../data/module1Questions'

export default function QuestionCard({
  question,
  open,
  onToggle,
  revised,
  onToggleRevised,
}) {
  const yearLabel =
    question.years && question.years.length > 0
      ? question.years.join(' · ')
      : 'Previous VTU Question'

  return (
    <article
      id={question.id}
      className={`question-card ${open ? 'open' : ''} ${revised ? 'revised' : ''}`.trim()}
    >
      <button type="button" className="question-card-header" onClick={onToggle} aria-expanded={open}>
        <div className="question-card-main">
          <div className="question-card-meta">
            <span className="question-number">Q{question.number}</span>
            <PriorityBadge priority={question.priority} label={getPriorityLabel(question.priority)} />
            {question.repeated && <span className="question-chip">Repeated</span>}
            {question.marks != null && <span className="question-chip marks">{question.marks} Marks</span>}
          </div>
          <h3 className="question-text">{question.question}</h3>
          <p className="question-years">{yearLabel}</p>
        </div>
        <span className="question-chevron" aria-hidden="true">
          <ChevronDown size={20} strokeWidth={2} />
        </span>
      </button>

      <div className="question-card-collapse" aria-hidden={!open} inert={!open ? true : undefined}>
        <div className="question-card-body">
          <div className="answer-content">{question.answer}</div>
          <div className="question-card-actions">
            <button
              type="button"
              className={`revise-btn ${revised ? 'on' : ''}`.trim()}
              onClick={(e) => {
                e.stopPropagation()
                onToggleRevised()
              }}
            >
              <Check size={16} strokeWidth={2.25} />
              {revised ? 'Revised ✓' : 'Mark as Revised'}
            </button>
          </div>
        </div>
      </div>
    </article>
  )
}
