import { ArrowLeft, Home } from 'lucide-react';

interface NotFoundScreenProps {
  onNavigateHome: () => void;
}

export default function NotFoundScreen({ onNavigateHome }: NotFoundScreenProps) {
  return (
    <section className="min-h-[70vh] bg-[#f8f9ff] px-6 py-24 md:px-16">
      <div className="mx-auto flex max-w-3xl flex-col items-start rounded-3xl border border-slate-200 bg-white p-8 shadow-xl shadow-slate-950/8 md:p-12">
        <p className="font-mono text-xs font-bold uppercase tracking-[0.24em] text-blue-600">Page Not Found</p>
        <h1 className="mt-4 font-display text-4xl font-extrabold tracking-tight text-slate-950 md:text-6xl">
          This Gemini Motors page is not available.
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600">
          The link may be outdated or the page may have moved. Return to the homepage to continue exploring commercial vehicles,
          services and support from Gemini Motors Goa.
        </p>
        <button
          type="button"
          onClick={onNavigateHome}
          className="mt-8 inline-flex items-center gap-2 rounded-xl bg-[#1f5fae] px-5 py-3 text-sm font-extrabold text-white shadow-lg shadow-blue-900/18 transition-all hover:-translate-y-0.5 hover:bg-[#184f92] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300"
        >
          <Home size={18} />
          Back to Home
          <ArrowLeft size={16} />
        </button>
      </div>
    </section>
  );
}
