# Codebase Concerns

**Analysis Date:** 2026-03-21

## Tech Debt

**Oversized page components with mixed concerns:**
- Issue: Rendering, content orchestration, interaction state, and tracking logic are concentrated in large React components instead of smaller feature-level modules.
- Files: `src/pages/HomePage.tsx`, `src/pages/PlaygroundPage.tsx`, `src/pages/GalleryDetailPage.tsx`, `src/components/Layout.tsx`, `src/pages/AdminPage.tsx`
- Impact: Small changes carry regression risk because UI, state, routing assumptions, and analytics calls change together.
- Fix approach: Extract page sections, tracking hooks, and reusable view models into focused files under `src/components/` and `src/lib/`.

**Routing definitions are duplicated across files:**
- Issue: Route keys and route resolution rules are maintained in multiple places.
- Files: `src/App.tsx`, `src/routing.ts`, `src/types.ts`, `src/content/route-segments.json`
- Impact: Adding or renaming a route requires synchronized edits in several files; missing one produces broken navigation or silent fallbacks to home.
- Fix approach: Centralize route metadata in one typed source and derive `RouteKey`, route matching, and localized path generation from it.

**Validation scripts cover content shape but not runtime behavior:**
- Issue: The build validates locale schema and route-segment uniqueness, but there is no automated coverage for user flows, routing behavior, analytics, or form submission paths.
- Files: `scripts/validate-content.mjs`, `package.json`
- Impact: Regressions in navigation, hidden admin flows, contact forms, and analytics can ship unnoticed.
- Fix approach: Add at least smoke-level tests for localized routing and core pages, plus a small unit suite around routing and analytics helpers.

**Array schema validation is shallow:**
- Issue: Locale validation only inspects the first element of each array when inferring schema.
- Files: `scripts/validate-content.mjs`
- Impact: Inconsistent objects later in arrays can bypass validation and break pages that assume full object shape.
- Fix approach: Validate every array item against a defined schema or compare normalized object key sets across all items.

## Known Bugs

**Admin panel protection is client-side only:**
- Symptoms: Anyone who can inspect the shipped bundle or repository can recover the admin password and unlock the dashboard; a stored `localStorage` flag then bypasses future checks.
- Files: `src/components/AdminGuard.tsx`, `src/config/site.ts`, `src/App.tsx`
- Trigger: Visit `/:locale/__empire-admin`, inspect `siteConfig.admin.password`, or set `localStorage.empire_admin_session = '1'`.
- Workaround: Not applicable; this is an implementation flaw rather than an operator mistake.

**Contact forms do not show submission success or failure:**
- Symptoms: Users submit directly to the configured form endpoint and remain on a blind POST flow with no in-app confirmation, retry guidance, or visible error handling.
- Files: `src/pages/ContactPage.tsx`, `src/config/site.ts`
- Trigger: Submit either contact form when the endpoint is slow, unavailable, misconfigured, or blocked by browser/network conditions.
- Workaround: Check the external form provider dashboard manually and confirm leads outside the site.

**Production metadata defaults still point to placeholder hostnames:**
- Symptoms: Canonical URLs, analytics domain settings, and LocalBusiness image URLs default to `user.github.io` values instead of a real production domain.
- Files: `src/config/site.ts`, `README.md`, `scripts/generate-seo-assets.mjs`
- Trigger: Build or deploy without overriding site URL settings.
- Workaround: Override `SITE_URL`, `VITE_SITE_URL`, and related config before deployment.

## Security Considerations

**Hard-coded admin credential in client bundle:**
- Risk: The password is embedded in source-controlled frontend config and compared entirely in the browser.
- Files: `src/config/site.ts`, `src/components/AdminGuard.tsx`
- Current mitigation: Obscurity only; the admin link is hidden behind repeated footer clicks in `src/components/Layout.tsx`.
- Recommendations: Remove password checks from the client, move access control server-side or behind an external auth provider, and never ship credentials in frontend code.

**Analytics data access is performed directly from the browser:**
- Risk: Both writes and admin reads hit Firestore from the client. If Firestore rules are permissive, the collection can be scraped, spammed, or inflated. If rules are tightened later, analytics and admin flows break.
- Files: `src/lib/analytics.ts`, `src/lib/firebase.ts`, `src/pages/AdminPage.tsx`
- Current mitigation: None in the repository; no visible authentication or rate-limiting layer exists here.
- Recommendations: Put analytics ingestion and summary reads behind a controlled backend or serverless function, then lock Firestore rules down to least privilege.

**Third-party scripts are injected without integrity or allowlist enforcement:**
- Risk: Analytics scripts are appended at runtime from config, expanding the attack surface if the configured source is changed or compromised.
- Files: `src/components/AnalyticsLoader.tsx`, `src/config/site.ts`
- Current mitigation: Provider values are constrained by code to plausible/umami/none.
- Recommendations: Pin script sources more defensively, review CSP requirements, and prefer static markup or trusted tag management over ad hoc runtime injection.

## Performance Bottlenecks

**Admin analytics summary scales linearly with event volume:**
- Problem: The dashboard fetches up to 1000 raw events and performs all aggregation in the browser on every refresh.
- Files: `src/lib/analytics.ts`, `src/pages/AdminPage.tsx`
- Cause: `getAnalyticsSummary()` uses `getDocs(...)` with `limit(1000)` and computes counts/maps client-side.
- Improvement path: Pre-aggregate counters server-side, paginate event history separately, and fetch summary documents instead of raw event streams.

**Every route change triggers a Firestore write attempt for page views:**
- Problem: Navigation and CTA interactions attempt direct writes from the client, adding network overhead and potential failure noise to normal browsing.
- Files: `src/components/Layout.tsx`, `src/lib/analytics.ts`, `src/pages/ContactPage.tsx`, `src/pages/GalleryDetailPage.tsx`, `src/pages/PlaygroundPage.tsx`
- Cause: `trackEvent()` is called from render-driven route effects and interaction handlers, then writes each event with `addDoc(...)`.
- Improvement path: Batch or debounce low-value events, prefer a lightweight analytics endpoint, and separate product analytics from admin-reporting storage.

## Fragile Areas

**Localized route resolution and fallback behavior:**
- Files: `src/App.tsx`, `src/routing.ts`, `src/content/route-segments.json`
- Why fragile: Route matching depends on string comparisons between URL tails and locale-specific segments. Unknown routes silently redirect to localized home, which can hide broken links rather than exposing them during QA.
- Safe modification: Change route metadata and matching logic together, then manually verify each locale and deep link.
- Test coverage: No automated tests detected for routing.

**Gallery detail and catalog branching logic:**
- Files: `src/pages/GalleryDetailPage.tsx`, `src/content/index.ts`, `src/types.ts`
- Why fragile: The page multiplexes category pages, subcatalog pages, tracking, enriched granite swatches, and 404 handling in one component tree.
- Safe modification: Extract catalog and category flows into separate route-aware components before expanding content shape further.
- Test coverage: No automated tests detected for gallery rendering or category resolution.

**Content-driven UI contracts across locales:**
- Files: `src/content/locales/en.json`, `src/content/locales/et.json`, `src/content/locales/ru.json`, `scripts/validate-content.mjs`
- Why fragile: Pages assume content keys, nested arrays, and object fields exist exactly as TypeScript types expect, but the runtime source is JSON and validation is partial.
- Safe modification: Update all locale files together and run `npm run validate:content` after any content schema change.
- Test coverage: Only build-time schema/path checks exist; no page-level rendering tests detect broken localized content.

## Scaling Limits

**Firestore-backed event collection:**
- Current capacity: The UI only reads the newest 1000 events, and the admin view renders a limited recent subset from that snapshot.
- Limit: Once event volume grows, totals become partial, admin summaries become misleading, and browser-side aggregation costs rise.
- Scaling path: Introduce durable aggregate documents, archival strategy, and server-side summary queries.

**Static pre-render route generation:**
- Current capacity: The prerender script emits one HTML file per localized route from the current route list.
- Limit: As route count grows, build time and deploy artifact size increase linearly, and the approach does not naturally support large dynamic catalogs.
- Scaling path: Keep prerendering for a small brochure surface only, or move dynamic catalog/admin surfaces to runtime rendering.

## Dependencies at Risk

**Firebase browser SDK as the only analytics storage interface:**
- Risk: The app depends on direct browser access to Firestore for both event ingestion and admin reporting.
- Impact: Security, quota, and data-quality concerns are coupled to frontend delivery; outages or rules changes break user tracking and admin visibility together.
- Migration plan: Replace direct SDK access in `src/lib/analytics.ts` and `src/lib/firebase.ts` with a thin API boundary.

## Missing Critical Features

**Automated test suite:**
- Problem: No unit, integration, or end-to-end tests are present in the repository.
- Blocks: Safe refactoring of routing, localized content contracts, analytics behavior, and contact/admin flows.

**Operational monitoring for failed submissions and analytics writes:**
- Problem: Failed Firestore writes are only logged in development, and form submissions rely on a third-party POST target without repository-level observability.
- Blocks: Detecting production lead loss and analytics drift before business impact accumulates.

## Test Coverage Gaps

**Routing and locale switching:**
- What's not tested: Redirects from `/`, locale detection, localized path generation, and fallback behavior for invalid routes.
- Files: `src/App.tsx`, `src/routing.ts`, `src/components/LanguageSwitcher.tsx`
- Risk: Broken deep links or incorrect locale routing can ship silently.
- Priority: High

**Admin authentication and analytics dashboard:**
- What's not tested: Unlock behavior, access restrictions, Firestore read failures, and summary rendering logic.
- Files: `src/components/AdminGuard.tsx`, `src/pages/AdminPage.tsx`, `src/lib/analytics.ts`
- Risk: The most sensitive UI path can fail open or fail silently.
- Priority: High

**Contact and inquiry forms:**
- What's not tested: Form field requirements, tracking side effects, success/failure handling, and package-prefill behavior.
- Files: `src/pages/ContactPage.tsx`
- Risk: Lead capture regressions may go unnoticed until customers stop converting.
- Priority: High

**Gallery/catalog rendering with content variants:**
- What's not tested: Category lookup, catalog subpaths, granite palette enrichment, and 404 rendering.
- Files: `src/pages/GalleryDetailPage.tsx`, `src/content/index.ts`
- Risk: Content updates can break important browsing flows without build failures.
- Priority: Medium

**Build-time SEO and prerender outputs:**
- What's not tested: Generated sitemap/robots contents, per-route prerender output, and canonical correctness under different base paths.
- Files: `scripts/generate-seo-assets.mjs`, `scripts/prerender.mjs`, `src/components/SeoHead.tsx`
- Risk: Deployment can succeed with incorrect indexing signals or broken static output.
- Priority: Medium

---

*Concerns audit: 2026-03-21*
