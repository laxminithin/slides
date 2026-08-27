import { Link } from 'react-router-dom'
import { countLessons, estimateStudyTime, getChapterIdentity, getCourseMeta } from '../data/courseMeta'
import { getModuleProgress, getSubjectProgress, isModuleComplete } from '../lib/progress'
import CourseWorld from './CourseWorld'

const roman = ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ', 'Ⅵ', 'Ⅶ', 'Ⅷ']

/**
 * CourseLanding — the reusable premium course page (brief sections 3, 4, 6, 16).
 *
 * Course hero → insights → learning-journey timeline → chapter library.
 * Every non-IB subject plugs into this one framework while keeping its own
 * visual world (CourseWorld) and chapter identity (getChapterIdentity).
 * International Business keeps its bespoke IbProgramLanding.
 */
export default function CourseLanding({ subject }) {
  const meta = getCourseMeta(subject.id)
  const lessons = countLessons(subject)
  const progress = getSubjectProgress(subject)
  const tint = meta?.tint || ['#2563eb', '#0ea5a4']
  const resume = firstUnfinished(subject)
  const started = progress > 0
  const segment = subject.segmentLabel || meta?.segmentLabel || 'Chapter'
  const segmentPlural = `${segment}s`

  return (
    <main
      className={`course-landing ${subject.accent}-landing`}
      style={{ '--t1': tint[0], '--t2': tint[1] }}
    >
      <div className="cl-atmosphere" aria-hidden="true" />

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="cl-hero">
        <Link className="cl-crumb" to="/"><span aria-hidden="true">←</span> Learning Universe</Link>

        <div className="cl-hero-grid">
          <div className="cl-hero-copy">
            <p className="cl-kicker">{meta?.track || subject.shortTitle} · {subject.title}</p>
            <h1>{meta?.tagline || subject.title}</h1>
            <p className="cl-essence">{meta?.essence || subject.description}</p>

            <div className="cl-pillars" aria-label="Key areas">
              {(meta?.keywords || subject.keyAreas.slice(0, 4)).map((k) => <span key={k}>{k}</span>)}
            </div>

            <div className="cl-cta-row">
              <Link
                className="cl-cta"
                to={resume.to}
                onClick={() => seed(subject.id, resume.moduleId, resume.slideIndex)}
              >
                {started ? 'Continue learning' : 'Begin course'} <span aria-hidden="true">→</span>
              </Link>
              <a className="cl-cta-ghost" href="#cl-chapters">Explore {segmentPlural.toLowerCase()}</a>
            </div>
          </div>

          <div className="cl-hero-world" aria-hidden="true">
            <CourseWorld world={meta?.world || 'data'} variant="hero" />
          </div>
        </div>
      </section>

      {/* ── INSIGHTS ─────────────────────────────────────────── */}
      <section className="cl-insights" aria-label="Course insights">
        {[
          [String(subject.modules.length), segmentPlural],
          [String(lessons), 'Interactive lessons'],
          [estimateStudyTime(lessons), 'Est. study time'],
          [meta?.difficulty || 'Course', 'Level'],
          [started ? `${progress}%` : 'New', started ? 'Completed' : 'Start today'],
        ].map(([value, label], i) => (
          <article key={label} style={{ '--i': i }}>
            <strong>{value}</strong>
            <span>{label}</span>
          </article>
        ))}
      </section>

      {/* ── LEARNING JOURNEY TIMELINE ────────────────────────── */}
      <section className="cl-journey" aria-label="Learning journey">
        <div className="cl-section-head">
          <p className="cl-kicker">The journey</p>
          <h2>Your path through {subject.shortTitle}</h2>
        </div>
        <ol className="cl-timeline">
          {subject.modules.map((module, i) => {
            const total = module.slides?.length || 0
            const complete = isModuleComplete(subject.id, module.id, total)
            const record = getModuleProgress(subject.id, module.id)
            const active = !complete && record
            const identity = getChapterIdentity(subject, module, i)
            return (
              <li
                key={module.id}
                className={`cl-node ${complete ? 'is-complete' : ''} ${active ? 'is-active' : ''}`}
                style={{ '--i': i }}
              >
                <Link to={`/${subject.id}/${module.id}`} onClick={() => seed(subject.id, module.id, 0)}>
                  <span className="cl-node-dot" aria-hidden="true" />
                  <span className="cl-node-word">{identity.word}</span>
                  <span className="cl-node-num">{segment} {module.number}</span>
                </Link>
              </li>
            )
          })}
        </ol>
      </section>

      {/* ── CHAPTER LIBRARY ──────────────────────────────────── */}
      <section className="cl-chapters" id="cl-chapters" aria-labelledby="cl-chapters-title">
        <div className="cl-section-head">
          <p className="cl-kicker">Chapters</p>
          <h2 id="cl-chapters-title">Choose your next {segment.toLowerCase()}</h2>
          <p>Each {segment.toLowerCase()} opens with its own identity — a lens, a metaphor, a story.</p>
        </div>

        <div className="cl-chapter-grid">
          {subject.modules.map((module, i) => {
            const identity = getChapterIdentity(subject, module, i)
            const total = module.slides?.length || 0
            const complete = isModuleComplete(subject.id, module.id, total)
            const record = getModuleProgress(subject.id, module.id)
            const pct = record && total ? Math.round((Math.min(total - 1, record.furthest) + 1) / total * 100) : 0
            return (
              <article
                key={module.id}
                className={`cl-chapter ${complete ? 'is-complete' : ''}`}
                style={{ '--i': i }}
              >
                <div className="cl-chapter-top">
                  <span className="cl-chapter-index" aria-hidden="true">{roman[i] || module.number}</span>
                  {complete && <span className="cl-chapter-done">✓ Complete</span>}
                  {!complete && pct > 0 && <span className="cl-chapter-inprog">{pct}%</span>}
                </div>

                <p className="cl-chapter-word">{identity.word}</p>
                <h3>{module.title}</h3>
                <p className="cl-chapter-lead">{identity.quote || module.description}</p>

                <div className="cl-chapter-topics">
                  {module.topics.slice(0, 4).map((t) => <span key={t}>{t}</span>)}
                </div>

                <div className="cl-chapter-foot">
                  <span className="cl-chapter-lessons">{total} lessons</span>
                  <Link
                    className="cl-chapter-open"
                    to={`/${subject.id}/${module.id}`}
                    onClick={() => seed(subject.id, module.id, 0)}
                    aria-label={`Enter ${identity.word}: ${module.title}`}
                  >
                    Enter {segment.toLowerCase()} <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </article>
            )
          })}
        </div>
      </section>

      {subject.id === 'big-data-analytics' && subject.labHub && (
        <section className="cl-lab-band" id="cl-lab" aria-labelledby="cl-lab-title">
          <div className="cl-section-head">
            <p className="cl-kicker">Practical</p>
            <h2 id="cl-lab-title">Laboratory</h2>
            <p>A separate interactive lab — not Module 6. Open a program, then watch the data move.</p>
          </div>
          <Link className="cl-lab-tile" to={`/${subject.id}/lab`}>
            <div>
              <p className="cl-lab-kicker">Programs · Code walkthroughs · Dry runs · Execution</p>
              <h3>Lab Module</h3>
              <p>HDFS, MapReduce, Pig, Hive and Spark — each experiment taught as a visual execution tutor.</p>
              <span className="cl-lab-cta">Open laboratory →</span>
            </div>
            <div className="cl-lab-glyph" aria-hidden="true">{'</>'}</div>
          </Link>
        </section>
      )}
    </main>
  )
}

/** Persist the starting slide the way App.jsx expects, before navigating. */
function seed(subjectId, moduleId, slideIndex) {
  try {
    window.sessionStorage.setItem(`presentation:${subjectId}:${moduleId}:slide`, String(slideIndex))
  } catch {
    /* best-effort */
  }
}

/** First module the learner hasn't finished (for the hero CTA). */
function firstUnfinished(subject) {
  for (const module of subject.modules) {
    const total = module.slides?.length || 0
    if (!isModuleComplete(subject.id, module.id, total)) {
      const record = getModuleProgress(subject.id, module.id)
      const slideIndex = record ? Math.min(total - 1, record.furthest) : 0
      return { moduleId: module.id, slideIndex, to: `/${subject.id}/${module.id}?slide=${slideIndex + 1}` }
    }
  }
  const first = subject.modules[0]
  return { moduleId: first.id, slideIndex: 0, to: `/${subject.id}/${first.id}` }
}
