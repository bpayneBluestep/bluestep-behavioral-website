import { CTA } from '../site'
import { ClosingCTA, Container, Heading, OnAccentButton, PageHero, Reveal, asset, useTitle } from '../ui'

const TEAM = [
  {
    name: 'Brandon Payne',
    role: 'Executive Director',
    bio: 'Started as an intern at Havenwood Academy, a residential treatment center, before joining BlueStep. Leads the behavioral health division.',
  },
  {
    name: 'Roy',
    role: 'Chief Technology Officer',
    bio: 'Leads the architecture of the BlueStep platform that every program and builder runs on.',
  },
  {
    name: 'Noel',
    role: 'Director of Program Success',
    bio: 'Worked direct care for years and served as a program director before joining BlueStep. Now works with programs from onboarding through every rollout.',
  },
  {
    name: 'Dan Scott',
    role: 'Senior Engineer',
    bio: 'Builds and maintains the platform features programs rely on every day, and the tooling builders use to extend them.',
  },
]

const VALUES = [
  ['See people as people', 'We are a behavioral healthcare company first and a software business second.'],
  ['Truth over comfort', 'We say what software can and cannot do. We turn away work that does not fit.'],
  ['Accountable to ourselves', 'We own our mistakes and move on from them quickly.'],
  ['Laser focused', 'Behavioral health only. We would rather be essential to a few than fine for many.'],
  ['Growth with purpose', 'We grow on purpose, at a pace that protects the people we already serve.'],
]

export default function About() {
  useTitle('About')
  return (
    <>
      <PageHero
        kicker="About"
        title="We know how programs run."
        sub="Some of us worked in treatment programs before we worked on software for them. We build alongside the programs we serve."
      />

      <section className="py-24 md:py-32">
        <Container className="grid items-start gap-14 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          <Reveal>
            <img
              src={asset('images/heroes/team-discussion.jpg')}
              alt="A team talking through a problem around a table"
              className="aspect-[4/5] w-full rounded-2xl object-cover"
              loading="lazy"
            />
          </Reveal>
          <Reveal delay={100} className="space-y-6 text-lg leading-relaxed text-muted lg:pt-8">
            <p>
              Brandon and Noel both started in residential treatment before joining BlueStep. Brandon was an intern at
              Havenwood Academy in Utah. Noel worked direct care for years and went on to be a program director.
            </p>
            <p>
              Our team includes people who have worked direct care and run programs, and most of what we build starts
              with a problem a program brought to us. Now we build it with AI, in hours instead of months.
            </p>
            <p className="text-ink">
              The same tools are now yours. Programs that want to build can do what we do, on the same platform, with
              the same help.
            </p>
          </Reveal>
        </Container>
      </section>

      <section id="values" className="scroll-mt-20 border-y border-line bg-surface py-24 md:py-32">
        <Container>
          <Heading
            title="AI builds the software. People stay at the center."
            sub="We are an AI-first company that cares more about human connection, not less. Five values hold us to it."
          />
          <ol className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-5">
            {VALUES.map(([t, b], i) => (
              <Reveal as="li" key={t} delay={i * 60} className="bg-surface p-6">
                <span className="text-sm font-medium text-accent">{i + 1}</span>
                <h3 className="mt-6 font-semibold leading-snug">{t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{b}</p>
              </Reveal>
            ))}
          </ol>
        </Container>
      </section>

      <section className="py-24 md:py-32">
        <Container>
          <Heading title="The team you will talk to." />
          <div className="mt-14 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {TEAM.map((m, i) => (
              <Reveal key={m.name} delay={i * 60}>
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-accent-soft text-lg font-semibold text-accent">
                  {m.name
                    .split(' ')
                    .map((w) => w[0])
                    .join('')}
                </div>
                <h3 className="mt-5 font-semibold">{m.name}</h3>
                <p className="text-sm text-accent">{m.role}</p>
                <p className="mt-3 text-sm leading-relaxed text-muted">{m.bio}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <ClosingCTA title="Talk to people who know how programs run." sub="A real person reads every message. No sales drip.">
        <OnAccentButton to={CTA.demo.href} solid>
          {CTA.demo.label}
        </OnAccentButton>
        <OnAccentButton to={CTA.build.href}>{CTA.build.label}</OnAccentButton>
      </ClosingCTA>
    </>
  )
}
