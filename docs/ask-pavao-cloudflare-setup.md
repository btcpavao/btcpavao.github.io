# Ask Pavao: Cloudflare activation

Activated 16 September 2026 after the site release at `2cc762b`.

- Production Worker `btcpavao-ask-pavao`, version `4795a60f-6578-45df-949e-db5ab0f6ca43`, serves `btcpavao.com/api/ask-pavao*`.
- Email Routing is enabled/ready; `pavao@hey.com` is a verified destination. Sender and destination restrictions remain in the binding.
- The production Managed Turnstile widget is configured for `btcpavao.com`; its secret is stored on the Worker. The temporary local secret file was deleted.
- The public GitHub variable `TURNSTILE_SITE_KEY` is set. [Pages activation build](https://github.com/btcpavao/btcpavao.github.io/actions/runs/35093771181) succeeded.
- All eight apex A/AAAA records are proxied; the GitHub Pages origin addresses are unchanged. TLS mode is Full (strict).
- Live checks: GET returns JSON 405; empty POST returns `invalid_payload`/400; invalid Turnstile token returns `turnstile_failed`/400. The live form loads the production widget and enables Send.
- No real test email was sent, following the task constraint. Actual inbox arrival still needs the optional manual smoke test below.

The remaining sections document setup and maintenance; the activation prerequisites above are now complete.

## Existing hosting and intended route

The site is React/Vite, prerendered and published to **GitHub Pages** by `.github/workflows/deploy.yml`. Public DNS uses Cloudflare nameservers; the inspected HTTP response identified GitHub.com. No existing Worker, Pages Function, API route or Wrangler configuration was found. Authenticated account inspection before the requested live push found Email Routing disabled (`unconfigured`), no verified destination addresses and no Turnstile widgets. The current Wrangler OAuth token cannot read DNS records; proxy status still needs dashboard verification.

Keep GitHub Pages as the origin. Add one Worker route:

```text
https://btcpavao.com/api/ask-pavao
  → schema validation → Turnstile Siteverify → rate limit → restricted send_email
  → pavao@hey.com
```

In the Cloudflare **btcpavao.com** zone, open **DNS > Records**. The apex web record must be **Proxied** for a Worker route to execute. Preserve its current GitHub Pages target. Check the existing GitHub Pages custom-domain certificate, then use **SSL/TLS > Overview > Full (strict)**. Do not replace the site with a Worker Custom Domain. The route in this repository covers only `btcpavao.com/api/ask-pavao*`; the handler accepts the exact `/api/ask-pavao` path. Check that no other Worker route conflicts. [Cloudflare routes](https://developers.cloudflare.com/workers/configuration/routing/routes/)

## A. Email Service

1. Open **Compute > Email Service > Email Routing** in the Cloudflare dashboard. Select **Onboard Domain** for `btcpavao.com` if it is not already onboarded. Follow the displayed domain/DNS verification steps. Review existing mail-provider records before accepting MX/SPF/DKIM changes; preserve any existing mail service rather than blindly replacing its DNS configuration.
2. Under **Destination Addresses**, add `pavao@hey.com` and complete the verification link in that inbox. This is the existing public contact address used by the repository; its verification in this Cloudflare account remains a manual prerequisite.
3. Complete sender-domain onboarding for `btcpavao.com` as prompted. This Worker uses `curriculum@btcpavao.com` as its controlled sender. The visitor is never the From address.
4. A receiving alias such as `ask@btcpavao.com` is **optional**. It is unnecessary for this outbound form; create an Email Routing rule only if you also want people to email that alias directly. [Email Routing setup](https://developers.cloudflare.com/email-service/get-started/route-emails/)

Wrangler creates the restricted binding on deployment; keep this configuration in `btcpavao-github-io/wrangler.jsonc`:

```json
{
  "send_email": [{
    "name": "ASK_PAVAO_EMAIL",
    "destination_address": "pavao@hey.com",
    "allowed_sender_addresses": ["curriculum@btcpavao.com"]
  }]
}
```

The fixed destination and sender restrictions are enforced by the binding as well as the server code. If you deliberately select a different verified inbox, update **both** `worker/index.ts` and this binding, then rerun tests. Do not put a destination setting in frontend environment variables. [Send bindings](https://developers.cloudflare.com/email-service/configuration/send-bindings/)

The code uses the current structured `env.ASK_PAVAO_EMAIL.send({to, from, subject, text, replyTo})` API. No SMTP credentials or API token are sent to the browser. A validated visitor email becomes Reply-To only; anonymous submissions omit Reply-To. [Workers email API](https://developers.cloudflare.com/email-service/api/send-emails/workers-api/)

## B. Turnstile

In the Cloudflare account, open **Turnstile**, choose **Add widget**, name it `btcpavao curriculum`, add hostname `btcpavao.com`, and select **Managed** mode. Save the widget. Only this canonical hostname/origin is supported by the current production configuration; do not add an alternate host without updating and testing the origin policy too. [Widget setup](https://developers.cloudflare.com/turnstile/get-started/)

- Public **sitekey**: in the GitHub repository, open **Settings > Secrets and variables > Actions > Variables > New repository variable**. Set `TURNSTILE_SITE_KEY` to the production sitekey. The Pages workflow exposes it to Vite as `VITE_TURNSTILE_SITE_KEY`.
- Private **secret key**: store as the Worker secret `TURNSTILE_SECRET_KEY`, following the deployment steps below. Never put it in a `VITE_` variable, source file, GitHub repository variable or browser bundle.

The React component renders explicitly when the form opens and removes its widget when closed. Every server submission requires Siteverify success, action `ask_pavao`, and hostname `btcpavao.com`. Tokens expire after five minutes and are single-use; a retry gets a new widget/token. [Server-side validation](https://developers.cloudflare.com/turnstile/get-started/server-side-validation/)

## C. Rate limiter

Wrangler creates `ASK_PAVAO_LIMITER` with namespace `2026091601`, limit **5 requests per 60 seconds**. Check that this namespace is not already used by another rate limiter in the same account; if it is, choose an unused numeric namespace in the configuration and regenerate types. No D1, KV, Redis or database provisioning is needed.

The transient key uses Cloudflare's connecting IP after successful Turnstile validation. It never enters application storage, email or application logs. People sharing a public IP share this limit. The Cloudflare limiter operates per location with eventual consistency; it is burst protection, not an exact global quota. Configure it through Wrangler rather than looking for a separate dashboard binding form. [Rate Limiting binding](https://developers.cloudflare.com/workers/runtime-apis/bindings/rate-limit/)

## D. First deployment and later updates

Run from the app directory on the merged `main`:

```sh
cd btcpavao-github-io
npm ci
npm run lint
npm run verify:worker
npm run typecheck:worker
npm run worker:check
npx wrangler login
```

For the **first** deployment, create a local file named `.dev.vars.production` in this app directory using a text editor. It is ignored by git. Put one line in it, replacing the placeholder with the private Turnstile secret:

```dotenv
TURNSTILE_SECRET_KEY=REPLACE_WITH_REAL_TURNSTILE_SECRET
```

Then run:

```sh
chmod 600 .dev.vars.production
npm run worker:deploy -- --secrets-file .dev.vars.production
rm .dev.vars.production
```

This uploads code and the required secret together. Wrangler validates `secrets.required`; a first deploy without the secret will fail. For later code changes use `npm run worker:deploy`. For secret rotation use `npx wrangler secret put TURNSTILE_SECRET_KEY` and enter the value at the prompt. Alternatively select **Workers & Pages > btcpavao-ask-pavao > Settings > Variables and Secrets > Add**, type **Secret**, then **Deploy**. [Worker secrets](https://developers.cloudflare.com/workers/configuration/secrets/)

Check the deployed Worker route and both bindings against `wrangler.jsonc`. Worker logs/observability are disabled in this configuration, and the handler does not log payloads. Do not add request-body capture when troubleshooting.

After the Worker is active and the GitHub public variable is set, run **Actions > Deploy Pages > Run workflow > main** (or let a subsequent `main` push trigger it). Public sitekeys are baked into the build, so changing the variable requires rebuilding the site. Worker deployment is deliberately a separate manual command; the existing Pages workflow does not deploy Workers.

Without a sitekey the public form displays an unavailable message and disables Send. Without valid server bindings/secrets the endpoint fails closed. Official test secrets are rejected by the production handler. Do not use the test sitekey on production.

## E. Production smoke test after activation

These are **manual tests that send real email**. Use clearly marked synthetic questions, never wallet material. Open the live curriculum after the new Pages build:

1. From the threat-model lesson, open Ask Pavao. Submit `Smoke test: can you clarify this lesson?` with Name and Email blank. Expect the no-direct-reply success message. Verify the inbox email has the lesson title, section and canonical lesson link; CONTACT says `Not provided`; no visitor Reply-To is present.
2. Reload the form and submit a synthetic question with a name and an email address you control. Expect the direct-reply success copy. Verify From is `curriculum@btcpavao.com`, destination is the configured inbox, and Reply-To is the entered address. Click Reply to inspect the recipient; sending a reply is unnecessary.
3. Submit an empty question, then an invalid email. Each should show a field error without a POST or email.
4. Search for a deliberately absent topic, open Ask Pavao, and submit once. Verify the displayed search query appears in the **body**, not the subject; the canonical page URL has no query string.
5. On the same connection, submit more than five valid test questions within a minute, with a fresh Turnstile token each time. Expect HTTP 429, a wait message, and retained text. The accepted attempts send real test email. The limit is location-based, so this is a basic same-client burst check.
6. Inspect the received messages: no IP, user agent, cookies, Turnstile token or secret. Success means the email service accepted the send; actual arrival/spam-folder placement must be checked in the inbox.

Delivery-failure and network-failure paths are already tested with mocks; do not deliberately break production email to retest them. If smoke delivery fails, check domain onboarding, verified destination, binding restrictions and Turnstile hostname/action without copying private payloads into logs.

## Local development: no real email

From `btcpavao-github-io`, run `npm ci`, then use two terminals:

```sh
# Terminal 1: isolated local Worker
npm run worker:dev
```

```sh
# Terminal 2: React app with the official public Turnstile test sitekey
npm run dev:questions
```

Open [local curriculum](http://127.0.0.1:4176/en/bitcoin-core/self-custody/). Use exactly `127.0.0.1:4176`, matching the local origin policy. Vite proxies `/api/ask-pavao` to `127.0.0.1:8787`.

`wrangler.local.jsonc` selects `worker/local.ts`, which has **no send_email binding**. It accepts only the official dummy widget token, mocks the Siteverify response, and uses a no-op delivery adapter. This exercises the same validation, rate limiter and response paths, but does not verify a real token or send/store/log email. The UI explicitly labels this simulated flow. Do not deploy the local configuration or enable remote email bindings. [Official Turnstile testing keys](https://developers.cloudflare.com/turnstile/troubleshooting/testing/)

The separate adapter also avoids the default local email simulator's message logging/files. [Cloudflare local email behavior](https://developers.cloudflare.com/email-service/local-development/sending/)

Run `npm run verify:worker` for deterministic mocked Siteverify/rate-limit/email failures; `npm run verify:questions` checks the frontend transport contract. Neither test suite contacts an inbox. Real production delivery remains the manual smoke test above.
