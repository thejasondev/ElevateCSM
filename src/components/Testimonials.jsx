import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaStar, FaQuoteLeft, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

/* ── Detect mobile vs desktop ── */
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check, { passive: true });
    return () => window.removeEventListener('resize', check);
  }, []);
  return isMobile;
}

/* ── Shared Star Rating ── */
function Stars() {
  return (
    <div className="flex gap-1">
      {[...Array(5)].map((_, i) => (
        <FaStar key={i} className="text-agency-cream text-xs" />
      ))}
    </div>
  );
}

/* ── Mobile Card (for carousel) ── */
function MobileCard({ test }) {
  return (
    <div className="bg-white/[0.03] border border-white/10 backdrop-blur-md rounded-sm p-6 flex flex-col relative h-full">
      <FaQuoteLeft className="text-agency-cream/15 text-2xl absolute top-5 right-5 pointer-events-none" />
      <Stars />
      <p className="text-agency-light/90 italic leading-relaxed my-5 flex-1 text-sm">
        "{test.text}"
      </p>
      <div className="flex items-center gap-3 mt-auto">
        {test.avatar && (
          <img src={test.avatar} alt={test.author || test.role}
            className="w-10 h-10 rounded-full object-cover border-2 border-agency-cream/20" loading="lazy" />
        )}
        <div>
          {test.author && <h4 className="font-bold text-white text-sm tracking-wide">{test.author}</h4>}
          <p className={`text-xs text-agency-cream/70 tracking-widest uppercase ${test.author ? 'mt-0.5' : ''}`}>{test.role}</p>
        </div>
      </div>
    </div>
  );
}

/* ── Mobile Carousel ── */
function MobileCarousel({ testimonials }) {
  const [current, setCurrent] = useState(0);
  const total = testimonials.length;
  const next = useCallback(() => setCurrent((p) => (p + 1) % total), [total]);
  const prev = useCallback(() => setCurrent((p) => (p - 1 + total) % total), [total]);
  const [direction, setDirection] = useState(1);

  useEffect(() => { const t = setInterval(next, 6000); return () => clearInterval(t); }, [next]);

  const handleNext = () => { setDirection(1); next(); };
  const handlePrev = () => { setDirection(-1); prev(); };

  const [touchStart, setTouchStart] = useState(null);
  const handleTouchStart = (e) => setTouchStart(e.touches[0].clientX);
  const handleTouchEnd = (e) => {
    if (touchStart === null) return;
    const diff = touchStart - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) { diff > 0 ? handleNext() : handlePrev(); }
    setTouchStart(null);
  };

  const slideVariants = {
    enter: (d) => ({ x: d > 0 ? 200 : -200, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d) => ({ x: d > 0 ? -200 : 200, opacity: 0 }),
  };

  return (
    <div className="relative">
      <div className="overflow-hidden relative min-h-[320px]" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div key={current} custom={direction} variants={slideVariants}
            initial="enter" animate="center" exit="exit"
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }} className="w-full">
            <MobileCard test={testimonials[current]} />
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="flex items-center justify-between mt-6">
        <button onClick={handlePrev} aria-label="Previous testimonial"
          className="w-10 h-10 flex items-center justify-center rounded-full border border-white/15 text-agency-light/70 hover:text-white transition-colors active:scale-95">
          <FaChevronLeft className="text-xs" />
        </button>
        <div className="flex items-center gap-2">
          {testimonials.map((_, idx) => (
            <button key={idx} onClick={() => { setDirection(idx > current ? 1 : -1); setCurrent(idx); }}
              aria-label={`Go to testimonial ${idx + 1}`}
              className={`rounded-full transition-all duration-300 ${idx === current ? 'w-6 h-2 bg-agency-cream' : 'w-2 h-2 bg-white/20 hover:bg-white/40'}`} />
          ))}
        </div>
        <button onClick={handleNext} aria-label="Next testimonial"
          className="w-10 h-10 flex items-center justify-center rounded-full border border-white/15 text-agency-light/70 hover:text-white transition-colors active:scale-95">
          <FaChevronRight className="text-xs" />
        </button>
      </div>
    </div>
  );
}

/* ── Desktop Spotlight Carousel ── */
function DesktopSpotlight({ testimonials }) {
  const [current, setCurrent] = useState(0);
  const total = testimonials.length;
  const INTERVAL = 7000;

  const next = useCallback(() => setCurrent((p) => (p + 1) % total), [total]);
  const prev = useCallback(() => setCurrent((p) => (p - 1 + total) % total), [total]);

  /* Auto-advance + progress bar reset */
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    setProgress(0);
    const startTime = Date.now();
    const frame = () => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min((elapsed / INTERVAL) * 100, 100);
      setProgress(pct);
      if (pct < 100) rafId = requestAnimationFrame(frame);
    };
    let rafId = requestAnimationFrame(frame);
    const timer = setTimeout(next, INTERVAL);
    return () => { cancelAnimationFrame(rafId); clearTimeout(timer); };
  }, [current, next]);

  const test = testimonials[current];

  return (
    <div className="relative">
      {/* Main spotlight area */}
      <div className="grid grid-cols-12 gap-8 lg:gap-16 items-center min-h-[380px]">

        {/* Left: Large quote */}
        <div className="col-span-12 lg:col-span-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <FaQuoteLeft className="text-agency-cream/20 text-4xl mb-8" />

              <p className="text-xl lg:text-2xl xl:text-3xl text-white/90 italic leading-relaxed font-light tracking-tight">
                "{test.text}"
              </p>

              {/* Author info */}
              <div className="flex items-center gap-4 mt-10">
                {test.avatar && (
                  <img src={test.avatar} alt={test.author || test.role}
                    className="w-14 h-14 rounded-full object-cover border-2 border-agency-cream/30" loading="lazy" />
                )}
                <div>
                  {test.author && (
                    <h4 className="font-bold text-white text-lg tracking-wide">{test.author}</h4>
                  )}
                  <p className={`text-sm text-agency-cream/80 tracking-widest uppercase font-medium ${test.author ? 'mt-1' : ''}`}>
                    {test.role}
                  </p>
                </div>
                <div className="ml-4">
                  <Stars />
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right: Navigation panel */}
        <div className="col-span-12 lg:col-span-4 flex flex-col items-center lg:items-end gap-6">
          {/* Vertical nav indicators */}
          <div className="flex lg:flex-col gap-3">
            {testimonials.map((t, idx) => (
              <button
                key={idx}
                onClick={() => setCurrent(idx)}
                aria-label={`Testimonial ${idx + 1}`}
                className={`group flex items-center gap-3 transition-all duration-300 ${
                  idx === current ? 'opacity-100' : 'opacity-40 hover:opacity-70'
                }`}
              >
                <img src={t.avatar} alt={t.author || t.role}
                  className={`rounded-full object-cover border-2 transition-all duration-300 ${
                    idx === current
                      ? 'w-12 h-12 border-agency-cream shadow-lg shadow-agency-cream/10'
                      : 'w-9 h-9 border-white/20 group-hover:border-white/40'
                  }`}
                  loading="lazy"
                />
                <span className={`hidden lg:block text-sm font-medium transition-colors duration-300 ${
                  idx === current ? 'text-white' : 'text-agency-gray group-hover:text-white/70'
                }`}>
                  {t.author || t.role}
                </span>
              </button>
            ))}
          </div>

          {/* Arrow controls */}
          <div className="flex gap-3 mt-2">
            <button onClick={() => { prev(); }} aria-label="Previous"
              className="w-11 h-11 flex items-center justify-center rounded-full border border-white/15 text-agency-light/60 hover:text-white hover:border-agency-cream/50 transition-all active:scale-95">
              <FaChevronLeft className="text-sm" />
            </button>
            <button onClick={() => { next(); }} aria-label="Next"
              className="w-11 h-11 flex items-center justify-center rounded-full border border-white/15 text-agency-light/60 hover:text-white hover:border-agency-cream/50 transition-all active:scale-95">
              <FaChevronRight className="text-sm" />
            </button>
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <div className="mt-12 h-px bg-white/10 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-agency-cream/60"
          style={{ width: `${progress}%` }}
          transition={{ duration: 0 }}
        />
      </div>

      {/* Counter */}
      <div className="flex justify-between items-center mt-4">
        <p className="text-xs text-agency-gray tracking-widest font-mono">
          {String(current + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
        </p>
      </div>
    </div>
  );
}

/* ── Main Component ── */
export default function Testimonials({ translations }) {
  const isMobile = useIsMobile();

  const testimonials = [
    {
      text: translations['test.1.text'],
      author: translations['test.1.author'],
      role: translations['test.1.role'],
      avatar: 'https://ui-avatars.com/api/?name=F+G&background=EAE2CA&color=2B2E31&bold=true&size=88',
    },
    {
      text: translations['test.2.text'],
      author: translations['test.2.author'],
      role: translations['test.2.role'],
      avatar: 'https://ui-avatars.com/api/?name=A+M&background=3a3d40&color=EAE2CA&bold=true&size=88',
    },
    {
      text: translations['test.3.text'],
      author: translations['test.3.author'],
      role: translations['test.3.role'],
      avatar: 'https://ui-avatars.com/api/?name=H+R&background=EAE2CA&color=2B2E31&bold=true&size=88',
    },
    {
      text: translations['test.4.text'],
      author: translations['test.4.author'],
      role: translations['test.4.role'],
      avatar: 'https://ui-avatars.com/api/?name=T+S&background=3a3d40&color=EAE2CA&bold=true&size=88',
    },
    {
      text: translations['test.5.text'],
      author: translations['test.5.author'],
      role: translations['test.5.role'],
      avatar: 'https://ui-avatars.com/api/?name=A+G&background=EAE2CA&color=2B2E31&bold=true&size=88',
    },
  ];

  return (
    <section className="py-20 md:py-32 bg-[#1a1c1d] relative overflow-hidden">
      {/* Decorative Blurs */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-agency-cream rounded-full mix-blend-overlay filter blur-3xl opacity-5 pointer-events-none"></div>
      <div className="absolute bottom-20 right-10 w-64 h-64 bg-agency-cream rounded-full mix-blend-overlay filter blur-3xl opacity-3 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.4 }}
          className="text-center mb-12 md:mb-20"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight">
            {translations['testimonials.title']}
          </h2>
          <div className="w-20 h-1 bg-agency-cream mx-auto"></div>
        </motion.div>

        {/* Mobile: Swipeable Carousel  |  Desktop: Spotlight */}
        {isMobile ? (
          <MobileCarousel testimonials={testimonials} />
        ) : (
          <DesktopSpotlight testimonials={testimonials} />
        )}
      </div>
    </section>
  );
}
