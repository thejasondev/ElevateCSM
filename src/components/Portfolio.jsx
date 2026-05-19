import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlay, FaTimes, FaArrowRight, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import 'devices.css/dist/devices.min.css';

export const CATEGORIES = ['all', 'gym', 'bartender', 'auto', 'construction', 'tattoo'];

export const portfolioItems = [
  { id: 1, category: 'gym',          src: '/videos-promo/Gym/gym.mp4' },
  { id: 2, category: 'bartender',    src: '/videos-promo/Bartender/bartender.mp4' },
  { id: 3, category: 'bartender',    src: '/videos-promo/Bartender/bartender1.mp4' },
  { id: 4, category: 'bartender',    src: '/videos-promo/Bartender/bartender2.mp4' },
  { id: 5, category: 'bartender',    src: '/videos-promo/Bartender/bartender3.mp4' },
  { id: 6, category: 'auto',         src: '/videos-promo/Dealer/dealer.mp4' },
  { id: 7, category: 'auto',         src: '/videos-promo/Dealer/dealer1.mp4' },
  { id: 8, category: 'construction', src: '/videos-promo/Construction/construction.mp4' },
  { id: 9, category: 'tattoo',       src: '/videos-promo/Tattoo Shop/tattoo1.mp4' },
  { id: 10, category: 'tattoo',      src: '/videos-promo/Tattoo Shop/tattoo2.mp4' },
  { id: 11, category: 'gym',         src: '/videos-promo/Gym/gym1.mp4' },
  { id: 12, category: 'gym',         src: '/videos-promo/Gym/gym2.mp4' },
  { id: 13, category: 'gym',         src: '/videos-promo/Gym/gym3.mp4' },
  { id: 14, category: 'gym',         src: '/videos-promo/Gym/gym4.mp4' },
  { id: 15, category: 'construction', src: '/videos-promo/Construction/construction1.mp4' },
];

/* 4 curated showcase videos — one per category for homepage preview */
const PREVIEW_IDS = [1, 2, 6, 8]; // gym, bartender, dealer, construction

export function useDeviceType() {
  const [device, setDevice] = useState('desktop');
  useEffect(() => {
    const check = () => {
      const w = window.innerWidth;
      if (w < 768)       setDevice('phone');
      else if (w < 1024) setDevice('tablet');
      else               setDevice('desktop');
    };
    check();
    window.addEventListener('resize', check, { passive: true });
    return () => window.removeEventListener('resize', check);
  }, []);
  return device;
}

/* ── Screen Content: video + play overlay (lives INSIDE device-frame) ── */
export function ScreenContent({ src, onClick }) {
  return (
    <div className="device-screen" style={{ position: 'relative', cursor: 'pointer' }} onClick={onClick}>
      <video
        src={`${src}#t=0.001`}
        muted
        playsInline
        webkit-playsinline="true"
        preload="metadata"
        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
      />
      <div
        className="portfolio-play-overlay"
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'rgba(0,0,0,0.25)',
          transition: 'background 0.2s',
        }}
      >
        <div className="portfolio-play-btn" style={{ position: 'relative' }}>
          <FaPlay 
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-40%, -50%)',
              width: '16px',
              height: '16px',
              color: '#2B2E31'
            }}
          />
        </div>
      </div>
    </div>
  );
}

/* ── Device Frame Wrappers ── */
function MacBookFrame({ children }) {
  return (
    <div className="device device-macbook-pro">
      <div className="device-frame">{children}</div>
      <div className="device-stripe"></div>
      <div className="device-header"></div>
      <div className="device-sensors"></div>
      <div className="device-btns"></div>
      <div className="device-power"></div>
    </div>
  );
}

function IPadFrame({ children }) {
  return (
    <div className="device device-ipad-pro">
      <div className="device-frame">{children}</div>
      <div className="device-stripe"></div>
      <div className="device-header"></div>
      <div className="device-sensors"></div>
      <div className="device-btns"></div>
      <div className="device-power"></div>
    </div>
  );
}

function IPhoneFrame({ children }) {
  return (
    <div className="device device-iphone-14-pro">
      <div className="device-frame">{children}</div>
      <div className="device-stripe"></div>
      <div className="device-header"></div>
      <div className="device-sensors"></div>
      <div className="device-btns"></div>
      <div className="device-power"></div>
    </div>
  );
}

export function DeviceWrapper({ device, children }) {
  if (device === 'phone')  return <IPhoneFrame>{children}</IPhoneFrame>;
  if (device === 'tablet') return <IPadFrame>{children}</IPadFrame>;
  return <MacBookFrame>{children}</MacBookFrame>;
}

/* ── Video Modal (fullscreen with audio) ── */
export function VideoModal({ src, onClose }) {
  const videoRef = useRef(null);

  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[9999] flex items-center justify-center"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

      <button
        onClick={onClose}
        aria-label="Close video"
        className="absolute top-3 right-3 md:top-6 md:right-6 z-50 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md transition-colors text-white focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none"
      >
        <FaTimes className="text-xl" />
      </button>

      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
        className="relative z-10 w-[90vw] max-w-md max-h-[85vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <video
          ref={videoRef}
          src={src}
          controls
          autoPlay
          playsInline
          className="w-full h-full object-contain rounded-lg bg-black"
          style={{ maxHeight: '85vh' }}
        />
      </motion.div>
    </motion.div>
  );
}

/* ── Mobile Video Carousel ── */
function MobileVideoCarousel({ items, translations, device, openModal }) {
  const [current, setCurrent] = useState(0);
  const total = items.length;

  const next = useCallback(() => setCurrent((p) => (p + 1) % total), [total]);
  const prev = useCallback(() => setCurrent((p) => (p - 1 + total) % total), [total]);

  /* Auto-advance every 4s */
  useEffect(() => {
    const timer = setInterval(next, 4000);
    return () => clearInterval(timer);
  }, [next]);

  const [direction, setDirection] = useState(1);

  const handleNext = () => { setDirection(1); next(); };
  const handlePrev = () => { setDirection(-1); prev(); };

  /* Swipe support */
  const [touchStart, setTouchStart] = useState(null);
  const handleTouchStart = (e) => setTouchStart(e.touches[0].clientX);
  const handleTouchEnd = (e) => {
    if (touchStart === null) return;
    const diff = touchStart - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      diff > 0 ? handleNext() : handlePrev();
    }
    setTouchStart(null);
  };

  const slideVariants = {
    enter: (dir) => ({ x: dir > 0 ? 250 : -250, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir) => ({ x: dir > 0 ? -250 : 250, opacity: 0 }),
  };

  const item = items[current];

  return (
    <div className="relative">
      {/* Carousel viewport */}
      <div
        className="overflow-hidden relative"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={item.id}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="w-full"
          >
            <div className="portfolio-card">
              <p className="portfolio-label">
                {translations[`portfolio.${item.category}`]}
              </p>
              <div className="portfolio-device-wrapper">
                <DeviceWrapper device={device}>
                  <ScreenContent src={item.src} onClick={() => openModal(item.src)} />
                </DeviceWrapper>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation arrows + dots */}
      <div className="flex items-center justify-between mt-6">
        <button
          onClick={handlePrev}
          aria-label="Previous video"
          className="w-10 h-10 flex items-center justify-center rounded-full border border-white/15 text-agency-light/70 hover:text-white hover:border-agency-cream/40 transition-colors active:scale-95"
        >
          <FaChevronLeft className="text-xs" />
        </button>

        {/* Dot indicators */}
        <div className="flex items-center gap-2">
          {items.map((_, idx) => (
            <button
              key={idx}
              onClick={() => { setDirection(idx > current ? 1 : -1); setCurrent(idx); }}
              aria-label={`Go to video ${idx + 1}`}
              className={`rounded-full transition-all duration-300 ${
                idx === current
                  ? 'w-6 h-2 bg-agency-cream'
                  : 'w-2 h-2 bg-white/20 hover:bg-white/40'
              }`}
            />
          ))}
        </div>

        <button
          onClick={handleNext}
          aria-label="Next video"
          className="w-10 h-10 flex items-center justify-center rounded-full border border-white/15 text-agency-light/70 hover:text-white hover:border-agency-cream/40 transition-colors active:scale-95"
        >
          <FaChevronRight className="text-xs" />
        </button>
      </div>
    </div>
  );
}

/* ── Main Portfolio (Homepage Preview Mode by default) ── */
export default function Portfolio({ translations, mode = 'preview' }) {
  const [active, setActive] = useState('all');
  const [modalSrc, setModalSrc] = useState(null);
  const device = useDeviceType();

  const isPreview = mode === 'preview';
  const isMobile = device === 'phone';

  const items = isPreview
    ? portfolioItems.filter(item => PREVIEW_IDS.includes(item.id))
    : (active === 'all' ? portfolioItems : portfolioItems.filter(i => i.category === active));

  const openModal = useCallback((src) => setModalSrc(src), []);
  const closeModal = useCallback(() => setModalSrc(null), []);

  return (
    <>
      <section id="portfolio" className="py-24 bg-[#232528] relative overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-agency-cream rounded-full mix-blend-overlay filter blur-3xl opacity-5"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">
              {translations['portfolio.title']}
            </h2>
            <div className="w-20 h-1 bg-agency-cream mx-auto mb-6"></div>
            <p className="text-agency-gray text-lg">{translations['portfolio.subtitle']}</p>
          </motion.div>

          {/* Category Filters — only in full mode */}
          {!isPreview && (
            <div className="flex flex-wrap justify-center gap-3 mb-16">
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActive(cat)}
                  className={`px-5 py-2.5 rounded-sm text-sm font-bold uppercase tracking-widest transition-all min-h-[44px] focus-visible:ring-2 focus-visible:ring-agency-cream focus-visible:outline-none ${
                    active === cat
                      ? 'bg-agency-cream text-agency-dark shadow-lg'
                      : 'border border-agency-gray/30 text-agency-gray hover:text-white hover:border-white'
                  }`}
                >
                  {translations[`portfolio.${cat}`]}
                </button>
              ))}
            </div>
          )}

          {/* Mobile Carousel (homepage only) | Grid (desktop + full page) */}
          {isMobile && isPreview ? (
            <MobileVideoCarousel
              items={items}
              translations={translations}
              device={device}
              openModal={openModal}
            />
          ) : (
            <div className="portfolio-grid">
              <AnimatePresence>
                {items.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3, delay: index * 0.04, ease: [0.25, 0.1, 0.25, 1] }}
                    className="portfolio-card"
                  >
                    <p className="portfolio-label">
                      {translations[`portfolio.${item.category}`]}
                    </p>

                    <div className="portfolio-device-wrapper">
                      <DeviceWrapper device={device}>
                        <ScreenContent src={item.src} onClick={() => openModal(item.src)} />
                      </DeviceWrapper>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}

          {/* "View More" CTA — only in preview mode */}
          {isPreview && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="text-center mt-16"
            >
              <a
                href="/portfolio"
                className="group inline-flex items-center gap-3 px-8 py-4 bg-agency-cream text-agency-dark font-bold uppercase tracking-widest text-sm rounded-sm hover:bg-white transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 min-h-[52px]"
              >
                {translations['portfolio.viewMore'] || 'View All Work'}
                <FaArrowRight className="text-xs transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </motion.div>
          )}
        </div>
      </section>

      <AnimatePresence>
        {modalSrc && <VideoModal src={modalSrc} onClose={closeModal} />}
      </AnimatePresence>
    </>
  );
}
