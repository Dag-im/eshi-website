'use client';

import { AuroraText } from '@/components/magicui/aurora-text';
import { Particles } from '@/components/magicui/particles';
import { TypingAnimation } from '@/components/magicui/typing-animation';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { useBlog } from '@/lib/api/useBlogs';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

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

import * as React from 'react';

export default function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = React.use(params);
  const { data: blog, isLoading, error } = useBlog(slug);

  if (isLoading) {
    return (
      <section className="relative min-h-screen bg-gradient-to-br from-albescent-white via-indian-khaki to-albescent-white">
        <Particles
          className="absolute inset-0 z-0"
          quantity={100}
          ease={60}
          color="var(--color-lemon-grass)"
          refresh
        />
        <div className="max-w-4xl mx-auto px-6 py-24 md:py-32 relative z-10 space-y-8">
          {/* Back Button Skeleton */}
          <Skeleton className="h-10 w-32 rounded-full bg-[var(--color-rangitoto)]/10" />
          {/* Title Skeleton */}
          <Skeleton className="h-12 w-3/4 mx-auto rounded bg-[var(--color-rangitoto)]/10" />
          {/* Metadata Skeleton */}
          <div className="flex justify-center items-center gap-4">
            <Skeleton className="h-4 w-24 rounded bg-[var(--color-rangitoto)]/10" />
            <Skeleton className="h-4 w-4 rounded bg-[var(--color-rangitoto)]/10" />
            <Skeleton className="h-4 w-32 rounded bg-[var(--color-rangitoto)]/10" />
          </div>
          {/* Image Skeleton */}
          <Skeleton className="w-full h-64 md:h-96 rounded-3xl bg-[var(--color-rangitoto)]/10" />
          {/* Excerpt Skeleton */}
          <Skeleton className="h-6 w-5/6 mx-auto rounded bg-[var(--color-rangitoto)]/10" />
          {/* Content Skeleton */}
          <div className="space-y-4">
            <Skeleton className="h-4 w-full rounded bg-[var(--color-rangitoto)]/10" />
            <Skeleton className="h-4 w-5/6 rounded bg-[var(--color-rangitoto)]/10" />
            <Skeleton className="h-4 w-4/5 rounded bg-[var(--color-rangitoto)]/10" />
            <Skeleton className="h-4 w-3/4 rounded bg-[var(--color-rangitoto)]/10" />
          </div>
        </div>
      </section>
    );
  }

  if (error || !blog) {
    notFound();
  }

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-albescent-white via-indian-khaki to-albescent-white">
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
        className="max-w-4xl mx-auto px-6 py-24 md:py-32 relative z-10"
      >
        {/* Back Button */}
        <motion.div variants={childVariants} className="mb-8">
          <Button
            variant="ghost"
            asChild
            className="text-[var(--color-avocado)] hover:bg-[var(--color-avocado)]/10"
          >
            <Link href="/blogs">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Blogs
            </Link>
          </Button>
        </motion.div>

        {/* Title */}
        <motion.div variants={childVariants} className="text-center mb-8">
          <AuroraText
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-[var(--color-rangitoto)]"
            colors={[
              'var(--color-deco)',
              'var(--color-avocado)',
              'var(--color-rangitoto)',
            ]}
            speed={1.2}
          >
            {blog.title}
          </AuroraText>
        </motion.div>

        {/* Metadata */}
        <motion.div
          variants={childVariants}
          className="flex justify-center items-center gap-4 text-[var(--color-rangitoto)]/70 mb-8"
        >
          <span>{blog.date}</span>
          <span>•</span>
          <span>{blog.category}</span>
        </motion.div>

        {/* Featured Image */}
        <motion.div variants={childVariants} className="mb-12">
          <Image
            src={blog.imageUrl}
            alt={blog.title}
            width={800}
            height={400}
            className="w-full h-64 md:h-96 object-cover rounded-3xl shadow-xl"
          />
        </motion.div>

        {/* Excerpt with Typing Animation */}
        <motion.div variants={childVariants} className="mb-8">
          <TypingAnimation
            duration={50}
            className="text-lg md:text-xl text-[var(--color-rangitoto)]/80 italic"
          >
            {blog.excerpt}
          </TypingAnimation>
        </motion.div>

        {/* Content (Plain Text) */}
        <motion.div
          variants={childVariants}
          className="text-[var(--color-rangitoto)]/90 leading-relaxed whitespace-pre-wrap"
        >
          {blog.content}
        </motion.div>
      </motion.div>
    </section>
  );
}
