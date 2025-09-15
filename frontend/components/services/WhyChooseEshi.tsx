'use client';

import { BorderBeam } from '@/components/magicui/border-beam';
import { motion, useInView } from 'framer-motion';
import { Globe, Handshake, Landmark, Sprout } from 'lucide-react';
import { useRef } from 'react';

const reasons = [
  {
    title: 'Grassroots Orientation & Localization',
    desc: 'Deeply rooted in local communities, we tailor solutions to cultural and regional needs, ensuring authentic impact.',
    icon: <Globe className="w-8 h-8 text-avocado" />,
  },
  {
    title: 'Long-Term Sustainability Focus',
    desc: 'Our initiatives are designed for enduring change, empowering communities to thrive independently.',
    icon: <Sprout className="w-8 h-8 text-avocado" />,
  },
  {
    title: 'Real Partnership, Not Dependency',
    desc: 'We foster collaborative relationships that amplify local voices and build capacity, not reliance.',
    icon: <Handshake className="w-8 h-8 text-avocado" />,
  },
  {
    title: 'Decades of Experience with NGOs & CSOs',
    desc: 'Our extensive expertise ensures strategic, impactful solutions for grassroots organizations.',
    icon: <Landmark className="w-8 h-8 text-avocado" />,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1 },
  hover: { y: -10, scale: 1.02, boxShadow: '0 15px 30px rgba(0, 0, 0, 0.1)' },
};

export default function WhyChooseESHI() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="relative py-24 px-6 bg-gradient-to-br from-indian-khaki/20 via-albescent-white/50 to-avocado/10 overflow-hidden">
      {/* Subtle background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/3 w-[700px] h-[700px] bg-deco/5 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-avocado/5 rounded-full blur-3xl animate-pulse-slow delay-700" />
      </div>

      <div className="max-w-6xl mx-auto text-center relative z-10">
        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-4xl md:text-5xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-avocado to-deco"
        >
          Why Choose ESHI?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6, ease: 'easeOut' }}
          className="text-lg text-rangitoto/80 mb-16 max-w-3xl mx-auto leading-relaxed"
        >
          We don’t just provide services—we create{' '}
          <span className="font-semibold text-avocado">lasting impact</span> by
          empowering grassroots organizations to drive sustainable change.
        </motion.p>

        {/* Cards */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {reasons.map((reason, i) => (
            <motion.div
              key={reason.title}
              variants={itemVariants}
              whileHover="hover"
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="relative group"
            >
              <div className="relative rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-lg group-hover:shadow-2xl transition-all duration-500 overflow-hidden">
                {/* Enhanced BorderBeam */}
                <BorderBeam
                  size={150}
                  duration={8 + i * 2}
                  colorFrom="var(--color-deco)"
                  colorTo="var(--color-avocado)"
                  borderWidth={2}
                />
                <div className="relative z-10 p-8 flex flex-col items-start text-left">
                  {/* Icon */}
                  <div className="mb-4">{reason.icon}</div>
                  {/* Title */}
                  <h3 className="text-xl font-bold text-rangitoto mb-2 group-hover:text-avocado transition-colors">
                    {reason.title}
                  </h3>
                  {/* Description */}
                  <p className="text-sm text-rangitoto/70 leading-relaxed">
                    {reason.desc}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
