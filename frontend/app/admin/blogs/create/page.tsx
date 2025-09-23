'use client';

import { BlogForm } from '@/components/admin/blogs/BlogForm';
import { useRouter } from 'next/navigation';

export default function CreateBlogPage() {
  const router = useRouter();

  const handleSuccess = () => {
    router.push('/admin/blogs');
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Create Blog</h1>
      <BlogForm onSuccess={handleSuccess} />
    </div>
  );
}
