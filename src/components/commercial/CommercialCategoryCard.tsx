/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

import { CommercialCategory } from '../../data/commercialVehiclesData';

interface CommercialCategoryCardProps {
  category: CommercialCategory;
  onSelect: () => void;
}

export default function CommercialCategoryCard({ category, onSelect }: CommercialCategoryCardProps) {
  return (
    <motion.button
      type="button"
      onClick={onSelect}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="group relative min-h-[58vh] overflow-hidden rounded-3xl border border-white/20 bg-[#07111f] text-left shadow-2xl shadow-slate-950/20 outline-none transition-shadow duration-500 hover:shadow-blue-950/30 focus-visible:ring-2 focus-visible:ring-[#e6a94c]"
    >
      <div className="absolute inset-0 overflow-hidden">
        <img
          src={category.imageUrl}
          alt={category.title}
          className="h-full w-full object-cover opacity-86 transition-transform duration-[1200ms] ease-out group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_22%,rgba(31,95,174,0.22),transparent_35%),linear-gradient(180deg,rgba(7,17,31,0.10),rgba(7,17,31,0.92)_78%)]" />
        <div className="absolute inset-0 translate-x-[-120%] bg-gradient-to-r from-transparent via-white/12 to-transparent transition-transform duration-1000 group-hover:translate-x-[120%]" />
      </div>
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#1f5fae] via-[#4a7fd1] to-[#e6a94c] opacity-80" />
      <div className="relative z-10 flex min-h-[58vh] flex-col justify-end p-6 md:p-8 lg:p-10">
        <span className="mb-4 w-max rounded-lg border border-white/20 bg-white/12 px-3 py-1.5 font-mono text-[10px] font-bold uppercase tracking-wider text-white shadow-sm backdrop-blur">
          {category.modelCount}
        </span>
        <h3 className="max-w-md font-display text-4xl font-extrabold leading-tight tracking-tight text-white md:text-5xl">
          {category.title}
        </h3>
        <p className="mt-4 max-w-md text-sm leading-relaxed text-slate-300 md:text-base">{category.description}</p>
        <span className="mt-7 inline-flex w-max items-center gap-2 overflow-hidden rounded-lg bg-white px-5 py-3 text-xs font-bold uppercase tracking-wider text-slate-950 shadow-lg shadow-slate-950/20 transition-all duration-300 group-hover:bg-[#e6a94c] group-hover:text-slate-950">
          {category.ctaLabel}
          <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
        </span>
      </div>
      <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/10 transition-all duration-500 group-hover:ring-[#e6a94c]/45" />
    </motion.button>
  );
}
