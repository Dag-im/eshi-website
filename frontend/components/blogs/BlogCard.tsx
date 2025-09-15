'use client';

import { BorderBeam } from '@/components/magicui/border-beam';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

type BlogCardProps = {
  id: number;
  title: string;
  excerpt: string;
  slug: string;
  imageUrl: string;
  className?: string;
};

const childVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.7, ease: 'easeOut' },
  },
} as const;

export default function BlogCard({
  title,
  excerpt,
  slug,
  imageUrl,
  className,
}: BlogCardProps) {
  return (
    <motion.div variants={childVariants} className={cn('group', className)}>
      <Card className="relative h-full bg-[var(--color-deco)]/50 backdrop-blur-xl border border-[var(--color-lemon-grass)]/30 rounded-3xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-105">
        <BorderBeam
          size={150}
          duration={6}
          colorFrom="var(--color-indian-khaki)"
          colorTo="var(--color-deco)"
        />
        {/* Image with avocado overlay */}
        <div className="relative w-full h-48 md:h-56 overflow-hidden">
          <Image
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover rounded-t-3xl transition-transform duration-300 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-[var(--color-avocado)]/30 transition-opacity duration-300 group-hover:opacity-60" />
        </div>
        <CardHeader className="pb-4">
          <CardTitle className="text-xl md:text-2xl font-bold text-[var(--color-rangitoto)] group-hover:text-[var(--color-avocado)] transition-colors">
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-base text-[var(--color-rangitoto)]/80 mb-6">
            {excerpt}
          </p>
          <Link
            href={`/blogs/${slug}`}
            className="inline-block text-[var(--color-avocado)] font-medium hover:underline transition-colors group-hover:text-rangitoto"
          >
            Read more →
          </Link>
        </CardContent>
      </Card>
    </motion.div>
  );
}
