# Project context

Personal site for Juan Sebastián Mendoza, front-end developer in Colombia. Public GitHub: [JuanSebastianM](https://github.com/JuanSebastianM). Bio on GitHub, snapshot 2026-10-28: “Software Developer specialized in Front End | TypeScript, React, AWS.”

The previous site was a single `index.html` plus `styles.css` and `main.js`. It pulled essays live from the Hashnode API and pointed at `www.juanmendozadev.xyz` and, in meta tags, `juanmendoza.me`. Both of those domains are retired. This branch is the new site. Merging it is what replaces the live site.

## What phase 1 includes

- Marketing pages: home, projects, blog index, post, category, tag, 404
- Nine Hashnode essays as local markdown, with covers and inline `cdn.hashnode.com` images stored in `public/images/blog`
- Theme switcher: Atlético Nacional or FC Barcelona, each in light and dark
- Sveltia CMS shell at `/admin` (GitHub sign-in is not configured yet)
- Cloudflare Worker OAuth handler in `worker/index.ts` and `wrangler.jsonc`
- Placeholder experience, education, and bench skills

## Where things live

| Path | Role |
| --- | --- |
| `src/data/site.ts` | Canonical URL, name, social links, planned email, Formspree action |
| `src/data/profile.ts` | About copy, starting XI, placeholders |
| `src/data/projects.ts` | Repos and open-source notes from the 2026-10-28 GitHub snapshot |
| `src/content/blog` | Markdown essays |
| `src/lib/posts.ts` | Reading time, excerpts, tag-to-category map |
| `src/pages` | Routes |
| `src/islands` | React: theme, scroll reveal, tilt cards, lazy 3D ball |
| `public/admin` | Sveltia CMS |
| `worker/index.ts` | GitHub OAuth for the CMS |
| `scripts/localize-hashnode.mjs` | Re-download Hashnode images if `CONTENT_SRC` points at an export |

## Content that is real

- About text: previous `index.html`, grammar tightened (see `docs/DECISIONS.md`)
- Skills in the starting XI: previous site, GitHub bio, or a public repo/README
- Projects: `repos.json` snapshot plus LynStore and Rock, Paper, Scissors links from the old homepage
- Essays: Hashnode export, 2021-10-05 through 2023-07-21
- Contact form: existing Formspree endpoint `xzbyoqde`
- Social URLs: the previous homepage

## Content that is not real

Experience, education, and the three bench skills are empty slots. The college essay is linked under “On the record.” It is not a résumé line.

LinkedIn (`/in/juan-sebastian-mendoza-perez`) returned nothing useful to this build. Do not scrape or guess it.

## Run and build

`npm run dev` serves the static app. `npm run build` writes `dist/`. `npm run cf:preview` builds and boots Wrangler, which is how `/auth` exists. Plain `astro dev` does not run the Worker. `/admin` still renders there.
