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

const RE = [
  [/type="Pošalji"/g, 'type="submit"'],
  [/incredible Yachts &amp; Catamarans&nbsp;incredible Yachts &amp; Catamarans/g, 'Jadran · pećine · grebeni · Budva&nbsp;'],
  [/Our benefits/gi, 'Naše prednosti'],
  [/Pure Elegance &amp; High Level of&nbsp;Comfort/g, 'Stručnost i mir ispod površine'],
  [/If you are dreaming about the cozy[^<]*/gi, 'Ako tražite ozbiljan klub koji poznaje budvansku obalu, sigurnu opremu i jasan plan zaronа — Despot je mesto gde se ronjenje uči bez žurbe.'],
  [/Stunning Cruise/gi, 'Vođene ture'],
  [/Premium Boats Yachts/gi, 'Ronilačka oprema'],
  [/Quality Usluge Guaranteed/gi, 'Proverena bezbednost'],
  [/get started/gi, 'Kontaktiraj nas'],
  [/call for details/gi, 'Pozovi za termine'],
  [/Explore the beauty/gi, 'Istraži obalu'],
  [/Discover Ronjenje/g, 'Probni zaron'],
  [/Discover More/gi, 'Saznaj više'],
  [/Discover crystal-clear waters, vibrant marine life, and unforgettable scuba diving\. Discover crystal-clear waters, vibrant marine life, and unforgettable scuba diving/gi, 'Budvanska obala nudi pećine, grebene i olupine na dohvat ruke — svaki izlazak planiramo prema vremenu i tvom iskustvu.'],
  [/Explore the Unseen World Beneath\./gi, 'Podvodni svet Budve i okoline.'],
  [/Book Your Beach Experience/gi, 'Ronjenje sa obale'],
  [/Book Your Escape/gi, 'Rezerviši izlazak'],
  [/Escape the crowds and find your own slice of paradise\.[^<]*/gi, 'Manje gužve, više fokusa — male grupe i lokacije koje biramo prema sezoni i vidljivosti.'],
  [/>Yacht</g, '>Ronjenje<'],
  [/Basics of Yacht Handling and Steering\./gi, 'Osnove kretanja pod vodom i kontrole plutanja.'],
  [/Introduction to Modern Yacht Design/gi, 'Uvod u ronilačku opremu'],
  [/Senior Yacht Captain \(MCA Master\)/gi, 'Glavni instruktor (PADI)'],
  [/discover scuba/gi, 'probni zaron'],
  [/alt="img"/g, 'alt="Despot Ronilački Klub — ronjenje Budva"'],
  [/Mexico/gi, 'Crna Gora'],
  [/Dive Into the Magic of the Sea/gi, 'Ronjenje na Jadranu'],
  [/Exploring The Beauty\s*Beneath The Waves/gi, 'Budvanska obala ispod površine'],
  [/A scuba diving certification level, which emphasizes emergency response and diver rescue\./gi, 'Modul kursa sa fokusom na bezbednost, proceduru i timski rad pod vodom.'],
  [/Our Top Dive Spots/gi, 'Omiljene lokacije'],
  [/Real moments from real adventures/gi, 'Trenutci sa naših izlazaka'],
  [/We follow international diving safety standards and use modern, well-maintained equipment for every dive\./gi, 'Pratimo međunarodne standarde bezbednosti i koristimo redovno servisiranu opremu na svakom izlasku.'],
  [/Ready to Start your/gi, 'Spremni da krenete'],
  [/our team/gi, 'Naš tim'],
  [/our Blog &amp; Blog/gi, 'Blog kluba'],
  [/How to Plan Your\s*next sea diving Construction Project/gi, 'Kako pripremiti prvi zaron u Budvi'],
  [/Construction Project/gi, 'ronjenje'],
  [
    /Sea leads in scuba diving and water fun, turning your passion for the ocean into safe, rich, and green journeys\./gi,
    'Despot Ronilački Klub u Budvi — vođena ronjenja, edukacija i izlasci prilagođeni tvom tempu i iskustvu.',
  ],
  [/our service/gi, 'Naše usluge'],
  [/our best guide for <br> your safety/gi, 'Vodič kroz <br> bezbedan zaron'],
  [
    /Enjoy a premium Ronilačke ture experience with world-class comfort and breathtaking ocean views\. Our luxury yachts are perfect for private\./gi,
    'Vođeno ronjenje uz instruktora, opremu i jasan briefing — od plitkog uvoda do dužih ruta duž budvanske obale.',
  ],
  [
    /Building a Deep Connection with the Underwater World\./gi,
    'Dublja veza sa podvodnim svetom Jadrana.',
  ],
  [
    /In the vast and mysterious world beneath the waves, diving requires more than just a short-term thrill; it needs a robust foundation of safety, skills, and environmental awareness\. At Despot Ronilački Klub, we specialize in helping adventurers build strong diving foundations that enable confidence, skill mastery, and unforgettable underwater success\. Every diver, regardless of their experience level, faces unique challenges in the deep, and we provide the expertise to navigate them safely\./gi,
    'Ronjenje traži pripremu, rutinu i poštovanje mora. U Despot klubu gradimo temelje kroz briefing, vežbe na površini i postupan rad u dubini — bez žurbe i bez pritiska.',
  ],
  [
    /Our process starts with a comprehensive assessment of your organization’s financial health\. This includes evaluating cash flow, revenue streams, operational costs, debt structures, investment opportunities, and risk exposure\. By understanding your current financial framework, we can develop strategies\./gi,
    'Svaki izlazak počinje procenom iskustva, forme i vremena. Biramo lokaciju (Mogren, okolina Svetog Nikole, Jaz ili Galić) prema vidljivosti i moru — ne nagađamo.',
  ],
  [/Our Range Of Specialized Diving Adventures/gi, 'Naš spektar ronilačkih usluga'],
  [/Plan your perfect beach day with us\.[^<]*/gi, 'Rezervišite termin za ronjenje ili probni zaron — javite se mailom ili telefonom.'],
  [/contact number/gi, 'Broj telefona'],
  [/Write Poruka/gi, 'Vaša poruka'],
  [/placeholder="Ime i prezime"/g, 'placeholder="Ime i prezime"'],
  [/Sailing In Style: The Ultimate Yachting Guide/gi, 'Noćno ronjenje uz obalu Budve'],
  [/Ronilačke ture/gi, 'ronilačke ture'],
  [
    /Robert leads the company with over 15 godina iskustva in corporate strategy and business growth\.[^<]*/gi,
    'Marko vodi tim instruktora na Jadranu — fokus na bezbednost, pedagoški pristup i planiranje izlazaka oko Budve.',
  ],
  [/More about me/gi, 'Više o instruktoru'],
  [
    /I am a passionate and results-driven professional with extensive experience in corporate strategy[^<]*/gi,
    'Sertifikovani instruktor sa iskustvom na obali Budve i okolnim lokacijama. Vodi discover i napredne ture, posebno ceni rad sa početnicima i noćnim zaronima uz kontrolisanu opremu.',
  ],
  [
    /My career journey began in business analysis[^<]*/gi,
    'Karijeru je započeo kao ronilac-recovery, zatim prešao na instruktorske programe i vođenje grupa na Mogrenu i oko Svetog Nikole.',
  ],
  [
    /Our approach to customer experience is comprehensive and data-driven\. We begin by assessing your current\./gi,
    'Pristup je jednostavan: briefing, oprema, zaron po planu i debriefing — bez nepotrebnog rizika.',
  ],
  [/Type your message/gi, 'Vaša poruka'],
  [/godina iskustva in corporate/gi, 'godina iskustva u ronjenju i'],
  [/Things You Can Enjoy/gi, 'Iskustva kluba'],
  [/Kayaking/gi, 'Ronjenje'],
  [/Beach Volleyball/gi, 'Snorkeling'],
  [/Sunset Walking/gi, 'Noćni zaron'],
  [/Swimming/gi, 'Probni zaron'],
  [/<span class="txt">view details<\/span>/gi, '<span class="txt">Detalji</span>'],
  [/view details/gi, 'Detalji'],
  [/luxury yatch journey/gi, 'Lokacija — Budvanska obala'],
  [/Explore Our Favorite Summer <br> Charter Destinations/gi, 'Ronilačke lokacije <br> oko Budve'],
  [
    /Explore Our Favorite Summer\s*<br>\s*Charter Destinations/gi,
    'Ronilačke lokacije <br> oko Budve',
  ],
  [
    /Our holistic approach goes beyond just a dive\.[^<]*/gi,
    'Ronjenje kod nas uključuje briefing, prilagođenu opremu i poštovanje morskog okruženja — bez nepotrebnog rizika.',
  ],
  [
    /Our expert instructors lead you through the most vibrant coral reefs[^<]*/gi,
    'Instruktori vode grupe kroz pećine, grebene i olupine koje biramo prema vremenu i iskustvu grupe.',
  ],
  [
    /Exploring the hidden wonders of the deep sea is one of the most breathtaking experiences[^<]*/gi,
    'Svaka lokacija oko Budve ima svoj karakter — plitki uvod za početnike ili duži zaron uz liticu za iskusnije.',
  ],
  [/Our Specialized Diving Usluge/gi, 'Specijalizovane ronilačke usluge'],
  [
    /Experience the freedom of the open sea with unparalleled luxury and comfort\.[^<]*/gi,
    'Priprema za zaron, izbor lokacije i oprema — sve kroz mali tim koji poznaje budvansku obalu.',
  ],
  [
    /What to Expect During Your Ronjenje Certification Course/gi,
    'Šta očekivati na ronilačkom kursu u Budvi',
  ],
  [
    /Whether you are navigating through ancient shipwrecks[^<]*/gi,
    'Od olupina do grebena — svaki izlazak planiramo prema moru, vidljivosti i tvom iskustvu. Na površini: kratak debriefing i plan sledećeg zaronа.',
  ],
  [
    /Robert leads the company with over 15 godina iskustva in corporate strategy and business growth\. She drives innovation and ensures the organization stays aligned with its long-term vision\./gi,
    'Marko vodi tim instruktora na Jadranu — fokus na bezbednost, pedagoški pristup i planiranje izlazaka oko Budve.',
  ],
  [
    /I am a passionate and results-driven professional with extensive experience in corporate strategy, digital marketing, and business development\. Over the years, I have helped organizations transform ideas into actionable strategies, optimize operations, and achieve sustainable growth\. My approach combines creativity with data-driven decision-making to deliver measurable results and long-term value\. I thrive in dynamic environments, collaborating\./gi,
    'Sertifikovani instruktor sa iskustvom na obali Budve. Vodi discover i napredne ture; posebno ceni rad sa početnicima i noćnim zaronima uz kontrolisanu opremu.',
  ],
  [
    /Our approach to customer experience is comprehensive and data-driven\. We begin by assessing your current\./gi,
    'Pristup: briefing, oprema, zaron po planu i debriefing — bez nepotrebnog rizika.',
  ],
  [/Navigation Basics: Charting Your Course/gi, 'Osnove navigacije pod vodom'],
  [
    /Robert has navigated the Mediterranean for two decades, mastering luxury yacht handling, offshore navigation, and maritime law\./gi,
    'Instruktor sa dugogodišnjim iskustvom na Jadranu — vođene ture, noćno ronjenje i rad sa početnicima u Budvi.',
  ],
  [/Secure Your Cabin/gi, 'Rezerviši mesto na kursu'],
  [
    /Every yacht trip is an[\s\S]{0,80}exceptional service/gi,
    'Svaki izlazak je prilika da Jadran upoznaš mirno, uz instruktora i jasan plan zaronа.',
  ],
  [/>(\s*)Snorkeling Tours</gi, '>$1Snorkeling obilasci<'],
  [/>(\s*)Snorkeling</gi, '>$1Snorkeling<'],
  [/what we offer/gi, 'Naše usluge'],
  [/view Usluge/gi, 'Pogledaj usluge'],
  [/Kursevi &amp; Certifications/gi, 'Kursevi i certifikati'],
  [/Led By Experienced/gi, 'Vođeni iskusnim'],
  [/Instructors/gi, 'instruktorima'],
  [/\$250/g, '420 €'],
  [/View all guide/gi, 'Pogledaj sve'],
  [/Started on/gi, 'Termini'],
  [/April 25, 2026/gi, 'apr–okt, po dogovoru'],
];

for (const file of walk(www)) {
  let html = fs.readFileSync(file, 'utf8');
  let out = html;
  for (const [a, b] of RE) out = out.replace(a, b);
  if (out !== html) fs.writeFileSync(file, out, 'utf8');
}

console.log('final-cleanup done');
