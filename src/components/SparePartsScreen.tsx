import { useMemo, useState, type ReactNode } from 'react';
import {
  CheckCircle2,
  ExternalLink,
  MessageCircle,
  Minus,
  Plus,
  Search,
  ShoppingCart,
  Trash2,
  X,
} from 'lucide-react';

interface SparePartsScreenProps {
  onContactClick?: (subject?: string) => void;
}

type ProductCategory = 'Ashok Leyland' | 'SWITCH Mobility' | 'Solar';

type ProductVisual =
  | 'bearing'
  | 'filter'
  | 'brake'
  | 'gasket'
  | 'thermostat'
  | 'seal'
  | 'charger'
  | 'battery'
  | 'disc'
  | 'drum'
  | 'steering'
  | 'suspension'
  | 'solar-small'
  | 'solar-compact'
  | 'solar-standard'
  | 'solar-flex'
  | 'solar-bifacial'
  | 'solar-topcon';

interface StoreProduct {
  id: string;
  name: string;
  category: ProductCategory;
  reference: string;
  description: string;
  compatibility: string;
  sourceLabel: string;
  sourceUrl: string;
  visual: ProductVisual;
  tag?: string;
}

const WHATSAPP_NUMBER = '919422393288';

const PRODUCTS: StoreProduct[] = [
  {
    id: 'al-hub-bearing',
    name: 'Rear Hub Bearing 580/572',
    category: 'Ashok Leyland',
    reference: 'F3F07700',
    description: 'Genuine-part listing referenced from Ashok Leyland Leykart.',
    compatibility: 'Confirm vehicle / chassis compatibility before order.',
    sourceLabel: 'Leykart official listing',
    sourceUrl: 'https://leykart.com/',
    visual: 'bearing',
    tag: 'Genuine parts',
  },
  {
    id: 'al-pre-fuel-filter',
    name: 'Pre Fuel Filter Element H6-CB28',
    category: 'Ashok Leyland',
    reference: 'F7B02900',
    description: 'Fuel-system service part listed in the official Leykart catalogue.',
    compatibility: 'Confirm H6 application and chassis before order.',
    sourceLabel: 'Leykart official listing',
    sourceUrl: 'https://leykart.com/',
    visual: 'filter',
  },
  {
    id: 'al-brake-lining',
    name: 'Brake Lining Kit HLP-WOR 17.7 cm STD',
    category: 'Ashok Leyland',
    reference: 'P5105324',
    description: 'Brake-system spare listed by Ashok Leyland Leykart.',
    compatibility: 'Fitment must be checked against vehicle / chassis.',
    sourceLabel: 'Leykart official listing',
    sourceUrl: 'https://leykart.com/',
    visual: 'brake',
  },
  {
    id: 'al-head-gasket',
    name: 'Cylinder Head Gasket MLS H6 IMP',
    category: 'Ashok Leyland',
    reference: 'X1711400',
    description: 'Engine gasket listed in the official Ashok Leyland spare-parts catalogue.',
    compatibility: 'Confirm engine variant and chassis before order.',
    sourceLabel: 'Leykart official listing',
    sourceUrl: 'https://leykart.com/',
    visual: 'gasket',
  },
  {
    id: 'al-thermostat',
    name: 'Thermostat 82° H4 / H6 / N4 / A4',
    category: 'Ashok Leyland',
    reference: 'X1W01100',
    description: 'Cooling-system thermostat listed by Leykart for supported engine families.',
    compatibility: 'Confirm engine family and chassis before order.',
    sourceLabel: 'Leykart official listing',
    sourceUrl: 'https://leykart.com/',
    visual: 'thermostat',
  },
  {
    id: 'al-crank-seal',
    name: 'Crankshaft Rear-End Oil Seal – H Series',
    category: 'Ashok Leyland',
    reference: 'X2705100',
    description: 'H-Series engine oil seal referenced from the official Leykart catalogue.',
    compatibility: 'Confirm engine and chassis before order.',
    sourceLabel: 'Leykart official listing',
    sourceUrl: 'https://leykart.com/',
    visual: 'seal',
  },
  {
    id: 'switch-ccs2',
    name: 'CCS2 Charging System Support',
    category: 'SWITCH Mobility',
    reference: 'IeV4 charging system',
    description: 'IeV4 officially specifies CCS2 with AC and DC charging capability.',
    compatibility: 'Service item only — exact part number to be confirmed by VIN.',
    sourceLabel: 'SWITCH IeV4 official',
    sourceUrl: 'https://www.evtrucks.switchmobilityev.com/iev4/',
    visual: 'charger',
    tag: 'Compatibility check',
  },
  {
    id: 'switch-battery',
    name: 'Liquid-Cooled Battery Pack Service',
    category: 'SWITCH Mobility',
    reference: 'IeV series battery system',
    description: 'SWITCH documents a liquid-cooled battery pack in its official IeV material.',
    compatibility: 'Battery / service component selection requires VIN confirmation.',
    sourceLabel: 'SWITCH official brochure',
    sourceUrl: 'https://www.switchmobilityev.com/sites/default/files/IeV_Series_Brochure.pdf',
    visual: 'battery',
  },
  {
    id: 'switch-front-brake',
    name: 'Front Disc Brake Service Components',
    category: 'SWITCH Mobility',
    reference: 'IeV4 front disc brakes',
    description: 'IeV4 official specifications list disc brakes at the front.',
    compatibility: 'Exact replacement component to be confirmed by VIN.',
    sourceLabel: 'SWITCH IeV4 official',
    sourceUrl: 'https://www.evtrucks.switchmobilityev.com/iev4/',
    visual: 'disc',
  },
  {
    id: 'switch-rear-brake',
    name: 'Rear Drum Brake Service Components',
    category: 'SWITCH Mobility',
    reference: 'IeV4 rear drum brakes',
    description: 'IeV4 official specifications list drum brakes at the rear.',
    compatibility: 'Exact replacement component to be confirmed by VIN.',
    sourceLabel: 'SWITCH IeV4 official',
    sourceUrl: 'https://www.evtrucks.switchmobilityev.com/iev4/',
    visual: 'drum',
  },
  {
    id: 'switch-steering',
    name: 'Electric Power Steering Service Components',
    category: 'SWITCH Mobility',
    reference: 'IeV4 EPS system',
    description: 'Electric Power Steering is listed in SWITCH IeV4 official specifications.',
    compatibility: 'Exact assembly / service part to be confirmed by VIN.',
    sourceLabel: 'SWITCH IeV4 official',
    sourceUrl: 'https://www.evtrucks.switchmobilityev.com/iev4/',
    visual: 'steering',
  },
  {
    id: 'switch-suspension',
    name: 'Suspension Service Components',
    category: 'SWITCH Mobility',
    reference: 'IeV4 front & rear suspension',
    description: 'IeV4 specifies parabolic front and semi-elliptic rear leaf suspension.',
    compatibility: 'Exact spring / bush / service component to be confirmed by VIN.',
    sourceLabel: 'SWITCH IeV4 official',
    sourceUrl: 'https://www.evtrucks.switchmobilityev.com/iev4/',
    visual: 'suspension',
  },
  {
    id: 'solar-waaree-45',
    name: 'Waaree 45Wp 12V Mono PERC Module',
    category: 'Solar',
    reference: '45Wp / 12V',
    description: 'Compact Mono PERC solar module listed in Waaree’s official online catalogue.',
    compatibility: 'Confirm system voltage, controller and installation requirements.',
    sourceLabel: 'Waaree official store',
    sourceUrl: 'https://shop.waaree.com/waaree-45wp-12v-mono-perc-solar-modules/',
    visual: 'solar-small',
    tag: 'Solar module',
  },
  {
    id: 'solar-waaree-50',
    name: 'Waaree 50Wp 12V Mono PERC Module',
    category: 'Solar',
    reference: '50Wp / 12V',
    description: 'Small-format Mono PERC PV module from Waaree’s official solar catalogue.',
    compatibility: 'Confirm system voltage, controller and installation requirements.',
    sourceLabel: 'Waaree official store',
    sourceUrl: 'https://shop.waaree.com/waaree-50wp-12v-mono-perc-solar-module/',
    visual: 'solar-compact',
  },
  {
    id: 'solar-waaree-100',
    name: 'Waaree 100W 12V Solar Panel',
    category: 'Solar',
    reference: '100Wp / 12V',
    description: 'High-efficiency PV module listed in Waaree’s official store.',
    compatibility: 'Confirm system voltage, controller and installation requirements.',
    sourceLabel: 'Waaree official store',
    sourceUrl: 'https://shop.waaree.com/waaree-100-watt-12v-solar-panel-high-efficiency-pv-module/',
    visual: 'solar-standard',
  },
  {
    id: 'solar-waaree-200',
    name: 'Waaree 200Wp Mono PERC Solar PV Module',
    category: 'Solar',
    reference: '200Wp Mono PERC',
    description: 'Mono PERC module designed for residential, commercial and off-grid use.',
    compatibility: 'Confirm inverter / controller sizing and installation requirements.',
    sourceLabel: 'Waaree official product',
    sourceUrl: 'https://shop.waaree.com/waaree-200wp-mono-perc-solar-pv-module/',
    visual: 'solar-standard',
  },
  {
    id: 'solar-waaree-flex',
    name: 'Waaree 84Wp Mono PERC Flexible Module',
    category: 'Solar',
    reference: '84Wp flexible',
    description: 'Lightweight flexible Mono PERC module for suitable curved or low-load surfaces.',
    compatibility: 'Installation surface and electrical design must be confirmed.',
    sourceLabel: 'Waaree official product',
    sourceUrl: 'https://shop.waaree.com/waaree-84wp-mono-perc-flexible-solar-module/',
    visual: 'solar-flex',
  },
  {
    id: 'solar-waaree-topcon',
    name: 'Waaree 540Wp N-Type Bifacial DCR Module',
    category: 'Solar',
    reference: '540Wp / 144-cell / N-Type',
    description: 'Dual-glass N-Type TOPCon bifacial DCR solar module from Waaree.',
    compatibility: 'Confirm structure, inverter string design and project requirements.',
    sourceLabel: 'Waaree official product',
    sourceUrl: 'https://shop.waaree.com/waaree-540wp-144cells-24-volts-n-type-framed-dual-glass-bifacial-dcr-solar-module/',
    visual: 'solar-topcon',
  },
];

const CATEGORY_OPTIONS: Array<'All' | ProductCategory> = [
  'All',
  'Ashok Leyland',
  'SWITCH Mobility',
  'Solar',
];

function ProductArtwork({ visual, reference }: { visual: ProductVisual; reference: string }) {
  const common = 'h-28 w-28 drop-shadow-[0_18px_20px_rgba(15,23,42,0.16)]';

  let art: ReactNode;

  switch (visual) {
    case 'bearing':
    case 'seal':
      art = (
        <svg viewBox="0 0 120 120" className={common} aria-hidden="true">
          <circle cx="60" cy="60" r="43" fill="#1e293b" />
          <circle cx="60" cy="60" r="31" fill="#94a3b8" />
          <circle cx="60" cy="60" r="17" fill="#f8fafc" />
          {visual === 'bearing' &&
            [0, 45, 90, 135, 180, 225, 270, 315].map((deg) => {
              const rad = (deg * Math.PI) / 180;
              return (
                <circle
                  key={deg}
                  cx={60 + Math.cos(rad) * 25}
                  cy={60 + Math.sin(rad) * 25}
                  r="4.5"
                  fill="#e2e8f0"
                />
              );
            })}
        </svg>
      );
      break;
    case 'filter':
      art = (
        <svg viewBox="0 0 120 120" className={common} aria-hidden="true">
          <ellipse cx="60" cy="28" rx="30" ry="12" fill="#1d4ed8" />
          <path d="M30 28v58c0 9 13 17 30 17s30-8 30-17V28" fill="#2563eb" />
          <ellipse cx="60" cy="86" rx="30" ry="13" fill="#1e40af" />
          {[42, 51, 60, 69, 78].map((y) => (
            <path key={y} d={`M36 ${y}h48`} stroke="#bfdbfe" strokeWidth="3" opacity=".72" />
          ))}
        </svg>
      );
      break;
    case 'brake':
      art = (
        <svg viewBox="0 0 120 120" className={common} aria-hidden="true">
          <circle cx="60" cy="60" r="37" fill="#334155" />
          <circle cx="60" cy="60" r="19" fill="#cbd5e1" />
          <path d="M28 37c-14 26-8 50 10 66" fill="none" stroke="#f59e0b" strokeWidth="11" strokeLinecap="round" />
          <path d="M92 37c14 26 8 50-10 66" fill="none" stroke="#f59e0b" strokeWidth="11" strokeLinecap="round" />
        </svg>
      );
      break;
    case 'gasket':
      art = (
        <svg viewBox="0 0 120 120" className={common} aria-hidden="true">
          <path d="M18 30h84v60H18z" fill="#94a3b8" stroke="#475569" strokeWidth="5" />
          {[34, 60, 86].map((x) => <circle key={x} cx={x} cy="60" r="13" fill="#f8fafc" />)}
          {[[24, 36], [96, 36], [24, 84], [96, 84]].map(([x, y]) => (
            <circle key={`${x}-${y}`} cx={x} cy={y} r="4" fill="#334155" />
          ))}
        </svg>
      );
      break;
    case 'thermostat':
      art = (
        <svg viewBox="0 0 120 120" className={common} aria-hidden="true">
          <path d="M40 45c0-18 40-18 40 0v11H40z" fill="#cbd5e1" stroke="#64748b" strokeWidth="4" />
          <path d="M51 56v13h18V56" fill="#94a3b8" />
          <path d="M45 70h30l-5 28H50z" fill="#64748b" />
          <path d="M48 76h24M49 83h22M50 90h20" stroke="#e2e8f0" strokeWidth="3" />
        </svg>
      );
      break;
    case 'charger':
      art = (
        <svg viewBox="0 0 120 120" className={common} aria-hidden="true">
          <rect x="25" y="18" width="58" height="78" rx="10" fill="#0f766e" />
          <rect x="35" y="29" width="38" height="26" rx="4" fill="#ccfbf1" />
          <path d="M55 62l-8 13h9l-3 13 17-19H60l5-7z" fill="#facc15" />
          <path d="M83 66c17 2 18 13 11 21" fill="none" stroke="#134e4a" strokeWidth="7" strokeLinecap="round" />
          <rect x="90" y="82" width="13" height="20" rx="4" fill="#115e59" />
        </svg>
      );
      break;
    case 'battery':
      art = (
        <svg viewBox="0 0 120 120" className={common} aria-hidden="true">
          <rect x="18" y="38" width="84" height="48" rx="8" fill="#0f766e" />
          <rect x="27" y="30" width="12" height="8" rx="2" fill="#134e4a" />
          <rect x="81" y="30" width="12" height="8" rx="2" fill="#134e4a" />
          {[32, 48, 64, 80].map((x) => <rect key={x} x={x} y="48" width="9" height="28" rx="2" fill="#5eead4" />)}
          <path d="M58 46l-8 15h9l-4 15 18-21H63l5-9z" fill="#facc15" />
        </svg>
      );
      break;
    case 'disc':
    case 'drum':
      art = (
        <svg viewBox="0 0 120 120" className={common} aria-hidden="true">
          <circle cx="60" cy="60" r="43" fill={visual === 'disc' ? '#94a3b8' : '#475569'} />
          <circle cx="60" cy="60" r="20" fill="#e2e8f0" />
          <circle cx="60" cy="60" r="8" fill="#334155" />
          {[0, 72, 144, 216, 288].map((deg) => {
            const rad = (deg * Math.PI) / 180;
            return (
              <circle
                key={deg}
                cx={60 + Math.cos(rad) * 29}
                cy={60 + Math.sin(rad) * 29}
                r="4"
                fill="#334155"
              />
            );
          })}
        </svg>
      );
      break;
    case 'steering':
      art = (
        <svg viewBox="0 0 120 120" className={common} aria-hidden="true">
          <circle cx="60" cy="60" r="39" fill="none" stroke="#0f766e" strokeWidth="10" />
          <circle cx="60" cy="60" r="11" fill="#115e59" />
          <path d="M60 49V22M51 67L30 83M69 67l21 16" stroke="#115e59" strokeWidth="7" strokeLinecap="round" />
        </svg>
      );
      break;
    case 'suspension':
      art = (
        <svg viewBox="0 0 120 120" className={common} aria-hidden="true">
          {[0, 8, 16, 24].map((offset) => (
            <path
              key={offset}
              d={`M18 ${46 + offset} Q60 ${85 + offset} 102 ${46 + offset}`}
              fill="none"
              stroke={offset === 0 ? '#0f766e' : '#475569'}
              strokeWidth="6"
              strokeLinecap="round"
            />
          ))}
          <circle cx="18" cy="46" r="8" fill="#cbd5e1" />
          <circle cx="102" cy="46" r="8" fill="#cbd5e1" />
        </svg>
      );
      break;
    default:
      art = (
        <svg viewBox="0 0 120 120" className={common} aria-hidden="true">
          <g transform={visual === 'solar-flex' ? 'rotate(-9 60 60)' : undefined}>
            <rect x="19" y="18" width="82" height="76" rx={visual === 'solar-flex' ? 9 : 3} fill="#0f3b72" stroke="#1d4ed8" strokeWidth="4" />
            {[39, 59, 79].map((x) => <path key={x} d={`M${x} 20v72`} stroke="#93c5fd" strokeWidth="2" />)}
            {[37, 56, 75].map((y) => <path key={y} d={`M21 ${y}h78`} stroke="#93c5fd" strokeWidth="2" />)}
            {visual === 'solar-bifacial' || visual === 'solar-topcon' ? (
              <rect x="24" y="23" width="72" height="66" fill="none" stroke="#bfdbfe" strokeWidth="2" opacity=".8" />
            ) : null}
          </g>
          <path d="M42 95h36M50 95l-8 12M70 95l8 12" stroke="#475569" strokeWidth="4" strokeLinecap="round" />
          {visual === 'solar-topcon' ? <path d="M91 16l5 7 8 2-6 6 1 8-8-4-7 4 1-8-6-6 8-2z" fill="#facc15" /> : null}
        </svg>
      );
      break;
  }

  return (
    <div className="relative flex h-48 items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <div className="absolute left-5 top-5 rounded-full border border-slate-200 bg-white/90 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-500 shadow-sm">
        Original product illustration
      </div>
      <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-blue-100/60" />
      <div className="absolute -bottom-8 -left-8 h-28 w-28 rounded-full bg-emerald-100/50" />
      {art}
      <span className="absolute bottom-4 right-5 rounded-lg bg-slate-950/90 px-2.5 py-1 text-[10px] font-semibold tracking-wide text-white">
        {reference}
      </span>
    </div>
  );
}

export default function SparePartsScreen({ onContactClick }: SparePartsScreenProps) {
  const [activeCategory, setActiveCategory] = useState<'All' | ProductCategory>('All');
  const [search, setSearch] = useState('');
  const [cart, setCart] = useState<Record<string, number>>({});
  const [cartOpen, setCartOpen] = useState(false);

  const visibleProducts = useMemo(() => {
    const query = search.trim().toLowerCase();

    return PRODUCTS.filter((product) => {
      const matchesCategory = activeCategory === 'All' || product.category === activeCategory;
      const matchesSearch =
        !query ||
        [product.name, product.reference, product.category, product.description]
          .join(' ')
          .toLowerCase()
          .includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, search]);

  const cartItems = useMemo(
    () =>
      PRODUCTS.filter((product) => cart[product.id]).map((product) => ({
        ...product,
        quantity: cart[product.id],
      })),
    [cart]
  );

  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const addToCart = (productId: string) => {
    setCart((current) => ({
      ...current,
      [productId]: (current[productId] || 0) + 1,
    }));
  };

  const setQuantity = (productId: string, quantity: number) => {
    setCart((current) => {
      if (quantity <= 0) {
        const next = { ...current };
        delete next[productId];
        return next;
      }

      return { ...current, [productId]: quantity };
    });
  };

  const sendCartToWhatsApp = () => {
    if (!cartItems.length) return;

    const lines = cartItems.map(
      (item, index) =>
        `${index + 1}. ${item.name}\n   Ref: ${item.reference}\n   Qty: ${item.quantity}`
    );

    const message = [
      'Hello Gemini Motors,',
      '',
      'I would like a quote for the following items:',
      '',
      ...lines,
      '',
      'Please confirm compatibility, availability, current price, taxes, warranty and delivery.',
      'For vehicle parts, I can share the vehicle registration / chassis number on request.',
    ].join('\n');

    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`,
      '_blank',
      'noopener,noreferrer'
    );
  };

  return (
    <section className="min-h-screen bg-[#f7f9fc]">
      <div className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-5 py-10 md:py-14">
          <div className="grid items-end gap-8 lg:grid-cols-[1fr_auto]">
            <div className="max-w-3xl">
              <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-blue-700">
                Gemini Motors Parts & Energy Store
              </p>
              <h1 className="text-4xl font-black tracking-tight text-[#0b1c30] md:text-5xl">
                Add to cart. Confirm on WhatsApp.
              </h1>
              <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-600">
                Browse selected Ashok Leyland genuine spares, SWITCH Mobility service components
                and solar modules. Add what you need to one quote cart and send it directly to
                Gemini Motors on WhatsApp.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setCartOpen(true)}
              className="inline-flex items-center justify-center gap-3 rounded-2xl bg-[#0b1c30] px-6 py-4 font-bold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-slate-800"
            >
              <ShoppingCart className="h-5 w-5" />
              Quote Cart
              <span className="rounded-full bg-blue-600 px-2.5 py-1 text-xs">{totalQuantity}</span>
            </button>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-800">
              <CheckCircle2 className="h-4 w-4" />
              Manufacturer information referenced
            </span>
            <span className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-800">
              <MessageCircle className="h-4 w-4" />
              Final price & fitment confirmed on WhatsApp
            </span>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-5 py-10 md:py-14">
        <div className="mb-8 grid gap-4 lg:grid-cols-[1fr_auto]">
          <label className="relative block">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search product, part number or category"
              className="w-full rounded-2xl border border-slate-200 bg-white py-3.5 pl-12 pr-4 text-sm font-medium text-slate-900 shadow-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            />
          </label>

          <div className="flex flex-wrap gap-2">
            {CATEGORY_OPTIONS.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={`rounded-xl px-4 py-3 text-sm font-bold transition ${
                  activeCategory === category
                    ? 'bg-blue-700 text-white shadow-md'
                    : 'border border-slate-200 bg-white text-slate-700 hover:border-blue-300'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-7 flex items-center justify-between gap-4">
          <p className="text-sm font-semibold text-slate-500">
            Showing {visibleProducts.length} products
          </p>
          <p className="text-right text-xs leading-5 text-slate-500">
            Illustrations are original representations; actual supplied parts may vary.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {visibleProducts.map((product) => {
            const inCart = cart[product.id] || 0;

            return (
              <article
                key={product.id}
                className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
              >
                <ProductArtwork visual={product.visual} reference={product.reference} />

                <div className="p-6">
                  <div className="mb-4 flex items-start justify-between gap-3">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-bold ${
                        product.category === 'Ashok Leyland'
                          ? 'bg-blue-50 text-blue-800'
                          : product.category === 'SWITCH Mobility'
                          ? 'bg-emerald-50 text-emerald-800'
                          : 'bg-amber-50 text-amber-800'
                      }`}
                    >
                      {product.category}
                    </span>
                    {product.tag ? (
                      <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                        {product.tag}
                      </span>
                    ) : null}
                  </div>

                  <h2 className="min-h-[3.5rem] text-xl font-black leading-7 text-[#0b1c30]">
                    {product.name}
                  </h2>

                  <p className="mt-2 text-sm font-bold text-blue-700">{product.reference}</p>
                  <p className="mt-4 min-h-[3.75rem] text-sm leading-6 text-slate-600">
                    {product.description}
                  </p>
                  <p className="mt-3 text-xs leading-5 text-slate-500">
                    {product.compatibility}
                  </p>

                  <a
                    href={product.sourceUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 underline decoration-slate-300 underline-offset-4 hover:text-blue-700"
                  >
                    {product.sourceLabel}
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>

                  <div className="mt-6 flex items-center justify-between gap-3 border-t border-slate-100 pt-5">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                        Price
                      </p>
                      <p className="mt-1 font-black text-[#0b1c30]">Request quote</p>
                    </div>

                    {inCart ? (
                      <div className="flex items-center rounded-xl border border-slate-200 bg-slate-50 p-1">
                        <button
                          type="button"
                          aria-label={`Reduce ${product.name} quantity`}
                          onClick={() => setQuantity(product.id, inCart - 1)}
                          className="rounded-lg p-2 text-slate-700 hover:bg-white"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="min-w-9 text-center text-sm font-black">{inCart}</span>
                        <button
                          type="button"
                          aria-label={`Increase ${product.name} quantity`}
                          onClick={() => setQuantity(product.id, inCart + 1)}
                          className="rounded-lg p-2 text-slate-700 hover:bg-white"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => addToCart(product.id)}
                        className="inline-flex items-center gap-2 rounded-xl bg-blue-700 px-4 py-3 text-sm font-bold text-white transition hover:bg-blue-800"
                      >
                        <ShoppingCart className="h-4 w-4" />
                        Add
                      </button>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {!visibleProducts.length ? (
          <div className="mt-10 rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center">
            <p className="font-bold text-slate-800">No matching products found.</p>
            <p className="mt-2 text-sm text-slate-500">Try another part number, product name or category.</p>
          </div>
        ) : null}

        <div className="mt-12 grid gap-6 rounded-3xl bg-[#0b1c30] p-7 text-white md:grid-cols-[1fr_auto] md:items-center md:p-9">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-blue-300">
              Can’t find the exact part?
            </p>
            <h2 className="mt-2 text-2xl font-black">Send your vehicle and part details to Gemini Motors.</h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300">
              For Ashok Leyland and SWITCH parts, keep the registration number or chassis / VIN
              ready so the team can confirm the correct fitment before supplying.
            </p>
          </div>
          {onContactClick ? (
            <button
              type="button"
              onClick={() => onContactClick('Spare Parts')}
              className="rounded-xl bg-white px-5 py-3 font-bold text-[#0b1c30]"
            >
              Contact Gemini Motors
            </button>
          ) : null}
        </div>
      </div>

      {cartOpen ? (
        <div className="fixed inset-0 z-[100]">
          <button
            type="button"
            aria-label="Close quote cart"
            className="absolute inset-0 bg-slate-950/45 backdrop-blur-sm"
            onClick={() => setCartOpen(false)}
          />

          <aside className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-200 p-5">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-blue-700">Gemini Motors</p>
                <h2 className="mt-1 text-2xl font-black text-[#0b1c30]">Quote Cart</h2>
              </div>
              <button
                type="button"
                onClick={() => setCartOpen(false)}
                className="rounded-xl border border-slate-200 p-2.5 text-slate-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-5">
              {cartItems.length ? (
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div key={item.id} className="rounded-2xl border border-slate-200 p-4">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="text-xs font-bold text-blue-700">{item.category}</p>
                          <h3 className="mt-1 font-black text-[#0b1c30]">{item.name}</h3>
                          <p className="mt-1 text-xs text-slate-500">{item.reference}</p>
                        </div>
                        <button
                          type="button"
                          aria-label={`Remove ${item.name}`}
                          onClick={() => setQuantity(item.id, 0)}
                          className="rounded-lg p-2 text-slate-400 hover:bg-rose-50 hover:text-rose-600"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>

                      <div className="mt-4 flex items-center justify-between">
                        <span className="text-sm font-semibold text-slate-500">Quantity</span>
                        <div className="flex items-center rounded-xl bg-slate-100 p-1">
                          <button
                            type="button"
                            onClick={() => setQuantity(item.id, item.quantity - 1)}
                            className="rounded-lg p-2 hover:bg-white"
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="min-w-9 text-center text-sm font-black">{item.quantity}</span>
                          <button
                            type="button"
                            onClick={() => setQuantity(item.id, item.quantity + 1)}
                            className="rounded-lg p-2 hover:bg-white"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex h-full min-h-72 flex-col items-center justify-center text-center">
                  <div className="rounded-full bg-slate-100 p-5 text-slate-400">
                    <ShoppingCart className="h-8 w-8" />
                  </div>
                  <p className="mt-4 font-black text-[#0b1c30]">Your quote cart is empty</p>
                  <p className="mt-2 max-w-xs text-sm leading-6 text-slate-500">
                    Add spare parts or solar modules and send everything in one WhatsApp enquiry.
                  </p>
                </div>
              )}
            </div>

            <div className="border-t border-slate-200 bg-slate-50 p-5">
              <div className="mb-4 flex items-center justify-between">
                <span className="text-sm font-semibold text-slate-600">Total quantity</span>
                <span className="text-lg font-black text-[#0b1c30]">{totalQuantity}</span>
              </div>
              <button
                type="button"
                disabled={!cartItems.length}
                onClick={sendCartToWhatsApp}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#16a34a] px-5 py-4 font-black text-white transition hover:bg-[#15803d] disabled:cursor-not-allowed disabled:bg-slate-300"
              >
                <MessageCircle className="h-5 w-5" />
                Send Cart on WhatsApp
              </button>
              <p className="mt-3 text-center text-[11px] leading-5 text-slate-500">
                Final price, stock, fitment, taxes, warranty and delivery are confirmed by Gemini Motors.
              </p>
            </div>
          </aside>
        </div>
      ) : null}
    </section>
  );
}
