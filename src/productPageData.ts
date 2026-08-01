/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import commercialTruck from './assets/images/commercial_truck.jpg';
import avtr4625hLaOnRoadExterior from './assets/images/avtr_4625h_la_on_road_exterior.jpg';
import avtr4625hLaStudioExterior from './assets/images/avtr_4625h_la_studio_exterior.jpg';
import avtr4525hDtlaStudioExterior from './assets/images/avtr_4525h_dtla_studio_exterior.jpg';
import businessJourney from './assets/images/business_journey.jpg';
import dostXlCabin from './assets/images/dost_xl_cabin.jpg';
import dostXlExterior from './assets/images/dost_xl_exterior.jpg';
import dostXlHero from './assets/images/dost_xl_hero.jpg';
import fuelSolution from './assets/images/fuel_solution.jpg';
import indianOil from './assets/images/indian_oil.jpg';
import partner4TyreHeavyDutyLoading from './assets/images/partner_4_tyre_heavy_duty_loading.jpg';
import partner4TyreOnRoad from './assets/images/partner_4_tyre_on_road.jpg';
import partner4TyreStudioExterior from './assets/images/partner_4_tyre_studio_exterior.jpg';
import saathiRetailDelivery from './assets/images/saathi_retail_delivery.jpg';
import saathiStudioExterior from './assets/images/saathi_studio_exterior.jpg';
import switchIEV3 from './assets/images/switch_iev3.jpg';
import switchAward from './assets/images/switch_ev_award.jpg';
import tipper8x4HeavyDutyTipper from './assets/images/tipper_8x4_heavy_duty_tipper.jpg';
import tipper8x4HighwayExterior from './assets/images/tipper_8x4_highway_exterior.jpg';
import tipper8x4StudioExterior from './assets/images/tipper_8x4_studio_exterior.jpg';
import { commercialModels, type CommercialVehicleModel } from './data/commercialVehiclesData';
import { ProductPageData } from './types';

export const L_SERIES_PRODUCT_PAGE: ProductPageData = {
  id: 'gemini-l-series-25t',
  category: 'Light Commercial Vehicle',
  name: 'Gemini L-Series 2.5T',
  tagline: 'Urban payload power, engineered for Goa.',
  description:
    'A premium light commercial platform for last-mile logistics, market-lane distribution, hotel supply routes, and daily fleet operators who need uptime, manoeuvrability, and strong operating economics.',
  heroImage: commercialTruck,
  brochureLabel: 'L-Series 2.5T Brochure',
  seo: {
    title: 'Gemini L-Series 2.5T | Light Commercial Vehicle | Gemini Motors',
    description:
      'Explore the Gemini L-Series 2.5T light commercial vehicle with payload, gallery, specifications, finance options and enquiry support from Gemini Motors.',
    canonicalPath: '/commercial/light/gemini-l-series-25t',
  },
  quickSpecs: [
    { label: 'Payload', value: '2,500 kg', helper: 'Rated cargo capacity' },
    { label: 'Torque', value: '320 Nm', helper: 'Low-end pulling strength' },
    { label: 'Power', value: '95 hp', helper: 'Turbo diesel output' },
    { label: 'Load Body', value: '12.8 ft', helper: 'Practical urban bed size' },
    { label: 'Fuel', value: 'Diesel', helper: 'BS-VI ready platform' },
  ],
  overview: {
    heading: "Built for Goa's Daily Haul",
    body:
      "The Gemini L-Series 2.5T is shaped for businesses that move goods through Goa's compact city lanes, coastal roads, and highway stretches in the same workday. It combines a 2,500 kg payload, strong turbo diesel torque, and Gemini Motors' local service support into one dependable daily workhorse.",
    highlights: [
      {
        title: 'Market-Lane Manoeuvrability',
        description:
          'Compact wheelbase and confident steering help drivers handle tight loading zones, hotels, depots, and town routes.',
        iconName: 'route',
      },
      {
        title: 'Fleet-Ready Uptime',
        description:
          'Backed by Gemini Motors support, genuine spares, and practical service workflows for commercial operators.',
        iconName: 'wrench',
      },
      {
        title: 'Everyday Operating Value',
        description:
          'Balanced payload, fuel economy, and maintenance access for owner-operators and growing fleet teams.',
        iconName: 'trending-up',
      },
    ],
    trustIndicators: [
      { label: 'Wheelbase', value: '2,650 mm' },
      { label: 'Service Network', value: 'Goa-wide' },
      { label: 'Support', value: 'Sales + Service' },
    ],
  },
  finance: {
    title: 'Flexible EMI & Finance',
    description:
      'Help fleet owners compare down-payment options and expected monthly outflow before speaking with Gemini Motors finance support.',
    interestRate: 'Starting from 9.75% p.a.',
    benefits: [
      'Low down-payment plans for first-time commercial buyers',
      'Flexible tenure options for owner-operators and fleet companies',
      'Assistance with documentation, insurance, and delivery readiness',
      'Business-focused EMI planning based on vehicle usage and route type',
    ],
    examples: [
      { label: 'Starter Plan', downPayment: '15%', emi: 'Approx. Rs 28,500', tenure: '60 months' },
      { label: 'Balanced Plan', downPayment: '25%', emi: 'Approx. Rs 23,800', tenure: '60 months' },
      { label: 'Fast Ownership', downPayment: '35%', emi: 'Approx. Rs 31,200', tenure: '36 months' },
    ],
  },
  gallery: [
    { src: commercialTruck, alt: 'Gemini L-Series front exterior placeholder', caption: 'Front exterior' },
    { src: businessJourney, alt: 'Gemini L-Series on-road placeholder', caption: 'On-road presence' },
    { src: fuelSolution, alt: 'Commercial logistics placeholder', caption: 'Fleet operations' },
    { src: indianOil, alt: 'Gemini Motors support location placeholder', caption: 'Service support' },
    { src: switchIEV3, alt: 'Related commercial EV placeholder', caption: 'Future-ready fleet' },
  ],
  features: [
    {
      title: 'Turbo Diesel Confidence',
      description: 'Strong torque delivery supports fully loaded starts, inclines, and repeated urban stop-start duty.',
      iconName: 'gauge',
    },
    {
      title: 'Driver-Centric Cabin',
      description: 'A practical cabin layout helps keep daily routes comfortable, organized, and efficient.',
      iconName: 'armchair',
    },
    {
      title: 'Flexible Body Options',
      description: 'Flatbed, extended wheelbase, and insulated box body configurations support varied business models.',
      iconName: 'boxes',
    },
    {
      title: 'Serviceable Architecture',
      description: 'Built around commercial maintenance needs with clear access paths and dependable parts support.',
      iconName: 'settings',
    },
  ],
  variants: [
    {
      name: 'Standard Diesel Flatbed',
      description: 'The core workhorse for general distribution and everyday load movement.',
      bestFor: 'General cargo, retail supply, and warehouse dispatch.',
      specs: [
        { label: 'Body', value: 'Open flatbed' },
        { label: 'Load body', value: '12.8 ft' },
      ],
    },
    {
      name: 'Extended Wheelbase',
      description: 'Longer cargo footprint for lighter, bulkier goods on regional routes.',
      bestFor: 'Packaging, FMCG, and low-density bulk movement.',
      specs: [
        { label: 'Body', value: 'Extended platform' },
        { label: 'Use', value: 'Regional distribution' },
      ],
    },
    {
      name: 'Insulated Box Body',
      description: 'Enclosed configuration for temperature-sensitive and protected cargo.',
      bestFor: 'Dairy, perishables, hospitality, and food supply.',
      specs: [
        { label: 'Body', value: 'Insulated box' },
        { label: 'Use', value: 'Cold-chain support' },
      ],
    },
  ],
  applications: [
    {
      title: 'Courier & Express Delivery',
      description: 'Reliable daily movement across Panaji, Margao, Mapusa, and coastal routes.',
      iconName: 'package-check',
    },
    {
      title: 'Dairy & Perishables',
      description: 'Practical body options for hotel, restaurant, and retail supply chains.',
      iconName: 'snowflake',
    },
    {
      title: 'Construction Material',
      description: 'Useful payload capacity for smaller project sites and local movement.',
      iconName: 'hard-hat',
    },
    {
      title: 'Owner-Operator Business',
      description: 'A smart first commercial vehicle for entrepreneurs entering transport.',
      iconName: 'briefcase-business',
    },
  ],
  specifications: [
    {
      title: 'Engine',
      rows: [
        { label: 'Engine description', value: 'Turbocharged intercooled diesel' },
        { label: 'Displacement', value: '2,956 cc' },
        { label: 'Max power', value: '95 hp @ 3,200 rpm' },
        { label: 'Max torque', value: '320 Nm @ 1,400-2,200 rpm' },
        { label: 'Fuel type', value: 'Diesel' },
      ],
    },
    {
      title: 'Dimensions',
      rows: [
        { label: 'Wheelbase', value: '2,650 mm' },
        { label: 'Overall length', value: '5,100 mm' },
        { label: 'Overall height', value: '2,050 mm' },
        { label: 'Load body', value: '3,900 x 1,800 x 400 mm' },
        { label: 'Loading platform height', value: '800 mm' },
      ],
    },
    {
      title: 'Weight & Body',
      rows: [
        { label: 'Gross Vehicle Weight', value: '4,200 kg' },
        { label: 'Rated payload', value: '2,500 kg' },
        { label: 'Body options', value: 'Flatbed, extended wheelbase, insulated box' },
      ],
    },
    {
      title: 'Chassis & Control',
      rows: [
        { label: 'Clutch', value: 'Single plate, dry friction, hydraulic' },
        { label: 'Steering', value: 'Power-assisted hydraulic' },
        { label: 'Front suspension', value: 'Semi-elliptic leaf spring with shock absorbers' },
        { label: 'Rear suspension', value: 'Semi-elliptic leaf spring, parabolic' },
      ],
    },
  ],
  whyGemini: {
    heading: 'Why Fleet Owners Choose Gemini Motors',
    description:
      "Gemini Motors supports Goa's commercial operators with sales guidance, service coordination, genuine spares, and business-first consultation for long-term fleet reliability.",
    stats: [
      { label: 'Years in Goa', value: '20+' },
      { label: 'Skilled team members', value: '70+' },
      { label: 'Service hubs', value: '3' },
      { label: 'Genuine spares', value: '100%' },
    ],
  },
  relatedProducts: [
    {
      name: 'Gemini X-Utility Plus',
      category: 'Light Commercial',
      imageUrl: businessJourney,
      description: 'Rugged utility platform for mixed road and site operations.',
    },
    {
      name: 'Switch Mobility IeV 3',
      category: 'Electric Commercial',
      imageUrl: switchIEV3,
      description: 'Smart EV cargo solution for low-emission urban logistics.',
    },
    {
      name: 'Switch EiV 12',
      category: 'Electric Bus',
      imageUrl: switchAward,
      description: 'Premium zero-emission passenger mobility platform.',
    },
  ],
  enquiry: {
    title: 'Get Fleet Pricing',
    description: 'Share your route, load, and purchase timeline. Gemini Motors will connect with a tailored quote.',
    defaultInterest: 'Gemini L-Series 2.5T',
  },
};

export const DOST_XL_PRODUCT_PAGE: ProductPageData = {
  id: 'dost-xl',
  category: 'Light Commercial Vehicle',
  name: 'DOST + XL',
  tagline: 'Compact diesel strength for daily business movement.',
  description:
    'DOST + XL is a dependable light commercial vehicle offered through Gemini Motors for cargo movement, urban deliveries and fleet operations. It combines payload capability, cabin comfort and reliable diesel performance.',
  heroImage: dostXlHero,
  brochureLabel: 'DOST + XL Brochure',
  seo: {
    title: 'DOST + XL | Light Commercial Vehicle | Gemini Motors',
    description:
      'Explore the DOST + XL light commercial vehicle with 1600 kg payload, 52 kW diesel power, gallery, specifications, finance options and enquiry support from Gemini Motors.',
    canonicalPath: '/commercial/light/dost-xl',
  },
  quickSpecs: [
    { label: 'Payload', value: '1600 kg', helper: 'Rated cargo capacity' },
    { label: 'Torque', value: '190 Nm', helper: 'Low-speed diesel pull' },
    { label: 'Power', value: '52 kW', helper: '70 hp diesel output' },
    { label: 'Load Body', value: '2805 mm', helper: 'Cargo body length' },
    { label: 'Warranty', value: '5 Years', helper: 'Warranty coverage' },
  ],
  overview: {
    heading: 'Built for Practical LCV Operations',
    body:
      'DOST + XL is shaped for businesses that need a compact, dependable load carrier for city deliveries, retail distribution, agriculture, courier services and fleet operations. Its 1.5 L turbocharged intercooled diesel engine, 1600 kg payload and 2805 mm load body length make it a practical fit for everyday commercial movement.',
    highlights: [
      {
        title: 'Payload Capability',
        description: 'A 1600 kg payload rating supports everyday business cargo across urban and local routes.',
        iconName: 'boxes',
      },
      {
        title: 'Reliable Diesel Performance',
        description: 'The 1.5 L turbocharged intercooled diesel engine delivers 52 kW power and 190 Nm torque.',
        iconName: 'gauge',
      },
      {
        title: 'Comfortable Work Cabin',
        description: 'A practical cabin layout supports driver comfort through repeated delivery and fleet duty.',
        iconName: 'armchair',
      },
    ],
    trustIndicators: [
      { label: 'Wheelbase', value: '2510 mm' },
      { label: 'Load Body', value: '2805 mm' },
      { label: 'Warranty', value: '5 Years' },
    ],
  },
  finance: {
    title: 'Flexible EMI & Finance',
    description:
      'Gemini Motors can help buyers compare down-payment options and monthly outflow for DOST + XL before final quotation and lender approval.',
    interestRate: 'Starting from 9.75% p.a.',
    benefits: [
      'Finance assistance for owner-operators and small business buyers',
      'Flexible tenure options for route-based earning plans',
      'Support with documentation, insurance and delivery readiness',
      'EMI guidance based on payload use, application and purchase timeline',
    ],
    examples: [
      { label: 'Starter Plan', downPayment: '15%', emi: 'Approx. Rs 20,500', tenure: '60 months' },
      { label: 'Balanced Plan', downPayment: '25%', emi: 'Approx. Rs 17,200', tenure: '60 months' },
      { label: 'Fast Ownership', downPayment: '35%', emi: 'Approx. Rs 22,600', tenure: '36 months' },
    ],
  },
  gallery: [
    { src: dostXlHero, alt: 'DOST + XL studio exterior', caption: 'Studio exterior' },
    { src: dostXlExterior, alt: 'DOST + XL on-road exterior', caption: 'On-road exterior' },
    { src: dostXlCabin, alt: 'DOST + XL cabin interior', caption: 'Cabin comfort' },
    { src: indianOil, alt: 'Gemini Motors support location', caption: 'Gemini Motors support' },
  ],
  features: [
    {
      title: '1.5 L Diesel Engine',
      description: 'Turbocharged intercooled diesel performance for everyday commercial use.',
      iconName: 'gauge',
    },
    {
      title: '1600 kg Payload',
      description: 'Useful carrying capacity for retail, courier, agriculture and logistics operations.',
      iconName: 'boxes',
    },
    {
      title: 'Parabolic Leaf Suspension',
      description: 'Rigid axle suspension setup supports loaded commercial duty on local routes.',
      iconName: 'settings',
    },
    {
      title: '5 Year Warranty',
      description: 'Long warranty coverage helps businesses plan ownership with more confidence.',
      iconName: 'shield',
    },
  ],
  variants: [
    {
      name: 'CBC',
      description: 'Cab chassis configuration for custom body requirements.',
      bestFor: 'Businesses that need a body built around specific cargo or route needs.',
      specs: [
        { label: 'Variant', value: 'CBC' },
        { label: 'Use', value: 'Custom body' },
      ],
    },
    {
      name: 'FSD',
      description: 'Fixed side deck configuration for daily cargo movement.',
      bestFor: 'Retail distribution, courier routes and general goods movement.',
      specs: [
        { label: 'Variant', value: 'FSD' },
        { label: 'Load body', value: '2805 mm' },
      ],
    },
    {
      name: 'HSD',
      description: 'High side deck configuration for taller or loose cargo needs.',
      bestFor: 'Agriculture, local business supply and mixed cargo operations.',
      specs: [
        { label: 'Variant', value: 'HSD' },
        { label: 'Application', value: 'Higher side cargo' },
      ],
    },
  ],
  applications: [
    {
      title: 'Logistics',
      description: 'Dependable movement for city and local delivery operations.',
      iconName: 'package-check',
    },
    {
      title: 'Retail Distribution',
      description: 'Useful for shops, distributors and daily business supply routes.',
      iconName: 'briefcase-business',
    },
    {
      title: 'Agriculture',
      description: 'Practical cargo utility for produce, supplies and rural movement.',
      iconName: 'boxes',
    },
    {
      title: 'Courier Services',
      description: 'Compact LCV support for parcel and express delivery routes.',
      iconName: 'route',
    },
  ],
  specifications: [
    {
      title: 'Engine',
      rows: [
        { label: 'Engine description', value: '1.5 L, 3 cylinder turbocharged intercooled diesel' },
        { label: 'Displacement', value: '1478 cc' },
        { label: 'Max power', value: '52 kW (70 hp)' },
        { label: 'Max torque', value: '190 Nm' },
        { label: 'Fuel type', value: 'Diesel' },
      ],
    },
    {
      title: 'Dimensions',
      rows: [
        { label: 'Wheelbase', value: '2510 mm' },
        { label: 'Overall length', value: '4785 mm' },
        { label: 'Overall height', value: '1930 mm' },
        { label: 'Load body length', value: '2805 mm' },
        { label: 'Loading height', value: '945 mm' },
      ],
    },
    {
      title: 'Body & Variants',
      rows: [
        { label: 'Payload', value: '1600 kg' },
        { label: 'Variants', value: 'CBC, FSD, HSD' },
        { label: 'Warranty', value: '5 Years' },
      ],
    },
    {
      title: 'Chassis & Control',
      rows: [
        { label: 'Clutch', value: '240 mm single dry plate' },
        { label: 'Steering', value: 'Manual / Power Steering' },
        { label: 'Front suspension', value: 'Parabolic leaf spring - rigid axle' },
        { label: 'Rear suspension', value: 'Parabolic leaf spring - rigid axle' },
      ],
    },
  ],
  whyGemini: {
    heading: 'Why Buy DOST + XL From Gemini Motors',
    description:
      'Gemini Motors supports commercial vehicle buyers with product guidance, finance coordination, sales support and service assistance for day-to-day fleet reliability.',
    stats: [
      { label: 'Payload', value: '1600 kg' },
      { label: 'Power', value: '52 kW' },
      { label: 'Wheelbase', value: '2510 mm' },
      { label: 'Warranty', value: '5 Years' },
    ],
  },
  relatedProducts: [
    {
      name: 'Gemini L-Series 2.5T',
      category: 'Light Commercial',
      imageUrl: commercialTruck,
      description: 'Urban payload platform for last-mile logistics and fleet operators.',
    },
    {
      name: 'Switch Mobility IeV 3',
      category: 'Electric Commercial',
      imageUrl: switchIEV3,
      description: 'Smart EV cargo solution for low-emission urban logistics.',
    },
    {
      name: 'Gemini X-Utility Plus',
      category: 'Light Commercial',
      imageUrl: businessJourney,
      description: 'Rugged utility platform for mixed road and site operations.',
    },
  ],
  enquiry: {
    title: 'Enquire About DOST + XL',
    description: 'Share your route, load and purchase timeline. Gemini Motors will connect with a tailored quote.',
    defaultInterest: 'DOST + XL',
  },
};

export const SAATHI_PRODUCT_PAGE: ProductPageData = {
  id: 'saathi',
  category: 'Light Commercial Vehicle',
  name: 'SAATHI',
  tagline: 'Compact cargo mobility for Goa businesses.',
  description:
    'SAATHI is a compact diesel light commercial vehicle for retail deliveries, supermarket supply, agriculture produce, courier movement and small business logistics across Goa.',
  heroImage: saathiRetailDelivery,
  brochureLabel: 'SAATHI Brochure',
  seo: {
    title: 'SAATHI Light Commercial Vehicle in Goa | Gemini Motors Goa',
    description:
      'SAATHI is available at Gemini Motors Goa, a commercial vehicle dealer in Goa. Explore payload, specifications, applications and finance support for this light commercial vehicle in Goa.',
    canonicalPath: '/commercial/light/saathi',
  },
  quickSpecs: [
    { label: 'Payload', value: '1120 kg', helper: 'Rated payload' },
    { label: 'Power', value: '45 HP', helper: 'At 3300 RPM' },
    { label: 'Torque', value: '110 Nm', helper: '1000-2400 RPM' },
    { label: 'Load Body', value: '2500 mm', helper: 'Cargo body length' },
    { label: 'Warranty', value: '5 Years', helper: 'Or 2 lakh km' },
  ],
  overview: {
    heading: 'Made for Goa Last-Mile Business',
    body:
      'SAATHI gives small businesses and fleet operators a practical light commercial vehicle for daily movement across Goa. Its compact footprint helps with market lanes and delivery routes, while the diesel engine, useful payload and cargo body make it a strong fit for retail supply, courier work, agriculture produce and local logistics.',
    highlights: [
      {
        title: 'Compact Route Access',
        description: 'Goa-friendly dimensions help drivers handle retail streets, local markets and tight delivery stops.',
        iconName: 'route',
      },
      {
        title: 'Economical Diesel Workhorse',
        description: 'The 1.5 L turbocharged 3-cylinder diesel engine is suited to everyday commercial use.',
        iconName: 'gauge',
      },
      {
        title: 'Useful Cargo Capacity',
        description: 'A 1120 kg rated payload and 2500 mm load body support regular business movement.',
        iconName: 'boxes',
      },
    ],
    trustIndicators: [
      { label: 'Payload', value: '1120 kg' },
      { label: 'GVW', value: '2288 kg' },
      { label: 'Warranty', value: '5 Years / 2 lakh km' },
    ],
  },
  finance: {
    title: 'Flexible EMI & Finance',
    description:
      'Gemini Motors can help Goa buyers review down-payment, tenure and monthly EMI options for SAATHI before final quotation and lender approval.',
    interestRate: 'Starting from 9.75% p.a.',
    benefits: [
      'Finance support for first-time commercial vehicle buyers in Goa',
      'EMI planning for retail, courier, agriculture and local logistics use',
      'Assistance with documentation, insurance and delivery readiness',
      'Guidance from Gemini Motors for business-focused ownership planning',
    ],
    examples: [
      { label: 'Starter Plan', downPayment: '15%', emi: 'Approx. Rs 15,500', tenure: '60 months' },
      { label: 'Balanced Plan', downPayment: '25%', emi: 'Approx. Rs 13,200', tenure: '60 months' },
      { label: 'Fast Ownership', downPayment: '35%', emi: 'Approx. Rs 17,400', tenure: '36 months' },
    ],
  },
  gallery: [
    { src: saathiStudioExterior, alt: 'SAATHI studio exterior front view', caption: 'Studio Exterior' },
    { src: saathiRetailDelivery, alt: 'SAATHI on-road retail delivery use', caption: 'Retail Delivery Usage' },
    { src: indianOil, alt: 'Gemini Motors Goa dealership support', caption: 'Dealership Support' },
  ],
  colours: [{ name: 'Aqua Blue', hex: '#0797ad' }],
  features: [
    {
      title: '45 HP Diesel Power',
      description: 'A 1.5 L turbocharged 3-cylinder diesel engine supports everyday commercial routes.',
      iconName: 'gauge',
    },
    {
      title: '1120 kg Payload',
      description: 'Practical rated payload for retail supply, courier movement and produce transport.',
      iconName: 'boxes',
    },
    {
      title: 'Compact Dimensions',
      description: 'A 2250 mm wheelbase and compact body help with last-mile access in busy areas.',
      iconName: 'route',
    },
    {
      title: 'Long Warranty',
      description: '5 years or 2 lakh km warranty coverage supports confident business ownership.',
      iconName: 'shield',
    },
  ],
  variants: [
    {
      name: 'SAATHI Cargo',
      description: 'Compact cargo deck configuration for regular local business deliveries.',
      bestFor: 'Retail deliveries, courier routes and supermarket supply across Goa.',
      specs: [
        { label: 'Load body', value: '2500 x 1620 x 380 mm' },
        { label: 'Payload', value: '1120 kg' },
      ],
    },
    {
      name: 'SAATHI Agriculture',
      description: 'Useful cargo platform for produce, farm supplies and local market movement.',
      bestFor: 'Agriculture produce, small traders and route-based local logistics.',
      specs: [
        { label: 'GVW', value: '2288 kg' },
        { label: 'Fuel tank', value: '40 L' },
      ],
    },
    {
      name: 'SAATHI Fleet',
      description: 'Practical LCV option for operators building compact delivery fleets.',
      bestFor: 'Fleet operations, daily parcels and business-to-business movement.',
      specs: [
        { label: 'Transmission', value: '5F + 1R manual' },
        { label: 'Max speed', value: '80 km/h' },
      ],
    },
  ],
  applications: [
    {
      title: 'Retail Deliveries',
      description: 'Useful for shop-to-shop and local route deliveries across Goa.',
      iconName: 'briefcase-business',
    },
    {
      title: 'Supermarket Supply',
      description: 'Supports daily restocking and packaged goods movement.',
      iconName: 'package-check',
    },
    {
      title: 'Courier & Parcel Transport',
      description: 'Compact cargo movement for parcel and express delivery operations.',
      iconName: 'route',
    },
    {
      title: 'Agriculture Produce',
      description: 'Suitable for produce transport between farms, markets and buyers.',
      iconName: 'boxes',
    },
  ],
  specifications: [
    {
      title: 'Engine',
      rows: [
        { label: 'Engine description', value: '1.5 L turbocharged 3-cylinder diesel' },
        { label: 'Displacement', value: '1478 cc' },
        { label: 'Max power', value: '45 HP @ 3300 RPM' },
        { label: 'Max torque', value: '110 Nm @ 1000-2400 RPM' },
        { label: 'Fuel type', value: 'Diesel' },
      ],
    },
    {
      title: 'Dimensions',
      rows: [
        { label: 'Wheelbase', value: '2250 mm' },
        { label: 'Overall length', value: '4406 mm' },
        { label: 'Overall width', value: '1663 mm' },
        { label: 'Overall height', value: '1833 mm' },
        { label: 'Loading height', value: '835 mm' },
      ],
    },
    {
      title: 'Weight & Body',
      rows: [
        { label: 'GVW', value: '2288 kg' },
        { label: 'Rated payload', value: '1120 kg' },
        { label: 'Load body', value: '2500 x 1620 x 380 mm' },
        { label: 'Fuel tank', value: '40 L' },
        { label: 'Tyres', value: '165 R14 LT 8PR' },
      ],
    },
    {
      title: 'Chassis & Control',
      rows: [
        { label: 'Clutch', value: '215 mm dry type single plate' },
        { label: 'Transmission', value: '5F + 1R manual' },
        { label: 'Brakes', value: 'Vacuum assisted hydraulic' },
        { label: 'Front suspension', value: 'Parabolic leaf spring (2L)' },
        { label: 'Rear suspension', value: 'Parabolic leaf spring (3L)' },
      ],
    },
  ],
  whyGemini: {
    heading: 'Why Buy SAATHI From Gemini Motors Goa',
    description:
      'Gemini Motors helps Goa businesses choose the right commercial vehicle with dealership guidance, finance coordination, service support and practical advice for daily route operations.',
    stats: [
      { label: 'Payload', value: '1120 kg' },
      { label: 'GVW', value: '2288 kg' },
      { label: 'Fuel tank', value: '40 L' },
      { label: 'Warranty', value: '5 Years' },
    ],
  },
  relatedProducts: [
    {
      name: 'DOST + XL',
      category: 'Light Commercial',
      imageUrl: dostXlExterior,
      description: 'Higher-payload LCV option for cargo movement and fleet operations.',
    },
    {
      name: 'Gemini L-Series 2.5T',
      category: 'Light Commercial',
      imageUrl: commercialTruck,
      description: 'Urban payload platform for last-mile logistics and fleet operators.',
    },
    {
      name: 'Switch Mobility IeV 3',
      category: 'Electric Commercial',
      imageUrl: switchIEV3,
      description: 'Smart EV cargo solution for low-emission urban logistics.',
    },
  ],
  enquiry: {
    title: 'Enquire About SAATHI',
    description: 'Share your route, load and purchase timeline. Gemini Motors Goa will connect with a tailored quote.',
    defaultInterest: 'SAATHI',
  },
};

export const PARTNER_4_TYRE_PRODUCT_PAGE: ProductPageData = {
  id: 'partner-4-tyre',
  category: 'Light Commercial Vehicle',
  name: 'Partner 4 Tyre',
  tagline: 'Reliable cargo truck for businesses across Goa.',
  description:
    'Partner 4 Tyre is a capable light commercial truck available at Gemini Motors Goa for cargo transport, wholesale distribution, construction material movement, agriculture logistics and fleet operations.',
  heroImage: partner4TyreOnRoad,
  brochureLabel: 'Partner 4 Tyre Brochure',
  seo: {
    title: 'Partner 4 Tyre Truck in Goa | Gemini Motors Commercial Truck Dealer',
    description:
      'Partner 4 Tyre is available at Gemini Motors Goa, a commercial truck dealer in Goa. Explore this light commercial vehicle in Goa with ZD30 DDTi diesel power, payload options, specifications and enquiry support.',
    canonicalPath: '/commercial/light/partner-4-tyre',
  },
  quickSpecs: [
    { label: 'Power', value: '103 kW', helper: '140 hp @ 2750 rpm' },
    { label: 'Torque', value: '360 Nm', helper: '1350-2750 rpm' },
    { label: 'GVW', value: '6250 / 7200 kg', helper: 'Variant dependent' },
    { label: 'Payload', value: '3760 / 4565 kg', helper: 'Variant dependent' },
    { label: 'Engine', value: 'ZD30 DDTi', helper: 'Turbo intercooled diesel' },
  ],
  overview: {
    heading: 'Built for Heavier LCV Cargo Routes in Goa',
    body:
      'Partner 4 Tyre gives Goa businesses a stronger light commercial vehicle option for bigger cargo routes, construction supply, wholesale distribution and fleet duty. With ZD30 DDTi diesel performance, GVW options of 6250 / 7200 kg, payload options of 3760 / 4565 kg and a modern Euro cabin, it is suited for operators who need reliable carrying capacity with Gemini Motors dealership support in Goa.',
    highlights: [
      {
        title: 'Heavy Duty Axle',
        description: 'Built for demanding cargo operations and higher load requirements across business routes.',
        iconName: 'settings',
      },
      {
        title: 'Superior Load Carrying Capacity',
        description: 'Payload options of 3760 / 4565 kg support heavier commercial transport needs.',
        iconName: 'boxes',
      },
      {
        title: 'Modern Euro Cabin',
        description: 'A practical cabin environment supports drivers through daily fleet and distribution work.',
        iconName: 'armchair',
      },
    ],
    trustIndicators: [
      { label: 'GVW', value: '6250 / 7200 kg' },
      { label: 'Payload', value: '3760 / 4565 kg' },
      { label: 'Engine', value: 'ZD30 DDTi' },
    ],
  },
  finance: {
    title: 'Flexible EMI & Finance',
    description:
      'Gemini Motors can help Goa fleet buyers compare down-payment, tenure and EMI options for Partner 4 Tyre before final quotation and lender approval.',
    interestRate: 'Starting from 9.75% p.a.',
    benefits: [
      'Finance assistance for commercial truck buyers in Goa',
      'EMI planning for wholesale, construction, agriculture and fleet operations',
      'Support with documentation, insurance and delivery readiness',
      'Dealership guidance from Gemini Motors for route and load requirements',
    ],
    examples: [
      { label: 'Starter Plan', downPayment: '15%', emi: 'Approx. Rs 42,500', tenure: '60 months' },
      { label: 'Balanced Plan', downPayment: '25%', emi: 'Approx. Rs 35,800', tenure: '60 months' },
      { label: 'Fast Ownership', downPayment: '35%', emi: 'Approx. Rs 46,900', tenure: '36 months' },
    ],
  },
  gallery: [
    { src: partner4TyreStudioExterior, alt: 'Partner 4 Tyre studio exterior view', caption: 'Studio Exterior' },
    { src: partner4TyreOnRoad, alt: 'Partner 4 Tyre on-road exterior', caption: 'On-road Exterior' },
    {
      src: partner4TyreHeavyDutyLoading,
      alt: 'Partner 4 Tyre heavy duty loading and site use',
      caption: 'Heavy Duty Loading',
    },
  ],
  features: [
    {
      title: 'Powerful ZD30 DDTi Diesel Engine',
      description: 'DOHC, common rail, direct injection, turbo intercooled diesel performance for cargo operations.',
      iconName: 'gauge',
    },
    {
      title: 'Superior Load Carrying Capacity',
      description: 'GVW options of 6250 / 7200 kg and payload options of 3760 / 4565 kg support heavier business loads.',
      iconName: 'boxes',
    },
    {
      title: 'Modern Euro Cabin',
      description: 'Cabin design supports driver comfort and control during distribution and fleet duty.',
      iconName: 'armchair',
    },
    {
      title: 'Improved Fuel Efficiency',
      description: 'Fuel-efficient diesel operation helps businesses plan daily cargo movement with operating discipline.',
      iconName: 'trending-up',
    },
  ],
  variants: [
    {
      name: 'CBC',
      description: 'Cab chassis variant for business-specific body applications.',
      bestFor: 'Custom cargo bodies for industrial transport and fleet needs.',
      specs: [
        { label: 'Variant', value: 'CBC' },
        { label: 'Fuel', value: 'Diesel' },
      ],
    },
    {
      name: 'FSD',
      description: 'Fixed side deck variant for regular cargo transport.',
      bestFor: 'Wholesale distribution, agriculture logistics and long-distance goods movement.',
      specs: [
        { label: 'Load body length', value: '3160 / 4230 mm' },
        { label: 'Load body width', value: '1960 / 2060 mm' },
      ],
    },
    {
      name: 'HSD',
      description: 'High side deck variant for taller cargo and heavier route applications.',
      bestFor: 'Construction materials, industrial transport and fleet operations.',
      specs: [
        { label: 'GVW', value: '6250 / 7200 kg' },
        { label: 'Payload', value: '3760 / 4565 kg' },
      ],
    },
  ],
  applications: [
    {
      title: 'Wholesale Distribution',
      description: 'Suitable for bulk movement between suppliers, depots and business customers.',
      iconName: 'package-check',
    },
    {
      title: 'Construction Materials',
      description: 'Useful for carrying site supplies and construction goods across Goa routes.',
      iconName: 'hard-hat',
    },
    {
      title: 'Agriculture Logistics',
      description: 'Supports produce, supplies and market-linked transport requirements.',
      iconName: 'boxes',
    },
    {
      title: 'Long-distance Goods Movement',
      description: 'Built for operators who need reliable cargo movement beyond short city routes.',
      iconName: 'route',
    },
  ],
  specifications: [
    {
      title: 'Engine',
      rows: [
        {
          label: 'Engine description',
          value: 'ZD30 DDTi Diesel (DOHC, Common Rail, Direct Injection, Turbo Intercooled)',
        },
        { label: 'Fuel', value: 'Diesel' },
        { label: 'Max power', value: '103 kW (140 hp) @ 2750 rpm' },
        { label: 'Max torque', value: '360 Nm @ 1350-2750 rpm' },
      ],
    },
    {
      title: 'Weight & Body',
      rows: [
        { label: 'GVW', value: '6250 / 7200 kg' },
        { label: 'Payload', value: '3760 / 4565 kg' },
        { label: 'Variants', value: 'CBC, FSD, HSD' },
        { label: 'Load Body Length', value: '3160 / 4230 mm' },
        { label: 'Load Body Width', value: '1960 / 2060 mm' },
      ],
    },
    {
      title: 'Suspension',
      rows: [
        { label: 'Front suspension', value: 'Parabolic overslung with Double Acting Shock Absorbers' },
        { label: 'Rear suspension', value: 'Semi-elliptic overslung with Double Acting Shock Absorbers' },
      ],
    },
    {
      title: 'Chassis & Control',
      rows: [
        { label: 'Steering', value: 'Power Steering' },
        { label: 'Clutch', value: '310 mm Diaphragm Single Dry Plate Hydraulic Actuated' },
      ],
    },
  ],
  whyGemini: {
    heading: 'Why Buy Partner 4 Tyre From Gemini Motors Goa',
    description:
      'Gemini Motors supports Goa commercial truck buyers with dealership guidance, finance coordination, product consultation and service support for reliable cargo operations.',
    stats: [
      { label: 'GVW', value: '6250 / 7200 kg' },
      { label: 'Payload', value: '3760 / 4565 kg' },
      { label: 'Power', value: '103 kW' },
      { label: 'Torque', value: '360 Nm' },
    ],
  },
  relatedProducts: [
    {
      name: 'DOST + XL',
      category: 'Light Commercial',
      imageUrl: dostXlExterior,
      description: 'Compact diesel LCV for cargo movement, urban deliveries and fleet operations.',
    },
    {
      name: 'SAATHI',
      category: 'Light Commercial',
      imageUrl: saathiRetailDelivery,
      description: 'Compact cargo mobility for retail delivery and small business logistics.',
    },
    {
      name: 'Gemini L-Series 2.5T',
      category: 'Light Commercial',
      imageUrl: commercialTruck,
      description: 'Urban payload platform for last-mile logistics and fleet operators.',
    },
  ],
  enquiry: {
    title: 'Enquire About Partner 4 Tyre',
    description: 'Share your route, load and purchase timeline. Gemini Motors Goa will connect with a tailored quote.',
    defaultInterest: 'Partner 4 Tyre',
  },
};

export const AVTR_4525H_DTLA_PRODUCT_PAGE: ProductPageData = {
  id: 'avtr-4525h-dtla',
  category: 'Medium & Heavy Commercial Vehicle',
  name: 'AVTR 4525H DTLA',
  tagline: 'Heavy-duty M&HCV performance for fleet operations in Goa.',
  description:
    'AVTR 4525H DTLA is a heavy commercial truck available through Gemini Motors Goa for long-haul logistics, infrastructure projects, port movement, industrial freight and fleet operators who need dependable heavy-duty truck support.',
  heroImage: avtr4525hDtlaStudioExterior,
  brochureLabel: 'AVTR 4525H DTLA Brochure',
  seo: {
    title: 'AVTR 4525H DTLA Heavy Commercial Truck in Goa | Gemini Motors Goa',
    description:
      'AVTR 4525H DTLA is available at Gemini Motors Goa, an M&HCV dealer in Goa. Explore this heavy commercial truck for fleet trucks, cargo truck Goa routes, infrastructure projects and heavy-duty transport.',
    canonicalPath: '/commercial/medium-heavy/avtr-4525h-dtla',
    keywords: [
      'AVTR 4525H DTLA Goa',
      'Heavy Commercial Truck in Goa',
      'M&HCV Dealer in Goa',
      'Commercial Vehicle Dealer Goa',
      'Cargo Truck Goa',
      'Fleet Trucks Goa',
      'Heavy Duty Truck Goa',
      'Gemini Motors Goa',
    ],
  },
  quickSpecs: [
    { label: 'Power', value: '184 kW', helper: 'H Series 6-cylinder' },
    { label: 'Capacity', value: '6.0 L', helper: 'Cubic capacity' },
    { label: 'Gearbox', value: '9S1110', helper: '9-speed Direct Drive' },
    { label: 'Fuel Tank', value: '375 L', helper: 'Rectangular polymer' },
    { label: 'Loading Span', value: '8.7 / 9.3 / 9.7 m', helper: 'Body span options' },
  ],
  overview: {
    heading: 'Heavy Commercial Truck Support for Goa Fleets',
    body:
      'AVTR 4525H DTLA is built for fleet operators and businesses that need a heavy commercial truck in Goa for long-haul logistics, construction material transport, industrial freight, port and container movement, and infrastructure projects. With H Series 6-cylinder power, air suspension, multiple loading span options and cabin choices with AC, Gemini Motors Goa can help buyers configure the right M&HCV for demanding routes and uptime-focused operations.',
    highlights: [
      {
        title: 'Best-in-class Fluid Efficiency',
        description: 'Designed for efficient heavy-duty operation across long-distance fleet routes.',
        iconName: 'trending-up',
      },
      {
        title: 'Higher Reliability & Lower Maintenance Cost',
        description: 'A fleet-focused platform for dependable operation and planned maintenance support.',
        iconName: 'wrench',
      },
      {
        title: 'Higher Safety',
        description: 'Built around safer heavy-duty truck operation for commercial fleet movement.',
        iconName: 'shield',
      },
    ],
    trustIndicators: [
      { label: 'Engine', value: 'H Series 6 Cylinder' },
      { label: 'Power', value: '184 kW' },
      { label: 'Fuel Tank', value: '375 L' },
    ],
  },
  finance: {
    title: 'Flexible EMI & Finance',
    description:
      'Gemini Motors can help Goa fleet buyers compare finance options for AVTR 4525H DTLA based on route, load, application and purchase timeline.',
    interestRate: 'Starting from 9.75% p.a.',
    benefits: [
      'Finance assistance for M&HCV and fleet truck buyers in Goa',
      'EMI planning for infrastructure, port, industrial and long-haul applications',
      'Support with documentation, insurance and delivery readiness',
      'Commercial vehicle dealer guidance from Gemini Motors Goa',
    ],
    examples: [
      { label: 'Starter Plan', downPayment: '15%', emi: 'Approx. Rs 88,500', tenure: '60 months' },
      { label: 'Balanced Plan', downPayment: '25%', emi: 'Approx. Rs 74,200', tenure: '60 months' },
      { label: 'Fast Ownership', downPayment: '35%', emi: 'Approx. Rs 96,800', tenure: '36 months' },
    ],
  },
  gallery: [
    {
      src: avtr4525hDtlaStudioExterior,
      alt: 'AVTR 4525H DTLA heavy commercial truck studio exterior in Goa',
      caption: 'Studio Exterior',
    },
    {
      src: indianOil,
      alt: 'Gemini Motors Goa commercial vehicle dealer support',
      caption: 'Gemini Motors Goa Support',
    },
  ],
  features: [
    {
      title: 'H Series 6 Cylinder Engine',
      description: 'H Series 6-cylinder power for demanding heavy-duty commercial truck applications.',
      iconName: 'gauge',
    },
    {
      title: '184 kW Power',
      description: '184 kW output supports long-haul logistics, industrial freight and fleet operations.',
      iconName: 'zap',
    },
    {
      title: 'Choice of Cabins & Aggregates',
      description: 'U-Value, N-Premium and G Cowl options with AC help match fleet application needs.',
      iconName: 'armchair',
    },
    {
      title: 'Air Suspension',
      description: 'Rear air suspension supports heavy-duty ride and load management requirements.',
      iconName: 'settings',
    },
  ],
  variants: [
    {
      name: 'U-Value Cabin',
      description: 'Cabin option with AC for commercial fleet duty.',
      bestFor: 'Fleet operators looking for application-focused cabin value.',
      specs: [
        { label: 'Cabin', value: 'U-Value option with AC' },
        { label: 'Application', value: 'Fleet operations' },
      ],
    },
    {
      name: 'N-Premium Cabin',
      description: 'Premium cabin option with AC for long-haul and business fleet usage.',
      bestFor: 'Long-haul logistics, industrial freight and route-intensive applications.',
      specs: [
        { label: 'Cabin', value: 'N-Premium option with AC' },
        { label: 'Loading span', value: '8.7 m | 9.3 m | 9.7 m' },
      ],
    },
    {
      name: 'G Cowl',
      description: 'G Cowl option with AC for body and aggregate flexibility.',
      bestFor: 'Infrastructure projects, port movement and application-specific body requirements.',
      specs: [
        { label: 'Cabin', value: 'G Cowl option with AC' },
        { label: 'Gearbox', value: '9S1110, 9-speed Direct Drive' },
      ],
    },
  ],
  applications: [
    {
      title: 'Long-haul Logistics',
      description: 'Heavy-duty truck support for long-distance goods movement and fleet routes.',
      iconName: 'route',
    },
    {
      title: 'Construction Material Transport',
      description: 'Suitable for infrastructure and construction supply movement.',
      iconName: 'hard-hat',
    },
    {
      title: 'Port & Container Movement',
      description: 'Supports port-linked cargo movement and container-focused logistics.',
      iconName: 'boxes',
    },
    {
      title: 'Industrial Freight',
      description: 'Built for commercial vehicle operators moving heavy industrial cargo.',
      iconName: 'package-check',
    },
  ],
  specifications: [
    {
      title: 'Engine',
      rows: [
        { label: 'Engine', value: 'H Series 6 Cylinder' },
        { label: 'Type', value: 'Compression Ignition Turbo-charged Inter-Cooled' },
        { label: 'Power', value: '184 kW' },
        { label: 'Cubic Capacity', value: '6.0 L' },
      ],
    },
    {
      title: 'Gearbox',
      rows: [
        { label: 'Gearbox', value: '9S1110, 9-speed Direct Drive' },
      ],
    },
    {
      title: 'Suspension & Fuel',
      rows: [
        { label: 'Rear Suspension', value: 'Air Suspension' },
        { label: 'Fuel Tank', value: '375 L (Rectangular Polymer)' },
      ],
    },
    {
      title: 'Body & Cabin',
      rows: [
        { label: 'Loading Span', value: '8.7 m | 9.3 m | 9.7 m' },
        { label: 'Cabin', value: 'U-Value, N-Premium and G Cowl options with AC' },
      ],
    },
  ],
  whyGemini: {
    heading: 'Why Buy AVTR 4525H DTLA From Gemini Motors Goa',
    description:
      'Gemini Motors Goa supports heavy commercial truck buyers with M&HCV dealership guidance, route and load consultation, finance coordination and service support for fleet trucks across Goa.',
    stats: [
      { label: 'Engine', value: 'H Series' },
      { label: 'Power', value: '184 kW' },
      { label: 'Capacity', value: '6.0 L' },
      { label: 'Fuel Tank', value: '375 L' },
    ],
  },
  relatedProducts: [
    {
      name: 'Partner 4 Tyre',
      category: 'Light Commercial',
      imageUrl: partner4TyreOnRoad,
      description: 'Reliable cargo truck for businesses across Goa.',
    },
    {
      name: 'Gemini Haul 1618',
      category: 'Medium & Heavy',
      imageUrl: fuelSolution,
      description: 'Regional haulage option for daily fleet runs.',
    },
    {
      name: 'Gemini Fleet 2820',
      category: 'Medium & Heavy',
      imageUrl: businessJourney,
      description: 'Multi-axle support for heavier routes and fleet logistics.',
    },
  ],
  enquiry: {
    title: 'Enquire About AVTR 4525H DTLA',
    description: 'Share your route, load and purchase timeline. Gemini Motors Goa will connect with M&HCV guidance.',
    defaultInterest: 'AVTR 4525H DTLA',
  },
};

export const TIPPER_8X4_PRODUCT_PAGE: ProductPageData = {
  id: '8x4-tipper',
  category: 'Medium & Heavy Commercial Vehicle',
  name: '8x4 Tipper',
  tagline: 'Heavy-duty tipper performance for Goa construction and mining routes.',
  description:
    '8x4 Tipper is a heavy-duty M&HCV available through Gemini Motors Goa for mining, quarry operations, road construction, infrastructure projects and bulk material transport.',
  heroImage: tipper8x4HighwayExterior,
  brochureLabel: '8x4 Tipper Brochure',
  seo: {
    title: '8x4 Tipper Goa | Heavy Tipper Truck at Gemini Motors Goa',
    description:
      'Explore the 8x4 Tipper at Gemini Motors Goa, an M&HCV dealer Goa businesses trust for heavy tipper truck, construction truck, mining truck and infrastructure truck requirements.',
    canonicalPath: '/commercial/medium-heavy/8x4-tipper',
    keywords: [
      '8x4 Tipper Goa',
      'Heavy Tipper Truck Goa',
      'M&HCV Dealer Goa',
      'Construction Truck Goa',
      'Mining Truck Goa',
      'Infrastructure Truck Goa',
      'Heavy Commercial Vehicle Goa',
      'Gemini Motors Goa',
    ],
  },
  quickSpecs: [
    { label: 'Power', value: '184 kW', helper: 'H Series engine' },
    { label: 'Capacity', value: '6.0 L', helper: 'Cubic capacity' },
    { label: 'Clutch', value: '430 mm', helper: 'Single plate dry type' },
    { label: 'Gearbox', value: 'ZF9S1110', helper: '9 Speed Direct Drive' },
    { label: 'Load Body', value: '18 / 23 / 19 CBM', helper: 'Box / Rock body' },
  ],
  overview: {
    heading: 'Built for Demanding Goa Tipper Operations',
    body:
      'The 8x4 Tipper is suited for businesses that need a heavy commercial vehicle in Goa for mining, quarry operations, road construction, infrastructure projects and bulk material transport. With a 184 kW H Series engine, heavy-duty suspension, Premium N Cabin and modular platform technology, Gemini Motors Goa can help fleet owners match the right tipper configuration to tough site and route requirements.',
    highlights: [
      {
        title: 'Higher Reliability',
        description: 'Built for demanding construction, quarry and mining routes where uptime matters.',
        iconName: 'shield',
      },
      {
        title: 'Low Maintenance Cost',
        description: 'Designed for practical heavy-duty ownership with maintenance-focused engineering.',
        iconName: 'wrench',
      },
      {
        title: 'Best-in-class Fluid Efficiency',
        description: 'Fluid-efficient operation supports disciplined running costs for fleet and site work.',
        iconName: 'trending-up',
      },
    ],
    trustIndicators: [
      { label: 'Engine', value: 'H Series 6 Cylinder' },
      { label: 'Power', value: '184 kW' },
      { label: 'Cabin', value: 'Premium N Cabin' },
    ],
  },
  finance: {
    title: 'Flexible EMI & Finance',
    description:
      'Gemini Motors can help Goa buyers compare finance options for 8x4 Tipper purchases based on construction, mining, quarry or infrastructure application needs.',
    interestRate: 'Starting from 9.75% p.a.',
    benefits: [
      'Finance assistance for heavy tipper truck buyers in Goa',
      'EMI planning for mining, quarry, construction and infrastructure work',
      'Support with documentation, insurance and delivery readiness',
      'M&HCV dealer guidance from Gemini Motors Goa for fleet requirements',
    ],
    examples: [
      { label: 'Starter Plan', downPayment: '15%', emi: 'Approx. Rs 92,500', tenure: '60 months' },
      { label: 'Balanced Plan', downPayment: '25%', emi: 'Approx. Rs 77,800', tenure: '60 months' },
      { label: 'Fast Ownership', downPayment: '35%', emi: 'Approx. Rs 101,500', tenure: '36 months' },
    ],
  },
  gallery: [
    {
      src: tipper8x4StudioExterior,
      alt: '8x4 Tipper studio exterior heavy commercial vehicle Goa',
      caption: 'Studio Exterior',
    },
    {
      src: tipper8x4HighwayExterior,
      alt: '8x4 Tipper highway exterior construction truck Goa',
      caption: 'Highway Exterior',
    },
    {
      src: tipper8x4HeavyDutyTipper,
      alt: '8x4 Tipper body raised for heavy duty construction and mining work',
      caption: 'Heavy Duty Tipper',
    },
  ],
  features: [
    {
      title: 'Built on Modular Platform',
      description: 'Modular platform engineering helps adapt the vehicle to demanding tipper applications.',
      iconName: 'settings',
    },
    {
      title: 'Revolutionary Mid-NOx Technology',
      description: 'Mid-NOx technology supports modern heavy commercial vehicle performance requirements.',
      iconName: 'zap',
    },
    {
      title: 'Cable Shift CSO',
      description: 'Cable Shift CSO supports driver control for tough operating conditions.',
      iconName: 'gauge',
    },
    {
      title: 'All Metal Front Fascia',
      description: 'All metal front fascia is suited to rugged construction and site environments.',
      iconName: 'shield',
    },
  ],
  variants: [
    {
      name: 'Box 18 CBM',
      description: 'Box body configuration for bulk material movement.',
      bestFor: 'Road construction, infrastructure projects and fleet operations.',
      specs: [
        { label: 'Load Body Size', value: 'Box 18 CBM' },
        { label: 'Cabin', value: 'Crash-test Certified Premium N Cabin' },
      ],
    },
    {
      name: 'Box 23 CBM',
      description: 'Higher-volume box body configuration for demanding material transport.',
      bestFor: 'Bulk material transport and infrastructure route operations.',
      specs: [
        { label: 'Load Body Size', value: 'Box 23 CBM' },
        { label: 'Rear Suspension', value: 'Non-reactive Suspension with Bogie Rubber Bolster' },
      ],
    },
    {
      name: 'Rock 19 CBM',
      description: 'Rock body configuration for quarry and mining applications.',
      bestFor: 'Mining, quarry operations and heavy site movement.',
      specs: [
        { label: 'Load Body Size', value: 'Rock 19 CBM' },
        { label: 'Rear Axle', value: 'Single Reduction / Hub Reduction' },
      ],
    },
  ],
  applications: [
    {
      title: 'Mining',
      description: 'Heavy tipper support for mining movement and demanding site conditions.',
      iconName: 'hard-hat',
    },
    {
      title: 'Quarry Operations',
      description: 'Useful for rock, aggregate and quarry-linked bulk material transport.',
      iconName: 'boxes',
    },
    {
      title: 'Road Construction',
      description: 'Built for road work, site supply and construction movement across Goa.',
      iconName: 'route',
    },
    {
      title: 'Infrastructure Projects',
      description: 'Supports large project movement and heavy-duty fleet operations.',
      iconName: 'package-check',
    },
  ],
  specifications: [
    {
      title: 'Engine',
      rows: [
        { label: 'Engine', value: 'H Series 6 Cylinder' },
        { label: 'Type', value: 'Compression Ignition TCIC' },
        { label: 'Power', value: '184 kW' },
        { label: 'Cubic Capacity', value: '6.0 L' },
      ],
    },
    {
      title: 'Clutch & Gearbox',
      rows: [
        { label: 'Clutch Diameter', value: '430 mm' },
        { label: 'Clutch Type', value: 'Single Plate Dry Type' },
        { label: 'Gearbox', value: 'ZF9S1110' },
        { label: 'Gearbox Type', value: '9 Speed Direct Drive' },
      ],
    },
    {
      title: 'Axle & Suspension',
      rows: [
        { label: 'Rear Suspension', value: 'Non-reactive Suspension with Bogie Rubber Bolster' },
        { label: 'Rear Axle', value: 'Single Reduction / Hub Reduction' },
        { label: 'RAR', value: '5.83:1 | 7.2:1' },
      ],
    },
    {
      title: 'Body & Cabin',
      rows: [
        { label: 'Load Body Size', value: 'Box 18 CBM / 23 CBM, Rock 19 CBM' },
        { label: 'Cabin', value: 'Crash-test Certified Premium N Cabin' },
      ],
    },
  ],
  whyGemini: {
    heading: 'Why Buy 8x4 Tipper From Gemini Motors Goa',
    description:
      'Gemini Motors Goa supports heavy commercial vehicle buyers with M&HCV dealership guidance, finance coordination and application-focused consultation for mining, construction and infrastructure truck requirements.',
    stats: [
      { label: 'Power', value: '184 kW' },
      { label: 'Capacity', value: '6.0 L' },
      { label: 'Clutch', value: '430 mm' },
      { label: 'Body', value: '18 / 23 / 19 CBM' },
    ],
  },
  relatedProducts: [
    {
      name: 'AVTR 4525H DTLA',
      category: 'Medium & Heavy',
      imageUrl: avtr4525hDtlaStudioExterior,
      description: 'Heavy commercial truck for long-haul logistics and fleet operations.',
    },
    {
      name: 'Partner 4 Tyre',
      category: 'Light Commercial',
      imageUrl: partner4TyreOnRoad,
      description: 'Reliable cargo truck for businesses across Goa.',
    },
    {
      name: 'Gemini Tipper 4220',
      category: 'Medium & Heavy',
      imageUrl: fuelSolution,
      description: 'Reinforced body for site movement and construction tipper work.',
    },
  ],
  enquiry: {
    title: 'Enquire About 8x4 Tipper',
    description: 'Share your site, route, material and purchase timeline. Gemini Motors Goa will connect with M&HCV guidance.',
    defaultInterest: '8x4 Tipper',
  },
};

export const AVTR_4625H_LA_PRODUCT_PAGE: ProductPageData = {
  id: 'avtr-4625h-la',
  category: 'Medium & Heavy Commercial Vehicle (M&HCV)',
  name: 'AVTR 4625H LA',
  tagline: 'Heavy-duty haulage confidence for Goa fleet routes.',
  description:
    'AVTR 4625H LA is built for fleet owners, logistics operators, construction suppliers and heavy-duty transport businesses across Goa that need dependable uptime, efficient operation and strong route performance from an M&HCV platform.',
  heroImage: avtr4625hLaStudioExterior,
  brochureLabel: 'AVTR 4625H LA Reference',
  seo: {
    title: 'AVTR 4625H LA Heavy-Duty Truck in Goa | Gemini Motors Goa',
    description:
      'Explore AVTR 4625H LA at Gemini Motors Goa for logistics, mining, construction and fleet owners in Panaji, Vasco, Margao, Ponda and Verna Industrial Estate.',
    canonicalPath: '/commercial/mhcv/avtr-4625h-la',
    keywords: [
      'AVTR 4625H LA Goa',
      'M&HCV Dealer Goa',
      'Heavy-duty trucks Goa',
      'Commercial vehicles Goa',
      'Fleet trucks Goa',
      'Logistics truck Goa',
      'Construction truck Goa',
      'Mining truck Goa',
      'Gemini Motors Goa',
    ],
    openGraph: {
      title: 'AVTR 4625H LA | Gemini Motors Goa M&HCV Dealer',
      description:
        'AVTR 4625H LA heavy-duty commercial vehicle support for Goa logistics, construction, mining and fleet operations.',
      imageAlt: 'AVTR 4625H LA heavy-duty commercial truck available at Gemini Motors Goa',
    },
    twitter: {
      title: 'AVTR 4625H LA Heavy-Duty Truck in Goa',
      description:
        'Available at Gemini Motors Goa for fleet owners and commercial vehicle operators across Panaji, Vasco, Margao, Ponda and Verna.',
      imageAlt: 'AVTR 4625H LA M&HCV product view for Goa fleet owners',
    },
    structuredProductSchema: {
      name: 'AVTR 4625H LA',
      category: 'Medium & Heavy Commercial Vehicle',
      description:
        'Heavy-duty M&HCV for logistics, mining, construction and fleet operations, available through Gemini Motors Goa.',
      brand: 'Ashok Leyland',
      imageAlt: 'AVTR 4625H LA heavy-duty commercial truck product image',
      areaServed: ['Goa', 'Panaji', 'Vasco', 'Margao', 'Ponda', 'Verna Industrial Estate'],
      keywords: [
        'Heavy-duty trucks Goa',
        'Commercial vehicles Goa',
        'M&HCV Dealer Goa',
        'Fleet owners Goa',
      ],
    },
  },
  quickSpecs: [
    { label: 'Power', value: '184 kW', helper: 'H Series 6 cylinder' },
    { label: 'Capacity', value: '6.0 L', helper: 'Cubic capacity' },
    { label: 'Gearbox', value: '9S1110', helper: '9 speed Direct Drive' },
    { label: 'Fuel Tank', value: '375 L', helper: 'Rectangular polymer' },
    { label: 'Loading Span', value: '8.7 m | 9.3 m | 9.7 m', helper: 'Body span options' },
  ],
  overview: {
    heading: 'Built for Heavy-Duty Movement Across Goa',
    body:
      'AVTR 4625H LA gives Goa fleet owners a strong M&HCV option for long-distance cargo, port-linked movement, construction supply and industrial logistics. Gemini Motors Goa supports buyers from route planning to finance and service coordination, helping businesses in Panaji, Vasco, Margao, Ponda and Verna Industrial Estate choose a truck suited to real operating demands.',
    highlights: [
      {
        title: 'Best-in-class Fuel Efficiency',
        description: 'Fuel-conscious operation helps fleet owners manage route costs across Goa and regional corridors.',
        iconName: 'trending-up',
      },
      {
        title: 'Superior Tyre Mileage',
        description: 'Designed to support better tyre life for logistics, mining support and construction movement.',
        iconName: 'gauge',
      },
      {
        title: 'Higher Safety',
        description: 'A safety-focused heavy-duty platform for fleet owners moving valuable cargo and equipment.',
        iconName: 'shield',
      },
    ],
    trustIndicators: [
      { label: 'Engine', value: 'H Series 6 cylinder' },
      { label: 'Power', value: '184 kW' },
      { label: 'Fuel Tank', value: '375 L' },
    ],
  },
  finance: {
    title: 'Flexible EMI & Finance',
    description:
      'Gemini Motors can help M&HCV buyers compare finance options for AVTR 4625H LA based on route, loading span, fleet size and purchase timeline.',
    interestRate: 'Starting from 9.75% p.a.',
    benefits: [
      'Finance guidance for heavy-duty commercial vehicle buyers in Goa',
      'Support for logistics, mining, construction and fleet ownership needs',
      'Assistance with documentation, insurance and delivery readiness',
      'Gemini Motors Goa dealership support for commercial vehicle purchases',
    ],
    examples: [
      { label: 'Starter Plan', downPayment: '15%', emi: 'Approx. Rs 88,500', tenure: '60 months' },
      { label: 'Balanced Plan', downPayment: '25%', emi: 'Approx. Rs 74,200', tenure: '60 months' },
      { label: 'Fast Ownership', downPayment: '35%', emi: 'Approx. Rs 96,800', tenure: '36 months' },
    ],
  },
  gallery: [
    {
      src: avtr4625hLaStudioExterior,
      title: 'Studio Exterior',
      alt: 'AVTR 4625H LA studio exterior heavy-duty truck for Goa fleet owners',
      caption: 'Studio Exterior',
    },
    {
      src: avtr4625hLaOnRoadExterior,
      title: 'On-road Exterior',
      alt: 'AVTR 4625H LA on-road exterior for logistics and commercial vehicle use in Goa',
      caption: 'On-road Exterior',
    },
  ],
  features: [
    {
      title: 'Best-in-class Fuel Efficiency',
      description: 'Efficient heavy-duty operation supports disciplined fuel planning for long-haul and regional Goa routes.',
      iconName: 'trending-up',
    },
    {
      title: 'Superior Tyre Mileage',
      description: 'Built to support tyre life for fleet owners running repeated logistics, construction and mining routes.',
      iconName: 'gauge',
    },
    {
      title: 'Higher Reliability & Low Maintenance Cost',
      description: 'Reliability-focused engineering helps reduce downtime and supports planned maintenance cycles.',
      iconName: 'wrench',
    },
    {
      title: 'Better Productivity & Performance',
      description: 'The H Series engine, direct-drive gearbox and loading span options help match vehicle performance to business needs.',
      iconName: 'zap',
    },
    {
      title: 'Higher Safety',
      description: 'Designed for confident heavy-duty transport where driver control and cargo movement matter.',
      iconName: 'shield',
    },
  ],
  variants: [
    {
      name: '8.7 m Loading Span',
      description: 'A practical configuration for route-focused cargo movement and fleet operations.',
      bestFor: 'Logistics movement across Panaji, Vasco, Margao and Ponda.',
      specs: [
        { label: 'Loading span', value: '8.7 m' },
        { label: 'Cabin', value: 'Multiple cabins and cowl option with AC' },
      ],
    },
    {
      name: '9.3 m Loading Span',
      description: 'A balanced span option for commercial vehicle operators carrying regular heavy-duty loads.',
      bestFor: 'Industrial supply and Verna Industrial Estate transport routes.',
      specs: [
        { label: 'Loading span', value: '9.3 m' },
        { label: 'Gearbox', value: '9S1110 Gearbox' },
      ],
    },
    {
      name: '9.7 m Loading Span',
      description: 'The longer span option for fleet buyers planning high-productivity cargo movement.',
      bestFor: 'Fleet owners, long-haul logistics and construction supply work.',
      specs: [
        { label: 'Loading span', value: '9.7 m' },
        { label: 'Rear suspension', value: 'Air suspension' },
      ],
    },
  ],
  applications: [
    {
      title: 'Long-haul Logistics',
      description: 'Suited for fleet trucks moving goods across Goa and onward commercial routes.',
      iconName: 'route',
    },
    {
      title: 'Construction Supply',
      description: 'Useful for construction businesses moving material, equipment and project cargo.',
      iconName: 'hard-hat',
    },
    {
      title: 'Mining Support',
      description: 'Supports heavy-duty commercial movement for mining-linked transport requirements.',
      iconName: 'boxes',
    },
    {
      title: 'Industrial Fleet Operations',
      description: 'Built for businesses serving Verna Industrial Estate and other Goa industrial routes.',
      iconName: 'package-check',
    },
  ],
  specifications: [
    {
      title: 'Engine',
      rows: [
        { label: 'Engine', value: 'H Series 6 cylinder' },
        { label: 'Type', value: 'Compression Ignition Turbo-charged Inter-Cooled' },
        { label: 'Power', value: '184 kW' },
        { label: 'Cubic Capacity', value: '6.0 L' },
      ],
    },
    {
      title: 'Gearbox',
      rows: [
        { label: 'Type', value: '9S1110 Gearbox' },
        { label: 'Drive', value: '9 speed Direct Drive' },
      ],
    },
    {
      title: 'Suspension',
      rows: [
        { label: 'Rear', value: 'Air suspension' },
      ],
    },
    {
      title: 'Fuel Tank',
      rows: [
        { label: 'Capacity', value: '375 L' },
        { label: 'Tank type', value: 'Rectangular polymer' },
      ],
    },
    {
      title: 'Loading Span',
      rows: [
        { label: 'Loading span', value: '8.7 m | 9.3 m | 9.7 m' },
      ],
    },
    {
      title: 'Cabin',
      rows: [
        { label: 'Option', value: 'Multiple cabins and cowl option with AC' },
        { label: 'Type', value: 'U-Value cabin, N-Premium cabin, and G Cowl' },
      ],
    },
  ],
  whyGemini: {
    heading: 'Why Choose AVTR 4625H LA From Gemini Motors Goa',
    description:
      'Gemini Motors helps Goa M&HCV buyers choose the right heavy-duty truck for route, load and fleet requirements, with dealership support for enquiries, finance coordination and commercial vehicle ownership planning.',
    stats: [
      { label: 'Engine', value: 'H Series' },
      { label: 'Power', value: '184 kW' },
      { label: 'Gearbox', value: '9S1110' },
      { label: 'Fuel Tank', value: '375 L' },
    ],
  },
  relatedProducts: [
    {
      name: 'AVTR 4525H DTLA',
      category: 'Medium & Heavy',
      imageUrl: avtr4525hDtlaStudioExterior,
      description: 'Heavy commercial truck for fleet operations and long-haul logistics.',
    },
    {
      name: '8x4 Tipper',
      category: 'Medium & Heavy',
      imageUrl: tipper8x4HighwayExterior,
      description: 'Heavy-duty tipper for construction and mining routes.',
    },
    {
      name: 'Partner 4 Tyre',
      category: 'Light Commercial',
      imageUrl: partner4TyreOnRoad,
      description: 'Reliable cargo truck for businesses across Goa.',
    },
  ],
  enquiry: {
    title: 'Enquire About AVTR 4625H LA',
    description: 'Share your route, load, location and purchase timeline. Gemini Motors Goa will connect with M&HCV guidance.',
    defaultInterest: 'AVTR 4625H LA',
  },
};

const missingProductPageSlugs = new Set([
  'gemini-dost-pro',
  'gemini-bada-dost-x',
  'gemini-partner-cargo',
  'gemini-city-haul',
  'gemini-urban-load',
  'gemini-haul-1618',
  'gemini-cargo-1920',
  'gemini-fleet-2820',
  'gemini-heavy-3525',
  'gemini-tipper-4220',
  'gemini-tractor-5525',
]);

function createMissingProductPage(model: CommercialVehicleModel): ProductPageData {
  const isLightCommercial = model.categoryId === 'light';
  const category = isLightCommercial ? 'Light Commercial Vehicle' : 'Medium & Heavy Commercial Vehicle';
  const operatingFocus = model.applications?.join(', ') || model.usageValue.toLowerCase();

  return {
    id: model.slug,
    category,
    name: model.name,
    tagline: `${model.shortSpecification}.`,
    description: `${model.name} is a ${category.toLowerCase()} for ${operatingFocus}, available through Gemini Motors Goa with sales, finance and service guidance.`,
    heroImage: model.imageUrl,
    brochureLabel: `${model.name} Brochure`,
    seo: {
      title: `${model.name} | ${category} | Gemini Motors`,
      description: `Explore ${model.name} with specifications, applications, finance guidance and enquiry support from Gemini Motors Goa.`,
      canonicalPath: model.route,
    },
    quickSpecs: [
      { label: model.metricLabel, value: model.metricValue, helper: 'Vehicle class' },
      { label: 'Fuel', value: model.fuelType, helper: 'Available fuel type' },
      { label: model.usageLabel, value: model.usageValue, helper: 'Primary configuration' },
      { label: 'Series', value: model.series || model.name, helper: 'Model family' },
      { label: 'Support', value: 'Goa-wide', helper: 'Sales and service guidance' },
    ],
    overview: {
      heading: `Built for ${model.usageValue}`,
      body: `${model.name} is positioned for businesses that need dependable ${operatingFocus}. Gemini Motors Goa can help align the vehicle configuration, finance plan and support requirements with your daily operating needs.`,
      highlights: [
        { title: 'Business-Ready Capability', description: model.shortSpecification, iconName: 'truck' },
        { title: 'Application-Focused', description: `Configured for ${operatingFocus}.`, iconName: 'route' },
        { title: 'Goa Support', description: 'Sales, finance and service coordination for commercial operators.', iconName: 'wrench' },
      ],
      trustIndicators: [
        { label: model.metricLabel, value: model.metricValue },
        { label: 'Fuel', value: model.fuelType },
        { label: 'Support', value: 'Gemini Motors Goa' },
      ],
    },
    finance: {
      title: 'Flexible EMI & Finance',
      description: `Discuss a finance plan for ${model.name} based on your business route, expected usage and purchase timeline.`,
      interestRate: 'Starting from 9.75% p.a.',
      benefits: [
        'Flexible tenure options for commercial buyers',
        'Finance guidance for owner-operators and fleet businesses',
        'Documentation and insurance coordination support',
        'EMI planning aligned to operational requirements',
      ],
      examples: [
        { label: 'Starter Plan', downPayment: '15%', emi: 'Illustrative quote on request', tenure: '60 months' },
        { label: 'Balanced Plan', downPayment: '25%', emi: 'Illustrative quote on request', tenure: '60 months' },
        { label: 'Fast Ownership', downPayment: '35%', emi: 'Illustrative quote on request', tenure: '36 months' },
      ],
    },
    gallery: [
      { src: model.imageUrl, alt: `${model.name} exterior`, caption: 'Vehicle exterior' },
      { src: businessJourney, alt: `${model.name} business operations reference`, caption: 'Business operations' },
      { src: fuelSolution, alt: `${model.name} fleet support reference`, caption: 'Fleet support' },
    ],
    features: [
      { title: 'Commercial Configuration', description: `${model.usageValue} setup for practical business movement.`, iconName: 'boxes' },
      { title: 'Operational Focus', description: `Designed around ${operatingFocus}.`, iconName: 'gauge' },
      { title: 'Fleet Support', description: 'Gemini Motors guidance for selection, finance and service planning.', iconName: 'shield' },
      { title: 'Business Uptime', description: 'Commercial support planning for daily operations.', iconName: 'settings' },
    ],
    variants: [
      {
        name: model.name,
        description: model.shortSpecification,
        bestFor: `Suitable for ${operatingFocus}.`,
        specs: [
          { label: model.metricLabel, value: model.metricValue },
          { label: 'Fuel', value: model.fuelType },
          { label: model.usageLabel, value: model.usageValue },
        ],
      },
    ],
    applications: (model.applications || [model.usageValue]).map((application) => ({
      title: application,
      description: `${model.name} is configured to support ${application.toLowerCase()} requirements.`,
      iconName: 'briefcase-business',
    })),
    specifications: [
      {
        title: 'Vehicle Overview',
        rows: [
          { label: 'Model', value: model.name },
          { label: 'Series', value: model.series || model.name },
          { label: model.metricLabel, value: model.metricValue },
          { label: 'Fuel type', value: model.fuelType },
        ],
      },
      {
        title: 'Application & Body',
        rows: [
          { label: model.usageLabel, value: model.usageValue },
          { label: 'Primary applications', value: operatingFocus },
          { label: 'Body configuration', value: model.usageValue },
          { label: 'Vehicle class', value: category },
        ],
      },
      {
        title: 'Support',
        rows: [
          { label: 'Sales guidance', value: 'Gemini Motors Goa' },
          { label: 'Finance assistance', value: 'Available on enquiry' },
          { label: 'Service coordination', value: 'Goa-wide support' },
        ],
      },
    ],
    whyGemini: {
      heading: 'Why Choose Gemini Motors',
      description: 'Gemini Motors supports commercial vehicle buyers in Goa with vehicle selection, finance guidance, service coordination and genuine-parts support.',
      stats: [
        { label: 'Years in Goa', value: '20+' },
        { label: 'Service hubs', value: '3' },
        { label: 'Support', value: 'Goa-wide' },
        { label: 'Genuine spares', value: '100%' },
      ],
    },
    relatedProducts: [
      {
        name: isLightCommercial ? 'DOST + XL' : 'AVTR 4625H LA',
        category: isLightCommercial ? 'Light Commercial' : 'Medium & Heavy',
        imageUrl: isLightCommercial ? dostXlExterior : avtr4625hLaStudioExterior,
        description: 'Explore another commercial vehicle option from Gemini Motors Goa.',
      },
      {
        name: isLightCommercial ? 'Partner 4 Tyre' : '8x4 Tipper',
        category: isLightCommercial ? 'Light Commercial' : 'Medium & Heavy',
        imageUrl: isLightCommercial ? partner4TyreOnRoad : tipper8x4HighwayExterior,
        description: 'Compare a complementary model for your operating requirement.',
      },
      {
        name: 'Switch Mobility IeV 3',
        category: 'Electric Commercial',
        imageUrl: switchIEV3,
        description: 'Consider an electric commercial option for suitable routes.',
      },
    ],
    enquiry: {
      title: `Enquire About ${model.name}`,
      description: 'Share your route, load, location and purchase timeline. Gemini Motors Goa will connect with commercial vehicle guidance.',
      defaultInterest: model.name,
    },
  };
}

export const MISSING_PRODUCT_PAGES = commercialModels
  .filter((model) => missingProductPageSlugs.has(model.slug))
  .map(createMissingProductPage);

export const PRODUCT_PAGE_BY_SLUG: Record<string, ProductPageData> = {
  [L_SERIES_PRODUCT_PAGE.id]: L_SERIES_PRODUCT_PAGE,
  [DOST_XL_PRODUCT_PAGE.id]: DOST_XL_PRODUCT_PAGE,
  [SAATHI_PRODUCT_PAGE.id]: SAATHI_PRODUCT_PAGE,
  [PARTNER_4_TYRE_PRODUCT_PAGE.id]: PARTNER_4_TYRE_PRODUCT_PAGE,
  [AVTR_4525H_DTLA_PRODUCT_PAGE.id]: AVTR_4525H_DTLA_PRODUCT_PAGE,
  [TIPPER_8X4_PRODUCT_PAGE.id]: TIPPER_8X4_PRODUCT_PAGE,
  [AVTR_4625H_LA_PRODUCT_PAGE.id]: AVTR_4625H_LA_PRODUCT_PAGE,
  ...Object.fromEntries(MISSING_PRODUCT_PAGES.map((product) => [product.id, product])),
};
