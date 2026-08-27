/**
 * Presentation Engine V6 — Hero Quality Tiers
 *
 * Not all elevated moments should feel equally important.
 * Tiering creates rhythm so course-defining peaks stay rare and valuable.
 *
 * Tier 1 — Course-defining. Very rare. Maximum cinematic quality.
 * Tier 2 — Module-defining. Strong emphasis.
 * Tier 3 — Supporting elevated scenes. Elegant but restrained.
 * none  — Standard teaching scene.
 */

export const HERO_TIERS = {
  NONE: 'none',
  TIER_3: '3',
  TIER_2: '2',
  TIER_1: '1',
}

export const HERO_TIER_META = {
  [HERO_TIERS.TIER_1]: {
    label: 'Tier 1',
    purpose: 'Course-defining moments. Very rare. Maximum cinematic quality.',
    intensity: 1,
  },
  [HERO_TIERS.TIER_2]: {
    label: 'Tier 2',
    purpose: 'Module-defining moments. Strong emphasis.',
    intensity: 0.82,
  },
  [HERO_TIERS.TIER_3]: {
    label: 'Tier 3',
    purpose: 'Supporting elevated scenes. Elegant but restrained.',
    intensity: 0.62,
  },
  [HERO_TIERS.NONE]: {
    label: 'Standard',
    purpose: 'Normal teaching scene — no elevated hero gravity.',
    intensity: 0.45,
  },
}

/**
 * Resolve hero tier from film / scene flags.
 * Subjects should set film.heroTier explicitly when possible;
 * this helper derives a sensible default.
 */
export function resolveHeroTier({
  finale = false,
  chapterOpener = false,
  chapterPayoff = false,
  heroPlanned = false,
  hero = false,
  wow = false,
  heroTier = null,
} = {}) {
  if (heroTier && Object.values(HERO_TIERS).includes(String(heroTier))) {
    return String(heroTier)
  }
  if (finale) return HERO_TIERS.TIER_1
  if (chapterOpener || chapterPayoff || heroPlanned) return HERO_TIERS.TIER_2
  if (hero || wow) return HERO_TIERS.TIER_3
  return HERO_TIERS.NONE
}

export function isElevatedHero(tier) {
  return tier === HERO_TIERS.TIER_1 || tier === HERO_TIERS.TIER_2 || tier === HERO_TIERS.TIER_3
}

export function heroIntensity(tier) {
  return HERO_TIER_META[tier]?.intensity ?? HERO_TIER_META[HERO_TIERS.NONE].intensity
}

/** Focus / dwell multipliers by tier — used by modes.js consumers. */
export function heroFocusDelayMs(tier, { quiet = false, revision = false } = {}) {
  if (revision) return 12000
  if (quiet) return 11000
  if (tier === HERO_TIERS.TIER_1) return 11000
  if (tier === HERO_TIERS.TIER_2) return 9000
  if (tier === HERO_TIERS.TIER_3) return 8000
  return 7000
}

export function heroSuggestedDwellMs(tier, { quiet = false, longForm = false } = {}) {
  if (tier === HERO_TIERS.TIER_1) return 18000
  if (tier === HERO_TIERS.TIER_2) return 14000
  if (quiet) return 9000
  if (tier === HERO_TIERS.TIER_3) return 12000
  if (longForm) return 16000
  return 10000
}
