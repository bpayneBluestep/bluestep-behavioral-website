import { useEffect, useRef, type CSSProperties, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from '@phosphor-icons/react'
import { BRAND } from './site'

/** Public asset URL. Assets live under /spa/ in production (see vite.config.ts). */
export const asset = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`

/** Sets the document title for a route. */
export function useTitle(title?: string) {
  useEffect(() => {
    document.title = title ? `${title} | ${BRAND.name}` : BRAND.name
  }, [title])
}

/**
 * Fades its children up once they enter the viewport. One IntersectionObserver per
 * element, disconnected after the first reveal. Reduced motion is handled in CSS.
 */
export function Reveal({
  children,
  delay = 0,
  className = '',
  as: Tag = 'div',
  id,
}: {
  children: ReactNode
  delay?: number
  className?: string
  as?: 'div' | 'li' | 'section'
  id?: string
}) {
  const ref = useRef<HTMLElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          el.classList.add('is-in')
          io.disconnect()
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.12 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return (
    <Tag
      ref={ref as never}
      id={id}
      className={`reveal ${className}`}
      style={{ '--delay': `${delay}ms` } as CSSProperties}
    >
      {children}
    </Tag>
  )
}

export function Container({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-page px-5 md:px-8 ${className}`}>{children}</div>
}

/** The BlueStep logo, swapped for the reversed wordmark in dark mode. */
export function Logo({ className = 'h-7' }: { className?: string }) {
  return (
    <>
      <img src={asset('images/logo-light.png')} alt="BlueStep" className={`w-auto dark:hidden ${className}`} />
      <img src={asset('images/logo-dark.png')} alt="BlueStep" className={`hidden w-auto dark:block ${className}`} />
    </>
  )
}

/** Primary/ghost link button. Internal routes use the router; others are plain anchors. */
export function Button({
  to,
  children,
  variant = 'primary',
  arrow = false,
  className = '',
}: {
  to: string
  children: ReactNode
  variant?: 'primary' | 'ghost'
  arrow?: boolean
  className?: string
}) {
  const cls = `${variant === 'primary' ? 'btn-primary' : 'btn-ghost'} group ${className}`
  const inner = (
    <>
      {children}
      {arrow && (
        <ArrowRight
          size={16}
          weight="bold"
          className="transition-transform duration-200 group-hover:translate-x-0.5"
        />
      )}
    </>
  )
  if (to.startsWith('/')) {
    return (
      <Link to={to} className={cls}>
        {inner}
      </Link>
    )
  }
  return (
    <a href={to} className={cls}>
      {inner}
    </a>
  )
}

/** Standard interior-page hero: headline, one line of subtext, optional actions. */
export function PageHero({
  kicker,
  title,
  sub,
  children,
}: {
  kicker?: string
  title: ReactNode
  sub: ReactNode
  children?: ReactNode
}) {
  return (
    <section className="border-b border-line">
      <Container className="pb-16 pt-14 md:pb-24 md:pt-20">
        <div className="rise max-w-3xl">
          {kicker && <p className="kicker mb-5">{kicker}</p>}
          <h1 className="text-4xl font-semibold leading-[1.05] tracking-tightest md:text-6xl">{title}</h1>
          <p className="prose-body mt-6 max-w-[56ch]">{sub}</p>
          {children && <div className="mt-9 flex flex-wrap gap-3">{children}</div>}
        </div>
      </Container>
    </section>
  )
}

/** Section heading: headline over an optional paragraph, stacked. */
export function Heading({
  title,
  sub,
  className = '',
}: {
  title: ReactNode
  sub?: ReactNode
  className?: string
}) {
  return (
    <div className={`max-w-2xl ${className}`}>
      <h2 className="text-3xl font-semibold leading-[1.1] tracking-tightest md:text-5xl">{title}</h2>
      {sub && <p className="prose-body mt-5 max-w-[58ch]">{sub}</p>}
    </div>
  )
}

/** Closing call to action used at the bottom of most pages. */
export function ClosingCTA({
  title,
  sub,
  children,
}: {
  title: ReactNode
  sub: ReactNode
  children: ReactNode
}) {
  return (
    <section className="py-24 md:py-32">
      <Container>
        <Reveal className="relative overflow-hidden rounded-2xl band px-6 py-16 md:px-16 md:py-20">
          <img
            src={asset('images/mark.png')}
            alt=""
            aria-hidden
            className="pointer-events-none absolute -bottom-16 -right-10 w-72 opacity-[0.12] mix-blend-luminosity md:w-96"
          />
          <h2 className="relative max-w-2xl text-3xl font-semibold leading-[1.1] tracking-tightest md:text-5xl">
            {title}
          </h2>
          <p className="relative mt-5 max-w-[50ch] text-base leading-relaxed opacity-85 md:text-lg">{sub}</p>
          <div className="relative mt-9 flex flex-wrap gap-3">{children}</div>
        </Reveal>
      </Container>
    </section>
  )
}

/** Buttons for use on the accent-colored closing band. */
export function OnAccentButton({
  to,
  children,
  solid = false,
}: {
  to: string
  children: ReactNode
  solid?: boolean
}) {
  const cls = solid
    ? 'btn bg-white text-[#1263a8] hover:bg-white/90'
    : 'btn border border-white/40 text-white hover:bg-white/10'
  if (!to.startsWith('/')) {
    return (
      <a href={to} className={cls}>
        {children}
      </a>
    )
  }
  return (
    <Link to={to} className={cls}>
      {children}
    </Link>
  )
}
