/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import businessJourney from '../assets/images/business_journey.jpg';
import avtr4625hLaStudioExterior from '../assets/images/avtr_4625h_la_studio_exterior.jpg';
import avtr4525hDtlaStudioExterior from '../assets/images/avtr_4525h_dtla_studio_exterior.jpg';
import badaDostI5PlusCard from '../assets/images/bada-dost-i5-plus-card.png';
import commercialTruck from '../assets/images/commercial_truck.jpg';
import dostXlExterior from '../assets/images/dost_xl_exterior.jpg';
import dostXlHero from '../assets/images/dost_xl_hero.jpg';
import fuelSolution from '../assets/images/fuel_solution.jpg';
import partner4TyreOnRoad from '../assets/images/partner_4_tyre_on_road.jpg';
import saathiRetailDelivery from '../assets/images/saathi_retail_delivery.jpg';
import tipper8x4HighwayExterior from '../assets/images/tipper_8x4_highway_exterior.jpg';
import { AppDivision } from '../types';

export type CommercialCategoryId = 'light' | 'medium-heavy';
export type PayloadClass = 'up-to-1-ton' | '1-to-1-5-ton' | 'above-1-5-ton';
export type SizeClass = 'compact' | 'large-deck' | 'heavy-duty';

export interface CommercialCategory {
  id: CommercialCategoryId;
  slug: string;
  title: string;
  description: string;
  imageUrl: string;
  route: string;
  routeDivision: AppDivision;
  modelCount: string;
  ctaLabel: string;
}

export interface CommercialVehicleModel {
  id: string;
  slug: string;
  name: string;
  categoryId: CommercialCategoryId;
  imageUrl: string;
  imageAlt?: string;
  metricLabel: 'Payload' | 'GVW';
  metricValue: string;
  fuelType: string;
  usageLabel: 'Body Type' | 'Application';
  usageValue: string;
  shortSpecification: string;
  route: string;
  series?: string;
  payloadKg?: number;
  payloadClass?: PayloadClass;
  bodyLengthFt?: number;
  sizeClass?: SizeClass;
  applications?: string[];
  isGenericPlaceholderImage?: boolean;
}

export const commercialCategories: CommercialCategory[] = [
  {
    id: 'light',
    slug: 'light',
    title: 'Light Commercial Vehicles',
    description: 'Efficient vehicles for city logistics, last-mile delivery and small business transportation.',
    imageUrl: dostXlExterior,
    route: '/commercial/light/',
    routeDivision: 'commercial-light',
    modelCount: '5 Models',
    ctaLabel: 'Explore LCV Range',
  },
  {
    id: 'medium-heavy',
    slug: 'medium-heavy',
    title: 'M&HCV',
    description: 'High-capacity vehicles for haulage, construction, long-distance transportation and fleet operations.',
    imageUrl: tipper8x4HighwayExterior,
    route: '/commercial/medium-heavy/',
    routeDivision: 'commercial-medium-heavy',
    modelCount: '3 Models',
    ctaLabel: 'Explore Medium & Heavy Range',
  },
];

export const lightCommercialVehicles: CommercialVehicleModel[] = [
  {
    id: 'l-series-25t',
    slug: 'gemini-l-series-25t',
    name: 'Gemini L-Series 2.5T',
    categoryId: 'light',
    imageUrl: commercialTruck,
    metricLabel: 'Payload',
    metricValue: '2,500 kg',
    fuelType: 'Diesel / CNG',
    usageLabel: 'Body Type',
    usageValue: 'Mini truck',
    shortSpecification: 'Turbo diesel with city-ready turning radius',
    route: '/commercial/light/gemini-l-series-25t',
    series: 'Gemini L-Series',
    payloadKg: 2500,
    payloadClass: 'above-1-5-ton',
    sizeClass: 'large-deck',
    applications: ['City logistics', 'Regional delivery'],
    isGenericPlaceholderImage: true,
  },
  {
    id: 'bada-dost-i5-plus',
    slug: 'bada-dost-i5-plus',
    name: 'Bada Dost i5+',
    categoryId: 'light',
    imageUrl: badaDostI5PlusCard,
    imageAlt: 'Ashok Leyland Bada Dost i5+',
    metricLabel: 'Payload',
    metricValue: '1,500 kg / 1.5 Ton',
    fuelType: 'Electric',
    usageLabel: 'Body Type',
    usageValue: 'Pickup',
    shortSpecification: '58 kWh battery with up to 210 km real-world range',
    route: '/commercial/light/bada-dost-i5-plus',
    series: 'Bada Dost i5+',
    payloadKg: 1500,
    payloadClass: '1-to-1-5-ton',
    sizeClass: 'compact',
    applications: ['Pickup delivery'],
  },
  {
    id: 'dost-plus-xl',
    slug: 'dost-plus-xl',
    name: 'DOST + XL',
    categoryId: 'light',
    imageUrl: dostXlExterior,
    metricLabel: 'Payload',
    metricValue: '1,600 kg',
    fuelType: 'Diesel',
    usageLabel: 'Body Type',
    usageValue: 'CBC / FSD / HSD',
    shortSpecification: '52 kW diesel LCV with 2805 mm load body length',
    route: '/commercial/light/dost-plus-xl',
    series: 'DOST',
    payloadKg: 1600,
    payloadClass: 'above-1-5-ton',
    bodyLengthFt: 9.2,
    sizeClass: 'large-deck',
    applications: ['Cargo movement', 'Urban deliveries', 'Fleet operations'],
  },
  {
  id: 'dost-xl',
  slug: 'dost-xl',
  name: 'DOST XL',
  categoryId: 'light',
  imageUrl: dostXlHero,
  imageAlt: 'Ashok Leyland Dost XL',
  metricLabel: 'Payload',
  metricValue: '1,400 kg',
  fuelType: 'Diesel',
  usageLabel: 'Body Type',
  usageValue: 'Cargo Deck',
  shortSpecification: '70 HP diesel engine with 2645 mm load body',
  route: '/commercial/light/dost-xl',
  series: 'DOST',
  payloadKg: 1400,
  payloadClass: '1-to-1-5-ton',
  bodyLengthFt: 8.7,
  sizeClass: 'compact',
  applications: [
    'Last-mile delivery',
    'Retail transport',
    'Cargo movement',
    'E-commerce logistics'
  ],
  },
  {
    id: 'saathi',
    slug: 'saathi',
    name: 'SAATHI',
    categoryId: 'light',
    imageUrl: saathiRetailDelivery,
    metricLabel: 'Payload',
    metricValue: '1,120 kg',
    fuelType: 'Diesel',
    usageLabel: 'Body Type',
    usageValue: 'Cargo deck',
    shortSpecification: '45 HP diesel LCV with compact Goa-ready dimensions',
    route: '/commercial/light/saathi',
    series: 'SAATHI',
    payloadKg: 1120,
    payloadClass: '1-to-1-5-ton',
    sizeClass: 'compact',
    applications: ['Retail delivery', 'Last-mile delivery'],
  },
  {
    id: 'partner-4-tyre',
    slug: 'partner-4-tyre',
    name: 'Partner 4 Tyre',
    categoryId: 'light',
    imageUrl: partner4TyreOnRoad,
    metricLabel: 'Payload',
    metricValue: '3760 / 4565 kg',
    fuelType: 'Diesel',
    usageLabel: 'Body Type',
    usageValue: 'CBC / FSD / HSD',
    shortSpecification: 'ZD30 DDTi diesel LCV with heavy-duty axle support',
    route: '/commercial/light/partner-4-tyre',
    series: 'Partner',
    payloadKg: 3760,
    payloadClass: 'above-1-5-ton',
    sizeClass: 'heavy-duty',
    applications: ['Cargo transport', 'Wholesale distribution', 'Construction material movement'],
  },
];

export const mediumHeavyCommercialVehicles: CommercialVehicleModel[] = [
  {
    id: 'avtr-4625h-la',
    slug: 'avtr-4625h-la',
    name: 'AVTR 4625H LA',
    categoryId: 'medium-heavy',
    imageUrl: avtr4625hLaStudioExterior,
    metricLabel: 'GVW',
    metricValue: '45T class',
    fuelType: 'Diesel',
    usageLabel: 'Application',
    usageValue: 'Long-haul logistics',
    shortSpecification: '184 kW H Series heavy-duty truck for logistics, construction and fleet operations',
    route: '/commercial/mhcv/avtr-4625h-la',
    series: 'AVTR',
    sizeClass: 'heavy-duty',
    applications: ['Long-haul logistics', 'Construction', 'Fleet operations'],
  },
  {
    id: '8x4-tipper',
    slug: '8x4-tipper',
    name: '8x4 Tipper',
    categoryId: 'medium-heavy',
    imageUrl: tipper8x4HighwayExterior,
    metricLabel: 'GVW',
    metricValue: '8x4 class',
    fuelType: 'Diesel',
    usageLabel: 'Application',
    usageValue: 'Construction tipper',
    shortSpecification: '184 kW H Series heavy-duty tipper for mining and infrastructure',
    route: '/commercial/medium-heavy/8x4-tipper',
    series: 'AVTR',
    sizeClass: 'heavy-duty',
    applications: ['Construction', 'Mining', 'Infrastructure'],
  },
  {
    id: 'avtr-4525h-dtla',
    slug: 'avtr-4525h-dtla',
    name: 'AVTR 4525H DTLA',
    categoryId: 'medium-heavy',
    imageUrl: avtr4525hDtlaStudioExterior,
    metricLabel: 'GVW',
    metricValue: '45T class',
    fuelType: 'Diesel',
    usageLabel: 'Application',
    usageValue: 'Long-haul logistics',
    shortSpecification: 'H Series 6-cylinder heavy-duty truck with 184 kW power',
    route: '/commercial/medium-heavy/avtr-4525h-dtla',
    series: 'AVTR',
    sizeClass: 'heavy-duty',
    applications: ['Long-haul logistics', 'Industrial freight'],
  },
];

export const commercialModels = [...lightCommercialVehicles, ...mediumHeavyCommercialVehicles];
