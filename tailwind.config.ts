import type { Config } from 'tailwindcss'

// Colors are CSS variables (see styles.css) so the light and dark tones swap them
// per section. Shape system: cards rounded-2xl, inputs rounded-xl, buttons/pills full.
const token = (name: string) => `rgb(var(--${name}) / <alpha-value>)`

const config: Config = {
  // The site has tones, not a mode (see styles.css). Prefer tokens: dark: only checks for
  // a .tone-dark ancestor, so it can't tell when a light section sits inside a dark one.
  darkMode: ['selector', '.tone-dark'],
  content: ['./app/index.html', './app/src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Geist Variable"', 'system-ui', 'sans-serif'],
        mono: ['"Geist Mono Variable"', 'ui-monospace', 'monospace'],
        // The tone's headline face: serif on light, Geist on dark.
        display: ['var(--display)'],
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
        danger: token('danger'),
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
