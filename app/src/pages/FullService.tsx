import { Link } from 'react-router-dom'
import { ArrowRight, ArrowUpRight, Buildings, CurrencyDollar, ShieldCheck, Stack } from '@phosphor-icons/react'
import PathSwitch from '../components/PathSwitch'
import { CONCIERGE, usd } from '../data/pricing'
import { PRODUCTS } from '../data/products'
import { ROLES } from '../data/roles'
import { CTA } from '../site'
import { Button, ClosingCTA, Container, Heading, OnAccentButton, Reveal, asset, useTitle } from '../ui'

const WHY = [
  { icon: Buildings, t: 'People who have worked in programs', b: 'Members of our team started in residential treatment, in direct care and program leadership. We know the documentation, the audits, and the shift-change handoffs.' },
  { icon: ShieldCheck, t: 'Compliance built into the record', b: 'Notes lock when they are signed. Unlocks need a logged reason. Cosignatures route by licensure. A surveyor can see all of it.' },
  { icon: Stack, t: 'One record for the whole stay', b: 'Admissions, clinical, nursing, and outcomes share one database. On admission day, the chart already has the history.' },
  { icon: CurrencyDollar, t: 'Prices on the website', b: 'Every plan is priced on our pricing page. Your quote confirms it, and your whole staff is covered.' },
]

const INCLUDED = [
  ['Configured for your program', 'Our team sets up your forms, roles, and workflows before go-live.'],
  ['Clinical onboarding and training', 'Training for every role, from people who know the workflows.'],
  ['Feature requests, built for you', 'Ask for a change. Our team builds it, tests it, and ships it.'],
  ['A person who knows your program', 'Call and reach someone who knows your staff and your census by name.'],
]

// Concierge: the top of the "we do the work" side. A system of the program's own, so no
// automatic updates, but our team makes every change and stands behind it.
const CONCIERGE_POINTS = [
  { t: 'A system of your own', b: 'Built around how your program runs: your forms, your workflows, your reports.' },
  { t: 'A dedicated engineer', b: `Someone who knows treatment programs and knows yours, with ${CONCIERGE.hours} hours of build work every month.` },
  { t: 'We stand behind all of it', b: 'We make every change, so if anything breaks, we fix it.' },
  { t: 'New features, brought to you', b: 'When we ship something new, we show it to you first and install it on your system.' },
]

export default function FullService() {
  useTitle('Full-service')
  return (
    <>
      <PathSwitch current="full-service" />
      <section className="border-b border-line">
        <Container className="grid items-center gap-12 pb-16 pt-10 md:pt-14 lg:grid-cols-[1.05fr_1fr] lg:gap-16 lg:pb-24">
          <div className="rise">
            <p className="kicker mb-5">Full-service</p>
            <h1 className="text-4xl font-semibold leading-[1.04] tracking-tightest md:text-6xl">
              We run it. You run your program.
            </h1>
            <p className="prose-body mt-6 max-w-[50ch]">
              The complete behavioral health EHR, set up, trained, and supported by a team that knows how programs run.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Button to={CTA.demo.href} arrow>
                {CTA.demo.label}
              </Button>
              <Button to={CTA.pricing.href} variant="ghost">
                {CTA.pricing.label}
              </Button>
            </div>
          </div>
          <img
            src={asset('images/heroes/for-clinicians.jpg')}
            alt="A therapist leading a group session"
            className="rise aspect-[4/3] w-full rounded-2xl object-cover [animation-delay:120ms]"
          />
        </Container>
      </section>

      <section className="py-24 md:py-28">
        <Container>
          <Heading title="What full-service includes." />
          <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {INCLUDED.map(([t, b], i) => (
              <Reveal key={t} delay={i * 60} className="bg-surface p-7">
                <span className="text-sm font-medium text-accent">{i + 1}</span>
                <h3 className="mt-6 font-semibold">{t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{b}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-y border-line bg-surface py-24 md:py-32">
        <Container>
          <Heading
            title="One record. Every part of the stay."
            sub="Pick the products you need. They share one database, so nothing gets entered twice."
          />
          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {PRODUCTS.map((p, i) => (
              <Reveal key={p.slug} delay={i * 60}>
                <Link
                  to={`/products/${p.slug}`}
                  className={`group flex h-full min-h-[240px] flex-col rounded-2xl p-7 transition ${
                    i === 0 ? 'bg-accent text-accent-ink hover:brightness-110' : 'card hover:border-faint'
                  }`}
                >
                  <p.icon size={28} className={i === 0 ? '' : 'text-accent'} />
                  <h3 className="mt-auto pt-10 text-xl font-semibold tracking-tight">{p.name}</h3>
                  <p className={`mt-2 text-sm leading-relaxed ${i === 0 ? 'opacity-85' : 'text-muted'}`}>{p.card}</p>
                  <p className={`mt-4 text-xs ${i === 0 ? 'opacity-75' : 'text-faint'}`}>{p.price}</p>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-24 md:py-32">
        <Container>
          <Heading title="Built for each role on your team." />
          <div className="mt-12 grid gap-x-4 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {ROLES.slice(0, 4).map((r, i) => (
              <Reveal key={r.slug} delay={i * 60}>
                <Link to={`/${r.slug}`} className="group block">
                  <div className="overflow-hidden rounded-2xl">
                    <img
                      src={asset(r.image)}
                      alt={r.alt}
                      loading="lazy"
                      className="aspect-[4/5] w-full object-cover transition duration-700 group-hover:scale-[1.04]"
                    />
                  </div>
                  <p className="mt-4 flex items-center justify-between font-semibold">
                    For {r.nav.toLowerCase()}
                    <ArrowUpRight size={18} className="text-faint transition group-hover:text-accent" />
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-muted">{r.headline}</p>
                </Link>
              </Reveal>
            ))}
          </div>
          <Link to="/for-referring-professionals" className="mt-10 inline-flex items-center gap-2 text-sm font-medium text-accent">
            Educational consultant? See BlueStep for referring professionals
            <ArrowRight size={16} weight="bold" />
          </Link>
        </Container>
      </section>

      <section
        id="concierge"
        className="scroll-mt-16 border-y border-accent/20 bg-accent-soft py-24 md:py-32"
        data-track-section="full-service-concierge"
      >
        <Container className="grid items-center gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <Reveal className="relative">
            <img
              src={asset('images/heroes/about.jpg')}
              alt="Two staff members in conversation at a treatment program"
              loading="lazy"
              className="aspect-[4/5] w-full rounded-2xl object-cover"
            />
            <div className="absolute -bottom-6 left-6 right-6 rounded-xl border border-line bg-surface p-5 shadow-[0_20px_40px_-20px_rgb(0_0_0/0.35)] sm:left-auto sm:w-64">
              <p className="text-3xl font-semibold tracking-tightest">{usd(CONCIERGE.base)}</p>
              <p className="mt-1 text-sm text-muted">per month. Every product, {CONCIERGE.hours} build hours included.</p>
            </div>
          </Reveal>
          <div className="min-w-0 pt-6 lg:pt-0">
            <p className="kicker mb-5">Concierge</p>
            <h2 className="text-4xl font-semibold leading-[1.04] tracking-tightest md:text-6xl">
              Need something no one else has?
            </h2>
            <p className="prose-body mt-6 max-w-[50ch]">
              Concierge gives your program a system of its own, built around how you run. Our team makes every change,
              so we stand behind all of it.
            </p>
            <ol className="mt-10 grid gap-x-8 sm:grid-cols-2">
              {CONCIERGE_POINTS.map((c, i) => (
                <li key={c.t} className="border-t border-accent/25 py-5">
                  <span className="font-mono text-xs text-accent">{String(i + 1).padStart(2, '0')}</span>
                  <h3 className="mt-2 font-semibold">{c.t}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted">{c.b}</p>
                </li>
              ))}
            </ol>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
              <Button to="/demo?path=concierge" arrow>
                Ask about Concierge
              </Button>
              <Link to={CTA.pricing.href} className="text-sm font-medium text-accent">
                {usd(CONCIERGE.perAddedProgram)} per added program. Compare plans
              </Link>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-y border-line bg-surface py-24 md:py-32">
        <Container className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Heading
              title="Four things a generic EHR vendor can't say."
              sub="Most of what we build starts with a problem a program brought to us."
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {WHY.map((w, i) => (
              <Reveal key={w.t} delay={i * 60} className={`rounded-2xl p-7 ${i === 0 ? 'bg-accent-soft' : 'card'}`}>
                <w.icon size={26} className="text-accent" />
                <h3 className="mt-8 text-lg font-semibold leading-snug tracking-tight">{w.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{w.b}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <ClosingCTA title="See it with your own workflows." sub="Bring your hardest documentation problem. You'll talk to someone who knows how programs run.">
        <OnAccentButton to={CTA.demo.href} solid>
          {CTA.demo.label}
        </OnAccentButton>
        <OnAccentButton to={CTA.pricing.href}>{CTA.pricing.label}</OnAccentButton>
      </ClosingCTA>
    </>
  )
}
