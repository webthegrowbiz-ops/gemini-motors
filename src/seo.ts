/**
 * Site SEO helpers — titles, descriptions, and canonicals from Gemini Motors SEO docs.
 */

export const SITE_ORIGIN = 'https://geminimotorsgoa.in';

export type PageSeo = {
  title: string;
  description: string;
  /** Path including leading and trailing slash, e.g. `/about/` */
  path: string;
};

/** Division / listing pages from SEO Metadata + Canonical Tags docs. */
export const STATIC_PAGE_SEO: Record<string, PageSeo> = {
  '/': {
    title: 'Authorised Ashok Leyland Dealer in Goa | Gemini Motors',
    description:
      'Gemini Motors is a trusted authorised Ashok Leyland dealer in Goa offering commercial vehicles, trucks, EVs, finance and service support.',
    path: '/',
  },
  '/about/': {
    title: 'About Gemini Motors | Ashok Leyland Dealer in Goa',
    description:
      'Learn about Gemini Motors, a trusted Ashok Leyland dealer in Goa offering commercial vehicles, customer support, finance and after-sales service.',
    path: '/about/',
  },
  '/commercial/': {
    title: 'Ashok Leyland Commercial Vehicles in Goa | Gemini',
    description:
      'Explore Ashok Leyland commercial vehicles at Gemini Motors, a trusted dealer in Goa offering solutions for transport and business needs.',
    path: '/commercial/',
  },
  '/commercial/light/': {
    title: 'Ashok Leyland LCVs in Goa | Gemini Motors Dealer',
    description:
      'Explore Ashok Leyland light commercial vehicles in Goa at Gemini Motors, with expert guidance, finance assistance and after-sales support.',
    path: '/commercial/light/',
  },
  '/commercial/medium-heavy/': {
    title: 'Ashok Leyland Trucks in Goa | Gemini Motors Dealer',
    description:
      'Find Ashok Leyland medium and heavy-duty trucks in Goa at Gemini Motors for logistics, construction, transport and demanding applications.',
    path: '/commercial/medium-heavy/',
  },
  '/electric-mobility/': {
    title: 'Ashok Leyland Electric Vehicles in Goa | Gemini',
    description:
      'Explore electric commercial vehicles from Ashok Leyland in Goa at Gemini Motors, with guidance on models, finance and sustainable mobility.',
    path: '/electric-mobility/',
  },
  '/services/': {
    title: 'Ashok Leyland Service Centre in Goa | Gemini Motors',
    description:
      'Visit Gemini Motors for authorised Ashok Leyland service in Goa, including maintenance, repairs, diagnostics and genuine spare parts support.',
    path: '/services/',
  },
  '/finance/': {
    title: 'Ashok Leyland Vehicle Finance in Goa | Gemini Motors',
    description:
      'Get finance assistance for Ashok Leyland commercial vehicles in Goa through Gemini Motors with guidance on suitable funding options.',
    path: '/finance/',
  },
  '/contact/': {
    title: 'Contact Ashok Leyland Dealer in Goa | Gemini Motors',
    description:
      'Contact Gemini Motors, an authorised Ashok Leyland dealer in Goa, for vehicle enquiries, test drives, finance and service assistance.',
    path: '/contact/',
  },
  '/green-technologies/': {
    title: 'Ashok Leyland Green Technologies in Goa | Gemini',
    description:
      'Discover Ashok Leyland green technologies in Goa at Gemini Motors, supporting cleaner mobility, efficient transport and sustainable solutions.',
    path: '/green-technologies/',
  },
  '/privacy-policy/': {
    title: 'Privacy Policy | Gemini Motors Goa',
    description:
      'Read how Gemini Motors handles personal information collected through website enquiries, phone, WhatsApp, chatbot and analytics tools.',
    path: '/privacy-policy/',
  },
};

/** Product pages from SEO Metadata + Canonical Tags docs. */
export const PRODUCT_PAGE_SEO: Record<string, PageSeo> = {
  '/commercial/light/gemini-l-series-25t/': {
    title: 'Gemini L Series 2.5T in Goa | Ashok Leyland Dealer',
    description:
      'Explore the Gemini L Series 2.5T at Gemini Motors, an Ashok Leyland dealer in Goa offering vehicle guidance, finance and sales support.',
    path: '/commercial/light/gemini-l-series-25t/',
  },
  '/commercial/light/dost-plus-xl/': {
    title: 'Ashok Leyland Dost Plus XL in Goa | Gemini',
    description:
      'Explore the Ashok Leyland Dost Plus XL at Gemini Motors, your local dealer in Goa for vehicle enquiries, finance assistance and support.',
    path: '/commercial/light/dost-plus-xl/',
  },
  '/commercial/light/dost-xl/': {
    title: 'Ashok Leyland Dost XL in Goa | Gemini Motors Dealer',
    description:
      'Find the Ashok Leyland Dost XL at Gemini Motors in Goa with expert guidance, finance assistance and support for your business needs.',
    path: '/commercial/light/dost-xl/',
  },
  '/commercial/light/saathi/': {
    title: 'Ashok Leyland Saathi in Goa | Gemini Motors',
    description:
      'Discover the Ashok Leyland Saathi at Gemini Motors, a trusted dealer in Goa offering vehicle guidance, finance options and customer support.',
    path: '/commercial/light/saathi/',
  },
  '/commercial/light/partner-municipal/': {
    title: 'Ashok Leyland Partner Municipal in Goa | Gemini',
    description:
      'Explore the Ashok Leyland Partner Municipal at Gemini Motors in Goa, with solutions and support for municipal and waste management operations.',
    path: '/commercial/light/partner-municipal/',
  },
  '/commercial/light/partner-4-tyre/': {
    title: 'Ashok Leyland Partner 4 Tyre in Goa | Gemini',
    description:
      'Find the Ashok Leyland Partner 4 Tyre at Gemini Motors, a trusted dealer in Goa offering commercial vehicle sales and support.',
    path: '/commercial/light/partner-4-tyre/',
  },
  '/commercial/light/bada-dost-i6/': {
    title: 'Ashok Leyland Bada Dost i6 in Goa | Gemini',
    description:
      'Explore the Ashok Leyland Bada Dost i6 at Gemini Motors, an authorised dealer in Goa offering sales guidance and finance assistance.',
    path: '/commercial/light/bada-dost-i6/',
  },
  '/commercial/light/bada-dost-i5/': {
    title: 'Ashok Leyland Bada Dost i5 in Goa | Gemini',
    description:
      'Discover the Ashok Leyland Bada Dost i5 at Gemini Motors in Goa with expert vehicle guidance, finance assistance and dealer support.',
    path: '/commercial/light/bada-dost-i5/',
  },
  '/commercial/light/bada-dost-i5-plus/': {
    title: 'Ashok Leyland Bada Dost i5 Plus in Goa | Gemini',
    description:
      'Explore the Ashok Leyland Bada Dost i5 Plus at Gemini Motors, a trusted Goa dealer offering sales guidance, finance and customer support.',
    path: '/commercial/light/bada-dost-i5-plus/',
  },
  '/commercial/medium-heavy/avtr-4525h-dtla/': {
    title: 'Ashok Leyland AVTR 4525H DTLA in Goa | Gemini',
    description:
      'Explore the Ashok Leyland AVTR 4525H DTLA at Gemini Motors in Goa for heavy-duty transport, with expert sales and finance assistance.',
    path: '/commercial/medium-heavy/avtr-4525h-dtla/',
  },
  '/commercial/medium-heavy/8x4-tipper/': {
    title: 'Ashok Leyland 8x4 Tipper in Goa | Gemini Motors',
    description:
      'Find the Ashok Leyland 8x4 Tipper at Gemini Motors, a trusted Goa dealer serving construction, mining and infrastructure requirements.',
    path: '/commercial/medium-heavy/8x4-tipper/',
  },
  '/commercial/medium-heavy/avtr-4625h-la/': {
    title: 'Ashok Leyland AVTR 4625H LA in Goa | Gemini',
    description:
      'Explore the Ashok Leyland AVTR 4625H LA at Gemini Motors in Goa with expert assistance for heavy-duty transport and business needs.',
    path: '/commercial/medium-heavy/avtr-4625h-la/',
  },
  '/commercial/medium-heavy/avtr-4925h-dtla/': {
    title: 'AVTR 4925H DTLA | Medium & Heavy Commercial Vehicle | Gemini Motors',
    description:
      'Explore the Ashok Leyland AVTR 4925H DTLA with 49T GVW, 184 kW H Series power, rear air suspension, cabin options and enquiry support from Gemini Motors.',
    path: '/commercial/medium-heavy/avtr-4925h-dtla/',
  },
  '/commercial/medium-heavy/avtr-10x2/': {
    title: 'AVTR 10X2 | Medium & Heavy Commercial Vehicle | Gemini Motors',
    description:
      'Explore the Ashok Leyland AVTR 10X2 haulage truck with 42–48T GVW, H Series BS-VI i-Gen6 power, cabin options and enquiry support from Gemini Motors.',
    path: '/commercial/medium-heavy/avtr-10x2/',
  },
  '/commercial/medium-heavy/10x4-tipper/': {
    title: '10X4 Tipper | Medium & Heavy Commercial Vehicle | Gemini Motors',
    description:
      'Explore the Ashok Leyland 10X4 Tipper with 48T GVW, 184 kW H Series power, 18–29 CBM load body options and enquiry support from Gemini Motors.',
    path: '/commercial/medium-heavy/10x4-tipper/',
  },
  '/commercial/medium-heavy/transit-mixer/': {
    title: 'Ashok Leyland Transit Mixers in Goa | Gemini',
    description:
      'Explore the Ashok Leyland Transit Mixers at Gemini Motors in Goa, starting ₹ 51 L* onwards. Enquire for sales, finance and support.',
    path: '/commercial/medium-heavy/transit-mixer/',
  },
  '/commercial/medium-heavy/6x4-tractor/': {
    title: '6X4 Tractor | Medium & Heavy Commercial Vehicle | Gemini Motors',
    description:
      'Explore the Ashok Leyland 6X4 Tractor with 55T GCW, H6 6L 184 kW power, cabin options and enquiry support from Gemini Motors.',
    path: '/commercial/medium-heavy/6x4-tractor/',
  },
  '/commercial/light/dost-plus-xl-cng/': {
    title: 'Ashok Leyland DOST + XL CNG in Goa | Gemini',
    description:
      'Explore the Ashok Leyland DOST + XL CNG at Gemini Motors in Goa, starting ₹ 8.65 L* onwards. Enquire for sales, finance and support.',
    path: '/commercial/light/dost-plus-xl-cng/',
  },
  '/commercial/light/bada-dost-i3-plus-with-lnt/': {
    title: 'Ashok Leyland BADA DOST i3+ with LNT in Goa | Gemini',
    description:
      'Explore the Ashok Leyland BADA DOST i3+ with LNT at Gemini Motors in Goa, starting ₹ 9.80 L* onwards. Enquire for sales, finance and support.',
    path: '/commercial/light/bada-dost-i3-plus-with-lnt/',
  },
  '/commercial/light/dost-plus-xl-twin-fuel/': {
    title: 'Ashok Leyland DOST + XL Twin Fuel in Goa | Gemini',
    description:
      'Explore the Ashok Leyland DOST + XL Twin Fuel at Gemini Motors in Goa, starting ₹ 8.75 L* onwards. Enquire for sales, finance and support.',
    path: '/commercial/light/dost-plus-xl-twin-fuel/',
  },
  '/commercial/light/dost-twin-fuel/': {
    title: 'Ashok Leyland DOST Twin Fuel in Goa | Gemini',
    description:
      'Explore the Ashok Leyland DOST Twin Fuel at Gemini Motors in Goa, starting ₹ 8.20 L* onwards. Enquire for sales, finance and support.',
    path: '/commercial/light/dost-twin-fuel/',
  },
  '/commercial/light/bada-dost-i3-plus-xl/': {
    title: 'Ashok Leyland Bada Dost i3+XL in Goa | Gemini',
    description:
      'Explore the Ashok Leyland Bada Dost i3+XL at Gemini Motors in Goa, starting ₹ 10.10 L* onwards. Enquire for sales, finance and support.',
    path: '/commercial/light/bada-dost-i3-plus-xl/',
  },
  '/commercial/light/bada-dost-i3-plus/': {
    title: 'Ashok Leyland BADA DOST i3+ in Goa | Gemini',
    description:
      'Explore the Ashok Leyland BADA DOST i3+ at Gemini Motors in Goa, starting ₹ 9.80 L* onwards. Enquire for sales, finance and support.',
    path: '/commercial/light/bada-dost-i3-plus/',
  },
  '/commercial/light/bada-dost-i5-xl/': {
    title: 'Ashok Leyland Bada Dost i5 XL in Goa | Gemini',
    description:
      'Explore the Ashok Leyland Bada Dost i5 XL at Gemini Motors in Goa, starting ₹ 10.22 L* onwards. Enquire for sales, finance and support.',
    path: '/commercial/light/bada-dost-i5-xl/',
  },
  '/commercial/light/bada-dost-i4/': {
    title: 'Ashok Leyland BADA DOST i4 in Goa | Gemini',
    description:
      'Explore the Ashok Leyland BADA DOST i4 at Gemini Motors in Goa, starting ₹ 9.80 L* onwards. Enquire for sales, finance and support.',
    path: '/commercial/light/bada-dost-i4/',
  },
  '/commercial/light/bada-dost-cng/': {
    title: 'Ashok Leyland BADA DOST CNG in Goa | Gemini',
    description:
      'Explore the Ashok Leyland BADA DOST CNG at Gemini Motors in Goa, starting ₹ 9.00 L* onwards. Enquire for sales, finance and support.',
    path: '/commercial/light/bada-dost-cng/',
  },
  '/commercial/light/dost-cng/': {
    title: 'Ashok Leyland DOST CNG in Goa | Gemini',
    description:
      'Explore the Ashok Leyland DOST CNG at Gemini Motors in Goa, starting ₹ 8.15 L* onwards. Enquire for sales, finance and support.',
    path: '/commercial/light/dost-cng/',
  },
  '/commercial/light/bada-dost-i2/': {
    title: 'Ashok Leyland BADA DOST i2 in Goa | Gemini',
    description:
      'Explore the Ashok Leyland BADA DOST i2 at Gemini Motors in Goa, starting ₹ 8.85 L* onwards. Enquire for sales, finance and support.',
    path: '/commercial/light/bada-dost-i2/',
  },
  '/commercial/light/partner-6-tyre/': {
    title: 'Ashok Leyland Partner 6 Tyre in Goa | Gemini',
    description:
      'Explore the Ashok Leyland Partner 6 Tyre at Gemini Motors in Goa, starting ₹ 16.18 L* onwards. Enquire for sales, finance and support.',
    path: '/commercial/light/partner-6-tyre/',
  },
  '/commercial/light/mitr-ambulance/': {
    title: 'Ashok Leyland MiTR Ambulance in Goa | Gemini',
    description:
      'Explore the Ashok Leyland MiTR Ambulance at Gemini Motors in Goa. Enquire for LCV passenger vehicle guidance, sales and support.',
    path: '/commercial/light/mitr-ambulance/',
  },
  '/commercial/light/mitr-staff-bus/': {
    title: 'Ashok Leyland MiTR Staff Bus in Goa | Gemini',
    description:
      'Explore the Ashok Leyland MiTR Staff Bus at Gemini Motors in Goa, starting ₹ 25.19 L* onwards. Enquire for sales, finance and support.',
    path: '/commercial/light/mitr-staff-bus/',
  },
  '/commercial/light/mitr-school-bus/': {
    title: 'Ashok Leyland MiTR School Bus in Goa | Gemini',
    description:
      'Explore the Ashok Leyland MiTR School Bus at Gemini Motors in Goa, starting ₹ 22.32 L* onwards. Enquire for sales, finance and support.',
    path: '/commercial/light/mitr-school-bus/',
  },
  '/commercial/medium-heavy/10x2-tipper/': {
    title: 'Ashok Leyland 10x2 Tipper in Goa | Gemini',
    description:
      'Explore the Ashok Leyland 10x2 Tipper at Gemini Motors in Goa, starting ₹ 58 L* onwards. Enquire for sales, finance and support.',
    path: '/commercial/medium-heavy/10x2-tipper/',
  },
  '/commercial/medium-heavy/boom-pump/': {
    title: 'Ashok Leyland Boom Pump in Goa | Gemini',
    description:
      'Explore the Ashok Leyland Boom Pump at Gemini Motors in Goa, starting ₹ 41 L* onwards. Enquire for sales, finance and support.',
    path: '/commercial/medium-heavy/boom-pump/',
  },
  '/commercial/medium-heavy/4x2-with-3-axle-trailer/': {
    title: 'Ashok Leyland 4X2 with 3-axle Trailer in Goa | Gemini',
    description:
      'Explore the Ashok Leyland 4X2 with 3-axle Trailer at Gemini Motors in Goa, starting ₹ 33.50 L* onwards. Enquire for sales, finance and support.',
    path: '/commercial/medium-heavy/4x2-with-3-axle-trailer/',
  },
  '/commercial/medium-heavy/4x2-with-2-axle-trailer/': {
    title: 'Ashok Leyland 4X2 with 2-axle Trailer in Goa | Gemini',
    description:
      'Explore the Ashok Leyland 4X2 with 2-axle Trailer at Gemini Motors in Goa, starting ₹ 32.40 L* onwards. Enquire for sales, finance and support.',
    path: '/commercial/medium-heavy/4x2-with-2-axle-trailer/',
  },
  '/commercial/medium-heavy/10x2-gvw-48t/': {
    title: 'Ashok Leyland 10X2 (GVW : 48T) in Goa | Gemini',
    description:
      'Explore the Ashok Leyland 10X2 (GVW : 48T) at Gemini Motors in Goa, starting ₹ 43.75 L* onwards. Enquire for sales, finance and support.',
    path: '/commercial/medium-heavy/10x2-gvw-48t/',
  },
  '/commercial/medium-heavy/8x2-gvw-35t/': {
    title: 'Ashok Leyland 8X2 (GVW : 35T) in Goa | Gemini',
    description:
      'Explore the Ashok Leyland 8X2 (GVW : 35T) at Gemini Motors in Goa, starting ₹ 40 L* onwards. Enquire for sales, finance and support.',
    path: '/commercial/medium-heavy/8x2-gvw-35t/',
  },
  '/commercial/medium-heavy/6x2-gvw-26t-31t/': {
    title: 'Ashok Leyland 6X2 (GVW : 26T - 31T) in Goa | Gemini',
    description:
      'Explore the Ashok Leyland 6X2 (GVW : 26T - 31T) at Gemini Motors in Goa, starting ₹ 33.20 L* onwards. Enquire for sales, finance and support.',
    path: '/commercial/medium-heavy/6x2-gvw-26t-31t/',
  },
  '/commercial/medium-heavy/4x2-gvw-19t/': {
    title: 'Ashok Leyland 4x2 (GVW : 19T) in Goa | Gemini',
    description:
      'Explore the Ashok Leyland 4x2 (GVW : 19T) at Gemini Motors in Goa, starting ₹ 25.50 L* onwards. Enquire for sales, finance and support.',
    path: '/commercial/medium-heavy/4x2-gvw-19t/',
  },
  '/commercial/medium-heavy/boss-1115-he/': {
    title: 'Ashok Leyland BOSS 1115 HE in Goa | Gemini',
    description:
      'Explore the Ashok Leyland BOSS 1115 HE at Gemini Motors in Goa, starting ₹ 22 L* onwards. Enquire for sales, finance and support.',
    path: '/commercial/medium-heavy/boss-1115-he/',
  },
  '/commercial/medium-heavy/partner-super/': {
    title: 'Ashok Leyland Partner Super in Goa | Gemini',
    description:
      'Explore the Ashok Leyland Partner Super at Gemini Motors in Goa, starting ₹ 19.50 L* onwards. Enquire for sales, finance and support.',
    path: '/commercial/medium-heavy/partner-super/',
  },
  '/commercial/medium-heavy/ecomet-star/': {
    title: 'Ashok Leyland ecomet STAR in Goa | Gemini',
    description:
      'Explore the Ashok Leyland ecomet STAR at Gemini Motors in Goa, starting ₹ 21.50 L* onwards. Enquire for sales, finance and support.',
    path: '/commercial/medium-heavy/ecomet-star/',
  },
  '/commercial/medium-heavy/boss/': {
    title: 'Ashok Leyland BOSS in Goa | Gemini',
    description:
      'Explore the Ashok Leyland BOSS at Gemini Motors in Goa, starting ₹ 22 L* onwards. Enquire for sales, finance and support.',
    path: '/commercial/medium-heavy/boss/',
  },
  '/commercial/medium-heavy/icv-tippers/': {
    title: 'Ashok Leyland ICV Tippers in Goa | Gemini',
    description:
      'Explore the Ashok Leyland ICV Tippers at Gemini Motors in Goa, starting ₹ 23 L* onwards. Enquire for sales, finance and support.',
    path: '/commercial/medium-heavy/icv-tippers/',
  },
  '/electric-mobility/switch-iev4/': {
    title: 'SWITCH IeV4 Electric Vehicle in Goa | Gemini',
    description:
      'Discover the SWITCH IeV4 at Gemini Motors, a trusted electric commercial vehicle dealer in Goa offering sales and expert assistance.',
    path: '/electric-mobility/switch-iev4/',
  },
  '/electric-mobility/switch-iev4-garbage-tipper/': {
    title: 'SWITCH IeV4 Garbage Tipper in Goa | Gemini',
    description:
      'Explore the SWITCH IeV4 Garbage Tipper at Gemini Motors, serving Goa with electric waste management vehicle solutions and dealer support.',
    path: '/electric-mobility/switch-iev4-garbage-tipper/',
  },
  '/electric-mobility/switch-iev3/': {
    title: 'SWITCH IeV3 Electric Vehicle in Goa | Gemini Motors',
    description:
      'Explore the SWITCH IeV3 at Gemini Motors, an electric commercial vehicle dealer in Goa offering sales guidance and support for businesses.',
    path: '/electric-mobility/switch-iev3/',
  },
};

export const ALL_PAGE_SEO: Record<string, PageSeo> = {
  ...STATIC_PAGE_SEO,
  ...PRODUCT_PAGE_SEO,
};

export function normalizeSeoPath(pathname: string): string {
  if (!pathname || pathname === '/') return '/';
  const withLeading = pathname.startsWith('/') ? pathname : `/${pathname}`;
  return withLeading.endsWith('/') ? withLeading : `${withLeading}/`;
}

export function canonicalUrlForPath(path: string): string {
  const normalized = normalizeSeoPath(path);
  if (normalized === '/') return `${SITE_ORIGIN}/`;
  return `${SITE_ORIGIN}${normalized}`;
}

export function getSeoForPath(pathname: string): PageSeo | null {
  return ALL_PAGE_SEO[normalizeSeoPath(pathname)] || null;
}

export function getProductSeoBySlug(slug: string): PageSeo | null {
  const match = Object.values(PRODUCT_PAGE_SEO).find((entry) => {
    const parts = entry.path.split('/').filter(Boolean);
    return parts[parts.length - 1] === slug;
  });
  return match || null;
}

function upsertMetaByName(name: string, content: string) {
  let element = document.querySelector<HTMLMetaElement>(`meta[name="${name}"]`);
  if (!element) {
    element = document.createElement('meta');
    element.name = name;
    document.head.appendChild(element);
  }
  element.content = content;
}

function upsertMetaByProperty(property: string, content: string) {
  let element = document.querySelector<HTMLMetaElement>(`meta[property="${property}"]`);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute('property', property);
    document.head.appendChild(element);
  }
  element.content = content;
}

/** Ensures exactly one rel=canonical link with the production absolute URL. */
export function upsertCanonical(path: string) {
  const href = canonicalUrlForPath(path);
  const existing = Array.from(document.querySelectorAll<HTMLLinkElement>('link[rel="canonical"]'));
  const primary = existing[0] || document.createElement('link');
  primary.rel = 'canonical';
  primary.href = href;
  if (!primary.parentElement) {
    document.head.appendChild(primary);
  }
  for (let i = 1; i < existing.length; i += 1) {
    existing[i].remove();
  }
}

export function applyPageSeo(seo: Pick<PageSeo, 'title' | 'description' | 'path'>) {
  document.title = seo.title;
  upsertMetaByName('description', seo.description);
  upsertCanonical(seo.path);
  upsertMetaByProperty('og:title', seo.title);
  upsertMetaByProperty('og:description', seo.description);
  upsertMetaByProperty('og:url', canonicalUrlForPath(seo.path));
}

export function applySeoForPath(pathname: string): boolean {
  const seo = getSeoForPath(pathname);
  if (!seo) return false;
  applyPageSeo(seo);
  return true;
}

/** @deprecated Prefer applySeoForPath — kept for existing imports. */
export function applyStaticSeoForPath(pathname: string): boolean {
  return applySeoForPath(pathname);
}

/** Notify SPA listeners after history.pushState (pushState does not fire popstate). */
export function notifyLocationChanged() {
  window.dispatchEvent(new Event('geminimotors:locationchange'));
}
