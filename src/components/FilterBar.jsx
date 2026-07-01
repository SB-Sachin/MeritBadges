import { Search, Star } from 'lucide-react'
import { CATEGORIES } from '../data/badges'

const STATUSES = [
  { key: 'all', label: 'All' },
  { key: 'earned', label: 'Earned' },
  { key: 'in_progress', label: 'In progress' },
  { key: 'not_started', label: 'Not started' },
]

export default function FilterBar({ search, onSearch, category, onCategory, status, onStatus, eagleOnly, onEagleOnly }) {
  return (
    <div className="rounded-2xl bg-white border border-edge shadow-card p-3 sm:p-4 space-y-3">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-fg" />
          <input
            type="search"
            value={search}
            onChange={(e) => onSearch(e.target.value)}
            placeholder="Search badges..."
            aria-label="Search badges"
            className="w-full rounded-xl border border-edge bg-surface pl-10 pr-3 py-2.5 text-sm text-ink placeholder:text-muted-fg focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <select
          value={category}
          onChange={(e) => onCategory(e.target.value)}
          aria-label="Filter by category"
          className="rounded-xl border border-edge bg-surface px-3 py-2.5 text-sm font-medium text-ink focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="all">All categories</option>
          {CATEGORIES.map((c) => (
            <option key={c.key} value={c.key}>
              {c.label}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        {STATUSES.map((s) => (
          <button
            key={s.key}
            onClick={() => onStatus(s.key)}
            className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-colors cursor-pointer ${
              status === s.key ? 'bg-primary text-white' : 'bg-muted text-muted-fg hover:bg-edge'
            }`}
          >
            {s.label}
          </button>
        ))}
        <button
          onClick={() => onEagleOnly(!eagleOnly)}
          className={`ml-auto inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition-colors cursor-pointer ${
            eagleOnly ? 'bg-gold text-white' : 'bg-gold-soft text-gold hover:brightness-95'
          }`}
        >
          <Star size={13} fill={eagleOnly ? 'currentColor' : 'none'} />
          Eagle-required
        </button>
      </div>
    </div>
  )
}
