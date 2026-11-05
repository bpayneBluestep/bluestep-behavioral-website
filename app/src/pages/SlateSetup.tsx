import { useEffect, useState, type ReactNode } from 'react'
import { useSearchParams } from 'react-router-dom'
import { AppleLogo, Check, Copy, WindowsLogo } from '@phosphor-icons/react'
import { Container, PageHero, useTitle } from '../ui'

// Unlisted customer setup guide for Slate: shared by link, never linked from the
// nav or footer, and marked noindex so search engines leave it out.
// Written for people using the agents' desktop apps (Claude, Codex, Cursor), not a
// command line. The reader picks an agent and an OS; both live in the URL
// (?agent=&os=) so a shared link opens on the same version.

type AgentId = 'claude' | 'codex' | 'cursor'
type OsId = 'mac' | 'windows'

const AGENT_IDS: AgentId[] = ['claude', 'codex', 'cursor']
const OS_IDS: OsId[] = ['mac', 'windows']

const AGENT_NAMES: Record<AgentId, string> = { claude: 'Claude', codex: 'Codex', cursor: 'Cursor' }
const OS_NAMES: Record<OsId, string> = { mac: 'Mac', windows: 'Windows' }

const MARKETPLACE = 'https://github.com/Bluestep-Systems/bspecs'

/** Best guess at the reader's OS when the link doesn't say. */
function detectOs(): OsId {
  if (typeof navigator === 'undefined') return 'mac'
  return /Win/i.test(navigator.userAgent) ? 'windows' : 'mac'
}

/** Everything that differs between Mac and Windows, in one place. */
function osInfo(os: OsId) {
  const mac = os === 'mac'
  return {
    mac,
    mod: mac ? 'Cmd' : 'Ctrl',
    files: mac ? 'Finder' : 'File Explorer',
    editor: mac ? 'TextEdit' : 'Notepad',
    docs: mac ? 'Documents' : 'Documents',
    newFolder: mac ? 'File → New Folder' : 'New → Folder',
  }
}

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
    <section id={id} className="scroll-mt-40 border-t border-line py-12 first:border-t-0">
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

/** One segmented radio group: the agent or the OS. */
function Picker<T extends string>({
  label,
  options,
  names,
  value,
  onChange,
  icon,
}: {
  label: string
  options: readonly T[]
  names: Record<T, string>
  value: T
  onChange: (v: T) => void
  icon?: (v: T) => ReactNode
}) {
  return (
    <div>
      <p className="mb-2 text-xs font-medium uppercase tracking-wider text-muted">{label}</p>
      <div role="radiogroup" aria-label={label} className="inline-flex flex-wrap rounded-full border border-line bg-surface p-1">
        {options.map((id) => (
          <button
            key={id}
            type="button"
            role="radio"
            aria-checked={value === id}
            onClick={() => onChange(id)}
            className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm transition ${
              value === id ? 'bg-bg font-medium text-ink shadow-sm' : 'text-muted hover:text-ink'
            }`}
          >
            {icon?.(id)}
            {names[id]}
          </button>
        ))}
      </div>
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
  ['ready', '1. Get ready'],
  ['plugin', '2. Add BlueStep'],
  ['key', '3. Your BlueStep key'],
  ['workspace', '4. Your workspace'],
  ['gitsite', '5. Your first website'],
  ['dashboard', '6. A live dashboard'],
  ['help', 'Everyday use and help'],
] as const

export default function SlateSetup() {
  useTitle('Slate setup guide')
  const [params, setParams] = useSearchParams()
  const pa = params.get('agent')
  const po = params.get('os')
  const agent: AgentId = AGENT_IDS.includes(pa as AgentId) ? (pa as AgentId) : 'claude'
  const os: OsId = OS_IDS.includes(po as OsId) ? (po as OsId) : detectOs()
  const o = osInfo(os)
  const name = AGENT_NAMES[agent]
  const cmd = (c: string) => `${agent === 'codex' ? '$' : '/'}${c}`

  // Unlisted: keep it out of search results.
  useEffect(() => {
    const meta = document.createElement('meta')
    meta.name = 'robots'
    meta.content = 'noindex, nofollow'
    document.head.appendChild(meta)
    return () => meta.remove()
  }, [])

  const set = (key: 'agent' | 'os', value: string) => {
    const next = new URLSearchParams(params)
    next.set(key, value)
    setParams(next, { replace: true })
  }

  // ---- Agent × OS specifics -------------------------------------------------

  const plan = {
    claude: 'a paid Claude plan (Pro, Max, Team or Enterprise)',
    codex: 'a paid ChatGPT plan (Plus, Pro, Business or Enterprise)',
    cursor: 'a paid Cursor plan',
  }[agent]

  const getApp: ReactNode = {
    claude: (
      <>
        Download the Claude app from <A href="https://claude.ai/download">claude.ai/download</A>, install it, and sign in.
        You'll use its <strong>Code</strong> tab.
      </>
    ),
    codex: (
      <>
        Download the Codex app from <A href="https://openai.com/codex">openai.com/codex</A>, install it, and sign in with
        your ChatGPT account.
      </>
    ),
    cursor: (
      <>
        Download Cursor from <A href="https://cursor.com">cursor.com</A>, install it, and sign in when it first opens.
      </>
    ),
  }[agent]

  /** How to start working in a folder, in this app. */
  const openIn = (folder: string): ReactNode =>
    ({
      claude: (
        <>
          In the Claude app, click the <strong>Code</strong> tab. Under the message box, pick <strong>Local</strong>, then
          click the folder button → <strong>Open folder…</strong> and choose <strong>{folder}</strong>.
        </>
      ),
      codex: (
        <>
          In the Codex app, start a new project and choose the <strong>{folder}</strong> folder.
        </>
      ),
      cursor: (
        <>
          In Cursor, choose <strong>File → Open Folder</strong>, pick <strong>{folder}</strong>, then open the Agent panel (
          {o.mod}+I).
        </>
      ),
    })[agent]

  /** Where the one typed command goes. */
  const terminal: ReactNode = {
    claude: (
      <>
        click <strong>Terminal</strong> at the top of your Code session (or press Ctrl+`)
      </>
    ),
    codex: o.mac ? (
      <>
        open the Mac's <strong>Terminal</strong> app (press Cmd+Space, type Terminal, press Enter)
      </>
    ) : (
      <>
        open <strong>PowerShell</strong> (press the Windows key, type PowerShell, press Enter)
      </>
    ),
    cursor: (
      <>
        choose <strong>Terminal → New Terminal</strong> from Cursor's menu bar
      </>
    ),
  }[agent]

  const plugin: ReactNode = {
    claude: (
      <ol className="list-decimal space-y-1.5 pl-5">
        <li>
          In the Claude app's left sidebar, click <strong>Customize</strong>, then <strong>Plugins</strong>.
        </li>
        <li>
          Click <strong>+</strong> next to Personal plugins → <strong>Add marketplace</strong> →{' '}
          <strong>From repository</strong>.
        </li>
        <li>
          Paste <C>{MARKETPLACE}</C> and click <strong>Done</strong>.
        </li>
        <li>
          Click <strong>Browse plugins</strong>, find <strong>bluestep-tools</strong>, and click <strong>Install</strong>.
        </li>
        <li>
          In that marketplace's settings, turn on <strong>Sync automatically</strong> so updates arrive on their own.
        </li>
      </ol>
    ),
    codex: (
      <ol className="list-decimal space-y-1.5 pl-5">
        <li>
          Ask Codex: <C>Add the BlueStep plugin marketplace by running: codex plugin marketplace add Bluestep-Systems/bspecs</C>{' '}
          and approve it.
        </li>
        <li>
          Open Codex's <strong>Plugins</strong> screen, find <strong>bluestep-tools</strong>, and click{' '}
          <strong>Install</strong>.
        </li>
        <li>
          On the plugin's page, choose <strong>Review → Trust</strong> for its hooks. Until you do, BlueStep's safety checks
          quietly do nothing.
        </li>
      </ol>
    ),
    cursor: (
      <ol className="list-decimal space-y-1.5 pl-5">
        <li>
          Click <strong>Connect GitHub</strong> in Cursor's sidebar and sign in. Without this, the next step silently adds
          nothing.
        </li>
        <li>
          Open Cursor's <strong>Plugins</strong> screen → <strong>Add Marketplace</strong> →{' '}
          <strong>Import from Repo</strong>, and paste <C>{MARKETPLACE}</C>.
        </li>
        <li>
          Install <strong>bluestep-tools</strong>. If it shows as off, turn it on in <strong>Manage</strong>.
        </li>
      </ol>
    ),
  }[agent]

  const phi: ReactNode = {
    claude: (
      <>
        In <strong>Customize → Plugins → Browse plugins</strong>, install <strong>phi-guard</strong> too.
      </>
    ),
    codex: (
      <>
        On the Plugins screen, install <strong>phi-guard</strong> too and trust its hook the same way.
      </>
    ),
    cursor: (
      <>
        On the Plugins screen, install <strong>phi-guard</strong> from the same marketplace.
      </>
    ),
  }[agent]

  const quit = {
    claude: o.mac ? 'Quit Claude completely (Cmd+Q) and open it again' : 'Quit Claude completely (File → Exit) and open it again',
    codex: o.mac ? 'Quit Codex completely (Cmd+Q) and open it again' : 'Quit Codex completely and open it again',
    cursor: o.mac ? 'Quit Cursor completely (Cmd+Q) and open it again' : 'Quit Cursor completely and open it again',
  }[agent]

  // Where the gateway's copy of the key lives depends on the app and the OS.
  const keyKind: 'claude' | 'mac-login' | 'win-env' = agent === 'claude' ? 'claude' : o.mac ? 'mac-login' : 'win-env'

  const keyPrompt =
    keyKind === 'claude'
      ? `Help me store my BlueStep key without ever seeing it.
1. If the b6p tool isn't installed, install it: npm i -g @bluestep-systems/b6p-cli
2. In my Claude user settings file (${o.mac ? '~/.claude/settings.json' : '%USERPROFILE%\\.claude\\settings.json'}),
   add B6PT_TOKEN to the "env" section with the value PASTE-YOUR-KEY-HERE.
   Keep everything else in the file exactly as it is.
3. Open that file for me in ${o.editor}.
Never ask me for the key.`
      : keyKind === 'mac-login'
        ? `Help me store my BlueStep key without ever seeing it.
1. If the b6p tool isn't installed, install it: npm i -g @bluestep-systems/b6p-cli
2. Create a login item at ~/Library/LaunchAgents/net.bluestep.key.plist that runs
   launchctl setenv B6PT_TOKEN PASTE-YOUR-KEY-HERE each time I log in.
3. Open that file for me in TextEdit.
Never ask me for the key.`
        : `If the b6p tool isn't installed, install it: npm i -g @bluestep-systems/b6p-cli`

  // ---------------------------------------------------------------------------

  return (
    <>
      <PageHero
        kicker="Slate setup guide"
        title="Set up Slate, step by step."
        sub="Connect your AI assistant to BlueStep, put a website live, and build a dashboard on your own data. No coding experience needed. Plan on about two hours the first time; most of it is waiting for downloads."
      >
        <div className="w-full">
          <p className="mb-4 text-sm text-muted">Tell us what you're using. Every step below changes to match.</p>
          <div className="flex flex-wrap gap-6">
            <Picker label="AI assistant" options={AGENT_IDS} names={AGENT_NAMES} value={agent} onChange={(v) => set('agent', v)} />
            <Picker
              label="Computer"
              options={OS_IDS}
              names={OS_NAMES}
              value={os}
              onChange={(v) => set('os', v)}
              icon={(v) => (v === 'mac' ? <AppleLogo size={15} weight="fill" /> : <WindowsLogo size={15} weight="fill" />)}
            />
          </div>
        </div>
      </PageHero>

      {/* Sticky reminder of the current choice, so a reader deep in the page knows which version they're on. */}
      <div className="sticky top-16 z-20 border-b border-line bg-bg/90 backdrop-blur">
        <Container className="flex items-center justify-between gap-3 py-2.5 text-sm">
          <p className="hidden text-muted md:block">
            Showing steps for <strong className="font-medium text-ink">{name}</strong> on{' '}
            <strong className="font-medium text-ink">{OS_NAMES[os]}</strong>
          </p>
          <div className="-mx-1 flex min-w-0 gap-1 overflow-x-auto whitespace-nowrap px-1">
            {AGENT_IDS.map((id) => (
              <button
                key={id}
                type="button"
                onClick={() => set('agent', id)}
                aria-pressed={agent === id}
                className={`shrink-0 rounded-full px-2.5 py-1 text-xs transition sm:px-3 ${agent === id ? 'bg-accent text-accent-ink' : 'text-muted hover:text-ink'}`}
              >
                {AGENT_NAMES[id]}
              </button>
            ))}
            <span className="mx-0.5 w-px shrink-0 bg-line" aria-hidden />
            {OS_IDS.map((id) => (
              <button
                key={id}
                type="button"
                onClick={() => set('os', id)}
                aria-pressed={os === id}
                className={`shrink-0 rounded-full px-2.5 py-1 text-xs transition sm:px-3 ${os === id ? 'bg-accent text-accent-ink' : 'text-muted hover:text-ink'}`}
              >
                {OS_NAMES[id]}
              </button>
            ))}
          </div>
        </Container>
      </div>

      <Container className="pb-24 md:pb-32">
        <div className="grid grid-cols-[minmax(0,1fr)] gap-12 lg:grid-cols-[200px_minmax(0,1fr)]">
          <nav aria-label="On this page" className="hidden lg:block">
            <ul className="sticky top-36 space-y-2 pt-12 text-sm">
              {TOC.map(([id, label]) => (
                <li key={id}>
                  <a href={`#${id}`} className="text-muted hover:text-ink">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="min-w-0 max-w-3xl">
            <Part
              id="overview"
              n="Overview"
              title="How Slate works"
              lead={
                <>
                  Slate pairs BlueStep with an AI assistant on your computer, here {name}. You describe what you want in
                  everyday language. {name} looks at how your BlueStep is set up, does the technical work, and asks you before
                  it changes anything.
                </>
              }
            >
              <Callout>
                <strong>You can't break anything in Parts 1 to 4.</strong> They only install software and connect accounts.
                Nothing changes in your live BlueStep data until you approve it, and we recommend trying new builds on a test
                site first.
              </Callout>
              <p className="font-medium text-ink">Before you start, have these ready:</p>
              <ul className="list-disc space-y-1.5 pl-5">
                <li>
                  {o.mac ? 'A Mac with an Apple chip (M1 or newer)' : 'A Windows 10 or 11 PC'} that you're allowed to install
                  software on.
                </li>
                <li>{plan[0].toUpperCase() + plan.slice(1)}.</li>
                <li>Your BlueStep login, with admin access.</li>
                <li>
                  <strong>Your BlueStep key.</strong> It's a long code that starts with <C>b6pt_</C> and lets {name} work in
                  your BlueStep. Ask your BlueStep contact for one, and treat it like a password.
                </li>
              </ul>
              <p className="pt-2 font-medium text-ink">What you'll install, and why:</p>
              <Table
                head={['What', 'Why you need it']}
                rows={[
                  [name, `The AI assistant that does the work for you.`],
                  ['The BlueStep plugin', `Teaches ${name} how BlueStep works and connects it to your organization.`],
                  ['Node.js', 'A free helper program that BlueStep’s tools run on. You won’t use it directly.'],
                  ['GitHub', 'A free service that stores your website. When it changes, BlueStep updates your site.'],
                ]}
              />
            </Part>

            <Part id="ready" n="Part 1 · about 30 minutes" title="Get ready" lead="Ordinary downloads and installers, nothing to type.">
              <Steps>
                <Step title={`Install ${name}.`}>
                  <p>
                    {getApp} You need {plan}.
                  </p>
                </Step>
                <Step title="Install Node.js.">
                  <p>
                    Go to <A href="https://nodejs.org">nodejs.org</A>, download the <strong>LTS</strong> version for{' '}
                    {o.mac ? 'macOS' : 'Windows'}, and click through the installer with the default choices.
                  </p>
                </Step>
                {!o.mac && (
                  <Step title="Install Git.">
                    <p>
                      Download <strong>Git for Windows</strong> from <A href="https://git-scm.com/download/win">git-scm.com</A>{' '}
                      and click through the installer with the default choices. BlueStep's tools use it behind the scenes.
                    </p>
                  </Step>
                )}
                <Step title="Create a free GitHub account.">
                  <p>
                    Sign up at <A href="https://github.com/signup">github.com/signup</A> if you don't have one.
                  </p>
                </Step>
                <Step title="Install the GitHub helper.">
                  <p>
                    Download the {o.mac ? 'macOS' : 'Windows'} installer from <A href="https://cli.github.com">cli.github.com</A>{' '}
                    and run it. {name} uses it to publish your website; you won't open it yourself.
                  </p>
                </Step>
              </Steps>
              <p>
                <strong>Done when:</strong> {name} opens and you're signed in.
              </p>
            </Part>

            <Part
              id="plugin"
              n="Part 2 · about 10 minutes"
              title={`Add BlueStep to ${name}`}
              lead={`You'll make one folder for your BlueStep work, open it in ${name}, and install the BlueStep plugin.`}
            >
              <Steps>
                <Step title="Make a folder for your BlueStep work.">
                  <p>
                    In {o.files}, open <strong>{o.docs}</strong> and create a new folder ({o.newFolder}) named{' '}
                    <strong>BlueStep</strong>.
                  </p>
                </Step>
                <Step title={`Open it in ${name}.`}>
                  <p>{openIn('BlueStep')}</p>
                </Step>
                {o.mac && (
                  <Step title="Let your Mac install its developer tools.">
                    <p>
                      Ask {name}: <C>Check whether Git is installed. If it isn't, start Apple's installer for it.</C> When a
                      window asks to install the command line developer tools, click <strong>Install</strong> and wait for it to
                      finish (a few minutes).
                    </p>
                  </Step>
                )}
                <Step title="Install the BlueStep plugin.">{plugin}</Step>
                <Step title="Recommended: install phi-guard.">
                  <p>
                    If you work with client health information, add this safety net. It stops {name} from ever writing anything
                    that looks like real client data into your files. {phi}
                  </p>
                </Step>
                <Step title={`${quit}.`}>
                  <p>New plugins only load when the app starts.</p>
                </Step>
              </Steps>
              <p>
                <strong>Done when:</strong> typing <C>{agent === 'codex' ? '$' : '/'}</C> in {name}'s message box lists commands
                starting with <C>b6p</C>.
              </p>
            </Part>

            <Part
              id="key"
              n="Part 3 · about 10 minutes"
              title="Connect your BlueStep key"
              lead={`${name} needs your BlueStep key in two places. You'll paste it yourself both times, so ${name} never sees it.`}
            >
              <Callout>
                <strong>Never paste your BlueStep key into the {name} chat</strong>, an email, or a shared document. Anyone who
                has it can act as you in BlueStep.
              </Callout>
              <Steps>
                {keyKind === 'win-env' ? (
                  <>
                    <Step title="Let it install BlueStep's sync tool.">
                      <p>Open {name} in your BlueStep folder and paste:</p>
                      <Code>{keyPrompt}</Code>
                      <p>Approve when it asks.</p>
                    </Step>
                    <Step title="Save your key in Windows.">
                      <ol className="list-decimal space-y-1.5 pl-5">
                        <li>
                          Press the Windows key, type <strong>environment variables</strong>, and open{' '}
                          <strong>Edit environment variables for your account</strong>.
                        </li>
                        <li>
                          Under <strong>User variables</strong>, click <strong>New…</strong>
                        </li>
                        <li>
                          Variable name: <C>B6PT_TOKEN</C>. Variable value: paste your key. Click <strong>OK</strong>, then{' '}
                          <strong>OK</strong> again.
                        </li>
                      </ol>
                    </Step>
                  </>
                ) : (
                  <>
                    <Step title={`Ask ${name} to prepare a spot for your key.`}>
                      <p>Open {name} in your BlueStep folder and paste:</p>
                      <Code>{keyPrompt}</Code>
                      <p>Approve when it asks. A file opens in {o.editor}.</p>
                    </Step>
                    <Step title="Paste your key into that file.">
                      <p>
                        Find <C>PASTE-YOUR-KEY-HERE</C>, replace it with your key (keep any quote marks around it), and save.
                        {keyKind === 'mac-login' && ' Then log out of your Mac and back in, so the key loads.'}
                      </p>
                    </Step>
                  </>
                )}
                <Step title="Give the key to BlueStep's sync tool.">
                  <p>
                    This is the one command you'll type in this guide. In {name}, {terminal}. Type this and press Enter:
                  </p>
                  <Code>b6p auth set</Code>
                  <p>When it asks, paste your key and press Enter. It's stored encrypted on your computer.</p>
                </Step>
                <Step title={`${quit}.`} />
                <Step title="Check the connection.">
                  <p>Open {name} in your BlueStep folder again and ask:</p>
                  <Code>List the BlueStep organizations I can reach.</Code>
                </Step>
              </Steps>
              <p>
                <strong>Done when:</strong> {name} answers with your organization's name. If it can't, see Help at the bottom.
              </p>
            </Part>

            <Part
              id="workspace"
              n="Part 4 · about 15 minutes"
              title="Set up your BlueStep workspace"
              lead="Your BlueStep folder becomes a workspace: a local copy of the BlueStep pieces you work on. BlueStep stays the master copy, so you bring pieces down, change them here, and send them back."
            >
              <Steps>
                <Step title={`Open ${name} in your BlueStep folder.`} />
                <Step title="Run the BlueStep setup.">
                  <p>Type this in the message box and press Enter:</p>
                  <Code>{cmd('b6p-setup')}</Code>
                  <p>
                    {name} checks everything from Parts 1 to 3 and adds a few settings files to the folder. Approve what it asks.
                    {agent === 'codex' && " It also gives you one copy step for BlueStep's helper agents; follow it."}{' '}
                    When it's done, quit {name} completely and open it again.
                  </p>
                </Step>
                <Step title="Bring down something you already have, to practice.">
                  <p>
                    In BlueStep, open any script or report your organization already uses and copy its <strong>DAV URL</strong>{' '}
                    (the web address shown on its settings page). Then type:
                  </p>
                  <Code>{`${cmd('b6p-pull')} <paste the DAV URL>`}</Code>
                </Step>
                <Step title={`Ask ${name} to explain it.`}>
                  <Code>Explain what this does, in plain English.</Code>
                  <p>It's the quickest way to learn how your BlueStep is built.</p>
                </Step>
              </Steps>
              <p>
                <strong>Done when:</strong> a new folder named like <C>U141234</C> appears inside BlueStep and {name} has
                explained what's in it.
              </p>
            </Part>

            <Part
              id="gitsite"
              n="Part 5 · about 30 minutes"
              title="Put your first website live"
              lead="BlueStep can host a website whose pages are stored on GitHub (a GitSite). Each time the site changes on GitHub, BlueStep updates it, usually within a minute."
            >
              <Callout>
                The website's code is <strong>public</strong> on GitHub, which keeps setup simple.{' '}
                <strong>Never put passwords, keys or client information in it.</strong> Client data stays in BlueStep, and the
                site only shows it to people who are signed in.
              </Callout>
              <Steps>
                <Step title="Make a second folder for the website.">
                  <p>
                    In {o.files}, inside <strong>{o.docs}</strong> (not inside BlueStep), create a folder named{' '}
                    <strong>my-first-site</strong>.
                  </p>
                </Step>
                <Step title={`Open it in ${name} and paste:`}>
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
                    If it shows a GitHub code, open <A href="https://github.com/login/device">github.com/login/device</A>, enter
                    the code, and approve. Write down the <strong>repository address</strong> and the{' '}
                    <strong>webhook secret</strong> it gives you.
                  </p>
                </Step>
                <Step title="Create the site in BlueStep.">
                  <p>
                    Go to <strong>Admin → Sites → New Git Site</strong> and fill in:
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
                  <p>Tell {name} (use your domain):</p>
                  <Code>Add a GitHub push webhook to this repo pointing at https://&lt;your-domain&gt;/spa/webhook using the secret you generated.</Code>
                </Step>
                <Step title="Try a change.">
                  <Code>Change the heading to "Our first Slate app", rebuild, commit and push.</Code>
                </Step>
              </Steps>
              <p>
                <strong>Done when:</strong> <C>https://&lt;your-domain&gt;/spa/</C> shows "Our first Slate app" a minute after
                that last step.
              </p>
            </Part>

            <Part
              id="dashboard"
              n="Part 6 · about 30 minutes"
              title="Build something real: a live caseload dashboard"
              lead={
                <>
                  Now the website shows real BlueStep data. {name} builds two pieces: a small BlueStep script that hands over a
                  list of your active clients (a <strong className="text-ink">data link</strong>), and a dashboard page that
                  displays it. Because both live on your BlueStep domain, each person who opens the dashboard sees only what
                  BlueStep already lets them see.
                </>
              }
            >
              <DataFlow />
              <Steps>
                <Step title="Build the data link.">
                  <p>Open {name} in your BlueStep folder and paste:</p>
                  <Code>{`I want an endpoint script at /b/caseload on the same site as my GitSite.
It requires login and returns JSON for active clients: name, program,
admit date and days in care. Find the right forms and fields in my org first
and show me what you'll use before building. Create the script on the
platform, pull it, write it, and push it.`}</Code>
                  <p>
                    {name} looks up your forms, shows you its plan, and asks before it creates anything in BlueStep. Read the plan
                    and approve it if it looks right.
                  </p>
                </Step>
                <Step title="Check it.">
                  <p>
                    While signed in to BlueStep, open <C>https://&lt;your-domain&gt;/b/caseload</C>. You should see your clients
                    as plain text. In a private browser window, signed out, you should get the login page instead.
                  </p>
                </Step>
                <Step title="Build the dashboard.">
                  <p>Open {name} in your my-first-site folder and paste:</p>
                  <Code>{`Add a Caseload page that calls /b/caseload (same origin, send cookies).
Show a count of active clients, a bar chart by program, and a searchable
table sorted by days in care. If the call is redirected to login, show a
"Please sign in to BlueStep" message with a link. Rebuild, commit and push.`}</Code>
                </Step>
              </Steps>
              <p>
                <strong>Done when:</strong> <C>https://&lt;your-domain&gt;/spa/caseload</C> shows your live caseload while you're
                signed in.
              </p>
              <p>
                What next? An intake form that creates a new client, a family portal that shows parents only their own child, a
                daily census email, a staff training tracker. Describe what you want and who should see it; {name} handles the
                rest.
              </p>
            </Part>

            <Part id="help" n="Everyday use" title="Working day to day, and getting help">
              <p>
                <strong>Each time:</strong> open {name} in the right folder (BlueStep for BlueStep work, your site's folder for
                the website) and describe what you want. For anything bigger than a small fix, start with{' '}
                <C>{cmd('spec-create')}</C>: {name} writes a plan for you to approve before it builds. For a quick fix, use{' '}
                <C>{cmd('quick-task')}</C>.
              </p>
              <p className="font-medium text-ink">Good habits:</p>
              <ul className="list-disc space-y-1.5 pl-5">
                <li>Read what {name} asks before you approve. If something surprises you, say no and ask why.</li>
                <li>Try new builds on a test site or test records before your real clients.</li>
                <li>Keep your BlueStep key, passwords and client information out of the chat and out of your website's code.</li>
              </ul>
              <p className="pt-2 font-medium text-ink">If something goes wrong:</p>
              <Table
                head={['What you see', 'What to do']}
                rows={[
                  [
                    `No b6p commands when you type ${agent === 'codex' ? '$' : '/'}`,
                    agent === 'codex'
                      ? 'The plugin isn’t installed or its hooks aren’t trusted, or Codex hasn’t restarted. Redo Part 2.'
                      : `The plugin isn't installed, or ${name} hasn't restarted. Redo Part 2.`,
                  ],
                  [
                    `${name} can't list your BlueStep organizations`,
                    keyKind === 'claude'
                      ? 'Check the settings file from Part 3: your key replaced PASTE-YOUR-KEY-HERE and the file is saved. Quit Claude completely and reopen it. Still stuck? Your key may have expired; ask BlueStep for a new one.'
                      : keyKind === 'mac-login'
                        ? `Check the file from Part 3 holds your key, then log out of your Mac and back in. Still stuck? Your key may have expired; ask BlueStep for a new one.`
                        : `Check the B6PT_TOKEN variable from Part 3, then quit ${name} completely and reopen it. Still stuck? Your key may have expired; ask BlueStep for a new one.`,
                  ],
                  ['It says b6p "isn’t recognized" or "not found"', `Ask ${name} to install it: npm i -g @bluestep-systems/b6p-cli. Then quit and reopen ${name}.`],
                  ['It asks you for an access token', <>Do Part 3's <C key="a">b6p auth set</C> step again.</>],
                  ['Website setup says "404 for ref main"', 'In the BlueStep site settings, check Git Ref says exactly main.'],
                  ['The website page is blank', `Ask ${name}: "Check that the build is committed at the repo root and Vite base is /spa/."`],
                  ["Your website doesn't update after a change", `Ask ${name} to check the GitHub webhook's last delivery.`],
                  ['The dashboard says "Please sign in" while you are', 'The website and the data link must be on the same BlueStep domain.'],
                ]}
              />
              <p>
                Still stuck? Type <C>{cmd('b6p-setup')}</C> to re-check everything, then send what it reports to your BlueStep
                contact.
              </p>
            </Part>
          </div>
        </div>
      </Container>
    </>
  )
}
