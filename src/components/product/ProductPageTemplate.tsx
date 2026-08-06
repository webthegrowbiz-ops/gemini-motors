/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { FormEvent, MouseEvent, useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'motion/react';
import {
  Armchair,
  ArrowRight,
  BadgeIndianRupee,
  BookOpen,
  Boxes,
  BriefcaseBusiness,
  Calculator,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Gauge,
  HardHat,
  Image as ImageIcon,
  MessageCircle,
  PackageCheck,
  Phone,
  Settings,
  ShieldCheck,
  ShoppingBag,
  Snowflake,
  Sparkles,
  Store,
  TrendingUp,
  Truck,
  Wheat,
  Wrench,
  X,
  Zap,
} from 'lucide-react';

import { ProductPageData } from '../../types';
import { WHATSAPP_URL } from '../../data';

export const revealTransition = { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const };

function parseCounterValue(value: string) {
  const match = value.match(/^([^0-9-]*)(-?\d[\d,]*(?:\.\d+)?)(.*)$/);
  if (!match) return null;

  const [, prefix, numericValue, suffix] = match;
  const target = Number(numericValue.replace(/,/g, ''));
  if (!Number.isFinite(target)) return null;

  return {
    prefix,
    target,
    suffix,
    decimals: numericValue.includes('.') ? numericValue.split('.')[1].length : 0,
    useGrouping: numericValue.includes(','),
  };
}

function formatCounterValue(value: number, parsed: NonNullable<ReturnType<typeof parseCounterValue>>) {
  const roundedValue = Number(value.toFixed(parsed.decimals));
  const formattedValue = parsed.useGrouping
    ? roundedValue.toLocaleString('en-IN', {
        maximumFractionDigits: parsed.decimals,
        minimumFractionDigits: parsed.decimals,
      })
    : roundedValue.toFixed(parsed.decimals);

  return `${parsed.prefix}${formattedValue}${parsed.suffix}`;
}

function shouldAnimateStatValue(value: string) {
  return /^[-+]?\d[\d,]*(?:\.\d+)?(?:\s?(?:kg|hp|kW|HP|Nm|mm|m|L|ft|cc|CBM|Years?|%|\+))?$/i.test(value.trim());
}

function isCompactStatValue(value: string) {
  const trimmedValue = value.trim();
  return (
    /^[-+]?\d[\d,]*(?:\.\d+)?\s?(?:kg|hp|kW|HP|Nm|mm|m|L|ft|cc|CBM|Years?|%|\+)$/i.test(trimmedValue) ||
    /^[A-Z0-9-]{3,}$/.test(trimmedValue) ||
    /^H Series$/i.test(trimmedValue)
  );
}

function formatQuickSpecValue(value: string) {
  return value
    .replace(/(\d)\s*kW\b/gi, '$1 Kw')
    .replace(/(\d)(Kw|L|kg|mm|Nm|CBM)\b/g, '$1 $2');
}

export function AnimatedValue({ value }: { value: string }) {
  const parsedValue = useMemo(() => parseCounterValue(value), [value]);
  const [displayValue, setDisplayValue] = useState(value);
  const valueRef = useRef<HTMLSpanElement>(null);
  const hasAnimatedRef = useRef(false);

  useEffect(() => {
    if (!parsedValue) {
      setDisplayValue(value);
      return;
    }

    const prefersReducedMotion =
      typeof window.matchMedia === 'function' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || typeof IntersectionObserver === 'undefined') {
      setDisplayValue(value);
      hasAnimatedRef.current = true;
      return;
    }

    const element = valueRef.current;
    if (!element) {
      setDisplayValue(value);
      return;
    }

    let animationFrame = 0;
    const duration = 950;

    const startAnimation = () => {
      if (hasAnimatedRef.current) return;
      hasAnimatedRef.current = true;
      const startedAt = performance.now();

      const tick = (currentTime: number) => {
        const progress = Math.min((currentTime - startedAt) / duration, 1);
        const easedProgress = 1 - Math.pow(1 - progress, 3);
        setDisplayValue(formatCounterValue(parsedValue.target * easedProgress, parsedValue));

        if (progress < 1) {
          animationFrame = requestAnimationFrame(tick);
        } else {
          setDisplayValue(value);
        }
      };

      animationFrame = requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          startAnimation();
          observer.disconnect();
        }
      },
      { threshold: 0.35, rootMargin: '0px 0px -8% 0px' },
    );

    setDisplayValue(formatCounterValue(0, parsedValue));
    observer.observe(element);

    return () => {
      cancelAnimationFrame(animationFrame);
      observer.disconnect();
    };
  }, [parsedValue, value]);

  return <span ref={valueRef}>{displayValue}</span>;
}

export function SectionHeader({
  eyebrow,
  badge,
  title,
  subtitle,
  description,
  align = 'center',
}: {
  eyebrow?: string;
  badge?: string;
  title: string;
  subtitle?: string;
  description?: string;
  align?: 'left' | 'center';
}) {
  const badgeText = eyebrow || badge;
  const subtitleText = description || subtitle;
  return (
    <div className={`mb-12 ${align === 'center' ? 'text-center' : 'text-left'}`}>
      {badgeText && (
        <span className="mb-3 inline-flex items-center gap-2 rounded-sm border-l-4 border-[#e6a94c] bg-[#eef4fb] px-3 py-1.5 font-mono text-[10px] font-bold uppercase tracking-wider text-[#1f5fae]">
          <span className="h-1.5 w-5 rounded-full bg-gradient-to-r from-[#1f5fae] to-[#e6a94c]" />
          {badgeText}
        </span>
      )}
      <h2 className="font-display text-3xl font-extrabold tracking-tight text-slate-950 md:text-4xl">{title}</h2>
      {subtitleText && <p className="mt-4 text-sm leading-relaxed text-slate-500 md:text-base">{subtitleText}</p>}
    </div>
  );
}

export function RevealSection({
  children,
  className = '',
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={className}>
      {children}
    </section>
  );
}



interface ProductPageTemplateProps {
  product: ProductPageData;
  onContactClick: (prefilledSubject?: string) => void;
}

const iconMap = {
  armchair: Armchair,
  'badge-indian-rupee': BadgeIndianRupee,
  boxes: Boxes,
  'briefcase-business': BriefcaseBusiness,
  calculator: Calculator,
  gauge: Gauge,
  'hard-hat': HardHat,
  'package-check': Truck,
  route: Truck,
  settings: Settings,
  shield: ShieldCheck,
  snowflake: Snowflake,
  'trending-up': TrendingUp,
  wrench: Wrench,
  zap: Zap,
};

function getIcon(iconName: string) {
  return iconMap[iconName as keyof typeof iconMap] || Sparkles;
}

const overviewUseCases = [
  {
    title: 'Logistics & Delivery',
    description: 'Daily route operations for parcels, courier fleets and city distribution.',
    Icon: Truck,
  },
  {
    title: 'Construction Material Transport',
    description: 'Practical payload support for site supply runs and local material movement.',
    Icon: HardHat,
  },
  {
    title: 'FMCG Distribution',
    description: 'Reliable movement for packaged goods, distributors and wholesale networks.',
    Icon: PackageCheck,
  },
  {
    title: 'Retail Goods Transport',
    description: 'Flexible cargo utility for shops, market supply and business deliveries.',
    Icon: ShoppingBag,
  },
  {
    title: 'Agriculture & Farm Produce',
    description: 'Useful for produce movement between farms, mandis, hotels and retailers.',
    Icon: Wheat,
  },
  {
    title: 'Local Business Supply',
    description: 'A dependable workhorse for owner-operators and growing local businesses.',
    Icon: Store,
  },
];

const productNavItems = [
  ['Overview', 'overview'],
  ['Gallery', 'gallery'],
  ['Specs', 'technical-specs'],
  ['Finance', 'finance'],
  ['Enquiry', 'product-enquiry'],
] as const;

export default function ProductPageTemplate({ product, onContactClick }: ProductPageTemplateProps) {
  const [activeGalleryIndex, setActiveGalleryIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<(typeof productNavItems)[number][1]>('overview');
  const [openSpecGroups, setOpenSpecGroups] = useState<string[]>([product.specifications[0]?.title || '']);
  const [financeAmount, setFinanceAmount] = useState(1200000);
  const [downPayment, setDownPayment] = useState(25);
  const [tenureMonths, setTenureMonths] = useState(60);
  const [formState, setFormState] = useState({
    name: '',
    phone: '',
    city: '',
    interest: product.enquiry.defaultInterest,
    contactTime: 'Morning',
    consent: false,
  });
  const [formMessage, setFormMessage] = useState('');

  useEffect(() => {
    setActiveGalleryIndex(0);
    setLightboxOpen(false);
    setActiveSection('overview');
    setOpenSpecGroups([product.specifications[0]?.title || '']);
    setFormState({
      name: '',
      phone: '',
      city: '',
      interest: product.enquiry.defaultInterest,
      contactTime: 'Morning',
      consent: false,
    });
    setFormMessage('');
  }, [product]);

  useEffect(() => {
    if (!product.seo) return;

    document.title = product.seo.title;

    let descriptionMeta = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (!descriptionMeta) {
      descriptionMeta = document.createElement('meta');
      descriptionMeta.name = 'description';
      document.head.appendChild(descriptionMeta);
    }
    descriptionMeta.content = product.seo.description;

    let canonicalLink = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.rel = 'canonical';
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.href = `${window.location.origin}${product.seo.canonicalPath}`;
  }, [product]);

  const activeGalleryImage = product.gallery[activeGalleryIndex] || product.gallery[0];
  const monthlyEmi = useMemo(() => {
    const principal = financeAmount * (1 - downPayment / 100);
    const monthlyRate = 0.0975 / 12;
    const factor = Math.pow(1 + monthlyRate, tenureMonths);
    return Math.round((principal * monthlyRate * factor) / (factor - 1));
  }, [downPayment, financeAmount, tenureMonths]);

  const toggleSpecGroup = (title: string) => {
    setOpenSpecGroups((current) =>
      current.includes(title) ? current.filter((item) => item !== title) : [...current, title],
    );
  };

  const showPreviousImage = () => {
    setActiveGalleryIndex((current) => (current === 0 ? product.gallery.length - 1 : current - 1));
  };

  const showNextImage = () => {
    setActiveGalleryIndex((current) => (current === product.gallery.length - 1 ? 0 : current + 1));
  };

  useEffect(() => {
    if (!lightboxOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setLightboxOpen(false);
      }
      if (event.key === 'ArrowLeft') {
        showPreviousImage();
      }
      if (event.key === 'ArrowRight') {
        showNextImage();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen, product.gallery.length]);

  useEffect(() => {
    let animationFrame = 0;

    const updateActiveSection = () => {
      const viewportAnchor = 150;
      const sections = productNavItems
        .map(([, id]) => document.getElementById(id))
        .filter((section): section is HTMLElement => Boolean(section));

      const currentSectionId =
        sections.find((section) => {
          const rect = section.getBoundingClientRect();
          return rect.top <= viewportAnchor && rect.bottom > viewportAnchor;
        })?.id ||
        sections
          .map((section) => ({
            id: section.id,
            distance: Math.abs(section.getBoundingClientRect().top - viewportAnchor),
          }))
          .sort((a, b) => a.distance - b.distance)[0]?.id;

      if (currentSectionId) {
        setActiveSection(currentSectionId as (typeof productNavItems)[number][1]);
      }
    };

    const handleScroll = () => {
      cancelAnimationFrame(animationFrame);
      animationFrame = requestAnimationFrame(updateActiveSection);
    };

    updateActiveSection();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  const handleEnquirySubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!formState.name.trim() || !formState.phone.trim() || !formState.consent) {
      setFormMessage('Please add your name, phone number, and consent before submitting.');
      return;
    }

    setFormMessage('Enquiry ready. Opening the LCV landing page.');
    onContactClick(
      `${product.name} enquiry from ${formState.name}, ${formState.city || 'city not specified'}, preferred contact: ${formState.contactTime}, phone: ${formState.phone}`,
    );
  };

  const scrollToEnquiry = () => {
    document.getElementById('product-enquiry')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const smoothScrollToSection = (id: string) => {
    const target = document.getElementById(id);
    if (!target) return;

    const startY = window.scrollY;
    const headerOffset = 132;
    const targetY = target.getBoundingClientRect().top + window.scrollY - headerOffset;
    const distance = targetY - startY;
    const duration = 650;
    const startTime = performance.now();

    const easeOutCubic = (progress: number) => 1 - Math.pow(1 - progress, 3);

    const step = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      window.scrollTo(0, startY + distance * easeOutCubic(progress));
      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    setActiveSection(id as (typeof productNavItems)[number][1]);
    requestAnimationFrame(step);
  };

  const handleProductNavClick = (event: MouseEvent<HTMLAnchorElement>, id: string) => {
    event.preventDefault();
    smoothScrollToSection(id);
  };

  const downloadBrochure = () => {
    const brochureText = [
      product.name,
      product.tagline,
      '',
      product.description,
      '',
      'Quick Specifications',
      ...product.quickSpecs.map((spec) => `${spec.label}: ${spec.value}`),
      '',
      'Contact Gemini Motors',
      '+91 94223 93288',
    ].join('\n');
    const blob = new Blob([brochureText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${product.id}-brochure.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleFleetQuoteClick = () => {
    downloadBrochure();
    scrollToEnquiry();
  };

  return (
    <article className="relative flex flex-col bg-[#f8f9ff] text-slate-900 animate-in fade-in duration-300">
      <nav className="sticky top-20 z-40 border-b border-white/60 bg-white/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl gap-6 overflow-x-auto px-6 py-3 md:px-16">
          {productNavItems.map(([label, id]) => (
            <a
              key={id}
              href={`#${id}`}
              onClick={(event) => handleProductNavClick(event, id)}
              className={`shrink-0 border-b-2 px-1 py-2 font-mono text-[11px] font-bold uppercase tracking-wider transition-all duration-300 ${
                activeSection === id
                  ? 'border-[#1f5fae] text-[#1f5fae]'
                  : 'border-transparent text-slate-500 hover:border-blue-600 hover:text-blue-600'
              }`}
            >
              {label}
            </a>
          ))}
        </div>
      </nav>

      <section className="relative order-10 min-h-[92svh] overflow-hidden bg-[#07111f] text-white md:min-h-[90vh] lg:min-h-[calc(100vh-5rem)]">
        <motion.img
          src={product.heroImage}
          alt={product.name}
          className="absolute inset-0 h-full w-full object-cover object-[63%_center] opacity-80 sm:object-[66%_center] md:object-[72%_center]"
          initial={{ scale: 1.06, opacity: 0 }}
          animate={{ scale: 1.01, opacity: 0.86 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          loading="eager"
        />
        <div className="absolute inset-0">
          <div className="h-full w-full bg-[radial-gradient(circle_at_72%_45%,rgba(46,95,163,0.10),transparent_34%),linear-gradient(90deg,rgba(5,11,20,0.98)_0%,rgba(7,17,31,0.92)_34%,rgba(7,17,31,0.62)_62%,rgba(7,17,31,0.22)_100%)] md:bg-[radial-gradient(circle_at_74%_44%,rgba(46,95,163,0.08),transparent_31%),linear-gradient(90deg,rgba(5,11,20,0.96)_0%,rgba(7,17,31,0.88)_30%,rgba(7,17,31,0.46)_57%,rgba(7,17,31,0.14)_100%)]" />
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.028)_1px,transparent_1px)] bg-[size:52px_52px] opacity-35" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#07111f] to-transparent" />
        <div className="absolute left-0 top-0 h-full w-2 bg-gradient-to-b from-[#1f5fae] via-[#4a7fd1] to-[#e6a94c]" />

        <div className="relative z-10 mx-auto grid min-h-[92svh] max-w-7xl grid-cols-1 items-center px-5 pb-18 pt-14 sm:px-6 md:min-h-[90vh] md:px-16 lg:min-h-[calc(100vh-5rem)] lg:grid-cols-12 lg:pb-24 lg:pt-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="lg:col-span-7"
          >
            <motion.span
              initial={{ opacity: 0, x: -18 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.55, delay: 0.15 }}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-500/15 px-3 py-1 font-mono text-xs font-bold uppercase tracking-wider text-blue-300"
            >
              <Sparkles size={12} className="text-blue-400" />
              {product.category}
            </motion.span>
            <h1 className="mb-6 font-display text-5xl font-extrabold leading-tight tracking-tight text-white md:text-6xl">
              {product.name}
            </h1>
            <p className="mb-4 font-display text-base font-bold text-blue-400 md:text-lg">{product.tagline}</p>
            <p className="mb-10 max-w-xl text-base leading-relaxed text-gray-300 md:text-lg">
              {product.description}
            </p>
            <div className="mb-10 flex flex-nowrap gap-2.5 sm:flex-wrap sm:gap-4">
              <button
                onClick={handleFleetQuoteClick}
                className="inline-flex min-w-0 flex-1 cursor-pointer items-center justify-center gap-2 rounded-lg bg-[#1f5fae] px-3.5 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-lg shadow-blue-900/30 ring-1 ring-blue-300/20 transition-all duration-300 hover:scale-[1.02] hover:bg-[#2f75c9] hover:shadow-xl active:scale-95 sm:flex-none sm:px-8 sm:py-4 sm:text-sm"
              >
                Get Fleet Quote
                <ArrowRight size={15} />
              </button>
              <a
                href="tel:+919422393288"
                className="inline-flex min-w-0 flex-1 cursor-pointer items-center justify-center gap-2 rounded-lg border border-[#e6a94c]/45 bg-[#e6a94c]/12 px-3.5 py-3 text-xs font-bold uppercase tracking-wider text-white transition-all duration-300 hover:scale-[1.02] hover:bg-[#e6a94c]/25 hover:shadow-lg active:scale-95 sm:flex-none sm:px-8 sm:py-4 sm:text-sm"
              >
                <Phone size={16} />
                Call Sales
              </a>
            </div>
            <div className="grid grid-cols-3 gap-2 border-y border-white/15 py-4 sm:gap-3">
              {product.quickSpecs.slice(0, 3).map((spec) => (
                <div key={`hero-${spec.label}`} className="flex min-w-0 flex-col justify-center rounded-lg border border-white/10 bg-slate-950/35 px-2.5 py-2.5 text-center sm:border-0 sm:bg-transparent sm:p-0 sm:text-left">
                  <p className="break-words font-display text-[clamp(1rem,4.4vw,1.25rem)] font-extrabold leading-tight text-white sm:text-2xl">
                    {shouldAnimateStatValue(spec.value) ? (
                      <AnimatedValue value={formatQuickSpecValue(spec.value)} />
                    ) : (
                      formatQuickSpecValue(spec.value)
                    )}
                  </p>
                  <p className="mt-1 break-words font-mono text-[10px] font-bold uppercase tracking-wider text-slate-300 sm:text-xs">
                    {spec.label}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </section>

      <section className="relative z-20 order-20 -mt-10 px-3 sm:px-6 md:-mt-12 md:px-16">
        <div className="mx-auto grid max-w-7xl auto-rows-fr grid-cols-2 items-stretch gap-2 rounded-2xl border border-white/70 bg-white/55 p-2 shadow-2xl shadow-slate-900/15 backdrop-blur-xl sm:gap-3 sm:p-3 md:grid-cols-3 lg:grid-cols-5">
          {product.quickSpecs.map((spec, index) => (
            <motion.div
              key={spec.label}
              initial={{ opacity: 0, y: 18, scale: 0.98 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.42, delay: index * 0.07, ease: 'easeOut' }}
              className="group relative flex h-full min-h-[66px] min-w-0 flex-col items-start justify-center overflow-hidden rounded-xl border border-slate-200/80 bg-[linear-gradient(145deg,#ffffff,#eef3f9_52%,#dfe7f1)] px-3 py-3 shadow-lg shadow-slate-900/5 transition-all duration-300 hover:-translate-y-1 hover:border-[#2e5fa3]/40 hover:shadow-2xl hover:shadow-blue-950/15 sm:min-h-[76px] sm:px-4 sm:py-3.5 md:min-h-[104px] md:p-5"
            >
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#1f5fae] via-[#4a7fd1] to-[#e6a94c]" />
              <div className="absolute -right-8 -top-10 h-24 w-24 rounded-full bg-[#2e5fa3]/10 blur-2xl transition-opacity group-hover:opacity-80" />
              <div className="relative flex h-full min-w-0 flex-col items-start">
                <p
                  className={`flex min-h-[2.25rem] w-full items-start font-display text-[clamp(1.15rem,4.6vw,1.45rem)] font-extrabold leading-tight tracking-tight text-slate-950 sm:min-h-[2.6rem] sm:text-[clamp(1.35rem,3vw,1.85rem)] md:min-h-[3.75rem] md:text-[clamp(1.65rem,2.4vw,2rem)] ${
                    isCompactStatValue(spec.value) ? 'whitespace-nowrap' : 'break-words'
                  }`}
                >
                  {formatQuickSpecValue(spec.value)}
                </p>
                <p className="mt-2.5 break-words font-mono text-[8px] font-bold uppercase leading-snug tracking-[0.14em] text-[#2e5fa3] sm:mt-3 sm:text-[9px] md:mt-3.5 md:tracking-[0.18em]">
                  {spec.label}
                </p>
                {spec.helper && (
                  <p className="mt-1.5 break-words text-[9px] font-semibold leading-tight text-slate-600 sm:text-[10px] md:text-xs">
                    {spec.helper}
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <RevealSection id="overview" className="order-25 mx-auto max-w-7xl px-6 py-20 md:px-16">
        <SectionHeader
          eyebrow="Product Overview"
          title={product.overview.heading}
          description={product.overview.body}
        />
        <div className="mb-5 flex items-center gap-3">
          <span className="h-px flex-1 bg-slate-200" />
          <span className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-[#1f5fae]">
            Best Suited For
          </span>
          <span className="h-px flex-1 bg-slate-200" />
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {overviewUseCases.map(({ title, description, Icon }, index) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: index * 0.05, ease: 'easeOut' }}
              className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-[linear-gradient(145deg,#ffffff,#f3f7fc)] p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#1f5fae]/35 hover:shadow-xl hover:shadow-blue-950/10"
            >
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#1f5fae] via-[#4a7fd1] to-[#e6a94c] opacity-70" />
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-[#eef4fb] text-[#1f5fae] transition-all duration-300 group-hover:rotate-3 group-hover:scale-105 group-hover:bg-[#1f5fae] group-hover:text-white">
                <Icon size={22} />
              </div>
              <h3 className="font-display text-xl font-bold text-slate-950">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-500">{description}</p>
            </motion.div>
          ))}
        </div>
      </RevealSection>

      <motion.section
        id="finance"
        initial={{ opacity: 0, y: 50, scale: 0.98 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: '-90px' }}
        transition={revealTransition}
        className="order-50 border-y border-[#d7dde8] bg-[linear-gradient(135deg,rgba(255,255,255,0.92),rgba(226,234,246,0.88)),radial-gradient(circle_at_80%_10%,rgba(46,95,163,0.14),transparent_34%)] py-24 text-slate-950"
      >
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 md:px-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeader
              eyebrow="Finance"
              title={product.finance.title}
              description={product.finance.description}
            />
            <div className="rounded-2xl border border-white/70 bg-white/70 p-6 shadow-xl shadow-slate-900/10 backdrop-blur-xl">
              <div className="flex items-center gap-3 border-b border-slate-200 pb-5">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#1f5fae]/10 text-[#1f5fae]">
                  <Calculator size={22} />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-950">Fleet EMI Calculator</p>
                  <p className="text-xs font-semibold text-slate-500">{product.finance.interestRate}</p>
                </div>
              </div>
              <div className="mt-6 space-y-5">
                <label className="block">
                  <span className="flex justify-between text-xs font-semibold text-slate-600">
                    Vehicle value <b>Rs {financeAmount.toLocaleString('en-IN')}</b>
                  </span>
                  <input
                    type="range"
                    min={800000}
                    max={1800000}
                    step={50000}
                    value={financeAmount}
                    onChange={(event) => setFinanceAmount(Number(event.target.value))}
                    className="mt-3 w-full accent-blue-500"
                  />
                </label>
                <label className="block">
                  <span className="flex justify-between text-xs font-semibold text-slate-600">
                    Down payment <b>{downPayment}%</b>
                  </span>
                  <input
                    type="range"
                    min={10}
                    max={50}
                    step={5}
                    value={downPayment}
                    onChange={(event) => setDownPayment(Number(event.target.value))}
                    className="mt-3 w-full accent-blue-500"
                  />
                </label>
                <label className="block">
                  <span className="flex justify-between text-xs font-semibold text-slate-600">
                    Tenure <b>{tenureMonths} months</b>
                  </span>
                  <input
                    type="range"
                    min={24}
                    max={72}
                    step={12}
                    value={tenureMonths}
                    onChange={(event) => setTenureMonths(Number(event.target.value))}
                    className="mt-3 w-full accent-blue-500"
                  />
                </label>
              </div>
              <div className="mt-7 rounded-xl border border-[#1f5fae]/20 bg-[#1f5fae]/10 p-5">
                <p className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#1f5fae]">
                  Estimated monthly EMI
                </p>
                <p className="mt-1 font-display text-4xl font-extrabold text-slate-950">
                  Rs {monthlyEmi.toLocaleString('en-IN')}
                </p>
              </div>
            </div>
          </div>
          <div className="lg:col-span-7">
            <div className="h-full rounded-2xl border border-slate-200 bg-white/80 p-7 shadow-xl shadow-slate-900/5 md:p-9">
              <h3 className="font-display text-2xl font-bold text-slate-950">Finance Benefits for Fleet Buyers</h3>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-500">
                Keep cash flow predictable with finance support designed around route usage, delivery schedules and commercial vehicle ownership.
              </p>
              <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
                {product.finance.benefits.map((benefit) => (
                  <div key={benefit} className="flex gap-3 text-sm font-medium leading-relaxed text-slate-600">
                    <Check size={17} className="mt-0.5 shrink-0 text-[#1f5fae]" />
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
              <div className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-slate-950 shadow-xl shadow-slate-900/10">
                <div className="relative h-44 md:h-52">
                  <img
                    src={product.gallery[2]?.src || product.heroImage}
                    alt="Commercial vehicle finance support"
                    className="h-full w-full object-cover opacity-72"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,17,31,0.92),rgba(7,17,31,0.42)),radial-gradient(circle_at_80%_20%,rgba(230,169,76,0.24),transparent_30%)]" />
                  <div className="absolute inset-0 flex flex-col justify-end p-5">
                    <p className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#ffd08a]">
                      Fleet finance desk
                    </p>
                    <p className="mt-1 max-w-md text-sm font-semibold leading-relaxed text-white">
                      EMI planning, documentation support and delivery guidance for business vehicle buyers.
                    </p>
                  </div>
                </div>
              </div>
              <button
                onClick={() => onContactClick(`Finance application request: ${product.name}`)}
                className="mt-8 inline-flex items-center gap-2 rounded-lg bg-[#1f5fae] px-6 py-3 text-sm font-bold uppercase tracking-wider text-white shadow-lg shadow-blue-900/20 transition-all duration-300 hover:scale-[1.02] hover:bg-[#2f75c9] hover:shadow-xl active:scale-[0.98]"
              >
                Apply for Finance
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </motion.section>

      <motion.section
        id="gallery"
        initial={{ opacity: 0, y: 50, scale: 0.98 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: '-90px' }}
        transition={revealTransition}
        className="order-30 mx-auto max-w-7xl px-6 py-20 md:px-16"
      >
        <SectionHeader
          eyebrow="Gallery"
          title="See the Truck in Working Detail"
          description="Review exterior presence, body utility, fleet usage and service support before speaking with the Gemini Motors sales team."
          align="center"
        />
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          <motion.button
            onClick={() => setLightboxOpen(true)}
            initial={{ opacity: 0, y: 30, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, ease: 'easeOut' }}
            className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 lg:col-span-8"
          >
            <img
              src={activeGalleryImage.src}
              alt={activeGalleryImage.alt}
              className="h-[420px] w-full object-cover transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/90 to-transparent p-6 text-left">
              <p className="text-sm font-bold text-white">{activeGalleryImage.caption}</p>
              <p className="mt-1 text-xs text-slate-300">Click to preview</p>
            </div>
          </motion.button>
          <div className="grid auto-rows-fr grid-cols-1 gap-4 min-[430px]:grid-cols-2 lg:col-span-4">
            {product.gallery.map((image, index) => (
              <motion.button
                key={image.caption}
                onClick={() => {
                  setActiveGalleryIndex(index);
                  setLightboxOpen(true);
                }}
                initial={{ opacity: 0, y: 24, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.06, ease: 'easeOut' }}
                className={`group relative min-h-[168px] cursor-pointer overflow-hidden rounded-2xl bg-slate-950 text-left shadow-lg shadow-slate-900/10 ring-1 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-blue-950/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1f5fae] focus-visible:ring-offset-2 md:min-h-[190px] lg:min-h-0 ${
                  activeGalleryIndex === index ? 'shadow-blue-950/20 ring-blue-500' : 'ring-white/20'
                }`}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="absolute object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  style={{ inset: -1, height: 'calc(100% + 2px)', width: 'calc(100% + 2px)' }}
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/30 to-transparent transition-colors duration-300 group-hover:from-slate-950/92 group-hover:via-slate-950/42" />
                <div className="absolute inset-x-0 bottom-0 p-4 transition-transform duration-300 group-hover:-translate-y-0.5">
                  <p className="text-sm font-bold leading-tight text-white">{image.caption}</p>
                  <p className="mt-1.5 inline-flex items-center gap-1.5 text-xs font-semibold text-slate-200">
                    Click to Preview
                    <ArrowRight size={13} className="transition-transform duration-300 group-hover:translate-x-1" />
                  </p>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
        <div className="mt-8 flex flex-col items-start justify-between gap-4 rounded-2xl border border-[#d7dde8] bg-white p-5 shadow-sm md:flex-row md:items-center">
          <div>
            <p className="font-display text-xl font-bold text-slate-950">Need photos for a specific body type?</p>
            <p className="mt-1 text-sm text-slate-500">Ask for flatbed, extended wheelbase, insulated body or fleet delivery references.</p>
          </div>
          <button
            onClick={() => onContactClick(`Photo and body option request: ${product.name}`)}
            className="inline-flex shrink-0 items-center gap-2 rounded-lg border border-[#e6a94c]/40 bg-[#fff6e8] px-5 py-3 text-sm font-bold uppercase tracking-wider text-[#8a5a13] transition-all duration-300 hover:scale-[1.02] hover:bg-[#ffe8bc] hover:shadow-lg active:scale-[0.98]"
          >
            Request Body Photos
            <ArrowRight size={15} />
          </button>
        </div>
      </motion.section>

      <RevealSection className="order-[90] bg-white py-24">
        <div className="mx-auto max-w-7xl px-6 md:px-16">
          <SectionHeader eyebrow="Features" title="Premium Working Features" align="center" />
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {product.features.map((feature, index) => {
              const Icon = getIcon(feature.iconName);
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: index * 0.04 }}
                  className="group rounded-2xl border border-slate-200 bg-slate-50 p-6 transition-all hover:-translate-y-1 hover:bg-white hover:shadow-xl"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#eef4fb] text-[#1f5fae] transition-all duration-300 group-hover:rotate-3 group-hover:scale-105 group-hover:bg-[#1f5fae] group-hover:text-white">
                    <Icon size={23} />
                  </div>
                  <h3 className="mt-5 font-display text-xl font-bold text-slate-950">{feature.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-500">{feature.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </RevealSection>

      <RevealSection className="order-[100] mx-auto max-w-7xl px-6 py-24 md:px-16">
        <SectionHeader eyebrow="Variants" title="Choose Your Configuration" description="Three body configurations, one reusable product platform." />
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {product.variants.map((variant) => (
            <motion.div
              key={variant.name}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, ease: 'easeOut' }}
              className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-950/10"
            >
              <h3 className="font-display text-2xl font-bold text-slate-950">{variant.name}</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-500">{variant.description}</p>
              <p className="mt-5 rounded-xl border border-[#1f5fae]/15 bg-[#eef4fb] p-4 text-xs font-semibold leading-relaxed text-[#12325a]">
                {variant.bestFor}
              </p>
              <div className="mt-5 space-y-3">
                {variant.specs.map((spec) => (
                  <div key={spec.label} className="grid grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] gap-3 border-b border-slate-100 pb-2 text-sm">
                    <span className="text-slate-400">{spec.label}</span>
                    <span className="break-words text-right font-bold text-slate-900">{spec.value}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </RevealSection>

      <motion.section
        id="technical-specs"
        initial={{ opacity: 0, y: 50, scale: 0.98 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: '-90px' }}
        transition={revealTransition}
        className="order-40 mx-auto max-w-7xl px-6 py-20 md:px-16"
      >
        <SectionHeader
          eyebrow="Specifications"
          title="Technical Specifications"
          description={`Compare payload, engine, dimensions and body configuration details for ${product.name}.`}
        />
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {product.specifications.map((group) => {
            const isOpen = openSpecGroups.includes(group.title);
            return (
              <div key={group.title} className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
                <button
                  onClick={() => toggleSpecGroup(group.title)}
                  className="flex w-full items-center justify-between bg-slate-50 px-6 py-5 text-left"
                >
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-blue-700">
                    {group.title}
                  </span>
                  <ChevronDown
                    size={18}
                    className={`text-slate-500 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                  />
                </button>
                <div className={`${isOpen ? 'block' : 'hidden'} lg:block`}>
                  {group.rows.map((row) => (
                    <div
                      key={`${group.title}-${row.label}`}
                      className="grid grid-cols-1 gap-1 border-t border-slate-100 px-6 py-4 text-sm md:grid-cols-2"
                    >
                      <span className="break-words text-slate-500">{row.label}</span>
                      <span className="break-words font-mono font-semibold text-slate-950 md:text-right">{row.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
        <div className="mt-8 flex flex-col items-start justify-between gap-4 rounded-2xl border border-[#1f5fae]/15 bg-[#f0f6ff] p-5 md:flex-row md:items-center">
          <div>
            <p className="font-display text-xl font-bold text-slate-950">Comparing this with another payload class?</p>
            <p className="mt-1 text-sm text-slate-600">Get help choosing between LCV, M&HCV and EV options for your route and load profile.</p>
          </div>
          <button
            onClick={() => onContactClick(`Fleet comparison request: ${product.name}`)}
            className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-[#1f5fae] px-5 py-3 text-sm font-bold uppercase tracking-wider text-white shadow-lg shadow-blue-900/20 transition-all duration-300 hover:scale-[1.02] hover:bg-[#2f75c9] hover:shadow-xl active:scale-[0.98]"
          >
            Ask Fleet Advisor
            <ArrowRight size={15} />
          </button>
        </div>
      </motion.section>

      <RevealSection className="order-35 mx-auto max-w-7xl px-6 pb-20 md:px-16">
        <div className="relative overflow-hidden rounded-3xl bg-slate-950 p-8 text-white shadow-2xl md:p-12">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_10%,rgba(59,130,246,0.25),transparent_36%)]" />
          <div className="relative z-10 grid grid-cols-1 gap-10 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <h2 className="font-display text-3xl font-extrabold md:text-4xl">{product.whyGemini.heading}</h2>
              <p className="mt-4 text-sm leading-relaxed text-slate-300">{product.whyGemini.description}</p>
            </div>
            <div className="grid min-w-0 auto-rows-fr grid-cols-1 gap-4 min-[420px]:grid-cols-2 md:grid-cols-2 lg:col-span-7 lg:grid-cols-4">
              {product.whyGemini.stats.map((stat) => (
                <div
                  key={stat.label}
                  className="flex h-full min-h-[118px] min-w-0 flex-col items-start justify-start rounded-2xl border border-white/10 bg-white/[0.06] p-5 pt-7"
                >
                  <p
                    className={`min-h-[3.5rem] min-w-0 font-display text-[clamp(1.25rem,4.7vw,1.5rem)] font-extrabold leading-tight text-blue-300 ${
                      isCompactStatValue(stat.value) ? 'whitespace-nowrap' : 'break-words'
                    }`}
                  >
                    {formatQuickSpecValue(stat.value)}
                  </p>
                  <p className="mt-3 break-words font-mono text-[10px] font-bold uppercase leading-snug tracking-wider text-slate-400">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </RevealSection>

      <RevealSection className="order-[130] bg-white py-24">
        <div className="mx-auto max-w-7xl px-6 md:px-16">
          <SectionHeader eyebrow="Related" title="Related Products" />
          <div className="flex gap-5 overflow-x-auto pb-3">
            {product.relatedProducts.map((item) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, ease: 'easeOut' }}
                className="min-w-[280px] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <img src={item.imageUrl} alt={item.name} className="h-44 w-full object-cover" loading="lazy" />
                <div className="p-5">
                  <p className="font-mono text-[10px] font-bold uppercase tracking-wider text-blue-700">{item.category}</p>
                  <h3 className="mt-2 font-display text-xl font-bold text-slate-950">{item.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-500">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </RevealSection>

      <motion.section
        id="product-enquiry"
        initial={{ opacity: 0, y: 50, scale: 0.98 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: '-90px' }}
        transition={revealTransition}
        className="order-60 mx-auto max-w-7xl scroll-mt-32 px-6 py-24 md:px-16"
      >
        <div className="grid grid-cols-1 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl lg:grid-cols-12">
          <div className="bg-blue-600 p-8 text-white md:p-12 lg:col-span-4">
            <BookOpen size={28} className="text-blue-100" />
            <h2 className="mt-6 font-display text-3xl font-extrabold">{product.enquiry.title}</h2>
            <p className="mt-4 text-sm leading-relaxed text-blue-100">{product.enquiry.description}</p>
            <div className="mt-8 space-y-4 border-t border-white/20 pt-8 text-sm">
              <div className="flex gap-3">
                <Phone size={17} className="mt-0.5 shrink-0" />
                <span>Direct sales support: +91 94223 93288</span>
              </div>
              <div className="flex gap-3">
                <ShieldCheck size={17} className="mt-0.5 shrink-0" />
                <span>Authorized support for commercial fleet operators.</span>
              </div>
            </div>
          </div>
          <form onSubmit={handleEnquirySubmit} className="grid grid-cols-1 gap-5 p-8 md:grid-cols-2 md:p-12 lg:col-span-8">
            {[
              ['Full name', 'name', 'text'],
              ['Phone number', 'phone', 'tel'],
              ['City / Taluka', 'city', 'text'],
              ['Vehicle interest', 'interest', 'text'],
            ].map(([label, key, type]) => (
              <label key={key} className="group relative block">
                <input
                  type={type}
                  value={formState[key as keyof typeof formState] as string}
                  onChange={(event) => setFormState({ ...formState, [key]: event.target.value })}
                  placeholder=" "
                  className="peer w-full rounded-xl border border-slate-300 bg-slate-50 px-4 pb-3 pt-6 text-sm outline-none transition-all focus:border-blue-600 focus:bg-white focus:ring-2 focus:ring-blue-100"
                />
                <span className="absolute left-4 top-2 text-[10px] font-bold uppercase tracking-wider text-slate-400 transition-colors peer-focus:text-blue-600">
                  {label}
                </span>
              </label>
            ))}
            <label className="group relative block">
              <select
                value={formState.contactTime}
                onChange={(event) => setFormState({ ...formState, contactTime: event.target.value })}
                className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 pb-3 pt-6 text-sm outline-none transition-all focus:border-blue-600 focus:bg-white focus:ring-2 focus:ring-blue-100"
              >
                <option>Morning</option>
                <option>Afternoon</option>
                <option>Evening</option>
              </select>
              <span className="absolute left-4 top-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Preferred contact time
              </span>
            </label>
            <label className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm text-slate-600">
              <input
                type="checkbox"
                checked={formState.consent}
                onChange={(event) => setFormState({ ...formState, consent: event.target.checked })}
                className="h-4 w-4 accent-blue-600"
              />
              I agree to be contacted by Gemini Motors Sales.
            </label>
            {formMessage && (
              <p className="rounded-xl bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-600 md:col-span-2">
                {formMessage}
              </p>
            )}
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#174f96] via-[#1f5fae] to-[#2f75c9] px-6 py-4 text-sm font-bold uppercase tracking-wider text-white shadow-lg shadow-blue-900/20 transition-all hover:scale-[1.01] hover:shadow-xl active:scale-[0.98] md:col-span-2"
            >
              Submit Enquiry
              <ArrowRight size={16} />
            </button>
          </form>
        </div>
      </motion.section>

      <div className="fixed bottom-5 left-1/2 z-50 w-[calc(100%-2rem)] max-w-[440px] -translate-x-1/2 rounded-full border border-white/70 bg-white/86 p-2 shadow-2xl shadow-blue-950/20 backdrop-blur-2xl md:w-auto md:max-w-none">
        <div className="flex items-center justify-center gap-2">
          <a
            href="tel:+919422393288"
            className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-4 text-xs font-bold uppercase tracking-wider text-slate-950 shadow-sm transition-all duration-300 hover:scale-[1.04] hover:bg-blue-50 hover:shadow-md active:scale-[0.96] md:flex-none"
          >
            <Phone size={15} />
            <span className="hidden sm:inline">Call</span>
          </a>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-full bg-[#25D366] px-4 text-xs font-bold uppercase tracking-wider text-white shadow-lg shadow-green-900/20 transition-all duration-300 hover:scale-[1.04] hover:bg-[#20ba5a] hover:shadow-xl active:scale-[0.96] md:flex-none"
          >
            <MessageCircle size={15} />
            <span className="hidden sm:inline">WhatsApp</span>
          </a>
          <button
            onClick={handleFleetQuoteClick}
            className="inline-flex h-11 flex-[1.35] items-center justify-center gap-2 rounded-full bg-[#1f5fae] px-5 text-xs font-bold uppercase tracking-wider text-white shadow-lg shadow-blue-900/25 ring-1 ring-blue-300/20 transition-all duration-300 hover:scale-[1.04] hover:bg-[#2f75c9] hover:shadow-blue-700/30 active:scale-[0.96] md:flex-none"
          >
            <Zap size={15} />
            Get Quote
          </button>
        </div>
      </div>

      {lightboxOpen && activeGalleryImage && (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-slate-950/88 p-4 backdrop-blur-sm"
          onClick={() => setLightboxOpen(false)}
        >
          <button
            onClick={() => setLightboxOpen(false)}
            className="absolute right-5 top-5 rounded-full bg-white/10 p-3 text-white transition-colors hover:bg-white/20"
            aria-label="Close gallery preview"
          >
            <X size={22} />
          </button>

          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              showPreviousImage();
            }}
            className="absolute left-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white shadow-xl backdrop-blur transition-all hover:scale-105 hover:bg-white/20 md:left-8"
            aria-label="Previous image"
          >
            <ChevronLeft size={24} />
          </button>

          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              showNextImage();
            }}
            className="absolute right-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white shadow-xl backdrop-blur transition-all hover:scale-105 hover:bg-white/20 md:right-8"
            aria-label="Next image"
          >
            <ChevronRight size={24} />
          </button>

          <div className="w-full max-w-6xl" onClick={(event) => event.stopPropagation()}>
            <div className="mb-3 flex items-center justify-between gap-4 text-white">
              <p className="font-mono text-[11px] font-bold uppercase tracking-wider text-slate-300">
                Image {activeGalleryIndex + 1} of {product.gallery.length}
              </p>
              <p className="text-right text-sm font-semibold">{activeGalleryImage.caption}</p>
            </div>
            <motion.img
              key={activeGalleryImage.src}
              src={activeGalleryImage.src}
              alt={activeGalleryImage.alt}
              initial={{ opacity: 0, x: 24, scale: 0.985 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="mx-auto max-h-[76vh] w-full rounded-2xl object-contain shadow-2xl"
            />
            <div className="mt-4 flex justify-center gap-2">
              {product.gallery.map((image, index) => (
                <button
                  key={`lightbox-dot-${image.caption}`}
                  type="button"
                  onClick={() => setActiveGalleryIndex(index)}
                  className={`h-2.5 rounded-full transition-all ${
                    activeGalleryIndex === index ? 'w-8 bg-[#e6a94c]' : 'w-2.5 bg-white/35 hover:bg-white/60'
                  }`}
                  aria-label={`View image ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </article>
  );
}

