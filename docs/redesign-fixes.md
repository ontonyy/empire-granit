# Empire Granit — Fix Pass (Wave 10)

> Run after Waves 0–9 are complete. This wave doesn't touch the data model or routing — it's a **content + interaction polish pass** based on owner review of the live site at `localhost:5173`.

---

## 0. Context

The first nine waves landed a working N3 build. Owner reviewed it and requested specific changes across three areas:

1. **Hero interaction model** — adopt the Wix wh-1203 "cinematic reveal" pattern: first paint is image + logo + location only, header slides in on scroll.
2. **Copy** — replace stilted/AI-sounding English with plain human phrasing, strip the em-dashes, simplify image captions, remove redundant headings.
3. **Navigation** — turn the in-page anchors into real pages so each nav link opens a focused page; keep Home as a teaser of all four.

This single wave covers all three.

---

## 1. Sitemap change

The N3 plan locked in 4 public pages + Privacy. The fix-pass adds **one more page** (`/services`) so the header is four parallel destinations, not three anchors + one page.

```
/                      Home          (teasers of all four pages)
/services              Services      (NEW — was the #services anchor)
/works                 Works
/pricing               Pricing
/contact               Contact
/privacy               Privacy
/admin                 Admin (untouched)
```

Locale segments to add in `src/content/route-segments.json`:
```
services:
  et: "teenused"
  ru: "uslugi"
  en: "services"
```

---

## 2. Wave-10 prompt for Claude Code

Paste this whole block into a fresh Claude Code session opened at `empire-granit/`.

```
Wave 10 — Fix pass for owner review.

Goal: hero behavior change, copy cleanup, and turn in-page anchors into
real pages. Do NOT change the visual system (N3 tokens, palette,
typography). Only change interaction, content, and the route table.

Read first:
  - src/components/layout/SiteHeader.tsx
  - src/pages/HomePage.tsx and everything in src/pages/home/
  - src/content/locales/{en,et,ru}.json
  - src/pages/PricingPage.tsx
  - src/pages/ContactPage.tsx
  - src/pages/works/WorksPage.tsx
  - src/styles.css and src/styles/tokens.css

Then execute Tasks A through F in order. Verify after each.

------------------------------------------------------------------
TASK A — Scroll-reveal hero on the Home page only
------------------------------------------------------------------

Current behavior: SiteHeader is sticky from page load with its own
opaque background. Visitor lands on a busy header.

New behavior on the HOME route ONLY:
  - First paint: NO header is visible. The page begins with the
    full-bleed OpeningTableau image filling the viewport (min-height
    100vh, but capped at 100svh on mobile so the URL bar doesn't crop).
  - The OpeningTableau shows only: workshop logo (top-left), city
    label ("NARVA · EESTI"), and a single line of body copy
    (lower-left). No CTA buttons.
  - As the user scrolls down, the global SiteHeader fades + slides in
    from the top once scrollY > 80px. Smooth transition: 280ms ease.
  - The header background remains the existing rgba(238,235,228,0.92)
    with backdrop-filter blur(8px), and gains a 1px bottom rule
    var(--rule-color) when revealed.
  - On every OTHER route (services, works, pricing, contact, privacy)
    the header is visible from page load — same as today. Only Home
    gets the scroll-reveal treatment.
  - On mobile widths (< 768px), the scroll-reveal still applies on
    Home, but the reveal threshold drops to 40px so the header doesn't
    feel hidden too long on short hero heights.

Implementation:
  - Add a useScrollReveal hook in src/hooks/useScrollReveal.ts that
    returns `revealed: boolean` based on window scrollY > threshold.
  - SiteHeader accepts an optional prop `revealOnScroll?: boolean`.
    When true, it reads the hook and adds a CSS class `is-hidden`
    until revealed, then transitions to `is-revealed`.
  - The class `is-hidden` sets transform: translateY(-100%) opacity:0
    pointer-events: none.
  - In the page layout (probably src/components/layout/SiteLayout.tsx
    or wherever SiteHeader is rendered), pass revealOnScroll={true}
    only on the home route.
  - Inside OpeningTableau.tsx:
      · Add a small top-left logo block (logo image + wordmark
        "EMPIRE GRANIT" + small "NARVA · EESTI" location line below).
        Use the existing logo asset.
      · Move the existing eyebrow + h1 to bottom-left. Place a third
        short line below the h1 (body copy) — pulled from a new
        locale key `homepage.heroBodyLine`.
      · Add a phone link to the bottom-RIGHT corner, mirroring the
        header phone link styling but in white-on-image: small
        receiver icon + the number underlined with --accent-wood.
        This guarantees the phone stays reachable even while the
        header is hidden.
      · Set the section min-height to 100vh / 100svh.
  - When the user clicks the language switcher OR uses keyboard
    Tab to focus any header element, force the header revealed
    regardless of scroll position. Accessibility — never trap the
    header off-screen for keyboard users.

Acceptance:
  - Open / in dev → header invisible until scroll.
  - Open /services, /works, /pricing, /contact → header visible from
    first paint.
  - Tab into the page from URL bar → header reveals.
  - Lighthouse Accessibility ≥95 unchanged.

------------------------------------------------------------------
TASK B — Convert nav anchors into real pages
------------------------------------------------------------------

Currently the global nav has three in-page anchors (#services, #works,
#contact) plus one route link (/pricing). Owner wants every nav link
to open a focused page.

B1. Add a new public route `services`:
  - Update src/routing.ts ROUTE_KEYS to include 'services' (insert
    between 'home' and 'works' so the order is:
    home, services, works, pricing, contact, privacy).
  - Update src/types.ts RouteKey union.
  - Update src/content/route-segments.json with the segments listed
    in section 1 of this document.
  - Update src/App.tsx to mount <ServicesPage/> at /:locale/services.
  - Update scripts/prerender.mjs + scripts/routes.mjs + public/sitemap.xml
    to include the 18 new prerendered URLs (6 routes × 3 locales).
  - Update LocaleRouteResolver.tsx so any legacy slugs (`teenused`,
    `protsess`, `materjalid`, `taastamine`) 301 to the new
    `/{locale}/services`.

B2. Build src/pages/ServicesPage.tsx + src/pages/services/ folder.

  Page sections (top to bottom):

  i. Page header band (same pattern as Works and Pricing):
     - small eyebrow "Empire Granit · Narva"
     - h1: pulled from locale key services.title — "Our work"
       (en) / "Mida me teeme" (et) / "Что мы делаем" (ru)
     - short intro paragraph (services.lead)

  ii. Three service blocks, each laid out as a row:
      [60% column: text]   [40% column: photo]
      Alternating sides per block (text-left/photo-right, then
      photo-left/text-right, then text-left/photo-right).
      For each service block:
        - small numeral "01. / 02. / 03." in --accent-wood
        - h2 with service name (Monuments / Borders / Engravings)
        - body paragraph (2-3 sentences) — pulled from
          services.items[i].body (NEW locale key, see Task D)
        - bulleted list of 3-5 deliverables — services.items[i].deliverables
        - inline text link "Get an estimate" → /contact (no button)
      Photo uses the existing /images/n3/craft-*.jpg files; if more
      images are needed, fall back to placeholders and log the gap.

  iii. Quiet contact band at the bottom:
       eyebrow "Ready to start?" + phone number 56px + small text
       link "Send a message →" pointing to /contact.

  Use only existing N3 tokens. No new colors, no buttons besides the
  text links.

B3. Update SiteHeader.tsx:
  - Replace the three anchor links with four real <Link> elements
    pointing to /services, /works, /pricing, /contact.
  - Each link uses aria-current="page" when active.
  - Remove the anchorHref logic and the AnchorDef type — no longer
    needed.
  - Keep the language switcher and phone link to the right of the
    nav as today.

B4. Update Home page to be a teaser:
  - HomePage stays composed of 6 sections, but each section ends
    with a "→ Learn more" text link to its dedicated page:
      · CraftTableau (rename file/component → ServicesTeaser):
        link → /services
      · WorksEssay → /works
      · PricesBlock → /pricing
      · FinalTableau → /contact
  - Trim each home teaser to ~60% of its current content:
      Services teaser: show 3 service titles + 1-line summary each
      (no full paragraphs), under the photo trio. Drop the long body.
      Works teaser: 4 images max instead of 5-6.
      Prices teaser: keep the 3-row table but remove the "what
      affects price" left column entirely — replace with a one-line
      sentence "Guide prices below — final cost depends on material,
      size, and site access." then the table.
      Final tableau: keep large phone, simplify the meta line
      (see Task C).
  - The principle: Home shows enough to understand each page exists,
    but visitors clicking the nav get the full detail.

------------------------------------------------------------------
TASK C — Copy cleanup (the big one)
------------------------------------------------------------------

All copy lives in src/content/locales/{en,et,ru}.json. Apply every
change to all three locales. Do not invent — translate from ET when
RU/EN need parallel changes.

C1. Replace the word "Craft" everywhere:
  - homepage.craftEyebrow: delete this key. Use homepage.servicesEyebrow
    with value:
      en: "Services"
      et: "Teenused"
      ru: "Услуги"
  - homepage.craftTitle: rename → homepage.servicesShortTitle, and
    soften the wording:
      en: "Monuments, borders, and engraving."
      et: "Monumendid, piirded ja graveering."
      ru: "Памятники, ограды и гравировка."
    (Drop the "Workshop in Narva — granite, engraving, finishing."
    construction — too many em-dashes, sounds catalog-like.)
  - Any CSS class or component named *craft* (e.g. CraftTableau,
    home-craft) → rename to *services* (ServicesTeaser, home-services).
    Update sections.ts, HomePage.tsx, styles.css imports.

C2. Strip stilted phrasing throughout. Apply ALL of these
    replacements in all three locales.

    Final tableau eyebrow:
      OLD: homepage.finalEyebrow = "Let's talk"
      NEW (en): "Contact"
      NEW (et): "Kontakt"
      NEW (ru): "Контакты"

    Works CTA body:
      OLD (en): "Every project starts with a conversation. Call us —
                 we will match material, dimensions and budget to your
                 memorial."
      NEW (en): "Every project starts with a conversation. Call us,
                 and we will match material, dimensions, and budget
                 to your memorial."
      (Note: comma + "and" replaces the em-dash. Same fix in et/ru —
       replace ` — ` with `, ` everywhere a sentence reads naturally
       with a comma.)

    Works CTA link:
      OLD (en): "Talk by phone"   value = "Talk by phone"
      NEW (en): "Call +372 5811 6373"
      NEW (et): "Helista +372 5811 6373"
      NEW (ru): "Позвонить +372 5811 6373"
      The phone number is read from siteConfig.contacts.phoneDisplay
      at render time — do NOT hard-code in the JSON. Set the locale
      value to a template "Call {phone}" / "Helista {phone}" /
      "Позвонить {phone}" and interpolate in WorksCtaBand.tsx.

    Pricing page heading collapse:
      The page currently shows the h1 "Pricing" from layout AND a
      second pricing.heading "Prices" duplicated below it. Remove
      the duplicate.
      - Delete pricing.heading from all three locales.
      - Update PricingPage.tsx to render only one h1, sourced from
        the route nav label OR from a new key pricing.title (single
        source). Suggested values:
          en: "Pricing"
          et: "Hinnakiri"
          ru: "Цены"

    Pricing intro paragraph:
      OLD (en): "Below are guide prices for core services. Final
                 cost depends on granite, size, engraving, site
                 condition, distance, and season. Exact calculation
                 follows a short consultation."
      NEW (en): "These are starting prices for our most common
                 services. The final price depends on the granite,
                 size, engraving, and site conditions. We confirm
                 it after a short consultation."
      Apply parallel simplifications to ET/RU. The rule: shorter
      sentences, no em-dashes, plain verbs.

    Works image captions:
      Owner finds "Lill — kõrgpiire ja lillealus · Lithuanian Black"
      verbose. Strip the long caption to just the number.
      - In src/pages/home/works-examples.ts and
        src/pages/works/works-data.ts: keep the title and material
        fields in the data model (they're still useful for alt text,
        SEO, and the dedicated Works page) BUT change the on-image
        caption to show only the ordinal: "01" / "02" / "03" / etc.
      - On the Home WorksEssay teaser: the overlay caption renders
        only the ordinal. The side-caption cells (negative space)
        still show the title + material in small type.
      - On /works (the dedicated page): same — ordinal as the overlay,
        title + material below in caption text outside the image.
      - Alt text on each <img> remains descriptive
        ("{title} — {material}") for accessibility.

    Contact page heading:
      OLD (en): contact.heading = "Request an estimate or consultation"
      NEW (en): "Get in touch"
      NEW (et): "Võtke ühendust"
      NEW (ru): "Свяжитесь с нами"
      (Plain, neutral. No "Let's talk".)

    Contact page intro:
      OLD (en): "You can contact us by phone during working hours,
                 leave a request on the site, or send an email."
      NEW (en): "Reach us by phone during working hours, send a
                 message through the form, or write to our email."
      Apply parallel rewrites to ET/RU.

    Final tableau meta line on home:
      Currently: "{address} {hours} Send a message →"  separated by
      bullets that look stilted. Restructure as:
        Line 1 (small caption): "{address}"
        Line 2 (small caption): "{hours}"
        Line 3 (text link): "Send a message →" → /contact
      Stacked, not horizontal. Cleaner on mobile too.

    Strip ALL ` — ` (em-dash with surrounding spaces) usages in
    body copy in en.json. They sound translated. Replace each with
    a comma or split into two sentences. Do not strip em-dashes
    inside design system labels (eyebrows, section headers) where
    they read as ornamental.

    Run this regex check in src/content/locales/en.json after edits:
      grep -E " — " src/content/locales/en.json
    The hit list should be at most 2-3 ornamental occurrences (e.g.
    eyebrow labels). Body copy must have none.

C3. Tone audit — read every key in en.json and re-check for:
    · "we offer", "we provide" → prefer "we make", "we install"
    · "solution(s)" used metaphorically → prefer "monument",
      "memorial", "border", "engraving"
    · "experience" used as a noun phrase ("our experience shows") →
      cut
    · Any sentence that starts with "Every project" outside the
      Works CTA → simplify
    · The phrase "site condition" → "site conditions" (plural)
    Apply parallel passes on ET and RU using the ET text as the
    canonical voice. If ET sounds natural, RU/EN should match its
    tone.

------------------------------------------------------------------
TASK D — New locale keys to add
------------------------------------------------------------------

Add these keys to all three locales (en/et/ru):

  homepage.heroBodyLine
    en: "Granite monuments and borders. Workshop in Narva, delivery
         across Estonia."
    et: "Graniitmonumendid ja piirded. Töökoda Narvas, vedu üle Eesti."
    ru: "Гранитные памятники и ограды. Мастерская в Нарве, доставка
         по Эстонии."

  homepage.servicesEyebrow (replaces craftEyebrow)
  homepage.servicesShortTitle (replaces craftTitle)
  homepage.servicesLearnMore  e.g. "See all services →"

  homepage.worksLearnMore  e.g. "See all works →"
  homepage.pricesLearnMore  e.g. "Full pricing →"

  homepage.heroLocation
    en: "NARVA · EESTI"
    et: "NARVA · EESTI"
    ru: "НАРВА · ЭСТОНИЯ"

  services.title  e.g. en: "Our work"
  services.lead   e.g. en: "Three services covering the full memorial,
                            from monument to installation."
  services.items[].title  (already exists in homepage.servicesShort;
                          move the source of truth here, then read
                          the short version from services.items)
  services.items[].body   (longer paragraph for the Services page)
  services.items[].deliverables  (array of strings, 3-5 each)

  pricing.title  e.g. en: "Pricing"
  (delete pricing.heading)

------------------------------------------------------------------
TASK E — Replace the contact background image
------------------------------------------------------------------

Owner reports that /images/n3/final-workshop-2x.jpg (used in
FinalTableau on Home and as the hero on Contact) does not match the
tone. Until a real photo is approved by the owner:

  - Keep the <picture> element structure intact (do NOT remove the
    image — that breaks the layout).
  - Swap the src/srcSet to a placeholder asset
    /images/n3/contact-placeholder.jpg that you generate as a 1024 ×
    1024 solid-color block in --surface-stone-deep (#E5E1D8) with a
    subtle 0.5% grain texture. Generate it with sharp or a one-off
    Node script committed under scripts/gen-placeholders.mjs.
  - Drop the gradient overlay opacity on the contact placeholder from
    0.85 down to 0.0 (no overlay needed on the flat color).
  - The white phone number now sits on the stone-deep background;
    bump its color to var(--ink-near-black) when the image filename
    matches the placeholder.
  - Add a TODO comment above both <picture> elements:
      // TODO(owner-image): replace with workshop exterior or
      // installation site photograph (landscape, cool desaturated
      // palette).

In the changelog at the bottom of the wave, surface this clearly so
the owner sees the placeholder is intentional.

------------------------------------------------------------------
TASK F — Component renames & cleanup
------------------------------------------------------------------

  - Rename src/pages/home/CraftTableau.tsx → ServicesTeaser.tsx.
    Update sections.ts, HomePage.tsx, styles.css selectors
    (.home-craft → .home-services-teaser).
  - Rename WorksEssay.tsx → WorksTeaser.tsx if it now only renders
    the 4-image teaser on Home — keep WorksPage.tsx as the dedicated
    page implementation separate.
  - Delete any unused image files referenced only by the deleted
    "craft" CSS rules.
  - Delete homepage.craft* keys from all three locales after the
    new keys are in place.

------------------------------------------------------------------
VERIFICATION (must all pass before committing)
------------------------------------------------------------------

  npm run lint
  npm run test
  npm run build
  node scripts/validate-content.mjs
  node scripts/check-links.mjs

  grep -RE " — " src/content/locales/en.json   # body copy must be clean
  grep -RE "Craft|craft" src/ --include="*.tsx" --include="*.ts" --include="*.css"
    # should return zero hits

  Manual checks in dev (npm run dev):
    □ /en/  → page loads with NO header. Scroll 100px → header fades in.
    □ /en/services → header visible immediately; 3 service blocks render.
    □ /en/works → image captions show only ordinal numbers on the
      image; title+material in side captions.
    □ /en/pricing → only one h1 ("Pricing"). No duplicated "Prices"
      heading below.
    □ /en/contact → heading reads "Get in touch", background is
      placeholder stone color, phone is dark.
    □ Keyboard Tab from URL bar on Home → header reveals on first
      Tab keypress.
    □ Mobile width 375 → header scroll threshold triggers at 40px.

  Write docs/wave-10-changelog.md listing:
    · every locale key renamed/deleted/added
    · every component renamed
    · the contact image placeholder note (call this out at the top
      so the owner sees it first)
    · which Lighthouse scores changed
```

---

## 3. About the contact image

I deliberately specced a flat-color placeholder for the Final/Contact background so Claude Code doesn't ship a wrong image. **Please send me a photo you'd like** (or describe what to source) and we'll add it in a small follow-up wave. Good candidates:

- Workshop exterior at Pähklimäe 2
- Wide shot of an installed monument in a quiet cemetery setting
- Close-up of polished granite edge against a neutral background
- Hands working stone (already used elsewhere — would feel repetitive)

---

## 4. Notes for you

- **localhost reach.** I can't load `localhost:5173` from this side — your dev server is local-only. I worked entirely from the repo source, which is why I want every change to be locale-key + component renames rather than "make it look like this screenshot."
- **One new page (`/services`).** This is a small expansion from the original 4-page plan. The home page becomes lighter (each section is a teaser → real page) so the total surface area is comparable.
- **Em-dash policy.** I kept ornamental em-dashes in eyebrows and headlines (where they read as type detail) but stripped them from body copy (where they read as machine-translated). The grep in the verification step enforces this.
- **Hero phone link.** I added a phone link to the bottom-right of the hero in addition to (eventually-revealed) header. That way the primary action is reachable on first paint even while the header is hidden.

When the owner picks a contact image and the wave-10 changelog comes back clean, we can do a Wave-11 polish pass for any micro-copy you want to keep tuning.
