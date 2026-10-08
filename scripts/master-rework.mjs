import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const www = path.join(root, 'www');
const partials = path.join(www, 'partials');
const meta = JSON.parse(fs.readFileSync(path.join(root, 'brand', 'pages-meta.json'), 'utf8'));

const SITE = 'https://despotdiving.me';
const REMOVE_PAGES = ['index-2.html', 'index-3.html', 'yacht.html', 'yacht-details.html'];

const offcanvas = fs.readFileSync(path.join(partials, 'offcanvas.html'), 'utf8');
const headerBase = fs.readFileSync(path.join(partials, 'header.html'), 'utf8');
const footer = fs.readFileSync(path.join(partials, 'footer.html'), 'utf8');

const NAV_ACTIVE = {
  'index.html': 'index.html',
  'about.html': 'about.html',
  'service.html': 'service.html',
  'service-details.html': 'service.html',
  'project.html': 'project.html',
  'project-details.html': 'project.html',
  'courses.html': 'courses.html',
  'courses-details.html': 'courses.html',
  'team.html': 'about.html',
  'team-details.html': 'about.html',
  'faq.html': 'faq.html',
  'contact.html': 'contact.html',
  'news.html': 'news.html',
  'news-grid.html': 'news.html',
  'news-details.html': 'news.html',
  'galerija.html': 'galerija.html',
  '404.html': 'index.html',
};

function headerFor(page) {
  const fileName = path.basename(page);
  return headerBase.replace('__ACTIVE_PAGE__', fileName);
}

function walkHtml(dir, files = []) {
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name);
    if (fs.statSync(full).isDirectory() && name !== 'partials') walkHtml(full, files);
    else if (name.endsWith('.html') && !full.includes('partials')) files.push(full);
  }
  return files;
}

function injectHead(html, fileName) {
  const m = meta[fileName] || meta['index.html'];
  const canonical = `${SITE}/${fileName === 'index.html' ? '' : fileName}`.replace(/\/$/, '') || SITE + '/';

  const fontPreconnect = `
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>`;

  if (!html.includes('despot.css')) {
    html = html.replace(
      '<link rel="stylesheet" href="assets/css/main.css">',
      `<link rel="stylesheet" href="assets/css/main.css">
        <link rel="stylesheet" href="assets/css/despot.css">${fontPreconnect}`
    );
  }

  if (!html.includes('despot-nav.css')) {
    html = html.replace(
      '<link rel="stylesheet" href="assets/css/despot.css">',
      `<link rel="stylesheet" href="assets/css/despot.css">
        <link rel="stylesheet" href="assets/nav/despot-nav.css">`
    );
  }

  html = html.replace(/@import url\("https:\/\/fonts\.googleapis\.com[^)]+\);/g, '');

  html = html.replace(
    /<title>[^<]*<\/title>/,
    `<title>${m.title}</title>`
  );
  html = html.replace(
    /<meta name="description" content="[^"]*">/,
    `<meta name="description" content="${m.description}">`
  );
  html = html.replace(/<meta name="author" content="[^"]*">/, '<meta name="author" content="Despot Ronilački Klub">');

  const seoBlock = `
        <link rel="canonical" href="${canonical}">
        <meta property="og:type" content="${m.ogType || 'website'}">
        <meta property="og:locale" content="sr_ME">
        <meta property="og:site_name" content="Despot Ronilački Klub">
        <meta property="og:title" content="${m.title}">
        <meta property="og:description" content="${m.description}">
        <meta property="og:url" content="${canonical}">
        <meta property="og:image" content="${SITE}/assets/img/home-1/hero/hero-1.jpg">
        <meta name="twitter:card" content="summary_large_image">
        <meta name="twitter:title" content="${m.title}">
        <meta name="twitter:description" content="${m.description}">
        <script type="application/ld+json">
        {"@context":"https://schema.org","@type":"SportsActivityLocation","name":"Despot Ronilački Klub","description":"${m.description.replace(/"/g, '\\"')}","url":"${SITE}","email":"hello@despotdiving.me","telephone":"+38267000247","address":{"@type":"PostalAddress","addressLocality":"Budva","addressCountry":"ME"},"geo":{"@type":"GeoCoordinates","latitude":42.2864,"longitude":18.84}}
        </script>`;

  if (!html.includes('rel="canonical"')) {
    html = html.replace('</head>', `${seoBlock}\n    </head>`);
  }

  return html;
}

function injectCursorScript(html) {
  if (html.includes('despot-cursor.js')) return html;
  if (html.includes('<script src="assets/js/main.js"></script>')) {
    return html.replace(
      '<script src="assets/js/main.js"></script>',
      `<script src="assets/js/main.js"></script>
        <script src="assets/js/despot-cursor.js" defer></script>`
    );
  }
  return html.replace('</body>', `        <script src="assets/js/despot-cursor.js" defer></script>\n    </body>`);
}

function syncChrome(html, fileName) {
  html = html.replace(
    /<!-- Offcanvas Area Start -->[\s\S]*?<div class="offcanvas__overlay"><\/div>/,
    offcanvas.trim()
  );
  html = html.replace(
    /<!-- Header[\s\S]*?(?:<\/header>|assets\/nav\/despot-nav\.js"><\/script>)/,
    headerFor(fileName).trim()
  );
  html = html.replace(
    /<!-- start: Search Popup -->[\s\S]*?<!-- end: Search Popup -->/,
    ''
  );
  html = html.replace(
    /<!-- Footer Section Start -->[\s\S]*?<\/footer>/,
    footer.trim()
  );
  return html;
}

const LOCALIZE = [
  [/Bulevar despota Stefana 115, Beograd, Srbija/g, 'Budva, Crna Gora'],
  [/Obala Jadrana 12, Kotor, Crna Gora/g, 'Budva, Crna Gora'],
  [/info@despotdive\.rs/g, 'hello@despotdiving.me'],
  [/mailto:info@despotdive\.rs/g, 'mailto:hello@despotdiving.me'],
  [/\+381 11 555 0101/g, '+382 67 000 247'],
  [/\+381 63 123 4567/g, '+382 67 000 247'],
  [/tel:\+381115550101/g, 'tel:+38267000247'],
  [/tel:\+381 63 123 4567/g, 'tel:+38267000247'],
  [/tel:\+381631234567/g, 'tel:+38267000247'],
  [/Despot Dive/g, 'Despot Ronilački Klub'],
  [/Pon–Pet, 09:00–18:00/g, 'Sezonski: apr–okt, po dogovoru'],
  [/Book Your Dive/gi, 'Rezerviši zaron'],
  [/View Demo/gi, 'Pogledaj'],
  [/get in touch/gi, 'Pišite nam'],
  [/Let’s Dive/g, 'Spremni za zaron?'],
  [/Let's Dive/g, 'Spremni za zaron?'],
  [/useful links/gi, 'Navigacija'],
  [/get newsletter/gi, 'Bilten'],
  [/Enter Email/gi, 'Vaša e-mail adresa'],
  [/Type here to search\.\.\./gi, 'Pretraga...'],
  [/Home/g, 'Početna'],
  [/About us/gi, 'O nama'],
  [/services/gi, 'Usluge'],
  [/News/g, 'Blog'],
  [/Read More/gi, 'Pročitaj više'],
  [/Learn More/gi, 'Saznaj više'],
  [/Submit/gi, 'Pošalji'],
  [/Send Message/gi, 'Pošalji poruku'],
  [/Your Name/gi, 'Ime i prezime'],
  [/Your Email/gi, 'E-mail'],
  [/Phone Number/gi, 'Telefon'],
  [/Message/g, 'Poruka'],
  [/Oops! Page not found/gi, 'Stranica nije pronađena'],
  [/Back to Home/gi, 'Nazad na početnu'],
  [/Lorem ipsum[^<.]*/gi, ''],
  [/Luxury Yacht Charter/gi, 'Vođeno ronjenje'],
  [/Luxury Event on Yacht/gi, 'Noćni zaron'],
  [/Sunset Yacht Cruise/gi, 'Zaron kod Mogrena'],
  [/Yacht Charter/gi, 'Ronilačke ture'],
  [/Yacht Facilities/gi, 'Oprema i sigurnost'],
  [/Yacht setavento[^<]*/gi, 'Ronilačka lokacija'],
  [/The Ultimate Guide[^<]*/gi, 'Vodič kroz prvo ronjenje u Budvi'],
  [/Adam Smith/g, 'Marko Despotović'],
  [/sr\.diver/gi, 'instruktor'],
  [/traveler - Cania/gi, 'ronilac — Budva'],
  [/David hanson/gi, 'Nikola P.'],
  [/miami quen/gi, 'Jelena M.'],
  [/Discover Scuba Diving/g, 'Probni zaron'],
  [/Open Water Diver Certification/g, 'Open Water certifikat'],
  [/Rescue Diver Course/g, 'Rescue Diver kurs'],
  [/Beginner Scuba Diving/g, 'Ronjenje za početnike'],
  [/Advanced Diving Trips/g, 'Napredne ture'],
  [/Snorkeling Tours/g, 'Snorkeling obilasci'],
  [/Private Diving Sessions/g, 'Privatni zaroni'],
  [/Coral Reef Adventures/g, 'Greben i pećine'],
  [/adventure showcase/gi, 'Iskustva ispod površine'],
  [/World-Class Diving Courses[^<]*/gi, 'Kursevi pod vodom'],
  [/Popular Dive Locations/gi, 'Ronilačke lokacije'],
  [/Our Expert Scuba Diver/gi, 'Naši instruktori'],
  [/Your Safety Comes First[^<]*/gi, 'Bezbednost na prvom mestu'],
  [/Do I need prior experience[^?]*\?/gi, 'Da li mi treba prethodno iskustvo?'],
  [/Is scuba diving safe for beginners[^?]*\?/gi, 'Da li je ronjenje bezbedno za početnike?'],
  [/What is the minimum age[^?]*\?/gi, 'Koja je minimalna starost?'],
  [/How long does a diving session last[^?]*\?/gi, 'Koliko traje zaron?'],
  [/Oxygen support available/gi, 'Kiseonik i prva pomoć'],
  [/Regular equipment checks/gi, 'Redovna provera opreme'],
  [/Emergency-trained staff/gi, 'Obučeno osoblje'],
  [/100% well trained driver/gi, 'Iskusni vodiči'],
  [/happy tourist worldwide/gi, 'zadovoljnih ronilaca'],
  [/Exploring The Beauty Beneath The Waves/gi, 'Lepota jadranskog dna'],
  [/seaflow\./gi, 'Despot'],
  [/All Rights Reserved\./gi, 'Sva prava zadržana.'],
  [/index-2\.html/g, 'index.html'],
  [/index-3\.html/g, 'index.html'],
  [/yacht-details\.html/g, 'project.html'],
  [/yacht\.html/g, 'project.html'],
  [/Jahting/g, 'Ronjenje'],
  [/Privatna plaža/g, 'Lokacije'],
  [/Jahte/g, 'Lokacije'],
  [/Detalji jahte/g, 'Detalji lokacije'],
  [/Unforgettable experience[^"]*/gi, 'Odličan osećaj pod vodom — instruktori su strpljivi i jasni, posebno za prvi zaron.'],
  [/Perfect for first-time divers[^.]*/gi, 'Idealno za prvi zaron uz punu podršku instruktora.'],
  [/Started on April 25, 2026/gi, 'Termini po dogovoru'],
  [/Service/g, 'Usluge'],
  [/Pages/g, 'Stranice'],
  [/Activities/g, 'Aktivnosti'],
  [/Courses/g, 'Kursevi'],
  [/Team/g, 'Tim'],
  [/404 Page/g, '404'],
];

function localize(html) {
  let out = html;
  for (const [re, rep] of LOCALIZE) {
    out = out.replace(re, rep);
  }
  out = out.replace(/Nullam dignissim[^<]*/g, 'Despot Ronilački Klub u Budvi — vođena ronjenja i edukacija na Jadranu.');
  return out;
}

function fixIndexHero(html) {
  if (!html.includes('hero-content')) return html;
  html = html.replace(
    /<div class="loading--text">[^<]*<\/div>/,
    '<div class="loading--text">DESPOT</div>'
  );
  return html;
}

// Remove deleted pages
for (const p of REMOVE_PAGES) {
  const f = path.join(www, p);
  if (fs.existsSync(f)) fs.unlinkSync(f);
}

// Galerija from news-grid
const galerijaSrc = path.join(www, 'news-grid.html');
const galerijaDst = path.join(www, 'galerija.html');
if (fs.existsSync(galerijaSrc) && !fs.existsSync(galerijaDst)) {
  fs.copyFileSync(galerijaSrc, galerijaDst);
}

const files = walkHtml(www).filter((f) => !REMOVE_PAGES.includes(path.basename(f)));
let changed = 0;

for (const file of files) {
  const base = path.basename(file);
  let html = fs.readFileSync(file, 'utf8');
  const before = html;
  html = injectHead(html, meta[base] ? base : 'index.html');
  html = syncChrome(html, base);
  html = injectCursorScript(html);
  html = localize(html);
  if (base === 'index.html') html = fixIndexHero(html);
  if (html !== before) {
    fs.writeFileSync(file, html, 'utf8');
    changed++;
  }
}

// main.css: remove Plus Jakarta import, update theme
const cssPath = path.join(www, 'assets', 'css', 'main.css');
let css = fs.readFileSync(cssPath, 'utf8');
css = css.replace(/@import url\("https:\/\/fonts\.googleapis\.com[^)]+\);\s*/g, '');
css = css.replace(/Theme Name:[^\n]*/g, 'Theme Name: Despot Ronilački Klub');
css = css.replace(/(--theme:\s*)#[0-9A-Fa-f]+/i, '$1#1565A8');
css = css.replace(/(--header:\s*)#[0-9A-Fa-f]+/i, '$1#0c2d3a');
if (!css.includes('font-family: var(--font-body)')) {
  css = css.replace(
    /body \{[^}]*font-family:[^;]+;/,
    (m) => m.replace(/font-family:[^;]+;/, 'font-family: var(--font-body, "Hanken Grotesk", sans-serif);')
  );
}
fs.writeFileSync(cssPath, css, 'utf8');

// sitemap + robots
const publicPages = Object.keys(meta);
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${publicPages
  .map(
    (p) => `  <url><loc>${SITE}/${p === 'index.html' ? '' : p}</loc><changefreq>monthly</changefreq></url>`
  )
  .join('\n')}
</urlset>`;
fs.writeFileSync(path.join(www, 'sitemap.xml'), sitemap);
fs.writeFileSync(
  path.join(www, 'robots.txt'),
  `User-agent: *\nAllow: /\nSitemap: ${SITE}/sitemap.xml\n`
);

console.log(JSON.stringify({ pagesProcessed: files.length, pagesChanged: changed, removed: REMOVE_PAGES }, null, 2));
