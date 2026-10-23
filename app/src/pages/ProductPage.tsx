import { Link, useParams } from 'react-router-dom'
import { ArrowRight, Check, Sparkle } from '@phosphor-icons/react'
import { PRODUCTS } from '../data/products'
import { CTA } from '../site'
import { Button, ClosingCTA, Container, OnAccentButton, Reveal, asset, useTitle } from '../ui'
import NotFound from './NotFound'

export default function ProductPage() {
  const { slug } = useParams()
  const product = PRODUCTS.find((p) => p.slug === slug)
  useTitle(product?.name ?? 'Page not found')
  if (!product) return <NotFound />
  const others = PRODUCTS.filter((p) => p.slug !== product.slug)
  const Icon = product.icon

  return (
    <>
      <section className="border-b border-line">
        <Container className="grid items-center gap-12 pb-16 pt-12 md:pt-16 lg:grid-cols-[1.05fr_1fr] lg:gap-16 lg:pb-24">
          <div className="rise">
            <p className="mb-5 flex items-center gap-2 text-sm font-medium text-accent">
              <Icon size={18} weight="bold" />
              {product.name}
            </p>
            <h1 className="text-4xl font-semibold leading-[1.05] tracking-tightest md:text-[3.4rem]">{product.headline}</h1>
            <p className="prose-body mt-6 max-w-[52ch]">{product.sub}</p>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Button to={CTA.demo.href} arrow>
                {CTA.demo.label}
              </Button>
              <Link to="/pricing" className="px-2 text-sm text-muted hover:text-ink">
                {product.price}
              </Link>
            </div>
          </div>
          <img
            src={asset(product.image)}
            alt={product.alt}
            className="rise aspect-[4/3] w-full rounded-2xl object-cover [animation-delay:120ms]"
          />
        </Container>
      </section>

      <section className="py-20 md:py-28">
        <Container className="grid gap-14 lg:grid-cols-[240px_1fr] lg:gap-20">
          <nav aria-label={`${product.name} sections`} className="hidden lg:block">
            <ul className="sticky top-28 space-y-1 border-l border-line">
              {product.sections.map((s, i) => (
                <li key={s.heading}>
                  <a href={`#s${i}`} className="-ml-px block border-l border-transparent py-1.5 pl-4 text-sm text-muted hover:border-accent hover:text-ink">
                    {s.heading}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="space-y-20">
            {product.sections.map((s, i) => (
              <Reveal key={s.heading} id={`s${i}`} className="scroll-mt-24">
                <h2 className="text-2xl font-semibold tracking-tight md:text-4xl md:tracking-tightest">{s.heading}</h2>
                <p className="prose-body mt-4 max-w-[60ch]">{s.pain}</p>
                <ul className="mt-7 grid gap-3 md:grid-cols-2">
                  {s.bullets.map((b) => (
                    <li key={b} className="card flex gap-3 p-5 text-[15px] leading-relaxed">
                      <Check size={18} weight="bold" className="mt-0.5 shrink-0 text-accent" />
                      {b}
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {product.quote && (
        <section className="border-y border-line bg-surface py-24">
          <Container className="max-w-3xl text-center">
            <Reveal>
              <p className="text-3xl font-semibold tracking-tightest md:text-5xl">{product.quote.headline}</p>
              <p className="prose-body mx-auto mt-6 max-w-[54ch]">{product.quote.body}</p>
            </Reveal>
          </Container>
        </section>
      )}

      <section className="py-20">
        <Container className="grid gap-4 lg:grid-cols-[1.2fr_1fr]">
          <Reveal>
            <Link to="/build" className="group panel-dark flex h-full flex-col justify-between rounded-2xl p-8 md:p-10">
              <Sparkle size={26} weight="fill" className="text-[#60a5eb]" />
              <div className="mt-10">
                <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">Run it as-is, or make it yours.</h2>
                <p className="mt-3 max-w-md leading-relaxed opacity-75">
                  On Blueprint, your team can change anything in {product.name} with its own AI tools, the same day.
                </p>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium">
                  {CTA.how.label}
                  <ArrowRight size={16} weight="bold" className="transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
            {others.map((o, i) => (
              <Reveal key={o.slug} delay={i * 60}>
                <Link to={`/products/${o.slug}`} className="card group flex h-full items-center gap-4 p-5 transition-colors hover:border-faint">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent-soft text-accent">
                    <o.icon size={20} />
                  </span>
                  <span>
                    <span className="block font-semibold">{o.name}</span>
                    <span className="block text-sm text-muted">{o.card}</span>
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <ClosingCTA title={`See ${product.name} with your own workflows.`} sub="You'll talk to someone who knows how residential programs run.">
        <OnAccentButton to={CTA.demo.href} solid>
          {CTA.demo.label}
        </OnAccentButton>
        <OnAccentButton to={CTA.pricing.href}>{CTA.pricing.label}</OnAccentButton>
      </ClosingCTA>
    </>
  )
}
