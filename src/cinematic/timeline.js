/**
 * Presentation Engine V6 — Scene Timeline
 *
 * Every slide exposes a consistent beat schedule:
 *   0.0  Establish
 *   0.8  Focus
 *   2.0  Narrative
 *   4.5  Climax
 *   6.5  Settle
 *
 * Subjects should call sceneBeatSchedule() / sceneBeatVars() rather than
 * hard-coding delays.
 */

import { REVEAL_BEATS } from './modes'

/** Default beat offsets in seconds (matched to CSS tokens). */
export const DEFAULT_BEAT_SCHEDULE = {
  establish: 0,
  focus: 0.72,
  narrative: 1.2,
  climax: null, // computed from line count
  settle: null, // climax + settle gap
}

const STAGGER = {
  fast: 0.09,
  slow: 0.16,
  minimal: 0.1,
  dramatic: 0.14,
  medium: 0.12,
  default: 0.12,
}

/**
 * Compute a full beat schedule for a slide.
 * @returns {{ establish:number, focus:number, narrative:number, climax:number, settle:number, stagger:number, beats: Array<{beat:string, at:number}> }}
 */
export function sceneBeatSchedule(lineCount = 4, pace = 'medium') {
  const stagger = STAGGER[pace] ?? STAGGER.default
  const establish = DEFAULT_BEAT_SCHEDULE.establish
  const focus = DEFAULT_BEAT_SCHEDULE.focus
  const narrative = DEFAULT_BEAT_SCHEDULE.narrative
  const climax = narrative + Math.max(1, lineCount - 2) * stagger
  const settle = climax + 0.55

  const schedule = { establish, focus, narrative, climax, settle, stagger }
  return {
    ...schedule,
    beats: REVEAL_BEATS.map((beat) => ({ beat, at: schedule[beat] })),
  }
}

/** CSS custom-property bag used by scene markup. */
export function sceneBeatVars(lineCount = 4, pace = 'medium') {
  const schedule = sceneBeatSchedule(lineCount, pace)
  return {
    '--beat-establish': `${schedule.establish}s`,
    '--beat-focus': `${schedule.focus}s`,
    '--beat-narrative': `${schedule.narrative}s`,
    '--beat-climax': `${schedule.climax}s`,
    '--beat-settle': `${schedule.settle}s`,
    '--scene-stagger': `${schedule.stagger}s`,
  }
}

/** Human-readable timeline rows for the debug / inspector UI. */
export function formatTimeline(schedule) {
  const source = schedule?.beats || sceneBeatSchedule().beats
  return source.map(({ beat, at }) => ({
    label: beat.charAt(0).toUpperCase() + beat.slice(1),
    beat,
    at,
    display: `${at.toFixed(1).padStart(4, ' ')}  ${beat.charAt(0).toUpperCase() + beat.slice(1)}`,
  }))
}

/** Suggest duration outlier bounds (seconds) for QA. */
export const SCENE_DURATION_BOUNDS = {
  min: 1.75,
  quietMin: 1.4,
  typicalMax: 12,
  heroMax: 18,
  finaleMax: 22,
}

export function sceneDurationSeconds(schedule) {
  return schedule?.settle ?? sceneBeatSchedule().settle
}
