# Coding Conventions

**Analysis Date:** 2026-03-21

## Naming Patterns

**Files:**
- Use `PascalCase.tsx` for React components and pages in `src/components/` and `src/pages/`, for example `src/components/Layout.tsx`, `src/components/SeoHead.tsx`, and `src/pages/ContactPage.tsx`.
- Use `camelCase.ts` for non-component modules in `src/`, for example `src/routing.ts`, `src/types.ts`, and `src/content/index.ts`.
- Use `camelCase.mjs` for Node scripts in `scripts/`, for example `scripts/validate-content.mjs`, `scripts/check-links.mjs`, and `scripts/prerender.mjs`.
- JSON locale files use lowercase locale names in `src/content/locales/`, for example `src/content/locales/ru.json`.

**Functions:**
- Use `camelCase` for helpers and event handlers, for example `resolveRouteKey` in `src/App.tsx`, `getBasename` in `src/main.tsx`, `buildLocalizedPath` in `src/routing.ts`, and `handleSelectPackage` in `src/pages/PricingPage.tsx`.
- Prefix boolean-returning helpers with `is`, `has`, or `detect` when it clarifies intent, for example `hasAdminSession` in `src/components/AdminGuard.tsx` and `detectLocale` in `src/routing.ts`.
- Component functions use `PascalCase`, for example `Layout` in `src/components/Layout.tsx` and `GalleryPage` in `src/pages/GalleryPage.tsx`.

**Variables:**
- Use `camelCase` for local variables and state, for example `selectedTierId` in `src/pages/PricingPage.tsx`, `mobileNavOpen` in `src/components/Layout.tsx`, and `referencePaths` in `scripts/validate-content.mjs`.
- Use `UPPER_SNAKE_CASE` for module-level constants, for example `CORE_NAV_KEYS` in `src/components/Layout.tsx`, `ADMIN_SESSION_KEY` in `src/components/AdminGuard.tsx`, and `MAX_FETCHED_EVENTS` in `src/lib/analytics.ts`.

**Types:**
- Use `PascalCase` for TypeScript interfaces, type aliases, and prop types, for example `LocaleContent` in `src/types.ts`, `LayoutProps` in `src/components/Layout.tsx`, and `AnalyticsSummary` in `src/lib/analytics.ts`.
- Represent unions as explicit string literal types when the allowed set is small and fixed, for example `Locale` and `RouteKey` in `src/types.ts`.

## Code Style

**Formatting:**
- No formatter configuration file is present. `.prettierrc*`, `biome.json`, and `.editorconfig` were not detected at the repository root.
- `src/` mostly follows two-space indentation and semicolon-terminated statements, for example `src/App.tsx`, `src/routing.ts`, and `src/components/SeoHead.tsx`.
- Formatting is not fully consistent across the repo. `src/pages/PricingPage.tsx` uses four-space indentation and a high volume of inline `style` objects, so follow surrounding file style when editing existing files rather than normalizing unrelated formatting.
- Prefer single quotes in TypeScript and JavaScript modules, matching `src/main.tsx`, `src/lib/analytics.ts`, and `scripts/routes.mjs`.

**Linting:**
- No ESLint configuration was detected. `eslint.config.*` and `.eslintrc*` are absent from the root.
- The nearest executable quality gate is `npm run lint:links`, which runs `scripts/check-links.mjs` and verifies localized route uniqueness.
- TypeScript strictness is enforced through `tsconfig.json` with `"strict": true`, `"moduleResolution": "Bundler"`, and `"resolveJsonModule": true`.

## Import Organization

**Order:**
1. External packages first, for example `react`, `react-router-dom`, `react-helmet-async`, or Firebase imports in `src/main.tsx`, `src/components/SeoHead.tsx`, and `src/lib/firebase.ts`.
2. Internal value imports next, grouped by relative path, for example `../content`, `../config/site`, and `../routing` in `src/pages/ContactPage.tsx`.
3. Type-only imports last using `import type`, for example `import type { Locale } from '../types';` in `src/pages/AboutPage.tsx` and `import type { Locale, RouteKey } from './types';` in `src/App.tsx`.
- CSS side-effect imports come after module imports at the app entry point, as in `src/main.tsx`.

**Path Aliases:**
- No TypeScript path aliases are configured in `tsconfig.json`.
- Use relative imports throughout the app, for example `./components/Layout` from `src/App.tsx` and `../config/site` from `src/components/AnalyticsLoader.tsx`.

## Error Handling

**Patterns:**
- Throw early for missing critical DOM prerequisites, for example `src/main.tsx` throws when the root container is missing.
- In async integrations, catch failures locally and degrade gracefully instead of crashing the UI, for example `trackEvent` in `src/lib/analytics.ts` catches Firestore write failures and logs them only in dev mode.
- For page-level async loading, use `try/catch/finally` with local error state, as in `loadSummary` inside `src/pages/AdminPage.tsx`.
- Build-time scripts fail hard with thrown `Error`s and `process.exit(1)`, as in `scripts/validate-content.mjs`, `scripts/check-links.mjs`, and `scripts/generate-seo-assets.mjs`.
- Return safe defaults when environment access is not available, for example `hasAdminSession` in `src/components/AdminGuard.tsx` and `trackEvent` in `src/lib/analytics.ts` both exit early when `window` is unavailable.

## Logging

**Framework:** `console`

**Patterns:**
- Use `console.warn` and `console.info` only behind `import.meta.env.DEV` guards for client-side diagnostics in `src/lib/analytics.ts`.
- Use `console.error` in scripts and async page loaders when the failure should be visible during development or CI, for example `scripts/validate-content.mjs`, `scripts/check-links.mjs`, and `src/pages/AdminPage.tsx`.
- Avoid pervasive runtime logging in normal UI flows. Most components in `src/components/` and `src/pages/` do not log.

## Comments

**When to Comment:**
- Comments are sparse and reserved for non-obvious behavior, for example the SSR bundling explanation in `vite.config.ts` and the delayed scroll note in `src/pages/ContactPage.tsx`.
- Prefer self-describing helper names over inline comments. Most files such as `src/routing.ts` and `src/content/index.ts` explain intent through function names rather than comment blocks.

**JSDoc/TSDoc:**
- Not used in the current codebase. No public API modules in `src/` or `scripts/` contain JSDoc/TSDoc blocks.

## Function Design

**Size:** 
- Keep helpers small and focused when they encapsulate a single transformation or lookup, as in `src/routing.ts`, `src/content/index.ts`, and `scripts/routes.mjs`.
- Larger page components are acceptable when they primarily assemble JSX and localized content, as in `src/pages/ContactPage.tsx`, `src/pages/GalleryPage.tsx`, and `src/pages/AdminPage.tsx`.

**Parameters:** 
- Type props with dedicated interfaces named `<ComponentName>Props`, for example `ContactPageProps` in `src/pages/ContactPage.tsx` and `LanguageSwitcherProps` in `src/components/LanguageSwitcher.tsx`.
- Pass `locale` explicitly through pages and shared components instead of reading it from global context, as seen throughout `src/pages/` and `src/components/Layout.tsx`.
- Prefer narrow primitive parameters for pure helpers, for example `(locale: Locale, routeKey: RouteKey)` in `src/routing.ts` and `(eventName: string, props?: Record<string, string>)` in `src/lib/analytics.ts`.

**Return Values:** 
- Return `null` for non-visual React helpers when nothing should render, as in `src/components/AnalyticsLoader.tsx`.
- Return fallback values instead of nullable results when the caller expects a stable output, for example `detectLocale` in `src/routing.ts` returns `'ru'` and `detectRouteKey` returns `'home'`.
- Use nullable returns when route resolution can fail and the caller handles it explicitly, as in `resolveRouteKey` in `src/App.tsx`.

## Module Design

**Exports:** 
- Prefer named exports across `src/` and `scripts/`. Examples include `App` from `src/App.tsx`, `siteConfig` from `src/config/site.ts`, and `getLocalizedPaths` from `scripts/routes.mjs`.
- Keep one primary responsibility per file: routing in `src/routing.ts`, content loading in `src/content/index.ts`, analytics in `src/lib/analytics.ts`, and admin access control in `src/components/AdminGuard.tsx`.

**Barrel Files:** 
- Barrel files are used sparingly. `src/content/index.ts` acts as a focused access layer for locale content, but there are no broad re-export barrels for `src/components/` or `src/pages/`.
- Continue importing concrete modules directly unless a directory already exposes a narrow entry point.

## React and UI Patterns

**Component Composition:**
- Shared chrome lives in `src/components/Layout.tsx`, while route components under `src/pages/` focus on localized page content.
- Conditional page rendering in `src/App.tsx` uses explicit route-key checks instead of a route configuration object.

**State and Effects:**
- Local state is managed with React hooks inside components, for example `useState` in `src/pages/GalleryPage.tsx`, `src/pages/PricingPage.tsx`, and `src/components/AdminGuard.tsx`.
- Side effects are placed in `useEffect` close to the state or browser API they coordinate, as in `src/components/Layout.tsx` for scroll handling and `src/pages/ContactPage.tsx` for query-param-driven form prefill.
- `useMemo` appears only where the file author chose it. It is not a repo-wide default.

**Styling:**
- Global styling is centralized in `src/styles.css`.
- Components generally rely on semantic CSS class names such as `content-panel`, `hero-secondary`, `admin-panel`, and `granite-preview-panel`.
- Inline styles are used selectively in `src/pages/PricingPage.tsx`; preserve that local pattern when making targeted changes there rather than mixing unrelated refactors into the same edit.

## Script Conventions

**Runtime:**
- Build and validation scripts in `scripts/` use ESM `.mjs` files with Node built-ins imported via the `node:` prefix, as in `scripts/validate-content.mjs` and `scripts/routes.mjs`.

**Failure Handling:**
- Scripts expose a local `run()` function and terminate through `.catch((error) => { console.error(error); process.exit(1); })`, which is the standard failure wrapper in `scripts/check-links.mjs` and `scripts/validate-content.mjs`.

**Data Access:**
- File reads use `node:fs/promises` and `path.join(projectRoot, ...)` instead of hard-coded relative paths, as in `scripts/routes.mjs` and `scripts/validate-content.mjs`.

---

*Convention analysis: 2026-03-21*
