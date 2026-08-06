/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { FormEvent, useEffect } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import {
  BadgeIndianRupee,
  Building2,
  CheckCircle2,
  ChevronDown,
  Clock,
  HelpCircle,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
  Truck,
  Wrench,
} from 'lucide-react';
import { WHATSAPP_URL } from '../data';

interface ContactUsScreenProps {
  onContactClick: (prefilledSubject?: string) => void;
  onNavigateHome: () => void;
}

const phoneDisplay = '+91 94223 93288';
const phoneHref = 'tel:+919422393288';
const emailAddress = 'agnel899@gmail.com';
const mapSrc = 'https://www.google.com/maps?q=Panaji%20Goa%20Gemini%20Motors&output=embed';

const contactCards = [
  {
    title: 'Showroom Address',
    value: 'Gemini Motors, Panaji, Goa - 403001',
    helper: 'Commercial vehicle sales and customer support for Goa.',
    Icon: MapPin,
  },
  {
    title: 'Sales Number',
    value: phoneDisplay,
    helper: 'Speak with the Gemini Motors sales desk.',
    Icon: Phone,
  },
  {
    title: 'WhatsApp',
    value: phoneDisplay,
    helper: 'Quick product, brochure and appointment support.',
    Icon: MessageCircle,
  },
  {
    title: 'Email',
    value: emailAddress,
    helper: 'Send business, fleet and finance enquiries.',
    Icon: Mail,
  },
  {
    title: 'Business Hours',
    value: 'Monday to Saturday, 9 AM - 6 PM',
    helper: 'Appointments can be coordinated across Goa.',
    Icon: Clock,
  },
];

const quickContacts = [
  {
    title: 'Sales Team',
    description: 'Vehicle selection, model comparison, brochures and test drive support.',
    subject: 'Sales enquiry from Contact page',
    Icon: Truck,
  },
  {
    title: 'Finance Team',
    description: 'Loan guidance, EMI planning and documentation support for business buyers.',
    subject: 'Finance enquiry from Contact page',
    Icon: BadgeIndianRupee,
  },
  {
    title: 'Service Team',
    description: 'Workshop assistance, fleet service coordination and roadside support guidance.',
    subject: 'Service enquiry from Contact page',
    Icon: Wrench,
  },
];

const faqs = [
  {
    question: 'How do I request a brochure?',
    answer:
      'Use the enquiry form or WhatsApp button with the model name. The Gemini Motors team will share the right commercial vehicle brochure for your requirement in Goa.',
  },
  {
    question: 'Can I book a test drive?',
    answer:
      'Yes. Share your preferred vehicle, location and contact number, and our team will coordinate availability and timing for eligible models.',
  },
  {
    question: 'Do you provide finance?',
    answer:
      'Gemini Motors can guide business owners and fleet operators with finance assistance, EMI planning and documentation support through lending partners.',
  },
  {
    question: 'Do you deliver across Goa?',
    answer:
      'Yes. We support enquiries from Panaji, Vasco, Margao, Ponda, Verna Industrial Estate and other major business locations across Goa.',
  },
];

const vehicleOptions = [
  'Light Commercial Vehicle',
  'Medium & Heavy Commercial Vehicle',
  'Electric Mobility',
  'Green Technology',
  'Service Support',
  'Fleet Finance',
];

const pageVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0 },
};

function upsertMeta(name: string, content: string) {
  let element = document.querySelector<HTMLMetaElement>(`meta[name="${name}"]`);
  if (!element) {
    element = document.createElement('meta');
    element.name = name;
    document.head.appendChild(element);
  }
  element.content = content;
}

function upsertPropertyMeta(property: string, content: string) {
  let element = document.querySelector<HTMLMetaElement>(`meta[property="${property}"]`);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute('property', property);
    document.head.appendChild(element);
  }
  element.content = content;
}

function upsertCanonical(path: string) {
  let element = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!element) {
    element = document.createElement('link');
    element.rel = 'canonical';
    document.head.appendChild(element);
  }
  element.href = `${window.location.origin}${path}`;
}

export default function ContactUsScreen({ onNavigateHome }: ContactUsScreenProps) {
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    document.title = 'Contact Gemini Motors Goa | Commercial Vehicle Dealer';
    upsertMeta(
      'description',
      'Contact Gemini Motors Goa for Ashok Leyland commercial vehicles, finance assistance, service support and fleet enquiries across Goa.',
    );
    upsertMeta(
      'keywords',
      'Gemini Motors Goa, commercial vehicle dealer Goa, Ashok Leyland dealer Goa, truck finance Goa, fleet service Goa',
    );
    upsertCanonical('/contact/');
    upsertPropertyMeta('og:title', 'Contact Gemini Motors Goa | Commercial Vehicle Dealer');
    upsertPropertyMeta(
      'og:description',
      'Speak with Gemini Motors Goa for commercial vehicle sales, finance, fleet solutions, service support and product enquiries.',
    );
    upsertPropertyMeta('og:type', 'website');
    upsertPropertyMeta('og:url', `${window.location.origin}/contact/`);
    upsertMeta('twitter:card', 'summary_large_image');
    upsertMeta('twitter:title', 'Contact Gemini Motors Goa | Commercial Vehicle Dealer');
    upsertMeta(
      'twitter:description',
      'Connect with Gemini Motors Goa for commercial vehicles, finance assistance and service support.',
    );

    const schema = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': ['LocalBusiness', 'AutoDealer'],
          '@id': `${window.location.origin}/contact/#gemini-motors-goa`,
          name: 'Gemini Motors Goa',
          description:
            'Commercial vehicle dealer in Goa supporting Ashok Leyland vehicle enquiries, finance assistance, service support and fleet requirements.',
          url: window.location.origin,
          telephone: phoneDisplay,
          email: emailAddress,
          address: {
            '@type': 'PostalAddress',
            addressLocality: 'Panaji',
            addressRegion: 'Goa',
            postalCode: '403001',
            addressCountry: 'IN',
          },
          areaServed: ['Goa', 'Panaji', 'Vasco', 'Margao', 'Ponda', 'Verna Industrial Estate'],
        },
        {
          '@type': 'Organization',
          '@id': `${window.location.origin}/#organization`,
          name: 'Gemini Motors',
          url: window.location.origin,
          contactPoint: {
            '@type': 'ContactPoint',
            telephone: phoneDisplay,
            contactType: 'sales',
            areaServed: 'IN-GA',
            availableLanguage: ['English', 'Hindi', 'Konkani'],
          },
        },
      ],
    };

    let schemaNode = document.getElementById('contact-page-schema');
    if (!schemaNode) {
      schemaNode = document.createElement('script');
      schemaNode.id = 'contact-page-schema';
      schemaNode.setAttribute('type', 'application/ld+json');
      document.head.appendChild(schemaNode);
    }
    schemaNode.textContent = JSON.stringify(schema);
  }, []);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    window.location.href = '/thank-you.html';
  };

  const motionProps = prefersReducedMotion
    ? {}
    : {
        initial: 'hidden',
        animate: 'visible',
        variants: pageVariants,
      };

  return (
    <motion.div
      className="overflow-hidden bg-[#f8f9ff] text-slate-950"
      {...motionProps}
    >
      <section className="relative bg-slate-950 px-6 py-16 text-white md:px-16 md:py-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(31,95,174,0.32),transparent_36%),linear-gradient(135deg,rgba(15,23,42,0.98),rgba(7,17,34,1))]" />
        <div className="relative mx-auto max-w-7xl">
          <motion.nav
            variants={itemVariants}
            className="mb-8 flex items-center gap-2 text-sm font-semibold text-blue-100"
            aria-label="Breadcrumb"
          >
            <button
              type="button"
              onClick={onNavigateHome}
              className="rounded-md text-blue-100 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300"
            >
              Home
            </button>
            <span className="text-blue-300">/</span>
            <span className="text-white">Contact Us</span>
          </motion.nav>

          <div className="grid gap-10 lg:grid-cols-[1fr_0.8fr] lg:items-end">
            <motion.div variants={itemVariants} className="max-w-3xl">
              <p className="mb-4 font-mono text-xs font-bold uppercase tracking-[0.24em] text-blue-300">
                Gemini Motors Goa
              </p>
              <h1 className="font-display text-4xl font-extrabold leading-tight tracking-tight md:text-6xl">
                Contact Gemini Motors Goa
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-8 text-slate-200 md:text-lg">
                Speak with our commercial vehicle specialists for sales, finance, fleet solutions, service support and product enquiries.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href={phoneHref}
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#1f5fae] px-6 text-sm font-extrabold uppercase tracking-wide text-white shadow-lg shadow-blue-950/25 transition-all hover:-translate-y-0.5 hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300"
                >
                  <Phone size={18} />
                  Call Now
                </a>
                <button
                  type="button"
                  onClick={() => window.open(WHATSAPP_URL, '_blank', 'noopener,noreferrer')}
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#25D366] px-6 text-sm font-extrabold uppercase tracking-wide text-slate-950 shadow-lg shadow-green-950/20 transition-all hover:-translate-y-0.5 hover:bg-[#20ba5a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-300"
                >
                  <MessageCircle size={18} />
                  Chat on WhatsApp
                </button>
              </div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="rounded-3xl border border-white/15 bg-white/10 p-6 shadow-2xl shadow-slate-950/25 backdrop-blur-xl"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/20 text-blue-100">
                  <CheckCircle2 size={22} />
                </span>
                <div>
                  <p className="font-display text-xl font-extrabold">Goa-wide customer support</p>
                  <p className="mt-1 text-sm leading-6 text-slate-200">
                    Sales, finance and service guidance for business owners, contractors and fleet operators.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="px-6 py-14 md:px-16">
        <div className="mx-auto grid max-w-7xl gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {contactCards.map(({ title, value, helper, Icon }) => (
            <motion.article
              variants={itemVariants}
              key={title}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-950/10"
            >
              <span className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
                <Icon size={20} />
              </span>
              <h2 className="font-display text-sm font-extrabold uppercase tracking-wider text-slate-500">{title}</h2>
              <p className="mt-3 text-base font-extrabold leading-6 text-slate-950">{value}</p>
              <p className="mt-2 text-sm leading-6 text-slate-600">{helper}</p>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="px-6 pb-14 md:px-16">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <motion.div
            variants={itemVariants}
            className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl shadow-slate-950/8"
          >
            <iframe
              title="Gemini Motors Goa location map"
              src={mapSrc}
              className="h-[420px] w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              aria-label="Google map showing Gemini Motors Goa location"
            />
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-950/8 md:p-8"
          >
            <p className="font-mono text-xs font-bold uppercase tracking-[0.22em] text-blue-600">Enquiry Form</p>
            <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-slate-950">
              Send Enquiry
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              Share your requirement and our Goa team will connect with the right sales, finance or service guidance.
            </p>

            <form onSubmit={handleSubmit} className="mt-7 grid gap-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="grid gap-2 text-sm font-bold text-slate-700">
                  Name
                  <input
                    required
                    name="name"
                    autoComplete="name"
                    className="min-h-12 rounded-xl border border-slate-200 bg-slate-50 px-4 text-slate-950 outline-none transition focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-100"
                  />
                </label>
                <label className="grid gap-2 text-sm font-bold text-slate-700">
                  Mobile Number
                  <input
                    required
                    name="mobile"
                    type="tel"
                    autoComplete="tel"
                    className="min-h-12 rounded-xl border border-slate-200 bg-slate-50 px-4 text-slate-950 outline-none transition focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-100"
                  />
                </label>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="grid gap-2 text-sm font-bold text-slate-700">
                  Email
                  <input
                    name="email"
                    type="email"
                    autoComplete="email"
                    className="min-h-12 rounded-xl border border-slate-200 bg-slate-50 px-4 text-slate-950 outline-none transition focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-100"
                  />
                </label>
                <label className="grid gap-2 text-sm font-bold text-slate-700">
                  Company
                  <input
                    name="company"
                    autoComplete="organization"
                    className="min-h-12 rounded-xl border border-slate-200 bg-slate-50 px-4 text-slate-950 outline-none transition focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-100"
                  />
                </label>
              </div>
              <label className="grid gap-2 text-sm font-bold text-slate-700">
                Vehicle Interested In
                <select
                  name="vehicle"
                  defaultValue=""
                  className="min-h-12 rounded-xl border border-slate-200 bg-slate-50 px-4 text-slate-950 outline-none transition focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-100"
                >
                  <option value="" disabled>
                    Select requirement
                  </option>
                  {vehicleOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </label>
              <label className="grid gap-2 text-sm font-bold text-slate-700">
                Message
                <textarea
                  required
                  name="message"
                  rows={4}
                  className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-950 outline-none transition focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-100"
                />
              </label>
              <button
                type="submit"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-slate-950 px-6 text-sm font-extrabold uppercase tracking-wide text-white shadow-lg shadow-slate-950/20 transition-all hover:-translate-y-0.5 hover:bg-blue-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300 sm:w-fit"
              >
                <Send size={17} />
                Send Enquiry
              </button>
            </form>
          </motion.div>
        </div>
      </section>

      <section className="px-6 pb-14 md:px-16">
        <div className="mx-auto max-w-7xl">
          <motion.div variants={itemVariants} className="mb-6">
            <p className="font-mono text-xs font-bold uppercase tracking-[0.22em] text-blue-600">Quick Contact</p>
            <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-slate-950">
              Reach the right Gemini Motors team
            </h2>
          </motion.div>

          <div className="grid gap-5 md:grid-cols-3">
            {quickContacts.map(({ title, description, subject, Icon }) => (
              <motion.article
                variants={itemVariants}
                key={title}
                className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
                  <Icon size={21} />
                </span>
                <h3 className="mt-5 font-display text-xl font-extrabold text-slate-950">{title}</h3>
                <p className="mt-3 min-h-[72px] text-sm leading-6 text-slate-600">{description}</p>
                <div className="mt-5 grid grid-cols-2 gap-3">
                  <a
                    href={phoneHref}
                    className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white text-sm font-extrabold text-slate-900 transition-all hover:border-blue-200 hover:bg-blue-50"
                  >
                    <Phone size={16} />
                    Call
                  </a>
                  <button
                    type="button"
                    onClick={() => window.open(WHATSAPP_URL, '_blank', 'noopener,noreferrer')}
                    className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[#25D366] text-sm font-extrabold text-slate-950 transition-all hover:bg-[#20ba5a]"
                  >
                    <MessageCircle size={16} />
                    WhatsApp
                  </button>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 pb-20 md:px-16">
        <div className="mx-auto max-w-4xl">
          <motion.div variants={itemVariants} className="mb-6 text-center">
            <p className="font-mono text-xs font-bold uppercase tracking-[0.22em] text-blue-600">FAQ</p>
            <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-slate-950">
              Common contact questions
            </h2>
          </motion.div>

          <div className="grid gap-3">
            {faqs.map(({ question, answer }) => (
              <motion.details
                variants={itemVariants}
                key={question}
                className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-base font-extrabold text-slate-950">
                  <span className="flex items-center gap-3">
                    <HelpCircle size={19} className="text-blue-600" />
                    {question}
                  </span>
                  <ChevronDown size={18} className="shrink-0 transition-transform group-open:rotate-180" />
                </summary>
                <p className="mt-4 border-t border-slate-100 pt-4 text-sm leading-7 text-slate-600">{answer}</p>
              </motion.details>
            ))}
          </div>
        </div>
      </section>
    </motion.div>
  );
}
