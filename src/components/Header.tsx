/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useRef, useState, type ReactNode } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import {
  ArrowRight,
  ChevronDown,
  Menu,
  MessageCircle,
  Phone,
  ShieldCheck,
  Wrench,
  X,
  type LucideIcon,
} from 'lucide-react';
import { AppDivision } from '../types';
import { WHATSAPP_URL } from '../data';
import commercialMenuLcv from '../assets/images/commercial-menu-lcv.png';
import commercialMenuMhcv from '../assets/images/commercial-menu-mhcv.png';
import commercialMenuEv from '../assets/images/commercial-menu-ev.png';
import Logo from './Logo';

interface HeaderProps {
  currentDivision: AppDivision;
  setDivision: (division: AppDivision) => void;
}

type DesktopMenu = 'commercial' | 'services' | null;
type MobileAccordion = 'commercial' | 'services' | null;
type TopLevelNav = 'home' | 'commercial' | 'services' | 'finance' | 'about' | 'contact' | '';

const getActiveNav = (pathname: string): TopLevelNav => {
  const normalizedPath = pathname.endsWith('/') && pathname !== '/' ? pathname.slice(0, -1) : pathname;

  if (normalizedPath === '/') return 'home';
  if (
    normalizedPath.startsWith('/commercial') ||
    normalizedPath.startsWith('/electric-mobility') ||
    normalizedPath.startsWith('/ev')
  ) {
    return 'commercial';
  }
  if (
    normalizedPath.startsWith('/services') ||
    normalizedPath.startsWith('/green-technologies') ||
    normalizedPath.startsWith('/green')
  ) {
    return 'services';
  }
  if (normalizedPath.startsWith('/finance')) return 'finance';
  if (normalizedPath.startsWith('/about')) return 'about';
  if (normalizedPath.startsWith('/contact')) return 'contact';

  return '';
};

const pathByDivision: Partial<Record<AppDivision, string>> = {
  'gemini-motors': '/',
  commercial: '/commercial/',
  'commercial-light': '/commercial/light/',
  'commercial-medium-heavy': '/commercial/medium-heavy/',
  ev: '/electric-mobility/',
  'auto-services': '/services/',
  'green-tech': '/green-technologies/',
  'about-us': '/about/',
  contact: '/contact/',
};

const commercialMenuItems = [
  {
    label: 'LCV',
    description: 'City delivery and growing business routes.',
    division: 'commercial-light' as AppDivision,
    image: commercialMenuLcv,
  },
  {
    label: 'M&HCV',
    description: 'Fleet, haulage and construction-ready vehicles.',
    division: 'commercial-medium-heavy' as AppDivision,
    image: commercialMenuMhcv,
  },
  {
    label: 'EV',
    description: 'Cleaner commercial mobility solutions.',
    division: 'ev' as AppDivision,
    image: commercialMenuEv,
  },
];

const servicesMenuItems = [
  { label: 'Services', helper: 'Fuel, logistics and business support services.', division: 'auto-services' as AppDivision, Icon: Wrench },
  { label: 'Green Technology', helper: 'Sustainable energy and efficiency products.', division: 'green-tech' as AppDivision, Icon: ShieldCheck },
];

export default function Header({ currentDivision, setDivision }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileAccordion, setMobileAccordion] = useState<MobileAccordion>(null);
  const [desktopMenu, setDesktopMenu] = useState<DesktopMenu>(null);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [currentPathname, setCurrentPathname] = useState(() => window.location.pathname);
  const headerRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const activeTopLevelNav = getActiveNav(currentPathname);
  const isCommercialActive = activeTopLevelNav === 'commercial';
  const isServicesActive = activeTopLevelNav === 'services';
  const isAboutActive = activeTopLevelNav === 'about';

  useEffect(() => {
    const handleScroll = () => setHasScrolled(window.scrollY > 8);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setCurrentPathname(window.location.pathname);
  }, [currentDivision]);

  useEffect(() => {
    const handlePopState = () => setCurrentPathname(window.location.pathname);

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    if (!mobileMenuOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    const handleDocumentClick = (event: MouseEvent) => {
      if (!headerRef.current?.contains(event.target as Node)) {
        setDesktopMenu(null);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setDesktopMenu(null);
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleDocumentClick);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handleDocumentClick);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const closeMenus = () => {
    setDesktopMenu(null);
    setMobileMenuOpen(false);
    setMobileAccordion(null);
  };

  const handleNavClick = (id: AppDivision) => {
    setDivision(id);
    setCurrentPathname(pathByDivision[id] ?? window.location.pathname);
    closeMenus();
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
  };

  const handleFinanceClick = () => {
    closeMenus();
    // Full navigation so /finance/ returns finance meta in View Source.
    window.location.assign('/finance/');
  };

  const handleContactClick = () => {
    handleNavClick('contact');
  };

  const handleWhatsAppClick = () => {
    closeMenus();
    window.open(WHATSAPP_URL, '_blank', 'noopener,noreferrer');
  };

  const toggleDesktopMenu = (menu: Exclude<DesktopMenu, null>) => {
    setDesktopMenu((current) => (current === menu ? null : menu));
  };

  const toggleMobileAccordion = (menu: Exclude<MobileAccordion, null>) => {
    setMobileAccordion((current) => (current === menu ? null : menu));
  };

  return (
    <header
      ref={headerRef}
      className={`sticky top-0 z-50 w-full border-b transition-all duration-300 ${
        hasScrolled
          ? 'border-white/70 bg-white/88 shadow-xl shadow-slate-950/10 backdrop-blur-2xl'
          : 'border-white/40 bg-white/70 shadow-sm backdrop-blur-xl'
      }`}
    >
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 md:px-16">
        <button
          type="button"
          className="flex cursor-pointer select-none items-center gap-3"
          onClick={() => handleNavClick('gemini-motors')}
          aria-label="Go to Gemini Motors home"
        >
          <Logo className="h-10 max-w-[142px] w-auto transition-transform hover:scale-105 md:h-12 md:max-w-[172px]" />
        </button>

        <div className="hidden items-center gap-1 rounded-full border border-slate-200/70 bg-white/70 p-1.5 shadow-sm backdrop-blur-xl lg:flex">
          <DesktopNavButton
            label="Home"
            active={activeTopLevelNav === 'home'}
            onClick={() => handleNavClick('gemini-motors')}
            onMouseEnter={() => setDesktopMenu(null)}
            prefersReducedMotion={prefersReducedMotion}
          />
          <DropdownNavButton
            label="Commercial Vehicles"
            active={isCommercialActive}
            open={desktopMenu === 'commercial'}
            controls="commercial-nav-menu"
            onClick={() => toggleDesktopMenu('commercial')}
            onMouseEnter={() => setDesktopMenu('commercial')}
            prefersReducedMotion={prefersReducedMotion}
          />
          <DropdownNavButton
            label="Services"
            active={isServicesActive}
            open={desktopMenu === 'services'}
            controls="services-nav-menu"
            onClick={() => handleNavClick('auto-services')}
            onMouseEnter={() => setDesktopMenu('services')}
            prefersReducedMotion={prefersReducedMotion}
          />
          <DesktopNavButton
            label="Finance"
            active={activeTopLevelNav === 'finance'}
            onClick={handleFinanceClick}
            onMouseEnter={() => setDesktopMenu(null)}
            prefersReducedMotion={prefersReducedMotion}
          />
          <DesktopNavButton
            label="About Us"
            active={isAboutActive}
            onClick={() => handleNavClick('about-us')}
            onMouseEnter={() => setDesktopMenu(null)}
            prefersReducedMotion={prefersReducedMotion}
          />
          <DesktopNavButton
            label="Contact Us"
            active={activeTopLevelNav === 'contact'}
            onClick={handleContactClick}
            onMouseEnter={() => setDesktopMenu(null)}
            prefersReducedMotion={prefersReducedMotion}
          />
        </div>

        <div className="flex items-center gap-3" onMouseEnter={() => setDesktopMenu(null)}>
          <a
            href="tel:+919422393288"
            className="hidden items-center gap-2 rounded-lg border border-slate-200 bg-white/70 px-4 py-2.5 text-sm font-bold text-slate-800 shadow-sm transition-all hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700 active:scale-95 md:flex"
          >
            <Phone size={16} />
            Call
          </a>

          <button
            type="button"
            onClick={handleWhatsAppClick}
            className="hidden cursor-pointer select-none items-center gap-2 rounded-lg bg-[#25D366] px-5 py-2.5 text-sm font-bold text-white shadow-sm transition-colors duration-150 hover:bg-[#20ba5a] active:scale-95 md:flex"
          >
            <MessageCircle size={16} />
            WhatsApp
          </button>

          <button
            type="button"
            onClick={handleWhatsAppClick}
            className="cursor-pointer rounded-full p-2.5 text-blue-600 transition-colors hover:bg-blue-50 md:hidden"
            title="WhatsApp"
            aria-label="Open WhatsApp enquiry"
          >
            <MessageCircle size={22} />
          </button>

          <button
            type="button"
            className="cursor-pointer p-2 text-gray-600 transition-colors hover:text-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300 lg:hidden"
            onClick={() => setMobileMenuOpen((current) => !current)}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {desktopMenu === 'commercial' && (
          <DesktopDropdown
            id="commercial-nav-menu"
            onMouseEnter={() => setDesktopMenu('commercial')}
            onMouseLeave={() => setDesktopMenu(null)}
            prefersReducedMotion={prefersReducedMotion}
            className="left-1/2 w-[920px] -translate-x-1/2"
          >
            <div className="grid grid-cols-3 items-stretch gap-3">
              {commercialMenuItems.map((item, index) => (
                <div key={item.label} className="min-h-0 h-full">
                  <motion.button
                    type="button"
                    role="menuitem"
                    onClick={() => handleNavClick(item.division)}
                    initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: prefersReducedMotion ? 0 : index * 0.04, duration: 0.24 }}
                    className="group grid h-full w-full grid-rows-[6rem_1fr_auto] overflow-hidden rounded-2xl border border-slate-200 bg-white text-left shadow-sm transition-all hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300"
                  >
                    <div className="relative h-24 w-full overflow-hidden bg-slate-950">
                      <img
                        src={item.image}
                        alt=""
                        className="h-full w-full object-cover object-center opacity-88 transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/65 to-transparent" />
                    </div>
                    <div className="px-4 pt-4">
                      <p className="font-display text-base font-extrabold text-slate-950">{item.label}</p>
                      <p className="mt-1 h-10 overflow-hidden text-xs leading-5 text-slate-500">{item.description}</p>
                    </div>
                    <div className="px-4 pb-4 pt-3">
                      <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-blue-700">
                        Explore Range
                        <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                      </span>
                    </div>
                  </motion.button>
                </div>
              ))}
            </div>
            <button
              type="button"
              role="menuitem"
              onClick={() => handleNavClick('commercial')}
              className="mt-3 flex w-full items-center justify-between rounded-xl border border-blue-100 bg-blue-50/70 px-4 py-3 text-left text-sm font-bold text-blue-800 transition-all hover:bg-blue-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300"
            >
              View All Commercial Vehicles
              <ArrowRight size={15} />
            </button>
          </DesktopDropdown>
        )}

        {desktopMenu === 'services' && (
          <DesktopDropdown
            id="services-nav-menu"
            onMouseEnter={() => setDesktopMenu('services')}
            onMouseLeave={() => setDesktopMenu(null)}
            prefersReducedMotion={prefersReducedMotion}
            className="left-1/2 w-96 -translate-x-1/2"
          >
            <p className="mb-2 px-2 font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-blue-500">
              Services
            </p>
            {servicesMenuItems.map((item, index) => (
              <div key={item.label}>
                <DropdownListButton
                  label={item.label}
                  helper={item.helper}
                  Icon={item.Icon}
                  delay={index}
                  onClick={() => handleNavClick(item.division)}
                  prefersReducedMotion={prefersReducedMotion}
                />
              </div>
            ))}
          </DesktopDropdown>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-navigation"
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, x: '100%' }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="absolute right-0 top-20 z-50 flex h-[calc(100dvh-5rem)] w-full flex-col overflow-hidden border-b border-gray-200 bg-white/96 px-6 py-5 shadow-xl backdrop-blur-xl lg:hidden"
          >
            <div className="min-h-0 flex-1 overflow-y-auto pr-1">
              <div className="flex flex-col gap-2">
                <MobileNavButton label="Home" active={activeTopLevelNav === 'home'} onClick={() => handleNavClick('gemini-motors')} />
                <MobileAccordionSection
                  id="mobile-commercial-menu"
                  label="Commercial Vehicles"
                  active={isCommercialActive}
                  open={mobileAccordion === 'commercial'}
                  onToggle={() => toggleMobileAccordion('commercial')}
                  prefersReducedMotion={prefersReducedMotion}
                >
                  <MobileSubButton label="LCV" onClick={() => handleNavClick('commercial-light')} />
                  <MobileSubButton label="EV" onClick={() => handleNavClick('ev')} />
                  <MobileSubButton label="M&HCV" onClick={() => handleNavClick('commercial-medium-heavy')} />
                  <MobileSubButton label="View All Commercial Vehicles" onClick={() => handleNavClick('commercial')} />
                </MobileAccordionSection>
                <MobileAccordionSection
                  id="mobile-services-menu"
                  label="Services"
                  active={isServicesActive}
                  open={mobileAccordion === 'services'}
                  onToggle={() => toggleMobileAccordion('services')}
                  prefersReducedMotion={prefersReducedMotion}
                >
                  <MobileSubButton label="Services" onClick={() => handleNavClick('auto-services')} />
                  <MobileSubButton label="Green Technology" onClick={() => handleNavClick('green-tech')} />
                </MobileAccordionSection>
                <MobileNavButton label="Finance" active={activeTopLevelNav === 'finance'} onClick={handleFinanceClick} />
                <MobileNavButton label="About Us" active={isAboutActive} onClick={() => handleNavClick('about-us')} />
                <MobileNavButton label="Contact Us" active={activeTopLevelNav === 'contact'} onClick={handleContactClick} />
              </div>
            </div>

            <div className="grid shrink-0 grid-cols-2 gap-3 border-t border-slate-200 pt-4">
              <a
                href="tel:+919422393288"
                onClick={() => setMobileMenuOpen(false)}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-slate-950 py-3 font-bold text-white transition-all hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300"
              >
                <Phone size={16} />
                Call
              </a>
              <button
                type="button"
                onClick={handleWhatsAppClick}
                className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-[#25D366] py-3 font-bold text-white transition-all hover:bg-[#20ba5a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-300"
              >
                <MessageCircle size={16} />
                WhatsApp
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function DesktopNavButton({
  label,
  active,
  onClick,
  onMouseEnter,
  prefersReducedMotion,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
  onMouseEnter?: () => void;
  prefersReducedMotion: boolean | null;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onFocus={onMouseEnter}
      aria-current={active ? 'page' : undefined}
      className={`relative cursor-pointer rounded-full px-3 py-2 text-sm font-bold tracking-wide transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300 xl:px-4 ${
        active ? 'text-blue-700' : 'text-slate-600 hover:-translate-y-0.5 hover:bg-blue-50/70 hover:text-blue-700'
      }`}
    >
      {active && <ActivePill prefersReducedMotion={prefersReducedMotion} />}
      <span className="relative z-10 transition-colors duration-300">{label}</span>
    </button>
  );
}

function DropdownNavButton({
  label,
  active,
  open,
  controls,
  onClick,
  onMouseEnter,
  prefersReducedMotion,
}: {
  label: string;
  active: boolean;
  open: boolean;
  controls: string;
  onClick: () => void;
  onMouseEnter: () => void;
  prefersReducedMotion: boolean | null;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onFocus={onMouseEnter}
      aria-expanded={open}
      aria-controls={controls}
      aria-current={active ? 'page' : undefined}
      className={`relative inline-flex cursor-pointer items-center gap-1 rounded-full px-3 py-2 text-sm font-bold tracking-wide transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300 xl:px-4 ${
        active || open ? 'text-blue-700' : 'text-slate-600 hover:-translate-y-0.5 hover:bg-blue-50/70 hover:text-blue-700'
      }`}
    >
      {active && <ActivePill prefersReducedMotion={prefersReducedMotion} />}
      <span className="relative z-10 transition-colors duration-300">{label}</span>
      <ChevronDown size={14} className={`relative z-10 transition-transform duration-300 ${open ? 'rotate-180' : 'rotate-0'}`} />
    </button>
  );
}

function ActivePill({ prefersReducedMotion }: { prefersReducedMotion: boolean | null }) {
  return (
    <motion.span
      layoutId="active-nav-pill"
      className="absolute inset-0 rounded-full bg-blue-50 shadow-[inset_0_1px_0_rgba(255,255,255,0.85),0_8px_20px_rgba(31,95,174,0.12)]"
      transition={{ duration: prefersReducedMotion ? 0 : 0.3, ease: [0.22, 1, 0.36, 1] }}
    />
  );
}

function DesktopDropdown({
  id,
  children,
  className,
  onMouseEnter,
  onMouseLeave,
  prefersReducedMotion,
}: {
  id: string;
  children: ReactNode;
  className: string;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  prefersReducedMotion: boolean | null;
}) {
  return (
    <motion.div
      id={id}
      role="menu"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -6 }}
      transition={{ duration: prefersReducedMotion ? 0 : 0.26, ease: [0.22, 1, 0.36, 1] }}
      className={`absolute top-[calc(100%+0.5rem)] hidden rounded-3xl border border-slate-200 bg-white p-3 shadow-2xl shadow-slate-950/12 lg:block ${className}`}
    >
      {children}
    </motion.div>
  );
}

function DropdownListButton({
  label,
  helper,
  Icon,
  delay,
  onClick,
  prefersReducedMotion,
}: {
  label: string;
  helper?: string;
  Icon: LucideIcon;
  delay: number;
  onClick: () => void;
  prefersReducedMotion: boolean | null;
}) {
  return (
    <motion.button
      type="button"
      role="menuitem"
      onClick={onClick}
      initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: prefersReducedMotion ? 0 : delay * 0.035, duration: 0.22 }}
      className="group flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition-all hover:bg-blue-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300"
    >
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#eef4fb] text-[#1f5fae] transition-colors group-hover:bg-[#1f5fae] group-hover:text-white">
        <Icon size={17} />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-sm font-extrabold text-slate-950 group-hover:text-blue-800">{label}</span>
        {helper && <span className="mt-0.5 block text-xs font-medium leading-relaxed text-slate-700">{helper}</span>}
      </span>
      <ArrowRight size={14} className="text-blue-500 transition-transform group-hover:translate-x-1" />
    </motion.button>
  );
}

function MobileNavButton({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-current={active ? 'page' : undefined}
      className={`rounded-xl px-4 py-3 text-left font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300 ${
        active
          ? 'bg-blue-50 text-blue-700 shadow-[inset_0_1px_0_rgba(255,255,255,0.85),0_8px_20px_rgba(31,95,174,0.1)]'
          : 'text-slate-600 hover:bg-blue-50/70 hover:text-blue-700'
      }`}
    >
      {label}
    </button>
  );
}

function MobileAccordionSection({
  id,
  label,
  active,
  open,
  onToggle,
  prefersReducedMotion,
  children,
}: {
  id: string;
  label: string;
  active: boolean;
  open: boolean;
  onToggle: () => void;
  prefersReducedMotion: boolean | null;
  children: ReactNode;
}) {
  return (
    <div>
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        aria-controls={id}
        aria-current={active ? 'page' : undefined}
        className={`flex w-full items-center justify-between rounded-xl px-4 py-3 text-left font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300 ${
          active || open
            ? 'bg-blue-50 text-blue-700 shadow-[inset_0_1px_0_rgba(255,255,255,0.85),0_8px_20px_rgba(31,95,174,0.1)]'
            : 'text-slate-600 hover:bg-blue-50/70 hover:text-blue-700'
        }`}
      >
        {label}
        <ChevronDown size={17} className={`transition-transform duration-300 ${open ? 'rotate-180' : 'rotate-0'}`} />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={id}
            initial={prefersReducedMotion ? { opacity: 1 } : { height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={prefersReducedMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.24, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="ml-3 mt-2 grid gap-1 border-l border-blue-100 pl-3">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function MobileSubButton({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-lg px-3 py-2.5 text-left text-sm font-bold text-slate-600 transition-all hover:bg-blue-50 hover:text-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300"
    >
      {label}
    </button>
  );
}
