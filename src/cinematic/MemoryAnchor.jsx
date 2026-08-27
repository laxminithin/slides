import { useLivingEngine } from './PresentationEngine'

const ANCHOR_LABELS = {
  globalization: 'Globalization',
  tradeRoute: 'Trade Route',
  porter: "Porter's Diamond",
  wto: 'WTO',
  imf: 'IMF',
  unctad: 'UNCTAD',
  mnc: 'Multinational',
  supply: 'Supply Chain',
  finance: 'Global Finance',
  marketing: 'Global Marketing',
}

/**
 * Visible memory anchor — same identity always looks the same.
 * Recognition becomes learning.
 */
export function MemoryAnchor({ identity, symbol, compact = false }) {
  if (!identity) return null
  const label = ANCHOR_LABELS[identity] || identity
  return (
    <div
      className={`living-memory-anchor id-${identity}${compact ? ' is-compact' : ''}`}
      data-identity={identity}
      data-symbol={symbol || identity}
      title={label}
    >
      <span className="living-anchor-glyph" aria-hidden="true" />
      {!compact && <strong>{label}</strong>}
    </div>
  )
}

/**
 * Chapter memory map — reuses motifs the student already knows.
 */
export function ChapterMemoryMap({ title = 'Visual memory from this chapter' }) {
  const { chapterMotifs, enabled } = useLivingEngine()
  if (!enabled || !chapterMotifs?.length) return null
  return (
    <div className="living-memory-map" data-scene-layer="memory">
      <p>{title}</p>
      <ul>
        {chapterMotifs.map((motif) => (
          <li key={motif.identity} className={`id-${motif.identity}`}>
            <span className="living-anchor-glyph" aria-hidden="true" />
            <strong>{ANCHOR_LABELS[motif.identity] || motif.label || motif.identity}</strong>
            <em>×{motif.count || 1}</em>
          </li>
        ))}
      </ul>
    </div>
  )
}
