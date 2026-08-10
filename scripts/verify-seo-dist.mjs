/**
 * Build-time verification: every SEO route HTML in dist/ must contain
 * the correct title, description, canonical and OG tags in the RAW file.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { PAGES, SITE_ORIGIN } from './prerender-seo.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.resolve(__dirname, '../dist');
const HOME_TITLE = 'Authorised Ashok Leyland Dealer in Goa | Gemini Motors';
const HOME_CANONICAL = `${SITE_ORIGIN}/`;

function fileFor(pagePath) {
  if (pagePath === '/') return path.join(distDir, 'index.html');
  return path.join(distDir, pagePath.replace(/^\/+|\/+$/g, ''), 'index.html');
}

function canonicalFor(pagePath) {
  return pagePath === '/' ? HOME_CANONICAL : `${SITE_ORIGIN}${pagePath}`;
}

function attr(html, regex) {
  const match = html.match(regex);
  return match ? decodeEntities(match[1]) : '';
}

function decodeEntities(value) {
  return value
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>');
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
  const title = attr(html, /<title>(.*?)<\/title>/i);
  const description = attr(html, /<meta\s+name="description"\s+content="([^"]*)"/i);
  const canonicals = [...html.matchAll(/<link\s+rel="canonical"\s+href="([^"]*)"/gi)].map((m) => m[1]);
  const ogTitle = attr(html, /<meta\s+property="og:title"\s+content="([^"]*)"/i);
  const ogDescription = attr(html, /<meta\s+property="og:description"\s+content="([^"]*)"/i);
  const ogUrl = attr(html, /<meta\s+property="og:url"\s+content="([^"]*)"/i);
  const wantCanon = canonicalFor(page.path);

  const issues = [];
  if (title !== page.title) issues.push(`title="${title}"`);
  if (description !== page.description) issues.push('description mismatch');
  if (canonicals.length !== 1) issues.push(`canonicalCount=${canonicals.length}`);
  if (canonicals[0] !== wantCanon) issues.push(`canonical="${canonicals[0]}"`);
  if (ogTitle !== page.title) issues.push(`og:title="${ogTitle}"`);
  if (ogDescription !== page.description) issues.push('og:description mismatch');
  if (ogUrl !== wantCanon) issues.push(`og:url="${ogUrl}"`);

  if (page.path !== '/') {
    if (title === HOME_TITLE) issues.push('home title leak');
    if (ogTitle === HOME_TITLE) issues.push('home og:title leak');
    if (canonicals[0] === HOME_CANONICAL) issues.push('home canonical leak');
    if (ogUrl === HOME_CANONICAL) issues.push('home og:url leak');
    if (html.includes(HOME_TITLE)) issues.push('home title string still present');
  }

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
