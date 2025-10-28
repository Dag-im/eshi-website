'use client';

import ApproachsSection from '@/components/about/ApproachsSection';
import BentoGridSection from '@/components/about/BentoGridSection';
import ClientsSection from '@/components/about/ClientsSection';
import TeamSection from '@/components/about/TeamSection';
import { AuroraText } from '@/components/magicui/aurora-text';
import { Particles } from '@/components/magicui/particles';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.3 },
  },
} as const;

const childVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
} as const;

export default function AboutPage() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-green-50/50 pt-12">
      {/* Background effects */}
      <Particles
        className="absolute inset-0 z-0"
        quantity={100}
        ease={60}
        color="var(--color-lemon-grass)"
        refresh
      />

      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="max-w-7xl mx-auto px-6 py-24 md:py-32 relative z-10"
      >
        {/* Hero Section */}
        <motion.div variants={childVariants} className="text-center mb-16">
          <AuroraText
            className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-[var(--color-rangitoto)]"
            colors={[
              'var(--color-deco)',
              'var(--color-avocado)',
              'var(--color-rangitoto)',
            ]}
            speed={1.2}
          >
            About ESHI Consultancy
          </AuroraText>
          <p className="mt-6 text-xl text-[var(--color-rangitoto)]/80 max-w-3xl mx-auto">
            ESHI Consultancy empowers grassroots NGOs, CBOs, and CSOs through
            capacity building, enabling sustainable impact and financial
            independence. Our mission is to equip local organizations with the
            tools and expertise needed to thrive in the global development
            landscape.
          </p>
        </motion.div>

        <BentoGridSection />

        {/* Team Section */}
        <TeamSection />

        {/* Clients Section */}
        <ClientsSection />

        {/* Presentations Section */}
        <ApproachsSection />
      </motion.div>
    </section>
  );
}
