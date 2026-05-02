# empire-granit

Multilingual funeral home website built with React + TypeScript + Vite, with static pre-rendering and GitHub Pages deployment.

## What Is Implemented

- 3 locales: Russian (`/ru/...`), Estonian (`/et/...`), English (`/en/...`)
- Root redirect from `/` to `/ru/`
- Language switcher that preserves current page context
- Core pages in all locales:
  - Home
  - About Company
  - Services
  - Works Gallery
  - Playground (preset configurator)
  - Contact + Address + Map + Inquiry Form
  - Privacy Policy
- Contact channels and CTA tracking:
  - Phone
  - Email
  - WhatsApp
  - Embedded map
- Inquiry form with:
  - Formspree-compatible endpoint
  - Honeypot field (`company`)
  - Consent checkbox + privacy notice
- Content architecture:
  - Locale JSON files in `src/content/locales`
  - Shared route segment config in `src/content/route-segments.json`
  - Shared business/contact/analytics config in `src/config/site.ts`
- SEO baseline:
  - Per-page and per-locale metadata
  - Canonical + hreflang
  - Open Graph tags
  - Schema.org LocalBusiness JSON-LD
  - Generated `sitemap.xml`
  - Generated `robots.txt`
- Build pipeline extras:
  - Content schema consistency validation across locales
  - Localized route uniqueness checks
  - Static pre-render step for all localized routes
- GitHub Pages deployment workflow in `.github/workflows/deploy.yml`

## Tech Stack

- React 18
- TypeScript
- Vite
- React Router
- React Helmet Async

## Project Structure

- `src/App.tsx`: localized route resolver and root redirect
- `src/components/Layout.tsx`: shared header/footer/layout, nav, CTA
- `src/components/LanguageSwitcher.tsx`: route-preserving language switch
- `src/components/SeoHead.tsx`: canonical/hreflang/OG/JSON-LD
- `src/pages/*`: page implementations
- `scripts/validate-content.mjs`: locale schema + route segment checks
- `scripts/generate-seo-assets.mjs`: sitemap + robots generation
- `scripts/prerender.mjs`: pre-render localized routes into static HTML
- `.github/workflows/deploy.yml`: Pages CI/CD
- `src/styles/tokens.css`: Design tokens + primitive base classes
- `src/components/ui/`: Reusable design-system primitives

## Design System

Editorial, respectful, calm — references Aesop, MUJI, Salvatori. Tokens are the
single source of truth; components must reference tokens via `var(--token-name)`
rather than hex literals.

### Tokens (`src/styles/tokens.css`)

- **Surfaces**: `--bg-primary`, `--bg-surface`, `--bg-surface-warm`
- **Text**: `--text-primary`, `--text-secondary`, `--text-muted`
- **Accents**: `--accent-bronze`, `--accent-stone`
- **Borders**: `--border-subtle`, `--border-strong`
- **CTA**: `--cta-dark` (warm dark stone, not pure black)
- **Spacing scale (8px base)**: `--space-1`..`--space-8`
- **Radii**: `--radius-sm` (8), `--radius-md` (12), `--radius-lg` (24)
- **Type**: `--font-display` (Cinzel), `--font-body` (Inter), fluid `--fs-h1`/`--fs-h2`/`--fs-h3` via `clamp()`
- **Eyebrow rules**: small caps, bronze accent, `letter-spacing: 0.15em`, `0.75rem`

### Primitives (`src/components/ui/`)

| Primitive | Purpose |
|-----------|---------|
| `<DisplayHeading level={1\|2\|3}>` | Display serif headings (sentence case, no small-caps) |
| `<Eyebrow>` | Small-caps tracked label above a heading |
| `<Card to=… imageSrc imageAlt title description cta>` | Catalog card — interactive variant when `to`/`href` is passed |
| `<Button variant="primary" \| "ghost" as="button" \| "router-link" \| "a">` | Discriminated-union button |
| `<SwatchGrid swatches selectedId onSelect>` | Granite swatch picker |
| `<Breadcrumb items separator>` | `Catalog / Borders`-style trail with `aria-current` on the leaf |

Compose page sections from these primitives. Do not hardcode colors, sizes, or
border radii in component-level CSS — extend `tokens.css` instead.

### Accessibility

- Semantic landmarks (`<main>`, `<nav>`, `<article>`, `<section>`).
- Focus-visible outline: `2px solid var(--accent-bronze)`, offset `2px`.
- Color contrast verified against WCAG AA on the warm cream palette.
- Breadcrumb leaf carries `aria-current="page"`.

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start dev server:
   ```bash
   npm run dev
   ```

## Build and Validation

- Validate locale/schema consistency:
  ```bash
  npm run validate:content
  ```
- Generate SEO artifacts:
  ```bash
  npm run generate:seo
  ```
- Full build (validate + SEO + client build + SSR bundle + pre-render):
  ```bash
  npm run build
  ```

## Required Runtime Configuration

Update placeholders before production launch:

- `src/config/site.ts`
  - `defaultSiteUrl`
  - `contacts`
  - `localBusiness`
  - `analytics` provider/domain/script
  - `formEndpoint` (Formspree/Getform endpoint)

Optional environment variables for CI/local build:

- `SITE_URL` (used for sitemap/robots absolute URLs)
- `BASE_PATH` (GitHub Pages project site base path)
- `VITE_SITE_URL` (used for runtime canonical URL generation)

## Notes

- This project is configured for GitHub Pages project site mode (`/<repo>/`).
- If a custom domain is added later, update `SITE_URL`, `VITE_SITE_URL`, and SEO/business URLs accordingly.
