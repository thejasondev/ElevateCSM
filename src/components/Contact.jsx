import { motion } from 'framer-motion';
import { FaWhatsapp, FaCalendarAlt } from 'react-icons/fa';

export default function Contact({ translations }) {

  return (
    <section
      id="contact"
      className="py-32 bg-agency-cream relative text-agency-dark"
    >
      <div className="absolute inset-0 bg-white/50 mix-blend-overlay"></div>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight text-agency-dark">
            {translations["contact.title"]}
          </h2>
          <div className="w-24 h-1 bg-agency-dark mx-auto"></div>
          <p className="mt-8 text-xl text-agency-gray/80 max-w-2xl mx-auto font-medium">
            Ready to scale your social media presence? Choose the fastest way to
            reach our experts.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-6 justify-center items-center mt-12">
          <motion.a
            href="https://wa.me/+17869193887?text=Hello%20ElevateCSM%2C%20I'd%20like%20to%20know%20more%20about%20your%20services"
            target="_blank"
            rel="noopener noreferrer"
            whileTap={{ scale: 0.95 }}
            className="w-full md:w-auto min-h-[56px] px-8 py-4 bg-[#25D366] text-white font-bold text-lg uppercase tracking-widest rounded-sm shadow-xl hover:bg-[#20bd5a] transition-colors focus-visible:ring-4 focus-visible:ring-[#25D366]/50 focus-visible:outline-none flex items-center justify-center gap-3"
          >
            <FaWhatsapp className="text-2xl" />
            {translations["contact.whatsapp"]}
          </motion.a>

          <motion.a
            href="https://calendly.com/elevatecsmagency"
            target="_blank"
            rel="noopener noreferrer"
            whileTap={{ scale: 0.95 }}
            className="w-full md:w-auto min-h-[56px] px-8 py-4 bg-agency-dark text-white font-bold text-lg uppercase tracking-widest rounded-sm shadow-2xl hover:bg-[#1a1c1d] transition-colors focus-visible:ring-4 focus-visible:ring-agency-dark/30 focus-visible:outline-none flex items-center justify-center gap-3"
          >
            <FaCalendarAlt className="text-xl" />
            {translations["contact.call"]}
          </motion.a>
        </div>
      </div>
    </section>
  );
}
