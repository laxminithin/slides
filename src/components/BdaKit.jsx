/**
 * BdaKit — reusable premium primitives for the Big Data Analytics redesign.
 * Additive only: scale cues + cinematic HeroScene framing for Director's Cut
 * peaks. No syllabus, notes, routing or navigation change.
 */
import { useEffect, useRef, useState } from 'react'

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

/** Animated count-up number. Re-runs on mount (slides remount on navigation). */
export function CountUp({ value, decimals = 0, duration = 1500, prefix = '', suffix = '' }) {
  const [display, setDisplay] = useState(prefersReducedMotion() ? value : 0)
  const rafRef = useRef(0)

  useEffect(() => {
    if (prefersReducedMotion()) {
      setDisplay(value)
      return undefined
    }
    let start
    const tick = (ts) => {
      if (start === undefined) start = ts
      const p = Math.min(1, (ts - start) / duration)
      const eased = 1 - Math.pow(1 - p, 3) // easeOutCubic
      setDisplay(value * eased)
      if (p < 1) rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [value, duration])

  const formatted = display.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })
  return (
    <span>
      {prefix}
      {formatted}
      {suffix}
    </span>
  )
}

/** Real-world scale cues per module — animated counters that convey Big Data scale. */
const SCALE_VARIANTS = {
  intro: [
    { value: 2.5, decimals: 1, suffix: ' EB', label: 'data created every day' },
    { value: 181, suffix: ' ZB', label: 'global data by 2025' },
    { value: 90, suffix: '%', label: 'of it is unstructured' },
  ],
  hadoop: [
    { value: 128, suffix: ' MB', label: 'default HDFS block' },
    { value: 3, suffix: '×', label: 'block replication' },
    { value: 4000, suffix: '+', label: 'commodity nodes / cluster' },
  ],
  mongodb: [
    { value: 16, suffix: ' MB', label: 'max BSON document' },
    { value: 0, suffix: '', label: 'fixed schema required' },
    { value: 3, suffix: '-node', label: 'replica set for HA' },
  ],
  warehouse: [
    { value: 100, suffix: '+ TB', label: 'campus warehouse scale' },
    { value: 90, suffix: '%', label: 'less code than raw MapReduce' },
    { value: 1, suffix: '', label: 'shared Hive metastore' },
  ],
  spark: [
    { value: 8.5, decimals: 1, suffix: ' B', label: 'Google searches / day' },
    { value: 100, suffix: '×', label: 'faster than MapReduce' },
    { value: 0.3, decimals: 1, suffix: ' s', label: 'to rank the web' },
  ],
}

export function BdaScaleStrip({ variant = 'intro', className = '' }) {
  const stats = SCALE_VARIANTS[variant] || SCALE_VARIANTS.intro
  return (
    <div className={`bda-scalestrip ${className}`.trim()} aria-label="Scale of the problem">
      {stats.map((s, i) => (
        <div className="bda-stat" key={s.label} style={{ '--d': `${0.15 + i * 0.12}s` }}>
          <strong>
            <CountUp value={s.value} decimals={s.decimals || 0} suffix={s.suffix} />
          </strong>
          <span>{s.label}</span>
        </div>
      ))}
    </div>
  )
}

/**
 * HeroScene — cinematic frame for a peak visual.
 * Foreground metaphor caption + atmospheric depth around an existing diagram.
 * The illustration remains the teaching surface; the frame only directs the eye.
 */
export function HeroScene({
  children,
  metaphor,
  beat,
  className = '',
  annotations = [],
}) {
  return (
    <div className={`bo-scene hero-scene ${className}`.trim()}>
      <div className="bo-scene-atmosphere" aria-hidden="true" />
      {beat && <p className="bo-scene-beat">{beat}</p>}
      <div className="bo-scene-stage">{children}</div>
      {metaphor && (
        <aside className="bo-scene-caption">
          <strong>{metaphor}</strong>
        </aside>
      )}
      {annotations.length > 0 && (
        <div className="bo-annotation-rail" aria-hidden="true">
          {annotations.map((item) => <em key={item}>{item}</em>)}
        </div>
      )}
    </div>
  )
}
