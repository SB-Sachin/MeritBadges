// Pure functions that compute Eagle-rank progress from the badge list plus the
// user's progress map. No persistence here.

import {
  BADGES,
  EAGLE_GROUPS,
  EAGLE_TOTAL_NEEDED,
  EAGLE_REQUIRED_COUNT,
} from '../data/badges'

const ELECTIVES_NEEDED = EAGLE_TOTAL_NEEDED - EAGLE_REQUIRED_COUNT // 8

const FIXED_REQUIRED = BADGES.filter((b) => b.eagleRequired)

function isEarned(progress, badgeId) {
  const p = progress[badgeId]
  return !!p && p.status === 'earned'
}

// Build the 13 required "slots": 10 fixed single-badge slots + 3 choose-one groups.
export function eagleSlots(progress) {
  const fixedSlots = FIXED_REQUIRED.map((b) => ({
    key: b.id,
    type: 'fixed',
    label: b.name,
    options: [b],
    done: isEarned(progress, b.id),
    earnedOptionId: isEarned(progress, b.id) ? b.id : null,
  }))

  const groupSlots = EAGLE_GROUPS.map((g) => {
    const options = BADGES.filter((b) => b.eagleGroup === g.key)
    const earned = options.find((b) => isEarned(progress, b.id))
    return {
      key: g.key,
      type: 'group',
      label: g.label,
      options,
      done: !!earned,
      earnedOptionId: earned ? earned.id : null,
    }
  })

  return [...fixedSlots, ...groupSlots]
}

export function eagleProgress(progress) {
  const slots = eagleSlots(progress)
  const requiredDone = slots.filter((s) => s.done).length

  const totalEarned = BADGES.filter((b) => isEarned(progress, b.id)).length
  // Any earned badge beyond the filled required slots counts as an elective.
  const electivesEarned = Math.max(0, totalEarned - requiredDone)

  return {
    slots,
    requiredDone,
    requiredTotal: EAGLE_REQUIRED_COUNT,
    electivesEarned,
    electivesNeeded: ELECTIVES_NEEDED,
    totalEarned,
    totalNeeded: EAGLE_TOTAL_NEEDED,
    isComplete: requiredDone === EAGLE_REQUIRED_COUNT && totalEarned >= EAGLE_TOTAL_NEEDED,
  }
}

// Overall stats across every badge (not just Eagle).
export function overallStats(progress) {
  let earned = 0
  let inProgress = 0
  for (const b of BADGES) {
    const p = progress[b.id]
    if (!p) continue
    if (p.status === 'earned') earned += 1
    else if (p.status === 'in_progress') inProgress += 1
  }
  return { earned, inProgress, total: BADGES.length }
}
