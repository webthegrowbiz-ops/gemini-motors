/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from 'react';
import type { ProductPageData, ProductSpec } from '../types';
import { PRODUCT_PAGE_BY_SLUG } from '../productPageData';
import NotFoundScreen from './NotFoundScreen';
import ProductPageTemplate from './product/ProductPageTemplate';

interface ProductPageScreenProps {
  onContactClick: (prefilledSubject?: string) => void;
}

function stripVehiclePriceText(value: string): string {
  return value
    .replace(/,?\s*starting\s+₹\s*[\d,.]+\s*L\*?\s*onwards\.?/gi, '')
    .replace(/\s*pricing\s+is\s+available\s+on\s+request\.?/gi, '')
    .replace(/\s*price\s*:\s*on\s+request\.?/gi, '')
    .replace(/\s{2,}/g, ' ')
    .replace(/\s+\./g, '.')
    .trim();
}

function isPriceSpec(spec: ProductSpec): boolean {
  return /\bprice\b/i.test(spec.label) || /₹\s*[\d]/.test(spec.value);
}

function sanitizeSpecs(specs: ProductSpec[]): ProductSpec[] {
  return specs.filter((spec) => !isPriceSpec(spec));
}

function sanitizeProductForPublic(product: ProductPageData): ProductPageData {
  return {
    ...product,
    tagline: stripVehiclePriceText(product.tagline),
    description: stripVehiclePriceText(product.description),
    seo: product.seo
      ? {
          ...product.seo,
          description: stripVehiclePriceText(product.seo.description),
          openGraph: product.seo.openGraph
            ? { ...product.seo.openGraph, description: stripVehiclePriceText(product.seo.openGraph.description) }
            : undefined,
          twitter: product.seo.twitter
            ? { ...product.seo.twitter, description: stripVehiclePriceText(product.seo.twitter.description) }
            : undefined,
          structuredProductSchema: product.seo.structuredProductSchema
            ? {
                ...product.seo.structuredProductSchema,
                description: stripVehiclePriceText(product.seo.structuredProductSchema.description),
              }
            : undefined,
        }
      : undefined,
    quickSpecs: sanitizeSpecs(product.quickSpecs),
    overview: {
      ...product.overview,
      body: stripVehiclePriceText(product.overview.body),
      trustIndicators: sanitizeSpecs(product.overview.trustIndicators),
    },
    finance: {
      ...product.finance,
      description: stripVehiclePriceText(product.finance.description),
    },
    features: product.features.map((feature) => ({
      ...feature,
      description: stripVehiclePriceText(feature.description),
    })),
    variants: product.variants.map((variant) => ({
      ...variant,
      description: stripVehiclePriceText(variant.description),
      bestFor: stripVehiclePriceText(variant.bestFor),
      specs: sanitizeSpecs(variant.specs),
    })),
    applications: product.applications.map((application) => ({
      ...application,
      description: stripVehiclePriceText(application.description),
    })),
    specifications: product.specifications
      .map((group) => ({ ...group, rows: sanitizeSpecs(group.rows) }))
      .filter((group) => group.rows.length > 0),
    whyGemini: {
      ...product.whyGemini,
      description: stripVehiclePriceText(product.whyGemini.description),
      stats: sanitizeSpecs(product.whyGemini.stats),
    },
    relatedProducts: product.relatedProducts.map((item) => ({
      ...item,
      description: stripVehiclePriceText(item.description),
    })),
    enquiry: {
      ...product.enquiry,
      description: stripVehiclePriceText(product.enquiry.description),
    },
  };
}

export default function ProductPageScreen({ onContactClick }: ProductPageScreenProps) {
  const [pathname, setPathname] = useState(() => window.location.pathname);

  useEffect(() => {
    const syncPath = () => setPathname(window.location.pathname);

    window.addEventListener('popstate', syncPath);
    window.addEventListener('geminimotors:locationchange', syncPath);
    return () => {
      window.removeEventListener('popstate', syncPath);
      window.removeEventListener('geminimotors:locationchange', syncPath);
    };
  }, []);

  const slug = pathname.split('/').filter(Boolean).at(-1) || '';
  const product = PRODUCT_PAGE_BY_SLUG[slug];
  const publicProduct = product ? sanitizeProductForPublic(product) : null;

  if (!publicProduct) {
    return <NotFoundScreen onNavigateHome={() => (window.location.href = '/')} />;
  }

  return <ProductPageTemplate product={publicProduct} onContactClick={onContactClick} />;
}
