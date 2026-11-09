// The help center (/help). One entry per product area. To publish a new area:
// build its guide page, add its route in App.tsx under help/<slug>, then set
// status to 'live' and fill in its topics (each anchor is a section id on that page).
// Planned areas list the topics we expect to cover; they render as "Coming soon".
import { Brain, ChartLineUp, Funnel, GraduationCap, Pill, Stethoscope, UsersThree, type Icon } from '@phosphor-icons/react'

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
    slug: 'users',
    name: 'Managing users',
    icon: UsersThree,
    blurb: 'Add staff, set up roles and permissions, reset passwords, and handle staff who leave.',
    status: 'live',
    topics: [
      { label: 'Where user management lives', anchor: 'start' },
      { label: 'Set up roles and permissions', anchor: 'roles', audience: 'BlueStep administrator' },
      { label: 'Add a new user', anchor: 'add', audience: 'BlueStep administrator' },
      { label: 'Give a new user their sign-in', anchor: 'handoff', audience: 'BlueStep administrator' },
      { label: 'First sign-in and changing your password', anchor: 'first-login' },
      { label: 'Find a staff record', anchor: 'record' },
      { label: 'The Employment Info form', anchor: 'employment' },
      { label: "Change someone's permissions", anchor: 'permissions', audience: 'BlueStep administrator' },
      { label: 'Reset a password', anchor: 'reset', audience: 'BlueStep administrator' },
      { label: 'When someone leaves', anchor: 'leaving', audience: 'BlueStep administrator' },
      { label: 'Who can do what', anchor: 'who' },
      { label: 'Common questions', anchor: 'faq' },
    ],
  },
  {
    slug: 'medical',
    name: 'Medications',
    icon: Pill,
    blurb: 'Set up the medication system, start and discontinue meds, and chart every dose on the eMAR.',
    status: 'live',
    topics: [
      { label: 'Where medications live', anchor: 'start' },
      { label: 'Medication System rules', anchor: 'rules', audience: 'BlueStep administrator' },
      { label: 'Med Groups and MAR exceptions', anchor: 'groups', audience: 'BlueStep administrator' },
      { label: 'Start a new medication', anchor: 'order', audience: 'Nurse' },
      { label: 'Use the eMAR board', anchor: 'emar', audience: 'Med passer' },
      { label: 'Give scheduled meds', anchor: 'give', audience: 'Med passer' },
      { label: "Chart a dose that wasn't given", anchor: 'exception', audience: 'Med passer' },
      { label: 'Give a PRN', anchor: 'prn', audience: 'Med passer' },
      { label: 'Discontinue a medication', anchor: 'discontinue', audience: 'Nurse' },
      { label: 'Put medications on hold', anchor: 'hold', audience: 'Nurse' },
      { label: "Look back at a client's MAR", anchor: 'mar' },
      { label: 'Who can do what', anchor: 'who' },
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
]
