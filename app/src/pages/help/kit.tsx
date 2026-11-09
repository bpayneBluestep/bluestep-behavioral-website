import { createContext, useContext, useEffect, useRef, useState, type ReactNode, type RefObject } from 'react'
import { Link } from 'react-router-dom'
import { CaretLeft, X } from '@phosphor-icons/react'
import { Container, asset } from '../../ui'

// Shared building blocks for help-center guides (/help/<area>). A guide page
// supplies its table of contents, its screenshot folder and its sections; the
// layout, numbered callouts, lightbox and contents nav live here.
// Orange is reserved for the numbered callouts, so a "2" in the text always
// matches the "2" drawn on the screenshot.

export type TocItem = { id: string; label: string; sub?: boolean }
export type TocGroup = { group: string; items: TocItem[] }
export type GuidePath = { title: string; links: [string, string][] }

/** Screenshot folder for the current guide: images/<folder>/<name>.jpg */
const ImgFolder = createContext('')

/** An orange callout number that matches the one drawn on the screenshot. */
export function N({ children, inline = false }: { children: ReactNode; inline?: boolean }) {
  return (
    <span
      className={`inline-grid shrink-0 place-items-center rounded-full bg-[#e8590c] font-semibold leading-none text-white dark:bg-[#ff8a4c] dark:text-[#1a0d05] ${
        inline ? 'mx-0.5 h-5 w-5 align-[1px] text-[11px]' : 'mt-0.5 h-6 w-6 text-[13px]'
      }`}
    >
      {children}
    </span>
  )
}

/** A UI label: a button or menu name as it appears on screen. */
export function U({ children }: { children: ReactNode }) {
  return <span className="font-semibold text-ink">{children}</span>
}

/** A key or typed character. */
export function K({ children }: { children: ReactNode }) {
  return (
    <kbd className="whitespace-nowrap rounded-md border border-b-2 border-line bg-raised px-1.5 font-sans text-[0.9em] font-medium text-ink">
      {children}
    </kbd>
  )
}

export function NSteps({ children }: { children: ReactNode }) {
  return <ol className="my-4 grid gap-3">{children}</ol>
}

export function NStep({ n, children }: { n: number; children: ReactNode }) {
  return (
    <li className="grid grid-cols-[28px_minmax(0,1fr)] items-start gap-3">
      <N>{n}</N>
      <div>{children}</div>
    </li>
  )
}

export function Tip({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="my-5 max-w-[70ch] rounded-2xl border border-accent/30 bg-accent-soft/40 px-5 py-4 text-[15px] text-ink">
      <strong className="font-semibold">{title}</strong> {children}
    </div>
  )
}

export function Note({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="my-5 max-w-[70ch] rounded-2xl border border-line bg-raised px-5 py-4 text-[15px] text-ink">
      <strong className="font-semibold">{title}</strong> {children}
    </div>
  )
}

export function Who({ roles, children }: { roles: string[]; children?: ReactNode }) {
  return (
    <div className="flex flex-wrap items-center gap-2 text-sm text-muted">
      {roles.map((r) => (
        <span key={r} className="rounded-full bg-accent-soft px-3 py-0.5 text-[13px] font-medium text-accent">
          {r}
        </span>
      ))}
      {children}
    </div>
  )
}

export function Shot({
  src,
  alt,
  w,
  h,
  narrow,
  caption,
}: {
  src: string
  alt: string
  w: number
  h: number
  narrow?: boolean
  caption: ReactNode
}) {
  const url = asset(`images/${useContext(ImgFolder)}/${src}.jpg`)
  return (
    <figure className="my-6">
      <button
        type="button"
        data-zoom
        data-src={url}
        data-alt={alt}
        className={`block max-w-full cursor-zoom-in overflow-hidden rounded-xl border border-line bg-white shadow-[0_6px_22px_rgba(15,40,70,0.10)] ${
          narrow ? 'sm:max-w-[560px]' : ''
        }`}
      >
        <img src={url} alt={alt} width={w} height={h} loading="lazy" className="block h-auto max-w-full" />
      </button>
      <figcaption className="mt-2 max-w-[70ch] text-sm text-muted">{caption}</figcaption>
    </figure>
  )
}

export function Flow({
  id,
  eyebrow,
  title,
  lede,
  who,
  children,
}: {
  id: string
  eyebrow: string
  title: string
  lede?: ReactNode
  who?: ReactNode
  children: ReactNode
}) {
  return (
    <section id={id} className="scroll-mt-24 border-t border-line py-12 first:border-t-0 first:pt-12">
      <header className="grid gap-3">
        <p className="kicker">{eyebrow}</p>
        <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">{title}</h2>
        {lede && <p className="prose-body max-w-[64ch]">{lede}</p>}
        {who}
      </header>
      <div className="mt-6 space-y-4 leading-relaxed text-muted [&_b]:font-semibold [&_b]:text-ink [&_li]:max-w-[68ch] [&_ol.plain]:list-decimal [&_ol.plain]:space-y-1.5 [&_ol.plain]:pl-5 [&_p]:max-w-[68ch] [&_ul]:list-disc [&_ul]:space-y-1.5 [&_ul]:pl-5 [&_ul_ul]:mt-1.5">
        {children}
      </div>
    </section>
  )
}

export function H3({ id, children }: { id: string; children: ReactNode }) {
  return (
    <h3 id={id} className="scroll-mt-24 pt-6 text-xl font-semibold tracking-tight text-ink">
      {children}
    </h3>
  )
}

export function Faq({ q, children }: { q: string; children: ReactNode }) {
  return (
    <details className="group border-b border-line py-3">
      <summary className="cursor-pointer font-medium text-ink">{q}</summary>
      <p className="mt-2">{children}</p>
    </details>
  )
}

/** An in-page link to another section. */
export function To({ id, children }: { id: string; children: ReactNode }) {
  return (
    <a href={`#${id}`} className="text-accent underline underline-offset-2">
      {children}
    </a>
  )
}

/** A bordered reference table. head = column headings; children = <tr> rows. */
export function Table({ head, minW = 640, children }: { head: string[]; minW?: number; children: ReactNode }) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-line">
      <table className="w-full text-left text-sm" style={{ minWidth: minW }}>
        <thead className="bg-surface text-ink">
          <tr>
            {head.map((h) => (
              <th key={h} scope="col" className="px-4 py-3 font-medium">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="[&_td]:px-4 [&_td]:py-3 [&_th]:px-4 [&_th]:py-3 [&_th]:font-medium [&_th]:text-ink [&_tr]:border-t [&_tr]:border-line [&_tr]:align-top">
          {children}
        </tbody>
      </table>
    </div>
  )
}

/* ── Table of contents ───────────────────────────────────────────────────── */

function Toc({
  toc,
  active,
  search,
  onJump,
}: {
  toc: TocGroup[]
  active?: string
  search?: boolean
  onJump?: () => void
}) {
  const [q, setQ] = useState('')
  const needle = q.trim().toLowerCase()
  return (
    <div>
      {search && (
        <input
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Find a task…"
          aria-label="Find a task"
          className="mb-3 w-full rounded-xl border border-line bg-surface px-3 py-2 text-sm text-ink placeholder:text-faint"
        />
      )}
      {toc.map(({ group, items }) => {
        const shown = needle ? items.filter((i) => i.label.toLowerCase().includes(needle)) : items
        if (!shown.length) return null
        return (
          <div key={group}>
            <p className="mb-2 mt-5 font-mono text-[11px] uppercase tracking-[0.12em] text-faint first:mt-0">{group}</p>
            <ul className="grid gap-px">
              {shown.map((i) => (
                <li key={i.id}>
                  <a
                    href={`#${i.id}`}
                    onClick={onJump}
                    className={`block rounded-lg border-l-2 py-1 pr-2 transition ${i.sub ? 'pl-5 text-[13px]' : 'pl-2.5 text-sm'} ${
                      active === i.id
                        ? 'border-accent bg-accent-soft font-medium text-accent'
                        : `border-transparent hover:bg-raised hover:text-ink ${i.sub ? 'text-faint' : 'text-muted'}`
                    }`}
                  >
                    {i.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )
      })}
    </div>
  )
}

function useActiveSection(ids: string[]) {
  const [active, setActive] = useState<string>(ids[0])
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY + 120
      let cur = ids[0]
      for (const id of ids) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top + window.scrollY <= y) cur = id
      }
      setActive(cur)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [ids])
  return active
}

/* ── Lightbox ────────────────────────────────────────────────────────────── */

function useLightbox(root: RefObject<HTMLElement>) {
  const [shot, setShot] = useState<{ src: string; alt: string } | null>(null)
  const last = useRef<HTMLElement | null>(null)
  useEffect(() => {
    const el = root.current
    if (!el) return
    const onClick = (e: MouseEvent) => {
      const b = (e.target as HTMLElement).closest<HTMLElement>('[data-zoom]')
      if (!b) return
      last.current = b
      setShot({ src: b.dataset.src ?? '', alt: b.dataset.alt ?? '' })
    }
    el.addEventListener('click', onClick)
    return () => el.removeEventListener('click', onClick)
  }, [root])
  useEffect(() => {
    if (!shot) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && close()
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  })
  const close = () => {
    setShot(null)
    last.current?.focus()
  }
  return (
    shot && (
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Screenshot, enlarged"
        onClick={(e) => (e.target as HTMLElement).tagName !== 'IMG' && close()}
        className="fixed inset-0 z-[60] flex cursor-zoom-out items-center justify-center bg-[rgba(5,12,22,0.86)] p-4"
      >
        <img src={shot.src} alt={shot.alt} className="max-h-full max-w-full rounded-lg bg-white" />
        <button
          type="button"
          autoFocus
          onClick={close}
          aria-label="Close"
          className="absolute right-3 top-3 grid h-10 w-10 place-items-center rounded-full bg-white text-[#142235]"
        >
          <X size={20} weight="bold" />
        </button>
      </div>
    )
  )
}

/* ── Page shell ──────────────────────────────────────────────────────────── */

export function GuideLayout({
  kicker,
  title,
  intro,
  paths,
  toc,
  imgFolder,
  footer,
  children,
}: {
  kicker: string
  title: string
  intro: ReactNode
  paths: GuidePath[]
  toc: TocGroup[]
  imgFolder: string
  footer: ReactNode
  children: ReactNode
}) {
  const [ids] = useState(() => toc.flatMap((g) => g.items.map((i) => i.id)))
  const active = useActiveSection(ids)
  const mainRef = useRef<HTMLElement>(null)
  const lightbox = useLightbox(mainRef)
  const [mobileOpen, setMobileOpen] = useState(false)

  // Land on the section named in the link once the page has laid out.
  useEffect(() => {
    if (/^#[\w.~-]+$/.test(location.hash)) {
      const t = document.getElementById(location.hash.slice(1))
      if (t) setTimeout(() => t.scrollIntoView(), 60)
    }
  }, [])

  return (
    <ImgFolder.Provider value={imgFolder}>
      <section className="border-b border-line">
        <Container className="pb-14 pt-14 md:pb-20 md:pt-20">
          <div className="rise max-w-3xl">
            <Link to="/help" className="mb-6 inline-flex items-center gap-1 text-sm text-muted transition hover:text-ink">
              <CaretLeft size={14} weight="bold" />
              Help center
            </Link>
            <p className="kicker mb-5">{kicker}</p>
            <h1 className="text-4xl font-semibold leading-[1.05] tracking-tightest md:text-6xl">{title}</h1>
            <p className="prose-body mt-6 max-w-[62ch]">{intro}</p>
          </div>
          <div className="mt-10 grid gap-3 sm:grid-cols-3" aria-label="Start here">
            {paths.map((p) => (
              <div key={p.title} className="card p-5">
                <p className="font-medium text-ink">{p.title}</p>
                <ul className="mt-2 grid gap-1 text-[15px]">
                  {p.links.map(([id, label]) => (
                    <li key={id}>
                      <a href={`#${id}`} className="text-accent underline-offset-2 hover:underline">
                        {label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <Container className="pb-24 md:pb-32">
        <div className="grid grid-cols-[minmax(0,1fr)] gap-12 lg:grid-cols-[230px_minmax(0,1fr)]">
          <nav aria-label="Contents" className="hidden lg:block">
            <div className="sticky top-24 max-h-[calc(100vh-7rem)] overflow-auto pb-6 pr-1 pt-12">
              <Toc toc={toc} active={active} search />
            </div>
          </nav>

          <main ref={mainRef} className="min-w-0 max-w-4xl">
            <details
              open={mobileOpen}
              onToggle={(e) => setMobileOpen((e.target as HTMLDetailsElement).open)}
              className="card mt-8 px-5 py-3 lg:hidden"
            >
              <summary className="cursor-pointer font-medium text-ink">Contents</summary>
              <div className="mt-3 pb-2">
                <Toc toc={toc} onJump={() => setMobileOpen(false)} />
              </div>
            </details>
            {children}
            <p className="pt-4 text-center text-sm text-faint">{footer}</p>
          </main>
        </div>
      </Container>
      {lightbox}
    </ImgFolder.Provider>
  )
}
