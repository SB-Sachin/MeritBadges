import {
  CheckCircle2, Clock, Star, Camera,
  Landmark, Tent, Leaf, FlaskConical, Wrench, Dumbbell, Palette, Briefcase, HeartPulse,
} from 'lucide-react'

export const CATEGORY_ICON = {
  citizenship: Landmark,
  outdoor: Tent,
  nature: Leaf,
  stem: FlaskConical,
  trades: Wrench,
  sports: Dumbbell,
  arts: Palette,
  business: Briefcase,
  safety: HeartPulse,
}

function formatDate(d) {
  if (!d) return null
  const dt = new Date(d + 'T00:00:00')
  if (isNaN(dt)) return d
  return dt.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })
}

export default function BadgeCard({ badge, record, onClick }) {
  const Icon = CATEGORY_ICON[badge.category] || Star
  const status = record?.status
  const earned = status === 'earned'
  const inProgress = status === 'in_progress'
  const isEagle = badge.eagleRequired || badge.eagleGroup

  return (
    <button
      onClick={onClick}
      className="group relative text-left rounded-2xl bg-white border border-edge shadow-card p-3 transition-all duration-200 hover:shadow-card-hover hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer"
    >
      {isEagle && (
        <span className="absolute right-2 top-2 inline-flex items-center gap-0.5 rounded-full bg-gold-soft px-1.5 py-0.5 text-[10px] font-bold text-gold">
          <Star size={10} fill="currentColor" />
          Eagle
        </span>
      )}

      <div className="flex flex-col items-center text-center">
        <div className="relative">
          <div
            className={`grid place-items-center rounded-full h-14 w-14 ${
              earned
                ? 'bg-gradient-to-br from-gold-light to-gold text-white shadow-md'
                : inProgress
                  ? 'bg-primary/10 text-primary ring-2 ring-primary/30'
                  : 'bg-surface text-muted-fg border border-edge'
            }`}
          >
            <Icon size={24} strokeWidth={2} />
          </div>
          {earned && (
            <CheckCircle2 size={20} className="absolute -bottom-1 -right-1 text-white fill-primary rounded-full" />
          )}
          {record?.photo && (
            <Camera size={14} className="absolute -top-1 -left-1 text-primary bg-white rounded-full p-0.5 box-content border border-edge" />
          )}
        </div>

        <h3 className="mt-2 text-[13px] font-semibold text-ink leading-snug line-clamp-2 min-h-[2.4em]">
          {badge.name}
        </h3>

        <div className="mt-1 text-[11px] font-medium">
          {earned ? (
            <span className="text-gold">Earned{record.dateEarned ? ` · ${formatDate(record.dateEarned)}` : ''}</span>
          ) : inProgress ? (
            <span className="inline-flex items-center gap-1 text-primary">
              <Clock size={11} /> In progress
            </span>
          ) : (
            <span className="text-muted-fg">Not started</span>
          )}
        </div>
      </div>
    </button>
  )
}
