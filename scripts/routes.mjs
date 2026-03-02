import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

export const locales = ['ru', 'et', 'en'];

export async function readRouteSegments() {
  const raw = await readFile(path.join(projectRoot, 'src/content/route-segments.json'), 'utf8');
  return JSON.parse(raw);
}

export async function getLocalizedPaths() {
  const routeSegments = await readRouteSegments();
  const routeKeys = Object.keys(routeSegments);
  return locales.flatMap((locale) =>
    routeKeys.map((routeKey) => {
      const segment = routeSegments[routeKey][locale];
      return segment ? `/${locale}/${segment}` : `/${locale}/`;
    })
  );
}

export { projectRoot };
