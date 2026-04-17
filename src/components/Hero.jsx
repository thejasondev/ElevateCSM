import { motion } from 'framer-motion';

export default function Hero({ translations }) {
  return (
    <section id="home" className="relative min-h-[100svh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
         <img src="/hero_bg.png" alt="Marketing Background" className="w-full h-full object-cover opacity-80" />
         <div className="absolute inset-0 bg-agency-dark/70" />
         <div className="absolute inset-0 bg-gradient-to-b from-transparent to-agency-dark" />
      </div>

      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto pt-36 pb-20 md:pt-40 md:pb-24">
        <motion.h1 
          className="text-5xl md:text-7xl font-extrabold text-white mb-6 md:mb-8 tracking-tight leading-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
          dangerouslySetInnerHTML={{ __html: translations['hero.title'].replace('Dynamic Content', '<span class="text-agency-cream">Dynamic Content</span>').replace('Contenido Dinámico', '<span class="text-agency-cream">Contenido Dinámico</span>') }}
        />
        
        <motion.p 
          className="text-lg md:text-xl text-agency-light mb-12 max-w-4xl mx-auto font-light leading-relaxed"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {translations['hero.subtitle']}
        </motion.p>
        
        <motion.div
           initial={{ opacity: 0, y: 12 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.4, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
        >
           <motion.a
             href="https://calendly.com/elevatecsmagency"
             target="_blank"
             rel="noopener noreferrer"
             whileTap={{ scale: 0.95 }}
             className="inline-flex items-center justify-center px-10 py-5 bg-agency-cream text-agency-dark text-lg font-bold uppercase tracking-widest rounded-sm transition-all hover:bg-white hover:scale-105 hover:shadow-2xl shadow-agency-cream/20 focus-visible:ring-4 focus-visible:ring-white focus-visible:outline-none min-h-[56px]"
           >
             {translations['hero.cta']}
           </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
