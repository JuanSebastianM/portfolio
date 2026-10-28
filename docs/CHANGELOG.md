# Changelog

## 2026-10-28

Phase 1 of the portfolio revamp, on `cursor/portfolio-v2-1d23`. The live site on `main` is unchanged until merge.

- Replaced the static HTML/CSS/JS site with Astro, TypeScript, Tailwind v4, and React islands.
- Removed `CNAME` (`www.juanmendozadev.xyz`). Canonical host is `juansebastianmendoza.com`.
- Added Nacional and Barcelona palettes, light and dark, pitch lines, starting XI, season log, tilt cards, and an idle-loaded hero ball.
- Imported nine Hashnode essays. Covers and inline Hashnode images are local WebP files.
- Added category pages, tag pages, reading time, RSS, sitemap, and Shiki.
- Added Sveltia CMS at `/admin` (`src/pages/admin.astro`) and a Cloudflare Worker OAuth handler. Not enabled and not deployed.
- Left experience, education, and bench skills as explicit placeholders.
