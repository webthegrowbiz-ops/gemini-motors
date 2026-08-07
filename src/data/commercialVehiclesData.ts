/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import businessJourney from '../assets/images/business_journey.jpg';
import avtr4625hLaStudioExterior from '../assets/images/avtr_4625h_la_studio_exterior.jpg';
import avtr4525hDtlaStudioExterior from '../assets/images/avtr_4525h_dtla_studio_exterior.jpg';
import avtr4925hDtlaStudioExterior from '../assets/images/avtr_4925h_dtla_studio_exterior.jpg';
import avtr10x2StudioExterior from '../assets/images/avtr_10x2_studio.jpg';
import tipper10x4Hero from '../assets/images/tipper_10x4_hero.jpg';
import transitMixerStudio from '../assets/images/transit_mixer_studio.jpg';
import tractor6x4Studio from '../assets/images/tractor_6x4_studio.jpg';
import badaDostI5Card from '../assets/images/bada-dost-i5-card.png';
import badaDostI5PlusCard from '../assets/images/bada-dost-i5-plus-card.png';
import badaDostI6Card from '../assets/images/bada-dost-i6-card.png';
import commercialTruck from '../assets/images/commercial_truck.jpg';
import dostXlExterior from '../assets/images/dost_xl_exterior.jpg';
import dostXlHero from '../assets/images/dost_xl_hero.jpg';
import fuelSolution from '../assets/images/fuel_solution.jpg';
import partner4TyreOnRoad from '../assets/images/partner_4_tyre_on_road.jpg';
import partnerMunicipalCard from '../assets/images/partner-municipal-card.png';
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
    modelCount: '9 Models',
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
    modelCount: '8 Models',
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
  {
    id: 'bada-dost-i5',
    slug: 'bada-dost-i5',
    name: 'BADA DOST i5',
    categoryId: 'light',
    imageUrl: badaDostI5Card,
    imageAlt: 'Ashok Leyland BADA DOST i5',
    metricLabel: 'Payload',
    metricValue: '1,817 kg',
    fuelType: 'Diesel',
    usageLabel: 'Body Type',
    usageValue: 'FSD',
    shortSpecification: '80 hp diesel LCV with 2951 mm load body length',
    route: '/commercial/light/bada-dost-i5',
    series: 'BADA DOST i5',
    payloadKg: 1817,
    payloadClass: 'above-1-5-ton',
    bodyLengthFt: 9.7,
    sizeClass: 'large-deck',
    applications: ['Cargo movement', 'Urban deliveries', 'Highway logistics'],
  },
  {
    id: 'bada-dost-i6',
    slug: 'bada-dost-i6',
    name: 'BADA DOST i6',
    categoryId: 'light',
    imageUrl: badaDostI6Card,
    imageAlt: 'Ashok Leyland BADA DOST i6',
    metricLabel: 'Payload',
    metricValue: '2,567 kg',
    fuelType: 'Diesel',
    usageLabel: 'Body Type',
    usageValue: 'CBC / FSD',
    shortSpecification: '80 hp diesel pickup with 3250 mm load body and 15.1 kmpl ARAI mileage',
    route: '/commercial/light/bada-dost-i6',
    series: 'BADA DOST i6',
    payloadKg: 2567,
    payloadClass: 'above-1-5-ton',
    bodyLengthFt: 10.7,
    sizeClass: 'large-deck',
    applications: ['Pickup cargo', 'Urban deliveries', 'Highway logistics'],
  },
  {
    id: 'partner-municipal',
    slug: 'partner-municipal',
    name: 'Partner – Municipal Applications',
    categoryId: 'light',
    imageUrl: partnerMunicipalCard,
    imageAlt: 'Ashok Leyland Partner municipal tipper truck',
    metricLabel: 'Payload',
    metricValue: '3,760 – 4,885 kg',
    fuelType: 'Diesel',
    usageLabel: 'Application',
    usageValue: 'Municipal',
    shortSpecification: 'ZD30 DDTi Partner platform for sky lift, sweeper, tipper and municipal bodies',
    route: '/commercial/light/partner-municipal',
    series: 'Partner',
    payloadKg: 3760,
    payloadClass: 'above-1-5-ton',
    sizeClass: 'heavy-duty',
    applications: [
      'Municipal waste collection',
      'Road sweeping',
      'Sky lift maintenance',
      'Water tanker and fire fighting',
    ],
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
    id: 'avtr-4925h-dtla',
    slug: 'avtr-4925h-dtla',
    name: 'AVTR 4925H DTLA',
    categoryId: 'medium-heavy',
    imageUrl: avtr4925hDtlaStudioExterior,
    metricLabel: 'GVW',
    metricValue: '49T',
    fuelType: 'Diesel',
    usageLabel: 'Application',
    usageValue: 'Long-haul logistics',
    shortSpecification: 'H Series 6-cylinder 49T haulage truck with 184 kW and rear air suspension',
    route: '/commercial/medium-heavy/avtr-4925h-dtla',
    series: 'AVTR',
    sizeClass: 'heavy-duty',
    applications: ['Market load', 'Cement', 'Iron and steel', 'Tanker', 'Construction material'],
  },
  {
    id: 'avtr-10x2',
    slug: 'avtr-10x2',
    name: 'AVTR 10X2',
    categoryId: 'medium-heavy',
    imageUrl: avtr10x2StudioExterior,
    metricLabel: 'GVW',
    metricValue: '42–48T',
    fuelType: 'Diesel',
    usageLabel: 'Application',
    usageValue: 'Multi-axle haulage',
    shortSpecification: 'H Series BS-VI i-Gen6 10X2 haulage truck with 42–48T GVW and loading span 7.7–9.7 m',
    route: '/commercial/medium-heavy/avtr-10x2',
    series: 'AVTR',
    sizeClass: 'heavy-duty',
    applications: ['High payload logistics', 'Long-haul freight', 'Multi-axle haulage'],
  },
  {
    id: '10x4-tipper',
    slug: '10x4-tipper',
    name: '10X4 Tipper',
    categoryId: 'medium-heavy',
    imageUrl: tipper10x4Hero,
    metricLabel: 'GVW',
    metricValue: '48T',
    fuelType: 'Diesel',
    usageLabel: 'Application',
    usageValue: 'Heavy tipper',
    shortSpecification: 'H Series 6-cylinder 184 kW tipper with 18–29 CBM load body and Premium N cabin',
    route: '/commercial/medium-heavy/10x4-tipper',
    series: 'AVTR',
    sizeClass: 'heavy-duty',
    applications: ['Construction', 'Mining', 'Infrastructure'],
  },
  {
    id: 'transit-mixer',
    slug: 'transit-mixer',
    name: 'Transit Mixer',
    categoryId: 'medium-heavy',
    imageUrl: transitMixerStudio,
    metricLabel: 'GVW',
    metricValue: '28–35T',
    fuelType: 'Diesel',
    usageLabel: 'Application',
    usageValue: 'Ready-mix concrete',
    shortSpecification: 'H Series 147 kW transit mixer with 6–7 CBM drum and tiltable cargo day cabin',
    route: '/commercial/medium-heavy/transit-mixer',
    series: 'AVTR',
    sizeClass: 'heavy-duty',
    applications: ['Ready-mix concrete', 'Construction sites', 'Infrastructure'],
  },
  {
    id: '6x4-tractor',
    slug: '6x4-tractor',
    name: '6X4 Tractor',
    categoryId: 'medium-heavy',
    imageUrl: tractor6x4Studio,
    metricLabel: 'GCW',
    metricValue: '55T',
    fuelType: 'Diesel',
    usageLabel: 'Application',
    usageValue: 'Tractor trailer',
    shortSpecification: 'H6 6L 184 kW tractor with 55,000 kg GCW for 3-axle trailer operations',
    route: '/commercial/medium-heavy/6x4-tractor',
    series: 'AVTR',
    sizeClass: 'heavy-duty',
    applications: ['Heavy cargo', 'Tip trailer', 'Long-haul tractor trailer'],
  },
];

export const commercialModels = [...lightCommercialVehicles, ...mediumHeavyCommercialVehicles];
