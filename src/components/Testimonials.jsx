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

/* ── Testimonial Card (shared between carousel and grid) ── */
function TestimonialCard({ test, featured = false, isCarousel = false }) {
  return (
    <div
      className={`bg-white/[0.03] border border-white/10 backdrop-blur-md rounded-sm p-6 md:p-8 flex flex-col relative ${
        featured ? 'md:col-span-2' : ''
      } ${isCarousel ? 'h-full' : 'group hover:-translate-y-1 transition-transform duration-300'}`}
    >
      <FaQuoteLeft className="text-agency-cream/15 text-2xl md:text-3xl absolute top-5 right-5 pointer-events-none" />

      {/* Stars */}
      <div className="flex gap-1 mb-4 md:mb-5">
        {[...Array(5)].map((_, i) => (
          <FaStar key={i} className="text-agency-cream text-xs" />
        ))}
      </div>

      {/* Quote */}
      <p className={`text-agency-light/90 italic leading-relaxed mb-6 md:mb-8 flex-1 ${
        featured && !isCarousel ? 'text-lg md:text-xl' : 'text-sm md:text-base'
      }`}>
        "{test.text}"
      </p>

      {/* Author */}
      <div className="flex items-center gap-3 mt-auto">
        {test.avatar && (
          <img
            src={test.avatar}
            alt={test.author || test.role}
            className="w-10 h-10 rounded-full object-cover border-2 border-agency-cream/20"
            loading="lazy"
          />
        )}
        <div>
          {test.author && (
            <h4 className="font-bold text-white text-sm tracking-wide">{test.author}</h4>
          )}
          <p className={`text-xs text-agency-cream/70 tracking-widest uppercase ${test.author ? 'mt-0.5' : ''}`}>
            {test.role}
          </p>
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

  /* Auto-advance every 6s */
  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next]);

  const slideVariants = {
    enter: (dir) => ({ x: dir > 0 ? 200 : -200, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir) => ({ x: dir > 0 ? -200 : 200, opacity: 0 }),
  };

  const [direction, setDirection] = useState(1);

  const goTo = (idx) => {
    setDirection(idx > current ? 1 : -1);
    setCurrent(idx);
  };

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

  return (
    <div className="relative">
      {/* Carousel viewport */}
      <div
        className="overflow-hidden relative min-h-[320px]"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={current}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="w-full"
          >
            <TestimonialCard test={testimonials[current]} isCarousel={true} />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation arrows + dots */}
      <div className="flex items-center justify-between mt-6">
        <button
          onClick={handlePrev}
          aria-label="Previous testimonial"
          className="w-10 h-10 flex items-center justify-center rounded-full border border-white/15 text-agency-light/70 hover:text-white hover:border-agency-cream/40 transition-colors active:scale-95"
        >
          <FaChevronLeft className="text-xs" />
        </button>

        {/* Dot indicators */}
        <div className="flex items-center gap-2">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goTo(idx)}
              aria-label={`Go to testimonial ${idx + 1}`}
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
          aria-label="Next testimonial"
          className="w-10 h-10 flex items-center justify-center rounded-full border border-white/15 text-agency-light/70 hover:text-white hover:border-agency-cream/40 transition-colors active:scale-95"
        >
          <FaChevronRight className="text-xs" />
        </button>
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

        {/* Mobile: Swipeable Carousel  |  Desktop: Bento Grid */}
        {isMobile ? (
          <MobileCarousel testimonials={testimonials} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            <TestimonialCard test={testimonials[0]} featured={true} />
            {testimonials.slice(1).map((test, i) => (
              <TestimonialCard key={i + 1} test={test} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
