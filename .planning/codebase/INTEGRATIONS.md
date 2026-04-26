# External Integrations

**Analysis Date:** 2026-03-21

## APIs & External Services

**Forms & Lead Capture:**
- Formspree-compatible form endpoint - Contact and callback forms post directly from the browser using the configured endpoint in `src/config/site.ts` and forms in `src/pages/ContactPage.tsx`.
  - SDK/Client: Native HTML form submission, no JavaScript SDK detected.
  - Auth: Endpoint URL is configured directly in `src/config/site.ts`; no env var is used for it.

**Analytics:**
- Plausible Analytics - Script-based page/event analytics loader configured in `src/config/site.ts` and injected by `src/components/AnalyticsLoader.tsx`.
  - SDK/Client: External script from the provider URL configured in `src/config/site.ts`; browser calls through `window.plausible` in `src/lib/analytics.ts`.
  - Auth: No auth env var detected; provider domain is configured directly in `src/config/site.ts`.
- Umami - Alternate analytics provider supported by the same runtime abstraction in `src/config/site.ts` and `src/lib/analytics.ts`.
  - SDK/Client: External script URL configured through `siteConfig.analytics.scriptSrc`; browser calls through `window.umami` in `src/lib/analytics.ts`.
  - Auth: No auth env var detected.

**Maps:**
- Google Maps embed - Contact page renders an iframe using the embed URL from `src/config/site.ts` inside `src/pages/ContactPage.tsx`.
  - SDK/Client: `<iframe>` only.
  - Auth: No env var detected.

**Hosting & SEO Distribution:**
- GitHub Pages - Static site deployment target configured in `.github/workflows/deploy.yml`.
  - SDK/Client: GitHub Actions workflow actions `actions/configure-pages@v5`, `actions/upload-pages-artifact@v3`, and `actions/deploy-pages@v4` in `.github/workflows/deploy.yml`.
  - Auth: GitHub Actions OIDC and Pages permissions from the workflow; no repo-local secret values are read in code.

## Data Storage

**Databases:**
- Firebase Firestore - Event analytics are written and read from Firestore in `src/lib/firebase.ts` and `src/lib/analytics.ts`.
  - Connection: No env var detected. Firebase client configuration is defined directly in `src/lib/firebase.ts`.
  - Client: Firebase Web SDK via the `firebase` package from `package.json`.

**File Storage:**
- Local repository assets under `public/` and generated static output under `dist/`.
- Firebase Storage bucket identifier is present in the Firebase config in `src/lib/firebase.ts`, but no storage API usage is detected elsewhere in the repository.

**Caching:**
- None detected. No Redis, CDN cache API, service worker cache, or application cache client is present in `src/` or `scripts/`.

## Authentication & Identity

**Auth Provider:**
- Custom client-side password gate - Admin access is implemented by comparing an entered password against `siteConfig.admin.password` in `src/components/AdminGuard.tsx`.
  - Implementation: Browser-only check with session state persisted in `localStorage` by `src/components/AdminGuard.tsx`.
- Firebase Authentication, Auth0, Clerk, Supabase Auth, NextAuth, or Passport are not detected.

## Monitoring & Observability

**Error Tracking:**
- None detected. No Sentry, Datadog, Rollbar, Bugsnag, or similar client/server SDK is present.

**Logs:**
- Browser console logging is used for analytics write failures and dev-only instrumentation in `src/lib/analytics.ts`.
- Build scripts log generation/prerender progress and failures with `console.log` / `console.error` in `scripts/generate-seo-assets.mjs` and `scripts/prerender.mjs`.

## CI/CD & Deployment

**Hosting:**
- GitHub Pages via `.github/workflows/deploy.yml`.

**CI Pipeline:**
- GitHub Actions workflow `Deploy GitHub Pages` in `.github/workflows/deploy.yml`.
- Pipeline steps:
  - Checkout repository.
  - Configure Pages.
  - Setup Node.js 20.
  - Run `npm install`.
  - Run `npm run build` with `SITE_URL`, `BASE_PATH`, `GITHUB_ACTIONS`, and `GITHUB_REPOSITORY`.
  - Upload `dist/` as the Pages artifact.
  - Deploy artifact to GitHub Pages.

## Environment Configuration

**Required env vars:**
- `SITE_URL` - Used by `scripts/generate-seo-assets.mjs`.
- `BASE_PATH` - Used by `vite.config.ts` and `scripts/generate-seo-assets.mjs`.
- `VITE_SITE_URL` - Used by `src/config/site.ts`.
- `GITHUB_ACTIONS` - Used by `vite.config.ts`.
- `GITHUB_REPOSITORY` - Used by `vite.config.ts`.

**Secrets location:**
- No dedicated secrets file is read by the application code.
- Integration endpoints and credentials are configured inline in source files such as `src/config/site.ts` and `src/lib/firebase.ts`.

## Webhooks & Callbacks

**Incoming:**
- None detected. No API server, webhook receiver, or callback endpoint implementation is present under `src/`, `scripts/`, or `.github/`.

**Outgoing:**
- Browser form submissions post to the configured form service endpoint from `src/pages/ContactPage.tsx`.
- Browser analytics events are sent to Firestore via `addDoc(...)` in `src/lib/analytics.ts`.
- Browser analytics events may also be forwarded to Plausible or Umami via `window.plausible(...)` or `window.umami.track(...)` in `src/lib/analytics.ts`.

---

*Integration audit: 2026-03-21*
