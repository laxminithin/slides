import { LIVING_MODES } from './modes'
import { useLivingEngine } from './PresentationEngine'

/**
 * Classroom teaching overlay — pause, replay, final state, tempo, decorative mute.
 */
export function TeachingControls({ visible = true }) {
  const living = useLivingEngine()
  if (!visible || !living.enabled) return null

  return (
    <div className="living-controls" role="toolbar" aria-label="Living presentation controls">
      <div className="living-mode-switch" aria-label="Learning behavior">
        <button
          type="button"
          className={living.livingMode === LIVING_MODES.STUDENT ? 'active' : ''}
          onClick={() => living.setLivingMode(LIVING_MODES.STUDENT)}
          title="Auto-run animations"
        >
          Student
        </button>
        <button
          type="button"
          className={living.livingMode === LIVING_MODES.LECTURER ? 'active' : ''}
          onClick={() => living.setLivingMode(LIVING_MODES.LECTURER)}
          title="Click to reveal each beat"
        >
          Lecturer
        </button>
        <button
          type="button"
          className={living.livingMode === LIVING_MODES.REVISION ? 'active' : ''}
          onClick={() => living.setLivingMode(LIVING_MODES.REVISION)}
          title="Compressed concept → keywords → memory"
        >
          Revision
        </button>
      </div>

      <div className="living-actions">
        <button type="button" onClick={living.togglePause} title="Pause / resume scene">
          {living.paused ? 'Resume' : 'Pause'}
        </button>
        <button type="button" onClick={living.replay} title="Replay animation">
          Replay
        </button>
        <button type="button" onClick={living.showFinal} title="Skip to final settled frame">
          Final
        </button>
        {living.livingMode === LIVING_MODES.LECTURER && (
          <button type="button" onClick={living.advanceReveal} title="Reveal next concept beat">
            Next beat
          </button>
        )}
        <button type="button" className={living.slowMotion ? 'active' : ''} onClick={living.toggleSlowMotion} title="Slow motion">
          Slow
        </button>
        <button type="button" className={living.hideDecorative ? 'active' : ''} onClick={living.toggleDecorative} title="Hide decorative motion">
          Clean
        </button>
      </div>

      <div className="living-status" aria-hidden="true">
        <span data-budget={living.motionBudget}>{living.motionBudget}</span>
        {living.revisit && <span className="is-revisit">revisit</span>}
        {living.focusActive && <span className="is-focus">focus</span>}
      </div>
    </div>
  )
}
