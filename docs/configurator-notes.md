# Configurator Notes

## Current Decisions
- Public configurator route is `preview`, with localized paths `ru/preview`, `et/eelvaade`, and `en/preview`.
- The first version is a client-side visual configurator, not a pricing or production-spec tool.
- Preview state is owned by `useMemorialConfig`; defaults are arched shape, black granite when available, polished finish, serif lettering, locale sample name/dates, and all add-ons off.
- Shape choices are fixed to eight SVG silhouettes: arched, flat, shouldered, heart, wave, cross, book, and oval.
- Stone choices come from existing gallery/catalog granite swatches plus additional swatches, deduped by `textureKey`; the UI currently displays the first eight swatches.
- Stone rendering reuses `getGraniteTextureImage` inside an SVG pattern, with token-backed fallback colors for known texture keys.
- Finish is visual-only and maps to polished, honed, and flamed surface classes.
- Engraving is visual-only and controls name text, date text, and lettering style: serif, sans, script, and caps.
- Add-ons are visual toggles for vase, photo, ornament, candle, and border.
- Config persistence uses base64 JSON in the `config` query parameter. The preview page can reopen from this parameter and can generate both a saved concept URL and a consultation URL.
- Contact handoff is `/contact?config=<base64>`. Contact form decodes the config, switches to message mode, preloads localized design-interest copy, includes a hidden `designConfig` field, and sends `designConfig` in the JSON payload.
- Contact payload compatibility is preserved: existing keys remain `locale`, `serviceType`, `name`, `phone`, `email`, `message`, and `attachments`; configurator handoff adds `formType`, `mode`, and `designConfig`.
- Analytics event names stay split by form mode: `contact_form_submit` for message mode and `callback_request_submit` for callback mode.

## Deferred
- No price calculation or quote estimate is implemented.
- No dimensions, material thickness, base/plinth sizing, or install-site constraints are captured.
- No server-side saved concept, share token, database record, or admin review flow exists.
- No image/PDF export exists for the generated concept.
- No validation constrains inscription length against the SVG layout.
- No contact payload schema/type dedicated to configurator handoff exists beyond the current form payload object.
- Final verification uses the repo npm scripts: `lint`, `test`, `build`, content validation, and localized route link check.
- Browser/mobile keyboard verification should be covered by a later manual QA pass if the configurator becomes production-critical.

## V2 Ideas
- Add a production-ready configuration schema with versioning, labels, and migration for old saved URLs.
- Add dimensions, base/plinth options, portrait style, engraving placement, ceramic/photo metadata, and accessory placement.
- Add quote bands or a "request exact quote" summary built from selected options without pretending to be final pricing.
- Add a printable/exportable concept sheet for workshop and customer review.
- Add server-side saved concepts so contact requests can reference a short stable ID instead of long base64 URL state.
- Add admin-side visibility for `designConfig` if form submissions are later stored or reviewed in the app.
- Add layout guards for long names/dates and locale-specific text length.
- Add visual regression coverage for desktop and mobile preview/contact handoff.
