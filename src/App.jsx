import { cloneElement, isValidElement, useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { Link, Navigate, useLocation } from 'react-router-dom'
import { getSubject, subjects } from './data/subjects'
import IbProgramLanding from './components/IbProgramLanding'
import IbChapterIntro from './components/IbChapterIntro'
import LearningUniverse from './components/LearningUniverse'
import CourseLanding from './components/CourseLanding'
import { LabProgramSwitcher, LabSelector } from './lab'
import { FilmContinuity, PresentationEngine, TeachingControls, useLivingEngine, LIVING_MODES, DebugPanel, resolveEngineCapabilities, resolveHeroTier } from './cinematic'
import { recordProgress } from './lib/progress'
import { auditSlideOverflow } from './slideOverflowAudit'
import { applyContentDensity } from './slideContentDensity'
import {
  applyFrameTypography,
  fitSlideTitle,
  resolveTitleKind,
  TITLE_MAX_LINES,
  TITLE_MIN_PX,
} from './presentationTypography'

const subjectVisuals = {
  'analog-electronics-and-linear-integrated-circuits': 'analog',
  'automation-in-manufacturing': 'systems',
  'kinematics-of-machines': 'systems',
  'additional-mathematics-1': 'math',
  'digital-system-design-using-verilog': 'digital',
  'fluid-mechanics': 'analog',
  'materials-science-metallurgy': 'analog',
  'big-data-analytics': 'data',
  'information-network-security': 'security',
  'database-management-systems': 'database',
  'computer-networks': 'network',
  'theory-of-computation': 'automata',
  'parallel-computing': 'parallel',
  'object-oriented-programming-with-java': 'java',
  'international-business': 'global',
  'research-methodology-ipr': 'research',
  chemistry: 'chemistry',
  'deep-learning': 'deep-learning',
  'operating-systems': 'os',
  'artificial-intelligence': 'ai',
  'analog-electronics-linear-ics': 'analog',
  'data-structures': 'structures',
  'software-engineering-project-management': 'sepm',
  'computer-networks-bcs502': 'network',
  'computer-graphics-visualization': 'parallel',
  'unix-system-programming': 'os',
  'distributed-systems': 'network',
  'network-analysis': 'analog',
  'python-programming': 'code',
  'digital-communication': 'signal',
  // A circuits course gets the node-graph visual, same as network-analysis —
  // it is literally what the subject is.
  'electric-circuit-analysis': 'analog',
  'analog-electronics-circuits': 'analog',
  // High voltage apparatus is still built from the same circuit primitives.
  'high-voltage-engineering': 'analog',
  'electric-motor-drive-systems-ev': 'analog',
  // The other engineering-maths subjects already use `parallel`, which draws a
  // lattice of nodes — the closest thing the platform has to a maths visual.
  'complex-analysis-transforms-optimization': 'parallel',
  'differential-calculus-linear-algebra-1bmatc101': 'parallel',
  'differential-calculus-numerical-methods-1bmatc201': 'parallel',
  'differential-calculus-linear-algebra-1bmate101': 'parallel',
  'calculus-laplace-transforms-numerical-techniques-1bmate201': 'parallel',
  'differential-calculus-linear-algebra-1bmatm101': 'parallel',
  'multivariable-calculus-numerical-methods-1bmatm201': 'parallel',
  'calculus-linear-algebra-1bmats101': 'parallel',
  'numerical-methods-1bmats201': 'parallel',
  'applied-chemistry-sustainable-structures-1bchec102-202': 'chemistry',
  'applied-chemistry-emerging-electronics-1bchee102-202': 'chemistry',
  'applied-chemistry-metal-protection-energy-1bchem102-202': 'chemistry',
  'elements-biotechnology-biomimetics-1bebt105-205': 'chemistry',
  'elements-chemical-engineering-1beche105-205': 'chemistry',
  'quantum-physics-electronic-sensors-1bphec102-202': 'parallel',
  'electrical-engineering-materials-1bphee102-102': 'parallel',
  'physics-sustainable-structural-systems-1bphyc102-202': 'parallel',
  'physics-of-materials-1bphym102-202': 'parallel',
  'quantum-physics-applications-1bphys102-202': 'parallel',
  'principles-soil-science-agronomy-1bssa105-205': 'chemistry',
}

function routeState(pathname) {
  const [, subjectId, moduleId] = pathname.split('/')
  const subject = getSubject(subjectId)
  if (!subjectId) return { view: 'subjects' }
  if (!subject) return { view: 'missing' }
  if (!moduleId) return { view: 'modules', subject }
  if (moduleId === 'lab' && subject.labHub) return { view: 'lab-hub', subject }
  const module = subject.modules.find((item) => item.id === moduleId)
    || subject.labPrograms?.find((item) => item.id === moduleId)
  if (!module) return { view: 'missing' }
  return { view: 'presentation', subject, module }
}

function routeSearch(location) {
  if (location?.search) return location.search
  // HashRouter keeps query params inside the hash: #/path?slide=1
  if (typeof window === 'undefined') return ''
  const hash = window.location.hash || ''
  const q = hash.indexOf('?')
  return q >= 0 ? hash.slice(q) : ''
}

function slideFromSearch(search, slides) {
  const slideParam = new URLSearchParams(search.startsWith('?') ? search : `?${search}`).get('slide')
  if (!slideParam) return null
  if (/^\d+$/.test(slideParam)) {
    return Math.min(slides.length - 1, Math.max(0, Number(slideParam) - 1))
  }
  const byId = slides.findIndex((slide) => slide.id === slideParam)
  return byId >= 0 ? byId : null
}

function storedSlide(subjectId, moduleId, slides, search) {
  const fromSearch = slideFromSearch(search, slides)
  if (fromSearch !== null) return fromSearch

  const raw = window.sessionStorage.getItem(`presentation:${subjectId}:${moduleId}:slide`)
  const n = Number(raw)
  if (Number.isFinite(n)) return Math.min(slides.length - 1, Math.max(0, n))
  return 0
}

function resourceLinks(subjectId, moduleId) {
  if (subjectId === 'big-data-analytics' && (moduleId === 'module-1' || moduleId === 'module-5')) {
    return [
      { to: `/big-data-analytics/${moduleId}/notes`, label: 'Notes' },
      { to: `/big-data-analytics/${moduleId}/previous-year-questions`, label: 'Previous Year Questions' },
    ]
  }

  if (subjectId === 'database-management-systems') {
    return [
      { to: `/database-management-systems/${moduleId}/notes`, label: 'Notes' },
      { to: `/database-management-systems/${moduleId}/previous-year-questions`, label: 'Previous Year Questions' },
    ]
  }

  if (subjectId === 'theory-of-computation' && (moduleId === 'module-3' || moduleId === 'module-5')) {
    return [
      { to: `/theory-of-computation/${moduleId}/notes`, label: 'Notes' },
      { to: `/theory-of-computation/${moduleId}/previous-year-questions`, label: 'Previous Year Questions' },
    ]
  }

  if (subjectId === 'parallel-computing' && moduleId === 'module-1') {
    return [
      { to: '/parallel-computing/module-1/notes', label: 'Notes' },
      { to: '/parallel-computing/module-1/previous-year-questions', label: 'Previous Year Questions' },
    ]
  }

  if (subjectId === 'research-methodology-ipr') {
    return [
      { to: `/research-methodology-ipr/${moduleId}/notes`, label: 'Notes' },
      { to: `/research-methodology-ipr/${moduleId}/previous-year-questions`, label: 'Practice Questions' },
    ]
  }

  if (subjectId === 'chemistry') {
    return [
      { to: `/chemistry/${moduleId}/notes`, label: 'Notes' },
      { to: `/chemistry/${moduleId}/previous-year-questions`, label: 'Practice Questions' },
    ]
  }

  if (subjectId === 'deep-learning') {
    return [
      { to: `/deep-learning/${moduleId}/notes`, label: 'Notes' },
      { to: `/deep-learning/${moduleId}/previous-year-questions`, label: 'Practice Questions' },
      { to: `/deep-learning/${moduleId}/lab`, label: 'Practical / Lab' },
    ]
  }

  if (subjectId === 'operating-systems') {
    return [
      { to: `/operating-systems/${moduleId}/notes`, label: 'Notes' },
      { to: `/operating-systems/${moduleId}/previous-year-questions`, label: 'Previous Year Questions' },
    ]
  }

  if (subjectId === 'artificial-intelligence') {
    return [
      { to: `/artificial-intelligence/${moduleId}/notes`, label: 'Notes' },
      { to: `/artificial-intelligence/${moduleId}/previous-year-questions`, label: 'Previous Year Questions' },
    ]
  }

  if (subjectId === 'network-analysis') {
    return [
      { to: `/network-analysis/${moduleId}/notes`, label: 'Notes' },
      { to: `/network-analysis/${moduleId}/quiz`, label: 'Quiz' },
      { to: `/network-analysis/${moduleId}/assignment`, label: 'Assignment' },
      { to: `/network-analysis/${moduleId}/previous-year-questions`, label: 'Previous Year Questions' },
    ]
  }

  if (subjectId === 'python-programming') {
    return [
      { to: `/python-programming/${moduleId}/notes`, label: 'Notes' },
      { to: `/python-programming/${moduleId}/quiz`, label: 'Quiz' },
      { to: `/python-programming/${moduleId}/assignment`, label: 'Assignment' },
      { to: `/python-programming/${moduleId}/previous-year-questions`, label: 'Previous Year Questions' },
    ]
  }

  if (subjectId === 'digital-communication') {
    return [
      { to: `/digital-communication/${moduleId}/notes`, label: 'Notes' },
      { to: `/digital-communication/${moduleId}/quiz`, label: 'Quiz' },
      { to: `/digital-communication/${moduleId}/assignment`, label: 'Assignment' },
      { to: `/digital-communication/${moduleId}/previous-year-questions`, label: 'Previous Year Questions' },
    ]
  }

  return []
}

function AcademicHeader({ home = false }) {
  return (
    <header className="academic-header">
      <div className="academic-header-inner">
        <Link className="academic-brand" to="/" aria-label="Academic Presentations home">
          <span className="academic-brand-mark" aria-hidden="true">AP</span>
          <span>
            <strong>Academic Presentations</strong>
          </span>
        </Link>
        {!home && <Link className="academic-home" to="/">Home</Link>}
      </div>
    </header>
  )
}

function SubjectVisual({ type }) {
  return (
    <div className={`subject-visual subject-visual-${type}`} aria-hidden="true">
      {type === 'data' && (
        <>
          <span className="node n1" /><span className="node n2" /><span className="node n3" /><span className="node n4" />
          <i className="line l1" /><i className="line l2" /><i className="line l3" />
        </>
      )}
      {type === 'security' && (
        <>
          <span className="shield" /><span className="key-bar" /><span className="key-bit" />
        </>
      )}
      {type === 'database' && (
        <>
          <span className="db-top" /><span className="db-body" /><span className="db-row r1" /><span className="db-row r2" />
        </>
      )}
      {type === 'network' && (
        <>
          <span className="node n1" /><span className="node n2" /><span className="node n3" /><span className="node n4" /><span className="packet" />
          <i className="line l1" /><i className="line l2" /><i className="line l3" />
        </>
      )}
      {type === 'automata' && (
        <>
          <span className="state s1">q0</span><span className="state s2">q1</span><span className="state s3">q2</span>
          <i className="arrow a1" /><i className="arrow a2" />
        </>
      )}
      {type === 'parallel' && (
        <>
          <span className="rack r1" /><span className="rack r2" /><span className="rack r3" />
          <span className="chip" />
          <i className="particle p1" /><i className="particle p2" /><i className="particle p3" />
        </>
      )}
      {type === 'java' && (
        <>
          <span className="java-file" />
          <span className="java-vm">JVM</span>
          <i className="java-arrow" />
          <i className="java-code c1" /><i className="java-code c2" /><i className="java-code c3" />
        </>
      )}
      {type === 'global' && (
        <>
          <span className="globe" />
          <i className="route" />
        </>
      )}
      {type === 'chemistry' && (
        <>
          <span className="beaker" />
          <span className="fluid" />
          <span className="bubble b1" />
          <span className="bubble b2" />
          <span className="molecule" />
        </>
      )}
      {type === 'deep-learning' && (
        <>
          <span className="node n1" />
          <span className="node n2" />
          <span className="node n3" />
          <span className="node n4" />
          <i className="link l1" />
          <i className="link l2" />
          <i className="link l3" />
          <span className="scan" />
        </>
      )}
      {type === 'os' && (
        <>
          <span className="os-cpu-mini" />
          <span className="os-p1" />
          <span className="os-p2" />
          <span className="os-p3" />
        </>
      )}
      {type === 'ai' && (
        <>
          <span className="ai-eye" />
          <span className="ai-pupil" />
          <span className="ai-spark s1" />
          <span className="ai-spark s2" />
          <span className="ai-spark s3" />
        </>
      )}
      {type === 'research' && (
        <>
          <span className="shield" /><span className="key-bar" /><span className="key-bit" />
        </>
      )}
      {type === 'analog' && (
        <>
          <span className="node n1" /><span className="node n2" /><span className="node n3" />
          <i className="line l1" /><i className="line l2" />
        </>
      )}
      {type === 'structures' && (
        <>
          <span className="ds-cell c1" /><span className="ds-cell c2" /><span className="ds-cell c3" />
          <i className="ds-arrow a1" /><i className="ds-arrow a2" />
          <span className="ds-ptr" />
        </>
      )}
      {type === 'code' && (
        <>
          <span className="code-prompt">&gt;&gt;&gt;</span>
          <i className="code-line cl1" /><i className="code-line cl2" /><i className="code-line cl3" />
          <span className="code-caret" />
        </>
      )}
      {type === 'signal' && (
        <>
          <i className="sig-wave sw1" /><i className="sig-wave sw2" />
          <span className="sig-pt sp1" /><span className="sig-pt sp2" /><span className="sig-pt sp3" /><span className="sig-pt sp4" />
        </>
      )}
      {type === 'sepm' && (
        <>
          <span className="node n1" /><span className="node n2" /><span className="node n3" /><span className="node n4" />
          <i className="line l1" /><i className="line l2" /><i className="line l3" />
        </>
      )}
    </div>
  )
}

function SubjectSelector() {
  return (
    <main className="module-selector subject-selector">
      <AcademicHeader home />
      <section className="selector-inner" aria-labelledby="subject-selector-title">
        <div className="selector-hero">
          <p className="slide-kicker">ACADEMIC PRESENTATIONS</p>
          <h1 id="subject-selector-title">Select a Subject</h1>
          <p>Choose a subject to explore its modules and presentation material.</p>
        </div>

        <div className="module-cover-grid subject-cover-grid">
          {subjects.map((subject) => (
            <article key={subject.id} className={`module-cover subject-cover ${subject.accent}`}>
              <div className="module-cover-head">
                <span className="module-number">SUBJECT {subject.number}</span>
                <SubjectVisual type={subjectVisuals[subject.id]} />
              </div>
              <h2>{subject.title}</h2>
              <p>{subject.description}</p>
              <div className="available-modules">{subject.modules.length} {subject.modules.length === 1 ? 'Module' : 'Modules'}</div>
              <div className="module-topic-list" aria-label={`${subject.title} topics`}>
                {subject.keyAreas.map((area) => <span key={area}>{area}</span>)}
              </div>
              {subject.id === 'information-network-security' && (
                <div className="subject-crypto-mini" aria-hidden="true">
                  <span>Plaintext</span><b>Key</b><span>Ciphertext</span><b>Key</b><span>Plaintext</span>
                </div>
              )}
              {subject.id === 'computer-networks' && (
                <div className="subject-cn-mini" aria-hidden="true">
                  <span>Sender</span><b>Packet</b><span>Router</span><b>Frame</b><span>Receiver</span>
                </div>
              )}
              <Link className="module-open" to={`/${subject.id}`} aria-label={`Open ${subject.title}`}>
                Open Subject <span aria-hidden="true">→</span>
              </Link>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}

function ModuleSelector({ subject }) {
  if (subject.id === 'international-business') {
    return <IbProgramLanding subject={subject} />
  }

  return <CourseLanding subject={subject} />
}

// Legacy plain module grid — retained for reference / fallback.
function LegacyModuleSelector({ subject }) {
  return (
    <main className={`module-selector ${subject.accent}-selector`}>
      <AcademicHeader />
      <section className="selector-inner" aria-labelledby="module-selector-title">
        <div className="selector-hero">
          <Link className="breadcrumb-link" to="/">Subjects</Link>
          <p className="slide-kicker">{subject.title.toUpperCase()}</p>
          <h1 id="module-selector-title">Select a Module</h1>
          <p>
            {subject.id === 'big-data-analytics'
              ? 'Choose a chapter cover to continue the course journey from Big Data foundations to distributed storage and parallel processing.'
              : subject.id === 'information-network-security'
                ? 'Choose the crypto chapter to begin the Information and Network Security journey.'
                : subject.id === 'computer-networks'
                  ? 'Choose a unit to follow the message journey from signals and switching through Ethernet, wireless and IP delivery.'
                  : subject.id === 'theory-of-computation'
                    ? 'Choose the automata module to open the PPT-style journey from symbols and strings to DFA, NFA and epsilon-NFA conversion.'
                    : subject.id === 'parallel-computing'
                      ? 'Choose a module to watch computation split across CPUs, GPUs, memory systems, clusters and parallel programming models.'
                      : 'Choose a module to launch the progressive DBMS teaching experience with diagrams, simulations, quizzes and recap material.'}
          </p>
        </div>

        <div className="selector-flow" aria-hidden="true">
          {subject.moduleFlow.map((item, index) => (
            <span key={`${item}-${index}`}>{item}</span>
          ))}
        </div>

        <div className="module-cover-grid">
          {subject.modules.map((module) => {
            const links = resourceLinks(subject.id, module.id)
            return (
              <article key={module.id} className={`module-cover ${subject.accent} ${module.id}`}>
                <div className="module-cover-head">
                  <span className="module-number">MODULE {module.number}</span>
                  <span className="module-card-icon" aria-hidden="true">{module.label}</span>
                </div>
                <h2>{module.title}</h2>
                <p>{module.description}</p>
                <div className="module-topic-list" aria-label={`${module.title} topics`}>
                  {module.topics.map((topic) => <span key={topic}>{topic}</span>)}
                </div>
                <div className="module-action-row">
                  <Link className="module-open" to={`/${subject.id}/${module.id}`} aria-label={`Open ${module.title} presentation`}>
                    Open Presentation <span aria-hidden="true">→</span>
                  </Link>
                  {links.map((link) => (
                    <Link key={link.to} className="module-secondary-link" to={link.to}>
                      {link.label}
                    </Link>
                  ))}
                </div>
              </article>
            )
          })}

          {subject.futureModules?.map((label) => (
            <div key={label} className="module-cover disabled-cover" aria-disabled="true">
              <div className="module-cover-head">
                <span className="module-number">{label}</span>
              </div>
              <h2>Coming Soon</h2>
              <p>Reserved for future modules.</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}

function shouldSkipIbIntro(subjectId, moduleId, slides, search) {
  if (subjectId !== 'international-business') return true
  const params = new URLSearchParams(search)
  if (params.get('skipIntro') === '1') return true
  const fromSearch = slideFromSearch(search, slides)
  if (fromSearch != null && fromSearch > 0) return true
  const raw = window.sessionStorage.getItem(`presentation:${subjectId}:${moduleId}:slide`)
  const stored = Number(raw)
  if (Number.isFinite(stored) && stored > 0) return true
  return false
}

function LivingDeckShell({
  subject,
  module,
  showIbIntro,
  isCinematicFilm,
  children,
  onLecturerAdvance,
}) {
  const living = useLivingEngine()
  const livingEnabled = living.enabled

  return (
    <div
      className={`deck ${subject.accent}-deck${showIbIntro ? ' ib-intro-active' : ''}${isCinematicFilm ? ' cinematic-film' : ''}${livingEnabled ? ' living-engine' : ''}`}
      data-chem-module={subject.id === 'chemistry' ? String(Number(module.number || 1)) : undefined}
      data-dl-module={subject.id === 'deep-learning' ? String(Number(module.number || 1)) : undefined}
      data-os-module={subject.id === 'operating-systems' ? String(Number(module.number || 1)) : undefined}
      data-ai-module={subject.id === 'artificial-intelligence' ? String(Number(module.number || 1)) : undefined}
      data-ae-module={subject.id === 'analog-electronics-linear-ics' ? String(Number(module.number || 1)) : undefined}
      data-ds-module={subject.id === 'data-structures' ? String(Number(module.number || 1)) : undefined}
      data-se-module={subject.id === 'software-engineering-project-management' ? String(Number(module.number || 1)) : undefined}
      data-cn502-module={subject.id === 'computer-networks-bcs502' ? String(Number(module.number || 1)) : undefined}
      data-cg-module={subject.id === 'computer-graphics-visualization' ? String(Number(module.number || 1)) : undefined}
      data-unix-module={subject.id === 'unix-system-programming' ? String(Number(module.number || 1)) : undefined}
      data-dist-module={subject.id === 'distributed-systems' ? String(Number(module.number || 1)) : undefined}
      data-na-module={subject.id === 'network-analysis' ? String(Number(module.number || 1)) : undefined}
      data-py-module={subject.id === 'python-programming' ? String(Number(module.number || 1)) : undefined}
      data-dc-module={subject.id === 'digital-communication' ? String(Number(module.number || 1)) : undefined}
      data-eca-module={subject.id === 'electric-circuit-analysis' ? String(Number(module.number || 1)) : undefined}
      data-aec-module={subject.id === 'analog-electronics-circuits' ? String(Number(module.number || 1)) : undefined}
      data-cat-module={subject.id === 'complex-analysis-transforms-optimization' ? String(Number(module.number || 1)) : undefined}
      data-hve-module={subject.id === 'high-voltage-engineering' ? String(Number(module.number || 1)) : undefined}
      data-emd-module={subject.id === 'electric-motor-drive-systems-ev' ? String(Number(module.number || 1)) : undefined}
      data-msm-module={subject.id === 'materials-science-metallurgy' ? String(Number(module.number || 1)) : undefined}
      data-fm-module={subject.id === 'fluid-mechanics' ? String(Number(module.number || 1)) : undefined}
      data-dsd-module={subject.id === 'digital-system-design-using-verilog' ? String(Number(module.number || 1)) : undefined}
      data-kom-module={subject.id === 'kinematics-of-machines' ? String(Number(module.number || 1)) : undefined}
      data-aim-module={subject.id === 'automation-in-manufacturing' ? String(Number(module.number || 1)) : undefined}
      data-aea-module={subject.id === 'analog-electronics-and-linear-integrated-circuits' ? String(Number(module.number || 1)) : undefined}
      data-am1-module={subject.id === 'additional-mathematics-1' ? String(Number(module.number || 1)) : undefined}
      data-lab-program={module.kind === 'lab-program' ? module.id : undefined}
      data-living-mode={livingEnabled ? living.livingMode : undefined}
      data-focus-mode={livingEnabled && living.focusActive ? 'true' : 'false'}
      data-living-paused={livingEnabled && living.paused ? 'true' : 'false'}
      data-hide-decorative={livingEnabled && living.hideDecorative ? 'true' : 'false'}
      data-motion-budget={livingEnabled ? living.motionBudget : undefined}
      data-reveal-step={livingEnabled ? living.revealStep : undefined}
      data-revisit={livingEnabled && living.revisit ? 'true' : 'false'}
      style={livingEnabled ? { '--living-duration-scale': living.durationScale } : undefined}
      onClickCapture={(event) => {
        if (!livingEnabled || living.livingMode !== LIVING_MODES.LECTURER) return
        if (event.target.closest('button, a, input, textarea, .living-controls, .slide-header-tools')) return
        onLecturerAdvance?.()
        living.advanceReveal()
      }}
    >
      {children}
      {!showIbIntro && <TeachingControls visible={livingEnabled} />}
    </div>
  )
}

function filmMetaFromSlide(slide) {
  const film = slide?.film || {}
  const notes = slide?.notes || ''
  const hero = Boolean(film.hero || film.finale || notes.includes('/hero'))
  const finale = Boolean(film.finale)
  const heroTier = resolveHeroTier({
    finale,
    hero,
    heroTier: film.heroTier,
    chapterOpener: Boolean(film.chapterOpener),
    chapterPayoff: Boolean(film.chapterPayoff),
    heroPlanned: Boolean(film.heroPlanned),
    wow: Boolean(film.wow),
  })
  return {
    ...film,
    hero,
    finale,
    heroTier,
    longForm: Boolean(film.longForm || notes.includes('documentary-read')),
    hasDiagram: film.hasDiagram !== false,
  }
}

/**
 * Presentation Typography Engine (V3.3) — slide title owner.
 * Semantic line breaks + editorial measure + projector-safe scaling.
 * Never clips. Never ellipsises. Header geometry follows data-title-lines.
 */
function SlideTitle({ text, kind = 'teaching', frameRef }) {
  const ref = useRef(null)

  useLayoutEffect(() => {
    const el = ref.current
    if (!el || !text) return undefined

    const fit = () => {
      const result = fitSlideTitle(el, text, {
        maxLines: TITLE_MAX_LINES,
        minPx: TITLE_MIN_PX,
      })
      if (result) {
        el.dataset.semantic = result.semantic ? '1' : '0'
        const frame = frameRef?.current
          || el.closest?.('.slide-frame')
        applyFrameTypography(frame, { kind, lines: result.lines })
      }
    }

    fit()

    const parent = el.parentElement
    let lastWidth = parent ? Math.round(parent.getBoundingClientRect().width) : -1
    let observer
    if (parent && typeof ResizeObserver !== 'undefined') {
      observer = new ResizeObserver((entries) => {
        const width = Math.round(entries[0].contentRect.width)
        // Only refit on width changes — refitting alters our own height, so
        // reacting to height would loop.
        if (width !== lastWidth) {
          lastWidth = width
          fit()
        }
      })
      observer.observe(parent)
    }
    // Height-only viewport changes shift the responsive font tokens without
    // changing width; catch those via the window resize event.
    window.addEventListener('resize', fit)

    return () => {
      if (observer) observer.disconnect()
      window.removeEventListener('resize', fit)
    }
  }, [text, kind, frameRef])

  return <h1 className="slide-title" data-lines="1" ref={ref}>{text}</h1>
}

function PresentationShell({ subject, module }) {
  const location = useLocation()
  const slides = module.slides
  const totalSlides = slides.length
  const [index, setIndex] = useState(() => storedSlide(subject.id, module.id, slides, routeSearch(location)))
  const [replayKey, setReplayKey] = useState(0)
  const [mode, setMode] = useState('student')
  const [laserOn, setLaserOn] = useState(false)
  const [laser, setLaser] = useState({ x: 50, y: 50 })
  const [annotationOn, setAnnotationOn] = useState(false)
  const [annotations, setAnnotations] = useState([])
  const [startedAt] = useState(() => Date.now())
  const [elapsed, setElapsed] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [ibIntroDone, setIbIntroDone] = useState(() => shouldSkipIbIntro(subject.id, module.id, slides, routeSearch(location)))
  const [filmCutKey, setFilmCutKey] = useState(0)
  const annotationRef = useRef(null)
  const frameRef = useRef(null)
  const slide = slides[index] ?? slides[0]
  const progress = ((index + 1) / totalSlides) * 100
  const engine = resolveEngineCapabilities(subject)
  const showIbIntro = engine.chapterIntro && Boolean(module.chapter) && !ibIntroDone
  const isCinematicFilm = engine.cinematicFilm
  const livingEnabled = engine.living
  const film = filmMetaFromSlide(slide)
  const moduleNumber = Number(String(module.id).replace(/\D/g, '')) || 1
  const titleKind = resolveTitleKind(slide)

  const displayContent = useMemo(() => {
    if (typeof slide.content === 'function') return slide.content({ mode })
    if (isValidElement(slide.content) && typeof slide.content.type !== 'string') {
      return cloneElement(slide.content, { mode })
    }
    return slide.content
  }, [mode, slide])

  useEffect(() => {
    const search = routeSearch(location)
    setIndex(storedSlide(subject.id, module.id, slides, search))
    setReplayKey((current) => current + 1)
    setAnnotations([])
    setIbIntroDone(shouldSkipIbIntro(subject.id, module.id, slides, search))
    setFilmCutKey(0)
  }, [location, module.id, slides, subject.id])

  useEffect(() => {
    if (index >= totalSlides) {
      setIndex(Math.max(0, totalSlides - 1))
      setReplayKey((current) => current + 1)
      setAnnotations([])
    }
  }, [index, totalSlides])

  const next = useCallback(() => {
    setIndex((current) => Math.min(totalSlides - 1, current + 1))
    setAnnotations([])
  }, [totalSlides])

  const prev = useCallback(() => {
    setIndex((current) => Math.max(0, current - 1))
    setAnnotations([])
  }, [])

  useEffect(() => {
    window.sessionStorage.setItem(`presentation:${subject.id}:${module.id}:slide`, String(index))
    recordProgress(subject.id, module.id, index, totalSlides)
  }, [index, module.id, subject.id, totalSlides])

  /* V3.2 — classify content density after paint so sparse slides enlarge + center */
  useLayoutEffect(() => {
    if (showIbIntro) return undefined
    const frame = frameRef.current
    if (!frame) return undefined

    if (slide.sparseLock || slide.contentDensityLock) {
      frame.setAttribute('data-sparse-lock', 'true')
    } else {
      frame.removeAttribute('data-sparse-lock')
    }

    const options = {
      composition: slide.composition || slide.layout || 'standard',
      titleKind,
      heroTier: film.heroTier || 'none',
      forced: slide.contentDensity || undefined,
    }

    let cancelled = false
    let settleTimer = 0
    let resizeTimer = 0
    let lastWidth = Math.round(frame.getBoundingClientRect().width)
    const run = () => {
      if (cancelled) return
      applyContentDensity(frame, options)
    }

    const raf = window.requestAnimationFrame(() => {
      settleTimer = window.setTimeout(run, 48)
    })

    let observer
    if (typeof ResizeObserver !== 'undefined') {
      observer = new ResizeObserver((entries) => {
        const width = Math.round(entries[0]?.contentRect?.width || frame.getBoundingClientRect().width)
        // Ignore height-only churn from our own body-scale typography uplift.
        if (width === lastWidth) return
        lastWidth = width
        window.clearTimeout(resizeTimer)
        resizeTimer = window.setTimeout(run, 90)
      })
      observer.observe(frame)
    }

    return () => {
      cancelled = true
      window.cancelAnimationFrame(raf)
      window.clearTimeout(settleTimer)
      window.clearTimeout(resizeTimer)
      if (observer) observer.disconnect()
    }
  }, [
    film.heroTier,
    index,
    replayKey,
    showIbIntro,
    slide.composition,
    slide.contentDensity,
    slide.contentDensityLock,
    slide.id,
    slide.layout,
    slide.sparseLock,
    titleKind,
  ])

  useEffect(() => {
    if (!import.meta.env.DEV || showIbIntro) return undefined
    let cancelled = false
    const run = () => {
      if (cancelled) return
      const root = document.querySelector(`.${subject.accent}-deck .slide-frame`)
      if (!root) return
      auditSlideOverflow({
        subjectId: subject.id,
        moduleLabel: module.label,
        slideId: slide.id,
        slideTitle: slide.title,
        root,
      })
    }
    const raf = window.requestAnimationFrame(() => {
      window.setTimeout(run, 480)
    })
    return () => {
      cancelled = true
      window.cancelAnimationFrame(raf)
    }
  }, [index, module.id, module.label, replayKey, showIbIntro, slide.id, slide.title, subject.accent, subject.id])

  const toggleFullscreen = useCallback(async () => {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen()
      } else {
        await document.exitFullscreen()
      }
    } catch {
      // Fullscreen can be blocked by the browser.
    }
  }, [])

  useEffect(() => {
    const onFullscreenChange = () => setIsFullscreen(Boolean(document.fullscreenElement))
    document.addEventListener('fullscreenchange', onFullscreenChange)
    return () => document.removeEventListener('fullscreenchange', onFullscreenChange)
  }, [])

  useEffect(() => {
    const onKeyDown = (event) => {
      if (showIbIntro) return
      const key = event.key

      if (key === 'ArrowRight' || key === 'PageDown' || key === ' ') {
        event.preventDefault()
        next()
      }
      if (key === 'ArrowLeft' || key === 'PageUp') {
        event.preventDefault()
        prev()
      }
      if (key === 'Home') {
        event.preventDefault()
        setIndex(0)
        setReplayKey((current) => current + 1)
        setAnnotations([])
      }
      if (key === 'End') {
        event.preventDefault()
        setIndex(totalSlides - 1)
        setReplayKey((current) => current + 1)
        setAnnotations([])
      }
      if (key === 'f' || key === 'F') {
        event.preventDefault()
        toggleFullscreen()
      }
      if (key === 'r' || key === 'R') {
        event.preventDefault()
        setReplayKey((current) => current + 1)
        setAnnotations([])
      }
      if (key === 'Escape' && document.fullscreenElement) {
        document.exitFullscreen().catch(() => {})
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [next, prev, showIbIntro, toggleFullscreen, totalSlides])

  useEffect(() => {
    const timer = window.setInterval(() => {
      setElapsed(Math.floor((Date.now() - startedAt) / 1000))
    }, 1000)
    return () => window.clearInterval(timer)
  }, [startedAt])

  useEffect(() => {
    setAnnotations([])
    if (isCinematicFilm) {
      setFilmCutKey((current) => current + 1)
    } else {
      setReplayKey((current) => current + 1)
    }
  }, [index, isCinematicFilm])

  const isBlankHeader = slide.hideTitle || slide.layout === 'full'

  const moveLaser = useCallback((event) => {
    if (!laserOn) return
    const rect = event.currentTarget.getBoundingClientRect()
    setLaser({
      x: ((event.clientX - rect.left) / rect.width) * 100,
      y: ((event.clientY - rect.top) / rect.height) * 100,
    })
  }, [laserOn])

  const addAnnotation = useCallback((event) => {
    if (!annotationOn) return
    const rect = event.currentTarget.getBoundingClientRect()
    setAnnotations((items) => [
      ...items.slice(-11),
      {
        x: ((event.clientX - rect.left) / rect.width) * 100,
        y: ((event.clientY - rect.top) / rect.height) * 100,
      },
    ])
  }, [annotationOn])

  return (
    <PresentationEngine
      enabled={livingEnabled}
      subjectId={subject.id}
      moduleId={module.id}
      slide={slide}
      slideIndex={index}
      totalSlides={totalSlides}
      film={film}
      onReplay={() => {
        setReplayKey((current) => current + 1)
        setAnnotations([])
      }}
    >
      <LivingDeckShell
        subject={subject}
        module={module}
        showIbIntro={showIbIntro}
        isCinematicFilm={isCinematicFilm}
      >
      {showIbIntro && (
        <IbChapterIntro
          key={`intro-${module.id}`}
          subject={subject}
          module={module}
          onComplete={() => setIbIntroDone(true)}
        />
      )}
      <main className="slide-stage" aria-hidden={showIbIntro ? 'true' : undefined}>
        <FilmContinuity
          enabled={isCinematicFilm && !showIbIntro}
          moduleNumber={moduleNumber}
          emotion={film.emotion || module.chapter?.emotion?.toLowerCase() || 'curiosity'}
          symbol={film.symbol || 'trade-route'}
          identity={film.identity}
          callback={film.callback}
          transition={film.transition || 'soft-carry'}
          quiet={Boolean(film.quiet)}
          finale={Boolean(film.finale)}
          cutKey={filmCutKey}
        />
        <article
          ref={frameRef}
          key={`${subject.id}-${module.id}-${slide.id}-${replayKey}`}
          className={`slide-frame ${slide.tone || ''} mode-${mode} ${subject.id === 'big-data-analytics' ? `bd-${module.id}` : ''} ${subject.id === 'information-network-security' ? `ins-${module.id}` : ''} ${subject.id === 'international-business' ? `ib-${module.id}` : ''} ${laserOn ? 'laser-active' : ''}`.trim()}
          data-density={slide.density || 'normal'}
          data-composition={slide.composition || slide.layout || 'standard'}
          data-camera={subject.id === 'artificial-intelligence' ? (slide.signature?.camera || film.camera) : undefined}
          data-ai-family={subject.id === 'artificial-intelligence' ? slide.signature?.animationFamily : undefined}
          data-title-kind={isBlankHeader ? undefined : titleKind}
          data-quiet={film.quiet ? 'true' : 'false'}
          data-finale={film.finale ? 'true' : 'false'}
          data-hero-tier={film.heroTier || 'none'}
          data-film-transition={film.transition || undefined}
          data-sparse-lock={slide.sparseLock || slide.contentDensityLock ? 'true' : undefined}
          aria-live="polite"
          onMouseMove={moveLaser}
        >
          {!isBlankHeader ? (
            <header className="slide-header">
              <div className="slide-header-copy">
                {slide.kicker && <p className="slide-kicker">{slide.kicker}</p>}
                <SlideTitle text={slide.title} kind={titleKind} frameRef={frameRef} />
                {slide.subtitle && <p className="slide-subtitle">{slide.subtitle}</p>}
              </div>
            </header>
          ) : (
            <header className="slide-header" style={{ paddingBottom: 0 }}>
              <div className="slide-header-copy">
                {slide.kicker && <p className="slide-kicker">{slide.kicker}</p>}
              </div>
            </header>
          )}

          <section className="slide-body" data-slide-stage="true" onClick={addAnnotation}>
            {displayContent}
            {laserOn && <span className="laser-dot" style={{ left: `${laser.x}%`, top: `${laser.y}%` }} aria-hidden="true" />}
            {annotationOn && (
              <svg ref={annotationRef} className="annotation-layer" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
                {annotations.map((point, i) => (
                  <circle key={`${point.x}-${point.y}-${i}`} cx={point.x} cy={point.y} r="1.15" />
                ))}
              </svg>
            )}
          </section>

          <footer className="slide-footer">
            <span className="footer-brand">
              {module.kind === 'lab-program' ? `${subject.title} / Lab / ${module.label}` : subject.title}
            </span>
            <span>
              {module.label} • Slide {index + 1}
            </span>
          </footer>
        </article>
      </main>

      {mode === 'presenter' && (
        <aside className="presenter-panel">
          <div>
            <span>Timer</span>
            <strong>{Math.floor(elapsed / 60)}:{String(elapsed % 60).padStart(2, '0')}</strong>
          </div>
          <div>
            <span>Current</span>
            <strong>{slide.title || module.title}</strong>
          </div>
          <div>
            <span>Next</span>
            <strong>{slides[index + 1]?.title || (film.finale ? 'Journey complete' : 'End of chapter')}</strong>
          </div>
          <p>{slide.notes || 'Use this slide as a complete classroom explanation beat. Pause on the diagram and connect it to the next slide.'}</p>
        </aside>
      )}

      <div className="controls">
        <div className="nav-group">
          <button className="nav-btn" onClick={prev} disabled={index === 0} type="button" aria-label="Previous slide">
            ←
          </button>
          <button className="nav-btn" onClick={next} disabled={index === totalSlides - 1} type="button" aria-label="Next slide">
            →
          </button>
          <button className="nav-btn" onClick={toggleFullscreen} type="button" aria-label="Toggle fullscreen">
            {isFullscreen ? 'Exit' : 'Full'}
          </button>
          <button className={`nav-btn ${laserOn ? 'active-tool' : ''}`} onClick={() => setLaserOn((value) => !value)} type="button" aria-label="Toggle laser pointer">
            Laser
          </button>
          <button className={`nav-btn ${annotationOn ? 'active-tool' : ''}`} onClick={() => setAnnotationOn((value) => !value)} type="button" aria-label="Toggle annotations">
            Ink
          </button>
          <button className="nav-btn" onClick={() => setAnnotations([])} type="button" aria-label="Clear annotations">
            Clear
          </button>
          <button
            className={`nav-btn ${mode === 'presenter' ? 'active-tool' : ''}`}
            onClick={() => setMode((value) => (value === 'presenter' ? 'student' : 'presenter'))}
            type="button"
            aria-pressed={mode === 'presenter'}
            aria-label="Toggle presenter notes"
          >
            Notes
          </button>
        </div>

        <div className="progress-wrap">
          <div className="progress-meta">
            <span>Slide {index + 1}</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="progress-bar" aria-hidden="true">
            <div className="progress-fill" style={{ width: `${progress}%` }} />
          </div>
        </div>

        <Link className="deck-link" to={module.kind === 'lab-program' ? `/${subject.id}/lab` : `/${subject.id}`}>
          {module.kind === 'lab-program'
            ? 'Lab Programs'
            : subject.id === 'international-business'
              ? 'Chapters'
              : subject.segmentLabel
                ? `${subject.segmentLabel}s`
                : 'Modules'}
        </Link>
        {module.kind === 'lab-program' && <LabProgramSwitcher currentId={module.id} />}
        <Link className="deck-link" to="/">Subjects</Link>
        <div className="hint">← → • Space • R • F</div>
      </div>

      <DebugPanel
        subjectId={subject.id}
        moduleId={module.id}
        slide={slide}
        slideIndex={index}
        slides={slides}
        film={film}
      />
      </LivingDeckShell>
    </PresentationEngine>
  )
}

function App() {
  const location = useLocation()
  const current = routeState(location.pathname)

  if (current.view === 'subjects') return <LearningUniverse />
  if (current.view === 'modules') return <ModuleSelector subject={current.subject} />
  if (current.view === 'lab-hub') return <LabSelector subject={current.subject} />
  if (current.view === 'presentation') {
    return (
      <PresentationShell
        key={`${current.subject.id}-${current.module.id}`}
        subject={current.subject}
        module={current.module}
      />
    )
  }
  return <Navigate to="/" replace />
}

export default App
