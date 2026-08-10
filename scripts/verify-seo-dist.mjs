/**
 * Build-time verification: every SEO route HTML in dist/ must contain
 * the correct title, description, and absolute canonical in the RAW file
 * (what View Source / curl see — no JS).
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.resolve(__dirname, '../dist');
const SITE_ORIGIN = 'https://geminimotorsgoa.in';

/** Exact DOCX values — keep in sync with prerender-seo.mjs */
const PAGES = [
  {
    path: '/',
    title: 'Authorised Ashok Leyland Dealer in Goa | Gemini Motors',
    description:
      'Gemini Motors is a trusted authorised Ashok Leyland dealer in Goa offering commercial vehicles, trucks, EVs, finance and service support.',
  },
  {
    path: '/about/',
    title: 'About Gemini Motors | Ashok Leyland Dealer in Goa',
    description:
      'Learn about Gemini Motors, a trusted Ashok Leyland dealer in Goa offering commercial vehicles, customer support, finance and after-sales service.',
  },
  {
    path: '/commercial/',
    title: 'Ashok Leyland Commercial Vehicles in Goa | Gemini',
    description:
      'Explore Ashok Leyland commercial vehicles at Gemini Motors, a trusted dealer in Goa offering solutions for transport and business needs.',
  },
  {
    path: '/commercial/light/',
    title: 'Ashok Leyland LCVs in Goa | Gemini Motors Dealer',
    description:
      'Explore Ashok Leyland light commercial vehicles in Goa at Gemini Motors, with expert guidance, finance assistance and after-sales support.',
  },
  {
    path: '/commercial/medium-heavy/',
    title: 'Ashok Leyland Trucks in Goa | Gemini Motors Dealer',
    description:
      'Find Ashok Leyland medium and heavy-duty trucks in Goa at Gemini Motors for logistics, construction, transport and demanding applications.',
  },
  {
    path: '/electric-mobility/',
    title: 'Ashok Leyland Electric Vehicles in Goa | Gemini',
    description:
      'Explore electric commercial vehicles from Ashok Leyland in Goa at Gemini Motors, with guidance on models, finance and sustainable mobility.',
  },
  {
    path: '/services/',
    title: 'Ashok Leyland Service Centre in Goa | Gemini Motors',
    description:
      'Visit Gemini Motors for authorised Ashok Leyland service in Goa, including maintenance, repairs, diagnostics and genuine spare parts support.',
  },
  {
    path: '/finance/',
    title: 'Ashok Leyland Vehicle Finance in Goa | Gemini Motors',
    description:
      'Get finance assistance for Ashok Leyland commercial vehicles in Goa through Gemini Motors with guidance on suitable funding options.',
  },
  {
    path: '/contact/',
    title: 'Contact Ashok Leyland Dealer in Goa | Gemini Motors',
    description:
      'Contact Gemini Motors, an authorised Ashok Leyland dealer in Goa, for vehicle enquiries, test drives, finance and service assistance.',
  },
  {
    path: '/green-technologies/',
    title: 'Ashok Leyland Green Technologies in Goa | Gemini',
    description:
      'Discover Ashok Leyland green technologies in Goa at Gemini Motors, supporting cleaner mobility, efficient transport and sustainable solutions.',
  },
  {
    path: '/commercial/light/gemini-l-series-25t/',
    title: 'Gemini L Series 2.5T in Goa | Ashok Leyland Dealer',
    description:
      'Explore the Gemini L Series 2.5T at Gemini Motors, an Ashok Leyland dealer in Goa offering vehicle guidance, finance and sales support.',
  },
  {
    path: '/commercial/light/dost-plus-xl/',
    title: 'Ashok Leyland Dost Plus XL in Goa | Gemini',
    description:
      'Explore the Ashok Leyland Dost Plus XL at Gemini Motors, your local dealer in Goa for vehicle enquiries, finance assistance and support.',
  },
  {
    path: '/commercial/light/dost-xl/',
    title: 'Ashok Leyland Dost XL in Goa | Gemini Motors Dealer',
    description:
      'Find the Ashok Leyland Dost XL at Gemini Motors in Goa with expert guidance, finance assistance and support for your business needs.',
  },
  {
    path: '/commercial/light/saathi/',
    title: 'Ashok Leyland Saathi in Goa | Gemini Motors',
    description:
      'Discover the Ashok Leyland Saathi at Gemini Motors, a trusted dealer in Goa offering vehicle guidance, finance options and customer support.',
  },
  {
    path: '/commercial/light/partner-municipal/',
    title: 'Ashok Leyland Partner Municipal in Goa | Gemini',
    description:
      'Explore the Ashok Leyland Partner Municipal at Gemini Motors in Goa, with solutions and support for municipal and waste management operations.',
  },
  {
    path: '/commercial/light/partner-4-tyre/',
    title: 'Ashok Leyland Partner 4 Tyre in Goa | Gemini',
    description:
      'Find the Ashok Leyland Partner 4 Tyre at Gemini Motors, a trusted dealer in Goa offering commercial vehicle sales and support.',
  },
  {
    path: '/commercial/light/bada-dost-i6/',
    title: 'Ashok Leyland Bada Dost i6 in Goa | Gemini',
    description:
      'Explore the Ashok Leyland Bada Dost i6 at Gemini Motors, an authorised dealer in Goa offering sales guidance and finance assistance.',
  },
  {
    path: '/commercial/light/bada-dost-i5/',
    title: 'Ashok Leyland Bada Dost i5 in Goa | Gemini',
    description:
      'Discover the Ashok Leyland Bada Dost i5 at Gemini Motors in Goa with expert vehicle guidance, finance assistance and dealer support.',
  },
  {
    path: '/commercial/light/bada-dost-i5-plus/',
    title: 'Ashok Leyland Bada Dost i5 Plus in Goa | Gemini',
    description:
      'Explore the Ashok Leyland Bada Dost i5 Plus at Gemini Motors, a trusted Goa dealer offering sales guidance, finance and customer support.',
  },
  {
    path: '/commercial/medium-heavy/avtr-4525h-dtla/',
    title: 'Ashok Leyland AVTR 4525H DTLA in Goa | Gemini',
    description:
      'Explore the Ashok Leyland AVTR 4525H DTLA at Gemini Motors in Goa for heavy-duty transport, with expert sales and finance assistance.',
  },
  {
    path: '/commercial/medium-heavy/8x4-tipper/',
    title: 'Ashok Leyland 8x4 Tipper in Goa | Gemini Motors',
    description:
      'Find the Ashok Leyland 8x4 Tipper at Gemini Motors, a trusted Goa dealer serving construction, mining and infrastructure requirements.',
  },
  {
    path: '/commercial/medium-heavy/avtr-4625h-la/',
    title: 'Ashok Leyland AVTR 4625H LA in Goa | Gemini',
    description:
      'Explore the Ashok Leyland AVTR 4625H LA at Gemini Motors in Goa with expert assistance for heavy-duty transport and business needs.',
  },
  {
    path: '/electric-mobility/switch-iev4/',
    title: 'SWITCH IeV4 Electric Vehicle in Goa | Gemini',
    description:
      'Discover the SWITCH IeV4 at Gemini Motors, a trusted electric commercial vehicle dealer in Goa offering sales and expert assistance.',
  },
  {
    path: '/electric-mobility/switch-iev4-garbage-tipper/',
    title: 'SWITCH IeV4 Garbage Tipper in Goa | Gemini',
    description:
      'Explore the SWITCH IeV4 Garbage Tipper at Gemini Motors, serving Goa with electric waste management vehicle solutions and dealer support.',
  },
  {
    path: '/electric-mobility/switch-iev3/',
    title: 'SWITCH IeV3 Electric Vehicle in Goa | Gemini Motors',
    description:
      'Explore the SWITCH IeV3 at Gemini Motors, an electric commercial vehicle dealer in Goa offering sales guidance and support for businesses.',
  },
];

function fileFor(pagePath) {
  if (pagePath === '/') return path.join(distDir, 'index.html');
  return path.join(distDir, pagePath.replace(/^\/+|\/+$/g, ''), 'index.html');
}

function canonicalFor(pagePath) {
  return pagePath === '/' ? `${SITE_ORIGIN}/` : `${SITE_ORIGIN}${pagePath}`;
}

let failed = 0;
for (const page of PAGES) {
  const file = fileFor(page.path);
  if (!fs.existsSync(file)) {
    console.error(`MISSING FILE: ${file}`);
    failed += 1;
    continue;
  }
  const html = fs.readFileSync(file, 'utf8');
  const title = (html.match(/<title>(.*?)<\/title>/i) || [])[1] || '';
  const description = (html.match(/<meta\s+name="description"\s+content="([^"]*)"/i) || [])[1] || '';
  const canonicals = [...html.matchAll(/<link\s+rel="canonical"\s+href="([^"]*)"/gi)].map((m) => m[1]);
  const wantCanon = canonicalFor(page.path);
  const issues = [];
  if (title !== page.title) issues.push(`title="${title}"`);
  if (description !== page.description) issues.push(`description mismatch`);
  if (canonicals.length !== 1) issues.push(`canonicalCount=${canonicals.length}`);
  if (canonicals[0] !== wantCanon) issues.push(`canonical="${canonicals[0]}"`);
  if (issues.length) {
    console.error(`FAIL ${page.path}: ${issues.join('; ')}`);
    failed += 1;
  } else {
    console.log(`OK   ${page.path}`);
  }
}

if (failed) {
  console.error(`SEO dist verification failed: ${failed} page(s)`);
  process.exit(1);
}
console.log(`SEO dist verification passed: ${PAGES.length} pages`);
