import { useMemo, useState } from 'react'
import { LayoutGrid, Award, Loader2 } from 'lucide-react'
import { BADGES } from './data/badges'
import { useProgress } from './hooks/useProgress'
import { eagleProgress, overallStats } from './lib/eagle'
import Header from './components/Header'
import FilterBar from './components/FilterBar'
import BadgeGrid from './components/BadgeGrid'
import EagleProgress from './components/EagleProgress'
import BadgeModal from './components/BadgeModal'

function TabButton({ active, onClick, icon: Icon, label }) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold transition-colors cursor-pointer ${
        active ? 'bg-primary text-white shadow-sm' : 'text-muted-fg hover:text-ink'
      }`}
    >
      <Icon size={16} />
      {label}
    </button>
  )
}

export default function App() {
  const { progress, loading, saveBadge, removeBadge, uploadPhoto, mode } = useProgress()
  const [tab, setTab] = useState('all')
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('all')
  const [status, setStatus] = useState('all')
  const [eagleOnly, setEagleOnly] = useState(false)
  const [selected, setSelected] = useState(null)

  const stats = useMemo(() => overallStats(progress), [progress])
  const eagle = useMemo(() => eagleProgress(progress), [progress])

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    return BADGES.filter((b) => {
      if (q && !b.name.toLowerCase().includes(q)) return false
      if (category !== 'all' && b.category !== category) return false
      if (eagleOnly && !(b.eagleRequired || b.eagleGroup)) return false
      const st = progress[b.id]?.status
      if (status === 'earned' && st !== 'earned') return false
      if (status === 'in_progress' && st !== 'in_progress') return false
      if (status === 'not_started' && st) return false
      return true
    })
  }, [search, category, status, eagleOnly, progress])

  return (
    <div className="min-h-dvh bg-surface flex flex-col">
      <Header stats={stats} mode={mode} />

      <main className="flex-1 w-full mx-auto max-w-6xl px-4 sm:px-6 py-6 space-y-6">
        <div className="inline-flex rounded-full bg-white border border-edge p-1 shadow-card">
          <TabButton active={tab === 'all'} onClick={() => setTab('all')} icon={LayoutGrid} label="All Badges" />
          <TabButton active={tab === 'eagle'} onClick={() => setTab('eagle')} icon={Award} label="Eagle Path" />
        </div>

        {loading ? (
          <div className="flex items-center justify-center gap-2 py-24 text-muted-fg">
            <Loader2 size={20} className="animate-spin" />
            <span className="text-sm font-medium">Loading your badges...</span>
          </div>
        ) : tab === 'all' ? (
          <>
            <FilterBar
              search={search}
              onSearch={setSearch}
              category={category}
              onCategory={setCategory}
              status={status}
              onStatus={setStatus}
              eagleOnly={eagleOnly}
              onEagleOnly={setEagleOnly}
            />
            <BadgeGrid badges={filtered} progress={progress} onSelect={setSelected} />
          </>
        ) : (
          <EagleProgress eagle={eagle} onSelect={setSelected} />
        )}
      </main>

      <footer className="mx-auto max-w-6xl px-4 sm:px-6 py-6 text-center text-[11px] text-muted-fg">
        Personal, unofficial tracker — not affiliated with or endorsed by Scouting America (BSA).
        Requirements and the official badge list live at{' '}
        <a href="https://www.scouting.org/skills/merit-badges/all/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
          scouting.org
        </a>
        .
      </footer>

      {selected && (
        <BadgeModal
          badge={selected}
          record={progress[selected.id]}
          onClose={() => setSelected(null)}
          onSave={saveBadge}
          onRemove={removeBadge}
          uploadPhoto={uploadPhoto}
        />
      )}
    </div>
  )
}
