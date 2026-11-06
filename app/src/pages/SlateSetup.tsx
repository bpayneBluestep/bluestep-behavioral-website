import { Link } from 'react-router-dom'
import { ArrowRight } from '@phosphor-icons/react'
import { PageHero, useTitle } from '../ui'
import { A, C, Callout, Done, GET_STARTED, GuideBody, Part, REPO, Step, Steps, Table, useNoIndex } from './slate/guide'

// Unlisted customer setup sheet for Slate: shared by link, never in the nav or
// footer, noindex. Scope is deliberately small (matches the onboarding team's
// "Getting Set Up with BlueStep AI" sheet): connect Claude to the customer's own
// BlueStep org (production, not a sandbox), done when /b6p-setup reports the gateway answers. Staff do the
// org, user, endorsements and token on their side; the repo's Get started prompt
// does the installing. Building things lives on /slate/first-builds.

const TOC = [
  ['get', 'What you get from us'],
  ['before', 'Before the call'],
  ['call', 'On the call'],
  ['after', 'After the call'],
  ['help', 'If something goes wrong'],
] as const

const GETS = [
  ['Your BlueStep org', <>The web address your team signs in at, like <C>yourname.bluestep.net</C>.</>],
  ['Your sign-in', 'A username and a temporary password. You reset the password the first time you sign in.'],
  ['An access token', 'A long code starting with b6pt_. We make it live on the call and send it to you in Teams.'],
] as const

export default function SlateSetup() {
  useTitle('Slate setup')
  useNoIndex()

  return (
    <>
      <PageHero
        kicker="Slate setup"
        title="Get set up with Slate."
        sub="On a short setup call we connect Claude to your BlueStep org. Finish the checklist below before the call and it goes quickly."
      />

      <GuideBody toc={TOC}>
        <Part id="get" n="From us" title="What you'll get from us">
          <div className="grid gap-3 sm:grid-cols-3">
            {GETS.map(([title, body]) => (
              <div key={title} className="rounded-2xl border border-line bg-surface p-4">
                <p className="font-medium text-ink">{title}</p>
                <p className="mt-1.5 text-sm">{body}</p>
              </div>
            ))}
          </div>
        </Part>

        <Part id="before" n="Before the call · about 20 minutes" title="Before the call" lead="Ordinary downloads. Nothing to type yet.">
          <Steps>
            <Step title="Install Claude." tag="Recommended">
              <p>
                The desktop app from <A href="https://claude.ai/download">claude.ai/download</A>, or Claude Code. You need a paid
                Claude plan (Pro, Max, Team or Enterprise). Claude is what we use and support. Cursor and Codex also work, but can
                take more effort and troubleshooting to set up.
              </p>
            </Step>
            <Step title="Install Git.">
              <p>
                On Windows, install <strong>Git for Windows</strong> from{' '}
                <A href="https://git-scm.com/download/win">git-scm.com/download/win</A> with the default options, then fully
                restart Claude. On a Mac, skip this: Claude starts Apple's installer for it if it's missing.
              </p>
            </Step>
            <Step title="Install Node.js, or plan to download the b6p tool.">
              <p>
                Get the <strong>LTS</strong> version from <A href="https://nodejs.org">nodejs.org</A>. Or skip Node and download{' '}
                <C>b6p</C> from <A href="https://github.com/Bluestep-Systems/b6p-cli/releases">its releases page</A>; that
                download exists only for Windows (x64) and Apple Silicon Macs. On an Intel Mac or Linux, install Node.js.
              </p>
            </Step>
            <Step title="Look over the setup repo.">
              <p>
                <A href={REPO}>github.com/Bluestep-Systems/bluestep-ai</A>. The <A href={GET_STARTED}>Get started</A> section
                near the top is what we run on the call.
              </p>
            </Step>
            <Step title="Paste the Get started prompt into Claude ahead of time." tag="Optional">
              <p>
                If you're comfortable with it. It sets up everything it can and stops when it needs your token.
              </p>
            </Step>
          </Steps>
        </Part>

        <Part id="call" n="On the call · about 20 minutes" title="On the call">
          <Steps>
            <Step title="We send your org address, username and temporary password in the Teams chat.">
              <p>You don't need to sign in during the call. Do that afterwards.</p>
            </Step>
            <Step title="Paste the Get started prompt into Claude and follow what it tells you.">
              <p>
                Copy it from the <A href={GET_STARTED}>Get started</A> section of the repo. It checks Git, installs the BlueStep
                plugin (in the desktop app it gives you the clicks), and installs the <C>b6p</C> tool.
              </p>
            </Step>
            <Step title="When we send your token in Teams, run b6p auth set in your terminal.">
              <p>
                It asks for your username, then the token. Also save the token as <C>B6PT_TOKEN</C>; Claude tells you how for your
                computer, as the repo describes.
              </p>
            </Step>
            <Step title="Fully quit and reopen Claude, then run the setup check.">
              <p>
                Open a new session in the folder for your BlueStep work and type <C>/b6p-setup</C>.
              </p>
            </Step>
            <Step title="We delete the token message from Teams.">
              <p>If you use a password manager, copy the token into it first.</p>
            </Step>
          </Steps>
          <Callout>
            <strong>Claude never asks for your token.</strong> You type it yourself, in your terminal. Never paste it into the
            Claude chat, an email or a shared document.
          </Callout>
          <Done>
            <C>/b6p-setup</C> reports that the BlueStep gateway answers.
          </Done>
        </Part>

        <Part id="after" n="After the call" title="After the call">
          <p>
            Sign in to BlueStep and reset your temporary password. Treat the token like a password. If you don't keep a
            copy, that's fine: it's already saved in your Claude setup, and if you ever lose it we can make you a new one.
          </p>
          <Link
            to="/slate/first-builds"
            className="group flex items-center justify-between gap-4 rounded-2xl border border-line bg-surface p-5 transition hover:border-accent"
          >
            <span>
              <span className="block font-medium text-ink">Next: your first builds</span>
              <span className="mt-1 block text-sm">Explore your org, put a website live, and build a live dashboard on your data.</span>
            </span>
            <ArrowRight size={20} className="shrink-0 text-muted transition group-hover:translate-x-0.5 group-hover:text-ink" />
          </Link>
        </Part>

        <Part id="help" n="Help" title="If something goes wrong">
          <Table
            head={['What you see', 'What to do']}
            rows={[
              ['No b6p commands when you type / in Claude', 'The plugin isn’t installed, or Claude hasn’t restarted. Paste the Get started prompt again, then fully quit and reopen Claude.'],
              ['It says b6p "isn’t recognized" or "not found"', 'Ask Claude to install it: npm i -g @bluestep-systems/b6p-cli. Then fully quit and reopen Claude.'],
              ['/b6p-setup says the gateway doesn’t answer', 'B6PT_TOKEN isn’t set, or Claude hasn’t restarted since you set it. Check it, then fully quit and reopen Claude.'],
              ['It asks you for an access token', <>Run <C key="a">b6p auth set</C> in your terminal again.</>],
            ]}
          />
          <p>
            Still stuck? Type <C>/b6p-setup</C> again and send what it reports to your BlueStep contact.
          </p>
        </Part>
      </GuideBody>
    </>
  )
}
