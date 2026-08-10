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

function upsertMetaByName(name: string, content: string) {
  let element = document.querySelector<HTMLMetaElement>(`meta[name="${name}"]`);
  if (!element) {
    element = document.createElement('meta');
    element.name = name;
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
}

export function applyStaticSeoForPath(pathname: string): boolean {
  const key = normalizeSeoPath(pathname);
  const seo = STATIC_PAGE_SEO[key];
  if (!seo) return false;
  applyPageSeo(seo);
  return true;
}
