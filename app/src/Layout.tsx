import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import { CaretDown, Gift, List, X } from '@phosphor-icons/react'
import { BRAND, CTA, NAV, isGroup, type NavGroup } from './site'
import { Container, Logo } from './ui'
import ThemeToggle from './components/ThemeToggle'
import ConsentBanner from './components/ConsentBanner'
import Garden from './components/Garden'
import { analyticsEnabled, openConsent, track, trackPage } from './analytics'

/** Desktop dropdown. Opens on hover or click, closes on outside click, Escape, or navigation. */
function Dropdown({ group }: { group: NavGroup }) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const { pathname } = useLocation()
  const active = group.columns.some((c) => c.items.some((i) => pathname.startsWith(i.href)))
  useEffect(() => setOpen(false), [pathname])
  useEffect(() => {
    if (!open) return
    const onDown = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false)
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
    <div ref={ref} className="relative" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className={`flex items-center gap-1.5 whitespace-nowrap rounded-full px-3 py-1.5 text-sm transition-colors ${
          active ? 'bg-raised text-ink' : 'text-muted hover:text-ink'
        }`}
      >
        {group.label}
        {group.badge && (
          <span className="rounded-full bg-accent px-1.5 py-px text-[10px] font-semibold leading-4 text-accent-ink">
            {group.badge}
          </span>
        )}
        <CaretDown size={12} weight="bold" className={`transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="absolute left-0 top-full pt-2">
          <div
            className={`rise card grid gap-1 p-2 shadow-[0_20px_50px_-20px_rgb(var(--ink)/0.25)] ${
              group.columns.length > 1 ? 'w-[520px] grid-cols-2' : 'w-72'
            }`}
          >
            {group.columns.map((col) => (
              <div key={col.title}>
                {group.columns.length > 1 && (
                  <p className="px-3 pb-1 pt-2 text-xs font-medium text-faint">{col.title}</p>
                )}
                {col.items.map((i) => (
                  <Link key={i.href} to={i.href} className="block rounded-xl px-3 py-2 transition-colors hover:bg-raised">
                    <span className="block text-sm font-medium text-ink">{i.label}</span>
                    {i.hint && <span className="block text-xs text-muted">{i.hint}</span>}
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

function Header() {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()
  useEffect(() => setOpen(false), [pathname])
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  // The mobile menu renders as a sibling of <header>, not a child: the header's
  // backdrop-filter makes it the containing block for fixed children, which would
  // collapse a fixed full-screen menu to the header's 64px.
  return (
    <>
    <header className="sticky top-0 z-40 border-b border-line/80 bg-bg/80 backdrop-blur-md">
      <Container className="flex h-16 items-center justify-between gap-6">
        <Link to="/" className="flex shrink-0 items-center gap-2.5" aria-label={`${BRAND.name} home`}>
          <Logo className="h-6" />
          <span className="border-l border-line pl-2.5 text-sm font-medium text-muted">{BRAND.short}</span>
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-0.5 lg:flex">
          {NAV.map((n) =>
            isGroup(n) ? (
              <Dropdown key={n.label} group={n} />
            ) : (
              <NavLink
                key={n.href}
                to={n.href}
                className={({ isActive }) =>
                  `whitespace-nowrap rounded-full px-3 py-1.5 text-sm transition-colors ${
                    isActive ? 'bg-raised text-ink' : 'text-muted hover:text-ink'
                  }`
                }
              >
                {n.label}
              </NavLink>
            ),
          )}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Link
            to={CTA.directory.href}
            className="btn hidden gap-1.5 whitespace-nowrap border border-accent/30 bg-accent-soft px-4 py-2 text-accent hover:border-accent md:inline-flex"
          >
            <Gift size={16} weight="bold" />
            <span className="xl:hidden">Free listing</span>
            <span className="hidden xl:inline">{CTA.directory.label}</span>
          </Link>
          <Link to={CTA.demo.href} className="btn-primary hidden whitespace-nowrap px-4 py-2 sm:inline-flex">
            {CTA.demo.label}
          </Link>
          <button
            type="button"
            className="-mr-2 rounded-full p-2 text-ink lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X size={22} /> : <List size={22} />}
          </button>
        </div>
      </Container>
    </header>

      {open && (
        <div id="mobile-nav" className="fixed inset-x-0 bottom-0 top-16 z-40 overflow-y-auto bg-bg lg:hidden">
          <Container className="py-6">
            {NAV.map((n) =>
              isGroup(n) ? (
                <details key={n.label} className="group border-b border-line">
                  <summary className="flex cursor-pointer list-none items-center justify-between py-4 text-xl font-medium tracking-tight">
                    <span className="flex items-center gap-2">
                      {n.label}
                      {n.badge && (
                        <span className="rounded-full bg-accent px-2 py-0.5 text-xs font-semibold text-accent-ink">{n.badge}</span>
                      )}
                    </span>
                    <CaretDown size={16} className="transition-transform group-open:rotate-180" />
                  </summary>
                  <div className="pb-4">
                    {n.columns.map((col) => (
                      <div key={col.title} className="mb-2">
                        {n.columns.length > 1 && <p className="pb-1 pl-1 pt-2 text-xs font-medium text-faint">{col.title}</p>}
                        {col.items.map((i) => (
                          <Link key={i.href} to={i.href} className="block py-2 pl-1 text-base text-muted">
                            {i.label}
                          </Link>
                        ))}
                      </div>
                    ))}
                  </div>
                </details>
              ) : (
                <NavLink key={n.href} to={n.href} className="block border-b border-line py-4 text-xl font-medium tracking-tight">
                  {n.label}
                </NavLink>
              ),
            )}
            <ThemeToggle withLabel className="mt-6 -ml-2" />
            <div className="mt-6 flex flex-col gap-3">
              <Link
                to={CTA.directory.href}
                className="btn gap-2 border border-accent/30 bg-accent-soft py-3 text-base text-accent"
              >
                <Gift size={18} weight="bold" />
                {CTA.directory.label}
              </Link>
              <Link to={CTA.demo.href} className="btn-primary py-3 text-base">
                {CTA.demo.label}
              </Link>
              <Link to={CTA.build.href} className="btn-ghost py-3 text-base">
                {CTA.build.label}
              </Link>
            </div>
          </Container>
        </div>
      )}
    </>
  )
}

function Footer() {
  const columns = NAV.filter(isGroup).flatMap((g) => g.columns)
  return (
    <footer className="border-t border-line bg-surface">
      <Container className="grid gap-12 py-16 md:grid-cols-[1.4fr_repeat(4,1fr)]">
        <div>
          <Logo className="h-7" />
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-muted">
            One record for every part of the stay, from the first call to discharge.
          </p>
          <Link to={CTA.demo.href} className="btn-primary mt-6">
            {CTA.demo.label}
          </Link>
        </div>
        {columns.map((g) => (
          <div key={g.title}>
            <h3 className="text-sm font-medium text-ink">{g.title}</h3>
            <ul className="mt-4 space-y-2.5">
              {g.items.map((l) => (
                <li key={l.href}>
                  <Link to={l.href} className="text-sm text-muted transition-colors hover:text-ink">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <div>
          <h3 className="text-sm font-medium text-ink">Company</h3>
          <ul className="mt-4 space-y-2.5">
            {[
              ['/pricing', 'Pricing'],
              ['/build#trust', 'Security'],
              ['/demo', 'Contact'],
            ].map(([to, label]) => (
              <li key={label}>
                <Link to={to} className="text-sm text-muted transition-colors hover:text-ink">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
      <Container className="flex flex-col gap-2 border-t border-line py-6 text-xs text-faint sm:flex-row sm:justify-between">
        <span>
          &copy; {new Date().getFullYear()} {BRAND.legal}. All rights reserved.
        </span>
        <span className="flex flex-wrap gap-x-5 gap-y-2">
          <span>HIPAA-ready hosting. We sign a BAA with every program.</span>
          <Link to="/privacy" className="transition-colors hover:text-ink">
            Privacy
          </Link>
          {analyticsEnabled && (
            <button type="button" onClick={openConsent} className="transition-colors hover:text-ink">
              Cookie settings
            </button>
          )}
        </span>
      </Container>
    </footer>
  )
}

/** Scrolls to the top on route change, or to the #hash target when there is one. */
function ScrollManager() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1))
      if (el) {
        el.scrollIntoView()
        return
      }
    }
    window.scrollTo(0, 0)
  }, [pathname, hash])
  return null
}

/**
 * Sends a GA page_view on every route change (the SPA never reloads), and a cta_click
 * for buttons and demo links. Rendered after <main> so the page's useTitle effect has
 * already run and document.title is the new page's. The ref drops StrictMode's dev-only
 * second run.
 */
function RouteTracker() {
  const { pathname, search } = useLocation()
  const last = useRef('')
  useEffect(() => {
    const url = pathname + search
    if (!analyticsEnabled || last.current === url) return
    last.current = url
    trackPage()
  }, [pathname, search])

  useEffect(() => {
    if (!analyticsEnabled) return
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest?.('a')
      if (!a || a.origin !== window.location.origin) return
      if (!a.matches('.btn, .btn-primary, .btn-ghost') && !a.pathname.startsWith('/demo')) return
      track('cta_click', {
        link_text: (a.textContent ?? '').trim().slice(0, 100),
        link_url: a.pathname + a.search,
        cta_section: a.closest<HTMLElement>('[data-track-section]')?.dataset.trackSection ?? 'page',
        from_path: window.location.pathname,
      })
    }
    // Capture phase: runs before the router navigates, so from_path is the page clicked on.
    document.addEventListener('click', onClick, true)
    return () => document.removeEventListener('click', onClick, true)
  }, [])
  return null
}

export default function Layout() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-surface focus:px-4 focus:py-2"
      >
        Skip to content
      </a>
      <ScrollManager />
      <Header />
      <main id="main">
        <Outlet />
      </main>
      <Footer />
      <RouteTracker />
      <ConsentBanner />
      <Garden />
    </>
  )
}
