'use client';

import { BorderBeam } from '@/components/magicui/border-beam';
import { Card, CardContent } from '@/components/ui/card';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import { useRef } from 'react';

const orgs = [
  {
    name: 'Mission With A Vision',
    logo: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop',
    desc: 'Empowering youth through innovative education programs and community outreach.',
    stat: '500+ Students Impacted',
  },
  {
    name: 'Starkid School',
    logo: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop',
    desc: 'Providing quality primary education in underserved rural areas.',
    stat: '10 Schools Built',
  },
  {
    name: 'Wide Horizons',
    logo: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop',
    desc: 'Fostering environmental sustainability and economic development.',
    stat: '1,000+ Trees Planted',
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1 },
  hover: { y: -10, boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)' },
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

export default function ImpactSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="relative py-24 px-6 bg-gradient-to-br from-deco/10 via-albescent-white/50 to-avocado/10 overflow-hidden">
      {/* Subtle background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-avocado/5 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-deco/5 rounded-full blur-3xl animate-pulse-slow delay-1000" />
      </div>

      <div className="max-w-6xl mx-auto text-center relative z-10">
        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-4xl md:text-5xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-avocado to-deco"
        >
          Our Impact
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6, ease: 'easeOut' }}
          className="text-lg text-rangitoto/80 mb-16 max-w-3xl mx-auto leading-relaxed"
        >
          Partnering with grassroots organizations across Ethiopia to create
          sustainable change, amplify community voices, and drive measurable
          progress.
        </motion.p>

        {/* Cards */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-3 gap-10"
        >
          {orgs.map((org, i) => (
            <motion.div key={org.name} variants={cardVariants}>
              <Card className="relative rounded-3xl border border-white/20 bg-white/10 backdrop-blur-xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden">
                {/* Enhanced BorderBeam */}
                <BorderBeam
                  size={150}
                  duration={8 + i * 2}
                  colorFrom="var(--color-avocado)"
                  colorTo="var(--color-deco)"
                  borderWidth={2}
                />
                <CardContent className="flex flex-col items-center justify-center p-8 md:p-10">
                  {/* Logo */}
                  <div className="relative w-28 h-28 mb-6 rounded-full overflow-hidden ring-2 ring-avocado/30 group-hover:ring-avocado/50 transition-all">
                    <Image
                      src={org.logo}
                      alt={`${org.name} logo`}
                      fill
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-3"
                    />
                  </div>
                  {/* Name */}
                  <h3 className="text-xl font-bold text-rangitoto mb-2 group-hover:text-avocado transition-colors">
                    {org.name}
                  </h3>
                  {/* Description */}
                  <p className="text-sm text-rangitoto/70 mb-4 max-w-xs">
                    {org.desc}
                  </p>
                  {/* Stat */}
                  <div className="px-4 py-2 bg-avocado/10 rounded-full text-avocado font-semibold text-sm">
                    {org.stat}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
