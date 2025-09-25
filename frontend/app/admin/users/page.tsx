'use client';

import { AdminTable } from '@/components/admin/AdminTable';
import {
  useDeleteUser,
  useResetUserPassword,
  useUpdateUser,
  useUsers,
} from '@/lib/api/useUsers';
import { KeyRound, Power } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface User {
  _id: string;
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
  const resetMutation = useResetUserPassword();
  const updateMutation = useUpdateUser();

  const handleCreate = () => {
    router.push('/admin/users/create');
  };

  const handleEdit = (item: User) => {
    router.push(`/admin/users/edit/${item._id}`);
  };

  const handleDelete = (item: User) => {
    if (confirm('Are you sure you want to delete this user?')) {
      deleteMutation.mutate(item._id);
    }
  };

  const extraActions = [
    {
      label: 'Reset Password',
      icon: <KeyRound className="h-4 w-4" />,
      variant: 'secondary' as const,
      onClick: (item: User) => {
        if (confirm(`Reset password for ${item.email}?`)) {
          resetMutation.mutate(item._id);
        }
      },
    },
    {
      label: 'Toggle Active',
      icon: <Power className="h-4 w-4" />,
      variant: 'outline' as const,
      onClick: (item: User) => {
        updateMutation.mutate({
          id: item._id,
          data: { isActive: !item.isActive },
        });
      },
    },
  ];

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
        extraActions={extraActions}
      />
    </div>
  );
}
