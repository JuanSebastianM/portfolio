# Roadmap

## Phase 1 — Foundation, design, blog

Done on this branch.

- [x] Astro app, Nacional / Barcelona themes, light and dark
- [x] Home, projects, blog index, post, category, tag, 404, RSS, sitemap
- [x] Hashnode essays and images stored in the repo
- [x] Sveltia at `/admin`, Worker OAuth handler, Wrangler config
- [x] `CNAME` removed
- [x] Placeholder experience, education, and bench skills
- [x] Project memory in `AGENTS.md` and `docs/`

## Phase 2 — LinkedIn content, polish, SEO

- [ ] Replace every `TODO(content)` below with Juan’s real entries
- [ ] Juan reviews project blurbs, especially commentful and cal.com
- [ ] Optional: generated Open Graph images per essay (covers are used today)
- [ ] Optional: pagination if the blog grows past a single index
- [ ] Pass a Lighthouse pass on the production URL after deploy

## Phase 3 — CMS enablement

- [ ] Create the GitHub OAuth app and set Worker secrets (`docs/CMS.md`)
- [ ] Only after this revamp is on `main`
- [ ] Juan publishes one test essay and deletes it

## Phase 4 — Cloudflare, domain, email

- [ ] `npm run cf:deploy` with Juan’s account (`docs/DEPLOY.md`)
- [ ] Register `juansebastianmendoza.com` on Cloudflare Registrar
- [ ] Attach the domain to the Worker
- [ ] Email Routing for `hello@juansebastianmendoza.com`
- [ ] Remove the “inbox is not live” note once mail works

## TODO(content)

All of these are unknown. Do not invent them.

1. **Experience** — `src/data/profile.ts` `experience` slots 01–03. Employers, titles, and dates. LinkedIn was not readable.
2. **Education** — `education` slot. School, program, dates. The college-dropout essay is not a credential.
3. **Bench skills** — three `TODO(content)` subs under the starting XI. Levels and years are unknown. The XI itself is sourced and is not a placeholder.
4. **commentful blurb** — README is still the create-next-app text. The card uses public pull request titles. Juan should replace the summary when he wants a product description.
5. **cal.com** — public fork only. Confirm whether a merged contribution should be named.
6. **LynStore** — live Netlify URL from the old site. `JuanSebastianM/lynstore` did not resolve on 2026-10-28. Add a code link only if the repo exists.
7. **Categories** — inferred from tags in `src/lib/posts.ts`, not chosen by Juan. He can change the map or add a frontmatter field later.
8. **Email** — `hello@juansebastianmendoza.com` is the planned address. Routing is not on.
9. **CMS secrets** — GitHub OAuth client id and secret are not set. `/admin` loads; sign-in cannot finish.
10. **Domain** — `juansebastianmendoza.com` is not registered. Canonical URL only.
