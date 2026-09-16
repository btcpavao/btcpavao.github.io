# Curriculum search and Ask Pavao review

16 September 2026. Work is on local `main`, updated from `origin/main` at `54083e6eb8a52c4570bf20bae1a1ac7e36f14cb0`. Earlier requested curriculum v4.2 edits remain in the same working tree; this implementation adds search and the question flow without changing unrelated articles. The implementation was subsequently pushed and published in commit `2cc762b`; Cloudflare activation is recorded in the setup document.

## Search

The overview now has an immediate, local full-text search across all **99 published lessons** in three parts. Its index is built once from the existing typed curriculum data. It includes titles, summaries, objectives, explanatory content, risk notes, checklists, callouts, walkthroughs, common mistakes, concepts, community questions, guided steps, code blocks and commands. No external search service, runtime package, analytics event or remote query transmission was added.

Matching is case/diacritic insensitive, accepts partial terms and requires all query terms. Title, explicit keywords and summary matches rank above body-only matches. Each result shows its lesson title, part/chapter and a short excerpt. Exact titles lead to the correct lesson; links preserve `?q=` and use the existing `#lesson/slug` route. Browser Back restores results, reload preserves the query, Clear and Escape restore the overview. Desktop lesson pages have a Search shortcut; mobile navigation retains the curriculum overview entry. Keyboard Tab/Enter opens results and moves focus to the lesson heading.

Supported vocabulary includes `labels`, `labeling`, `labelling`, `UTXO management`, `coin control`, `PSBT`, `descriptor`, `Linux`, verification and recovery terms. Explicit aliases are small and inspectable rather than a speculative thesaurus. Source labels/review metadata/URLs are excluded from the index, so the word “label” does not match every source citation.

### Labels and UTXO coverage audit

Existing content covers address labeling in the first signet wallet lesson; UTXO selection and transaction review in `coin-control-fees`; stale metadata in backup/restore and backup-freshness lessons; label privacy in digital backup guidance; and the fact that descriptors do not recover labels in coordinator recovery.

There is **no dedicated procedure for exporting/importing a label file**, nor a comprehensive treatment of transaction/address/UTXO label interoperability. Search does not invent one. `export labels` and `import labels` surface relevant backup guidance with a visible coverage note. `labels` produces 14 relevant lessons; `utxo` produces two, led by coin control. The remaining gap is editorial work, now reachable through Ask Pavao.

## Ask Pavao interface

Only Question is required. Name and Email are explicitly optional, with validation when supplied. The expanded form appears at the overview and seven selected contextual help locations instead of repeating a full sales/contact block in every lesson. No-results search opens the same form with visible, bounded search context.

The form shows what context it includes, explains that leaving identity fields blank omits those details, and avoids promises of network anonymity. It never reads wallet files, clipboard, terminal history or private local data. The warning against including seed words, private keys, passphrases and other secrets sits immediately above Send. Value for Value remains optional and does not gate submission. Its floating rail is hidden while the form is open to prevent covering controls.

Success copy differs with/without a reply email, does not promise a response time, and receives keyboard focus. Recoverable failure retains the input and refreshes the Turnstile challenge. An in-flight guard prevents duplicate clicks. Topics may inform later curriculum improvements; original text or identifying details are not automatically published.

## Backend and accepted contract

The GitHub Pages site uses one Cloudflare Worker route for same-origin **POST `/api/ask-pavao`**. No database or persistent question store is added. In production the flow is:

```text
JSON/schema → honeypot → Siteverify → transient rate limiter → awaited email send → response
```

| Field | Contract |
| --- | --- |
| `question` | Required string, trimmed, 5–5000 characters; body only |
| `name` | Optional string, maximum 150 |
| `email` | Optional validated email, maximum 254; Reply-To only |
| `lessonTitle`, `sectionTitle` | Optional public context, maximum 200/120 |
| `pageUrl` | Optional canonical HTTPS curriculum URL on btcpavao.com, maximum 500; no query |
| `locale` | Optional `en` or `hr` |
| `searchQuery` | Optional visible search context, maximum 200; email body only |
| `turnstileToken` | Required, maximum 2048; server validation mandatory |
| `companyWebsite` | Hidden honeypot, maximum 200; populated field suppresses delivery |

The endpoint bounds the entire streamed request to 32 KiB, rejects unknown fields/types and invalid context, and rejects control characters in header/context fields. Question text is serialized into a structured plain-text body, never raw MIME headers or HTML. Client-supplied recipient/sender/header fields are rejected. Responses are generic, uncached JSON without permissive CORS. The expected Origin is enforced in addition to Turnstile.

Turnstile is rendered explicitly on opening the React form. The server calls Siteverify and checks success, hostname and `ask_pavao` action; expired/reused tokens fail verification. The production entry rejects official dummy secrets. No Turnstile secret is present in the client bundle.

`ASK_PAVAO_LIMITER` allows 5 requests/60 seconds using the transient Cloudflare IP key after validation. IPs are not emailed or stored/logged by this app. The restricted `ASK_PAVAO_EMAIL` binding sends only to `pavao@hey.com`, from `curriculum@btcpavao.com`. Optional validated email becomes Reply-To. Subject is `[Curriculum Question] <lesson title>` or `New question`; free-form question/search text stays in the body. Email is awaited before success. There are no question analytics events or application payload logs.

## Files

Paths below are relative to `btcpavao-github-io/` unless noted.

| Area | Files |
| --- | --- |
| Search | `src/curriculum-search.ts`, `src/components/curriculum-search.tsx`, `src/components/curriculum-overview.tsx` |
| Form and context | `src/components/curriculum-context.tsx`, `src/components/curriculum-question-form.tsx`, `src/components/curriculum-turnstile.tsx`, `src/curriculum-questions.ts` |
| Player and layout | `src/bitcoin-core-curriculum-en.tsx`, `src/index.css` |
| Server | `worker/index.ts`, `worker/validation.ts`, `worker/env.d.ts` (generated), `worker/local.ts` |
| Configuration | `wrangler.jsonc`, `wrangler.local.jsonc`, `tsconfig.worker.json`, `vite.config.ts`, `.env.example`, `.gitignore`, `package.json`, `package-lock.json` |
| Tests | `scripts/verify-curriculum-search.mjs`, `scripts/verify-curriculum-questions.mjs`, `scripts/verify-ask-pavao-worker.mjs` |
| CI (repo root) | `.github/workflows/curriculum-checks.yml`, `.github/workflows/deploy.yml` |

Only development tooling was added: Wrangler and Cloudflare Workers types. The browser gains no new npm runtime dependency.

## Verification

- Search: **11 groups**, including all 99 exact titles, aliases, body/command coverage, ordering, excerpts, empty/no-results and lesson URLs.
- Form contract: **7 groups**, including optional identity, explicit/bounded context, no credentials/referrer, and unsuccessful transport responses.
- Worker: **15 groups**, covering all identity combinations, malformed/overlong input, fixed recipient, header injection, Reply-To, canonical context, Turnstile failures/action/hostname/expired-token response, rate-limit failure, honeypot, mail failure, request size, origin/method/content type, and no payload logging/storage.
- Existing curriculum verification: **27 groups**. Earlier v4.2 real Bitcoin Core 31.1 regtest results remain in the separate v4.2 report; this backend test suite does not send Bitcoin or email.
- Browser QA: desktop 1440 px, mobile 390/320 px, light/dark; no horizontal overflow on changed views. Compact Turnstile fits the 320 px form. Search result Tab/Enter navigates correctly; result heading gets focus. Clear/Escape, reload and Back preserve expected search behavior.
- Actual local form → Vite proxy → local Worker tested for anonymous and identified success, including search context. Local burst returned `200, 200, 200, 200, 200, 429`; submitting the open form then showed the rate-limit message and retained its question. Validation and simulated delivery/network failure retain input. No test sent real email.

Final run: lint, application/Worker typechecks, all 60 verification groups above, production client/SSR build, asset/link checks and Worker deployment dry-run **passed**. The build prerendered 14 public routes; link verification checked 578 internal links and 99 lesson destinations. Worker bundle: 6.50 KiB (2.50 KiB gzip). The existing SSR mixed static/dynamic import warnings remain non-fatal. `git diff --check` passed.

The final static production preview was also checked at 1440/320 px. It returns 14 label results with no horizontal overflow; with no public sitekey configured it disables Send and does not load Turnstile. No server-secret name or email-binding code was found in the browser assets.

`npm audit` reports **7 existing development-dependency advisories** (4 high, 3 moderate; no critical). A lockfile comparison against the starting `main` confirms the affected versions of `@humanfs/node`, `baseline-browser-mapping`, `brace-expansion`, `browserslist`, `js-yaml`, `nanoid` and `postcss` were already present and remain unchanged. This task does not apply unrelated toolchain upgrades. Audit is therefore not reported as clean.

## Activation and smoke testing

Follow [Ask Pavao Cloudflare setup](ask-pavao-cloudflare-setup.md) for the exact dashboard steps, first deploy with a required secret, later updates, local development and six-step production smoke test. Production prerequisites were completed on 16 September 2026: proxied API hostname, Email Routing ready, verified destination, production Turnstile widget and secret, public build variable, Worker deployment and successful Pages rebuild. Live rejection checks passed. Actual inbox arrival remains untested because no real test email was sent.

## Screenshots and preview

All submission screenshots below are **local simulations**, with official Turnstile test keys and a no-op email adapter.

- [Normal Ask Pavao form](ask-pavao-form.webp)
- [Anonymous success](ask-pavao-anonymous-success.webp)
- [Identified success](ask-pavao-identified-success.webp)
- [No-results → Ask Pavao, mobile](ask-pavao-no-results-mobile.webp)
- [Compact mobile widget and warning](curriculum-question-mobile.webp)
- [Mobile search and label-coverage note](curriculum-search-mobile.webp)

With both local servers running, open [the simulated form preview](http://127.0.0.1:4176/en/bitcoin-core/self-custody/?q=missingzzzz). Production-like static preview is on port 4175; without a production sitekey its Send button is intentionally unavailable.
