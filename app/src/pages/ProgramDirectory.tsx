import {
  AddressBook,
  ArrowsClockwise,
  CheckCircle,
  EnvelopeSimple,
  Gift,
  MagnifyingGlass,
  PencilSimpleLine,
  SealCheck,
} from '@phosphor-icons/react'
import DirectoryExample from '../components/DirectoryExample'
import { DIRECTORY_URL } from '../site'
import { Button, ClosingCTA, Container, Heading, OnAccentButton, Reveal, asset, useTitle } from '../ui'

// The Program Directory lives at programdirectory.bluestep.net (gitsites/program-directory).
// Listings are free for programs, always. Referring professionals see them inside the
// BlueStep CRM, and BlueIQ answers from what a program puts in its listing.

const WHAT_IT_IS = [
  { icon: Gift, t: 'Free, always', b: "Listing your program costs nothing, and it's going to stay that way. You don't need to use any other BlueStep software." },
  { icon: PencilSimpleLine, t: 'Run by the program', b: 'You manage your own listing: specialties, ages, levels of care, clinical approach, and admissions contacts.' },
  { icon: SealCheck, t: 'Verified by you', b: 'Once someone from your program signs in and saves an update, your listing carries a verified badge with the date.' },
]

const LISTING = [
  'Specialties and the populations you serve',
  'Ages and levels of care',
  'Clinical approach and program details',
  'Admissions contacts referring professionals can reach',
  'Your logo, website, and location',
]

const STEPS = [
  { icon: MagnifyingGlass, t: 'Find your program', b: 'Search by name. Many programs are already listed from public information, waiting to be claimed.' },
  { icon: EnvelopeSimple, t: 'Claim it with your work email', b: "We send a 6-digit code to prove it's you. If your email matches your program's website, you're in right away. Otherwise we review it personally." },
  { icon: AddressBook, t: 'Fill out the essentials', b: 'Specialties, populations, and admissions contacts first. Add the rest whenever you like.' },
  { icon: ArrowsClockwise, t: 'Keep it current', b: 'Update it as your program changes. Referring professionals see the change right away.' },
]

const FAQ = [
  { q: 'Is it really free?', a: 'Yes. Program listings are free, and BlueStep plans to keep them that way.' },
  { q: 'Do we have to use BlueStep software?', a: 'No. Any program can claim and manage a listing.' },
  { q: 'Who sees our listing?', a: 'Referring professionals, like educational and therapeutic consultants, who use BlueStep to manage their families and placements.' },
  { q: "What if our program isn't listed?", a: "Use the Add your program form on the directory and we'll review it, usually within a business day." },
  { q: 'Can one person manage several programs?', a: 'Yes. Claim each one with the same email and they all show up when you sign in.' },
]

export default function ProgramDirectory() {
  useTitle('Program Directory')
  return (
    <>
      <section className="border-b border-line">
        <Container className="grid items-center gap-12 pb-16 pt-12 md:pt-16 lg:grid-cols-[1.05fr_1fr] lg:gap-16 lg:pb-24">
          <div className="rise">
            <p className="kicker mb-5">Program Directory · Free for every program</p>
            <h1 className="text-4xl font-semibold leading-[1.05] tracking-tightest md:text-[3.4rem]">
              Be found by the professionals who refer families.
            </h1>
            <p className="prose-body mt-6 max-w-[52ch]">
              The BlueStep Program Directory is where referring professionals look up programs. Claim your free listing
              and make sure what they see is accurate.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Button to={DIRECTORY_URL} arrow>
                Claim your free listing
              </Button>
              <Button to="#how" variant="ghost">
                How it works
              </Button>
            </div>
          </div>
          <img
            src={asset('images/heroes/for-admissions.jpg')}
            alt="An admissions director taking a call from a referring professional"
            className="rise aspect-[4/3] w-full rounded-2xl object-cover [animation-delay:120ms]"
          />
        </Container>
      </section>

      <section className="py-24 md:py-32">
        <Container>
          <Heading
            title="One directory, kept current by the programs in it."
            sub="Listings start from public information. After that, each program keeps its own listing current."
          />
          <div className="mt-14 grid gap-4 md:grid-cols-3">
            {WHAT_IT_IS.map((k, i) => (
              <Reveal key={k.t} delay={i * 60} className="card rounded-2xl p-7">
                <k.icon size={26} className="text-accent" />
                <h3 className="mt-8 text-lg font-semibold tracking-tight">{k.t}</h3>
                <p className="mt-2 leading-relaxed text-muted">{k.b}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-y border-line bg-surface py-24 md:py-32">
        <Container className="grid items-center gap-14 md:grid-cols-2">
          <Reveal>
            <p className="kicker mb-5">How referring professionals use it</p>
            <h2 className="text-3xl font-semibold leading-[1.1] tracking-tightest md:text-5xl">
              Your listing is what the AI says about you.
            </h2>
            <p className="prose-body mt-6 max-w-[52ch]">
              Consultants who use BlueStep search the directory while they work, and keep their own private ratings
              and tour notes on top. When they ask BlueIQ, our AI assistant, which programs fit a student, BlueIQ answers
              from what's in your listing.
            </p>
            <p className="prose-body mt-4 max-w-[52ch]">
              If adoption and attachment work is one of your specialties, you show up. If it isn't listed, you don't, even if it's work you do every day.
            </p>
            <div className="mt-8">
              <Button to="/for-referring-professionals" variant="ghost" arrow>
                See the referring professional side
              </Button>
            </div>
          </Reveal>

          <Reveal delay={80} className="card rounded-2xl p-6 md:p-8">
            <DirectoryExample />
          </Reveal>
        </Container>
      </section>

      <section className="py-24 md:py-32">
        <Container className="grid gap-14 md:grid-cols-[1fr_1.1fr]">
          <Reveal>
            <Heading
              title="Why keeping it current matters."
              sub="Referring professionals make placement decisions from this information. An outdated listing sends families elsewhere, or sends you the wrong referrals."
            />
          </Reveal>
          <Reveal delay={60}>
            <h3 className="text-sm font-medium text-ink">What your listing covers</h3>
            <ul className="mt-5 space-y-3">
              {LISTING.map((l) => (
                <li key={l} className="flex gap-3 leading-relaxed">
                  <CheckCircle size={20} weight="fill" className="mt-0.5 shrink-0 text-accent" />
                  {l}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm leading-relaxed text-muted">
              A program that just changed its age range, opened a new level of care, or has a new admissions director
              should update its listing the same week.
            </p>
          </Reveal>
        </Container>
      </section>

      <section id="how" className="scroll-mt-24 border-y border-line bg-surface py-24 md:py-32">
        <Container>
          <Heading title="Get listed in a few minutes." sub="No sales call, no contract." />
          <ol className="mt-14 grid gap-x-10 gap-y-12 md:grid-cols-4">
            {STEPS.map((s, i) => (
              <Reveal as="li" key={s.t} delay={i * 60} className="border-t-2 border-accent pt-5">
                <span className="font-mono text-sm text-accent">0{i + 1}</span>
                <h3 className="mt-3 flex items-center gap-2 text-lg font-semibold tracking-tight">
                  <s.icon size={20} className="text-accent" />
                  {s.t}
                </h3>
                <p className="mt-2 leading-relaxed text-muted">{s.b}</p>
              </Reveal>
            ))}
          </ol>
          <div className="mt-14">
            <Button to={DIRECTORY_URL} arrow>
              Find your program
            </Button>
          </div>
        </Container>
      </section>

      <section className="py-24 md:py-32">
        <Container className="max-w-3xl">
          <Heading title="Common questions" />
          <dl className="mt-10 divide-y divide-line border-y border-line">
            {FAQ.map((f) => (
              <Reveal key={f.q} className="py-6">
                <dt className="font-semibold">{f.q}</dt>
                <dd className="mt-2 leading-relaxed text-muted">{f.a}</dd>
              </Reveal>
            ))}
          </dl>
        </Container>
      </section>

      <ClosingCTA
        title="Make sure referring professionals see the real you."
        sub="Claim your free listing today. It takes a few minutes, and it stays free."
      >
        <OnAccentButton to={DIRECTORY_URL} solid>
          Claim your free listing
        </OnAccentButton>
        <OnAccentButton to="/for-referring-professionals">For referring professionals</OnAccentButton>
      </ClosingCTA>
    </>
  )
}
