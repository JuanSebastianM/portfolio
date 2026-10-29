# Project context

Personal site for Juan Sebastián Mendoza, front-end developer in Colombia. Public GitHub: [JuanSebastianM](https://github.com/JuanSebastianM). Bio on GitHub, snapshot 2026-10-28: “Software Developer specialized in Front End | TypeScript, React, AWS.”

The previous site was a single `index.html` plus `styles.css` and `main.js`. It pointed at `www.juanmendozadev.xyz` and, in meta tags, `juanmendoza.me`. Both of those domains are retired. This branch is the new site. Merging it is what replaces the live site. The old essay host is recorded only in `docs/DECISIONS.md`.

## What phase 1 includes

- Marketing pages: home, projects, blog index, post, category, tag, 404
- Nine local essays, with covers and inline images in `public/images/blog`
- Light is green and white. Dark is blue and garnet. One icon toggles them. No club crests.
- Claude - A to-scale pitch (`src/components/Pitch.astro`) in the hero and under the lineup
- Sveltia CMS shell at `/admin` (GitHub sign-in is not configured yet)
- Cloudflare Worker OAuth handler in `worker/index.ts` and `wrangler.jsonc`
- Placeholder experience, education, and bench skills

## Where things live

| Path | Role |
| --- | --- |
| `src/data/site.ts` | Canonical URL, name, social links, planned email |
| `src/data/profile.ts` | About, lineup, experience, education, certifications, featured |
| `src/data/projects.ts` | Repos and open-source notes from the 2026-10-28 GitHub snapshot |
| `src/content/blog` | Markdown essays |
| `src/lib/posts.ts` | Reading time, excerpts, tag-to-category map |
| `src/pages` | Routes |
| `src/islands` | React: theme, scroll reveal, tilt cards, lazy 3D ball |
| `public/admin` | Sveltia CMS |
| `worker/index.ts` | GitHub OAuth for the CMS |
| `scripts/localize-essays.mjs` | Re-download original cover images if `CONTENT_SRC` points at an export |
| `scripts/check-posts.mjs` | Claude - Runs after `astro build`; fails on raw markdown or dead in-page anchors in essays |
| `src/components/Pitch.astro` | Claude - The pitch SVG |
| `src/islands/PenaltyGame.tsx` | Claude - The penalty shootout on the hero |
| `src/components/PositionCard.astro` | Claude - The card a lineup player opens |
| `tests/smoke.spec.ts` | Claude - Playwright: visibility, ambience, copy email, essay rendering, title, penalty game, position cards |

## Content that is real

- About, headline, jobs, diploma, certifications, volunteering, and featured posts: public LinkedIn export, 2026-10-28. See `docs/DECISIONS.md`.
- Starting XI: LinkedIn where it names the skill, otherwise the previous site or a public repo. Git in goal is from the previous site.
- Projects on the site: LynStore and commentful only. Open source: Documenso and Help a Family pull requests. cal.com needs Juan’s input.
- Essays: nine local posts, 2021-10-05 through 2023-07-21
- Contact: copy button and mailto for hello@juansebastianmendoza.com

## Content that is not filled in

GoDaddy has no duty bullets. Prefectura has no URL. LynStore has no working GitHub repo in the snapshot. commentful’s README is still the starter text. Credential IDs are omitted on purpose. The college essay is not a diploma.

## Run and build

`npm run dev` serves the static app. `npm run build` writes `dist/` and then checks the essays (Claude - added 2026-10-29). `npm run cf:preview` builds and boots Wrangler, which is how `/auth` exists. Plain `astro dev` does not run the Worker. `/admin` still renders there.
