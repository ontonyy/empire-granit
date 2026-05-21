# Art Direction

## Source Of Truth

- Use `src/styles/tokens.css` as final design authority. New UI must consume `var(--token-name)` tokens, not raw hex values.
- Legacy values in `src/styles.css` remain compatibility layer while sections migrate, but new work should prefer token primitives: `.ui-container`, `.ui-section`, `.ui-display`, `.ui-body`, `.ui-card`, `.ui-btn`, `.ui-swatch`.

## Palette

- Base surfaces: offwhite `--surface-offwhite` / `--bg-primary` (`#FAF7F2`), sand `--surface-sand` / `--bg-surface-warm` (`#F4EFE6`), white `--bg-surface`, graphite `--surface-graphite` / `--cta-dark` (`#2A2520`).
- Text: `--text-primary` (`#1A1A1A`) for primary copy, `--text-secondary` (`#3D3D3D`) for body support, `--text-muted` (`#6B6B6B`) for captions and secondary labels.
- Accent: bronze `--accent-bronze` (`#8B7355`) and hover bronze `--accent-bronze-hover` (`#A0876A`). Use bronze for CTAs, links, focus, active states, checkmarks, and eyebrow labels.
- Support accent: stone `--accent-stone` (`#A8AFA3`) for restrained material context only.
- Borders: `--border-subtle` / `--rule-hairline` (`#E8E2D5`) and `--border-strong` (`#C9BFAB`). Keep borders quiet and warm.
- Overall feel: warm offwhite, sand, bronze, graphite, subtle stone. Avoid saturated colors except domain assets such as granite swatches and WhatsApp green where already established.

## Type

- Display type: `--font-display` = Cinzel, with Playfair Display, Cormorant Garamond, Georgia, and serif fallbacks. Reserve for H1/H2 page titles and refined card titles.
- Body type: `--font-body` = Inter, with Söhne, Manrope, system UI, Apple system, BlinkMacSystemFont, and sans-serif fallbacks. Use for body, buttons, labels, nav, forms, feature cards, and dense content.
- Display scale: `--fs-h1`, `--fs-h2`, `--fs-h3` use `clamp()`. Body scale uses `--fs-body` and `--fs-body-lg`.
- Display treatment: `.ui-display` uses font weight 500, small caps features, line-height 1.15, letter-spacing 0.
- Eyebrows: small uppercase Inter, bronze, `--fs-eyebrow`, `--tracking-eyebrow` (`0.15em`). Legacy `.eyebrow` and `.section-kicker` use similar uppercase bronze tracking.
- Do not hardcode pixel font sizes in new components. Use tokens or existing UI primitives.

## Layout And Shape

- Spacing uses 8px token scale: `--space-1` through `--space-8`. Section padding uses `--section-pad`.
- Containers use `--container-max` 1280px with responsive side padding: 24px mobile, 48px tablet, 64px desktop.
- Radius scale: 8px small, 12px medium, 24px large. Existing legacy shells may use 20px, but new primitives should use token radius.
- Cards are restrained white or warm surfaces with subtle borders and light shadows. Avoid nested card compositions.
- Buttons use medium radius, Inter, no uppercase transform, bronze primary, ghost secondary with border.

## Motion

- Motion is quiet and functional. Token durations: `--motion-fast` 200ms, `--motion-quiet` 260ms, `--motion-base` 320ms with cubic-bezier `(0.2, 0, 0, 1)`.
- Existing legacy transitions use smooth ease and subtle movement: hover lift, border/color change, soft shadow. Keep movement small: 1-2px for refined primitives, larger legacy card lift only where already present.
- Reveal motion is fade plus vertical translate. Header uses glass slide-in; shell uses fade-in. Do not add busy loops, parallax, bouncing, or decorative animation.
- Focus states use bronze outline: `--focus-ring` with `--focus-offset`.

## Do

- Use token names and UI primitives before new CSS.
- Keep palette warm, quiet, material-led, and high contrast.
- Use real material/work imagery and granite swatches where visuals are needed.
- Use bronze as a precise accent, not a wash over every surface.
- Keep typography calm: Cinzel for page-level display, Inter for everything operational.
- Preserve accessible focus, hover, active, and selected states.

## Don't

- Do not introduce raw hex values, one-off spacing, or hardcoded pixel font sizes in new UI.
- Do not make new purple/blue gradients, dark slate themes, beige-only pages, or saturated accent systems.
- Do not use oversized marketing hero composition where a work surface or product grid is the actual task.
- Do not overuse glassmorphism; it exists mainly in legacy header/surfaces.
- Do not add decorative orbs, bokeh, stock-like atmosphere, or ornamental SVG scenes.
- Do not add loud motion, large hover jumps, text overlap risk, or layout shift on hover/selection.
