// Official Scouting America (BSA) merit badges.
// Source: https://www.scouting.org/skills/merit-badges/all/ (verified 2026).
//
// Eagle logic reflects the requirements effective Feb 27, 2026:
//   - 10 fixed required badges (eagle: 'required')
//   - 3 "choose one of" groups (eagle: <groupKey>)  -> 13 required total
//   - 21 badges needed for Eagle overall (13 required + 8 electives)
//
// `category` is our own UX grouping for the tracker grid (BSA does not
// officially categorize badges). `eagle` is null for pure electives.

// Display order + labels for the tracker's category sections.
export const CATEGORIES = [
  { key: 'citizenship', label: 'Citizenship & Character' },
  { key: 'outdoor', label: 'Outdoors & Adventure' },
  { key: 'nature', label: 'Nature & Environment' },
  { key: 'stem', label: 'Science & Technology' },
  { key: 'trades', label: 'Trades & Engineering' },
  { key: 'sports', label: 'Sports & Recreation' },
  { key: 'arts', label: 'Arts, Hobbies & Culture' },
  { key: 'business', label: 'Business & Communication' },
  { key: 'safety', label: 'Health, Safety & Preparedness' },
]

// The three Eagle "choose one" groups.
export const EAGLE_GROUPS = [
  { key: 'g_emergency', label: 'Emergency Prep OR Lifesaving', choose: 1 },
  { key: 'g_environment', label: 'Environmental Science OR Sustainability', choose: 1 },
  { key: 'g_outdoor', label: 'Swimming OR Hiking OR Cycling', choose: 1 },
]

export const EAGLE_TOTAL_NEEDED = 21
export const EAGLE_REQUIRED_COUNT = 13 // 10 fixed + 3 groups

// [name, category, eagle]
//   eagle: 'required' | group key | undefined
const RAW = [
  ['American Business', 'business'],
  ['American Cultures', 'citizenship'],
  ['American Heritage', 'citizenship'],
  ['American Indian Culture', 'citizenship'],
  ['American Labor', 'citizenship'],
  ['Animal Science', 'nature'],
  ['Animation', 'arts'],
  ['Archaeology', 'stem'],
  ['Archery', 'sports'],
  ['Architecture', 'arts'],
  ['Art', 'arts'],
  ['Artificial Intelligence', 'stem'],
  ['Astronomy', 'stem'],
  ['Athletics', 'sports'],
  ['Automotive Maintenance', 'trades'],
  ['Aviation', 'stem'],
  ['Backpacking', 'outdoor'],
  ['Basketry', 'arts'],
  ['Bird Study', 'nature'],
  ['Bugling', 'arts'],
  ['Camping', 'outdoor', 'required'],
  ['Canoeing', 'outdoor'],
  ['Chemistry', 'stem'],
  ['Chess', 'arts'],
  ['Citizenship in Society', 'citizenship'],
  ['Citizenship in the Community', 'citizenship', 'required'],
  ['Citizenship in the Nation', 'citizenship', 'required'],
  ['Citizenship in the World', 'citizenship', 'required'],
  ['Climbing', 'outdoor'],
  ['Coin Collecting', 'arts'],
  ['Collections', 'arts'],
  ['Communication', 'business', 'required'],
  ['Composite Materials', 'stem'],
  ['Cooking', 'safety', 'required'],
  ['Crime Prevention', 'safety'],
  ['Cybersecurity', 'stem'],
  ['Cycling', 'sports', 'g_outdoor'],
  ['Dentistry', 'safety'],
  ['Digital Technology', 'stem'],
  ['Disabilities Awareness', 'citizenship'],
  ['Dog Care', 'nature'],
  ['Drafting', 'trades'],
  ['Electricity', 'stem'],
  ['Electronics', 'stem'],
  ['Emergency Preparedness', 'safety', 'g_emergency'],
  ['Energy', 'stem'],
  ['Engineering', 'trades'],
  ['Entrepreneurship', 'business'],
  ['Environmental Science', 'nature', 'g_environment'],
  ['Exploration', 'outdoor'],
  ['Family Life', 'citizenship', 'required'],
  ['Farm Mechanics', 'trades'],
  ['Fingerprinting', 'safety'],
  ['Fire Safety', 'safety'],
  ['First Aid', 'safety', 'required'],
  ['Fish & Wildlife Management', 'nature'],
  ['Fishing', 'outdoor'],
  ['Fly Fishing', 'outdoor'],
  ['Forestry', 'nature'],
  ['Game Design', 'stem'],
  ['Gardening', 'nature'],
  ['Genealogy', 'arts'],
  ['Geocaching', 'outdoor'],
  ['Geology', 'stem'],
  ['Golf', 'sports'],
  ['Graphic Arts', 'arts'],
  ['Health Care Professions', 'safety'],
  ['Hiking', 'outdoor', 'g_outdoor'],
  ['Home Repairs', 'trades'],
  ['Horsemanship', 'outdoor'],
  ['Insect Study', 'nature'],
  ['Inventing', 'stem'],
  ['Journalism', 'business'],
  ['Kayaking', 'outdoor'],
  ['Landscape Architecture', 'arts'],
  ['Law', 'citizenship'],
  ['Leatherwork', 'arts'],
  ['Lifesaving', 'safety', 'g_emergency'],
  ['Mammal Study', 'nature'],
  ['Metalwork', 'trades'],
  ['Mining in Society', 'trades'],
  ['Model Design and Building', 'arts'],
  ['Motorboating', 'outdoor'],
  ['Moviemaking', 'arts'],
  ['Multisport', 'sports'],
  ['Music', 'arts'],
  ['Nature', 'nature'],
  ['Nuclear Science', 'stem'],
  ['Oceanography', 'stem'],
  ['Orienteering', 'outdoor'],
  ['Painting', 'arts'],
  ['Personal Fitness', 'safety', 'required'],
  ['Personal Management', 'citizenship', 'required'],
  ['Pets', 'nature'],
  ['Photography', 'arts'],
  ['Pioneering', 'outdoor'],
  ['Plant Science', 'nature'],
  ['Plumbing', 'trades'],
  ['Pottery', 'arts'],
  ['Programming', 'stem'],
  ['Public Health', 'safety'],
  ['Public Speaking', 'business'],
  ['Pulp and Paper', 'trades'],
  ['Radio', 'stem'],
  ['Railroading', 'trades'],
  ['Reading', 'arts'],
  ['Reptile and Amphibian Study', 'nature'],
  ['Rifle Shooting', 'sports'],
  ['Robotics', 'stem'],
  ['Rowing', 'outdoor'],
  ['Safety', 'safety'],
  ['Salesmanship', 'business'],
  ['Scholarship', 'citizenship'],
  ['Scouting Heritage', 'citizenship'],
  ['Scuba Diving', 'outdoor'],
  ['Sculpture', 'arts'],
  ['Search and Rescue', 'safety'],
  ['Shotgun Shooting', 'sports'],
  ['Signs, Signals, and Codes', 'stem'],
  ['Skating', 'sports'],
  ['Small-Boat Sailing', 'outdoor'],
  ['Snow Sports', 'sports'],
  ['Soil and Water Conservation', 'nature'],
  ['Space Exploration', 'stem'],
  ['Sports', 'sports'],
  ['Stamp Collecting', 'arts'],
  ['Surveying', 'trades'],
  ['Sustainability', 'nature', 'g_environment'],
  ['Swimming', 'sports', 'g_outdoor'],
  ['Textile', 'trades'],
  ['Theater', 'arts'],
  ['Traffic Safety', 'safety'],
  ['Truck Transportation', 'trades'],
  ['Veterinary Medicine', 'nature'],
  ['Water Sports', 'sports'],
  ['Weather', 'stem'],
  ['Welding', 'trades'],
  ['Whitewater', 'outdoor'],
  ['Wilderness Survival', 'outdoor'],
  ['Wood Carving', 'arts'],
  ['Woodwork', 'trades'],
]

// Per-badge overrides where the scouting.org URL slug differs from ours,
// or the badge has a special status.
const OVERRIDES = {
  'american-indian-culture': { urlSlug: 'indian-lore' },
  'citizenship-in-society': {
    discontinued: true,
    note: 'Discontinued Feb 27, 2026. Still recordable if earned earlier.',
  },
}

function slugify(name) {
  return name
    .toLowerCase()
    .replace(/&/g, ' ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export const BADGES = RAW.map(([name, category, eagle]) => {
  const id = slugify(name)
  const override = OVERRIDES[id] || {}
  return {
    id,
    name,
    category,
    eagle: eagle || null, // 'required' | group key | null
    eagleRequired: eagle === 'required',
    eagleGroup: eagle && eagle !== 'required' ? eagle : null,
    discontinued: !!override.discontinued,
    note: override.note || null,
    url: `https://www.scouting.org/merit-badges/${override.urlSlug || id}/`,
  }
})

export const BADGES_BY_ID = Object.fromEntries(BADGES.map((b) => [b.id, b]))

export const TOTAL_BADGES = BADGES.length
