import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight,
  Certificate,
  Check,
  ClipboardText,
  ClockCounterClockwise,
  DeviceMobile,
  EnvelopeSimple,
  FolderOpen,
  ListChecks,
  LockKey,
  Palette,
  ShieldCheck,
  Star,
  UsersThree,
} from '@phosphor-icons/react'
import { REFERRAL } from '../data/pricing'
import { CTA } from '../site'
import { Button, ClosingCTA, Container, Heading, OnAccentButton, Reveal, asset, useTitle } from '../ui'

// The Consultant CRM (EC-CRM) is its own product, sold self-serve at /signup. This page is
// what the product does; /for-referring-professionals is who it's for and the problems it solves.
// Screenshots are the real app (gitsites/ec-crm-gitsite) running on invented data: every
// family, program, and consultant shown is fictional.

const img = (name: string) => asset(`images/consultant-crm/${name}.jpg`)

/** A screenshot in a light window frame. */
function Shot({ src, alt, className = '' }: { src: string; alt: string; className?: string }) {
  return (
    <div className={`overflow-hidden rounded-xl border border-line bg-surface shadow-[0_30px_60px_-30px_rgb(0_0_0/0.35)] ${className}`}>
      <div className="flex items-center gap-1.5 border-b border-line bg-raised px-4 py-2.5" aria-hidden>
        <span className="h-2.5 w-2.5 rounded-full bg-line" />
        <span className="h-2.5 w-2.5 rounded-full bg-line" />
        <span className="h-2.5 w-2.5 rounded-full bg-line" />
      </div>
      <img src={src} alt={alt} loading="lazy" width={1600} height={1000} className="block w-full" />
    </div>
  )
}

/** A screenshot of the phone signing view. */
function Phone({ src, alt, className = '' }: { src: string; alt: string; className?: string }) {
  return (
    <div className={`overflow-hidden rounded-[2rem] border-[6px] border-[#1f2530] bg-[#1f2530] shadow-[0_30px_60px_-25px_rgb(0_0_0/0.6)] ${className}`}>
      <img src={src} alt={alt} loading="lazy" width={585} height={1266} className="block w-full rounded-[1.6rem]" />
    </div>
  )
}

function Points({ items }: { items: string[] }) {
  return (
    <ul className="mt-7 space-y-3">
      {items.map((t) => (
        <li key={t} className="flex gap-3 text-[15px] leading-relaxed">
          <Check size={18} weight="bold" className="mt-0.5 shrink-0 text-accent" />
          {t}
        </li>
      ))}
    </ul>
  )
}

/** Text beside a screenshot, alternating sides down the page. */
function Feature({
  id,
  kicker,
  title,
  body,
  points,
  shot,
  flip = false,
}: {
  id: string
  kicker: string
  title: string
  body: string
  points: string[]
  shot: ReactNode
  flip?: boolean
}) {
  return (
    <section id={id} className="scroll-mt-20 py-16 md:py-24" data-track-section={`consultant-crm-${id}`}>
      <Container className="grid items-center gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16">
        <Reveal className={flip ? 'lg:order-2' : ''}>
          <p className="kicker mb-4">{kicker}</p>
          <h2 className="text-3xl font-semibold leading-[1.1] tracking-tightest md:text-[2.6rem]">{title}</h2>
          <p className="prose-body mt-5 max-w-[48ch]">{body}</p>
          <Points items={points} />
        </Reveal>
        <Reveal delay={80} className={flip ? 'lg:order-1' : ''}>
          {shot}
        </Reveal>
      </Container>
    </section>
  )
}

const FACTS = [
  ['$' + REFERRAL.perSeat, 'per user, per month'],
  ['Inquiry to alumni', 'one record per family'],
  ['Any phone', 'families sign anywhere'],
  ['Gmail or Outlook', 'email from your own account'],
]

const SIGNING = [
  { icon: ClipboardText, t: 'Templates and packets', b: 'Upload a PDF and place the fields once. Combine every agreement a family needs into one envelope and one signing session.' },
  { icon: DeviceMobile, t: 'Built for the phone', b: 'Parents adopt a signature once and tap through each field. They can finish later, or sign in person on your device.' },
  { icon: LockKey, t: 'Six-digit access codes', b: 'Every emailed link is locked behind a code you share separately. The code is never in the email.' },
  { icon: ClockCounterClockwise, t: 'Order, reminders, expiration', b: 'Signers go in the order you set. Reminders go out every few days, and the envelope expires when you choose.' },
  { icon: Certificate, t: 'Signed copies and a certificate', b: 'Each signed document and a certificate of completion file themselves to the family record.' },
  { icon: ShieldCheck, t: 'Tamper-evident record', b: 'Every step is hash-chained and recorded with its ESIGN consent. One click verifies nothing changed after signing.' },
]

const MORE = [
  { icon: EnvelopeSimple, t: 'Email from your own inbox', b: 'Connect Gmail or Outlook and send from inside the record with templates. Every email logs itself to the family.' },
  { icon: ClipboardText, t: 'A parent application you design', b: 'Build the intake application with conditional questions and file uploads, then send families a secure link.' },
  { icon: FolderOpen, t: 'Files like a drive', b: 'Folders on every family and program, drag-and-drop upload, and the default folders your practice uses.' },
  { icon: ListChecks, t: 'Tasks that keep you honest', b: 'Priorities, due dates, and overdue flags on every family, rolled up on your dashboard.' },
  { icon: UsersThree, t: 'Parents and professionals', b: 'Parents, guardians, therapists, and schools on each record, with the relationships your practice uses.' },
  { icon: Palette, t: 'Your practice, your look', b: 'Your logo and practice name across the workspace, four color schemes, and light or dark mode.' },
]

export default function ConsultantCrm() {
  useTitle('Consultant CRM')
  return (
    <>
      <section className="overflow-hidden border-b border-line">
        <Container className="pb-16 pt-12 md:pt-16">
          <div className="rise mx-auto max-w-3xl text-center">
            <p className="kicker mb-5">Consultant CRM · For educational consultants</p>
            <h1 className="text-4xl font-semibold leading-[1.05] tracking-tightest md:text-6xl">
              The CRM built for placing students, not closing deals.
            </h1>
            <p className="prose-body mx-auto mt-6 max-w-[56ch]">
              Families, referrals, agreements, and the programs you trust, in one workspace made for educational
              consultants. Sign up online, and we bring your caseload over for you.
            </p>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
              <Button to="/signup" arrow>
                Sign up now
              </Button>
              <Button to={CTA.demo.href} variant="ghost">
                {CTA.demo.label}
              </Button>
            </div>
          </div>
          <div className="rise mx-auto mt-14 max-w-6xl [animation-delay:120ms]">
            <Shot
              src={img('dashboard')}
              alt="The Consultant CRM dashboard: active clients, inquiries, alumni, overdue tasks, referral win rate, and upcoming tasks"
            />
          </div>
          <dl className="mx-auto mt-14 grid max-w-5xl grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-4">
            {FACTS.map(([v, l]) => (
              <div key={v} className="bg-surface p-6">
                <dt className="text-xl font-semibold tracking-tight">{v}</dt>
                <dd className="mt-1 text-sm text-muted">{l}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      <Feature
        id="caseload"
        kicker="Caseload"
        title="Every family, from first call to alumni."
        body="Inquiries, active clients, and alumni live in one list. When a family moves forward, one click moves the record, and nothing is left behind."
        points={[
          'Search everyone on your caseload by name, location, email, or phone',
          'Move a record from inquiry to client to alumni, and back if you need to',
          'Your dashboard shows the pipeline, overdue tasks, and recent activity',
        ]}
        shot={<Shot src={img('clients')} alt="The client list with tabs for clients, inquiries, and alumni" />}
      />

      <Feature
        id="record"
        kicker="The family record"
        title="The whole story, in one place."
        body="Every call, email, text, and meeting is logged on the family with who it was with. Contacts, tasks, files, and the parent application sit right beside it."
        points={[
          'Log calls, emails, texts, video calls, meetings, and notes',
          'Who logged it and when is stamped automatically',
          'Contacts for parents, guardians, therapists, and schools',
          'Tasks grouped by status, with priorities and due dates',
        ]}
        shot={<Shot src={img('comms')} alt="A family record showing logged calls, emails, and meetings" />}
        flip
      />

      <Feature
        id="referrals"
        kicker="Referrals"
        title="Track every referral, and learn from the ones that fall through."
        body="Each referral follows the real path a placement takes, from considering a program to enrollment. When one falls through, you record why, and your dashboard shows the patterns."
        points={[
          'Statuses from Considering and Pre-screening through Waitlisted, Accepted, and Enrolled',
          'Decline reasons you can edit: clinical fit, no bed, insurance, cost, and more',
          'Referral win rate, top destinations, and why referrals fall through',
        ]}
        shot={<Shot src={img('referrals')} alt="A student's referrals to four programs with their statuses and a decline reason" />}
      />

      <section
        id="agreements"
        className="panel-dark scroll-mt-20 overflow-hidden py-24 md:py-32 dark:border-x-0"
        data-track-section="consultant-crm-agreements"
      >
        <Container>
          <div className="grid items-center gap-14 lg:grid-cols-[1fr_1fr] lg:gap-16">
            <Reveal>
              <p className="mb-4 font-mono text-xs uppercase tracking-[0.14em] text-[#60a5eb]">Agreements</p>
              <h2 className="text-3xl font-semibold leading-[1.1] tracking-tightest md:text-5xl">
                Engagement letters signed on a phone, not a scanner.
              </h2>
              <p className="mt-5 max-w-[48ch] text-base leading-relaxed opacity-75 md:text-lg">
                E-signature is built in. Send a packet, and parents sign from their phone. You
                countersign, and the signed copies file themselves to the family.
              </p>
            </Reveal>
            <Reveal delay={80} className="flex justify-center gap-5 sm:gap-8">
              <Phone
                src={img('sign-adopt')}
                alt="A parent adopting a signature on a phone"
                className="w-[44%] max-w-[260px] translate-y-6"
              />
              <Phone
                src={img('sign-done')}
                alt="A signed agreement on a phone with every required field complete"
                className="w-[44%] max-w-[260px] -translate-y-2"
              />
            </Reveal>
          </div>
          <div className="mt-20 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
            {SIGNING.map((s, i) => (
              <Reveal key={s.t} delay={i * 50} className="bg-[#0e1116] p-7 dark:bg-[#151a22]">
                <s.icon size={24} className="text-[#60a5eb]" />
                <h3 className="mt-6 font-semibold">{s.t}</h3>
                <p className="mt-2 text-sm leading-relaxed opacity-70">{s.b}</p>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-16">
            <img
              src={img('agreements')}
              alt="An envelope in progress: three documents, one parent signed, the second parent emailed, and the consultant waiting to countersign"
              loading="lazy"
              width={1600}
              height={1000}
              className="w-full rounded-xl border border-white/10"
            />
          </Reveal>
        </Container>
      </section>

      <Feature
        id="programs"
        kicker="Program directory"
        title="A program directory with your notes on top."
        body="Search a shared library of treatment programs by level of care, specialty, age, gender, insurance, and region. Your ratings, tour notes, and files on each program stay private to you."
        points={[
          'Filter by setting, level of care, specialties, modalities, and home state',
          'Rate programs one to five stars and keep a private summary',
          'Tour notes with the date and whether you visited in person',
          'See every client you referred there, and how it turned out',
        ]}
        shot={<Shot src={img('program')} alt="A program in the directory with the consultant's five-star rating and private summary" />}
      />

      <Feature
        id="blueiq"
        kicker={`BlueIQ · $${REFERRAL.blueIqPerSeat} per user`}
        title="Ask about your caseload. Dictate a note on the drive home."
        body="BlueIQ knows your families, your programs, and your notes. Ask a question and it answers from your own records. Talk through a tour or a call, and it drafts the note and the follow-ups for you to review."
        points={[
          'Answers scoped to the family or program you have open',
          'Compares programs on cost, length of stay, insurance, and fit',
          'Reads the documents on file to answer questions about them',
          'Dictated notes become a drafted note plus follow-up tasks. Nothing saves until you review it',
        ]}
        shot={
          <Shot
            src={img('blueiq')}
            alt="BlueIQ answering which programs fit a 15-year-old with trauma and take insurance, citing the consultant's ratings and tour notes"
          />
        }
        flip
      />

      <section className="border-y border-line bg-surface py-24 md:py-28">
        <Container>
          <Heading title="And the rest of your practice." />
          <div className="mt-12 grid gap-x-12 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
            {MORE.map((m, i) => (
              <Reveal key={m.t} delay={i * 50} className="flex gap-5">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent-soft text-accent">
                  <m.icon size={22} />
                </span>
                <div>
                  <h3 className="text-lg font-semibold tracking-tight">{m.t}</h3>
                  <p className="mt-2 leading-relaxed text-muted">{m.b}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-24 md:py-28" data-track-section="consultant-crm-pricing">
        <Container className="grid gap-4 lg:grid-cols-[1.15fr_1fr]">
          <Reveal className="card p-8 md:p-10">
            <p className="kicker">Pricing</p>
            <p className="mt-5 text-6xl font-semibold tracking-tightest">
              ${REFERRAL.perSeat}
              <span className="text-base font-normal text-muted"> / user / month</span>
            </p>
            <p className="mt-4 max-w-[46ch] leading-relaxed text-muted">
              Everything on this page, for every consultant in your practice. Add BlueIQ for ${REFERRAL.blueIqPerSeat} per
              user. We bring your clients, documents, and notes over for you.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Button to="/signup" arrow>
                Sign up now
              </Button>
              <Link to="/pricing#referring-professionals" className="text-sm font-medium text-accent">
                Compare plans
              </Link>
            </div>
          </Reveal>
          <Reveal delay={80}>
            <Link
              to="/for-referring-professionals"
              className="group flex h-full flex-col justify-between rounded-2xl bg-accent-soft p-8 transition hover:brightness-[0.98] md:p-10"
            >
              <Star size={26} weight="fill" className="text-accent" />
              <div className="mt-10">
                <h2 className="text-2xl font-semibold tracking-tight">Why consultants switch.</h2>
                <p className="mt-3 max-w-md leading-relaxed text-muted">
                  The paper chase, the re-keyed referrals, and the sales CRMs that fight the work. See what changes for
                  referring professionals.
                </p>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-accent">
                  BlueStep for referring professionals
                  <ArrowRight size={16} weight="bold" className="transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          </Reveal>
        </Container>
      </section>

      <ClosingCTA
        title="Your whole practice, in one place."
        sub="Sign up online, and we'll set up your workspace and move your clients, documents, and notes across."
      >
        <OnAccentButton to="/signup" solid>
          Sign up now
        </OnAccentButton>
        <OnAccentButton to={CTA.demo.href}>{CTA.demo.label}</OnAccentButton>
      </ClosingCTA>
    </>
  )
}
