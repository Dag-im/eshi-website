'use client';

import BlogCard from '@/components/blogs/BlogCard';
import { AuroraText } from '@/components/magicui/aurora-text';

import { Particles } from '@/components/magicui/particles';
import { motion } from 'framer-motion';
import Link from 'next/link';

type Blog = {
  id: number;
  title: string;
  excerpt: string;
  slug: string;
  imageUrl: string;
};

type FeaturedBlogsProps = {
  blogs?: Blog[];
};

const defaultBlogs: Blog[] = [
  {
    id: 1,
    title: 'Empowering Local NGOs with Capacity Building',
    excerpt:
      'Discover how ESHI equips grassroots organizations with tools for sustainable impact.',
    slug: 'empowering-local-ngos',
    imageUrl:
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 2,
    title: 'Project Cycle Management: A Path to Success',
    excerpt:
      "Learn how ESHI's workshops transform project delivery for CBOs and CSOs.",
    slug: 'project-cycle-management',
    imageUrl:
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 3,
    title: 'Sustainable Funding for Grassroots Impact',
    excerpt: 'Explore strategies for NGOs to achieve financial independence.',
    slug: 'sustainable-funding-ngos',
    imageUrl:
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.3 },
  },
} as const;

export default function FeaturedBlogs({
  blogs = defaultBlogs,
}: FeaturedBlogsProps) {
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
        whileInView="visible"
        viewport={{ once: true }}
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
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
        >
          {blogs.map((blog) => (
            <BlogCard
              key={blog.id}
              id={blog.id}
              title={blog.title}
              excerpt={blog.excerpt}
              slug={blog.slug}
              imageUrl={blog.imageUrl}
            />
          ))}
        </motion.div>

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
