'use client';

import { BorderBeam } from '@/components/magicui/border-beam';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';

const childVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
} as const;

const impacts = [
  {
    metric: '5+',
    description:
      'Countries served, including Ethiopia, Kenya, Burundi, Guatemala, and the U.S.',
  },
  {
    metric: '50+',
    description: 'Organizations empowered with capacity-building programs.',
  },
  {
    metric: '1000+',
    description:
      'Community members impacted through our partners’ enhanced programs.',
  },
];

export default function ImpactSection() {
  return (
    <motion.div variants={childVariants} className="mb-16">
      <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-rangitoto)] text-center mb-8">
        Our Impact
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {impacts.map((impact, index) => (
          <motion.div key={index} variants={childVariants} className="group">
            <Card className="relative bg-[var(--color-albescent-white)]/20 backdrop-blur-xl border border-[var(--color-lemon-grass)]/30 rounded-3xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-105">
              <BorderBeam
                size={150}
                duration={6}
                colorFrom="var(--color-lemon-grass)"
                colorTo="var(--color-avocado)"
              />
              <CardContent className="p-6 text-center">
                <h3 className="text-4xl font-bold text-[var(--color-avocado)] mb-4">
                  {impact.metric}
                </h3>
                <p className="text-base text-[var(--color-rangitoto)]/80">
                  {impact.description}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
