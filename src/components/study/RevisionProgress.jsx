export default function RevisionProgress({ revisedCount, total }) {
  const pct = total === 0 ? 0 : Math.round((revisedCount / total) * 100)
  return (
    <div className="revision-progress" aria-live="polite">
      <div className="revision-progress-copy">
        <strong>
          {revisedCount} of {total} questions revised
        </strong>
        <span>Saved on this device only</span>
      </div>
      <div className="revision-progress-bar" aria-hidden="true">
        <div className="revision-progress-fill" style={{ width: `${pct}%` }} />
      </div>
    </div>
  )
}
