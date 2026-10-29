# Agents

Grok - This is Juan Sebastián Mendoza’s portfolio (GitHub `JuanSebastianM`). Phase 1 replaced the static site on this branch. `main` still serves the old site until this branch is merged. Do not change `main` to “keep the live site working.”

Grok - Read these before editing:

1. Grok - `docs/PROJECT_CONTEXT.md` — what the product is and where things live
2. Grok - `docs/DECISIONS.md` — why the stack and content rules exist
3. Grok - `docs/DESIGN.md` — palettes, type, motion
4. Grok - `docs/ROADMAP.md` — what is done and every `TODO(content)`
5. Grok - `docs/CMS.md` and `docs/DEPLOY.md` — later phases, not done yet

## Grok - Rules

- English only.
- Do not invent employers, schools, dates, or skill levels. Unknowns stay as placeholders in `src/data/profile.ts` and get a `TODO(content)` line in `docs/ROADMAP.md`.
- Do not add a `CNAME`. The domain is `https://juansebastianmendoza.com` (`src/data/site.ts`). It is not registered.
- Do not deploy to Cloudflare and do not commit secrets. `.dev.vars` is local only.
- Blog posts use frontmatter `title`, `subtitle`, `date`, `slug`, `tags`, `coverImage`. Do not put the old publishing-platform name anywhere under `src/`. `npm run check` fails if that string appears.
- Light is the green/white palette. Dark is blue/garnet. Do not add club crests or text tabs for clubs.
- `data-motion` gates animation. Do not autoplay sound. Ambience is the synthetic Web Audio loop in `HeaderTools.tsx`.
- The projects page lists LynStore and commentful only.
- Categories are derived in `src/lib/posts.ts`. Do not treat that map as something Juan wrote.
- Club colors are fan palettes. Do not add official crests or trademarks.
- Respect `prefers-reduced-motion`. The 3D ball stays off for reduced motion, narrow screens, and Save-Data.
- Claude - The pitch is `src/components/Pitch.astro`, drawn to scale. Keep the grass green in both modes.
- Claude - Essays are plain CommonMark. No `align="center"` on images, and HTML blocks inside a list must be indented into the item. `npm run build` runs `scripts/check-posts.mjs` and fails on raw markdown.
- Claude - The page title never names the employer. Use `identity.titleRole`.
- Claude - Position cards describe the position and the tool, never Juan’s skill level.
- Claude - Do not commit screenshots. `docs/screenshots/` is ignored. Tests write to `test-results/`.
- Claude - When an agent adds a section or line to a doc, it starts that heading or line with its own name, for example `## Claude - 2026-10-29` or `- Claude - ...`, so the next agent knows who wrote it. File names and doc titles stay as they are. Text that existed before Claude’s first pass was written by Grok and is marked `Grok - `. A heading’s prefix covers everything under it unless a line carries its own prefix.

## Grok - Commands

```bash
npm install
npm run dev      # http://localhost:4321
npm run check
npm run build
npm run preview
```

Update `docs/CHANGELOG.md` and `docs/DECISIONS.md` when a choice or a meaningful change lands.
