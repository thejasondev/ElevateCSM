import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCalendarAlt, FaGlobe } from 'react-icons/fa';

/* ── Animated Hamburger Icon ── */
function HamburgerIcon({ isOpen }) {
  const lineProps = {
    stroke: 'currentColor',
    strokeWidth: 2.5,
    strokeLinecap: 'round',
    initial: false,
  };
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <motion.line
        x1="3" y1="6" x2="21" y2="6"
        {...lineProps}
        animate={isOpen
          ? { x1: 5, y1: 5, x2: 19, y2: 19 }
          : { x1: 3, y1: 6, x2: 21, y2: 6 }
        }
        transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
      />
      <motion.line
        x1="3" y1="12" x2="21" y2="12"
        {...lineProps}
        animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
        transition={{ duration: 0.15 }}
      />
      <motion.line
        x1="3" y1="18" x2="21" y2="18"
        {...lineProps}
        animate={isOpen
          ? { x1: 5, y1: 19, x2: 19, y2: 5 }
          : { x1: 3, y1: 18, x2: 21, y2: 18 }
        }
        transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
      />
    </svg>
  );
}

/* ── Overlay backdrop ── */
const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

/* ── Mobile/Tablet drawer panel ── */
const drawerVariants = {
  hidden: { x: '100%' },
  visible: {
    x: 0,
    transition: { type: 'tween', duration: 0.35, ease: [0.25, 0.1, 0.25, 1] },
  },
  exit: {
    x: '100%',
    transition: { type: 'tween', duration: 0.25, ease: [0.25, 0.1, 0.25, 1] },
  },
};

/* ── Staggered link animation ── */
const linkContainerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06, delayChildren: 0.1 },
  },
};
const linkItemVariants = {
  hidden: { opacity: 0, x: 24 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] },
  },
};

export default function Navbar({ lang, translations, currentPath }) {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape' && isOpen) setIsOpen(false); };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [isOpen]);

  const closeDrawer = useCallback(() => setIsOpen(false), []);

  /* Build base path for anchor links — ensures they always point to homepage sections */
  const isHome = currentPath === '/' || currentPath === '/es' || currentPath === '/es/';
  const homeBase = lang === 'es' ? '/es' : '/';

  const navLinks = [
    { name: translations['nav.home'], href: isHome ? '#home' : `${homeBase}#home` },
    { name: translations['nav.about'], href: isHome ? '#about' : `${homeBase}#about` },
    { name: translations['nav.services'], href: isHome ? '#services' : `${homeBase}#services` },
    { name: translations['nav.portfolio'], href: isHome ? '#portfolio' : `${homeBase}#portfolio` },
  ];

  let langHref = currentPath;
  if (lang === 'en') {
    langHref = `/es${currentPath === '/' ? '' : currentPath}`;
  } else {
    langHref = currentPath.replace(/^\/es/, '') || '/';
  }

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
        className={`fixed w-full z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-agency-dark/95 backdrop-blur-md shadow-lg'
            : 'bg-transparent'
        }`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* ── Logo ── */}
            <div className="flex-shrink-0">
              <a
                href={`/${lang === 'es' ? 'es' : ''}`}
                className="flex items-center gap-2.5 focus-visible:ring-2 focus-visible:ring-agency-cream focus-visible:outline-none rounded-sm"
                aria-label="ElevateCSM Home"
              >
                <img
                  src="/logo.jpg"
                  alt="ElevateCSM Logo"
                  className="h-10 w-10 rounded-full object-cover border-2 border-agency-cream"
                  width="40"
                  height="40"
                  loading="eager"
                />
                <span className="text-xl font-bold tracking-wider text-agency-light">
                  ELEVATE<span className="text-agency-cream">CSM</span>
                </span>
              </a>
            </div>

            {/* ── Desktop Nav (≥1024px only) ── */}
            <div className="hidden lg:flex items-center space-x-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-agency-gray hover:text-agency-cream transition-colors text-sm uppercase tracking-widest font-medium focus-visible:ring-2 focus-visible:ring-agency-cream focus-visible:outline-none rounded px-2 py-1"
                >
                  {link.name}
                </a>
              ))}
              <a
                href="https://calendly.com/elevatecsmagency"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-5 py-2.5 bg-agency-cream text-agency-dark font-semibold rounded-sm hover:bg-white transition-colors uppercase tracking-wider text-sm shadow-md focus-visible:ring-2 focus-visible:ring-agency-light focus-visible:outline-none min-h-[44px]"
              >
                <FaCalendarAlt className="text-xs" />
                {translations['contact.call'] || 'Book a Call'}
              </a>
              <a
                href={langHref}
                className="text-xs font-bold border border-agency-gray/50 px-3 py-2.5 rounded-sm hover:bg-agency-cream/10 hover:border-agency-cream transition-all focus-visible:ring-2 focus-visible:ring-agency-cream focus-visible:outline-none min-h-[44px] flex items-center gap-1.5"
                aria-label={`Switch to ${lang === 'en' ? 'Español' : 'English'}`}
              >
                <FaGlobe className="text-agency-gray text-[10px]" />
                {lang === 'en' ? 'ES' : 'EN'}
              </a>
            </div>

            {/* ── Hamburger Toggle (mobile + tablet: <1024px) ── */}
            <div className="lg:hidden flex items-center gap-3">
              {/* Language toggle — visible on tablet, hidden on mobile to save space */}
              <a
                href={langHref}
                className="hidden sm:flex text-xs font-bold border border-agency-gray/40 px-2.5 py-2 rounded-sm hover:bg-agency-cream/10 transition-colors focus-visible:ring-2 focus-visible:ring-agency-cream focus-visible:outline-none min-h-[44px] min-w-[44px] items-center justify-center gap-1"
                aria-label={`Switch to ${lang === 'en' ? 'Español' : 'English'}`}
              >
                <FaGlobe className="text-agency-gray text-[10px]" />
                {lang === 'en' ? 'ES' : 'EN'}
              </a>
              <button
                onClick={() => setIsOpen(!isOpen)}
                aria-label={isOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={isOpen}
                className="text-agency-light focus-visible:ring-2 focus-visible:ring-agency-cream focus-visible:outline-none rounded-sm p-2 min-h-[44px] min-w-[44px] flex items-center justify-center hover:bg-agency-cream/10 transition-colors"
              >
                <HamburgerIcon isOpen={isOpen} />
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* ── Mobile/Tablet Slide-in Drawer ── */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Scrim overlay */}
            <motion.div
              key="nav-overlay"
              variants={overlayVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm"
              onClick={closeDrawer}
              aria-hidden="true"
            />

            {/* Drawer panel */}
            <motion.div
              key="nav-drawer"
              variants={drawerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed top-0 right-0 z-[70] h-full w-[min(80vw,320px)] bg-agency-dark border-l border-agency-gray/15 shadow-2xl flex flex-col"
              role="dialog"
              aria-modal="true"
              aria-label="Navigation menu"
            >
              {/* Drawer header */}
              <div className="flex items-center justify-between px-6 h-20 border-b border-agency-gray/10">
                <span className="text-lg font-bold tracking-wider text-agency-light">
                  ELEVATE<span className="text-agency-cream">CSM</span>
                </span>
                <button
                  onClick={closeDrawer}
                  aria-label="Close menu"
                  className="text-agency-gray hover:text-white transition-colors p-2 rounded-sm focus-visible:ring-2 focus-visible:ring-agency-cream focus-visible:outline-none min-h-[44px] min-w-[44px] flex items-center justify-center"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <line x1="6" y1="6" x2="18" y2="18" />
                    <line x1="6" y1="18" x2="18" y2="6" />
                  </svg>
                </button>
              </div>

              {/* Nav links */}
              <motion.div
                variants={linkContainerVariants}
                initial="hidden"
                animate="visible"
                className="flex-1 overflow-y-auto px-4 py-8"
              >
                <div className="space-y-1">
                  {navLinks.map((link) => (
                    <motion.a
                      key={link.name}
                      href={link.href}
                      variants={linkItemVariants}
                      onClick={closeDrawer}
                      className="block px-4 py-3.5 text-lg font-medium text-agency-light/90 hover:text-agency-cream hover:bg-agency-cream/5 rounded-sm transition-colors active:bg-agency-cream/10 focus-visible:ring-2 focus-visible:ring-agency-cream focus-visible:outline-none"
                    >
                      {link.name}
                    </motion.a>
                  ))}
                </div>

                {/* Divider */}
                <div className="my-6 h-px bg-agency-gray/15" />

                {/* Contact link */}
                <motion.a
                  href={isHome ? '#contact' : `${homeBase}#contact`}
                  variants={linkItemVariants}
                  onClick={closeDrawer}
                  className="block px-4 py-3.5 text-lg font-medium text-agency-cream hover:text-white hover:bg-agency-cream/5 rounded-sm transition-colors focus-visible:ring-2 focus-visible:ring-agency-cream focus-visible:outline-none"
                >
                  {translations['nav.contact']}
                </motion.a>

                {/* Language switch */}
                <motion.a
                  href={langHref}
                  variants={linkItemVariants}
                  className="flex items-center gap-2.5 px-4 py-3.5 mt-1 text-base font-medium text-agency-gray hover:text-white hover:bg-agency-cream/5 rounded-sm transition-colors focus-visible:ring-2 focus-visible:ring-agency-cream focus-visible:outline-none"
                >
                  <FaGlobe className="text-sm" />
                  {lang === 'en' ? 'Cambiar a Español' : 'Switch to English'}
                </motion.a>
              </motion.div>

              {/* Bottom CTA */}
              <div className="px-6 py-6 border-t border-agency-gray/10">
                <a
                  href="https://calendly.com/elevatecsmagency"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={closeDrawer}
                  className="flex items-center justify-center gap-2.5 w-full py-3.5 bg-agency-cream text-agency-dark font-bold rounded-sm uppercase tracking-wider text-sm hover:bg-white transition-colors shadow-lg focus-visible:ring-2 focus-visible:ring-agency-light focus-visible:outline-none min-h-[48px] active:scale-[0.97] active:transition-transform"
                >
                  <FaCalendarAlt className="text-xs" />
                  {translations['contact.call'] || 'Book a Call'}
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
