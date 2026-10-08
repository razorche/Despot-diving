import scrape from 'website-scraper';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const base = 'https://ex-coders.com/html/seaflow/';

const htmlPages = [
  'index.html',
  'index-2.html',
  'index-3.html',
  'about.html',
  'service.html',
  'service-details.html',
  'project.html',
  'project-details.html',
  'courses.html',
  'courses-details.html',
  'team.html',
  'team-details.html',
  'yacht.html',
  'yacht-details.html',
  'faq.html',
  '404.html',
  'news-grid.html',
  'news.html',
  'news-details.html',
  'contact.html',
];

const urls = htmlPages.map((p) => base + p);

const outDir = path.join(__dirname, 'seaflow-site'); // raw scrape; run fetch then copy to www

await scrape({
  urls,
  directory: outDir,
  sources: [
    { selector: 'img', attr: 'src' },
    { selector: 'img', attr: 'data-src' },
    { selector: 'link[rel="stylesheet"]', attr: 'href' },
    { selector: 'link[rel="shortcut icon"]', attr: 'href' },
    { selector: 'link[rel="icon"]', attr: 'href' },
    { selector: 'script', attr: 'src' },
    { selector: 'source', attr: 'src' },
    { selector: 'video', attr: 'poster' },
    { selector: 'a', attr: 'href' },
  ],
  urlFilter: (url) => {
    try {
      const u = new URL(url);
      if (u.hostname !== 'ex-coders.com') return false;
      return u.pathname.startsWith('/html/seaflow/');
    } catch {
      return false;
    }
  },
  filenameGenerator: 'bySiteStructure',
  request: {
    headers: {
      'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    },
  },
});

console.log('Done. Mirrored to', outDir);
