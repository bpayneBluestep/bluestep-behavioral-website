import { Link } from "react-router-dom";
import { AddressBook, ArrowRight, Check, Star } from "@phosphor-icons/react";
import { REFERRAL } from "../data/pricing";
import { CTA } from "../site";
import { Button, ClosingCTA, Container, OnAccentButton, Reveal, asset, useTitle } from "../ui";

// The Consultant CRM (EC-CRM) is its own product, sold self-serve at /signup. This page is
// what the product does; /for-referring-professionals is who it's for and the problems it solves.
// It follows the shared product-page layout (ProductPage.tsx) with three
// screenshots: the dashboard and the two phone signing views. They are the real app (gitsites/ec-crm-gitsite) running on invented data: every
// family, program, and consultant shown is fictional.

const img = (name: string) => asset(`images/consultant-crm/${name}.jpg`);

/** A screenshot in a light window frame. */
function Shot({ src, alt, className = "" }: { src: string; alt: string; className?: string }) {
  return (
    <div
      className={`overflow-hidden rounded-xl border border-line bg-surface shadow-[0_30px_60px_-30px_rgb(0_0_0/0.35)] ${className}`}
    >
      <div className="flex items-center gap-1.5 border-b border-line bg-raised px-4 py-2.5" aria-hidden>
        <span className="h-2.5 w-2.5 rounded-full bg-line" />
        <span className="h-2.5 w-2.5 rounded-full bg-line" />
        <span className="h-2.5 w-2.5 rounded-full bg-line" />
      </div>
      <img src={src} alt={alt} loading="lazy" width={1600} height={1000} className="block w-full" />
    </div>
  );
}

/** A screenshot of the phone signing view. */
function Phone({ src, alt, className = "" }: { src: string; alt: string; className?: string }) {
  return (
    <div
      className={`overflow-hidden rounded-[2rem] border-[6px] border-[#1f2530] bg-[#1f2530] shadow-[0_30px_60px_-25px_rgb(0_0_0/0.6)] ${className}`}
    >
      <img src={src} alt={alt} loading="lazy" width={585} height={1266} className="block w-full rounded-[1.6rem]" />
    </div>
  );
}

// Same shape as a ProductSection in data/products.ts.
const SECTIONS = [
  {
    id: "caseload",
    heading: "Every family, from first call to alumni",
    pain: "Inquiries, active clients, and alumni live in one list. When a family moves forward, one click moves the record, and nothing is left behind.",
    bullets: [
      "Search your whole caseload by name, location, email, or phone",
      "Move a record from inquiry to client to alumni, and back if you need to",
      "A dashboard with the pipeline, overdue tasks, and recent activity",
      "Priorities, due dates, and overdue flags on every family",
    ],
  },
  {
    id: "record",
    heading: "The whole story, in one place",
    pain: "Every call, email, text, and meeting is logged on the family with who it was with. Contacts, tasks, files, and the parent application sit right beside it.",
    bullets: [
      "Log calls, emails, texts, video calls, meetings, and notes. Who and when is stamped automatically.",
      "Parents, guardians, therapists, and schools on each record",
      "Connect Gmail or Outlook and send from inside the record. Every email logs itself.",
      "Files in folders like a drive, plus a parent application you design",
    ],
  },
  {
    id: "referrals",
    heading: "Referrals, including the ones that fall through",
    pain: "Each referral follows the real path a placement takes, from considering a program to enrollment. When one falls through, you record why, and your dashboard shows the patterns.",
    bullets: [
      "Statuses from Considering and Pre-screening through Waitlisted, Accepted, and Enrolled",
      "Decline reasons you can edit: clinical fit, no bed, insurance, cost, and more",
      "Referral win rate and top destinations on your dashboard",
    ],
  },
  {
    id: "agreements",
    heading: "Agreements signed on a phone, not a scanner",
    pain: "E-signature is built in. Send a packet, and parents sign from their phone. You countersign, and the signed copies file themselves to the family.",
    bullets: [
      "Templates and packets: place the fields once, send every agreement in one envelope",
      "Emailed links locked behind a six-digit code you share separately",
      "Signing order, automatic reminders, and an expiration you choose",
      "Hash-chained, tamper-evident record with a certificate of completion",
    ],
  },
  {
    id: "programs",
    heading: "A program directory with your notes on top",
    pain: "Search a shared library of treatment programs by level of care, specialty, age, gender, insurance, and region. Your ratings, tour notes, and files on each program stay private to you.",
    bullets: [
      "Filter by setting, level of care, specialties, modalities, and home state",
      "Rate programs one to five stars and keep a private summary",
      "Tour notes with the date and whether you visited in person",
      "Every client you referred there, and how it turned out",
    ],
  },
  {
    id: "blueiq",
    heading: "BlueIQ for your caseload",
    pain: `Ask a question and BlueIQ answers from your own families, programs, and notes. Talk through a tour or a call, and it drafts the note and the follow-ups. $${REFERRAL.blueIqPerSeat} per user.`,
    bullets: [
      "Answers scoped to the family or program you have open",
      "Compares programs on cost, length of stay, insurance, and fit",
      "Reads the documents on file to answer questions about them",
      "Dictated notes become drafts. Nothing saves until you review it.",
    ],
  },
];

export default function ConsultantCrm() {
  useTitle("Consultant CRM");
  return (
    <>
      <section className="border-b border-line">
        <Container className="grid items-center gap-12 pb-16 pt-12 md:pt-16 lg:grid-cols-[1fr_1.1fr] lg:gap-14 lg:pb-24">
          <div className="rise">
            <p className="mb-5 flex items-center gap-2 text-sm font-medium text-accent">
              <AddressBook size={18} weight="bold" />
              Consultant CRM
            </p>
            <h1 className="text-4xl font-semibold leading-[1.05] tracking-tightest md:text-[3.4rem]">
              The CRM built for placing students, not closing deals.
            </h1>
            <p className="prose-body mt-6 max-w-[52ch]">
              Families, referrals, agreements, and the programs you trust, in one workspace made for educational
              consultants. Sign up online, and we bring your caseload over for you.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Button to="/signup" arrow>
                Sign up now
              </Button>
              <Link to="/pricing#referring-professionals" className="px-2 text-sm text-muted hover:text-ink">
                ${REFERRAL.perSeat} per user / month
              </Link>
            </div>
          </div>
          <Shot
            src={img("dashboard")}
            alt="The Consultant CRM dashboard: active clients, inquiries, alumni, overdue tasks, referral win rate, and upcoming tasks"
            className="rise [animation-delay:120ms]"
          />
        </Container>
      </section>

      <section className="py-20 md:py-28">
        <Container className="grid gap-14 lg:grid-cols-[240px_1fr] lg:gap-20">
          <nav aria-label="Consultant CRM sections" className="hidden lg:block">
            <ul className="sticky top-28 space-y-1 border-l border-line">
              {SECTIONS.map((s) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className="-ml-px block border-l border-transparent py-1.5 pl-4 text-sm text-muted hover:border-accent hover:text-ink"
                  >
                    {s.heading}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="space-y-20">
            {SECTIONS.map((s) => (
              <Reveal key={s.id} id={s.id} className="scroll-mt-24">
                <div data-track-section={`consultant-crm-${s.id}`}>
                  <h2 className="text-2xl font-semibold tracking-tight md:text-4xl md:tracking-tightest">
                    {s.heading}
                  </h2>
                  <p className="prose-body mt-4 max-w-[60ch]">{s.pain}</p>
                  <ul className="mt-7 grid gap-3 md:grid-cols-2">
                    {s.bullets.map((b) => (
                      <li key={b} className="card flex gap-3 p-5 text-[15px] leading-relaxed">
                        <Check size={18} weight="bold" className="mt-0.5 shrink-0 text-accent" />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="panel-dark overflow-hidden py-20 md:py-24 dark:border-x-0">
        <Container className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <h2 className="text-3xl font-semibold leading-[1.1] tracking-tightest md:text-5xl">
              Parents sign from wherever they are.
            </h2>
            <p className="mt-5 max-w-[46ch] text-base leading-relaxed opacity-75 md:text-lg">
              They adopt a signature once and tap through each field, or sign in person on your device. No printer, no
              scanner, no chasing.
            </p>
          </Reveal>
          <Reveal delay={80} className="flex justify-center gap-5 sm:gap-8">
            <Phone
              src={img("sign-adopt")}
              alt="A parent adopting a signature on a phone"
              className="w-[44%] max-w-[230px] translate-y-4"
            />
            <Phone
              src={img("sign-done")}
              alt="A signed agreement on a phone with every required field complete"
              className="w-[44%] max-w-[230px] -translate-y-2"
            />
          </Reveal>
        </Container>
      </section>

      <section className="py-20" data-track-section="consultant-crm-pricing">
        <Container className="grid gap-4 lg:grid-cols-[1.15fr_1fr]">
          <Reveal className="card p-8 md:p-10">
            <p className="kicker">Pricing</p>
            <p className="mt-5 text-6xl font-semibold tracking-tightest">
              ${REFERRAL.perSeat}
              <span className="text-base font-normal text-muted"> / user / month</span>
            </p>
            <p className="mt-4 max-w-[46ch] leading-relaxed text-muted">
              Everything on this page, for every consultant in your practice. Add BlueIQ for ${REFERRAL.blueIqPerSeat}{" "}
              per user. We bring your clients, documents, and notes over for you.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Button to="/signup" arrow>
                Sign up now
              </Button>
              <Link to="/pricing#referring-professionals" className="text-sm font-medium text-accent">
                Compare plans
              </Link>
            </div>
          </Reveal>
          <Reveal delay={80}>
            <Link
              to="/for-referring-professionals"
              className="group flex h-full flex-col justify-between rounded-2xl bg-accent-soft p-8 transition hover:brightness-[0.98] md:p-10"
            >
              <Star size={26} weight="fill" className="text-accent" />
              <div className="mt-10">
                <h2 className="text-2xl font-semibold tracking-tight">Why consultants switch.</h2>
                <p className="mt-3 max-w-md leading-relaxed text-muted">
                  The paper chase, the re-keyed referrals, and the sales CRMs that fight the work. See what changes for
                  referring professionals.
                </p>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-accent">
                  BlueStep for referring professionals
                  <ArrowRight size={16} weight="bold" className="transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          </Reveal>
        </Container>
      </section>

      <ClosingCTA
        title="Your whole practice, in one place."
        sub="Sign up online, and we'll set up your workspace and move your clients, documents, and notes across."
      >
        <OnAccentButton to="/signup" solid>
          Sign up now
        </OnAccentButton>
        <OnAccentButton to={CTA.demo.href}>{CTA.demo.label}</OnAccentButton>
      </ClosingCTA>
    </>
  );
}
