/**
 * Privacy Policy page for Gemini Motors website visitors.
 * Content reflects website enquiry forms, WhatsApp/phone contact, GTM analytics,
 * Facebook Pixel, and chatbot usage as implemented in this project.
 */

import { useEffect } from 'react';
import { Mail, Phone } from 'lucide-react';
import LegalPageLayout, { LegalSection } from './LegalPageLayout';
import { STATIC_PAGE_SEO, applyPageSeo } from '../seo';

const sections: LegalSection[] = [
  {
    heading: '1. Introduction',
    paragraphs: [
      'Gemini Motors (“we”, “us”, or “our”) operates this website to share information about commercial vehicles, related services, and ways to contact our team in Goa. This Privacy Policy explains how we handle personal information you choose to share when you browse the website, submit enquiries, use WhatsApp or phone contact options, or interact with the website chatbot.',
      'By using this website, you acknowledge the practices described in this policy. If you do not agree, please discontinue use of the website and contact channels.',
    ],
  },
  {
    heading: '2. Information We Collect',
    paragraphs: [
      'We collect information that you voluntarily provide and limited technical information that helps the website function and measure performance.',
    ],
    bullets: [
      'Identity and contact details you submit (for example name, phone number, and email address).',
      'Enquiry details such as city, preferred contact time, interest area, and message content.',
      'Chatbot conversation details such as your name, phone number, and messages you send through the website assistant.',
      'Communication content when you call or message us using the phone or WhatsApp numbers published on the website.',
      'Basic technical and usage information such as browser type, device type, pages viewed, and related interaction data through analytics tools configured on the website.',
    ],
  },
  {
    heading: '3. Information Submitted Through Enquiry and Contact Forms',
    paragraphs: [
      'When you complete a website enquiry or contact form, the details you enter are used so Gemini Motors can respond to your request. Typical fields may include name, phone number, email address, city, preferred contact time, interest area, and your message.',
      'Please share only information needed for your enquiry. Avoid submitting sensitive personal data that is not required.',
    ],
  },
  {
    heading: '4. Phone and WhatsApp Enquiries',
    paragraphs: [
      'You may contact Gemini Motors by phone at +91 94223 93288 or through WhatsApp using the contact options published on the website. Information shared during these conversations—such as your name, phone number, and enquiry details—may be reviewed by our team and retained as part of follow-up.',
      'Messaging platforms such as WhatsApp are third-party services governed by their own privacy practices.',
    ],
  },
  {
    heading: '5. Chatbot Interactions',
    paragraphs: [
      'This website includes a chatbot assistant that may ask for your name and phone number and will process the messages you send so the team can answer product, service, or general website questions.',
      'Chat content is used to respond to your enquiry and to improve how the assistant supports visitors. Do not share passwords, payment card details, or other sensitive information in the chatbot.',
    ],
  },
  {
    heading: '6. How We Use Information',
    paragraphs: [
      'We use collected information for legitimate business purposes related to responding to your requests and operating the website.',
    ],
    bullets: [
      'Responding to vehicle, service, finance guidance, brochure, and general business enquiries.',
      'Contacting you by phone, WhatsApp, email, or other channels you provide.',
      'Sharing relevant product information and next steps based on your enquiry.',
      'Operating and improving the website, chatbot, and enquiry workflows.',
      'Understanding aggregate website traffic and campaign performance through analytics.',
      'Maintaining records needed for follow-up, customer support, and internal business operations.',
    ],
  },
  {
    heading: '7. How Information Is Stored and Protected',
    paragraphs: [
      'Enquiry, contact, and communication information may be stored in systems used by Gemini Motors and its service providers to receive, organise, and respond to requests.',
      'We apply reasonable administrative and technical safeguards intended to protect personal information against unauthorised access, alteration, disclosure, or destruction. No method of transmission or electronic storage is completely secure, so absolute security cannot be guaranteed.',
    ],
  },
  {
    heading: '8. Data Sharing and Third-Party Services',
    paragraphs: [
      'We do not sell your personal information. We may share information only when needed to respond to your enquiry, operate the website, comply with law, or protect our rights and visitors.',
    ],
    bullets: [
      'With authorised Gemini Motors team members handling sales, service, or support requests.',
      'With service providers who help host, analyse, or operate website and communication tools.',
      'With messaging platforms such as WhatsApp when you choose to contact us through those channels.',
      'When required by applicable law, regulation, legal process, or governmental request.',
      'In connection with a business restructuring, where permitted and appropriate safeguards are in place.',
    ],
  },
  {
    heading: '9. Cookies, Analytics and Advertising Tags',
    paragraphs: [
      'This website uses Google Tag Manager (container ID GTM-5FFJRMCV) and a Facebook Pixel (ID 2503264866812812), along with related measurement or marketing tags that may set cookies or similar technologies. These tools help us understand how visitors use the site and how marketing activity performs.',
      'Your browser settings may allow you to block or delete cookies. Doing so can affect some website features or measurement accuracy. We do not control how third-party analytics or advertising providers process data under their own policies.',
    ],
  },
  {
    heading: '10. Data Retention',
    paragraphs: [
      'We retain enquiry and communication information for as long as reasonably needed to respond to your request, complete related follow-up, meet operational needs, and comply with legal or record-keeping requirements. When information is no longer needed, we take steps to delete or de-identify it where practicable.',
    ],
  },
  {
    heading: '11. Your Rights and Choices',
    paragraphs: [
      'Subject to applicable law, you may request access to, correction of, or deletion of personal information you have shared with us, or ask us to update your contact preferences. You may also choose not to submit forms, disable cookies in your browser, or stop using WhatsApp, phone, or chatbot channels.',
      'To make a privacy-related request, contact us using the details below. We may need to verify your request before acting on it.',
    ],
  },
  {
    heading: '12. Children’s Privacy',
    paragraphs: [
      'This website is intended for business and adult users interested in commercial vehicles and related services. We do not knowingly collect personal information from children. If you believe a child has provided information through this website, please contact us so we can review and delete it where appropriate.',
    ],
  },
  {
    heading: '13. Policy Updates',
    paragraphs: [
      'We may update this Privacy Policy from time to time to reflect changes in our practices, website features, or legal requirements. The updated version will be posted on this page with a revised date. Continued use of the website after changes are posted indicates acceptance of the updated policy.',
    ],
  },
  {
    heading: '14. Contact Us',
    paragraphs: [
      'For privacy questions, requests, or concerns about this policy, please contact Gemini Motors using the details below.',
    ],
  },
];

export default function PrivacyPolicyScreen() {
  useEffect(() => {
    const privacySeo = STATIC_PAGE_SEO['/privacy-policy/'];
    applyPageSeo(privacySeo);
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, []);

  return (
    <LegalPageLayout
      eyebrow="Legal"
      title="Privacy Policy"
      intro="This policy describes how Gemini Motors handles personal information collected through the website, enquiry forms, chatbot, phone, and WhatsApp channels."
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
