import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { locales, projectRoot, readRouteSegments } from './routes.mjs';

function isObject(value) {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function collectPaths(value, prefix = '') {
  if (Array.isArray(value)) {
    if (value.length === 0) {
      return [`${prefix}[]`];
    }
    return collectPaths(value[0], `${prefix}[]`);
  }

  if (!isObject(value)) {
    return [prefix];
  }

  const paths = [];
  for (const key of Object.keys(value)) {
    const nextPrefix = prefix ? `${prefix}.${key}` : key;
    paths.push(...collectPaths(value[key], nextPrefix));
  }

  return paths;
}

async function readLocale(locale) {
  const raw = await readFile(
    path.join(projectRoot, 'src/content/locales', `${locale}.json`),
    'utf8'
  );
  return JSON.parse(raw);
}

async function run() {
  const [referenceLocale, ...restLocales] = locales;
  const reference = await readLocale(referenceLocale);
  const referencePaths = collectPaths(reference).sort();

  for (const locale of restLocales) {
    const candidate = await readLocale(locale);
    const candidatePaths = collectPaths(candidate).sort();

    const missing = referencePaths.filter((value) => !candidatePaths.includes(value));
    const extra = candidatePaths.filter((value) => !referencePaths.includes(value));

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
  }

  const routeSegments = await readRouteSegments();

  for (const routeKey of Object.keys(routeSegments)) {
    for (const locale of locales) {
      if (typeof routeSegments[routeKey][locale] !== 'string') {
        throw new Error(`Route ${routeKey} is missing locale segment for ${locale}`);
      }
    }
  }

  for (const locale of locales) {
    const localizedSegments = Object.values(routeSegments).map((value) => value[locale]);
    const deduped = new Set(localizedSegments);
    if (deduped.size !== localizedSegments.length) {
      throw new Error(`Route segments for locale ${locale} must be unique.`);
    }
  }

  console.log('Content validation passed for all locales and route segments.');
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
