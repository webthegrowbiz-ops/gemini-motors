/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import businessJourney from '../assets/images/business_journey.jpg';
import avtr4625hLaStudioExterior from '../assets/images/avtr_4625h_la_studio_exterior.jpg';
import avtr4525hDtlaStudioExterior from '../assets/images/avtr_4525h_dtla_studio_exterior.jpg';
import commercialTruck from '../assets/images/commercial_truck.jpg';
import dostXlExterior from '../assets/images/dost_xl_exterior.jpg';
import fuelSolution from '../assets/images/fuel_solution.jpg';
import partner4TyreOnRoad from '../assets/images/partner_4_tyre_on_road.jpg';
import saathiRetailDelivery from '../assets/images/saathi_retail_delivery.jpg';
import switchIEV3 from '../assets/images/switch_iev3.jpg';
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
    imageUrl: commercialTruck,
    route: '/commercial/light/',
    routeDivision: 'commercial-light',
    modelCount: '9 Models',
    ctaLabel: 'Explore LCV Range',
  },
  {
    id: 'medium-heavy',
    slug: 'medium-heavy',
    title: 'M&HCV',
    description: 'High-capacity vehicles for haulage, construction, long-distance transportation and fleet operations.',
    imageUrl: fuelSolution,
    route: '/commercial/medium-heavy/',
    routeDivision: 'commercial-medium-heavy',
    modelCount: '9 Models',
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
    id: 'dost-pro',
    slug: 'gemini-dost-pro',
    name: 'Gemini Dost Pro',
    categoryId: 'light',
    imageUrl: switchIEV3,
    metricLabel: 'Payload',
    metricValue: '1,500 kg',
    fuelType: 'Diesel',
    usageLabel: 'Body Type',
    usageValue: 'Pickup',
    shortSpecification: 'Low deck height for faster loading',
    route: '/commercial/light/gemini-dost-pro',
    series: 'DOST',
    payloadKg: 1500,
    payloadClass: '1-to-1-5-ton',
    sizeClass: 'compact',
    applications: ['Pickup delivery'],
    isGenericPlaceholderImage: true,
  },
  {
    id: 'dost-xl',
    slug: 'dost-xl',
    name: 'DOST + XL',
    categoryId: 'light',
    imageUrl: dostXlExterior,
    metricLabel: 'Payload',
    metricValue: '1,600 kg',
    fuelType: 'Diesel',
    usageLabel: 'Body Type',
    usageValue: 'CBC / FSD / HSD',
    shortSpecification: '52 kW diesel LCV with 2805 mm load body length',
    route: '/commercial/light/dost-xl',
    series: 'DOST',
    payloadKg: 1600,
    payloadClass: 'above-1-5-ton',
    bodyLengthFt: 9.2,
    sizeClass: 'large-deck',
    applications: ['Cargo movement', 'Urban deliveries', 'Fleet operations'],
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
  {
    id: 'bada-dost-x',
    slug: 'gemini-bada-dost-x',
    name: 'Gemini Bada Dost X',
    categoryId: 'light',
    imageUrl: commercialTruck,
    metricLabel: 'Payload',
    metricValue: '1,860 kg',
    fuelType: 'Diesel',
    usageLabel: 'Body Type',
    usageValue: 'Wide cargo deck',
    shortSpecification: 'Wider cabin with business-grade comfort',
    route: '/commercial/light/gemini-bada-dost-x',
    series: 'Bada Dost',
    payloadKg: 1860,
    payloadClass: 'above-1-5-ton',
    sizeClass: 'large-deck',
    applications: ['Cargo movement'],
    isGenericPlaceholderImage: true,
  },
  {
    id: 'partner-cargo',
    slug: 'gemini-partner-cargo',
    name: 'Gemini Partner Cargo',
    categoryId: 'light',
    imageUrl: businessJourney,
    metricLabel: 'Payload',
    metricValue: '4,000 kg',
    fuelType: 'Diesel',
    usageLabel: 'Body Type',
    usageValue: 'Cargo body',
    shortSpecification: 'Covered cargo format for route deliveries',
    route: '/commercial/light/gemini-partner-cargo',
    series: 'Partner',
    payloadKg: 4000,
    payloadClass: 'above-1-5-ton',
    sizeClass: 'heavy-duty',
    applications: ['Route deliveries', 'Covered cargo'],
    isGenericPlaceholderImage: true,
  },
  {
    id: 'city-haul',
    slug: 'gemini-city-haul',
    name: 'Gemini City Haul',
    categoryId: 'light',
    imageUrl: commercialTruck,
    metricLabel: 'Payload',
    metricValue: '3,200 kg',
    fuelType: 'CNG / Diesel',
    usageLabel: 'Body Type',
    usageValue: 'Goods carrier',
    shortSpecification: 'Optimized for dense city distribution',
    route: '/commercial/light/gemini-city-haul',
    series: 'City Haul',
    payloadKg: 3200,
    payloadClass: 'above-1-5-ton',
    sizeClass: 'large-deck',
    applications: ['City distribution'],
    isGenericPlaceholderImage: true,
  },
  {
    id: 'urban-load',
    slug: 'gemini-urban-load',
    name: 'Gemini Urban Load',
    categoryId: 'light',
    imageUrl: businessJourney,
    metricLabel: 'Payload',
    metricValue: '2,800 kg',
    fuelType: 'Diesel',
    usageLabel: 'Body Type',
    usageValue: 'Flatbed',
    shortSpecification: 'Flexible body options for small fleets',
    route: '/commercial/light/gemini-urban-load',
    series: 'Urban Load',
    payloadKg: 2800,
    payloadClass: 'above-1-5-ton',
    sizeClass: 'large-deck',
    applications: ['Small fleet operations'],
    isGenericPlaceholderImage: true,
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
  {
    id: 'haul-1618',
    slug: 'gemini-haul-1618',
    name: 'Gemini Haul 1618',
    categoryId: 'medium-heavy',
    imageUrl: fuelSolution,
    metricLabel: 'GVW',
    metricValue: '16T class',
    fuelType: 'Diesel',
    usageLabel: 'Application',
    usageValue: 'Regional haulage',
    shortSpecification: 'Balanced powertrain for daily fleet runs',
    route: '/commercial/medium-heavy/gemini-haul-1618',
    series: 'Gemini Haul',
    sizeClass: 'heavy-duty',
    applications: ['Regional haulage'],
    isGenericPlaceholderImage: true,
  },
  {
    id: 'cargo-1920',
    slug: 'gemini-cargo-1920',
    name: 'Gemini Cargo 1920',
    categoryId: 'medium-heavy',
    imageUrl: businessJourney,
    metricLabel: 'GVW',
    metricValue: '19T class',
    fuelType: 'Diesel',
    usageLabel: 'Application',
    usageValue: 'Cargo movement',
    shortSpecification: 'Longer body options for bulk goods',
    route: '/commercial/medium-heavy/gemini-cargo-1920',
    series: 'Gemini Cargo',
    sizeClass: 'heavy-duty',
    applications: ['Cargo movement'],
    isGenericPlaceholderImage: true,
  },
  {
    id: 'fleet-2820',
    slug: 'gemini-fleet-2820',
    name: 'Gemini Fleet 2820',
    categoryId: 'medium-heavy',
    imageUrl: fuelSolution,
    metricLabel: 'GVW',
    metricValue: '28T class',
    fuelType: 'Diesel',
    usageLabel: 'Application',
    usageValue: 'Fleet logistics',
    shortSpecification: 'Multi-axle support for heavier routes',
    route: '/commercial/medium-heavy/gemini-fleet-2820',
    series: 'Gemini Fleet',
    sizeClass: 'heavy-duty',
    applications: ['Fleet logistics'],
    isGenericPlaceholderImage: true,
  },
  {
    id: 'heavy-3525',
    slug: 'gemini-heavy-3525',
    name: 'Gemini Heavy 3525',
    categoryId: 'medium-heavy',
    imageUrl: commercialTruck,
    metricLabel: 'GVW',
    metricValue: '35T class',
    fuelType: 'Diesel',
    usageLabel: 'Application',
    usageValue: 'Heavy cargo',
    shortSpecification: 'High torque setup for demanding freight',
    route: '/commercial/medium-heavy/gemini-heavy-3525',
    series: 'Gemini Heavy',
    sizeClass: 'heavy-duty',
    applications: ['Heavy cargo'],
    isGenericPlaceholderImage: true,
  },
  {
    id: 'tipper-4220',
    slug: 'gemini-tipper-4220',
    name: 'Gemini Tipper 4220',
    categoryId: 'medium-heavy',
    imageUrl: fuelSolution,
    metricLabel: 'GVW',
    metricValue: '42T class',
    fuelType: 'Diesel',
    usageLabel: 'Application',
    usageValue: 'Construction tipper',
    shortSpecification: 'Reinforced body for site movement',
    route: '/commercial/medium-heavy/gemini-tipper-4220',
    series: 'Gemini Tipper',
    sizeClass: 'heavy-duty',
    applications: ['Construction tipper'],
    isGenericPlaceholderImage: true,
  },
  {
    id: 'tractor-5525',
    slug: 'gemini-tractor-5525',
    name: 'Gemini Tractor 5525',
    categoryId: 'medium-heavy',
    imageUrl: businessJourney,
    metricLabel: 'GVW',
    metricValue: '55T class',
    fuelType: 'Diesel',
    usageLabel: 'Application',
    usageValue: 'Long-haul tractor',
    shortSpecification: 'Built for trailer operations and uptime',
    route: '/commercial/medium-heavy/gemini-tractor-5525',
    series: 'Gemini Tractor',
    sizeClass: 'heavy-duty',
    applications: ['Long-haul tractor'],
    isGenericPlaceholderImage: true,
  },
];

export const commercialModels = [...lightCommercialVehicles, ...mediumHeavyCommercialVehicles];
