/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from 'react';
import { PRODUCT_PAGE_BY_SLUG } from '../productPageData';
import NotFoundScreen from './NotFoundScreen';
import ProductPageTemplate from './product/ProductPageTemplate';

interface ProductPageScreenProps {
  onContactClick: (prefilledSubject?: string) => void;
}

export default function ProductPageScreen({ onContactClick }: ProductPageScreenProps) {
  const [pathname, setPathname] = useState(() => window.location.pathname);

  useEffect(() => {
    const handlePopState = () => setPathname(window.location.pathname);

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const slug = pathname.split('/').filter(Boolean).at(-1) || '';
  const product = PRODUCT_PAGE_BY_SLUG[slug];

  if (!product) {
    return <NotFoundScreen onNavigateHome={() => (window.location.href = '/')} />;
  }

  return <ProductPageTemplate product={product} onContactClick={onContactClick} />;
}
