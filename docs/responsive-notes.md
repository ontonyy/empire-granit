# Responsive Notes

Repo uses CSS breakpoints and fluid values in `src/styles.css` and `src/styles/tokens.css`; React components mostly expose class hooks, with `SiteHeader` owning mobile nav state.

## Breakpoints

- `640px` min: tokenized `.ui-container` padding grows from `--container-pad-mobile` to `--container-pad-tablet`; `.catalog-grid` moves from 1 to 2 columns. `640px` max: catalog grids collapse to 1 column and reduce gaps/padding.
- `760px` max: preview stepper changes from 5 columns to 3 columns; preview stage min-height drops from 520px to 420px and padding tightens.
- `767px` max: header emergency phone link becomes an icon-only circle by hiding prefix/value text and showing `.brand-emergency-icon`.
- `768px` min: token UI grids expand, e.g. `.ui-icon-grid` becomes 2 columns and feature/media grids use `40% 1fr`.
- `860px` max: process story/consultation grids collapse to 1 column; even story media order resets; consultation CTA allows wrapping.
- `900px` max: main mobile breakpoint. Header padding tightens, hamburger appears, `.main-nav` becomes hidden vertical drawer until `.open`; many page grids collapse to 1 column; admin stats become 2 columns; floating call button moves inward with smaller padding.
- `1000px` max: contact/map style grids collapse to 1 column.
- `1024px` min: tokenized `.ui-container` padding grows to `--container-pad-desktop`; catalog grid becomes 3 columns; preview workspace becomes two columns (`1fr` + `380px`) and preview controls become sticky.

## Layout Shifts

- Global shell is capped at `1200px` with `1.5rem` padding; newer `.ui-container` is capped by `--container-max: 1280px` with 24/48/64px responsive side padding.
- Typography and section spacing are partly fluid: tokens define `--fs-h1`, `--fs-h2`, `--fs-h3`, and `--section-pad` with `clamp()`, while legacy CSS also uses `clamp()` on hero and page headings.
- Navigation is desktop horizontal scrollable pills by default; at `max-width: 900px` it becomes a full-width stacked menu controlled by `mobileNavOpen` in `SiteHeader`.
- Home/about/privacy/gallery/catalog/contact/admin layouts use desktop multi-column grids, then collapse mainly at `900px`; catalog has extra `640px` and `900px` rules for product/granite grids.
- Preview page is mobile-first: single-column workspace by default, 5-step grid unless under `760px`, and desktop two-column editor at `1024px` with sticky controls.
- Reusable UI primitives in `tokens.css` are mobile-first; cards/sections keep fixed token spacing, while grids progressively add columns at `640px`, `768px`, and `1024px`.
