# Deploy

Do not deploy until Juan is at the Cloudflare login. Nothing in this repo has been published.

Claude - As of 2026-10-29 no Cloudflare account, API token, or Wrangler login is set up anywhere an agent can use. Every step below that touches Cloudflare needs Juan.

Target: Cloudflare Workers static assets. Domain later: `juansebastianmendoza.com` on Cloudflare Registrar. Mail later: `hello@juansebastianmendoza.com` via Email Routing.

## What is already in the repo

- `wrangler.jsonc` — Worker name `juansebastianmendoza`, assets from `./dist`, OAuth routes run the Worker first
- `worker/index.ts` — GitHub OAuth for Sveltia
- `npm run cf:preview` — Claude - `npm run build` (Astro plus the essay check) then `wrangler dev`
- `npm run cf:deploy` — Claude - `npm run build` then `wrangler deploy`

`astro dev` is enough to work on the site. It does not boot the Worker.

## First deploy

1. Install dependencies and confirm `npm run build` and `npm run check`.
2. `npx wrangler login` with Juan’s Cloudflare account.
3. `npm run cf:deploy`.
4. Open the `workers.dev` URL Wrangler prints. The custom domain will not exist yet. Canonical links still say `juansebastianmendoza.com`.
5. Register `juansebastianmendoza.com` in Cloudflare Registrar when Juan is ready.
6. Workers → the `juansebastianmendoza` service → Domains & Routes → attach `juansebastianmendoza.com` and `www`. Send `www` to the apex if he wants one host.
7. There is no `CNAME` file on purpose. Cloudflare’s dashboard holds the DNS, not GitHub Pages.

`ALLOWED_DOMAINS` in `wrangler.jsonc` is the apex and `www` only. Add a `workers.dev` host there only while you are testing CMS sign-in on that host, then remove it.

## Email

After the domain is on Cloudflare:

1. Email → Email Routing → enable it for `juansebastianmendoza.com`.
2. Add `hello` as a custom address.
3. Destination: an inbox Juan actually reads.
4. Then delete the “inbox is not live” sentence in `src/data/site.ts` and the contact aside.

Contact on the site is the copy button and mailto link. There is no third-party form.

## CMS after the domain works

Follow `docs/CMS.md`. The GitHub OAuth callback is `https://juansebastianmendoza.com/callback`. Secrets:

```bash
npx wrangler secret put GITHUB_CLIENT_ID
npx wrangler secret put GITHUB_CLIENT_SECRET
```

## Checks before calling it live

- `/`, `/projects`, `/blog`, one essay, one category, one tag, `/admin`, `/rss.xml`
- Both club palettes, light and dark, on a phone width and a desktop width
- `prefers-reduced-motion` does not leave sections stuck invisible
- No `CNAME`, no secrets in git
