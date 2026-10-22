// Pricing: single source of truth for /pricing.
//
// Full-service numbers mirror the internal pricing calculator spreadsheet (unchanged
// from the previous site). Blueprint and Slate numbers are PILOT HYPOTHESES from
// the 2026-10-15 strategy session and are labeled as pilot pricing on the page.
// Change them here.

export const PLANS = [
  {
    id: 'full-service',
    name: 'Full-service',
    price: 1000,
    unit: 'per program / month, from',
    pitch: 'We set it up, train your team, and stay on call.',
    includes: [
      'The complete EHR, configured for you',
      'Clinical onboarding and training',
      'Feature requests built by our team',
      'A person who knows your program by name',
      'Pick the products you need',
    ],
    cta: { href: '/demo?path=full-service', label: 'Request a demo' },
    pilot: false,
  },
  {
    id: 'builder',
    name: 'Blueprint',
    price: 750,
    unit: 'per program / month',
    pitch: 'The full suite, already built. Build on top of it.',
    includes: [
      'Everything in Slate',
      'The complete EHR: clinical, eMAR, CRM, outcomes',
      'Every marketplace feature from BlueStep',
      'Snapshot history on every change',
      'Technical support',
    ],
    cta: { href: '/demo?path=builder', label: 'Start building' },
    pilot: true,
    featured: true,
  },
  {
    id: 'blank-slate',
    name: 'Slate',
    price: 300,
    // Flat, not per program: a blank slate has no program count to measure.
    unit: 'per month, flat',
    pitch: 'A blank slate. Build anything.',
    includes: [
      'HIPAA-ready workspace and BAA',
      'Builder access for your own AI tools',
      'Starter patterns for behavioral health',
      'Marketplace access',
      'Technical support',
    ],
    cta: { href: '/demo?path=blank-slate', label: 'Start with Slate' },
    pilot: true,
  },
] as const

export const BUILD_HELP_RATE = 175

// Concierge: a system of the program's own, built and maintained by our team. Flat, every
// product included, not priced per module. Hours are use-it-or-lose-it and do not grow with
// added programs.
export const CONCIERGE = { base: 3500, perAddedProgram: 1000, hours: 10 } as const

// ─── Full-service calculator (per program, per month) ───────────────────────
export const FACILITY_PRICES = { ehr: 1000, crm: 500, outcomes: 250 } as const
export const BUNDLES = { ehrCrm: 1350, ehrOutcomes: 1125, all: 1500 } as const
/** 1st program full price, 2nd program -15%, 3rd and beyond -25%. Per-program plans only (not Slate). */
export const VOLUME_DISCOUNTS = [0, 0.15, 0.25] as const

export const REFERRAL = { perSeat: 25, blueIqPerSeat: 15 } as const

export interface Selection {
  ehr: boolean
  crm: boolean
  outcomes: boolean
}

export function basePerProgram({ ehr, crm, outcomes }: Selection): number {
  if (ehr && crm && outcomes) return BUNDLES.all
  if (ehr && crm) return BUNDLES.ehrCrm
  if (ehr && outcomes) return BUNDLES.ehrOutcomes
  return (ehr ? FACILITY_PRICES.ehr : 0) + (crm ? FACILITY_PRICES.crm : 0) + (outcomes ? FACILITY_PRICES.outcomes : 0)
}

export function discountFor(programIndex: number): number {
  return VOLUME_DISCOUNTS[Math.min(programIndex, VOLUME_DISCOUNTS.length - 1)]
}

/** Monthly total for `programs` programs at `base` each, with volume discounts. */
export function monthlyTotal(base: number, programs: number): number {
  let total = 0
  for (let i = 0; i < programs; i++) total += base * (1 - discountFor(i))
  return total
}

export function usd(n: number): string {
  return n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })
}
