/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { FormEvent, useMemo, useState } from 'react';
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
  Download,
  Gauge,
  HardHat,
  Image as ImageIcon,
  MessageCircle,
  PackageCheck,
  Phone,
  Route,
  Settings,
  ShieldCheck,
  Snowflake,
  Sparkles,
  TrendingUp,
  Wrench,
  X,
  Zap,
} from 'lucide-react';
import { ProductPageData } from '../../types';

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
  'package-check': PackageCheck,
  route: Route,
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

function SectionHeader({
  eyebrow,
  title,
  description,
  align = 'left',
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
}) {
  return (
    <div className={align === 'center' ? 'mx-auto mb-12 max-w-2xl text-center' : 'mb-10 max-w-3xl'}>
      {eyebrow && (
        <span className="mb-3 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1.5 font-mono text-[10px] font-bold uppercase tracking-wider text-blue-700">
          <span className="h-1.5 w-1.5 rounded-full bg-blue-600" />
          {eyebrow}
        </span>
      )}
      <h2 className="font-display text-3xl font-extrabold tracking-tight text-slate-950 md:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-sm leading-relaxed text-slate-500 md:text-base">{description}</p>
      )}
    </div>
  );
}

export default function ProductPageTemplate({ product, onContactClick }: ProductPageTemplateProps) {
  const [activeGalleryIndex, setActiveGalleryIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
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

  const handleEnquirySubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!formState.name.trim() || !formState.phone.trim() || !formState.consent) {
      setFormMessage('Please add your name, phone number, and consent before submitting.');
      return;
    }

    setFormMessage('Enquiry ready. Opening WhatsApp with your details.');
    onContactClick(
      `${product.name} enquiry from ${formState.name}, ${formState.city || 'city not specified'}, preferred contact: ${formState.contactTime}, phone: ${formState.phone}`,
    );
  };

  const scrollToEnquiry = () => {
    document.getElementById('product-enquiry')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <article className="relative bg-[#f8f9ff] text-slate-900 animate-in fade-in duration-300">
      <nav className="sticky top-20 z-40 border-b border-white/60 bg-white/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl gap-6 overflow-x-auto px-6 py-3 md:px-16">
          {[
            ['Overview', 'overview'],
            ['Finance', 'finance'],
            ['Gallery', 'gallery'],
            ['Specs', 'technical-specs'],
            ['Enquiry', 'product-enquiry'],
          ].map(([label, id]) => (
            <a
              key={id}
              href={`#${id}`}
              className="shrink-0 border-b-2 border-transparent px-1 py-2 font-mono text-[11px] font-bold uppercase tracking-wider text-slate-500 transition-colors hover:border-blue-600 hover:text-blue-600"
            >
              {label}
            </a>
          ))}
        </div>
      </nav>

      <section className="relative min-h-[calc(100vh-5rem)] overflow-hidden bg-[#07111f] text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(59,130,246,0.23),transparent_32%),radial-gradient(circle_at_83%_18%,rgba(14,165,233,0.16),transparent_30%),linear-gradient(135deg,#07111f,#101b2e_55%,#060b14)]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:44px_44px] opacity-50" />
        <div className="pointer-events-none absolute left-1/4 top-1/4 h-2 w-2 animate-pulse rounded-full bg-blue-300/70" />
        <div className="pointer-events-none absolute right-1/4 top-1/3 h-1.5 w-1.5 animate-ping rounded-full bg-white/50" />
        <div className="pointer-events-none absolute bottom-1/3 left-1/2 h-1 w-1 animate-pulse rounded-full bg-emerald-300/70" />

        <div className="relative z-10 mx-auto grid min-h-[calc(100vh-5rem)] max-w-7xl grid-cols-1 items-center gap-12 px-6 py-20 md:px-16 lg:grid-cols-12">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5"
          >
            <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-300/30 bg-blue-500/10 px-3 py-1.5 font-mono text-[11px] font-bold uppercase tracking-wider text-blue-200">
              <Sparkles size={13} />
              {product.category}
            </span>
            <h1 className="font-display text-5xl font-extrabold leading-none tracking-tight md:text-7xl">
              {product.name}
            </h1>
            <p className="mt-5 max-w-xl text-lg font-semibold text-blue-100">{product.tagline}</p>
            <p className="mt-5 max-w-xl text-sm leading-relaxed text-slate-300 md:text-base">
              {product.description}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">

            <div className="rounded-full bg-white/10 px-4 py-2 text-sm">
            ✔ Available in Goa
            </div>

            <div className="rounded-full bg-white/10 px-4 py-2 text-sm">
            ✔ Finance Available
            </div>

            <div className="rounded-full bg-white/10 px-4 py-2 text-sm">
            ✔ Dealer Discounts
            </div>

            <div className="rounded-full bg-white/10 px-4 py-2 text-sm">
            ✔ Bulk Orders
            </div>

            </div>
            <div className="mt-9 flex flex-wrap gap-3">
              <button
                onClick={scrollToEnquiry}
                className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-8 py-4 text-sm font-bold uppercase tracking-wider text-white shadow-lg shadow-blue-600/20 transition-all hover:bg-blue-500 active:scale-95"
              >
                Book Test Drive
                <ArrowRight size={16} />
              </button>
              <button
                onClick={() => onContactClick(`Download brochure request: ${product.brochureLabel}`)}
                className="inline-flex items-center gap-2 rounded-lg border border-white/25 px-8 py-4 text-sm font-bold uppercase tracking-wider text-white transition-all hover:border-white/60 hover:bg-white/10 active:scale-95"
              >
                <Download size={16} />
                Download Brochure
              </button>
              <button
                onClick={() => onContactClick(`Contact sales: ${product.name}`)}
                className="inline-flex items-center gap-2 rounded-lg bg-white/10 px-8 py-4 text-sm font-bold uppercase tracking-wider text-white transition-all hover:bg-white/15 active:scale-95"
              >
                <MessageCircle size={16} />
                Contact Sales
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="lg:col-span-7"
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
              className="relative"
            >
              <div className="absolute -inset-10 rounded-[3rem] bg-blue-500/30 blur-[90px]" />
              <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-2 shadow-2xl backdrop-blur-sm">
                <img
                  src={product.heroImage}
                  alt={product.name}
                  className="h-[450px] w-full rounded-xl object-cover transition duration-700 hover:scale-105 md:h-[650px] lg:h-[700px]"
                  loading="eager"
                />
                <div className="absolute bottom-5 left-5 right-5 rounded-xl border border-white/10 bg-slate-950/80 p-4 backdrop-blur-md">
                  <p className="font-mono text-[10px] font-bold uppercase tracking-wider text-blue-300">
                    Presentation template
                  </p>
                  <p className="mt-1 text-sm font-semibold text-white">
                    Placeholder imagery, ready for final product photography.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        <div className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-slate-400 md:flex">
          Scroll
          <span className="h-10 w-px overflow-hidden bg-white/20">
            <span className="block h-4 w-px animate-bounce bg-blue-300" />
          </span>
        </div>
      </section>

      <section className="relative z-20 -mt-12 px-6 md:px-16">
        <div className="mx-auto grid max-w-7xl grid-cols-2 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl shadow-slate-900/10 md:grid-cols-5">
          {product.quickSpecs.map((spec, index) => (
            <motion.div
              key={spec.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: index * 0.04 }}
              className="group border-b border-r border-slate-100 p-6 text-center last:border-r-0 md:border-b-0 transition-all duration-300 hover:-translate-y-2 hover:bg-blue-50 hover:shadow-xl hover:shadow-blue-200/30"
            >
              <p className="font-display text-2xl font-extrabold text-slate-950 md:text-3xl">{spec.value}</p>
              <p className="mt-1 font-mono text-[10px] font-bold uppercase tracking-wider text-slate-400">
                {spec.label}
              </p>
              {spec.helper && <p className="mt-2 text-xs leading-snug text-slate-500">{spec.helper}</p>}
            </motion.div>
          ))}
        </div>
      </section>

      <section id="overview" className="mx-auto max-w-7xl px-6 py-24 md:px-16">
        <SectionHeader
          eyebrow="Product Overview"
          title={product.overview.heading}
          description={product.overview.body}
        />
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {product.overview.highlights.map((item, index) => {
            const Icon = getIcon(item.iconName);
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.06 }}
                className="group rounded-2xl border border-slate-200 bg-white p-7 shadow-md transition-all duration-500 hover:-translate-y-3 hover:scale-[1.02] hover:border-blue-400 hover:shadow-2xl hover:shadow-blue-500/20"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition-colors group-hover:bg-blue-600 group-hover:text-white">
                  <Icon size={22} />
                </div>
                <h3 className="font-display text-xl font-bold text-slate-950">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-500">{item.description}</p>
              </motion.div>
            );
          })}
        </div>
        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
          {product.overview.trustIndicators.map((item) => (
            <div key={item.label} className="rounded-xl border border-blue-100 bg-blue-50/70 p-5">
              <p className="font-mono text-[10px] font-bold uppercase tracking-wider text-blue-700">{item.label}</p>
              <p className="mt-1 font-display text-2xl font-extrabold text-slate-950">{item.value}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="finance" className="border-y border-slate-800 bg-slate-950 py-24 text-white">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 md:px-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeader
              eyebrow="Finance"
              title={product.finance.title}
              description={product.finance.description}
            />
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
              <div className="flex items-center gap-3 border-b border-white/10 pb-5">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/15 text-blue-300">
                  <Calculator size={22} />
                </div>
                <div>
                  <p className="text-sm font-bold">EMI Calculator</p>
                  <p className="text-xs text-slate-400">{product.finance.interestRate}</p>
                </div>
              </div>
              <div className="mt-6 space-y-5">
                <label className="block">
                  <span className="flex justify-between text-xs font-semibold text-slate-300">
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
                  <span className="flex justify-between text-xs font-semibold text-slate-300">
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
                  <span className="flex justify-between text-xs font-semibold text-slate-300">
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
              <div className="mt-7 rounded-xl border border-blue-400/20 bg-blue-500/10 p-5">
                <p className="font-mono text-[10px] font-bold uppercase tracking-wider text-blue-200">
                  Estimated monthly EMI
                </p>
                <p className="mt-1 font-display text-4xl font-extrabold text-white">
                  Rs {monthlyEmi.toLocaleString('en-IN')}
                </p>
              </div>
            </div>
          </div>
          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
              {product.finance.examples.map((example, index) => (
                <motion.div
                  key={example.label}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.06 }}
                  className="rounded-2xl border border-white/10 bg-white/[0.06] p-6 backdrop-blur transition-transform hover:-translate-y-1"
                >
                  <p className="font-display text-xl font-bold text-white">{example.label}</p>
                  <p className="mt-5 font-mono text-[10px] uppercase tracking-wider text-slate-400">Down Payment</p>
                  <p className="mt-1 text-lg font-bold text-blue-300">{example.downPayment}</p>
                  <p className="mt-4 font-mono text-[10px] uppercase tracking-wider text-slate-400">EMI</p>
                  <p className="mt-1 text-lg font-bold text-white">{example.emi}</p>
                  <p className="mt-4 text-xs text-slate-400">{example.tenure}</p>
                </motion.div>
              ))}
            </div>
            <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.06] p-7">
              <h3 className="font-display text-2xl font-bold text-white">Finance Benefits</h3>
              <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
                {product.finance.benefits.map((benefit) => (
                  <div key={benefit} className="flex gap-3 text-sm leading-relaxed text-slate-300">
                    <Check size={17} className="mt-0.5 shrink-0 text-blue-300" />
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
              <button
                onClick={() => onContactClick(`Finance application request: ${product.name}`)}
                className="mt-8 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-sm font-bold uppercase tracking-wider text-white transition-all hover:bg-blue-500"
              >
                Apply for Finance
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </section>

      <section id="gallery" className="mx-auto max-w-7xl px-6 py-24 md:px-16">
        <SectionHeader
          eyebrow="Gallery"
          title="Product Gallery"
          description="Large placeholder slots make future image replacement a simple data update."
          align="center"
        />
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          <button
            onClick={() => setLightboxOpen(true)}
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
          </button>
          <div className="grid grid-cols-2 gap-4 lg:col-span-4">
            {product.gallery.map((image, index) => (
              <button
                key={image.caption}
                onClick={() => setActiveGalleryIndex(index)}
                className={`group overflow-hidden rounded-xl border bg-white p-1 transition-all ${
                  activeGalleryIndex === index ? 'border-blue-600 shadow-lg' : 'border-slate-200'
                }`}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="h-28 w-full rounded-lg object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <p className="px-2 py-2 text-left text-xs font-semibold text-slate-600">{image.caption}</p>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-24">
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
                  className="rounded-2xl border border-slate-200 bg-slate-50 p-6 transition-all hover:-translate-y-1 hover:bg-white hover:shadow-xl"
                >
                  <Icon size={24} className="text-blue-600" />
                  <h3 className="mt-5 font-display text-xl font-bold text-slate-950">{feature.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-500">{feature.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24 md:px-16">
        <SectionHeader eyebrow="Variants" title="Choose Your Configuration" description="Three body configurations, one reusable product platform." />
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {product.variants.map((variant) => (
            <div key={variant.name} className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
              <h3 className="font-display text-2xl font-bold text-slate-950">{variant.name}</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-500">{variant.description}</p>
              <p className="mt-5 rounded-xl bg-blue-50 p-4 text-xs font-semibold leading-relaxed text-blue-900">
                {variant.bestFor}
              </p>
              <div className="mt-5 space-y-3">
                {variant.specs.map((spec) => (
                  <div key={spec.label} className="flex justify-between border-b border-slate-100 pb-2 text-sm">
                    <span className="text-slate-400">{spec.label}</span>
                    <span className="font-bold text-slate-900">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-slate-200 bg-slate-50 py-24">
        <div className="mx-auto max-w-7xl px-6 md:px-16">
          <SectionHeader eyebrow="Applications" title="Best Suited For" align="center" />
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {product.applications.map((application) => {
              const Icon = getIcon(application.iconName);
              return (
                <div
                  key={application.title}
                  className="group flex gap-5 rounded-2xl border border-slate-200 bg-white p-6 transition-all hover:-translate-y-1 hover:border-blue-300 hover:shadow-lg"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white">
                    <Icon size={22} />
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-bold text-slate-950">{application.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-500">{application.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section id="technical-specs" className="mx-auto max-w-7xl px-6 py-24 md:px-16">
        <SectionHeader
          eyebrow="Specifications"
          title="Technical Specifications"
          description={`${product.name} presentation spec sheet. Values are placeholders until verified client data is supplied.`}
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
                      <span className="text-slate-500">{row.label}</span>
                      <span className="font-mono font-semibold text-slate-950">{row.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-24 md:px-16">
        <div className="relative overflow-hidden rounded-3xl bg-slate-950 p-8 text-white shadow-2xl md:p-12">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_10%,rgba(59,130,246,0.25),transparent_36%)]" />
          <div className="relative z-10 grid grid-cols-1 gap-10 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <h2 className="font-display text-3xl font-extrabold md:text-4xl">{product.whyGemini.heading}</h2>
              <p className="mt-4 text-sm leading-relaxed text-slate-300">{product.whyGemini.description}</p>
            </div>
            <div className="grid grid-cols-2 gap-4 lg:col-span-7 md:grid-cols-4">
              {product.whyGemini.stats.map((stat) => (
                <div key={stat.label} className="rounded-2xl border border-white/10 bg-white/[0.06] p-5">
                  <p className="font-display text-3xl font-extrabold text-blue-300">{stat.value}</p>
                  <p className="mt-2 font-mono text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-6 md:px-16">
          <SectionHeader eyebrow="Related" title="Related Products" />
          <div className="flex gap-5 overflow-x-auto pb-3">
            {product.relatedProducts.map((item) => (
              <div key={item.name} className="min-w-[280px] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                <img src={item.imageUrl} alt={item.name} className="h-44 w-full object-cover" loading="lazy" />
                <div className="p-5">
                  <p className="font-mono text-[10px] font-bold uppercase tracking-wider text-blue-700">{item.category}</p>
                  <h3 className="mt-2 font-display text-xl font-bold text-slate-950">{item.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-500">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="product-enquiry" className="mx-auto max-w-7xl scroll-mt-32 px-6 py-24 md:px-16">
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
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-950 px-6 py-4 text-sm font-bold uppercase tracking-wider text-white transition-all hover:bg-blue-600 md:col-span-2"
            >
              Submit Enquiry
              <ArrowRight size={16} />
            </button>
          </form>
        </div>
      </section>

      <div className="fixed bottom-4 left-4 right-4 z-50 rounded-2xl border border-white/20 bg-slate-950/90 p-2 shadow-2xl backdrop-blur-xl">
        <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
          <a
            href="tel:+919422393288"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-white/10 px-3 py-3 text-xs font-bold uppercase tracking-wider text-white transition-colors hover:bg-white/15"
          >
            <Phone size={15} />
            Call
          </a>
          <a
            href={`https://wa.me/919422393288?text=${encodeURIComponent(`Hello, I am interested in ${product.name}.`)}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#25D366] px-3 py-3 text-xs font-bold uppercase tracking-wider text-white transition-colors hover:bg-[#20ba5a]"
          >
            <MessageCircle size={15} />
            WhatsApp
          </a>
          <button
            onClick={scrollToEnquiry}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-3 py-3 text-xs font-bold uppercase tracking-wider text-white transition-colors hover:bg-blue-500"
          >
            <Zap size={15} />
            Book Test Drive
          </button>
          <button
            onClick={() => onContactClick(`Download brochure request: ${product.name}`)}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-3 py-3 text-xs font-bold uppercase tracking-wider text-slate-950 transition-colors hover:bg-blue-50"
          >
            <Download size={15} />
            Brochure
          </button>
        </div>
      </div>

      {lightboxOpen && activeGalleryImage && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-slate-950/90 p-4 backdrop-blur-sm">
          <button
            onClick={() => setLightboxOpen(false)}
            className="absolute right-5 top-5 rounded-full bg-white/10 p-3 text-white transition-colors hover:bg-white/20"
            aria-label="Close gallery preview"
          >
            <X size={22} />
          </button>
          <div className="max-w-5xl">
            <img
              src={activeGalleryImage.src}
              alt={activeGalleryImage.alt}
              className="max-h-[78vh] rounded-2xl object-contain shadow-2xl"
            />
            <p className="mt-4 text-center text-sm font-semibold text-white">{activeGalleryImage.caption}</p>
          </div>
        </div>
      )}
    </article>
  );
}
