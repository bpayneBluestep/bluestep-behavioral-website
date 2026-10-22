import { Link } from 'react-router-dom'
import {
  ArrowUpRight,
  BookOpenText,
  ChatCircleText,
  CheckSquareOffset,
  ClockCounterClockwise,
  Code,
  FileLock,
  Lifebuoy,
  PlugsConnected,
  ShieldCheck,
  SquaresFour,
  Storefront,
  Trash,
  Wrench,
} from '@phosphor-icons/react'
import BuildLog from '../components/BuildLog'
import PathSwitch from '../components/PathSwitch'
import { BUILD_HELP_RATE, PLANS, usd } from '../data/pricing'
import { CTA } from '../site'
import { Button, ClosingCTA, Container, Heading, OnAccentButton, Reveal, useTitle } from '../ui'

const price = (id: string) => usd(PLANS.find((p) => p.id === id)!.price)

// A session transcript shape: request, the platform calls the AI makes, review.
const SESSION: { who: 'you' | 'ai' | 'tool'; text: string }[] = [
  { who: 'you', text: 'Take the E-Signature Agreements listing and build it for our program.' },
  { who: 'ai', text: 'Reading the listing spec and your setup. Your admissions forms differ from the reference build in three places. I will map them rather than copy them.' },
  { who: 'tool', text: 'list_forms   41 forms read' },
  { who: 'tool', text: 'create form "Agreement"   9 fields' },
  { who: 'tool', text: 'grant access   Admissions: edit, Clinical: view' },
  { who: 'tool', text: 'push --snapshot "Add e-signature agreements"' },
  { who: 'ai', text: 'Built. 11 of 11 acceptance checks pass. One trap from the listing applied: signed PDFs need a unique file name per signer.' },
]

const KIT = [
  {
    icon: ChatCircleText,
    title: 'Your AI, your choice',
    body: 'Use whatever AI coding tool your team already likes. Describe what you need in plain English, and it does the platform work.',
  },
  {
    icon: PlugsConnected,
    title: 'A standard connection to the platform',
    body: 'BlueStep exposes your forms, fields, permissions, and screens over MCP, the open standard modern AI tools speak.',
  },
  {
    icon: BookOpenText,
    title: 'The BlueStep reference',
    body: '15 years of platform knowledge and every known trap, written down so your AI reads it before it builds.',
  },
  {
    icon: CheckSquareOffset,
    title: 'Specs and acceptance checks',
    body: 'Larger builds start with a short plan you approve, and end with checks that prove it works.',
  },
]

const STARTS = [
  {
    to: '/pricing',
    icon: Code,
    name: 'Blueprint',
    price: `${price('builder')} per program / month`,
    t: 'Start with the full suite.',
    b: 'EHR, CRM, Outcomes, and BlueIQ, already built. Change anything on top of it.',
  },
  {
    to: '/marketplace',
    icon: Storefront,
    name: 'Marketplace',
    price: 'Free features from BlueStep',
    t: 'Take what others built.',
    b: 'Features built for real programs. Your AI fits them to your system.',
  },
  {
    to: '/slate',
    icon: SquaresFour,
    name: 'Slate',
    price: `${price('blank-slate')} / month, flat`,
    t: 'Start from a blank canvas.',
    b: 'A HIPAA-ready workspace for dashboards, trackers, portals, anything.',
  },
]

function Session() {
  return (
    <div className="card overflow-hidden">
      <div className="flex items-center gap-2 border-b border-line px-5 py-3.5">
        <span className="h-2.5 w-2.5 rounded-full bg-line" />
        <span className="h-2.5 w-2.5 rounded-full bg-line" />
        <span className="h-2.5 w-2.5 rounded-full bg-line" />
        <span className="ml-3 font-mono text-xs text-faint">builder session</span>
      </div>
      <ol className="space-y-4 p-5 md:p-6">
        {SESSION.map((line, i) => (
          <Reveal as="li" key={i} delay={i * 90}>
            {line.who === 'tool' ? (
              <p className="ml-6 whitespace-pre border-l-2 border-accent/40 pl-3 font-mono text-[13px] text-muted">{line.text}</p>
            ) : (
              <div className="flex gap-3">
                <span
                  className={`mt-0.5 shrink-0 self-start rounded-md px-1.5 py-0.5 font-mono text-[11px] font-medium ${
                    line.who === 'you' ? 'bg-raised text-ink' : 'bg-accent-soft text-accent'
                  }`}
                >
                  {line.who === 'you' ? 'you' : 'ai'}
                </span>
                <p className="text-[15px] leading-relaxed">{line.text}</p>
              </div>
            )}
          </Reveal>
        ))}
      </ol>
    </div>
  )
}

export default function Build() {
  useTitle('Build')
  return (
    <>
      <PathSwitch current="build" />
      <section className="border-b border-line">
        <Container className="grid items-center gap-12 pb-16 pt-10 md:pt-14 lg:grid-cols-[1fr_1.05fr] lg:gap-16 lg:pb-24">
          <div className="rise">
            <p className="kicker mb-5">Build</p>
            <h1 className="text-4xl font-semibold leading-[1.04] tracking-tightest md:text-6xl">
              The EHR you build by asking.
            </h1>
            <p className="prose-body mt-6 max-w-[48ch]">
              Bring your own AI tools. Describe what your program needs, and it gets built on BlueStep, the same way our
              own team builds.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Button to={CTA.build.href} arrow>
                {CTA.build.label}
              </Button>
              <Button to={CTA.market.href} variant="ghost">
                {CTA.market.label}
              </Button>
            </div>
          </div>
          <div className="rise [animation-delay:120ms]">
            <BuildLog />
          </div>
        </Container>
      </section>

      <section className="py-24 md:py-28">
        <Container>
          <Heading title="Three ways to start." />
          <div className="mt-12 grid gap-4 lg:grid-cols-3">
            {STARTS.map((s, i) => (
              <Reveal key={s.name} delay={i * 70}>
                <Link
                  to={s.to}
                  className={`group flex h-full flex-col rounded-2xl p-8 transition ${
                    i === 0 ? 'panel-dark' : 'card hover:border-faint'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <s.icon size={26} className={i === 0 ? 'text-[#60a5eb]' : 'text-accent'} />
                    <ArrowUpRight size={20} className="opacity-40 transition group-hover:opacity-100" />
                  </div>
                  <p className={`mt-10 text-sm font-medium ${i === 0 ? 'text-[#60a5eb]' : 'text-accent'}`}>{s.name}</p>
                  <h3 className="mt-1 text-2xl font-semibold tracking-tight">{s.t}</h3>
                  <p className={`mt-3 leading-relaxed ${i === 0 ? 'opacity-75' : 'text-muted'}`}>{s.b}</p>
                  <p className={`mt-auto pt-8 text-sm ${i === 0 ? 'opacity-60' : 'text-faint'}`}>{s.price}</p>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-y border-line bg-surface py-24 md:py-32">
        <Container className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Heading
              title="Describe it. Review it. Ship it."
              sub="A build is a conversation. You say what the program needs. Your AI does the platform work, shows you every step, and saves a snapshot before anything goes live."
            />
            <dl className="mt-10 space-y-6">
              {[
                ['Who builds', 'Someone on your team who likes to build. An IT lead, an ops director, a clinician who tinkers. Not necessarily a developer.'],
                ['How long', 'Small changes take minutes. A marketplace feature is usually an afternoon. Our e-signature feature took 20 minutes on a program set up nothing like ours.'],
                ['What it costs', 'Building is included in your plan. There is no per-change fee.'],
              ].map(([t, d]) => (
                <div key={t} className="border-l-2 border-line pl-5">
                  <dt className="font-medium">{t}</dt>
                  <dd className="mt-1 text-sm leading-relaxed text-muted">{d}</dd>
                </div>
              ))}
            </dl>
          </div>
          <Session />
        </Container>
      </section>

      <section className="py-24 md:py-32">
        <Container>
          <Heading title="What builders get." sub="The same tooling BlueStep engineers use every day. It works with any AI tool that speaks MCP." />
          <div className="mt-14 grid gap-x-12 gap-y-12 md:grid-cols-2">
            {KIT.map((k, i) => (
              <Reveal key={k.title} delay={i * 70} className="flex gap-5">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent-soft text-accent">
                  <k.icon size={22} />
                </span>
                <div>
                  <h3 className="text-lg font-semibold tracking-tight">{k.title}</h3>
                  <p className="mt-2 leading-relaxed text-muted">{k.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section id="trust" className="scroll-mt-20 border-y border-line bg-surface py-24 md:py-32">
        <Container>
          <Heading
            title="Freedom to build. Not freedom to break."
            sub="Builder access is real access. These protections hold no matter who, or what, is building."
          />
          <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: Trash, t: 'AI can’t delete', b: 'Removing a field, form, or record always takes a person, on purpose.' },
              { icon: ClockCounterClockwise, t: 'Snapshots', b: 'Every push is saved as a version you can restore.' },
              { icon: FileLock, t: 'Audit trail', b: 'Every change is logged with who made it and when.' },
              { icon: ShieldCheck, t: 'HIPAA and a BAA', b: 'Healthcare hosting and a signed BAA on every plan.' },
            ].map((g) => (
              <div key={g.t} className="bg-surface p-7">
                <g.icon size={26} className="text-accent" />
                <h3 className="mt-8 font-semibold">{g.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{g.b}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-24 md:py-32">
        <Container className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
          <Heading
            title="We support the platform. You own what you build."
            sub="Build plans trade clinical onboarding for freedom. Here is exactly where the line sits."
          />
          <div className="grid gap-4 sm:grid-cols-2">
            <Reveal className="card p-7">
              <Lifebuoy size={26} className="text-accent" />
              <h3 className="mt-6 font-semibold">Included</h3>
              <ul className="mt-4 space-y-3 text-sm leading-relaxed text-muted">
                <li>The platform not behaving as documented</li>
                <li>The MCP connection and builder tooling</li>
                <li>Hosting, uptime, and security</li>
                <li>Pointing you at the right pattern</li>
              </ul>
            </Reveal>
            <Reveal delay={80} className="card p-7">
              <Wrench size={26} className="text-muted" />
              <h3 className="mt-6 font-semibold">${BUILD_HELP_RATE} an hour</h3>
              <ul className="mt-4 space-y-3 text-sm leading-relaxed text-muted">
                <li>Fixing or finishing something you built</li>
                <li>Restoring data after a builder mistake</li>
                <li>Building features for you</li>
                <li>Clinical training for your staff</li>
              </ul>
            </Reveal>
          </div>
        </Container>
      </section>

      <ClosingCTA title="Have someone who likes to build?" sub="We're starting with a small group of builder programs. Tell us about yours.">
        <OnAccentButton to={CTA.build.href} solid>
          {CTA.build.label}
        </OnAccentButton>
        <OnAccentButton to={CTA.pricing.href}>{CTA.pricing.label}</OnAccentButton>
      </ClosingCTA>
    </>
  )
}
