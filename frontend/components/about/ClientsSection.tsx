'use client';

import { BorderBeam } from '@/components/magicui/border-beam';
import { Marquee } from '@/components/magicui/marquee';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { usePresentations } from '@/lib/api/usePresentations';
import { motion } from 'framer-motion';
import { memo, useEffect } from 'react';

type Presentation = {
  _id: number;
  title: string;
  description: string;
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
} as const;

const childVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
} as const;

const PresentationCard = memo(
  ({ presentation }: { presentation: Presentation }) => (
    <Card
      className="relative bg-[var(--color-avocado)]/90 backdrop-blur-xl border border-[var(--color-lemon-grass)]/40 rounded-3xl p-6 w-[300px] md:w-[350px] hover:shadow-2xl hover:scale-105 transition-all duration-300"
      aria-label={`Presentation: ${presentation.title}`}
    >
      <BorderBeam
        size={150}
        duration={6}
        colorFrom="var(--color-indian-khaki)"
        colorTo="var(--color-lemon-grass)"
      />
      <CardContent>
        <h3 className="text-lg md:text-xl font-bold text-rangitoto mb-3 line-clamp-2">
          {presentation.title}
        </h3>
        <p className="text-sm md:text-base text-[var(--color-albescent-white)] leading-relaxed line-clamp-3">
          {presentation.description}
        </p>
      </CardContent>
    </Card>
  )
);

PresentationCard.displayName = 'PresentationCard';

export default function PresentationsSection() {
  const { data: presentations, isLoading, error } = usePresentations();

  // Debug API response
  useEffect(() => {
    console.log('Presentations data:', presentations);
  }, [presentations]);

  // Map API response to match Presentation type
  const mappedPresentations: Presentation[] = (presentations || []).map(
    (item: Presentation) => ({
      id: item._id,
      title: item.title,
      description: item.description || '',
    })
  );

  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="mb-20"
    >
      <motion.h2
        variants={childVariants}
        className="text-3xl md:text-4xl font-bold text-[var(--color-rangitoto)] mb-12 text-center"
      >
        Presentations & Workshops
      </motion.h2>
      <div className="relative overflow-hidden">
        {isLoading ? (
          <div className="flex gap-6">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="w-[300px] md:w-[350px] space-y-4 p-6 bg-[var(--color-avocado)]/90 backdrop-blur-xl border border-[var(--color-lemon-grass)]/40 rounded-3xl"
              >
                <Skeleton className="h-6 w-3/4 rounded bg-[var(--color-rangitoto)]/10" />
                <Skeleton className="h-4 w-5/6 rounded bg-[var(--color-rangitoto)]/10" />
                <Skeleton className="h-4 w-4/5 rounded bg-[var(--color-rangitoto)]/10" />
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center text-red-500">
            Failed to load presentations. Please try again later.
          </div>
        ) : !mappedPresentations || mappedPresentations.length === 0 ? (
          <div className="text-center text-[var(--color-rangitoto)]/70">
            No presentations available at the moment.
          </div>
        ) : (
          <Marquee pauseOnHover className="gap-6 [--duration:60s]" repeat={2}>
            {mappedPresentations.map((presentation) => (
              <PresentationCard
                key={presentation._id}
                presentation={presentation}
              />
            ))}
          </Marquee>
        )}
        <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-gray-50/50 to-transparent pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-gray-50/50 to-transparent pointer-events-none" />
      </div>
    </motion.section>
  );
}
