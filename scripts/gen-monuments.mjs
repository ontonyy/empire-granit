// Generates optimized gallery derivatives for monument photos and a data file.
//
// Source: public/images/monuments/PAM_NNN[_1|_2].{jpg,jpeg}
//   - dual-photo monuments: _1 = detail, _2 = main (idle)
//   - single-photo monuments: one file, used as main
// Output:
//   - public/images/n3/works/monuments/<base>.{jpg,webp}  (downscaled)
//   - src/pages/works/monuments.data.json                  (tile metadata)
//
// Requires: sips (macOS) + cwebp. Run: node scripts/gen-monuments.mjs

import { execFileSync } from 'node:child_process';
import { mkdirSync, readdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const srcDir = join(root, 'public/images/monuments');
const outDir = join(root, 'public/images/n3/works/monuments');
const dataFile = join(root, 'src/pages/works/monuments.data.json');
const publicBase = 'n3/works/monuments';
const MAX_WIDTH = 1000;
const JPG_QUALITY = 80;
const WEBP_QUALITY = 80;

mkdirSync(outDir, { recursive: true });

const files = readdirSync(srcDir).filter((f) => /^PAM_\d+.*\.(jpe?g)$/i.test(f));

/** group source files by base id (PAM_NNN) */
const groups = new Map();
for (const file of files) {
  const m = file.match(/^(PAM_\d+?)(?:_(\d))?\.(jpe?g)$/i);
  if (!m) continue;
  const [, id, variant] = m;
  if (!groups.has(id)) groups.set(id, {});
  const g = groups.get(id);
  if (variant === '1') g.detail = file;
  else if (variant === '2') g.main = file;
  else g.main = file; // single-photo
}

function ratioOf(w, h) {
  if (h > w * 1.1) return 'portrait';
  if (w > h * 1.1) return 'landscape';
  return 'square';
}

/** downscale a source image into jpg + webp; return derivative dims */
function derive(srcFile, outBase) {
  const src = join(srcDir, srcFile);
  const jpg = join(outDir, `${outBase}.jpg`);
  const webp = join(outDir, `${outBase}.webp`);
  execFileSync('sips', ['-s', 'format', 'jpeg', '-s', 'formatOptions', String(JPG_QUALITY),
    '--resampleWidth', String(MAX_WIDTH), src, '--out', jpg], { stdio: 'ignore' });
  execFileSync('cwebp', ['-quiet', '-q', String(WEBP_QUALITY), '-resize', String(MAX_WIDTH), '0', jpg, '-o', webp]);
  const out = execFileSync('sips', ['--getProperty', 'pixelWidth', '--getProperty', 'pixelHeight', jpg]).toString();
  const w = Number(out.match(/pixelWidth:\s*(\d+)/)[1]);
  const h = Number(out.match(/pixelHeight:\s*(\d+)/)[1]);
  return { w, h };
}

const items = [];
for (const id of [...groups.keys()].sort()) {
  const g = groups.get(id);
  if (!g.main) {
    console.warn(`skip ${id}: no main photo`);
    continue;
  }
  const mainBase = g.main.replace(/\.(jpe?g)$/i, '');
  const { w, h } = derive(g.main, mainBase);
  const item = {
    id: id.toLowerCase().replace('_', '-'),
    photo: { main: `${publicBase}/${mainBase}` },
    width: w,
    height: h,
    ratio: ratioOf(w, h),
  };
  if (g.detail) {
    const detailBase = g.detail.replace(/\.(jpe?g)$/i, '');
    derive(g.detail, detailBase);
    item.photo.detail = `${publicBase}/${detailBase}`;
  }
  items.push(item);
  console.log(`${id} -> ${w}x${h} ${item.ratio}${g.detail ? ' (dual)' : ''}`);
}

writeFileSync(dataFile, JSON.stringify(items, null, 2) + '\n');
console.log(`\nwrote ${items.length} monuments to ${dataFile}`);
