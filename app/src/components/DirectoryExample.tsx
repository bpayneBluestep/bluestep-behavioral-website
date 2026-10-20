import { Buildings, SealCheck, Sparkle, UsersThree } from '@phosphor-icons/react'

/** The Program Directory pitch in one picture: a consultant asks BlueIQ, and only listed specialties come up. */
export default function DirectoryExample() {
  return (
    <div role="figure" aria-label="Example of a consultant asking BlueIQ about programs">
      <p className="font-mono text-xs uppercase tracking-widest text-faint">Example</p>
      <div className="mt-4 flex items-start gap-3">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent">
          <UsersThree size={18} />
        </span>
        <p className="rounded-2xl rounded-tl-sm bg-raised px-4 py-3 text-sm">
          Which programs work with adopted teens and attachment issues?
        </p>
      </div>
      <div className="mt-5 flex items-center gap-2 text-sm text-muted">
        <Sparkle size={16} className="text-accent" /> BlueIQ found 2 programs
      </div>
      <ul className="mt-3 space-y-2">
        <li className="flex items-center justify-between gap-3 rounded-xl border border-accent bg-accent-soft px-4 py-3">
          <span className="flex items-center gap-2 font-medium">
            <Buildings size={18} className="text-accent" /> Your program
            <SealCheck size={16} weight="fill" className="text-accent" aria-label="Verified" />
          </span>
          <span className="text-right text-xs text-muted">Adoption · attachment · ages 12–17</span>
        </li>
        <li className="flex items-center justify-between gap-3 rounded-xl border border-line px-4 py-3">
          <span className="flex items-center gap-2 font-medium">
            <Buildings size={18} className="text-muted" /> Another listed program
          </span>
          <span className="text-right text-xs text-muted">Attachment · trauma · ages 13–18</span>
        </li>
        <li className="flex items-center justify-between gap-3 rounded-xl border border-dashed border-line px-4 py-3 opacity-50">
          <span className="flex items-center gap-2">
            <Buildings size={18} /> A program that never listed adoption
          </span>
          <span className="text-right text-xs">Not shown</span>
        </li>
      </ul>
    </div>
  )
}
