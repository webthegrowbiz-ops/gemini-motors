/**
 * Resolve lower quick-spec cards for product pages.
 * Excludes any spec family already shown in the hero (first 3 quickSpecs).
 * Prefers a consistent commercial label order from existing product data only.
 */

import type { ProductPageData, ProductSpec } from '../types';

const TARGET_LOWER_CARD_COUNT = 6;

/** Preferred label order for lower cards (first match wins per family). */
const PREFERRED_LABELS = [
  'Wheelbase',
  'GVW',
  'Gross Vehicle Weight',
  'GCW',
  'Gearbox',
  'Transmission',
  'Engine',
  'Engine description',
  'Fuel type',
  'Fuel Type',
  'Fuel',
  'Clutch',
  'Clutch Diameter',
  'Clutch Dia',
  'Gradeability',
  'Motor Type',
  'Motor',
  'Battery Type',
  'Range',
  'Real-World Range',
  'DC charging',
  'Fast Charging',
  'Battery warranty',
  'Cabin',
  'Cabin Type',
  'Cabin Option',
  'Loading Span',
  'Fuel Tank',
  'Fuel Tank Capacity',
  'Tyres',
  'Displacement',
  'Mileage',
  'Load Body',
  'Load body',
  'Load Body Size',
  'Cubic Capacity',
  'Drive',
  'Series',
  'Vehicle class',
  'Body configuration',
  'Primary applications',
  'Application',
  'Platform',
  'Seating',
  'Warranty',
  'Network',
] as const;

function normalizeKey(label: string): string {
  return label.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
}

/** Group related labels so top "Power" also excludes "Max power", etc. */
function specFamily(label: string): string {
  const n = normalizeKey(label);

  if (/\bprice\b/.test(n)) return 'price';
  if (/\bpayload\b/.test(n)) return 'payload';
  if (/\b(power|motor power|peak power|max power)\b/.test(n) && !/\bbattery\b/.test(n)) return 'power';
  if (/\btorque\b/.test(n)) return 'torque';
  if (/\bbattery\b/.test(n) && !/\bwarranty\b/.test(n)) return 'battery';
  if (/\brange\b/.test(n)) return 'range';
  if (/\bfast charging\b|\bdc charging\b|\bcharging\b/.test(n)) return 'charging';
  if (n === 'gvw' || n === 'gross vehicle weight') return 'gvw';
  if (n === 'gcw') return 'gcw';
  if (n === 'capacity' || n === 'cubic capacity') return 'capacity';
  if (n === 'model' || n.startsWith('model ')) return 'model';
  if (n === 'category') return 'category';
  if (n === 'mileage' || n.includes('arai')) return 'mileage';
  if (n === 'fuel' || n === 'fuel type') return 'fuel';
  if (n === 'engine' || n === 'engine description' || n === 'engine options') return 'engine';
  if (n === 'gearbox' || n === 'transmission' || n === 'gearbox type') return 'gearbox';
  if (n.startsWith('clutch')) return 'clutch';
  if (n.startsWith('cabin')) return 'cabin';
  if (n.includes('loading span')) return 'loading-span';
  if (n.includes('fuel tank')) return 'fuel-tank';
  if (n.includes('load body') || n === 'loadbody range') return 'load-body';
  if (n === 'wheelbase') return 'wheelbase';
  if (n === 'gradeability') return 'gradeability';
  if (n === 'motor' || n === 'motor type') return 'motor';
  if (n === 'warranty' || n.includes('battery warranty')) return 'warranty';
  if (n === 'brand') return 'brand';
  if (n === 'body' || n === 'body type') return 'body';
  if (n === 'application' || n.startsWith('application ') || n === 'primary applications') return 'application';

  return n;
}

function collectSpecPool(product: ProductPageData): ProductSpec[] {
  const pool: ProductSpec[] = [];

  for (const group of product.specifications || []) {
    for (const row of group.rows) {
      if (row.label?.trim() && row.value?.trim()) pool.push(row);
    }
  }

  for (const indicator of product.overview?.trustIndicators || []) {
    if (indicator.label?.trim() && indicator.value?.trim()) pool.push(indicator);
  }

  // Remaining quickSpecs (after hero) are valid candidates when not already covered.
  for (const spec of product.quickSpecs.slice(3)) {
    if (spec.label?.trim() && spec.value?.trim()) pool.push(spec);
  }

  return pool;
}

function findInPool(pool: ProductSpec[], wantedLabel: string): ProductSpec | undefined {
  const wantedKey = normalizeKey(wantedLabel);
  const wantedFamily = specFamily(wantedLabel);

  return (
    pool.find((spec) => normalizeKey(spec.label) === wantedKey) ||
    pool.find((spec) => specFamily(spec.label) === wantedFamily && normalizeKey(spec.label).includes(wantedKey))
  );
}

/**
 * Build lower-card specs that do not repeat the hero (top) quickSpecs families.
 * Uses only existing product specification / trust / trailing quickSpec values.
 */
export function resolveLowerQuickSpecs(product: ProductPageData): ProductSpec[] {
  const heroSpecs = product.quickSpecs.slice(0, 3);
  const blockedFamilies = new Set(heroSpecs.map((spec) => specFamily(spec.label)));
  const pool = collectSpecPool(product);
  const picked: ProductSpec[] = [];
  const usedFamilies = new Set<string>(blockedFamilies);

  const tryAdd = (spec: ProductSpec | undefined) => {
    if (!spec || picked.length >= TARGET_LOWER_CARD_COUNT) return;
    const family = specFamily(spec.label);
    if (usedFamilies.has(family)) return;
    // Skip rows whose value is only a restatement of the label (data noise).
    if (normalizeKey(spec.value) === normalizeKey(spec.label)) return;
    usedFamilies.add(family);
    picked.push({
      label: spec.label,
      value: spec.value,
      helper: spec.helper,
    });
  };

  for (const preferred of PREFERRED_LABELS) {
    tryAdd(findInPool(pool, preferred));
  }

  // Fill remaining slots from pool order (specifications first).
  for (const spec of pool) {
    tryAdd(spec);
  }

  return picked;
}
