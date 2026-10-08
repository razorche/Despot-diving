import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const www = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'www');

/** Placeholder while global replaces run — keeps per-card instructor names intact */
const TEAM_SECTION_RE =
  /<section class="team-section(?:-2)?[^"]*"[\s\S]*?<\/section>/gi;
const TEAM_BLOCK_TOKEN = (i) => `\x00DESPOT_TEAM_${i}\x00`;

function stashTeamSections(html) {
  const blocks = [];
  const stripped = html.replace(TEAM_SECTION_RE, (block) => {
    const id = blocks.length;
    blocks.push(block);
    return TEAM_BLOCK_TOKEN(id);
  });
  return { stripped, blocks };
}

function restoreTeamSections(html, blocks) {
  return html.replace(/\x00DESPOT_TEAM_(\d+)\x00/g, (_, i) => blocks[Number(i)] ?? '');
}

function walk(dir, files = []) {
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name);
    if (fs.statSync(full).isDirectory() && name !== 'partials') walk(full, files);
    else if (name.endsWith('.html')) files.push(full);
  }
  return files;
}

const RE = [
  [/([a-z]+)-Detalji/gi, '$1-details'],
  [/what we offer/gi, 'Naše usluge'],
  [/view Usluge/gi, 'Pogledaj usluge'],
  [
    />\s*adventure\s*<br>\s*<span>\s*showcase\s*<\/span>/gi,
    '>Prikaz <br> <span> avantura</span>',
  ],
  [/Adventure Showcase/gi, 'Prikaz avantura'],
  [/Explore Unforgettable\s*<br>\s*Sea Adventures/gi, 'Nezaboravne <br> morske avanture'],
  [/Adventurers guided/gi, 'Vodič kroz avanture'],
  [/>\s*Adventure\s*</gi, '>Avantura<'],
  [/Night Dive Adventures/gi, 'Noćni zaroni'],
  [/Snorkeling obilazak obilazak obilazak obilazak obilazak Adventure/gi, 'Snorkeling obilazak'],
  [/Kursevi &amp; Certifications/gi, 'Kursevi i certifikati'],
  [/Led By Experienced\s*<span class="exp-br"><\/span>\s*Instructors/gi, 'Vođeni iskusnim <span class="exp-br"></span> instruktorima'],
  [/Started on/gi, 'Termini'],
  [/April 25, 2026/gi, 'apr–okt, po dogovoru'],
  [/\$250/g, '420 €'],
  [/View all guide/gi, 'Pogledaj sve'],
  [/Sunset Cruise Experience/gi, 'Zaron kod Mogrena'],
  [/Safety &amp; Lifeguard Support/gi, 'Bezbednost i podrška instruktora'],
  [/Safety &amp; Risk Management/gi, 'Bezbednost i procena rizika'],
  [/Safety Briefing &amp; Prep/gi, 'Sigurnosni briefing i priprema'],
  [/Safety &amp; First Aid Support/gi, 'Prva pomoć i bezbednost'],
  [/Safety Skills/gi, 'Veštine bezbednosti'],
  [/Introduction to Diving Equipment &amp; Safety\./gi, 'Uvod u ronilačku opremu i bezbednost.'],
  [/Emergency Procedures &amp; Safety First/gi, 'Hitne procedure i bezbednost na prvom mestu'],
  [/Onboard Safety Systems Overview/gi, 'Pregled sigurnosne opreme'],
  [/IOnboard Safety Systems Overview/gi, 'Pregled sigurnosne opreme'],
  [/Sunset Dining &amp; Guest Hospitality/gi, 'Debriefing nakon zaronа'],
  [/Snorkeling obilazak obilazak obilazak obilazak obilazak Gear &amp; Safety Briefing/gi, 'Snorkeling oprema i sigurnosni briefing'],
  [/Beginner Ronjenje/gi, 'Ronjenje za početnike'],
  [/Certifications/gi, 'certifikati'],
  [/UI Design/gi, 'Ronjenje'],
  [/Yacht/gi, 'Ronjenje'],
  [/Cruise/gi, 'Tura'],
  [/Charter/gi, 'Izlazak'],
  [/Captain/gi, 'Instruktor'],
  [/cabin/gi, 'mesto na kursu'],
  [/deck/gi, 'platforma'],
  [/marina/gi, 'baza kluba'],
  [/sailing/gi, 'ronjenje'],
  [/boat/gi, 'čamac'],
  [/vessel/gi, 'oprema'],
  [/>\s*Contact\s*</gi, '>Kontakt<'],
  [/>\s*About\s*</gi, '>O nama<'],
  [/>\s*Services\s*</gi, '>Usluge<'],
  [/>\s*Gallery\s*</gi, '>Galerija<'],
  [/>\s*Blog\s*</gi, '>Blog<'],
  [/>\s*Home\s*</gi, '>Početna<'],
  [/>\s*Courses\s*</gi, '>Kursevi<'],
  [/>\s*Team\s*</gi, '>Tim<'],
  [/>\s*FAQ\s*</gi, '>FAQ<'],
  [/>\s*Pages\s*</gi, '>Stranice<'],
  [/>\s*Activities\s*</gi, '>Aktivnosti<'],
  [/Browse Categories/gi, 'Kategorije'],
  [/Recent Posts/gi, 'Najnoviji tekstovi'],
  [/Popular Tags/gi, 'Oznake'],
  [/Search Here/gi, 'Pretraga'],
  [/Leave a Reply/gi, 'Ostavite komentar'],
  [/Post Comment/gi, 'Pošalji komentar'],
  [/Share:/gi, 'Podeli:'],
  [/Related Posts/gi, 'Povezani tekstovi'],
  [/Our Gallery/gi, 'Naša galerija'],
  [/Meet Our Team/gi, 'Upoznajte tim'],
  [/Our Team/gi, 'Naš tim'],
  [/Get In Touch/gi, 'Kontaktirajte nas'],
  [/Contact Us/gi, 'Kontakt'],
  [/Send Us Message/gi, 'Pošaljite poruku'],
  [/Office Address/gi, 'Adresa'],
  [/Email Address/gi, 'E-mail'],
  [/Phone:/gi, 'Telefon:'],
  [/Opening Hours/gi, 'Radno vreme'],
  [/Mon - Fri/gi, 'Pon – Pet'],
  [/Saturday/gi, 'Subota'],
  [/Sunday/gi, 'Nedelja'],
  [/Closed/gi, 'Zatvoreno'],
  [/All Posts/gi, 'Svi tekstovi'],
  [/Read More/gi, 'Pročitaj više'],
  [/courses-Detalji\.html/gi, 'courses-details.html'],
  [/service-Detalji\.html/gi, 'service-details.html'],
  [/project-Detalji\.html/gi, 'project-details.html'],
  [/team-Detalji\.html/gi, 'team-details.html'],
  [/news-Detalji\.html/gi, 'news-details.html'],
  [/From \$299\.00/gi, 'od 75 €'],
  [/\$180\.00/g, '95 €'],
  [/Ticket Price/gi, 'Cena kursa'],
  [/Introduction to Ronjenje Equipment course/gi, 'Uvod u ronilačku opremu'],
  [/Introduction to the Secluded Beach Site/gi, 'Uvod u lokaciju zaronа'],
  // Do not map every placeholder name to one person — team cards use unique names in HTML.
  // [/James Polis/gi, 'Marko Despotović'],
  [/scuba diving trainer/gi, 'PADI instruktor'],
  [/Private Island Tours/gi, 'Obilasci lokacija'],
  [/Water Sports Adventures/gi, 'Avanture na vodi'],
  [/Water Sports/gi, 'Ronjenje'],
  [/>\s*scuba diving\s*</gi, '>Ronjenje<'],
  [
    /Dive deep into the ocean and discover the mesmerizing beauty of marine life\. This course is designed for beginners and enthusiasts who want to master scuba diving techniques, safety protocols, and underwater navigation\. Led by PADI-certified instruktorima, you will gain the confidence to explore coral reefs and exotic sea creatures\./gi,
    'Kurs obuhvata teoriju, vežbe u bazenu i zaronе na moru oko Budve. Fokus je na bezbednosti, kontroli plutanja i navigaciji — uz PADI instruktore i opremu kluba.',
  ],
  [/High Angle View of a Man/gi, 'Pogled na podvodnu stenu'],
  [/Closeup Photography\s*of Whale/gi, 'Ronjenje uz greben'],
  [/Man and Woman Walks\s*Beside Green Sea/gi, 'Zaron kod litice'],
  [/Explore The Underwater World: Professional Ronjenje Certification/gi, 'Istražite podvodni svet: profesionalni ronilački certifikat'],
  [/Course Info/gi, 'O kursu'],
  [/What you'll learn in this course\?/gi, 'Šta učite na kursu?'],
  [/Course Content/gi, 'Sadržaj kursa'],
  [/Getting Started with Diving/gi, 'Početak ronjenja'],
  [/Basic Knots and Docking Procedures/gi, 'Osnove sigurnosti i procedura'],
  [/Advanced Weather Monitoring and Navigation\./gi, 'Vreme, more i navigacija pod vodom.'],
  [/Maintenance and Emergency Management\./gi, 'Održavanje opreme i hitne procedure.'],
  [
    /UI \(User Interface\) Design is the process of creating the visual elements of a product, including layout, color schemes, typography, and interactive features like buttons and icons\./gi,
    'Ronilački kurs obuhvata teoriju, praktične vežbe i zaronе na moru — uz naglasak na bezbednosti i radu u malim grupama.',
  ],
  [
    /UI \(User Interface\) Design is the process of creating the visual elements of product, including layout[\s\S]{0,200}?navigate and interact with the product\./gi,
    'Program uključuje briefing, vežbe sa opremom, zaronе u bazenu i na moru, kao i evaluaciju pre certifikacije.',
  ],
  [
    /Together, UX and Ronjenje ensure that digital products are not only functional and accessible but also engaging and visually coherent, enhancing both usability and overall user satisfaction\./gi,
    'Na kraju kursa imate jasne navike: provera opreme, plan zaronа i poštovanje morskog okruženja oko Budve.',
  ],
  [/course-Program kursa-items/gi, 'course-program-items'],
  [/Exploring The Unseen: The World's Best Hidden Ronjenje Spots\./gi, 'Skrivene ronilačke lokacije Jadrana'],
  [
    /Dive deep into the crystal clear waters where vibrant coral reefs and exotic marine life await\. From the Great Barrier Reef to hidden underwater caves, discover the ultimate adventure that lies beneath the waves\./gi,
    'Od Mogrena do okolnih uvala — pećine, grebeni i olupine koje biramo prema sezoni i iskustvu grupe.',
  ],
  [/Beyond The Shore: Why Lokacije Escapes Are The New Travel Trend\./gi, 'Van gužve: zašto su ronilački izlasci popularni'],
  [/Adventure Guide/gi, 'Vodič'],
  [/Mastering The Deep: Essential Ronjenje Tips/gi, 'Saveti za sigurno ronjenje'],
  [/ronjenje In Style: The Ultimate Ronjenje Guide/gi, 'Ronjenje u Budvi: praktičan vodič'],
  [/New Ronjenje May 2026 Course Sheet Will Update Soon/gi, 'Novi termini kurseva — uskoro'],
  [
    /Satisfaction in of this hologram and more to elite\.[^<]{0,400}/gi,
    'Despot Ronilački Klub objavljuje savete za pripremu opreme, izbor lokacije i bezbedan prvi zaron na budvanskoj obali.',
  ],
  [
    /"Exploring The Depths Of The Ocean Not Only Reveals A World Of Untouched Beauty But Also Offers A Sense Of Peace And Freedom That Can Only Be Found Beneath The Waves\."/gi,
    '„Ronjenje na Jadranu donosi mir ispod površine i pogled na obalu koji sa kopna ne vidite.“',
  ],
  [
    /The ocean remains one of the last frontiers on Earth,[^<]{0,500}anywhere else\./gi,
    'More oko Budve nudi raznolike dubine i reljef — od plitkog uvoda za početnike do dužih ruta uz liticu za iskusnije ronioce, uvek uz instruktora i jasan plan.',
  ],
  [/Prev/gi, 'Prethodno'],
  [/Next/gi, 'Sledeće'],
  [/Price:/gi, 'Cena:'],
  [/Duration:/gi, 'Trajanje:'],
  [/Level:/gi, 'Nivo:'],
  [/Location:/gi, 'Lokacija:'],
  [/Instructor:/gi, 'Instruktor:'],
  [/Overview/gi, 'Pregled'],
  [/Curriculum/gi, 'Program kursa'],
  [/Requirements/gi, 'Uslovi'],
  [/Reviews/gi, 'Utisci'],
  [/Book Now/gi, 'Rezerviši'],
  [/Enroll Now/gi, 'Prijavi se'],
  [/Add to Cart/gi, 'Rezerviši'],
  [/Buy Now/gi, 'Rezerviši'],
  [/Subscribe/gi, 'Pretplati se'],
  [/Your subscription/gi, 'Pretplata'],
  [/Privacy Policy/gi, 'Politika privatnosti'],
  [/Terms &amp; Conditions/gi, 'Uslovi korišćenja'],
  [/Terms and Conditions/gi, 'Uslovi korišćenja'],
];

/** Course price map by title fragment (after generic $250 replace) */
const COURSE_PRICES = [
  [/>(\s*)od 420 €(\s*)<\/span>[\s\S]{0,400}?Probni zaron/gi, (m) => m.replace('420 €', 'od 95 €')],
  [/courses-image">\s*<img[^>]+>\s*<span>420 €<\/span>[\s\S]{0,200}?Probni zaron/gi, (m) =>
    m.replace('<span>420 €</span>', '<span>od 95 €</span>'),
  ],
  [/courses-image">\s*<img[^>]+>\s*<span>420 €<\/span>[\s\S]{0,200}?Rescue Diver/gi, (m) =>
    m.replace('<span>420 €</span>', '<span>350 €</span>'),
  ],
  [/courses-image">\s*<img[^>]+>\s*<span>420 €<\/span>[\s\S]{0,200}?Advanced/gi, (m) =>
    m.replace('<span>420 €</span>', '<span>350 €</span>'),
  ],
  [/courses-image">\s*<img[^>]+>\s*<span>420 €<\/span>[\s\S]{0,200}?Vođen/gi, (m) =>
    m.replace('<span>420 €</span>', '<span>od 75 €</span>'),
  ],
  [/courses-image">\s*<img[^>]+>\s*<span>420 €<\/span>[\s\S]{0,200}?Noćn/gi, (m) =>
    m.replace('<span>420 €</span>', '<span>od 45 €</span>'),
  ],
];

/** Replacements that would collapse distinct team members to one name */
const NAME_COLLAPSE_RE = [
  [/James Polis/gi, 'Marko Despotović'],
  [/Adam Smith/g, 'Marko Despotović'],
];

let changed = 0;
for (const file of walk(www)) {
  let html = fs.readFileSync(file, 'utf8');
  const { stripped, blocks } = stashTeamSections(html);
  let out = stripped;
  for (const [a, b] of RE) out = out.replace(a, b);
  for (const [re, fn] of COURSE_PRICES) out = out.replace(re, fn);
  for (const [a, b] of NAME_COLLAPSE_RE) out = out.replace(a, b);
  out = restoreTeamSections(out, blocks);
  if (out !== html) {
    fs.writeFileSync(file, out, 'utf8');
    changed++;
  }
}

console.log(JSON.stringify({ translatePass: true, filesChanged: changed }, null, 2));
