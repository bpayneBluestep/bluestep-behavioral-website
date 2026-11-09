import { useTitle } from '../ui'
import { useNoIndex } from './slate/guide'
import {
  Faq,
  Flow,
  GuideLayout,
  H3,
  N,
  NStep,
  NSteps,
  Note,
  Shot,
  Table,
  Tip,
  To,
  U,
  Who,
  type GuidePath,
  type TocGroup,
} from './help/kit'

// Medications area of the help center (/help/medical). Unlisted: shared by
// link, never in the nav or footer, noindex. Screenshots are from the Summit
// Ridge Academy demo (configbehmodular), taken as a non-super administrator;
// the demo clients are Ava Morales and Noah Bennett. E-prescribing and pharmacy
// integrations are deliberately left out: they get their own guide.

const TOC: TocGroup[] = [
  { group: 'Getting around', items: [{ id: 'start', label: 'Where medications live' }] },
  {
    group: 'Set up',
    items: [
      { id: 'rules', label: 'Medication System rules' },
      { id: 'rules-times', label: 'Times, forms and routes', sub: true },
      { id: 'rules-mar', label: 'Holds, signatures and alerts', sub: true },
      { id: 'groups', label: 'Med Groups' },
      { id: 'exceptions', label: 'MAR exceptions' },
    ],
  },
  {
    group: 'Starting medications',
    items: [
      { id: 'meds-tab', label: "A client's medication list" },
      { id: 'order', label: 'Start a new medication' },
      { id: 'order-info', label: '1. The medication', sub: true },
      { id: 'order-schedule', label: '2. The schedule', sub: true },
      { id: 'order-sign', label: '3. Sign it', sub: true },
    ],
  },
  {
    group: 'The med pass',
    items: [
      { id: 'emar', label: 'The eMAR board' },
      { id: 'give', label: 'Give scheduled meds' },
      { id: 'exception', label: "When a dose isn't given" },
      { id: 'prn', label: 'Give a PRN' },
    ],
  },
  {
    group: 'Changes',
    items: [
      { id: 'discontinue', label: 'Discontinue a medication' },
      { id: 'hold', label: 'Put medications on hold' },
      { id: 'mar', label: "Look back at a client's MAR" },
    ],
  },
  {
    group: 'Reference',
    items: [
      { id: 'who', label: 'Who can do what' },
      { id: 'faq', label: 'Common questions' },
    ],
  },
]

const PATHS: GuidePath[] = [
  {
    title: 'I pass meds',
    links: [
      ['emar', 'Open the eMAR board'],
      ['give', 'Give scheduled meds'],
      ['exception', "Chart a dose that wasn't given"],
    ],
  },
  {
    title: 'I manage orders',
    links: [
      ['order', 'Start a new medication'],
      ['discontinue', 'Discontinue a medication'],
      ['hold', 'Put medications on hold'],
    ],
  },
  {
    title: 'I set things up',
    links: [
      ['rules', 'Medication System rules'],
      ['groups', 'Med Groups'],
      ['who', 'Who can do what'],
    ],
  },
]

export default function MedicalGuide() {
  useTitle('Medications')
  useNoIndex()

  return (
    <GuideLayout
      kicker="BlueStep Medical"
      title="Medications"
      intro={
        <>
          How to set up your medication system, start and stop a client's medications, and chart every dose on the eMAR. The
          screenshots come from a demo facility, Summit Ridge Academy. The orange numbers on each picture match the numbered
          steps beside it. E-prescribing and pharmacy connections have their own guide.
        </>
      }
      paths={PATHS}
      toc={TOC}
      imgFolder="medical-guide"
      footer="BlueStep · screenshots from the Summit Ridge Academy demo facility."
    >
      <Flow
        id="start"
        eyebrow="Getting around"
        title="Where medications live"
        lede="Medications live in three places: the Medical tab of Settings, each client's Medications tab, and the eMAR board under Charting."
      >
        <Shot
          src="settings-medical"
          w={1240}
          h={560}
          alt="The Settings page with the Medical tab open, showing Medication System, Med Groups, MAR Exceptions and Template Meds"
          caption="Settings → Medical. This is where an administrator sets the rules."
        />
        <NSteps>
          <NStep n={1}>
            Click <U>Settings</U> in the top menu, then the <U>Medical</U> tab.
          </NStep>
          <NStep n={2}>
            <U>Medication System</U> holds the rules for your whole facility: med times, holds, counts and signatures.
          </NStep>
          <NStep n={3}>
            <U>Med Groups</U> are the carts, halls or passes you split clients into.
          </NStep>
          <NStep n={4}>
            <U>MAR Exceptions</U> are the reasons staff can pick when a dose isn't given.
          </NStep>
        </NSteps>
        <Shot
          src="client-tab"
          w={1240}
          h={330}
          alt="A client record with the Medications tab open, listing Medications, MAR and Medications On Hold"
          caption="On a client's record, everything about their meds is under the Medications tab."
        />
        <NSteps>
          <NStep n={1}>
            <U>Medications</U> is the client's list of orders. You start and discontinue meds here.
          </NStep>
          <NStep n={2}>
            <U>MAR</U> is the client's history of every dose: given, refused or held.
          </NStep>
          <NStep n={3}>
            <U>Medications On Hold</U> pauses some or all of their meds for a few days.
          </NStep>
        </NSteps>
        <p>
          The med pass itself happens on <U>Charting → eMAR</U>, which shows every client's doses for today in one place. See{' '}
          <To id="emar">The eMAR board</To>.
        </p>
      </Flow>

      <Flow
        id="rules"
        eyebrow="Set up"
        title="Medication System rules"
        lede="One form sets how medications work across your facility. Set it once before you go live, then leave it alone."
        who={<Who roles={['BlueStep administrator']}>Needs Setup/Settings Access</Who>}
      >
        <p>
          Open <U>Settings → Medical → Medication System</U>. Change what you need and click <U>Save</U> at the bottom. Each
          setting affects every client.
        </p>
        <Shot
          src="rules-top"
          w={1170}
          h={941}
          alt="The top of Setup: Medication System, with MAR Generation, Offline MAR Settings and Med Count"
          caption="The top of the form decides when doses appear on the MAR."
        />
        <NSteps>
          <NStep n={1}>
            <U>MAR Grace Period</U> is in minutes. When you start a medication partway through the day, any dose time already
            further in the past than this is skipped for that first day.
          </NStep>
          <NStep n={2}>
            <U>Nurse/Administrator Review</U>: tick it if a second person must review every new order. Until they sign{' '}
            <U>Nursing/Administrator Review</U> on the order, no doses are put on the MAR.
          </NStep>
          <NStep n={3}>
            <U>Self-Administered Meds</U> and <U>Family Administered Meds</U> set how BlueStep treats orders the client or their
            family gives themselves.
          </NStep>
          <NStep n={4}>
            <U>Med Count</U> turns on controlled-substance counting. Tick which <U>Medication Classification Count</U> classes
            (C2, C3 or C4, C5) get counted.
          </NStep>
        </NSteps>

        <H3 id="rules-times">Times, forms and routes</H3>
        <Shot
          src="rules-times"
          w={1170}
          h={440}
          alt="The Configure Medication Times checklist with named passes like AM, PM and Bedtime and half-hour clock times"
          caption="Only the ticked times are offered when someone writes an order."
        />
        <p>
          <N inline>1</N> <U>Configure Medication Times</U> is the list of times staff can schedule a dose at. Untick the ones
          your facility never uses so orders stay consistent. Further down, <U>Configure Drug Dosage Form</U>,{' '}
          <U>Configure Route of Administration</U> and <U>Configure Quantity Unit</U> do the same for the order form's
          drop-downs.
        </p>

        <H3 id="rules-mar">Holds, signatures and alerts</H3>
        <Shot
          src="rules-bottom"
          w={1170}
          h={761}
          alt="The bottom of the Medication System form with Allow Hold on PRNs, Client Signature on MAR, Show Physician's Instructions On MAR and Days Until Expire"
          caption="The bottom of the form."
        />
        <NSteps>
          <NStep n={1}>
            <U>Allow Hold on PRNs</U>: when you <To id="hold">put meds on hold</To>, PRNs are only held if this is ticked.
          </NStep>
          <NStep n={2}>
            <U>Client Signature on MAR</U>: hide the client's signature box, show it, or make it required on every pass.
          </NStep>
          <NStep n={3}>
            <U>Show Physician's Instructions On MAR</U> adds the prescriber's instructions to each dose on the eMAR.
          </NStep>
          <NStep n={4}>
            <U>Days Until Expire</U>, under Notifications, sets how many days' warning staff get before something expires.
          </NStep>
        </NSteps>
      </Flow>

      <Flow
        id="groups"
        eyebrow="Set up"
        title="Med Groups"
        lede="A Med Group is a cart, hall or pass. Staff pick their groups on the eMAR board and only see those clients."
        who={<Who roles={['BlueStep administrator']}>Needs Setup/Settings Access</Who>}
      >
        <Shot
          src="med-groups"
          w={1170}
          h={418}
          alt="The Active Med Groups list with Bluebird A, Bluebird B, Redrock A, Redrock B, Redrock C, Sage A and Sage B"
          caption="Settings → Medical → Med Groups."
        />
        <p>
          Click <N inline>1</N> <U>New Entry</U>, type the group's name and save. Name groups the way your staff talk about the
          med pass: by cart, hall or unit.
        </p>
        <p>
          Each client's group is the <U>Med Group Default</U> on their <U>Client Information → Client Settings</U> form.
        </p>
        <Note title="Clients with no group.">
          A client who isn't in any Med Group only shows on the eMAR board when the person passing meds has no groups ticked. Put
          every client in a group so nobody gets missed.
        </Note>
      </Flow>

      <Flow
        id="exceptions"
        eyebrow="Set up"
        title="MAR exceptions"
        lede="Exceptions are the reasons a dose wasn't given: Refused, Sleeping, Absent and so on."
        who={<Who roles={['BlueStep administrator']}>Needs Setup/Settings Access</Who>}
      >
        <Shot
          src="mar-exceptions"
          w={1170}
          h={498}
          alt="The Setup: MAR Exceptions list with Dropped, Sleeping, Medication unavailable, Absent, Other, Spit Out, Low Vitals, Refused and Med on hold"
          caption="Settings → Medical → MAR Exceptions."
        />
        <NSteps>
          <NStep n={1}>
            Click <U>New Entry</U> to add an exception. The <U>Status</U> column shows which ones staff can pick.
          </NStep>
          <NStep n={2}>
            <U>Note Required</U> and <U>Vitals Required</U> make staff add a note or vitals whenever they pick that exception.
          </NStep>
          <NStep n={3}>
            <U>Med on hold</U> is what BlueStep signs held doses with. Leave it as it is.
          </NStep>
        </NSteps>
      </Flow>

      <Flow
        id="meds-tab"
        eyebrow="Starting medications"
        title="A client's medication list"
        lede="The Medications page is the client's current orders, with buttons to add more."
        who={<Who roles={['Nurse', 'Prescriber']}>Needs Medications: Reader or higher</Who>}
      >
        <Shot
          src="meds-tab"
          w={1170}
          h={418}
          alt="A client's Medications page with Active Medications listing ibuprofen, melatonin and sertraline, and a Discontinued Medications section"
          caption="Client → Medications → Medications."
        />
        <NSteps>
          <NStep n={1}>
            <U>New Medication Order</U> starts a new medication. See <To id="order">Start a new medication</To>.
          </NStep>
          <NStep n={2}>
            Each active order shows its schedule and details. Click <U>Edit</U> on it to open the order.
          </NStep>
          <NStep n={3}>
            <U>Discontinued Medications</U> keeps the orders that have been stopped.
          </NStep>
        </NSteps>
      </Flow>

      <Flow
        id="order"
        eyebrow="Starting medications"
        title="Start a new medication"
        lede="An order says what the medication is, when it's given, and who entered it. Saving a signed order puts its doses on the MAR."
        who={<Who roles={['Nurse', 'Prescriber']}>Needs Medications: Author or Editor</Who>}
      >
        <p>
          Open the client, then <U>Medications → Medications</U>, and click <U>New Medication Order</U>. A red star marks the
          fields you must fill in.
        </p>

        <H3 id="order-info">1. The medication</H3>
        <Shot
          src="order-lookup"
          w={1170}
          h={330}
          alt="The Medication field with sertraline typed in and a list of matching drugs and strengths below it"
          caption="Start typing and pick the drug from the list."
        />
        <NSteps>
          <NStep n={1}>
            Type the first few letters of the drug in <U>Medication</U>.
          </NStep>
          <NStep n={2}>
            Pick the exact drug and strength from the list. BlueStep fills in the dosage form and strength for you.
          </NStep>
        </NSteps>
        <Shot
          src="order-info"
          w={1170}
          h={850}
          alt="The Medication Information section filled in for sertraline 50 mg tablet"
          caption="The rest of Medication Information."
        />
        <NSteps>
          <NStep n={1}>
            Check <U>Drug Dosage Form</U> and <U>Medication Classification</U>. Pick C2, C3 or C4, or C5 for controlled
            substances.
          </NStep>
          <NStep n={2}>
            Choose a <U>Drug Category</U>. It shows on the client's medication list.
          </NStep>
          <NStep n={3}>
            Choose <U>Diagnosis</U> or <U>Indication</U> and fill in what the medication is for.
          </NStep>
          <NStep n={4}>
            Pick the <U>Route of Administration</U>.
          </NStep>
          <NStep n={5}>
            Tick the <U>Assistance needed</U> the client gets with this medication.
          </NStep>
          <NStep n={6}>
            Type the prescriber's <U>Physician's Instructions</U>.
          </NStep>
        </NSteps>

        <H3 id="order-schedule">2. The schedule</H3>
        <Shot
          src="order-schedule"
          w={1170}
          h={822}
          alt="The MAR Scheduling section with quantity, dosage, Daily or PRN selected, a start date and 8:00am ticked"
          caption="MAR Scheduling builds the times this medication appears on the eMAR."
        />
        <NSteps>
          <NStep n={1}>
            Enter the <U>Quantity/Unit</U> given each time (for example 1 Tablet) and the <U>Dosage</U> (50 mg).
          </NStep>
          <NStep n={2}>
            Choose how often under <U>Scheduling Options</U>.
          </NStep>
          <NStep n={3}>
            Set the <U>Start Date</U>.
          </NStep>
          <NStep n={4}>
            Tick each time it's given in <U>Scheduled Time(s)</U>. For an as-needed medication, tick <U>PRN</U>.
          </NStep>
          <NStep n={5}>
            Write the <U>MAR Instructions</U> staff will see when they give it, like "Give with breakfast."
          </NStep>
          <NStep n={6}>
            Click <U>Done</U>. The schedule appears as a row below.
          </NStep>
        </NSteps>
        <Tip title="Different doses at different times?">
          Click <U>Additional Timing</U> after the first row to add another schedule line, for example 50 mg in the morning and
          25 mg at bedtime.
        </Tip>

        <H3 id="order-sign">3. Sign it</H3>
        <Shot
          src="order-sign"
          w={1170}
          h={461}
          alt="A saved order showing its schedule row and the Authorizations section signed by the person who entered it"
          caption="A saved order: the schedule row above, the signatures below."
        />
        <NSteps>
          <NStep n={1}>Check the schedule row says what you meant: dosage, dates, times and instructions.</NStep>
          <NStep n={2}>
            Tick <U>Data entered by</U> to sign the order, then click <U>Save</U>. Its doses go onto the MAR straight away.
          </NStep>
          <NStep n={3}>
            If your facility uses <To id="rules">Nurse/Administrator Review</To>, a second person opens the order and signs{' '}
            <U>Nursing/Administrator Review</U>.
          </NStep>
        </NSteps>
        <Note title="Starting a med partway through the day.">
          Dose times that have already passed today aren't added. A medication ordered at 2:00pm with an 8:00am time starts with
          tomorrow's 8:00am dose.
        </Note>
      </Flow>

      <Flow
        id="emar"
        eyebrow="The med pass"
        title="The eMAR board"
        lede="The eMAR board shows every client with doses due today, grouped by time. It's where a med pass starts."
        who={<Who roles={['Nurse', 'Med passer']}>Needs Chart & Administer Meds</Who>}
      >
        <Shot
          src="board"
          w={1240}
          h={520}
          alt="The Scheduled MAR board with an 8:00pm block for two clients and a PRN block for one, each tile showing how many doses are due"
          caption="Charting → eMAR."
        />
        <NSteps>
          <NStep n={1}>
            The bar at the top shows your current settings: which <U>Groups</U> you're passing for and how the board is sorted.
          </NStep>
          <NStep n={2}>
            Click <U>Settings</U> to change them.
          </NStep>
          <NStep n={3}>
            Each block is one med time. The number on a client's tile is how many doses are due. Click a tile to give them.
          </NStep>
        </NSteps>
        <Shot
          src="board-settings"
          w={1240}
          h={590}
          alt="The eMAR settings panel with Groups checkboxes, Sort By, View By, Med List and Report options"
          caption="The settings panel. BlueStep remembers your choices next time."
        />
        <NSteps>
          <NStep n={1}>
            Tick the <U>Groups</U> you're passing meds for. The board only shows clients in those groups.
          </NStep>
          <NStep n={2}>
            <U>View By</U>: <U>Time</U> shows a block per med time; <U>Resident</U> shows one tile per client.
          </NStep>
          <NStep n={3}>
            <U>Report</U>: show <U>All</U> doses, only <U>Regular</U> scheduled ones, or only <U>PRN</U>.
          </NStep>
          <NStep n={4}>
            Click <U>Done</U>.
          </NStep>
        </NSteps>
        <Shot
          src="board-resident"
          w={1240}
          h={330}
          alt="The board viewed by resident, with a progress bar on each client's tile"
          caption="View By: Resident."
        />
        <p>
          In the resident view, <N inline>1</N> each tile counts how many of today's doses have been charted, and lists the med
          times still to do.
        </p>
      </Flow>

      <Flow
        id="give"
        eyebrow="The med pass"
        title="Give scheduled meds"
        lede="Clicking a client's tile opens their doses for that time. Signing a dose is what records it as given."
        who={<Who roles={['Nurse', 'Med passer']}>Needs Chart & Administer Meds</Who>}
      >
        <Shot
          src="give"
          w={1170}
          h={560}
          alt="The MAR Detail for one client at 8:00pm, with melatonin 3 mg signed and the Client Signature box below"
          caption="One client's 8:00pm doses."
        />
        <NSteps>
          <NStep n={1}>
            Give the medication, then tick <U>Staff signature</U> beside it.
          </NStep>
          <NStep n={2}>
            <U>Options</U> opens <U>Notes</U>, <U>Exceptions</U> and <U>Administration Time</U> for that dose.
          </NStep>
          <NStep n={3}>
            Charting after the fact? Set <U>Administration Time</U> to when you actually gave it.
          </NStep>
          <NStep n={4}>
            Click <U>Save</U>.
          </NStep>
        </NSteps>
        <p>
          If your facility shows the client's signature, a <U>Client Signature</U> box appears once you sign a dose, for the client
          to sign on screen.
        </p>
        <Shot
          src="given"
          w={1170}
          h={258}
          alt="The Medications Previously Administered Today list showing a PRN given at 2:05PM and who signed it"
          caption="Once doses are charted, the client's page lists what they've had today."
        />
      </Flow>

      <Flow
        id="exception"
        eyebrow="The med pass"
        title="When a dose isn't given"
        lede="If a client refuses, is asleep or is off site, record why. You still sign, so the dose is accounted for."
        who={<Who roles={['Nurse', 'Med passer']}>Needs Chart & Administer Meds</Who>}
      >
        <Shot
          src="exception"
          w={1170}
          h={242}
          alt="A dose of guanfacine with Sleeping chosen under Exceptions, a note, and the dose marked Not Administered"
          caption="Open Options on the dose to record an exception."
        />
        <NSteps>
          <NStep n={1}>
            Click <U>Options</U> on the dose and choose the reason under <U>Exceptions</U>.
          </NStep>
          <NStep n={2}>
            Add a short note in <U>Notes</U>: what happened and who you told.
          </NStep>
          <NStep n={3}>
            The dose now reads <U>Not Administered</U>. Tick <U>Staff signature</U> and click <U>Save</U>.
          </NStep>
        </NSteps>
      </Flow>

      <Flow
        id="prn"
        eyebrow="The med pass"
        title="Give a PRN"
        lede="As-needed medications sit in their own PRN block on the board, ready whenever the client needs one."
        who={<Who roles={['Nurse', 'Med passer']}>Needs Chart & Administer Meds</Who>}
      >
        <Shot
          src="prn"
          w={1170}
          h={465}
          alt="A PRN dose of acetaminophen signed, with a note, a Pre Pain Level of 5 and the Client Signature box"
          caption="Click the client's tile in the PRN block."
        />
        <NSteps>
          <NStep n={1}>
            Tick <U>Staff signature</U> on the PRN you're giving.
          </NStep>
          <NStep n={2}>
            <U>Notes</U> is required for a PRN: say why it was needed.
          </NStep>
          <NStep n={3}>
            Enter the <U>Pre Pain Level</U>.
          </NStep>
          <NStep n={4}>
            Have the client sign if your facility uses <U>Client Signature</U>, then click <U>Save</U>.
          </NStep>
        </NSteps>
      </Flow>

      <Flow
        id="discontinue"
        eyebrow="Changes"
        title="Discontinue a medication"
        lede="Stop a medication by discontinuing it, not deleting it. The order and every dose given stay on the record."
        who={<Who roles={['Nurse', 'Prescriber']}>Needs Medications: Editor</Who>}
      >
        <Shot
          src="dc"
          w={1170}
          h={361}
          alt="The Authorizations section of an order with the Discontinue staff signature ticked and DC Review below"
          caption="Open the order from the client's medication list and scroll to Authorizations."
        />
        <NSteps>
          <NStep n={1}>
            Under <U>DC this medication</U>, tick <U>Staff signature</U> and click <U>Save</U>. The order's schedule ends today
            and it leaves Active Medications.
          </NStep>
          <NStep n={2}>
            If your facility reviews discontinued meds, a second person signs <U>DC Review</U>.
          </NStep>
        </NSteps>
        <Note title="Changing a dose?">
          Discontinue the old order and start a new one with the new dose. The MAR then shows clearly which dose was given on
          which day.
        </Note>
      </Flow>

      <Flow
        id="hold"
        eyebrow="Changes"
        title="Put medications on hold"
        lede="A hold pauses medications for up to 14 days, for a home visit or a doctor's instruction, without discontinuing them."
        who={<Who roles={['Nurse']}>Needs Medications: Editor</Who>}
      >
        <Shot
          src="hold"
          w={1170}
          h={695}
          alt="The Medications On Hold form with Selected Medications to Hold chosen, melatonin and sertraline ticked for 11/11 to 11/12, and a hold reason"
          caption="Client → Medications → Medications On Hold."
        />
        <NSteps>
          <NStep n={1}>
            Choose a <U>Hold Type</U>: <U>Hold All Medications</U>, <U>Selected Medications to Hold</U>, or{' '}
            <U>Remove Hold on all Medications</U> to end a hold early.
          </NStep>
          <NStep n={2}>
            For selected meds, tick <U>Hold Medication</U> on each one.
          </NStep>
          <NStep n={3}>
            Give each a <U>Hold Start</U> and <U>Hold End</U>. For Hold All, there's one start and end for everything.
          </NStep>
          <NStep n={4}>
            Type the <U>Hold Reason</U> and click <U>Save</U>.
          </NStep>
        </NSteps>
        <p>
          BlueStep signs every dose in the hold with the <U>Med on hold</U> exception, so they don't show as
          missed. PRNs are left alone unless <To id="rules-mar">Allow Hold on PRNs</To> is on.
        </p>
      </Flow>

      <Flow
        id="mar"
        eyebrow="Changes"
        title="Look back at a client's MAR"
        lede="The MAR page is the client's record of every dose: what was due, when it was given, and any exception."
        who={<Who roles={['Nurse']}>Needs Chart & Administer Meds</Who>}
      >
        <Shot
          src="mar-list"
          w={1170}
          h={398}
          alt="A client's MAR list for the last two weeks, grouped by day, showing a scheduled dose and a PRN given at 2:05PM"
          caption="Client → Medications → MAR. It opens on the last two weeks."
        />
        <NSteps>
          <NStep n={1}>
            Use <U>Search Settings</U> to change the dates.
          </NStep>
          <NStep n={2}>
            Each row shows the dose, its scheduled time, when it was given and any exception.
          </NStep>
        </NSteps>
      </Flow>

      <Flow
        id="who"
        eyebrow="Reference"
        title="Who can do what"
        lede="Two settings in the Medical section of a role control medications. Settings needs Setup/Settings Access."
      >
        <Table head={['Task', 'What it needs']}>
          <tr>
            <th scope="row">See a client's medication list</th>
            <td>Medications: Reader, Author or Editor</td>
          </tr>
          <tr>
            <th scope="row">Start a new medication</th>
            <td>Medications: Author or Editor</td>
          </tr>
          <tr>
            <th scope="row">Change or discontinue anyone's order</th>
            <td>Medications: Editor</td>
          </tr>
          <tr>
            <th scope="row">Put medications on hold</th>
            <td>Medications: Editor</td>
          </tr>
          <tr>
            <th scope="row">Use the eMAR board and chart doses</th>
            <td>Chart &amp; Administer Meds: Yes</td>
          </tr>
          <tr>
            <th scope="row">Open a client's MAR history</th>
            <td>Chart &amp; Administer Meds: Yes</td>
          </tr>
          <tr>
            <th scope="row">Change the Medical settings</th>
            <td>Setup/Settings Access</td>
          </tr>
        </Table>
        <p>
          The two are separate. A med passer usually needs <b>Chart &amp; Administer Meds</b> and <b>Medications: Reader</b>; a
          nurse who manages orders needs <b>Medications: Editor</b> as well.
        </p>
        <Note title="Author vs Editor.">
          With Author, a person can start new orders but can't open an order someone else entered, so they can't discontinue it.
          Give Editor to whoever manages orders.
        </Note>
      </Flow>

      <Flow id="faq" eyebrow="Reference" title="Common questions">
        <div>
          <Faq q="I started a medication but today's morning dose isn't on the MAR.">
            Dose times that had already passed when the order was saved aren't added for that day. The first dose is the next
            scheduled time.
          </Faq>
          <Faq q="The eMAR board is empty.">
            Click Settings on the board and tick your Groups. With no groups ticked, the board only shows clients who aren't in a
            Med Group.
          </Faq>
          <Faq q="A client is missing from my eMAR board.">
            They're in a Med Group you haven't ticked, or they have nothing due today. Check their Med Group Default on Client
            Settings.
          </Faq>
          <Faq q="I don't see eMAR under Charting.">
            Your role doesn't have Chart &amp; Administer Meds. Ask an administrator to turn it on.
          </Faq>
          <Faq q="New Medication Order says this is a secure area.">
            You need Medications: Author or Editor to write orders. Reader can only look.
          </Faq>
          <Faq q="Should I delete a medication that was stopped?">
            No. Discontinue it so the order and its history stay on the client's record.
          </Faq>
        </div>
      </Flow>
    </GuideLayout>
  )
}
