'use client';

import { AdminTable } from '@/components/admin/AdminTable';
import { useBlogs, useDeleteBlog } from '@/lib/api/useBlogs';
import { useRouter } from 'next/navigation';

interface Blog {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  content: string;
  featured: boolean;
  date: string;
  imageUrl?: string;
}

const blogColumns = [
  { key: 'title', label: 'Title' },
  {
    key: 'excerpt',
    label: 'Excerpt',
    render: (item: Blog) => item.excerpt.slice(0, 50) + '...',
  },
  { key: 'category', label: 'Category' },
  {
    key: 'date',
    label: 'Date',
    render: (item: Blog) => new Date(item.date).toLocaleDateString(),
  },
  {
    key: 'featured',
    label: 'Featured',
    render: (item: Blog) => (item.featured ? 'Yes' : 'No'),
  },
];

export default function BlogsPage() {
  const router = useRouter();
  const { data: blogs, isLoading } = useBlogs();

  console.log('blogs:', blogs);

  const deleteMutation = useDeleteBlog();

  const handleCreate = () => {
    router.push('/admin/blogs/create');
  };

  const handleEdit = (item: Blog) => {
    router.push(`/admin/blogs/edit/${item.id}`);
  };

  const handleDelete = (item: Blog) => {
    if (confirm('Are you sure you want to delete this blog?')) {
      deleteMutation.mutate(item.id);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Blogs</h1>
      <AdminTable
        data={Array.isArray(blogs?.blogs) ? blogs.blogs : []}
        columns={blogColumns}
        onCreate={handleCreate}
        onEdit={handleEdit}
        onDelete={handleDelete}
        searchPlaceholder="Search blogs..."
      />
    </div>
  );
}
