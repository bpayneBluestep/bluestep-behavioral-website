import { useEffect, useState, type ReactNode } from 'react'
import { Check, Copy } from '@phosphor-icons/react'
import { Container } from '../../ui'

// Shared building blocks for the unlisted Slate guides (/slate/setup and
// /slate/first-builds). Both are shared by link, never in the nav, and noindex.

export const REPO = 'https://github.com/Bluestep-Systems/bluestep-ai'
export const GET_STARTED = `${REPO}#get-started`

/** Keep an unlisted page out of search results. */
export function useNoIndex() {
  useEffect(() => {
    const meta = document.createElement('meta')
    meta.name = 'robots'
    meta.content = 'noindex, nofollow'
    document.head.appendChild(meta)
    return () => meta.remove()
  }, [])
}

/** Inline code. */
export function C({ children }: { children: ReactNode }) {
  return <code className="rounded bg-surface px-1.5 py-0.5 font-mono text-[0.85em] text-ink">{children}</code>
}

export function A({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noreferrer" className="text-accent underline underline-offset-2">
      {children}
    </a>
  )
}

/** A copyable block: commands and prompts people paste. */
export function Code({ children }: { children: string }) {
  const [copied, setCopied] = useState(false)
  const copy = () => {
    navigator.clipboard?.writeText(children).then(
      () => {
        setCopied(true)
        setTimeout(() => setCopied(false), 1500)
      },
      () => {},
    )
  }
  return (
    <div className="relative my-3">
      <pre className="overflow-x-auto rounded-xl border border-line bg-surface px-4 py-3 pr-12 font-mono text-[13px] leading-relaxed text-ink">
        {children}
      </pre>
      <button
        type="button"
        onClick={copy}
        aria-label={copied ? 'Copied' : 'Copy'}
        className="absolute right-2 top-2 rounded-lg p-2 text-muted transition hover:bg-raised hover:text-ink"
      >
        {copied ? <Check size={16} weight="bold" /> : <Copy size={16} />}
      </button>
    </div>
  )
}

export function Part({ id, n, title, lead, children }: { id: string; n: string; title: string; lead?: ReactNode; children: ReactNode }) {
  return (
    <section id={id} className="scroll-mt-24 border-t border-line py-12 first:border-t-0">
      <p className="kicker mb-3">{n}</p>
      <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">{title}</h2>
      {lead && <p className="mt-4 leading-relaxed text-muted">{lead}</p>}
      <div className="mt-6 space-y-4 leading-relaxed text-muted [&_strong]:font-medium [&_strong]:text-ink">{children}</div>
    </section>
  )
}

export function Steps({ children }: { children: ReactNode }) {
  return <ol className="space-y-5 [counter-reset:step]">{children}</ol>
}

export function Step({ title, tag, children }: { title: ReactNode; tag?: string; children?: ReactNode }) {
  return (
    <li className="relative pl-10 [counter-increment:step] before:absolute before:left-0 before:top-0 before:flex before:h-7 before:w-7 before:items-center before:justify-center before:rounded-full before:border before:border-line before:font-mono before:text-xs before:text-ink before:content-[counter(step)]">
      <p className="font-medium text-ink">
        {title}
        {tag && (
          <span className="ml-2 rounded-full border border-line px-2 py-0.5 align-middle text-[10px] font-medium uppercase tracking-wider text-muted">
            {tag}
          </span>
        )}
      </p>
      {children && <div className="mt-1.5 space-y-2">{children}</div>}
    </li>
  )
}

export function Callout({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-2xl border border-accent/30 bg-accent-soft/40 px-5 py-4 text-ink [&_strong]:font-semibold">
      {children}
    </div>
  )
}

export function Done({ children }: { children: ReactNode }) {
  return (
    <p className="rounded-2xl border border-line bg-surface px-5 py-4">
      <strong>Done when:</strong> {children}
    </p>
  )
}

export function Table({ head, rows }: { head: string[]; rows: ReactNode[][] }) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-line">
      <table className="w-full text-left text-sm">
        <thead className="bg-surface text-ink">
          <tr>
            {head.map((h) => (
              <th key={h} className="px-4 py-3 font-medium">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className="border-t border-line align-top">
              {r.map((c, j) => (
                <td key={j} className={`px-4 py-3 ${j === 0 ? 'font-medium text-ink' : 'text-muted'}`}>
                  {c}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

/** Page body: a sticky table of contents on wide screens, the parts beside it. */
export function GuideBody({ toc, children }: { toc: readonly (readonly [string, string])[]; children: ReactNode }) {
  return (
    <Container className="pb-24 md:pb-32">
      <div className="grid grid-cols-[minmax(0,1fr)] gap-12 lg:grid-cols-[200px_minmax(0,1fr)]">
        <nav aria-label="On this page" className="hidden lg:block">
          <ul className="sticky top-24 space-y-2 pt-12 text-sm">
            {toc.map(([id, label]) => (
              <li key={id}>
                <a href={`#${id}`} className="text-muted hover:text-ink">
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="min-w-0 max-w-3xl">{children}</div>
      </div>
    </Container>
  )
}
