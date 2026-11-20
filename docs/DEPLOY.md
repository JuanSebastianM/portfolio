# Deploy

Live setup as of 2026-11-20:

- **Builds:** Cloudflare Workers Builds is connected to `JuanSebastianM/portfolio`, with two triggers, both `NODE_VERSION=22` and build command `npm run build`:
  - production: pushes to `main` run `npx wrangler deploy`;
  - “Preview branches”: pushes to any other branch run `npx wrangler versions upload`, which publishes a preview URL (`<branch>-portfolio.jmendozaperez.workers.dev`) without touching production.
  Nobody deploys by hand.
- **Worker:** `portfolio`, account subdomain `jmendozaperez`, so the fallback address is `https://portfolio.jmendozaperez.workers.dev`.
- **Domain:** `jmendozaperez.dev` is registered at GoDaddy. The zone is on Cloudflare (nameservers `kaiser.ns.cloudflare.com` and `ziggy.ns.cloudflare.com`). `jmendozaperez.dev` and `www.jmendozaperez.dev` are Worker custom domains for `portfolio`.
- **Email:** `hello@jmendozaperez.dev` is Microsoft 365 through GoDaddy. Its DNS records (MX to `ppe-hosted.com`, SPF, DMARC, DKIM, Autodiscover, Teams/Lync, the Microsoft verification TXT) were copied into Cloudflare unproxied. Do not proxy or delete them.
- **Agent sessions** cannot run `wrangler deploy` themselves (the cloud proxy overwrites Wrangler's asset-upload token), but can manage DNS and Worker domains through the Cloudflare API with the token saved on the “portfolio” environment.

## What is already in the repo

- `wrangler.jsonc` — Worker name `portfolio`, assets from `./dist`, OAuth routes run the Worker first
- `worker/index.ts` — GitHub OAuth for Sveltia
- `npm run cf:preview` — `npm run build` (Astro plus the essay check) then `wrangler dev`
- `npm run cf:deploy` — `npm run build` then `wrangler deploy`

`astro dev` is enough to work on the site. It does not boot the Worker.

## First deploy

1. Install dependencies and confirm `npm run build` and `npm run check`.
2. `npx wrangler login` with Juan’s Cloudflare account.
3. `npm run cf:deploy`.
4. Open the `workers.dev` URL Wrangler prints. The custom domain will not exist yet. Canonical links say `jmendozaperez.dev`.
5. Make sure `jmendozaperez.dev` is a zone in the same Cloudflare account.
6. Workers → the `portfolio` Worker → Domains & Routes → attach `jmendozaperez.dev` and `www.jmendozaperez.dev`. Send `www` to the apex if he wants one host.
7. There is no `CNAME` file on purpose. Cloudflare’s dashboard holds the DNS, not GitHub Pages.

`ALLOWED_DOMAINS` in `wrangler.jsonc` is the apex and `www` only. Add a `workers.dev` host there only while you are testing CMS sign-in on that host, then remove it.

## Email

After the domain is on Cloudflare:

1. Email → Email Routing → enable it for `jmendozaperez.dev` (skip if `hello@jmendozaperez.dev` already receives mail).
2. Add `hello` as a custom address.
3. Destination: an inbox Juan actually reads.
4. The site no longer says the inbox is not live.

Contact on the site is the copy button and mailto link. There is no third-party form.

## CMS after the domain works

Follow `docs/CMS.md`. The GitHub OAuth callback is `https://jmendozaperez.dev/callback`. Secrets:

```bash
npx wrangler secret put GITHUB_CLIENT_ID
npx wrangler secret put GITHUB_CLIENT_SECRET
```

## Checks before calling it live

- `/`, `/projects`, `/blog`, one essay, one category, one tag, `/admin`, `/rss.xml`
- Both club palettes, light and dark, on a phone width and a desktop width
- `prefers-reduced-motion` does not leave sections stuck invisible
- No `CNAME`, no secrets in git
