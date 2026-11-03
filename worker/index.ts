/**
 * Same-origin OAuth client for Sveltia CMS.
 * Protocol matches Sveltia CMS Authenticator: GET /auth, GET /callback,
 * then postMessage `authorization:github:success:{...}` back to the editor.
 * Static files are served by Cloudflare assets. This worker only runs for
 * the routes in wrangler.jsonc `run_worker_first`.
 */

interface Env {
  ASSETS: Fetcher;
  GITHUB_CLIENT_ID?: string;
  GITHUB_CLIENT_SECRET?: string;
  GITHUB_HOSTNAME?: string;
  ALLOWED_DOMAINS?: string;
  GITHUB_ALLOW_WORKFLOW_SCOPE?: string;
}

const allowedScopes = ['repo', 'public_repo', 'user', 'read:user', 'user:email'];

function domainPatterns(allowedDomains: string | undefined): string[] {
  return (allowedDomains ?? '')
    .split(',')
    .map((value) => value.trim())
    .filter(Boolean)
    .map((value) => `^${value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&').replace(/\\\*/g, '.+')}$`);
}

function hostAllowed(hostname: string, env: Env): boolean {
  const patterns = domainPatterns(env.ALLOWED_DOMAINS);
  if (patterns.length === 0) return true;
  return patterns.some((pattern) => new RegExp(pattern).test(hostname));
}

function scopeFor(requested: string | null, env: Env): string {
  const fallback = 'repo,user';
  const allowWorkflow = env.GITHUB_ALLOW_WORKFLOW_SCOPE === 'true';
  const scopes = (requested ?? '')
    .split(/[\s,]+/)
    .map((scope) => scope.trim())
    .filter(Boolean)
    .filter((scope) => scope !== 'workflow' || allowWorkflow);

  if (scopes.length === 0) return fallback;
  const permitted = scopes.every(
    (scope) => allowedScopes.includes(scope) || (allowWorkflow && scope === 'workflow'),
  );
  return permitted ? scopes.join(',') : fallback;
}

function html(provider: string, payload: Record<string, string>, ok: boolean, env: Env): Response {
  const state = ok ? 'success' : 'error';
  const packed = JSON.stringify(payload).replaceAll('<', '\\u003c');
  const messageLiteral = JSON.stringify(`authorization:${provider}:${state}:${packed}`);
  const patterns = JSON.stringify(domainPatterns(env.ALLOWED_DOMAINS)).replaceAll('<', '\\u003c');
  const body = `<!doctype html>
<meta charset="utf-8">
<title>Sign-in</title>
<script>
(() => {
  const provider = ${JSON.stringify(provider)};
  const message = ${messageLiteral};
  const trusted = ${patterns}.map((pattern) => new RegExp(pattern));
  const hasToken = ${ok ? 'true' : 'false'};
  const allowed = (origin) => {
    if (!trusted.length) return true;
    try {
      return trusted.some((pattern) => pattern.test(new URL(origin).hostname));
    } catch (error) {
      return false;
    }
  };
  window.addEventListener('message', (event) => {
    if (event.data !== 'authorizing:' + provider) return;
    if (hasToken && !allowed(event.origin)) return;
    window.opener?.postMessage(message, event.origin);
  });
  window.opener?.postMessage('authorizing:' + provider, '*');
})();
</script>
<p>You can close this window.</p>`;

  return new Response(body, {
    headers: {
      'content-type': 'text/html; charset=utf-8',
      'set-cookie': 'csrf-token=deleted; HttpOnly; Max-Age=0; Path=/; SameSite=Lax; Secure',
      'cache-control': 'no-store',
    },
  });
}

function fail(provider: string, error: string, errorCode: string, env: Env): Response {
  return html(provider, { provider, error, errorCode }, false, env);
}

async function handleAuth(request: Request, env: Env): Promise<Response> {
  const url = new URL(request.url);
  const provider = url.searchParams.get('provider') ?? '';
  const siteId = url.searchParams.get('site_id') ?? '';

  if (provider !== 'github') {
    return fail(provider || 'unknown', 'Only the GitHub backend is enabled.', 'UNSUPPORTED_BACKEND', env);
  }

  if (siteId && !hostAllowed(siteId, env)) {
    return fail(provider, 'This site is not allowed to use the authenticator.', 'UNSUPPORTED_DOMAIN', env);
  }

  if (!env.GITHUB_CLIENT_ID || !env.GITHUB_CLIENT_SECRET) {
    return fail(provider, 'GitHub OAuth client ID or secret is not configured.', 'MISCONFIGURED_CLIENT', env);
  }

  const csrf = crypto.randomUUID().replaceAll('-', '');
  const hostname = env.GITHUB_HOSTNAME || 'github.com';
  const authorize = new URL(`https://${hostname}/login/oauth/authorize`);
  authorize.searchParams.set('client_id', env.GITHUB_CLIENT_ID);
  authorize.searchParams.set('scope', scopeFor(url.searchParams.get('scope'), env));
  authorize.searchParams.set('state', csrf);

  return new Response(null, {
    status: 302,
    headers: {
      location: authorize.toString(),
      'set-cookie': `csrf-token=github_${csrf}; HttpOnly; Path=/; Max-Age=600; SameSite=Lax; Secure`,
      'cache-control': 'no-store',
    },
  });
}

async function handleCallback(request: Request, env: Env): Promise<Response> {
  const url = new URL(request.url);
  const code = url.searchParams.get('code');
  const state = url.searchParams.get('state');
  const cookie = request.headers.get('cookie') ?? '';
  const match = cookie.match(/(?:^|;\s*)csrf-token=github_([0-9a-f]{32})(?:;|$)/);
  const csrf = match?.[1];

  if (!code || !state) {
    return fail('github', 'GitHub did not return an authorization code.', 'AUTH_CODE_REQUEST_FAILED', env);
  }
  if (!csrf || csrf !== state) {
    return fail('github', 'Sign-in was rejected because the session check failed.', 'CSRF_DETECTED', env);
  }
  if (!env.GITHUB_CLIENT_ID || !env.GITHUB_CLIENT_SECRET) {
    return fail('github', 'GitHub OAuth client ID or secret is not configured.', 'MISCONFIGURED_CLIENT', env);
  }

  const hostname = env.GITHUB_HOSTNAME || 'github.com';
  let token = '';
  let error = '';

  try {
    const response = await fetch(`https://${hostname}/login/oauth/access_token`, {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        code,
        client_id: env.GITHUB_CLIENT_ID,
        client_secret: env.GITHUB_CLIENT_SECRET,
      }),
    });
    const data = (await response.json()) as { access_token?: string; error?: string; error_description?: string };
    token = data.access_token ?? '';
    error = data.error_description || data.error || '';
  } catch {
    error = 'The token request failed.';
  }

  if (!token) {
    return fail('github', error || 'GitHub did not return an access token.', 'TOKEN_REQUEST_FAILED', env);
  }

  return html('github', { provider: 'github', token }, true, env);
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    if (request.method === 'GET' && (url.pathname === '/auth' || url.pathname === '/oauth/authorize')) {
      return handleAuth(request, env);
    }
    if (request.method === 'GET' && (url.pathname === '/callback' || url.pathname === '/oauth/redirect')) {
      return handleCallback(request, env);
    }
    return env.ASSETS.fetch(request);
  },
};
