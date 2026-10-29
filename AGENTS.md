# Agents

This is Juan Sebastián Mendoza’s portfolio (GitHub `JuanSebastianM`). Phase 1 replaced the static site on this branch. `main` still serves the old site until this branch is merged. Do not change `main` to “keep the live site working.”

Read these before editing:

1. `docs/Claude - PROJECT_CONTEXT.md` — what the product is and where things live
2. `docs/Claude - DECISIONS.md` — why the stack and content rules exist
3. `docs/Claude - DESIGN.md` — palettes, type, motion
4. `docs/Claude - ROADMAP.md` — what is done and every `TODO(content)`
5. `docs/Claude - CMS.md` and `docs/Claude - DEPLOY.md` — later phases, not done yet

## Rules

- English only.
- Do not invent employers, schools, dates, or skill levels. Unknowns stay as placeholders in `src/data/profile.ts` and get a `TODO(content)` line in `docs/Claude - ROADMAP.md`.
- Do not add a `CNAME`. The domain is `https://juansebastianmendoza.com` (`src/data/site.ts`). It is not registered.
- Do not deploy to Cloudflare and do not commit secrets. `.dev.vars` is local only.
- Blog posts use frontmatter `title`, `subtitle`, `date`, `slug`, `tags`, `coverImage`. Do not put the old publishing-platform name anywhere under `src/`. `npm run check` fails if that string appears.
- Light is the green/white palette. Dark is blue/garnet. Do not add club crests or text tabs for clubs.
- `data-motion` gates animation. Do not autoplay sound. Ambience is the synthetic Web Audio loop in `HeaderTools.tsx`.
- The projects page lists LynStore and commentful only.
- Categories are derived in `src/lib/posts.ts`. Do not treat that map as something Juan wrote.
- Club colors are fan palettes. Do not add official crests or trademarks.
- Respect `prefers-reduced-motion`. The 3D ball stays off for reduced motion, narrow screens, and Save-Data.
- The pitch is `src/components/Pitch.astro`, drawn to scale. Keep the grass green in both modes.
- Essays are plain CommonMark. No `align="center"` on images, and HTML blocks inside a list must be indented into the item. `npm run build` runs `scripts/check-posts.mjs` and fails on raw markdown.
- Do not commit screenshots. `docs/screenshots/` is ignored. Tests write to `test-results/`.
- Every doc in `docs/` is named `Claude - <NAME>.md` with a matching `# Claude - ...` title. Keep that prefix on new docs.

## Commands

```bash
npm install
npm run dev      # http://localhost:4321
npm run check
npm run build
npm run preview
```

Update `docs/Claude - CHANGELOG.md` and `docs/Claude - DECISIONS.md` when a choice or a meaningful change lands.
