import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createWriteStream } from 'fs';
import { pipeline } from 'stream/promises';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const siteRoot = fs.existsSync(path.join(__dirname, 'www', 'index.html'))
  ? path.join(__dirname, 'www')
  : path.join(__dirname, 'seaflow-site', 'ex-coders.com', 'html', 'seaflow');
const remoteBase = 'https://ex-coders.com/html/seaflow/';

const assetPaths = new Set();

function collectFromText(text) {
  const patterns = [
    /(?:src|href)=["'](assets\/[^"'#?]+)/gi,
    /url\(\s*["']?(\.\.\/[^)"']+)["']?\s*\)/gi,
    /url\(\s*["']?(assets\/[^)"']+)["']?\s*\)/gi,
  ];
  for (const re of patterns) {
    let m;
    while ((m = re.exec(text)) !== null) {
      let p = m[1].replace(/\\/g, '/');
      if (p.startsWith('../')) {
        // resolve relative to assets/css/ by default; also handle ../img from css
        p = p.replace(/^\.\.\//, 'assets/');
      }
      assetPaths.add(p.split('?')[0]);
    }
  }
}

function walk(dir) {
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) walk(full);
    else if (/\.(html|css|js)$/i.test(name)) {
      collectFromText(fs.readFileSync(full, 'utf8'));
    }
  }
}

walk(siteRoot);

async function download(relPath) {
  const url = remoteBase + relPath.replace(/\\/g, '/');
  const localPath = path.join(siteRoot, relPath);
  if (fs.existsSync(localPath)) return { relPath, status: 'skip' };
  fs.mkdirSync(path.dirname(localPath), { recursive: true });
  const res = await fetch(url, {
    headers: {
      'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36',
    },
  });
  if (!res.ok) return { relPath, status: 'fail', code: res.status };
  await pipeline(res.body, createWriteStream(localPath));
  return { relPath, status: 'ok' };
}

const list = [...assetPaths].sort();
console.log('Found', list.length, 'asset references');

let ok = 0,
  skip = 0,
  fail = 0;
const failed = [];

for (const rel of list) {
  const r = await download(rel);
  if (r.status === 'ok') ok++;
  else if (r.status === 'skip') skip++;
  else {
    fail++;
    failed.push(r);
  }
}

console.log({ ok, skip, fail });
if (failed.length) {
  console.log('Failed (first 20):', failed.slice(0, 20));
}

// Second pass: webfonts and other url() refs in CSS
const cssDir = path.join(siteRoot, 'assets/css');
if (fs.existsSync(cssDir)) {
  const urlRe = /url\(\s*["']?([^"')]+)["']?\s*\)/g;
  for (const cssFile of fs.readdirSync(cssDir).filter((f) => f.endsWith('.css'))) {
    const css = fs.readFileSync(path.join(cssDir, cssFile), 'utf8');
    let m;
    while ((m = urlRe.exec(css)) !== null) {
      let p = m[1].trim();
      if (p.startsWith('data:') || p.startsWith('http')) continue;
      if (p.startsWith('../')) p = 'assets/' + p.slice(3);
      const r = await download(p.split('?')[0]);
      if (r.status === 'ok') ok++;
    }
  }
}

function countFiles(dir) {
  let n = 0;
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name);
    if (fs.statSync(full).isDirectory()) n += countFiles(full);
    else n++;
  }
  return n;
}

console.log('Done. Total files in assets:', countFiles(path.join(siteRoot, 'assets')));
