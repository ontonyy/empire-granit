import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { getLocalizedPaths, projectRoot } from './routes.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function injectHtml(template, appHtml, headTags, htmlAttributes) {
  const withHtmlAttrs = htmlAttributes
    ? template.replace('<html lang="en">', `<html ${htmlAttributes}>`)
    : template;
  const withApp = withHtmlAttrs.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`);
  return withApp.replace('</head>', `${headTags}\n</head>`);
}

async function run() {
  const distDir = path.join(projectRoot, 'dist');
  const ssrEntryPath = path.join(projectRoot, 'dist-ssr', 'entry-server.js');
  const template = await readFile(path.join(distDir, 'index.html'), 'utf8');
  const routes = await getLocalizedPaths();

  const moduleUrl = pathToFileURL(ssrEntryPath).href;
  const serverEntry = await import(moduleUrl);

  for (const route of routes) {
    const { appHtml, headTags, htmlAttributes } = serverEntry.render(route);
    const html = injectHtml(template, appHtml, headTags, htmlAttributes);
    const outputDir = path.join(distDir, route.replace(/^\//, ''));
    await mkdir(outputDir, { recursive: true });
    await writeFile(path.join(outputDir, 'index.html'), html);
  }

  await rm(path.join(projectRoot, 'dist-ssr'), { recursive: true, force: true });

  console.log(`Prerendered ${routes.length} routes.`);
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
