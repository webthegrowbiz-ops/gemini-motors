/**
 * Terms & Conditions page for Gemini Motors website visitors.
 * Uses only business facts reflected in the project; avoids inventing legal specifics.
 */

import { useEffect } from 'react';
import { Mail, Phone } from 'lucide-react';
import LegalPageLayout, { LegalSection } from './LegalPageLayout';

const sections: LegalSection[] = [
  {
    heading: '1. Acceptance of Terms',
    paragraphs: [
      'These Terms & Conditions (“Terms”) govern your access to and use of the Gemini Motors website. By browsing or using the website, submitting enquiries, or contacting us through published phone, WhatsApp, or form channels, you agree to these Terms.',
      'If you do not agree, please do not use the website or related digital contact tools.',
    ],
  },
  {
    heading: '2. About the Website',
    paragraphs: [
      'This website provides general information about Gemini Motors’ commercial vehicle offerings, services, electric mobility options, green technology interests, and ways to contact the team in Goa. Content is shared for informational and enquiry purposes.',
    ],
  },
  {
    heading: '3. Website Use',
    paragraphs: [
      'You agree to use the website lawfully and responsibly. You must not attempt to disrupt the website, misuse forms or the chatbot, submit false or harmful content, scrape the site in an abusive manner, or use the website for any activity that could harm Gemini Motors, its partners, or other users.',
    ],
  },
  {
    heading: '4. Vehicle and Product Information',
    paragraphs: [
      'Vehicle specifications, features, images, applications, and related descriptions on this website are provided for general guidance. Details may vary by variant, configuration, market availability, and manufacturer updates.',
      'Always confirm final specifications, features, and suitability with Gemini Motors before making a purchase decision.',
    ],
  },
  {
    heading: '5. Pricing and Availability Disclaimer',
    paragraphs: [
      'Any pricing, offers, stock indications, delivery timelines, or availability references on the website (if shown) are indicative only and may change without notice. Final commercial terms depend on configuration, applicable taxes, manufacturer policies, and confirmation by Gemini Motors.',
    ],
  },
  {
    heading: '6. Enquiries, Bookings and Communications',
    paragraphs: [
      'Website forms, the chatbot, phone calls, and WhatsApp messages are enquiry channels. Submitting an enquiry does not create a binding order, reservation, or contract unless separately confirmed in writing by Gemini Motors.',
      'We may contact you using the details you provide to respond to your request and share next steps.',
    ],
  },
  {
    heading: '7. Finance Information Disclaimer',
    paragraphs: [
      'Any finance, EMI, down-payment, or funding-related information on the website is illustrative only and intended for general guidance. Actual finance eligibility, interest rates, tenure, documentation, and approval decisions are determined by the relevant lender or financing partner.',
      'Gemini Motors does not guarantee finance approval. Please verify final finance terms directly with the applicable financier before relying on illustrative calculations or guidance.',
    ],
  },
  {
    heading: '8. Intellectual Property',
    paragraphs: [
      'Website text, layout, branding, logos, graphics, and other materials are protected by applicable intellectual property laws and remain the property of Gemini Motors and/or its licensors or brand partners, as applicable. You may not copy, modify, distribute, or commercially exploit website content without prior written permission, except for personal, non-commercial viewing of the site.',
      'Third-party trademarks, including manufacturer marks, remain the property of their respective owners.',
    ],
  },
  {
    heading: '9. Third-Party Links and Services',
    paragraphs: [
      'The website may link to or rely on third-party services such as WhatsApp, analytics platforms, social media pages, or manufacturer resources. Those services are governed by their own terms and privacy practices. Gemini Motors is not responsible for the content, security, or practices of third-party websites or applications.',
    ],
  },
  {
    heading: '10. Limitation of Liability',
    paragraphs: [
      'To the fullest extent permitted by applicable law, Gemini Motors is not liable for any indirect, incidental, consequential, or special loss arising from your use of the website, reliance on website content, or inability to access the website.',
      'Website content is provided on an “as available” basis. While we aim to keep information useful and current, we do not warrant that all content is complete, uninterrupted, or free from errors.',
    ],
  },
  {
    heading: '11. Changes to the Website and These Terms',
    paragraphs: [
      'We may update website content, features, and these Terms from time to time. The latest version will be posted on this page with an updated date. Continued use of the website after changes are posted constitutes acceptance of the revised Terms.',
    ],
  },
  {
    heading: '12. Governing Considerations',
    paragraphs: [
      'These Terms are intended to be read in connection with the operation of this website for Gemini Motors’ business activities in Goa, India. Any dispute arising from website use should first be raised with Gemini Motors using the contact details below so we can attempt to resolve it directly.',
      'Specific governing-law or jurisdiction wording for formal contracts may be confirmed separately in writing for individual transactions and is not created solely by browsing this website.',
    ],
  },
  {
    heading: '13. Contact',
    paragraphs: [
      'For questions about these Terms, please contact Gemini Motors.',
    ],
  },
];

export default function TermsConditionsScreen() {
  useEffect(() => {
    document.title = 'Terms & Conditions | Gemini Motors Goa';
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, []);

  return (
    <LegalPageLayout
      eyebrow="Legal"
      title="Terms & Conditions"
      intro="These Terms explain how you may use the Gemini Motors website and how to interpret product, pricing, enquiry, and finance-related information published here."
      lastUpdatedLabel="Last updated: August 2026"
      sections={sections}
      contactBlock={
        <article className="rounded-2xl border border-blue-100 bg-blue-50/70 p-6 md:p-8">
          <h2 className="font-display font-bold text-xl text-slate-900">Gemini Motors contact</h2>
          <p className="mt-3 text-sm md:text-base text-slate-600 leading-relaxed">
            Registered office area referenced on this website: Panaji, Goa, India - 403001
          </p>
          <div className="mt-5 space-y-3 text-sm md:text-base">
            <a
              href="tel:+919422393288"
              className="flex items-center gap-2 text-blue-700 hover:text-blue-900 font-medium"
            >
              <Phone size={16} />
              +91 94223 93288
            </a>
            <a
              href="mailto:agnel899@gmail.com"
              className="flex items-center gap-2 text-blue-700 hover:text-blue-900 font-medium"
            >
              <Mail size={16} />
              agnel899@gmail.com
            </a>
          </div>
        </article>
      }
    />
  );
}
