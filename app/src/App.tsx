import { Navigate, Route, Routes } from 'react-router-dom'
import Layout from './Layout'
import { ROLES } from './data/roles'
import Home from './pages/Home'
import FullService from './pages/FullService'
import Build from './pages/Build'
import Marketplace from './pages/Marketplace'
import ProductPage from './pages/ProductPage'
import ConsultantCrm from './pages/ConsultantCrm'
import RolePage from './pages/RolePage'
import BlankSlate from './pages/BlankSlate'
import Pricing from './pages/Pricing'
import Demo from './pages/Demo'
import ProgramDirectory from './pages/ProgramDirectory'
import Privacy from './pages/Privacy'
import NotFound from './pages/NotFound'
import Admin from './pages/Admin'
import Signup, { SignupSuccess } from './pages/Signup'

// Short or retired URLs, kept alive so links and bookmarks still land.
const REDIRECTS: Record<string, string> = {
  '/talk': '/demo',
  '/contact': '/demo',
  '/platform': '/build',
  '/builder': '/build',
  // About is hidden for now; restore its route and links to bring it back.
  '/about': '/',
  '/values': '/',
  '/ehr': '/products/ehr',
  '/crm': '/products/crm',
  '/consultant-crm': '/products/consultant-crm',
  '/ec-crm': '/products/consultant-crm',
  '/outcomes': '/products/outcomes',
  '/blueiq': '/products/blueiq',
  '/products': '/full-service',
  '/supported': '/full-service',
  '/blank-slate': '/slate',
  '/privacy-policy': '/privacy',
  '/cookies': '/privacy',
  '/for-referral-partners': '/for-referring-professionals',
  '/directory': '/program-directory',
}

export default function App() {
  return (
    <Routes>
      {/* Hidden super-user admin, outside the public layout. */}
      <Route path="admin/*" element={<Admin />} />
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="full-service" element={<FullService />} />
        <Route path="products/consultant-crm" element={<ConsultantCrm />} />
        <Route path="products/:slug" element={<ProductPage />} />
        {ROLES.map((r) => (
          <Route key={r.slug} path={r.slug} element={<RolePage />} />
        ))}
        <Route path="build" element={<Build />} />
        <Route path="marketplace" element={<Marketplace />} />
        <Route path="slate" element={<BlankSlate />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="program-directory" element={<ProgramDirectory />} />
        <Route path="demo" element={<Demo />} />
        <Route path="signup" element={<Signup />} />
        <Route path="signup/success" element={<SignupSuccess />} />
        <Route path="privacy" element={<Privacy />} />
        {Object.entries(REDIRECTS).map(([from, to]) => (
          <Route key={from} path={from} element={<Navigate to={to} replace />} />
        ))}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
