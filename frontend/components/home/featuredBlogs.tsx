'use client';

import BlogCard from '@/components/blogs/BlogCard';
import { AuroraText } from '@/components/magicui/aurora-text';
import { Particles } from '@/components/magicui/particles';
import { Skeleton } from '@/components/ui/skeleton';
import { useBlogs } from '@/lib/api/useBlogs';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useEffect } from 'react';

type Blog = {
  _id: number | string;
  title: string;
  excerpt: string;
  slug: string;
  imageUrl: string;
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.3 },
  },
} as const;

export default function FeaturedBlogs() {
  const { data, isLoading, error } = useBlogs({ featured: true, limit: 3 });

  // Extract blogs safely
  const blogsFromApi = data?.blogs || [];

  // Debug API response
  useEffect(() => {
    console.log('Featured Blogs data:', data);
  }, [data]);

  // Map API response to match Blog type
  const mappedBlogs: Blog[] = blogsFromApi.map((item: Blog) => ({
    id: item._id,
    title: item.title,
    excerpt: item.excerpt || '',
    slug: item.slug,
    imageUrl: item.imageUrl || '/default-image.png',
  }));

  return (
    <section className="relative py-24 md:py-32 overflow-hidden bg-transparent">
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
        className="max-w-7xl mx-auto px-6 relative z-10"
      >
        {/* Heading */}
        <motion.div variants={containerVariants} className="text-center mb-16">
          <AuroraText
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight"
            colors={[
              'var(--color-deco)',
              'var(--color-avocado)',
              'var(--color-rangitoto)',
            ]}
            speed={1.2}
          >
            Featured Blogs
          </AuroraText>
        </motion.div>

        {/* Blogs grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="space-y-4">
                <Skeleton className="w-full h-48 rounded-3xl bg-[var(--color-rangitoto)]/10" />
                <Skeleton className="h-6 w-3/4 rounded bg-[var(--color-rangitoto)]/10" />
                <Skeleton className="h-4 w-5/6 rounded bg-[var(--color-rangitoto)]/10" />
                <Skeleton className="h-4 w-1/2 rounded bg-[var(--color-rangitoto)]/10" />
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center text-red-500 col-span-full">
            Failed to load featured blogs. Please try again later.
          </div>
        ) : mappedBlogs.length === 0 ? (
          <div className="text-center text-[var(--color-rangitoto)]/70 col-span-full">
            No featured blogs available at the moment.
          </div>
        ) : (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
          >
            {mappedBlogs.map((blog) => (
              <BlogCard key={blog._id} {...blog} />
            ))}
          </motion.div>
        )}

        {/* View All button */}
        <motion.div variants={containerVariants} className="mt-12 text-center">
          <Link
            href="/blogs"
            className="inline-block px-8 py-4 rounded-full bg-[var(--color-avocado)] text-[var(--color-albescent-white)] font-medium text-lg shadow-lg hover:bg-[var(--color-deco)] transition-all duration-300 hover:shadow-xl hover:scale-105"
          >
            View All Blogs
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
