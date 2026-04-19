import { motion, useInView, animate } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

function AnimatedCounter({ textValue, triggerDelay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10px" });
  const [display, setDisplay] = useState("0");

  const match = String(textValue).match(/^(\D*)(\d+(?:\.\d+)?)(\D*)$/);

  useEffect(() => {
    if (!match) return;
    const number = parseFloat(match[2]);
    const isFloat = textValue.includes('.');

    if (inView) {
      const controls = animate(0, number, {
        duration: 2.5,
        delay: triggerDelay,
        ease: [0.16, 1, 0.3, 1], // Custom snappy easing
        onUpdate: (val) => {
          setDisplay(isFloat ? val.toFixed(1) : Math.floor(val).toString());
        }
      });
      return controls.stop;
    }
  }, [inView, textValue, triggerDelay]);

  if (!match) {
    return <span ref={ref}>{textValue}</span>;
  }

  return (
    <span ref={ref}>
      {match[1]}{display}{match[3]}
    </span>
  );
}

export default function Metrics({ translations }) {
  const metricsData = [
    { value: translations['metrics.1.value'], label: translations['metrics.1.label'] },
    { value: translations['metrics.2.value'], label: translations['metrics.2.label'] },
    { value: translations['metrics.3.value'], label: translations['metrics.3.label'] },
    { value: translations['metrics.4.value'], label: translations['metrics.4.label'] },
  ];

  return (
    <section className="py-24 bg-agency-dark w-full overflow-hidden border-y border-white/5 relative">
      {/* Decorative Blur */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-agency-cream rounded-full mix-blend-overlay filter blur-3xl opacity-5 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <motion.div
           initial={{ opacity: 0, y: 10 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true, margin: "-40px" }}
           transition={{ duration: 0.4 }}
           className="text-center mb-16 md:mb-20"
        >
          <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight uppercase">
            {translations['metrics.title']}
          </h2>
          <div className="w-16 h-1 bg-agency-cream mx-auto mt-6"></div>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-4 text-center">
          {metricsData.map((metric, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: index * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
              className={`flex flex-col items-center justify-center p-4 relative ${index !== 3 ? 'md:after:content-[""] md:after:absolute md:after:right-0 md:after:top-1/4 md:after:h-1/2 md:after:w-px md:after:bg-white/10' : ''}`}
            >
              <h3 className="text-5xl md:text-6xl font-extrabold text-agency-cream mb-4 tracking-tighter drop-shadow-xl">
                <AnimatedCounter textValue={metric.value} triggerDelay={index * 0.1} />
              </h3>
              <p className="text-xs md:text-sm font-bold tracking-widest uppercase text-agency-light/70 px-2 leading-relaxed">
                {metric.label}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
