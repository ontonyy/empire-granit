# Testing Patterns

**Analysis Date:** 2026-03-21

## Test Framework

**Runner:**
- Not detected. No `vitest.config.*`, `jest.config.*`, `playwright.config.*`, `cypress.config.*`, `phpunit.xml*`, or test-specific package dependencies are present in `package.json`.
- There are no `*.test.*` or `*.spec.*` files under the repository root outside `node_modules/`.

**Assertion Library:**
- Not detected.

**Run Commands:**
```bash
npm run validate:content   # Schema-level content validation via `scripts/validate-content.mjs`
npm run lint:links         # Route uniqueness check via `scripts/check-links.mjs`
npm run build              # End-to-end build pipeline with validation, SEO generation, SSR bundle, and prerender
```

## Test File Organization

**Location:**
- No automated test directory exists. `src/` contains application code only, and `scripts/` contains build and validation scripts.
- Current executable quality checks live in `scripts/validate-content.mjs` and `scripts/check-links.mjs`, both invoked from `package.json`.

**Naming:**
- Not applicable for test files because no test suite is present.
- Validation scripts use task-oriented names such as `validate-content.mjs`, `check-links.mjs`, and `prerender.mjs` in `scripts/`.

**Structure:**
```text
scripts/
  validate-content.mjs
  check-links.mjs
  prerender.mjs
src/
  ...application modules only, no colocated tests...
```

## Test Structure

**Suite Organization:**
```typescript
async function run() {
  // perform validation
  console.log('Validation passed');
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
```

This script pattern is used in `scripts/validate-content.mjs` and `scripts/check-links.mjs` instead of `describe`/`it` suites.

**Patterns:**
- Setup is done inline inside `run()` by loading JSON or route data, for example `readLocale()` and `readRouteSegments()` in `scripts/validate-content.mjs`.
- Assertions are implemented as explicit conditional checks followed by thrown `Error`s, for example missing locale schema keys or duplicate route segments in `scripts/validate-content.mjs` and `scripts/check-links.mjs`.
- Teardown is generally unnecessary because validations are read-only and do not create external fixtures or temporary resources.

## Mocking

**Framework:** Not used

**Patterns:**
```typescript
if (typeof window === 'undefined') {
  return;
}

try {
  await addDoc(collection(firestore, ANALYTICS_COLLECTION), event);
} catch (error) {
  if (import.meta.env.DEV) {
    console.warn('[analytics][firestore-write-failed]', error);
  }
}
```

`src/lib/analytics.ts` relies on runtime guards and graceful degradation instead of test doubles or mock layers.

**What to Mock:**
- No existing mocking strategy is implemented in the repo.
- If a future test suite is added, the first isolation boundaries should be browser globals used in `src/components/Layout.tsx`, `src/components/AnalyticsLoader.tsx`, and `src/components/AdminGuard.tsx`.
- External SDK boundaries in `src/lib/firebase.ts` and `src/lib/analytics.ts` are also clear candidates for mocks because they reach Firestore and analytics providers.

**What NOT to Mock:**
- Locale JSON structure in `src/content/locales/*.json` should stay as real fixture data because `scripts/validate-content.mjs` is explicitly validating those files.
- Route segment mappings in `src/content/route-segments.json` should also remain real data when verifying localized path behavior.

## Fixtures and Factories

**Test Data:**
```typescript
const content: Record<Locale, LocaleContent> = {
  ru: ru as LocaleContent,
  et: et as LocaleContent,
  en: en as LocaleContent
};
```

Real application fixtures currently come from `src/content/index.ts`, `src/content/locales/en.json`, `src/content/locales/et.json`, `src/content/locales/ru.json`, and `src/content/route-segments.json`.

**Location:**
- Locale and route fixtures live in `src/content/`.
- Configuration-driven runtime data lives in `src/config/site.ts`.
- There are no dedicated test factories or fixture helpers.

## Coverage

**Requirements:** None enforced

**View Coverage:**
```bash
# Not available. No coverage tool or coverage script is configured in `package.json`.
```

## Test Types

**Unit Tests:**
- Not used. No unit test runner, no assertions library, and no colocated `*.test.ts` or `*.spec.tsx` files were found.

**Integration Tests:**
- Build-time validation scripts act as lightweight integration checks for content and routing.
- `scripts/validate-content.mjs` verifies locale schema parity and route segment uniqueness against real JSON content.
- `scripts/check-links.mjs` verifies that localized paths produced from `src/content/route-segments.json` are unique.

**E2E Tests:**
- Not used. No Playwright, Cypress, Selenium, or browser automation config is present.

## Common Patterns

**Async Testing:**
```typescript
const snapshot = await getDocs(
  query(
    collection(firestore, ANALYTICS_COLLECTION),
    orderBy('timestamp', 'desc'),
    limit(MAX_FETCHED_EVENTS)
  )
);
```

Async production code exists in `src/lib/analytics.ts` and `src/pages/AdminPage.tsx`, but there are no automated tests around these flows.

**Error Testing:**
```typescript
if (missing.length || extra.length) {
  throw new Error(
    [
      `Locale ${locale} does not match ${referenceLocale} schema.`,
      missing.length ? `Missing keys: ${missing.join(', ')}` : '',
      extra.length ? `Extra keys: ${extra.join(', ')}` : ''
    ]
      .filter(Boolean)
      .join('\n')
  );
}
```

Current executable checks validate error conditions by throwing explicit `Error`s in `scripts/validate-content.mjs` and terminating the process in the shared `.catch(...)` wrapper.

## Verified Commands

The following commands were executed during this analysis and completed successfully:

- `npm run validate:content`
  - Runs `scripts/validate-content.mjs`
  - Result: content validation passed for all locales and route segments
- `npm run lint:links`
  - Runs `scripts/check-links.mjs`
  - Result: route link check passed with 24 unique localized paths

## Practical Guidance For New Tests

- If adding the first automated tests, place them next to the modules they cover in `src/` or under a new top-level `tests/` directory, then document the convention in `package.json`.
- Start with pure helpers in `src/routing.ts`, `src/content/index.ts`, and `scripts/routes.mjs` because they have deterministic inputs and minimal browser coupling.
- Add integration coverage around `src/App.tsx`, `src/components/LanguageSwitcher.tsx`, and `src/pages/ContactPage.tsx` once a React test runner is introduced, since those files encode critical routing and locale behavior.
- Treat `npm run validate:content`, `npm run lint:links`, and the GitHub Actions build in `.github/workflows/deploy.yml` as mandatory baseline checks even after introducing a test runner.

---

*Testing analysis: 2026-03-21*
