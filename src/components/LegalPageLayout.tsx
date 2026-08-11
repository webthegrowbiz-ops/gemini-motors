/**
 * Shared layout for Privacy Policy and Terms & Conditions pages.
 */

import { ReactNode } from 'react';

export type LegalSection = {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
};

interface LegalPageLayoutProps {
  eyebrow: string;
  title: string;
  intro: string;
  lastUpdatedLabel: string;
  sections: LegalSection[];
  contactBlock?: ReactNode;
}

export default function LegalPageLayout({
  eyebrow,
  title,
  intro,
  lastUpdatedLabel,
  sections,
  contactBlock,
}: LegalPageLayoutProps) {
  return (
    <div className="bg-[#f8f9ff] text-slate-900 min-h-screen animate-in fade-in duration-300">
      <section className="relative bg-[#0c111d] text-white py-20 md:py-24 overflow-hidden border-b border-slate-800">
        <div className="absolute inset-0 z-0 opacity-10 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:16px_16px]" />
        <div className="max-w-4xl mx-auto px-6 md:px-16 relative z-10">
          <span className="text-blue-500 font-mono text-xs tracking-widest uppercase font-bold px-3 py-1 bg-blue-500/10 rounded-full border border-blue-500/20">
            {eyebrow}
          </span>
          <h1 className="font-display font-black text-3xl md:text-5xl text-white mt-6 tracking-tight leading-tight">
            {title}
          </h1>
          <p className="text-gray-400 text-base md:text-lg mt-5 leading-relaxed max-w-3xl">{intro}</p>
          <p className="text-blue-300/80 text-xs md:text-sm mt-6 font-medium tracking-wide">
            {lastUpdatedLabel}
          </p>
        </div>
      </section>

      <section className="py-14 md:py-20 max-w-4xl mx-auto px-6 md:px-16">
        <div className="space-y-10">
          {sections.map((section) => (
            <article
              key={section.heading}
              className="rounded-2xl border border-gray-100 bg-white p-6 md:p-8 shadow-sm shadow-slate-900/5"
            >
              <h2 className="font-display font-bold text-xl md:text-2xl text-slate-900 tracking-tight">
                {section.heading}
              </h2>
              <div className="mt-4 space-y-3 text-sm md:text-base text-slate-600 leading-relaxed">
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
              {section.bullets && section.bullets.length > 0 && (
                <ul className="mt-4 space-y-2 text-sm md:text-base text-slate-600 leading-relaxed list-disc pl-5">
                  {section.bullets.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              )}
            </article>
          ))}

          {contactBlock}
        </div>
      </section>
    </div>
  );
}
