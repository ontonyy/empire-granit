# Technology Stack

**Analysis Date:** 2026-03-21

## Languages

**Primary:**
- TypeScript - Main application code under `src/components/*.tsx`, `src/pages/*.tsx`, `src/lib/*.ts`, and `src/config/site.ts`.
- TSX / JSX via React - UI rendering in `src/pages/*.tsx`, `src/components/*.tsx`, and SSR entry points referenced by `package.json` and `scripts/prerender.mjs`.

**Secondary:**
- JavaScript (ES modules, `.mjs`) - Build and validation automation in `scripts/validate-content.mjs`, `scripts/generate-seo-assets.mjs`, `scripts/prerender.mjs`, and `scripts/routes.mjs`.
- YAML - GitHub Actions pipeline in `.github/workflows/deploy.yml`.
- JSON - Package/runtime configuration in `package.json`, `package-lock.json`, `tsconfig.json`, and content data under `src/content/locales/*.json`.

## Runtime

**Environment:**
- Node.js 20 in CI, configured in `.github/workflows/deploy.yml`.
- Browser runtime for the client React app built by Vite from `src/`.

**Package Manager:**
- npm, inferred from `package-lock.json` and `npm` scripts in `package.json`.
- Lockfile: present at `package-lock.json`.

## Frameworks

**Core:**
- React 18 (`react`, `react-dom`) - Component runtime for the site in `src/pages/*.tsx` and `src/components/*.tsx`.
- React Router DOM 6 - Client routing and locale-aware navigation in `src/App.tsx` and page navigation files such as `src/pages/AdminPage.tsx`.
- Vite 6 - Dev server and bundler configured by `vite.config.ts`.

**Testing:**
- Not detected. No Jest, Vitest, Playwright, Cypress, or test files are present in the repository root or under `src/`.

**Build/Dev:**
- `@vitejs/plugin-react` - React integration for Vite in `vite.config.ts`.
- TypeScript 5 - Type-checking and transpilation inputs defined in `tsconfig.json`.
- Custom Node build scripts - Content validation, SEO asset generation, route enumeration, and static prerendering in `scripts/validate-content.mjs`, `scripts/generate-seo-assets.mjs`, `scripts/routes.mjs`, and `scripts/prerender.mjs`.

## Key Dependencies

**Critical:**
- `react` / `react-dom` - Core UI framework for all pages and components in `src/pages/*.tsx` and `src/components/*.tsx`.
- `react-router-dom` - Route resolution and navigation between localized pages in `src/App.tsx` and page components using router hooks.
- `react-helmet-async` - Head management for SEO and SSR, referenced by the Vite SSR setting in `vite.config.ts` and described in `README.md`.
- `firebase` - Firebase app initialization and Firestore analytics storage in `src/lib/firebase.ts` and `src/lib/analytics.ts`.

**Infrastructure:**
- `vite` - Local development server and production bundling from `package.json`.
- `typescript` - Static typing across `src/` and `scripts/**/*.mjs` via `tsconfig.json`.
- `@types/react`, `@types/react-dom` - React type definitions for the TypeScript app.

## Configuration

**Environment:**
- Build-time environment variables are consumed in `vite.config.ts`, `scripts/generate-seo-assets.mjs`, and `src/config/site.ts`.
- `SITE_URL` is used in `scripts/generate-seo-assets.mjs` to generate absolute sitemap and robots URLs.
- `BASE_PATH` is used in `vite.config.ts` and `scripts/generate-seo-assets.mjs` for GitHub Pages project-site base path support.
- `VITE_SITE_URL` is used in `src/config/site.ts` for runtime canonical URL generation.
- `GITHUB_ACTIONS` and `GITHUB_REPOSITORY` are consumed in `vite.config.ts` to derive the deployment base path in CI.
- `.env` files are not detected by name in the repository root scan.

**Build:**
- Vite config lives in `vite.config.ts`.
- TypeScript compiler config lives in `tsconfig.json`.
- npm scripts are defined in `package.json`:
  - `npm run dev`
  - `npm run build`
  - `npm run preview`
  - `npm run validate:content`
  - `npm run generate:seo`
  - `npm run lint:links`
- Static SEO artifacts are generated into `public/` by `scripts/generate-seo-assets.mjs`.
- Static HTML prerender output is produced from `dist-ssr/entry-server.js` into `dist/` by `scripts/prerender.mjs`.

## Platform Requirements

**Development:**
- Node.js and npm are required to run `package.json` scripts.
- A browser environment is required for client-side analytics loader logic in `src/components/AnalyticsLoader.tsx` and the admin session gate in `src/components/AdminGuard.tsx`.

**Production:**
- Static hosting on GitHub Pages via `.github/workflows/deploy.yml`.
- The build produces static assets under `dist/` and relies on client-side React plus prerendered route HTML.

---

*Stack analysis: 2026-03-21*
