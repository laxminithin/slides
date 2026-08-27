export default function PriorityBadge({ priority, label }) {
  return (
    <span className={`priority-badge priority-${priority}`} title="Preparation guidance — not an official VTU probability">
      {label}
    </span>
  )
}
