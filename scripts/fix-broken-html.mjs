import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const www = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'www');

function walk(dir, files = []) {
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name);
    if (fs.statSync(full).isDirectory() && name !== 'partials') walk(full, files);
    else if (name.endsWith('.html')) files.push(full);
  }
  return files;
}

const testimonialFix =
  /[“"]An Odličan osećaj pod vodom — instruktori su strpljivi i jasni, posebno za prvi zaron\.["']info-item">/g;

const testimonialReplacement = `„Odličan osećaj pod vodom — instruktori su strpljivi i jasni, posebno za prvi zaron.”
                                            </p>
                                            <div class="info-item">`;

for (const file of walk(www)) {
  let html = fs.readFileSync(file, 'utf8');
  let out = html;

  out = out.replace(
    /[“"]An Odličan osećaj pod vodom — instruktori su strpljivi i jasni, posebno za prvi zaron\.["']info-item">/g,
    `„Odličan osećaj pod vodom — instruktori su strpljivi i jasni, posebno za prvi zaron.”
                                            </p>
                                            <div class="info-item">`
  );

  out = out.replace(
    /Snorkeling obilazak obilazak obilazak obilazak obilazak obilasci/gi,
    'Snorkeling obilasci'
  );

  out = out.replace(
    /<!-- start: Search Popup -->[\s\S]*?<!-- end: Search Popup -->/g,
    ''
  );
  out = out.replace(
    /<div class="search_popup">[\s\S]*?<div class="search-popup-overlay"><\/div>/g,
    ''
  );

  if (out !== html) {
    fs.writeFileSync(file, out, 'utf8');
    console.log('fixed', path.basename(file));
  }
}
