import { motion } from 'framer-motion';

export default function TeamMembers({ translations }) {
  const members = [
    {
      name: translations['team.carla.name'],
      role: translations['team.carla.role'],
      desc: translations['team.carla.desc'],
      photo: '/fotos-team/carla.webp',
    },
    {
      name: translations['team.sheily.name'],
      role: translations['team.sheily.role'],
      desc: translations['team.sheily.desc'],
      photo: '/fotos-team/sheily.webp',
    },
    {
      name: translations['team.melanie.name'],
      role: translations['team.melanie.role'],
      desc: translations['team.melanie.desc'],
      photo: '/fotos-team/melanie.webp',
    },
  ];

  return (
    <section className="py-24 bg-agency-dark overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-center mb-20"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight">{translations['team.title']}</h2>
          <div className="w-20 h-1 bg-agency-cream mx-auto"></div>
        </motion.div>

        <div className="space-y-24 md:space-y-32">
          {members.map((member, index) => {
            const isEven = index % 2 === 0;
            /* Photo slides from left on even rows, from right on odd rows */
            const photoX = isEven ? -50 : 50;
            /* Text slides from the opposite direction */
            const textX = isEven ? 50 : -50;

            return (
              <div
                key={member.name}
                className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center"
              >
                {/* Photo — slides in laterally */}
                <motion.div
                  initial={{ opacity: 0, x: photoX }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.55, ease: [0.25, 0.1, 0.25, 1] }}
                  className={`relative ${isEven ? 'md:order-1' : 'md:order-2'} order-1`}
                >
                  <div className="absolute -inset-3 bg-agency-cream/5 rounded-sm blur-xl"></div>
                  <img
                    src={member.photo}
                    alt={member.name}
                    className="relative w-3/5 mx-auto md:w-full max-w-md md:max-w-none rounded-sm shadow-2xl object-cover aspect-[3/4]"
                    loading="lazy"
                  />
                </motion.div>

                {/* Content — slides from opposite direction */}
                <motion.div
                  initial={{ opacity: 0, x: textX }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.55, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
                  className={`${isEven ? 'md:order-2' : 'md:order-1'} order-2`}
                >
                  <p className="text-sm tracking-widest text-agency-cream uppercase font-bold mb-3">
                    {member.role}
                  </p>
                  <h3 className="text-3xl md:text-4xl font-extrabold text-white mb-6 tracking-tight leading-tight">
                    {member.name}
                  </h3>
                  <div className="w-12 h-1 bg-agency-cream mb-8"></div>
                  <p className="text-lg text-agency-light/85 leading-relaxed">
                    {member.desc}
                  </p>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
