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
