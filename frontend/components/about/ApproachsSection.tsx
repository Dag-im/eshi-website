'use client';

import { BorderBeam } from '@/components/magicui/border-beam';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { BarChart, BookOpen, Globe } from 'lucide-react';

const childVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
} as const;

const approaches = [
  {
    title: 'Four-Month Workshop Series',
    description:
      'A comprehensive in-person and virtual workshop series covering the full project cycle, equipping organizations with Project Cycle Management principles.',
    icon: (
      <BookOpen className="w-12 h-12 text-[var(--color-albescent-white)]" />
    ),
    bgColor: 'bg-[var(--color-avocado)]',
  },
  {
    title: 'Evidence-Based Data Training',
    description:
      'Teaching organizations to design logical frameworks, collect data, and demonstrate results to secure sustainable funding.',
    icon: <Globe className="w-12 h-12 text-[var(--color-albescent-white)]" />,
    bgColor: 'bg-[var(--color-indian-khaki)]',
  },
  {
    title: 'Eight-Month Follow-Up',
    description:
      'Ongoing virtual and in-person support to ensure organizations embed and apply capacity-building skills in their daily operations.',
    icon: (
      <BarChart className="w-12 h-12 text-[var(--color-albescent-white)]" />
    ),
    bgColor: 'bg-[var(--color-deco)]',
  },
];

export default function ApproachSection() {
  return (
    <motion.div variants={childVariants} className="mb-16">
      <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-rangitoto)] text-center mb-12">
        Our Approach
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {approaches.map((approach, index) => (
          <motion.div key={index} variants={childVariants} className="group">
            <Card
              className={`relative ${approach.bgColor} border border-[var(--color-lemon-grass)]/50 rounded-3xl shadow-xl overflow-hidden transition-all duration-500 hover:shadow-[0_0_20px_var(--color-lemon-grass)]`}
            >
              <BorderBeam
                size={200}
                duration={8}
                colorFrom="var(--color-indian-khaki)"
                colorTo="var(--color-deco)"
              />
              <CardHeader className="flex flex-col items-center">
                <div className="mb-4 p-3 rounded-full bg-[var(--color-albescent-white)]/20 group-hover:bg-[var(--color-albescent-white)]/30 transition-colors">
                  {approach.icon}
                </div>
                <CardTitle className="text-xl md:text-2xl font-bold text-[var(--color-albescent-white)] group-hover:text-[var(--color-albescent-white)] transition-colors">
                  {approach.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-base text-[var(--color-albescent-white)]/90 group-hover:text-[var(--color-albescent-white)] transition-colors">
                  {approach.description}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
