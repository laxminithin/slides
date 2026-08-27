import { Link } from 'react-router-dom'
import IbChapterMotif from './IbChapterMotif'

const roman = ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ', 'Ⅵ']

export default function IbProgramLanding({ subject }) {
  const program = subject.program
  const continueId = program?.continueTo || subject.modules[0]?.id
  const lessonCount = subject.modules.reduce((sum, module) => sum + (module.slides?.length || 0), 0)

  return (
    <main className="module-selector international-business-selector ib-program-landing">
      <div className="ib-landing-atmosphere" aria-hidden="true" />

      <section className="ib-program-hero" aria-labelledby="ib-program-title">
        <Link className="breadcrumb-link ib-landing-crumb" to="/">Subjects</Link>

        <p className="ib-program-kicker">
          {subject.title.toUpperCase()} · {program?.code || '22MBA401'} · {program?.edition || 'EXECUTIVE EDITION'}
        </p>

        <h1 id="ib-program-title">{subject.title}</h1>
        <p className="ib-program-tagline">{program?.tagline || 'Master Global Markets'}</p>

        <div className="ib-program-pillars" aria-label="Program pillars">
          {(program?.pillars || subject.keyAreas.slice(0, 4)).map((pillar) => (
            <span key={pillar}>{pillar}</span>
          ))}
        </div>

        <div className="ib-program-rule" aria-hidden="true" />

        <div className="ib-program-stats">
          {[
            [String(subject.modules.length), 'Modules'],
            [`${lessonCount}+`, 'Interactive lessons'],
            ['CEO', 'Decision framing'],
            ['Global', 'Business journey'],
          ].map(([value, label], index) => (
            <article key={label} style={{ '--i': index }}>
              <strong>{value}</strong>
              <span>{label}</span>
            </article>
          ))}
        </div>

        <div className="ib-program-cta-row">
          <Link
            className="ib-program-cta"
            to={`/${subject.id}/${continueId}`}
            aria-label={`${program?.continueLabel || 'Continue Learning'} — open first module`}
            onClick={() => {
              window.sessionStorage.setItem(`presentation:${subject.id}:${continueId}:slide`, '0')
            }}
          >
            {program?.continueLabel || 'Continue Learning'}
            <span aria-hidden="true">→</span>
          </Link>
          <a className="ib-program-secondary" href="#ib-chapters">
            Explore chapters
          </a>
        </div>
      </section>

      <section className="ib-chapter-section" id="ib-chapters" aria-labelledby="ib-chapters-title">
        <div className="ib-chapter-section-head">
          <p className="ib-program-kicker">Program chapters</p>
          <h2 id="ib-chapters-title">Choose your next executive chapter</h2>
          <p>Each module opens with its own identity — emotion, metaphor and decision lens.</p>
        </div>

        <div className="ib-chapter-grid">
          {subject.modules.map((module, index) => {
            const chapter = module.chapter || {}
            return (
              <article
                key={module.id}
                className={`ib-chapter-card motif-${chapter.motif || 'trade-routes'} chapter-${module.id}`}
                style={{ '--i': index }}
              >
                <div className="ib-chapter-card-top">
                  <span className="ib-chapter-index" aria-hidden="true">{roman[index] || module.number}</span>
                  <IbChapterMotif motif={chapter.motif || 'trade-routes'} />
                </div>

                <p className="ib-chapter-emotion">{chapter.emotion || module.label}</p>
                <h3>{chapter.headline || module.title}</h3>
                <p className="ib-chapter-lead">{chapter.lead || module.description}</p>
                <p className="ib-chapter-source-title">{module.title}</p>

                <div className="ib-chapter-topics" aria-label={`${module.title} topics`}>
                  {module.topics.slice(0, 4).map((topic) => <span key={topic}>{topic}</span>)}
                </div>

                <Link
                  className="ib-chapter-open"
                  to={`/${subject.id}/${module.id}`}
                  aria-label={`Enter ${chapter.emotion || module.label}: ${module.title}`}
                  onClick={() => {
                    window.sessionStorage.setItem(`presentation:${subject.id}:${module.id}:slide`, '0')
                  }}
                >
                  Enter chapter <span aria-hidden="true">→</span>
                </Link>
              </article>
            )
          })}
        </div>
      </section>
    </main>
  )
}
