'use client';

import BlogCard from '@/components/blogs/BlogCard';

type Blog = {
  _id: number;
  title: string;
  excerpt: string;
  slug: string;
  imageUrl: string;
  category: string;
  date: string;
};

type BlogListProps = {
  blogs: Blog[];
};

export default function BlogList({ blogs }: BlogListProps) {
  if (blogs.length === 0) {
    return (
      <div className="text-center text-[var(--color-rangitoto)]/80 text-lg">
        No blogs found matching your criteria.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {blogs.map((blog) => (
        <BlogCard
          key={blog._id}
          _id={blog._id}
          title={blog.title}
          excerpt={blog.excerpt}
          slug={blog.slug}
          imageUrl={blog.imageUrl}
        />
      ))}
    </div>
  );
}
