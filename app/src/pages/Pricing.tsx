import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Minus, Plus } from '@phosphor-icons/react'
import {
  BUILD_HELP_RATE,
  FACILITY_PRICES,
  PLANS,
  REFERRAL,
  basePerProgram,
  discountFor,
  monthlyTotal,
  usd,
  type Selection,
} from '../data/pricing'
import { CTA } from '../site'
import { track } from '../analytics'
import { ClosingCTA, Container, Heading, OnAccentButton, PageHero, Reveal, useTitle } from '../ui'

type PlanId = 'blank-slate' | 'builder' | 'full-service'

function Calculator() {
  const [plan, setPlan] = useState<PlanId>('full-service')
  const [programs, setPrograms] = useState(2)
  const [sel, setSel] = useState<Selection>({ ehr: true, crm: true, outcomes: false })

  const base =
    plan === 'full-service' ? basePerProgram(sel) : PLANS.find((p) => p.id === plan)!.price
  // Slate is one flat fee for the workspace, so the program count doesn't apply.
  const flat = plan === 'blank-slate'
  const monthly = flat ? base : monthlyTotal(base, programs)

  const toggle = (k: keyof Selection) => setSel((s) => ({ ...s, [k]: !s[k] }))

  // One analytics event per visit to the page, on the first interaction.
  const used = useRef(false)
  const touched = () => {
    if (used.current) return
    used.current = true
    track('calculator_use')
  }

  return (
    <section className="py-24 md:py-32">
      <Container className="grid gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-20">
        <Heading
          title="Estimate your price."
          sub="Full-service and Blueprint are priced per program: the 2nd is 15% off, the 3rd and beyond 25% off. Slate is one flat monthly fee."
        />
        <Reveal className="card p-6 md:p-8">
          <div onClickCapture={touched} onChangeCapture={touched}>
          <fieldset>
            <legend className="text-sm font-medium">Plan</legend>
            <div className="mt-3 grid grid-cols-3 gap-1 rounded-full bg-raised p-1">
              {PLANS.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setPlan(p.id)}
                  aria-pressed={plan === p.id}
                  className={`rounded-full px-2 py-2 text-sm transition ${
                    plan === p.id ? 'bg-surface font-medium text-ink shadow-sm' : 'text-muted hover:text-ink'
                  }`}
                >
                  {p.name}
                </button>
              ))}
            </div>
          </fieldset>

          {plan === 'full-service' && (
            <fieldset className="mt-7">
              <legend className="text-sm font-medium">Products</legend>
              <div className="mt-3 grid gap-2 sm:grid-cols-3">
                {(['ehr', 'crm', 'outcomes'] as const).map((k) => (
                  <label
                    key={k}
                    className={`flex cursor-pointer items-center justify-between rounded-xl border px-4 py-3 text-sm transition ${
                      sel[k] ? 'border-accent bg-accent-soft' : 'border-line hover:border-faint'
                    }`}
                  >
                    <span>
                      <span className="block font-medium">{k === 'ehr' ? 'EHR' : k === 'crm' ? 'CRM' : 'Outcomes'}</span>
                      <span className="text-xs text-muted">{usd(FACILITY_PRICES[k])}</span>
                    </span>
                    <input type="checkbox" checked={sel[k]} onChange={() => toggle(k)} className="h-4 w-4 accent-[rgb(var(--accent))]" />
                  </label>
                ))}
              </div>
              <p className="mt-2 text-xs text-muted">Bundles are priced lower than the sum. All three: {usd(1500)}.</p>
            </fieldset>
          )}

          {!flat && (
          <div className="mt-7">
            <p id="programs-label" className="text-sm font-medium">Programs</p>
            <div className="mt-3 flex items-center gap-3" role="group" aria-labelledby="programs-label">
              <button
                type="button"
                aria-label="Fewer programs"
                onClick={() => setPrograms((n) => Math.max(1, n - 1))}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-line hover:border-faint"
              >
                <Minus size={16} />
              </button>
              <span className="w-10 text-center text-2xl font-semibold tabular-nums" aria-live="polite">
                {programs}
              </span>
              <button
                type="button"
                aria-label="More programs"
                onClick={() => setPrograms((n) => Math.min(30, n + 1))}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-line hover:border-faint"
              >
                <Plus size={16} />
              </button>
            </div>
          </div>
          )}

          <div className="mt-8 rounded-xl bg-raised p-5">
            <div className="space-y-1.5 text-sm">
              {flat ? (
                <div className="flex justify-between text-muted">
                  <span>Slate workspace, any number of programs</span>
                  <span className="tabular-nums">{usd(base)}</span>
                </div>
              ) : Array.from({ length: Math.min(programs, 4) }, (_, i) => (
                <div key={i} className="flex justify-between text-muted">
                  <span>
                    Program {i + 1}
                    {discountFor(i) > 0 && <span className="text-accent"> (-{discountFor(i) * 100}%)</span>}
                  </span>
                  <span className="tabular-nums">{usd(base * (1 - discountFor(i)))}</span>
                </div>
              ))}
              {!flat && programs > 4 && (
                <div className="flex justify-between text-muted">
                  <span>Programs 5 to {programs} (-25%)</span>
                  <span className="tabular-nums">{usd(base * 0.75 * (programs - 4))}</span>
                </div>
              )}
            </div>
            <div className="mt-4 flex items-end justify-between border-t border-line pt-4">
              <div>
                <p className="text-sm text-muted">Estimated monthly</p>
                <p className="text-4xl font-semibold tracking-tightest tabular-nums">{usd(monthly)}</p>
              </div>
              <p className="text-sm text-muted tabular-nums">{usd(monthly * 12)} / year</p>
            </div>
          </div>
          <p className="mt-4 text-xs text-muted">Estimate only. Your quote confirms final pricing.</p>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}

function Extras() {
  return (
    <section className="border-y border-line bg-surface py-24 md:py-32">
      <Container className="grid gap-4 md:grid-cols-2">
        <Reveal className="card p-8">
          <h2 className="text-2xl font-semibold tracking-tight">Build help</h2>
          <p className="mt-2 text-5xl font-semibold tracking-tightest">
            ${BUILD_HELP_RATE}
            <span className="text-base font-normal text-muted"> / hour</span>
          </p>
          <p className="mt-4 leading-relaxed text-muted">
            For Blueprint and Slate plans. When you want our team to fix, finish, or build something for you.
            Platform issues are always on us.
          </p>
          <Link to="/build" className="mt-6 inline-block text-sm font-medium text-accent">
            Where support starts and stops
          </Link>
        </Reveal>
        <Reveal id="referring-professionals" delay={80} className="card scroll-mt-24 p-8">
          <h2 className="text-2xl font-semibold tracking-tight">Referring Professionals</h2>
          <p className="mt-2 text-5xl font-semibold tracking-tightest">
            ${REFERRAL.perSeat}
            <span className="text-base font-normal text-muted"> / user / month</span>
          </p>
          <p className="mt-4 leading-relaxed text-muted">
            For consultants and placement teams. Add BlueIQ document intelligence and dictation for $
            {REFERRAL.blueIqPerSeat} per user.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-4">
            <Link to="/signup" className="btn-primary px-4 py-2 text-sm">
              Sign up now
            </Link>
            <Link to={CTA.demo.href} className="text-sm font-medium text-accent">
              {CTA.demo.label}
            </Link>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}

const FAQ = [
  [
    'What is the difference between Blueprint and Full-service?',
    'Same EHR. On Full-service, our team configures it, trains your staff, and builds what you ask for. On Blueprint, your team builds with its own AI tools and we support the platform.',
  ],
  [
    'Do we need a developer?',
    'No. You need someone who likes to build and can describe what the program needs. Your AI does the platform work.',
  ],
  [
    'Can we switch plans later?',
    'Yes. Programs move between plans as their team changes. Talk to us and we will work out the timing.',
  ],
  [
    'Why is it pilot pricing?',
    'Blueprint and Slate are new. We are starting with a small group of programs, and pricing may change as we learn.',
  ],
]

export default function Pricing() {
  useTitle('Pricing')
  return (
    <>
      <PageHero
        title="No per-seat math. Your whole team is covered."
        sub="Full-service and Blueprint are priced per program. Slate is one flat monthly fee for a blank workspace."
      />
      <Calculator />
      <Extras />
      <section className="py-24 md:py-32">
        <Container className="max-w-3xl">
          <Heading title="Questions." />
          <div className="mt-10 divide-y divide-line border-y border-line">
            {FAQ.map(([q, a]) => (
              <details key={q} className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 font-medium">
                  {q}
                  <Plus size={18} className="shrink-0 text-muted transition-transform group-open:rotate-45" />
                </summary>
                <p className="mt-3 max-w-[60ch] leading-relaxed text-muted">{a}</p>
              </details>
            ))}
          </div>
        </Container>
      </section>
      <ClosingCTA title="Get a quote for your programs." sub="Tell us what you run. We will put together pricing that fits.">
        <OnAccentButton to={CTA.demo.href} solid>
          {CTA.demo.label}
        </OnAccentButton>
        <OnAccentButton to={CTA.build.href}>{CTA.build.label}</OnAccentButton>
      </ClosingCTA>
    </>
  )
}
