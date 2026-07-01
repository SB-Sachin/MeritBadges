// Small KPI card with an optional icon and progress bar.
export default function StatCard({ icon: Icon, label, value, sub, barValue, barMax, accent = 'text-primary' }) {
  const pct = barMax > 0 ? Math.min(100, Math.round((barValue / barMax) * 100)) : null
  return (
    <div className="rounded-2xl bg-white border border-edge shadow-card p-4">
      <div className="flex items-center gap-3">
        {Icon && (
          <div className={`shrink-0 rounded-xl bg-surface p-2 ${accent}`}>
            <Icon size={22} strokeWidth={2} />
          </div>
        )}
        <div className="min-w-0">
          <div className="text-2xl font-extrabold tabular-nums text-ink leading-tight">{value}</div>
          <div className="text-xs font-semibold text-muted-fg">{label}</div>
          {sub && <div className="text-[11px] text-muted-fg">{sub}</div>}
        </div>
      </div>
      {pct !== null && (
        <div className="mt-3 h-2 w-full rounded-full bg-muted overflow-hidden">
          <div
            className="h-full rounded-full bg-gold transition-all duration-500"
            style={{ width: `${pct}%` }}
          />
        </div>
      )}
    </div>
  )
}
