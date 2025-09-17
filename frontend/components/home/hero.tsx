'use client';

import { AuroraText } from '@/components/magicui/aurora-text';
import { InteractiveHoverButton } from '@/components/magicui/interactive-hover-button';
import { PulsatingButton } from '@/components/magicui/pulsating-button';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

interface HeroProps {
  bgImage: {
    src: string;
    alt: string;
  };
}

export default function Hero({ bgImage }: HeroProps) {
  return (
    <section className="relative w-full h-screen pt-10">
      {/* Next.js Image background */}
      <Image
        src={bgImage.src}
        alt={bgImage.alt}
        fill
        className="object-cover object-center z-0"
        priority
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-rangitoto/30 z-10"></div>

      {/* Content */}
      <div className="relative z-20 flex flex-col items-center justify-center h-full text-center px-4">
        {/* Animated title */}
        <AuroraText
          className="text-5xl md:text-7xl font-bold mb-4"
          colors={[
            'var(--color-albescent-white)',
            'var(--color-deco)',
            'var(--color-indian-khaki)',
          ]}
          speed={1}
        >
          ESHI Consulting
        </AuroraText>

        {/* Subtitle */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-3xl md:text-5xl font-semibold mb-6 text-indian-khaki"
        >
          Building Capacity for Local Grassroots Organizations
        </motion.h2>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="max-w-3xl text-albescent-white mb-8"
        >
          ESHI has two meanings: E.S.H.I. began as an acronym for Ethiopian
          Self-Help Initiative, but as our intention was always to work
          globally, we now respond to Eshi, an everyday Ethiopian expression
          that means, “ok, cool.”
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <Link href="/services">
            <PulsatingButton
              pulseColor="var(--color-deco)"
              duration="2s"
              className="bg-avocado text-albescent-white font-semibold py-3 px-6 rounded-lg hover:bg-rangitoto transition-colors"
            >
              Discover Our Services
            </PulsatingButton>
          </Link>
          <Link href="/contact">
            <InteractiveHoverButton className="bg-transparent border-2 border-albescent-white text-albescent-white font-semibold py-3 px-6 rounded-lg hover:bg-albescent-white hover:text-rangitoto transition-all">
              Get in Touch
            </InteractiveHoverButton>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
