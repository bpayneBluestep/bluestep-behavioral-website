// The help center (/help). One entry per product area. To publish a new area:
// build its guide page, add its route in App.tsx under help/<slug>, then set
// status to 'live' and fill in its topics (each anchor is a section id on that page).
// Planned areas list the topics we expect to cover; they render as "Coming soon".
import { Brain, ChartLineUp, Funnel, GearSix, GraduationCap, Pill, Stethoscope, type Icon } from '@phosphor-icons/react'

export interface HelpTopic {
  label: string
  /** Section id on the area's guide page. Live areas only. */
  anchor?: string
  /** Who the topic is mainly for, shown as a hint in search results. */
  audience?: string
}

export interface HelpArea {
  slug: string
  name: string
  icon: Icon
  blurb: string
  status: 'live' | 'soon'
  topics: HelpTopic[]
}

export const helpPath = (slug: string, anchor?: string) => `/help/${slug}${anchor ? `#${anchor}` : ''}`

export const HELP_AREAS: HelpArea[] = [
  {
    slug: 'academics',
    name: 'Academics',
    icon: GraduationCap,
    blurb: 'Classes, attendance, gradebook, report cards and transcripts.',
    status: 'live',
    topics: [
      { label: 'Where Academics lives', anchor: 'start' },
      { label: 'Set up a new school year', anchor: 'setup', audience: 'School administrator' },
      { label: 'Build the class schedule', anchor: 'schedule', audience: 'School administrator' },
      { label: 'Enroll a new student', anchor: 'enroll', audience: 'Registrar' },
      { label: 'Add transfer credits', anchor: 'transfer', audience: 'Registrar' },
      { label: "Check a student's progress", anchor: 'progress' },
      { label: 'Take attendance and enter grades', anchor: 'teaching', audience: 'Teacher' },
      { label: 'Post final grades', anchor: 'posting', audience: 'Teacher' },
      { label: 'When a student leaves', anchor: 'wrapup', audience: 'Registrar' },
      { label: 'Report cards and transcripts', anchor: 'documents', audience: 'Registrar' },
      { label: 'Who can do what', anchor: 'permissions', audience: 'BlueStep administrator' },
      { label: 'Common questions', anchor: 'faq' },
    ],
  },
  {
    slug: 'clinical',
    name: 'Clinical',
    icon: Stethoscope,
    blurb: 'Clinical documentation, treatment plans and cosignature.',
    status: 'soon',
    topics: [
      { label: 'Write and sign a note' },
      { label: 'Build a treatment plan' },
      { label: 'Lock, unlock and cosign' },
    ],
  },
  {
    slug: 'medical',
    name: 'Medical',
    icon: Pill,
    blurb: 'Medications, the eMAR and medication passes.',
    status: 'soon',
    topics: [{ label: 'Record a medication pass' }, { label: 'Manage medication orders' }],
  },
  {
    slug: 'crm',
    name: 'CRM',
    icon: Funnel,
    blurb: 'Referrals, leads, census, pre-admissions and e-signatures.',
    status: 'soon',
    topics: [
      { label: 'Work the lead pipeline' },
      { label: 'Track referral sources' },
      { label: 'Send a pre-admissions application' },
      { label: 'Send agreements for e-signature' },
    ],
  },
  {
    slug: 'outcomes',
    name: 'Outcomes',
    icon: ChartLineUp,
    blurb: 'Survey scheduling, email delivery and analytics.',
    status: 'soon',
    topics: [{ label: 'Schedule surveys' }, { label: 'Delivery and reminders' }, { label: 'Read the results' }],
  },
  {
    slug: 'blueiq',
    name: 'BlueIQ',
    icon: Brain,
    blurb: 'AI drafts from the record. Your staff reviews and signs.',
    status: 'soon',
    topics: [{ label: 'Draft a document with BlueIQ' }, { label: 'Dictation' }, { label: 'Usage and limits' }],
  },
  {
    slug: 'admin',
    name: 'Administration',
    icon: GearSix,
    blurb: 'Staff accounts, roles and permissions across BlueStep.',
    status: 'soon',
    topics: [{ label: 'Add a staff member' }, { label: 'Set up roles and permissions' }, { label: 'Switch between sites' }],
  },
]
