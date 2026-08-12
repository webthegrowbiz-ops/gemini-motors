/**
 * Schema.org JSON-LD builders for Gemini Motors.
 * Only use fields backed by existing site data — never invent prices, ratings, or availability.
 */

import { SITE_ORIGIN, canonicalUrlForPath, normalizeSeoPath } from './seo';
import {
  commercialCategories,
  commercialModels,
  lightCommercialVehicles,
  mediumHeavyCommercialVehicles,
  type CommercialVehicleModel,
} from './data/commercialVehiclesData';
import { switchElectricVehicles } from './data/electricVehiclesData';
import type { ProductPageData } from './types';

export const JSON_LD_SCRIPT_ID = 'gemini-jsonld';

export const DEALER = {
  name: 'Gemini Motors',
  legalName: 'Gemini Motors Goa',
  telephone: '+91 94223 93288',
  email: 'agnel899@gmail.com',
  url: SITE_ORIGIN,
  address: {
    streetAddress: 'Panaji',
    addressLocality: 'Panaji',
    addressRegion: 'Goa',
    postalCode: '403001',
    addressCountry: 'IN',
  },
  areaServed: ['Goa', 'Panaji', 'Vasco', 'Margao', 'Ponda', 'Verna Industrial Estate'],
} as const;

export type JsonLd = Record<string, unknown>;

export function organizationId(): string {
  return `${SITE_ORIGIN}/#organization`;
}

export function buildAutoDealerOrganization(): JsonLd {
  return {
    '@type': ['AutoDealer', 'Organization'],
    '@id': organizationId(),
    name: DEALER.name,
    legalName: DEALER.legalName,
    url: DEALER.url,
    telephone: DEALER.telephone,
    email: DEALER.email,
    address: {
      '@type': 'PostalAddress',
      addressLocality: DEALER.address.addressLocality,
      addressRegion: DEALER.address.addressRegion,
      postalCode: DEALER.address.postalCode,
      addressCountry: DEALER.address.addressCountry,
    },
    areaServed: [...DEALER.areaServed],
  };
}

export function buildLocalBusiness(): JsonLd {
  return {
    '@type': 'LocalBusiness',
    '@id': `${SITE_ORIGIN}/contact/#localbusiness`,
    name: DEALER.legalName,
    url: DEALER.url,
    telephone: DEALER.telephone,
    email: DEALER.email,
    description:
      'Commercial vehicle dealer in Goa supporting Ashok Leyland vehicle enquiries, finance assistance, service support and fleet requirements.',
    address: {
      '@type': 'PostalAddress',
      addressLocality: DEALER.address.addressLocality,
      addressRegion: DEALER.address.addressRegion,
      postalCode: DEALER.address.postalCode,
      addressCountry: DEALER.address.addressCountry,
    },
    areaServed: [...DEALER.areaServed],
    parentOrganization: { '@id': organizationId() },
  };
}

export function buildWebSite(): JsonLd {
  return {
    '@type': 'WebSite',
    '@id': `${SITE_ORIGIN}/#website`,
    name: DEALER.name,
    url: SITE_ORIGIN,
    publisher: { '@id': organizationId() },
  };
}

export type BreadcrumbItem = { name: string; path: string };

export function buildBreadcrumbList(items: BreadcrumbItem[], pagePath?: string): JsonLd {
  const breadcrumb: JsonLd = {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: canonicalUrlForPath(item.path),
    })),
  };
  if (pagePath) {
    breadcrumb['@id'] = `${canonicalUrlForPath(pagePath)}#breadcrumb`;
  }
  return breadcrumb;
}

export function buildAboutPage(seo: { title: string; description: string; path: string }): JsonLd {
  return {
    '@type': 'AboutPage',
    '@id': `${canonicalUrlForPath(seo.path)}#webpage`,
    name: seo.title,
    description: seo.description,
    url: canonicalUrlForPath(seo.path),
    isPartOf: { '@id': `${SITE_ORIGIN}/#website` },
    about: { '@id': organizationId() },
  };
}

export function buildContactPage(seo: { title: string; description: string; path: string }): JsonLd {
  return {
    '@type': 'ContactPage',
    '@id': `${canonicalUrlForPath(seo.path)}#webpage`,
    name: seo.title,
    description: seo.description,
    url: canonicalUrlForPath(seo.path),
    isPartOf: { '@id': `${SITE_ORIGIN}/#website` },
    about: { '@id': organizationId() },
  };
}

export function buildWebPage(seo: { title: string; description: string; path: string }): JsonLd {
  return {
    '@type': 'WebPage',
    '@id': `${canonicalUrlForPath(seo.path)}#webpage`,
    name: seo.title,
    description: seo.description,
    url: canonicalUrlForPath(seo.path),
    isPartOf: { '@id': `${SITE_ORIGIN}/#website` },
    about: { '@id': organizationId() },
  };
}

export function buildServicePage(
  seo: { title: string; description: string; path: string },
  serviceName: string,
  serviceType: string,
): JsonLd {
  return {
    '@type': 'Service',
    '@id': `${canonicalUrlForPath(seo.path)}#service`,
    name: serviceName,
    serviceType,
    description: seo.description,
    url: canonicalUrlForPath(seo.path),
    provider: { '@id': organizationId() },
    areaServed: [...DEALER.areaServed],
  };
}

export function buildCollectionPage(
  seo: { title: string; description: string; path: string },
  listId: string,
): JsonLd {
  return {
    '@type': 'CollectionPage',
    '@id': `${canonicalUrlForPath(seo.path)}#webpage`,
    name: seo.title,
    description: seo.description,
    url: canonicalUrlForPath(seo.path),
    isPartOf: { '@id': `${SITE_ORIGIN}/#website` },
    about: { '@id': organizationId() },
    mainEntity: { '@id': listId },
  };
}

export function buildItemList(
  listId: string,
  name: string,
  items: Array<{ name: string; url: string }>,
): JsonLd {
  return {
    '@type': 'ItemList',
    '@id': listId,
    name,
    numberOfItems: items.length,
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      url: item.url,
      item: item.url,
    })),
  };
}

/** Parse `₹ 10.99 L* onwards` → INR integer. Returns null for On Request / unparseable. */
export function parseInrFromPriceLabel(price?: string | null): number | null {
  if (!price) return null;
  const trimmed = price.trim();
  if (!trimmed || /^on\s*request$/i.test(trimmed) || !trimmed.includes('₹')) return null;
  const match = trimmed.match(/₹\s*([\d.]+)\s*L/i);
  if (!match) return null;
  const lakhs = Number.parseFloat(match[1]);
  if (!Number.isFinite(lakhs) || lakhs <= 0) return null;
  return Math.round(lakhs * 100_000);
}

export function resolveListingNumericPrice(model: CommercialVehicleModel): number | null {
  if (model.metricLabel === 'Price') {
    return parseInrFromPriceLabel(model.metricValue);
  }
  return parseInrFromPriceLabel(model.startingPrice);
}

export function resolveProductNumericPrice(
  product: ProductPageData,
  listing?: CommercialVehicleModel | null,
): number | null {
  if (listing) {
    const fromListing = resolveListingNumericPrice(listing);
    if (fromListing != null) return fromListing;
  }
  const priceSpec = product.quickSpecs.find((spec) => spec.label === 'Price');
  return parseInrFromPriceLabel(priceSpec?.value);
}

function brandForProduct(product: ProductPageData): string {
  if (product.name.toLowerCase().startsWith('switch')) return 'SWITCH';
  if (product.name.toLowerCase().startsWith('gemini')) return 'Gemini Motors';
  return 'Ashok Leyland';
}

function findSpecValue(product: ProductPageData, labels: string[]): string | undefined {
  const wanted = new Set(labels.map((label) => label.toLowerCase()));
  for (const spec of product.quickSpecs) {
    if (wanted.has(spec.label.toLowerCase()) && spec.value?.trim()) return spec.value.trim();
  }
  for (const group of product.specifications || []) {
    for (const row of group.rows) {
      if (wanted.has(row.label.toLowerCase()) && row.value?.trim()) return row.value.trim();
    }
  }
  for (const indicator of product.overview?.trustIndicators || []) {
    if (wanted.has(indicator.label.toLowerCase()) && indicator.value?.trim()) return indicator.value.trim();
  }
  return undefined;
}

/** fuelType from listing or product specs — skip unverified enquiry placeholders. */
export function resolveVehicleFuelType(
  product: ProductPageData,
  listing?: CommercialVehicleModel | null,
): string | undefined {
  const fromListing = listing?.fuelType?.trim();
  if (fromListing && !/^confirm on enquiry$/i.test(fromListing)) return fromListing;

  return findSpecValue(product, ['Fuel type', 'Fuel Type', 'Fuel']);
}

/**
 * bodyType from existing category / body / application fields only.
 * Prefer listing usageValue (Tipper, Haulage, Pickup, …) then product.category.
 */
export function resolveVehicleBodyType(
  product: ProductPageData,
  listing?: CommercialVehicleModel | null,
): string | undefined {
  const usage = listing?.usageValue?.trim();
  if (usage) return usage;

  const bodyConfig = findSpecValue(product, ['Body configuration', 'Body Type', 'Body type', 'Body']);
  if (bodyConfig) return bodyConfig;

  const category = product.category?.trim();
  return category || undefined;
}

/**
 * numberOfAxles only when an explicit NxM wheel/axle configuration exists in name/slug
 * (e.g. 4x2 → 2, 8x4 → 4, 10x2 → 5). Never invent for products without that config.
 */
export function resolveVehicleNumberOfAxles(
  product: ProductPageData,
  listing?: CommercialVehicleModel | null,
): number | undefined {
  const haystack = [product.id, product.name, listing?.slug, listing?.name, listing?.route]
    .filter(Boolean)
    .join(' ');
  const match = haystack.match(/\b([4-9]|1[0-6])\s*[xX×]\s*([0-9]|1[0-6])\b/);
  if (!match) return undefined;
  const wheelEnds = Number.parseInt(match[1], 10);
  if (!Number.isFinite(wheelEnds) || wheelEnds < 2 || wheelEnds % 2 !== 0) return undefined;
  return wheelEnds / 2;
}

type WeightTotal = {
  '@type': 'QuantitativeValue';
  value?: number;
  minValue?: number;
  maxValue?: number;
  unitCode: 'KGM';
};

function parseKgNumber(raw: string): number | null {
  const cleaned = raw.replace(/,/g, '').trim();
  if (!cleaned) return null;

  const tons = cleaned.match(/^([\d.]+)\s*T$/i);
  if (tons) {
    const t = Number.parseFloat(tons[1]);
    return Number.isFinite(t) && t > 0 ? Math.round(t * 1000) : null;
  }

  const kg = cleaned.match(/^([\d.]+)\s*(?:kg|kgs)?$/i);
  if (kg) {
    const n = Number.parseFloat(kg[1]);
    return Number.isFinite(n) && n > 0 ? Math.round(n) : null;
  }

  return null;
}

/** Parse GVW/GCW labels into Schema.org QuantitativeValue (kg). Ranges become min/max. */
export function resolveVehicleWeightTotal(
  product: ProductPageData,
  listing?: CommercialVehicleModel | null,
): WeightTotal | undefined {
  const raw =
    findSpecValue(product, ['GVW', 'Gross Vehicle Weight', 'GCW', 'Maximum Urban GVW']) ||
    (listing?.metricLabel === 'GVW' || listing?.metricLabel === 'GCW' ? listing.metricValue : undefined);

  if (!raw) return undefined;
  if (raw.trim().toLowerCase() === 'maximum urban gvw') return undefined;

  const normalized = raw.replace(/–|—/g, '-').replace(/\s*\/\s*/g, '-').trim();

  // e.g. 42-48T, 6250-7200 kg, 6,250 - 7,490 kg
  const rangeMatch = normalized.match(
    /^([\d,.]+)\s*(T|kg|kgs)?\s*-\s*([\d,.]+)\s*(T|kg|kgs)?$/i,
  );
  if (rangeMatch) {
    const unit = (rangeMatch[4] || rangeMatch[2] || 'kg').toLowerCase();
    const left = parseKgNumber(`${rangeMatch[1]}${unit === 't' ? 'T' : ''}`);
    const right = parseKgNumber(`${rangeMatch[3]}${unit === 't' ? 'T' : ' kg'}`);
    if (left != null && right != null) {
      return {
        '@type': 'QuantitativeValue',
        minValue: Math.min(left, right),
        maxValue: Math.max(left, right),
        unitCode: 'KGM',
      };
    }
  }

  const single = parseKgNumber(normalized.replace(/\s*kg\s*$/i, ' kg').replace(/\s*T\s*$/i, 'T'));
  if (single != null) {
    return {
      '@type': 'QuantitativeValue',
      value: single,
      unitCode: 'KGM',
    };
  }

  return undefined;
}

/** Optional Vite build manifest for resolving stubbed asset imports during prerender. */
let assetManifest: Record<string, { file?: string }> | null = null;

export function setAssetManifestForSchema(manifest: Record<string, { file?: string }> | null): void {
  assetManifest = manifest;
}

function absoluteImageUrl(imageUrl: string): string | undefined {
  if (!imageUrl) return undefined;
  if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) return imageUrl;
  if (imageUrl.startsWith('__ASSET__:')) {
    const srcKey = imageUrl.slice('__ASSET__:'.length);
    const entry = assetManifest?.[srcKey] || assetManifest?.[`/${srcKey}`];
    if (entry?.file) return `${SITE_ORIGIN}/${entry.file.replace(/^\//, '')}`;
    return undefined;
  }
  if (imageUrl.startsWith('/')) return `${SITE_ORIGIN}${imageUrl}`;
  if (imageUrl.startsWith('data:') || imageUrl.startsWith('blob:')) return undefined;
  return undefined;
}

export function buildProductSchema(
  product: ProductPageData,
  listing?: CommercialVehicleModel | null,
): JsonLd {
  const path = product.seo?.canonicalPath || `/${product.id}/`;
  const url = canonicalUrlForPath(path);
  const description = product.seo?.description || product.description;
  const structured = product.seo?.structuredProductSchema;
  const price = resolveProductNumericPrice(product, listing);

  const productNode: JsonLd = {
    '@type': ['Product', 'Vehicle'],
    '@id': `${url}#product`,
    name: structured?.name || product.name,
    description: structured?.description || description,
    category: structured?.category || product.category,
    brand: {
      '@type': 'Brand',
      name: structured?.brand || brandForProduct(product),
    },
    url,
  };

  const image = absoluteImageUrl(product.heroImage);
  if (image) {
    productNode.image = image;
  }

  const bodyType = resolveVehicleBodyType(product, listing);
  if (bodyType) productNode.bodyType = bodyType;

  const fuelType = resolveVehicleFuelType(product, listing);
  if (fuelType) productNode.fuelType = fuelType;

  const numberOfAxles = resolveVehicleNumberOfAxles(product, listing);
  if (numberOfAxles != null) productNode.numberOfAxles = numberOfAxles;

  const weightTotal = resolveVehicleWeightTotal(product, listing);
  if (weightTotal) productNode.weightTotal = weightTotal;

  if (price != null) {
    productNode.offers = {
      '@type': 'Offer',
      url,
      priceCurrency: 'INR',
      price: String(price),
      seller: { '@id': organizationId() },
    };
  }

  return productNode;
}

export function productBreadcrumbs(product: ProductPageData): BreadcrumbItem[] {
  const path = normalizeSeoPath(product.seo?.canonicalPath || '');
  const crumbs: BreadcrumbItem[] = [{ name: 'Home', path: '/' }];

  if (path.startsWith('/electric-mobility/')) {
    crumbs.push({ name: 'Electric Mobility', path: '/electric-mobility/' });
  } else if (path.startsWith('/commercial/medium-heavy/')) {
    crumbs.push({ name: 'Commercial Vehicles', path: '/commercial/' });
    crumbs.push({ name: 'Medium & Heavy Commercial Vehicles', path: '/commercial/medium-heavy/' });
  } else if (path.startsWith('/commercial/light/')) {
    crumbs.push({ name: 'Commercial Vehicles', path: '/commercial/' });
    crumbs.push({ name: 'Light Commercial Vehicles', path: '/commercial/light/' });
  } else {
    crumbs.push({ name: 'Commercial Vehicles', path: '/commercial/' });
  }

  crumbs.push({ name: product.name, path });
  return crumbs;
}

function modelToListItem(model: CommercialVehicleModel): { name: string; url: string } {
  return {
    name: model.name,
    url: canonicalUrlForPath(model.route),
  };
}

export function buildHomeGraph(seo: { title: string; description: string; path: string }): JsonLd[] {
  return [
    buildAutoDealerOrganization(),
    buildWebSite(),
    buildBreadcrumbList([{ name: 'Home', path: '/' }], seo.path),
  ];
}

export function buildAboutGraph(seo: { title: string; description: string; path: string }): JsonLd[] {
  return [
    buildAutoDealerOrganization(),
    buildAboutPage(seo),
    buildBreadcrumbList(
      [
        { name: 'Home', path: '/' },
        { name: 'About', path: '/about/' },
      ],
      seo.path,
    ),
  ];
}

export function buildCommercialGraph(seo: { title: string; description: string; path: string }): JsonLd[] {
  const listId = `${canonicalUrlForPath(seo.path)}#itemlist`;
  const items = commercialModels.map(modelToListItem);
  return [
    buildAutoDealerOrganization(),
    buildCollectionPage(seo, listId),
    buildItemList(listId, 'Ashok Leyland Commercial Vehicles', items),
    buildBreadcrumbList(
      [
        { name: 'Home', path: '/' },
        { name: 'Commercial Vehicles', path: '/commercial/' },
      ],
      seo.path,
    ),
  ];
}

export function buildLcvGraph(seo: { title: string; description: string; path: string }): JsonLd[] {
  const listId = `${canonicalUrlForPath(seo.path)}#itemlist`;
  const items = lightCommercialVehicles.map(modelToListItem);
  return [
    buildAutoDealerOrganization(),
    buildCollectionPage(seo, listId),
    buildItemList(listId, commercialCategories.find((c) => c.id === 'light')?.title || 'Light Commercial Vehicles', items),
    buildBreadcrumbList(
      [
        { name: 'Home', path: '/' },
        { name: 'Commercial Vehicles', path: '/commercial/' },
        { name: 'Light Commercial Vehicles', path: '/commercial/light/' },
      ],
      seo.path,
    ),
  ];
}

export function buildMhcvGraph(seo: { title: string; description: string; path: string }): JsonLd[] {
  const listId = `${canonicalUrlForPath(seo.path)}#itemlist`;
  const items = mediumHeavyCommercialVehicles.map(modelToListItem);
  return [
    buildAutoDealerOrganization(),
    buildCollectionPage(seo, listId),
    buildItemList(listId, 'Medium & Heavy Commercial Vehicles', items),
    buildBreadcrumbList(
      [
        { name: 'Home', path: '/' },
        { name: 'Commercial Vehicles', path: '/commercial/' },
        { name: 'Medium & Heavy Commercial Vehicles', path: '/commercial/medium-heavy/' },
      ],
      seo.path,
    ),
  ];
}

export function buildEvGraph(seo: { title: string; description: string; path: string }): JsonLd[] {
  const listId = `${canonicalUrlForPath(seo.path)}#itemlist`;
  const items = switchElectricVehicles.map(modelToListItem);
  return [
    buildAutoDealerOrganization(),
    buildCollectionPage(seo, listId),
    buildItemList(listId, 'Electric Mobility', items),
    buildBreadcrumbList(
      [
        { name: 'Home', path: '/' },
        { name: 'Electric Mobility', path: '/electric-mobility/' },
      ],
      seo.path,
    ),
  ];
}

export function buildServicesGraph(seo: { title: string; description: string; path: string }): JsonLd[] {
  return [
    buildAutoDealerOrganization(),
    buildServicePage(seo, 'Ashok Leyland Service Centre in Goa', 'Automotive service'),
    buildBreadcrumbList(
      [
        { name: 'Home', path: '/' },
        { name: 'Services', path: '/services/' },
      ],
      seo.path,
    ),
  ];
}

export function buildFinanceGraph(seo: { title: string; description: string; path: string }): JsonLd[] {
  return [
    buildAutoDealerOrganization(),
    buildServicePage(seo, 'Ashok Leyland Vehicle Finance in Goa', 'Vehicle financing assistance'),
    buildBreadcrumbList(
      [
        { name: 'Home', path: '/' },
        { name: 'Finance', path: '/finance/' },
      ],
      seo.path,
    ),
  ];
}

export function buildContactGraph(seo: { title: string; description: string; path: string }): JsonLd[] {
  return [
    buildAutoDealerOrganization(),
    buildLocalBusiness(),
    buildContactPage(seo),
    buildBreadcrumbList(
      [
        { name: 'Home', path: '/' },
        { name: 'Contact Us', path: '/contact/' },
      ],
      seo.path,
    ),
  ];
}

export function buildGreenTechGraph(seo: { title: string; description: string; path: string }): JsonLd[] {
  return [
    buildAutoDealerOrganization(),
    buildWebPage(seo),
    buildBreadcrumbList(
      [
        { name: 'Home', path: '/' },
        { name: 'Green Technologies', path: '/green-technologies/' },
      ],
      seo.path,
    ),
  ];
}

export function buildGenericPageGraph(seo: { title: string; description: string; path: string }): JsonLd[] {
  return [
    buildAutoDealerOrganization(),
    buildWebPage(seo),
    buildBreadcrumbList(
      [
        { name: 'Home', path: '/' },
        { name: seo.title.split('|')[0].trim(), path: seo.path },
      ],
      seo.path,
    ),
  ];
}

export function buildProductPageGraph(
  product: ProductPageData,
  listing?: CommercialVehicleModel | null,
): JsonLd[] {
  const path = product.seo?.canonicalPath || `/${product.id}/`;
  return [
    buildAutoDealerOrganization(),
    buildProductSchema(product, listing),
    buildBreadcrumbList(productBreadcrumbs(product), path),
  ];
}

export function wrapJsonLdGraph(graph: JsonLd[]): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@graph': graph,
  };
}

export function applyJsonLd(graph: JsonLd[]): void {
  if (typeof document === 'undefined') return;
  // Remove legacy contact-only schema node if present
  document.getElementById('contact-page-schema')?.remove();

  let node = document.getElementById(JSON_LD_SCRIPT_ID) as HTMLScriptElement | null;
  if (!node) {
    node = document.createElement('script');
    node.id = JSON_LD_SCRIPT_ID;
    node.type = 'application/ld+json';
    document.head.appendChild(node);
  }
  node.textContent = JSON.stringify(wrapJsonLdGraph(graph));
}

export function findListingModelBySlug(slug: string): CommercialVehicleModel | null {
  return (
    commercialModels.find((model) => model.slug === slug) ||
    switchElectricVehicles.find((model) => model.slug === slug) ||
    null
  );
}

export function isProductPath(pathname: string): boolean {
  const path = normalizeSeoPath(pathname);
  if (path === '/commercial/light/' || path === '/commercial/medium-heavy/' || path === '/electric-mobility/') {
    return false;
  }
  return (
    path.startsWith('/commercial/light/') ||
    path.startsWith('/commercial/medium-heavy/') ||
    path.startsWith('/electric-mobility/')
  );
}
