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
| Product pages (EHR, CRM, Outcomes, BlueIQ) | `app/src/data/products.ts` |
| Who-we-help role pages | `app/src/data/roles.ts` |
| Colors (light + dark tokens) | `app/src/styles.css` |
| Contact form endpoint | `FORM_ENDPOINT` in `app/src/pages/Demo.tsx` |

## Open items

- **Contact form endpoint is still a placeholder** (it was on the old site too, so the old
  demo form never delivered). Until it is set, the form opens a pre-filled email to
  `bpayne@bluestep.net` instead of failing.
- **Blueprint ($750) and Slate ($300) prices are pilot hypotheses** and are labeled
  "Pilot pricing" on the page.
- Brand name is `BlueStep Behavioral` pending the rebrand.
