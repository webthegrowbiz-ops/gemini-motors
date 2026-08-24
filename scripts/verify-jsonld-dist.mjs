/**
 * Verify JSON-LD presence and key types in prerendered dist HTML.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { PAGES, SITE_ORIGIN } from './prerender-seo.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.resolve(__dirname, '../dist');

function fileFor(pagePath) {
  if (pagePath === '/') return path.join(distDir, 'index.html');
  return path.join(distDir, pagePath.replace(/^\/+|\/+$/g, ''), 'index.html');
}

function extractJsonLd(html) {
  const match = html.match(
    /<script[^>]*type=["']application\/ld\+json["'][^>]*id=["']gemini-jsonld["'][^>]*>([\s\S]*?)<\/script>/i,
  ) || html.match(
    /<script[^>]*id=["']gemini-jsonld["'][^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/i,
  );
  if (!match) return null;
  return JSON.parse(match[1]);
}

function typesInGraph(doc) {
  const graph = Array.isArray(doc['@graph']) ? doc['@graph'] : [doc];
  const types = new Set();
  for (const node of graph) {
    const t = node['@type'];
    if (Array.isArray(t)) t.forEach((x) => types.add(x));
    else if (t) types.add(t);
  }
  return types;
}

function expectedTypes(pagePath) {
  if (pagePath === '/') return ['AutoDealer', 'Organization', 'WebSite', 'BreadcrumbList'];
  if (pagePath === '/about/') return ['AboutPage', 'AutoDealer', 'BreadcrumbList'];
  if (
    pagePath === '/commercial/' ||
    pagePath === '/commercial/light/' ||
    pagePath === '/commercial/medium-heavy/' ||
    pagePath === '/electric-mobility/'
  ) {
    return ['CollectionPage', 'ItemList', 'BreadcrumbList', 'AutoDealer'];
  }
  if (pagePath === '/services/' || pagePath === '/finance/') {
    return ['Service', 'BreadcrumbList', 'AutoDealer'];
  }
  if (pagePath === '/contact/') {
    return ['ContactPage', 'LocalBusiness', 'BreadcrumbList', 'AutoDealer'];
  }
  if (pagePath === '/green-technologies/') {
    return ['WebPage', 'BreadcrumbList', 'AutoDealer'];
  }
  if (
    pagePath.startsWith('/commercial/light/') ||
    pagePath.startsWith('/commercial/medium-heavy/') ||
    pagePath.startsWith('/electric-mobility/')
  ) {
    // Priced pages also include Product+Vehicle (checked below).
    // On-Request pages omit Product/Vehicle because Vehicle is a Product subclass.
    return ['BreadcrumbList', 'AutoDealer', 'Organization'];
  }
  return ['AutoDealer'];
}

let failed = 0;
let productPages = 0;
let listingPages = 0;
const onRequestWithoutPrice = [];
const pricedOffers = [];

for (const page of PAGES) {
  const file = fileFor(page.path);
  if (!fs.existsSync(file)) {
    console.error(`MISSING FILE: ${file}`);
    failed += 1;
    continue;
  }

  const html = fs.readFileSync(file, 'utf8');
  let doc;
  try {
    doc = extractJsonLd(html);
  } catch (error) {
    console.error(`FAIL ${page.path}: invalid JSON-LD (${error.message})`);
    failed += 1;
    continue;
  }

  if (!doc) {
    console.error(`FAIL ${page.path}: missing #gemini-jsonld`);
    failed += 1;
    continue;
  }

  const types = typesInGraph(doc);
  const want = expectedTypes(page.path);
  const missing = want.filter((t) => !types.has(t));
  if (missing.length) {
    console.error(`FAIL ${page.path}: missing types ${missing.join(', ')} (have ${[...types].join(', ')})`);
    failed += 1;
    continue;
  }

  const graph = Array.isArray(doc['@graph']) ? doc['@graph'] : [];
  const orgNodes = graph.filter((n) => n && n['@id'] === `${SITE_ORIGIN}/#organization`);
  if (orgNodes.length !== 1) {
    console.error(
      `FAIL ${page.path}: expected exactly 1 organization @id ${SITE_ORIGIN}/#organization, got ${orgNodes.length}`,
    );
    failed += 1;
    continue;
  }
  const org = orgNodes[0];
  const orgTypes = Array.isArray(org['@type']) ? org['@type'] : [org['@type']];
  if (!orgTypes.includes('AutoDealer') || !orgTypes.includes('Organization')) {
    console.error(
      `FAIL ${page.path}: organization node missing AutoDealer/Organization types (have ${orgTypes.join(', ')})`,
    );
    failed += 1;
    continue;
  }
  const autoDealers = graph.filter((n) => {
    const t = n?.['@type'];
    const typesList = Array.isArray(t) ? t : t ? [t] : [];
    return typesList.includes('AutoDealer');
  });
  if (autoDealers.length !== 1) {
    console.error(`FAIL ${page.path}: expected exactly 1 AutoDealer entity, got ${autoDealers.length}`);
    failed += 1;
    continue;
  }
  if (autoDealers[0]['@id'] !== `${SITE_ORIGIN}/#organization`) {
    console.error(`FAIL ${page.path}: AutoDealer @id is not the shared organization id`);
    failed += 1;
    continue;
  }

  const isListing =
    page.path === '/commercial/' ||
    page.path === '/commercial/light/' ||
    page.path === '/commercial/medium-heavy/' ||
    page.path === '/electric-mobility/';
  const isProduct =
    !isListing &&
    (page.path.startsWith('/commercial/light/') ||
      page.path.startsWith('/commercial/medium-heavy/') ||
      page.path.startsWith('/electric-mobility/'));

  if (isListing) {
    listingPages += 1;
    const graph = doc['@graph'] || [];
    const itemList = graph.find((n) => n['@type'] === 'ItemList');
    const urls = (itemList?.itemListElement || []).map((el) => el.url || el.item).filter(Boolean);
    const bad = urls.filter((u) => typeof u !== 'string' || !u.startsWith(SITE_ORIGIN));
    if (!urls.length) {
      console.error(`FAIL ${page.path}: ItemList empty`);
      failed += 1;
      continue;
    }
    if (bad.length) {
      console.error(`FAIL ${page.path}: bad ItemList URLs`);
      failed += 1;
      continue;
    }
  }

  if (isProduct) {
    productPages += 1;
    const graph = doc['@graph'] || [];
    const typed = (typeName) =>
      graph.filter((n) => {
        const t = n['@type'];
        return t === typeName || (Array.isArray(t) && t.includes(typeName));
      });
    const products = typed('Product');
    const vehicles = typed('Vehicle');
    const offers = graph.filter((n) => n.offers || n['@type'] === 'Offer');

    if (products.length > 1) {
      console.error(`FAIL ${page.path}: expected at most 1 Product, got ${products.length}`);
      failed += 1;
      continue;
    }

    if (products.length === 1) {
      const product = products[0];
      const productTypes = Array.isArray(product['@type']) ? product['@type'] : [product['@type']];
      if (!productTypes.includes('Vehicle')) {
        console.error(`FAIL ${page.path}: Product missing Vehicle type`);
        failed += 1;
        continue;
      }
      for (const key of Object.keys(product)) {
        if (/^lcv|^heavy|BodyType$|FuelType$/i.test(key) && !['bodyType', 'fuelType'].includes(key)) {
          console.error(`FAIL ${page.path}: non-standard property ${key}`);
          failed += 1;
        }
      }
      if (Object.prototype.hasOwnProperty.call(product, 'lcvBodyType') || Object.prototype.hasOwnProperty.call(product, 'heavyFuelType')) {
        console.error(`FAIL ${page.path}: custom body/fuel properties`);
        failed += 1;
        continue;
      }
      // Forbidden without a genuine per-product data source. Do not emit placeholders,
      // InStock guesses, homepage testimonials, or decorative star ratings.
      const forbiddenProductOfferKeys = ['review', 'aggregateRating', 'availability'];
      const forbiddenOnProduct = forbiddenProductOfferKeys.find((key) =>
        Object.prototype.hasOwnProperty.call(product, key),
      );
      if (forbiddenOnProduct) {
        console.error(
          `FAIL ${page.path}: Product must not emit ${forbiddenOnProduct} (no genuine source data)`,
        );
        failed += 1;
        continue;
      }
      if (!product.offers || product.offers['@type'] !== 'Offer') {
        console.error(`FAIL ${page.path}: Product requires nested Offer with a real price`);
        failed += 1;
        continue;
      }
      if (product.offers.price == null || product.offers.priceSpecification) {
        console.error(
          `FAIL ${page.path}: invalid Offer — omit Product/Vehicle unless a real price exists`,
        );
        failed += 1;
        continue;
      }
      if (product.offers.priceCurrency !== 'INR') {
        console.error(`FAIL ${page.path}: Offer missing INR priceCurrency`);
        failed += 1;
        continue;
      }
      const forbiddenOnOffer = forbiddenProductOfferKeys.find((key) =>
        Object.prototype.hasOwnProperty.call(product.offers, key),
      );
      if (forbiddenOnOffer) {
        console.error(
          `FAIL ${page.path}: Offer must not emit ${forbiddenOnOffer} (no genuine source data)`,
        );
        failed += 1;
        continue;
      }
      if (!product.offers.seller || typeof product.offers.seller !== 'object') {
        console.error(`FAIL ${page.path}: Offer missing seller`);
        failed += 1;
        continue;
      }
      const seller = product.offers.seller;
      const sellerIsOrg =
        seller['@type'] === 'Organization' ||
        (Array.isArray(seller['@type']) && seller['@type'].includes('Organization'));
      // Keep seller as an Organization object (not a bare @id) so AutoDealer stays
      // a top-level Detected item and merchant listings retain a named seller.
      if (
        !sellerIsOrg ||
        seller.name !== 'Gemini Motors' ||
        seller.url !== SITE_ORIGIN ||
        !seller.telephone ||
        seller['@id']
      ) {
        console.error(
          `FAIL ${page.path}: Offer seller must be Organization {name,url,telephone} without @id`,
        );
        failed += 1;
        continue;
      }
      pricedOffers.push({ path: page.path, price: product.offers.price });
    } else {
      if (vehicles.length) {
        console.error(
          `FAIL ${page.path}: On-Request page must not emit Vehicle (Vehicle is a Product subclass and triggers Google Product snippet rules)`,
        );
        failed += 1;
        continue;
      }
      if (offers.length) {
        console.error(`FAIL ${page.path}: On-Request page must not emit Offer`);
        failed += 1;
        continue;
      }
      onRequestWithoutPrice.push(page.path);
    }
  }

  console.log(`OK   ${page.path} [${want.join('+')}]`);
}

if (failed) {
  console.error(`JSON-LD verification failed: ${failed} page(s)`);
  process.exit(1);
}

console.log(
  `JSON-LD verification passed: ${PAGES.length} pages (products=${productPages}, listings=${listingPages}, offers=${pricedOffers.length}, no-offer=${onRequestWithoutPrice.length})`,
);
