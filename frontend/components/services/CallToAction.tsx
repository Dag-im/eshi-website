'use client';

import { Button } from '@/components/ui/button';
import { motion, useInView } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useRef } from 'react';

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

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1 },
};

export default function CallToAction() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="relative py-24 px-6 bg-gradient-to-br from-avocado/10 via-albescent-white/50 to-deco/10 overflow-hidden text-center">
      {/* Subtle background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-avocado/5 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-10 right-1/4 w-[600px] h-[600px] bg-deco/5 rounded-full blur-3xl animate-pulse-slow delay-1000" />
      </div>

      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        className="max-w-4xl mx-auto relative z-10"
      >
        <motion.h2
          variants={itemVariants}
          className="text-4xl md:text-5xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-avocado to-deco"
        >
          Ready to Strengthen Your Organization?
        </motion.h2>
        <motion.p
          variants={itemVariants}
          className="text-lg text-rangitoto/80 mb-10 max-w-2xl mx-auto leading-relaxed"
        >
          Partner with us today to unlock sustainable growth, amplify your
          impact, and foster lasting change in your community.
        </motion.p>
        <motion.div variants={itemVariants}>
          <Button
            size="lg"
            className="rounded-full bg-rangitoto text-albescent-white hover:bg-avocado hover:scale-105 transition-all duration-300 px-8 py-6 shadow-lg hover:shadow-xl"
          >
            Get in Touch <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
}
