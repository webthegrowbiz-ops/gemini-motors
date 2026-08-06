/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import switchIev3Card from '../assets/images/switch-iev3-card.png';
import switchIev4Card from '../assets/images/switch-iev4-card.png';
import switchIev4GarbageTipperCard from '../assets/images/switch-iev4-garbage-tipper-card.png';
import { CommercialVehicleModel } from './commercialVehiclesData';

/** SWITCH / EV listing models — shaped for CommercialVehicleCard reuse. */
export const switchElectricVehicles: CommercialVehicleModel[] = [
  {
    id: 'switch-iev4',
    slug: 'switch-iev4',
    name: 'SWITCH IeV4',
    categoryId: 'light',
    imageUrl: switchIev4Card,
    imageAlt: 'SWITCH IeV4 intelligent electric commercial vehicle',
    metricLabel: 'Payload',
    metricValue: '1,750 kg',
    fuelType: 'Electric',
    usageLabel: 'Body Type',
    usageValue: 'FSD',
    shortSpecification: '32.2 kWh LFP battery with 130 km range and 60 kW / 230 Nm',
    route: '/electric-mobility/switch-iev4',
    series: 'SWITCH IeV4',
    payloadKg: 1750,
    payloadClass: 'above-1-5-ton',
    bodyLengthFt: 9.7,
    sizeClass: 'large-deck',
    applications: [
      'Parcel & courier',
      'Ecommerce',
      'FMCG',
      'Organized retail',
      'White goods',
      'Beverages',
      'LPG',
      'Industrial goods',
    ],
  },
  {
    id: 'switch-iev4-garbage-tipper',
    slug: 'switch-iev4-garbage-tipper',
    name: 'SWITCH IeV4 – Garbage Tipper Truck',
    categoryId: 'light',
    imageUrl: switchIev4GarbageTipperCard,
    imageAlt: 'SWITCH IeV4 garbage tipper truck with green and blue tipper body',
    metricLabel: 'Payload',
    metricValue: 'Municipal tipper',
    fuelType: 'Electric',
    usageLabel: 'Application',
    usageValue: 'Garbage tipper',
    shortSpecification: 'SWITCH IeV4 electric platform configured as a garbage tipper truck',
    route: '/electric-mobility/switch-iev4-garbage-tipper',
    series: 'SWITCH IeV4',
    payloadClass: 'above-1-5-ton',
    sizeClass: 'large-deck',
    applications: ['Municipal waste collection', 'Garbage tipper operations', 'Urban sanitation routes'],
  },
  {
    id: 'switch-iev3',
    slug: 'switch-iev3',
    name: 'SWITCH IeV3',
    categoryId: 'light',
    imageUrl: switchIev3Card,
    imageAlt: 'SWITCH IeV3 intelligent electric commercial vehicle',
    metricLabel: 'Payload',
    metricValue: '1,250 kg',
    fuelType: 'Electric',
    usageLabel: 'Body Type',
    usageValue: 'FSD',
    shortSpecification: '25.6 kWh lithium-ion battery with 140 km range and 40 kW / 190 Nm',
    route: '/electric-mobility/switch-iev3',
    series: 'SWITCH IeV3',
    payloadKg: 1250,
    payloadClass: '1-to-1-5-ton',
    bodyLengthFt: 8.6,
    sizeClass: 'large-deck',
    applications: [
      'Parcel & courier',
      'Ecommerce',
      'FMCG',
      'Organized retail',
      'White goods',
      'Beverages',
      'LPG',
      'Industrial goods',
    ],
  },
];
