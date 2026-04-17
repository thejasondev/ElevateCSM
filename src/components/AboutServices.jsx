import { motion } from 'framer-motion';
import { FaVideo, FaCut, FaShareAlt, FaStar } from 'react-icons/fa';

function SectionBlock({ title, items, featured }) {
  return (
    <div className={`pt-5 pb-2 border-t ${featured ? 'border-agency-dark/10' : 'border-agency-gray/10'}`}>
      <p className={`text-[10px] font-bold tracking-widest mb-3 ${featured ? 'text-agency-dark/50' : 'text-agency-cream/60'}`}>
        {title}
      </p>
      <ul className="space-y-1.5">
        {items.map((item, i) => (
          <li key={i} className={`text-sm leading-relaxed ${featured ? 'text-agency-dark/80' : 'text-agency-light/75'}`}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function AboutServices({ translations }) {
  const packages = [
    {
      key: 'starter',
      name: translations['pkg.starter.name'],
      tagline: translations['pkg.starter.tagline'],
      price: translations['pkg.starter.price'],
      period: translations['pkg.starter.period'],
      featured: false,
      badge: null,
      sections: [
        {
          icon: <FaVideo className="text-agency-cream/40 text-xs" />,
          title: translations['pkg.starter.s1.title'],
          items: [translations['pkg.starter.s1.f1'], translations['pkg.starter.s1.f2']],
        },
        {
          icon: <FaCut className="text-agency-cream/40 text-xs" />,
          title: translations['pkg.starter.s2.title'],
          items: [translations['pkg.starter.s2.f1'], translations['pkg.starter.s2.f2'], translations['pkg.starter.s2.f3']],
        },
        {
          icon: <FaShareAlt className="text-agency-cream/40 text-xs" />,
          title: translations['pkg.starter.s3.title'],
          items: [translations['pkg.starter.s3.f1'], translations['pkg.starter.s3.f2']],
        },
      ],
    },
    {
      key: 'growth',
      name: translations['pkg.growth.name'],
      tagline: translations['pkg.growth.tagline'],
      price: translations['pkg.growth.price'],
      period: translations['pkg.growth.period'],
      featured: true,
      badge: translations['pkg.popular'],
      sections: [
        {
          icon: <FaVideo className="text-agency-dark/30 text-xs" />,
          title: translations['pkg.growth.s1.title'],
          items: [translations['pkg.growth.s1.f1'], translations['pkg.growth.s1.f2']],
        },
        {
          icon: <FaCut className="text-agency-dark/30 text-xs" />,
          title: translations['pkg.growth.s2.title'],
          items: [translations['pkg.growth.s2.f1'], translations['pkg.growth.s2.f2'], translations['pkg.growth.s2.f3']],
        },
        {
          icon: <FaShareAlt className="text-agency-dark/30 text-xs" />,
          title: translations['pkg.growth.s3.title'],
          items: [translations['pkg.growth.s3.f1'], translations['pkg.growth.s3.f2']],
        },
      ],
    },
    {
      key: 'elite',
      name: translations['pkg.elite.name'],
      tagline: translations['pkg.elite.tagline'],
      price: translations['pkg.elite.price'],
      period: translations['pkg.elite.period'],
      featured: false,
      badge: translations['pkg.premium'],
      sections: [
        {
          icon: <FaVideo className="text-agency-cream/40 text-xs" />,
          title: translations['pkg.elite.s1.title'],
          items: [translations['pkg.elite.s1.f1'], translations['pkg.elite.s1.f2']],
        },
        {
          icon: <FaCut className="text-agency-cream/40 text-xs" />,
          title: translations['pkg.elite.s2.title'],
          items: [translations['pkg.elite.s2.f1'], translations['pkg.elite.s2.f2'], translations['pkg.elite.s2.f3']],
        },
        {
          icon: <FaShareAlt className="text-agency-cream/40 text-xs" />,
          title: translations['pkg.elite.s3.title'],
          items: [translations['pkg.elite.s3.f1']],
        },
      ],
    },
  ];

  /* Direction helper: left(-1), right(+1), left(-1) for index 0,1,2... */
  const getSlideDirection = (index) => (index % 2 === 0 ? -1 : 1);

  return (
    <>
      <section id="about" className="py-32 bg-agency-dark overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* Left Column — Text */}
            <div className="flex flex-col">
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <h2 className="text-sm tracking-widest text-agency-cream uppercase font-bold mb-6">{translations['about.title']}</h2>
                <h3 className="text-3xl md:text-4xl font-extrabold text-white mb-6 md:mb-8 leading-tight tracking-tight">
                  ELEVATE <span className="text-agency-cream">CSM</span>
                </h3>
              </motion.div>

              {/* MOBILE ONLY PHOTO — Interleaved between title and descriptions */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                className="relative md:hidden mb-10 mt-2"
              >
                <div className="absolute -inset-3 bg-agency-cream/5 rounded-sm blur-xl"></div>
                <img
                  src="/fotos-team/team.webp"
                  alt="ElevateCSM Team"
                  className="relative w-full rounded-sm shadow-2xl object-cover aspect-[4/3]"
                  loading="lazy"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <p className="text-lg md:text-xl text-agency-light/90 leading-relaxed mb-6">
                  {translations['about.desc1']}
                </p>
                <p className="text-lg md:text-xl text-agency-light/90 leading-relaxed mb-6">
                  {translations['about.desc2']}
                </p>
                <p className="text-lg md:text-xl text-agency-cream/80 leading-relaxed font-medium italic">
                  {translations['about.desc3']}
                </p>
              </motion.div>
            </div>

            {/* Right Column — DESKTOP ONLY PHOTO */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
              className="relative hidden md:block"
            >
              <div className="absolute -inset-4 bg-agency-cream/10 rounded-sm blur-2xl"></div>
              <img
                src="/fotos-team/team.webp"
                alt="ElevateCSM Team"
                className="relative w-full rounded-sm shadow-2xl object-cover aspect-[4/3]"
                loading="lazy"
              />
              <div className="absolute bottom-0 left-0 right-0 h-1/4 bg-gradient-to-t from-agency-dark to-transparent rounded-b-sm"></div>
            </motion.div>
          </div>
        </div>
      </section>

      <section id="services" className="py-24 bg-[#232528] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-agency-cream rounded-full mix-blend-overlay filter blur-3xl opacity-5"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight">{translations['services.title']}</h2>
            <div className="w-20 h-1 bg-agency-cream mx-auto"></div>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
            {packages.map((pkg, index) => (
              <motion.div
                key={pkg.key}
                initial={{ opacity: 0, x: getSlideDirection(index) * 60 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: index * 0.12, ease: [0.25, 0.1, 0.25, 1] }}
                className={`relative rounded-sm overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl flex flex-col ${
                  pkg.featured
                    ? 'bg-agency-cream text-agency-dark shadow-xl md:scale-[1.03]'
                    : 'bg-agency-dark border border-agency-gray/20'
                }`}
              >
                {/* Badge */}
                {pkg.badge && (
                  <div className={`absolute top-0 right-0 px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest flex items-center gap-1.5 ${
                    pkg.featured
                      ? 'bg-agency-dark text-agency-cream'
                      : 'bg-agency-cream text-agency-dark'
                  }`}>
                    <FaStar className="text-[8px]" /> {pkg.badge}
                  </div>
                )}

                {/* Header */}
                <div className="p-8 pb-4 text-center">
                  <h3 className={`text-2xl font-bold mb-1 ${pkg.featured ? 'text-agency-dark' : 'text-white'}`}>
                    {pkg.name}
                  </h3>
                  <p className={`text-sm mb-6 ${pkg.featured ? 'text-agency-dark/60' : 'text-agency-gray'}`}>
                    {pkg.tagline}
                  </p>
                  <p className={`text-5xl font-extrabold tracking-tight ${pkg.featured ? 'text-agency-dark' : 'text-white'}`}>
                    {pkg.price}
                  </p>
                  <p className={`text-xs tracking-widest font-bold mt-1 ${pkg.featured ? 'text-agency-dark/50' : 'text-agency-gray/70'}`}>
                    {pkg.period}
                  </p>
                </div>

                {/* Service sections */}
                <div className="px-8 pb-4 flex-1 space-y-4">
                  {pkg.sections.map((section, si) => (
                    <SectionBlock
                      key={si}
                      title={section.title}
                      items={section.items}
                      featured={pkg.featured}
                    />
                  ))}
                </div>

                {/* CTA */}
                <div className="px-8 pb-8 pt-4">
                  <motion.a
                    href="tel:+13051234567"
                    whileTap={{ scale: 0.95 }}
                    className={`block w-full text-center py-3.5 rounded-sm font-bold uppercase tracking-widest text-sm transition-colors min-h-[48px] flex items-center justify-center focus-visible:ring-2 focus-visible:outline-none ${
                      pkg.featured
                        ? 'bg-agency-dark text-agency-cream hover:bg-[#1a1c1d] focus-visible:ring-agency-dark/30'
                        : 'bg-agency-cream text-agency-dark hover:bg-white focus-visible:ring-agency-cream/50'
                    }`}
                  >
                    {translations['pkg.cta']}
                  </motion.a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
