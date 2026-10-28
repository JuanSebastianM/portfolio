# CMS

Sveltia CMS is at `/admin`. The config is `public/admin/config.yml`. The app bundle is `public/admin/sveltia-cms.js` (`@sveltia/cms@0.253.1`).

It is a visual editor over git. Saving a post commits markdown under `src/content/blog`. New images go to `public/images/uploads` and are stored as `/images/uploads/...`. Existing covers already point at `/images/blog/...`; leave those paths unless you upload a replacement.

## What you can do today

Open `/admin` locally (`npm run dev`) or on the deployed site. The editor UI loads. **Sign in with GitHub will not complete** until the steps below are done, and it should not be aimed at `main` until this revamp is merged. The config’s `branch` is `main`. A commit from the CMS before merge would land on the old site.

## When you are ready

Do this after the new site is the default branch and the Worker is deployed (see `docs/DEPLOY.md`). The OAuth callback has to be a public HTTPS URL.

### 1. GitHub OAuth app

GitHub → Settings → Developer settings → OAuth Apps → New OAuth App.

- Application name: `Juan Mendoza site` (or anything you will recognize)
- Homepage URL: `https://juansebastianmendoza.com`
- Authorization callback URL: `https://juansebastianmendoza.com/callback`

Create it, then generate a client secret. Copy the client id and the secret once. The secret is not shown again.

If you test on a `workers.dev` hostname before the domain exists, the callback URL and `base_url` in `public/admin/config.yml` must be that origin instead, and that hostname must be added to `ALLOWED_DOMAINS`. Change them back when the domain is attached.

### 2. Worker secrets

From the repo, logged into the same Cloudflare account that owns the Worker:

```bash
npx wrangler secret put GITHUB_CLIENT_ID
npx wrangler secret put GITHUB_CLIENT_SECRET
```

Do not put those values in `wrangler.jsonc`, `.dev.vars` that you commit, or the CMS config. `.dev.vars.example` shows the names for local Wrangler only. Copy it to `.dev.vars` (gitignored) if you want to try OAuth on `npm run cf:preview`.

Production `ALLOWED_DOMAINS` is `juansebastianmendoza.com,www.juansebastianmendoza.com`. For local OAuth, set `ALLOWED_DOMAINS` in `.dev.vars` to include `localhost` and `127.0.0.1`.

Optional: `GITHUB_ALLOW_WORKFLOW_SCOPE=true` only if you truly need a token that can edit GitHub Actions files. Leave it unset.

### 3. Scope

`auth_scope` is `public_repo`. That is enough to commit to this public repository. If the repo ever becomes private, change it to `repo` and sign in again.

### 4. Publish

Sign in at `/admin`, open Blog posts, edit or create one, and save. Sveltia commits to `main` as you. The next deploy picks up the markdown. There is no separate “publish” server.

### 5. Tags and categories

The editor does not ask for a category. `src/lib/posts.ts` maps tags onto Career, Open source, Full-stack, Testing, React, or JavaScript. First match wins. A tag with no rule becomes Notes. Read that file before adding a tag that would file the essay in the wrong section.

Frontmatter stays `title`, `subtitle`, `date`, `slug`, `tags`, `coverImage`. The slug is the URL: `/blog/your-slug`.

## How the Worker fits

`worker/index.ts` implements the Sveltia GitHub flow:

1. The editor opens `https://juansebastianmendoza.com/auth?provider=github`.
2. The Worker redirects to GitHub and stores a CSRF cookie.
3. GitHub returns to `/callback`.
4. The Worker exchanges the code and `postMessage`s `authorization:github:success:{...}` to the editor window.

Static pages do not go through that script. Wrangler’s `run_worker_first` list is only the OAuth paths.
