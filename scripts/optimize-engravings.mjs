#!/usr/bin/env node
/**
 * optimize-engravings.mjs — build shipped gallery derivatives for engraving/complex photos.
 *
 * Input:  public/images/complexes/COMP_NNN.png (raw originals, source only, single-variant)
 * Output: public/images/n3/engravings/compNNN.{avif,webp,jpg}  (grid derivative)
 *         src/pages/works/engravings.data.json                 (tile metadata)
 *
 * Longest side resized to GRID_WIDTH; JPEG uses mozjpeg. Re-running overwrites
 * derivatives deterministically from raw source and is therefore idempotent.
 *
 * Usage: node scripts/optimize-engravings.mjs (or: npm run optimize:engravings)
 */
import { mkdir, readdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const srcDir = path.join(root, 'public', 'images', 'complexes');
const outDir = path.join(root, 'public', 'images', 'n3', 'engravings');
const dataFile = path.join(root, 'src', 'pages', 'works', 'engravings.data.json');

const GRID_WIDTH = 1200;
const JPEG_QUALITY = 80;
const WEBP_QUALITY = 80;
const AVIF_QUALITY = 55;

function ratioOf(w, h) {
  if (h > w * 1.1) return 'portrait';
  if (w > h * 1.1) return 'landscape';
  return 'square';
}

await mkdir(outDir, { recursive: true });

const files = (await readdir(srcDir))
  .filter((file) => /^COMP_\d+\.png$/i.test(file))
  .sort();

const items = [];

for (const file of files) {
  const number = file.match(/^COMP_(\d+)\.png$/i)[1];
  const outBase = `comp${number}`;
  const source = path.join(srcDir, file);
  const base = sharp(source).resize(GRID_WIDTH, GRID_WIDTH, {
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

  items.push({
    id: `comp-${number}`,
    imageBase: outBase,
    width: dims.width,
    height: dims.height,
    ratio: ratioOf(dims.width, dims.height)
  });
  console.log(`${outBase} -> ${dims.width}x${dims.height} ${ratioOf(dims.width, dims.height)}`);
}

await writeFile(dataFile, JSON.stringify(items, null, 2) + '\n');
console.log(`\ndone: ${items.length} engravings; manifest -> ${path.relative(root, dataFile)}`);
