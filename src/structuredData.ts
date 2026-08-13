/**
 * Page-level JSON-LD routing for all public SEO routes (including products).
 * Shared AutoDealer/Organization is always injected via wrapJsonLdGraph.
 */

import { PRODUCT_PAGE_BY_SLUG } from './productPageData';
import { ALL_PAGE_SEO, normalizeSeoPath, type PageSeo } from './seo';
import {
  applyJsonLd,
  buildAboutGraph,
  buildCommercialGraph,
  buildContactGraph,
  buildEvGraph,
  buildFinanceGraph,
  buildGenericPageGraph,
  buildGreenTechGraph,
  buildHomeGraph,
  buildLcvGraph,
  buildMhcvGraph,
  buildProductPageGraph,
  buildServicesGraph,
  findListingModelBySlug,
  isProductPath,
  setAssetManifestForSchema,
  wrapJsonLdGraph,
  type JsonLd,
} from './schema';

export { setAssetManifestForSchema };
function seoOrFallback(pathname: string): PageSeo | null {
  return ALL_PAGE_SEO[normalizeSeoPath(pathname)] || null;
}

function slugFromProductPath(pathname: string): string | null {
  const path = normalizeSeoPath(pathname);
  if (!isProductPath(path)) return null;
  const parts = path.split('/').filter(Boolean);
  return parts[parts.length - 1] || null;
}

export function getJsonLdGraphForPath(pathname: string, seoOverride?: PageSeo | null): JsonLd[] | null {
  const path = normalizeSeoPath(pathname);
  const seo = seoOverride || seoOrFallback(path);

  if (isProductPath(path)) {
    const slug = slugFromProductPath(path);
    const product = slug ? PRODUCT_PAGE_BY_SLUG[slug] : null;
    if (!product) return null;
    return buildProductPageGraph(product, findListingModelBySlug(product.id));
  }

  if (!seo) return null;

  switch (path) {
    case '/':
      return buildHomeGraph(seo);
    case '/about/':
      return buildAboutGraph(seo);
    case '/commercial/':
      return buildCommercialGraph(seo);
    case '/commercial/light/':
      return buildLcvGraph(seo);
    case '/commercial/medium-heavy/':
      return buildMhcvGraph(seo);
    case '/electric-mobility/':
      return buildEvGraph(seo);
    case '/services/':
      return buildServicesGraph(seo);
    case '/finance/':
      return buildFinanceGraph(seo);
    case '/contact/':
      return buildContactGraph(seo);
    case '/green-technologies/':
      return buildGreenTechGraph(seo);
    default:
      return buildGenericPageGraph(seo);
  }
}

export function serializeJsonLdForPath(pathname: string, seoOverride?: PageSeo | null): string | null {
  const graph = getJsonLdGraphForPath(pathname, seoOverride);
  if (!graph) return null;
  return JSON.stringify(wrapJsonLdGraph(graph));
}

export function applyStructuredDataForPath(pathname: string): boolean {
  // Apply for all public SEO routes (including product pages) so the shared
  // AutoDealer/Organization entity is always present in the live document graph.
  const graph = getJsonLdGraphForPath(pathname);
  if (!graph) return false;
  applyJsonLd(graph);
  return true;
}

export function applyProductStructuredData(productId: string): boolean {
  const product = PRODUCT_PAGE_BY_SLUG[productId];
  if (!product) return false;
  applyJsonLd(buildProductPageGraph(product, findListingModelBySlug(product.id)));
  return true;
}
