import { Star, CheckCircle2, Circle, Trophy, ListChecks, Layers } from 'lucide-react'
import StatCard from './StatCard'
import ProgressRing from './ProgressRing'

export default function EagleProgress({ eagle, onSelect }) {
  const { slots, requiredDone, requiredTotal, electivesEarned, electivesNeeded, totalEarned, totalNeeded, isComplete } = eagle

  return (
    <div className="space-y-6">
      {isComplete && (
        <div className="rounded-2xl bg-gradient-to-br from-gold-light to-gold text-white p-5 flex items-center gap-4 shadow-card animate-pop-in">
          <Trophy size={36} />
          <div>
            <p className="text-lg font-extrabold">Eagle requirements met! 🦅</p>
            <p className="text-sm text-amber-50">All 13 required badges plus 21 total earned. Congratulations!</p>
          </div>
        </div>
      )}

      <div className="rounded-2xl bg-white border border-edge shadow-card p-5">
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <ProgressRing value={totalEarned} max={totalNeeded} size={132} stroke={12}>
            <div>
              <div className="text-3xl font-extrabold tabular-nums text-ink">{totalEarned}</div>
              <div className="text-xs text-muted-fg">of {totalNeeded}</div>
            </div>
          </ProgressRing>
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
            <StatCard icon={ListChecks} label="Required badges" value={`${requiredDone}/${requiredTotal}`} barValue={requiredDone} barMax={requiredTotal} accent="text-gold" />
            <StatCard icon={Layers} label="Elective badges" value={`${Math.min(electivesEarned, electivesNeeded)}/${electivesNeeded}`} barValue={electivesEarned} barMax={electivesNeeded} accent="text-primary" />
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-sm font-bold uppercase tracking-wide text-ink mb-3">13 Required Merit Badges</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {slots.map((slot) => (
            <div
              key={slot.key}
              className={`rounded-2xl border p-3 ${slot.done ? 'border-gold/40 bg-gold-soft/40' : 'border-edge bg-white'}`}
            >
              <div className="flex items-center gap-2">
                {slot.done ? (
                  <CheckCircle2 size={20} className="text-gold shrink-0" />
                ) : (
                  <Circle size={20} className="text-muted-fg shrink-0" />
                )}
                <span className="text-sm font-semibold text-ink">
                  {slot.type === 'group' ? slot.label : slot.options[0].name}
                </span>
                {slot.type === 'group' && (
                  <span className="ml-auto text-[10px] font-bold uppercase text-muted-fg">Choose one</span>
                )}
              </div>

              <div className="mt-2 flex flex-wrap gap-1.5 pl-7">
                {slot.options.map((b) => {
                  const chosen = slot.earnedOptionId === b.id
                  return (
                    <button
                      key={b.id}
                      onClick={() => onSelect(b)}
                      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium transition-colors cursor-pointer ${
                        chosen
                          ? 'bg-gold text-white'
                          : 'bg-muted text-muted-fg hover:bg-edge hover:text-ink'
                      }`}
                    >
                      {chosen && <Star size={11} fill="currentColor" />}
                      {b.name}
                    </button>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
