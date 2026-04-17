import { motion } from 'framer-motion';
import { FaVideo, FaShareAlt, FaBullhorn, FaCheck, FaStar } from 'react-icons/fa';

export default function AboutServices({ translations }) {
  const packages = [
    {
      name: translations['pkg.starter.name'],
      price: translations['pkg.starter.price'],
      desc: translations['pkg.starter.desc'],
      icon: <FaShareAlt className="text-3xl text-agency-cream" />,
      features: [
        translations['pkg.starter.f1'],
        translations['pkg.starter.f2'],
        translations['pkg.starter.f3'],
        translations['pkg.starter.f4'],
      ],
      featured: false,
    },
    {
      name: translations['pkg.growth.name'],
      price: translations['pkg.growth.price'],
      desc: translations['pkg.growth.desc'],
      icon: <FaVideo className="text-3xl text-agency-dark" />,
      features: [
        translations['pkg.growth.f1'],
        translations['pkg.growth.f2'],
        translations['pkg.growth.f3'],
        translations['pkg.growth.f4'],
        translations['pkg.growth.f5'],
      ],
      featured: true,
      badge: translations['pkg.popular'],
    },
    {
      name: translations['pkg.elite.name'],
      price: translations['pkg.elite.price'],
      desc: translations['pkg.elite.desc'],
      icon: <FaBullhorn className="text-3xl text-agency-cream" />,
      features: [
        translations['pkg.elite.f1'],
        translations['pkg.elite.f2'],
        translations['pkg.elite.f3'],
        translations['pkg.elite.f4'],
        translations['pkg.elite.f5'],
        translations['pkg.elite.f6'],
      ],
      featured: false,
    },
  ];

  return (
    <>
      <section id="about" className="py-32 bg-agency-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* Left — Text */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <h2 className="text-sm tracking-widest text-agency-cream uppercase font-bold mb-6">{translations['about.title']}</h2>
              <h3 className="text-3xl md:text-4xl font-extrabold text-white mb-8 leading-tight tracking-tight">
                ELEVATE <span className="text-agency-cream">CSM</span>
              </h3>
              <p className="text-lg md:text-xl text-agency-light/90 leading-relaxed mb-6">
                {translations['about.desc1']}
              </p>
              <p className="text-lg md:text-xl text-agency-cream/80 leading-relaxed font-medium italic">
                {translations['about.desc2']}
              </p>
            </motion.div>

            {/* Right — Team Photo */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
              className="relative"
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

          <div className="grid md:grid-cols-3 gap-8">
            {packages.map((pkg, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.35, delay: index * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
                className={`relative rounded-sm overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl flex flex-col ${
                  pkg.featured
                    ? 'bg-agency-cream text-agency-dark shadow-xl scale-[1.02]'
                    : 'bg-agency-dark border border-agency-gray/20'
                }`}
              >
                {pkg.badge && (
                  <div className="absolute top-0 right-0 bg-agency-dark text-agency-cream px-4 py-1.5 text-xs font-bold uppercase tracking-widest flex items-center gap-1.5">
                    <FaStar className="text-[10px]" /> {pkg.badge}
                  </div>
                )}

                <div className="p-8 pb-6">
                  <div className="mb-4">{pkg.icon}</div>
                  <h3 className={`text-2xl font-bold mb-2 ${pkg.featured ? 'text-agency-dark' : 'text-white'}`}>
                    {pkg.name}
                  </h3>
                  <p className={`text-3xl font-extrabold mb-4 ${pkg.featured ? 'text-agency-dark' : 'text-agency-cream'}`}>
                    {pkg.price}
                  </p>
                  <p className={`leading-relaxed text-sm mb-6 ${pkg.featured ? 'text-agency-dark/70' : 'text-agency-gray'}`}>
                    {pkg.desc}
                  </p>
                </div>

                <div className={`px-8 pb-8 flex-1 border-t ${pkg.featured ? 'border-agency-dark/10' : 'border-agency-gray/10'}`}>
                  <ul className="space-y-3 pt-6">
                    {pkg.features.map((feat, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <FaCheck className={`text-xs mt-1.5 flex-shrink-0 ${pkg.featured ? 'text-agency-dark' : 'text-agency-cream'}`} />
                        <span className={`text-sm ${pkg.featured ? 'text-agency-dark/80' : 'text-agency-light/80'}`}>
                          {feat}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="px-8 pb-8">
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
