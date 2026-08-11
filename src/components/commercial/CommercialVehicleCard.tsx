/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

import { CommercialVehicleModel } from '../../data/commercialVehiclesData';

interface CommercialVehicleCardProps {
  model: CommercialVehicleModel;
  onViewDetails: () => void;
}

export default function CommercialVehicleCard({ model, onViewDetails }: CommercialVehicleCardProps) {
  const isPartnerMunicipal = model.slug === 'partner-municipal';

  return (
    <motion.button
      type="button"
      onClick={onViewDetails}
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="group relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-white/20 bg-[#07111f] text-left shadow-sm outline-none transition-all duration-300 hover:-translate-y-1 hover:border-[#1f5fae]/35 hover:shadow-2xl hover:shadow-blue-950/18 focus-visible:ring-2 focus-visible:ring-[#e6a94c]"
    >
      <img
        src={model.imageUrl}
        alt={model.imageAlt || model.name}
        className={`absolute inset-0 h-full w-full object-cover object-center transition-transform duration-300 ease-out ${isPartnerMunicipal ? 'scale-[1.44] group-hover:scale-[1.5]' : 'group-hover:scale-105'}`}
        loading="lazy"
      />
      <div className={`absolute inset-0 transition-opacity duration-300 group-hover:opacity-95 ${isPartnerMunicipal ? 'bg-gradient-to-b from-black/82 via-black/30 to-transparent' : 'bg-gradient-to-t from-black/78 via-black/24 to-transparent'}`} />
      <div className="absolute inset-0 translate-x-[-120%] bg-gradient-to-r from-transparent via-white/14 to-transparent transition-transform duration-700 group-hover:translate-x-[120%]" />
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#1f5fae] via-[#4a7fd1] to-[#e6a94c]" />
      <div className={`relative z-10 flex h-full flex-col p-5 ${isPartnerMunicipal ? 'justify-start pt-7' : 'justify-end'}`}>
        <div className="transition-transform duration-300 group-hover:-translate-y-1">
          <div className="mb-3 flex flex-wrap gap-2">
            {model.series && (
              <span className="rounded-full border border-white/18 bg-white/14 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-md">
                {model.series}
              </span>
            )}
            {model.bodyLengthFt && (
              <span className="rounded-full border border-white/18 bg-white/14 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-md">
                {model.bodyLengthFt} ft body
              </span>
            )}
          </div>
          <h3 className="max-w-[78%] font-display text-xl font-extrabold leading-tight tracking-tight text-white drop-shadow-md">
          {model.name}
          </h3>
          <div className="mt-3 grid grid-cols-2 gap-2 text-[11px] font-bold text-white/88">
            <span>{model.metricLabel}: {model.metricValue}</span>
            <span>{model.usageLabel}: {model.usageValue}</span>
          </div>
          {model.startingPrice && model.metricLabel !== 'Price' && (
            <p className="mt-2 text-[11px] font-bold text-[#f0d08a]">
              Starting {model.startingPrice}
            </p>
          )}
          {model.isGenericPlaceholderImage && (
            <p className="mt-2 text-[10px] font-semibold uppercase tracking-wider text-blue-100/90">
              Reference image
            </p>
          )}
          <span className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/18 bg-white/14 px-4 py-2 text-xs font-bold uppercase tracking-wider text-white shadow-lg shadow-slate-950/20 backdrop-blur-md transition-all duration-300 group-hover:translate-x-1 group-hover:border-[#e6a94c]/50 group-hover:bg-white/20">
            View Details
            <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
          </span>
        </div>
      </div>
      <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-transparent transition-all duration-500 group-hover:ring-[#e6a94c]/35" />
    </motion.button>
  );
}
