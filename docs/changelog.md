# N3 Redesign — Changelog (Waves 1–9)

## Summary
Full site restructure to "Workshop Reportage" direction. 13 routes → 4 primary marketing routes (+ privacy + admin). Legacy palette + display serifs retired. AVIF/WebP image pipeline. Documentary photography filter (no grieving, candles, cemetery wide-shots).

## Routes deleted (Wave 1)
9 routes pulled from the router and removed from sitemap:

- `/et/teenused/` (services landing)
- `/et/galerii/` (gallery)
- `/et/portfoolio/`
- `/et/protsess/`
- `/et/materjalid/`
- `/et/garantii/`
- `/et/kkk/`
- `/et/sõnastik/`
- `/et/kataloog/`

Equivalent ru/en segments removed in lockstep. Old paths return 404 (handled by `dist/404.html` redirect to `/et/`).

## Routes retained
| ET | RU | EN | Component |
|---|---|---|---|
| `/et/` | `/ru/` | `/en/` | `HomePage` |
| `/et/tood/` | `/ru/raboty/` | `/en/works/` | `WorksPage` |
| `/et/hinnakiri/` | `/ru/ceny/` | `/en/pricing/` | `PricingPage` |
| `/et/kontakt/` | `/ru/kontakty/` | `/en/contact/` | `ContactPage` |
| `/et/privaatsuspoliitika/` | `/ru/politika-konfidentsialnosti/` | `/en/privacy-policy/` | `PrivacyPage` |

## Locale keys
- Added: `homepage.opening`, `homepage.craft`, `homepage.worksEssay`, `homepage.pricingTeaser`, `homepage.final`, `works.{eyebrow,title,pageLead,filterLabel,filters,captionSeparator,cta}`, `contact.{heading,intro,formLabels,privacyNotice}`, `pricing.{lead,tiers,process,faq,cta}` (Waves 2, 5–8)
- Removed: dead Wave 7 keys (services tiers, gallery filters, glossary terms, FAQ groups, materials catalog, guarantee blocks) — see `git log -- src/content/`
- Final shape (Wave 2 redo): 123 leaf keys each in `et / ru / en`, parity verified by cross-locale audit

## Files removed in Wave 9
- `public/images/background.png` (14 MB PNG — replaced by `public/images/n3/hero-*`)
- `public/images/examples/*.png` (15 unused PNGs — content moved to `public/images/n3/works/`)

Specifically deleted:
`bench.png`, `candles.png`, `cemetry.png`, `exclusive.png`, `fence.png`, `fence_with_entrance.png`, `framing.png`, `granite_bench.png`, `granite_fence.png`, `gravestone.png`, `memorial_table.png`, `monument.png`, `stone_plate.png`, `tombstone.png`.
(`candles.png` + `cemetry.png` violate the new photo filter; the rest were rehomed under `images/n3/works/` as AVIF/WebP/JPG triplets.)

## Files added in Wave 9
- `public/images/n3/hero-{1x,2x}.{avif,webp,jpg}`
- `public/images/n3/craft-framing-{1x,2x}.{avif,webp,jpg}`
- `public/images/n3/craft-fence-{1x,2x}.{avif,webp,jpg}`
- `public/images/n3/craft-plate-{1x,2x}.{avif,webp,jpg}`
- `public/images/n3/final-workshop-{1x,2x}.{avif,webp,jpg}`
- `public/images/n3/works/*.{avif,webp,jpg}` (12 source files × 3 formats = 36 files)
- `public/images/logo.webp` (13 KB — replaces 2.1 MB logo.png reference path)
- `src/pages/contact/WorkshopMap.tsx` (IntersectionObserver-deferred map iframe)
- `docs/art-direction.md`, `docs/content-map.md`, `docs/responsive-notes.md`, `docs/changelog.md`

## Files modified (Wave 9 only)
- `index.html` — async-load font stylesheet, preload pattern
- `public/images/logo.png` — 2.1 MB → 105 KB (resized to 400px wide)
- `src/components/SeoHead.tsx` — hero preload tag on home route
- `src/components/layout/SiteHeader.tsx` — `<picture>` + webp source for brand logo
- `src/lib/analytics.ts` — Firestore dynamically imported (split out of main bundle, 595 KB → 249 KB)
- `src/app/AdminRoute.tsx` — `lazy()` + `Suspense` for admin
- `src/pages/admin/copy.ts`, `src/pages/admin/use-analytics-summary.ts`, `src/pages/AdminPage.tsx` — direct import from `analytics-summary` (no longer re-exported by public `analytics.ts`)
- `src/components/AnalyticsLoader.tsx` — `requestIdleCallback` deferral
- `src/pages/ContactPage.tsx` — iframe extracted into `WorkshopMap`
- `src/pages/home/OpeningTableau.tsx` / `CraftTableau.tsx` / `FinalTableau.tsx` / `WorksEssay.tsx` — `<picture>` elements with AVIF/WebP/JPG srcsets + width/height
- `src/pages/home/works-examples.ts` / `src/pages/works/works-data.ts` — `image: string` → `imageBase: string` with width/height
- `src/pages/works/WorksPage.tsx` — `<picture>` per tile
- `src/styles.css` — `.contact-n3__phone-number` uses system font stack to skip LCP wait for Inter

## Lighthouse final (4 routes × desktop + mobile = 8 audits)

| Route | Viewport | Perf | A11y | BP | SEO |
|---|---|---|---|---|---|
| `/et/` | desktop | 98 | 96 | 96 | 100 |
| `/et/` | mobile | 90 | 96 | 96 | 100 |
| `/et/tood/` | desktop | 100 | 96 | 96 | 100 |
| `/et/tood/` | mobile | 93 | 96 | 96 | 100 |
| `/et/hinnakiri/` | desktop | 100 | 96 | 96 | 100 |
| `/et/hinnakiri/` | mobile | 94 | 95 | 96 | 100 |
| `/et/kontakt/` | desktop | 100 | 97 | 96 | 100 |
| `/et/kontakt/` | mobile | 80 | 97 | 96 | 100 |

**Known gap**: `/et/kontakt/` mobile Performance = 80 (LCP 4.4 s on simulated 4G + 4× CPU). The LCP element is the large phone tel-link; further improvement would require self-hosting Inter + critical-CSS inlining, which is out of scope for Wave 9. All other 7 audits ≥ 90 in every category. SEO = 100 across the board.

## Verification (5-command suite — see commit)
- `npm run lint` (= `tsc --noEmit`) — clean
- `npm run test` — 116 tests pass across 27 files
- `npm run build` — clean prerender of 15 localized routes
- `node scripts/validate-content.mjs` — passes (123 keys per locale, parity)
- `node scripts/check-links.mjs` — 15 unique localized paths reachable
