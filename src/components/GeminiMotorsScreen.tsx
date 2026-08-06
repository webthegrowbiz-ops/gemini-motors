/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { RefObject, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import {
  ArrowRight,
  BadgeIndianRupee,
  BatteryCharging,
  Building2,
  Calendar,
  Clock,
  FileText,
  Fuel,
  MapPin,
  MessageCircle,
  PackageCheck,
  PhoneCall,
  ShieldCheck,
  Sparkles,
  Truck,
  Wrench,
  X,
  Zap,
} from 'lucide-react';

import businessJourney from '../assets/images/business_journey.jpg';
import commercialTruck from '../assets/images/commercial_truck.jpg';
import dostXlExterior from '../assets/images/dost_xl_exterior.jpg';
import dostXlHeroReplacement from '../assets/images/dost-xl-hero-replacement.png';
import sustainableGrowth from '../assets/images/sustainable_growth.jpg';
import tipper8x4HighwayExterior from '../assets/images/tipper_8x4_highway_exterior.jpg';
import { WHATSAPP_URL } from '../data';
import { lightCommercialVehicles, mediumHeavyCommercialVehicles } from '../data/commercialVehiclesData';

interface GeminiMotorsScreenProps {
  onContactClick: (prefilledSubject?: string) => void;
}

const revealTransition = { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const };

const trustItems = [
  { label: '20+ Years of Experience', Icon: ShieldCheck },
  { label: 'Authorized Dealership', Icon: Building2 },
  { label: '100% Genuine Parts', Icon: PackageCheck },
  { label: '3 Service Centres', Icon: MapPin },
  { label: 'Flexible Finance', Icon: BadgeIndianRupee },
];

const vehicleCategories = [
  {
    title: 'LCV',
    subtitle: 'Agile vehicles for city deliveries, retail routes and growing local businesses.',
    image: dostXlExterior,
    route: '/commercial/light/',
  },
  {
    title: 'M&HCV',
    subtitle: 'High-capacity haulage and construction-ready platforms for serious fleet work.',
    image: tipper8x4HighwayExterior,
    route: '/commercial/medium-heavy/',
  },
];

const serviceItems = [
  { label: 'Vehicle Service', Icon: Wrench },
  { label: 'Genuine Parts', Icon: PackageCheck },
  { label: 'Roadside Assistance', Icon: PhoneCall },
  { label: 'Fleet Maintenance', Icon: Truck },
  { label: 'AMC Support', Icon: ShieldCheck },
  { label: 'Service Booking', Icon: Calendar },
];

const featuredVehicles = [
  // Temporarily disabled - Gemini L-Series 2.5T
  // Uncomment this line (and remove the Bada Dost i5+ stand-in below) to restore L-Series on the homepage.
  // lightCommercialVehicles.find((vehicle) => vehicle.slug === 'gemini-l-series-25t'),
  lightCommercialVehicles.find((vehicle) => vehicle.slug === 'bada-dost-i5-plus'),
  lightCommercialVehicles.find((vehicle) => vehicle.slug === 'dost-plus-xl'),
  mediumHeavyCommercialVehicles[0],
  mediumHeavyCommercialVehicles[5],
].filter(Boolean);

const financeItems = [
  { label: 'Flexible EMI Plans', Icon: Zap },
  { label: 'Leading Bank Partners', Icon: Building2 },
  { label: 'Easy Documentation', Icon: FileText },
  { label: 'Business and Fleet Finance', Icon: BadgeIndianRupee },
];

const currencyFormatter = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0,
});

const formatCurrency = (value: number) => currencyFormatter.format(Math.max(0, Math.round(value)));

const calculateEmi = (principal: number, annualRate: number, tenureMonths: number) => {
  if (principal <= 0 || tenureMonths <= 0) {
    return { monthlyEmi: 0, totalInterest: 0, totalPayable: 0 };
  }

  const monthlyRate = annualRate / 12 / 100;
  const monthlyEmi =
    monthlyRate === 0
      ? principal / tenureMonths
      : (principal * monthlyRate * (1 + monthlyRate) ** tenureMonths) / ((1 + monthlyRate) ** tenureMonths - 1);
  const totalPayable = monthlyEmi * tenureMonths;

  return {
    monthlyEmi,
    totalInterest: totalPayable - principal,
    totalPayable,
  };
};

const testimonials = [
  {
    quote: 'Gemini Motors helped us choose the right vehicle mix for daily delivery routes without overcomplicating the process.',
    name: 'Logistics Business Owner',
    role: 'Fleet operator',
  },
  {
    quote: 'Service support and genuine parts availability have made our fleet planning far easier.',
    name: 'Regional Distributor',
    role: 'LCV customer',
  },
  {
    quote: 'The team understands commercial vehicles, finance, and uptime. That matters when vehicles are earning every day.',
    name: 'Construction Supplier',
    role: 'M&HCV customer',
  },
];

export default function GeminiMotorsScreen({ onContactClick }: GeminiMotorsScreenProps) {
  const heroRef = useRef<HTMLElement>(null);
  const inventoryRef = useRef<HTMLElement>(null);
  const serviceRef = useRef<HTMLElement>(null);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [isEmiOpen, setIsEmiOpen] = useState(false);
  const [isMobileViewport, setIsMobileViewport] = useState(() => window.matchMedia('(max-width: 767px)').matches);
  const [vehiclePrice, setVehiclePrice] = useState(1800000);
  const [downPayment, setDownPayment] = useState(300000);
  const [interestRate, setInterestRate] = useState(10.5);
  const [loanTenure, setLoanTenure] = useState(48);
  const [tenureUnit, setTenureUnit] = useState<'months' | 'years'>('months');
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const heroImageY = useTransform(scrollYProgress, [0, 1], prefersReducedMotion ? [0, 0] : [0, 46]);
  const heroCardY = useTransform(scrollYProgress, [0, 1], prefersReducedMotion ? [0, 0] : [0, -24]);
  const loanAmount = Math.max(0, vehiclePrice - downPayment);
  const tenureMonths = tenureUnit === 'years' ? loanTenure * 12 : loanTenure;
  const emiResult = calculateEmi(loanAmount, interestRate, tenureMonths);
  const isEmiVisible = !isMobileViewport || isEmiOpen;

  const scrollToSection = (sectionRef: RefObject<HTMLElement | null>) => {
    sectionRef.current?.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth', block: 'start' });
  };

  const handleEmiQuoteClick = () => {
    if (isMobileViewport) setIsEmiOpen(false);

    const enquiryTarget =
      document.getElementById('product-enquiry') ||
      document.getElementById('enquiry') ||
      document.querySelector('form')?.closest('section');

    if (enquiryTarget instanceof HTMLElement) {
      enquiryTarget.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth', block: 'start' });
      return;
    }

    onContactClick('Exact EMI quote for commercial vehicle finance');
  };

  const navigateToRoute = (route: string) => {
    window.history.pushState(null, '', route);
    window.dispatchEvent(new PopStateEvent('popstate'));
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
  };

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 767px)');
    const handleViewportChange = () => setIsMobileViewport(mediaQuery.matches);

    handleViewportChange();
    mediaQuery.addEventListener('change', handleViewportChange);

    return () => mediaQuery.removeEventListener('change', handleViewportChange);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) return;

    const intervalId = window.setInterval(() => {
      setActiveTestimonial((current) => (current + 1) % testimonials.length);
    }, 4200);

    return () => window.clearInterval(intervalId);
  }, [prefersReducedMotion]);

  return (
    <div className="overflow-hidden bg-[#f8f9ff] text-[#0b1c30]">
      <section
        ref={heroRef}
        className="relative flex min-h-[75vh] items-center overflow-hidden bg-[#0c111d] bg-gradient-to-br from-[#0c111d] via-[#121a2c] to-[#080d17] py-24 text-white"
      >
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <motion.img
            src={dostXlHeroReplacement}
            alt="DOST XL Twin Fuel pickup on highway"
            className="h-[112%] w-full object-cover opacity-[0.14] brightness-90 saturate-[0.85]"
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 0.14, scale: 1.02 }}
            style={{ y: heroImageY }}
            transition={{ duration: 1.1, ease: 'easeOut' }}
          />
        </div>

        <div className="pointer-events-none absolute left-1/4 top-1/4 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="pointer-events-none absolute bottom-1/4 right-1/4 h-96 w-96 translate-x-1/2 translate-y-1/2 rounded-full bg-emerald-500/5 blur-3xl" />

        <div className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 px-6 md:px-16 lg:grid-cols-12">
          <motion.div
            initial={{ opacity: 0, y: 34 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: 'easeOut' }}
            className="lg:col-span-7"
          >
            <motion.span
              initial={{ opacity: 0, x: -14 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.12, ease: 'easeOut' }}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-500/15 px-3 py-1 font-mono text-xs font-bold uppercase tracking-wider text-blue-300"
            >
              <Sparkles size={12} className="text-blue-400" />
              Reliability Powered by Engineering
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.08, ease: 'easeOut' }}
              className="mb-6 font-display text-5xl font-extrabold leading-tight tracking-tight text-white md:text-6xl"
            >
              Powering Every <br />
              <span className="text-blue-400">Business Journey</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.18, ease: 'easeOut' }}
              className="mb-10 max-w-xl text-base leading-relaxed text-gray-300 md:text-lg"
            >
              Commercial Vehicles, Electric Mobility & Reliable Power Solutions. Contact Us for Pricing. From urban
              last-mile distribution to cross-continental bulk transport, Gemini Motors provides the fleet performance
              you can trust.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.28, ease: 'easeOut' }}
              className="flex flex-wrap gap-4"
            >
              <button
                type="button"
                onClick={() => scrollToSection(inventoryRef)}
                className="group inline-flex cursor-pointer items-center gap-2 rounded-lg bg-blue-600 px-8 py-4 text-sm font-bold uppercase tracking-wider text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-blue-500/25 active:scale-95"
              >
                Explore Fleet
                <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
              </button>
              <button
                type="button"
                onClick={() => navigateToRoute('/services/')}
                className="group inline-flex cursor-pointer items-center gap-2 rounded-lg border border-white/40 px-8 py-4 text-sm font-bold uppercase tracking-wider text-white transition-all duration-300 hover:-translate-y-0.5 hover:border-white hover:bg-white/10 active:scale-95"
              >
                Book Service
                <Wrench size={16} className="transition-transform duration-300 group-hover:rotate-6" />
              </button>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{ y: heroCardY }}
            transition={{ duration: 0.8, delay: 0.15, ease: 'easeOut' }}
            className="relative lg:col-span-5"
          >
            <div className="absolute -inset-4 -z-10 rounded-2xl bg-blue-500/10 blur-xl" />
            <div className="group relative overflow-hidden rounded-xl border border-slate-700/60 bg-slate-800/80 p-1.5 shadow-2xl">
              <img
                src={dostXlHeroReplacement}
                alt="DOST XL Twin Fuel pickup on highway"
                className="h-[380px] w-full rounded-lg object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              />
              <div className="absolute bottom-4 left-4 right-4 rounded-lg border border-slate-800/60 bg-slate-900/90 p-4 backdrop-blur-md">
                <p className="font-mono text-xs font-bold text-blue-400">OFFICIAL PARTNER</p>
                <p className="mt-1 text-sm font-semibold text-white">Ashok Leyland & Switch Mobility Distributor</p>
              </div>
            </div>
          </motion.div>
        </div>

      </section>

      <section className="border-b border-slate-200/80 bg-white">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-6 gap-y-4 px-6 py-5 md:px-16">
          {trustItems.map(({ label, Icon }, index) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: '-40px' }}
              transition={{ duration: 0.35, delay: index * 0.035, ease: 'easeOut' }}
              className="flex min-w-[180px] flex-1 basis-[180px] items-center justify-center gap-2.5 text-sm font-bold text-slate-700 lg:min-w-0 lg:basis-0"
            >
              <Icon size={18} strokeWidth={2.25} className="shrink-0 text-[#1f5fae]" />
              <span>{label}</span>
            </motion.div>
          ))}
        </div>
      </section>

      <section ref={inventoryRef} className="mx-auto max-w-7xl scroll-mt-28 px-6 py-20 md:px-16">
        <SectionIntro eyebrow="Vehicle Categories" title="Choose the fleet class that fits your route." />
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {vehicleCategories.map((category, index) => (
            <motion.button
              key={category.title}
              type="button"
              onClick={() => navigateToRoute(category.route)}
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: '-80px' }}
              transition={{ ...revealTransition, delay: index * 0.08 }}
              className="group relative min-h-[390px] overflow-hidden rounded-3xl bg-slate-950 text-left shadow-2xl shadow-slate-950/12 outline-none transition-all duration-300 hover:-translate-y-1 hover:shadow-blue-950/20 focus-visible:ring-2 focus-visible:ring-[#e6a94c] md:min-h-[420px]"
            >
              <img
                src={category.image}
                alt={category.title}
                className="absolute inset-0 h-full w-full object-cover opacity-88 transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/88 via-black/42 to-black/8 transition-opacity duration-300 group-hover:opacity-95" />
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#1f5fae] via-[#4a7fd1] to-[#e6a94c]" />
              <div className="relative z-10 flex min-h-[390px] flex-col justify-end p-7 md:min-h-[420px] md:p-9">
                <div className="flex min-h-[190px] flex-col transition-transform duration-300 group-hover:-translate-y-1 md:min-h-[210px]">
                  <h3 className="flex min-h-[54px] items-end whitespace-nowrap font-display text-3xl font-extrabold leading-tight text-white md:min-h-[58px] md:text-4xl">
                    {category.title}
                  </h3>
                  <p className="mt-3 min-h-[68px] max-w-md text-sm leading-relaxed text-slate-200 md:min-h-[50px]">
                    {category.subtitle}
                  </p>
                  <span className="mt-auto inline-flex w-max items-center gap-2 rounded-full border border-white/20 bg-white/14 px-4 py-2 text-xs font-bold uppercase tracking-wider text-white backdrop-blur-md transition-all duration-300 group-hover:translate-x-1 group-hover:border-[#e6a94c]/50 group-hover:bg-white/20">
                    Explore Range
                    <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-6 md:px-16">
          <SectionIntro eyebrow="Featured Vehicles" title="Popular models for commercial routes." />
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {featuredVehicles.map((vehicle, index) => (
              <motion.button
                key={vehicle.id}
                type="button"
                onClick={() => navigateToRoute(vehicle.route)}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, margin: '-70px' }}
                transition={{ duration: 0.42, delay: index * 0.05, ease: 'easeOut' }}
                className="group relative aspect-[4/3] overflow-hidden rounded-2xl bg-slate-950 text-left shadow-sm outline-none transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-blue-950/15 focus-visible:ring-2 focus-visible:ring-[#e6a94c]"
              >
                <img
                  src={vehicle.imageUrl}
                  alt={vehicle.name}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/78 via-black/20 to-transparent" />
                <div className="relative z-10 flex h-full flex-col justify-end p-5">
                  <h3 className="font-display text-xl font-extrabold leading-tight text-white drop-shadow-md">
                    {vehicle.name}
                  </h3>
                  <span className="mt-4 inline-flex w-max items-center gap-2 rounded-full border border-white/18 bg-white/14 px-4 py-2 text-xs font-bold uppercase tracking-wider text-white backdrop-blur-md transition-all duration-300 group-hover:translate-x-1 group-hover:bg-white/20">
                    View Details
                    <ArrowRight size={15} />
                  </span>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 pb-20 md:px-16">
        <motion.div
          layout={!prefersReducedMotion}
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: '-90px' }}
          transition={prefersReducedMotion ? { duration: 0 } : revealTransition}
          className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl bg-[#07111f] text-white shadow-2xl"
        >
          <img src={businessJourney} alt="Gemini Motors finance support" className="absolute inset-0 h-full w-full object-cover opacity-36" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#07111f] via-[#123c70]/92 to-[#1f5fae]/72" />
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-[#07111f]/20 via-[#1f5fae]/18 to-[#e6a94c]/16"
            animate={{ opacity: isEmiVisible ? 1 : 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.45, ease: 'easeOut' }}
          />
          <motion.div
            layout={!prefersReducedMotion}
            className="relative z-10 grid grid-cols-1 gap-8 p-8 md:p-12 lg:grid-cols-12 lg:items-center"
          >
            <div className="lg:col-span-6">
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-blue-200">Finance</p>
              <h2 className="mt-3 font-display text-3xl font-extrabold md:text-5xl">Flexible EMI plans for serious fleet growth.</h2>
            </div>
            <div className="grid gap-4 text-sm md:grid-cols-2 lg:col-span-6">
              {financeItems.map(({ label, Icon }) => (
                <div key={label} className="flex items-center gap-3 rounded-xl border border-white/15 bg-white/10 px-4 py-3 backdrop-blur">
                  <Icon size={18} className="text-[#e6a94c]" />
                  <span className="font-bold">{label}</span>
                </div>
              ))}
              <button
                type="button"
                onClick={() => {
                  if (isMobileViewport) setIsEmiOpen((current) => !current);
                }}
                aria-expanded={isEmiVisible}
                aria-controls="emi-calculator-panel"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-xs font-bold uppercase tracking-wider text-slate-950 transition-all hover:-translate-y-0.5 hover:bg-[#e6a94c]"
              >
                {isMobileViewport && isEmiOpen ? 'Close EMI Calculator' : 'Calculate EMI'}
                <ArrowRight
                  size={15}
                  className={`transition-transform duration-300 ${isMobileViewport && isEmiOpen ? '-rotate-90' : 'rotate-0'}`}
                />
              </button>
              <button
                type="button"
                onClick={() => onContactClick('Finance support for commercial vehicles')}
                className="rounded-xl border border-white/25 bg-white/10 px-5 py-3 text-xs font-bold uppercase tracking-wider text-white transition-all hover:-translate-y-0.5 hover:bg-white/18"
              >
                Talk to Finance Team
              </button>
            </div>
          </motion.div>
          <AnimatePresence initial={false}>
            {isEmiVisible && (
              <motion.div
                id="emi-calculator-panel"
                key="emi-calculator-panel"
                initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 28, height: 0 }}
                animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0, height: 'auto' }}
                exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 18, height: 0 }}
                transition={{ duration: prefersReducedMotion ? 0 : 0.42, ease: [0.22, 1, 0.36, 1] }}
                className="relative z-10 overflow-hidden border-t border-white/12"
              >
                <div className="grid gap-6 p-8 pt-6 md:p-12 md:pt-8 lg:grid-cols-12">
                  <div className="lg:col-span-8">
                    <div className="mb-5 flex items-center justify-between gap-4">
                      <div>
                        <p className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-blue-200">
                          EMI Calculator
                        </p>
                        <p className="mt-1 text-sm text-slate-200">Estimated monthly finance planning for your fleet.</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          if (isMobileViewport) setIsEmiOpen(false);
                        }}
                        aria-label="Close EMI calculator"
                        className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition-all hover:-translate-y-0.5 hover:bg-white/18 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 md:hidden"
                      >
                        <X size={16} />
                      </button>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      <EmiField
                        id="vehicle-price"
                        label="Vehicle Price"
                        value={vehiclePrice}
                        min={100000}
                        max={10000000}
                        step={50000}
                        prefix="₹"
                        onChange={setVehiclePrice}
                      />
                      <EmiField
                        id="down-payment"
                        label="Down Payment"
                        value={downPayment}
                        min={0}
                        max={vehiclePrice}
                        step={25000}
                        prefix="₹"
                        onChange={setDownPayment}
                      />
                      <div>
                        <label
                          htmlFor="loan-amount"
                          className="mb-2 block text-[11px] font-bold uppercase tracking-wider text-blue-100"
                        >
                          Loan Amount
                        </label>
                        <input
                          id="loan-amount"
                          value={formatCurrency(loanAmount)}
                          readOnly
                          className="h-12 w-full rounded-xl border border-white/15 bg-white/10 px-4 text-sm font-bold text-white outline-none backdrop-blur placeholder:text-white/50"
                        />
                      </div>
                      <EmiField
                        id="interest-rate"
                        label="Interest Rate"
                        value={interestRate}
                        min={1}
                        max={24}
                        step={0.1}
                        suffix="%"
                        onChange={setInterestRate}
                      />
                      <div className="md:col-span-2">
                        <label
                          htmlFor="loan-tenure"
                          className="mb-2 block text-[11px] font-bold uppercase tracking-wider text-blue-100"
                        >
                          Loan Tenure
                        </label>
                        <div className="grid gap-3 sm:grid-cols-[1fr_150px]">
                          <input
                            id="loan-tenure"
                            type="number"
                            min={1}
                            max={tenureUnit === 'years' ? 10 : 120}
                            step={1}
                            value={loanTenure}
                            onChange={(event) => setLoanTenure(Math.max(1, Number(event.target.value) || 1))}
                            className="h-12 w-full rounded-xl border border-white/15 bg-white/10 px-4 text-sm font-bold text-white outline-none backdrop-blur transition focus:border-white/35 focus:bg-white/14 focus:ring-2 focus:ring-white/20"
                          />
                          <select
                            value={tenureUnit}
                            onChange={(event) => setTenureUnit(event.target.value as 'months' | 'years')}
                            className="h-12 w-full rounded-xl border border-white/15 bg-white/10 px-4 text-sm font-bold text-white outline-none backdrop-blur transition focus:border-white/35 focus:bg-white/14 focus:ring-2 focus:ring-white/20"
                            aria-label="Loan tenure unit"
                          >
                            <option className="bg-[#07111f]" value="months">
                              Months
                            </option>
                            <option className="bg-[#07111f]" value="years">
                              Years
                            </option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col justify-between rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur-md lg:col-span-4">
                    <div className="space-y-4">
                      <div className="text-center">
                        <p className="text-xs font-bold uppercase tracking-wider text-blue-100">Estimated EMI</p>
                        <motion.p
                          key={Math.round(emiResult.monthlyEmi)}
                          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: prefersReducedMotion ? 0 : 0.22 }}
                          className="mt-2 flex flex-wrap items-baseline justify-center gap-x-2 gap-y-1 font-display font-extrabold leading-none text-white"
                        >
                          <span className="whitespace-nowrap text-[clamp(1.9rem,7vw,2.5rem)]">
                            {formatCurrency(emiResult.monthlyEmi)}
                          </span>
                          <span className="whitespace-nowrap text-sm font-bold text-blue-100">/ month</span>
                        </motion.p>
                      </div>
                      <div className="grid gap-3 text-sm">
                        <div className="flex items-center justify-between gap-4 border-t border-white/10 pt-3">
                          <span className="text-slate-200">Total Interest</span>
                          <span className="font-bold text-white">{formatCurrency(emiResult.totalInterest)}</span>
                        </div>
                        <div className="flex items-center justify-between gap-4 border-t border-white/10 pt-3">
                          <span className="text-slate-200">Total Payable Amount</span>
                          <span className="font-bold text-white">{formatCurrency(emiResult.totalPayable)}</span>
                        </div>
                      </div>
                      <p className="text-xs leading-relaxed text-slate-300">
                        This is a rough planning estimate — your exact EMI depends on the bank/NBFC, tenure and your eligibility.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={handleEmiQuoteClick}
                      className="group mt-5 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#1f5fae] px-5 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-lg shadow-blue-950/20 transition-all hover:-translate-y-0.5 hover:bg-[#2f75c9] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 sm:w-auto sm:self-center"
                    >
                      Get an Exact EMI Quote
                      <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </section>

      <section ref={serviceRef} className="scroll-mt-28 bg-white py-20">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 md:px-16 lg:grid-cols-12 lg:items-center">
          <motion.div
            initial={{ opacity: 0, x: -26 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, margin: '-80px' }}
            transition={revealTransition}
            className="relative overflow-hidden rounded-3xl bg-slate-100 shadow-xl lg:col-span-6"
          >
            <img src={businessJourney} alt="Gemini Motors service centre" className="h-[420px] w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/42 to-transparent" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 26 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, margin: '-80px' }}
            transition={revealTransition}
            className="lg:col-span-6"
          >
            <SectionIntro eyebrow="Services" title="Keep every vehicle route-ready." align="left" />
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {serviceItems.map(({ label, Icon }) => (
                <button
                  key={label}
                  type="button"
          onClick={() => onContactClick(label)}
                  className="group flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-4 text-left font-bold text-slate-800 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#1f5fae]/35 hover:bg-white hover:shadow-lg"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#eef4fb] text-[#1f5fae] transition-colors group-hover:bg-[#1f5fae] group-hover:text-white">
                    <Icon size={19} />
                  </span>
                  {label}
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="px-6 py-20 md:px-16">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: '-90px' }}
          transition={revealTransition}
          className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl bg-slate-950 p-8 text-white shadow-2xl md:p-12"
        >
          <img src={sustainableGrowth} alt="Sustainable fleet technology" className="absolute inset-0 h-full w-full object-cover opacity-24" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_20%,rgba(16,185,129,0.22),transparent_32%),linear-gradient(90deg,rgba(7,17,31,0.96),rgba(15,23,42,0.82))]" />
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/6 to-transparent"
            animate={prefersReducedMotion ? {} : { x: ['-120%', '120%'] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
          />
          <div className="relative z-10 max-w-3xl">
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-emerald-300">Green Technology</p>
            <h2 className="mt-3 font-display text-3xl font-extrabold md:text-5xl">Future-ready mobility for cleaner fleet operations.</h2>
            <div className="mt-6 flex flex-wrap gap-3 text-sm font-bold text-slate-200">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 backdrop-blur"><BatteryCharging size={16} /> Electric Vehicles</span>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 backdrop-blur"><Fuel size={16} /> Alternative Fuels</span>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 backdrop-blur"><ShieldCheck size={16} /> Sustainable Transportation</span>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 backdrop-blur"><Truck size={16} /> Future-ready Fleet Solutions</span>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => navigateToRoute('/electric-mobility/')}
                className="inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 text-xs font-bold uppercase tracking-wider text-slate-950 shadow-lg transition-all hover:-translate-y-0.5 hover:bg-[#e6a94c]"
              >
                Explore EV
                <ArrowRight size={15} />
              </button>
              <button
                type="button"
                onClick={() => navigateToRoute('/green-technologies/')}
                className="inline-flex items-center gap-2 rounded-lg bg-[#1f5fae] px-6 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-lg transition-all hover:-translate-y-0.5 hover:bg-[#2f75c9]"
              >
                Explore Green Tech
                <ArrowRight size={15} />
              </button>
            </div>
          </div>
        </motion.div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 md:px-16 lg:grid-cols-12 lg:items-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: '-80px' }}
            transition={revealTransition}
            className="lg:col-span-6"
          >
            <SectionIntro eyebrow="About Gemini Motors" title="Built around dependable commercial mobility." align="left" />
            <p className="max-w-xl text-sm leading-relaxed text-slate-600">
              Gemini Motors supports businesses with commercial vehicles, official dealership guidance, service support,
              genuine parts, finance assistance and cleaner mobility solutions across Goa.
            </p>
            <div className="mt-6 grid grid-cols-2 gap-4 text-sm sm:grid-cols-4">
              {[
                ['20+', 'Years Experience'],
                ['70+', 'Team Strength'],
                ['3', 'Service Locations'],
                ['100%', 'Customer Commitment'],
              ].map(([value, label]) => (
                <div key={label} className="border-l-2 border-[#1f5fae] pl-3">
                  <p className="font-display text-2xl font-extrabold text-slate-950">{value}</p>
                  <p className="mt-1 text-xs font-bold uppercase tracking-wider text-slate-500">{label}</p>
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={() => navigateToRoute('/about/')}
              className="mt-8 inline-flex items-center gap-2 rounded-lg bg-[#1f5fae] px-6 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-lg transition-all hover:-translate-y-0.5 hover:bg-[#2f75c9]"
            >
              Learn More
              <ArrowRight size={15} />
            </button>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 26 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, margin: '-80px' }}
            transition={revealTransition}
            className="relative min-h-[360px] overflow-hidden rounded-3xl bg-slate-950 shadow-2xl lg:col-span-6"
          >
            <img src={businessJourney} alt="Gemini Motors team and fleet support" className="absolute inset-0 h-full w-full object-cover opacity-82" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/72 via-transparent to-transparent" />
          </motion.div>
        </div>
      </section>

      <section className="px-6 py-20 md:px-16">
        <div className="mx-auto max-w-7xl">
          <SectionIntro eyebrow="Customer Trust" title="Trusted by fleet owners and business operators." />
          <motion.div
            key={activeTestimonial}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="mx-auto max-w-3xl rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-xl shadow-slate-950/5 md:p-10"
          >
            <div className="mb-5 flex justify-center gap-1 text-[#e6a94c]" aria-label="5 star rating">
              {Array.from({ length: 5 }).map((_, index) => (
                <span key={`star-${index}`}>★</span>
              ))}
            </div>
            <p className="font-display text-2xl font-bold leading-snug text-slate-950">
              “{testimonials[activeTestimonial].quote}”
            </p>
            <p className="mt-6 text-sm font-bold text-[#1f5fae]">{testimonials[activeTestimonial].name}</p>
            <p className="mt-1 text-xs font-bold uppercase tracking-wider text-slate-500">
              {testimonials[activeTestimonial].role}
            </p>
          </motion.div>
          <div className="mt-6 flex justify-center gap-2">
            {testimonials.map((testimonial, index) => (
              <button
                key={testimonial.name}
                type="button"
                onClick={() => setActiveTestimonial(index)}
                className={`h-2.5 rounded-full transition-all ${
                  activeTestimonial === index ? 'w-8 bg-[#1f5fae]' : 'w-2.5 bg-slate-300 hover:bg-slate-400'
                }`}
                aria-label={`Show testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-20 md:px-16">
        <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-8 overflow-hidden rounded-3xl bg-[#07111f] p-8 text-white shadow-2xl md:p-12 lg:grid-cols-12 lg:items-center">
          <img
            src={commercialTruck}
            alt="Gemini Motors commercial fleet"
            className="absolute inset-0 h-full w-full object-cover opacity-18"
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_82%_20%,rgba(31,95,174,0.32),transparent_34%),linear-gradient(90deg,rgba(7,17,31,0.98),rgba(7,17,31,0.90)_52%,rgba(7,17,31,0.72))]" />
          <div className="relative z-10 lg:col-span-7">
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-blue-300">Fleet Consultation</p>
            <h2 className="mt-3 max-w-2xl font-display text-3xl font-extrabold leading-tight md:text-5xl">
              Ready to Move Your Business Forward?
            </h2>
            <div className="mt-7 grid gap-3 text-sm text-slate-200 sm:grid-cols-3">
              <span className="inline-flex items-center gap-2 rounded-xl border border-white/12 bg-white/8 px-3 py-2 backdrop-blur">
                <PhoneCall size={16} className="text-blue-300" />
                +91 94223 93288
              </span>
              <span className="inline-flex items-center gap-2 rounded-xl border border-white/12 bg-white/8 px-3 py-2 backdrop-blur">
                <MapPin size={16} className="text-blue-300" />
                Goa, India
              </span>
              <span className="inline-flex items-center gap-2 rounded-xl border border-white/12 bg-white/8 px-3 py-2 backdrop-blur">
                <Clock size={16} className="text-blue-300" />
                Mon-Sat, 9 AM-6 PM
              </span>
            </div>
          </div>
          <div className="relative z-10 flex w-full flex-col justify-center gap-3 sm:flex-row lg:col-span-5">
            <button
              type="button"
              onClick={() => navigateToRoute('/commercial/')}
              className="group inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-white px-5 py-4 text-xs font-bold uppercase tracking-wider text-slate-950 shadow-lg transition-all hover:-translate-y-0.5 hover:bg-[#e6a94c] sm:w-52"
            >
              Explore Vehicles
              <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
            </button>
            <button
              type="button"
              onClick={() => {
                window.open(WHATSAPP_URL, '_blank', 'noopener,noreferrer');
              }}
              className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] px-5 py-4 text-xs font-bold uppercase tracking-wider text-white shadow-lg transition-all hover:-translate-y-0.5 hover:bg-[#20ba5a] sm:w-52"
            >
              <MessageCircle size={15} />
              WhatsApp
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

function SectionIntro({
  eyebrow,
  title,
  align = 'center',
}: {
  eyebrow: string;
  title: string;
  align?: 'left' | 'center';
}) {
  return (
    <div className={align === 'center' ? 'mb-8 text-center' : 'mb-6 text-left'}>
      <p className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-[#1f5fae]">{eyebrow}</p>
      <h2 className="mt-2 font-display text-3xl font-extrabold tracking-tight text-slate-950 md:text-4xl">{title}</h2>
    </div>
  );
}

function EmiField({
  id,
  label,
  value,
  min,
  max,
  step,
  prefix = '',
  suffix = '',
  onChange,
}: {
  id: string;
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  prefix?: string;
  suffix?: string;
  onChange: (value: number) => void;
}) {
  const displayValue = prefix === '₹' ? formatCurrency(value) : `${value}${suffix}`;

  return (
    <div>
      <div className="mb-2 flex items-center justify-between gap-3">
        <label htmlFor={id} className="text-[11px] font-bold uppercase tracking-wider text-blue-100">
          {label}
        </label>
        <span className="text-xs font-bold text-white/80">{displayValue}</span>
      </div>
      <input
        id={id}
        type="number"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(Math.min(max, Math.max(min, Number(event.target.value) || min)))}
        className="h-12 w-full rounded-xl border border-white/15 bg-white/10 px-4 text-sm font-bold text-white outline-none backdrop-blur transition focus:border-white/35 focus:bg-white/14 focus:ring-2 focus:ring-white/20"
      />
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={Math.min(value, max)}
        onChange={(event) => onChange(Number(event.target.value))}
        className="mt-3 h-1.5 w-full accent-[#e6a94c]"
        aria-label={`${label} slider`}
      />
    </div>
  );
}
