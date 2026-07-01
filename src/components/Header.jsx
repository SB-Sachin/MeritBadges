import { Award, Cloud, HardDrive } from 'lucide-react'
import ProgressRing from './ProgressRing'

export default function Header({ stats, mode }) {
  const ModeIcon = mode === 'supabase' ? Cloud : HardDrive
  return (
    <header className="bg-gradient-to-br from-primary to-primary-dark text-white">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-6 sm:py-8">
        <div className="flex items-center justify-between gap-4">
          <div className="min-w-0">
            <div className="flex items-center gap-2 text-gold-soft">
              <Award size={22} />
              <span className="text-xs font-bold uppercase tracking-widest">Scouting America</span>
            </div>
            <h1 className="mt-1 text-2xl sm:text-3xl font-extrabold">Merit Badge Tracker</h1>
            <p className="mt-1 text-sm text-sky-100">
              Track every badge you earn on the trail to Eagle.
            </p>
            <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-white/15 px-2.5 py-1 text-[11px] font-medium">
              <ModeIcon size={13} />
              {mode === 'supabase' ? 'Synced to cloud' : 'Saved on this device'}
            </div>
          </div>
          <ProgressRing value={stats.earned} max={stats.total} size={92} stroke={9} color="#FEF3C7" track="rgba(255,255,255,0.25)">
            <div className="text-white">
              <div className="text-xl font-extrabold tabular-nums">{stats.earned}</div>
              <div className="text-[10px] text-sky-100">of {stats.total}</div>
            </div>
          </ProgressRing>
        </div>
      </div>
    </header>
  )
}
