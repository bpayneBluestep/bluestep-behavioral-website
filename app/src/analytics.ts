// Google Analytics 4, behind a consent banner.
//
// Turning it on: paste the GA4 Measurement ID below, build, push. With no ID, nothing
// here runs: no Google script, no banner, no cookies.
//
// Consent Mode v2: analytics_storage starts "denied" until the visitor accepts, so GA
// sets no cookies before then (it may send cookieless pings that Google models).
// Ad storage is always denied; this site runs no ads.
//
// Page views are sent by hand on every route change (see RouteTracker in Layout.tsx),
// because a single-page app never reloads. In the GA4 data stream settings, turn OFF
// Enhanced measurement > "Page changes based on browser history events", or every page
// view counts twice.

const MEASUREMENT_ID = 'G-F50N894XH2'

export const GA_ID: string = MEASUREMENT_ID || import.meta.env.VITE_GA_ID || ''
export const analyticsEnabled = GA_ID !== ''

export type Consent = 'granted' | 'denied'
const KEY = 'analytics-consent'
const OPEN_EVENT = 'consent:open'

declare global {
  interface Window {
    dataLayer: unknown[]
    gtag: (...args: unknown[]) => void
  }
}

export function getConsent(): Consent | null {
  try {
    const v = localStorage.getItem(KEY)
    return v === 'granted' || v === 'denied' ? v : null
  } catch {
    return null
  }
}

let started = false

/** Loads gtag.js with consent defaults. Safe to call more than once. */
export function initAnalytics() {
  if (!analyticsEnabled || started) return
  started = true
  try {
    window.dataLayer = window.dataLayer || []
    // gtag.js reads the arguments object itself, so this must not be an arrow or spread.
    window.gtag = function gtag() {
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer.push(arguments)
    }
    window.gtag('consent', 'default', {
      analytics_storage: getConsent() === 'granted' ? 'granted' : 'denied',
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
      wait_for_update: 500,
    })
    window.gtag('js', new Date())
    window.gtag('config', GA_ID, { send_page_view: false })

    const s = document.createElement('script')
    s.async = true
    s.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(GA_ID)}`
    document.head.appendChild(s)
  } catch (err) {
    console.error('Analytics failed to start', err)
  }
}

export function setConsent(c: Consent) {
  try {
    localStorage.setItem(KEY, c)
  } catch {
    // Storage blocked: the choice still applies for this visit.
  }
  if (started) window.gtag('consent', 'update', { analytics_storage: c })
}

/** Re-opens the cookie banner (footer "Cookie settings"). */
export const openConsent = () => window.dispatchEvent(new Event(OPEN_EVENT))
export const onConsentOpen = (fn: () => void) => {
  window.addEventListener(OPEN_EVENT, fn)
  return () => window.removeEventListener(OPEN_EVENT, fn)
}

/** Sends a GA4 event. Never pass anything a visitor typed (names, emails, messages). */
export function track(name: string, params: Record<string, string | number | undefined> = {}) {
  if (!started) return
  try {
    window.gtag('event', name, params)
  } catch (err) {
    console.error('Analytics event failed', name, err)
  }
}

export function trackPage() {
  track('page_view', {
    page_title: document.title,
    page_location: window.location.href,
    page_path: window.location.pathname + window.location.search,
  })
}
