'use client';

import { AuroraText } from '@/components/magicui/aurora-text';

import { Particles } from '@/components/magicui/particles';
import { TypingAnimation } from '@/components/magicui/typing-animation';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

type Blog = {
  id: number;
  title: string;
  excerpt: string;
  content: string; // Changed from fullContent to content
  slug: string;
  imageUrl: string;
  category: string;
  date: string;
  relatedBlogs: number[];
};

const mockBlogs: Blog[] = [
  {
    id: 1,
    title: 'Empowering Local NGOs with Capacity Building',
    excerpt:
      'Discover how ESHI equips grassroots organizations with tools for sustainable impact.',
    content: `
      <p> ESHI Consultancy believes that building capacity for local Community-Based Organizations, Civil Society Organizations (CSOs), and small NGOs gives these grassroots organizations the program and administrative tools and methodology they need to continue delivering excellent social services to the most-needy target populations, as well as becoming self-sufficient in applying for grants, and fully and effectively implementing and administering its programs.</p>
      <p>We equip CBOs and NGOs with internal capacity to move forward and thrive without any external entity, such that they are able on their own to solicit a broader donor pool and gain more sustainable funding.</p>
      <h2>Our Approach</h2>
      <p>We build organizational capacity through two phases:</p>
      <ul>
        <li>Four-month workshop series that covers a full project cycle. The first few workshops are in person, subsequent ones are via Zoom.</li>
        <li>Eight additional months of virtual and in-person follow-up, in which we ensure that the organization has embedded and is using Project Cycle Management principles and protocols into their everyday work.</li>
      </ul>
      <p>Many of the world’s most marginalized people have tremendous needs that are unmet by traditional government services. Fortunately local, grassroots organizations step in to deliver high quality social services to these residents. Many (most?) of these same organizations, however, while excellent at implementation, frequently lack necessary administrative and technical skills required to receive sustained funding, and face unending financial crises.</p>
      <p><strong>We have worked with many such small organizations in Ethiopia, Kenya, Burundi, Guatemala, and the U.S.</strong> that are highly effective and deserve funding. Yet they are mostly off the grid of significant donors, and mostly rely on charitable and individual giving.</p>
      <h2>Challenges and Solutions</h2>
      <p>Many fit a profile: A charismatic local leader identifies a great community need, and through blood, sweat, and tears; small donations and personal resources, implements a project. Based on a compelling mission, and positive word of mouth, a small, short-term grant may follow for the Community-Based Organization, but that funding quickly ends, and renewed support is not forthcoming.</p>
      <p>Donors tell them they hear great things about their work, but the organization needs to “show their results,” with “evidence-based data,” and even asks for a “logical framework.”</p>
      <p>We teach organizations to:</p>
      <ul>
        <li>Design a logical framework</li>
        <li>Collect data to show results and success with evidence-based data</li>
        <li>Improve program delivery through Project Cycle Management</li>
      </ul>
      <p><em>Note: In a production environment, sanitize this HTML content using a library like DOMPurify to prevent XSS attacks.</em></p>
    `,
    slug: 'empowering-local-ngos',
    imageUrl:
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=800&auto=format&fit=crop',
    category: 'Capacity Building',
    date: '2025-08-15',
    relatedBlogs: [2, 3, 6],
  },
  {
    id: 2,
    title: 'Project Cycle Management: A Path to Success',
    excerpt:
      "Learn how ESHI's workshops transform project delivery for CBOs and CSOs.",
    content: `
      <p>ESHI offers capacity building for small, community non-profits, NGOs, civil society organizations; including Project Cycle Management and Monitoring and Evaluation for programs and projects, and funding.</p>
      <p>We build organizational capacity through on-site trainings and virtual (Zoom) follow-up. While we believe in the superiority of internal capacity rather than external services, donors sometimes require an external consultant. In such cases, we work to build internal organizational capacity within our role as external consultants.</p>
      <h2>Why Localization Matters</h2>
      <p>Local, grassroots organizations are better suited than international NGOs to deliver programs to local stakeholders, particularly marginalized populations. Localization organizations are trustworthy and excellent service providers to most-needy target populations.</p>
      <p>Local organizations are more cost-efficient delivering services than their larger national and international counterparts.</p>
      <p><strong>Many international aid and development donors</strong> who say they would like to directly fund local organizations but cite “lack of capacity” as the reason they cannot fund local orgs. Often the real obstacle is interlinked domestic political and economic bureaucratic requirements and concerns.</p>
      <p>For those agencies and donors who sincerely believe lack of capacity is the issue blocking direct local funding, a relatively simple solution exists: Fund a capacity building program such as ESHI’s.</p>
      <p><em>Note: In a production environment, sanitize this HTML content using a library like DOMPurify to prevent XSS attacks.</em></p>
    `,
    slug: 'project-cycle-management',
    imageUrl:
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=800&auto=format&fit=crop',
    category: 'Project Management',
    date: '2025-07-20',
    relatedBlogs: [1, 4, 9],
  },
  {
    id: 3,
    title: 'Sustainable Funding for Grassroots Impact',
    excerpt: 'Explore strategies for NGOs to achieve financial independence.',
    content: `
      <p>The world’s most marginalized and underserved people have tremendous needs that are unmet by traditional government services. Fortunately, many local grassroots organizations step in to deliver high quality social services to these populations.</p>
      <p>Many (most?) of these same organizations, however, while excellent at implementation, frequently lack necessary administrative and technical skills required to receive sustained funding, and face unending financial crises. ESHI seeks to address this by providing comprehensive capacity building.</p>
      <h2>Our Work</h2>
      <p>We have worked with many such small organizations in Ethiopia, Kenya, Burundi, Guatemala, and the U.S. that are highly effective and deserve funding. Yet they are mostly off the grid of significant donors, and mostly rely on charitable and individual giving.</p>
      <p>The international donor community has never matched professed commitments to fund capacity building of national and local organizations.</p>
      <p><strong>Many fit a profile:</strong> A charismatic local leader identifies a great community need, and through blood, sweat, and tears; small donations and personal resources, implements a project. Based on a compelling mission, and positive word of mouth, a small, short-term grant may follow for the Community-Based Organization, but that funding quickly ends, and renewed support is not forthcoming.</p>
      <p><em>Note: In a production environment, sanitize this HTML content using a library like DOMPurify to prevent XSS attacks.</em></p>
    `,
    slug: 'sustainable-funding-ngos',
    imageUrl:
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop',
    category: 'Funding & Sustainability',
    date: '2025-06-10',
    relatedBlogs: [1, 8, 6],
  },
  // Add more blogs as needed
];

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
  const blog = mockBlogs.find((b) => b.slug === slug);

  if (!blog) {
    notFound();
  }

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-albescent-white via-indian-khaki  to-albescent-white">
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

        {/* Content (Rich Text) */}
        <motion.div
          variants={childVariants}
          className="prose prose-invert max-w-none text-[var(--color-rangitoto)]/90 leading-relaxed"
          // In production, sanitize HTML with DOMPurify or sanitize-html to prevent XSS
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />
      </motion.div>
    </section>
  );
}
