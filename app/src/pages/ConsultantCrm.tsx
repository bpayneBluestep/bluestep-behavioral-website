import { Link } from 'react-router-dom'
import {
  AddressBook,
  ArrowRight,
  ArrowsClockwise,
  Check,
  Gift,
  MagnifyingGlass,
  Microphone,
  NotePencil,
  SealCheck,
  Sparkle,
  Star,
} from '@phosphor-icons/react'
import BlueIqDemo from '../components/BlueIqDemo'
import { REFERRAL } from '../data/pricing'
import { CTA } from '../site'
import { Button, ClosingCTA, Container, OnAccentButton, Reveal, asset, useTitle } from '../ui'

// The Consultant CRM (EC-CRM) is its own product, sold self-serve at /signup. This page is
// what the product does; /for-referring-professionals is who it's for and the problems it solves.
// It follows the shared product-page layout (ProductPage.tsx), plus two dedicated sections for
// the biggest selling points: BlueIQ (an animated demo, components/BlueIqDemo.tsx) and the
// Program Directory. Screenshots are the real app
// (gitsites/ec-crm-gitsite) running on invented data: every family, program, and consultant
// shown is fictional.

const img = (name: string) => asset(`images/consultant-crm/${name}.jpg`)

/** A screenshot in a light window frame. */
function Shot({ src, alt, className = '' }: { src: string; alt: string; className?: string }) {
  return (
    <div
      className={`overflow-hidden rounded-xl border border-line bg-surface shadow-[0_30px_60px_-30px_rgb(0_0_0/0.35)] ${className}`}
    >
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
    <div
      className={`overflow-hidden rounded-[2rem] border-[6px] border-[#1f2530] bg-[#1f2530] shadow-[0_30px_60px_-25px_rgb(0_0_0/0.6)] ${className}`}
    >
      <img src={src} alt={alt} loading="lazy" width={585} height={1266} className="block w-full rounded-[1.6rem]" />
    </div>
  )
}

// Same shape as a ProductSection in data/products.ts.
const SECTIONS = [
  {
    id: 'caseload',
    heading: 'Every family, from first call to alumni',
    pain: 'Inquiries, active clients, and alumni live in one list. When a family moves forward, one click moves the record, and nothing is left behind.',
    bullets: [
      'Search your whole caseload by name, location, email, or phone',
      'Move a record from inquiry to client to alumni, and back if you need to',
      'A dashboard with the pipeline, overdue tasks, and recent activity',
      'Priorities, due dates, and overdue flags on every family',
    ],
  },
  {
    id: 'record',
    heading: 'The whole story, in one place',
    pain: 'Every call, email, text, and meeting is logged on the family with who it was with. Contacts, tasks, files, and the parent application sit right beside it.',
    bullets: [
      'Log calls, emails, texts, video calls, meetings, and notes. Who and when is stamped automatically.',
      'Parents, guardians, therapists, and schools on each record',
      'Connect Gmail or Outlook and send from inside the record. Every email logs itself.',
      'Files in folders like a drive, plus a parent application you design',
    ],
  },
  {
    id: 'referrals',
    heading: 'Referrals, including the ones that fall through',
    pain: 'Each referral follows the real path a placement takes, from considering a program to enrollment. When one falls through, you record why, and your dashboard shows the patterns.',
    bullets: [
      'Statuses from Considering and Pre-screening through Waitlisted, Accepted, and Enrolled',
      'Decline reasons you can edit: clinical fit, no bed, insurance, cost, and more',
      'Referral win rate and top destinations on your dashboard',
    ],
  },
  {
    id: 'agreements',
    heading: 'Agreements signed on a phone, not a scanner',
    pain: 'E-signature is built in. Send a packet, and parents sign from their phone. You countersign, and the signed copies file themselves to the family.',
    bullets: [
      'Templates and packets: place the fields once, send every agreement in one envelope',
      'Emailed links locked behind a six-digit code you share separately',
      'Signing order, automatic reminders, and an expiration you choose',
      'Hash-chained, tamper-evident record with a certificate of completion',
    ],
  },
]

const IQ = [
  {
    icon: Sparkle,
    t: 'Answers from your own records',
    b: 'Families, referrals, programs, ratings, tour notes, and files. Not the internet.',
  },
  {
    icon: MagnifyingGlass,
    t: 'Compares programs for you',
    b: 'Cost, length of stay, insurance, and fit, weighed against the client in front of you.',
  },
  {
    icon: NotePencil,
    t: "Reads what's on file",
    b: 'Ask about an evaluation, an agreement, or a transcript and it answers from the document.',
  },
  {
    icon: Microphone,
    t: 'Dictate on the drive home',
    b: 'Talk through a tour or a call. It drafts the note and the follow-up tasks for you to review.',
  },
]

const DIRECTORY = [
  'Search by level of care, specialty, modality, age, gender, insurance, and region',
  'Rate programs one to five stars and keep a private summary',
  'Tour notes with the date and whether you visited in person',
  'Files and contacts on each program, in folders like a drive',
  'Every client you referred there, and how it turned out',
  'Your ratings and notes stay private to you',
]

const LISTINGS = [
  { icon: Gift, t: 'Free for every program', b: 'Programs list for free, so the directory keeps growing.' },
  {
    icon: ArrowsClockwise,
    t: 'Updated by the program',
    b: 'Admissions teams keep their own specialties, ages, levels of care, and contacts current.',
  },
  {
    icon: SealCheck,
    t: 'Verified and dated',
    b: 'A listing the program has confirmed shows a verified badge with the date of its last update.',
  },
]

export default function ConsultantCrm() {
  useTitle('Consultant CRM')
  return (
    <>
      <section className="border-b border-line">
        <Container className="grid items-center gap-12 pb-16 pt-12 md:pt-16 lg:grid-cols-[1fr_1.1fr] lg:gap-14 lg:pb-24">
          <div className="rise">
            <p className="mb-5 flex items-center gap-2 text-sm font-medium text-accent">
              <AddressBook size={18} weight="bold" />
              Consultant CRM
            </p>
            <h1 className="text-4xl font-semibold leading-[1.05] tracking-tightest md:text-[3.4rem]">
              The CRM built for placing students, not closing deals.
            </h1>
            <p className="prose-body mt-6 max-w-[52ch]">
              Families, referrals, agreements, and a live directory of programs, in one workspace made for educational
              consultants. Then ask BlueIQ anything about all of it. Sign up online, and we bring your caseload over for
              you.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Button to="/signup" arrow>
                Sign up now
              </Button>
              <Link to="/pricing#referring-professionals" className="px-2 text-sm text-muted hover:text-ink">
                ${REFERRAL.perSeat} per user / month
              </Link>
            </div>
          </div>
          <Shot
            src={img('dashboard')}
            alt="The Consultant CRM dashboard: active clients, inquiries, alumni, overdue tasks, referral win rate, and upcoming tasks"
            className="rise [animation-delay:120ms]"
          />
        </Container>
      </section>

      <section
        id="blueiq"
        className="panel-dark scroll-mt-20 overflow-hidden py-24 md:py-32 dark:border-x-0"
        data-track-section="consultant-crm-blueiq"
      >
        <Container>
          <Reveal className="max-w-3xl">
            <p className="mb-4 font-mono text-xs uppercase tracking-[0.14em] text-[#60a5eb]">
              BlueIQ · ${REFERRAL.blueIqPerSeat} per user
            </p>
            <h2 className="text-3xl font-semibold leading-[1.1] tracking-tightest md:text-5xl">
              Ask anything about your caseload. It already knows.
            </h2>
            <p className="mt-5 max-w-[56ch] text-base leading-relaxed opacity-75 md:text-lg">
              BlueIQ reads your families, referrals, programs, notes, and files, so you can ask a question the way you'd
              ask a colleague and get an answer from your own work. No digging through records, no re-reading tour notes
              from last spring.
            </p>
          </Reveal>
          <Reveal className="mt-14">
            <BlueIqDemo />
          </Reveal>
          <div className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
            {IQ.map((f, i) => (
              <Reveal key={f.t} delay={i * 50} className="bg-[#0e1116] p-7 dark:bg-[#151a22]">
                <f.icon size={24} className="text-[#60a5eb]" />
                <h3 className="mt-6 font-semibold">{f.t}</h3>
                <p className="mt-2 text-sm leading-relaxed opacity-70">{f.b}</p>
              </Reveal>
            ))}
          </div>
          <p className="mt-8 text-sm opacity-60">Nothing BlueIQ drafts is saved until you review it.</p>
        </Container>
      </section>

      <section className="py-20 md:py-28">
        <Container className="grid gap-14 lg:grid-cols-[240px_1fr] lg:gap-20">
          <nav aria-label="Consultant CRM sections" className="hidden lg:block">
            <ul className="sticky top-28 space-y-1 border-l border-line">
              {SECTIONS.map((s) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className="-ml-px block border-l border-transparent py-1.5 pl-4 text-sm text-muted hover:border-accent hover:text-ink"
                  >
                    {s.heading}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="space-y-20">
            {SECTIONS.map((s) => (
              <Reveal key={s.id} id={s.id} className="scroll-mt-24">
                <div data-track-section={`consultant-crm-${s.id}`}>
                  <h2 className="text-2xl font-semibold tracking-tight md:text-4xl md:tracking-tightest">
                    {s.heading}
                  </h2>
                  <p className="prose-body mt-4 max-w-[60ch]">{s.pain}</p>
                  <ul className="mt-7 grid gap-3 md:grid-cols-2">
                    {s.bullets.map((b) => (
                      <li key={b} className="card flex gap-3 p-5 text-[15px] leading-relaxed">
                        <Check size={18} weight="bold" className="mt-0.5 shrink-0 text-accent" />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section
        id="programs"
        className="scroll-mt-20 border-y border-line bg-surface py-24 md:py-28"
        data-track-section="consultant-crm-programs"
      >
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <Reveal>
              <p className="kicker mb-4">Program directory</p>
              <h2 className="text-3xl font-semibold leading-[1.1] tracking-tightest md:text-[2.6rem]">
                Every program, with your own notes on top.
              </h2>
              <p className="prose-body mt-5 max-w-[48ch]">
                Search a shared directory of treatment programs, then make it yours: rate them, log your tours, keep
                your files, and see how every placement there turned out.
              </p>
            </Reveal>
            <Reveal delay={80}>
              <Shot
                src={img('program')}
                alt="A program in the directory with the consultant's five-star rating and private summary"
              />
            </Reveal>
          </div>
          <ul className="mt-14 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {DIRECTORY.map((d) => (
              <li key={d} className="card flex gap-3 p-5 text-[15px] leading-relaxed">
                <Check size={18} weight="bold" className="mt-0.5 shrink-0 text-accent" />
                {d}
              </li>
            ))}
          </ul>
          <Reveal className="mt-14 rounded-2xl bg-accent-soft p-8 md:p-10">
            <div className="grid gap-10 lg:grid-cols-[1fr_1.6fr] lg:gap-14">
              <div>
                <h3 className="text-2xl font-semibold tracking-tight">Kept up to date by the programs themselves.</h3>
                <p className="mt-3 leading-relaxed text-muted">
                  Programs claim and manage their own listings, so what you see is what admissions says today, not a
                  spreadsheet from two years ago.
                </p>
                <Link
                  to="/program-directory"
                  className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-accent"
                >
                  How program listings work
                  <ArrowRight size={16} weight="bold" />
                </Link>
              </div>
              <div className="grid gap-8 sm:grid-cols-3">
                {LISTINGS.map((l) => (
                  <div key={l.t}>
                    <l.icon size={24} className="text-accent" />
                    <h4 className="mt-4 font-semibold">{l.t}</h4>
                    <p className="mt-2 text-sm leading-relaxed text-muted">{l.b}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="panel-dark overflow-hidden py-20 md:py-24 dark:border-x-0">
        <Container className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <h2 className="text-3xl font-semibold leading-[1.1] tracking-tightest md:text-5xl">
              Parents sign from wherever they are.
            </h2>
            <p className="mt-5 max-w-[46ch] text-base leading-relaxed opacity-75 md:text-lg">
              They adopt a signature once and tap through each field, or sign in person on your device. No printer, no
              scanner, no chasing.
            </p>
          </Reveal>
          <Reveal delay={80} className="flex justify-center gap-5 sm:gap-8">
            <Phone
              src={img('sign-adopt')}
              alt="A parent adopting a signature on a phone"
              className="w-[44%] max-w-[230px] translate-y-4"
            />
            <Phone
              src={img('sign-done')}
              alt="A signed agreement on a phone with every required field complete"
              className="w-[44%] max-w-[230px] -translate-y-2"
            />
          </Reveal>
        </Container>
      </section>

      <section className="py-20" data-track-section="consultant-crm-pricing">
        <Container className="grid gap-4 lg:grid-cols-[1.15fr_1fr]">
          <Reveal className="card p-8 md:p-10">
            <p className="kicker">Pricing</p>
            <p className="mt-5 text-6xl font-semibold tracking-tightest">
              ${REFERRAL.perSeat}
              <span className="text-base font-normal text-muted"> / user / month</span>
            </p>
            <p className="mt-4 max-w-[46ch] leading-relaxed text-muted">
              Everything on this page, for every consultant in your practice. Add BlueIQ for ${REFERRAL.blueIqPerSeat}{' '}
              per user. We bring your clients, documents, and notes over for you.
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
