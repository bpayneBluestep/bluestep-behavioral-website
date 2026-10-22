import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { CheckCircle, MagnifyingGlass, Plus, Storefront } from '@phosphor-icons/react'
import { CATEGORIES, LISTINGS, LISTING_CONTENTS, type Category } from '../data/marketplace'
import { CTA } from '../site'
import { ClosingCTA, Container, Heading, OnAccentButton, PageHero, Reveal, useTitle } from '../ui'

type Filter = 'All' | Category

function Catalog() {
  const [filter, setFilter] = useState<Filter>('All')
  const [q, setQ] = useState('')

  const shown = useMemo(() => {
    const needle = q.trim().toLowerCase()
    return LISTINGS.filter(
      (l) =>
        (filter === 'All' || l.category === filter) &&
        (!needle || `${l.name} ${l.summary} ${l.category}`.toLowerCase().includes(needle)),
    )
  }, [filter, q])

  return (
    <section className="py-16 md:py-24">
      <Container>
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="rail -mx-5 flex gap-2 overflow-x-auto px-5 md:mx-0 md:px-0" role="tablist" aria-label="Category">
            {(['All', ...CATEGORIES] as Filter[]).map((c) => (
              <button
                key={c}
                role="tab"
                aria-selected={filter === c}
                onClick={() => setFilter(c)}
                className={`shrink-0 rounded-full border px-4 py-1.5 text-sm transition-colors ${
                  filter === c
                    ? 'border-ink bg-ink text-bg'
                    : 'border-line bg-surface text-muted hover:border-faint hover:text-ink'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
          <label className="relative block md:w-72">
            <span className="sr-only">Search the marketplace</span>
            <MagnifyingGlass size={16} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-faint" />
            <input
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search features"
              className="w-full rounded-full border border-line bg-surface py-2 pl-10 pr-4 text-sm text-ink placeholder:text-faint focus:border-accent focus:outline-none"
            />
          </label>
        </div>

        {shown.length === 0 ? (
          <div className="mt-12 rounded-2xl border border-dashed border-line px-6 py-16 text-center">
            <Storefront size={32} className="mx-auto text-faint" />
            <p className="mt-4 font-medium">Nothing matches that yet.</p>
            <p className="mt-1 text-sm text-muted">
              Describe it to your AI and build it yourself. Then publish it here for the next program.
            </p>
          </div>
        ) : (
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {shown.map((l, i) => (
              <Reveal as="li" key={l.slug} delay={(i % 6) * 50}>
                <article id={l.slug} className="card flex h-full scroll-mt-24 flex-col p-6">
                  <div className="flex items-center justify-between text-xs">
                    <span className="rounded-full bg-raised px-2.5 py-1 font-medium text-muted">{l.category}</span>
                    <span className="font-medium text-accent">{l.price}</span>
                  </div>
                  <h3 className="mt-6 text-lg font-semibold tracking-tight">{l.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{l.summary}</p>
                  <ul className="mt-5 space-y-1.5">
                    {l.uses.map((u) => (
                      <li key={u} className="flex items-center gap-2 text-sm">
                        <CheckCircle size={15} weight="fill" className="shrink-0 text-accent" />
                        {u}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-auto pt-6 text-xs text-faint">
                    by {l.publisher}. Built on {l.builtOn === 'Slate' ? 'Slate' : 'Blueprint'}.
                  </p>
                </article>
              </Reveal>
            ))}
            {filter === 'All' && !q && (
              <li>
                <Link
                  to="/demo?path=publish"
                  className="flex h-full min-h-[260px] flex-col items-center justify-center rounded-2xl border border-dashed border-line p-6 text-center transition-colors hover:border-accent"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-accent-soft text-accent">
                    <Plus size={20} weight="bold" />
                  </span>
                  <p className="mt-4 font-medium">Your feature here</p>
                  <p className="mt-1 max-w-[24ch] text-sm text-muted">Publish what your team built.</p>
                </Link>
              </li>
            )}
          </ul>
        )}
      </Container>
    </section>
  )
}

export default function Marketplace() {
  useTitle('Marketplace')
  return (
    <>
      <PageHero
        kicker="Marketplace"
        title="Take a feature. Make it yours."
        sub="Features built for real behavioral health programs. Pick one, and your AI rebuilds it to fit the way your program already works."
      />

      <Catalog />

      <section className="border-y border-line bg-surface py-24 md:py-32">
        <Container className="grid gap-14 lg:grid-cols-[1fr_1.3fr] lg:gap-20">
          <Heading
            title="More than code."
            sub="Code alone breaks on a system it was not written for. Every listing ships with what your AI needs to rebuild it on yours."
          />
          <div className="grid gap-4 sm:grid-cols-2">
            {LISTING_CONTENTS.map((c, i) => (
              <Reveal key={c.title} delay={i * 60} className="card p-6">
                <h3 className="font-semibold">{c.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{c.body}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-24 md:py-32">
        <Container className="grid items-start gap-14 lg:grid-cols-2 lg:gap-20">
          <Heading
            title="Sell what you build."
            sub="Builders can publish to the marketplace and set their own price. The next program gets a head start. You get paid for the work you already did."
          />
          <div className="space-y-5">
            {[
              ['You set the price', 'Free, or whatever your work is worth. Paid listings are licensed per program.'],
              ['We review every listing', 'Before anything is published, we check what it touches: outside connections, data access, and permission changes.'],
              ['Clinical logic is labeled', 'Anything that touches medications or risk is marked for clinical review before use.'],
              ['Behavioral health only', 'This marketplace is curated for residential and outpatient behavioral health only.'],
            ].map(([t, b], i) => (
              <Reveal key={t} delay={i * 60} className="border-b border-line pb-5 last:border-0">
                <h3 className="font-semibold">{t}</h3>
                <p className="mt-1.5 leading-relaxed text-muted">{b}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <ClosingCTA
        title="Take a feature, or publish one."
        sub="Start with what is here. Publish what you build."
      >
        <OnAccentButton to={CTA.build.href} solid>
          {CTA.build.label}
        </OnAccentButton>
        <OnAccentButton to="/demo?path=publish">Publish a feature</OnAccentButton>
      </ClosingCTA>
    </>
  )
}
