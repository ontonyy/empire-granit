#!/usr/bin/env node
/**
 * optimize-monuments.mjs — build shipped gallery derivatives for monument photos.
 *
 * Input:  public/images/monuments/PAM_NNN[_1|_2].{jpg,jpeg}  (raw originals, source)
 *   - PAM_NNN_1 + PAM_NNN_2 present -> first/main = _1, second/alt = _2
 *   - PAM_NNN alone                 -> single: main only
 * Output: public/images/n3/monuments/pamNNN.{avif,webp,jpg}         (idle / main)
 *         public/images/n3/monuments/pamNNN_alt.{avif,webp,jpg}     (hover, dual only)
 *
 * Longest side resized to GRID_WIDTH; jpeg via mozjpeg. Raw originals are the
 * source and stay unshipped. Idempotent — re-run when source or spec changes.
 *
 * Usage: node scripts/optimize-monuments.mjs   (or: npm run optimize:monuments)
 */
import { mkdir, readdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const srcDir = path.join(root, 'public', 'images', 'monuments');
const outDir = path.join(root, 'public', 'images', 'n3', 'monuments');

const GRID_WIDTH = 1200; // longest side, matches n3/works ~1024-1400 range
const JPEG_QUALITY = 80;
const WEBP_QUALITY = 80;
const AVIF_QUALITY = 55; // avif is denser; ~55 tracks webp/jpeg ~80 visually

await mkdir(outDir, { recursive: true });

const files = (await readdir(srcDir)).filter((f) => /^PAM_\d+.*\.(jpe?g)$/i.test(f));

/** group source files by base id -> { main, alt } source filenames */
const groups = new Map();
for (const file of files) {
  const m = file.match(/^(PAM_)(\d+)(?:_(\d))?\.(jpe?g)$/i);
  if (!m) continue;
  const [, , num, variant] = m;
  const id = `pam${num}`;
  if (!groups.has(id)) groups.set(id, {});
  const g = groups.get(id);
  if (variant === '1') g.main = file;
  else if (variant === '2') g.alt = file;
  else g.main = file; // single-photo
}

const written = [];

async function emit(srcFile, outBase) {
  const src = path.join(srcDir, srcFile);
  const base = sharp(src).resize(GRID_WIDTH, GRID_WIDTH, { fit: 'inside', withoutEnlargement: true });
  const jobs = [
    { ext: 'avif', pipe: base.clone().avif({ quality: AVIF_QUALITY }) },
    { ext: 'webp', pipe: base.clone().webp({ quality: WEBP_QUALITY }) },
    { ext: 'jpg', pipe: base.clone().jpeg({ quality: JPEG_QUALITY, mozjpeg: true }) }
  ];
  for (const { ext, pipe } of jobs) {
    const out = path.join(outDir, `${outBase}.${ext}`);
    const info = await pipe.toFile(out);
    written.push(`${path.relative(root, out)} (${Math.round(info.size / 1024)} KB)`);
  }
}

for (const id of [...groups.keys()].sort()) {
  const g = groups.get(id);
  if (!g.main) {
    console.warn(`skip ${id}: no main photo`);
    continue;
  }
  await emit(g.main, id);
  if (g.alt) await emit(g.alt, `${id}_alt`);
  console.log(`${id}${g.alt ? ' (+alt)' : ''}`);
}

for (const line of written) console.log(`  wrote ${line}`);
console.log(`\ndone: ${written.length} files across ${groups.size} monuments`);
