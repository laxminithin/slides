import { useEffect, useRef, useState } from 'react'

/**
 * Persistent film continuity layer — lives outside the remounting slide frame.
 * Softens navigation so scenes resolve → carry → open, instead of hard cutting.
 */
export function FilmContinuity({
  enabled = false,
  moduleNumber = 1,
  emotion = 'curiosity',
  symbol = 'trade-route',
  identity = null,
  callback = null,
  transition = 'soft-carry',
  quiet = false,
  finale = false,
  cutKey = 0,
}) {
  const [phase, setPhase] = useState('idle')
  const timerRef = useRef(0)

  useEffect(() => {
    if (!enabled || cutKey === 0) return undefined
    setPhase('carry')
    window.clearTimeout(timerRef.current)
    const styles = getComputedStyle(document.documentElement)
    const carryMs = parseFloat(styles.getPropertyValue('--film-cut-carry')) || 520
    const settleMs = parseFloat(styles.getPropertyValue('--film-cut-settle')) || 980
    timerRef.current = window.setTimeout(() => setPhase('settle'), carryMs)
    const done = window.setTimeout(() => setPhase('idle'), settleMs)
    return () => {
      window.clearTimeout(timerRef.current)
      window.clearTimeout(done)
    }
  }, [cutKey, enabled])

  if (!enabled) return null

  return (
    <div
      className={`film-continuity phase-${phase}${quiet ? ' is-quiet' : ''}${finale ? ' is-finale' : ''}`}
      data-module={moduleNumber}
      data-emotion={emotion}
      data-symbol={symbol}
      data-identity={identity || undefined}
      data-callback={callback || undefined}
      data-transition={transition}
      data-phase={phase}
      aria-hidden="true"
    >
      <div className="film-ribbon" />
      <div className="film-symbol-wake">
        <span className={`film-glyph g-${symbol}`} />
        {callback && <span className={`film-callback-echo echo-${callback}`} />}
        {identity && <span className={`film-identity id-${identity}`} />}
      </div>
      <div className="film-arc-thread" data-emotion={emotion} />
    </div>
  )
}
