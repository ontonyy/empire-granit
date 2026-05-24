#!/usr/bin/env node
import fs from 'node:fs';

const tokensPath = 'src/styles/tokens.css';
const stylesPath = 'src/styles.css';

const tokensCss = fs.readFileSync(tokensPath, 'utf8');
const pat = /--(legacy-color-[a-z0-9-]+):\s*([^;]+);/g;
const map = {};
let m;
while ((m = pat.exec(tokensCss)) !== null) {
  map[m[1]] = m[2].trim();
}

let styles = fs.readFileSync(stylesPath, 'utf8');
let before = (styles.match(/legacy-color-/g) || []).length;
for (const [name, val] of Object.entries(map)) {
  styles = styles.split(`var(--${name})`).join(val);
}
let after = (styles.match(/legacy-color-/g) || []).length;
fs.writeFileSync(stylesPath, styles);
console.log(`legacy-color refs in styles.css: ${before} -> ${after}`);
console.log(`mapping size: ${Object.keys(map).length}`);
