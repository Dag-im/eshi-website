'use client';

import { AuroraText } from '@/components/magicui/aurora-text';
import { BorderBeam } from '@/components/magicui/border-beam';
import { OrbitingCircles } from '@/components/magicui/orbiting-circles';
import { Particles } from '@/components/magicui/particles';
import { Card } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { Globe as GlobeIcon, Heart, Sprout, Users } from 'lucide-react';

const aboutParagraphs = [
  'ESHI the consultancy came together over more than a decade of collaboration between its three principals working together with grassroots women’s microsavings groups in Ethiopia, experiencing the efficacy of knowledge sharing and capacity building.',
  'ESHI believes in prioritizing the small and local NGOs, CBOs and CSOs (non-governmental, community-based, and civil society organizations), who are better situated to deliver social services to the most in-need people, which not only improves impact to stakeholders but makes these invaluable organizations viable in the long term. Without dependence on external entities.',
  'International aid and development NGOs and donors like to say that they ultimately wish “to put themselves out of business.” They also say that they would like to fund local orgs but insist that they are not ready.',
  'We would like to make that statement real with true capacity building for local grassroots organizations.',
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.3, delayChildren: 0.5 },
  },
} as const;

const childVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' as const },
  },
} as const;

export default function AboutEshi() {
  return (
    <section className="relative py-32 overflow-hidden bg-transparent">
      {/* Particles */}
      <Particles
        className="absolute inset-0 z-0"
        quantity={120}
        ease={70}
        color="var(--color-indian-khaki)"
        refresh
      />

      <motion.div
        initial="hidden"
        whileInView="visible"
        variants={containerVariants}
        viewport={{ once: true }}
        className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col lg:flex-row items-center lg:items-start gap-12"
      >
        {/* Left orbit */}
        <motion.div
          variants={childVariants}
          className="flex justify-center w-full lg:w-1/3"
        >
          <div className="relative flex h-96 w-96 lg:h-[450px] lg:w-[450px] items-center justify-center">
            <OrbitingCircles iconSize={40} radius={180}>
              <GlobeIcon />
              <Heart />
              <Sprout />
              <Users />
            </OrbitingCircles>
            <OrbitingCircles iconSize={30} radius={140} reverse speed={2}>
              <GlobeIcon />
              <Heart />
              <Sprout />
              <Users />
            </OrbitingCircles>

            {/* Aurora text inside orbit */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1 }}
              className="absolute font-extrabold text-3xl md:text-4xl text-center text-[var(--color-rangitoto)]"
            >
              <AuroraText
                colors={[
                  'var(--color-deco)',
                  'var(--color-avocado)',
                  'var(--color-rangitoto)',
                ]}
                speed={1}
              >
                ABOUT ESHI
              </AuroraText>
            </motion.div>
          </div>
        </motion.div>

        {/* Right card */}
        <motion.div
          variants={childVariants}
          className="w-full lg:w-2/3 flex justify-center"
        >
          <Card className="relative p-8 md:p-12 bg-avocado/20 backdrop-blur-3xl border border-[var(--color-lemon-grass)]/30 rounded-3xl shadow-2xl overflow-hidden w-full">
            <BorderBeam
              size={350}
              duration={12}
              colorFrom="var(--color-indian-khaki)"
              colorTo="var(--color-deco)"
            />
            {aboutParagraphs.map((para, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: i * 0.3 }}
                viewport={{ once: true }}
                className="text-sm leading-relaxed text-[var(--color-rangitoto)] mb-6 last:mb-0"
              >
                {para}
              </motion.p>
            ))}
          </Card>
        </motion.div>
      </motion.div>
    </section>
  );
}
