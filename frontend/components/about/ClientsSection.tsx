'use client';

import { BorderBeam } from '@/components/magicui/border-beam';
import { Marquee } from '@/components/magicui/marquee';
import { Card, CardContent } from '@/components/ui/card';
import { resolveAssetUrl } from '@/lib/utils';
import { Presentation } from '@/types/presentaion';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { memo } from 'react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
} as const;

const childVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
} as const;

const PresentationCard = memo(
  ({ presentation }: { presentation: Presentation }) => {
    const imageSrc = presentation.imageUrl ? resolveAssetUrl(presentation.imageUrl) : '';

    return (
      <Card
        className="relative w-[300px] md:w-[350px] min-h-[340px] overflow-hidden border border-[var(--color-lemon-grass)]/40 rounded-3xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-300"
        aria-label={`Presentation: ${presentation.title}`}
      >
        <div className="absolute inset-0 bg-[linear-gradient(160deg,rgba(101,129,45,0.95)_0%,rgba(45,66,28,0.96)_100%)]" />
        {imageSrc ? (
          <div className="absolute inset-0">
            <Image
              src={imageSrc}
              alt={presentation.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 300px, 350px"
            />
          </div>
        ) : null}
        <div className="absolute inset-0 bg-gradient-to-b from-black/15 via-black/45 to-[rgba(24,38,18,0.92)]" />
        <BorderBeam
          size={150}
          duration={6}
          colorFrom="var(--color-indian-khaki)"
          colorTo="var(--color-lemon-grass)"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(216,230,91,0.22),transparent_38%)]" />
        <CardContent className="relative z-10 flex min-h-[340px] flex-col justify-end p-6">
          <div className="mb-4 inline-flex w-fit items-center rounded-full border border-white/25 bg-black/20 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--color-indian-khaki)] backdrop-blur-sm">
            Presentation
          </div>
          <h3 className="text-lg md:text-xl font-bold text-white mb-3 line-clamp-2">
            {presentation.title}
          </h3>
          <p className="text-sm md:text-base text-white/90 leading-relaxed line-clamp-4">
            {presentation.description}
          </p>
        </CardContent>
      </Card>
    );
  }
);

PresentationCard.displayName = 'PresentationCard';

interface PresentationsSectionProps {
  presentations: Presentation[];
}

export default function PresentationsSection({ presentations }: PresentationsSectionProps) {
  const mappedPresentations: Presentation[] = presentations.map((item) => ({
    id: item.id,
    title: item.title,
    description: item.description || '',
    imageUrl: item.imageUrl || null,
  }));

  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="mb-20"
      id="presentations"
    >
      <motion.h2
        variants={childVariants}
        className="text-3xl md:text-4xl font-bold text-[var(--color-rangitoto)] mb-12 text-center"
      >
        Presentations & Workshops
      </motion.h2>
      <div className="relative overflow-hidden">
        {mappedPresentations.length === 0 ? (
          <div className="text-center text-[var(--color-rangitoto)]/70">
            No presentations available at the moment.
          </div>
        ) : (
          <Marquee pauseOnHover className="gap-6 [--duration:60s]" repeat={2}>
            {mappedPresentations.map((presentation) => (
              <PresentationCard key={presentation.id} presentation={presentation} />
            ))}
          </Marquee>
        )}
        <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-gray-50/50 to-transparent pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-gray-50/50 to-transparent pointer-events-none" />
      </div>
    </motion.section>
  );
}
