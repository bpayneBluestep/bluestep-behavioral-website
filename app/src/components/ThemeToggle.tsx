import { useState } from 'react'
import { Moon, Sun } from '@phosphor-icons/react'

// Light/dark toggle. The initial theme is set before paint by the inline script in
// index.html (saved choice, else light). Clicking saves an explicit choice.

type Theme = 'light' | 'dark'
const KEY = 'theme'

const current = (): Theme => (document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light')

function apply(t: Theme) {
  document.documentElement.dataset.theme = t
  document.querySelector<HTMLMetaElement>('meta[name=theme-color]')?.setAttribute('content', t === 'dark' ? '#0d1513' : '#f7f3e9')
}

export default function ThemeToggle({ className = '', withLabel = false }: { className?: string; withLabel?: boolean }) {
  const [theme, setTheme] = useState<Theme>(current)

  function toggle() {
    const next: Theme = theme === 'dark' ? 'light' : 'dark'
    apply(next)
    setTheme(next)
    try {
      localStorage.setItem(KEY, next)
    } catch {
      // Storage blocked: the choice still applies for this page view.
    }
  }

  const label = theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      title={label}
      className={`inline-flex items-center gap-2 rounded-full p-2 text-muted transition-colors hover:bg-raised hover:text-ink ${className}`}
    >
      {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
      {withLabel && <span className="text-base">{theme === 'dark' ? 'Light mode' : 'Dark mode'}</span>}
    </button>
  )
}
