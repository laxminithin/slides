/**
 * InsKit — composition primitives for Information & Network Security V2.0
 * Masterpiece Edition. Additive framing only: no syllabus, notes, IDs,
 * routing or navigation changes. Sibling spirit of BdaKit HeroScene.
 */

/** Deterministic layout cycling so consecutive factory slides never share the same composition. */
export const INS_COMPOSE = ['standard', 'reverse', 'hero', 'quiet', 'visual-lead']
export const INS_RATIOS = ['copy-visual', 'visual-copy', 'visual-lead', 'copy-lead', 'balanced']

export function composeAt(index = 0, cycle = INS_COMPOSE) {
  return cycle[((index % cycle.length) + cycle.length) % cycle.length]
}

export function ratioAt(index = 0, cycle = INS_RATIOS) {
  return cycle[((index % cycle.length) + cycle.length) % cycle.length]
}

/**
 * InsHeroScene — cinematic frame around an existing security diagram.
 * The illustration remains the teaching surface; the frame directs the eye
 * with a story beat, metaphor caption and optional stage annotations.
 */
export function InsHeroScene({
  children,
  metaphor,
  beat,
  className = '',
  annotations = [],
  peak = false,
}) {
  return (
    <div className={`ins-scene ${peak ? 'ins-peak' : ''} ${className}`.trim()}>
      <div className="ins-scene-atmosphere" aria-hidden="true" />
      {beat && <p className="ins-scene-beat">{beat}</p>}
      <div className="ins-scene-stage">{children}</div>
      {metaphor && (
        <aside className="ins-scene-caption">
          <strong>{metaphor}</strong>
        </aside>
      )}
      {annotations.length > 0 && (
        <div className="ins-annotation-rail" aria-label="Protocol stages">
          {annotations.map((item) => <em key={item}>{item}</em>)}
        </div>
      )}
    </div>
  )
}

/** Optional story-stage chips under a living diagram (actors / direction / outcome). */
export function InsStageChips({ stages = [] }) {
  if (!stages.length) return null
  return (
    <div className="ins-stage-chips" aria-label="Story stages">
      {stages.map((stage, i) => (
        <span key={`${stage}-${i}`} className={i === 0 ? 'start' : i === stages.length - 1 ? 'end' : ''}>
          {stage}
        </span>
      ))}
    </div>
  )
}

/** Wrap a visual in a hero frame when beat/metaphor/peak is provided; otherwise return as-is. */
export function withInsHero(visual, { beat, metaphor, annotations = [], peak = false, className = '' } = {}) {
  if (!visual) return visual
  if (!beat && !metaphor && !peak && annotations.length === 0) return visual
  return (
    <InsHeroScene beat={beat} metaphor={metaphor} annotations={annotations} peak={peak} className={className}>
      {visual}
    </InsHeroScene>
  )
}
