import type { Config } from 'tailwindcss'

// Colors are CSS variables (see globals.css) so light and dark mode swap in one
// place. Shape system: cards rounded-2xl, inputs rounded-xl, buttons/pills full.
const token = (name: string) => `rgb(var(--${name}) / <alpha-value>)`

const config: Config = {
  // dark: variants follow data-theme on <html> (set by the theme script / toggle).
  darkMode: ['selector', '[data-theme="dark"]'],
  content: ['./app/index.html', './app/src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Geist Variable"', 'system-ui', 'sans-serif'],
        mono: ['"Geist Mono Variable"', 'ui-monospace', 'monospace'],
      },
      colors: {
        bg: token('bg'),
        surface: token('surface'),
        raised: token('raised'),
        ink: token('ink'),
        muted: token('muted'),
        faint: token('faint'),
        line: token('line'),
        accent: token('accent'),
        'accent-ink': token('accent-ink'),
        'accent-soft': token('accent-soft'),
      },
      maxWidth: {
        page: '1240px',
      },
      letterSpacing: {
        tightest: '-0.045em',
      },
    },
  },
  plugins: [],
}

export default config
