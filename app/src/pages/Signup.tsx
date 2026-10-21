import { useState, type FormEvent } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Check, CheckCircle, LockSimple, Minus, Plus, Sparkle } from '@phosphor-icons/react'
import { REFERRAL } from '../data/pricing'
import { track } from '../analytics'
import { Container, useTitle } from '../ui'

// Self-serve sign-up for the Educational Consultant CRM. The form posts to
// /b/crmCheckout (Cobalt org U142140, "CRM Checkout API"), which answers with Stripe's hosted
// checkout URL. Stripe takes the card; /b/stripeWebhook emails Brandon on payment.
// Prices here are display only: the endpoint sets the real amounts.

const MAX_USERS = 100

const INCLUDED = [
  'One family, one record, with every placement on a timeline',
  'Engagement letters signed on a phone',
  'The Program Directory, with your private ratings and tour notes',
  'One-click referrals into programs on BlueStep',
  'Your clients, documents, and notes moved over for you',
]

type Values = { name: string; firm: string; email: string }

export default function Signup() {
  useTitle('Sign up for the CRM')
  const [params] = useSearchParams()
  const [users, setUsers] = useState(1)
  const [blueiq, setBlueiq] = useState(true)
  const [values, setValues] = useState<Values>({ name: '', firm: '', email: '' })
  const [errors, setErrors] = useState<Partial<Record<keyof Values, string>>>({})
  const [busy, setBusy] = useState(false)
  const [failure, setFailure] = useState('')
  const canceled = params.get('canceled') === '1'

  const perUser = REFERRAL.perSeat + (blueiq ? REFERRAL.blueIqPerSeat : 0)
  const total = perUser * users
  const setUserCount = (n: number) => setUsers(Math.min(MAX_USERS, Math.max(1, Math.floor(n) || 1)))

  const set = (k: keyof Values) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues((v) => ({ ...v, [k]: e.target.value }))
    if (errors[k]) setErrors((x) => ({ ...x, [k]: undefined }))
  }

  async function submit(e: FormEvent) {
    e.preventDefault()
    const next: typeof errors = {}
    if (!values.name.trim()) next.name = 'Enter your name.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) next.email = 'Enter a valid email address.'
    setErrors(next)
    if (Object.keys(next).length) return

    setBusy(true)
    setFailure('')
    track('crm_checkout_start', { users, blueiq: blueiq ? 'yes' : 'no' })
    try {
      const res = await fetch('/b/crmCheckout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ users, blueiq, name: values.name.trim(), firm: values.firm.trim(), email: values.email.trim() }),
      })
      const body = await res.json().catch(() => null)
      if (body?.ok && body.data?.url) {
        window.location.href = body.data.url
        return
      }
      setFailure(body?.error || 'Checkout could not start. Please try again, or email bpayne@bluestep.net.')
    } catch {
      setFailure('Checkout could not start. Check your connection and try again.')
    }
    setBusy(false)
  }

  const inputCls = (k: keyof Values) =>
    `mt-2 w-full rounded-xl border bg-surface px-4 py-3 text-[15px] text-ink placeholder:text-faint focus:outline-none focus:ring-2 focus:ring-accent/30 ${
      errors[k] ? 'border-red-500' : 'border-line focus:border-accent'
    }`

  return (
    <section className="py-14 md:py-20">
      <Container className="grid gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
        <div className="rise">
          <p className="kicker mb-5">Educational Consultant CRM</p>
          <h1 className="text-4xl font-semibold leading-[1.05] tracking-tightest md:text-6xl">Get started today.</h1>
          <p className="prose-body mt-6 max-w-[44ch]">
            Pick your number of users, pay securely, and we'll email you within one business day to set up your
            account and bring your clients over.
          </p>
          <ul className="mt-10 space-y-3">
            {INCLUDED.map((i) => (
              <li key={i} className="flex gap-3 text-[15px]">
                <Check size={18} weight="bold" className="mt-0.5 shrink-0 text-accent" />
                {i}
              </li>
            ))}
          </ul>
          <p className="mt-10 text-sm text-muted">
            Want to see it first? <Link to="/demo" className="text-accent">Request a demo</Link> or read about it{' '}
            <Link to="/for-referring-professionals" className="text-accent">for referring professionals</Link>.
          </p>
        </div>

        <form onSubmit={submit} noValidate className="card rise rounded-2xl p-6 md:p-8 [animation-delay:100ms]">
          {canceled && (
            <p className="mb-6 rounded-xl bg-raised px-4 py-3 text-sm text-muted">
              Checkout was canceled. Nothing was charged. You can pick up where you left off.
            </p>
          )}

          <div>
            <label htmlFor="s-users" className="text-sm font-medium">Users</label>
            <p className="mt-1 text-xs text-muted">Everyone on your team who works with families.</p>
            <div className="mt-3 flex items-center gap-3">
              <button type="button" aria-label="Fewer users" onClick={() => setUserCount(users - 1)} disabled={users <= 1} className="flex h-11 w-11 items-center justify-center rounded-full border border-line hover:border-accent disabled:opacity-40">
                <Minus size={16} weight="bold" />
              </button>
              <input
                id="s-users"
                type="number"
                inputMode="numeric"
                min={1}
                max={MAX_USERS}
                value={users}
                onChange={(e) => setUserCount(Number(e.target.value))}
                className="h-11 w-20 rounded-xl border border-line bg-surface text-center text-lg font-semibold tabular-nums focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30"
              />
              <button type="button" aria-label="More users" onClick={() => setUserCount(users + 1)} disabled={users >= MAX_USERS} className="flex h-11 w-11 items-center justify-center rounded-full border border-line hover:border-accent disabled:opacity-40">
                <Plus size={16} weight="bold" />
              </button>
              <span className="text-sm text-muted">× ${REFERRAL.perSeat} / month</span>
            </div>
          </div>

          <label className={`mt-6 flex cursor-pointer items-start gap-3 rounded-xl border p-4 transition ${blueiq ? 'border-accent bg-accent-soft' : 'border-line hover:border-faint'}`}>
            <input id="s-blueiq" type="checkbox" checked={blueiq} onChange={(e) => setBlueiq(e.target.checked)} className="mt-1 h-4 w-4 accent-[rgb(var(--accent))]" />
            <span className="flex-1">
              <span className="flex items-center gap-2 text-sm font-medium">
                <Sparkle size={16} className="text-accent" /> Add BlueIQ
                <span className="ml-auto text-sm font-normal text-muted">+${REFERRAL.blueIqPerSeat} / user / month</span>
              </span>
              <span className="mt-1 block text-xs text-muted">
                Summaries, cited answers from a student's documents, and dictation. Applies to every user.
              </span>
            </span>
          </label>

          <div className="mt-6 flex items-baseline justify-between border-y border-line py-4">
            <span className="text-sm text-muted">
              {users} {users === 1 ? 'user' : 'users'} × ${perUser}
            </span>
            <span className="text-2xl font-semibold tabular-nums">
              ${total.toLocaleString()}
              <span className="text-sm font-normal text-muted"> / month</span>
            </span>
          </div>

          <div className="mt-6 grid gap-5">
            <div>
              <label htmlFor="s-name" className="text-sm font-medium">Your name</label>
              <input id="s-name" type="text" autoComplete="name" value={values.name} onChange={set('name')} aria-invalid={!!errors.name} className={inputCls('name')} />
              {errors.name && <p className="mt-1.5 text-sm text-red-600 dark:text-red-400">{errors.name}</p>}
            </div>
            <div>
              <label htmlFor="s-firm" className="text-sm font-medium">Firm (optional)</label>
              <input id="s-firm" type="text" autoComplete="organization" value={values.firm} onChange={set('firm')} className={inputCls('firm')} />
            </div>
            <div>
              <label htmlFor="s-email" className="text-sm font-medium">Work email</label>
              <input id="s-email" type="email" autoComplete="email" value={values.email} onChange={set('email')} aria-invalid={!!errors.email} className={inputCls('email')} />
              {errors.email && <p className="mt-1.5 text-sm text-red-600 dark:text-red-400">{errors.email}</p>}
            </div>
          </div>

          {failure && (
            <p role="alert" className="mt-6 rounded-xl border border-red-500/40 px-4 py-3 text-sm text-red-700 dark:text-red-300">
              {failure}
            </p>
          )}

          <button type="submit" disabled={busy} className="btn-primary mt-8 w-full justify-center py-3 text-base disabled:opacity-60">
            <LockSimple size={18} weight="bold" />
            {busy ? 'Opening secure checkout…' : 'Continue to secure payment'}
          </button>
          <p className="mt-4 text-center text-xs text-muted">
            Payment is handled by Stripe. Billed monthly. Change users or cancel any time by emailing us.
          </p>
        </form>
      </Container>
    </section>
  )
}

export function SignupSuccess() {
  useTitle("You're signed up")
  return (
    <section className="py-24 md:py-32">
      <Container className="max-w-2xl text-center">
        <div className="rise">
          <CheckCircle size={52} weight="fill" className="mx-auto text-accent" />
          <h1 className="mt-6 text-4xl font-semibold leading-[1.05] tracking-tightest md:text-5xl">You're in. Thank you.</h1>
          <p className="prose-body mx-auto mt-6 max-w-[48ch]">
            Your payment went through and Stripe is emailing your receipt. We'll reach out within one business day to
            set up your account and bring your clients, documents, and notes over.
          </p>
          <p className="mt-6 text-sm text-muted">
            Questions before then? Email <span className="text-ink">bpayne@bluestep.net</span>.
          </p>
          <div className="mt-10 flex justify-center gap-3">
            <Link to="/for-referring-professionals" className="btn-ghost">What you get</Link>
            <Link to="/" className="btn-primary">Back to home</Link>
          </div>
        </div>
      </Container>
    </section>
  )
}
