# Design

Light is green and white. Dark is deep blue and garnet. A sun or moon button switches them. Pitch lines, a lineup, a season log, and tilt on the project cards carry the soccer idea. Club crests, wordmarks, and kit art are trademarks, so they are not used, and the clubs are not named in the interface.

The page should feel like a match program set in editorial type. It should not feel like a soccer template with badges and emoji.

## Palettes

Light sets `data-mode="light"` and `data-club="nacional"`. Dark sets `data-mode="dark"` and `data-club="barca"`. Tokens live in `src/styles/global.css`.

### Light (green and white)

| Token | Light | Dark |
| --- | --- | --- |
| Background `--bg` | `#f4f7f2` | `#07150e` |
| Elevated `--elev` | `#ffffff` | `#0e2418` |
| Ink `--ink` | `#102117` | `#e7f6ec` |
| Muted `--muted` | `#3c5346` | `#b7d0c2` |
| Accent `--accent` | `#0e6b38` | `#6ee7a8` |
| Accent text `--accent-contrast` | `#f4fff8` | `#062616` |
| Second `--accent-2` | `#08321a` | `#d7ffe8` |
| Kicker `--kicker` | `#0e6b38` | `#6ee7a8` |
| Stripe `--stripe` | `#ffffff` | `#d7ffe8` |
| Line `--line` | `#d3e4d8` | `#1c3b2b` |
| Ball `--ball` | `#0e6b38` | `#6ee7a8` |
| Ball ring `--ball-ring` | `#08321a` | `#d7ffe8` |

### Dark (blue and garnet)

| Token | Light | Dark |
| --- | --- | --- |
| Background | `#f7f4f6` | `#120810` |
| Elevated | `#ffffff` | `#1c121c` |
| Ink | `#1c1218` | `#f8f1f4` |
| Muted | `#5c4652` | `#d4c2cb` |
| Accent | `#a50044` | `#ff6b93` |
| Accent text | `#fff7fa` | `#2a0612` |
| Second | `#004d98` | `#8eb6ff` |
| Kicker | `#004d98` | `#8eb6ff` |
| Stripe | `#004d98` | `#8eb6ff` |
| Line | `#eadde3` | `#322430` |
| Ball | `#a50044` | `#ff6b93` |
| Ball ring | `#004d98` | `#8eb6ff` |

Accent text is for type sitting on the accent fill (buttons, placeholder flags). Muted text is for secondary copy on the background. A 4px stripe under the top edge splits accent / stripe / second color.

Default before JavaScript: light. A tiny inline script then applies the saved mode, or the operating system scheme on the first visit. The control is an icon button with an accessible name. `data-motion` is `on` or `off`. It starts from `prefers-reduced-motion` unless the visitor has saved a choice. The header shows that choice as “Reduce motion”.

## Typography

- UI: Outfit, variable, latin (and latin-ext as a fallback range).
- Display: Fraunces, variable, weight about 560.
- Self-hosted via `@fontsource-variable`. `font-display: swap`.
- Body size `1.0625rem`. Headlines use tight tracking and a short line height.
- `text-wrap` is left to the browser; headings are clamped.

## Motion

- Scroll sections use Motion (`whileInView`, once). Hero text is not hidden behind that animation.
- Project cards tilt up to about 9 degrees on fine pointers. Coarse pointers do not tilt.
- Reading progress on essays is a CSS scroll timeline, removed under `prefers-reduced-motion`.
- The hero ball is React Three Fiber, loaded on idle, desktop only, and only when `data-motion` is `on`. Its frame loop stops when the tab is hidden. It is the only continuous frame loop.
- A small ball follows scroll with a CSS scroll timeline and `offset-path`. Pitch lines draw in once. Primary buttons show a net ripple on hover. Lineup chips fade into place when the formation enters the viewport. Copying the email spills a few dots. A ball bounces once at load. All of that is transform and opacity, and `data-motion="off"` removes it.
- Ambience is synthetic filtered noise from the Web Audio API. No audio file ships in the repo. It starts only after the speaker button is pressed, then fades. Volume is a slider. License: original code in `src/islands/HeaderTools.tsx`, not a recording.
- `data-motion="off"` is the switch that stops those effects. It starts from `prefers-reduced-motion` and can be changed in the header. A `noscript` rule keeps reveal targets visible without JavaScript.

## Components

| Piece | Where | Notes |
| --- | --- | --- |
| Pitch lines | `PitchField.astro` | Fixed SVG, masked, draws in once |
| Header + stripe | `Header.astro` | Sticky, blur, mobile `details` menu |
| Header tools | `HeaderTools.tsx` | Sun/moon, Reduce motion, ambience |
| Hero | `index.astro` | Name, bio, portrait, idle ball |
| Starting XI | `Formation.astro` | Team sheet on small screens, absolute pitch from 768px |
| Season log | `SeasonLog.astro` | Jobs, diploma, certifications, featured |
| Project grid | `ProjectGrid.tsx` | Tilt, real screenshots or a letter mark |
| Post card | `PostCard.astro` | Cover, category, tags, reading time |
| Contact | `Contact.astro` | Formspree plus the planned email |
| Essay | `blog/[slug].astro` | Prose, Shiki, related posts |
| CMS | `public/admin` | Sveltia |

## Layout

- Content width `min(1120px, 100% - 2rem)`.
- Mobile first. The lineup becomes a pitch at `768px`. Home project grid becomes a bento at `1024px`.
- Focus visible is a 2px accent outline. Skip link targets `#main`.
