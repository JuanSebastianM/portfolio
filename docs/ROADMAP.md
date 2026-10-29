# Roadmap

## Grok - Phase 1 — Foundation, design, blog

Done on this branch.

- [x] Astro app, green/white theme, light and dark toggle
- [x] Home, projects, blog index, post, category, tag, 404, RSS, sitemap
- [x] Nine essays and their images stored in the repo
- [x] Sveltia at `/admin`, Worker OAuth handler, Wrangler config
- [x] `CNAME` removed
- [x] Placeholder experience, education, and bench skills
- [x] Project memory in `AGENTS.md` and `docs/`

## Grok - Phase 2 — LinkedIn content, polish, SEO

- [x] Replace experience, education, certifications, volunteering, about, and the bench from the LinkedIn export
- [x] Projects limited to LynStore and commentful
- [ ] Optional: generated Open Graph images per essay (covers are used today)
- [ ] Optional: pagination if the blog grows past a single index
- [ ] Pass a Lighthouse pass on the production URL after deploy

## Claude - Phase 2 follow-up (2026-10-29)

- [x] Pitch redrawn to scale, used in the hero, the lineup, and the page background
- [x] AI copy rewritten around Juan’s own list
- [x] Email copy works on HTTP and when the Clipboard API is refused
- [x] Essay images, links, and anchors render; build checks them
- [x] Screenshots removed from git
- [x] Claude - Penalty shootout on the hero pitch
- [x] Claude - Clickable lineup positions with a card per position
- [x] Claude - Employer name removed from the page title
- [ ] Juan reads the new AI and section copy and rewrites anything that does not sound like him

## Grok - Phase 3 — CMS enablement

- [ ] Create the GitHub OAuth app and set Worker secrets (`docs/CMS.md`)
- [ ] Only after this revamp is on `main`
- [ ] Juan publishes one test essay and deletes it

## Grok - Phase 4 — Cloudflare, domain, email

- [ ] `npm run cf:deploy` with Juan’s account (`docs/DEPLOY.md`)
- [ ] Register `juansebastianmendoza.com` on Cloudflare Registrar
- [ ] Attach the domain to the Worker
- [ ] Email Routing for `hello@juansebastianmendoza.com`
- [ ] Remove the “inbox is not live” note once mail works

## Grok - TODO(content)

Still unknown. Do not invent them.

1. **GoDaddy duties** — the export has titles and dates only. Do not write responsibilities.
2. **commentful** — unfinished. Do not add features the README does not describe. The README is still the create-next-app starter.
3. **LynStore code** — the live site is https://lynstore.netlify.app/. `JuanSebastianM/lynstore` did not resolve on 2026-10-28.
4. **Prefectura de Pichincha URL** — LinkedIn does not give one.
5. **BarranquillaJS recording** — no URL on the export. Featured points at the 2022 retro.
6. **cal.com** — needs Juan's input. The public fork has no pull request or commit authored by him on calcom/cal.diy. It is not shown as a contribution.
7. **Categories** — inferred from tags in `src/lib/posts.ts`, not chosen by Juan.
8. **Email** — `hello@juansebastianmendoza.com` is planned. Routing is not on.
9. **CMS secrets** — GitHub OAuth client id and secret are not set.
10. **Domain** — `juansebastianmendoza.com` is not registered.
11. Claude - **AI copy** — the framing in `ai` (`src/data/profile.ts`) is Claude’s suggestion. The tools and uses are Juan’s.
12. Claude - **Position “fit” lines** — the one-liners on each lineup card are Claude’s. Juan can rewrite them in `src/data/profile.ts`.
13. Claude - **Cloudflare** — no account is connected. Juan has to run `npx wrangler login` himself.
