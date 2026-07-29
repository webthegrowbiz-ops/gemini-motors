/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useMemo, useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';

import {
  CommercialCategoryId,
  CommercialVehicleModel,
  commercialCategories,
  lightCommercialVehicles,
  mediumHeavyCommercialVehicles,
} from '../../data/commercialVehiclesData';
import { AppDivision } from '../../types';
import CommercialVehicleCard from './CommercialVehicleCard';

interface CommercialCategoryScreenProps {
  categoryId: CommercialCategoryId;
  onNavigate: (division: AppDivision) => void;
  onViewProduct: (route: string) => void;
}

interface VehicleFilter {
  id: string;
  label: string;
  predicate: (model: CommercialVehicleModel) => boolean;
}

const payloadLabels: Record<string, string> = {
  'up-to-1-ton': 'Up to 1 Ton',
  '1-to-1-5-ton': '1-1.5 Ton',
  'above-1-5-ton': 'Above 1.5 Ton',
};

const sizeLabels: Record<string, string> = {
  compact: 'Compact',
  'large-deck': 'Large Deck',
  'heavy-duty': 'Heavy Duty',
};

function buildFilters(models: CommercialVehicleModel[]): VehicleFilter[] {
  const filters: VehicleFilter[] = [
    {
      id: 'all',
      label: 'All',
      predicate: () => true,
    },
  ];

  const payloadClasses = Array.from(new Set(models.map((model) => model.payloadClass).filter(Boolean)));
  payloadClasses.forEach((payloadClass) => {
    filters.push({
      id: `payload-${payloadClass}`,
      label: payloadLabels[payloadClass] || payloadClass,
      predicate: (model) => model.payloadClass === payloadClass,
    });
  });

  const sizeClasses = Array.from(new Set(models.map((model) => model.sizeClass).filter(Boolean)));
  sizeClasses.forEach((sizeClass) => {
    filters.push({
      id: `size-${sizeClass}`,
      label: sizeLabels[sizeClass] || sizeClass,
      predicate: (model) => model.sizeClass === sizeClass,
    });
  });

  const seriesNames = Array.from(new Set(models.map((model) => model.series).filter(Boolean)));
  seriesNames.forEach((series) => {
    filters.push({
      id: `series-${series?.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
      label: series || '',
      predicate: (model) => model.series === series,
    });
  });

  const bodyLengths = Array.from(new Set(models.map((model) => model.bodyLengthFt).filter(Boolean))).sort((a, b) => Number(a) - Number(b));
  bodyLengths.forEach((bodyLength) => {
    filters.push({
      id: `body-${bodyLength}`,
      label: `${bodyLength} ft body`,
      predicate: (model) => model.bodyLengthFt === bodyLength,
    });
  });

  return filters;
}

export default function CommercialCategoryScreen({ categoryId, onNavigate, onViewProduct }: CommercialCategoryScreenProps) {
  const [activeFilterId, setActiveFilterId] = useState('all');
  const category = commercialCategories.find((item) => item.id === categoryId) || commercialCategories[0];

  const models = useMemo(
    () => (category.id === 'light' ? lightCommercialVehicles : mediumHeavyCommercialVehicles),
    [category.id],
  );
  const filters = useMemo(() => buildFilters(models), [models]);
  const activeFilter = filters.find((filter) => filter.id === activeFilterId) || filters[0];
  const filteredModels = useMemo(() => models.filter((model) => activeFilter.predicate(model)), [activeFilter, models]);

  useEffect(() => {
    const title =
      category.id === 'light'
        ? 'Light Commercial Vehicles Goa | LCV at Gemini Motors Goa'
        : 'M&HCV Dealer Goa | Medium & Heavy Commercial Vehicles';
    const description =
      category.id === 'light'
        ? 'Explore LCV in Goa including DOST, SAATHI and other light commercial vehicles available through Gemini Motors Goa.'
        : 'Explore medium and heavy commercial vehicles for cargo, construction, logistics and fleet requirements through Gemini Motors Goa.';
    const canonicalPath = category.route;

    document.title = title;
    let descriptionMeta = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (!descriptionMeta) {
      descriptionMeta = document.createElement('meta');
      descriptionMeta.name = 'description';
      document.head.appendChild(descriptionMeta);
    }
    descriptionMeta.content = description;

    let canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = `${window.location.origin}${canonicalPath}`;

    let ogTitle = document.querySelector<HTMLMetaElement>('meta[property="og:title"]');
    if (!ogTitle) {
      ogTitle = document.createElement('meta');
      ogTitle.setAttribute('property', 'og:title');
      document.head.appendChild(ogTitle);
    }
    ogTitle.content = title;

    let ogDescription = document.querySelector<HTMLMetaElement>('meta[property="og:description"]');
    if (!ogDescription) {
      ogDescription = document.createElement('meta');
      ogDescription.setAttribute('property', 'og:description');
      document.head.appendChild(ogDescription);
    }
    ogDescription.content = description;
  }, [category.id, category.route]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      <section className="mx-auto max-w-7xl px-6 pt-8 md:px-16">
        <motion.nav
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="flex flex-wrap items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-wider text-slate-500"
        >
          <button type="button" onClick={() => onNavigate('gemini-motors')} className="transition-colors hover:text-[#1f5fae]">
            Home
          </button>
          <ChevronRight size={13} />
          <button type="button" onClick={() => onNavigate('commercial')} className="transition-colors hover:text-[#1f5fae]">
            Commercial Vehicles
          </button>
          <ChevronRight size={13} />
          <span className="text-slate-950">{category.title}</span>
        </motion.nav>
      </section>

      <section className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-6 py-8 md:px-16 lg:grid-cols-12 lg:items-start">
        <motion.aside
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-3xl bg-[#07111f] text-white shadow-2xl shadow-slate-950/18 lg:sticky lg:top-28 lg:col-span-5 lg:min-h-[calc(100vh-9rem)]"
        >
          <img src={category.imageUrl} alt={category.title} className="absolute inset-0 h-full w-full object-cover opacity-70" loading="eager" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_18%,rgba(230,169,76,0.18),transparent_30%),linear-gradient(180deg,rgba(7,17,31,0.24),rgba(7,17,31,0.96)_76%)]" />
          <div className="relative z-10 flex min-h-[420px] flex-col justify-end p-7 md:p-9 lg:min-h-[calc(100vh-9rem)]">
            <span className="mb-4 w-max rounded-lg border border-white/20 bg-white/12 px-3 py-1.5 font-mono text-[10px] font-bold uppercase tracking-wider text-blue-200 backdrop-blur">
              {models.length} models available
            </span>
            <h1 className="font-display text-4xl font-extrabold leading-tight tracking-tight md:text-5xl">{category.title}</h1>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-slate-300 md:text-base">{category.description}</p>
            <div className="mt-7 h-1 w-24 rounded-full bg-gradient-to-r from-[#1f5fae] to-[#e6a94c]" />
          </div>
        </motion.aside>

        <div className="lg:col-span-7">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.1, ease: 'easeOut' }}
            className="mb-6 flex flex-col justify-between gap-3 border-b border-slate-200 pb-5 md:flex-row md:items-end"
          >
            <div>
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-[#1f5fae]">
                Vehicle Models
              </p>
              <h2 className="mt-2 font-display text-3xl font-extrabold tracking-tight text-slate-950">
                Select your model
              </h2>
            </div>
            <p className="text-sm text-slate-500">Tap a model to continue to product details.</p>
          </motion.div>

          <div className="mb-6 flex flex-wrap gap-2" role="list" aria-label={`${category.title} filters`}>
            {filters.map((filter) => (
              <button
                key={filter.id}
                type="button"
                onClick={() => setActiveFilterId(filter.id)}
                aria-pressed={activeFilter.id === filter.id}
                className={`min-h-10 rounded-full border px-4 text-xs font-extrabold uppercase tracking-wider transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1f5fae] ${
                  activeFilter.id === filter.id
                    ? 'border-[#1f5fae] bg-[#1f5fae] text-white shadow-lg shadow-blue-950/12'
                    : 'border-slate-200 bg-white text-slate-600 hover:border-blue-200 hover:bg-blue-50 hover:text-[#1f5fae]'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {filteredModels.map((model, index) => (
              <motion.div
                key={model.id}
                initial={{ opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-70px' }}
                transition={{ duration: 0.42, delay: index * 0.045, ease: 'easeOut' }}
              >
                <CommercialVehicleCard model={model} onViewDetails={() => onViewProduct(model.route)} />
              </motion.div>
            ))}
          </div>
          {filteredModels.length === 0 && (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center">
              <p className="font-display text-xl font-extrabold text-slate-950">No vehicles match this filter.</p>
              <p className="mt-2 text-sm text-slate-500">Choose another capacity, size or series to continue browsing.</p>
            </div>
          )}
        </div>
      </section>
    </motion.div>
  );
}
