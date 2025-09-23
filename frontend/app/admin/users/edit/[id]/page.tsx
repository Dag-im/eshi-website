'use client';

import { UserForm } from '@/components/admin/user/userForm';
import { useUser } from '@/lib/api/useUsers';
import { useParams, useRouter } from 'next/navigation';

export default function EditUserPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const { data: user, isLoading } = useUser(id);

  const handleSuccess = () => {
    router.push('/admin/users');
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Edit User</h1>
      <UserForm item={user} onSuccess={handleSuccess} />
    </div>
  );
}
