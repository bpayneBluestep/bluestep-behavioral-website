import { Link } from 'react-router-dom'
import { ArrowRight, Check, Code, Gift, Lifebuoy, SealCheck, ShieldCheck, Sparkle, Stack, Timer } from '@phosphor-icons/react'
import DirectoryExample from '../components/DirectoryExample'
import { PLANS, usd } from '../data/pricing'
import { CTA, DIRECTORY_URL } from '../site'
import { ClosingCTA, Container, Heading, OnAccentButton, Reveal, asset, useTitle } from '../ui'

// The homepage is a fork: two ways to run the same EHR. Each panel leads into its
// own hub (/full-service and /build), where the detail lives.

const CLIENTS = [
  { name: 'Alpine Academy', file: 'alpine-academy.svg' },
  { name: 'Ascent Behavioral Health', file: 'ascent-behavioral-health.png' },
  { name: 'Telos Academy', file: 'telos-academy.png' },
  { name: 'Velocity Health Group', file: 'velocity-health-group.png' },
]

const price = (id: string) => usd(PLANS.find((p) => p.id === id)!.price)

const COMPARE: [string, string, string][] = [
  ['Who changes it', 'Our team, when you ask', 'Your team, whenever you want'],
  ['How changes get made', 'Feature requests to BlueStep', 'Your own AI tools, on the platform'],
  ['Getting started', 'Configured and trained by us', 'Blueprint (the full suite) or Slate (a blank slate)'],
  ['Support', 'Clinical, training, and technical', 'Technical. Build help is hourly.'],
  ['New features', 'Built and rolled out by us', 'Take them from the marketplace'],
  ['Starting price', `${price('full-service')} per program / month`, `${price('blank-slate')} per program / month`],
]

function Fork() {
  return (
    <section className="relative overflow-hidden" data-track-section="home-fork">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[460px] bg-[radial-gradient(50%_60%_at_50%_0%,rgb(var(--accent)/0.10),transparent_70%)]"
      />
      <Container className="relative pb-20 pt-12 md:pt-16">
        <div className="rise mx-auto max-w-4xl text-center">
          <Link
            to={CTA.directory.href}
            className="group mb-8 inline-flex max-w-full items-center gap-2 rounded-full border border-accent/30 bg-accent-soft py-1.5 pl-1.5 pr-4 text-sm text-ink transition-colors hover:border-accent"
          >
            <span className="rounded-full bg-accent px-2.5 py-0.5 text-xs font-semibold text-accent-ink">Free</span>
            <span className="truncate sm:hidden">List your program in our directory</span>
            <span className="hidden truncate sm:inline">List your program in the BlueStep Program Directory</span>
            <ArrowRight size={14} weight="bold" className="shrink-0 text-accent transition-transform group-hover:translate-x-0.5" />
          </Link>
          <h1 className="text-balance text-[2.6rem] font-semibold leading-[1.03] tracking-tightest sm:text-6xl lg:text-[4.2rem]">
            One EHR. Two ways to run it.
          </h1>
          <p className="prose-body mx-auto mt-6 max-w-[52ch]">
            Built for behavioral health. Let our team run it for you, or build on it yourself with the AI tools
            you already use.
          </p>
        </div>

        <div className="mt-14 grid gap-4 lg:grid-cols-2">
          <Reveal>
            <article className="card flex h-full flex-col overflow-hidden">
              <img
                src={asset('images/heroes/for-clinicians.jpg')}
                alt="A therapist leading a group session"
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
              </div>
            </article>
          </Reveal>

          <Reveal delay={100}>
            <article className="panel-dark relative flex h-full flex-col overflow-hidden rounded-2xl">
              <div className="relative aspect-[16/8] w-full overflow-hidden">
                <img
                  src={asset('images/heroes/demo.jpg')}
                  alt="A program director building on a laptop"
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
                  <span className="text-sm opacity-70">From {price('blank-slate')} per program / month</span>
                </div>
              </div>
            </article>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}

function Clients() {
  return (
    <section aria-label="Programs running on BlueStep" className="border-y border-line bg-surface">
      <Container className="flex flex-wrap items-center justify-center gap-x-14 gap-y-8 py-10">
        {CLIENTS.map((c) => (
          <img
            key={c.name}
            src={asset(`images/logos/${c.file}`)}
            alt={c.name}
            className="h-12 w-auto opacity-60 grayscale transition duration-300 hover:opacity-100 hover:grayscale-0 dark:opacity-75 dark:invert dark:hover:grayscale"
          />
        ))}
      </Container>
    </section>
  )
}

function Directory() {
  const points = [
    { icon: Gift, t: 'Free, always', b: 'No cost to list, and no other BlueStep software required.' },
    { icon: Sparkle, t: 'Found by BlueIQ', b: 'Consultants ask our AI which programs fit. It answers from your listing.' },
    { icon: SealCheck, t: 'Verified by your team', b: 'Sign in and save an update, and your listing carries a verified badge.' },
  ]
  return (
    <section className="py-24 md:py-32" data-track-section="home-directory">
      <Container>
        <Reveal className="grid items-center gap-12 rounded-2xl border border-accent/25 bg-accent-soft p-6 sm:p-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16 lg:p-14">
          <div className="min-w-0">
            <p className="kicker mb-5">Free resource for programs</p>
            <h2 className="text-3xl font-semibold leading-[1.1] tracking-tightest md:text-5xl">
              Get in front of the professionals who refer families.
            </h2>
            <p className="prose-body mt-6 max-w-[52ch]">
              The BlueStep Program Directory is where educational and therapeutic consultants look up programs. Claim
              your free listing and keep it current, so what they see is accurate.
            </p>
            <ul className="mt-8 grid gap-5 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
              {points.map((p) => (
                <li key={p.t} className="min-w-0">
                  <p className="flex items-center gap-2 font-semibold">
                    <p.icon size={18} weight="bold" className="shrink-0 text-accent" />
                    {p.t}
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-muted">{p.b}</p>
                </li>
              ))}
            </ul>
            <div className="mt-10 flex flex-wrap gap-3">
              <a href={DIRECTORY_URL} className="btn-primary group">
                Claim your free listing
                <ArrowRight size={16} weight="bold" className="transition-transform group-hover:translate-x-0.5" />
              </a>
              <Link to={CTA.directory.href} className="btn-ghost">
                How it works
              </Link>
            </div>
          </div>
          <div className="card min-w-0 rounded-2xl p-6 md:p-8">
            <DirectoryExample />
          </div>
        </Reveal>
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
    { icon: Timer, t: '15 years in behavioral health', b: 'Our team includes people who worked in residential treatment, in direct care and program leadership.' },
    { icon: Stack, t: 'One record', b: 'EHR, CRM, Outcomes, and BlueIQ share one database. Nothing gets entered twice.' },
    { icon: ShieldCheck, t: 'HIPAA hosting and a BAA', b: 'Every plan, every path. Every change is logged and every push is a restorable snapshot.' },
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
          <Link to="/about" className="mt-10 inline-flex items-center gap-2 text-sm font-medium text-accent">
            Our story
            <ArrowRight size={16} weight="bold" />
          </Link>
        </Reveal>
      </Container>
    </section>
  )
}

export default function Home() {
  useTitle()
  return (
    <>
      <Fork />
      <Clients />
      <Directory />
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
