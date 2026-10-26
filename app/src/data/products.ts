// Product pages (/products/*). Copy condensed from the previous site's approved
// product pages. Each section: a heading, the pain it answers, and what we do.
import { Brain, ChartLineUp, Funnel, GraduationCap, Stethoscope, type Icon } from '@phosphor-icons/react'

export interface ProductSection {
  heading: string
  pain: string
  bullets: string[]
  /** Optional screenshot shown under the bullets. */
  shot?: { src: string; alt: string }
}

export interface Product {
  slug: string
  name: string
  icon: Icon
  price: string
  card: string
  headline: string
  sub: string
  image: string
  alt: string
  sections: ProductSection[]
  quote?: { headline: string; body: string }
}

export const PRODUCTS: Product[] = [
  {
    slug: 'ehr',
    name: 'EHR',
    icon: Stethoscope,
    price: '$1,000 per program / month',
    card: 'Clinical documentation, treatment plans, eMAR, and compliance.',
    headline: '15 years documenting what actually happens inside residential treatment.',
    sub: 'Notes get written twice. Reviews start from scratch every week. Surveys arrive unannounced. So we built the record system residential clinicians actually need.',
    image: 'images/heroes/homepage.jpg',
    alt: 'A clinician taking notes during a session',
    sections: [
      {
        heading: 'Clinical documentation',
        pain: 'Residential clinicians document the same clinical picture three times a week: session note, weekly summary, utilization review. BlueStep captures it once and reuses it everywhere.',
        bullets: [
          'Individual, family, group, and psychiatrist notes with fields that match how the session runs',
          'Medical and nursing notes in the same record. No parallel chart.',
          'DAP or SOAP per note type, switchable per payer contract',
        ],
      },
      {
        heading: 'Treatment plans',
        pain: 'Ninety-day reviews arrive whether or not the plan still fits. Our builder holds the structure so your team can focus on the clinical picture.',
        bullets: [
          'Problem, goal, objective, intervention. Every level traceable to a diagnosis.',
          'A residential library of problems, goals, and interventions, plus templates your program owns',
          'The prior plan carries forward, and prompts show what needs an update',
        ],
      },
      {
        heading: 'eMAR',
        pain: "Paper MARs get lost between shifts. A missed dose doesn't surface until the next med pass. The eMAR keeps the record tight through every shift change.",
        bullets: [
          'Daily schedule generated from active orders, so nobody recopies them by hand',
          'Tap, time-stamp, initial. PRN reasons and missed doses captured at the point of care.',
          'Exceptions routed to the nurse supervisor',
        ],
      },
      {
        heading: 'Lock, unlock, and cosignature',
        pain: 'Cosignature rules vary by licensure, state, and payer. Surveyors want every unlock time-stamped and visible. BlueStep captures all of it.',
        bullets: [
          'Notes lock the moment the clinician signs',
          'Admin unlock with a captured reason and a full audit trail',
          'Licensure-aware routing: a provisional therapist\'s note routes to the right cosigner',
        ],
      },
      {
        heading: 'Permissions by person, form, and feature',
        pain: 'A nurse documents med passes but never edits therapy notes. An admissions coordinator reads the record but writes nothing. Role buckets can\'t capture that.',
        bullets: [
          'Permissions set per person, so nobody gets more access than the job needs',
          'Reader, author, editor, or no access on every form and feature',
        ],
      },
    ],
  },
  {
    slug: 'crm',
    name: 'CRM',
    icon: Funnel,
    price: '$500 per program / month',
    card: 'Referrals, leads, census, pre-admissions, and e-signatures.',
    headline: 'Empty beds are a revenue crisis.',
    sub: 'Leads land on sticky notes. Families fill out the same intake packet three times. So we built the admissions system residential programs need, in the same record as the chart.',
    image: 'images/heroes/admissions-call.jpg',
    alt: 'An admissions coordinator on a call with a family',
    sections: [
      {
        heading: 'Referral network',
        pain: "Referral relationships live in a liaison's memory. A partner sends three residents, then stops, and nobody can say why.",
        bullets: [
          'Referral source on every lead and admission, so you know who actually converts',
          'Liaison visits and calls scheduled, logged, and surfaced before they slip',
        ],
      },
      {
        heading: 'Lead pipeline',
        pain: 'A family calls back Thursday and nobody can say which stage they were in or whose turn it is to follow up.',
        bullets: [
          'Named stages from new lead to admission, time-stamped automatically',
          'Every call stays on the lead, and the person who owns the next step is named',
          'Aging alerts surface leads going cold before the family calls somewhere else',
        ],
      },
      {
        heading: 'Pre-admissions application',
        pain: 'Families in crisis fill out the same packet three times. Every retype drifts the clinical picture.',
        bullets: [
          'Build your own pre-admissions form, without waiting on a vendor release',
          'Families save, return, and submit once',
          'BlueIQ drafts an admission summary from what they submitted',
        ],
      },
      {
        heading: 'E-signature agreements',
        pain: 'Admission packets still go out to print, sign, scan, and send back. A family in crisis loses days to paperwork.',
        bullets: [
          'Send agreements and consents as a secure link. Families sign on any device.',
          'The signed PDF files itself to the record, with a full audit trail',
          'Included with the CRM. No separate e-signature vendor.',
        ],
      },
      {
        heading: 'Analytics',
        pain: 'The monthly review asks the same four questions. The answers live in five spreadsheets that disagree.',
        bullets: [
          'Lead volume across 30, 60, and 90 days without pulling a report',
          'Conversion by stage and source, with loss reasons rolled up',
        ],
      },
    ],
    quote: {
      headline: 'Same database. No API. No migration.',
      body: 'Pre-admissions lives in the same database as the clinical record. When the admission decision is made, the data is already there.',
    },
  },
  {
    slug: 'outcomes',
    name: 'Outcomes',
    icon: ChartLineUp,
    price: '$250 per program / month',
    card: 'Survey scheduling, email delivery, and analytics.',
    headline: 'Payers want outcomes. Show them yours.',
    sub: 'Reimbursement is moving toward measurable outcomes, and most programs measure by anecdote. Outcomes turns surveys into data tied to the clinical record.',
    image: 'images/heroes/for-executives.jpg',
    alt: 'Leaders reviewing outcome charts',
    sections: [
      {
        heading: 'Survey scheduling',
        pain: "Tracking who is due for which survey usually lives in one person's spreadsheet.",
        bullets: ['Set the schedule once: intake, mid-treatment, discharge, follow-up', 'Surveys go out on time for every resident, automatically'],
      },
      {
        heading: 'Delivery and reminders',
        pain: "Families and former residents don't all answer the same way, and response rates collapse after discharge.",
        bullets: ['Surveys go out by email today. Text delivery is coming next.', 'Reminders follow up so response rates hold after discharge'],
      },
      {
        heading: 'Analytics',
        pain: 'A research database maintained in parallel never matches the chart.',
        bullets: ['Trends by program, cohort, and time', 'What you show a payer is the same data your clinicians work from'],
      },
    ],
  },
  {
    slug: 'academics',
    name: 'Academics',
    icon: GraduationCap,
    price: '$150 per program / month',
    card: 'Classes, attendance, gradebook, report cards, and transcripts.',
    headline: 'Your school already knows who was admitted this morning.',
    sub: 'Residential schools run a second system for classes and grades, and someone keeps it in sync with the chart by hand. Academics is the school system in the same record, so admissions, discharges, and transcripts stop falling through the gap.',
    image: 'images/heroes/classroom.jpg',
    alt: 'A teacher leading a discussion with a small class of teenagers',
    sections: [
      {
        heading: 'Admissions and discharge',
        pain: 'Students arrive and leave mid-term. A new student sits in class for a week before anyone enrolls them, and the one who discharged still has six open classes in June.',
        bullets: [
          "New admissions show up on a Needs enrollment list until they're in classes",
          'Discharged students with open classes are flagged for their teachers to wrap up',
          'Close each class with a withdrawal mark, partial credit, or a hand-off grade for the next school',
          'Partial credit is suggested from the days the student was enrolled',
        ],
        shot: { src: 'images/academics/my-classes.jpg', alt: "A teacher's classes for the term, with one class flagged as needing wrap-up" },
      },
      {
        heading: 'Attendance in seconds',
        pain: "Class attendance competes with teaching. If it takes more than a minute, it doesn't get done.",
        bullets: [
          "Teachers open My Classes and see today's classes, each one tap from its roster",
          'Everyone starts present. Teachers tap only the exceptions.',
          'Your own codes, including Therapy and Medical for students pulled from class',
          'Classes still missing attendance are flagged',
        ],
        shot: { src: 'images/academics/attendance.jpg', alt: 'A class attendance roster with present, absent, tardy, excused, therapy, and medical codes' },
      },
      {
        heading: 'Gradebook and posting',
        pain: 'Grades live in a spreadsheet until report cards are due. Then someone retypes them.',
        bullets: [
          'Assignment categories and weights per class, starting from a school default',
          'Running average and letter grade as scores go in, with late and missing work flagged',
          'Post final grades at the end of a term. Posted grades lock.',
          'Unlocking takes an admin and a logged reason',
        ],
        shot: { src: 'images/academics/gradebook.jpg', alt: 'A class gradebook with weighted categories, scores, and running term grades' },
      },
      {
        heading: 'Credits and GPA',
        pain: '"How many credits does she have?" should not take an afternoon with three transcripts.',
        bullets: [
          'Credits by subject area on the student record, with in-progress credits shown separately',
          'Unweighted and weighted GPA, with Honors, AP, and dual enrollment weighting',
          'Cumulative across the whole record, transfer credits included',
          'Dated grade-level history, set by a person, never advanced automatically',
        ],
      },
      {
        heading: 'Report cards and transcripts',
        pain: 'Report cards that look like a database export. Transcripts assembled by hand the week a student discharges.',
        bullets: [
          'Progress reports and report cards any time, for one student or the whole school',
          'Unofficial transcripts on demand, watermarked',
          "Official transcripts with the registrar's signature, a document number, and an issuance log",
          "Your school's logo, header, and sections, set once with a live preview",
        ],
        shot: { src: 'images/academics/transcript.jpg', alt: 'An unofficial transcript with term grades, credits, and cumulative GPA' },
      },
      {
        heading: 'Transfer credits with BlueIQ',
        pain: 'Every new student brings a transcript from somewhere else, often a phone photo of a fax. Someone types it in, line by line.',
        bullets: [
          'Upload the transcript. BlueIQ fills in the courses, credits, and grades beside the file.',
          'Staff checks every row and saves. Nothing is saved without a person.',
          'Flags a transcript that belongs to a different student',
          'Uses BlueIQ credits. Typing credits in by hand works too.',
        ],
        shot: { src: 'images/academics/transfer-import.jpg', alt: 'BlueIQ filling in transfer credits from an uploaded transcript for staff to review' },
      },
      {
        heading: 'Setup in an afternoon',
        pain: 'Most school systems take a consultant and a semester to configure.',
        bullets: [
          'A seven-step checklist: school details, terms, subjects, grade scales, attendance codes, courses, and documents',
          'Sensible defaults to start from. Copy last term forward.',
          'Permissions per person: teachers see their own classes, registrars issue transcripts',
          'Nothing is turned on until your admin grants it',
        ],
      },
    ],
    quote: {
      headline: 'One record. The school is in it.',
      body: 'Academics lives in the same database as the clinical record. When a student is admitted, the school already has them. When they discharge, their teachers know.',
    },
  },
  {
    slug: 'blueiq',
    name: 'BlueIQ',
    icon: Brain,
    price: 'Usage-based credits',
    card: 'Drafts from the record. Your staff reviews and signs.',
    headline: 'The record already knows. BlueIQ puts it to work.',
    sub: 'BlueIQ drafts from what your team already documented. Your staff reviews and signs. Nothing goes out without a human decision.',
    image: 'images/heroes/reviewing-draft.jpg',
    alt: 'A staff member reviewing a draft before signing',
    sections: [
      {
        heading: 'Utilization review',
        pain: 'Insurers want a narrative for every continued stay. Clinicians write each one from scratch.',
        bullets: ['BlueIQ reads the chart and drafts the clinical picture, progress, and medical necessity', 'Your clinician edits and submits instead of writing from scratch'],
      },
      {
        heading: 'Dictation and document intelligence',
        pain: 'Records arrive as a pile. Notes get typed at the end of a long shift.',
        bullets: [
          'Point BlueIQ at a pile of documents for a summary and cited answers',
          'Dictate a note and it comes back clean, classified, and ready for review',
          "Reads a new student's old transcript into transfer credits for staff to check",
        ],
      },
      {
        heading: 'Clear usage',
        pain: 'AI pricing is usually a mystery until the bill arrives.',
        bullets: ['Usage is measured in credits, so you see what you use and what it costs'],
      },
    ],
  },
]
