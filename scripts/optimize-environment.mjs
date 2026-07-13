#!/usr/bin/env node
/**
 * optimize-environment.mjs — build shipped gallery derivatives + metadata for
 * landscaping bench photos, and attach localized descriptions.
 *
 * Input:  public/images/environment/BLAG_NNN[_1|_2].jpg|JPG (raw originals)
 *           - BLAG_NNN_1 + BLAG_NNN_2 -> main = _1 (idle); alt (swap) = _2
 *           - BLAG_NNN               -> single (main only)
 *         public/images/environment/description-{ru,en,et}.md (bench descriptions)
 * Output: public/images/n3/environment/blagNNN.{avif,webp,jpg}      (idle / main)
 *         public/images/n3/environment/blagNNN_alt.{avif,webp,jpg}  (swap, dual only)
 *         src/pages/works/environment.data.json                     (tile metadata)
 *
 * Descriptions: header line `BLAGn (price)` starts a bench; price in parens is
 * stripped, trailing catalog codes (e.g. `11/50`) are dropped. Body lines are
 * kept verbatim (line breaks preserved) until the next `BLAGn` header.
 *
 * Longest side resized to GRID_WIDTH; JPEG uses mozjpeg. Idempotent.
 *
 * Usage: node scripts/optimize-environment.mjs (or: npm run optimize:environment)
 */
import { mkdir, readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const srcDir = path.join(root, 'public', 'images', 'environment');
const outDir = path.join(root, 'public', 'images', 'n3', 'environment');
const dataFile = path.join(root, 'src', 'pages', 'works', 'environment.data.json');

const GRID_WIDTH = 1200;
const JPEG_QUALITY = 80;
const WEBP_QUALITY = 80;
const AVIF_QUALITY = 55;

const LOCALES = { ru: 'description-ru.md', en: 'description-en.md', et: 'description-et.md' };
const HEADER = /^BLAG\s*(\d+)(?:\s*\([^)]*\))?/i;

function ratioOf(w, h) {
  if (h > w * 1.1) return 'portrait';
  if (w > h * 1.1) return 'landscape';
  return 'square';
}

/** Parse one description markdown into { <benchNumber>: text }. */
function parseDescriptions(text) {
  const map = {};
  let current = null;
  let buffer = [];
  const flush = () => {
    if (current != null) map[current] = buffer.join('\n').trim();
    buffer = [];
  };
  for (const rawLine of text.split(/\r?\n/)) {
    const line = rawLine.replace(/\s+$/, '');
    const header = line.match(HEADER);
    if (header) {
      flush();
      current = Number(header[1]);
      continue;
    }
    if (line.trim() === 'BLAG') continue; // stray marker
    if (current == null) continue;
    buffer.push(line);
  }
  flush();
  return map;
}

const descByLocale = {};
for (const [locale, file] of Object.entries(LOCALES)) {
  descByLocale[locale] = parseDescriptions(await readFile(path.join(srcDir, file), 'utf8'));
}

await mkdir(outDir, { recursive: true });

const files = (await readdir(srcDir)).filter((file) => /^BLAG_\d+(?:_[12])?\.jpe?g$/i.test(file));

/** Group source files by base number -> { main, alt, single }. */
const groups = new Map();
for (const file of files) {
  const match = file.match(/^BLAG_(\d+)(?:_([12]))?\.jpe?g$/i);
  if (!match) continue;
  const [, number, variant] = match;
  const group = groups.get(number) ?? {};
  if (variant === '1') group.main = file;
  else if (variant === '2') group.alt = file;
  else group.single = file;
  groups.set(number, group);
}

async function emit(srcFile, outBase) {
  const base = sharp(path.join(srcDir, srcFile)).resize(GRID_WIDTH, GRID_WIDTH, {
    fit: 'inside',
    withoutEnlargement: true
  });
  const jobs = [
    { ext: 'avif', pipe: base.clone().avif({ quality: AVIF_QUALITY }) },
    { ext: 'webp', pipe: base.clone().webp({ quality: WEBP_QUALITY }) },
    { ext: 'jpg', pipe: base.clone().jpeg({ quality: JPEG_QUALITY, mozjpeg: true }) }
  ];
  let dims = null;
  for (const { ext, pipe } of jobs) {
    const info = await pipe.toFile(path.join(outDir, `${outBase}.${ext}`));
    if (ext === 'jpg') dims = { width: info.width, height: info.height };
  }
  return dims;
}

const items = [];
for (const number of [...groups.keys()].sort()) {
  const group = groups.get(number);
  const main = group.main ?? group.single;
  if (!main) {
    console.warn(`skip BLAG_${number}: no main/_1/single source`);
    continue;
  }
  const outBase = `blag${number}`;
  const dims = await emit(main, outBase);

  let hoverImageBase;
  if (group.alt) {
    await emit(group.alt, `${outBase}_alt`);
    hoverImageBase = `${outBase}_alt`;
  }

  const n = Number(number);
  const description = {
    en: descByLocale.en[n] ?? '',
    et: descByLocale.et[n] ?? '',
    ru: descByLocale.ru[n] ?? ''
  };

  items.push({
    id: `blag-${number}`,
    imageBase: outBase,
    ...(hoverImageBase ? { hoverImageBase } : {}),
    width: dims.width,
    height: dims.height,
    ratio: ratioOf(dims.width, dims.height),
    description
  });
  console.log(`${outBase} -> ${dims.width}x${dims.height}${hoverImageBase ? ' (+alt)' : ''}${description.ru ? '' : ' [no desc]'}`);
}

await writeFile(dataFile, JSON.stringify(items, null, 2) + '\n');
console.log(`\ndone: ${items.length} benches; manifest -> ${path.relative(root, dataFile)}`);
