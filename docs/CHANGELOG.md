# Changelog

## 2026-10-28

Phase 1 of the portfolio revamp, on `cursor/portfolio-v2-1d23`. The live site on `main` is unchanged until merge.

- Replaced the static HTML/CSS/JS site with Astro, TypeScript, Tailwind v4, and React islands.
- Removed `CNAME` (`www.juanmendozadev.xyz`). Canonical host is `juansebastianmendoza.com`.
- Added Nacional and Barcelona palettes, light and dark, pitch lines, starting XI, season log, tilt cards, and an idle-loaded hero ball.
- Imported nine essays. Covers and inline images are local WebP files.
- Added category pages, tag pages, reading time, RSS, sitemap, and Shiki.
- Added Sveltia CMS at `/admin` (`src/pages/admin.astro`) and a Cloudflare Worker OAuth handler. Not enabled and not deployed.
- Left experience, education, and bench skills as explicit placeholders.

### Phase 2

- Filled experience, education, certifications, volunteering, about, and the bench from the public LinkedIn profile.
- GoDaddy rows stay title, dates, location, and the headline stack. No invented duties.
- LynStore’s live link is the freelance site. AWS Cloud Practitioner is marked expired Nov 2025. Credential IDs are not shown.
- Featured block: BarranquillaJS talk and the essays pinned on LinkedIn.
- Removed the old publishing-platform name from the site, essays, feed, and metadata. A check script blocks it under `src/`.
- Light is the green and white palette. Dark is blue and garnet. One sun/moon button switches them. No crests.
- Projects are LynStore and commentful only. Open source lists cal.com, Documenso, and Help a Family as forks.
- Added a Reduce motion control and optional synthetic stadium ambience, off until the visitor turns it on.
- Lighthouse on the production build, 28 Oct 2026: mobile performance 99, accessibility 100, best practices 100, SEO 100. Desktop performance 100, accessibility 100, best practices 100, SEO 100.
- Removed the build check that failed on the old publishing-platform name. Old posts may still contain it.
- Public location is Colombia only.
- Contact is copy-email plus mailto. The third-party form is gone.
- Open source entries describe merged pull requests. cal.com is omitted until Juan confirms a contribution.
- Added the AI block from Juan’s own notes.
- Scroll sections stay visible if motion never finishes. Ambience is low-passed noise that actually reaches the speakers. The portrait is no longer on the site.
