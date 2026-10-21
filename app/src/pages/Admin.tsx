import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowSquareOut,
  CaretDown,
  ChartLine,
  CheckCircle,
  EnvelopeSimple,
  GitBranch,
  Lock,
  SignOut,
  Warning,
  Wrench,
} from '@phosphor-icons/react'
import { analyticsEnabled } from '../analytics'
import { ROLES } from '../data/roles'
import { CTA, DIRECTORY_URL, NAV, isGroup } from '../site'
import { Container, Logo } from '../ui'

// /admin: hidden, for BlueStep global super users only. Not linked from any public
// page. The gate is /b/siteAdmin (U141648, "Site Admin API"), which answers on this
// site's own host because the GitSite lives in that org. Signed out → Microsoft
// sign-in first, then the other global options, returning here.

const ADMIN_DEST = '/admin'
const LOGIN_URL = '/shared/login/login.jsp'
const LOGOUT_URL = '/shared/login/logout'
const REPO = 'bpayneBluestep/bluestep-behavioral-website'
const HOOK_ID = '701032280'

const microsoftLoginUrl = (dest: string) =>
  `https://oauth2.bluestep.net/v1/login/initiate/microsoft?host=${encodeURIComponent(window.location.host)}&destUrl=${encodeURIComponent(dest)}`
const globalLoginUrl = (dest: string) => `${LOGIN_URL}?step=two&_globalLogin=true&desturl=${encodeURIComponent(dest)}`
const editScript = (id: string) => `/shared/admin/applications/relate/editScript.jsp?_event=edit&_id=${id}`

interface Session {
  loggedIn: boolean
  isSuper: boolean
  fullName: string
}

async function fetchSession(): Promise<Session> {
  const res = await fetch('/b/siteAdmin?action=session', { credentials: 'same-origin', cache: 'no-store' })
  const body = await res.json().catch(() => null)
  if (!body) throw new Error(`The admin check answered HTTP ${res.status}.`)
  if (!body.ok) throw new Error(body.error || 'The admin check failed.')
  return body.data as Session
}

type Phase = 'loading' | 'signedOut' | 'notSuper' | 'ready' | 'error'

export default function Admin() {
  const [phase, setPhase] = useState<Phase>('loading')
  const [session, setSession] = useState<Session | null>(null)
  const [error, setError] = useState('')

  const load = useCallback(async () => {
    try {
      const s = await fetchSession()
      setSession(s)
      setPhase(!s.loggedIn ? 'signedOut' : s.isSuper ? 'ready' : 'notSuper')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not reach the admin check.')
      setPhase('error')
    }
  }, [])

  useEffect(() => {
    document.title = 'Admin | BlueStep Behavioral'
    const robots = document.createElement('meta')
    robots.name = 'robots'
    robots.content = 'noindex, nofollow'
    document.head.appendChild(robots)
    load()
    return () => robots.remove()
  }, [load])

  const signOut = () => {
    window.location.href = `${LOGOUT_URL}?desturl=${encodeURIComponent(ADMIN_DEST)}`
  }

  if (phase === 'loading') {
    return (
      <Shell>
        <p className="py-32 text-center text-muted">Checking your access…</p>
      </Shell>
    )
  }

  if (phase === 'signedOut') {
    return (
      <Shell>
        <StateCard icon={<Lock size={22} />} title="Website admin">
          <p className="text-muted">For BlueStep staff. Sign in with your BlueStep Microsoft account.</p>
          <a className="btn-primary mt-7 w-full justify-center" href={microsoftLoginUrl(ADMIN_DEST)}>
            <MicrosoftMark /> Sign in with Microsoft
          </a>
          <a className="mt-4 inline-block text-sm text-accent" href={globalLoginUrl(ADMIN_DEST)}>
            Other BlueStep sign-in options
          </a>
        </StateCard>
      </Shell>
    )
  }

  if (phase === 'notSuper' || phase === 'error') {
    return (
      <Shell>
        <StateCard icon={<Warning size={22} />} title={phase === 'notSuper' ? 'Super users only' : 'Couldn’t load the admin'}>
          <p className="text-muted">
            {phase === 'notSuper'
              ? `You're signed in as ${session?.fullName || 'a user'} without super-user access.`
              : error}
          </p>
          <button type="button" className="btn-ghost mt-7" onClick={signOut}>
            Sign out and switch accounts
          </button>
        </StateCard>
      </Shell>
    )
  }

  return (
    <Shell
      bar={
        <>
          <span className="hidden text-sm text-muted sm:inline">{session?.fullName}</span>
          <BackendMenu />
          <button type="button" className="btn-ghost gap-1.5 px-3 py-1.5 text-sm" onClick={signOut}>
            <SignOut size={16} />
            <span className="hidden sm:inline">Sign out</span>
          </button>
        </>
      }
    >
      <Container className="py-12 md:py-16">
        <h1 className="text-3xl font-semibold tracking-tightest md:text-4xl">Website admin</h1>
        <p className="mt-2 text-muted">bluestepbehavioral.bluestep.net</p>
        <div className="mt-10 grid gap-4 lg:grid-cols-2">
          <DeployCard />
          <DirectoryCard />
          <LeadsCard />
          <PagesCard />
        </div>
      </Container>
    </Shell>
  )
}

/* ---------- deploy status ---------- */

interface Commit {
  sha: string
  message: string
  date: string
  url: string
}

type LiveState = 'checking' | 'current' | 'behind' | 'unknown'

function DeployCard() {
  const [commits, setCommits] = useState<Commit[] | null>(null)
  const [live, setLive] = useState<LiveState>('checking')
  const [error, setError] = useState('')

  useEffect(() => {
    let alive = true
    ;(async () => {
      try {
        const res = await fetch(`https://api.github.com/repos/${REPO}/commits?sha=main&per_page=5`)
        if (!res.ok) throw new Error(`GitHub answered HTTP ${res.status}.`)
        const list = (await res.json()) as any[]
        if (alive)
          setCommits(
            list.map((c) => ({
              sha: c.sha.slice(0, 7),
              message: String(c.commit.message).split('\n')[0],
              date: c.commit.committer?.date ?? c.commit.author?.date,
              url: c.html_url,
            })),
          )
      } catch (err) {
        if (alive) setError(err instanceof Error ? err.message : 'Could not reach GitHub.')
      }
      // The deployed index.html names the hashed bundle; so does main's. Same bundle, same build.
      try {
        const [deployed, head] = await Promise.all([
          fetch(`${import.meta.env.BASE_URL}index.html`, { cache: 'no-store' }).then((r) => (r.ok ? r.text() : '')),
          fetch(`https://raw.githubusercontent.com/${REPO}/main/index.html`, { cache: 'no-store' }).then((r) => (r.ok ? r.text() : '')),
        ])
        const bundle = (html: string) => html.match(/assets\/index-[\w-]+\.js/)?.[0] ?? ''
        if (alive) setLive(!bundle(deployed) || !bundle(head) ? 'unknown' : bundle(deployed) === bundle(head) ? 'current' : 'behind')
      } catch {
        if (alive) setLive('unknown')
      }
    })()
    return () => {
      alive = false
    }
  }, [])

  return (
    <Card icon={<GitBranch size={20} />} title="Deploys">
      <LiveBadge state={live} />
      {error && <p className="mt-4 text-sm text-muted">{error}</p>}
      {commits && (
        <ol className="mt-5 divide-y divide-line border-y border-line">
          {commits.map((c) => (
            <li key={c.sha} className="flex items-baseline gap-3 py-2.5 text-sm">
              <a href={c.url} target="_blank" rel="noopener noreferrer" className="font-mono text-xs text-accent">
                {c.sha}
              </a>
              <span className="min-w-0 flex-1 truncate">{c.message}</span>
              <span className="shrink-0 text-xs text-faint">{ago(c.date)}</span>
            </li>
          ))}
        </ol>
      )}
      <CardLinks
        links={[
          ['GitHub repo', `https://github.com/${REPO}`],
          ['Webhook deliveries', `https://github.com/${REPO}/settings/hooks/${HOOK_ID}`],
        ]}
      />
    </Card>
  )
}

function LiveBadge({ state }: { state: LiveState }) {
  const map: Record<LiveState, [string, string]> = {
    checking: ['Checking the live build…', 'text-muted'],
    current: ['The live site matches main', 'text-[#1f8a4c] dark:text-[#5fd08f]'],
    behind: ['The live site is behind main. The webhook may not have deployed the last push.', 'text-[#b25e09] dark:text-[#f0a64b]'],
    unknown: ['Could not compare the live build with main', 'text-muted'],
  }
  const [label, cls] = map[state]
  return (
    <p className={`flex items-start gap-2 text-sm font-medium ${cls}`}>
      {state === 'current' ? <CheckCircle size={18} weight="fill" className="shrink-0" /> : state === 'behind' ? <Warning size={18} weight="fill" className="shrink-0" /> : null}
      {label}
    </p>
  )
}

/* ---------- other cards ---------- */

function DirectoryCard() {
  return (
    <Card icon={<ChartLine size={20} />} title="Program Directory">
      <p className="text-sm leading-relaxed text-muted">
        The free listing is the site's main lead magnet. Claims, reviews, and recent listing edits live in the
        directory's own admin.
      </p>
      <CardLinks
        links={[
          ['Directory admin', 'https://programdirectory.bluestep.net/admin'],
          ['Sign-up page', DIRECTORY_URL],
          ['Explainer page on this site', CTA.directory.href],
        ]}
      />
    </Card>
  )
}

function LeadsCard() {
  return (
    <Card icon={<EnvelopeSimple size={20} />} title="Leads">
      <dl className="grid gap-4 text-sm">
        <div>
          <dt className="font-medium">Demo requests</dt>
          <dd className="mt-1 text-muted">
            The <Link to="/demo" className="text-accent">demo form</Link> emails each request to bpayne@bluestep.net
            through FormSubmit. Nothing is stored on this site.
          </dd>
        </div>
        <div>
          <dt className="font-medium">Analytics</dt>
          <dd className="mt-1 text-muted">
            {analyticsEnabled
              ? 'Google Analytics is on. Visitors see the consent banner.'
              : 'Google Analytics is off. Set the GA4 measurement ID in app/src/analytics.ts to turn it on.'}
          </dd>
        </div>
      </dl>
    </Card>
  )
}

function PagesCard() {
  const seen = new Set<string>()
  const pages: [string, string][] = [['Home', '/']]
  const add = (label: string, href: string) => {
    if (seen.has(href) || href === '/') return
    seen.add(href)
    pages.push([label, href])
  }
  for (const n of NAV) {
    if (isGroup(n)) n.columns.forEach((c) => c.items.forEach((i) => add(i.label === 'Overview' ? `${n.label} overview` : i.label, i.href)))
    else add(n.label, n.href)
  }
  ROLES.forEach((r) => add(r.nav, `/${r.slug}`))
  add('Request a demo', '/demo')
  add('Privacy', '/privacy')
  return (
    <Card icon={<ArrowSquareOut size={20} />} title={`Pages (${pages.length})`}>
      <ul className="grid gap-x-6 gap-y-1.5 text-sm sm:grid-cols-2">
        {pages.map(([label, href]) => (
          <li key={href} className="min-w-0 truncate">
            <a href={href} target="_blank" rel="noopener noreferrer" className="text-ink hover:text-accent">
              {label}
            </a>
            <span className="ml-2 font-mono text-xs text-faint">{href}</span>
          </li>
        ))}
      </ul>
    </Card>
  )
}

/* ---------- backend menu ---------- */

const GROUPS: { heading: string; tools: { label: string; href: string; note?: string }[] }[] = [
  {
    heading: 'Platform',
    tools: [
      { label: 'Relate', href: '/shared/home.jsp?_a=530002___131263' },
      { label: 'Organization Admin', href: '/shared/home.jsp?_a=111020___151457' },
    ],
  },
  {
    heading: 'Inspect',
    tools: [
      { label: 'GraphQL', href: '/shared/graphql.jsp' },
      { label: 'Organization Chart', href: '/shared/admin/organization/orgpop.jsp' },
      { label: 'Organization Tree', href: '/shared/admin/organization/orgpop.jsp?_showAll=true&_hideAdminLinks=true' },
      { label: 'Cache Stats', href: '/admin/cachestatsnew.jsp' },
    ],
  },
  {
    heading: 'This site',
    tools: [
      { label: 'Site Admin API', href: editScript('363769__FID_siteAdminApi'), note: '/b/siteAdmin' },
      { label: 'GitSite repo', href: `https://github.com/${REPO}`, note: 'GitHub' },
      { label: 'Program Directory admin', href: 'https://programdirectory.bluestep.net/admin' },
    ],
  },
  {
    heading: 'Session',
    tools: [{ label: 'Temporary Login', href: '/shared/login/templogin.jsp' }],
  },
]

function BackendMenu() {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('mousedown', onDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        className="btn-ghost gap-1.5 px-3 py-1.5 text-sm"
        aria-haspopup="true"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      >
        <Wrench size={16} />
        Backend
        <CaretDown size={14} className={`transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div role="menu" className="card absolute right-0 top-full z-50 mt-2 w-72 rounded-2xl p-2 shadow-xl">
          {GROUPS.map((g) => (
            <div key={g.heading} className="py-1">
              <p className="px-3 pb-1 pt-2 text-xs font-medium text-faint">{g.heading}</p>
              {g.tools.map((t) => (
                <a
                  key={t.label}
                  role="menuitem"
                  href={t.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between gap-3 rounded-xl px-3 py-2 text-sm hover:bg-raised"
                >
                  <span>{t.label}</span>
                  {t.note ? <span className="font-mono text-xs text-faint">{t.note}</span> : <ArrowSquareOut size={13} className="text-faint" />}
                </a>
              ))}
            </div>
          ))}
          <p className="border-t border-line px-3 pb-1 pt-2 text-xs text-faint">Opens in a new tab. BlueStep enforces access.</p>
        </div>
      )}
    </div>
  )
}

/* ---------- pieces ---------- */

function Shell({ children, bar }: { children: ReactNode; bar?: ReactNode }) {
  return (
    <div className="min-h-screen bg-bg text-ink">
      <header className="border-b border-line bg-surface">
        <Container className="flex h-16 items-center justify-between gap-4">
          <Link to="/" className="flex shrink-0 items-center gap-2.5" aria-label="BlueStep Behavioral home">
            <Logo className="h-6" />
            <span className="rounded-full bg-accent-soft px-2.5 py-0.5 text-xs font-semibold text-accent">Admin</span>
          </Link>
          <div className="flex items-center gap-2">{bar}</div>
        </Container>
      </header>
      <main>{children}</main>
    </div>
  )
}

function StateCard({ icon, title, children }: { icon: ReactNode; title: string; children: ReactNode }) {
  return (
    <Container className="flex justify-center py-24">
      <div className="card w-full max-w-md rounded-2xl p-8 text-center">
        <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-accent-soft text-accent">{icon}</span>
        <h1 className="mt-5 text-2xl font-semibold tracking-tight">{title}</h1>
        <div className="mt-3">{children}</div>
      </div>
    </Container>
  )
}

function Card({ icon, title, children }: { icon: ReactNode; title: string; children: ReactNode }) {
  return (
    <section className="card min-w-0 rounded-2xl p-6 md:p-7">
      <h2 className="mb-5 flex items-center gap-2.5 font-semibold">
        <span className="text-accent">{icon}</span>
        {title}
      </h2>
      {children}
    </section>
  )
}

function CardLinks({ links }: { links: [string, string][] }) {
  return (
    <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm">
      {links.map(([label, href]) =>
        href.startsWith('/') ? (
          <Link key={label} to={href} className="text-accent">
            {label}
          </Link>
        ) : (
          <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-accent">
            {label}
            <ArrowSquareOut size={13} />
          </a>
        ),
      )}
    </div>
  )
}

function MicrosoftMark() {
  return (
    <svg width="16" height="16" viewBox="0 0 21 21" aria-hidden="true">
      <rect x="1" y="1" width="9" height="9" fill="#f25022" />
      <rect x="11" y="1" width="9" height="9" fill="#7fba00" />
      <rect x="1" y="11" width="9" height="9" fill="#00a4ef" />
      <rect x="11" y="11" width="9" height="9" fill="#ffb900" />
    </svg>
  )
}

function ago(iso: string) {
  const mins = Math.round((Date.now() - new Date(iso).getTime()) / 60000)
  if (mins < 60) return `${Math.max(mins, 1)}m ago`
  const hours = Math.round(mins / 60)
  if (hours < 48) return `${hours}h ago`
  return `${Math.round(hours / 24)}d ago`
}
