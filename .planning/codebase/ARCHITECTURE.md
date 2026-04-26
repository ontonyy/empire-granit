# Architecture

**Analysis Date:** 2026-03-21

## Pattern Overview

**Overall:** Vite-powered React single-page application with static pre-rendering and a thin SSR entry for build-time HTML generation.

**Key Characteristics:**
- `src/main.tsx` bootstraps one client application tree and switches between `hydrateRoot` and `createRoot`, so the same React app supports both prerendered HTML and client-only dev rendering.
- `src/App.tsx` uses imperative route resolution based on locale and localized path segments instead of a centralized route object or file-system router.
- `scripts/validate-content.mjs`, `scripts/generate-seo-assets.mjs`, `scripts/routes.mjs`, and `scripts/prerender.mjs` extend the app into a build pipeline that validates content and emits static HTML into `dist/`.

## Layers

**Build and Deployment Layer:**
- Purpose: Validate localized content, generate SEO assets, prerender static routes, and publish the built site.
- Location: `package.json`, `vite.config.ts`, `scripts/routes.mjs`, `scripts/validate-content.mjs`, `scripts/generate-seo-assets.mjs`, `scripts/prerender.mjs`, `.github/workflows/deploy.yml`
- Contains: npm scripts, Vite config, route enumeration utilities, static generation scripts, GitHub Pages workflow.
- Depends on: Node.js filesystem APIs, the client SSR bundle from `src/ssr/entry-server.tsx`, localized route metadata from `src/content/route-segments.json`
- Used by: Local `npm run build` and GitHub Actions deployment.

**Application Shell Layer:**
- Purpose: Mount the React application, resolve locale-aware routes, and wrap pages in shared chrome.
- Location: `src/main.tsx`, `src/App.tsx`, `src/components/Layout.tsx`, `src/components/LanguageSwitcher.tsx`, `src/components/SeoHead.tsx`, `src/components/AnalyticsLoader.tsx`
- Contains: React root setup, router definitions, locale redirect logic, shared header/footer, SEO tags, analytics script injection.
- Depends on: `react-router-dom`, `react-helmet-async`, `src/routing.ts`, `src/content/index.ts`, `src/config/site.ts`, `src/lib/analytics.ts`
- Used by: Every page component and the SSR entry in `src/ssr/entry-server.tsx`.

**Page Feature Layer:**
- Purpose: Render user-facing sections for each localized route and implement page-specific interactions.
- Location: `src/pages/HomePage.tsx`, `src/pages/AboutPage.tsx`, `src/pages/PricingPage.tsx`, `src/pages/GalleryPage.tsx`, `src/pages/GalleryDetailPage.tsx`, `src/pages/FaqPage.tsx`, `src/pages/PlaygroundPage.tsx`, `src/pages/ContactPage.tsx`, `src/pages/PrivacyPage.tsx`, `src/pages/AdminPage.tsx`
- Contains: Page markup, localized copy selection, query-param handling, CTA navigation, analytics events, admin dashboard UI.
- Depends on: Shared components from `src/components/*`, content access via `src/content/index.ts`, route helpers in `src/routing.ts`, types from `src/types.ts`, analytics functions in `src/lib/analytics.ts`
- Used by: `src/App.tsx` through conditional rendering in `LocaleRouteResolver` and `AdminRoute`.

**Content and Configuration Layer:**
- Purpose: Store locale content, route translations, and business/runtime configuration.
- Location: `src/content/index.ts`, `src/content/locales/en.json`, `src/content/locales/et.json`, `src/content/locales/ru.json`, `src/content/route-segments.json`, `src/config/site.ts`, `src/types.ts`
- Contains: Locale JSON payloads, route segment translations, contact/business settings, analytics provider settings, TypeScript interfaces for content and routing.
- Depends on: Vite `import.meta.env` for base URL and runtime site URL overrides.
- Used by: Pages, layout components, SEO tags, route generation utilities, validation scripts.

**Integration Layer:**
- Purpose: Talk to external browser/runtime services for analytics, forms, and Firestore-backed admin reporting.
- Location: `src/lib/firebase.ts`, `src/lib/analytics.ts`, `src/components/AnalyticsLoader.tsx`, `src/components/AdminGuard.tsx`, `src/pages/ContactPage.tsx`, `src/pages/AdminPage.tsx`
- Contains: Firebase initialization, Firestore writes/reads, external analytics dispatch, localStorage-based admin gating, form POST wiring.
- Depends on: Firebase SDK, browser globals, `siteConfig` from `src/config/site.ts`
- Used by: Layout CTA tracking, pricing/gallery/contact interactions, admin dashboard data loading.

**Presentation Assets Layer:**
- Purpose: Provide static assets and generated publishable output.
- Location: `public/`, `public/images/`, `public/documents/`, `public/404.html`, `public/sitemap.xml`, `public/robots.txt`, `dist/`
- Contains: Images, PDFs, generated sitemap/robots files, static 404 page, build artifacts.
- Depends on: Build scripts for generated files and Vite public asset copying.
- Used by: Client UI, SEO output, GitHub Pages deployment artifact.

## Data Flow

**Localized Route Rendering:**

1. `src/main.tsx` creates or hydrates the React root with `BrowserRouter` and `HelmetProvider`.
2. `src/App.tsx` reads `:locale` and `*` path params, validates the locale against `LOCALES` from `src/routing.ts`, and maps localized URL segments back to a `RouteKey`.
3. `src/components/Layout.tsx` wraps the selected page and uses `src/components/SeoHead.tsx` plus `src/components/LanguageSwitcher.tsx` to derive canonical links, alternate locale links, navigation labels, and shared CTA behavior.
4. The page component reads locale-specific content from `src/content/index.ts`, combines it with config from `src/config/site.ts`, and renders route-specific UI.

**Localized Content Resolution:**

1. `src/content/index.ts` imports all locale JSON files and stores them in a typed `Record<Locale, LocaleContent>`.
2. `getLocaleContent()` normalizes asset URLs with `import.meta.env.BASE_URL` so JSON-authored image paths work under repo subpaths on GitHub Pages.
3. Page and component modules request content lazily by locale instead of prop-drilling large content objects through the tree.

**Analytics and Admin Reporting:**

1. UI interactions call `trackEvent()` from `src/lib/analytics.ts` with event names and string props.
2. `trackEvent()` writes an event document to Firestore via `src/lib/firebase.ts`, then optionally forwards the same event to Plausible or Umami if the provider is configured in `src/config/site.ts`.
3. `src/pages/AdminPage.tsx` calls `getAnalyticsSummary()` to fetch up to 1000 recent Firestore events, aggregate counts in-memory, and render admin summaries after `src/components/AdminGuard.tsx` unlocks the page.

**Static Build and Pre-render Flow:**

1. `npm run build` in `package.json` runs `scripts/validate-content.mjs` before the Vite build to ensure all locale JSON files share the same shape and route segments are unique per locale.
2. `scripts/generate-seo-assets.mjs` asks `scripts/routes.mjs` for every localized route and writes `public/sitemap.xml` and `public/robots.txt`.
3. Vite builds the client bundle and a separate SSR bundle from `src/ssr/entry-server.tsx`.
4. `scripts/prerender.mjs` imports `dist-ssr/entry-server.js`, renders each localized route to HTML, injects head tags from `react-helmet-async`, writes route-specific `index.html` files into `dist/`, and deletes `dist-ssr/`.

**State Management:**
- Global application state is minimal and implicit. Locale and route state come from `react-router-dom`, shared configuration comes from module-level singletons in `src/config/site.ts` and `src/content/index.ts`, and transient UI state stays local inside components like `src/components/Layout.tsx`, `src/pages/PricingPage.tsx`, `src/pages/GalleryPage.tsx`, and `src/pages/ContactPage.tsx`.

## Key Abstractions

**Locale + RouteKey Routing Model:**
- Purpose: Represent site navigation in a locale-independent way and translate between URL segments and logical routes.
- Examples: `src/routing.ts`, `src/App.tsx`, `src/content/route-segments.json`, `src/types.ts`
- Pattern: Route keys are stable internal identifiers; locale-specific segments live in JSON and are resolved at runtime and build time.

**LocaleContent Content Contract:**
- Purpose: Define the required content schema shared by all locale JSON files.
- Examples: `src/types.ts`, `src/content/index.ts`, `src/content/locales/en.json`, `scripts/validate-content.mjs`
- Pattern: One reference interface plus schema-shape validation in the build pipeline.

**Layout Shell:**
- Purpose: Centralize page frame concerns such as navigation, scroll handling, analytics page views, SEO, footer CTAs, and admin link reveal behavior.
- Examples: `src/components/Layout.tsx`, `src/components/SeoHead.tsx`, `src/components/LanguageSwitcher.tsx`, `src/components/AnalyticsLoader.tsx`
- Pattern: Pages render only route-specific content; the shell owns cross-page browser behavior.

**Build-time Route Enumerator:**
- Purpose: Keep the route list consistent between runtime routing, sitemap generation, and prerendering.
- Examples: `scripts/routes.mjs`, `scripts/generate-seo-assets.mjs`, `scripts/prerender.mjs`
- Pattern: A small shared Node utility reads `src/content/route-segments.json` and returns localized URLs.

**Client-side Analytics Store:**
- Purpose: Capture operational site events and expose a summarized admin view without a separate backend service.
- Examples: `src/lib/analytics.ts`, `src/lib/firebase.ts`, `src/pages/AdminPage.tsx`
- Pattern: Browser writes directly to Firestore and the admin page aggregates raw event documents client-side.

## Entry Points

**Client Entry Point:**
- Location: `src/main.tsx`
- Triggers: Browser loading `index.html` in dev, preview, or static deployment.
- Responsibilities: Resolve router basename from `import.meta.env.BASE_URL`, create the React root, and hydrate prerendered markup when present.

**SSR Render Entry Point:**
- Location: `src/ssr/entry-server.tsx`
- Triggers: Vite SSR build output consumed by `scripts/prerender.mjs`
- Responsibilities: Render the React tree with `StaticRouter`, collect helmet head tags, and return serialized HTML fragments for route-specific static pages.

**Application Router Entry Point:**
- Location: `src/App.tsx`
- Triggers: Every client-side and prerendered route render.
- Responsibilities: Redirect unsupported paths, resolve localized segments to logical pages, branch between standard routes and the hidden admin route.

**Static Generation Entry Point:**
- Location: `scripts/prerender.mjs`
- Triggers: `npm run build`
- Responsibilities: Load the generated SSR bundle, render each localized route, and write static HTML files into `dist/`.

**SEO Asset Generation Entry Point:**
- Location: `scripts/generate-seo-assets.mjs`
- Triggers: `npm run generate:seo` and `npm run build`
- Responsibilities: Emit `public/sitemap.xml` and `public/robots.txt` based on current localized routes.

**Deployment Entry Point:**
- Location: `.github/workflows/deploy.yml`
- Triggers: Pushes to `main` or `master`, and manual workflow dispatch.
- Responsibilities: Install dependencies, build the site with GitHub Pages base-path env vars, upload `dist/`, and deploy to GitHub Pages.

## Error Handling

**Strategy:** Fail fast during boot and build, but degrade quietly for non-critical client integrations.

**Patterns:**
- `src/main.tsx` throws immediately if `#root` is missing, treating boot failure as fatal.
- `scripts/validate-content.mjs`, `scripts/generate-seo-assets.mjs`, and `scripts/prerender.mjs` terminate the Node process with `process.exit(1)` when validation or generation fails.
- `src/App.tsx` redirects invalid locales and unknown localized segments back to safe default routes instead of showing a 404 page inside the SPA.
- `src/lib/analytics.ts` swallows Firestore write failures in production and logs warnings only in development, so analytics outages do not block the UI.
- `src/pages/AdminPage.tsx` catches Firestore read failures and surfaces a localized error banner while keeping the page interactive.

## Cross-Cutting Concerns

**Logging:** Minimal browser and script logging. Build scripts print success/error messages to stdout/stderr, `src/lib/analytics.ts` uses `console.warn` and `console.info` only in dev, and `src/pages/AdminPage.tsx` uses `console.error` for failed summary loads.

**Validation:** Content schema validation is centralized in `scripts/validate-content.mjs`. Runtime route validity is enforced in `src/App.tsx` by checking the locale and matching route segments through `src/routing.ts`.

**Authentication:** No server-side auth layer is present. `src/components/AdminGuard.tsx` performs client-only password checking against `siteConfig.admin.password` and persists unlock state in `localStorage`.

**SEO:** `src/components/SeoHead.tsx` generates per-route metadata, canonical URLs, alternate locale links, and JSON-LD. `scripts/generate-seo-assets.mjs` complements this with sitemap and robots generation.

**Deployment Base Path:** `vite.config.ts`, `src/main.tsx`, `src/content/index.ts`, and `src/components/SeoHead.tsx` all derive URLs from `BASE_URL`/`BASE_PATH`, which keeps routing, asset lookup, and canonical links aligned for GitHub Pages project-site hosting.

---

*Architecture analysis: 2026-03-21*
