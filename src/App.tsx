/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import GeminiMotorsScreen from './components/GeminiMotorsScreen';
import EVScreen from './components/EVScreen';
import AutoServicesScreen from './components/AutoServicesScreen';
import GreenTechScreen from './components/GreenTechScreen';
import AboutUsScreen from './components/AboutUsScreen';
import ContactUsScreen from './components/ContactUsScreen';
import PrivacyPolicyScreen from './components/PrivacyPolicyScreen';
import TermsConditionsScreen from './components/TermsConditionsScreen';
import NotFoundScreen from './components/NotFoundScreen';
import ProductPageScreen from './components/ProductPageScreen';
import SparePartsScreen from './components/SparePartsScreen';
import CommercialVehiclesScreen from './components/commercial/CommercialVehiclesScreen';
import CommercialCategoryScreen from './components/commercial/CommercialCategoryScreen';
import WebsiteChatbot from './components/chat/WebsiteChatbot';
import { AppDivision } from './types';
import { applySeoForPath, normalizeSeoPath, notifyLocationChanged } from './seo';
import { applyStructuredDataForPath } from './structuredData';

const routeByDivision: Record<AppDivision, string> = {
  'gemini-motors': '/',
  commercial: '/commercial/',
  'commercial-light': '/commercial/light/',
  'commercial-medium-heavy': '/commercial/medium-heavy/',
  'product-page': '/commercial/light/gemini-l-series-25t/',
  'spare-parts': '/spare-parts/',
  ev: '/electric-mobility/',
  'auto-services': '/services/',
  'green-tech': '/green-technologies/',
  'about-us': '/about/',
  contact: '/contact/',
  'privacy-policy': '/privacy-policy/',
  'terms-and-conditions': '/terms-and-conditions/',
  'not-found': '/404/',
};

function getDivisionFromPath(pathname: string): AppDivision {
  const normalizedPath = pathname.endsWith('/') ? pathname : `${pathname}/`;

  if (normalizedPath === '/' || normalizedPath === '/index.html/') return 'gemini-motors';
  if (normalizedPath === '/finance/') return 'gemini-motors';
  if (normalizedPath === '/commercial/') return 'commercial';
  if (normalizedPath === '/commercial/light/') return 'commercial-light';
  if (normalizedPath === '/commercial/medium-heavy/') return 'commercial-medium-heavy';

  if (
    normalizedPath.startsWith('/commercial/light/') ||
    normalizedPath.startsWith('/commercial/medium-heavy/') ||
    normalizedPath.startsWith('/commercial/mhcv/')
  ) {
    return 'product-page';
  }

  if (normalizedPath === '/spare-parts/') return 'spare-parts';
  if (normalizedPath === '/electric-mobility/') return 'ev';
  if (normalizedPath.startsWith('/electric-mobility/')) return 'product-page';
  if (normalizedPath === '/services/') return 'auto-services';
  if (normalizedPath === '/green-technologies/') return 'green-tech';
  if (normalizedPath === '/about/') return 'about-us';
  if (normalizedPath === '/contact/') return 'contact';
  if (normalizedPath === '/privacy-policy/') return 'privacy-policy';
  if (normalizedPath === '/terms-and-conditions/') return 'terms-and-conditions';

  return 'not-found';
}

export default function App() {
  const [currentDivision, setCurrentDivision] = useState<AppDivision>(
    () => getDivisionFromPath(window.location.pathname)
  );

  useEffect(() => {
    const syncFromLocation = () => {
      const pathname = window.location.pathname;
      const division = getDivisionFromPath(pathname);
      setCurrentDivision(division);
      applySeoForPath(pathname);
      applyStructuredDataForPath(pathname);
    };

    window.addEventListener('popstate', syncFromLocation);
    window.addEventListener('geminimotors:locationchange', syncFromLocation);
    // Initial load (direct URL)
    applySeoForPath(window.location.pathname);
    applyStructuredDataForPath(window.location.pathname);
    return () => {
      window.removeEventListener('popstate', syncFromLocation);
      window.removeEventListener('geminimotors:locationchange', syncFromLocation);
    };
  }, []);

  const navigateToDivision = (division: AppDivision) => {
    const nextPath = routeByDivision[division];

    // Full document navigation so View Source / direct HTTP responses
    // serve the prerendered route HTML (not the previously loaded home shell).
    if (normalizeSeoPath(window.location.pathname) !== normalizeSeoPath(nextPath)) {
      window.location.assign(nextPath);
      return;
    }

    setCurrentDivision(division);
    applySeoForPath(nextPath);
    applyStructuredDataForPath(nextPath);
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const navigateToProductRoute = (route: string) => {
    const nextPath = normalizeSeoPath(route);

    if (normalizeSeoPath(window.location.pathname) !== nextPath) {
      window.location.assign(nextPath);
      return;
    }

    setCurrentDivision('product-page');
    applySeoForPath(nextPath);
    notifyLocationChanged();
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  // Opens the React Contact page instead of the old LCV landing page
  const handleContactOpen = (subject?: string) => {
    void subject;
    navigateToDivision('contact');
  };

  return (
    <div className="min-h-screen bg-[#f8f9ff] text-[#0b1c30] font-sans flex flex-col justify-between selection:bg-blue-100 selection:text-blue-900">

      <Header
        currentDivision={currentDivision}
        setDivision={navigateToDivision}
      />

      <main className="flex-grow">

        {currentDivision === 'gemini-motors' && (
          <GeminiMotorsScreen onContactClick={handleContactOpen} />
        )}

        {currentDivision === 'product-page' && (
          <ProductPageScreen onContactClick={handleContactOpen} />
        )}

        {currentDivision === 'commercial' && (
          <CommercialVehiclesScreen onNavigate={navigateToDivision} />
        )}

        {currentDivision === 'commercial-light' && (
          <CommercialCategoryScreen
            categoryId="light"
            onNavigate={navigateToDivision}
            onViewProduct={navigateToProductRoute}
          />
        )}

        {currentDivision === 'commercial-medium-heavy' && (
          <CommercialCategoryScreen
            categoryId="medium-heavy"
            onNavigate={navigateToDivision}
            onViewProduct={navigateToProductRoute}
          />
        )}

        {currentDivision === 'ev' && (
          <EVScreen onContactClick={handleContactOpen} onViewProduct={navigateToProductRoute} />
        )}

        {currentDivision === 'auto-services' && (
          <AutoServicesScreen onContactClick={handleContactOpen} />
        )}

        {currentDivision === 'green-tech' && (
          <GreenTechScreen onContactClick={handleContactOpen} />
        )}

        {currentDivision === 'about-us' && (
          <AboutUsScreen onContactClick={handleContactOpen} />
        )}

        {currentDivision === 'contact' && (
          <ContactUsScreen
            onContactClick={handleContactOpen}
            onNavigateHome={() => navigateToDivision('gemini-motors')}
          />
        )}

        {currentDivision === 'privacy-policy' && <PrivacyPolicyScreen />}

        {currentDivision === 'terms-and-conditions' && <TermsConditionsScreen />}

        {currentDivision === 'not-found' && (
          <NotFoundScreen
            onNavigateHome={() => navigateToDivision('gemini-motors')}
          />
        )}

      </main>

      <Footer
        setDivision={navigateToDivision}
      />

      <WebsiteChatbot />

    </div>
  );
}