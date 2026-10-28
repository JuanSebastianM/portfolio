# Juan Sebastián Mendoza

Portfolio for a front-end developer in Colombia. TypeScript, React, AWS. This branch is the new site. `main` is still the old static page until this is merged.

Canonical URL, not registered yet: <https://juansebastianmendoza.com>

There is no `CNAME`. `juanmendozadev.xyz` is retired.

## Run

```bash
npm install
npm run dev
```

Open <http://localhost:4321>.

| Path | Page |
| --- | --- |
| `/` | Home |
| `/projects` | Projects |
| `/blog` | Essays, search, category links |
| `/blog/understanding-hooks-usestate-and-useeffect-basics` | A post |
| `/blog/category/react` | Category |
| `/blog/tag/jest` | Tag |
| `/admin` | Sveltia CMS (UI only until OAuth secrets exist) |
| `/rss.xml` | Feed |

```bash
npm run check
npm run build
npm run preview
```

Deploy notes are in `docs/DEPLOY.md`. CMS setup is in `docs/CMS.md`. Do not deploy from this repo until Juan’s Cloudflare account is available.

## Stack

Astro, TypeScript, Tailwind CSS v4, React islands (Motion, and React Three Fiber for one hero ball). Blog posts are markdown in `src/content/blog`. Editing later is Sveltia with a Cloudflare OAuth Worker.

## For the next person or agent

Start at `AGENTS.md`. Placeholders for jobs, school, and extra skills are listed in `docs/ROADMAP.md` as `TODO(content)`. Do not fill them in from guesswork.
