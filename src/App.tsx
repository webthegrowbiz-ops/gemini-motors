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
import NotFoundScreen from './components/NotFoundScreen';
import ProductPageScreen from './components/ProductPageScreen';
import CommercialVehiclesScreen from './components/commercial/CommercialVehiclesScreen';
import CommercialCategoryScreen from './components/commercial/CommercialCategoryScreen';
import { AppDivision } from './types';

const routeByDivision: Record<AppDivision, string> = {
  'gemini-motors': '/',
  commercial: '/commercial/',
  'commercial-light': '/commercial/light/',
  'commercial-medium-heavy': '/commercial/medium-heavy/',
  'product-page': '/commercial/light/gemini-l-series-25t',
  ev: '/electric-mobility/',
  'auto-services': '/services/',
  'green-tech': '/green-technologies/',
  'about-us': '/about/',
  contact: '/contact/',
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
  if (normalizedPath === '/electric-mobility/') return 'ev';
  if (normalizedPath === '/services/') return 'auto-services';
  if (normalizedPath === '/green-technologies/') return 'green-tech';
  if (normalizedPath === '/about/') return 'about-us';
  if (normalizedPath === '/contact/') return 'contact';

  return 'not-found';
}

export default function App() {
  const [currentDivision, setCurrentDivision] = useState<AppDivision>(() => getDivisionFromPath(window.location.pathname));

  useEffect(() => {
    if (window.location.pathname === '/lcv' || window.location.pathname === '/lcv/') {
      window.location.replace('/lcv/index.html');
    }
  }, []);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentDivision(getDivisionFromPath(window.location.pathname));
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateToDivision = (division: AppDivision) => {
    setCurrentDivision(division);
    const nextPath = routeByDivision[division];
    if (window.location.pathname !== nextPath) {
      window.history.pushState(null, '', nextPath);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToProductRoute = (route: string) => {
    setCurrentDivision('product-page');
    if (window.location.pathname !== route) {
      window.history.pushState(null, '', route);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleContactOpen = (subject?: string) => {
    void subject;
    window.location.href = '/lcv/index.html';
  };

  return (
    <div className="min-h-screen bg-[#f8f9ff] text-[#0b1c30] font-sans flex flex-col justify-between selection:bg-blue-100 selection:text-blue-900">
      
      {/* Header section */}
      <Header 
        currentDivision={currentDivision} 
        setDivision={navigateToDivision} 
      />

      {/* Main interactive screen contents based on active division tab */}
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
          <EVScreen onContactClick={handleContactOpen} />
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

        {currentDivision === 'not-found' && (
          <NotFoundScreen onNavigateHome={() => navigateToDivision('gemini-motors')} />
        )}
      </main>

      {/* Corporate footer */}
      <Footer 
        setDivision={navigateToDivision} 
      />

    </div>
  );
}
