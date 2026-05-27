#!/usr/bin/env node
/**
 * gen-placeholders.mjs — generate placeholder images used by N3.
 *
 * Wave 10 Block 3: writes public/images/n3/contact-placeholder.jpg as a
 * 1024×1024 solid block in --surface-stone-deep (#E5E1D8) with a subtle
 * (~0.5% sigma) noise overlay so the flat color does not band.
 *
 * Re-run only when the placeholder spec changes. Output is committed.
 *
 * Usage: node scripts/gen-placeholders.mjs
 */
import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.resolve(__dirname, '..', 'public', 'images', 'n3');
const outFile = path.join(outDir, 'contact-placeholder.jpg');

const SIZE = 1024;
const BASE = { r: 0xe5, g: 0xe1, b: 0xd8 };
const NOISE_SIGMA = 1.3; // ~0.5% of 255

await mkdir(outDir, { recursive: true });

const pixels = Buffer.alloc(SIZE * SIZE * 3);
for (let i = 0; i < SIZE * SIZE; i++) {
  // simple gaussian-ish via sum of two uniforms
  const n = ((Math.random() + Math.random() - 1) * NOISE_SIGMA) | 0;
  const offset = i * 3;
  pixels[offset] = Math.max(0, Math.min(255, BASE.r + n));
  pixels[offset + 1] = Math.max(0, Math.min(255, BASE.g + n));
  pixels[offset + 2] = Math.max(0, Math.min(255, BASE.b + n));
}

await sharp(pixels, { raw: { width: SIZE, height: SIZE, channels: 3 } })
  .jpeg({ quality: 86, mozjpeg: true })
  .toFile(outFile);

console.log(`wrote ${outFile}`);
