import { motion } from 'framer-motion';
import { FaStar, FaQuoteLeft } from 'react-icons/fa';

export default function Testimonials({ translations }) {
  const testimonials = [
    {
      text: translations['test.1.text'],
      author: translations['test.1.author'],
      role: translations['test.1.role'],
      avatar: 'https://ui-avatars.com/api/?name=D+T&background=EAE2CA&color=2B2E31',
    },
    {
      text: translations['test.2.text'],
      author: translations['test.2.author'],
      role: translations['test.2.role'],
      avatar: 'https://ui-avatars.com/api/?name=V+R&background=7F817D&color=fff',
    },
    {
      text: translations['test.3.text'],
      author: translations['test.3.author'],
      role: translations['test.3.role'],
      avatar: 'https://ui-avatars.com/api/?name=C+M&background=EAE2CA&color=2B2E31',
    },
  ];

  return (
    <section className="py-32 bg-[#1a1c1d] relative overflow-hidden">
      {/* Decorative Blur */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-agency-cream rounded-full mix-blend-overlay filter blur-3xl opacity-5 pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
           initial={{ opacity: 0, y: 16 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true, margin: "-60px" }}
           transition={{ duration: 0.4 }}
           className="text-center mb-20"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight">
            {translations['testimonials.title']}
          </h2>
          <div className="w-20 h-1 bg-agency-cream mx-auto"></div>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 items-stretch">
          {testimonials.map((test, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: index * 0.15, ease: [0.25, 0.1, 0.25, 1] }}
              className="bg-white/5 border border-white/10 backdrop-blur-md rounded-sm p-8 flex flex-col relative group hover:-translate-y-2 transition-transform duration-300"
            >
              <FaQuoteLeft className="text-agency-cream/20 text-4xl absolute top-6 right-6" />
              
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className="text-agency-cream text-sm" />
                ))}
              </div>

              <p className="text-lg text-agency-light/90 italic leading-relaxed mb-8 flex-1">
                "{test.text}"
              </p>

              <div className="flex items-center gap-4 mt-auto relative z-10">
                <img 
                  src={test.avatar} 
                  alt={test.author} 
                  className="w-12 h-12 rounded-full object-cover border-2 border-agency-cream/30"
                  loading="lazy"
                />
                <div>
                  <h4 className="font-bold text-white text-md">{test.author}</h4>
                  <p className="text-xs text-agency-light/60 tracking-widest uppercase mt-0.5">{test.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
