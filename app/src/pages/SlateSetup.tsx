import { useEffect, useState, type ReactNode } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Check, Copy } from '@phosphor-icons/react'
import { Container, PageHero, useTitle } from '../ui'

// Unlisted customer setup guide for Slate: shared by link, never linked from the
// nav or footer, and marked noindex so search engines leave it out.

type AgentId = 'claude' | 'codex' | 'cursor'

const AGENTS: Record<
  AgentId,
  {
    name: string
    maker: string
    plan: string
    installMac: ReactNode
    installWin: ReactNode
    signIn: ReactNode
    open: ReactNode
    prefix: '/' | '$'
    plugin: ReactNode
    phi: ReactNode
    update: ReactNode
  }
> = {
  claude: {
    name: 'Claude Code',
    maker: 'Anthropic',
    plan: 'Claude Pro, Max, Team or Enterprise',
    installMac: <Code>curl -fsSL https://claude.ai/install.sh | bash</Code>,
    installWin: <Code>irm https://claude.ai/install.ps1 | iex</Code>,
    signIn: (
      <>
        Run <C>claude</C> and pick your Claude account. A browser window opens to approve it.
      </>
    ),
    open: (
      <>
        <C>cd</C> into the folder, then run <C>claude</C>.
      </>
    ),
    prefix: '/',
    plugin: (
      <>
        In a terminal, run:
        <Code>{'claude plugin marketplace add Bluestep-Systems/bspecs\nclaude plugin install bluestep-tools@bluestep'}</Code>
      </>
    ),
    phi: <Code>claude plugin install phi-guard@bluestep --scope user</Code>,
    update: <C>claude plugin update bluestep-tools@bluestep</C>,
  },
  codex: {
    name: 'Codex',
    maker: 'OpenAI',
    plan: 'ChatGPT Plus, Pro, Business or Enterprise',
    installMac: <Code>npm i -g @openai/codex</Code>,
    installWin: <Code>npm i -g @openai/codex</Code>,
    signIn: (
      <>
        Run <C>codex</C> and choose <strong>Sign in with ChatGPT</strong>.
      </>
    ),
    open: (
      <>
        <C>cd</C> into the folder, then run <C>codex</C>.
      </>
    ),
    prefix: '$',
    plugin: (
      <>
        Run <C>codex plugin marketplace add Bluestep-Systems/bspecs</C>, then install <strong>bluestep-tools</strong>{' '}
        from Codex's plugins screen. Then type <C>/hooks</C> in Codex and <strong>trust</strong> the plugin's hooks.
        Until you do, BlueStep's safety checks silently do nothing.
      </>
    ),
    phi: (
      <>
        Install <strong>phi-guard</strong> from the plugins screen, then trust its hook with <C>/hooks</C>.
      </>
    ),
    update: (
      <>
        update from the plugins screen, then re-trust the hooks with <C>/hooks</C>
      </>
    ),
  },
  cursor: {
    name: 'Cursor',
    maker: 'Anysphere',
    plan: 'a paid Cursor plan (recommended)',
    installMac: (
      <>
        Download from{' '}
        <A href="https://cursor.com">cursor.com</A>.
      </>
    ),
    installWin: (
      <>
        Download from{' '}
        <A href="https://cursor.com">cursor.com</A>.
      </>
    ),
    signIn: <>Open Cursor and sign in on first launch.</>,
    open: (
      <>
        File → Open Folder, then open the Agent panel (Cmd+I on a Mac, Ctrl+I on Windows).
      </>
    ),
    prefix: '/',
    plugin: (
      <>
        Click <strong>Connect GitHub</strong> in Cursor's sidebar. Open Plugins → <strong>Add Marketplace → Import from
        Repo</strong>, enter <C>https://github.com/Bluestep-Systems/bspecs</C>, and install <strong>bluestep-tools</strong>.
      </>
    ),
    phi: (
      <>
        Install <strong>phi-guard</strong> from the plugins screen.
      </>
    ),
    update: <>updates arrive on their own</>,
  },
}

const AGENT_IDS: AgentId[] = ['claude', 'codex', 'cursor']

/** Inline code. */
function C({ children }: { children: ReactNode }) {
  return <code className="rounded bg-surface px-1.5 py-0.5 font-mono text-[0.85em] text-ink">{children}</code>
}

function A({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noreferrer" className="text-accent underline underline-offset-2">
      {children}
    </a>
  )
}

/** A copyable block: commands and prompts people paste. */
function Code({ children }: { children: string }) {
  const [copied, setCopied] = useState(false)
  const copy = () => {
    navigator.clipboard?.writeText(children).then(
      () => {
        setCopied(true)
        setTimeout(() => setCopied(false), 1500)
      },
      () => {},
    )
  }
  return (
    <div className="relative my-3">
      <pre className="overflow-x-auto rounded-xl border border-line bg-surface px-4 py-3 pr-12 font-mono text-[13px] leading-relaxed text-ink">
        {children}
      </pre>
      <button
        type="button"
        onClick={copy}
        aria-label={copied ? 'Copied' : 'Copy'}
        className="absolute right-2 top-2 rounded-lg p-2 text-muted transition hover:bg-raised hover:text-ink"
      >
        {copied ? <Check size={16} weight="bold" /> : <Copy size={16} />}
      </button>
    </div>
  )
}

function Part({ id, n, title, lead, children }: { id: string; n: string; title: string; lead?: ReactNode; children: ReactNode }) {
  return (
    <section id={id} className="scroll-mt-24 border-t border-line py-12">
      <p className="kicker mb-3">{n}</p>
      <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">{title}</h2>
      {lead && <p className="mt-4 leading-relaxed text-muted">{lead}</p>}
      <div className="mt-6 space-y-4 leading-relaxed text-muted [&_strong]:font-medium [&_strong]:text-ink">{children}</div>
    </section>
  )
}

function Steps({ children }: { children: ReactNode }) {
  return <ol className="space-y-5 [counter-reset:step]">{children}</ol>
}

function Step({ title, children }: { title: string; children?: ReactNode }) {
  return (
    <li className="relative pl-10 [counter-increment:step] before:absolute before:left-0 before:top-0 before:flex before:h-7 before:w-7 before:items-center before:justify-center before:rounded-full before:border before:border-line before:font-mono before:text-xs before:text-ink before:content-[counter(step)]">
      <p className="font-medium text-ink">{title}</p>
      {children && <div className="mt-1.5 space-y-2">{children}</div>}
    </li>
  )
}

function Callout({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-2xl border border-accent/30 bg-accent-soft/40 px-5 py-4 text-ink [&_strong]:font-semibold">
      {children}
    </div>
  )
}

function Table({ head, rows }: { head: string[]; rows: ReactNode[][] }) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-line">
      <table className="w-full text-left text-sm">
        <thead className="bg-surface text-ink">
          <tr>
            {head.map((h) => (
              <th key={h} className="px-4 py-3 font-medium">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className="border-t border-line align-top">
              {r.map((c, j) => (
                <td key={j} className={`px-4 py-3 ${j === 0 ? 'font-medium text-ink' : 'text-muted'}`}>
                  {c}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

/** How the dashboard in Part 6 gets its data. */
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

const TOC = [
  ['overview', 'Overview'],
  ['basics', '1. Install the basics'],
  ['agent', '2. Install your agent'],
  ['connect', '3. Connect to BlueStep'],
  ['workspace', '4. Your workspace'],
  ['gitsite', '5. Your first GitSite'],
  ['dashboard', '6. A live dashboard'],
  ['help', 'Workflow and help'],
] as const

export default function SlateSetup() {
  useTitle('Slate setup guide')
  const [params, setParams] = useSearchParams()
  const picked = params.get('agent')
  const agentId: AgentId = AGENT_IDS.includes(picked as AgentId) ? (picked as AgentId) : 'claude'
  const ag = AGENTS[agentId]
  const cmd = (name: string) => `${ag.prefix}${name}`

  // Unlisted: keep it out of search results.
  useEffect(() => {
    const meta = document.createElement('meta')
    meta.name = 'robots'
    meta.content = 'noindex, nofollow'
    document.head.appendChild(meta)
    return () => meta.remove()
  }, [])

  const pick = (id: AgentId) => {
    const next = new URLSearchParams(params)
    next.set('agent', id)
    setParams(next, { replace: true })
  }

  return (
    <>
      <PageHero
        kicker="Slate setup guide"
        title="From zero to your first app on BlueStep."
        sub="Every step to connect your coding agent to BlueStep, publish a website, and build a live dashboard on your own data. About two hours the first time."
      >
        <div className="w-full">
          <p className="mb-3 text-sm text-muted">Which coding agent are you using? The commands below follow your choice.</p>
          <div role="radiogroup" aria-label="Coding agent" className="inline-flex rounded-full border border-line bg-surface p-1">
            {AGENT_IDS.map((id) => (
              <button
                key={id}
                type="button"
                role="radio"
                aria-checked={agentId === id}
                onClick={() => pick(id)}
                className={`rounded-full px-4 py-2 text-sm transition ${
                  agentId === id ? 'bg-bg font-medium text-ink shadow-sm' : 'text-muted hover:text-ink'
                }`}
              >
                {AGENTS[id].name}
              </button>
            ))}
          </div>
        </div>
      </PageHero>

      <Container className="pb-24 md:pb-32">
        <div className="grid gap-12 lg:grid-cols-[200px_minmax(0,1fr)]">
          <nav aria-label="On this page" className="hidden lg:block">
            <ul className="sticky top-24 space-y-2 pt-12 text-sm">
              {TOC.map(([id, label]) => (
                <li key={id}>
                  <a href={`#${id}`} className="text-muted hover:text-ink">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="max-w-3xl">
            <Part
              id="overview"
              n="Overview"
              title="What you'll have at the end"
              lead={
                <>
                  Your coding agent connected to your BlueStep organization, and a live website that shows your own BlueStep
                  data. Slate is BlueStep plus the agent of your choice running on your computer. You describe what you want
                  in plain English; the agent reads your BlueStep setup, writes the code and publishes it. You approve
                  anything that changes your organization.
                </>
              }
            >
              <p className="font-medium text-ink">You need before you start:</p>
              <ul className="list-disc space-y-1.5 pl-5">
                <li>A Mac (Apple Silicon) or a Windows 10/11 PC, and admin rights to install software on it.</li>
                <li>
                  A plan for your agent. {ag.name} needs {ag.plan}.
                </li>
                <li>A BlueStep login with admin access to your organization.</li>
                <li>
                  A BlueStep <strong>access token</strong> (it starts with <C>b6pt_</C>). Ask your BlueStep contact for a
                  Slate access token before you begin.
                </li>
                <li>A free GitHub account (you can create it in Part 1).</li>
              </ul>
              <p className="pt-2 font-medium text-ink">How the pieces fit:</p>
              <Table
                head={['Piece', 'What it is', 'What it does for you']}
                rows={[
                  [ag.name, `Your coding agent, by ${ag.maker}`, 'Reads, writes and runs everything on your behalf'],
                  ['bluestep-tools plugin', "BlueStep's add-on, built for Claude Code, Codex and Cursor", 'Teaches the agent the BlueStep rules and adds the b6p commands'],
                  ['BlueStep gateway', 'A secure connection from your agent to your org', 'Lets the agent look up forms, fields and records, and set things up with your approval'],
                  ['b6p', "BlueStep's command-line tool", 'Downloads and uploads your scripts and reports'],
                  ['GitHub + GitSite', "Where your website's code lives, and the BlueStep site that serves it", 'Every change you push to GitHub goes live on your BlueStep domain'],
                ]}
              />
            </Part>

            <Part
              id="basics"
              n="Part 1"
              title="Install the basics"
              lead={
                <>
                  You'll type a few commands into a <strong className="text-ink">terminal</strong>, a text window where you
                  run programs by name. After Part 2, your agent types almost everything for you.
                </>
              }
            >
              <Steps>
                <Step title="Open a terminal.">
                  <p>Mac: press Cmd+Space, type Terminal, press Enter. Windows: press the Windows key, type PowerShell, press Enter.</p>
                </Step>
                <Step title="Install Node.js 20 or newer.">
                  <p>
                    Download the LTS installer from <A href="https://nodejs.org">nodejs.org</A>. Close and reopen the
                    terminal, then check that <C>node --version</C> prints v20 or higher.
                  </p>
                </Step>
                <Step title="Install Git.">
                  <p>
                    Mac: run <C>git --version</C>; if it offers the developer tools, click Install. Windows: install from{' '}
                    <A href="https://git-scm.com/download/win">git-scm.com</A> with the default options.
                  </p>
                </Step>
                <Step title="Create a GitHub account">
                  <p>
                    at <A href="https://github.com/signup">github.com/signup</A> if you don't have one.
                  </p>
                </Step>
                <Step title="Install the GitHub command-line tool and sign in.">
                  <p>
                    Mac: install from <A href="https://cli.github.com">cli.github.com</A>. Windows:{' '}
                    <C>winget install --id GitHub.cli</C>. Then run <C>gh auth login</C> and choose GitHub.com, HTTPS, and
                    Login with a web browser.
                  </p>
                </Step>
                <Step title="Check everything.">
                  <p>Each line should print a version or "Logged in":</p>
                  <Code>{'node --version\ngit --version\ngh auth status'}</Code>
                </Step>
              </Steps>
            </Part>

            <Part
              id="agent"
              n="Part 2"
              title={`Install ${ag.name}`}
              lead="Teams can mix agents: the BlueStep plugin and project rules work the same in all three. Switch agents at the top of the page."
            >
              <Steps>
                <Step title="Install it.">
                  <p className="text-sm">Mac:</p>
                  {ag.installMac}
                  <p className="text-sm">Windows:</p>
                  {ag.installWin}
                  <p>Close and reopen the terminal afterwards.</p>
                </Step>
                <Step title="Sign in.">
                  <p>{ag.signIn} Use the account on your paid plan.</p>
                </Step>
                <Step title="Say hello.">
                  <p>
                    Ask <C>What can you do in this folder?</C> If it answers, it works.
                  </p>
                </Step>
                <Step title="Learn the controls.">
                  <p>
                    The agent asks before running commands or changing files. Read each request and approve it, or say what
                    to do instead. Esc stops it mid-task{agentId === 'cursor' ? ' (or the Stop button)' : ''}.
                  </p>
                </Step>
              </Steps>
              <Callout>
                <strong>Opening {ag.name} in a folder</strong>, used throughout this guide: {ag.open}
                {agentId === 'codex' && (
                  <>
                    {' '}
                    BlueStep commands start with <C>$</C> in Codex, for example <C>$b6p-setup</C>; you can also just ask it to
                    run b6p-setup.
                  </>
                )}
              </Callout>
            </Part>

            <Part
              id="connect"
              n="Part 3"
              title="Connect your agent to BlueStep"
              lead="Your access token goes in two places: the b6p tool, and your computer's environment (for the gateway). Run steps 1 to 3 in a plain terminal, not inside your agent."
            >
              <Callout>
                <strong>Never paste your token into the agent's chat</strong>, an email or a file you share. It acts as you
                across your organization.
              </Callout>
              <Steps>
                <Step title="Install b6p.">
                  <Code>npm i -g @bluestep-systems/b6p-cli</Code>
                  <p>
                    Then <C>b6p --version</C>. It must print 0.8.1 or higher.
                  </p>
                </Step>
                <Step title="Give b6p your token.">
                  <p>
                    Run <C>b6p auth set</C> and paste your <C>b6pt_…</C> token when asked. It's stored encrypted on your
                    computer.
                  </p>
                </Step>
                <Step title="Give the gateway your token.">
                  <p>
                    <strong>Mac:</strong> run <C>open -e ~/.zshrc</C> (if the file doesn't exist, run <C>touch ~/.zshrc</C>{' '}
                    first). Add this line at the bottom with your real token, save, and close the terminal:
                  </p>
                  <Code>export B6PT_TOKEN="b6pt_…"</Code>
                  <p>
                    <strong>Windows:</strong> run this with your real token, then close every terminal window:
                  </p>
                  <Code>setx B6PT_TOKEN "b6pt_…"</Code>
                  {agentId === 'cursor' ? (
                    <p>
                      <strong>Cursor on a Mac</strong> doesn't read that file when opened from the Dock. Press Cmd+Shift+P, run{' '}
                      <strong>Shell Command: Install 'cursor' command</strong> once, and from now on start Cursor from the
                      terminal: <C>cd &lt;folder&gt; &amp;&amp; cursor .</C>
                    </p>
                  ) : (
                    <p>On a Mac, desktop apps opened from the Dock don't read that file. Use the terminal version of {ag.name}.</p>
                  )}
                </Step>
                <Step title="Install the BlueStep plugin.">
                  <div>{ag.plugin}</div>
                </Step>
                <Step title="Optional: install phi-guard.">
                  <p>Recommended if you store client health data. It blocks the agent from writing anything that looks like real client data into your code.</p>
                  <div>{ag.phi}</div>
                </Step>
                <Step title="Check the connection.">
                  <p>Quit {ag.name} completely, reopen it, and ask:</p>
                  <Code>List the BlueStep organizations I can reach.</Code>
                  <p>You should see your organization's name. If not, see Troubleshooting below.</p>
                </Step>
              </Steps>
              <p>Plugins and the gateway load only when the agent starts, so after any change in this part, quit it fully and start it again.</p>
            </Part>

            <Part
              id="workspace"
              n="Part 4"
              title="Set up your BlueStep workspace"
              lead="A workspace is one folder on your computer that holds local copies of your BlueStep scripts. BlueStep stays the source of truth: you create things there, pull them down, change them, and push them back."
            >
              <Steps>
                <Step title="Make the folder.">
                  <p>
                    Mac: <C>mkdir -p ~/BlueStep</C>. Windows: <C>mkdir $HOME\BlueStep</C>.
                  </p>
                </Step>
                <Step title={`Open ${ag.name} in it.`} />
                <Step title="Run setup.">
                  <Code>{cmd('b6p-setup')}</Code>
                  <p>
                    The agent checks your tools, token and gateway, then writes the project files: <C>AGENTS.md</C> (the rules
                    all three agents read), settings and a README. Approve what it asks.
                    {agentId === 'codex' && ' It also gives you one copy command for BlueStep\'s helper agents; run it.'} When
                    it finishes, quit and reopen the agent in the same folder.
                  </p>
                </Step>
                <Step title="Pull an existing script to practice.">
                  <p>
                    In BlueStep, open any script or merge report your org already has and copy its <strong>DAV URL</strong>{' '}
                    from its page. Then:
                  </p>
                  <Code>{`${cmd('b6p-pull')} <paste the DAV URL>`}</Code>
                  <p>
                    A folder named after your org's unit number (like <C>U141234/</C>) appears with the script inside.
                  </p>
                </Step>
                <Step title="Ask the agent to explain it.">
                  <Code>Explain what this script does in plain English.</Code>
                  <p>It's the fastest way to learn how your org is built.</p>
                </Step>
              </Steps>
              <Table
                head={['Command', 'When']}
                rows={[
                  [<C key="p">{`${cmd('b6p-pull')} <DAV URL>`}</C>, 'Bring a script down, or refresh it after someone changed it in BlueStep'],
                  [<C key="u">{cmd('b6p-push')}</C>, 'Send your changes back to BlueStep and publish them'],
                ]}
              />
            </Part>

            <Part
              id="gitsite"
              n="Part 5"
              title="Build your first GitSite"
              lead={
                <>
                  A GitSite is a BlueStep website whose pages come from a GitHub repository. You push code to GitHub; BlueStep
                  serves it at <C>https://&lt;your-domain&gt;/spa/</C>.
                </>
              }
            >
              <Callout>
                Keep the repo <strong>public</strong> (BlueStep deploys public repos with no extra keys), so anyone can read the
                code. <strong>Never put passwords, tokens or client data in it.</strong> Your data stays in BlueStep and is
                fetched only when a signed-in user opens the page.
              </Callout>
              <Steps>
                <Step title="Make a new folder, outside your BlueStep workspace, and open your agent in it.">
                  <p>
                    Mac: <C>mkdir -p ~/Sites/my-first-gitsite</C>. Windows: <C>mkdir $HOME\Sites\my-first-gitsite</C>.
                  </p>
                </Step>
                <Step title="Paste this prompt:">
                  <Code>{`Create a BlueStep GitSite starter in this folder:
- Vite + React + TypeScript. Source in app/. Vite base must be '/spa/'.
- \`npm run build\` writes index.html and assets/ to the REPO ROOT (not dist/),
  and the build output is committed - BlueStep serves the repo as-is.
- Client-side routing that works on deep links.
- A simple home page that says "Hello from Slate" with our org name.
Build it, confirm index.html and assets/ are at the root, then create a PUBLIC
GitHub repo with gh, commit and push to main. Finally generate a strong webhook
secret and show it to me once.`}</Code>
                </Step>
                <Step title="Approve the installs, build and GitHub steps.">
                  <p>Note the repo URL and the webhook secret the agent gives you.</p>
                </Step>
                <Step title="Create the site in BlueStep: Admin → Sites → New Git Site.">
                  <ul className="list-disc space-y-1 pl-5">
                    <li>Name and domain: as for any BlueStep website (ask BlueStep if you need a new domain).</li>
                    <li>
                      Repository URL: your repo's URL. <strong>Git Ref:</strong> <C>main</C> (type it exactly).{' '}
                      <strong>Index Path:</strong> <C>index.html</C>.
                    </li>
                    <li>
                      GitHub Token: leave blank. <strong>Webhook Secret:</strong> paste the secret.
                    </li>
                    <li>Save. The first deploy runs.</li>
                  </ul>
                </Step>
                <Step title="Open it.">
                  <p>
                    Go to <C>https://&lt;your-domain&gt;/spa/</C>. You should see "Hello from Slate".
                  </p>
                </Step>
                <Step title="Turn on auto-deploy.">
                  <Code>Add a GitHub push webhook to this repo pointing at https://&lt;your-domain&gt;/spa/webhook using the secret you generated.</Code>
                </Step>
                <Step title="Prove the loop.">
                  <Code>Change the heading to "Our first Slate app", rebuild, commit and push.</Code>
                  <p>Refresh the page within a minute: the change is live.</p>
                </Step>
              </Steps>
            </Part>

            <Part
              id="dashboard"
              n="Part 6"
              title="Build something real: a live caseload dashboard"
              lead={
                <>
                  Two pieces: a BlueStep <strong className="text-ink">endpoint</strong> (a small script at <C>/b/caseload</C>{' '}
                  that returns your active clients as data) and a dashboard page on your GitSite that shows them. Because both
                  live on the same domain, the dashboard uses the viewer's own BlueStep login: no keys in the code, and each
                  person sees only what BlueStep already lets them see.
                </>
              }
            >
              <DataFlow />
              <Steps>
                <Step title="Create the endpoint.">
                  <p>Open your agent in your BlueStep workspace and paste:</p>
                  <Code>{`I want an endpoint script at /b/caseload on the same site as my GitSite.
It requires login and returns JSON for active clients: name, program,
admit date and days in care. Find the right forms and fields in my org first
and show me what you'll use before building. Create the script on the
platform, pull it, write it, and push it.`}</Code>
                </Step>
                <Step title="Approve as it goes.">
                  <p>
                    The agent looks up your forms and fields through the gateway, shows you the plan, asks before creating the
                    script in BlueStep, then pulls, writes and publishes it with <C>{cmd('b6p-push')}</C>.
                  </p>
                </Step>
                <Step title="Test it.">
                  <p>
                    Sign in to BlueStep in your browser and open <C>https://&lt;your-domain&gt;/b/caseload</C>. You should see
                    your clients as text. Signed out, it should send you to the login page.
                  </p>
                </Step>
                <Step title="Build the dashboard.">
                  <p>Open your agent in your GitSite folder and paste:</p>
                  <Code>{`Add a Caseload page that calls /b/caseload (same origin, send cookies).
Show a count of active clients, a bar chart by program, and a searchable
table sorted by days in care. If the call is redirected to login, show a
"Please sign in to BlueStep" message with a link. Rebuild, commit and push.`}</Code>
                </Step>
                <Step title="Open it.">
                  <p>
                    Go to <C>https://&lt;your-domain&gt;/spa/caseload</C> while signed in. You now have a live dashboard on your
                    own data, built without writing code yourself.
                  </p>
                </Step>
              </Steps>
              <p>
                Ideas for your next build: an intake form that writes a new client record, a family portal that shows a parent
                only their own child, a daily census email, or a staff training tracker. Describe the outcome and who should see
                what; your agent handles the rest.
              </p>
            </Part>

            <Part id="help" n="Every day" title="Workflow, rules and troubleshooting">
              <p>
                <strong>Every session:</strong> open your agent in the right folder (your BlueStep workspace or a GitSite folder)
                and describe the outcome you want. For anything bigger than a small fix, start with <C>{cmd('spec-create')}</C>{' '}
                so the agent writes requirements and a design for you to approve before building; for a bug or small change,
                use <C>{cmd('quick-task')}</C>.
              </p>
              <p className="font-medium text-ink">Rules that keep you safe:</p>
              <ul className="list-disc space-y-1.5 pl-5">
                <li>New scripts, forms and fields are created in BlueStep first (the agent does this through the gateway, with your approval), then pulled. Never invent them locally.</li>
                <li>Test on a sandbox org or test records before touching live clients.</li>
                <li>Never paste your token, passwords or real client data into the chat or into a GitSite repo.</li>
                <li>Read approval prompts. If one surprises you, say No and ask the agent why.</li>
                <li>
                  Keep the plugin current: {ag.update}.
                </li>
              </ul>
              <p className="pt-2 font-medium text-ink">Troubleshooting:</p>
              <Table
                head={['Symptom', 'Fix']}
                rows={[
                  ['"command not found"', 'Close and reopen the terminal. Still missing: re-run that tool\'s install step.'],
                  ["The agent can't list your BlueStep orgs", 'Token not in the environment, or the agent started before you set it. Redo Part 3 step 3, quit the agent fully, start again. Still failing: your token may be expired; ask BlueStep for a new one.'],
                  ['A b6p command asks "Enter your access token"', <>Run <C key="a">b6p auth set</C> in a plain terminal.</>],
                  ['BlueStep commands are missing', `Plugin not installed or agent not restarted. Redo Part 3 step 4.${agentId === 'codex' ? ' In Codex, type $ instead of /.' : ''}`],
                  ...(agentId === 'codex'
                    ? [["Codex ignores the BlueStep rules", <>Its hooks aren't trusted. Type <C key="h">/hooks</C> and trust them, again after every plugin update.</>]]
                    : []),
                  ['GitSite deploy says "404 for ref main"', 'Git Ref is mistyped, or the repo is private. Fix the ref or make the repo public.'],
                  ['GitSite page is blank', <>The build isn't committed at the repo root, or Vite base isn't <C key="b">/spa/</C>. Ask the agent to check both.</>],
                  ["Pushes to GitHub don't update the site", "Webhook missing or secret mismatch. Ask the agent to check the webhook's last delivery."],
                  ['Dashboard says "Please sign in" while you are signed in', 'The GitSite and the endpoint are on different domains. They must share one.'],
                ]}
              />
              <p>
                Still stuck: run <C>{cmd('b6p-setup')}</C> to re-check everything, then contact your BlueStep representative with
                what it reports.
              </p>
            </Part>
          </div>
        </div>
      </Container>
    </>
  )
}
