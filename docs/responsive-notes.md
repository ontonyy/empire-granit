# Responsive Notes — N3

## Breakpoints
Tokens in `src/styles/tokens.css`. Vite mobile-first; media queries scale up.

| Breakpoint | Width | Used for |
|---|---|---|
| (default) | < 640px | Phone portrait |
| `min-width: 640px` | 640+ | Phone landscape, small tablet |
| `min-width: 960px` | 960+ | Tablet, small laptop — multi-column unlock |
| `min-width: 1280px` | 1280+ | Desktop — full editorial grid |
| `min-width: 1600px` | 1600+ | Wide desktop — gutter widens |

## Hero (OpeningTableau)
- `<picture>` with srcset 1200w / 2400w + `sizes="100vw"`
- 14 MB hero PNG retired; AVIF 2x = 282 KB, AVIF 1x = 112 KB
- `loading="eager"`, `fetchpriority="high"`, head preload for AVIF
- Title centered + bottom-anchored at all sizes

## Craft tableau (3-photo grid)
| Width | Layout |
|---|---|
| < 640px | Stacked single column, big photo first |
| 640–959px | 2-col: big spans both, small two below |
| 960+ | 3-col asymmetric: big = 2 cols, fence + plate = 1 col each |

## Works essay (home asymmetric 7-cell grid)
The most opinionated layout. Cells `--a` through `--g` use named CSS-grid `grid-template-areas`.

| Width | Grid |
|---|---|
| < 640px | Linear vertical reading; type-only cells (`--b`, `--g`) collapse to inline labels |
| 640–959px | 2-col with reflowed areas: `a a / b c / d e / f g` |
| 960+ | Full 4-col editorial — see `styles.css` `.home-works__grid` |

Type-only cells (`--b`, `--g`) always sit beside their photo's cell for caption-pairing.

## Works gallery (`/et/tood/`)
- CSS grid `repeat(auto-fill, minmax(220px, 1fr))` mobile -> `minmax(280px, 1fr)` desktop
- Tile aspect via `.works-tile-{portrait,landscape,square}` modifier
- Filter pills horizontal scroll on < 640px

## Pricing
- Tiers: stacked on mobile -> 3-col equal at 960+
- Process steps: vertical numbered list mobile -> horizontal connector at 960+
- FAQ: stacked everywhere; `<details>` native disclosure

## Contact
- Phone (LCP) — single large element, clamp(3.5rem, 11vw, 6rem)
- Form full-width to 640px, then constrained to ~560px column
- Map iframe deferred via `IntersectionObserver` (300px rootMargin) — does not load on initial paint
- System font stack used on phone number to avoid LCP wait for Inter 500

## Global
- `<html>` font-size 100% (browser default), all sizing in rem / clamp
- `.ui-container` max-width 1280px, gutters via `--space-6` mobile -> `--space-12` desktop
- `.skip-link` always present, visible on focus
- `prefers-reduced-motion: reduce` collapses reveal-on-scroll to immediate
