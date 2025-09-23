'use client';

import { AdminTable } from '@/components/admin/AdminTable';
import { useDeleteUser, useUsers } from '@/lib/api/useUsers';
import { useRouter } from 'next/navigation';

interface User {
  id: string;
  name: string;
  email: string;
  isActive: boolean;
}

const userColumns = [
  { key: 'name', label: 'Name' },
  { key: 'email', label: 'Email' },
  {
    key: 'isActive',
    label: 'Active',
    render: (item: User) => (item.isActive ? 'Yes' : 'No'),
  },
];

export default function UsersPage() {
  const router = useRouter();
  const { data: users, isLoading } = useUsers();
  const deleteMutation = useDeleteUser();

  const handleCreate = () => {
    router.push('/admin/users/create');
  };

  const handleEdit = (item: User) => {
    router.push(`/admin/users/edit/${item.id}`);
  };

  const handleDelete = (item: User) => {
    if (confirm('Are you sure you want to delete this user?')) {
      deleteMutation.mutate(item.id);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Users</h1>
      <AdminTable
        data={users || []}
        columns={userColumns}
        onCreate={handleCreate}
        onEdit={handleEdit}
        onDelete={handleDelete}
        searchPlaceholder="Search users..."
      />
    </div>
  );
}
