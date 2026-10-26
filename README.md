# Bluestep Behavioral Website

The official BlueStep Behavioral marketing site, BlueStep-branded. It was forked from
`bpayneBluestep/behavioral-website` at `e0022c9`, the last commit before that repo was
rebranded to Attune Health; the brand test continues there. This site is an AI-first rebuild around the builder strategy
(Blueprint, Slate, Full-service, and a curated behavioral health marketplace).

Static SPA deployed as a BlueStep GitSite at `https://behavioral.bluestep.net/` (formerly `behavioralbluestep.bluestep.net`).
Vite + React 18 + React Router + Tailwind 3. Same layout as `cobalt-gitsite`:
source lives in `app/`, and the **committed build output at the repo root** (`index.html`,
`assets/`, `images/`, `favicon.png`) is what GitSite serves. There is no server-side build.

## Routes at the root, assets under `/spa/`

GitSite serves this app's `index.html` for every extensionless route, and streams real
files only under `/spa/`. So:

- Routes have no prefix: `/pricing`, `/marketplace`, `/build`. Deep links work.
- Vite's `base` is `/spa/` for the build only. Never use it as a router basename.
- Public images go through `asset()` in `app/src/ui.tsx`.

The previous site was a Next.js multi-page export. GitSite never serves those per-route
HTML files, so every deep link (e.g. `/spa/pricing/`) rendered the homepage. That is why
this rebuild is a client-routed SPA.

Every URL from the previous site still works (`/demo`, `/products/*`, `/for-*`); `/values`
and short aliases redirect. See `REDIRECTS` in `app/src/App.tsx`.

## Develop and deploy

```bash
npm install
npm run dev        # http://localhost:5173, routes match production
npm run build      # cleans old artifact, typechecks, builds to repo root
git add -A && git commit -m "Deploy: <what changed>" && git push
```

On push to `main` the GitSite webhook pulls. Verify by fetching the live `index.html` and
checking the `assets/index-*.js` hash matches the repo, not by webhook status.

## Where things live

| What | File |
|---|---|
| Brand name, nav, CTA labels (rebrand = edit here) | `app/src/site.ts` |
| Plans and prices (Blueprint/Slate are pilot numbers) | `app/src/data/pricing.ts` |
| Marketplace listings | `app/src/data/marketplace.ts` |
| Product pages (EHR, CRM, Outcomes, Academics, BlueIQ) | `app/src/data/products.ts` |
| Who-we-help role pages | `app/src/data/roles.ts` |
| Colors (light + dark tokens) | `app/src/styles.css` |
| Contact form endpoint | `FORM_ENDPOINT` in `app/src/pages/Demo.tsx` |

## Open items

- **Pre-launch password gate** (`app/src/components/SiteGate.tsx`, added 2026-10-26) plus a `noindex` meta in `app/index.html`. A courtesy lock only: the bundle is public. Remove both at launch.
- **Contact form endpoint is still a placeholder** (it was on the old site too, so the old
  demo form never delivered). Until it is set, the form opens a pre-filled email to
  `bpayne@bluestep.net` instead of failing.
- **Blueprint ($750) and Slate ($300) prices are pilot hypotheses** and are labeled
  "Pilot pricing" on the page.
- Brand name is `BlueStep Behavioral` pending the rebrand.

## Photo credits

Hero photos in `app/public/images/heroes/` are from [Pexels](https://www.pexels.com/license/) (free for
commercial use, no attribution required). Each photo is used once on the site; check this list before reusing one.

| File | Used on | Source |
| --- | --- | --- |
| `teen-session.jpg` | Home, Full-service panel | [pexels 23496574](https://www.pexels.com/photo/23496574/) |
| `builder-cafe.jpg` | Home, Build panel | [pexels 12662813](https://www.pexels.com/photo/12662813/) |
| `about.jpg` | Home, "We know how programs run" | Likely Pexels; carried over, source not recorded |
| `team-discussion.jpg` | About | [pexels 7495644](https://www.pexels.com/photo/7495644/) |
| `team-onboarding.jpg` | Full-service hero | [pexels 7792868](https://www.pexels.com/photo/7792868/) |
| `team-building.jpg` | Full-service, Concierge | [pexels 7793988](https://www.pexels.com/photo/7793988/) |
| `planning-board.jpg` | Slate | [pexels 8837731](https://www.pexels.com/photo/8837731/) |
| `referral-call.jpg` | Program Directory | [pexels 7605974](https://www.pexels.com/photo/7605974/) |
| `video-call.jpg` | Demo | [pexels 4226256](https://www.pexels.com/photo/4226256/) |
| `homepage.jpg` | EHR product page | Likely Pexels; carried over, source not recorded |
| `admissions-call.jpg` | CRM product page | [pexels 8204396](https://www.pexels.com/photo/8204396/) |
| `for-executives.jpg` | Outcomes product page | Likely Pexels; carried over, source not recorded |
| `reviewing-draft.jpg` | BlueIQ product page | [pexels 8111853](https://www.pexels.com/photo/8111853/) |
| `for-clinicians.jpg` | For clinicians | Likely Pexels; carried over, source not recorded |
| `nurse-station.jpg` | For nurses | [pexels 6129594](https://www.pexels.com/photo/6129594/) |
| `for-admissions.jpg` | For admissions | Likely Pexels; carried over, source not recorded |
| `leadership-table.jpg` | For executives | [pexels 7414038](https://www.pexels.com/photo/7414038/) |
| `teen-consult.jpg` | For referring professionals | [pexels 4100661](https://www.pexels.com/photo/4100661/) |
| `classroom.jpg` | Academics product page | [pexels 8419491](https://www.pexels.com/photo/8419491/) |
| `for-teachers.jpg` | For teachers | [pexels 8617736](https://www.pexels.com/photo/8617736/) |

### Product screenshots

`app/public/images/consultant-crm/` holds screenshots of the real Consultant CRM (`ec-crm-gitsite`) on the `/products/consultant-crm` page. They were taken with the app running locally against a stubbed backend, so every family, program, practice, and consultant in them is invented. There is no real client data in any of them. To retake them, serve the built app and intercept `/b/maestro`, `/b/blueiq`, and `/b/agreementSign` with fictional data.

`app/public/images/academics/` holds screenshots of Academics on configbehmodular (summitridge.bluestep.net), cropped from the 2026-10-25 QA walk. **They are temporary.** The dev dataset uses real athletes' names and the term is labeled "(TEST)". Replace them with a screenshot-only dataset of invented students (Brandon, 2026-10-26: "we'll replace it with better demo data later"). Never use the student-record shots: those show real athletes' photos.
