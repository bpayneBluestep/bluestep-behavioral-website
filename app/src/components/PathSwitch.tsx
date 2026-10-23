import { Link } from 'react-router-dom'
import { ArrowRight } from '@phosphor-icons/react'
import { Container } from '../ui'

// Thin strip at the top of each path hub: where you are, and the other path.
const PATHS = {
  'full-service': { label: 'Full-service', blurb: 'We run it for you.', to: '/full-service' },
  build: { label: 'Build', blurb: 'You change it with your own AI tools.', to: '/build' },
} as const

export default function PathSwitch({ current }: { current: keyof typeof PATHS }) {
  const other = current === 'build' ? PATHS['full-service'] : PATHS.build
  return (
    <div className="border-b border-line bg-surface">
      <Container className="flex flex-wrap items-center justify-between gap-2 py-2.5 text-sm">
        <p className="text-muted">
          You&apos;re on the <span className="font-medium text-ink">{PATHS[current].label}</span> path.
        </p>
        <Link to={other.to} className="group inline-flex items-center gap-1.5 text-muted hover:text-ink">
          <span>
            {other.label}: {other.blurb}
          </span>
          <ArrowRight size={14} weight="bold" className="text-accent transition-transform group-hover:translate-x-0.5" />
        </Link>
      </Container>
    </div>
  )
}
