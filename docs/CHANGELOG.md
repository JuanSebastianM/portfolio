# Changelog

## 2026-10-29 (third pass)

- Added by Claude: Authorship is marked only in this file and `docs/DECISIONS.md`: each entry starts with `Added by Grok: ` or `Added by Claude: `. Headings and every other doc are unprefixed.
- Added by Claude: Removed `scripts/localize-essays.mjs`. It was a one-time import from the old blog host, its images are already in `public/images`, and it read an old-site file that no longer exists.

## 2026-10-29 (second pass)

- Added by Claude: Added a penalty shootout (`src/islands/PenaltyGame.tsx`). “Take a penalty” on the hero pitch opens a penalty view with a crowd, a goal, and a keeper. Pick one of six spots, the keeper guesses, and it ends as a goal, a save, or off the post. Goals, shots, streak, and best streak are shown; best streak is kept in `localStorage`. Escape or the close button returns to the pitch. With motion off the shot resolves instantly.
- Added by Claude: Lineup players are buttons. Each opens a card with the position’s name, what that position does, and why the tool fits there. Bench players too. A “Tap a player…” hint sits above the pitch and the discs ripple a few times when the lineup lands.
- Added by Claude: The home page title is “Juan Sebastián Mendoza · Software Engineer”. No employer name (`identity.titleRole`).
- Added by Claude: Copy email hydrates on idle instead of on scroll, so an early click is not lost.
- Added by Claude: Reverted the first pass’s doc renames. Doc files keep their names.
- Added by Claude: Smoke tests for the title, the game, and the position cards.

## 2026-10-29

Added by Claude: Follow-up on `claude/portfolio-revamp-tasks-h5tp2q`, branched from `cursor/portfolio-v2-1d23` (PR #1).

- Added by Claude: Redrew the pitch. `src/components/Pitch.astro` is a full field at FIFA proportions (105 x 68): mowed stripes, halfway line, center circle, both penalty and goal areas, penalty spots and arcs, corner arcs, and goals with nets. The old version was a rounded box with a single line down the wrong axis.
- Added by Claude: The hero is that pitch in broadcast-camera perspective (portrait on desktop, landscape on phones) with a white ball on the center spot. The lineup sits on the same pitch as numbered discs with name plates. The faint page background uses the same markings.
- Added by Claude: Grass follows the mode: a day match in light mode, a floodlit night match in dark mode (`--grass`, `--grass-alt`, `--chalk`, `--floodlight`).
- Added by Claude: Rewrote the AI copy. The hero line is “I build with AI in the loop, from the first plan to the last refactor.” The card is “The assistant coach.” with the four models as chips and Juan’s six uses as Plan, Build, Debug, Learn, Automate, Write. “Grok Bot” is now “Grok”.
- Added by Claude: Tightened section copy: the lineup, career, and essays headings, and the about paragraph (it said “strong” twice).
- Added by Claude: Fixed the email copy button. It failed silently whenever `navigator.clipboard` was missing or refused, which is always the case on plain HTTP (for example `npm run dev` opened from a phone on the LAN IP). It now falls back to `execCommand('copy')` and says so if both are blocked.
- Added by Claude: Fixed essay rendering. 22 images used the old host’s `![](src align="center")` syntax and printed as text. A nested list in the career essay fell into a code block and showed raw `[link](url)`. The React Router essay’s table of contents and its source-code `<details>` blocks showed raw markdown and pointed at heading ids that no longer exist. A callout link had `pointer-events: none`.
- Added by Claude: Added `scripts/check-posts.mjs`. `npm run build` now fails if an essay shows raw markdown links or images, or links to a missing in-page anchor.
- Added by Claude: Styled essay callouts and `<details>` blocks.
- Added by Claude: Removed `docs/screenshots/` from git and ignored it. Smoke tests write screenshots to `test-results/`.
- Added by Claude: Added smoke tests for the copy button (normal and fallback) and for essay images and anchors.
- Added by Claude: Renamed the docs to `Claude - <NAME>.md`. Reverted in the second pass.

## 2026-10-28

Added by Grok: Phase 1 of the portfolio revamp, on `cursor/portfolio-v2-1d23`. The live site on `main` is unchanged until merge.

- Added by Grok: Replaced the static HTML/CSS/JS site with Astro, TypeScript, Tailwind v4, and React islands.
- Added by Grok: Removed `CNAME` (`www.juanmendozadev.xyz`). Canonical host is `juansebastianmendoza.com`.
- Added by Grok: Added Nacional and Barcelona palettes, light and dark, pitch lines, starting XI, season log, tilt cards, and an idle-loaded hero ball.
- Added by Grok: Imported nine essays. Covers and inline images are local WebP files.
- Added by Grok: Added category pages, tag pages, reading time, RSS, sitemap, and Shiki.
- Added by Grok: Added Sveltia CMS at `/admin` (`src/pages/admin.astro`) and a Cloudflare Worker OAuth handler. Not enabled and not deployed.
- Added by Grok: Left experience, education, and bench skills as explicit placeholders.

### Phase 2

- Added by Grok: Filled experience, education, certifications, volunteering, about, and the bench from the public LinkedIn profile.
- Added by Grok: GoDaddy rows stay title, dates, location, and the headline stack. No invented duties.
- Added by Grok: LynStore’s live link is the freelance site. AWS Cloud Practitioner is marked expired Nov 2025. Credential IDs are not shown.
- Added by Grok: Featured block: BarranquillaJS talk and the essays pinned on LinkedIn.
- Added by Grok: Removed the old publishing-platform name from the site, essays, feed, and metadata. A check script blocks it under `src/`.
- Added by Grok: Light is the green and white palette. Dark is blue and garnet. One sun/moon button switches them. No crests.
- Added by Grok: Projects are LynStore and commentful only. Open source lists cal.com, Documenso, and Help a Family as forks.
- Added by Grok: Added a Reduce motion control and optional synthetic stadium ambience, off until the visitor turns it on.
- Added by Grok: Lighthouse on the production build, 28 Oct 2026: mobile performance 99, accessibility 100, best practices 100, SEO 100. Desktop performance 100, accessibility 100, best practices 100, SEO 100.
- Added by Grok: Removed the build check that failed on the old publishing-platform name. Old posts may still contain it.
- Added by Grok: Public location is Colombia only.
- Added by Grok: Contact is copy-email plus mailto. The third-party form is gone.
- Added by Grok: Open source entries describe merged pull requests. cal.com is omitted until Juan confirms a contribution.
- Added by Grok: Added the AI block from Juan’s own notes.
- Added by Grok: Scroll sections stay visible if motion never finishes. Ambience is low-passed noise that actually reaches the speakers. The portrait is no longer on the site.
