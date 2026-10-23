import { Link, useLocation } from 'react-router-dom'
import { ArrowRight, Sparkle } from '@phosphor-icons/react'
import { ROLES } from '../data/roles'
import { CTA } from '../site'
import { Button, ClosingCTA, Container, Heading, OnAccentButton, Reveal, asset, useTitle } from '../ui'
import NotFound from './NotFound'

export default function RolePage() {
  const { pathname } = useLocation()
  const role = ROLES.find((r) => pathname.replace(/\/$/, '') === `/${r.slug}`)
  useTitle(role?.title ?? 'Page not found')
  if (!role) return <NotFound />
  const others = ROLES.filter((r) => r.slug !== role.slug)
  const isPartner = role.slug === 'for-referring-professionals'

  return (
    <>
      <section className="border-b border-line">
        <Container className="grid items-center gap-12 pb-16 pt-12 md:pt-16 lg:grid-cols-[1.05fr_1fr] lg:gap-16 lg:pb-24">
          <div className="rise">
            <p className="kicker mb-5">{role.title}</p>
            <h1 className="text-4xl font-semibold leading-[1.05] tracking-tightest md:text-[3.4rem]">{role.headline}</h1>
            <p className="prose-body mt-6 max-w-[52ch]">{role.sub}</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Button to={isPartner ? '/signup' : CTA.demo.href} arrow>
                {isPartner ? 'Sign up now' : CTA.demo.label}
              </Button>
              <Button to={isPartner ? CTA.demo.href : CTA.pricing.href} variant="ghost">
                {isPartner ? CTA.demo.label : CTA.pricing.label}
              </Button>
            </div>
          </div>
          <img
            src={asset(role.image)}
            alt={role.alt}
            className="rise aspect-[4/3] w-full rounded-2xl object-cover [animation-delay:120ms]"
          />
        </Container>
      </section>

      <section className="py-24 md:py-28">
        <Container>
          <Heading title="Sound familiar?" />
          <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {role.pains.map((p, i) => (
              <Reveal key={p.heading} delay={i * 60} className="bg-surface p-7">
                <p.icon size={26} className="text-faint" />
                <h3 className="mt-8 font-semibold">{p.heading}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{p.body}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-y border-line bg-surface py-24 md:py-28">
        <Container>
          <Heading title="What changes with BlueStep." />
          <div className={`mt-12 grid gap-x-12 gap-y-10 ${role.features.length > 4 ? 'md:grid-cols-3' : 'md:grid-cols-2'}`}>
            {role.features.map((f, i) => (
              <Reveal key={f.name} delay={i * 60} className="flex gap-5">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent-soft text-accent">
                  <f.icon size={22} />
                </span>
                <div>
                  <h3 className="text-lg font-semibold tracking-tight">{f.name}</h3>
                  <p className="mt-2 leading-relaxed text-muted">{f.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {isPartner && (
        <section className="py-16">
          <Container>
            <Reveal>
              <Link
                to="/products/consultant-crm"
                className="group flex flex-col gap-5 rounded-2xl border border-accent/25 bg-accent-soft p-7 md:flex-row md:items-center md:justify-between md:p-8"
              >
                <span className="flex items-start gap-4">
                  <Sparkle size={22} weight="fill" className="mt-0.5 shrink-0 text-accent" />
                  <span>
                    <span className="block font-semibold">See the product: the Consultant CRM</span>
                    <span className="mt-1 block text-muted">
                      Screens from the real app: caseload, referrals, e-signature, the program directory, and BlueIQ.
                    </span>
                  </span>
                </span>
                <span className="inline-flex shrink-0 items-center gap-2 text-sm font-medium text-accent group-hover:text-ink">
                  Take the tour
                  <ArrowRight size={16} weight="bold" className="transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            </Reveal>
          </Container>
        </section>
      )}

      {!isPartner && (
        <section className="py-16">
          <Container>
            <Reveal>
              {/* Both paths: most readers here are Full-service buyers, so "ask our team"
                  comes first and building it yourself second. */}
              <div className="flex flex-col gap-5 rounded-2xl border border-accent/25 bg-accent-soft p-7 md:flex-row md:items-center md:justify-between md:p-8">
                <span className="flex items-start gap-4">
                  <Sparkle size={22} weight="fill" className="mt-0.5 shrink-0 text-accent" />
                  <span>
                    <span className="block font-semibold">Need something we didn&apos;t build?</span>
                    <span className="mt-1 block text-muted">{role.build}</span>
                  </span>
                </span>
                <span className="flex shrink-0 flex-wrap items-center gap-5 text-sm font-medium text-accent">
                  {[
                    { to: CTA.demo.href, label: 'Ask our team' },
                    { to: CTA.how.href, label: 'Build it yourself' },
                  ].map((l) => (
                    <Link key={l.label} to={l.to} className="group inline-flex items-center gap-2 hover:text-ink">
                      {l.label}
                      <ArrowRight size={16} weight="bold" className="transition-transform group-hover:translate-x-0.5" />
                    </Link>
                  ))}
                </span>
              </div>
            </Reveal>
          </Container>
        </section>
      )}

      <section className="pb-4 pt-12">
        <Container>
          <p className="text-sm font-medium text-muted">Also built for</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {others.map((o) => (
              <Link
                key={o.slug}
                to={`/${o.slug}`}
                className="rounded-full border border-line bg-surface px-4 py-2 text-sm transition-colors hover:border-faint"
              >
                {o.nav}
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <ClosingCTA title={role.closing.headline} sub={role.closing.body}>
        <OnAccentButton to={isPartner ? '/signup' : CTA.demo.href} solid>
          {isPartner ? 'Sign up now' : CTA.demo.label}
        </OnAccentButton>
        <OnAccentButton to={isPartner ? CTA.demo.href : CTA.pricing.href}>{isPartner ? CTA.demo.label : CTA.pricing.label}</OnAccentButton>
      </ClosingCTA>
    </>
  )
}
