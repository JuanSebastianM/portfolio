# Decisions

## Grok - 2026-10-28

### Grok - Stack

The brief floated Next.js. The build uses the stack already agreed with Juan. One line each:

- **Astro** — static HTML first, so the blog and chrome ship without a React app shell.
- **TypeScript** — Juan’s public focus, and it types the profile and content schema.
- **Tailwind CSS v4** — utility layout, with club palettes as runtime CSS variables (`@theme inline`), not a rebuilt stylesheet per theme.
- **React islands** — only the theme switcher, scroll reveals, tilt cards, and the ball hydrate.
- **Motion** — scroll reveals and pointer tilt. Native view-timeline is used only for the reading progress bar, which is a single CSS effect.
- **React Three Fiber / Three.js** — one idle-loaded ball on the hero. It does not load on small screens, `prefers-reduced-motion`, or Save-Data. A full WebGL page would fight the performance goal.
- **Astro content collections** — the existing markdown already has the schema we need. A database CMS would fight “publish from git.”

### Grok - Hosting

Cloudflare Workers static assets, one Worker. The Worker only runs for `/auth`, `/callback`, and `/oauth/*`. Everything else is the Astro `dist/` directory. Pages would also work; one Wrangler config keeps the site and the OAuth handler together. Not deployed. Juan’s Cloudflare login comes later.

`build.format` is `file` and Wrangler’s `html_handling` is `drop-trailing-slash`, so canonical URLs have no trailing slash.

### Grok - Domain and email

Canonical URL: `https://juansebastianmendoza.com` (`src/data/site.ts`). Not registered. No `CNAME` file.

`juanmendozadev.xyz` and the old meta host `juanmendoza.me` are dropped.

Public address `hello@juansebastianmendoza.com` via Cloudflare Email Routing later. The site says the inbox is not live. Contact is a copy button and a mailto link. The old Formspree form was removed.

### Grok - Language

English only. Phase 1 used the old homepage about text, with grammar tightened. Phase 2 replaces that about with the LinkedIn about, also lightly edited and not extended. The hero line is the LinkedIn headline, “Software Engineer / AI @GoDaddy”. The GitHub bio string remains in `src/data/site.ts` and is no longer the hero.

### Grok - CMS

Sveltia CMS at `/admin`, GitHub backend, pinned build `@sveltia/cms@0.253.1` committed at `public/admin/sveltia-cms.js` so the editor does not depend on a CDN at runtime. Chosen over Decap/Tina because the brief’s later instruction was Sveltia, it is a git-based visual editor, and it speaks the same OAuth postMessage protocol as Sveltia CMS Authenticator.

Publishing commits to `main`. Do not sign in until this revamp is on `main`, or those commits land on the old site. OAuth is implemented but secrets are unset. See `docs/CMS.md`.

`auth_scope` is `public_repo` because the portfolio repository is public.

### Grok - Blog

Content collection, existing frontmatter, no extra required fields. Category pages come from `src/lib/posts.ts` (first matching tag wins). Tag pages are one route per tag. Reading time is 220 words per minute. RSS is `/rss.xml`. Shiki uses `github-light` and `github-dark`, switched with `data-mode`. Essay images are local WebP files in `public/images/blog` (max width 1600, quality 78). The old host name was removed later; see “Publishing platform name removed” below.

### Grok - Theme and design

Two fan palettes, Atlético Nacional (green and white) and FC Barcelona (blue and garnet), each with light and dark. Default is Nacional and, when there is no saved choice, the OS color scheme. No official crests. Pitch lines, a starting XI, a season-log timeline, tilt on project cards, and scroll reveal are the soccer language. Details and hex values are in `docs/DESIGN.md`.

### Grok - Projects copy

Blurbs state only what the GitHub snapshot, pull request titles, or the old homepage already said. `commentful`’s README is still the create-next-app starter, so its card is summarized from public pull request titles. `cal.com` is described as a public fork. A merged upstream pull request was not in the 2026-10-28 search. LynStore’s old GitHub URL did not resolve; the Netlify link stays.

### Grok - What phase 1 did not do

- No live deploy, no domain registration, no email routing.
- No LinkedIn import yet.
- No guessed employers or school.

## Grok - 2026-10-28 — Phase 2 content

The public LinkedIn export is now the source for about, experience, education, certifications, volunteering, and the bench.

- **Headline** on the hero is “Software Engineer / AI @GoDaddy”. The public location is Colombia. The profile export named a city; Juan asked that the site show only the country.
- **GoDaddy** is two rows: Senior Software Engineer (Apr 2026–present) and Software Engineer II (May 2024–Apr 2026), remote, Colombia. LinkedIn has no bullets, so the rows say that and name the headline stack (React, TypeScript, AWS, Node.js) as a stack, not as duties.
- **Devsu** (Jan 2022–Mar 2024) keeps his bullets, including the 100% coverage claim, plus Prefectura de Pichincha and Certificado de tradición y libertad. Kushki’s URL is labeled as the company, not the private app. Prefectura has no public URL.
- **Freelance** (Oct 2021–Jan 2022) points at https://lynstore.netlify.app/. The missing GitHub repo stays a TODO.
- **Education** is the Simón Araújo high school diploma (Feb 2011–Nov 2016) only. The college essay stays linked and is not treated as a credential.
- **AWS Cloud Practitioner** is shown as expired Nov 2025. No credential IDs anywhere.
- **Bench** is Accessibility, Redux, and Responsive Web Design. SASS is on the LinkedIn list and is left off so the bench stays three. The starting XI is unchanged, including Git in goal, because that name was already sourced and LinkedIn did not replace it.
- **Volunteering** is Margarita Humanitarian Foundation, Oct 2021, linked to the helpafamily repository.
- **Featured** is the BarranquillaJS talk (via the 2022 retro, because LinkedIn has no recording URL) and the four essays he pinned.
- **About** is his LinkedIn about, grammar only. The old soccer sentence is no longer the quote.

### Grok - Publishing platform name removed

The essays were first written on Hashnode. The site no longer promotes that name. Juan asked that the build not fail if the word remains in old posts, so the check script was removed. Platform-only tags (`programming-blogs`, `debuggingfeb`, `devretro2022`, `hacktoberfest-1`) were removed. Topical tags stayed. `hacktoberfest-1` became `hacktoberfest`.

### Grok - Light and dark are the two palettes

Juan confirmed both palettes, but not as text tabs. Light is the green and white palette. Dark is the deep blue and garnet palette. One sun/moon button switches them, follows `prefers-color-scheme` on the first visit, and remembers the choice. Club crests and logos are trademarks, so they are not used. The soccer identity is color, pitch lines, the formation, and motion.

### Grok - Projects and open source

The Projects section is only LynStore (https://lynstore.netlify.app/, React and styled-components, Oct 2021–Jan 2022) and commentful, labeled an unfinished prototype. The public README is still the create-next-app starter, so the card does not list product features. Devsu’s two client apps stay in Experience. Margarita is not a job. It appears only under Open source contributions, as volunteering, with the merged Help a Family pull requests. Documenso is the merged pricing-container pull request. cal.com is a public fork only: no pull request or commit by Juan showed up on calcom/cal.diy or elsewhere in that org, so it is not listed on the site.

### Grok - Motion and sound

`data-motion` is the single switch for animation. It defaults from `prefers-reduced-motion`, is saved in `localStorage`, and is a visible “Reduce motion” control. Off removes the scroll ball, the load bounce, pitch draw-in, lineup slide, net ripple, confetti, scroll reveals, and the 3D ball. Decorative motion uses transform and opacity. The scroll ball and pitch draw use CSS scroll or one-shot keyframes, not a second animation frame loop. The 3D ball is the only continuous frame loop, and it stops when the tab is hidden or motion is off.

Stadium ambience is generated in the browser with the Web Audio API: a short loop of filtered noise shaped in code, with a slow filter wobble. There is no audio file and no recording. It is original to this repository, so no club anthem, chant, or broadcast is used. It is off until the visitor presses the speaker button, then fades in. Volume is a separate slider and is remembered. A later visit does not start audio by itself. Sound does not follow the motion switch.

### Grok - Visibility and sound

Scroll sections no longer start at opacity 0. Motion can nudge them, but the first HTML is readable with JavaScript off or if an animation never finishes. The old pitch-line dash offset is only inside the animation keyframes, so a missed animation cannot leave the lines (or the page) blank.

The first ambience attempt used brown noise through a narrow band-pass. Almost all of that energy sits below the filter, so the speaker button produced silence. It now resumes the audio context on the click, then plays looped white noise through a low-pass, faded in to a default gain of about 0.3. A Playwright check reads an AnalyserNode and requires a non-zero level.

The portrait is gone from the hero, the metadata image, and the repo. The hero’s right side is a pitch with the 3D ball on wide screens and a flat ball on small screens.

### Grok - AI copy

Juan said he uses Claude, Grok Bot, Gemini, and ChatGPT, and that he uses AI for writing and refactoring code, debugging and understanding code, planning and architecture, learning new tech, automating tasks and building bots, and writing docs and content. The tone he asked for is enthusiastic: “I love building with AI.” That sentence is the hero line. The AI block lists the tools and those uses. Nothing else was added. The strings live in `src/data/profile.ts` as `ai`. Superseded on 2026-10-29, see below.

## Claude - 2026-10-29

### A pitch that reads as a pitch

Juan said the field did not look like a soccer field. It was a rounded rectangle with one line down the long axis and a circle, which reads as a tablet or a court. `Pitch.astro` now draws every marking to scale from FIFA dimensions (1 SVG unit = 10 cm), on striped grass, with goals. It is plain SVG, so it costs no JavaScript and no image request. The hero tilts it with a CSS `rotateX`, which is static and not gated by `data-motion`.

Grass is real grass colors, not the club accent, because a pitch tinted garnet or blue stops looking like a pitch. The club identity moved onto the players (accent discs) and the floodlight tint in dark mode.

### AI copy, second pass

Juan asked for AI copy that sounds less childish. “I love building with AI.” and “for everything” read as hype without information. The rewrite keeps his facts (the four tools and the six uses) and only changes the framing: a concrete hero line, a soccer metaphor for the card (“The assistant coach.”), and the uses as short verbs. “Grok Bot” became “Grok”, the product name. Nothing about how he uses AI was added beyond his list. He should still read it and change any line that does not sound like him.

### Clipboard

`navigator.clipboard` only exists in secure contexts, and the copy button returned early with no message when it was missing or refused. The fallback is a hidden textarea and `document.execCommand('copy')`, which is deprecated but still supported and works inside a click. If both fail the button says so, and the mailto link is still there.

### Essays are standard markdown

The essays came from a host with its own markdown extensions. Astro uses CommonMark, so the sources were normalized: no `align` on images, HTML blocks indented into the list item they belong to, and tables of contents written as HTML links to the ids Astro generates. `scripts/check-posts.mjs` runs after every build so a CMS edit cannot silently reintroduce raw markdown.

### Screenshots stay out of git

Juan does not want screenshots committed. `docs/screenshots/` is ignored and the smoke tests write to `test-results/`. The files are still in the history of `cursor/portfolio-v2-1d23`; squash-merging PR #1 keeps them out of `main`.

### Doc names

Juan wants every doc update an agent makes to start with that agent’s name, so the next agent knows who wrote it. Sections Claude adds are headed `Claude - ...` and single lines start with `Claude - `. File names and doc titles do not change. A first pass renamed the files by mistake; the second pass reverted that. Juan then confirmed that the docs that existed before were written by Grok, so their headings and opening paragraphs are now marked `Grok - `. A heading’s prefix covers everything under it unless a line carries its own prefix.

### Cloudflare

Nothing is deployed. There is no Cloudflare account or token in this repo or in the agent’s environment, so an agent cannot create the Worker, buy the domain, or turn on Email Routing. Juan runs `npx wrangler login` once and follows `docs/DEPLOY.md`.

## Claude - 2026-10-29 (second pass)

### A game on the pitch

Juan asked for something playable that brings some joy. A penalty shootout fits the hero because it is one click to start, one click per shot, and done in seconds. It is a React island that loads when the hero is visible. It is SVG with CSS transitions, not a canvas or a physics engine, so it adds no dependency and no frame loop. Odds are rough on purpose: the keeper guesses left 38%, center 24%, right 38%; a matching side and height is a save, and a matching side at the other height is a save 35% of the time. Top-corner shots hit the post 12% of the time. That lands around three goals in four.

`data-motion="off"` does not hide the game. The ball and keeper jump straight to where they end up, and the result shows at once. The game never makes sound.

### Clickable positions

Each lineup player opens a card. The position text is general soccer knowledge. The “fit” line is a light metaphor about the tool (Git in goal: “Every mistake can be undone from here.”), not a claim about how good Juan is with it. Both live in `src/data/profile.ts` (`positions` and each skill’s `fit`). It is plain buttons and a small inline script, not a React island. A dashed hint above the pitch and a few rings on the discs show that they can be clicked.

### Title

Juan does not want the employer name in the page title. The title uses `identity.titleRole` (“Software Engineer”). The hero headline and the career section still name GoDaddy.
