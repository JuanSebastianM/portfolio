# Agents

This is Juan Sebastián Mendoza’s portfolio (GitHub `JuanSebastianM`). Phase 1 replaced the static site on this branch. `main` still serves the old site until this branch is merged. Do not change `main` to “keep the live site working.”

Read these before editing:

1. `docs/PROJECT_CONTEXT.md` — what the product is and where things live
2. `docs/DECISIONS.md` — why the stack and content rules exist
3. `docs/DESIGN.md` — palettes, type, motion
4. `docs/ROADMAP.md` — what is done and every `TODO(content)`
5. `docs/CMS.md` and `docs/DEPLOY.md` — later phases, not done yet

## Rules

- English only.
- Do not invent employers, schools, dates, or skill levels. Unknowns stay as placeholders in `src/data/profile.ts` and get a `TODO(content)` line in `docs/ROADMAP.md`.
- Do not add a `CNAME`. The domain is `https://juansebastianmendoza.com` (`src/data/site.ts`). It is not registered.
- Do not deploy to Cloudflare and do not commit secrets. `.dev.vars` is local only.
- Blog posts keep the Hashnode frontmatter fields: `title`, `subtitle`, `date`, `slug`, `tags`, `coverImage`.
- Categories are derived in `src/lib/posts.ts`. Do not treat that map as something Juan wrote.
- Club colors are fan palettes. Do not add official crests or trademarks.
- Respect `prefers-reduced-motion`. The 3D ball stays off for reduced motion, narrow screens, and Save-Data.

## Commands

```bash
npm install
npm run dev      # http://localhost:4321
npm run check
npm run build
npm run preview
```

Update `docs/CHANGELOG.md` and `docs/DECISIONS.md` when a choice or a meaningful change lands.
