'use client';

import BlogFilters from '@/components/blogs/BlogFilters';
import BlogList from '@/components/blogs/BlogLIst';
import BlogSearch from '@/components/blogs/BlogSearch';
import { AuroraText } from '@/components/magicui/aurora-text';
import { Meteors } from '@/components/magicui/meteors';
import { Particles } from '@/components/magicui/particles';
import Pagination from '@/components/shared/Pagination';
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

const mockBlogs: Blog[] = [
  {
    id: 1,
    title: 'Empowering Local NGOs with Capacity Building',
    excerpt:
      'Discover how ESHI equips grassroots organizations with tools for sustainable impact.',
    slug: 'empowering-local-ngos',
    imageUrl:
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=800&auto=format&fit=crop',
    category: 'Capacity Building',
    date: '2025-08-15',
  },
  {
    id: 2,
    title: 'Project Cycle Management: A Path to Success',
    excerpt:
      "Learn how ESHI's workshops transform project delivery for CBOs and CSOs.",
    slug: 'project-cycle-management',
    imageUrl:
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=800&auto=format&fit=crop',
    category: 'Project Management',
    date: '2025-07-20',
  },
  {
    id: 3,
    title: 'Sustainable Funding for Grassroots Impact',
    excerpt: 'Explore strategies for NGOs to achieve financial independence.',
    slug: 'sustainable-funding-ngos',
    imageUrl:
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop',
    category: 'Funding & Sustainability',
    date: '2025-06-10',
  },
  {
    id: 4,
    title: 'Monitoring and Evaluation Best Practices',
    excerpt: 'Insights into effective M&E protocols for local organizations.',
    slug: 'monitoring-evaluation-best-practices',
    imageUrl:
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop',
    category: 'Monitoring & Evaluation',
    date: '2025-05-05',
  },
  {
    id: 5,
    title: "Case Study: Ethiopia Women's Microsavings Groups",
    excerpt: 'A deep dive into successful capacity building in Ethiopia.',
    slug: 'case-study-ethiopia-microsavings',
    imageUrl:
      'https://images.unsplash.com/photo-1542810634-71277d95dcbb?q=80&w=800&auto=format&fit=crop',
    category: 'Case Studies',
    date: '2025-04-15',
  },
  {
    id: 6,
    title: 'Localization in International Aid',
    excerpt: 'Why funding local orgs directly leads to better outcomes.',
    slug: 'localization-international-aid',
    imageUrl:
      'https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=800&auto=format&fit=crop',
    category: 'Capacity Building',
    date: '2025-03-20',
  },
  {
    id: 7,
    title: 'Data Collection and Analysis for NGOs',
    excerpt: 'Tools and methods for evidence-based reporting.',
    slug: 'data-collection-analysis-ngos',
    imageUrl:
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=800&auto=format&fit=crop',
    category: 'Monitoring & Evaluation',
    date: '2025-02-10',
  },
  {
    id: 8,
    title: 'Overcoming Financial Crises in Grassroots Orgs',
    excerpt: 'Strategies to build resilient funding models.',
    slug: 'overcoming-financial-crises-grassroots',
    imageUrl:
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=800&auto=format&fit=crop',
    category: 'Funding & Sustainability',
    date: '2025-01-05',
  },
  {
    id: 9,
    title: 'Virtual Workshops for Global Impact',
    excerpt: 'How Zoom-based follow-ups enhance project management.',
    slug: 'virtual-workshops-global-impact',
    imageUrl:
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=800&auto=format&fit=crop',
    category: 'Project Management',
    date: '2024-12-15',
  },
  {
    id: 10,
    title: 'Case Study: Kenya Rescue Centre',
    excerpt: 'Success stories from Starkid School and Rescue Centre.',
    slug: 'case-study-kenya-rescue-centre',
    imageUrl:
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=800&auto=format&fit=crop',
    category: 'Case Studies',
    date: '2024-11-20',
  },
  // Add more if needed
];

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

  // Filter blogs
  const filteredBlogs = mockBlogs.filter((blog) => {
    const matchesSearch =
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === 'All' || blog.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Pagination
  const totalPages = Math.ceil(filteredBlogs.length / BLOGS_PER_PAGE);
  const paginatedBlogs = filteredBlogs.slice(
    (currentPage - 1) * BLOGS_PER_PAGE,
    currentPage * BLOGS_PER_PAGE
  );

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-indian-khaki via-albescent-white  to-albescent-white">
      {/* Background effects */}
      <Particles
        className="absolute inset-0 z-0"
        quantity={100}
        ease={60}
        color="var(--color-lemon-grass)"
        refresh
      />
      <Meteors number={15} className="absolute inset-0 z-0" />

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

        {/* Blog List */}
        <BlogList blogs={paginatedBlogs} />

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
