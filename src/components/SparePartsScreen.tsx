import { useState } from 'react';

interface SparePartsScreenProps {
  onContactClick?: (subject?: string) => void;
}

export default function SparePartsScreen({
  onContactClick,
}: SparePartsScreenProps) {
  const [brand, setBrand] = useState('Ashok Leyland');
  const [vehicleClass, setVehicleClass] = useState('');
  const [part, setPart] = useState('');
  const [quantity, setQuantity] = useState('1');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const message = [
      'Spare Parts Enquiry',
      `Brand: ${brand}`,
      vehicleClass ? `Vehicle class: ${vehicleClass}` : '',
      `Part required: ${part}`,
      `Quantity: ${quantity}`,
    ]
      .filter(Boolean)
      .join('\n');

    const whatsappNumber = '919422393288';
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
      `Hello Gemini Motors,\n\n${message}`
    )}`;

    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section className="min-h-screen bg-[#f8f9ff] py-12 md:py-20">
      <div className="mx-auto max-w-6xl px-5">
        <div className="mb-10 max-w-3xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-blue-700">
            Gemini Motors Goa
          </p>

          <h1 className="text-4xl font-bold tracking-tight text-[#0b1c30] md:text-5xl">
            Genuine Spare Parts
          </h1>

          <p className="mt-4 text-lg leading-8 text-slate-600">
            Find the right part for your commercial vehicle and send your
            requirement directly to the Gemini Motors team.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="rounded-3xl bg-[#0b1c30] p-8 text-white shadow-xl">
            <p className="text-sm font-semibold uppercase tracking-wider text-blue-300">
              Parts Support
            </p>

            <h2 className="mt-4 text-3xl font-bold">
              Parts that keep you moving.
            </h2>

            <p className="mt-5 leading-7 text-slate-300">
              Tell us your vehicle and the part you need. Our team can help
              with your spare-parts requirement.
            </p>

            <div className="mt-8 space-y-4">
              <div>
                <p className="text-sm text-slate-400">Call</p>
                <a
                  href="tel:+919422393288"
                  className="font-semibold hover:underline"
                >
                  +91 94223 93288
                </a>
              </div>

              <div>
                <p className="text-sm text-slate-400">Available for</p>
                <p className="font-semibold">
                  Ashok Leyland &amp; SWITCH Mobility
                </p>
              </div>
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="rounded-3xl bg-white p-6 shadow-lg ring-1 ring-slate-200 md:p-8"
          >
            <h2 className="text-2xl font-bold text-[#0b1c30]">
              Parts Enquiry
            </h2>

            <p className="mt-2 text-slate-500">
              Enter the details below and continue through WhatsApp.
            </p>

            <div className="mt-8 grid gap-5 md:grid-cols-2">
              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-slate-700">
                  Vehicle brand
                </span>
                <select
                  value={brand}
                  onChange={(event) => {
                    setBrand(event.target.value);
                    setVehicleClass('');
                  }}
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-600"
                >
                  <option>Ashok Leyland</option>
                  <option>SWITCH Mobility</option>
                </select>
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-slate-700">
                  Vehicle class
                </span>
                <select
                  required
                  value={vehicleClass}
                  onChange={(event) => setVehicleClass(event.target.value)}
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-600"
                >
                  <option value="">Select class</option>
                  {brand === 'Ashok Leyland' ? (
                    <>
                      <option value="LCV">LCV</option>
                      <option value="M&HCV">M&HCV</option>
                    </>
                  ) : (
                    <option value="EV">Electric vehicles</option>
                  )}
                </select>
              </label>

              <label className="block md:col-span-2">
                <span className="mb-2 block text-sm font-semibold text-slate-700">
                  Part required
                </span>
                <input
                  required
                  minLength={2}
                  value={part}
                  onChange={(event) => setPart(event.target.value)}
                  placeholder="Part name, part number or description"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-600"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-slate-700">
                  Quantity
                </span>
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(event) => setQuantity(event.target.value)}
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-600"
                />
              </label>
            </div>

            <button
              type="submit"
              className="mt-7 w-full rounded-xl bg-blue-700 px-6 py-3.5 font-semibold text-white transition hover:bg-blue-800"
            >
              Request Parts on WhatsApp
            </button>

            {onContactClick && (
              <button
                type="button"
                onClick={() => onContactClick('Spare Parts')}
                className="mt-3 w-full rounded-xl border border-slate-300 px-6 py-3.5 font-semibold text-[#0b1c30]"
              >
                Contact Gemini Motors
              </button>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
