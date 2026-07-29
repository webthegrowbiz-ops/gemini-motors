/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Truck } from 'lucide-react';
import { motion } from 'motion/react';

import commercialTruck from '../../assets/images/commercial_truck.jpg';
import { commercialCategories } from '../../data/commercialVehiclesData';
import { AppDivision } from '../../types';
import CommercialCategoryCard from './CommercialCategoryCard';

interface CommercialVehiclesScreenProps {
  onNavigate: (division: AppDivision) => void;
}

export default function CommercialVehiclesScreen({ onNavigate }: CommercialVehiclesScreenProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <section className="relative overflow-hidden bg-[#07111f] py-12 text-white md:py-16">
        <motion.img
          src={commercialTruck}
          alt="Gemini Motors commercial vehicle lineup"
          className="absolute inset-0 h-full w-full object-cover opacity-34"
          initial={{ scale: 1.05, opacity: 0 }}
          animate={{ scale: 1.01, opacity: 0.34 }}
          transition={{ duration: 1.15, ease: 'easeOut' }}
          loading="eager"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_82%_30%,rgba(230,169,76,0.16),transparent_31%),linear-gradient(90deg,rgba(7,17,31,0.98),rgba(7,17,31,0.88)_42%,rgba(7,17,31,0.42))]" />
        <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-16">
          <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-500/15 px-3 py-1 font-mono text-xs font-bold uppercase tracking-wider text-blue-300">
            <Truck size={13} />
            Commercial Vehicles
          </span>
          <div className="max-w-3xl">
            <h1 className="font-display text-4xl font-extrabold leading-tight tracking-tight md:text-5xl">
              Commercial Vehicles
            </h1>
            <p className="mt-5 text-base leading-relaxed text-slate-300 md:text-lg">
              Explore commercial vehicle solutions for city deliveries, regional logistics and heavy-duty transport.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10 md:px-16 md:py-12">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end"
        >
          <div>
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-[#1f5fae]">
              Choose your vehicle segment
            </p>
            <h2 className="mt-2 font-display text-3xl font-extrabold tracking-tight text-slate-950">
              Explore by vehicle class
            </h2>
          </div>
        </motion.div>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {commercialCategories.map((category) => (
            <div key={category.id}>
              <CommercialCategoryCard category={category} onSelect={() => onNavigate(category.routeDivision)} />
            </div>
          ))}
        </div>
      </section>
    </motion.div>
  );
}
