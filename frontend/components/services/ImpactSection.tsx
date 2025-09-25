'use client';

import { BorderBeam } from '@/components/magicui/border-beam';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useImpacts } from '@/lib/api/useImpact';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect } from 'react';

type Impact = {
  name: string;
  logo: string;
  desc: string;
  stat: string;
};

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
  const { data: impacts, isLoading, error } = useImpacts();

  // Debug API response
  useEffect(() => {
    console.log('Impacts data:', impacts);
  }, [impacts]);

  // Map API response to match Impact type (handle logo vs. logoUrl)
  const mappedImpacts: Impact[] = (impacts || []).map((item: Impact) => ({
    name: item.name,
    logo: item.logo || '/default-image.png', // Fallback image
    desc: item.desc,
    stat: item.stat,
  }));

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
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-4xl md:text-5xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-avocado to-deco"
        >
          Our Impact
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6, ease: 'easeOut' }}
          className="text-lg text-rangitoto/80 mb-16 max-w-3xl mx-auto leading-relaxed"
        >
          Partnering with grassroots organizations across Ethiopia to create
          sustainable change, amplify community voices, and drive measurable
          progress.
        </motion.p>

        {/* Loading State */}
        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="space-y-4">
                <Skeleton className="w-28 h-28 mx-auto rounded-full bg-[var(--color-rangitoto)]/10" />
                <Skeleton className="h-6 w-3/4 mx-auto rounded bg-[var(--color-rangitoto)]/10" />
                <Skeleton className="h-4 w-5/6 mx-auto rounded bg-[var(--color-rangitoto)]/10" />
                <Skeleton className="h-4 w-1/2 mx-auto rounded bg-[var(--color-rangitoto)]/10" />
              </div>
            ))}
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center text-red-500">
            Failed to load impacts. Please try again later.
          </div>
        )}

        {/* No Impacts Fallback */}
        {!isLoading &&
          !error &&
          (!mappedImpacts || mappedImpacts.length === 0) && (
            <div className="text-center text-rangitoto/70">
              No impacts available at the moment.
            </div>
          )}

        {/* Cards */}
        {!isLoading && !error && mappedImpacts.length > 0 && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-3 gap-10"
          >
            {mappedImpacts.map((org: Impact, i: number) => (
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
        )}
      </div>
    </section>
  );
}
