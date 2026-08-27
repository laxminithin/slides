import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, ExternalLink } from 'lucide-react'
import { MODULE1_NOTES_PDF, MODULE1_NOTES_PDF_LABEL } from '../constants/assets'

/**
 * In-app PDF viewer for Module 1 notes (public PDF, not copied elsewhere).
 */
export default function PdfNotesViewer() {
  useEffect(() => {
    document.body.classList.add('study-scroll')
    return () => document.body.classList.remove('study-scroll')
  }, [])

  return (
    <div className="study-page notes-page">
      <header className="study-topbar">
        <div className="study-topbar-inner">
          <Link to="/big-data-analytics/module-1?slide=study-resources" className="study-back">
            <ArrowLeft size={18} strokeWidth={2} />
            Back to Module 1
          </Link>
          <div className="study-topbar-copy">
            <p className="study-label">BIS701 • Module 1</p>
            <h1>Module 1 Notes</h1>
            <p className="study-subtitle">{MODULE1_NOTES_PDF_LABEL}</p>
          </div>
          <a className="study-top-link" href={MODULE1_NOTES_PDF} target="_blank" rel="noreferrer">
            Open in new tab <ExternalLink size={14} strokeWidth={2} />
          </a>
        </div>
      </header>

      <div className="pdf-frame-wrap">
        <object data={MODULE1_NOTES_PDF} type="application/pdf" className="pdf-frame" aria-label="Module 1 Notes PDF">
          <iframe title="Module 1 Notes PDF" src={MODULE1_NOTES_PDF} className="pdf-frame" />
          <div className="pdf-fallback">
            <p>Your browser could not display the PDF inline.</p>
            <a href={MODULE1_NOTES_PDF} target="_blank" rel="noreferrer">
              Open {MODULE1_NOTES_PDF_LABEL}
            </a>
          </div>
        </object>
      </div>

      <footer className="study-footer-nav">
        <div className="study-footer-inner">
          <Link to="/big-data-analytics/module-1/previous-year-questions" className="study-footer-btn">
            Previous Year Questions
          </Link>
          <Link to="/big-data-analytics/module-1?slide=study-resources" className="study-footer-btn ghost">
            Back to Presentation
          </Link>
        </div>
      </footer>
    </div>
  )
}
