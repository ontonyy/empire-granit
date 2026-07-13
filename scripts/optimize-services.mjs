#!/usr/bin/env node
/**
 * optimize-services.mjs — generate responsive Services page image assets.
 *
 * Source PNGs stay in public/images/services/ and are not delivered by the page.
 * Output: public/images/n3/services_N-1x|2x.{avif,webp,jpg}, N=1..5.
 *
 * Usage: node scripts/optimize-services.mjs
 */
import { access, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const sourceDir = path.join(rootDir, 'public', 'images', 'services');
const outDir = path.join(rootDir, 'public', 'images', 'n3');
const widths = [700, 1400];
const formats = [
  { extension: 'avif', options: { quality: 55 } },
  { extension: 'webp', options: { quality: 80 } },
  { extension: 'jpg', options: { quality: 80, mozjpeg: true } }
];

await mkdir(outDir, { recursive: true });

for (let number = 1; number <= 5; number++) {
  const name = `services_${number}`;
  const input = path.join(sourceDir, `${name}.png`);
  try {
    await access(input);
  } catch {
    throw new Error(`Missing source image: ${input}`);
  }

  for (const width of widths) {
    const density = width === widths[0] ? '1x' : '2x';
    for (const { extension, options } of formats) {
      const output = path.join(outDir, `${name}-${density}.${extension}`);
      const result = await sharp(input)
        .rotate()
        .resize({ width, withoutEnlargement: true })
        .toFormat(extension, options)
        .toFile(output);
      console.log(`wrote ${path.relative(rootDir, output)} ${result.width}x${result.height}`);
    }
  }
}
