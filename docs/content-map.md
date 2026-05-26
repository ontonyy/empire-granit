# Content Map — N3 routes

Four public routes (et / ru / en). Estonian segments shown; ru/en localized via `src/routing.ts` -> `route-segments.json`.

Content source: `src/content/locales/{et,ru,en}.json`. UI labels: `src/components/layout/ui-labels.ts` (derived).

## `/et/` — Home

`src/pages/HomePage.tsx` orchestrates six sections:

| # | Section | Component | Source key | Image |
|---|---|---|---|---|
| 1 | Opening tableau | `OpeningTableau` | `homepage.opening` | `n3/hero-{1x,2x}.{avif,webp,jpg}` |
| 2 | Trust strip | `TrustStrip` | `homepage.trustMetrics[]` | — |
| 3 | Craft tableau (3-photo + services) | `CraftTableau` | `homepage.craft`, `homepage.services[]` | `n3/craft-framing`, `n3/craft-fence`, `n3/craft-plate` |
| 4 | Works essay (asymmetric 7-cell) | `WorksEssay` | `homepage.worksEssay`, `works-examples.ts` | `n3/works/{monument,fence_with_entrance,gravestone,granite_bench,exclusive}.{avif,webp,jpg}` |
| 5 | Pricing teaser | `PricingTeaser` | `homepage.pricingTeaser` | — |
| 6 | Final tableau (phone + address) | `FinalTableau` | `homepage.final` | `n3/final-workshop-{1x,2x}.{avif,webp,jpg}` |

## `/et/tood/` — Works

`src/pages/works/WorksPage.tsx` — single combined gallery (Wave 6).

| Section | Component | Source |
|---|---|---|
| Header (eyebrow + title + lead) | inline | `works.eyebrow / title / pageLead` |
| Filter pills (all + 4 categories) | inline | `works.filters.{all,monuments,fences,engravings,installation}` |
| Gallery grid (12 tiles) | inline | `works-data.ts` — 12 `WorkItem` entries with `id / title / material / category / imageBase / ratio` |
| CTA | inline | `works.cta` |

Images: `public/images/n3/works/<imageBase>.{avif,webp,jpg}` — 12 unique sources.

## `/et/hinnakiri/` — Pricing

`src/pages/PricingPage.tsx`.

| Section | Source key |
|---|---|
| Eyebrow + title + lead | `pricing.eyebrow / title / lead` |
| Tiers (3) | `pricing.tiers[]` — `id / title / price / scope / includes[] / footnote` |
| Process steps | `pricing.process.steps[]` |
| FAQ | `pricing.faq[]` |
| CTA | `pricing.cta` |

## `/et/kontakt/` — Contact

`src/pages/ContactPage.tsx` — merged form, phone-first (Wave 8).

| Section | Component | Source key |
|---|---|---|
| Header | inline | `contact.heading / intro` |
| Phone block (LCP) | inline | `siteConfig.contacts.phoneDisplay`, `getContactAssistContent(locale)` |
| Contact form | `ContactForm` | `contact.formLabels`, `contact.privacyNotice` |
| Register (email / address / hours) | inline | `siteConfig.contacts`, `getContactAssistContent` |
| Workshop map (deferred iframe) | `WorkshopMap` | `siteConfig.contacts.mapEmbedUrl` |

## `/et/privaatsuspoliitika/` — Privacy

Retained (not in the 4 primary marketing pages, but live and sitemapped). `src/pages/PrivacyPage.tsx`. Source: `privacy.cards[]`.

## Global chrome
- `SiteHeader` — brand + nav (4 routes) + locale switcher + CTA — `layout.nav.*`, `layout.cta.*`
- `SiteFooter` — three columns: brand / nav / contact — same source
- `floating-call` — non-home only, phone link — `cta.callNow`
- `<SeoHead>` — `seo[routeKey]` per locale: title / description / og / hreflang
