'use client';

import { UserForm } from '@/components/admin/user/userForm';
import { useRouter } from 'next/navigation';

export default function CreateUserPage() {
  const router = useRouter();

  const handleSuccess = () => {
    router.push('/admin/users');
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Create User</h1>
      <UserForm onSuccess={handleSuccess} />
    </div>
  );
}
