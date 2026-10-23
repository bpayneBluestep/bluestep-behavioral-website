// Stripe.js for the embedded CRM checkout on /signup. Stripe requires the script
// to load from js.stripe.com (never bundled), so it's injected on first use.
// "endive" is the Stripe.js version that ships the Checkout Elements SDK.

const STRIPE_JS = 'https://js.stripe.com/endive/stripe.js'

// Publishable keys are public by design. /b/crmCheckout reports which mode its
// secret key is in, and the page picks the matching key, so a live secret key
// can never pair with a test publishable key.
export const STRIPE_PUBLISHABLE_KEY: Record<'test' | 'live', string> = {
  test: 'pk_test_51TrNFECzsIRyPjkGffjzH215q1CvqnjcHHftoD8vDLSUCTD36VAJQWyWJzMdDBnCfli7HaOxara5FfiSn6MfnBn700hkLmCvzb',
  live: '',
}

declare global {
  interface Window {
    Stripe?: (key: string) => any
  }
}

let loading: Promise<(key: string) => any> | null = null

export function loadStripe(): Promise<(key: string) => any> {
  if (window.Stripe) return Promise.resolve(window.Stripe)
  if (!loading) {
    loading = new Promise((resolve, reject) => {
      const s = document.createElement('script')
      s.src = STRIPE_JS
      s.async = true
      s.onload = () => (window.Stripe ? resolve(window.Stripe) : reject(new Error('Stripe.js loaded without Stripe')))
      s.onerror = () => {
        loading = null
        s.remove()
        reject(new Error('Stripe.js failed to load'))
      }
      document.head.appendChild(s)
    })
  }
  return loading
}

export const STRIPE_FONTS = [{ cssSrc: 'https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600&display=swap' }]

/** Stripe Appearance built from the color tokens where the form mounts, so it matches that tone. */
export function stripeAppearance(el: Element = document.documentElement) {
  const css = getComputedStyle(el)
  const rgb = (token: string, alpha?: number) => {
    const parts = css.getPropertyValue(token).trim().split(/\s+/).join(', ')
    return alpha === undefined ? `rgb(${parts})` : `rgba(${parts}, ${alpha})`
  }
  const dark = css.colorScheme.trim() === 'dark'

  return {
    theme: dark ? 'night' : 'stripe',
    variables: {
      colorPrimary: rgb('--accent'),
      colorBackground: rgb('--surface'),
      colorText: rgb('--ink'),
      colorTextSecondary: rgb('--muted'),
      colorTextPlaceholder: rgb('--faint'),
      colorDanger: dark ? 'rgb(248, 113, 113)' : 'rgb(220, 38, 38)',
      fontFamily: 'Geist, system-ui, sans-serif',
      fontSizeBase: '15px',
      borderRadius: '12px',
      spacingUnit: '4px',
    },
    rules: {
      '.Label': { fontWeight: '500', color: rgb('--ink'), marginBottom: '8px' },
      '.Input': { border: `1px solid ${rgb('--line')}`, boxShadow: 'none', padding: '12px 16px' },
      '.Input:focus': { borderColor: rgb('--accent'), boxShadow: `0 0 0 3px ${rgb('--accent', 0.3)}` },
      '.Input--invalid': { borderColor: dark ? 'rgb(248, 113, 113)' : 'rgb(220, 38, 38)', boxShadow: 'none' },
    },
  }
}
