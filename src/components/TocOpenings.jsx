/* Cinematic module openings for TOC V2.0 — one living scene each. */
import {
  DecisionGate,
  LivingDfaRun,
  LivingNfa,
  LivingPda,
  LivingParseTree,
  LivingTuringMachine,
  RegexWeave,
} from './TocViz'

export function OpeningM1() {
  return (
    <div className="toc-opening-scene toc-open-m1" aria-label="Finite automata deciding accept or reject">
      <div className="toc-open-layer" style={{ '--d': '0s' }}>
        <LivingDfaRun />
      </div>
      <p className="toc-open-caption">Watch a machine make decisions — one symbol at a time.</p>
    </div>
  )
}

export function OpeningM2() {
  return (
    <div className="toc-opening-scene toc-open-m2" aria-label="Regular expressions weaving into languages">
      <div className="toc-open-layer" style={{ '--d': '0s' }}>
        <RegexWeave />
      </div>
      <p className="toc-open-caption">Patterns become languages — then recognizers.</p>
    </div>
  )
}

export function OpeningM3() {
  return (
    <div className="toc-opening-scene toc-open-m3" aria-label="Pushdown automaton stack growing and shrinking">
      <div className="toc-open-layer" style={{ '--d': '0s' }}>
        <LivingPda stack={['Z', '(', '(']} cursor={1} stage="push" />
      </div>
      <p className="toc-open-caption">Memory changes everything — the stack becomes part of the decision.</p>
    </div>
  )
}

export function OpeningM4() {
  return (
    <div className="toc-opening-scene toc-open-m4" aria-label="Parse tree growing from grammar productions">
      <div className="toc-open-layer" style={{ '--d': '0s' }}>
        <LivingParseTree />
      </div>
      <p className="toc-open-caption">Structure grows — productions expand into meaning.</p>
    </div>
  )
}

export function OpeningM5() {
  return (
    <div className="toc-opening-scene toc-open-m5" aria-label="Turing machine head moving on infinite tape">
      <div className="toc-open-layer" style={{ '--d': '0s' }}>
        <LivingTuringMachine />
      </div>
      <p className="toc-open-caption">The birth of universal computation — read, write, move, think.</p>
    </div>
  )
}

export function OpeningGate() {
  return (
    <div className="toc-opening-scene" aria-label="Decision gate accepting and rejecting strings">
      <DecisionGate />
    </div>
  )
}

export function OpeningNfa() {
  return (
    <div className="toc-opening-scene" aria-label="NFA branching active states">
      <LivingNfa />
    </div>
  )
}
