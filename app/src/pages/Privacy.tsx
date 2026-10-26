import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { analyticsEnabled, openConsent } from '../analytics'
import { BRAND } from '../site'
import { Container, PageHero, useTitle } from '../ui'

// Covers this marketing site only. Have it reviewed before relying on it legally.
const UPDATED = 'October 16, 2026'

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="border-t border-line py-10">
      <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
      <div className="mt-4 space-y-4 leading-relaxed text-muted [&_strong]:font-medium [&_strong]:text-ink">{children}</div>
    </section>
  )
}

export default function Privacy() {
  useTitle('Privacy')
  const mail = (
    <a href={`mailto:${BRAND.email}`} className="text-accent underline underline-offset-2">
      {BRAND.email}
    </a>
  )
  return (
    <>
      <PageHero
        kicker="Privacy"
        title="What this site collects."
        sub={`Short version: what you send us, and, if you allow it, which pages you visit. Last updated ${UPDATED}.`}
      />
      <Container className="max-w-3xl pb-24 md:pb-32">
        <Section title="When you contact us">
          <p>
            The <Link to="/demo" className="text-accent underline underline-offset-2">demo form</Link> asks for your
            name, role, program, email, an optional phone number, and a message. We use it to reply to you, and for
            nothing else. It reaches our inbox through FormSubmit, a form-to-email service.
          </p>
          <p>
            Please do not include patient information in the form. This site is not the place for it.
          </p>
        </Section>

        <Section title="When you browse">
          <p>
            If you accept cookies, we use <strong>Google Analytics</strong> to see which pages people visit, how they
            found the site, their device and browser type, and their approximate location (city level). Google
            Analytics sets first-party cookies (named <code className="font-mono text-sm">_ga</code> and{' '}
            <code className="font-mono text-sm">_ga_*</code>) that last up to two years.
          </p>
          <p>
            If you decline, Google Analytics sets no cookies. Google may still receive basic signals with no cookie
            or identifier, such as a page load, which it uses only in aggregate.
          </p>
          <p>
            We record which buttons and plans you choose, never what you type. We do not run ads, use ad cookies, or
            sell or share your information for advertising.
          </p>
        </Section>

        <Section title="Stored in your browser">
          <p>
            Your light or dark mode choice and your cookie choice are saved in your browser's local storage so the
            site remembers them. They are never sent to us.
          </p>
        </Section>

        <Section title="Your choices">
          <p>
            {analyticsEnabled ? (
              <>
                Change your cookie choice any time in{' '}
                <button type="button" onClick={openConsent} className="text-accent underline underline-offset-2">
                  cookie settings
                </button>
                .
              </>
            ) : (
              'Analytics is not currently active on this site.'
            )}{' '}
            You can also block cookies in your browser, or install Google's{' '}
            <a
              href="https://tools.google.com/dlpage/gaoptout"
              className="text-accent underline underline-offset-2"
              target="_blank"
              rel="noreferrer"
            >
              Analytics opt-out add-on
            </a>
            .
          </p>
          <p>To see or delete anything you've sent us, email {mail}.</p>
        </Section>

        <Section title="BlueStep products">
          <p>
            This page covers this website only. Data in the BlueStep EHR, CRM, Outcomes, Academics, and BlueIQ is governed by your
            program's agreement with {BRAND.legal} and our Business Associate Agreement.
          </p>
        </Section>

        <Section title="Questions">
          <p>
            Email {mail}. If this page changes, the date at the top changes with it.
          </p>
        </Section>
      </Container>
    </>
  )
}
