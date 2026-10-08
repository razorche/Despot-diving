import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const www = path.join(root, 'www');
const config = JSON.parse(
  fs.readFileSync(path.join(root, 'brand', 'despot.config.json'), 'utf8')
);

function walkHtml(dir, files = []) {
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name);
    if (fs.statSync(full).isDirectory()) walkHtml(full, files);
    else if (name.endsWith('.html')) files.push(full);
  }
  return files;
}

function applyReplacements(content, replacements) {
  let out = content;
  for (const [from, to] of replacements) {
    out = out.split(from).join(to);
  }
  return out;
}

const htmlFiles = walkHtml(www);
let htmlChanges = 0;

for (const file of htmlFiles) {
  const before = fs.readFileSync(file, 'utf8');
  let after = applyReplacements(before, config.replacements);
  after = after.replace(/<html lang="en">/g, '<html lang="sr">');
  after = after.replace(
    /<span class="count">10<\/span>/g,
    `<span class="count">${config.experienceYears}</span>`
  );
  after = after.replace(
    /Explore the\s*<br>\s*Underwater World\s*<br>\s*Like Never Before/gi,
    'Istraži podvodni svet <br> dubine Jadrana <br> kao nikada do sada'
  );
  if (after.includes('Seaflow')) {
    after = after.replace(/Seaflow/g, 'Despot Dive');
  }
  if (after !== before) {
    fs.writeFileSync(file, after, 'utf8');
    htmlChanges++;
  }
}

const cssPath = path.join(www, 'assets', 'css', 'main.css');
let css = fs.readFileSync(cssPath, 'utf8');
css = css.replace(/Theme Name: Seaflow[^\n]*/g, `Theme Name: ${config.name}`);
css = css.replace(
  /Description: Seaflow[^\n]*/g,
  `Description: ${config.tagline}`
);
css = css.replace(/(--theme:\s*)#[0-9A-Fa-f]{3,8}/, `$1${config.themeColor}`);
css = css.replace(/(--header:\s*)#[0-9A-Fa-f]{3,8}/, `$1${config.headerColor}`);
fs.writeFileSync(cssPath, css, 'utf8');

const blackLogo = `<svg width="200" height="36" viewBox="0 0 200 36" fill="none" xmlns="http://www.w3.org/2000/svg">
<circle cx="18" cy="18" r="16" stroke="#1565A8" stroke-width="2.5"/>
<path d="M8 20C12 14 16 12 18 12C20 12 24 14 28 20" stroke="#1565A8" stroke-width="2" stroke-linecap="round"/>
<path d="M10 24C14 18 16 16 18 16C20 16 22 18 26 24" stroke="#C9A227" stroke-width="1.5" stroke-linecap="round"/>
<text x="42" y="25" font-family="Plus Jakarta Sans, Arial, sans-serif" font-size="22" font-weight="700" fill="#0A2540">DESPOT</text>
<text x="132" y="25" font-family="Plus Jakarta Sans, Arial, sans-serif" font-size="22" font-weight="600" fill="#1565A8">DIVE</text>
</svg>`;

const whiteLogo = blackLogo
  .replace(/fill="#0A2540"/g, 'fill="#FFFFFF"')
  .replace(/stroke="#1565A8"/g, 'stroke="#FFFFFF"')
  .replace('fill="#1565A8"', 'fill="#C9A227"');

const logoDir = path.join(www, 'assets', 'img', 'logo');
for (const name of [
  'black-logo.svg',
  'white-logo.svg',
  'black-logo-2.svg',
  'white-logo-3.svg',
]) {
  const isWhite = name.includes('white');
  fs.writeFileSync(path.join(logoDir, name), isWhite ? whiteLogo : blackLogo, 'utf8');
}

const favicon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><circle cx="16" cy="16" r="14" fill="#1565A8"/><path d="M8 18c3-4 6-5 8-5s5 1 8 5" stroke="#fff" stroke-width="2" fill="none" stroke-linecap="round"/><text x="16" y="21" text-anchor="middle" font-size="10" font-weight="700" fill="#C9A227" font-family="Arial">D</text></svg>`;
fs.writeFileSync(path.join(www, 'assets', 'img', 'favicon.svg'), favicon, 'utf8');

console.log(`Despot brand applied: ${htmlChanges} HTML files updated, CSS + logos refreshed.`);
