import { Link } from 'react-router-dom'
import { ArrowRight, Check, Code, Lifebuoy, Quotes as QuoteIcon, ShieldCheck, Stack, Timer } from '@phosphor-icons/react'
import { PLANS, usd } from '../data/pricing'
import { CTA } from '../site'
import { ClosingCTA, Container, Heading, OnAccentButton, Reveal, asset, useTitle } from '../ui'

// The homepage is a fork: two ways to run the same EHR. Each panel leads into its
// own hub (/full-service and /build), where the detail lives. Below it, one record
// across the stay, by role.

const CLIENTS = [
  { name: 'Alpine Academy', file: 'alpine-academy.svg' },
  { name: 'Ascent Behavioral Health', file: 'ascent-behavioral-health.png' },
  { name: 'Telos Academy', file: 'telos-academy.png' },
  { name: 'Velocity Health Group', file: 'velocity-health-group.png' },
  { name: 'Havenwood Academy', file: 'havenwood-academy.png' },
  { name: 'Engage Transitions', file: 'engage-transitions.svg' },
  { name: 'Center for Change', file: 'center-for-change.svg' },
  { name: 'Kaizen Academy', file: 'kaizen-academy.png' },
  { name: 'Kolob Canyon', file: 'kolob-canyon.png' },
  { name: 'Moonridge Academy', file: 'moonridge-academy.png' },
  { name: 'Mountain Springs Preparatory Academy', file: 'mountain-springs-academy.png' },
  { name: 'La Europa Academy', file: 'la-europa-academy.png' },
  { name: 'Mountain Valley Treatment Center', file: 'mountain-valley.png' },
  { name: 'New Focus Academy', file: 'new-focus-academy.png' },
  { name: 'ScenicView Academy', file: 'scenicview-academy.png' },
]

const price = (id: string) => usd(PLANS.find((p) => p.id === id)!.price)

const COMPARE: [string, string, string][] = [
  ['Who changes it', 'Our team, when you ask', 'Your team, whenever you want'],
  ['How changes get made', 'Feature requests to BlueStep', 'Your own AI tools, on the platform'],
  ['Getting started', 'Configured and trained by us', 'Blueprint (the full suite) or Slate (a blank slate)'],
  ['Support', 'Clinical, training, and technical', 'Technical. Build help is hourly.'],
  ['New features', 'Built and rolled out by us', 'Take them from the marketplace'],
  ['Updates', 'Automatic', 'You choose what to install'],
  ['Starting price', `${price('full-service')} per program / month`, `Blueprint ${price('builder')} per program / month, or Slate ${price('blank-slate')} flat`],
]

function Hero() {
  return (
    <section className="relative overflow-hidden" data-track-section="home-hero">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[460px] bg-[radial-gradient(50%_60%_at_50%_0%,rgb(var(--accent)/0.10),transparent_70%)]"
      />
      <Container className="relative pb-20 pt-12 md:pt-16">
        <div className="rise mx-auto max-w-4xl text-center">
          <h1 className="text-balance text-[2.6rem] font-semibold leading-[1.03] tracking-tightest sm:text-6xl lg:text-[4.2rem]">
            One EHR. Two ways to run it.
          </h1>
          <p className="prose-body mx-auto mt-6 max-w-[52ch]">
            Built for behavioral health. Let our team run it for you, or build on it yourself with the AI tools
            you already use.
          </p>
        </div>
        <Paths />
      </Container>
    </section>
  )
}

// One stay, four roles. Each card is a scene from that role's page and links to it.
const STAY = [
  { role: 'Admissions', href: '/for-admissions', pain: 'A family calls back Thursday.', change: 'Whoever answers sees every call, the stage, and who owns the next step.' },
  { role: 'Clinical', href: '/for-clinicians', pain: 'The same picture gets written three times a week.', change: 'The session note feeds the weekly summary and the utilization review.' },
  { role: 'Nursing', href: '/for-nurses', pain: 'A med pass, a PRN, and an incident in one hour.', change: 'All three go in the same record, from the same screen.' },
  { role: 'Leadership', href: '/for-executives', pain: 'How many beds are open tonight?', change: 'Census, pipeline, and outcomes are on one live screen.' },
]

function Stay() {
  return (
    <section className="py-24 md:py-32">
      <Container>
        <Heading
          title="Every part of the stay, in one record."
          sub="Admissions, clinical, nursing, and leadership work from the same database. Nothing gets entered twice."
        />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {STAY.map((s, i) => (
            <Reveal key={s.role} delay={i * 60}>
              <Link to={s.href} className="card group flex h-full flex-col p-7 transition-colors hover:border-faint">
                <p className="text-sm font-medium text-accent">{s.role}</p>
                <h3 className="mt-6 text-lg font-semibold leading-snug tracking-tight">{s.pain}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{s.change}</p>
                <ArrowRight size={16} weight="bold" className="mt-auto pt-6 text-faint transition group-hover:text-accent" />
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}

function Paths() {
  return (
        <div className="mt-14 grid gap-4 lg:grid-cols-2" data-track-section="home-fork">
          <Reveal>
            <article className="card flex h-full flex-col overflow-hidden">
              <img
                src={asset('images/heroes/teen-session.jpg')}
                alt="A counselor in a one-on-one session with a teenager"
                className="aspect-[16/8] w-full object-cover"
              />
              <div className="flex flex-1 flex-col p-8 md:p-10">
                <p className="flex items-center gap-2 text-sm font-medium text-accent">
                  <Lifebuoy size={18} weight="bold" />
                  Full-service
                </p>
                <h2 className="mt-3 text-3xl font-semibold leading-tight tracking-tightest md:text-4xl">
                  We run it. You run your program.
                </h2>
                <ul className="mt-6 space-y-3">
                  {['Configured for your program by our team', 'Clinical onboarding and training for every role', 'A person who knows your program by name'].map((b) => (
                    <li key={b} className="flex gap-3 text-[15px]">
                      <Check size={18} weight="bold" className="mt-0.5 shrink-0 text-accent" />
                      {b}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto flex flex-wrap items-center gap-3 pt-9">
                  <Link to={CTA.fullService.href} className="btn-primary group">
                    {CTA.fullService.label}
                    <ArrowRight size={16} weight="bold" className="transition-transform group-hover:translate-x-0.5" />
                  </Link>
                  <span className="text-sm text-muted">From {price('full-service')} per program / month</span>
                </div>
                <Link
                  to="/full-service#concierge"
                  className="mt-6 inline-flex items-center gap-1.5 border-t border-line pt-5 text-sm text-muted transition-colors hover:text-ink"
                >
                  Need a system of your own? <span className="font-medium text-accent">Concierge</span>
                  <ArrowRight size={14} weight="bold" className="text-accent" />
                </Link>
              </div>
            </article>
          </Reveal>

          <Reveal delay={100}>
            <article className="panel-dark relative flex h-full flex-col overflow-hidden rounded-2xl">
              <div className="relative aspect-[16/8] w-full overflow-hidden">
                <img
                  src={asset('images/heroes/builder-cafe.jpg')}
                  alt="A builder working on a sticker-covered laptop in a cafe"
                  className="h-full w-full object-cover opacity-55"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0e1116] to-transparent dark:from-[#151a22]" />
                <span className="absolute right-5 top-5 rounded-full bg-[#1263a8] px-2.5 py-1 text-xs font-semibold text-white">
                  New
                </span>
              </div>
              <div className="flex flex-1 flex-col p-8 md:p-10">
                <p className="flex items-center gap-2 text-sm font-medium text-[#60a5eb]">
                  <Code size={18} weight="bold" />
                  Build
                </p>
                <h2 className="mt-3 text-3xl font-semibold leading-tight tracking-tightest md:text-4xl">
                  Our EHR. Yours to change.
                </h2>
                <ul className="mt-6 space-y-3">
                  {['Blueprint: the full suite, ready to build on', 'Slate: a blank slate to build anything', 'Describe a change. Your AI builds it the same day.'].map((b) => (
                    <li key={b} className="flex gap-3 text-[15px] opacity-90">
                      <Check size={18} weight="bold" className="mt-0.5 shrink-0 text-[#60a5eb]" />
                      {b}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto flex flex-wrap items-center gap-3 pt-9">
                  <Link to={CTA.how.href} className="btn group bg-white text-[#0e1116] hover:bg-white/90">
                    {CTA.how.label}
                    <ArrowRight size={16} weight="bold" className="transition-transform group-hover:translate-x-0.5" />
                  </Link>
                  <span className="text-sm opacity-70">
                    Blueprint {price('builder')} per program / month. Slate {price('blank-slate')} flat.
                  </span>
                </div>
              </div>
            </article>
          </Reveal>
        </div>
  )
}

function Clients() {
  return (
    <section aria-label="Programs running on BlueStep" className="border-y border-line bg-surface">
      {/* Too many logos for one row, so they scroll. The list renders twice so the loop is
          seamless; the copy is hidden from screen readers. */}
      <div className="marquee py-10">
        <div className="marquee-track">
          {[0, 1].map((copy) => (
            <ul key={copy} aria-hidden={copy === 1 || undefined} className="flex shrink-0 items-center gap-x-14 pr-14">
              {CLIENTS.map((c) => (
                <li key={c.name} className="shrink-0">
                  <img
                    src={asset(`images/logos/${c.file}`)}
                    alt={copy === 0 ? c.name : ''}
                    className="h-12 w-auto max-w-[200px] object-contain opacity-60 grayscale transition duration-300 hover:opacity-100 hover:grayscale-0 dark:opacity-75 dark:invert dark:hover:grayscale"
                  />
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  )
}

// Client quotes, verbatim. One quote renders as a single featured card; add more and
// they fall into a grid.
const QUOTES = [
  {
    quote:
      "Bluestep has been a game-changer for our organization. The CRM, research capabilities, and quality of the EHR are unsurpassed. It is extremely customizable, and the team is always innovating. We have built so many systems around it that I don't know what we would do without it.",
    name: 'Tony Mosier',
    title: 'COO, Telos Companies',
    logo: 'telos-academy.png',
  },
]

function Quotes() {
  const single = QUOTES.length === 1
  return (
    <section className="border-y border-line bg-surface py-24 md:py-32" data-track-section="home-quotes">
      <Container>
        <Heading title="In their words." sub="What the people running programs on BlueStep say about it." />
        <div className={`mt-12 grid gap-4 ${single ? 'max-w-4xl' : 'md:grid-cols-2 lg:grid-cols-3'}`}>
          {QUOTES.map((q, i) => (
            <Reveal key={q.name} delay={i * 70}>
              <figure className={`card flex h-full flex-col ${single ? 'p-8 md:p-12' : 'p-7'}`}>
                <QuoteIcon size={single ? 36 : 28} weight="fill" className="text-accent" aria-hidden />
                <blockquote
                  className={`mt-6 font-medium leading-relaxed tracking-tight ${single ? 'text-xl md:text-2xl' : 'text-lg'}`}
                >
                  “{q.quote}”
                </blockquote>
                <figcaption className="mt-auto flex items-center gap-4 border-t border-line pt-6">
                  <img
                    src={asset(`images/logos/${q.logo}`)}
                    alt=""
                    aria-hidden
                    className="h-10 w-auto max-w-[120px] object-contain opacity-70 grayscale dark:invert"
                    loading="lazy"
                  />
                  <div>
                    <p className="font-semibold">{q.name}</p>
                    <p className="text-sm text-muted">{q.title}</p>
                  </div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}

function Compare() {
  return (
    <section className="py-24 md:py-32">
      <Container className="max-w-5xl">
        <Heading title="Side by side." sub="Same platform, same record, same security. The difference is who makes the changes." />
        <div className="mt-12 overflow-x-auto rounded-2xl border border-line">
          <table className="w-full min-w-[620px] border-collapse text-left text-[15px]">
            <thead>
              <tr className="bg-surface">
                <th scope="col" className="w-[28%] px-6 py-4 text-sm font-medium text-muted" />
                <th scope="col" className="px-6 py-4 font-semibold">
                  <Link to="/full-service" className="hover:text-accent">Full-service</Link>
                </th>
                <th scope="col" className="px-6 py-4 font-semibold">
                  <Link to="/build" className="hover:text-accent">Build</Link>
                </th>
              </tr>
            </thead>
            <tbody>
              {COMPARE.map(([k, a, b]) => (
                <tr key={k} className="border-t border-line">
                  <th scope="row" className="px-6 py-4 text-sm font-medium text-muted">{k}</th>
                  <td className="px-6 py-4">{a}</td>
                  <td className="px-6 py-4">{b}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-5 text-sm text-muted">
          Programs can switch paths as their team changes. <Link to="/pricing" className="text-accent">See full pricing</Link>
        </p>
      </Container>
    </section>
  )
}

function EitherWay() {
  const items = [
    { icon: Timer, t: '15 years in behavioral health', b: 'BlueStep has run residential programs for 15 years: the documentation, the audits, and the shift handoffs.' },
    { icon: Stack, t: 'One record', b: 'EHR, CRM, Outcomes, and BlueIQ share one database. Admissions data is in the chart on day one.' },
    { icon: ShieldCheck, t: 'HIPAA-ready hosting and a BAA', b: 'On every plan. Every change is logged, and any earlier version can be restored.' },
  ]
  return (
    <section className="border-y border-line bg-surface py-24 md:py-32">
      <Container>
        <Heading title="Either way, you get the same foundation." />
        <div className="mt-12 grid gap-10 md:grid-cols-3">
          {items.map((it, i) => (
            <Reveal key={it.t} delay={i * 70}>
              <it.icon size={28} className="text-accent" />
              <h3 className="mt-6 text-lg font-semibold tracking-tight">{it.t}</h3>
              <p className="mt-2 leading-relaxed text-muted">{it.b}</p>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}

function Origin() {
  return (
    <section className="py-24 md:py-32">
      <Container className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <Reveal>
          <img
            src={asset('images/heroes/about.jpg')}
            alt="Two staff members in conversation at a treatment program"
            className="aspect-[4/3] w-full rounded-2xl object-cover"
            loading="lazy"
          />
        </Reveal>
        <Reveal delay={100}>
          <h2 className="text-3xl font-semibold leading-[1.1] tracking-tightest md:text-5xl">
            We know how programs run.
          </h2>
          <p className="prose-body mt-6 max-w-[52ch]">
            Members of our team started in residential treatment, in direct care and program leadership. Most of what
            we build starts with a problem a program brought to us.
          </p>
        </Reveal>
      </Container>
    </section>
  )
}

export default function Home() {
  useTitle()
  return (
    <>
      <Hero />
      <Clients />
      <Stay />
      <Quotes />
      <Compare />
      <EitherWay />
      <Origin />
      <ClosingCTA title="Not sure which path fits?" sub="Tell us how your program runs today. We'll tell you honestly which one we'd pick.">
        <OnAccentButton to={CTA.demo.href} solid>
          {CTA.demo.label}
        </OnAccentButton>
        <OnAccentButton to={CTA.pricing.href}>{CTA.pricing.label}</OnAccentButton>
      </ClosingCTA>
    </>
  )
}
