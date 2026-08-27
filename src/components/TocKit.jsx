/* Shared slide chrome for TOC V2.0 Masterpiece modules. */
import {
  DecisionGate,
  LivingDfaRun,
  LivingNfa,
  LivingPda,
  LivingParseTree,
  LivingTuringMachine,
  RegexWeave,
} from './TocViz'

export const tocStory = [
  'Input',
  'Read',
  'Transition',
  'Memory',
  'Structure',
  'Decide',
  'Accept',
]

export function slide({ id, kicker, title, subtitle, content, notes, layout, tone, hideTitle, composition }) {
  return { id, kicker, title, subtitle, content, notes, layout, tone, hideTitle, composition }
}

export function Deck({
  active = 0,
  story = tocStory,
  children,
  visual,
  takeaway,
  reverse = false,
  dense = false,
  composition = '',
}) {
  return (
    <div className={`toc-board ${reverse ? 'reverse' : ''} ${dense ? 'dense' : ''} ${composition}`.trim()}>
      <aside className="toc-story" aria-label="Theory of Computation story">
        {story.map((item, index) => (
          <span key={`${index}-${item}`} className={`${index <= active ? 'lit' : ''} ${index === active ? 'now' : ''}`.trim()}>
            {item}
          </span>
        ))}
      </aside>
      <section className="toc-copy">{children}</section>
      <section className="toc-visual">{visual}</section>
      {takeaway && (
        <aside className="toc-takeaway">
          <strong>Takeaway</strong>
          <span>{takeaway}</span>
        </aside>
      )}
    </div>
  )
}

export function Points({ items }) {
  return (
    <ul className="toc-points">
      {items.map((item, index) => (
        <li key={`${index}-${item}`}>{item}</li>
      ))}
    </ul>
  )
}

export function Hook({ children }) {
  return <p className="toc-hook">{children}</p>
}

export function Definition({ term, children }) {
  return (
    <div className="toc-definition">
      <span>Definition</span>
      <strong>{term}</strong>
      <p>{children}</p>
    </div>
  )
}

export function Example({ children, label = 'Classroom example' }) {
  return (
    <div className="toc-example">
      <span>{label}</span>
      <p>{children}</p>
    </div>
  )
}

export function ChipFlow({ items }) {
  return (
    <div className="toc-chip-flow">
      {items.map((item, index) => (
        <span key={`${index}-${item}`} style={{ '--i': index }}>{item}</span>
      ))}
    </div>
  )
}

export function Compare({ leftTitle, rightTitle, left, right, foot }) {
  return (
    <div className="toc-compare">
      <article>
        <h3>{leftTitle}</h3>
        <ul>{left.map((item, index) => <li key={`L${index}-${item}`}>{item}</li>)}</ul>
      </article>
      <article>
        <h3>{rightTitle}</h3>
        <ul>{right.map((item, index) => <li key={`R${index}-${item}`}>{item}</li>)}</ul>
      </article>
      {foot && <p className="toc-compare-foot">{foot}</p>}
    </div>
  )
}

export function Divider({ number, title, subtitle, visual }) {
  return (
    <div className="toc-divider">
      <div>
        <span className="toc-divider-number">{number}</span>
        <h2>{title}</h2>
        <p>{subtitle}</p>
      </div>
      <div className="toc-divider-visual">{visual}</div>
    </div>
  )
}

export function OpeningShell({ scene, moduleLabel, title, subtitle }) {
  return (
    <div className="toc-opening">
      {scene}
      <div className="toc-opening-title">
        <p>{moduleLabel}</p>
        <h1>{title}</h1>
        <strong>{subtitle}</strong>
      </div>
    </div>
  )
}

export {
  DecisionGate,
  LivingDfaRun,
  LivingNfa,
  LivingPda,
  LivingParseTree,
  LivingTuringMachine,
  RegexWeave,
}
