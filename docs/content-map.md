# Content Map

Source of truth: routed React pages, route segment config, shared layout, and locale content under `src/content`.

## Global Routing

- `/` redirects to `/ru/`; unknown locale or path redirects to Russian home or current-locale home.
- Locales: `ru`, `et`, `en`.
- Localized routes:
  - `home`: `/ru/`, `/et/`, `/en/`
  - `about`: `/ru/o-kompanii`, `/et/meist`, `/en/about`
  - `pricing`: `/ru/ceny`, `/et/hinnakiri`, `/en/pricing`
  - `memorials`: `/ru/pamyatniki`, `/et/hauakivid`, `/en/memorials`
  - `materials`: `/ru/materialy`, `/et/materjalid`, `/en/materials`
  - `portfolio`: `/ru/raboty`, `/et/portfoolio`, `/en/portfolio`
  - `process`: `/ru/process`, `/et/protsess`, `/en/process`
  - `preview`: `/ru/preview`, `/et/eelvaade`, `/en/preview`
  - `restorationInstallation`: `/ru/uslugi/restavratsiya-ustanovka`, `/et/teenused/taastamine-paigaldus`, `/en/services/restoration-installation`
  - `faq`: `/ru/voprosy`, `/et/kkk`, `/en/faq`
  - `playground`: `/ru/konfigurator`, `/et/konfiguraator`, `/en/playground`
  - `contact`: `/ru/kontakty`, `/et/kontakt`, `/en/contact`
  - `privacy`: `/ru/politika-konfidentsialnosti`, `/et/privaatsuspoliitika`, `/en/privacy-policy`
- Admin route: `/__empire-admin` redirects to `/ru/__empire-admin`; localized admin lives at `/:locale/__empire-admin`.
- Memorial detail subpaths reuse `memorials`: `/:locale/<memorials>/<categoryId>`.
- Electronic catalog subpaths use `/:locale/<memorials>/catalog/<subcategoryId>`.

## Shared Layout

- Header: logo home link, phone action, language switcher, mobile menu, core navigation.
- Footer: logo/intro, core navigation plus about/privacy, email, address/map link, hours, optional phone link, hidden admin reveal after repeated footer brand clicks.
- Main content wrapper: SEO head, analytics loader, skip link, page view tracking, reveal-on-scroll, hash scroll.
- Floating call button appears on non-home pages.

## Pages

### Home

Purpose: primary sales entry for monument work, catalog discovery, configurator teaser, service-area proof, contact conversion.

Sections:
- Hero: localized label/title/lead, primary inquiry CTA, secondary CTA, highlights.
- Trust bar: trust metrics.
- Process preview: brief steps from inquiry to result.
- Catalog preview: memorial/category teasers with CTA into memorials/catalog.
- Materials/options: material and option overview.
- Configurator teaser: preview/configuration benefits and CTA.
- Guarantee/care: care, warranty, upkeep points.
- Service area: supported locations/area notes.
- Contact banner: inquiry conversion.
- Home FAQ: selected questions with CTA to full FAQ.

### About

Purpose: company story, workshop credibility, service area, contact path.

Sections:
- Hero: kicker, title, lead, workshop image.
- Story band: company heading and body paragraphs.
- Detail cards: numbered company points.
- Service area: area title/body and bullet points.
- Contact block: address, phone, contact-page CTA, email CTA.

### Pricing

Purpose: package comparison and conversion to contact with selected package context.

Sections:
- Hero: heading and intro.
- Pricing tiers: tier cards with price, best-for, included items, affects label, select/view tracking, purchase CTA.
- Bottom note: pricing caveat.
- Benefits: value/benefit cards.

### Memorials

Purpose: catalog/category landing for memorial products.

Sections:
- Hero: memorial nav title and SEO/gallery description.
- Top categories grid: merged gallery categories plus catalog categories, limited to six, each linking to category detail or catalog subcategory.

Detail behavior:
- `/<memorials>/<categoryId>` opens gallery detail if `categoryId` matches gallery category.
- `/<memorials>/catalog/<subcategoryId>` opens electronic catalog subcategory if `subcategoryId` matches catalog category.
- Missing detail category shows 404 message and back-to-gallery link.

Known RU category IDs from content:
- Gallery categories: `monuments`, `framing`, `exclusive`, `landscaping`.
- Catalog categories: `monuments`, `framing`, `benches`, `tables`, `decor`.

### Gallery Detail

Purpose: explain one gallery category and route user toward consultation/catalog.

Sections:
- Breadcrumb: gallery root and category title.
- Hero: category title, description, image.
- Granite palette: shown when category has swatches.
- Detail sections: advantages/features and services/options lists.
- CTA: gallery detail inquiry block.
- Electronic catalog: featured catalog categories from category config, fallback first three catalog categories.

### Electronic Catalog Subcategory

Purpose: show one catalog subcategory and request similar products.

Sections:
- Breadcrumb: catalog root and subcategory title.
- Hero: electronic catalog eyebrow, title, description, image.
- Granite palette: shown when subcategory has swatches.
- Catalog status banner: electronic catalog status title/body.
- Product grid: product cards with image, title, price, CTA to contact.

### Materials

Purpose: educate material, finish, engraving, and comparison decisions before inquiry.

Sections:
- Hero: materials eyebrow, heading, intro.
- Granite selection: swatch-backed material cards with description, best-for, note.
- Finishes: finish cards with look and use.
- Engraving: text/portrait/symbol options with method and use.
- Comparison: material type strengths and considerations.
- CTA: contact link for material advice.

### Portfolio

Purpose: show completed works and route similar-project inquiries.

Sections:
- Hero: portfolio eyebrow, heading, intro.
- Work grid: image, location, title, summary, CTA to contact with `ref=<workId>`.

### Process

Purpose: explain order workflow and reduce uncertainty before inquiry.

Sections:
- Hero: process eyebrow, heading, intro.
- Story steps: image plus roman-numbered step title and paragraphs.
- Consultation CTA: inquiry title/body and contact link.

### Preview

Purpose: interactive 2D memorial concept builder with shareable/savable config.

Sections:
- Hero: preview eyebrow, heading, intro.
- Stepper: localized steps, first two marked active.
- Preview stage: SVG memorial canvas with selected shape, stone texture/color, finish, lettering, inscription, add-ons.
- Save/share card: copy current config into preview URL, consult via contact URL with encoded config.
- Controls: shape grid, stone grid, finish segmented control, inscription name/dates, lettering segmented control, add-on toggles.

Config:
- Reads `?config=<encoded>` from URL.
- Writes encoded config into preview and contact links.

### Restoration And Installation

Purpose: sell installation, restoration, and site improvement services.

Sections:
- Hero: eyebrow, heading, intro.
- Service cards: installation, restoration, site improvement with body and points.
- Assessment block: what must be clarified before work.
- Before/after slider: optional visual comparison with range control.
- Work sequence: assessment/estimate/work cards.
- CTA: contact link for site assessment.

### FAQ

Purpose: answer common questions and route unresolved cases to contact.

Sections:
- Hero: heading and intro.
- Accordion: localized questions/answers; first item open by default.
- Contact CTA: link to contact page.

### Playground

Purpose: older/alternate interactive configurator with presets, form controls, 3D-style preview panel, and analytics events.

Sections:
- Heading and intro.
- Presets: apply predefined option sets and show preset note.
- Config form: option selectors and view-angle control.
- Preview panel: localized preview based on current selection and view angle.

### Contact

Purpose: collect inquiries, show direct contact details, and provide map/location.

Sections:
- Hero: heading and intro.
- Intent/details card: intent list, email, phone, hours.
- Contact form: localized labels, assist copy, privacy notice, loading/success/error/rate-limit states.
- Address card: physical address.
- Map: embedded map iframe.

### Privacy

Purpose: summarize privacy policy in localized card form.

Sections:
- Hero: kicker, heading, intro.
- Privacy cards: numbered privacy entries.

### Admin

Purpose: protected analytics dashboard for site activity.

Sections:
- Guard/login: wrapped by `AdminGuard`.
- Header: admin title/body, refresh, site link, logout.
- Stats: page views, phone clicks, WhatsApp clicks, form submissions.
- Dashboard panels: popular gallery categories and selected pricing packages.
- Events panel: recent actions with filters for all/forms/gallery/pricing.

### Gallery Page Component

Purpose: legacy/unrouted gallery landing component.

Sections:
- Hero: gallery heading and intro.
- Top categories: all gallery category cards.
- Catalog categories: all electronic catalog category links.
- Ready works: carousel linking ready-work items to catalog monuments.

