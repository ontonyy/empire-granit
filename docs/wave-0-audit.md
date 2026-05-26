# Wave 0 Audit — N3 Redesign

Source: `docs/full-redesign.md` §Wave 0 (lines 103–148). Read-only inventory. No edits.

Branch: `claude/focused-einstein-5b92d8` (worktree of intended `BP-NA-empire-granit-n3-redesign`).

## Owner answers (open questions resolved 2026-05-24)

1. Email `ms.pamyatnik@mail.ru` — **KEEP**.
2. WhatsApp — **KEEP** (diverges from plan; plan said no WhatsApp → revisit Wave 8).
3. Cookie banner — **NO**.
4. `/works/[id]` detail pages — **DEFER**.
5. Logo — **KEEP** existing `/public/images/logo.png`.

## 1. Routes — delete / keep

13 route keys exist. Plan keeps 5 (home, pricing, contact, privacy, admin) and adds new `works`.

| Route key | File(s) | Page component | Locale segments (ru/et/en) | Verdict |
|---|---|---|---|---|
| home | routing.ts, route-segments.json, App.tsx | `HomePage` | `""` / `""` / `""` | KEEP (rebuild Wave 5) |
| about | routing.ts, route-segments.json | `AboutPage` | `o-kompanii` / `meist` / `about` | DELETE |
| pricing | routing.ts, route-segments.json | `PricingPage` | `ceny` / `hinnakiri` / `pricing` | KEEP (re-skin Wave 7) |
| memorials | routing.ts, route-segments.json | `MemorialsPage` | `pamyatniki` / `hauakivid` / `memorials` | DELETE (merge → /works) |
| materials | routing.ts, route-segments.json | `MaterialsPage` | `materialy` / `materjalid` / `materials` | DELETE |
| portfolio | routing.ts, route-segments.json | `PortfolioPage` | `raboty` / `portfoolio` / `portfolio` | DELETE (merge → /works) |
| process | routing.ts, route-segments.json | `ProcessPage` | `process` / `protsess` / `process` | DELETE |
| preview | routing.ts, route-segments.json | `PreviewPage` | `preview` / `eelvaade` / `preview` | DELETE (configurator gone) |
| restorationInstallation | routing.ts, route-segments.json | `RestorationInstallationPage` | `uslugi/restavratsiya-ustanovka` / `teenused/taastamine-paigaldus` / `services/restoration-installation` | DELETE |
| faq | routing.ts, route-segments.json | `FaqPage` | `voprosy` / `kkk` / `faq` | DELETE |
| playground | routing.ts, route-segments.json | `PlaygroundPage` | `konfigurator` / `konfiguraator` / `playground` | DELETE |
| contact | routing.ts, route-segments.json | `ContactPage` | `kontakty` / `kontakt` / `contact` | KEEP (Wave 8) |
| privacy | routing.ts, route-segments.json | `PrivacyPage` | `politika-konfidentsialnosti` / `privaatsuspoliitika` / `privacy-policy` | KEEP |
| **works** *(new)* | — | — | — | ADD (Wave 6) |

Touchpoints for Wave 1: `src/routing.ts` (ROUTE_KEYS array), `src/content/route-segments.json`, `src/app/LocaleRouteResolver.tsx` (renders 13 → 5), `scripts/routes.mjs` (prerender list), `scripts/prerender.mjs`, `public/sitemap.xml` (42 URLs → ~18: 6 routes × 3 locales). `src/App.tsx` root redirect "/" → "/ru/" — switch to "/et/" since ET primary.

## 2. Components — delete / keep / unsure

### DELETE — preview/playground (17 files)

```
src/pages/preview/useMemorialConfig.ts
src/pages/preview/shapes/{Arched,Book,Cross,FlatTop,Heart,Oval,Shouldered,Wave}Shape.svg.tsx
src/pages/preview/shapes/{index,types}.ts
src/pages/playground/{MonumentPreviewModel,PlaygroundConfigForm,PlaygroundPresets,PlaygroundPreviewPanel}.tsx
src/pages/playground/{copy,normalize}.ts
```

### DELETE — top-level page components (9)

`src/pages/{About,Memorials,Materials,Portfolio,Process,Preview,Playground,Faq,RestorationInstallation}Page.tsx`

### DELETE — home sections that map to dead routes

`src/pages/home/sections.ts` composes 10 sections. Delete candidates:

| Section | Reason |
|---|---|
| `ProcessSection.tsx` | maps to deleted /process |
| `CatalogPreviewSection.tsx` | catalog dissolves into /works |
| `MaterialsOptionsSection.tsx` | maps to deleted /materials |
| `ConfiguratorTeaserSection.tsx` | configurator gone |
| `HomeFaqSection.tsx` | FAQ deleted |
| `GuaranteeCareSection.tsx` | reassess in Wave 5 (UNSURE) |
| `ServiceAreaSection.tsx` | reassess in Wave 5 (UNSURE) |

KEEP/REBUILD: `HeroSection`, `TrustBarSection`, `ContactBanner` (likely reshape for N3).

### KEEP — admin (2)

`src/pages/admin/{copy,use-analytics-summary}.ts`

### UNSURE — catalog / gallery (7) — decision needed before Wave 6

```
src/pages/catalog/CatalogSubcategoryPage.tsx
src/pages/catalog/ElectronicCatalogSection.tsx
src/pages/catalog/GranitePalette.tsx
src/pages/catalog/granite-swatches.ts
src/pages/gallery/GalleryDetailCta.tsx
src/pages/gallery/GalleryDetailHero.tsx
src/pages/gallery/GalleryDetailSections.tsx
```

Gallery detail UNSURE consistent with owner Q4 defer of `/works/[id]` — likely DELETE for MVP, revisit later.

## 3. Legacy tokens in use

`src/styles/tokens.css` declares **197 unique tokens**. `--legacy-color-*` namespace = **146 tokens**; 138 referenced, **8 unused**.

### Unused legacy tokens (safe to drop)

```
--legacy-color-255-255-255-007
--legacy-color-255-255-255-008
--legacy-color-47372c
--legacy-color-cdbca6
--legacy-color-f1ebe3
--legacy-color-f3e7d7
--legacy-color-f5efe7
--legacy-color-fbf7f1
```

### Top legacy refs (Wave 3 will replace all 138)

| Token | Refs |
|---|---|
| `--legacy-color-white` | 38 |
| `--legacy-color-166-138-100-014` | 13 |
| `--legacy-color-f5efe6` | 8 |
| `--legacy-color-166-138-100-018` | 8 |
| `--legacy-color-166-138-100-016` | 7 |
| `--legacy-color-166-138-100-012` | 7 |
| `--legacy-color-fbf8f3` | 4 |
| `--legacy-color-65-52-39-004` | 4 |
| `--legacy-color-255-255-255-078` | 4 |
| `--legacy-color-255-255-255-058` | 4 |

### Other namespaces (kept structurally, retuned for N3)

`--space-*` 8, `--fs-*` 6, `--surface-*` 5, `--motion-*` 5, `--container-*` 4, `--accent-*` 4, `--text-*` 3, `--radius-*` 3, `--weight-*` 2, `--shadow-*` 2, `--font-*` 2, `--focus-*` 2, `--border-*` 2, `--tracking-*` 1, `--section-*` 1, `--rule-*` 1, `--cta-*` 1, `--bg-*` 1.

Declared in `src/styles/tokens.css`. Consumed via `var()` from `src/styles.css` and component CSS modules.

## 4. Hard-coded English strings to move to locales

Surprisingly clean — 68 .tsx scanned, only 5 hard-coded EN literals found:

| File | Line | String |
|---|---|---|
| `src/components/layout/SiteFooter.tsx` | 66 | `<span>E-mail</span>` |
| `src/components/admin/AdminLoginCard.tsx` | 16 | `<span className="section-kicker">Empire Admin</span>` (brand — likely keep) |
| `src/components/ui/Breadcrumb.tsx` | 17 | `aria-label="Breadcrumb"` |
| `src/pages/playground/MonumentPreviewModel.tsx` | 71 | `aria-label="Monument preview"` (deleted with /playground) |
| `src/pages/GalleryDetailPage.tsx` | 64 | `<p>Category not found.</p>` |

Wave 2 action: move SiteFooter "E-mail", Breadcrumb aria-label, GalleryDetailPage fallback into locale JSONs. Admin kicker = brand string, leave.

## 5. Blockers / surprises

- **WhatsApp divergence** — owner wants WhatsApp button, plan said no. Update Wave 8 spec.
- **Branch** — worktree on `claude/focused-einstein-5b92d8`, not `BP-NA-empire-granit-n3-redesign`. Confirm rename or rebase before Wave 1 commits.
- **Primary locale switch** — plan says ET primary but `src/App.tsx` redirects "/" → "/ru/". Wave 1 must flip default to ET.
- **catalog/ + gallery/** — 7 files in limbo. Wave 6 brief must decide: dissolve all into single Works gallery (matches owner Q4 defer) or keep `GranitePalette` for Pricing/Works swatch reuse.
- **prerender sitemap drop** — 42 URLs → ~18. Confirm SEO redirects (301) for the 24 dead URLs before Wave 1 ships.
- **i18n is healthy** — only 5 EN literals project-wide. Wave 2 is small.
- **Tokens.css bloat** — 146 legacy color tokens; Wave 3 can collapse to ~20 N3 tokens.

## Inputs for downstream waves

- Wave 1 route demolition: §1 table + touchpoint list
- Wave 2 locale cleanup: §4 + locale JSON keys for deleted routes
- Wave 3 token rewrite: §3 — drop 146 legacy + retune namespaces
- Wave 5 home rebuild: §2 home section table
- Wave 6 works page: §2 catalog/gallery UNSURE block (decide first)
- Wave 8 contact: WhatsApp re-spec
