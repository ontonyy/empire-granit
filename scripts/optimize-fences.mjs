#!/usr/bin/env node
/**
 * optimize-fences.mjs — build shipped gallery derivatives for fence photos.
 *
 * Input:  public/images/fences/OG_NNN[_1|_2].jpg (raw originals, source only)
 *   - OG_NNN_1 + OG_NNN_2 -> main = _2; hover (alt) = _1
 *   - OG_NNN              -> main only
 * Output: public/images/n3/fences/ogNNN.{avif,webp,jpg}     (idle / main)
 *         public/images/n3/fences/ogNNN_alt.{avif,webp,jpg} (hover, dual only)
 *
 * Longest side resized to GRID_WIDTH; JPEG uses mozjpeg. Re-running overwrites
 * derivatives deterministically from raw source and is therefore idempotent.
 *
 * Usage: node scripts/optimize-fences.mjs (or: npm run optimize:fences)
 */
import { mkdir, readdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const srcDir = path.join(root, 'public', 'images', 'fences');
const outDir = path.join(root, 'public', 'images', 'n3', 'fences');

const GRID_WIDTH = 1200;
const JPEG_QUALITY = 80;
const WEBP_QUALITY = 80;
const AVIF_QUALITY = 55;

await mkdir(outDir, { recursive: true });

const files = (await readdir(srcDir)).filter((file) => /^OG_\d+(?:_[12])?\.jpg$/i.test(file));

/** Group source files by base id -> { main, alt, single }. */
const groups = new Map();
for (const file of files) {
  const match = file.match(/^OG_(\d+)(?:_([12]))?\.jpg$/i);
  if (!match) continue;
  const [, number, variant] = match;
  const id = `og${number}`;
  const group = groups.get(id) ?? {};
  if (variant === '1') group.alt = file;
  else if (variant === '2') group.main = file;
  else group.single = file;
  groups.set(id, group);
}

const written = [];

async function emit(srcFile, outBase) {
  const source = path.join(srcDir, srcFile);
  const base = sharp(source).resize(GRID_WIDTH, GRID_WIDTH, {
    fit: 'inside',
    withoutEnlargement: true
  });
  const jobs = [
    { ext: 'avif', pipe: base.clone().avif({ quality: AVIF_QUALITY }) },
    { ext: 'webp', pipe: base.clone().webp({ quality: WEBP_QUALITY }) },
    { ext: 'jpg', pipe: base.clone().jpeg({ quality: JPEG_QUALITY, mozjpeg: true }) }
  ];

  for (const { ext, pipe } of jobs) {
    const output = path.join(outDir, `${outBase}.${ext}`);
    const info = await pipe.toFile(output);
    written.push({
      path: path.relative(root, output),
      width: info.width,
      height: info.height,
      sizeKb: Math.round(info.size / 1024)
    });
  }
}

let groupsWritten = 0;
for (const id of [...groups.keys()].sort()) {
  const group = groups.get(id);
  const isDual = Boolean(group.main && group.alt);
  const main = isDual ? group.main : group.single;

  if (!main) {
    console.warn(`skip ${id}: expected single source or both _1 and _2 variants`);
    continue;
  }

  await emit(main, id);
  if (isDual) await emit(group.alt, `${id}_alt`);
  groupsWritten += 1;
  console.log(`${id}${isDual ? ' (+alt)' : ''}`);
}

for (const file of written) {
  console.log(`  wrote ${file.path} (${file.width}×${file.height}, ${file.sizeKb} KB)`);
}
console.log(`\ndone: ${written.length} files across ${groupsWritten} fence bases`);
