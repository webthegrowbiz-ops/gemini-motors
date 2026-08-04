/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type AppDivision =
  | 'gemini-motors'
  | 'commercial'
  | 'commercial-light'
  | 'commercial-medium-heavy'
  | 'product-page'
  | 'ev'
  | 'auto-services'
  | 'green-tech'
  | 'about-us'
  | 'contact'
  | 'not-found';

export interface ProductSpec {
  label: string;
  value: string;
  helper?: string;
}

export interface ProductFeature {
  title: string;
  description: string;
  iconName: string;
}

export interface ProductVariant {
  name: string;
  description: string;
  bestFor: string;
  specs: ProductSpec[];
}

export interface ProductApplication {
  title: string;
  description: string;
  iconName: string;
}

export interface ProductGalleryImage {
  src: string;
  title?: string;
  alt: string;
  caption: string;
}

export interface ProductColour {
  name: string;
  hex: string;
}

export interface ProductSpecificationGroup {
  title: string;
  rows: ProductSpec[];
}

export interface ProductFinanceExample {
  label: string;
  downPayment: string;
  emi: string;
  tenure: string;
}

export interface ProductRelatedItem {
  name: string;
  category: string;
  imageUrl: string;
  description: string;
}

export interface ProductPageData {
  id: string;
  category: string;
  name: string;
  tagline: string;
  description: string;
  heroImage: string;
  brochureLabel: string;
  seo?: {
    title: string;
    description: string;
    canonicalPath: string;
    keywords?: string[];
    openGraph?: {
      title: string;
      description: string;
      imageAlt: string;
    };
    twitter?: {
      title: string;
      description: string;
      imageAlt: string;
    };
    structuredProductSchema?: {
      name: string;
      category: string;
      description: string;
      brand: string;
      imageAlt: string;
      areaServed: string[];
      keywords: string[];
    };
  };
  quickSpecs: ProductSpec[];
  overview: {
    heading: string;
    body: string;
    highlights: ProductFeature[];
    trustIndicators: ProductSpec[];
  };
  finance: {
    title: string;
    description: string;
    interestRate: string;
    benefits: string[];
    examples: ProductFinanceExample[];
  };
  gallery: ProductGalleryImage[];
  colours?: ProductColour[];
  features: ProductFeature[];
  variants: ProductVariant[];
  applications: ProductApplication[];
  specifications: ProductSpecificationGroup[];
  whyGemini: {
    heading: string;
    description: string;
    stats: ProductSpec[];
  };
  relatedProducts: ProductRelatedItem[];
  enquiry: {
    title: string;
    description: string;
    defaultInterest: string;
  };
}

export type VehicleSubTab = 'lcv' | 'mhcv' | 'ev' | 'gensets';

export interface Vehicle {
  id: string;
  name: string;
  category: 'lcv' | 'mhcv' | 'ev' | 'gensets';
  description: string;
  imageUrl: string;
  specs: {
    label: string;
    value: string;
  }[];
}

export interface FuelService {
  id: string;
  title: string;
  description: string;
  iconName: string;
  features: string[];
  imageUrl?: string;
}

export interface ServiceCentre {
  id: string;
  name: string;
  region: 'North Goa' | 'South Goa';
  location: string;
  phone: string;
  phoneHref: string;
  mapUrl: string;
  note: string;
}

export interface ServicesPageConfig {
  showPetrolPumpService: boolean;
}

export interface ChatWidgetConfig {
  enabled: boolean;
  mode: 'whatsapp' | 'live-agent' | 'ai-chatbot' | 'enquiry-popup' | 'unconfirmed';
  note: string;
}

export interface GreenTechProduct {
  id: string;
  title: string;
  category: 'solar-pv' | 'solar-thermal' | 'led' | 'waste';
  description: string;
  benefits: string[];
  imageUrl: string;
  stats: {
    label: string;
    value: string;
  }[];
}

export interface ServiceAppointment {
  model: string;
  registrationNumber: string;
  date: string;
  timeSlot: string;
  companyName: string;
  contactPerson: string;
  phone: string;
}

export interface BulkEnquiry {
  companyName: string;
  contactPerson: string;
  email: string;
  phone: string;
  serviceType: string;
  estimatedVolume: string;
  requirements: string;
}
