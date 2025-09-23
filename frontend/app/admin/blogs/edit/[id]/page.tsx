'use client';

import { BlogForm } from '@/components/admin/blogs/BlogForm';
import { useBlog } from '@/lib/api/useBlogs';
import { useParams, useRouter } from 'next/navigation';

export default function EditBlogPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const { data: blog, isLoading } = useBlog(id);

  const handleSuccess = () => {
    router.push('/admin/blogs');
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!blog) {
    return <div>Blog not found</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Edit Blog</h1>
      <BlogForm item={blog} onSuccess={handleSuccess} />
    </div>
  );
}
