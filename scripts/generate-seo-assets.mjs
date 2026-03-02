import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { getLocalizedPaths, projectRoot } from './routes.mjs';

const siteUrl = (process.env.SITE_URL || 'https://user.github.io/empire-granit').replace(/\/$/, '');
const basePath = (process.env.BASE_PATH || '').replace(/\/$/, '');
const now = new Date().toISOString();

function withBase(pathname) {
  return `${siteUrl}${basePath}${pathname}`;
}

function buildSitemap(paths) {
  const urls = ['/', ...paths]
    .map((pathname) => {
      return [
        '  <url>',
        `    <loc>${withBase(pathname)}</loc>`,
        `    <lastmod>${now}</lastmod>`,
        '  </url>'
      ].join('\n');
    })
    .join('\n');

  return ['<?xml version="1.0" encoding="UTF-8"?>', '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">', urls, '</urlset>'].join('\n');
}

function buildRobots() {
  return ['User-agent: *', 'Allow: /', '', `Sitemap: ${withBase('/sitemap.xml')}`].join('\n');
}

async function run() {
  const paths = await getLocalizedPaths();
  const publicDir = path.join(projectRoot, 'public');

  await mkdir(publicDir, { recursive: true });
  await writeFile(path.join(publicDir, 'sitemap.xml'), buildSitemap(paths));
  await writeFile(path.join(publicDir, 'robots.txt'), buildRobots());

  console.log(`Generated sitemap.xml and robots.txt for ${paths.length} localized routes.`);
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
