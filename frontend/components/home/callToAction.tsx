'use client';

import { AuroraText } from '@/components/magicui/aurora-text';
import { BorderBeam } from '@/components/magicui/border-beam';

import { Particles } from '@/components/magicui/particles';
import { PulsatingButton } from '@/components/magicui/pulsating-button';
import { Card } from '@/components/ui/card';
import { motion } from 'framer-motion';
import Link from 'next/link';

type CTAProps = {
  title?: string;
  description?: string;
  buttonText?: string;
  contactUrl?: string;
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.3, delayChildren: 0.2 },
  },
} as const;

const childVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: 'easeOut' },
  },
} as const;

export default function CTA({
  title = 'Partner with ESHI Today',
  description = 'Join us in empowering grassroots NGOs, CBOs, and CSOs to create sustainable impact. Contact us to start building capacity for lasting change.',
  buttonText = 'Get in Touch',
  contactUrl = '/contact',
}: CTAProps) {
  return (
    <section
      id="contact"
      className="relative pb-24 pt-12 overflow-hidden bg-transparent"
    >
      {/* Background effects */}
      <Particles
        className="absolute inset-0 z-0"
        quantity={120}
        ease={60}
        color="var(--color-lemon-grass)"
        refresh
      />

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
        className="max-w-4xl mx-auto px-6 relative z-10"
      >
        <Card className="relative bg-gradient-to-br from-[var(--color-rangitoto)]/20 via-[var(--color-avocado)]/20 to-[var(--color-rangitoto)]/20 backdrop-blur-xs border border-[var(--color-lemon-grass)]/30 rounded-3xl shadow-2xl overflow-hidden">
          <BorderBeam
            size={300}
            duration={10}
            colorFrom="var(--color-lemon-grass)"
            colorTo="var(--color-avocado)"
          />
          <div className="p-8 md:p-12 flex flex-col items-center text-center gap-6">
            {/* Heading */}
            <motion.div variants={childVariants}>
              <AuroraText
                className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-[var(--color-rangitoto)]"
                colors={[
                  'var(--color-avocado)',
                  'var(--color-lemon-grass)',
                  'var(--color-rangitoto)',
                ]}
                speed={1}
              >
                {title}
              </AuroraText>
            </motion.div>

            {/* Description */}
            <motion.p
              variants={childVariants}
              className="text-base md:text-lg text-[var(--color-rangitoto)]/80 max-w-2xl"
            >
              {description}
            </motion.p>

            {/* CTA Button */}
            <motion.div
              variants={childVariants}
              whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
              whileTap={{ scale: 0.95 }}
            >
              <PulsatingButton
                pulseColor="var(--color-avocado)"
                className="relative px-8 py-4 rounded-full bg-[var(--color-deco)] text-[var(--color-rangitoto)] text-lg font-medium shadow-lg hover:bg-[var(--color-deco)] transition-all duration-300 hover:shadow-xl"
              >
                <Link href={contactUrl}>{buttonText}</Link>
              </PulsatingButton>
            </motion.div>
          </div>
        </Card>
      </motion.div>
    </section>
  );
}
