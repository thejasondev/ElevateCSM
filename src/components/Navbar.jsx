import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function Navbar({ lang, translations, currentPath }) {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: translations['nav.home'], href: `#home` },
    { name: translations['nav.about'], href: `#about` },
    { name: translations['nav.services'], href: `#services` },
    { name: translations['nav.portfolio'], href: `#portfolio` },
  ];

  let langHref = currentPath;
  if(lang === 'en') {
     langHref = `/es${currentPath === '/' ? '' : currentPath}`;
  } else {
     langHref = currentPath.replace(/^\/es/, '') || '/';
  }

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed w-full z-50 transition-colors duration-300 ${scrolled ? 'bg-agency-dark/95 backdrop-blur-md shadow-lg' : 'bg-transparent'}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0">
            <a href={`/${lang === 'es' ? 'es' : ''}`} className="flex items-center gap-2">
               <img src="/logo.jpg" alt="ElevateCSM Logo" className="h-10 w-10 rounded-full object-cover border-2 border-agency-cream" />
               <span className="text-xl font-bold tracking-wider text-agency-light">ELEVATE<span className="text-agency-cream">CSM</span></span>
            </a>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-8">
              {navLinks.map((link) => (
                <a key={link.name} href={link.href} className="text-agency-gray hover:text-agency-cream transition-colors text-sm uppercase tracking-widest font-medium focus-visible:ring-2 focus-visible:ring-agency-cream focus-visible:outline-none rounded px-2 py-1">
                  {link.name}
                </a>
              ))}
              <a 
                href="tel:+13051234567"
                className="flex items-center justify-center px-5 py-2.5 bg-agency-cream text-agency-dark font-semibold rounded hover:bg-white transition-colors uppercase tracking-wider text-sm shadow-md focus-visible:ring-2 focus-visible:ring-agency-light focus-visible:outline-none min-h-[44px]"
              >
                {translations['contact.call'] || "Call Us"}
              </a>
              <a href={langHref} className="text-xs font-bold border border-agency-gray px-3 py-2 rounded hover:bg-agency-gray/20 transition-colors focus-visible:ring-2 focus-visible:ring-agency-cream focus-visible:outline-none min-h-[44px] flex items-center">
                 {lang === 'en' ? 'ES' : 'EN'}
              </a>
            </div>
          </div>

          <div className="md:hidden flex items-center">
            <button aria-label="Toggle Navigation" onClick={() => setIsOpen(!isOpen)} className="text-agency-light focus-visible:ring-2 focus-visible:ring-agency-cream focus-visible:outline-none rounded p-2 min-h-[44px] min-w-[44px] flex items-center justify-center">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 {isOpen ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/> : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"/>}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-agency-dark border-t border-agency-gray/20 pb-4 shadow-xl">
           <div className="px-2 pt-2 space-y-1 sm:px-3">
             {navLinks.map((link) => (
               <a key={link.name} href={link.href} onClick={() => setIsOpen(false)} className="block px-3 py-2 text-base font-medium text-agency-light hover:text-agency-cream hover:bg-agency-gray/10 rounded">
                 {link.name}
               </a>
             ))}
             <a href="#contact" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-base font-medium text-agency-cream hover:text-white rounded">
               {translations['nav.contact']}
             </a>
             <a href={langHref} className="block px-3 py-2 text-base font-medium text-agency-gray hover:text-white rounded">
               Switch to {lang === 'en' ? 'Español' : 'English'}
             </a>
           </div>
        </div>
      )}
    </motion.nav>
  );
}
