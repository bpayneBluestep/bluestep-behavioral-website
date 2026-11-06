import { Link } from 'react-router-dom'
import { PageHero, useTitle } from '../ui'
import { A, C, Callout, Code, Done, GuideBody, Part, Step, Steps, Table, useNoIndex } from './slate/guide'

// Unlisted follow-on to /slate/setup: what to build once Claude is connected.
// Shared by link, never in the nav or footer, noindex. Assumes /slate/setup is
// done (/b6p-setup reports the gateway answers) and the work happens in the
// customer's sandbox org.

const TOC = [
  ['explore', '1. Explore your org'],
  ['gitsite', '2. Your first website'],
  ['dashboard', '3. A live dashboard'],
  ['help', 'Everyday use and help'],
] as const

/** How the dashboard in Part 3 gets its data. */
function DataFlow() {
  const box = 'rounded-xl border border-line bg-bg px-4 py-3 text-center'
  const name = 'font-medium text-ink'
  const sub = 'text-xs text-muted'
  const arrow = 'flex items-center justify-center font-mono text-xs text-muted'
  return (
    <figure className="rounded-2xl border border-line bg-surface p-5">
      <figcaption className="mb-4 font-medium text-ink">Each viewer sees data through their own BlueStep login</figcaption>
      <div className="grid gap-3 md:grid-cols-[1fr_auto_2fr_auto_1fr] md:items-center">
        <div className={box}>
          <p className={name}>Staff browser</p>
          <p className={sub}>signed in to BlueStep</p>
        </div>
        <div className={arrow}>→</div>
        <div className="space-y-3 rounded-xl border border-dashed border-line p-3">
          <p className="text-xs font-medium text-muted">Your BlueStep domain</p>
          <div className={box}>
            <p className={name}>GitSite at /spa/</p>
            <p className={sub}>pages, charts, tables</p>
          </div>
          <div className={`${box} border-accent bg-accent-soft/40`}>
            <p className={name}>Endpoint /b/caseload</p>
            <p className={sub}>checks login, returns JSON</p>
          </div>
        </div>
        <div className={arrow}>⇄</div>
        <div className="space-y-3">
          <div className={box}>
            <p className={name}>GitHub repo</p>
            <p className={sub}>deploys the site on push</p>
          </div>
          <div className={box}>
            <p className={name}>Client records</p>
            <p className={sub}>read by the endpoint</p>
          </div>
        </div>
      </div>
      <p className="mt-4 text-sm text-muted">No keys in the code: the browser sends the viewer's BlueStep login with every request.</p>
    </figure>
  )
}

export default function SlateFirstBuilds() {
  useTitle('Slate first builds')
  useNoIndex()

  return (
    <>
      <PageHero
        kicker="Slate · after setup"
        title="Your first builds."
        sub="Claude is connected. Now learn your org, put a website live, and build a dashboard on your own data. No coding experience needed."
      />

      <GuideBody toc={TOC}>
        <Callout>
          <strong>Start here only after setup is done</strong>: <C>/b6p-setup</C> reports that the BlueStep gateway answers. Not
          there yet? Go back to <Link to="/slate/setup" className="text-accent underline underline-offset-2">Slate setup</Link>.
          Build in your sandbox org first; nothing changes in BlueStep until you approve it.
        </Callout>

        <Part
          id="explore"
          n="Part 1 · about 15 minutes"
          title="Explore your org"
          lead="Your BlueStep folder is a workspace: a local copy of the BlueStep pieces you work on. BlueStep stays the master copy, so you bring pieces down, change them here, and send them back."
        >
          <Steps>
            <Step title="Open Claude in your BlueStep folder." />
            <Step title="Bring down something that already exists.">
              <p>
                In BlueStep, open any script or report in your sandbox and copy its <strong>DAV URL</strong> (the web address shown
                on its settings page). Then type:
              </p>
              <Code>{'/b6p-pull <paste the DAV URL>'}</Code>
            </Step>
            <Step title="Ask Claude to explain it.">
              <Code>Explain what this does, in plain English.</Code>
              <p>It's the quickest way to learn how your BlueStep is built.</p>
            </Step>
          </Steps>
          <Done>
            a new folder named like <C>U141234</C> appears inside your BlueStep folder and Claude has explained what's in it.
          </Done>
        </Part>

        <Part
          id="gitsite"
          n="Part 2 · about 40 minutes"
          title="Put your first website live"
          lead="BlueStep can host a website whose pages are stored on GitHub (a GitSite). Each time the site changes on GitHub, BlueStep updates it, usually within a minute."
        >
          <Callout>
            The website's code is <strong>public</strong> on GitHub, which keeps setup simple.{' '}
            <strong>Never put passwords, keys or client information in it.</strong> Client data stays in BlueStep, and the site
            only shows it to people who are signed in.
          </Callout>
          <Steps>
            <Step title="Create a free GitHub account.">
              <p>
                Sign up at <A href="https://github.com/signup">github.com/signup</A> if you don't have one.
              </p>
            </Step>
            <Step title="Install the GitHub helper.">
              <p>
                Download the installer for your computer from <A href="https://cli.github.com">cli.github.com</A> and run it.
                Claude uses it to publish your website; you won't open it yourself.
              </p>
            </Step>
            <Step title="Make a second folder for the website.">
              <p>
                Next to your BlueStep folder (not inside it), create a folder named <strong>my-first-site</strong>.
              </p>
            </Step>
            <Step title="Open it in Claude and paste:">
              <Code>{`Create a BlueStep GitSite starter in this folder:
- Vite + React + TypeScript. Source in app/. Vite base must be '/spa/'.
- \`npm run build\` writes index.html and assets/ to the REPO ROOT (not dist/),
  and the build output is committed - BlueStep serves the repo as-is.
- Client-side routing that works on deep links.
- A simple home page that says "Hello from Slate" with our organization's name.
If I'm not signed in to GitHub, run "gh auth login --web" and show me the
one-time code to enter. Then create a PUBLIC GitHub repo, commit and push to
main, and generate a strong webhook secret and show it to me once.`}</Code>
            </Step>
            <Step title="Approve as it works.">
              <p>
                If it shows a GitHub code, open <A href="https://github.com/login/device">github.com/login/device</A>, enter the
                code, and approve. Write down the <strong>repository address</strong> and the <strong>webhook secret</strong> it
                gives you.
              </p>
            </Step>
            <Step title="Create the site in BlueStep.">
              <p>
                In your sandbox org, go to <strong>Admin → Sites → New Git Site</strong> and fill in:
              </p>
              <Table
                head={['Field', 'What to enter']}
                rows={[
                  ['Name and domain', 'As for any BlueStep website. Ask BlueStep if you need a new domain.'],
                  ['Repository URL', 'The repository address from the last step.'],
                  ['Git Ref', <C key="m">main</C>],
                  ['Index Path', <C key="i">index.html</C>],
                  ['GitHub Token', 'Leave blank.'],
                  ['Webhook Secret', 'The webhook secret from the last step.'],
                ]}
              />
              <p>Click Save. BlueStep puts the site up for the first time.</p>
            </Step>
            <Step title="Turn on automatic updates.">
              <p>Tell Claude (use your domain):</p>
              <Code>Add a GitHub push webhook to this repo pointing at https://&lt;your-domain&gt;/spa/webhook using the secret you generated.</Code>
            </Step>
            <Step title="Try a change.">
              <Code>Change the heading to "Our first Slate app", rebuild, commit and push.</Code>
            </Step>
          </Steps>
          <Done>
            <C>https://&lt;your-domain&gt;/spa/</C> shows "Our first Slate app" a minute after that last step.
          </Done>
        </Part>

        <Part
          id="dashboard"
          n="Part 3 · about 30 minutes"
          title="Build something real: a live caseload dashboard"
          lead={
            <>
              Now the website shows real BlueStep data. Claude builds two pieces: a small BlueStep script that hands over a list of
              your active clients (a <strong className="text-ink">data link</strong>), and a dashboard page that displays it.
              Because both live on your BlueStep domain, each person who opens the dashboard sees only what BlueStep already lets
              them see.
            </>
          }
        >
          <DataFlow />
          <Steps>
            <Step title="Build the data link.">
              <p>Open Claude in your BlueStep folder and paste:</p>
              <Code>{`I want an endpoint script at /b/caseload on the same site as my GitSite.
It requires login and returns JSON for active clients: name, program,
admit date and days in care. Find the right forms and fields in my org first
and show me what you'll use before building. Create the script on the
platform, pull it, write it, and push it.`}</Code>
              <p>
                Claude looks up your forms, shows you its plan, and asks before it creates anything in BlueStep. Read the plan and
                approve it if it looks right.
              </p>
            </Step>
            <Step title="Check it.">
              <p>
                While signed in to BlueStep, open <C>https://&lt;your-domain&gt;/b/caseload</C>. You should see your clients as
                plain text. In a private browser window, signed out, you should get the login page instead.
              </p>
            </Step>
            <Step title="Build the dashboard.">
              <p>Open Claude in your my-first-site folder and paste:</p>
              <Code>{`Add a Caseload page that calls /b/caseload (same origin, send cookies).
Show a count of active clients, a bar chart by program, and a searchable
table sorted by days in care. If the call is redirected to login, show a
"Please sign in to BlueStep" message with a link. Rebuild, commit and push.`}</Code>
            </Step>
          </Steps>
          <Done>
            <C>https://&lt;your-domain&gt;/spa/caseload</C> shows your live caseload while you're signed in.
          </Done>
          <p>
            What next? An intake form that creates a new client, a family portal that shows parents only their own child, a daily
            census email, a staff training tracker. Describe what you want and who should see it; Claude handles the rest.
          </p>
        </Part>

        <Part id="help" n="Everyday use" title="Working day to day, and getting help">
          <p>
            <strong>Each time:</strong> open Claude in the right folder (BlueStep for BlueStep work, your site's folder for the
            website) and describe what you want. For anything bigger than a small fix, start with <C>/spec-create</C>: Claude
            writes a plan for you to approve before it builds. For a quick fix, use <C>/quick-task</C>.
          </p>
          <p className="font-medium text-ink">Good habits:</p>
          <ul className="list-disc space-y-1.5 pl-5">
            <li>Read what Claude asks before you approve. If something surprises you, say no and ask why.</li>
            <li>Try new builds in your sandbox or on test records before your real clients.</li>
            <li>Keep your token, passwords and client information out of the chat and out of your website's code.</li>
          </ul>
          <p className="pt-2 font-medium text-ink">If something goes wrong:</p>
          <Table
            head={['What you see', 'What to do']}
            rows={[
              ['Claude can’t reach BlueStep', <>Type <C key="s">/b6p-setup</C>. If the gateway doesn’t answer, see the help on <Link key="l" to="/slate/setup#help" className="text-accent underline underline-offset-2">Slate setup</Link>.</>],
              ['Website setup says "404 for ref main"', 'In the BlueStep site settings, check Git Ref says exactly main.'],
              ['The website page is blank', 'Ask Claude: "Check that the build is committed at the repo root and Vite base is /spa/."'],
              ["Your website doesn't update after a change", 'Ask Claude to check the GitHub webhook’s last delivery.'],
              ['The dashboard says "Please sign in" while you are', 'The website and the data link must be on the same BlueStep domain.'],
            ]}
          />
          <p>Still stuck? Send what Claude reports to your BlueStep contact.</p>
        </Part>
      </GuideBody>
    </>
  )
}
