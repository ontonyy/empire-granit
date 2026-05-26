# Empire Granit — Redesign Plan (N3 · Workshop Reportage)

> Paste the **wave prompts** below (one wave at a time) into a fresh Claude Code session opened at the root of the `empire-granit/` repo. Run the verification commands after each wave. Do not jump ahead — every wave assumes the previous one passed.

---

## 0. Decisions locked in this round

| Decision | Choice |
|---|---|
| Sitemap | **4 public pages only**: Home, Works, Pricing, Contact (+ Privacy legal page) |
| Routes deleted | `about`, `memorials`, `materials`, `portfolio`, `process`, `preview`, `restorationInstallation`, `faq`, `playground` |
| Languages | ET (primary), RU, EN — all three kept |
| Primary action | **Phone call.** Phone number is the largest interactive element on every page |
| Header | Logo · 3 anchor links (Teenused / Tööd / Kontakt) · phone · language switcher |
| Configurator | **Deleted** entirely (`/preview` route + `src/pages/preview/`) |
| FAQ page | **Deleted** — no FAQ section on Home either |
| Pricing | Has its own page; prices unchanged (400 € / 700 € / 100 €) |
| Portfolio | Stock photography labelled as "näited" (examples), no apology disclaimer |
| Imagery density | Moderate — N3 depends on quality photography in the hero and Works grid |
| Visual direction | **N3 — Workshop Reportage** (see Part 2) |
| Copy | Keep existing Estonian copy from `src/content/locales/et.json`. No AI rewrites. |

---

## 1. Final sitemap

```
/                      Home                   (anchors: #services, #works, #contact)
/works                 Works (gallery)        (replaces /portfolio + /memorials + /gallery + /gallery/[id])
/pricing               Pricing                (existing, copy unchanged, restyled)
/contact               Contact                (single merged form, re-pinned map)
/privacy               Privacy                (legal — kept)
/admin                 Admin                  (DO NOT TOUCH — internal)
```

Estonian segments under `/et/`, Russian under `/ru/`, English under `/en/`. ET resolves at root.

---

## 2. N3 — Visual system (the art direction)

**Mood:** reportage, atelier, documentary, hands, material, behind-the-scenes, honest. Premium because it looks like a magazine, not because of decoration.

### Palette
| Token | Value | Use |
|---|---|---|
| `--surface-stone` | `#EEEBE4` | Page background |
| `--surface-stone-deep` | `#E5E1D8` | Alternating section background |
| `--surface-card` | `#FBF8F0` | Tables and contained surfaces |
| `--ink-near-black` | `#15140F` | Primary text + headings |
| `--ink-body` | `#2A2820` | Body copy |
| `--ink-muted` | `#5A5750` | Captions, meta |
| `--ink-quiet` | `#6F6A60` | Section eyebrows |
| `--accent-wood` | `#A87B4B` | The single accent (links, eyebrows, underlines) |
| `--rule-hairline` | `1px solid rgba(21,20,15,0.12)` | All section dividers |

No other colors. No gradients. No shadows except the soft drop on the floating phone pill.

### Type
- **Body & headings:** `Inter` (300, 400, 500, 600, 700). Tight tracking on display sizes (`-0.025em`).
- **One italic accent voice:** `EB Garamond` italic — used once or twice per page maximum (the workshop tagline, a pull-quote moment).
- **Sizes:**
  - Display: `clamp(40px, 4.5vw, 64px)`, weight 500, letter-spacing -0.025em
  - Section heading (h2): `44px` desktop, weight 500
  - Eyebrow: `10px` / `0.22em` letter-spacing / uppercase / weight 600 / `--accent-wood`
  - Body: `16px` / line-height 1.65 / `--ink-body`
  - Body large (intro): `18px` / line-height 1.7
- Cinzel small-caps display is **deleted** along with `font-variant-caps: small-caps` references in `tokens.css`.

### Photography direction
- Workshop-led, NOT cemetery-led. Hands working stone, granite slab, engraving close-up, edge finishing, installation site exterior.
- No grieving people, candles, dramatic lighting.
- Color must read as cool stone (gray, neutral) — desaturate stock if needed.
- Hero image is **landscape full-bleed** behind the title in the lower-left corner.

### Layout grammar
- Asymmetric photo essay. **Never** uniform 3-column card grids.
- Works grid is irregular: large landscape + portrait + portrait + small square, with captions in negative space beside images rather than below.
- Section dividers are **hairlines**, never thick rules.
- All buttons except the phone pill in the header are **text links with a wood-colored underline**.

---

## 3. Wave-based work order

> Run each wave to completion + verification before starting the next. If a wave fails verification, fix it before continuing — do not roll forward.

### Verification commands (run after EVERY wave)

```
npm run lint
npm run test
npm run build
node scripts/validate-content.mjs
node scripts/check-links.mjs
```

If any of these fail, the wave is not done.

---

## Wave 0 — Pre-flight (no edits)

**Goal:** orient and produce a written plan before touching code.

### Prompt for Claude Code

```
You are working in the empire-granit/ codebase: Vite + React + TypeScript,
SSR/prerender via scripts/prerender.mjs, Firebase wired in src/lib/firebase.ts,
trilingual content in src/content/locales/{en,et,ru}.json.

We are executing a FULL REDESIGN to ONE visual direction: "N3 Workshop Reportage".
This is a destructive simplification: 9 routes will be deleted, the sitemap will
shrink to 4 public pages + Privacy.

Do NOT edit anything in this wave. Produce a written plan only.

Tasks:
1. Read src/routing.ts, src/content/route-segments.json, src/App.tsx,
   src/app/LocaleRouteResolver.tsx, scripts/prerender.mjs, scripts/routes.mjs,
   public/sitemap.xml.
2. Read src/styles/tokens.css and src/styles.css. Note: tokens.css contains
   ~120 "legacy-color-*" tokens that need to be inventoried — list every file
   that references any --legacy-color-* token.
3. Read src/pages/home/sections.ts and list every HomePage section component
   it composes.
4. List every file under src/pages/preview/, src/pages/admin/, src/pages/playground/
   so we know what stays and what goes.
5. Inventory hard-coded English strings in components (grep for ">[A-Z]" inside
   .tsx files). Output a file list — these will move to locale JSONs in Wave 2.

OUTPUT: a single Markdown file `docs/wave-0-audit.md` containing:
  - Routes to delete (with the files for each route)
  - Components to delete (full list of files under preview/, plus any home
    section that doesn't fit the new home — see Wave 5)
  - Legacy tokens still in use (count + files)
  - Hard-coded strings to move to locales (file list)
  - Any blockers or surprises

Do not delete or modify anything yet. Just produce wave-0-audit.md and stop.
```

### Acceptance
- `docs/wave-0-audit.md` exists and is concrete (no hand-waving).
- Owner reviews the audit before approving Wave 1.

---

## Wave 1 — Route demolition

**Goal:** Reduce the route table from 13 to 5 (4 public + Privacy + Admin).

### Files touched
- `src/routing.ts`
- `src/content/route-segments.json`
- `src/App.tsx`
- `src/app/LocaleRouteResolver.tsx`
- `scripts/prerender.mjs`, `scripts/routes.mjs`
- `public/sitemap.xml`
- Delete: `src/pages/AboutPage.tsx`, `src/pages/MaterialsPage.tsx`, `src/pages/MemorialsPage.tsx`, `src/pages/PortfolioPage.tsx`, `src/pages/ProcessPage.tsx`, `src/pages/PreviewPage.tsx`, `src/pages/RestorationInstallationPage.tsx`, `src/pages/FaqPage.tsx`, `src/pages/PlaygroundPage.tsx`, `src/pages/GalleryDetailPage.tsx`
- Delete folders: `src/pages/preview/`, `src/pages/catalog/`, `src/pages/gallery/`, `src/pages/playground/`
- Add: `src/pages/WorksPage.tsx` (stub for now — Wave 6 fleshes it out)

### Prompt for Claude Code

```
Wave 1 — Route demolition.

We are deleting 9 routes from the sitemap. The new public sitemap is:
  home, works, pricing, contact, privacy
Plus admin (untouched).

Existing routes to delete: about, memorials, materials, portfolio, process,
preview, restorationInstallation, faq, playground. Also delete the
GalleryDetailPage and the gallery/ subroute entirely.

`works` is a NEW route that replaces the old portfolio/memorials/gallery routes.

Tasks (in order, do not skip any):

1. Update src/routing.ts:
   - Remove from ROUTE_KEYS: about, memorials, materials, portfolio, process,
     preview, restorationInstallation, faq, playground.
   - Add 'works' to ROUTE_KEYS.
   - Final ROUTE_KEYS array: ['home', 'works', 'pricing', 'contact', 'privacy'].
   - Delete the `buildCatalogSubcategoryPath` helper — nothing will use it.

2. Update src/content/route-segments.json:
   - Remove keys for all deleted routes.
   - Add `works` key with locale segments:
       et: "tood"  (avoid diacritics for URL safety)
       ru: "raboty"
       en: "works"

3. Update src/types.ts to narrow the RouteKey type to the new set.

4. Update src/App.tsx to:
   - Remove all <Route> entries for deleted pages.
   - Add a <Route> for /works that renders <WorksPage/>.
   - Keep /admin and /privacy routes as-is.

5. Update src/app/LocaleRouteResolver.tsx so old URLs (e.g. /et/hauakivid,
   /et/materjalid, /et/portfoolio) 301-redirect to the closest new route:
     hauakivid/portfoolio/galerii → /et/tood
     materjalid → /et/tood
     protsess/taastamine/eelvaade → /et/  (home)
     kkk → /et/  (home)
   Same pattern for RU and EN URLs. Add a small `LEGACY_REDIRECTS` map in
   `src/app/legacy-redirects.ts` for clarity.

6. Update scripts/prerender.mjs + scripts/routes.mjs to enumerate only the
   new 5 routes × 3 locales = 15 URLs.

7. Update public/sitemap.xml to match the new 15 URLs.

8. Delete these files entirely:
     src/pages/AboutPage.tsx
     src/pages/MaterialsPage.tsx
     src/pages/MemorialsPage.tsx
     src/pages/PortfolioPage.tsx
     src/pages/ProcessPage.tsx
     src/pages/PreviewPage.tsx
     src/pages/RestorationInstallationPage.tsx
     src/pages/FaqPage.tsx
     src/pages/PlaygroundPage.tsx
     src/pages/GalleryPage.tsx
     src/pages/GalleryDetailPage.tsx
   And these folders:
     src/pages/preview/
     src/pages/catalog/
     src/pages/gallery/
     src/pages/playground/

9. Create src/pages/WorksPage.tsx as a placeholder that renders a single
   <h1> reading "Tööd" and a <SeoHead> with title "Tööd | Empire Granit".
   Wave 6 will replace this with the real implementation.

10. Search the entire src/ for imports of the deleted files and remove them.
    The build MUST be green at the end of this wave.

Verify by running:
  npm run lint
  npm run test
  npm run build
  node scripts/validate-content.mjs
  node scripts/check-links.mjs

If any fail, fix forward — do NOT leave the build broken. Report which checks
passed and which failed.
```

### Acceptance
- All five verification commands pass.
- Visiting any old URL in `npm run dev` redirects to the closest new route.
- `npm run build` output contains exactly 15 prerendered HTML files (5 routes × 3 locales).

---

## Wave 2 — Locale JSON cleanup

**Goal:** Strip every locale key tied to a deleted page; remove the "Verified real-work photos…" disclaimer; ensure key parity across et/ru/en.

### Prompt for Claude Code

```
Wave 2 — Locale cleanup.

Files: src/content/locales/{en,et,ru}.json + scripts/validate-content.mjs.

Tasks:

1. Delete every top-level key that belongs to a removed page:
     about, memorials, materials, portfolio, process, preview,
     restorationInstallation, faq, playground.

2. Inside homepage.*, delete keys for sections we are removing:
     featureCards, services (legacy), testimonials*, configurator*,
     options* (legacy MaterialsOptionsSection content).
   Keep: heroTitle, heroLead, heroLabel, highlights, secondaryCta,
   trustLabel, trustMetrics, processLabel/processSteps (we will repurpose
   the 5 process steps copy as a small inline section — see Wave 5),
   catalog* keys (renamed in step 4), services (new — see step 5).

3. Add a top-level `works` key with subkeys:
     pageTitle: "Tööd | Empire Granit"
     pageLead: short paragraph (use existing catalogLead text as the base)
     filtersLabel: "Filtreeri"  (we'll add filters in Wave 6)
     emptyState: "Hetkel pole sobivaid töid kuvada."

4. Rename `homepage.catalog*` → `homepage.works*` to match new vocabulary
   (catalogLabel → worksLabel, catalogTitle → worksTitle, etc).

5. Add `homepage.servicesShort` — three short service paragraphs for the
   N3 Craft tableau:
     [
       { title: "Monumendid", body: "..." },
       { title: "Piirded", body: "..." },
       { title: "Graveeringud", body: "..." }
     ]
   Use the existing service descriptions verbatim from the deleted
   `homepage.services` array; pick the three that match these titles.

6. Find and DELETE the string "Verified real-work photos should be added
   separately when available" (and its EE/RU translations) from every
   locale.

7. Inventory every hard-coded English string in components (grep for
   English text inside .tsx files outside of /admin). For each finding,
   add the key to all three locales and update the component to read from
   the locale. List the keys you added at the end of the wave.

8. Run `node scripts/validate-content.mjs`. It MUST exit zero. If there
   are parity gaps between EN/ET/RU, fix them.

Do not touch /admin localization. Do not invent new copy — pull from
existing text in the locales or from the wave-0-audit.

Verify:
  npm run lint
  npm run test
  npm run build
  node scripts/validate-content.mjs
  node scripts/check-links.mjs
```

### Acceptance
- `validate-content.mjs` passes.
- No locale JSON contains keys for deleted pages.
- "Verified real-work photos…" string is gone everywhere.

---

## Wave 3 — Token system rewrite

**Goal:** Replace the bloated tokens.css with the clean N3 token set.

### Prompt for Claude Code

```
Wave 3 — Tokens.

File: src/styles/tokens.css + src/styles.css.

Replace the contents of tokens.css with the N3 token system below.
Delete ALL --legacy-color-* tokens. Before deleting them, grep every
.tsx and .css file for usages and replace each with the closest new token:
  - any "warm gray / sand" legacy hex → --surface-stone or --surface-stone-deep
  - any "off-white / cream" legacy hex → --surface-card
  - any "bronze / gold" legacy hex → --accent-wood
  - any "near black / graphite" legacy hex → --ink-near-black
  - any darker body text → --ink-body
  - any muted gray → --ink-muted

The new tokens.css (write this VERBATIM at the top, then keep the
.ui-* primitive classes at the bottom but updated to consume new tokens):

  --surface-stone: #EEEBE4;
  --surface-stone-deep: #E5E1D8;
  --surface-card: #FBF8F0;
  --surface-ink: #15140F;
  --ink-near-black: #15140F;
  --ink-body: #2A2820;
  --ink-muted: #5A5750;
  --ink-quiet: #6F6A60;
  --ink-on-dark: #E5D9C0;
  --accent-wood: #A87B4B;
  --accent-wood-hover: #8e6638;
  --rule-color: rgba(21,20,15,0.12);
  --rule-color-strong: rgba(21,20,15,0.22);

  --space-1: 8px; --space-2: 16px; --space-3: 24px; --space-4: 32px;
  --space-5: 48px; --space-6: 64px; --space-7: 96px; --space-8: 128px;
  --space-9: 192px;

  --radius-sm: 4px; --radius-md: 8px;  /* N3 uses small radii or none */

  --container-max: 1280px;
  --container-pad-mobile: 24px;
  --container-pad-tablet: 32px;
  --container-pad-desktop: 48px;

  --section-pad: clamp(64px, 9vw, 112px);

  --font-body: 'Inter', system-ui, sans-serif;
  --font-italic-accent: 'EB Garamond', Georgia, serif;
  /* No Cinzel. No Cormorant. Delete the imports. */

  --fs-eyebrow: 10px;
  --fs-body: 16px;
  --fs-body-lg: 18px;
  --fs-h3: clamp(20px, 1.6vw, 24px);
  --fs-h2: clamp(28px, 3.5vw, 44px);
  --fs-h1: clamp(40px, 5.5vw, 64px);

  --tracking-eyebrow: 0.22em;
  --weight-body: 400;
  --weight-emphasis: 500;
  --weight-strong: 600;

  --motion-quiet: 280ms cubic-bezier(0.2, 0, 0, 1);
  --focus-ring: 2px solid var(--accent-wood);
  --focus-offset: 3px;

Update the .ui-* primitives that exist in tokens.css to use only new
tokens:
  - .ui-display: family = var(--font-body), weight 500, letter-spacing
    -0.025em, no font-variant-caps
  - .ui-eyebrow: color = var(--accent-wood)
  - .ui-card: remove the rounded corner — radius var(--radius-sm) only
  - .ui-btn--primary: keep but use var(--accent-wood)

Then update index.html (or wherever the Google Font imports live) to:
  - Remove Cinzel, Playfair Display, Cormorant Garamond, JetBrains Mono.
  - Keep only: Inter (weights 300, 400, 500, 600, 700) + EB Garamond
    (italic 400).

Verify:
  npm run lint
  npm run test
  npm run build
  grep -r "legacy-color-" src/  # should return zero hits
  grep -r "Cinzel" src/         # should return zero hits
  grep -r "Cormorant" src/      # should return zero hits

If any grep returns hits, fix them before declaring done.
```

### Acceptance
- No `--legacy-color-*` tokens remain in tokens.css.
- No references to Cinzel / Cormorant / Playfair in any source file.
- Site builds and renders with the new palette (will look raw/unstyled in spots until Wave 4–5).

---

## Wave 4 — Global chrome (Header + Footer)

**Goal:** Rebuild SiteHeader and SiteFooter to match N3.

### Prompt for Claude Code

```
Wave 4 — Global chrome.

Files: src/components/layout/SiteHeader.tsx,
       src/components/layout/SiteFooter.tsx,
       src/components/LanguageSwitcher.tsx,
       any associated CSS modules.

HEADER specs:

- Sticky at top, background `var(--surface-stone)` with 92% opacity +
  backdrop-filter blur(8px), border-bottom `1px solid var(--rule-color)`.
- Three-column grid: [Logo on left] [3 anchor links centered] [right cluster].
- Logo: existing logo.png from /public/images, height 32px, paired with
  wordmark "EMPIRE GRANIT" in Inter 700, 14px, letter-spacing 0.12em.
- Center nav: 3 in-page anchor links pointing to #services, #works,
  #contact. ON THE HOME PAGE these scroll-snap to sections. On other
  pages they navigate to "/" with the anchor appended.
  Labels (from locales):
    et: Teenused / Tööd / Kontakt
    ru: Услуги / Работы / Контакты
    en: Services / Works / Contact
- Add ONE more top-level link to the right of the 3 anchors: "Hinnakiri"
  / "Цены" / "Pricing" — navigates to /pricing. (Pricing is the only
  separate page worth surfacing in the global nav.)
- Right cluster: language switcher (3 pills, active state underlined
  with `var(--accent-wood)`, 1px) THEN a phone link styled as:
    text only, color = var(--ink-near-black), font-weight 600,
    14px, border-bottom 1px solid var(--accent-wood), padding-bottom 2px.
  No background pill — just text + bottom rule. Inline phone-receiver
  SVG icon (12px) to the left of the number.
- On screens < 768px: collapse the 3 anchor links into a hamburger that
  opens a fullscreen overlay. The phone link stays visible on ALL widths.

FOOTER specs:

- Background `var(--surface-stone-deep)`, top border 1px var(--rule-color).
- Single horizontal flex row, two columns:
    Left: © 2026 Empire Granit OÜ · {email} · {privacy link}
    Right: nothing (or a small "Üles ↑" link that scrolls to top).
- No multi-column "navigation columns" footer. The footer is a colophon.
- Font 12px, color `var(--ink-muted)`, line-height 1.6.
- Padding: var(--space-3) var(--container-pad-desktop).

LANGUAGE SWITCHER specs:

- Three text links separated by a thin middle dot.
- Active language: color `var(--ink-near-black)`, underline 1px var(--accent-wood).
- Inactive: color `var(--ink-quiet)`.
- ARIA: aria-current="true" on the active locale's link.

A11y:
- aria-current="page" on active nav item
- focus-visible outline using `var(--focus-ring)`
- skip-to-content link before the header (visually hidden until focused)
- All language-switcher links carry hreflang="<locale>" attributes.

Verify:
  npm run lint
  npm run test
  npm run build
  Visually: open / in dev, header + footer should be styled and the
  phone link should be present and tappable on a 375px mobile width.
```

### Acceptance
- Phone visible on all viewport widths.
- Hamburger appears below 768px.
- Header looks like an editorial publication's masthead, not a SaaS topbar.

---

## Wave 5 — Home page (the big one)

**Goal:** Replace the current `HomePage.tsx` + `src/pages/home/` sections with the N3 layout.

### N3 Home page composition

1. **Opening tableau** — full-bleed landscape workshop photograph, ~720px tall on desktop. Title overlaid in the lower-left corner only, white text, eyebrow above. No CTA in the hero. No image carousel.
2. **Two-column intro** — left column: 1–2 sentence paragraph (using `homepage.heroLead` or a new key). Right column: small eyebrow + phone number in 32px Inter 600, right-aligned.
3. **Trust row** — single horizontal line, 3 items separated by hairline verticals, sub-1em type. Pulled from `homepage.trustMetrics` (use the first 3 only).
4. **Craft tableau** — section #services. Header: small eyebrow "Käsitöö" + 44px h2 "Töökoda Narvas — graniit, gravüür, viimistlus." Below: irregular 3-photo grid (1 tall left at 7/12, two stacked right at 5/12 each at 1/2 height). Beneath the photos: 3 short captioned paragraphs in a 3-column row (Monumendid / Piirded / Graveeringud — pulled from new `homepage.servicesShort`).
5. **Works essay** — section #works. Background `var(--surface-stone-deep)`. Asymmetric 6-image gallery using CSS grid 12 columns:
   - row 1: landscape (col 1/9, row 1/3) + side-caption (col 9/13, row 1/2) + small detail (col 9/13, row 2/3)
   - row 2: portrait (col 1/6) + portrait (col 6/10) + small square (col 10/13, row 3/4) + side-caption (col 10/13, row 4/5)
   - Captions live BESIDE images in negative space, not below.
   - 5–6 examples maximum. Footer line: "05 näidet — veel 30+ kataloogis" + text link "Vaata kõiki töid →".
6. **Prices** — two-column. Left 7/12: small eyebrow + h2 "Mis mõjutab lõpphinda" + 2 short paragraphs (pricing-affecting factors). Right 5/12: a small cream table with 3 rows (Monumendid / Piirded / Paigaldus) showing name + "alates X €" + a "Täielik hinnakiri →" link at the bottom.
7. **Final tableau** — full-bleed exterior workshop or installation site photograph, ~540px tall. Lower-left overlay: eyebrow "Räägime" + phone number at 80px Inter 500 (white) + below in a single row: address · hours · "Saada sõnum →" link.
8. **Footer** (rendered by SiteFooter, not Home).

### Files
- Rebuild `src/pages/HomePage.tsx`.
- Replace contents of `src/pages/home/sections.ts` with 6 sections (Opening, Intro, Craft, Works, Prices, FinalTableau).
- Delete every existing home section file that is no longer used. Rename what survives to match the new section names.

### Prompt for Claude Code

```
Wave 5 — Home page.

This is the biggest task in the redesign. Allocate the most attention here.
Read docs/wave-0-audit.md to see what home sections currently exist; delete
all of them except the bare HomePage container.

Build 6 new home section components in src/pages/home/:
  OpeningTableau.tsx
  IntroRow.tsx          (intro paragraph + phone column + trust line)
  CraftTableau.tsx      (services + workshop photos)
  WorksEssay.tsx        (asymmetric 6-image gallery)
  PricesBlock.tsx       (2-col, table on the right)
  FinalTableau.tsx      (full-bleed contact image)

Use ONLY the new tokens from Wave 3. All copy comes from
`homepage.*` in the locale JSONs — do not hard-code Estonian/Russian
strings.

KEY layout rules (do not deviate):

OpeningTableau:
  - 720px tall on >=1024px, 560px on tablet, 480px on mobile.
  - Full-bleed <img> (or <picture> with AVIF/WebP fallbacks) absolute-positioned
    behind. Use object-fit: cover.
  - A linear-gradient ::after on the image: rgba(0,0,0,0) 50% → rgba(0,0,0,0.55) 100%.
  - Content positioned absolute, left: var(--container-pad-desktop),
    bottom: var(--space-7). Max-width 540px.
  - Eyebrow above title in --ink-on-dark.
  - Title h1: clamp(40px, 5.5vw, 56px), color #fff, weight 500,
    letter-spacing -0.025em, line-height 1.05.
  - NO buttons in this section.
  - The image filename to expect: /images/hero-workshop.jpg (Wave 8
    sources it; for now reference the existing background.png).

IntroRow:
  - display grid 6fr / 4fr, gap var(--space-6), align-items: end.
  - Left: <p> with text from homepage.heroLead, font-size 18px,
    line-height 1.7, color var(--ink-body), max-width 540px.
  - Right (justify-self end): eyebrow "Helistage otse" then phone number
    at 32px font-weight 600 letter-spacing -0.015em. Anchor tag with
    href={tel:...} from site config.
  - Below this row (full-width): trust line with 3 items from
    homepage.trustMetrics (slice 0,3), separated by hairline verticals.
    Format: "<strong>{value}</strong> {label}". font-size 13px.

CraftTableau:
  - section id="services"
  - heading: eyebrow + h2 at var(--fs-h2) weight 500.
  - photo grid: display grid, grid-template-columns: 7fr 5fr,
    grid-template-rows: 1fr 1fr, gap var(--space-2), height 540px.
    .big spans rows 1-3. Other two cells single row.
  - All three photos use <picture> with eager loading (above fold).
  - Below photo grid: 3-col grid of captioned paragraphs from
    homepage.servicesShort. Each: h3 (20px weight 600) + p (15px muted).

WorksEssay:
  - section id="works", background var(--surface-stone-deep),
    padding var(--space-7) var(--container-pad-desktop).
  - heading: eyebrow "Tehtud tööd" + h2 "Näiteid valminud lahendustest."
  - Asymmetric 12-col grid (specified above). Use named grid template areas
    for clarity. The 6 example photos come from a static array in
    src/pages/home/works-examples.ts (placeholder filenames work fine for
    now; Wave 8 sources real photos).
  - Each photo cell: position relative, with a grad overlay
    `linear-gradient(180deg, transparent 50%, rgba(0,0,0,0.75) 100%)`
    and caption absolutely positioned bottom-left, color #fff.
  - Side caption cells are plain text cells (no image), top padding 16px,
    font-size 13px, color var(--ink-body), with strong inner title 16px
    color var(--ink-near-black).
  - Footer of section: flex space-between, left side counter
    "05 näidet — veel 30+ kataloogis" (use literal copy from a new
    locale key works.homeFooterCounter), right side link "Vaata kõiki
    töid →" (works.viewAllLink). Top border 1px hairline.

PricesBlock:
  - grid 7fr / 5fr, gap var(--space-6).
  - Left: eyebrow + h2 "Mis mõjutab lõpphinda" + 2 paragraphs (use
    pricing.factorsBody from locales).
  - Right: small table inside a card-styled container
    (background var(--surface-card), border 1px var(--rule-color), padding 8px).
    Three rows of [tier name | "alates X €"], hairline dividers.
    Footer row of the card: "Täielik hinnakiri →" link.

FinalTableau:
  - section id="contact"
  - 540px tall full-bleed image like OpeningTableau.
  - Bottom-left overlay: eyebrow "Räägime" (color --ink-on-dark) + phone
    number 80px white weight 500 letter-spacing -0.04em line-height 1
    + below in a single horizontal flex row separated by 32px gaps:
        <span>{address}</span>
        <span>{hours}</span>
        <a href="/{locale}/contact">Saada sõnum →</a>
    All text white or rgba(255,255,255,0.75).
  - NO buttons. Phone is the call-to-action; everything else is a text link.

Then update src/pages/home/sections.ts to compose:
  [OpeningTableau, IntroRow, CraftTableau, WorksEssay, PricesBlock, FinalTableau]

Update HomePage.tsx to map sections.ts into JSX, render <SeoHead/>, and
that's it.

Add the missing locale keys you needed (e.g. pricing.factorsBody,
works.homeFooterCounter, works.viewAllLink, etc) to all three locales
with consistent meaning. Do NOT invent flowery copy — translate from
ET if RU/EN don't exist, and keep tone restrained.

Verify:
  npm run lint
  npm run test
  npm run build
  node scripts/validate-content.mjs
  In dev: open /et/, scroll top to bottom. There should be exactly
  6 sections, no extras. The phone number should appear in the header,
  the IntroRow's right column, and the FinalTableau — 3 times total.
```

### Acceptance
- Home page renders with all 6 sections.
- No leftover sections from the previous design.
- Phone appears in exactly 3 places on the page (header, intro, final).

---

## Wave 6 — Works page

**Goal:** Build `/works` as the single combined gallery (replaces portfolio + memorials + catalog).

### Prompt for Claude Code

```
Wave 6 — Works page.

File: src/pages/WorksPage.tsx + src/pages/works/ (new folder).

Layout:

1. Page header:
   - eyebrow "Tööd · Empire Granit"
   - h1 "Näited valminud lahendustest" (clamp 40-64px, weight 500)
   - intro paragraph from works.pageLead, max-width 640px, font 18px.

2. Filter row (optional, simple):
   - Inline pill filters showing categories: Kõik / Monumendid / Piirded /
     Graveeringud / Paigaldus. State held in a useState. Active filter
     gets a wood-colored underline. NO complex modal filter UI.
   - "Filtreeri" label to the left of the pills.

3. Asymmetric photo essay grid — DIFFERENT pattern than the home page's
   teaser (don't repeat the same composition). Use a 12-col grid with a
   custom repeating pattern across rows of 3 — for example:
     row group A:  [col 1/8 portrait 2-row] [col 8/13 1-row landscape]
                                            [col 8/13 1-row landscape]
     row group B:  [col 1/5 square] [col 5/9 square] [col 9/13 portrait 2-row]
                   [col 1/5 landscape spans 1 row] [col 5/9 landscape spans 1 row]
   Each photo: same overlay treatment as Home (180deg gradient,
   bottom-left white caption with title + material).

4. Bottom: a quiet "Küsi sarnast lahendust" CTA band — single text-link
   style: small eyebrow + h2 "Sobiv lahendus pole nimekirjas?" + paragraph
   + text link "Räägime telefoni teel" with phone tel: link. No solid
   button.

Data: static array in src/pages/works/works-data.ts:
  { id, title, material, category, image, ratio: 'portrait' | 'landscape' | 'square' }
  Start with 12 entries. Filenames placeholder — Wave 8 sources photos.

Each work item is a clickable link, but for now /works/{id} routes
just scroll to itself (no detail page in MVP). When we have real
work photos and content, we can add /works/[id] in a future wave;
for now the catalogue page is the destination.

SEO: <SeoHead/> with:
  title: from locales works.pageTitle
  description: from a new works.metaDescription key
  canonical: builds correctly per locale

Verify:
  npm run lint
  npm run test
  npm run build
  node scripts/validate-content.mjs
  node scripts/check-links.mjs
  In dev: open /et/tood — should show header + intro + filter pills +
  asymmetric 12-item gallery + CTA band. Filtering should work.
```

### Acceptance
- `/works` exists in all three locales.
- Filter pills work client-side.
- Gallery is asymmetric (not a uniform 3-col card grid).

---

## Wave 7 — Pricing page

**Goal:** Existing pricing copy (400 / 700 / 100 €) gets the N3 treatment.

### Prompt for Claude Code

```
Wave 7 — Pricing.

File: src/pages/PricingPage.tsx, src/pages/pricing/*.

Keep the existing 3-tier copy from the locale JSONs EXACTLY:
  Monumendid — alates 400 €
  Piirded — alates 700 €
  Paigaldus — alates 100 €

DO NOT change the prices, the bullet content, or the order.

Layout:

1. Page header (same pattern as Works):
   eyebrow + h1 "Hinnakiri" + intro paragraph.

2. The intro paragraph and section sit centered with max-width 720px.

3. Three tier cards in a single horizontal row on desktop (>=1024px),
   stacked on mobile. Each card:
   - background var(--surface-card), border 1px var(--rule-color),
     no border-radius (or var(--radius-sm) max), padding var(--space-5).
   - Top of card: eyebrow "Tier 0X" (X = 1,2,3) in var(--accent-wood).
   - h3 with the tier name at 32px weight 500.
   - Price at 18px var(--accent-wood) weight 600.
   - Hairline rule below price (var(--rule-color)).
   - Body paragraph (the "Included:" text from locales).
   - <ul> of bullets prefixed with ✓ in var(--accent-wood). Items
     separated by 1px hairline.
   - "Affects final cost" caption in var(--ink-muted), font-size 14px,
     italic via font-family var(--font-italic-accent).
   - One text link at the bottom: "Küsi täpset hinnangut →" — links to
     /contact with a ?tier=monuments|borders|installation query.

4. Below the cards: a centered paragraph 720px wide:
   "Lõplik hind sõltub graniidist, suurusest, graveeringust, krundi
    seisukorrast ja transpordist. Täpne arvutus pärast lühikest
    nõustamist."  (use locale key pricing.disclaimerFooter — already exists)

5. Below that: a single quiet contact band — phone number 56px weight 500,
   centered, with var(--accent-wood) underline. Below: "või saada sõnum"
   text link.

Bullet style: ✓ for ALL three tiers. Apply uniformly.

DO NOT add a 4th tier. Do not invent extra fields. Use what's in the
locale JSONs exactly.

Verify:
  npm run lint
  npm run test
  npm run build
  node scripts/validate-content.mjs
  Visit /et/hinnakiri — prices match what was there before, layout
  is the N3 treatment.
```

### Acceptance
- Same prices, same bullets — restyled only.
- Single CTA per card (text link, not solid button).

---

## Wave 8 — Contact page

**Goal:** Merge the two forms into one progressive form. Re-pin the map. Phone is the biggest element.

### Prompt for Claude Code

```
Wave 8 — Contact.

Files: src/pages/ContactPage.tsx, src/pages/contact/*.

Delete CallbackForm.tsx and InquiryForm.tsx — they are being merged.
Build one ContactForm.tsx.

Layout (single column, max-width 960px):

1. Page header (same pattern):
   eyebrow + h1 "Räägime" + intro paragraph from contact.intro locale key.

2. PHONE BLOCK (most visible element on the page):
   - Centered. eyebrow "Helistage otse" in --accent-wood.
   - Phone number at 96px Inter 500 letter-spacing -0.04em, color
     --ink-near-black, with --accent-wood underline.
   - Below the number: hours line in 16px var(--ink-muted).

3. SEPARATOR: 1px hairline + 32px gap.

4. CONTACT FORM (ContactForm.tsx):
   - First field: segmented control with two options:
       "Saada sõnum"  (default)
       "Telli tagasihelistamine"
   - Two-state form rendered below the segmented control:
     a) Saada sõnum mode shows:
        - Name (required)
        - Phone OR Email (one required, both optional but one needed)
        - Message (textarea, required)
        - Optional file upload (image, max 5MB)
        - Submit button (single, wood-colored — NOT near-black)
     b) Telli tagasihelistamine mode shows:
        - Name (required)
        - Phone (required)
        - Best time to call (optional, text input)
        - Submit button (same wood color)
   - The same submit button handler in both modes; payload shape
     extends the existing Firebase function with a `kind: "message" |
     "callback"` field.
   - Loading state on submit (button disabled + spinner). Success state
     replaces form with a thank-you card. Error state shows inline error
     above submit.
   - All copy from contact.* locale keys.

5. CONTACT REGISTER (below form):
   Plain table-like block of fields (no card chrome):
     E-mail: ms.pamyatnik@mail.ru
     Töökoda: Pähklimäe 2, Narva
     Lahti: E–R 9:00–17:00 · L kokkuleppel
   Each row: label in --ink-quiet uppercase 10px 0.22em letter-spacing,
   value in 18px --ink-near-black. Rows separated by hairline.

6. MAP:
   - Google Maps embed with query="Empire Granit, Pähklimäe 2, Narva".
   - Do NOT use the generic "Lidl" search.
   - 480px tall, full-width within container.
   - Frame border 1px --rule-color.

A11y:
- All form fields have explicit <label> + aria-describedby for errors.
- aria-live="polite" on the success/error message region.
- Tab order matches visual order.

Submit handler:
- Hit the existing Firebase endpoint shape (keep backward-compat). If the
  endpoint expects { name, phone, email, message }, send those keys. Add
  `kind` and other new fields under a `meta` sub-object so deserialization
  is non-breaking.

Verify:
  npm run lint
  npm run test
  npm run build
  node scripts/validate-content.mjs
  Visit /et/kontakt — should render: phone (big), form (single, with
  segmented control), contact register, map (centered on workshop).
```

### Acceptance
- One form. Wood-colored submit button. Map shows the workshop, not Lidl.
- Phone is the largest element on the page (bigger than any heading).

---

## Wave 9 — Imagery, sweep, and ship

**Goal:** Source stock photography, run the final QA gauntlet.

### Prompt for Claude Code

```
Wave 9 — Final sweep.

Tasks:

1. Imagery sourcing:
   - The N3 design depends on real stock photographs in 4 categories:
     a) Hero / opening tableau — workshop interior, landscape orientation,
        cool stone palette, ~2400px wide.
     b) Craft tableau — workshop hands working stone (tall portrait),
        engraving close-up (square), raw granite slab (square).
     c) Works essay — 6 placeholders of monuments in various shapes
        (mix of portrait, landscape, square).
     d) Final tableau — workshop exterior or installation site landscape.
   - Source from Unsplash / Pexels with the search terms: "granite workshop",
     "stone carving hands", "engraving granite", "memorial monument",
     "stonemason". Choose photos that:
     · do NOT show grieving people, candles, or cemeteries with crying
     · DO show material, hands, tools, edges, light on stone
     · have a desaturated/cool palette (or desaturate in post)
   - Save into public/images/. Optimize each as both AVIF and WebP, with
     JPG fallback. Generate 1x and 2x.
   - Update all <picture> elements added in Waves 5/6 to reference the
     new filenames.

2. SEO sweep:
   - Every page must render <SeoHead/> with unique title + description +
     canonical (with locale prefix).
   - hreflang alternates for every locale on every route.
   - <html lang="..."> matches the active locale.

3. Lighthouse audit on /et/, /et/tood, /et/hinnakiri, /et/kontakt at both
   desktop (1440) and mobile (375). Target ≥95 Performance, ≥95
   Accessibility, ≥95 Best Practices, ≥95 SEO. Fix anything below 90.

4. Cross-locale parity check:
   - Open every page in et, ru, en.
   - Verify no English text leaks into the ru or et build.
   - Verify the language switcher highlights the active locale.

5. Final verification:
   npm run lint
   npm run test
   npm run build
   node scripts/validate-content.mjs
   node scripts/check-links.mjs

6. Write deliverables:
   - docs/art-direction.md: the N3 visual system (palette, type, photo
     direction, motion principles, do/don't examples).
   - docs/content-map.md: every page × every section, what it contains.
   - docs/responsive-notes.md: breakpoints + how N3 collapses on mobile
     (especially the asymmetric Works grid).
   - docs/changelog.md: list of routes deleted, files removed, locale
     keys added/removed.

7. Tag the build: produce a git commit with the message
   "feat: N3 redesign — 9 routes deleted, 4 pages remain, full
   restructure to Workshop Reportage direction"
   (commit, do not push to main — owner will review).
```

### Acceptance
- Real photos in place. AVIF/WebP served.
- Lighthouse ≥95 across the board.
- All four docs/ files exist.
- Repo is one tagged commit away from deployment.

---

## 4. Cross-cutting rules (all waves)

1. **Locale parity** — every visible string in `src/content/locales/{en,et,ru}.json`. Never hard-code.
2. **Tokens only** — never inline a hex code in a component. If a token is missing, add it to `tokens.css`.
3. **No new visual primitives** — N3 has a fixed grammar (hairlines, wood accent, sans-only, italic EB Garamond used sparingly). Resist drift.
4. **Don't touch admin** — `src/pages/AdminPage.tsx`, `src/components/admin/*`, `src/components/AdminGuard.tsx`, Firebase admin wiring are internal and out of scope.
5. **Phone is sacred** — appears on every page in the header, and as a large element on Home + Contact. Always `<a href="tel:+37258116373">`.
6. **No emoji.** No AI illustrations. No invented copy. No testimonials.
7. **Ask, don't guess.** If a wave hits an ambiguous decision the prompt doesn't cover, stop and ask the owner.

---

## 5. Don'ts

- Don't add a configurator, FAQ, materials page, restoration page, process page, about page, or anything else not in the 4-page sitemap.
- Don't introduce new colors. The palette is fixed.
- Don't use the bronze (#8B7355) from the old design — N3 uses wood brown #A87B4B. Replace every instance.
- Don't ship without running the full verification command suite.
- Don't commit without the owner reviewing each wave's output.

---

## 6. Open questions to confirm before Wave 1

1. **Email domain.** Current is `ms.pamyatnik@mail.ru`. Owner-only decision: keep, or change to `info@empire-granit.ee`? Plan assumes KEEP per previous direction.
2. **WhatsApp / Telegram.** Plan does NOT add a WhatsApp button. Confirm.
3. **Cookie banner.** Plan does NOT add one (existing Firebase analytics gating in `AnalyticsLoader.tsx` is the source of truth). Confirm.
4. **`/works/[id]` detail pages.** Plan defers these — Works is a single gallery for MVP. Add a future wave only if real photos arrive with enough material to support detail pages.
5. **Logo.** Plan uses the existing `/public/images/logo.png` unchanged. Owner can supply a new mark later without affecting the structure.

When the owner has answered these 5 questions, proceed to Wave 0.
