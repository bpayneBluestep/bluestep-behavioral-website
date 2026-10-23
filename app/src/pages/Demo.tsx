import { useEffect, useRef, useState, type FormEvent } from 'react'
import { useSearchParams } from 'react-router-dom'
import { CheckCircle, Hammer, Handshake, Package, SquaresFour, UsersThree } from '@phosphor-icons/react'
import { BRAND } from '../site'
import { track } from '../analytics'
import { Container, asset, useTitle } from '../ui'

// If FORM_ENDPOINT is reset to a REPLACE_ME placeholder, the form opens a pre-filled email instead.
// FormSubmit relays each request to bpayne@bluestep.net. The id is FormSubmit's alias for that
// address (activated 2026-10-16), so the email isn't scrapeable from the bundle.
const FORM_ENDPOINT = 'https://formsubmit.co/ajax/633006af458489a48ebf5f7491a3c3e3'
const ENDPOINT_READY = !FORM_ENDPOINT.startsWith('REPLACE_ME')

const PATHS = [
  { id: 'full-service', label: 'Full-service', hint: 'See the EHR, CRM, and Outcomes, run by our team', icon: UsersThree },
  { id: 'concierge', label: 'Concierge', hint: 'Your own system, built by our team', icon: Handshake },
  { id: 'builder', label: 'Blueprint', hint: 'The full suite, yours to build on', icon: Hammer },
  { id: 'blank-slate', label: 'Slate', hint: 'A blank slate to build anything', icon: SquaresFour },
  { id: 'publish', label: 'Publishing', hint: 'Sell a feature in the marketplace', icon: Package },
] as const

type PathId = (typeof PATHS)[number]['id']
type Status = 'idle' | 'sending' | 'sent' | 'error'

const FIELDS = [
  { name: 'name', label: 'Your name', type: 'text', autoComplete: 'name', required: true },
  { name: 'role', label: 'Role', type: 'text', autoComplete: 'organization-title', required: true },
  { name: 'facility', label: 'Program or facility', type: 'text', autoComplete: 'organization', required: true },
  { name: 'email', label: 'Work email', type: 'email', autoComplete: 'email', required: true },
  { name: 'phone', label: 'Phone (optional)', type: 'tel', autoComplete: 'tel', required: false },
] as const

type Values = Record<(typeof FIELDS)[number]['name'] | 'message', string>
const EMPTY: Values = { name: '', role: '', facility: '', email: '', phone: '', message: '' }

const isPath = (v: string | null): v is PathId => PATHS.some((p) => p.id === v)

export default function Demo() {
  useTitle('Request a demo')
  const [params] = useSearchParams()
  const initial = params.get('path')
  const [path, setPath] = useState<PathId>(isPath(initial) ? initial : 'full-service')
  const [values, setValues] = useState<Values>(EMPTY)
  const [errors, setErrors] = useState<Partial<Record<keyof Values, string>>>({})
  const [status, setStatus] = useState<Status>('idle')
  const doneRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isPath(initial)) setPath(initial)
  }, [initial])
  useEffect(() => {
    if (status === 'sent') doneRef.current?.focus()
  }, [status])

  function validate(v: Values) {
    const e: Partial<Record<keyof Values, string>> = {}
    if (!v.name.trim()) e.name = 'Please enter your name.'
    if (!v.role.trim()) e.role = 'Please enter your role.'
    if (!v.facility.trim()) e.facility = 'Please enter your program.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email)) e.email = 'Please enter a valid email.'
    if (!v.message.trim()) e.message = 'Tell us a little about what you need.'
    return e
  }

  async function submit(ev: FormEvent) {
    ev.preventDefault()
    const e = validate(values)
    setErrors(e)
    const first = Object.keys(e)[0]
    if (first) {
      document.getElementById(`f-${first}`)?.focus()
      return
    }
    const pathLabel = PATHS.find((p) => p.id === path)!.label

    if (!ENDPOINT_READY) {
      const body = [
        `Interested in: ${pathLabel}`,
        `Name: ${values.name}`,
        `Role: ${values.role}`,
        `Program: ${values.facility}`,
        `Email: ${values.email}`,
        values.phone && `Phone: ${values.phone}`,
        '',
        values.message,
      ]
        .filter((l) => l !== '')
        .join('\n')
      window.location.href = `mailto:${BRAND.email}?subject=${encodeURIComponent(
        `${pathLabel}: ${values.facility}`,
      )}&body=${encodeURIComponent(body)}`
      setStatus('sent')
      return
    }

    setStatus('sending')
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          interest: pathLabel,
          name: values.name,
          'role/title': values.role,
          'facility name': values.facility,
          email: values.email,
          phone: values.phone || undefined,
          message: values.message,
          _subject: `Website: ${pathLabel} request from ${values.facility}`,
          _replyto: values.email,
          _template: 'table',
          _honey: '',
        }),
      })
      const data = await res.json().catch(() => ({}))
      const ok = res.ok && String(data.success) === 'true'
      setStatus(ok ? 'sent' : 'error')
      // Only the chosen path goes to analytics, never what the visitor typed.
      track(ok ? 'generate_lead' : 'lead_error', { interest: path })
    } catch {
      setStatus('error')
    }
  }

  const set = (k: keyof Values) => (e: { target: { value: string } }) =>
    setValues((v) => ({ ...v, [k]: e.target.value }))

  const inputCls = (k: keyof Values) =>
    `mt-2 w-full rounded-xl border bg-surface px-4 py-3 text-[15px] text-ink placeholder:text-faint focus:outline-none focus:ring-2 focus:ring-accent/30 ${
      errors[k] ? 'border-red-500' : 'border-line focus:border-accent'
    }`

  return (
    <section className="py-14 md:py-20">
      <Container className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        <div className="rise lg:pt-6">
          <h1 className="text-4xl font-semibold leading-[1.05] tracking-tightest md:text-6xl">Request a demo.</h1>
          <p className="prose-body mt-6 max-w-[40ch]">
            You'll talk to someone who knows how residential programs run. Brandon reads every message. No sales drip.
          </p>
          <img
            src={asset("images/heroes/video-call.jpg")}
            alt="A video call with notes being taken"
            className="mt-12 hidden aspect-[4/3] w-full rounded-2xl object-cover lg:block"
          />
        </div>

        <div className="card p-6 md:p-10">
          {status === 'sent' ? (
            <div ref={doneRef} tabIndex={-1} className="py-16 text-center outline-none">
              <CheckCircle size={44} weight="fill" className="mx-auto text-accent" />
              <h2 className="mt-5 text-2xl font-semibold tracking-tight">
                {ENDPOINT_READY ? 'Thanks. We will be in touch.' : 'Your email is ready to send.'}
              </h2>
              <p className="mx-auto mt-3 max-w-sm text-muted">
                {ENDPOINT_READY ? (
                  'A real person will read it and reply within a few business days.'
                ) : (
                  <>
                    Your email app opened with everything filled in. If it did not, write to{' '}
                    <a className="text-accent underline" href={`mailto:${BRAND.email}`}>
                      {BRAND.email}
                    </a>
                    .
                  </>
                )}
              </p>
            </div>
          ) : (
            <form onSubmit={submit} noValidate>
              <fieldset>
                <legend className="text-sm font-medium">I'm interested in</legend>
                <div className="mt-3 grid gap-2 sm:grid-cols-2">
                  {PATHS.map((p) => (
                    <label
                      key={p.id}
                      className={`flex cursor-pointer items-start gap-3 rounded-xl border p-4 transition ${
                        path === p.id ? 'border-accent bg-accent-soft' : 'border-line hover:border-faint'
                      }`}
                    >
                      <input
                        type="radio"
                        name="path"
                        value={p.id}
                        checked={path === p.id}
                        onChange={() => setPath(p.id)}
                        className="sr-only"
                      />
                      <p.icon size={20} className={path === p.id ? 'text-accent' : 'text-muted'} />
                      <span>
                        <span className="block text-sm font-medium">{p.label}</span>
                        <span className="block text-xs text-muted">{p.hint}</span>
                      </span>
                    </label>
                  ))}
                </div>
              </fieldset>

              <div className="mt-8 grid gap-5 sm:grid-cols-2">
                {FIELDS.map((f) => (
                  <div key={f.name} className={f.name === 'phone' ? 'sm:col-span-2' : ''}>
                    <label htmlFor={`f-${f.name}`} className="text-sm font-medium">
                      {f.label}
                    </label>
                    <input
                      id={`f-${f.name}`}
                      name={f.name}
                      type={f.type}
                      autoComplete={f.autoComplete}
                      value={values[f.name]}
                      onChange={set(f.name)}
                      aria-invalid={!!errors[f.name]}
                      aria-describedby={errors[f.name] ? `e-${f.name}` : undefined}
                      className={inputCls(f.name)}
                    />
                    {errors[f.name] && (
                      <p id={`e-${f.name}`} className="mt-1.5 text-sm text-red-600 dark:text-red-400">
                        {errors[f.name]}
                      </p>
                    )}
                  </div>
                ))}
                <div className="sm:col-span-2">
                  <label htmlFor="f-message" className="text-sm font-medium">
                    {path === 'publish' ? 'What did you build?' : path === 'full-service' ? 'What are you looking for?' : 'What would you build first?'}
                  </label>
                  <textarea
                    id="f-message"
                    name="message"
                    rows={5}
                    value={values.message}
                    onChange={set('message')}
                    aria-invalid={!!errors.message}
                    aria-describedby={errors.message ? 'e-message' : undefined}
                    className={inputCls('message')}
                  />
                  {errors.message && (
                    <p id="e-message" className="mt-1.5 text-sm text-red-600 dark:text-red-400">
                      {errors.message}
                    </p>
                  )}
                </div>
              </div>

              {status === 'error' && (
                <p role="alert" className="mt-6 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm">
                  Something went wrong on our end. Email{' '}
                  <a className="underline" href={`mailto:${BRAND.email}`}>
                    {BRAND.email}
                  </a>{' '}
                  and we will follow up directly.
                </p>
              )}

              <button type="submit" disabled={status === 'sending'} className="btn-primary mt-8 w-full py-3.5 text-base disabled:opacity-60">
                {status === 'sending' ? 'Sending' : 'Send my request'}
              </button>
            </form>
          )}
        </div>
      </Container>
    </section>
  )
}
