# Wave 10 — Fix-pass Changelog

> ⚠️ **PLACEHOLDER NOTICE.** The Contact background and Home `FinalTableau`
> background currently use `/images/n3/contact-placeholder.jpg` — a generated
> flat-color block in `--surface-stone-deep`. This is intentional. Replace with
> an owner-supplied photograph (workshop exterior or installation site,
> landscape, cool desaturated palette). Look for `TODO(owner-image)` comments
> in `src/pages/home/FinalTableau.tsx` (and any Contact picture site) to find
> the swap point.

---

## Locale keys

### Added (Waves 10 B1–B3, completed earlier in this wave)
- `homepage.heroBodyLine`
- `homepage.heroLocation`
- `homepage.servicesEyebrow` (replaces `craftEyebrow`)
- `homepage.servicesShortTitle` (replaces `craftTitle`)
- `homepage.servicesLearnMore`, `homepage.worksLearnMore`, `homepage.pricesLearnMore`
- `services.title`, `services.lead`, `services.items[].{title,body,deliverables}`
- `pricing.title` (already in place from Wave 7)
- `nav.services`, `seo.services` (en/et/ru)

### Renamed / rewritten (Wave 10 B4)
- `homepage.finalEyebrow`: "Let's talk" / "Räägime" / "Поговорим" → "Contact" / "Kontakt" / "Контакты"
- `pricing.intro` (all three locales): simplified, shorter sentences, plain verbs, "site condition" → "site conditions"
- `works.cta.body` (all three locales): em-dash replaced with comma + "and"
- `works.cta.link` (all three locales): now a `"Call {phone}"` / `"Helista {phone}"` / `"Позвонить {phone}"` template; phone interpolated at render time from `siteConfig.contacts.phoneDisplay`
- `contact.heading`: "Request an estimate or consultation" / "Küsi hinnangut või nõu" / "Получить расчет или консультацию" → "Get in touch" / "Võtke ühendust" / "Свяжитесь с нами"
- `contact.intro`: simplified across all three locales

### Deleted
- `homepage.craftEyebrow`, `homepage.craftTitle` (removed in earlier blocks; gone)
- Em-dashes in body copy stripped from `en.json`, `et.json`, `ru.json`. Ornamental em-dashes (`homepage.homeFooterCounter`, "05 examples — 30+ more in the catalog" style) retained on purpose — they read as type detail, not translation artefact.

## Components

- `src/pages/home/CraftTableau.tsx` → `src/pages/home/ServicesTeaser.tsx` (renamed in earlier block)
- `src/pages/home/WorksEssay.tsx` → `src/pages/home/WorksTeaser.tsx` (renamed in earlier block)
- `src/pages/ServicesPage.tsx` + `src/pages/services/ServicePicture.tsx` added (Wave 10 B2)
- `src/pages/works/WorksPage.tsx` + `src/pages/home/WorksTeaser.tsx`: image overlay shows a **descriptive one-word caption** (e.g. "Restoration", "Granite border", "Portrait") sourced from `works.captionWords[captionKey]` per locale — supersedes the ordinal rule in the original Wave 10 doc. Title + material stay in caption text outside the image. Alt text remains `"{title} — {material}"` for accessibility. CTA link consumes the `{phone}` template.
- `WorkItem` + `HomeWorkExample` types gained `captionKey: string`; new dictionary `works.captionWords` added to all three locales.
- `src/pages/home/FinalTableau.tsx`: meta line stacked (address / hours / "Send a message →") — done in earlier block, confirmed in this pass.

## Image assets

- `public/images/n3/craft-{framing,fence,plate}-{1x,2x}.{avif,jpg,webp}` renamed → `service-*` (18 files). Eliminates the last `Craft|craft` references in `src/`. References updated in `ServicesTeaser.tsx`, `ServicesPage.tsx`, `services/ServicePicture.tsx`.
- `public/images/n3/contact-placeholder.jpg`: generated flat-color block in `--surface-stone-deep`, in use until owner photo arrives.

## CSS class names

- `.home-craft*` → `.home-services-teaser*` (already in place from earlier block).
- No new style classes added in Block 4.

## Verification

- `npm run lint`, `npm run test`, `npm run build`, `node scripts/validate-content.mjs`, `node scripts/check-links.mjs` — see commit log for green/red status.
- `grep -E " — " src/content/locales/{en,et,ru}.json` → 0 hits (footer counter em-dash also stripped in Block 4).
- `grep -RE "Craft|craft" src/ --include="*.tsx" --include="*.ts" --include="*.css"` → 0 hits.

## Lighthouse delta

Not measured in this block. Owner to re-run on the static build after the
real Contact photo replaces the placeholder. Expected delta vs. Wave 9:
neutral on Performance (placeholder image is 3.3 KB, smaller than the
removed photo); neutral-to-positive on Accessibility (alt text on works
gallery now includes material, ordinal overlays are `aria-hidden`).
