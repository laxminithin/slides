import { useCallback, useEffect, useRef, useState } from 'react'
import IbChapterMotif from './IbChapterMotif'

/**
 * Cinematic chapter gate for International Business.
 * Emotion → motif → executive quote → Begin Journey → fade into lesson.
 */
export default function IbChapterIntro({ module, subject, onComplete }) {
  const chapter = module.chapter || {}
  const [phase, setPhase] = useState('enter') // enter | quote | ready | exit
  const completing = useRef(false)

  const begin = useCallback(() => {
    if (completing.current) return
    completing.current = true
    setPhase('exit')
    window.setTimeout(() => onComplete?.(), 620)
  }, [onComplete])

  useEffect(() => {
    const timers = [
      window.setTimeout(() => setPhase('quote'), 900),
      window.setTimeout(() => setPhase('ready'), 2100),
      window.setTimeout(() => begin(), 4200),
    ]
    return () => timers.forEach((id) => window.clearTimeout(id))
  }, [begin, module.id])

  useEffect(() => {
    const onKey = (event) => {
      if (event.key === 'Enter' || event.key === ' ' || event.key === 'ArrowRight' || event.key === 'Escape') {
        event.preventDefault()
        event.stopPropagation()
        begin()
      }
    }
    window.addEventListener('keydown', onKey, true)
    return () => window.removeEventListener('keydown', onKey, true)
  }, [begin])

  const quote = chapter.quote || chapter.lead || module.description
  const beginLabel = chapter.beginLabel || 'Begin Journey'

  return (
    <div
      className={`ib-chapter-intro motif-${chapter.motif || 'trade-routes'} chapter-${module.id} phase-${phase}`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="ib-intro-emotion"
      aria-describedby="ib-intro-quote"
    >
      <div className="ib-intro-atmosphere" aria-hidden="true" />

      <div className="ib-intro-stage">
        <p className="ib-intro-kicker">
          {subject.title} · {module.label} · Chapter {module.number}
        </p>

        <p id="ib-intro-emotion" className="ib-intro-emotion">
          {chapter.emotion || module.label}
        </p>

        <div className="ib-intro-motif-wrap">
          <IbChapterMotif motif={chapter.motif || 'trade-routes'} className="ib-intro-motif" />
        </div>

        <blockquote id="ib-intro-quote" className="ib-intro-quote">
          <p>{quote}</p>
        </blockquote>

        <p className="ib-intro-headline">{chapter.headline || module.title}</p>

        <button type="button" className="ib-intro-begin" onClick={begin}>
          {beginLabel}
          <span aria-hidden="true">→</span>
        </button>

        <p className="ib-intro-hint">Press Enter or click to begin</p>
      </div>
    </div>
  )
}
