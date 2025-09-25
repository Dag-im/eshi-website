'use client';

import BlogFilters from '@/components/blogs/BlogFilters';
import BlogList from '@/components/blogs/BlogLIst';
import BlogSearch from '@/components/blogs/BlogSearch';
import { AuroraText } from '@/components/magicui/aurora-text';
import { Particles } from '@/components/magicui/particles';
import Pagination from '@/components/shared/Pagination';
import { Skeleton } from '@/components/ui/skeleton';
import { useBlogs } from '@/lib/api/useBlogs';
import { motion } from 'framer-motion';
import { useState } from 'react';

type Blog = {
  id: number;
  title: string;
  excerpt: string;
  slug: string;
  imageUrl: string;
  category: string;
  date: string;
};

const categories = [
  'All',
  'Capacity Building',
  'Project Management',
  'Monitoring & Evaluation',
  'Funding & Sustainability',
  'Case Studies',
];

const BLOGS_PER_PAGE = 6;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.3 },
  },
} as const;

export default function BlogsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch blogs using the useBlogs hook
  const { data, isLoading, error } = useBlogs({
    page: currentPage,
    limit: BLOGS_PER_PAGE,
    category: selectedCategory === 'All' ? undefined : selectedCategory,
  });

  // Extract blogs and total count from API response
  const blogsFromApi = data?.blogs || [];

  // Filter blogs based on search query (frontend filtering)
  const filteredBlogs = blogsFromApi.filter((blog: Blog) =>
    searchQuery
      ? blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
      : true
  );

  // Apply pagination to filtered blogs
  const totalBlogs = filteredBlogs.length;
  const totalPages = Math.ceil(totalBlogs / BLOGS_PER_PAGE);
  const paginatedBlogs = filteredBlogs.slice(
    (currentPage - 1) * BLOGS_PER_PAGE,
    currentPage * BLOGS_PER_PAGE
  );

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-indian-khaki via-albescent-white to-albescent-white">
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
        className="max-w-7xl mx-auto px-6 py-24 md:py-32 relative z-10"
      >
        {/* Heading */}
        <motion.div className="text-center mb-12">
          <AuroraText
            className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight"
            colors={[
              'var(--color-deco)',
              'var(--color-avocado)',
              'var(--color-rangitoto)',
            ]}
            speed={1.2}
          >
            ESHI Blogs
          </AuroraText>
        </motion.div>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <BlogSearch
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
          <BlogFilters
            categories={categories}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: BLOGS_PER_PAGE }).map((_, index) => (
              <div key={index} className="space-y-4">
                <Skeleton className="h-48 w-full rounded-xl bg-[var(--color-rangitoto)]/10" />
                <Skeleton className="h-6 w-3/4 rounded bg-[var(--color-rangitoto)]/10" />
                <Skeleton className="h-4 w-5/6 rounded bg-[var(--color-rangitoto)]/10" />
                <Skeleton className="h-4 w-1/2 rounded bg-[var(--color-rangitoto)]/10" />
              </div>
            ))}
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center text-red-500">
            Failed to load blogs. Please try again later.
          </div>
        )}

        {/* Blog List */}
        {!isLoading && !error && <BlogList blogs={paginatedBlogs} />}

        {/* Pagination */}
        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            setCurrentPage={setCurrentPage}
          />
        )}
      </motion.div>
    </section>
  );
}
