import {
  BookOpenText,
  ChartLineUp,
  GraduationCap,
  HouseLine,
  PlugsConnected,
  Presentation,
  ShieldCheck,
  Storefront,
  Stack,
  UserList,
} from '@phosphor-icons/react'
import PathSwitch from '../components/PathSwitch'
import { CTA } from '../site'
import { Button, ClosingCTA, Container, Heading, OnAccentButton, PageHero, Reveal, asset, useTitle } from '../ui'

// Slate is a blank slate: a HIPAA-ready workspace with nothing in it yet.
// The pitch is "build anything", never positioned against an EHR.

const IDEAS = [
  { icon: ChartLineUp, t: 'Financial dashboards', b: 'Revenue, census, and length of stay on one live screen. No spreadsheet export.', big: true },
  { icon: UserList, t: 'Q15 rounds', b: 'Headcount checks on a tablet, by unit.' },
  { icon: GraduationCap, t: 'Staff training', b: 'Certifications and expirations, tracked.' },
  { icon: HouseLine, t: 'Family portal', b: 'What parents need, and nothing more.' },
  { icon: Presentation, t: 'Leadership scorecard', b: 'The weekly numbers and quarterly goals.' },
]

const IN_THE_BOX = [
  { icon: ShieldCheck, t: 'HIPAA-ready hosting and a BAA', b: 'Store anything, including PHI, from day one.' },
  { icon: PlugsConnected, t: 'An MCP connection', b: 'Point your own AI tools at it and start building.' },
  { icon: BookOpenText, t: 'The BlueStep reference', b: 'Patterns and known traps, so your AI builds it right the first time.' },
  { icon: Storefront, t: 'The marketplace', b: 'Start from a feature another program built instead of from zero.' },
]

export default function BlankSlate() {
  useTitle('Slate')
  return (
    <>
      <PathSwitch current="build" />
      <PageHero
        kicker="Slate"
        title="A blank slate. Build anything."
        sub="A HIPAA-ready workspace with nothing in it yet. Describe what your program needs, and your AI builds it."
      >
        <Button to="/demo?path=blank-slate" arrow>
          Start with Slate
        </Button>
        <Button to={CTA.pricing.href} variant="ghost">
          {CTA.pricing.label}
        </Button>
      </PageHero>

      <section className="py-24 md:py-32">
        <Container>
          <Heading
            title="What would you build?"
            sub="Most programs start with whatever their team still tracks on paper or in a spreadsheet."
          />
          <div className="mt-14 grid auto-rows-[minmax(170px,auto)] gap-4 md:grid-cols-4">
            {IDEAS.map((idea, i) =>
              idea.big ? (
                <Reveal key={idea.t} className="relative overflow-hidden rounded-2xl md:col-span-2 md:row-span-2">
                  <img
                    src={asset('images/heroes/planning-board.jpg')}
                    alt="Someone mapping out a system on a whiteboard of sticky notes"
                    className="absolute inset-0 h-full w-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0d12]/90 via-[#0a0d12]/35 to-transparent" />
                  <div className="relative flex h-full min-h-[340px] flex-col justify-end p-8 text-white">
                    <idea.icon size={30} />
                    <h3 className="mt-4 text-2xl font-semibold tracking-tight">{idea.t}</h3>
                    <p className="mt-1 text-white/75">{idea.b}</p>
                  </div>
                </Reveal>
              ) : (
                <Reveal key={idea.t} delay={i * 50} className={`rounded-2xl p-6 ${i === 3 ? 'bg-accent-soft' : 'card'}`}>
                  <idea.icon size={24} className="text-accent" />
                  <h3 className="mt-8 font-semibold">{idea.t}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted">{idea.b}</p>
                </Reveal>
              ),
            )}
          </div>
          <p className="mt-6 text-sm text-muted">Or whatever your team still keeps in a spreadsheet.</p>
        </Container>
      </section>

      <section className="border-y border-line bg-surface py-24 md:py-32">
        <Container>
          <Heading title="Empty, but not bare." sub="Slate starts with no apps. It comes with everything you need to build them." />
          <div className="mt-14 grid gap-x-12 gap-y-10 md:grid-cols-2">
            {IN_THE_BOX.map((k, i) => (
              <Reveal key={k.t} delay={i * 60} className="flex gap-5">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent-soft text-accent">
                  <k.icon size={22} />
                </span>
                <div>
                  <h3 className="text-lg font-semibold tracking-tight">{k.t}</h3>
                  <p className="mt-2 leading-relaxed text-muted">{k.b}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-24 md:py-32">
        <Container className="max-w-3xl text-center">
          <Reveal>
            <Stack size={32} className="mx-auto text-accent" />
            <h2 className="mt-6 text-3xl font-semibold leading-[1.15] tracking-tightest md:text-5xl">
              Every app shares one secure database.
            </h2>
            <p className="prose-body mx-auto mt-6 max-w-[54ch]">
              The dashboard sees what the tracker records. The portal shows what the forms collect. And when you want
              clinical documentation, the BlueStep EHR runs on the same platform.
            </p>
            <div className="mt-9 flex justify-center">
              <Button to="/products/ehr" variant="ghost" arrow>
                Explore the EHR
              </Button>
            </div>
          </Reveal>
        </Container>
      </section>

      <ClosingCTA title="What would your team stop doing on paper?" sub="Tell us the first thing you'd build. We'll set up your Slate.">
        <OnAccentButton to="/demo?path=blank-slate" solid>
          Start with Slate
        </OnAccentButton>
        <OnAccentButton to={CTA.market.href}>{CTA.market.label}</OnAccentButton>
      </ClosingCTA>
    </>
  )
}
