// Marketplace catalog. Every first-party listing below is a feature BlueStep built
// for a real program. Publisher listings from builders get added here as they pass
// review.

export type Category = 'Clinical' | 'Nursing' | 'Admissions' | 'Compliance'

export interface Listing {
  slug: string
  name: string
  summary: string
  category: Category
  publisher: string
  price: 'Free' | string
  /** Which starting point the listing was built on. Your AI adapts it to either. */
  builtOn: 'Blueprint' | 'Slate'
  uses: string[]
}

export const CATEGORIES: Category[] = ['Clinical', 'Nursing', 'Admissions', 'Compliance']

export const LISTINGS: Listing[] = [
  {
    slug: 'agreements',
    name: 'E-Signature Agreements',
    summary: 'Send admission packets, collect signatures on any device, and file the signed PDF to the chart.',
    category: 'Admissions',
    publisher: 'BlueStep',
    price: 'Included with CRM',
    builtOn: 'Blueprint',
    uses: ['Signature placement', 'Signed PDF filed automatically', 'Full audit trail'],
  },
  {
    slug: 'q15',
    name: 'Q15 Safety Checks',
    summary: 'Headcount rounds by unit. Staff tap a resident, log location and status, and missed rounds surface fast.',
    category: 'Nursing',
    publisher: 'BlueStep',
    price: 'Free',
    builtOn: 'Blueprint',
    uses: ['Tablet-friendly rounds', 'Per-unit roster', 'Missed-check visibility'],
  },
  {
    slug: 'treatment-team-review',
    name: 'Treatment Team Review',
    summary: 'Dictate the weekly review. BlueIQ drafts all seven sections for the clinician to approve.',
    category: 'Clinical',
    publisher: 'BlueStep',
    price: 'Free',
    builtOn: 'Blueprint',
    uses: ['Dictation', 'Draft for review', 'Signed and locked'],
  },
  {
    slug: 'incident-dashboard',
    name: 'Incident Dashboard',
    summary: 'Every incident by unit, type, and time of day. See patterns before the auditor does.',
    category: 'Compliance',
    publisher: 'BlueStep',
    price: 'Free',
    builtOn: 'Blueprint',
    uses: ['Live counts', 'Trend by unit', 'Drill to the report'],
  },
  {
    slug: 'orthostatic-vitals',
    name: 'Orthostatic Vitals',
    summary: 'Lying, sitting, and standing readings in one entry, with waist measurement for metabolic monitoring.',
    category: 'Nursing',
    publisher: 'BlueStep',
    price: 'Free',
    builtOn: 'Blueprint',
    uses: ['Grouped readings', 'Metabolic tracking', 'Chart history'],
  },
  {
    slug: 'crm-dashboard',
    name: 'Admissions Dashboard',
    summary: 'Pipeline, follow-ups, and referral sources on one screen for the admissions team.',
    category: 'Admissions',
    publisher: 'BlueStep',
    price: 'Free',
    builtOn: 'Blueprint',
    uses: ['Follow-up queue', 'Referral source tracking', 'Census view'],
  },
  {
    slug: 'pre-admissions-application',
    name: 'Pre-Admissions Application',
    summary: 'A form families fill out once. They save, come back, and submit, and BlueIQ drafts an admission summary.',
    category: 'Admissions',
    publisher: 'BlueStep',
    price: 'Included with CRM',
    builtOn: 'Blueprint',
    uses: ['Save and return', 'Your own questions', 'BlueIQ admission summary'],
  },
  {
    slug: 'bps-lock',
    name: 'Assessment Lock and Unlock',
    summary: 'Lock signed assessments. Unlocking takes a reason, and the reason is logged.',
    category: 'Compliance',
    publisher: 'BlueStep',
    price: 'Free',
    builtOn: 'Blueprint',
    uses: ['Lock on sign', 'Audited unlock', 'Role-based control'],
  },
]

/** What ships with every listing, first-party or builder-published. */
export const LISTING_CONTENTS = [
  { title: 'The spec', body: 'What it does and why, written so any AI tool can rebuild it on your system.' },
  { title: 'A reference build', body: 'The working code from the program it was built for.' },
  { title: 'Acceptance checks', body: 'A list of things that must be true when it works. You run them before you go live.' },
  { title: 'Known traps', body: 'What went wrong the first time, so it does not go wrong for you.' },
]
