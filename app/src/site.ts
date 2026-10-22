// Brand + navigation in one place. The behavioral division is being rebranded
// this quarter: change BRAND here and every page follows.
//
// The site is organized as two paths from the homepage:
//   Full-service  we run it (products, roles, clinical onboarding)
//   Build         you change it with your own AI tools (builder, marketplace, Slate)

export const BRAND = {
  name: 'BlueStep Behavioral',
  short: 'Behavioral',
  legal: 'BlueStep Systems',
  email: 'bpayne@bluestep.net',
}

// Program Directory sign-up (gitsites/program-directory). Free listings for programs.
export const DIRECTORY_URL = 'https://programdirectory.bluestep.net/'

export interface NavLinkItem {
  href: string
  label: string
  hint?: string
}
export interface NavColumn {
  title: string
  items: NavLinkItem[]
}
export interface NavGroup {
  label: string
  badge?: string
  columns: NavColumn[]
}

export const NAV: (NavGroup | NavLinkItem)[] = [
  {
    label: 'Full-service',
    columns: [
      {
        title: 'Products',
        items: [
          { href: '/full-service', label: 'Overview', hint: 'We run it. You run your program.' },
          { href: '/full-service#concierge', label: 'Concierge', hint: 'Your own system, built by our team' },
          { href: '/products/ehr', label: 'EHR', hint: 'Clinical, nursing, and compliance' },
          { href: '/products/crm', label: 'CRM', hint: 'Referrals, census, and intake' },
          { href: '/products/outcomes', label: 'Outcomes', hint: 'Surveys and outcome analytics' },
          { href: '/products/blueiq', label: 'BlueIQ', hint: 'AI inside every module' },
          { href: '/program-directory', label: 'Program Directory', hint: 'Free listings for every program' },
        ],
      },
      {
        title: 'Who we help',
        items: [
          { href: '/for-clinicians', label: 'Clinicians' },
          { href: '/for-nurses', label: 'Nurses' },
          { href: '/for-admissions', label: 'Admissions' },
          { href: '/for-executives', label: 'Executives' },
          { href: '/for-referring-professionals', label: 'Referring Professionals' },
        ],
      },
    ],
  },
  {
    label: 'Build',
    badge: 'New',
    columns: [
      {
        title: 'Build',
        items: [
          { href: '/build', label: 'Overview', hint: 'Change anything with your own AI tools' },
          { href: '/marketplace', label: 'Marketplace', hint: 'Features other programs built' },
          { href: '/slate', label: 'Slate', hint: 'A blank slate to build anything' },
        ],
      },
    ],
  },
  { href: '/pricing', label: 'Pricing' },
]

export const isGroup = (n: NavGroup | NavLinkItem): n is NavGroup => 'columns' in n

// One label per intent, used everywhere.
export const CTA = {
  demo: { href: '/demo', label: 'Request a demo' },
  build: { href: '/demo?path=builder', label: 'Start building' },
  fullService: { href: '/full-service', label: 'Explore full-service' },
  how: { href: '/build', label: 'Explore building' },
  market: { href: '/marketplace', label: 'Browse the marketplace' },
  pricing: { href: '/pricing', label: 'See pricing' },
  directory: { href: '/program-directory', label: 'Free program listing' },
} as const
