// "Who we help" role pages. Copy carried over from the previous site (approved
// 2026-07-22 rewrite), with icons mapped to Phosphor.
import {
  ArrowsClockwise,
  ArrowsLeftRight,
  Buildings,
  ChartBar,
  ChartLineUp,
  ClipboardText,
  Clock,
  Copy,
  EyeSlash,
  FileText,
  FolderOpen,
  Lightning,
  MapTrifold,
  NotePencil,
  PhoneX,
  Pill,
  PresentationChart,
  PuzzlePiece,
  ShieldCheck,
  ShieldWarning,
  Signature,
  Sparkle,
  SquaresFour,
  Table,
  UserPlus,
  UsersThree,
  Warning,
  DownloadSimple,
  type Icon,
} from '@phosphor-icons/react'

export interface Role {
  slug: string
  nav: string
  title: string
  headline: string
  sub: string
  image: string
  alt: string
  pains: { icon: Icon; heading: string; body: string }[]
  features: { icon: Icon; name: string; body: string }[]
  /** One line on what this role's team could build next. */
  build: string
  closing: { headline: string; body: string }
}

export const ROLES: Role[] = [
  {
    slug: 'for-clinicians',
    nav: 'Clinicians',
    title: 'For Clinicians',
    headline: 'Your clinical hours are for patients. Not paperwork.',
    sub: 'Sessions all day. Notes, reviews, and compliance tracking all night. Our documentation tools were shaped with clinicians who work that schedule.',
    image: 'images/heroes/for-clinicians.jpg',
    alt: 'A therapist leading a group session',
    pains: [
      { icon: Clock, heading: 'Charting at midnight', body: "Your clinical hours are full. The notes come after. In behavioral health, after-hours charting isn't the edge case. It's the default." },
      { icon: FileText, heading: 'Utilization review volume', body: 'Insurers want a narrative for every continued stay. Writing each review from scratch takes hours per patient.' },
      { icon: ClipboardText, heading: 'Treatment plan documentation', body: "90-day reviews need measurable goals, updated diagnoses, and revised time frames. Outpatient templates don't fit residential care." },
      { icon: ShieldCheck, heading: 'Compliance overhead', body: "Payer formats, state rules, accreditation requirements, note timelines. Clinicians carry it all in their heads. That's not a system." },
    ],
    features: [
      { icon: Sparkle, name: 'BlueIQ utilization review drafts', body: 'BlueIQ reads the clinical record and drafts the review narrative. You edit and submit instead of writing from scratch.' },
      { icon: NotePencil, name: 'Therapy notes', body: 'Individual, group, family, and crisis notes shaped for residential care. Not outpatient templates bent to fit.' },
      { icon: ClipboardText, name: 'Treatment plan builder', body: '90-day cycles, measurable goals, diagnosis-linked objectives. You fill in the clinical picture. The builder holds the structure.' },
      { icon: Lightning, name: 'Documentation that keeps up', body: "One clinical record, auto-populated fields, compliance rules in the workflow. The system surfaces what's due, so you don't have to remember." },
    ],
    build: 'Need a note type your program invented? Describe it, and it can be in the chart this afternoon.',
    closing: { headline: 'See how it works for your clinical team.', body: "You'll talk to someone who knows how residential programs run. Not a sales rep with a feature list." },
  },
  {
    slug: 'for-nurses',
    nav: 'Nurses',
    title: 'For Nurses',
    headline: 'One shift. One workflow. Not four systems.',
    sub: 'A med pass across 30 residents, an incident to document, and a paper trail three bodies will audit. BlueStep puts all of it in one workflow.',
    image: 'images/heroes/for-nurses.jpg',
    alt: 'A nurse at a residential program',
    pains: [
      { icon: ArrowsLeftRight, heading: 'System toggling', body: 'Three systems for one med pass. A fourth for the incident during it. On a behavioral health unit, dead time has consequences.' },
      { icon: Table, heading: 'Med-pass documentation', body: "Every administration across 20 to 40 residents, several times a day. Capturing it is non-negotiable. The time it takes shouldn't be." },
      { icon: Warning, heading: 'Incident report friction', body: "The paperwork after a crisis shouldn't take longer than the response itself. For most teams, it does." },
      { icon: Copy, heading: 'Compliance paper trails', body: "Accreditors, surveyors, and payers all want proof. Nurses carry that burden across systems that don't talk to each other." },
    ],
    features: [
      { icon: Pill, name: 'eMAR', body: 'Scheduled meds, PRNs, refusals, and vitals documented at the point of care. Built for residential med-pass volume, including psychotropic oversight.' },
      { icon: Warning, name: 'Incident reports', body: 'One workflow from event to report to notification chain. You document once. The system routes, flags, and distributes.' },
      { icon: ShieldCheck, name: 'Compliance documentation', body: 'One pass satisfies accreditation, licensing, and payer requirements. What you document doing your job is what the auditor sees.' },
    ],
    build: 'Q15 rounds and orthostatic vitals are already in the marketplace, ready to take.',
    closing: { headline: 'See the workflow built around a behavioral health shift.', body: 'Walk through the tools with someone who knows what a residential nursing shift looks like.' },
  },
  {
    slug: 'for-admissions',
    nav: 'Admissions',
    title: 'For Admissions',
    headline: 'Empty beds are a revenue crisis. Treat your pipeline like one.',
    sub: 'Most admissions teams run referrals in spreadsheets or sales CRMs never built for intake. Our CRM was built for this workflow.',
    image: 'images/heroes/for-admissions.jpg',
    alt: 'An admissions director on a call with a family',
    pains: [
      { icon: Buildings, heading: 'Census pressure', body: 'Census visibility needs to be real-time. Not a phone call to the charge nurse at 5pm.' },
      { icon: PhoneX, heading: 'Lost referrals', body: 'A referral lands on a sticky note. The family calls back and nobody knows the history. That family finds another facility.' },
      { icon: EyeSlash, heading: 'Referral source blindness', body: "Which therapists, hospitals, and school districts send you patients? If you can't answer in 30 seconds, your outreach is a guess." },
      { icon: PuzzlePiece, heading: 'Generic CRM mismatch', body: 'Sales CRMs were built for closing deals. Admissions is inquiry, screening, authorization, admission. Different stakes.' },
    ],
    features: [
      { icon: UserPlus, name: 'CRM built for intake', body: 'One pipeline from inquiry to admission. It tracks families in crisis, not sales contacts.' },
      { icon: UsersThree, name: 'Referral network', body: "Referral sources, relationship history, and conversion rates in one place. Know who's sending patients and who needs a call." },
      { icon: ChartBar, name: 'Census tracking', body: "Live bed availability and room assignments. When a family asks if there's space, your team can answer." },
      { icon: Signature, name: 'E-signature agreements', body: 'Admission packets and consents signed on any device. The signed PDF files itself to the record.' },
    ],
    build: 'An admissions dashboard is free in the marketplace. Or describe the report you want and build it.',
    closing: { headline: 'See the admissions workflow built for your program.', body: 'Walk through the intake pipeline with someone who knows what a referral call looks like.' },
  },
  {
    slug: 'for-executives',
    nav: 'Executives',
    title: 'For Executives',
    headline: 'Your program runs in real time. Your data should too.',
    sub: "Payers want outcomes. Accreditors want proof, not binders. BlueStep gives leaders live operational data and compliance documentation that doesn't cost a weekend.",
    image: 'images/heroes/for-executives.jpg',
    alt: 'Leaders reviewing outcome charts',
    pains: [
      { icon: Clock, heading: 'Lagged visibility', body: "By the time the spreadsheet is compiled, the data is a week old. You're managing today on last week's information." },
      { icon: PresentationChart, heading: 'Outcomes reporting burden', body: 'Payers want outcomes. Accreditors want quality metrics. The state wants incident data. Your team stitches it together every cycle.' },
      { icon: ShieldWarning, heading: 'Compliance reporting gaps', body: "You know your program is compliant. Can you prove it to a surveyor in 15 minutes? That gap becomes a finding." },
      { icon: EyeSlash, heading: 'Census and revenue opacity', body: "How many beds are open tonight? If the answer takes a phone call and a spreadsheet, that's the problem." },
    ],
    features: [
      { icon: ChartLineUp, name: 'Outcomes monitoring', body: 'Progress surveys, outcome measures, and post-discharge follow-up, tied to the clinical record.' },
      { icon: ShieldCheck, name: 'Compliance reporting', body: 'Accreditation-ready reports, incident trends, and state extracts from one source of truth.' },
      { icon: PresentationChart, name: 'Operational dashboards', body: 'Census, pipeline, staffing, and outcomes. Live, not last week\'s export.' },
    ],
    build: 'Want a report nobody sells? On Blueprint your team describes it and has it the same day.',
    closing: { headline: 'See the visibility your program has been missing.', body: "Talk to someone who has managed the same reporting pressures you're navigating." },
  },
  {
    slug: 'for-referring-professionals',
    nav: 'Referring Professionals',
    title: 'For Referring Professionals',
    headline: 'You guide families through the hardest decision of their lives.',
    sub: "Your tools should carry the whole journey: assessment, placement, and every step after. Ours hands a student's full record straight to the programs you trust.",
    image: 'images/heroes/demo.jpg',
    alt: 'An educational consultant working on a laptop',
    pains: [
      { icon: NotePencil, heading: 'Chasing signatures on paper', body: 'Engagement letters still go out as PDFs to print, sign, scan, and send back. A week of follow-up for one signature.' },
      { icon: FolderOpen, heading: 'Drowning in documents', body: 'Evaluations, applications, records, call notes. Finding one detail months later means re-reading the whole file.' },
      { icon: ArrowsClockwise, heading: 'Every referral, re-keyed', body: 'The receiving program needs the whole picture. Today that means re-typing it and re-attaching everything.' },
      { icon: SquaresFour, heading: 'Tools that fight the work', body: 'Sales CRMs assume a one-and-done deal. Your work is a long relationship with many placements.' },
    ],
    features: [
      { icon: ArrowsLeftRight, name: 'One-click referral', body: "Refer a student and the full file lands in the program's BlueStep system. You choose what's included. Personal notes stay yours." },
      { icon: Signature, name: 'Sign without the paper chase', body: 'Parents sign on their phone, you countersign, and the audit-trailed PDF files itself to the family record.' },
      { icon: Buildings, name: 'A program directory', body: 'A searchable library of programs across the country, with your own private ratings and tour notes on top.' },
      { icon: Sparkle, name: 'BlueIQ for the whole file', body: 'A summary, an organized profile, and cited answers from a student\'s documents. Dictate a note and it is filed for review.' },
      { icon: DownloadSimple, name: 'Live on day one', body: 'Your clients, documents, and notes come across in the first day or two of onboarding.' },
      { icon: MapTrifold, name: 'Built for the whole journey', body: 'One family, one record, and a timeline of every placement, however long the journey runs.' },
    ],
    build: 'Priced per user: $25 a month, plus $15 for BlueIQ.',
    closing: { headline: 'See it built for the way you place.', body: 'Talk to someone who understands the placement world. Not a sales rep with a feature list.' },
  },
]
