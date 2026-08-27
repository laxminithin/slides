import { FileQuestion, BookOpen, ArrowRight, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'

/**
 * Final chapter slide — Learn → Understand → Revise → Prepare
 * Rendered inside the existing 16:9 slide frame.
 */
export default function StudyResourcesSlide() {
  return (
    <div className="study-resources-slide">
      <p className="study-resources-arc">
        <span>Learn</span>
        <span aria-hidden="true">→</span>
        <span>Understand</span>
        <span aria-hidden="true">→</span>
        <span>Revise</span>
        <span aria-hidden="true">→</span>
        <span className="active">Prepare</span>
      </p>

      <div className="study-resources-grid">
        <Link to="/big-data-analytics/module-1/previous-year-questions" className="study-resource-card">
          <div className="study-resource-icon" aria-hidden="true">
            <FileQuestion size={28} strokeWidth={1.75} />
          </div>
          <div className="study-resource-copy">
            <h3>Previous Year Questions</h3>
            <p>
              Explore Module 1 questions asked in VTU examinations from the last five years, along with detailed
              answers.
            </p>
          </div>
          <span className="study-resource-cta">
            Open PYQ companion <ArrowRight size={16} strokeWidth={2} />
          </span>
        </Link>

        <Link to="/big-data-analytics/module-1/notes" className="study-resource-card notes">
          <div className="study-resource-icon" aria-hidden="true">
            <BookOpen size={28} strokeWidth={1.75} />
          </div>
          <div className="study-resource-copy">
            <h3>Module 1 Notes</h3>
            <p>Open the complete Module 1 notes for revision and exam preparation.</p>
          </div>
          <span className="study-resource-cta">
            Open notes PDF <ArrowRight size={16} strokeWidth={2} />
          </span>
        </Link>
      </div>

      <p className="study-resources-footnote">
        <Sparkles size={14} strokeWidth={2} aria-hidden="true" />
        Interactive revision tools designed to match this presentation’s visual language.
      </p>
    </div>
  )
}
