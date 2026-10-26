import { useState, type FormEvent, type ReactNode } from 'react'
import { Logo } from '../ui'

// Pre-launch password screen, so people don't stumble onto the site. It is a courtesy
// lock, not security: the bundle and /spa/ assets are still public. Only the SHA-256 of
// the password ships. To remove it before launch, drop <SiteGate> from main.tsx and the
// robots noindex meta from app/index.html.
const PASSWORD_SHA256 = '241caa30c3451a32275eff9d9c131f4194e1cb4490623775a45cd07f34fc8779'
const KEY = 'site-gate'

async function sha256(text: string): Promise<string> {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text))
  return Array.from(new Uint8Array(buf), (b) => b.toString(16).padStart(2, '0')).join('')
}

function remembered(): boolean {
  try {
    return localStorage.getItem(KEY) === PASSWORD_SHA256
  } catch {
    return false
  }
}

export default function SiteGate({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(remembered)
  const [value, setValue] = useState('')
  const [wrong, setWrong] = useState(false)

  if (open) return <>{children}</>

  async function submit(e: FormEvent) {
    e.preventDefault()
    if ((await sha256(value)) !== PASSWORD_SHA256) {
      setWrong(true)
      return
    }
    try {
      localStorage.setItem(KEY, PASSWORD_SHA256)
    } catch {
      // Private window: unlocked for this visit only.
    }
    setOpen(true)
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-bg px-5">
      <form onSubmit={submit} className="card w-full max-w-sm p-8">
        <Logo className="h-7" />
        <h1 className="mt-8 text-xl font-semibold tracking-tight">This site is in preview.</h1>
        <p className="mt-2 text-sm text-muted">Enter the password to continue.</p>
        <label htmlFor="site-gate-password" className="sr-only">
          Password
        </label>
        <input
          id="site-gate-password"
          type="password"
          autoFocus
          autoComplete="current-password"
          value={value}
          onChange={(e) => {
            setValue(e.target.value)
            setWrong(false)
          }}
          aria-invalid={wrong}
          aria-describedby={wrong ? 'site-gate-error' : undefined}
          className="mt-6 w-full rounded-xl border border-line bg-surface px-4 py-3 text-sm outline-none focus:border-accent"
        />
        {wrong && (
          <p id="site-gate-error" className="mt-2 text-sm text-red-600">
            That password isn't right.
          </p>
        )}
        <button type="submit" className="btn-primary mt-6 w-full justify-center py-3">
          Continue
        </button>
      </form>
    </main>
  )
}
