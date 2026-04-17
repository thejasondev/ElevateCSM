import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlay, FaPause } from 'react-icons/fa';
import 'devices.css/dist/devices.min.css';

const CATEGORIES = ['all', 'gym', 'bartender', 'auto', 'construction'];

const portfolioItems = [
  { id: 1, category: 'gym',          src: '/videos-promo/Gym/copy_5C492480-8BA7-4720-BBC5-BC6B10A5051C.mov',          label: 'Gym & Fitness' },
  { id: 2, category: 'bartender',    src: '/videos-promo/Bartender/copy_76BA4834-BE6B-4A80-8A64-2ED83D47A8D8.mov',    label: 'Bartender' },
  { id: 3, category: 'bartender',    src: '/videos-promo/Bartender/copy_84D76E70-DE52-4815-9854-F4FCCAEC4019.mov',    label: 'Bartender' },
  { id: 4, category: 'bartender',    src: '/videos-promo/Bartender/copy_98B9E254-6877-43D7-A8E8-C3902453C280.mov',    label: 'Bartender' },
  { id: 5, category: 'bartender',    src: '/videos-promo/Bartender/copy_E5F10B36-A9D5-45F6-B83D-82371402F186.mov',    label: 'Bartender' },
  { id: 6, category: 'auto',         src: '/videos-promo/Dealer/copy_B5D155E3-1274-45AE-9368-C97A761CA1C7.mov',       label: 'Auto Dealer' },
  { id: 7, category: 'auto',         src: '/videos-promo/Dealer/copy_D6ECAA85-6E02-4863-BC6A-22B9A89A2A9C.mov',       label: 'Auto Dealer' },
  { id: 8, category: 'construction', src: '/videos-promo/Construction/copy_7998F500-E6FE-4655-916C-F7B0A976B4F5.mov', label: 'Construction' },
];

/* ── Video Card with Play/Pause ── */
function VideoCard({ item, translations }) {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  const togglePlay = () => {
    const vid = videoRef.current;
    if (!vid) return;
    if (playing) {
      vid.pause();
      setPlaying(false);
    } else {
      vid.muted = false;
      vid.play().then(() => setPlaying(true)).catch(() => {});
    }
  };

  // Pause when filtering hides/shows the card
  useEffect(() => {
    return () => {
      if (videoRef.current) videoRef.current.pause();
    };
  }, []);

  return (
    <div className="flex flex-col items-center">
      {/* Video container with fixed aspect ratio */}
      <div
        className="relative w-full max-w-sm mx-auto rounded-lg overflow-hidden shadow-2xl bg-black cursor-pointer group"
        onClick={togglePlay}
        role="button"
        tabIndex={0}
        aria-label={playing ? 'Pause video' : 'Play video'}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); togglePlay(); }}}
      >
        {/* 9:16 aspect ratio container (vertical video) */}
        <div className="relative w-full" style={{ paddingBottom: '177.78%' }}>
          <video
            ref={videoRef}
            src={item.src}
            className="absolute inset-0 w-full h-full object-cover"
            playsInline
            preload="metadata"
            loop
          />

          {/* Play/Pause Overlay */}
          <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-200 ${playing ? 'opacity-0 group-hover:opacity-100' : 'opacity-100'}`}>
            <div className="bg-agency-dark/60 backdrop-blur-sm rounded-full w-16 h-16 flex items-center justify-center border border-white/20 transition-transform hover:scale-110">
              {playing
                ? <FaPause className="text-white text-lg" />
                : <FaPlay className="text-white text-lg ml-1" />
              }
            </div>
          </div>

          {/* Gradient bottom */}
          <div className="absolute bottom-0 left-0 right-0 h-1/4 bg-gradient-to-t from-black/60 to-transparent pointer-events-none"></div>
        </div>
      </div>

      {/* Category Label */}
      <p className="mt-5 text-agency-cream font-bold uppercase tracking-widest text-sm text-center">
        {translations[`portfolio.${item.category}`]}
      </p>
    </div>
  );
}

/* ── Main Portfolio ── */
export default function Portfolio({ translations }) {
  const [active, setActive] = useState('all');

  const filtered = active === 'all'
    ? portfolioItems
    : portfolioItems.filter(i => i.category === active);

  return (
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

        {/* Category Filters */}
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

        {/* Video Grid — clean cards, no device frames */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
          <AnimatePresence mode="popLayout">
            {filtered.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, delay: index * 0.04, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <VideoCard item={item} translations={translations} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
