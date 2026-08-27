import { Link } from 'react-router-dom'
import { subjects, getSubject, getModule } from '../data/subjects'
import { countLessons, estimateStudyTime, getCourseMeta } from '../data/courseMeta'
import { getLastVisited, getModuleProgress, getSubjectProgress } from '../lib/progress'
import CourseWorld from './CourseWorld'

/**
 * LearningUniverse — the reimagined home (brief sections 1, 2, 8).
 *
 * Replaces the old subject grid ("file browser") with a curated library:
 *   • a "Continue Learning" resume hero when there is saved progress
 *   • premium course cards, each a world with tagline, mood, stats and progress
 */
export default function LearningUniverse() {
  const last = getLastVisited()
  const resume = buildResume(last)

  return (
    <main className="lu-page">
      <div className="lu-aurora" aria-hidden="true" />
      <UniverseHeader />

      <section className="lu-inner">
        <header className="lu-welcome">
          <p className="lu-eyebrow">Learning Universe</p>
          <h1>{resume ? 'Welcome back' : 'Welcome to your learning universe'}</h1>
          <p className="lu-lede">
            {resume
              ? 'Pick up exactly where you left off, or step into another world.'
              : 'Seven curated courses. Every subject is a world — every chapter, a story.'}
          </p>
        </header>

        {resume && <ResumeCard resume={resume} />}

        <div className="lu-section-head">
          <h2>Explore programs</h2>
          <p>{subjects.length} courses · {totalLessons()} interactive lessons</p>
        </div>

        <div className="lu-course-grid">
          {subjects.map((subject, index) => (
            <CourseCard key={subject.id} subject={subject} index={index} />
          ))}
        </div>
      </section>

      <footer className="lu-footer">
        <span>Academic Presentations</span>
        <span>A premium learning experience</span>
      </footer>
    </main>
  )
}

function UniverseHeader() {
  return (
    <header className="lu-topbar">
      <Link className="lu-brand" to="/" aria-label="Learning Universe home">
        <span className="lu-brand-mark" aria-hidden="true">AP</span>
        <span className="lu-brand-copy">
          <strong>Academic Presentations</strong>
          <small>Learning Universe</small>
        </span>
      </Link>
    </header>
  )
}

function ResumeCard({ resume }) {
  const { subject, module, meta, slideNumber, totalSlides, to } = resume
  const tint = meta?.tint || ['#2563eb', '#0ea5a4']
  const pct = totalSlides ? Math.round((slideNumber / totalSlides) * 100) : 0
  return (
    <Link
      className={`lu-resume ${subject.accent}`}
      to={to}
      style={{ '--t1': tint[0], '--t2': tint[1] }}
      aria-label={`Resume ${subject.title}, ${module.label}, slide ${slideNumber}`}
    >
      <div className="lu-resume-world">
        <CourseWorld world={meta?.world || 'data'} variant="card" />
      </div>
      <div className="lu-resume-copy">
        <p className="lu-resume-kicker">Continue learning</p>
        <h3>{subject.title}</h3>
        <p className="lu-resume-sub">{module.label} · {module.title}</p>
        <div className="lu-resume-bar" aria-hidden="true">
          <span style={{ width: `${pct}%` }} />
        </div>
        <p className="lu-resume-meta">Lesson {slideNumber} of {totalSlides} · {pct}% through this chapter</p>
      </div>
      <span className="lu-resume-cta">Resume <span aria-hidden="true">→</span></span>
    </Link>
  )
}

function CourseCard({ subject, index }) {
  const meta = getCourseMeta(subject.id)
  const lessons = countLessons(subject)
  const progress = getSubjectProgress(subject)
  const tint = meta?.tint || ['#2563eb', '#0ea5a4']
  const started = progress > 0
  return (
    <Link
      className={`lu-course ${subject.accent}`}
      to={`/${subject.id}`}
      style={{ '--t1': tint[0], '--t2': tint[1], '--i': index }}
      aria-label={`Open ${subject.title}`}
    >
      <div className="lu-course-world">
        <CourseWorld world={meta?.world || 'data'} variant="card" />
        <span className="lu-course-track">{meta?.track || 'Course'}</span>
      </div>

      <div className="lu-course-body">
        <h3>{subject.title}</h3>
        <p className="lu-course-tagline">{meta?.tagline || subject.description}</p>

        <div className="lu-course-stats">
          <span><strong>{subject.modules.length}</strong> Modules</span>
          <span><strong>{lessons}</strong> Lessons</span>
          <span><strong>{estimateStudyTime(lessons)}</strong></span>
        </div>

        <div className="lu-course-foot">
          {started ? (
            <div className="lu-course-progress" aria-label={`${progress}% complete`}>
              <div className="lu-course-progress-bar"><span style={{ width: `${progress}%` }} /></div>
              <em>{progress}%</em>
            </div>
          ) : (
            <span className="lu-course-diff">{meta?.difficulty || 'Course'}</span>
          )}
          <span className="lu-course-cta">{started ? 'Continue' : 'Enter'} <span aria-hidden="true">→</span></span>
        </div>
      </div>
    </Link>
  )
}

function buildResume(last) {
  if (!last) return null
  const subject = getSubject(last.subjectId)
  const module = getModule(last.subjectId, last.moduleId)
  if (!subject || !module) return null
  const totalSlides = module.slides?.length || 0
  const record = getModuleProgress(subject.id, module.id)
  const slideIndex = Math.min(totalSlides - 1, Math.max(last.slideIndex || 0, record?.furthest || 0))
  return {
    subject,
    module,
    meta: getCourseMeta(subject.id),
    slideNumber: slideIndex + 1,
    totalSlides,
    to: `/${subject.id}/${module.id}?slide=${slideIndex + 1}`,
  }
}

function totalLessons() {
  return subjects.reduce((sum, subject) => sum + countLessons(subject), 0)
}
