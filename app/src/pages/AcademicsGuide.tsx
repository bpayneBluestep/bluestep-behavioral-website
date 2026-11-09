import { useTitle } from '../ui'
import { useNoIndex } from './slate/guide'
import { GuideLayout, Faq, Shot, Flow, H3, K, N, NStep, NSteps, Note, Tip, U, Who, type GuidePath, type TocGroup } from './help/kit'
import type { ReactNode } from 'react'

// Academics area of the help center (/help/academics). Unlisted: shared by link, never in the nav or footer,
// noindex. Content mirrors the "BlueStep Academics Guide" artifact; screenshots
// are from the Summit Ridge Academy demo school (configbehmodular).
// Shared layout and building blocks: ./help/kit.tsx (help-guide skill).

const TOC: TocGroup[] = [
  { group: 'Getting around', items: [{ id: 'start', label: 'Where Academics lives' }] },
  {
    group: 'Before the year',
    items: [
      { id: 'setup', label: 'Set up a new school year' },
      { id: 'setup-details', label: 'School details', sub: true },
      { id: 'setup-years', label: 'Years and terms', sub: true },
      { id: 'setup-scales', label: 'Subjects and grade scales', sub: true },
      { id: 'setup-codes', label: 'Attendance codes', sub: true },
      { id: 'setup-courses', label: 'Courses', sub: true },
      { id: 'setup-docs', label: 'Document options', sub: true },
      { id: 'schedule', label: 'Build the class schedule' },
    ],
  },
  {
    group: 'Students',
    items: [
      { id: 'enroll', label: 'Enroll a new student' },
      { id: 'enroll-roster', label: 'Change a class roster', sub: true },
      { id: 'enroll-profile', label: 'Grade level and student ID', sub: true },
      { id: 'transfer', label: 'Add transfer credits' },
      { id: 'transfer-blueiq', label: 'Read a transcript with BlueIQ', sub: true },
      { id: 'transfer-typed', label: 'Type or paste a list', sub: true },
      { id: 'progress', label: "Check a student's progress" },
    ],
  },
  {
    group: 'Teaching',
    items: [
      { id: 'teaching', label: 'Take attendance and enter grades' },
      { id: 'teaching-attendance', label: 'Take attendance', sub: true },
      { id: 'teaching-setup', label: 'Set up the gradebook', sub: true },
      { id: 'teaching-scores', label: 'Enter scores', sub: true },
    ],
  },
  {
    group: 'End of term',
    items: [
      { id: 'posting', label: 'Post final grades' },
      { id: 'posting-fix', label: 'Fix a posted grade', sub: true },
      { id: 'wrapup', label: 'When a student leaves' },
      { id: 'documents', label: 'Report cards and transcripts' },
      { id: 'documents-one', label: 'For one student', sub: true },
      { id: 'documents-official', label: 'Official transcripts', sub: true },
      { id: 'documents-batch', label: 'For a whole class or school', sub: true },
    ],
  },
  {
    group: 'Reference',
    items: [
      { id: 'permissions', label: 'Who can do what' },
      { id: 'faq', label: 'Common questions' },
    ],
  },
]

const PATHS: GuidePath[] = [
  {
    title: 'I teach classes',
    links: [
      ['teaching', 'Take attendance and enter grades'],
      ['posting', 'Post final grades'],
      ['wrapup', 'When a student leaves'],
    ],
  },
  {
    title: 'I enroll students',
    links: [
      ['enroll', 'Enroll a new student'],
      ['transfer', 'Add transfer credits'],
      ['documents', 'Print report cards and transcripts'],
    ],
  },
  {
    title: 'I run the school',
    links: [
      ['setup', 'Set up a new school year'],
      ['schedule', 'Build the class schedule'],
      ['permissions', 'Who can do what'],
    ],
  },
]

function Pair({ children }: { children: ReactNode }) {
  return <div className="grid items-start gap-x-5 sm:grid-cols-2">{children}</div>
}

export default function AcademicsGuide() {
  useTitle('Academics user guide')
  useNoIndex()
  return (
    <GuideLayout
      kicker="BlueStep Academics"
      title="Academics user guide"
      intro={
        <>
          Step-by-step help for running your school in BlueStep, organised by the job you're doing. The screenshots come
          from a demo school, Summit Ridge Academy. The orange numbers on each picture match the numbered steps beside it.
        </>
      }
      paths={PATHS}
      toc={TOC}
      imgFolder="academics-guide"
      footer="BlueStep Academics · screenshots from the Summit Ridge Academy demo school."
    >
      <Flow
        id="start"
        eyebrow="Getting around"
        title="Where Academics lives"
        lede="Academics has two homes: a page for the whole school, and a tab on each student's record."
      >
        <ul>
          <li>
            <b>The Academics menu</b> at the top of BlueStep is for the whole school. Its tabs are My Classes, Classes,
            Students, Grading, Documents and Setup.
          </li>
          <li>
            <b>The Academics tab on a student's record</b> covers one student. Its tabs are Classes, Credit Tracking,
            Academic Record, and Report Cards &amp; Transcripts.
          </li>
        </ul>
        <p>
          You only see the tabs your role allows. A teacher usually sees My Classes and Grading. A registrar sees Students
          and Documents. An administrator sees everything. If a tab you need is missing, see{' '}
          <a href="#permissions" className="text-accent underline underline-offset-2">
            Who can do what
          </a>
          .
        </p>
        <Note title="Good to know.">
          Everything in Academics belongs to the school you're signed in to. To work on another school's classes, switch
          schools with the site picker at the top of BlueStep first.
        </Note>
      </Flow>

      <Flow
        id="setup"
        eyebrow="Before the year · Workflow 1"
        title="Set up a new school year"
        lede="Setup is a checklist. Work through it once when you start using Academics. After that, come back each year to add the new year and its terms."
        who={<Who roles={['School administrator']}>Needs Academics Setup: Editor</Who>}
      >
        <Shot
          src="setup-checklist"
          w={1154}
          h={640}
          alt="The Setup tab with the seven-step checklist on the left and the School details form on the right"
          caption="Setup with all seven steps done. A green tick means that step has what it needs."
        />
        <NSteps>
          <NStep n={1}>
            Open <U>Academics → Setup</U>. The checklist shows every step and how many are done. Click any step to open
            it, or follow the <U>Next</U> link at the bottom of each page.
          </NStep>
          <NStep n={2}>
            Each page saves on its own. Remember to click its save button, such as <U>Save school details</U>, before you
            move on.
          </NStep>
        </NSteps>

        <H3 id="setup-details">School details</H3>
        <p>This is what prints at the top of every report card and transcript, plus the school's grading rules.</p>
        <ul>
          <li>
            <b>School:</b> name, address, phone, school code (CEEB), accreditation and logo. The preview on the right shows
            the document header as you type.
          </li>
          <li>
            <b>Registrar:</b> name, title and an optional signature image for transcripts.
          </li>
          <li>
            <b>Grading:</b>
            <ul>
              <li>Whether grades show as letters, percentages or both.</li>
              <li>Weighted or unweighted GPA.</li>
              <li>How retakes count.</li>
              <li>The step partial credit rounds to.</li>
              <li>The GPA bonus for Honors, AP and dual-enrollment courses.</li>
            </ul>
          </li>
          <li>
            <b>School days:</b> the days attendance reminders appear.
          </li>
          <li>
            <b>Final marks that aren't letters:</b> W, WP, WF, Hand-off and Incomplete, and whether each counts toward GPA,
            credits and the official transcript.
          </li>
          <li>
            <b>Default gradebook categories:</b> new classes start with these weights, such as Tests 50%. Teachers can
            change them for their own class.
          </li>
        </ul>

        <H3 id="setup-years">Years and terms</H3>
        <Shot
          src="setup-years"
          w={1154}
          h={760}
          alt="Year and terms page listing school years with their terms and an Add a year button"
          caption="Each school year holds its terms. A class always belongs to one term."
        />
        <NSteps>
          <NStep n={1}>
            Click <U>Add a year</U> and give it a name and dates, for example 2026-27, Aug 17 to Jun 4. The presets fill
            in common term patterns for you.
          </NStep>
          <NStep n={2}>
            Use <U>Add a term</U> for each grading period: Fall and Spring, Semester 1 and 2, or quarters. Terms have their
            own start and end dates.
          </NStep>
        </NSteps>
        <Tip title="Tip.">
          Set up next year before the current one ends. Then you can copy this year's classes into the new terms (see{' '}
          <a href="#schedule" className="text-accent underline underline-offset-2">
            Build the class schedule
          </a>
          ).
        </Tip>

        <H3 id="setup-scales">Subject areas and grade scales</H3>
        <p>
          <b>Subject areas</b> (English, Math, Science…) group credits on the student's Credit Tracking tab and on
          transcripts. <b>Grade scales</b> turn a percentage into a letter and GPA points. Most schools have a standard A–F
          scale and a Pass/Fail scale.
        </p>
        <Shot
          src="setup-scales"
          w={1154}
          h={760}
          alt="Grade scales page showing letter bands with minimum percentages and GPA points"
          caption="A grade scale: each letter has the lowest percentage that earns it and its GPA points. The cutoffs are exact, so 89.99% is still a B+."
        />

        <H3 id="setup-codes">Attendance codes</H3>
        <Shot
          src="setup-codes"
          w={1154}
          h={619}
          alt="Attendance codes page with buttons to add the standard codes or a single code"
          caption="The codes teachers tap when they take attendance."
        />
        <NSteps>
          <NStep n={1}>
            <U>Add the standard codes</U> creates Present, Absent, Tardy and Excused in one click.
          </NStep>
          <NStep n={2}>
            <U>Add a code</U> adds your own, such as TH for Therapy or M for Medical. One code is the default. It's filled
            in for every student, so teachers only tap the exceptions.
          </NStep>
        </NSteps>

        <H3 id="setup-courses">Courses</H3>
        <Shot
          src="setup-courses"
          w={1154}
          h={760}
          alt="Courses page with a row for adding a course and a Paste a list button"
          caption="The course catalog. Classes in each term are made from these courses."
        />
        <NSteps>
          <NStep n={1}>
            <U>Paste a list</U> adds many courses at once from a spreadsheet. You'll see what will be added before anything
            is saved.
          </NStep>
          <NStep n={2}>
            Or fill in the top row (code, name, subject, credits, level, GPA, grade scale) and click <U>Add</U>.
          </NStep>
        </NSteps>
        <Tip title="Course codes matter.">
          Retakes are matched on the code, so each code must be unique. A course taught in two halves needs a code for each
          half, such as ENG10A for Fall and ENG10B for Spring.
        </Tip>

        <H3 id="setup-docs">Document options</H3>
        <p>
          Choose which sections appear on report cards, progress reports and transcripts, such as attendance, teacher
          comments and a school comment. The sample on the right updates as you switch sections on and off. Click{' '}
          <U>Save document options</U> when it looks right.
        </p>
        <Shot
          src="setup-docs"
          w={1154}
          h={820}
          alt="Document options with section switches and a live sample report card"
          caption="A live sample shows exactly what families will receive."
        />
      </Flow>

      <Flow
        id="schedule"
        eyebrow="Before the year · Workflow 2"
        title="Build the class schedule"
        lede="A class is one course, in one term, with a teacher. You can add classes one by one, or copy last term's and adjust them."
        who={<Who roles={['School administrator']}>Needs Academics Setup: Editor</Who>}
      >
        <Shot
          src="classes-list"
          w={1154}
          h={700}
          alt="The Classes tab listing classes for a term with teachers, period, room and student counts"
          caption="Academics → Classes shows every class in the chosen term."
        />
        <NSteps>
          <NStep n={1}>
            <U>Add class</U> creates one class (see the next picture).
          </NStep>
          <NStep n={2}>
            <U>Copy from another term</U> brings over the classes you pick, with their teachers, period, room and gradebook
            weights. Students and assignments stay behind.
          </NStep>
          <NStep n={3}>
            The term picker, search and teacher filter narrow the list. The chips (Unposted, No teacher, Former staff,
            Empty) find classes that need attention.
          </NStep>
          <NStep n={4}>
            <U>Roster</U> opens the class's student list.
          </NStep>
          <NStep n={5}>
            The <K>⋯</K> menu has Edit, Duplicate, Archive and Delete. A class with students can't be deleted, so archive
            it instead.
          </NStep>
        </NSteps>
        <Shot
          narrow
          src="classes-add"
          w={772}
          h={357}
          alt="Add a class dialog with course, term, section, teacher of record, period, room and co-teachers"
          caption="Adding a class."
        />
        <NSteps>
          <NStep n={1}>
            Pick the <b>course</b> and <b>term</b>. The section letter keeps two classes of the same course apart, such as
            ENG9-A and ENG9-B.
          </NStep>
          <NStep n={2}>
            Pick the <b>teacher of record</b>. Period and room are free text and appear on the teacher's class cards.
          </NStep>
          <NStep n={3}>
            Tick any <b>co-teachers</b>. They can take attendance and grade, just like the teacher of record.
          </NStep>
        </NSteps>
        <Note title="Don't see a teacher in the list?">
          Only current staff whose role includes <b>Gradebook &amp; Attendance: Author or Editor</b> appear. Ask your
          BlueStep administrator to add it to their role.
        </Note>
        <Shot
          narrow
          src="classes-copy"
          w={772}
          h={584}
          alt="Copy from another term dialog listing last term's classes with checkboxes"
          caption="Copy classes forward: pick the source term, tick the classes, and they're created in the term you're viewing."
        />
      </Flow>

      <Flow
        id="enroll"
        eyebrow="Students · Workflow 3"
        title="Enroll a new student"
        lede="New admissions appear in Academics by themselves. Your job is to put them in classes, record their grade level and add any credits they bring with them."
        who={<Who roles={['Registrar']}>Needs Enrollment: Editor</Who>}
      >
        <Shot
          src="students-needs"
          w={1154}
          h={445}
          alt="Students tab, Needs enrollment list with three new students"
          caption="Academics → Students → Needs enrollment lists current students who aren't in any class this term."
        />
        <NSteps>
          <NStep n={1}>
            Open <U>Needs enrollment</U>. The number shows how many students are waiting.
          </NStep>
          <NStep n={2}>
            To enroll several students into the same classes, tick them and click <U>Enroll in classes</U>.
          </NStep>
          <NStep n={3}>
            Or use <U>Enroll</U> on one student's row. If a student won't attend school here, for example a short stay,
            click <U>Not attending school</U>. It takes them off the list, and you can undo it.
          </NStep>
        </NSteps>
        <Shot
          narrow
          src="students-enroll"
          w={772}
          h={633}
          alt="Enroll in classes dialog with a checkbox for each class in the current and upcoming terms and a start date"
          caption="Tick the classes and set the start date, which is usually the day they start school."
        />
        <p>
          Tick each class, check the <b>start date</b>, and click <U>Enroll</U>. Classes in a later term start on that
          term's first day.
        </p>
        <p>
          You'll get a warning before saving if a class clashes with another one in the same period, or if it's a second
          section of a course the student already has. Click <U>Enroll anyway</U> only if that's intended.
        </p>

        <H3 id="enroll-roster">Change a class roster</H3>
        <Shot
          src="roster"
          w={1154}
          h={640}
          alt="Class roster with each student's status, start date and Drop and Remove actions"
          caption="Academics → Classes → Roster."
        />
        <ul>
          <li>
            <U>Add students</U> enrolls more students into this one class.
          </li>
          <li>
            <U>Drop</U> ends a student's enrollment with an end date and a reason. Their attendance and scores stay on
            record. A dropped student can be re-enrolled.
          </li>
          <li>
            <U>Remove</U> is for mistakes only. It deletes an enrollment that should never have existed.
          </li>
          <li>
            <U>Documents</U> opens that student's Report Cards &amp; Transcripts tab.
          </li>
        </ul>

        <H3 id="enroll-profile">Grade level and student ID</H3>
        <p>
          Open the student's record, then <U>Academics → Academic Record</U>.
        </p>
        <Shot
          src="stu-record"
          w={1154}
          h={700}
          alt="The Academic Record tab with the academic profile, grade levels and notes"
          caption="The Academic Record tab: profile, grade-level history, notes and transfer credits."
        />
        <ul>
          <li>
            <b>Academic profile:</b>
            <ul>
              <li>Whether they attend school here.</li>
              <li>
                Their <b>student ID</b>. Type it here; it prints on report cards and transcripts.
              </li>
              <li>Home school, district and notes.</li>
            </ul>
          </li>
          <li>
            <b>Grade levels:</b> add the grade they're in and the date it started. Keep the history, and add a new row when
            they move up a grade.
          </li>
          <li>
            <b>Notes:</b> academic notes for staff, such as an IEP reminder or a placement decision.
          </li>
        </ul>
      </Flow>

      <Flow
        id="transfer"
        eyebrow="Students · Workflow 4"
        title="Add transfer credits"
        lede="Credits a student earned at other schools count toward their totals and print on their transcript. You can add them three ways, from the Transfer credits panel on the Academic Record tab."
        who={<Who roles={['Registrar']}>Needs Transfer Credits: Editor</Who>}
      >
        <Shot
          src="stu-transfers"
          w={1190}
          h={297}
          alt="Transfer credits panel with buttons to read a transcript with BlueIQ, type or paste, or add one credit"
          caption="Three ways in. Transfer credits are grouped by the school they came from."
        />
        <NSteps>
          <NStep n={1}>
            <U>Read a transcript with BlueIQ</U>: upload the transcript and BlueIQ fills in every course for you to check.
            This is the fastest way for a long transcript.
          </NStep>
          <NStep n={2}>
            <U>Type or paste</U>: the same grid with no AI, for typing rows or pasting from a spreadsheet.
          </NStep>
          <NStep n={3}>
            <U>Add transfer credit</U>: one course at a time.
          </NStep>
        </NSteps>

        <H3 id="transfer-blueiq">Read a transcript with BlueIQ</H3>
        <Pair>
          <Shot
            narrow
            src="biq-upload"
            w={692}
            h={355}
            alt="BlueIQ upload window with a drop zone for a PDF or photo"
            caption="Drop in a PDF, a scan, or a phone photo (JPG or PNG) up to 10 MB."
          />
          <Shot
            narrow
            src="biq-reading"
            w={692}
            h={297}
            alt="BlueIQ reading the transcript with a progress shimmer and a timer"
            caption="BlueIQ reads it, usually in 15–40 seconds. Cancel stops waiting."
          />
        </Pair>
        <Shot
          src="biq-review"
          w={1253}
          h={840}
          alt="BlueIQ review window with the transcript on the left and an editable grid of courses on the right"
          caption="Check every row against the transcript beside it. Nothing is saved until you click Save."
        />
        <NSteps>
          <NStep n={1}>
            The transcript stays open on the left while you check. <U>Open in a new tab</U> shows it full size.
          </NStep>
          <NStep n={2}>
            Courses are grouped by school, year and term. You can edit every box, including the headers. Each course gets
            a subject, level, credits, grade and completed date, mapped to your school's own subjects and grades.
          </NStep>
          <NStep n={3}>
            If the transcript counts semester or quarter hours instead of credits, change{' '}
            <U>Credits on this transcript are</U> and the credits recalculate.
          </NStep>
          <NStep n={4}>
            Untick anything you don't want, then click <U>Save N transfer credits</U>. All the rows save together, or none
            do: a row with a problem is outlined in red with the reason.
          </NStep>
        </NSteps>
        <Tip title="BlueIQ flags what it isn't sure of.">
          These rows come in unticked with the reason shown under them:
          <ul className="my-2 list-disc space-y-1 pl-5">
            <li>Courses still in progress.</li>
            <li>Courses already on the student's record.</li>
            <li>Grades that aren't on your school's scale.</li>
          </ul>
          A yellow banner warns you if the transcript belongs to a different student, as in the picture above.
        </Tip>
        <p>
          Saved transfer credits lock, the same as posted grades. The transcript file is kept on the student's record under{' '}
          <U>Transfer transcripts</U>. To change a locked credit, someone with Unlock Signed Forms clicks <U>Unlock</U> and
          gives a reason.
        </p>

        <H3 id="transfer-typed">Type or paste a list</H3>
        <p>
          <U>Type or paste</U> opens the same grid empty.
        </p>
        <ul>
          <li>
            <b>Typing:</b> press <K>Enter</K> to move down a column. Typing in the last row adds a new one.
          </li>
          <li>
            <b>Pasting:</b> click <U>Paste a list</U> and paste one course per line as <i>code, name, credits, grade</i>,
            optionally followed by subject, year and term. Copying straight from a spreadsheet works too.
          </li>
        </ul>
      </Flow>

      <Flow
        id="progress"
        eyebrow="Students · Workflow 5"
        title="Check a student's progress"
        lede={'For counselors, case managers and anyone answering "how is this student doing?"'}
        who={<Who roles={['Anyone with access']}>Needs Student Academic Record: Reader</Who>}
      >
        <p>
          Open the student's record and click <U>Academics</U>.
        </p>
        <Shot
          src="stu-classes"
          w={1154}
          h={640}
          alt="Student Classes tab listing current classes with grade so far, attendance and missing work"
          caption="The Classes tab shows each class's grade so far, attendance rate and missing work, then past terms below. Grades so far are unofficial until the class is posted."
        />
        <Shot
          src="stu-credits"
          w={1154}
          h={760}
          alt="Credit Tracking tab with credits earned, GPA tiles, credits by subject area and course history"
          caption="The Credit Tracking tab shows credits earned and in progress, cumulative and last-term GPA, credits by subject area, and every course by term."
        />
        <Note title="Retakes.">
          Every attempt at a course stays on the record. Your school's retake policy decides which attempt counts toward GPA
          and credits; the others show as <i>Repeated</i>. To link a retake by hand, for example a transfer course that
          matches one of yours, use <U>Retake…</U> on the course.
        </Note>
      </Flow>

      <Flow
        id="teaching"
        eyebrow="Teaching · Workflow 6"
        title="Take attendance and enter grades"
        lede="A teacher's day starts at My Classes. Every class you teach or co-teach is there, with what still needs doing today."
        who={<Who roles={['Teacher']}>Needs Gradebook &amp; Attendance: Author</Who>}
      >
        <Shot
          src="my-classes"
          w={1154}
          h={672}
          alt="My Classes with summary tiles and a card for each class with Take attendance and Gradebook buttons"
          caption="Academics → My Classes."
        />
        <NSteps>
          <NStep n={1}>
            The tiles show your classes, attendance you haven't taken yet today, and students who need wrapping up.
          </NStep>
          <NStep n={2}>
            <U>Take attendance</U> opens today's sheet. The card says <i>Not taken</i> until you save it.
          </NStep>
          <NStep n={3}>
            <U>Gradebook</U> opens the class's assignments and scores.
          </NStep>
        </NSteps>

        <H3 id="teaching-attendance">Take attendance</H3>
        <Shot
          src="attendance"
          w={1154}
          h={860}
          alt="Attendance sheet with a row of code buttons per student and a Save attendance bar"
          caption="Everyone starts as Present. Tap only the exceptions."
        />
        <NSteps>
          <NStep n={1}>Tap a student's code (Absent, Tardy, Excused…). Add a note if it helps.</NStep>
          <NStep n={2}>
            <U>Mark all present</U> resets the whole sheet.
          </NStep>
          <NStep n={3}>
            <U>Save attendance</U> once at the end. The bar stays at the bottom of the screen however far you scroll.
          </NStep>
        </NSteps>
        <p>
          To fix another day, use the arrows beside the date or pick a date. A day you've already saved can be updated or
          cleared. Each student's term attendance rate is on the right.
        </p>

        <H3 id="teaching-setup">Set up the gradebook</H3>
        <Shot
          src="gradebook"
          w={1154}
          h={720}
          alt="Gradebook grid with students down the side, assignments across the top and the term grade beside each name"
          caption="The gradebook. The newest assignment is on the left, so new work is always in view."
        />
        <NSteps>
          <NStep n={1}>
            <U>Add assignment</U>: give it a title, category, points possible and dates (see below).
          </NStep>
          <NStep n={2}>
            <U>Weights</U>: how much each category counts, such as Tests 50%. Set every weight to 0 to grade by total
            points instead.
          </NStep>
          <NStep n={3}>
            Each assignment's <K>⋯</K> menu has Edit, Duplicate and Delete.
          </NStep>
          <NStep n={4}>
            Click any cell to enter a score (see{' '}
            <a href="#teaching-scores" className="text-accent underline underline-offset-2">
              Enter scores
            </a>
            ).
          </NStep>
          <NStep n={5}>
            <U>Post final grades</U> at the end of the term (see{' '}
            <a href="#posting" className="text-accent underline underline-offset-2">
              Post final grades
            </a>
            ).
          </NStep>
        </NSteps>
        <Pair>
          <Shot
            narrow
            src="gb-assignment"
            w={772}
            h={395}
            alt="Add an assignment dialog with title, category, points possible, assigned and due dates, extra credit and description"
            caption="An assignment. Extra credit adds to points earned, never to points possible."
          />
          <Shot
            narrow
            src="gb-weights"
            w={532}
            h={542}
            alt="Weights dialog with a percentage for each category and a running total"
            caption="Weights must total 100%. The running total tells you when they do."
          />
        </Pair>

        <H3 id="teaching-scores">Enter scores</H3>
        <p>
          Click a cell and type. Press <K>Enter</K> or <K>↓</K> to move down to the next student. Scores save by themselves
          a moment after you stop typing, and the student's term grade updates straight away.
        </p>
        <ul>
          <li>Type a number for the points earned.</li>
          <li>
            Type <K>m</K> for <b>Missing</b>. It counts as zero, and the student's row shows how many are missing.
          </li>
          <li>
            Type <K>x</K> for <b>Exempt</b>. It's left out of the grade entirely.
          </li>
          <li>Leave it blank if it isn't graded yet. A blank never counts as zero.</li>
        </ul>
        <Shot
          src="gb-cell"
          w={1162}
          h={560}
          alt="Gradebook with a score selected and the panel below it for Missing, Exempt, Late, Incomplete and a comment"
          caption="The panel under the grid shows details for the selected score."
        />
        <NSteps>
          <NStep n={1}>
            When a cell is selected, the panel lets you mark the score <b>Late</b> or <b>Incomplete</b>, or add a comment
            for the student.
          </NStep>
        </NSteps>
      </Flow>

      <Flow
        id="posting"
        eyebrow="End of term · Workflow 7"
        title="Post final grades"
        lede="Posting turns each student's term grade into their final grade for the class. Posted grades count toward credits and GPA, print on transcripts, and lock against changes."
        who={<Who roles={['Teacher']}>Needs Gradebook &amp; Attendance: Author (own classes) or Editor (any class)</Who>}
      >
        <Shot
          narrow
          src="gb-post"
          w={772}
          h={820}
          alt="Post final grades dialog listing each student's grade, credits, notes, and Incomplete, override and comment options"
          caption="From the gradebook, click Post final grades. Check the list before you confirm."
        />
        <ol className="list-decimal space-y-1.5 pl-5 [&>li]:max-w-[68ch]">
          <li>The chips at the top count who is ready, who has no grade yet, and who is already posted or wrapped up.</li>
          <li>Read the notes column. It flags things like missing work that will count as zero.</li>
          <li>
            For any student, you can:
            <ul>
              <li>
                Tick <b>Incomplete</b> to give an I for now.
              </li>
              <li>
                Choose an <b>override</b> letter, with a reason.
              </li>
              <li>
                Add a <b>comment</b> for the report card.
              </li>
            </ul>
          </li>
          <li>
            Confirm to post. The class shows <i>Posted</i> and each grade gets a lock.
          </li>
        </ol>

        <H3 id="posting-fix">Fix a posted grade</H3>
        <p>
          Posted grades are locked so they can't change by accident. To correct one, someone with{' '}
          <b>Unlock Signed Forms</b> clicks the grade's <i>Posted</i> badge in the gradebook, or <U>Unlock class</U>, and
          gives a reason. The teacher fixes the scores and posts again. Every lock, unlock and re-post is kept in the grade's
          history.
        </p>
        <Shot
          src="grading"
          w={1154}
          h={620}
          alt="Grading tab listing current-term classes that haven't been posted"
          caption="Academics → Grading is the end-of-term checklist for administrators."
        />
        <NSteps>
          <NStep n={1}>
            <U>Unposted classes</U> lists every current-term class that still needs posting.
          </NStep>
          <NStep n={2}>
            <U>Open incompletes</U> lists every I grade that still needs a final grade.
          </NStep>
          <NStep n={3}>
            <U>Unlocked grades</U> lists grades that were unlocked and haven't been posted again.
          </NStep>
        </NSteps>
      </Flow>

      <Flow
        id="wrapup"
        eyebrow="End of term · Workflow 8"
        title="When a student leaves"
        lede="When a student is discharged mid-term, or a term ends with classes still open, each open class needs an outcome. This is called wrapping up."
        who={<Who roles={['Registrar', 'Teacher']}>Needs Gradebook &amp; Attendance: Author or Editor</Who>}
      >
        <Shot
          src="students-wrapup"
          w={1154}
          h={404}
          alt="Needs wrap-up list with a discharged student and their seven open classes"
          caption={
            <>
              Academics → Students → Needs wrap-up. Click <b>Wrap up</b> <N inline>1</N> on the student's row. Teachers also
              see a Wrap up button on the student's gradebook row, and the student's record shows a reminder.
            </>
          }
        />
        <Shot
          narrow
          src="wrapup-dialog"
          w={772}
          h={820}
          alt="Wrap up dialog with one end date and a block per class offering Leave open, Withdrawal mark, Partial credit or Hand-off grade"
          caption="One window wraps up every open class at once."
        />
        <NSteps>
          <NStep n={1}>
            Set the <b>end date</b>, usually the discharge date. It applies to every class.
          </NStep>
          <NStep n={2}>
            <b>Withdrawal mark</b>: W, WP or WF with no credit. Use this when the student didn't finish.
          </NStep>
          <NStep n={3}>
            <b>Partial credit</b>: credit for the part of the term they completed. Academics suggests an amount from the
            days enrolled, and you can change it.
          </NStep>
          <NStep n={4}>
            <b>Hand-off grade</b>: the grade so far, sent on to the next school. It carries no GPA or credit here.
          </NStep>
        </NSteps>
        <p>Leave a class open if you aren't ready to decide. It stays on the Needs wrap-up list until you are.</p>
      </Flow>

      <Flow
        id="documents"
        eyebrow="End of term · Workflow 9"
        title="Report cards, progress reports and transcripts"
        lede="Make one document from a student's record, or a batch for many students from the Documents tab. Either way, you preview it before anything is printed or saved."
        who={
          <Who roles={['Registrar']}>Needs Report Cards: Author · Transcripts: Reader for unofficial, Author for official</Who>
        }
      >
        <H3 id="documents-one">For one student</H3>
        <Shot
          src="stu-docs"
          w={1154}
          h={409}
          alt="Report Cards and Transcripts tab with buttons for each document type"
          caption="On the student's record: Academics → Report Cards & Transcripts."
        />
        <NSteps>
          <NStep n={1}>
            <U>Progress report</U>: grades so far, as of a date you pick. Good for mid-term check-ins and family meetings.
          </NStep>
          <NStep n={2}>
            <U>Report card</U>: one term's final grades, attendance and comments.
          </NStep>
          <NStep n={3}>
            <U>Unofficial transcript</U>: the whole record, including classes in progress.
          </NStep>
          <NStep n={4}>
            <U>Issue official transcript</U>: see below.
          </NStep>
        </NSteps>
        <Shot
          src="doc-preview"
          w={992}
          h={860}
          alt="Progress report preview with the school header, student details and each class's grade"
          caption="The preview is exactly what prints. Add a school comment if you like, then Print, Download PDF, or Save to student record."
        />

        <H3 id="documents-official">Official transcripts</H3>
        <Shot
          narrow
          src="doc-official"
          w={532}
          h={314}
          alt="Issue official transcript dialog asking who it's issued to and the purpose"
          caption="Say who it's for. The purpose is optional."
        />
        <p>
          An official transcript includes posted grades only. It gets a unique document number and is saved to the
          student's record permanently; it can't be deleted. That gives you a record of every official copy you've sent.
        </p>

        <H3 id="documents-batch">For a whole class, grade or school</H3>
        <Shot
          src="documents-batch"
          w={1154}
          h={712}
          alt="Documents tab with filters for document type, term, grade level, class and teacher, and a Print button"
          caption="Academics → Documents prints many students into one PDF."
        />
        <NSteps>
          <NStep n={1}>
            Choose the document (report cards or progress reports) and the term. Narrow it by grade level, class or teacher,
            and add a school comment if you want one printed on every copy.
          </NStep>
          <NStep n={2}>
            <U>See who</U> lists the students it will include.
          </NStep>
          <NStep n={3}>
            <U>Print N documents</U> builds one PDF with a progress bar, then downloads it. Tick{' '}
            <i>Also save each one to the student's record</i> to keep a copy on every record.
          </NStep>
        </NSteps>
        <p>
          Recent batches stay listed so you can download them again. If a large batch is interrupted, <U>Resume</U> picks it
          up.
        </p>
      </Flow>

      <Flow
        id="permissions"
        eyebrow="Reference"
        title="Who can do what"
        lede="Academics access is set on each staff role. Seven Academics settings each go from No Access to Reader, Author or Editor."
        who={<Who roles={['BlueStep administrator']} />}
      >
        <Shot
          narrow
          src="role-academics"
          w={849}
          h={439}
          alt="The Academics section of a role with seven settings, each with No Access, Reader, Author and Editor options"
          caption="The Academics section of a role. Here, Gradebook & Attendance is set to Author, which is right for a teacher."
        />
        <div className="overflow-x-auto rounded-2xl border border-line">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="bg-surface text-ink">
              <tr>
                {['Setting', 'Reader', 'Author', 'Editor'].map((h) => (
                  <th key={h} scope="col" className="px-4 py-3 font-medium">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="[&_td]:px-4 [&_td]:py-3 [&_th]:whitespace-nowrap [&_th]:px-4 [&_th]:py-3 [&_th]:font-medium [&_th]:text-ink [&_tr]:border-t [&_tr]:border-line [&_tr]:align-top">
              <tr>
                <th scope="row">Academics Setup</th>
                <td>Sees setup and the Classes tab</td>
                <td colSpan={2}>Manages years, terms, subjects, scales, codes, courses and classes</td>
              </tr>
              <tr>
                <th scope="row">Enrollment</th>
                <td>Sees rosters and the Students tab</td>
                <td>—</td>
                <td>Enrolls, drops and re-enrolls; works Needs enrollment</td>
              </tr>
              <tr>
                <th scope="row">Gradebook &amp; Attendance</th>
                <td>Sees gradebooks and attendance</td>
                <td>
                  Teaches <b>their own</b> classes: attendance, grades, posting, wrap-up. Appears in teacher lists
                </td>
                <td>
                  The same for <b>every</b> class, plus the Grading tab
                </td>
              </tr>
              <tr>
                <th scope="row">Student Academic Record</th>
                <td>Sees the student's Academics tabs</td>
                <td>Adds notes and grade levels</td>
                <td>Also edits and deletes them</td>
              </tr>
              <tr>
                <th scope="row">Transfer Credits</th>
                <td>Sees transfer credits</td>
                <td>—</td>
                <td>Adds and edits them, including with BlueIQ</td>
              </tr>
              <tr>
                <th scope="row">Report Cards</th>
                <td>Sees saved report cards</td>
                <td>Makes progress reports and report cards, one or a batch</td>
                <td>Also deletes saved ones</td>
              </tr>
              <tr>
                <th scope="row">Transcripts</th>
                <td>Prints unofficial transcripts</td>
                <td>Also issues official transcripts</td>
                <td>—</td>
              </tr>
              <tr>
                <th scope="row">Unlock Signed Forms</th>
                <td colSpan={3}>
                  An existing BlueStep permission. In Academics it unlocks posted grades and locked transfer credits.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>A typical setup:</p>
        <ul>
          <li>
            <b>Teachers:</b> Gradebook &amp; Attendance at Author, and Student Academic Record at Reader.
          </li>
          <li>
            <b>Registrar:</b> Enrollment, Transfer Credits and Report Cards at Editor, and Transcripts at Author.
          </li>
          <li>
            <b>Principal or education director:</b> Editor on everything, plus Unlock Signed Forms.
          </li>
        </ul>
      </Flow>

      <Flow id="faq" eyebrow="Reference" title="Common questions">
        <div>
          <Faq q="I don't see the Academics menu.">
            Your role has no Academics setting above No Access, or Academics isn't turned on for your school. Ask your
            BlueStep administrator.
          </Faq>
          <Faq q="A teacher is missing from the teacher list.">
            Teacher lists show only current staff whose role has Gradebook &amp; Attendance at Author or Editor. Former
            staff never appear. A teacher already on a class stays on it even if their access changes later.
          </Faq>
          <Faq q="Why can't I change a grade?">
            It's posted, so it's locked. Ask someone with Unlock Signed Forms to unlock it with a reason. You can then
            correct it and post again. Transfer credits work the same way.
          </Faq>
          <Faq q="A new student isn't on Needs enrollment.">
            The list shows current students of this school who aren't in a class this term. Check that they were admitted
            to this school, not another unit, and that nobody marked them <i>Not attending school</i>. That list has an
            Undo.
          </Faq>
          <Faq q="What's the difference between a blank score, Missing and Exempt?">
            A blank isn't graded yet and doesn't count. Missing counts as zero. Exempt is left out of the grade completely.
          </Faq>
          <Faq q="Does BlueIQ save anything by itself?">
            No. BlueIQ only fills in the review grid. Nothing is saved until a person checks the rows and clicks Save. It
            reads PDFs, scans and phone photos up to 10 MB.
          </Faq>
          <Faq q="A student is retaking a course. Which grade counts?">
            Both attempts stay on the transcript. Your school's retake policy, in Setup → School details, decides which one
            counts toward GPA and credits. Retakes are matched on the course code.
          </Faq>
          <Faq q="Can I print the same report card twice?">
            Yes. Preview and print as often as you like. Saving a copy to the record is optional. Official transcripts are
            the exception: each one is numbered and saved permanently.
          </Faq>
        </div>
      </Flow>
    </GuideLayout>
  )
}
