import {
  ComparisonLayout,
  Lead,
  Points,
  ProcessPath,
  StoryHook,
  Takeaway,
  TwoColumn,
  VisualFirst,
} from '../components/Teaching'
import { NetworkJourney } from './CnKit'

/** Shared slide factories for Computer Networks-I (10CS55) — Unit terminology. */

const UNIT_OPENERS = {
  1: {
    cinematic: 'From Message to Network',
    question: 'How do two machines actually communicate?',
  },
  2: {
    cinematic: 'Signals Carry the Network',
    question: 'How does information become a physical signal?',
  },
  3: {
    cinematic: 'Sharing and Switching',
    question: 'How do many users share links and reach destinations?',
  },
  4: {
    cinematic: 'When Bits Go Wrong',
    question: 'How does a network detect corrupted data?',
  },
  5: {
    cinematic: 'Reliable Frame Delivery',
    question: 'How do two directly connected devices communicate safely?',
  },
  6: {
    cinematic: 'Who Gets the Medium?',
    question: 'How do many devices share one channel?',
  },
  7: {
    cinematic: 'Networking Without Wires',
    question: 'How do devices communicate through the air?',
  },
  8: {
    cinematic: 'Across Networks',
    question: 'How does a packet find a remote destination?',
  },
}

export function unitTitle(unitNumber, title, subtitle, visual = <NetworkJourney />) {
  const opener = UNIT_OPENERS[unitNumber] || {
    cinematic: title,
    question: subtitle,
  }

  return {
    id: `cn-u${unitNumber}-title`,
    kicker: 'Computer Networks-I · 10CS55',
    title: null,
    hideTitle: true,
    layout: 'full',
    contentDensity: 'sparse',
    content: (
      <div className={`title-hero cnx-title-hero cnx-unit-${unitNumber}`}>
        <div>
          <p className="slide-kicker">COMPUTER NETWORKS-I · 10CS55</p>
          <h1>Unit {String(unitNumber).padStart(2, '0')}</h1>
          <span className="cnx-cinematic-title">{opener.cinematic}</span>
          <p className="cnx-opener-question">{opener.question}</p>
          <p className="subtitle">{title}</p>
          <div className="badge-row">
            <span className="pill">Laptop A → Computer B</span>
            <span className="pill">Forouzan Aligned</span>
          </div>
        </div>
        <div className="layout-visual">{visual}</div>
      </div>
    ),
  }
}

export function cinematicDivider({
  id,
  kicker = 'Section',
  title,
  line,
  visual,
}) {
  return {
    id,
    kicker: null,
    title: null,
    hideTitle: true,
    layout: 'full',
    contentDensity: 'sparse',
    content: (
      <div className="cnx-divider">
        <div className="cnx-divider-copy">
          <span className="cnx-divider-kicker">{kicker}</span>
          <h2>{title}</h2>
          {line && <p>{line}</p>}
        </div>
        <div className="cnx-divider-visual">{visual}</div>
      </div>
    ),
  }
}

export function slide({
  id,
  kicker,
  title,
  subtitle,
  visual,
  points,
  takeaway,
  steps = 0,
  ratio = 'copy-visual',
  contentDensity,
}) {
  return {
    id,
    kicker,
    title,
    subtitle,
    steps,
    contentDensity,
    content: (
      <TwoColumn visual={visual} ratio={ratio}>
        {/* subtitle already renders in the editorial slide header — do not
           repeat it as a body Lead (removes duplicated copy + top-heavy dead
           space). Keep a Lead only when no bullet points carry the copy. */}
        {subtitle && !points && <Lead>{subtitle}</Lead>}
        {points && <Points items={points} />}
        {takeaway && <Takeaway>{takeaway}</Takeaway>}
      </TwoColumn>
    ),
  }
}

export function visualSlide({ id, kicker, title, lead, visual, takeaway, steps = 0, contentDensity }) {
  return {
    id,
    kicker,
    title,
    steps,
    contentDensity: contentDensity || 'sparse',
    content: (
      <VisualFirst
        lead={lead}
        visual={visual}
        takeaway={takeaway && <Takeaway>{takeaway}</Takeaway>}
      />
    ),
  }
}

export function hookSlide({ id, kicker, title, statement, support, visual, steps = 0 }) {
  return {
    id,
    kicker,
    title,
    steps,
    contentDensity: 'sparse',
    content: <StoryHook statement={statement} support={support} visual={visual} />,
  }
}

export function compareSlide({ id, kicker, title, left, right, footer, steps = 0 }) {
  return {
    id,
    kicker,
    title,
    steps,
    content: <ComparisonLayout left={left} right={right} footer={footer} />,
  }
}

export function formulaSlide({
  id,
  kicker,
  title,
  formula,
  symbols,
  example,
  visual,
  takeaway,
}) {
  return {
    id,
    kicker,
    title,
    content: (
      <TwoColumn
        ratio="copy-visual"
        visual={visual || <ProcessPath steps={['Given', 'Formula', 'Substitute', 'Result', 'Meaning']} />}
      >
        <Lead>
          <span className="cnx-formula">{formula}</span>
        </Lead>
        {symbols && <Points items={symbols} />}
        {example && (
          <aside className="cnx-worked">
            <span className="takeaway-label">Worked example</span>
            <p className="takeaway-text">{example}</p>
          </aside>
        )}
        {takeaway && <Takeaway>{takeaway}</Takeaway>}
      </TwoColumn>
    ),
  }
}

export function examClose({
  id,
  unitNumber,
  title,
  mapSteps,
  notes = [],
  pyq = [],
  important = [],
  revision = [],
}) {
  return [
    visualSlide({
      id: id || `cn-u${unitNumber}-concept-map`,
      kicker: 'Unit concept map',
      title: title || `Unit ${unitNumber} Concept Map`,
      lead: 'Connect every topic back to the message journey before memorising details.',
      visual: <ProcessPath steps={mapSteps} />,
      takeaway: 'One clear diagram plus one example is usually exam-ready.',
    }),
    slide({
      id: `cn-u${unitNumber}-notes`,
      kicker: 'Notes',
      title: 'Lecture Notes Focus',
      subtitle: 'Use these notes as a revision spine after the visual lecture.',
      visual: <ProcessPath steps={revision.length ? revision : mapSteps} direction="vertical" />,
      points: notes.length
        ? notes
        : [
            'Redraw every major diagram from memory.',
            'Write one definition in Forouzan terms.',
            'Attach one numerical or protocol example to each key idea.',
          ],
      takeaway: 'Notes come after understanding — not instead of it.',
    }),
    slide({
      id: `cn-u${unitNumber}-pyq`,
      kicker: 'Previous Year Questions',
      title: 'Typical Exam Angles',
      subtitle: 'Practice explaining mechanisms, not only listing names.',
      visual: <ProcessPath steps={['Define', 'Draw', 'Compare', 'Calculate', 'Apply']} />,
      points: pyq.length
        ? pyq
        : [
            'Explain the concept with a labelled diagram.',
            'Compare two related schemes and state when each is used.',
            'Solve one numerical tied to the unit formulas.',
          ],
      takeaway: 'Examiners reward clear diagrams and precise terminology.',
    }),
    slide({
      id: `cn-u${unitNumber}-important`,
      kicker: 'Important Questions',
      title: 'Must-Score Topics',
      subtitle: 'These ideas appear repeatedly because they unlock later units.',
      visual: <ProcessPath steps={mapSteps.slice(0, Math.min(6, mapSteps.length))} />,
      points: important.length ? important : mapSteps.map((s) => `Be able to explain: ${typeof s === 'string' ? s : s.label}`),
      takeaway: 'Master the journey story first; formulas follow naturally.',
    }),
    visualSlide({
      id: `cn-u${unitNumber}-revision`,
      kicker: 'Quick Revision',
      title: 'Sixty-Second Recap',
      lead: 'Walk the unit as a single path from problem to solution.',
      visual: <ProcessPath steps={revision.length ? revision : mapSteps} />,
      takeaway: 'If you can narrate the path, you can answer the unit.',
    }),
  ]
}
