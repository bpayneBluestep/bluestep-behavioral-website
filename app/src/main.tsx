import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import '@fontsource-variable/geist'
import '@fontsource-variable/geist-mono'
import App from './App'
import { initAnalytics } from './analytics'
import './styles.css'

/*
 * Two bases, deliberately different (GitSite contract, see vite.config.ts):
 *
 *   ROUTES  live at the host root, so there is NO basename. The GitSite's root mount
 *           serves this shell for any extensionless browser GET, which makes /pricing
 *           and /marketplace real, bookmarkable URLs.
 *
 *   ASSETS  live under /spa/. Vite's `base` owns that at build time
 *           (import.meta.env.BASE_URL). Never read it back as a route prefix.
 */
initAnalytics()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
