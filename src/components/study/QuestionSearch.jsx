import { Search } from 'lucide-react'

const FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'repeated', label: 'Most Repeated' },
  { id: 'priority', label: 'High Priority' },
  { id: 'marks-5', label: '5 Marks' },
  { id: 'marks-8-10', label: '8/10 Marks' },
]

export default function QuestionSearch({
  query,
  onQueryChange,
  filter,
  onFilterChange,
  availableFilters,
}) {
  const visible = FILTERS.filter((f) => availableFilters.includes(f.id))

  return (
    <div className="question-search">
      <label className="question-search-field">
        <Search size={18} strokeWidth={1.75} aria-hidden="true" />
        <input
          type="search"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder="Search questions…"
          aria-label="Search questions"
        />
      </label>

      <div className="question-filters" role="tablist" aria-label="Question filters">
        {visible.map((f) => (
          <button
            key={f.id}
            type="button"
            role="tab"
            aria-selected={filter === f.id}
            className={`question-filter ${filter === f.id ? 'active' : ''}`.trim()}
            onClick={() => onFilterChange(f.id)}
          >
            {f.label}
          </button>
        ))}
      </div>
    </div>
  )
}
