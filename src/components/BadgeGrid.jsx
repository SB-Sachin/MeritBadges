import { CATEGORIES } from '../data/badges'
import BadgeCard from './BadgeCard'
import { CATEGORY_ICON } from './BadgeCard'
import { SearchX } from 'lucide-react'

export default function BadgeGrid({ badges, progress, onSelect }) {
  if (badges.length === 0) {
    return (
      <div className="rounded-2xl bg-white border border-edge shadow-card p-10 text-center">
        <SearchX size={32} className="mx-auto text-muted-fg" />
        <p className="mt-2 text-sm font-medium text-ink">No badges match your filters</p>
        <p className="text-xs text-muted-fg">Try clearing the search or status filters.</p>
      </div>
    )
  }

  const byCategory = CATEGORIES.map((cat) => ({
    ...cat,
    items: badges.filter((b) => b.category === cat.key),
  })).filter((c) => c.items.length > 0)

  return (
    <div className="space-y-8">
      {byCategory.map((cat) => {
        const Icon = CATEGORY_ICON[cat.key]
        const earnedCount = cat.items.filter((b) => progress[b.id]?.status === 'earned').length
        return (
          <section key={cat.key}>
            <div className="flex items-center gap-2 mb-3">
              {Icon && <Icon size={18} className="text-primary" />}
              <h2 className="text-sm font-bold uppercase tracking-wide text-ink">{cat.label}</h2>
              <span className="text-xs font-medium text-muted-fg">
                {earnedCount}/{cat.items.length}
              </span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {cat.items.map((b) => (
                <BadgeCard key={b.id} badge={b} record={progress[b.id]} onSelect={onSelect} onClick={() => onSelect(b)} />
              ))}
            </div>
          </section>
        )
      })}
    </div>
  )
}
