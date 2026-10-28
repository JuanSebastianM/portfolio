# Decisions

## 2026-10-28

### Stack

The brief floated Next.js. The build uses the stack already agreed with Juan. One line each:

- **Astro** — static HTML first, so the blog and chrome ship without a React app shell.
- **TypeScript** — Juan’s public focus, and it types the profile and content schema.
- **Tailwind CSS v4** — utility layout, with club palettes as runtime CSS variables (`@theme inline`), not a rebuilt stylesheet per theme.
- **React islands** — only the theme switcher, scroll reveals, tilt cards, and the ball hydrate.
- **Motion** — scroll reveals and pointer tilt. Native view-timeline is used only for the reading progress bar, which is a single CSS effect.
- **React Three Fiber / Three.js** — one idle-loaded ball on the hero. It does not load on small screens, `prefers-reduced-motion`, or Save-Data. A full WebGL page would fight the performance goal.
- **Astro content collections** — the Hashnode markdown already has the schema we need. A database CMS would fight “publish from git.”

### Hosting

Cloudflare Workers static assets, one Worker. The Worker only runs for `/auth`, `/callback`, and `/oauth/*`. Everything else is the Astro `dist/` directory. Pages would also work; one Wrangler config keeps the site and the OAuth handler together. Not deployed. Juan’s Cloudflare login comes later.

`build.format` is `file` and Wrangler’s `html_handling` is `drop-trailing-slash`, so canonical URLs have no trailing slash.

### Domain and email

Canonical URL: `https://juansebastianmendoza.com` (`src/data/site.ts`). Not registered. No `CNAME` file.

`juanmendozadev.xyz` and the old meta host `juanmendoza.me` are dropped.

Public address `hello@juansebastianmendoza.com` via Cloudflare Email Routing later. The site says the inbox is not live. The working contact path is still the old Formspree form.

### Language

English only. The about copy is the old homepage text with grammar edited (“team working” → “teamwork”, and the learning sentence split). Meaning is unchanged. The hero one-liner is the GitHub bio, verbatim aside from punctuation around the list.

### CMS

Sveltia CMS at `/admin`, GitHub backend, pinned build `@sveltia/cms@0.253.1` committed at `public/admin/sveltia-cms.js` so the editor does not depend on a CDN at runtime. Chosen over Decap/Tina because the brief’s later instruction was Sveltia, it is a git-based visual editor, and it speaks the same OAuth postMessage protocol as Sveltia CMS Authenticator.

Publishing commits to `main`. Do not sign in until this revamp is on `main`, or those commits land on the old site. OAuth is implemented but secrets are unset. See `docs/CMS.md`.

`auth_scope` is `public_repo` because the portfolio repository is public.

### Blog

Content collection, existing frontmatter, no extra required fields. Category pages come from `src/lib/posts.ts` (first matching tag wins). Tag pages are one route per tag. Reading time is 220 words per minute. RSS is `/rss.xml`. Shiki uses `github-light` and `github-dark`, switched with `data-mode`. Hashnode `%[url]` embeds are links. Images from `cdn.hashnode.com` are WebP in `public/images/blog` (max width 1600, quality 78).

### Theme and design

Two fan palettes, Atlético Nacional (green and white) and FC Barcelona (blue and garnet), each with light and dark. Default is Nacional and, when there is no saved choice, the OS color scheme. No official crests. Pitch lines, a starting XI, a season-log timeline, tilt on project cards, and scroll reveal are the soccer language. Details and hex values are in `docs/DESIGN.md`.

### Projects copy

Blurbs state only what the GitHub snapshot, pull request titles, or the old homepage already said. `commentful`’s README is still the create-next-app starter, so its card is summarized from public pull request titles. `cal.com` is described as a public fork. A merged upstream pull request was not in the 2026-10-28 search. LynStore’s old GitHub URL did not resolve; the Netlify link stays.

### What we did not do

- No live deploy, no domain registration, no email routing.
- No LinkedIn import.
- No new claims about employers or school.
