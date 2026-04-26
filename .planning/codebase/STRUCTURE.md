# Codebase Structure

**Analysis Date:** 2026-03-21

## Directory Layout

```text
empire-granit/
├── .github/workflows/        # GitHub Pages deployment automation
├── .planning/codebase/       # Generated codebase analysis documents
├── dist/                     # Built static site output
├── public/                   # Static assets copied into the build output
├── scripts/                  # Build-time validation, SEO, and prerender scripts
├── src/                      # Application source code
├── index.html                # Vite HTML shell used by client and prerender flow
├── package.json              # Scripts and dependency manifest
├── tsconfig.json             # TypeScript compiler settings
└── vite.config.ts            # Vite bundler and base-path configuration
```

## Directory Purposes

**`.github/workflows`:**
- Purpose: Define CI/CD automation.
- Contains: GitHub Actions YAML files.
- Key files: `.github/workflows/deploy.yml`

**`.planning/codebase`:**
- Purpose: Store generated architecture, stack, testing, and concern reference docs for GSD workflows.
- Contains: Markdown analysis documents.
- Key files: `.planning/codebase/ARCHITECTURE.md`, `.planning/codebase/STRUCTURE.md`

**`public`:**
- Purpose: Hold static assets that Vite copies directly to the output site root.
- Contains: Images, documents, favicon, generated SEO files, static `404.html`.
- Key files: `public/404.html`, `public/robots.txt`, `public/sitemap.xml`, `public/images/logo.png`, `public/documents/price-guide-ru.pdf`

**`scripts`:**
- Purpose: Implement the build pipeline around the React app.
- Contains: Node ESM utilities for route enumeration, content validation, sitemap generation, prerendering, and link checks.
- Key files: `scripts/routes.mjs`, `scripts/validate-content.mjs`, `scripts/generate-seo-assets.mjs`, `scripts/prerender.mjs`, `scripts/check-links.mjs`

**`src`:**
- Purpose: Hold all runtime application code.
- Contains: React entry files, pages, shared components, site config, localized content, integration helpers, SSR entry, and shared types.
- Key files: `src/main.tsx`, `src/App.tsx`, `src/routing.ts`, `src/types.ts`

**`src/components`:**
- Purpose: Keep reusable UI shell components and small shared presentation helpers.
- Contains: Layout wrapper, SEO helper, language switcher, admin guard, analytics script loader, gallery swatch tile.
- Key files: `src/components/Layout.tsx`, `src/components/SeoHead.tsx`, `src/components/LanguageSwitcher.tsx`, `src/components/AdminGuard.tsx`

**`src/config`:**
- Purpose: Store business-level site configuration and runtime settings.
- Contains: Site identity, contacts, analytics settings, form endpoint, admin password, canonical URL defaults.
- Key files: `src/config/site.ts`

**`src/content`:**
- Purpose: Store route metadata and localized content payloads.
- Contains: Locale JSON files, route segment JSON, content loading/normalization module.
- Key files: `src/content/index.ts`, `src/content/route-segments.json`, `src/content/locales/en.json`, `src/content/locales/et.json`, `src/content/locales/ru.json`

**`src/lib`:**
- Purpose: Isolate integration and side-effect helpers from presentational components.
- Contains: Firebase initialization and analytics collection/reporting code.
- Key files: `src/lib/firebase.ts`, `src/lib/analytics.ts`

**`src/pages`:**
- Purpose: Keep route-level page implementations.
- Contains: One React component per routed page plus the hidden admin page.
- Key files: `src/pages/HomePage.tsx`, `src/pages/PricingPage.tsx`, `src/pages/GalleryPage.tsx`, `src/pages/GalleryDetailPage.tsx`, `src/pages/ContactPage.tsx`, `src/pages/AdminPage.tsx`

**`src/ssr`:**
- Purpose: Hold the server-render entry used only at build time for prerendering.
- Contains: SSR render function.
- Key files: `src/ssr/entry-server.tsx`

**`dist`:**
- Purpose: Store generated deployable output.
- Contains: Static HTML, copied assets, route directories for each locale, bundled assets.
- Key files: `dist/index.html`, `dist/ru/`, `dist/et/`, `dist/en/`

## Key File Locations

**Entry Points:**
- `src/main.tsx`: Browser bootstrap and hydration entry.
- `src/App.tsx`: Central route resolver and redirect logic.
- `src/ssr/entry-server.tsx`: Build-time SSR render entry.
- `index.html`: Vite document template with the `#root` mount target.

**Configuration:**
- `package.json`: npm scripts for dev, build, validation, SEO generation, and link checks.
- `vite.config.ts`: Base-path handling, React plugin setup, and SSR bundling exceptions.
- `tsconfig.json`: TypeScript compiler options and included source paths.
- `src/config/site.ts`: Runtime site/business config used by pages and components.

**Core Logic:**
- `src/routing.ts`: Locale and route segment helpers.
- `src/content/index.ts`: Locale-content loading and public asset URL normalization.
- `src/lib/analytics.ts`: Event tracking and Firestore summary aggregation.
- `scripts/routes.mjs`: Shared route list generation for build tooling.

**Testing:**
- Not detected. No `*.test.*`, `*.spec.*`, Jest, Vitest, or other test runner config files are present in the repository root or `src/`.

## Naming Conventions

**Files:**
- React components and pages use PascalCase filenames: `src/components/Layout.tsx`, `src/pages/HomePage.tsx`
- Non-component modules use lowercase or kebab-style names based on purpose: `src/routing.ts`, `src/types.ts`, `src/config/site.ts`, `scripts/validate-content.mjs`
- Static content files use lowercase locale or descriptive asset names: `src/content/locales/en.json`, `public/images/granite-textures/black.png`

**Directories:**
- Source directories are short lowercase nouns: `src/pages`, `src/components`, `src/lib`, `src/config`
- Generated or tool-owned directories are also lowercase: `dist`, `public`, `scripts`, `.planning/codebase`

## Where to Add New Code

**New Feature:**
- Primary code: add a new route-level component in `src/pages/` if it maps to a URL, or a shared component in `src/components/` if multiple pages reuse it.
- Route wiring: update `src/types.ts` with any new `RouteKey`, `src/content/route-segments.json` with translated segments, `src/routing.ts` if helper behavior changes, and `src/App.tsx` to resolve and render the new page.
- Localized copy: extend each file in `src/content/locales/` and keep the shape aligned with `scripts/validate-content.mjs`.
- Tests: Not applicable in the current structure because no automated test suite is present.

**New Component/Module:**
- Implementation: place reusable UI in `src/components/` and integration helpers or non-UI side effects in `src/lib/`.
- Shared types: extend `src/types.ts` when the component introduces new content or domain contracts.

**Utilities:**
- Shared helpers used at runtime: `src/lib/` or a focused top-level source module like `src/routing.ts`
- Build-only helpers: `scripts/`

## Special Directories

**`src/content/locales`:**
- Purpose: Store the three locale content payloads used at runtime.
- Generated: No
- Committed: Yes

**`public/images/granite-textures`:**
- Purpose: Store granite texture assets referenced by `src/components/GraniteSwatchTile.tsx` and gallery pages.
- Generated: No
- Committed: Yes

**`dist`:**
- Purpose: Store deployable static output for GitHub Pages.
- Generated: Yes
- Committed: Yes, currently present in the repository and reflects built artifacts.

**`.planning/codebase`:**
- Purpose: Store architecture and codebase analysis documents consumed by GSD planning/execution flows.
- Generated: Yes
- Committed: Yes

## Placement Guidance

**Adding a new localized route:**
- Define the route key in `src/types.ts`.
- Add localized segments in `src/content/route-segments.json`.
- Extend content in every file under `src/content/locales/`.
- Render the route from `src/App.tsx`.
- If the route must be statically published, no extra route registry is needed beyond `src/content/route-segments.json` because `scripts/routes.mjs` reads from that file.

**Adding a new static asset:**
- Place publicly addressable images/documents in `public/`.
- Reference them from locale JSON or components using root-relative paths, then allow `src/content/index.ts` or `import.meta.env.BASE_URL` consumers to normalize the final URL.

**Adding build automation:**
- Put new build/publish scripts in `scripts/`.
- Wire them through `package.json`.
- If CI must run them, update `.github/workflows/deploy.yml`.

---

*Structure analysis: 2026-03-21*
