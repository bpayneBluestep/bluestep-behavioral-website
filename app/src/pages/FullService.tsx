import { Link } from 'react-router-dom'
import { ArrowRight, ArrowUpRight, Buildings, ChatsCircle, ShieldCheck, Timer } from '@phosphor-icons/react'
import PathSwitch from '../components/PathSwitch'
import { PRODUCTS } from '../data/products'
import { ROLES } from '../data/roles'
import { CTA } from '../site'
import { Button, ClosingCTA, Container, Heading, OnAccentButton, Reveal, asset, useTitle } from '../ui'

const WHY = [
  { icon: Buildings, t: 'People who have worked in programs', b: 'Members of our team started in residential treatment, in direct care and program leadership. That perspective shapes what we build.' },
  { icon: Timer, t: '15 years of clinical workflow depth', b: 'Our team includes former direct care staff and program leaders. We know the documentation, the audits, and the shift-change handoffs.' },
  { icon: ChatsCircle, t: 'You reach a person, not a ticket queue', b: 'Call with a question and you reach someone who knows your program by name. There is no tier-1 support layer.' },
  { icon: ShieldCheck, t: 'Built for compliance, not workarounds', b: 'Behavioral health compliance is its own thing. BlueStep is built around the documentation, incidents, and outcomes you actually face.' },
]

const INCLUDED = [
  ['Configured for your program', 'Our team sets up your forms, roles, and workflows before go-live.'],
  ['Clinical onboarding and training', 'Training for every role, from people who know the workflows.'],
  ['Feature requests, built for you', 'Ask for a change. Our team builds it, tests it, and ships it.'],
  ['A person who knows your program', 'Call and reach someone who knows your staff and your census by name.'],
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
          <Heading title="Software that fits how your team works." />
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
