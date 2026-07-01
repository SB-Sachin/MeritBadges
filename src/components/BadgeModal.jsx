import { useEffect, useState } from 'react'
import { X, Upload, Trash2, ExternalLink, Star, CheckCircle2, Clock, Loader2, AlertTriangle } from 'lucide-react'
import { CATEGORY_ICON } from './BadgeCard'

const TODAY = new Date().toISOString().slice(0, 10)

export default function BadgeModal({ badge, record, onClose, onSave, onRemove, uploadPhoto }) {
  const Icon = CATEGORY_ICON[badge.category] || Star
  const [status, setStatus] = useState(record?.status || 'in_progress')
  const [dateEarned, setDateEarned] = useState(record?.dateEarned || TODAY)
  const [notes, setNotes] = useState(record?.notes || '')
  const [photo, setPhoto] = useState(record?.photo || null)
  const [uploading, setUploading] = useState(false)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  async function handleFile(e) {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    try {
      const { url } = await uploadPhoto(badge.id, file)
      setPhoto(url)
    } catch (err) {
      alert('Photo upload failed: ' + (err?.message || err))
    } finally {
      setUploading(false)
    }
  }

  async function handleSave() {
    setSaving(true)
    try {
      await onSave(badge.id, {
        status,
        dateEarned: status === 'earned' ? dateEarned : null,
        notes,
        photo,
      })
      onClose()
    } finally {
      setSaving(false)
    }
  }

  const isEagle = badge.eagleRequired || badge.eagleGroup

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 p-0 sm:p-4 animate-fade-in"
      onClick={onClose}
    >
      <div
        className="w-full sm:max-w-lg max-h-[92vh] overflow-y-auto rounded-t-3xl sm:rounded-3xl bg-white shadow-xl animate-pop-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-br from-primary to-primary-dark text-white p-5 rounded-t-3xl sm:rounded-t-3xl">
          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute right-3 top-3 rounded-full bg-white/15 p-1.5 hover:bg-white/25 cursor-pointer"
          >
            <X size={18} />
          </button>
          <div className="flex items-center gap-3">
            <div className="grid place-items-center rounded-2xl bg-white/15 h-14 w-14">
              <Icon size={28} />
            </div>
            <div>
              {isEagle && (
                <span className="inline-flex items-center gap-1 rounded-full bg-gold-soft px-2 py-0.5 text-[11px] font-bold text-gold">
                  <Star size={11} fill="currentColor" /> Eagle-required
                </span>
              )}
              <h2 className="text-xl font-extrabold leading-tight">{badge.name}</h2>
            </div>
          </div>
        </div>

        <div className="p-5 space-y-5">
          {badge.discontinued && badge.note && (
            <div className="flex items-start gap-2 rounded-xl bg-amber-50 border border-amber-200 p-2.5 text-xs text-amber-800">
              <AlertTriangle size={15} className="mt-0.5 shrink-0" />
              <span>{badge.note}</span>
            </div>
          )}

          {/* Status */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wide text-muted-fg mb-2">Status</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setStatus('in_progress')}
                className={`inline-flex items-center justify-center gap-1.5 rounded-xl px-3 py-2.5 text-sm font-semibold border transition-colors cursor-pointer ${
                  status === 'in_progress' ? 'bg-primary text-white border-primary' : 'bg-surface text-ink border-edge hover:border-primary'
                }`}
              >
                <Clock size={16} /> In progress
              </button>
              <button
                onClick={() => setStatus('earned')}
                className={`inline-flex items-center justify-center gap-1.5 rounded-xl px-3 py-2.5 text-sm font-semibold border transition-colors cursor-pointer ${
                  status === 'earned' ? 'bg-gold text-white border-gold' : 'bg-surface text-ink border-edge hover:border-gold'
                }`}
              >
                <CheckCircle2 size={16} /> Earned
              </button>
            </div>
          </div>

          {/* Date earned */}
          {status === 'earned' && (
            <div>
              <label htmlFor="date-earned" className="block text-xs font-bold uppercase tracking-wide text-muted-fg mb-2">
                Date earned
              </label>
              <input
                id="date-earned"
                type="date"
                value={dateEarned}
                max={TODAY}
                onChange={(e) => setDateEarned(e.target.value)}
                className="w-full rounded-xl border border-edge bg-surface px-3 py-2.5 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          )}

          {/* Photo */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wide text-muted-fg mb-2">
              Photo / certificate
            </label>
            {photo ? (
              <div className="relative">
                <img src={photo} alt={`${badge.name} proof`} className="w-full rounded-xl border border-edge object-cover max-h-64" />
                <button
                  onClick={() => setPhoto(null)}
                  className="absolute right-2 top-2 inline-flex items-center gap-1 rounded-lg bg-black/60 px-2 py-1 text-xs font-medium text-white hover:bg-black/80 cursor-pointer"
                >
                  <Trash2 size={13} /> Remove
                </button>
              </div>
            ) : (
              <label className="flex flex-col items-center justify-center gap-1.5 rounded-xl border-2 border-dashed border-edge bg-surface py-6 text-sm text-muted-fg cursor-pointer hover:border-primary hover:text-primary transition-colors">
                {uploading ? <Loader2 size={22} className="animate-spin" /> : <Upload size={22} />}
                <span className="font-medium">{uploading ? 'Uploading...' : 'Upload a photo'}</span>
                <input type="file" accept="image/*" className="hidden" onChange={handleFile} disabled={uploading} />
              </label>
            )}
          </div>

          {/* Notes */}
          <div>
            <label htmlFor="notes" className="block text-xs font-bold uppercase tracking-wide text-muted-fg mb-2">
              Notes
            </label>
            <textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              placeholder="Counselor, blue card number, memories..."
              className="w-full rounded-xl border border-edge bg-surface px-3 py-2.5 text-sm text-ink placeholder:text-muted-fg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
            />
          </div>

          <a
            href={badge.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline"
          >
            <ExternalLink size={13} /> Official requirements on scouting.org
          </a>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white border-t border-edge p-4 flex items-center gap-2">
          {record && (
            <button
              onClick={async () => {
                await onRemove(badge.id)
                onClose()
              }}
              className="inline-flex items-center gap-1.5 rounded-xl px-3 py-2.5 text-sm font-semibold text-danger hover:bg-red-50 cursor-pointer"
            >
              <Trash2 size={16} /> Remove
            </button>
          )}
          <button
            onClick={handleSave}
            disabled={saving}
            className="ml-auto inline-flex items-center gap-1.5 rounded-xl bg-primary px-5 py-2.5 text-sm font-bold text-white hover:bg-primary-dark disabled:opacity-60 cursor-pointer"
          >
            {saving && <Loader2 size={16} className="animate-spin" />}
            Save
          </button>
        </div>
      </div>
    </div>
  )
}
