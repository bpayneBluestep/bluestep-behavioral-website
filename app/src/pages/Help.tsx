import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, MagnifyingGlass } from '@phosphor-icons/react'
import { Container, useTitle } from '../ui'
import { HELP_AREAS, helpPath, type HelpArea } from '../data/help'
import { useNoIndex } from './slate/guide'

// Help center landing (/help). Unlisted for now: shared by link, noindex, not in
// the nav. Each product area is a card; live areas link to their guide, planned
// ones show "Coming soon". Areas and topics come from data/help.ts.

function AreaCard({ area }: { area: HelpArea }) {
  const Icon = area.icon
  const live = area.status === 'live'
  const head = (
    <div className="flex items-start gap-4">
      <span
        className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl ${
          live ? 'bg-accent-soft text-accent' : 'bg-raised text-faint'
        }`}
      >
        <Icon size={22} weight="duotone" />
      </span>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <h2 className={`text-lg font-semibold tracking-tight ${live ? 'text-ink' : 'text-muted'}`}>{area.name}</h2>
          {!live && (
            <span className="rounded-full border border-line px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-faint">
              Coming soon
            </span>
          )}
        </div>
        <p className="mt-1 text-sm text-muted">{area.blurb}</p>
      </div>
    </div>
  )

  if (!live) {
    return (
      <div className="card flex flex-col p-6">
        {head}
        <ul className="mt-5 space-y-1.5 border-t border-line pt-4 text-sm text-faint">
          {area.topics.map((t) => (
            <li key={t.label}>{t.label}</li>
          ))}
        </ul>
      </div>
    )
  }

  return (
    <div className="card flex flex-col p-6 transition hover:border-accent/50">
      {head}
      <ul className="mt-5 grid gap-1.5 border-t border-line pt-4 text-sm">
        {area.topics.slice(0, 6).map((t) => (
          <li key={t.label}>
            <Link to={helpPath(area.slug, t.anchor)} className="text-accent underline-offset-2 hover:underline">
              {t.label}
            </Link>
          </li>
        ))}
      </ul>
      <Link
        to={helpPath(area.slug)}
        className="group mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-medium text-ink"
      >
        Open the {area.name} guide
        <ArrowRight size={14} weight="bold" className="transition-transform group-hover:translate-x-0.5" />
      </Link>
    </div>
  )
}

export default function Help() {
  useTitle('Help center')
  useNoIndex()
  const [q, setQ] = useState('')
  const needle = q.trim().toLowerCase()

  // Search covers live topics only: those are the ones with somewhere to go.
  const results = useMemo(() => {
    if (!needle) return []
    return HELP_AREAS.filter((a) => a.status === 'live').flatMap((a) =>
      a.topics
        .filter((t) => `${a.name} ${t.label} ${t.audience ?? ''}`.toLowerCase().includes(needle))
        .map((t) => ({ area: a, topic: t })),
    )
  }, [needle])

  const live = HELP_AREAS.filter((a) => a.status === 'live')
  const soon = HELP_AREAS.filter((a) => a.status === 'soon')

  return (
    <>
      <section className="border-b border-line">
        <Container className="pb-14 pt-14 md:pb-20 md:pt-20">
          <div className="rise max-w-3xl">
            <p className="kicker mb-5">Help center</p>
            <h1 className="text-4xl font-semibold leading-[1.05] tracking-tightest md:text-6xl">How can we help?</h1>
            <p className="prose-body mt-6 max-w-[56ch]">
              Step-by-step guides for every part of BlueStep, organised by the job you're doing. Pick an area below, or search
              for a task.
            </p>
            <div className="relative mt-9 max-w-xl">
              <MagnifyingGlass size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-faint" />
              <input
                type="search"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search for a task, like “post final grades”"
                aria-label="Search the help center"
                className="w-full rounded-full border border-line bg-surface py-3 pl-11 pr-5 text-base text-ink shadow-sm placeholder:text-faint"
              />
            </div>
          </div>

          {needle && (
            <div className="mt-6 max-w-xl" aria-live="polite">
              {results.length ? (
                <ul className="card divide-y divide-line">
                  {results.map(({ area, topic }) => (
                    <li key={`${area.slug}-${topic.label}`}>
                      <Link
                        to={helpPath(area.slug, topic.anchor)}
                        className="flex items-center justify-between gap-4 px-5 py-3 transition hover:bg-raised"
                      >
                        <span>
                          <span className="block font-medium text-ink">{topic.label}</span>
                          <span className="block text-xs text-muted">
                            {area.name}
                            {topic.audience && ` · ${topic.audience}`}
                          </span>
                        </span>
                        <ArrowRight size={16} className="shrink-0 text-faint" />
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-muted">
                  No guides match “{q.trim()}” yet. More areas are on the way.
                </p>
              )}
            </div>
          )}
        </Container>
      </section>

      <Container className="py-14 md:py-20">
        <p className="kicker mb-5">Available now</p>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {live.map((a) => (
            <AreaCard key={a.slug} area={a} />
          ))}
        </div>

        {soon.length > 0 && (
          <>
            <p className="kicker mb-5 mt-14">On the way</p>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {soon.map((a) => (
                <AreaCard key={a.slug} area={a} />
              ))}
            </div>
          </>
        )}

        <p className="mt-16 max-w-[60ch] text-sm text-muted">
          Can't find what you need? Ask your BlueStep administrator, or reach out to your BlueStep contact.
        </p>
      </Container>
    </>
  )
}
