# empire-granit

## Multilingual Funeral Home Website Plan (GitHub Pages)

### Project Goal
Build a static website for a funeral home business that offers monuments, funerals, and related services.
The website must support 3 languages:
- Russian (primary)
- Estonian
- English

### Tech Stack
- React
- TypeScript
- Vite
- Static pre-rendering (SSG output) for SEO-friendly pages
- Deployment to GitHub Pages (project site mode)

### Core Pages (v1)
1. Home
2. About Company
3. Services (monuments, funerals, other offers)
4. Works Gallery (examples of completed and possible work)
5. Playground (preset configurator to preview different monument forms/options)
6. Contact + Address (phone, email, WhatsApp, map, inquiry form)
7. Privacy Policy

### URL and Language Strategy
- Localized path format:
  - `/ru/...`
  - `/et/...`
  - `/en/...`
- Root `/` redirects to `/ru/`
- Language switcher keeps current page context when possible

### Contact and Inquiry
- Contact methods:
  - Phone
  - Email
  - WhatsApp
  - Google Maps location
- Contact form:
  - Powered by Formspree/Getform
  - Anti-spam: honeypot + provider rate limiting
  - Includes user consent checkbox and privacy notice

### Content Management
- Store page and section content in structured JSON files per locale
- Keep shared config (contacts, links, map embed, metadata defaults) in common config files
- Validate content schema in CI to catch missing translation keys

### SEO Baseline (Local SEO)
- Per-language metadata (title/description)
- Canonical + hreflang tags
- Open Graph metadata
- Schema.org LocalBusiness JSON-LD
- `sitemap.xml` for all language routes
- `robots.txt`

### Visual Direction
- Respectful modern classic style
- Calm, muted palette
- Clear hierarchy and readable typography
- Minimal motion and accessible interaction states

### Analytics
- Privacy-first analytics (Plausible or Umami)
- Track essential events only:
  - Contact form submit
  - Phone click
  - WhatsApp click
  - Playground configuration interactions

### Public Interfaces / Types (Planned)
- `Locale = 'ru' | 'et' | 'en'`
- Content entities:
  - `ServiceOffer`
  - `WorkExample`
  - `PlaygroundOption`
  - `ContactInfo`
  - `SeoMeta`
- Form payload fields:
  - `name`, `phone`, `email?`, `serviceType`, `message`, `locale`, `consent`, `company` (honeypot)

### Delivery Phases
1. Scaffold app, routing, localization paths, GitHub Pages deploy workflow
2. Add shared layout, header/footer, and language switcher
3. Build all core pages with localized content
4. Implement works gallery and preset playground
5. Integrate contact form provider + WhatsApp + map
6. Add SEO artifacts and metadata
7. QA: accessibility, mobile, broken links, deployment validation

### Acceptance Criteria
- All pages available in RU/ET/EN
- Language switching works with route preservation
- Contact form submits successfully and validates required fields
- Playground updates preview according to selected presets
- SEO metadata and sitemap generated for all localized routes
- GitHub Pages deployment serves routes and assets correctly

### Assumptions and Defaults
- Hosting starts as GitHub Pages project site (`https://<user>.github.io/<repo>/`)
- Primary/default language is Russian
- Custom domain can be added later
- Mixed real photos + placeholders are acceptable for v1
- Privacy page included in v1; terms/cookie pages may be added later
