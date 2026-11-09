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

// Managing users area of the help center (/help/users). Unlisted: shared by
// link, never in the nav or footer, noindex. Screenshots are from the Summit
// Ridge Academy demo (configbehmodular), taken as a non-super administrator;
// the demo user is Maya Thompson (mayat).

const TOC: TocGroup[] = [
  { group: 'Getting around', items: [{ id: 'start', label: 'Where user management lives' }] },
  {
    group: 'Before you add anyone',
    items: [
      { id: 'roles', label: 'Set up roles' },
      { id: 'roles-levels', label: 'Access levels', sub: true },
      { id: 'roles-admin', label: 'Admin/Setup switches', sub: true },
    ],
  },
  {
    group: 'New staff',
    items: [
      { id: 'add', label: 'Add a new user' },
      { id: 'add-name', label: '1. Name and e-mail', sub: true },
      { id: 'add-profile', label: '2. Username and password', sub: true },
      { id: 'add-contact', label: '3. Contact information', sub: true },
      { id: 'add-employment', label: '4. Employment info', sub: true },
      { id: 'add-permissions', label: '5. Permissions', sub: true },
      { id: 'handoff', label: 'Give them their sign-in' },
      { id: 'first-login', label: 'Their first sign-in' },
    ],
  },
  {
    group: 'Existing staff',
    items: [
      { id: 'record', label: 'Find a staff record' },
      { id: 'employment', label: 'The Employment Info form' },
      { id: 'permissions', label: "Change someone's permissions" },
      { id: 'permissions-custom', label: 'Custom permissions', sub: true },
      { id: 'reset', label: 'Reset a password' },
      { id: 'leaving', label: 'When someone leaves' },
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
    title: 'Someone new is starting',
    links: [
      ['add', 'Add a new user'],
      ['handoff', 'Give them their sign-in'],
      ['first-login', 'What they see the first time'],
    ],
  },
  {
    title: 'Someone needs help',
    links: [
      ['reset', 'Reset a forgotten password'],
      ['permissions', 'Change what they can see'],
      ['leaving', 'Someone is leaving'],
    ],
  },
  {
    title: 'I set up access',
    links: [
      ['roles', 'Set up roles'],
      ['employment', 'The Employment Info form'],
      ['who', 'Who can do what'],
    ],
  },
]

export default function UsersGuide() {
  useTitle('Managing users')
  useNoIndex()

  return (
    <GuideLayout
      kicker="BlueStep Administration"
      title="Managing users"
      intro={
        <>
          How to add staff to BlueStep, give them the right access, and look after their accounts until the day they leave.
          The screenshots come from a demo facility, Summit Ridge Academy. The orange numbers on each picture match the
          numbered steps beside it.
        </>
      }
      paths={PATHS}
      toc={TOC}
      imgFolder="users-guide"
      footer="BlueStep · screenshots from the Summit Ridge Academy demo facility."
    >
      <Flow
        id="start"
        eyebrow="Getting around"
        title="Where user management lives"
        lede="Everything about staff accounts starts on the Users tab of Settings."
        who={<Who roles={['BlueStep administrator']}>Needs Manages Users</Who>}
      >
        <Shot
          src="settings-users"
          w={1240}
          h={717}
          alt="The Settings page with the Users tab open, showing Manage Staff, Add New Users, Role Permissions and Former Staff"
          caption="Settings → Users. Manage Providers is covered in its own guide."
        />
        <NSteps>
          <NStep n={1}>
            Click <U>Settings</U> in the top menu, then the <U>Users</U> tab.
          </NStep>
          <NStep n={2}>
            <U>Manage Staff</U> lists everyone currently working here. Open a person from here to change anything about them.
          </NStep>
          <NStep n={3}>
            <U>Add New Users</U> opens the five-step wizard that creates a new staff member and their sign-in.
          </NStep>
          <NStep n={4}>
            <U>Role Permissions</U> is where you build roles: sets of access you give to staff, like Therapist or Mentor.
          </NStep>
          <NStep n={5}>
            <U>Former Staff</U> lists people who no longer work here, and whether you'd rehire them.
          </NStep>
        </NSteps>
        <Note title="Good to know.">
          You only see the Users tab if your own permissions include <b>Manages Users</b> or <b>Setup/Settings Access</b>. See{' '}
          <To id="who">Who can do what</To>.
        </Note>
      </Flow>

      <Flow
        id="roles"
        eyebrow="Before you add anyone"
        title="Set up roles"
        lede="A role is a named set of access, like Therapist, Mentor or Administrator. Give each new person a role and they get everything that role allows."
        who={<Who roles={['BlueStep administrator']}>Needs Manages Users or Setup/Settings Access</Who>}
      >
        <p>
          Set your roles up first. Then adding a person is just picking their role, and changing what a whole team can do is one
          edit.
        </p>
        <Shot
          src="roles-list"
          w={1170}
          h={354}
          alt="The Setup: Roles list with Administrator, Mentor, Psychiatrist and Therapist"
          caption="Settings → Users → Role Permissions. Each row is one role."
        />
        <NSteps>
          <NStep n={1}>
            Click <U>New Entry</U> to make a new role.
          </NStep>
          <NStep n={2}>
            Or click the pencil on a row to change an existing role.
          </NStep>
        </NSteps>
        <Shot
          src="role-top"
          w={1170}
          h={720}
          alt="The Therapist role form, showing Role Details and the first Client Information settings"
          caption="The top of a role. Below Client Information come Clinical, Medical, Academics, Outcomes, Marketing/Admissions, BlueIQ, Reports/Resources and Admin/Setup."
        />
        <NSteps>
          <NStep n={1}>
            Give the role a clear <U>Role Name</U> and a short <U>Description</U> of who it's for. Leave it{' '}
            <U>Active</U>.
          </NStep>
          <NStep n={2}>
            Work down each section and choose the level for every area. Then click <U>Save</U> at the bottom.
          </NStep>
        </NSteps>
        <Tip title="Saving a role updates everyone on it.">
          When you save a role, every staff member using that role gets the new access straight away. You don't need to edit
          each person. People on <To id="permissions-custom">Custom</To> permissions are not touched.
        </Tip>

        <H3 id="roles-levels">Access levels</H3>
        <p>Most areas have four levels. Each level includes everything in the one before it.</p>
        <Table head={['Level', 'What it means']} minW={480}>
          <tr>
            <th scope="row">No Access</th>
            <td>The area is hidden. Its menus and tabs don't appear.</td>
          </tr>
          <tr>
            <th scope="row">Reader Access</th>
            <td>Can open and read, but not add or change anything.</td>
          </tr>
          <tr>
            <th scope="row">Author Access</th>
            <td>Can add new entries and edit their own.</td>
          </tr>
          <tr>
            <th scope="row">Editor Access</th>
            <td>Can add, and edit anyone's entries in that area.</td>
          </tr>
        </Table>
        <p>
          A few areas, such as <b>Chart &amp; Administer Meds</b>, <b>Enable File Access</b> and the BlueIQ tools, are a simple
          Yes or No. Reports/Resources uses checkboxes: tick each report or resource the role should see.
        </p>

        <H3 id="roles-admin">Admin/Setup switches</H3>
        <Shot
          src="role-admin"
          w={1170}
          h={367}
          alt="The Admin/Setup section of a role with five Yes/No switches"
          caption="The Admin/Setup section, at the bottom of every role. These are the powerful ones."
        />
        <ul>
          <li>
            <N inline>3</N> <b>Manages Users:</b> can add staff, set usernames and passwords, and open Manage Staff. Give this
            only to the people who set up accounts.
          </li>
          <li>
            <N inline>4</N> <b>Setup/Settings Access:</b> can open Settings and change how your facility is set up.
          </li>
          <li>
            <b>Unlock Signed Forms:</b> can unlock a signed note or form so it can be corrected.
          </li>
          <li>
            <b>View All Unsigned Notes:</b> sees everyone's unsigned notes, not just their own.
          </li>
          <li>
            <b>Delete Records:</b> can delete whole records. Most roles should have No.
          </li>
        </ul>
        <Note title="Before you retire a role.">
          Move everyone on it to another role first, then set the old one to <U>Inactive</U>. Don't delete a role people are
          still using.
        </Note>
      </Flow>

      <Flow
        id="add"
        eyebrow="New staff"
        title="Add a new user"
        lede="One wizard creates the person's staff record, their username and temporary password, and their access. It takes about two minutes."
        who={<Who roles={['BlueStep administrator']}>Needs Manages Users</Who>}
      >
        <p>
          Go to <U>Settings → Users → Add New Users</U>. The wizard has five steps. Click <U>Next</U> to move on and{' '}
          <U>Previous</U> to go back. Nothing is saved until you click <U>Save</U> on the last step. A red star marks the fields
          you must fill in.
        </p>

        <H3 id="add-name">Step 1: Name and e-mail</H3>
        <Shot
          src="wiz-1-name"
          w={1170}
          h={463}
          alt="Step 1 of the Add New Staff wizard with name, email and photo fields"
          caption="Step 1. Only first and last name are required."
        />
        <NSteps>
          <NStep n={1}>
            Type their <U>First Name</U> and <U>Last Name</U>. Add a <U>Preferred First Name</U> if they go by something else.
          </NStep>
          <NStep n={2}>
            Add their work <U>Email</U>. You can also add a photo, which shows on staff lists.
          </NStep>
        </NSteps>

        <H3 id="add-profile">Step 2: Username and password</H3>
        <Shot
          src="wiz-2-profile"
          w={1170}
          h={525}
          alt="Step 2 of the wizard with username, password and security question fields"
          caption="Step 2 is where the sign-in is created."
        />
        <NSteps>
          <NStep n={1}>
            Choose a <U>Username</U>. Keep a pattern your team can guess, like first name plus last initial (mayat).
          </NStep>
          <NStep n={2}>
            Type a <U>temporary password</U> in both password boxes. Write it down: you'll give it to them in a moment, and
            BlueStep won't show it again.
          </NStep>
          <NStep n={3}>
            Pick any security question and a placeholder answer. The new person replaces these with their own when they sign in.
          </NStep>
        </NSteps>
        <Note title="No username box?">
          The username and password fields only appear for people with <b>Manages Users</b>. See{' '}
          <To id="who">Who can do what</To>.
        </Note>

        <H3 id="add-contact">Step 3: Contact information</H3>
        <Shot
          src="wiz-3-contact"
          w={1170}
          h={901}
          narrow
          alt="Step 3 of the wizard with home address, phone numbers and mailing address"
          caption="Step 3 is all optional."
        />
        <p>
          Home address, phone numbers and mailing address. Everything here is optional, but a <N inline>1</N> cell phone is
          worth adding so the team can reach them.
        </p>

        <H3 id="add-employment">Step 4: Employment info</H3>
        <Shot
          src="wiz-4-employment"
          w={1170}
          h={533}
          alt="Step 4 of the wizard with employment status, date hired, employment type, department, supervisor and provider"
          caption="Step 4 starts the person's Employment Info form."
        />
        <NSteps>
          <NStep n={1}>
            Leave <U>Employment Status</U> on <U>Active Staff</U>.
          </NStep>
          <NStep n={2}>
            Fill in <U>Date Hired</U>, <U>Employment Type</U> (Full-Time, Part-Time or Contract) and <U>Department</U>. All
            three are required.
          </NStep>
          <NStep n={3}>
            Pick their <U>Supervisor</U> from your current staff.
          </NStep>
          <NStep n={4}>
            Set <U>Provider</U> to Yes if they're a clinician who should be listed as a provider.
          </NStep>
        </NSteps>

        <H3 id="add-permissions">Step 5: Permissions</H3>
        <Shot
          src="wiz-5-permissions"
          w={1170}
          h={307}
          alt="Step 5 of the wizard with Permission Type set to Role Based and the Therapist role selected"
          caption="Step 5. Most people should be Role Based."
        />
        <NSteps>
          <NStep n={1}>
            Leave <U>Permission Type</U> on <U>Role Based</U>.
          </NStep>
          <NStep n={2}>
            Choose their <U>Role</U>.
          </NStep>
          <NStep n={3}>
            Click <U>Save</U>. The person now appears on Manage Staff and can sign in.
          </NStep>
        </NSteps>
        <Tip title="Tip.">
          If nobody's role fits, pick the closest one now and fine-tune later with{' '}
          <To id="permissions-custom">Custom permissions</To>, or build a new role so the next hire is easier.
        </Tip>
      </Flow>

      <Flow
        id="handoff"
        eyebrow="New staff"
        title="Give them their sign-in"
        lede="BlueStep doesn't send a welcome email. The person who created the account tells the new user their username and temporary password."
      >
        <p>This is the whole workflow:</p>
        <ol className="plain">
          <li>You create the user and give them a temporary password.</li>
          <li>You let them know their username and temporary password yourself.</li>
          <li>They sign in for the first time, and BlueStep makes them choose their own password.</li>
        </ol>
        <p>Along with the username and password, send them:</p>
        <ul>
          <li>
            Your BlueStep web address, the one you use to sign in (for example <b>yourfacility.bluestep.net</b>).
          </li>
          <li>A note that they'll be asked to change the password the first time they sign in.</li>
        </ul>
        <Note title="Keep it private.">
          Tell them in person or by phone where you can. If you must write it down, send the username and the password
          separately, never together in one email or chat. The temporary password only works until they change it.
        </Note>
      </Flow>

      <Flow
        id="first-login"
        eyebrow="New staff"
        title="Their first sign-in"
        lede="Here's what the new person sees, so you can walk them through it."
      >
        <Shot
          src="login-username"
          w={1240}
          h={399}
          narrow
          alt="The BlueStep sign-in page asking for a username"
          caption="Signing in is two steps: username first, then password."
        />
        <ol className="plain">
          <li>
            They go to your BlueStep address, type their username and click <U>Next</U>.
          </li>
          <li>They type the temporary password and sign in.</li>
          <li>BlueStep takes them straight to their Online Profile to set their own password.</li>
        </ol>
        <Shot
          src="first-login-change"
          w={1170}
          h={534}
          alt="The Online Profile page with the message You are required to change your password"
          caption="The first time they sign in, BlueStep won't let them go anywhere else until they choose a new password."
        />
        <NSteps>
          <NStep n={1}>
            The red banner says <U>You are required to change your password.</U>
          </NStep>
          <NStep n={2}>
            They type a new password in both boxes. The meter shows how strong it is.
          </NStep>
          <NStep n={3}>
            They pick their own security question and answer. This is what lets them reset a forgotten password themselves
            later.
          </NStep>
          <NStep n={4}>
            They click <U>Save</U>. From now on, signing in takes them to their Home page.
          </NStep>
        </NSteps>
      </Flow>

      <Flow
        id="record"
        eyebrow="Existing staff"
        title="Find a staff record"
        lede="Every staff member has a record. That's where you change their details, access and password."
        who={<Who roles={['BlueStep administrator']}>Needs Manages Users</Who>}
      >
        <Shot
          src="staff-list"
          w={1170}
          h={389}
          alt="The All Staff list showing name, supervisor, department, date hired and email"
          caption="Settings → Users → Manage Staff. Click a column heading to sort."
        />
        <p>
          Open <U>Manage Staff</U> and click <U>Select</U> beside the <N inline>1</N> person you want.
        </p>
        <Shot
          src="record"
          w={1240}
          h={560}
          alt="Maya Thompson's staff record with the Record Profile and Employment menus and Record Settings"
          caption="A staff record opens on its summary."
        />
        <NSteps>
          <NStep n={1}>
            <U>Record Profile</U> holds their personal details: Name and E-mail, Demographics, Contact Information,{' '}
            <b>Online Profile</b> (username and password), Notification Settings and Files.
          </NStep>
          <NStep n={2}>
            <U>Employment</U> holds the work side: <b>Employment Info</b>, Credentials (licences and certifications, with
            expiry dates), <b>Permissions</b>, and email and Videra settings.
          </NStep>
          <NStep n={3}>
            <U>Record Settings</U> has record-level tools such as changing the unit they belong to.
          </NStep>
        </NSteps>
      </Flow>

      <Flow
        id="employment"
        eyebrow="Existing staff"
        title="The Employment Info form"
        lede="Employment Info is the person's job details. It also decides whether they're current staff."
      >
        <Shot
          src="employment"
          w={1170}
          h={725}
          alt="The Employment Info form for an active staff member"
          caption="Employment → Employment Info. Click Edit to change it."
        />
        <NSteps>
          <NStep n={1}>
            <U>Employment Status</U>: <b>Active Staff</b> can sign in and appear on staff lists. <b>Discharged Staff</b> can't
            (see <To id="leaving">When someone leaves</To>).
          </NStep>
          <NStep n={2}>
            <U>Supervisor</U>: who they report to.
          </NStep>
          <NStep n={3}>
            <U>Provider</U>: Yes for clinicians who provide care.
          </NStep>
        </NSteps>
        <p>
          <b>Date Hired</b>, <b>Employment Type</b> and <b>Department</b> are required and show on the Manage Staff list.
        </p>
      </Flow>

      <Flow
        id="permissions"
        eyebrow="Existing staff"
        title="Change someone's permissions"
        lede="To change what one person can see, change their role. To change what a whole team can see, change the role itself."
        who={<Who roles={['BlueStep administrator']}>Needs Manages Users</Who>}
      >
        <Shot
          src="permissions-role"
          w={1170}
          h={410}
          alt="A staff member's Permissions form set to Role Based with the Therapist role"
          caption="Employment → Permissions on the staff record."
        />
        <NSteps>
          <NStep n={1}>
            Open the person's record, then <U>Employment → Permissions</U> and click <U>Edit</U>. Check{' '}
            <U>Permission Type</U> is <U>Role Based</U>.
          </NStep>
          <NStep n={2}>
            Choose the new <U>Role</U> and click <U>Save</U>. Their access changes straight away.
          </NStep>
        </NSteps>

        <H3 id="permissions-custom">Custom permissions</H3>
        <p>
          Sometimes one person needs a little more or less than their role. Switch them to <b>Custom</b> and you can set each
          area for them alone.
        </p>
        <Shot
          src="perm-custom"
          w={1170}
          h={560}
          alt="The Permissions form set to Custom, showing every area with its own access level"
          caption="On Custom, every area from the role form appears on the person's own record."
        />
        <NSteps>
          <NStep n={1}>
            Set <U>Permission Type</U> to <U>Custom</U>. Their current role's settings are kept as the starting point.
          </NStep>
          <NStep n={2}>
            Change only the areas that need to be different, then click <U>Save</U>.
          </NStep>
        </NSteps>
        <Note title="Custom people don't follow role changes.">
          When you later improve a role, people on Custom keep their own settings. Use Custom sparingly, and switch people back
          to Role Based when the exception is no longer needed.
        </Note>
      </Flow>

      <Flow
        id="reset"
        eyebrow="Existing staff"
        title="Reset a password"
        lede="Staff can usually reset their own password. When they can't, you set a new temporary one."
        who={<Who roles={['BlueStep administrator']}>Needs Manages Users</Who>}
      >
        <p>
          <b>First, let them try themselves.</b> On the sign-in page, <U>Need Help Logging In?</U> asks their security question
          and emails them a reset link.
        </p>
        <p>If that doesn't work, reset it for them:</p>
        <Shot
          src="reset-password"
          w={1170}
          h={370}
          alt="A staff member's Online Profile in edit mode with new password fields"
          caption="Record Profile → Online Profile on the staff record."
        />
        <NSteps>
          <NStep n={1}>
            Open their record, then <U>Record Profile → Online Profile</U> and click <U>Edit</U>. Type a new temporary password
            in both boxes and click <U>Save</U>.
          </NStep>
        </NSteps>
        <p>
          Then tell them the temporary password the same way you would for a <To id="handoff">new user</To>. Next time they sign
          in, BlueStep makes them choose a new one, just like their <To id="first-login">first sign-in</To>.
        </p>
        <Tip title="Tip.">This is also how you fix a username typo: change the Username on the same form.</Tip>
      </Flow>

      <Flow
        id="leaving"
        eyebrow="Existing staff"
        title="When someone leaves"
        lede="Don't delete a staff member. Discharge them: their sign-in stops working and their history stays intact."
        who={<Who roles={['BlueStep administrator']}>Needs Manages Users</Who>}
      >
        <Shot
          src="discharge"
          w={1170}
          h={835}
          alt="The Employment Info form set to Discharged Staff with Last Day of Employment and the rehire question"
          caption="Employment → Employment Info, set to Discharged Staff."
        />
        <NSteps>
          <NStep n={1}>
            Open their record, then <U>Employment → Employment Info</U> and click <U>Edit</U>. Set <U>Employment Status</U> to{' '}
            <U>Discharged Staff</U>.
          </NStep>
          <NStep n={2}>
            Enter their <U>Last Day of Employment</U>.
          </NStep>
          <NStep n={3}>
            Answer <U>Would you rehire this employee?</U> and click <U>Save</U>.
          </NStep>
        </NSteps>
        <p>As soon as you save:</p>
        <ul>
          <li>They can't sign in. BlueStep tells them their user is inactive.</li>
          <li>They leave Manage Staff and move to Former Staff, with your rehire answer.</li>
          <li>Everything they wrote stays on the records, signed with their name.</li>
        </ul>
        <Note title="Coming back?">
          To rehire someone, open them from <U>Former Staff</U>, set Employment Status back to <U>Active Staff</U> and save. Their
          old username works again; <To id="reset">reset their password</To> if they've forgotten it.
        </Note>
      </Flow>

      <Flow
        id="who"
        eyebrow="Reference"
        title="Who can do what"
        lede="Two switches in the Admin/Setup section of a role decide who can manage staff accounts."
      >
        <Table head={['Task', 'Manages Users', 'Setup/Settings Access']}>
          <tr>
            <th scope="row">Open Settings</th>
            <td>Yes</td>
            <td>Yes</td>
          </tr>
          <tr>
            <th scope="row">Edit roles (Role Permissions)</th>
            <td>Yes</td>
            <td>Yes</td>
          </tr>
          <tr>
            <th scope="row">Open Manage Staff and staff records</th>
            <td>Yes</td>
            <td>No</td>
          </tr>
          <tr>
            <th scope="row">Create a username and password</th>
            <td>Yes</td>
            <td>No</td>
          </tr>
          <tr>
            <th scope="row">Reset passwords, change permissions, discharge</th>
            <td>Yes</td>
            <td>No</td>
          </tr>
        </Table>
        <p>
          Whoever adds new staff needs <b>Manages Users</b>. Because roles control everyone's access, treat both switches as
          administrator-only.
        </p>
        <Note title="Good to know.">
          With either switch on, a person can open all of Settings, including Role Permissions. Give them only to people you'd
          trust to change your facility's setup.
        </Note>
      </Flow>

      <Flow id="faq" eyebrow="Reference" title="Common questions">
        <div>
          <Faq q="Does BlueStep email new users their sign-in?">
            No. There's no automatic welcome email. Whoever creates the account tells the new person their username and
            temporary password, and they change it the first time they sign in.
          </Faq>
          <Faq q="I created a user but they can't sign in.">
            Check the username for typos on their Online Profile, and that Employment Status is Active Staff. If they've forgotten
            the temporary password, set a new one.
          </Faq>
          <Faq q="A new staff member can't see something they need.">
            Their role doesn't include it. Change their role, change the role itself if the whole team needs it, or switch just
            them to Custom.
          </Faq>
          <Faq q="I changed a role but one person didn't get the change.">
            They're on Custom permissions. Custom people keep their own settings. Switch them back to Role Based to follow the
            role again.
          </Faq>
          <Faq q="Can two people share a login?">
            No. Everything in BlueStep is signed with the name of the person signed in, so each person needs their own account.
          </Faq>
          <Faq q="Someone left. Should I delete their record?">
            No. Discharge them instead. That blocks their sign-in but keeps their history, and you can rehire them later with one change.
          </Faq>
          <Faq q="Why can't I see the username field in Add New Users?">
            Your role doesn't have Manages Users. Ask an administrator to add it, or to create the account for you.
          </Faq>
        </div>
      </Flow>
    </GuideLayout>
  )
}
