import { useEffect, useRef, useState } from 'react'
import { CheckCircle, CircleNotch, Sparkle, Star } from '@phosphor-icons/react'

// The Consultant CRM page's BlueIQ demo, in the same style as BuildLog: a question typed
// in, the records BlueIQ looks through, then the answer. Every family, program, and note
// here is invented, and the panel is labeled as an example on screen. Picking another
// question replays the demo with that one.

interface Item {
  title: string
  rating?: number
  meta: string
  tags?: string[]
}

interface Ask {
  about: string
  q: string
  steps: string[]
  intro: string
  items: Item[]
  source: string
}

export const ASKS: Ask[] = [
  {
    about: 'Programs',
    q: 'What programs have I toured in the last two years that can work with reactive attachment and take California school district funding?',
    steps: [
      'Finding programs you toured since October 2024',
      'Checking each listing for reactive attachment disorder',
      'Checking funding: California school district placements',
      'Pulling your ratings and tour notes',
    ],
    intro: 'Three programs you toured fit both. Ranked by your own rating:',
    items: [
      {
        title: 'Juniper Hollow Academy',
        rating: 5,
        meta: 'Toured in person, March 2025',
        tags: ['RAD track', 'CA district funding'],
      },
      {
        title: 'Larkspur Ridge School',
        rating: 4,
        meta: 'Toured in person, September 2024',
        tags: ['Attachment-focused', 'CA district funding'],
      },
      {
        title: 'Bramblewood Ranch',
        rating: 3,
        meta: 'Virtual tour, June 2025',
        tags: ['RAD experience', 'CA district funding'],
      },
    ],
    source: 'From your tour notes, your ratings, and each program’s listing',
  },
  {
    about: 'A client',
    q: 'What’s still outstanding on the Alvarez family, and when did we last talk?',
    steps: ['Opening the Alvarez family record', 'Reading tasks and referrals', 'Checking the communication log'],
    intro: 'Last contact was a call with Maria Alvarez on Tuesday. Still open:',
    items: [
      { title: 'Engagement letter', meta: 'Second parent hasn’t signed. Reminder sent Monday.' },
      { title: 'Referral to Juniper Hollow', meta: 'Pre-screening. Waiting on the psych eval.' },
      { title: 'Follow-up call', meta: 'Due Friday, high priority' },
    ],
    source: 'From the Alvarez family record',
  },
  {
    about: 'A program',
    q: 'What did I write about the clinical team at Larkspur Ridge on my last tour?',
    steps: ['Opening Larkspur Ridge School', 'Reading your tour notes', 'Finding notes on the clinical team'],
    intro: 'From your in-person tour on September 12, 2024:',
    items: [
      { title: 'Clinical director', meta: 'Strong on attachment work, 12 years at the program' },
      { title: 'Therapist caseloads', meta: 'About 8 students each. Weekly family therapy by video.' },
      { title: 'Your concern', meta: 'Two therapists left last spring. Ask about turnover next visit.' },
    ],
    source: 'From your tour notes on Larkspur Ridge School',
  },
  {
    about: 'A document',
    q: 'Summarize the psych eval in Maya’s file.',
    steps: ['Opening Maya Alvarez’s files', 'Reading Psychological Evaluation.pdf', 'Summarizing the findings'],
    intro: 'Psychological evaluation, completed August 2025:',
    items: [
      { title: 'Diagnoses', meta: 'Reactive attachment disorder, ADHD (combined type)' },
      { title: 'Recommendation', meta: 'Residential care with attachment-focused therapy' },
      { title: 'School', meta: 'IEP in place. Average cognitive scores, weaker processing speed.' },
    ],
    source: 'From Psychological Evaluation.pdf in Maya’s files',
  },
]

type Phase = 'typing' | 'steps' | 'done'

export default function BlueIqDemo() {
  const reduce = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const [active, setActive] = useState(0)
  const ask = ASKS[active]
  const [typed, setTyped] = useState(reduce ? ask.q.length : 0)
  const [step, setStep] = useState(reduce ? ask.steps.length : 0)
  const [phase, setPhase] = useState<Phase>(reduce ? 'done' : 'typing')
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(reduce)

  // Start only once the panel is on screen.
  useEffect(() => {
    if (reduce || !ref.current) return
    const io = new IntersectionObserver(
      (e) => {
        if (e.some((x) => x.isIntersecting)) {
          setVisible(true)
          io.disconnect()
        }
      },
      { threshold: 0.3 },
    )
    io.observe(ref.current)
    return () => io.disconnect()
  }, [reduce])

  useEffect(() => {
    if (!visible || reduce) return
    let t: number
    if (phase === 'typing') {
      if (typed < ask.q.length) t = window.setTimeout(() => setTyped(typed + 2), 22)
      else t = window.setTimeout(() => setPhase('steps'), 450)
    } else if (phase === 'steps') {
      if (step < ask.steps.length) t = window.setTimeout(() => setStep(step + 1), 700)
      else setPhase('done')
    }
    return () => window.clearTimeout(t)
  }, [visible, reduce, phase, typed, step, ask])

  function pick(i: number) {
    setActive(i)
    setTyped(reduce ? ASKS[i].q.length : 0)
    setStep(reduce ? ASKS[i].steps.length : 0)
    setPhase(reduce ? 'done' : 'typing')
  }

  return (
    <div className="grid items-start gap-6 lg:grid-cols-[0.75fr_1.25fr] lg:gap-10">
      <div>
        <p className="mb-3 text-sm opacity-60">Try a question</p>
        <ul className="space-y-2.5">
          {ASKS.map((a, i) => (
            <li key={a.q}>
              <button
                type="button"
                onClick={() => pick(i)}
                aria-pressed={i === active}
                className={`w-full rounded-2xl border p-4 text-left transition ${
                  i === active
                    ? 'border-[#60a5eb]/60 bg-[#60a5eb]/10'
                    : 'border-white/10 bg-white/[0.03] hover:border-white/25 hover:bg-white/[0.06]'
                }`}
              >
                <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-[#60a5eb]">
                  Ask about {a.about.toLowerCase()}
                </span>
                <span className="mt-1.5 block text-[15px] leading-relaxed">“{a.q}”</span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div
        ref={ref}
        className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#151a22] p-5 shadow-[0_30px_70px_-30px_rgb(96_165_235/0.45)] md:p-6 dark:bg-[#1b212b]"
        aria-label={`Example BlueIQ question: ${ask.q}`}
      >
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-2 text-sm font-medium">
            <Sparkle size={16} weight="fill" className="text-[#60a5eb]" />
            BlueIQ
          </div>
          <span className="font-mono text-[11px] opacity-50">Example, invented data</span>
        </div>

        <p className="mt-5 text-xs font-medium opacity-50">You asked</p>
        <p className="mt-2 min-h-[5.5rem] text-[15px] leading-relaxed sm:min-h-[3.5rem]">
          {ask.q.slice(0, typed)}
          {phase === 'typing' && (
            <span className="caret ml-0.5 inline-block h-4 w-[2px] translate-y-0.5 bg-[#60a5eb]" />
          )}
        </p>

        <ul className="mt-5 space-y-2.5 border-t border-white/10 pt-5" aria-live="polite">
          {ask.steps.map((s, i) => {
            const state = i < step ? 'done' : i === step && phase === 'steps' ? 'active' : 'idle'
            return (
              <li
                key={s}
                className={`flex items-start gap-2.5 text-sm transition-opacity duration-300 ${
                  state === 'idle' ? 'opacity-25' : 'opacity-100'
                }`}
              >
                {state === 'done' ? (
                  <CheckCircle size={18} weight="fill" className="mt-px shrink-0 text-[#60a5eb]" />
                ) : state === 'active' ? (
                  <CircleNotch size={18} className="mt-px shrink-0 animate-spin text-[#60a5eb]" />
                ) : (
                  <span className="mt-[5px] h-2 w-2 shrink-0 translate-x-[5px] rounded-full bg-white/20" />
                )}
                <span className={state === 'done' ? 'opacity-60' : ''}>{s}</span>
              </li>
            )
          })}
        </ul>

        <div
          className={`mt-6 border-t border-white/10 pt-5 transition-all duration-500 ${
            phase === 'done' ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-2 opacity-0'
          }`}
          aria-hidden={phase !== 'done'}
        >
          <p className="text-[15px] leading-relaxed">{ask.intro}</p>
          <ul className="mt-4 space-y-2">
            {ask.items.map((it, i) => (
              <li
                key={it.title}
                style={{ transitionDelay: phase === 'done' ? `${150 + i * 120}ms` : '0ms' }}
                className={`rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 transition-all duration-500 ${
                  phase === 'done' ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'
                }`}
              >
                <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1">
                  <span className="font-semibold">{it.title}</span>
                  {it.rating !== undefined && (
                    <span className="flex gap-0.5" aria-label={`Your rating: ${it.rating} of 5`}>
                      {[1, 2, 3, 4, 5].map((n) => (
                        <Star
                          key={n}
                          size={13}
                          weight="fill"
                          className={n <= it.rating! ? 'text-[#f5b942]' : 'text-white/15'}
                        />
                      ))}
                    </span>
                  )}
                </div>
                <p className="mt-1 text-sm opacity-65">{it.meta}</p>
                {it.tags && (
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {it.tags.map((t) => (
                      <span key={t} className="rounded-full bg-[#60a5eb]/15 px-2.5 py-0.5 text-xs text-[#9cc8f2]">
                        {t}
                      </span>
                    ))}
                  </div>
                )}
              </li>
            ))}
          </ul>
          <p className="mt-4 font-mono text-[11px] opacity-45">{ask.source}</p>
        </div>
      </div>
    </div>
  )
}
